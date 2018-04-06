<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib uri="/fpus-tags" prefix="fpus"%>
<META HTTP-EQUIV="Pragma" CONTENT="no-cache">
<META HTTP-EQUIV="Cache-Control" CONTENT="no-cache">
<META HTTP-EQUIV="Expires" CONTENT="0">
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" />
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
String ChinaExcel_Version = "CODEBASE='"+basePath+"pages/chinaExcel/chinaExcelCab/chinaexcelweb3.8.8.1.cab#version=3,8,8,1'";
%>
<link type="text/css" rel="stylesheet" href="<%=basePath%>css/aueic.css" />
<script type="text/javascript" src="<%=basePath%>js/jquery.js"></script>
<script type="text/javascript" src="<%=basePath%>js/common_client.js"></script>
