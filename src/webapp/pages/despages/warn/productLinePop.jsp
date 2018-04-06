<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%

String baseUrl  = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+baseUrl+"/";
	String pagePath = baseUrl + "/pages/despages/common";
	session.setAttribute("itemCode","desproductLinePop");
    session.setAttribute("itemName","生产线信息");
    String lineId = request.getParameter("lineId");
     String lineName = request.getParameter("lineName");
      String consName = request.getParameter("consName");
       String memo = request.getParameter("memo");
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
    <title>生产线信息</title>
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
	</style>
		<div id="gjxxpz-panel" style="width: 100%; height: 100%;">
                <div class="easyui-panel" style="position: relative; text-align: center;padding: 10px;" data-options="fit: true,border: false">
		              	<div style="position: absolute;top: 1px; right:1px; left:1px; bottom: 1px;">
							<table id="gjxxpz-datagrid"></table>
					  </div>
                </div>
 
		</div>
		
		<div id="topic-excel" class="x-hidden"></div>
		<script type="text/javascript">
				webContextRoot="<%=basePath%>";
		</script>
		<script type="text/javascript">
			lineId="<%=lineId%>";
			lineName="<%=lineName%>";
			consName="<%=consName%>";
			memo="<%=memo%>";
         </script>
		 <script src="<%=pagePath %>/jquery-easyui-1.5.1/jquery.min.js"></script>
		 <script src="<%=pagePath %>/jquery-easyui-1.5.1/jquery.easyui.min.js"></script>
		 <script src="<%=pagePath %>/jquery-easyui-1.5.1/easyui-lang-zh_CN.js"></script>
		 <script src="<%=pagePath %>/js/common.js"></script>
		 <script type="text/javascript" src="<%=pagePath%>/js/dateUtil.js"></script>
		 <script type="text/javascript" src="<%=pagePath%>/js/validator.js"></script>
		 <script type="text/javascript" src="productLinePop.js"></script>
		 
	</body>
</html>
