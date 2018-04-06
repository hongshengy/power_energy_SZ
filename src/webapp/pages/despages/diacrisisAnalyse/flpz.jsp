<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ page import="com.frontier.pubmodule.AueicUtil"%>
<%-- <%@ page import="com.frontier.eems.service.impl.getPCodeImpl"%> --%>
<%
	String baseUrl  = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+baseUrl+"/";
	String pagePath = baseUrl + "/pages/despages";
	
	String consId = request.getParameter("consId");//获取调用父页面传过来的参数
	String consName = request.getParameter("consName");//获取调用父页面传过来的参数
	
%> 
<!DOCTYPE html>
<%@ taglib prefix="s" uri="/struts-tags"%>
<html>
	<head>
 	<meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <meta http-equiv="Pragma" content="no-cache" />
	<meta http-equiv="Cache-Control" content="no-cache" />
	<meta http-equiv="Expires" content="0" />
	<title>费率配置</title>
	<%-- <jsp:include page="/ext.jsp"/> --%>
	
	<link rel="stylesheet" type="text/css" href="<%=pagePath %>/common/jquery-easyui-1.5.1/themes/fangtian/easyui.css">
	<link rel="stylesheet" type="text/css" href="<%=pagePath %>/common/jquery-easyui-1.5.1/themes/icon.css">
	<link rel="stylesheet" type="text/css" href="<%=pagePath %>/common/jquery-easyui-1.5.1/themes/color.css">
	<link rel="stylesheet" type="text/css" href="<%=pagePath %>/common/css/common.css">
	<link rel="stylesheet" type="text/css" href="<%=pagePath %>/common/css/global-metro.css">
	<link rel="stylesheet" type="text/css" href="<%=pagePath %>/common/css/conflict.css">
	<script src="<%=pagePath %>/common/js/maskJs.js"></script>
	<script type="text/javascript">
		<%--  var vtradeCode = '<%=vtradeCode%>';
		 var vtradeName = '<%=vtradeName%>';
		 var eems = '<%=eems%>'; --%>
		 var eems = "0";
		 var webContextRoot="<%=basePath%>";
	</script>
	
	</head>
	<body onload="initLoad()">
		<style type="text/css">
			#tab-diqu td
			{
				padding-left: 10px;
			}
			#addfellvButton
			{
				width:100;
				padding:10px;
				
			}
			
			#addfellvButton > .l-btn-left > .l-btn-text
			{
				font-size: 14px;
			}
			
			.gridPanelPosition
			{
				position: absolute;
				left: 0;
				top: 0;
				bottom: 0;
				width: 250px;
				height: 300px;
			}
			
			.feilvImagePosition
			{
				position: absolute;
				left: 300px;
				top: 0;
				right: 0;
				bottom: 0;
				/*background:url('../images/zhongbiao.png');*/
			}
			
			.canvasPosition
			{
				
				width: 95%;
				height: 95%;
				background-color: #ededed;
			}
			
			.easyui-tabs-feilv .tt-inner
			{
				display:inline-block;
				line-height:16px;
				margin-top: 2px;
			}
			
			.easyui-tabs-feilv .img
			{
				border: 0;
			}
			
			.easyui-tabs-feilv .tabs
			{
				height: 80px !important;
			}
			
			.start-datebox
			{
				width: 190px;
			}
		</style>
<script>
    var maskobj = new maskPanelManager();
    maskobj.register();
</script>
		<%-- <%=shownRightStyle %> --%>
		<div class="easyui-layout" style="width: 100%;height: 100%;">
			<div id="mainPanel" class="easyui-panel" data-options="border:false,region:'center'," style="width:100%; height:100%; background:white; overflow:hidden;">
				<div class="easyui-panel" title="" style="width: 100%;" data-options="cls:'fangtian-panel-style',border:false,">
					 <div id="tab-dianliang" class="easyui-panel" title="费率列表" style="">
						 <div id="feilv-tabs" class="easyui-tabs easyui-tabs-feilv" data-options="border:false,tabWidth:100,tabHeight:80">
								<!--电-->
								<div title="<span class='tt-inner'><img src='<%=baseUrl %>/images/icon-larger48-light.png'/><br>电</span>">
									<div class="toolbar-style">
										<table cellpadding="3" class="table-style">
											<tr id="dltr1">
												<td>
													<a href="#" class="easyui-linkbutton c9 shadow" style="width:100;"
														 data-options="iconCls:'icon-add'" onclick="addFlxzPage('1')">添加费率</a>
												</td>
												<td>
													<a href="#" class="easyui-linkbutton c9 shadow" style="width:100;"
														 data-options="iconCls:'icon-edit'" onclick="updateFlxzPage('elecId','1')">修改费率</a>
												</td>
												<td>
													<a href="#" class="easyui-linkbutton c9 shadow" style="width:100;"
														 data-options="iconCls:'icon-remove'" onclick="deleteFlxzPage('elecId','1')">删除费率</a>
												</td>
												<td>
													<a href="#" class="easyui-linkbutton c9 shadow" style="width:100;"
														data-options="iconCls:'icon-reload'" onclick="updatePhasePage('1','elecId')">变更时段</a>
												</td>
											</tr>
											<tr id="dltr2" style="display:'none'">
												<td>
													<a href="#" class="easyui-linkbutton c9 shadow" style="width:100;"
														 data-options="disabled:'disabled',iconCls:'icon-add'" onclick="addFlxzPage('1')">添加费率</a>
												</td>
												<td>
													<a href="#" class="easyui-linkbutton c9 shadow" style="width:100;"
														 data-options="disabled:'disabled',iconCls:'icon-edit'" onclick="updateFlxzPage('elecId','1')">修改费率</a>
												</td>
												<td>
													<a href="#" class="easyui-linkbutton c9 shadow" style="width:100;"
														 data-options="disabled:'disabled',iconCls:'icon-remove'" onclick="deleteFlxzPage('elecId','1')">删除费率</a>
												</td>
												<td>
													<a href="#" class="easyui-linkbutton c9 shadow" style="width:100;"
														data-options="disabled:'disabled',iconCls:'icon-reload'" onclick="updatePhasePage('1','elecId')">变更时段</a>
												</td>
											</tr>
										</table>
									</div>
									<div id="pelecId" class="relative-panel" style="border: 0px;">
										<div id="elecId" style="height:100%;width:100%;border: 0px;"></div>
									</div>
								</div>
								<!--水-->
								<div id="div1" title="
									<span class='tt-inner'>
										<img  src='<%=baseUrl %>/images/icon-larger48-water.png'/><br>水
									</span>" 
										>
									<div class="toolbar-style">
										<table cellpadding="3" class="table-style">
											<tr id="str1">
												<td>
													<a href="#" class="easyui-linkbutton c9 shadow" style="width:100;"
														 data-options="iconCls:'icon-add'" onclick="addFlxzPage('2')">添加费率</a>
												</td>
												<td>
													<a href="#" class="easyui-linkbutton c9 shadow" style="width:100;"
														 data-options="iconCls:'icon-edit'" onclick="updateFlxzPage('worterId','2')">修改费率</a>
												</td>
												<td>
													<a href="#" class="easyui-linkbutton c9 shadow" style="width:100;"
														 data-options="iconCls:'icon-remove'" onclick="deleteFlxzPage('worterId','2')">删除费率</a>
												</td>
												<td>
													<a href="#" class="easyui-linkbutton c9 shadow" style="width:100;"
														data-options="iconCls:'icon-reload'" onclick="updatePhasePage('2','worterId')">变更时段</a>
												</td>
											</tr>
										    <tr id="str2" style="display:'none'">
												<td>
													<a href="#" class="easyui-linkbutton c9 shadow" style="width:100;"
														 data-options="disabled:'disabled',iconCls:'icon-add'" onclick="addFlxzPage('2')">添加费率</a>
												</td>
												<td>
													<a href="#" class="easyui-linkbutton c9 shadow" style="width:100;"
														 data-options="disabled:'disabled',iconCls:'icon-edit'" onclick="updateFlxzPage('worterId','2')">修改费率</a>
												</td>
												<td>
													<a href="#" class="easyui-linkbutton c9 shadow" style="width:100;"
														 data-options="disabled:'disabled',iconCls:'icon-remove'" onclick="deleteFlxzPage('worterId','2')">删除费率</a>
												</td>
												<td>
													<a href="#" class="easyui-linkbutton c9 shadow" style="width:100;"
														data-options="disabled:'disabled',iconCls:'icon-reload'" onclick="updatePhasePage('2','worterId')">变更时段</a>
												</td>
											</tr>
										</table>
									</div>
									<div id="pworterId" class="relative-panel" style="border: 0px;">
										<div id="worterId" style="height:100%;width:100%;border: 0px;"></div>
									</div>
								</div>
								<!--天然气-->
								<div title="<span class='tt-inner'><img src='<%=baseUrl %>/images/icon-larger48-tianranqi.png'/><br>气</span>">
									<div class="toolbar-style">
										<table cellpadding="3" class="table-style">
											<tr id="trqtr1">
												<td>
													<a href="#" class="easyui-linkbutton c9 shadow" style="width:100;"
														 data-options="iconCls:'icon-add'" onclick="addFlxzPage('3')">添加费率</a>
												</td>
												<td>
													<a href="#" class="easyui-linkbutton c9 shadow" style="width:100;"
														 data-options="iconCls:'icon-edit'" onclick="updateFlxzPage('natgasId','3')">修改费率</a>
												</td>
												<td>
													<a href="#" class="easyui-linkbutton c9 shadow" style="width:100;"
														 data-options="iconCls:'icon-remove'" onclick="deleteFlxzPage('natgasId','3')">删除费率</a>
												</td>
												<td>
													<a href="#" class="easyui-linkbutton c9 shadow" style="width:100;"
														data-options="iconCls:'icon-reload'" onclick="updatePhasePage('3','natgasId')">变更时段</a>
												</td>
											</tr>
											<tr id="trqtr2" style="display:'none'">
												<td>
													<a href="#" class="easyui-linkbutton c9 shadow" style="width:100;"
														 data-options="disabled:'disabled',iconCls:'icon-add'" onclick="addFlxzPage('3')">添加费率</a>
												</td>
												<td>
													<a href="#" class="easyui-linkbutton c9 shadow" style="width:100;"
														 data-options="disabled:'disabled',iconCls:'icon-edit'" onclick="updateFlxzPage('natgasId','3')">修改费率</a>
												</td>
												<td>
													<a href="#" class="easyui-linkbutton c9 shadow" style="width:100;"
														 data-options="disabled:'disabled',iconCls:'icon-remove'" onclick="deleteFlxzPage('natgasId','3')">删除费率</a>
												</td>
												<td>
													<a href="#" class="easyui-linkbutton c9 shadow" style="width:100;"
														data-options="disabled:'disabled',iconCls:'icon-reload'" onclick="updatePhasePage('3','natgasId')">变更时段</a>
												</td>
											</tr>
										</table>
									</div>
									<div id="pnatgasId" class="relative-panel" style="border: 0px;">
										<div id="natgasId" style="height:100%;width:100%;border: 0px;"></div>
									</div>
								</div>
								<!--水蒸气-->
								<div title="<span class='tt-inner'><img src='<%=baseUrl %>/images/icon-larger48-shuizhenqi.png'/><br>热</span>">
									<div class="toolbar-style">
										<table cellpadding="3" class="table-style">
											<tr id="szqtr1">
												<td>
													<a href="#" class="easyui-linkbutton c9 shadow" style="width:100;"
														 data-options="iconCls:'icon-add'" onclick="addFlxzPage('4')">添加费率</a>
												</td>
												<td>
													<a href="#" class="easyui-linkbutton c9 shadow" style="width:100;"
														 data-options="iconCls:'icon-edit'" onclick="updateFlxzPage('reekId','4')">修改费率</a>
												</td>
												<td>
													<a href="#" class="easyui-linkbutton c9 shadow" style="width:100;"
														 data-options="iconCls:'icon-remove'" onclick="deleteFlxzPage('reekId','4')">删除费率</a>
												</td>
												<td>
													<a href="#" class="easyui-linkbutton c9 shadow" style="width:100;"
														data-options="iconCls:'icon-reload'" onclick="updatePhasePage('4','reekId')">变更时段</a>
												</td>
											</tr>
											<tr id="szqtr2" style="display:'none'">
												<td>
													<a href="#" class="easyui-linkbutton c9 shadow" style="width:100;"
														 data-options="disabled:'disabled',iconCls:'icon-add'" onclick="addFlxzPage('4')">添加费率</a>
												</td>
												<td>
													<a href="#" class="easyui-linkbutton c9 shadow" style="width:100;"
														 data-options="disabled:'disabled',iconCls:'icon-edit'" onclick="updateFlxzPage('reekId','4')">修改费率</a>
												</td>
												<td>
													<a href="#" class="easyui-linkbutton c9 shadow" style="width:100;"
														 data-options="disabled:'disabled',iconCls:'icon-remove'" onclick="deleteFlxzPage('reekId','4')">删除费率</a>
												</td>
												<td>
													<a href="#" class="easyui-linkbutton c9 shadow" style="width:100;"
														data-options="disabled:'disabled',iconCls:'icon-reload'" onclick="updatePhasePage('4','reekId')">变更时段</a>
												</td>
											</tr>
										</table>
									</div>
									<div id="preekId" class="relative-panel" style="border: 0px;">
										<div id="reekId" style="height:100%;width:100%;border: 0px;"></div>
									</div>
								</div>
						 </div>
			      	  </div>

					<div id="tab-qiyexinxi" class="easyui-panel" title="标煤系数" style="">
					    <div class="toolbar-style">
					    <table cellpadding="3" class="table-style">
							<tr>
								<td>
									<a href="#" class="easyui-linkbutton c9 shadow" 
									   data-options="iconCls:'icon-add'" onclick="saveBiaoMei();">保存</a>
								</td>
							</tr>
						</table>
					    </div>
					    <s:form id="bmxsForm">
							<table cellpadding="8" class="table-style table-bordered" style="width:100%;">
								<tr align="center">
									<td  class="table-title-td" style="width:12.5%">水</td>
									<td class="table-value-td" style="width:12.5%">
									    <input class="easyui-textbox" id="bmxss" type="text" data-options="required:true,border:false,validType:['floatNumber','length[1,10]']" style="width: 100%;"/></td>
									<td class="table-title-td" style="width:12.5%">电</td>
									<td class="table-value-td" style="width:12.5%">
									    <input class="easyui-textbox" id="bmxsd" type="text" data-options="required:true,border:false,validType:['floatNumber','length[1,10]']" style="width: 100%;"/></td>
									<td class="table-title-td" style="width:12.5%">气</td>
									<td class="table-value-td" style="width:12.5%">
									    <input class="easyui-textbox" id="bmxsq" type="text" data-options="required:true,border:false,validType:['floatNumber','length[1,10]']" style="width: 100%;"/></td>
									<td class="table-title-td" style="width:12.5%">热</td>
									<td class="table-value-td" style="width:12.5%">
									    <input class="easyui-textbox" id="bmxsr" type="text" data-options="required:true,border:false,validType:['floatNumber','length[1,10]']" style="width: 100%;"/></td>
								</tr>
							</table>
						</s:form>
					</div>
				</div>
			</div>
			<!--弹出框 添加费率 style="padding:10px 50px;height:500px;width: 950px"-->
			<div id="dlg-feilv" class="easyui-dialog easyui-dialog-white" title="添加费率" closed="true" style="padding:10px 10px;"
				data-options="
					iconCls: 'icon-save',
					modal: true,
					buttons: [{
						text:'确定',
						width:60,
						iconCls:'icon-ok',
						handler:function(){
							if($('#tableForm').form('validate')){
								submitPhase();
							}
						}
					},{
						text:'  取消  ',
						width:60,
						iconCls:'icon-clear',
						handler:function(){
							$('#dlg-feilv').dialog('close')
						}
					}]
				">
				<s:form id="tableForm" method="post" >
					<table cellpadding="10" class="table-style table-bordered">
						<tr>
							<td class="table-title-td" style="width:130px"><b>费率名称:</b></td>
							<td class="table-value-td" style="width:200px">
								<input id="tagNameId" name="priceTagName" class="easyui-textbox" type="text" 
								data-options="required:true,validType:['isBlank','length[0,32]']" style="width:100%" />
							</td>
							<td class="table-title-td" style="width:130px">能源类型:</td>
							<td class="table-value-td" style="width:200px">
								<select id="energyType" class="easyui-combobox" style="width:100%;" data-options="disabled:true,required:true,panelHeight:'auto',editable:false">
								</select>
							</td>
						</tr>
						<tr>
							<td class="table-title-td"><b>费率执行开始时间:</b></td>
							<td class="table-value-td" >
								<input id="startTimeId" name="priceStartTime" class="easyui-datebox start-datebox" type="text" data-options="required:true,editable:false" data-options="formatter:formatter_yyyymmdd" style="width: 100%"></input>
							</td>
							<td class="table-title-td">费率执行结束时间:</td>
							<td class="table-value-td">
								<input id="endTimeId" name="priceEndTime" class="easyui-datebox start-datebox" type="text" data-options="required:false,editable:false" data-options="formatter:formatter_yyyymmdd" style="width: 100%"></input>
							</td>
						</tr>
						<tr>
							<!-- <td class="table-title-td" style="width:130px">需量电价:</td>
							<td class="table-value-td" style="width:200px">
								<input id="demandPriceId"  precision="4" max="1000" min="0"  name="demandPrice" class="easyui-numberbox" type="text"  style="width:100%" />
							</td> -->
							<td class="table-title-td" style="width:130px">客户:</td>
							<td class="table-value-td" style="width:200px">
								<input  id="userTree" class="easyui-combobox" 
								data-options="disabled:false,required:true,panelHeight:'200px',editable:true" style="width:100%"/>
							</td>
							<td rowspan="2" class="table-title-td" style="width:130px">备注:</td>
							<td class="table-textarea-panel table-value-td" rowspan="3" style="width:200px">
								<textarea class="textarea easyui-validatebox" data-options="validType:['isBlank','length[0,64]']"  id="remarkId" name="remark" style="width:99%;height:65px"></textarea>
							</td>
						</tr>
						<tr>
							<!-- <td class="table-title-td" style="width:130px">容量电价:</td>
							<td class="table-value-td" style="width:200px">
								<input id="capacityPriceId" precision="4"  max="1000" min="0"  name="capacityPrice" class="easyui-numberbox" type="text"  style="width:100%" />
							</td> -->
						</tr>
					</table>	
					<table id="tableId" cellpadding="8" class="table-style table-bordered" style="margin-top:10px;">
						<thead>
							<tr>
								<td class="table-title-td" style="width:260px">费率时段名</td>
								<td class="table-title-td" style="width:80px">费率类型</td>
								<td class="table-title-td" style="width:146px">费率时段</td>
								<td class="table-title-td" style="width:80px">价格</td>
								<td class="table-title-td" style="width:80px">操作</td>
								<td class="table-title-td" style="display:none">
									 <input type="hidden" value='d'/>
								</td>
							</tr>
						</thead>
						<tbody id="tb" ></tbody>
					</table> 
				</s:form>
				<s:form id="pFormId">
					<table cellpadding="8" class="table-style table-bordered" style="margin-top:1px;width:702px;">
						<tr style="height:40px;">
							<td class="td-region-addflsd" style="text-align:right;background-color:#efefef;">
								<span><b>费率时段名:</b></span>
								<input id="pNameId" data-options="required:true,validType:['isBlank','length[0,20]']" class="easyui-textbox" type="text" value='全天' style="width:100px;" />
								<span><b>费率类型:</b></span>
									<select id="phaseType" class="easyui-combobox" style="width:60px;" data-options="required:true,panelHeight:'200px',editable:false">
								    </select>
								<span><b>费率时段:</b></span>
									<select id="beginDate" class="easyui-combobox" style="width:50px;" data-options="required:true,panelHeight:'200px',panelWidth:'50px',editable:false">
								    </select>
								<span>-</span>
									<select id="endDate" class="easyui-combobox" style="width:50px;" data-options="required:true,panelHeight:'200px',panelWidth:'50px',editable:false">
								    </select>
								<span><b>费率价格:</b></span>
								<input id="priceId" precision="4"  max="1000" min="0" data-options="required:true" class="easyui-numberbox" type="text"  style="width:60px;"/>
								<a href="#" class="easyui-linkbutton c8" style="padding:0 10px;" onclick="addPhase()">添加</a></td>
						</tr>
					</table> 
				</s:form>
			</div>
			<!--弹出框 添加费率 end-->
			
			<!--弹出框 修改费率 start-->
			<div id="updateFl" class="easyui-dialog easyui-dialog-white" title="修改费率" closed="true" style="padding:10px 10px;"
				data-options="
					iconCls: 'icon-save',
					modal: true,
					buttons: [{
						text:'确定',
						width:60,
						iconCls:'icon-ok',
						handler:function(){
							if($('#updateForm').form('validate')){
								updateSumbitPage();
							}
						}
					},{
						text:'  取消  ',
						width:60,
						iconCls:'icon-clear',
						handler:function(){
							$('#updateFl').dialog('close')
						}
					}]
				">
				<s:form id="updateForm" method="post" >
					 <input type="hidden" id="priceTagId" name="priceTagId">
					<table cellpadding="8" class="table-style table-bordered" style="margin-bottom:10px;">
						<tr>
							<td class="table-title-td" style="width:130px"><b>费率名称:</b></td>
							<td class="table-value-td" style="width:200px">
								<input id="utagNameId" name="priceTagName" class="easyui-textbox" type="text" data-options="required:true,validType:['isBlank','length[0,32]']" style="width:100%" />
							</td>
							<td class="table-title-td" style="width:130px">能源类型:</td>
							<td class="table-value-td" style="width:200px">
								<select id="uenergyType" class="easyui-combobox" style="width:100%;" data-options="disabled:true,required:true,panelHeight:'auto',editable:false">
								</select>
							</td>
						</tr>
						<tr>
							<td class="table-title-td">费率执行开始时间:</td>
							<td class="table-value-td" >
								<input id="ustartTimeId" name="priceStartTime" class="easyui-datebox start-datebox" type="text" data-options="disabled:true,required:true,editable:false" data-options="formatter:formatter_yyyymmdd" style="width: 100%"></input>
							</td>
							<td class="table-title-td">费率执行结束时间:</td>
							<td class="table-value-td">
								<input id="uendTimeId" class="easyui-datebox start-datebox" name="priceEndTime" type="text" data-options="disabled:true,required:false,editable:false" data-options="formatter:formatter_yyyymmdd" style="width: 100%"></input>
							</td>
						</tr>
						<tr>
							<!-- <td class="table-title-td" style="width:130px">需量电价:</td>
							<td class="table-value-td" style="width:200px">
								<input id="udemandPriceId" name="demandPrice" data-options="editable:false" class="easyui-numberbox" type="text"  style="width:100%" />
							</td> -->
							<td class="table-title-td" style="width:130px">客户:</td>
							<td class="table-value-td" style="width:200px">
								<input  id="uuserTree" class="easyui-combobox" 
								data-options="disabled:true,required:true,panelHeight:'200px',editable:false" style="width:100%"/>
							</td>
							<td rowspan="2" class="table-title-td" style="width:130px">备注:</td>
							<td class="table-textarea-panel table-value-td" rowspan="2" style="width:200px">
								<textarea class="textarea easyui-validatebox" data-options="validType:['isBlank','length[0,64]']" id="uremarkId" name="remark" style="width:99%;height:65px"></textarea>
							</td>
						</tr>
						<tr>
							<!-- <td class="table-title-td" style="width:130px">容量电价:</td>
							<td class="table-value-td" style="width:200px">
								<input id="ucapacityPriceId" name="capacityPrice" data-options="editable:false" class="easyui-numberbox" type="text"  style="width:100%" />
							</td> -->
						</tr>
					</table>	
						<table id="utableId" class="easyui-datagrid" style="margin-top:10px;"
							data-options="border:true,singleSelect:true,width:701">
							<thead>
								<tr>
									<th data-options="field:'phaseName',width:257,align:'center'" >费率时段名</th>
									<th data-options="field:'energyTypeName',width:130,align:'center'" >费率类型</th>
									<th data-options="field:'operationTime',width:166,align:'center'" >费率时段</th>
									<th data-options="field:'price',width:140,align:'center'" >价格</th>
								</tr>
							</thead>
						</table> 
				</s:form>
		</div>
			<!--弹出框 修改费率 end-->
			
			<!--弹出框 变更时段 start-->
			
			<!--弹出框 变更时段 end-->
			 
		</div>
		
	<script type="text/javascript">
			webContextRoot="<%=basePath%>";
			consId = "<%=consId%>";
			consName = "<%=consName%>";
	</script>
	<script type="text/javascript" src="<%=pagePath %>/common/jquery-easyui-1.5.1/jquery.min.js"></script>
	<script type="text/javascript" src="<%=pagePath %>/common/jquery-easyui-1.5.1/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="<%=pagePath %>/common/jquery-easyui-1.5.1/easyui-lang-zh_CN.js"></script>
	<script type="text/javascript" src="<%=baseUrl%>/pages/despages/diacrisisAnalyse/flpz.js"></script>
	<script type="text/javascript" src="<%=pagePath %>/common/js/dateUtil.js"></script>
	<script type="text/javascript" src="<%=pagePath %>/common/js/common.js"></script>
	<%-- <script type="text/javascript" src="<%=pagePath%>/js/validator.js"></script> --%>	 
	</body>
</html>