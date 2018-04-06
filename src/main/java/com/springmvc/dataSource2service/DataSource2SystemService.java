package com.springmvc.dataSource2service;

import java.util.List;
import java.util.Map;

/**
 * @author 王正毅男
 * @date 2017年8月26日
 * @file com.springmvc.dataSource2service.TaskLogService.java
 * @content 
 */
public interface DataSource2SystemService {

	List<Map> getList(Map params);

	Object getPageData(String sqlid, Object obj);

	Map getMap(Map params);

	void insert(Map params);

	void update(Map params);

	void delete(Map params);
}
