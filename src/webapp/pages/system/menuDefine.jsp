<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>功能菜单定义</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<link rel="stylesheet" type="text/css" href="<%=basePath%>/css/style.css">
	<jsp:include page="/ext.jsp"/>
	<script type="text/javascript" src="<%=basePath%>/pages/system/frameToolbar.js"></script>
	<link rel="stylesheet" type="text/css" href="<%= basePath%>/js/FileField/Ext.ux.form.FileField.css" />
	<link rel="stylesheet" type="text/css" href="<%= basePath%>/js/FileField/file-upload.css"/>
	<script type="text/javascript" src="<%= basePath%>/js/FileField/Ext.ux.form.FileField.js"></script>
	<script type="text/javascript" src="<%= basePath%>/js/FileField/FileUploadField.js"></script>
  	<script type="text/javascript" src="<%=basePath%>/pages/system/menuDefine.js"></script>
  	<link rel="stylesheet" type="text/css" href="<%=basePath%>/css/admincd.css"/>
	
  </head>
  <style type="text/css">
		
        #main-panel td {
        	padding:30px;	
        }
	</style>
  <body>
  </body>
  <script type="text/javascript">
  		Ext.onReady(function(){
			Ext.QuickTips.init();
	   		gdc.openModule(com.frontier.gdc.system.menuDefine.newMainPanel,null,gdc.mdlCfg);			
	  	})
		//gdc.openModule(com.frontier.gdc.system.menuDefine.newMainPanel,null,gdc.mdlCfg);			
  </script>
</html>
