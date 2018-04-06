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
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="Cache-Control" content="no-cache" />
<meta http-equiv="Expires" content="0" />
<title>行业用电</title>
<link rel="stylesheet" href="<%=pagePath%>/jquery-easyui-1.5.1/themes/fangtian/easyui.css">
<link rel="stylesheet" href="<%=pagePath%>/jquery-easyui-1.5.1/themes/icon.css">
<link rel="stylesheet" href="<%=pagePath%>/jquery-easyui-1.5.1/themes/color.css">
<link rel="stylesheet" href="<%=pagePath%>/css/common.css">
<link rel="stylesheet" type="text/css" href="<%=pagePath %>/css/templet_common.css">
<link rel="stylesheet" href="<%=treePagePath%>/css/tree.css">
<script src="<%=pagePath%>/js/maskJs.js"></script>
<style type="text/css">
#da{
/* border:1px solid #000; */
/* text-align:center; */
width:100%;
height:100%;
border-collapse:collapse;
/* font-size:18px; */
}
#da td{
border:1px solid #D9D7D0;
}
#da tr:first-child td{
border-top:none;
}
#consName{
border-top:none;
}
.td_head{
background-color:#F2F2F2;
}
#hy_dialog td{
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
/* word-wrap:break-word;
word-break:break-all; */
}


</style>
</head>

<body class="easyui-layout">
	<script>
	    var maskobj = new maskPanelManager();
	    maskobj.register();
	</script>
	<%=shownTree%>	
	<div class="main-panel noOverflow"  data-options="region:'center',border:false">
		<div class="easyui-panel" style="width:100%;position: relative;overflow:hidden;"  data-options="cls:'fangtian-panel-style',onResize:autoResize">
			<ul class="ulTable" >
				<li style="padding-left: 10px;">
				   <span class="tools-labelgroup" style="vertical-align:middle;border-style:none;">
              				 <a onclick="" id="left" href="javascript:qytQueryOveride('-1');" style="border-style:none;"> 
              				 	<img alt="前一天" src="<%=request.getContextPath()%>/images/tools-moveleft.gif" height="14px" width="14px" style="border-style:none;vertical-align: middle;">
						 </a>
              			</span> 
                       <span class="tools-labelgroup" style="vertical-align:middle;">
                            <input type="text" class="Wdate" style="text-align: left;" data-options="width:155,editable:false" id="dataDate" onClick="WdatePicker({dateFmt:'yyyy-MM',onpicked:changeDate,isShowClear:false,readOnly:true})"/>
					</span>
					<span class="tools-labelgroup" style="vertical-align:middle;border-style:none;">
						<a onclick="" id="right" href="javascript:qytQueryOveride('1');" style="border-style:none;"> 
							<img alt="后一天" src="<%=request.getContextPath()%>/images/tools-moveright.gif" height="14px" width="14px" style="border-style:none;vertical-align: middle;">
						</a>
					</span>
				<li style="float:right;padding-right: 10px;">
					<span style="vertical-align: bottom;">
				    	<a id="search" href="#" class="easyui-linkbutton c100 shadow" onClick="loadData()">查询</a>
				    </span>
				</li>
			</ul>
		</div>
		
		<div id="content-panel" class="auto-resize easyui-panel main-panel" style="width: 100%;overflow-x:hidden;" data-options="cls:'fangtian-panel-style bottom-padding'">
			<div class="easyui-panel" style="width: 100%;height:100%;position: relative;" data-options="border:false,onResize:userResize">
				<div>
					<div style="float:left;width:49.5%;height:220px;
					border-bottom:1px solid #D9D7D0;" data-options="onResize:userResize">
						<div id="mychart" class="chart" style="width: 100%;height:100%;padding: 10px;box-sizing: border-box;"></div>
					</div>
					<div style="float:left;width:50%;height:220px;">
						<table id="da" style="margin-top:1px;">
							<colgroup>
								<col class="td_head" width="50%"></col>
								<col width="50%"></col>
							</colgroup>
							<tr><td>客户名称：</td><td id="consName"></td></tr>
							<tr><td>所属行业：</td><td id="codeName"></td></tr>
							<tr><td>本月用电(kWh)：</td><td id="energyP"></td></tr>
							<tr><td>上月用电(kWh)：</td><td id="lastMonthEnergyP"></td></tr>
							<tr><td>去年同期(kWh)：</td><td id="lastYearEnergyP"></td></tr>
							<tr><td>环比：</td><td id="hb"></td></tr>
							<tr><td>同比：</td><td id="tb"></td></tr>
						</table>
					</div>
				</div>
				<div style="width:100%;height:186px;">
					<!-- <div id="up_buttons">
						<a href="#" class="easyui-linkbutton" plain="true" style="width: 80px;" onclick="up_add();" data-options="iconCls:'icon-add'">新增</a>
						<a href="#" class="easyui-linkbutton" plain="true" style="width: 80px;" onclick="up_delete();" data-options="iconCls:'icon-remove'">删除</a>
					</div> -->
					<!--内容区域（表格、图表等）-->
					<div id="up_datagrid"  title="上游行业"></div>
				</div>
				<div style="width:100%;height:186px;border-top:1px solid #D9D7D0;">
					<!-- <div id="down_buttons">
						<a href="#" class="easyui-linkbutton" plain="true" style="width: 80px;" onclick="down_add();" data-options="iconCls:'icon-add'">新增</a>
						<a href="#" class="easyui-linkbutton" plain="true" style="width: 80px;" onclick="down_delete();" data-options="iconCls:'icon-remove'">删除</a>
					</div> -->
					<!--内容区域（表格、图表等）-->
					<div id="down_datagrid"  title="下游行业"></div>
				</div>
		    </div>
		</div>
	</div>

<script type="text/javascript">
	webContextRoot="<%=basePath%>";
	consId = "<%=consId%>";
	consName = "<%=consName%>";
</script>

<script src="<%=pagePath%>/jquery-easyui-1.5.1/jquery.min.js"></script>
<script src="<%=pagePath%>/jquery-easyui-1.5.1/jquery.easyui.min.js"></script>
<script src="<%=pagePath%>/jquery-easyui-1.5.1/easyui-lang-zh_CN.js"></script>
<script src="<%=pagePath%>/js/common.js"></script>
<script type="text/javascript" src="<%=pagePath%>/js/dateUtil.js"></script>
<script type="text/javascript" src="<%=pagePath%>/echarts/echarts.min.js"></script>
<script type="text/javascript" src="<%=pagePath%>/echarts/echartsGlobal.js"></script>
<script type="text/javascript" src="<%=pagePath%>/js/treeSelect.js"></script>
<script language="javascript" type="text/javascript" src="<%=pagePath%>/My97DatePicker/WdatePicker.js"></script>
<script src="<%=pagePath%>/js/templet_common.js"></script>
<script type="text/javascript" src="industryEnergy.js"></script>
</body>
</html>
