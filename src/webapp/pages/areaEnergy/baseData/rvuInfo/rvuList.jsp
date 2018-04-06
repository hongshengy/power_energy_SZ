<%@ page language="java" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    
    <title>视频服务器列表信息</title>
    <jsp:include page="/pages/areaEnergy/common/head.jsp"></jsp:include>
	</head>
	<body srolling='no' style='width:100%;height:100%;'>
	    <input type="hidden" name='consId' id='consId' value="${param.consId}">
	    <input type="hidden" name='areaNo' id='areaNo' value="${param.areaNo}">
		<div style="padding:0;height:100%;" border="false"> 
	        <table id="rvuTable"></table>
	    </div>
	</body>
	<script type="text/javascript">
		    $(function() {
				$('#rvuTable').datagrid({
					height : $('body').height(),
					width : $('body').width()-2,
					border : false,
					title : '视频服务器列表信息',
					singleSelect : false,
					lazyLoad : true,
					striped : true,
					url : '<%=basePath%>areaEnergy/queryRvuList.action',
					sortOrder : 'desc',
					remoteSort : false,
					showFooter : true,
					pageSize : 50,
		            pageList : [50,100,200,500],
					queryParams : {"consId" : $('#consId').val()},
					columns : [[
					        {   
					            field:'RVU_ID',
					            align:'center',
					            checkbox:true,
					            width:10,
					            formatter:function(value,row,index){
								     return row.RVU_ID;
								}
					        },
					        {
								title : '服务器名称',
								align : 'center',
								field : 'RVU_NAME',
								width : 120,
								sortable : true,
								formatter:function(value,row,index){
								     return row.RVU_NAME;
								}
							}, {
								title : 'IP地址',
								align:'center',
								field : 'RVU_IP',
								width : 120,
								sortable : true,
								formatter:function(value,row,index){
								     return row.RVU_IP;
								}
							}, {
								title : '端口号',
								align:'center',
								field : 'RVU_PORT',
								width : 120,
								sortable : true,
								formatter:function(value,row,index){
								     return row.RVU_PORT;
								}
							}, {
								title : '通道数量',
								align:'center',
								field : 'RVU_CHANNEL',
								width : 100,
								sortable : true,
								formatter:function(value,row,index){
								     return row.RVU_CHANNEL;
								}
							}, {
								title : '通讯规约',
								align:'center',
								field : 'COMM_PROT_CODE',
								width : 120,
								sortable : true,
								formatter:function(value,row,index){
								     return row.COMM_PROT_CODE;
								}
							}, {
								title : '安装日期',
								align:'center',
								field : 'RVU_INSTALL_TIME',
								width : 150,
								sortable : true,
								formatter:function(value,row,index){
								     return row.RVU_INSTALL_TIME;
								}
							}, {
								title : '所属建筑',
								align:'center',
								field : 'SUBS_NAME',
								width : 120,
								sortable : true,
								formatter:function(value,row,index){
								     return row.SUBS_NAME;
								}
							}, {
								title : '所属客户',
								align:'center',
								field : 'CONS_NAME',
								width : 120,
								sortable : true,
								formatter:function(value,row,index){
								     return row.CONS_NAME;
								}
							}, {
								title : '安装位置',
								align:'center',
								field : 'INSTALL_PLACE',
								width : 150,
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
							  text : '配置建筑关系',
							  id:'cfgFlashServer',
							  iconCls : 'icon-add',
							  handler : function() {
							    var rows = $('#rvuTable').datagrid('getSelections'); 
							    if(rows.length!=1){  
						            $.messager.alert('提示',"请选择一条视频服务器记录",'info'); 
						            return; 
						        }
						        var consId = $('#consId').val();
						        var rvuId = rows[0].RVU_ID;
						        var url="<%=basePath %>/pages/areaEnergy/baseData/rvuInfo/consSubList.jsp?rvuId="+rvuId+"&consId="+consId;
				    		    OpenWin(url,"配置建筑关系",900,400);
							 }
						},'-',{
								text:'增加视频服务器',
								id:'addFlashServer',
								iconCls:'icon-add',
								handler:function(){
								    var consId = $('#consId').val();
								    var areaNo = $('#areaNo').val();
								    var url = '<%=basePath%>'+'pages/areaEnergy/baseData/tmnlInstall/addflashServer.jsp?consId='+consId+'&areaNo='+areaNo;
                                    OpenWin(encodeURI(url),'新增视频服务器信息',screen.availWidth-400,screen.availHeight-450);
							    }
						},'-',{
								text:'修改视频服务器',
								id:'editFlashServer',
								iconCls:'icon-edit',
								handler:function(){
								    var rows = $('#rvuTable').datagrid('getSelections'); 
	                                if(rows.length!=1){  
	                                    $.messager.alert('提示',"请选择一条视频服务器记录",'info'); 
	                                    return; 
	                                }
	                                var rvuId = rows[0].RVU_ID;
	                                var url = '<%=basePath%>areaEnergyTmnl/getFlashServerInfo.action?rvuId='+rvuId;
                                    OpenWin(encodeURI(url),'新增视频服务器信息',screen.availWidth-400,screen.availHeight-450);
							    }
						},'-',{
								text:'删除视频服务器',
								id:'delFlashServer',
								iconCls:'icon-remove',
								handler:function(){
								    var rows = $('#rvuTable').datagrid('getSelections'); 
						            if(rows.length==0){  
						                $.messager.alert('提示',"请选择你要删除的记录！",'info'); 
						                return; 
						            }
						            $.messager.confirm('提示','确定要删除吗?',function(result){  
						                    if (result){  
						                        var rows = $('#rvuTable').datagrid('getSelections');  
						                        var rvuIdArr = [];  
						                        $.each(rows,function(i,n){
						                            rvuIdArr.push({'rvuId' : n.RVU_ID});
						                        });
						                        //删除客户
						                        var url = "<%=basePath%>areaEnergyTmnl/deleteFlashServerInfo.action";
						                        var para = 'rvuId='+JSON.stringify(rvuIdArr);
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
						                                   $('#rvuTable').datagrid('reload');
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
							$("#addFlashServer").linkbutton("disable");
							$("#editFlashServer").linkbutton("disable");
							$("#delFlashServer").linkbutton("disable");
							$("#cfgFlashServer").linkbutton("disable");
						}
					}
				});	
			});
			
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

