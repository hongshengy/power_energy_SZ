<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page import="com.frontier.framework.model.UserInfo" %>
<%
String baseUrl  = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+baseUrl+"/";
%>
<!-- 
   @文件名： 
   @作  者：  meng_zijie
   @创建时间：2017/05/02
   @主要内容：
 -->
 
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN""http://www.w3c.org/TR/HTML4/loose.dtd">

<html>
 <head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
 	<meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <meta http-equiv="Pragma" content="no-cache" />
	<meta http-equiv="Cache-Control" content="no-cache" />
	<meta http-equiv="Expires" content="0" />
    <title>预防性试验</title>
    <link rel="stylesheet" href="<%=basePath %>pages/despages/common/jquery-easyui-1.5.1/themes/fangtian/easyui.css">
    <link rel="stylesheet" href="<%=basePath %>pages/despages/common/jquery-easyui-1.5.1/themes/icon.css">
    <link rel="stylesheet" href="<%=basePath %>pages/despages/common/jquery-easyui-1.5.1/themes/color.css">
    <link rel="stylesheet" href="<%=basePath %>pages/despages/common/css/common.css">
    <link rel="stylesheet" type="text/css" href="<%=basePath %>pages/despages/common/css/templet_common.css">
    <script src="<%=basePath %>pages/despages/common/js/maskJs.js"></script>
<style>
/* body{
overflow-x:hidden;
overflow-y:hidden;
height:100%;
}
.div-search {
float:left;
margin-top:10px;
margin-bottom:10px;
margin-left:10px;
color: #232323;
}
.div-label {
float:left;
width:60px;
line-height:24px;
}
#divPanel table td{
height:24px;
color: #232323;
}
.lab{
text-align:left;
margin-left:10px
}
.lab td{
float:left;
margin-left:10px
}
textarea{
	outline:none;
	resize:none;
} */
.hidden {
	display: none;
}
</style>
</head>
  
<!-- <body>
<script>
    var maskobj = new maskPanelManager();
    maskobj.register();
</script>
	<div class="easyui-panel" style="width:100%;" data-options="cls:'fangtian-panel-style'">
		<div class="div-search" style="margin-left:40px">
			试验类型：<input id="testType" class="easyui-textbox"  style="height:24px;width:155px" data-options="panelWidth:155,prompt:'请选择',panelHeight:'auto',editable:false"/>
		</div>
		<div class="div-search" style="margin-left:70px">
			设备：<input id="deviceType" class="easyui-combobox"   style="height:24px;width:155px" data-options="panelWidth:155,prompt:'请选择',panelHeight:'auto',editable:false"/>
		</div>
		<div class="div-search" style="margin-left:70px">
			日期：<input id="searchTime" class="easyui-combobox" style="height:24px;width:155px" data-options="prompt:'请选择',panelHeight:'auto'"/> 
		</div>
		<div id="selectTime" class="div-search hidden" style="margin-left:70px">
			选择时间：
			<input id="startTime" class="easyui-datebox"  style="height:24px;width:155px" data-options="panelWidth:155,editable:false"/>
			<input id="endTime" class="easyui-datebox"  style="height:24px;width:155px;margin-left:70px" data-options="panelWidth:155,editable:false"/>
		</div>
		<div  style="float:right;margin-top:10px;margin-bottom:10px;margin-right:20px;color: #232323;">
			<a href="#" class="easyui-linkbutton c100" style="width: 80px;height: 24px" id="searchPrevent" >查询</a>
		</div>
		<div id="tableToolDiv" style="clear:both;margin-left:10px">
			<a href="#" class="easyui-linkbutton" plain="true" style="width: 80px;" id="addPrevent" data-options="iconCls:'icon-add'">新增</a>
			<a href="#" class="easyui-linkbutton" plain="true" style="width: 80px;" id="updatPrevent" data-options="iconCls:'icon-edit'">修改</a>
			<a href="#" class="easyui-linkbutton" plain="true" style="width: 80px;" id="deletePrevent" data-options="iconCls:'icon-remove'">删除</a>
		</div>
	</div>
	
	
	<div class="easyui-panel" style="width:100%;height:88%" border="false" data-options="cls:'fangtian-panel-style'">
		<table id="preventTestGrid" cellspacing="0"></table>
	</div> -->
<body  class="easyui-layout" >
		<script>
		    var maskobj = new maskPanelManager();
		    maskobj.register();
		</script>
	
		 <div class="main-panel noOverflow" data-options="region:'center'" border="false">
         
                <div id="divSearch" class="easyui-panel" style="width: 100%;position: relative;" title="查询条件" data-options="cls:'fangtian-panel-style',onResize:autoResize">
                	<ul class="s-ul-one">
                		<li>
                			<span>试验类型:</span>
                			<input class="easyui-combobox" style="width:155px;height:24px;" id="testType" data-options="editable:false,panelWidth:155"> 
                		</li>
                		<li>
                			<span>设备:</span>
                			<input class="easyui-combobox" style="width:155px;height:24px;" id="deviceType" data-options="editable:false,panelWidth:155"> 
                		</li>
                		<li>
                			<span>日期:</span>
                			<select class="easyui-combobox" id="searchTime"  data-options="width:155,height:24" data-options="editable:false,panelWidth:155"></select>
                		</li>
                		<li id="selectTime" class="hidden">
                			<span>选择时间：</span>
                			<input id="startTime" class="easyui-datebox"  data-options="editable:false,width:155,height:24"/>
							<span>~</span>
							<input id="endTime" class="easyui-datebox"  data-options="editable:false,width:155,height:24"/>
                		</li>
                		<li class="s-right-one">
                			<a id="btn" href="#" class="easyui-linkbutton c100" data-options="onClick:searchPrevent">查询</a>
                		</li>
                	</ul>
           </div> 

		    <div id="c-panel" class="auto-resize easyui-panel" style="width: 100%;" data-options="cls:'fangtian-panel-style bottom-padding'">
					<div id="preventTestGrid" border="false"></div>
					<!-- <div style="background-color: red;" class="auto-resize"></div> -->
			</div>   
</div>
            <div id="tableToolDiv">
				<a href="#" class="easyui-linkbutton" plain="true" style="width: 80px;" id="addPrevent" data-options="iconCls:'icon-add'">新增</a>
				<a href="#" class="easyui-linkbutton" plain="true" style="width: 80px;" id="updatPrevent" data-options="iconCls:'icon-edit'">修改</a>
				<a href="#" class="easyui-linkbutton" plain="true" style="width: 80px;" id="deletePrevent" data-options="iconCls:'icon-remove'">删除</a>
			</div> 
	
	<div id="divPanel" class="easyui-dialog hidden" closed="true" modal="true" title=""  data-options="minimizable:false,collapsible:false">
		<div style="margin-left:10px;margin-right:10px; margin-top:10px;margin-bottom:10px; " id="radio">
			<table align="center" style="margin-left:20px;margin-right:10px">					
				<tr>
					<input type="text" id="id" class="hidden" />
					<td class="lab"><label>设备:</label></td>
					<td class="lab"><input id="deviceTypew" class="easyui-combobox" type="text" style="height:24px;width:200px" data-options="required:true,editable:false,panelWidth:200"></td>
					<td class="lab"><label>试验类型:</label></td>
					<td class="lab"><input id="testTypew" class="easyui-combobox" type="text" style="height:24px;width:200px" data-options="required:true,editable:false,panelWidth:200"></td>					
				</tr>
				<tr>
					<td class="lab"><label>试验日期:</label></td>
					<td class="lab"><input id="testDate" class="easyui-datebox"  style="height:24px;width:200px" data-options="required:true,editable:false,panelWidth:200"/></td>
				</tr>
				<tr>
					<td class="lab" style="margin-left:20px"><label>试验内容:</label></td>
					<td colspan="3"><input id="testContent" class="easyui-textbox" style="height:100px;width:460px" data-options="required:true,multiline:true,validType:['length[0,10000]']"/></td>
				</tr>
				<tr>
					<td class="lab"><label>试验结论:</label></td>
					<td class="lab"><input id="testResult" class="easyui-combobox" type="text" style="height:24px;width:200px" data-options="required:true"></td>
					<td class="lab" style="margin-left:20px"><label>检查人员:</label></td>
					<td class="lab"><input id="userId" class="easyui-textbox" type="text" style="height:24px;width:200px" data-options="required:true,validType:['length[0,10]']"></td>
				</tr>
				<tr>
					<td class="lab" style="margin-left:20px"><label>试验单位:</label></td>
					<td class="lab"><input id="testGroup" class="easyui-textbox" type="text" style="height:24px;width:200px" data-options="required:true,validType:['length[0,16]']"></td>
					<td class="lab"><label>试验员:</label></td>
					<td class="lab"><input id="testUser" class="easyui-textbox" type="text" style="height:24px;width:200px" data-options="required:true,validType:['length[0,10]']"></td>
				</tr>
				<tr>
					<td class="lab"><label>主管人:</label></td>
					<td class="lab"><input id="testAdmin" class="easyui-textbox" type="text" style="height:24px;width:200px" data-options="required:true,validType:['length[0,10]']"></td>
					<td class="lab" style="margin-left:20px"><label>审核人:</label></td>
					<td class="lab"><input id="testAudit" class="easyui-textbox" type="text" style="height:24px;width:200px" data-options="required:true,validType:['length[0,10]']"></td>		
				</tr>																														
			</table>
			
			<div align="center" style="position: relative;top: 40px;">
				<a id="savePrevent" href="#" class="easyui-linkbutton c100" >保存</a>
				<a id="quitPrevent" href="#" class="easyui-linkbutton c100" >取消</a>
			</div>
       	</div>
	</div>
<script type="text/javascript">
var basePath = '<%=basePath%>';
</script>

<script src="<%=basePath %>pages/despages/common/jquery-easyui-1.5.1/jquery.min.js"></script>
<script src="<%=basePath %>pages/despages/common/jquery-easyui-1.5.1/jquery.easyui.min.js"></script>
<script src="<%=basePath %>pages/despages/common/jquery-easyui-1.5.1/easyui-lang-zh_CN.js"></script>
<script src="<%=basePath %>pages/despages/common/js/common.js"></script>
<script type="text/javascript" src="<%=basePath%>pages/despages/common/js/dateUtil.js"></script>
<script src="<%=basePath%>pages/despages/common/js/templet_common.js"></script>
<script type="text/javascript" src="<%=basePath %>pages/despages/warn/preventExperiment.js" ></script> 
 
</body>
</html>
