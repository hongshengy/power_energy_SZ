<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
String device = request.getParameter("device");
String data = request.getParameter("data");
String type = request.getParameter("type");
String hei = request.getParameter("hei");
%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<base href="<%=basePath%>">
		<title>数据</title>
		<jsp:include page="/ext.jsp" />
		<jsp:include page="/pages/areaEnergy/common/head.jsp"></jsp:include>
		<script type="text/javascript">
			 <%--var device = '<%=device%>';
			 var data = '<%=data%>';
			 var type = '<%=type%>';--%>
			 var hei = '<%=request.getAttribute("hei")%>';
		</script>
	</head>

	<body style="overflow:hidden;height: 100%;width: 100%; ">
		<div style="height: 100%;width: 100%;">
			<table id="tableDD" class="easyui-datagrid"
				style="height:100%;width: 100%;"
				data-options="fitColumns:false,singleSelect:false">
				<thead>
					<tr>
						<th width="25%" align="center" data-options="field:'timeData'">数据时间</th>
						<th width="25%" align="center" data-options="field:'jxzgl'">测点A</th>
						<th width="25%" align="center" data-options="field:'cxzgl'">测点B</th>
						<th width="25%" align="center" data-options="field:'cxzg2'">测点C</th>
					</tr>
				</thead>
				<tbody>
					<c:forEach var="data" items="${resultList}" varStatus="sta">
						<tr>
							<td>${data.DATA_DATE}</td>
							<td>${data.TP_A_VALUE}</td>
							<td>${data.TP_B_VALUE}</td>
							<td>${data.TP_C_VALUE}</td>
						</tr>
					</c:forEach>
				</tbody>
			</table>
		</div>
	</body>
<script type="text/javascript">
	 Ext.onReady(function(){
		//alert(device+"     "+data+"      "+type);
	 });
	</script>
</html>
