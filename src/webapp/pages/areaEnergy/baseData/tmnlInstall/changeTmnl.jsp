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
		<title>终端互换</title>
		<jsp:include page="/pages/areaEnergy/common/head.jsp">
   			<jsp:param name="flag" value="flag='13'" />
   		</jsp:include>
	</head>
    <body srolling='no'>
		<div id='queryDiv' class="container-shadow container-marginTop" style="width:100%;">
		    <input type='hidden' id='consIds' name='queryPara.consIds' value="${param.consIds}">
		    <input type='hidden' id='sourceTmnlId' name='queryPara.sourceTmnlId' value="">
		    <input type='hidden' id='targetTmnlId' name='queryPara.targetTmnlId' value="">
            <div class="easyui-panel" title="互换终端信息" style="width:100%;padding:30px 10px;">
                <table style="width:100%;" class="easyui-panel" cellspacing="8px" cellpadding="0" border="0">
                    <tbody>
                             <tr>
                                <td class="td-label" align="right">源终端：</td>
                                <td >
                                    <input class="easyui-textbox" size="27" id="sourceTmnlAssetNo" editable='false' 
                                     data-options="required:true,missingMessage:'请选择源终端'">
                                    <a onclick="querySourceTmnlInfo();" style="cursor:pointer"><img src="<%=basePath%>images/query.gif">
                                    <font style="color: red;">*</font>
                                </td>
                                 <td class="td-label" align="right">目标终端：</td>
                                <td >
                                    <input class="easyui-textbox" size="27" id="targetTmnlAssetNo" editable='false' 
                                     data-options="required:true,missingMessage:'请选择目标终端'">
                                    <a onclick="queryTargetTmnlInfo();" style="cursor:pointer"><img src="<%=basePath%>images/query.gif">
                                    <font style="color: red;">*</font>
                                </td>
                                
                             </tr>
                             
                     </tbody>
               </table>
               <div style="padding: 10px; text-align: center">
                    <button class="easyui-linkbutton c1" onclick="doEdit()" style="width:70px;">终端互换</button>
                    <button class="easyui-linkbutton c1" onclick="javaScript:window.close();" style="width:70px;">取消</button>
               </div>
            </div>
        </div>
	</body>
	<script type="text/javascript">
		$(function() {
			
		});
		//查询源终端
		function querySourceTmnlInfo(){
			var url = "<%=basePath %>pages/areaEnergy/baseData/tmnlInstall/sourceTmnlInfo.jsp?consId="+'${param.consId}';
			OpenWin(url,"终端配置列表源",900,300);
		}
		//查询目标终端
		function queryTargetTmnlInfo(){
			var url = "<%=basePath %>pages/areaEnergy/baseData/tmnlInstall/targetTmnlInfo.jsp?consId="+'${param.consId}';
			OpenWin(url,"终端配置列表目标",900,300);
		}
		function doEdit(){
		 	var sourceTmnlId = $('#sourceTmnlId').val();
		 	var targetTmnlId = $('#targetTmnlId').val();
		 	if(sourceTmnlId == null || sourceTmnlId == ''){
		 		$.messager.confirm("提示","源终端不能为空！");
				return;
		 	}
		 	if(targetTmnlId == null || targetTmnlId == ''){
		 		$.messager.confirm("提示","目标终端不能为空！");
				return;
		 	}
			if(sourceTmnlId == targetTmnlId){
				$.messager.confirm("提示","请选择与源终端不一样的终端进行互换");
				return;
			}
			$.messager.confirm("提示","确定要互换终端信息吗？",function(){
				var para="queryPara.sourceTmnlId="+sourceTmnlId+"&queryPara.targetTmnlId="+targetTmnlId;
				$.ajax({
					url : des.webContextRoot +'areaEnergy/changeTmnlInfo.action',
					type: "post",
					dataType:"text",
					data : para,
					timeout:60000, 
					error : function (XMLHttpRequest, textStatus, errorThrown) {
					//去除遮罩
					disWaitDisplayForQuery();
					$.messager.confirm("提示","终端互换失败");
					},
					success : function(res) {
							if (res != "" && res != null) {
								if(res == "error"){
								 	$.messager.confirm("提示","终端互换失败");
								 }else if(res == "IdenticalConsId"){
								   $.messager.confirm("提示","终端所属不同的用户，不可以互换");
								 }else{
								 	$.messager.confirm("提示","终端互换成功",function(){
								 		window.close();
										opener.parent.com.frontier.areaEnergy.baseData.reloadTree.flushAndClickCurrentNode();
										//window.opener.refreshPage();
								 	});
								}
							}
						}
					});
			});
		}
	
		
		
		
	</script>    
</html>