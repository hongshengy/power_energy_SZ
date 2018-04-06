<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<base href="<%=basePath%>">
		<title>线路实时数据</title>
		<jsp:include page="/pages/areaEnergy/common/head.jsp"></jsp:include>
		<script type="text/javascript"
			src="<%=basePath%>js/jquery.timers-1.1.2.js"></script>
		<script type="text/javascript">
		 var basePath = '<%=basePath%>';
		 var codeId = '${param.codeId}';
		 var subId = '${param.codeId}';
		 var terminalId = '${param.terminalId}';	
		 var hheight = '${param.hheight}';
		 var hei = parseInt(hheight);
		 var allhei = parseInt(hei)*2;
		 var tabSign = '${param.tabSign}';
	</script>
		<script type="text/javascript"
			src="<%=basePath%>pages/areaEnergy/consDataCentre/xlsssjTAB.js"></script>
		<style type="text/css">
		html {
			background-color: #F8F8F8;
		}
		
		body {
			background-color: #F8F8F8;
		}
</style>
	</head>

	<body scroll="no" id="dataBody1">
		<div id="allDiv" class="easyui-layout"
			style="width: 100%; height: 100%;">
			<div id="topDiv" data-options="region:'north',split:false"
				style="width: 100%; height: 100%;"></div>
			
		</div>
	</body>
	<script type="text/javascript">
          $(document).ready(function(){
         		
         		
		 });
		 //变化
		 $(window).resize(function(){
		 	 screen();
		 });
		 
		 function screen(){
		 	var bh = parent.parent.$("body").height()-parent.$("#view1").height()-30;
		 	var bw = parent.$("body").width();
		 	var isIE = navigator.userAgent.toUpperCase().indexOf("MSIE");
         	if(isIE == '-1' ||isIE == -1){
			 	$('#allDiv').height(bh);
	       		$('#topDiv').height(bh-5);
	       		parent.$('#xlsssjFrame').height(bh);
       		}
		 	$('#topDiv').datagrid('resize',{
				height: bh,
				width: bw
			});
		 	
		 }
	</script>
</html>
