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
		<title>测点批量导入</title>
		<jsp:include page="/pages/areaEnergy/common/head.jsp"></jsp:include>
	</head>
	<base target='self'>
    <body scroll='no'>
        <!--  
        <form>
        </form>
		<div region="center" border="false">
			<table id="collArchiveTable"></table>
		</div>
		-->
		
		<div id='queryDiv' class="container-shadow container-marginTop" style="width:100%;">
            <div class="easyui-panel" title="企业客户测点信息导入" style="width:100%;padding:5px 10px;">
            <form id="thisform" name="thisform" target="fileFrame" method="post"  enctype="multipart/form-data">
            	<input type="hidden" id="tmnlId" name="queryPara.tmnlId" value="${param.tmnlId}"/>
               <table style="width:100%;">
					<tbody>
						<tr>
							<td style="padding:5px;" width="100%">
									<table width="100%" cellspacing="8px" cellpadding="0"
										border="0">
										<tr>
											<td class="td-label" align="right" nowrap="nowrap">
												测点文件
											</td>
											<td >
					                            <input id="file" type="text" name="file" data-options="required:true,missingMessage:'请选择文件'"" style="width:300px">
											</td>
											<td >
					                            <button id="checkBtn" class="easyui-linkbutton c1" onclick="checkFile();" style="width:70px;">校验</button>
											</td>
											<td >
					                            <button id="importBtn" class="easyui-linkbutton c1" onclick="importFile();" style="width:70px;">导入</button>
											</td>
											<td >
					                            <button class="easyui-linkbutton c1" onclick="downLoadFile();" style="width:110px;">测点模板下载</button>
											</td>
										</tr>
									</table>
							</td>
						</tr>
					</tbody>
				</table>
				</form>
			<iframe id='fileFrame' name='fileFrame' style='display:none;'></iframe>	
            </div>
            <div class="easyui-panel" style="width:100%;">
				<table id="mpImportResultTable"></table>
			</div>
        </div>
	     
	</body>
	<script type="text/javascript">
		var checkFlag = "0";
		$(function() { 
			$('#file').filebox({    
			    buttonText: '选择文件', 
			    buttonAlign: 'right' ,
			    onChange: function(){
			    	checkFlag = "0";
			    }
			})
		});
		//测点模板下载
		function downLoadFile(){
			document.thisform.target = "";
			document.thisform.action = "<%=basePath%>/areaEnergy/downloadExcel.action";
			document.thisform.submit();	
		}
		//测点校验
		function checkFile(){
			document.thisform.action = "";
			$.messager.progress();
			$('#thisform').form('submit',{
				url :'<%=basePath%>areaEnergy/checkMpExcelInfo.action',  
				onSubmit: function(){
					var fileName = $('#file').filebox('getValue');
			    	var fileType = fileName.split('.')[fileName.split('.').length-1];
			    	if(fileType != 'xls'){
			    		$.messager.progress('close');
			    		$.messager.confirm('确认','请选择xls格式的EXCEL文件！','info');
			    		return false;
			    	}
			    },   
			    success:function(res){    
			    	$.messager.progress('close');
			    	if(res == "ok"){
						queryList();
						checkFlag = "1";
			    	}
			    	if(res == "excelError"){
			    		$.messager.confirm('确认','EXCEL文件格式不对！','info');
			    	}
			    }    
			}); 
		}
		function importFile(){
			document.thisform.action = "";
			if(checkFlag == "0"){
				$.messager.confirm('确认','请先校验文件！','info');
				return;
			}
			var dgData = $('#mpImportResultTable').datagrid('getData');
			if(dgData.rows.length != 0){
				$.messager.confirm('确认','必须校验无误的文件才能导入！','info');
				return;
			}
			if(dgData.rows.length == 0){
				doImport();
			}
		}
		//测点导入
		function doImport(){
			
			$.messager.progress();
			$('#thisform').form('submit',{
				url :'<%=basePath%>areaEnergy/doImportMpExcelInfo.action',    
			    success:function(res){    
			    	$.messager.progress('close');
			    	if(res == "ok"){
			    		opener.parent.com.frontier.areaEnergy.baseData.reloadTree.flushAndClickCurrentNode();
						$.messager.confirm('确认','批量导入成功！','info');
							window.close();
							return;
			    	}
			    	if(res == "fail"){
						$.messager.confirm('确认','系统异常,导入失败！','info');
						return;
			    	}
			    }    
			}); 
		}
		function queryList(){
			$('#mpImportResultTable').datagrid({
				height : $(window).height()-$('#queryDiv').height()-15,
				border : false,
				title: '测点校验结果',
				singleSelect : false,
				lazyLoad : true,
				striped : true,
				//collapsible:true,  可折叠
				fitColumns: true,
				url : des.webContextRoot+'areaEnergy/getCheckMpResult.action',
				sortOrder : 'desc',
				remoteSort : false,
				showFooter : true,
				pageSize : 10,
				columns : [[
				        {
							title : '数据序号',
							field : 'DATAROW',
							width : 15,
							sortable : true,
							formatter:function(value,row,index){
							     return row.DATAROW;
							}
						}, {
							title : '错误描述',
							field : 'REASON',
							width : 85,
							sortable : true,
							formatter:function(value,row,index){
							     return row.REASON;
							}
						}
						]],
				pagination : true,
				rownumbers : true,
			});
		}
	</script>    
</html>