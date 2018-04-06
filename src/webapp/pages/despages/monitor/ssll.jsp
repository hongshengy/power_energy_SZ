<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String baseUrl = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ baseUrl + "/";
	String pagePath = baseUrl + "/pages/despages/common";
	String treePagePath = baseUrl + "/pages/areaEnergy/common";

	/* session.setAttribute("itemCode","despower");
	 session.setAttribute("itemName","变压器监测"); */

	String consName = request.getParameter("consName");//获取调用父页面传过来的参数
	String sfMpId = request.getParameter("sfMpId");//获取调用父页面传过来的参数
	String mpCode = request.getParameter("mpCode");//获取调用父页面传过来的参数
	String title = new String();
	if(mpCode!=null) title = mpCode.equals("SSSL")?"瞬时水量":"累计水量";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN""http://www.w3c.org/TR/HTML4/loose.dtd">

<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="Cache-Control" content="no-cache" />
<meta http-equiv="Expires" content="0" />
<title><%=title %></title>
<link rel="stylesheet" href="<%=pagePath%>/jquery-easyui-1.5.1/themes/fangtian/easyui.css">
<link rel="stylesheet" href="<%=pagePath%>/jquery-easyui-1.5.1/themes/icon.css">
<link rel="stylesheet" href="<%=pagePath%>/jquery-easyui-1.5.1/themes/color.css">
<link rel="stylesheet" href="<%=pagePath%>/css/common.css">
<link rel="stylesheet" type="text/css" href="<%=pagePath %>/css/templet_common.css">
<link rel="stylesheet" href="<%=treePagePath%>/css/tree.css">
<script src="<%=pagePath%>/js/maskJs.js"></script>
<style type="text/css">
</style>
</head>

<body class="easyui-layout">
	<script>
	    var maskobj = new maskPanelManager();
	    maskobj.register();
	</script>
	<div class="main-panel noOverflow"  data-options="region:'center',border:false">
		<div class="easyui-panel" style="width:100%;position: relative;"  data-options="cls:'fangtian-panel-style',onResize:autoResize">
			<ul class="s-ul-one" >
				<li>
				   <span class="tools-labelgroup" style="vertical-align:middle;border-style:none;">
              				 <a onclick="" id="left" href="javascript:qytQueryOveride('-1');" style="border-style:none;"> 
              				 	<img alt="前一天" src="<%=request.getContextPath()%>/images/tools-moveleft.gif" height="14px" width="14px" style="border-style:none;vertical-align: middle;">
						 </a>
              			</span> 
                       <span class="tools-labelgroup" style="vertical-align:middle;">
                            <input type="text" class="Wdate" style="text-align: left;" data-options="width:155,editable:false" id="dataDate" onClick="WdatePicker({dateFmt:'yyyy-MM-dd',onpicked:changeDate,isShowClear:false,readOnly:true})"/>
					</span>
					<span class="tools-labelgroup" style="vertical-align:middle;border-style:none;">
						<a onclick="" id="right" href="javascript:qytQueryOveride('1');" style="border-style:none;"> 
							<img alt="后一天" src="<%=request.getContextPath()%>/images/tools-moveright.gif" height="14px" width="14px" style="border-style:none;vertical-align: middle;">
						</a>
					</span>
				</li>
				<li class="s-right-one">
					<span style="vertical-align: bottom;">
				    	<a id="search" href="#" class="easyui-linkbutton c100 shadow">查询</a>
				    </span>
				</li>
			</ul>
		</div>
		
		<div class="easyui-panel auto-resize" style="width: 100%;position: relative;" data-options="border:false,onResize:userResize">
			<div id="myChart"  class="chart" style="width: 100%;height:100%;padding: 10px;box-sizing: border-box;"></div>
       	</div>
	</div>

<script type="text/javascript">
	webContextRoot="<%=basePath%>";
	consName = "<%=consName%>";
	sfMpId = "<%=sfMpId%>";
	mpCode = "<%=mpCode%>";
</script>

<script src="<%=pagePath%>/jquery-easyui-1.5.1/jquery.min.js"></script>
<script src="<%=pagePath%>/jquery-easyui-1.5.1/jquery.easyui.min.js"></script>
<script src="<%=pagePath%>/jquery-easyui-1.5.1/easyui-lang-zh_CN.js"></script>
<script src="<%=pagePath%>/js/common.js"></script>
<script type="text/javascript" src="<%=pagePath%>/js/dateUtil.js"></script>
<script type="text/javascript" src="<%=pagePath%>/js/jQuery.resizeEnd.min.js"></script>
<script type="text/javascript" src="<%=pagePath%>/echarts/echarts.min.js"></script>
<script type="text/javascript" src="<%=pagePath%>/echarts/echartsGlobal.js"></script>
<script type="text/javascript" src="<%=pagePath%>/js/treeSelect.js"></script>
<script language="javascript" type="text/javascript" src="<%=pagePath%>/My97DatePicker/WdatePicker.js"></script>
<script src="<%=pagePath%>/js/templet_common.js"></script>
<script type="text/javascript" src="ssll.js"></script>
</body>
</html>
