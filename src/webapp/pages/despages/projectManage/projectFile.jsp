<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page import="com.frontier.framework.model.UserInfo" %>
<%
String baseUrl  = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+baseUrl+"/";
String pagePath = baseUrl + "/pages/despages/common";	
String treePagePath = baseUrl + "/pages/areaEnergy/common";	
%>
<!-- 
   @文件名： 项目档案
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
    <title>录入信息</title>
    <link rel="stylesheet" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/fangtian/easyui.css">
    <link rel="stylesheet" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/icon.css">
    <link rel="stylesheet" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/color.css">
    <link rel="stylesheet" href="<%=pagePath %>/css/common.css">
    <link rel="stylesheet" type="text/css" href="<%=pagePath %>/css/templet_common.css">
    <link rel="stylesheet" href="<%=pagePath%>/webuploader-0.1.5/webuploader.css">
    <link rel="stylesheet" href="<%=treePagePath %>/css/tree.css">
    <script src="<%=pagePath %>/js/maskJs.js"></script>
	<script>
		var userId = <%=((UserInfo)session.getAttribute("userInfo")).getUserId()%>;
		var userName = "<%=((UserInfo)session.getAttribute("userInfo")).getUserName()%>";
	</script>
<style>
.div-search {
float:left;
margin-top:10px;
margin-bottom:10px;
margin-left:10px;
color: #232323;
}
#xzsbxx td{
/* width:155px; */
height:24px;
color: #232323;
word-wrap:break-word;
word-break:break-all;
}
#xgsbxx td{
/* width:155px; */
height:24px;
color: #232323;
word-wrap:break-word;
word-break:break-all;
}
.lab{
text-align:left;
}
#xmxq td{
width:120px;
height:24px;
color: #232323;
word-wrap:break-word;
word-break:break-all;
}
/* .fujian {
text-align:center;
} */
#xq_zdbgFile{
word-wrap:break-word;
word-break:break-all;
}
#xq_jsbgFile{
word-wrap:break-word;
word-break:break-all;
}
#xq_xmbgFile{
word-wrap:break-word;
word-break:break-all;
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
  
<body class="easyui-layout">
<script type="text/javascript">
var maskobj = new maskPanelManager();
maskobj.register();
</script>
	<div class="main-panel noOverflow" data-options="region:'center',border:false" >
		<div id="divSearch" class="easyui-panel" style="width: 100%;position: relative;" title="查询条件" data-options="cls:'fangtian-panel-style',onResize:autoResize">
			<ul class="s-ul-one" >
				<li>
				    <span>项目名称：</span>
				    <input id="prjName" class="easyui-textbox"  style="height:24px;width:155px">
				</li>
				<li>
				    <span>客户名称：</span>
				    <input id="consId" style="height:24px;width:155px" data-options="panelWidth:155,panelHeight:220"> 
				</li>
				<li>
				    <span>设备名称：</span>
				    <input id="deviceName" class="easyui-textbox"  style="height:24px;width:155px" >
				</li>
				<li>
				    <span>项目类型：</span>
				    <select id="prjType" class="easyui-combobox" style="height:24px;width:155px" data-options="editable:false,panelWidth:155">   
						<option value="">请选择</option>
					    <option value="1">节能项目</option>
					    <option value="2">替代项目</option>   
					</select>  
				</li>
				<li class="s-right-one">
					<a href="#" class="easyui-linkbutton c100" onclick="bt_search();" style="width: 80px;height: 24px;">查询</a>
				</li>
			</ul> 
		</div>
	
	
	<div id="c-panel" class="auto-resize easyui-panel" style="width: 100%;" data-options="cls:'fangtian-panel-style bottom-padding'">
		<div id="tool_button">
			<a href="#" class="easyui-linkbutton" plain="true" style="width: 80px;" onclick="bt_add();" data-options="iconCls:'icon-add'">新增</a>
			<a href="#" class="easyui-linkbutton" plain="true" style="width: 80px;" onclick="bt_modify();" data-options="iconCls:'icon-edit'">修改</a>
			<a href="#" class="easyui-linkbutton" plain="true" style="width: 80px;" onclick="bt_delete();" data-options="iconCls:'icon-remove'">删除</a>
		</div>
		<!--内容区域（表格、图表等）-->
		<div id="data_grid"  title="项目档案"></div>
	</div>
</div>
	
	<div id="xzsbxx" class="easyui-window" closed="true" modal="true" title="新增" style="width:660px;" data-options="minimizable:false,collapsible:false">
		<div style="margin-left:10px;margin-right:10px; margin-top:10px;margin-bottom:10px; " id="radio">
			<table align="center" >
				<colgroup>
					<col width="110px">
					<col width="180px">
					<col width="110px">
					<col width="180px">
				</colgroup>
				<tr>
					<td class="lab">
						<input id="a_id"  style="height:24px;width:155px" type="hidden">
						<label>客户名称：</label>
					</td>
					<td>
						<input id="a_consId" class="easyui-textbox" style="height:24px;width:155px" data-options="required:true,panelWidth:155,panelHeight:220">
					</td>
					<td class="lab">
						<label>项目名称：</label>
					</td>
					<td>
						<input id="a_prjName" class="easyui-textbox" style="height:24px;width:155px" data-options="required:true,validType:'length[0,20]'">
					</td>
				</tr>
				<tr>
					<!-- <td class="lab"><label>设备类型：</label></td>
					<td><input id="a_deveiceType"  style="height:24px;width:155px" data-options="editable:false,panelWidth:155"></td> -->
					<td class="lab"><label>设备名称：</label></td>
					<td>
						<input id="a_deviceName" class="easyui-combobox" style="height:24px;width:155px" data-options="required:true,editable:false,panelWidth:155">
						<input id="a_deviceName_n" type="hidden" style="height:24px;width:155px" >
					</td>
					<td class="lab"><label>项目类型：</label></td><!-- 1=节能项目 2=替代项目 -->
					<td>
						<select id="a_prjType" class="easyui-combobox" style="height:24px;width:155px" data-options="required:true,editable:false,panelWidth:155">   
						    <option value="1">节能项目</option>   
						    <option value="2">替代项目</option>   
						</select>  
					</td>
				</tr>
				<tr>
					<td class="lab"><label>采用技术：</label></td>
					<td><input id="a_useTea" class="easyui-textbox" style="height:24px;width:155px" data-options="required:true,validType:'length[0,20]'"></td>
					<td class="lab"><label id="a_ele">节能(替代)电量(kWh)：</label></td>
					<td><input id="a_eleNum" class="easyui-textbox" style="height:24px;width:155px" data-options="required:true,validType:['floatNumber','length[0,10]']"/></td>
				</tr>
				<tr>
					<td class="lab"><label>改造完成日期：</label></td>
					<td><input id="a_finishDate" class="easyui-datebox" style="height:24px;width:155px" data-options="required:true,editable:false"></td>
					<td class="lab"><label>填报日期：</label></td>
					<td><input id="a_addDate" class="easyui-datebox" style="height:24px;width:155px" data-options="required:true,editable:false"></td>
				</tr>
				<tr>
					<td class="lab"><label>备注：</label></td>
					<td colspan="3"><input id="a_memo" class="easyui-textbox" style="height:72px;width:450px" data-options="multiline:true,validType:'length[0,200]'"></td>
				</tr>
				<tr>
					<td class="lab"><!-- <label>填报人：</label> --></td>
					<td>
						<input id="a_addUserId" style="height:24px;width:155px" type="hidden" >
						<input id="a_username" class="easyui-textbox" style="height:24px;width:155px" data-options="editable:false" >
					</td>
				</tr>
			</table>
			
			<div class="fujian">
			<table align="center">
				<colgroup>
					<col width="110px">
					<col width="180px">
					<col width="110px">
					<col width="180px">
				</colgroup>
				<tr>
					<td><label>诊断报告：</label></td>
					<td colspan="3"><div id="zdbgFile"></div>
						<a href="#" class="easyui-linkbutton shadow bt_upload" 
                                    id="zdbgUpload">上传</a>
					</td>
					<!-- <td></td>
					<td></td> -->
					<!-- <td><a href="#" class="easyui-linkbutton shadow cancelUpload" 
                                    id="" style="width: 90px; height: 45px; vertical-align: 0;">取消上传</a></td> -->
				</tr>
				<tr>
					<td><label>技术报告：</label></td>
					<td colspan="3"><div id="jsbgFile"></div>
						<a href="#" class="easyui-linkbutton shadow bt_upload" 
                                    id="jsbgUpload">上传</a>
					</td>
					<!-- <td></td>
					<td></td> -->
					<!-- <td><a href="#" class="easyui-linkbutton shadow cancelUpload" 
                                    id="" style="width: 90px; height: 45px; vertical-align: 0;">取消上传</a></td> -->
				</tr>
				<tr>
					<td><label>项目报告：</label></td>
					<td colspan="3"><div id="xmbgFile"></div>
						<a href="#" class="easyui-linkbutton shadow bt_upload" 
                                    id="xmbgUpload">上传</a>
					</td>
					<!-- <td></td>
					<td></td> -->
					<!-- <td><a href="#" class="easyui-linkbutton shadow cancelUpload" 
                                    id="" style="width: 90px; height: 45px; vertical-align: 0;">取消上传</a></td> -->
				</tr>
			</table>
			</div>
			<br /><br />
			<div align="center" style="clear:both;">
				<a id="bt_add_commit" href="#" class="easyui-linkbutton c100 shadow" >保存</a>
				<a href="#" class="easyui-linkbutton c100 shadow"  onclick="bt_add_cancel();" >取消</a>
			</div>
       	</div>
	</div>
	
	<div id="xgsbxx" class="easyui-window" closed="true" modal="true" title="修改" style="width:660px;" data-options="minimizable:false,collapsible:false">
		<div style="margin-left:10px;margin-right:10px; margin-top:10px;margin-bottom:10px; " id="radio">
			<table align="center" >
				<colgroup>
					<col width="110px">
					<col width="180px">
					<col width="110px">
					<col width="180px">
				</colgroup>
				<tr>
					<td class="lab">
						<input id="xg_id"  style="height:24px;width:155px" type="hidden">
						<label>客户名称：</label>
					</td>
					<td>
						<input id="xg_consId" class="easyui-textbox" style="height:24px;width:155px" data-options="required:true,panelWidth:155,panelHeight:220">
					</td>
					<td class="lab">
						<label>项目名称：</label>
					</td>
					<td>
						<input id="xg_prjName" class="easyui-textbox" style="height:24px;width:155px" data-options="required:true,validType:'length[0,20]'">
					</td>
				</tr>
				<tr>
					<!-- <td class="lab"><label>设备类型：</label></td>
					<td><input id="a_deveiceType"  style="height:24px;width:155px" data-options="editable:false,panelWidth:155"></td> -->
					<td class="lab"><label>设备名称：</label></td>
					<td>
						<input id="xg_deviceName" class="easyui-combotree" style="height:24px;width:155px" data-options="required:true,editable:false,panelWidth:155">
						<input id="xg_deviceName_n" type="hidden" style="height:24px;width:155px" >
					</td>
					<td class="lab"><label>项目类型：</label></td><!-- 1=节能项目 2=替代项目 -->
					<td>
						<select id="xg_prjType" class="easyui-combobox" style="height:24px;width:155px" data-options="required:true,editable:false,panelWidth:155">   
						    <option value="1">节能项目</option>   
						    <option value="2">替代项目</option>   
						</select>  
					</td>
				</tr>
				<tr>
					<td class="lab"><label>采用技术：</label></td>
					<td><input id="xg_useTea" class="easyui-textbox" style="height:24px;width:155px" data-options="required:true,validType:'length[0,20]'"></td>
					<td class="lab"><label id="xg_ele">节能(替代)电量(kWh)：</label></td>
					<td><input id="xg_eleNum" class="easyui-textbox" style="height:24px;width:155px" data-options="required:true,validType:['floatNumber','length[0,10]']"/></td>
				</tr>
				<tr>
					<td class="lab"><label>改造完成日期：</label></td>
					<td><input id="xg_finishDate" class="easyui-datebox" style="height:24px;width:155px" data-options="required:true,editable:false"></td>
					<td class="lab"><label>填报日期：</label></td>
					<td><input id="xg_addDate" class="easyui-datebox" style="height:24px;width:155px" data-options="required:true,editable:false"></td>
				</tr>
				<tr>
					<td class="lab"><label>备注：</label></td>
					<td colspan="3"><input id="xg_memo" class="easyui-textbox" style="height:72px;width:450px" data-options="multiline:true,validType:'length[0,200]'"></td>
				</tr>
				<tr>
					<td class="lab"><!-- <label>填报人：</label> --></td>
					<td>
						<input id="xg_addUserId" style="height:24px;width:155px" type="hidden" >
						<input id="xg_username" class="easyui-textbox" style="height:24px;width:155px" data-options="editable:false" >
					</td>
				</tr>
			</table>
			
			<div class="fujian">
			<table align="center">
				<colgroup>
					<col width="110px">
					<col width="180px">
					<col width="110px">
					<col width="180px">
				</colgroup>
				<tr>
					<td><label>诊断报告：</label></td>
					<td colspan="3"><div id="xg_zdbgFile"></div>
						<a href="#" class="easyui-linkbutton shadow bt_upload" 
                                    id="xg_zdbgUpload">上传</a>
					</td>
					<!-- <td></td>
					<td></td> -->
					<!-- <td><a href="#" class="easyui-linkbutton shadow cancelUpload" 
                                    id="" style="width: 90px; height: 45px; vertical-align: 0;">取消上传</a></td> -->
				</tr>
				<tr>
					<td><label>技术报告：</label></td>
					<td colspan="3"><div id="xg_jsbgFile"></div>
						<a href="#" class="easyui-linkbutton shadow bt_upload" 
                                    id="xg_jsbgUpload">上传</a>
                    </td>
					<!-- <td></td>
					<td></td> -->
					<!-- <td><a href="#" class="easyui-linkbutton shadow cancelUpload" 
                                    id="" style="width: 90px; height: 45px; vertical-align: 0;">取消上传</a></td> -->
				</tr>
				<tr>
					<td><label>项目报告：</label></td>
					<td colspan="3"><div id="xg_xmbgFile"></div>
						<a href="#" class="easyui-linkbutton shadow bt_upload" 
                                    id="xg_xmbgUpload">上传</a>
					</td>
					<!-- <td></td>
					<td></td> -->
					<!-- <td><a href="#" class="easyui-linkbutton shadow cancelUpload" 
                                    id="" style="width: 90px; height: 45px; vertical-align: 0;">取消上传</a></td> -->
				</tr>
			</table>
			</div>
			<br /><br />
			<div align="center" style="clear:both;">
				<a id="bt_update_commit" href="#" class="easyui-linkbutton c100 shadow" >保存</a>
				<a href="#" class="easyui-linkbutton c100 shadow"  onclick="bt_update_cancel();" >取消</a>
			</div>
       	</div>
	</div>
	
	<div id="xmxq" class="easyui-window" closed="true" modal="true" title="详情" style="width:660px;" data-options="minimizable:false,collapsible:false">
		<div style="margin-left:10px;margin-right:10px; margin-top:10px;margin-bottom:10px; " id="radio">
			<table align="center" >
				<tr>
					<td class="lab">
						<label>客户名称：</label>
					</td>
					<td class="lab">
						<label id="xq_consId"></label>
					</td>
					<td class="lab">
						<label>项目名称：</label>
					</td>
					<td class="lab">
						<label id="xq_prjName"></label>
					</td>
				</tr>
				<tr>
					<!-- <td class="lab"><label>设备类型：</label></td>
					<td class="lab"><label id="xq_deveiceType"></label></td> -->
					<td class="lab"><label>设备名称：</label></td>
					<td class="lab"><label id="xq_deviceName"></label></td>
					<td class="lab"><label>项目类型：</label></td><!-- 1=节能项目 2=替代项目 -->
					<td class="lab"><label id="xq_prjType"></label></td><!-- 1=节能项目 2=替代项目 -->
				</tr>
				<tr>
					<td class="lab"><label>采用技术：</label></td>
					<td class="lab"><label id="xq_useTea" ></label></td>
					<td class="lab"><label id="xq_ele">节能(替代)电量(kWh)：</label></td>
					<td class="lab"><label id="xq_eleNum"></label></td>
				</tr>
				<tr>
					<td class="lab"><label>填报人：</label></td>
					<td class="lab"><label id="xq_username"></label></td>
					<td class="lab"><label>改造完成日期：</label></td>
					<td class="lab"><label id="xq_finishDate"></label></td>
				</tr>
				<tr>
					<td class="lab"><label>填报日期：</label></td>
					<td class="lab"><label id="xq_addDate"></label></td>
				</tr>
				<tr>
					<td class="lab"><label>备注：</label></td>
					<td colspan="3"><label id="xq_memo"></label></td>
				</tr>
			</table>
			<br /><br />
			
			<div class="fujian" style="margin-bottom:40px;text-align:center">
			<div id="xq_zdbg"  style="float:left;width:32%;">
				<label>诊断报告：</label>
				<div id="xq_zdbgFile"></div>
			</div>
			<div style="float:left;width:2%;"></div>
			<div id="xq_jsbg" style="float:left;width:32%;">
				<label>技术报告：</label>
				<div id="xq_jsbgFile"></div>
			</div>
			<div style="float:left;width:2%;"></div>
			<div id="xq_xmbg" style="float:left;width:32%;">
				<label>项目报告：</label>
				<div id="xq_xmbgFile"></div>
			</div>
			</div>
			
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
<script type="text/javascript" src="projectFile.js"></script>
 
</body>
</html>
