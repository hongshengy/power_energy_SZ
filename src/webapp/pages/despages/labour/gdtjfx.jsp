<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%

String baseUrl  = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+baseUrl+"/";
String pagePath = baseUrl + "/pages/despages/common";	
String treePagePath = baseUrl + "/pages/areaEnergy/common";	
String consId = request.getParameter("consId");//获取调用父页面传过来的参数
String consName = request.getParameter("consName");//获取调用父页面传过来的参数
String shownRightStyle = "";//左侧树布局
if(consId==null || consId.equals("")){//左侧树布局
		shownRightStyle=" <div style=\"position: absolute;top: 50px;left:10px;right:10px;bottom: 10px;\">";
	}else{
	    shownRightStyle=" <div style=\"position: absolute;top: 50px;left:0px;right:0px;bottom: 0px;\">";
	}	
session.setAttribute("itemCode","destjfx");
session.setAttribute("itemName","工单统计");
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
    <title>工单统计分析</title>
    <link rel="stylesheet" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/fangtian/easyui.css">
    <link rel="stylesheet" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/icon.css">
    <link rel="stylesheet" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/color.css">
    <link rel="stylesheet" href="<%=pagePath %>/css/common.css">
    <link rel="stylesheet" href="<%=baseUrl%>/resources/jsepc/css/ext-all.css">
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
	
</style> 
<div id="tjfx-panel" class="easyui-layout" style="width: 100%;height: 100%;">
	<!-- <div data-options="region:'west',split:true,title:'导航',border:false" style="width:200px;">
        <div style="padding: 3px; border-bottom: 1px solid #e7e7e7; background-color: #f2f2f2">
            <input class="easyui-textbox" style="width: 100%;" data-options="iconCls:'icon-search'">
        </div>
        <ul  id="tree-leftQyTree" class="easyui-tree" style="width:100%;"  >
        </ul>
    </div> -->
    <div data-options="region:'center',border:false" style="position: relative;width: 100%;">
    	<div style="position: relative;width: 100%;height: 100%;">
    		<div style="height: 50px; padding: 10px 10px 0px 10px;">
	         <!--    <div>
		    		<img id="gdtjMenuIcon" style="width: 50px; height: 50px;" />
		    		<span id="gdtjMenuLabel" style="font-size: 20px;">统计分析</span>
		    		
					<div id="gdtjMenu" class="easyui-menu" style="width:150px;">   
					    <div>工作票统计</div>   
					    <div>巡视工单统计</div>   
					    <div>缺陷工单统计</div>   
					    <div>停电工单统计</div>   
					    <div>抢修工单统计</div>   
					    <div>无功优化工单统计</div>   
					</div>
		    	</div> -->
		    	
		        <div class="toggleLabel-panel" style="background-color:write">
		            <a href="#" id="ypgd" class="easyui-linkbutton" data-options="toggle:true,group:'g2',plain:true">已派工单</a>
		            <a href="#" id="yjgd" class="easyui-linkbutton" data-options="toggle:true,group:'g2',plain:true">已接工单</a>
		            <a href="#" id="yddxc" class="easyui-linkbutton" data-options="toggle:true,group:'g2',plain:true">已到达现场</a>
		            <a href="#" id="yhgd" class="easyui-linkbutton" data-options="toggle:true,group:'g2',plain:true">已回工单</a>
		            <a href="#" id="sygd" class="easyui-linkbutton" data-options="toggle:true,group:'g2',plain:true,selected:true">所有工单</a>
		        </div>
	        </div>
	        
	        
	          <%=shownRightStyle%>
	        	<div class="container-shadow " style="display: block; position: absolute;top: 0px;left:0px;right:0px;bottom: 0px;">
		    		<div class="easyui-panel" style="width: 100%;height: 100%; position: relative;" data-options="onResize:userResize" >
			        	<div class="search-panel">
							<div>
							 	<input type="radio" name="g1"  id='chooseDateYear' onclick="chooseDateType('year')"/>按年统计
							 	<input type="radio" name="g1" id='chooseDateYue'onclick="chooseDateType('month')" checked/>按月统计</div>
								<div id="sendOfMonth">
								  	派发时间:
								  	<input id="startDateMonth" type="text" class="Wdate" style="text-align: left;height:24px;" data-options="width:155,editable:false" onClick="WdatePicker({dateFmt:'yyyy-MM',onpicked:changeDate,isShowClear:false,readOnly:true})"/>
								  	~
								  	<input id="endDateMonth" type="text" class="Wdate" style="text-align: left;height:24px;" data-options="width:155,editable:false" onClick="WdatePicker({dateFmt:'yyyy-MM',onpicked:changeDate,isShowClear:false,readOnly:true})"/>
							  	</div>
								<div id="sendOfYear">
								  	派发时间:
								  	<input id="startDateYear" type="text" class="Wdate" style="text-align: left;height:24px;" data-options="width:155,editable:false" onClick="WdatePicker({dateFmt:'yyyy',onpicked:changeDate,isShowClear:false,readOnly:true})"/>
								  	~
								  	<input id="endDateYear" type="text" class="Wdate" style="text-align: left;height:24px;" data-options="width:155,editable:false" onClick="WdatePicker({dateFmt:'yyyy',onpicked:changeDate,isShowClear:false,readOnly:true})"/>
							  	</div>
							  <div>
							  	客户:
							  	<input  id="userTree" style="width: 150px;">
							  </div>
							   <div>
							  	紧急程度:
				                <select class="easyui-combobox" id="jinjicd"  data-options="width:120,panelHeight:'auto',panelWidth:120,editable:false" ></select>
							  </div>
<!-- 							  <div> -->
<!-- 							  	工单状态:		 -->
<!-- 				                <select class="easyui-combobox" id="gongDanState" data-options="width:120,panelHeight:'auto'" ></select> -->
<!-- 							  </div> -->
							  <div>
							  <a id="search" href="#" class="easyui-linkbutton c9 shadow" style="width: 80px;height: 24px;">查询</a>
							  <a id="export" href="#" class="easyui-linkbutton c9 shadow" style="width: 80px;height: 24px;">导出</a>
							  <!--	<a id="search" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search'">查询</a>-->
							  <!--  	<a id="export" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search'">导出</a>-->
							  </div>
						</div>
						<div style="position: absolute;left: 0px;right: 0px;top: 65px;bottom: 0px;">
							<div id="userChart" ></div>
						</div>
			        </div>
	    	
	        	</div>
	    	</div>
    	</div>
    </div>
</div>
<div id="topic-excel" class="x-hidden"></div>

<script type="text/javascript">
		webContextRoot="<%=basePath%>";
		consId = "<%=consId%>";
		consName = "<%=consName%>";
</script>

<script src="<%=pagePath %>/jquery-easyui-1.5.1/jquery.min.js"></script>
<script src="<%=pagePath %>/jquery-easyui-1.5.1/jquery.easyui.min.js"></script>
<script src="<%=pagePath %>/jquery-easyui-1.5.1/easyui-lang-zh_CN.js"></script>
<script src="<%=pagePath %>/js/common.js"></script>
<script type="text/javascript" src="<%=pagePath%>/js/dateUtil.js"></script>
<script type="text/javascript" src="<%=pagePath %>/echarts/echarts.min.js"></script>
<script type="text/javascript" src="<%=baseUrl%>/resources/ext-2.2.1/adapter/ext/ext-base.js"></script>
<script type="text/javascript" src="<%=baseUrl%>/resources/ext-2.2.1/ext-all.js"></script>
<script type="text/javascript" src="<%=pagePath%>/echarts/echartsGlobal.js"></script>
<script type="text/javascript" src="<%=pagePath%>/My97DatePicker/WdatePicker.js"></script>
<script type="text/javascript" src="gdtjfx.js"></script>

</body>
</html>
