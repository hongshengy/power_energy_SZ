<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
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
					+"    <ul  id=\"treeleftQyTree\" class=\"easyui-tree\" style=\"width:100%;\"  >"
					+"    </ul>"
					+"  </div> "
					+"</div> ";
	}
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN""http://www.w3c.org/TR/HTML4/loose.dtd">
<html>
<head>
<title>费率配置</title>
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


<body class="easyui-layout" >
<script>
    var maskobj = new maskPanelManager();
    maskobj.register();
</script>
<style>
/* .td-label{
float:left;
width:20%;
line-height:24px;
font-size:12px;
color: #232323;
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
}
.td-value{
float:left;
width:30%;
line-height:24px;
font-size:12px;
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
}
.td-label2{
float:left;
width:60%;
line-height:18px;
font-size:12px;
color: #232323;
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
}
.td-value2{
float:left;
width:40%;
line-height:18px;
font-size:12px;
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
} */
.table-label{
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
}
#phaseTable th{
border:1px solid #D9D7D0;
}
#phaseTable td{
border:1px solid #D9D7D0;
}
</style>
 <%=shownTree%>

 <div class="main-panel noOverflow" data-options="region:'center'" >

          <div id="content-panel" class="auto-resize easyui-panel main-panel noOverflow" style="width: 100%;height:100%" data-options="cls:'fangtian-panel-style bottom-padding'">
			 	 
		        <div id="tableToolDiv" style="clear:both;margin-left:10px;display:none;">
					<a href="#" class="easyui-linkbutton" plain="true" style="width: 80px;" id="add" data-options="iconCls:'icon-add'">新增</a>
					<a href="#" class="easyui-linkbutton" plain="true" style="width: 80px;" id="update" data-options="iconCls:'icon-edit'">修改</a>
					<a href="#" class="easyui-linkbutton" plain="true" style="width: 80px;" id="delete" data-options="iconCls:'icon-remove'">删除</a>
				</div>
				<table id="rateConfig_datagrid"></table>
			</div>

 </div>
 
 
	<div id="dialog" class="easyui-dialog" title="费率配置" style="overflow:hidden"
        data-options="minimizable:false,maximizable:false,collapsible:false,resizable:true,modal:true,closed:true">
		<div style="margin:10px;align:center">
			<table style="margin:auto">
				<colgroup>
					<col width="130px;">
					<col width="170px;">
					<col width="130px;">
					<col width="170px;">
				</colgroup>
				<tr>
					<td>费率名称：</td><td><div id="priceTagName" class="easyui-textbox" style="height:24px;width:155px" data-options="required:true,validType:['length[0,30]']"></div></td>
					<td>能源类型：</td><td><div id="energyType" class="easyui-combobox" style="height:24px;width:155px"></div></td>
				</tr>
				<tr>
					<td>费率执行开始时间：</td>
					<td><input id="startTime" class="Wdate" type="text" style="height:20px;width:147px;" readonly="readonly" onClick="WdatePicker({dateFmt:'yyyy-MM-dd',isShowClear:false,readOnly:true})"/></td>
					<td>费率执行结束时间：</td>
					<td><input id="endTime" class="Wdate" type="text" style="height:20px;width:147px;" readonly="readonly" onClick="WdatePicker({dateFmt:'yyyy-MM-dd',isShowClear:true,readOnly:true})"/></td>
				</tr>
				<tr>
					<td>备注:</td><td colspan="3"><div id="remark" class="easyui-textbox" style="height:48px;width:458px" data-options="multiline:true,validType:['length[0,60]']"></div></td>
				</tr>
			</table>
		</div>
		<div style="margin:10px;align:center">
			<div style="height:150px;margin-top:20px;">
				<table id="phaseTable" style="width:100%;margin:auto;border-collapse:collapse;line-height:24px;">
					<tr><!-- <th>费率时段名</th> --><th style="width:40%">费率类型</th><th style="width:30%">价格</th><th style="width:30%">操作</th></tr>
				</table>
			</div>
			<div id="addPhase" style="margin:10px 2px 0px 2px;">
				<!-- 费率时段名: <div id="phaseName" class="easyui-textbox" style="height:24px;width:130px"></div> -->
				费率类型: <div id="phaseType" class="easyui-combobox" style="height:24px;width:170px"></div>
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				价格: <div id="price" class="easyui-textbox" style="height:24px;width:110px" data-options="required:true,validType:['floatNumber']"></div>
				<a id="addPhaseBtn" href="#" class="easyui-linkbutton c100" style="margin-left:36px;">添加</a>
			</div>
		</div>
		<div id="buttons" style="text-align: center;margin-bottom:10px;">
			<a href="#" id="addBtn" class="easyui-linkbutton c100" >保存</a> 
			<a href="#" id="quitBtn" class="easyui-linkbutton c100" >取消</a>
		</div>
	</div>
	<script type="text/javascript">
		webContextRoot="<%=basePath%>";
		 var consId = "<%=consId%>";
		 var consName = "<%=consName%>";
		 var funcId = "<%=funcId%>";
	</script>
	<script type="text/javascript" src="<%=pagePath%>/jquery-easyui-1.5.1/jquery.min.js"></script>
	<script type="text/javascript" src="<%=pagePath%>/jquery-easyui-1.5.1/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="<%=pagePath%>/jquery-easyui-1.5.1/easyui-lang-zh_CN.js"></script>
	<script type="text/javascript" src="<%=pagePath%>/jquery-easyui-1.5.1/datagrid-detailview.js"></script>
	<script type="text/javascript" src="<%=pagePath%>/js/dateUtil.js"></script>
	<script type="text/javascript" src="<%=pagePath%>/js/common.js"></script>
	<script type="text/javascript" src="<%=pagePath%>/My97DatePicker/WdatePicker.js"></script>
	<script type="text/javascript" src="<%=pagePath%>/js/treeSelect.js"></script>
	<script type="text/javascript" src="<%=pagePath%>/js/templet_common.js"></script>
	<script type="text/javascript" src="<%=pagePath%>/js/consSelect2.js"></script>
	<script type="text/javascript" src="rateConfig.js"></script>
</body>
</html>
