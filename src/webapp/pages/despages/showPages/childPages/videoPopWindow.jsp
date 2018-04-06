<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String baseUrl = request.getContextPath();
String mainPath = baseUrl + "/pages/despages/common";
String mainTwoPath = baseUrl + "/pages/despages";
String jsPath = baseUrl + "/pages/despages/showPages/js";
String cssPath = baseUrl + "/pages/despages/showPages/css";
String imagePath = baseUrl + "/pages/despages/showPages/images";
String basePath = request.getScheme() + "://"
		+ request.getServerName() + ":" + request.getServerPort()
		+ baseUrl + "/";
String DVR_IP =  request.getParameter("DVR_IP");
String DVR_PORT =  request.getParameter("DVR_PORT");
String DVR_USERNAME =  request.getParameter("DVR_USERNAME");
String DVR_PASSWORD =  request.getParameter("DVR_PASSWORD");
String CHANNEL =  request.getParameter("CHANNEL");
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title></title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<link rel="stylesheet" type="text/css" href="<%=mainPath %>/jquery-easyui-1.5.1/themes/fangtian/easyui.css">
	<link rel="stylesheet" type="text/css" href="<%=mainPath %>/jquery-easyui-1.5.1/themes/icon.css">
	<link rel="stylesheet" type="text/css" href="<%=mainPath %>/jquery-easyui-1.5.1/themes/color.css">
	<script src="<%=jsPath%>/jquery-1.8.3.min.js"></script>
	<script type="text/javascript" src="<%=mainPath%>/jquery-easyui-1.5.1/jquery.easyui.min.js"></script>
	<script type="text/javascript">
	var m_roomMap = {
		DVR_IP : '<%=DVR_IP%>',
		DVR_PORT : '<%=DVR_PORT%>',
		DVR_USERNAME : '<%=DVR_USERNAME%>',
		DVR_PASSWORD : '<%=DVR_PASSWORD%>',
		CHANNEL : '<%=CHANNEL%>'
	};
	
	self.resizeTo(321, 203);
	width = screen.width;
	height = screen.height;
	self.moveTo((width-240)/2, (height-139)/2);
	</script>
  </head>
  
  <body>
    <div id="divPlugin" class="plugin" ></div>
    
    
    <script type="text/javascript" src="<%=mainPath%>/video/jquery.range.js"></script>
	<script type="text/javascript" src="<%=mainPath%>/video/webVideoCtrl.js"></script>
    <script type="text/javascript" src="<%=jsPath%>/videoPopWindow.js"></script>
    
  </body>
</html>
