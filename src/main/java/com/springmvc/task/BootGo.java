package com.springmvc.task;

import com.springmvc.dataSource1service.DataSource1SystemService;
import com.springmvc.dataSource2service.DataSource2SystemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.quartz.SchedulerFactoryBean;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;


/**
 * @author 王正毅男
 * @date 2017年8月25日
 * @file com.springmvc.task.BootGo.java
 * @content spring启动完成后调用动态定时器生成类
 */
@Service
public class BootGo {

	//	定时器工厂
	@Autowired
	private SchedulerFactoryBean schedulerFactoryBean;

	//	sqlSessionTemp
	@Autowired
	private DataSource1SystemService systemDao;

	@Autowired
	private DataSource2SystemService systemDao2;
//	private SystemMapperImpl systemDao;

	@PostConstruct
	public void boot(){
		System.out.println("系统启动,所有组件加载完成");

//参考用误删
//	测试配置文件

//		//定时任务管理启动
//		Scheduler sche = null;
//		sche = schedulerFactoryBean.getScheduler();
//
//		System.out.println("任务调度管理定时器启动");
//		//添加定时任务类
//		//QuartzManager.addJob(sche, "yataishanyuhu", Njhouse_Search.class, "0 */1 * * * ?");
//
//
//		//普通数据请求
//		Map query = new HashMap();
//		query.put("sql","TestMapper.getList2,TestMapper.getListByParams");
//		Map paramsMap = new HashMap();
//		paramsMap.put("user","1");
//		query.put("paramsMap",paramsMap);
//		List<Map> rr = systemDao.getList(query);
//
//
//		//分页信息反射回请求对象内
//		Page page = new Page();
//		page.setShowCount(3);
//		page.setCurrentPage(1);
//		//参数在PD内
//
//		//分页信息反射回请求对象内
//		List<Map> rrr = (List<Map>)systemDao.getPageData("TestMapper.getListByParamsByPage",page);
//		System.out.println();

//	测试配置文件

	}
}
