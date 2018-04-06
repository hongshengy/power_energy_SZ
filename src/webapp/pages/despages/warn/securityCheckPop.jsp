<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%

String baseUrl  = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+baseUrl+"/";
	String pagePath = baseUrl + "/pages/despages/common";
	session.setAttribute("itemCode","dessecurityCheckPop");
    session.setAttribute("itemName","安全管理信息");
    String tourId = request.getParameter("tourId");
    String areaNo = request.getParameter("areaNo");
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
    <title>安全管理信息</title>
    <link rel="stylesheet" type="text/css" href="<%=pagePath %>/lightbox/dist/css/lightbox.min.css">
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
			 text-align: left;
		}
		#gjxxpz-panel .grid-panel{
			background-color: #EFEFEF;
			 text-align: left;
		}
		
		#gjxxpz-panel .form-table {
	        font-size: 12px;
	        border-spacing:0px;
	    }
	    
	    #gjxxpz-panel .form-table .td-label{
	        width: 80px;
	        text-align: left;
	    }
	
	    #gjxxpz-panel .form-table .td-value{
	        width: 160px;
	    }
	
	    #gjxxpz-panel .form-table .td-fillwidth{
	        width: 40px;
	    }
	    .toolsbar-panel .tbRow *{
		    letter-spacing: 0;
		    display: inline-block;
		    text-align: left;
		}
				.tools-labelgroup{
		    margin-left:10px;
		}
		
		.tools-labelgroup input{
		    vertical-align: middle;
		}
		
		.toolsbar-panel .tbRow{
		    margin: 0.9em 0;
		}
		.lightImage{
        margin: 0 8px;
        position: relative;
        display: inline-block;
      }
	</style>
		<div id="gjxxpz-panel" style="width: 100%; height: 100%;overflow-y:hidden;">
			
			<div id="showOther" class="easyui-panel" style="position: relative; text-align: center;padding: 10px;" data-options="fit: true,border: false">
				<div style="position: absolute;top: 1px; right:1px; left:1px; bottom: 1px;">
					<table id="gjxxpz-datagridOther"></table>
				</div>
			</div>
			
			<div id="showYiXing" class="easyui-panel" style="position: relative; text-align: center;padding: 10px;display:none;" data-options="fit: true,border: false">
				<div style="width: 100%; height: 15%;">
					巡视缺陷记录：<input id="exceptContents" class="easyui-textbox" readonly="readonly" style="height:60%;width:90%" data-options="required:false,multiline:true,validType:['length[0,999]']"/>
				</div>
				<div style="position: absolute;top: 50px; right:1px; left:1px; bottom: 1px;height: 88%;">
					<table id="gjxxpz-datagrid"></table>
				</div>
			</div>
		</div>
		
		<div id="topic-excel" class="x-hidden"></div>
		<script type="text/javascript">
				webContextRoot="<%=basePath%>";
				tourId="<%=tourId%>";
				areaNo = "<%=areaNo%>";
				var jsPath = "<%=pagePath%>";
		</script>
		 <script src="<%=pagePath %>/jquery-easyui-1.5.1/jquery.min.js"></script>
		 <script src="<%=pagePath %>/jquery-easyui-1.5.1/jquery.easyui.min.js"></script>
		 <script src="<%=pagePath %>/jquery-easyui-1.5.1/easyui-lang-zh_CN.js"></script>
		 <script src="<%=pagePath %>/js/common.js"></script>
		 <script type="text/javascript" src="<%=pagePath%>/js/dateUtil.js"></script>
		 <script type="text/javascript" src="<%=pagePath%>/js/validator.js"></script>
		 <script type="text/javascript" src="<%=pagePath %>/jquery-easyui-1.5.1/datagrid-detailview.js"></script>
		 <script type="text/javascript" src="<%=pagePath %>/js/jquery.vticker-min.js"></script>
		 <script type="text/javascript" src="<%=pagePath%>/lightbox/dist/js/lightbox.min.js"></script>
		 <script type="text/javascript" src="securityCheckPop.js"></script>
		 
	</body>
</html>
