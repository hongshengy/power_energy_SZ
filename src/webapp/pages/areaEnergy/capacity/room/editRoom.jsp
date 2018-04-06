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
		<title>编辑房间</title>
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
				var para="id="+$("#id").val()+"&name="+$('#name').textbox('getValue')+"&pConsId="+${param.consId};
				$.ajax({
					url : des.webContextRoot +'room/updateRoom.action',
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
								 if(res == 'error'){
								 	$.messager.confirm("提示","保存失败");
								 }else{
								 	$.messager.confirm("提示","保存成功",function(){
										window.opener.refreshPage();
										//opener.parent.com.frontier.areaEnergy.baseData.reloadTree.flushAndClickCurrentNode();
										window.close();
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
		          $.messager.confirm("提示","房间名称不能为空，请输入");
		           return false;
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
	</script>
	</head>
    <body srolling='no'>
		<div id='queryDiv' class="container-shadow container-marginTop" style="width:100%;">
            <div class="easyui-panel" title="编辑房间" style="width:100%;">
            <input type="hidden" id="id" value="${param.id }"/>
               <table style="width:100%;">
					<tbody>
						<tr>
							<td style="padding:5px;" width="100%">
									<table width="100%" cellspacing="8px" cellpadding="0"
										border="0">
										<tr>
			                                <td class="td-label" align="right">房间名称：</td>
			                                <td >
			                                    <input class="easyui-textbox" size="30" id="name"
			                                    data-options="required:true,missingMessage:'请输入房间名称'" value="${param.name}">
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
</html>