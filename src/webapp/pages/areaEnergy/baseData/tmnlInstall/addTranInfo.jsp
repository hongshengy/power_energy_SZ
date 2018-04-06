<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<html>
  <head>

		<title>新增变压器信息</title>
		<base href="<%=basePath%>">
		<jsp:include page="/pages/areaEnergy/common/head.jsp"></jsp:include>
		<script type="text/javascript">
	function saveData() {
	    var isValid = $('#ff').form('validate');
        if (isValid){
			$.messager.confirm('确认','您确认想要保存记录吗？',function(r) {
								if (r) {
									$.messager.progress();
									$('#ff').form('submit',{
									url :'<%=basePath%>areaEnergyTmnl/addTranInfo.action',    
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
			                                if(res == "nofound"){
			                                    $.messager.alert('警告','当前建筑下面没有填写的终端！');
			                                }else if (res == "wrong"){
			                                    $.messager.alert('警告','保存失败');
			                                }else if (res == "had"){
	                                            $.messager.alert('警告','输入的变压器编号已经存在！');
	                                        }else if (res == "hadName"){
	                                            $.messager.alert('警告','输入的变压器名称已经存在！');
	                                        }else if (res == "ok"){
			                                    //$.messager.alert('警告','保存成功');
			                                    //window.opener.refreshData();
			                                    window.close();
			                                    opener.parent.com.frontier.areaEnergy.baseData.reloadTree.flushAndClickCurrentNode();
			                                }
		                                }
	    
								    }    
								}); 
					    }    
					}); 
				}
	}
	//取消按钮
	function removeit(){
	   window.close();
	}
	function chooseTmnl(){
	    var url = "<%=basePath%>/pages/areaEnergy/line/tmnlMessageList.jsp?subId=${param.subsID}";
	    //pages/areaEnergy/baseData/tmnlInstall/tmnlMessageListForTran.jsp
	    ///pages/areaEnergy/line/tmnlMessageList.jsp
        OpenWin(encodeURI(url),"终端配置列表",900,300);
	}
</script>

	</head>

	<body>
		<form id="ff" method="post" style="border: 0; width: 100%; height: 100%;">
			<div class="easyui-panel" title="新增变压器信息" id="pfgd-panel"
				style="border: 0; width: 100%; height: 100%; overflow: auto; background: #fafafa;">
				<table class="form-table" style="width: 100%; height: 100%;">
					<tbody valign="center">
						<tr>
							<td>
								<table width="100%" cellspacing="8px" cellpadding="0"
                                        border="0">
									<tbody>
										<tr>
											<td class="td-label" align="center" nowrap="nowrap">
												变压器名称
											</td>
											<td width="25%">
												<input id="tranName" name="queryPara.tranName"
													size="27"  class="easyui-textbox"
													data-options="validType:'length[1,32]',required:true,missingMessage:'请输入主变名称'">
												<font style="color: red;">*</font>
											</td>
											<td class="td-label" align="center" nowrap="nowrap">
												电压等级
											</td>
											<td width="25%">
                                                <input id="voltCode" name="queryPara.voltCode" value=""
                                                    size="27" validType="comboxValidate['voltCode','请选择电压等级']">
                                                <font style="color: red;">*</font>
                                            </td>
											<td class="td-label" align="center" nowrap="nowrap">
												所属终端
											</td>
											<td width="25%">
												<table>
													<tr>
														<td>
															<input id="terminalId" type="text" style="width: 180px"
																name="queryPara.terminalId" size="17" editable='false'
																class="easyui-textbox"
																data-options="required:true,missingMessage:'请输入所属终端'">
															<input type="hidden" id="tmnlAssetNo"
																name="queryPara.tmnlAssetNo" />
															<a onclick="javascript:chooseTmnl()"
																style="cursor: pointer"><img
																	src="<%=basePath%>images/query.gif"> </a>
															<font style="color: red;">*</font>
														</td>
													</tr>
												</table>
											</td>
										</tr>
										<tr>
											<td class="td-label" align="center" nowrap="nowrap">
												铭牌容量
											</td>
											<td width="25%">
												<input id="plateCap"
													name="queryPara.plateCap" size="23" 
													class="easyui-numberbox"
													data-options="validType:'length[1,16]',required:true,missingMessage:'请输入铭牌容量'">
												<font>kVA</font>
												<font style="color: red;">*</font>
											</td>
											<td class="td-label" align="center" nowrap="nowrap">
												是否有效
											</td>
											<td width="25%">
												<select class="easyui-combobox" id="validFlag" name="queryPara.validFlag" value = "1"
													data-options="width:205,panelHeight:'auto',editable:false">
													<option value="1">有效</option>
													<option value="0">无效</option>
												</select>
												<font style="color: red;">*</font>
											</td>
											<td class="td-label"  align="center" nowrap="nowrap">
												显示序号
											</td>
											<td>
												<input class="easyui-textbox" value="${param.dataTotal }"
													size="27" id="showIndex" name="queryPara.showIndex"
													data-options="validType:'length[1,5]',required:true,missingMessage:'请输入线路显示序号'">
												<font style="color: red;">*</font>
											</td>
										</tr>
										<tr>
											<td class="td-label" align="center" nowrap="nowrap">
												生产厂家名称
											</td>
											<td width="25%">
												<input id="factoryName" name="queryPara.factoryName" value=""size="27" >
											</td>
											<td class="td-label" align="center" nowrap="nowrap">
												投运日期
											</td>
											<td width="25%">
												<input class="easyui-datebox" size="27" editable='false'
													id="createDate" name="queryPara.createDate">
											</td>
											<td class="td-label" align="center" nowrap="nowrap">
												出厂日期
											</td>
											<td colspan="3" width="25%">
												<input class="easyui-datebox" size="27" editable='false'
													id="madeDate" name="queryPara.madeDate">
											</td>
										</tr>
										<tr>
											<td class="td-label" align="center" nowrap="nowrap">
												变压器型号
											</td>
											<td width="25%">
												<input id="tranKind" name="queryPara.tranKind" value=""
													size="27">
											</td>
											<td class="td-label" align="center" nowrap="nowrap">
												运行状态
											</td>
											<td width="25%">
												<input id="runStatus" name="queryPara.runStatus" size="27"
													value="1">
											</td>
											<td class="td-label" align="center" nowrap="nowrap">
												变压器编号
											</td>
											<td width="25%">
                                                <input id="tranNo" name="queryPara.tranNo" maxLength=12
                                                    size="27" class="easyui-textbox"
                                                    data-options="validType:'length[1,16]',required:false,missingMessage:'请输入变压器编号'">
                                                <input type="hidden" name="queryPara.subsId"
                                                    value="${param.subsID}">
                                                <input type="hidden" name="queryPara.areaNo"
                                                    value="${param.areaNo}">
                                            </td>
										</tr>
										<tr>
											<td class="td-label" align="center" nowrap="nowrap">
												标准代号
											</td>
											<td width="25%">
												<input id="STANDARD_CODE" class="easyui-textbox" name="queryPara.STANDARD_CODE" value=""
													size="27" data-options="validType:'length[1,32]',required:false">
											</td>
											<td class="td-label" align="center" nowrap="nowrap">
												出厂序（编）号
											</td>
											<td width="25%">
												<input id="OUT_FACTORY_SEQ" class="easyui-textbox" name="queryPara.OUT_FACTORY_SEQ" size="27"
													value="" data-options="validType:'length[1,32]',required:false">
											</td>
											<td class="td-label" align="center" nowrap="nowrap">
												制造年月（生产日期）
											</td>
											<td colspan="3" width="25%">
												<input class="easyui-datebox" size="27" editable='false'
													id="MANUFACT_DATE" name="queryPara.MANUFACT_DATE">
											</td>
										</tr>
										<tr>
											<td class="td-label" align="center" nowrap="nowrap">
												相数
											</td>
											<td width="25%">
												<input id="EACH_NO" class="easyui-numberbox" name="queryPara.EACH_NO" value=""
													size="27" data-options="validType:'length[1,16]',required:false">
											</td>
											<td class="td-label" align="center" nowrap="nowrap">
												重量
											</td>
											<td width="25%">
												<input id="WEIGHT" class="easyui-numberbox" name="queryPara.WEIGHT" value=""
													size="24" data-options="validType:'length[1,16]',required:false,precision:2">
												<font>kg</font>
											</td>
											<td class="td-label" align="center" nowrap="nowrap">
												绝缘油重量
											</td>
											<td width="25%">
												<input id="INSULATE_WEGHT" class="easyui-numberbox" name="queryPara.INSULATE_WEGHT" value=""
													size="24" data-options="validType:'length[1,16]',required:false,precision:2">
												<font>kg</font>
											</td>
										</tr>
										<tr>
											<td class="td-label" align="center" nowrap="nowrap">
												联结组标号
											</td>
											<td width="25%">
												<input id="UNION_LABEL" class="easyui-textbox" name="queryPara.UNION_LABEL" value=""
													size="27" data-options="validType:'length[1,32]',required:false">
											</td>
											<td class="td-label" align="center" nowrap="nowrap">
												冷却方式
											</td>
											<td width="25%">
												<input id="COOL_WAY" name="queryPara.COOL_WAY" size="27"
													value="">
											</td>
											<td class="td-label" align="center" nowrap="nowrap">
												额定容量
											</td>
											<td width="25%">
												<input id="STANDARD_CAP" class="easyui-numberbox" name="queryPara.STANDARD_CAP" value=""
													size="23" data-options="validType:'length[1,16]',required:false,precision:4">
												<font>kVA</font>
											</td>
										</tr>
										<tr>
											<td class="td-label" align="center" nowrap="nowrap">
												短路阻抗实测值
											</td>
											<td width="25%">
												<input id="IMPEDANCE_VALUE" class="easyui-numberbox" name="queryPara.IMPEDANCE_VALUE" value=""
													size="24" data-options="validType:'length[1,16]',required:false,precision:4">
												<font>%</font>
											</td>
											<td class="td-label" align="center" nowrap="nowrap">
												高压额定电压
											</td>
											<td width="25%">
												<input id="STANDARD_VOLT_H" class="easyui-numberbox" name="queryPara.STANDARD_VOLT_H" value=""
													size="27" data-options="validType:'length[1,16]',required:false,precision:4">
											</td>
											<td class="td-label" align="center" nowrap="nowrap">
												低压额定电压
											</td>
											<td width="25%">
												<input id="STANDARD_VOLT_L" class="easyui-numberbox" name="queryPara.STANDARD_VOLT_L" value=""
													size="27" data-options="validType:'length[1,16]',required:false,precision:4">
											</td>
										</tr>
										<tr>
											<td class="td-label" align="center" nowrap="nowrap">
												高压额定电流
											</td>
											<td width="25%">
												<input id="STANDARD_CURRENT_H" class="easyui-numberbox" name="queryPara.STANDARD_CURRENT_H" value=""
													size="27" data-options="validType:'length[1,16]',required:false,precision:4">
											</td>
											<td class="td-label" align="center" nowrap="nowrap">
												低压额定电流
											</td>
											<td width="25%">
												<input id="STANDARD_CURRENT_L" class="easyui-numberbox" name="queryPara.STANDARD_CURRENT_L" value=""
													size="27" data-options="validType:'length[1,16]',required:false,precision:4">
											</td>
											<td class="td-label" align="center" nowrap="nowrap">
												额定频率
											</td>
											<td width="25%">
												<input id="STANDARD_HZ" class="easyui-numberbox" name="queryPara.STANDARD_HZ" value=""
													size="23" data-options="validType:'length[1,16]',required:false,precision:2">
												<font>Hz</font>	
											</td>
										</tr>
										<tr>
											<td class="td-label" align="center" nowrap="nowrap">
												短路阻抗
											</td>
											<td width="25%">
												<input id="SHORT_IMPEDANCE" class="easyui-numberbox" name="queryPara.SHORT_IMPEDANCE" value=""
													size="24" data-options="validType:'length[1,16]',required:false,precision:2">
												<font>%</font>
											</td>
											<td class="td-label" align="center" nowrap="nowrap">
												空载损耗
											</td>
											<td width="25%">
												<input id="NO_LOAD_LOSS" class="easyui-numberbox" name="queryPara.NO_LOAD_LOSS" value=""
													size="27" data-options="validType:'length[1,16]',required:false,precision:2">
											</td>
											<td class="td-label" align="center" nowrap="nowrap">
												负载损耗
											</td>
											<td width="25%">
												<input id="FULL_LOAD_LOSS" class="easyui-numberbox" name="queryPara.FULL_LOAD_LOSS" value=""
													size="27" data-options="validType:'length[1,16]',required:false,precision:2">
											</td>
										</tr>
										<tr>
											<td class="td-label" align="center" nowrap="nowrap">
												电压分接位置
											</td>
											<td width="25%">
												<input id="ECT_VOLT_LOCAL" class="easyui-textbox" name="queryPara.ECT_VOLT_LOCAL" value=""
													size="24" data-options="validType:'length[1,64]',required:false,precision:2">
											</td>
											<td class="td-label" align="center" nowrap="nowrap">
												高压电压电压分接
											</td>
											<td width="25%">
												<input id="ECT_VOLT_HV" class="easyui-numberbox" name="queryPara.ECT_VOLT_HV" value=""
													size="27" data-options="validType:'length[1,16]',required:false,precision:4">
											</td>
											<td class="td-label" align="center" nowrap="nowrap">
												高压电压电流分接
											</td>
											<td width="25%">
												<input id="ECT_VOLT_HI" class="easyui-numberbox" name="queryPara.ECT_VOLT_HI" value=""
													size="27" data-options="validType:'length[1,16]',required:false,precision:2">
											</td>
										</tr>
										<tr>
											<td class="td-label" align="center" nowrap="nowrap">
												低压电压电压分接
											</td>
											<td width="25%">
												<input id="ECT_VOLT_LV" class="easyui-numberbox" name="queryPara.ECT_VOLT_LV" value=""
													size="27" data-options="validType:'length[1,16]',required:false,precision:4">
											</td>
											<td class="td-label" align="center" nowrap="nowrap">
												低压电压电流分接
											</td>
											<td width="25%">
												<input id="ECT_VOLT_LI" class="easyui-numberbox" name="queryPara.ECT_VOLT_LI" value=""
													size="27" data-options="validType:'length[1,16]',required:false,precision:2">
											</td>
											<td class="td-label" align="center" nowrap="nowrap">
												安装地址
											</td>
											<td  width="25%">
												<input id="instAddr" name="queryPara.instAddr"
													class="easyui-textbox" size="27"
													data-options="validType:'length[1,128]',required:false,missingMessage:'请输入'"">
											</td>
										</tr>
										<tr>
											<td class="td-label" align="center" nowrap="nowrap">
													变压器类型
											</td>
											<td width="25%">
												<input id="TRAN_TYPE" name="queryPara.TRAN_TYPE" value=""size="27" >
											</td>
										</tr>
									</tbody>
								</table>
								<!-- 底部按钮区开始  -->
								<div align="center">
									<a id="btn" class="easyui-linkbutton c1"
										style="width: 80px; height: 24px;" onclick="javascript:saveData()">保存</a>
									<a id="btn" class="easyui-linkbutton c1"
										style="width: 80px; height: 24px;" onclick="javascript:removeit()">取消</a>
								</div>
								<!-- 底部按钮区结束  -->
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</form>
	</body>
</html>
<script type="text/javascript">
    $( function() {
        //所有所属终端选择需要按，只有一个终端时给出默认终端，两个终端时无需默认，认用户选择。
        getTmnl();
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
        //生产厂家
        $('#TRAN_TYPE').combobox({
            url :'<%=basePath%>areaEnergyTmnl/getCodeNameByCode.action?codeValue=70022',
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
        $('#voltCode').combobox({
                        onChange : function() {
                            $('#voltCode').combobox('validate');
                        }
            });
            
    });
    function getTmnl(){
        $.ajax({
            url : '<%=basePath%>line/getTmnl.action',
            type: "post",
            dataType:"json",
            data : {"subsId":${param.subsID}},
            timeout:60000, 
            error : function (XMLHttpRequest, textStatus, errorThrown) {
                //去除遮罩
                $.messager.confirm("提示","保存失败");
            },
            success : function(result) {
                    if(result.flag=='1'){
                        //$('#terminalId').textbox('setValue',result.tmnlAssetNo) ;
                        //$('#terminalId').val(result.tmnlAssetNo);
                        $('#terminalId').textbox('setValue',result.tmnlAssetNo) ;
                        $('#tmnlAssetNo').attr('value',result.tmnlId) ;
                    }
              }
        });
    }
</script>

