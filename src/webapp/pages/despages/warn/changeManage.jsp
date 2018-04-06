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
    <title>交接班管理</title>
    <link rel="stylesheet" href="<%=basePath %>pages/despages/common/jquery-easyui-1.5.1/themes/fangtian/easyui.css">
    <link rel="stylesheet" href="<%=basePath %>pages/despages/common/jquery-easyui-1.5.1/themes/icon.css">
    <link rel="stylesheet" href="<%=basePath %>pages/despages/common/jquery-easyui-1.5.1/themes/color.css">
    <link rel="stylesheet" href="<%=basePath %>pages/despages/common/css/common.css">
    <link rel="stylesheet" type="text/css" href="<%=basePath %>pages/despages/common/css/templet_common.css">
    <script src="<%=basePath %>pages/despages/common/js/maskJs.js"></script>
<style>
#dialogMonitor{
	overflow: hidden;
}
#dialogMonitor iframe{
	height: 100%;
	width: 100%;
}
.icon-go{
	background:url('<%=basePath %>pages/despages/common/jquery-easyui-1.5.1/themes/icons/go.png') no-repeat center center;
}
.hidden {
	display: none;
}
</style>
</head>
<body  class="easyui-layout" >
		<script>
		    var maskobj = new maskPanelManager();
		    maskobj.register();
		</script>
	
		 <div class="main-panel noOverflow" data-options="region:'center'" border="false">
         
                <div id="divSearch" class="easyui-panel" style="width: 100%;position: relative;" title="查询条件" data-options="cls:'fangtian-panel-style',onResize:autoResize">
                	<ul class="s-ul-one">
                		<li>
                			<span>交班人:</span>
                			<input class="easyui-textbox" style="width:155px;height:24px;" id="dealUser" > 
                		</li>
                		<li>
                			<span>接班人:</span>
                			<input class="easyui-textbox" style="width:155px;height:24px;" id="carryUser" > 
                		</li>
                		<li>
                			<span>日期:</span>
                			<select class="easyui-combobox" id="searchTime"  data-options="width:155,height:24" ></select>
                		</li>
                		<li id="selectTime" class="hidden">
                			<span>选择时间：</span>
                			<input id="startTime" class="easyui-datebox"  data-options="editable:false,width:155,height:24"/>
							<span>~</span>
							<input id="endTime" class="easyui-datebox"  data-options="editable:false,width:155,height:24"/>
                		</li>
                		<li class="s-right-one">
                			<a id="btn" href="#" class="easyui-linkbutton c100" data-options="onClick:searchWork">查询</a>
                		</li>
                	</ul>
           </div> 

		    <div id="c-panel" class="auto-resize easyui-panel" style="width: 100%;" data-options="cls:'fangtian-panel-style bottom-padding'">
					<div id="workGrid" border="false"></div>
					<!-- <div style="background-color: red;" class="auto-resize"></div> -->
			</div>   
</div>	
            <div id="tableToolDiv" style="clear:both;margin-left:10px">
				<a href="#" class="easyui-linkbutton" plain="true" style="width: 80px;" id="addWork" data-options="iconCls:'icon-add'">新增</a>
				<a href="#" class="easyui-linkbutton" plain="true" style="width: 80px;" id="updatWork" data-options="iconCls:'icon-edit'">修改</a>
				<a href="#" class="easyui-linkbutton" plain="true" style="width: 80px;" id="deleteWork" data-options="iconCls:'icon-remove'">删除</a>
				<a href="#" class="easyui-linkbutton" plain="true" style="width: 80px;" id="openMonitorDaily" data-options="iconCls:'icon-go'">监控日报</a>
			</div> 

	<div id="divPanel" class="easyui-dialog" closed="true" modal="true" title="" display: none" data-options="minimizable:false,collapsible:false">
		<div style="margin-left:10px;margin-right:10px; margin-top:10px;margin-bottom:10px; " id="radio">
			<table align="center" style="margin-left:20px;margin-right:10px">					
				<tr>
					<input type="text" id="id" class="hidden" />
					<td class="lab" colspan="2">	
					<!-- 	<input id="aaa" class="Wdate" style="height:24px;width:160px;" onClick="WdatePicker({isShowClear:false,firstDayOfWeek:1,onpicked:weekDay})" />	 -->			
						<span style="float:right;">天气：<input id="weather" class="easyui-textbox" style="height:24px;width:160px" data-options="validType:['length[0,32]']"/></span>
						<span style="float:right;margin-right:10px">日期：<input id="dataDate" type="text" class="Wdate" style="height:22px;width:160px;" onfocus="WdatePicker({dateFmt:&#39;yyyy-MM-dd DD&#39,isShowClear:false,readOnly:true,isShowToday:true})" data-options="editable:false,panelWidth:160"/></span>
						<!-- <span style="float:right;margin-right:10px">日期：<input id="dataDate" type="text" class="Wdate" style="height:24px;width:160px;" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd \星期w',isShowClear:false,onpicked:weekDay,readOnly:true})" /></span> -->
					</td>	
				</tr>
				<tr>
					<td class="lab"><label>巡检记录</label></td>
					<td class="lab"><input id="xsContent" class="easyui-textbox" style="height:80px;width:670px" data-options="multiline:true,validType:['length[0,512]']"/></td>									
				</tr>
				<tr>
					<td class="lab"><label>操作记录</label></td>
					<td class="lab"><input id="opContent" class="easyui-textbox" style="height:80px;width:670px" data-options="multiline:true,validType:['length[0,512]']"/></td>
				</tr>
				<tr>
					<td class="lab" ><label>监控记录</label></td>
					<td class="lab"><input id="mnContent" class="easyui-textbox" style="height:80px;width:670px" data-options="multiline:true,validType:['length[0,512]']"/></td>
				</tr>
				<tr>
					<td class="lab"><label>交接班事项</label></td>
					<td class="lab"><input id="jjbMemo" class="easyui-textbox" style="height:80px;width:670px" data-options="multiline:true,validType:['length[0,512]']"/></td>	
				</tr>
				<tr>
					<td colspan="2">
						<span style="float:right;">交接班日期：<input id="jjbDate" class="easyui-datebox" style="height:24px;width:160px;" data-options="required:true,editable:false,panelWidth:160"/></span> 
						<span style="float:right;margin-right:10px">接班人：<input id="dealTkUser" class="easyui-textbox" style="height:24px;width:160px" data-options="required:true,validType:['length[0,32]']"/></span>
						<span style="float:right;margin-right:10px">交班人：<input id="carryTkUser" class="easyui-textbox" style="height:24px;width:160px" data-options="required:true,validType:['length[0,32]']"/></span> 
					</td>
				</tr>																														
			</table>			
			<div align="center" style="position: relative;top: 30px;">
				<a id="saveWork" href="#" class="easyui-linkbutton c100" >保存</a>
				<a id="quitWork" href="#" class="easyui-linkbutton c100" >取消</a>
			</div>
       	</div>
	</div>
	
	
	<div id="dialogMonitor" style="display: none">    
	<iframe frameborder="0"></iframe>
	</div>
<script type="text/javascript">
var basePath = '<%=basePath%>';
</script>

<script src="<%=basePath %>pages/despages/common/jquery-easyui-1.5.1/jquery.min.js"></script>
<script src="<%=basePath %>pages/despages/common/jquery-easyui-1.5.1/jquery.easyui.min.js"></script>
<script src="<%=basePath %>pages/despages/common/jquery-easyui-1.5.1/easyui-lang-zh_CN.js"></script>
<script src="<%=basePath %>pages/despages/common/js/common.js"></script>
<script type="text/javascript" src="<%=basePath%>pages/despages/common/js/dateUtil.js"></script>
<script type="text/javascript" src="<%=basePath%>pages/despages/common/My97DatePicker/WdatePicker.js"></script>
<script src="<%=basePath%>pages/despages/common/js/templet_common.js"></script>
<script type="text/javascript" src="<%=basePath %>pages/despages/warn/changeManage.js" ></script> 
 
</body>
</html>
