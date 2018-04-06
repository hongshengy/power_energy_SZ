<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="com.frontier.pubmodule.AueicUtil"%>
<%@ page import="com.frontier.framework.model.UserInfo"%>
<%	
	String baseUrl  = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+baseUrl+"/";
	String pagePath = baseUrl + "/pages/despages/common";		
	
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
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN""http://www.w3c.org/TR/HTML4/loose.dtd">
<html>
<head>
<title>生产线班次管理</title>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<%-- <link rel="stylesheet" type="text/css"
	href="<%=basePath%>pages/despages/common/css/style.css"> --%>
<link rel="stylesheet" type="text/css"
	href="<%=pagePath %>/jquery-easyui-1.5.1/themes/fangtian/easyui.css">
<link rel="stylesheet" type="text/css"
	href="<%=pagePath %>/jquery-easyui-1.5.1/themes/icon.css">
<link rel="stylesheet" type="text/css"
	href="<%=pagePath %>/jquery-easyui-1.5.1/themes/color.css">
<link rel="stylesheet" type="text/css"
	href="<%=pagePath %>/css/common.css">
<link rel="stylesheet" type="text/css" href="<%=pagePath %>/css/templet_common.css">
<script src="<%=pagePath %>/js/maskJs.js"></script>
</head>

<style>
#newShiftDialog .content table {
	margin: 30px 60px;
}

.tree-file {
	background: url("../common/images/cons.png") no-repeat;
}

.tree-folder-open {
	background: url("../common/images/tmnl.png") no-repeat;
}
.hidden {
	display: none;
}
</style>
<body class="easyui-layout" >
	<script>
    var maskobj = new maskPanelManager();
    maskobj.register();
</script>

 <%=shownTree%>

 <div class="main-panel noOverflow" data-options="region:'center'" >

          <div id="content-panel" class="auto-resize easyui-panel main-panel noOverflow" style="width: 100%;height:100%" data-options="cls:'fangtian-panel-style bottom-padding'">
			 	 
		        <div id="tableToolDiv" style="clear:both;margin-left:10px;" class="lt">
					<a href="#" class="easyui-linkbutton" plain="true" style="width: 80px;" id="addZhK" data-options="iconCls:'icon-add'">新增</a>
					<a href="#" class="easyui-linkbutton" plain="true" style="width: 80px;" id="updateZhK" data-options="iconCls:'icon-edit'">修改</a>
					<a href="#" class="easyui-linkbutton" plain="true" style="width: 80px;" id="deleteZhK" data-options="iconCls:'icon-remove'">删除</a>
				</div>
				<table id="productionDatagrid"></table>
			</div>

 </div>
 
 
 <div id="newShiftDialog" class="easyui-dialog hidden" closed="true" modal="true" title="">
		<div class="content">
			<table>
				<tr class="hidden"><td><input id="winId" type="text"/></td></tr>
				<tr>
					<td style="width:100px;white-space:nowrap;text-align:right">生产线名称：</td>
					<td style="width:200px"><input id="energyName" class="easyui-combobox"
						data-options="required:true,editable:false,width:200,panelWidth:200"/></td>
				</tr>
				<tr>
					<td style="width:100px;white-space:nowrap;text-align:right">班次：</td>
					<td><input id="workType" class="easyui-combobox"
						data-options="required:true,editable:false,width:200,panelWidth:200"/>				
					</td>
				</tr>
				<tr>
					<td style="width:100px;white-space:nowrap;text-align:right">开始时间：</td>
					<td><input id="startTime" class="easyui-combobox"
						data-options="required:true,editable:false,width:200,panelWidth:200"/>				
					</td>
				</tr>
				<tr>
					<td style="width:100px;white-space:nowrap;text-align:right">结束时间：</td>
					<td>
						<input id="endTime" class="easyui-combobox"
						data-options="required:true,editable:false,width:200,panelWidth:200"/>						
					</td>
				</tr>
				<tr>
					<td style="width:100px;white-space:nowrap;text-align:right">状态：</td>
					<td>
						<input type="radio" name="status" id="status1"/>启用
						<input type="radio" name="status" id="status2"/>停用			
					</td>
				</tr>
				<tr>
					<td style="width:100px;white-space:nowrap;text-align:right">描述：</td>
					<td>
						<input id="memo" class="easyui-textbox" style="height:80px;width:200px" data-options="multiline:true,validType:['length[0,64]']"/>						
					</td>
				</tr>
			</table>
		</div>
		<div id="buttons" style="text-align: center;margin-bottom:30px;">
			<a href="#" id="addBtn" class="easyui-linkbutton c100" >保存</a> 
			<a href="#" id="quitBtn" class="easyui-linkbutton c100" >取消</a>
		</div>
	</div>
<script type="text/javascript">
var basePath = '<%=basePath%>';
webContextRoot="<%=basePath%>";
consId = "<%=consId%>";
consName = "<%=consName%>";
var funcId = "<%=funcId%>";
</script>

<script src="<%=basePath %>pages/despages/common/jquery-easyui-1.5.1/jquery.min.js"></script>
<script src="<%=basePath %>pages/despages/common/jquery-easyui-1.5.1/jquery.easyui.min.js"></script>
<script src="<%=basePath %>pages/despages/common/jquery-easyui-1.5.1/easyui-lang-zh_CN.js"></script>
<script src="<%=basePath %>pages/despages/common/js/common.js"></script>
<script type="text/javascript" src="<%=basePath%>pages/despages/common/js/dateUtil.js"></script>
<script src="<%=basePath%>pages/despages/common/js/templet_common.js"></script>
<script src="<%=basePath%>pages/despages/common/js/treeSelect.js"></script>
<script type="text/javascript" src="<%=pagePath%>/js/consSelect2.js"></script>
<script type="text/javascript" src="<%=basePath %>pages/despages/warn/productionManage.js" ></script> 
</body>
</html>
