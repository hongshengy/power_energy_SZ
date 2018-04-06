<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%

String baseUrl  = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+baseUrl+"/";
	String pagePath = baseUrl + "/pages/despages/common";
	session.setAttribute("itemCode","khjkPop");
    session.setAttribute("itemName","客户监控弹出");
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
    <title>客户列表</title>
     <link rel="stylesheet" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/fangtian/easyui.css">
    <link rel="stylesheet" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/icon.css">
    <link rel="stylesheet" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/color.css">
    <link rel="stylesheet" href="<%=pagePath %>/css/common.css">
    <link rel="stylesheet" type="text/css" href="<%=pagePath %>/css/templet_common.css">
    <script src="<%=pagePath %>/js/maskJs.js"></script>
</head>
  
<body  class="easyui-layout" >
		<script>
		    var maskobj = new maskPanelManager();
		    maskobj.register();
		</script>
		<div class="main-panel noOverflow" data-options="region:'center',border:false" >
             <div id="divSearch" class="easyui-panel" style="width: 100%;position: relative;" title="查询条件" data-options="cls:'fangtian-panel-style',onResize:autoResize">
                	 <ul class="s-ul-one">
                	    <li>
                			<span>客户名称:</span>
                			<input class="easyui-textbox" style="width:155px;height:24px;" id="consName" > 
                		</li>
                		<li class="s-right-one">
                			<a href="#" class="easyui-linkbutton c100" data-options="onClick:okConsName">确定</a>
                		</li>
                		<li class="s-right-one">
                			<a href="#" class="easyui-linkbutton c100" data-options="onClick:selectConsName">查询</a>
                		</li>
                	 </ul>
           </div> 
           <div id="c-panel" class="auto-resize easyui-panel" style="width: 100%;" data-options="cls:'fangtian-panel-style bottom-padding'">
		       <div id="khjk-datagrid" title="客户列表"></div>
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
		 <script type="text/javascript" src="<%=pagePath%>/js/validator.js"></script>
		 <script src="<%=pagePath%>/js/templet_common.js"></script> 
		 <script type="text/javascript" src="khjkPop.js"></script>
		 
	</body>
</html>
