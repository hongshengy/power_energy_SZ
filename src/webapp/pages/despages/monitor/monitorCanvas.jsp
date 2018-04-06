<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	String consNo = request.getParameter("consNo");
	String loginName = request.getParameter("loginName");
	String password = request.getParameter("password");
	//String userTranId = request.getParameter("userTranId");
	String svgType = request.getParameter("svgType");
	session.setAttribute("itemCode","energy");
    session.setAttribute("itemName","能效图");
%>
<!DOCTYPE html>
<html style="background-color:black">
	<head>
		<meta charset="UTF-8">
		<title>设备</title>
		<link rel="stylesheet" type="text/css" href="<%=basePath%>pages/despages/common/css/style.css">
		<link rel="stylesheet" type="text/css" href="<%=basePath%>pages/despages/common/jquery-easyui-1.5.1/themes/fangtian/easyui.css">
		<link rel="stylesheet" type="text/css" href="<%=basePath%>pages/despages/common/jquery-easyui-1.5.1/themes/icon.css">
		<link rel="stylesheet" type="text/css" href="<%=basePath%>pages/despages/common/jquery-easyui-1.5.1/themes/color.css">
		<link rel="stylesheet" type="text/css" href="<%=basePath%>pages/despages/common/css/common.css">
		<link rel="stylesheet" type="text/css" href="<%=basePath%>pages/despages/common/css/templet_common.css">				
		<link rel="stylesheet" type="text/css" href="<%=basePath%>pages/despages/common/css/jquery.webui-popover.css">	
		<link rel="stylesheet" type="text/css" href="<%=basePath%>pages/despages/common/css/tooltip-viewport.css">
		<style>
			.top-ul{
			    padding: 10px 10px 10px 10px;
			    margin: 0px;
			    width: 100%;
			    height: 105px;
			    box-sizing: border-box;
			}
			.top-ul li{
			    display: inline-block;
			    height: 85px;
			    vertical-align: top;
			}
			.top-ul li p{
				margin: 0px;
				text-align: center;
			}
			
			.top-border{
				border: 1px solid #DFDFDF;
				border-radius: 4px ;
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
			/* .circleNormal:hover{
			background:#FFDA43;
			box-shadow:0px 0px 6px rgba(0,0,0,0.5);
			}  */
			.circleSelect{
				background:#FF6600;
				box-shadow:0px 0px 6px rgba(0,0,0,0.3);
			}
			.fangtian-panel-styleNow {
				padding: 5px 10px 0px 10px;
			}
		</style>
		
		<script type="text/javascript">
				var webContextRoot="<%=basePath%>";
		 		var consNo = '<%=consNo%>';
		 		var loginName = '<%=loginName%>';
		 		var password = '<%=password%>';
		 		var svgType= '<%=svgType%>';
		 		if(consNo==null||consNo=="null"){consNo="test0001";}
		 		<%-- var consIdPage = "<%=consId%>"; --%>
				/* var consNamePage=window.parent.consName; */
		</script>
		<script src="<%=basePath%>/pages/despages/common/jquery-easyui-1.5.1/jquery.min.js"></script>
		<script src="<%=basePath%>/pages/despages/common/jquery-easyui-1.5.1/jquery.easyui.min.js"></script>
		<script src="<%=basePath%>/pages/despages/common/jquery-easyui-1.5.1/locale/easyui-lang-zh_CN.js"></script>
		<script src="<%=basePath%>/pages/despages/common/echarts/echarts.min.js"></script>
		<script src="<%=basePath%>/pages/despages/common/js/common.js"></script>
		<script src="<%=basePath%>/pages/despages/common/js/templet_common.js"></script>
		<script src="<%=basePath%>/pages/despages/common/js/tooltip-viewport.js"></script>
		<script src="<%=basePath%>/pages/despages/common/js/toolwinopen.js"></script>
		<script src="<%=basePath%>/pages/despages/common/js/jquery.webui-popover.js"></script>
		<script src="<%=basePath%>/pages/despages/monitor/monitorCanvas.js"></script>
		
	<body>
		<div class="main-panel easyui-panel"  style="background-color:black;" data-options="fit:true,border:false">
		<div class="easyui-panel" style="width: 100%;position: relative;background-color:black;overflow: hidden;border-color:blue" data-options="cls:'fangtian-panel-style',onResize:autoResize">
			<ul class="top-ul">
				<li style="width: 19.9%">
					<img style="width:100%;" src="<%=basePath%>pages/despages/common/images/suyiLogo.png" />
				</li>
				<li style="width: 9.9%">
					<div style="width: 2px;min-height: 85px;background-color: yellow;position: absolute;"></div>
					<p id="nowTime" style="width:100%;text-align:center; font-size: 25px;color: #E7F784;"></p>
					<p style="width:100%;text-align:center;">
						<img id="img" <%-- src="<%=basePath%>images/fine.png"  --%> style="vertical-align: bottom;" />
						<!-- <span style="color: green;">24</span>~<span style="color: red;">38</span>℃ -->
						<span id="qwms" style="color: white;"></span>
						<span id="qw" style="color: red;"></span>
					</p>
					<%-- <p>南京<img src="<%=basePath%>pages/despages/common/images/fine.png"/><span style="color: green;">24</span>~<span style="color: red;">38</span>℃</p> --%>
				</li>
				
				<li style="width: 11.9%">
					<div class="top-border" style="min-width: 110px;height: 100%;margin:0px 10px 0px 10px;text-align: center;border-color:yellow" >
						<p id="powerValue" style="font-size: 24px;line-height: 45px;color: #E7F784;">0</p>
						<p style="font-size: 14px;line-height: 40px;color: white;">当前负荷(kW)</p>
					</div>
				</li>
				<li style="width: 32.9%">
					<div class="top-border" style="width: 320px;border-color:yellow;height: 100%;margin:0px 10px 0px 10px"">
						<p style="line-height: 28px; font-size: 14px;color: white;">本日最大负荷(kW)<span id="brMaxPowerValue" style="color: #E7F784;">0</span> 本日超限次数(次)<span id="brYxCount" style="color: #E7F784;">0</span></p>
						<p style="line-height: 28px; font-size: 14px;color: white;">昨日最大负荷(kW)<span id="zrMaxPowerValue"style="color: red;">0</span> 昨日超限次数(次)<span id="zrYxCount" style="color: red;">0</span></p>
						<p style="line-height: 28px; font-size: 14px;color: white;">本月最大负荷(kW)<span id="byMaxPowerValue"style="color: red;">0</span> 本月超限次数(次)<span id="byYxCount" style="color: red;">0</span></p>
					</div>
				</li>
				<li style="width: 22.9%">
					<div class="top-border" style="width: 220px;height: 100%;border-color:yellow;margin:0px 10px 0px 10px;color: white;background-color: #641715">
						<table width="100%" height="100%">
							<colgroup></colgroup>
							<tbody>
								<tr><td colspan="4" style="text-align: center;">告警信息列表</td></tr>
								<tr><td>序号</td><td>设备故障</td><td>解决状态</td><td>操作</td></tr>
								<tr>
									<td><p id="gjSeq" style="text-align:inherit"></p></td>
									<td><p id="gjDev" style="text-align:inherit"></p></td>
									<td><p id="gjStatus" style="text-align:inherit"></p></td>
									<td><a id="ckBtn" href="#" style="display: none;" onclick="showGaojing()">查看</a><input id="gjSel" type="hidden" value="0"></td>
								</tr>	
							</tbody>
						</table>
					</div>
				</li>
			</ul>
		</div>
		<div id="btmPanel" class="easyui-panel auto-resize" style="width: 100%;position: relative;border-color:blue;background-color:black;overflow-x:hidden;" data-options="onResize:tempResize,cls:'fangtian-panel-styleNow bottom-padding'">
			<div id="liSVG"></div>	
			
			<!-- <div id="divUserTran" style="position: absolute; top:15px; right: 240px; ">
				<div style="float: left; color: rgb(184, 184, 184);font-size: 14px;">
					<span>用户变电站：</span>
				</div>
				<select id="divNewbrandSpan" class="easyui-combobox" style="width:150px;cursor: pointer;color:write;background: rgb(65, 65, 65)" data-options="panelWidth:150,panelHeight:'auto',editable:false"></select>
			</div>
			
			<div id="divUserSvg" style="position:absolute; top: 15px;right: 20px;">
				<div style="float: left; color: rgb(184, 184, 184); font-size: 14px;">
					<span>一次图：</span>
				</div>
				<select id="divNewimgSpan" class="easyui-combobox" style="width:150px;cursor: pointer;color:write;background: rgb(65, 65, 65)" data-options="panelWidth:150,panelHeight:'auto',editable:false"></select>
			</div> -->
			
			<div id="divUserTran" style="position: absolute; top:15px; right: 240px; ">
				<div style="float: left; color: rgb(184, 184, 184);font-size: 14px;">
					<span>用户变电站：</span>
				</div>
				<div id="brandMainDiv" style=" font-size: 12px; color: rgb(184, 184, 184);float: left;width: 155px;">
					<div id="divNewbrand" style="cursor: pointer; color: rgb(184, 184, 184); z-index: 1002; position: relative; height: 20px; background: rgb(65, 65, 65) none repeat scroll 0% 0%; border-radius: 40px; border: 1px solid rgb(112, 112, 112); width: 100%;">
						<div style="float: left; width: 118px; text-align: left; padding-left: 12px; line-height: 2em; overflow: hidden;">
							<span id="divNewbrandSpan" style="white-space: nowrap;"></span>
						</div>
						<div style="float: right;margin-top: 8px;margin-right: 12px;">
							<img id="comBoIconDiv" src="<%=basePath%>/pages/despages/common/images/icon06_normal.png">
						</div>
					</div>
					<ul style="padding-bottom: 5px;padding-top: 20px;position: relative; background: rgb(65, 65, 65) none repeat scroll 0% 0%; z-index: 1001; border: 1px solid rgb(112, 112, 112); margin-top: -15px; width: 99%; margin-left: 0.5%;" id="ulbrand" class="ct visible">
					</ul>
				</div>
			</div>
			<div id="divUserSvg" style="position:absolute; top: 15px;right: 20px;">
				<div style="float: left; color: rgb(184, 184, 184); font-size: 14px;">
					<span>一次图：</span>
				</div>
				<div id="imgMainDiv" style=" font-size: 12px; color: rgb(184, 184, 184);width: 155px;float: left;">
					<div id="divNewimg" style="cursor: pointer; color: rgb(184, 184, 184); z-index: 1002; position: relative; height: 20px; background: rgb(65, 65, 65) none repeat scroll 0% 0%; border-radius: 40px; border: 1px solid rgb(112, 112, 112); width: 100%;">
						<div style="float: left; width: 118px; text-align: left; padding-left: 12px; line-height: 2em; overflow: hidden;">
							<span id="divNewimgSpan" style="white-space: nowrap;"></span>
						</div>
						<div style="float: right;margin-top: 8px;margin-right: 12px;">
							<img id="comBoImgIconDiv" src="<%=basePath%>/pages/despages/common/images/icon06_normal.png">
						</div>
					</div>
					<ul style="padding-bottom: 5px;padding-top: 20px;position: relative; background: rgb(65, 65, 65) none repeat scroll 0% 0%; z-index: 1001; border: 1px solid rgb(112, 112, 112); margin-top: -15px; width: 99%; margin-left: 0.5%;" id="ulimg" class="ct visible">
					</ul>
				</div>
			</div>
	    				
			<div id="fuPanel" class="hidden" style="width: 100%;height:100%; overflow: hidden;" >
			   <div id="fhChart" class="chart " style="width: 100%;height:100%; box-sizing: border-box;"></div>
			</div>
			<div id="divCircle1" class="circle circleNormal circleSelect" style="width:20px;height:20px;position:absolute;bottom:1px;left:48%"></div>
			<div id="divCircle2" class="circle circleNormal" style="width:20px;height:20px;position:absolute;bottom:1px;left:52%"></div>
			<div id="divNoEnergyMessage" style="z-index:9999;position:absolute;top:50%;left:48%;"></div>								
			<div id="show-panel" class="easyui-dialog" style="width:850px;height:250px;" data-options="title:'告警详情',modal:true,closed:true">
				<table class="form-table" style="box-sizing: border-box;width: 100%;height: 25%;">
					<tr>
						<td class="td-label" style="padding-left: 10px;width: 100px;">客户编号:</td>
						<td>
							<label id="consNo" class="tb-group-label"></label>
						</td>
						<td class="td-label" style="padding-left: 10px;width: 100px;">客户名称:</td>
						<td style="width: 200px;">
							<label id="consName"  class="tb-group-label"></label>
						</td>
						<td class="td-label" style="padding-left: 10px;width: 100px;">建筑:</td>
						<td>
							<label id="subsName"  class="tb-group-label"></label>
						</td>
					</tr>
					<tr>
						<td class="td-label" style="padding-left: 10px;width: 100px;">告警设备:</td>
						<td>
							<label id="devName"  class="tb-group-label"></label>
						</td>
						<td class="td-label" style="padding-left: 10px;width: 100px;">设备类型:</td>
						<td style="width: 200px;">
							<label id="devType"  class="tb-group-label">0.0</label>
						</td>
						<td class="td-label" style="padding-left: 10px;width: 100px;">告警等级:</td>
						<td>
							<label id="devLevel"  class="tb-group-label">0.0</label>
						</td>
					</tr>
					<tr>
						<td class="td-label" style="padding-left: 10px;width: 100px;">处理状态:</td>
						<td>
							<label id="devStatus"  class="tb-group-label"></label>
						</td>
						<td class="td-label" style="padding-left: 10px;width: 100px;">告警时间:</td>
						<td style="width: 200px;">
							<label id="devTime"  class="tb-group-label">0.0</label>
						</td>
						<td class="td-label" style="padding-left: 10px;width: 100px;">告警发生值:</td>
						<td>
							<label id="devValue"  class="tb-group-label">0.0</label>
						</td>
					</tr>
					<tr>
						<td class="td-label" style="padding-left: 10px;width: 100px;">告警描述:</td>
						<td colspan="5">
							<label id="devMemo"  class="tb-group-label"></label>
						</td>
					</tr>
					
				</table>
			</div>
		</div>
		</div>
	</body>
</html>
