<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%

String baseUrl  = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+baseUrl+"/";
String pagePath = baseUrl + "/pages/despages/common";	
String treePagePath = baseUrl + "/pages/areaEnergy/common";	
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
 <head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
 	<meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <meta http-equiv="Pragma" content="no-cache" />
	<meta http-equiv="Cache-Control" content="no-cache" />
	<meta http-equiv="Expires" content="0" />
    <title>树菜单例子</title>
    <jsp:include page="/ext.jsp"/> 
  
  
    <link rel="stylesheet" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/fangtian/easyui.css">
    <link rel="stylesheet" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/icon.css">
    <link rel="stylesheet" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/color.css">
    <link rel="stylesheet" href="<%=pagePath %>/css/common.css">
     <link rel="stylesheet" href="<%=treePagePath %>/css/tree.css">
     
    <script src="<%=pagePath %>/jquery-easyui-1.5.1/jquery.min.js"></script>
    <script src="<%=pagePath %>/jquery-easyui-1.5.1/jquery.easyui.min.js"></script>
    <script src="<%=pagePath %>/jquery-easyui-1.5.1/easyui-lang-zh_CN.js"></script>
    <script src="<%=pagePath %>/js/common.js"></script>
    <script type="text/javascript" src="<%=pagePath %>/echarts/echarts.min.js"></script>
    <script type="text/javascript" src="treeDemo.js"></script>
  

</head>
  
<body>
<style>
	#tjfx-panel{
		width: 100%;
		height: 100%;
	}
	
	#tjfx-panel .search-panel{
		width: 100%;
		height: 80px;
	}
	
	#tjfx-panel .search-panel div{
		padding: 5px 5px 5px 10px;
		float: left;
	}
	
</style>
<div id="tjfx-panel" class="easyui-layout">
    <div data-options="region:'west',split:true,title:'导航',border:false" style="width:200px;">
        <div style="padding: 3px; border-bottom: 1px solid #e7e7e7; background-color: #f2f2f2">
            <input class="easyui-combobox" id="shuru" style="width: 100%;" data-options="iconCls:'icon-search'">
        </div>
        <ul id ="tree-leftQyTree" class="easyui-tree" style="width:100%;">
        </ul>
    </div>
    
    <div data-options="region:'center',border:false" style="position: relative;width: 100%;">
    	 <form>
			  <div>
			  	区域企业树下拉多选:
			  	<input id="tree-multipleTree" style="width: 300px;">
			  	
			  	区域企业树下拉单选:
			  	<select id="tree-singleTree" class="easyui-combotree" style="width: 300px;"></select>
			  	
			  	
			  		下拉Code:
			  	<select id="pCode" class="easyui-combobox" style="width: 300px;"></select>
			  	
			  </div>
		</form>
		
		 <form>
			  <div>
			  	  区域企业一直到具体详细设备树下拉多选:
			  	<select id="tree-DetailTree" class="easyui-combotree" style="width: 300px;"></select>
			  </div>
		</form>
    </div>
</div>


</body>
</html>
