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
		<title>修改建筑信息</title>
		<jsp:include page="/pages/areaEnergy/common/head.jsp"></jsp:include>
	</head>
    <body srolling='no'>
		<div id='queryDiv' class="container-shadow" style="width:100%;">
            <div class="easyui-panel" title="修改建筑信息" style="width:100%;">
            <form id="thisform" name="thisform" target="" method="post">
               <input type="hidden" id='consId' name='consId'>
               <input type="hidden" id='subsId' name='subsId'>
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
											<td width="25%">
												<input type="text" size="18" id="subsName" name="subsName" class="easyui-validatebox" data-options="required:true,missingMessage:'请输入主变名称'">
												<font style="color: red;">*</font>
											</td>
											<td class="td-label" align="right"  nowrap="nowrap">
                                              	电压等级
                                            </td>
                                            <td width="25%" nowrap="nowrap">
                                                <!-- 
												<select class="easyui-combobox" id="voltLevel" name="voltLevel" data-options="width:140,prompt:'',panelHeight:'auto'">
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
					                           <input id="runStatus" name="runStatus" style="width: 140px" class="easyui-validatebox" validType="comboxValidate['请输入运行状态']" data-options="required:true">
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
											 <td class="td-label" align="right" nowrap="nowrap">
												经度
											</td>
											<td width="25%">
					                            <input type="text" size="18" id="x" name="x" class="easyui-textbox">
											</td>
											<td class="td-label" align="right"  nowrap="nowrap">
                                                纬度
                                            </td>
                                            <td width="25%">
                                                <input type="text" size="18" id="y" name="y" class="easyui-textbox">
                                            </td>
										</tr>
										<tr>
											<td class="td-label" align="right"  nowrap="nowrap">
                                                显示顺序
                                            </td>
                                            <td width="25%" colspan="3">
                                                <select class="easyui-combobox" id="dispOrder" name="dispOrder" data-options="width:140,prompt:'==请选择==',panelHeight:'100'">
			                                        <option value="">请选择</option>
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
			                                        <option value="10">11</option>
			                                        <option value="10">12</option>
			                                        <option value="10">13</option>
			                                        <option value="10">14</option>
			                                        <option value="10">15</option>
			                                    </select>
                                            </td>
										</tr>
										<tr>
											 <td class="td-label" align="right" nowrap="nowrap">
												备注
											</td>
											<td width="50%" colspan="3">
					                            <input id="remark" name="remark" class="easyui-textbox" multiline="true" size="65">
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
		$(function(){
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
        
		    $('#thisform').form('load','<%=basePath%>areaEnergy/queryConsSubInfo.action?subsId=${param.subsId}');
		});
		
		function saveConsSub() {
				$.messager.confirm('确认','确认要保存建筑信息吗？',function(r) {
					if (r) {
						$.messager.progress();
						$('#thisform').form('submit',{
						url :'<%=basePath%>areaEnergy/saveConsSubInfo.action',
						onSubmit: function(){
					        var isValid = $(this).form('validate');
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
	</script>    
</html>