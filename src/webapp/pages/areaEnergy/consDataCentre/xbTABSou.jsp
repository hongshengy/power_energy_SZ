<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
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
		</script>
	</head>

	<body style="overflow:hidden;height: 100%;width: 100%; ">
		<div style="height: 100%;width: 100%;">
			<table id="tableDD" class="easyui-datagrid"
				style="height:100%;width: 100%;"
				data-options="fitColumns:false,singleSelect:false">
				<thead>
					<tr>
						<th width="30%" align="center" data-options="field:'jxzgl'">测点编码</th>
						<th width="40%" align="center" data-options="field:'timeData'">数据时间</th>
						<th width="30%" align="center" data-options="field:'cxzgl'">谐波(%)</th>
					</tr>
				</thead>
				<tbody>
					<c:forEach var="data" items="${resultList}" varStatus="sta">
						<tr>
							<td>${data.MP_CODE}</td>
							<td>${data.COLL_TIME}</td>
							<td>${data.DATA_VALUE}</td>
						</tr>
					</c:forEach>
				</tbody>
			</table>
		</div>
	</body>
<script type="text/javascript">
	 Ext.onReady(function(){
	 });
	</script>
</html>
