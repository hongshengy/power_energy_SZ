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

		<title>新增终端厂商信息</title>
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
									url :'<%=basePath%>areaEnergy/createNewTmnlFactory.action',    
								    onSubmit: function(){
								        var isValid = $(this).form('validate');
								        if (!isValid){
								            $.messager.progress('close'); 
								        }
								        return isValid; 
								    },    
								    success:function(res){    
								        $.messager.progress('close');    
								        if (res != "" && res != null) {
			                                if (res == "hadName"){
	                                            $.messager.alert('警告','输入的终端厂商名称已经存在！');
	                                        }else if (res == "ok"){
			                                    window.close();
			                                    opener.refresh();
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
			<div class="easyui-panel" title="新增终端厂商信息" id="pfgd-panel"
				style="border: 0; width: 100%; height: 100%; overflow: auto; background: #fafafa;">
				<table class="form-table" style="width: 100%; height: 100%;">
					<tbody valign="center">
						<tr>
							<td>
								<table width="100%" cellspacing="8px" cellpadding="0"
                                        border="0">
									<tbody>
										<tr>
											<td class="td-label" align="right">终端厂商名称：</td>
                                			<td >
                                    			<input class="easyui-textbox" size="27" id="tmnlFactoryName"  name = "queryPara.tmnlFactoryName" data-options="required:true,missingMessage:'请输入终端厂商名称'">
                                   				<font style="color: red;">*</font>
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
</script>

