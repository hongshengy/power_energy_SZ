<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page import="com.frontier.framework.model.UserInfo" %>
<%
String baseUrl  = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+baseUrl+"/";
String pagePath = baseUrl + "/pages/despages/common";	
String treePagePath = baseUrl + "/pages/areaEnergy/common";	
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
    <title>资产管理</title>
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
		 <div data-options="region:'north',border:false" style="width: 100%;height: 42px; overflow: hidden; margin: 10px 0 0 10px;">
            <div class="toggleLabel-panel">
                <a href="#" onclick="checkValue('0')" class="easyui-linkbutton" data-options="width:120,toggle:true,group:'g2',plain:true,selected:true">资产入库</a>
                <a href="#" onclick="checkValue('1')" class="easyui-linkbutton" data-options="width:120,toggle:true,group:'g2',plain:true">资产出库</a>
            </div>
        </div>
		<div id="divSearch" class="easyui-panel" style="width: 100%;position: relative;" title="" data-options="cls:'fangtian-panel-style',onResize:autoResize">
			<ul class="s-ul-one" id="divSearchIn">
				<li>
				    <span>资产类别：</span>
				    <!-- editable:true, -->
					<input id="propType" style="height:24px;width:155px" size="27" data-options="editable:true,width:155,height:24"/>
				</li>
				<li>
				    <span>资产编号：</span>
				    <input id="propId" class="easyui-textbox"  style="height:24px;width:155px" >
				</li>
				<li>
				    <span>资产所属：</span>
                    <input id="propOwner" class="easyui-textbox" style="height:24px;width:155px">
				</li>
				<li>
				    <span>入库日期：</span>
              		<input id="beginDate" class="easyui-datebox"  data-options="editable:false,width:155,height:24"/>
					<span>~</span>
					<input id="endDate" class="easyui-datebox"  data-options="editable:false,width:155,height:24"/>
				</li>
				<li class="s-right-one">
					<a href="#" class="easyui-linkbutton c100" onclick="bt_search('0');" style="width: 80px;height: 24px;">查询</a>
				</li>
			</ul> 
			
			<ul class="s-ul-one" id="divSearchOut" style="display:none;">
				<li>
				    <span>资产类别：</span>
					<input id="propTypeOut" style="height:24px;width:155px" size="27" data-options="editable:true,width:155,height:24"/>
				</li>
				<li>
				    <span>资产编号：</span>
				    <input id="propIdOut" class="easyui-textbox"  style="height:24px;width:155px" >
				</li>
				<li>
				    <span>资产所属：</span>
                    <input id="propOwnerOut" class="easyui-textbox" style="height:24px;width:155px">
				</li>
				<li>
				    <span>出库日期：</span>
              		<input id="beginDateOut" class="easyui-datebox"  data-options="editable:false,width:155,height:24"/>
					<span>~</span>
					<input id="endDateOut" class="easyui-datebox"  data-options="editable:false,width:155,height:24"/>
				</li>
				<li class="s-right-one">
					<a href="#" class="easyui-linkbutton c100" onclick="bt_search('1');" style="width: 80px;height: 24px;">查询</a>
				</li>
			</ul> 
		</div>
	
		<div id="c-panel" class="auto-resize easyui-panel" style="width: 100%;" data-options="cls:'fangtian-panel-style bottom-padding'">
			<div id="tool_button">
				<a href="#" class="easyui-linkbutton" plain="true" style="width: 80px;" onclick="bt_insert();" data-options="iconCls:'icon-add'">新增</a>
				<a href="#" class="easyui-linkbutton" plain="true" style="width: 80px;" onclick="bt_update('0');" data-options="iconCls:'icon-edit'">修改</a>
				<a href="#" class="easyui-linkbutton" plain="true" style="width: 80px;" onclick="bt_delete();" data-options="iconCls:'icon-remove'">删除</a>
			</div>
			
			<!-- 资产入库查询 -->
			<div id="assetIn" style="height:100%">
          		<table id="data_gridIn" title="资产管理"></table>	
          	</div>
			
			<div id="tool_buttonOut" >
				<a href="#" class="easyui-linkbutton" plain="true" style="width: 80px;" onclick="out_insert();" data-options="iconCls:'icon-add'">新增</a>
				<a href="#" class="easyui-linkbutton" plain="true" style="width: 80px;" onclick="out_update();" data-options="iconCls:'icon-edit'">修改</a>
				<a href="#" class="easyui-linkbutton" plain="true" style="width: 80px;" onclick="out_delete();" data-options="iconCls:'icon-remove'">删除</a>
			</div>
			<!-- 资产出库查询 -->
			<div id="assetOut" style="height:100%">
          		<table id="data_gridOut" title="资产管理"></table>	
          	</div>
		</div>
</div>

	<!-- 资产入库新增 -->
	<div id="xzsbxx" class="easyui-window" closed="true" modal="true" title="新增" style="width:620px;" data-options="minimizable:false,collapsible:false">
		<div style="margin-left:10px;margin-right:10px; margin-top:10px;margin-bottom:10px; " id="radio">
			<table align="center" >
				<colgroup>
					<col width="110px">
					<col width="180px">
					<col width="110px">
					<col width="180px">
				</colgroup>
				<tr>
					<td>
						<input type="radio" name="inLoggingData" value="0" onclick="inLogging('0')" checked><label>现有资产入库</label>
					</td>
					
					<td>
						<input type="radio" name="inLoggingData" value="1" onclick="inLogging('1')"><label>录入资产信息</label>
					</td>
				</tr>
				<tr id="inConsId">
					<td class="lab">
						<label>客户名称：</label>
					</td>
					<td>
						<input id="a_consId" class="easyui-textbox" style="height:24px;width:155px" data-options="required:true,panelWidth:155,panelHeight:220">
					</td>
					<td class="lab">
						<label>设备名称：</label>
					</td>
					<td>
						<input id="a_deviceName" class="easyui-combobox" style="height:24px;width:155px" data-options="required:true">
						<input id="a_deviceName_n" type="hidden" style="height:24px;width:155px" >
					</td>
				</tr>
				<tr>
					<td class="lab"><label>资产类别：</label></td>
					<td>
						<input id="a_propType" style="height:24px;width:155px" data-options="panelWidth:155,panelHeight:220,required:true">
					</td>
					<td class="lab"><label>资产编号：</label></td><!-- 1=节能项目 2=替代项目 -->
					<td>
						<input id="a_propId" class="easyui-textbox"  style="height:24px;width:155px" data-options="required:true,validType:'length[0,16]'"> 
					</td>
				</tr>
				<tr>
					<td class="lab"><label>资产名称：</label></td>
					<td><input id="a_propName" class="easyui-textbox"  style="height:24px;width:155px" data-options="required:true,validType:'length[0,32]'">
					</td>
					<td class="lab"><label id="a_ele">规格：</label></td>
					<td><input id="a_propSpec" class="easyui-textbox" style="height:24px;width:155px"  data-options="validType:'length[0,32]'"></td>
				</tr>
				<tr>
					<td class="lab"><label>购置日期：</label></td>
					<td><input id="a_buyDate" class="easyui-datebox" style="height:24px;width:155px" data-options="required:true"></td>
					<td class="lab"><label>保修期(月)：</label></td>
					<td><input id="a_guarTime" class="easyui-textbox"  style="height:24px;width:155px" data-options="validType:'length[0,16]'"></td>
				</tr>
				<tr>
					<td class="lab"><label>使用年限：</label></td>
					<td><input id="a_useYearNum" class="easyui-textbox"  style="height:24px;width:155px" data-options="validType:'length[0,16]'"></td>
					<td class="lab"><label>计量单位：</label></td>
					<td><input id="a_prickle" class="easyui-textbox" style="height:24px;width:155px" data-options="editable:false"></td>
				</tr>
				<tr>
					<td class="lab"><label>数量：</label></td>
					<td><input id="a_propNum" class="easyui-textbox" style="height:24px;width:155px" data-options="required:true,validType:'length[0,16]'"></td>
					<td class="lab"><label>单价：</label></td>
					<td><input id="a_propPrice" class="easyui-textbox"  style="height:24px;width:155px" data-options="validType:'length[0,17]'"></td>
				</tr>
				<tr>
					<td class="lab"><label>资源所属：</label></td>
					<td><input id="a_propOwner" class="easyui-textbox" style="height:24px;width:155px" data-options="editable:false"></td>
					<td class="lab"><label>入库日期：</label></td>
					<td><input id="a_inDate" class="easyui-datebox" style="height:24px;width:155px" data-options="required:true"></td>
				</tr>
				<tr>
					<td class="lab"><label>备注：</label></td>
					<td colspan="3"><input id="a_memo" class="easyui-textbox" style="height:72px;width:450px" data-options="multiline:true,validType:'length[0,256]'"></td>
				</tr>
				<tr id="inBuqi" style="display:none;">
					<td></td><td></td>
					<td></td><td></td>
				</tr>
			</table>
			<br /><br />
			<div align="center" style="clear:both;">
				<a href="#" class="easyui-linkbutton c100 shadow" onclick="bt_add_commit();">保存</a>
				<a href="#" class="easyui-linkbutton c100 shadow"  onclick="bt_add_cancel();" >取消</a>
			</div>
       	</div>
	</div>
	
	<!-- 资产入库更新窗口 -->
	<div id="updateDialog" class="easyui-window" closed="true" modal="true" title="修改" style="width:620px;" data-options="minimizable:false,collapsible:false">
		<div style="margin-left:10px;margin-right:10px; margin-top:10px;margin-bottom:10px; " id="radio">
			<table align="center" >
				<colgroup>
					<col width="110px">
					<col width="180px">
					<col width="110px">
					<col width="180px">
				</colgroup>
				<tr id="updateRadio">
					<td>
						<input id="zeroRadio" type="radio" name="inExistingData" value="0" onclick="inExisting('0')"><label>现有资产入库</label>
					</td>
					<td>
						<input id="oneRadio" type="radio" name="inExistingData" value="1" onclick="inExisting('1')"><label>录入资产信息</label>
					</td>
				</tr>
				
				<tr id="upConsId" style="display:none;">
					<td class="lab">
						<label>客户名称：</label>
					</td>
					<td>
						<input id="u_consId" class="easyui-textbox" style="height:24px;width:155px" data-options="required:true,panelWidth:155,panelHeight:220">
					</td>
					<td class="lab">
						<label>设备名称：</label>
					</td>
					<td>
						<input id="u_deviceName" class="easyui-combobox" style="height:24px;width:155px" data-options="required:true">
						<input id="u_deviceName_n" type="hidden" style="height:24px;width:155px" >
					</td>
				</tr>
				<tr>
					<td class="lab"><label>资产类别：</label></td>
					<td>
						<input id="u_propType" style="height:24px;width:155px" data-options="panelWidth:155,panelHeight:220,required:true">
					</td>
					<td class="lab"><label>资产编号：</label></td><!-- 1=节能项目 2=替代项目 -->
					<td>
						<input id="u_propId" class="easyui-textbox"  style="height:24px;width:155px" data-options="required:true,validType:'length[0,16]'"> 
					</td>
				</tr>
				<tr>
					<td class="lab"><label>资产名称：</label></td>
					<td><input id="u_propName" class="easyui-textbox"  style="height:24px;width:155px" data-options="required:true,validType:'length[0,32]'">
					</td>
					<td class="lab"><label id="a_ele">规格：</label></td>
					<td><input id="u_propSpec" class="easyui-textbox" style="height:24px;width:155px"  data-options="validType:'length[0,32]'"></td>
				</tr>
				<tr>
					<td class="lab"><label>购置日期：</label></td>
					<td><input id="u_buyDate" class="easyui-datebox" style="height:24px;width:155px" data-options="required:true"></td>
					<td class="lab"><label>保修期(月)：</label></td>
					<td><input id="u_guarTime" class="easyui-textbox"  style="height:24px;width:155px" data-options="validType:'length[0,16]'"></td>
				</tr>
				<tr>
					<td class="lab"><label>使用年限：</label></td>
					<td><input id="u_useYearNum" class="easyui-textbox"  style="height:24px;width:155px" data-options="validType:'length[0,16]'"></td>
					<td class="lab"><label>计量单位：</label></td>
					<td><input id="u_prickle" class="easyui-textbox" style="height:24px;width:155px" data-options="editable:false"></td>
				</tr>
				<tr>
					<td class="lab"><label>数量：</label></td>
					<td><input id="u_propNum" class="easyui-textbox" style="height:24px;width:155px" data-options="required:true,validType:'length[0,16]'"></td>
					<td class="lab"><label>单价：</label></td>
					<td><input id="u_propPrice" class="easyui-textbox"  style="height:24px;width:155px" data-options="validType:'length[0,17]'"></td>
				</tr>
				<tr>
					<td class="lab"><label>资源所属：</label></td>
					<td><input id="u_propOwner" class="easyui-textbox" style="height:24px;width:155px" data-options="editable:false"></td>
					<td class="lab"><label>入库日期：</label></td>
					<td><input id="u_inDate" class="easyui-datebox" style="height:24px;width:155px" data-options="required:true"></td>
				</tr>
				<tr>
					<td class="lab"><label>备注：</label></td>
					<td colspan="3"><input id="u_memo" class="easyui-textbox" style="height:72px;width:450px" data-options="multiline:true,validType:'length[0,256]'"></td>
				</tr>
				<tr id="inUpBuqi" style="display:none;height:26px;">
					<td>&nbsp;&nbsp;&nbsp;</td><td>&nbsp;&nbsp;&nbsp;</td>
					<td>&nbsp;&nbsp;&nbsp;</td><td>&nbsp;&nbsp;&nbsp;</td>
				</tr>
			</table>
			<br/><br/>
			<div id="inButton" align="center" style="clear:both;display:none;">
				<a href="#" class="easyui-linkbutton c100 shadow" onclick="bt_update_commit();">保存</a>
				<a href="#" class="easyui-linkbutton c100 shadow"  onclick="bt_update_cancel();" >取消</a>
			</div>
       	</div>
	</div>
	
	<!-- 资产入库详情窗口 -->
	<div id="xmxq" class="easyui-window" closed="true" modal="true" title="详情" style="width:660px;" data-options="minimizable:false,collapsible:false">
		<div style="margin-left:10px;margin-right:10px; margin-top:10px;margin-bottom:10px; " id="radio">
			<table align="center" >
				<colgroup>
					<col width="110px">
					<col width="180px">
					<col width="110px">
					<col width="180px">
				</colgroup>
				<tr id="consIdByIn" style="display:none;height:24px;width:155px;">
					<td class="lab">
						<label>客户名称：</label>
					</td>
					<td class="lab">
						<label id="info_consId"></label>
					</td>
					<td class="lab">
						<label>设备名称：</label>
					</td>
					<td class="lab">
						<label id="info_deviceName"></label>
					</td>
				</tr>
				<tr style="height:24px;width:155px" >
					<td class="lab"><label>资产类别：</label></td>
					<td class="lab">
						<label id="info_propType"></label>
					</td>
					<td class="lab"><label>资产编号：</label></td><!-- 1=节能项目 2=替代项目 -->
					<td class="lab">
						<label id="info_propId"></label>
					</td>
				</tr>
				<tr style="height:24px;width:155px" >
					<td class="lab"><label>资产名称：</label></td>
					<td class="lab">
						<label id="info_propName"></label>
					</td>
					<td class="lab"><label id="a_ele">规格：</label></td>
					<td class="lab">
						<label id="info_propSpec"></label>
					</td>
				</tr>
				<tr style="height:24px;width:155px">
					<td class="lab"><label>购置日期：</label></td>
					<td class="lab">
						<label id="info_buyDate"></label>
					</td>
					<td class="lab"><label>保修期(月)：</label></td>
					<td class="lab">
						<label id="info_guarTime"></label>
					</td>
				</tr>
				<tr style="height:24px;width:155px">
					<td class="lab"><label>使用年限：</label></td>
					<td class="lab">
						<label id="info_useYearNum"></label>	
					</td>
					<td class="lab"><label>计量单位：</label></td>
					<td class="lab">
						<label id="info_prickle"></label>	
					</td>
				</tr>
				<tr style="height:24px;width:155px">
					<td class="lab"><label>数量：</label></td>
					<td class="lab">
						<label id="info_propNum"></label>
					</td>
					<td class="lab"><label>单价：</label></td>
					<td class="lab">
						<label id="info_propPrice"></label>
					</td>
				</tr>
				<tr style="height:24px;width:155px">
					<td class="lab"><label>资源所属：</label></td>
					<td class="lab">
						<label id="info_propOwner"></label>	
					</td>
					<td class="lab"><label>入库日期：</label></td>
					<td class="lab">
						<label id="info_inDate"></label>	
					</td>
				</tr>
				<tr style="height:24px;width:155px">
					<td class="lab"><label>备注：</label></td>
					<td colspan="3">
						<label id="info_memo"></label>
					</td>
				</tr>
				<tr id="buqiByIn" style="display:none;">
					<td class="lab"></td><td></td>
					<td class="lab"></td><td></td>
				</tr>
			</table>
			<br/><br/>
       	</div>
	</div>

	<!-- 资产出库新增 -->
	<div id="outInsert" class="easyui-dialog"  title="电量概览" style="align:center;overflow:hidden;z-index:3"
        data-options="minimizable:false,maximizable:true,collapsible:false,resizable:true,modal:true,closed:true"> 
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
						<label>客户名称：</label>
					</td>
					<td>
						<input id="out_a_consId" class="easyui-textbox" style="height:24px;width:155px" data-options="required:true,panelWidth:155,panelHeight:220">
					</td>
					<td class="lab">
						<label>设备名称：</label>
					</td>
					<td>
						<input id="out_a_deviceName" class="easyui-combobox" style="height:24px;width:155px" data-options="required:true">
						<input id="out_a_deviceName_n" type="hidden" style="height:24px;width:155px" >
					</td>
				</tr>
				<tr>
					<td class="lab"><label>资产类别：</label></td>
					<td>
						<input id="out_a_propType" style="height:24px;width:155px" data-options="panelWidth:155,panelHeight:220,required:true">
					</td>
					<td class="lab"><label>资产编号：</label></td><!-- 1=节能项目 2=替代项目 -->
					<td>
						<input id="out_a_propId" class="easyui-textbox"  style="height:24px;width:155px" data-options="required:true,validType:'length[0,16]'"> 
					</td>
				</tr>
				<tr>
					<td class="lab"><label>资产名称：</label></td>
					<td><input id="out_a_propName" class="easyui-textbox"  style="height:24px;width:155px" data-options="required:true,validType:'length[0,32]'">
					</td>
					<td class="lab"><label id="a_ele">规格：</label></td>
					<td><input id="out_a_propSpec" class="easyui-textbox" style="height:24px;width:155px"  data-options="validType:'length[0,32]'"></td>
				</tr>
				<tr>
					<td class="lab"><label>购置日期：</label></td>
					<td><input id="out_a_buyDate" class="easyui-datebox" style="height:24px;width:155px" data-options="required:true"></td>
					<td class="lab"><label>保修期(月)：</label></td>
					<td><input id="out_a_guarTime" class="easyui-textbox"  style="height:24px;width:155px" data-options="validType:'length[0,16]'"></td>
				</tr>
				<tr>
					<td class="lab"><label>使用年限：</label></td>
					<td><input id="out_a_useYearNum" class="easyui-textbox"  style="height:24px;width:155px" data-options="validType:'length[0,16]'"></td>
					<td class="lab"><label>计量单位：</label></td>
					<td><input id="out_a_prickle" class="easyui-textbox" style="height:24px;width:155px" data-options="editable:false"></td>
				</tr>
				<tr>
					<td class="lab"><label>数量：</label></td>
					<td><input id="out_a_propNum" class="easyui-textbox" style="height:24px;width:155px" data-options="required:true,validType:'length[0,16]'"></td>
					<td class="lab"><label>单价：</label></td>
					<td><input id="out_a_propPrice" class="easyui-textbox"  style="height:24px;width:155px" data-options="validType:'length[0,17]'"></td>
				</tr>
				<tr>
					<td class="lab"><label>资源所属：</label></td>
					<td><input id="out_a_propOwner" class="easyui-textbox" style="height:24px;width:155px" data-options="editable:false"></td>
					<td class="lab"><label>领用日期：</label></td>
					<td><input id="out_a_useDate" class="easyui-datebox" style="height:24px;width:155px" data-options="required:true"></td>
				</tr>
				<tr>
					<td class="lab"><label>领用部门：</label></td>
					<td><input id="out_a_useDep" class="easyui-textbox" style="height:24px;width:155px" data-options="required:true,validType:'length[0,32]'"></td>
					<td class="lab"><label>领用人：</label></td>
					<td><input id="out_a_usePeople" class="easyui-textbox" style="height:24px;width:155px" data-options="required:true,validType:'length[0,32]'"></td>
				</tr>
				<tr>
					<td class="lab"><label>备注：</label></td>
					<td colspan="3"><input id="out_a_memo" class="easyui-textbox" style="height:72px;width:450px" data-options="multiline:true,validType:'length[0,256]'"></td>
				</tr>
			</table>
			<br /><br />
			<div align="center" style="clear:both;">
				<a href="#" class="easyui-linkbutton c100 shadow" onclick="out_add_commit();">保存</a>
				<a href="#" class="easyui-linkbutton c100 shadow"  onclick="out_add_cancel();" >取消</a>
			</div>
       	</div>
	</div>
	
	<!-- 资产出库更新 -->
	<div id="out_updateDialog" class="easyui-window" closed="true" modal="true" title="修改" style="width:620px;" data-options="minimizable:false,collapsible:false">
		<div style="margin-left:10px;margin-right:10px; margin-top:10px;margin-bottom:10px; " id="radio">
			<table align="center" >
				<colgroup>
					<col width="110px">
					<col width="180px">
					<col width="110px">
					<col width="180px">
				</colgroup>
				<tr id="outConsId">
					<td class="lab">
						<label>客户名称：</label>
					</td>
					<td>
						<input id="out_u_consId" class="easyui-textbox" style="height:24px;width:155px" data-options="required:true,panelWidth:155,panelHeight:220">
					</td>
					<td class="lab">
						<label>设备名称：</label>
					</td>
					<td>
						<input id="out_u_deviceName" class="easyui-combobox" style="height:24px;width:155px" data-options="required:true">
						<input id="out_u_deviceName_n" type="hidden" style="height:24px;width:155px" >
					</td>
				</tr>
				<tr>
					<td class="lab"><label>资产类别：</label></td>
					<td>
						<input id="out_u_propType" style="height:24px;width:155px" data-options="panelWidth:155,panelHeight:220,required:true">
					</td>
					<td class="lab"><label>资产编号：</label></td><!-- 1=节能项目 2=替代项目 -->
					<td>
						<input id="out_u_propId" class="easyui-textbox"  style="height:24px;width:155px" data-options="required:true,validType:'length[0,16]'"> 
					</td>
				</tr>
				<tr>
					<td class="lab"><label>资产名称：</label></td>
					<td><input id="out_u_propName" class="easyui-textbox"  style="height:24px;width:155px" data-options="required:true,validType:'length[0,32]'">
					</td>
					<td class="lab"><label id="a_ele">规格：</label></td>
					<td><input id="out_u_propSpec" class="easyui-textbox" style="height:24px;width:155px"  data-options="validType:'length[0,32]'"></td>
				</tr>
				<tr>
					<td class="lab"><label>购置日期：</label></td>
					<td><input id="out_u_buyDate" class="easyui-datebox" style="height:24px;width:155px" data-options="required:true"></td>
					<td class="lab"><label>保修期(月)：</label></td>
					<td><input id="out_u_guarTime" class="easyui-textbox"  style="height:24px;width:155px" data-options="validType:'length[0,16]'"></td>
				</tr>
				<tr>
					<td class="lab"><label>使用年限：</label></td>
					<td><input id="out_u_useYearNum" class="easyui-textbox"  style="height:24px;width:155px" data-options="validType:'length[0,16]'"></td>
					<td class="lab"><label>计量单位：</label></td>
					<td><input id="out_u_prickle" class="easyui-textbox" style="height:24px;width:155px" data-options="editable:false"></td>
				</tr>
				<tr>
					<td class="lab"><label>数量：</label></td>
					<td><input id="out_u_propNum" class="easyui-textbox" style="height:24px;width:155px" data-options="required:true,validType:'length[0,16]'"></td>
					<td class="lab"><label>单价：</label></td>
					<td><input id="out_u_propPrice" class="easyui-textbox"  style="height:24px;width:155px" data-options="validType:'length[0,17]'"></td>
				</tr>
				<tr>
					<td class="lab"><label>资源所属：</label></td>
					<td><input id="out_u_propOwner" class="easyui-textbox" style="height:24px;width:155px" data-options="editable:false"></td>
					<td class="lab"><label>领用日期：</label></td>
					<td><input id="out_u_useDate" class="easyui-datebox" style="height:24px;width:155px" data-options="required:true"></td>
				</tr>
				<tr>
					<td class="lab"><label>领用部门：</label></td>
					<td><input id="out_u_useDep" class="easyui-textbox" style="height:24px;width:155px" data-options="required:true,validType:'length[0,32]'"></td>
					<td class="lab"><label>领用人：</label></td>
					<td><input id="out_u_usePeople" class="easyui-textbox" style="height:24px;width:155px" data-options="required:true,validType:'length[0,32]'"></td>
				</tr>
				<tr>
					<td class="lab"><label>备注：</label></td>
					<td colspan="3"><input id="out_u_memo" class="easyui-textbox" style="height:72px;width:450px" data-options="multiline:true,validType:'length[0,256]'"></td>
				</tr>
				<tr id="outUpBuqi">
					<td></td><td></td>
					<td></td><td></td>
				</tr>
			</table>
			<br /><br />
			<div id="outButton" align="center" style="clear:both;">
				<a href="#" class="easyui-linkbutton c100 shadow" onclick="out_up_commit();">保存</a>
				<a href="#" class="easyui-linkbutton c100 shadow"  onclick="out_up_cancel();" >取消</a>
			</div>
       	</div>
	</div>
	
	<!-- 资产入库更新窗口 -->
	<div id="xmxqOut" class="easyui-window" closed="true" modal="true" title="详情" style="width:660px;" data-options="minimizable:false,collapsible:false">
		<div style="margin-left:10px;margin-right:10px; margin-top:10px;margin-bottom:10px; " id="radio">
			<table align="center" >
			
	<!-- <div id="outInfoDialog" class="easyui-dialog" closed="true" modal="true" title="详情" style="width:660px;" data-options="minimizable:false,collapsible:false">
		<div style="margin-left:10px;margin-right:10px; margin-top:10px;margin-bottom:10px;">
			<table align="center" >	 -->	
				<colgroup>
					<col width="110px">
					<col width="180px">
					<col width="110px">
					<col width="180px">
				</colgroup>
				<tr id="outInfoConsId" style="height:24px;width:155px">
					<td class="lab">
						<label>客户名称：</label>
					</td>
					<td class="lab">
						<label id="info_out_consId"></label>	
					</td>
					<td class="lab">
						<label>设备名称：</label>
					</td>
					<td class="lab">
						<label id="info_out_deviceName"></label>	
					</td>
				</tr>
				<tr style="height:24px;width:155px">
					<td class="lab"><label>资产类别：</label></td>
					<td class="lab">
						<label id="info_out_propType"></label>	
					</td>
					<td class="lab"><label>资产编号：</label></td>
					<td class="lab">
						<label id="info_out_propId"></label>	
					</td>
				</tr>
				<tr style="height:24px;width:155px">
					<td class="lab"><label>资产名称：</label></td>
					<td class="lab">
						<label id="info_out_propName"></label>	
					</td>
					<td class="lab"><label id="a_ele">规格：</label></td>
					<td class="lab">
						<label id="info_out_propSpec"></label>	
					</td>
				</tr>
				<tr style="height:24px;width:155px">
					<td class="lab"><label>购置日期：</label></td>
					<td class="lab">
						<label id="info_out_buyDate"></label>	
					</td>
					<td class="lab"><label>保修期(月)：</label></td>
					<td class="lab">
						<label id="info_out_guarTime"></label>		
					</td>
				</tr>
				<tr style="height:24px;width:155px">
					<td class="lab"><label>使用年限：</label></td>
					<td class="lab">
						<label id="info_out_useYearNum"></label>
					</td>
					<td class="lab"><label>计量单位：</label></td>
					<td class="lab">
						<label id="info_out_prickle"></label>
					</td>
				</tr>
				<tr style="height:24px;width:155px">
					<td class="lab"><label>数量：</label></td>
					<td class="lab">
						<label id="info_out_propNum"></label>	
					</td>
					<td class="lab"><label>单价：</label></td>
					<td class="lab">
						<label id="info_out_propPrice"></label>
					</td>
				</tr>
				<tr style="height:24px;width:155px">
					<td class="lab"><label>资源所属：</label></td>
					<td class="lab">
						<label id="info_out_propOwner"></label>
					</td>
					<td class="lab"><label>出库日期：</label></td>
					<td class="lab">
						<label id="info_out_useDate"></label>
					</td>
				</tr>
				<tr style="height:24px;width:155px">
					<td class="lab"><label>领用部门：</label></td>
					<td class="lab">
						<label id="info_out_useDep"></label>
					</td>
					<td class="lab"><label>领用人：</label></td>
					<td class="lab">
						<label id="info_out_usePeople"></label>
					</td>
				</tr>
				<tr style="height:24px;width:155px">
					<td class="lab"><label>备注：</label></td>
					<td colspan="3">
						<label id="info_out_memo"></label>
					</td>
				</tr>
			</table>
			<br/><br/>
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
<script src="<%=pagePath%>/js/templet_common.js"></script>
<script type="text/javascript" src="assetManage.js"></script> 
</body>
</html>
