<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%

String baseUrl  = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+baseUrl+"/";
	String pagePath = baseUrl + "/pages/despages/common";
	session.setAttribute("itemCode","desopenDemo");
    session.setAttribute("itemName","弹出界面");
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
    <title>弹出界面</title>
     <link rel="stylesheet" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/fangtian/easyui.css">
    <link rel="stylesheet" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/icon.css">
    <link rel="stylesheet" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/color.css">
    <link rel="stylesheet" href="<%=pagePath %>/css/common.css">
    <script src="<%=pagePath %>/js/maskJs.js"></script>
</head>
  
<body>
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
		<div id="gjxxpz-panel" style="width: 100%; height: 100%;">
                <div class="easyui-panel" style="position: relative;padding: 10px;" data-options="fit: true,border: false">
	              <div class="toolsbar-panel">
				      <div class="tbRow">
				         <span class="tools-labelgroup">
					<a id="khzs" href="#" class="easyui-linkbutton c9 shadow" data-options="width:80,onClick:userTotal">客户总数</a>
				     </span>
				   <span class="tools-labelgroup">
					<a id="bdzzs" href="#" class="easyui-linkbutton c9 shadow" data-options="width:80,onClick:bdzTotal">变电站总数</a>
				     </span>
					<span class="tools-labelgroup">
					<a id="zbzs" href="#" class="easyui-linkbutton c9 shadow" data-options="width:80,onClick:zbCount">主变总数</a>
				     </span>
				     <span class="tools-labelgroup">
					<a id="zbzs" href="#" class="easyui-linkbutton c9 shadow" data-options="width:80,onClick:zbTotal">主变总容量</a>
				     </span>
				     <span class="tools-labelgroup">
					<a id="jcxsj" href="#" class="easyui-linkbutton c9 shadow" data-options="width:80,onClick:jcxData">进出线数据</a>
				     </span>
				     <span class="tools-labelgroup">
					<a id="xssj" href="#" class="easyui-linkbutton c9 shadow" data-options="width:80,onClick:xsData">小时数据</a>
				     </span>
				      <span class="tools-labelgroup">
					<a id="ssfh" href="#" class="easyui-linkbutton c9 shadow" data-options="width:80,onClick:ssfhData">实时负荷</a>
				     </span>
				      <span class="tools-labelgroup">
					<a id="zrdl" href="#" class="easyui-linkbutton c9 shadow" data-options="width:80,onClick:zrdlData">昨日电量</a>
				     </span>
				     <span class="tools-labelgroup">
					<a id="gdxq" href="#" class="easyui-linkbutton c9 shadow" data-options="width:80,onClick:gdxqData">工单详情</a>
				     </span>
				     <span class="tools-labelgroup">
					<a id="gj" href="#" class="easyui-linkbutton c9 shadow" data-options="width:80,onClick:gjData">告警信息</a>
				     </span>
			       </div>
                </div>
             </div>
		  </div>
		
		<div id="topic-excel" class="x-hidden"></div>
		<script type="text/javascript">
				webContextRoot="<%=basePath%>";
		</script>
		 <script src="<%=pagePath %>/jquery-easyui-1.5.1/jquery.min.js"></script>
		 <script src="<%=pagePath %>/jquery-easyui-1.5.1/jquery.easyui.min.js"></script>
		 <script src="<%=pagePath %>/jquery-easyui-1.5.1/easyui-lang-zh_CN.js"></script>
		 <script src="<%=pagePath %>/js/common.js"></script>
		 <script type="text/javascript" src="<%=pagePath%>/js/dateUtil.js"></script>
		 <script type="text/javascript" src="<%=pagePath%>/js/validator.js"></script>
		 <script type="text/javascript" src="openDemo.js"></script>
		 
	</body>
</html>
