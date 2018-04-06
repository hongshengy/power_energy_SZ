/**
 * 电机分析
 * @author zhou_qiang
 * @since 2017-04-23
 */
var dataDate = new Date();//当前结束时间  为当前时间
//var consId='';//客户编码
var fzjcChart = '';//负载监测
var fhjcChart = '';//负荷监测
var tabFlag = 'fzjc';
var tabIndex = 0;
var deviceId = null;

$(function(){
	
	// 判断是不是客户角色  true是客户角色 flase不是客户角色
	// 不是客户角色不显示用能报告按钮
	if(top.isCustomer == true){
		$("#bt_exportynbg").hide();
	}else{
		$("#bt_exportynbg").show();
	}
	
	fzjcChart = echarts.init(document.getElementById('fzjcChart'));
	fhjcChart = echarts.init(document.getElementById('fhjcChart'));
	
//	$("#dataDate").val(DateUtil.dateToStr('yyyy-MM',dataDate));
	
	if(consId==null || consId==''|| consId=="null"){//未获取到企业编码，加载左侧树
		/*$('#tree-leftQyTree').tree({ //默认没参数，获取区域  企业  都是打开状态
			// modeType=3，过滤含有电机的客户
			url:webContextRoot +'destree/queryTree.action?modeType=3',
		    method:'get',
		    multiple:false,//是否支持多选
		    editable:'true' ,
		    onClick: function(node){
		    	// 获取根节点
		    	var rootNode = $('#tree-leftQyTree').tree('getRoot',node.target);
		    	// 不是根节点时，刷新页面
		    	if(rootNode.id != node.id){
					consId = node.id;
					consName = node.text;
					queryUserFiles(consId);
					
					if(tabIndex == 1){
						querySbByFh();
					}else if(tabIndex == 0){
						querySb();
					}
					
		    	}else{
		    		$.messager.alert('提示', '请选择客户', 'warning');
		    	}
			},
			onLoadSuccess:function(node, data){//加载成功返回
				selectTree();//设置树默认选中节点
			}
		});
		//树模糊检索   方法来自  treeSelect.js
		searchTreeNode();*/
		
		consSelectMethod = "consSelectMethodLoad()";//定义选中后执行的方法
		consSelectHasRoot = false;//是否有区域能源根节点
		consSelectSearch("",true);
	}else{
		queryUserFiles(consId);
		if(tabIndex == 1){
			querySbByFh();
		}else if(tabIndex == 0){
			querySb();
		}
	}
	
/*	 //查询事件
	$('#search').click(function(){
		queryFzjc(null);
	});*/
	
	 //负载率查询事件
	$('#search_fzl').click(function(){
		if(tabIndex == 1){
			queryFhjc(null);
		}else if(tabIndex == 0){
			queryFzjc(null);
		}
	});
	
	/*//变压器下拉框选择天、月
	 $('#byqQueryType').combobox({
			onSelect: function(param){
				if(param.value == 'D'){
					$('#startDayDate').val(DateUtil.dateToStr('yyyy-MM-dd',dataDate));
					$('#startDayDate').show();
					$('#startMonthDate').hide();
					date = $('#startDayDate').val();
					dateLast = new Date(date);
					dateLast = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('d',-1,dateLast));
					
					// 选择天数据 隐藏月数据 
					$('#startDayDate').val(dateLast);
					$('#startDayDate').show();
					$('#startMonthDate').hide();
				}else if(param.value == 'M'){
					$('#startMonthDate').val(DateUtil.dateToStr('yyyy-MM',dataDate));
					$('#startDayDate').hide();
					$('#startMonthDate').show();
					date = $('#startMonthDate').val();
					dateLast = new Date(date);
					dateLast = DateUtil.dateToStr('yyyy-MM',DateUtil.dateAdd('m',-1,dateLast));
					
					// 选择月数据 隐藏天数据 
					$('#startMonthDate').val(dateLast);
					$('#startMonthDate').show();
					$('#startDayDate').hide();
				}
			}
		});*/
	
	$('#startDayDate').val(DateUtil.dateToStr('yyyy-MM-dd',dataDate));
	
	//左减日期电量走势
	$('#left').click(function(){
//		var dlzsQueryType = $('#byqQueryType').combobox('getValue');
		var dlzsQueryType = 'D';
		if(dlzsQueryType == 'D'){
			var startDate =  $('#startDayDate').val();//开始日期
			var nowDate = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('d',-1,DateUtil.strToDate(startDate)));
			$('#startDayDate').val(nowDate);
		}else if(dlzsQueryType == 'M'){
			var startDate =  $('#startMonthDate').val();//开始日期
			var nowDate = DateUtil.dateToStr('yyyy-MM',DateUtil.dateAdd('m',-1,DateUtil.strToDate(startDate)));
			$('#startMonthDate').val(nowDate.substr(0,7));
		}
		if(tabIndex == 1){
			queryFhjc(null);
		}else if(tabIndex == 0){
			queryFzjc(null);
		}
	});
	
	//右加日期电量走势
	$('#right').click(function(){
//		var dlzsQueryType = $('#byqQueryType').combobox('getValue');
		var dlzsQueryType = 'D';
		if(dlzsQueryType == 'D'){
			var startDate =  $('#startDayDate').val();//开始日期
			var nowDate = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('d',1,DateUtil.strToDate(startDate)));
			$('#startDayDate').val(nowDate);
		}else if(dlzsQueryType == 'M'){
			var startDate =  $('#startMonthDate').val();//开始日期
			var nowDate = DateUtil.dateToStr('yyyy-MM',DateUtil.dateAdd('m',1,DateUtil.strToDate(startDate)));
			$('#startMonthDate').val(nowDate);
		}
		if(tabIndex == 1){
			queryFhjc(null);
		}else if(tabIndex == 0){
			queryFzjc(null);
		}
	});
	
});

//点击时间控件查询
function queryDate(){
	if(tabIndex == 1){
		queryFhjc(null);
	}else if(tabIndex == 0){
		queryFzjc(null);
	}
}


/**
 * 设置选择客户后执行的方法
 */
function consSelectMethodLoad(){
	if(consSelectCon.id.length < 4){	// 区域能源节点
		$.messager.alert('提示', '请选择客户', 'warning');
	}else{		// 企业节点
		consId = consSelectCon.id;				// 把树节点id赋给企业id
		consName = consSelectCon.text;			// 把树节点的值赋给企业名称
		queryUserFiles(consId);
		
		if(tabIndex == 1){
			querySbByFh();
		}else if(tabIndex == 0){
			querySb();
		}
	}
}

/**
 *分布加载tab页选项
 *title	tab页名称
 *index tab页下标 
 */
function userTabsSelect(title,index){
	tabIndex = index;
	//页面选择Tab页信息所触发的事件
	if(index == 1){//tab属性页中的负荷
		$('#devInfo').css('display','none');
//		$('#byqJnjy').panel('setTitle','负荷分析');
		querySbByFh();
	}//页面选择Tab页信息所触发的事件
	else if(index == 0){//tab属性页中的负载率
		$('#devInfo').css('display','block');
//		$('#byqJnjy').panel('setTitle','负载率分析');
		querySb();
	}
}

/**
 * 查询企业下电机设备（负载率）
 */
function querySb(){
	if(consId != null && consId != ''){
		$.post(webContextRoot +'djxt/queryDJPowerList.action',
				{
	    			'sfGTranModel.consId': consId,
	    			'sfGTranModel.devType': '1'
				},
		     function(data){
				$('#sbType').combobox({
					width: 150,
					panelWidth: null,
					data:data,
					valueField: 'tranId',
					textField: 'tranName',
					editable: false,
					onLoadSuccess:function(){
						var sbData = $(this).combobox("getData");
						var idFlag = false;
						if(deviceId != null){
							for(var i = 0;i<data.length; i++){
								if(data[i].tranId == deviceId){
									idFlag = true;
								}
							}
							if(idFlag){
								$('#sbType').combobox('select',deviceId);
							}else{
								if(sbData.length>0){
									$('#sbType').combobox('select',sbData[0].tranId);
									deviceId = sbData[0].tranId;
								}
							}
							
						}else{
							if(sbData.length>0){
								$('#sbType').combobox('select',sbData[0].tranId);
								deviceId = sbData[0].tranId;
							}else{
								$('#sbType').combobox('select','');
								tranId = '';
								tranName = '';
								devType = 1;
								queryDev(tranId);
								queryFzjc(data.tranId);
								
			//					getData(tranName);//获取数据
							}
						}
					},
					onSelect:function(data){
						devType = 1;
						deviceId = data.tranId;
						queryFzjc(data.tranId);
						queryDev(data.tranId);
					}
				});
					
		     },'json');
	}
	
}

var devType = '';

/**
 * 查询企业下电机设备（负荷）
 */
function querySbByFh(){
	if(consId != null && consId != ''){
		$.post(webContextRoot +'djxt/queryDJPowerList.action',
				{
	    			'sfGTranModel.consId': consId,
	    			'sfGTranModel.devType': '2'
				},
		     function(data){
				$('#sbType').combobox({
					width: 150,
					panelWidth: null,
					data:data,
					valueField: 'tranId',
					textField: 'tranName',
					editable: false,
					onLoadSuccess:function(){
						var sbData = $(this).combobox("getData");
						var idFlag = false;
						if(deviceId != null){
							for(var i = 0;i<data.length; i++){
								if(data[i].tranId == deviceId){
									idFlag = true;
								}
							}
							if(idFlag){
								$('#sbType').combobox('select',deviceId);
							}else{
								if(sbData.length>0){
									$('#sbType').combobox('select',sbData[0].tranId);
									deviceId = sbData[0].tranId;
								}
							}
						}else{
							if(sbData.length>0){
								$('#sbType').combobox('select',sbData[0].tranId);
								deviceId = sbData[0].tranId;
							}else{
								$('#sbType').combobox('select','');
								tranId = '';
								tranName = '';
								
								devType = data.devType;
								queryFhjc(data.tranId);
			//					getData(tranName);//获取数据
							}
						}
					},
					onSelect:function(data){
						deviceId = data.tranId;
						devType = data.devType;
						queryFhjc(data.tranId);
					}
				});
					
		     },'json');
	}
	
}

//查询用户信息
function queryUserFiles(consId){
	//查询设置时间
	  $.getJSON(webContextRoot + 'pCode/queryuserFiles.action', {
		  'sfdConsModel.consId':consId
	  },
	  function(json){
		  var consNoObj = document.getElementById('consNo');
		  var consNOName = "客户编号: ";
		  consNoObj.innerHTML = consNOName+json[0].consNo;
		  $('#consNo').attr("title",json[0].consNo);
		  
		  var consNameObj = document.getElementById('consName');
		  var consNameName = "客户名称: ";
		  var consNameStr = json[0].consName;
		  if(consNameStr.length > 0){
			  consNameObj.innerHTML = consNameName+consNameStr.substring(0,10)+'...';
		  }else{
			  consNameObj.innerHTML = consNameName+consNameStr;
		  }
		  $('#consName').attr("title",consNameStr);
		  
		  var contractCapObj = document.getElementById('htrl');
		  var contractCapName = "合同容量(kVA): ";
		  contractCapObj.innerHTML = contractCapName+json[0].contractCap;
		  $('#htrl').attr("title",json[0].contractCap);
		  
		  var elecAddrObj = document.getElementById('address');
		  var elecAddrName = "用电地址: ";
		  var elecAddrNameStr = json[0].elecAddr;
		  if(elecAddrNameStr.length>10){
			  elecAddrObj.innerHTML = elecAddrName+elecAddrNameStr.substring(0,10)+'...';
		  }else{
			  elecAddrObj.innerHTML = elecAddrName+elecAddrNameStr;
		  }
		  $('#address').attr("title",elecAddrNameStr);
		  
		  var checkFlagObj = document.getElementById('khzt');
		  var checkFlagName = "客户状态: ";
		  if(json[0].statusCode=="1"){
			  checkFlagObj.innerHTML = checkFlagName+'正常用户';
			  $('#khzt').attr("title",'正常用户');
		  }else if(json[0].statusCode=="2"){
			  checkFlagObj.innerHTML = checkFlagName+'已注销';
			  $('#khzt').attr("title",'已注销');
		  }
	  });
}


/**
 * 负载监测
 */
function queryFzjc(tranId){
	
	var dataDate;
//	var dlzsQueryType = $('#byqQueryType').combobox('getValue');
	var dlzsQueryType = 'D';
	if(dlzsQueryType == 'D'){
		dataDate =  $('#startDayDate').val();
	}else if(dlzsQueryType == 'M'){
		dataDate =  $('#startMonthDate').val();
	}
	
	fzjcChart.showLoading({
		text:'正在努力的读取数据中...',
		effect:'spin'
	});
	var a = tranId;
	var flag = true;
	if(a == null){
		a = $('#sbType').combobox('getValue');
	}
	if(a == '101000038456'){
		a = '101000015950';
		flag = false;
	}else if(a == '101000038437'){
		a = '101000015948';
		flag = false;
	}
	
	if(flag == false){//金坛外网临时使用（引用其他的线路ID的负荷/额定功率=负载率）
		
		$.getJSON(webContextRoot + 'djxt/selectZmFhe.action', 
				{ 
				   //请求参数
					'powerLoadModel.dataDate': dataDate,//开始时间
					'powerLoadModel.tranId': a,//照明id
//					'powerLoadModel.dataType': 6//设备类型
				},
				function(json){
					//获取负荷数据除以额定功率等于负载率
					for(var i =0;i<json.rateData.length;i++){
						if(json.rateData[i] != 0){
							json.rateData[i] = (json.rateData[i]/edgl*100).toFixed(2);
						}else{
							json.rateData[i] = '-';
						}
					}
				    var data = json;
				    var title = $('#sbType').combobox('getText') ==''?'':$('#sbType').combobox('getText');
					queryFZEchartLS(data,title);
					
					checkLoadRateLS(data);
					
					
				}
			);
		fzjcChart.hideLoading();
	}else{
		
		$.post(webContextRoot +'djxt/selectbyqFzlByLoadRate.action',{
			'powerLoadModel.dataDate': dataDate,//开始时间
			'powerLoadModel.tranId': a,//变压器id
			'powerLoadModel.dataType': 2//设备类型
	     },
	     function(data){
	    	var title = $('#sbType').combobox('getText') ==''?'':$('#sbType').combobox('getText');
			queryFZEchart(data,title);
			
			checkLoadRate(data.sMap.djInfo,data.sMap.fzlList);
			/*if(dlzsQueryType == 'D'){
				checkfzlfxByDay(data.sMap.djInfo);//日负载率分析
			}else if(dlzsQueryType == 'M'){
				checkfzlfxByMonth(data.sMap.avgData);//日负载率分析
			}*/
			
//			fzjcCount(consName,title,$('#dataDate').val(),data.consMap);
			fzjcChart.hideLoading();
	     },'json');
	}
	
	
	
	
}

/**
 * 负荷监测
 */
function queryFhjc(tranId){
	var dataDate;
//	var dlzsQueryType = $('#byqQueryType').combobox('getValue');
	var dlzsQueryType = 'D';
	if(dlzsQueryType == 'D'){
		dataDate =  $('#startDayDate').val();
	}else if(dlzsQueryType == 'M'){
		dataDate =  $('#startMonthDate').val();
	}
	
	fhjcChart.showLoading({
		text:'正在努力的读取数据中...',
		effect:'spin'
	});
	var a = tranId;
	var flag = true;
	if(a == null){
		a = $('#sbType').combobox('getValue');
	}
	if(a == '101000038456'){
		a = '101000015950';
		flag = false;
	}else if(a == '101000038437'){
		a = '101000015948';
		flag = false;
	}
	
	if(flag == false){
//		$('#byqQueryType').combo('readonly');
		$.getJSON(webContextRoot + 'djxt/selectZmFhe.action', 
				{ 
				   //请求参数
					'powerLoadModel.dataDate': dataDate,//开始时间
					'powerLoadModel.tranId': a,//照明id
//					'powerLoadModel.dataType': 6//设备类型
				},
				function(json){
					//获取负荷数据除以额定功率等于负载率
					for(var i =0;i<json.rateData.length;i++){
						if(json.rateData[i] != 0){
							json.rateData[i] = json.rateData[i];
						}else{
							json.rateData[i] = '-';
						}
					}
				    var data = json;
				    var title = $('#sbType').combobox('getText') ==''?'':$('#sbType').combobox('getText');
				    queryFHEchartLS(data,title);
					
				    checkLoadFHRateLS(data);
					
					
				}
			);
		fhjcChart.hideLoading();
	}else{
		$.post(webContextRoot +'djxt/selectbyqFhByLoadRate.action',{
			'powerLoadModel.dataDate': dataDate,//开始时间
			'powerLoadModel.tranId': a,//变压器id
			'powerLoadModel.dataType': 2//设备类型
	     },
	     function(data){
	    	var title = $('#sbType').combobox('getText') ==''?'':$('#sbType').combobox('getText');
			queryFHEchart(data,title);
			
			checkLoadFHRate(data.sMap.djInfo,data.sMap.fzlList);
			
			/*if(dlzsQueryType == 'D'){
				checkfzlfxByDay(data.sMap.djInfo);//日负荷分析
			}else if(dlzsQueryType == 'M'){
				checkfzlfxByMonth(data.sMap.avgData);//日负荷分析
			}*/
			fhjcChart.hideLoading();
	     },'json');
	}
	
	
	/*$.post(webContextRoot +'charge/selectbyqFzlByLoadRate.action',{
		'powerLoadModel.dataDate': dataDate,//开始时间
		'powerLoadModel.tranId': a,//变压器id
		'powerLoadModel.dataType': 2//设备类型
     },
     function(data){
    	if(data.sMap.djInfo != null || data.sMap.avgData){
    		if(dlzsQueryType == 'D'){
    			checkfzlfxByDay(data.sMap.djInfo);//日负载率分析
    		}else if(dlzsQueryType == 'M'){
    			checkfzlfxByMonth(data.sMap.avgData);//日负载率分析
    		}
    	}
     },'json');*/
}


/**
 * 负载率分析（金坛外网临时使用）
 * @param data
 */
function checkLoadRateLS(data){
	var maxFZL = document.getElementById('maxFZL');
	var maxFZLdate = document.getElementById('maxdate');
	var minFZL = document.getElementById('minFZL');
	var minFZLdate = document.getElementById('mindate');
	var avgFZL = document.getElementById('avgFZL');
//	var type = $('#byqQueryType').combobox('getValue');
	var type = 'D';
	var flag = true;
	var maxValue = '-';
	var minValue = '-';
	var avgValue = '-';
	var maxTime = '-';
	var minTime = '-';
	var sumValue = 0;
	var count = 0;
	maxFZL.innerHTML = '-';
	maxFZLdate.innerHTML =  '-';
	minFZL.innerHTML = '-';
	minFZLdate.innerHTML =  '-';
	avgFZL.innerHTML = '-';
	if(type == 'D'){
		for(var i = 0;i<data.rateData.length;i++){
			if(flag){
				if(data.rateData[i] != '-'){
					maxValue = data.rateData[i];
					maxTime = data.categes[i];
					minValue = data.rateData[i];
					minTime = data.categes[i];
					sumValue += Number(data.rateData[i]);
					count ++;
					flag = false;
				}
			}else{
				if(data.rateData[i] != '-'){
					if(Number(maxValue) < Number(data.rateData[i])){
						maxValue = data.rateData[i];
						maxTime = data.categes[i];
					}
					if(Number(minValue) > Number(data.rateData[i])){
						minValue = data.rateData[i];
						minTime = data.categes[i];
					}
					sumValue += Number(data.rateData[i]);
					count ++;
				}
				
			}
			
		}
		if(maxValue != '-'){//最大负载率
			maxFZL.innerHTML = maxValue + '%';
			maxFZLdate.innerHTML = maxTime;
		}
		if(minValue != '-'){//最小负载率
			minFZL.innerHTML = minValue + '%';
			minFZLdate.innerHTML = minTime;
		}
		if(sumValue != 0 && count != 0){//平均负载率
			avgFZL.innerHTML = (sumValue/count).toFixed(2) + '%';;
			/*avgFZL.innerHTML = ((dataDay[0].avgLoadrateower/dataDay[0].contractCap)*100).toFixed(2) + '%';*/
		}
	}
	
}

/**
 * 负载率分析
 * @param data
 */
function checkLoadRate(dataDay,dataMonth){
	var maxFZL = document.getElementById('maxFZL');
	var maxFZLdate = document.getElementById('maxdate');
	var minFZL = document.getElementById('minFZL');
	var minFZLdate = document.getElementById('mindate');
	var avgFZL = document.getElementById('avgFZL');
//	var type = $('#byqQueryType').combobox('getValue');
	var type = 'D';
	var flag = true;
	var maxValue;
	var minValue;
	var avgValue;
	var maxTime;
	var minTime;
	var sumValue = 0;
	var count = 0;
	maxFZL.innerHTML = '-';
	maxFZLdate.innerHTML =  '-';
	minFZL.innerHTML = '-';
	minFZLdate.innerHTML =  '-';
	avgFZL.innerHTML = '-';
	if(type == 'D'){
		if(dataDay.length != 0 && dataDay != undefined){
			if(dataDay[0].maxLoadrate != null){//最大负载率
				maxFZL.innerHTML = ((dataDay[0].maxLoadrate/dataDay[0].contractCap)*100).toFixed(2) + '%';
				maxFZLdate.innerHTML = dataDay[0].maxTime;
			}
			if(dataDay[0].minLoadRate != null){//最小负载率
				minFZL.innerHTML = ((dataDay[0].minLoadRate/dataDay[0].contractCap)*100).toFixed(2) + '%';
				minFZLdate.innerHTML = dataDay[0].minTime;
			}
			if(dataDay[0].avgLoadrateower != null){//平均负载率
				avgFZL.innerHTML = ((dataDay[0].avgLoadrateower/dataDay[0].contractCap)*100).toFixed(2) + '%';
			}
		}
	}
	if(type == 'M'){
		if(dataMonth.length != 0 && dataMonth != undefined){
			for(var i=0;i<dataMonth.length ;i++){
				if(dataMonth[i].maxLoadrate != null || dataMonth[i].minLoadRate != null || dataMonth[i].avgLoadrateower != null){
					if(flag){
						maxValue = parseFloat(dataMonth[i].maxLoadrate);
						maxTime = dataMonth[i].maxTime;
						minValue = parseFloat(dataMonth[i].minLoadRate);
						minTime = dataMonth[i].minTime;
						sumValue += parseFloat(dataMonth[i].avgLoadrateower);
						count++;
						flag = false;
					}
					if(maxValue < parseFloat(dataMonth[i].maxLoadrate)){
						maxValue = parseFloat(dataMonth[i].maxLoadrate);
						maxTime = dataMonth[i].maxTime;
					}
					if(minValue > parseFloat(dataMonth[i].minLoadRate)){
						minValue = parseFloat(dataMonth[i].minLoadRate);
						minTime = dataMonth[i].minTime;
					}
					if(dataMonth[i].avgLoadrateower != null){
						sumValue += parseFloat(dataMonth[i].avgLoadrateower);
						count++;
					}
				}
			}
			if(maxValue != null){
				maxFZL.innerHTML = maxValue + '%';//最大负载率
				maxFZLdate.innerHTML = maxTime;
			}
			if(minValue != null){
				minFZL.innerHTML = minValue + '%';//最小负载率
				minFZLdate.innerHTML = minTime;
			}
			if(sumValue != 0){
				avgFZL.innerHTML = (sumValue/count).toFixed(2) + '%';
			}
		}
	}
}



/**
 * 日负载率分析
 * @param data
 */
function checkfzlfxByDay(data){
	var dayCheck = '';
	$('#error_content').text('');
	if(devType == '1'){
		if(data.length != 0){
			var val = ((data[0].avgLoadrateower/data[0].contractCap)*100).toFixed(2);
			var index = 1;
			if(val < 50){
				dayCheck = dayCheck + index + '、负载率长时间低于50%，可能长时间处于空载运行，建议对电机负荷进行详细的调查分析，寻找最佳启停控制模式；</br>';
				index++;
			}
			if(val > 50 && val < 70){
				dayCheck = dayCheck + index + '、电机长时间处于低负荷，效率低，运行不经济，造成“大马拉小车”现象,建议合理选择电机功率；</br>';
				index++;
			}
			if(val > 100){
				dayCheck = dayCheck + index + '、电机长时间处于过载运行，会使电动机启动困难，达不到额定转速，损坏电机绝缘，造成机器损坏，建议合理选择电机功率；</br>';
				index++;
			}
			if(val > 70 && val < 100){
				dayCheck = dayCheck + index + '、电机使用合理，请继续保持；';
			}
		}else{
			dayCheck = '该设备下数据为空。';
		}
		
		$('#error_content').append(dayCheck);
	}
	 
}

/**
 * 月负载率分析
 * @param data
 */
function checkfzlfxByMonth(data){
	$('#error_content').text('');
	if(devType == '1'){
		var monthCheck = '';
		var checkOne = 0;
		var checkTwo = 0;
		var checkThree = 0;
		for(var i=0;i<data.length;i++){
			if(data[i] != '-'){
				if(data[i] < 50){
					checkOne++;
				}
				if(data[i] > 50 && data[i] < 70){
					checkTwo++;
				}
				if(data[i] > 100){
					checkThree++;
				}
			}
		}
		var index = 1;
		if(checkOne != 0 || checkTwo != 0 || checkThree != 0){
			if(checkOne != 0){
				monthCheck = monthCheck + index +'、存在'+checkOne+'天平均负载低于50%的运行日期，可能处于空载运行；</br>';
				index++;
			}
			if(checkTwo != 0){
				monthCheck = monthCheck + index +'、存在'+checkTwo+'天平均负载处于50%-70%的运行日期（低负载运行，效率低，运行不经济，造成“大马拉小车”现象）；</br>';
				index++;
			}
			if(checkThree != 0){
				monthCheck = monthCheck + index +'、存在'+checkThree+'天负载高于100%的运行日期（过载运行，可能会使电动机启动困难，达不到额定转速，损坏电机绝缘，造成机器损坏）；</br>';
				index++;
			}
			monthCheck = monthCheck + index + '、综上所述建议对电机负荷进行详细的调查分析，寻找最佳启停控制模式，根据实际工作情况，合理选择电机功率；';
		}else{
			monthCheck = '该设备下数据为空。';
		}
		
		$('#error_content').append(monthCheck); 
	}
	
}

/**
 * 负荷分析
 * @param data
 */
function checkLoadFHRateLS(data){
	var maxFH = document.getElementById('maxFH');
	var maxFHdate = document.getElementById('maxfhdate');
	var minFH = document.getElementById('minFH');
	var minFHdate = document.getElementById('minfhdate');
	var avgFH = document.getElementById('avgFH');
//	var type = $('#byqQueryType').combobox('getValue');
	var type = 'D';
	var flag = true;
	var maxValue = '-';
	var minValue = '-';
	var avgValue = '-';
	var maxTime = '-';
	var minTime = '-';
	var sumValue = 0;
	var count = 0;
	maxFH.innerHTML = '-';
	maxFHdate.innerHTML =  '-';
	minFH.innerHTML = '-';
	minFHdate.innerHTML =  '-';
	avgFH.innerHTML = '-';
	if(type == 'D'){
		for(var i = 0;i<data.rateData.length;i++){
			if(flag){
				if(data.rateData[i] != '-'){
					maxValue = data.rateData[i];
					maxTime = data.categes[i];
					minValue = data.rateData[i];
					minTime = data.categes[i];
					sumValue += Number(data.rateData[i]);
					count ++;
					flag = false;
				}
			}else{
				if(data.rateData[i] != '-'){
					if(Number(maxValue) < Number(data.rateData[i])){
						maxValue = data.rateData[i];
						maxTime = data.categes[i];
					}
					if(Number(minValue) > Number(data.rateData[i])){
						minValue = data.rateData[i];
						minTime = data.categes[i];
					}
					sumValue += Number(data.rateData[i]);
					count ++;
				}
				
			}
			
		}
		if(maxValue != '-'){//最大负载率
			maxFH.innerHTML = maxValue + 'kW';
			maxFHdate.innerHTML = maxTime;
		}
		if(minValue != '-'){//最小负载率
			minFH.innerHTML = minValue + 'kW';
			minFHdate.innerHTML = minTime;
		}
		if(sumValue != 0 && count != 0){//平均负载率
			avgFH.innerHTML = (sumValue/count).toFixed(2) + 'kW';;
		}
		
		
		/*if(dataDay.length != 0 && dataDay != undefined){
			if(dataDay[0].maxLoadrate != null){//最大负荷
				maxFH.innerHTML = (dataDay[0].maxLoadrate*1).toFixed(2)+'kW';
				maxFHdate.innerHTML = dataDay[0].maxTime;
			}
			if(dataDay[0].minLoadRate != null){//最小负荷
				minFH.innerHTML = (dataDay[0].minLoadRate*1).toFixed(2)+'kW';
				minFHdate.innerHTML = dataDay[0].minTime;
			}
			if(dataDay[0].avgLoadrateower != null){//平均负荷
				avgFH.innerHTML = (dataDay[0].avgLoadrateower*1).toFixed(2)+'kW';
			}
		}*/
		
	}
	
}

/**
 * 负荷分析
 * @param data
 */
function checkLoadFHRate(dataDay,dataMonth){
	var maxFH = document.getElementById('maxFH');
	var maxFHdate = document.getElementById('maxfhdate');
	var minFH = document.getElementById('minFH');
	var minFHdate = document.getElementById('minfhdate');
	var avgFH = document.getElementById('avgFH');
//	var type = $('#byqQueryType').combobox('getValue');
	var type = 'D';
	var flag = true;
	var maxValue;
	var minValue;
	var avgValue;
	var maxTime;
	var minTime;
	var sumValue = 0;
	var count = 0;
	maxFH.innerHTML = '-';
	maxFHdate.innerHTML =  '-';
	minFH.innerHTML = '-';
	minFHdate.innerHTML =  '-';
	avgFH.innerHTML = '-';
	if(type == 'D'){
		if(dataDay.length != 0 && dataDay != undefined){
			if(dataDay[0].maxLoadrate != null){//最大负荷
				maxFH.innerHTML = (dataDay[0].maxLoadrate*1).toFixed(2)+'kW';
				maxFHdate.innerHTML = dataDay[0].maxTime;
			}
			if(dataDay[0].minLoadRate != null){//最小负荷
				minFH.innerHTML = (dataDay[0].minLoadRate*1).toFixed(2)+'kW';
				minFHdate.innerHTML = dataDay[0].minTime;
			}
			if(dataDay[0].avgLoadrateower != null){//平均负荷
				avgFH.innerHTML = (dataDay[0].avgLoadrateower*1).toFixed(2)+'kW';
			}
		}
		
	}
	if(type == 'M'){
		if(dataMonth.length != 0 && dataMonth != undefined){
			for(var i=0;i<dataMonth.length ;i++){
				if(dataMonth[i].maxLoadrate != null || dataMonth[i].minLoadRate != null || dataMonth[i].avgLoadrateower != null){
					if(flag){
						maxValue = parseFloat(dataMonth[i].maxLoadrate);
						maxTime = dataMonth[i].maxTime;
						minValue = parseFloat(dataMonth[i].minLoadRate);
						minTime = dataMonth[i].minTime;
						sumValue += parseFloat(dataMonth[i].avgLoadrateower);
						count++;
						flag = false;
					}
					if(maxValue < parseFloat(dataMonth[i].maxLoadrate)){
						maxValue = parseFloat(dataMonth[i].maxLoadrate);
						maxTime = dataMonth[i].maxTime;
					}
					if(minValue > parseFloat(dataMonth[i].minLoadRate)){
						minValue = parseFloat(dataMonth[i].minLoadRate);
						minTime = dataMonth[i].minTime;
					}
					if(dataMonth[i].avgLoadrateower != null){
						sumValue += parseFloat(dataMonth[i].avgLoadrateower);
						count++;
					}
				}
			}
			if(maxValue != null){
				maxFH.innerHTML = maxValue + 'kW';//最大负载率
				maxFHdate.innerHTML = maxTime;
			}
			if(minValue != null){
				minFH.innerHTML = minValue + 'kW';//最小负载率
				minFHdate.innerHTML = minTime;
			}
			if(sumValue != 0){
				avgFH.innerHTML = (sumValue/count).toFixed(2) + 'kW';
			}
		}
	}
	/*$('#error_title').text(''); 
	$('#jy_title').text('');*/	
	
}

/**
 * 负载监测 图表(临时使用)
 */
function queryFZEchartLS(dataMap,title){//function(dataMap, aChartTop)
	
	var option = {};
//	var type = $('#byqQueryType').combobox('getValue');
	var type = 'D';
	if(type == 'D'){
		option = {
				title: {
			    	 text: consName+'负载率'+ (title==''?'':'('+title+')'),
			        y: '10px',
			        left: 'center'
			    },
		    legend: {
		        x: 'center',
		        y: '35',
		        data: ['负载率']
		    }, 
		    toolbox:{
		    	show:true,
		    	feature:{
		    		dataZoom:{},
//		    		dataView:{readOnly:false},
		    		magicType:{type:['line','bar']},
		    		restore:{},
		    		saveAsImage:{}
		    	}
		    },
		  //设置grid位置
		   grid : {
				 x : 55, //左边距离
				 y : 75,//上边距离
				 x2 : 25,//右边距离
				 y2 : 35//下边距离
			},
		    xAxis: [
		        {
		        	
		            type: 'category',
		            boundaryGap : [0, 0.01],
		            symbolSize : 1,//点直径
		            splitLine: {
		                show: false,
		                lineStyle: {
		                    color: '#dfdfdf',
		                    width: 1,
		                    type: 'dashed'
		                }
		            },
		            data:dataMap.categes
		        }
		    ],
		    yAxis: [{
		        name: '单位(%)',
		        type: 'value',
		        splitNumber: 5,
		        splitLine: {
		            lineStyle: {
		                color: '#dfdfdf',
		                width: 1,
		                type: 'dashed'
		            }
		        },
		         
		        axisLabel: {
		            formatter: '{value}'
		        },
		        min:'0' 
		    }],
		    tooltip: {
		    	trigger: 'axis',
		    	formatter: function(params) {
		    		if(params!=null && params[0]!=null){
						var paramResult = '';
						paramResult += '负载率 : ' ;
						paramResult +=  dataMap.rateData[params[0].dataIndex] + '%<br/>';
						paramResult += '日期 : ' ;
						paramResult +=  dataMap.categes[params[0].dataIndex]+'';
						return paramResult;
		    		}
		    	}
		    },
		    series: [
		        {
		            name: '负载率',
		            type: 'line',
		            data:dataMap.rateData//数据,
		        }
		    ]
		};
	}
	
	fzjcChart.setOption(option,true);
	userResize();
}

/**
 * 负载监测 图表
 */
function queryFZEchart(dataMap,title){//function(dataMap, aChartTop)
	var option = {};
//	var type = $('#byqQueryType').combobox('getValue');
	var type = 'D';
	if(type == 'D'){
		option = {
				title: {
			    	 text: consName+'负载率'+ (title==''?'':'('+title+')'),
			        y: '10px',
			        left: 'center'
			    },
		    legend: {
		        x: 'center',
		        y: '35',
		        data: ['负载率']
		    }, 
		    toolbox:{
		    	show:true,
		    	feature:{
		    		dataZoom:{},
//		    		dataView:{readOnly:false},
		    		magicType:{type:['line','bar']},
		    		restore:{},
		    		saveAsImage:{}
		    	}
		    },
		  //设置grid位置
		   grid : {
				 x : 55, //左边距离
				 y : 75,//上边距离
				 x2 : 25,//右边距离
				 y2 : 35//下边距离
			},
		    xAxis: [
		        {
		        	
		            type: 'category',
		            boundaryGap : [0, 0.01],
		            symbolSize : 1,//点直径
		            splitLine: {
		                show: false,
		                lineStyle: {
		                    color: '#dfdfdf',
		                    width: 1,
		                    type: 'dashed'
		                }
		            },
		            data:dataMap.sMap.categes
		        }
		    ],
		    yAxis: [{
		        name: '单位(%)',
		        type: 'value',
		        splitNumber: 5,
		        splitLine: {
		            lineStyle: {
		                color: '#dfdfdf',
		                width: 1,
		                type: 'dashed'
		            }
		        },
		         
		        axisLabel: {
		            formatter: '{value}'
		        },
		        min:'0' 
		    }],
		    tooltip: {
		    	trigger: 'axis',
		    	formatter: function(params) {
		    		if(params!=null && params[0]!=null){
						var paramResult = '';
						paramResult += '负载率 : ' ;
						paramResult +=  dataMap.sMap.rateData[params[0].dataIndex] + '%<br/>';
						paramResult += '日期 : ' ;
						paramResult +=  dataMap.sMap.categes[params[0].dataIndex]+'';
						return paramResult;
		    		}
		    	}
		    },
		    series: [
		        {
		            name: '负载率',
		            type: 'line',
		            data:dataMap.sMap.rateData//数据,
		        }
		    ]
		};
	}else if(type == 'M'){
		option = {
				title: {
			    	 text: consName+'负载率'+ (title==''?'':'('+title+')'),
			        y: '10px',
			        left: 'center'
			    },
		    legend: {
		        x: 'center',
		        y: '35',
		        data: ['最大负载率','最小负载率','平均负载率']
		    }, 
		    toolbox:{
		    	show:true,
		    	feature:{
		    		dataZoom:{},
//		    		dataView:{readOnly:false},
		    		magicType:{type:['line','bar']},
		    		restore:{},
		    		saveAsImage:{}
		    	}
		    },
		  //设置grid位置
			   grid : {
					 x : 55, //左边距离
					 y : 75,//上边距离
					 x2 : 25,//右边距离
					 y2 : 35//下边距离
				},
		    xAxis: [
		        {
		        	
		            type: 'category',
		            boundaryGap : [0, 0.01],
		            symbolSize : 1,//点直径
		            splitLine: {
		                show: false,
		                lineStyle: {
		                    color: '#dfdfdf',
		                    width: 1,
		                    type: 'dashed'
		                }
		            },
		            data:dataMap.sMap.categes
		        }
		    ],
		    yAxis: [{
		        name: '单位(%)',
		        type: 'value',
		        splitNumber: 5,
		        splitLine: {
		            lineStyle: {
		                color: '#dfdfdf',
		                width: 1,
		                type: 'dashed'
		            }
		        },
		         
		        axisLabel: {
		            formatter: '{value}'
		        },
		        min:'0' 
		    }],
		    tooltip: {
		    	trigger: 'axis',
		    	formatter: function(params) {
		    		if(params!=null && params[0]!=null){
						var paramResult = '';
						paramResult +=  '最大负载率 : ' ;
						paramResult +=  dataMap.sMap.maxData[params[0].dataIndex] + '%<br/>';
						paramResult += '最小负载率 : ' ;
						paramResult +=  dataMap.sMap.minData[params[0].dataIndex] + '%<br/>';
						paramResult += '平均负载率 : ' ;
						paramResult +=  dataMap.sMap.avgData[params[0].dataIndex] + '%<br/>';
						paramResult += '日期 : ' ;
						paramResult +=  dataMap.sMap.categes[params[0].dataIndex]+'';
						return paramResult;
		    		}
		    	}
		    },
		    series: [
		        {
		            name: '最大负载率',
		            type: 'line',
		            data:dataMap.sMap.maxData//数据,
		        }, {
		            name: '最小负载率',
		            type: 'line',
		            data:dataMap.sMap.minData//数据,
		        },{
		            name: '平均负载率',
		            type: 'line',
		            data:dataMap.sMap.avgData//数据,
		        }
		    ]
		};
	}
	
	fzjcChart.setOption(option,true);
	userResize();
}

/**
 * 负荷监测 图表(金坛外网临时使用)
 */
function queryFHEchartLS(dataMap,title){//function(dataMap, aChartTop)
	var option = {};
//	var type = $('#byqQueryType').combobox('getValue');
	var type = 'D';
	if(type == 'D'){
		option = {
				title: {
			    	 text: consName+'负荷'+ (title==''?'':'('+title+')'),
			        y: '10px',
			        left: 'center'
			    },
		    legend: {
		        x: 'center',
		        y: '35',
		        data: ['负荷']
		    }, 
		    toolbox:{
		    	show:true,
		    	feature:{
		    		dataZoom:{},
//		    		dataView:{readOnly:false},
		    		magicType:{type:['line','bar']},
		    		restore:{},
		    		saveAsImage:{}
		    	}
		    },
		  //设置grid位置
		   grid : {
				 x : 55, //左边距离
				 y : 75,//上边距离
				 x2 : 25,//右边距离
				 y2 : 35//下边距离
			},
		    xAxis: [
		        {
		        	
		            type: 'category',
		            boundaryGap : [0, 0.01],
		            symbolSize : 1,//点直径
		            splitLine: {
		                show: false,
		                lineStyle: {
		                    color: '#dfdfdf',
		                    width: 1,
		                    type: 'dashed'
		                }
		            },
		            data:dataMap.categes
		        }
		    ],
		    yAxis: [{
		        name: '单位(kW)',
		        type: 'value',
		        splitNumber: 5,
		        splitLine: {
		            lineStyle: {
		                color: '#dfdfdf',
		                width: 1,
		                type: 'dashed'
		            }
		        },
		         
		        axisLabel: {
		            formatter: '{value}'
		        },
		        min:'0' 
		    }],
		    tooltip: {
		    	trigger: 'axis',
		    	formatter: function(params) {
		    		if(params!=null && params[0]!=null){
						var paramResult = '';
						paramResult += '负荷 : ' ;
						paramResult +=  dataMap.rateData[params[0].dataIndex] + 'kW<br/>';
						paramResult += '日期 : ' ;
						paramResult +=  dataMap.categes[params[0].dataIndex]+'';
						return paramResult;
		    		}
		    	}
		    },
		    series: [
		        {
		            name: '负荷',
		            type: 'line',
		            data:dataMap.rateData//数据,
		        }
		    ]
		};
	}
	
	fhjcChart.setOption(option,true);
	userResize();
}

/**
 * 负荷监测 图表
 */
function queryFHEchart(dataMap,title){//function(dataMap, aChartTop)
	var option = {};
//	var type = $('#byqQueryType').combobox('getValue');
	var type = 'D';
	if(type == 'D'){
		option = {
				title: {
			    	 text: consName+'负荷'+ (title==''?'':'('+title+')'),
			        y: '10px',
			        left: 'center'
			    },
		    legend: {
		        x: 'center',
		        y: '35',
		        data: ['负荷']
		    }, 
		    toolbox:{
		    	show:true,
		    	feature:{
		    		dataZoom:{},
//		    		dataView:{readOnly:false},
		    		magicType:{type:['line','bar']},
		    		restore:{},
		    		saveAsImage:{}
		    	}
		    },
		  //设置grid位置
		   grid : {
				 x : 55, //左边距离
				 y : 75,//上边距离
				 x2 : 25,//右边距离
				 y2 : 35//下边距离
			},
		    xAxis: [
		        {
		        	
		            type: 'category',
		            boundaryGap : [0, 0.01],
		            symbolSize : 1,//点直径
		            splitLine: {
		                show: false,
		                lineStyle: {
		                    color: '#dfdfdf',
		                    width: 1,
		                    type: 'dashed'
		                }
		            },
		            data:dataMap.sMap.categes
		        }
		    ],
		    yAxis: [{
		        name: '单位(kW)',
		        type: 'value',
		        splitNumber: 5,
		        splitLine: {
		            lineStyle: {
		                color: '#dfdfdf',
		                width: 1,
		                type: 'dashed'
		            }
		        },
		         
		        axisLabel: {
		            formatter: '{value}'
		        },
		        min:'0' 
		    }],
		    tooltip: {
		    	trigger: 'axis',
		    	formatter: function(params) {
		    		if(params!=null && params[0]!=null){
						var paramResult = '';
						paramResult += '负荷 : ' ;
						paramResult +=  dataMap.sMap.rateData[params[0].dataIndex] + 'kW<br/>';
						paramResult += '日期 : ' ;
						paramResult +=  dataMap.sMap.categes[params[0].dataIndex]+'';
						return paramResult;
		    		}
		    	}
		    },
		    series: [
		        {
		            name: '负荷',
		            type: 'line',
		            data:dataMap.sMap.rateData//数据,
		        }
		    ]
		};
	}else if(type == 'M'){
		option = {
				title: {
			    	 text: consName+'负荷'+ (title==''?'':'('+title+')'),
			        y: '10px',
			        left: 'center'
			    },
		    legend: {
		        x: 'center',
		        y: '35',
		        data: ['最大负荷','最小负荷','平均负荷']
		    }, 
		    toolbox:{
		    	show:true,
		    	feature:{
		    		dataZoom:{},
//		    		dataView:{readOnly:false},
		    		magicType:{type:['line','bar']},
		    		restore:{},
		    		saveAsImage:{}
		    	}
		    },
		  //设置grid位置
			   grid : {
					 x : 55, //左边距离
					 y : 75,//上边距离
					 x2 : 25,//右边距离
					 y2 : 35//下边距离
				},
		    xAxis: [
		        {
		            type: 'category',
		            boundaryGap : [0, 0.01],
		            symbolSize : 1,//点直径
		            splitLine: {
		                show: false,
		                lineStyle: {
		                    color: '#dfdfdf',
		                    width: 1,
		                    type: 'dashed'
		                }
		            },
		            data:dataMap.sMap.categes
		        }
		    ],
		    yAxis: [{
		        name: '单位(V)',
		        type: 'value',
		        splitNumber: 5,
		        splitLine: {
		            lineStyle: {
		                color: '#dfdfdf',
		                width: 1,
		                type: 'dashed'
		            }
		        },
		         
		        axisLabel: {
		            formatter: '{value}'
		        },
		        min:'0' 
		    }],
		    tooltip: {
		    	trigger: 'axis',
		    	formatter: function(params) {
		    		if(params!=null && params[0]!=null){
						var paramResult = '';
						paramResult +=  '最大负荷 : ' ;
						paramResult +=  dataMap.sMap.maxData[params[0].dataIndex] + 'kW<br/>';
						paramResult += '最小负荷 : ' ;
						paramResult +=  dataMap.sMap.minData[params[0].dataIndex] + 'kW<br/>';
						paramResult += '平均负荷 : ' ;
						paramResult +=  dataMap.sMap.avgData[params[0].dataIndex] + 'kW<br/>';
						paramResult += '日期 : ' ;
						paramResult +=  dataMap.sMap.categes[params[0].dataIndex]+'';
						return paramResult;
		    		}
		    	}
		    },
		    series: [
		        {
		            name: '最大负荷',
		            type: 'line',
		            data:dataMap.sMap.maxData//数据,
		        }, {
		            name: '最小负荷',
		            type: 'line',
		            data:dataMap.sMap.minData//数据,
		        },{
		            name: '平均负荷',
		            type: 'line',
		            data:dataMap.sMap.avgData//数据,
		        }
		    ]
		};
	}
	
	fhjcChart.setOption(option,true);
	userResize();
}

var edgl;
/**
 * 根据设备id查询设备信息
 */
function queryDev(devId){
	if(devId == ''){
	   $("#sbxh").text('-');
	   $("#sccj").text('-');
	   $("#eddy").text('-');
	   $("#edgl").text('-');
	   $("#tyrq").text('-');
	   $("#yxzt").text('-');
	}else{
		$.post(webContextRoot +'djxt/queryDJPowerList.action',
				   {
						'sfGTranModel.tranId':devId,
						'sfGTranModel.devType': '1'	
				   },
				   function(data){
					 if(data.length>0){
						   $("#sbxh").text(data[0].plateCap==""?'-':data[0].plateCap);
						   $("#sccj").text(data[0].factoryNameS==""?'-':data[0].factoryNameS);
						   $("#eddy").text(data[0].tranKindName==""?'-':(data[0].tranKindName)+'V');
						   $("#edgl").text(data[0].tranVoltName==""?'-':(data[0].tranVoltName)+'W');
						   edgl = data[0].tranVoltName;
						   $("#tyrq").text(data[0].madeDate==""?'-':data[0].madeDate.slice(0,data[0].madeDate.indexOf(' ')));
						   $("#yxzt").text(data[0].runStatusName==""?'-':data[0].runStatusName);
						   
					   }
				   },"json");
	}
	
}    

function qytQueryOveride(dateTime){
	
	var date = $('#dataDate').val();
	var nowDate = DateUtil.dateToStr('yyyy-MM',DateUtil.dateAdd('m',parseInt(dateTime),DateUtil.strToDate(date)));
	$('#dataDate').val(nowDate.substr(0,7));//重新赋值
	
	queryFzjc(null);
}

function timeUtil(dateTime,startDay){
	var resultDay = DateUtil.dateAdd("d", parseInt(dateTime), DateUtil.strToDate(startDay));
	var resultStr = "";
	resultStr+=resultDay.getFullYear()+"-"+leftPad((resultDay.getMonth()+1))+"-"+leftPad(resultDay.getDate());
	function leftPad(str){
		if(str.toString().length==1){
			return '0'+str;
		}else{
			return str;
		}
	}
	return resultStr;
	
}

//选中节点
function selectTree(nodeId){
	$('#tree-leftQyTree li:eq(0)').find('div').addClass("tree-node-selected");//添加选中样式
	var n = $('#tree-leftQyTree').tree('getSelected');//获取被选中的节点
	if(n!=null)//判断节点是否存在
	{
		$('#tree-leftQyTree').tree('select',n.target);
	}
	
	var chiNode = $('#tree-leftQyTree').tree('getChildren',n.target);//子节点
	if(chiNode.length == 0){
		$.messager.alert('提示', '请先给客户添加电机', 'warning');
	} else {
		for(var i=0 ; i < chiNode.length ; i++)//循环节点
	    {
			 if(nodeId!=null?chiNode[i].id==nodeId:chiNode[i].type==1)//查找定位
			  {
					var n = $('#tree-leftQyTree').tree("find",chiNode[i].id);//根据id获取节点
		       	   	$('#tree-leftQyTree').tree('select',n.target);//选中节点
		       	   	$('#tree-leftQyTree').tree('scrollTo',n.target);//滚动到节点
		       	    consId = chiNode[i].id;
		       	    consName = chiNode[i].text;
		       	    queryUserFiles(consId);
		       	    if(tabIndex == 0){
						querySbByFh();
					}else if(tabIndex == 1){
						querySb();
					}
		       	   	break;//跳出循环
			 }
	    }
	}
}

/**
 * 根据时间点 和 时间类型 设置时间
 * @param num
 * @param timeType
 */
function setTime(num,days){
	var time = '';
	var h = '';
	var s = '';
	/*if(timeType == '1440'){ //1440
		h = fillTime(parseInt(num/60));
		s = fillTime(parseInt(num%60));
		time = h + ":" + s;
	}else{					//288
		h = fillTime(parseInt(num/12));
		s = fillTime(parseInt(num%12*5));
		time = h + ":" + s;
	}*/
	h = fillTime(parseInt(num/12));
	s = fillTime(parseInt(num%12*5));
	time = h + ":" + s;
	return time;
}

function fillTime(time){
	if(time<10){
		time = '0'+time;
	}
	return time;
}


