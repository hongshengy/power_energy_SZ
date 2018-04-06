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
des.namespace("com.frontier.areaEnergy.znwgCdsssjTAB");

 
$(function() { 
	$("body").layout();
	//智能网关实时数据
	$('#cdsssjTable').datagrid({
			height : $('body').height()-$('#queryDiv').height()-20,//hei-120,
			title:'查询结果',
			border : false,
			singleSelect : false,
			width : '100%',
            //height : gridH,
			lazyLoad : true,
			striped : true,
			//collapsible:true,  可折叠
			fitColumns: true, 
			url : '',
			sortOrder : 'desc',
			remoteSort : false,
			showFooter : true,
			pageSize : 50,
			pageList : [50,100,200,500],
			columns : [
			  [
			         {
						title : '设备',
						field : 'OBJ_NAME',
						width:120,
						formatter:function(value,row,index){
						     return row.OBJ_NAME;
						}
					}, {
						title : '测点名称',
						field : 'MP_NAME',
						width:120,
						formatter:function(value,row,index){
						     return row.MP_NAME;
						}
					}/*, {
						title : '测点地址',
						field : 'COLL_ADDR',
						width:120,
						formatter:function(value,row,index){
						     return row.COLL_ADDR;
						}
					}*/,{
						title : '数据时间',
						field : 'COLL_TIME',
						width:150,
						formatter:function(value,row,index){
						     return row.COLL_TIME;
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
						field : 'RATIO',
						width:100,
						formatter:function(value,row,index){
						     return row.RATIO;
						}
					}, {
						title : '测点编码',
						field : 'MP_CODE',
						width:100,
						formatter:function(value,row,index){
						     return row.MP_CODE;
						}
					}, {
						title : '测点类型',
						field : 'MP_TYPE',
						width:80,
						formatter:function(value,row,index){
						     return row.MP_TYPE;
						}
					}, {
						title : '设备类型',
						field : 'DEVICE_TYPE',
						width:80,
						formatter:function(value,row,index){
						     return row.DEVICE_TYPE;
						}
					}
			]],
			pagination : true,
			rownumbers : true,
			onLoadSuccess:function(){
			}
		});	
	
	query = function(){
		 var dataDate = $("#dataDate").val();
		 var mpType = $("#mpType").val();
	     send(terminalId, dataDate, mpType);
	};
	
	send = function(terminalId, dataDate, mpType){
		 var opts = $('#cdsssjTable').datagrid("options");
		 opts.url = des.webContextRoot+'capacityData/znwgCdsssjTAB.action';
		$('#cdsssjTable').datagrid("load",{
	          "queryPara.terminalId" : terminalId,
	          "queryPara.dataDate" : dataDate,
	          "queryPara.mpType" : mpType
	    });
	};
	query();
});


