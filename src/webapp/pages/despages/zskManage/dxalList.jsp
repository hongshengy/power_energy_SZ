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
   @作  者：  
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
    <title>典型案例</title>
    <link rel="stylesheet" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/fangtian/easyui.css">
    <link rel="stylesheet" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/icon.css">
    <link rel="stylesheet" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/color.css">
    <link rel="stylesheet" href="<%=pagePath %>/css/common.css">
    <link rel="stylesheet" href="<%=treePagePath %>/css/tree.css">
    <link rel="stylesheet" type="text/css" href="<%=pagePath %>/css/templet_common.css">
    <link rel="stylesheet" href="<%=pagePath%>/webuploader-0.1.5/webuploader.css">
    
    <script src="<%=pagePath %>/js/maskJs.js"></script>
    </head>
  
<body class="easyui-layout">
	<script>
	    var maskobj = new maskPanelManager();
	    maskobj.register();
	</script>
<style>
/* body{
overflow-x:hidden;
overflow-y:hidden;
height:100%
} */
.div-search {
float:left;
margin-top:10px;
margin-bottom:10px;
margin-left:10px;
color: #232323;
}
.div-label {
float:left;
/* width:60px; */
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
</style>
	<div class="main-panel noOverflow" data-options="region:'center',border:false" >
		<div id="divSearch" class="easyui-panel" style="width: 100%;position: relative;" title="查询条件" data-options="cls:'fangtian-panel-style',onResize:autoResize">
			<ul class="s-ul-one" >
				<li>
				    <span>行业：</span>
				    <input class="easyui-textbox" name="trade_code" id="trade_code" style="height:24px;width:155px"> 
				</li>
				<li>
				    <span>设备类型：</span>
				    <input class="easyui-combobox"  name="dev_type"   id="dev_type"style="height:24px;width:155px" data-options="editable:false,panelWidth:155"> 
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
			<div id="dxal"  title="典型案例"></div>
		</div>
	</div>
	
	<div id="dxalxz" class="easyui-window" closed="true" modal="true" title="典型案例-新增" style="display: none"
	 data-options="minimizable:false,maximizable:false,collapsible:false,resizable:true,modal:true,closed:true">
		<s:form id="xzform" >
				<table class="formTable" style="margin:10px 20px 0px 20px" align="center">
					<tr>
						<td class="div-label">
						<input id="id"  style="height:24px;width:110px" type="hidden">
						<label>技术原理：</label>
						</td>
						<td colspan="3">
							<input class="easyui-textbox"  name="tc_theory1"   id="tc_theory1" validType="length[1,80]" style="height:24px;width:400px" required="true">
							<s:hidden name="id" />
						</td>
					</tr>
					<tr>
				            <td class="div-label">行业名称：</td>
				            <td>
				            	  <input class="easyui-textbox" name="trade_code1" id="trade_code1" style="width:120px;" validType="length[1,30]" required="true" data-options="editable:true,panelWidth:155"></input>
				   
				            </td>
				            <td class="div-label">设备类型：</td>
				            <td align="right">
				            	<input class="easyui-combobox" name="dev_type1" id="dev_type1" style="width:150px;" required="true" data-options="editable:false,panelWidth:155"></input>
				            </td>
					</tr>
					<tr>
						<td class="div-label">边界条件：</td>
						<td colspan="3">
							<input class="easyui-textbox"  name="tc_condition1" id="tc_condition1" class="easyui-validatebox" 
								required="true" style="width:400px; height:100px;" validType="length[1,80]" data-options="multiline:true"></input> 
						</td>
					</tr>
					<tr>
						<td class="div-label">工艺介绍：</td>
						<td colspan="3">
							<input class="easyui-textbox"  name="tc_technics1" id="tc_technics1" class="easyui-validatebox" 
								required="true" style="width:400px; height:100px;" validType="length[1,80]" data-options="multiline:true"></input> 
						</td>
					</tr>
					<tr>
						<td class="div-label">文件上传：</td>
						
						<td colspan="3">
							<div id="xz_File"></div>
							<a id="xz_but" href="#"  class="easyui-linkbutton bt_upload" style="height: 25px; vertical-align: 0;">上传</a>
						</td>
						
					</tr>
					
					</table>
					</s:form>
						<!-- <div class="div-label">文件上传：</div>
						<div class="clear">	
						<label id="dxalFile"></label>
						<a href="#" class="easyui-linkbutton shadow" data-options="iconCls:'icon-large-picture',size:'large',iconAlign:'top',plain:true"
                            id="dxalUpload" style="width: 100px; height: 60px; vertical-align: 0;">上传</a><br>
						</div> -->
					<!-- <div class="fujian" align="center">
						<table align="center">
						<tr>
							<td><label>文件上传：</label></td>
							<td><a href="#" class="easyui-linkbutton shadow" 
		                                    id="xz_dxalUpload" style="width: 90px; height: 45px; vertical-align: 0;">上传</a></td>
							<td><div id="xz_dxalFile" style="width: 213px; height: 45px; vertical-align: 0;"></div></td>
							<td><a href="#" class="easyui-linkbutton shadow cancelUpload" 
		                                    id="" style="width: 90px; height: 45px; vertical-align: 0;">取消上传</a></td>
						</tr>
					</table>
				</div> -->
				<div align="center" style="clear:both;margin:20px">
					<span style="margin-right:20px">
						<a id="bt_add_commit" href="#" class="easyui-linkbutton c100 shadow"  >保存</a>
					</span>
					<span>
					    <a href="#" class="easyui-linkbutton c100 shadow"  onclick="bt_add_cancel();" >取消</a>
					</span>
				</div>
	</div>
	<div id="dxalck" class="easyui-window" closed="true" modal="true" title="典型案例详情" style="display: none"
	 data-options="minimizable:false,maximizable:false,collapsible:false,resizable:true,modal:true,closed:true">
		<div style="margin-left:10px;margin-right:10px; margin-top:10px;margin-bottom:10px; " id="radio">
		<s:form id="ckform" enctype="multipart/form-data" method="post">
				<table class="formTable">
					<tr>
						<td class="div-label">
						<input id="id1"  style="height:24px;width:110px" type="hidden">
						<label>技术原理：</label>
						</td>
						<td colspan="3">
						<input  class="easyui-textbox" name="tc_theory2"   id="tc_theory2"style="height:24px;width:400px" readonly="true"></input>
							<s:hidden name="id" />
						</td>
					</tr>
					<tr>
			            <td class="div-label">行业名称：</td>
			            <td>
			            	  <input class="easyui-textbox" name="trade_code2" id="trade_code2" style="width:120px;" readonly="true"></input>
			   
			            </td>
			            <td class="div-label">设备类型：</td>
			          	<td align="right">
			            	<input class="easyui-textbox" name="dev_type2" id="dev_type2" style="width:150px;"readonly="true"></input>
			            </td>
					</tr>
					<tr>
						<td class="div-label">边界条件：</td>
						<td colspan="3">
							<input  class="easyui-textbox" name="tc_condition2" id="tc_condition2" style="width:400px; height:100px;"  readonly="true" ></input> 
						</td>
					</tr>
					<tr>
						<td class="div-label">工艺介绍：</td>
						<td colspan="3">
							<input class="easyui-textbox" name="tc_technics2" id="tc_technics2" style="width:400px; height:100px;"  readonly="true" ></input> 
						</td> 
					</tr>
					<tr>
						<td class="label request">
							附件内容：
						</td>
						<td colspan="3">
							<div id="ck_dxalFile">
							</div>
						</td>
					</tr>
				</table>
			</s:form>		
       	</div>
	</div>
	<div id="dxalxg" class="easyui-window" closed="true" modal="true" title="典型案例-修改" style="display: none"
		 data-options="minimizable:false,maximizable:false,collapsible:false,resizable:true,modal:true,closed:true">
		<s:form id="xzform" >
				<table class="formTable" style="margin:10px 20px 0px 20px" align="center">
					<tr>
						<td class="div-label">
						<input id="id1"  style="height:24px;width:110px" type="hidden">
						<label>技术原理：</label>
						</td>
						<td colspan="3">
							<input class="easyui-textbox"  name="tc_theory3"   id="tc_theory3" validType="length[1,80]" style="height:24px;width:400px" required="true">
							<s:hidden name="id" />
						</td>
					</tr>
					<tr>
				            <td class="div-label">行业名称：</td>
				            <td>
				            	  <input class="easyui-textbox" name="trade_code3" id="trade_code3" validType="length[1,30]" style="width:120px;" required="true" data-options="editable:true,panelWidth:155"></input>
				   
				            </td>
				            <td class="div-label">设备类型：</td>
				           <td align="right">
				            	<input class="easyui-combobox" name="dev_type3" id="dev_type3" style="width:150px;" required="true" data-options="editable:false,panelWidth:155"></input>
				            </td>
					</tr>
					<tr>
						<td class="div-label">边界条件：</td>
						<td colspan="3">
							<input class="easyui-textbox"  name="tc_condition3" id="tc_condition3" class="easyui-validatebox" 
								required="true" style="width:400px; height:100px;" required="true" validType="length[1,80]" data-options="multiline:true"></input> 
						</td>
					</tr>
					<tr>
						<td class="div-label">工艺介绍：</td>
						<td colspan="3">
							<input class="easyui-textbox"  name="tc_technics3" id="tc_technics3" class="easyui-validatebox" 
								required="true" style="width:400px; height:100px;" required="true" validType="length[1,80]" data-options="multiline:true"></input> 
						</td>
					</tr>
					<tr>
						<td class="div-label">文件上传：</td>
						
						<td colspan="3">
							<div id="xg_File"></div>
							<a id="xg_but" href="#"  class="easyui-linkbutton bt_upload" style="height: 25px; vertical-align: 0;">上传</a>
						</td>
						
					</tr>
					</table>
					</s:form>
					<!-- <div class="fujian" align="center">
						<table align="center">
							<tr>
								<td><label>文件上传：</label></td>
								<td><a href="#" class="easyui-linkbutton shadow" 
			                                    id="xg_dxalUpload" style="width: 90px; height: 45px; vertical-align: 0;">上传</a></td>
								<td><div id="xg_dxalFile" style="width: 213px; height: 45px; vertical-align: 0;"></div></td>
								<td><a href="#" class="easyui-linkbutton shadow cancelUpload" 
			                                    id="" style="width: 90px; height: 45px; vertical-align: 0;">取消上传</a></td>
							</tr>
						</table>
					</div> -->
						<!-- <div class="div-label">文件上传：</div>
						<div class="clear">	
						<div id="flfgFile"></div>
						<label id="dxalFile"></label>
						<a href="#" class="easyui-linkbutton shadow" data-options="iconCls:'icon-large-picture',size:'large',iconAlign:'top',plain:true"
                            id="dxalUpload" style="width: 100px; height: 60px; vertical-align: 0;">上传</a><br>
						</div>
 -->			<div align="center" style="clear:both;margin:20px">
					<span style="margin-right:20px">
					<a id="bt_update_commit" href="#" class="easyui-linkbutton c100 shadow"   >保存</a>
					</span>
					<span>
					  <a href="#" class="easyui-linkbutton c100 shadow"  onclick="bt_xg_cancel();" >取消</a>
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
<script type="text/javascript" src="dxalList.js"></script>
</body>
</html>
