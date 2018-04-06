<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Calendar"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	SimpleDateFormat f = new SimpleDateFormat("yyyy-MM-dd");
	Calendar c = Calendar.getInstance();
	//c.add(Calendar.DAY_OF_MONTH , -1);
	String strCurrDate = f.format(c.getTime());
	String device = request.getParameter("device");
	String data = request.getParameter("data");
	String station = request.getParameter("station");
%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<base href="<%=basePath%>">
		<title>门禁数据</title>
		<jsp:include page="/ext.jsp" />
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
         Ext.onReady(function(){
         	 //现实日期控件和提交按钮
			 $('#jcxTab').tabs({    
			    border:false,    
			    onSelect:function(title){
			    	if(title == '数据'){
			    		queryType = 1;
			    	}else{
			    		queryType = 0;
			    	}
			    }    
			});
			loadQydlBar();
		 });
		 
		 function loadQydlBar(){
		 	var data = $("#sjrq",window.parent.document).val();
		 	queryparam = "queryPara.DEVICE_ID="+device+"&queryPara.DATE_TIME="+data
		    +"&queryPara.ORG_NO=02&queryPara.TYPE=FDC&queryPara.startSize="+station;
			document.getElementById("jcxtpFrame").src = basePath+"pages/areaEnergy/baseData/entrance/entranceGuardTabPic.jsp?device="+device+"&data="+data+"&type=FDC&station="+station;
	 	 	document.getElementById("jcxsjFrame").src = basePath+"/userDataCenterAction/entranceGuardTabSou.action?"+queryparam;
		 }
		 
		  //查询数据信息
		 function querySource(data){
		 	var station = $("#station",window.parent.document).val();
		 	queryparam = "queryPara.DEVICE_ID="+device+"&queryPara.DATE_TIME="+data
		    +"&queryPara.ORG_NO=02&queryPara.TYPE=FDC&queryPara.startSize="+station;
			document.getElementById("jcxsjFrame").src = basePath+"/userDataCenterAction/entranceGuardTabSou.action?"+queryparam;
			document.getElementById("jcxtpFrame").src = basePath+"pages/areaEnergy/baseData/entrance/entranceGuardTabPic.jsp?device="+device+"&data="+data+"&type=FDC&station="+station;
		 	$("#jcxTab").tabs("select",0);
		 }
	</script>
</html>
