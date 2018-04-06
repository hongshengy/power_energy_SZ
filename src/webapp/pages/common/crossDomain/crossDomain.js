//自适应跨域问题
function selfAdaptCrossDomain(iframeId,otherHeight){
	$("body").prepend("<iframe id='selfAdaptCrossFrame' style='display:none;' src=''></iframe>");
	var url = parent.$("#crossBaseUrl").val()+"pages/common/crossDomain/selfAdapt.jsp?frameId="+iframeId+"&otherHeight="+otherHeight;
	$("#selfAdaptCrossFrame").attr("src",url);
	window.status='完成';
}