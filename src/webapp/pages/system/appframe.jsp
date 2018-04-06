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
	<link rel="stylesheet" type="text/css" href="<%=basePath%>/css/style.css">
	<jsp:include page="/ext.jsp"/>
	<script>
 		var userName = '<%=((UserInfo)session.getAttribute("userInfo")).getUserName()%>';
 		var specialOrgName = '<%=((UserInfo)session.getAttribute("userInfo")).getUserOrgName()%>';
 	</script>
  	<script type="text/javascript" src="<%=basePath%>/pages/system/appframe.js"></script>
  	<script type="text/javascript" src="<%=basePath%>/pages/system/frameToolbar.js"></script>
  	<script type="text/javascript" src="<%= basePath%>/js/common/gridComponent.js"></script>
  	<script type="text/javascript" src="<%=basePath%>/pages/workflow/workFlowRunShow.js"></script>
  	<script type="text/javascript" src="<%=basePath%>/pages/workflow/mattersConcerned.js"></script>
  </head>
  
 
 	
  <body>
  	<script>
	  	Ext.onReady(function(){
	  		Ext.QuickTips.init();
	    	//界面风格转向
	 		var windowOpen = gdc.openModule.request('windowOpen');
	 		if(gdc.hideBrowserMenu=='Y' && windowOpen==''){
	 			if(window.top){
	 				window.top.close();
	 			}
	 			if(gdc.interfaceStyle=='T'){
	 				window.top.open(gdc.webContextRoot+'/pages/system/appframe.jsp?windowOpen=true','_blank','resizable=yes,status=yes,scrollbars=yes,left=0,top=0');
	 			}else if(gdc.interfaceStyle=='E'){
	 				window.top.open(gdc.webContextRoot+'/pages/system/erectStyleMain.jsp','_blank','resizable=yes,status=yes,scrollbars=yes,left=0,top=0');
	 			}else{
	 				window.top.open(gdc.webContextRoot+'/pages/system/desktop.jsp?windowOpen=true','_blank','resizable=yes,status=yes,scrollbars=yes,left=0,top=0');
	 			}
	 		}else{
				if(gdc.interfaceStyle=='T'){
	 				//gdc.openModule(com.frontier.gdc.system.appframe.newMainPanel,null,gdc.mdlCfg);
	 				com.frontier.gdc.system.appframe.newMainPanel();
	 			}else if(gdc.interfaceStyle=='E'){
	 				window.top.location=gdc.webContextRoot+'/pages/system/erectStyleMain.jsp';
	 				//gdc.openModule.openModule(com.frontier.gdc.system.oprationSystemManager.newMainPanel(),'select');
	 			}else{
	 				window.top.location=gdc.webContextRoot+'/pages/system/desktop.jsp';
	 				//gdc.openModule.openModule(com.frontier.gdc.system.oprationSystemManager.newMainPanel(),'select');
	 			}
			}
				
		});
    </script>
  </body>
</html>
