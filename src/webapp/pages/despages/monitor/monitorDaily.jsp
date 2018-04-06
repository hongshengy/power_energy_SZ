<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page import="com.frontier.pubmodule.AueicUtil"%>
<%@ page import="com.frontier.framework.model.UserInfo" %>
<%
	String baseUrl  = request.getContextPath();
	String pagePath = baseUrl + "/pages/despages/common";
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+baseUrl+"/";
	UserInfo info = (UserInfo)session.getAttribute("userInfo");	
	session.setAttribute("itemCode","des_gdgl");
    session.setAttribute("itemName","监控日报");
    String subsId = request.getParameter("subsId");
    
%> 
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN""http://www.w3c.org/TR/HTML4/loose.dtd">
<html>
<head>
 	<meta charset="UTF-8"/>
    <title>监控日报</title>
    <link rel="stylesheet" type="text/css" href="<%=pagePath %>/lightbox/dist/css/lightbox.min.css">
    <link rel="stylesheet" type="text/css" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/fangtian/easyui.css">
	<link rel="stylesheet" type="text/css" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/icon.css">
	<link rel="stylesheet" type="text/css" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/color.css">
	<link rel="stylesheet" type="text/css" href="<%=pagePath %>/css/templet_common.css">
    <link rel="stylesheet" type="text/css" href="<%=pagePath %>/css/common.css">
    <script src="<%=pagePath %>/js/maskJs.js"></script>
</head>	
<body class="easyui-layout">
<script>
    var maskobj = new maskPanelManager();
    maskobj.register();
</script>
	<div class="main-panel noOverflow" data-options="region:'center'" >
		<div id="divSearch" class="easyui-panel" style="width: 100%;position: relative;" title="查询条件" data-options="cls:'fangtian-panel-style',onResize:autoResize">
			<ul class="s-ul-one" >
				<li>
				    <span>日期：</span>
				    <input id="searchTime" class="easyui-combobox" style="height:24px;width:155px" data-options="editable:false,prompt:'请选择',panelHeight:'auto'"/> 
				</li>
				<li id="selectTime" style="display:none;">
				    <span>选择时间：</span>
				    <input id="startTime" class="easyui-datebox"  style="height:24px;width:155px" data-options="editable:false,panelWidth:150"/>
					<input id="endTime" class="easyui-datebox"  style="height:24px;width:155px" data-options="editable:false,panelWidth:150"/>
				</li>
				<li class="s-right-one">
					<a href="#" class="easyui-linkbutton c100" onclick="labourList();" style="width: 80px;height: 24px;">查询</a>
				</li>
			</ul> 
		</div>
		
		<div id="c-panel" class="auto-resize easyui-panel" style="width: 100%;" data-options="cls:'fangtian-panel-style bottom-padding'">
			<!--内容区域（表格、图表等）-->
			<div id="gdgl-girdDetailView" ></div>
		</div>
	</div>
    <script type="text/javascript">
		var webContextRoot="<%=basePath%>";
		var jsPath = "<%=pagePath%>";
        var userId = '<%=((UserInfo)session.getAttribute("userInfo")).getUserId()%>';
        
        subsId = "<%=subsId%>"
        if(subsId == "0"){
        	var west = document.getElementById("west");
        	west.style.width = "0px";
        	//west.style.display = "none";
        }
    </script>
    <script type="text/javascript" src="<%=pagePath %>/jquery-easyui-1.5.1/jquery.min.js"></script>
    <script type="text/javascript" src="<%=pagePath %>/jquery-easyui-1.5.1/jquery.easyui.min.js"></script>
    <script type="text/javascript" src="<%=pagePath %>/jquery-easyui-1.5.1/easyui-lang-zh_CN.js"></script>
    <script type="text/javascript" src="<%=pagePath %>/jquery-easyui-1.5.1/datagrid-detailview.js"></script>
    <script type="text/javascript" src="<%=pagePath %>/js/jquery.vticker-min.js"></script>
    <script type="text/javascript" src="<%=pagePath %>/js/dateUtil.js"></script>
    <script type="text/javascript" src="<%=pagePath %>/ocupload/jquery.ocupload-1.1.2.js"></script>
    <script src="<%=pagePath%>/js/templet_common.js"></script>
    <script type="text/javascript" src="monitorDaily.js"></script>
    <!-- 百度api接口 测试环境注释，生产打开 -->
    <!-- <script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=CWy7fv2qnIgddvauxx3l2q8p1rSdWKFC"></script> -->
	<script type="text/javascript" src="<%=pagePath %>/js/map.js"></script>
</body>
</html>
