<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="com.frontier.pubmodule.AueicUtil"%>
<%@ page import="com.frontier.framework.model.UserInfo"%>
<%	
	String baseUrl  = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+baseUrl+"/";
	String pagePath = baseUrl + "/pages/despages/common";		 
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN""http://www.w3c.org/TR/HTML4/loose.dtd">
<html>
<head>
<title>客户用户关联关系</title>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<link rel="stylesheet" type="text/css" href="<%=basePath%>pages/despages/common/css/style.css">
<link rel="stylesheet" type="text/css" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/fangtian/easyui.css">
<link rel="stylesheet" type="text/css" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/icon.css">
<link rel="stylesheet" type="text/css" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/color.css">
<link rel="stylesheet" type="text/css" href="<%=pagePath %>/css/common.css">
<link rel="stylesheet" type="text/css" href="<%=pagePath %>/css/templet_common.css">
<script src="<%=pagePath %>/js/maskJs.js"></script>
</head>
 
 <style>
#newShiftDialog .content table {
	margin: 30px 60px;
}
 
</style>
 
<body class="easyui-layout" >
	<script>
    var maskobj = new maskPanelManager();
    maskobj.register();
</script>

 <div class="main-panel noOverflow" data-options="region:'center'" >

          <div id="content-panel" class="auto-resize easyui-panel main-panel noOverflow" style="width: 100%;height:100%" data-options="cls:'fangtian-panel-style bottom-padding'">
			 	 
		        <div id="tableToolDiv" style="clear:both;margin-left:10px;" class="lt">
					<a href="#" class="easyui-linkbutton" plain="true" style="width: 80px;" id="add" data-options="iconCls:'icon-add'">新增</a>
					<a href="#" class="easyui-linkbutton" plain="true" style="width: 80px;" id="update" data-options="iconCls:'icon-edit'">修改</a>
					<a href="#" class="easyui-linkbutton" plain="true" style="width: 80px;" id="delete" data-options="iconCls:'icon-remove'">删除</a>
				</div>
				<table id="gjcx-datagrid"></table>
			</div>
 </div>
 
 <div id="newShiftDialog" class="easyui-dialog hidden" closed="true" modal="true" title="">
		<div class="content">
			<table>
				<tr>
					<td style="width:80px;">用户名称：</td>
					<td><input id="userCombo" class="easyui-combobox"
						data-options="editable:false,panelHeight:'auto',width:190"/></td>
				</tr>
				<tr>
					<td style="width:80px;">客户：</td>
					<td><input id="consCombo" class="easyui-combobox"
						data-options="panelHeight:'auto',width:190,multiple:true"/>				
					</td>
				</tr>
			</table>
		</div>
		<div id="buttons" style="text-align: center;margin-bottom:30px;">
			<a href="#" id="addBtn" class="easyui-linkbutton c100 shadow">保存</a> 
			<a href="#" id="quitBtn" class="easyui-linkbutton c100 shadow">取消</a>
		</div>
	</div>
	<script type="text/javascript">
		 webContextRoot="<%=basePath%>";
	</script>
	<script type="text/javascript" src="<%=pagePath %>/jquery-easyui-1.5.1/jquery.min.js"></script>
	<script type="text/javascript" src="<%=pagePath %>/jquery-easyui-1.5.1/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="<%=pagePath %>/jquery-easyui-1.5.1/easyui-lang-zh_CN.js"></script>
	<script type="text/javascript" src="<%=pagePath%>/js/dateUtil.js"></script>
	<script language="javascript" type="text/javascript" src="<%=pagePath%>/My97DatePicker/WdatePicker.js"></script>
	<script src="<%=pagePath%>/js/templet_common.js"></script>
	<script type="text/javascript" src="yhkhglgx.js"></script>
</body>
</html>
