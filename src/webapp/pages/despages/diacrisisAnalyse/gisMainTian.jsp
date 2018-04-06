<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page import="com.frontier.pubmodule.AueicUtil"%>
<%@ page import="com.frontier.framework.model.UserInfo"%>
<%
	String baseUrl = request.getContextPath();
	String pagePath = baseUrl + "/pages/despages/common";
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ baseUrl + "/";
	UserInfo info = (UserInfo) session.getAttribute("userInfo");
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN""http://www.w3c.org/TR/HTML4/loose.dtd">
<html>
<head>
<meta charset="UTF-8" />
<title>区域中心维护</title>
<link rel="stylesheet" type="text/css"
	href="<%=pagePath%>/jquery-easyui-1.5.1/themes/fangtian/easyui.css">
<link rel="stylesheet" type="text/css"
	href="<%=pagePath%>/jquery-easyui-1.5.1/themes/icon.css">
<link rel="stylesheet" type="text/css"
	href="<%=pagePath%>/jquery-easyui-1.5.1/themes/color.css">
<link rel="stylesheet" type="text/css"
	href="<%=pagePath%>/css/common.css">
<link rel="stylesheet" type="text/css" 
	href="<%=pagePath %>/css/templet_common.css">
<link rel="stylesheet" type="text/css"
	href="<%=pagePath%>/webuploader-0.1.5/webuploader.css">
<script src="<%=pagePath%>/js/maskJs.js"></script>

</head>
<body class="easyui-layout">
	<script>
	    var maskobj = new maskPanelManager();
	    maskobj.register();
	</script>
<style>
.gis-panel {
	height: 100%;
}

.right-panel {
	height: 100%;
	width: 100%;
	background-color: #f4f4f4;
	border-left: 1px solid #e8e8e8;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
	padding: 0 10px;
	overflow: auto;
}

.item-row {
	margin: 10px;
}

.lightImage {
	margin: 0 8px;
	position: relative;
	display: inline-block;
}

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

td {
	padding: 5px 0;
}

.show-line td {
	border-top: 1px dashed #d1d1d1;
}

table {
	border-collapse: collapse;
	width: 100%;
}

#coordinate1 {
	position: absolute;
	top: 200px;
	left: 350px;
}

#coordinate2 {
	position: absolute;
	top: 250px;
	left: 450px;
}

.enterprise-panel {
	position: absolute;
	top: 10px;
	left: 235px;
	width: 250px;
	border: 1px solid #e5e5e5;
	background-color: #f4f4f4;
	box-shadow: 3px 3px 10px #efefef;
}

.enterprise-panel .td-title {
	font-size: 18px;
	color: #2e2e29;
	font-family: "微软雅黑";
	background-color: #f4f4f4;
	border-bottom: 1px dashed #ddddc4;
	padding: 5px;
	text-shadow: 1px 1px 1px #cfcfcf;
}

.enterprise-panel table td {
	padding: 5px 0;
}

.enterprise-head-panel {
	text-align: right;
	padding-top: 1px;
	padding-right: 5px;
}

.enterprise-head-panel .closed {
	position: absolute;
	top: 5px;
	right: 10px;
	font-size: 16px;
	font-weight: bold;
	color: #888;
	cursor: pointer;
}

.enterprise-footer-panel {
	text-align: right;
	padding: 10px;
	border-top: 1px dashed #ddddc4;
}

.enterprise-head-panel .closed:hover {
	color: #333;
}

#gis_panel #left-bottom-panel {
	position: absolute;
	left: 10px;
	bottom: 10px;
}

#gis_panel #left-bottom-panel .img-panel {
	margin: 2px;
	float: left;
	position: relative;
	width: 106px;
	height: 106px;
}

#gis_panel #left-bottom-panel .img-panel .label {
	position: absolute;
	text-align: center;
	bottom: 10px;
	left: 5px;
	right: 5px;
	font-size: 16px;
	color: #FFFFFF;
}

#center-enterprise-panel {
	background-color: #fff;
	width: 400px;
	height: 300px;
	border: none;
	color: #666;
	-webkit-box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.3);
	-moz-box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.3);
	box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.3);
}

#center-enterprise-panel .td-title {
	margin-top: 10px;
	margin-left: -2px;
	margin-right: -2px;
	font-size: 22px;
	padding: 10px 20px;
	background-color: #4FC3F7;
	border-bottom: none;
	color: #fff;
	text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
	-webkit-box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
	-moz-box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
	box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
}

#center-enterprise-panel .closed {
	top: 22px;
	right: 15px;
	font-size: 22px;
	color: #245971;
}

#center-enterprise-panel .closed:hover {
	color: #fff;
}

#center-enterprise-panel .content {
	margin: 15px;
}

#center-enterprise-panel .content .row2 {
	margin: 15px 0;
	padding-top: 10px;
	border-top: 1px solid #dfdfdf;
}

#center-enterprise-panel .row1 .col1 {
	width: 150px;
	height: 100px;
}

#center-enterprise-panel .row1 .col1 img {
	width: 100%;
	height: 100%;
}

#center-enterprise-panel .row1 .col2 {
	width: 220px;
	height: 100px;
	padding: 5px;
}

#center-enterprise-panel .row1 .col2 p {
	margin: 7px 10px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

#center-enterprise-panel .row1 .col2 img,#center-enterprise-panel .row1 .col2 span
	{
	vertical-align: middle;
}

#center-enterprise-panel .row1 .col2 span {
	margin-left: 5px;
}

#center-enterprise-panel .row2 table {
	height: 80px;
	table-layout: fixed;
}

#center-enterprise-panel .row2 table td {
	padding: 0;
	vertical-align: top;
	white-space: normal;
	overflow: hidden;
	text-overflow: ellipsis;
}

#center-enterprise-panel .row2 table td:first-child {
	width: 50px;
	color: #333;
}
</style>
	<div data-options="region:'center', border:false">
		<div id="areaCenterMap" class="gis-panel"></div>
	</div>
	<div data-options="region:'east', width:400, border:false">
		<div class="right-panel">
			<div class="item-row">
				<table class="form-table">
					<colgroup>
						<col style="min-width: 100px;width: 100px;">
						<col style="min-width: 270px;width: 270px;">
					</colgroup>
					<tbody>
						<tr>
							<td>区域名称：</td>
							<td><input id="areaName" class="easyui-textbox-one"
								style="width: 270px" data-options="required:true,validType:'length[0,128]'"></td>
						</tr>
						<tr>
							<td>服务范围：</td>
							<td><input id="serviceRange" class="easyui-textbox-one" data-options="validType:'length[0,16]'"></td>
						</tr>
						<tr>
							<td>中心点经纬度：</td>
							<td><span style="margin: 0px 5px ;">经度:</span><input
								id="lng" class="easyui-textbox-two" data-options="validType:'length[0,19]'"><span
								style="margin: 0px 5px ;">纬度:</span><input id="lat"
								class="easyui-textbox-two" data-options="validType:'length[0,19]'"></td>
						</tr>
						<tr>
							<td>地址：</td>
							<td><input id="address" class="easyui-textbox-one" data-options="validType:'length[0,128]'"></td>
						</tr>
						<tr>
							<td>电话：</td>
							<td><input id="telephone" class="easyui-textbox-one" data-options="validType:'length[0,13]'"></td>
						</tr>
						<tr>
							<td>传真：</td>
							<td><input id="fax" class="easyui-textbox-one" data-options="validType:'length[0,10]'"></td>
						</tr>
						<tr>
							<td>
								<div style="height: 100px;">区域中心简介：</div>
							</td>
							<td><input id="areaMemo" class="easyui-textbox-three" data-options="validType:'length[0,512]'"></td>
						</tr>
						<tr>
							<td>
								<div style="height: 70px;">区域图片：</div>
							</td>

							<td class="td-value">
								<div>
									<span id="thelist"></span>
									<span id="filePicker">
										<a href="#" class="easyui-linkbutton shadow" data-options="iconCls:'icon-large-picture',size:'large',iconAlign:'top',plain:true"
			                                    id="butA" style="width: 60px; height: 60px; vertical-align: 0;">添加照片</a>
			                        </span>
								</div> 
							</td>
						</tr>
						<tr id="modifyBtn">
							<td colspan="2" style="text-align: center;"><a
								id="modifyRealBtn" class="easyui-linkbutton c9 shadow"
								onclick="modifyTmnlInfo(false);">&nbsp;&nbsp;编辑/保存&nbsp;&nbsp;</a>
							</td>
						</tr>
						<tr id="saveBtn">
							<td colspan="2" style="text-align: center;"><a
								class="easyui-linkbutton c9 shadow" id="doEdit" >&nbsp;&nbsp;保存&nbsp;&nbsp;</a>
								<a class="easyui-linkbutton c9 shadow"
								onclick="cancleModofy();">&nbsp;&nbsp;取消&nbsp;&nbsp;</a></td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>

	<input type="hidden" id="areaNo" />
	<input type="hidden" id="logoA" />
	<script type="text/javascript">
		var webContextRoot="<%=basePath%>";
		var baseUrl = "<%=baseUrl%>";
		var jsPath = "<%=pagePath%>";
	</script>
	<script type="text/javascript"
		src="<%=pagePath%>/jquery-easyui-1.5.1/jquery.min.js"></script>
	<script type="text/javascript"
		src="<%=pagePath%>/jquery-easyui-1.5.1/jquery.easyui.min.js"></script>
	<script type="text/javascript"
		src="<%=pagePath%>/jquery-easyui-1.5.1/easyui-lang-zh_CN.js"></script>
	<script type="text/javascript"
		src="<%=pagePath%>/jquery-easyui-1.5.1/datagrid-detailview.js"></script>
	<script type="text/javascript" src="<%=pagePath%>/js/common.js"></script>
	<script type="text/javascript"
		src="<%=pagePath%>/js/jquery.vticker-min.js"></script>
	<script type="text/javascript" src="<%=pagePath%>/js/dateUtil.js"></script>
	<script type="text/javascript"
		src="<%=pagePath%>/ocupload/jquery.ocupload-1.1.2.js"></script>
	<script type="text/javascript" src="<%=pagePath%>/js/map.js"></script>
	<script type="text/javascript"
		src="<%=baseUrl%>/pages/despages/diacrisisAnalyse/gisMainTian.js"></script>
	<script type="text/javascript"
		src="http://api.map.baidu.com/api?v=2.0&ak=CWy7fv2qnIgddvauxx3l2q8p1rSdWKFC"></script>
	<script src="<%=pagePath%>/webuploader-0.1.5/webuploader.min.js"></script>
</body>

</html>