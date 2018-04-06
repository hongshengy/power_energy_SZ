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
		<title>新增电器设备</title>
		<jsp:include page="/pages/areaEnergy/common/head.jsp">
			<jsp:param name="flag" value="flag='13'" />
		</jsp:include>
		<script type="text/javascript">
		function doAdd(){
			if(validateCheck()) {
				$.messager.confirm("提示","确定保存信息吗？",doSubmit);
				//MessageBox("确定保存信息吗？","系统提示", T_ICON, MB_YESNO, doSubmit);
			}
		}
		//回调函数
		function doSubmit(result){
			if(result) {
				var para="name="+$('#name').textbox('getValue')+"&factory=" + $('#factory').textbox('getValue')+
				"&model="+$('#model').textbox('getValue')+"&pNo="+$('#pNo').textbox('getValue')+"&power="+$('#power').textbox('getValue')+
				"&voltCode="+$('#voltCode').textbox('getValue')+"&others="+$('#others').textbox('getValue')+"&pConsId="+'${param.consId}'+"&parentId="+'${param.parentId}'+
				"&subsId="+'${param.subsId}';
				$.ajax({
					url : des.webContextRoot +'capacity/insertNewElecDevice.action',
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
								 if(res == "error"){
								 	$.messager.confirm("提示","保存失败");
								 }else{
								 	$.messager.confirm("提示","保存成功",function(){
								 		window.close();
										opener.parent.com.frontier.areaEnergy.baseData.reloadTree.flushAndClickCurrentNode();
										//window.opener.refreshPage();
								 	});
								}
							}
						}
					});
				}
		}
		
	    // 画面合法性check
	  	function validateCheck() {
		     if($("#name").textbox('getValue') == "") {
		          $.messager.confirm("提示","电器名称不能为空，请输入");
		           return false;
		     }
		     
		     if($("#pNo").textbox('getValue') != "" && !onlyNumInput($('#pNo').textbox('getValue'))){
		          $.messager.confirm("提示","空调匹数只能为数字，请重新输入");
		           return false;
		     }
		     
		     if($("#power").textbox('getValue') != "" && !onlyNumInput($('#power').textbox('getValue'))){
		          $.messager.confirm("提示","额定功率只能为数字，请重新输入");
		           return false;
		     }
	    	return true;
		}
		
		function onlyNumInput(numObj){
			//var reg = new RegExp("^[0-9]$");
			var reg = new RegExp("^[0-9]+([.]{1}[0-9]+){0,1}$");
			if(numObj != "" && numObj != null){
				/* for(var i=0;i<numObj.length;i++){
		            var aav = numObj.charAt(i);
		            if(!reg.test(aav)){
		                return false;
		            }
		        } */
				if(!reg.test(numObj)){
	                return false;
	            }
		        return true;
			}
		}
		
		function cancel(){
			window.close();
		}
	</script>
	</head>
    <body srolling='no'>
		<div id='queryDiv' class="container-shadow container-marginTop" style="width:100%;">
            <div class="easyui-panel" title="新增电器" style="width:100%;">
               <table style="width:100%;">
					<tbody>
						<tr>
							<td style="padding:5px;" width="100%">
									<table width="100%" cellspacing="8px" cellpadding="0"
										border="0">
										<tr>
			                                <td class="td-label" align="right">电器名称：</td>
			                                <td >
			                                    <input class="easyui-textbox" size="30" id="name"
			                                    data-options="required:true,missingMessage:'请输入电器名称'"
			                                    >
			                                   <font style="color: red;">*</font>
			                                </td>
			                                <td class="td-label" align="right">厂家：</td>
			                                <td>
			                                	<input class="easyui-textbox" id="factory" size="30"/> 
			                                </td>
			                             </tr>
			                             <tr>
			                             	<td class="td-label" align="right">型号：</td>
			                                <td>
			                                	<input class="easyui-textbox" id="model" size="30"/> 
			                                </td>
											<td class="td-label" align="right">空调匹数：</td>
			                                <td>
			                                	<input class="easyui-textbox" id="pNo" size="30"/> 
			                                </td>
			                             </tr>
			                             <tr>
			                             	<td class="td-label" align="right">额定功率：</td>
			                                <td>
			                                	<input class="easyui-textbox" size="30" id="power"/>
			                                </td>
											<td class="td-label" align="right">电压等级：</td>
			                                <td>
			                                	<input class="easyui-textbox" size="30" id="voltCode"/>
			                                </td>
			                            </tr>
			                            <tr>
			                                <td class="td-label" align="right">其他铭牌信息：</td>
			                                <td colspan = '4'>
			                                    <input class="easyui-textbox" data-options='multiline:true'  id="others" style= "width:550px;height:100px;">
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
                    			 <button class="easyui-linkbutton c1" onclick="doAdd();" style="width:70px;">保存</button>
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
</html>