/**
 * 客户对标分析
 */
var currentDate = new Date();//当前日期
var fhChart = null;//负荷echart对象
var dlChart = null;//电量echart对象
var allCons = null;//存放选中的客户ID
var allConsName = new Array();//存放选中的客户名称  峰谷电量用
$(function(){
	//初始化echart
	fhChart = echarts.init(document.getElementById('fhChart'));
	dlChart = echarts.init(document.getElementById('dlChart'));
	//日期初始化
	
	$('#startDateD').val(DateUtil.dateToStr('yyyy-MM-dd',currentDate));
	$('#startDateM').val(DateUtil.dateToStr('yyyy-MM',currentDate));
//	$('#startDateY').val(DateUtil.dateToStr('yyyy',currentDate));
	
	if(consId==null || consId==''|| consId=="null"){//未获取到企业编码，加载左侧树
		$('#tt').tree({ //默认没参数，获取区域  企业  都是打开状态
			url:webContextRoot +'destree/queryTree.action',
		    method:'get',
		    checkbox:true,
		    multiple:true,//是否支持多选
			onLoadSuccess:function(node, data){//加载成功返回
				selectTree();//设置树默认选中节点
			},
			onBeforeCheck:function(node, checked){
				allCons = $('#tt').tree('getChecked');	// get checked nodes
				if(!checked && allCons.length ==  1){
	    			$.messager.alert('提示', "至少选择一个", 'warning');
	    			return false;
		    	}else if(checked && allCons.length > 2){
	    			$.messager.alert('提示', "不能大于3个企业", 'warning');
//	    			var n = $('#tt').tree("find",node.id);//根据id获取节点
//	          	   	$('#tt').tree('uncheck',n.target);//选中节点
	    			return false;
	    		}
				return true;
			},
			onCheck:function(node) {
				allCons = $('#tt').tree('getChecked');	// get checked nodes
				if(allCons.length ==  0){
	    			$.messager.alert('提示', "至少选择一个", 'warning');
	    			return;
		    	}else if(allCons.length > 6){
	    			$.messager.alert('提示', "不能大于6个企业", 'warning');
	    			var n = $('#tt').tree("find",node.id);//根据id获取节点
	          	   	$('#tt').tree('uncheck',n.target);//选中节点
	    			return;
	    		}
//				console.log(allCons);
//				queryFgdl();		
				//加载echart图
				getChart();
			}
		});
		//树模糊检索   方法来自  treeSelect.js cc.switchbutton('uncheck'); onUncheck
		searchTreeNode();
	}else{
		//加载echart图
		getChart();
	}
	
	//左减日期 
	$('#left').click(function(){
		var startDate = null;
		if(!$("#startDateD").is(":hidden")){//日
			startDate = $("#startDateD").val();
			$("#startDateD").val(DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('d',-1,new Date(startDate))));
		}else if(!$("#startDateM").is(":hidden")){//月
			startDate = $("#startDateM").val();
			$("#startDateM").val(DateUtil.dateToStr('yyyy-MM',DateUtil.dateAdd('m',-1,new Date(startDate))));
		}
		//加载echart图
		getChart();
	});
	
	//右加日期
	$('#right').click(function(){
		var startDate = null;
		if(!$("#startDateD").is(":hidden")){//日
			startDate = $("#startDateD").val();
			$("#startDateD").val(DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('d',1,new Date(startDate))));
		}else if(!$("#startDateM").is(":hidden")){//月
			startDate = $("#startDateM").val();
			$("#startDateM").val(DateUtil.dateToStr('yyyy-MM',DateUtil.dateAdd('m',1,new Date(startDate))));
		}
		//加载echart图
		getChart();
	});
	
	//查询时间类型
	$("#queryType").combobox({
		onSelect:function(data){
//			console.log(data);
			if(data.value=='D'){
				$('#startDateD').show();
				$('#startDateM').hide();
			}else if(data.value=='M'){
				$('#startDateD').hide();
				$('#startDateM').show();
			}
		}
	});
	
	//tab页
	$("#tb1").tabs({
		onSelect:function(title,index){
			if(index == 0){//负荷
				if($("#mytab-fh .active").attr("id")=='fhlTab'){
					//负荷率  时间设为月曲线
					$("#queryType").combobox("setValue","M");
					//时间设隐藏
					$("#queryType").parent().hide();
				}else if($("#mytab-fh .active").attr("id")=='fzlTab'){
					//负荷率  时间设为月曲线
					$("#queryType").combobox("setValue","M");
					//时间设隐藏
					$("#queryType").parent().hide();
				}else{
					$("#queryType").parent().show();
				}
			}else{//电量
				if($("#mytab-dl .active").attr("id")=='fgdlTab'){
					//负荷率  时间设为月曲线
					$("#queryType").combobox("setValue","M");
					//时间设隐藏
					$("#queryType").parent().hide();
				}else{
					$("#queryType").parent().show();
				}
			}
			//加载echart图
			getChart();
		}
	});
	
	//二级标题事件
	$(".tab-panel li").click(function(){
//		console.log($($(this).parent()).attr("id"));
		if($($(this).parent()).attr("id")=='mytab-fh'){//负荷二级标题
			$("#mytab-fh .active").removeClass("active");
			$(this).addClass("active");
			if($(this).attr("id")=='fhlTab'){
				//负荷率  时间设为月曲线
				$("#queryType").combobox("setValue","M");
				//时间设隐藏
				$("#queryType").parent().hide();
			}else if($(this).attr("id")=='fzlTab'){
				//负荷率  时间设为月曲线
				$("#queryType").combobox("setValue","M");
				//时间设隐藏
				$("#queryType").parent().hide();
			}else{
				$("#queryType").parent().show();
			}
			//加载echart图
			getChart();
		}else if($($(this).parent()).attr("id")=='mytab-dl'){//电量二级标题
			$("#mytab-dl .active").removeClass("active");
			$(this).addClass("active");
			if($(this).attr("id")=='fgdlTab'){
				//负荷率  时间设为月曲线
				$("#queryType").combobox("setValue","M");
				//时间设隐藏
				$("#queryType").parent().hide();
			}else{
				$("#queryType").parent().show();
			}
			//加载echart图
			getChart();
		}
	});
	
	//查询按键 事件
	$("#search").click(function(){
		//加载echart图
		getChart();
	});
});

/**
 * 加载echart图
 */
function getChart(){
	//选中的tab页
	var tab = $("#tb1").tabs("getSelected");
	var index = $('#tb1').tabs('getTabIndex',tab);
	if(index == 0){//负荷
		
		fhChart.showLoading({
	  		text:'正在努力的读取数据中...',
	  		effect:'spin'
	  	});
		
		//二级标题ID
		var mytab = $("#mytab-fh .active").attr("id");
//		console.log(mytab);
		if(mytab == 'fhqxTab'){//负荷曲线
			getFh('fhqx');
		}else if(mytab == 'fzlTab'){//负载率
			getFh('fzl');
		}else if(mytab == 'fhlTab'){//负荷率
			getFh('fhl');
		}
//		getFhChart(option);
	}else if(index == 1){//电量
		
		dlChart.showLoading({
	  		text:'正在努力的读取数据中...',
	  		effect:'spin'
	  	});
		
		//二级标题ID
		var mytab = $("#mytab-dl .active").attr("id");
		if(mytab == 'dlzsTab'){//电量走势
			getDl("dlzs");
		}else if(mytab == 'fgdlTab'){//峰谷电量
			getDl("fgdl");
		}
//		getFhChart(option);
	}
	
	
}

/**
 * 负荷曲线
 */
function getFh(functionType){
	//查询时间类型
	var timeType = $("#queryType").combobox("getValue");
	//查询时间
	var dataDate = timeType=='D'?$("#startDateD").val():$("#startDateM").val();
	//所选客户ID
	var consIds = '';
	for(var i = 0; i < allCons.length; i++){
		consIds += allCons[i].id + ",";
	}
	if(consIds.length > 0) consIds = consIds.substr(0,consIds.length-1);
	
	//发送请求查询数据
	$.ajax({	
		url:webContextRoot+'consContrast/selectConsContrast.action',
		data:{
			'consContrastModel.functionType': functionType,
			'consContrastModel.timeType': timeType, 
			'consContrastModel.dataDate' : dataDate,
			'consContrastModel.consIds': consIds,
		},
		dataType:'json',
		type:'post',
		success:function(result){
			var title = functionType=='fhqx'?'负荷曲线对比':functionType=='fhl'?'负荷率对比':'负载率对比';
			var option =  {
	  		    title: {
	  		        text: title, 
	  		        x:'center'
	  		    },
	  		    tooltip : {
	  		        trigger: 'axis',
	  		        formatter: function(params) {
						var paramResult = params[0].name + "<br/>";
						if(functionType=="fhqx"){//负荷曲线
							for(var i = 0; i < params.length; i++){
								paramResult +=  params[i].seriesName + " 负荷：" + params[i].value + "kW<br/>";
							}
						}else if(functionType=="fhl"){//负荷率
							for(var i = 0; i < params.length; i++){
								paramResult +=  params[i].seriesName + " 负荷率：" + params[i].value + "%<br/>";
							}
						}else{//负载率
							for(var i = 0; i < params.length; i++){
								paramResult +=  params[i].seriesName + " 负载率：" + params[i].value + "%<br/>";
							}
						}
						return paramResult;
//						console.log(params);
					},
	  		        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
	  		            type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
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
	  		    //设置grid位置
	  		    grid : {
	  				 x : 55, //左边距离
	  				 y : 105,//上边距离
	  				 x2 : 55,//右边距离
	  				 y2 : 25//下边距离
	  			},
	  		    yAxis: [{
	  	            name: functionType=='fhqx'?'单位(kW)':'单位(%)',
	  	            type: 'value',
	  	        }],
	  		    series: []
	  		};
//			console.log(result);
			var legend = {
  		        data: [],
  		        x:'center',
  		        y:'35'
  		    };
			for(var i = 0; i < result.length; i++){
				legend.data.push(result[i].consName);//设置legend
				option.series.push({//设置y轴数据
					name : result[i].consName,
		            type : 'line',
		            data : result[i].y
				});
			}
			//设置x轴数据
			option.xAxis = {
  		        type: 'category',
  		        boundaryGap: false,
  		        data :  result[0].x
  		    },
			option.legend = legend;
			//chart配置属性
			fhChart.setOption(option,true);
			//隐藏加载
			fhChart.hideLoading();
		}
	});
}

/**
 * 电量曲线
 * @param functionType
 */
function getDl(functionType){
	//查询时间类型
	var timeType = $("#queryType").combobox("getValue");
	//查询时间
	var dataDate = timeType=='D'?$("#startDateD").val():$("#startDateM").val();
	//所选客户ID
	var consIds = '';
	for(var i = 0; i < allCons.length; i++){
		consIds += allCons[i].id + ",";
	}
	if(consIds.length > 0) consIds = consIds.substr(0,consIds.length-1);
	
	//发送请求查询数据
	$.ajax({	
		url:webContextRoot+'consContrast/selectConsContrast.action',
		data:{
			'consContrastModel.functionType': functionType,
			'consContrastModel.timeType': timeType, 
			'consContrastModel.dataDate' : dataDate,
			'consContrastModel.consIds': consIds,
		},
		dataType:'json',
		type:'post',
		success:function(result){
			allConsName = new Array(); 
			
			var title = functionType=="dlzs"?'电量走势对比':'峰谷电量对比';
			var option =  {
					title: {
						text: title, 
						x:'center'
					},
					tooltip : {
						trigger: 'axis',
						formatter: function(params) {
							var paramResult = params[0].name + "<br/>";
							if(functionType=="dlzs"){//电量走势
								for(var i = 0; i < params.length; i++){
									paramResult +=  params[i].seriesName + " 电量：" + params[i].value + "kWh<br/>";
								}
							}else{//峰谷电量
								for(var i = 0; i < params.length/3; i++){
									paramResult +=  allConsName[i] + " " + params[i*3].seriesName + "：" + params[i*3].value + "kWh<br/>";
									paramResult +=  allConsName[i] + " " + params[i*3+1].seriesName + "：" + params[i*3+1].value + "kWh<br/>";
									paramResult +=  allConsName[i] + " " + params[i*3+2].seriesName + "：" + params[i*3+2].value + "kWh<br/>";
								}
							}
							return paramResult;
//							console.log(params);
						},
						axisPointer : {            // 坐标轴指示器，坐标轴触发有效
							type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
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
					//设置grid位置
					grid : {
						x : 55, //左边距离
						y : 105,//上边距离
						x2 : 55,//右边距离
						y2 : 25//下边距离
					},
					yAxis: [{
						name: '单位(kWh)',
						type: 'value',
					}],
					series: []
			};
//			console.log(result);
			var legend = null;
			if(functionType=="dlzs"){
				legend = {
						data: [],
						x:'center',
						y:'35'
				};
			}else{
				legend = {
						data: ['峰电量','平电量','谷电量'],
						x:'center',
						y:'35'
				};
			}
			for(var i = 0; i < result.length; i++){
				if(functionType=="dlzs"){//电量走势
					legend.data.push(result[i].consName);//设置legend
					option.series.push({//设置y轴数据
						name : result[i].consName,
						type : 'bar',
						stack : result[i].consId,
						data : result[i].y
					});
				}else{//峰谷电量
					allConsName.push(result[i].consName);
					option.series.push({//设置y轴数据
						name : '峰电量',
						type : 'bar',
						stack : result[i].consId,
						data : result[i].y2
					});
					option.series.push({//设置y轴数据
						name : '平电量',
						type : 'bar',
						stack : result[i].consId,
						data : result[i].y3
					});
					option.series.push({//设置y轴数据
						name : '谷电量',
						type : 'bar',
						stack : result[i].consId,
						data : result[i].y4
					});
				}
			}
			//设置x轴数据
			option.xAxis = {
					type: 'category',
					data :  result[0].x
			},
			option.legend = legend;
			//chart配置属性
			dlChart.setOption(option,true);
			//隐藏加载
			dlChart.hideLoading();
		}
	});
}


/**
 * 树查询
 * @param nodeId
 */
function selectTree(nodeId){
	var n = $('#tt').tree('getChecked');//获取勾选的节点数据
	if(n!=null)//判断节点是否存在
	{
		$('#tt').tree('select',n.target);
	}
	var chiNode = $('#tt').tree('getChildren',n.target);//子节点
	for(var i=0 ; i < chiNode.length ; i++)//循环节点
    {
		if(nodeId!=null?chiNode[i].id==nodeId:chiNode[i].type==1)//查找定位
		 {
			var n = $('#tt').tree("find",chiNode[i].id);//根据id获取节点
       	   	$('#tt').tree('check',n.target);//选中节点
       	    $('#tt').tree('scrollTo',n.target);//滚动到节点
       	    consId = chiNode[i].id;
       	    consName = chiNode[i].text;
       	    //查询电量分析
//       	    queryFgdl();
       	   	break;//跳出循环
		 }
    }
}

/**
 * 查询
 */
function changeDate(){
	//加载echart图
	getChart();
}



