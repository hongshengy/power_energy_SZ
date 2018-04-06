package com.springmvc.dataSource1service;

import java.util.List;
import java.util.Map;

public interface DataSource1SystemService {
    List<Map> getList(Map params);

    Object getPageData(String sqlid, Object obj);

    Map getMap(Map params);

    Object insert(Map params);

    Object update(Map params);

    Object delete(Map params);
}
