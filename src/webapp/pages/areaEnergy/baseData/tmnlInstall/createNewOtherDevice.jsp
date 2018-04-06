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
		<title>新增设备</title>
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
		
		<div id='queryDiv' class="container-shadow container-marginTop" style="width:100%;">
            <div class="easyui-panel" title="新增设备" style="width:100%;">
            <form id="thisform" name="thisform" target="" method="post">
            	<input type="hidden" id="modifyFlag" name="queryPara.modifyFlag" value="0"/>
            	<input type="hidden" name="queryPara.deviceType" value="${param.deviceType}"/>
            	<input type="hidden" name="queryPara.isDevice" value="${param.isDevice}"/>
            	<input type="hidden" name="queryPara.subsId" value="${param.subsId}"/>
            	<input type="hidden" id="terminalId" name="queryPara.terminalId"/>
               <table style="width:100%;">
					<tbody>
						<tr>
							<td style="padding:5px;" width="100%">
									<table width="100%" cellspacing="8px" cellpadding="0"
										border="0">
										<tr>
											<td class="td-label" align="right" nowrap="nowrap">
												设备编号
											</td>
											<td width="25%">
												<input type="text" size="18" id="deviceNo" name="queryPara.deviceNo" class="easyui-textbox"
													 data-options="validType:'numOnlyInput[12]'">
											</td>
											<td class="td-label" align="right" nowrap="nowrap">
												所属终端
											</td>
											<td >
			                                    <input class="easyui-textbox" size="18" readonly="readonly" name="queryPara.tmnlAssetNo" id="tmnlAssetNo" data-options="required:true,missingMessage:'请选择所属终端'">
			                                    <a onclick="queryTmnlMessageList();" style="cursor:pointer"><img src="<%=basePath%>images/query.gif">
			                                    <font color="red">&nbsp;&nbsp;*</font>
			                                </td>
											<td class="td-label" align="right"  nowrap="nowrap">
                                              	设备名称
                                            </td>
                                            <td width="25%">
												 <input type="text" size="18" id="deviceName" name="queryPara.deviceName" class="easyui-textbox" data-options="required:true,missingMessage:'请选择设备名称'">
												 <font color="red">&nbsp;&nbsp;*</font>
											</td>
											
										</tr>
										<tr>
                                            <td class="td-label" align="right" nowrap="nowrap">
												设备厂家
											</td>
											<td width="25%">
					                             <input size="18" id="factoryCode" name="queryPara.factoryCode">
											</td>
											<td class="td-label" align="right"  nowrap="nowrap">
                                                 	出厂日期
                                            </td>
                                            <td width="25%">
                                                  <input type="text" class="easyui-datebox" data-options="width:140" id="madeDate" name="queryPara.madeDate"/>
                                            </td>
                                            <td class="td-label" align="right" nowrap="nowrap">
												运行状态
											</td>
											<td width="25%">
					                            <input size="18" id="runStatus" name="queryPara.runStatus">
											</td>
										</tr>
										<tr>
											<td class="td-label" align="right" nowrap="nowrap">
												安装日期
											</td>
											<td width="25%">
					                            <input type="text" class="easyui-datebox" data-options="width:140" id="createDate" name="queryPara.createDate"/>
											</td>
											<td class="td-label" align="right" nowrap="nowrap">
												是否电气设备
											</td>
											<td>
												<select id="isDevice" class="easyui-combobox" style="width:140px;" >
					                              	<option value="1">是</option>
					                                <option value="0">否</option>
					                            </select>
											</td>
											<td class="td-label" align="right"  nowrap="nowrap">
                                              	 设备分类
                                            </td>
                                            <td width="25%">
					                            <input size="18" id="deviceType" name="queryPara.deviceType">
                                            </td>
										</tr>
										<tr>
											<td class="td-label" align="right" nowrap="nowrap">
												是否有效
											</td>
											<td>
												<select id="validFlag" name="queryPara.validFlag" class="easyui-combobox" style="width:140px;" >
					                              	<option value="1">有效</option>
					                                <option value="0">无效</option>
					                            </select>
											</td>
										</tr>
										<tr>
											<td class="td-label" align="right" nowrap="nowrap">
												备注
											</td>
											<td colspan="5">
					                           <input class="easyui-textbox" data-options = 'multiline:true' name="queryPara.remark" id="remark" style= "width:470px;height:80px;">
											</td>
										</tr>
									</table>
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
			getTmnl(); 
			//设备厂家
			$('#factoryCode').combobox({
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
			//设备型号
			$('#deviceType').combobox({
	             url :'<%=basePath%>areaEnergyTmnl/getCodeNameByCode.action?codeValue=70025',
	            editable:false,//不可编辑状态
		        valueField:'id',
		        textField:'text'
	        });
			//下拉框赋值
	        $("#isDevice").combobox({value:'${param.isDevice}'});
			$("#isDevice").combobox({disabled:true});
			var deviceType = '${param.deviceType}';
			$("#deviceType").combobox({value:deviceType});
			$("#deviceType").combobox({disabled:true});
			
		});
		$.extend($.fn.validatebox.defaults.rules, {    
		    numOnlyInput: {    
		        validator: function(value,param){ 
		            return /^[a-zA-Z0-9]*$/i.test(value)&&value.length<=param[0];    
		        },    
		        message: '请输入不超过{0}位的字母或数字'   
		    }    
		});
		function getTmnl(){
			$.ajax({
				url : des.webContextRoot +'line/getTmnl.action',
				type: "post",
				dataType:"json",
				data : {"subsId":${param.subsId}},
				timeout:60000, 
				error : function (XMLHttpRequest, textStatus, errorThrown) {
					//去除遮罩
					$.messager.confirm("提示","保存失败");
				},
				success : function(result) {
						if(result.flag=='1'){
							$('#tmnlAssetNo').textbox('setValue',result.tmnlAssetNo) ;
							$('#terminalId').attr('value',result.tmnlId) ;
						}
				  }
			});
		}
		//查询所属终端
		function queryTmnlMessageList(){
			var url = "<%=basePath%>pages/areaEnergy/bs/tmnlMessageList.jsp?subId="+'${param.subsId}';
			OpenWin(url,"终端配置列表",950,600);
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
		function saveTmnlInfo() {
				$.messager.confirm('确认','确认想要保存设备信息吗？',function(r) {
					if (r) {
						$.messager.progress();
						$('#thisform').form('submit',{
						url :'<%=basePath%>areaEnergy/createNewOtherDevice.action',   
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
			                	if(res == "deviceNoRepeat"){
			                		$.messager.confirm('确认','输入的设备编号已经被使用了，请重新输入');
			                	}else if(res == "deviceNameRepeat"){
			                		$.messager.confirm('确认','所属终端下已存在改设备名称，请重新输入！');
			                	}else if(res == "createOtherDeviceError"){
			                		$.messager.confirm('确认','数据库异常，设备新增失败！');
			                	}else if(res == "ok"){
			                		$.messager.confirm('确认','设备新增成功!',function(){
			                			window.close();
			                			//opener.$('#consTmnlTable').datagrid('reload');
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
			var deviceNo = $("#deviceNo").val();
			if(!(deviceNo.length<=16 && onlyNumInput(deviceNo))){
				$.messager.confirm('确认','设备编号只能是不超过16位数字!');
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