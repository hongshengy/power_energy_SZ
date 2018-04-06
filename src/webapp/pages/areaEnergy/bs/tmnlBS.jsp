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
		<title>母线列表信息</title>
		<jsp:include page="/pages/areaEnergy/common/head.jsp"></jsp:include>
	</head>
    <body srolling='no'>
		<div id='queryDiv' class="container-shadow" style="width:100%;">
		<input type='hidden' id='subId' name='subId' value="${param.subsId }">
		<input type='hidden' id='consId' name='consId' value="${param.consId }">
            <div style="position: absolute; top:10px; margin-top: -10px; left:0; bottom: 0; right:0;">
                <table id="collArchiveTable"></table>
            </div>
        </div>
	    
	     
	</body>
	<script type="text/javascript">
	$(function() {
		var isEdit = parent.$("#isEdit").val();
		$('#collArchiveTable').datagrid({
			height : $(window).height()-$('#queryDiv').height()-5,
			title:'母线列表信息',
			border : false,
			singleSelect : false,
			width:'100%',
            height:'100%',
			lazyLoad : true,
			striped : true,
			//collapsible:true,  可折叠
			fitColumns: true,  
			url : des.webContextRoot+'bs/queryTmnlBSList.action',
			queryParams : {"queryPara.subId" : $('#subId').val(),"queryPara.consId":'${param.consId }'},
			sortOrder : 'desc',
			remoteSort : false,
			showFooter : true,
			pageSize : 50,
			pageList : [50,100,200,500],
			columns : [[
			        {   
			            field:'BS_ID',
			            checkbox:true,
			            width:5,
			            formatter:function(value,row,index){
						     return row.BS_ID;
						}
			        },{
						title : '码值',
						field : 'VL',
						width : 0,
						sortable : true,
						formatter:function(value,row,index){
						     return row.VL;
						}
					},{
						title : '码值',
						field : 'PT_RATIO',
						width : 0,
						sortable : true,
						formatter:function(value,row,index){
						     return row.PT_RATIO;
						}
					},{
						title : '码值',
						field : 'RS',
						width : 0,
						sortable : true,
						formatter:function(value,row,index){
						     return row.RS;
						}
					},{
						title : '所属变压器',
						field : 'TRANID',
						width : 0,
						sortable : true,
						formatter:function(value,row,index){
						     return row.TRANID;
						}
					},{
						title : '码值',
						field : 'VC',
						width : 0,
						sortable : true,
						formatter:function(value,row,index){
						     return row.VC;
						}
					},{
						title : '码值',
						field : 'VF',
						width : 0,
						sortable : true,
						formatter:function(value,row,index){
						     return row.VF;
						}
					},{
						title : '码值',
						field : 'TMNLID',
						width : 0,
						sortable : true,
						formatter:function(value,row,index){
						     return row.TMNLID;
						}
					},{
						title : '母线名称',
						field : 'BS_NAME',
						width : 15,
						sortable : true,
						formatter:function(value,row,index){
						     return row.BS_NAME;
						}
					}, {
						title : 'PT',
						field : 'PT',
						width :10,
						sortable : true,
						formatter:function(value,row,index){
						     return row.PT;
						}
					}, {
						title : '电压等级',
						field : 'VOLT_CODE',
						width : 10,
						sortable : true,
						formatter:function(value,row,index){
						     return row.VOLT_CODE;
						}
					}, {
						title : '降压层级',
						field : 'VOLT_LEVEL',
						width : 10,
						sortable : true,
						formatter:function(value,row,index){
						     return row.VOLT_LEVEL;
						}
					},{
						title : '运行状态',
						field : 'RUN_STATUS',
						width : 10,
						sortable : true,
						formatter:function(value,row,index){
						     return row.RUN_STATUS;
						}
					}, {
						title : '是否有效',
						field : 'VALID_FLAG',
						width : 10,
						sortable : true,
						formatter:function(value,row,index){
						     return row.VALID_FLAG;
						}
					} , {
						title : '所属终端',
						field : 'TERMINAL_ID',
						width : 10,
						sortable : true,
						formatter:function(value,row,index){
						     return row.TERMINAL_ID;
						}
					},{
						title : '显示顺序',
						field : 'BS_INDEX',
						width : 5,
						sortable : true,
						formatter:function(value,row,index){
						     return row.BS_INDEX;
						}
					}, {
						title : '备注',
						field : 'REMARK',
						width : 15,
						sortable : true,
						formatter:function(value,row,index){
						     return row.REMARK;
						}
					}
			]],
			pagination : true,
			rownumbers : true,
			toolbar : [
			{
				text : '新增母线信息',
				id : 'addBs',
				iconCls : 'icon-add',
				handler : function() {
					var subId = $('#subId').val();
					var data = $('#collArchiveTable').datagrid("getData");
					var dataTotal = data.total+1;
					var url="<%=basePath %>/pages/areaEnergy/bs/addNewBSMesg.jsp?subId="+subId+"&dataTotal="+dataTotal;
		    		OpenWin(url,"新增母线信息",1200,360);
				}
			},'-',{
					text:'修改母线信息',
					id : 'editBs',
					iconCls:'icon-edit',
					handler:function(){
						var rows = $('#collArchiveTable').datagrid('getSelections'); 
					    if(rows.length==0){  
				            $.messager.alert('提示',"请选择你要修改的母线",'info'); 
				            return; 
				        }
				        if(rows.length > 1){
				        	$.messager.alert('提示',"请选择一条母线进行修改",'info'); 
				            return;
				        }
				        var bsId
				        var bsIndex ;
				        var bsName;
				        var ptRatio;
				        var voltCode;
				        var voltLevel;
				        var terminalId;
				        var validFlag;
				        var runStatus;
				        var remark;
				        var subId = $('#subId').val();
				        var tmnlId;
				        var TRANID;
				         $.each(rows,function(i,n){
				         	bsId = n.BS_ID;
				         	bsIndex = n.BS_INDEX;
				         	bsName = n.BS_NAME;
				         	ptRatio = n.PT_RATIO;
				         	validFlag = n.VF;
				         	voltCode = n.VC;
				         	voltLevel = n.VL;
				         	terminalId = n.TERMINAL_ID;
				         	runStatus = n.RS;
				         	remark = n.REMARK;
				         	tmnlId = n.TMNLID;
				         	TRANID = n.TRANID
					     });
					     var params = "subId="+subId+"&tmnlId="+tmnlId+"&bsId="+bsId+"&bsName="+encodeURIComponent(bsName)+"&bsIndex="+bsIndex+
						     "&runStatus="+encodeURIComponent(runStatus)+"&ptRatio="+ptRatio+"&terminalId="+terminalId+"&validFlag="+encodeURIComponent(validFlag)+
						     "&remark="+encodeURIComponent(remark)+"&voltCode="+encodeURIComponent(voltCode)+"&voltLevel="+encodeURIComponent(voltLevel)+"&tranId="+TRANID;
					     var url="<%=basePath %>/pages/areaEnergy/bs/editBSMessage.jsp?"+params;  
			    		 //OpenWin(url,"修改母线信息",1200,360);
			    		 parent.com.frontier.areaEnergy.baseData.reloadTree.clickTreeNode(bsId+',BSSELF,'+subId);
				    }
			},'-',{
					text:'删除母线信息',
					id : 'delBs',
					iconCls:'icon-remove',
					handler:function(){
					    var rows = $('#collArchiveTable').datagrid('getSelections'); 
					    if(rows.length==0){  
				            $.messager.alert('提示',"请选择你要删除的母线",'info'); 
				            return; 
				        }
					    $.messager.confirm('提示','确定要删除吗?',function(result){  
					            if (result){  
					                var rows = $('#collArchiveTable').datagrid('getSelections');  
					                var bsIdArr = [];  
					                $.each(rows,function(i,n){
					                    bsIdArr.push({'bsId' : n.BS_ID});
					                });
					                //删除客户
					                var url = des.webContextRoot+"bs/deleteBSMessage.action";
					                var para = 'bsIds='+JSON.stringify(bsIdArr);
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
			},'-',{
					text:'修改显示序号',
					id : 'editBsIndex',
					iconCls:'icon-edit',
					handler:function(){
						var rows = $('#collArchiveTable').datagrid('getSelections'); 
					    if(rows.length==0){  
				            $.messager.alert('提示',"请选择你要修改的母线",'info'); 
				            return; 
				        }
				        if(rows.length > 1){
				        	$.messager.alert('提示',"请选择一条母线进行修改",'info'); 
				            return;
				        }
				        var showIndex ;
				        var bsId;
				         $.each(rows,function(i,n){
				         	bsId = n.BS_ID;
				         	bsIndex = n.BS_INDEX;
					     });
					     var params = "deviceId="+bsId+"&showIndex="+bsIndex+"&deviceFlag=2";
					     var url="<%=basePath %>/pages/areaEnergy/line/modifyShowIndex.jsp?"+params;  
			    		  OpenWin(url,"修改显示序号",600,180,'fullscreen');
				    }
			}
		],
			onLoadSuccess:function(){
				if(isEdit == 'false'){
					$("#editBsIndex").linkbutton("disable");
					$("#editBs").linkbutton("disable");
					$("#addBs").linkbutton("disable");
					$("#delBs").linkbutton("disable");
				}
			}
		});
		//$('#collArchiveTable').datagrid('hideColumn','BS_INDEX');
		$('#collArchiveTable').datagrid('hideColumn','VL');
		$('#collArchiveTable').datagrid('hideColumn','RS');
		$('#collArchiveTable').datagrid('hideColumn','VC');
		$('#collArchiveTable').datagrid('hideColumn','VF');
		$('#collArchiveTable').datagrid('hideColumn','TMNLID');
		$('#collArchiveTable').datagrid('hideColumn','TRANID');
		$('#collArchiveTable').datagrid('hideColumn','PT_RATIO');
	});
	
		function refreshPage(){
			$('#collArchiveTable').datagrid("load");
		}
		function OpenWin(url, winName, width, height, properties) 
		{
			properties = properties || {};
			xposition=0; yposition=0;
		    
			if ((parseInt(navigator.appVersion) >= 4 ))
			{
				xposition = (screen.width - width) / 2;
				yposition = (screen.height - height) / 2;
			}
			if(typeof properties.resizable == 'undefined'){
				properties.resizable = 1;
			}
			if(typeof properties.scrollbars == 'undefined'){
				properties.scrollbars = 1;
			}
			theproperty = "width=" + width + "," 
				+ "height=" + height + "," 
				+ "location=0," 
				+ "menubar=0,"
				+ "resizable="+properties.resizable+","
				+ "scrollbars="+properties.scrollbars+","
				+ "status=1," 
				+ "titlebar=0,"
				+ "toolbar=0,"
				+ "hotkeys=0,"
				+ "screenx=" + xposition + "," //仅适用于Netscape
				+ "screeny=" + yposition + "," //仅适用于Netscape
				+ "left=" + xposition + "," //IE
				+ "top=" + yposition; //IE 
				try{
					monwin = window.open(url,winName,theproperty,false);
					monwin.focus();
				}catch(e){
				
				}
		}
		
		function searchLineMesgDetail(){
			var lineId = '101000000021';
			var consId = $('#consId').val();
			var url = des.webContextRoot+"line/lineMesgDetail.action?lineId="+lineId+"&consId="+consId;
		    OpenWin(url,"线路信息",1200,850);
		}	
		function searchBSList(){
			var consId = $('#consId').val();
			var url = des.webContextRoot+"bs/tmnlBS.jsp?consId="+consId;
		    OpenWin(url,"母线列表信息",1200,850);
		}	

	</script>       
</html>