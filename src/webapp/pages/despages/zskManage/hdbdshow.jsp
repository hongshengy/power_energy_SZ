<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%

String baseUrl  = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+baseUrl+"/";
String pagePath = baseUrl + "/pages/despages/common";	
String treePagePath = baseUrl + "/pages/areaEnergy/common";
String consId = request.getParameter("consId");//获取调用父页面传过来的参数
String consName = request.getParameter("consName");//获取调用父页面传过来的参数
	
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
    <title>活动保电</title>
    <link rel="stylesheet" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/fangtian/easyui.css">
    <link rel="stylesheet" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/icon.css">
    <link rel="stylesheet" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/color.css">
    <link rel="stylesheet" href="<%=pagePath %>/css/common.css">
    <link rel="stylesheet" type="text/css" href="<%=pagePath %>/css/templet_common.css">
    <link rel="stylesheet" href="<%=treePagePath%>/css/tree.css">
    <script src="<%=pagePath %>/js/maskJs.js"></script>
    </head>
  
<body  class="easyui-layout" >
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
width:90px;
line-height:24px;
}
#div-data {
margin:0px 10px;
}
</style>

   <div class="main-panel noOverflow" data-options="region:'center',border:false" >
         
                <div id="divSearch" class="easyui-panel" style="width: 100%;position: relative;" title="查询条件" data-options="cls:'fangtian-panel-style',onResize:autoResize">
                	<ul class="s-ul-one">
                		<li id="selectTime">
                			<span>活动开始时间：</span>
                			<!-- <input id="startDate" class="easyui-datetimebox"  style="height:24px;width:150px" data-options="editable:false,panelWidth:150"/> -->
                			<input id="startDate"  class="Wdate" type="text" style="height:24px;width: 140px; text-align: left;" onClick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss',readOnly:true})"/>
							<span>~</span>
							<!-- <input id="endDate" class="easyui-datetimebox"  style="height:24px;width:150px" data-options="editable:false,panelWidth:150"/> -->
							  <input id="endDate" class="Wdate" type="text" style="height:24px;width: 140px;text-align: left;" onClick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss',readOnly:true})"/>
                		</li>
                		<li class="s-right-one">
                			<a id="btn" href="#" class="easyui-linkbutton c100" data-options="width:80" onclick="bt_search()">查询</a>
                		</li>
                	</ul>
               </div> 
		       <div id="c-panel" class="auto-resize easyui-panel" style="width: 100%;" data-options="cls:'fangtian-panel-style bottom-padding'">
					<!-- <div id='linkbuttons'>
						<a href="#" class="easyui-linkbutton " plain="true" style="width: 80px;height: 24px;" onclick="bt_add();" data-options="iconCls:'icon-add'">新增</a>
						<a href="#" class="easyui-linkbutton " plain="true" style="width: 80px;height: 24px;" onclick="bt_modify();" data-options="iconCls:'icon-edit'">修改</a>
						<a href="#" class="easyui-linkbutton " plain="true" style="width: 80px;height: 24px;" onclick="bt_delete();" data-options="iconCls:'icon-remove'">删除</a>
						<a href="#" class="easyui-linkbutton " plain="true" style="width: 80px;height: 24px;" onclick="bt_commit();" >提交申请</a>
					</div> -->
					<div id="hdbd"></div>
					<!-- <div style="background-color: red;" class="auto-resize"></div> -->
			  </div>   
	</div>   
	<div id="hdbdxz" class="easyui-window" closed="true" modal="true" title="新增" style="display: none"
	 	 data-options="minimizable:false,maximizable:false,collapsible:false,resizable:true,modal:true,closed:true">
				<table class="formTable" style="margin:10px 20px 20px 20px" align="center">
					<tr>
			            <td class="div-label" >活动开始时间：</td>
			            <td >
			                <input id="hdStartTime" type="text" class="easyui-datetimebox" style="width:140px;" data-options="editable:false,required:true" required="true"></input> 
			            	<!-- <input id="activity_date"  class="Wdate" type="text" style="width: 120px; text-align: left;" data-options="required:true"onClick="WdatePicker({dateFmt:'yyyy-MM-dd',isShowClear:false,readOnly:true})" required="true"/> -->
			            </td>
			            <td class="div-label">活动结束时间：</td>
			            <td>
			              <input id="hdEndTime" type="text" class="easyui-datetimebox" style="width:140px;" data-options="editable:false,required:true" required="true"></input> 
			            	<!-- <input id="edit_date"  class="Wdate" type="text" style="width: 120px; text-align: left;" data-options="required:true"onClick="WdatePicker({dateFmt:'yyyy-MM-dd',isShowClear:false,readOnly:true})" required="true"/> -->
			            </td>
					</tr>
					<tr>
						<td class="div-label">联系方式：</td>
						<td >
							<input class="easyui-textbox" name="contactWay" id="contactWay" style="width:140px;" data-options="editable:true,panelWidth:110,validType:['length[11,11]']"required="true"></input>
						</td>
						<td >
						<span style="display: none">
						  <input class="easyui-textbox" name="id" id="id" style="width:140px;display: none" data-options="editable:true,panelWidth:110"required="true" ></input>
						</span>
						</td>
						<td></td>
					</tr>
					
					<tr>
						<td class="div-label">活动主题：</td>
						<td colspan="3">
							<input class="easyui-textbox"  name="subject" id="subject" class="easyui-validatebox" 
								required="true" style="width:400px; height:100px;" validType="length[0,500]" data-options="multiline:true"></input> 
						</td>
					</tr>
					<tr>
						<td class="div-label">申请说明：</td>
						<td colspan="3">
							<input class="easyui-textbox"  name="applyMemo" id="applyMemo" class="easyui-validatebox" 
								required="true" style="width:400px; height:100px;" validType="length[0,500]" data-options="multiline:true"></input> 
						</td>
					</tr>
				</table>	
	    	<div align="center" style="clear:both;margin:20px">
				<span style="margin-right:20px">
					<a id="bt_add_commit" href="#" class="easyui-linkbutton c100 shadow"  onclick="bt_add_commit();" >提交</a>
				</span>
				<span>
				    <a href="#" class="easyui-linkbutton c100 shadow"  onclick="bt_add_cancel();" >取消</a>
				</span>
			</div>
	</div>	
	<div id="hdbdck" class="easyui-window" closed="true" modal="true" title="查看" style="display: none"
	 	 data-options="minimizable:false,maximizable:false,collapsible:false,resizable:true,modal:true,closed:true">
				<table class="formTable" style="margin:10px 20px 20px 20px" align="center">
					<tr>
			            <td class="div-label" >活动开始时间：</td>
			            <td >
			                <input id="hdStartTime_ck" type="text" class="easyui-textbox" style="width:140px;" data-options="editable:false" ></input> 
			            	<!-- <input id="activity_date"  class="Wdate" type="text" style="width: 120px; text-align: left;" data-options="required:true"onClick="WdatePicker({dateFmt:'yyyy-MM-dd',isShowClear:false,readOnly:true})" required="true"/> -->
			            </td>
			            <td class="div-label">活动结束时间：</td>
			            <td>
			              <input id="hdEndTime_ck" type="text" class="easyui-textbox" style="width:140px;" data-options="editable:false"></input> 
			            	<!-- <input id="edit_date"  class="Wdate" type="text" style="width: 120px; text-align: left;" data-options="required:true"onClick="WdatePicker({dateFmt:'yyyy-MM-dd',isShowClear:false,readOnly:true})" required="true"/> -->
			            </td>
					</tr>
					<tr>
						<td class="div-label">联系方式：</td>
						<td >
							<input class="easyui-textbox" name="contactWay_ck" id="contactWay_ck" style="width:140px;" data-options="editable:false"></input>
						</td>
						<td >
						<span style="display: none">
						  <input class="easyui-textbox" name="id_ck" id="id_ck" style="width:140px;display: none" data-options="editable:false"></input>
						</span>
						</td>
						<td></td>
					</tr>
					<tr>
						<td class="div-label">活动主题：</td>
						<td colspan="3">
							<input class="easyui-textbox"  name="subject_ck" id="subject_ck" class="easyui-validatebox" 
								 style="width:400px; height:100px;" validType="length[0,500]" data-options="multiline:true,editable:false"></input> 
						</td>
					</tr>
					<tr>
						<td class="div-label">申请说明：</td>
						<td colspan="3">
							<input class="easyui-textbox"  name="applyMemo_ck" id="applyMemo_ck" class="easyui-validatebox" 
								 style="width:400px; height:100px;" validType="length[0,500]" data-options="multiline:true,editable:false"></input> 
						</td>
					</tr>
				</table>	
	</div>	
<script type="text/javascript">
		webContextRoot="<%=basePath%>";
		consId = "<%=consId%>";
		consName = "<%=consName%>";
</script>

<script src="<%=pagePath %>/jquery-easyui-1.5.1/jquery.min.js"></script>
<script src="<%=pagePath %>/jquery-easyui-1.5.1/jquery.easyui.min.js"></script>
<script src="<%=pagePath %>/jquery-easyui-1.5.1/easyui-lang-zh_CN.js"></script>
<script src="<%=pagePath %>/js/common.js"></script>
<script type="text/javascript" src="<%=pagePath%>/js/dateUtil.js"></script>
<script language="javascript" type="text/javascript" src="<%=pagePath%>/My97DatePicker/WdatePicker.js"></script>
<script src="<%=pagePath%>/js/templet_common.js">
</script><script type="text/javascript" src="hdbdshow.js"></script> 
</body>
</html>
