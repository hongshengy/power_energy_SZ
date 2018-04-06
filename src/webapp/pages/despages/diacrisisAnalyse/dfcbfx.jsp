<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%

String baseUrl  = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+baseUrl+"/";
String pagePath = baseUrl + "/pages/despages/common";	
String treePagePath = baseUrl + "/pages/areaEnergy/common";

String consId = request.getParameter("consId");//获取调用父页面传过来的参数
String consName = request.getParameter("consName");//获取调用父页面传过来的参数
String funcId = request.getParameter("funcId");//获取调用父页面传过来的参数
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
	
session.setAttribute("itemCode","despower");
session.setAttribute("itemName","电费成本分析");
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
<title>电量电费概况</title>
<link rel="stylesheet"href="<%=pagePath %>/jquery-easyui-1.5.1/themes/fangtian/easyui.css">
<link rel="stylesheet"href="<%=pagePath %>/jquery-easyui-1.5.1/themes/icon.css">
<link rel="stylesheet"href="<%=pagePath %>/jquery-easyui-1.5.1/themes/color.css">
<link rel="stylesheet" href="<%=pagePath %>/css/common.css">
<link rel="stylesheet" href="<%=treePagePath %>/css/tree.css">
<link rel="stylesheet" type="text/css" href="<%=pagePath %>/css/templet_common.css">
<script src="<%=pagePath %>/js/maskJs.js"></script>
</head>

<body class="easyui-layout">
	<script>
	    var maskobj = new maskPanelManager();
	    maskobj.register();
	</script>
<style>

.local-panel{
	/* border: 1px solid #D4D4CA; */
	background-color: #fff;
}

.block2 .col{
   float: left;
   width: 20%;
   box-sizing: border-box;
   -webkit-box-sizing: border-box;
   -moz-box-sizing: border-box;
   padding: 6px 3px;
}

.block2 .col .innerBox{
    background-color: #f7f7f7;
    padding: 10px 20px;
    height: 55px;
    text-align: center;
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
</style>

	<%=shownTree%>
	
	<div class="main-panel noOverflow" data-options="region:'center',border:false" >
		<!-- 区域电量电费概览 by meng_xianling -->
		<div id ="contentId" class="content" style="width: 100%;height: 100%;position:absolute;"></div>
		<div id="clickTree" class="easyui-panel main-panel noOverflow" style="position: relative;width: 100%;height: 100%;" data-options="border:false">
			<div class="easyui-panel" style="width: 100%;position: relative;height: 100px; padding-top: 10px;" data-options="cls:'fangtian-panel-style',onResize:autoResize">
		 		<table class="form-table" style="width:100%;text-align: center;">
					<tbody>
						<tr>
							<td style="text-align: right; padding: 0px;">
								<img alt="上月电量" src="<%=request.getContextPath() %>/images/sydl.png">
							</td>
							<td rowspan="2" class="td-label" style="text-align: left; padding: 0px 0px 0px 5px;">
								<label id="dydl" class="tb-group-label" style="color: #F37781;font-size: 30px;"></label>kWh</td>
							<td style="text-align: right; padding: 0px;">
								<img alt="上月电费" src="<%=request.getContextPath() %>/images/sydf.png">
							</td>
							<td rowspan="2" class="td-label" style="text-align: left; padding: 0px 0px 0px 5px;">
								<label id="dydf" class="tb-group-label" style="color: #65767E;font-size: 30px;"></label>元</td>
							<td style="text-align: right; padding: 0px;">
								<img alt="账户余额" src="<%=request.getContextPath() %>/images/zhye.png">
							</td>
							<td rowspan="2" class="td-label" style="text-align: left; padding: 0px 0px 0px 5px;">
								<label id="zhye" class="tb-group-label" style="color: #3EB3A5;font-size: 30px;"></label>元</td>
						</tr>
						<tr>
							<td style="text-align: right; padding: 0px;"><label>上月电量</label></td>
							<td style="text-align: right; padding: 0px;"><label>上月电费</label></td>
							<td style="text-align: right; padding: 0px;"><label>账户余额</label></td>
						</tr>
					</tbody>
				</table>
		 	</div>
			
			<div id="content-panel" class="auto-resize easyui-panel main-panel noOverflow" style="width: 100%;height:100%;" data-options="cls:'fangtian-panel-style bottom-padding'">
		    	<div class="easyui-panel show-bottom-border" style="width: 100%;position: relative;" data-options="onResize:autoResize,border:false">
					<ul class="s-ul-one" >
						<li style="padding-left: 10px;">
							第一时间：
			                <span class="tools-labelgroup" style="vertical-align:middle;border-style:none;">
							    <a id="button_query" href="javascript:qytQueryOveride('-1');" style="border-style:none;">
	                 				<img alt="前一天" src="<%=request.getContextPath() %>/images/tools-moveleft.gif" style="border-style:none;vertical-align: middle">
	                 			</a>
	                		</span>
	                        <span class="tools-labelgroup" style="vertical-align:middle;">
	                             <input id="dataDate"  class="Wdate" type="text" style="width: 120px; text-align: left;" onClick="WdatePicker({dateFmt:'yyyy',isShowClear:false,readOnly:true})"/>
							</span>
							<span class="tools-labelgroup" style="vertical-align:middle;border-style:none;">
			    				 <a id="button_query" href="javascript:qytQueryOveride('1');" style="border-style:none;">
									<img alt="后一天" src="<%=request.getContextPath() %>/images/tools-moveright.gif" style="border-style:none;vertical-align: middle">
								 </a>
							</span>
						</li>
						<li style="padding-left: 10px;">
							第二时间：
			                <span class="tools-labelgroup" style="vertical-align:middle;border-style:none;">
							    <a id="button_query" href="javascript:qytQueryOverideUp('-1');" style="border-style:none;">
	                 				<img alt="前一天" src="<%=request.getContextPath() %>/images/tools-moveleft.gif" style="border-style:none;vertical-align: middle">
	                 			</a>
	                		</span>
	                        <span class="tools-labelgroup" style="vertical-align:middle;">
	                             <input id="dataDateUp"  class="Wdate" type="text" style="width: 120px; text-align: left;" onClick="WdatePicker({dateFmt:'yyyy',isShowClear:false,readOnly:true})"/>
							</span>
							<span class="tools-labelgroup" style="vertical-align:middle;border-style:none;">
			    				 <a id="button_query" href="javascript:qytQueryOverideUp('1');" style="border-style:none;">
									<img alt="后一天" src="<%=request.getContextPath() %>/images/tools-moveright.gif" style="border-style:none;vertical-align: middle">
								 </a>
							</span>
						</li>
						<li class="s-right-one">
						    <a id="search" href="#" class="easyui-linkbutton c100 shadow">查询</a>
						</li>
					</ul>
				 </div>
				 
				 <div class="main-panel easyui-panel auto-resize" style="width: 100%;position: relative; overflow-x: hidden; " data-options="onResize:autoResize,border:false">
				 	<div class="easyui-panel auto-resize" style="width: 100%;position: relative;overflow:hidden; min-height:280px;" data-options="border:false">
				 		<div id="tabs" class="easyui-tabs" style="width: 100%;height: 100%;" data-options="border:false">
						   <div id="wdjc" title="电量分析" data-options="selected:true,onResize:userResize" style="overflow-x: hidden;">
							   <div id="dlfxChart" class="chart" style="width: 100%;height:100%;padding: 10px;box-sizing: border-box;border-bottom:solid 1px #CCCCCC;"></div>
						   </div>
						   <div id="fzjc" title="电费分析" data-options="selected:false,onResize:userResize" style="overflow-x: hidden;">
							   <div id="dffxChart" class="chart" style="width: 100%;height:100%;padding: 10px;box-sizing: border-box;border-bottom:solid 1px #CCCCCC;"></div>
						   </div>
						</div>
				 	</div>
					
					<div title="负载率" class="local-panel block2 panel-margin-top clearfix" style="height: 90px;border-bottom:solid 1px #CCCCCC;">
						<div class="col col1" style="width: 33%; float: left;">
							<div class="innerBox">
								<p class="label" style="color: #37A09D">
									<!-- 本年电费 -->
									<span id="thisDianfei"></span>
									<span class="num" id="bndf">-</span>
								</p>
								<p class="label" style="color: #37A09D">
									<!-- 本年电量 -->
									<span id="thisDianliang"></span>
									<span class="num" id="bndl">-</span>
								</p>
							</div>
						</div>
						<div class="col col1" style="width: 33%; float: left;">
							<div class="innerBox">
								<p class="label" style="color: orange">
									<!-- 第二时间电费 -->
									<span id="upDianfei"></span>
									<span class="num" id="sydf">-</span>
								</p>
								<p class="label" style="color: orange">
									<span id="upDianliang"></span>
									<span class="num" id="sydl">-</span>
								</p>
							</div>
						</div>
						<div class="col col1" style="width: 33%; float: left;">
							<div class="innerBox">
								<p class="label" style="color: #B763D0;">
									电费环比(%):<span class="num" id="dfhb">-</span>
								</p>
								<p class="label" style="color: #B763D0;">
									电量环比(%):<span class="num" id="dlhb">-</span>
								</p>
							</div>
						</div>
					   </div>
					<div class="easyui-panel" style="width: 100%;min-height: 200px;" data-options="border:false">
						<div id="dataGrid" style="width:100%;height:100%;"></div>
					</div>
				 </div>
				 
			</div>
		</div>
		
	</div>
<div id="topic-excel" class="x-hidden" />

<script src="<%=pagePath %>/jquery-easyui-1.5.1/jquery.min.js"></script>
<script src="<%=pagePath %>/jquery-easyui-1.5.1/jquery.easyui.min.js"></script>
<script src="<%=pagePath %>/jquery-easyui-1.5.1/easyui-lang-zh_CN.js"></script>
<script src="<%=pagePath %>/js/common.js"></script>
<script type="text/javascript" src="<%=pagePath%>/js/dateUtil.js"></script>
<script type="text/javascript" src="<%=pagePath %>/echarts/echarts.min.js"></script>
<script type="text/javascript" src="<%=baseUrl%>/resources/ext-2.2.1/adapter/ext/ext-base.js"></script>
<script type="text/javascript" src="<%=pagePath%>/echarts/echartsGlobal.js"></script>
<script type="text/javascript" src="<%=pagePath %>/js/exportynbg.js"></script>
<script language="javascript" type="text/javascript" src="<%=pagePath%>/My97DatePicker/WdatePicker.js"></script>
<script type="text/javascript" src="dfcbfx.js"></script>
<script type="text/javascript" src="<%=pagePath%>/js/treeSelect.js"></script>
<script type="text/javascript" src="<%=pagePath%>/js/templet_common.js"></script>
<script type="text/javascript" src="<%=pagePath%>/js/consSelect2.js"></script>
<script type="text/javascript">
	webContextRoot="<%=basePath%>";
	consId = "<%=consId%>";
	consName = "<%=consName%>";
	var funcId = "<%=funcId%>";
	$(function(){
		if(consName === ""){
			$("#clickTree").css('display','none');
		}
	});
	
</script>
	
	
	
</body>
</html>
