/**
 * 电量电费概况
 * @author zhou_qiang
 * @since 2017-04-23
 */
var dataDate = new Date();//当前结束时间  为当前时间
var mon = DateUtil.dateToStr('MM',DateUtil.dateAdd('m',-1,dataDate));
var yearUp = DateUtil.dateToStr('yyyy',DateUtil.dateAdd('y',-1,dataDate));
var dffxChart = '';//电费分析
var dlfxChart = '';//电量分析
var tabo = 'fzjc';
var fzFlag = false;
var wdFlag = false;
var tabFlag = 'dlfx';
var content = '';
var queryMap;	// 第二时间数据

$(function(){
	//初始化电量分析echarts控件
	dlfxChart = echarts.init(document.getElementById('dlfxChart'));
	//加载Tab页信息
	$('#tabs').tabs({
	       fit: true,//填充大小
	       plain: true,
	       onSelect: function(title,index){
		    	   if(index == 0){
		    		   //加载电量分析chart
		    		   dlfxChart = echarts.init(document.getElementById('dlfxChart'));
		    		   tabFlag = 'dlfx';
		    		   //查询电量分析
		    		   queryDlfx(consId);
		    	   }else if(index == 1){
		    		   //初始化电费分析
		    		   dffxChart = echarts.init(document.getElementById('dffxChart'));
		    		   tabFlag = 'dffx';
		    		   //查询电费分析
		    		   queryDffx(consId);
		    	   }
	    	  }
		 }); 
	
	// 第一时间日期
	$("#dataDate").val(DateUtil.dateToStr('yyyy',dataDate));
	
	// 第二时间日期
	$("#dataDateUp").val(yearUp);
	
	if(consId==null || consId==''|| consId=="null"){//未获取到企业编码，加载左侧树
//		$('#tree-leftQyTree').tree({ //默认没参数，获取区域  企业  都是打开状态
//			url:webContextRoot +'destree/queryTree.action',
//		    method:'get',
//		    multiple:false,//是否支持多选
//		    editable:'true' ,
//		    onClick: function(node){
//		    	treeNodeType = node.type;
//				if(treeNodeType=='0'){//区域能源节点
//					$("#clickTree").hide();				// 隐藏企业电量电费
//					$("#contentId").show();				// 显示区域电量电费
//					content='<iframe id="funcId" src="'+webContextRoot+'pages/despages/electricQuality/electricOverview.jsp" scrolling="no" frameborder="0" width="100%" height="100%"></iframe>'; 
//					$("#contentId").empty();			// 清空
//					$('#contentId').append(content);	// 填充内容
//				}else if(treeNodeType== '1'){			// 企业节点
//					$("#contentId").hide();				// 隐藏区域电量电费
//					$("#clickTree").show();				// 显示企业电量电费
//					autoResize.call($('#dlfxChart'));	// 隐藏之后不会自适应宽高 需要重新调用一次
//					consId = node.id;
//					consName = node.text;
//					// 查询电量分析
//					var tabs = $("#tabs").tabs('getSelected');//获取实时负荷 实时电量 用电排名TOP选中的tab
//					var index = $("#tabs").tabs('getTabIndex',tabs);//获取实时负荷 实时电量 用电排名TOP的下标值
//					if(index == 0){
//						queryDlfx(consId);
//					}else{
//						queryDffx(consId);
//					}
//					
//				}
//			},
//			onLoadSuccess:function(node, data){//加载成功返回
//				selectTree();//设置树默认选中节点
//			}
//		});
//		//树模糊检索   方法来自  treeSelect.js
//		searchTreeNode();
		
		consSelectMethod = "consSelectMethodLoad()";//定义选中后执行的方法
		consSelectHasRoot = true;//是否有区域能源根节点
		consSelectSearch("",true);
		
	}else{
		//查询电量分析
		queryDlfx(consId);
	}
	
	 //查询事件
	$('#search').click(function(){
		if(tabFlag == 'dffx'){
			//查询电费分析
			queryDffx(null);
		}else if(tabFlag == 'dlfx'){
			//查询电量分析
			queryDlfx(null);
		}
	});
	
});

/**
 * 快搜选中节点  
 */
function consSelectMethodLoad(){
	if(consSelectCon.id.length < 4){	// 区域能源节点
		$("#clickTree").hide();				// 隐藏企业电量电费
		$("#contentId").show();				// 显示区域电量电费
		content='<iframe id="funcId" src="'+webContextRoot+'pages/despages/electricQuality/electricOverview.jsp" scrolling="no" frameborder="0" width="100%" height="100%"></iframe>'; 
		$("#contentId").empty();			// 清空
		$('#contentId').append(content);	// 填充内容
	}else{		// 企业节点
		$("#contentId").hide();				// 隐藏区域电量电费
		$("#clickTree").show();				// 显示企业电量电费
		autoResize.call($('#dlfxChart'));	// 隐藏之后不会自适应宽高 需要重新调用一次
		consId = consSelectCon.id;
		consName = consSelectCon.text;
		// 查询电量分析
		var tabs = $("#tabs").tabs('getSelected');//获取实时负荷 实时电量 用电排名TOP选中的tab
		var index = $("#tabs").tabs('getTabIndex',tabs);//获取实时负荷 实时电量 用电排名TOP的下标值
		if(index == 0){
			queryDlfx(consId);
		}else{
			queryDffx(consId);
		}
	
	}

}

/**
 * 创建电量电费表格
 * @param date
 */
function createDataGrid(date){
	
	// 第一时间日期
	var dataDate = $("#dataDate").val()+"年";
	
	// 第二时间日期
	var dataDateUp = $("#dataDateUp").val()+"年";
	
	$('#dataGrid').datagrid({// 表格
		fit:true,
		width : '100%',
		singleSelect : true,// 设置为true将只允许选择一行。
		nowrap : false,// 设置为true，当数据长度超出列宽时将会自动截取。
		striped : true,// 设置为true将交替显示行背景。
		border:false,
		pagination : false,// 设置true将在数据表格底部显示分页工具栏。
	  	fitColumns : false,// 自动适应宽度
		rownumbers : true,// 设置为true将显示行数。
		onLoadSuccess : function() {// 加载数据之后
			$('#dataGrid').datagrid('selectRow', 0); // 选择第一行
		},
		loadMsg : "正在努力的读取数据中...",// 提示信息
		columns : [[
			{field:'dataDate',title:'月份',rowspan:2,width:'20%',align:'center'},
			{title:dataDate,colspan:2,width:'40%',align:'center'},
			{title:dataDateUp,colspan:2,width:'40$',align:'center'}
			],
			[
				{field:'jnTotalCost',title:'总电费(元)',width:'20%',align:'center'},
				{field:'jnTotalEle',title:'总电量(kWh)',width:'20%',align:'center'},
				{field:'qnTotalCost',title:'总电费(元)',width:'20%',align:'center'},
				{field:'qnTotalEle',title:'总电量(kWh)',width:'20%',align:'center'}
			]
		],//字段
		data : date
	})
}

/**
 * 加载客户信息
 * @param dataMap
 */
function loadTotal(dataMap){
	  //本年电量
	  var bndl = document.getElementById('bndl');
	  var dyStr = "";
	  var jnTotalEle = dataMap.jnTotalEle == null ? '-' : dataMap.jnTotalEle;
	  bndl.innerHTML = dyStr+jnTotalEle;
	  $("#thisDianliang").text($("#dataDate").val() + "年电量(kWh):");
	  $('#bndl').attr("title",jnTotalEle);
	  
	  //上年电量
	  var sydl = document.getElementById('sydl');
	  var syStr = "";
	  var qnTotalEle = dataMap.qnTotalEle == null ? '-' : dataMap.jnTotalEle;
	  sydl.innerHTML = syStr+qnTotalEle;
	  $("#upDianliang").text($("#dataDateUp").val() + "年电量(kWh):");
	  $('#sydl').attr("title",qnTotalEle);

	  // 2017-07-06 修改 增长率
	  var totalEle = dataMap.jnTotalEle;			// 第一时间总电费
	  var totalEleUp = dataMap.qnTotalEle;		// 第二时间总电费
	  // 电量环比
	  var dlhbValue = '-';			
	  // 第一时间的值为 - 赋值为0方便计算增长率
	  if(totalEle === '-'){
		  totalEle = 0;
	  }
	  // 第二时间为空 增长率不计算  (本期-前期)/前期 * 100
	  if(totalEleUp === '-'){
		  totalEleUp = 0;
		  hbEle = '-';
	  }
	  // 计算电量环比 保留两位小数
	  if(totalEleUp != 0){
		  dlhbValue = parseFloat(((totalEle-totalEleUp)/totalEleUp*100).toFixed(2));
	  }
	  
	  //电量环比
	  var dlhb = document.getElementById('dlhb');
	  var dlhbStr = "";
	  var hbEle = dataMap.hbEle == null ? '-' : dataMap.hbEle;
	  dlhb.innerHTML = dlhbStr+dlhbValue;
	  $('#dlhb').attr("title",dlhbValue);

	  //本年电费
	  var bndf = document.getElementById('bndf');
	  var dydfStr = "";
	  var jnTotalCost = dataMap.jnTotalCost == null ? '-' : dataMap.jnTotalCost;
	  bndf.innerHTML = dydfStr+jnTotalCost;
	  // 第一时间电费
	  $('#thisDianfei').text($("#dataDate").val() + "年电费(元)：");
	  $('#bndf').attr("title",jnTotalCost);
	  
	  //上年电费
	  var sydf = document.getElementById('sydf');
	  var sydfStr = "";
	  var qnTotalCost = dataMap.qnTotalCost == null ? '-' : dataMap.qnTotalCost;
	  sydf.innerHTML = sydfStr+qnTotalCost;
	  // 第二时间电费
	  $('#upDianfei').text($("#dataDateUp").val() + "年电费(元)：");
	  $('#sydf').attr("title",qnTotalCost);
	  
	  // 2017-07-06修改增长率
	  var totalCost = dataMap.jnTotalCost;			// 第一时间总电费
	  var totalCostUp = dataMap.qnTotalCost;		// 第二时间总电费
	  // 电量环比
	  var dfhbValue = '-';			
	  // 第一时间的值为 - 赋值为0方便计算增长率
	  if(totalCost === '-'){
		  totalCost = 0;
	  }
	  // 第二时间为空 增长率不计算  (本期-前期)/前期 * 100
	  if(totalCostUp === '-'){
		  totalCostUp = 0;
	  }
	  // 计算电量环比 保留两位小数
	  if(totalCostUp != 0){
		  dfhbValue = parseFloat(((totalCost-totalCostUp)/totalCostUp*100).toFixed(2));
	  }
	  
	  //电费环比
	  var dfhb = document.getElementById('dfhb');
	  var dfhbStr = "";
	  var hbCost = dataMap.hbCost == null ? '-' : dataMap.hbCost;
	  dfhb.innerHTML = dfhbStr+dfhbValue;
	  $('#dfhb').attr("title",dfhbValue);
	  
	  //账户余额
	  var zhye = document.getElementById("zhye");
	  var yueList = dataMap.thisYueList;
	  if(yueList.length > 0){
		  $('#zhye').html(yueList[0].ELEC_FEE_MON);
	  }else{
		  $('#zhye').html("0");
	  }
	  
	  //上月电量
	  var dydl = document.getElementById("dydl");
	  var dydlStr = "";
	  var dydlValue = dataMap.dydl == null ? '-' : dataMap.dydl;
	  dydl.innerHTML = dydlStr + dydlValue;
	  $('#dydl').attr("title",dydlValue);
	  
	  //上月电费
	  var dydf = document.getElementById("dydf");
	  var dydfStr = "";
	  var dydfValue = dataMap.dydf == null ? '-' : dataMap.dydf;
	  dydf.innerHTML = dydfStr + dydfValue;
	  $('#dydf').attr("title",dydfValue);
	  
}

/**
 * 电费分析
 */
function queryDffx(tranId){
	queryTable();
	var node = $('#tree-leftQyTree').tree('getSelected');//获取企业节点
	var b = $('#dataDate').val();
	var dateUp = $('#dataDateUp').val();
	dffxChart.showLoading({
		text:'正在努力的读取数据中...',
		effect:'spin'
	});
	
	// 第二时间查询数据
//	$.ajax({
//		type: "post",
//		url:webContextRoot + 'powerChargeView/queryConsEleAndCostInfo.action',//请求地址
//		data: "consPowerInfoModel.consId=" + consId + "&consPowerInfoModel.dataDate=" + dateUp + "&consPowerInfoModel.mon="+mon+"&consPowerInfoModel.isFlag=isTwoRequest",//得到时间+用户ID
//		dataType:"json",		// 返回类型
//		cache : false,
//		async : false,			// 同步异步请求
//		success: function(result){
//			queryMap = result;
//		}
//	});
	
	$.post(webContextRoot +'powerChargeView/queryConsEleAndCostInfo.action',{
    	'consPowerInfoModel.consId': consId,
        'consPowerInfoModel.dataDate': b,
        'consPowerInfoModel.startTime': dateUp,
        'consPowerInfoModel.mon': mon
     },
     function(data){
    	//加载echart数据
		queryDffxEchart(data.consMap,consName,b,dateUp);
		//加载echart数据
		dffxChart.hideLoading();
		
		loadTotal(data.consMap);
     },'json');
}

/**
 * 查询数据表格 
 */
function queryTable(){
	var startDate = $('#dataDate').val();
	// 第二时间
	var endDate = $('#dataDateUp').val();
	// startDate 为第一时间 endDate 为第二时间
	$.ajax({
		type: "post",
		url:webContextRoot + 'powerChargeView/queryConsInfoByTable.action',//请求地址
		data: "consPowerInfoModel.consId=" + consId + "&consPowerInfoModel.startDate=" + startDate + "&consPowerInfoModel.endDate=" + endDate,//得到时间+用户ID
		dataType:"json",		// 返回类型
		cache : false,
		async : false,			// 同步异步请求
		success: function(result){
			createDataGrid(result.consMap.consList); // 加载表格
		}
	});
}

/**
 * 电费分析 图表
 */
function queryDffxEchart(dataMap,title,year,dateUp){//function(dataMap, aChartTop) 
	option = {
		    title: {
		        text: title, 
		        x:'center'
		    },
		    tooltip : {
				trigger: 'axis', // tip 类型
				formatter : function(params, ticket, callback) {
					var res = '';
	        		if(params == null ||params[0] == null){
						return;
					}
					for(var i =0;i<params.length;i++){
						if(i==0){
			            	res += '时间：' +params[i].seriesName.split(' ')[0]+'-'+params[i].name+' 电费：'+ params[i].value+'元' + '<br/>';
						}
						if(i==1){
							res += '时间：' +params[i].seriesName.split(' ')[0]+'-'+params[i].name+' 电费：'+ params[i].value+'元' + '<br/>';
						}
					}
					return res;
				}
			},
		    legend: {
		        data: [year+' 年电费',dateUp+' 年电费'],
		        x:'center',
		        y:'35'
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
		    grid: {
		        left: '3%',
		        right: '4%',
		        bottom: '3%',
		        containLabel: true
		    },
		    xAxis: {
		        type: 'category',
		        boundaryGap: false,
		        data : dataMap.dataDate
		    },
		    yAxis: [{
	            name: '单位(元)',
	            type: 'value',
	        }], 
		    series: [
		        {
		            name: year+' 年电费',
		            type:'line',
		            data : dataMap.jnTotalCostList
		        },
		        {
		            name: dateUp+' 年电费',
		            type:'line',
		            data : dataMap.qnTotalCostList
		        }
		    ]
		};

		dffxChart.setOption(option,true);
		userResize();
}

/**
 * 电量
 */
function queryDlfx(tranId){
  	queryTable();
	var node = $('#tree-leftQyTree').tree('getSelected');//获取企业节点
	var b = $('#dataDate').val();
	// 第二时间
	var dateUp = $('#dataDateUp').val();
	
	dlfxChart.showLoading({
		text:'正在努力的读取数据中...',
		effect:'spin'
	});
	
	// dataDate 第一时间 startTime第二时间
    $.post(webContextRoot +'powerChargeView/queryConsEleAndCostInfo.action',{
    	'consPowerInfoModel.consId': consId,
        'consPowerInfoModel.dataDate': b,
        'consPowerInfoModel.startTime': dateUp,
        'consPowerInfoModel.mon': mon
     },
     function(data){
    	//加载echart数据
		queryDlfxEchart(data.consMap,consName,b,dateUp);
	  	dlfxChart.hideLoading();
		
		loadTotal(data.consMap);
	  	 
     },'json');
}

/**
 * 电量分析 图表
 */
function queryDlfxEchart(dataMap,title,year,dateUp){
//	var queryDate = $('#dataDateUp').val();

	option = {
		    title: {
		        text: title, 
		        x:'center'
		    },
		    tooltip : {
				trigger: 'axis', // tip 类型
				formatter : function(params, ticket, callback) {
            		var res = '';
	        		if(params == null ||params[0] == null){
						return;
					}
					for(var i =0;i<params.length;i++){
						if(i==0){
			            	res += '时间：' +params[i].seriesName.split(' ')[0]+'-'+params[i].name+' 电量：'+ params[i].value+'kWh' + '<br/>';
						}
						if(i==1){
							res += '时间：' +params[i].seriesName.split(' ')[0]+'-'+params[i].name+' 电量：'+ params[i].value+'kWh' + '<br/>';
						}
					}
					return res;
				}
			},
		    legend: {
		        data: [year+' 年电量',dateUp +' 年电量'],
		        x:'center',
		        y:'35'
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
		    grid: {
		        left: '3%',
		        right: '4%',
		        bottom: '3%',
		        containLabel: true
		    },
		    xAxis: {
		        type: 'category',
		        data :dataMap.dataDate 
		    },
		    yAxis: [{
	            name: '单位(kWh)',
	            type: 'value',
	        }], 
		    series: [
		        {
		            name: year+' 年电量',
		            type:'bar',
		            data : dataMap.jnTotalEleList
		        },
		        {
		            name: dateUp+' 年电量',
		            type:'bar',
		            data : dataMap.qnTotalEleList
		        }
		    ]
		};

		dlfxChart.setOption(option,true);
		userResize();
}
    
/**
 * 日期切换
 * @param dateTime
 */
function qytQueryOveride(dateTime){
	var date = $('#dataDate').val();
	var resultDay = timeUtil(dateTime,date);
	$('#dataDate').val(resultDay);
	
	var node = $('#tree-leftQyTree').tree('getSelected');//获取企业节点
	if(tabFlag == 'dffx'){
		queryDffx(null);
	}else if(tabFlag == 'dlfx'){
		queryDlfx(null);
	}
}

/**
 * 日期切换
 * @param dateTime
 */
function qytQueryOverideUp(dateTime){
	var date = $('#dataDateUp').val();
	var resultDay = timeUtil(dateTime,date);
	$('#dataDateUp').val(resultDay);
	
	var node = $('#tree-leftQyTree').tree('getSelected');//获取企业节点
	if(tabFlag == 'dffx'){
		queryDffx(null);
	}else if(tabFlag == 'dlfx'){
		queryDlfx(null);
	}
}

/**
 * 日期转换
 * @param dateTime
 * @param startDay
 * @returns {___anonymous13116_13124}
 */
function timeUtil(dateTime,startDay){
	var resultStr = "";
	if(dateTime == '1'){
		resultStr = parseInt(startDay) + 1;
	}else if(dateTime == '-1'){
		resultStr = parseInt(startDay) - 1;
	}
	return resultStr;
}

/**
 * 树查询
 * @param nodeId
 */
function selectTree(nodeId){
	$('#tree-leftQyTree li:eq(0)').find('div').addClass("tree-node-selected");//添加选中样式
	var n = $('#tree-leftQyTree').tree('getSelected');//获取被选中的节点
	if(n!=null)//判断节点是否存在
	{
		$('#tree-leftQyTree').tree('select',n.target);
	}
	
	var chiNode = $('#tree-leftQyTree').tree('getChildren',n.target);//子节点
	for(var i=0 ; i < chiNode.length ; i++)//循环节点
    {
		// 第一次加载区域节点
		if(typeof nodeId == 'undefined'){		
			
			$("#clickTree").hide();								// 隐藏企业电量电费
			$("#contentId").show();								// 显示区域电量电费
			content='<iframe id="funcId" src="'+webContextRoot+'pages/despages/electricQuality/electricOverview.jsp" scrolling="no" frameborder="0" width="100%" height="100%"></iframe>'; 
			$("#contentId").empty();							// 清空
			$('#contentId').append(content);					// 填充内容
			
		}else{
			if(nodeId!=null?chiNode[i].id==nodeId:chiNode[i].type==1)//查找定位
			 {
				var n = $('#tree-leftQyTree').tree("find",chiNode[i].id);//根据id获取节点
	       	   	$('#tree-leftQyTree').tree('select',n.target);//选中节点
	       	    $('#tree-leftQyTree').tree('scrollTo',n.target);//滚动到节点
	       	    consId = chiNode[i].id;
	       	    consName = chiNode[i].text;
	       	    //查询电量分析
	       	    queryDlfx(consId);
	       	   	break;//跳出循环
			 }
		}
		
		 
    }
}


