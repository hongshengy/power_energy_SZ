<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"+ request.getServerName() + ":" + request.getServerPort()+ path+"/";
	String pagePath = basePath + "/pages/despages/common";
	String shownTree = "";//左侧树布局
	String shownRightStyle = "";//左侧树布局
	String showDetail ="";//右侧客户详情信息
	String consId = request.getParameter("consId");//获取调用父页面传过来的参数
	String consName = request.getParameter("consName");//获取调用父页面传过来的参数
	String funcId = request.getParameter("funcId");//获取调用父页面传过来的参数
	
	shownTree =  "<div id=\"westTree\" data-options=\"region:'west',disabled:true,split:true,border:false\" style=\"width:220px;\">"
				+"  <div style=\"padding: 3px; border-bottom: 1px solid #e7e7e7; background-color: #f2f2f2\">"
				+"    <input id=\"CobConsSelect\" class=\"easyui-textbox\" style=\"width: 98%;\" data-options=\"iconCls:'icon-search'\">"
				+"    <div style=\"position: absolute;top:38px;width:218px;\">"
				+"      <input id=\"consSelect\" class=\"easyui-textbox\" style=\"width: 98%;\" data-options=\"iconCls:'icon-search',prompt:'请输入客户名称'\">"
				+"    </div>"
				+"  </div>"
		 		+"  <div style=\"overflow: auto;top:70px;width:218px;bottom:0px;position: absolute;\">"
				+"    <ul  id=\"tree1\" class=\"easyui-tree\" style=\"width:100%;\"  >"
				+"    </ul>"
				+"  </div> "
				+"</div> ";
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
	<meta charset="UTF-8">
	<title>用能单元总览</title>
	<meta http-equiv="Content-type" content="text/html;charset=UTF-8" />
	<meta http-equiv="X-UA-Compatible" content="chrome=1"/>
	<meta name="apple-mobile-web-app-capable" content="yes"/>
    <link rel="stylesheet" href="<%=basePath%>pages/despages/common/jquery-easyui-1.5.1/themes/fangtian/easyui.css">
    <link rel="stylesheet" href="<%=basePath%>pages/despages/common/jquery-easyui-1.5.1/themes/icon.css">
    <link rel="stylesheet" href="<%=basePath%>pages/despages/common/jquery-easyui-1.5.1/themes/color.css">
    <link rel="stylesheet" href="<%=basePath%>pages/despages/common/css/common.css">
    <link rel="stylesheet" href="<%=basePath%>pages/areaEnergy/common/css/tree.css" type="text/css"/>
    <link rel="stylesheet" type="text/css" href="<%=basePath%>pages/despages/common/css/templet_common.css">
    <script src="<%=basePath%>/pages/despages/common/js/maskJs.js"></script>   
    <style>
        .toolsbar-panel.center .tbRow {
            width: 630px;
            margin-left: auto;
            margin-right: auto;
        }

        .search-panel {
            border-color: #dfdfdf;
        }

        .search-panel {
            padding: 3px;
            border-bottom-width: 1px;
            border-bottom-style: solid;
        }

		.filter-value {
            color: #ee4813;
            text-decoration: underline;
            cursor: pointer;
        }
		
        .logo {
            display: inline-block;
            margin-right: 10px;
            min-width: 50px;
            min-height: 50px;
            background: url("<%=basePath%>/pages/despages/svgEdit/svgEdit/images/loginLogo.png"); 
            -webkit-background-size: cover;
            background-size: cover;           
        }

        .toolsbar-panel.center .tools-labelgroup .logo,
        .toolsbar-panel.center .tools-labelgroup input {
            vertical-align: bottom;
        }
        .hidden {
        	display: none;
        }
        .consListTable td{
			padding: 0px;
			font-size: 12px;
			margin: auto 0px;
		}
		.active{
			font-size: 12px;
		}
    </style>
</head>
<body id="body" class="easyui-layout" >
<script>
	var maskobj = new maskPanelManager();
	maskobj.register();
</script>

	<div class="main-panel noOverflow" data-options="region:'center'"  border="false">
		<div class="easyui-panel" style="width: 100%;position: relative;" data-options="cls:'fangtian-panel-style',onResize:autoResize">
		    <!-- 搜索框 begin -->
		    <div class="toolsbar-panel center">
		        <div class="tbRow">
		            <span class="tools-labelgroup">
		                <span class="logo"></span>
		                <input id="search"/>
		            </span>
		        </div>
		    </div>
		    <!-- 搜索框 end -->
		    <!-- 客户总数 begin -->
		    <div class="toolsbar-panel grid-label">
		        <div class="tbRow">
		            <span id="consLabel" class="tools-labelgroup">
		                <label class="tb-group-label">客户总数：</label>
		                <span id="consNumber"></span>
		            </span>
		            <span id="energyLabel" class="tools-labelgroup">
		                <label class="tb-group-label">已配置用能单元户数：</label>
		                <span id="energyNumber"></span>
		                <!-- <a class="filter-value" id="energyNumber" onclick="loadData('');"></a> -->
		            </span>
		            <span id="productLabel" class="tools-labelgroup">
		                <label class="tb-group-label">生产线：</label>
		                <!-- <span class="filter-value" id="productNumber"></span> -->
		                <a class="filter-value" id="productNumber" onclick="reloadData('1');"></a>
		            </span>
		            <span id="condLabel" class="tools-labelgroup">
		                <label class="tb-group-label">空调系统：</label>
		                <!-- <span class="filter-value" id="condNumber"></span> -->
		                <a class="filter-value" id="condNumber" onClick="reloadData('2');"></a>
		            </span>
		            <span id="elecLabel" class="tools-labelgroup">
		                <label class="tb-group-label">电机系统：</label>
		                <!-- <span class="filter-value" id="elecNumber"></span> -->
		                <a class="filter-value" id="elecNumber" onClick="reloadData('3');"></a>
		            </span>
		            <span id="boilerLabel" class="tools-labelgroup">
		                <label class="tb-group-label">锅炉系统：</label>
		                <!-- <span class="filter-value" id="boilerNumber"></span> -->
		                <a class="filter-value" id="boilerNumber" onClick="reloadData('4');"></a>
		            </span>
		        </div>
		    </div>
		    <!-- 客户总数 end -->        
		</div>
		
		<!-- 表格 begin -->
		<div id="c-panel" class="auto-resize easyui-panel" style="width: 100%;" data-options="cls:'fangtian-panel-style bottom-padding'">
	       <div id="productData" title="用能单元总览"></div>
	    </div> 
		<!-- 表格 end -->
	</div>
	<script type="text/javascript">
		var basePath = '<%=basePath%>';
		webContextRoot="<%=basePath%>";
		var consId = "<%=consId%>";
		var consName = "<%=consName%>";
		var funcId = "<%=funcId%>";
	</script>
	<script type="text/javascript" src="<%=basePath%>/pages/despages/svgEdit/svgEdit/jquery.js"></script>
	<script src="<%=basePath%>/pages/despages/common/jquery-easyui-1.5.1/jquery.min.js"></script>
	<script src="<%=basePath%>/pages/despages/common/jquery-easyui-1.5.1/jquery.easyui.min.js"></script>
	<script src="<%=basePath%>/pages/despages/common/jquery-easyui-1.5.1/locale/easyui-lang-zh_CN.js"></script>
	<script src="<%=basePath%>/pages/despages/common/jquery-easyui-1.5.1/extension/datagrid-detailview/datagrid-detailview.js"></script>
	<script src="<%=basePath%>/pages/despages/common/js/templet_common.js"></script>
	<script type="text/javascript" src="<%=pagePath%>/js/consSelect2.js"></script>
	<script src="<%=basePath%>/pages/despages/warn/productLinePandect.js" type="text/javascript"></script> <%-- 
	<script src="<%=basePath%>/pages/despages/svgEdit/energySvgEditManage.js" type="text/javascript"></script>  --%>
</body>
</html>