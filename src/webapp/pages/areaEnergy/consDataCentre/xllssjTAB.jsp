<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Calendar"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
SimpleDateFormat f = new SimpleDateFormat("yyyy-MM-dd");
Calendar c = Calendar.getInstance();
//c.add(Calendar.DAY_OF_MONTH , -1);
String strCurrDate = f.format(c.getTime());
%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<base href="<%=basePath%>">
		<title>线路历史数据</title>
		<jsp:include page="/pages/areaEnergy/common/head.jsp"></jsp:include>
		<script type="text/javascript"
			src="<%=basePath%>js/jquery.timers-1.1.2.js"></script>
		<script type="text/javascript">
		 var basePath = '<%=basePath%>';
		 var strCurrDate = '<%=strCurrDate%>';
		 var codeId = '${param.codeId}';
		 var subId = '${param.codeId}';
		 var terminalId = '${param.terminalId}';	
		 var hheight = '${param.hheight}';
		 var hei = parseInt(hheight);
		 var tabSign = '${param.tabSign}';
		 var COUNTNUMNEW = '${param.COUNTNUMNEW}';
		 var count = 0 ; 
	</script>
		<script type="text/javascript" src="<%=basePath%>pages/areaEnergy/consDataCentre/xllssjTAB.js"></script> 
		<script type="text/javascript" src="<%=basePath%>/pages/areaEnergy/baseData/userSubstation/DateSwitch.js"></script>
		<style type="text/css">
			html {
				background-color: #F8F8F8;
			}
			body {
				background-color: #F8F8F8;
			}
			.datagrid-header-rownumber,
			.datagrid-cell-rownumber {
			  margin: 0;
			  padding: 0 4px;
			  white-space: nowrap;
			  word-wrap: normal;
			  overflow: hidden;
			  height: 18px;
			  width:50px;
			  line-height: 18px;
			  font-size: 12px;
			}
		</style>
	</head>

	<body scroll="no" id="dataBody1">
		<div id="allDiv" class="easyui-panel" title="查询结果"
			style="width: 100%; height: 100%;">
			<div id="topDiv" data-options="region:'north',split:false"
				style="width: 100%; height: 100%;"></div>
			
		</div>
	</body>
	<script type="text/javascript">
         $(document).ready(function(){
         	screen();
		 });
		 //变化
		 $(window).resize(function(){
		 	 screen();
		 });
		 
		 function screen(){
		 	var bh = parent.parent.$("body").height()-parent.$("#view1").height()-30;
		 	var bw = parent.$("body").width();
		 	$('#allDiv').datagrid('resize',{
				height: bh+20,
				width: bw
			});
		 	$('#topDiv').datagrid('resize',{
				height: bh,
				width: bw
			});
		 	
		 }
	</script>
</html>
