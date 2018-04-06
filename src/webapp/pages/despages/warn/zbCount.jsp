<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String baseUrl = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ baseUrl + "/";
	String pagePath = baseUrl + "/pages/despages/common";
	session.setAttribute("itemCode", "deszbCount");
	session.setAttribute("itemName", "主变总数");
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
<title>主变信息</title>
<link rel="stylesheet"
	href="<%=pagePath%>/jquery-easyui-1.5.1/themes/fangtian/easyui.css">
<link rel="stylesheet" type="text/css" href="<%=pagePath %>/css/templet_common.css">
<link rel="stylesheet"
	href="<%=pagePath%>/jquery-easyui-1.5.1/themes/icon.css">
<link rel="stylesheet"
	href="<%=pagePath%>/jquery-easyui-1.5.1/themes/color.css">
<link rel="stylesheet" href="<%=pagePath%>/css/common.css">
<script src="<%=pagePath%>/js/maskJs.js"></script>
</head>

<body>
	<script>
		    var maskobj = new maskPanelManager();
		    maskobj.register();
		</script>
	<style>
#gjxxpz-panel .search-panel {
	background-color: #EFEFEF;
}

#gjxxpz-panel .grid-panel {
	background-color: #EFEFEF;
}

#gjxxpz-panel .form-table {
	font-size: 12px;
	border-spacing: 0px;
}

#gjxxpz-panel .form-table .td-label {
	width: 80px;
	text-align: center;
}

#gjxxpz-panel .form-table .td-value {
	width: 160px;
}

#gjxxpz-panel .form-table .td-fillwidth {
	width: 40px;
}
</style>
	<div id="cc" class="easyui-layout" style="width:100%;height:100%;" data-options="minWidth:1200">
		<div data-options="region:'north',title:'',split:false,collapsible:false,border:false"
			style="width:100%;height:100%;overflow: hidden;" >
			<div class="easyui-panel" style="height: 15%;width: 100%;" data-options="cls:'fangtian-panel-style'">
				<ul class="ulTable">
					<li style="padding-left: 10px;">
						<span>主变名称:</span> 
						<input class="easyui-textbox" style="width:100px" id="zbName">
					</li>
					<li>
						<span>主变编号:</span> 
						<input class="easyui-textbox" style="width:100px" id="zbNoName">
					</li>
					<li>
						<span>所属客户:</span> 
						<input class="easyui-textbox" style="width:100px" id="userName">
					</li>
					<li>
						<span>所属变电站:</span> 
						<input class="easyui-textbox" style="width:100px" id="consName">
					</li>
					<li>
						<span>运行状态:</span> 
						<select class="easyui-combobox" id="yxzt"
						data-options="width:120,panelHeight:'auto',panelWidth:120"></select>
					</li>
					<li>
						<span>电压等级:</span> 
						<select class="easyui-combobox" id="dydj"
						data-options="width:120,panelHeight:'auto',panelWidth:120"></select>
					</li>
					<li class="liReport">
						<a id="btn" href="#" class="easyui-linkbutton c100" data-options="onClick:updateTime">查询</a>
					</li>
				</ul>
			</div>
			<div class="easyui-panel" style="height: 85%;width: 100%;overflow: hidden;"
				data-options="cls:'fangtian-panel-style bottom-padding'">
				<table id="bdzCount-datagrid"></table>
			</div>
		</div>
	</div>
	
	
<!-- 	<div id="gjxxpz-panel" style="width: 100%; height: 100%;"> -->
<!-- 		<div class="easyui-panel" style="position: relative;padding: 10px;" -->
<!-- 			data-options="fit: true,border: false"> -->
<!-- 			<div class="toolsbar-panel"> -->
<!-- 				<div class="tbRow"> -->
<!-- 					<span class="tools-labelgroup"> <label -->
<!-- 						class="tb-group-label">主变名称:</label> <input class="easyui-textbox" -->
<!-- 						style="width:100px" id="zbName"> -->
<!-- 					</span> <span class="tools-labelgroup"> <label -->
<!-- 						class="tb-group-label">主变编号:</label> <input class="easyui-textbox" -->
<!-- 						style="width:100px" id="zbNoName"> -->
<!-- 					</span> <span class="tools-labelgroup"> <label -->
<!-- 						class="tb-group-label">所属用户:</label> <input class="easyui-textbox" -->
<!-- 						style="width:100px" id="userName"> -->
<!-- 					</span> <span class="tools-labelgroup"> <label -->
<!-- 						class="tb-group-label">所属变电站:</label> <input -->
<!-- 						class="easyui-textbox" style="width:100px" id="consName"> -->
<!-- 					</span> <span class="tools-labelgroup"> 运行状态: <select -->
<!-- 						class="easyui-combobox" id="yxzt" -->
<!-- 						data-options="width:120,panelHeight:'auto',panelWidth:120"></select> -->
<!-- 					</span> <span class="tools-labelgroup"> 电压等级: <select -->
<!-- 						class="easyui-combobox" id="dydj" -->
<!-- 						data-options="width:120,panelHeight:'auto',panelWidth:120"></select> -->
<!-- 					</span> <span class="tools-labelgroup"> <a id="btn" href="#" -->
<!-- 						class="easyui-linkbutton c9 shadow" -->
<!-- 						data-options="width:80,onClick:updateTime">查询</a> -->
<!-- 					</span> -->
<!-- 				</div> -->
<!-- 			</div> -->
<!-- 			<div -->
<!-- 				style="position: absolute;top: 65px; right:10px; left:10px; bottom: 10px;"> -->
<!-- 				<table id="bdzCount-datagrid"></table> -->
<!-- 			</div> -->
<!-- 		</div> -->
<!-- 	</div> -->
	<script type="text/javascript">
				webContextRoot="<%=basePath%>";
	</script>
	<script src="<%=pagePath%>/jquery-easyui-1.5.1/jquery.min.js"></script>
	<script src="<%=pagePath%>/jquery-easyui-1.5.1/jquery.easyui.min.js"></script>
	<script src="<%=pagePath%>/jquery-easyui-1.5.1/easyui-lang-zh_CN.js"></script>
	<script src="<%=pagePath%>/js/common.js"></script>
	<script type="text/javascript" src="<%=pagePath%>/js/dateUtil.js"></script>
	<script type="text/javascript" src="<%=pagePath%>/js/validator.js"></script>
	<script type="text/javascript" src="zbCount.js"></script>

</body>
</html>
