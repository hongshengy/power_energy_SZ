/**
 * <p>
 * Title: 江苏能源综合服务平台
 * </p>
 * <p>
 * Description:抄表终端
 * </p>
 * <p>
 * Copyright: Copyright (c) 2009
 * </p>
 * <p>
 * Company: 江苏方天电力技术有限公司
 * </p>
 */
des.namespace("com.frontier.areaEnergy.treeTwoLevelCBZD");

 
$(function() { 
	$("body").layout();
	var mainHeight = parseInt(parent.Ext.getBody().getHeight())-155;
	//抄表终端table
	$('#cbzdTable').datagrid({
			height : mainHeight-30,
			border : false,
			singleSelect : false,
			lazyLoad : true,
			striped : true,
			//collapsible:true,  可折叠
			fitColumns: true,  //自动调整各列,下面各列的宽度值就只是一个比例。
			url : des.webContextRoot+'areaEnergy/getMetetInfoByCBZD.action?queryPara.terminalId='+terminalId,
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
						title : '电表资产号',
						field : 'METER_ASSET_NO',
						rowspan : 2,
						width:100,
						formatter:function(value,row,index){
						     return row.METER_ASSET_NO;
						}
					}, {
						title : '数据日期',
						field : 'DATA_DATE',
						rowspan : 2,
						width:100,
						formatter:function(value,row,index){
						     return row.DATA_DATE;
						}
					}, {
						title : '正向有功',
						width:500,
						colspan:5
					},{
						title : '正向无功',
						field : 'RAP_R',
						rowspan : 2,
						width:100,
						formatter:function(value,row,LINE_NAME){
						     return row.RAP_R;
						}
					}, {
						title : '无功',
						width:600,
						colspan:6
					}
			],[
			        {
						title : '总',
						field : 'PAP_R',
						width:100,
						formatter:function(value,row,index){
						     return row.PAP_R;
						}
					}, {
						title : '尖',
						field : 'PAP_R1',
						width:100,
						formatter:function(value,row,index){
						     return row.PAP_R1;
						}
					}, {
						title : '峰',
						field : 'PAP_R2',
						width:100,
						formatter:function(value,row,index){
						     return row.PAP_R2;
						}
					}, {
						title : '平',
						field : 'PAP_R3',
						width:100,
						formatter:function(value,row,index){
						     return row.PAP_R3;
						}
					},{
						title : '谷',
						field : 'PAP_R4',
						width:100,
						formatter:function(value,row,index){
						     return row.PAP_R4;
						}
					},{
						title : '正向',
						field : 'PRP_R',
						width:100,
						formatter:function(value,row,index){
						     return row.PRP_R;
						}
					},{
						title : '反向',
						field : 'RRP_R',
						width:100,
						formatter:function(value,row,index){
						     return row.RRP_R;
						}
					},{
						title : '一象限',
						field : 'RP1_R',
						width:100,
						formatter:function(value,row,index){
						     return row.RP1_R;
						}
					},{
						title : '二象限',
						field : 'RP2_R',
						width:100,
						formatter:function(value,row,index){
						     return row.RP2_R;
						}
					},{
						title : '三象限',
						field : 'RP3_R',
						width:100,
						formatter:function(value,row,index){
						     return row.RP3_R;
						}
					},{
						title : '四象限',
						field : 'RP4_R',
						width:100,
						formatter:function(value,row,index){
						     return row.RP4_R;
						}
					},
			]],
			pagination : true,
			rownumbers : true
		});	
});


