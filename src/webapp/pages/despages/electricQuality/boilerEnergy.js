
var startDate = new Date(); 		// 当前开始时间
var endDate = new Date();			// 当前结束时间
var hotChart = '';					// 热效率统计
var powerChart = '';				// 水电统计
var gasPrices = '';					// 燃气单价
var zq = '';						// 蒸汽
var rq = '';						// 燃气
var energy = '';					// 用电
var water = '';						// 用水
var temperList = '';				// 水箱温度
var heightList = '';				// 水箱高度
var isNumber = '';					// 校验数字表达式
var dataZoomStart = 0;				// 区域展示起始点
var dataZoomEnd = 288;				// 区域展示结束点

/**
 * 用能成本计算弹出框
 */
function compute(){
	// 电价格
	$("#elecPrice").textbox('setValue','0.31');
	// 燃气价格
	$("#fuelGasPrice").textbox('setValue','3.00');
	// 电热值
	$("#elecHotValue").textbox('setValue','3600');
	// 燃气热值
	$("#gasHotValue").textbox('setValue','37656');
	// 水比热容
	$("#specificHeat").textbox('setValue','4200');
	// 加热水量
	$("#heatWater").textbox('setValue','1');
	// 提升温度
	$("#raiseTemp").textbox('setValue','70');
	// 计算分析
	$("#compAnalysis").textbox('setValue','');
	$('#computeDialog').window('open');
	$("#computeDialog").panel({title:"用能成本计算"});
}

/**
 * 计算数据校验 
 */
function calculateVerify(){
	
	// 加热水量
	var heatWater = $("#heatWater").textbox('getValue');
	if(heatWater.length == 0){
		$.messager.alert('提示','加热水量不能为空!','info'); 
		return false;
	} else {
		if(!isNumber.test(heatWater)){
			$.messager.alert('提示','加热水量只能为正数且整数位最大4位,小数位最大4位!','info'); 
			return false;
		}
	}
	// 提升温度
	var raiseTemp = $("#raiseTemp").textbox('getValue');
	if(raiseTemp.length == 0){
		$.messager.alert('提示','提升温度不能为空!','info'); 
		return false;
	} else {
		if(!isNumber.test(raiseTemp)){
			$.messager.alert('提示','提升温度只能为正数且整数位最大4位,小数位最大4位!','info'); 
			return false;
		}
	}
	// 校验数字
	var isBigNumber = /^[+]?\d{1,10}(\.\d{0,4})?$/;
	// 水比热容
	var specificHeat = $("#specificHeat").textbox('getValue');
	if(specificHeat.length == 0){
		$.messager.alert('提示','水比热容不能为空!','info'); 
		return false;
	} else if(specificHeat == 0){
		$.messager.alert('提示','水比热容不能为0!','info'); 
		return false;
	} else if(!isBigNumber.test(specificHeat)){
			$.messager.alert('提示','水比热容只能为正数且整数位最大10位,小数位最大4位!','info'); 
			return false;
	}
	// 电热值
	var elecHotValue = $("#elecHotValue").textbox('getValue');
	
	if(elecHotValue.length == 0){
		$.messager.alert('提示','电热值不能为空!','info'); 
		return false;
	} else if(elecHotValue == 0){
		$.messager.alert('提示','电热值不能为0!','info'); 
		return false;
	} else if(!isBigNumber.test(elecHotValue)){
		$.messager.alert('提示','电热值只能为正数且整数位最大10位,小数位最大4位!','info'); 
		return false;
	}
	// 电价格
	var elecPrice = $("#elecPrice").textbox('getValue');
	if(elecPrice.length == 0){
		$.messager.alert('提示','电价格不能为空!','info'); 
		return false;
	} else {
		if(!isNumber.test(elecPrice)){
			$.messager.alert('提示','电价格只能为正数且整数位最大4位,小数位最大4位!','info'); 
			return false;
		}
	}
	// 燃气热值
	var gasHotValue = $("#gasHotValue").textbox('getValue');
	if(gasHotValue.length == 0){
		$.messager.alert('提示','燃气热值不能为空!','info'); 
		return false;
	} else if(gasHotValue == 0){
		$.messager.alert('提示','燃气热值不能为0!','info'); 
		return false;
	} else if(!isBigNumber.test(gasHotValue)){
			$.messager.alert('提示','燃气热值只能为正数且整数位最大10位,小数位最大4位!','info'); 
			return false;
	}
	// 燃气价格
	var fuelGasPrice = $("#fuelGasPrice").textbox('getValue');
	if(fuelGasPrice.length == 0){
		$.messager.alert('提示','燃气价格不能为空!','info'); 
		return false;
	} else {
		if(!isNumber.test(fuelGasPrice)){
			$.messager.alert('提示','燃气价格只能为正数且整数位最大4位,小数位最大4位!','info'); 
			return false;
		}
	}
	
	return true;
}

/**
 * 用能成本计算
 */
function calculateBtn(){
	
	// 校验
	if(calculateVerify() == false){
		return;
	}
	// 加热水量
	var heatWater = $("#heatWater").textbox('getValue');
	// 提升温度
	var raiseTemp = $("#raiseTemp").textbox('getValue');
	// 水比热容
	var specificHeat = $("#specificHeat").textbox('getValue');
	// 电热值
	var elecHotValue = $("#elecHotValue").textbox('getValue');
	// 电价格
	var elecPrice = $("#elecPrice").textbox('getValue');
	// 燃气热值
	var gasHotValue = $("#gasHotValue").textbox('getValue');
	// 燃气价格
	var fuelGasPrice = $("#fuelGasPrice").textbox('getValue');
	
	
	// 计算后的热量 J
	var hotValue = specificHeat * 1000 * raiseTemp;
	// 计算后的热量 KJ
	var hotValueKJ = specificHeat * raiseTemp;
	// 计算千瓦时
	var getkWh = hotValueKJ / elecHotValue;
	// 电费
	var sumElecPrice = '';
	// 数据为空
	if(!isNaN(getkWh)){
		getkWh = getkWh.toFixed(2);
		sumElecPrice = (getkWh * elecPrice).toFixed(2);
//		sumElecPrice = sumElecPrice.toFixed(2);
	} else {
		getkWh = '-';
	}
	// 计算消耗燃气
	var getGasValue = hotValueKJ / gasHotValue;
	// 燃气费
	var sumGasPrice = '';
	if(!isNaN(getGasValue)){
		getGasValue = getGasValue.toFixed(2);
		sumGasPrice = (getGasValue * fuelGasPrice).toFixed(2);
	} else {
		getGasValue = '-';
	}
    // 计算节约成本
	var costSaving = '';
	var num = '';
	var describe = '';
	if(parseFloat(sumElecPrice) >= parseFloat(sumGasPrice)){
		costSaving = sumElecPrice - sumGasPrice;
		num = sumElecPrice + "-" + sumGasPrice;
		describe = '使用燃气加热较使用电加热';
	}else{
		costSaving = sumGasPrice - sumElecPrice;
		num = sumGasPrice + "-" + sumElecPrice;
		describe = '使用电加热较使用燃气加热';
	}
	if(!isNaN(costSaving)){
		costSaving = costSaving.toFixed(2);
	} else {
		costSaving = '-';
	}
	
//	将1t水提升70℃，需要消耗热量： 
//	4200*1000*70=294000000J=294000KJ 
//	需要消耗电=294000/3600≈81.67kWh，若按照 0.31每度电计算，需要花费=81.67*0.31≈25.32元    
	
//	将1t水提升70℃，需要消耗热量：
//	4200*1000*70=294000000 J=294000 KJ
//	需要消耗电=294000/3600≈81.67 kWh,若按照0.31每度电计算，需要花费=81.67*0.31≈25.32元
//	需要消耗燃气=294000/37656≈7.81 m³,若按照3.00元每立方燃气计算，需要花费=7.81*3≈23.43元
//	经计算发现，将1t水提升70℃，使用燃气加热较使用电加热，节约成本=25.32-23.43=1.89元
	// 数值大的作为被减数
	
	var compAnalysis = "将"+ heatWater +"t水提升"+ raiseTemp +"℃，需要消耗热量：\n";
	compAnalysis	+= specificHeat +"*1000*"+ raiseTemp + "="+ hotValue +"J="+ hotValueKJ +"KJ \n";
	compAnalysis	+= "需要消耗电="+ hotValueKJ +"/"+ elecHotValue +"≈"+ getkWh +"kWh，若按照 "+ elecPrice +"元每度电计算，需要花费="+ getkWh +"*" + elecPrice +"≈"+ sumElecPrice +"元 \n";
	compAnalysis	+= "需要消耗燃气="+ hotValueKJ +"/"+ gasHotValue +"≈"+ getGasValue +"Nm³，若按照"+ fuelGasPrice +"元每立方燃气计算，需要花费="+ getGasValue +"*"+ fuelGasPrice +"="+ sumGasPrice +"元 \n";
	compAnalysis	+= "经计算发现，将"+ heatWater +"t水提升"+ raiseTemp +"℃，"+ describe +"，节约成本="+ num +"="+ costSaving +"元  ";
	
	$("#compAnalysis").textbox('setValue',compAnalysis);
}

/**
 * 关闭计算窗口
 */
function cancelBtn(){
	$('#computeDialog').window('close');
}

/**
 * 加载下拉框 
 */
function getCombox(){
	/**
	 * 下拉框 
	 */
	$('#selectDev').combobox({
		panelWidth:155,	
		panelHeight:300,// 设置下拉的宽度 和下拉框保持一致
		url:webContextRoot +'boilerEnergy/selectEnergyCell.action?consId=' + consId,
		valueField:'ID',
		textField:'ENERGY_CELL_NAME',
		onLoadSuccess: function () {// 下拉框数据加载成功调用
        	var propOwnerData = $(this).combobox("getData");// 得到查询的list集合
        	if(propOwnerData.length>0){
        		$('#selectDev').combobox('select',propOwnerData[0].ID);// 默认加载第一个生产线
        	}else{
        		$('#selectDev').combobox('select','');// 没有生产线时
        		getData();
        	}
        },
        onChange: function(newValue, oldValue){
        	tradeCode = newValue;
        	getData();
		}
	});
}

/**
 * 加载echart 
 */
function getData(){
	var dlzsEDate = $('#dlzsEDateD').val();
	// 获取水电热价格
	saveCookie();
	
	// 正在加载...
	hotChart.showLoading({					
		text:'正在努力的读取数据中...',
		effect:'spin'
	});
	powerChart.showLoading({					
		text:'正在努力的读取数据中...',
		effect:'spin'
	});
	
	// 锅炉ID
	tradeCode = $('#selectDev').combobox('getValue');
	// 查询热效率统计
	$.post(webContextRoot +'boilerEnergy/selectRXLandWD.action',{
		'energyCellId': tradeCode,	
		'time': dlzsEDate
	},
	function(data){
		// 蒸汽总量
		zq = data.zq;
		// 燃气总量
		rq = data.rq;
		// 热效率分析
		heatAnalysis();
		// 热效率实时分析
		realHotData();
		// 热效率走势图	
		hotData(data);
		// 隐藏正在加载的...
	    hotChart.hideLoading();			
	},'json');
	// 查询水电统计
	$.post(webContextRoot +'boilerEnergy/selectEnergyAndWater.action',{
		'energyCellId': tradeCode,	
		'time': dlzsEDate
	},
	function(data){
		// 用电量
		energy = data.energy;
		// 用水量
		water = data.water;
		// 水电分析
		wpAnalysis();
		// 电实时分析
		realPowerData();
		// 水实时分析
		realWaterData();
		// 水电走势图
		powerData(data);
		// 隐藏正在加载的...
		powerChart.hideLoading();			
	},'json');
}

/**
 * 热效率分析 
 */
function heatAnalysis(){
	if(zq == '-' || rq == '-'){
		$("#hotInput").hide();
		$("#hotCompute").hide();
		$("#hotAnalysis").html("当日累计产生蒸汽"+ zq +"t，燃气使用"+ rq +"Nm³，当日平均热效率-Nm³/t。");
	} else {
		$("#hotInput").show();
		$("#hotCompute").show();
		// 热效率分析
		gasPrices = $("#gasPrices").textbox('getText');
		// 获取燃气价格
		var gasPriceBySum = parseFloat(rq).toFixed(2) * gasPrices;
//		// 数据为空
//		if(!isNaN(gasPriceBySum)){
//			gasPriceBySum = gasPriceBySum.toFixed(2);
//		} else {
//			gasPriceBySum = '-';
//		}
//		$("#hotCompute").html("/m³，使用费用="+ parseFloat(rq).toFixed(2) +" * "+ gasPrices +"≈"+ gasPriceBySum +"元。");
		// 当日平均热效率
		var avgHotVal = parseFloat(rq)/parseFloat(zq);
		if(!isNaN(avgHotVal)){
			avgHotVal = avgHotVal.toFixed(2);
		} else {
			avgHotVal = '-';
		}
		
		// 数据为空
		if(!isNaN(gasPriceBySum)){
			gasPriceBySum = gasPriceBySum.toFixed(2);
		} else {
			gasPriceBySum = '-';
		}
		$("#hotAnalysis").html("当日累计产生蒸汽"+ parseFloat(zq).toFixed(2) +"t，燃气使用"+ parseFloat(rq).toFixed(2) +"Nm³，当日平均热效率"+ avgHotVal +"Nm³/t，按照燃气价格");
		$("#hotCompute").html("/m³，使用费用="+ parseFloat(rq).toFixed(2) +" * "+ gasPrices +"≈"+ gasPriceBySum +"元。");
	}
}

/**
 * 水电分析 
 */
function wpAnalysis(){
	// 没有用电
	if(energy == '-'){
		$("#powerInput").hide();
		$("#powerCompute").hide();
		$("#powerAnalysis").html("当日累计加热用电"+ energy +"kWh。");
	} else {
		// 用电分析
		$("#powerInput").show();
		$("#powerCompute").show();
		powerPrices = $("#powerPrices").textbox('getText');
		$("#powerAnalysis").html("当日累计加热用电"+ parseFloat(energy).toFixed(2) +"kWh，按照电量价格");
		// 获取用电价格
		var powerPriceBySum = energy * powerPrices;
		// 数据为空
		if(!isNaN(powerPriceBySum)){
			powerPriceBySum = powerPriceBySum.toFixed(2);
		} else {
			powerPriceBySum = '-';
		}
		$("#powerCompute").html("/kWh，使用费用="+ energy +" * "+ powerPrices +"≈"+ powerPriceBySum +"元。");
	}
	// 没有用水
	if(water == '-'){
		$("#waterInput").hide();
		$("#waterCompute").hide();
		$("#waterAnalysis").html("当日累计用水"+ water +"t。");
	} else {
		// 用水分析
		$("#waterInput").show();
		$("#waterCompute").show();
		waterPrices = $("#waterPrices").textbox('getText');
		$("#waterAnalysis").html("当日累计用水"+ parseFloat(water).toFixed(2) +"t，按照水量价格");
		// 获取用水价格
		var waterPriceBySum = parseFloat(water).toFixed(2) * waterPrices;
		// 数据为空
		if(!isNaN(waterPriceBySum)){
			waterPriceBySum = waterPriceBySum.toFixed(2);
		} else {
			waterPriceBySum = '-';
		}
		$("#waterCompute").html("/t，使用费用="+ parseFloat(water).toFixed(2) +" * "+ waterPrices +"≈"+ waterPriceBySum +"元。");
	}
	
}

/**
 * 保存COOKIE 
 */
function saveCookie(){
	// 水费
	waterPrice = $("#waterPrices").textbox('getText');
	// 电费
	energyPrice = $("#powerPrices").textbox('getText');
	// 燃气费
	rqPrice = $("#gasPrices").textbox('getText');
	$.post(webContextRoot +'boilerEnergy/getCookieValues.action',{
		'rqPrice': rqPrice,	
		'energyPrice': energyPrice,
		'waterPrice':waterPrice
	},
	function(data){
		// 燃气价格
		$("#gasPrices").textbox('setValue',data.rqPrice);
		// 电价
		$("#powerPrices").textbox('setValue',data.energyPrice);
		// 水价
		$("#waterPrices").textbox('setValue',data.waterPrice);
	},'json');
}

// 水实时取值
function realWaterData(){
	$("#waterPrices").textbox({
		inputEvents:$.extend({},$.fn.textbox.defaults.inputEvents,{
			keyup:function(event){
				waterPrices = $("#waterPrices").textbox('getText');
				// 不等于空的时候保存COOKIE
				if(waterPrices.length > 0){
					if(!isNumber.test(waterPrices)){
						$.messager.alert('提示','水量价格只能为正数且整数位最大4位,小数位最大4位!','info'); 
						return;
					} else {
						// 保存COOKIE
						saveCookie();
						$("#waterAnalysis").html("当日累计用水"+ parseFloat(water).toFixed(2) +"t，按照水量价格");
						// 获取用电价格
						var waterPriceBySum = parseFloat(water).toFixed(2) * waterPrices;
						// 数据为空
						if(!isNaN(waterPriceBySum)){
							waterPriceBySum = waterPriceBySum.toFixed(2);
						} else {
							waterPriceBySum = '-';
						}
						$("#waterCompute").html("/t，使用费用="+ parseFloat(water).toFixed(2) +" * "+ waterPrices +"≈"+ waterPriceBySum +"元。");
					}
					
				}
				
			}
		})
	});
}

// 电实时取值
function realPowerData(){
	$("#powerPrices").textbox({
		inputEvents:$.extend({},$.fn.textbox.defaults.inputEvents,{
			keyup:function(event){
				powerPrices = $("#powerPrices").textbox('getText');
				// 不等于空的时候保存COOKIE
				if(powerPrices.length > 0){
					if(!isNumber.test(powerPrices)){
						$.messager.alert('提示','电量价格只能为正数且整数位最大4位,小数位最大4位!','info'); 
						return;
					} else {
						// 保存COOKIE
						saveCookie();
						$("#powerAnalysis").html("当日累计加热用电"+ parseFloat(energy).toFixed(2) +"kWh，按照电量价格");
						// 获取燃气价格
						var powerPriceBySum = parseFloat(energy).toFixed(2) * powerPrices;
						// 数据为空
						if(!isNaN(powerPriceBySum)){
							powerPriceBySum = powerPriceBySum.toFixed(2);
						} else {
							powerPriceBySum = '-';
						}
						$("#powerCompute").html("/kWh，使用费用="+ parseFloat(energy).toFixed(2) +" * "+ powerPrices +"≈"+ powerPriceBySum +"元。");
					}
					
				}
				
			}
		})
	});
}

// 热效率实时取值
function realHotData(){
	// 燃气价格取值
	$("#gasPrices").textbox({
		inputEvents:$.extend({},$.fn.textbox.defaults.inputEvents,{
			keyup:function(event){
				// 保存COOKIE
				gasPrices = $("#gasPrices").textbox('getText');
				if(gasPrices.length > 0){
					if(!isNumber.test(gasPrices)){
						$.messager.alert('提示','燃气价格只能为正数且整数位最大4位,小数位最大4位!','info'); 
						return;
					} else {
						// 保存COOKIE
						saveCookie();
						// 获取燃气价格
						var gasPriceBySum = parseFloat(rq).toFixed(2) * gasPrices;
						// 当日平均热效率
						var avgHotVal = parseFloat(rq)/parseFloat(zq);
						if(!isNaN(avgHotVal)){
							avgHotVal = avgHotVal.toFixed(2);
						} else {
							avgHotVal = '-';
						}
						
						// 数据为空
						if(!isNaN(gasPriceBySum)){
							gasPriceBySum = gasPriceBySum.toFixed(2);
						} else {
							gasPriceBySum = '-';
						}
						$("#hotAnalysis").html("当日累计产生蒸汽"+ parseFloat(zq).toFixed(2) +"t，燃气使用"+ parseFloat(rq).toFixed(2) +"Nm³，当日平均热效率"+ avgHotVal +"Nm³/t，按照燃气价格");
						$("#hotCompute").html("/m³，使用费用="+ parseFloat(rq).toFixed(2) +" * "+ gasPrices +"≈"+ gasPriceBySum +"元。");
					}
					
				}
				
			}
		})
	});
}

/**
 * 展示最近12小时数据
 * 默认展示0-12点数据 13点展示1-13 14点展示2-14...
 */
function recentDate(){
	// 获取当前小时
	var realTime = startDate.getHours();
	switch (realTime){
    case 13 :
    	dataZoomStart = 12;
    	dataZoomEnd = 156;
    	break;
    case 14 :
    	dataZoomStart = 24;
    	dataZoomEnd = 168;
        break;
    case 15 :
    	dataZoomStart = 36;
    	dataZoomEnd = 180;
        break;
    case 16 :
    	dataZoomStart = 48;
    	dataZoomEnd = 192;
        break;
    case 17 :
    	dataZoomStart = 60;
    	dataZoomEnd = 204;
        break;
    case 18 :
    	dataZoomStart = 72;
    	dataZoomEnd = 216;
        break;
    case 19 :
    	dataZoomStart = 84;
    	dataZoomEnd = 228;
        break;
    case 20 :
    	dataZoomStart = 96;
    	dataZoomEnd = 240;
        break;
    case 21 :
    	dataZoomStart = 108;
    	dataZoomEnd = 252;
        break;
    case 22 :
    	dataZoomStart = 120;
    	dataZoomEnd = 264;
        break;
    case 23 :
    	dataZoomStart = 132;
    	dataZoomEnd = 276;
        break;
    case 0 :
    	dataZoomStart = 144;
    	dataZoomEnd = 288;
        break;
    default:
    	dataZoomStart = 0;
		dataZoomEnd = 144;
    	break;
	}
}

/**
 * JS定时器 定时器 整点执行
 */
function nextIntegralPoint(){
	setInterval("recentDate();",1000);
}

// 水电统计
function powerData(data){
	option = {
			 title: {
			        text: '水电统计图', 
			        x:'center',
			        	y: '0px',
			},
			tooltip: {
				trigger: 'axis',
				formatter : function(params, ticket, callback) {
					var res = "";
					for (var i = 0; i < params.length; i++) {
						if (i == 0) {
							res = '时间：' + params[i].name + '<br/>';
						}
						res += params[i].seriesName + ' : ';
						if(typeof params[i].value == 'undefined'){
							params[i].value = '-';
						}
						if (params[i].seriesName.indexOf('用电') >= 0) {
							res += params[i].value + 'kWh&nbsp;&nbsp;&nbsp;'
						}
						if (params[i].seriesName.indexOf('用水') >= 0) {
							res += params[i].value + 't<br/>'
						}
						if (params[i].seriesName.indexOf('蓄热水箱温度') >= 0) {
							res += params[i].value + '℃<br/>'
						}
						if (params[i].seriesName.indexOf('蓄热水箱水量') >= 0) {
							res += params[i].value + 'm³<br/>'
						}
					}
					return res;
				}
			},
		    legend: {
		        data:["用电","用水","蓄热水箱温度","蓄热水箱水量"],
		        x:'center',
		        y:'35'
		    },
		    toolbox: {
		        show: true,
		        feature: {
		            dataView: {show: true, readOnly: false},
		            magicType: {show: true, type: ['line', 'bar']},
		            restore: {show: true},
		            saveAsImage: {show: true}
		        }
		    },
		    dataZoom: [
				        {
				            show: true,
				            realtime: true,
				            // 可选，dataZoom 组件的 index，多个 dataZoom 组件时有用，默认为 0
				            dataZoomIndex: 0,
				            // 开始位置的百分比，0 - 100
//				            start: 0,
				            // 结束位置的百分比，0 - 100
//				            end: 50,
				            // 开始位置的数值
				            startValue: dataZoomStart,
				            // 结束位置的数值
				            endValue: dataZoomEnd
				        }
				    ],
		    //设置grid位置
		    grid : {
				 x : 55, //左边距离  
				 y : 75,//上边距离
				 x2 : 35,//右边距离
				 y2 : 35//下边距离
			 },
		    xAxis:  {
		        type: 'category',
		        boundaryGap: true,
		        data : data.dateList
		        
		    },
		    yAxis: [
				{
				    name: '',// 单位(kWh)
				    type: 'value',
				    boundaryGap: [0, '100%'],
				    splitLine: {
				    	show:false
				    }
				},
				{
				    name: '',// 单位(t)
				    type: 'value',
				    splitNumber: 5,
				    splitLine: {
				        lineStyle: {
				            color: '#dfdfdf',
				            width: 0,
				            type: 'dashed'
				        }
				    },
				    axisLabel: {
				        formatter: '{value}'
				    }
				}
		    ],
		    series: [
		        {
		        	name : '用电',
		        	type : 'bar',
		        	barWidth : '80%',
		        	barGap : '-100%',
		        	smooth:true,
		            symbol: 'none',
		            sampling: 'average',
		            itemStyle: {
//		                normal: {
//		                    color: 'rgb(255, 70, 131)'
//		                }
		            },
		            data : data.energyList
		        },
		        {
		        	name : '用水',
					type : 'line',
					yAxisIndex : 1,
					data : data.waterList
		        },
		        {
		        	name : '蓄热水箱温度',
					type : 'line',
					yAxisIndex : 1,
					data : data.temperList
		        },
		        {
		        	name : '蓄热水箱水量',
					type : 'line',
					yAxisIndex : 1,
					data : data.heightList
		        }
		    ]
		};
		powerChart.setOption(option,true); 
		powerChart.resize();
}

// 热效率统计
function hotData(data){
	var lineList = [];
	for(var i = 0;i < 288;i ++) {
		lineList.push(90);
	}
	option = {
			 title: {
			        text: '热效率统计图', 
			        x:'center'
			},
			tooltip: {
				trigger: 'axis',
				formatter : function(params, ticket, callback) {
					var res = "";
					for (var i = 0; i < params.length; i++) {
						if (i == 0) {
							res = '时间：' + params[i].name + '<br/>';
						}
						res += params[i].seriesName + ' : ';
						if(typeof params[i].value == 'undefined'){
							params[i].value = '-';
						}
						if (params[i].seriesName.indexOf('热效率') >= 0) {
							res += params[i].value + 'Nm³/t<br/>'
						} else if (params[i].seriesName.indexOf('进水温度') >= 0) {
							res += params[i].value + '℃<br/>';
							return res;
						}  
					}
					return res;
				}
			},
		    legend: {
		        data:["热效率","进水温度"],
		        x:'center',
		        y:'35'
		    },
		    toolbox: {
		        show : true,
		        feature : {
		            dataView : {show: true, readOnly: false},
		            magicType : {show: true, type: ['line', 'bar']},
		            restore : {show: true},
		            saveAsImage : {show: true}
		        }
		    },
		    calculable : true,
		    dataZoom: [
				        {
				            show: true,
				            realtime: true,
				            // 可选，dataZoom 组件的 index，多个 dataZoom 组件时有用，默认为 0
				            dataZoomIndex: 0,
				            // 开始位置的百分比，0 - 100
//				            start: 0,
				            // 结束位置的百分比，0 - 100
//				            end: 50,
				            // 开始位置的数值
				            startValue: dataZoomStart,
				            // 结束位置的数值
				            endValue: dataZoomEnd
				        }
				    ],
		    //设置grid位置
		    grid : {
				 x : 55, //左边距离  
				 y : 75,//上边距离
				 x2 : 35,//右边距离
				 y2 : 35//下边距离
			 },
		    xAxis:  {
		        type: 'category',
		        data : data.dateList
		    },
		    yAxis: [
				{
				    name: '单位(Nm³/t)',
				    type: 'value',
				    splitLine: {
				    	show:false
				    }
				},
				{
				    name: '单位(℃)',
				    type: 'value',
				    splitNumber: 5,
				    splitLine: {
				        lineStyle: {
				            color: '#dfdfdf',
				            width: 0,
				            type: 'dashed'
				        }
				    },
				    axisLabel: {
				        formatter: '{value}'
				    }
				}
		    ],
		    series: [
		        {
		        	name : '热效率',
		        	type : 'bar',
//		        	barWidth : 25,
//		        	barWidth : '80%',
//		        	barGap : '-100%',
		            data : data.rxlList
		        },
		        {
		        	name : '进水温度',
					type : 'line',
					yAxisIndex : 1,
					data : data.wdList
		        },
		        {
		        	name:'基准值',
		            type:'line',
		            data:lineList,
		            itemStyle:{
		                normal:{
		                	opacity:0,
		                	color:'red'
		                }
		            },
		            markLine: {
		            	itemStyle:{
		            		normal:{
		            			lineStyle:{
		            				type:'solid',
		            				color:'red'
		            			},
		            			label:{
		            				show:true,
		            				position:'left'
		            			}
		            		}
		            	},
		                symbolSize:[0,0],
		                data: [
		                    {    
		    			        type: 'average',
		    			        label:{normal:{formatter:'{c}'}}
		    			   }
		                ]
		            }
		            
		        }
		        
		    ]
		};

		hotChart.setOption(option,true);
		hotChart.resize();
}

/**
 * 快搜选中节点  
 */
function consSelectMethodLoad(){
	consId = consSelectCon.id;		// 把树节点id赋给企业id
	consName = consSelectCon.text;   // 把树节点的值赋给企业名称
	queryUserFiles();					// 查询用户档案
	getCombox();						// 加载下拉框
//	getData();
}

/**
 * 初始化下拉框时间
 */
function initialize(){
	$('#dlzsEDateD').val(DateUtil.dateToStr('yyyy-MM-dd',endDate));
	
	//左减日期电量走势
	$('#leftdlzs').click(function(){
		var startDate =  $('#dlzsEDateD').val();	// 开始日期
		var nowDate = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('d',-1,DateUtil.strToDate(startDate)));
		$('#dlzsEDateD').val(nowDate);
		getData();
	});
	
	//右加日期电量走势
	$('#rightdlzs').click(function(){
		var startDate =  $('#dlzsEDateD').val();	// 开始日期
		var nowDate = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('d',1,DateUtil.strToDate(startDate)));
		$('#dlzsEDateD').val(nowDate);
		getData();
	});
}

/**
 * 查询档案内容 
 */
function queryUserFiles(){
	$.getJSON(webContextRoot + 'pCode/queryuserFiles.action', {
		  'sfdConsModel.consId':consId
	  },
	  function(json){
		  var consNoObj = document.getElementById('consNo');
		  var consNOName = "客户编号: "
		  consNoObj.innerHTML = consNOName+json[0].consNo;
		  $('#consNo').attr("title",json[0].consNo);
		  
		  var consNameObj = document.getElementById('consName');
		  var consNameName = "客户名称: "
		  var consNameStr = json[0].consName;
		  consNameObj.innerHTML = consNameName+consNameStr;
		  if(consNameStr.length>10){
			  consNameObj.innerHTML = consNameName+consNameStr.substring(0,10)+'...';
		  }else{
			  consNameObj.innerHTML = consNameName+consNameStr;
		  }
		  $('#consName').attr("title",consNameStr);
		  
		  var contractCapObj = document.getElementById('htrl');
		  var contractCapName = "合同容量(kVA): "
		  contractCapObj.innerHTML = contractCapName+json[0].contractCap;
		  $('#htrl').attr("title",json[0].contractCap);
		  
		  var elecAddrObj = document.getElementById('address');
		  var elecAddrName = "用电地址: "
		  var elecAddrNameStr = json[0].elecAddr;
		  if(elecAddrNameStr.length>10){
			  elecAddrObj.innerHTML = elecAddrName+elecAddrNameStr.substring(0,10)+'...';
		  }else{
			  elecAddrObj.innerHTML = elecAddrName+elecAddrNameStr;
		  }
		  $('#address').attr("title",elecAddrNameStr);
		  
		  var checkFlagObj = document.getElementById('khzt');
		  var checkFlagName = "客户状态: "
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
 * 初始化企业树 
 */
function initTree(){
	if(consId==null || consId==''|| consId=="null"){// 未获取到企业编码，加载左侧树
		consSelectMethod = "consSelectMethodLoad()";//定义选中后执行的方法
		consSelectHasRoot = false;//是否有区域能源根节点
		consSelectSearch("",true);
	}else{
		queryUserFiles();					// 查询用户档案
		getCombox();						// 加载下拉框
	}
}

// js入口
$(function(){
	$("#hotInput").hide();
	$("#powerInput").hide();
	$("#waterInput").hide();
	// 校验数字
	isNumber = /^[+]?\d{1,4}(\.\d{0,4})?$/;
	// 初始化热效率统计chart
	hotChart = echarts.init(document.getElementById('hotChart'));
	// 初始化水电统计chart
	powerChart = echarts.init(document.getElementById('powerChart'));
	// 设置echart初始化区域 展示最近12小时
//	recentDate();
	// 初始化企业树
	initTree();	
	// 初始化时间插件
	initialize();
	// 定时执行
//	nextIntegralPoint();
	
});

/**
 * 导出
 */
function exportTable(){
	var energyCellId = $('#selectDev').combobox('getValue');
	var dlzsEDateD = $('#dlzsEDateD').val();
	url = webContextRoot + '/pages/despages/electricQuality/boilerEnergyTable.jsp?consId='+consId+'&energyCellId='+energyCellId+'&dlzsEDateD='+dlzsEDateD;
	OpenWinUnRes(url, '',screen.availWidth - 300,screen.availHeight - 260);
}

/*******************************************************************************
 * 打开窗口，不可拖动窗体大小 并且让窗口在屏幕上居中
 * 
 * @param url
 * @param winName
 * @param width
 * @param height
 * @param isClosed
 */
function OpenWinUnRes(url, winName, width, height, isClosed) {
	xposition = 0;
	yposition = 0;

	if ((parseInt(navigator.appVersion) >= 4)) {
		xposition = (screen.width - width) / 2;
		yposition = (screen.height - height) / 2;
	}
	theproperty = "width=" + width + "," + "height=" + height + ","
			+ "location=0," + "menubar=0," + "resizable=0," + "scrollbars=1,"
			+ "status=1," + "titlebar=0," + "toolbar=0," + "hotkeys=0,"
			+ "screenx=" + xposition + "," // 仅适用于Netscape
			+ "screeny=" + yposition + "," // 仅适用于Netscape
			+ "left=" + xposition + "," // IE
			+ "top=" + yposition; // IE
	monwin = window.open(url, winName, theproperty, false);
	if (isClosed) {
		monwin.close();
		monwin = window.open(url, winName, theproperty, false);
	}
	monwin.focus();
}


