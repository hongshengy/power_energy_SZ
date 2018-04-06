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
	
/* 	if(consId==null || consId.equals("")){//左侧树布局 */
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
/* 		shownRightStyle=" <div style=\"position: absolute;top: 60px;left:10px;right:10px;bottom: 10px;\">";
		showDetail = "<div class=\"easyui-panel\" style=\"width:100%;\" data-options=\"cls:'fangtian-panel-style'\">"; 
/* 	}else{
	    shownRightStyle=" <div style=\"position: absolute;top: 60px;left:0px;right:0px;bottom: 0px;\">";
	    showDetail = "<div class=\"easyui-panel\" style=\"width:100%;margin-top:10px;\" >";
	    
	} */
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
	<meta charset="UTF-8">
	<title>客户能效总览配置</title>
	<meta http-equiv="Content-type" content="text/html;charset=UTF-8" />
	<meta http-equiv="X-UA-Compatible" content="chrome=1"/>
	<meta name="apple-mobile-web-app-capable" content="yes"/>
    <link rel="stylesheet" href="<%=basePath%>pages/despages/common/jquery-easyui-1.5.1/themes/fangtian/easyui.css">
    <link rel="stylesheet" href="<%=basePath%>pages/despages/common/jquery-easyui-1.5.1/themes/icon.css">
    <link rel="stylesheet" href="<%=basePath%>pages/despages/common/jquery-easyui-1.5.1/themes/color.css">
    <%-- <link rel="stylesheet" href="<%=basePath%>pages/despages/svgEdit/svgEdit/common.css"> --%>
    <!-- <link rel="stylesheet" href="svgEdit/common.css"> -->
    <link rel="stylesheet" href="<%=basePath%>pages/despages/common/css/common.css">
    <link rel="stylesheet" href="<%=basePath%>pages/areaEnergy/common/css/tree.css" type="text/css"/>
    <link rel="stylesheet" type="text/css" href="<%=basePath%>pages/despages/common/css/templet_common.css">
    <script src="<%=basePath%>/pages/despages/common/js/maskJs.js"></script>   
    <style>
        .toolsbar-panel.center .tbRow{
            width: 630px;
            margin-left: auto;
            margin-right: auto;
        }

        .toolsbar-panel.grid-label{
            border-bottom: none;
        }

        .toolsbar-panel.grid-label .tools-labelgroup{
            margin: 0 20px;
        }

        .toolsbar-panel.grid-label .tools-labelgroup:first-child{
            margin-left: 10px;
        }

        .toolsbar-panel.grid-label label{
            color: #666666;
            font-weight: bold;
        }

        .toolsbar-panel.grid-label .float-block{
            float: right;
            margin-top: -3px;
        }

        .detailview-panel{
            padding: 10px;
            background-color: #F4F4F4;
        }

        .detailview-panel .item-title{
            position: relative;
            padding-bottom: 8px;
            border-bottom: 1px dashed #77776a;
        }

        .detailview-panel .add{
            position: absolute;
            display: inline-block;
            font-size: 14px;
            top: -1px;
            right: 5px;
            color: #999999;
            border-radius: 50%;
            background-color: #E8E8E8;
            padding: 0 2px;
            padding-bottom: 1px;
        }

        .detailview-panel .add:hover{
            cursor: pointer;
            color: #e2eff9;
            font-weight: bold;
            background-color: #20a0ca;
            -webkit-box-shadow: 1px 2px 3px rgba(0,0,0,0.1);
            -moz-box-shadow: 1px 2px 3px rgba(0,0,0,0.1);
            box-shadow: 1px 2px 3px rgba(0,0,0,0.1);
        }

        .yct-list{
            padding: 5px;
        }

        .yct-item-block{
            position: relative;
            display: inline-block;
            border-radius: 3px;
            width: 150px;
            height: 50px;
            margin: 5px;
            border: 1px solid #8c8c7d;
        }

        .yct-item-block.undraw{
            background-color: #ffffff;
            border-color: #ddddc5;
        }

        .yct-item-block.unconfig{
            background-color: #eec832;
            border-color: #cdac2b;
        }

        .yct-item-block.config {
            background-color: #5ce4a7;
            border-color: #54d098;
        }

        .yct-item-block .content {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            padding-top: 26px;
            padding-left: 8px;
            padding-right: 14px;
        }

        .yct-item-block .float-tool-block {
            position: absolute;
            top: 1px;
            right: 4px;
        }

        .float-tool-block .icon-block {
            display: inline-block;
            width: 16px;
            height: 16px;
            margin: 2px 2px;
            opacity: 0.2;
        }

        .float-tool-block .icon-block:hover {
            opacity: 1;
            cursor: pointer;
        }

        .float-tool-block .icon-block.edit {
            background: url("<%=basePath%>/pages/despages/svgEdit/svgEdit/images/icon_edit_16.png") no-repeat;
        }

        .float-tool-block .icon-block.config {
            background: url("<%=basePath%>/pages/despages/svgEdit/svgEdit/images/icon_config_16.png") no-repeat;
        }

        .float-tool-block .icon-block.close {
            background: url("<%=basePath%>/pages/despages/svgEdit/svgEdit/images/icon_close_16.png") no-repeat;
        }

        #dialog1 table {
            width: 300px;;
            margin: 20px auto;
        }

		#Editdialog table {
            width: 300px;;
            margin: 20px auto;
        }
        .filter-value {
            color: #ee4813;
            text-decoration: underline;
            cursor: pointer;
        }

        .search-panel
        {
            border-color: #dfdfdf;
        }

        .search-panel {
            padding: 3px;
            border-bottom-width: 1px;
            border-bottom-style: solid;
        }

        .tree-panel{
            position: absolute;
            /* padding: 5px; */
            top: 65px;
            left: 0;
            right: 0;
            bottom: 0;
            overflow-y: auto;
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
<!-- <div id="divTreeLeft"  class="float-tree-panel hidden">
    <div class="title">
        <span class="title-text">导航</span>
        <span class="collage layout-button-right"></span>
    </div>
    <div class="content">
        <div class="search-panel"><input id="txt_search" style="width:182px;" class="easyui-textbox" data-options="iconCls:'icon-search'"/></div>
        <div class="tree-panel"><ul id="tree1"></ul></div>
    </div>
</div> -->		
<%=shownTree%>		
<!-- <div style="padding-left: 25px;" > -->
<div class="main-panel noOverflow" data-options="region:'center'"  border="false">
<div class="easyui-panel" style="width: 100%;position: relative;" data-options="cls:'fangtian-panel-style',onResize:autoResize">
    <div class="toolsbar-panel center">
        <div class="tbRow">
            <span class="tools-labelgroup">
                <span class="logo"></span>
                <input id="input1"/>
            </span>
            <!--<span class="tools-labelgroup">
                <a id="button1" class="easyui-linkbutton c9 shadow">查询</a>
            </span>-->
        </div>
    </div>
    <div class="toolsbar-panel grid-label">
        <div class="tbRow">
            <span class="tools-labelgroup">
                <label class="tb-group-label">客户总数：</label>
                <span id="ConsNumber"></span>
            </span>
<!--             <span class="tools-labelgroup">
                <label class="tb-group-label">用户变总数：</label>
                <span id="SubsNumber"></span>
            </span>
            <span class="tools-labelgroup">
                <label class="tb-group-label">未绘制用户变总数：</label>
                <span class="filter-value" id="UnSubsNumber"></span>
            </span> -->
            <span class="tools-labelgroup">
                <label class="tb-group-label">未配置能效总览图总数：</label>
                <span class="filter-value" id="UnSvgNumber"></span>
            </span>
            <!--<div class="float-block">
                <input id="input1"/>
            </div>-->
        </div>
    </div>        
</div>
<div id="grid-panel"  class="auto-resize easyui-panel" style="width: 100%;" data-options="cls:'fangtian-panel-style bottom-padding'" border="false">
     <div id="yctgl-girdDetailView"></div>
</div>
</div>
<!-- 新增能效图 -->
<div id="dialog1" style="display: none">
    <div class="content" style="height:150px;">
        <table class="form-table">
            <colgroup>
                <col style="width: 150px;">
                <col style="width: 210px">
            </colgroup>
            <tbody>
            <tr>
                <td class="td-label">客户：</td>
                <td id="consName"></td>
            </tr>
<!--             <tr>
                <td class="td-label">用户变：</td>
                <td id="subsName"></td>
            </tr> -->
<!--             <tr style="display: none">
                <td class="td-label">用户变Id：</td>
                <td id="userTranId"></td>
            </tr> -->
            <input type="text" class="hidden" id="energyUserId"/>
            <tr>
                <td class="td-label">能效总览图名称：</td>
                <td><input id="input-name" class="easyui-textbox" data-options="required:true,validType:['length[0,200]']"></td>
            </tr>
            <tr>
                <td class="td-label">排序：</td>
                <td><input id="input-sort" class="easyui-textbox" data-options="required:true,validType:['length[0,16]']"></td>
            </tr>
            </tbody>
        </table>
    </div>
    <div id="buttons" style="text-align: center;margin-bottom:10px">
        <a href="#" id="insertSvg" class="easyui-linkbutton c9 shadow">保存</a>
        <a href="#" id="quitSvg" class="easyui-linkbutton c9 shadow">取消</a>
    </div>
</div>
<!-- 修改能效图 -->
<div id="Editdialog" style="display: none">
    <div class="content" style="height:150px;">
        <table class="form-table">
            <colgroup>
                <col style="width: 150px;">
                <col style="width: 210px">
            </colgroup>
            <tbody>
           <tr>
                <td class="td-label">客户：</td>
                <td id="cName"></td>
            </tr>
<!--             <tr>
                <td class="td-label">用户变：</td>
                <td id="sName"></td>
            </tr> -->
            <tr style="display: none">
                <td class="td-label">svgId：</td>
                <td id="svgId"></td>
            </tr>
            <tr>
                <td class="td-label">总览图名称：</td>
                <td><input id="svgName" class="easyui-textbox" data-options="required:true,validType:['length[0,200]']"></td>
            </tr>
            <tr>
                <td class="td-label">排序：</td>
                <td><input id="svgOrder" class="easyui-textbox" data-options="required:true,validType:['length[0,16]']"></td>
            </tr>
            </tbody>
        </table>
    </div>
    <div id="buttons1" style="text-align: center;margin-bottom:10px">
        <a href="#" id="editSvg" class="easyui-linkbutton c9 shadow">保存</a>
        <a href="#" id="quiteditSvg" class="easyui-linkbutton c9 shadow">取消</a>
    </div>
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
<script src="<%=basePath%>/pages/despages/svgEdit/svgEdit/common.js"></script>
<script type="text/javascript" src="<%=pagePath%>/js/consSelect2.js"></script>
<script src="<%=basePath%>/pages/despages/svgEdit/energySvgEditManage.js" type="text/javascript"></script> 
</body>
</html>