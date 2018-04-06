<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%

String baseUrl  = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+baseUrl+"/";
String pagePath = baseUrl + "/pages/despages/common";
String treePagePath = baseUrl + "/pages/areaEnergy/common";
String consId = request.getParameter("consId");//获取调用父页面传过来的参数
String consName = request.getParameter("consName");//获取调用父页面传过来的参数	
	
%>

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
    <title>业务代办</title>
    <link rel="stylesheet" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/fangtian/easyui.css">
    <link rel="stylesheet" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/icon.css">
    <link rel="stylesheet" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/color.css">
    <link rel="stylesheet" href="<%=pagePath %>/css/common.css">
    <link rel="stylesheet" type="text/css" href="<%=pagePath %>/css/templet_common.css">
    <link rel="stylesheet" href="<%=treePagePath%>/css/tree.css">
    <script src="<%=pagePath %>/js/maskJs.js"></script>
    </head>
  
<body class="easyui-layout" >
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
width:80px;
line-height:24px;
}
#div-data {
margin:0px 10px;
}
</style>

 <div class="main-panel noOverflow" data-options="region:'center',border:false" >
           <div id="divSearch" class="easyui-panel" style="width: 100%;position: relative;" title="查询条件" data-options="cls:'fangtian-panel-style',onResize:autoResize">
           	<ul class="s-ul-one">
           		<li>
           			<span>业务类型：</span>
           			<input id="businessType" class="easyui-combobox" style="height:24px;width:120px" data-options="editable:false,prompt:'请选择',panelHeight:'auto'"/>  
           		</li>
           		<li>
           			<span>办理进度：</span>
           			<input id="businessStep" class="easyui-combobox" style="height:24px;width:120px" data-options="editable:false,prompt:'请选择',panelHeight:'auto'"/> 
           		</li>
           		<li id="selectTime">
           			<span>申请时间：</span>
					<!-- <input id="startDate" class="easyui-datetimebox"  style="height:24px;width:145px" data-options="editable:false,panelWidth:150"/> -->
					<input id="startDate" class="Wdate" type="text" style="height:24px;width: 155px;text-align: left;"  onClick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss',readOnly:true})"/>
					<span>~</span>
					<!-- <input id="endDate" class="easyui-datetimebox"  style="height:24px;width:145px" data-options="editable:false,panelWidth:150"/> -->
						<input id="startDate" class="Wdate" type="text" style="height:24px;width: 155px;text-align: left;"  onClick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss',readOnly:true})"/>
           		</li>
           		<li class="s-right-one">
           			<a href="#" class="easyui-linkbutton c100" style="width: 80px;height: 24px;" onclick="bt_search()" >查询</a>
           		</li>
           	</ul>
      </div> 
       
	 <div id="c-panel" class="auto-resize easyui-panel" style="width: 100%;" data-options="cls:'fangtian-panel-style bottom-padding'">
		<div id='linkbuttons'>
			<a href="#" class="easyui-linkbutton " plain="true" style="width: 80px;height: 24px;" onclick="bt_add();" data-options="iconCls:'icon-add'">新增</a>
			<a href="#" class="easyui-linkbutton " plain="true" style="width: 80px;height: 24px;" onclick="bt_modify();" data-options="iconCls:'icon-edit'">修改</a>
			<a href="#" class="easyui-linkbutton " plain="true" style="width: 80px;height: 24px;" onclick="bt_delete();" data-options="iconCls:'icon-remove'">删除</a>
			<a href="#" class="easyui-linkbutton " plain="true" style="width: 80px;height: 24px;" onclick="bt_commit();" >提交申请</a>
		</div>
		<div id="ywdb"></div>
	</div>
</div>  
  
	<div id="ywdbxz" class="easyui-window" closed="true" modal="true" title="新增" style="display: none"
	 	 data-options="minimizable:false,maximizable:false,collapsible:false,resizable:true,modal:true,closed:true">
	<!-- 	<div class="easyui-panel" style="width:100%;" data-options="cls:'fangtian-panel-style'"> -->
		<div id="divSearch" class="easyui-panel" style="width: 100%;position: relative;" title="企业基本信息" data-options="cls:'fangtian-panel-style',onResize:autoResize">
           	<ul class="s-ul-one">
           		<li>
           			<label id="consName" ></label>
           		</li>
           		<li>
           			<label id="consNo" ></label>
           		</li>
           		<li>
           		<label id="address"></label>
           		</li>
           	</ul>
      </div> 
	  <div class="easyui-panel" style="width: 100%;position: relative;" title="申请人信息" data-options="cls:'fangtian-panel-style',onResize:autoResize">
           	<ul class="s-ul-one">
           		<li>
           			<span>申请人：</span>
           			<input id="userName" class="easyui-textbox" style="height:24px;width:155px" data-options="required:true,validType:['length[0,10]']"/> 
           		</li>
           		<li>
           			<span>联系方式</span>
           			<input id="mobile" class="easyui-textbox" style="height:24px;width:155px" required="true" data-options="required:true,validType:['telephone']"/> 
           		</li>
           		<li style="display:none">
           			<input id="id" class="easyui-textbox" style="height:24px;width:155px" required="true" /> 
           		</li>
           	</ul>
      </div> 
				<!-- <div class="easyui-panel" style="width:100%;margin-bottom:10px;" border="false" data-options="cls:'fangtian-panel-style'">
					<label id="consNo" style="margin:10px 0px 10px 40px;">客户编号</label>
					<label id="consName" style="margin:10px 0px 10px 70px;">客户名称:</label>
					<label id="address" style="margin:10px 0px 10px 70px;">用电地址:</label>
				</div> -->
				<!-- <div class="easyui-panel" style="width:100%;margin-bottom:10px;" border="false" data-options="cls:'fangtian-panel-style'">
					<div class="div-search" style="margin-left:40px">
						申请人：<input id="userName" class="easyui-textbox" style="height:24px;width:155px" required="true"/> 
					</div>
					<div class="div-search" style="margin-left:40px">
						联系方式：<input id="mobile" class="easyui-textbox" style="height:24px;width:155px" required="true" data-options="required:true,validType:['telephone']"/> 
					</div>
					<div style="display:none" >
					<input id="id" class="easyui-textbox" style="height:24px;width:155px;display:none" readonly="true" />
					</div>
				</div> -->
				  <div  class="easyui-panel" style="width: 100%;position: relative;" title="业务申请信息" data-options="cls:'fangtian-panel-style',onResize:autoResize">
					<table>
						<tr><td width="100px" height="24px">业务类型：</td>
							<td height="24px"><input id="businessType_xz" class="easyui-combobox" style="height:24px;width:155px" data-options="editable:false,prompt:'请选择',panelHeight:'auto',panelWidth:155"/> </td>
							<td width="100px" height="24px">申请备注：</td>
							<td rowspan="5"><input class="easyui-textbox"  name="applyMemo" id="applyMemo_xz" 
								required="true" style="width:400px; height:100%;" validType="length[0,150]" data-options="multiline:true"></input> </td>
						</tr>
						<tr><td id="warn" colspan="2" width="100px" height="24px" ></td><td></td></tr>
						<tr><td id="planStopDate_label" width="150px" height="24px"></td><td id="planStopDate_input"></td><td></td></tr>
						<tr><td id="planRecoverDate_label" width="150px" height="24px"></td><td id="planRecoverDate_input"></td><td></td></tr>
						<tr><td id="applySuspendCap_label" width="150px" height="24px"></td><td id="applySuspendCap_input"></td><td></td></tr>
					</table>
				</div>
			<!-- </div>	 -->
	    	<div align="center" style="clear:both;margin:20px">
				<span style="margin-right:20px">
					<a id="bt_add_commit" href="#" class="easyui-linkbutton c100 shadow"  onclick="bt_add_commit();" >保存</a>
				</span>
				<span style="margin-right:20px">
					<a id="bt_update_commit" href="#" class="easyui-linkbutton c100 shadow"  onclick="bt_update_commit();" >保存</a>
				</span>
				<span>
				    <a href="#" class="easyui-linkbutton c100 shadow"  onclick="bt_add_cancel();" >取消</a>
				</span>
			</div>
	</div>
	<div id="ywdbck" class="easyui-window" closed="true" modal="true" title="详情" style="display: none"
	data-options="minimizable:false,maximizable:false,collapsible:false,resizable:true,modal:true,closed:true">
			<div  class="easyui-panel" style="width: 100%;position: relative;" title="企业基本信息" data-options="cls:'fangtian-panel-style',onResize:autoResize">
	           	<ul class="s-ul-one">
	           		<li>
	           			<label id="consName_ck" ></label>
	           		</li>
	           		<li>
	           			<label id="consNo_ck" ></label>
	           		</li>
	           		<li>
	           		<label id="address_ck"></label>
	           		</li>
	           	</ul>
	      </div> 
		 <div class="easyui-panel" style="width: 100%;position: relative;" title="申请人信息" data-options="cls:'fangtian-panel-style',onResize:autoResize">
		         	<ul class="s-ul-one">
		         		<li>
		         			<span>申请人：</span>
		         			<input id="userName_ck" class="easyui-textbox" style="height:24px;width:155px" required="true" readonly="true"/> 
		         		</li>
		         		<li>
		         			<span>联系方式</span>
		         			<input id="mobile_ck" class="easyui-textbox" style="height:24px;width:155px" required="true"  readonly="true"/> 
		         		</li>
		         	</ul>
		    </div> 
			<div  class="easyui-panel" style="width: 100%;position: relative; margin-bottom:10px;" title="业务申请信息" data-options="cls:'fangtian-panel-style',onResize:autoResize">
					<table>
						<tr><td width="100px" height="24px">业务类型：</td>
							<td height="24px"><input id="businessType_ck" class="easyui-combobox" style="height:24px;width:155px" data-options="editable:false,prompt:'请选择',panelHeight:'auto'" readonly="true"/> </td>
							<td width="100px" height="24px">申请备注：</td>
							<td rowspan="5"><input class="easyui-textbox"  name="applyMemo" id="applyMemo_ck" 
								required="true" style="width:400px; height:100%;" validType="length[0,500]" data-options="multiline:true" readonly="true"></input> </td>
						</tr>
						<tr><td id="warn_ck" colspan="2" width="100px" height="24px"></td><td></td></tr>
						<tr><td id="planStopDate_ck_label" width="150px" height="24px"></td><td id="planStopDate_ck_input"></td><td></td></tr>
						<tr><td id="planRecoverDate_ck_label" width="150px" height="24px"></td><td id="planRecoverDate_ck_input"></td><td></td></tr>
						<tr><td id="applySuspendCap_ck_label" width="150px" height="24px"></td><td id="applySuspendCap_ck_input"></td><td></td></tr>
					</table>
				</div>
			
			<!-- <div class="easyui-panel" style="width:100%;" data-options="cls:'fangtian-panel-style'">
				<div class="easyui-panel" style="width:100%;margin-bottom:10px;" border="false" data-options="cls:'fangtian-panel-style'">
					<label id="consNo_ck" style="margin:10px 0px 10px 40px;">客户编号</label>
					<label id="consName_ck" style="margin:10px 0px 10px 70px;">客户名称:</label>
					<label id="address_ck" style="margin:10px 0px 10px 70px;">用电地址:</label>
				</div>
				<div class="easyui-panel" style="width:100%;margin-bottom:10px;" border="false" data-options="cls:'fangtian-panel-style'">
					<div class="div-search" style="margin-left:40px">
						申请人：<input id="userName_ck" class="easyui-textbox" style="height:24px;width:155px" readonly="true"/> 
					</div>
					<div class="div-search" style="margin-left:40px">
						联系方式：<input id="mobile_ck" class="easyui-textbox" style="height:24px;width:155px" readonly="true"/> 
					</div>
				</div> -->
				<!-- <div class="easyui-panel" style="width:100%;margin-bottom:10px;" border="false" data-options="cls:'fangtian-panel-style'">
					<table>
						<tr><td width="100px" height="24px">业务类型：</td>
							<td height="24px"><input id="businessType_ck" class="easyui-combobox" style="height:24px;width:155px" data-options="editable:false,prompt:'请选择',panelHeight:'auto'" readonly="true"/> </td>
							<td width="100px" height="24px">申请备注：</td>
							<td rowspan="5"><input class="easyui-textbox"  name="applyMemo" id="applyMemo_ck" 
                               required="true" style="width:400px; height:100%;" validType="length[0,500]" data-options="multiline:true" readonly="true"></input> </td>
						</tr>
						<tr><td id="warn_ck" colspan="2" width="100px" height="24px"></td><td></td></tr>
						<tr><td id="planStopDate_ck_label" width="150px" height="24px"></td><td id="planStopDate_ck_input"></td><td></td></tr>
						<tr><td id="planRecoverDate_ck_label" width="150px" height="24px"></td><td id="planRecoverDate_ck_input"></td><td></td></tr>
						<tr><td id="applySuspendCap_ck_label" width="150px" height="24px"></td><td id="applySuspendCap_ck_input"></td><td></td></tr>
					</table>
				</div> -->
			<!-- </div>	 -->
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
<script type="text/javascript" src="<%=pagePath%>/js/validator.js"></script>
<script language="javascript" type="text/javascript" src="<%=pagePath%>/My97DatePicker/WdatePicker.js"></script>
<script src="<%=pagePath%>/js/templet_common.js"></script>
<script type="text/javascript" src="businessDeals.js"></script>
</body>
</html>
