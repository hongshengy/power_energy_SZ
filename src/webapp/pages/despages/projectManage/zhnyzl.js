/**
 * 用能分析报告
 * 
 * @author meng_zijie
 * @since 2017-06-13
 */
var dataDate = new Date();// 当前时间
var echart1 = null;
var echart2 = null;
var echart3 = null;
var echart4 = null;
var echart5 = null;
var echart6 = null;
var echart7 = null;
var echart8 = null;
var flag = true;

$(function() {

	// 数据初始化
	$.ajax({
		url : webContextRoot + 'zhFirstView/selectZHNYZLinit.action',
		dataType : 'json',
		success : function(result) {
			if (result != null && result != "") {
				$('#areaNum').text("中心数：" + result.AREA_NUM);
				$('#consNum').text("建档客户数：" + result.CONS_NUM);
				$('#olConsNum').text("采集客户数：" + result.OL_CONS_NUM);
				$('#subsNum').text("变电站数：" + result.SUBS_NUM);
				$('#tranNum').text("主变台数：" + result.TRAN_NUM);
				$('#tranSum').text("主变总容量：" + result.TRAN_SUM + "kVA");
				$('#mpNum').text("测点数：" + result.MP_NUM);
			}
		}
	});

	// 设置时间
	$("#echart1_dataDate").val(DateUtil.dateToStr('yyyy-MM-dd', dataDate));
	$("#echart2_startDate").val(
			DateUtil.dateToStr('yyyy-MM-dd', DateUtil.dateAdd("m", -1, dataDate)));
	$("#echart2_endDate").val(DateUtil.dateToStr('yyyy-MM-dd', dataDate));
	$("#echart4_dataDate").val(DateUtil.dateToStr('yyyy-MM-dd', dataDate));
	$("#echart5_startDate").val(
			DateUtil.dateToStr('yyyy-MM-dd', DateUtil.dateAdd("m", -1, dataDate)));
	$("#echart5_endDate").val(DateUtil.dateToStr('yyyy-MM-dd', dataDate));
	$("#echart6_startDate").val(
			DateUtil.dateToStr('yyyy-MM-dd', DateUtil.dateAdd("m", -1, dataDate)));
	$("#echart6_endDate").val(DateUtil.dateToStr('yyyy-MM-dd', dataDate));
	$("#echart8_startDate").val(
			DateUtil.dateToStr('yyyy-MM-dd', DateUtil.dateAdd("m", -1, dataDate)));
	$("#echart8_endDate").val(DateUtil.dateToStr('yyyy-MM-dd', dataDate));

	echart1 = echarts.init(document.getElementById('echart1'));
	echart2 = echarts.init(document.getElementById('echart2'));
	echart3 = echarts.init(document.getElementById('echart3'));
	echart4 = echarts.init(document.getElementById('echart4'));
	echart5 = echarts.init(document.getElementById('echart5'));
	echart6 = echarts.init(document.getElementById('echart6'));
	echart7 = echarts.init(document.getElementById('echart7'));
	echart8 = echarts.init(document.getElementById('echart8'));

	selectZHNYZLqyfhqx();
	selectZHNYZLqyqyzydl();
	selectZHNYZLyhfbtjt();
	selectZHNYZLkhydpm();

	$(window).resizeEnd({
		delay : 250
	}, function() {
		echart1.resize();
		echart2.resize();
		echart3.resize();
		echart4.resize();
		echart5.resize();
		echart6.resize();
		echart7.resize();
		echart8.resize();
	});
});

/**
 * 区域负荷曲线
 */
function selectZHNYZLqyfhqx() {
	var time = $("#echart1_dataDate").val();

	$.ajax({
		url : webContextRoot + 'zhFirstView/selectZHNYZL.action',
		data : {
			'type' : '1',
			'time' : time
		},
		dataType : 'json',
		type : 'post',
		success : function(result) {
			// console.log(result);
			var legendData = result.X_NAME;
			var X_DATA1 = result.X_DATA1;
			var X_DATA2 = result.X_DATA2;
			var option = {
				tooltip : {
					trigger : 'axis'
				},
				legend : {
					data : [ '负荷', '负荷(前一天)' ],
					selected : {
						'负荷' : true,
						'负荷(前一天)' : true
					},
					y : 10
				},
				calculable : true,
				xAxis : [ {
					type : 'category',
					boundaryGap : false,
					data : legendData
				} ],
				yAxis : [ {
					name : '单位(kW)',
					type : 'value',
					axisLabel : {
						formatter : '{value}'
					}
				} ],
				series : [ {
					name : '负荷',
					type : 'line',
					data : X_DATA1
				}, {
					name : '负荷(前一天)',
					type : 'line',
					data : X_DATA2
				} ]
			};
			echart1.setOption(option);
		}
	});
}

/**
 * 区域企业总用电量
 */
function selectZHNYZLqyqyzydl() {
	var startTime = $("#echart2_startDate").val();
	var endTime = $("#echart2_endDate").val();
	var time = startTime + "," + endTime;
	startTime = parseInt(startTime.replace(/-/g, ""));
	endTime = parseInt(endTime.replace(/-/g, ""));
	if (startTime >= endTime) {
		$.messager.alert('提示', '开始时间应小于结束时间！', 'info');
		return;
	}

	$.ajax({
		url : webContextRoot + 'zhFirstView/selectZHNYZL.action',
		data : {
			'type' : '2',
			'time' : time
		},
		dataType : 'json',
		type : 'post',
		success : function(result) {
			// console.log(result);
			var X_NAME = result.X_NAME;
			var X_DATA = result.X_DATA;

			var option = {
				tooltip : {
					trigger : 'axis',
					axisPointer : { // 坐标轴指示器，坐标轴触发有效
						type : 'shadow' // 默认为直线，可选为：'line' | 'shadow'
					}
				},
				legend : {
					x : 'center',
					y : 10,
					data : [ '总用电量' ]
				},
				calculable : true,
				xAxis : [ {
					type : 'category',
					axisTick : true,
					data : X_NAME
				} ],
				yAxis : [ {
					name : '单位(kWh)',
					type : 'value'
				} ],
				series : [ {
					name : '总用电量',
					type : 'bar',
					data : X_DATA
				} ]
			};

			echart2.setOption(option, true);
		}
	});
}

/**
 * 用户分布统计图
 */
function selectZHNYZLyhfbtjt() {
	$.ajax({
		url : webContextRoot + 'zhFirstView/selectZHNYZL.action',
		data : {
			'type' : '3'
		},
		dataType : 'json',
		type : 'post',
		success : function(result) {

			var legendData = [];
			var seriesData = [];
			for ( var i in result) {
				legendData.push(result[i].name);
				seriesData.push({
					'name' : result[i].name,
					'value' : result[i].value
				});
			}
			var option = {
				tooltip : {
					trigger : 'item',
					formatter : "{a} <br/>{b} : {c}"
				},
				legend : {
					x : 'center',
					y : 'bottom',
					padding : 5,
					data : legendData
				},
				calculable : true,
				series : [ {
					name : '用户分布',
					type : 'pie',
					radius : '65%',
					center : [ '50%', '50%' ],

					itemStyle : {
						normal : {
							label : {
								textStyle : {
									fontSize : 18
								},
								show : true,
								position : 'outer',
								formatter : function(params) {
									var res = params.data.name + ': ';
									res += '' + params.value;
									return res;
								}
							},
							labelLine : {
								show : true
							}
						}
					},
					data : seriesData
				} ]
			};

			echart3.setOption(option, true);
		}
	});
}

/**
 * 区域用电排名
 */
function selectZHNYZLkhydpm() {
	var time = $("#echart4_dataDate").val();

	$.ajax({
		url : webContextRoot + 'zhFirstView/selectZHNYZL.action',
		data : {
			'type' : '4',
			'time' : time
		},
		dataType : 'json',
		type : 'post',
		success : function(result) {
			// console.log(result);
			var legendData = result.X_NAME;
			var X_DATA1 = result.X_DATA_T;

			var option = {
				tooltip : {
					trigger : 'axis',
					formatter : function(params, ticket, callback) {
						if (params[0].value != "-" && params[0].value != "") {
							var res = params[0].seriesName + "<br/>"
									+ params[0].name + ' : ' + params[0].value;
							return res;
						} else {
							return;
						}
					}
				},
				legend : {
					data : [ time ]
				},
				grid : {
					x : 100,
					y2 : 20
				},
				xAxis : [ {
					name : '单位(kWh)',
					type : 'value',
					boundaryGap : [ 0, 0.01 ]
				} ],
				yAxis : [ {
					type : 'category',
					data : legendData
				} ],
				series : [ {
					name : time,
					type : 'bar',
					data : X_DATA1
				} ]
			};
			echart4.setOption(option);
		}
	});
}

/**
 * 区域告警排名
 */
function selectZHNYZLqygjpm() {
	var startTime = $("#echart5_startDate").val();
	var endTime = $("#echart5_endDate").val();
	var time = startTime + "," + endTime;
	startTime = parseInt(startTime.replace(/-/g, ""));
	endTime = parseInt(endTime.replace(/-/g, ""));
	if (startTime >= endTime) {
		$.messager.alert('提示', '开始时间应小于结束时间！', 'info');
		return;
	}

	$.ajax({
		url : webContextRoot + 'zhFirstView/selectZHNYZL.action',
		data : {
			'type' : '5',
			'time' : time
		},
		dataType : 'json',
		type : 'post',
		success : function(result) {
			// console.log(result);
			var legendData = result.X_NAME;
			var X_DATA_M = result.X_DATA_M;
			var X_DATA_U = result.X_DATA_U;

			var option = {
				tooltip : {
					trigger : 'axis',
					formatter : function(params, ticket, callback) {
						if ((params.length > 0 && params[0].value != "-")
								|| (params.length > 1 && params[1].value != "-")) {
							var res = "";
							var num = 0;
							var areaName = "";
							if (params.length > 0) {
								num = parseInt(params[0].value);
								res = params[0].seriesName + "："
									+ params[0].value + "<br/>";
										areaName = params[0].name;
							}
							if (params.length > 1) {
								num += parseInt(params[1].value);
								res += params[1].seriesName + "："
											+ params[1].value;
							}
							res = areaName + "<br/>" + "告警总数：" + num
								+ "<br/>" + res;
							return res;
						} else {
							return;
						}
					}
				},
				legend : {
					x : 'center',
					y : 10,
					data : [ "未处理告警", "已处理告警" ]
				},
				grid : {
					x : 100,
					y2 : 30
				},
				xAxis : {
					type : 'value'
				},
				yAxis : {
					type : 'category',
					data : legendData
				},
				series : [ {
					name : "未处理告警",
					type : 'bar',
					stack : '告警总数',
					data : X_DATA_U
				}, {
					name : "已处理告警",
					type : 'bar',
					stack : '告警总数',
					data : X_DATA_M
				} ]
			};
			echart5.setOption(option);
		}
	});
}

/**
 * 区域工单排名
 */
function selectZHNYZLqygdpm() {
	var startTime = $("#echart6_startDate").val();
	var endTime = $("#echart6_endDate").val();
	var time = startTime + "," + endTime;
	startTime = parseInt(startTime.replace(/-/g, ""));
	endTime = parseInt(endTime.replace(/-/g, ""));
	if (startTime >= endTime) {
		$.messager.alert('提示', '开始时间应小于结束时间！', 'info');
		return;
	}

	$.ajax({
		url : webContextRoot + 'zhFirstView/selectZHNYZL.action',
		data : {
			'type' : '6',
			'time' : time
		},
		dataType : 'json',
		type : 'post',
		success : function(result) {
			// console.log(result);
			var legendData = result.X_NAME;
			var X_DATA_M = result.X_DATA_M;
			var X_DATA_U = result.X_DATA_U;
			var option = {
				tooltip : {
					trigger : 'axis',
					formatter : function(params, ticket, callback) {
						if ((params.length > 0 && params[0].value != "-")
								|| (params.length > 1 && params[1].value != "-")) {
							var res = "";
							var num = 0;
							var areaName = "";
							if (params.length > 0) {
								num = parseInt(params[0].value);
								res = params[0].seriesName + "："
										+ params[0].value + "<br/>";
								areaName = params[0].name;
							}
							if (params.length > 1) {
								num += parseInt(params[1].value);
								res += params[1].seriesName + "："
										+ params[1].value;
							}
							res = areaName + "<br/>" + "工单总数：" + num
									+ "<br/>" + res;
							return res;
						} else {
							return;
						}
					}
				},
				legend : {
					x : 'center',
					y : 10,
					data : [ "未完成工单", "已完成工单" ]
				},
				grid : {
					x : 100,
					y2 : 30
				},
				xAxis : {
					type : 'value'
				},
				yAxis : {
					type : 'category',
					data : legendData
				},
				series : [ {
					name : "未完成工单",
					type : 'bar',
					stack : '工单总数',
					data : X_DATA_U
				}, {
					name : "已完成工单",
					type : 'bar',
					stack : '工单总数',
					data : X_DATA_M
				} ]
			};
			echart6.setOption(option);
		}
	});
}

/**
 * 区域终端在线率排名
 */
function selectZHNYZLqyzdpm() {

	$.ajax({
		url : webContextRoot + 'zhFirstView/selectZHNYZL.action',
		data : {
			'type' : '7'
		},
		dataType : 'json',
		type : 'post',
		success : function(result) {
			// console.log(result);
			var X_NAME = result.X_NAME;
			var X_DATA = result.X_DATA_Z;

			var option = {
				calculable : true,
				tooltip : {
					trigger : 'axis',
					axisPointer : { // 坐标轴指示器，坐标轴触发有效
						type : 'shadow' // 默认为直线，可选为：'line' | 'shadow'
					},
					formatter : function(params, ticket, callback) {
						if ((params.length > 0 && params[0].value != "-")) {
							var res = params[0].name + "<br/>" + params[0].seriesName + "：" + params[0].value + "%";
							
							return res;
						} else {
							return;
						}
					}
				},
				grid : {
					x : 80,
					y : 50,
					y2 : 30
				},
				xAxis : [ {
					type : 'category',
					axisTick : true,
					data : X_NAME
				} ],
				yAxis : [ {
					name : '单位(%)',
					type : 'value'
				} ],
				series : [ {
					name : '终端在线率',
					type : 'bar',
					data : X_DATA
				} ]
			};

			echart7.setOption(option, true);
		}
	});
}

/**
 * 区域告警（终端）排名
 */
function selectZHNYZLqygjzdpm() {
	var startTime = $("#echart8_startDate").val();
	var endTime = $("#echart8_endDate").val();
	var time = startTime + "," + endTime;
	startTime = parseInt(startTime.replace(/-/g, ""));
	endTime = parseInt(endTime.replace(/-/g, ""));
	if (startTime >= endTime) {
		$.messager.alert('提示', '开始时间应小于结束时间！', 'info');
		return;
	}

	$.ajax({
		url : webContextRoot + 'zhFirstView/selectZHNYZL.action',
		data : {
			'type' : '8',
			'time' : time
		},
		dataType : 'json',
		type : 'post',
		success : function(result) {
			// console.log(result);
			var legendData = result.X_NAME;
			var X_DATA = result.X_DATA;

			var option = {
				tooltip : {
					trigger : 'axis',
//					formatter : function(params, ticket, callback) {
//						if ((params.length > 0 && params[0].value != "-")
//								|| (params.length > 1 && params[1].value != "-")) {
//							var res = "";
//							var num = 0;
//							var areaName = "";
//							if (params.length > 0) {
//								num = parseInt(params[0].value);
//								res = params[0].seriesName + "："
//									+ params[0].value + "<br/>";
//										areaName = params[0].name;
//							}
//							if (params.length > 1) {
//								num += parseInt(params[1].value);
//								res += params[1].seriesName + "："
//											+ params[1].value;
//							}
//							res = areaName + "<br/>" + "告警总数：" + num
//								+ "<br/>" + res;
//							return res;
//						} else {
//							return;
//						}
//					}
				},
//				legend : {
//					x : 'center',
//					y : 10,
//					data : [ "告警数"]
//				},
				grid : {
					x : 80,
					y : 30,
					y2 : 40
				},
				dataZoom : {
			        show : true,
				},
				yAxis : {
					type : 'value'
				},
				xAxis : {
					type : 'category',
					data : legendData
				},
				series : [ {
					name : "告警数",
					type : 'bar',
					data : X_DATA
				}]
			};
			echart8.setOption(option);
		}
	});
}

/**
 * 设置时间的方法
 * 
 * @param dateTime
 */
function qytQueryOveride(flag, dateTime) {
	var date;
	var resultDay;
	// 负荷曲线
	if (flag == 1) {
		date = $('#echart1_dataDate').val();
		resultDay = timeUtil(dateTime, date);
		$('#echart1_dataDate').val(resultDay.substr(0, 10));
		selectZHNYZLqyfhqx();
		// 客户日用电排名
	} else if (flag == 2) {
		date = $('#echart4_dataDate').val();
		resultDay = timeUtil(dateTime, date);
		$('#echart4_dataDate').val(resultDay.substr(0, 10));
		selectZHNYZLkhydpm();
	}

	// loadData();

}
/**
 * 时间处理的工具类
 * 
 * @param dateTime
 * @param startDay
 * @returns {String}
 */
function timeUtil(dateTime, startDay) {
	var resultDay = DateUtil.dateAdd("d", parseInt(dateTime), DateUtil
			.strToDate(startDay));
	var resultStr = "";
	resultStr += resultDay.getFullYear() + "-"
			+ leftPad((resultDay.getMonth() + 1)) + "-"
			+ leftPad(resultDay.getDate());
	function leftPad(str) {
		if (str.toString().length == 1) {
			return '0' + str;
		} else {
			return str;
		}
	}
	return resultStr;

}

function btnClick(index) {
	if (index == 1) {
		$('#middlePage1').show(2000);
		$('#middlePage2').hide(2000);
		$('#img1').css({
			'background' : '#00BE28'
		});
		$('#img2').css({
			'background' : '#BFBFBF'
		});

		setTimeout(
				"echart1.resize();echart2.resize();echart3.resize();echart4.resize();",
				2000);
		
	} else if (index == 2) {
		$('#middlePage1').hide(2000);
		$('#middlePage2').show(2000);
		$('#img1').css({
			'background' : '#BFBFBF'
		});
		$('#img2').css({
			'background' : '#00BE28'
		});

		
		if (flag) {
//			console.log("加载第二页eCharts");
			setTimeout(
					"selectZHNYZLqygjpm();selectZHNYZLqygdpm();selectZHNYZLqyzdpm();selectZHNYZLqygjzdpm();echart5.resize();echart6.resize();echart7.resize();echart8.resize();",
					2000);
			flag = false;
		}else{
			setTimeout(
					"echart5.resize();echart6.resize();echart7.resize();echart8.resize();",
					2000);
		}

	}
}