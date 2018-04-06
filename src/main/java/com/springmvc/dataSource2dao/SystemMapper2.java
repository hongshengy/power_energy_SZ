package com.springmvc.dataSource2dao;

import java.util.List;
import java.util.Map;

public interface SystemMapper2 {

	public List<Map> getList(Map params);

	public Map getMap(Map params);

	Object getPageData(String sqlid, Object obj);

	void insert(Map params);

	void update(Map params);

	void delete(Map params);
}
