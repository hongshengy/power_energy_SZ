<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ page import="com.frontier.pubmodule.AueicUtil"%>
<%@ page import="com.frontier.framework.model.UserInfo" %>
<%
String baseUrl  = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+baseUrl+"/";
String pagePath = baseUrl + "/pages/despages";

%>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>颜色配置</title>
	<link rel="stylesheet" href="<%=pagePath %>/common/jquery-easyui-1.5.1/themes/fangtian/easyui.css">
    <link rel="stylesheet" href="<%=pagePath %>/common/jquery-easyui-1.5.1/themes/icon.css">
    <link rel="stylesheet" href="<%=pagePath %>/common/jquery-easyui-1.5.1/themes/color.css">
    <link rel="stylesheet" href="<%=pagePath %>/common/css/common.css">
    <script src="<%=pagePath %>/common/js/maskJs.js"></script>
    
</head>
<body>
	<script>
	    var maskobj = new maskPanelManager();
	    maskobj.register();
	</script>
	<style>
		body{
			 overflow: hidden;
		}
		#cdgjdjpz-panel{
			width: 100%; 
			height: 100%;
			padding: 5px;
			box-sizing: border-box;
		}
		
		#cdgjdjpz-panel .head{
			font-weight: bold;
			border-bottom: 1px solid #000000;
		}
		#cdgjdjpz-panel #cjzddjpz-panel{
			width: 100%;
			height: 100%;
			background-color: #f1f1f1;
			padding: 10px;
			box-sizing: border-box;
		}
		#cdgjdjpz-panel #cjzddjpz-panel .content{
			width: 450px;
			height: 100%;
			margin: 0 auto;
			overflow: auto;
			position: relative;
		}
		
		#cdgjdjpz-panel #yxsj-panel{
			width: 100%;
			height: 100%;
			background-color: #f1f1f1;
			padding: 10px;
			box-sizing: border-box;
		}
		#cdgjdjpz-panel #yxsj-panel .content{
			width: 600px;
			height: 100%;
			margin: 0 auto;
			overflow: auto;
			position: relative;
		}
		#cdgjdjpz-panel #ycsj-panel{
			width: 100%;
			height: 100%;
			background-color: #f1f1f1;
			padding: 10px;
			box-sizing: border-box;
		}
		#cdgjdjpz-panel #ycsj-panel .content{
			/*width: 560px;*/
			width: 490px;
			height: 100%;
			overflow: auto;
			margin: 0 auto;
			position: relative;
		}
		#cdgjdjpz-panel #ycsj-panel .content table tbody td{
			text-align: center;
		}
		
		
		
		#cdgjdjpz-panel #ymsj-panel{
			width: 100%;
			height: 100%;
			background-color: #f1f1f1;
			padding: 10px;
			box-sizing: border-box;
		}
		#cdgjdjpz-panel #ymsj-panel .content{
			/*width: 560px;*/
			width: 490px;
			height: 100%;
			overflow: auto;
			margin: 0 auto;
			position: relative;
		}
		#cdgjdjpz-panel #ymsj-panel .content table tbody td{
			text-align: center;
		}
		
		
		#cdgjdjpz-panel .content input[type='checkbox']{
			height: 15px;
			width: 15px;
			vertical-align: middle;
		}
		
		#cdgjdjpz-panel #cdgjdjpz-btn {
			position: absolute;
			width: 100%;
			height: 40px;
			bottom: 0px;
			text-align: center;
			box-sizing: border-box;
			background-color: #F1F1F1;
		}
		
		#cdgjdjpz-panel #ycsj-panel .addOrDelBtn{
			width: 30px;height:21px;display: inline-block;vertical-align: middle;cursor: pointer;
		}
		#cdgjdjpz-panel #ymsj-panel .addOrDelBtn{
			width: 30px;height:21px;display: inline-block;vertical-align: middle;cursor: pointer;
		}
		
		#cdgjdjpz-panel .content .search-panel {
			padding: 5px;
		}
			
			#cdgjdjpz-panel .content .data-panel{
				position: absolute;
				top: 40px;
				bottom: 50px;
				left: 0px;right: 0px;
				overflow-y: auto;
				overflow-x: hidden;
				padding-right: 15px;
			}
		/* #cdgjdjpz-panel #ycsj-panel table tbody td .del{
			display: none;
		}
		#cdgjdjpz-panel #ycsj-panel table tbody tr:hover .del{
			display: block;
		}
		
		#cdgjdjpz-panel #ycsj-panel table tbody tr:first-child .del{
			display: none;
		} */
	</style>
	
	<div id="cdgjdjpz-panel">
		<div class="container-shadow " style="width: 100%;height: 100%;box-sizing: border-box">
			<div class="easyui-panel" title="颜色配置" style="width: 100%;height: 100%; position: relative;overflow: hidden;">
               	<div style="position: absolute;top: 0px;bottom: 40px;left: 0px;right: 0px;background-color: #f1f1f1;">
               		
               	<div id="color_config_tabs" class="easyui-tabs" style="width: 100%;height: 100%;">   
				    <div id="mxdy-panel" title="母线电压监测" data-options="closable:false">
				    	<div id="mxdy_datagrid"></div>
                	</div>   
				    <div id="byqjc-panel" title="变压器监测" data-options="closable:false" >
				    	<div id="byqjc_datagrid"></div>
				    </div>
               	</div>
               	<div id="cdgjdjpz-btn">
					<a href="#" class="easyui-linkbutton c9 shadow" data-options="width:80,onClick:colorSave">保存</a>  
	            	<a href="#" class="easyui-linkbutton c9 shadow" data-options="width:80,onClick:colorClose">取消</a> 
				</div>
           </div>
			</div>
		</div>
	</div>
	 <script type="text/javascript">
		webContextRoot="<%=basePath%>";
	</script>
	<script type="text/javascript" src="<%=pagePath %>/common/jquery-easyui-1.5.1/jquery.min.js"></script>
	<script type="text/javascript" src="<%=pagePath %>/common/jquery-easyui-1.5.1/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="<%=pagePath %>/common/jquery-easyui-1.5.1/easyui-lang-zh_CN.js"></script>
	<script type="text/javascript" src="<%=pagePath %>/common/js/common.js"></script>
	<script type="text/javascript" src="<%=pagePath %>/common/js/common_client.js"></script>
    <script type="text/javascript" src="<%=pagePath %>/projectManage/colorConfig.js"></script>
</body>
</html>