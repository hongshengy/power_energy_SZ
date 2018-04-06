<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
String baseUrl = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+baseUrl+"/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
  	<head>   
	    <title>采集档案配置</title>
	    <jsp:include page="/pages/areaEnergy/common/head.jsp"></jsp:include>
	    <link rel="stylesheet" type="text/css" href="<%=basePath%>/pages/areaEnergy/common/css/tree.css">
		<script>
			$(function(){
				$("body").layout();
				$("#contextFrame").height($("body").height() - 4);
				//com.frontier.areaEnergy.baseData.init();
			});
		</script>
	</head>
	<body class="easyui-layout">
	    <input type="hidden" id='consId' name='consId' value="${param.consId}">
	    <input type="hidden" id='areaNo' name='areaNo' value="${param.areaNo}">
	    <input type='hidden' id='isEdit' name='isEdit' value="${param.isEdit}">
	    <input type='hidden' id='roleId' name='roleId' value="${param.roleId}">
	    <input type='hidden' id='roleCode' name='roleCode' value="${param.roleCode}">
	    <!-- 子客户ID -->
	    <input type="hidden" id='lineConsId' name='lineConsId' value="${param.lineConsId}">
		<div region="west" split="false" title="采集档案配置" style="width:200px;">
			<div id="tree"></div>
		</div>
		<div region="center">
			<iframe width="100%" height="100%" frameborder="0" scrolling="auto" id="contextFrame"></iframe>
		</div>
	</body>
	<script src="<%=basePath%>/pages/areaEnergy/baseData/baseDataNew.js"></script>
</html>
