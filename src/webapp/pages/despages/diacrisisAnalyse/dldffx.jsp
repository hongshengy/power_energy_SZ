<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.frontier.pubmodule.AueicUtil"%>
<%
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
<title>电量电费分析</title>

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
	
	<%=shownTree%>

	<div class="main-panel noOverflow" data-options="region:'center',border:false" >
	 
		<div id="content-panel" class="auto-resize easyui-panel main-panel noOverflow" style="width: 100%;height:100%;" data-options="cls:'fangtian-panel-style bottom-padding'">
	    	<div class="easyui-panel show-bottom-border" style="width: 100%;position: relative;" data-options="onResize:autoResize,border:false">
				<ul class="s-ul-one" >
					<li>
		                <span class="tools-labelgroup" style="vertical-align:middle;border-style:none;">
						    <a id="leftfgdl" href="#" style="border-style:none;">
                 				<img alt="前一天" src="<%=request.getContextPath() %>/images/tools-moveleft.gif" style="border-style:none;vertical-align: middle">
                 			</a>
                		</span>
                        <span class="tools-labelgroup" style="vertical-align:middle;">
                             <input id="fgdlEDateY"  class="Wdate" type="text" style="width: 120px; text-align: left;" onClick="WdatePicker({dateFmt:'yyyy',onpicked:changefgdl,isShowClear:false,readOnly:true})"/>
						</span>
						<span class="tools-labelgroup" style="vertical-align:middle;border-style:none;">
		    				 <a id="rightfgdl" href="#" style="border-style:none;">
								<img alt="后一天" src="<%=request.getContextPath() %>/images/tools-moveright.gif" style="border-style:none;vertical-align: middle">
							 </a>
						</span>
					</li>
					<li class="s-right-one">
					    <a id="search" href="#" class="easyui-linkbutton c100 shadow" data-options="onClick:queryFgdl">查询</a>
					</li>
				</ul>
			</div>
			
			<div class="easyui-panel main-panel auto-resize" style="width: 100%;position: relative;overflow-x:hidden;" data-options="onResize:autoResize,border:false">
				<!-- <div id="tabs" class="easyui-tabs" style="width: 100%;height: 100%;" data-options="border:false">
					<div title="电量电费分析" data-options="selected:true,onResize:userResize"> -->
				        <div class="auto-resize easyui-panel" style="width: 100%;" data-options="border:false,onResize:userResize">
						   <div id="fgdlChart" class="chart" style="width: 100%;min-height:280px;height:60%;padding: 10px;box-sizing: border-box;border-bottom:solid 1px #CCCCCC;"></div>
						   <div style="width: 100%; min-height: 200px;height:40%;">
					        	<table id="fgdlData"></table>
					       </div>
						</div>
				    <!-- </div>   
				</div> -->
			</div>
			
		</div>
	</div>
	
    <div id="dldffxDialog">
    	<div id="dlfsData"></div>
    </div> 
    
         
<script type="text/javascript">
	webContextRoot="<%=basePath%>";
	consId = "<%=consId%>";
	consName = "<%=consName%>";
	funcId = "<%=funcId%>";
</script>
<!-- 加载顺序不可颠倒 -->
<script type="text/javascript" src="<%=pagePath %>/common/js/dateUtil.js"></script>
<script type="text/javascript" src="<%=pagePath %>/common/jquery-easyui-1.5.1/jquery.min.js"></script>
<script type="text/javascript" src="<%=pagePath %>/common/echarts/echarts.min.js"></script>
<script type="text/javascript" src="<%=pagePath %>/common/jquery-easyui-1.5.1/jquery.easyui.min.js"></script>
<script type="text/javascript" src="<%=pagePath %>/common/jquery-easyui-1.5.1/easyui-lang-zh_CN.js"></script>
<script type="text/javascript" src="<%=baseUrl%>/pages/despages/diacrisisAnalyse/dldffx.js"></script>
<script language="javascript" type="text/javascript" src="<%=pagePath%>/common/My97DatePicker/WdatePicker.js"></script>
<script type="text/javascript" src="<%=pagePath%>/common/js/treeSelect.js"></script>
<script type="text/javascript" src="<%=pagePath%>/common/js/consSelect2.js"></script>
<script src="<%=pagePath%>/common/js/templet_common.js"></script>
</body>
</html>