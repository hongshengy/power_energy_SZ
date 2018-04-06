<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	String consId = request.getParameter("consId");
	//String userTranId = request.getParameter("userTranId");
	String svgType = request.getParameter("svgType");
	String funcId = request.getParameter("funcId");//获取调用父页面传过来的参数
	session.setAttribute("itemCode","energy");
    session.setAttribute("itemName","能效图");
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<meta charset="UTF-8">
<%-- <link rel="stylesheet" type="text/css"
	href="<%=basePath%>pages/despages/common/css/style.css">  --%>
<link rel="stylesheet" type="text/css"
	href="<%=basePath%>pages/despages/common/jquery-easyui-1.5.1/themes/default/easyui.css">
<link rel="stylesheet" type="text/css"
	href="<%=basePath%>pages/despages/common/jquery-easyui-1.5.1/themes/icon.css">
<link rel="stylesheet" href="<%=basePath%>pages/despages/common/jquery-easyui-1.5.1/themes/color.css">
<%-- <link rel="stylesheet" type="text/css"
	href="<%=basePath%>pages/despages/common/css/jquery.webui-popover.min.css"> --%>
<link rel="stylesheet" type="text/css"
	href="<%=basePath%>pages/despages/common/css/jquery.webui-popover.css">
<link rel="stylesheet" type="text/css"
	href="<%=basePath%>pages/despages/common/css/tooltip-viewport.css">
<link rel="stylesheet" href="<%=basePath%>pages/despages/common/css/common.css">
<link rel="stylesheet" href="<%=basePath%>pages/areaEnergy/common/css/tree.css" type="text/css"/>
<link rel="stylesheet" type="text/css" href="<%=basePath%>pages/despages/common/css/templet_common.css">
<script src="<%=basePath%>/pages/despages/common/js/maskJs.js">
</script>
<style>
.tree-file {
	background: url("../common/images/cons.png") no-repeat;
}

.tree-folder-open {
	background: url("../common/images/tmnl.png") no-repeat;
}
#dialogMonitor{
    overflow: hidden;
}

#dialogMonitor iframe{
    height: 100%;
    width: 100%;
}
.circle{
	display:inline-block;
	width:16px;
	height:16px;
	border-radius:50%;
	margin:0 16px;		
	cursor:pointer
}
.circleNormal{
background:#C1C1C1;
box-shadow:0px 0px 6px rgba(0,0,0,0.3);
}
.circleNormal:hover{
background:#FFDA43;
box-shadow:0px 0px 6px rgba(0,0,0,0.5);
}
.circleSelect{
	background:#FF6600;
	box-shadow:0px 0px 6px rgba(0,0,0,0.3);
}
 #dialog2{
            overflow: hidden;
        }

#dialog2 iframe{
    height: 100%;
    width: 100%;
}
.flt {
	float: left;
}
.frt {
	float: right;
}
.clear {
	clear: both;
}
.lt {
	text-align: left;
}

.ct {
	text-align: center;
}

.rt {
	text-align: right;
}
.backgroundchar{
font-size: 16px;
color: #FFFEFF;
font-family: ΢���ź�;
height: 40px;
line-height: 38px;
vertical-align: middle;
padding-left: 20px;
font-weight: bold;
}
.normal {
	cursor: default;
}
.visible {
	visibility: hidden;
}
.hand {
	cursor: pointer;
}
.divMin
{
	width: 20px;
	height: 20px;
	position: absolute;
	top: 0px;
	right: 25px;
	background: #7A7A7A;
	cursor: pointer;
	color:black;
	margin-top: 135px;
}
.hidden {
	display: none;
}
#divbrand{
	position: absolute;
	top:20px;
	left:44px;
	color:white;
	height:26px;
	width:27px;
	background-repeat:no-repeat;
	float:left;
	
}
#divbrandText{
	position: absolute;
	top:20px;
	left:75px;
	color:white;
	height:26px;	
	float:left;
	word-wrap:break-word;
	text-align: left;
}
#divbrandText:hover{
	text-decoration:underline;
}
#divbrandText>a:hover{
	text-decoration:underline;
}
#divOrgSmallText{
	width:50px;
	height: 100%;
	color:black;
	cursor: pointer;
	/*background:url('../images/numMinus.png');*/
}
#divOrgSmallText:hover{
	color:#FA8315;
	/*background:url('../images/numMinusHover.png');*/
}
#divOrgText{
	width:50px;
	height:26px;
	line-height:26px;
	vertical-align: middle;
	/*background:url('../images/num100.png');*/
}
#divOrgText:hover{
	/*background:url('../images/num100Hover.png');*/
}
#divOrgBigText{
	width:50px;
	height: 100%;
	color:black;
	cursor: pointer;
	/*background:url('../images/numAdd.png');*/
}
#divOrgBigText:hover{
	color:#FA8315;
	/*background:url('../images/numAddHover.png');*/
}
* {
	padding: 0px;
	/*font-size: 12px;*/
	margin: auto 0px;
}
td{
	padding: 0px;
	font-size: 12px;
	margin: auto 0px;
}
.layout-split-west {
  border-right: 5px solid #CCCCCC;
}
#divNoMessage{
	position:absolute;
	top:50%;
	left:40%;
}
.datagrid-row-selected {
  color: #fff; 
  background-color: rgb(119,226,166);
}
</style>
</head>
<body>
	<script>
		    var maskobj = new maskPanelManager();
		    maskobj.register();
		</script>
	<div title="展开" id="divDHSmall"
		style="z-index:1003;left:0px;width:25px;border:1px solid #7DB3E9;background-color:#E2EDFB;position:absolute;top:0px;height:99.5%;color:#7DB3E9"
		class="hand visible" onclick="$('#divDHFull').removeClass('visible');">
		<div title="展开"
			style="margin:10px 10px;height: 10px;width:9px;background-image:url(<%=basePath%>pages/despages/common/images/btnright.png)"></div>
		<div style="color:black;">展开</div>
	</div>
	<div id="divDHFull"
		style="z-index:1003;left:0px;width:220px;border:1px solid #7DB3E9;background-color:white;position:absolute;top:0px;height:99.5%;overflow-x:hidden"
		class="hand visible">
		<div style="height:27px;width:220px;background-color:#E2EDFB;">
			<ul>
				<li><div
						style="color:#0D2D60;font-weight:bolder;width:190px;margin-top:5px;"
						class="flt lt">&nbsp;&nbsp;&nbsp;&nbsp;导航</div></li>
				<li class="flt" style="margin-top:5px;"
					onclick="$('#divDHFull').addClass('visible');">

					<div title="收缩"
						style="height: 10px;width:9px;background-image:url(<%=basePath%>pages/despages/common/images/btnleft.png)"></div>
				</li>
			</ul>
		</div>
		<!--<div
			style="position:absolute;top:27px;left:0px;right:0px;bottom:0px;overflow:auto;">
			<div style="margin-top:5px;margin-left:5px;" class="lt" id="divConsSelect">
			<input id="consSelect" class="easyui-textbox" style="width: 98%;" data-options="iconCls:'icon-search'">
			 <select  class="easyui-combotree" style="width:150px;"></select> 
			</div>		
		</div>-->
		<ul id="treeleftQyTree" class="easyui-tree"
			style="width: 100%;text-align:left;">
		</ul>
	</div>
<!-- 	<div id="divClose" onclick="OpenOrCloseRightDiv()"  title="收缩">
			<span style="font-size: 20px;font-weight: bold;line-height: 0.9em;"></span>
	</div> -->
	<div style="height:100%;width:100%;" data-options="fit: true">
		<ul style=" width: 100%;">
			<!--<li id="liSVG" class="flt auto-resize" style="margin-top: 20px;margin-left:60px">	-->
            <li id="liSVG" class="flt" style="margin-top: 20px;margin-left:60px">			
		</ul>
	</div>
	<div id="divCircle" style="width:100%;height:20px;position:absolute;bottom:20px;left:45%"></div>
	<div id="divNoEnergyMessage" style="z-index:2;position:absolute;top:50%;left:48%;"></div>
	<!-- 等待弹出遮罩层 -->
<div id="divWaiting" class="ct" style="vertical-align: middle;line-height:90px;height:90px;top:40%;left:40%;">
正在加载数据中，请等待……
</div>

<div id="dialog2" style="display: none">
    <iframe frameborder="0"></iframe>
</div> 
	<script
		src="<%=basePath%>/pages/despages/common/jquery-easyui-1.5.1/jquery.min.js"></script>
	<script type="text/javascript">
				var webContextRoot="<%=basePath%>";
		 		var consId = '<%=consId%>'; 		 	
		 		var svgType= '<%=svgType%>';
		 		if(consId==null||consId=="null"){consId=102000003446;}
		 		var consIdPage = "<%=consId%>";
				var consNamePage=window.parent.consName;
				funcId = "<%=funcId%>";
		    </script>
	<script
		src="<%=basePath%>/pages/despages/common/jquery-easyui-1.5.1/jquery.easyui.min.js"></script>
	<script
		src="<%=basePath%>/pages/despages/common/jquery-easyui-1.5.1/locale/easyui-lang-zh_CN.js"></script>
	<%-- <script
		src="<%=basePath%>/pages/despages/common/js/jquery.webui-popover.min.js"></script> --%>
	<script
		src="<%=basePath%>/pages/despages/common/js/jquery.webui-popover.js"></script>
	<!-- <script src="<%=basePath%>/pages/despages/common/js/bootstrap.min.js"></script> -->
	<script
		src="<%=basePath%>/pages/despages/common/js/tooltip-viewport.js"></script>
	<script src="<%=basePath%>/pages/despages/common/js/toolwinopen.js"></script>
	<script src="<%=basePath%>/pages/despages/common/js/jquery.pep.js"></script>
	<script src="<%=basePath%>pages/despages/common/js/templet_common.js"></script>
	<script src="<%=basePath%>/pages/despages/monitor/energyMonitor.js"></script>
</body>
</html>

