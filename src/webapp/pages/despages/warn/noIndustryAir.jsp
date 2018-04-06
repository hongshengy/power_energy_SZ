<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.frontier.pubmodule.AueicUtil"%>
<%
    /* String baseUrl = request.getContextPath();
	String pagePath = baseUrl + "/pages/despages/common"; */
	
	String baseUrl  = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+baseUrl+"/";
	String pagePath = baseUrl + "/pages/despages";
	
	String consId = request.getParameter("consId");//获取调用父页面传过来的参数
	String consName = request.getParameter("consName");//获取调用父页面传过来的参数
	String funcId = request.getParameter("funcId");//获取调用父页面传过来的参数
	String shownTree = "";//左侧树布局
	String shownRightStyle = "";//左侧树布局
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
<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
<meta charset="UTF-8"/>
<title>非工空调</title>

<link rel="stylesheet" type="text/css" href="<%=pagePath %>/common/jquery-easyui-1.5.1/themes/fangtian/easyui.css">
<link rel="stylesheet" type="text/css" href="<%=pagePath %>/common/jquery-easyui-1.5.1/themes/icon.css">
<link rel="stylesheet" type="text/css" href="<%=pagePath %>/common/jquery-easyui-1.5.1/themes/color.css">
<link rel="stylesheet" type="text/css" href="<%=baseUrl %>/pages/areaEnergy/common/css/tree.css">
<link rel="stylesheet" type="text/css" href="<%=pagePath %>/common/css/common.css">
<link rel="stylesheet" type="text/css" href="<%=pagePath %>/common/css/templet_common.css">
<script src="<%=pagePath %>/common/js/maskJs.js"></script>
</head>
<body class="easyui-layout" >     <!-- onload="init();" class="easyui-layout" -->
<script>
    var maskobj = new maskPanelManager();
    maskobj.register();
</script>
<style>

#fhqxTypeDiv .textbox {
	padding: 5px;
	position: relative;
	border: 1px solid #D4D4D4;
	background-color: #FFF;
	vertical-align: middle;
	border-radius: 5px;
}

#fhqxTypeDiv .combo-arrow {
	width: 18px;
	height: 29px !important;
	overflow: hidden;
	vertical-align: top;
	cursor: pointer;
	opacity: 0.6;
}

body {
	font-size: 12px;
}

.content_controlBarContains {
	padding: 5px;
	/* margin: 5px 0 0 0; */
	background-color: white;
	/* border: 1px solid #ddd7c8; */
	border-radius: 3px;
	font-size: 12px !important:
}

.content_blockStyle {
	background-color: #fdfdfd;
	border: 1px solid #dedede;
	padding: 2px;
}

/*弹出窗口 选择地区窗口样式*/
.row {
	margin: 0;
}

/*电搜按钮样式*/

/*end*/
.colstyle {
	padding: 5px 5px 5px 5px;
}

.colstyleTop {
	padding: 5px 5px 0px 5px;
}

/*左边容器的样式*/
.khydxx-content-soudian {
	background-color: #ededed;
	border: 0px solid #dedede;
	height: 80px;
	padding: 0px;
	margin-bottom: 5px;
	text-align: center;
	font-size: 28px;
	color: darkslategrey;
}

.khydxx-content-left {
	background-color: #FFF;
	padding: 6px;
	width: 250px;
	float: left;
}

/*end*/

/*右边容器及其中元素的样式*/
.khydxx-content-right {
	background-color: #FFF;
	padding: 6px 6px 6px 0;
	width: 800px;
	float: right;
}

.khydxx-content-right-textContainer {
	background-color: #f8f8f8;
	border: 1px solid #dedede;
	padding: 0 0 8px 0;
}

* {
  -webkit-box-sizing: border-box;
     -moz-box-sizing: border-box;
          box-sizing: border-box;
}

a {
  color: #337ab7;
  text-decoration: none;
}


 .col-md-12, .col-md-13 {
  position: relative;
  min-height: 1px;
  padding-right: 15px;
  padding-left: 15px;
}

.col-md-12, .col-md-13 {
  float: left;
}

.col-md-13 {
  width: 20%;
}
.col-md-12 {
  width: 100%;
}
 
.form-inline .input-group {
  display: inline-table;
  vertical-align: middle;
}
.form-inline .input-group .input-group-addon,
.form-inline .input-group .input-group-btn,
.form-inline .input-group .form-control {
  width: auto;
}
 .input-group > .form-control {
  width: 100%;
}

.btn {
  display: inline-block;
  padding: 6px 12px;
  margin-bottom: 0;
  font-size: 14px;
  font-weight: normal;
  line-height: 1.42857143;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -ms-touch-action: manipulation;
      touch-action: manipulation;
  cursor: pointer;
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
  background-image: none;
  border: 1px solid transparent;
  border-radius: 4px;
}

.btn-success {
  color: #fff;
  background-color: #5cb85c;
  border-color: #4cae4c;
}

.input-group {
  position: relative;
  display: table;
  border-collapse: separate;
}

.input-group  .btn {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.input-group .btn {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.nav {
  padding-left: 0;
  margin-bottom: 0;
  list-style: none;
}
.nav > li {
  position: relative;
  display: block;
}
.nav > li > a {
  position: relative;
  display: block;
  padding: 10px 15px;
}
.nav > li > a:hover,
.nav > li > a:focus {
  text-decoration: none;
  background-color: #eee;
}
.nav > li.disabled > a {
  color: #777;
}
.nav > li.disabled > a:hover,
.nav > li.disabled > a:focus {
  color: #777;
  text-decoration: none;
  cursor: not-allowed;
  background-color: transparent;
}
.nav .open > a,
.nav .open > a:hover,
.nav .open > a:focus {
  background-color: #eee;
  border-color: #337ab7;
}
.nav .nav-divider {
  height: 1px;
  margin: 9px 0;
  overflow: hidden;
  background-color: #e5e5e5;
}
.nav > li > a > img {
  max-width: none;
}
.nav-tabs {
  border-bottom: 1px solid #ddd;
}
.nav-tabs > li {
  float: left;
  margin-bottom: -1px;
}
.nav-tabs > li > a {
  margin-right: 2px;
  line-height: 1.42857143;
  border: 1px solid transparent;
  border-radius: 4px 4px 0 0;
}
.nav-tabs > li > a:hover {
  border-color: #eee #eee #ddd;
}
.nav-tabs > li.active > a,
.nav-tabs > li.active > a:hover,
.nav-tabs > li.active > a:focus {
  color: #555;
  cursor: default;
  background-color: #fff;
  border: 1px solid #ddd;
  border-bottom-color: transparent;
}
.nav-tabs.nav-justified {
  width: 100%;
  border-bottom: 0;
}
.nav-tabs.nav-justified > li {
  float: none;
}
.nav-tabs.nav-justified > li > a {
  margin-bottom: 5px;
  text-align: center;
}
.nav-tabs.nav-justified > .dropdown .dropdown-menu {
  top: auto;
  left: auto;
}

  .nav-tabs.nav-justified > li {
    display: table-cell;
    width: 1%;
  }
  .nav-tabs.nav-justified > li > a {
    margin-bottom: 0;
  }

.nav-tabs.nav-justified > li > a {
  margin-right: 0;
  border-radius: 4px;
}
.nav-tabs.nav-justified > .active > a,
.nav-tabs.nav-justified > .active > a:hover,
.nav-tabs.nav-justified > .active > a:focus {
  border: 1px solid #ddd;
}

.nav-tabs.nav-justified > li > a {
  border-bottom: 1px solid #ddd;
  border-radius: 4px 4px 0 0;
}
.nav-tabs.nav-justified > .active > a,
.nav-tabs.nav-justified > .active > a:hover,
.nav-tabs.nav-justified > .active > a:focus {
  border-bottom-color: #fff;
}

.nav-pills > li {
  float: left;
}
.nav-pills > li > a {
  border-radius: 4px;
}
.nav-pills > li + li {
  margin-left: 2px;
}
.nav-pills > li.active > a,
.nav-pills > li.active > a:hover,
.nav-pills > li.active > a:focus {
  color: #fff;
  background-color: #337ab7;
}

.tab-content{
overflow:auto;
width:100%;
}
.tab-content > .tab-pane {
  display: none;
}
.tab-content > .active {
  display: block;
}
.nav-tabs .dropdown-menu {
  margin-top: -1px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.row:before,
.row:after,
.nav:before,
.nav:after {
  display: table;
  content: " ";
}

.row:after,
.nav:after{
  clear: both;
}

.block2{
       text-align: center;
       /* border: 1px solid #d4d4ca; */
       padding: 6px 3px;
   }

   .block2 .col{
       float: left;
       width: 10%;
       box-sizing: border-box;
       -webkit-box-sizing: border-box;
       -moz-box-sizing: border-box;
       padding: 0 3px;
   }

   .block2 .col .innerBox{
       background-color: #f7f7f7;
       padding: 5px 10px;
       height: 100px;
       text-align: center;
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
       /* padding: 5px; */
       font-size: 14px;
   }

   .block2 .col .label .num{
      font-family: "宋体",serif;
   	  font-size: 16px;
   	  font-weight: bold;
   }
   
   .block2 .col .value .num{
      font-family: "宋体",serif;
   	  font-size: 24px;
   	  font-weight: bold;
   }

   .block2 .col3 .innerBox p{
       margin-top: 0px;
   }
   
   .content_blockStyle {
	background-color: #fdfdfd;
	border: 1px solid #dedede;
	padding: 2px;
}

.form-table {
    font-size: 12px;
}

.form-table .td-label{
/*     width: 300px; */
    text-align: left;
}

.form-table .td-value{
    width: 300px;
}

.form-table .td-fillwidth{
    width: 40px;
}

.table-td{
	font-family: "宋体",serif;
   	font-size: 16px;
   	font-weight: bold;
}
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

	    .block2 .col .label .nums{
	          font-family: "宋体",serif;
	    	  font-size: 28px;
	    	  font-weight: bold;
	    }
	    .comm-panel {
	padding: 0px 0px;
	width: 100%;
	font-size: 0px;
	/*用于处理inline-block间距*/
	box-sizing: border-box;
}

.comm-panel .h1-panel {
	font-size: 12px;
	width: 25%;
	display: inline-block;
	height: 65px;
	line-height: 65px;
	/*background: #3B4755;*/
	text-align: center;
	position: relative;
}

.comm-panel .h1-panel .icon-panel {
	display: inline-block;
	vertical-align: middle;
	padding-right: 10px;
}

.comm-panel .h1-panel .icon-panel>img {
	display: block;
}

.comm-panel .h1-panel .info-panel {
	display: inline-block;
	line-height: normal;
	vertical-align: middle;
	color: #FFFFFF;
}

.comm-panel .h1-panel .info-panel .value {
	font-size: 20px;
	padding: 0px 10px;
	vertical-align: sub;
	font-family: "宋体",serif;
}
.info-bg {
	position: absolute;
	left: 0px;
	right: 0px;
	top: 0px;
	bottom: 0px;
	z-index: -1;
}	
.hidden{
	display:none
}
.flt{
	float:left;
} 
.s-ul-one li {
    vertical-align: middle; 
}  
</style>
		
		
		<div class="main-panel noOverflow" data-options="region:'center'" >
	    	<div class="easyui-panel" style="width: 100%;position: relative;background: none" data-options="cls:'fangtian-panel-style',onResize:autoResize,border:false">			
				<div class="comm-panel">
					<div class="h1-panel p1">
						<div class="icon-panel">
							<img src="<%=request.getContextPath() %>/images/nowFh.png" border="0" />
						</div>
						<div class="info-panel">
							<p class="value">当前负荷:<span id="tran_exception">30</span></p>
						</div>
						<div class="info-bg">
							<img src="<%=pagePath%>/common/images/0413-13.png" width="100%" height="100%" border="0" />
						</div>
					</div>
					<div class="h1-panel p2">
						<div class="info-bg">
							<img src="<%=pagePath%>/common/images/0413-14.png" width="100%" height="100%" border="0" />
						</div>
						<div class="icon-panel">
							<img src="<%=request.getContextPath() %>/images/nowDl.png" border="0" />
						</div>
						<div class="info-panel">
							<p class="value">当日电量:<span id="tran_check">30</span></p>
						</div>
					</div>
					<div class="h1-panel p3">
						<div class="info-bg">
							<img src="<%=pagePath%>/common/images/0413-14.png" width="100%" height="100%" border="0" />
						</div>
						<div class="icon-panel">
							<img src="<%=request.getContextPath() %>/images/consNumber.png" border="0" />
						</div>
						<div class="info-panel">
							<p class="value">接入户数:<span id="tran_run">30</span></p>
						</div>
					</div>
					<div class="h1-panel p4">
						<div class="info-bg" style="right: 0px;">
							<img src="<%=pagePath%>/common/images/0413-15.png" width="100%" height="100%" border="0" />
						</div>
						<div class="icon-panel">
							<img src="<%=request.getContextPath() %>/images/consPosition.png" border="0" />
						</div>
						<div class="info-panel">
							<p class="value">接入建筑数:<span id="tran_total">30</span></p>
						</div>
					</div>
				</div> 
			</div>
			<!-- 客户信息end -->
		
			<div id="content-panel" class="auto-resize easyui-panel main-panel noOverflow" style="width: 100%;" data-options="cls:'fangtian-panel-style bottom-padding'">
				 <!-- 电量走势begin -->
		    	<div class="easyui-panel show-bottom-border" style="width: 100%;position: relative;display:block;" data-options="onResize:autoResize,border:false">
		    		<ul id="dlSearchDiv1" class="s-ul-one">
						<li style="padding-left: 10px;">
			                <span class="tools-labelgroup" style="vertical-align:middle;border-style:none;">
							    <a id="timeLeft" href="#" style="border-style:none;">
	                 				<img alt="前一天" src="<%=request.getContextPath() %>/images/tools-moveleft.gif" style="border-style:none;vertical-align: middle">
	                 			</a>
	                		</span>
	                        <span class="tools-labelgroup" style="vertical-align:middle;">
								<input id="dataDate" class="Wdate" type="text" style="width: 100px;text-align: left;" data-options="panelWidth:100" readonly="readonly" onClick="WdatePicker({dateFmt:'yyyy-MM-dd'})"/>	
	                             <input id="monthDate" class="Wdate" type="text" style="width: 100px;text-align: left;" data-options="panelWidth:100" readonly="readonly" onClick="WdatePicker({dateFmt:'yyyy-MM'})"/>
	                             <input id="yearDate" class="Wdate" type="text" style="width: 100px;text-align: left;" data-options="panelWidth:100" readonly="readonly" onClick="WdatePicker({dateFmt:'yyyy'})"/>			
							</span>
							<span class="tools-labelgroup" style="vertical-align:middle;border-style:none;">
			    				 <a id="timeRight" href="#" style="border-style:none;">
									<img alt="后一天" src="<%=request.getContextPath() %>/images/tools-moveright.gif" style="border-style:none;vertical-align: middle">
								 </a>
							</span>
						</li>
						<li>
							<!-- <div id="totalInput"><input id="totalPoint" class="easyui-textbox"  data-options="editable:false,width:100,panelWidth:100,height:24"/></div> -->
							<div id="timeInput" class="hidden"><input id="timeChart" class="easyui-combobox"  data-options="editable:false,width:100,panelWidth:100,height:24"/></div>
							<div id="upDownInput" class="hidden"><input id="upDownChart" class="easyui-combobox"  data-options="editable:false,width:100,panelWidth:100,height:24"/></div>
						</li>
						<li class="s-right-one">
						    <a id="searchButton" href="#" class="easyui-linkbutton c100 shadow">查询</a>
						</li>
					</ul>
				</div>
				
					<div id="tabs" class="easyui-tabs auto-resize noOverflow" data-options="border:false,onSelect:userTabsSelect">   
					    
					    
					    <!-- 负荷tab -->
					    <div title="负荷" class="main-panel noOverflow" style="overflow-x:hidden;">
					    	<div class="easyui-panel" style="width: 100%;position: relative;" data-options="onResize:autoResize,border:false">
								<!-- 二级tab -->
								<div class="tab-panel active" id="fx" style="overflow-x: hidden;">
									<ul id="mytab-fh" class="nav nav-pills" style="margin:5px 0 0 5px;">
										<li id="fhzsTab" class="active"><a href="#fhqx" data-toggle="pill">负荷走势</a></li>
									</ul>
								</div>
					    	</div>
					    	
					    	<div id="fxTab" class="easyui-tabs auto-resize" style="width: 100%;position: relative;" data-options="border:false,showHeader:false">
								<div class="main-panel" style="overflow-x: hidden;">
									<div class="auto-resize easyui-panel show-bottom-border" style="width: 100%;min-height:220px;" data-options="border:false,onResize:userResize">
										<div class="chart" id="fgktFh" style="width: 100%;height: 100%;padding: 10px;box-sizing: border-box;"></div>
									</div>
									<div class="easyui-panel" style="width: 100%;height:80px;" data-options="border:false,onResize:autoResize">
										<!-- 数据表格 -->
										<div id="fgdlbg" style="width: 100%;height: 80px;">
											<div id="fhDatagrid" style="height:100%;"></div>
										</div> 
									</div>
								</div>							
							</div>
					    </div> 
					    
					    
					    
					    <div title="电量" class="main-panel noOverflow" style="overflow-x:hidden;">
					    	<div id="divsecondTab" class="easyui-panel" style="width: 100%;position: relative;" data-options="onResize:autoResize,border:false">								
								<!-- 二级tab -->
								<div class="tab-panel active" id="dianliang" style="overflow-x: hidden;">
									<ul id="mytab-dl" class="nav nav-pills" style="margin:5px 0 0 5px;">
										<li id="dlzsTab" class="active"><a href="#dlzs" data-toggle="pill">电量走势</a></li>
										<li id="fgdlTab"><a href="#fgdl" data-toggle="pill" >峰谷电量</a></li>
									</ul>
								</div>			
					    	</div>
					    	<div id="dlTab" class="easyui-tabs auto-resize" style="width: 100%;position: relative;" data-options="border:false,showHeader:false">
								<!-- 电量chart -->
								<div id="dlzsChart" class="main-panel" style="width:100%;height:100%;overflow-x: hidden;">
									<div class="auto-resize easyui-panel show-bottom-border" style="width: 100%;min-height:220px;" data-options="border:false,onResize:userResize">
										<div class="chart" id="fgktDl" style="width: 100%;height: 100%;padding: 10px;box-sizing: border-box;"></div>
									</div>
									<div id="divDl" class="easyui-panel" style="width: 100%;" data-options="border:false,onResize:autoResize">
										<div id="tab-fzl" class="block2 clearfix" style="width: 100%; margin-bottom:1px;">
											<div class="col col4" style="width:100%">
												<div class="innerBox">
													<p class="label" style="color: #37A09D; float: left; padding-top: 35px;">
														电量走势：<span class="num" id="zdlhb">总用电量环比</span>
													</p>
												</div>
											</div>
										</div>
									</div>
								</div>								
								<!-- 峰谷电量chart -->
								<div id="fgdlChart" class="main-panel" style="width:100%;height:100%;overflow-x: hidden;">
									<div class="auto-resize easyui-panel show-bottom-border" style="width: 100%;min-height:220px;" data-options="border:false,onResize:userResize">
									  	<div class="chart" id="fgktFgDl" style="width: 100%;height: 100%;padding: 10px;box-sizing: border-box;"></div>
									</div>
									<div id="divFgdl" class="easyui-panel" style="width: 100%;height:200px;" data-options="border:false,onResize:autoResize">
										<!-- 数据表格 -->
										<div  style="width: 100%;height: 200px;">
											<div id="fgdlData" style="height:100%;"></div>
										</div>
									</div>
								</div>
							</div>
					    </div>					    					    
					</div>  
				</div>
		    </div>   
				
			
	<script type="text/javascript">
		webContextRoot="<%=basePath%>";
		consId = "<%=consId%>";
		consName = "<%=consName%>";
		var funcId = "<%=funcId%>";
	</script>
<!-- 加载顺序不可颠倒 -->
<script type="text/javascript" src="<%=pagePath %>/common/js/dateUtil.js"></script>
<script type="text/javascript" src="<%=pagePath %>/common/jquery-easyui-1.5.1/jquery.min.js"></script>
<script type="text/javascript" src="<%=pagePath %>/common/echarts/echarts.min.js"></script>
<script type="text/javascript" src="<%=pagePath %>/common/jquery-easyui-1.5.1/jquery.easyui.min.js"></script>
<script type="text/javascript" src="<%=pagePath %>/common/jquery-easyui-1.5.1/easyui-lang-zh_CN.js"></script>
<script language="javascript" type="text/javascript" src="<%=pagePath%>/common/My97DatePicker/WdatePicker.js"></script>
<%-- <script type="text/javascript" src="<%=pagePath%>/common/js/exportynbg.js"></script> --%>
<script type="text/javascript" src="<%=pagePath%>/common/js/treeSelect.js"></script>
<script src="<%=pagePath%>/common/js/templet_common.js"></script>
<script type="text/javascript" src="<%=pagePath%>/common/js/consSelect2.js"></script>
<script type="text/javascript" src="noIndustryAir.js"></script>
</body>
</html>