<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ page import="com.frontier.pubmodule.AueicUtil"%>
<%@ page import="com.frontier.framework.model.UserInfo" %>
<%
String baseUrl  = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+baseUrl+"/";
String pagePath = baseUrl + "/pages/despages";

session.setAttribute("itemCode","desGjcdpz");
session.setAttribute("itemName","告警测点配置"); 
%>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>告警测点配置</title>
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
			<div class="easyui-panel" title="测点告警等级配置" style="width: 100%;height: 100%; position: relative;overflow: hidden;">
               	<div style="position: absolute;height:100%;top: 0px;bottom: 40px;left: 0px;right: 0px;background-color: #f1f1f1;">
               		
               	<div class="easyui-tabs" style="width: 100%;height: 100%;" data-options="onSelect:userTabsSelect">   
				    <div id="cjzddjpz-panel" title="采集中断等级配置" data-options="closable:false">
                		<div class="content">
                		    <input type="hidden" id="td_cjzd" />
                		    <input type="hidden" id="td_zdgz" /> 
                			<table cellpadding="2">
                				<tbody>
                					<tr>
                						<td width="120px">
                							采集中断告警等级:
                						</td>
                						<td width="100px">
                							<select id="sel_cjzd" name="sel" class="easyui-combobox" data-options="width:100,panelWidth:100,panelHeight:'auto',editable:false">
                							
				                            </select>
                						</td>
                						<td width="120px">
                							终端故障告警等级:
                						</td>
                						<td width="100px">
                							<select id="sel_zdgz" name="sel" class="easyui-combobox" data-options="width:100,panelWidth:100,panelHeight:'auto',editable:false">
				                            </select>
                						</td>
                					</tr>
                				</tbody>
                			</table>
                		</div>
                	</div>   
				    <div id="yxsj-panel" title="遥信数据" data-options="closable:false" >
					    <div id="yx" class="content">
				            <div class="search-panel">
					            <span>关键字:</span>
						        <input id="yxCxInput" class="easyui-textbox" style="width:300px;" >
						        <a href="#" class="easyui-linkbutton c9 shadow" data-options="width:80,onClick:cxYx">查询</a>
				        	</div>
							<div id="yxTable" class="data-panel"></div> 
							<div id="ppYx" style="background:#efefef;border:1px solid #ccc;position: absolute;bottom: 10px;left: 0px;right: 20px;"></div>
				        </div>
				    </div>
				    
				    
				    <div id="ycsj-panel" title="遥测数据" data-options="closable:false">
					    <div id="yc" class="content">
				            <div class="search-panel">
					            <span>关键字:</span>
						        <input id="ycCxInput" class="easyui-textbox" style="width:300px">
						        <a href="#" class="easyui-linkbutton c9 shadow" data-options="width:80,onClick:cxYc">查询</a>
				        	</div>
				        	<form id="ycForm" class="easyui-validatebox" type="text" >
				        		<div id="ycTable" class="data-panel"></div>	
				        	</form>
							 
							<div id="ppYc" style="background:#efefef;border:1px solid #ccc;position: absolute;bottom: 10px;left: 0px;right: 20px;"></div>
	            		</div>
            		</div>	
              		<div id="ymsj-panel" title="遥脉数据" data-options="closable:false">
		              	<div id="ym" class="content"> 
		              		<div class="search-panel"> 
				           		<span>关键字:</span> <input id="ymCxInput" class="easyui-textbox" style="width:300px">
			              		<a href="#" class="easyui-linkbutton c9 shadow" data-options="width:80,onClick:cxYm">查询</a>
			          		</div>
			          		<form id="ymForm" class="easyui-validatebox" type="text" >
			          			<div id="ymTable" class="data-panel"></div>
			          		</form>
			          		<div id="ppYm" style="background:#efefef;border:1px solid #ccc;position: absolute;bottom: 10px;left: 0px;right: 20px;"></div>
            			</div>
					</div>  
               	</div>
               	<div id="cdgjdjpz-btn">
					<a href="#" class="easyui-linkbutton c9 shadow" data-options="width:80,onClick:cxSave">保存</a>  
	            	<a href="#" class="easyui-linkbutton c9 shadow" data-options="width:80,onClick:cxClose">取消</a> 
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
    <script type="text/javascript" src="<%=pagePath %>/warn/alarmDifDeploy.js"></script>
</body>
</html>