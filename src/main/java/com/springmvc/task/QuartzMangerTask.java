package com.springmvc.task;

/**
 * @author 王正毅男
 * @date 2017年8月25日
 * @file com.springmvc.task.QuartzMangerTask.java
 * @content 
 */
//public class QuartzMangerTask implements Job,StatefulJob {

//	@Autowired
//	private SchedulerFactoryBean schedulerFactoryBean;
	

	
//	@SuppressWarnings("rawtypes")
//	@Override
//	public void execute(JobExecutionContext context) throws JobExecutionException {
		// 设置一个定时任务来同意管理定时器执行计划
		
//		Scheduler sche = null;
//		sche = schedulerFactoryBean.getScheduler();
//
//		List<String> jobList = new ArrayList<String>();
//		List<String> dbJobList = new ArrayList<String>();
//		try {
//			String[] runJob = sche.getJobGroupNames();
//			for(int groupNamesIndex = 0; groupNamesIndex<runJob.length;groupNamesIndex++){
//				String[] jobNames = sche.getJobNames(runJob[groupNamesIndex]);
//				for(int jobNamesIndex = 0; jobNamesIndex<jobNames.length;jobNamesIndex++){
//					jobList.add(jobNames[jobNamesIndex]);
//				}
//			}
//
//			//获取所有需要执行定时任务的规则--机场用
//			Map params = new HashMap<>();
//			//params.put("ISEFF", "Y");
//			List<Map> resultPlanList = airAlarmPlanService.getAlarmPlanByParmas(params);
//
//			if(null != resultPlanList && resultPlanList.size()>0){
//				//判断执行关闭JOB
//				for(Map planRow:resultPlanList){
//					for(String dbJobRow:jobList){
//						if(dbJobRow.equals(planRow.get("PLANID").toString())){
//							if(planRow.get("ISEFF").toString().equals("N")){
//								QuartzManager.removeJob(sche, dbJobRow);
//								System.out.println("任务: "+planRow.get("PLANNAME")+",已关闭");
//							}else{
//								CronTrigger trigger = (CronTrigger) sche.getTrigger(planRow.get("PLANID").toString(), "EXTJWEB_TRIGGERGROUP_NAME");
//								//System.out.println(trigger.getCronExpression()+"__"+"0 */"+planRow.get("EXECTIME").toString()+" * * * ?");
//								if(!trigger.getCronExpression().equals("0 */"+planRow.get("EXECTIME").toString()+" * * * ?")){
//
//									Gson jobParams = new GsonBuilder().setDateFormat("yyyy-MM-dd HH:mm:ss").create();
//									QuartzManager.modifyJobTime(sche,planRow.get("PLANID").toString(),"0 */"+planRow.get("EXECTIME").toString()+" * * * ?",jobParams.toJson(planRow,Map.class),null);
//									System.out.println("任务: "+planRow.get("PLANNAME")+",时间已修改为: "+"0 */"+planRow.get("EXECTIME").toString()+" * * * ?");
//								}
//
//							}
//							continue;
//						}
//					}
//					dbJobList.add(planRow.get("PLANID").toString());
//				}
//
//				//判断执行增加JOB
//				//boolean setList = dbJobList.removeAll(jobList);
//				dbJobList.removeAll(jobList);
//				//System.out.println(setList);
//				//if(setList){
//					for(String diffRow:dbJobList){
//						for(Map dbHashRow:resultPlanList){
//							if(dbHashRow.get("PLANID").toString().equals(diffRow) && dbHashRow.get("ISEFF").toString().equals("Y")){
//								String job_name = dbHashRow.get("PLANID").toString();
//								String cron = "0 */"+dbHashRow.get("EXECTIME").toString()+" * * * ?";;
//								Gson jobParams = new GsonBuilder().setDateFormat("yyyy-MM-dd HH:mm:ss").create();
//								QuartzManager.addJob(sche, job_name, QuartzAir.class, cron,jobParams.toJson(dbHashRow,Map.class));
//								System.out.println("创建任务： "+job_name+" ,任务执行时间为： "+cron);
//								continue;
//							}
//						}
//					}
//				//}
//			}
//
//		} catch (SchedulerException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
//	}
//}
