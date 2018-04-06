<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String baseUrl = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ baseUrl + "/";
	String pagePath = baseUrl + "/pages/despages/common";
	String treePagePath = baseUrl + "/pages/areaEnergy/common";
	String rootId = request.getParameter("rootId");
	String treeNodeType = request.getParameter("treeNodeType");
	String dateTime = request.getParameter("dateTime");
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN""http://www.w3c.org/TR/HTML4/loose.dtd">

<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="Cache-Control" content="no-cache" />
<meta http-equiv="Expires" content="0" />
<title>小时电量</title>
<link rel="stylesheet"
	href="<%=pagePath%>/jquery-easyui-1.5.1/themes/fangtian/easyui.css">
<link rel="stylesheet"
	href="<%=pagePath%>/jquery-easyui-1.5.1/themes/icon.css">
<link rel="stylesheet"
	href="<%=pagePath%>/jquery-easyui-1.5.1/themes/color.css">
<link rel="stylesheet" href="<%=pagePath%>/css/common.css">
<link rel="stylesheet" type="text/css" href="<%=pagePath %>/css/templet_common.css">
<link rel="stylesheet"
	href="<%=baseUrl%>/resources/jsepc/css/ext-all.css">
<link rel="stylesheet" href="<%=treePagePath%>/css/tree.css">
<script src="<%=pagePath%>/js/maskJs.js"></script>
</head>

<body>
	<script>
		    var maskobj = new maskPanelManager();
		    maskobj.register();
	</script>
<style>
</style>
	<div id="cc" class="easyui-layout" style="width:100%;height:100%;" data-options="minWidth:1200">
		<div data-options="region:'north',title:'',split:false,collapsible:false,border:false"
			style="width:100%;height:100%;overflow: hidden;">
			<div class="easyui-panel" style="height: 15%;width: 100%;" data-options="cls:'fangtian-panel-style'">
				<ul class="ulTable">
					<li style="padding-left: 10px;">
						<span>&nbsp;</span>
						<input id="tree-multipleTree" style="width: 155px;"></li>
					<li>
						<span>数据日期:</span> 
						<input id="startDate" type="text" class="easyui-datebox" data-options="width:155,editable:false"></input>
					</li>
					<li class="liReport">
						<a id="btn" href="#" class="easyui-linkbutton c100" data-options="onClick:queryData">查询</a>
					</li>
				</ul>
			</div>
			<div class="easyui-panel" id="userChart" style="height: 85%;width: 100%;overflow: hidden;" data-options="cls:'fangtian-panel-style bottom-padding'"></div>
		</div>
	</div>
	<script type="text/javascript">
			rootId="<%=rootId%>";
			treeNodeType="<%=treeNodeType%>";
			dateTime="<%=dateTime%>";
		    webContextRoot="<%=basePath%>";
	</script>

	<script src="<%=pagePath%>/jquery-easyui-1.5.1/jquery.min.js"></script>
	<script src="<%=pagePath%>/jquery-easyui-1.5.1/jquery.easyui.min.js"></script>
	<script src="<%=pagePath%>/jquery-easyui-1.5.1/easyui-lang-zh_CN.js"></script>
	<script src="<%=pagePath%>/js/common.js"></script>
	<script type="text/javascript" src="<%=pagePath%>/js/dateUtil.js"></script>
	<script type="text/javascript"
		src="<%=pagePath%>/echarts/echarts.min.js"></script>
	<script type="text/javascript"
		src="<%=baseUrl%>/resources/ext-2.2.1/adapter/ext/ext-base.js"></script>
	<script type="text/javascript"
		src="<%=baseUrl%>/resources/ext-2.2.1/ext-all.js"></script>
	<script type="text/javascript"
		src="<%=pagePath%>/echarts/echartsGlobal.js"></script>
	<script type="text/javascript" src="xsdlData.js"></script>
</body>
</html>
