package com.springmvc.dataSource2service.impl;

import com.springmvc.dataSource2dao.SystemMapper2;
import com.springmvc.dataSource2service.DataSource2SystemService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author 王正毅男
 * @date 2017年8月26日
 * @file com.springmvc.dataSource2service.impl.TaskLogServiceImpl.java
 * @content 
 */
@Service("dataSource2SystemServiceS")
@Transactional
public class DataSource2SystemServiceImpl implements DataSource2SystemService {

	@Resource(name="systemMapperDao2")
	private SystemMapper2 systemDao;

	/**
	 * @param params 查询的对象和调用的mapper文件,调用时必须传入mapper文件的namespace
	 * @return List<Map>类型的结果集,按照每条sql的namespace的键值对应
	 */
	@Override
	public List<Map> getList(Map params) {
		List<Map> resultDataList = new ArrayList<>();
		Map queryParamsMap = (Map)params.get("paramsMap");
		String sqlQueueStr = params.get("sql").toString();

		if (sqlQueueStr.indexOf(",") > -1) {
			String[] sqlQueue = sqlQueueStr.split(",");

			for (int i = 0; i < sqlQueue.length; i++) {
				Map rowQueryMap = new HashMap();
				rowQueryMap.put("sql",sqlQueue[i]);
				rowQueryMap.put("paramsMap",queryParamsMap);

				List<Map> resultRowDataList = systemDao.getList(rowQueryMap);

				Map rowResultDataList = new HashMap();
				rowResultDataList.put(sqlQueue[i],resultRowDataList);

				resultDataList.add(rowResultDataList);
			}

		} else {
			Map rowQueryMap = new HashMap();
			rowQueryMap.put("sql",sqlQueueStr);
			rowQueryMap.put("paramsMap",queryParamsMap);

			List<Map> resultRowDataList = systemDao.getList(rowQueryMap);

			Map resultMapData = new HashMap();
			resultMapData.put(sqlQueueStr,resultRowDataList);

			resultDataList.add(resultMapData);

		}

		return resultDataList;
	}

	@Override
	public Object getPageData(String sqlId ,Object obj) {
		return systemDao.getPageData(sqlId,obj);
	}

	@Override
	public Map getMap(Map params) {

		return getList(params).get(0);
	}

	/**
	 * @param params 尽量设置为自增主键,如果不行,则设置sequence作为主键插入,多sql语句时必须避免重复的参数名(mybatis内的sql编写注意)
	 */
	@Override
	public void insert(Map params) {
		Map insertParamsMap = (Map)params.get("paramsMap");
		String sqlQueueStr = params.get("sql").toString();

		if (sqlQueueStr.indexOf(",") > -1) {
			String[] sqlQueue = sqlQueueStr.split(",");
			for (int i = 0; i < sqlQueue.length; i++) {
				Map rowInsertMap = new HashMap();
				rowInsertMap.put("sql",sqlQueue[i]);
				rowInsertMap.put("paramsMap",insertParamsMap);

				systemDao.insert(rowInsertMap);
			}
		}else {
			systemDao.insert(params);
		}
	}

	/**
	 * @param params 尽量设置为自增主键,如果不行,则设置sequence作为主键插入,多sql语句时必须避免重复的参数名(mybatis内的sql编写注意)
	 */
	@Override
	public void update(Map params) {
		Map updateParamsMap = (Map)params.get("paramsMap");
		String sqlQueueStr = params.get("sql").toString();

		if (sqlQueueStr.indexOf(",") > -1) {
			String[] sqlQueue = sqlQueueStr.split(",");
			for (int i = 0; i < sqlQueue.length; i++) {
				Map rowUpdateMap = new HashMap();
				rowUpdateMap.put("sql",sqlQueue[i]);
				rowUpdateMap.put("paramsMap",updateParamsMap);

				systemDao.update(rowUpdateMap);
			}
		}else {
			systemDao.update(params);
		}
	}

	/**
	 * @param params 尽量设置为自增主键,如果不行,则设置sequence作为主键插入,多sql语句时必须避免重复的参数名(mybatis内的sql编写注意)
	 */
	@Override
	public void delete(Map params) {
		Map deleteParamsMap = (Map)params.get("paramsMap");
		String sqlQueueStr = params.get("sql").toString();

		if (sqlQueueStr.indexOf(",") > -1) {
			String[] sqlQueue = sqlQueueStr.split(",");
			for (int i = 0; i < sqlQueue.length; i++) {
				Map rowDeleteMap = new HashMap();
				rowDeleteMap.put("sql",sqlQueue[i]);
				rowDeleteMap.put("paramsMap",deleteParamsMap);

				systemDao.delete(rowDeleteMap);
			}
		}else {
			systemDao.delete(params);
		}
	}


}
