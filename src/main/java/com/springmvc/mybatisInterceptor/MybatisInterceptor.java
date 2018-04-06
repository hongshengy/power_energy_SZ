package com.springmvc.mybatisInterceptor;

import com.springmvc.model.Page;
import com.springmvc.tools.ReflectHelper;
import com.springmvc.tools.Tools;
import org.apache.ibatis.executor.ErrorContext;
import org.apache.ibatis.executor.ExecutorException;
import org.apache.ibatis.executor.statement.BaseStatementHandler;
import org.apache.ibatis.executor.statement.RoutingStatementHandler;
import org.apache.ibatis.executor.statement.StatementHandler;
import org.apache.ibatis.mapping.BoundSql;
import org.apache.ibatis.mapping.MappedStatement;
import org.apache.ibatis.mapping.ParameterMapping;
import org.apache.ibatis.mapping.ParameterMode;
import org.apache.ibatis.plugin.*;
import org.apache.ibatis.reflection.MetaObject;
import org.apache.ibatis.reflection.property.PropertyTokenizer;
import org.apache.ibatis.scripting.xmltags.ForEachSqlNode;
import org.apache.ibatis.session.Configuration;
import org.apache.ibatis.type.TypeHandler;
import org.apache.ibatis.type.TypeHandlerRegistry;

import java.lang.reflect.Field;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Properties;


/**
 * 拦截目标类型是StatementHandler
 */
@Intercepts({@Signature(type =StatementHandler.class, method = "prepare", args ={Connection.class})})
public class MybatisInterceptor implements Interceptor {

//    mysql
    private final String mysql = "mysql";
//    oracle
    private final String oracle = "oracle";
//    sqlServer
    private final String sqlServer = "sqlServer";

//    spring-mybtais.xml文件配置时设定的参数
    private String dialect;
    private String pageSqlId;

    public void setDialect(String dialect) {
        this.dialect = dialect;
    }

    public String getDialect() {
        return dialect;
    }

    public void setPageSqlId(String pageSqlId) {
        this.pageSqlId = pageSqlId;
    }

    public String getPageSqlId() {
        return pageSqlId;
    }


//    是时候展示真正的技术了

    /**
     * 方法拦截器,根据select拦截,foreach拼接的分页方法未实现,以后看看新版的mybatis是否提供了
     * @param invocation
     * @return
     * @throws Throwable
     */
    @Override
    public Object intercept(Invocation invocation) throws Throwable {
        if(invocation.getTarget() instanceof RoutingStatementHandler){

            RoutingStatementHandler statementHandler = (RoutingStatementHandler)invocation.getTarget();
            BaseStatementHandler delegate = (BaseStatementHandler) ReflectHelper.getValueByFieldName(statementHandler, "delegate");
            MappedStatement mappedStatement = (MappedStatement) ReflectHelper.getValueByFieldName(delegate, "mappedStatement");

//            多数据源通用一个拦截器
//            符合拦截规则mapper文件的select方法Id名称
            if(mappedStatement.getId().matches(pageSqlId)){
                System.out.println(mappedStatement.getId());
                BoundSql boundSql = delegate.getBoundSql();
                Object parameterObject = boundSql.getParameterObject();//分页SQL<select>中parameterType属性对应的实体参数，即Mapper接口中执行分页方法的参数,该参数不得为空
                if(parameterObject==null){
                    throw new NullPointerException("parameterObject尚未实例化！");
                }else{
                    Connection connection = (Connection) invocation.getArgs()[0];
                    String sql = boundSql.getSql();
                    //String countSql = "select count(0) from (" + sql+ ") as tmp_count"; //记录统计
                    String fhsql = sql;
                    //查找主键时根据数据库而变
                    String countSql = "select count(1) from (" + fhsql+ ")  tmp_count"; //记录统计 == oracle 加 as 报错(SQL command not properly ended)
                    PreparedStatement countStmt = connection.prepareStatement(countSql);
                    BoundSql countBS = new BoundSql(mappedStatement.getConfiguration(),countSql,boundSql.getParameterMappings(),parameterObject);
                    setParameters(countStmt,mappedStatement,countBS,parameterObject);
                    ResultSet rs = countStmt.executeQuery();
                    int count = 0;
                    if (rs.next()) {
                        count = rs.getInt(1);
                    }
                    rs.close();
                    countStmt.close();
                    //System.out.println(count);
                    Page page = null;
                    if(parameterObject instanceof Page){	//参数就是Page实体
                        page = (Page) parameterObject;
                        page.setEntityOrField(true);
                        page.setTotalResult(count);
                    }else{	//参数为某个实体，该实体拥有Page属性
                        Field pageField = ReflectHelper.getFieldByFieldName(parameterObject,"page");
                        if(pageField!=null){
                            page = (Page) ReflectHelper.getValueByFieldName(parameterObject,"page");
                            if(page==null)
                                page = new Page();
                            page.setEntityOrField(false);
                            page.setTotalResult(count);
                            ReflectHelper.setValueByFieldName(parameterObject,"page", page); //通过反射，对实体对象设置分页对象
                        }else{
                            throw new NoSuchFieldException(parameterObject.getClass().getName()+"不存在 page 属性！");
                        }
                    }
                    String pageSql = generatePageSql(sql,page);
                    ReflectHelper.setValueByFieldName(boundSql, "sql", pageSql); //将分页sql语句反射回BoundSql.
                }
            }
        }

        return invocation.proceed();
    }

    @Override
    public Object plugin(Object o) {
        return Plugin.wrap(o, this);
    }

    /**
     * 根据数据库方言，生成特定的分页sql
     * @param sql
     * @param page
     * @return
     */
    private String generatePageSql(String sql,Page page){
        if(page!=null && !Tools.isEmpty(dialect)){
            StringBuffer pageSql = new StringBuffer();
            if("mysql".equals(dialect)){
                pageSql.append(sql);
//                page.setCurrentPage(3);
                pageSql.append(" limit "+page.getCurrentResult()+","+page.getShowCount());
                System.out.println();
            }
            return pageSql.toString();
        }else{
            return sql;
        }
    }

    /**
     * 对SQL参数设值,参考org.apache.ibatis.executor.parameter.DefaultParameterHandler
     * @param ps
     * @param mappedStatement
     * @param boundSql
     * @param parameterObject
     * @throws SQLException
     */
    private void setParameters(PreparedStatement ps,MappedStatement mappedStatement,BoundSql boundSql,Object parameterObject) throws SQLException {
        ErrorContext.instance().activity("setting parameters").object(mappedStatement.getParameterMap().getId());
        List<ParameterMapping> parameterMappings = boundSql.getParameterMappings();
        if (parameterMappings != null) {
            Configuration configuration = mappedStatement.getConfiguration();
            TypeHandlerRegistry typeHandlerRegistry = configuration.getTypeHandlerRegistry();
            MetaObject metaObject = parameterObject == null ? null: configuration.newMetaObject(parameterObject);
            for (int i = 0; i < parameterMappings.size(); i++) {
                ParameterMapping parameterMapping = parameterMappings.get(i);
                if (parameterMapping.getMode() != ParameterMode.OUT) {
                    Object value;
                    String propertyName = parameterMapping.getProperty();
                    PropertyTokenizer prop = new PropertyTokenizer(propertyName);
                    if (parameterObject == null) {
                        value = null;
                    } else if (typeHandlerRegistry.hasTypeHandler(parameterObject.getClass())) {
                        value = parameterObject;
                    } else if (boundSql.hasAdditionalParameter(propertyName)) {
                        value = boundSql.getAdditionalParameter(propertyName);
                    } else if (propertyName.startsWith(ForEachSqlNode.ITEM_PREFIX)&& boundSql.hasAdditionalParameter(prop.getName())) {
                        value = boundSql.getAdditionalParameter(prop.getName());
                        if (value != null) {
                            value = configuration.newMetaObject(value).getValue(propertyName.substring(prop.getName().length()));
                        }
                    } else {
                        value = metaObject == null ? null : metaObject.getValue(propertyName);
                    }
                    TypeHandler typeHandler = parameterMapping.getTypeHandler();
                    if (typeHandler == null) {
                        throw new ExecutorException("There was no TypeHandler found for parameter "+ propertyName + " of statement "+ mappedStatement.getId());
                    }
                    typeHandler.setParameter(ps, i + 1, value, parameterMapping.getJdbcType());
                }
            }
        }
    }

//    多数据源配置问题不做处理
    @Override
    public void setProperties(Properties properties) {
    }

}
