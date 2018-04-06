<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'modalDialogTimeOut.jsp' starting page</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	
  </head>
  <script type="text/javascript">
  	alert('连接超时请重新登录!');
  	if(window.dialogArguments){
		var windowArray = window.dialogArguments;
		window.close();
		for(var i=windowArray.length-1;i>0;i--){
			windowArray[i].close();
		}
		windowArray[0].top.location="<%=basePath%>pages/system/login.jsp";
	}else{
		window.top.location="<%=basePath%>pages/system/login.jsp";
	}
  </script>
  <body>
    
  </body>
</html>
