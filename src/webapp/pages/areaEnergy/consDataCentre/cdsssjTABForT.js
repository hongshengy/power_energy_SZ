/**
 * <p>
 * Title: 江苏能源综合服务平台
 * </p>
 * <p>
 * Description:测点实时数据
 * </p>
 * <p>
 * Copyright: Copyright (c) 2009
 * </p>
 * <p>
 * Company: 江苏方天电力技术有限公司
 * </p>
 */
des.namespace("com.frontier.areaEnergy.cdsssjTAB");


$(function() { 
	$("body").layout();
	//线路实时数据
	$('#cdsssjTable').datagrid({
			height : hei-30,
			border : false,
			singleSelect : false,
			lazyLoad : true,
			striped : true,
			title:'查询结果',
			//collapsible:true,  可折叠
			//fitColumns: true,
			url : des.webContextRoot+'areaEnergy/cdsssjTAB.action?queryPara.subId='+codeId+"&queryPara.terminalId="+terminalId+"&queryPara.consId="+consId,
			sortOrder : 'desc',
			remoteSort : false,
			showFooter : true,
			autoRowHeight : false,
			striped:true,
			pageSize : 1000,
			pageList : [100,200,500,1000],
			columns : [
			  [
			         {
						title : '线路/设备',
						field : 'OBJ_NAME',
						width:100,
						formatter:function(value,row,index){
							var jobName = row.OBJ_NAME;
							var str1 = jobName.substring(0,2);
							if(str1 == '()'){
								jobName = jobName.substring(2);
								return jobName;
							}else{
								return row.OBJ_NAME;
							}
						}
					}, {
						title : '测点名称',
						field : 'MP_NAME',
						width:150,
						formatter:function(value,row,index){
						     return row.MP_NAME;
						}
					}, {
						title : '测点地址',
						field : 'COLL_ADDR',
						width:150,
						formatter:function(value,row,index){
						     return row.COLL_ADDR;
						}
					},{
						title : '数据时间',
						field : 'SAVE_DATE',
						width:150,
						formatter:function(value,row,LINE_NAME){
						     return row.SAVE_DATE;
						}
					}, {
						title : '冻结时间',
						field : 'DATA_DATE',
						width:150,
						formatter:function(value,row,index){
						     return row.DATA_DATE;
						}
					}, {
						title : '当前数值',
						field : 'DATA_VALUE',
						width:100,
						formatter:function(value,row,index){
						     return row.DATA_VALUE;
						}
					},{
						title : '系数',
						field : 'MP_RATIO',
						width:100,
						formatter:function(value,row,LINE_NAME){
						     return row.MP_RATIO;
						}
					}, {
						title : '测点类型',
						field : 'MP_TYPE_NAME',
						width:100,
						formatter:function(value,row,index){
						     return row.MP_TYPE_NAME;
						}
					}
			]],
			pagination : true,
			rownumbers : true
		});	
});


