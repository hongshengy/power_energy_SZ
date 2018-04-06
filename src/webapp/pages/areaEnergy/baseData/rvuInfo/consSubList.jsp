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
		<title>配置建筑列表信息</title>
		<jsp:include page="/pages/areaEnergy/common/head.jsp"></jsp:include>
	</head>
    <body srolling='no'>
		<div id='queryDiv' class="container-shadow" style="width:100%;">
              <div class="easyui-panel" title="配置建筑列表信息" style="width:100%;">
              	<input type="hidden" id="consId" name="queryPara.consId" value="${param.consId}"/>
              	<input type="hidden" id="rvuId" name="queryPara.rvuId" value="${param.rvuId}"/>
				  <table id="consTmnlTable" ></table>
              </div>
              <div id="saveBtn" style="padding: 5px; text-align: center;">
               		<table width="100%" cellspacing="2px" cellpadding="10px" border="0">
               			<tr>
               				<td align="right">
                    			 <button class="easyui-linkbutton c1" onclick="saveTmnlInfo();" style="width:70px;">保存</button>
                    		</td>
               				<td align="left">
                    			 <button class="easyui-linkbutton c1" onclick="javascript:window.close();" style="width:70px;">取消</button>
                    		</td>
                    	</tr>
                    </table>
               </div>
        </div>
	     
	</body>
	<script type="text/javascript">
		$(function() { 
			var consId = '${param.consId}';
			queryList();	
		});
		function queryList1(){
			var consId = '${param.consId}';
			$('#consTmnlTable').datagrid("load",{
	          "queryPara.consId" : consId
   			 });
		}
		function queryList(){
			var consId = '${param.consId}';
			$('#consTmnlTable').datagrid({
				height : $(window).height()-$('#queryDiv').height()-15,
				border : false,
				singleSelect : false,
				lazyLoad : true,
				striped : true,
				url : des.webContextRoot+'areaEnergy/querySubListByConsId.action',
				sortOrder : 'desc',
				remoteSort : false,
				showFooter : true,
				pageSize : 10,
				queryParams : {"consId" : consId},
				columns : [[
				        {   
				            field:'VOLT_LEVEL',
				            checkbox:true,
				            formatter:function(value,row,index){
							     return row.VOLT_LEVEL;
							}
				        }, {
							title : '建筑编号',
							field : 'SUBS_ID',
							width : 150,
							sortable : true,
							formatter:function(value,row,index){
							     return row.SUBS_ID;
							}
						}, {
							title : '建筑名称',
							field : 'SUBS_NAME',
							width : 150,
							sortable : true,
							formatter:function(value,row,index){
							     return row.SUBS_NAME;
							}
						}, {
							title : '电压等级',
							field : 'VOLT_LEVEL_NAME',
							width : 100,
							sortable : true,
							formatter:function(value,row,index){
							     return row.VOLT_LEVEL_NAME;
							}
						}, {
							title : '运行状态',
							field : 'RUN_STATUS_NAME',
							width : 100,
							sortable : true,
							formatter:function(value,row,index){
							     return row.RUN_STATUS_NAME;
							}
						}
						]],
				pagination : true,
				rownumbers : true,
			});
		}
		function saveTmnlInfo() {
			var rows = $('#consTmnlTable').datagrid('getSelections'); 
		    if(rows.length!=1){  
	            $.messager.alert('提示',"请选择一条要配置的建筑",'info'); 
	            return;
	        }
			$.messager.confirm('提示','确定要配置建筑吗?',function(result){  
	            if (result){  
	                var rows = $('#consTmnlTable').datagrid('getSelections');  
	                var url = des.webContextRoot+"areaEnergy/configRvuSubs.action";
	                var para = 'subsId='+rows[0].SUBS_ID+'&rvuId='+$('#rvuId').val();
	                $.ajax({
		                url : url,
		                type: "post",
		                data : para,
		                dataType:"json",
		                timeout:60000, 
		                error : function (XMLHttpRequest, textStatus, errorThrown) {
		           	 	     alert('程序异常');
		                },
		                success : function(result) {
		                     $.messager.alert('提示',result.msg,'info');
		                     if(result.flag=='1'){
		                     	window.close();
		                        opener.parent.com.frontier.areaEnergy.baseData.reloadTree.flushAndClickCurrentNode();
		                     }
		                }
		            });
	            }  
	        });
		}
	</script>
</html>