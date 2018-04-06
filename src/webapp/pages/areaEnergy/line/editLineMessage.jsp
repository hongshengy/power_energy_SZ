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
    <base href="<%=basePath%>">
    <title>线路</title>
   	<jsp:include page="/pages/areaEnergy/common/head.jsp"></jsp:include>
   	<script type="text/javascript">
		
		$(function(){
		
			$('#lineType').combobox({
				 url :'<%=basePath%>areaEnergyTmnl/getCodeNameByCode.action?codeValue=70024',
	            editable:false,//不可编辑状态
		        valueField:'id',
		        textField:'text'
	        });
		
			$('#bsId').combobox({//所属母线
			url:des.webContextRoot +'line/queryBSMessage.action?queryPara.subsId='+${param.subId},
			valueField: 'bsId',
			textField: 'bsName'
			});
			
			$('#ctRatio').combobox({
					url :'<%=basePath%>areaEnergyTmnl/getCodeNameByCode.action?codeValue=70034',
		            editable:false,//不可编辑状态
			        valueField:'id',
			        textField:'text'
	        	});
			
			$('#runStatus').combobox({//运行状态
					url :'<%=basePath%>areaEnergyTmnl/getCodeNameByCode.action?codeValue=70033',
		            editable:false,//不可编辑状态
			        valueField:'id',
			        textField:'text'
	        });
			
			$('#bsId').combobox({//所属母线
				value:'${param.bsId}'  
			});
			$('#tranId').combobox({//所属母线
				value:'${param.tranId}'  
			});
			$('#showIndex').combobox({//线路序号
				value:${param.showIndex}
			});
			$('#validFlag').combobox({//是否有效
				value:'${param.validFlag}'
			});
			
			/*$('#lineType').combobox({
				onChange : function(){
					var lineType = $('#lineType').val();
					if(lineType == '03' || lineType == '04'){
						 $("#tranId").combobox({disabled:false});
					}
					if(lineType == '02' || lineType == '01'){
						 $('#tranId').combobox({//当线路类型为01或02时，所属变压器设置为空
							value:''  
						 });
						 $("#tranId").combobox({disabled:true});
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
			
			if('${param.includeFlag}' == '是'){
				$("#includeFlag").attr("checked","true");
			}
		});
		
		function doEdit(){
			if(validateCheck()) {
			
				$.messager.confirm("提示","确定保存信息吗？",doSubmit);
				//MessageBox("确定保存信息吗？","系统提示", T_ICON, MB_YESNO, doSubmit);
			}
		}
		//回调函数
		function doSubmit(result){
			if(result) {
				var para='lineId='+${param.lineId}+'&showIndex='+$('#showIndex').combobox('getValue')+
				'&lineName=' + $('#lineName').textbox('getValue')+'&lineType=' + $('#lineType').combobox('getValue')+
				"&ctRatio="+$('#ctRatio').combobox('getValue')+"&validFlag="+$('#validFlag').combobox('getValue')
				+"&bsId="+$('#bsId').combobox('getValue')+"&terminalId="+$('#tmnlAssetNo').val()+
				"&runStatus="+$('#runStatus').combobox('getValue')+"&remark="+$('#remark').textbox('getValue')+
				"&includeFlag="+$("#includeFlag").val();
				$.ajax({
					url : des.webContextRoot +'line/updateLineMessage.action',
					type: "post",
					dataType:"text",
					data : para,
					timeout:60000, 
					error : function (XMLHttpRequest, textStatus, errorThrown) {
					//去除遮罩
					disWaitDisplayForQuery();
					$.messager.confirm("提示","保存失败");
					//MessageBox("保存失败","系统异常",MB_ERROR,MB_OK);
					},
					success : function(res) {
							if (res != "" && res != null) {
								if(res == "repeatLineName"){
									 $.messager.confirm("提示","线路名称重复，请重新输入");
								 }else if(res == 'error'){
								 	$.messager.confirm("提示","保存失败");
								 }else{
								 	$.messager.confirm("提示","保存成功",function(){
								 		window.close();
										//window.opener.refreshPage();
										opener.parent.com.frontier.areaEnergy.baseData.reloadTree.flushAndClickCurrentNode();
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
			     if($('#lineType').combobox('getValue') == "") {
			          $.messager.confirm("提示","线路类型不能为空，请选择！");
			           return false;
			     }
			     if($('#bsId').combobox('getValue') == "") {
			          $.messager.confirm("提示","所属母线不能为空，请选择");
			           return false;
			     }
			     if($('#ctRatio').combobox('getValue') == "") {
			          $.messager.confirm("提示","电流变比CT不能为空，请输入");
			           return false;
			     }
			     if($('#terminalId').textbox('getValue') == "") {
			          $.messager.confirm("提示","所属终端不能为空，请输入");
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
				var url = "<%=basePath %>pages/areaEnergy/line/tmnlMessageList.jsp?subId="+'${param.subId}';
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
	</script>
	</head>
	<body srolling='no'>
		<div id='queryDiv' class="container-shadow container-marginTop" style="width:100%;margin-top: 0;">
		<input type='hidden' id='tmnlAssetNo' name='tmnlAssetNo' value="${param.tmnlId }">
            <div class="easyui-panel" title="修改线路信息" style="width:100%;padding:5px 10px;">
                <table style="width:100%;" class="easyui-panel" cellspacing="8px" cellpadding="0" border="0">
                    <tbody>
                             <tr>
                                <td class="td-label" align = "right">线路名称：</td>
                                <td >
                                    <input class="easyui-textbox" size="27"  id="lineName" value="${param.lineName }"
                                     data-options="required:true,missingMessage:'请输入线路名称'"
                                    >
                                    <font style="color: red;">*</font>
                                </td>
                                <td class="td-label" align = "right">线路类型：</td>
                                <td>
                                    <input id="lineType"  value="${param.lineType}" size="27" editable='false'> 
                                    <font style="color: red;">*</font>
                                </td>
                                <td class="td-fillwidth"></td>
                                <td class="td-label" align = "right">所属终端：</td>
                                <td >
                                    <input class="easyui-textbox" size="27"  id="terminalId" value="${param.terminalId }" editable='false'
                                    data-options="required:true,missingMessage:'请选择所属终端'"
                                    >
                                    <a onclick="queryTmnlMessageList();" style="cursor:pointer"><img src="<%=basePath%>images/query.gif">
                                    <font style="color: red;">*</font>
                                </td>
                             </tr>
                             <tr>
                             	<td class="td-label" align = "right">所属母线：</td>
                             	<td>
                                    <select class="easyui-combobox" id="bsId" data-options="width:205,prompt:'${param.bsId }',panelHeight:'100',editable:false"></select>
                                    <font style="color: red;">*</font>
                                </td>
                             	<td class="td-label" align = "right">电压等级：</td>
                                <td >
                                    <input class="easyui-textbox" size="27"  id="voltCode" disabled = "disabled" editable='false'>
                                    <font style="color: red;">*</font>
                                </td>
                                <td class="td-fillwidth"></td>
                                <td class="td-label" align = "right">降压层级（母线）：</td>
                             	<td >
                                    <input class="easyui-textbox" size="27"  id="voltLevel" disabled = "disabled" editable='false'>
                                    <font style="color: red;">*</font>
                                </td>
                             </tr>
                             <tr>
                             	 <td class="td-label" align = "right">PT：</td>
                                <td >
                                    <input class="easyui-textbox" size="27"  id="ptRatio" 
                                    data-options="required:true,missingMessage:'请输入电压变比PT'"
                                    >
                                    <font style="color: red;">*</font>
                                </td>
                             	 <td class="td-label" align = "right">CT：</td>
                                <td >
                                    <input  size="27"  id="ctRatio" value="${param.ct }"
                                     data-options="required:true,missingMessage:'请输入电流变比CT'"
                                    >
                                    <font style="color: red;">*</font>
                                </td>
                                <td class="td-fillwidth"></td>
                                <td class="td-label"  align="right">
									运行状态：
								</td>
								<td >
									<input id="runStatus"  value="${param.runStatus }" size="27" editable='false'> 
                                    <font style="color: red;">*</font>
								</td>
                             </tr>
                             <tr>
                             	 <td class="td-label" align = "right">是否有效：</td>
                             	<td>
                                 <select class="easyui-combobox" id="validFlag" data-options="width:205,prompt:'${param.validFlag }',panelHeight:'auto' ,editable:false">
                                     <option value="1">有效</option>
                                     <option value="2">无效</option>
                                 </select>
                                 <font style="color: red;">*</font>
                             	</td>
                             	<td class="td-label" align = "right">显示序号：</td>
                                <td>
                                    <select class="easyui-combobox" id="showIndex" data-options="width:205,panelHeight:'100' ,editable:false">
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option> 
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option> 
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                    </select>
                                   <font style="color: red;">*</font>
                                </td>
                                <td class="td-fillwidth"></td>
                             	<td class="td-label" align="right">电压测点:</td>
                                <td align="left" class="td-label"  nowrap="nowrap">
									<input type="checkbox" id="includeFlag"  onclick="selectChk(this);" name="includeFlag"  value="0"/>
								</td>
                             </tr>
							<tr>
                                <td class="td-label" align = "right">备注：</td>
                                <td colspan = '5'>
                                    <input class="easyui-textbox" data-options = 'multiline:true' value = '${param.remark }' id="remark" style= "width:550px;height:100px;">
                                </td>
                            </tr>
                     </tbody>
               </table>
               <div style="padding: 10px; text-align: center">
                    <button class="easyui-linkbutton c1" onclick="doEdit();" style="width:70px;">保存</button>
               </div>
            </div>
        </div>
	    <div style="padding:5" border="false"> 
	        <table id="collArchiveTable"></table>
	    </div>
	</body>

</html>
