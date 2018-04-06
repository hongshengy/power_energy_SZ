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

		<title>建筑信息</title>
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
									url :'<%=basePath%>areaEnergyTmnl/saveSubInfo.action',    
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
			                                if(res == "alreadyInGroup"){
			                                    MessageBox("运维单位名称已存在","系统异常",MB_ERROR,MB_OK);
			                                }else if (res == "wrong"){
			                                    $.messager.alert('警告','保存失败');
			                                }else{
			                                    $.messager.alert('警告','保存成功');
			                                    var subsID = $("#subsID").val();
			                                    $('#ff').form('load','<%=basePath%>areaEnergyTmnl/getSubsInfo.action?subsID='+subsID);
			                                    parent.com.frontier.areaEnergy.baseData.reloadTree.flushAndClickCurrentNode();
			                                }
		                                }
	    
								    }    
								}); 
					    }    
					}); 
				}
                //alert(consNo);
                //var url = '<%=basePath%>'+'pages/areaEnergy/baseData/tmnlInstall/creatConsSubRecord.jsp';
		//OpenWin(encodeURI(url),'新建建筑档案',screen.availWidth-300,screen.availHeight-400);
	}
	//修改按钮
	function modifyData(){
	    $("#subsName").textbox({disabled:false});
	    //客户信息不可更改
	    //$("#consId").validatebox({disabled:false});
	    //$("#userType").combobox({disabled:false});
	    $("#voltCode").combobox({disabled:false});
	    $("#electSumFlag").combobox({disabled:false});
	    $("#subsLevel").combobox({disabled:false});
	    //$("#areaNo").combobox({disabled:false});
	    $("#contactName").textbox({disabled:false});
	    $("#telephone").textbox({disabled:false});
	    //$("#orgNo").combobox({disabled:false});
	    $("#x").textbox({disabled:false});
	    $("#y").textbox({disabled:false});
	    $("#runStatus").combobox({disabled:false});
	    $("#dispOder").combobox({disabled:false});
	    //$("#subType").combobox({disabled:false});
	    $("#remark").textbox({disabled:false});
	    
	    document.getElementById("modifyButton").style.display = 'none';
	    document.getElementById("saveButton").style.display = 'block';
	}
	//取消按钮
	function cancleAction(){
	    $("#subsName").textbox({disabled:true});
        //$("#consId").validatebox({disabled:true});
        //$("#userType").combobox({disabled:true});
        $("#voltCode").combobox({disabled:true});
        $("#electSumFlag").combobox({disabled:true});
        $("#subsLevel").combobox({disabled:true});
        //$("#areaNo").combobox({disabled:true});
        $("#contactName").textbox({disabled:true});
        $("#telephone").textbox({disabled:true});
        //$("#orgNo").combobox({disabled:true});
        $("#x").textbox({disabled:true});
        $("#y").textbox({disabled:true});
        $("#runStatus").combobox({disabled:true});
        $("#dispOder").combobox({disabled:true});
        $("#remark").textbox({disabled:true});
       // $("#subType").combobox({disabled:true});
        
        document.getElementById("modifyButton").style.display = 'block';
        document.getElementById("saveButton").style.display = 'none';
	}
</script>
<style type="text/css">
.textbox .textbox-text{
    white-space:pre-wrap;
}
</style>
	</head>

	<body  srolling='no'>
		<div class="easyui-panel" title="建筑信息" id="pfgd-panel"
			style="border: 0; width: 100%;">
			<form id="ff" method="post"
				style="border: 0; width: 100%; height: 100%;">
				<input type="hidden" id="subsID" name="queryPara.subsID"
					value="${param.subsID}" />
				<table class="form-table" style="width: 100%; height: 100%;">
					<tbody valign="top">
						<tr>
							<td>
								<table width="100%" cellspacing="8px" cellpadding="0"
                                        border="0">
									<tbody>
										<tr>
											<td class="td-label" align="center" nowrap="nowrap">
												建筑名称
											</td>
											<td>
												<input id="subsName"name="queryPara.subsName"
													size="27"class="easyui-textbox"
													value="${resultMap.SUBS_NAME}" disabled="disabled"
													data-options="validType:'length[1,32]',required:true,missingMessage:'请输入建筑名称'">
												<input id="subsId" type="hidden"
													value="${resultMap.SUBS_ID}" name="queryPara.subsId">
												<font style="color: red;">*</font>
											</td>
											<td class="td-label" align="center"nowrap="nowrap">
												运行状态
											</td>
											<td>
												<input id="runStatus" name="queryPara.runStatus"
													size="27" value="${resultMap.RUN_STATUS}"validType="comboxValidate['请选择运行状态']"
													disabled="disabled">
												<font style="color: red;">*</font>
											</td>
											<td class="td-label" align="center"nowrap="nowrap">
												降压层级
											</td>
											<td>
												<select id="subsLevel" class="easyui-combobox" data-options="width:198,panelHeight:'auto',editable:false,required:true"
													value="${resultMap.SUBS_LEVEL}" disabled="disabled"
													name="queryPara.subsLevel" size="27">
													<option value="0">0级</option>
													<option value="1">1级</option>
													<option value="2">2级</option>
													<option value="3">3级</option>
												</select>
												<font style="color: red;">*</font>
											</td>
                                            
										</tr>
										<tr>
											<td class="td-label" align="center"nowrap="nowrap">
												电压等级
											</td>
											<td>
												<input id="voltCode" name="queryPara.voltCode" validType="comboxValidate['请选择电压等级']"
													value="${resultMap.VOLT_LEVEL}" disabled="disabled"
													size="27">
												<font style="color: red;">*</font>
											</td>
											<td class="td-label" align="center"nowrap="nowrap">
												用电量累加方式
											</td>
											<td colspan="1">
												<input id="electSumFlag" name="queryPara.electSumFlag" validType="comboxValidate['请选择用电量累加方式']"
                                                    value="${resultMap.ELECT_SUM_FLAG}" disabled="disabled"
                                                    size="27">
                                                <font style="color: red;">*</font>
											</td>
											<td class="td-label" align="center" nowrap="nowrap">
												所属客户类型
											</td>
											<td colspan="1">
                                                <select id="userType" class="easyui-combobox"data-options="width:198,panelHeight:'auto',editable:false"
                                                    value="${resultMap.USER_TYPE}" disabled="disabled"
                                                    name="queryPara.userType" size="27">
                                                    <option value="1">电力客户</option>
                                                    <option value="2">子客户</option>
                                                </select>
                                            </td>
										</tr>
										<tr>
											<td class="td-label" align="center"nowrap="nowrap">
												所属客户
											</td>
											<td>
												<input id="consId" name="queryPara.consId"
													size="27" class="easyui-textbox"
													value="${resultMap.CONS_NAME}" disabled="disabled"
													data-options="required:true,missingMessage:'请输入所属客户'">
											</td>
											<td class="td-label" align="center"nowrap="nowrap">
												显示顺序
											</td>
											<td>
												<select id="dispOder" class="easyui-combobox" data-options="width:198,panelHeight:'auto',editable:false"
													value="${resultMap.DISP_ORDER}" disabled="disabled"
													name="queryPara.dispOder" size="27">
													<option value="1">1</option>
													<option value="2">2</option>
													<option value="3">3</option>
													<option value="4">4</option>
													<option value="5">5</option>
													<option value="6">6</option>
													<option value="7">7</option>
													<option value="8">8</option>
													<option value="9">9</option>
													<option value="10">10</option>
													<option value="11">11</option>
													<option value="12">12</option>
													<option value="13">13</option>
													<option value="14">14</option>
													<option value="15">15</option>
												</select>
											</td>
											<td class="td-label" align="center"nowrap="nowrap">
												经度
											</td>
											<td>
												<input id="x"name="queryPara.x"
													size="27" class="easyui-numberbox"
													value="${resultMap.X}" disabled="disabled"
													data-options="validType:'length[0,18]',required:false,precision:14">
											</td>
										</tr>
										<tr>
											<td class="td-label" align="center"nowrap="nowrap">
												纬度
											</td>
											<td>
												<input id="y"name="queryPara.y"
													size="27" class="easyui-numberbox"
													value="${resultMap.Y}" disabled="disabled"
													data-options="validType:'length[0,18]',required:false,precision:14">
											</td>
											<td id="orgNo_td1" class="td-label" align="center"nowrap="nowrap">
												供电单位
											</td>
											<td id="orgNo_td2">
												<input id="orgNo" name="queryPara.orgNo"
													value="${resultMap.ORG_NO}" size="27"
													disabled="disabled">
											</td>
											
											<!--  <td class="td-label" align="center"nowrap="nowrap">
												建筑类型
											</td>
                                            <td width="25%" nowrap="nowrap">
			                                    <input id="subType" name="queryPara.subType" size="27" disabled="disabled" class="easyui-validatebox" validType="comboxValidate['请输入建筑类型']" data-options="required:true">
			                                    <font style="color: red;">*</font>
											</td>-->
											
                                            <td class="td-label" align="center"nowrap="nowrap" style="display:none;">
												服务中心
											</td>
											<td style="display:none;">
												<input id="areaNo" name="queryPara.areaNo"
													value="${resultMap.AREA_NO}"size="27"
													disabled="disabled">
											</td>
										</tr>
										<tr>
											<td class="td-label" align="center"nowrap="nowrap">
												备注
											</td>
											<td colspan="5">
												<input class="easyui-textbox" multiline="true" id="remark" data-option="validType:'length[0,128]',multiline:true"
													name="queryPara.remark" value=""
													disabled="disabled" style="width: 100%; height: 120px;">
												<input type="hidden" value="${resultMap.REMARK }"
													id="remark_bak" />
											</td>
										</tr>
									</tbody>
								</table>
								<!-- 底部按钮区开始  -->
								<div align="center" id="modifyButton">
									<a id="modifyRealBtn" class="easyui-linkbutton c1"
										style="width: 80px; height: 24px;" onclick="modifyData()">修改</a>
								</div>
								<div align="center" id="saveButton" style="display: none;">
									<a id="btn" class="easyui-linkbutton c1"
										style="width: 80px; height: 24px;" onclick="saveData()">保存</a>
									<a id="btn" class="easyui-linkbutton c1"
										style="width: 80px; height: 24px;" onclick="cancleAction()">取消</a>
								</div>
								<!-- 底部按钮区结束  -->
							</td>
						</tr>
					</tbody>
				</table>
			</form>
		</div>
	</body>
</html>
<script type="text/javascript">
    $( function() {
    	var roleCode = parent.$("#roleCode").val();
    	if(roleCode=="qyny") {
    		$("#orgNo_td1").hide();
    		$("#orgNo_td2").hide();
    	}
    	var isEdit = parent.$("#isEdit").val();
    	if(isEdit == 'false'){
			$("#modifyRealBtn").linkbutton("disable");
		}
        $('#voltCode').combobox({
            url :'<%=basePath%>areaEnergyTmnl/getVoltCode.action',
            //url: '<%=basePath%>pages/despages/jquery-easyui-1.5.1/demo/combobox/combobox_data1.json',
            editable:false,//不可编辑状态
          //method: 'get',
          //data:[{"id":,"text":"请选择"},{"id":1,"text":"220kV"},{"id":2,"text":"110kV"},{"id":3,"text":"35kV"},{"id":4,"text":"20kV"},{"id":5,"text":"10kV"}],
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
        
        $('#areaNo').combobox({
            url :'<%=basePath%>areaEnergy/loadAreaList.action',
            editable :false,//不可编辑状态
            valueField :'ID',
            textField :'TEXT'
        });
        
        $('#orgNo').combotree({
			url :'<%=basePath%>capacityData/queryPowerCompany.action?queryPara.orgId=32101&queryPara.parentId=0',
			onLoadSuccess : function(node, data){
			    $(this).tree('collapseAll');
			}
	  	}); 
	  	
       	//用电量累加方式electSumFlag
        $('#electSumFlag').combobox({
            url :'<%=basePath%>areaEnergyTmnl/getCodeNameByCode.action?codeValue=70039',
            editable:false,//不可编辑状态
          valueField:'id',
          textField:'text'
        });
       	
      //建筑类型
       /* $('#subType').combobox({
            url :'<%=basePath%>areaEnergyTmnl/getCodeNameByCode.action?codeValue=70041',
            editable:false,//不可编辑状态
            valueField:'id',
            textField:'text'
        });*/
       
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
       	
      
       
        $('#subsLevel').combobox({//降压层级
            value:'${resultMap.SUBS_LEVEL}'
        });
        $('#dispOder').combobox({//显示顺序
            value:'${resultMap.DISP_ORDER}'
        });
        $('#userType').combobox({//所属客户类型
            value:'${resultMap.USER_TYPE}'
        });
        /* $('#subType').combobox({//所属客户类型
            value:'${resultMap.SUB_TYPE}'
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
            var tx = $('#tx').val();
            $('#remark').textbox('setValue',tx);*/
        $("#remark").textbox('setValue',$("#remark_bak").val());
    });
    $('#runStatus').combobox({
         onChange : function() {
             $('#runStatus').combobox('validate');
         }
    });
    $('#voltCode').combobox({
         onChange : function() {
             $('#voltCode').combobox('validate');
         }
    });
    $('#electSumFlag').combobox({
         onChange : function() {
             $('#electSumFlag').combobox('validate');
         }
    });
    
</script>

