﻿<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="com.frontier.util.des.*"%>
<%
    String baseUrl  = request.getContextPath();
	String pagePath = baseUrl + "/pages/common";	
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://"
            + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
    
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
	    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>综合能源服务中心运管系统</title>
	</head>
	 
    <body>
    
	<form name="LoginForm" action="<%=basePath%>systemLogin/login.action" method="post">
		 <div class="login_box">
			  <table width="100%" border="0" cellspacing="0" cellpadding="0">
			  <tr>
				    <td style="padding-left:35px;" height="60" valign="top">
				       <input name="loginName" type="text" id="loginName" value="eems" style="display:none"/>
				    </td>
			  </tr>
			  <tr>
				    <td style="padding-left:35px;" height="70" valign="top">
				       <input name="password" type="text"  id="password" value="eems" style="display:none"/>
				    </td>
			  </tr>
			  <tr>
			    <td height="35"><br /></td>
			  </tr>
			</table>
		 </div>	
	</form>
	 
	</body>
	
	<script type="text/javascript">
		   	document.LoginForm.action = "<%=basePath%>/systemLogin/login.action";
		   	document.LoginForm.method = "post";
	        document.LoginForm.submit();
    </script>
</html>
