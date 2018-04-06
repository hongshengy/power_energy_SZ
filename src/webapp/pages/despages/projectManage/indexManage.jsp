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
    <title>指标管理</title>
    
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
	#indexManageDialog .content table {
		margin: 30px 60px;
	}
	
	.tree-file {
		background: url("../common/images/cons.png") no-repeat;
	}
	
	.tree-folder-open {
		background: url("../common/images/tmnl.png") no-repeat;
	}
	.hidden {
		display: none;
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
                			<span>所属行业:</span>
                			<input class="easyui-textbox" style="width:155px;height:24px;" id="queryBeLong" > 
                		</li>
                		<li class="s-right-one">
                			<a id="btn" href="#" class="easyui-linkbutton c100" onclick="searchData();">查询</a>
                		</li>
                	</ul>
           </div> 
           <div id="c-panel" class="auto-resize easyui-panel" style="width: 100%;" data-options="cls:'fangtian-panel-style bottom-padding'">
			   <div id="btThrees" align="right" style="margin-right:20px">
				   <a href="#" class="easyui-linkbutton" plain="true" data-options="iconCls:'icon-add',width:80,onClick:addData">新增</a>                        
				   <a href="#" class="easyui-linkbutton" plain="true" data-options="iconCls:'icon-edit',width:80,onClick:updateData">修改</a>
				   <a href="#" class="easyui-linkbutton" plain="true" data-options="iconCls:'icon-remove',width:80,onClick:delData">删除</a>
			   </div>
		       <div id="gjxxpz-datagrid" title="行业对标分析"></div>
		    </div> 
        </div>
        
        <div id="indexManageDialog" class="easyui-dialog hidden" closed="true" modal="true" title="">
			<div class="content">
				<table>
					<tr>
						<td style="width:100px;">所属行业：</td>
						<td style="width:200px">
							<!-- <input id="beLong" class="easyui-textbox"  style="height:24px;width:200px" data-options="required:true,validType:'length[0,16]'"/> -->
							<select id="beLong" class="easyui-combobox" data-options="width:200,panelHeight:'auto',panelWidth:200,required:true,validType:'length[0,64]'"></select>
						</td>
					</tr>
					<tr>
						<td>指标名称：</td>
						<td>
							<input id="indexName" class="easyui-textbox"  style="height:24px;width:200px" data-options="required:true,validType:'length[0,32]'"/>
						</td>
					</tr>
					<tr>
						<td>指标单位：</td>
						<td>
							<input id="indexUnit" class="easyui-textbox"  style="height:24px;width:200px" data-options="required:true,validType:'length[0,16]'"/>
						</td>
					</tr>
					<tr>
						<td>描述：</td>
						<td>
							<input id="memo" class="easyui-textbox" style="height:80px;width:200px" data-options="multiline:true,validType:['length[0,64]']"/>						
						</td>
					</tr>
				</table>
			</div>
			<div id="buttons" style="text-align: center;margin-bottom:30px;">
				<a href="#" onclick="caveBtn();" class="easyui-linkbutton c100" >保存</a> 
				<a href="#" onclick="cancelBtn();" class="easyui-linkbutton c100" >取消</a>
			</div>
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
		<script type="text/javascript" src="indexManage.js"></script>	
			 
</body>
</html>
