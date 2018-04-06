<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String baseUrl = request.getContextPath();
	String mainCssPath = baseUrl + "/pages/despages/common";
	String jsPath = baseUrl + "/pages/despages/showPages/js";
	String cssPath = baseUrl + "/pages/despages/showPages/css";
	String imagePath = baseUrl + "/pages/despages/showPages/images";
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ baseUrl + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>用户分布图</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<script src="<%=jsPath%>/jquery-1.8.3.min.js"></script>
	
	<link rel="stylesheet" type="text/css" href="<%=cssPath%>/main.css" />
	<script type="text/javascript">
		var imagePath = "<%=imagePath%>";
	</script>
  </head>
  
  <body>
<!--   		<div id="menuTop"></div> -->
  		<div id="mainDiv">
  			<div style="width:1810px;height:785px;margin:5px auto;border: #038A8E 2px solid;">
	  			<iframe id="iframe0" name="iframe0" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" width="1810" height="785" src="<%=basePath%>/pages/despages/monitor/GISZongLan.jsp"></iframe>
  			</div>
  		</div>
		
<!--     	<script src="<%=jsPath%>/menu.js"></script> -->
  </body>
</html>
