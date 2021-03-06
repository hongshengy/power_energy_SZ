<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	String device = request.getParameter("device");
	String data = request.getParameter("data");
	String station = request.getParameter("station");
%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<base href="<%=basePath%>">
		<title>湿度数据</title>
		<jsp:include page="/pages/areaEnergy/common/head.jsp"></jsp:include>
		<script type="text/javascript"
			src="<%=basePath%>js/jquery.timers-1.1.2.js"></script>
		<script type="text/javascript">
		 var basePath = '<%=basePath%>';
		 var device = '<%=device%>';
		 var data = '<%=data%>';
		 var station = '<%=station%>';
	</script>
		<style type="text/css">
html {
	background-color: #F8F8F8;
}

body {
	background-color: #F8F8F8;
}

* {
	margin: 0px 0px;
	padding: 0px 0px;
	border: none;
	overflow: hidden;
}
</style>
	</head>

	<body scroll="no" id="dataBody1">
		<div class="easyui-panel" title="查询结果"
			style="width: 100%; height: 100%;">
			<div style="height: 100%; width: 100%;">
				<div id="jcxTab" class="easyui-tabs"
					style="width: 100%; height: 100%;">
					<div title="图表" id="jcxtp" style="display: none;">
						<iframe id="jcxtpFrame" selected="true" src="" width="100%"
							height="100%" frameborder="0" scrolling="no"></iframe>
					</div>

					<div title="数据" id="jcxsj" style="display: none;">
						<iframe id="jcxsjFrame" width="100%" height="100%" frameborder="0"
							style="height: 100%; width: 100%;" scrolling="no"></iframe>
					</div>
				</div>
			</div>
		</div>
	</body>
	<script type="text/javascript">
   		var queryType = 0;
   		var queryparam;
        $(document).ready(function($) {
			loadQydlBar();
		 });
		 
		 function loadQydlBar(){
	 	 	var data = $("#searchrq",window.parent.document).val();
		 	queryparam = "queryPara.DEVICE_ID="+device+"&queryPara.DATE_TIME="+data
		    +"&queryPara.ORG_NO=02&queryPara.TYPE=EDAH&queryPara.startSize="+station;
			document.getElementById("jcxtpFrame").src = basePath+"pages/areaEnergy/baseData/enviro/humidityPic.jsp?device="+device+"&data="+data+"&type=EDAH&station="+station;
	 	 	document.getElementById("jcxsjFrame").src = basePath+"/userDataCenterAction/humiditySou.action?"+queryparam;
		 }
		 
		  //查询数据信息
		 function querySource(data){
		 	var station = $("#station",window.parent.document).val();
		 	queryparam = "queryPara.DEVICE_ID="+device+"&queryPara.DATE_TIME="+data
		    +"&queryPara.ORG_NO=02&queryPara.TYPE=EDAH&queryPara.startSize="+station;
			document.getElementById("jcxtpFrame").src = basePath+"pages/areaEnergy/baseData/enviro/humidityPic.jsp?device="+device+"&data="+data+"&type=EDAH&station="+station;
	 	 	document.getElementById("jcxsjFrame").src = basePath+"/userDataCenterAction/humiditySou.action?"+queryparam;
		 	$("#jcxTab").tabs("select",0);
		 }
	</script>
</html>
