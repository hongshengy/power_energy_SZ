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
    <title>线路数据</title>
    <jsp:include page="/ext.jsp" />
    <jsp:include page="/pages/areaEnergy/common/head.jsp"></jsp:include>
	<script type="text/javascript" src="<%=basePath%>js/jquery.timers-1.1.2.js"></script>
    <script type="text/javascript">
		 var basePath = '<%=basePath%>';
		 var lineId = '${param.lineId}';
		 var hheight = '${param.hheight}';
		 var riqiIn = '${param.riqiIn}';
		  var subId = '${param.subId}';
		 var tabSign = '${param.tabSign}';
	</script>
	<script type="text/javascript" src="<%=basePath%>pages/areaEnergy/consDataCentre/subType/xlsj.js"></script>
	<style type="text/css">
		html{
			background-color: #F8F8F8;
		}
		body{
			background-color: #F8F8F8;
		}
		html,body {
			height: 100%;
		}
	</style>
  </head>
  
  <body scroll="no" id="dataBody1">
	     <div id="tid" style="width:100%;">
					<table id="xlsjTable"></table>
         </div>
  </body>
   <script type="text/javascript">
         Ext.onReady(function(){
         	var isIE = navigator.userAgent.toUpperCase().indexOf("MSIE");
         	if(isIE == '-1' ||isIE == -1){
	         	 //$('#tid').height(parseInt(hheight));
	         	 //parent.$('#Frame0').height(parseInt(hheight));
	        }
		 });
		 //变化
		 $(window).resize(function () {
		 	var bh = parent.$("body").height()-parent.$("#view1").height()-parent.$("#view2").height()-30;
		 	var bw = parent.$("body").width();
		 	$('#xlsjTable').datagrid('resize',{
				height: bh,
				width: bw
			});
		 });
	</script>
</html>
