<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%

String baseUrl  = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+baseUrl+"/";
String pagePath = baseUrl + "/pages/despages/common";	
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN""http://www.w3c.org/TR/HTML4/loose.dtd">

<html>
  <head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
 	<meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <meta http-equiv="Pragma" content="no-cache" />
	<meta http-equiv="Cache-Control" content="no-cache" />
	<meta http-equiv="Expires" content="0" />
    <title>sql执行</title>
    <link rel="stylesheet" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/fangtian/easyui.css">
    <link rel="stylesheet" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/icon.css">
    <link rel="stylesheet" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/color.css">
    <link rel="stylesheet" href="<%=pagePath %>/css/common.css">
    <link rel="stylesheet" type="text/css" href="<%=pagePath %>/css/templet_common.css">
    <link rel="stylesheet" href="<%=pagePath%>/codemirror/lib/codemirror.css" />
	<link rel="stylesheet" href="<%=pagePath%>/codemirror/lib/show-hint.css" />
    <script src="<%=pagePath %>/js/maskJs.js"></script>
</head>

<body class="easyui-layout">
	<script>
	    var maskobj = new maskPanelManager();
	    maskobj.register();
	</script>
<style>	
</style> 
	<div class="main-panel noOverflow" style="width: 100%;height:100%;" data-options="region:'center',border:false" >
		<div id="content-panel" class="auto-resize easyui-panel main-panel " style="width: 100%;height:100%;overflow-x:hidden" data-options="cls:'fangtian-panel-style bottom-padding',onResize:autoResize">
		    <div class="easyui-panel show-bottom-border noOverflow" style="width: 100%;height:8%;position: relative;" data-options="onResize:autoResize,border:false">
		    	<ul class="s-ul-one" >
	                <li>
					    <span>当前地区：</span>
					    <input id="nowArea" class="easyui-textbox" readonly="true" style="height:24px;width:155px" >
					</li>
	                <li>
					    <span>用户：</span>
					    <input id="oracleName" class="easyui-textbox" style="height:24px;width:155px">
					</li>
					<li>
					    <span>密码：</span>
					    <input id="oraclePassword" class="easyui-passwordbox" style="height:24px;width:155px">
					</li>
				</ul>
			</div>
			
			<!-- SQL begin --> 
			<div style="width: 100%;height:39%;position: relative;" data-options="onResize:autoResize,border:false">
				<div id="tabs" class="easyui-tabs" style="width: 100%;height: 100%;" data-options="border:false">
					<div title="SQL" class="main-panel auto-resize noOverflow" data-options="selected:true,onResize:autoResize">
						<div class="auto-resize easyui-panel noOverflow" style="width: 100%;overflow-x:hidden;" data-options="border:false">
							<textarea id="sqlText"></textarea>
						</div>
					</div>	
				</div>	
			</div>
			<div class="easyui-panel noOverflow" style="width: 100%;height:8%;position: relative;" data-options="onResize:autoResize">
		    	<ul class="s-ul-one" >
					<li>
						<span class="tools-labelgroup">
<!-- 							<span class="tools-labelgroup" > -->
<!-- 								执行状态： -->
<!-- 								<input id="executeType" class="easyui-textbox" readonly="true" style="height:24px;width:80px;"/> -->
<!-- 							</span> -->
							<span class="tools-labelgroup" >
								执行时长：
								<input id="executeTime" class="easyui-textbox" readonly="true" style="height:24px;width:80px;text-align:right"/>
								秒
							</span>
							<span class="tools-labelgroup" >
								<a id="clearSqlButton" href="#" class="easyui-linkbutton c100" onclick="clearSql();">清空</a>
							</span>
						</span>
					</li>
						<li class="s-right-one">
							<a id="commandExecuteButton" href="#" class="easyui-linkbutton c100" onclick="commandExecute();">命令执行</a>
							<a id="sqlQueryButton" href="#" class="easyui-linkbutton c100" onclick="sqlQuery();">结果查询</a>
						</li>
					</ul>
			</div>
			<!-- SQL end --> 
			<!-- 执行结果 begin -->
			<div style="width: 100%;height:45%;position: relative;" data-options="onResize:autoResize,border:false">
				<div id="tabs" class="easyui-tabs" style="width: 100%;height: 100%;" data-options="border:false">
					<div title="执行结果" class="main-panel auto-resize noOverflow" data-options="selected:true,onResize:autoResize">
						<div class="auto-resize easyui-panel noOverflow" style="width: 100%;overflow-x:hidden;" data-options="border:false">
							<table id="resultTable" ></table>
						</div>
					</div>	
				</div>	
			</div>
			<!-- 执行结果 end -->
		</div>
	</div>
	<div id="executeLoading" style="display:none;position:absolute;top:40%;left:40%;width:500px;height:200px;font-size:28px;font-weight:bold;">
		<img src="<%=basePath %>pages/despages/common/lightbox/dist/images/loading.gif"/>
		<label style="position:relative;top:-4px;">正在执行，请稍候……</label>
	</div>
<script type="text/javascript">
		var webContextRoot="<%=basePath%>";
</script>
<script src="<%=pagePath %>/jquery-easyui-1.5.1/jquery.min.js"></script>
<script src="<%=pagePath %>/jquery-easyui-1.5.1/jquery.easyui.min.js"></script>
<script src="<%=pagePath %>/jquery-easyui-1.5.1/easyui-lang-zh_CN.js"></script>
<script src="<%=pagePath %>/js/common.js"></script>
<script src="<%=pagePath%>/js/templet_common.js"></script>
<script src="<%=pagePath %>/js/base64.js"></script>
<script type="text/javascript" src="<%=pagePath%>/codemirror/lib/codemirror.js"></script>
<script type="text/javascript" src="<%=pagePath%>/codemirror/lib/sql.js"></script>
<script type="text/javascript" src="<%=pagePath%>/codemirror/lib/show-hint.js"></script>
<script type="text/javascript" src="<%=baseUrl%>/pages/despages/monitor/sqlExecute.js"></script>

</body>
  
</html>