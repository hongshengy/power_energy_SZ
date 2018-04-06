<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
 <%
    String baseUrl=request.getContextPath();
 %>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<title>数据类型</title>
 	<jsp:include page="/ext.jsp"/>
 	<script type="text/javascript" src="<%=baseUrl%>/js/common/elementHandle.js"></script>
   	<SCRIPT type="text/javascript" src="<%=baseUrl%>/pages/system/datatype.js"></SCRIPT>
	<SCRIPT type="text/javascript">
		Ext.onReady(function() {
			com.frontier.gdc.shishishuju.datatype.init();
		});
	</SCRIPT>
</head>  
<body>

<div id="tree-div"></div>



<s:property value="start"/>
<div id="topic-win" class="x-hidden">
<div class="x-window-header">Hello Dialog</div>
<div id="topic-tabs"></div>
</div>

<div id="topic-edit" class="x-hidden">
<div class="x-window-header">Hello Dialog</div>
<div id="topic-tabs"></div>
</div>
<div style="height: 200px;width: 150px;display: none;"></div>
<div id="topic-search" class="x-hidden">
<div class="x-window-header">Hello Dialog</div>
<div id="topic-tabs"></div>
</div>
</body>
</html>
