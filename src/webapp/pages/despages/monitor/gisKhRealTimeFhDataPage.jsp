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
<title>客户实时负荷数据tab</title>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<link rel="stylesheet" type="text/css"
	href="<%=baseUrl%>/pages/areaEnergy/common/jquery-easyui-1.5.1/themes/fangtian/easyui.css">
<link rel="stylesheet" type="text/css"
	href="<%=baseUrl%>/pages/areaEnergy/common/jquery-easyui-1.5.1/themes/icon.css">
<link rel="stylesheet" type="text/css"
	href="<%=baseUrl%>/pages/areaEnergy/common/jquery-easyui-1.5.1/themes/color.css">
<link rel="stylesheet" type="text/css"
	href="<%=baseUrl%>/pages/areaEnergy/common/css/common.css">
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

		<table id="tableDD" class="easyui-datagrid" style="height:100%;width: 100%;" data-options="fitColumns:false,singleSelect:false">
			<thead>
				<tr>
					<th width="50%" align="center" data-options="field:'timeData'">数据时间</th>
					<th width="50%" align="center" data-options="field:'jxzgl'">负荷(kW)</th>
					<!--<th width="35%" align="center" data-options="field:'cxzgl'">出线总功率(kW)</th>-->
				</tr>
			</thead>
			<tbody>
				<c:forEach var="data" items="${resultList}" varStatus="sta">
					<tr>
						<td>${data.DATE_TIME}</td>
						<td>${data.DATEVALUE}</td>
						<!-- <td>${data.LASTVALUE}</td> -->
					</tr>
				</c:forEach>
			</tbody>
		</table>
	</div>
</body>
<script type="text/javascript"
	src="<%=baseUrl%>/pages/areaEnergy/common/jquery-easyui-1.5.1/jquery.min.js"></script>
<script type="text/javascript"
	src="<%=baseUrl%>/pages/areaEnergy/common/jquery-easyui-1.5.1/jquery.easyui.min.js"></script>
<script type="text/javascript"
	src="<%=baseUrl%>/pages/areaEnergy/common/jquery-easyui-1.5.1/easyui-lang-zh_CN.js"></script>
<script type="text/javascript"
	src="<%=baseUrl%>/pages/areaEnergy/common/jquery-easyui-1.5.1/datagrid-detailview.js"></script>
<script type="text/javascript" src="<%=baseUrl%>/js/json2.js"></script>
<script type="text/javascript"
	src="<%=pagePath%>/common/echarts/echarts.min.js"></script>
<script type="text/javascript" src="<%=baseUrl%>/js/util/Util.js"></script>
<script type="text/javascript">
	$(document).ready(function() {
		$('#tableDD').datagrid({
			fitColumns : true,
			striped : false,
			nowrap : true
		});

	});
</script>
</html>
