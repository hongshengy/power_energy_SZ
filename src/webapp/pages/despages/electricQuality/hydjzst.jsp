<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.frontier.pubmodule.AueicUtil"%>
<%
	String baseUrl  = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+baseUrl+"/";
	String pagePath = baseUrl + "/pages/despages";
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN""http://www.w3c.org/TR/HTML4/loose.dtd">
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
<meta charset="UTF-8"/>
<title>行业电价</title>

<link rel="stylesheet" type="text/css" href="<%=pagePath %>/common/jquery-easyui-1.5.1/themes/fangtian/easyui.css">
<link rel="stylesheet" type="text/css" href="<%=pagePath %>/common/jquery-easyui-1.5.1/themes/icon.css">
<link rel="stylesheet" type="text/css" href="<%=pagePath %>/common/jquery-easyui-1.5.1/themes/color.css">
<link rel="stylesheet" type="text/css" href="<%=baseUrl %>/pages/areaEnergy/common/css/tree.css">
<link rel="stylesheet" type="text/css" href="<%=pagePath %>/common/css/common.css">
<link rel="stylesheet" type="text/css" href="<%=pagePath %>/common/css/templet_common.css">
<script src="<%=pagePath %>/common/js/maskJs.js"></script>
</head>
<body class="easyui-layout">
	<script>
	    var maskobj = new maskPanelManager();
	    maskobj.register();
	</script>
	<style>
		.modal-body {
		    position: relative;
		    padding: 6px;
		}
		.row{
			margin: 0 0 2px 0;
		}
			
		.row_regiontitle{
			margin:0 0 5px 0;
		}
		
		.row_regiontitle .row-regionbutton{
			font-weight: bold;
			color: #222;
			font-size: 12px !important;
		}
		
		.row_region{
			padding: 1px 0;
			border-top:1px dashed #eee;
		}
			
		.row-regionbutton{
			padding: 1px 5px;
			background-color: inherit;
			color: #666;
			font-size: 12px !important;
		}
		
		.row-regionbutton:hover{
			background-color: #e2e2e2;
		}
		
		.row-regionbutton.active, .row-regionbutton:active{
			background-color: #009b9b;
			color:#fff;
		}
	</style>
	
	<div class="main-panel noOverflow" data-options="region:'center',border:false" >
	 
	 	<div class="easyui-panel" style="width: 100%;position: relative;" data-options="cls:'fangtian-panel-style',onResize:autoResize">
				<ul class="s-ul-one" >
					<li style="padding-left: 10px;">
						第一时间：
		                <span class="tools-labelgroup" >
							<a id="leftdlzs" href="#" style="border-style:none;">
                 					<img style="border-style:none;vertical-align: middle" height="14px" width="14px" alt="前一年" src="<%=request.getContextPath() %>/images/tools-moveleft.gif">
                 				</a>
                			</span> 
                        <span class="tools-labelgroup" >
				  			<input id="dlzsEDateM"  class="Wdate" type="text" style="width: 100px;text-align: left;" onClick="WdatePicker({dateFmt:'yyyy-MM',isShowClear:false,readOnly:true})"  />
				  			<input id="dlzsEDateY"  class="Wdate" type="text" style="width: 100px;text-align: left;" onClick="WdatePicker({dateFmt:'yyyy',isShowClear:false,readOnly:true})"  />
						</span>
						<span class="tools-labelgroup">
							<a id="rightdlzs" href="#" style="border-style:none;">
								<img style="border-style:none;vertical-align: middle" height="14px" width="14px" alt="后一年" src="<%=request.getContextPath() %>/images/tools-moveright.gif">
							</a>
						</span>
					</li>
					
					<li>
						第二时间：
		                <span class="tools-labelgroup" >
							<a id="leftdlzsUp" href="#" style="border-style:none;">
                 					<img style="border-style:none;vertical-align: middle" height="14px" width="14px" alt="前一年" src="<%=request.getContextPath() %>/images/tools-moveleft.gif">
                 				</a>
                			</span> 
                        <span class="tools-labelgroup" >
				  			<input id="dlzsEDateMUp"  class="Wdate" type="text" style="width: 100px;text-align: left;" onClick="WdatePicker({dateFmt:'yyyy-MM',isShowClear:false,readOnly:true})"  />
				  			<input id="dlzsEDateYUp"  class="Wdate" type="text" style="width: 100px;text-align: left;" onClick="WdatePicker({dateFmt:'yyyy',isShowClear:false,readOnly:true})"  />
						</span>
						<span class="tools-labelgroup">
							<a id="rightdlzsUp" href="#" style="border-style:none;">
								<img style="border-style:none;vertical-align: middle" height="14px" width="14px" alt="后一年" src="<%=request.getContextPath() %>/images/tools-moveright.gif">
							</a>
						</span>
						<span class="tools-labelgroup" style="display:none;">
							<select id="dlzsQueryType" class="easyui-combobox" name="dept" data-options="prompt:'请选择',height:24,panelWidth:100,editable:false,width:100">   
								<option value="M">月数据</option>
								<option value="Y" selected>年数据</option>   
							</select>
						</span>
						
						<span class="tools-labelgroup">
							 <select id="queryHyByConsId" class="easyui-combobox" data-options="width:155,panelHeight:'auto',panelWidth:155"></select>
						</span>
					</li>
               		<li class="s-right-one">
					    <a id="dlzsButton" href="#" class="easyui-linkbutton c100 shadow" data-options="onClick:getData">查询</a>
					</li>
				</ul> 
			</div>
	 
		<div id="content-panel" class="auto-resize easyui-panel main-panel noOverflow" style="width: 100%;height:100%;" data-options="cls:'fangtian-panel-style bottom-padding'">
			
			<div id="c-panel" class="easyui-panel" style="width: 100%;height: 100%;" data-options="border:false,onResize:userResize">
				<div class="chart" id="hydjChart" style="width: 100%;height: 100%;padding: 10px;box-sizing: border-box;"></div>
			</div>
			
		</div>
	</div>

<script type="text/javascript">
	webContextRoot="<%=basePath%>";
</script>
<!-- 加载顺序不可颠倒 -->
<script type="text/javascript" src="<%=pagePath %>/common/js/dateUtil.js"></script>
<script type="text/javascript" src="<%=pagePath %>/common/jquery-easyui-1.5.1/jquery.min.js"></script>
<script type="text/javascript" src="<%=pagePath %>/common/echarts/echarts.min.js"></script>
<script type="text/javascript" src="<%=pagePath %>/common/jquery-easyui-1.5.1/jquery.easyui.min.js"></script>
<script type="text/javascript" src="<%=pagePath %>/common/jquery-easyui-1.5.1/easyui-lang-zh_CN.js"></script>
<script type="text/javascript" src="<%=baseUrl%>/pages/despages/electricQuality/hydjzst.js"></script>
<script language="javascript" type="text/javascript" src="<%=pagePath%>/common/My97DatePicker/WdatePicker.js"></script>
<script src="<%=pagePath%>/common/js/templet_common.js"></script>
</body>
</html>