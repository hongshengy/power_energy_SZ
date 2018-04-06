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
    <title>新增线路</title>
   	<jsp:include page="/pages/areaEnergy/common/head.jsp">
   		<jsp:param name="flag" value="flag='13'" />
   	</jsp:include>
   	<script type="text/javascript">
		
		$(function(){
			getTmnl();
			var roleCode = $('#roleCode').val();
			//线路类型
			$('#lineType').combobox({
				 url :'<%=basePath%>areaEnergyTmnl/getCodeNameByCode.action?codeValue=70024&content=1',
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
			
			/*$('#remark').textbox({
				inputEvents:$.extend({},$.fn.textbox.defaults.inputEvents,{
					keyup:function(event){
						if(event.keyCode == 13){
							var remark = $('#remark').textbox('getValue')+'\n';
							$('#remark').textbox('setValue',remark);
						}
					}
				})
			});*/
			
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
										
									}
							  }
						  });
					}
					
				}
			});
			
		});
		
		function getTmnl(){
			$.ajax({
				url : des.webContextRoot +'line/getTmnl.action',
				type: "post",
				dataType:"json",
				data : {"subsId":${param.subId}},
				timeout:60000, 
				error : function (XMLHttpRequest, textStatus, errorThrown) {
					//去除遮罩
					$.messager.confirm("提示","保存失败");
				},
				success : function(result) {
						if(result.flag=='1'){
							$('#terminalId').textbox('setValue',result.tmnlAssetNo) ;
							$('#tmnlAssetNo').attr('value',result.tmnlId) ;
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
				var para='showIndex='+$('#showIndex').textbox('getValue')+'&lineName=' + $('#lineName').textbox('getValue')+
				'&lineType=' + $('#lineType').combobox('getValue')+"&bsId="+$('#bsId').combobox('getValue')+
				"&ctRatio="+$('#ctRatio').combobox('getValue')+
				"&validFlag="+$('#validFlag').combobox('getValue')+"&terminalId="+$('#tmnlAssetNo').val()+
				"&runStatus="+$('#runStatus').combobox('getValue')+"&remark="+$('#remark').textbox('getValue')+
				"&includeFlag="+$("#includeFlag").val()+'&subId='+'${param.subId}'+'&consId='+'${param.consId}'
				'&voltCode='+''+
				"&ptRatio="+'';
				$.ajax({
					url : des.webContextRoot +'line/insertNewLine.action',
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
									 $.messager.confirm("提示","同一终端下的线路名称不能重复，请重新输入");
								 }else if(res == "error"){
								 	$.messager.confirm("提示","保存失败");
								 }else{
								 	$.messager.confirm("提示","保存成功",function(){
								 		window.close();
										opener.parent.com.frontier.areaEnergy.baseData.reloadTree.flushAndClickCurrentNode();
										//window.opener.refreshPage();
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
			     if($('#showIndex').textbox('getValue') == "") {
			          $.messager.confirm("提示","线路显示序号不能为空，请输入");
			           return false;
			     }
			     
			     if($('#showIndex').textbox('getValue') < '${param.dataTotal}') {
			          $.messager.confirm("提示","线路显示序号不能小于${param.dataTotal}，请输入");
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
		<div id='queryDiv' class="container-shadow container-marginTop" style="width:100%;">
		    <input type='hidden' id='tmnlAssetNo' name='terminalId' value="">
		    <input type='hidden' id='roleCode' name='roleCode' value="${param.roleCode }">
            <div class="easyui-panel" title="新增线路信息" style="width:100%;padding:30px 10px;">
                <table style="width:100%;" class="easyui-panel" cellspacing="8px" cellpadding="0" border="0">
                    <tbody>
                             <tr>
                                <td class="td-label" align="right">线路名称：</td>
                                <td >
                                    <input class="easyui-textbox" size="27" id="lineName"
                                    data-options="required:true,missingMessage:'请输入线路名称'"
                                    >
                                   <font style="color: red;">*</font>
                                </td>
                                <td class="td-label" align="right">线路类型：</td>
                                <td>
                                	<input id="lineType"  value=""  size="27"  editable = 'false'  > 
                                    <font style="color: red;">*</font>
                                </td>
                                <td class="td-fillwidth"></td>
                                <td class="td-label" align="right">所属终端：</td>
                                <td >
                                    <input class="easyui-textbox" size="27" id="terminalId" editable='false' 
                                     data-options="required:true,missingMessage:'请选择所属终端'">
                                    <a onclick="queryTmnlMessageList();" style="cursor:pointer"><img src="<%=basePath%>images/query.gif">
                                    <font style="color: red;">*</font>
                                </td>
                             </tr>
                             <tr>
                             	<td class="td-label" align="right">所属母线：</td>
                             	<td>
                                    <select class="easyui-combobox" id="bsId" data-options="width:205,prompt:'请选择',panelHeight:'100',editable:false"></select>
                                    <font style="color: red;">*</font>
                                </td>
                             	<td class="td-label" align="right">电压等级：</td>
                                <td >
                                    <input class="easyui-textbox" size="27" id="voltCode" disabled = "disabled">
                                    <font style="color: red;">*</font>
                                </td>
                                <td class="td-fillwidth"></td>
                                <td class="td-label" align="right">降压层级（母线）：</td>
                             	<td >
                                    <input class="easyui-textbox" size="27" id="voltLevel" disabled = "disabled">
                                    <font style="color: red;">*</font>
                                </td>
                             </tr>
                             <tr>
                             	 <td class="td-label" align="right" >PT：</td>
                                <td >
                                    <input class="easyui-textbox" size="27" id="ptRatio" disabled = "disabled"
                                    data-options="required:true,missingMessage:'请输入电压变比PT'"
                                    >
                                    <font style="color: red;">*</font>
                                </td>
                             	 <td class="td-label" align="right">CT：</td>
                                <td >
                                    <input  size="27" id="ctRatio" data-options="required:true,missingMessage:'请输入电流变比CT'"
                                    >
                                    <font style="color: red;">*</font>
                                </td>
                                <td class="td-fillwidth"></td>
                                <td class="td-label"  align="right">
									运行状态：
								</td>
								<td >
									<input id="runStatus"  value="1" size="27" editable='false'> 
                                    <font style="color: red;">*</font>
								</td>
                             </tr>
                             <tr>
                            	<td class="td-label" align="right">是否有效：</td>
                             	<td>
                                 <select class="easyui-combobox" id="validFlag" data-options="width:205,prompt:'有效',panelHeight:'auto' ,editable:false">
                                     <option value="1">有效</option>
                                     <option value="2">无效</option>
                                 </select>
                                  <font style="color: red;">*</font>
                             	</td>
                             	<td class="td-label" align="right">显示序号：</td>
                                <td>
                                	<input class="easyui-textbox"  value="${param.dataTotal }" size="27" id="showIndex"
                                    data-options="required:true,missingMessage:'请输入线路显示序号'"
                                    >
                                    <font style="color: red;">*</font>
                                </td>
                                <td class="td-fillwidth"></td>
                                <td class="td-label" align="right"></td>
                                <td align="left" class="td-label"  nowrap="nowrap">
									<input type='hidden'  id="includeFlag"  onclick="selectChk(this);" name="includeFlag"  value="0" />
								</td>
                            </tr>
                            <tr>
                                <td class="td-label" align="right">备注：</td>
                                <td colspan = '5'>
                                    <input class="easyui-textbox" data-options = 'multiline:true'  id="remark" style= "width:550px;height:100px;">
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
