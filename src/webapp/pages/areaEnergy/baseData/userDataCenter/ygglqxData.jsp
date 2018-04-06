<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>




<%
	String baseUrl = request.getContextPath();
	String pagePath = baseUrl + "/pages/despages";
	String vtradeCode = request.getParameter("tradeCode");
	String vtradeName = request.getParameter("tradeName");

	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ baseUrl + "/";

%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">

<title>区域能源服务中心_首页_小区</title>

<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">



<jsp:include page="/pages/areaEnergy/common/head.jsp"></jsp:include>
<%-- 
    <script type="text/javascript" src="<%=baseUrl %>/pages/eemspages/echarts/js/echarts.js"></script>
    <script type="text/javascript" src="<%=baseUrl %>/pages/despages/echarts/echarts.min.js"></script>
	--%>

<%-- 
    <script type="text/javascript" src="<%=baseUrl %>/pages/eemspages/echarts/js/echarts-all.js"></script>
    /pages/basicApp/photovoltaic2/echarts/js/echarts.js
    <script type="text/javascript" src="<%=baseUrl%>/js/jquery.js"></script>

<script type="text/javascript" 
src="<%=baseUrl%>/pages/areaEnergy/baseData/userDataCenter/jquery.ba-resize.min.js"></script>
    
     --%>


<script type="text/javascript" src="<%=baseUrl%>/js/util/Util.js"></script>



<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
<style type="text/css">
* {
	margin: 0px 0px;
	padding: 0px 0px;
	border: none;
}

</style>

</head>
<body style="overflow:hidden;height: 100%;width: 100%; ">
	<div style="height: 100%;width: 100%;">

		<table id="tableDD" class="easyui-datagrid"
			style="height:100%;width: 100%;"
			data-options="fitColumns:false,singleSelect:false">
			<thead>
				<tr>
					<th width="50%" align="center" data-options="field:'timeData'">数据时间</th>
					<th width="50%" align="center" data-options="field:'jxzgl'">有功功率(kW)</th>
				</tr>
			</thead>
			<tbody>
						<c:forEach var="data" items="${resultList}" varStatus="sta">
					<tr>
							<td>${data.DATA_DATE}</td>
							<td>${data.DATA_VALUE}</td>
					</tr>
					</c:forEach>
			</tbody>
		</table>
	</div>
</body>

<script type="text/javascript">
		
		var myChart1;
		
		var paramStartDay = "2017-03-08";
		
		
		$(document).ready(function(){
			/**
			$('#tableDD').datagrid("loading");//loading画面开启
			for(var i = 0 ; i < 10000000000; i++){
				
			}
			$('#tableDD').datagrid("loaded");//loading画面关闭**/
			$('#tableDD').datagrid({    
			    fitColumns : true,
			    striped : false,
			    nowrap : true   
			}); 
			
		});
		

</script>
</html>
