<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="com.frontier.pubmodule.AueicUtil"%>
<%@ page import="com.frontier.framework.model.UserInfo"%>
<%	
	String baseUrl  = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+baseUrl+"/";
	String pagePath = baseUrl + "/pages/despages/common";	
	String treePagePath = baseUrl + "/pages/areaEnergy/common";	
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN""http://www.w3c.org/TR/HTML4/loose.dtd">
<html>
<head>
<title>检修管理</title>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<link rel="stylesheet" type="text/css" href="<%=pagePath %>/lightbox/dist/css/lightbox.min.css">
<%-- <link rel="stylesheet" type="text/css" href="<%=basePath%>pages/despages/common/css/style.css"> --%>
<link rel="stylesheet" type="text/css" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/fangtian/easyui.css">
<link rel="stylesheet" type="text/css" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/icon.css">
<link rel="stylesheet" type="text/css" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/color.css">
<link rel="stylesheet" type="text/css" href="<%=pagePath %>/css/common.css">
<link rel="stylesheet" type="text/css" href="<%=treePagePath %>/css/tree.css">
<link rel="stylesheet" type="text/css" href="<%=pagePath %>/css/templet_common.css">
<link rel="stylesheet" href="<%=pagePath%>/webuploader-0.1.5/webuploader.css">
<script src="<%=pagePath %>/js/maskJs.js"></script>
    
<script src="<%=pagePath %>/js/maskJs.js"></script>
</head>

<style>
#newShiftDialog .content table {
	margin: 30px 30px 30px 30px;
}
/* .div-search {
float:left;
margin-top:10px;
margin-bottom:10px;
margin-left:10px;
color: #232323;
} */
	.lightImage{
       margin: 0 8px;
       position: relative;
       display: inline-block;
    }
    
     .deleteIcon{
	    position: relative;
	    top : -52px;
	    left : -8px;
	    width: 20px;
	    height: 20px;
	    background-color: #fd513a;
	    color: #fff;
	    border-radius: 2px;
	    display: inline-block;
	    text-align: center;
	    font-size: 14px;
	    cursor: pointer;
	}
	.deleteIcon:hover{
	    background-color: #ee160d;
	}
	.noUpload{
		cursor: pointer;
		width:10px;
		height:10px;
	}
</style>	
	<body  class="easyui-layout" >
		<script>
		    var maskobj = new maskPanelManager();
		    maskobj.register();
		</script>
	
		 
         <div id="tabs" class="easyui-tabs" data-options="border:false" style="width:100%;height:100%">
         <div id="jianxiu" title="检修管理" data-options="selected:true" style="width:100%;height:100%">
         <div class="main-panel noOverflow" data-options="region:'center'" style="width:100%;height:100%">
                <div id="divSearch" class="easyui-panel" style="width: 100%;position: relative;" title="查询条件" data-options="cls:'fangtian-panel-style',onResize:autoResize">
                	<ul class="s-ul-one">
                		<li>
                			<span>客户名称:</span>
                			<input class="easyui-combobox" style="width:155px;height:24px;" id="searchSubsName" data-options="panelWidth:155"> 
                		</li>
                		<li>
                			<span>检修内容:</span>
                			<input class="easyui-textbox" style="width:155px;height:24px;" id="searchContent" > 
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
                			<span>竣工时间:</span>
                			<select class="easyui-combobox" id="searchFinishTime"  data-options="width:155,height:24" ></select>
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
	           	<div id="c-panel" class="auto-resize easyui-panel" style="width: 100%;" data-options="cls:'fangtian-panel-style bottom-padding'" >
						<div id="gjcx-datagrid" border="false"></div>
						<!-- <div style="background-color: red;" class="auto-resize"></div> -->
				</div> 					
				<div id="tableToolDiv" style="clear:both;margin-left:10px;" class="lt">
					<a href="#" class="easyui-linkbutton" plain="true" style="width: 80px;" id="add" data-options="iconCls:'icon-add'">新增</a>
					<a href="#" class="easyui-linkbutton" plain="true" style="width: 80px;" id="update" data-options="iconCls:'icon-edit'">修改</a>
					<a href="#" class="easyui-linkbutton" plain="true" style="width: 80px;" id="delete" data-options="iconCls:'icon-remove'">删除</a>
				</div>  
           	</div>
           	</div>
           	<div id="wugong" title="无功优化" style="width:100%;height:100%">
           	<div class="main-panel noOverflow" data-options="region:'center'" style="width:100%;height:100%">
           		<div id="divSearch1" class="easyui-panel" style="width: 100%;position: relative;" title="查询条件" data-options="cls:'fangtian-panel-style',onResize:autoResize">
                	<ul class="s-ul-one">
                		<li>
                			<span>记录人:</span>
                			<input class="easyui-textbox" style="width:155px;height:24px;" id="searchRecordUser1" > 
                		</li>
                		<li>
                			<span>用户变名称:</span>
                			<input class="easyui-textbox" style="width:155px;height:24px;" id="searchSubsName1" > 
                		</li>
                		<li>
                			<span>开始时间:</span>
                			<select class="easyui-combobox" id="searchStartTime1"  data-options="width:155,height:24" ></select>
                		</li>
                		<li id="selectTime1">
                			<span>选择时间：</span>
                			<input id="BNTime1" class="easyui-datebox"  data-options="editable:false,width:155,height:24"/>
							<span>~</span>
							<input id="EdTime1" class="easyui-datebox"  data-options="editable:false,width:155,height:24"/>
                		</li>   
                		<li>
                			<span>恢复时间:</span>
                			<select class="easyui-combobox" id="searchRecoverTime1"  data-options="width:155,height:24" ></select>
                		</li>
                		<li id="selectTimeTwo1">
                			<span>选择时间：</span>
                			<input id="RNTime1" class="easyui-datebox"  data-options="editable:false,width:155,height:24"/>
							<span>~</span>
							<input id="RDTime1" class="easyui-datebox"  data-options="editable:false,width:155,height:24"/>
                		</li>             		
                		<li class="s-right-one">
                			<a id="btn1" href="#" class="easyui-linkbutton c100" data-options="onClick:bindWgyhGridData">查询</a>
                		</li>
                	</ul>
                	
           </div> 
           <div id="c-panel1" class="auto-resize easyui-panel" style="width: 100%;" data-options="cls:'fangtian-panel-style bottom-padding'">
					<div id="wgyh-datagrid"  border="false"></div>
			</div> 
				<div id="tableToolDiv1" style="clear:both;margin-left:10px;" class="lt">
					<a href="#" class="easyui-linkbutton" plain="true" style="width: 80px;" id="add1" data-options="iconCls:'icon-add'">新增</a>
					<a href="#" class="easyui-linkbutton" plain="true" style="width: 80px;" id="update1" data-options="iconCls:'icon-edit'">修改</a>
					<a href="#" class="easyui-linkbutton" plain="true" style="width: 80px;" id="delete1" data-options="iconCls:'icon-remove'">删除</a>
				</div>
           	</div>
           	</div>
        </div>
     </div> 

		     


	
	
<!-- 检修管理弹框 -->	
	 <div id="newShiftDialog" class="easyui-dialog hidden" closed="true" modal="true" title="">
		<div class="content">
			<table>
				<tr>
					<td style="width:68px;">编号：</td>
					<td><input class="easyui-textbox" id="checkNo" style="width:220px;" data-options="required:true,validType:['chinese','length[0,10]']"></td>
					<td style="width:86px;">检修结果：</td>
					<td>					
					<select id="checkResult" class="easyui-combobox" data-options="required:true,editable:false,panelHeight:'auto',panelWidth:220,width:220">   
					    <option value="0">未完成</option>   
					    <option value="1">完成</option> 
					</select> 
					</td>			
				</tr>							
				<tr>
				<td><label>客户名称：</label></td>
					<td><select id="consId" class="easyui-combotree" style="width:220px;" data-options="required:true,panelWidth:220"></select></td>					
					<td>检修设备：</td>
					<td><select id="usershebeiTree" class="easyui-combotree" style="width:220px;" data-options="required:true,editable:false,panelWidth:220" ></select></td>
				</tr>			
				<tr>
					<td>开始时间：</td>
					<td><input id="startTime" class="easyui-datetimebox" type="text"
						style="width: 220px;text-align: left;" data-options="required:true,editable:false,panelWidth:220" /></td>
					<td>竣工时间：</td>
					<td><input id="finishTime" class="easyui-datetimebox" type="text" data-options="required:true,editable:false,panelWidth:220" 
						style="width: 220px;text-align: left;" /></td>
				</tr>
				<tr>					
					<td>检修人：</td>
					<td><input class="easyui-textbox" id="checkUser" style="width:220px;" data-options="required:true,validType:['chinese','length[0,16]']"></td>	
					<td>下次检修日期：</td>
					<td><input id="nextCheckDate" class="easyui-datebox" type="text" data-options="required:true,editable:false,panelWidth:220" 
						style="width: 220px;text-align: left;" /></td>									
				</tr>	
				<tr>
					<td>检修内容：</td>
					<td colspan="3">
					<input id="content" class="easyui-textbox" data-options="multiline:true,required:true,validType:['chinese','length[0,64]']" style="width:533px;height: 64px;"></input>
					</td>
				</tr>
				<tr>
					<td>检修图片：</td>
					<td colspan="3">
						<!-- <a href="#" class="easyui-linkbutton shadow" data-options="iconCls:'icon-large-picture',size:'large',iconAlign:'top',plain:'true'" id="butA" style="width: 62px; height: 62px; vertical-align: 0;">添加照片</a> -->
						
						<div style="height: 75px; word-wrap: break-word; vertical-align: top; padding: 8px 0 5px 0;">
						<span id="theList" class="theList"></span>
				        <span id="filePicker" class="filePicker">
					        <span class="btnPic"> 
					          <a href="#" class="easyui-linkbutton shadow" data-options="iconCls:'icon-large-picture',size:'large',iconAlign:'top',plain:true"
					              id="butA" style="width: 62px; height: 62px; vertical-align: 0;">添加照片</a>
					        </span>
				        </span>
				        </div>
					</td>
				</tr>				
				<tr>
					<td>备注：</td>
					<td colspan="3">
					<input id="memo" class="easyui-textbox" data-options="multiline:true,validType:['length[0,128]']" style="width:533px;height: 64px;"></input>
					</td>
				</tr>
			</table>
		</div>
		<div id="buttons" style="text-align: center;margin-bottom:30px;">
			<a href="#" id="addBtn" class="easyui-linkbutton c100">保存</a> 
			<a href="#" id="quitBtn" class="easyui-linkbutton c100" >取消</a>
		</div>
	</div> 
<!-- 无功优化弹框 -->
<div id="newShiftDialog1" class="easyui-dialog hidden" closed="true" modal="true" title="">
		<div class="content">
			<table>
				<tr>
					<td>记录人：</td>
					<td colspan="3"><input class="easyui-textbox" id="recordUser1" style="width:388px;" 
					data-options="required:true,validType:['chinese','length[0,16]']"></td>
					
				</tr>
				<tr>
				<td><label>客户名称：</label></td>
					<td><select id="consId1" class="easyui-combotree" style="width:156px;" data-options="required:true,panelWidth:156"></select></td>
					<td><label>用户变名称：</label></td>
					<td><select class="easyui-combobox" id="subsId1" data-options="required:true,editable:false,panelWidth:156,width:156" ></select></td> 
				</tr>
				<tr>
					<td>开始时间：</td>
					<td><input id="startTime1" class="easyui-datetimebox" type="text" data-options="editable:false,required:true" 
						style="width: 156px;text-align: left;" /></td>
					<td>恢复时间：</td>
					<td><input id="recoverTime1" class="easyui-datetimebox" type="text" data-options="editable:false,required:true" 
						style="width: 156px;text-align: left;" /></td>
				</tr>
				<tr>
					<td>内容：</td>
					<td colspan="3">
					<input id="content1" class="easyui-textbox" data-options="multiline:true,required:true,validType:['chinese','length[0,64]']" 
					style="width: 388px;height: 84px;"></input>
					</td>
				</tr>
			</table>
		</div>
		<div id="buttons2" style="text-align: center;margin-bottom:30px;">
			<a href="#" id="addBtn1" class="easyui-linkbutton c100" >保存</a> 
			<a href="#" id="quitBtn1" class="easyui-linkbutton c100" >取消</a>
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
		<script type="text/javascript" src="<%=pagePath %>/ocupload/jquery.ocupload-1.1.2.js"></script>
		<script src="<%=basePath%>pages/despages/common/js/templet_common.js"></script>
		<script type="text/javascript" src="<%=pagePath%>/lightbox/dist/js/lightbox.min.js"></script>
	<script src="<%=pagePath%>/webuploader-0.1.5/webuploader.min.js"></script>
	<script type="text/javascript" src="desCheckRecord.js"></script>
</body>
</html>
