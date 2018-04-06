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
		<title>摄像机列表信息</title>
		<jsp:include page="/pages/areaEnergy/common/head.jsp"></jsp:include>
	</head>
    <body srolling='no'>
		<input type='hidden' id='RVU_ID' name='RVU_ID' value="${param.RVU_ID }">
            <div  style="position: absolute; top:10px; left:0; bottom: 0; right:0;">
                <table id="collArchiveTable"></table>
            </div>
	</body>
	<script type="text/javascript">
	$(function() {
		$('#collArchiveTable').datagrid({
			height : $(window).height()-$('#queryDiv').height()-5,
			title:'摄像机列表信息',
			border : false,
			singleSelect : false,
			width:'100%',
            height:'100%',
			lazyLoad : true,
			striped : true,
			//collapsible:true,  可折叠
			fitColumns: true,  
			url : des.webContextRoot+'line/camerMpList.action',
			queryParams : {"queryPara.RVU_ID" :'${param.RVU_ID }' },
			sortOrder : 'desc',
			remoteSort : false,
			showFooter : true,
			pageSize : 50,
			columns : [[
			        {   
			            field:'VIDEO_ID',
			            checkbox:true,
			            width:5,
			            formatter:function(value,row,index){
						     return row.VIDEO_ID;
						}
			        },{
						title : '摄像机类型码值',
						field : 'VT',
						width : 0,
						sortable : true,
						formatter:function(value,row,index){
						     return row.VT;
						}
					},{
						title : '坐标X',
						field : 'LOCATION_X',
						width : 0,
						sortable : true,
						formatter:function(value,row,index){
						     return row.LOCATION_X;
						}
					},{
						title : '坐标Y',
						field : 'LOCATION_Y',
						width : 0,
						sortable : true,
						formatter:function(value,row,index){
						     return row.LOCATION_Y;
						}
					},{
						title : '坐标Z',
						field : 'LOCATION_Z',
						width : 0,
						sortable : true,
						formatter:function(value,row,index){
						     return row.LOCATION_Z;
						}
					},{
						title : '分辨率',
						field : 'RESOLUTION',
						width : 0,
						sortable : true,
						formatter:function(value,row,index){
						     return row.RESOLUTION;
						}
					},{
						title : '摄像机编号',
						field : 'VIDEO_NO',
						width : 15,
						sortable : true,
						formatter:function(value,row,index){
						     return row.VIDEO_NO;
						}
					},{
						title : '摄像机名称',
						field : 'VIDEO_NAME',
						width : 15,
						sortable : true,
						formatter:function(value,row,index){
						     return row.VIDEO_NAME;
						}
					}, {
						title : '通道序号',
						field : 'CHANNEL',
						width : 10,
						sortable : true,
						formatter:function(value,row,index){
						     return row.CHANNEL;
						}
					}, {
						title : '摄像机类型',
						field : 'VIDEO_TYPE',
						width : 10,
						sortable : true,
						formatter:function(value,row,index){
						     return row.VIDEO_TYPE;
						}
					}, {
						title : '安装日期',
						field : 'VIDEO_INSTALL_TIME',
						width : 15,
						sortable : true,
						formatter:function(value,row,index){
						     return row.VIDEO_INSTALL_TIME;
						}
					}, {
						title : '所属服务器',
						field : 'RVU_ID',
						width : 15,
						sortable : true,
						formatter:function(value,row,index){
						     return row.RVU_ID;
						}
					}
					, {
						title : '安装位置',
						field : 'INSTALL_PLACE',
						width : 15,
						sortable : true,
						formatter:function(value,row,index){
						     return row.INSTALL_PLACE;
						}
					}
			]],
			pagination : true,
			rownumbers : true,
			toolbar : [
			{
				text : '新增摄像头信息',
				id : 'addCamera',
				iconCls : 'icon-add',
				handler : function() {
		    		var url=des.webContextRoot+"/pages/areaEnergy/baseData/tmnlInstall/createNewVideo.jsp?rvuId="+'${param.RVU_ID }';
    				OpenWin(url,"新增设备",1000,313);
				}
			},'-',{
					text:'修改摄像头',
					id : 'editCamera',
					iconCls:'icon-edit',
					handler:function(){
					    var rows = $('#collArchiveTable').datagrid('getSelections'); 
					    if(rows.length!=1){  
				            $.messager.alert('提示',"请选择一条要修改的数据",'info'); 
				            return; 
				        }
				        var url=des.webContextRoot+"areaEnergy/modifyVideoInfo.action?queryPara.videoId="+rows[0].VIDEO_ID;
					    //OpenWin(url,"修改测点",830,350);
					    parent.com.frontier.areaEnergy.baseData.reloadTree.clickTreeNode(rows[0].VIDEO_ID+',VIDEO,${param.RVU_ID}');
				    }
			},'-',{
					text:'删除',
					id : 'delCamera',
					iconCls:'icon-remove',
					handler:function(){
					    var rows = $('#collArchiveTable').datagrid('getSelections'); 
					    if(rows.length==0){  
				            $.messager.alert('提示',"请选择你要删除的摄像机",'info'); 
				            return; 
				        }
					    $.messager.confirm('提示','确定要删除吗?',function(result){  
					            if (result){  
					                var rows = $('#collArchiveTable').datagrid('getSelections');  
					                var  videoIdArr = [];  
					                $.each(rows,function(i,n){
					                    videoIdArr.push({'videoId' : n.VIDEO_ID});
					                });
					                //删除摄像机
					                var url = des.webContextRoot+"line/deleteCameraMessage.action";
					                var para = 'videoIds='+JSON.stringify(videoIdArr);
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
						                        //$('#collArchiveTable').datagrid('reload');
						                        parent.com.frontier.areaEnergy.baseData.reloadTree.flushAndClickCurrentNode();
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
					$("#addCamera").linkbutton("disable");
					$("#editCamera").linkbutton("disable");
					$("#delCamera").linkbutton("disable");
				}
			}
		});
		$('#collArchiveTable').datagrid('hideColumn','VT');
		$('#collArchiveTable').datagrid('hideColumn','LOCATION_X');
		$('#collArchiveTable').datagrid('hideColumn','LOCATION_Y');
		$('#collArchiveTable').datagrid('hideColumn','LOCATION_Z');
		$('#collArchiveTable').datagrid('hideColumn','RESOLUTION');
		
	});
	
	/*
		,'-',{
					text:'增加电子电力用户',
					iconCls:'icon-add',
					handler:function(){
						var rows = $('#collArchiveTable').datagrid('getSelections'); 
					    if(rows.length==0){  
				            $.messager.alert('提示',"请选择你要添加电子电力用户的线路",'info'); 
				            return; 
				        }
				        if(rows.length > 1){
				        	$.messager.alert('提示',"请选择一条线路进行添加电子电力用户",'info'); 
				            return;
				        }
				        var lineId;
				        var areaNo = '${param.areaNo }';
				         $.each(rows,function(i,n){
				         	lineId = n.LINE_ID;
					     });
					     var params = "areaNo="+areaNo+"&lineId="+lineId;
					     var url="<%=basePath %>/pages/areaEnergy/line/creatConsSubRecord.jsp?"+params;  
			    		 OpenWin(url,"添加电子电力用户",1400,350);
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