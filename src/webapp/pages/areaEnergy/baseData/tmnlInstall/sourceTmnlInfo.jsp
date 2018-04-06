<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<html>
	<head>
	    <base href="<%=basePath%>">
		<title>终端配置信息</title>
		<jsp:include page="/pages/areaEnergy/common/head.jsp"></jsp:include>
	</head>
    <body srolling='no'>
		<div id='queryDiv' class="container-shadow container-marginTop" style="width:100%;">
            <div class="container-marginTop" style="position: absolute; top:10px; left:0; bottom: 0; right:0;">
                <table id="collArchiveTable"></table>
                <div style="padding: 10px; text-align: center">
                    <button class="easyui-linkbutton c1" onclick="doEdit()" style="width:70px;">确认</button>
                    <button class="easyui-linkbutton c1" onclick="cancel()" style="width:70px;">取消</button>
				</div>
            </div>
	    
	     
	</body>
	<script type="text/javascript">
	function doEdit(){
		var row = $('#collArchiveTable').datagrid('getSelected'); 
		if(row == null){  
			 $.messager.alert('提示',"请选择终端",'info'); 
				return; 
		}
		opener.$('#sourceTmnlAssetNo').textbox('setValue',row.TMNL_ASSET_NO) ;
		opener.$('#sourceTmnlId').attr('value',row.TERMINAL_ID) ;
		window.close();
	}
	function cancel(){
		window.close();
	}
	
	
	$(function() {
		var consId = ${param.consId};
		$('#collArchiveTable').datagrid({
			height : $(window).height()-$('#queryDiv').height()-5,
			title:'终端配置信息',
			border : false,
			singleSelect : true,
			width:'100%',
            height:'80%',
			lazyLoad : true,
			striped : true,
			//collapsible:true,  可折叠
			//fitColumns: true,  自动调整各列,下面各列的宽度值就只是一个比例。
			url : des.webContextRoot +'areaEnergy/findTmnlInfo.action',
			queryParams : {"queryPara.consId" : consId},
			sortOrder : 'desc',
			remoteSort : false,
			showFooter : true,
			pageSize : 50,
			checkOnSelect:true,
			selectOnCheck:true,
			columns : [[
			        {   
			            field:'TERMINAL_ID',
			            checkbox:true,
			            width:150,
			            formatter:function(value,row,index){
						     return row.TERMINAL_ID;
						}
			        },{
						title : '终端资产号',
						field : 'TMNL_ASSET_NO',
						width : 150,
						sortable : true,
						formatter:function(value,row,index){
						     return row.TMNL_ASSET_NO;
						}
					}, {
						title : '通信规约',
						field : 'PROTOCOL_TYPE',
						width : 200,
						sortable : true,
						formatter:function(value,row,index){
						     return row.PROTOCOL_TYPE;
						}
					}, {
						title : '终端端口',
						field : 'TMNL_IP',
						width : 200,
						sortable : true,
						formatter:function(value,row,index){
						     return row.TMNL_IP;
						}
					}, {
						title : '通信信道',
						field : 'CHANNEL_NO',
						width : 150,
						sortable : true,
						formatter:function(value,row,index){
						     return row.CHANNEL_NO;
						}
					}, {
						title : '终端类型',
						field : 'TERMINAL_TYPE_CODE',
						width : 150,
						sortable : true,
						formatter:function(value,row,index){
						     return row.TERMINAL_TYPE_CODE;
						}
					}
			]],
			pagination : true,
			rownumbers : true
		});	
	});
	</script>       
</html>