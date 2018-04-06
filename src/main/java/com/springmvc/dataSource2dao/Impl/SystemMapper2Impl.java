package com.springmvc.dataSource2dao.Impl;

import com.springmvc.dataSource2dao.SystemMapper2;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

@Repository("systemMapperDao2")
public class SystemMapper2Impl implements SystemMapper2 {
    @Resource(name = "sqlSessionTemplate_O")
    private SqlSessionTemplate sqlSessionTemplate;

    @Override
    public List<Map> getList(Map params) {
        return sqlSessionTemplate.selectList(params.get("sql").toString(),params.get("paramsMap"));
    }

    @Override
    public Map getMap(Map params) {
        return sqlSessionTemplate.selectOne(params.get("sql").toString(),params.get("paramsMap"));
    }

    @Override
    public Object getPageData(String sqlId,Object obj) {
        return sqlSessionTemplate.selectList(sqlId,obj);
    }

    @Override
    public void insert(Map params) {
        sqlSessionTemplate.insert(params.get("sql").toString(),params.get("paramsMap"));
    }

    @Override
    public void update(Map params) {
        sqlSessionTemplate.update(params.get("sql").toString(),params.get("paramsMap"));
    }

    @Override
    public void delete(Map params) {
        sqlSessionTemplate.delete(params.get("sql").toString(),params.get("paramsMap"));
    }
}
