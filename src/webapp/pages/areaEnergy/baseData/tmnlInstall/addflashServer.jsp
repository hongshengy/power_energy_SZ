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

		<title>新增视频服务器</title>
		<base href="<%=basePath%>">
		<jsp:include page="/pages/areaEnergy/common/head.jsp">
			<jsp:param name="flag" value="flag='13'" />
		</jsp:include>
		<script type="text/javascript">
	function saveData() {
	    var isValid = $('#ff').form('validate');
        if (isValid){
			$.messager.confirm('确认','您确认想要保存记录吗？',function(r) {
								if (r) {
									$.messager.progress();
									$('#ff').form('submit',{
									url :'<%=basePath%>areaEnergyTmnl/addFlashServerInfo.action',    
								    success:function(res){    
								        $.messager.progress('close');    // 如果提交成功则隐藏进度条
								        if (res != "" && res != null) {
			                                if(res == "nofound"){
			                                    $.messager.alert('警告','当前建筑下面没有填写的终端！');
			                                }else if (res == "wrong"){
			                                    $.messager.alert('警告','保存失败');
			                                }else if (res == "had"){
	                                            $.messager.alert('警告','输入的变压器编号已经存在！');
	                                        }else if (res == "ok"){
			                                    opener.parent.com.frontier.areaEnergy.baseData.reloadTree.flushAndClickCurrentNode();
			                                    window.close();
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
</script>

	</head>

	<body>
		<form id="ff" method="post" style="border: 0; width: 100%; height: 100%;">
			<div class="easyui-panel" title="视频服务器信息" id="pfgd-panel"
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
												服务器名称
											</td>
											<td width="25%">
												<input id="rvuName" name="queryPara.rvuName"
													size="27" class="easyui-textbox"
													data-options="validType:'length[1,32]',required:true,missingMessage:'请输入服务器名称'">
												<input type="hidden" name="queryPara.consId"
													value="${param.consId}">
												<input type="hidden" name="queryPara.areaNo"
													value="${param.areaNo}">
												<font style="color: red;">*</font>
											</td>
											<td class="td-label" align="center" nowrap="nowrap">
												生产厂家名称
											</td>
											<td width="25%">
												<input id="rvuMadeCompany" name="queryPara.rvuMadeCompany"
													value="" size="27"
													validType="comboxValidate['rvuMadeCompany','请选择生产厂家名称']">
												<font style="color: red;">*</font>
											</td>
											<td class="td-label" align="center" nowrap="nowrap">
												通道数量
											</td>
											<td width="25%">
                                                <input id="rvuChannel"
                                                    name="queryPara.rvuChannel" size="27" 
                                                    class="easyui-numberbox"
                                                    data-options="required:true,missingMessage:'请输入通道数量'">
                                                <font style="color: red;">*</font>
                                            </td>
										</tr>
										<tr>
											<td class="td-label" align="center" nowrap="nowrap">
												IP地址
											</td>
											<td width="25%">
												<input id="rvuIp"
													name="queryPara.rvuIp" size="27" 
													class="easyui-textbox"
													data-options="validType:'length[1,15]',required:true,missingMessage:'请输入IP地址'"">
												<font style="color: red;">*</font>
											</td>
											<td class="td-label" align="center" nowrap="nowrap">
												端口号
											</td>
											<td width="25%">
                                                <input id="rvuPort"
                                                    name="queryPara.rvuPort" size="27" 
                                                    class="easyui-numberbox"
                                                    data-options="required:true,missingMessage:'请输入端口号'"">
                                                <font style="color: red;">*</font>
                                            </td>
											<td class="td-label" align="center" nowrap="nowrap">
												通讯规约
											</td>
											<td width="25%">
                                                <input id="commProtCode" name="queryPara.commProtCode" value=""
                                                    size="27" validType="comboxValidate['commProtCode','请选择通讯规约']">
                                                <font style="color: red;">*</font>
                                            </td>
										</tr>
										<tr>
											<td class="td-label" align="center" nowrap="nowrap">
												服务器用户名
											</td>
											<td width="25%">
                                                <input id="loginName" name="queryPara.loginName"
                                                    size="27" class="easyui-textbox"
                                                    data-options="validType:'length[1,5]',required:true,missingMessage:'请输入服务器用户名'">
                                                <font style="color: red;">*</font>
                                            </td>
											<td class="td-label" align="center" nowrap="nowrap">
												服务器密码
											</td>
											<td width="25%">
                                                <input id="loginPass" name="queryPara.loginPass"
                                                    size="27" class="easyui-textbox" type="password"
                                                    data-options="validType:'length[1,50]',required:true,missingMessage:'请输入服务器密码'">
                                                <font style="color: red;">*</font>
                                            </td>
											<td class="td-label" align="center" nowrap="nowrap">
												硬盘大小
											</td>
											<td width="25%">
                                                <input id="diskCapacity"
                                                    name="queryPara.diskCapacity" size="23" 
                                                    class="easyui-numberbox"
                                                    data-options="required:false,missingMessage:'请输入铭牌容量'">
                                                <font>单位：G</font>
                                            </td>
										</tr>
										<tr>
											<td class="td-label" align="center" nowrap="nowrap">
												安装地址
											</td>
											<td colspan="3" width="25%">
												<input id="installPlace"
                                                    name="queryPara.installPlace"
                                                    class="easyui-textbox" size="75" 
                                                    data-options="validType:'length[1,64]',required:true,missingMessage:'请输入安装地址'">
												<font style="color: red;">*</font>
											</td>
										</tr>
										<tr>
											<td class="td-label" align="center">
												备注
											</td>
											<td colspan="5">
												<input class="easyui-textbox" multiline="true" id="remark"
                                                    name="queryPara.remark" value="" data-options="validType:'length[1,64]'"
                                                    style="width: 100%; height: 120px">
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
        //通讯规约
        $('#commProtCode').combobox({
            url :'<%=basePath%>areaEnergyTmnl/getCodeNameByCode.action?codeValue=70036',
            editable:false,//不可编辑状态
          valueField:'id',
          textField:'text'
        });
        //生产厂家
        $('#rvuMadeCompany').combobox({
            url :'<%=basePath%>areaEnergyTmnl/getCodeNameByCode.action?codeValue=70037',
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
        //判断变更的值
        $('#commProtCode').combobox({
                        onChange : function() {
                            $('#commProtCode').combobox('validate');
                        }
            });
         $('#rvuMadeCompany').combobox({
                        onChange : function() {
                            $('#rvuMadeCompany').combobox('validate');
                        }
            });
         
        /* $('#remark').textbox({
                inputEvents:$.extend({},$.fn.textbox.defaults.inputEvents,{
                    keyup:function(event){
                        if(event.keyCode == 13){
                            var remark = $('#remark').textbox('getValue')+'\n';
                            $('#remark').textbox('setValue',remark);
                        }
                    }
                })
            });*/
            
    });
</script>

