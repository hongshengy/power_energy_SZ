<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%

String baseUrl  = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+baseUrl+"/";
String pagePath = baseUrl + "/pages/despages/common";	
String treePagePath = baseUrl + "/pages/areaEnergy/common";	
String consId = request.getParameter("consId");//获取调用父页面传过来的参数
String consName = request.getParameter("consName");//获取调用父页面传过来的参数
String funcId = request.getParameter("funcId");//获取调用父页面传过来的参数
//consId="101000004001";
//consName="立霸实业有限公司";
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
	
session.setAttribute("itemCode","bandAnalyse");
session.setAttribute("itemName","谐波分析");
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
    <title>谐波分析</title>
    <link rel="stylesheet" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/fangtian/easyui.css">
    <link rel="stylesheet" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/icon.css">
    <link rel="stylesheet" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/color.css">
    <link rel="stylesheet" href="<%=pagePath %>/css/common.css">
    <link rel="stylesheet" href="<%=treePagePath %>/css/tree.css">
    <link rel="stylesheet" type="text/css" href="<%=pagePath %>/css/templet_common.css">
    <script src="<%=pagePath %>/js/maskJs.js"></script>
<style type="text/css">

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
</style>
</head>
  
<body class="easyui-layout">
	<script>
	    var maskobj = new maskPanelManager();
	    maskobj.register();
	</script>  
	<%=shownTree%>
	
	<div class="main-panel noOverflow" data-options="region:'center'" >
         <div class="easyui-panel" style="width: 100%;position: relative;" data-options="cls:'fangtian-panel-style',onResize:autoResize">
				<ul class="ulTable">
					<li style="padding-left: 10px;">
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
					<li style="float:right;padding-right: 10px;">
	                    <a id="bt_exportdnzl" href="#" class="easyui-linkbutton c100 shadow" >谐波检测报告</a>
                        <div style="display:none"><div id="gridDiv" style="display:none" class="easyui-datagrid" data-options="striped:true,border:false,singleSelect:true,url:'',method:'get'"></div></div>
					</li>
				</ul> 
			</div>
			
			<div id="content-panel" class="auto-resize easyui-panel main-panel noOverflow" style="width: 100%;" data-options="cls:'fangtian-panel-style bottom-padding'">
			 	<div class="easyui-panel show-bottom-border" style="width: 100%;position: relative;" data-options="onResize:autoResize,border:false">
					
					<ul class="s-ul-one" >
						<li>
						    <span class="tools-labelgroup">
						         <select id="byq" class="easyui-combobox" data-options="width:130,panelHeight:'auto',panelWidth:130,editable:false"></select>
							</span>
			                <span class="tools-labelgroup" >
                  				 <a id="left" href="#" style="border-style:none;">
	                       		  <img style="border-style:none;vertical-align: middle" height="14px" width="14px"  alt="前一年" src="<%=request.getContextPath() %>/images/tools-moveleft.gif"></a>
                 			</span> 
	                        <span class="tools-labelgroup" >
	                             <input id="startDate" class="Wdate" type="text" style="width: 100px;text-align: left;"  onClick="WdatePicker({dateFmt:'yyyy-MM-dd',onpicked:changeDate,isShowClear:false,readOnly:true})"/>
							</span>
							<span class="tools-labelgroup">
								<a id="right" href="#" style="border-style:none;">
								<img style="border-style:none;vertical-align: middle" height="14px" width="14px" alt="后一年" src="<%=request.getContextPath() %>/images/tools-moveright.gif"></a>
							</span>
						</li>
                		<li class="s-right-one">
                		<span style="vertical-align: bottom;"><a id="search" href="#" class="easyui-linkbutton c100">查询</a></span>
                		</li>
					</ul> 
					 
				</div>
				 
				<div class="easyui-panel auto-resize" style="width: 100%;position: relative;" data-options="border:false">
				<div id="tabs" class="easyui-tabs" style="width: 100%;height: 100%;" data-options="border:false">
					<div title="谐波" data-options="selected:true,onResize:userResize" style="overflow-x: hidden;">
						<!-- 二级tab -->
						<div class="tab-panel active" id="dianliang" style="overflow-x: hidden;">
							<ul id="mytab-xb" class="nav nav-pills" style="margin:5px 0 0 5px;">
								<li id="xb_dy_bt" class="active"><a data-toggle="pill" onclick="">电压</a></li>
								<li id="xb_dl_bt"><a data-toggle="pill" >电流</a></li>
							</ul>
						</div>
				    	
				    	<div id="xb_content" class="auto-resize" style="width: 100%;position: relative;" data-options="border:false,showHeader:false">
							<div id="xb_dy_div" title="电压" data-options="onResize:userResize">
						        <div style="width: 100%;min-height: 280px;height:50%;">
						        	<table id="kbfxdy-datagrid"></table>
						        </div> 
					          	<div class="chart"  id="dyChart" style="width: 100%;min-height:280px;height:50%;padding: 10px;box-sizing: border-box;"></div>
						    </div>   
						    <div id="xb_dl_div" title="电流" data-options="onResize:userResize" style="display:none;">   
						    	<div style="width: 100%;min-height: 280px;height:50%;">
						        	<table id="kbfxdl-datagrid"></table>
						        </div> 
					          	<div class="chart"  id="dlChart" style="width: 100%;min-height: 280px;height:50%;padding: 10px;box-sizing: border-box;"></div>
						    </div>   
						</div>
						<!-- 金坛特制谐波 -->
						<div id="jt_xb_content" class="auto-resize" style="width: 100%;position: relative;display:none;" data-options="border:false,showHeader:false">
							<div id="jt_xb_dy_div" title="电压" data-options="onResize:userResize">
					          	<div class="chart"  id="jtdyChart" style="width: 100%;min-height:280px;height:50%;padding: 10px;box-sizing: border-box;"></div>
					          	<div style="width: 100%;height:100px;">
						        	<table id="jt_xbfxdy_datagrid"></table>
						        </div> 
						    </div>   
						    <div id="jt_xb_dl_div" title="电流" data-options="onResize:userResize" style="display:none;">   
					          	<div class="chart"  id="jtdlChart" style="width: 100%;min-height: 280px;height:50%;padding: 10px;box-sizing: border-box;"></div>
					          	<div style="width: 100%;height:100px;">
						        	<table id="jt_xbfxdl_datagrid"></table>
						        </div> 
						    </div>  
						</div>
					</div>
					
					<div title="三相电流不平衡" class="main-panel auto-resize " data-options="onResize:autoResize" style="overflow-x:hidden;">
					<!-- <div title="三相电流不平衡" data-options="selected:false,onResize:userResize" style="overflow-x: hidden;"> -->
						<div class="auto-resize easyui-panel noOverflow" style="width: 100%;min-height:280px;" data-options="border:false,onResize:userResize">
						   <div id="sxdlbphChart" class="chart" style="width: 100%;height:100%;min-height: 280px;padding: 10px;box-sizing: border-box;border-bottom:solid 1px #CCCCCC;"></div>
						</div>
						
						<div style="margin: 20px 30px;font-size: 16px; color: #B763D8;" data-options="onResize:userResize">
							<span style="color: #37A09D">三相电流不平衡度：</span><span id="bph" style="color: #37A09D"></span>
							<div>危害：</div>
							<div>
								<ol style="margin:5px 0 0 5px;">
									<li>降低设备使用效率及寿命；</li>
									<li>增加设备维护费用；</li>
									<li>中性线电流增大，发热、增加线损。</li>
								</ol>
							</div>
							<div style="color:#000;font-size: 12px;margin-top:5px;">PS：三相电流不平衡度是由变压器低压侧线路IA、IB、IC三相电流数据计算得来；计算公式：MAX(相电流-三相平均电流)/三相平均电流</div>
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
		funcId = "<%=funcId%>";
</script>

 <script src="<%=pagePath %>/jquery-easyui-1.5.1/jquery.min.js"></script>
 <script src="<%=pagePath %>/jquery-easyui-1.5.1/jquery.easyui.min.js"></script>
 <script src="<%=pagePath %>/jquery-easyui-1.5.1/easyui-lang-zh_CN.js"></script>
 <script src="<%=pagePath %>/js/common.js"></script>
 <script type="text/javascript" src="<%=pagePath%>/js/dateUtil.js"></script>
 <script type="text/javascript" src="<%=pagePath %>/echarts/echarts.min.js"></script>
 <script type="text/javascript" src="<%=pagePath%>/echarts/echartsGlobal.js"></script>
 <script language="javascript" type="text/javascript" src="<%=pagePath%>/My97DatePicker/WdatePicker.js"></script>
 <script src="<%=pagePath%>/js/templet_common.js"></script>
 <script type="text/javascript" src="<%=pagePath%>/pinyinjs-master/pinyin_dict_firstletter.js"></script>
 <script type="text/javascript" src="<%=pagePath%>/pinyinjs-master/pinyinUtil.js"></script>
 <%-- <script type="text/javascript" src="<%=pagePath%>/js/consSelect.js"></script> --%>
 <script type="text/javascript" src="bandAnalyse.js"></script> 
 <script type="text/javascript" src="<%=pagePath %>/js/exportdnzl.js"></script>
 <script type="text/javascript" src="<%=pagePath%>/js/treeSelect.js"></script>
 <script type="text/javascript" src="<%=pagePath%>/js/consSelect2.js"></script>
</body>
</html>
