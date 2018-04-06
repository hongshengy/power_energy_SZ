<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	String consId = request.getParameter("consId");
	String userTranId = request.getParameter("userTranId");
	String isOrgControl = request.getParameter("isOrgControl");

	String consName = request.getParameter("consName");//获取调用父页面传过来的参数
	String funcId = request.getParameter("funcId");//获取调用父页面传过来的参数
	session.setAttribute("itemCode","desyhbjk");
    session.setAttribute("itemName","一次图");
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html style="background-color:black">
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
.item_div {
	height: 30px;
	margin-top: 5px;
	border-bottom: solid 1px #27262B;
}

.item_div .v_div {
	/* width: 165px; */
	float: left;
	/* margin-left: 20px; */
}

.item_div .v_div .name_div {
	width: 145px;
	height: 60px;
	overflow: hidden;
	cursor: default;
	text-align: left;
}

.item_div .v_div .value_div {
	margin-top: 5px;
	color:#E3F07E;
	/* width: 180px; */
	text-align: left;
}
.window {
    background-color: #F2F2F2;
    /* background: -webkit-linear-gradient(top,#ffffff 0,#F2F2F2 20%);
    background: -moz-linear-gradient(top,#ffffff 0,#F2F2F2 20%);
    background: -o-linear-gradient(top,#ffffff 0,#F2F2F2 20%); */
    background: linear-gradient(to bottom,#ffffff 0,#F2F2F2 20%);
    background-repeat: repeat-x;
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#ffffff,endColorstr=#F2F2F2,GradientType=0);
}
</style>
</head>
<body style="background-color:black">
	<script>
			var basePath = "<%=basePath%>";
		    var maskobj = new maskPanelManager();
		    maskobj.register();
		</script>
	<div style="height:100%;width:100%;">
		<ul style="background-color: #2E2E2F; width: 100%;">
			<li id="liSVG" class="flt" style="margin-top: 20px;">
				<div id="workerOrder" class="easyui-window" title="基本信息"
					data-options="iconCls:'icon-save'"
					style="width: 500px; height: 200px; padding: 10px;">
					<ul>
						<li class="flt" style="width: 200px">告警信息</li>
						<li class="flt" style="width: 200px">工单信息</li>
						<li class="clear"><a id="sendWorker" href="#"
							class="easyui-linkbutton c9 shadow"
							style="width: 80px; height: 24px;">派发</a></li>
					</ul>
				</div>
				<div id="yx" class="easyui-window" title="基本信息"
					data-options="iconCls:'icon-save'"
					style="width: 300px; height: 200px; padding: 10px;">
					<ul>
						<li class="flt rt" style="width: 100px;height:30px;">设备名称：</li>
						<li class="flt lt" style="width: 150px;height:30px;"><div
								id="txt_yx_name"></div></li>
						<li class="flt rt" style="width: 100px;height:30px;">值：</li>
						<li class="flt lt" style="width: 150px;height:30px;"><div
								id="txt_yx_value"></div></li>
						<li class="flt rt" style="width: 100px;height:30px;">采集时间：</li>
						<li class="flt lt" style="width: 150px;height:30px;"><div
								id="txt_yx_currentTime"></div></li>
					</ul>
				</div>
				<div id="dev" class="easyui-window" title="基本信息"
					data-options="iconCls:'icon-save'"
					style="width: 300px; height: 200px; padding: 10px;">
					<ul>
						<li class="flt rt" style="width: 100px;height:30px;">设备名称：</li>
						<li class="flt lt" style="width: 150px;height:30px;"><div
								id="txt_dev_name"></div></li>
						<li class="flt rt" style="width: 100px;height:30px;">状态：</li>
						<li class="flt lt" style="width: 150px;height:30px;"><div
								id="txt_dev_value"></div></li>
					</ul>
				</div>
				<div id="devSwitch" class="easyui-window" title="基本信息"
					data-options="iconCls:'icon-save'"
					style="width: 300px; height: 200px; padding: 10px;">
					<ul>
						<li class="flt rt" style="width: 100px;height:30px;">设备名称：</li>
						<li class="flt lt" style="width: 150px;height:30px;"><div
								id="txt_devSwitch_name"></div></li>
						<li class="flt rt" style="width: 100px;height:30px;">采集时间：</li>
						<li class="flt lt" style="width: 150px;height:30px;"><div
								id="txt_devSwitch_currentTime"></div></li>
						<li class="flt rt" style="width: 100px;height:30px;">投运状态：</li>
						<li class="flt lt" style="width: 150px;height:30px;"><div
								id="txt_devSwitch_value"></div></li>
						<li class="flt rt" style="width: 100px;height:30px;">工作状态：</li>
						<li class="flt lt" style="width: 150px;height:30px;"><div
								id="txt_devSwitch_workValue"></div></li>
					</ul>
				</div>
			</li>
			<li id="liRightContent" style="width: 420px; margin-right: 24px;"
				class="frt">
				<!-- <div id="divTime"></div> -->
				<div id="divRight1" style="width: 100%; border: 1px solid #515055; margin-top: 160px; margin-bottom: 30px;border-radius: 5px;">
					<div class="lt backgroundchar" style="border-bottom: 1px solid #515055;">
						<span>监控数据</span>
					</div>
					<div style="color: white; font-size: 14px; padding:20px;border-radius: 5px;background:#141318;">
						<div style="height: 22px;">
							<div style="float: left; width: 50%;">
								<div style="color: #e3f07e; float: left;">
									<span>实时负荷：</span>
								</div>
								<div style="float: left;">
									<span id="realtimeLoad">--</span>
									<span>千瓦</span>
								</div>
							</div>
							<div style="float: left; width: 50%;">
								<div style="float: left; color: #e3f07e;">
									<span>近一小时用电量：</span>
								</div>
								<div style="float: left;">
									<span id="realtimeElectricity">--</span>
									<span>千瓦时</span>
								</div>
							</div>
						</div>
						<div style="height: 22px;margin-top: 6px;">
							<div style="float: left; width: 50%;">
								<div style="color: #e3f07e; float: left;">
									<span>主变台数：</span>
								</div>
								<div style="float: left;">
									<span id="mainTransformerNum">--</span>
									<span>台</span>
								</div>
							</div>
							<div style="float: left; width: 50%;">
								<div style="float: left; color: #e3f07e;">
									<span>主变总容量：</span>
								</div>
								<div style="float: left;">
									<span id="mainTransformerCap">--</span>
									<span>千伏安</span>
								</div>
							</div>
						</div>
						<div style="height: 22px;margin-top: 6px;">
							<div style="float: left; width: 50%;">
								<div style="color: #e3f07e; float: left;">
									<span>进线负荷：</span>
								</div>
								<div style="float: left;">
									<span id="inLoad">--</span>
									<span>千瓦</span>
								</div>
							</div>
							<div style="float: left; width: 50%;">
								<div style="float: left; color: #e3f07e;">
									<span>出线负荷：</span>
								</div>
								<div style="float: left;">
									<span id="outLoad">--</span>
									<span>千瓦</span>
								</div>
							</div>
						</div>
						<div style="height: 22px;margin-top: 6px;">
							<div>
								<div style="color: #e3f07e; float: left;">
									<span>采集成功率（采集点/测点总数）：</span>
								</div>
								<div style="float: left;">
									<span id="successRate">--</span>
									<span>%（</span>
									<span id="colPoint">--</span>
									<span>/</span>
									<span id="pointsNum">--</span>
									<span>）</span>
								</div>
							</div>
						</div>
						<div style="height: 22px;margin-top: 6px;">
							<div>
								<div style="color: #e3f07e; float: left;">
									<span>设备工况：</span>
								</div>
								<div style="float: left;color:#FCB14B;">
									<div style="float: left;">
										<span>异常</span>
									</div>
									<div style="float: left;margin-left: 3px;">
										<span id="unitExc" class='hand'>--</span>
									</div>
								</div>
								<div style="float: left;color:#909090;margin-left: 15px;">
									<div style="float: left;">
										<span>停运</span>
									</div>
									<div style="float: left;margin-left: 3px;">
										<span id="unitOff" class='hand'>--</span>
									</div>
								</div>
								<div style="float: left;color:#68FF39;margin-left: 15px;">
									<div style="float: left;">
										<span>运行</span>
									</div>
									<div style="float: left;margin-left: 3px;">
										<span id="unitRun" class='hand'>--</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div id="SBGK" style="border-radius: 5px;border: 1px solid #515055;overflow: hidden;">
					<div class="lt backgroundchar" style="border-bottom: 1px solid #515055;">
						<span>变位信息</span>
						<span id="moreItem" style="float:right;margin-right:10px;cursor: pointer;">更多</span>
						<!-- <a href="#" onclick="testOpen('',1,0,'','变位信息')" style="width: 26px">更多</a> -->
					</div>
					<div id="SBGKContent" style="color: white; font-size: 14px; border-radius: 5px;/* background:#141318 */">
	     				<div class="content_div" style="border: none;background: none;overflow: hidden;">
	     					<div id="bwUpDiv" style="margin-right: 5px; cursor: pointer; height: 15px;">
		     					<img style="margin-left: 390px; margin-top: 5px;" src="<%=basePath%>pages/despages/common/images/up_normal.png">
		     				</div>		     				
		     				<div id="shiftInfoListPDiv" style="height: 180px; overflow: hidden; margin-left: 20px; margin-right: 20px;">
		     					<div style="margin-top: 0px;" id="shiftInfoList">
<!-- 	     						<div class="item_div"> -->
<!-- 		     						<div class="v_div"> -->
<!-- 		     							<div class="name_div"> -->
<!-- 			     							<span>江苏艾龙森汽车部件 有限公司</span> -->
<!-- 			     						</div> -->
<!-- 			     						<div class="value_div"> -->
<!-- 			     							<span>4091动补    分>合</span> -->
<!-- 			     						</div> -->
<!-- 		     						</div> -->
<!-- 		     						<div class="v_div"> -->
<!-- 		     							<div class="name_div"> -->
<!-- 			     							<span>江苏艾龙森汽车部件 有限公司</span> -->
<!-- 			     						</div> -->
<!-- 			     						<div class="value_div"> -->
<!-- 			     							<span>4091动补    分>合</span> -->
<!-- 			     						</div> -->
<!-- 		     						</div>   					 -->
<!-- 		     					</div> -->
<!-- 		     					<div class="item_div"> -->
<!-- 		     						<div class="v_div"> -->
<!-- 		     							<div class="name_div"> -->
<!-- 			     							<span>江苏艾龙森汽车部件 有限公司</span> -->
<!-- 			     						</div> -->
<!-- 			     						<div class="value_div"> -->
<!-- 			     							<span>4091动补    分>合</span> -->
<!-- 			     						</div> -->
<!-- 		     						</div> -->
<!-- 		     						<div class="v_div"> -->
<!-- 		     							<div class="name_div"> -->
<!-- 			     							<span>江苏艾龙森汽车部件 有限公司</span> -->
<!-- 			     						</div> -->
<!-- 			     						<div class="value_div"> -->
<!-- 			     							<span>4091动补    分>合</span> -->
<!-- 			     						</div> -->
<!-- 		     						</div> -->
<!-- 		     					</div> -->
<!-- 		     					<div class="item_div"> -->
<!-- 		     						<div class="v_div"> -->
<!-- 		     							<div class="name_div"> -->
<!-- 			     							<span>江苏艾龙森汽车部件 有限公司</span> -->
<!-- 			     						</div> -->
<!-- 			     						<div class="value_div"> -->
<!-- 			     							<span>4091动补    分>合</span> -->
<!-- 			     						</div> -->
<!-- 		     						</div> -->
<!-- 		     						<div class="v_div"> -->
<!-- 		     							<div class="name_div"> -->
<!-- 			     							<span>江苏艾龙森汽车部件 有限公司</span> -->
<!-- 			     						</div> -->
<!-- 			     						<div class="value_div"> -->
<!-- 			     							<span>4091动补    分>合</span> -->
<!-- 			     						</div> -->
<!-- 		     						</div> -->
<!-- 		     					</div> -->
<!-- 		     					<div class="item_div"> -->
<!-- 		     						<div class="v_div"> -->
<!-- 		     							<div class="name_div"> -->
<!-- 			     							<span>江苏艾龙森汽车部件 有限公司</span> -->
<!-- 			     						</div> -->
<!-- 			     						<div class="value_div"> -->
<!-- 			     							<span>4091动补    分>合</span> -->
<!-- 			     						</div> -->
<!-- 		     						</div> -->
<!-- 		     						<div class="v_div"> -->
<!-- 		     							<div class="name_div"> -->
<!-- 			     							<span>江苏艾龙森汽车部件 有限公司</span> -->
<!-- 			     						</div> -->
<!-- 			     						<div class="value_div"> -->
<!-- 			     							<span>4091动补    分>合</span> -->
<!-- 			     						</div> -->
<!-- 		     						</div> -->
<!-- 		     					</div> -->
	     						</div>
		     				</div>
		     				<div id="bwDownDiv" style="cursor: pointer; margin-top: 10px; height: 15px;">
		     					<img style="margin-left: 385px;" src="<%=basePath%>pages/despages/common/images/down_normal.png">
		     				</div>
     					</div>
					</div>
				</div> 
<%-- 				<div id="divRight3" style="width: 100%; border: 1px solid #515055; background:black;;margin-top: 30px;position:relative;z-index:9;border-radius: 5px;">
					<div class="lt backgroundchar" style="border-bottom: 1px solid #515055;">
						<div id="divqp" class="lt flt backgroundchar" style="padding-left:0px;">
							<!-- <img id="imgVideo" class="hand"
								src="<%=basePath%>pages/despages/common/images/upArrowhead.png"
								style="margin-top: -5px;margin-left:-5px;width:24px;height:24px;" title="全屏"/> -->
							视频监控
						</div>
						<div id="divVideoPage" class="rt  backgroundchar hand" style="margin-right:5px;">
							>>
						</div>
					</div>
					<div style="border-radius: 5px;background:#141318;height: 160px;">
						<div id="divPlugin" class="plugin">
							<img id="imgVideo" style="margin-top:35px;" src="<%=basePath%>pages/despages/common/images/logoHelp.png"  />
						</div>
						
						<!-- 海康视频 -->
			            <!-- <DIV id="divPlugin" class="plugin" style="display: none;"></DIV> -->
			            <!--大华视频-->
			            <!-- <div id="f_ocx" style="width: 100%;height: 100%;display: none;"></div> -->
					</div>
				</div> --%>
			</li>

			<li class="frt" style="position: absolute;top: 25px;right: 750px;">
				<div id="divChangeBig" style="height: 27px; width: 150px; color: white; z-index: 100; position: absolute; background: #414141 none repeat scroll 0% 0%; border-radius: 40px;">
					<div id="divOrgSmallText" class="flt normal" onclick="onChangeBig('-1')"><img style="margin-top: 3px;" src="<%=basePath%>/pages/despages/common/images/icon05_normal.png"></div>
					<div id="divOrgText" class="flt normal" style="font-size: 16px; font-weight: bold; color: white; margin-top: 0px;color:white;" onclick="onChangeBig('0')">100%</div>
					<div id="divOrgBigText" class="normal rt" onclick="onChangeBig('1')" style="float:right"><img style="margin-top: 3px;" src="<%=basePath%>/pages/despages/common/images/icon04_normal.png"></div>
				</div>
				<div id="divSvgSelect" style="height:400px;position:absolute;margin-top:44px;"></div>
			</li>
		</ul>
	</div>
	
	<div style="position: absolute; top:25px; right: 250px; ">
		<div style="float: left; color: rgb(184, 184, 184);font-size: 14px;">
			<span>用户变电站：</span>
		</div>
		<div id="brandMainDiv" style=" font-size: 12px; color: rgb(184, 184, 184);float: left;width: 215px;">
			<div id="divNewbrand" style="cursor: pointer; color: rgb(184, 184, 184); z-index: 1002; position: relative; height: 25px; background: rgb(65, 65, 65) none repeat scroll 0% 0%; border-radius: 40px; border: 1px solid rgb(112, 112, 112); width: 100%;">
				<div style="float: left; width: 170px; text-align: left; padding-left: 12px; line-height: 2em; overflow: hidden;">
					<span id="divNewbrandSpan" style="white-space: nowrap;"></span>
				</div>
				<div style="float: right;margin-top: 8px;margin-right: 12px;">
					<img id="comBoIconDiv" src="<%=basePath%>/pages/despages/common/images/icon06_normal.png">
				</div>
			</div>
			<ul style="padding-bottom: 5px;padding-top: 20px;position: relative; background: rgb(65, 65, 65) none repeat scroll 0% 0%; z-index: 1001; border: 1px solid rgb(112, 112, 112); margin-top: -15px; width: 99%; margin-left: 0.5%;display:none;" id="ulbrand" class="ct visible">
			</ul>
		</div>
	</div>
	<!-- <div id="divConsTitle" style="position:absolute;color:#25ece5;bottom:30px;left:100px"></div> -->
	<div id="imgComboBoxDiv" style="position:absolute; top: 25px;right: 20px;opacity:0.3;cursor:default;">
		<div style="float: left; color: rgb(184, 184, 184); font-size: 14px;">
			<span>一次图：</span>
		</div>
		<div id="imgMainDiv" style=" font-size: 12px; color: rgb(184, 184, 184);width: 155px;float: left;">
			<div id="divNewimg" style="cursor: pointer; color: rgb(184, 184, 184); z-index: 1002; position: relative; height: 25px; background: rgb(65, 65, 65) none repeat scroll 0% 0%; border-radius: 40px; border: 1px solid rgb(112, 112, 112); width: 100%;">
				<div style="float: left; width: 118px; text-align: left; padding-left: 12px; line-height: 2em; overflow: hidden;">
					<span id="divNewimgSpan" style="white-space: nowrap;"></span>
				</div>
				<div style="float: right;margin-top: 8px;margin-right: 12px;">
					<img id="comBoImgIconDiv" src="<%=basePath%>/pages/despages/common/images/icon06_normal.png">
				</div>
			</div>
			<ul style="padding-bottom: 5px;padding-top: 20px;position: relative; background: rgb(65, 65, 65) none repeat scroll 0% 0%; z-index: 1001; border: 1px solid rgb(112, 112, 112); margin-top: -15px; width: 99%; margin-left: 0.5%;display:none;" id="ulimg" class="ct visible">
			</ul>
		</div>
	</div>
	

	<div id="divbrand" >
		<div id="divPicBrand"
			style="background-image:url(<%=basePath%>pages/despages/common/images/kehuButton.png);height:28px;background-repeat:no-repeat; font-size: 16px; color: #1F8283; 
				font-weight: bold;z-index:10;">

		</div>
		<%-- <div id="divConsTitle" class="hand" style="background-image:url(<%=basePath%>pages/despages/common/images/icon.png);height:28px;background-repeat:no-repeat; font-size: 16px; color: #1F8283; 
				font-weight: bold;z-index:10;"></div>	 --%>	
<!-- 		<ul id="ulbrand" class="ct visible" > -->
<!-- 		</ul> -->
	</div>

	<div id="divbrandText" class=" hand "
		style="height: 28px; background-repeat: no-repeat; font-size: 16px; color: #1F8283; font-weight: bold; z-index: 10;	">
		<a></a>
		<div></div>
	</div>
	
	<div id="divNoMessage" style="z-index:2;"></div>
	<div title="展开" id="divDHSmall"
		style="z-index:1003;left:0px;width:25px;border:1px solid #7DB3E9;background-color:#E2EDFB;position:absolute;top:0px;height:99.5%;color:#7DB3E9"
		class="hand visible" onclick="$('#divDHFull').removeClass('visible');">
		<div title="展开"
			style="margin:10px 10px;height: 10px;width:9px;background-image:url(<%=basePath%>pages/despages/common/images/btnright.png)"></div>
		<div style="color:black;">展开</div>
	</div>

	<div id="divDHFull"
		style="z-index:1003;left:0px;width:220px;border:1px solid #7DB3E9;background-color:white;position:absolute;top:0px;height:99.5%;overflow-y:auto;overflow-x:hidden"
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
			style="position:absolute;top:20px;left:0px;right:0px;bottom:0px;overflow:auto;">
			 <div style="margin-top:5px;margin-left:5px;" class="lt" id="divConsSelect">
			<input id="consSelect" class="easyui-textbox" style="width: 98%;" data-options="iconCls:'icon-search'">
			<select  class="easyui-combotree" style="width:150px;"></select>
			</div> -->
			<ul id="treeleftQyTree" class="easyui-tree"
				style="width: 100%;text-align:left;">
			</ul>
		</div>
	</div>

	<div id="divClose" onclick="OpenOrCloseRightDiv()" class="divMin"
		title="收缩">
			<span style="font-size: 20px;font-weight: bold;line-height: 0.9em;">></span>
		</div>
	<!-- 等待弹出遮罩层 -->
<div id="divWaiting" class="ct" style="vertical-align: middle;line-height:90px;height:90px;top:40%;left:40%;">
正在加载数据中，请等待……
</div> 

<!-- 弹出告警查询页面 -->
<div id="dialogMonitor" style="display: none">    
	<iframe frameborder="0"></iframe>
</div>
	<script
		src="<%=basePath%>/pages/despages/common/jquery-easyui-1.5.1/jquery.min.js"></script>
	<script type="text/javascript">
				var webContextRoot="<%=basePath%>";
		 		var consId = '<%=consId%>';
		 		var userTranId = '<%=userTranId%>';
		 		var userTranIdArea= '<%=userTranId%>';
		 		if(consId==null||consId=="null"){consId=0;}
		 		if(userTranId==null||userTranId=="null"){userTranId=0;}
		 		if(userTranIdArea==null||userTranIdArea=="null"){userTranIdArea=0;}
		 		
		 		 var consIdPage = "<%=consId%>";
		 		 var consNamePage ='';
		 		 var consName = "<%=consName%>";
		 		 if(consName==null){
		 		 	consNamePage=window.parent.consName;
		 		 }else{
		 		 	consNamePage = consName;
		 		 }
		 		 var isOrgControl = <%=isOrgControl%>
				// var consNamePage = "<%=consName%>";
				// var consNamePage=window.parent.consName;
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
	<script type="text/javascript" src="<%=basePath%>/pages/despages/common/js/toolwinopen.js"></script>
	<script src="<%=basePath%>/pages/despages/monitor/userMonitor.js"></script>
	<script type="text/javascript" src="<%=basePath%>/pages/despages/common/video/webVideoCtrl.js"></script>
</body>
</html>

