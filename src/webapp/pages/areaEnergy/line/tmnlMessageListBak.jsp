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
		<title>终端配置信息</title>
		<jsp:include page="/pages/areaEnergy/common/head.jsp"></jsp:include>
	</head>
    <body srolling='no'>
		<div id='queryDiv' class="container-shadow container-marginTop" style="width:100%;">
            <div class="container-marginTop" style="position: absolute; top:10px; left:0; bottom: 0; right:0;">
                <table id="collArchiveTable"></table>
                <div style="padding: 10px; text-align: center">
                	<button class="easyui-linkbutton c1" onclick="changeTmnl()" style="width:70px;">终端互换</button>
                    <button class="easyui-linkbutton c1" onclick="doEdit()" style="width:70px;">确认</button>
                    <button class="easyui-linkbutton c1" onclick="cancel()" style="width:70px;">取消</button>
				</div>
            </div>
	    
	     
	</body>
	<script type="text/javascript">
	function doEdit(){
		var opType = '${param.opType}';
		 if(opType =='update'){
				var rows = $('#collArchiveTable').datagrid('getSelections'); 
				if(rows.length != 1){  
					 $.messager.alert('提示',"请选择一个终端",'info'); 
						return; 
				}
				 $.messager.confirm('提示','确定选择这个终端吗??',function(result){  
			            if (result){  
			                var tmnlIdArr = [];  
			                $.each(rows,function(i,n){
			                	tmnlIdArr.push({'targetTmnlId' : n.TERMINAL_ID});
			                });
			                //删除客户
			                var url = des.webContextRoot+"areaEnergy/changeTmnlInfoBak.action";
			                var para = 'tmnlIds='+JSON.stringify(tmnlIdArr)+"&sourceTmnlId="+'${param.tmnlId}'+"&deviceId="+'${param.deviceId}';
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
				                     if(result.flag=='1'){
			         					$.messager.alert('提示',result.msg,'info',function(){
			         					});
			      					}else if(result.flag=='2'){
			      						$.each(rows,function(i,n){
			      							opener.$('#TMNL_ASSET_NO').attr('value',n.TMNL_ASSET_NO) ;
			      							opener.$('#tmnlIdbak').val(n.TERMINAL_ID);
			      							opener.$('#TERMINAL_ID').textbox('setValue',n.TMNL_ASSET_NO);
			      							window.close();
			      				        });
			      					}
				                }
				            });
			            }  
			        });
		 }else{
			var rows = $('#collArchiveTable').datagrid('getSelections'); 
			if(rows.length != 1){  
				 $.messager.alert('提示',"请选择一个终端",'info'); 
					return; 
			}
			$.each(rows,function(i,n){
				opener.$('#TMNL_ASSET_NO').attr('value',n.TMNL_ASSET_NO) ;
				opener.$('#tmnlIdbak').val(n.TERMINAL_ID);
				opener.$('#TERMINAL_ID').textbox('setValue',n.TMNL_ASSET_NO);
				window.close();
	        });
		}
		//opener.$('#TERMINAL_ID').textbox('setValue',row.TERMINAL_ID) ;
		
	}
	function cancel(){
		window.close();
	}
	function changeTmnl(){
		var rows = $('#collArchiveTable').datagrid('getSelections'); 
        if(rows.length != 2){
        	$.messager.alert('提示',"请选择2个终端进行互换",'info'); 
            return;
        }
        
        $.messager.confirm('提示','确定要互换终端吗?',function(result){  
            if (result){  
                var tmnlIdArr = [];  
                $.each(rows,function(i,n){
                	tmnlIdArr.push({'TERMINAL_ID' : n.TERMINAL_ID});
                });
                //删除客户
                var url = des.webContextRoot+"areaEnergy/changeTmnlBak.action";
                var para = 'tmnlIds='+JSON.stringify(tmnlIdArr);
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
	                	$.messager.alert('提示',result.msg,'info',function(){
     						var opType = '${param.opType}';
     						if(opType == "update"){
         						if(result.flag=='1'){
	         						opener.parent.com.frontier.areaEnergy.baseData.reloadTree.flushAndClickCurrentNode();
	         						window.close();
         						}
     						}else{
     							window.close();
     						}
     					});
	                }
	            });
            }  
        });
	}
	
	$(function() {
		var subId = ${param.subId};
		$('#collArchiveTable').datagrid({
			height : $(window).height()-$('#queryDiv').height()-5,
			title:'终端配置信息',
			border : false,
			singleSelect : false,
			width:'100%',
            height:'80%',
			lazyLoad : true,
			striped : true,
			//collapsible:true,  可折叠
			//fitColumns: true,  自动调整各列,下面各列的宽度值就只是一个比例。
			url : des.webContextRoot +'line/queryTmnlDeployMesgList.action',
			queryParams : {"queryPara.subId" : subId},
			sortOrder : 'desc',
			remoteSort : false,
			showFooter : true,
			pageSize : 50,
			checkOnSelect:true,
			selectOnCheck:true,
			columns : [[
			        {   
			            field:'TERMINAL_ID',
			            checkbox:true,
			            width:150,
			            formatter:function(value,row,index){
						     return row.TERMINAL_ID;
						}
			        },{
						title : '终端资产号',
						field : 'TMNL_ASSET_NO',
						width : 150,
						sortable : true,
						formatter:function(value,row,index){
						     return row.TMNL_ASSET_NO;
						}
					}, {
						title : '通信规约',
						field : 'PROTOCOL_TYPE',
						width : 200,
						sortable : true,
						formatter:function(value,row,index){
						     return row.PROTOCOL_TYPE;
						}
					}, {
						title : '终端端口',
						field : 'TMNL_IP',
						width : 200,
						sortable : true,
						formatter:function(value,row,index){
						     return row.TMNL_IP;
						}
					}, {
						title : '通信信道',
						field : 'CHANNEL_NO',
						width : 150,
						sortable : true,
						formatter:function(value,row,index){
						     return row.CHANNEL_NO;
						}
					}, {
						title : '终端类型',
						field : 'TERMINAL_TYPE_CODE',
						width : 150,
						sortable : true,
						formatter:function(value,row,index){
						     return row.TERMINAL_TYPE_CODE;
						}
					}
			]],
			pagination : true,
			rownumbers : true
		});	
	});
	</script>       
</html>