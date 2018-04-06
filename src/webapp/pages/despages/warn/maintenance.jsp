<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page import="com.frontier.framework.model.UserInfo" %>
<%
String baseUrl  = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+baseUrl+"/";
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
    <title>主站启动页面维护页面</title>
    <link rel="stylesheet" href="<%=basePath %>pages/despages/common/jquery-easyui-1.5.1/themes/fangtian/easyui.css">
    <link rel="stylesheet" href="<%=basePath %>pages/despages/common/jquery-easyui-1.5.1/themes/icon.css">
    <link rel="stylesheet" href="<%=basePath %>pages/despages/common/jquery-easyui-1.5.1/themes/color.css">
    <link rel="stylesheet" href="<%=basePath %>pages/despages/common/css/common.css">
    <link rel="stylesheet" type="text/css" href="<%=basePath %>pages/despages/common/css/templet_common.css">
    <link rel="stylesheet" href="<%=basePath %>pages/despages/common/webuploader-0.1.5/webuploader.css">
    <link rel="stylesheet" type="text/css" href="<%=basePath %>pages/despages/common/css/templet_common.css">
    <script src="<%=basePath %>pages/despages/common/js/maskJs.js"></script>
<style>

.hidden {
	display: none;
}
.noUploadPone{
cursor: pointer;
width:10px;
height:10px;
}
.noUploadPone{
cursor: pointer;
width:10px;
height:10px;
}
</style>
</head>
<body  class="easyui-layout" >
		<script>
		    var maskobj = new maskPanelManager();
		    maskobj.register();
		</script>
	<div id="tabs" class="easyui-tabs" data-options="border:false,onSelect:userTabsSelect" style="width:100%;height:100%">
    	<div id="zhuzhan" title="移动端启动图片维护" data-options="selected:true" style="width:100%;height:100%">
			<div class="main-panel noOverflow" data-options="region:'center'" border="false" style="width:100%;height:100%">	       
				<div id="divSearch" class="easyui-panel" style="width: 100%;height:44px;position: relative;" data-options="cls:'fangtian-panel-style',onResize:autoResize">
					<table style="width:100%">
						<tr>
							<td style="vertical-align:center;width:100px">
								<span style="float:left;margin-left:20px;margin-top:4px;font-size:16px">图片上传：</span>
							</td>
							<td style="width:300px">
								<div style="float:left;margin-left:20px;width:300px;font-size:18px;height:24px;border:1px solid #cccccc" id="picture_file">
								</div>
							</td>
							<td>
								<a href="#" style="float:left;margin-left:20px;font-size:24px" class="easyui-linkbutton shadow bt_upload" id="pictureUpload">选择图片</a>
								<div>
									<a href="#" id="ctlBtn" class="easyui-linkbutton c100 shadow" style="float:left;margin-left:20px;font-size:16px">开始上传</a>
								</div>
								<span style="float:left;margin-left:20px;margin-top:4px;color:red;font-size:16px">分辨率：720*1280，SIZE小于1MB</span>
							</td>				
						</tr>
							
					</table>			
				</div> 
			
				<div id="c-panel" class="auto-resize easyui-panel" style="width: 100%;" data-options="cls:'fangtian-panel-style bottom-padding'">
						<img id="imgUpload" style="margin-left:40%;margin-top:20px;width:400px;height:600px">
				</div>
				  
			</div>
		</div>
		<div id="shouji" title="移动端版本管理" style="width:100%;height:100%">
			<div class="main-panel noOverflow" data-options="region:'center'" border="false" style="width:100%;height:100%">	       
<!-- 				<div id="divSearch" class="easyui-panel" style="width: 100%;height:84px;position: relative;" data-options="cls:'fangtian-panel-style',onResize:autoResize">
					<table style="width:100%">
 						<tr>
							<td style="vertical-align:center;padding-top:5px">
								<div style="float:left;">
									<a href="#" id="newAdd" class="easyui-linkbutton c100" style="margin-left:20px;">新增</a>
								</div>
								<div style="float:left;">
									<a href="#" id="newUpdate" class="easyui-linkbutton c100" style="margin-left:20px;">修改</a>
								</div>
								<div style="float:left;">
									<a href="#" id="newDelete" class="easyui-linkbutton c100" style="margin-left:20px;">删除</a>
								</div>
								<div style="float:left;">
									<a href="#" id="newSearch" class="easyui-linkbutton c100" style="margin-left:20px;">查询</a>
								</div>
							</td>				
						</tr>
						<tr>
							<td style="padding-top:5px">
								<div style="float:left;margin-left:20px;">
									软件名称：<input class="easyui-textbox" style="width:155px;" id="searchVersionName"data-options="validType:['chinese','length[0,16]']"/>
								</div>
								<div style="float:left;margin-left:20px;">
									软件版本：<input class="easyui-textbox" style="width:155px;" id="searchVersionNum"data-options="validType:['chinese','length[0,16]']" />
								</div>
							</td>	
						</tr>													
					</table>			
				</div>  -->
				<div id="divSearch" class="easyui-panel" style="width: 100%;position: relative;" title="查询条件" data-options="cls:'fangtian-panel-style',onResize:autoResize">
                	<ul class="s-ul-one">
                		<li>
                			<span>软件名称：</span>
                			<input class="easyui-textbox" style="width:155px;height:24px;" id="searchVersionName" > 
                		</li>
                		<li>
                			<span>软件版本：</span>
                			<input class="easyui-textbox" style="width:155px;height:24px;" id="searchVersionNum" > 
                		</li>
                		<li class="s-right-one">
                			<a id="newSearch" href="#" class="easyui-linkbutton c100">查询</a>
                		</li>
                	</ul>
           		</div> 
				<div id="p-panel" class="auto-resize easyui-panel" style="width: 100%;" data-options="cls:'fangtian-panel-style bottom-padding'">
					<div id="phoneDatagrid"  border="false"></div>
				</div>
				  
			</div>
		</div>
	</div>	
	<div id="tableToolDiv" style="clear:both;margin-left:10px">
		<a href="#" class="easyui-linkbutton" plain="true" style="width: 80px;" id="newAdd" data-options="iconCls:'icon-add'">新增</a>
		<a href="#" class="easyui-linkbutton" plain="true" style="width: 80px;" id="newUpdate" data-options="iconCls:'icon-edit'">修改</a>
		<a href="#" class="easyui-linkbutton" plain="true" style="width: 80px;" id="newDelete" data-options="iconCls:'icon-remove'">删除</a>
	</div> 
<!-- 弹出框 -->
	<div id="divPanel" class="easyui-dialog" closed="true" modal="true" title="" display: none" data-options="minimizable:false,collapsible:false">
		<div style="margin-left:10px;margin-right:10px; margin-top:10px;margin-bottom:10px; " id="radio">
			<table align="center" style="margin-left:20px;margin-right:10px">					
				<tr>
					<input type="text" id="verId" class="hidden" />					
				</tr>
				<tr>
					<td class="lab"><label>软件名称</label></td>
					<td class="lab"><input id="versionName" class="easyui-textbox" style="height:24px;width:200px" data-options="required:true,validType:['length[0,30]']"/></td>									
				</tr>
				<tr>
					<td class="lab"><label>软件版本</label></td>
					<td class="lab"><input id="versionNum" class="easyui-textbox" style="height:24px;width:200px" data-options="required:true,validType:['length[0,15]']"/></td>
				</tr>
				<tr>
					<td class="lab" ><label>上传软件</label></td>
					<td class="lab">
						<div id="versionFile" style="width:200px;float:left"></div>
						<a href="#" style="height:26px;float:left;margin-left:20px;font-size:24px" class="easyui-linkbutton shadow bt_upload" id="versionUpload">浏览</a>
					</td>
				</tr>
				<tr>
					<td class="lab"><label>版本说明</label></td>
					<td><input id="remark" class="easyui-textbox" data-options="multiline:true,required:true,validType:['chinese','length[0,128]']" style="width:400px;height: 64px;"></input></td>
				</tr>
				<tr>
					<td class="lab" colspan="2" align="center" style="padding-top:10px">	
						<a id="savePone" href="#" class="easyui-linkbutton c100" >保存</a>
						<a id="quitPone" href="#" class="easyui-linkbutton c100" >取消</a>
					</td>	
				</tr>																														
			</table>			
       	</div>
	</div>
<script type="text/javascript">
var basePath = '<%=basePath%>';
</script>

<script src="<%=basePath %>pages/despages/common/jquery-easyui-1.5.1/jquery.min.js"></script>
<script src="<%=basePath %>pages/despages/common/jquery-easyui-1.5.1/jquery.easyui.min.js"></script>
<script src="<%=basePath %>pages/despages/common/jquery-easyui-1.5.1/easyui-lang-zh_CN.js"></script>
<script src="<%=basePath %>pages/despages/common/js/common.js"></script>
<script src="<%=basePath%>pages/despages/common/js/templet_common.js"></script>
<script src="<%=basePath%>pages/despages/common/webuploader-0.1.5/webuploader.min.js"></script>
<script type="text/javascript" src="<%=basePath %>pages/despages/warn/maintenance.js" ></script> 
 
</body>
</html>
