<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String baseUrl = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ baseUrl + "/";
	String pagePath = baseUrl + "/pages/despages/common";
	String treePagePath = baseUrl + "/pages/areaEnergy/common";

	String orgNo = request.getParameter("orgNo");//获取地区编码（如：101、102）
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
<title>变压器能效总览</title>
	<link rel="stylesheet" href="<%=pagePath%>/jquery-easyui-1.5.1/themes/fangtian/easyui.css">
	<link rel="stylesheet" href="<%=pagePath%>/jquery-easyui-1.5.1/themes/icon.css">
	<link rel="stylesheet" href="<%=pagePath%>/jquery-easyui-1.5.1/themes/color.css">
	<link rel="stylesheet" href="<%=pagePath%>/css/common.css">
	<link rel="stylesheet" type="text/css" href="<%=pagePath %>/css/templet_common.css">
	<link rel="stylesheet" href="<%=baseUrl%>/resources/jsepc/css/ext-all.css">
	<script src="<%=pagePath%>/js/maskJs.js"></script>
</head>

<body class="easyui-layout">
<script>
    var maskobj = new maskPanelManager();
    maskobj.register();
</script>
<style>
.comm-panel {
	padding: 0px 6px;
	width: 100%;
	font-size: 0px;
	/*用于处理inline-block间距*/
	box-sizing: border-box;
}

.comm-panel .h1-panel {
	font-size: 12px;
	width: 25%;
	display: inline-block;
	height: 65px;
	line-height: 65px;
	/*background: #3B4755;*/
	text-align: center;
	position: relative;
}

.comm-panel .h1-panel .icon-panel {
	display: inline-block;
	vertical-align: middle;
	padding-right: 10px;
}

.comm-panel .h1-panel .icon-panel>img {
	display: block;
}

.comm-panel .h1-panel .info-panel {
	display: inline-block;
	line-height: normal;
	vertical-align: middle;
	color: #FFFFFF;
}

.comm-panel .h1-panel .info-panel .value {
	font-size: 20px;
	padding: 0px 10px;
	vertical-align: sub;
	font-family: "宋体",serif;
}

.comm-panel .fc1 {
	color: white;
	font-size: 20px;
}

.comm-panel .fc2 {
	color: white;
	font-size: 20px;
}

.comm-panel .fc3 {
	color: white;
	font-size: 20px;
}

.comm-panel .fc4 {
	color: white;
	font-size: 20px;
}

.comm-panel .p1 {
	margin-left: -6px;
}

.comm-panel .p2 {
	margin-left: 4px;
	margin-right: 2px;
}

.comm-panel .p3 {
	margin-left: 2px;
	margin-right: 4px;
}

.comm-panel .p4 {
	margin-right: -6px;
}
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
.info-bg {
	position: absolute;
	left: 0px;
	right: 0px;
	top: 0px;
	bottom: 0px;
	z-index: -1;
}	
</style>
		<div class="main-panel noOverflow" data-options="region:'center'">
			<div class="easyui-panel" style="width: 100%;position: relative;background: none" data-options="cls:'fangtian-panel-style',onResize:autoResize,border:false">
				
				<div class="comm-panel">
					<div class="h1-panel p1">
						<div class="icon-panel">
							<img src="<%=request.getContextPath() %>/images/byqgj.png" border="0" />
						</div>
						<div class="info-panel">
							<p class="value">告警:<span id="tran_exception">30</span></p>
						</div>
						<div class="info-bg">
							<img src="<%=pagePath%>/images/0413-13.png" width="100%" height="100%" border="0" />
						</div>
					</div>
					<div class="h1-panel p2">
						<div class="info-bg">
							<img src="<%=pagePath%>/images/0413-14.png" width="100%" height="100%" border="0" />
						</div>
						<div class="icon-panel">
							<img src="<%=request.getContextPath() %>/images/byqdj.png" border="0" />
						</div>
						<div class="info-panel">
							<p class="value">待检:<span id="tran_check">30</span></p>
						</div>
					</div>
					<div class="h1-panel p3">
						<div class="info-bg">
							<img src="<%=pagePath%>/images/0413-14.png" width="100%" height="100%" border="0" />
						</div>
						<div class="icon-panel">
							<img src="<%=request.getContextPath() %>/images/byqzc.png" border="0" />
						</div>
						<div class="info-panel">
							<p class="value">正常:<span id="tran_run">30</span></p>
						</div>
					</div>
					<div class="h1-panel p4">
						<div class="info-bg" style="right: 0px;">
							<img src="<%=pagePath%>/images/0413-15.png" width="100%" height="100%" border="0" />
						</div>
						<div class="icon-panel">
							<img src="<%=request.getContextPath() %>/images/byqzs.png" border="0" />
						</div>
						<div class="info-panel">
							<p class="value">总数:<span id="tran_total">30</span></p>
						</div>
					</div>
				</div>
			</div>
			<div id="content-panel" class="auto-resize easyui-panel main-panel noOverflow" style="width: 100%;" data-options="cls:'fangtian-panel-style bottom-padding'">
				<div class="easyui-panel show-bottom-border" style="width: 100%;position: relative;" data-options="onResize:autoResize,border:false">
					<ul class="s-ul-one">
						<li>
							<span class="tools-labelgroup" style="vertical-align:middle;border-style:none;">
	                 			<a onclick="" id="button_query" href="javascript:qytQueryOveride('-1');" style="border-style:none;">
									<img alt="前一天" src="<%=request.getContextPath() %>/images/tools-moveleft.gif" style="border-style:none;vertical-align: middle">
							    </a>
	                		</span>
	                        <span class="tools-labelgroup" style="vertical-align:middle;">
	                             <input id="dataDate" class="Wdate" type="text" style="width: 100px;text-align: left;" readonly="readonly" onClick="WdatePicker({dateFmt:'yyyy-MM'})"/>	
							</span>
							<span class="tools-labelgroup" style="vertical-align:middle;border-style:none;">
								 <a onclick="" id="button_query" href="javascript:qytQueryOveride('1');" style="border-style:none;">
			    				 	<img alt="后一天" src="<%=request.getContextPath() %>/images/tools-moveright.gif" style="border-style:none;vertical-align: middle">
			    				 </a>
							</span>
						</li>
						<li class="s-right-one">
							<a href="#" class="easyui-linkbutton c100" onclick="selByqNxtj()">查询</a>
							<a href="#" class="easyui-linkbutton c100" onclick="openByqSj()">数据列表</a>
						</li>
					</ul>
				</div>

				<div id="c-panel" class="auto-resize easyui-panel" style="width: 100%;overflow-x: hidden;" data-options="border:false,onResize:userResize">
					<div style="width: 100%; height: 55%;box-sizing: border-box;">
						<div id="byqNxtj" class="chart" style="width: 100%;height: 90%;padding: 10px;box-sizing: border-box;"></div>
						<div style="width: 100%;height: 10%; text-align: center;">
							<label style="color: #FFCC33">油温越限：来源于变压器温度告警配置；重载：运行容量处于铭牌容量80%-100%；过载运行：运行容量高于铭牌容量;</label>
						</div>
					</div>
					
					<div style="width: 100%; height: 45%;box-sizing: border-box;border-top: 1px solid #CCCCCC;">
						<div id="byqLx" class="chart" style="display:table ;width: 40%;height: 100%;padding: 10px;box-sizing: border-box;border-right: 1px solid #CCCCCC;float: left;"></div>
						<div id="byqRl" class="chart" style="display:table ;width: 58%;height: 100%;padding: 10px;box-sizing: border-box;"></div>	
					</div>
				</div>
			</div>
		</div>

		<div id="byq-dialog" class="easyui-dialog"  title="变压器" style="align:center;overflow:hidden"
	        data-options="minimizable:false,maximizable:true,collapsible:false,resizable:true,modal:true,closed:true">      
		        <div id="byq-search" style="height:10%;">
		        	<ul class="s-ul-one" >
						<li>
							<span>变压器:</span>
			                <span class="tools-labelgroup" >
                  				 <input id="tran_name" class="easyui-textbox" style="height:24px;width:110px" >
                 			</span>
						    <span>客户名称:</span>
			                <span class="tools-labelgroup" >
                  				 <input id="cons_name" class="easyui-textbox"  style="height:24px;width:110px">
                 			</span>
                 			<span>运行状态:</span>
                 			<span class="tools-labelgroup" >
                  				 <input id="run_status" class="easyui-combobox"  style="height:24px;width:110px" data-options="editable:false,panelHeight:'auto',panelWidth:'110'">
                 			</span> 
						</li>
                		<li class="s-right-one">
                			<span style="vertical-align: bottom;"><a href="#" class="easyui-linkbutton c100" data-options="width:80" onclick="byq_search();">查询</a></span>
                		</li>
					</ul>
				</div>
				<div id="byq-datagrid-div" style="padding:10px;height:85%;width:98%;">
		        	<table id="byq-datagrid" cellspacing="0"></table>
		        </div>
		</div>
		
		<div id="byqSj-dialog" class="easyui-dialog"  title="运行状况统计" style="align:center;overflow:hidden"
	        data-options="minimizable:false,maximizable:true,collapsible:false,resizable:true,modal:true,closed:true">      
		        <div id="byq-search" style="height:10%;">
					<ul class="s-ul-one" >
						<li>
							<span>客户名称:</span>
			                <span class="tools-labelgroup" >
                  				 <!-- <input id="consName" class="easyui-textbox"  style="height:24px;width:110px"> -->
                  				 <select class="easyui-combobox" id="consId" data-options="width:150,panelWidth:150,prompt:'请选择',panelHeight:'200px',editable:true">
                                    </select>
                 			</span>
						    <!-- <span>变压器名称:</span>
			                <span class="tools-labelgroup" >
                  				 <input id="tranName" class="easyui-textbox"  style="height:24px;width:110px">
                 			</span> -->
						    <span>变压器容量:</span>
			                <span class="tools-labelgroup" >
                  				 <input id="plateCap" class="easyui-numberbox" style="height:24px;width:110px" data-options="min:0,max:99999999" >
                 			</span> 
						</li>
                		<li class="s-right-one">
                			<span style="vertical-align: bottom;"><a id="search" href="#" class="easyui-linkbutton c100" data-options="width:80" onclick="selByqSj();">查询</a></span>
                			<span style="vertical-align: bottom;"><a id="search" href="#" class="easyui-linkbutton c100" data-options="width:80" onclick="excelData();">导出</a></span>
                		</li>
					</ul>
				</div>
				
				<div id="byq-datagrid-div" style="padding:10px;height:85%;width:98%;">
		        	<table id="byqSj-datagrid" cellspacing="0"></table>
		        </div>
		</div>
		<div id="byqYxzk-dialog" class="easyui-dialog"  title="38" style="align:center;overflow:hidden" 
			data-options="minimizable:false,maximizable:true,collapsible:false,resizable:true,modal:true,closed:true">      
				<div style="height:10%;">
					<ul class="s-ul-one">
						<li>
							<span>客户名称:</span>
			                <span class="tools-labelgroup" >
                  				 <select class="easyui-combobox" id="yxzk_consId" data-options="width:150,panelWidth:150,prompt:'请选择',panelHeight:'200px',editable:true">
                                    </select>
                 			</span>
						    <span>变压器容量:</span>
			                <span class="tools-labelgroup" >
                  				 <input id="yxzk_plateCap" class="easyui-numberbox" style="height:24px;width:110px" data-options="min:0,max:99999999" >
                 			</span> 
						</li>
                		<li class="s-right-one">
                			<span style="vertical-align: bottom;"><a id="yxzk_search" href="#" class="easyui-linkbutton c100" data-options="width:80" onclick="selYxzk();">查询</a></span>
                		</li>
					</ul>
				</div>	
			<div style="padding:10px;height:85%;width:98%;">
	        	<table id="byqYxzk-datagrid" cellspacing="0"></table>
	        </div>
		</div>
	<div id="topic-excel" class="x-hidden"/>	
	<script type="text/javascript">
		webContextRoot="<%=basePath%>";
		var orgNo = '<%=orgNo%>';
	</script>
	<script type="text/javascript" src="<%=baseUrl%>/resources/ext-2.2.1/adapter/ext/ext-base.js"></script>
	<script type="text/javascript" src="<%=baseUrl%>/resources/ext-2.2.1/ext-all.js"></script>
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
	<script src="<%=pagePath%>/js/templet_common.js"></script>
	<script type="text/javascript" src="tranOverview.js"></script>
</body>
</html>
