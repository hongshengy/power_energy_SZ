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
    <title>新增用能设备</title>
   	<jsp:include page="/pages/areaEnergy/common/head.jsp">
   		<jsp:param name="flag" value="flag='13'" />
   	</jsp:include>
	<script type="text/javascript">
		  $(function(){
			 var changeFlag = true;
			 var firstFlag = true;
	  		  $('#F_LINE_ID').combobox({//所属馈线
	  	  			url:des.webContextRoot +'line/queryLineMessage.action?queryPara.subsId='+${param.subsId}+'&queryPara.consId='+${param.consId},
	  	  			valueField: 'lineId',
	  	  			textField: 'lineName'
	  		  });
	  		$('#BS_ID').combobox({//所属母线
				url:des.webContextRoot +'line/queryBSMessageBak.action?queryPara.subsId='+${param.subsId}+'&queryPara.consId='+${param.consId},
				valueField: 'bsId',
				textField: 'bsName'
				});
	  		$('#qyDeviceType').combobox({
				 url :'<%=basePath%>areaEnergyTmnl/getCodeNameByCode.action?codeValue=99008',
	            editable:false,//不可编辑状态
		        valueField:'id',
		        textField:'text'
	        });
	  		$('#qyDeviceType').combobox({//所属变压器
				value:'${param.DEVICE_TYPE }'  
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
	 										if(!firstFlag){
		 										$("#PT_RATIO").combobox('setValue',result.PT);
		 										$("#CT_RATIO").combobox('setValue',result.CT_RATIO);
	 										}
	 										$("#BS_ID2").attr('value',result.BS_ID);
	 									}
	 							  }
	 						  });
	 					}else{
	 						$("#VOLT_CODE").combobox('setValue','');
	 						$("#PT_RATIO").combobox('setValue','');
	 						$("#CT_RATIO").combobox('setValue','');
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
	 												if(!firstFlag){
	 													$("#PT_RATIO").combobox('setValue',result.PTRATIO);
	 		 										}
	 												$("#BS_ID2").attr('value',bsId);
 												
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
	 		firstFlag = false;
	 	}
	 });
	  		
	  		$('#BS_ID').combobox({
				onChange : function(){
					if(!changeFlag){
					var bsId = $("#BS_ID").combobox('getValue');
					$("#F_LINE_ID").combobox('setValue','');
					$("#CT_RATIO").combobox('setValue','');
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
										if(!firstFlag){
											$("#PT_RATIO").combobox('setValue',result.PTRATIO);
										}
										$("#BS_ID2").attr('value',bsId);
										
									}
							  }
						  });
					}
				}
				
			},
			onClick : function(){
				changeFlag = false;
				firstFlag = false;
			}
	});	
	  		
	  		
	  		
	  		
	  		
		      queryFormCtrl();
		      $('#otherForm').form('load','<%=basePath%>line/otherDeviceDetail.action?lineId='+${param.lineId}+"&subsId="+${param.subsId}+"&deviceRela=${param.deviceRela}"+"&areaNo="+${param.areaNo}+"&consId="+${param.consId});
		       
              $('#otherForm').form({
            	  onLoadSuccess : function(data){
            		  if(data.IS_UMP =='1'){
            			  $('#IS_UMP').prop('checked',true);
              		  }
            		  $('#otherForm input').attr('disabled',true);
            		  $('#otherForm textarea').attr('disabled',true);
  				}
  			  });
              
              
		  });
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
		  
		  function modifyTmnlInfo(saveFlag){
			  $('form input').attr('disabled',saveFlag);
			  $('form textarea').attr('disabled',saveFlag);
			  if(saveFlag == false){
				   $("#saveBtn").css("display","block");
				   $("#modifyBtn").css("display","none");
			   }else{
			   	   $("#saveBtn").css("display","none");
				   $("#modifyBtn").css("display","block");
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
		//查询所属终端
		function queryTmnlMessageListBak(){
			var terminalId = $('#tmnlIdbak').val();
            var deviceId = '${param.lineId}';
			var url = "<%=basePath %>pages/areaEnergy/line/tmnlMessageListBak.jsp?subId="+${param.subsId}+'&deviceId='+deviceId+"&tmnlId="+terminalId+'&opType=update';;
			OpenWin(url,"终端配置列表",900,300);
		}
		  function queryFormCtrl(){
		     var subsType = $('#subsType').val();
		     var deviceType = $('#deviceType').val();
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
	                          ctrlStr='<input id="'+obj.WORD_NAME_EN+'" name="'+obj.WORD_NAME_EN+'" size="27" >'+'<font style="color: red;">*</font>';
	                          inputArr.push(obj);
	                     }else if(obj.WORD_CTRL=='input' && obj.IS_MUST_WORD == 1){
	                    	  ctrlStr='<input id="'+obj.WORD_NAME_EN+'" name="'+obj.WORD_NAME_EN+'" size="27" >';
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
	                           str=str+'<tr><td class="td-label" align="center" nowrap="nowrap" width="180px">'+obj.WORD_NAME_CH+'</td>'
	                                +'<td width="25%">'+ctrlStr+'</td>';
	                        
	                     }else if((i+1)%3==0){
	                           str=str+'<td class="td-label" align="center" nowrap="nowrap" width="108px">'+obj.WORD_NAME_CH+'</td>'
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
	                  for(var i=0;i<dateArr.length;i++){
	                	  $('#'+dateArr[i].WORD_NAME_EN).datebox({    
		                	    required:false ,
		                	    width:205
	                	  });
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
	                  
	                  $('#TERMINAL_ID').textbox('setValue',$('#tmnlIdbak').val());
	                  $('#SHOW_INDEX').textbox('setValue',$('#showIndexs').val());
	                  $('#SHOW_INDEX').textbox({
	                	  editable:false
	                  });
	                  $('#TERMINAL_ID').textbox({
	                	  editable:false
	                  });
	                  
	              }
	          });
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
										 $.messager.confirm("提示","同一用户变下的设备名称不能重复，请重新输入");
									 }else if (res == "error"){
									 	$.messager.confirm("提示","保存失败");
									 }else{
									 	$.messager.confirm("提示","保存成功",function(){
									 		//window.close();
									 		parent.com.frontier.areaEnergy.baseData.reloadTree.flushAndClickCurrentNode();
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
	  	
	  	function validateCheckOther() {
	  		var deviceType = $("#deviceType").val();
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
			     } */
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
	      
	      
	  	var warningValue = "";
	    var warningUpObj = "";
	    var mpType = "";
		
		
		function addInfo(){
	    	var url = "<%=basePath%>/pages/areaEnergy/baseData/tmnlInstall/chooseMpList.jsp?deviceRela="+'${param.deviceRela}';
		    OpenWin(url,"修改测点",680,450);	
	    }
	    function batchImportMp(){
			 var url = "<%=basePath%>"+'pages/areaEnergy/baseData/tmnlInstall/batchImportDeviceMp.jsp?deviceName='+encodeURIComponent($('#LINE_NAME').val())+'&tmnlId='+$('#tmnlIdbak').val()+'&deviceType=1';
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
	            
	            $.messager.confirm('提示','确定要生成测点吗?',doSubmit2);
	    }
	    function doSubmit2(result){
	          if (result){  
	             var rows = $('#dg').datagrid('getSelections');  
	             var terminalId = $('#tmnlIdbak').val();
	             var deviceId = '${param.lineId}';
	             var areaNo = '${param.areaNo}';
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
	                 if(n.warningWayText == '请选择'){
	                     warningWayId = '';
	                 }else if(n.warningWayText == '不告警'){
	                     warningWayId = 1; 
	                 }else if(n.warningWayText == '定制告警'){
	                     warningWayId = 2; 
	                 }else if(n.warningWayText == '告警模板1'){
	                     warningWayId = 3; 
	                 }
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
					MP_NAME: $('#LINE_NAME').val()+mpNameStr[i],
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
	            }else if(newVal == '' || newVal == null){
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
	            }else if(newVal == '' || newVal == null){
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
	        //
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
	
	
	
	
	</head>
	<body srolling='no'>
		<div id='queryDiv' class="container-shadow" style="width:100%;">
		     <div class="easyui-panel" title="用能设备信息" style="width:100%;padding:30px 10px;">
					     <form id="otherForm" method="post">
					     	<input type="hidden" id='subsType' name='subsType' value='2'>
		    				<input type="hidden" id='deviceType' name='DEVICE_TYPE' value='${param.DEVICE_TYPE }'>
		    				<input type="hidden"  id="operateType" name="operateType" value='update'/>
		    				 <input  type="hidden" id='TMNL_ASSET_NO' name='TMNL_ASSET_NO'>
		    				 <input  type="hidden" id='tmnlIdbak' name='TMNLIDBAK' value="">
		    				 <input  type="hidden" id='LINE_ID' name='LINE_ID' value="${param.lineId}">
		    				 <input  type="hidden" id='SUBS_ID' name='SUBS_ID' value="${param.subsId}">
		    				  <input type='hidden' id='BS_ID2' name='BS_ID2' value="">
		    				 <table  style="width:100%;" class="easyui-panel" cellspacing="8px" cellpadding="0" border="0" >
							     <tbody>
							     	<tr>
							     		<td class="td-label" align="center" nowrap="nowrap" width="11%">设备类型</td>
		                             	<td width="25%">
		                             		<select id="qyDeviceType"  class="easyui-combobox" style="width:205px;"
		                             		disabled = 'disabled' data-options="editable:false">
						                      </select>
		                                </td>
		                                <td class="td-label" align="center" nowrap="nowrap" width="7.5%">所属母线</td>
		                             	<td width="25%">
		                                    <select class="easyui-combobox" id="BS_ID" name = "BS_ID" data-options="width:205,prompt:'请选择',panelHeight:'100',editable:false"></select>
		                                </td>
		                             	<td class="td-label" align="center" nowrap="nowrap" width="6%">所属馈线</td>
		                             	<td width="25%">
		                                    <select class="easyui-combobox" id="F_LINE_ID" name="F_LINE_ID" data-options="width:205,prompt:'请选择',panelHeight:'100',editable:false"></select>
		                                </td>
		                            </tr>
							     </tbody>
						     </table>
		    				 
		    				 
					     	<table id="formTable" style="width:100%;" class="easyui-panel" cellspacing="8px" cellpadding="0" border="0">
								<tbody>
									
								</tbody>
							</table>
					     </form>
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
                    			 <button class="easyui-linkbutton c1" onclick="otherSaveData();" style="width:70px;">保存</button>
                    		</td>
               				<td align="left">
                    			 <button class="easyui-linkbutton c1" onclick="modifyTmnlInfo(true);" style="width:70px;">取消</button>
                    		</td>
                    	</tr>
                    </table>
               </div>
					     
		<form id="ff" method="post"style="border: 0; width: 100%; height: 60%;">
				<div data-options="region:'north',collapsible:false"
					class="easyui-panel" title="增加测点信息(注：当测点类型为遥信、告警策略为定制告警时，告警上限值只能输入1和0（开：0，合：1）)"
					style="border: 0; width: 100%; height: 100%; overflow: auto; background: #fafafa;">
					<table class="easyui-datagrid" id="dg"
					data-options="url:'<%=basePath%>line/getMpInfo.action?tranId= ${param.lineId}&areaNo=${param.areaNo}&deviceRela=${param.deviceRela}&deviceName='+encodeURIComponent($('#LINE_NAME').val()),
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
						onclick="javascript:exportMp('<%=basePath%>','${param.lineId}')">测点导出</a>
				</div>
				</div>
		</form>	
						
				</div>
			</div>
			<%@include file="/pages/areaEnergy/baseData/tmnlInstall/mpExport.jsp"%>
	</body>
</html>
