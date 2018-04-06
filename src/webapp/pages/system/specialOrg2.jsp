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
	<title>业务组织管理</title>
	<jsp:include page="/ext.jsp"/>
	<script type="text/javascript" src="<%= baseUrl%>/js/common/gridComponent.js"></script>
	<script type="text/javascript" src="<%= baseUrl%>/js/common/comboboxTree.js"></script>
	<script type="text/javascript" src="<%= baseUrl%>/js/common/comboboxComponent.js"></script>
	<script type="text/javascript" src="<%= pagePath%>/specialOrg2.js"></script>
	</head>
	<body>
	</body>
	<script type="text/javascript">
		gdc.openModule(com.frontier.gdc.system.specialOrg2.newMainPanel,null,gdc.mdlCfg);
		//Ext.onReady(function() {
		//	com.frontier.gdc.system.specialOrg.newMainPanel();
		//});			
	</script>
</html>
