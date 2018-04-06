<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%

String baseUrl  = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+baseUrl+"/";
String pagePath = baseUrl + "/pages/despages/common";	
String treePagePath = baseUrl + "/pages/areaEnergy/common";	
	
session.setAttribute("itemCode","despower");
session.setAttribute("itemName","冷冻水系统分析");

	String consId = request.getParameter("consId");//获取调用父页面传过来的参数
	String consName = request.getParameter("consName");//获取调用父页面传过来的参数
	String shownTree = "";//左侧树布局
	String shownRightStyle = "";//左侧树布局
	String funcId = request.getParameter("funcId");//获取调用父页面传过来的参数
	//未获取到企业编码，证明不是客户监控页面调用的，需要加载左侧树进行查询
	if(consId==null || consId.equals("")){//左侧树布局
		shownTree =  "<div id=\"westTree\" data-options=\"region:'west',disabled:true,split:true,border:false\" style=\"width:220px;\">"
					+"  <div style=\"padding: 3px; border-bottom: 1px solid #e7e7e7; background-color: #f2f2f2\">"
					+"    <input id=\"CobConsSelect\" class=\"easyui-textbox\" style=\"width: 98%;\" data-options=\"iconCls:'icon-search'\">"
					+"    <div style=\"position: absolute;top:38px;width:218px;\">"
					+"      <input id=\"consSelect\" class=\"easyui-textbox\" style=\"width: 98%;\" data-options=\"iconCls:'icon-search',prompt:'请输入客户名称'\">"
					+"    </div>"
					+"  </div>"
			 		+"  <div style=\"overflow: auto;top:70px;width:218px;bottom:0px;position: absolute;\">"
					+"    <ul  id=\"tree-leftQyTree\" class=\"easyui-tree\" style=\"width:100%;\"  >"
					+"    </ul>"
					+"  </div> "
					+"</div> ";
	}

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
    <title>冷冻水系统分析</title>
    <link rel="stylesheet" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/fangtian/easyui.css">
    <link rel="stylesheet" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/icon.css">
    <link rel="stylesheet" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/color.css">
    <link rel="stylesheet" href="<%=pagePath %>/css/common.css">
    <link rel="stylesheet" href="<%=treePagePath %>/css/tree.css">
    <link rel="stylesheet" type="text/css" href="<%=pagePath %>/css/templet_common.css">
    <script src="<%=pagePath %>/js/maskJs.js"></script>
</head>
  
<body class="easyui-layout">
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
        border-top: 1px solid #d4d4ca;
        padding: 6px 3px;
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
         font-size: 14px;
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
	.tools-labelgroup{
    margin-left:5px;
}
.local-panel .header-block{
	background-color: #F5F5F5;
	padding: 5px 8px;
	font-size: 14px;
	font-family: "微软雅黑";
	color: #464646;
}
/*由于easyui的panel会出现一些样式上的bug，这里重新手写一组panel样式*/
.local-panel{
	border: 1px solid #D4D4CA;
	background-color: #fff;
}
.local-panel-shadow{
	-webkit-box-shadow: 0 2px 10px #D4D4CA;
	-moz-box-shadow: 0 2px 10px #D4D4CA;
	box-shadow: 0 2px 10px #D4D4CA;
}
.value-color{
  color: #606060;
  margin-top:15px;
  font-size: 14px;
  font-family: "微软雅黑";
}
.hidden{
	display:none;
}


     .block2{
        text-align: left;
        border-top: 1px solid #d4d4ca;
        padding: 6px 3px;
    }

    .block2 .col{
        float: left;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        padding: 0 3px;
    }

    .block2 .col1{
        width: 40%;
    }

    .block2 .col2{
        width: 60%;
    }

    .block2 .col .innerBox{
        background-color: #f1f4fd;
        padding: 10px 20px;
        height: 133px;
        position: relative;
        font-size: 14px;
    }

    .innerBox .triangle-text,
    .innerBox .triangle{
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        float: left;
    }

    .triangle-text{
        height: 30px;
        background-color: #52add7;
        padding: 4px;
        font-size: 14px;
        color: #fff;
    }

    .triangle{
        border-top: 15px solid #52add7;
        border-bottom: 15px solid transparent;
        border-left: 15px solid #52add7;
        border-right: 15px solid transparent;
    }

    .left-right-position{
        position: absolute;
        left: 0;
        top: 0;
    }

</style> 
	 
    <%=shownTree%>
    <div class="main-panel noOverflow" data-options="region:'center',border:false">
	      	
	    <div id="contentId" class="content" style="width: 100%;height: 100%;position:absolute;"></div>
		<div id="clickTree" class="easyui-panel main-panel noOverflow" style="position: relative;width: 100%;height: 100%;" data-options="border:false">
	      	  
	        <div class="easyui-panel" style="width: 100%;position: relative;" data-options="cls:'fangtian-panel-style',onResize:autoResize">
	    		<ul class="ulTable">
					<li style="padding-left: 10px;">
						<span id="consNo"  class="tb-group-label">客户编号</span>
					</li>
					<li>
						<span id="consName"  class="tb-group-label">客户名称:</span>
					</li>
					<li>
						<span id="htrl"  class="tb-group-label">合同容量:</span>
					</li>
					<li>
						<span id="address"  class="tb-group-label">用电地址:</span>
					</li>
					<li>
						<span id="khzt"  class="tb-group-label">客户状态:</span>
					</li>
						<li style="float:right;padding-right: 10px;">
					 <a id="bt_exportynbg" href="#" class="easyui-linkbutton c100">用能分析报告</a>
					</li>
				</ul>
	        </div>
	        
       	  <div id="content-panel" class="auto-resize easyui-panel main-panel noOverflow" style="width: 100%;" data-options="cls:'fangtian-panel-style bottom-padding'">
       	     <div class="easyui-panel show-bottom-border" style="width: 100%;position: relative;" data-options="onResize:autoResize,border:false">
          			<ul class="s-ul-one">
         			<li>
	         			<span class="tools-labelgroup">
	               	   		<select class="easyui-combobox" id="selectDev"  data-options="width:155,panelHeight:'auto',panelWidth:155" ></select>
					 	</span>
               			<span class="tools-labelgroup" style="vertical-align:middle;border-style:none;">
               				<a id="left" href="#" style="border-style:none;">
               				<img style="border-style:none;vertical-align: middle"  alt="前一天" src="<%=request.getContextPath() %>/images/tools-moveleft.gif"></a>
              		    </span>
	                   	<span class="tools-labelgroup" style="vertical-align:middle;">
	                    	<input id="dataDate" class="Wdate" type="text" style="width: 100px;text-align: left;" readonly="readonly" onClick="WdatePicker({dateFmt:'yyyy-MM-dd'})"/>
						</span>
						<span class="tools-labelgroup" style="vertical-align:middle;border-style:none;">
					    	<a id="right" href="#" style="border-style:none;">
							<img style="border-style:none;vertical-align: middle" alt="后一天" src="<%=request.getContextPath() %>/images/tools-moveright.gif"></a>
					    </span>
					</li>
					<li class="s-right-one">
                         <a id="search" href="#" class="easyui-linkbutton c100" >查询</a>
					</li>
				</ul>
             </div>
		<div class="easyui-panel auto-resize noOverflow" style="width: 100%;position: relative;" data-options="border:false">
			<div id="tabs" class="easyui-tabs" style="width:100%;height:100%;" data-options="border:false">							      
				<div title="冷冻水系统分析" data-options="selected:true" class="main-panel" style="overflow-x:hidden">  
					<div class="easyui-panel auto-resize" style="width: 98%;height:66%;overflow-x:hidden;" data-options="border:false,onResize:userResize">
					   <div id="oneChart" class="chart" style="width: 100%;height:100%;padding: 10px;box-sizing: border-box;border-bottom:solid 1px #CCCCCC;"></div>
					</div>	
					<!-- 分析与建议 begin -->
					<div class="local-panel block2 panel-margin-top clearfix">
					    <div class="col col1">
					        <div class="innerBox">
					            <div class="left-right-position">
					                <div class="triangle-text">分析结果</div><div class="triangle"></div>
					            </div>
					            <p style="margin-top: 40px;">时间：<span style="color: #3885d7;" id="ldsTime">&nbsp;</span></p>
					            <p>冷冻水出水温度：<span style="color: #3885d7;" id="ldsOutResult">-</span></p>
					            <p>冷冻水供回水温差：<span style="color: #3885d7;" id="ldsInResult">-</span></p>
					        </div>
					    </div>
					    <div class="col col2">
					        <div class="innerBox">
					            <div class="left-right-position">
					                <div class="triangle-text">建议</div><div class="triangle"></div>
					            </div>
					            <p style="margin-top: 60px;">冷冻水出水温度：<span style="color: #3885d7;" id="ldsOutSucggest">-</span></p>
					            <p>冷冻水供回水温差：<span style="color: #3885d7;" id="ldsInSucggest">-</span></p>
					        </div>
					    </div>
					</div>
					<!-- 分析与建议 end -->						
				</div>
				
				<div title="冷却水供回水温差" class="main-panel" style="overflow-x:hidden">  
					<div class="easyui-panel noOverflow auto-resize" style="width: 98%;height:66%;overflow:hidden;" data-options="border:false,onResize:userResize">
					   <div id="twoChart" class="chart" style="width: 100%;height:100%;padding: 10px;box-sizing: border-box;border-bottom:solid 1px #CCCCCC;"></div>
					</div>	
					<!-- 分析与建议 begin -->
					<div class="local-panel block2 panel-margin-top clearfix">
					    <div class="col col1">
					        <div class="innerBox">
					            <div class="left-right-position">
					                <div class="triangle-text">分析结果</div><div class="triangle"></div>
					            </div>
					            <p style="margin-top: 40px;">时间：<span style="color: #3885d7;" id="lqsTime">&nbsp;</span></p>
					            <p>冷却水出水温度：<span style="color: #3885d7;" id="lqsOutResult">-</span></p>
					            <p>冷却水供回水温差：<span style="color: #3885d7;" id="lqsInResult">-</span></p>
					        </div>
					    </div>
					    <div class="col col2">
					        <div class="innerBox">
					            <div class="left-right-position">
					                <div class="triangle-text">建议</div><div class="triangle"></div>
					            </div>
					            <p style="margin-top: 60px;">冷却水出水温度：<span style="color: #3885d7;" id="lqsOutSucggest">-</span></p>
					            <p>冷却水供回水温差：<span style="color: #3885d7;" id="lqsInSucggest">-</span></p>
					        </div>
					    </div>
					</div>
					<!-- 分析与建议 end -->
				</div>
			</div>
		</div>		   
	</div>
</div>
	        
<div id="topic-excel" class="x-hidden"/>
<div id="gridDiv" style="display:none" class="easyui-datagrid" data-options="striped:true,border:false,singleSelect:true,url:'',method:'get'"></div>
<div id="dltj" style="height:500px;display:none;"></div>
<div id="fhqs" style="height:500px;display:none;"></div>
<div id="glyszs" style="height:500px;display:none;"></div>
<div id="dftj" style="height:500px;display:none"></div>
<script type="text/javascript">
		webContextRoot="<%=basePath%>";
		consId = "<%=consId%>";
		consName = "<%=consName%>";
		var funcId = "<%=funcId%>";
</script>

	<script src="<%=pagePath %>/jquery-easyui-1.5.1/jquery.min.js"></script>
	<script src="<%=pagePath %>/jquery-easyui-1.5.1/jquery.easyui.min.js"></script>
	<script src="<%=pagePath %>/jquery-easyui-1.5.1/easyui-lang-zh_CN.js"></script>
	<script src="<%=pagePath %>/js/common.js"></script>
	<script type="text/javascript" src="<%=pagePath%>/js/dateUtil.js"></script>
	<script type="text/javascript" src="<%=pagePath %>/echarts/echarts.min.js"></script>
	<script type="text/javascript" src="<%=baseUrl%>/resources/ext-2.2.1/adapter/ext/ext-base.js"></script>
	<script type="text/javascript" src="<%=pagePath%>/echarts/echartsGlobal.js"></script>
	<script type="text/javascript" src="<%=pagePath %>/js/exportynbg.js"></script>
	<script language="javascript" type="text/javascript" src="<%=pagePath%>/My97DatePicker/WdatePicker.js"></script>
	<script type="text/javascript" src="<%=pagePath%>/js/treeSelect.js"></script>
	<script type="text/javascript" src="<%=baseUrl%>/pages/despages/electricQuality/chilledWaterAnalysis.js"></script>
	<!-- <script type="text/javascript" src="kyjfx.js"></script> -->
	<script src="<%=pagePath%>/js/templet_common.js"></script>
    <script type="text/javascript" src="<%=pagePath%>/js/consSelect2.js"></script>
</body>
</html>
