/**
 * 吴哲
 * 
 */
var win;
var flag = true;

//调用告警信息
function testOpen(subsId,bianwei,gaojing,eventId,title){ //不要传null 传''
	var yhid;
	if(typeof consId == 'undefined'){
		yhid = ''
	}else{
		yhid = consId;
	}
	var content = "<iframe id='gjxx' src='/des/pages/despages/warn/GaoJingXinXi.jsp?&eventId="+eventId+"&subsId="+subsId+"&bianwei="+bianwei+"&gaojing="+gaojing+"&consId="+yhid+"' width='100%' height='99%' frameborder='0' scrolling='no'/>";	
	var boarddiv = "<div id='msgwindow' title='详情' style='z-index:3'/>";
	$(document.body).append(boarddiv);
	win = $("#msgwindow").dialog({
		content : content,
		width : document.body.clientWidth-100,
		height : document.body.clientHeight-100,
		maximizable:true,
		closable:true,
		modal : 'shadow',
		title : title,
		onClose : function() {
			document.getElementById("gjxx").contentWindow.closeGJSetInterval();
		}
	});
	win.dialog('open');

}

function testClose(){
	win.dialog('close');
}