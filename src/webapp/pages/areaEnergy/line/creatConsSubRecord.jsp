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
    
    <title>新建建筑档案</title>
    <meta charset="UTF-8">
    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expires" content="0">    
    <meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
    <meta http-equiv="description" content="This is my page">
    <jsp:include page="/pages/areaEnergy/common/head.jsp"></jsp:include>

		<script type="text/javascript">
		function cancel(){
		window.close();
		}
		
		function saveData() {
		var consNo = $("#consNo").val();
		var consName = $("#cosnName").val();

		$.messager.confirm('确认','您确认想要保存记录吗？',function(r) {
							if (r) {
								$.messager.progress();
								$('#ff').form('submit',{
								url :des.webContextRoot+"line/creatConsSubRecord.action",    
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
							        var obj = eval("["+res+"]")[0];
		                                if(obj.flag == "alreadyExist"){
		                                    $.messager.alert('警告','客户编号已存在');
		                                }else if (obj.flag == "wrong"){
		                                    $.messager.alert('警告','保存失败');
		                                }else if (obj.flag == "ok"){
		                                    //$.messager.alert('警告','保存成功');
		                                   	window.close();
											//window.opener.refreshPage();
											parent.com.frontier.areaEnergy.baseData.reloadTree.flushAndClickCurrentNode();
		                                }
	                                }
    
							    }    
							}); 
				    }    
				}); 
	}
</script>
	</head>
	<body>
		<form id="ff" method="post" style="border: 0; width: 100%; height: 100%;">
			<input type='hidden' id='lineId' name='queryPara.lineId' value="${param.lineId }">
			<div class="easyui-panel" title="客户信息输入" style="width:100%;padding:30px 10px;">
				<table class="easyui-panel" cellspacing="8px" cellpadding="0" border="0">
					<tbody>
						<tr>
							<td class="td-label"  align="right">
								客户编号：
							</td>
							<td width="18%">
								<input id="consNo" type="text" name="queryPara.consNo"
									size = '27' class="easyui-validatebox"
									data-options="required:true,missingMessage:'请输入客户编号'">
							</td>
							<td class="td-label"  align="right">
								客户名称:
							</td>
							<td width="18%">
								<input id="consName" type="text" name="queryPara.consName"
									size = '27' class="easyui-validatebox"
									data-options="required:true,missingMessage:'请输入客户名称'">
							</td>
							<td class="td-fillwidth"></td>
							<td class="td-label"  align="right">
								服务中心:
							</td>
							<td width="18%" colspan="3">
								<input id="areaNo" name="queryPara.areaNo" value="" size= '27' data-options="required:true,missingMessage:'请输入服务中心'">
							</td>
						</tr>
						<tr>
							<td class="td-label"  align="right">
								合同容量:
							</td>
							<td width="18%">
								<input id="contractCap" type="text"
									name="queryPara.contractCap" size = '27'
									class="easyui-validatebox"
									data-options="required:true,missingMessage:'请输入合同容量'"">
							</td>
							<td class="td-label"  align="right">
								电压等级:
							</td>
							<td width="18%">
								<input id="voltCode" name="queryPara.voltCode" value="" size="27"> 
							</td>
							<td class="td-fillwidth"></td>
							<td class="td-label"  align="right">
								客户状态:
							</td>
							<td width="18%" colspan="3">
								<select class="easyui-combobox" id="statusCode"  name="queryPara.statusCode" data-options="width:210,prompt:'==请选择==',panelHeight:'100'">
									<option value="1" selected>正常客户</option>
									<option value="2">已销户</option>
								</select>
							</td>
						</tr>
						<tr>
							<td class="td-label"  align="right">
								联系人:
							</td>
							<td width="18%">
								<input id="contactName" type="text"
									name="queryPara.contactName" size="27"
									class="easyui-validatebox" data-options="required:true,missingMessage:'请输入联系人'"">
							</td>
							<td class="td-label"  align="right">
								联系电话:
							</td>
							<td width="18%">
								<input id="telephone" type="text" name="queryPara.telephone"
									size="27" class="easyui-validatebox"
									data-options="prompt:'Enter your phone number', required:true">
							</td>
							<td class="td-fillwidth"></td>
							<td class="td-label"  align="right">
								客户类型:
							</td>
							<td width="18%" colspan="3">
								<select class="easyui-combobox" id="userType"  name="queryPara.userType" data-options="width:210,prompt:'==请选择==',panelHeight:'100'">
									<option value="2" selected>子客户</option>
                              	</select>
							</td>
						</tr>
						<tr>
							<td class="td-label"  align="right">
								施工开始时间:
							</td>
							<td width="18%">
								<input class="easyui-datebox" size="27" id="startDate" name="queryPara.startDate">
							</td>
							<td class="td-label"  align="right">
								施工结束时间:
							</td>
							<td width="18%">
								<input class="easyui-datebox" size="27" id="endDate" name="queryPara.endDate">
							</td>
							<td class="td-fillwidth"></td>
							<td class="td-label"  align="right">
								停工停电时间:
							</td>
							<td width="18%" colspan="3">
								<input class="easyui-datebox" size="27" id="stopDate" name="queryPara.stopDate">
							</td>
						</tr>
						<tr>
							<td class="td-label"  align="right">
								经度:
							</td>
							<td width="8%">
								<input id="x" type="text" name="queryPara.x"
									size="27" class="easyui-validatebox"
									data-options="required:false">
							</td>
							<td class="td-label"  align="right">
								纬度
							</td>
							<td width="8%">
								<input id="y" type="text" name="queryPara.y"
									size="27" class="easyui-validatebox"
									data-options="required:false">
							</td>
							<td class="td-fillwidth"></td>
							<td class="td-label"  align="right">
								供电单位:
							</td>
							<td width="18%" colspan="3">
								<input id="orgNo" name="queryPara.orgNo" value="" size = '27'>
							</td>
						</tr>
						<tr>
						<td class="td-label"  align="right">
								客户地址:
							</td>
							<td width="15%" colspan="5">
								<input id="elecAddr" type="text" name="queryPara.elecAddr"
									size="27" class="easyui-validatebox"
									data-options="required:false">
							</td>
						</tr>
						<tr>
							
							<td class="td-label"  align="right">
								备注:
							</td>
							<td colspan="3" width="52%">
								<input class="easyui-textbox" multiline="true" id="remark"
									name="queryPara.remark"
									value=""
									size="27">
							</td>
						</tr>
						
					</tbody>
				</table>	
			<!-- 底部按钮区开始  -->
			<div align="center">
				<a id="btn" class="easyui-linkbutton c1" style="width: 80px; height: 24px;" onclick="saveData()">完成</a>
				<button class="easyui-linkbutton c1" onclick="cancel()" style="width:70px;">取消</button>
			</div>
		<!-- 底部按钮区结束  -->
			</div>
		</form>
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
        
        $('#areaNo').combobox({
            url :'<%=basePath%>areaEnergy/loadAreaList.action',  
            editable:false,//不可编辑状态
	        valueField:'ID',    
	        textField:'TEXT'   
        });
        
    });
    $('#areaNo').combobox({
                onChange : function(){
                    var areaNo = $("#areaNo").combobox('getValue');
                    if(areaNo != ""){
                        $('#orgNo').combobox({
				            url :'<%=basePath%>areaEnergyTmnl/loadOrgNoList.action?areaNo='+areaNo,  
				            editable:false,//不可编辑状态
				            valueField:'id',
                            textField:'text'   
				        });
                    }
                    
                }
            });
</script>

