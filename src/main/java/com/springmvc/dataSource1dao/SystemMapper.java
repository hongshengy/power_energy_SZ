package com.springmvc.dataSource1dao;

import java.util.List;
import java.util.Map;

public interface SystemMapper {

    public List<Object> getList(Map params);

    public Map getMap(Map params);

    <E> Object getPageData(String sqlid, Object obj);

    Object insert(Map params);

    Object update(Map params);

    Object delete(Map params);
}
