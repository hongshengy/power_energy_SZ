 /**
 * 客户总览
 * 
 * @author mxl
 * @param <E>
 * @since 2017-04-06
 */
var treeNodeType = '0';			// 树节点类型
var index = 0;					// 树首次加载
var currentdate = new Date();	// 当前时间
var startDate = new Date();		// 当前时间
var subsId = '';				// 用户变id
var jk_chart1_option;			// 设备监控仪表盘option1
var jk_chart2_option;			// 设备监控仪表盘option2
var jk_chart1;					// 设备监控仪表盘1
var jk_chart2;					// 设备监控仪表盘2
var subsId1;					// 用户变id1
var subsId2;					// 用户变id2
var queryTime = DateUtil.dateToStr('yyyy-MM-dd',currentdate);	//格式化时间
var queryYesterDayTime = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('d',-1,currentdate));//取前一天数据
var endDate = new Date();		// 当前结束时间  为当前时间
var isSuccesLoad = true;		// 是从哪个页面点击的 一次图跳转用到
var barOrPie = true;			// 当前选中的是柱状图还是饼状图
var queryConsName = null;		// 在档案跳转过来加载使用的consName
var userCheckCos = [];			// 功率因数值
var optionLoad = {};

$(function(){
	
	/**
	 * 客户树展开与隐藏
	 * 控制实时负荷 用电概览等自适应 
	 */
	$('#westTree').panel({
		onCollapse:function(){
			setTimeout("treeEvent();","100");
		},
		onBeforeExpand:function(){
//			setTimeout("treeEvent();","300");
		},
		onExpand:function(){
			setTimeout("treeEvent();","600");
		}
	});
	
	if(top.isCustomer){
		// 显示树 页面空白
		if(top.consId == "" || top.consId == null){
			customerLogin();
		}else{
			$("#westTree").remove();
		}
	}
	$("#useEnergyDate").val(DateUtil.dateToStr('yyyy-MM',currentdate));
	
	// 金坛显示为用能报表		
	if(top.areaNo == '101'){
		$("#is101Change").text("用能报表");
	}
	
	initLabel();				// jsp页面初始化
	
	initTree();					// 初始化树加载

	// 判断是不是客户角色  true是客户角色 flase不是客户角色
	// 不是客户角色不显示用能报告按钮
	if(top.isCustomer == true){
		$("#bt_exportynbg").hide();
		$(".jumpVideo").hide();
	}else{
		$("#bt_exportynbg").show();
		$(".jumpVideo").hide();
	}
	
	/**
	 * 用户负荷 用户实时电量 用电top10 选项卡
	 */
	$("#upTabs").tabs({
		onSelect:function(title,index){//title:标签名，index:下标
			if(top.isCustomer){
				// 显示树 页面空白
				if(consId == "" || consId == null){
					return;
				}
			}
			if(index == 0){
				queryLoadCurve();	// 用电负荷折线图
			}else if(index == 1){
				realTimeElecticity();// 用户实时电量查询
			}else if(index == 2){
				querychart3();		// 用电排名TOP10
			}
		}
	});

	/**
	 * 用电概览 功率因素 选项卡
	 */
	$("#downTabs").tabs({
		onSelect:function(title,index){
			if(top.isCustomer){
				// 显示树 页面空白
				if(consId == "" || consId == null){
					return;
				}
			}
			 if(index == 0){		// 电概览  查询尖峰平谷数据 以及日月数据
				elecTable();		// 默认加载柱状图
			}else if(index == 1){
				getData();			// 功率曲线因数
			}
		}
	});
	
	if(consId == "" || consId == null || consId == "null"){
		
	}else{
		// 实时负荷定时刷新
		setInterval("querySbjkSubsData();", "60000");
		// 实时负荷曲线图定时刷新
//		setInterval("queryLoadCurve();", "60000");
	}
	
	
	//线路能耗 打开页面
	$("#bt_exportxlnh").click(function(){
		openXlnhWindow();
	});
});

/**
 * 客户树展开与隐藏
 */
function treeEvent(){
	var upTab = $("#upTabs").tabs('getSelected');//获取实时负荷 实时电量 用电排名TOP选中的tab
	var upIndex = $("#upTabs").tabs('getTabIndex',upTab);//获取实时负荷 实时电量 用电排名TOP的下标值
	if(upIndex == 0){				// 选中的是实时负荷
		queryLoadCurve();
	}else if(upIndex == 1){			// 选中的是实时电量
		realTimeElecticity();
	}else if(upIndex == 2){			// 选中的是用电排名TOP10
		querychart3();
	}
	
	var downTab = $("#downTabs").tabs('getSelected');//获取选中的tab
	var downIndex = $("#downTabs").tabs('getTabIndex',downTab);//获取实时负荷 实时电量 用电排名TOP的下标值
	if(downIndex == 0){				// 选中的是用电概览
		elecTable();
	}else if(downIndex == 1){		// 选中的是功率因素
		getData();
	}
}

function autoResize(newW, newH) {
	var oldH = 0;
	var child = [];
	
	if($(this).closest(".main-panel")){
		oldH = $(this).closest(".main-panel").height();
		child = $(this).closest(".main-panel").children();
	}else{
		oldH = $(this).height();
		child = $(this).children();
	}
	
	var autoC = [];

	$.each(child, function(i, v) {
		if($(v).hasClass("auto-resize")) { //普通div
			autoC.push(v);
			return;
		} else if($(v).hasClass("panel") && $(v).children(".panel-body").hasClass("auto-resize")) { //easyui-panel
			autoC.push(v);
			return;
		}
		oldH -= $(v).outerHeight(true);
	});

	if(autoC.length == 0) {
		return;
	}

	var average = oldH / autoC.length;
	$.each(autoC, function(i, v) {
		if($(v).hasClass("panel")) {
			$(v).children(".auto-resize").panel({
				height: average
			});
		}else if($(v).hasClass("easyui-tabs")&&$(v).hasClass("auto-resize")){ //easyui-tabs
			$(v).tabs({
				height: average
			});
		} else {
			var mbpH = $(v).outerHeight(true) - $(v).height();
			average = average - mbpH;
			$(v).height(average);
		}
	});
}

/**
 * 柱状图饼状图切换 
 */
function checkRadio(index){
	if(top.isCustomer){
		// 显示树 页面空白
		if(consId == "" || consId == null){
			return;
		}
	}
	if(index == 1){
		barOrPie = true;
		elecTable();		// 柱状图
	}else if(index == 2){
		barOrPie = false;
		elecTable();		// 饼状图
	}
}

/**
 * 用户负荷 用户实时电量 用电top10 用电概览 功率因素查询按钮
 */
function getUpButton(str){
	if(top.isCustomer){
		// 显示树 页面空白
		if(consId == "" || consId == null){
			return;
		}
	}
	var type = str.id;		// 三个查询按钮不同的值
	if(type == 0){			// 用户负荷折线图
		queryLoadCurve();
	}else if(type == 1){	// 用户实时电量
		realTimeElecticity();
	}else if(type == 2){	// 用电套扑腾
		querychart3();
	}else if(type == 3){	// 用电概览  查询尖峰平谷数据 以及日月数据
		elecTable();
	}else if(type == 4){	// 功率因素
		getData();
	}
}

/**
 *  实时负荷时间
 */
function realTimeLoad(dateTime){
	if(top.isCustomer){
		// 显示树 页面空白
		if(consId == "" || consId == null){
			return;
		}
	}
	var startDay2 = $('#dateFhqx').val();			// 得到选中的时间
	var resultDay = timeUtil(dateTime,startDay2);	// 根据传进来的参数-1,1格式化时间
	$('#dateFhqx').datebox('setValue',resultDay);	// 重新赋值
	queryLoadCurve();								// 点击箭头加载实时负荷
}

/**
 * 实时电量时间 
 */
function realTimeElec(dateTime){
	if(top.isCustomer){
		// 显示树 页面空白
		if(consId == "" || consId == null){
			return;
		}
	}
	var startDay2 = $('#findRealTime').val();		// 得到选中的时间
	var resultDay = timeUtil(dateTime,startDay2);	// 根据传进来的参数-1,1格式化时间
	$('#findRealTime').datebox('setValue',resultDay);//重新赋值
	realTimeElecticity();							// 点击箭头加载实时电量
}

/**
 * top10时间 
 */
function top10Date(dateTime){
	if(top.isCustomer){
		// 显示树 页面空白
		if(consId == "" || consId == null){
			return;
		}
	}
	var startDay2 = $('#top10Date').val();			// 得到选中的时间
	var resultDay = timeUtil(dateTime,startDay2);	// 根据传进来的参数-1,1格式化时间
	$('#top10Date').datebox('setValue',resultDay);	// 重新赋值
	querychart3();									// 点击箭头加载用电top
}

/**
 * 用电概览修改月时间
 */
function gaiLanRightDate(){
	if(top.isCustomer){
		// 显示树 页面空白
		if(consId == "" || consId == null){
			return;
		}
	}
	var selectType = $('#selectType').combobox('getValue');
	if(selectType == 'M'){							// 选择月电量的时候
		var startDay2 = $('#startMonthDate').val(); // 得到选中的时间
		var resultDay = timeUtils(-1,startDay2);	// 根据传进来的参数-1,1格式化时间
		$('#startMonthDate').val(resultDay);
	}else{											// 选择年电量的时候
		var startDay2 = $('#startYearDate').val();	// 得到选中的时间
		startDate1 = new Date(startDay2);
		var nowDate = DateUtil.dateToStr('yyyy',DateUtil.dateAdd('y',-1,startDate1));
		$('#startYearDate').val(nowDate);
	}
	elecTable();
}

/**
 * 左侧按钮加月份 
 */
function gaiLanLeftDate(){
	if(top.isCustomer){
		// 显示树 页面空白
		if(consId == "" || consId == null){
			return;
		}
	}
	var selectType = $('#selectType').combobox('getValue');
	if(selectType == 'M'){							// 选择月电量的时候
		var startDay2 = $('#startMonthDate').val(); // 得到选中的时间
		var resultDay = timeUtils(1,startDay2);		// 根据传进来的参数-1,1格式化时间
		$('#startMonthDate').val(resultDay);
	}else{											// 选择年电量的时候
		var startDay2 = $('#startYearDate').val();	// 得到选中的时间
		startDate1 = new Date(startDay2);
		var nowDate = DateUtil.dateToStr('yyyy',DateUtil.dateAdd('y',1,startDate1));
		$('#startYearDate').val(nowDate);
	}
	elecTable();
}

/**
 * 功率因素修改月时间
 */
function updateMonth(dateTime){
	if(top.isCustomer){
		// 显示树 页面空白
		if(consId == "" || consId == null){
			return;
		}
	}
	var startDay2 = $('#findMonth').val();			// 得到选中的时间
	var resultDay = timeUtils(dateTime,startDay2);	// 根据传进来的参数-1,1格式化时间
	$("#findMonth").datebox('setValue',resultDay);	// 重新赋值
	getData();
}

/**
 * 点击按钮 时间加减月份
 * 根据传进来的是正数或是负数加减月份
 */
function timeUtils(dateTime,startDay){
	var resultDay = DateUtil.dateAdd("m", parseInt(dateTime), DateUtil.strToDate(startDay));
	var resultStr = "";
	resultStr+=resultDay.getFullYear()+"-"+leftPad((resultDay.getMonth()+1));
	function leftPad(str){
		if(str.toString().length==1){
			return '0'+str;
		}else{
			return str;
		}
	}
	return resultStr;
}

/**
 *  date是要进行加减的日期  格式是YYYY-MM-DD,days是要加减的天数,
 *  如果往前算就传入负数,如果往后算就传入正数
 */
function addDate(date,days){
	var now = new Date(date);			// 格式化日期
	now.setDate(now.getDate()+days);	// 当前日期的前一天
	var month = now.getMonth()+1;
	var day = now.getDate();
	if(month < 10){
		month = "0" + month;
	}
	if(day < 10){
		day = "0"+day;
	}
	var obj = now.getFullYear()+"-"+month + "-" + day;
	return obj;
}

/**
 * 时间加减的 
 * 传进来的是正数还是负数进行加减时间
 */
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

/**
 * 客户用户登录进来需要隐藏的
 */
function customerLogin(){
	// 隐藏用能报告
	$("#bt_exportynbg").hide();
	// 隐藏用能日报
	$("#bt_exportxlnh").hide();
	
	// 用电异常设置为空
	// 隐藏设备监控
	$("#sbjk_subs").hide();
}

/**
 * 初始化树加载
 */
function initTree(){
	if(consId==null || consId==''|| consId=="null"){//未获取到企业编码，加载左侧树
		
		// 客户角色登录隐藏客户树
		if(top.isCustomer){
			// 客户为空
			if(top.consId.length == 0){
				consId = "";
//				return;
				consSelectMethod = "consSelectMethodLoad();";//定义选中后执行的方法
				consSelectHasRoot = false;//是否有区域能源根节点
				consSelectSearch("",true);
			}else if(top.consId.length == 12){
				consId = top.consId;
				consName = top.consName;
				isSuccesLoad = true;			// 点击一次图使用 判断是客户视图点击还是客户总览点击
				querySbjkSubsData();			// 设备监控区域用户变信息获取
				queryCorporation();				// 查询企业的基本信息
				queryUseEnergyData();			// 用能统计信息获取
				queryYesterDay();				// 昨日电量
				queryTomorrow();				// 今日电量
				queryToDayWorkOrder();			// 当日工单
				queryThisMonths();				// 查询本月越限次数
				queryUpMonths();				// 查询上月越限次数
				queryEndWorkOrder();			// 查询安全工单
				queryWorking();					// 查询设备工况
				queryCalculate();				// 查询测点分布
				queryWater();					// 查询用水
				var upTab = $("#upTabs").tabs('getSelected');//获取实时负荷 实时电量 用电排名TOP选中的tab
				var upIndex = $("#upTabs").tabs('getTabIndex',upTab);//获取实时负荷 实时电量 用电排名TOP的下标值
				if(upIndex == 0){				// 选中的是实时负荷
					queryLoadCurve();
				}else if(upIndex == 1){			// 选中的是实时电量
					realTimeElecticity();
				}else if(upIndex == 2){			// 选中的是用电排名TOP10
					querychart3();
				}
				var downTab = $("#downTabs").tabs('getSelected');//获取选中的tab
				var downIndex = $("#downTabs").tabs('getTabIndex',downTab);//获取实时负荷 实时电量 用电排名TOP的下标值
				if(downIndex == 0){				// 选中的是用电概览
					elecTable();
				}else if(downIndex == 1){		// 选中的是功率因素
					getData();
				}
			}
			
		}else{
			consSelectMethod = "consSelectMethodLoad();";//定义选中后执行的方法
			consSelectHasRoot = false;//是否有区域能源根节点
			consSelectSearch("",true);
		}
		
	}else{
		isSuccesLoad = false;
		querySbjkSubsData();					// 设备监控区域用户变信息获取
		queryCorporation();						// 查询企业的基本信息
		queryUseEnergyData();					// 用能统计信息获取
		queryLoadCurve();						// 实时负荷用电折线图
		elecTable();							// 峰谷电量
		queryYesterDay();						// 昨日电量
		queryTomorrow();						// 今日电量
		queryToDayWorkOrder();					// 当日工单
		queryThisMonths();						// 查询本月越限次数
		queryUpMonths();						// 查询上月越限次数
		queryEndWorkOrder();					// 查询安全工单
		queryWorking();							// 查询设备工况
		queryCalculate();						// 查询测点分布
		queryWater();		// 查询用水
	}
}

/**
 * 快搜选中节点 
 */
function consSelectMethodLoad(){
	
	isSuccesLoad = true;			// 点击一次图使用 判断是客户视图点击还是客户总览点击
	consId = consSelectCon.id;		// 把树节点id赋给企业id
	consName = consSelectCon.text;  // 把树节点的值赋给企业名称
	querySbjkSubsData();			// 设备监控区域用户变信息获取
	queryCorporation();				// 查询企业的基本信息
	queryUseEnergyData();			// 用能统计信息获取
	queryYesterDay();				// 昨日电量
	queryTomorrow();				// 今日电量
	queryToDayWorkOrder();			// 当日工单
	queryThisMonths();				// 查询本月越限次数
	queryUpMonths();				// 查询上月越限次数
	queryEndWorkOrder();			// 查询安全工单
	queryWorking();					// 查询设备工况
	queryCalculate();				// 查询测点分布
	queryWater();					// 查询用水
	var upTab = $("#upTabs").tabs('getSelected');//获取实时负荷 实时电量 用电排名TOP选中的tab
	var upIndex = $("#upTabs").tabs('getTabIndex',upTab);//获取实时负荷 实时电量 用电排名TOP的下标值
	if(upIndex == 0){				// 选中的是实时负荷
		queryLoadCurve();
	}else if(upIndex == 1){			// 选中的是实时电量
		realTimeElecticity();
	}else if(upIndex == 2){			// 选中的是用电排名TOP10
		querychart3();
	}
	var downTab = $("#downTabs").tabs('getSelected');//获取选中的tab
	var downIndex = $("#downTabs").tabs('getTabIndex',downTab);//获取实时负荷 实时电量 用电排名TOP的下标值
	if(downIndex == 0){				// 选中的是用电概览
		elecTable();
	}else if(downIndex == 1){		// 选中的是功率因素
		getData();
	}
	
}

/**
 * 显示企业的基本信息 
 */
function queryCorporation(){
	$.ajax({
		type: "post",
		url:webContextRoot +'comMonitor/querySfConsList.action?sfConsModel.consId='+consId,//请求地址
		dataType:"json",						// 返回类型
		cache : false,
		async : false,							// 同步异步请求
		success: function(data){
			if(data.length == 1){
				queryConsName = data[0].consName==""?'':data[0].consName;
				   $("#company").text(data[0].consName==""?'':data[0].consName);
				   $("#consNo").text(data[0].consNo==""?'':data[0].consNo);
				   $("#elecAddr").text(data[0].elecAddr==""?'':data[0].elecAddr);
				   $("#dydj").text(data[0].voltCodeName==""?'':data[0].voltCodeName);
				   $("#htrl").text(data[0].contractCap==""?'':data[0].contractCap+"kVA");
				   $("#lxr").text(data[0].contactName==""?'':data[0].contactName);
				   $("#lxdh").text(data[0].telePhone==""?'':data[0].telePhone);
				   if(data[0].statusCode=="1"){			// 显示用户的状态
				   $('#yhzt').text("正常用户 ");
				   }else if(data[0].statusCode=="2"){
				   $('#yhzt').text("已销户");
				   }else{
					   $('#yhzt').text('');
				   }
			}else{
				return;
			}
		   
		}
	});
}

/**
 * 企业用户树隐藏
 */
function closeTree(){
	$(".left-tree-panel .tool").removeClass("layout-button-left");
	$(".left-tree-panel .tool").addClass("layout-button-right");
	$(".left-tree-panel").offset({left: -170,top:0 });
	$(".left-tree-panel .left-mask").show();
}

/**
 * 查询实时电量 
 */
function realTimeElecticity(){
	var startDay = $('#findRealTime').datebox('getValue');			// 开始时间
	var yesterDay = addDate(startDay,-1);
	myChart11 = echarts.init(document.getElementById("chart11")); 	// 初始化Echarts控件
	
	var title = queryConsName + "实时电量";							// 获取企业名称
	var toDayName = startDay + " 用电";
	var yesterDayName = yesterDay+" 用电";
	
	myChart11.showLoading({											// 正在加载...
		text:'正在努力的读取数据中...',
		effect:'spin'
	});
     $.post(webContextRoot + 'comMonitor/queryRealTime.action',{	// 链接地址
        'sEnergyLineHourModel.consId' : consId,
        'sEnergyLineHourModel.dataDate' : startDay
     },
     function(data){
         queryRealTimeChart(data.consMap,title,toDayName,yesterDayName);// 图表
         myChart11.hideLoading();									// 隐藏正在加载的...
     },'json');
}

/**
 * 实时电量折线图 
 */
function queryRealTimeChart(data,title,toDayName,yesterDayName){
	var option = {
		    title : {
		        text: title,
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
						if (params[i].seriesName.indexOf('用电') >= 0) {
							res += params[i].value + 'kWh<br/>'
						}
					}
					return res;
					
//					var res = '';
//					if(params == null ||params[0] == null){
//						return;
//					}
//					for(var i =0;i<params.length;i++){
//						if(i==0){
//							res += params[i].seriesName.split(' ')[0]+' ' + params[i].name + ' 电量：'+ data.currentPowerValue[params[i].dataIndex]+'kWh' + '<br/>';
//						}
//						if(i==1){
//							res += params[i].seriesName.split(' ')[0]+' '+ params[i].name + ' 电量：'+ data.prePowerValue[params[i].dataIndex] +'kWh' + '<br/>';
//						}
//					}
//					return res;
				}
			},
		    legend: {
		        data:[toDayName,yesterDayName],
		        selected : {toDayName:true,
		        			yesterDayName:true
		        			},
		      	padding:32
		    },
		    toolbox:{
		    	show:true,
		    	feature:{
		    		dataZoom:{},
		    		magicType:{type:['line','bar']},
		    		restore:{},
		    		saveAsImage:{}
		    	}
		    },
		    calculable : true,
		    xAxis : [
		        {
		            type : 'category',
//		            boundaryGap : false,
		            data : data.categes
		        }
		    ],
		    yAxis : [
		        {
		        	name : '单位(kWh)',
		            type : 'value',
		            axisLabel : {
		                formatter: '{value}'
		            }
		        }
		    ],
		    grid : {
	 			 x : 45, 			// 左边距离
	 			 y : 65,			// 上边距离
	 			 x2 : 20,			// 右边距离
	 			 y2 : 35			// 下边距离
	 		},
		    series : [
		        {
		            name:toDayName,
		            type:'bar',
		            data: data.currentPowerValue
		        },
		        {
		            name:yesterDayName,
		            type:'bar',
		            data: data.prePowerValue
		        }
		    ]
		};
	myChart11.setOption(option,true);
	myChart11.resize();
}

/***
 * 加载 
 */
function longPolling(){
	var startDay = $('#dateFhqx').datebox('getValue');				// 当天时间
	var yesterDay = addDate(startDay,-1);							// 前一天时间
	var title = queryConsName + "负荷曲线";							// 获取企业名称
	var toDayName = startDay + " 负荷";								// 当天legend
	var yesterDayName = yesterDay+" 负荷";							// 前一天legend
	var selValData = $('#selectFhqx').combobox('getValue');			// 得到点数 24 48 96 288 ... 1440点 
	
	//加载数据  
    jQuery.ajax({  
      url:webContextRoot + 'comMonitor/queryRealTime.action',
      data: "sEnergyLineHourModel.dataDate="+ startDay +"&sEnergyLineHourModel.consId="+ consId +"&sEnergyLineHourModel.dataType=queryFx&sEnergyLineHourModel.queryType=" + selValData,//得到时间+用户ID
      type:'post',  
//      timeout: 200000,//设置为20s后断开连接
      dataType:'json',  
      success:function(jsons){  
    	  refresh(jsons);
    	  setTimeout("longPolling()","60000");
      }, 
      error:function(){  
    	  // 如果返回错误，根据错误信息进行相应的处理  
          // 再次发起长连接  
          longPolling();
      }  
  });
}

function refresh(data) {  
	optionLoad.xAxis[0].data = data.consMap.categes;   
	optionLoad.series[0].data = data.consMap.currentPowerValue; // 设置图表  
	optionLoad.series[1].data = data.consMap.prePowerValue; // 设置图表  
	myChart1.setOption(optionLoad,true);// 重新加载图表 
}

/**
 * 用电负荷曲线
 * 和实时用电公用一个方法 使用 dataType=queryFx 区分开
 */
function queryLoadCurve(){
 	myChart1 = echarts.init(document.getElementById("chart1"));		// 初始化echart
	var startDay = $('#dateFhqx').datebox('getValue');				// 当天时间
	var yesterDay = addDate(startDay,-1);							// 前一天时间
	var title = queryConsName + "负荷曲线";							// 获取企业名称
	var toDayName = startDay + " 负荷";								// 当天legend
	var yesterDayName = yesterDay+" 负荷";							// 前一天legend
	var selValData = $('#selectFhqx').combobox('getValue');			// 得到点数 24 48 96 288 ... 1440点 
	myChart1.showLoading({											// 正在加载...
		text:'正在努力的读取数据中...',
		effect:'spin'
	});
	$.post(webContextRoot + 'comMonitor/queryRealTime.action',{		// 链接地址
        'sEnergyLineHourModel.consId' : consId,
        'sEnergyLineHourModel.dataDate' : startDay,
        'sEnergyLineHourModel.queryType' : selValData,
        'sEnergyLineHourModel.dataType' : 'queryFx'
     },
     function(data){
    	 queryFxchart(data.consMap,title,toDayName,yesterDayName);	// 图表
         myChart1.hideLoading();									// 隐藏正在加载的...
     },'json');
}

/**
 * 用户实时负荷chart 
 */
function queryFxchart(data,title,toDayName,yesterDayName){
	
	optionLoad = {
		    title : {
		        text: title,
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
						if (params[i].seriesName.indexOf('负荷') >= 0) {
							res += params[i].value + 'kW<br/>'
						}
					}
					return res;
				}
			},
		    legend: {
		        data:[toDayName,yesterDayName],
		        selected : {toDayName:true,
		        			yesterDayName:true
		        			},
		      	padding:32
		    },
		    toolbox:{
		    	show:true,
		    	feature:{
		    		dataZoom:{},
		    		magicType:{type:['line','bar']},
		    		restore:{},
		    		saveAsImage:{}
		    	}
		    },
		    calculable : true,
		    xAxis : [
		        {
		            type : 'category',
		            boundaryGap : false,
		            data : []
		        }
		    ],
		    yAxis : [
		        {
		        	name : '单位(kW)',
		            type : 'value',
		            axisLabel : {
		                formatter: '{value}'//'{value} °C'
		            }
		        }
		    ],
		    grid : {
	 			 x : 45, 		// 左边距离
	 			 y : 65,		// 上边距离
	 			 x2 : 20,		// 右边距离
	 			 y2 : 35		// 下边距离
	 		},
		    series : [
		        {
		            name:toDayName,
		            type:'line',
		            data: []
		        },
		        {
		            name:yesterDayName,
		            type:'line',
		            data: []
		        }
		    ]
		};
	longPolling();
	
	//为eacharts控件赋值 显示数据
//	myChart1.setOption(option,true);
//	myChart1.resize();
}

/**
 * 用能统计时间加减 
 */
function queryDateTime(dateTime){
	if(top.isCustomer){
		// 显示树 页面空白
		if(consId == "" || consId == null){
			return;
		}
	}
	var startDate =  $('#useEnergyDate').val();//开始日期
	var nowDate = DateUtil.dateToStr('yyyy-MM',DateUtil.dateAdd('m',dateTime,DateUtil.strToDate(startDate)));
	$('#useEnergyDate').val(nowDate.substr(0,7));
	queryUseEnergyByDate(nowDate.substr(0,7));
	queryWater();
}

/**
 * 用能统计时间改变触发 
 */
function queryUseEnergyByDate(newValue){
	$.ajax({
		type : "POST",
		url : webContextRoot + 'comMonitor/queryUseEnergy.action?consId='+consId+'&dataDate='+newValue,
		dataType : "json",
		success : function(data) {
			$('#elecTb').text(data[0].elecTbRate);
			$('#elecHb').text(data[0].elecHbRate);
			$('#elecEnergy').text(data[0].elecEnergy);
		}
	});
}

/**
 * jsp页面控件初始化
 */
function initLabel(){
	$(".left-tree-panel .tool").click(function() {
		if($(".left-tree-panel .tool").hasClass("layout-button-left")) {
			$(".left-tree-panel .tool").removeClass("layout-button-left");
			$(".left-tree-panel .tool").addClass("layout-button-right");

			$(".left-tree-panel").animate({
				left: "-170px",
				top: "0px"
			}, 500, function() {
				$(".left-tree-panel .left-mask").show();
			});

		} else {
			$(".left-tree-panel .tool").removeClass("layout-button-right");
			$(".left-tree-panel .tool").addClass("layout-button-left");

			$(".left-tree-panel .left-mask").hide();
			$(".left-tree-panel").animate({
				left: "0px",
				top: "0px"
			}, 500);
		}
	});
	
	var elecAddrObj = document.getElementById('startMonthDate');//月数据
	elecAddrObj.value = DateUtil.dateToStr('yyyy-MM',DateUtil.dateAdd('m',0,endDate));//月数据加减
	var AddrObj = document.getElementById('startYearDate');//年数据
	AddrObj.value = DateUtil.dateToStr('yyyy',DateUtil.dateAdd('y',0,endDate));//年数据加减
		
	
	//电量计算方法下拉
	$('#selectType').combobox({
		 width: 100,
		 panelWidth: null,
		 valueField:'id',
	     textField:'text',
		 editable: false,
	     onSelect: function(rec){
	     	 dataType = rec.id;//数据查询类型
	     	 if(dataType =='M'){
	     		groupDateType = 'yyyy-MM';
	     		
	     		$('#startMonthDate').css('display','inline-block');
	     		$('#startYearDate').css('display','none');
	     	 }else if(dataType =='Y'){//按月统计
	     		//选择按月统计
	     		groupDateType = 'yyyy';
	     		$('#startMonthDate').css('display','none');
	     		$('#startYearDate').css('display','inline-block');
	     	 }
		},
		data: [{
			id: 'M',
			text: '月用电',
			selected:true   
		},{
			id: 'Y',
			text: '年用电'
		}]
	 });
	 
	//初始化时间插件
	$('.date-input').datebox({
		width: 100,
		required: true,
		editable: false,
		value: queryTime
	});

	$('#selectFhqx').combobox({
		width: 80,
		panelWidth: null,
		valueField: 'value',
		textField: 'text',
		editable: false,
		data: [{
			value: '1440',
			text: '1440点'
		}, {
			value: '288',
			text: '288点',
			selected: true
		}, {
			value: '144',
			text: '144点'
		}, {
			value: '96',
			text: '96点'
		}, {
			value: '48',
			text: '48点'
		}, {
			value: '24',
			text: '24点'
		}]
	});

	/**
	 * 初始化月份 只能选择月份的加减 
	 */
	$("#findMonth").datebox({
		width: 100,
		required: true,
		editable: false,
		value: queryTime,
		formatter : function(date){
			var y = date.getFullYear();
			var m = date.getMonth()+1;
			if(m.toString().length<2){
				m = '0'+m;
			}
			return y+'-'+m;
		},
		parser : function(date){
			var data = Date.parse(date);
			if (!isNaN(data)){
				return new Date(data);
			} else {
				return new Date();
			}
		},
		onChange : function(newValue, oldValue){
			
		}
	});
	
	jk_chart1 = echarts.init(document.getElementById('jk_chart1'));
	jk_chart2 = echarts.init(document.getElementById('jk_chart2'));
	jk_chart1_option = {
		tooltip: {
			formatter: "{b} : {c}%"
		},
		series: [{
			//name: '用户变1',
			type: 'gauge',
			radius: '100%',
	        min: 0,                     // 最小值
	        max: 125,                   // 最大值
			pointer: {
				width: 4
			},
			title: {
				show:false
			},
			detail: { 
				formatter: '{value}%', 
				offsetCenter: [0, '65%'], 
				textStyle: {
			        fontSize : 14
			    }
			},
			data: [{ value: 50, name: '负载率' }],
			axisLine: {            // 坐标轴线
	            lineStyle: {       // 属性lineStyle控制线条样式
	                color: [[0.24, '#FFDE00'],[0.6, '#2AAE71'],[0.8, '#FFA10E'],[1, '#FF0000']], 
	                width: 5
	            }
	        },
	        axisTick: {            // 坐标轴小标记
	        	show:false,
	            splitNumber: 10,   // 每份split细分多少段
	            length :15,        // 属性length控制线长
	            lineStyle: {       // 属性lineStyle控制线条样式
	                color: 'auto'
	            }
	        },
	        splitLine: {           // 分隔线
	            length :10,        // 属性length控制线长
	            lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
	                color: 'auto'
	            }
	        },
	        pointer : {
	            width : 5
	        },
	        axisLabel:{
	        	show: false
	        }
		}]
	};
	
	jk_chart2_option = {
			tooltip: {
				formatter: "{b} : {c}%"
			},
			series: [{
				type: 'gauge',
				radius: '100%',
		        min: 0,                     // 最小值
		        max: 125,                   // 最大值
				pointer: {
					width: 4
				},
				title: {
					show:false
				},
				detail: { 
					formatter: '{value}%', 
					offsetCenter: [0, '65%'], 
					textStyle: {
				        fontSize : 14
				    }
				},
				data: [{ value: 50, name: '负载率' }],
				axisLine: {            		// 坐标轴线
		            lineStyle: {       		// 属性lineStyle控制线条样式
		                color: [[0.24, '#FFDE00'],[0.6, '#2AAE71'],[0.8, '#FFA10E'],[1, '#FF0000']], 
		                width: 5
		            }
		        },
		        axisTick: {            		// 坐标轴小标记
		        	show:false,
		            splitNumber: 10,   		// 每份split细分多少段
		            length :15,        		// 属性length控制线长
		            lineStyle: {       		// 属性lineStyle控制线条样式
		                color: 'auto'
		            }
		        },
		        splitLine: {           		// 分隔线
		            length :10,         	// 属性length控制线长
		            lineStyle: {       		// 属性lineStyle（详见lineStyle）控制线条样式
		                color: 'auto'
		            }
		        },
		        pointer : {
		            width : 5
		        },
		        axisLabel:{
		        	show: false
		        }
			}]
		};
	jk_chart1.setOption(jk_chart1_option,true);
	jk_chart2.setOption(jk_chart2_option,true);
}

/**
 *  线路用电分布，统计当天的出线电量
 */
function querychart3(){
	var top10Date = $('#top10Date').datebox('getValue');
	myChart12 = echarts.init(document.getElementById("chart12"));	// 初始化echarts控件

	myChart12.showLoading({											// 正在加载...
		text:'正在努力的读取数据中...',
		effect:'spin'
	});
	$.post(webContextRoot + 'comMonitor/querySFLineHour.action',{	// 链接地址
        'sEnergyLineHourModel.consId' : consId,						// 用户ID
        'sEnergyLineHourModel.dataDate' : top10Date					// 当天时间
     },
     function(data){
    	 queryLineTop(data.consMap);								// 图表
         myChart12.hideLoading();									// 隐藏正在加载的...
     },'json');
}

/**
 * 用电排名TOP10折线图
 */
function queryLineTop(data){
	
	var option = {
			title :{x:'center',text:'用电排名前十位'},//+ (title==''?'':'('+title+')')
			tooltip:{show:true},
			  toolbox:{
		    	show:true,
		    	feature:{
		    		dataZoom:{yAxisIndex:false},
		    		dataView:{readOnly:false},
		    		magicType:{type:['line','bar']},
		    		restore:{},
		    		saveAsImage:{}
		    	}
			},
		    grid : {
	 			 x : 45, 		// 左边距离
	 			 y : 50,		// 上边距离
	 			 x2 : 20,		// 右边距离
	 			 y2 : 35		// 下边距离
	 		},
			xAxis: [{	
				type: 'category',
			    data: data.lineNameList,
			    axisTick:{
			    	alignWithLabel:true
			    },
			    axisLabel:{
			    	interval:0
			    }
			}],
	        yAxis: [{
	        	name: '单位(kWh)',
	        	type: 'value',
	        	splitNumber: 5,
	        	axisLabel: {formatter: '{value}'}
	        }],
	        series: [
				{	 
					 name: '用电',
					 type: 'bar',
                	 data: data.powerValue,
                	 tooltip: {
                		 	trigger: 'item', 
                		 	formatter: "线路:{b}<br/>{a}:{c}kWh"
                	 },
                	 itemStyle: { normal: {barBorderRadius: 0}}
                 }
           ]
	};
	
	myChart12.setOption(option,true);			// 为echarts控件赋值
}

/**
 * 查询昨日电量 
 */
function queryYesterDay(){
	$.ajax({
		type: "post",
		url:webContextRoot + 'comMonitor/queryYesterDay.action',//请求地址
		data: "sEnergyLineHourModel.dataDate=" + queryYesterDayTime + "&sEnergyLineHourModel.consId=" + consId,//得到时间+用户ID
		dataType:"json",		// 返回类型
		cache : false,
		async : false,			// 同步异步请求
		success: function(result){
			$("#yesterDay").text(result[0].energyP);
		}
	});
}

/**
 * 查询今日电量 
 */
function queryTomorrow(){
	$.ajax({
		type: "post",
		url:webContextRoot + 'comMonitor/queryTomorrow.action',//请求地址
		data: "sEnergyLineHourModel.dataDate=" + queryTime + "&sEnergyLineHourModel.consId=" + consId,//得到时间+用户ID
		dataType:"json",		// 返回类型
		cache : false,
		async : false,			// 同步异步请求
		success: function(result){	
			$("#toDay").text(result[0].energyP);
		}
	});
}

/**
 * 查询当日工单 
 */
function queryToDayWorkOrder(){
	$.ajax({
		type: "post",
		url:webContextRoot + 'comMonitor/queryToDayWorkOrder.action',//请求地址
		data: "sEnergyLineHourModel.sendTime=" + queryTime + "&sEnergyLineHourModel.consId=" + consId,//得到时间+用户ID
		dataType:"json",		// 返回类型
		cache : false,
		async : false,			// 同步异步请求
		success: function(result){
			$("#toDayWorkOrder").text(result[0].count);
		}
	});
}

/**
 * 查询本月越限次数 
 */
function queryThisMonths(){
	var thisMonth = DateUtil.dateToStr('yyyy-MM',currentdate);
	var downMonth = DateUtil.dateToStr('yyyy-MM',DateUtil.dateAdd('m',1,currentdate));
	$.ajax({
		type: "post",
		url:webContextRoot+'comMonitor/queryThisMonths.action',//链接地址
		data:"clientViewModel.consId=" + consId + "&clientViewModel.alarmStartTime="+thisMonth + "&clientViewModel.alarmEndTime="+downMonth,
		dataType:"json",			// 返回类型
		cache : false,
		async : false,				// 同步异步请求
		success: function(result){	// 赋值给页面
			var outLimit = '';
			if(top.areaNo == '101'){
				if(result[0].count > 5){
					outLimit = 5;
				}else if(result[0].count == 0){
					outLimit = 0;
				}else{
					outLimit = result[0].count;
				}
			}else{
				outLimit = result[0].count;
			}
			$('#thisMonths').html("<a onClick=\"openGj(1);\" style=\"color: #FFFFFF;cursor: pointer;\">"+outLimit+"</a>");
		}
	});
}
	
/**
 * 查询上月越限次数 
 */
function queryUpMonths(){
	var thisMonth = DateUtil.dateToStr('yyyy-MM',currentdate);
	var upMonth = DateUtil.dateToStr('yyyy-MM',DateUtil.dateAdd('m',-1,currentdate));
	$.ajax({
		type: "post",
		url:webContextRoot+'comMonitor/queryThisMonths.action',//链接地址
		data:"clientViewModel.consId=" + consId + "&clientViewModel.alarmStartTime="+upMonth + "&clientViewModel.alarmEndTime="+thisMonth,
		dataType:"json",
		cache : false,
		async : false,				// 同步异步请求
		success: function(result){	// 赋值给页面
			var outLimit = '';
			var outLimit = '';
			if(top.areaNo == '101'){
				if(result[0].count > 5){
					outLimit = 5;
				}else if(result[0].count == 0){
					outLimit = 0;
				}else{
					outLimit = result[0].count;
				}
			}else{
				outLimit = result[0].count;
			}
			$('#upMonths').html("<a onClick=\"openGj(0);\" style=\"color: #FFFFFF;cursor: pointer;\">"+outLimit+"</a>");
		}
	});
}

/**
 * 弹出告警
 */
function openGj(type){
	var queryTime = '';
	var endQueryTime = '';
	var alarmType =1;
	if(type == 1){//本月
		
		var month = startDate.getMonth()+1;
		if(month < 10){
			month = "0" + month;
		}
		queryTime = startDate.getFullYear() + "-" + month + "-01%2000:00:00";//本月
		endQueryTime = getFirstAndLastMonthDay(startDate.getFullYear(),month)+"%2023:59:59";
	}else{//上月
		var month = startDate.getMonth();
		if(month < 10){
			month = "0" + month;
		}
		alarmType = 2;
		queryTime = startDate.getFullYear() + "-" + month + "-01%2000:00:00";//本月
		endQueryTime = getFirstAndLastMonthDay(startDate.getFullYear(),month)+"%2023:59:59";
	}
	var options = {
        name: 'desgjcx',            // 需要打开的菜单的关键字,必须保证正确
        text: '告警查询',            // 打开菜单的标题,可修改
        path: '/des/pages/despages/warn/GaoJingChaXun.jsp?queryType='+5+'&alarmType='+alarmType+'&consId='+consId+'&startTime='+queryTime+'&endTime='+endQueryTime
    };
    top.reloadTabPage(options);
}

// 获得月份最后一天
function getFirstAndLastMonthDay(year,month){    
    var firstdate = year + '-' + month + '-01';  
    var day = new Date(year,month,0);   
    var lastdate = year + '-' + month + '-' + day.getDate();//获取当月最后一天日期    
    return lastdate;  
} 

/**
 * 查询安全工单时间 top.areaNo
 */
function queryEndWorkOrder(){
	$.ajax({
		type: "post",
		url:webContextRoot+'comMonitor/queryEndWorkOrder.action',//链接地址
		data:"clientViewModel.consId=" + consId + "&clientViewModel.areaNo="+top.areaNo,//根据用户Id查询
		dataType:"json",
		cache : false,
		async : false,				// 同步异步请求
		success: function(result){	// 赋值给页面
			if(result.length > 0){
				$("#safety").text(result[0].createDate);
			}else{
				$("#safety").text("0");
			}
			
		}
	});
}

/**
 * 查询实时负荷信息
 */
function querySbjkSubsData(){
	$.ajax({
		type : "POST",
		url : webContextRoot + 'comMonitor/queryFh.action?consId='+consId,
		dataType : "json",
		success : function(data) {
			if(data.length > 0){
				
				// 客户实时负荷
				$('#realTimeFhCons').text(data[0].consRealTimeFh);
				// 实时负荷 和 最大负荷取的是两张表 很容易出现实时负荷大于最大负荷现象
				// 如果实时负荷大于最大负荷 最大负荷的值将是实时负荷 时间为当前时间
				if(data[0].consRealTimeFh > data[0].consMaxFh){
					// 客户当日最大负荷
					$('#maxFh').text(data[0].consRealTimeFh);//+"kW" 2017-5-25修改
					// 最大负荷时间
					// 取当前时间
					var myDate = new Date;
					// 小时
					var hours = '';
					// 分钟
					var minutes = '';
					// 如果小于10 在前面补0
					if(myDate.getHours() < 10){
						hours = '0' + myDate.getHours();
					}else{
						hours = myDate.getHours();
					}
					if(myDate.getMinutes() < 10){
						minutes = '0' + myDate.getMinutes();
					}else{
						minutes = myDate.getMinutes();
					}
					var maxTime = hours + ":" + minutes;// + ":00";
					$('#maxFhTime').text(maxTime);
				}else if(data[0].consRealTimeFh < data[0].consMaxFh){
					if(data[0].consMaxFh != ""){
						$('#maxFh').text(data[0].consMaxFh);//+"kW" 2017-5-25修改
					}else {
						$('#maxFh').text("-");
					}
					// 最大负荷时间
					if(data[0].consMaxFhTime != ""){
						$('#maxFhTime').text(data[0].consMaxFhTime.substring(0,5));
					}else {
						$('#maxFhTime').text("-");
					}
				}
				
				if(data.length > 1){
					subsId1 = data[1].SUBS_ID;
					$('#sbjk_subs').show();
					$('#sbjk_subs2_tr1').hide();
					$('#sbjk_subs2_tr2').hide();
					$('#sbjk_subs2_tr3').hide();
					if(data[1].SUBS_NAME.length > 7){
						$('#subs_name1').text(data[1].SUBS_NAME.substr(0, 6)+"...");
						$('#subs_name1').attr('title', data[1].SUBS_NAME);
					}else {
						$('#subs_name1').text(data[1].SUBS_NAME);
						$('#subs_name1').attr('title', "");
					}
					$('#subs_real_time_fh1').text(data[1].USE_LOAD+"kW");
					$('#subs_warning1').text(data[1].warningNum);
					//jk_chart1_option.series[0].name = data[1].SUBS_NAME;
					jk_chart1_option.series[0].data[0].value = data[1].FZ_RATE;
					jk_chart1.setOption(jk_chart1_option, true);
				}else {
					$('#sbjk_subs').hide();
				}
				
				if(data.length > 2){
					subsId2 = data[2].SUBS_ID;
					$('#sbjk_subs2_tr1').show();
					$('#sbjk_subs2_tr2').show();
					$('#sbjk_subs2_tr3').show();
					if(data[2].SUBS_NAME.length > 7){
						$('#subs_name2').text(data[2].SUBS_NAME.substr(0, 6)+"...");
						$('#subs_name2').attr('title', data[2].SUBS_NAME);
					}else {
						$('#subs_name2').text(data[2].SUBS_NAME);
						$('#subs_name2').attr('title', "");
					}
					$('#subs_real_time_fh2').text(data[2].USE_LOAD+"kW");
					$('#subs_warning2').text(data[2].warningNum);
					//jk_chart2_option.series[0].name = data[2].SUBS_NAME;
					jk_chart2_option.series[0].data[0].value = data[2].FZ_RATE;
					jk_chart2.setOption(jk_chart2_option, true);
				}
			} else {
				$('#realTimeFhCons').text("0.00");
				$('#maxFh').text("-");
				$('#maxFhTime').text("-");
			}
		}
	});
}

/**
 * 查询用能统计信息
 */
function queryUseEnergyData(){
	// 用能统计日期控件
	$.ajax({
		type : "POST",
		url : webContextRoot + 'comMonitor/queryUseEnergy.action?consId='+consId,
		dataType : "json",
		success : function(data) {
			$('#elecTb').text(data[0].elecTbRate);
			$('#elecHb').text(data[0].elecHbRate);
			$('#elecEnergy').text(data[0].elecEnergy);
		}
	});
}

/**
 * 查询用水量 
 */
function queryWater(){
	var startDate =  $('#useEnergyDate').val()+"-01";//开始日期
	var endDate = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('m',1,DateUtil.strToDate(startDate)));//月份加1
	$.ajax({
		type : "POST",
		url : webContextRoot + 'comMonitor/queryWater.action',
		data : "consPowerInfoModel.consId=" + consId + "&consPowerInfoModel.startDate=" + startDate + "&consPowerInfoModel.endDate=" + endDate,	// 传递的参数
		dataType : "json",
		success : function(data) {
			$('#water').text("0");
			$('#waterTb').text("-");
			$('#waterHb').text("-");
			if(data.consMap.waterTongbi == 0){
				$('#waterTb').text("-");
			}else{
				$('#waterTb').text(data.consMap.waterTongbi+"%");
			}
			if(data.consMap.waterHuanbi == 0){
				$('#waterHb').text("-");
			}else{
				$('#waterHb').text(data.consMap.waterHuanbi+"%");
			}
			$('#water').text(data.consMap.water);
		}
	});
}

/**
 * 用户变跳转视频监控
 */
function jumpToVideo(subsConfig) {
	var jumpFlag = 0;
	var item;
	var urlPath;
	if(subsConfig == 1){
		if(isSuccesLoad == true){	// 客户总览点击进来
			urlPath = '/des/pages/despages/monitor/video.jsp?consId=' + consId
			+ '&subsId=' + subsId1;
		}else{						// 客户视图点击进来
			parent.window.clikyct(jumpFlag,subsId1);
		}
	}else if(subsConfig == 2){
		if(isSuccesLoad == true){	// 客户总览点击进来
			urlPath = '/des/pages/despages/monitor/video.jsp?consId=' + consId
			+ '&subsId=' + subsId2;
		}else{						// 客户视图点击进来
			parent.window.clikyct(jumpFlag,subsId2);
		}
	}
	item ={
			path : urlPath,
			name : 'spjkleaf',
			text : '视频监控'
		};
		top.reloadTabPage(item);
	
}

/**
 * 用户变跳转一次图
 */
function jumpToYct(subsConfig) {
	var jumpFlag = 1;
	var item;
	var urlPath;
	if(subsConfig == 1){
		if(isSuccesLoad == true){
			urlPath = '/des/pages/despages/monitor/userMonitor.jsp?consId=' + consId
			+ '&userTranId=' + subsId1;
		}else{
			parent.window.clikyct(jumpFlag,subsId1);
		}
	}else if(subsConfig == 2){
		if(isSuccesLoad == true){
			urlPath = '/des/pages/despages/monitor/userMonitor.jsp?consId=' + consId
			+ '&userTranId=' + subsId2;
		}else{
			parent.window.clikyct(jumpFlag,subsId2);
		}
	}
	item = {
			path : urlPath,
			name : 'desyhbjk',
			text : '一次图监控'
		};
		top.reloadTabPage(item);
}


/**
 * 查询设备工况 
 */
function queryWorking(){
	var dataName = new Array();				// 初始化变量
	var dataNameResult1 = new Array();
	var dataNameResult2 = new Array();
	//初始化echarts控件
	myChart6 = echarts.init(document.getElementById("chart6"));
	loadWorking();							// 加载数据
	var option = {
	    title : {
	        text: '设备工况',
	        padding:15,
	        subtext: '',
	        x: 'center'
	    },
	    tooltip : {
	        trigger: 'axis',
	        formatter: function(params) {
	        	var paramResult = ' '+ params[0].name + '<br/>';
	        	for ( var i = 0; i < params.length; i++) {
					paramResult += params[i].seriesName + ' : ' 
								 + params[i].value + '<br/>';
				}
               return paramResult;
	        }
	    },
	    toolbox:{
	    	show:true,
	    	feature:{
	    		dataZoom:{},
	    		magicType:{type:['line','bar']},
	    		restore:{},
	    		saveAsImage:{}
	    	}
	    },
	    legend: {
	    	padding:39,
	        data:['总数','停运'],
	        x: 'center'
	    },
	    grid: {y: 70, y2:20,x:40,x2:20},
	    dataZoom : {
	        show : false,
	        realtime : true,
	        start : 0,
	        height : 30,
	        y2: 18,
	        end : 100
	    },
	    xAxis : [
	        {
	            type : 'category',
	            data : dataName
	        }
	    ],
	    yAxis : [
	        {
	            type : 'value'
	        }
	    ],
	    series : [
	        {
	            name:'总数',
	            type:'bar',
	            data:dataNameResult1
	        },
	        {
	            name:'停运',
	            type:'bar',
	            data:dataNameResult2
	        }
	    ]
	};
	myChart6.setOption(option,true);		// 给echarts赋值
	//获取数据的方法
	function loadWorking(){
		$.ajax({
			type: "post",					// 使用post请求格式
			url:webContextRoot+'comMonitor/queryWorking.action',//请求地址
			data : "consPowerInfoModel.consId=" + consId,	// 传递的参数
			dataType : "json",				// 返回的类型
			cache : false,
			async : false,					// 同步异步请求
			success : function(result) {
				dataName = result.X_DATA_RESULT0;			// 工况名字
				dataNameResult1 = result.X_DATA_RESULT1;	// 总数
				dataNameResult2 = result.X_DATA_RESULT2;	// 停运数量
			}
		});
	}
}

/**
 * 测点分布统计图 
 */
function queryCalculate(){
	
	var legendData13 = new Array();			// 初始化变量
	var seriesData13 = new Array();
	var X_COUNT = 0;
	//初始化echarts控件
	myChart7 = echarts.init(document.getElementById("chart7"));
	queryCalculateData();					// 加载数据的方法
	var option = {
		title : {
	        text: '测点分布统计图\n\n测点总数: '+X_COUNT+'',
	        textStyle:{
	        	fontSize:16,
	        	fontWeight:'bolder'
	        },
	        x:'center',
	        y:'center'
	    },
	    tooltip: {
	        trigger: 'item',
	        formatter: "{a} <br/>{b}: {c} ({d}%)"
	    },
	    legend: {
	        orient: 'vertical',
	        x: 'left',
	        data:legendData
	    },
	    series: [
	        {
	            name:'测点统计',
	            type:'pie',
	            radius: ['50%', '70%'],
	            avoidLabelOverlap: false,
	            label: {
	                normal: {
	                    show: false,
	                    position: 'center'
	                },
	                emphasis: {
	                    show: false,
	                    textStyle: {
	                        fontSize: '30',
	                        fontWeight: 'bold'
	                    }
	                }
	            },
	            labelLine: {
	                normal: {
	                    show: false
	                }
	            },
	            data:seriesData
	        }
	    ]
	};
	
	myChart7.setOption(option,true);			// 给echarts控件赋值
	//查询数据
	function queryCalculateData(){
		$.ajax({
			type: "post",
			url:webContextRoot+'comMonitor/queryCalculate.action',//请求地址
			data : "consPowerInfoModel.consId=" + consId,// 传递的参数
			dataType:"json",					// 返回的数据格式
			cache : false,
			async : false,						// 同步异步请求
			success: function(result){	
				legendData = result.X_NAME;		// 测点名称
				seriesData = result.X_DATA;		// 测点数量
				X_COUNT = result.X_SUM;			// 总计
			}
		});
	}
}

/********************************************************修改尖峰平谷数据*****************************************************/
function elecTable(){
	var myChart22 = echarts.init(document.getElementById("ydgl-chart")); 
	var fgdlQueryType = $('#selectType').combobox('getValue');
	if(fgdlQueryType == 'M'){
		fgdlEDate = $('#startMonthDate').val() + '-01';
		
	}else if(fgdlQueryType == 'Y'){
		fgdlEDate = $('#startYearDate').val() + '-01-01';
	}
	myChart22.showLoading({
		text:'正在努力的读取数据中...',
		effect:'spin'
	});
	$.post(webContextRoot +'powerLoadAnalyze/queryConsDLPowerInfo.action',{
    	'consPowerInfoModel.consId': consId,		// 用户ID
        'consPowerInfoModel.startDate':fgdlEDate,	// 开始时间
        'consPowerInfoModel.endDate':fgdlEDate,		// 结束时间
        'consPowerInfoModel.queryType': fgdlQueryType// 选择的时间类型
     },
     function(data){
    	 // 柱状图饼状图切换
    	 if(barOrPie == true){//柱状图
    		 queryFgdlEchart(data.consMap,queryConsName + "峰谷电量");
        	 myChart22.hideLoading();					// 隐藏正在加载
    	 }else if(barOrPie == false){
    		 getPieData(data.consMap,queryConsName + "电量饼图");
        	 myChart22.hideLoading();					// 隐藏正在加载
    	 }
    	 queryData(data.consMap);					// 峰谷表格
     },'json');
}

//饼状图事件
function getPieData(dataMap,title){
	 var myChart22 = echarts.init(document.getElementById("ydgl-chart")); 
	 var X_COUNT = 0;
	 // 峰电量
	 var powerFList = [];
	 var powerFValue = dataMap.powerFValue;
	 for(var x = 0;x< powerFValue.length;x++){
		 // 过滤掉不是数字的
		 if(powerFValue[x] == '-'){
			 continue;
		 }
		 // 添加到集合
		 powerFList.push(Math.round(powerFValue[x]));
	 }
	 var feng = '';
	 // 判断集合是不是空 因为会出现没数据的情况
	 if(powerFList.length > 0){
		 // 集合求和
		 feng = eval(powerFList.join('+'));
	 }else{
		 feng = '0';
	 }
	 
	 // 平电量
	 var powerPList = [];
	 var powerPValue = dataMap.powerPValue;
	 for(var y = 0;y< powerFValue.length;y++){
		 // 过滤掉不是数字的
		 if(powerPValue[y] == '-'){
			 continue;
		 }
		 // 添加到集合
		 powerPList.push(Math.round(powerPValue[y]));
	 }
	 var ping = '';
	 // 判断集合是不是空 因为会出现没数据的情况
	 if(powerPList.length > 0){
		// 集合求和
		 ping = eval(powerPList.join('+'));
	 }else{
		 ping = '0';
	 }
	 
	// 谷电量
	 var powerGList = [];
	 var powerGValue = dataMap.powerGValue;
	 for(var z = 0;z< powerGValue.length;z++){
		 // 过滤掉不是数字的
		 if(powerGValue[z] == '-'){
			 continue;
		 }
		 // 添加到集合
		 powerGList.push(Math.round(powerGValue[z]));
	 }
	 var gu = '';
	 // 判断集合是不是空 因为会出现没数据的情况
	 if(powerGList.length > 0){
		// 集合求和
		 gu = eval(powerGList.join('+'));
	 }else{
		 gu = '0';
	 }	 
	 
	 var option = {
	    title : {
	        text: title,
	        x:'center'
	    },
	    tooltip : {
	        trigger: 'item',
	        formatter: "{a} <br/>{b} : {c} ({d}%)"
	    },
	    legend: {
	        x : 'center',
	        y : 'bottom',
	        data: ['峰','平','谷']
	    },
	    series : [
	        {
	            name: '电量占比',
	            type: 'pie',
	            radius : '55%',
	            center: ['50%', '60%'],
	            data:[
	                {value:feng, name:'峰'},
	                {value:ping, name:'平'},
	                {value:gu, name:'谷'},
	               
	            ],
	            itemStyle: {
	                emphasis: {
	                    shadowBlur: 10,
	                    shadowOffsetX: 0,
	                    shadowColor: 'rgba(0, 0, 0, 0.5)'
	                }
	            }
	        }
	    ]
	}
	// 四舍五入 Math.round(dataNameResult2)
	myChart22.setOption(option,true);	// 为echarst控件赋值
	// 加载数据的方法
	function loadyhfbPieDayData(){
		var startDate =  $("#startYearDate").val();
		$.ajax({
			type: "post",
			url:webContextRoot+'comMonitor/queryPieDay.action',//请求地址
			data:"clientViewModel.consId="+consId+"&clientViewModel.dataData="+startDate,//得到用户iD+时间
			dataType:"json",			// 返回类型
			cache : false,
			async : false,				// 同步异步请求
			success: function(result){	
				//得到结果集 赋值给echarts控件
				X_COUNT = result.X_COUNT;
				dataNameResult1 = result.X_DATA_RESULT1;
				dataNameResult2 = result.X_DATA_RESULT2;
				dataNameResult3 = result.X_DATA_RESULT3;
				dataNameResult4 = result.X_DATA_RESULT4;
			}
		});
	}
	 //pie图查询后台数据
	function loadyhfbPieData(){
		var startDate =  $("#startMonthDate").val();
		$.ajax({
			type: "post",
			url:webContextRoot+'comMonitor/queryPie.action',//请求地址
			data:"clientViewModel.consId="+consId+"&clientViewModel.dataData="+startDate,//得到用户iD+时间
			dataType:"json",			// 返回类型
			cache : false,
			async : false,				// 同步异步请求
			success: function(result){	
				//得到结果集 赋值给echarts控件
				X_COUNT = result.X_COUNT;
				dataNameResult1 = result.X_DATA_RESULT1;
				dataNameResult2 = result.X_DATA_RESULT2;
				dataNameResult3 = result.X_DATA_RESULT3;
				dataNameResult4 = result.X_DATA_RESULT4;
			}
		});
	}
}

/**
 * 峰谷电量 图表
 */
function queryFgdlEchart(dataMap,title){
	var myChart22 = echarts.init(document.getElementById("ydgl-chart")); 
	 
	var fgdlQueryType = $('#selectType').combobox('getValue');
	if(fgdlQueryType == 'M'){
		fgdlEDate = $('#startMonthDate').val();
		
	}else if(fgdlQueryType == 'Y'){
		fgdlEDate = $('#startYearDate').val();
	}
	option = {
			 title: {
			        text: title, 
			        x:'center'
			},
			tooltip: {
		        trigger: 'axis',
	        	formatter : function(params, ticket, callback) {
	        		var res = '';
	        		if(params == null ||params[0] == null){
						return;
					}
					for(var i =0;i<params.length;i++){
						if (i == 0) {
							res = fgdlEDate + '-' + params[i].name + '<br/>';
						}
						res += params[i].seriesName + ' : ';
						if (params[i].seriesName.indexOf('峰电量') >= 0) {
							res += params[i].value + 'kWh<br/>'
						} else if (params[i].seriesName.indexOf('平电量') >= 0) {
							res += params[i].value + 'kWh</br>'
						} else if (params[i].seriesName.indexOf('谷电量') >= 0) {
							res += params[i].value + 'kWh</br>'
						} else if (params[i].seriesName.indexOf('峰谷比') >= 0) {
							res += params[i].value + '%</br>'
						}
					}
					return res;
				}
		    },
		    legend: {
		        data: ['峰电量', '平电量','谷电量','峰谷比'],
		        x:'center',
		        y:'35'
		    },
	 	   grid : {									// 设置grid位置
	 			 x : 45, 							// 左边距离
	 			 y : 65,							// 上边距离
	 			 x2 : 30,							// 右边距离
	 			 y2 : 35							// 下边距离
	 		},
		    xAxis:  {
		        type: 'category',
		        data : dataMap.dataDate//
		        
		    },
		    yAxis: [
		        {
		            name: '单位(kWh)',
		            type: 'value',
		        },
		        {
		            name: '峰谷比',
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
			     },
		    ],
		    series: [
		        {
		            name: '峰电量',
		            type: 'bar',
		            stack: '总量',
		            data : dataMap.powerFValue,
		            itemStyle:{
		            	normal:{
		            	color:'#FF6E63'
		            	}
		            }
		        },
		        {
		            name: '平电量',
		            type: 'bar',
		            stack: '总量',
		            data : dataMap.powerPValue,
		            itemStyle:{
		            	normal:{
		            	color:'#FED800'
		            	}
		            }
		        },
		        {
		            name: '谷电量',
		            type: 'bar',
		            stack: '总量',
		            data : dataMap.powerGValue,
		            itemStyle:{
		            	normal:{
		            	color:'#6490FF'
		            	}
		            }
		        },
		        {
		            name: '峰谷比',
		            type:'line',
		            yAxisIndex:1,
		            data : dataMap.fgbList
		        }
		        
		    ]
		};

		myChart22.setOption(option,true);
		myChart22.resize();
}

/**
 * 峰谷电量 数据列表
 * 
 */
function queryData(dataMap){
	var gridCommon = [];
	if(dataType == 'M'){
		gridCommon = [[
		   	 		{field:'shiduan',title:'时段',width: 100,align:'center'},
		   	 		{field:'benyue',title:'本月(kWh)',width: 100,align:'center'},
		   	 		{field:'shangyue',title:'上月(kWh)',width: 100,align:'center'},
		   	 		{field:'qntq',title:'去年同期(kWh)',width: 100,align:'center'},
		   	 		{field:'tongbi',title:'同比(%)',width: 100,align:'center'},
		   	 		{field:'huanbi',title:'环比(%)',width: 100,align:'center'}
		    		]];
	}else if(dataType == 'Y'){
		gridCommon = [[
         	 		{field:'shiduan',title:'时段',width: 100,align:'center'},
         	 		{field:'benyue',title:'本年(kWh)',width: 100,align:'center'},
         	 		{field:'shangyue',title:'去年(kWh)',width: 100,align:'center'},
         	 		{field:'qntq',title:'--',width: 100,align:'center'},
         	 		{field:'tongbi',title:'--',width: 100,align:'center'},
         	 		{field:'huanbi',title:'环比(%)',width: 100,align:'center'}
	          		]];
	}
		  
	$('#fgdlData').datagrid({			// 表格
		title:'峰谷电量',
		nowrap : false,					// 设置为true，当数据长度超出列宽时将会自动截取。
		striped : true,					// 设置为true将交替显示行背景。
		border:false,
		width:'100%',
	    height:'100%',
		fitColumns : true,				// 自动适应宽度
		singleSelect : true,			// 设置为true将只允许选择一行。
		rownumbers : false,				// 设置为true将显示行数。
		data : dataMap.consList,
		loadMsg : "正在努力的读取数据中...",// 提示信息
		columns : gridCommon,			// 字段
		loadFilter: function(data){
			if (data.sMap){
				return data.sMap;
			} else {
				return data;
			}
		},
		rowStyler : function(index,row){//隐藏尖的那一列
			if(row.dataDate == '05'){
				return 'display:none';
			}
		}
	});
}

/*******************************************2017-05-02 修改功率因数曲线图**********************************************/
//功率因数曲线图
function getData(){
	myChart4 = echarts.init(document.getElementById("ssdl-chart"));
	var startDay2 = $('#findMonth').val();
	myChart4.showLoading({
		text:'正在努力的读取数据中...',
		effect:'spin'
	});
	
	// 查询功率因数 默认0.9
	$.ajax({
		type: "post",
		url:webContextRoot + 'powerFactorAnalyze/queryPowerValue.action',//请求地址
		data: "sfdConsModel.consId=" + consId,//得到时间+用户ID
		dataType:"json",		// 返回类型
		cache : false,
		async : false,			// 同步异步请求
		success: function(result){
			userCheckCos = [];
			if(result.length > 0){
				userCheckCos.push(result[0].userCheckCos);
			}else{
				userCheckCos.push("0.9");
			}
		}
	});
	
	$.getJSON(webContextRoot + 'powerFactorAnalyze/queryglysValue.action', 
		{ 
			'classesEnergyModel.beginData': startDay2,		// 开始时间
			'classesEnergyModel.consId': consId,				// 统计类型
			'classesEnergyModel.groupDateType': 'yyyy-MM-dd' // 统计类型  按年，月，日统计分析
		},
		function(json){
			var temp = '';
			var date = '';
			var by = '';
			var startDate =  $('#findMonth').val();
			if(json.sMap.crL==0){//当月功率因数不存在数据
				temp = startDate+'月无功率因数数据。';
			}
			
			if(json.sMap.preCrCount>0){ //当月超容
				// 平均功率因数比当前值大
				if(json.sMap.avglastCrplate > userCheckCos){
					temp = startDate+'月平均功率因数值为:'+json.sMap.avglastCrplate+',以考核标准' + userCheckCos + '为例，属于正常范围。';
					by = '有'+json.sMap.preCrCount+'天低于预警值。';
				}else{
					temp = startDate+'月平均功率因数值为:'+json.sMap.avglastCrplate+',以考核标准' + userCheckCos + '为例，低于考核标准。';
					by = '有'+json.sMap.preCrCount+'天低于预警值。';
				}
			}
			if(json.sMap.preCrCount==0&&json.sMap.crL>0){
				temp = startDate+'月平均功率因数值为:'+json.sMap.avglastCrplate+',以考核标准' + userCheckCos + '为例，属于正常范围。';
			}
			var desc = '';//上期本期增长情况
			var consNoObj = document.getElementById('glysValue');
			if(json.sMap.avgPlateHH>0){
				if(json.sMap.avglastCrplate>0){
					desc = '较上月平均功率因数有所上升。';
				}
			}
			if(json.sMap.avgPlateHH<0){
				if(json.sMap.avglastCrplate>0){
					desc = '较上月平均功率因数有所下降。';
				}
			}
			if(json.sMap.avgPlateHH=0){
				if(json.sMap.avglastCrplate>0){
					desc = '两月平均功率因数持平。';
				}
			}
			consNoObj.innerHTML =temp+ desc+by;
			getpowerCountData(json,userCheckCos);
		    myChart4.hideLoading();
		}
	);
}

//echarts曲线图
function getpowerCountData(dataMap,userCheckCos){
	var series = [];//图标曲线集
	var legend = [];
	var startDate =  $('#findMonth').val()+'月';	// 开始日期
	var lastDate = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('m',-1,DateUtil.strToDate(startDate)));//月份加1
    var lastNewDate = lastDate.substr(0,7)+'月';	// 重新赋值
	series.push( {
        name: startDate+'功率因数',
        type: 'line',
        data:dataMap.sMap.glysData					// 数据,
    } );
	series.push( {
        name:lastNewDate+'功率因数',
        type: 'line',
        data:dataMap.sMap.glysLastData				// 上期数据,
    } );
	series.push({
        name:'基准值',
        type:'line',
        data:userCheckCos,
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
			        type: 'average',
			        label:{normal:{formatter:'{c}'}}
			   }
            ]
        }
    });
	legend.push(startDate+'功率因数');
	legend.push(lastNewDate+'功率因数');
	var option = {
	    title: {
	    	 text: queryConsName+'功率因数',
	        y: '0px',
	        left: 'center'
	    },
	    
	    tooltip: {
	    	trigger: 'axis',
	    	formatter: function(params) {
	    		if(params!=null && params[0]!=null){
	    			var paramResult = '';
	    			for (var i = 0; i < params.length; i++) {
	    				if(params[i].seriesIndex == 0){
	    					// 功率因数
	    					var data = null;
	    					if(typeof params[i].value == 'undefined'){
								data = '-';
							}else{
								data = params[i].value;
							}		
		    				paramResult = params[i].seriesName.substring(0,7) + '-' + params[i].name +' ';
							paramResult +=  '功率因数 : ' + data + '<br/>';
		    			}else if(params[i].seriesIndex == 1){
		    				
		    				// 功率因数
	    					var data3 = null;
	    					if(typeof params[i].value == 'undefined'){
								data3 = '-';
							}else{
								data3 = params[i].value;
							}
		    				paramResult +=  params[i].seriesName.substring(0,7) + '-' + params[i].name +' ';
							paramResult += '功率因数 : '  + data3 + '<br/>';
		    			}
	    			}
					return paramResult;
	    		}
	    	}
	    },
	    
	    toolbox:{
	    	show:true,
	    	feature:{
	    		dataZoom:{},
	    		magicType:{type:['line','bar']},
	    		restore:{},
	    		saveAsImage:{}
	    	}
	    },
	    legend: {
	        left: 'center',
	        data: legend,
	        shown:false,
	        y:'25'
		    },
 		grid : {
			 x : 45, 					// 左边距离
			 y : 65,					// 上边距离
			 x2 : 30,					// 右边距离
			 y2 : 55					// 下边距离
		},
	    xAxis: {
	    	  type: 'category',
	          boundaryGap: false,
	          data:dataMap.sMap.categes
	          },
	    yAxis: {
	          name: '',
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
	            },
	            min:'0.6',
	            max:'1'
	    },
	    series: series
	};
	myChart4.setOption(option,true);
}


/**
 * 打开线路能耗预览
 */
function openXlnhWindow() {
	var url = '';
	if(top.areaNo == '101'){
		url = webContextRoot + '/pages/despages/projectManage/dailyEnergyReport.jsp?consId='+consId+'&consName='+consName;
	}else{
		url = webContextRoot + '/pages/despages/projectManage/xlnh.jsp?consId='+consId+'&consName='+consName;
	}	
	OpenWinUnRes(url, '',screen.availWidth - 300,screen.availHeight - 260);
}
