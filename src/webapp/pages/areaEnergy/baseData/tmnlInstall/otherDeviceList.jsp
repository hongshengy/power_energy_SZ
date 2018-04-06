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
		<title>设备列表</title>
		<jsp:include page="/pages/areaEnergy/common/head.jsp"></jsp:include>
	</head>
    <body srolling='no'>
        <!--  
        <form>
        </form>
		<div region="center" border="false">
			<table id="collArchiveTable"></table>
		</div>
		-->
		
		<div id='queryDiv' class="container-shadow" style="width:100%;">
              <div class="easyui-panel" title="设备列表" style="width:100%;padding:0px;">
              	<input type="hidden" id="subsId" name="queryPara.subsId" value="${param.subsId}"/>
              	<input type="hidden" id="deviceType" name="queryPara.deviceType" value="${param.deviceType}"/>
				  <table id="consTmnlTable" ></table>
              </div>
        </div>
	    
	     
	</body>
	<script type="text/javascript">
		$(function() { 
			var subsId = '${param.subsId}';
			var deviceType = '${param.deviceType}';
			queryList();	
		});
		function queryList1(){
			var subsId = '${param.subsId}';
			$('#consTmnlTable').datagrid("load",{
	          "queryPara.subsId" : subsId
   			 });
		}
		function queryList(){
			var subsId = '${param.subsId}';
			var deviceType = '${param.deviceType}';
			var isDevice = '${param.isDevice}';
			$('#consTmnlTable').datagrid({
				height : $(window).height()-$('#queryDiv').height()-2,
				border : false,
				singleSelect : false,
				lazyLoad : true,
				striped : true,
				//collapsible:true,  可折叠
				fitColumns: true,
				url : des.webContextRoot+'areaEnergy/findOtherDeviceList.action',
				sortOrder : 'desc',
				remoteSort : false,
				showFooter : true,
				pageSize : 10,
				queryParams : {"queryPara.subsId" : subsId,"queryPara.deviceType" : deviceType,"queryPara.isDevice" : isDevice},
				columns : [[
				        {   
				            field:'DEVICE_ID',
				            checkbox:true,
				            width : 5,
				            formatter:function(value,row,index){
							     return row.DEVICE_ID;
							}
				        }, {
							title : '设备编号',
							field : 'DEVICE_NO',
							 width : 10,
							sortable : true,
							formatter:function(value,row,index){
							     return row.DEVICE_NO;
							}
						}, {
							title : '设备名称',
							field : 'DEVICE_NAME',
							width : 15,
							sortable : true,
							formatter:function(value,row,index){
							     return row.DEVICE_NAME;
							}
						}, {
							title : '设备分类',
							field : 'DEVICE_TYPE_NAME',
							width : 10,
							sortable : true,
							formatter:function(value,row,index){
							     return row.DEVICE_TYPE_NAME;
							}
						}, {
							title : '安装日期',
							field : 'CREATE_DATE',
							width : 10,
							sortable : true,
							formatter:function(value,row,index){
							     return row.CREATE_DATE;
							}
						}, {
							title : '设备厂家',
							field : 'FACTORY_CODE_NAME',
							width : 10,
							sortable : true,
							formatter:function(value,row,index){
							     return row.FACTORY_CODE_NAME;
							}
						}, {
							title : '出厂日期',
							field : 'MADE_DATE',
							width : 10,
							sortable : true,
							formatter:function(value,row,index){
							     return row.MADE_DATE;
							}
						}, {
							title : '是否电气设备',
							field : 'IS_DEVICE_NAME',
							width : 10,
							sortable : true,
							formatter:function(value,row,index){
							     return row.IS_DEVICE_NAME;
							}
						}, {
							title : '运行状态',
							field : 'RUN_STATUS_NAME',
							width : 10,
							sortable : true,
							formatter:function(value,row,index){
							     return row.RUN_STATUS_NAME;
							}
						}
						]],
				pagination : true,
				rownumbers : true,
				toolbar : [
					{
						text : '新增设备',
						id:"addNewDevice",
						iconCls : 'icon-add',
						handler : function() {
							var deviceType = '${param.deviceType}';
							var subsId = '${param.subsId}';
							var isDevice = '${param.isDevice}';
							var url=des.webContextRoot+"/pages/areaEnergy/baseData/tmnlInstall/createNewOtherDevice.jsp?deviceType="+deviceType+"&subsId="+subsId+"&isDevice="+isDevice;
							var urlZM=des.webContextRoot+"/pages/areaEnergy/baseData/tmnlInstall/createNewLightDevice.jsp?deviceType="+deviceType+"&subsId="+subsId+"&isDevice="+isDevice;
							if(deviceType == 3){
								OpenWin(urlZM,"新增设备",850,515);
							}else{
			    				OpenWin(url,"新增设备",830,350);
							}
						}
					},'-',{
							text:'修改设备',
							id:"editDevice",
							iconCls:'icon-edit',
							handler:function(){
							    var rows = $('#consTmnlTable').datagrid('getSelections'); 
							    if(rows.length!=1){  
						            $.messager.alert('提示',"请选择一条要修改的数据",'info'); 
						            return; 
						        }
						        var subsId = '${param.subsId}';
							    var deviceType = '${param.deviceType}';
						        var url=des.webContextRoot+"areaEnergy/modifyOtherDeviceInfo.action?queryPara.deviceId="+rows[0].DEVICE_ID+"&subsId="+subsId+"&queryPara.deviceType="+deviceType;
							    //OpenWin(url,"修改测点",830,350);
			                    var isDevice = '${param.isDevice}';
			                    var nodeType="";
			                    if(isDevice=='1' && deviceType=='4'){
			                        nodeType="ELECOTHERSELF";
			                    }
			                    if(isDevice=='0' && deviceType=='1'){
			                        nodeType="EMSELF";
			                    }
			                    if(isDevice=='0' && deviceType=='2'){
			                        nodeType="ACSELF";
			                    }
			                    if(isDevice=='0' && deviceType=='3'){
			                        nodeType="LIGHTSELF";
			                    }
			                    if(isDevice=='0' && deviceType=='4'){
			                        nodeType="NONELECOTHERSELF";
			                    }
							    parent.com.frontier.areaEnergy.baseData.reloadTree.clickTreeNode(rows[0].DEVICE_ID+','+nodeType+','+subsId);
						    }
					},'-',{
							text:'删除设备',
							id:"deleteDevice",
							iconCls:'icon-remove',
							handler:function(){
							    var rows = $('#consTmnlTable').datagrid('getSelections'); 
							    if(rows.length==0){  
						            $.messager.alert('提示',"请选择你要删除的设备",'info'); 
						            return; 
						        }
							    $.messager.confirm('提示','确定要删除吗?',function(result){  
							            if (result){  
							                var rows = $('#consTmnlTable').datagrid('getSelections');  
							                var deviceIdArr = [];  
							                $.each(rows,function(i,n){
							                    deviceIdArr.push({'DEVICE_ID' : n.DEVICE_ID});
							                });
							                //删除客户
							                var url = des.webContextRoot+"areaEnergy/deleteOtherDevice.action";
							                var para = 'deviceIds='+JSON.stringify(deviceIdArr);
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
								                        $('#consTmnlTable').datagrid('reload');
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
						$("#addNewDevice").linkbutton("disable");
						$("#editDevice").linkbutton("disable");
						$("#deleteDevice").linkbutton("disable");
					}
				}
			});
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
		
		function saveTmnlInfo() {
			if(isValid()){
				$.messager.confirm('确认','确认想要修改终端信息吗？',function(r) {
					if (r) {
						$.messager.progress();
						$('#thisform').form('submit',{
						url :'<%=basePath%>areaEnergy/saveConsTmnlInfo.action',    
					    success:function(res){    
					    	 $.messager.progress('close');
					        if (res != "" && res != null) {
			                	if(res == "tmnlAssetNoRepeat"){
			                		$.messager.confirm('确认','输入的终端资产号已经被使用了，请重新输入');
			                	}else if(res == "createTmnlError"){
			                		$.messager.confirm('确认','数据库异常，终端修改失败！');
			                	}else if(res == "ok"){
			                		$.messager.confirm('确认','终端修改成功!',function(){
			                			modifyTmnlInfo(true);
			                		});
			                	}else{
			                		$.messager.confirm('确认','系统异常!');
			                	}
			                }else{
			                    	$.messager.confirm('确认','系统异常!');
		                    }
		    
					    }    
					}); 
			    }    
			}); 
			}
		}
		function isValid(){
			var tmnlAssetNo = $("#tmnlAssetNo").val();
			if(!(tmnlAssetNo.length==10 && onlyNumInput(tmnlAssetNo))){
				$.messager.confirm('确认','终端资产号只能是10位数字!');
				return false;
			}
			return true;
		}
		function onlyNumInput(numObj){
			var reg = new RegExp("^[0-9]$");
			if(numObj != "" && numObj != null){
				for(var i=0;i<numObj.length;i++){
		            var aav = numObj.charAt(i);
		            if(!reg.test(aav)){
		                return false;
		            }
		        }
		        return true;
			}
		}
		function modifyMPInfo(){
			var rows = $('#collArchiveTable').datagrid('getSelections'); 
		    if(rows.length!=1){  
	            $.messager.alert('提示',"请选择一条要修改的数据",'info'); 
	            return; 
	        }
	        //var row = $('#collArchiveTable').datagrid('getSelected'); 
	        //alert(rows[0].MP_ID);
	        var url=des.webContextRoot+"areaEnergy/modifyMpInfo.action?queryPara.mpId="+rows[0].MP_ID;
		    OpenWin(url,"修改测点",420,300);
		}
	</script>    
</html>