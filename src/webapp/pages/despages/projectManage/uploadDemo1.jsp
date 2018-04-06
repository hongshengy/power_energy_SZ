<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String baseUrl = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ baseUrl + "/";
	String pagePath = baseUrl + "/pages/despages/common";
	String treePagePath = baseUrl + "/pages/areaEnergy/common";

	
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
<title>上传</title>
<link rel="stylesheet" type="text/css" href="<%=pagePath %>/lightbox/dist/css/lightbox.min.css">
<link rel="stylesheet" href="<%=pagePath%>/jquery-easyui-1.5.1/themes/fangtian/easyui.css">
<link rel="stylesheet" href="<%=pagePath%>/jquery-easyui-1.5.1/themes/icon.css">
<link rel="stylesheet" href="<%=pagePath%>/jquery-easyui-1.5.1/themes/color.css">
<link rel="stylesheet" href="<%=pagePath%>/css/common.css">
<link rel="stylesheet" type="text/css" href="<%=pagePath %>/css/templet_common.css">
<link rel="stylesheet" href="<%=treePagePath%>/css/tree.css">
<link rel="stylesheet" href="<%=pagePath%>/webuploader-0.1.5/webuploader.css">
<script src="<%=pagePath%>/js/maskJs.js"></script>
<style type="text/css">
.deleteIcon{
    position: relative;
   /*  right: -8px; */
    top : -52px;
    left : -8px;
    width: 20px;
    height: 20px;
    background-color: #fd513a;
    color: #fff;
    border-radius: 2px;
    display: inline-block;
    text-align: center;
    font-size: 14px;
    cursor: pointer;
}
.deleteIcon:hover{
    background-color: #ee160d;
}
.noUpload{
	cursor: pointer;
	width:10px;
	height:10px;
}
</style>
</head>

<body class="easyui-layout">
	<script>
	    var maskobj = new maskPanelManager();
	    maskobj.register();
	</script>
	<div class="main-panel noOverflow"  data-options="region:'center',border:false">
		
		<div id="content-panel" class="auto-resize easyui-panel main-panel" style="width: 100%;overflow-x:hidden;" data-options="cls:'fangtian-panel-style bottom-padding'">
			<div class="easyui-panel"
				style="width: 100%;position: relative;padding:20px 100px;"
				data-options="border:false">
				<span>
					<div>
						<span id="thelist"></span>
						<span id="filePicker">
							<a href="#" class="easyui-linkbutton shadow" data-options="iconCls:'icon-large-picture',size:'large',iconAlign:'top',plain:true"
                                    id="butA" style="width: 60px; height: 60px; vertical-align: 0;">添加照片</a>
                        </span>
						<div>
							<button id="ctlBtn">开始上传</button>
						</div>
					</div> 
				</span>
			</div>
		</div>
	</div>

<script type="text/javascript">
	webContextRoot="<%=basePath%>";
</script>

<%-- <script src="<%=pagePath%>/lightbox/dist/js/lightbox.min.js"></script> --%>
<script src="<%=pagePath%>/jquery-easyui-1.5.1/jquery.min.js"></script>
<script src="<%=pagePath%>/jquery-easyui-1.5.1/jquery.easyui.min.js"></script>
<script src="<%=pagePath%>/jquery-easyui-1.5.1/easyui-lang-zh_CN.js"></script>
<script src="<%=pagePath%>/js/common.js"></script>
<script type="text/javascript" src="<%=pagePath%>/js/dateUtil.js"></script>
<script type="text/javascript" src="<%=pagePath%>/echarts/echarts.min.js"></script>
<script type="text/javascript" src="<%=pagePath%>/echarts/echartsGlobal.js"></script>
<script type="text/javascript" src="<%=pagePath%>/js/treeSelect.js"></script>
<script language="javascript" type="text/javascript" src="<%=pagePath%>/My97DatePicker/WdatePicker.js"></script>
<script src="<%=pagePath%>/js/templet_common.js"></script>
<script src="<%=pagePath%>/webuploader-0.1.5/webuploader.min.js"></script>
<script type="text/javascript" src="uploadDemo1.js"></script>
</body>
</html>
