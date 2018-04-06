/**
 * <p>
 * Title: 江苏能源综合服务平台
 * </p>
 * <p>
 * Description:采集档案主页查询
 * </p>
 * <p>
 * Copyright: Copyright (c) 2009
 * </p>
 * <p>
 * Company: 江苏方天电力技术有限公司
 * </p>
 */
des.namespace("com.frontier.areaEnergy.xlsssjTAB");

 
$(function() { 
	$("body").layout();
	//线路实时数据
	$('#topDiv').datagrid({
			height : hei-20,
			border : false,
			singleSelect : false,
			lazyLoad : true,
			striped : true,
			title:'查询结果',
			//collapsible:true,  可折叠
			//fitColumns: true,  自动调整各列,下面各列的宽度值就只是一个比例。
			url : des.webContextRoot+'areaEnergy/xlsssjTAB.action?queryPara.subId='+codeId,
			sortOrder : 'desc',
			remoteSort : false,
			showFooter : true,
			pageSize : 50,
			columns : [
			  [
			        {
						title : '线路序号',
						field : 'SHOW_INDEX',
						rowspan:2,
						formatter:function(value,row,index){
						     return row.SHOW_INDEX;
						}
					},{
						title : '线路名称',
						field : 'LINE_NAME',
						rowspan:2,
						formatter:function(value,row,index){
						     return row.LINE_NAME;
						}
					},{
						title : '数据时间',
						field : 'SAVE_DATE',
						rowspan:2,
						formatter:function(value,row,index){
						     return row.SAVE_DATE;
						}
					},{
						title : '冻结时间',
						field : 'DATA_DATE',
						rowspan:2,
						formatter:function(value,row,index){
						     return row.DATA_DATE;
						}
					},{
						title : '开关状态',
						field : 'RSC',
						rowspan:2,
						formatter:function(value,row,index){
						     return row.RSC;
						}
					},{
						title : '总有功(kW)',
						field : 'P',
						rowspan:2,
						formatter:function(value,row,index){
						     return row.P;
						}
					},{
						title : '总无功(kVar)',
						field : 'Q',
						rowspan:2,
						formatter:function(value,row,index){
						     return row.Q;
						}
					},{
						title : '总功率因数',
						field : 'COS',
						rowspan:2,
						formatter:function(value,row,index){
						     return row.COS;
						}
					},{
						title : '电流(A)',
						colspan:3
					}, {
						title : '电压(kV)',
						colspan:3
					}, {
						title : '母排温度(℃)',
						colspan:3
					}, {
						title : 'PT',
						field : 'PT_RATIO',
						rowspan:2,
						formatter:function(value,row,index){
						     return row.PT_RATIO;
						}
					},{
						title : 'CT',
						field : 'CT_RATIO',
						rowspan:2,
						formatter:function(value,row,index){
						     return row.CT_RATIO;
						}
					},{
						title : '系数',
						field : 'xs',
						colspan:5
					},{
						title : '母线名称',
						field : 'CONS_NAME',
						rowspan:2,
						formatter:function(value,row,index){
						     return row.CONS_NAME;
						}
					},{
						title : '子用户',
						field : 'BS_NAME',
						rowspan:2,
						formatter:function(value,row,index){
						     return row.BS_NAME;
						}
					}
			  ],
			  [
			         {
						title : 'A相',
						field : 'IA',
						formatter:function(value,row,index){
						     return row.IA;
						}
					}, {
						title : 'B相',
						field : 'IB',
						formatter:function(value,row,index){
						     return row.IB;
						}
					}, {
						title : 'C相',
						field : 'IC',
						formatter:function(value,row,index){
						     return row.IC;
						}
					},{
						title : 'A相',
						field : 'UA',
						formatter:function(value,row,LINE_NAME){
						     return row.UA;
						}
					}, {
						title : 'B相',
						field : 'UB',
						formatter:function(value,row,index){
						     return row.UB;
						}
					}, {
						title : 'C相',
						field : 'UC',
						formatter:function(value,row,index){
						     return row.UC;
						}
					},{
						title : 'A相',
						field : 'TA',
						formatter:function(value,row,LINE_NAME){
						     return row.TA;
						}
					}, {
						title : 'B相',
						field : 'TB',
						formatter:function(value,row,index){
						     return row.TB;
						}
					}, {
						title : 'C相',
						field : 'TC',
						formatter:function(value,row,index){
						     return row.TC;
						}
					},{
						title : '功率',
						field : 'RATIO_P',
						formatter:function(value,row,LINE_NAME){
						     return row.RATIO_P;
						}
					}, {
						title : '功率因数',
						field : 'RATIO_COS',
						formatter:function(value,row,index){
						     return row.RATIO_COS;
						}
					}, {
						title : '电流',
						field : 'RATIO_I',
						formatter:function(value,row,index){
						     return row.RATIO_I;
						}
					},{
						title : '电压',
						field : 'RATIO_U',
						formatter:function(value,row,index){
						     return row.RATIO_U;
						}
					},{
						title : '温度',
						field : 'RATIO_T',
						formatter:function(value,row,index){
						     return row.RATIO_T;
						}
					}
			]],
			pagination : true,
			rownumbers : true
		});	
});


