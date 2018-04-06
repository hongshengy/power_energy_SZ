<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%

String baseUrl  = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+baseUrl+"/";
String pagePath = baseUrl + "/pages/despages/common";	
	
session.setAttribute("itemCode","despower");
session.setAttribute("itemName","电量电费概览");
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
	<title>电量电费概览</title>
	<link rel="stylesheet" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/fangtian/easyui.css">
	<link rel="stylesheet" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/icon.css">
	<link rel="stylesheet" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/color.css">
	<link rel="stylesheet" href="<%=pagePath %>/css/common.css">
	<link rel="stylesheet" type="text/css" href="<%=pagePath %>/css/templet_common.css">
	<script src="<%=pagePath %>/js/maskJs.js"></script>
</head>
<body class="easyui-layout" >
	<script>
	    var maskobj = new maskPanelManager();
	    maskobj.register();
	</script>
	<div class="main-panel noOverflow" data-options="region:'center',border:false" >
			<div class="easyui-panel" style="width: 100%;position: relative;" data-options="cls:'fangtian-panel-style',onResize:autoResize">
				<ul id="searchDiv1" class="s-ul-one" >
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
					
					<li style="padding-left: 10px;">
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
						<span class="tools-labelgroup">
							<select id="dlzsQueryType" class="easyui-combobox" name="dept" data-options="prompt:'请选择',height:24,panelWidth:100,editable:false,width:100">   
								<option value="M" selected>月数据</option>
								<option value="Y">年数据</option>   
							</select>
						</span>
					</li>
               		<li class="s-right-one">
                		<span style="vertical-align: bottom;">
                			<a id="dlzsButton" href="#" class="easyui-linkbutton c100" data-options="onClick:getData">查询</a>
                		</span>
               		</li>
				</ul> 
				
				<ul id="searchDiv2" class="s-ul-one" style="display:none;">
					<li style="padding-left: 10px;">
						第一时间：
		                <span class="tools-labelgroup" >
							<a id="leftdlzsDF" href="#" style="border-style:none;">
               					<img style="border-style:none;vertical-align: middle" height="14px" width="14px" alt="前一年" src="<%=request.getContextPath() %>/images/tools-moveleft.gif">
               				</a>
               			</span> 
                        <span class="tools-labelgroup" >
				  			<input id="dlzsEDateYDF"  class="Wdate" type="text" style="width: 100px;text-align: left;" onClick="WdatePicker({dateFmt:'yyyy',isShowClear:false,readOnly:true})"  />
						</span>
						<span class="tools-labelgroup">
							<a id="rightdlzsDF" href="#" style="border-style:none;">
								<img style="border-style:none;vertical-align: middle" height="14px" width="14px" alt="后一年" src="<%=request.getContextPath() %>/images/tools-moveright.gif">
							</a>
						</span>
					</li>
					
					<li style="padding-left: 10px;">
						第二时间：
		                <span class="tools-labelgroup" >
							<a id="leftdlzsDFUp" href="#" style="border-style:none;">
                 					<img style="border-style:none;vertical-align: middle" height="14px" width="14px" alt="前一年" src="<%=request.getContextPath() %>/images/tools-moveleft.gif">
                 				</a>
                			</span> 
                        <span class="tools-labelgroup" >
				  			<input id="dlzsEDateYDFUp"  class="Wdate" type="text" style="width: 100px;text-align: left;" onClick="WdatePicker({dateFmt:'yyyy',isShowClear:false,readOnly:true})"  />
						</span>
						<span class="tools-labelgroup">
							<a id="rightdlzsDFUp" href="#" style="border-style:none;">
								<img style="border-style:none;vertical-align: middle" height="14px" width="14px" alt="后一年" src="<%=request.getContextPath() %>/images/tools-moveright.gif">
							</a>
						</span>
						<span class="tools-labelgroup">
							<select id="dlzsQueryTypeDF" class="easyui-combobox" name="dept" data-options="prompt:'请选择',height:24,panelWidth:100,editable:false,width:100">   
								<option value="Y" selected>年数据</option>   
							</select>
						</span>
					</li>
               		<li class="s-right-one">
                		<span style="vertical-align: bottom;">
                			<a id="dlzsButton" href="#" class="easyui-linkbutton c100" data-options="onClick:getData">查询</a>
                		</span>
               		</li>
				</ul> 
			</div>
			 
			<div class="easyui-panel auto-resize main-panel" style="width: 100%;position: relative;overflow-x:hidden " data-options="cls:'fangtian-panel-style bottom-padding',onResize:autoResize">
				<div class="easyui-panel noOverflow auto-resize" style="width: 100%;position: relative; " data-options="cls:'bottom-padding',border:false">
				 	<div id="tabId" class="easyui-tabs" style="width: 100%;height:100%" data-options="border:false">
				        <div title="电量概览" data-options="onResize:userResize">
				          	<div class="chart"  id="dlglChart" style="width: 100%;min-height:220px;height:100%;box-sizing: border-box;"></div>
					    </div>   
					    <div title="电费概览" data-options="onResize:userResize">   
				          	<div class="chart"  id="dfglChart" style="width: 100%;min-height:220px;height:100%;box-sizing: border-box;"></div>
					    </div>   
			     	</div>
		     	</div>
		     	<div class="easyui-panel noOverflow auto-resize" style="width: 100%;position: relative;" data-options="border:false">
		     		<div id="queryDataGrid" style="width:100%;height:100%;margin-top:12px;border: 1px;"></div>
		     	</div>

		     </div>

	</div>

	<!-- 电量柱状图 -->
    <div id="qydlMonthDialog" class="easyui-dialog"  title="电量概览" style="align:center;overflow:hidden;z-index:3"
        data-options="minimizable:false,maximizable:true,collapsible:false,resizable:true,modal:true,closed:true"> 
		<div id="divSearch" class="easyui-panel" style="width: 100%;position: relative;" title="" data-options="cls:'fangtian-panel-style'">
          	<ul class="s-ul-one">
          		<li style="padding-left: 10px;">
          			<span class="tools-labelgroup" >模糊查询：</span>
          			<input class="easyui-textbox" style="width:155px;height:24px;" id="jqcxMonth" prompt="客户名称/客户编号"> 
          		</li>
          		<li class="s-right-one">
          			<a id="btn" href="#" class="easyui-linkbutton c100" data-options="onClick:queryElectricByClickMonth">查询</a>
          		</li>
        	</ul>
  		</div> 
        <div class="easyui-panel auto-resize main-panel" style="width: 100%;height:88%;position: relative;overflow-x:hidden " data-options="cls:'fangtian-panel-style bottom-padding',onResize:autoResize">
	        <div class="easyui-panel noOverflow auto-resize" style="width: 100%;position: relative;" data-options="border:false">
	     		<div id="qydlMonthData" style="width:100%;height:100%;margin-top:12px;border: 1px;"></div>
	     	</div>
     	</div>
	</div>
    
    <!-- 区域电费 -->
    <div id="qydfMonthDialog" class="easyui-dialog"  title="电量概览" style="align:center;overflow:hidden;z-index:3"
        data-options="minimizable:false,maximizable:true,collapsible:false,resizable:true,modal:true,closed:true"> 
		<div id="divSearch" class="easyui-panel" style="width: 100%;position: relative;" title="" data-options="cls:'fangtian-panel-style'">
           	<ul class="s-ul-one">
           		<li style="padding-left: 10px;">
           			<span class="tools-labelgroup">模糊查询：</span>
           			<input class="easyui-textbox" style="width:155px;height:24px;" id="jqccMonth" prompt="客户名称/客户编号"> 
           		</li>
           		<li class="s-right-one">
           			<a id="btn" href="#" class="easyui-linkbutton c100" data-options="onClick:queryDfglChartByClick">查询</a>
           		</li>
           	</ul>
        </div> 
        <div class="easyui-panel auto-resize main-panel" style="width: 100%;height:88%;position: relative;overflow-x:hidden " data-options="cls:'fangtian-panel-style bottom-padding',onResize:autoResize">
	        <div class="easyui-panel noOverflow auto-resize" style="width: 100%;position: relative;" data-options="border:false">
	     		<div id="qydfDayData" style="width:100%;height:100%;margin-top:12px;border: 1px;"></div>
	     	</div>
     	</div> 
        </div>
	</div>
	<script type="text/javascript">	
		webContextRoot="<%=basePath%>";
		var ac = "户号";
	</script>
	
	<script src="<%=pagePath %>/jquery-easyui-1.5.1/jquery.min.js"></script>
	<script src="<%=pagePath %>/jquery-easyui-1.5.1/jquery.easyui.min.js"></script>
	<script src="<%=pagePath %>/jquery-easyui-1.5.1/easyui-lang-zh_CN.js"></script>
	<script type="text/javascript" src="<%=pagePath %>/js/jdialog.min.js"></script>
	<script src="<%=pagePath %>/js/common.js"></script>
	<script type="text/javascript" src="<%=pagePath%>/js/dateUtil.js"></script>
	<script type="text/javascript" src="<%=pagePath %>/echarts/echarts.min.js"></script>
	<script type="text/javascript" src="<%=pagePath%>/echarts/echartsGlobal.js"></script>
	<script type="text/javascript" src="<%=pagePath%>/js/exportynbg.js"></script>
	<script src="<%=pagePath%>/js/templet_common.js"></script>
	<script language="javascript" type="text/javascript" src="<%=pagePath%>/My97DatePicker/WdatePicker.js"></script>
	<script type="text/javascript" src="<%=baseUrl%>/pages/despages/electricQuality/electricOverview.js"></script>	
</body>
</html>
