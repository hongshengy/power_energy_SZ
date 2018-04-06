<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
 <%
    String baseUrl=request.getContextPath();
 %>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<title>统一代码分类维护</title>
 	<jsp:include page="/ext.jsp"/>
 	<script type="text/javascript" src="<%=baseUrl%>/js/common/comboboxTree.js"></script>
 	<script type="text/javascript" src="<%=baseUrl%>/js/common/comboboxComponent.js"></script>
   	<SCRIPT type="text/javascript" src="<%=baseUrl%>/pages/system/codeSort.js"></SCRIPT>
   	<SCRIPT type="text/javascript" src="<%=baseUrl%>/js/common/gridComponent.js"></SCRIPT>
   	<link rel="stylesheet" type="text/css" href="<%=baseUrl%>/css/admincd.css"/>
</head>  
<body>
</body>
<SCRIPT type="text/javascript">
		gdc.openModule(com.frontier.gdc.system.codeSort.init,null,gdc.mdlCfg);
	</SCRIPT>
</html>
