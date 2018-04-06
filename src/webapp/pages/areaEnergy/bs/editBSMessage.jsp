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
    <title>修改母线</title>
   	<jsp:include page="/pages/areaEnergy/common/head.jsp"></jsp:include>
   	<script type="text/javascript">
		
		$(function(){
		
		
			$('#bsIndex').combobox({//母线序号
				value:${param.bsIndex}  
			});
			$('#voltLevel').combobox({//降压层级
				value:'${param.voltLevel}'
			});
			$('#validFlag').combobox({//是否有效
				value:'${param.validFlag}'
			});
			$('#runStatus').combobox({
					url :'<%=basePath%>areaEnergyTmnl/getCodeNameByCode.action?codeValue=70033',
		            editable:false,//不可编辑状态
			        valueField:'id',
			        textField:'text'
	        	});
	        	
			$('#voltCode').combobox({
				 url :'<%=basePath%>areaEnergyTmnl/getCodeNameByCode.action?codeValue=70011',
	            editable:false,//不可编辑状态
		        valueField:'id',
		        textField:'text'
        	});
        	
        	$('#ptRatio').combobox({
				url :'<%=basePath%>areaEnergyTmnl/getCodeNameByCode.action?codeValue=70035',
	            editable:false,//不可编辑状态
		        valueField:'id',
		        textField:'text'
	        });
        	
        	$('#tranId').combobox({//所属变压器
				url:des.webContextRoot +'line/queryTranMessage.action?queryPara.subsId='+${param.subId},
				valueField: 'tranId',
				textField: 'tranName'   
			});
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
				var para='bsIndex='+$('#bsIndex').combobox('getValue')+'&bsName=' + $('#bsName').textbox('getValue')+
				"&ptRatio="+$('#ptRatio').combobox('getValue')+"&validFlag="+$('#validFlag').combobox('getValue')+
				'&voltCode='+$('#voltCode').combobox('getValue')+'&voltLevel='+$('#voltLevel').combobox('getValue')+
				"&terminalId="+$('#tmnlAssetNo').val()+"&runStatus="+$('#runStatus').combobox('getValue')+
				"&remark="+$('#remark').textbox('getValue')+'&bsId='+${param.bsId}+"&tranId="+$('#tranId').combobox('getValue');
				$.ajax({
					url : des.webContextRoot +'bs/updateBSMsg.action',
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
								if(res == "repeatBSName"){
									 $.messager.confirm("提示","母线名称重复，请重新输入");
								 }else if (res == "error"){
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
		  	
			   
			     if($('#bsName').textbox('getValue') == "") {
			          $.messager.confirm("提示","母线名称不能为空，请输入");
			           return false;
			     }
			     if($('#ptRatio').combobox('getValue') == "") {
			          $.messager.confirm("提示","电压变比PT不能为空，请输入！");
			           return false;
			     }
			     if($('#voltCode').combobox('getValue') == "") {
			          $.messager.confirm("提示","电压等级不能为空，请选择！");
			           return false;
			     }
			     if($('#voltLevel').combobox('getValue') == "") {
			          $.messager.confirm("提示","降压层级不能为空，请选择！");
			           return false;
			     }
			     if($('#terminalId').textbox('getValue') == "") {
			          $.messager.confirm("提示","所属终端不能为空，请输入");
			           return false;
			     }
			     if($('#tranId').combobox('getValue') == "") {
			          $.messager.confirm("提示","所属变压器不能为空，请选择");
			           return false;
			     }
			     if($('#runStatus').combobox('getValue') == "") {
			          $.messager.confirm("提示","所属状态不能为空，请选择");
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
	</script>
	</head>
	<body srolling='no'>
		<div id='queryDiv' class="container-shadow container-marginTop" style="width:100%;">
		    <input type='hidden' id='tmnlAssetNo' name='terminalId' value="${param.tmnlId }">
            <div class="easyui-panel" title="修改母线信息" style="width:100%;padding:30px 10px;">
                <table style="width:100%;" class="easyui-panel" cellspacing="8px" cellpadding="0" border="0">
                    <tbody>
                             <tr>
                                <td class="td-label" align = "right">母线名称：</td>
                                <td >
                                    <input class="easyui-textbox" size = "27"  id="bsName" value = '${param.bsName }'
                                    data-options="required:true,missingMessage:'请输入母线名称'"
                                    >
                                    <font style="color: red;">*</font>
                                </td>
                                <td class="td-label"  align="right">
									电压等级:
								</td>
								<td>
									<input id="voltCode"  value="${param.voltCode}" size="27" editable='false' > 
                                    <font style="color: red;">*</font>
								</td>
								<td class="td-label" align = "right">降压层级：</td>
                             	<td>
                                 <select class="easyui-combobox" id="voltLevel" data-options="width:205,prompt:'==请选择==',panelHeight:'auto',editable:false">
                                     <option value="">==请选择==</option>
                                     <option value="0">0级</option>
                                     <option value="1">1级</option>
                                     <option value="2">2级</option>
                                     <option value="3">3级</option>
                                 </select>
                                 <font style="color: red;">*</font>
                             	</td>
                             </tr>
                             <tr>
                                
                             	<td class="td-label" align = "right">PT：</td>
                                <td >
                                    <input  size = "27"  id="ptRatio" value = "${param.ptRatio }" 
                                    data-options="required:true,missingMessage:'请输入电压变比PT'"
                                    >
                                    </a><font style="color: red;">*</font>
                                </td>
                                <td class="td-label" align = "right">所属终端：</td>
                                <td >
                                    <input class="easyui-textbox" size = "27"  id="terminalId" value = '${param.terminalId }'editable='false'
                                     data-options="required:true,missingMessage:'请选择所属终端'"
                                    >
                                    <a onclick="queryTmnlMessageList();" style="cursor:pointer"><img src="<%=basePath%>images/query.gif">
                                    </a><font style="color: red;">*</font>
                                </td>
                                <td class="td-label" align="right">所属变压器：</td>
                             	<td>
                                    <input class="easyui-combobox" id="tranId"  value = "${param.tranId }" size = '27'>
                                    <font style="color: red;">*</font>
                                </td>
                             </tr>
                             <tr>
                             	
                                <td class="td-label"  align="right">
									运行状态：
								</td>
								<td >
									<input id="runStatus"  size="27" value="${param.runStatus }"> 
									<font style="color: red;">*</font>
								</td>
								<td class="td-label" align = "right">是否有效：</td>
                             	<td>
                                 <select class="easyui-combobox" id="validFlag" data-options="width:205,prompt:'有效',panelHeight:'auto',editable:false">
                                     <option value="1">有效</option>
                                     <option value="0">无效</option>
                                 </select>
                                 <font style="color: red;">*</font>
                             	</td>
                             	<td class="td-label" align = "right">显示序号：</td>
                                <td>
                                    <select class="easyui-combobox" id="bsIndex" data-options="width:205,panelHeight:'100',editable:false">
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
                    <button class="easyui-linkbutton c1" onclick="doEdit()" style="width:70px;">保存</button>
                    <button class="easyui-linkbutton c1" onclick="cancel()" style="width:70px;">取消</button>
               </div>
            </div>
        </div>
	    <div style="padding:5" border="false"> 
	        <table id="collArchiveTable"></table>
	    </div>
	</body>

</html>
