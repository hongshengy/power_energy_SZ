<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%

String baseUrl  = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+baseUrl+"/";
String pagePath = baseUrl + "/pages/despages/common";	
String treePagePath = baseUrl + "/pages/areaEnergy/common";	
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
 
session.setAttribute("itemCode","xyxgpg");
session.setAttribute("itemName","响应效果评估");
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
    <title>响应效果评估</title>
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

<div class="main-panel noOverflow" data-options="region:'center'" >	
         <div id="content-panel" class="auto-resize easyui-panel main-panel noOverflow" style="width: 100%;height:100%" data-options="cls:'fangtian-panel-style bottom-padding'">
		 	<div class="easyui-panel show-bottom-border" style="width: 100%;position: relative;" data-options="onResize:autoResize,border:false">
				<ul class="s-ul-one">
					<li>
                        <%-- <span class="tools-labelgroup" >
                			  <a id="left" href="#" style="border-style:none;">
                      		  <img style="border-style:none;vertical-align: middle" height="14px" width="14px"  alt="前一年" src="<%=request.getContextPath() %>/images/tools-moveleft.gif"></a>
               			</span> 
                        <span class="tools-labelgroup" >
                             <input id="startDate" class="Wdate" type="text" style="width: 100px;text-align: left;"  onClick="WdatePicker({dateFmt:'yyyy-MM-dd',isShowClear:false,readOnly:true})"/>
						</span>
						<span class="tools-labelgroup">
							<a id="right" href="#" style="border-style:none;">
							<img style="border-style:none;vertical-align: middle" height="14px" width="14px" alt="后一年" src="<%=request.getContextPath() %>/images/tools-moveright.gif"></a>
						</span> --%>
						<span class="tools-labelgroup">
							<select class="easyui-combobox" id="sbType"  data-options="width:155,panelHeight:'auto'" ></select>
							<!-- <select id="byqQueryType" class="easyui-combobox" name="dept" data-options="prompt:'请选择',height:24,editable:false,width:100,panelWidth:100">   
								<option value="D" selected>日曲线</option>
								<option value="M">月曲线</option>
							</select> -->
						</span>
					</li>
					<li class="s-right-one">
					    <a id="search" href="#" class="easyui-linkbutton c100 shadow" style="width: 80px;height: 24px;">查询</a>
					</li>
				</ul> 
			</div>
			 
			<div id="c-panel" class="auto-resize easyui-panel" style="width: 100%;" data-options="border:false,onResize:userResize">
				<div class="chart" id="userChart" style="width: 100%;height: 100%;padding: 10px;box-sizing: border-box;"></div>
			</div>
			<div class="auto-resize easyui-panel" style="width: 100%;border-top: 1px solid #CCCCCC;" data-options="border:false,onResize:userResize">
				<div id="dataGrid" title="响应效果"></div>
			</div>
	</div>
</div>	 

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
  <script language="javascript" type="text/javascript" src="<%=pagePath%>/My97DatePicker/WdatePicker.js"></script>
  <script type="text/javascript" src="xyxgpg.js"></script>
  <script type="text/javascript" src="<%=pagePath%>/js/treeSelect.js"></script>
  <script type="text/javascript" src="<%=pagePath%>/js/consSelect2.js"></script>
  <script src="<%=pagePath%>/js/templet_common.js"></script>
</body>
</html>
