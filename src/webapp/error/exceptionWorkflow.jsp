<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isErrorPage="true" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>错误信息</title>
		<jsp:include page="/ext.jsp"/>
		<script type="text/javascript">
		Ext.onReady(function(){gdc.errordlg.show(${em});});
		</script>
	</head>
	<body></body>
</html>