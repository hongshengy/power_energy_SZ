<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page import="com.frontier.framework.model.UserInfo" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>江苏方天电力统一服务平台</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<jsp:include page="/ext.jsp"/>
	<script>
 		var userName = '<%=((UserInfo)session.getAttribute("userInfo")).getUserName()%>';
 		var specialOrgName = '<%=((UserInfo)session.getAttribute("userInfo")).getUserOrgName()%>';
 	</script>
  	<script type="text/javascript" src="<%=basePath%>/pages/system/erectStyleMain.js"></script>
  	<script type="text/javascript" src="<%=basePath%>/pages/system/frameToolbar.js"></script>
  	<script type="text/javascript" src="<%= basePath%>/js/common/gridComponent.js"></script>
  	<script type="text/javascript" src="<%=basePath%>/pages/workflow/mattersConcerned.js"></script>
  	<script type="text/javascript" src="<%=basePath%>/pages/workflow/workFlowRunShow.js"></script>
  </head>
  
  <body>
     <script>
	  	Ext.onReady(function(){
			Ext.QuickTips.init();
	   		gdc.openModule(com.frontier.gdc.system.erectStyleMain.newMainPanel,null,gdc.mdlCfg);			
	  	})
 </script>
  </body>
</html>
