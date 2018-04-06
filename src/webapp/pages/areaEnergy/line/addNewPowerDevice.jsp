<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%
	String baseUrl  = request.getContextPath();
	String pagePath = baseUrl + "/pages/despages";	
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%> 

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	 <head>
    <meta charset="UTF-8">
    <title>新增用能设备</title>
   	<jsp:include page="/pages/areaEnergy/common/head.jsp">
   		<jsp:param name="flag" value="flag='13'" />
   	</jsp:include>
   	<script type="text/javascript" src="<%=pagePath %>/common/js/dateUtil.js"></script>
   	<script type="text/javascript">
		
		$(function(){
			getTmnl();
			var changeFlag = true;
			$('#F_LINE_ID').combobox({//所属馈线
			url:des.webContextRoot +'line/queryLineMessage.action?queryPara.subsId='+${param.subId}+'&queryPara.consId='+${param.consId},
			valueField: 'lineId',
			textField: 'lineName'
			});
			$('#BS_ID').combobox({//所属母线
			url:des.webContextRoot +'line/queryBSMessageBak.action?queryPara.subsId='+${param.subId}+'&queryPara.consId='+${param.consId},
			valueField: 'bsId',
			textField: 'bsName'
			});
			//设备类型
			$('#qyDeviceType').combobox({
				 url :'<%=basePath%>areaEnergyTmnl/getCodeNameByCode.action?codeValue=99008',
	            editable:false,//不可编辑状态
		        valueField:'id',
		        textField:'text'
	        });
	        $('#qyDeviceType').combobox({//所属变压器
				value:'1'  
			});
			
			$('#ctRatio').combobox({
					url :'<%=basePath%>areaEnergyTmnl/getCodeNameByCode.action?codeValue=70034',
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
	        	
			$('#runStatus').combobox({//运行状态
					url :'<%=basePath%>areaEnergyTmnl/getCodeNameByCode.action?codeValue=70033',
		            editable:false,//不可编辑状态
			        valueField:'id',
			        textField:'text'
	        });
			
			
	        
	        $('#F_LINE_ID').combobox({
				onChange : function(){
					if(changeFlag){
					var lineId = $("#F_LINE_ID").combobox('getValue');
					if(lineId != ""){
						$.ajax({
							url : des.webContextRoot +'line/queryBSMesgByLineId.action',
							type: "post",
							dataType:"json",
							data : {"lineId":lineId},
							timeout:60000, 
							error : function (XMLHttpRequest, textStatus, errorThrown) {
								//去除遮罩
								$.messager.confirm("提示","保存失败");
							},
							success : function(result) {
									if(result.flag=='1'){
										$("#VOLT_CODE").combobox('setValue',result.VOLT_CODE);
										$("#BS_ID").combobox('setValue',result.BS_ID);
										$("#PT_RATIO").combobox('setValue',result.PT);
										$("#CT_RATIO").combobox('setValue',result.CT_RATIO);
										$("#BS_ID2").attr('value',result.BS_ID);
										$("#voltCode").combobox('setValue',result.VOLT_CODE);
										$("#bsIdBak").combobox('setValue',result.BS_ID);
										$("#ptRatio").combobox('setValue',result.PT);
										$("#ctRatio").combobox('setValue',result.CT_RATIO);
										$("#bsIdBak2").attr('value',result.BS_ID);
									}
							  }
						  });
					}else{
						$("#VOLT_CODE").combobox('setValue','');
						$("#PT_RATIO").combobox('setValue','');
						$("#CT_RATIO").combobox('setValue','');
						$("#voltCode").combobox('setValue','');
						$("#ptRatio").combobox('setValue','');
						$("#ctRatio").combobox('setValue','');
						$('#BS_ID').combobox({//所属馈线
							value:'' 
						});
						$('#BS_ID').combobox({
							onChange : function(){
							var bsId = $("#BS_ID").combobox('getValue');
							if(bsId != ""){
								$.ajax({
									url : des.webContextRoot +'line/queryBSMesgByBsId.action',
									type: "post",
									dataType:"json",
									data : {"bsId":bsId},
									timeout:60000, 
									error : function (XMLHttpRequest, textStatus, errorThrown) {
										//去除遮罩
										//$.messager.confirm("提示","保存失败");
									},
									success : function(result) {
											if(result.flag=='1'){
												$("#VOLT_CODE").combobox('setValue',result.VOLTCODE);
												$("#PT_RATIO").combobox('setValue',result.PTRATIO);
												$("#BS_ID2").attr('value',bsId);
												$("#voltCode").combobox('setValue',result.VOLTCODE);
												$("#ptRatio").combobox('setValue',result.PTRATIO);
												$("#bsIdBak2").attr('value',bsId);
											}
									  }
								  });
							}
						
					}
				});
						
			}
		}
					
	},
	onClick : function(){
		changeFlag = true;
	}
});
			        $('#BS_ID').combobox({
						onChange : function(){
							if(!changeFlag){
							var bsId = $("#BS_ID").combobox('getValue');
							$("#F_LINE_ID").combobox('setValue','');
							$("#CT_RATIO").combobox('setValue','');
							$("#ctRatio").combobox('setValue','');
							$("#voltCode").combobox('setValue','');
							$("#ptRatio").combobox('setValue','');
							if(bsId != ""){
								$.ajax({
									url : des.webContextRoot +'line/queryBSMesgByBsId.action',
									type: "post",
									dataType:"json",
									data : {"bsId":bsId},
									timeout:60000, 
									error : function (XMLHttpRequest, textStatus, errorThrown) {
										//去除遮罩
										//$.messager.confirm("提示","保存失败");
									},
									success : function(result) {
											if(result.flag=='1'){
												$("#VOLT_CODE").combobox('setValue',result.VOLTCODE);
												$("#PT_RATIO").combobox('setValue',result.PTRATIO);
												$("#BS_ID2").attr('value',bsId);
												$("#voltCode").combobox('setValue',result.VOLTCODE);
												$("#ptRatio").combobox('setValue',result.PTRATIO);
												$("#bsIdBak2").attr('value',bsId);
												
											}
									  }
								  });
							}
						}
						
					},
					onClick : function(){
						changeFlag = false;
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
							$('#TMNL_ASSET_NO').attr('value',result.tmnlAssetNo) ;
							$('#tmnlIdbak').val(result.tmnlId) ;
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
				"&bsId="+$('#F_LINE_ID').combobox('getValue')+
				"&ctRatio="+$('#ctRatio').combobox('getValue')+
				"&validFlag="+$('#validFlag').combobox('getValue')+"&terminalId="+$('#tmnlAssetNo').val()+
				"&runStatus="+$('#runStatus').combobox('getValue')+"&remark="+$('#remark').textbox('getValue')+
				"&includeFlag="+$("#includeFlag").val()+'&subId='+'${param.subId}'+'&consId='+'${param.consId}'+
				'&voltCode='+$('#voltCode').combobox('getValue')+
				"&ptRatio="+$('#ptRatio').combobox('getValue')+
				"&bsIdBak="+$('#bsIdBak2').val()+"&deviceType="+$('#qyDeviceType').combobox('getValue');
				$.ajax({
					url : des.webContextRoot +'line/insertNewPower.action',
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
									 $.messager.confirm("提示","同一终端下的用能设备名称不能重复，请重新输入");
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
		  		/*if($('#BS_ID').combobox('getValue') == "") {
			          $.messager.confirm("提示","所属母线不能为空，请输入");
			           return false;
			     }*/
			     if($('#lineName').textbox('getValue') == "") {
			          $.messager.confirm("提示","用能设备名称不能为空，请输入");
			           return false;
			     }
			     /* if($('#ptRatio').combobox('getValue') == "") {
			          $.messager.confirm("提示","电压变比PT不能为空！");
			           return false;
			     }
			     if($('#voltCode').combobox('getValue') == "") {
			          $.messager.confirm("提示","电压等级不能为空！");
			           return false;
			     }
			    /* if($('#lineType').combobox('getValue') == "") {
			          $.messager.confirm("提示","用能设备分类不能为空，请输入！");
			           return false;
			     }*/
			     if($('#ctRatio').combobox('getValue') == "") {
			          $.messager.confirm("提示","电流变比CT不能为空，请输入");
			           return false;
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
				function xiaoshu(numObj){
					var reg = new RegExp("/^[0-9]+(.[0-9]{4})?$/");
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
			//查询所属终端
			function queryTmnlMessageListBak(){
				var url = "<%=basePath %>pages/areaEnergy/line/tmnlMessageListBak.jsp?subId="+'${param.subId}';
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
	<script type="text/javascript">
		  $(function(){
		      queryFormCtrl();
		      getShowIndex();
		      //changeTypeBind();
		      $('#qyDeviceType').combobox({
				onChange : function(){
					queryFormCtrl();
				
				}
			});
		  });
		  
		  function getShowIndex(){
				$.ajax({
					url : des.webContextRoot +'line/getShowIndex.action',
					type: "post",
					dataType:"json",
					data : {"SUBS_ID":${param.subId}},
					timeout:60000, 
					error : function (XMLHttpRequest, textStatus, errorThrown) {
						//去除遮罩
						$.messager.confirm("提示","保存失败");
					},
					success : function(result) {
							if(result.flag=='1'){
								$('#showIndexs').attr('value',result.SHOW_INDEX);
								$('#SHOW_INDEX').textbox('setValue',result.SHOW_INDEX);
							}
					  }
				});
			}
			
		  function queryFormCtrl(){
		     var subsType = $('#subsType').val();
		     var deviceType = $("#qyDeviceType").combobox('getValue');
		     if("1" == deviceType || "12" == deviceType || "13" == deviceType ||"14" == deviceType){
		    	 $("#ynsb").css("display","block");
		    	 //$("#redSign").css("display","inline-block");
		    	 $("#ynsb1").css("display","none");
		    	 $("#ynsb1button").css("display","none");
		     }else{
		    	 $("#ynsb").css("display","none");
		    	 $("#ynsb1").css("display","block");
		    	 //$("#redSign").css("display","none");
		    	 $("#ynsb1button").css("display","block");
			     $('#formTable').empty();
		         $.ajax({
		              url : des.webContextRoot+"areaEnergy/queryFormCtrl.action?subsType="+subsType+'&deviceType='+deviceType,
		              type: "post",
		              dataType:"json",
		              timeout:60000,
		              async:false,
		              error:function (XMLHttpRequest, textStatus, errorThrown) {
		         	       alert('程序异常');
		              },
		              success:function(result) {
		                  var str='';
		                  var ctrlStr='';
		                  var obj;
		                  var comArr=[];
		                  var dateArr=[];
		                  var inputArr=[];
		                  var textAreaArr = [];
		                  for(var i=0;i<result.list.length;i++){
		                     obj = result.list[i];
		                     if(obj.WORD_TYPE=='DATE' ||  obj.WORD_TYPE=='date' ){
		                    	 dateArr.push(obj);
		                     }
		                     if(obj.WORD_CTRL=='input' && obj.IS_MUST_WORD == 0){
		                          ctrlStr='<input id="'+obj.WORD_NAME_EN+'" name="'+obj.WORD_NAME_EN+'" size="27">'+'<font style="color: red;">*</font>';
		                          inputArr.push(obj);
		                     }else if(obj.WORD_CTRL=='input' && obj.IS_MUST_WORD == 1){
		                    	  ctrlStr='<input id="'+obj.WORD_NAME_EN+'" name="'+obj.WORD_NAME_EN+'" size="27">';
		                    	  inputArr.push(obj);
		                     }else if(obj.WORD_CTRL=='select'  && obj.IS_MUST_WORD == 0){
		                          ctrlStr='<input id="'+obj.WORD_NAME_EN+'" name="'+obj.WORD_NAME_EN+'" size="27">'+'<font style="color: red;">*</font>';
		                          comArr.push(obj);
		                     }else if(obj.WORD_CTRL=='select'  && obj.IS_MUST_WORD == 1){
		                          ctrlStr='<input id="'+obj.WORD_NAME_EN+'" name="'+obj.WORD_NAME_EN+'" size="27">';
		                          comArr.push(obj);
		                     }else if(obj.WORD_CTRL=='textarea'){
		                    	 ctrlStr='<input id="'+obj.WORD_NAME_EN+'" name="'+obj.WORD_NAME_EN+'" size="27">';
		                    	 textAreaArr.push(obj);
		                     }else if(obj.WORD_CTRL=='checkbox'){
		                          ctrlStr='<input id="'+obj.WORD_NAME_EN+'" name="'+obj.WORD_NAME_EN+'" size="27" type="checkbox" onclick="selectChk(this);" value="2">';
		                     }
		                     if(obj.WORD_NAME_CH =="所属终端" || obj.WORD_NAME_CH =="终端ID"){
		                    	 ctrlStr = ctrlStr+'<a onclick="javascript:queryTmnlMessageListBak()"><img src="<%=basePath%>images/query.gif"> </a>';
		                     }
		                     if(obj.WORD_NAME_EN =="LINE_TYPE"){
		                    	 continue;
		                     }
		                     if((i+1)%3==1){
		                           str=str+'<tr><td class="td-label" align="center" nowrap="nowrap" width="95">'+obj.WORD_NAME_CH+'</td>'
		                                +'<td width="25%">'+ctrlStr+'</td>';
		                        
		                     }else if((i+1)%3==0){
		                           str=str+'<td class="td-label" align="center" nowrap="nowrap" width="92">'+obj.WORD_NAME_CH+'</td>'
		                                +'<td width="25%">'+ctrlStr+'</td></tr>';
		                     }else{
		                           str=str+'<td class="td-label" align="center" nowrap="nowrap">'+obj.WORD_NAME_CH+'</td>'
		                                +'<td width="25%">'+ctrlStr+'</td>';
		                     } 
		                  }
		                  $('#formTable').append(str);
		                  //combobox码值加载
		                  for(var i=0;i<comArr.length;i++){
		                	  if(comArr[i].WORD_NAME_EN == "LINE_TYPE"){
		                		  $('#'+comArr[i].WORD_NAME_EN).combobox({
							          url :'<%=basePath%>areaEnergyTmnl/getCodeNameByCode.action?codeValue='+comArr[i].CODE_VALUE+'&content=3',
							          editable:false,
							          valueField:'id',
							          textField:'text',
							          width:205
							      });
		                	  }else{
			                      $('#'+comArr[i].WORD_NAME_EN).combobox({
							          url :'<%=basePath%>areaEnergyTmnl/getCodeNameByCode.action?codeValue='+comArr[i].CODE_VALUE,
							          editable:false,
							          valueField:'id',
							          textField:'text',
							          width:205
							      });
		                	  }
		                      
		                  }
		                  for(var i=0;i<inputArr.length;i++){
		                      $('#'+inputArr[i].WORD_NAME_EN).textbox({    
		                    	  width:205
		                    	});
		                  }
		                  for(var i=0;i<textAreaArr.length;i++){
		                      $('#'+textAreaArr[i].WORD_NAME_EN).textbox({    
		                    	  width:205,
		                    	  multiline:true
		                    	});
		                  }
		                  var endDate = new Date();
		                  for(var i=0;i<dateArr.length;i++){
		                	  $('#'+dateArr[i].WORD_NAME_EN).datebox({    
			                	    required:false ,
			                	    width:205
		                	  });
		                	  $('#'+dateArr[i].WORD_NAME_EN).datebox('setValue',DateUtil.dateToStr('yyyy-MM-dd',endDate));
		                  }
		                  $('#TERMINAL_ID').textbox('setValue',$('#TMNL_ASSET_NO').val());
		                  $('#SHOW_INDEX').textbox('setValue',$('#showIndexs').val());
		                  $('#SHOW_INDEX').textbox({
		                	  editable:false
		                  });
		                  $('#TERMINAL_ID').textbox({
		                	  editable:false
		                  });
		                  $('#VALID_FLAG').combobox({//是否有效
			      			value:1
		      			  });
		                  $('#RUN_STATUS').combobox({//是否有效
		      				value:1
		      			  });
		                  
		              }
		          });
		     }
	       }
	       
	      function changeTypeBind(){
	          $('#SE_SUB_TYPE').combobox({
				onChange : function(){
					$('#deviceType').val('3');
					$('#formTable').children().detach();
					queryFormCtrl();
				}
			  });
	      }
	     
	      function otherSaveData(){
				if(validateCheckOther()) {
					doSubmit1();
					//MessageBox("确定保存信息吗？","系统提示", T_ICON, MB_YESNO, doSubmit);
				}
			}
	      
	   // checkBox 选择
	  	function selectChk(obj) {
	  		if(obj.checked) {
	  			obj.value = "1";
	  		} else {
	  			obj.value = "2";
	  		}
	  	}
	      
	  	function doSubmit1(){
			$.messager.confirm('确认','确认想要保存设备信息吗？',function(r) {
						if (r) {
							$.messager.progress();
							$('#otherForm').form('submit',{
							url :des.webContextRoot+"bs/addOtherDeviceInfo.action", 
						    success:function(res){    
					    	 $.messager.progress('close');
								if (res != "" && res != null) {
									if(res == "repeatPCSName"){
										 $.messager.confirm("提示","同一变电站下的变流器名称不能重复，请重新输入");
									 }else if (res == "error"){
									 	$.messager.confirm("提示","保存失败");
									 }else{
									 	$.messager.confirm("提示","保存成功",function(){
									 		window.close();
											opener.parent.com.frontier.areaEnergy.baseData.reloadTree.flushAndClickCurrentNode();
									 	});
									}
								}else{
									$.messager.confirm('确认','系统异常!');
								}
						} 
					}); 
				}    
			});
		}
	  	
	 // 画面合法性check
	  	function validateCheckOther() {
	  		var deviceType = $("#qyDeviceType").combobox('getValue');
	  		/**if($('#BS_ID').combobox('getValue') == "") {
		          $.messager.confirm("提示","所属母线不能为空！");
		           return false;
		     }**/
	  		if($('#LINE_NAME').val() == "") {
		          $.messager.confirm("提示","用能设备名称不能为空！");
		           return false;
		     }
	  		 if($('#TERMINAL_ID').val() == "") {
		          $.messager.confirm("提示","所属终端不能为空！");
		           return false;
		     }
	  		if($('#VOLT_CODE').combobox('getValue') == "") {
		          $.messager.confirm("提示","电压等级不能为空！");
		           return false;
		     }
		     /**if($('#PT_RATIO').combobox('getValue') == "") {
		          $.messager.confirm("提示","电压变比PT不能为空！");
		           return false;
		     }
	  		if($('#CT_RATIO').combobox('getValue') == "") {
		          $.messager.confirm("提示","电流变比CT不能为空！");
		           return false;
		     }**/
	  		if($('#RUN_STATUS').combobox('getValue') == "") {
		          $.messager.confirm("提示","运行状态不能为空！");
		           return false;
		     }
	  		if($('#VALID_FLAG').combobox('getValue') == "") {
		          $.messager.confirm("提示","有效标记不能为空！");
		           return false;
		     }
	  		if('4' == deviceType){
	  			if($('#FACTORY_CODE').combobox('getValue') == "") {
			          $.messager.confirm("提示","制造单位名称不能为空");
			           return false;
			     }
			     
			     if($('#MACHINE_KIND').combobox('getValue') == "") {
			          $.messager.confirm("提示","机组型号不能为空");
			           return false;
			     }
			     if($('#TAKE_WIND').val() != "" && !onlyNumInput($('#TAKE_WIND').val())) {
			          $.messager.confirm("提示","请输入不超过16位数字的风机送风量");
			           return false;
			     }
			     if($('#QUANTITY').val() != "" && !onlyNumInput($('#QUANTITY').val())) {
			          $.messager.confirm("提示","请输入不超过16位数字的数量（组）");
			           return false;
			     }
			     if($('#NOMINAL_SET_Q').val() != "" && !onlyNumInput($('#NOMINAL_SET_Q').val())) {
			          $.messager.confirm("提示","请输入不超过16位数字的名义制冷(热)量");
			           return false;
			     }
			     if($('#STANDARD_POWER_H').val() != "" && !onlyNumInput($('#STANDARD_POWER_H').val())) {
			          $.messager.confirm("提示","请输入不超过16位数字的额定功率(制冷)");
			           return false;
			     }
			     if($('#STANDARD_POWER_C').val() != "" && !onlyNumInput($('#STANDARD_POWER_C').val())) {
			          $.messager.confirm("提示","请输入不超过16位数字的额定功率(制热)");
			           return false;
			     }
			     if($('#STANDARD_CURRENT_T').val() != "" && !onlyNumInput($('#STANDARD_CURRENT_T').val())) {
			          $.messager.confirm("提示","请输入不超过16位数字的额定电流(制冷)");
			           return false;
			     }
			     if($('#STANDARD_CURRENT_C').val() != "" && !onlyNumInput($('#STANDARD_CURRENT_C').val())) {
			          $.messager.confirm("提示","请输入不超过16位数字的额定电流(制热)");
			           return false;
			     }
			     if($('#COOL_WATER_IN_T').val() != "" && !onlyNumInput($('#COOL_WATER_IN_T').val())) {
			          $.messager.confirm("提示","请输入不超过16位数字的冷水进出口温度");
			           return false;
			     }
			     if($('#COOL_WATER_OUT_T').val() != "" && !onlyNumInput($('#COOL_WATER_OUT_T').val())) {
			          $.messager.confirm("提示","请输入不超过16位数字的冷水出口温度");
			           return false;
			     }
			     if($('#HOT_WATER_OUT_T').val() != "" && !onlyNumInput($('#HOT_WATER_OUT_T').val())) {
			          $.messager.confirm("提示","请输入不超过16位数字的热水出口温度");
			           return false;
			     }
			     if($('#COOL_WATER_IN_TEP').val() != "" && !onlyNumInput($('#COOL_WATER_IN_TEP').val())) {
			          $.messager.confirm("提示","请输入不超过16位数字的冷却水进口温度");
			           return false;
			     }
			     if($('#WATER_RATE_FLOW').val() != "" && !onlyNumInput($('#WATER_RATE_FLOW').val())) {
			          $.messager.confirm("提示","请输入不超过16位数字的冷水/热水流量");
			           return false;
			     }
			     if($('#WATER_RATE_FLOW_C').val() != "" && !onlyNumInput($('#WATER_RATE_FLOW_C').val())) {
			          $.messager.confirm("提示","请输入不超过16位数字的冷水/冷却水流量");
			           return false;
			     }
			     if($('#WORK_RATION').val() != "" && !onlyNumInput($('#WORK_RATION').val())) {
			          $.messager.confirm("提示","请输入不超过16位数字的工况性能系数");
			           return false;
			     }
			     
	  		}
	  		if('5' == deviceType){
	  			if($('#FACTORY_CODE').combobox('getValue') == "") { 
			          $.messager.confirm("提示","生产厂家名称不能为空");
			           return false;
			     }
	  			if($('#PRODUCT_KIND').combobox('getValue') == "") {
			          $.messager.confirm("提示","产品型号不能为空");
			           return false;
			     }
	  			if($('#IS_CHANGER').combobox('getValue') == "") {
			          $.messager.confirm("提示","是否变频不能为空");
			           return false;
			     }
	  			if($('#STANDARD_POWER').val()  == "") {
			          $.messager.confirm("提示","额定功率不能为空");
			           return false;
			     }
			     if($('#RATE_FLOW').val() != "" && !onlyNumInput($('#RATE_FLOW').val())) {
			          $.messager.confirm("提示","请输入不超过16位数字的流量");
			           return false;
			     }
			     if($('#DELIVERY_HEAD').val() != "" && !onlyNumInput($('#DELIVERY_HEAD').val())) {
			          $.messager.confirm("提示","请输入不超过16位数字的扬程");
			           return false;
			     }
			     if($('#SPEED').val() != "" && !onlyNumInput($('#SPEED').val())) {
			          $.messager.confirm("提示","请输入不超过16位数字的转速");
			           return false;
			     }
			     
	  		}
	  		if('6' == deviceType){
	  			if($('#PRODUCT_KIND').combobox('getValue') == "") {
			          $.messager.confirm("提示","产品型号不能为空");
			           return false;
			     }
			     if($('#SET_TEP').val() != "" && !onlyNumInput($('#SET_TEP').val())) {
			          $.messager.confirm("提示","请输入不超过16位数字的设定温度");
			           return false;
			     }
			     if($('#STANDARD_POWER').val() == "" || !onlyNumInput($('#STANDARD_POWER').val())) {
			          $.messager.confirm("提示","请输入不超过16位数字的额定功率");
			           return false;
			     }
	  		}
	  		if('7' == deviceType){
	  			if($('#FACTORY_CODE').combobox('getValue') == "") {
			          $.messager.confirm("提示","生产厂家不能为空");
			           return false;
			     }
	  			if($('#PRODUCT_KIND').combobox('getValue') == "") {
			          $.messager.confirm("提示","产品型号不能为空");
			           return false;
			     }
			     if($('#STANDARD_POWER').val() == "" || !onlyNumInput($('#STANDARD_POWER').val())) {
			          $.messager.confirm("提示","请输入不超过16位数字的额定功率");
			           return false;
			     }
			     if($('#IS_CHANGER').combobox('getValue') == "") {
			          $.messager.confirm("提示","是否变频不能为空");
			           return false;
			     }
			     if($('#RATE_FLOW').val() != "" && !onlyNumInput($('#RATE_FLOW').val())) {
			          $.messager.confirm("提示","请输入不超过16位数字的流量");
			           return false;
			     }
			     if($('#IN_TEP').val() != "" && !onlyNumInput($('#IN_TEP').val())) {
			          $.messager.confirm("提示","请输入不超过16位数字的进水温度");
			           return false;
			     }
			     if($('#OUT_TEP').val() != "" && !onlyNumInput($('#OUT_TEP').val())) {
			          $.messager.confirm("提示","请输入不超过16位数字的出水温度");
			           return false;
			     }
			     if($('#OUT_PIPE').val() != "" && !onlyNumInput($('#OUT_PIPE').val())) {
			          $.messager.confirm("提示","请输入不超过16位数字的出水管径");
			           return false;
			     }
			     if($('#IN_PIPE').val() != "" && !onlyNumInput($('#IN_PIPE').val())) {
			          $.messager.confirm("提示","请输入不超过16位数字的进水管径");
			           return false;
			     }
			     if($('#COOL_ABILITY').val() != "" && !onlyNumInput($('#COOL_ABILITY').val())) {
			          $.messager.confirm("提示","请输入不超过16位数字的冷却能力");
			           return false;
			     }
			     
	  		}
	  		if('8' == deviceType){
	  			if($('#DEVICE_KIND').combobox('getValue') == "") {
			          $.messager.confirm("提示","种类(类型)不能为空");
			           return false;
			     }
	  			if($('#FACTORY_CODE').combobox('getValue') == "") {
			          $.messager.confirm("提示","生产厂家不能为空");
			           return false;
			     }
	  			if($('#MAKE_PERMIT_SEQ').val() == "") {
			          $.messager.confirm("提示","生产许可证号不能为空");
			           return false;
			     }
	  			if($('#PRODUCT_CODE').val() == "") {
			          $.messager.confirm("提示","产品编码不能为空");
			           return false;
			     }
	  			if($('#SERIES_SEQ').val() == "") {
			          $.messager.confirm("提示","系列号不能为空");
			           return false;
			     }
			     if($('#OUT_FACTORY_DATE').datebox('getValue')  == "") {
			          $.messager.confirm("提示","出厂日期不能为空");
			           return false;
			     }
			     if($('#PRODUCT_KIND').combobox('getValue') == "") {
			          $.messager.confirm("提示","产品型号不能为空");
			           return false;
			     }
			     if($('#WEIGHT').val() != "" && !onlyNumInput($('#WEIGHT').val())) {
			          $.messager.confirm("提示","请输入不超过16位数字的重量");
			           return false;
			     }
			     if($('#SPEED').val() != "" && !onlyNumInput($('#SPEED').val())) {
			          $.messager.confirm("提示","请输入不超过16位数字的转速");
			           return false;
			     }
			     if($('#AIR_OUT_P').val() != "" && !onlyNumInput($('#AIR_OUT_P').val())) {
			          $.messager.confirm("提示","请输入不超过16位数字的排气压力");
			           return false;
			     }
			     if($('#AIR_OUT_SIZE').val() != "" && !onlyNumInput($('#AIR_OUT_SIZE').val())) {
			          $.messager.confirm("提示","请输入不超过16位数字的排气量");
			           return false;
			     }
			     if($('#COMPRESS_STEP').val() != "" && !onlyNumInput($('#COMPRESS_STEP').val())) {
			          $.messager.confirm("提示","请输入不超过16位数字的压缩级数");
			           return false;
			     }
			     if($('#VOLUME_FLOW').val() != "" && !onlyNumInput($('#VOLUME_FLOW').val())) {
			          $.messager.confirm("提示","请输入不超过16位数字的容积流量");
			           return false;
			     }
			     if($('#WORK_P').val() != "" && !onlyNumInput($('#WORK_P').val())) {
			          $.messager.confirm("提示","请输入不超过16位数字的工作压力");
			           return false;
			     }
			     if($('#POWER_RATE').val() != "" && !onlyNumInput($('#POWER_RATE').val())) {
			          $.messager.confirm("提示","请输入不超过16位数字的电机功率");
			           return false;
			     }
	  		}
	  		if('9' == deviceType){
	  			if($('#DEVICE_KIND').combobox('getValue') == "") {
			          $.messager.confirm("提示","种类(类型)不能为空");
			           return false;
			     }
	  			if($('#FACTORY_CODE').combobox('getValue') == "") {
			          $.messager.confirm("提示","生产厂家不能为空");
			           return false;
			     }
	  			if($('#PRODUCT_KIND').combobox('getValue') == "") {
			          $.messager.confirm("提示","产品型号不能为空");
			           return false;
			     }
	  			if($('#LINE_MODE').combobox('getValue') == "") {
			          $.messager.confirm("提示","接线方式不能为空");
			           return false;
			     }
	  			if($('#PROTECT_GRADES').combobox('getValue') == "") {
			          $.messager.confirm("提示","防护等级不能为空");
			           return false;
			     }
	  			if($('#LOSS_GRADES').combobox('getValue') == "") {
			          $.messager.confirm("提示","绝缘等级不能为空");
			           return false;
			     }
			      if($('#STANDARD_VOLT_H').val() == "" || !onlyNumInput($('#STANDARD_VOLT_H').val())) {
			          $.messager.confirm("提示","请输入不超过16位数字的额定电压");
			           return false;
			     }
			      /* if($('#STANDARD_VOLT_L').val() == "" || !onlyNumInput($('#STANDARD_VOLT_L').val())) {
			          $.messager.confirm("提示","请输入不超过16位数字的额定电压(低压)");
			           return false;
			     }*/
			     if($('#STANDARD_CURRENT_H').val() == "" || !onlyNumInput($('#STANDARD_CURRENT_H').val())) {
			          $.messager.confirm("提示","请输入不超过16位数字的额定电流");
			           return false;
			     }
			     /* if($('#STANDARD_CURRENT_L').val() == "" || !onlyNumInput($('#STANDARD_CURRENT_L').val())) {
			          $.messager.confirm("提示","请输入不超过16位数字的额定电流(低压)");
			           return false;
			     } */
			     if($('#STANDARD_POWER').val() == "" || !onlyNumInput($('#STANDARD_POWER').val())) {
			          $.messager.confirm("提示","请输入不超过16位数字的额定功率");
			           return false;
			     }
			     if($('#POWER_FACTORS').val() == "" || xiaoshu($('#POWER_FACTORS').val())) {
			          $.messager.confirm("提示","请输入不超过16位数字的功率因数");
			           return false;
			     }
			     if($('#SPEED').val() != "" && !onlyNumInput($('#SPEED').val())) {
			          $.messager.confirm("提示","请输入不超过16位数字的转速");
			           return false;
			     }
			     if($('#EFFICIENT').val() != "" && !onlyNumInput($('#EFFICIENT').val())) {
			          $.messager.confirm("提示","请输入不超过16位数字的效率");
			           return false;
			     }
			     if($('#WORK_TIMES').val() != "" && !onlyNumInput($('#WORK_TIMES').val())) {
			          $.messager.confirm("提示","请输入不超过5位数字的工作制");
			           return false;
			     }
			     
	  		}
	    	return true;
		}
	      
	      
	      
        </script>
	
	
	
	
	</head>
	<body srolling='no'>
		<div id='queryDiv' class="container-shadow container-marginTop" style="width:100%;">
		    <input type='hidden' id='tmnlAssetNo' name='terminalId' value="">
		    <input type='hidden' id='bsIdBak2' name='bsIdBak2' value="">
		    
            <div id='view2' style="width: 100%;" >
	             <div id="cxTab" class="easyui-tabs" style="width:100%;">  
	             	<!--  <div title="新建用能设备" id="ynsb" style="display:none;">
		                <table style="width:100%;" class="easyui-panel" cellspacing="8px" cellpadding="0" border="0">
		                    <tbody>
		                             <tr>
		                                <td class="td-label" align="right">用能设备名称：</td>
		                                <td >
		                                    <input class="easyui-textbox" id="lineName" style="width:205px;"
		                                    data-options="required:true,missingMessage:'请输入用能设备名称'"
		                                    >
		                                   <font style="color: red;">*</font>
		                                </td>
		                                <td class="td-fillwidth"></td>
		                                <td class="td-label" align="right">所属终端：</td>
		                                <td >
		                                    <input class="easyui-textbox"  style="width:185px;" id="terminalId" editable='false' 
		                                     data-options="required:true,missingMessage:'请选择所属终端'">
		                                    <a onclick="queryTmnlMessageList();" style="cursor:pointer"><img src="<%=basePath%>images/query.gif">
		                                    <font style="color: red;">*</font>
		                                </td>
		                                <td class="td-fillwidth"></td>
		                                
		                                
		                             </tr>
		                             <tr>
		                             	
		                                <td class="td-fillwidth"></td>
		                             	<td class="td-label"  align="right">
											电压等级:
										</td>
										<td >
											<input id="voltCode"  value="" size="27" editable='false' value="${param.voltCode}" disabled = "disabled"> 
		                                    <font style="color: red;">*</font>
										</td>
										<td class="td-fillwidth"></td>
										<td class="td-label" align = "right">PT：</td>
		                                <td >
		                                    <input  size="27" id="ptRatio"  
		                                    data-options="required:true,missingMessage:'请输入电压变比PT'" disabled = "disabled"
		                                    >
		                                    <font style="color: red;">*</font>
		                                </td>
		                                
		                             </tr>
		                             <tr>
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
										<td class="td-fillwidth"></td>
										<td class="td-label" align="right">是否有效：</td>
		                             	<td>
		                                 <select class="easyui-combobox" id="validFlag" data-options="width:205,prompt:'有效',panelHeight:'auto' ,editable:false">
		                                     <option value="1">有效</option>
		                                     <option value="2">无效</option>
		                                 </select>
		                                  <font style="color: red;">*</font>
		                             	</td>
		                            </tr>
		                            <tr>
		                            	<td class="td-label" align="right">显示序号：</td>
		                                <td>
		                                	<input class="easyui-textbox"  value="${param.dataTotal }"  style="width:205px;" id="showIndex"
		                                    data-options="required:true,missingMessage:'请输入线路显示序号'"
		                                    >
		                                    <font style="color: red;">*</font>
		                                </td>
		                                <td class="td-fillwidth"></td>
		                            	<td class="td-label" align="right">是否电压测点</td>
		                                <td align="left" class="td-label"  nowrap="nowrap">
											<input type="checkbox" checked = 'checked' id="includeFlag"  onclick="selectChk(this);"  name="includeFlag"  value="1" />
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
            	</div>-->
				    <div title="新增用能设备" id="qtsb"> 
				    	<form id="otherForm" method="post">
						     <table  style="width:100%;" class="easyui-panel" cellspacing="8px" cellpadding="0" border="0" >
							     <tbody>
							     	<tr>
							     		<td class="td-label" align="center" nowrap="nowrap" width="95px">设备类型</td>
		                             	<td width='285px'>
		                             		<select id="qyDeviceType" name="DEVICE_TYPE" class="easyui-combobox" style="width:205px;" 
		                             		data-options="editable:false" >
						                                
						                      </select>
						                	
		                                </td>
		                                <td class="td-label" align="center" width="92px">所属母线</td>
		                             	<td width='280px'>
		                                    <select class="easyui-combobox" id="BS_ID" name = "BS_ID" data-options="width:200,prompt:'请选择',panelHeight:'100',editable:false"></select>
		                                   <!--   <font style="color: red;" id="redSign" >*</font>-->
		                                </td>
		                             	<td class="td-label" align="center" width="95px">所属馈线</td>
		                             	<td>
		                                    <select class="easyui-combobox" id="F_LINE_ID" name="F_LINE_ID" data-options="width:205,prompt:'请选择',panelHeight:'100',editable:false"></select>
		                                    
		                                </td>
		                            </tr>
							     </tbody>
						     </table>
					     	<input type="hidden" id='subsType' name='subsType' value='2'>
		    				<input type="hidden"  id="operateType" name="operateType" value='add'/>
		    				 <input  type="hidden" id='TMNL_ASSET_NO' name='TMNL_ASSET_NO' value="">
		    				 <input  type="hidden" id='tmnlIdbak' name='tmnlIdbak' value="">
		    				 <input  type="hidden" id='showIndexs' name='showIndexs' value="">
		    				 <input  type="hidden" id='SUBS_ID' name='SUBS_ID' value="${param.subId}">
		    				 <input type='hidden' id='BS_ID2' name='BS_ID2' value="">
		    				 
		    				 <div title="新建用能设备" id="ynsb1" style="display:block;">
						     	<table id="formTable" style="width:100%;" class="easyui-panel" cellspacing="8px" cellpadding="0" border="0">
									<tbody>
									</tbody>
								</table>
								
							</div>
					     </form>
					     <!-- 底部按钮区开始  -->
								<div style="padding: 10px; text-align: center" id="ynsb1button">
				                    <button class="easyui-linkbutton c1" onclick="otherSaveData()" style="width:70px;">保存</button>
				                    <button class="easyui-linkbutton c1" onclick="window.close();" style="width:70px;">取消</button>
				               </div>
								<!-- 底部按钮区结束  -->
					      <div title="新建用能设备" id="ynsb" style="display:none;margin-top:0px;">
		                <table style="width:100%;" class="easyui-panel" cellspacing="8px" cellpadding="0" border="0">
		                    <tbody>
		                             <tr>
		                                <td class="td-label" align="right" width="95px">用能设备名称</td>
		                                <td width='285px'>
		                                    <input class="easyui-textbox" id="lineName" style="width:205px;"
		                                    data-options="required:true,missingMessage:'请输入用能设备名称'"
		                                    >
		                                   <font style="color: red;">*</font>
		                                </td>
		                                <td class="td-label" align="right" width="92px">所属终端</td>
		                                <td width='285px'>
		                                    <input class="easyui-textbox"  style="width:185px;" id="terminalId" editable='false' 
		                                     data-options="required:true,missingMessage:'请选择所属终端'">
		                                    <a onclick="queryTmnlMessageList();" style="cursor:pointer"><img src="<%=basePath%>images/query.gif">
		                                    <font style="color: red;">*</font>
		                                </td>
		                                <td class="td-label" align="right" width="95px">
											电压等级
										</td>
										<td width='285px'>
											<input id="voltCode"  value="" style="width:205px;" editable='false' value="${param.voltCode}" disabled = "disabled"> 
										</td>
		                             </tr>
		                             <tr>
										<td class="td-label" align = "right" width="95px">PT</td>
		                                <td width='285px'>
		                                    <input style="width:205px;" id="ptRatio"  
		                                    data-options="required:true,missingMessage:'请输入电压变比PT'" disabled = "disabled"
		                                    >
		                                </td>
		                                <td class="td-label" align="right" width="92px">CT</td>
		                                <td width='285px'>
		                                    <input style="width:205px;" id="ctRatio" data-options="required:true,missingMessage:'请输入电流变比CT'">
		                                    <font style="color: red;">*</font>
		                                </td>
		                             	<td class="td-label"  align="right" width="95px">
											运行状态
										</td>
										<td >
											<input id="runStatus"  value="1"  style="width:205px;" editable='false'> 
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
		                                	<input class="easyui-textbox"  value="${param.dataTotal }"  style="width:205px;" id="showIndex"
		                                    data-options="required:true,missingMessage:'请输入线路显示序号'"
		                                    >
		                                    <font style="color: red;">*</font>
		                                </td>
		                            	<td class="td-label" align="right">是否电压测点</td>
		                                <td align="left" class="td-label"  nowrap="nowrap">
											<input type="checkbox" checked = 'checked' id="includeFlag"  onclick="selectChk(this);"  name="includeFlag"  value="1" />
										</td>
		                            </tr>
		                            <!-- <tr id="yndevice_tr">
		                             	<td class="td-label"  align="right" width="95px">
											用能设备分类
										</td>
										<td >
											<input id="lineType" style="width:205px;" editable='false'> 
		                                     <font style="color: red;">*</font>
										</td>
		                            </tr> -->
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
				</div> 
			</div>
        </div>
	</body>
</html>
