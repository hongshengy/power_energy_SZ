<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.frontier.pubmodule.AueicUtil"%>
<%
	String baseUrl  = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+baseUrl+"/";
	String pagePath = baseUrl + "/pages/despages";
	
	String consId = request.getParameter("consId");//获取调用父页面传过来的参数
	String consName = request.getParameter("consName");//获取调用父页面传过来的参数
	String shownTree = "";//左侧树布局
	String shownRightStyle = "";//左侧树布局
	//未获取到企业编码，证明不是客户监控页面调用的，需要加载左侧树进行查询
	if(consId==null || consId.equals("")){//左侧树布局
		shownTree =  "<div id=\"westTree\" data-options=\"region:'west',disabled:true,split:true,title:'导航',border:false\" style=\"width:220px;\">"
					+"  <div style=\"padding: 3px; border-bottom: 1px solid #e7e7e7; background-color: #f2f2f2\">"
					+"    <input id=\"CobConsSelect\" class=\"easyui-textbox\" style=\"width: 98%;\" data-options=\"iconCls:'icon-search'\">"
					+"    <div style=\"position: absolute;top:38px;width:218px;\">"
					+"      <input id=\"consSelect\" class=\"easyui-textbox\" style=\"width: 98%;\" data-options=\"iconCls:'icon-search',prompt:'请输入客户名称'\">"
					+"    </div>"
					+"  </div>"
			 		+"  <div style=\"overflow: auto;top:70px;width:218px;bottom:0px;position: absolute;\">"
					+"    <ul  id=\"tt\" class=\"easyui-tree\" style=\"width:100%;\"  >"
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
<title>客户对标分析</title>

<link rel="stylesheet" type="text/css" href="<%=pagePath %>/common/jquery-easyui-1.5.1/themes/fangtian/easyui.css">
<link rel="stylesheet" type="text/css" href="<%=pagePath %>/common/jquery-easyui-1.5.1/themes/icon.css">
<link rel="stylesheet" type="text/css" href="<%=pagePath %>/common/jquery-easyui-1.5.1/themes/color.css">
<link rel="stylesheet" type="text/css" href="<%=baseUrl %>/pages/areaEnergy/common/css/tree.css">
<link rel="stylesheet" type="text/css" href="<%=pagePath %>/common/css/common.css">
<link rel="stylesheet" type="text/css" href="<%=pagePath %>/common/css/templet_common.css">
<script src="<%=pagePath %>/common/js/maskJs.js"></script>
</head>
<body class="easyui-layout">
<script>
    var maskobj = new maskPanelManager();
    maskobj.register();
</script>
<style>
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
	<%=shownTree%>
	<div class="main-panel noOverflow" data-options="region:'center'" >
		    	<div class="easyui-panel" style="width: 100%;position: relative;" data-options="cls:'fangtian-panel-style',onResize:autoResize">
					<ul class="s-ul-one">
						<li style="padding-left: 10px;">
			                <span class="tools-labelgroup" style="vertical-align:middle;border-style:none;">
							    <a id="left" href="#" style="border-style:none;">
	                 				<img alt="前一天" src="<%=request.getContextPath() %>/images/tools-moveleft.gif" style="border-style:none;vertical-align: middle">
	                 			</a>
	                		</span>
	                        <span class="tools-labelgroup" style="vertical-align:middle;">
								<input id="startDateD"  class="Wdate" type="text" style="width: 100px;height:24px; text-align: left;" onClick="WdatePicker({dateFmt:'yyyy-MM-dd',onpicked:changeDate,isShowClear:false,readOnly:true})" />
					  			<input id="startDateM"  class="Wdate" type="text" style="display:none;width: 100px;height:24px; text-align: left;" onClick="WdatePicker({dateFmt:'yyyy-MM',onpicked:changeDate,isShowClear:false,readOnly:true})"  />
					  			<!-- <input id="startDateY"  class="Wdate" type="text" style="display:none;width: 100px;height:24px; text-align: left;" onClick="WdatePicker({dateFmt:'yyyy',onpicked:changeDate,isShowClear:false,readOnly:true})"  /> -->				
							</span>
							<span class="tools-labelgroup" style="vertical-align:middle;border-style:none;">
			    				 <a id="right" href="#" style="border-style:none;">
									<img alt="后一天" src="<%=request.getContextPath() %>/images/tools-moveright.gif" style="border-style:none;vertical-align: middle">
								 </a>
							</span>
							<span class="tools-labelgroup">
								<select id="queryType" class="easyui-combobox" name="dept" data-options="prompt:'请选择',height:24,editable:false,width:100,panelHeight:'auto'">   
									<option value="D" selected>日曲线</option>
									<option value="M">月曲线</option>
									<!-- <option value="Y">年曲线</option>    -->
								</select>
							</span>
						</li>
						<li class="s-right-one">
						    <a id="search" href="#" class="easyui-linkbutton c100 shadow">查询</a>
						</li>
					</ul>
				</div>
				<div id="content-panel" class="auto-resize easyui-panel main-panel noOverflow" style="width: 100%;" data-options="cls:'fangtian-panel-style bottom-padding'">
					<div id="tb1" class="easyui-tabs noOverflow" style="width:100%;height:100%" data-options="border:false">   
					    <div title="负荷" class="main-panel noOverflow">
					    	<div class="easyui-panel" style="width: 100%;position: relative;" data-options="onResize:autoResize,border:false">
					    		<!-- 二级tab -->
								<div class="tab-panel active" style="overflow-x: hidden;">
									<ul id="mytab-fh" class="nav nav-pills" style="margin:5px 0 0 5px;">
										<li id="fhqxTab" class="active"><a href="#" data-toggle="pill">负荷曲线</a></li>
										<li id="fhlTab"><a href="#" data-toggle="pill">负荷率</a></li>
										<li id="fzlTab"><a href="#" data-toggle="pill">负载率</a></li>
									</ul>
								</div>
					    	</div>
					    	<div class="auto-resize easyui-panel" style="width: 100%;" data-options="border:false,onResize:userResize">
								<div id="fhChart" class="chart" style="width: 100%;height: 100%;padding: 10px;box-sizing: border-box;overflow:hidden;"></div>
							</div>
					    </div>   
					    <div title="电量" class="main-panel noOverflow">   
					        <div class="easyui-panel" style="width: 100%;position: relative;" data-options="onResize:autoResize,border:false">
					    		<!-- 二级tab -->
								<div class="tab-panel active" style="overflow-x: hidden;">
									<ul id="mytab-dl" class="nav nav-pills" style="margin:5px 0 0 5px;">
										<li id="dlzsTab" class="active"><a href="#" data-toggle="pill">电量走势</a></li>
										<li id="fgdlTab"><a href="#" data-toggle="pill" >峰谷电量</a></li>
									</ul>
								</div>
					    	</div>
					    	<div class="auto-resize easyui-panel" style="width: 100%;" data-options="border:false,onResize:userResize">
								<div id="dlChart" class="chart" style="width: 100%;height: 100%;padding: 10px;box-sizing: border-box;overflow:hidden;"></div>
							</div>
					    </div>   
					</div>  
						
						<!--<div id="c-panel" class="auto-resize easyui-panel" style="width: 100%;" data-options="border:false,onResize:userResize">
							<div class="chart" style="width: 100%;height: 100%;padding: 10px;box-sizing: border-box;"></div>
							<div class="chart" style="width: 100%;height: 100%;padding: 10px;box-sizing: border-box;"></div>
						</div>-->
					
				</div>
		    </div>  
	
<script type="text/javascript">
	webContextRoot="<%=basePath%>";
	consId = "<%=consId%>";
	consName = "<%=consName%>";
</script>
<!-- 加载顺序不可颠倒 -->
<script type="text/javascript" src="<%=pagePath %>/common/js/dateUtil.js"></script>
<script type="text/javascript" src="<%=pagePath %>/common/jquery-easyui-1.5.1/jquery.min.js"></script>
<script type="text/javascript" src="<%=pagePath %>/common/echarts/echarts.min.js"></script>
<script type="text/javascript" src="<%=pagePath %>/common/jquery-easyui-1.5.1/jquery.easyui.min.js"></script>
<script type="text/javascript" src="<%=pagePath %>/common/jquery-easyui-1.5.1/easyui-lang-zh_CN.js"></script>
<script type="text/javascript" src="<%=baseUrl%>/pages/despages/diacrisisAnalyse/khdbfx.js"></script>
<script language="javascript" type="text/javascript" src="<%=pagePath%>/common/My97DatePicker/WdatePicker.js"></script>
<script type="text/javascript" src="<%=pagePath%>/common/js/treeSelect.js"></script>
<script src="<%=pagePath%>/common/js/templet_common.js"></script>
</body>
</html>