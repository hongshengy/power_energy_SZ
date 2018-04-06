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
		<title>摄像头信息</title>
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
            <div class="easyui-panel" title="摄像头信息" style="width:100%;">
            <form id="thisform" name="thisform" target="" method="post">
            	<input type="hidden" id="modifyFlag" name="queryPara.modifyFlag" value="1"/>
            	<input type="hidden" id="videoId" name="queryPara.videoId" value="${resultMap.VIDEO_ID}"/>
               <table style="width:100%;">
					<tbody>
						<tr>
							<td style="padding:5px;" width="100%">
									<table width="100%" cellspacing="8px" cellpadding="0"
										border="0">
										<tr>
											<td class="td-label" align="right"  nowrap="nowrap">
                                              	摄像机名称
                                            </td>
                                            <td >
												 <input type="text" size="18" id="videoName" name="queryPara.videoName" class="easyui-textbox" value="${resultMap.VIDEO_NAME}"
												 	 disabled="disabled" data-options="required:true,missingMessage:'请输入摄像机名称'"	>
												 <font color="red">&nbsp;&nbsp;*</font>
											</td>
											<td class="td-label" align="right"  nowrap="nowrap">
                                              	 通道序号
                                            </td>
                                            <td >
					                            <input  type="text" size="18" id="channel" name="queryPara.channel" class="easyui-textbox" value="${resultMap.CHANNEL}"
					                            	 disabled="disabled" data-options="required:true,missingMessage:'请输入通道序号'">
					                            <font color="red">&nbsp;&nbsp;*</font>
                                            </td>
                                            <td class="td-label" align="right" nowrap="nowrap">
												摄像机类型
											</td>
											<td >
					                             <input size="18" id="videoType" name="queryPara.videoType"
					                             	 disabled="disabled" data-options="required:true,missingMessage:'请选择摄像机类型'">
					                             <font color="red">&nbsp;&nbsp;*</font>
											</td>
											
										</tr>
										<tr>
											<td class="td-label" align="right" nowrap="nowrap">
												摄像机编号
											</td>
											<td >
												<input type="text" size="18" id="videoNo" name="queryPara.videoNo" class="easyui-textbox" value="${resultMap.VIDEO_NO}"
													 disabled="disabled" data-options="required:true,missingMessage:'请输入摄像机编号',validType:'numOnlyInput[12]'">
													 <font color="red">&nbsp;&nbsp;*</font>
											</td>
                                            <td class="td-label" align="right" nowrap="nowrap">
												安装位置
											</td>
											<td >
					                             <input type="text" size="18" id="installPlace" disabled="disabled" name="queryPara.installPlace" class="easyui-textbox" value="${resultMap.INSTALL_PLACE}"
					                             	data-options="required:true,missingMessage:'请输入安装位置'">
					                             <font color="red">&nbsp;&nbsp;*</font>
											</td>
											<td class="td-label" align="right" nowrap="nowrap">
												分辨率
											</td>
											<td>
												<input type="text" size="18" id="resolution" disabled="disabled" name="queryPara.resolution" class="easyui-textbox" value="${resultMap.RESOLUTION}"> 
											</td>
											
										</tr>
										<tr>
											<td class="td-label" align="right" nowrap="nowrap">
												坐标X
											</td>
											<td >
					                             <input type="text" size="18" disabled="disabled" id="locationX" name="queryPara.locationX" class="easyui-textbox" value="${resultMap.LOCATION_X}">
											</td>
											<td class="td-label" align="right" nowrap="nowrap">
												坐标Y
											</td>
											<td >
					                             <input type="text" size="18" disabled="disabled" id="locationY" name="queryPara.locationY" class="easyui-textbox" value="${resultMap.LOCATION_Y}">
											</td>
											<td class="td-label" align="right" nowrap="nowrap">
												坐标Z
											</td>
											<td >
					                             <input type="text" size="18" disabled="disabled" id="locationZ" name="queryPara.locationZ" class="easyui-textbox" value="${resultMap.LOCATION_Z}">
											</td>
										</tr>
										<tr>
											<td class="td-label" align="right" nowrap="nowrap">
												备注
											</td>
											<td colspan="3">
												<textarea style="display:none" id='tx'>${resultMap.REMARK }</textarea>
					                           <input class="easyui-textbox" disabled="disabled" data-options = 'multiline:true' name="queryPara.remark" id="remark" style= "width:490px;height:80px;" value="">
											</td>
										</tr>
									</table>
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
			var isEdit = parent.$("#isEdit").val();
			if(isEdit == 'false'){
				$("#modifyRealBtn").linkbutton("disable");
			}
			var tx = $('#tx').val();
			$('#remark').textbox('setValue',tx);
			//设备厂家
			$('#videoType').combobox({
	             url :'<%=basePath%>areaEnergyTmnl/getCodeNameByCodeBX.action?codeValue=70038',
	            editable:false,//不可编辑状态
		        valueField:'id',
		        textField:'text'
	        });
		});
		$("#videoType").combobox({value:'${resultMap.VIDEO_TYPE}'});
		$.extend($.fn.validatebox.defaults.rules, {    
		    numOnlyInput: {    
		        validator: function(value,param){ 
		            return /^[a-zA-Z0-9]*$/i.test(value)&&value.length<=param[0];    
		        },    
		        message: '请输入不超过{0}位的字母或数字'   
		    }    
		});
		function saveTmnlInfo() {
				$.messager.confirm('确认','确认想要保存摄像机信息吗？',function(r) {
					if (r) {
						$.messager.progress();
						$('#thisform').form('submit',{
						url :'<%=basePath%>areaEnergy/createNewVideo.action',   
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
			                	if(res == "videoNoRepeat"){
			                		$.messager.confirm('确认','输入的摄像头编号已经被使用了，请重新输入');
			                	}else if(res == "createVideoError"){
			                		$.messager.confirm('确认','数据库异常，设备新增失败！');
			                	}else if(res == "ok"){
			                		$.messager.confirm('确认','设备保存成功!',function(){
			                			window.close();
			                			//opener.$('#consTmnlTable').datagrid('reload');
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
		function modifyTmnlInfo(saveFlag){
		   $("#videoName").textbox({disabled:saveFlag});
		   $("#channel").textbox({disabled:saveFlag});
		   $("#videoType").combobox({disabled:saveFlag});
		   $("#videoNo").textbox({disabled:saveFlag});
		   $("#installPlace").textbox({disabled:saveFlag});
		   $("#resolution").textbox({disabled:saveFlag});
		   $("#locationX").textbox({disabled:saveFlag});
		   $("#locationY").textbox({disabled:saveFlag});
		   $("#locationZ").textbox({disabled:saveFlag});
		   $("#remark").textbox({disabled:saveFlag});
		   if(saveFlag == false){
			   $("#saveBtn").css("display","block");
			   $("#modifyBtn").css("display","none");
		   }else{
		   	   $("#saveBtn").css("display","none");
			   $("#modifyBtn").css("display","block");
		   }
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