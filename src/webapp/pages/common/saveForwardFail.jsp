<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib uri="/fpus-tags" prefix="fpus"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<html>
	<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<link type="text/css" rel="stylesheet" href="<%=basePath%>css/aueic.css" />
	<script type="text/javascript" src="<%=basePath%>js/jquery.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/common_client.js"></script>
	<title>公共失败页面</title>
	</head> 
  <body>
  		
  	
  </body>
  	<script type="text/javascript">
		if("" != '${message}'){
			alert('${message}');
		}
		closeWindow();
		function closeWindow(){
			window.returnValue='fail'; 
			window.close();
		}
	</script>	
</html>
