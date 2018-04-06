<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%

String baseUrl  = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+baseUrl+"/";
String pagePath = baseUrl + "/pages/despages/common";	
String treePagePath = baseUrl + "/pages/areaEnergy/common";	
	
/* session.setAttribute("itemCode","despower");
session.setAttribute("itemName","功率因数"); */
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
    <title>项目管理-效果验证</title>
    <link rel="stylesheet" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/fangtian/easyui.css">
    <link rel="stylesheet" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/icon.css">
    <link rel="stylesheet" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/color.css">
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
	<%=shownTree%>
	<div class="main-panel noOverflow" data-options="region:'center',border:false" >
		<div id="content-panel" class="auto-resize easyui-panel main-panel noOverflow" style="width: 100%;height:100%;" data-options="cls:'fangtian-panel-style bottom-padding'">
	    	<div class="easyui-panel show-bottom-border" style="width: 100%;position: relative;" data-options="onResize:autoResize,border:false">
				<ul class="s-ul-one" >
					<li>
					    <span class="tools-labelgroup">
					    	<input id="prjName" class="easyui-combobox"  style="height:24px;width:155px" data-options="editable:false,panelWidth:155,panelMaxHeight:220">
					    </span>
					</li>
					<li>
					    <span class="tools-labelgroup">
					    	<input id="timeType" class="easyui-combobox"  style="height:24px;width:155px" data-options="editable:false,panelWidth:155">
					    </span>
					</li>
					<li class="s-right-one">
					    <a href="#" class="easyui-linkbutton c100 shadow" onclick="bt_search();">查询</a>
					</li>
				</ul>
			</div>
				
			<div class="easyui-panel auto-resize" style="width: 100%;position: relative;" data-options="border:false,onResize:userResize">
    			<!-- <div id="tabs" class="easyui-tabs" style="width:100%;height:100%;" data-options="border:false">   
					<div title="电量" data-options="selected:true,onResize:userResize">-->
						<div id="dlChart"  class="chart" style="width: 100%;height:100%;padding: 10px;box-sizing: border-box;"></div>
					<!-- </div> -->
					<!-- <div title="负荷" style="padding:20px;">
						<div id="fhChart"  style="width:100%;height:95%;"></div>
					</div>
					<div title="电费" style="padding:20px;">
						<div id="dfChart"  style="width:100%;height:95%;"></div>
					</div> -->
				<!-- </div> -->
	       	</div>
	    </div>
	</div>

<script type="text/javascript">
		webContextRoot="<%=basePath%>";
		consId = "<%=consId%>";
		consName = "<%=consName%>";
		funcId = "<%=funcId%>";
</script>
<script src="<%=pagePath %>/jquery-easyui-1.5.1/jquery.min.js"></script>
<script src="<%=pagePath %>/jquery-easyui-1.5.1/jquery.easyui.min.js"></script>
<script src="<%=pagePath %>/jquery-easyui-1.5.1/easyui-lang-zh_CN.js"></script>
<script src="<%=pagePath %>/js/common.js"></script>
<script type="text/javascript" src="<%=pagePath%>/js/dateUtil.js"></script>
<script type="text/javascript" src="<%=pagePath %>/echarts/echarts.min.js"></script>
<script type="text/javascript" src="<%=pagePath%>/echarts/echartsGlobal.js"></script>
<script src="<%=pagePath%>/js/templet_common.js"></script>
<%-- <script language="javascript" type="text/javascript" src="<%=pagePath%>/My97DatePicker/WdatePicker.js"></script> --%>
<script type="text/javascript" src="<%=pagePath%>/pinyinjs-master/pinyin_dict_firstletter.js"></script>
<script type="text/javascript" src="<%=pagePath%>/pinyinjs-master/pinyinUtil.js"></script>
<%-- <script type="text/javascript" src="<%=pagePath%>/js/consSelect.js"></script> --%>
<script type="text/javascript" src="effectValidation.js"></script>
<script type="text/javascript" src="<%=pagePath%>/js/treeSelect.js"></script>
<script type="text/javascript" src="<%=pagePath%>/js/consSelect2.js"></script>
 
</body>
</html>
