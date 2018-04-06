<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%

String baseUrl  = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+baseUrl+"/";
String pagePath = baseUrl + "/pages/despages/common";	
String treePagePath = baseUrl + "/pages/areaEnergy/common";	
	
session.setAttribute("itemCode","despower");
session.setAttribute("itemName","用能排名");

	String consId = request.getParameter("consId");//获取调用父页面传过来的参数
	String consName = request.getParameter("consName");//获取调用父页面传过来的参数
	String shownTree = "";//左侧树布局
	String shownRightStyle = "";//左侧树布局
	String funcId = request.getParameter("funcId");//获取调用父页面传过来的参数
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
    <title>用能排名</title>
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
    	<div class="easyui-panel" style="width: 100%;position: relative;" data-options="cls:'fangtian-panel-style',onResize:autoResize">
			<ul class="ulTable">
				<li style="padding-left: 10px;">
					<span id="consNo"  class="tb-group-label">客户编号</span>
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
				<!-- meng_xianling 2017-06-14修改 -->
					<!-- <li style="float:right;padding-right: 10px;">
				 	<a id="bt_exportynbg" href="#" class="easyui-linkbutton c100">用能分析报告</a>
				</li> -->
			</ul>
		</div>
		
		<div id="content-panel" class="auto-resize easyui-panel main-panel noOverflow" style="width: 100%;" data-options="cls:'fangtian-panel-style bottom-padding'">
	    	<div class="easyui-panel show-bottom-border" style="width: 100%;position: relative;" data-options="onResize:autoResize,border:false">
	    		<ul class="s-ul-one" >
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
						
						<span class="tools-labelgroup">
					     	 <select class="easyui-combobox" id="selectDev"  data-options="width:155,panelHeight:'auto'" >
					     	 	<option>全部</option>
					     	 </select>
						</span>
					</li>
					<li class="s-right-one">
					    <a id="search" href="#" class="easyui-linkbutton c100">查询</a>
					</li>
				</ul>
			</div>
			
			<div class="easyui-panel auto-resize" style="width: 100%;position: relative;" data-options="border:false">
				<div id="tabs" class="easyui-tabs" style="width: 100%;height: 100%;" data-options="border:false">
					
					<div id="dynh" title="单元能耗" class="main-panel auto-resize noOverflow" data-options="selected:true,onResize:autoResize">
						<div class="auto-resize easyui-panel" style="width: 100%;" data-options="border:false,onResize:userResize">
						    <div id="yndyChart" class="chart" style="width: 100%;min-height:280px;height:100%;padding: 10px;box-sizing: border-box;"></div>
						</div>
					</div>
					
					<div id="sbnh" title="设备能耗" class="main-panel auto-resize noOverflow" data-options="selected:false,onResize:autoResize">
						<div class="auto-resize easyui-panel" style="width: 100%;" data-options="border:false,onResize:userResize">
						   <div id="ynsbChart" class="chart" style="width: 100%;min-height:280px;height:100%;padding: 10px;box-sizing: border-box;"></div>
						</div>
					</div>
					
				</div>
			</div>
		
		</div>
	</div>
	        
<div id="topic-excel" class="x-hidden"/>
<div id="gridDiv" style="display:none" class="easyui-datagrid" data-options="striped:true,border:false,singleSelect:true,url:'',method:'get'"></div>
<div id="dltj" style="height:500px;display:none;"></div>
<div id="fhqs" style="height:500px;display:none;"></div>
<div id="glyszs" style="height:500px;display:none;"></div>
<div id="dftj" style="height:500px;display:none"></div>
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
	<script type="text/javascript" src="<%=baseUrl%>/resources/ext-2.2.1/adapter/ext/ext-base.js"></script>
	<script type="text/javascript" src="<%=pagePath%>/echarts/echartsGlobal.js"></script>
	<script type="text/javascript" src="<%=pagePath %>/js/exportynbg.js"></script>
	<script language="javascript" type="text/javascript" src="<%=pagePath%>/My97DatePicker/WdatePicker.js"></script>
	<script type="text/javascript" src="<%=pagePath%>/js/treeSelect.js"></script>
	<script type="text/javascript" src="ynpmfx.js"></script>
	<script src="<%=pagePath%>/js/templet_common.js"></script>
    <script type="text/javascript" src="<%=pagePath%>/js/consSelect2.js"></script>
</body>
</html>
