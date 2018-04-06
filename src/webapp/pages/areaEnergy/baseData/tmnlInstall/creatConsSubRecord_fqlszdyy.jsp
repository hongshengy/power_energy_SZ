<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="com.frontier.framework.util.DatabaseUtil"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	SimpleDateFormat fmt = new SimpleDateFormat("yyyy-MM-dd");
    String strDate = fmt.format(DatabaseUtil.getSysDate());
%>

<html>
	<head>
		<title>新建客户档案</title>
		<jsp:include page="/pages/areaEnergy/common/head.jsp">
        <jsp:param name="flag" value="flag='13'" />
    </jsp:include>
		<script type="text/javascript">
	function saveData() {
        var isValid = $('#ff').form('validate');
        var roleCode = $('#role_Code_cr').val();
        
        if(!$("#voltCode").combobox('getValue')){
           $.messager.alert('提示', "电压等级不能为空！", 'warning');
		   return;
        }
        if(!$('#endDate').datebox('getValue')){
           $.messager.alert('提示', "服务结束时间不能为空！", 'warning');
		   return;
        }
        if(!$('#TRADE_CODE').combotree('getValue')){
           $.messager.alert('提示', "行业分类不能为空！", 'warning');
		   return;
        }
        if (isValid){
    		$.messager.confirm('确认','您确认想要保存记录吗？',function(r) {
				if (r) {
					if($('#consNo').val() == '无户号'){
		           		var url = des.webContextRoot+"line/queryConsId.action";
		                $.ajax({
		                    url : url,
		                    type: "post",
		                    data : {"areaNo":$("#areaNo").val()},
		                    dataType:"json",
		                    timeout:60000, 
		                    error : function (XMLHttpRequest, textStatus, errorThrown) {
		               	 	     alert('程序异常');
		                    },
		                    success : function(result) {
		                         if(result.flag=='1'){
		                        	$("#consNo").textbox('setValue',result.consId);
		                        	var remarkHtml = $("#remark").textbox('getValue');
		                        	$("#remark").textbox('setValue',remarkHtml+" (无户号)");
		                        	$.messager.progress();
		     						$('#ff').form('submit',{
			     						url :'<%=basePath%>areaEnergyTmnl/creatConsSubRecord.action?roleCode='+roleCode,    
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
			     					        var obj = eval("["+res+"]")[0];
			                                     if(obj.flag == "alreadyExist"){
			                                         $.messager.alert('警告','客户编号已存在');
			                                     }else if (obj.flag == "wrong"){
			                                         $.messager.alert('警告','保存失败');
			                                     }else if (obj.flag == "ok"){
			                                         var consId = obj.consId;
			                                         var areaNo = $("#areaNo").val();
			                                         document.location.href='<%=basePath%>'+'pages/areaEnergy/baseData/index.jsp?roleCode='+roleCode+'&consId='+consId+'&areaNo='+areaNo;
			                                     }
			                                 }
	
			     					    }    
		     						});
		      					}
		                    }
		                });
		           	}else{
		           		$.messager.progress();
						$('#ff').form('submit',{
							url :'<%=basePath%>areaEnergyTmnl/creatConsSubRecord.action?roleCode='+roleCode,    
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
						        var obj = eval("["+res+"]")[0];
	                                if(obj.flag == "alreadyExist"){
	                                    $.messager.alert('警告','客户编号已存在');
	                                }else if (obj.flag == "wrong"){
	                                    $.messager.alert('警告','保存失败');
	                                }else if (obj.flag == "ok"){
	                                    var consId = obj.consId;
	                                    var areaNo = $("#areaNo").val();
	                                    document.location.href='<%=basePath%>'+'pages/areaEnergy/baseData/index.jsp?roleCode='+roleCode+'&consId='+consId+'&areaNo='+areaNo;
	                                }
	                            }
						    }    
						});
		           	}
	   		 	}    
			});
		} 
	}
	
	function openIndex(consId){
	   var url = '<%=basePath%>'+'pages/areaEnergy/baseData/index.jsp?consId='+consId;
       OpenWin1(encodeURI(url),'查看采集档案页面2','800','800');
	}
</script>

	</head>

	<body srolling='no'>
		<input type="hidden" id="role_Code_cr" value="${param.roleCode}">
		<div id='queryDiv' class="container-shadow container-marginTop"
			style="width: 100%;">
			<div class="easyui-panel" title="客户信息输入"
				style="width: 100%; padding: 5px 10px;">
				<form id="ff" method="post"
					style="border: 0; width: 100%; height: 100%;">
					<input type="hidden" id="areaNo" name="queryPara.areaNo" value="">
					<input type="hidden" id="org_no" name="queryPara.orgNo" value="">
					<input type="hidden" id="USER_CODE" name="queryPara.USER_CODE" value="4">
					<table class="form-table" style="width: 100%; height: 100%;">
						<tbody valign="top">
							<tr>
								<td>
									<table width="100%" cellspacing="8px" cellpadding="0"
                                        border="0">
										<tbody>
											<tr>
												<td class="td-label" align="right" nowrap="nowrap">
													客户编号
												</td>
												<td width="30%">
													<input id="consNo" name="queryPara.consNo" maxLength=12
														size="27" class="easyui-textbox" 
														data-options="validType:'length[1,12]',required:true,missingMessage:'请输入客户编号'">
													<font style="color: red;">*如无户号，请填写"无户号"</font>
												</td>
												<td class="td-label" align="right" nowrap="nowrap">
													电力营销户名
												</td>
												<td width="25%">
													<input id="areaConsName" name="queryPara.areaConsName" size="27"
														class="easyui-textbox"
														data-options="validType:'length[1,128]',required:true,missingMessage:'请输入电力营销户名'">
													<font style="color: red;">*</font>
												</td>
												<td class="td-label" align="right">
						                            <label>供电公司</label>
						                        </td>
						                        <td class="td-value">
						                           	<input id="orgNo_cons" class="easyui-combotree" data-options="required:true,missingMessage:'请选择供电公司'" style="width:195px;" />  
						                        	<font style="color: red;">*</font>
						                        </td>
											</tr>
											<tr>
												<td class="td-label" align="right" nowrap="nowrap">
													合同容量
												</td>
												<td width="25%">
													<input id="contractCap" name="queryPara.contractCap"
														size="27" class="easyui-numberbox"
														data-options="validType:'length[1,10]',required:true,missingMessage:'请输入合同容量'">
													<font>kVA</font>
													<font style="color: red;">*</font>
												</td>
												<td class="td-label" align="right" nowrap="nowrap">
													企业客户名称
												</td>
												<td width="25%">
													<input id="consName" name="queryPara.consName" size="27"
														class="easyui-textbox"
														data-options="validType:'length[1,128]',required:true,missingMessage:'请输入客户名称'">
													<font style="color: red;">*</font>
												</td>
												<td class="td-label" align="right" nowrap="nowrap">
													客户状态
												</td>
												<td colspan="3" width="25%">
													<table>
														<tr>
															<td>
																<select id="statusCode" class="easyui-combobox"
																	name="queryPara.statusCode" data-options="width:191,panelHeight:'auto',editable:false">
																	<option value="1" selected>正常客户</option>
																	<option value="2">已销户</option>
																</select>
																<font style="color: red;">*</font>
															</td>
														</tr>
													</table>
												</td>
											</tr>
											<tr>
												<td class="td-label" align="right" nowrap="nowrap">
													客户类型
												</td>
												<td colspan="1" width="25%">
													<select id="userType1" class="easyui-combobox" data-options="width:191,panelHeight:'auto',editable:false"
														disabled="true" name="queryPara.userType1">
														<option value="1" selected>电力客户</option>
														<option value="2">子客户</option>
													</select>
													<input type="hidden" name="queryPara.userType"
														value="1">
													<font style="color: red;">*</font>
												</td>
												<td class="td-label" align="right" nowrap="nowrap">
													电压等级
												</td>
												<td width="25%">
													<input id="voltCode" name="queryPara.voltCode" value=""
														size="27" validType="comboxValidate['请选择电压等级']">
													<font style="color: red;">*</font>
												</td>
												<td class="td-label" align="right" nowrap="nowrap">
													用电地址
												</td>
												<td width="25%">
													<input id="elecAddr" name="queryPara.elecAddr" size="27"
														class="easyui-textbox"
														data-options="validType:'length[1,128]',required:true,missingMessage:'请输入客户地址'">
													<font style="color: red;">*</font>
												</td>
											</tr>
											<tr>
												<td class="td-label" align="right" nowrap="nowrap">
													服务开始时间
												</td>
												<td width="25%">
													<input class="easyui-datebox" size="27" id="startDate" value="<%=strDate%>"
														name="queryPara.startDate"editable='false'
														data-options="required:true,missingMessage:'请选择服务开始时间'">
													<font style="color: red;">*</font>
												</td>
												<td class="td-label" align="right" nowrap="nowrap">
													服务结束时间
												</td>
												<td width="25%">
													<input class="easyui-datebox" size="27" id="endDate"
														name="queryPara.endDate"editable='false'
														data-options="required:true,missingMessage:'请选择服务结束时间'">
													<font style="color: red;">*</font>
												</td>
												<td class="td-label" align="right" nowrap="nowrap">
													安装时间
												</td>
												<td colspan="3" width="25%">
													<input class="easyui-datebox" size="27" id="stopDate" value="<%=strDate%>"
														name="queryPara.stopDate"editable='false'
														data-options="required:true,missingMessage:'请选择安装时间'">
													<font style="color: red;">*</font>
												</td>
											</tr>
											<tr>
												<td class="td-label" align="right" nowrap="nowrap">
													经度
												</td>
												<td width="25%">
													<input id="x" name="queryPara.x" size="27" 
														class="easyui-numberbox" data-options="validType:'length[0,18]',missingMessage:'请输入经度',required:true,precision:14">
													<font style="color: red;">*</font>
												</td>
												<td class="td-label" align="right" nowrap="nowrap">
													纬度
												</td>
												<td width="25%">
													<input id="y" name="queryPara.y" size="27"
														class="easyui-numberbox" data-options="validType:'length[0,18]',missingMessage:'请输入纬度',required:true,precision:14">
													<font style="color: red;">*</font>
												</td>
												<td class="td-label" align="right" nowrap="nowrap">
													考核功率因数
												</td>
												<td width="25%">
													<input id="USER_CHECK_COS" name="queryPara.USER_CHECK_COS" size="27" value='0.9'
														class="easyui-numberbox" data-options="validType:'length[0,10]',missingMessage:'请输入考核功率因数',required:true,precision:4">
													<font style="color: red;">*</font>
												</td>
											</tr>
											<tr>
												<td class="td-label" align="right" nowrap="nowrap">
													预防性试验日期
												</td>
												<td width="25%">
													<input class="easyui-datebox" size="27" id="P_TEST_DATE" value="<%=strDate%>"
														name="queryPara.P_TEST_DATE"editable='false'
														data-options="required:true,missingMessage:'请选择预防性试验日期'">
													<font style="color: red;">*</font>
												</td>
												<td class="td-label" align="right" nowrap="nowrap">
													行业分类
												</td>
												<td width="25%">
													<input id="TRADE_CODE" name="queryPara.TRADE_CODE" value=""
														size="27" data-options="required:true,missingMessage:'请选择行业分类'">
													<font style="color: red;">*</font>
												</td>
						                        <td class="td-label" align="right" nowrap="nowrap">	
													通道
												</td>
												<td width="25%">
													<input id="aisle" name="queryPara.aisle" value="" style="width:192px;"
														size="27" class="easyui-numberbox" data-options="validType:'length[0,4]',required:true,missingMessage:'请输通道信息'">
													<font style="color: red;">*</font>
												</td>
												<td class="td-fillwidth"></td>
											</tr>
											<tr>
												<td colspan="6">
													<fieldset
														style="padding: 5px 5px 5px 5px; background-color: #fff;">
														<legend>
															<font style="font-size: 12px; font-weight: bold;">联系信息</font>
														</legend>
														<table width="100%" cellspacing="8px" cellpadding="0"
															border="0">
															<tr>
																<td class="td-label" align="center">
																	联系人
																</td>
																<td>
																	<input id="contactName" name="queryPara.contactName"
																		size="27" class="easyui-textbox"
																		data-options="validType:'length[1,32]',required:true,missingMessage:'请输入联系人'">
																	<font style="color: red;">*</font>
																</td>
																<td class="td-label" align="center">
																	联系电话
																</td>
																<td>
																	<input id="telephone" name="queryPara.telephone"
																		size="27" class="easyui-numberbox"
																		data-options="max:999999999999,validType:'length[1,32]',prompt:'请输入电话号码',missingMessage:'请输入电话号码', required:true">
																	<font style="color: red;">*</font>
																</td>
															</tr>
															<tr>
																<td class="td-label" align="center">
																	联系人1
																</td>
																<td>
																	<input id="contactName1" name="queryPara.contactName1"
																		size="27" class="easyui-textbox"
																		data-options="validType:'length[1,32]',required:false,missingMessage:'请输入联系人'"">
																</td>
																<td class="td-label" align="center">
																	联系电话1
																</td>
																<td>
																	<input id="telephone1" name="queryPara.telephone1"
																		size="27" class="easyui-numberbox"
																		data-options="max:999999999999,validType:'length[1,32]',prompt:'请输入电话号码', required:false">
																</td>
															</tr>
															<tr>
																<td class="td-label" align="center">
																	联系人2
																</td>
																<td>
																	<input id="contactName2" name="queryPara.contactName2"
																		size="27" class="easyui-textbox"
																		data-options="validType:'length[1,32]',required:false,missingMessage:'请输入联系人'"">
																</td>
																<td class="td-label" align="center">
																	联系电话2
																</td>
																<td>
																	<input id="telephone2" name="queryPara.telephone2"
																		size="27" class="easyui-numberbox"
																		data-options="max:999999999999,validType:'length[1,32]',prompt:'请输入电话号码', required:false">
																</td>
															</tr>
															<tr>
																<td class="td-label" align="center">
																	联系人3
																</td>
																<td>
																	<input id="contactName3" name="queryPara.contactName3"
																		size="27" class="easyui-textbox"
																		data-options="validType:'length[1,32]',required:false,missingMessage:'请输入联系人'"">
																</td>
																<td class="td-label" align="center">
																	联系电话3
																</td>
																<td>
																	<input id="telephone3" name="queryPara.telephone3"
																		size="27" class="easyui-numberbox"
																		data-options="max:999999999999,validType:'length[1,32]',prompt:'请输入电话号码', required:false">
																</td>
															</tr>
															<tr>
																<td class="td-label" align="center">
																	联系人4
																</td>
																<td>
																	<input id="contactName4" name="queryPara.contactName4"
																		size="27" class="easyui-textbox"
																		data-options="validType:'length[1,32]',required:false,missingMessage:'请输入联系人'"">
																</td>
																<td class="td-label" align="center">
																	联系电话4
																</td>
																<td>
																	<input id="telephone4" name="queryPara.telephone4"
																		size="27" class="easyui-numberbox"
																		data-options="max:999999999999,validType:'length[1,32]',prompt:'请输入电话号码', required:false">
																</td>
															</tr>
															<tr>
																<td class="td-label" align="center">
																	联系人5
																</td>
																<td>
																	<input id="contactName5" name="queryPara.contactName5"
																		size="27" class="easyui-textbox"
																		data-options="validType:'length[1,32]',required:false,missingMessage:'请输入联系人'">
																</td>
																<td class="td-label" align="center">
																	联系电话5
																</td>
																<td>
																	<input id="telephone5" name="queryPara.telephone5"
																		size="27" class="easyui-numberbox"
																		data-options="max:999999999999,validType:'length[1,32]',prompt:'请输入电话号码', required:false">
																</td>
															</tr>
														</table>
													</fieldset>
												</td>
											</tr>
											<tr>
												<td class="td-label" align="center">
													备注
												</td>
												<td colspan="5">
													<input class="easyui-textbox" multiline="true" id="remark"
														name="queryPara.remark" value="" data-options="validType:'length[1,128]'"
														style="width: 100%; height: 120px">
												</td>
											</tr>
										</tbody>
									</table>
									<!-- 底部按钮区开始  -->
									<div align="center">
										<a id="btn" class="easyui-linkbutton c1"
											style="width: 80px; height: 24px;" onclick="saveData()">下一步</a>
									</div>
									<!-- 底部按钮区结束  -->
								</td>
							</tr>
						</tbody>
					</table>
				</form>
			</div>
		</div>
	</body>
</html>
<script type="text/javascript">
    $( function() {
        $('#voltCode').combobox({
            url :'<%=basePath%>areaEnergyTmnl/getVoltCode.action',
            //url: '<%=basePath%>pages/despages/jquery-easyui-1.5.1/demo/combobox/combobox_data1.json',
            editable:false,//不可编辑状态
          //method: 'get',
          //data:[{"id":,"text":"请选择"},{"id":1,"text":"220kV"},{"id":2,"text":"110kV"},{"id":3,"text":"35kV"},{"id":4,"text":"20kV"},{"id":5,"text":"10kV"}],
          valueField:'id',
          textField:'text'
        });
        
        $('#TRADE_CODE').combotree({
			url :'<%=basePath%>areaEnergy/tradeCombox.action',
			onLoadSuccess : function(node,data){
			    $(this).tree('collapseAll');
			}
    	});
       
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
        
        $('#remark').textbox({
            inputEvents:$.extend({},$.fn.textbox.defaults.inputEvents,{
                keyup:function(event){
                    if(event.keyCode == 13){
                        var remark = $('#remark').textbox('getValue')+'\n';
                        $('#remark').textbox('setValue',remark);
                    }
                }
            })
        });
	});
	
    $('#voltCode').combobox({
    	onChange : function() {
           $('#voltCode').combobox('validate');
       	}
    });
    
    $('#orgNo_cons').combotree({
		onChange : function(){
		    var orgNo = $('#orgNo_cons').combotree('getValues');
			$("#org_no").val(orgNo);
		}
   	});
    
    //根据输入客户编号查询供电单位
    $(function() { 
    	$("#areaNo").val("991");
    	queryAllPowerCompany();
    	
    	$("#consNo").parent().find("span input:eq(0)").blur(function(){
    		var consNo = $("#consNo").val();
	    	queryPowerCompanyByConsNo(consNo);
    	});
    });
    
    function queryAllPowerCompany() {
    	$('#orgNo_cons').combotree({
			url :'<%=basePath%>capacityData/queryPowerCompany.action?queryPara.orgId=32101&queryPara.parentId=0',
			onLoadSuccess : function(node, data){
			}
   		});
    }
    
    function queryPowerCompanyByConsNo(consNo) {
    	$("#org_no").val("");
    	$.ajax({
			type: "post",
			url: "<%=basePath%>" + 'capacityData/queryPowerCompanyByConsNo.action',
			data: "queryPara.consNo=" + consNo,
			dataType:"json",
			success: function(data) {
				if (data.rows.length > 0) {
					var id = data.rows[0].id;
					var text = data.rows[0].text;
				    $('#orgNo_cons').combotree('setValues',[{id: id, text: text}]);
					$("#org_no").val(id);
				} 
			}
		});
    }
    
</script>

