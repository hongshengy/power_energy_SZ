<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib uri="/fpus-tags" prefix="fpus"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<html>
	<head>
	    <base href="<%=basePath%>">
		<title>终端基本信息</title>
		<jsp:include page="/pages/areaEnergy/common/head.jsp">
   			<jsp:param name="flag" value="flag='13'" />
   		</jsp:include>
	</head>
    <body scroll='no'>
		<div id='queryDiv' class="container-shadow" style="width:100%;">
            <div class="easyui-panel" title="终端基本信息" style="width:100%;padding:5px 10px;">
            <form id="thisform" name="thisform" target="" method="post">
            	<input type="hidden" id="roleCode" name="queryPara.roleCode" value="${resultMap.roleCode}"/>
            	<input type="hidden" id="roleId" name="queryPara.roleId" value="${resultMap.roleId}"/>
            	<input type="hidden" id="tmnlId" name="queryPara.tmnlId" value="${resultMap.TERMINAL_ID}"/>
            	<input type="hidden" id="areaCode" name="queryPara.areaCode" value="${resultMap.AREACODE}"/>
            	<input type="hidden" id="commAddress" name="queryPara.commAddress" value="${resultMap.COMM_ADDRESS}"/>
               <table style="width:100%;">
					<tbody>
						<tr>
							<td style="padding:5px;" width="100%">
								<fieldset
									style="padding: 5px 5px 5px 5px; background-color: #fff;">
									<legend>
										<font style="font-size: 12px; font-weight: bold;">资产信息</font>
									</legend>
									<table width="100%" cellspacing="8px" cellpadding="0"
										border="0">
										<tr>
											<td class="td-label" align="right" nowrap="nowrap">
												终端资产号
											</td>
											<td width="25%">
												<input type="text" size="27" id="tmnlAssetNo" name="queryPara.tmnlAssetNo" 
													value="${resultMap.TMNL_ASSET_NO}" disabled="disabled" class="easyui-textbox"
													 data-options="required:true,missingMessage:'请输入终端资产号',validType:'numOnlyInput[12]'">
													 <font color="red">&nbsp;&nbsp;*</font>
											</td>
											<td class="td-label" align="right" nowrap="nowrap">
												运行状态
											</td>
											<td width="25%">
					                            <input id="runStatus" size="27" name="queryPara.runStatus" disabled="disabled" value="${resultMap.STATUS_CODE}">
											</td>
											<td class="td-label" align="right"  nowrap="nowrap">
                                              	 终端厂商
                                            </td>
                                            <td width="25%">
                                                <input id="tmnlFactory" size="27" name="queryPara.tmnlFactory" disabled="disabled" value="${resultMap.FACTORY_CODE}">
                                                 <c:if test="${resultMap.roleCode == 'qyny'}">
                                                 	<a onclick="return false;" style="cursor:pointer" id='link'><img src="<%=basePath%>images/query.gif"></a>
                                                 </c:if>
                                            </td>
										</tr>
										<tr>
											<td class="td-label" align="right"  nowrap="nowrap">
                                                 	终端型号
                                            </td>
                                            <td width="25%">
                                                  <input size="27" id="tmnlKind" name="queryPara.tmnlKind" disabled="disabled" value="${resultMap.TERMINAL_KIND}">
                                            </td>
                                            <td class="td-label" align="right" nowrap="nowrap">
												终端类型
											</td>
											<td width="25%">
					                            <input size="27" id="tmnlTypeCode" disabled="disabled" value="${resultMap.TERMINAL_TYPE_CODE}">
												<input size="27" name="queryPara.tmnlTypeCode" style="display:none;" value="${resultMap.TERMINAL_TYPE_CODE}">
											</td>
											<td class="td-label" align="right"  nowrap="nowrap">
                                              	 终端安装位置
                                            </td>
                                            <td width="25%">
                                                <input type="text" size="27" id="terminalAddress" name="queryPara.terminalAddress" disabled="disabled" class="easyui-textbox" value="${resultMap.TERMINAL_ADDRESS}">
                                            </td>
										</tr>
										<tr>
											<td class="td-label" align="right"  nowrap="nowrap">
                                              	 站址
                                            </td>
                                            <td width="25%">
                                                <input type="text" size="27" id="STATION_ADDR" name="queryPara.STATION_ADDR" disabled="disabled" class="easyui-numberbox"
                                                data-options="validType:'length[0,5]'" value="${resultMap.STATION_ADDR}">
                                            </td>
                                            <c:if test="${resultMap.roleCode == 'fqls'}">
                                            	<td class="td-label" align="right"  nowrap="nowrap">
	                                              	行政区划码
	                                            </td>
	                                            <td width="25%">
	                                                <input type="text" size="27" id="area_code" name="queryPara.area_code" class="easyui-textbox"
	                                                disabled="disabled" value="${resultMap.AREACODE}"
	                                                data-options="validType:'length[0,4]'" >
	                                            </td>
	                                            <td class="td-label" align="right"  nowrap="nowrap">
	                                              	终端地址
	                                            </td>
	                                            <td width="25%">
	                                                <input type="text" size="27" id="COMM_ADDRESS" name="queryPara.COMM_ADDRESS" class="easyui-textbox"
	                                                disabled="disabled" value="${resultMap.COMM_ADDRESS}"
	                                                data-options="validType:'length[0,4]'" >
	                                            </td>		
                                            </c:if>
										</tr>
										<tr>
											<td class="td-label" align="right"  nowrap="nowrap">
                                                 	备注
                                            </td>
                                            <td colspan="5">
                                            	 <textarea style="display:none" id='tx'>${resultMap.REMARK }</textarea>
                                                  <input class="easyui-textbox" data-options = 'multiline:true' value="" name="queryPara.remark" disabled="disabled" id="remark" style= "width:470px;height:80px;">
                                            </td>
										</tr>
									</table>
								</fieldset>
								<fieldset style="padding: 5px 5px 5px 5px; background-color: #fff;">
									<legend>
										<font style="font-size: 12px; font-weight: bold;">通讯信息</font>
									</legend>
									<table width="100%" cellspacing="8px" cellpadding="0"
										border="0">
										<tr id="tr1">
											<td class="td-label" align="right" nowrap="nowrap">
												通信规约
											</td>
											<td width="25%">
												<input size="27" id="protocolType" name="queryPara.protocolType" disabled="disabled" value="${resultMap.PROTOCOL_TYPE}"
													 data-options="required:true,missingMessage:'请选择通信规约'">
												<font color="red">&nbsp;&nbsp;*</font>
											</td>
											<td class="td-label" align="right"  nowrap="nowrap">
                                              	通信信道
                                            </td>
                                            <td width="25%">
												 <input size="27" id="channelNo" name="queryPara.channelNo" disabled="disabled" value="${resultMap.CHANNEL_NO}"
												 	 data-options="required:true,missingMessage:'请选择通信信道'">
												 <font color="red">&nbsp;&nbsp;*</font>
											</td>
											<td class="td-label" align="right"  nowrap="nowrap">
                                              	 通信端口
                                            </td>
                                            <td width="25%">
                                                <input type="text" size="27" id="ctrlPort" name="queryPara.ctrlPort" disabled="disabled" class="easyui-textbox" value="${resultMap.CTRL_PORT}"
                                                	data-options="required:true,missingMessage:'请输入通信端口'">
                                                <font color="red">&nbsp;&nbsp;*</font>
                                            </td>
										</tr>
										<tr id="tr2">
											<td  class="td-label"  align="right"
												nowrap="nowrap">
												终端IP
											</td>
											<td  class="td-label"  width="25%">
												<input type="text" size="27" id="tmnlIp" name="queryPara.tmnlIp" disabled="disabled" class="easyui-textbox" value="${resultMap.CTRL_IP}"
													 data-options="required:true,missingMessage:'请输入终端IP',validType:'inputIp'" >
													 <font color="red">&nbsp;&nbsp;*</font>
											</td>
											<td class="td-label"  align="right" nowrap="nowrap">
												子网掩码
											</td>
											<td width="25%">
												<input type="text" size="27" id="subnetMask" name="queryPara.subnetMask" disabled="disabled" class="easyui-textbox" value="${resultMap.SUBNET_MASK}"
													 data-options="required:true,missingMessage:'请输入子网掩码',validType:'inputIp'" >
													 <font color="red">&nbsp;&nbsp;*</font>
											</td>
											<td  class="td-label" align="right" nowrap="nowrap">
												网关
											</td>
											<td  class="td-label"  width="25%">
												<input type="text" size="27" id="gateWay" name="queryPara.gateWay"  disabled="disabled" class="easyui-textbox" value="${resultMap.GATEWAY}"
													 data-options="required:true,missingMessage:'请输入网关',validType:'inputIp'" >
													 <font color="red">&nbsp;&nbsp;*</font>
											</td>
										</tr>
										<tr id="tr3">
											<td class="td-label" align="right" nowrap="nowrap">
												MAC地址
											</td>
											<td width="25%">
												<input size="18" class="easyui-textbox" id="macAddr" disabled="disabled" name="queryPara.macAddr" value="${resultMap.MAC_ADDR}">
											</td>
											<td class="td-label" align="right"  nowrap="nowrap">
                                              	采集标识
                                            </td>
                                            <td width="25%">
												 <input size="18" class="easyui-textbox" id="zigbeeId" disabled="disabled" name="queryPara.zigbeeId" value="${resultMap.ZIGBEE_ID}">
											</td>
											<td class="td-label" colspan="2" width="34%">
                                              	
                                            </td>
										</tr>
									</table>
								</fieldset>
							</td>
						</tr>
					</tbody>
				</table>
				</form>
               <div id="modifyBtn" style="padding: 5px; text-align: center;display: block;">
               		<table width="100%" cellspacing="2px" cellpadding="10px" border="0">
               			<tr>
               				<td>
                    			<button id="modifyRealBtn" class="easyui-linkbutton c1" onclick="modifyTmnlInfo(false);" style="width:70px;">修改</button>
                    		</td>
                    	</tr>
                    </table>
               </div>
               <div id="saveBtn" style="padding: 5px; text-align: center;display: none;">
               		<table width="100%" cellspacing="2px" cellpadding="10px" border="0">
               			<tr>
               				<td align="right">
                    			 <button class="easyui-linkbutton c1" onclick="saveTmnlInfo();" style="width:70px;">保存</button>
                    		</td>
               				<td align="left">
                    			 <button class="easyui-linkbutton c1" onclick="modifyTmnlInfo(true);" style="width:70px;">取消</button>
                    		</td>
                    	</tr>
                    </table>
                   
               </div>
               <div class="easyui-panel" title="采集测点信息" style="width:100%;">
               		<table width="100%" cellspacing="8px" cellpadding="0" border="0">
						<tr>
							<td class="td-label" align="right" nowrap="nowrap" style="width: 30px;">
								设备类型
							</td>
							<td width="15%" align="left">
	                            <select id="deviceType" name="queryPara.deviceType" class="easyui-combobox" style="width:120px;">
	                              	<option value="">请选择</option>
	                              	<option value="1">线路设备测点</option>
	                                <option value="2">母线设备测点</option>
	                                <option value="3">变压器设备测点</option>
	                                <option value="4">其他设备测点</option>
	                            </select>
							</td>
							<td class="td-label" align="right" nowrap="nowrap">
								测点类型
							</td>
							<td width="15%" align="left">
	                            <input type="text" size="18" id="mpType" name="queryPara.mpType" class="easyui-textbox">
							</td>
							<td class="td-label" align="right" nowrap="nowrap">
								是否电气设备
							</td>
							<td width="15%" align="left">
	                            <select id="isDevice" name="queryPara.isDevice" class="easyui-combobox" style="width:120px;">
	                              	<option value="">请选择</option>
	                                <option value="1">是</option>
	                                <option value="0">否</option>
	                            </select>
							</td>
							<td class="td-label" align="right" nowrap="nowrap">
								是否启用
							</td>
							<td width="15%" align="left">
	                            <select id="validFlag" name="queryPara.validFlag" class="easyui-combobox" style="width:120px;">
	                              	<option value="">请选择</option>
	                                <option value="1">是</option>
	                                <option value="0">否</option>
	                            </select>
							</td>
							<td width="10%" align="left">
	                            <button class="easyui-linkbutton c1" onclick="queryList1();" style="width:70px;margin-left: 8px;">查询</button>
							</td>
							<td width="10%" align="left">
	                            <button class="easyui-linkbutton c1" onclick="exportExcel();" style="width:70px;">导出</button>
							</td>
							<td width="10%" align="left">
	                            <button id="mpImport" class="easyui-linkbutton c1" onclick="batchImportMp();" style="width:110px;">测点批量导入</button>
							</td>
						</tr>
					</table>
					<div class="easyui-panel" style="width:100%;">
						<table id="collArchiveTable"></table>
					</div>
               </div>
            </div>
        </div>
	   
	</body>
	<script type="text/javascript">
		$(function() { 
			var roleCode = $("#roleCode").val();
			$('#tr3').hide();
			var isEdit = parent.$("#isEdit").val();
			if(isEdit == 'false'){
				$("#modifyRealBtn").linkbutton("disable");
				$("#mpImport").linkbutton("disable");
			}
			
			$('#tmnlTypeCode').combobox({
	             url :'<%=basePath%>areaEnergyTmnl/getCodeNameByCode.action?codeValue=70067',
	            editable:false,//不可编辑状态
		        valueField:'id',
		        textField:'text',
	        });
	        
			var tmnlTypeCode = $('#tmnlTypeCode').combobox('getValue');
			if(tmnlTypeCode == 3){
				$('#tr1').hide();
				$('#tr2').hide();
				$('#tr3').show();
			}else{
				$('#tr1').show();
				$('#tr2').show();
				$('#tr3').hide();
			}
			
			var tx = $('#tx').val();
			$('#remark').textbox('setValue',tx);
			//下拉框赋值
			//终端厂家
			$('#tmnlFactory').combobox({
	             url :'<%=basePath%>areaEnergyTmnl/getCodeNameByCode.action?codeValue=70018',
	            editable:false,//不可编辑状态
		        valueField:'id',
		        textField:'text'
	        });
			//终端厂家
			$('#runStatus').combobox({
	             url :'<%=basePath%>areaEnergyTmnl/getCodeNameByCode.action?codeValue=70033',
	            editable:false,//不可编辑状态
		        valueField:'id',
		        textField:'text'
	        });
			//终端型号
			$('#tmnlKind').combobox({
	             url :'<%=basePath%>areaEnergyTmnl/getCodeNameByCode.action?codeValue=70012',
	            editable:false,//不可编辑状态
		        valueField:'id',
		        textField:'text'
	        });
			//通信规约
			$('#protocolType').combobox({
	             url :'<%=basePath%>areaEnergyTmnl/getCodeNameByCodeBX.action?codeValue=70030',
	            editable:false,//不可编辑状态
		        valueField:'id',
		        textField:'text'
	        });
			//通信信道
			$('#channelNo').combobox({
	            url :'<%=basePath%>areaEnergyTmnl/getCodeNameByCodeBX.action?codeValue=70031',
	            editable:false,//不可编辑状态
		        valueField:'id',
		        textField:'text'
	        });
			//测点类型
			$('#mpType').combobox({
	            url :'<%=basePath%>areaEnergyTmnl/getCodeNameByCode.action?codeValue=70026',
	            editable:false,//不可编辑状态
		        valueField:'id',
		        textField:'text'
	        });
			 $('#tmnlAssetNo').textbox({
					onChange : function(){
						var tmnlAssetNo = $("#tmnlAssetNo").val();
						if(tmnlAssetNo != ""){
							var AREACODE =tmnlAssetNo.substr(tmnlAssetNo.length-7,3);
							var COMM_ADDRESS = tmnlAssetNo.substr(tmnlAssetNo.length-4);
							
							$("#areaCode").val(AREACODE);
							$("#commAddress").val(COMM_ADDRESS);
							$("#COMM_ADDRESS").textbox('setValue',COMM_ADDRESS);
							$("#area_code").textbox('setValue',AREACODE);
							$("#COMM_ADDRESS").textbox({disabled:true});
							$("#area_code").textbox({disabled:true});
						}
					}
				});
	        
			queryList();	
		});
		function batchImportMp(){
			 var url = "<%=basePath%>"+'pages/areaEnergy/baseData/tmnlInstall/batchImportMp.jsp?tmnlId='+'${resultMap.TERMINAL_ID}';
			 OpenWin(url,'批量导入测点','800','600');
		}
		function queryList1(){
			var deviceType = $("#deviceType").combobox("getValue");
			var mpType = $("#mpType").combobox("getValue");
			var validFlag = $("#validFlag").combobox("getValue");
			var isDevice = $("#isDevice").combobox("getValue");
			var tmnlId = '${resultMap.TERMINAL_ID}';
			var consId = '${resultMap.CONSID}';
			$('#collArchiveTable').datagrid("load",{
	          "queryPara.deviceType" : deviceType,
	          "queryPara.mpType" : mpType,
	          "queryPara.validFlag" : validFlag,
	          "queryPara.isDevice" : isDevice,
	          "queryPara.consId" : consId,
	          "queryPara.tmnlId" : tmnlId
   			 });
		}
		$.extend($.fn.validatebox.defaults.rules, {    
		    numOnlyInput: {    
		        validator: function(value,param){ 
		            return /^[a-zA-Z0-9]*$/i.test(value)&&value.length<=param[0];    
		        },    
		        message: '请输入不超过{0}位的字母或数字'   
		    }    
		});
		$.extend($.fn.validatebox.defaults.rules, {    
		    inputIp: {    
		        validator: function(value){ 
		            return /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/i.test(value);    
		            //return /^(1\\d{2}|2[0-4]\\d|25[0-5]|[1-9]\\d|[1-9])\\.(1\\d{2}|2[0-4]\\d|25[0-5]|[1-9]\\d|\\d)\\.(1\\d{2}|2[0-4]\\d|25[0-5]|[1-9]\\d|\\d)\\.()$/i.test(value);    
		        },    
		        message: '请输入正确格式的IP'   
		    }    
		});
		function queryList(){
			var deviceType = $("#deviceType").combobox("getValue");
			var mpType = $("#mpType").combobox("getValue");
			var validFlag = $("#validFlag").combobox("getValue");
			var isDevice = $("#isDevice").combobox("getValue");
			var tmnlId = '${resultMap.TERMINAL_ID}';
			var consId = '${resultMap.CONSID}';
			$('#collArchiveTable').datagrid({
				height : $(window).height()-$('#queryDiv').height(),
				border : false,
				singleSelect : false,
				lazyLoad : true,
				striped : true,
				//collapsible:true,  可折叠
				//fitColumns: true,
				url : des.webContextRoot+'areaEnergy/findTmnlMpInfo.action',
				sortOrder : 'desc',
				remoteSort : false,
				showFooter : true,
				pageSize : 50,
				queryParams : {"queryPara.deviceType" : deviceType,"queryPara.mpType" : mpType,"queryPara.validFlag" : validFlag,"queryPara.isDevice" : isDevice,"queryPara.tmnlId" : tmnlId,"queryPara.consId" : consId},
				columns : [[
				        {   
				            field:'MP_ID',
				            checkbox:true,
				            align:'center',
				            width:5,
				            rowspan:2,
				            formatter:function(value,row,index){
							     return row.MP_ID;
							}
				        }, {
							title : '设备类型',
							field : 'DEVICE_TYPE_NAME',
							align:'center',
							width : 150,
							rowspan:2,
							sortable : true,
							formatter:function(value,row,index){
							     return row.DEVICE_TYPE_NAME;
							}
						}, {
							title : '测点类型',
							field : 'MP_TYPE_NAME',
							align:'center',
							width : 150,
							rowspan:2,
							sortable : true,
							formatter:function(value,row,index){
							     return row.MP_TYPE_NAME;
							}
						}, {
							title : '测点编码',
							field : 'MP_CODE',
							align:'center',
							width : 150,
							rowspan:2,
							sortable : true,
							formatter:function(value,row,index){
							     return row.MP_CODE;
							}
						}, {
							title : '测点名称',
							field : 'MP_NAME',
							align:'center',
							width : 200,
							rowspan:2,
							sortable : true,
							formatter:function(value,row,index){
							     return row.MP_NAME;
							}
						}, {
							title : '采集地址码',
							field : 'COLL_ADDR',
							align:'center',
							width : 150,
							rowspan:2,
							sortable : true,
							formatter:function(value,row,index){
							     return row.COLL_ADDR;
							}
						}, {
							title : '系数',
							field : 'RATIO',
							align:'center',
							width : 150,
							rowspan:2,
							sortable : true,
							formatter:function(value,row,index){
							     return row.RATIO;
							}
						}, {
							title : '是否启用',
							field : 'VALID_FLAG_NAME',
							align:'center',
							width : 100,
							rowspan:2,
							sortable : true,
							formatter:function(value,row,index){
							     return row.VALID_FLAG_NAME;
							}
						}, {
							title : '所属对象',
							field : 'BELONGOBJ',
							align:'center',
							width : 150,
							rowspan:2,
							sortable : true,
							formatter:function(value,row,index){
							     return row.BELONGOBJ;
							}
						}, {
							title : '正常范围',
							align:'center',
							width : 180,
							colspan:2
						}, {
							title : '告警阀值',
							align:'center',
							width : 180,
							colspan:2
						}
						],
						[{
							title : '上限值',
							field : 'NORMAL_UP',
							align:'center',
							width : 90,
							sortable : true,
							formatter:function(value,row,index){
							     return row.NORMAL_UP;
							}
						},  {
							title : '下限值',
							field : 'NORMAL_DOWN',
							align:'center',
							width : 90,
							sortable : true,
							formatter:function(value,row,index){
							     return row.NORMAL_DOWN;
							}
						},  {
							title : '上限值',
							field : 'WARING_UP',
							align:'center',
							width : 90,
							sortable : true,
							formatter:function(value,row,index){
							     return row.WARING_UP;
							}
						}, {
							title : '下限值',
							field : 'WARING_DOWN',
							align:'center',
							width : 90,
							sortable : true,
							formatter:function(value,row,index){
							     return row.WARING_DOWN;
							}
						}
				]],
				pagination : true,
				rownumbers : true,
			});
		}
		function OpenWin(url, winName, width, height, properties) 
		{
			properties = properties || {};
			xposition=0; yposition=0;
		    
			if ((parseInt(navigator.appVersion) >= 4 ))
			{
				xposition = (screen.width - width) / 2;
				yposition = (screen.height - height) / 2;
			}
			if(typeof properties.resizable == 'undefined'){
				properties.resizable = 1;
			}
			if(typeof properties.scrollbars == 'undefined'){
				properties.scrollbars = 1;
			}
			theproperty = "width=" + width + "," 
				+ "height=" + height + "," 
				+ "location=0," 
				+ "menubar=0,"
				+ "resizable="+properties.resizable+","
				+ "scrollbars="+properties.scrollbars+","
				+ "status=1," 
				+ "titlebar=0,"
				+ "toolbar=0,"
				+ "hotkeys=0,"
				+ "screenx=" + xposition + "," //仅适用于Netscape
				+ "screeny=" + yposition + "," //仅适用于Netscape
				+ "left=" + xposition + "," //IE
				+ "top=" + yposition; //IE 
				try{
					monwin = window.open(url,winName,theproperty,false);
					monwin.focus();
				}catch(e){
				
				}
		}
		
		function createNewTmnlFactory(){
			var url = "<%=basePath %>pages/areaEnergy/baseData/tmnlInstall/createNewTmnlFactory.jsp";
			OpenWin(url,"新增终端厂商",600,200);
		}
		
		function refresh(){
			//终端厂家
			$('#tmnlFactory').combobox({
	             url :'<%=basePath%>areaEnergyTmnl/getCodeNameByCode.action?codeValue=70018',
	            editable:false,//不可编辑状态
		        valueField:'id',
		        textField:'text'
	        });
		}
		
		
		function modifyTmnlInfo(saveFlag){
		   $("#tmnlAssetNo").textbox({disabled:saveFlag});
		   $("#tmnlFactory").combobox({disabled:saveFlag});
		   $("#runStatus").combobox({disabled:saveFlag});
		   $("#tmnlKind").combobox({disabled:saveFlag});
		   //$("#tmnlTypeCode").combobox({disabled:saveFlag});
		   $("#tmnlIp").textbox({disabled:saveFlag});
		   $("#subnetMask").textbox({disabled:saveFlag});
		   $("#gateWay").textbox({disabled:saveFlag});
		   $("#macAddr").textbox({disabled:saveFlag});
		   $("#zigbeeId").textbox({disabled:saveFlag});
		   $("#protocolType").combobox({disabled:saveFlag});
		   $("#channelNo").combobox({disabled:saveFlag});
		   $("#ctrlPort").textbox({disabled:saveFlag});
		   $("#terminalAddress").textbox({disabled:saveFlag});
		   $("#remark").textbox({disabled:saveFlag});
		   $("#STATION_ADDR").textbox({disabled:saveFlag});
		   if(saveFlag == false){
			   $("#saveBtn").css("display","block");
			   $("#modifyBtn").css("display","none");
			   $("#link").unbind('click');
			   $("#link").bind('click',createNewTmnlFactory);
		   }else{
		   	   $("#saveBtn").css("display","none");
			   $("#modifyBtn").css("display","block");
			   $("#link").unbind('click',createNewTmnlFactory);
			   $("#link").bind('click');
		   }
		}
		function saveTmnlInfo() {
				$.messager.confirm('确认','确认想要修改终端信息吗？',function(r) {
					if (r) {
						$.messager.progress();
						$('#thisform').form('submit',{
						url :'<%=basePath%>areaEnergy/saveConsTmnlInfo.action',    
						onSubmit: function(){
							var tmnlTypeCode = '${resultMap.TERMINAL_TYPE_CODE}';
							if(tmnlTypeCode==3){
								var tmnlAssetNo = $("#tmnlAssetNo").val();
								if(/^[a-zA-Z0-9]*$/.test(tmnlAssetNo)&&tmnlAssetNo.length<=12){
									 return true;    
								}else{
									$.messager.confirm('确认','请输入不超过12位的字母或数字');
									 $.messager.progress('close');
									return false;
								}
							}else{
						        var isValid = $(this).form('validate');
						        if (!isValid){
						            $.messager.progress('close');
						        }
						        return isValid;
							}
					    },         
					    success:function(res){    
					    	 $.messager.progress('close');
					        if (res != "" && res != null) {
			                	if(res == "tmnlAssetNoRepeat"){
			                		$.messager.confirm('确认','输入的终端资产号已经被使用了，请重新输入');
			                	}else if(res == "createTmnlError"){
			                		$.messager.confirm('确认','数据库异常，终端修改失败！');
			                	}else if(res == "ok"){
			                		$.messager.confirm('确认','终端修改成功!',function(){
			                			//modifyTmnlInfo(true);
			                			parent.com.frontier.areaEnergy.baseData.reloadTree.flushAndClickCurrentNode();
			                		});
			                	}else{
			                		$.messager.confirm('确认','系统异常!');
			                	}
			                }else{
			                    	$.messager.confirm('确认','系统异常!');
		                    }
		    
					    }    
					}); 
			    }    
			}); 
		}
		function isValid(){
			var tmnlAssetNo = $("#tmnlAssetNo").val();
			if(!(tmnlAssetNo.length==10 && onlyNumInput(tmnlAssetNo))){
				$.messager.confirm('确认','终端资产号只能是10位数字!');
				return false;
			}
			return true;
		}
		function onlyNumInput(numObj){
			var reg = new RegExp("^[0-9]$");
			if(numObj != "" && numObj != null){
				for(var i=0;i<numObj.length;i++){
		            var aav = numObj.charAt(i);
		            if(!reg.test(aav)){
		                return false;
		            }
		        }
		        return true;
			}
		}
		function exportExcel(){
			$("#thisform").attr("target", ""),
		 	$("#thisform").attr("action","<%=basePath%>areaEnergy/getTmnlExcel.action");
			$("#thisform").submit();
		}
		function modifyMPInfo(){
			var rows = $('#collArchiveTable').datagrid('getSelections'); 
		    if(rows.length!=1){  
	            $.messager.alert('提示',"请选择一条要修改的数据",'info'); 
	            return; 
	        }
	        //var row = $('#collArchiveTable').datagrid('getSelected'); 
	        //alert(rows[0].MP_ID);
	        var url=des.webContextRoot+"areaEnergy/modifyMpInfo.action?queryPara.mpId="+rows[0].MP_ID;
		    OpenWin(url,"修改测点",420,300);
		}
	</script>    
</html>