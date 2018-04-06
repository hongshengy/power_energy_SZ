<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%

String baseUrl  = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+baseUrl+"/";
String pagePath = baseUrl + "/pages/despages/common";	
String treePagePath = baseUrl + "/pages/areaEnergy/common";	
String consId = request.getParameter("consId");
String consName = request.getParameter("consName");
String startDate = request.getParameter("beginData");
String endDate = request.getParameter("endData");		
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
    <title>电费超容分析</title>
    <link rel="stylesheet" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/fangtian/easyui.css">
    <link rel="stylesheet" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/icon.css">
    <link rel="stylesheet" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/color.css">
    <link rel="stylesheet" href="<%=pagePath %>/css/common.css">
    <link rel="stylesheet" href="<%=treePagePath %>/css/tree.css">
    <script src="<%=pagePath %>/js/maskJs.js"></script>
</head>
  
<body>
		<script>
		    var maskobj = new maskPanelManager();
		    maskobj.register();
		</script>
<style>
	#tjfx-panel{
		width: 100%;
		height: 100%;
	}
	
	#tjfx-panel .search-panel{
		width: 100%;
		height: 90px;
	}
	
	#tjfx-panel .search-panel div{
		padding: 5px 0px 5px 10px;
		float: left;
	}
	  #tjfx-panel .form-table {
	        font-size: 12px;
	    }
	    
	    #tjfx-panel .form-table .td-label{
	        width: 300px;
	        text-align: left;
	    }
	
	    #tjfx-panel .form-table .td-value{
	        width: 300px;
	    }
	
	    #tjfx-panel .form-table .td-fillwidth{
	        width: 40px;
	    }
	    .block2{
        text-align: center;
    }

    .block2 .col{
        float: left;
        width: 20%;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        padding: 0 3px;
    }

    .block2 .col .innerBox{
        background-color: #f7f7f7;
        padding: 10px 20px;
        height: 75px;;
    }

    .block2 .col p{
        margin: 5px 0;
        font-family: "宋体",serif;
    }

    .block2 .col .value{
        color: #242424;
        font-size: 14px;

    }

    .block2 .col .label{
        color: #242424;
        padding: 5px;
        font-size: 14px;
    }

    .block2 .col .label .num{
          font-family: "宋体",serif;
    	  font-size: 14px;
    	  font-weight: bold;
    }
    
    .block2 .col .value .num{
         font-family: "宋体",serif;
    	  font-size: 14px;
    	  font-weight: bold;
    }

    .block2 .col3 .innerBox p{
        margin-top: 20px;
    }
     .block2 .col4 .innerBox p{
        margin-top: 20px;
    }
     .block2 .col5 .innerBox p{
        margin-top: 20px;
    }
     .block2 .col6 .innerBox p{
        margin-top: 20px;
    }
	
</style> 
	<div id="tjfx-panel" class="easyui-layout" style="width: 100%;height: 100%;">
         <div style="position: absolute;top: 10px;left:10px;right:10px;bottom: 10px;">
	    		<div class="easyui-panel" style="width: 100%;height: 100%; position: relative;" data-options="onResize:userResize" >
					
					<div style="position: absolute;left: 0px;right: 0px;top: 12px;bottom: 120px;">
					<div id="userChart" ></div>
					<div id="tab-fzl" class="local-panel block2 panel-margin-top clearfix" style="margin-bottom:1px;">
						<div class="col col" style="width:34%">
							<div class="innerBox">
								<p class="label" style="color: #37A09D">
									最大负荷：<span class="num" id="maxFZL">0</span>
								</p>
								 <p class="value" style="color: #37A09D">
									发生时间：<span class="num" id="maxdate">2017-04-17</span>
								</p> 
							</div>
						</div>
						<div class="col col" style="width:33%">
							<div class="innerBox">
								<p class="label" style="color: orange">
									最小负荷：<span class="num" id="minFZL">0</span>
								</p>
							 	<p class="value" style="color: orange">
									发生时间：<span class="num" id="mindate">2017-04-17</span>
								</p> 
							</div>
						</div>
						<div class="col col4" style="width:33%">
							<div class="innerBox">
								<p class="label" style="color: #B763D0;">
									平均负荷：<span class="num" id="avgFZL">0</span>
								</p>
							</div>
						</div>
						
					</div>
					
				</div>
        	</div>
    	</div>
    </div>
</div>

<div id="topic-excel" class="x-hidden"/>

<script type="text/javascript">
		webContextRoot="<%=basePath%>";
</script>
<script type="text/javascript">
			consId="<%=consId%>";
			startDate="<%=startDate%>";
		    endDate="<%=endDate%>";
		    consName="<%=consName%>";
</script>
 <script src="<%=pagePath %>/jquery-easyui-1.5.1/jquery.min.js"></script>
 <script src="<%=pagePath %>/jquery-easyui-1.5.1/jquery.easyui.min.js"></script>
 <script src="<%=pagePath %>/jquery-easyui-1.5.1/easyui-lang-zh_CN.js"></script>
 <script src="<%=pagePath %>/js/common.js"></script>
  <script type="text/javascript" src="<%=pagePath%>/js/dateUtil.js"></script>
 <script type="text/javascript" src="<%=pagePath %>/echarts/echarts.min.js"></script>
  <script type="text/javascript" src="<%=pagePath%>/echarts/echartsGlobal.js"></script>
  <script type="text/javascript" src="chargePop.js"></script>
 
</body>
</html>
