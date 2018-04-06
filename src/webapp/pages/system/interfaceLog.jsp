<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'interfaceLog.jsp' starting page</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<jsp:include page="/ext.jsp"/>
	<script type="text/javascript" src="<%= basePath%>/js/common/gridComponent.js"></script>
  	<script type="text/javascript" src="<%=basePath%>/pages/system/interfaceLog.js"></script>

  </head>
  
  <body>
     <script>
	  	Ext.onReady(function(){
			Ext.QuickTips.init();
	   		gdc.openModule(com.frontier.gdc.system.interfaceLog.newMainPanel,null,gdc.mdlCfg);			
	  	})
 	</script>
  </body>
</html>
