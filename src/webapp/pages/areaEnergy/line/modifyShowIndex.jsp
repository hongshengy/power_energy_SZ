<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%
	//String baseUrl  = request.getContextPath();
	//String pagePath = baseUrl + "/pages/despages";	
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%> 

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	 <head>
    <meta charset="UTF-8">
    <base href="<%=basePath%>">
    <title>修改显示序号</title>
   	<jsp:include page="/pages/areaEnergy/common/head.jsp"></jsp:include>
   	<script type="text/javascript">
		
		$(function(){
		});
		function doEdit(){
			if(validateCheck()) {
				$.messager.confirm("提示","确定保存信息吗？",doSubmit);
				//MessageBox("确定保存信息吗？","系统提示", T_ICON, MB_YESNO, doSubmit);
			}
		}
		//回调函数
		function doSubmit(result){
			if(result) {
				var para='deviceId='+${param.deviceId}+'&showIndex='+$('#showIndex').textbox('getValue')+'&deviceFlag='+${param.deviceFlag};
				$.ajax({
					url : des.webContextRoot +'line/modifyShowIndex.action',
					type: "post",
					dataType:"text",
					data : para,
					timeout:60000, 
					error : function (XMLHttpRequest, textStatus, errorThrown) {
					//去除遮罩
					//disWaitDisplayForQuery();
					//$.messager.confirm("提示","保存失败");
					//MessageBox("保存失败","系统异常",MB_ERROR,MB_OK);
					},
					success : function(res) {
							if (res != "" && res != null) {
								 if(res == 'error'){
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
			     if($('#showIndex').textbox('getValue') == "") {
			          $.messager.confirm("提示","显示序号不能为空，请输入");
			           return false;
			     }
			     if($('#showIndex').textbox('getValue') < 1) {
			          $.messager.confirm("提示","显示序号不能小于1，请输入");
			           return false;
			     }
			     if(!onlyNumInput($('#showIndex').textbox('getValue')) ) {
			          $.messager.confirm("提示","显示序号只能为数字，请重新输入");
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
		<div id='queryDiv' class="container-shadow container-marginTop" style="width:100%;margin-top: 0;">
		<input type='hidden' id='tmnlAssetNo' name='tmnlAssetNo' value="${param.tmnlId }">
            <div class="easyui-panel" title="修改显示序号" style="width:100%;padding:5px 10px;">
                <table style="width:100%;" class="easyui-panel" cellspacing="8px" cellpadding="0" border="0">
                    <tbody>
                             <tr>
                                <td class="td-label"  align="right">显示序号：</td>
                                <td>
                                    <input class="easyui-textbox"  value="${param.showIndex}" size="27" id="showIndex" 
                                    data-options="required:true,missingMessage:'请输入线路显示序号'"
                                    >
                                    <font style="color: red;">*</font>
                                </td>
                             </tr>
                     </tbody>
               </table>
               <div style="padding: 10px; text-align: center">
                    <button class="easyui-linkbutton c1" onclick="doEdit();" style="width:70px;">保存</button>
                    <button class="easyui-linkbutton c1" onclick="cancel();" style="width:70px;">取消</button>
               </div>
            </div>
        </div>
	    <div style="padding:5" border="false"> 
	        <table id="collArchiveTable"></table>
	    </div>
	</body>

</html>
