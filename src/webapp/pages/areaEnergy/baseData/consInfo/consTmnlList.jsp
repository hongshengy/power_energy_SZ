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
		<title>终端配置列表</title>
		<jsp:include page="/pages/areaEnergy/common/head.jsp"></jsp:include>
	</head>
    <body srolling='no'>
		<div id='queryDiv' class="container-shadow" style="width:100%;">
              <div class="easyui-panel" title="终端配置列表" style="width:100%;">
              	<input type="hidden" id="consId" name="queryPara.consId" value="${param.consId}"/>
              	<input type="hidden" id="subsId" name="queryPara.subsId" value="${param.subsId}"/>
              	<input type="hidden" id="roleCode" name="queryPara.roleCode" value="${param.roleCode}"/>
              	<table style="width:100%;">
                   <tbody>
                      <tr>
                        <td class="td-label" align="right">
                            <label>用户编号：</label>
                        </td>
                        <td class="td-value">
                            <input type='text' id='consNo' name='consNo'>
                        </td>
                        <td class="td-fillwidth"></td>
                        <td class="td-label" align="right">
                            <label>用户名称：</label>
                        </td>
                        <td class="td-value">
                            <input type='text' id="consName" name="consName">
                        </td>
                      </tr>
                      <tr>
                        <td class="td-label" align="right">
                            <label>终端资产号：</label>
                        </td>
                        <td class="td-value">
                            <input type='text' id='tmnlAssetNo' name='tmnlAssetNo'>
                        </td>
                        <td class="td-fillwidth"></td>
                        <td class="td-label" align="right">
                            <label>控制IP：</label>
                        </td>
                        <td class="td-value">
                            <input type='text' id="ctrlIp" name="ctrlIp">
                        </td>
                      </tr>
                   </tbody>
                </table>
                <div style="padding: 0px; text-align: center">
                    <button class="easyui-linkbutton c1" onclick="query()" style="width:70px;">查询</button>
                </div>
              </div>
              <div style="padding:2" border="false"> 
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
		
		function query(){
			$('#consTmnlTable').datagrid("load",{
	             "consNo" : $('#consNo').val()
	            ,"consName" : $('#consName').val()
	            ,"tmnlAssetNo" : $('#tmnlAssetNo').val()
	            ,"ctrlIp" : $('#ctrlIp').val()
	            ,"consId" : '${param.consId}'
	            ,"subsId" : '${param.subsId}'
	            ,"areaNo" : '${param.areaNo}'
	            ,"roleCode" : '${param.roleCode}'
   			});
		}
		
		function queryList(){
			var consId = '${param.consId}';
			var subsId = '${param.subsId}';
			var areaNo = '${param.areaNo}';
			var roleCode = '${param.roleCode}';
			$('#consTmnlTable').datagrid({
				height : $(window).height()-190-15,
				border : false,
				singleSelect : false,
				lazyLoad : true,
				striped : true,
				//collapsible:true,  可折叠
				//fitColumns: true,
				url : des.webContextRoot+'areaEnergy/queryTmnlByConsId.action',
				sortOrder : 'desc',
				remoteSort : false,
				showFooter : true,
				pageSize : 50,
				queryParams : {"consId" : consId, "subsId" : subsId, "areaNo" : areaNo, "roleCode" : roleCode},
				columns : [[
				        {   
				            field:'TERMINAL_ID',
				            checkbox:true,
				            formatter:function(value,row,index){
							     return row.TERMINAL_ID;
							}
				        }, {
							title : '终端资产号',
							field : 'TMNL_ASSET_NO',
							width : 180,
							sortable : true,
							formatter:function(value,row,index){
							     return row.TMNL_ASSET_NO;
							}
						}, {
							title : '通信规约',
							field : 'PROTOCOL_TYPE',
							width : 150,
							sortable : true,
							formatter:function(value,row,index){
							     return row.PROTOCOL_TYPE;
							}
						}, {
							title : '抄表IP',
							field : 'READ_METER_IP',
							width : 100,
							sortable : true,
							formatter:function(value,row,index){
							     return row.READ_METER_IP;
							}
						}, {
							title : '控制IP',
							field : 'CTRL_IP',
							width : 100,
							sortable : true,
							formatter:function(value,row,index){
							     return row.CTRL_IP;
							}
						}, {
							title : '终端端口',
							field : 'CTRL_PORT',
							width : 80,
							sortable : true,
							formatter:function(value,row,index){
							     return row.CTRL_PORT;
							}
						}, {
							title : '通信信道',
							field : 'CHANNEL_NO',
							width : 100,
							sortable : true,
							formatter:function(value,row,index){
							     return row.CHANNEL_NO;
							}
						}, {
							title : '终端类型',
							field : 'TERMINAL_TYPE_CODE_NAME',
							width : 120,
							sortable : true,
							formatter:function(value,row,index){
							     return row.TERMINAL_TYPE_CODE_NAME;
							}
						},{
							title : '终端类型编码',
							hidden : 'true',
							field : 'TERMINAL_TYPE_CODE',
							width : 0,
							sortable : true,
							formatter:function(value,row,index){
							     return row.TERMINAL_TYPE_CODE;
							}
						}
						]],
				pagination : true,
				rownumbers : true,
				onLoadSuccess : function(data){
					/* var tmnlAssetNo = '${param.tmnlAssetNo}';
					if (tmnlAssetNo != "") {
						var tmnlAssetNos = tmnlAssetNo.split(",");
						if (data) {
							$.each(data.rows, function(index, item) {
								for (var i=0; i<tmnlAssetNos.length; i++) {
									if (item.TMNL_ASSET_NO == tmnlAssetNos[i]) {
										$('#consTmnlTable').datagrid('checkRow', index);
									}
								}
							});
						}
					} */
				}
			});
		}
		function saveTmnlInfo() {
			var rows = $('#consTmnlTable').datagrid('getSelections'); 
		    if(rows.length == 0){  
	            $.messager.alert('提示',"请选择要配置的终端",'info'); 
	            return; 
	        }
			$.messager.confirm('提示','确定要配置终端吗?',function(result){  
	            if (result){  
	                var rows = $('#consTmnlTable').datagrid('getSelections');
	                var paraArr = [];
	                var subsId = $('#subsId').val();
	                $.each(rows,function(i,n){
	                    paraArr.push({'subsId' : subsId,'tmnlId' : rows[i].TERMINAL_ID,'tmnlTypeCode' : rows[i].TERMINAL_TYPE_CODE});
	                });
	                var url = des.webContextRoot+"areaEnergy/configConsSubsYh.action";
	                var para = 'paraArr='+JSON.stringify(paraArr);
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