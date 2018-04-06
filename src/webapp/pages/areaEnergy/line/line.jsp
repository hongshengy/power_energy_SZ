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
		<title>线路列表信息</title>
		<jsp:include page="/pages/areaEnergy/common/head.jsp"></jsp:include>
	</head>
    <body srolling='no'>
		<input type='hidden' id='subId' name='subId' value="${param.subsId }">
		<input type='hidden' id='areaNo' name='areaNo' value="${param.areaNo }">
		<input type='hidden' id='consId' name='consId' value="${param.consId }">
		<input type='hidden' id='roleCode' name='roleCode' value="${param.roleCode }">
            <div  style="position: absolute; top:10px; margin-top: -10px; left:0; bottom: 0; right:0;">
                <table id="collArchiveTable"></table>
            </div>
	</body>
	<script type="text/javascript">
	$(function() {
		$('#collArchiveTable').datagrid({
			height : $(window).height()-$('#queryDiv').height()-5,
			title:'线路列表信息',
			border : false,
			singleSelect : false,
			width:'100%',
            height:'100%',
			lazyLoad : true,
			striped : true,
			//collapsible:true,  可折叠
			fitColumns: true, 
			url : des.webContextRoot+'line/queryLine.action',
			queryParams : {"queryPara.subId" :'${param.subsId }',"queryPara.consId":'${param.consId }'},
			sortOrder : 'desc',
			remoteSort : false,
			showFooter : true,
			pageSize : 50,
			pageList : [50,100,200,500],
			columns : [[
			        {   
			            field:'LINE_ID',
			            checkbox:true,
			            width:5,
			            formatter:function(value,row,index){
						     return row.LINE_ID;
						}
			        },{
						title : '码值',
						field : 'LT',
						width : 0,
						sortable : true,
						formatter:function(value,row,index){
						     return row.LT;
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
						field : 'RS',
						width : 0,
						sortable : true,
						formatter:function(value,row,index){
						     return row.RS;
						}
					},{
						title : '码值',
						field : 'BI',
						width : 0,
						sortable : true,
						formatter:function(value,row,index){
						     return row.BI;
						}
					},{
						title : '码值',
						field : 'CT_RATIO',
						width : 0,
						sortable : true,
						formatter:function(value,row,index){
						     return row.CT_RATIO;
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
						title : '线路名称',
						field : 'LINE_NAME',
						width : 20,
						sortable : true,
						formatter:function(value,row,index){
						     return row.LINE_NAME;
						}
					}, {
						title : '线路类型',
						field : 'LINE_TYPE',
						width : 10,
						sortable : true,
						formatter:function(value,row,index){
						     return row.LINE_TYPE;
						}
					}, {
						title : 'PT',
						field : 'PT',
						width : 7,
						sortable : true,
						formatter:function(value,row,index){
						     return row.PT;
						}
					}, {
						title : 'CT',
						field : 'CT',
						width : 7,
						sortable : true,
						formatter:function(value,row,index){
						     return row.CT;
						}
					}, {
						title : '所属母线',
						field : 'BS_ID',
						width : 10,
						sortable : true,
						formatter:function(value,row,index){
						     return row.BS_ID;
						}
					}
					, {
						title : '所属终端',
						field : 'TERMINAL_ID',
						width : 10,
						sortable : true,
						formatter:function(value,row,index){
						     return row.TERMINAL_ID;
						}
					}, {
						title : '是否有效',
						field : 'VALID_FLAG',
						width : 7,
						sortable : true,
						formatter:function(value,row,index){
						     return row.VALID_FLAG;
						}
					}, {
						title : '是否电压测点',
						field : 'IS_UMP',
						width : 7,
						sortable : true,
						formatter:function(value,row,index){
						     return row.IS_UMP;
						}
					},{
						title : '运行状态',
						field : 'RUN_STATUS',
						width : 10,
						sortable : true,
						formatter:function(value,row,index){
						     return row.RUN_STATUS;
						}
					},{
						title : '显示顺序',
						field : 'SHOW_INDEX',
						width :10,
						sortable : true,
						formatter:function(value,row,index){
						     return row.SHOW_INDEX;
						}
					} , 
					{
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
				text : '新增线路信息',
				id : 'addLine',
				iconCls : 'icon-add',
				handler : function() {
					var subId = $('#subId').val();
					var consId = ${param.consId};
					var roleCode = $('#roleCode').val();
					var data = $('#collArchiveTable').datagrid("getData");
					var dataTotal = data.total+1;
					var url="<%=basePath %>/pages/areaEnergy/line/addNewLine.jsp?subId="+subId+"&dataTotal="+dataTotal+'&consId='+consId+'&roleCode='+roleCode;
		    		OpenWin(url,"新增线路信息",1200,370);
				}
			},'-',{
					text:'修改线路信息',
					id : 'editLine',
					iconCls:'icon-edit',
					handler:function(){
						var rows = $('#collArchiveTable').datagrid('getSelections'); 
					    if(rows.length==0){  
				            $.messager.alert('提示',"请选择你要修改的线路",'info'); 
				            return; 
				        }
				        if(rows.length > 1){
				        	$.messager.alert('提示',"请选择一条线路进行修改",'info'); 
				            return;
				        }
				        var showIndex ;
				        var lineName;
				        var lineType;
				        var pt;
				        var ct;
				        var bsId;
				        var terminalId;
				        var remark;
				        var validFlag;
				        var runStatus;
				        var lineId;
				        var tranId;
				        var subId = $('#subId').val();
				        var includeFlag;
				        var tmnlId ;
				         $.each(rows,function(i,n){
				         	lineId = n.LINE_ID;
				         	showIndex = n.SHOW_INDEX;
				         	runStatus = n.RS;
					        lineName = n. LINE_NAME;
					        lineType = n.LT;
					        pt = n.PT;
					        ct = n.CT_RATIO;
					        bsId = n.BI;
					        terminalId = n.TERMINAL_ID;
					        remark = n.REMARK;
					        validFlag = n.VF;
					        tranId = n.TI;
					        includeFlag = n.IS_UMP;
					        tmnlId = n.TMNLID;
					     });
					     var params = "subId="+subId+"&tmnlId="+tmnlId+"&includeFlag="+includeFlag+"&lineId="+lineId+"&tranId="+encodeURIComponent(tranId)+"&showIndex="+showIndex+"&runStatus="+encodeURIComponent(runStatus)+"&lineName="+encodeURIComponent(lineName)+"&lineType="+encodeURIComponent(lineType)+"&pt="+pt+"&ct="+ct+"&bsId="+encodeURIComponent(bsId)+"&terminalId="+terminalId+"&remark="+encodeURIComponent(remark)+"&validFlag="+validFlag;
					     var url="<%=basePath %>/pages/areaEnergy/line/editLineMessage.jsp?"+params;  
			    		 //OpenWin(url,"修改线路信息",1200,335,'fullscreen');
			    		 parent.com.frontier.areaEnergy.baseData.reloadTree.clickTreeNode(lineId+',LINESELF,'+subId);
				    }
			},'-',{
					text:'删除线路信息',
					id : 'delLine',
					iconCls:'icon-remove',
					handler:function(){
					    var rows = $('#collArchiveTable').datagrid('getSelections'); 
					    if(rows.length==0){  
				            $.messager.alert('提示',"请选择你要删除的客户",'info'); 
				            return; 
				        }
					    $.messager.confirm('提示','确定要删除吗?',function(result){  
					            if (result){  
					                var rows = $('#collArchiveTable').datagrid('getSelections');  
					                var lineIdArr = [];  
					                $.each(rows,function(i,n){
					                    lineIdArr.push({'lineId' : n.LINE_ID});
					                });
					                //删除客户
					                var url = des.webContextRoot+"line/deleteLineMessage.action";
					                var para = 'lineIds='+JSON.stringify(lineIdArr);
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
					id : 'editLineIndex',
					iconCls:'icon-edit',
					handler:function(){
						var rows = $('#collArchiveTable').datagrid('getSelections'); 
					    if(rows.length==0){  
				            $.messager.alert('提示',"请选择你要修改的线路",'info'); 
				            return; 
				        }
				        if(rows.length > 1){
				        	$.messager.alert('提示',"请选择一条线路进行修改",'info'); 
				            return;
				        }
				        var showIndex ;
				        var lineId;
				         $.each(rows,function(i,n){
				         	lineId = n.LINE_ID;
				         	showIndex = n.SHOW_INDEX;
					     });
					     var params = "deviceId="+lineId+"&showIndex="+showIndex+"&deviceFlag=1";
					     var url="<%=basePath %>/pages/areaEnergy/line/modifyShowIndex.jsp?"+params;  
			    		 OpenWin(url,"修改显示序号",600,180,'fullscreen');
				    }
			}
		],
			onLoadSuccess:function(){
				var isEdit = parent.$("#isEdit").val();
				if(isEdit == 'false'){
					$("#editLineIndex").linkbutton("disable");
					$("#editLine").linkbutton("disable");
					$("#addLine").linkbutton("disable");
					$("#delLine").linkbutton("disable");
				}
			}
		});
		//$('#collArchiveTable').datagrid('hideColumn','SHOW_INDEX');
		$('#collArchiveTable').datagrid('hideColumn','VF');
		$('#collArchiveTable').datagrid('hideColumn','RS');
		$('#collArchiveTable').datagrid('hideColumn','LT');
		$('#collArchiveTable').datagrid('hideColumn','BI');
		$('#collArchiveTable').datagrid('hideColumn','TMNLID');
		$('#collArchiveTable').datagrid('hideColumn','CT_RATIO');
		
	});
	
	/*
		,'-',{
					text:'增加电子电力客户',
					iconCls:'icon-add',
					handler:function(){
						var rows = $('#collArchiveTable').datagrid('getSelections'); 
					    if(rows.length==0){  
				            $.messager.alert('提示',"请选择你要添加电子电力客户的线路",'info'); 
				            return; 
				        }
				        if(rows.length > 1){
				        	$.messager.alert('提示',"请选择一条线路进行添加电子电力客户",'info'); 
				            return;
				        }
				        var lineId;
				        var areaNo = '${param.areaNo }';
				         $.each(rows,function(i,n){
				         	lineId = n.LINE_ID;
					     });
					     var params = "areaNo="+areaNo+"&lineId="+lineId;
					     var url="<%=basePath %>/pages/areaEnergy/line/creatConsSubRecord.jsp?"+params;  
			    		 OpenWin(url,"添加电子电力客户",1400,350);
				    }
			}*/
	
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
	</script>       
</html>