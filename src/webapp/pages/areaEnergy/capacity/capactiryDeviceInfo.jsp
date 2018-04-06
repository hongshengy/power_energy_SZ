<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
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
            <div class="easyui-panel" title="终端基本信息" style="width:100%;">
            <form id="thisform" name="thisform" target="" method="post">
            	<input type="hidden" id="tmnlId" name="queryPara.tmnlId" value="${resultMap.TERMINAL_ID}"/>
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
										<font style="font-size: 12px; font-weight: bold;">配置信息</font>
									</legend>
									<table width="100%" cellspacing="8px" cellpadding="0"
										border="0">
										<tr>
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
            </div>
        </div>
	   
	</body>
	<script type="text/javascript">
		$(function() { 
			var tx = $('#tx').val();
			$('#remark').textbox('setValue',tx);
			
			$('#tmnlTypeCode').combobox({
	             url :'<%=basePath%>areaEnergyTmnl/getCodeNameByCode.action?codeValue=70067',
	            editable:false,//不可编辑状态
		        valueField:'id',
		        textField:'text',
	        });
	        
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
	        $('#tmnlCode').combobox("setValue","${resultMap.TERMINAL_TYPE_CODE}");
	        
		});
		function modifyTmnlInfo(saveFlag){
		   $("#tmnlAssetNo").textbox({disabled:saveFlag});
		   $("#tmnlFactory").combobox({disabled:saveFlag});
		   $("#runStatus").combobox({disabled:saveFlag});
		   $("#tmnlKind").combobox({disabled:saveFlag});
		   $("#tmnlIp").textbox({disabled:saveFlag});
		   $("#subnetMask").textbox({disabled:saveFlag});
		   $("#gateWay").textbox({disabled:saveFlag});
		   $("#protocolType").combobox({disabled:saveFlag});
		   $("#channelNo").combobox({disabled:saveFlag});
		   $("#ctrlPort").textbox({disabled:saveFlag});
		   $("#terminalAddress").textbox({disabled:saveFlag});
		   $("#remark").textbox({disabled:saveFlag});
		   $("#macAddr").textbox({disabled:saveFlag});
		   $("#zigbeeId").textbox({disabled:saveFlag});
		   $("#STATION_ADDR").textbox({disabled:saveFlag});
		   if(saveFlag == false){
			   $("#saveBtn").css("display","block");
			   $("#modifyBtn").css("display","none");
		   }else{
		   	   $("#saveBtn").css("display","none");
			   $("#modifyBtn").css("display","block");
		   }
		}
		function saveTmnlInfo() {
				$.messager.confirm('确认','确认想要修改终端信息吗？',function(r) {
					if (r) {
						$.messager.progress();
						$('#thisform').form('submit',{
						url :'<%=basePath%>areaEnergy/saveConsTmnlInfo.action',    
						onSubmit: function(){
					        var isValid = $(this).form('validate');
					        if (!isValid){
					            $.messager.progress('close');
					        }
					        return isValid;
					    },   
					    success:function(res){    
					    	 $.messager.progress('close');
					        if (res != "" && res != null) {
			                	if(res == "tmnlAssetNoRepeat"){
			                		$.messager.confirm('确认','输入的终端资产号已经被使用了，请重新输入');
			                	}else if(res == "exist"){
			                		$.messager.confirm('确认','输入MAC地址和采集标识已经被使用了，请重新输入','info');
			                	}else if(res == "IPRepeat"){
			                		$.messager.confirm('确认','输入的终端IP已被占用，请重新输入！','info');
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
	</script>    
</html>