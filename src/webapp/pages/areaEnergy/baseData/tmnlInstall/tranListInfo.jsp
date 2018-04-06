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
		<title>变压器列表信息</title>
		<jsp:include page="/pages/areaEnergy/common/head.jsp"></jsp:include>
	</head>
    <body srolling='no'>
		<input type='hidden' id='subId' name='subId' value="${param.subsId }">
		<input type='hidden' id='areaNo' name='areaNo' value="${param.areaNo }">
		<input type='hidden' id='consId' name='consId' value="${param.consId }">
        <div  style="position: absolute; top:10px; margin-top: -10px; left:0; bottom: 0; right:0;">
            <table id="collArchiveTable"></table>
        </div>
	</body>
	<script type="text/javascript">
	$(function() {
		$('#collArchiveTable').datagrid({
			height : $(window).height()-$('#queryDiv').height()-5,
			title:'变压器列表信息',
			border : false,
			singleSelect : false,
			width:'100%',
            height:'100%',
			lazyLoad : true,
			striped : true,
			//collapsible:true,  可折叠
			fitColumns: true, 
			url : des.webContextRoot+'areaEnergyTmnl/getTranInfo.action?subsID=${param.subsId}',
			sortOrder : 'desc',
			remoteSort : false,
			showFooter : true,
			pageSize : 50,
			pageList : [50,100,200,500],
			columns:[[
				{   
		            field : 'TRAN_ID',
		            checkbox : true,
		            width : 0,
		            formatter:function(value,row,index){
					    return row.TRAN_ID;
					}
		        },{
					title : '变压器编号',
					field : 'TRAN_NO',
					width : 10,
					sortable : true,
					formatter:function(value,row,index){
					    return row.TRAN_NO;
					}
				},{
		        	title: '变压器名称',
		        	field: 'TRAN_NAME',
		        	width: 10,
                   	sortable : true,
                   	formatter: function(value,row,index){
                        return row.TRAN_NAME;
                    }
		        },{
		        	field : 'INST_ADDR',
		        	title : '安装地址',
		        	width : 10,
                   	sortable : true,
                   	formatter: function(value,row,index){
                         return row.INST_ADDR;
                    }
		        },{
		        	field : 'CREATE_DATE',
		        	title : '安装日期',
		        	width : 10,
                   	sortable : true,
                   	formatter: function(value,row,index){
                       	return row.CREATE_DATE;
                    }
		        },{
		        	field : 'PLATE_CAP',
		        	title : '铭牌容量',
		        	width : 10,
                   	sortable : true,
                   	formatter: function(value,row,index){
                        return row.PLATE_CAP;
                    }
		        },{
		        	field : 'TRAN_KIND',
		        	title : '变压器型号',
		        	width : 10,
                   	sortable : true,
                   	formatter: function(value,row,index){
                        return row.TRAN_KIND;
                    }
		        },{
		        	field:'RUN_STATUS',
		        	title:'运行状态',
		        	width:10,
                   	sortable : true,
                   	formatter: function(value,row,index){
                        return row.RUN_STATUS;
                    }
		        },{
		        	field : 'FACTORY_NAME',
		        	title : '生产厂家',
		        	width : 10,
                   	sortable : true,
                   	formatter: function(value,row,index){
                        return row.FACTORY_NAME;
                    }
		        },{
		        	field : 'TRAN_VOLT',
		        	title : '电压等级',
		        	width : 10,
                   	sortable : true,
                   	formatter: function(value,row,index){
                        return row.TRAN_VOLT;
                    }
		        },{
		        	field : 'TERMINAL_ASSET_NO',
		        	title : '所属终端',
		        	width : 10,
                   	sortable : true,
                   	formatter: function(value,row,index){
                        return row.TERMINAL_ASSET_NO;
                    }
		        }
		    ]],
			pagination : true,
			rownumbers : true,
			toolbar : [
			{
				text : '新增变压器信息',
				id : 'addTran',
				iconCls : 'icon-add',
				handler : function() {
					var subId = $("#subId").val();
					var areaNo = $("#areaNo").val();
					var data = $('#collArchiveTable').datagrid("getData");
					var dataTotal = data.total+1;
					var url = "<%=basePath %>/pages/areaEnergy/baseData/tmnlInstall/addTranInfo.jsp?subsID="+subId+"&areaNo="+areaNo+"&dataTotal="+dataTotal;
		    		OpenWin(url, "新增变压器信息", screen.availWidth-400, screen.availHeight-450);
				}
			},'-',{
					text:'修改变压器信息',
					id : 'editTran',
					iconCls:'icon-edit',
					handler:function(){
						var rows = $('#collArchiveTable').datagrid('getSelections'); 
				        if(rows.length!=1){  
                			$.messager.alert('提示',"请选择一条记录",'info'); 
                			return; 
            			}
            			var tranId = rows[0].TRAN_ID;
            			parent.com.frontier.areaEnergy.baseData.reloadTree.clickTreeNode(tranId+',TRANSELF,${param.subsId}');
				    }
			},'-',{
					text:'删除变压器信息',
					id : 'delTran',
					iconCls:'icon-remove',
					handler:function(){
					    var rows = $('#collArchiveTable').datagrid('getSelections'); 
					    if(rows.length==0){  
				            $.messager.alert('提示',"请选择你要删除的信息",'info'); 
				            return; 
				        }
					    $.messager.confirm('提示','确定要删除吗?',function(result){  
					            if (result){  
					                var rows = $('#collArchiveTable').datagrid('getSelections');  
					                var tranIdArr = [];  
			                        $.each(rows,function(i,n){
			                            tranIdArr.push({'tranId' : n.TRAN_ID});
			                        });
					                var url = des.webContextRoot+"areaEnergyTmnl/deleteTranInfo.action";
					                var para = 'tranIds='+JSON.stringify(tranIdArr);
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
		                         				 	parent.com.frontier.areaEnergy.baseData.reloadTree.flushAndClickCurrentNode();
		                     					});
		                  					}
						                }
						            });
					            }  
					        });
				    	}
					}
				],
				onLoadSuccess:function(){
					var isEdit = parent.$("#isEdit").val();
					if(isEdit == 'false'){
						$("#editTran").linkbutton("disable");
						$("#addTran").linkbutton("disable");
						$("#delTran").linkbutton("disable");
					}
				}
			});
		});
	
		function refreshPage(){
			$('#collArchiveTable').datagrid("load");
		}
	</script>       
</html>