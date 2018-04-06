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
		<title>智能插座</title>
		<jsp:include page="/pages/areaEnergy/common/head.jsp"></jsp:include>
	</head>
    <body srolling='no'>
	     <div style="position: absolute; top:10px; margin-top:-10px; left:0; bottom: 0; right:0;">
	         <table id="capacitySocketTable"></table>
	     </div>
	</body>
	<script type="text/javascript">
	$(function() {
		$('#capacitySocketTable').datagrid({
			title:'智能插座列表',
			border : false,
			singleSelect : false,
			width:'100%',
            height:'100%',
			lazyLoad : true,
			striped : true,
			//collapsible:true,  可折叠
			fitColumns: true, 
			url : des.webContextRoot+'capacity/queryCapacityDevice.action',
			queryParams : {"queryPara.parentId" :0,"queryPara.consId":'${param.consId}'},
			sortOrder : 'desc',
			remoteSort : false,
			showFooter : true,
			pageSize : 50,
			pageList : [50,100,200,500],
			columns : [[
				        {   
				            field:'ID',
				            checkbox:true,
				            width:5,
				            formatter:function(value,row,index){
							     return row.ID;
							}
				        },{
							title : '插座名称',
							field : 'NAME',
							width : 8,
							sortable : true,
							formatter:function(value,row,index){
							     return row.NAME;
							}
						},{
							title : '厂家',
							field : 'FACTORY',
							width : 5,
							sortable : true,
							formatter:function(value,row,index){
							     return row.FACTORY;
							}
						},{
							title : '型号',
							field : 'MODEL',
							width : 5,
							hidden : true,
							sortable : true,
							formatter:function(value,row,index){
							     return row.MODEL;
							}
						},{
							title : '型号',
							field : 'MODEL_NAME',
							width : 5,
							sortable : true,
							formatter:function(value,row,index){
							     return row.MODEL_NAME;
							}
						},{
							title : '额定功率',
							field : 'POWER',
							width : 0,
							sortable : true,
							formatter:function(value,row,index){
							     return row.POWER;
							}
						},{
							title : '设备标识',
							field : 'DEV_ASSET_NO',
							width : 0,
							sortable : true,
							formatter:function(value,row,index){
							     return row.DEV_ASSET_NO;
							}
						},{
							title : '端口号',
							field : 'PORT',
							width : 0,
							sortable : true,
							formatter:function(value,row,index){
							     return row.PORT;
							}
						},{
							title : '智能网关',
							field : 'TMNL_ASSET_NO',
							width : 0,
							hidden : true,
							sortable : true,
							formatter:function(value,row,index){
							     return row.TMNL_ASSET_NO;
							}
						}
				]],
				pagination : true,
				rownumbers : true,
				toolbar : [
				{
					text : '新增智能插座',
					id : 'addLine',
					iconCls : 'icon-add',
					handler : function() {
						var consId = '${param.consId}';
						var subsId = '${param.subsId}';
						var url="<%=basePath %>pages/areaEnergy/capacity/socket/addSocket.jsp?consId="+consId+"&subsId="+subsId;
			    		OpenWin(url,"新增智能插座",720,270);
					}
				},'-',{
						text:'编辑智能插座',
						id : 'editLine',
						iconCls:'icon-edit',
						handler:function(){
							var rows = $('#capacitySocketTable').datagrid('getSelections');
						    if(rows.length==0){  
					            $.messager.alert('提示',"请选择你要编辑智能插座",'info'); 
					            return; 
					        }
					        if(rows.length > 1){
					        	$.messager.alert('提示',"请选择一条智能插座进行编辑",'info'); 
					            return;
					        }
					        var id ;
					        var name;
					        var factory;
					        var model;
					        var power;
					        var devAssetNo;
					        var port;
					        var tmnlAssetNo;
					         $.each(rows,function(i,n){
					         	id = n.ID;
					         	name = n.NAME;
					         	factory = n.FACTORY;
					         	model = n.MODEL;
					         	power = n.POWER;
					         	devAssetNo = n.DEV_ASSET_NO;
					         	port = n.PORT;
					         	tmnlAssetNo = n.TMNL_ASSET_NO;
						     });
					         var consId = '${param.consId}';
							 var subsId = '${param.subsId}';
							 var parentId = '${param.parentId}';
								
						     var params = "id="+id+"&name="+encodeURIComponent(name)+"&factory="+encodeURIComponent(factory)+"&model="+encodeURIComponent(model)+
						     "&power="+encodeURIComponent(power)+"&devAssetNo="+encodeURIComponent(devAssetNo)+"&port="+encodeURIComponent(port)+
						     "&consId="+consId+"&subsId="+subsId+"&tmnlAssetNo="+encodeURIComponent(tmnlAssetNo);
						     var url="<%=basePath %>pages/areaEnergy/capacity/socket/editSocket.jsp?"+params;  
						     OpenWin(url,"编辑智能插座",720,270);
				    		 parent.com.frontier.areaEnergy.baseData.reloadTree.clickTreeNode(parentId+',CAPACITYSOCKETSELF,'+subsId);
					    }
				},'-',{
						text:'删除智能插座',
						id : 'delLine',
						iconCls:'icon-remove',
						handler:function(){
						    var rows = $('#capacitySocketTable').datagrid('getSelections'); 
						    if(rows.length==0){  
					            $.messager.alert('提示',"请选择你要删除的智能插座",'info'); 
					            return; 
					        }
						    $.messager.confirm('提示','确定要删除吗?',function(result){  
						            if (result){  
						                var rows = $('#capacitySocketTable').datagrid('getSelections');  
						                var idArr = [];  
						                $.each(rows,function(i,n){
						                	idArr.push({'id' : n.ID});
						                });
						                //删除客户
						                var url = "<%=basePath %>capacity/deleteSocket.action";
						                var para = 'ids='+JSON.stringify(idArr);
						                $.ajax({
							                url : url,
							                type: "post",
							                data : para,
							                dataType:"json",
							                timeout:60000, 
							                error : function (XMLHttpRequest, textStatus, errorThrown) {
							                	$.messager.confirm("提示","删除失败");
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
						$("#editLine").linkbutton("disable");
						$("#addLine").linkbutton("disable");
						$("#delLine").linkbutton("disable");
					}
				}
			});
	});
	
	// 刷新，重新加载页面
	function refreshPage(){
		$('#capacitySocketTable').datagrid("load");
	}
	
	// 模式窗体
	function OpenWin(url, winName, width, height, properties){
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