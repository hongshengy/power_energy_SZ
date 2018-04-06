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
    <title>用户数据中心</title>
    <jsp:include page="/ext.jsp" />
    <jsp:include page="/pages/areaEnergy/common/head.jsp"></jsp:include>
	<script type="text/javascript" src="<%=basePath%>js/jquery.timers-1.1.2.js"></script>
    <script type="text/javascript">
		 var basePath = '<%=basePath%>';
		 var consId = '${param.consId}';
		 var countNum = 0;
		 /* 智能家居 非侵入式 iframe 用采数据使用 dingtengfei 2017-5-22 */
		 var consNo = '${param.consNo}';
	</script>
	<script type="text/javascript" src="<%=basePath%>pages/areaEnergy/consDataCentre/getConsDetailTree.js"></script>
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
	  	<div id="allDiv" class="easyui-layout" style="width:100%;height:100%;">
	  		<input type="hidden" id="nodeId1" value=""/>
			<div region="west" split="true" title="采集档案配置" style="width:200px;">
				<div id="leftDiv"></div>
			</div>
			<div region="center">
				<iframe width="100%" height="100%" frameborder="0" scrolling="auto" id="rightFrame"></iframe>
			</div>
		</div>
  </body>
   <script type="text/javascript">
         //Ext.onReady(function(){ 
             //刷新方法
             //var mytimer = "T";
             //$('#dataBody1').everyTime('60s',mytimer,function(){
               //  $('#leftDiv').tree('reload');
            // });
		 //});
		  $(document).ready(function(){
         	   //添加下拉菜单
         	   str1 = '采集档案配置    <a id="" group="" class="l-btn l-btn-small l-btn-plain" href="javascript:queryTree();"><span class="l-btn-left l-btn-icon-left"><span class="l-btn-text l-btn-empty">&nbsp;</span><span class="l-btn-icon pagination-load">&nbsp;</span></span></a>';
			   $(".panel-title").first().html(str1);
		 });
		 function queryTree(){
		 	$('#leftDiv').tree('reload');
		 }
	</script>
</html>
