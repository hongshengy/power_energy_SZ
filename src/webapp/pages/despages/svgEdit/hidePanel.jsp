<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page import="javax.servlet.http.HttpSession" %>
<%@ page import="org.apache.struts2.ServletActionContext" %>
<%

String baseUrl  = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+baseUrl+"/";
String pagePath = baseUrl + "/pages/despages/common";	
String treePagePath = baseUrl + "/pages/areaEnergy/common";	
		
String consId = request.getParameter("consId");//获取调用父页面传过来的参数
String consName = request.getParameter("consName");//获取调用父页面传过来的参数


HttpSession hs=ServletActionContext.getRequest().getSession();

//hs.setAttribute("userId","66");
 //HttpSession session = request.getSession(); 
//HttpSession session = ServletActionContext.getRequest().getsession();
//String userId = session.getAttributr("userId");
//session.setAttribute("userId",userid)
/* session.setAttribute("itemCode","fgktxt");
session.setAttribute("itemName","空调系统"); */
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN""http://www.w3c.org/TR/HTML4/loose.dtd">

<html>
  <head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
 	<meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <meta http-equiv="Pragma" content="no-cache" />
	<meta http-equiv="Cache-Control" content="no-cache" />
	<meta http-equiv="Expires" content="0" />
    <title>隐藏页面</title>
</head>

<body class="easyui-layout">
<div style="color:red">隐藏页面</div>
<script type="text/javascript" src="jquery.js"></script>
<script src="<%=basePath%>/pages/despages/svgEdit/hidePanel.js" type="text/javascript"></script> 

</body>
  
</html>