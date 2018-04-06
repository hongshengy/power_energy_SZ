<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%

String baseUrl = request.getContextPath();
String basePath = request.getScheme() + "://"
		+ request.getServerName() + ":" + request.getServerPort()
		+ baseUrl + "/";
String pagePath = baseUrl + "/pages/despages/common";
String treePagePath = baseUrl + "/pages/areaEnergy/common";

String consId = request.getParameter("consId");//获取调用父页面传过来的参数
String consName = request.getParameter("consName");//获取调用父页面传过来的参数
String funcId = request.getParameter("funcId");//获取调用父页面传过来的参数
//consId="101000004001";
//consName="立霸实业有限公司";
String shownTree = "";//左侧树布局
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
    <title>日电量报表</title>
	<link rel="stylesheet" href="<%=pagePath%>/jquery-easyui-1.5.1/themes/fangtian/easyui.css">
	<link rel="stylesheet" href="<%=pagePath%>/jquery-easyui-1.5.1/themes/icon.css">
	<link rel="stylesheet" href="<%=pagePath%>/jquery-easyui-1.5.1/themes/color.css">
	<link rel="stylesheet" href="<%=pagePath%>/css/common.css">
	<link rel="stylesheet" type="text/css" href="<%=pagePath %>/css/templet_common.css">
	<link rel="stylesheet" href="<%=baseUrl%>/resources/jsepc/css/ext-all.css">
	<link rel="stylesheet" href="<%=treePagePath%>/css/tree.css">
	<script src="<%=pagePath%>/js/maskJs.js"></script>
</head>
  
<body class="easyui-layout">
		<script>
		    var maskobj = new maskPanelManager();
		    maskobj.register();
		</script>
<style type="text/css">
.title1{
font-size:24px;
font-weight:bold;
margin:10px 0px;
}
.title2{
font-size:20px;
margin:10px 0px;
}
.content1{
font-size:18px;
line-height: 24px;
margin:5px 0px 5px 0px;
}
.content1 ol{
margin:0px 0px 0px 0px;
}
.content2{
font-size:12px;
line-height: 24px;
}
.table{
/* border:1px solid #000; */
text-align:center;
width:100%;
border-collapse:collapse;
}
.table td{
border:1px solid #000;
text-align:left;
}
.table th{
border:1px solid #000;
}
p{
text-indent: 36px;
}
.p{
text-indent: 36px;
}
.img{
width:100%;
height:300px;
}
</style>

	
    <%=shownTree%>
    <div class="main-panel noOverflow" data-options="region:'center'" >
   		<div class="easyui-panel" style="width:100%;position: relative;"  data-options="cls:'fangtian-panel-style',onResize:autoResize">
			<ul class="s-ul-one" >
				<li style="position: relative;top:2px;">
					<input id="dateType" class="easyui-combobox"  style="height:24px;width:155px" data-options="editable:false,panelWidth:155">
				</li>
				<li id="dateType_dd" style="display:none;">
				   <span class="tools-labelgroup" style="vertical-align:middle;border-style:none;">
         				<a onclick="" id="left" href="javascript:qytQueryOveride('-1');" style="border-style:none;"> 
         				 	<img alt="前一天" src="<%=request.getContextPath()%>/images/tools-moveleft.gif" height="14px" width="14px" style="border-style:none;vertical-align: middle;">
				 		</a>
            		</span> 
                    <span class="tools-labelgroup" style="vertical-align:middle;">
                         <input type="text" class="Wdate" style="text-align: left;" data-options="width:155,editable:false" id="dataDate" onClick="WdatePicker({dateFmt:'yyyy-MM-dd',onpicked:changeDate,isShowClear:false,readOnly:true})"/>
					</span>
					<span class="tools-labelgroup" style="vertical-align:middle;border-style:none;">
						<a onclick="" id="right" href="javascript:qytQueryOveride('1');" style="border-style:none;"> 
							<img alt="后一天" src="<%=request.getContextPath()%>/images/tools-moveright.gif" height="14px" width="14px" style="border-style:none;vertical-align: middle;">
						</a>
					</span>
				</li>
				<li id="dateType_mm" style="display:none;">
				   <span class="tools-labelgroup" style="vertical-align:middle;border-style:none;">
         				<a onclick="" id="left" href="javascript:qytQueryOverideM('-1');" style="border-style:none;"> 
         				 	<img alt="前一天" src="<%=request.getContextPath()%>/images/tools-moveleft.gif" height="14px" width="14px" style="border-style:none;vertical-align: middle;">
				 		</a>
            		</span> 
                    <span class="tools-labelgroup" style="vertical-align:middle;">
                         <input type="text" class="Wdate" style="text-align: left;" data-options="width:155,editable:false" id="dataDate_month" onClick="WdatePicker({dateFmt:'yyyy-MM',onpicked:changeDate,isShowClear:false,readOnly:true})"/>
					</span>
					<span class="tools-labelgroup" style="vertical-align:middle;border-style:none;">
						<a onclick="" id="right" href="javascript:qytQueryOverideM('1');" style="border-style:none;"> 
							<img alt="后一天" src="<%=request.getContextPath()%>/images/tools-moveright.gif" height="14px" width="14px" style="border-style:none;vertical-align: middle;">
						</a>
					</span>
				</li>
				<li class="s-right-one">
					<span style="vertical-align: bottom;">
				    	<a href="#" class="easyui-linkbutton c100 shadow" onclick="loadData();">查询</a>
				    </span>
					<span style="vertical-align: bottom;">
				    	<a id="export" href="#" class="easyui-linkbutton c100 shadow">导出</a>
				    </span>
				</li>
			</ul>
			<div style="display:none" >
				<div id="gridDiv" style="display:none" class="easyui-datagrid" data-options="striped:true,border:false,singleSelect:true,url:'',method:'get'"></div>
			</div>
		</div>
	
		
			
      <div id="content-panel" class="auto-resize easyui-panel main-panel " style="width: 100%;overflow-x:hidden" data-options="cls:'fangtian-panel-style bottom-padding',onResize:autoResize">
			<div style="width: 100%;position: relative;overflow-x:hidden;border:1px;" data-options="onResize:autoResize">
				<div id="baseInfo_consName" class="title1" style="text-align:center;"></div>
				<div id="baseInfo_date" class="title2" style="text-align:center;"></div>
				<div id="table_div" style="margin:10px;">
				</div>
			</div>
	</div>
</div>

</div>

<div id="topic-excel" class="x-hidden"></div>

<script type="text/javascript">
		var webContextRoot="<%=basePath%>";
		var consId = "<%=consId%>";
		var consName = "<%=consName%>";
		var funcId = "<%=funcId%>";
</script>
<script src="<%=pagePath%>/jquery-easyui-1.5.1/jquery.min.js"></script>
<script src="<%=pagePath%>/jquery-easyui-1.5.1/jquery.easyui.min.js"></script>
<script src="<%=pagePath%>/jquery-easyui-1.5.1/easyui-lang-zh_CN.js"></script>
<script src="<%=pagePath%>/js/common.js"></script>
<script type="text/javascript" src="<%=pagePath%>/js/dateUtil.js"></script>
<script type="text/javascript" src="<%=pagePath%>/echarts/echarts.min.js"></script>
<script type="text/javascript" src="<%=pagePath%>/echarts/echartsGlobal.js"></script>
<script type="text/javascript" src="<%=baseUrl%>/resources/ext-2.2.1/adapter/ext/ext-base.js"></script>
<script type="text/javascript" src="<%=baseUrl%>/resources/ext-2.2.1/ext-all.js"></script>
<script type="text/javascript" src="<%=pagePath%>/js/treeSelect.js"></script>
<script type="text/javascript" src="<%=pagePath%>/js/consSelect2.js"></script>
<script language="javascript" type="text/javascript" src="<%=pagePath%>/My97DatePicker/WdatePicker.js"></script>
<script src="<%=pagePath%>/js/templet_common.js"></script>
<script type="text/javascript" src="dailyEnergyReport.js"></script>
</body>
</html>
