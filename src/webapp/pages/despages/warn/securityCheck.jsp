<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page import="com.frontier.framework.model.UserInfo" %>
<%

String baseUrl  = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+baseUrl+"/";
	String pagePath = baseUrl + "/pages/despages/common";
	session.setAttribute("itemCode","dessecurityCheck");
    session.setAttribute("itemName","安全检查");
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
    <title>安全检查</title>
    
    <link rel="stylesheet" type="text/css" href="<%=pagePath %>/lightbox/dist/css/lightbox.min.css">
    <link rel="stylesheet" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/fangtian/easyui.css">
    <link rel="stylesheet" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/icon.css">
    <link rel="stylesheet" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/color.css">
    <link rel="stylesheet" href="<%=pagePath %>/css/common.css">
    <link rel="stylesheet" type="text/css" href="<%=pagePath %>/css/templet_common.css">
    <link rel="stylesheet" href="<%=pagePath%>/webuploader-0.1.5/webuploader.css">
    <script src="<%=pagePath %>/js/maskJs.js"></script>
</head>
<style>

 /*  #gjxxpz-cl-panel .deleteIcon{
        position: absolute;
        right: -8px;
        width: 20px;
        height: 20px;
        background-color: #fd513a;
        color: #fff;
        border-radius: 2px;
        display: inline-block;
        text-align: center;
        font-size: 14px;
    }
      #gjxxpz-cl-panel .lightImage{
        margin: 0 8px;
        position: relative;
        display: inline-block;
    }
      #gjxxpz-cl-panel .deleteIcon:hover{
        background-color: #ee160d;
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
	
		 <div class="main-panel noOverflow" data-options="region:'center',border:false" >
             <div id="divSearch" class="easyui-panel" style="width: 100%;position: relative;" title="查询条件" data-options="cls:'fangtian-panel-style',onResize:autoResize">
                	<ul class="s-ul-one">
                		<li>
                			<span>巡视人:</span>
                			<input class="easyui-textbox" style="width:155px;height:24px;" id="checkName" > 
                		</li>
                		<li>
                			<span>建筑名称:</span>
                			<input class="easyui-textbox" style="width:155px;height:24px;" id="subsName" > 
                		</li>
                		<li>
                			<span>日期:</span>
                			<select class="easyui-combobox" id="selectTime"  data-options="width:155,height:24" ></select>
                		</li>
                		<li id="sTime" style="display: none;">
                			<span>选择时间：</span>
                			<input id="startTime" class="easyui-datebox"  data-options="editable:false,width:155,height:24"/>
							<span>~</span>
							<input id="endTime" class="easyui-datebox"  data-options="editable:false,width:155,height:24"/>
                		</li>
                		<li class="s-right-one">
                			<a id="btn" href="#" class="easyui-linkbutton c100" data-options="onClick:selectConsName">查询</a>
                		</li>
                	</ul>
           </div> 
           <div id="c-panel" class="auto-resize easyui-panel" style="width: 100%;" data-options="cls:'fangtian-panel-style bottom-padding'">
			   <div id="btThrees" align="right" style="margin-right:20px">
				   <a href="#" class="easyui-linkbutton" plain="true" data-options="iconCls:'icon-add',width:80,onClick:addData">新增</a>                        
				   <a href="#" class="easyui-linkbutton" plain="true" data-options="iconCls:'icon-edit',width:80,onClick:updateData">修改</a>
				   <a href="#" class="easyui-linkbutton" plain="true" data-options="iconCls:'icon-remove',width:80,onClick:deleteData">删除</a>
			   </div>
		       <div id="gjxxpz-datagrid" title="安全检查记录"></div>
		    </div> 
        </div>
        
            <div id="gjxxpz-cl-panel" class="easyui-dialog" style="width:850px;height:480px;"
				data-options="title:'安全检查记录',buttons:'#gjxxpz-cl-btn',modal:true,closed:true">
				<table class="form-table" style="box-sizing: border-box;width: 100%">
					<colgroup>
						<col style="width: 100px;">
						<col style="width: 50%">
						<col style="width: 100px;">
						<col style="width: 50%;">
					</colgroup>
					<tr>
						<td class="td-label">客户名称:</td>
						<td>
							<select class="easyui-combobox" id="userTree" data-options="prompt:'请选择',required:true,width:155,panelHeight:255,panelWidth:155"></select>
						</td>
						<td class="td-label">建筑名称:</td>
						<td>
							<select id="yhbTree" class="easyui-combobox" data-options="prompt:'请选择',width:155,panelHeight:'auto',panelWidth:155,editable:false,required:true""></select>
						</td>
					</tr>
					 <tr>
						<td class="td-label">巡视人:</td>
						<td>
						 <select class="easyui-combobox" id="qiangxiufzr" data-options="prompt:'请选择',width:155,panelHeight:255,panelWidth:155,editable:false,required:true"">    
						</td>
						<td class="td-label">巡视时间:</td>
						<td>
						 <input id="startDate" class="Wdate" type="text" style="width:148px;text-align: left;"  onClick="WdatePicker({dateFmt:'yyyy-MM-dd H:mm:ss',isShowClear:false,readOnly:true})"/>
						</td>
					</tr>
					 <tr id="findBeizhu" style="display:none;">
						<td class="td-label">巡视缺陷记录:</td>
						<td class="td-label" colspan="3">
							<input id="exceptContents" class="easyui-textbox" style="height:50px;width:580px" data-options="required:false,multiline:true,validType:['length[0,300]']"/>
						</td>
					 </tr> 
				</table>
				 <div id="c-panel" class="auto-resize easyui-panel" style="width: 850px;height:330px;" data-options="cls:'fangtian-panel-style bottom-padding'">
		          <div id="add-datagrid"  style="width:100%;height:100%;" title="安全检查记录"></div>
		         </div> 
			</div>
			
            <div id="gjxxpz-cl-btn" style="text-align: center;height:32px;">
				<a href="#" id="cxSave" class="easyui-linkbutton c100">保存</a>  
            	<a href="#" class="easyui-linkbutton c100" data-options="onClick:cxClose">取消</a> 
			</div>   
        
		<script type="text/javascript">
				webContextRoot="<%=basePath%>";
				loginUserId = "<%=loginUserId%>";
				var jsPath = "<%=pagePath%>";
				loginUserId = "<%=loginUserId%>";
		</script>
		
		<script src="<%=pagePath %>/jquery-easyui-1.5.1/jquery.min.js"></script>
		<script src="<%=pagePath %>/jquery-easyui-1.5.1/jquery.easyui.min.js"></script>
		<script src="<%=pagePath %>/jquery-easyui-1.5.1/easyui-lang-zh_CN.js"></script>
		<script src="<%=pagePath %>/js/common.js"></script>
		<script type="text/javascript" src="<%=pagePath %>/js/jquery.vticker-min.js"></script>
		<script type="text/javascript" src="<%=pagePath%>/js/dateUtil.js"></script>
		<script type="text/javascript" src="<%=pagePath%>/js/validator.js"></script>
		<script language="javascript" type="text/javascript" src="<%=pagePath%>/My97DatePicker/WdatePicker.js"></script>
		<script type="text/javascript" src="<%=pagePath %>/ocupload/jquery.ocupload-1.1.2.js"></script>
		<script src="<%=pagePath%>/js/templet_common.js"></script> 
		<script type="text/javascript" src="<%=pagePath %>/jquery-easyui-1.5.1/datagrid-detailview.js"></script> 
		<script type="text/javascript" src="<%=pagePath%>/lightbox/dist/js/lightbox.min.js"></script>
		<script src="<%=pagePath%>/webuploader-0.1.5/webuploader.min.js"></script>
		<script type="text/javascript" src="securityCheck.js"></script>	
			 
</body>
</html>
