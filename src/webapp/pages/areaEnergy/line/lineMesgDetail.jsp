<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%
	//String baseUrl  = request.getContextPath();
	//String pagePath = baseUrl + "/pages/despages";	
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%> 

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	 <head>
    <meta charset="UTF-8">
    <title>线路信息</title>
   	<jsp:include page="/pages/areaEnergy/common/head.jsp">
   		<jsp:param name="flag" value="flag='13'" />
   	</jsp:include>
   	<script type="text/javascript">
		
		$(function(){
			//查询线路下测点是否有Uab，Uac，Ubc，有则勾选电压测点
			checkInclude();
			
			var isEdit = parent.$("#isEdit").val();
			var roleCode = '${resultMap.roleCode}';
			
			if(isEdit == 'false'){
				$("#modifyRealBtn").linkbutton("disable");
				$("#saveMpBtn").linkbutton("disable");
				$("#newMpBtn").linkbutton("disable");
				$("#delMpBtn").linkbutton("disable");
				$("#batchMpImportBtn").linkbutton("disable");
			}
			$('#lineType').combobox({
					 url :'<%=basePath%>areaEnergyTmnl/getCodeNameByCode.action?codeValue=70024&content=1',
		            editable:false,//不可编辑状态
			        valueField:'id',
			        textField:'text'
	        });
			
			$('#bsId').combobox({//所属母线
			url:des.webContextRoot +'line/queryBSMessage.action?queryPara.subsId='+'${resultMap.subId}',
			valueField: 'bsId',
			textField: 'bsName'   
			});
			
			$('#runStatus').combobox({//运行状态
				url :'<%=basePath%>areaEnergyTmnl/getCodeNameByCode.action?codeValue=70033',
	            editable:false,//不可编辑状态
		        valueField:'id',
		        textField:'text'
	        });
			
			$('#bsId').combobox({//所属母线
				value:'${resultMap.BI}' 
			});
			$('#tranId').combobox({//所属变压器
				value:'${resultMap.TI}'  
			});	
			$('#validFlag').combobox({//是否有效
				value:'${resultMap.VF}'
			});
			
			$('#ctRatio').combobox({
					url :'<%=basePath%>areaEnergyTmnl/getCodeNameByCode.action?codeValue=70034',
		            editable:false,//不可编辑状态
			        valueField:'id',
			        textField:'text'
	        	});
	       /* $('#remark').textbox({
				inputEvents:$.extend({},$.fn.textbox.defaults.inputEvents,{
					keyup:function(event){
						if(event.keyCode == 13){
							var remark = $('#remark').textbox('getValue')+'\n';
							$('#remark').textbox('setValue',remark);
						}
					}
				})
			});*/
			
			var tx = $('#tx').val();
			$('#remark').textbox('setValue',tx);

			/*$('#lineType').combobox({
				onChange : function(){
					var lineType = $('#lineType').val();
					if(lineType == '08' || lineType == '09'|| lineType == '10'){
						$('#bsId').combobox({//当线路类型为08或09或10时
							value:'',
							disabled:true,
							editable:false
						 });
						$('#voltCode').textbox({//当线路类型为08或09或10时
							value:'',
							disabled:true,
							editable:false
						 });
						$('#voltLevel').textbox({//当线路类型为08或09或10时
							value:'',
							disabled:true,
							editable:false
						 });
						$('#ptRatio').textbox({//当线路类型为08或09或10时
							value:'',
							disabled:true,
							editable:false
						 });
						$('#ctRatio').combobox({//当线路类型为08或09或10时
							value:'',
							disabled:true,
							editable:false
						 });
						
						
						 //$("#bsId").combobox({disabled:false});
					}else{
						$('#bsId').combobox({//当线路类型为08或09或10时
							value:'',
							disabled:false,
							editable:true
						 });
						$('#ctRatio').combobox({//当线路类型为08或09或10时
							value:'',
							disabled:false,
							editable:true
						 });
						$('#ptRatio').combobox({//当线路类型为08或09或10时
							value:'',
							disabled:true,
							editable:false
						 });
						$('#voltLevel').combobox({//当线路类型为08或09或10时
							value:'',
							disabled:true,
							editable:false
						 });
						$('#voltCode').combobox({//当线路类型为08或09或10时
							value:'',
							disabled:true,
							editable:false
						 })
					}
				}
			});*/
			
			$('#bsId').combobox({
				onChange : function(){
					var bsId = $("#bsId").combobox('getValue');
					if(bsId != ""){
						$.ajax({
							url : des.webContextRoot +'line/queryBSMesgByBsId.action',
							type: "post",
							dataType:"json",
							data : {"bsId":bsId},
							timeout:60000, 
							error : function (XMLHttpRequest, textStatus, errorThrown) {
								//去除遮罩
								$.messager.confirm("提示","保存失败");
							},
							success : function(result) {
									if(result.flag=='1'){
										$("#voltCode").textbox('setValue',result.VOLT_CODE);
										$("#voltLevel").textbox('setValue',result.VOLT_LEVEL);
										$("#ptRatio").textbox('setValue',result.PT);
										$("#voltCode").textbox({disabled:true});
										$("#voltLevel").textbox({disabled:true});
										$("#ptRatio").textbox({disabled:true});
										
									}
							  }
						  });
					}
					
				}
			});
			
			$('#bsId').combobox({
				onLoadSuccess : function(){
					var bsId = $("#bsId").combobox('getValue');
					if(bsId != ""){
						$.ajax({
							url : des.webContextRoot +'line/queryBSMesgByBsId.action',
							type: "post",
							dataType:"json",
							data : {"bsId":bsId},
							timeout:60000, 
							error : function (XMLHttpRequest, textStatus, errorThrown) {
								//去除遮罩
								$.messager.confirm("提示","保存失败");
							},
							success : function(result) {
									if(result.flag=='1'){
										$("#voltCode").textbox('setValue',result.VOLT_CODE);
										$("#voltLevel").textbox('setValue',result.VOLT_LEVEL);
										$("#ptRatio").textbox('setValue',result.PT);
										$("#voltCode").textbox({disabled:true});
										$("#voltLevel").textbox({disabled:true});
										$("#ptRatio").textbox({disabled:true});
										
									}
							  }
						  });
					}
					
				}
			});
		});
		
		function checkInclude() {
			var lineId = '${resultMap.LINE_ID}';
			$.ajax({
				url : des.webContextRoot +'areaEnergy/countMpCode.action',
				type: "post",
				dataType:"json",
				data : {"lineId":lineId},
				timeout:60000, 
				error : function (XMLHttpRequest, textStatus, errorThrown) {
					
				},
				success : function(result) {
					if(result.count == 3){
						//修改电压测点为1
						updateUmp(lineId, 1);
					} else {
						//修改电压测点为2
						updateUmp(lineId, 2);
					}
					
				}
			});
		}
		
		function updateUmp(lineId,isUmp) {
			$.ajax({
				url : des.webContextRoot +'areaEnergy/updateUmp.action',
				type: "post",
				dataType:"json",
				data : {"lineId":lineId,"isUmp":isUmp},
				timeout:60000, 
				error : function (XMLHttpRequest, textStatus, errorThrown) {
					
				},
				success : function(result) {
					if (result.isUmp == 1) {
						$("#includeFlag").attr("checked", "true");
					} else if (result.isUmp == 2) {
						$("#includeFlag").removeAttr("checked");
					}					
				}
			});
		}
		
		function doEdit(){
			if(validateCheck()) {
				$.messager.confirm("提示","确定保存信息吗？",doSubmit);
				//MessageBox("确定保存信息吗？","系统提示", T_ICON, MB_YESNO, doSubmit);
			}
		}
		//回调函数
		function doSubmit(result){
			if(result) {
				var para='deviceId='+${resultMap.LINE_ID}+'&showIndex='+$('#showIndex').textbox('getValue')+'&deviceName=' + $('#lineName').textbox('getValue')+
				'&lineType=' + $('#lineType').combobox('getValue')+"&bsId="+$('#bsId').combobox('getValue')+
				"&ctRatio="+$('#ctRatio').combobox('getValue')+
				"&validFlag="+$('#validFlag').combobox('getValue')+
				"&terminalId="+$('#tmnlAssetNo').val()+"&runStatus="+$('#runStatus').combobox('getValue')+
				"&remark="+$('#remark').textbox('getValue')+
				"&includeFlag="+$("#includeFlag").val()+'&subId='+'${resultMap.subId}'+
				"&ptRatio="+''+
				'&voltCode='+'';
				$.ajax({
					url : des.webContextRoot +'line/updateLineMessage.action',
					type: "post",
					dataType:"text",
					data : para,
					timeout:60000, 
					error : function (XMLHttpRequest, textStatus, errorThrown) {
					//去除遮罩
					//disWaitDisplayForQuery();
					//$.messager.confirm("提示","保存失败");
					//MessageBox("保存失败","系统异常",MB_ERROR,MB_OK);
					},
					success : function(res) {
							if (res != "" && res != null) {
								if(res == "repeatLineName"){
									 $.messager.confirm("提示","同一终端下的线路名称不能重复，请重新输入");
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
		   // 画面合法性check
		  	function validateCheck() {
		  	
			     if($('#lineName').textbox('getValue') == "") {
			          $.messager.confirm("提示","线路名称不能为空，请输入");
			           return false;
			     }
			     if($('#lineName').textbox('getValue').length >64) {
			          $.messager.confirm("提示","线路名称不能超过64位，请重新输入");
			           return false;
			     }
			     if($('#lineType').val() == ""){
			     	$.messager.confirm("提示","线路类型不能为空，请输入");
			        return false;
			     }
			     var lineType = $('#lineType').val();
				if(lineType != '08' && lineType != '09' && lineType != '10'){
					 if($('#bsId').combobox('getValue') == "") {
				          $.messager.confirm("提示","所属母线不能为空，请选择");
				           return false;
				     }
				     if($('#ctRatio').combobox('getValue') == "") {
				          $.messager.confirm("提示","电流变比CT不能为空，请输入");
				           return false;
				     }
				}
			     if($('#terminalId').textbox('getValue') == "") {
			          $.messager.confirm("提示","所属终端不能为空，请输入");
			           return false;
			     }
			     if($('#remark').textbox('getValue').length >256) {
			          $.messager.confirm("提示","备注不能超过256位，请重新输入");
			           return false;
			     }
			     if($('#showIndex').textbox('getValue') == "") {
			          $.messager.confirm("提示","线路显示序号不能为空，请输入");
			           return false;
			     }
			     
			     if($('#showIndex').textbox('getValue') < 1) {
			          $.messager.confirm("提示","线路显示序号不能小于1，请输入");
			           return false;
			     }
			     if(!onlyNumInput($('#showIndex').textbox('getValue')) ) {
			          $.messager.confirm("提示","线路显示序号只能为数字，请重新输入");
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
			//查询所属终端
			function queryTmnlMessageList(){
				var url = "<%=basePath %>pages/areaEnergy/line/tmnlMessageList.jsp?subId="+'${resultMap.subId}'+'&deviceId='+${resultMap.LINE_ID}+"&tmnlId="+$('#tmnlAssetNo').val()+'&opType=update';
				OpenWin(url,"终端配置列表",900,300);
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
	function cancel(){
		window.close();
	}
	
	// checkBox 选择
	function selectChk(obj) {
		if(obj.checked) {
			obj.value = "1";
		} else {
			obj.value = "2";
		}
	}
	
	function modifyTmnlInfo(saveFlag){
		   var lineType = $('#lineType').combobox('getValue');
		   $("#showIndex").textbox({disabled:saveFlag});
		   $("#lineName").textbox({disabled:saveFlag});
		   $("#lineType").combobox({disabled:saveFlag});
		   $("#bsId").combobox({disabled:saveFlag});
		   $("#ctRatio").combobox({disabled:saveFlag});
		   $("#validFlag").combobox({disabled:saveFlag});
		   $("#terminalId").textbox({disabled:saveFlag});
		   $("#runStatus").combobox({disabled:saveFlag});
		   $("#remark").textbox({disabled:saveFlag});
		   
		   if(saveFlag){
			   $("#link").unbind('click',queryTmnlMessageList);
			   $("#link").bind('click');
		   }else{
			   $("#link").unbind('click');
			   $("#link").bind('click',queryTmnlMessageList);
			  /* var lineType = $('#lineType').val();
				if(lineType == '08' || lineType == '09'|| lineType == '10'){
					$('#bsId').combobox({//当线路类型为08或09或10时
						value:'',
						disabled:true,
						editable:false
					 });
					$('#voltCode').textbox({//当线路类型为08或09或10时
						value:'',
						disabled:true,
						editable:false
					 });
					$('#voltLevel').textbox({//当线路类型为08或09或10时
						value:'',
						disabled:true,
						editable:false
					 });
					$('#ptRatio').textbox({//当线路类型为08或09或10时
						value:'',
						disabled:true,
						editable:false
					 });
					$('#ctRatio').combobox({//当线路类型为08或09或10时
						value:'',
						disabled:true,
						editable:false
					 })
					
					
					 //$("#bsId").combobox({disabled:false});
				}else{
					$('#bsId').combobox({//当线路类型为08或09或10时
						disabled:false,
						editable:true
					 });
					$('#ctRatio').combobox({//当线路类型为08或09或10时
						disabled:false,
						editable:true
					 });
					$('#ptRatio').combobox({//当线路类型为08或09或10时
						value:'',
						disabled:true,
						editable:false
					 });
					$('#voltLevel').combobox({//当线路类型为08或09或10时
						value:'',
						disabled:true,
						editable:false
					 });
					$('#voltCode').combobox({//当线路类型为08或09或10时
						value:'',
						disabled:true,
						editable:false
					 })
				}*/
		   }
		   
		  // $("#includeFlag").attr("disabled",saveFlag);
			
		   if(saveFlag == false){
			   $("#saveBtn").css("display","block");
			   $("#modifyBtn").css("display","none");
		   }else{
		   	   $("#saveBtn").css("display","none");
			   $("#modifyBtn").css("display","block");
		   }
		}
	</script>
	</head>
	<body srolling='no'>
		<div id='queryDiv' class="container-shadow" style="width:100%;">
		    <input type='hidden' id='tmnlAssetNo' name='tmnlAssetNo' value="${resultMap.TMNLID }">
            <div class="easyui-panel" title="线路信息" style="width:100%;padding:5px 10px;">
                <table style="width:100%;" class="easyui-panel" cellspacing="8px" cellpadding="0" border="0">
                    <tbody>
                             <tr>
                                <td class="td-label" align="right">线路名称：</td>
                                <td >
                                    <input class="easyui-textbox"  size="27" id="lineName" value='${resultMap.LINE_NAME}' disabled = 'disabled'
                                    data-options="required:true,missingMessage:'请输入线路名称'"
                                    >
                                    <font style="color: red;">*</font>
                                </td>
                                
                                <td class="td-label" align="right">线路类型：</td>
                                <td>
                                    <input id="lineType"  value="${resultMap.LINE_TYPE}" size="27"  disabled = 'disabled'> 
                                    <font style="color: red;">*</font>
                                </td>
                                <td class="td-fillwidth"></td>
                                <td class="td-label" align="right">所属终端：</td>
                                <td>
                                    <input class="easyui-textbox"  size="27"id="terminalId" value = "${resultMap.TERMINAL_ID }" disabled = 'disabled' editable='false'
                                     data-options="required:true,missingMessage:'请选择所属终端'"
                                    > 
                                    <a onclick="return false;" style="cursor:pointer" id='link'><img src="<%=basePath%>images/query.gif"></a>
                                    <font style="color: red;">*</font>
                                </td>
                             </tr>
                             <tr>
                             	<td class="td-label" align="right">所属母线：</td>
                             	<td>
                                    <select class="easyui-combobox" id="bsId" data-options="width:205,prompt:'请选择',panelHeight:'100',editable:false" disabled = 'disabled'></select>
                                    <font style="color: red;">*</font>
                                </td>
                             	<td class="td-label" align="right">电压等级：</td>
                                <td >
                                    <input class="easyui-textbox"  size="27" id="voltCode" disabled = 'disabled'>
                                    <font style="color: red;">*</font>
                                </td>
                                <td class="td-fillwidth"></td>
                                <td class="td-label" align="right">降压层级（母线）：</td>
                             	<td >
                                    <input class="easyui-textbox" size="27" id="voltLevel" disabled = 'disabled'>
                                    <font style="color: red;">*</font>
                                </td>
                             </tr>
                             <tr>
                             	 <td class="td-label" align="right">PT：</td>
                                <td >
                                    <input class="easyui-textbox"  size="27" id="ptRatio"  disabled = 'disabled'
                                     data-options="required:true,missingMessage:'请输入电压变比PT'"
                                    >
                                    </a><font style="color: red;">*</font>
                                </td>
                             	 <td class="td-label" align="right">CT：</td>
                                <td >
                                    <input  size="27" id="ctRatio" value = "${resultMap.CT }" disabled = 'disabled'
                                     data-options="required:true,missingMessage:'请输入电流变比CT'"
                                    >
                                    </a><font style="color: red;">*</font>
                                </td>
                                
                                <td class="td-fillwidth"></td>
                                <td class="td-label"  align="right">
									运行状态：
								</td>
								<td >
									<input id="runStatus"  value="${resultMap.RS}" size="27" editable='false' disabled = 'disabled'> 
                                    <font style="color: red;">*</font>
								</td>
                                
                             </tr>
                             <tr>
                             	<td class="td-label" align="right">是否有效：</td>
                             	<td>
                                 <select class="easyui-combobox" id="validFlag" data-options="width:205,prompt:'有效',panelHeight:'auto',editable:false" disabled = 'disabled'>
                                     <option value="1">有效</option>
                                     <option value="2">无效</option>
                                 </select>
                             	</td>
                             	<td class="td-label"  align="right">显示序号：</td>
                                <td>
                                    <input class="easyui-textbox"  value="${resultMap.SHOW_INDEX}" size="27" id="showIndex" disabled = 'disabled'
                                    data-options="required:true,missingMessage:'请输入线路显示序号'"
                                    >
                                    <font style="color: red;">*</font>
                                </td>
                                <td class="td-fillwidth"></td>
                                <td class="td-label" align="right">电压测点:</td>
                                <td align="left" class="td-label"  nowrap="nowrap">
									<input type="checkbox" id="includeFlag"  onclick="selectChk(this);" disabled = 'disabled' name="includeFlag"  value="${resultMap.IS_UMP}" />
								</td>
                             </tr>
                            <tr>
                                <td class="td-label" align="right">备注：</td>
                                <td colspan = '8'>
                                	<textarea style="display:none" id='tx'>${resultMap.REMARK }</textarea>
                                    <input class="easyui-textbox" data-options = 'multiline:true' value = '' id="remark" style= "width:450px;height:100px;" disabled = 'disabled'>
                                </td>
                            </tr>
                     </tbody>
               </table>
               <div id="modifyBtn" style="padding: 5px; text-align: center;display: block;">
               		<table width="100%" cellspacing="2px" cellpadding="10px" border="0">
               			<tr>
               				<td align="center">
                    			<button id="modifyRealBtn" class="easyui-linkbutton c1" onclick="modifyTmnlInfo(false);" style="width:70px;">修改</button>
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
		<form id="ff" method="post"style="border: 0; width: 100%; height: 60%;">
				<div data-options="region:'north',collapsible:false"
					class="easyui-panel" title="增加测点信息(注：当测点类型为遥信、告警策略为定制告警时，告警上限值只能输入1和0（开：0，合：1）)"
					style="border: 0; width: 100%; height: 100%; overflow: auto; background: #fafafa;">
					<table class="easyui-datagrid" id="dg"
					data-options="url:'<%=basePath%>areaEnergyTmnl/getMpInfo.action?tranId=${resultMap.LINE_ID}&areaNo=${resultMap.areaNo}&deviceRela=${resultMap.deviceRela}&deviceName='+encodeURIComponent($('#lineName').textbox('getValue')),
									method:'get',
                                    toolbar: '#tb',
                                    iconCls: 'icon-edit',
									rownumbers:true,
									border:false,
									singleSelect:false,
									fit:true,
									fitColumns:true,
                                    onClickCell: onClickCell,
                                    onEndEdit: onEndEdit">
					<thead>
						<tr>
							<th data-options="field:'MP_ID',width:80,checkbox:true,
						formatter:function(value,row){
						return row.MP_ID;
						}"
											rowspan="2">
							</th>
							<th
								data-options="field:'VALID_FLAG',width:50,align:'center',editable:false,
                                formatter:function(value,row){
                                    return row.flagName;
                                },
                                editor:{
                                    type:'combobox',
                                    options:{
                                        valueField:'VALID_FLAG',
                                        textField:'flagName',
                                        method:'get',
                                    data: [{
                                                VALID_FLAG: '1',
                                                flagName: '是'
                                            },{
                                                VALID_FLAG: '0',
                                                flagName: '否'
                                            }]
                                    }
                                }"
								rowspan="2">
								是否
								<br>
								启用
							</th>
							<th data-options="field:'MP_NAME',width:200,align:'center',editor:'textbox',
						formatter: function(value,row,index){
						return row.MP_NAME;
						}" rowspan="2">
								测点名称
							</th>
							<th data-options="field:'MP_TYPE',align:'center',width:80,
						formatter: function(value,row,index){
						return row.MP_TYPE;
						}" rowspan="2">
								测点
								<br>
								类型
							</th>
							<th data-options="field:'MP_CODE',align:'center',width:100,
					formatter: function(value,row,index){
					return row.MP_CODE;
					}" rowspan="2">
								测点
								<br>
								编码
							</th>
							<th data-options="field:'COLL_ADDR',align:'center',width:100,editor:'numberbox',
					formatter: function(value,row,index){
					return row.COLL_ADDR;
					}" rowspan="2">
								采集
								<br>
								地址码<font style="color: red;">*</font>
							</th>
							<th data-options="field:'RATIONUM',align:'center',width:120,editor:{type:'numberbox',options:{precision:10}},
					                    formatter: function(value,row,index){
					                                return row.RATIONUM;
					                        }" rowspan="2">
								系数<font style="color: red;">*</font>
							</th>
							<th data-options="field:'BASE_VALUE',align:'center',width:120,editor:{type:'numberbox',options:{min:0,precision:10}},
					                    formatter: function(value,row,index){
					                                if (row.BASE_VALUE != null && row.BASE_VALUE != '') {
					                    				return row.BASE_VALUE;
					                    			} else {
					                    				return 0;
					                    			}
					                        }" rowspan="2">
								基数
							</th>
							<th
								data-options="field:'warningWayId',width:100,align:'center',
                                formatter:function(value,row){
                                    return row.warningWayText;
                                },
                                editor:{
                                    type:'combobox',
                                    options:{
                                        valueField:'warningWayId',
                                        textField:'warningWayText',
                                        method:'get',
                                        editable:false,
                                        url:'<%=basePath%>areaEnergyTmnl/getCodeNameByWarningWay.action?codeValue=70040',
                                        required:false,
                                        align:'center',
                                        onChange:function(n,o){
											   change(n,o);
											}
                                    }
                                }"
								rowspan="2">
								告警
								<br>
								策略
							</th>
							<th colspan="2">
								正常范围值
							</th>
							<th colspan="3">
								告警策略值
							</th>
							<th data-options="field:'DEVICE_TYPE',align:'center',width:100,
					                    formatter: function(value,row,index){
					                                return row.DEVICE_TYPE;
					                        }" rowspan="2">
								设备
								<br>
								类型
							</th>
							
						</tr>
						<tr>
							<th data-options="field:'NORMAL_UP',width:80,align:'center',editor:{type:'numberbox',options:{min:0,precision:4}},
							                    formatter: function(value,row,index){
							                                return row.NORMAL_UP;
							                        }">
								上限值
							</th>
							<th data-options="field:'NORMAL_DOWN',width:80,align:'center',editor:{type:'numberbox',options:{min:0,precision:4}},
							                    formatter: function(value,row,index){
							                                return row.NORMAL_DOWN;
							                        }">
								下限值
							</th>
							<th data-options="field:'WARING_UP',width:80,align:'center',editor:{type:'numberbox',options:{min:0,precision:4}},
							                    formatter: function(value,row,index){
							                                return row.WARING_UP;
							                        }">
								上限值
							</th>
							<th data-options="field:'WARING_DOWN',width:80,align:'center',editor:{type:'numberbox',options:{min:0,precision:4}},
							                    formatter: function(value,row,index){
							                                return row.WARING_DOWN;
							                        }">
								下限值
							</th>
							<th
								data-options="field:'id',width:100,align:'center',
                                formatter:function(value,row){
                                    return row.text;
                                },
                                editor:{
                                    type:'combobox',
                                    options:{
                                        valueField:'id',
                                        textField:'text',
                                        method:'get',
                                        editable:false,
                                        url:'<%=basePath%>areaEnergyTmnl/getWarningLevelInfo.action?areaNo=${resultMap.areaNo}',
                                        required:false,
                                        align:'center'

                                    }
                                }">
								告警
								<br>
								等级
							</th>
						</tr>
					</thead>
				</table>
				<div id="tb" style="height: auto; background-color: ">
					<a class="easyui-linkbutton"   id="saveMpBtn"
						data-options="iconCls:'icon-save',plain:true"
						onclick="javascript:producedMp()">保存测点</a>
					<a class="easyui-linkbutton"  id="newMpBtn"
						data-options="iconCls:'icon-add',plain:true"
						onclick="javascript:addInfo()">新增行记录</a>
					<a class="easyui-linkbutton"  id="delMpBtn"
						data-options="iconCls:'icon-remove',plain:true"
						onclick="javascript:removeit()">删除行记录</a>
					<a class="easyui-linkbutton" id="batchMpImportBtn"
					data-options="iconCls:'icon-reload',plain:true"
					onclick="javascript:batchImportMp()">测点批量导入</a>
					<a class="easyui-linkbutton" id="exportMp"
						data-options="iconCls:'icon-reload',plain:true"
						onclick="javascript:exportMp('<%=basePath%>','${resultMap.LINE_ID}')">测点导出</a>
				</div>
				</div>
		</form>	
	 </div>
	 <%@include file="/pages/areaEnergy/baseData/tmnlInstall/mpExport.jsp"%>
	</body>
	<script type="text/javascript">
	 var warningValue = "";
    var warningUpObj = "";
    var mpType = "";
	
	
	function addInfo(){
    	var url = "<%=basePath%>/pages/areaEnergy/baseData/tmnlInstall/chooseMpList.jsp?deviceRela="+'${resultMap.deviceRela}';
	    OpenWin(url,"修改测点",680,450);	
    }
    function batchImportMp(){
		 var url = "<%=basePath%>"+'pages/areaEnergy/baseData/tmnlInstall/batchImportDeviceMp.jsp?deviceName='+encodeURIComponent($('#lineName').textbox('getValue'))+'&tmnlId='+$('#tmnlAssetNo').val()+'&deviceType=1';
		 OpenWin(url,'批量导入测点','800','600');
	}
    //删除行记录
		function removeit(){
			var rows = $('#dg').datagrid('getSelections'); 
		    if(rows.length==0){  
	            $.messager.alert('提示',"请选择你要删除的已生成测点",'info'); 
	            return; 
	        }
		    $.messager.confirm('提示','确定要删除吗?',function(result){  
		            if (result){  
		                var rows = $('#dg').datagrid('getSelections');  
		                var mpIdArr = [];  
		                $.each(rows,function(i,n){
		                    mpIdArr.push({'MP_ID' : n.MP_ID});
		                });
		                //删除客户
		                var url = des.webContextRoot+"areaEnergy/deleteMpOfCons.action";
		                var para = 'mpIds='+JSON.stringify(mpIdArr);
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
    
  //生成测点
     function producedMp(){
        $('#dg').datagrid('acceptChanges');
        var rows = $('#dg').datagrid('getSelections'); 
            if(rows.length==0){  
                  $.messager.alert('提示',"请选择你要生成测点的采集点信息",'info'); 
                  return; 
            }
            
            $.messager.confirm('提示','确定要生成测点吗?',doSubmit1);
    }
    function doSubmit1(result){
          if (result){  
             var rows = $('#dg').datagrid('getSelections');  
             var terminalId = '${resultMap.TMNLID}';
             var deviceId = '${resultMap.LINE_ID}';
             var areaNo = '${resultMap.areaNo}';
             var mpArr = [];  
             var flag = 1;
             var warningLevel = '';
             var eachFlag = true;
             $.each(rows,function(i,n){
                 if(n.flagName == '是'){
                     flag = 1;
                 }else if(n.flagName == '否'){
                     flag = 0; 
                 }else{
                     flag = n.flagName;
                 }
                
                //校验
                 if(flag == 1){
                     if(n.COLL_ADDR ==""||n.COLL_ADDR == null){
                         $.messager.alert('提示',"采集点地址不能为空！",'info'); 
                         editIndex = undefined;
                         eachFlag = false;
                         return false;
                     }
                     if(n.RATIONUM ==""||n.RATIONUM == null){
                         $.messager.alert('提示',"系数不能为空！",'info');
                         editIndex = undefined;
                         eachFlag = false; 
                         return false; 
                     }
                 }
                 //告警值上限判断
                 if(n.MP_TYPE =='遥信'&& n.warningWayText =='定制告警'){
                     if(n.WARING_UP != 1.0000 && n.WARING_UP != 0.0000 && n.WARING_UP != null && n.WARING_UP != ''){
                        $.messager.alert('提示',"当测点类型和告警策略分别为遥信和定制告警时，告警策略值的上限值只能输入1或者0！",'info'); 
                        editIndex = undefined;
                         eachFlag = false;
                         return false;
                     }
                 }
                 
                 /*if(n.text == '请选择'){
                     warningLevel = '';
                 }else if(n.text == '紧急告警'){
                     warningLevel = 1; 
                 }else if(n.text == '事故告警'){
                     warningLevel = 2; 
                 }else if(n.text == '普通告警'){
                     warningLevel = 3; 
                 }else if(n.text == '一般记录'){
                     warningLevel = 4; 
                 }*/
                 //告警策略
                 if(n.warningWayText == '请选择'){
                     warningWayId = '';
                 }else if(n.warningWayText == '不告警'){
                     warningWayId = 1; 
                 }else if(n.warningWayText == '定制告警'){
                     warningWayId = 2; 
                 }else if(n.warningWayText == '告警模板1'){
                     warningWayId = 3; 
                 }
                 
                 /*if(n.NORMAL_UP ==""||n.NORMAL_UP == null){
                     $.messager.alert('提示',"正常范围值的上限值不能为空！",'info'); 
                     return; 
                 }
                 if(n.NORMAL_DOWN ==""||n.NORMAL_DOWN == null){
                     $.messager.alert('提示',"正常范围值的下限值不能为空！",'info'); 
                     return; 
                 }*/
                 if(n.NORMAL_UP == null){
                     n.NORMAL_UP = '';
                 }
                 if(n.NORMAL_DOWN == null){
                     n.NORMAL_DOWN = '';
                 }
                 if(n.WARING_UP == null){
                     n.WARING_UP = '';
                 }
                 if(n.WARING_DOWN == null){
                     n.WARING_DOWN = '';
                 }
                 if(n.text == null){
                     n.text = '';
                 }
                 
                 mpArr.push({'mpId' : n.MP_ID
                             ,'mpCode' : n.MP_CODE
                             ,'mpName' : n.MP_NAME
                             ,'mpType' : n.MP_TYPE
                             ,'collAddr' : Number(n.COLL_ADDR)
                             ,'validFlag' : Number(flag)
                             ,'ratio' : Number(n.RATIONUM)
                             ,'baseValue' : Number(n.BASE_VALUE)
                             ,'normalUp' : n.NORMAL_UP
                             ,'normalDown' :n.NORMAL_DOWN
                             ,'waringLevel' : n.text
                             ,'waringUp' : n.WARING_UP
                             ,'waringDown' : n.WARING_DOWN
                             ,'terminalId' : Number(terminalId)
                             ,'deviceId' : Number(deviceId)
                             ,'deviceType' : 1
                             ,'warningWay':warningWayId
                             ,'areaNo':areaNo
                           });
	         });
	         if(!eachFlag){
	            return;
	         }else{
		         var para = 'mpList='+JSON.stringify(mpArr);
		         //alert(para);
		         //保存测点
		         var url = "<%=basePath%>areaEnergy/saveDeviceMpInfo.action";
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
		                     $.messager.alert('提示',result.info,'info',function(){
		                          parent.com.frontier.areaEnergy.baseData.reloadTree.flushAndClickCurrentNode();
		                     });
		                  }else{
		                     $.messager.alert('提示',result.info,'info',function(){
		                          //parent.com.frontier.areaEnergy.baseData.reloadTree.flushAndClickCurrentNode();
		                          editIndex = undefined;
		                     });
		                  }
		             }
		         });
	         }
	     }else {
	        // parent.com.frontier.areaEnergy.baseData.reloadTree.flushAndClickCurrentNode();
	        editIndex = undefined;
	     }
    }
    function getMpInfo(mpIdStr,mpNameStr,mpTypeNameStr,mpCodeStr){
    	for(var i=0;i<mpIdStr.length;i++){
    		$('#dg').datagrid('appendRow',{
				MP_ID: '-1',
				VALID_FLAG : '1',
    			flagName : '是' ,
				MP_NAME: $('#lineName').textbox('getValue')+mpNameStr[i],
				MP_TYPE: mpTypeNameStr[i],
				MP_CODE: mpCodeStr[i],
				warningWayId: '',
				warningWayText:'请选择',
				id: '',
                text:'请选择',
				DEVICE_TYPE: '线路测点',
			});	
    	}
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
	
 var editIndex = undefined;
    function endEditing(){
        if (editIndex == undefined){return true}
        if ($('#dg').datagrid('validateRow', editIndex)){
            $('#dg').datagrid('endEdit', editIndex);
            editIndex = undefined;
            return true;
        } else {
            return false;
        }
    }
    
    
     var indexChange;
    //var warningUpFlag = 0;
    function change(newVal,oldVal){
        var selectedRow = $('#dg').datagrid("getSelected");
        var index = indexChange;
        var rows = $('#dg').datagrid('getRows');
        var r = rows[index];
        mpType = r.MP_TYPE;
        //mpType = '遥信';
        
        //告警策略
        var row = $('#dg').datagrid('selectRow', index);
        if(mpType == '遥测' || mpType =='遥脉'){
            if(newVal == 1){
                var normalUp = $(row).datagrid('getEditor', {
                                    index: index,  
                                    field: 'NORMAL_UP'
                                });
                $(normalUp.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                $(normalUp.target).numberbox('clear');
                var normalDown = $(row).datagrid('getEditor', {
                                    index: index,  
                                    field: 'NORMAL_DOWN'
                                });
                $(normalDown.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                $(normalDown.target).numberbox('clear');
                var warningUp = $(row).datagrid('getEditor', {
                                    index: index,  
                                    field: 'WARING_UP'
                                });
                $(warningUp.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                $(warningUp.target).numberbox('clear');
                var warningDown = $(row).datagrid('getEditor', {
                                    index: index,  
                                    field: 'WARING_DOWN'
                                });
                $(warningDown.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                $(warningDown.target).numberbox('clear');
                 var waringLevel = $(row).datagrid('getEditor', {
                    index: index,
                    field: 'id'
                });
                $(waringLevel.target).combobox('disable');
                $(waringLevel.target).combobox('setValue', '');
            }else if(newVal == 2){
                var normalUp = $(row).datagrid('getEditor', {
                                    index: index,  
                                    field: 'NORMAL_UP'
                                });
                $(normalUp.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                $(normalUp.target).numberbox('clear');
                var normalDown = $(row).datagrid('getEditor', {
                                    index: index,  
                                    field: 'NORMAL_DOWN'
                                });
                $(normalDown.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                $(normalDown.target).numberbox('clear');
                 var warningUp = $(row).datagrid('getEditor', {
                                    index: index,  
                                    field: 'WARING_UP'
                                });
                $(warningUp.target).textbox('textbox').attr('readonly',false);//设置输入框为禁用
                var warningDown = $(row).datagrid('getEditor', {
                                    index: index,  
                                    field: 'WARING_DOWN'
                                });
                $(warningDown.target).textbox('textbox').attr('readonly',false);//设置输入框为禁用
                var waringLevel = $(row).datagrid('getEditor', {
                    index: index,
                    field: 'id'
                });
                $(waringLevel.target).combobox('enable');
            }else if(newVal == 3){
                  var normalUp = $(row).datagrid('getEditor', {
                                    index: index,  
                                    field: 'NORMAL_UP'
                                });
                $(normalUp.target).textbox('textbox').attr('readonly',false);//设置输入框为禁用
                var normalDown = $(row).datagrid('getEditor', {
                                    index: index,  
                                    field: 'NORMAL_DOWN'
                                });
                $(normalDown.target).textbox('textbox').attr('readonly',false);//设置输入框为禁用
                
                 var warningUp = $(row).datagrid('getEditor', {
                                    index: index,  
                                    field: 'WARING_UP'
                                });
                $(warningUp.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                $(warningUp.target).numberbox('clear');
                var warningDown = $(row).datagrid('getEditor', {
                                    index: index,  
                                    field: 'WARING_DOWN'
                                });
                $(warningDown.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                $(warningDown.target).numberbox('clear');
                var waringLevel = $(row).datagrid('getEditor', {
                    index: index,
                    field: 'id'
                });
                $(waringLevel.target).combobox('disable');
                $(waringLevel.target).combobox('setValue', '');
            }else if(newVal == ''){
                         var normalUp = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'NORMAL_UP'
                                        });
                        $(normalUp.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                        $(normalUp.target).numberbox('clear');
                        var normalDown = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'NORMAL_DOWN'
                                        });
                        $(normalDown.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                        $(normalDown.target).numberbox('clear');
                        
                         var warningUp = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'WARING_UP'
                                        });
                        $(warningUp.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                        $(warningUp.target).numberbox('clear');
                        
                        var warningDown = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'WARING_DOWN'
                                        });
                        $(warningDown.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                        $(warningDown.target).numberbox('clear');
                        
                        var waringLevel = $(row).datagrid('getEditor', {
                            index: index,
                            field: 'id'
                        });
                        $(waringLevel.target).combobox('disable');
                        $(waringLevel.target).combobox('setValue', '');
                    }
        }else if(mpType == '遥信'){
            if(newVal == 1||newVal == 3){
                  var normalUp = $(row).datagrid('getEditor', {
                                    index: index,  
                                    field: 'NORMAL_UP'
                                });
                $(normalUp.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                $(normalUp.target).numberbox('clear');
                
                var normalDown = $(row).datagrid('getEditor', {
                                    index: index,  
                                    field: 'NORMAL_DOWN'
                                });
                $(normalDown.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                $(normalDown.target).numberbox('clear');
                
                 var warningUp = $(row).datagrid('getEditor', {
                                    index: index,  
                                    field: 'WARING_UP'
                                });
                $(warningUp.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                $(warningUp.target).numberbox('clear');
                
                var warningDown = $(row).datagrid('getEditor', {
                                    index: index,  
                                    field: 'WARING_DOWN'
                                });
                $(warningDown.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                $(warningDown.target).numberbox('clear');
                
                var waringLevel = $(row).datagrid('getEditor', {
                    index: index,
                    field: 'id'
                });
                $(waringLevel.target).combobox('disable');
                $(waringLevel.target).combobox('setValue', '');
            }else if(newVal == 2){
                 warningUpFlag = 1;
                 var normalUp = $(row).datagrid('getEditor', {
                                    index: index,  
                                    field: 'NORMAL_UP'
                                });
                $(normalUp.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                $(normalUp.target).numberbox('clear');
                
                var normalDown = $(row).datagrid('getEditor', {
                                    index: index,  
                                    field: 'NORMAL_DOWN'
                                });
                $(normalDown.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                $(normalDown.target).numberbox('clear');
                
                 var warningUp = $(row).datagrid('getEditor', {
                                    index: index,  
                                    field: 'WARING_UP'
                                });
                $(warningUp.target).textbox('textbox').attr('readonly',false);//设置输入框为禁用
                
                /*$(warningUp.target).combobox({
                                        valueField:'WARING_UP',    
                                        textField:'value',
                                        editable:false,
                                        required:false,
                                        align:'center',
                                         width:70,
                                        data: [{
                                            WARING_UP: '0',
                                            value: '开'
                                        },{
                                            WARING_UP: '1',
                                            value: '合'
                                        }]                                                      
                                    });*/
                                    
                var warningDown = $(row).datagrid('getEditor', {
                                    index: index,  
                                    field: 'WARING_DOWN'
                                });
                $(warningDown.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                $(warningDown.target).numberbox('clear');
                var waringLevel = $(row).datagrid('getEditor', {
                    index: index,
                    field: 'id'
                });
                $(waringLevel.target).combobox('enable');
            }else if(newVal == ''){
                         var normalUp = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'NORMAL_UP'
                                        });
                        $(normalUp.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                        $(normalUp.target).numberbox('clear');
                        var normalDown = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'NORMAL_DOWN'
                                        });
                        $(normalDown.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                        $(normalDown.target).numberbox('clear');
                        
                         var warningUp = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'WARING_UP'
                                        });
                        $(warningUp.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                        $(warningUp.target).numberbox('clear');
                        
                        var warningDown = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'WARING_DOWN'
                                        });
                        $(warningDown.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                        $(warningDown.target).numberbox('clear');
                        
                        var waringLevel = $(row).datagrid('getEditor', {
                            index: index,
                            field: 'id'
                        });
                        $(waringLevel.target).combobox('disable');
                        $(waringLevel.target).combobox('setValue', '');
                    }
        }
    }
    //点击单元格的时候开始编辑并生成编辑器，然后定位到编辑器的输入框上
    function onClickCell(index, field){
        
        if (editIndex != index){
            if (endEditing()){
            indexChange = index;
            
               //选中的这一行开始编辑
                $('#dg').datagrid('selectRow', index)
                        .datagrid('beginEdit', index);
                var ed = $('#dg').datagrid('getEditor', {index:index,field:field});
                //验证通过之后，判断上限下限值是否可以编辑
                //获取测点类型的值
                var row = $('#dg').datagrid('selectRow', index);
                //var checkedRow = $('#dg').datagrid("getSelected");
                var rows = $('#dg').datagrid('getRows');
                var checkedRow = rows[index];
                if(checkedRow.MP_TYPE == '遥测' || checkedRow.MP_TYPE =='遥脉'){
                    if(checkedRow.warningWayText == '不告警'){
                        var normalUp = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'NORMAL_UP'
                                        });
                        $(normalUp.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                        $(normalUp.target).numberbox('clear');
                        
                        var normalDown = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'NORMAL_DOWN'
                                        });
                        $(normalDown.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                        $(normalDown.target).numberbox('clear');
                        
                        var warningUp = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'WARING_UP'
                                        });
                        $(warningUp.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                        $(warningUp.target).numberbox('clear');
                        
                        var warningDown = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'WARING_DOWN'
                                        });
                        $(warningDown.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                        $(warningDown.target).numberbox('clear');
                        
                         var waringLevel = $(row).datagrid('getEditor', {
                            index: index,
                            field: 'id'
                        });
                        $(waringLevel.target).combobox('disable');
                        $(waringLevel.target).numberbox('clear');
                        
                    }else if(checkedRow.warningWayText == '定制告警'){
                        var normalUp = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'NORMAL_UP'
                                        });
                        $(normalUp.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                        $(normalUp.target).numberbox('clear');
                        
                        var normalDown = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'NORMAL_DOWN'
                                        });
                        $(normalDown.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                        $(normalDown.target).numberbox('clear');
                        
                         var warningUp = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'WARING_UP'
                                        });
                        $(warningUp.target).textbox('textbox').attr('readonly',false);//设置输入框为禁用
                        
                        var warningDown = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'WARING_DOWN'
                                        });
                        $(warningDown.target).textbox('textbox').attr('readonly',false);//设置输入框为禁用
                        
                        var waringLevel = $(row).datagrid('getEditor', {
                            index: index,
                            field: 'id'
                        });
                        $(waringLevel.target).combobox('enable');
                    }else if(checkedRow.warningWayText == '告警模板1'){
                         var normalUp = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'NORMAL_UP'
                                        });
                        $(normalUp.target).textbox('textbox').attr('readonly',false);//设置输入框为禁用
                        var normalDown = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'NORMAL_DOWN'
                                        });
                        $(normalDown.target).textbox('textbox').attr('readonly',false);//设置输入框为禁用
                        
                         var warningUp = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'WARING_UP'
                                        });
                        $(warningUp.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                        $(warningUp.target).numberbox('clear');
                        
                        var warningDown = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'WARING_DOWN'
                                        });
                        $(warningDown.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                        $(warningDown.target).numberbox('clear');
                        
                        var waringLevel = $(row).datagrid('getEditor', {
                            index: index,
                            field: 'id'
                        });
                        $(waringLevel.target).combobox('disable');
                        $(waringLevel.target).combobox('setValue', '');
                    }else if(checkedRow.warningWayText == '请选择'){
                         var normalUp = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'NORMAL_UP'
                                        });
                        $(normalUp.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                        $(normalUp.target).numberbox('clear');
                        
                        var normalDown = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'NORMAL_DOWN'
                                        });
                        $(normalDown.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                        $(normalDown.target).numberbox('clear');
                        
                         var warningUp = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'WARING_UP'
                                        });
                        $(warningUp.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                        $(warningUp.target).numberbox('clear');
                        
                        var warningDown = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'WARING_DOWN'
                                        });
                        $(warningDown.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                        $(warningDown.target).numberbox('clear');
                        
                        var waringLevel = $(row).datagrid('getEditor', {
                            index: index,
                            field: 'id'
                        });
                        $(waringLevel.target).combobox('disable');
                        $(waringLevel.target).combobox('setValue', '');
                    }
                }else if(checkedRow.MP_TYPE == '遥信'){
                    if(checkedRow.warningWayText == '不告警'||checkedRow.warningWayText == '告警模板1'){
                           var normalUp = $(row).datagrid('getEditor', {
                                              index: index,  
                                              field: 'NORMAL_UP'
                                          });
                          $(normalUp.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                          $(normalUp.target).numberbox('clear');
                          
                          var normalDown = $(row).datagrid('getEditor', {
                                              index: index,  
                                              field: 'NORMAL_DOWN'
                                          });
                          $(normalDown.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                          $(normalDown.target).numberbox('clear');
                          
                           var warningUp = $(row).datagrid('getEditor', {
                                              index: index,  
                                              field: 'WARING_UP'
                                          });
                          $(warningUp.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                          $(normalDown.target).numberbox('clear');
                          
                          var warningDown = $(row).datagrid('getEditor', {
                                              index: index,  
                                              field: 'WARING_DOWN'
                                          });
                          $(warningDown.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                          $(warningDown.target).numberbox('clear');
                          
                          
                          var waringLevel = $(row).datagrid('getEditor', {
                              index: index,
                              field: 'id'
                          });
                          $(waringLevel.target).combobox('disable');
                          $(waringLevel.target).combobox('setValue', '');
                          
                    }else if(checkedRow.warningWayText == '定制告警'){
                        warningUpFlag = 1;
                        var normalUp = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'NORMAL_UP'
                                        });
                        $(normalUp.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                        $(normalUp.target).numberbox('clear');
                        
                        var normalDown = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'NORMAL_DOWN'
                                        });
                        $(normalDown.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                        $(normalDown.target).numberbox('clear');
                        
                         var warningUp = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'WARING_UP'
                                        });
                        $(warningUp.target).textbox('textbox').attr('readonly',false);//设置输入框为可用
                        /*$(warningUp.target).combobox({
                                        valueField:'WARING_UP',    
                                        textField:'value',
                                        editable:false,
                                        required:false,
                                        align:'center',
                                         width:70,
                                        data: [{
                                            WARING_UP: '0',
                                            value: '开'
                                        },{
                                            WARING_UP: '1',
                                            value: '合'
                                        }]                                                      
                                    });*/
                        var warningDown = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'WARING_DOWN'
                                        });
                        $(warningDown.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                        $(warningDown.target).numberbox('clear');
                        
                        var waringLevel = $(row).datagrid('getEditor', {
                            index: index,
                            field: 'id'
                        });
                        $(waringLevel.target).combobox('enable');
                    }else if(checkedRow.warningWayText == '请选择'){
                         var normalUp = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'NORMAL_UP'
                                        });
                        $(normalUp.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                        $(normalUp.target).numberbox('clear');
                        
                        var normalDown = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'NORMAL_DOWN'
                                        });
                        $(normalDown.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                        $(normalDown.target).numberbox('clear');
                        
                         var warningUp = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'WARING_UP'
                                        });
                        $(warningUp.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                        $(warningUp.target).numberbox('clear');
                        
                        var warningDown = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'WARING_DOWN'
                                        });
                        $(warningDown.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                        $(warningDown.target).numberbox('clear');
                        
                        var waringLevel = $(row).datagrid('getEditor', {
                            index: index,
                            field: 'id'
                        });
                        $(waringLevel.target).combobox('disable');
                        $(waringLevel.target).combobox('setValue', '');
                    }
                }
                    
               
                if (ed){
                    //($(ed.target).data('numberbox') ? $(ed.target).textbox('numberbox') : $(ed.target)).focus();
                    
                    ($(ed.target).data('textbox') ? $(ed.target).textbox('textbox') : $(ed.target)).focus();
                }
                editIndex = index;
            } else {
                setTimeout(function(){
                    $('#dg').datagrid('selectRow', editIndex);
                },0);
            }
        }
    }
   function onEndEdit(index, row){
        //测点名称
        var mpName = $(this).datagrid('getEditor', {
            index: index,
            field: 'MP_NAME'
        });
        row.MP_NAME = $(mpName.target).textbox('getText');
        //
        var collAddr = $(this).datagrid('getEditor', {
            index: index,
            field: 'COLL_ADDR'
        });
        row.COLL_ADDR = $(collAddr.target).numberbox('getValue');
        
        //
        
        //
        var rationum = $(this).datagrid('getEditor', {
            index: index,
            field: 'RATIONUM'
        });
        row.RATIONUM = $(rationum.target).numberbox('getValue');
        //基数	
        var baseValue = $(this).datagrid('getEditor', {
            index: index,
            field: 'BASE_VALUE'
        });
        row.BASE_VALUE = $(baseValue.target).numberbox('getValue');
        //告警等级
        var waringLevel = $(this).datagrid('getEditor', {
            index: index,
            field: 'id'
        });
        row.text = $(waringLevel.target).combobox('getText');
        //告警策略
        var warningWay = $(this).datagrid('getEditor', {
            index: index,
            field: 'warningWayId'
        });
        row.warningWayText = $(warningWay.target).combobox('getText');
        //
        var flagName = $(this).datagrid('getEditor', {
            index: index,
            field: 'VALID_FLAG'
        });
        row.flagName = $(flagName.target).combobox('getText');
        //
        var normalUp = $(this).datagrid('getEditor', {
            index: index,
            field: 'NORMAL_UP'
        });
        row.NORMAL_UP = $(normalUp.target).numberbox('getValue');
        //
        var normalDown = $(this).datagrid('getEditor', {
            index: index,
            field: 'NORMAL_DOWN'
        });
        row.NORMAL_DOWN = $(normalDown.target).numberbox('getValue');
        //
        var waringUp = $(this).datagrid('getEditor', {
            index: index,
            field: 'WARING_UP'
        });
        row.WARING_UP = $(waringUp.target).numberbox('getValue');
        //
        var waringDown = $(this).datagrid('getEditor', {
            index: index,
            field: 'WARING_DOWN'
        });
        row.WARING_DOWN = $(waringDown.target).numberbox('getValue');
        
    }
</script>

</html>
