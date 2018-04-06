<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%

String baseUrl  = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+baseUrl+"/";
String pagePath = baseUrl + "/pages/despages/common";	
String treePagePath = baseUrl + "/pages/areaEnergy/common";	
	
%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ taglib uri="/fpus-tags" prefix="fpus"%>
<!-- 
   @文件名： 
   @作  者：  wxt
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
    <title>规章制度</title>
    <link rel="stylesheet" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/fangtian/easyui.css">
    <link rel="stylesheet" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/icon.css">
    <link rel="stylesheet" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/color.css">
    <link rel="stylesheet" href="<%=pagePath %>/css/common.css">
    <link rel="stylesheet" href="<%=treePagePath %>/css/tree.css">
    <link rel="stylesheet" type="text/css" href="<%=pagePath %>/css/templet_common.css">
    <link rel="stylesheet" href="<%=pagePath%>/webuploader-0.1.5/webuploader.css">
    <script src="<%=pagePath %>/js/maskJs.js"></script>
    </head>
  
<body  class="easyui-layout">
	<script>
	    var maskobj = new maskPanelManager();
	    maskobj.register();
	</script>
<style>
body{
overflow-x:hidden;
overflow-y:hidden;
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
/* width:80px; */
line-height:24px;
}
#div-data {
margin:0px 10px;
}
.noUpload{
cursor: pointer;
width:10px;
height:10px;
}
.noUp{
cursor: pointer;
width:10px;
height:10px;
}
</style>
</head>
  
	<div class="main-panel noOverflow" data-options="region:'center',border:false" >
		<div id="divSearch" class="easyui-panel" style="width: 100%;position: relative;" title="查询条件" data-options="cls:'fangtian-panel-style',onResize:autoResize">
			<ul class="s-ul-one" >
				<li>
				    <span>制度来源：</span>
				    <input class="easyui-combobox" name="zcfg_xxly" id="zcfg_xxly" style="height:24px;width:155px" data-options="editable:false,panelWidth:155"></input>
				</li>
				<li>
				    <span>具体来源：</span>
				    <input id="xxly_lynr" class="easyui-combobox"  name="xxly_lynr" style="height:24px;width:155px"data-options="editable:false,panelWidth:155"></input>
				</li>
				<li>
				    <span>制度名称：</span>
				    <input class="easyui-textbox"  name="pl_name"   id="pl_name"style="height:24px;width:155px"> 
				</li>
				<li class="s-right-one">
					<a href="#" class="easyui-linkbutton c100" onclick="bt_search();" style="width: 80px;height: 24px;">查询</a>
				</li>
			</ul> 
		</div>
		
		<div id="c-panel" class="auto-resize easyui-panel" style="width: 100%;" data-options="cls:'fangtian-panel-style bottom-padding'">
			<div id="linkbuttons">
				<a href="#" class="easyui-linkbutton" plain="true" style="width: 80px;" onclick="bt_add();" data-options="iconCls:'icon-add'">新增</a>
				<a href="#" class="easyui-linkbutton" plain="true" style="width: 80px;" onclick="bt_modify();" data-options="iconCls:'icon-edit'">修改</a>
				<a href="#" class="easyui-linkbutton" plain="true" style="width: 80px;" onclick="bt_delete();" data-options="iconCls:'icon-remove'">删除</a>
			</div>
			<!--内容区域（表格、图表等）-->
			<div id="gzzd"  title="规章制度"></div>
		</div>
	</div>
	
	<div id="zcfgxz" class="easyui-window" closed="true" modal="true" title="新增" style="display: none"
	 	 data-options="minimizable:false,maximizable:false,collapsible:false,resizable:true,modal:true,closed:true">
		<s:form id="xzform">
				<table class="formTable" style="margin:10px 20px 0px 20px" align="center">
					<tr>
						<td class="div-label">制度名称：</td>
						<td colspan="3">
							<input class="easyui-textbox"  name="xz_name"   id="xz_name"style="height:24px;width:400px" data-options="required:true,validType:'length[1,60]'">
							<s:hidden name="id" />
						</td>
					</tr>
					<tr>
			            <td class="div-label">制度来源：</td>
			            <td>
			            	  <input class="easyui-combobox" name="zcfg_xxly1" id="zcfg_xxly1" style="width:120px;" data-options="editable:false,panelWidth:110"required="true"></input>
			   
			            </td>
			            <td class="div-label">具体来源：</td>
			            <td align="right">
			            	<input class="easyui-combobox" name="xxly_lynr1" id="xxly_lynr1" style="width:150px;" data-options="editable:false,panelWidth:110" required="true"></input>
			       
			            </td>
					</tr>
					<tr>
						<td class="div-label">制度内容：</td>
						<td colspan="3">
							<input class="easyui-textbox"  name="pl_content1" id="pl_content1" class="easyui-validatebox" 
								required="true" style="width:400px; height:100px;" validType="length[0,500]" data-options="multiline:true"></input> 
						</td>
						</td>
					</tr>
					<tr>
						<td class="div-label">附件:</td>
						<td colspan="3">
							<div id="xz_gzzdFile"></div>
							<a href="#" style="height:24px;" class="easyui-linkbutton shadow bt_upload" id="xz_gzzdUpload">上传</a>
						</td>							
					</tr>
				</table>
			</s:form>
<!-- 			<div class="fujian"  align="center">
						<table  align="center">
							<tr>
								<td class="div-label">文件上传：</td>
								<td><a href="#" class="easyui-linkbutton shadow" 
			                                    id="xz_gzzdUpload" style="width: 90px; height: 45px; vertical-align: 0;">上传</a></td>
								<td><div id="xz_gzzdFile" style="width: 213px; height: 45px; vertical-align: 0;"></div></td>
								<td><a href="#" class="easyui-linkbutton shadow cancelUpload" 
			                                    id="" style="width: 90px; height: 45px; vertical-align: 0;">取消上传</a></td>
							</tr>
						</table>
		    </div> -->
	    	<div align="center" style="clear:both;margin:20px">
					<span style="margin-right:20px">
						<a id="bt_add_commit" href="#" class="easyui-linkbutton c100 shadow">保存</a>
					</span>
					<span>
					    <a href="#" class="easyui-linkbutton c100 shadow"  onclick="bt_add_cancel();" >取消</a>
					</span>
		   </div>
	</div>
	<div id="zcfgck" class="easyui-window" closed="true" modal="true" title="规章制度详情" style="display: none"
		 data-options="minimizable:false,maximizable:false,collapsible:false,resizable:true,modal:true,closed:true">
		<div style="margin-left:10px;margin-right:10px; margin-top:10px;margin-bottom:10px; " id="radio">
		<s:form id="ckform" enctype="multipart/form-data" method="post">
				<table class="formTable">
					<tr>
						<td>
						<label>制度名称：</label>
						</td>
						<td colspan="3">
							<input class="easyui-textbox"  name="ck_name"  id="ck_name" style="width:400px;" readonly="true" />
						</td>
					</tr>
					<tr>
						<td class="div-label">制度来源：</td>
			            <td>					       
			            	<input class="easyui-textbox" name="zcfg_xxly2" id="zcfg_xxly2" style="width:120px;" readonly="true" ></input>
			            </td>
			            <td class="div-label">具体来源：</td>
			            <td align="right">
			            	<input class="easyui-textbox" name="xxly_lynr2" id="xxly_lynr2" style="width:150px;" readonly="true"></input>
			            </td>
					</tr>
					<tr>
						<td>
							制度内容：
						</td>
						<td colspan="3">
							<input class="easyui-textbox" name="pl_content2"  id="pl_content2" style="width:400px; height:100px;" 
							data-options="multiline:true" readonly="true" />
						</td>
					</tr>
					<tr>
						<td class="label request">
							附件内容：
						</td>
						<td colspan="3">
							<div id="ck_gzzdFile">
							</div>
						</td>
					</tr>
				</table>
			</s:form>		
       	</div>
	</div>
	<div id="zcfgxg" class="easyui-window" closed="true" modal="true" title="修改" style="display: none"
	 	 data-options="minimizable:false,maximizable:false,collapsible:false,resizable:true,modal:true,closed:true">
			<s:form id="xzform" >
					<table class="formTable" style="margin:10px 20px 0px 20px" align="center">
						<tr>
							<td class="div-label">
							<input id="id_xg"  style="height:24px;width:110px" type="hidden">
							<label>制度名称：</label>
							</td>
							<td colspan="3">
								<input class="easyui-textbox"  name="xg_name"   id="xg_name"style="height:24px;width:400px" data-options="required:true,validType:'length[0,60]'">
								<s:hidden name="id" />
							</td>
						</tr>
						<tr>
				            <td class="div-label">制度来源：</td>
				            <td>
				            	  <input class="easyui-combobox" name="zcfg_xxly3" id="zcfg_xxly3" style="width:120px;"  data-options="required:true,editable:false,panelWidth:110"></input>
				   
				            </td>
				            <td class="div-label">具体来源：</td>
				            <td align="right">
				            	<input class="easyui-combobox" name="xxly_lynr3" id="xxly_lynr3" style="width:150px;"  data-options="required:true,editable:false,panelWidth:110"></input>
				       
				            </td>
						</tr>
						<tr>
							<td class="div-label">制度内容：</td>
							<td colspan="3">
								<input class="easyui-textbox"  name="pl_content3" id="pl_content3" class="easyui-validatebox" 
									required="true" style="width:400px; height:100px;" validType="length[0,500]" data-options="multiline:true"></input> 
							</td>
						</tr>
						<tr>
						<td class="div-label">附件:</td>
						<td colspan="3">
							<div id="xg_gzzdFile"></div>
							<a href="#" style="height:24px;" class="easyui-linkbutton shadow bt_upload" id="xg_gzzdUpload">上传</a>
						</td>	
						<!-- <td colspan="2">
							<div id="xg_gzzdFile"   style="width:200px" ></div>
						</td>
						<td style="text-align:center;float:right">
							<a href="#" style="height:24px;"class="easyui-linkbutton shadow bt_upload" id="xg_gzzdUpload">上传</a>
						</td> -->
					</tr>
						</table>
						</s:form>
<!--          <div class="fujian" align="center">
				<table align="center">
					<tr>
						<td class="div-label">文件上传：</td>
						<td><a href="#" class="easyui-linkbutton shadow" 
	                                    id="xg_gzzdUpload" style="width: 90px; height: 45px; vertical-align: 0;">上传</a></td>
						<td><div id="xg_gzzdFile" style="width: 213px; height: 45px; vertical-align: 0;"></div></td>
						<td><a href="#" class="easyui-linkbutton shadow cancelUpload" 
	                                    id="" style="width: 90px; height: 45px; vertical-align: 0;">取消上传</a></td>
					</tr>
				</table>
		</div> -->
		<div align="center" style="clear:both;margin:20px">
			<span style="margin-right:20px">
			<a id="bt_update_commit" href="#" class="easyui-linkbutton c100 shadow" >保存</a>
			</span>
			<span>
			  <a href="#" class="easyui-linkbutton c100 shadow" onclick="bt_xg_cancel();" >取消</a>
			</span>
		</div>
</div>

<script type="text/javascript">
		webContextRoot="<%=basePath%>";
</script>

<script src="<%=pagePath %>/jquery-easyui-1.5.1/jquery.min.js"></script>
<script src="<%=pagePath %>/jquery-easyui-1.5.1/jquery.easyui.min.js"></script>
<script src="<%=pagePath %>/jquery-easyui-1.5.1/easyui-lang-zh_CN.js"></script>
<script src="<%=pagePath %>/js/common.js"></script>
<script type="text/javascript" src="<%=pagePath%>/js/dateUtil.js"></script>
<script type="text/javascript" src="<%=pagePath %>/ocupload/jquery.ocupload-1.1.2.js"></script>
<script src="<%=pagePath%>/js/templet_common.js"></script>
<script src="<%=pagePath%>/webuploader-0.1.5/webuploader.min.js"></script>
<script type="text/javascript" src="gzzdList.js"></script>
 
</body>
</html>
