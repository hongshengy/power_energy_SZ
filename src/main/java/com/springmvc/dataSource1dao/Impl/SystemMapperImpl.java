package com.springmvc.dataSource1dao.Impl;

import com.springmvc.dataSource1dao.SystemMapper;
import com.springmvc.model.Page;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Repository("systemMapperDao")
public class SystemMapperImpl implements SystemMapper{

    @Resource(name = "sqlSessionTemplate_C")
    private SqlSessionTemplate sqlSessionTemplate;

    @Override
    public List<Object> getList(Map params) {

        return sqlSessionTemplate.selectList(params.get("sql").toString(),params.get("paramsMap"));
    }

    @Override
    public Map getMap(Map params) {

        return sqlSessionTemplate.selectOne(params.get("sql").toString(),params.get("paramsMap"));
    }

    @Override
    public <E> Object getPageData(String sqlId,Object obj) {
        Object result = sqlSessionTemplate.selectList(sqlId,obj);
        Page tmpMap = (Page)obj;
        List<Map> tmpArray = new ArrayList<>();
        List<Map> tmpArray2 = new ArrayList<>();
        tmpArray = (List<Map>)result;
        for(Map row:tmpArray){
            row.put("totalResult",tmpMap.getTotalResult());
            tmpArray2.add(row);
        }
        return tmpArray2;
    }

    @Override
    public Object insert(Map params) {
        return sqlSessionTemplate.insert(params.get("sql").toString(),params.get("paramsMap"));
    }

    @Override
    public Object update(Map params) {
        return sqlSessionTemplate.update(params.get("sql").toString(),params.get("paramsMap"));
    }

    @Override
    public Object delete(Map params) {

        return sqlSessionTemplate.delete(params.get("sql").toString(),params.get("paramsMap"));
    }
}
