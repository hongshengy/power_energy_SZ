<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page import="com.frontier.framework.model.UserInfo" %>
<%

String baseUrl  = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+baseUrl+"/";
	String pagePath = baseUrl + "/pages/despages/common";
	session.setAttribute("itemCode","dessignManage");
    session.setAttribute("itemName","签约管理");
	String treePagePath = baseUrl + "/pages/areaEnergy/common";	
	 UserInfo info = (UserInfo)session.getAttribute("userInfo");
    Long loginUserId = info.getUserId();//登录人编码
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
    <title>签约管理</title>
     <link rel="stylesheet" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/fangtian/easyui.css">
    <link rel="stylesheet" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/icon.css">
    <link rel="stylesheet" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/color.css">
    <link rel="stylesheet" href="<%=pagePath %>/css/common.css">
    <link rel="stylesheet" type="text/css" href="<%=pagePath %>/css/templet_common.css">
    <link rel="stylesheet" href="<%=pagePath%>/webuploader-0.1.5/webuploader.css">
    <link rel="stylesheet" href="<%=treePagePath %>/css/tree.css">
    <script src="<%=pagePath %>/js/maskJs.js"></script>
    
    <style>
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
  
<body  class="easyui-layout" >
		<script>
		    var maskobj = new maskPanelManager();
		    maskobj.register();
		</script>
	 
	   <div class="main-panel noOverflow" data-options="region:'center',border:false" >
         
                <div id="divSearch" class="easyui-panel" style="width: 100%;position: relative;" title="查询条件" data-options="cls:'fangtian-panel-style',onResize:autoResize">
                	
                	<ul class="s-ul-one" >
						<li>
						    <span>参与年份:</span>
			                <span class="tools-labelgroup" >
                  				 <a id="left" href="#" style="border-style:none;">
	                       		  <img style="border-style:none;vertical-align: middle" height="14px" width="14px"  alt="前一年" src="<%=request.getContextPath() %>/images/tools-moveleft.gif"></a>
                 			</span> 
	                        <span class="tools-labelgroup" >
	                             <input id="startDate" class="Wdate" type="text" style="width: 100px;text-align: left;"  onClick="WdatePicker({dateFmt:'yyyy',onpicked:changeDate,isShowClear:false,readOnly:true})"/>
							</span>
							<span class="tools-labelgroup">
								<a id="right" href="#" style="border-style:none;">
								<img style="border-style:none;vertical-align: middle" height="14px" width="14px" alt="后一年" src="<%=request.getContextPath() %>/images/tools-moveright.gif"></a>
							
							</span>
						</li>
						<li>
                			<span>客户名称:</span>
                			<input class="easyui-textbox" style="width:150px" id="consName" > 
                		</li>
                		<li class="s-right-one">
                		<span style="vertical-align: bottom;"><a id="btn" href="#" class="easyui-linkbutton c100" data-options="onClick:selectConsName">查询</a></span>
                			
                		</li>
					</ul> 
           </div> 
           
		    <div id="c-panel" class="auto-resize easyui-panel" style="width: 100%;" data-options="cls:'fangtian-panel-style bottom-padding'">
				 <div id="btThrees">
					<a href="#" class="easyui-linkbutton" plain="true" data-options="iconCls:'icon-add',width:80,onClick:add">新增</a>                        
				   <a href="#" class="easyui-linkbutton" plain="true" data-options="iconCls:'icon-edit',width:80,onClick:updateGjpz">修改</a>
					<a href="#" class="easyui-linkbutton" plain="true" data-options="iconCls:'icon-remove',width:80,onClick:deleteGjpz">删除</a>
		         </div> 
		       <div id="gjxxpz-datagrid" title="签约管理"></div>
			</div>   
    </div> 
	 
            <div id="gjxxpz-cl-panel" class="easyui-dialog" style="width:700px;height:350px;"
				data-options="title:'签约管理',buttons:'#gjxxpz-cl-btn',modal:true,closed:true">
				<table class="form-table" style="box-sizing: border-box;width: 100%">
					<colgroup>
						<col style="width: 130px;">
						<col style="width: 50%;">
						<col style="width: 130px;">
						<col style="width: 50%;">
					</colgroup>
					<tr>
						<td class="td-label">客户名称:</td>
						<td colspan="3">
							<select class="easyui-combobox" id="userTree"  data-options="required:true,width:'100%',panelHeight:200,panelWidth:560"></select>
						</td>
						
					</tr>
					<tr>
					   <td class="td-label">客户编号:</td>
						<td >
							<label id="consNo" class="tb-group-label" style="width:100%;text-align:center;font-size:12px;">-</label>
						</td>
						<td class="td-label">合同容量(kVA):</td>
						<td>
						<label id="htrl" class="tb-group-label" style="width:100%;text-align:center;font-size:12px;">-</label>
						</td>
					</tr>
					<tr>
					   <td class="td-label">申请约定响应能力(kW):</td>
						<td>
							<input id="sqydxynl"  class="easyui-numberbox" style="width:100%" data-options="required:true,min:0,max:999999999999.9999,precision:4" >
							
						</td>
						<td class="td-label">是否能够实时响应:</td>
						<td >
							<select class="easyui-combobox" id="sfxy"   data-options="required:true,panelHeight:'auto'" style="width:100%;" ></select>
						</td>
					</tr>
					<tr>
					<td class="td-label">参与年份:</td>
					<td>
						<input id="AddjoinYear" class="Wdate"  type="text" style="width: 200px;text-align: left;"  onClick="WdatePicker({dateFmt:'yyyy',onpicked:changeDateJoinYear,isShowClear:false,readOnly:true})"/>
					</td>
					</tr>
			                             	
					<tr>
					   <td class="td-label">合同文件:</td>
					   
						<td colspan="3">
							<div id="htwj"></div>
							<a id="butA" href="#"  class="easyui-linkbutton bt_upload" style="height: 25px; vertical-align: 0;">上传</a>
						</td>
					</tr>
					<tr>
						<td class="td-label" style="vertical-align: top;">备注:</td> 
						<td colspan="3"><input id="bzName" class="easyui-textbox" name="message"  data-options="multiline:true,validType:'length[0,60]'" style="width:100%;height:80px;"></input></td>
					</tr>
				</table>
			</div>
            <div id="gjxxpz-cl-btn" style="text-align: center;height:34px;">
				<a id="btn_save" href="#" class="easyui-linkbutton c100" >保存</a>  
            	<a href="#" class="easyui-linkbutton c100" data-options="onClick:cxClose">取消</a> 
			</div>
		 
		<script type="text/javascript">
				webContextRoot="<%=basePath%>";
				loginUserId = "<%=loginUserId%>";
		</script>
		 <script src="<%=pagePath %>/jquery-easyui-1.5.1/jquery.min.js"></script>
		 <script src="<%=pagePath %>/jquery-easyui-1.5.1/jquery.easyui.min.js"></script>
		 <script src="<%=pagePath %>/jquery-easyui-1.5.1/easyui-lang-zh_CN.js"></script>
		 <script src="<%=pagePath %>/js/common.js"></script>
		 <script type="text/javascript" src="<%=pagePath%>/js/dateUtil.js"></script>
		 <script type="text/javascript" src="<%=pagePath%>/js/validator.js"></script>
		 <script language="javascript" type="text/javascript" src="<%=pagePath%>/My97DatePicker/WdatePicker.js"></script>
		 <script type="text/javascript" src="<%=pagePath %>/ocupload/jquery.ocupload-1.1.2.js"></script>
		 <script src="<%=pagePath%>/js/templet_common.js"></script>
		 <script src="<%=pagePath%>/webuploader-0.1.5/webuploader.min.js"></script>
		  
		 <script type="text/javascript" src="signManage.js"></script>
		 
	</body>
</html>
