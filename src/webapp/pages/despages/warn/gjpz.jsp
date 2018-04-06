<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%

String baseUrl  = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+baseUrl+"/";
	String pagePath = baseUrl + "/pages/despages/common";
	session.setAttribute("itemCode","desgjpz");
    session.setAttribute("itemName","告警等级配置");
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
    <title>告警等级配置</title>
     <link rel="stylesheet" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/fangtian/easyui.css">
    <link rel="stylesheet" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/icon.css">
    <link rel="stylesheet" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/color.css">
    <link rel="stylesheet" href="<%=pagePath %>/css/common.css">
     <link rel="stylesheet" type="text/css" href="<%=pagePath %>/css/templet_common.css">
    <script src="<%=pagePath %>/js/maskJs.js"></script>
</head>
  
<body class="easyui-layout"> 
		<script>
		    var maskobj = new maskPanelManager();
		    maskobj.register();
		</script>
		<style>
		#gjxxpz-panel .search-panel{
			background-color: #EFEFEF;
		}
		#gjxxpz-panel .grid-panel{
			background-color: #EFEFEF;
		}
		
		#gjxxpz-panel .form-table {
	        font-size: 12px;
	        border-spacing:0px;
	    }
	    
	    #gjxxpz-panel .form-table .td-label{
	        width: 80px;
	        text-align: center;
	    }
	
	    #gjxxpz-panel .form-table .td-value{
	        width: 160px;
	    }
	
	    #gjxxpz-panel .form-table .td-fillwidth{
	        width: 40px;
	    }
	</style>
	
	
	 <div class="main-panel noOverflow" data-options="region:'center',border:false" >
         <div id="divSearch" class="easyui-panel" style="width: 100%;position: relative;" data-options="cls:'fangtian-panel-style',onResize:autoResize">
              	<ul class="s-ul-one" >
				<li>
	                <span class="tools-labelgroup">
	                            <label class="tb-group-label">采集通信故障时间设置：(分钟)</label>
	                            <input class="easyui-textbox" style="width:100px" id="setTime" data-options="validType:'integ'"> 
	                 </span>
				</li>
              	<li class="s-right-one">
              		<span style="vertical-align: bottom;">
              		 <a id="btn" href="#" class="easyui-linkbutton c100" data-options="onClick:updateTime">修改时间</a>
              		</span>
              	</li>
			    </ul> 
           </div> 
           
		    <div id="c-panel" class="auto-resize easyui-panel" style="width: 100%;" data-options="cls:'fangtian-panel-style bottom-padding'">
				 <div id="btThrees">
					<a href="#" class="easyui-linkbutton" plain="true" data-options="iconCls:'icon-add',width:80,onClick:add">新增</a>                        
				   <a href="#" class="easyui-linkbutton" plain="true" data-options="iconCls:'icon-edit',width:80,onClick:updateGjpz">修改</a>
					<a href="#" class="easyui-linkbutton" plain="true" data-options="iconCls:'icon-remove',width:80,onClick:deleteGjpz">删除</a>
		         </div> 
		       <div id="gjxxpz-datagrid" title="告警等级配置"></div>
		  </div>   
     </div> 
	
			
	       <div id="gjxxpz-cl-panel" class="easyui-dialog" style="width:600px;height:270px;"
				data-options="title:'告警等级配置',buttons:'#gjxxpz-cl-btn',modal:true,closed:true">
				<table class="form-table" style="box-sizing: border-box;width: 100%">
					<colgroup>
						<col style="width: 100px;">
						<col style="width: 50%">
						<col style="width: 80px;">
						<col style="width: 50%;">
					</colgroup>
					<tr>
						<td class="td-label">告警等级名称:</td>
						<td>
							<input id="gjjbmc" class="easyui-textbox"  data-options="width:195,required:true,validType:'length[0,15]'">
						</td>
						<td class="td-label">告警等级:</td>
						<td>
							<select class="easyui-combobox" id="gjpxdj"  data-options="width:195,panelWidth:195,panelHeight:'auto',editable:false"></select>
						</td>
					</tr>
					<tr>
						<td class="td-label">告警颜色:</td>
						<td>
							<select class="easyui-combobox"  id="gjtsys" data-options="width:195,panelWidth:195,panelHeight:'auto',editable:false"></select>
						</td>
						<td class="td-label">推送方式:</td>
						<td>
							<select class="easyui-combobox" id="gjtsfs" data-options="width:195,panelWidth:195,panelHeight:'auto',editable:false"> </select>
						</td>
					</tr>
					<tr>
						<td class="td-label" style="vertical-align: top;">备注:</td> 
						<td colspan="3"><input id="clsm" class="easyui-textbox" name="message" data-options="multiline:true,validType:'length[0,50]'" style="width:100%;height:100px;"></input></td>
					</tr>
				</table>
			</div>
            <div id="gjxxpz-cl-btn" style="text-align: center;;height:30px;">
				<a href="#" class="easyui-linkbutton c100" data-options="width:80,onClick:cxSave">保存</a>  
            	<a href="#" class="easyui-linkbutton c100" data-options="width:80,onClick:cxClose">取消</a> 
			</div>
	
	
	<!-- 	<div id="gjxxpz-panel" style="width: 100%; height: 100%;">
                <div class="easyui-panel" style="position: relative;padding: 10px;" data-options="fit: true,border: false">
	                  <div class="toolsbar-panel" >
			                <div class="tbRow">
			                        <span class="tools-labelgroup">
			                            <label class="tb-group-label">采集通信故障时间设置：(分钟)</label>
			                            <input class="easyui-textbox" style="width:100px" id="setTime" data-options="validType:'integ'"> 
			                        </span>
			                        <span class="tools-labelgroup">
			                            <a id="btn" href="#" class="easyui-linkbutton c9 shadow" data-options="width:80,onClick:updateTime">修改时间</a>
			                        </span>
			                  </div>
	                  </div>
        		      <div class="toolsbar-panel">
	                  		<div class="tbRow">
		                        <span class="tools-labelgroup">
									<a href="#" class="easyui-linkbutton c9 shadow" data-options="iconCls:'icon-add',width:80,onClick:add">添加</a>                        
		                        </span>
								<span class="tools-labelgroup">
								   <a href="#" class="easyui-linkbutton c9 shadow" data-options="iconCls:'icon-edit',width:80,onClick:updateGjpz">修改</a>
		                        </span>
								<span class="tools-labelgroup">
									<a href="#" class="easyui-linkbutton c9 shadow" data-options="iconCls:'icon-remove',width:80,onClick:deleteGjpz">删除</a>
		                        </span>
							</div>
		              </div>
		              <div style="position: absolute;top: 95px; right:10px; left:10px; bottom: 10px;">
							<table id="gjxxpz-datagrid"></table>
					  </div>
                </div>
 
            <div id="gjxxpz-cl-panel" class="easyui-dialog" style="width:600px;height:270px;"
				data-options="title:'告警等级配置',buttons:'#gjxxpz-cl-btn',modal:true,closed:true">
				<table class="form-table" style="box-sizing: border-box;width: 100%">
					<colgroup>
						<col style="width: 100px;">
						<col style="width: 50%">
						<col style="width: 80px;">
						<col style="width: 50%;">
					</colgroup>
					<tr>
						<td class="td-label">告警等级名称:</td>
						<td>
							<input id="gjjbmc" class="easyui-textbox" style="width:100%" data-options="validType:'length[0,15]'">
						</td>
						<td class="td-label">告警等级:</td>
						<td>
							<select class="easyui-combobox" id="gjpxdj" style="width:100%" data-options="panelHeight:'auto'"></select>
						</td>
					</tr>
					<tr>
						<td class="td-label">告警颜色:</td>
						<td>
							<select class="easyui-combobox"  id="gjtsys" style="width:100%" data-options="panelHeight:'auto'"></select>
						</td>
						<td class="td-label">推送方式:</td>
						<td>
							<select class="easyui-combobox" id="gjtsfs" style="width:100%" data-options="panelHeight:'auto'"> </select>
						</td>
					</tr>
					<tr>
						<td class="td-label" style="vertical-align: top;">备注:</td> 
						<td colspan="3"><input id="clsm" class="easyui-textbox" name="message" data-options="multiline:true,validType:'length[0,50]'" style="width:100%;height:100px;"></input></td>
					</tr>
				</table>
			</div>
            <div id="gjxxpz-cl-btn" style="text-align: center;">
				<a href="#" class="easyui-linkbutton c9 shadow" data-options="width:80,onClick:cxSave">保存</a>  
            	<a href="#" class="easyui-linkbutton c9 shadow" data-options="width:80,onClick:cxClose">取消</a> 
			</div>
		</div> -->
		
		<script type="text/javascript">
				webContextRoot="<%=basePath%>";
		</script>
		 <script src="<%=pagePath %>/jquery-easyui-1.5.1/jquery.min.js"></script>
		 <script src="<%=pagePath %>/jquery-easyui-1.5.1/jquery.easyui.min.js"></script>
		 <script src="<%=pagePath %>/jquery-easyui-1.5.1/easyui-lang-zh_CN.js"></script>
		 <script src="<%=pagePath %>/js/common.js"></script>
		 <script type="text/javascript" src="<%=pagePath%>/js/dateUtil.js"></script>
		 <script type="text/javascript" src="<%=pagePath%>/js/validator.js"></script>
		 <script src="<%=pagePath%>/js/templet_common.js"></script>
		 <script type="text/javascript" src="gjpz.js"></script>
		 
	</body>
</html>
