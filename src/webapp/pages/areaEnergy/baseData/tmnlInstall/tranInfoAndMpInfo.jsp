<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    
    <title>主变信息</title>
    <meta charset="UTF-8">
    
		<link rel="stylesheet" type="text/css" href="<%=path%>/pages/areaEnergy/common/jquery-easyui-1.5.1/themes/fangtian/easyui.css">
		<link rel="stylesheet" type="text/css" href="<%=path%>/pages/areaEnergy/common/jquery-easyui-1.5.1/themes/icon.css">
		<link rel="stylesheet" type="text/css" href="<%=path%>/pages/areaEnergy/common/jquery-easyui-1.5.1/themes/color.css">
		<link rel="stylesheet" type="text/css" href="<%=path%>/pages/areaEnergy/common/css/common.css">
		<link rel="stylesheet" type="text/css" href="<%=path%>/pages/areaEnergy/common/css/lightbox.min.css" />
		<script type="text/javascript" src="<%=path%>/pages/areaEnergy/common/jquery-easyui-1.5.1/jquery.min.js"></script>
		<script type="text/javascript" src="<%=path%>/pages/areaEnergy/common/jquery-easyui-1.5.1/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="<%=path%>/pages/areaEnergy/common/jquery-easyui-1.5.1/easyui-lang-zh_CN.js"></script>
		<script type="text/javascript" src="<%=path%>/pages/areaEnergy/common/jquery-easyui-1.5.1/datagrid-detailview.js"></script>
		<script type="text/javascript" src="<%=basePath%>js/common_client.js"></script>
		<script type="text/javascript" src="<%=basePath%>/js/json2.js"></script>
		<script type="text/javascript">
		function saveData() {
			var isValid = $('#ff').form('validate');
            if (isValid){
		        $.messager.confirm('确认','您确认想要保存记录吗？',function(r) {
		                            if (r) {
		                                $.messager.progress();
		                                $('#ff').form('submit',{
		                                url :'<%=basePath%>areaEnergyTmnl/modifyTranInfo.action',    
		                                onSubmit: function(){
		                                    // do some check    
		                                    // return false to prevent submit; 
		                                    var isValid = $(this).form('validate');
		                                    if (!isValid){
		                                        $.messager.progress('close');   // 如果表单是无效的则隐藏进度条
		                                    }
		                                    return isValid; // 返回false终止表单提交
		                                },    
		                                success:function(res){    
		                                    $.messager.progress('close');    // 如果提交成功则隐藏进度条
		                                    if (res != "" && res != null) {
		                                        if(res == "had"){
		                                            $.messager.alert('警告','此变压器编号已存在');
		                                        }else if (res == "wrong"){
		                                            $.messager.alert('警告','保存失败');
		                                        }else{
		                                            $.messager.alert('警告','保存成功');
		                                            //$('#ff').datagrid('reload');
		                                            var id = $("#deviceId").val();
		                                            var areaNo = $("#areaNo").val();
		                                            //var deviceRela = $("#deviceRela").val();
	                                                parent.com.frontier.areaEnergy.baseData.reloadTree.flushAndClickCurrentNode();
		                                        }
		                                    }
		    
		                                }    
		                            }); 
		                    }    
		                }); 
	                }
	    }
	    //修改按钮
	    function modifyData(){
	        $("#tranNo").textbox({disabled:false});
	        $("#tranName").textbox({disabled:false});
	        $("#factoryName").combobox({disabled:false});
	        $("#plateCap").textbox({disabled:false});
	        $("#tranKind").combobox({disabled:false});
	        $("#runStatus").combobox({disabled:false});
	        $("#TRAN_TYPE").combobox({disabled:false});
	        $("#createDate").datebox({disabled:false});
	        $("#madeDate").datebox({disabled:false});
	        $("#voltCode").combobox({disabled:false});
	        $("#validFlag").combobox({disabled:false});
	        $("#instAddr").textbox({disabled:false});
	        $("#showIndex").textbox({disabled:false});
	        $("#terminalId").textbox({disabled:false});
	        $("#STANDARD_CODE").textbox({disabled:false});
	        $("#OUT_FACTORY_SEQ").textbox({disabled:false});
	        $("#MANUFACT_DATE").datebox({disabled:false});
	        $("#EACH_NO").textbox({disabled:false});
	        $("#WEIGHT").textbox({disabled:false});
	        $("#INSULATE_WEGHT").textbox({disabled:false});
	        $("#UNION_LABEL").textbox({disabled:false});
	        $("#COOL_WAY").combobox({disabled:false});
	        $("#STANDARD_CAP").textbox({disabled:false});
	        $("#IMPEDANCE_VALUE").textbox({disabled:false});
	        $("#STANDARD_VOLT_H").textbox({disabled:false});
	        $("#STANDARD_VOLT_L").textbox({disabled:false});
	        $("#STANDARD_CURRENT_H").textbox({disabled:false});
	        $("#STANDARD_CURRENT_L").textbox({disabled:false});
	        $("#STANDARD_HZ").textbox({disabled:false});
	        $("#SHORT_IMPEDANCE").textbox({disabled:false});
	        $("#NO_LOAD_LOSS").textbox({disabled:false});
	        $("#FULL_LOAD_LOSS").textbox({disabled:false});
	        $("#ECT_VOLT_LOCAL").textbox({disabled:false});
	        $("#ECT_VOLT_HV").textbox({disabled:false});
	        $("#ECT_VOLT_HI").textbox({disabled:false});
	        $("#ECT_VOLT_LV").textbox({disabled:false});
	        $("#ECT_VOLT_LI").textbox({disabled:false});
	        
	        
	        $("#link").unbind('click');
            $("#link").bind('click',chooseTmnl);
	        
	        document.getElementById("modifyButton").style.display = 'none';
	        document.getElementById("saveButton").style.display = 'block';
	    }
	    //取消按钮
	    function cancleAction(){
	        $("#tranNo").textbox({disabled:true});
            $("#tranName").textbox({disabled:true});
            $("#factoryName").combobox({disabled:true});
            $("#plateCap").textbox({disabled:true});
            $("#tranKind").combobox({disabled:true});
            $("#TRAN_TYPE").combobox({disabled:true});
            $("#runStatus").combobox({disabled:true});
            $("#createDate").datebox({disabled:true});
            $("#madeDate").datebox({disabled:true});
            $("#voltCode").combobox({disabled:true});
            $("#instAddr").textbox({disabled:true});
            $("#validFlag").combobox({disabled:true});
            $("#showIndex").textbox({disabled:true});
            $("#terminalId").textbox({disabled:true});
            $("#STANDARD_CODE").textbox({disabled:true});
	        $("#OUT_FACTORY_SEQ").textbox({disabled:true});
	        $("#MANUFACT_DATE").datebox({disabled:true});
	        $("#EACH_NO").textbox({disabled:true});
	        $("#WEIGHT").textbox({disabled:true});
	        $("#INSULATE_WEGHT").textbox({disabled:true});
	        $("#UNION_LABEL").textbox({disabled:true});
	        $("#COOL_WAY").combobox({disabled:true});
	        $("#STANDARD_CAP").textbox({disabled:true});
	        $("#IMPEDANCE_VALUE").textbox({disabled:true});
	        $("#STANDARD_VOLT_H").textbox({disabled:true});
	        $("#STANDARD_VOLT_L").textbox({disabled:true});
	        $("#STANDARD_CURRENT_H").textbox({disabled:true});
	        $("#STANDARD_CURRENT_L").textbox({disabled:true});
	        $("#STANDARD_HZ").textbox({disabled:true});
	        $("#SHORT_IMPEDANCE").textbox({disabled:true});
	        $("#NO_LOAD_LOSS").textbox({disabled:true});
	        $("#FULL_LOAD_LOSS").textbox({disabled:true});
	        $("#ECT_VOLT_LOCAL").textbox({disabled:true});
	        $("#ECT_VOLT_HV").textbox({disabled:true});
	        $("#ECT_VOLT_HI").textbox({disabled:true});
	        $("#ECT_VOLT_LV").textbox({disabled:true});
	        $("#ECT_VOLT_LI").textbox({disabled:true});
            
            $("#link").unbind('click',chooseTmnl);
            $("#link").bind('click');
	        
	        document.getElementById("modifyButton").style.display = 'block';
	        document.getElementById("saveButton").style.display = 'none';
	    }
	    //选择终端
	    function chooseTmnl(){
	        var url = "<%=basePath%>/pages/areaEnergy/line/tmnlMessageList.jsp?subId=${param.subsId}"+'&deviceId='+${param.tranId}+"&tmnlId="+$('#tmnlAssetNo').val()+'&opType=update';
	        OpenWin(encodeURI(url),"终端配置列表",900,300);
	    }
        </script>

	</head>

	<body style="font-size:12px;">
		<div class="easyui-layout" style="width: 100%; height: 100%; ">
			<form id="ff" method="post"
				style="border: 0; width: 100%; height: 40%;">
				<input type="hidden" id="deviceId" name="queryPara.deviceId"
					value="${param.tranId}" />
				<input type="hidden" id="areaNo" name="queryPara.areaNo"
					value="${param.areaNo}" />
				<input type="hidden" id="deviceRela"name="queryPara.deviceRela"
					value="${param.deviceRela}" />
				<div data-options="region:'north',collapsible:false" style="padding-bottom: 45px;"
					class="easyui-panel" title="变压器信息"
					style="border: 0; width: 100%; height: 100%; overflow: auto; background: #fafafa;">
					<table class="" style="width: 100%; height: 100%;" border="0">
						<tbody valign="top">
							<tr>
								<td>
									<table>
										<tbody>
											<tr>
												<td width="10%" class="td-label" align="center"
													style="vertical-align: top; padding-top: 5px; font-size: 12px">
													铭牌容量
												</td>
												<td width="15%">
                                                    <input id="plateCap" type="text" name="queryPara.plateCap"
                                                        style="width: 200px" class="easyui-numberbox"
                                                        value="${resultMap.PLATE_CAP}" disabled="disabled"
                                                        data-options="validType:'length[1,16]',required:true,missingMessage:'请输入铭牌容量'"">
													<font style="color: red;">*</font>
												</td>
												<td width="10%" class="td-label" align="center"
													style="vertical-align: top; padding-top: 5px; font-size: 12px">
													电压等级
												</td>
												<td width="15%">
                                                    <input id="voltCode" name="queryPara.voltCode" value="${resultMap.TRAN_VOLT}"disabled="disabled"
                                                        style="width: 200px;" validType="comboxValidate['voltCode','请选择电压等级']">
													<font style="color: red;">*</font>
												</td>
												<td width="10%" class="td-label" align="center"
													style="vertical-align: top; padding-top: 5px; font-size: 12px">
													是否有效
												</td>
												<td width="15%">
													<select class="easyui-combobox" id="validFlag" disabled="disabled"
														name="queryPara.validFlag" value=""style="width: 200px;"
														data-options="panelHeight:'auto',editable:false">
														<option value="1">有效</option>
														<option value="0">无效</option>
													</select>
													<font style="color: red;">*</font>
												</td>
											</tr>
											<tr>
												<td width="10%" class="td-label" align="center"
													style="vertical-align: top; padding-top: 5px; font-size: 12px">
													显示序号
												</td>
												<td>
													<input class="easyui-textbox"
														value="${resultMap.SHOW_INDEX}" style="width: 200px" id="showIndex"
														disabled='disabled' name="queryPara.showIndex"
														data-options="validType:'length[1,5]',required:true,missingMessage:'请输入线路显示序号'">
													<font style="color: red;">*</font>
												</td>
												<td width="10%" class="td-label" align="center"
													style="vertical-align: top; padding-top: 5px; font-size: 12px">
													变压器编号
												</td>
												<td width="15%" >
                                                    <input id="tranNo" type="text" name="queryPara.tranNo"
                                                        style="width: 200px" class="easyui-textbox"
                                                        value="${resultMap.TRAN_NO}"disabled="disabled"
                                                        data-options="validType:'length[1,16]',required:false,missingMessage:'请输入变压器编号'">
                                                </td>
												<td width="10%" class="td-label" align="center"
													style="vertical-align: top; padding-top: 5px;font-size:12px">
													变压器型号
												</td>
												<td width="15%">
													<input id="tranKind" name="queryPara.tranKind" style="width: 200px"
														value="${resultMap.TRAN_KIND}" disabled="disabled">
												</td>
											</tr>
											<tr>
												<td width="10%" class="td-label" align="center"
													style="vertical-align: top; padding-top: 5px;font-size:12px">
													投运日期
												</td>
												<td width="15%">
													<input class="easyui-datebox" style="width: 200px;"editable='false'
														value="${resultMap.CREATE_DATE}" disabled="disabled"
														id="createDate" name="queryPara.createDate">
												</td>
												<td width="10%" class="td-label" align="center"
													style="vertical-align: top; padding-top: 5px;font-size:12px">
													出厂日期
												</td>
												<td width="15%">
													<input class="easyui-datebox" style="width: 200px;"editable='false'
														value="${resultMap.MADE_DATE}" disabled="disabled"
														id="madeDate" name="queryPara.madeDate">
												</td>
												<td width="10%" class="td-label" align="center"
													style="vertical-align: top; padding-top: 5px; font-size: 12px">
													变压器名称
												</td>
												<td width="15%">
                                                    <input id="tranName" type="text" name="queryPara.tranName"
                                                        style="width: 200px" class="easyui-textbox"
                                                        value="${resultMap.TRAN_NAME}" disabled="disabled"
                                                        data-options="validType:'length[1,32]',required:true,missingMessage:'请输入主变名称'">
                                                </td>
											</tr>
											<tr>
												<td width="10%" class="td-label" align="center"
													style="vertical-align: top; padding-top: 5px; width: 100px; font-size: 12px">
													所属终端
												</td>
												<td width="15%">
													<table>
														<tr>
															<td>
																<input id="terminalId" type="text" style="width: 180px"
																	name="queryPara.terminalId" size="17" value="${resultMap.TMNL_ASSET_NO}"
																	class="easyui-textbox" disabled="disabled" editable='false'
																	data-options="required:true,missingMessage:'请输入所属终端'">
																<input type="hidden" id="tmnlAssetNo"
																	name="queryPara.tmnlAssetNo" value="${resultMap.TERMINAL_ID}" />
																<a onclick="return false;" style="cursor:pointer" id='link'><img src="<%=basePath%>images/query.gif"></a>
															</td>
														</tr>
													</table>
												</td>
												<td width="10%" class="td-label" align="center"
													style="vertical-align: top; padding-top: 5px; font-size: 12px">
													生产厂家名称
												</td>
												<td width="15%">
                                                    <input id="factoryName" name="queryPara.factoryName" style="width: 200px"
                                                        value="${resultMap.FACTORY_NAME}" disabled="disabled">
                                                </td>
												<td width="10%" class="td-label" align="center"
													style="vertical-align: top; padding-top: 5px; font-size: 12px">
													运行状态
												</td>
												<td width="15%">
                                                    <input id="runStatus" name="queryPara.runStatus"
                                                        style="width: 200px" value="${resultMap.RUN_STATUS}"
                                                        disabled="disabled">
                                                </td>
											</tr>
											<tr>
											<td width="10%" class="td-label" align="center"
												style="vertical-align: top; padding-top: 5px; width: 100px; font-size: 12px">
												标准代号
											</td>
											<td width="15%">
												<input id="STANDARD_CODE" class="easyui-textbox" name="queryPara.STANDARD_CODE" value="${resultMap.STANDARD_CODE}" disabled="disabled"
													style="width: 200px;" data-options="validType:'length[1,32]',required:false">
											</td>
											<td width="10%" class="td-label" align="center"
												style="vertical-align: top; padding-top: 5px; width: 100px; font-size: 12px">
												出厂序（编）号
											</td>
											<td width="15%">
												<input id="OUT_FACTORY_SEQ" class="easyui-textbox" name="queryPara.OUT_FACTORY_SEQ" style="width: 200px;" 
												value="${resultMap.OUT_FACTORY_SEQ}" disabled="disabled"
													value="" data-options="validType:'length[1,32]',required:false">
											</td>
											<td width="10%" class="td-label" align="center"
												style="vertical-align: top; padding-top: 5px; width: 100px; font-size: 12px">
												制造年月（生产日期）
											</td>
											<td colspan="3" width="15%">
												<input class="easyui-datebox" style="width: 200px;" editable='false' value="${resultMap.MANUFACT_DATE}" disabled="disabled"
													id="MANUFACT_DATE" name="queryPara.MANUFACT_DATE">
											</td>
										</tr>
										<tr>
											<td width="10%" class="td-label" align="center"
												style="vertical-align: top; padding-top: 5px; width: 100px; font-size: 12px">
												相数
											</td>
											<td width="15%">
												<input id="EACH_NO" class="easyui-numberbox" name="queryPara.EACH_NO" value="${resultMap.EACH_NO}" disabled="disabled"
													style="width: 200px;" data-options="validType:'length[1,16]',required:false">
											</td>
											<td width="10%" class="td-label" align="center"
												style="vertical-align: top; padding-top: 5px; width: 100px; font-size: 12px">
												重量
											</td>
											<td width="15%">
												<input id="WEIGHT" class="easyui-numberbox" name="queryPara.WEIGHT" value="${resultMap.WEIGHT}" disabled="disabled"
													size="23" data-options="validType:'length[1,16]',required:false,precision:2">
												<font style="font-size: 12px">kg</font>
											</td>
											<td width="10%" class="td-label" align="center"
												style="vertical-align: top; padding-top: 5px; width: 100px; font-size: 12px">
												绝缘油重量
											</td>
											<td width="15%">
												<input id="INSULATE_WEGHT" class="easyui-numberbox" name="queryPara.INSULATE_WEGHT" value="${resultMap.INSULATE_WEGHT}" disabled="disabled"
													size="23" data-options="validType:'length[1,16]',required:false,precision:2">
												<font style="font-size: 12px">kg</font>
											</td>
										</tr>
										<tr>
											<td width="10%" class="td-label" align="center"
												style="vertical-align: top; padding-top: 5px; width: 100px; font-size: 12px">
												联结组标号
											</td>
											<td width="15%">
												<input id="UNION_LABEL" class="easyui-textbox" name="queryPara.UNION_LABEL" value="${resultMap.UNION_LABEL}" disabled="disabled"
													style="width: 200px;" data-options="validType:'length[1,32]',required:false">
											</td>
											<td width="10%" class="td-label" align="center"
												style="vertical-align: top; padding-top: 5px; width: 100px; font-size: 12px">
												冷却方式
											</td>
											<td width="15%">
												<input id="COOL_WAY" name="queryPara.COOL_WAY" style="width: 200px;" disabled="disabled"
													value="">
											</td>
											<td width="10%" class="td-label" align="center"
												style="vertical-align: top; padding-top: 5px; width: 100px; font-size: 12px">
												额定容量
											</td>
											<td width="15%">
												<input id="STANDARD_CAP" class="easyui-numberbox" name="queryPara.STANDARD_CAP" value="${resultMap.STANDARD_CAP}" disabled="disabled"
													size="23" data-options="validType:'length[1,16]',required:false,precision:4">
												<font style="font-size: 12px">kVA</font>
											</td>
										</tr>
										<tr>
											<td width="10%" class="td-label" align="center"
												style="vertical-align: top; padding-top: 5px; width: 100px; font-size: 12px">
												短路阻抗实测值
											</td>
											<td width="15%">
												<input id="IMPEDANCE_VALUE" class="easyui-numberbox" name="queryPara.IMPEDANCE_VALUE" value="${resultMap.IMPEDANCE_VALUE}" disabled="disabled"
													size="24" data-options="validType:'length[1,16]',required:false,precision:4">
												<font style="font-size: 12px">%</font>
											</td>
											<td width="10%" class="td-label" align="center"
												style="vertical-align: top; padding-top: 5px; width: 100px; font-size: 12px">
												高压额定电压
											</td>
											<td width="15%">
												<input id="STANDARD_VOLT_H" class="easyui-numberbox" name="queryPara.STANDARD_VOLT_H" value="${resultMap.STANDARD_VOLT_H}" disabled="disabled"
													style="width: 200px;" data-options="validType:'length[1,16]',required:false,precision:4">
											</td>
											<td width="10%" class="td-label" align="center"
												style="vertical-align: top; padding-top: 5px; width: 100px; font-size: 12px">
												低压额定电压
											</td>
											<td width="15%">
												<input id="STANDARD_VOLT_L" class="easyui-numberbox" name="queryPara.STANDARD_VOLT_L" value="${resultMap.STANDARD_VOLT_L}" disabled="disabled"
													style="width: 200px;" data-options="validType:'length[1,16]',required:false,precision:4">
											</td>
										</tr>
										<tr>
											<td width="10%" class="td-label" align="center"
												style="vertical-align: top; padding-top: 5px; width: 100px; font-size: 12px">
												高压额定电流
											</td>
											<td width="15%">
												<input id="STANDARD_CURRENT_H" class="easyui-numberbox" name="queryPara.STANDARD_CURRENT_H" 
												value="${resultMap.STANDARD_CURRENT_H}" disabled="disabled"
													style="width: 200px;" data-options="validType:'length[1,16]',required:false,precision:4">
											</td>
											<td width="10%" class="td-label" align="center"
												style="vertical-align: top; padding-top: 5px; width: 100px; font-size: 12px">
												低压额定电流
											</td>
											<td width="15%">
												<input id="STANDARD_CURRENT_L" class="easyui-numberbox" name="queryPara.STANDARD_CURRENT_L" 
												value="${resultMap.STANDARD_CURRENT_L}" disabled="disabled"
													style="width: 200px;" data-options="validType:'length[1,16]',required:false,precision:4">
											</td>
											<td width="10%" class="td-label" align="center"
												style="vertical-align: top; padding-top: 5px; width: 100px; font-size: 12px">
												额定频率
											</td>
											<td width="15%">
												<input id="STANDARD_HZ" class="easyui-numberbox" name="queryPara.STANDARD_HZ" value="${resultMap.STANDARD_HZ}" disabled="disabled"
													size="23" data-options="validType:'length[1,16]',required:false,precision:2">
												<font style="font-size: 12px">Hz</font>	
											</td>
										</tr>
										<tr>
											<td width="10%" class="td-label" align="center"
												style="vertical-align: top; padding-top: 5px; width: 100px; font-size: 12px">
												短路阻抗
											</td>
											<td width="15%">
												<input id="SHORT_IMPEDANCE" class="easyui-numberbox" name="queryPara.SHORT_IMPEDANCE" value="${resultMap.SHORT_IMPEDANCE}" disabled="disabled"
													size="24" data-options="validType:'length[1,16]',required:false,precision:2">
												<font style="font-size: 12px">%</font>
											</td>
											<td width="10%" class="td-label" align="center"
												style="vertical-align: top; padding-top: 5px; width: 100px; font-size: 12px">
												空载损耗
											</td>
											<td width="15%">
												<input id="NO_LOAD_LOSS" class="easyui-numberbox" name="queryPara.NO_LOAD_LOSS" value="${resultMap.NO_LOAD_LOSS}" disabled="disabled"
													style="width: 200px;" data-options="validType:'length[1,16]',required:false,precision:2">
											</td>
											<td width="10%" class="td-label" align="center"
												style="vertical-align: top; padding-top: 5px; width: 100px; font-size: 12px">
												负载损耗
											</td>
											<td width="15%">
												<input id="FULL_LOAD_LOSS" class="easyui-numberbox" name="queryPara.FULL_LOAD_LOSS" value="${resultMap.FULL_LOAD_LOSS}" disabled="disabled"
													style="width: 200px;" data-options="validType:'length[1,16]',required:false,precision:2">
											</td>
										</tr>
										<tr>
											<td width="10%" class="td-label" align="center"
												style="vertical-align: top; padding-top: 5px; width: 100px; font-size: 12px">
												电压分接位置
											</td>
											<td width="15%">
												<input id="ECT_VOLT_LOCAL" class="easyui-textbox" name="queryPara.ECT_VOLT_LOCAL" value="${resultMap.ECT_VOLT_LOCAL}" disabled="disabled"
													size="24" data-options="validType:'length[1,64]',required:false,precision:2">
											</td>
											<td width="10%" class="td-label" align="center"
												style="vertical-align: top; padding-top: 5px; width: 100px; font-size: 12px">
												高压电压电压分接
											</td>
											<td width="15%">
												<input id="ECT_VOLT_HV" class="easyui-numberbox" name="queryPara.ECT_VOLT_HV" value="${resultMap.ECT_VOLT_HV}" disabled="disabled"
													style="width: 200px;" data-options="validType:'length[1,16]',required:false,precision:4">
											</td>
											<td width="10%" class="td-label" align="center"
												style="vertical-align: top; padding-top: 5px; width: 100px; font-size: 12px">
												高压电压电流分接
											</td>
											<td width="15%">
												<input id="ECT_VOLT_HI" class="easyui-numberbox" name="queryPara.ECT_VOLT_HI" value="${resultMap.ECT_VOLT_HI}" disabled="disabled"
													style="width: 200px;" data-options="validType:'length[1,16]',required:false,precision:2">
											</td>
										</tr>
										<tr>
											<td width="10%" class="td-label" align="center"
												style="vertical-align: top; padding-top: 5px; width: 100px; font-size: 12px">
												低压电压电压分接
											</td>
											<td width="15%">
												<input id="ECT_VOLT_LV" class="easyui-numberbox" name="queryPara.ECT_VOLT_LV" value="${resultMap.ECT_VOLT_LV}" disabled="disabled"
													style="width: 200px;" data-options="validType:'length[1,16]',required:false,precision:4">
											</td>
											<td width="10%" class="td-label" align="center"
												style="vertical-align: top; padding-top: 5px; width: 100px; font-size: 12px">
												低压电压电流分接
											</td>
											<td width="15%">
												<input id="ECT_VOLT_LI" class="easyui-numberbox" name="queryPara.ECT_VOLT_LI" value="${resultMap.ECT_VOLT_LI}" disabled="disabled"
													style="width: 200px;" data-options="validType:'length[1,16]',required:false,precision:2">
											</td>
											<td width="10%" class="td-label" align="center"
												style="vertical-align: top; padding-top: 5px; width: 100px; font-size: 12px">
												安装地址
											</td>
											<td width="15%">
												<input id="instAddr" type="text" name="queryPara.instAddr"
													style="width: 200px" class="easyui-textbox"
													value="${resultMap.INST_ADDR}" disabled="disabled"
													data-options="validType:'length[1,128]',required:false,missingMessage:'请输入'">
											</td>
											</tr>
											<tr>
											<td width="10%" class="td-label" align="center"
												style="vertical-align: top; padding-top: 5px; width: 100px; font-size: 12px">
													变压器类型
											</td>
											<td width="25%">
												<input id="TRAN_TYPE" name="queryPara.TRAN_TYPE" value=""size="27"  value = "" disabled="disabled" >
											</td>
										</tr>
										</tbody>
									</table>
									<!-- 底部按钮区开始  -->
									
									<!-- 底部按钮区结束  -->
								</td>
							</tr>
						</tbody>
					</table>
					<div align="center" id="modifyButton">
					<a class="easyui-linkbutton c1" id="modifyRealBtn"
						style="width: 80px; height: 24px;" onclick="modifyData()">修改</a>
				</div>
				<div align="center" id="saveButton" style="display: none;">
					<a id="btn" class="easyui-linkbutton c1"
						style="width: 80px; height: 24px;" onclick="saveData()">保存</a>
					<a id="btn" class="easyui-linkbutton c1"
											style="width: 80px; height: 24px;" onclick="cancleAction()">取消</a>
				</div>
				</div>
				
			</form>
			<div 
				data-options="region:'center',title:'增加测点信息(注：当测点类型为遥信、告警策略为定制告警时，告警上限值只能输入1和0（开：0，合：1）)',iconCls:'icon-editor'">
				<table class="easyui-datagrid" id="dg"
					data-options="url:'<%=basePath%>areaEnergyTmnl/getMpInfo.action?tranId=${param.tranId}&areaNo=${param.areaNo}&deviceRela=${param.deviceRela}&deviceName='+encodeURIComponent($('#tranName').val()),
									method:'get',
                                    toolbar: '#tb',
                                    iconCls: 'icon-edit',
									rownumbers:true,
									border:false,
									singleSelect:false,
									fit:true,
									fitColumns:true,
                                    onClickCell: onClickCell,
                                    onEndEdit: onEndEdit">
					<thead>
						<tr>
							<th data-options="field:'MP_ID',width:80,checkbox:true,
						formatter:function(value,row){
						return row.MP_ID;
						}"
											rowspan="2">
							</th>
							<th
								data-options="field:'VALID_FLAG',width:50,align:'center',editable:false,
                                formatter:function(value,row){
                                    return row.flagName;
                                },
                                editor:{
                                    type:'combobox',
                                    options:{
                                        valueField:'VALID_FLAG',
                                        textField:'flagName',
                                        method:'get',
                                    data: [{
                                                VALID_FLAG: '1',
                                                flagName: '是'
                                            },{
                                                VALID_FLAG: '0',
                                                flagName: '否'
                                            }]
                                    }
                                }"
								rowspan="2">
								是否
								<br>
								启用
							</th>
							<th data-options="field:'MP_NAME',width:200,align:'center',editor:'textbox',
						formatter: function(value,row,index){
						return row.MP_NAME;
						}" rowspan="2">
								测点名称
							</th>
							<th data-options="field:'MP_TYPE',align:'center',width:80,
						formatter: function(value,row,index){
						return row.MP_TYPE;
						}" rowspan="2">
								测点
								<br>
								类型
							</th>
							<th data-options="field:'MP_CODE',align:'center',width:100,
					formatter: function(value,row,index){
					return row.MP_CODE;
					}" rowspan="2">
								测点
								<br>
								编码
							</th>
							<th data-options="field:'COLL_ADDR',align:'center',width:100,editor:'numberbox',
					formatter: function(value,row,index){
					return row.COLL_ADDR;
					}" rowspan="2">
								采集
								<br>
								地址码<font style="color: red;">*</font>
							</th>
							<th data-options="field:'RATIONUM',align:'center',width:120,editor:{type:'numberbox',options:{precision:10}},
					                    formatter: function(value,row,index){
					                                return row.RATIONUM;
					                        }" rowspan="2">
								系数<font style="color: red;">*</font>
							</th>
							<th data-options="field:'BASE_VALUE',align:'center',width:120,editor:{type:'numberbox',options:{min:0,precision:10}},
					                    formatter: function(value,row,index){
					                                if (row.BASE_VALUE != null && row.BASE_VALUE != '') {
					                    				return row.BASE_VALUE;
					                    			} else {
					                    				return 0;
					                    			}
					                        }" rowspan="2">
								基数
							</th>
							<th
								data-options="field:'warningWayId',width:100,align:'center',
                                formatter:function(value,row){
                                    return row.warningWayText;
                                },
                                editor:{
                                    type:'combobox',
                                    options:{
                                        valueField:'warningWayId',
                                        textField:'warningWayText',
                                        method:'get',
                                        editable:false,
                                        url:'<%=basePath%>areaEnergyTmnl/getCodeNameByWarningWay.action?codeValue=70040',
                                        required:false,
                                        align:'center',
                                        onChange:function(n,o){
											   change(n,o);
											}
                                    }
                                }"
								rowspan="2">
								告警
								<br>
								策略
							</th>
							<th colspan="2">
								正常范围值
							</th>
							<th colspan="3">
								告警策略值
							</th>
							<th data-options="field:'DEVICE_TYPE',align:'center',width:100,
					                    formatter: function(value,row,index){
					                                return row.DEVICE_TYPE;
					                        }" rowspan="2">
								设备
								<br>
								类型
							</th>
							
						</tr>
						<tr>
							<th data-options="field:'NORMAL_UP',width:80,align:'center',editor:{type:'numberbox',options:{min:0,precision:4}},
							                    formatter: function(value,row,index){
							                                return row.NORMAL_UP;
							                        }">
								上限值
							</th>
							<th data-options="field:'NORMAL_DOWN',width:80,align:'center',editor:{type:'numberbox',options:{min:0,precision:4}},
							                    formatter: function(value,row,index){
							                                return row.NORMAL_DOWN;
							                        }">
								下限值
							</th>
							<th data-options="field:'WARING_UP',width:80,align:'center',editor:{type:'numberbox',options:{min:0,precision:4}},
							                    formatter: function(value,row,index){
							                                return row.WARING_UP;
							                        }">
								上限值
							</th>
							<th data-options="field:'WARING_DOWN',width:80,align:'center',editor:{type:'numberbox',options:{min:0,precision:4}},
							                    formatter: function(value,row,index){
							                                return row.WARING_DOWN;
							                        }">
								下限值
							</th>
							<th
								data-options="field:'id',width:100,align:'center',
                                formatter:function(value,row){
                                    return row.text;
                                },
                                editor:{
                                    type:'combobox',
                                    options:{
                                        valueField:'id',
                                        textField:'text',
                                        method:'get',
                                        editable:false,
                                        url:'<%=basePath%>areaEnergyTmnl/getWarningLevelInfo.action?areaNo=${param.areaNo}',
                                        required:false,
                                        align:'center'

                                    }
                                }">
								告警
								<br>
								等级
							</th>
						</tr>
					</thead>
				</table>
				<div id="tb" style="height: auto; background-color: ">
					<a class="easyui-linkbutton" id = "saveMpBtn"
						data-options="iconCls:'icon-save',plain:true"
						onclick="javascript:producedMp()">保存测点</a>
					<a class="easyui-linkbutton" id = "newMpBtn"
						data-options="iconCls:'icon-add',plain:true"
						onclick="javascript:addInfo()">新增行记录</a>
					<a class="easyui-linkbutton" id = "delMpBtn"
						data-options="iconCls:'icon-remove',plain:true"
						onclick="javascript:removeit()">删除行记录</a>
					<a class="easyui-linkbutton" id="batchMpImportBtn"
						data-options="iconCls:'icon-reload',plain:true"
						onclick="javascript:batchImportMp()">测点批量导入</a>
				    <a class="easyui-linkbutton" id="exportMp"
						data-options="iconCls:'icon-reload',plain:true"
						onclick="javascript:exportMp('<%=basePath%>','${param.tranId}')">测点导出</a>
				</div>
			</div>
		</div>
		<%@include file="/pages/areaEnergy/baseData/tmnlInstall/mpExport.jsp"%>
	</body>
</html>
<script type="text/javascript">
var editIndex = undefined;
    var warningValue = "";
    var warningUpObj = "";
    var mpType = "";
	function batchImportMp(){
		 var url = "<%=basePath%>"+'pages/areaEnergy/baseData/tmnlInstall/batchImportDeviceMp.jsp?deviceName='+encodeURIComponent($('#tranName').val())+'&tmnlId='+$('#tmnlAssetNo').val()+'&deviceType=3';
		 OpenWin(url,'批量导入测点','800','600');
	}
    $( function() {
    	var isEdit = parent.$("#isEdit").val();
		if(isEdit == 'false'){
			$("#modifyRealBtn").linkbutton("disable");
			$("#saveMpBtn").linkbutton("disable");
			$("#newMpBtn").linkbutton("disable");
			$("#delMpBtn").linkbutton("disable");
			$("#batchMpImportBtn").linkbutton("disable");
		}
        //变压器型号
        $('#tranKind').combobox({
            url :'<%=basePath%>areaEnergyTmnl/getCodeNameByCode.action?codeValue=70023',
            editable:false,//不可编辑状态
          valueField:'id',
          textField:'text'
        });
        //生产厂家
        $('#factoryName').combobox({
            url :'<%=basePath%>areaEnergyTmnl/getCodeNameByCode.action?codeValue=70018',
            editable:false,//不可编辑状态
          valueField:'id',
          textField:'text'
        });
        //电压等级
        $('#voltCode').combobox({
            url :'<%=basePath%>areaEnergyTmnl/getVoltCode.action',
            //url: '<%=basePath%>pages/despages/jquery-easyui-1.5.1/demo/combobox/combobox_data1.json',
            editable:false,//不可编辑状态
          valueField:'id',
          textField:'text'
        });
        //运行状态runStatus
        $('#runStatus').combobox({
            url :'<%=basePath%>areaEnergyTmnl/getCodeNameByCode.action?codeValue=70033',
            editable:false,//不可编辑状态
          valueField:'id',
          textField:'text'
        });
        //冷却方式
        $('#COOL_WAY').combobox({
            url :'<%=basePath%>areaEnergyTmnl/getCodeNameByCode.action?codeValue=70058',
            editable:false,//不可编辑状态
          valueField:'id',
          textField:'text'
        });
      //生产厂家
        $('#TRAN_TYPE').combobox({
            url :'<%=basePath%>areaEnergyTmnl/getCodeNameByCode.action?codeValue=70022',
            editable:false,//不可编辑状态
          valueField:'id',
          textField:'text'
        });
        $.extend($.fn.validatebox.defaults.rules, {    
            comboxValidate: {    
                validator: function(value, param,missingMessage){ 
                    if($('#'+param).combobox('getValue')!=''&& $('#'+param).combobox('getValue')!=null){
                       return true;
                    }   
                    return false;    
                },    
                message: '{1}'   
            } 
        });
        $('#validFlag').combobox({//是否有效
            value:'${resultMap.VALID_FLAG}'
        });
        $('#COOL_WAY').combobox({//是否有效
            value:'${resultMap.COOL_WAY}'
        });
        $('#TRAN_TYPE').combobox({//是否有效
            value:'${resultMap.TRAN_TYPE}'
        });
        
    });
    
    $('#voltCode').combobox({
		onChange : function() {
		    $('#voltCode').combobox('validate');
		}
    });
    //生成测点
     function producedMp(){
        $('#dg').datagrid('acceptChanges');
        var rows = $('#dg').datagrid('getSelections'); 
            if(rows.length==0){  
                  $.messager.alert('提示',"请选择你要生成测点的采集点信息",'info'); 
                  return; 
            }
            
            $.messager.confirm('提示','确定要生成测点吗?',doSubmit);
    }
    function doSubmit(result){
          if (result){  
             var rows = $('#dg').datagrid('getSelections');  
             var terminalId = $('#tmnlAssetNo').val();
             var deviceId = $('#deviceId').val();
             var areaNo = $('#areaNo').val();
             var mpArr = [];  
             var flag = 1;
             var warningLevel = '';
             var warningWayId = '';
             var eachFlag = true;
             $.each(rows,function(i,n){
                 if(n.flagName == '是'){
                     flag = 1;
                 }else if(n.flagName == '否'){
                     flag = 0; 
                 }else{
                     flag = n.flagName;
                 }
                 //校验
                 if(flag == 1){
                     if(n.COLL_ADDR ==""||n.COLL_ADDR == null){
                         $.messager.alert('提示',"采集点地址不能为空！",'info'); 
                         editIndex = undefined;
                         eachFlag = false;
                         return false;
                     }
                     if(n.RATIONUM ==""||n.RATIONUM == null){
                         $.messager.alert('提示',"系数不能为空！",'info');
                         editIndex = undefined;
                         eachFlag = false; 
                         return false; 
                     }
                 }
                 //告警值上限判断
                 if(n.MP_TYPE =='遥信'&& n.warningWayText =='定制告警'){
                     if(n.WARING_UP != 1.0000 && n.WARING_UP != 0.0000 && n.WARING_UP != null && n.WARING_UP != ''){
                        $.messager.alert('提示',"当测点类型和告警策略分别为遥信和定制告警时，告警策略值的上限值只能输入1或者0！",'info'); 
                        editIndex = undefined;
                         eachFlag = false;
                         return false;
                     }
                 }
                 
                 /*if(n.text == '请选择'){
                     warningLevel = '';
                 }else if(n.text == '紧急告警'){
                     warningLevel = 1; 
                 }else if(n.text == '事故告警'){
                     warningLevel = 2; 
                 }else if(n.text == '普通告警'){
                     warningLevel = 3; 
                 }else if(n.text == '一般记录'){
                     warningLevel = 4; 
                 }*/
                 //告警策略
                 if(n.warningWayText == '请选择'){
                     warningWayId = '';
                 }else if(n.warningWayText == '不告警'){
                     warningWayId = 1; 
                 }else if(n.warningWayText == '定制告警'){
                     warningWayId = 2; 
                 }else if(n.warningWayText == '告警模板1'){
                     warningWayId = 3; 
                 }
                 
                 /*if(n.NORMAL_UP ==""||n.NORMAL_UP == null){
                     $.messager.alert('提示',"正常范围值的上限值不能为空！",'info'); 
                     return; 
                 }
                 if(n.NORMAL_DOWN ==""||n.NORMAL_DOWN == null){
                     $.messager.alert('提示',"正常范围值的下限值不能为空！",'info'); 
                     return; 
                 }*/
                 if(n.NORMAL_UP == null){
                     n.NORMAL_UP = '';
                 }
                 if(n.NORMAL_DOWN == null){
                     n.NORMAL_DOWN = '';
                 }
                 if(n.WARING_UP == null){
                     n.WARING_UP = '';
                 }
                 if(n.WARING_DOWN == null){
                     n.WARING_DOWN = '';
                 }
                 if(n.text == null){
                     n.text = '';
                 }
                 
                 mpArr.push({'mpId' : n.MP_ID
                             ,'mpCode' : n.MP_CODE
                             ,'mpName' : n.MP_NAME
                             ,'mpType' : n.MP_TYPE
                             ,'collAddr' : Number(n.COLL_ADDR)
                             ,'validFlag' : Number(flag)
                             ,'ratio' : Number(n.RATIONUM)
                             ,'baseValue' : Number(n.BASE_VALUE)
                             ,'normalUp' : n.NORMAL_UP
                             ,'normalDown' : n.NORMAL_DOWN
                             ,'waringLevel' : n.text
                             ,'waringUp' : n.WARING_UP
                             ,'waringDown' : n.WARING_DOWN
                             ,'terminalId' : Number(terminalId)
                             ,'deviceId' : Number(deviceId)
                             ,'deviceType' : 3
                             ,'warningWay':warningWayId
                             ,'areaNo':areaNo
                           });
	         });
	         if(!eachFlag){
	            return;
	         }else{
		         var para = 'mpList='+JSON.stringify(mpArr);
		         //alert(para);
		         //保存测点
		         var url = "<%=basePath%>areaEnergy/saveDeviceMpInfo.action";
		         $.ajax({
		             url : url,
		             type: "post",
		             data : para,
		             dataType:"json",
		             timeout:60000, 
		             error : function (XMLHttpRequest, textStatus, errorThrown) {
		                 alert('程序异常');
		             },
		             success : function(result) {
		                  if(result.flag=='1'){
		                     $.messager.alert('提示',result.info,'info',function(){
		                          parent.com.frontier.areaEnergy.baseData.reloadTree.flushAndClickCurrentNode();
		                     });
		                  }else{
		                     $.messager.alert('提示',result.info,'info',function(){
		                          //parent.com.frontier.areaEnergy.baseData.reloadTree.flushAndClickCurrentNode();
		                          editIndex = undefined;
		                     });
		                  }
		             }
		         });
	         }
	     }else {
	         //parent.com.frontier.areaEnergy.baseData.reloadTree.flushAndClickCurrentNode();
	         editIndex = undefined;
	     }
    }
    //增加行记录
    function addInfo(){
    	var url = "<%=basePath%>/pages/areaEnergy/baseData/tmnlInstall/chooseMpList.jsp?deviceRela="+'${param.deviceRela}';
	    OpenWin(url,"修改测点",680,450);	
    }
    
    function getMpInfo(mpIdStr,mpNameStr,mpTypeNameStr,mpCodeStr){
    	for(var i=0;i<mpIdStr.length;i++){
    		$('#dg').datagrid('appendRow',{
				MP_ID: '-1',
				VALID_FLAG : '1',
    			flagName : '是' ,
				MP_NAME: $('#tranName').val()+mpNameStr[i],
				MP_TYPE: mpTypeNameStr[i],
				MP_CODE: mpCodeStr[i],
				warningWayId: '',
				warningWayText:'请选择',
				id: '',
                text:'请选择',
				DEVICE_TYPE: '变压器',
			});	
    	}
    }
    //删除行记录
    function removeit(){
        var rows = $('#dg').datagrid('getSelections'); 
        if(rows.length==0){  
            $.messager.alert('提示',"请选择你要删除的已生成测点",'info'); 
            return; 
        }
        $.messager.confirm('提示','确定要删除吗?',function(result){  
                if (result){  
                    var rows = $('#dg').datagrid('getSelections');  
                    var mpIdArr = [];  
                    $.each(rows,function(i,n){
                        mpIdArr.push({'MP_ID' : n.MP_ID});
                    });
                    //删除客户
                    var url = "<%=basePath%>areaEnergy/deleteMpOfCons.action";
                    var para = 'mpIds='+JSON.stringify(mpIdArr);
                    $.ajax({
                        url : url,
                        type: "post",
                        data : para,
                        dataType:"json",
                        timeout:60000, 
                        error : function (XMLHttpRequest, textStatus, errorThrown) {
                             alert('程序异常');
                        },
                        success : function(result) {
                             $.messager.alert('提示',result.msg,'info');
                             if(result.flag=='1'){
                                parent.com.frontier.areaEnergy.baseData.reloadTree.flushAndClickCurrentNode();
                             }
                        }
                    });
                }  
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
		
    //编辑的一行验证通过，才可以结束 ，进而下一行的编辑
    function endEditing(){
        if (editIndex == undefined){return true}
        if ($('#dg').datagrid('validateRow', editIndex)){
            $('#dg').datagrid('endEdit', editIndex);
            editIndex = undefined;
            return true;
        } else {
            return false;
        }
    }
    var indexChange;
    //var warningUpFlag = 0;
    function change(newVal,oldVal){
        var selectedRow = $('#dg').datagrid("getSelected");
        var index = indexChange;
        var rows = $('#dg').datagrid('getRows');
        var r = rows[index];
        mpType = r.MP_TYPE;
        //mpType = '遥信';
        
        //告警策略
        var row = $('#dg').datagrid('selectRow', index);
        if(mpType == '遥测' || mpType =='遥脉'){
            if(newVal == 1){
                var normalUp = $(row).datagrid('getEditor', {
                                    index: index,  
                                    field: 'NORMAL_UP'
                                });
                $(normalUp.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                $(normalUp.target).numberbox('clear');
                var normalDown = $(row).datagrid('getEditor', {
                                    index: index,  
                                    field: 'NORMAL_DOWN'
                                });
                $(normalDown.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                $(normalDown.target).numberbox('clear');
                var warningUp = $(row).datagrid('getEditor', {
                                    index: index,  
                                    field: 'WARING_UP'
                                });
                $(warningUp.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                $(warningUp.target).numberbox('clear');
                var warningDown = $(row).datagrid('getEditor', {
                                    index: index,  
                                    field: 'WARING_DOWN'
                                });
                $(warningDown.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                $(warningDown.target).numberbox('clear');
                 var waringLevel = $(row).datagrid('getEditor', {
                    index: index,
                    field: 'id'
                });
                $(waringLevel.target).combobox('disable');
                $(waringLevel.target).combobox('setValue', '');
            }else if(newVal == 2){
                var normalUp = $(row).datagrid('getEditor', {
                                    index: index,  
                                    field: 'NORMAL_UP'
                                });
                $(normalUp.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                $(normalUp.target).numberbox('clear');
                var normalDown = $(row).datagrid('getEditor', {
                                    index: index,  
                                    field: 'NORMAL_DOWN'
                                });
                $(normalDown.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                $(normalDown.target).numberbox('clear');
                 var warningUp = $(row).datagrid('getEditor', {
                                    index: index,  
                                    field: 'WARING_UP'
                                });
                $(warningUp.target).textbox('textbox').attr('readonly',false);//设置输入框为禁用
                var warningDown = $(row).datagrid('getEditor', {
                                    index: index,  
                                    field: 'WARING_DOWN'
                                });
                $(warningDown.target).textbox('textbox').attr('readonly',false);//设置输入框为禁用
                var waringLevel = $(row).datagrid('getEditor', {
                    index: index,
                    field: 'id'
                });
                $(waringLevel.target).combobox('enable');
            }else if(newVal == 3){
                  var normalUp = $(row).datagrid('getEditor', {
                                    index: index,  
                                    field: 'NORMAL_UP'
                                });
                $(normalUp.target).textbox('textbox').attr('readonly',false);//设置输入框为禁用
                var normalDown = $(row).datagrid('getEditor', {
                                    index: index,  
                                    field: 'NORMAL_DOWN'
                                });
                $(normalDown.target).textbox('textbox').attr('readonly',false);//设置输入框为禁用
                
                 var warningUp = $(row).datagrid('getEditor', {
                                    index: index,  
                                    field: 'WARING_UP'
                                });
                $(warningUp.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                $(warningUp.target).numberbox('clear');
                var warningDown = $(row).datagrid('getEditor', {
                                    index: index,  
                                    field: 'WARING_DOWN'
                                });
                $(warningDown.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                $(warningDown.target).numberbox('clear');
                var waringLevel = $(row).datagrid('getEditor', {
                    index: index,
                    field: 'id'
                });
                $(waringLevel.target).combobox('disable');
                $(waringLevel.target).combobox('setValue', '');
            }else if(newVal == ''){
                         var normalUp = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'NORMAL_UP'
                                        });
                        $(normalUp.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                        $(normalUp.target).numberbox('clear');
                        var normalDown = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'NORMAL_DOWN'
                                        });
                        $(normalDown.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                        $(normalDown.target).numberbox('clear');
                        
                         var warningUp = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'WARING_UP'
                                        });
                        $(warningUp.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                        $(warningUp.target).numberbox('clear');
                        
                        var warningDown = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'WARING_DOWN'
                                        });
                        $(warningDown.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                        $(warningDown.target).numberbox('clear');
                        
                        var waringLevel = $(row).datagrid('getEditor', {
                            index: index,
                            field: 'id'
                        });
                        $(waringLevel.target).combobox('disable');
                        $(waringLevel.target).combobox('setValue', '');
                    }
        }else if(mpType == '遥信'){
            if(newVal == 1||newVal == 3){
                  var normalUp = $(row).datagrid('getEditor', {
                                    index: index,  
                                    field: 'NORMAL_UP'
                                });
                $(normalUp.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                $(normalUp.target).numberbox('clear');
                
                var normalDown = $(row).datagrid('getEditor', {
                                    index: index,  
                                    field: 'NORMAL_DOWN'
                                });
                $(normalDown.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                $(normalDown.target).numberbox('clear');
                
                 var warningUp = $(row).datagrid('getEditor', {
                                    index: index,  
                                    field: 'WARING_UP'
                                });
                $(warningUp.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                $(warningUp.target).numberbox('clear');
                
                var warningDown = $(row).datagrid('getEditor', {
                                    index: index,  
                                    field: 'WARING_DOWN'
                                });
                $(warningDown.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                $(warningDown.target).numberbox('clear');
                
                var waringLevel = $(row).datagrid('getEditor', {
                    index: index,
                    field: 'id'
                });
                $(waringLevel.target).combobox('disable');
                $(waringLevel.target).combobox('setValue', '');
            }else if(newVal == 2){
                 warningUpFlag = 1;
                 var normalUp = $(row).datagrid('getEditor', {
                                    index: index,  
                                    field: 'NORMAL_UP'
                                });
                $(normalUp.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                $(normalUp.target).numberbox('clear');
                
                var normalDown = $(row).datagrid('getEditor', {
                                    index: index,  
                                    field: 'NORMAL_DOWN'
                                });
                $(normalDown.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                $(normalDown.target).numberbox('clear');
                
                 var warningUp = $(row).datagrid('getEditor', {
                                    index: index,  
                                    field: 'WARING_UP'
                                });
                $(warningUp.target).textbox('textbox').attr('readonly',false);//设置输入框为禁用
                
                /*$(warningUp.target).combobox({
                                        valueField:'WARING_UP',    
                                        textField:'value',
                                        editable:false,
                                        required:false,
                                        align:'center',
                                         width:70,
                                        data: [{
                                            WARING_UP: '0',
                                            value: '开'
                                        },{
                                            WARING_UP: '1',
                                            value: '合'
                                        }]                                                      
                                    });*/
                                    
                var warningDown = $(row).datagrid('getEditor', {
                                    index: index,  
                                    field: 'WARING_DOWN'
                                });
                $(warningDown.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                $(warningDown.target).numberbox('clear');
                var waringLevel = $(row).datagrid('getEditor', {
                    index: index,
                    field: 'id'
                });
                $(waringLevel.target).combobox('enable');
            }else if(newVal == ''){
                         var normalUp = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'NORMAL_UP'
                                        });
                        $(normalUp.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                        $(normalUp.target).numberbox('clear');
                        var normalDown = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'NORMAL_DOWN'
                                        });
                        $(normalDown.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                        $(normalDown.target).numberbox('clear');
                        
                         var warningUp = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'WARING_UP'
                                        });
                        $(warningUp.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                        $(warningUp.target).numberbox('clear');
                        
                        var warningDown = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'WARING_DOWN'
                                        });
                        $(warningDown.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                        $(warningDown.target).numberbox('clear');
                        
                        var waringLevel = $(row).datagrid('getEditor', {
                            index: index,
                            field: 'id'
                        });
                        $(waringLevel.target).combobox('disable');
                        $(waringLevel.target).combobox('setValue', '');
                    }
        }
    }
    //点击单元格的时候开始编辑并生成编辑器，然后定位到编辑器的输入框上
    function onClickCell(index, field){
        
        if (editIndex != index){
            if (endEditing()){
            indexChange = index;
            
               //选中的这一行开始编辑
                $('#dg').datagrid('selectRow', index)
                        .datagrid('beginEdit', index);
                var ed = $('#dg').datagrid('getEditor', {index:index,field:field});
                //验证通过之后，判断上限下限值是否可以编辑
                //获取测点类型的值
                var row = $('#dg').datagrid('selectRow', index);
                //var checkedRow = $('#dg').datagrid("getSelected");
                var rows = $('#dg').datagrid('getRows');
                var checkedRow = rows[index];
                if(checkedRow.MP_TYPE == '遥测' || checkedRow.MP_TYPE =='遥脉'){
                    if(checkedRow.warningWayText == '不告警'){
                        var normalUp = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'NORMAL_UP'
                                        });
                        $(normalUp.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                        $(normalUp.target).numberbox('clear');
                        
                        var normalDown = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'NORMAL_DOWN'
                                        });
                        $(normalDown.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                        $(normalDown.target).numberbox('clear');
                        
                        var warningUp = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'WARING_UP'
                                        });
                        $(warningUp.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                        $(warningUp.target).numberbox('clear');
                        
                        var warningDown = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'WARING_DOWN'
                                        });
                        $(warningDown.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                        $(warningDown.target).numberbox('clear');
                        
                         var waringLevel = $(row).datagrid('getEditor', {
                            index: index,
                            field: 'id'
                        });
                        $(waringLevel.target).combobox('disable');
                        $(waringLevel.target).numberbox('clear');
                        
                    }else if(checkedRow.warningWayText == '定制告警'){
                        var normalUp = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'NORMAL_UP'
                                        });
                        $(normalUp.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                        $(normalUp.target).numberbox('clear');
                        
                        var normalDown = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'NORMAL_DOWN'
                                        });
                        $(normalDown.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                        $(normalDown.target).numberbox('clear');
                        
                         var warningUp = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'WARING_UP'
                                        });
                        $(warningUp.target).textbox('textbox').attr('readonly',false);//设置输入框为禁用
                        
                        var warningDown = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'WARING_DOWN'
                                        });
                        $(warningDown.target).textbox('textbox').attr('readonly',false);//设置输入框为禁用
                        
                        var waringLevel = $(row).datagrid('getEditor', {
                            index: index,
                            field: 'id'
                        });
                        $(waringLevel.target).combobox('enable');
                    }else if(checkedRow.warningWayText == '告警模板1'){
                         var normalUp = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'NORMAL_UP'
                                        });
                        $(normalUp.target).textbox('textbox').attr('readonly',false);//设置输入框为禁用
                        var normalDown = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'NORMAL_DOWN'
                                        });
                        $(normalDown.target).textbox('textbox').attr('readonly',false);//设置输入框为禁用
                        
                         var warningUp = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'WARING_UP'
                                        });
                        $(warningUp.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                        $(warningUp.target).numberbox('clear');
                        
                        var warningDown = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'WARING_DOWN'
                                        });
                        $(warningDown.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                        $(warningDown.target).numberbox('clear');
                        
                        var waringLevel = $(row).datagrid('getEditor', {
                            index: index,
                            field: 'id'
                        });
                        $(waringLevel.target).combobox('disable');
                        $(waringLevel.target).combobox('setValue', '');
                    }else if(checkedRow.warningWayText == '请选择'){
                         var normalUp = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'NORMAL_UP'
                                        });
                        $(normalUp.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                        $(normalUp.target).numberbox('clear');
                        
                        var normalDown = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'NORMAL_DOWN'
                                        });
                        $(normalDown.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                        $(normalDown.target).numberbox('clear');
                        
                         var warningUp = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'WARING_UP'
                                        });
                        $(warningUp.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                        $(warningUp.target).numberbox('clear');
                        
                        var warningDown = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'WARING_DOWN'
                                        });
                        $(warningDown.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                        $(warningDown.target).numberbox('clear');
                        
                        var waringLevel = $(row).datagrid('getEditor', {
                            index: index,
                            field: 'id'
                        });
                        $(waringLevel.target).combobox('disable');
                        $(waringLevel.target).combobox('setValue', '');
                    }
                }else if(checkedRow.MP_TYPE == '遥信'){
                    if(checkedRow.warningWayText == '不告警'||checkedRow.warningWayText == '告警模板1'){
                           var normalUp = $(row).datagrid('getEditor', {
                                              index: index,  
                                              field: 'NORMAL_UP'
                                          });
                          $(normalUp.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                          $(normalUp.target).numberbox('clear');
                          
                          var normalDown = $(row).datagrid('getEditor', {
                                              index: index,  
                                              field: 'NORMAL_DOWN'
                                          });
                          $(normalDown.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                          $(normalDown.target).numberbox('clear');
                          
                           var warningUp = $(row).datagrid('getEditor', {
                                              index: index,  
                                              field: 'WARING_UP'
                                          });
                          $(warningUp.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                          $(normalDown.target).numberbox('clear');
                          
                          var warningDown = $(row).datagrid('getEditor', {
                                              index: index,  
                                              field: 'WARING_DOWN'
                                          });
                          $(warningDown.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                          $(warningDown.target).numberbox('clear');
                          
                          
                          var waringLevel = $(row).datagrid('getEditor', {
                              index: index,
                              field: 'id'
                          });
                          $(waringLevel.target).combobox('disable');
                          $(waringLevel.target).combobox('setValue', '');
                          
                    }else if(checkedRow.warningWayText == '定制告警'){
                        warningUpFlag = 1;
                        var normalUp = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'NORMAL_UP'
                                        });
                        $(normalUp.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                        $(normalUp.target).numberbox('clear');
                        
                        var normalDown = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'NORMAL_DOWN'
                                        });
                        $(normalDown.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                        $(normalDown.target).numberbox('clear');
                        
                         var warningUp = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'WARING_UP'
                                        });
                        $(warningUp.target).textbox('textbox').attr('readonly',false);//设置输入框为可用
                        /*$(warningUp.target).combobox({
                                        valueField:'WARING_UP',    
                                        textField:'value',
                                        editable:false,
                                        required:false,
                                        align:'center',
                                         width:70,
                                        data: [{
                                            WARING_UP: '0',
                                            value: '开'
                                        },{
                                            WARING_UP: '1',
                                            value: '合'
                                        }]                                                      
                                    });*/
                        var warningDown = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'WARING_DOWN'
                                        });
                        $(warningDown.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                        $(warningDown.target).numberbox('clear');
                        
                        var waringLevel = $(row).datagrid('getEditor', {
                            index: index,
                            field: 'id'
                        });
                        $(waringLevel.target).combobox('enable');
                    }else if(checkedRow.warningWayText == '请选择'){
                         var normalUp = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'NORMAL_UP'
                                        });
                        $(normalUp.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                        $(normalUp.target).numberbox('clear');
                        
                        var normalDown = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'NORMAL_DOWN'
                                        });
                        $(normalDown.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                        $(normalDown.target).numberbox('clear');
                        
                         var warningUp = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'WARING_UP'
                                        });
                        $(warningUp.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                        $(warningUp.target).numberbox('clear');
                        
                        var warningDown = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'WARING_DOWN'
                                        });
                        $(warningDown.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                        $(warningDown.target).numberbox('clear');
                        
                        var waringLevel = $(row).datagrid('getEditor', {
                            index: index,
                            field: 'id'
                        });
                        $(waringLevel.target).combobox('disable');
                        $(waringLevel.target).combobox('setValue', '');
                    }
                }
                    
               
                if (ed){
                    //($(ed.target).data('numberbox') ? $(ed.target).textbox('numberbox') : $(ed.target)).focus();
                    
                    ($(ed.target).data('textbox') ? $(ed.target).textbox('textbox') : $(ed.target)).focus();
                }
                editIndex = index;
            } else {
                setTimeout(function(){
                    $('#dg').datagrid('selectRow', editIndex);
                },0);
            }
        }
    }
                
    function onEndEdit(index, row){
        //
        var mpName = $(this).datagrid('getEditor', {
            index: index,
            field: 'MP_NAME'
        });
        row.MP_NAME = $(mpName.target).textbox('getText');
        //
        var collAddr = $(this).datagrid('getEditor', {
            index: index,
            field: 'COLL_ADDR'
        });
        row.COLL_ADDR = $(collAddr.target).numberbox('getValue');
        //
        var rationum = $(this).datagrid('getEditor', {
            index: index,
            field: 'RATIONUM'
        });
        row.RATIONUM = $(rationum.target).numberbox('getValue');
        //基数	
        var baseValue = $(this).datagrid('getEditor', {
            index: index,
            field: 'BASE_VALUE'
        });
        row.BASE_VALUE = $(baseValue.target).numberbox('getValue');
        //告警等级
        var waringLevel = $(this).datagrid('getEditor', {
            index: index,
            field: 'id'
        });
        row.text = $(waringLevel.target).combobox('getText');
        //告警策略
        var warningWay = $(this).datagrid('getEditor', {
            index: index,
            field: 'warningWayId'
        });
        row.warningWayText = $(warningWay.target).combobox('getText');
        //
        var flagName = $(this).datagrid('getEditor', {
            index: index,
            field: 'VALID_FLAG'
        });
        row.flagName = $(flagName.target).combobox('getText');
        //
        var normalUp = $(this).datagrid('getEditor', {
            index: index,
            field: 'NORMAL_UP'
        });
        row.NORMAL_UP = $(normalUp.target).numberbox('getValue');
        //
        var normalDown = $(this).datagrid('getEditor', {
            index: index,
            field: 'NORMAL_DOWN'
        });
        row.NORMAL_DOWN = $(normalDown.target).numberbox('getValue');
        //
        var waringUp = $(this).datagrid('getEditor', {
            index: index,
            field: 'WARING_UP'
        });
        row.WARING_UP = $(waringUp.target).numberbox('getValue');
        //
        var waringDown = $(this).datagrid('getEditor', {
            index: index,
            field: 'WARING_DOWN'
        });
        row.WARING_DOWN = $(waringDown.target).numberbox('getValue');
        
    }
</script>
