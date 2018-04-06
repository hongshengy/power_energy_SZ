/**
 * 十个弹出展示例子
 * @author 王梓璇
 * @since 2017-04-12
 */
 
$(function(){
 
}); 
//客户总数
var userWindow = null;
function userTotal(){
	
	var content = "<iframe src='"+webContextRoot+"pages/areaEnergy/baseData/collArchiveInfo.jsp?isEdit=false' width='100%' height='99%' frameborder='0' scrolling='no'/>";	
	var boarddiv = "<div id='msgwindow' title='详情'/>";
	$(document.body).append(boarddiv);
	var win = $("#msgwindow").dialog({
		content : content,
		width : document.body.clientWidth-160,
		height : document.body.clientHeight-160,
		maximizable:true,
		closable:true,
		modal : 'shadow',
		title : '客户总数',
	});
	win.dialog('open');
	
	
//	var url = webContextRoot + 'pages/areaEnergy/baseData/collArchiveInfo.jsp?isEdit=false'; 
//	helpWindow = window.open(url,'_blank','resizable=no,status=no,scrollbar-x=no,width=900,height=700');
}

//变电站总数
function bdzTotal(){
	var content = "<iframe src='"+webContextRoot+"/pages/despages/warn/bdzCount.jsp' width='100%' height='99%' frameborder='0' scrolling='no'/>";	
	var boarddiv = "<div id='msgwindow' title='详情'/>";
	$(document.body).append(boarddiv);
	var win = $("#msgwindow").dialog({
		content : content,
		width : document.body.clientWidth-160,
		height : document.body.clientHeight-160,
		maximizable:true,
		closable:true,
		modal : 'shadow',
		title : '变电站总数',
	});
	win.dialog('open');
//     	var url = webContextRoot + '/pages/despages/warn/bdzCount.jsp';  
//     	bdzWindow = window.open(url,'_blank','resizable=no,status=no,scrollbar-x=no,width=900,height=700');
}

//主变数量
function zbCount(){
	var content = "<iframe src='"+webContextRoot+"/pages/despages/warn/zbCount.jsp' width='100%' height='99%' frameborder='0' scrolling='no'/>";	
	var boarddiv = "<div id='msgwindow' title='详情'/>";
	$(document.body).append(boarddiv);
	var win = $("#msgwindow").dialog({
		content : content,
		width : document.body.clientWidth-160,
		height : document.body.clientHeight-160,
		maximizable:true,
		closable:true,
		modal : 'shadow',
		title : '主变数量',
	});
	win.dialog('open');
//	var url = webContextRoot + '/pages/despages/warn/zbCount.jsp';  
//	zbWindow = window.open(url,'_blank','resizable=no,status=no,scrollbar-x=no,width=900,height=700');

}

//主变总容量
function zbTotal(){
	var content = "<iframe src='"+webContextRoot+"/pages/despages/warn/zbCount.jsp' width='100%' height='99%' frameborder='0' scrolling='no'/>";	
	var boarddiv = "<div id='msgwindow' title='详情'/>";
	$(document.body).append(boarddiv);
	var win = $("#msgwindow").dialog({
		content : content,
		width : document.body.clientWidth-160,
		height : document.body.clientHeight-160,
		maximizable:true,
		closable:true,
		modal : 'shadow',
		title : '主变总容量',
	});
	win.dialog('open');
}

//进出线数据
function jcxData(){
	var codeId = 101000001077;
	var hheight = 40;
	var content = "<iframe src='"+webContextRoot+"pages/areaEnergy/consDataCentre/jcxsjTAB.jsp?codeId="+codeId+"&hheight="+hheight+"' width='100%' height='99%' frameborder='0' scrolling='no'/>";	
	var boarddiv = "<div id='msgwindow' title='详情'/>";
	$(document.body).append(boarddiv);
	var win = $("#msgwindow").dialog({
		content : content,
		width : document.body.clientWidth-160,
		height : document.body.clientHeight-160,
		maximizable:true,
		closable:true,
		modal : 'shadow',
		title : '进出线数据',
	});
	win.dialog('open');
//	var url = webContextRoot+"pages/areaEnergy/consDataCentre/jcxsjTAB.jsp?codeId="+codeId+"&hheight="+hheight;
//	jcxWindow = window.open(url,'_blank','resizable=no,status=no,scrollbar-x=no,width=900,height=700');
}

//小时数据
var xsWindow = null;
function xsData(){
	var consId = 101000001077;//你要传的企业id
	var dateTime = "2017-03-31";//查询时间，不需要传空
	var content = "<iframe src='"+webContextRoot+"/pages/despages/warn/xsdlData.jsp?consId="+consId+"&dateTime="+dateTime+"' width='100%' height='99%' frameborder='0' scrolling='no'/>";
	var boarddiv = "<div id='msgwindow' title='详情'/>";
	$(document.body).append(boarddiv);
	var win = $("#msgwindow").dialog({
		content : content,
		width : document.body.clientWidth-160,
		height : document.body.clientHeight-160,
		maximizable:true,
		closable:true,
		modal : 'shadow',
		title : '小时数据',
	});
	win.dialog('open');
	
}
//实时数据
function ssfhData(){
	var content = "<iframe src='"+webContextRoot+"/pages/despages/monitor/gisDlInfo.jsp' width='100%' height='99%' frameborder='0' scrolling='no'/>";	
 	var boarddiv = "<div id='msgwindow' title='详情'/>";
 	$(document.body).append(boarddiv);
 	var win = $("#msgwindow").dialog({
 		content : content,
 		width : document.body.clientWidth-200,
 		height : document.body.clientHeight-100,
 		maximizable:true,
 		closable:true,
 		modal : 'shadow',
 		title : '实时数据',
// 		onClose : function() {
// 			$(this).window('close');
// 		}
 	});
 	win.dialog('open');
}
//昨日电量
function zrdlData(){
	
	var content = "<iframe src='"+webContextRoot+"/pages/despages/monitor/gisLineInfo.jsp' width='100%' height='99%' frameborder='0' scrolling='no'/>";	
	var boarddiv = "<div id='msgwindow' title='详情'/>";
	$(document.body).append(boarddiv);
	var win = $("#msgwindow").dialog({
		content : content,
		width : document.body.clientWidth-160,
		height : document.body.clientHeight-160,
		maximizable:true,
		closable:true,
		modal : 'shadow',
		title : '小时数据',
	});
	win.dialog('open');
	
}
//工单详情
function gdxqData(){
	var subsId = null;
	var content = "<iframe src='"+webContextRoot+"/pages/despages/labour/labour.jsp?subsId="+subsId+"' width='100%' height='99%' frameborder='0' scrolling='no'/>";	
 	var boarddiv = "<div id='msgwindow' title='工单详情'/>";
 	$(document.body).append(boarddiv);
 	var win = $("#msgwindow").dialog({
 		content : content,
 		width : document.body.clientWidth-200,
 		height : document.body.clientHeight-100,
 		maximizable:true,
 		closable:true,
 		modal : 'shadow',
 		title : '工单详情',
// 		onClose : function() {
// 			$(this).window('close');
// 		}
 	});
 	win.dialog('open');

}
//告警信息
function gjData(){
	testOpen('',1,0,'','告警信息');

}

