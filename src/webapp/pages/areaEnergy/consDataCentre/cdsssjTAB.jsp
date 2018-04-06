<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    <title>用户数据中心-测点实时数据</title>
    <jsp:include page="/pages/areaEnergy/common/head.jsp"></jsp:include>
	<script type="text/javascript" src="<%=basePath%>js/jquery.timers-1.1.2.js"></script>
    <script type="text/javascript">
		 var basePath = '<%=basePath%>';
		 var codeId = '${param.codeId}';
		 var subId = '${param.codeId}';
		 var consId = '${param.consId}';
		 var terminalId = '${param.terminalId}';
		 var hheight = '${param.hheight}';
		 var hei = parseInt(hheight)*2;
		 var COUNTNUMNEW = parent.$("#COUNTNUMNEW").val();
		 var tabSign = '${param.tabSign}';
	</script>
	<script type="text/javascript" src="<%=basePath%>pages/areaEnergy/consDataCentre/cdsssjTAB.js"></script>
	<style type="text/css">
		html{
			background-color: #F8F8F8;
		}
		body{
			background-color: #F8F8F8;
		}
	</style>
  </head>
  
  <body scroll="no" id="dataBody1">
	     <div style="width:100%;height:100%;">
					<table id="cdsssjTable"></table>
         </div>
  </body>
   <script type="text/javascript">
         $(document).ready(function(){
         	   
		     
		 });
		 //变化
		  $(window).resize(function () {
		 	var bh = parent.parent.$("body").height()-parent.$("#view1").height()-30;
		 	var bw = parent.$("body").width();
		 	$('#cdsssjTable').datagrid('resize',{
				height: bh,
				width: bw
			});
		 });
	</script>
</html>
