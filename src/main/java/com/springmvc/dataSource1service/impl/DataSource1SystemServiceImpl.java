package com.springmvc.dataSource1service.impl;

import com.springmvc.dataSource1dao.SystemMapper;
import com.springmvc.dataSource1service.DataSource1SystemService;
import com.springmvc.model.Page;
import com.springmvc.tools.PageData;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.*;

/**
 * 封装的当前数据源内的sql方法
 */
@Service("dataSource1SystemServiceS")
@Transactional
public class DataSource1SystemServiceImpl implements DataSource1SystemService {

    @Resource(name="systemMapperDao")
    private SystemMapper systemDao;

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
                List<Object> resultRowDataList = new ArrayList<>();
                Map rowQueryMap = new HashMap();
                rowQueryMap.put("sql",sqlQueue[i]);

                if(sqlQueue[i].contains("ByPage")){
                    //分页信息反射回请求对象内
                    Page page = new Page();

//                    page.setShowCount(Integer.parseInt(queryParamsMap.get("showCount").toString()));
                    page.setCurrentPage(Integer.parseInt(queryParamsMap.get("currentPage").toString()));
                    //参数在PD内
//                    List<Object> resultByPageDataList = new ArrayList<>();
                    //分页信息反射回请求对象内
                    Object rrr = systemDao.getPageData(sqlQueue[i], page);
                    resultRowDataList.add(rrr);

                    System.out.println();
                }else {
                    rowQueryMap.put("paramsMap",queryParamsMap);
                    resultRowDataList = systemDao.getList(rowQueryMap);
                    System.out.println();
                }

                Map rowResultDataList = new HashMap();
                rowResultDataList.put(sqlQueue[i],resultRowDataList);

                resultDataList.add(rowResultDataList);
            }

        } else {
            Map rowQueryMap = new HashMap();
            rowQueryMap.put("sql",sqlQueueStr);

            List<Object> resultRowDataList = new ArrayList<>();

            if(sqlQueueStr.contains("ByPage")){
                Page page = new Page();

//                page.setShowCount(Integer.parseInt(queryParamsMap.get("showCount").toString()));
                page.setCurrentPage(Integer.parseInt(queryParamsMap.get("currentPage").toString()));

                PageData pd = new PageData();
                rowQueryMap.put("paramsMap",queryParamsMap);

//                pd.put("dog_Name",queryParamsMap.get("dog_Name"));
                Iterator<Map.Entry<Integer, Integer>> entries = queryParamsMap.entrySet().iterator();

                while (entries.hasNext()) {

                    Map.Entry<Integer, Integer> entry = entries.next();
                    pd.put(entry.getKey(),entry.getValue());
//                    System.out.println("Key = " + entry.getKey() + ", Value = " + entry.getValue());

                }






                page.setPd(pd);
                Object rrr = systemDao.getPageData(sqlQueueStr, page);
//                List<Map> rowPageDataArray = (List<Map>)rrr;

//                List<Map> = rowPageDataArray.get()

                resultRowDataList.add(rrr);
                System.out.println();

            }else {
                rowQueryMap.put("paramsMap",queryParamsMap);
                resultRowDataList = systemDao.getList(rowQueryMap);
                System.out.println();
            }
//            rowQueryMap.put("paramsMap",queryParamsMap);

            Map resultMapData = new HashMap();
            resultMapData.put(sqlQueueStr,resultRowDataList);

            resultDataList.add(resultMapData);

        }

        return resultDataList;
    }

//调用参照
//		//分页信息反射回请求对象内
//		Page page = new Page();
//		page.setShowCount(3);
//		page.setCurrentPage(1);
//		//参数在PD内
//
//		//分页信息反射回请求对象内
//		List<Map> rrr = (List<Map>)systemDao.getPageData("TestMapper.getListByParamsByPage",page);
//		System.out.println();

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
    public Object insert(Map params) {
        Map insertParamsMap = (Map)params.get("paramsMap");
        String sqlQueueStr = params.get("sql").toString();

        List<Object> ObjectList = new ArrayList<Object>();
        if (sqlQueueStr.contains(",")) {
            String[] sqlQueue = sqlQueueStr.split(",");
            for (int i = 0; i < sqlQueue.length; i++) {
                Map rowInsertMap = new HashMap();
                rowInsertMap.put("sql",sqlQueue[i]);
                rowInsertMap.put("paramsMap",insertParamsMap);

                ObjectList.add(systemDao.insert(rowInsertMap));
            }
        }else {
            ObjectList.add(systemDao.insert(params));
        }

        return ObjectList;
    }

    /**
     * @param params 尽量设置为自增主键,如果不行,则设置sequence作为主键插入,多sql语句时必须避免重复的参数名(mybatis内的sql编写注意)
     */
    @Override
    public Object update(Map params) {
        Map updateParamsMap = (Map)params.get("paramsMap");
        String sqlQueueStr = params.get("sql").toString();

        List<Object> updateResultList = new ArrayList<Object>();

        if (sqlQueueStr.indexOf(",") > -1) {
            String[] sqlQueue = sqlQueueStr.split(",");
            for (int i = 0; i < sqlQueue.length; i++) {
                Map rowUpdateMap = new HashMap();
                rowUpdateMap.put("sql",sqlQueue[i]);
                rowUpdateMap.put("paramsMap",updateParamsMap);

                updateResultList.add(systemDao.update(rowUpdateMap));
            }
        }else {
            updateResultList.add(systemDao.update(params));
        }

        return updateResultList;
    }

    /**
     * @param params 尽量设置为自增主键,如果不行,则设置sequence作为主键插入,多sql语句时必须避免重复的参数名(mybatis内的sql编写注意)
     */
    @Override
    public Object delete(Map params) {
        Map deleteParamsMap = (Map)params.get("paramsMap");
        String sqlQueueStr = params.get("sql").toString();

        List<Object> deleteResultList = new ArrayList<Object>();
        if (sqlQueueStr.indexOf(",") > -1) {
            String[] sqlQueue = sqlQueueStr.split(",");
            for (int i = 0; i < sqlQueue.length; i++) {
                Map rowDeleteMap = new HashMap();
                rowDeleteMap.put("sql",sqlQueue[i]);
                rowDeleteMap.put("paramsMap",deleteParamsMap);

                deleteResultList.add(systemDao.delete(rowDeleteMap));
            }
        }else {
            deleteResultList.add(systemDao.delete(params));
        }

        return deleteResultList;
    }
}
