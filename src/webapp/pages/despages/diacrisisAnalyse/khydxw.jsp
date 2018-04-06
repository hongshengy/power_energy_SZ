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
<title>客户行为</title>

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
    
</style>
		<%=shownTree%>
		
		<div class="main-panel noOverflow" data-options="region:'center'" >
	    	<!-- 客户信息begin -->
	    	<div class="easyui-panel" style="width: 100%;position: relative;" data-options="cls:'fangtian-panel-style',onResize:autoResize">
				<ul class="s-ul-one">
					<li>
						<span id="consNo"  class="tb-group-label">客户编号:</span>
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
					<li class="s-right-one">
						<!-- <a id="bt_exportynbg" href="#" class="easyui-linkbutton c100">用能分析报告</a> -->
					    <div id="gridDiv" style="display:none" class="easyui-datagrid" data-options="striped:true,border:false,singleSelect:true,url:'',method:'get'"></div>
						<div id="dltj" style="height:500px;display:none;"></div>
						<div id="fhqs" style="height:500px;display:none;"></div>
						<div id="glyszs" style="height:500px;display:none;"></div>
						<div id="dftj" style="height:500px;display:none"></div>
					</li>
				</ul> 
			</div>
			<!-- 客户信息end -->
		
			<div id="content-panel" class="auto-resize easyui-panel main-panel noOverflow" style="width: 100%;" data-options="cls:'fangtian-panel-style bottom-padding'">
				 <!-- 电量走势begin -->
		    	<div class="easyui-panel show-bottom-border" style="width: 100%;position: relative;display:block;" data-options="onResize:autoResize,border:false">
		    		<ul id="dlSearchDiv1" class="s-ul-one" style="display:none;">
						<li style="padding-left: 10px;">
							第一时间：
			                <span class="tools-labelgroup" style="vertical-align:middle;border-style:none;">
							    <a id="leftdlzs" href="#" style="border-style:none;">
	                 				<img alt="前一天" src="<%=request.getContextPath() %>/images/tools-moveleft.gif" style="border-style:none;vertical-align: middle">
	                 			</a>
	                		</span>
	                        <span class="tools-labelgroup" style="vertical-align:middle;">
								<input id="dlzsEDateD"  class="Wdate" type="text" style="width: 100px;height:24px; text-align: left;" onClick="WdatePicker({dateFmt:'yyyy-MM-dd',onpicked:changedlzs,isShowClear:false,readOnly:true})" />
					  			<input id="dlzsEDateM"  class="Wdate" type="text" style="width: 100px;height:24px; text-align: left;" onClick="WdatePicker({dateFmt:'yyyy-MM',onpicked:changedlzs,isShowClear:false,readOnly:true})"  />
					  			<input id="dlzsEDateY"  class="Wdate" type="text" style="width: 100px;height:24px; text-align: left;" onClick="WdatePicker({dateFmt:'yyyy',onpicked:changedlzs,isShowClear:false,readOnly:true})"  />				
							</span>
							<span class="tools-labelgroup" style="vertical-align:middle;border-style:none;">
			    				 <a id="rightdlzs" href="#" style="border-style:none;">
									<img alt="后一天" src="<%=request.getContextPath() %>/images/tools-moveright.gif" style="border-style:none;vertical-align: middle">
								 </a>
							</span>
						</li>
						<li style="padding-left: 10px;">
							第二时间：
			                <span class="tools-labelgroup" style="vertical-align:middle;border-style:none;">
							    <a id="leftdlzsUp" href="#" style="border-style:none;">
	                 				<img alt="前一天" src="<%=request.getContextPath() %>/images/tools-moveleft.gif" style="border-style:none;vertical-align: middle">
	                 			</a>
	                		</span>
	                        <span class="tools-labelgroup" style="vertical-align:middle;">
								<input id="dlzsEDateDUp"  class="Wdate" type="text" style="width: 100px;height:24px; text-align: left;" onClick="WdatePicker({dateFmt:'yyyy-MM-dd',onpicked:changedlzsUp,isShowClear:false,readOnly:true})" />
					  			<input id="dlzsEDateMUp"  class="Wdate" type="text" style="width: 100px;height:24px; text-align: left;" onClick="WdatePicker({dateFmt:'yyyy-MM',onpicked:changedlzsUp,isShowClear:false,readOnly:true})"  />
					  			<input id="dlzsEDateYUp"  class="Wdate" type="text" style="width: 100px;height:24px; text-align: left;" onClick="WdatePicker({dateFmt:'yyyy',onpicked:changedlzsUp,isShowClear:false,readOnly:true})"  />				
							</span>
							<span class="tools-labelgroup" style="vertical-align:middle;border-style:none;">
			    				 <a id="rightdlzsUp" href="#" style="border-style:none;">
									<img alt="后一天" src="<%=request.getContextPath() %>/images/tools-moveright.gif" style="border-style:none;vertical-align: middle">
								 </a>
							</span>
							<span class="tools-labelgroup">
								<select id="dlzsQueryType" class="easyui-combobox" name="dept" data-options="prompt:'请选择',height:24,editable:false,width:100">   
									<option value="D" selected>日数据</option>
									<option value="M">月数据</option>
									<option value="Y">年数据</option>   
								</select>
							</span>
						</li>
						<li class="s-right-one">
						    <a id="dlzsButton" href="#" class="easyui-linkbutton c100 shadow" data-options="onClick:queryDlzs">查询</a>
						</li>
					</ul>
					<!-- 电量走势 end -->
					
					<!-- 峰谷电量 begin -->
					<ul id="dlSearchDiv2" class="s-ul-one" style="display:none;">
						<li style="padding-left: 10px;">
			                <span class="tools-labelgroup" style="vertical-align:middle;border-style:none;">
							    <a id="leftfgdl" href="#" style="border-style:none;">
	                 				<img alt="前一天" src="<%=request.getContextPath() %>/images/tools-moveleft.gif" style="border-style:none;vertical-align: middle">
	                 			</a>
	                		</span>
	                        <span class="tools-labelgroup" style="vertical-align:middle;">
								<input id="fgdlEDateM"  class="Wdate" type="text" style="width: 120px;height:24px; text-align: left;" onClick="WdatePicker({dateFmt:'yyyy-MM',onpicked:changefgdl,isShowClear:false,readOnly:true})"/>
								<input id="fgdlEDateY"  class="Wdate" type="text" style="width: 120px;height:24px; text-align: left;" onClick="WdatePicker({dateFmt:'yyyy',onpicked:changefgdl,isShowClear:false,readOnly:true})"/>			
							</span>
							<span class="tools-labelgroup" style="vertical-align:middle;border-style:none;">
			    				 <a id="rightfgdl" href="#" style="border-style:none;">
									<img alt="后一天" src="<%=request.getContextPath() %>/images/tools-moveright.gif" style="border-style:none;vertical-align: middle">
								 </a>
							</span>
							<span class="tools-labelgroup">
								<select id="fgdlQueryType" class="easyui-combobox" name="dept" data-options="prompt:'请选择',height:24,editable:false,width:155"> 
									<option value="M" selected>月峰谷电量</option>
									<option value="Y">年峰谷电量</option>
								</select>
							</span>
						</li>
						<li class="s-right-one">
						    <a id="dlzsButton" href="#" class="easyui-linkbutton c100 shadow" data-options="onClick:queryFgdl">查询</a>
						</li>
					</ul>
					<!-- 峰谷电量 end -->
					
					<!-- 负荷曲线 begin -->
					<ul id="fhSearchDiv1" class="s-ul-one">
					
						<li style="padding-left: 10px;">
							<span id="oneTime">
								第一时间：
							</span>
			                <span class="tools-labelgroup" style="vertical-align:middle;border-style:none;">
							    <a id="leftfhqx" href="#" style="border-style:none;">
	                 				<img alt="前一天" src="<%=request.getContextPath() %>/images/tools-moveleft.gif" style="border-style:none;vertical-align: middle">
	                 			</a>
	                		</span>
	                        <span class="tools-labelgroup" style="vertical-align:middle;">
								<input id="fhqxEDate" class="Wdate" type="text" style="width: 100px;height:24px; text-align: left;" onClick="WdatePicker({dateFmt:'yyyy-MM-dd',onpicked:changefhqx,isShowClear:false,readOnly:true})"/>
								<input id="fhqxEDateM" class="Wdate" type="text" style="width: 100px;height:24px; text-align: left;" onClick="WdatePicker({dateFmt:'yyyy-MM',onpicked:changefhqx,isShowClear:false,readOnly:true})"/>
							</span>
							<span class="tools-labelgroup" style="vertical-align:middle;border-style:none;">
			    				 <a id="rightfhqx" href="#" style="border-style:none;">
									<img alt="后一天" src="<%=request.getContextPath() %>/images/tools-moveright.gif" style="border-style:none;vertical-align: middle">
								 </a>
							</span>
						</li>
						<li style="padding-left: 10px;">
							<span id="twoTime">
								第二时间：
							</span>
			                <span id="twoUpDate" class="tools-labelgroup" style="vertical-align:middle;border-style:none;">
							    <a id="leftfhqxUp" href="#" style="border-style:none;">
	                 				<img alt="前一天" src="<%=request.getContextPath() %>/images/tools-moveleft.gif" style="border-style:none;vertical-align: middle">
	                 			</a>
	                		</span>
	                        <span id="twoMonth" class="tools-labelgroup" style="vertical-align:middle;">
								<input id="fhqxEDateUp" class="Wdate" type="text" style="width: 100px;height:24px; text-align: left;" onClick="WdatePicker({dateFmt:'yyyy-MM-dd',onpicked:changefhqxUp,isShowClear:false,readOnly:true})"/>
							</span>
							<span id="twoDownDate" class="tools-labelgroup" style="vertical-align:middle;border-style:none;">
			    				 <a id="rightfhqxUp" href="#" style="border-style:none;">
									<img alt="后一天" src="<%=request.getContextPath() %>/images/tools-moveright.gif" style="border-style:none;vertical-align: middle">
								 </a>
							</span>
							<span class="tools-labelgroup">
								<select id="dlzsQueryTypeByFh" class="easyui-combobox" name="dept" data-options="prompt:'请选择',height:24,editable:false,width:100">   
									<option value="D" selected>日负荷</option>
									<option value="M">月负荷</option>
								</select>
							</span>	
						</li>
						
						<li class="s-right-one">
						    <a id="dlzsButton" href="#" class="easyui-linkbutton c100 shadow" data-options="onClick:queryFhqx">查询</a>
						</li>
					</ul>
					<!-- 负荷曲线 end -->
					
					<!-- 时间负荷 begin -->
					<ul id="fhSearchDiv2" class="s-ul-one" style="display:none;">
						<li style="padding-left: 10px;">
			                <span class="tools-labelgroup" style="vertical-align:middle;border-style:none;">
							    <a id="leftsjfhS2" href="#" style="border-style:none;">
	                 				<img alt="前一天" src="<%=request.getContextPath() %>/images/tools-moveleft.gif" style="border-style:none;vertical-align: middle">
	                 			</a>
	                		</span>
	                        <span class="tools-labelgroup" style="vertical-align:middle;">
								<input id="sjfhEDate" class="Wdate" type="text" style="width: 155px;height:24px; text-align: left;" onClick="WdatePicker({dateFmt:'yyyy-MM',onpicked:changesjfh,isShowClear:false,readOnly:true})"/>
							</span>
							<span class="tools-labelgroup" style="vertical-align:middle;border-style:none;">
			    				 <a id="rightsjfhE2" href="#" style="border-style:none;">
									<img alt="后一天" src="<%=request.getContextPath() %>/images/tools-moveright.gif" style="border-style:none;vertical-align: middle">
								 </a>
							</span>
						</li>
						<li class="s-right-one">
						    <a id="dlzsButton" href="#" class="easyui-linkbutton c100 shadow" data-options="onClick:querySjfhfb">查询</a>
						</li>
					</ul>
					<!-- 时间负荷 end -->
					
					<!-- 超容分析begin -->
		    		<ul id="fhSearchDiv3" class="s-ul-one" style="display:none;">
						<li style="padding-left: 10px;">
			                <span class="tools-labelgroup" style="vertical-align:middle;border-style:none;">
							    <a id="leftsjfhS3" href="#" style="border-style:none;">
	                 				<img alt="前一天" src="<%=request.getContextPath() %>/images/tools-moveleft.gif" style="border-style:none;vertical-align: middle">
	                 			</a>
	                		</span>
	                        <span class="tools-labelgroup" style="vertical-align:middle;">
								<input id="startDate" class="Wdate" type="text" style="width: 155px;height:24px; text-align: left;" onClick="WdatePicker({dateFmt:'yyyy-MM',onpicked:changeSuper,isShowClear:false,readOnly:true})"/>
							</span>
							<span class="tools-labelgroup" style="vertical-align:middle;border-style:none;">
			    				 <a id="rightsjfhE3" href="#" style="border-style:none;">
									<img alt="后一天" src="<%=request.getContextPath() %>/images/tools-moveright.gif" style="border-style:none;vertical-align: middle">
								 </a>
							</span>
						</li>
						<li class="s-right-one">
						    <a id="dlzsButton" href="#" class="easyui-linkbutton c100 shadow" data-options="onClick:querySuper">查询</a>
						</li>
					</ul>
        			<!-- 超容分析end -->
				</div>
				
					<div id="bigTab" class="easyui-tabs auto-resize noOverflow" data-options="border:false">   
					    
					    
					    <!-- 负荷tab -->
					    <div title="负荷" class="main-panel noOverflow" style="overflow-x:hidden;">
					    	<div class="easyui-panel" style="width: 100%;position: relative;" data-options="onResize:autoResize,border:false">
								<!-- 二级tab -->
								<div class="tab-panel active" id="fx" style="overflow-x: hidden;">
									<ul id="mytab-fh" class="nav nav-pills" style="margin:5px 0 0 5px;">
										<li id="fhqxTab" class="active"><a href="#fhqx" data-toggle="pill" onclick="queryFhqx()">负荷曲线</a></li>
										<li id="sjfhfbTab"><a href="#sjfhfb" data-toggle="pill">时间负荷分布</a></li>
										<li id="superfbTab"><a href="#superfb" data-toggle="pill">超容分析</a></li>
									</ul>
								</div>
					    	</div>
					    	
					    	<div id="fxTab" class="easyui-tabs auto-resize" style="width: 100%;position: relative;" data-options="border:false,showHeader:false">
								<!-- 负荷曲线begin -->
								<div class="main-panel" style="overflow-x: hidden;">
									<div class="auto-resize easyui-panel show-bottom-border" style="width: 100%;min-height:220px;" data-options="border:false,onResize:userResize">
										<div class="chart" id="fhqxChart" style="width: 100%;height: 100%;padding: 10px;box-sizing: border-box;"></div>
									</div>
									<div class="easyui-panel" style="width: 100%;height:80px;" data-options="border:false,onResize:autoResize">
										<!-- 数据表格 -->
										<div id="fgdlbg" style="width: 100%;height: 80px;">
											<div id="fhqxDatagrid" style="height:100%;"></div>
										</div>
									</div>
								</div>
								
								<!-- 负荷曲线end -->
								<!-- 时间负荷分析begin -->
								<div class="main-panel" style="overflow-x: hidden;">
									<div class="auto-resize easyui-panel show-bottom-border" style="width: 100%;min-height:220px;overflow-x: hidden;" data-options="border:false,onResize:userResize">
										<div class="chart" id="sjfhfbChart" style="width: 100%;height: 100%;padding: 10px;box-sizing: border-box;"></div>
									</div>
									<div class="easyui-panel" style="width: 100%;height:100px;overflow: hidden;" data-options="border:false,onResize:autoResize">
										
										<div id="tab-fzl1" class="block2 clearfix" style="width: 100%;margin-bottom:1px;">
											<div class="col col4" style="width:100%">
												<div class="innerBox">
													<p class="label" style="color: #37A09D;float: left; padding-top: 25px;">
														时间负荷分析：<span class="num" id="sjfhfx">-</span>
													</p>
												</div>
											</div>
										</div>
									</div>
								</div>
								<!-- 时间负荷分析end -->
								<!-- 超容分析 BEGIN-->
								<div class="main-panel" style="overflow-x: hidden;">
									<div class="auto-resize easyui-panel show-bottom-border" style="width: 100%;min-height:220px;overflow-x: hidden;" data-options="border:false,onResize:userResize">
										<div class="chart" id="userChart" style="width: 100%;height: 100%;padding: 10px;box-sizing: border-box;"></div>
									</div>
									
									<div class="easyui-panel" style="width: 100%;height:100px;overflow: hidden;" data-options="border:false,onResize:autoResize">
										
										<div id="tab-fzl" class="block2 clearfix" style="width: 100%;margin-bottom:1px;">
											<div class="col col1" style="width:25%">
												<div class="innerBox">
												    <p class="label" style="color: #B763D8;">
														<span class="nums" id="avgCr">-</span>
														<span class="nums" style="font-size:14px">次</span>
													</p>
													<p class="value" style="color: #232323;">
														超容次数<span class="nums" ></span>
													</p>
												</div>
											</div>
											<div class="col col1" style="width:25%">
												<div class="innerBox">
												<p class="label" style="color: #37A09D">
														<span class="nums" id="maxFZL">-</span>
														<span class="nums" style="font-size:14px">min</span>
													</p>
													<p class="value" style="color: #232323;">
														超容总时长<span class="nums" ></span>
													</p>
												</div>
											</div>
											<div class="col col1" style="width:25%">
												<div class="innerBox">
												<p class="label" style="color: orange">
														<span class="nums" id="minFZL">-</span>
														<span class="nums" style="font-size:14px">min</span>
													</p>
													<p class="value" style="color: #232323;">
														平均超容总时长<span class="nums" >-</span>
													</p>
												</div>
											</div>
											<div class="col colNew" style="width:25%">
												<div class="innerBox">
												   <p class="label" style="color: #B763D0;">
														<span class="nums" id="avgFZL">-</span>
														<span class="nums" style="font-size:14px">min</span>
													</p>
													<p class="value" style="color: #232323;">
														超容最大时长：<span class="nums" >-</span>
													</p>
													<p class="value" style="color: #232323;">
														发生时间：<span class="nums" id="mindate">2017-04-17</span>
													</p> 
												</div>
											</div>
										</div>
									</div>
								</div>
								<!-- 超容分析END -->
								
								
							</div>
					    </div> 
					    
					    
					    
					    <div title="电量" class="main-panel noOverflow" style="overflow-x:hidden;">
					    	<div class="easyui-panel" style="width: 100%;position: relative;" data-options="onResize:autoResize,border:false">
								
								<!-- 二级tab -->
								<div class="tab-panel active" id="dianliang" style="overflow-x: hidden;">
									<ul id="mytab-dl" class="nav nav-pills" style="margin:5px 0 0 5px;">
										<li id="dlzsTab" class="active"><a href="#dlzs" data-toggle="pill" onclick="queryDlzs()">电量走势</a></li>
										<li id="fgdlTab"><a href="#fgdl" data-toggle="pill" >峰谷电量</a></li>
									</ul>
								</div>
								
					    	</div>
					    	<div id="dlTab" class="easyui-tabs auto-resize" style="width: 100%;position: relative;" data-options="border:false,showHeader:false">
								<!-- 电量chart -->
								<div class="main-panel" style="overflow-x: hidden;">
									<div class="auto-resize easyui-panel show-bottom-border" style="width: 100%;min-height:220px;" data-options="border:false,onResize:userResize">
										<div class="chart" id="dlzsChart" style="width: 100%;height: 100%;padding: 10px;box-sizing: border-box;"></div>
									</div>
									<div class="easyui-panel" style="width: 100%;" data-options="border:false,onResize:autoResize">
										<!-- 最大最小负荷 -->
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
								<div class="main-panel" style="overflow-x: hidden;">
									<div class="auto-resize easyui-panel show-bottom-border" style="width: 100%;min-height:220px;" data-options="border:false,onResize:userResize">
										<div class="chart" id="fgdlChart" style="width: 100%;height: 100%;padding: 10px;box-sizing: border-box;"></div>
									</div>
									<div class="easyui-panel" style="width: 100%;height: 160px;" data-options="border:false,onResize:autoResize">
										<!-- 数据表格 -->
										<div id="fgdlbg" style="width: 100%;height: 160px;">
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
<script type="text/javascript" src="<%=baseUrl%>/pages/despages/diacrisisAnalyse/khydxw.js"></script>
<script language="javascript" type="text/javascript" src="<%=pagePath%>/common/My97DatePicker/WdatePicker.js"></script>
<script type="text/javascript" src="<%=pagePath%>/common/js/exportynbg.js"></script>
<script type="text/javascript" src="<%=pagePath%>/common/js/treeSelect.js"></script>
<script src="<%=pagePath%>/common/js/templet_common.js"></script>
<script type="text/javascript" src="<%=pagePath%>/common/js/consSelect2.js"></script>
</body>
</html>