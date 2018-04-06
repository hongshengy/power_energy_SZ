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
<title>无功优化记录信息</title>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<link rel="stylesheet" type="text/css"
	href="<%=basePath%>pages/despages/common/css/style.css">  
<link rel="stylesheet" type="text/css" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/fangtian/easyui.css">
<link rel="stylesheet" type="text/css" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/icon.css">
<link rel="stylesheet" type="text/css" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/color.css">
<link rel="stylesheet" type="text/css" href="<%=pagePath %>/css/common.css">
<link rel="stylesheet" type="text/css" href="<%=pagePath %>/css/templet_common.css">
<script src="<%=pagePath %>/js/maskJs.js"></script>
</head>

<style>
#newShiftDialog .content table {
	margin: 30px 30px 30px 30px;
}
.div-search {
float:left;
margin-top:10px;
margin-bottom:10px;
margin-left:10px;
color: #232323;
} 
</style>
	<body  class="easyui-layout" >
		<script>
		    var maskobj = new maskPanelManager();
		    maskobj.register();
		</script>
	
		 <div class="main-panel noOverflow" data-options="region:'center'" >
         
                <div id="divSearch" class="easyui-panel" style="width: 100%;position: relative;" title="查询条件" data-options="cls:'fangtian-panel-style',onResize:autoResize">
                	<ul class="s-ul-one">
                		<li>
                			<span>记录人:</span>
                			<input class="easyui-textbox" style="width:155px;height:24px;" id="searchRecordUser" > 
                		</li>
                		<li>
                			<span>用户变名称:</span>
                			<input class="easyui-textbox" style="width:155px;height:24px;" id="searchSubsName" > 
                		</li>
                		<li>
                			<span>开始时间:</span>
                			<select class="easyui-combobox" id="searchStartTime"  data-options="width:155,height:24" ></select>
                		</li>
                		<li id="selectTime">
                			<span>选择时间：</span>
                			<input id="BNTime" class="easyui-datebox"  data-options="editable:false,width:155,height:24"/>
							<span>~</span>
							<input id="EdTime" class="easyui-datebox"  data-options="editable:false,width:155,height:24"/>
                		</li>   
                		<li>
                			<span>恢复时间:</span>
                			<select class="easyui-combobox" id="searchRecoverTime"  data-options="width:155,height:24" ></select>
                		</li>
                		<li id="selectTimeTwo">
                			<span>选择时间：</span>
                			<input id="RNTime" class="easyui-datebox"  data-options="editable:false,width:155,height:24"/>
							<span>~</span>
							<input id="RDTime" class="easyui-datebox"  data-options="editable:false,width:155,height:24"/>
                		</li>             		
                		<li class="s-right-one">
                			<a id="btn" href="#" class="easyui-linkbutton c100" data-options="onClick:bindGridData">查询</a>
                		</li>
                	</ul>
                	
           </div> 

		    <div id="c-panel" class="auto-resize easyui-panel" style="width: 100%;" data-options="cls:'fangtian-panel-style bottom-padding'">
					<div id="gjcx-datagrid"  border="false"></div>
					<!-- <div style="background-color: red;" class="auto-resize"></div> -->
			</div>   
</div>
	<div id="tableToolDiv" style="clear:both;margin-left:10px;" class="lt">
		<a href="#" class="easyui-linkbutton" plain="true" style="width: 80px;" id="add" data-options="iconCls:'icon-add'">新增</a>
		<a href="#" class="easyui-linkbutton" plain="true" style="width: 80px;" id="update" data-options="iconCls:'icon-edit'">修改</a>
		<a href="#" class="easyui-linkbutton" plain="true" style="width: 80px;" id="delete" data-options="iconCls:'icon-remove'">删除</a>
	</div>
	
	 <div id="newShiftDialog" class="easyui-dialog hidden" closed="true" modal="true" title="">
		<div class="content">
			<table>
				<tr>
					<td>记录人：</td>
					<td colspan="3"><input class="easyui-textbox" id="recordUser" style="width:388px;" 
					data-options="required:true,validType:['chinese','length[0,16]']"></td>
					
				</tr>
				<tr>
				<td><label>客户名称：</label></td>
					<td><select id="consId" class="easyui-combotree" style="width:156px;" data-options="required:true,editable:false,panelWidth:156"></select></td>
					<td><label>用户变名称：</label></td>
					<td><select class="easyui-combobox" id="subsId" data-options="required:true,editable:false,panelWidth:156,width:156" ></select></td> 
				</tr>
				<tr>
					<td>开始时间：</td>
					<td><input id="startTime" class="easyui-datetimebox" type="text" data-options="editable:false,required:true" 
						style="width: 156px;text-align: left;" /></td>
					<td>恢复时间：</td>
					<td><input id="recoverTime" class="easyui-datetimebox" type="text" data-options="editable:false,required:true" 
						style="width: 156px;text-align: left;" /></td>
				</tr>
				<tr>
					<td>内容：</td>
					<td colspan="3">
					<input id="content" class="easyui-textbox" data-options="multiline:true,required:true,validType:['chinese','length[0,64]']" 
					style="width: 388px;height: 84px;"></input>
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
	</script>
	<script type="text/javascript"
		src="<%=pagePath %>/jquery-easyui-1.5.1/jquery.min.js"></script>
	<script type="text/javascript"
		src="<%=pagePath %>/jquery-easyui-1.5.1/jquery.easyui.min.js"></script>
	<script type="text/javascript"
		src="<%=pagePath %>/jquery-easyui-1.5.1/easyui-lang-zh_CN.js"></script>
	<script type="text/javascript" src="<%=pagePath%>/js/dateUtil.js"></script>
	 <script src="<%=pagePath %>/js/common.js"></script>
	<script language="javascript" type="text/javascript"
		src="<%=pagePath%>/My97DatePicker/WdatePicker.js"></script>
		<script src="<%=basePath%>pages/despages/common/js/templet_common.js"></script>
	<script type="text/javascript" src="desWgyhRecord.js"></script>
</body>
</html>
