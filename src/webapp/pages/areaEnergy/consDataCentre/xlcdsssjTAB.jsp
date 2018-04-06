<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>

<%@page import="java.util.Calendar"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Date"%>
<%@page import="com.frontier.framework.util.DatabaseUtil"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
String station = request.getParameter("station");

SimpleDateFormat sfNew11 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//当前时间
Calendar dangqianCalen = Calendar.getInstance();
dangqianCalen.add(Calendar.MINUTE, -1);
String thisTimeSi = sfNew11.format(dangqianCalen.getTime());//sfNew11.format(dateSysTime);
thisTimeSi = thisTimeSi.substring(0, thisTimeSi.lastIndexOf(":"));
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
		 var bsId = '${param.bsId}';
		 var lineId = '${param.lineId}';
		 var hheight = '${param.hheight}';
		 var hei = parseInt(hheight)*2;
		 var mpType = '${param.mpType}';
		 var station = '<%=station%>';
		 var subId = '${param.subId}';
		 var tabSign = '${param.tabSign}';
		 var ddType = '${param.ddType}';
		 var COUNTNUMNEW = parent.$("#COUNTNUMNEW").val();
	</script>
	<script type="text/javascript" src="<%=basePath%>pages/areaEnergy/consDataCentre/xlcdsssjTAB.js"></script>
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
	     <div style="width:100%;height:100%;">
	     	<div style="height: 30px;width: 100%;padding-left: 15px;" id="panel_new">
	     		数据日期:<input id="startDay001" type="text" class="easyui-datetimebox"
 							 style="height: 25px;width: 160px;"
 							value="<%=thisTimeSi %>" />
						<a onclick="" id="button_query" href="javascript:timeQueryLoad();" 
							class="easyui-linkbutton"
							style="height: 25px;width: 40px;border: solid 1px lightgray;" 
							plain>查询</a>
	     	</div>
					<table id="cdsssjTable"></table>
         </div>
  </body>
   <script type="text/javascript">
         $(document).ready(function(){
		     cdgd();
		 });
		  //变化
		  $(window).resize(function () {
		 	  cdgd();
		 });
		 function cdgd(){
		 	var bh = parent.$("body").height()-parent.$("#view1").height()-parent.$("#view2").height()-30;
		 	var bw = parent.$("body").width();
		 	$('#cdsssjTable').datagrid('resize',{
				height: bh,
				width: bw
			});
		}
	</script>
</html>
