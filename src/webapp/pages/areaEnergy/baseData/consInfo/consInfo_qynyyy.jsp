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
    
    <title>客户信息</title>
    <link rel="stylesheet" type="text/css"
			href="<%=basePath%>/pages/areaEnergy/common/jquery-easyui-1.5.1/themes/fangtian/easyui.css">
		<link rel="stylesheet" type="text/css"
			href="<%=basePath%>/pages/areaEnergy/common/jquery-easyui-1.5.1/themes/icon.css">
		<link rel="stylesheet" type="text/css"
			href="<%=basePath%>/pages/areaEnergy/common/jquery-easyui-1.5.1/themes/color.css">
		<link rel="stylesheet" type="text/css"
			href="<%=basePath%>/pages/areaEnergy/common/css/common.css">
		<link rel="stylesheet" type="text/css"
			href="<%=basePath%>/pages/areaEnergy/common/css/lightbox.min.css" />
		<link type="text/css" rel="stylesheet"
			href="<%=basePath%>css/aueic.css" />
		<script type="text/javascript"
			src="<%=basePath%>/pages/areaEnergy/common/jquery-easyui-1.5.1/jquery.min.js"></script>
		<script type="text/javascript"
			src="<%=basePath%>/pages/areaEnergy/common/jquery-easyui-1.5.1/jquery.easyui.min.js"></script>
		<script type="text/javascript"
			src="<%=basePath%>/pages/areaEnergy/common/jquery-easyui-1.5.1/easyui-lang-zh_CN.js"></script>
		<script type="text/javascript"
			src="<%=basePath%>/pages/areaEnergy/common/jquery-easyui-1.5.1/datagrid-detailview.js"></script>
        <script type="text/javascript">
		    $(function() {
		    	var roleCode = parent.$("#roleCode").val();
		    	
		    	$('#orgNo').combotree({
					url :'<%=basePath%>capacityData/queryPowerCompany.action?queryPara.orgId=32101&queryPara.parentId=0',
					onLoadSuccess : function(node, data){
					    $(this).tree('collapseAll');
					}
			  	}); 
		    	
		    	$('#TRADE_CODE').combotree({
					url :'<%=basePath%>areaEnergy/tradeCombox.action',
					onLoadSuccess : function(node,data){
					    $(this).tree('collapseAll');
					}
		    	});
		    	 
		        var lineConsId = '${param.lineConsId}';
		        var isEdit = parent.$("#isEdit").val();
				modifyTmnlInfo(true);
				var gridH = $('body').height()-$('#consDiv').height()-50-20;
				if(gridH<200){
				   gridH = 200;
				}
				$('#consSubTable').datagrid({
					height : gridH,
					width : $('body').width()-5,
					border : false,
					title : '建筑列表',
					singleSelect : false,
					lazyLoad : true,
					striped : true,
					fitColumns: true,
					url : '<%=basePath%>areaEnergy/findConsSubList.action',
					sortOrder : 'desc',
					remoteSort : false,
					showFooter : true,
					pageSize : 50,
					queryParams : {"consId" : $('#consId').val(), "roleCode" : roleCode},
					columns : [[
					        {   
					            field:'tmnlId',
					            align:'center',
					            checkbox:true,
					            width:5,
					            formatter:function(value,row,index){
								     return row.tmnlId;
								}
					        }, {
								title : '建筑编号',
								align : 'center',
								field : 'subsId',
								width : 10,
								sortable : true,
								formatter:function(value,row,index){
								     return row.subsId;
								}
							}, {
								title : '建筑名称',
								align:'center',
								field : 'subsName',
								width : 10,
								sortable : true,
								formatter:function(value,row,index){
								     return row.subsName;
								}
							}, {
								title : '建筑类型',
								align:'center',
								field : 'subTypeName',
								width : 10,
								sortable : true,
								formatter:function(value,row,index){
								     return row.subTypeName;
								}
							}, {
								title : '电压等级',
								align:'center',
								field : 'voltLevel',
								width : 10,
								sortable : true,
								formatter:function(value,row,index){
								     return row.voltLevel;
								}
							}, {
								title : '运行状态',
								align:'center',
								field : 'runStatus',
								width : 5,
								sortable : true,
								formatter:function(value,row,index){
								     return row.runStatus;
								}
							}, {
								title : '经度',
								align:'center',
								field : 'xx',
								width : 5,
								sortable : true,
								formatter:function(value,row,index){
								     return row.xx;
								}
							}, {
								title : '纬度',
								align:'center',
								field : 'yy',
								width : 5,
								sortable : true,
								formatter:function(value,row,index){
								     return row.yy;
								}
							}, {
								title : '所属终端',
								align:'center',
								field : 'tmnlAssetNo',
								width : 15,
								sortable : true,
								formatter:function(value,row,index){
								     //return row.tmnlAssetNo;
								     return '<span title='+row.tmnlAssetNo+'>'+row.tmnlAssetNo+'</span>';
								}
							}, {
								title : '建档日期',
								align:'center',
								field : 'createDate',
								width : 10,
								sortable : true,
								formatter:function(value,row,index){
								     return row.createDate;
								}
							}, {
								title : '建筑类型',
								hidden : 'true',
								align:'center',
								field : 'subType',
								width : 0,
								sortable : true,
								formatter:function(value,row,index){
								     return row.subType;
								}
							}
					]],
					pagination : true,
					rownumbers : true,
					toolbar : [
						{
							text : '增加建筑',
							id : 'newConsSub',
							iconCls : 'icon-add',
							handler : function() {
								var consId = $('#consId').val();
								var voltCode = $('#voltCode').val();
								var areaNo = $('#areaNo').val();
								var url="<%=basePath %>/pages/areaEnergy/baseData/consInfo/consSub.jsp?areaNo="+areaNo+"&roleCode="+roleCode+"&consId="+consId+"&voltCode="+voltCode;
					    		OpenWin(url,"新增建筑",600,400);
							}
						},'-',{
								text:'删除建筑',
								id : 'delConsSub',
								iconCls:'icon-remove',
								handler:function(){
								    var rows = $('#consSubTable').datagrid('getSelections'); 
								    var allrows = $('#consSubTable').datagrid('getRows');
								    if (rows.length == 0) {  
							            $.messager.alert('提示',"请选择你要删除的建筑",'info'); 
							            return; 
							        }
							        if (allrows.length < 2) {  
							            $.messager.alert('提示',"建筑的记录大于一条时才能删除",'info'); 
							            return; 
							        }
							        if (rows.length == allrows.length) {
							        	$.messager.alert('提示',"至少保留一条记录",'info'); 
							            return;
							        }
								    $.messager.confirm('提示','确定要删除吗?',function(result){  
								            if (result){  
								                var rows = $('#consSubTable').datagrid('getSelections');  
								                var subsIdArr = [];  
								                $.each(rows,function(i,n){
								                    subsIdArr.push({'subsId' : n.subsId});
								                });
								                //删除客户
								                var url = "<%=basePath %>areaEnergy/deleteConsSub.action";
								                var para = 'subs='+JSON.stringify(subsIdArr);
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
									                        //$('#consSubTable').datagrid('reload');
									                        parent.com.frontier.areaEnergy.baseData.reloadTree.flushAndClickCurrentNode();
									                     }
									                }
									            });
								            }  
								    });
							    }
						},'-',{
								text:'修改建筑',
								id : 'editConsSub',
								iconCls:'icon-edit',
								handler:function(){
								    var rows = $('#consSubTable').datagrid('getSelections'); 
								    if(rows.length!=1){  
							            $.messager.alert('提示',"请选择一条建筑记录",'info'); 
							            return; 
							        }
							        var subsId = rows[0].subsId;
							        var subType = rows[0].subType;
							        var subTypeName = 'CONSSUB';
							        if(subType=='2'){
							            subTypeName = 'CONSBUILD';
							        }else if(subType=='3'){
							            subTypeName = 'CONSDEPART';
							        }else if(subType=='6'){
							            subTypeName = 'ELECSUB';
							        }
							        parent.com.frontier.areaEnergy.baseData.reloadTree.clickTreeNode(subsId+','+subTypeName+','+$('#consId').val());
							        /*var url="<%=basePath %>/pages/areaEnergy/baseData/consInfo/editConsSub.jsp?subsId="+subsId;
					    		    OpenWin(url,"修改建筑",600,400);*/
							    }
						},'-',{
								text:'配置终端关系',
								id : 'cfgConsSub',
								iconCls:'icon-edit',
								handler:function(){
								    var rows = $('#consSubTable').datagrid('getSelections'); 
								    if(rows.length!=1){  
							            $.messager.alert('提示',"请选择一条建筑记录",'info'); 
							            return; 
							        }
							        var consId = $('#consId').val();
							        var subsId = rows[0].subsId;
							        var tmnlAssetNo = rows[0].tmnlAssetNo;
							        var areaNo = $('#areaNo').val();
							        var url="<%=basePath %>/pages/areaEnergy/baseData/consInfo/consTmnlList.jsp?roleCode="+roleCode+"&tmnlAssetNo="+tmnlAssetNo+"&subsId="+subsId+"&consId="+consId+"&areaNo="+areaNo;
					    		    OpenWin(url,"配置终端关系",900,600);
							    }
						},'-',{
								text:'解除终端关系',
								id : 'removeConsSub',
								iconCls:'icon-edit',
								handler:function(){
								    var rows = $('#consSubTable').datagrid('getSelections'); 
								    if(rows.length==0){  
							            $.messager.alert('提示',"请选择需要解除的建筑",'info'); 
							            return; 
							        }
									$.messager.confirm('提示','确定要解除吗?',function(result){  
							            if (result){  
							                var rows = $('#consSubTable').datagrid('getSelections');  
							                //var tmnlIdArr = [];
							                var subsIdArr = [];
							                $.each(rows,function(i,n){
							                    //tmnlIdArr.push({'TERMINAL_ID' : n.tmnlId});
							                    subsIdArr.push({'subsId' : rows[i].subsId});
							                });
							                var url = "<%=basePath%>areaEnergy/removeConsSubsRelaYh.action";
							                var para = 'subsIds='+JSON.stringify(subsIdArr);
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
						if(isEdit == 'false'){
							$("#newConsSub").linkbutton("disable");
							$("#delConsSub").linkbutton("disable");
							$("#editConsSub").linkbutton("disable");
							$("#cfgConsSub").linkbutton("disable");
							$("#removeConsSub").linkbutton("disable");
							$("#modifyRealBtn").linkbutton("disable");
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
			
			function modifyTmnlInfo(saveFlag){
			   $("#consNo").textbox({disabled:saveFlag});
			   $("#consName").textbox({disabled:saveFlag});
			   $("#voltCode").combobox({disabled:saveFlag});
			   $("#contractCap").textbox({disabled:saveFlag});
			   $("#telephone").textbox({disabled:saveFlag});
			   $("#contactName").textbox({disabled:saveFlag}); 
			   //$("#userType").combobox({disabled:saveFlag});
			   $("#statusCode").combobox({disabled:saveFlag});
			   $("#x").textbox({disabled:saveFlag}); 
			   $("#y").textbox({disabled:saveFlag});
			   $("#startDate").textbox({disabled:saveFlag});
			   $("#endDate").textbox({disabled:saveFlag});
			   $("#stopDate").textbox({disabled:saveFlag});
			   $("#elecAddr").textbox({disabled:saveFlag});
			   $("#remark").textbox({disabled:saveFlag});
			   $("#telephone1").textbox({disabled:saveFlag});
			   $("#contactName1").textbox({disabled:saveFlag});
			   $("#telephone2").textbox({disabled:saveFlag});
			   $("#contactName2").textbox({disabled:saveFlag});
			   $("#telephone3").textbox({disabled:saveFlag});
			   $("#contactName3").textbox({disabled:saveFlag});
			   $("#telephone4").textbox({disabled:saveFlag});
			   $("#contactName4").textbox({disabled:saveFlag});
			   $("#telephone5").textbox({disabled:saveFlag});
			   $("#contactName5").textbox({disabled:saveFlag});
			   $("#areaConsName").textbox({disabled:saveFlag});
			   
			   $("#USER_CHECK_COS").textbox({disabled:saveFlag});
			   $("#P_TEST_DATE").textbox({disabled:saveFlag});
			   $("#TRADE_CODE").combotree({disabled:saveFlag});
			   $("#orgNo").combotree({disabled:saveFlag});
			   
			   if(saveFlag == false){
				   $("#saveBtn").css("display","block");
				   $("#modifyBtn").css("display","none");
			   }else{
			   	   $("#saveBtn").css("display","none");
				   $("#modifyBtn").css("display","block");
			   }
			   
    			$("input[id^='telephone']").parent().find("span input:eq(0)").blur(function(){
					var mobile = $.trim($(this).val());
					checkPhoneNum(mobile);
				});
			}
			
			function checkPhoneNum(mobile) {
				var isMobile = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(14[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
				var isPhone = /^(?:(?:0\d{2,3})-)?(?:\d{7,8})(-(?:\d{3,}))?$/;
				var error = "请正确填写电话号码，例如：13415764178或0321-4816048！";
				if (mobile != "" && mobile.substring(0,1) == 1) {
					if (!isMobile.exec(mobile) && mobile.length != 11) {
						alert(error);
						return false;
					} 
				} else if (mobile != "" && mobile.substring(0,1) == 0) {
					if (!isPhone.exec(mobile)) {
						alert(error);
						return false;
					} 
				} else if (mobile != "" && mobile != "请输入电话号码"){
					alert(error);
					return false;
				}
				
				return true;
			}
			
			function doEdit(){
			    var isValid = $('#thisform').form('validate');
			    var mobile = $.trim($("#telephone").parent().find("span input:eq(0)").val());
			    var mobile1 = $.trim($("#telephone1").parent().find("span input:eq(0)").val());
			    var mobile2 = $.trim($("#telephone2").parent().find("span input:eq(0)").val());
			    var mobile3 = $.trim($("#telephone3").parent().find("span input:eq(0)").val());
			    var mobile4 = $.trim($("#telephone4").parent().find("span input:eq(0)").val());
			    var mobile5 = $.trim($("#telephone5").parent().find("span input:eq(0)").val());
				
				if(isValid  && checkPhoneNum(mobile) && checkPhoneNum(mobile1) && checkPhoneNum(mobile2) &&
					checkPhoneNum(mobile3) && checkPhoneNum(mobile4) && checkPhoneNum(mobile5)){
		        	$.messager.confirm("提示","确定保存信息吗？",doSave);
		        }
			}
			
			//回调函数
			function doSave(result){
				if(result) {
					  var para='consId='+${resultMap.CONS_ID}+'&consNo='+$('#consNo').textbox('getValue')+'&consName=' + $('#consName').textbox('getValue')+
					  '&voltCode=' + $('#voltCode').combobox('getValue')+"&contractCap="+$('#contractCap').textbox('getValue')+
					  "&orgNo="+$('#orgNo').combobox('getValue')+"&telephone="+$('#telephone').textbox('getValue')+
					  "&contactName="+$('#contactName').textbox('getValue')+"&userType="+$('#userType').combobox('getValue')+
					  "&statusCode="+$('#statusCode').combobox('getValue')+"&x="+$('#x').textbox('getValue')+
					  "&y="+$('#y').textbox('getValue')+"&startDate="+$('#startDate').textbox('getValue')+
					  "&endDate="+$('#endDate').textbox('getValue')+"&stopDate="+$('#stopDate').textbox('getValue')+
					  "&elecAddr="+$('#elecAddr').textbox('getValue')+"&remark="+$('#remark').textbox('getValue')+
					  "&areaNo="+$('#areaNo').val()+"&areaConsName="+$('#areaConsName').textbox('getValue')+
					  "&contactName1="+$('#contactName1').textbox('getValue')+"&telephone1="+$('#telephone1').textbox('getValue')+
					  "&contactName2="+$('#contactName2').textbox('getValue')+"&telephone2="+$('#telephone2').textbox('getValue')+
					  "&contactName3="+$('#contactName3').textbox('getValue')+"&telephone3="+$('#telephone3').textbox('getValue')+
					  "&contactName4="+$('#contactName4').textbox('getValue')+"&telephone4="+$('#telephone4').textbox('getValue')+
					  "&contactName5="+$('#contactName5').textbox('getValue')+"&telephone5="+$('#telephone5').textbox('getValue')+
					  "&USER_CHECK_COS="+$('#USER_CHECK_COS').textbox('getValue')+"&P_TEST_DATE="+$('#P_TEST_DATE').textbox('getValue')+
					  "&TRADE_CODE="+$('#TRADE_CODE').combobox('getValue');
					$.ajax({
						url : '<%=basePath%>areaEnergy/updateSfCons.action',
						type: "post",
						dataType:"text",
						data : para,
						timeout:60000,
						error : function (XMLHttpRequest, textStatus, errorThrown) {
						//去除遮罩
						disWaitDisplayForQuery();
						    $.messager.confirm("提示","保存失败");
						},
						success : function(res) {
								if (res != "" && res != null) {
									 if (res == "error"){
									 	$.messager.confirm("提示","保存失败");
									 }else if(res == "repeat"){
									 	$.messager.confirm("提示","客户编号已存在");
									}else{
									 	$.messager.confirm("提示","保存成功",function(){
									 		parent.com.frontier.areaEnergy.baseData.reloadTree.flushAndClickCurrentNode();
									 	});
									}
								}
							}
						});
					}
			}
			
			///////////////////////////////////////////////////////////////////////子客户信息编辑
			function modifyTmnlInfo1(saveFlag){
			   $("#consNo1").textbox({disabled:saveFlag});
			   $("#consName1").textbox({disabled:saveFlag});
			   $("#voltCode1").combobox({disabled:saveFlag});
			   $("#contractCap1").textbox({disabled:saveFlag});
			   $("#orgNo1").textbox({disabled:saveFlag});
			   $("#telephone1").textbox({disabled:saveFlag});
			   $("#contactName1").textbox({disabled:saveFlag}); 
			   //$("#userType").combobox({disabled:saveFlag});
			   $("#statusCode1").combobox({disabled:saveFlag});
			   $("#x1").textbox({disabled:saveFlag}); 
			   $("#y1").textbox({disabled:saveFlag});
			   $("#startDate1").textbox({disabled:saveFlag});
			   $("#endDate1").textbox({disabled:saveFlag});
			   $("#stopDate1").textbox({disabled:saveFlag});
			   $("#elecAddr1").textbox({disabled:saveFlag});
			   $("#remark1").textbox({disabled:saveFlag});
			   if(saveFlag == false){
				   $("#saveBtn1").css("display","block");
				   $("#modifyBtn1").css("display","none");
			   }else{
			   	   $("#saveBtn1").css("display","none");
				   $("#modifyBtn1").css("display","block");
			   }
			}
			
			function doEdit1(){
			    $.messager.confirm("提示","确定保存信息吗？",doSave1);
			}
			
			//回调函数
			function doSave1(result){
				if(result) {
					var para='consId='+'${param.lineConsId}'+'&consNo='+$('#consNo1').textbox('getValue')+'&consName=' + $('#consName1').textbox('getValue')+
					  '&voltCode=' + $('#voltCode1').combobox('getValue')+"&contractCap="+$('#contractCap1').textbox('getValue')+
					  "&orgNo="+$('#orgNo1').textbox('getValue')+"&telephone="+$('#telephone1').textbox('getValue')+
					  "&contactName="+$('#contactName1').textbox('getValue')+"&userType="+$('#userType1').combobox('getValue')+
					  "&statusCode="+$('#statusCode1').combobox('getValue')+"&x="+$('#x1').textbox('getValue')+
					  "&y="+$('#y1').textbox('getValue')+"&startDate="+$('#startDate1').textbox('getValue')+
					  "&endDate="+$('#endDate1').textbox('getValue')+"&stopDate="+$('#stopDate1').textbox('getValue')+
					  "&elecAddr="+$('#elecAddr1').textbox('getValue')+"&remark="+$('#remark1').textbox('getValue')+
					  "&USER_CHECK_COS="+$('#USER_CHECK_COS').textbox('getValue')+"&P_TEST_DATE="+$('#P_TEST_DATE').textbox('getValue')+
					  "&TRADE_CODE="+$('#TRADE_CODE').combobox('getValue');
					$.ajax({
						url : '<%=basePath%>areaEnergy/updateSfCons.action',
						type: "post",
						dataType:"text",
						data : para,
						timeout:60000,
						error : function (XMLHttpRequest, textStatus, errorThrown) {
						//去除遮罩
						disWaitDisplayForQuery();
						    $.messager.confirm("提示","保存失败");
						},
						success : function(res) {
								if (res != "" && res != null) {
									 if (res == "error"){
									 	$.messager.confirm("提示","保存失败");
									 }else{
									 	$.messager.confirm("提示","保存成功",function(){
									 		parent.com.frontier.areaEnergy.baseData.reloadTree.flushAndClickCurrentNode();
									 	});
									}
								}
							}
						});
					}
			}
	    </script>
	    <style type="text/css">
		   .datagrid-cell,.datagrid-cell-group,.datagrid-header-rownumber,.data-cell-rownumber{
		      text-overflow:ellipsis;
		   }
		</style>
	</head>
	<body srolling='no'>
	    <input type="hidden" name='lineConsId' id='lineConsId' value="${param.lineConsId}">
	    <div id="tt" class="easyui-tabs" style="width:100%;height:100%;">   
		    <div title="电力客户" style="">  
		        <div id="consDiv" class="easyui-panel" title="客户信息" style="border: 0; height:570px; width:100%;overflow: auto; background: #fafafa;padding:0">
				  <form id="thisform" method="post">
				    <input type="hidden" name='queryPara.consId' id='consId' value="${resultMap.CONS_ID}">
				    <input id="areaNo" type="hidden" name="queryPara.areaNo" value="${resultMap.AREA_NO}">
				    <input id="orgNo" type="hidden" name="queryPara.orgNo" value="${resultMap.ORG_NO}">
					<table class="form-table" style="width: 100%;">
						<tbody valign="top">
							<tr>
								<td>
									<table style="width: 100%;" border="0">
										<tbody>
											<tr>
												<td class="td-label" align="center">
													客户编号
												</td>
												<td>
													<input id="consNo" name="queryPara.consNo" value="${resultMap.CONS_NO}" maxLength='10' 
														size="27" class="easyui-textbox"
														data-options="validType:'length[1,12]',required:true,missingMessage:'请输入客户编号'">
													<font style="color: red;">*</font>
												</td>
												<td class="td-label" align="center">
													电力营销户名
												</td>
												<td>
													<input id="areaConsName" name="queryPara.areaConsName" value="${resultMap.AREA_CONS_NAME}" size="27"
														   class="easyui-textbox"
														   data-options="required:true,missingMessage:'请输入电力营销户名'">
													<font style="color: red;">*</font>
												</td>
												<td class="td-label" align="center" nowrap="nowrap">
													服务中心
												</td>
												<td colspan="3" width="25%">
													<table>
														<tr>
															<td>
																<input id="areaNoCons" disabled="disabled" value="${resultMap.AREA_NO}"
																	size="27" >
																<font style="color: red;">*</font>
															</td>
														</tr>
													</table>
												</td>
											</tr>
											<tr>
												<td class="td-label" align="center">
													合同容量
												</td>
												<td>
													<input id="contractCap" name="queryPara.contractCap" value='${resultMap.CONTRACT_CAP}'
														size="27" class="easyui-numberbox"
														data-options="required:true,missingMessage:'请输入合同容量',precision:6,validType:'length[1,16]'">
													<font style="color: red;">*</font>
												</td>
												<td class="td-label" align="center">
													企业客户名称
												</td>
												<td>
													<input id="consName" name="queryPara.consName" value="${resultMap.CONS_NAME}" size="27"
														   class="easyui-textbox"
														   data-options="required:true,missingMessage:'请输入客户名称'">
													<font style="color: red;">*</font>
												</td>
												<td class="td-label" align="center">
													客户状态
												</td>
												<td colspan="3">
													<table>
														<tr>
															<td>
															    <!--  
																<select id="statusCode" class="easyui-combobox" value="${resultMap.STATUS_CODE}" 
																	    name="queryPara.statusCode" data-options="width:198,panelHeight:'auto',editable:false">
																	<option value="1">正常用户</option>
																	<option value="2">已销户</option>
																</select>
																-->
																<input id="statusCode" value="${resultMap.STATUS_CODE}" name="queryPara.statusCode" 
																    class="easyui-combobox" data-options="width:198,panelHeight:'auto',editable:false,
																	valueField: 'label',
																	textField: 'value',
																	data: [{
																		label: '1',
																		value: '正常客户'
																	},{
																		label: '2',
																		value: '已销户'
																	}]" />
																<font style="color: red;">*</font>
															</td>
														</tr>
													</table>
												</td>
											</tr>
											<tr>
												<td class="td-label" align="center">
													客户类型
												</td>
												<td colspan="1">
													<select id="userType" name="queryPara.userType" value="${resultMap.USER_TYPE}" class="easyui-combobox" data-options="width:198,panelHeight:'auto',editable:false"
														    disabled="true">
														<option value="1">电力客户</option>
														<option value="2">子客户</option>
													</select>
													<font style="color: red;">*</font>
												</td>
												<td class="td-label" align="center">
													电压等级
												</td>
												<td>
													<input id="voltCode" name="queryPara.voltCode" value="${resultMap.VOLT_CODE}"
														size="27" validType="comboxValidate['请选择电压等级']">
													<font style="color: red;">*</font>
												</td>
												<td class="td-label" align="center">
													客户地址
												</td>
												<td>
													<input id="elecAddr" name="queryPara.elecAddr" value='${resultMap.ELEC_ADDR}' size="27"
														class="easyui-textbox"
														data-options="required:true,missingMessage:'请输入客户地址'">
													<font style="color: red;">*</font>
												</td>
											</tr>
											<tr>
												<td class="td-label" align="center" nowrap="nowrap">
													服务开始时间
												</td>
												<td>
													<input class="easyui-datebox" size="27" id="startDate" value='${resultMap.START_DATE}'
														name="queryPara.startDate"
														data-options="required:true,missingMessage:'请选择服务开始时间'">
													<font style="color: red;">*</font>
												</td>
												<td class="td-label" align="center">
													服务结束时间
												</td>
												<td>
													<input class="easyui-datebox" size="27" id="endDate" value='${resultMap.END_DATE}'
														name="queryPara.endDate"
														data-options="required:true,missingMessage:'请选择服务结束时间'">
													<font style="color: red;">*</font>
												</td>
												<td class="td-label" align="center">
													安装时间
												</td>
												<td colspan="3">
													<input class="easyui-datebox" size="27" id="stopDate" value='${resultMap.STOP_DATE}'
														name="queryPara.stopDate"
														data-options="required:true,missingMessage:'请选择安装时间'">
													<font style="color: red;">*</font>
												</td>
											</tr>
											<tr>
												<td class="td-label" align="center">
													经度
												</td>
												<td>
													<input id="x" name="queryPara.x" size="27" value="${resultMap.X}" class="easyui-numberbox"
														class="easyui-textbox" data-options="missingMessage:'请输入经度',required:true,precision:14,validType:'length[0,18]'">
													<font style="color: red;">*</font>
												</td>
												<td class="td-label" align="center">
													纬度
												</td>
												<td>
													<input id="y" name="queryPara.y" size="27" value="${resultMap.Y}" class="easyui-numberbox" 
													data-options="missingMessage:'请输入纬度',required:true,precision:14,validType:'length[0,18]'"
													>
													<font style="color: red;">*</font>
												</td>
												<td class="td-label" align="center" nowrap="nowrap">
													考核功率因数
												</td>
												<td width="25%">
													<input id="USER_CHECK_COS" name="queryPara.USER_CHECK_COS" size="27" value="${resultMap.USER_CHECK_COS}"
														class="easyui-numberbox" data-options="validType:'length[0,10]',missingMessage:'请输入考核功率因数',required:true,precision:4">
													<font style="color: red;">*</font>
												</td>
											</tr>
											<tr>
												<td class="td-label" align="center" nowrap="nowrap">
													预防性试验日期
												</td>
												<td width="25%">
													<input class="easyui-datebox" size="27" id="P_TEST_DATE" value="${resultMap.P_TEST_DATE}"
														name="queryPara.P_TEST_DATE"editable='false'
														data-options="required:true,missingMessage:'请选择预防性试验日期'">
													<font style="color: red;">*</font>
												</td>
												<td class="td-label" align="center" nowrap="nowrap">
													行业分类
												</td>
												<td width="25%">
													<input id="TRADE_CODE" name="queryPara.TRADE_CODE" value="${resultMap.TRADE_CODE}"
														size="27" validType="comboxValidate['请选择行业分类']"  >
													<font style="color: red;">*</font>
												</td>
												<td class="td-label" align="center">
												</td>
											</tr>
											<tr>
												<td colspan="6">
													<fieldset
														style="padding: 5px 5px 5px 5px; background-color: #fff;">
														<legend>
															<font style="font-size: 12px; font-weight: bold;">联系信息</font>
														</legend>
														<table width="100%" cellspacing="8px" cellpadding="0"
															border="0">
															<tr>
																<td class="td-label" align="center">
																	联系人
																</td>
																<td>
																	<input id="contactName" name="queryPara.contactName" value="${resultMap.CONTACT_NAME}"
																		size="27" class="easyui-textbox"
																		data-options="required:true,missingMessage:'请输入联系人'">
																	<font style="color: red;">*</font>
																</td>
																<td class="td-label" align="center">
																	联系电话
																</td>
																<td>
																	<input id="telephone" name="queryPara.telephone" value="${resultMap.TELEPHONE}"
																		size="27" class="easyui-textbox"
																		data-options="validType:'length[1,15]',prompt:'请输入电话号码',missingMessage:'请输入电话号码', required:true">
																	<font style="color: red;">*</font>
																</td>
															</tr>
															<tr>
																<td class="td-label" align="center">
																	联系人1
																</td>
																<td>
																	<input id="contactName1" name="queryPara.contactName1" value="${resultMap.CONTACT_NAME1}"
																		size="27" class="easyui-textbox"
																		data-options="required:false,missingMessage:'请输入联系人'"">
																</td>
																<td class="td-label" align="center">
																	联系电话1
																</td>
																<td>
																	<input id="telephone1" name="queryPara.telephone1" value="${resultMap.TELEPHONE1}"
																		size="27" class="easyui-textbox"
																		data-options="validType:'length[1,15]',prompt:'请输入电话号码',missingMessage:'请输入电话号码', required:false">
																</td>
															</tr>
															<tr>
																<td class="td-label" align="center">
																	联系人2
																</td>
																<td>
																	<input id="contactName2" name="queryPara.contactName2" value="${resultMap.CONTACT_NAME2}"
																		size="27" class="easyui-textbox"
																		data-options="required:false,missingMessage:'请输入联系人'"">
																</td>
																<td class="td-label" align="center">
																	联系电话2
																</td>
																<td>
																	<input id="telephone2" name="queryPara.telephone2" value="${resultMap.TELEPHONE2}"
																		size="27" class="easyui-textbox"
																		data-options="validType:'length[1,15]',prompt:'请输入电话号码',missingMessage:'请输入电话号码', required:false">
																</td>
															</tr>
															<tr>
																<td class="td-label" align="center">
																	联系人3
																</td>
																<td>
																	<input id="contactName3" name="queryPara.contactName3" value="${resultMap.CONTACT_NAME3}"
																		size="27" class="easyui-textbox"
																		data-options="required:false,missingMessage:'请输入联系人'"">
																</td>
																<td class="td-label" align="center">
																	联系电话3
																</td>
																<td>
																	<input id="telephone3" name="queryPara.telephone3" value="${resultMap.TELEPHONE3}"
																		size="27" class="easyui-textbox"
																		data-options="validType:'length[1,15]',prompt:'请输入电话号码',missingMessage:'请输入电话号码', required:false">
																</td>
															</tr>
															<tr>
																<td class="td-label" align="center">
																	联系人4
																</td>
																<td>
																	<input id="contactName4" name="queryPara.contactName4" value="${resultMap.CONTACT_NAME4}"
																		size="27" class="easyui-textbox"
																		data-options="required:false,missingMessage:'请输入联系人'"">
																</td>
																<td class="td-label" align="center">
																	联系电话4
																</td>
																<td>
																	<input id="telephone4" name="queryPara.telephone4" value="${resultMap.TELEPHONE4}"
																		size="27" class="easyui-textbox"
																		data-options="validType:'length[1,15]',prompt:'请输入电话号码',missingMessage:'请输入电话号码', required:false">
																</td>
															</tr>
															<tr>
																<td class="td-label" align="center">
																	联系人5
																</td>
																<td>
																	<input id="contactName5" name="queryPara.contactName5" value="${resultMap.CONTACT_NAME5}"
																		size="27" class="easyui-textbox"
																		data-options="required:false,missingMessage:'请输入联系人'">
																</td>
																<td class="td-label" align="center">
																	联系电话5
																</td>
																<td>
																	<input id="telephone5" name="queryPara.telephone5" value="${resultMap.TELEPHONE5}"
																		size="27" class="easyui-textbox"
																		data-options="validType:'length[1,15]',prompt:'请输入电话号码',missingMessage:'请输入电话号码', required:false">
																</td>
															</tr>
														</table>
													</fieldset>
												</td>
											</tr>
											<tr>
												<td class="td-label" align="center">
													备注
												</td>
												<td>
												    <textarea style="display:none" id='tx'>${resultMap.REMARK}</textarea>
													<input class="easyui-textbox" multiline="true" id="remark" value="${resultMap.REMARK}"
														name="queryPara.remark" maxlength="256"
														style="width: 100%; height: 120px" data-options="validType:'length[0,256]'">
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
				  </form>
					<div id="modifyBtn" style="padding: 5px; text-align: center;display: block;">
	               		<table width="100%" cellspacing="2px" cellpadding="10px" border="0">
	               			<tr>
	               				<td align="center">
	                    			<button class="easyui-linkbutton c1" id="modifyRealBtn" onclick="modifyTmnlInfo(false);" style="width:70px;">修改</button>
	                    		</td>
	                    	</tr>
	                    </table>
	               </div>
	               <div id="saveBtn" style="padding: 5px; text-align: center;display: none;">
	               		<table width="100%" cellspacing="2px" cellpadding="10px" border="0">
	               			<tr>
	               				<td align="right">
	                    			 <button class="easyui-linkbutton c1" onclick="doEdit();" style="width:70px;">保存</button>
	                    		</td>
	               				<td align="left">
	                    			 <button class="easyui-linkbutton c1" onclick="modifyTmnlInfo(true);" style="width:70px;">取消</button>
	                    		</td>
	                    	</tr>
	                    </table>
	               </div>
				</div>
				<div style="padding:0" border="false"> 
			        <table id="consSubTable"></table>
			    </div>    
		    </div>
		    <!--    
		    <div title="子客户" style="display:none;">
		        <div id="lineConsDiv" class="easyui-panel" title="客户信息" style="border: 0; width: 100%;overflow: auto; background: #fafafa;padding:0">
					<table class="content" style="width: 100%;">
						<tbody valign="top">
							<tr>
								<td>
									<table style="width: 100%;" border="0">
										<tbody>
											<tr>
												<td width="15%" class="td-label" align="center" style="vertical-align: top; padding-top: 5px;">
													客户编号
												</td>
												<td width="18%">
													<input type="text" size="18" id="consNo1" name="consNo" class="easyui-validatebox" value="${lineConsMap.CONS_NO}" style="width: 200px;" data-options="required:true,missingMessage:'请输入客户编号'">
												</td>
												<td width="15%" class="td-label" align="center" style="vertical-align: top; padding-top: 5px;">
													客户名称
												</td>
												<td width="18%">
												    <input type="text" size="18" id="consName1" name="consName" class="easyui-validatebox" value="${lineConsMap.CONS_NAME}" style="width: 200px;" data-options="required:true,missingMessage:'请输入客户名称'">
												</td>
												<td width="15%" class="td-label" align="center" style="vertical-align: top; padding-top: 5px;">
													电压等级
												</td>
												<td width="18%">
													<input id="voltCode1" name="queryPara.voltCode" value="${lineConsMap.VOLT_CODE}" style="width: 200px;">
												</td>
											</tr>
											<tr>
												<td width="15%" class="td-label" align="center" style="vertical-align: top; padding-top: 5px;">
													合同容量
												</td>
												<td width="18%">
													<input id="contractCap1" type="text" name="queryPara.contractCap" class="easyui-validatebox" value='${lineConsMap.CONTRACT_CAP}' style="width: 200px;" data-options="required:true,missingMessage:'请输入合同容量'""> 
												</td>
												<td width="15%" class="td-label" align="center" style="vertical-align: top; padding-top: 5px;">
													所属单位
												</td>
												<td width="18%">
												    <input id="orgNo1" name="queryPara.orgNo" value="${lineConsMap.org_no}" style="width: 200px;">
												</td>
												<td width="15%" class="td-label" align="center" style=" vertical-align: top;padding-top: 5px;">
													联系电话
												</td>
												<td width="18%">
													<input id="telephone1" type="text" name="queryPara.telephone" value="${lineConsMap.TELEPHONE}"
													       class="easyui-validatebox" style="width: 200px;"
													data-options="prompt:'Enter your phone number', required:true">
												</td>
											</tr>
											<tr>
												<td width="15%" class="td-label" align="center" style="vertical-align: top; padding-top: 5px;">
													联系人
												</td>
												<td width="18%">
													<input id="contactName1" type="text" value="${lineConsMap.CONTACT_NAME}"
													name="queryPara.contactName" style="width: 200px;"
													class="easyui-validatebox" data-options="required:true,missingMessage:'请输入联系人'"">
												</td>
												<td width="15%" class="td-label" align="center" style="vertical-align: top; padding-top: 5px;">
													客户类型
												</td>
												<td width="18%">
													<select id="userType1" class="easyui-combobox" value="${lineConsMap.USER_TYPE}" disabled="disabled"
														name="queryPara.userType" style="width: 200px;">
														<option value="1">电力客户</option>
														<option value="2" selected="selected">子客户</option>
													</select>
												</td>
												<td width="15%" class="td-label" align="center" style="vertical-align: top; padding-top: 5px;">
													客户状态
												</td>
												<td width="18%" colspan="1">
												    <select id="statusCode1" class="easyui-combobox" value="${lineConsMap.STATUS_CODE}"
														name="queryPara.statusCode" style="width: 200px;">
														<option value="1">正常客户</option>
														<option value="2">已销户</option>
													</select>
												</td>
											</tr>
											<tr>
												<td width="15%" class="td-label" align="center" style="vertical-align: top; padding-top: 5px;">
													经度
												</td>
												<td width="18%">
													<input id="x1" type="text" name="queryPara.x" style="width: 200px;" value="${lineConsMap.X}"
													class="easyui-validatebox" data-options="required:false">
												</td>
												<td width="15%" class="td-label" align="center" style="vertical-align: top; padding-top: 5px;">
													纬度
												</td>
												<td width="18%">
													<input id="y1" type="text" name="queryPara.y" style="width: 200px;" value="${lineConsMap.Y}"
													class="easyui-validatebox" data-options="required:false">
												</td>
												<td width="15%" class="td-label" align="center" style="vertical-align: top; padding-top: 5px;">
												    &nbsp;
												</td>
												<td width="18%">
													&nbsp;
												</td>
											</tr>
											<tr>
												<td width="15%" class="td-label" align="center" style="vertical-align: top; padding-top: 5px;">
													施工开始时间
												</td>
												<td width="18%">
													<input class="easyui-datebox" style="width: 200px;" id="startDate1" name="queryPara.startDate" value='${lineConsMap.START_DATE}'>
												</td>
												<td width="15%" class="td-label" align="center" style="vertical-align: top; padding-top: 5px;">
													施工结束时间
												</td>
												<td width="18%">
													<input class="easyui-datebox" style="width: 200px;" id="endDate1" name="queryPara.endDate" value='${lineConsMap.END_DATE}'>
												</td>
												<td width="15%" class="td-label" align="center" style="vertical-align: top; padding-top: 5px;">
												    停工停电时间
												</td>
												<td width="18%">
													<input class="easyui-datebox" style="width: 200px;" id="stopDate1" name="queryPara.stopDate" value='${lineConsMap.STOP_DATE}'>
												</td>
											</tr>
											<tr>
												<td width="15%" class="td-label" align="center" style="vertical-align: top; padding-top: 5px;">
													用电地址
												</td>
												<td width="84%" colspan="5">
													<input id="elecAddr1" type="text" name="queryPara.elecAddr" style="width: 50%" value='${lineConsMap.ELEC_ADDR}'
													       data-options="required:false">
												</td>
											</tr>
											<tr>
												<td width="15%" class="td-label" align="center" style="vertical-align: top; padding-top: 5px;">
												    备注
												</td>
												<td width="84%" colspan="5">
													<input id="remark1" type="text" name="queryPara.remark" style="width: 50%" value='${lineConsMap.REMARK}'
													       data-options="required:false">
												</td>
											</tr>
										</tbody>
									</table>
									<div id="modifyBtn1" style="padding: 5px; text-align: center;display: block;">
					               		<table width="100%" cellspacing="2px" cellpadding="10px" border="0">
					               			<tr>
					               				<td align="center">
					                    			<button class="easyui-linkbutton c1" onclick="modifyTmnlInfo1(false);" style="width:70px;">修改</button>
					                    		</td>
					                    	</tr>
					                    </table>
					               </div>
					               <div id="saveBtn1" style="padding: 5px; text-align: center;display: none;">
					               		<table width="100%" cellspacing="2px" cellpadding="10px" border="0">
					               			<tr>
					               				<td align="right">
					                    			 <button class="easyui-linkbutton c1" onclick="doEdit1();" style="width:70px;">保存</button>
					                    		</td>
					               				<td align="left">
					                    			 <button class="easyui-linkbutton c1" onclick="modifyTmnlInfo1(true);" style="width:70px;">取消</button>
					                    		</td>
					                    	</tr>
					                    </table>
					               </div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
		    </div>
		     -->
		</div>
	</body>
</html>
<script type="text/javascript">
    $( function() {
        $('#voltCode').combobox({
            url :'<%=basePath%>areaEnergyTmnl/getVoltCode.action',
            editable:false,
            valueField:'id',
            textField:'text'
        });
      	
      	$('#areaNoCons').combobox({    
		    url:'<%=basePath%>areaEnergy/loadAreaList.action', 
		    valueField:'ID',    
		    textField:'TEXT',
		    editable:false,
		    panelHeight:'auto',  
			onLoadSuccess:function(){
			    var data = $(this).combobox('getData');
			    if(data.length>0){
			       $(this).combobox('select',data[0].ID);
			    }
			}
		});
      	
		$.extend($.fn.validatebox.defaults.rules, {    
            comboxValidate: {    
                validator: function(value, param){ 
                    if(value == null || value == '' || value == '请选择'){
                       //false的时候，给出message提示
                       return false;
                    } else{
                       return true;    
                    }  
                },    
                message: '{0}'   
            } 
        });
        
        var tx = $('#tx').val();
		$('#remark').textbox('setValue',tx);
		
	});
	
    $('#voltCode').combobox({
        onChange : function() {
            $('#voltCode').combobox('validate');
        }
    });
            
</script>

