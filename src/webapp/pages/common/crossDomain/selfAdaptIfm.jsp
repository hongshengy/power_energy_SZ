<META HTTP-EQUIV="Pragma" CONTENT="no-cache">
<META HTTP-EQUIV="Cache-Control" CONTENT="no-cache">
<META HTTP-EQUIV="Expires" CONTENT="0">
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" />
<%

String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<script type="text/javascript" src="<%=basePath%>js/jquery.js"></script>
<script type="text/javascript">
window.onload = function(){
	setTimeout("selfAdapt()",100);
	window.status='完成';
}	

function selfAdapt(){
	//获取查询条件所在页面的window对象
	var pageWindow = parent.parent.parent;
	//当前页面的高度
	var pageHeight = '${param.pageHeight}';
	//查询条件的高度
	var conditionHeight = $(pageWindow.document).find(".message:first").get(0).offsetHeight;
	var otherHeight = '${param.otherHeight}';
	var gridHeight = pageHeight - conditionHeight - otherHeight;
	parent.parent.$(".dataGrid:first").parent().css("height",gridHeight).parent().parent().parent().parent().height(gridHeight + 30);
    $(pageWindow.document).find("#${param.frameId}").css("height",gridHeight+Number(otherHeight)-12);
}
</script>
<body>
</body>
