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
		<title>新建终端</title>
		<jsp:include page="/pages/areaEnergy/common/head.jsp">
   			<jsp:param name="flag" value="flag='13'" />
   		</jsp:include>
	</head>
    <body srolling='no'>
        <!--  
        <form>
        </form>
		<div region="center" border="false">
			<table id="collArchiveTable"></table>
		</div>
		-->
		
		<div id='queryDiv' class="container-shadow" style="width:100%;">
            <div class="easyui-panel" title="终端基本信息" style="width:100%;padding:5px 10px;">
            <form id="thisform" name="thisform" target="" method="post">
            	<input type="hidden" id="consId" name="queryPara.consId" value="${param.consId}"/>
            	<input type="hidden" id="areaNo" name="queryPara.areaNo" value="${param.areaNo}"/>
            	<input type="hidden" id="roleCode" name="queryPara.roleCode" value="${param.roleCode}"/>
            	<input type="hidden" id="roleId" name="queryPara.roleId" value="${param.roleId}"/>
            	<input type="hidden" id="areaCode" name="queryPara.areaCode" value=""/>
            	<input type="hidden" id="commAddress" name="queryPara.commAddress" value=""/>
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
												<input type="text" size="18" id="tmnlAssetNo" name="queryPara.tmnlAssetNo" class="easyui-textbox"
												 data-options="required:true,missingMessage:'请输入终端资产号',validType:'numOnlyInput[12]'" >
												 <font color="red">&nbsp;&nbsp;*</font>
											</td>
											<td class="td-label" align="right" nowrap="nowrap">
												运行状态
											</td>
											<td width="25%">
					                            <input size="18" id="runStatus" name="queryPara.runStatus" class="easyui-combobox">
											</td>
											<td class="td-label" align="right"  nowrap="nowrap">
                                              	 终端厂商
                                            </td>
                                            <td width="25%" id="tmnlId1">
                                                <input size="18" id="tmnlFactory" name="queryPara.tmnlFactory" class="easyui-combobox">
                                                <c:if test="${param.roleCode == 'qyny'}">
                                                	<a onclick="createNewTmnlFactory();" style="cursor:pointer"><img src="<%=basePath%>images/query.gif">
                                                </c:if>
                                            </td>
										</tr>
										<tr>
											<td class="td-label" align="right"  nowrap="nowrap">
                                                                                                                                                终端型号
                                            </td>
                                            <td width="25%">
                                                  <input size="18" id="tmnlKind" name="queryPara.tmnlKind" class="easyui-combobox">
                                            </td>
                                            <td class="td-label" align="right" nowrap="nowrap">
												终端类型
											</td>
											<td width="25%">
					                            <input size="18" id="tmnlTypeCode" name="queryPara.tmnlTypeCode" 
					                            	validType="comboxValidate['请选择终端类型']" class="easyui-combobox">
					                            <font style="color: red;">*</font>
											</td>
											<td class="td-label" align="right"  nowrap="nowrap">
                                              	 终端安装位置
                                            </td>
                                            <td width="25%">
                                                <input type="text" size="27" id="terminalAddress" name="queryPara.terminalAddress" class="easyui-textbox">
                                            </td>
										</tr>
										<tr>
											<td class="td-label" align="right"  nowrap="nowrap">
                                              	 站址
                                            </td>
                                            <td width="25%">
                                                <input type="text" size="27" id="STATION_ADDR" name="queryPara.STATION_ADDR" class="easyui-numberbox"
                                                data-options="validType:'length[0,5]'" >
                                            </td>
                                            <c:if test="${param.roleCode == 'fqls'}">
                                            	<td class="td-label" align="right"  nowrap="nowrap">
	                                              	行政区划码
	                                            </td>
	                                            <td width="25%">
	                                                <input type="text" size="27" id="area_code" name="queryPara.area_code" class="easyui-textbox"
	                                                data-options="validType:'length[0,4]'" >
	                                            </td>
	                                            <td class="td-label" align="right"  nowrap="nowrap">
	                                              	终端地址
	                                            </td>
	                                            <td width="25%">
	                                                <input type="text" size="27" id="COMM_ADDRESS" name="queryPara.COMM_ADDRESS" class="easyui-textbox"
	                                                data-options="validType:'length[0,4]'" >
	                                            </td>
                                            </c:if>
										</tr>
										<tr>
											<td class="td-label" align="right"  nowrap="nowrap">
                                                 	备注
                                            </td>
                                            <td colspan="5">
                                                  <input class="easyui-textbox" data-options = 'multiline:true' name="queryPara.remark" id="remark" style= "width:470px;height:80px;">
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
												<input size="18" class="easyui-textbox" id="protocolType" name="queryPara.protocolType" data-options="required:true,missingMessage:'请选择通信规约'">
												<font color="red">&nbsp;&nbsp;*</font>
											</td>
											<td class="td-label" align="right"  nowrap="nowrap">
                                              	通信信道
                                            </td>
                                            <td width="25%">
												 <input size="18" class="easyui-textbox" id="channelNo" name="queryPara.channelNo" data-options="required:true,missingMessage:'请选择通信信道'">
												 <font color="red">&nbsp;&nbsp;*</font>
											</td>
											<td class="td-label" align="right"  nowrap="nowrap">
                                              	 通信端口
                                            </td>
                                            <td width="25%">
                                                <input type="text" size="18" id="ctrlPort" name="queryPara.ctrlPort" class="easyui-textbox" data-options="required:true,missingMessage:'请输入通信端口'">
                                                <font color="red">&nbsp;&nbsp;*</font>
                                            </td>
										</tr>
										<tr id="tr2">
											<td  class="td-label"  align="right"
												nowrap="nowrap">
												终端IP
											</td>
											<td  class="td-label"  width="25%">
												<input type="text" size="18" id="tmnlIp" name="queryPara.tmnlIp" class="easyui-textbox"
													 data-options="required:true,missingMessage:'请输入终端IP',validType:'inputIp'" >
													 <font color="red">&nbsp;&nbsp;*</font>
												
											</td>
											<td class="td-label"  align="right" nowrap="nowrap">
												子网掩码
											</td>
											<td width="25%">
												<input type="text" size="18" id="subnetMask" name="queryPara.subnetMask" class="easyui-textbox"
													 data-options="required:true,missingMessage:'请输入子网掩码',validType:'inputIp'" >
													 <font color="red">&nbsp;&nbsp;*</font>
											</td>
											<td  class="td-label" align="right" nowrap="nowrap">
												网关
											</td>
											<td  class="td-label"  width="25%">
												<input type="text" size="18" id="gateWay" name="queryPara.gateWay" class="easyui-textbox"
													 data-options="required:true,missingMessage:'请输入网关',validType:'inputIp'" >
													 <font color="red">&nbsp;&nbsp;*</font>
											</td>
										</tr>
										<tr id="tr3">
											<td class="td-label" align="right" nowrap="nowrap">
												MAC地址
											</td>
											<td width="25%">
												<input size="18" class="easyui-textbox" id="macAddr" name="queryPara.macAddr">
											</td>
											<td class="td-label" align="right"  nowrap="nowrap">
                                              	采集标识
                                            </td>
                                            <td width="25%">
												 <input size="18" class="easyui-textbox" id="zigbeeId" name="queryPara.zigbeeId">
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
               <div id="saveBtn" style="padding: 5px; text-align: center;">
               		<table width="100%" cellspacing="2px" cellpadding="10px" border="0">
               			<tr>
               				<td align="right">
                    			 <button class="easyui-linkbutton c1" onclick="saveTmnlInfo();" style="width:70px;">保存</button>
                    		</td>
               				<td align="left">
                    			 <button class="easyui-linkbutton c1" onclick="javascript:window.close();" style="width:70px;">取消</button>
                    		</td>
                    	</tr>
                    </table>
                   
               </div>
            </div>
        </div>
	    
	     
	</body>
	<script type="text/javascript">
		$(function() {
			var roleCode = $("#roleCode").val();
			$('#tr3').hide();
			//下拉框赋值
			//终端厂家
			$('#tmnlFactory').combobox({
	             url :'<%=basePath%>areaEnergyTmnl/getCodeNameByCode.action?codeValue=70018',
	            editable:false,//不可编辑状态
		        valueField:'id',
		        textField:'text'
	        });
			//运行状态
			$('#runStatus').combobox({
	             url :'<%=basePath%>areaEnergyTmnl/getCodeNameByCode.action?codeValue=70033',
	            editable:false,//不可编辑状态
		        valueField:'id',
		        textField:'text'
	        });
			$("#runStatus").combobox("setValue",1);
			//终端型号
			$('#tmnlKind').combobox({
	             url :'<%=basePath%>areaEnergyTmnl/getCodeNameByCode.action?codeValue=70012',
	            editable:false,//不可编辑状态
		        valueField:'id',
		        textField:'text'
	        });
	        //终端类型
			$('#tmnlTypeCode').combobox({
	             url :'<%=basePath%>areaEnergyTmnl/getCodeNameByCode.action?codeValue=70067&roleCode='+roleCode,
	            editable:false,//不可编辑状态
		        valueField:'id',
		        textField:'text',
		        onChange:function(){
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
				}
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
	        $('#protocolType').combobox({
				value:'01'
			});
			$('#channelNo').combobox({
				value:'01'
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
			
			
			
		});
		
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
		
		function refresh(){
			//终端厂家
			$('#tmnlFactory').combobox({
	             url :'<%=basePath%>areaEnergyTmnl/getCodeNameByCode.action?codeValue=70018',
	            editable:false,//不可编辑状态
		        valueField:'id',
		        textField:'text'
	        });
		}
		
		function saveTmnlInfo() {
				$.messager.confirm('确认','确认想要保存终端信息吗？',function(r) {
					if (r) {
						$.messager.progress();
						$('#thisform').form('submit',{
						url :'<%=basePath%>areaEnergy/createNewConsTmnl.action', 
						onSubmit: function(){
							var tmnlTypeCode = $('#tmnlTypeCode').combobox('getValue');
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
			                		$.messager.confirm('确认','输入的终端资产号已经被使用了，请重新输入','info');
			                	}else if(res == "exist"){
			                		$.messager.confirm('确认','输入MAC地址和采集标识已经被使用了，请重新输入','info');
			                	}else if(res == "createTmnlError"){
			                		$.messager.confirm('确认','数据库异常，终端新增失败！');
			                	}else if(res == "ok"){
			                		$.messager.confirm('确认','终端新增成功!',function(){
			                			window.close();
			                			opener.parent.com.frontier.areaEnergy.baseData.reloadTree.flushAndClickCurrentNode();
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
		
		function createNewTmnlFactory(){
			var url = "<%=basePath %>pages/areaEnergy/baseData/tmnlInstall/createNewTmnlFactory.jsp";
			OpenWin(url,"新增终端厂商",600,200);
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
		
		$.extend($.fn.validatebox.defaults.rules, {    
            comboxValidate: {    
                validator: function(value, param){ 
                    if(value == null || value == '' || value == '请选择'){
                       //false的时候，给出message提示
                       return false;
                    } else{
                       return true;    
                    }  
                },    
                message: '{0}'    
            } 
        });
	</script>    
</html>