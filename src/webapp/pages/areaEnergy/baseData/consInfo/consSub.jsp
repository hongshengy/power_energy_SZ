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
		<title>新建建筑信息</title>
		<jsp:include page="/pages/areaEnergy/common/head.jsp">
		   <jsp:param name="flag" value="flag='13'" />
		</jsp:include>
	</head>
    <body srolling='no'>
		<div id='queryDiv' class="container-shadow" style="width:100%;">
            <div class="easyui-panel" title="新建建筑信息" style="width:100%;">
            <input type="hidden" id='cacheDispOrder' name='cacheDispOrder'>
            <form id="thisform" name="thisform" target="" method="post">
               <input type="hidden" id='consId' name='consId' value="${param.consId}">
               <input type="hidden" id='areaNo' name='areaNo' value="${param.areaNo}">
               <input type="hidden" id='roleCode' name='roleCode' value="${param.roleCode}">
               <table style="width:100%;">
					<tbody>
						<tr>
							<td style="padding:5px;" width="100%">
									<table width="100%" cellspacing="8px" cellpadding="0"
										border="0">
										<tr>
											<td class="td-label" align="right" nowrap="nowrap">
												建筑名称
											</td>
											<td width="25%" nowrap="nowrap">
												<input type="text" size="18" id="subsName" name="subsName" class="easyui-validatebox" data-options="required:true,missingMessage:'请输入建筑名称'">
												<font style="color: red;">*</font>
											</td>
											<td class="td-label" align="right"  nowrap="nowrap">
                                              	建筑类型
                                            </td>
                                            <td width="25%" nowrap="nowrap">
			                                    <input id="subType" name="subType" style="width:140px;" class="easyui-validatebox" validType="comboxValidate['请输入建筑类型']" data-options="required:true">
			                                    <font style="color: red;">*</font>
											</td>
										</tr>
										<tr>
                                            <td class="td-label" align="right" nowrap="nowrap">
												运行状态
											</td>
											<td width="25%" nowrap="nowrap">
											   <!-- 
					                            <select id="runStatus" name="runStatus" class="easyui-combobox" style="width:140px;" data-options="panelHeight:'auto',editable:false">
					                              	<option value="" selected="selected">请选择</option>
					                                <option value="1">调试</option>
					                                <option value="2">投运</option>
					                                <option value="3">故障</option>
					                                <option value="4">停运</option>
					                            </select>
					                            -->
					                            <input id="runStatus" name="runStatus" style="width: 140px" value='1' class="easyui-validatebox" validType="comboxValidate['请输入运行状态']" data-options="required:true">
												<font style="color: red;">*</font>
											</td>
											<td class="td-label" align="right"  nowrap="nowrap">
                                              	电压等级
                                            </td>
                                            <td width="25%" nowrap="nowrap">
												<!--  
												<select class="easyui-combobox" id="voltLevel" name="voltLevel" data-options="width:140,prompt:'',panelHeight:'auto',required:true,missingMessage:'请输入电压等级'">
			                                        <option value="">==请选择==</option>
			                                        <option value="1">220kV</option>
			                                        <option value="2">110kV</option>
			                                        <option value="3">35kV</option>
			                                        <option value="4">20kV</option>
			                                        <option value="5">10kV</option>
			                                    </select>
			                                    -->
			                                    <input id="voltLevel" name="voltLevel" style="width:140px;" class="easyui-validatebox" validType="comboxValidate['请输入电压等级']" data-options="required:true">
			                                    <font style="color: red;">*</font>
											</td>
											
											
										</tr>
										<tr>
										    <td class="td-label" align="right" nowrap="nowrap">
												用电量累加方式
											</td>
											<td width="25%" nowrap="nowrap">
					                            <input id="electSumFlag" name="electSumFlag" style="width: 140px" value='1' class="easyui-validatebox" validType="comboxValidate['请输入用电量累加方式']" data-options="required:true">
												<font style="color: red;">*</font>
											</td>
											<td class="td-label" align="right"  nowrap="nowrap">
                                                降压层级
                                            </td>
                                            <td width="25%" nowrap="nowrap">
                                                <select class="easyui-combobox easyui-validatebox" id="subsLevel" name="subsLevel" validType="comboxValidate['请输入降压层级']" data-options="width:140,panelHeight:'auto',required:true">
			                                        <option value="">请选择</option>
			                                        <option value="0" selected="selected">0级</option>
			                                        <option value="1">1级</option>
			                                        <option value="2">2级</option>
			                                        <option value="3">3级</option>
			                                    </select>
			                                    <font style="color: red;">*</font>
                                            </td>
										</tr>
										<tr>
											<td class="td-label" align="right"  nowrap="nowrap">
                                                显示序号
                                            </td>
                                            <td width="25%" colspan='3'>
                                                <input class="easyui-textbox" id="dispOrder" name="dispOrder"
                                                       data-options="width:140,required:true,missingMessage:'请输入建筑显示序号'">
                                                <font style="color: red;">*</font>
                                            </td>
										</tr>
										<tr>
											 <td class="td-label" align="right" nowrap="nowrap">
												经度
											</td>
											<td width="25%">
					                            <input type="text" size="18" id="xx" name="xx" class="easyui-textbox">
											</td>
											<td class="td-label" align="right"  nowrap="nowrap">
                                                纬度
                                            </td>
                                            <td width="25%">
                                                <input type="text" size="18" id="yy" name="yy" class="easyui-textbox">
                                            </td>
										</tr>
										<tr>
											 <td class="td-label" align="right" nowrap="nowrap">
												备注
											</td>
											<td width="50%" colspan="3">
					                            <input id="remark" name="remark" class="easyui-textbox" multiline="true" size="65" data-options="validType:'length[0,256]'">
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
                    			 <button class="easyui-linkbutton c1" onclick="saveConsSub();" style="width:70px;">保存</button>
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
		function saveConsSub() {
				$.messager.confirm('确认','确认要保存建筑信息吗？',function(r) {
					if (r) {
						$.messager.progress();
						$('#thisform').form('submit',{
						url :'<%=basePath%>areaEnergy/saveConsSubInfo.action',
						onSubmit: function(){
					        var isValid = $(this).form('validate');
					        var cacheDispOrder = $('#cacheDispOrder').val();
					        /*var voltLevel = $('#voltLevel').val();
					        if(!voltLevel){
					           isValid = false;
					           $.messager.confirm("提示","请选择电压等级");
					        }
					        var runStatus = $('#runStatus').val();
					        if(!runStatus){
					           isValid = false;
					           $.messager.confirm("提示","请选择运行状态");
					        }
					        var subsLevel = $('#subsLevel').val();
					        if(!subsLevel){
					           isValid = false;
					           $.messager.confirm("提示","请选择降压层级");
					        }*/
					        if(!onlyNumInput($('#dispOrder').textbox('getValue')) ) {
						          $.messager.progress('close');
						          $.messager.confirm("提示","建筑显示序号只能为数字，请重新输入");
						          return false;
						    }
					        if($('#dispOrder').textbox('getValue') < cacheDispOrder) {
					              $.messager.progress('close');
						          $.messager.confirm("提示","建筑显示序号不能小于"+cacheDispOrder+"，请输入");
						          return false;
						    }
					        if (!isValid){
					            $.messager.progress('close');
					        }
					        return isValid;
					    },
					    success:function(data){    
					    	 $.messager.progress('close');
					    	 var data = eval('(' + data + ')');
					    	 if(data.flag=='1'){
					    	     $.messager.confirm("提示","保存成功",function(){
								 		window.close();
										//window.opener.$('#consSubTable').datagrid('reload');
										opener.parent.com.frontier.areaEnergy.baseData.reloadTree.flushAndClickCurrentNode();
								 });
					    	 }else{
					    	     $.messager.confirm("提示","保存失败");
					    	 }
					    }    
					}); 
			    }    
			 });
		}
	
	function querySubDispOrder(){
        $.ajax({
				url : '<%=basePath%>areaEnergy/querySubDispOrder.action?consId=${param.consId}',
				type: "post",
				dataType:"json",
				timeout:60000,
				success : function(data){
				    if(!data.DISP_ORDER){
				       $('#dispOrder').textbox('setValue',1);
				       $('#cacheDispOrder').val(1);
				    }else{
				       $('#dispOrder').textbox('setValue',data.DISP_ORDER+1);
				       $('#cacheDispOrder').val(data.DISP_ORDER+1);
				    }
				}
			});
	}
		
    $(function() {
    	var roleCode = $("#roleCode").val();
        $('#voltLevel').val('${param.voltCode}');
        $('#voltLevel').combobox({
            url :'<%=basePath%>areaEnergyTmnl/getVoltCode.action',
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
        //用电量累加方式
        $('#electSumFlag').combobox({
            url :'<%=basePath%>areaEnergyTmnl/getCodeNameByCode.action?codeValue=70039',
            editable:false,//不可编辑状态
            valueField:'id',
            textField:'text'
        });
        //建筑类型
        $('#subType').combobox({
            url :'<%=basePath%>areaEnergyTmnl/getCodeNameByCode.action?codeValue=70041&roleCode='+roleCode,
            editable:false,//不可编辑状态
            valueField:'id',
            textField:'text'
        });
        querySubDispOrder();
        
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
    });
    
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