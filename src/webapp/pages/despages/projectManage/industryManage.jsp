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
<title>行业上下游管理</title>
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
border-collapse:collapse;
/* font-size:18px; */
}
#da td{
border:1px solid #D9D7D0;
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

.row{
	margin: 0 0 2px 0;
}
	
.row_regiontitle{
	margin:0 0 5px 0;
}

.row_regiontitle .row-regionbutton{
	font-weight: bold;
	color: #222;
	font-size: 12px !important;
}

.row_region{
	padding: 1px 0;
	border-top:1px dashed #eee;
}
	
.row-regionbutton{
	padding: 1px 5px;
	background-color: inherit;
	color: #666;
	font-size: 12px !important;
}


.row-regionbutton.active, .row-regionbutton:active{
	background-color: #009b9b;
	color:#fff;
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
		<div class="easyui-panel" style="width:100%;position: relative;"  data-options="cls:'fangtian-panel-style',onResize:autoResize,border:false">
			<div>
				<table id="da" style="width:100%;height:126px;">
					<colgroup>
						<col class="td_head" width="13.33%"></col>
						<col width="20%"></col>
						<col class="td_head" width="13.33%"></col>
						<col width="20%"></col>
						<col class="td_head" width="13.33%"></col>
						<col width="20%"></col>
					</colgroup>
					<tr>
						<td>客户编号：</td><td id="da_consNo"></td>
						<td>客户名称：</td><td id="da_consName"></td>
						<td>服务中心：</td><td id="da_areaName"></td>
					</tr>
					<tr>
						<td>合同容量：</td><td id="da_contractCap"></td>
						<td>客户类型：</td><td id="da_userType"></td>
						<td>客户状态：</td><td id="da_status"></td>
					</tr>
					<tr>
						<td>电压等级：</td><td id="da_volt"></td>
						<td>用电地址：</td><td id="da_elecAddr"></td>
						<td>预防性试验日期：</td><td id="da_testDate"></td>
					</tr>
					<tr>
						<td>考核因数：</td><td id="da_userCheckCos"></td>
						<td>所属行业：</td><td id="da_trade"></td>
						<td>建档日期：</td><td id="da_createDate"></td>
					</tr>
				</table>
			</div>
		</div>
		<!-- 
		<td>联系人：</td><td id="da_contractName"></td>
		<td>联系电话：</td><td id="da_telephone"></td> 
		<td>服务开始时间：</td><td id="da_startDate"></td>
		<td>服务结束时间：</td><td id="da_endDate"></td>
		<td>安装时间：</td><td id="da_stopDate"></td>
		<td>经度：</td><td id="da_x"></td>
		<td>纬度：</td><td id="da_y"></td>
		-->
		<div id="content-panel" class="auto-resize easyui-panel main-panel" style="width: 100%;overflow:hidden;" data-options="cls:'fangtian-panel-style bottom-padding'">
			<div class="easyui-panel" style="width: 100%;height:100%;position: relative;overflow:hidden;" data-options="border:false">
				<div style="float:left;width:50%;height:100%;">
					<div style="width:100%;height:100%;">
						<!-- <div class="easyui-panel" title="上游行业">
						</div> -->
						<div id="up_buttons">
							<a href="#" class="easyui-linkbutton" plain="true" style="width: 80px;" onclick="up_add();" data-options="iconCls:'icon-add'">新增</a>
							<a href="#" class="easyui-linkbutton" plain="true" style="width: 80px;" onclick="up_delete();" data-options="iconCls:'icon-remove'">删除</a>
						</div>
						<!--内容区域（表格、图表等）-->
						<div id="up_datagrid"  title="上游行业"></div>
					</div>
				</div>
				<div style="float:left;width:50%;height:100%;">
					<div style="width:100%;height:100%;border-left:1px solid #D9D7D0;">
						<!-- <div class="easyui-panel" title="下游行业">
						</div> -->
						<div id="down_buttons">
							<a href="#" class="easyui-linkbutton" plain="true" style="width: 80px;" onclick="down_add();" data-options="iconCls:'icon-add'">新增</a>
							<a href="#" class="easyui-linkbutton" plain="true" style="width: 80px;" onclick="down_delete();" data-options="iconCls:'icon-remove'">删除</a>
						</div>
						<!--内容区域（表格、图表等）-->
						<div id="down_datagrid"  title="下游行业"></div>
					</div>
				<div>
		    </div>
		</div>
	</div>

      	<div id="hy_dialog" class="easyui-dialog"  title="行业选择" style="display:none;align:center;overflow-x:hidden;z-index:3;width:1024px;height:500px;"
			data-options="minimizable:false,maximizable:false,collapsible:false,resizable:true,modal:true,closed:true"> 
        	
        	<div style="height:90%;width:100%;overflow:auto;">
        		
								<!-- 多个行业拼接而成 -->
								<div data-toggle="buttons" style=" display: inline-block; width: 100%;"> 
									<div  class="row_region" style=" display: inline-block; width: 180px; box-sizing: border-box; vertical-align: top; "> 
										<div id="fatherHy" style=" display: inline-block;"></div>
										</div> 
										<div class="row_region" id="getHyList" style=" display: inline-block; width: 820px; box-sizing: border-box; "> 
											<div style=" display: inline-block; "></div> 
										</div> 
										</div>
									<div>
									<div class="row_region" style=" display: inline-block; width: 180px; box-sizing: border-box; vertical-align: top; "> 
										<div id="fatherHy1"  class="row_region" style=" display: inline-block;"></div>
										</div> 
										<div class="row_region" id="getHyList1"  class="row_region" style=" display: inline-block; width: 820px; box-sizing: border-box; "> 
											<div style=" display: inline-block; "></div> 
										</div> 
										</div>
									<div>
									<div style=" display: inline-block; width: 180px; box-sizing: border-box; vertical-align: top; "> 
										<div id="fatherHy2"  class="row_region" style=" display: inline-block;"></div>
										</div> 
										<div id="getHyList2"  class="row_region" style=" display: inline-block; width: 820px; box-sizing: border-box; "> 
											<div style=" display: inline-block; "></div> 
										</div> 
										</div>
									<div>
									<div style=" display: inline-block; width: 180px; box-sizing: border-box; vertical-align: top; "> 
										<div id="fatherHy3"  class="row_region" style=" display: inline-block;"></div>
										</div> 
										<div id="getHyList3"  class="row_region" style=" display: inline-block; width: 820px; box-sizing: border-box; "> 
											<div style=" display: inline-block; "></div> 
										</div> 
										</div>
									<div>
									<div style=" display: inline-block; width: 180px; box-sizing: border-box; vertical-align: top; "> 
										<div id="fatherHy4"  class="row_region" style=" display: inline-block;"></div>
										</div> 
										<div id="getHyList4"  class="row_region" style=" display: inline-block; width: 820px; box-sizing: border-box; "> 
											<div style=" display: inline-block; "></div> 
										</div> 
										</div>
									<div>
									<div style=" display: inline-block; width: 180px; box-sizing: border-box; vertical-align: top; "> 
										<div id="fatherHy5"  class="row_region" style=" display: inline-block;"></div>
										</div> 
										<div id="getHyList5"  class="row_region" style=" display: inline-block; width: 820px; box-sizing: border-box; "> 
											<div style=" display: inline-block; "></div> 
										</div> 
										</div>
									<div>
									<div style=" display: inline-block; width: 180px; box-sizing: border-box; vertical-align: top; "> 
										<div id="fatherHy6"  class="row_region" style=" display: inline-block;"></div>
										</div> 
										<div id="getHyList6"  class="row_region" style=" display: inline-block; width: 820px; box-sizing: border-box; "> 
											<div style=" display: inline-block; "></div> 
										</div> 
										</div>
									<div>
									<div style=" display: inline-block; width: 180px; box-sizing: border-box; vertical-align: top; "> 
										<div id="fatherHy7"  class="row_region" style=" display: inline-block;"></div>
										</div> 
										<div id="getHyList7"  class="row_region" style=" display: inline-block; width: 820px; box-sizing: border-box; "> 
											<div style=" display: inline-block; "></div> 
										</div> 
										</div>
									<div>
									<div style=" display: inline-block; width: 180px; box-sizing: border-box; vertical-align: top; "> 
										<div id="fatherHy8"  class="row_region" style=" display: inline-block;"></div>
										</div> 
										<div id="getHyList8"  class="row_region" style=" display: inline-block; width: 820px; box-sizing: border-box; "> 
											<div style=" display: inline-block; "></div> 
										</div> 
										</div>
									<div>
									<div style=" display: inline-block; width: 180px; box-sizing: border-box; vertical-align: top; "> 
										<div id="fatherHy9"  class="row_region" style=" display: inline-block;"></div>
										</div> 
										<div id="getHyList9"  class="row_region" style=" display: inline-block; width: 820px; box-sizing: border-box; "> 
											<div style=" display: inline-block; "></div> 
										</div> 
										</div>
									<div>
									<div style=" display: inline-block; width: 180px; box-sizing: border-box; vertical-align: top; "> 
										<div id="fatherHy10"  class="row_region" style=" display: inline-block;"></div>
										</div> 
										<div id="getHyList10"  class="row_region" style=" display: inline-block; width: 820px; box-sizing: border-box; "> 
											<div style=" display: inline-block; "></div> 
										</div> 
										</div>
									<div>
									<div style=" display: inline-block; width: 180px; box-sizing: border-box; vertical-align: top; "> 
										<div id="fatherHy11"  class="row_region" style=" display: inline-block;"></div>
										</div> 
										<div id="getHyList11"  class="row_region" style=" display: inline-block; width: 820px; box-sizing: border-box; "> 
											<div style=" display: inline-block; "></div> 
										</div> 
										</div>
									<div>
									<div style=" display: inline-block; width: 180px; box-sizing: border-box; vertical-align: top; "> 
										<div id="fatherHy12"  class="row_region" style=" display: inline-block;"></div>
										</div> 
										<div id="getHyList12"  class="row_region" style=" display: inline-block; width: 820px; box-sizing: border-box; "> 
											<div style=" display: inline-block; "></div> 
										</div> 
										</div>
									<div>
									<div style=" display: inline-block; width: 180px; box-sizing: border-box; vertical-align: top; "> 
										<div id="fatherHy13"  class="row_region" style=" display: inline-block;"></div>
										</div> 
										<div id="getHyList13"  class="row_region" style=" display: inline-block; width: 820px; box-sizing: border-box; "> 
											<div style=" display: inline-block; "></div> 
										</div> 
										</div>
									<div>
									<div style=" display: inline-block; width: 180px; box-sizing: border-box; vertical-align: top; "> 
										<div id="fatherHy14"  class="row_region" style=" display: inline-block;"></div>
										</div> 
										<div id="getHyList14"  class="row_region" style=" display: inline-block; width: 820px; box-sizing: border-box; "> 
											<div style=" display: inline-block; "></div> 
										</div> 
										</div>
									<div>
									<div style=" display: inline-block; width: 180px; box-sizing: border-box; vertical-align: top; "> 
										<div id="fatherHy15"  class="row_region" style=" display: inline-block;"></div>
										</div> 
										<div id="getHyList15"  class="row_region" style=" display: inline-block; width: 820px; box-sizing: border-box; "> 
											<div style=" display: inline-block; "></div> 
										</div> 
										</div>
									<div>
									<div style=" display: inline-block; width: 180px; box-sizing: border-box; vertical-align: top; "> 
										<div id="fatherHy16"  class="row_region" style=" display: inline-block;"></div>
										</div> 
										<div id="getHyList16"  class="row_region" style=" display: inline-block; width: 820px; box-sizing: border-box; "> 
											<div style=" display: inline-block; "></div> 
										</div> 
										</div>
									<div>
									<div style=" display: inline-block; width: 180px; box-sizing: border-box; vertical-align: top; "> 
										<div id="fatherHy17"  class="row_region" style=" display: inline-block;"></div>
										</div> 
										<div id="getHyList17"  class="row_region" style=" display: inline-block; width: 820px; box-sizing: border-box; "> 
											<div style=" display: inline-block; "></div> 
										</div> 
										</div>
									<div>
									<div style=" display: inline-block; width: 180px; box-sizing: border-box; vertical-align: top; "> 
										<div id="fatherHy18"  class="row_region" style=" display: inline-block;"></div>
										</div> 
										<div id="getHyList18"  class="row_region" style=" display: inline-block; width: 820px; box-sizing: border-box; "> 
											<div style=" display: inline-block; "></div> 
										</div> 
										</div>
									<div>
									<div style=" display: inline-block; width: 180px; box-sizing: border-box; vertical-align: top; "> 
										<div id="fatherHy19"  class="row_region" style=" display: inline-block;"></div>
										</div> 
										<div id="getHyList19"  class="row_region" style=" display: inline-block; width: 820px; box-sizing: border-box; "> 
											<div style=" display: inline-block; "></div> 
										</div> 
										</div>
									<div>
									<div style=" display: inline-block; width: 180px; box-sizing: border-box; vertical-align: top; "> 
										<div id="fatherHy20"  class="row_region" style=" display: inline-block;"></div>
										</div> 
										<div id="getHyList20"  class="row_region" style=" display: inline-block; width: 820px; box-sizing: border-box; "> 
											<div style=" display: inline-block; "></div> 
										</div> 
										</div>
									<div>
								</div>
        	</div>
        	<div id="buttons" style="text-align:right;margin-right:20px;margin-top:10px;">
        		<a href="#" class="easyui-linkbutton c100 shadow" onclick="bt_add_commit();">确定</a>
        		<a href="#" class="easyui-linkbutton c100 shadow" onclick="bt_add_cancel();">取消</a>
       		</div>
        	<!-- <a href="#" class="easyui-linkbutton" plain="true" style="width: 80px;" onclick="up_add();" data-options="iconCls:'icon-add'">新增</a> -->
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
<script type="text/javascript" src="industryManage.js"></script>
</body>
</html>
