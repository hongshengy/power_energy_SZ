/**
 * 冷冻水系统分析
 */
var dataDate = new Date();	// 当前结束时间  为当前时间
var tabIndex = 0;			// 页面加载选择单元能耗
var isSuccess = true;		// 首次加载
//var consId = '';			// 客户ID
var oneChart = '';			// 分析图
var twoChart = '';			// 温差图
var deviceId = '';			// 主机的测点Id
var ldsOutResult = '';		// 冷冻水出水结果
var ldsInResult = '';		// 冷冻水供回水温差
var lqsOutResult = '';		// 冷却水出水结果
var lqsInResult = '';		// 冷却水供回水温差
var ldsTime = '';			// 冷冻水时间
var lqsTime = '';			// 冷却水时间

/**
 * 获取图表数据
 */
function getData(){
	var startDate =  $('#dataDate').val();		// 开始日期
	var tab = $("#tabs").tabs('getSelected');					// tab选项卡
	tabIndex = $("#tabs").tabs('getTabIndex',tab);	// 获取选中的tab页
	
	if(tabIndex == 0){
		oneChart.showLoading({
			text:'正在努力的读取数据中...',
			effect:'spin'
		});
		$.getJSON(webContextRoot + 'chilledWater/queryChilledWater.action', 
				{ 
					'consPowerInfoModel.dataDate': startDate,//开始时间
					'consPowerInfoModel.deviceId': deviceId,//变压器id
					'consPowerInfoModel.queryType': '96',//设备类型
					'consPowerInfoModel.dataType': 'lds'//设备类型
				},
				function(json){
					oneChartData(json.consMap);
					oneChart.hideLoading();
				}
			);
	}else if(tabIndex == 1){
		twoChart.showLoading({
			text:'正在努力的读取数据中...',
			effect:'spin'
		});
		$.getJSON(webContextRoot + 'chilledWater/queryChilledWater.action', 
				{ 
					'consPowerInfoModel.dataDate': startDate,//开始时间
					'consPowerInfoModel.deviceId': deviceId,//变压器id
					'consPowerInfoModel.queryType': '96',//设备类型
					'consPowerInfoModel.dataType': 'lqs'//设备类型
				},
				function(json){
					twoChartData(json.consMap);
					twoChart.hideLoading();
				}
			);
	}
}

/**
 *  冷冻水系统分析初始化
 */
function initOneChartSuggest(){
	$("#ldsTime").text("-");
	$("#ldsOutResult").text("-");
	$("#ldsOutSucggest").text("-");
	$("#ldsInResult").text("-");
	$("#ldsInSucggest").text("-");
}

/**
 * 冷却水系统分析初始化 
 */
function initTwoChartSuggest(){
	$("#lqsTime").text("-");
	$("#lqsOutResult").text("-");
	$("#lqsOutSucggest").text("-");
	$("#lqsInResult").text("-");
	$("#lqsInSucggest").text("-");
}

/**
 * 冷冻水系统分析结果与建议
 */
function oneChartSuggest(){
	// 时间赋值
	$("#ldsTime").text(ldsTime);
	// 冷冻水出水分析结果以及建议
	if(ldsOutResult != '-'){
		// 基准值为7
		if (ldsOutResult > 7){
			$("#ldsOutResult").text("冷冻水出水温度过高；");
			$("#ldsOutSucggest").text("无法满足室内冷负荷需求，需加开主机；");
		} else if (ldsOutResult == 7){
			$("#ldsOutResult").text("冷冻水出水温度较为合理；");
			$("#ldsOutSucggest").text("无需调整；");
		} else if (ldsOutResult < 7){
			$("#ldsOutResult").text("冷冻水出水温度偏低；");
			$("#ldsOutSucggest").text("可适当提高出水温度；");
		}
	}else{
		$("#ldsOutResult").text("-");
		$("#ldsOutSucggest").text("-");
	}
	// 冷冻水供水温差分析结果以及建议
	if(ldsInResult != '-'){
		// 基准值为7
		if (ldsInResult > 5){
			$("#ldsInResult").text("冷冻水供回水温差偏小，冷量输出大于冷负荷；");
			$("#ldsInSucggest").text("可适当降低流量，增大温差；");
		} else if (ldsInResult == 5){
			$("#ldsInResult").text("冷冻水供回水温差较为合理；");
			$("#ldsInSucggest").text("无需调整；");
		} else if (ldsInResult < 5){
			$("#ldsInResult").text("冷冻水供回水温差较大，无法满足室内冷负荷；");
			$("#ldsInSucggest").text("需加开主机；");
		}
	}else{
		$("#ldsInResult").text("-");
		$("#ldsInSucggest").text("-");
	}
}

/**
 * 冷却水系统分析
 */
function twoChartSuggest(){
	// 时间赋值
	$("#lqsTime").text(lqsTime);
	// 冷却水出水分析结果以及建议
	if(lqsOutResult != '-'){
		// 基准值为7
		if (lqsOutResult > 27){
			$("#lqsOutResult").text("冷却水回水温度过高，冷却水冷却能力降低；");
			$("#lqsOutSucggest").text("需加冷却塔；");
		} else if (lqsOutResult == 27){
			$("#lqsOutResult").text("冷却水回水温度较为合理，在允许的范围内；");
			$("#lqsOutSucggest").text("可适当降低至室外湿球温度；");
		} else if (lqsOutResult < 27){
			$("#lqsOutResult").text("冷却水回水温度偏低，在允许的范围内；");
			$("#lqsOutSucggest").text("无需调整；");
		}
	}else{
		$("#lqsOutResult").text("-");
		$("#lqsOutSucggest").text("-");
	}
	// 冷却水供水温差分析结果以及建议
	if(lqsInResult != '-'){
		// 基准值为7
		if (lqsInResult > 5){
			$("#lqsInResult").text("冷却水供回水温差偏小，热量散发不完全；");
			$("#lqsInSucggest").text("可适当降低流量，增大温差；");
		} else if (lqsInResult == 5){
			$("#lqsInResult").text("冷却水供回水温差较为合理；");
			$("#lqsInSucggest").text("无需调整；");
		} else if (lqsInResult < 5){
			$("#lqsInResult").text("冷却水供回水温差较大，冷却水被充分冷却；");
			$("#lqsInSucggest").text("可适当关闭冷却塔开启数量；");
		}
	}else{
		$("#lqsInResult").text("-");
		$("#lqsInSucggest").text("-");
	}
}

/**
 * 冷冻水系统分析图 
 */
function oneChartData(data){
	option = {
			 title: {
			        text: '冷冻水系统分析', 
			        x:'center'
			},
		    tooltip: {
		        trigger: 'axis',
		        formatter : function(params, ticket, callback) {
	        		var res = '';
	        		if(params == null || params[0] == null){
						return;
					}
					for(var i =0;i<params.length;i++){
						if (i == 0) {
							ldsTime = params[i].name;
							res = '时间：' + params[i].name + '<br/>';
						}
//						res += params[i].seriesName + ' : ';
//						if(params[i].seriesIndex == 0){
//							ldsOutResult = params[i].value;
//							res +=  '出水温度 : ' + params[i].value + '℃<br/>';
//		    			}else if(params[i].seriesIndex == 1){
//		    				ldsInResult = params[i].value;
//							res += '供回水温差: '  + params[i].value + '℃<br/>';
//		    			}
						
						if (params[i].seriesName.indexOf('出水温度') >= 0) {
							ldsOutResult = params[i].value;
							res += '出水温度 : ' + params[i].value + '℃<br/>';
						} else if (params[i].seriesName.indexOf('供回水温差') >= 0) {
							ldsInResult = params[i].value;
							res += '供回水温差: '  + params[i].value + '℃<br/>';
						} 
					}
					oneChartSuggest();
					return res;
				}
		    },
		    legend: {
		        data:["出水温度","供回水温差"],
		        x:'center',
		        y:'35'
		    },
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
		            name: '单位(℃)',
		            type: 'value',
		        }
		    ],
		    series: [
		        {
		        	name : "出水温度",
		        	type : 'line',
		            data : data.outWater
		        },
		        {
		        	name : "供回水温差",
		        	type : 'line',
		            data : data.inWater
		        },
		        {
		        	name:'基准值',
		            type:'line',
		            data:[7],
		            itemStyle:{
		                normal:{opacity:0,color:'red'}
		            },
		            markLine: {
		                symbolSize:[0,0],
		                lineStyle:{
		                    normal:{type:'solid',opacity:0.4},
		                    emphasis:{width:1}
		                },
		                data: [
		                    {
		    			        // 支持 'average', 'min', 'max'
		    			        type: 'average',
		    			        label:{normal:{formatter:'{c}'}}
		    			   }
		                ]
		            }
		        },
		        {
		        	name:'基准值 ',
		            type:'line',
		            data:[5],
		            itemStyle:{
		                normal:{opacity:0,color:'red'}
		            },
		            markLine: {
		                symbolSize:[0,0],
		                lineStyle:{
		                    normal:{type:'solid',opacity:0.4},
		                    emphasis:{width:1}
		                },
		                data: [
		                    {
		    			        // 支持 'average', 'min', 'max'
		    			        type: 'average',
		    			        label:{normal:{formatter:'{c}'}}
		    			   }
		                ]
		            }
		        }
		    ]
		};
	oneChart.setOption(option,true);
	oneChart.resize();
}

/**
 * 温差图 
 */
function twoChartData(data){
	option = {
			 title: {
			        text: '冷却水系统分析', 
			        x:'center'
			},
		    tooltip: {
		        trigger: 'axis',
		        formatter : function(params, ticket, callback) {
	        		var res = '';
	        		if(params == null || params[0] == null){
						return;
					}
					for(var i =0;i<params.length;i++){
						if (i == 0) {
							lqsTime = params[i].name;
							res = '时间：' + params[i].name + '<br/>';
						}
//						res += params[i].seriesName + ' : ';
//						if (params[i].seriesName.indexOf('出水温度') >= 0) {
//							lqsOutResult = params[i].value;
//							res += params[i].value + '℃<br/>'
//						} else if (params[i].seriesName.indexOf('供回水温差') >= 0) {
//							lqsInResult = params[i].value;
//							res += params[i].value + '℃<br/>'
//							break;
//						} 
						
						if (params[i].seriesName.indexOf('出水温度') >= 0) {
							lqsOutResult = params[i].value;
							res += '出水温度 : ' + params[i].value + '℃<br/>';
						} else if (params[i].seriesName.indexOf('供回水温差') >= 0) {
							lqsInResult = params[i].value;
							res += '供回水温差: '  + params[i].value + '℃<br/>';
						} 
					}
					twoChartSuggest();
					return res;
				}
		    },
		    legend: {
		        data:["出水温度","供回水温差"],
		        x:'center',
		        y:'35'
		    },
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
		            name: '单位(℃)',
		            type: 'value',
		        }
		    ],
		    series: [
		        {
		        	name : "出水温度",
		        	type : 'line',
		            data : data.outWater
		        },
		        {
		        	name : "供回水温差",
		        	type : 'line',
		            data : data.inWater
		        },
		        {
		        	name:'基准值',
		            type:'line',
		            data:[7],
		            itemStyle:{
		                normal:{opacity:0,color:'red'}
		            },
		            markLine: {
		                symbolSize:[0,0],
		                lineStyle:{
		                    normal:{type:'solid',opacity:0.4},
		                    emphasis:{width:1}
		                },
		                data: [
		                    {
		    			        // 支持 'average', 'min', 'max'
		    			        type: 'average',
		    			        label:{normal:{formatter:'{c}'}}
		    			   }
		                ]
		            }
		        },
		        {
		        	name:'基准值 ',
		            type:'line',
		            data:[5],
		            itemStyle:{
		                normal:{opacity:0,color:'red'}
		            },
		            markLine: {
		                symbolSize:[0,0],
		                lineStyle:{
		                    normal:{type:'solid',opacity:0.4},
		                    emphasis:{width:1}
		                },
		                data: [
		                    {
		    			        // 支持 'average', 'min', 'max'
		    			        type: 'average',
		    			        label:{normal:{formatter:'{c}'}}
		    			   }
		                ]
		            }
		        }
		    ]
		};
	twoChart.setOption(option,true);
	twoChart.resize();
}


/**
 * 快搜选中节点  
 */
function consSelectMethodLoad(){
	if(consSelectCon.id.length < 4){	// 区域能源节点
		$("#clickTree").hide();
		$("#contentId").show();
		content='<iframe id="funcId" src="'+webContextRoot+'pages/despages/warn/noIndustryAir.jsp?orgNo='+consSelectCon.id+'" scrolling="no" frameborder="0" width="100%" height="100%"></iframe>'; 
		$("#contentId").empty();
		$('#contentId').append(content);
	}else{								// 企业节点
		$("#contentId").hide();
		$("#clickTree").show();
		deviceId = '';					// 初始化主机ID
		consId = consSelectCon.id;		// 把树节点id赋给企业id
		consName = consSelectCon.text;	// 把树节点的值赋给企业名称
		queryUserFiles();				// 查询用户档案
		initOneChartSuggest();			// 初始化分析结果
		initTwoChartSuggest();			// 初始化分析结果
		loadOption();
		getData();
	}
}

/**
 * 加载下拉框 
 */
function loadOption(){
	// 获取主机
	$('#selectDev').combobox({
		panelWidth:155,				// 设置下拉的宽度 和下拉框保持一致
		url:webContextRoot +'chilledWater/queryMainEngine.action?consPowerInfoModel.consId=' + consId,
		valueField:'CODE_VALUE',
		textField:'CODE_NAME',
		onLoadSuccess: function () {// 下拉框数据加载成功调用
        	var propOwnerData = $(this).combobox("getData");// 得到查询的list集合
        	if(propOwnerData.length > 0){
        		$('#selectDev').combobox('select',propOwnerData[0].CODE_VALUE);// 默认加载第一个生产线
        	}else{
        		$('#selectDev').combobox('select','');// 没有生产线时
        	}
        },
        onChange: function(newValue, oldValue){
        	deviceId = newValue;
        	getData();
		}
	});
}

/**
 * 加载树 
 */
function initTree(){
	consSelectMethod = "consSelectMethodLoad()";//定义选中后执行的方法
	consSelectHasRoot = true;//是否有区域能源根节点
	consSelectSearch("",true);
}

/**
 * 查询客户信息
 * @param consId
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
		  if(consNameStr.length > 10){
			  consNameStr = consNameStr.substring(0,10)+'...';
		  }
		  consNameObj.innerHTML = consNameName+consNameStr;
		  $('#consName').attr("title",json[0].consName);
		  
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
 * 格式化时间 
 */
function initDate(){
	// 初始日期
	$("#dataDate").val(DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('d',-1,dataDate)));
	//左减日期
	$('#left').click(function(){
		var startDayDate =  $('#dataDate').val();//开始日期
		var nowDate = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('d',-1,DateUtil.strToDate(startDayDate)));
		$('#dataDate').val(nowDate);
		initOneChartSuggest();
		initTwoChartSuggest();
		getData();
	});
	
	 //右加日期
	$('#right').click(function(){
		var startDayDate =  $('#dataDate').val();//开始日期
		var nowDate = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('d',1,DateUtil.strToDate(startDayDate)));
		$('#dataDate').val(nowDate);
		initOneChartSuggest();
		initTwoChartSuggest();
		getData();
	});
}


$(function(){
	// 初始化echart
	oneChart = echarts.init(document.getElementById('oneChart'));
	twoChart = echarts.init(document.getElementById('twoChart'));
	
	// 初始化客户树
	initTree();
	
	// 初始化时间
	initDate();

	// tab切换
	$("#tabs").tabs({			
		onSelect:function(title,index){// title:标签名，index:下标
			if(index == 0){		// 分析图
				initOneChartSuggest();
				getData();
			}else if(index == 1){// 温差图
				initTwoChartSuggest();
				getData();
			}
		}
	});
	
	// 查询事件
	$('#search').click(function(){
		if(tabIndex == 0){
			getData();
		}else if(tabIndex == 1){
			getData();
		}
	});
});
