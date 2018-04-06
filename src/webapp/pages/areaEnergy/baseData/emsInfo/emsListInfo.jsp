<%@ page language="java" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    
    <title>ems列表信息</title>
    <meta charset="UTF-8">
    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expires" content="0">    
    <meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
    <meta http-equiv="description" content="This is my page">
    <jsp:include page="/pages/areaEnergy/common/head.jsp"></jsp:include>
    <script type="text/javascript" src="<%=basePath%>/pages/storedEnergy/emsInfo/emsListInfo.js"></script>
    
	<script type="text/javascript">
		$(function(){
		    com.frontier.areaEnergy.ems.initGrid('6','2','emsTbl','EMS列表信息');
		    com.frontier.areaEnergy.ems.initGrid('6','3','pcsTbl','PCS列表信息');
		    $('#emsTbl').datagrid({
				onClickRow : function(rowIndex, rowData){
					$('#pcsTbl').datagrid('load',{
						//code: '01',
						//name: 'name01'
					});

				}
			});
		    
		});
     </script>
	</head>

	<body>
	    <input type="hidden" id='subsType' name='subsType' value='6'>
		<input type="hidden" id='deviceType' name='deviceType' value='2'>
		<table id="emsTbl"></table>
		<table id="pcsTbl" style="margin:5;"></table>
	</body>
</html>

