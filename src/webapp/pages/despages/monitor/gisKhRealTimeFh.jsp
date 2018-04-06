<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Calendar"%>
<%
String path = request.getContextPath();
String pagePath = path + "/pages/despages";
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
SimpleDateFormat f = new SimpleDateFormat("yyyy-MM-dd");
Calendar c = Calendar.getInstance();
String strCurrDate = f.format(c.getTime());
%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">
<title>客户实时负荷</title>
<link rel="stylesheet"
	href="<%=pagePath%>/common/jquery-easyui-1.5.1/themes/fangtian/easyui.css">
<link rel="stylesheet"
	href="<%=pagePath%>/common/jquery-easyui-1.5.1/themes/icon.css">
<link rel="stylesheet"
	href="<%=pagePath%>/common/jquery-easyui-1.5.1/themes/color.css">
<link rel="stylesheet" href="<%=pagePath%>/common/css/common.css">
<link rel="stylesheet" type="text/css" href="<%=pagePath %>/common/css/templet_common.css">
<script src="<%=pagePath%>/common/js/maskJs.js"></script>
</head>
<body>
	<script>
	    var maskobj = new maskPanelManager();
	    maskobj.register();
	</script>
<style>
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

	<div id="cc" class="easyui-layout" style="width:100%;height:100%;" data-options="minWidth:1200">
		<div data-options="region:'north',title:'',split:false,collapsible:false,border:false"
			style="width:100%;height:100%;overflow: hidden;">
			<div class="easyui-panel" style="height: 15%;width: 100%;" data-options="cls:'fangtian-panel-style'">
				<ul class="ulTable">
					<li style="padding-left: 10px;">
						<a href="javascript:void(0);" onclick="querys(1)">
							<img style="border-style:none;vertical-align: middle" alt="前一天" src="<%=request.getContextPath()%>/images/tools-moveleft.gif">
						</a>
						<input id="riqiIn" class="easyui-datebox" type="text" data-options="width:155,editable:false"/>
						<a href="javascript:void(0);" onclick="querys(2)">
							<img style="border-style:none;vertical-align: middle" alt="后一天" src="<%=request.getContextPath()%>/images/tools-moveright.gif">
						</a>
					</li>
					<li>
						<span>&nbsp;</span>
						<select class="easyui-combobox" id="station" data-options="prompt:'请选择',height:24,editable:false,width:155,panelWidth:155">
							<option value="1440">1440点</option>
							<option value="288" selected>288点</option>
						</select>
					</li>
<!-- 					<li class="liReport"> -->
<!-- 						<a onclick="querys(0);" id="button_query" class="easyui-linkbutton c100" href="javascript:void(0);">查询</a> -->
<!-- 					</li> -->
				</ul>
			</div>
			<div class="easyui-panel" style="height: 85%;width: 100%;overflow: hidden;" data-options="cls:'fangtian-panel-style bottom-padding'">
			<div id="jcxTab" class="easyui-tabs" style="width:100%;height:100%;">
				<div title="图表" id="jcxtp" style="display:none;">
					<iframe id="gisKhRealTimeFhLineFrame" selected="true" src="" width="100%"
						height="100%" frameborder="0" scrolling="no"></iframe>
				</div>
				<div title="数据" id="gisKhRealTimeFh" style="display:none;">
					<iframe id="gisKhRealTimeFhDataFrame" width="100%" height="100%"
						frameborder="0" style="height: 100%;width: 100%;" scrolling="no"></iframe>
				</div>
			</div>
		</div>
			</div>
			</div>
</body>
<script type="text/javascript"
	src="<%=path %>/pages/areaEnergy/common/jquery-easyui-1.5.1/jquery.min.js"></script>
<script type="text/javascript"
	src="<%=path %>/pages/areaEnergy/common/jquery-easyui-1.5.1/jquery.easyui.min.js"></script>
<script type="text/javascript"
	src="<%=path %>/pages/areaEnergy/common/jquery-easyui-1.5.1/easyui-lang-zh_CN.js"></script>
<script type="text/javascript"
	src="<%=path %>/pages/areaEnergy/common/jquery-easyui-1.5.1/datagrid-detailview.js"></script>
<script type="text/javascript" src="<%=path %>/js/json2.js"></script>
<script type="text/javascript"
	src="<%=pagePath %>/common/echarts/echarts.min.js"></script>
<script type="text/javascript"
	src="<%=basePath%>js/jquery.timers-1.1.2.js"></script>
<script type="text/javascript"
	src="<%=basePath%>/pages/areaEnergy/baseData/userSubstation/DateSwitch.js"></script>
<script type="text/javascript">
		var basePath = '<%=basePath%>';
		var strCurrDate = '<%=strCurrDate%>';
		var id = '${param.id}';
		var dataType = '${param.dataType}';
		var hheight = '${param.hheight}';
		var hei = parseInt(hheight)*2;
   		var queryType = 0;
   		var loadDataFlag = false;
   		var loadLineFlag = false;
   		$(function() {
			 $('#riqiIn').datebox({    
			    required:false,
			    onSelect : function(date) {
			    	loadLineFlag = false;
					loadDataFlag = false;
					querys(0);
				}
			 });
			 $('#station').combobox({    
			    required:false,
			    onSelect : function(param) {
			    	loadLineFlag = false;
					loadDataFlag = false;
					querys(0);
				}
			 });

			 $('#riqiIn').datebox('setValue',strCurrDate); 
			 $('#jcxTab').tabs({    
			    border:false,    
			    onSelect:function(title){
			    	if(title == '数据'){
			    		queryType = 1;
			    	}else{
			    		queryType = 0;
			    	}
			        //alert(title+' is selected');
			        querys(0);
			    }    
			});
// 			querys(0);
   		});

		 //点击查询按钮
		 function querys(tab){

			 if(tab != 0){
				 loadLineFlag = false;
				 loadDataFlag = false;
			 }
			 
			 if($("#riqiIn").val() == null || $("#riqiIn").val() == ''){
				 $('#riqiIn').datebox('setValue',strCurrDate);
			 }
			dataswitch("riqiIn",$("#riqiIn").val(),tab);
		 }
		 function query(){
		 	 var dateTime = $("#riqiIn").val();
		 	 var station = $("#station").val();
		 	 
		 	 //return;
		 	 if(queryType == 0){
		 		 if(!loadLineFlag){
		 	 		var url = "<%=basePath%>giszl/gisKhRealTimeFhLinePage.action?" 
		 	 		+ "queryPara.DATE_TIME="
		 	 		+ dateTime
		 	 		+ "&queryPara.ID="
		 	 		+ id
		 	 		+ "&queryPara.dataType="
		 	 		+ dataType
		 	 		+ "&queryPara.station="
		 	 		+ station;
					$('#gisKhRealTimeFhLineFrame').attr('src',url);
					loadLineFlag = true;
		 		 }else{
		 			document.getElementById("gisKhRealTimeFhLineFrame").contentWindow.echartResize();
		 		 }
		 		
		 	 }else{
		 		if(!loadDataFlag){
		 	 		var url = "<%=basePath%>giszl/gisKhRealTimeFhDataPage.action?"
					+ "queryPara.DATE_TIME=" 
					+ dateTime 
					+ "&queryPara.ID="
					+ id 
					+ "&queryPara.dataType="
		 	 		+ dataType
					+ "&queryPara.station=" 
					+ station;
				$('#gisKhRealTimeFhDataFrame').attr('src', url);
				loadDataFlag = true;
		 	}
		}
	}
</script>
</html>
