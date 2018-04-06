<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String baseUrl = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ baseUrl + "/";
	String pagePath = baseUrl + "/pages/despages/common";
	String treePagePath = baseUrl + "/pages/areaEnergy/common";

	/* session.setAttribute("itemCode","despower");
	 session.setAttribute("itemName","功率因数"); */
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN""http://www.w3c.org/TR/HTML4/loose.dtd">

<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="Cache-Control" content="no-cache" />
<meta http-equiv="Expires" content="0" />
<title>运维概况</title>
<link rel="stylesheet"
	href="<%=pagePath%>/jquery-easyui-1.5.1/themes/fangtian/easyui.css">
<link rel="stylesheet"
	href="<%=pagePath%>/jquery-easyui-1.5.1/themes/icon.css">
<link rel="stylesheet"
	href="<%=pagePath%>/jquery-easyui-1.5.1/themes/color.css">
<link rel="stylesheet" href="<%=pagePath%>/css/common.css">
<%-- <link rel="stylesheet" href="<%=treePagePath%>/css/tree.css"> --%>
<script src="<%=pagePath%>/js/maskJs.js"></script>
</head>

<body>
<script>
    var maskobj = new maskPanelManager();
    maskobj.register();
</script>
<style>
.div-search {
float:left;
margin-top:10px;
margin-bottom:10px;
margin-left:10px;
color: #232323;
}
.div-label {
float:left;
width:110px;
line-height:24px;
}
.right{
float:right;
padding-right:10px;
}
#ywjk {
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	padding: 5px 10px;
}

#ywjk .l {
	border-bottom: 1px solid #999999;
}

#ywjk .comm-panel {
	padding: 10px 6px;
	width: 100%;
	font-size: 0px; /*用于处理inline-block间距*/
	box-sizing: border-box;
}

#ywjk .comm-panel .h1-panel {
	font-size: 12px;
	width: 25%;
	display: inline-block;
	height: 65px;
	line-height: 65px;
	background: #3FB3A3;
	text-align: center;
}

#ywjk .comm-panel .h1-panel .icon-panel {
	display: inline-block;
	vertical-align: middle;
	padding-right: 10px;
}
.icon1-panel {
	display: inline-block;
	vertical-align: middle;
	padding-right: 10px;
	margin-top: 0px;
}

#ywjk .comm-panel .h1-panel .icon-panel>img {
	display: block;
}

#ywjk .comm-panel .h1-panel .info-panel {
	display: inline-block;
	line-height: normal;
	vertical-align: middle;
	color: #FFFFFF;
}

#ywjk .comm-panel .h1-panel .info-panel .value {
	font-size: 20px;
	padding: 0px 10px;
	vertical-align: sub;
}

#ywjk .comm-panel .h2-panel {
	font-size: 12px;
	width: 20%;
	display: inline-block;
	height: 180px;
	background: #E6E6E6;
	position: relative;
	padding: 5px;
	box-sizing: border-box;
}

#ywjk .comm-panel .h2-panel .top-panel {
	height: 109px;
	line-height: 20px;
	font-weight:bold;/* 文本加粗 */
	text-align: center;
	position: relative;
}

#ywjk .comm-panel .h2-panel .top-panel .gj-panel {
	position: absolute;
	right: -5px;
	top: -10px;
	z-index: 99;
	width: 32px;
	height: 32px;
}

#ywjk .comm-panel .h2-panel .top-panel .gj-panel>img {
	position: absolute;
	left: 0px;
	top: 0px;
	z-index: -1;
}

.error-icon{
        background-color: #ee484b;
        border-radius: 50%;
        position: absolute;
        width: 32px;
        height: 32px;
        color: #fff;
        z-index: -1;
}

#ywjk .comm-panel .h2-panel .top-panel .gj-panel .gj {
	line-height: 32px;
	color: #FFFFFF;
	text-align: center;
	vertical-align: middle;
}

#ywjk .comm-panel .h2-panel .top-panel .icon-panel {
	display: inline-block;
	vertical-align: middle;
}

#ywjk .comm-panel .h2-panel .top-panel .icon-panel>img {
	display: block;
}

#ywjk .comm-panel .h2-panel .bottom-panel {
	height: 60px;
	line-height: 60px;
	text-align: center;
}

#ywjk .comm-panel .h2-panel .bottom-panel .info-panel {
	display: inline-block;
	line-height: normal;
	vertical-align: middle;
}

#ywjk .comm-panel .h2-panel .bottom-panel .info-panel table {
	height: 100%;
}

#ywjk .comm-panel .h2-panel .bottom-panel .info-panel .label {
	text-align: right;
}

#ywjk .comm-panel .h2-panel .bottom-panel .info-panel .value {
	text-align: left;
	font-size: 20px;
}

#ywjk .comm-panel .fc1 {
	color: #3DB3A5;
}

#ywjk .comm-panel .fc2 {
	color: #999999;
}

#ywjk .comm-panel .fc3 {
	color: #000000;
}

#ywjk .comm-panel .fc4 {
	color: #1155CC;
}

#ywjk .comm-panel .p1 {
	margin-left: -6px;
}

#ywjk .comm-panel .p2 {
	margin-left: 4px;
	margin-right: 2px;
}

#ywjk .comm-panel .p3 {
	margin-left: 2px;
	margin-right: 4px;
}

#ywjk .comm-panel .p4 {
	margin-right: -6px;
}

#ywjk .comm-panel .p5 {
	margin-left: 10px;
	margin-right: -18px;
}

#ywjk #chart-panel {
	position: absolute;
	top: 330px;
	bottom: 10px;
	left: 10px;
	right: 10px;
}
</style>
	<div id="ywjk">
		<div class="comm-panel">
			<div class="h1-panel p1">
				<div class="icon-panel">
					<img src="<%=pagePath %>/images/icon_1.png" border="0" />
				</div>
				<div class="info-panel">
					<table>
						<tr>
							<td>当日告警:</td>
							<td id="drgj" class="value">0</td>
						</tr>
						<tr>
							<td>本周告警:</td>
							<td id="bzgj" class="value">0</td>
						</tr>
					</table>
					<!-- <p>
						当日告警:<span id="drgj" class="value">0</span>
					</p>
					<p>
						本周告警:<span id="bzgj" class="value">0</span>
					</p> -->
				</div>
			</div>
			<div class="h1-panel p2">
				<div class="icon-panel">
					<img src="<%=pagePath %>/images/icon_2.png" border="0" />
				</div>
				<div class="info-panel">
					<table>
						<tr>
							<td>进行工单:</td>
							<td id="jxgd" class="value">0</td>
							<td>当日工单:</td>
							<td id="drgd" class="value">0</td>
						</tr>
						<tr>
							<td>超时工单:</td>
							<td id="csgd" class="value">0</td>
							<td>本周工单:</td>
							<td id="bzgd" class="value">0</td>
						</tr>
					</table>
					<!-- <p>
						进行工单:<span id="jxgd" class="value">0</span>当日工单:<span id="drgd" class="value">0</span>
					</p>
					<p>
						超时工单:<span id="csgd" class="value">0</span>本周工单:<span id="bzgd" class="value">0</span>
					</p> -->
				</div>
			</div>
			<div class="h1-panel p3">
				<div class="icon-panel">
					<img src="<%=pagePath %>/images/icon_3.png" border="0" />
				</div>
				<div class="info-panel">
					<table>
						<tr>
							<td>终端在线率:</td>
							<td id="zdzxl" class="value">0</td>
						</tr>
						<tr>
							<td>测点采集率:</td>
							<td id="cdzxl" class="value">0</td>
						</tr>
					</table>
					<!-- <p>
						终端在线率:<span id="zdzxl" class="value">0</span>
					</p>
					<p>
						测点采集率:<span id="cdzxl" class="value">0</span>
					</p> -->
				</div>
			</div>
			<div class="h1-panel p4">
				<div class="icon-panel">
					<img src="<%=pagePath %>/images/icon_4.png" border="0" />
				</div>
				<div class="info-panel">
					<table>
						<tr>
							<td>超时检修设备:</td>
							<td id="csjxsb" class="value">0</td>
						</tr>
						<tr>
							<td>异常运行设备:</td>
							<td id="ycyxsb" class="value">0</td>
						</tr>
					</table>
					<!-- <p>
						超时检修设备:<span id="csjxsb" class="value">0</span>
					</p>
					<p>
						异常运行设备:<span id="ycyxsb" class="value">0</span>
					</p> -->
				</div>
			</div>
		</div>
		<div class="l"></div>
		<div class="comm-panel">
			<div class="h2-panel p1">
				<div class="top-panel">
					<div class="gj-panel">
						<%-- <img src="<%=pagePath %>/images/jgbj_1.png" border="0" /> --%>
						<div class="error-icon"></div>
						<p id="tran_exception" class="gj">0</p>
					</div>
					<div class="icon-panel">
						<img src="<%=pagePath %>/images/byq_1.png" border="0" />
						<label>变压器</label>
					</div>
				</div>
				<div class="l"></div>
				<div class="bottom-panel">
					<div class="info-panel">
						<table>
							<tbody>
								<tr>
									<td class="label fc1">正常:</td>
									<td id="tran_run" class="value fc1">0</td>
									<td class="label fc2">停运:</td>
									<td id="tran_stop" class="value fc2">0</td>
								</tr>
								<tr>
									<td class="label fc3">待检:</td>
									<td id="tran_check" class="value fc3">0</td>
									<td class="label fc4">总数:</td>
									<td id="tran_total" class="value fc4">0</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<div class="h2-panel p2">
				<div class="top-panel">
					<div class="gj-panel">
						<%-- <img src="<%=pagePath %>/images/jgbj_1.png" border="0" /> --%>
						<div class="error-icon"></div>
						<p id="bs_exception" class="gj">0</p>
					</div>
					<div class="icon-panel">
						<img src="<%=pagePath %>/images/mx_1.png" border="0" />
							<label>母线</label>
					</div>
				</div>
				<div class="l"></div>
				<div class="bottom-panel">
					<div class="info-panel">
						<table>
							<tbody>
								<tr>
									<td class="label fc1">正常:</td>
									<td id="bs_run" class="value fc1">0</td>
									<td class="label fc2">停运:</td>
									<td id="bs_stop" class="value fc2">0</td>
								</tr>
								<tr>
									<td class="label fc3">待检:</td>
									<td id="bs_check" class="value fc3">0</td>
									<td class="label fc4">总数:</td>
									<td id="bs_total" class="value fc4">0</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<div class="h2-panel p3">
				<div class="top-panel">
					<div class="gj-panel">
						<%-- <img src="<%=pagePath %>/images/jgbj_1.png" border="0" /> --%>
						<div class="error-icon"></div>
						<p id="line_exception" class="gj">0</p>
					</div>
					<div class="icon-panel">
						<img src="<%=pagePath %>/images/xl_1.png" border="0" />
						<label>线路</label>
					</div>
				</div>
				<div class="l"></div>
				<div class="bottom-panel">
					<div class="info-panel">
						<table>
							<tbody>
								<tr>
									<td class="label fc1">正常:</td>
									<td id="line_run" class="value fc1">0</td>
									<td class="label fc2">停运:</td>
									<td id="line_stop" class="value fc2">0</td>
								</tr>
								<tr>
									<td class="label fc3">待检:</td>
									<td id="line_check" class="value fc3">0</td>
									<td class="label fc4">总数:</td>
									<td id="line_total" class="value fc4">0</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<div class="h2-panel p4">
				<div class="top-panel">
					<div class="gj-panel">
						<%-- <img src="<%=pagePath %>/images/jgbj_1.png" border="0" /> --%>
						<div class="error-icon"></div>
						<p id="nxsb_exception" class="gj">0</p>
					</div>
					<div class="icon-panel">
						<img src="<%=pagePath %>/images/nxsb_1.png" border="0" />
						<label>能效设备</label>
					</div>
				</div>

				<div class="l"></div>
				<div class="bottom-panel">
					<div class="info-panel">
						<table>
							<tbody>
								<tr>
									<td class="label fc1">正常:</td>
									<td id="nxsb_run" class="value fc1">0</td>
									<td class="label fc2">停运:</td>
									<td id="nxsb_stop" class="value fc2">0</td>
								</tr>
								<tr>
									<td class="label fc3">待检:</td>
									<td id="nxsb_check" class="value fc3">0</td>
									<td class="label fc4">总数:</td>
									<td id="nxsb_total" class="value fc4">0</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<div class="h2-panel p5">
				<div class="top-panel">
					<div class="gj-panel">
						<%-- <img src="<%=pagePath %>/images/jgbj_1.png" border="0" /> --%>
						<div class="error-icon"></div>
						<p id="other_exception" class="gj">0</p>
					</div>
					<div class="icon-panel">
						<img src="<%=pagePath %>/images/qtsb_1.png" border="0" />
						<label>其他设备</label>
					</div>
				</div>

				<div class="l"></div>
				<div class="bottom-panel">
					<div class="info-panel">
						<table>
							<tbody>
								<tr>
									<td class="label fc1">正常:</td>
									<td id="other_run" class="value fc1">0</td>
									<td class="label fc2">停运:</td>
									<td id="other_stop" class="value fc2">0</td>
								</tr>
								<tr>
									<td class="label fc3">待检:</td>
									<td id="other_check" class="value fc3">0</td>
									<td class="label fc4">总数:</td>
									<td id="other_total" class="value fc4">0</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
		<div class="l">
		</div>
		<div class="toolsbar-panel">
			<div class="tbRow">
			   <span class="tools-labelgroup" style="vertical-align:middle;border-style:none;">
				   <a id="left" href="#" style="border-style:none;">
				   <img style="border-style:none;" alt="前一天" src="<%=request.getContextPath() %>/images/tools-moveleft.gif"></a>
               </span>
               <span class="tools-labelgroup" style="vertical-align:middle;">
                   <input id="startDate" class="Wdate" type="text" style="width: 155px;text-align: left;" readonly="readonly" onClick="WdatePicker({dateFmt:'yyyy-MM',onpicked:changeDate,isShowClear:false,readOnly:true})"/>
<!--                    <input id="dlzsEDateM"  class="Wdate" type="text" style="width: 120px; text-align: left;" onClick="WdatePicker({dateFmt:'yyyy-MM',onpicked:changedlzs,isShowClear:false,readOnly:true})"  />
 -->			   </span>
			   <span class="tools-labelgroup" style="vertical-align:middle;border-style:none;">
					<a id="right" href="#" style="border-style:none;">
					<img style="border-style:none;" alt="后一天" src="<%=request.getContextPath() %>/images/tools-moveright.gif"></a>
			   </span>
			   <span class="tools-labelgroup" style="vertical-align:middle;text-algin:center;">
                    <a id="search" href="#" class="easyui-linkbutton c100" onClick="selectOperationChartData()">查询</a>
			   </span>
        	</div>
       	</div>
		<div id="chart-panel"></div>
	</div>
	
	<div id="gj-dialog" class="easyui-dialog"  title="告警" style="align:center;overflow:hidden"
        data-options="minimizable:false,maximizable:true,collapsible:false,resizable:true,modal:true,closed:true"> 
        <div style="margin-left:10px;margin-right:10px; margin-top:10px;margin-bottom:10px;height:85%;width:98%;">
        	<table id="gj-datagrid" cellspacing="0"></table>
        </div>
	</div>  
	<div id="gd-dialog" class="easyui-dialog"  title="工单" style="align:center;overflow:hidden"
        data-options="minimizable:false,maximizable:true,collapsible:false,resizable:true,modal:true,closed:true"> 
        <div style="margin-left:10px;margin-right:10px; margin-top:10px;margin-bottom:10px;height:85%;width:98%;">
        	<table id="gd-datagrid" cellspacing="0"></table>
        </div>
	</div>  
	
	<div id="zd-dialog" class="easyui-dialog"  title="终端" style="align:center;overflow:hidden"
        data-options="minimizable:false,maximizable:true,collapsible:false,resizable:true,modal:true,closed:true"> 
       	<div class="div-search" >
				<div class="div-label" >终端资产号：</div>
				<input id="zd_tmnlAssetNo" class="easyui-textbox" style="height:24px;width:155px" > 
		</div>
		<div class="div-search" >
				<div class="div-label" >终端类型：</div>
				<select id="zd_terminalTypeCode" class="easyui-combobox"  style="height:24px;width:155px" data-options="panelWidth:155,editable:false">
					<!-- <option value="">请选择</option>   
				    <option value="1">实时终端</option>   
				    <option value="2">能效终端</option>   
				    <option value="3">智能网关</option>   
				    <option value="4">小区能源通讯机</option>  
				    <option value="5">非侵入式负荷终端</option>   -->
				</select>
		</div>
		<div class="div-search right" >
				<a href="#" class="easyui-linkbutton c100 shadow" onclick="bt_zd_search();">查询</a>
		</div>
        <div style="position:absolute;top:80px;bottom:10px;left:10px;right:10px;">
        	<table id="zd-datagrid" cellspacing="0"></table>
        </div>
	</div>  
	
	<div id="csjxsb-dialog" class="easyui-dialog"  title="超时检修设备" style="align:center;overflow:hidden"
        data-options="minimizable:false,maximizable:true,collapsible:false,resizable:true,modal:true,closed:true"> 
        <div id="csjxsb-search">
			<div class="div-search" >
					<div class="div-label" >设备名称：</div>
					<input id="csjxsb_dev_name" class="easyui-textbox" style="height:24px;width:155px" > 
			</div>
			<div class="div-search" >
					<div class="div-label" >客户名称：</div>
					<input id="csjxsb_cons_name" class="easyui-combobox"  style="height:24px;width:155px" data-options="panelWidth:155,panelHeight:220">
			</div>
			<div class="div-search right" >
					<a href="#" class="easyui-linkbutton c100 shadow" onclick="bt_csjxsb_search();">查询</a>
			</div>
		</div>
        <div id="csjxsb-datagrid-div" style="position:absolute;top:80px;bottom:10px;left:10px;right:10px;">
        	<table id="csjxsb-datagrid" cellspacing="0"></table>
        </div>
	</div>  
	
	<div id="ycyxsb-dialog" class="easyui-dialog"  title="异常运行设备" style="align:center;overflow:hidden"
        data-options="minimizable:false,maximizable:true,collapsible:false,resizable:true,modal:true,closed:true"> 
        <div style="position:absolute;top:80px;bottom:10px;left:10px;right:10px;">
        	<table id="ycyxsb-datagrid" cellspacing="0"></table>
        </div>
	</div>  
	
	<div id="byq-dialog" class="easyui-dialog"  title="变压器" style="align:center;overflow:hidden"
        data-options="minimizable:false,maximizable:true,collapsible:false,resizable:true,modal:true,closed:true">      
	        <div id="byq-search">
				<!-- <div class="div-search" >
						<div class="div-label" >变压器编号：</div>
						<input id="tran_id" class="easyui-textbox" style="height:24px;width:110px" > 
				</div> -->
				<div class="div-search" >
						<div class="div-label" >变压器名称：</div>
						<input id="tran_name" class="easyui-textbox"  style="height:24px;width:155px">
				</div>
				<div class="div-search" >
						<div class="div-label" >客户名称：</div>
						<input id="cons_name" class="easyui-combobox"  style="height:24px;width:155px" data-options="panelWidth:155,panelHeight:220">
				</div>
				<div class="div-search" >
						<div class="div-label" >运行状态：</div>
						<input id="run_status" class="easyui-combobox"  style="height:24px;width:155px" data-options="editable:false,panelHeight:'auto',panelWidth:'155'">
				</div>
				<div class="div-search right" >
						<a href="#" class="easyui-linkbutton c100 shadow" onclick="byq_search();">查询</a>

				</div>
			</div>
			<div id="byq-datagrid-div" style="position:absolute;top:80px;bottom:10px;left:10px;right:10px;">
	        	<table id="byq-datagrid" cellspacing="0"></table>
	        </div>
	</div>  
	<div id="mx-dialog" class="easyui-dialog"  title="母线" style="align:center;overflow:hidden"
        data-options="minimizable:false,maximizable:true,collapsible:false,resizable:true,modal:true,closed:true"> 
         <div id="mx-search">
			<!-- <div class="div-search" >
					<div class="div-label" >母线编号：</div>
					<input id="bs_id" class="easyui-textbox" style="height:24px;width:110px" > 
			</div> -->
			<div class="div-search" >
					<div class="div-label" >母线名称：</div>
					<input id="bs_name" class="easyui-textbox"  style="height:24px;width:155px">
			</div>
			<div class="div-search" >
					<div class="div-label" >客户名称：</div>
					<input id="cons_name1" class="easyui-combobox"  style="height:24px;width:155px" data-options="panelWidth:155,panelHeight:220">
			</div>
			<div class="div-search" >
					<div class="div-label" >运行状态：</div>
					<input id="run_status_mx" class="easyui-combobox"  style="height:24px;width:155px" data-options="editable:false,panelHeight:'auto',panelWidth:'155'">
			</div>
			<div class="div-search right" >
				<a href="#" class="easyui-linkbutton c100 shadow" onclick="mx_search();">查询</a>
			</div>
		</div>
        <div id="mx-datagrid-div"  style="position:absolute;top:80px;bottom:10px;left:10px;right:10px;">
        	<table id="mx-datagrid" cellspacing="0"></table>
        </div>
	</div>  
	<div id="line-dialog" class="easyui-dialog"  title="线路" style="align:center;overflow:hidden"
        data-options="minimizable:false,maximizable:true,collapsible:false,resizable:true,modal:true,closed:true"> 
          <div id="line-search">
			<!-- <div class="div-search" >
					<div class="div-label" >线路编号：</div>
					<input id="line_id" class="easyui-textbox" style="height:24px;width:110px" > 
			</div> -->
			<div class="div-search" >
					<div class="div-label" >线路名称：</div>
					<input id="line_name" class="easyui-textbox"  style="height:24px;width:155px">
			</div>
			<div class="div-search" >
					<div class="div-label" >客户名称：</div>
					<input id="cons_name2" class="easyui-combobox"  style="height:24px;width:155px" data-options="panelWidth:155,panelHeight:220">
			</div>
			<div class="div-search" >
				<div class="div-label" >运行状态：</div>
				<input id="run_status_xl" class="easyui-combobox"  style="height:24px;width:155px" data-options="editable:false,panelHeight:'auto',panelWidth:'155'">
			</div>
			<div class="div-search right" >
					<a href="#" class="easyui-linkbutton c100 shadow" onclick="line_search();">查询</a>
			</div>
		</div>
        <div id="line-datagrid-div" style="position:absolute;top:80px;bottom:10px;left:10px;right:10px;">
        	<table id="line-datagrid" cellspacing="0"></table>
        </div>
	</div>  
	<div id="nxsb-dialog" class="easyui-dialog"  title="能效设备" style="align:center;overflow:hidden"
        data-options="minimizable:false,maximizable:true,collapsible:false,resizable:true,modal:true,closed:true"> 
          <div id="nxsb-search">
			<!-- <div class="div-search" >
					<div class="div-label" >线路编号：</div>
					<input id="line_id" class="easyui-textbox" style="height:24px;width:110px" > 
			</div> -->
			<div class="div-search" >
					<div class="div-label" >设备名称：</div>
					<input id="nxsb_name" class="easyui-textbox"  style="height:24px;width:155px">
			</div>
			<div class="div-search" >
					<div class="div-label" >客户名称：</div>
					<input id="cons_name4" class="easyui-combobox"  style="height:24px;width:155px" data-options="panelWidth:155,panelHeight:220">
			</div>
			<div class="div-search" >
				<div class="div-label" >运行状态：</div>
				<input id="run_status_nxsb" class="easyui-combobox"  style="height:24px;width:155px" data-options="editable:false,panelHeight:'auto',panelWidth:'155'">
			</div>
			<div class="div-search right" >
					<a href="#" class="easyui-linkbutton c100 shadow" onclick="nxsb_search();">查询</a>
			</div>
		</div>
        <div id="nxsb-datagrid-div" style="position:absolute;top:80px;bottom:10px;left:10px;right:10px;">
        	<table id="nxsb-datagrid" cellspacing="0"></table>
        </div>
	</div>  
	<div id="other-dialog" class="easyui-dialog"  title="其他设备" style="align:center;overflow:hidden"
        data-options="minimizable:false,maximizable:true,collapsible:false,resizable:true,modal:true,closed:true"> 
          <div id="other-search">
		<!-- 	<div class="div-search" >
					<div class="div-label" >其他设备编号：</div>
					<input id="device_id" class="easyui-textbox" style="height:24px;width:110px" > 
			</div> -->
			<div class="div-search" >
					<div class="div-label" >设备名称：</div>
					<input id="device_name" class="easyui-textbox"  style="height:24px;width:155px">
			</div>
			<div class="div-search" >
					<div class="div-label" >客户名称：</div>
					<input id="cons_name3" class="easyui-combobox"  style="height:24px;width:155px" data-options="panelWidth:155,panelHeight:220">
			</div>
			<div class="div-search" >
				<div class="div-label" >运行状态：</div>
				<input id="run_status_qt" class="easyui-combobox"  style="height:24px;width:155px" data-options="editable:false,panelHeight:'auto',panelWidth:'155'">
			</div>
			<div class="div-search right" >
				<a href="#" class="easyui-linkbutton c100 shadow" onclick="other_search();">查询</a>
			</div>
		</div>
        <div id="other-datagrid-div" style="position:absolute;top:80px;bottom:10px;left:10px;right:10px;">
        	<table id="other-datagrid" cellspacing="0"></table>
        </div>
	</div>  
	

<script type="text/javascript">
	webContextRoot="<%=basePath%>";
</script>
<script src="<%=pagePath%>/jquery-easyui-1.5.1/jquery.min.js"></script>
<script src="<%=pagePath%>/jquery-easyui-1.5.1/jquery.easyui.min.js"></script>
<script src="<%=pagePath%>/jquery-easyui-1.5.1/easyui-lang-zh_CN.js"></script>
<script src="<%=pagePath%>/js/common.js"></script>
<script type="text/javascript" src="<%=pagePath %>/js/jdialog.min.js"></script>
<script type="text/javascript" src="<%=pagePath%>/js/dateUtil.js"></script>
<script type="text/javascript" src="<%=pagePath%>/echarts/echarts.min.js"></script>
<script type="text/javascript" src="<%=pagePath%>/echarts/echartsGlobal.js"></script>
<script language="javascript" type="text/javascript" src="<%=pagePath%>/My97DatePicker/WdatePicker.js"></script>
<script type="text/javascript" src="<%=pagePath%>/js/toolwinopen.js"></script>
<script type="text/javascript" src="operationManage.js"></script>

</body>
</html>
