<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%
	String baseUrl=request.getContextPath();
	String pagePath=baseUrl+"/pages/system";
 %>
<html>
	<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta http-equiv="Pragma" content="no-cache" />
	<meta http-equiv="Cache-Control" content="no-cache" />
	<meta http-equiv="Expires" content="0" />
	<title>数据集合管理</title>
	<jsp:include page="/ext.jsp"/>
	<script type="text/javascript" src="<%= pagePath%>/dataSetList.js"></script>
	<script type="text/javascript" src="<%= pagePath%>/TreeCheckNodeUI.js"></script>
	
	</head>
	<body>
	<div id="grid-div"></div>
	</body>
	<script type="text/javascript">
		var asyncTreeActionUrl ;
		<%
			String adminType=request.getParameter("adminType");
			if("1".equals(adminType)){
			System.out.println("if");
		%>
		//asyncTreeActionUrl="/purviewTree/asyncAdminPurviewTree.action";
		//var syncTreeActionUrl="/purviewTree/syncAdminPurviewTree.action";
		asyncTreeActionUrl="/purviewTree/purviewTree.action?isPurview=true";
		<%	
			}else{
		%>
		//asyncTreeActionUrl="/purviewTree/findMeasurePointTreeJson.action";
		//var syncTreeActionUrl="/purviewTree/findSyncTreeJson.action";
		asyncTreeActionUrl="/purviewTree/purviewTree.action";
		<%				
			}
		%>
		//Ext.onReady(function() {
		//	com.frontier.gdc.system.dataSetList.newMainPanel();
		//});		
		gdc.openModule(com.frontier.gdc.system.dataSetList.newMainPanel,null,gdc.mdlCfg);		
	</script>
</html>
