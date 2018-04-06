<%@page import="com.frontier.basicApp.util.Util"%>
<META HTTP-EQUIV="Pragma" CONTENT="no-cache">
<META HTTP-EQUIV="Cache-Control" CONTENT="no-cache">
<META HTTP-EQUIV="Expires" CONTENT="0">
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" />
<%

String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<%@include file="/pages/common/crossDomain/crossDomain.jsp"%>
<script type="text/javascript" src="<%=basePath%>js/jquery.js"></script>
<script type="text/javascript">
window.onload = function(){
	 setTimeout("selfAdapt()",100);
	 window.status='完成';
}	
function selfAdapt(){
	var centerTabHeight = top.$("#centerTab").height();
	var tabHeight = top.$("#centerTab").children("div:first").get(0).offsetHeight;
	var pageHeight = centerTabHeight - tabHeight - 1;
	var url = '<%=crossBaseUrl%>pages/common/crossDomain/selfAdaptIfm.jsp?frameId=${param.frameId}&otherHeight=${param.otherHeight}&pageHeight='+pageHeight;
	$("#selfAdaptCrossFrame").attr("src",url);
}
</script>
<body>
<iframe id='selfAdaptCrossFrame' style='display:none;' src=""></iframe>
</body>
