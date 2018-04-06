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
		<title>编辑插座</title>
		<jsp:include page="/pages/areaEnergy/common/head.jsp">
			<jsp:param name="flag" value="flag='13'" />
		</jsp:include>
		<script type="text/javascript">
		function doEdit(){
			if(validateCheck()) {
				$.messager.confirm("提示","确定保存信息吗？",doSubmit);
				//MessageBox("确定保存信息吗？","系统提示", T_ICON, MB_YESNO, doSubmit);
			}
		}
		//回调函数
		function doSubmit(result){
			if(result) {
				var para="id="+$("#id").val()+"&name="+$('#name').textbox('getValue')+"&factory=" + $('#factory').textbox('getValue')+
				"&model="+$('#model').combobox('getValue')+"&power="+$('#power').textbox('getValue')+
				"&pConsId="+${param.consId}+"&parentId=0"+"&subsId="+${param.subsId}+
				"&devAssetNo="+$("#devAssetNo").textbox('getValue')+"&port="+$("#port").textbox('getValue')+"&terminalId="+$("#terminalId").val();
				$.ajax({
					url : des.webContextRoot +'capacity/updateSocket.action',
					type: "post",
					dataType:"text",
					data : para,
					timeout:60000, 
					error : function (XMLHttpRequest, textStatus, errorThrown) {
						//去除遮罩
						disWaitDisplayForQuery();
						$.messager.confirm("提示","保存失败");
					},
					success : function(res) {
							if (res != "" && res != null) {
								 if(res == "exist"){
								 	$.messager.confirm('确认','输入设备标识和端口已经被使用了，请重新输入','info');
								 }else if(res == 'error'){
								 	$.messager.confirm("提示","保存失败");
								 }else{
								 	$.messager.confirm("提示","保存成功",function(){
								 		window.close();
										//window.opener.refreshPage();
										opener.parent.com.frontier.areaEnergy.baseData.reloadTree.flushAndClickCurrentNode();
								 	});
								}
							}
						}
					});
				}
		}
		
	    // 画面合法性check
	  	function validateCheck() {
		     if($('#name').textbox('getValue') == "") {
		          $.messager.confirm("提示","电器名称不能为空，请输入");
		           return false;
		     }
		     
		     if($('#power').textbox('getValue') != "" && !onlyNumInput($('#power').textbox('getValue'))) {
		    	 //$.messager.progress('close');
		         $.messager.confirm("提示","额定功率只能为数字，请重新输入");
		         return false;
		     }
		     if($('#model').combobox('getValue') == ""){
		    	 $.messager.confirm("提示","型号不能为空，请输入");
		           return false;
		     }
		     if($('#devAssetNo').textbox('getValue') == "") {
		          $.messager.confirm("提示","设备标识不能为空，请输入");
		           return false;
		     }
		     if($('#port').textbox('getValue') == "") {
		          $.messager.confirm("提示","端口号不能为空，请输入");
		           return false;
		     }else {
		    	 if(!onlyNumInput($('#port').textbox('getValue'))){
		    		 $.messager.confirm("提示","端口号只能为数字，请重新输入");
			         return false;
		    	 }
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
		
		function cancel(){
			window.close();
		}
		
		function chooseTmnl(){
		    var url = "<%=basePath%>/pages/areaEnergy/capacity/socket/tmnlMessageList.jsp?subId=${param.subsId}&consId=${param.consId}";
	        OpenWin(encodeURI(url),"终端配置列表",800,330);
		}
	</script>
	</head>
    <body srolling='no'>
		<div id='queryDiv' class="container-shadow container-marginTop" style="width:100%;">
            <div class="easyui-panel" title="编辑插座" style="width:100%;">
            <input type="hidden" id="id" value="${param.id }"/>
               <table style="width:100%;">
					<tbody>
						<tr>
							<td style="padding:5px;" width="100%">
								<table width="100%" cellspacing="8px" cellpadding="0"
									border="0">
									<tr>
		                                <td class="td-label" align="right">插座名称：</td>
		                                <td >
		                                    <input class="easyui-textbox" size="30" id="name"
		                                    data-options="required:true,missingMessage:'请输入插座名称'" value="${param.name}">
		                                   <font style="color: red;">*</font>
		                                </td>
		                                <td class="td-label" align="right">厂家：</td>
		                                <td>
		                                	<input class="easyui-textbox" id="factory" size="30" value="${param.factory }"/> 
		                                </td>
		                             </tr>
		                             <tr>
		                             	<td class="td-label" align="right">型号：</td>
		                                <td>
		                                	<%-- <input class="easyui-textbox" id="model" size="30" value="${param.model }"/>  --%>
		                                	<input id="model" name="model" size="30" class="easyui-validatebox" value="${param.model }" validType="comboxValidate['model','请选择型号']" data-options="required:true">
											<font style="color: red;">*</font>
		                                </td>
										<td class="td-label" align="right">额定功率：</td>
		                                <td>
		                                	<input class="easyui-textbox" size="30" id="power" value="${param.power }"/>
		                                </td>
		                             </tr>
		                              <tr>
		                             	<td class="td-label" align="right">设备标识：</td>
		                                <td>
		                                	<input class="easyui-textbox" id="devAssetNo" size="30" value="${param.devAssetNo }"/> 
		                                </td>
										<td class="td-label" align="right">端口：</td>
		                                <td>
		                                	<input class="easyui-textbox" size="30" id="port" value="${param.port }"/>
		                                </td>
		                             </tr>
		                             <tr>
		                             	<td class="td-label" align="right">
											智能网关：
										</td>
										<td>
											<input id="terminalAssetNo" type="text" size="30" editable='false' class="easyui-textbox" data-options="required:true,missingMessage:'请选择智能网关'"  value="${param.tmnlAssetNo }">
											<input type="hidden" class="easyui-textbox" id="terminalId"/>
											<a onclick="javascript:chooseTmnl()"
												style="cursor: pointer"><img
													src="<%=basePath%>images/query.gif"> </a>
											<font style="color: red;">*</font>
										</td>
		                             </tr>
								</table>
							</td>
						</tr>
					</tbody>
				</table>
               <div style="padding: 5px; text-align: center;">
               		<table width="100%" cellspacing="2px" cellpadding="10px" border="0">
               			<tr>
               				<td align="right">
                    			 <button class="easyui-linkbutton c1" onclick="doEdit();" style="width:70px;">保存</button>
                    		</td>
                    		<td align="left">
                    			 <button class="easyui-linkbutton c1" onclick="cancel();" style="width:70px;">取消</button>
                    		</td>
                    	</tr>
                    </table>
                   
               </div>
            </div>
        </div>
	</body> 
	<script type="text/javascript">
		$(function(){
	        $('#model').combobox({
	            url :'<%=basePath%>areaEnergyTmnl/getCodeNameByCode.action?codeValue=80001',
	            editable:false,//不可编辑状态
	            valueField:'id',
	            textField:'text'
	        });
		});
	</script>
</html>