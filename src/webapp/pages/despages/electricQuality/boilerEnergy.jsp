<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%

String baseUrl  = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+baseUrl+"/";
String pagePath = baseUrl + "/pages/despages/common";	
String treePagePath = baseUrl + "/pages/areaEnergy/common";	
	
session.setAttribute("itemCode","despower");
session.setAttribute("itemName","功率因数");
String consId = request.getParameter("consId");//获取调用父页面传过来的参数
String consName = request.getParameter("consName");//获取调用父页面传过来的参数
String funcId = request.getParameter("funcId");//获取调用父页面传过来的参数
//consId="101000004001";
//consName="立霸实业有限公司";
String shownTree = "";//左侧树布局
String shownRightStyle = "";//左侧树布局
//未获取到企业编码，证明不是客户监控页面调用的，需要加载左侧树进行查询
if(consId==null || consId.equals("")){//左侧树布局
	shownTree =  "<div id=\"westTree\" data-options=\"region:'west',disabled:true,split:true,border:false\" style=\"width:220px;\">"
				+"  <div style=\"padding: 3px; border-bottom: 1px solid #e7e7e7; background-color: #f2f2f2\">"
				+"    <input id=\"CobConsSelect\" class=\"easyui-textbox\" style=\"width: 98%;\" data-options=\"iconCls:'icon-search'\">"
				+"    <div style=\"position: absolute;top:38px;width:218px;\">"
				+"      <input id=\"consSelect\" class=\"easyui-textbox\" style=\"width: 98%;\" data-options=\"iconCls:'icon-search',prompt:'请输入客户名称'\">"
				+"    </div>"
				+"  </div>"
		 		+"  <div style=\"overflow: auto;top:70px;width:218px;bottom:0px;position: absolute;\">"
				+"    <ul  id=\"tree-leftQyTree\" class=\"easyui-tree\" style=\"width:100%;\"  >"
				+"    </ul>"
				+"  </div> "
				+"</div> ";
}
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN""http://www.w3c.org/TR/HTML4/loose.dtd">

<html>
 <head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
 	<meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <meta http-equiv="Pragma" content="no-cache" />
	<meta http-equiv="Cache-Control" content="no-cache" />
	<meta http-equiv="Expires" content="0" />
    <title>锅炉分析</title>
    <link rel="stylesheet" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/fangtian/easyui.css">
    <link rel="stylesheet" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/icon.css">
    <link rel="stylesheet" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/color.css">
    <link rel="stylesheet" href="<%=pagePath %>/css/common.css">
    <link rel="stylesheet" href="<%=treePagePath %>/css/tree.css">
    <link rel="stylesheet" href="<%=baseUrl%>/resources/jsepc/css/ext-all.css">
    <link rel="stylesheet" type="text/css" href="<%=pagePath %>/css/templet_common.css">
    <script src="<%=pagePath %>/js/maskJs.js"></script>
</head>
  
<body  class="easyui-layout">
		<script>
		    var maskobj = new maskPanelManager();
		    maskobj.register();
		</script>
<style>
	#tjfx-panel{
		width: 100%;
		height: 100%;
	}
	
	#tjfx-panel .search-panel{
		width: 100%;
		height: 90px;
	}
	
	#tjfx-panel .search-panel div{
		padding: 5px 0px 5px 10px;
		float: left;
	}
	   #tjfx-panel .form-table {
	        font-size: 12px;
	    }
	    
	    #tjfx-panel .form-table .td-label{
	        width: 300px;
	        text-align: left;
	    }
	
	    #tjfx-panel .form-table .td-value{
	        width: 300px;
	    }
	
	    #tjfx-panel .form-table .td-fillwidth{
	        width: 40px;
	    }
	      .block2{
        text-align: left;
        border-top: 1px solid #d4d4ca;
        padding: 6px 3px;
    }

    .block2 .col{
        float: left;
        width: 20%;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        padding: 0 3px;
    }

    .block2 .col .innerBox{
        background-color: #f7f7f7;
        padding: 10px 20px;
        height: 75px;;
    }

    .block2 .col p{
        margin: 5px 0;
        font-family: "宋体",serif;
    }

    .block2 .col .value{
        color: #242424;
        font-size: 14px;

    }

    .block2 .col .label{
        color: #242424;
        padding: 5px;
        font-size: 14px;
    }

    .block2 .col .label .num{
          font-family: "宋体",serif;
    	  font-size: 14px;
    	  font-weight: bold;
    }
    
    .block2 .col .value .num{
         font-family: "宋体",serif;
    	  font-size: 14px;
    	  font-weight: bold;
    }

    .block2 .col3 .innerBox p{
        margin-top: 20px;
    }
     .block2 .col4 .innerBox p{
        margin-top: 20px;
    }
	.value-color{
	  color: #606060;
	  margin-top:15px;
	  font-size: 14px;
	  font-family: "微软雅黑";
	}
	
	#computeDialog .content table {
		margin: 10px 60px;
	}
</style> 
	<%=shownTree%>
	<div class="main-panel noOverflow" data-options="region:'center',border:false" >
    	 <div class="easyui-panel" style="width: 100%;position: relative;" data-options="cls:'fangtian-panel-style',onResize:autoResize">
				<ul class="s-ul-one">
					<li style="padding-left: 10px;">
					  <span id="consNo"  class="tb-group-label">客户编号:</span>
					</li>
					<li>
					  <span id="consName"  class="tb-group-label">客户名称:</span>
					</li>
					<li>
					  <span id="htrl"  class="tb-group-label">合同容量:</span>
					</li>
					<li>
					  <span id="address"  class="tb-group-label">用电地址:</span>
					</li>
					<li>
					  <span id="khzt"  class="tb-group-label">客户状态:</span>
					</li>
					<li style="float:right;padding-right: 10px;">
					 <a id="bt_exportynbg" href="#" class="easyui-linkbutton c100">用能分析报告</a>
					</li>
				</ul> 
			</div>
			<div id="content-panel" class="auto-resize easyui-panel main-panel " style="width: 100%;overflow-x:hidden" data-options="cls:'fangtian-panel-style bottom-padding',onResize:autoResize">
			 	<div class="easyui-panel show-bottom-border" style="width: 100%;position: relative;" data-options="onResize:autoResize,border:false">
					<ul class="s-ul-one" >
						<li>
							<span class="tools-labelgroup">
						     	 <select class="easyui-combobox" id="selectDev"  data-options="editable:false,width:155,panelHeight:'auto'" >
						     	 </select>
							</span>
			                <span class="tools-labelgroup" >
								<a id="leftdlzs" href="#" style="border-style:none;">
                  					<img style="border-style:none;vertical-align: middle" height="14px" width="14px" alt="前一年" src="<%=request.getContextPath() %>/images/tools-moveleft.gif">
                  				</a>
                 			</span> 
	                        <span class="tools-labelgroup" >
								<input id="dlzsEDateD"  class="Wdate" type="text" style="width: 100px;text-align: left;" onClick="WdatePicker({dateFmt:'yyyy-MM-dd',isShowClear:false,readOnly:true})" />
							</span>
							<span class="tools-labelgroup">
								<a id="rightdlzs" href="#" style="border-style:none;">
									<img style="border-style:none;vertical-align: middle" height="14px" width="14px" alt="后一年" src="<%=request.getContextPath() %>/images/tools-moveright.gif">
								</a>
							</span>
						</li>
						<li class="s-right-one">
						    <a href="#" class="easyui-linkbutton c100" data-options="onClick:getData">查询</a>
						    <a href="#" class="easyui-linkbutton c100" data-options="onClick:compute">用能成本计算</a>
						    <a href="#" class="easyui-linkbutton c100" data-options="onClick:exportTable">锅炉分析报表</a>
						</li>
					</ul>
				</div>
				<!-- 热效率统计 begin --> 
				<div style="width: 100%;height:350px;position: relative;" data-options="onResize:autoResize,border:false">
					<div id="tabs" class="easyui-tabs" style="width: 100%;height: 100%;" data-options="border:false">
						<div id="dynh" title="热效率统计" class="main-panel auto-resize noOverflow" data-options="selected:true,onResize:autoResize">
							<div class="auto-resize easyui-panel" style="width: 100%;overflow-x:hidden;" data-options="border:false,onResize:userResize">
								<div class="chart" id="hotChart" style="width: 100%;height:100%;padding: 10px;box-sizing: border-box;"></div>
							</div>
							<div id="tab-fzl" class="local-panel block2 panel-margin-top clearfix" style="margin-bottom:1px;">
								<div class="body-block ktynjy-block clearfix" style="padding: 10px 10px;font-size: 14px;">
									<div>
										<p class="value-color" id="error_title" style="width: 100%">
											<span id="hotAnalysis"></span>
											<span id="hotInput"><input id="gasPrices" class="easyui-numberbox" style="height:24px;width:50px"/></span>
											<span id="hotCompute"></span>
										</p>
									</div>
								</div>
							</div>
						</div>	
					</div>	
				</div>
				<!-- 热效率统计 end --> 
				<!-- 水电统计 begin -->
				<div style="width: 100%;height:350px;position: relative;" data-options="onResize:autoResize,border:false">
					<div id="tabs" class="easyui-tabs" style="width: 100%;height: 100%;" data-options="border:false">
						<div id="dynh" title="水电统计" class="main-panel auto-resize noOverflow" data-options="selected:true,onResize:autoResize">
							<div class="auto-resize easyui-panel" style="width: 100%;overflow-x:hidden;" data-options="border:false,onResize:userResize">
								<div class="chart" id="powerChart" style="width: 100%;height:100%;padding: 10px;box-sizing: border-box;"></div>
							</div>
							<div id="tab-fzl" class="local-panel block2 panel-margin-top clearfix" style="margin-bottom:1px;">
								<div class="body-block ktynjy-block clearfix" style="padding: 10px 10px;font-size: 14px;">
									<div>
										<p class="value-color" id="error_title" style="width: 100%">
											<span id="powerAnalysis"></span>
											<span id="powerInput"><input id="powerPrices" class="easyui-numberbox" style="height:24px;width:50px"/></span>
											<span id="powerCompute"></span><br/>
											<span id="waterAnalysis"></span>
											<span id="waterInput"><input id="waterPrices" class="easyui-numberbox" style="height:24px;width:50px"/></span>
											<span id="waterCompute"></span>
										</p>
									</div>
								</div>
							</div>
						</div>	
					</div>	
				</div>
				<!-- 水电统计 end -->
			</div>
		</div>
		
		
		
        <div id="computeDialog" class="easyui-dialog hidden" closed="true" modal="true" title="">
			<div class="content">
				<table style="margin:10px auto;">
					<tr>
						<td style="width:150px;">电价格(元/kWh)：</td>
						<td style="width:250px">
							<input id="elecPrice" class="easyui-textbox"  style="height:24px;width:200px" data-options="required:true,validType:'length[0,9]'"/>
						</td>
					</tr>
					<tr>
						<td>燃气价格(元/Nm³)：</td>
						<td>
							<input id="fuelGasPrice" class="easyui-textbox"  style="height:24px;width:200px" data-options="required:true,validType:'length[0,9]'"/>
						</td>
					</tr>
					<tr>
						<td>电热值(KJ/kWh)：</td>
						<td>
							<input id="elecHotValue" class="easyui-textbox"  style="height:24px;width:200px" data-options="required:true,validType:'length[0,16]'"/>
						</td>
					</tr>
					<tr>
						<td>燃气热值(KJ/m³)：</td>
						<td>
							<input id="gasHotValue" class="easyui-textbox"  style="height:24px;width:200px" data-options="required:true,validType:'length[0,16]'"/>
						</td>
					</tr>
					<tr>
						<td>水比热容(J/(kg·℃))：</td>
						<td>
							<input id="specificHeat" class="easyui-textbox"  style="height:24px;width:200px" data-options="required:true,validType:'length[0,16]'"/>
						</td>
					</tr>
					<tr>
						<td>加热水量(t)：</td>
						<td>
							<input id="heatWater" class="easyui-textbox"  style="height:24px;width:200px" data-options="required:true,validType:'length[0,9]'"/>
						</td>
					</tr>
					<tr>
						<td>提升温度(℃)：</td>
						<td>
							<input id="raiseTemp" class="easyui-textbox"  style="height:24px;width:200px" data-options="required:true,validType:'length[0,9]'"/>					
						</td>
					</tr>
					
					<!-- <tr>
						<td class="div-label">计算分析：</td>
						<td colspan="3">
							<input class="easyui-textbox"  name="compAnalysis" id="compAnalysis" 
								 style="width:400px; height:100px;" data-options="multiline:true,editable:false,readonly:false"></input> 
						</td>
					</tr> -->
				</table>
			</div>
			<div id="buttons" style="text-align: center;">
				<a href="#" onclick="calculateBtn();" class="easyui-linkbutton c100" >计算</a> 
				<a href="#" onclick="cancelBtn();" class="easyui-linkbutton c100" >取消</a>
			</div>
			<div class="content">
				<table>
					<tr>
						<td style="width:100px;">计算分析：</td>
						<td style="width:250px">
							<input class="easyui-textbox"  name="compAnalysis" id="compAnalysis" 
								 style="width:600px; height:100px;" data-options="multiline:true,editable:false,readonly:false"></input> 
						</td>
					</tr>
				</table>
			</div>
		</div>

<div id="topic-excel" class="x-hidden"></div>
			
<script type="text/javascript">
		webContextRoot="<%=basePath%>";
		consId = "<%=consId%>";
		consName = "<%=consName%>";
		var funcId = "<%=funcId%>";
</script>

<script src="<%=pagePath %>/jquery-easyui-1.5.1/jquery.min.js"></script>
<script src="<%=pagePath %>/jquery-easyui-1.5.1/jquery.easyui.min.js"></script>
<script src="<%=pagePath %>/jquery-easyui-1.5.1/easyui-lang-zh_CN.js"></script>
<script src="<%=pagePath %>/js/common.js"></script>
<script type="text/javascript" src="<%=pagePath%>/js/dateUtil.js"></script>
<script type="text/javascript" src="<%=pagePath %>/echarts/echarts.min.js"></script>
<script type="text/javascript" src="<%=pagePath%>/echarts/echartsGlobal.js"></script>
<script type="text/javascript" src="<%=pagePath%>/js/exportynbg.js"></script>
<script type="text/javascript" src="<%=baseUrl%>/resources/ext-2.2.1/adapter/ext/ext-base.js"></script>
<script type="text/javascript" src="<%=baseUrl%>/resources/ext-2.2.1/ext-all.js"></script>
<script language="javascript" type="text/javascript" src="<%=pagePath%>/My97DatePicker/WdatePicker.js"></script>
<script type="text/javascript" src="boilerEnergy.js"></script>
<script src="<%=pagePath%>/js/templet_common.js"></script>
<script type="text/javascript" src="<%=pagePath%>/js/treeSelect.js"></script>
<script type="text/javascript" src="<%=pagePath%>/js/consSelect2.js"></script>
</body>
</html>
