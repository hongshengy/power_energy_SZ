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
		<title>测点列表选择</title>
		<jsp:include page="/pages/areaEnergy/common/head.jsp"></jsp:include>
	</head>
    <body srolling='no'>
		<div id='queryDiv' class="container-shadow container-marginTop" style="width:100%;">
			<input type="hidden" id="deviceRela" name = "deviceRela" value = "LINESELF">
			<input type="hidden" id="mpType" name = "mpType" value = "">
            <div class="container-marginTop" style="position: absolute; top:10px; left:0; bottom: 0; right:0;">
             <table style="width:100%;" class="easyui-panel" cellspacing="8px" cellpadding="0" border="0" align = "center">
                    <tbody>
                             <tr>
                             	<td class="td-label" align="right">测点类型：</td>
                                <td>
                                    <input id="mt"  value="" size="27" > 
                                    <button class="easyui-linkbutton c1" onclick="query()" style="width:70px;">查询</button>
                                </td>
                                	
                             </tr>
                             
                     </tbody>
             </table>
                <table id="collArchiveTable"></table>
                <div style="padding: 10px; text-align: center">
                    <button class="easyui-linkbutton c1" onclick="doEdit()" style="width:70px;">保存</button>
                    <button class="easyui-linkbutton c1" onclick="cancel()" style="width:70px;">取消</button>
				</div>
            </div>
	    
	     
	</body>
	<script type="text/javascript">
	function doEdit(){
		var row = $('#collArchiveTable').datagrid('getSelected'); 
		opener.$('#terminalId').textbox('setValue',row.TERMINAL_ID) ;
		window.close();
	}
	function cancel(){
		window.close();
	}
	function query(){
		$('#mpType').attr("value",$('#mt').combobox('getValue'));;
		search();
	}
	
	$(function() {
		$('#mt').combobox({
			url :'<%=basePath%>areaEnergyTmnl/getCodeNameByCode.action?codeValue=70026',
			editable:false,//不可编辑状态
			valueField:'id',
			textField:'text'
		});
		
		search();
	});
	
	function search(){
		var deviceRela = $('#deviceRela').val();
		var mpType = $('#mpType').val();
		$('#collArchiveTable').datagrid({
			height : $(window).height()-$('#queryDiv').height()-5,
			title:'测点列表选择',
			border : false,
			singleSelect : false,
			width:'100%',
            height:'100%',
			lazyLoad : true,
			striped : true,
			url : des.webContextRoot +'line/queryCollDeployMesgList.action',
			queryParams : {"queryPara.deviceRela" : deviceRela,"queryPara.mpType" : mpType},
			sortOrder : 'desc',
			remoteSort : false,
			showFooter : true,
			pageSize : 50,
			columns : [[
			        {   
			            field:'MP_ID',
			            checkbox:true,
			            width:150,
			            formatter:function(value,row,index){
						     return row.MP_ID;
						}
			        },{
						title : '测点名称',
						field : 'MP_NAME',
						width : 150,
						sortable : true,
						formatter:function(value,row,index){
						     return row.MP_NAME;
						}
					}, {
						title : '测点类型',
						field : 'MP_TYPE',
						width : 200,
						sortable : true,
						formatter:function(value,row,index){
						     return row.MP_TYPE;
						}
					}, {
						title : '测点编码',
						field : 'MP_CODE',
						width : 200,
						sortable : true,
						formatter:function(value,row,index){
						     return row.MP_CODE;
						}
					}, {
						title : '区域编码',
						field : 'AREA_NO',
						width : 150,
						sortable : true,
						formatter:function(value,row,index){
						     return row.AREA_NO;
						}
					}, {
						title : '使用状态',
						field : 'USED_STAUS',
						width : 150,
						sortable : true,
						formatter:function(value,row,index){
						     return row.USED_STAUS;
						}
					}
			]],
			pagination : true,
			rownumbers : true
		});	
	
	
	}
	</script>       
</html>