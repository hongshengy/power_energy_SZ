/**
 * 
 * 初始化 
 */
var currentdate = new Date();	// 当前日期
var startDate = new Date(); 	// 当前开始时间 为当前时间往前推一年
var endDate = new Date();		// 当前结束时间  为当前时间
var regionChart = '';			// chart

$(function(){

	// 日期初始化
	initialize();
	
	// 初始化echart
	regionChart = echarts.init(document.getElementById('regionChart'));
	
	// 查询数据
	getData();	
	
});

/**
 * 查询行业用电电量
 */
function getData(){
	 // 电量表格
	 loadDatagrid();
	
	var dlzsQueryType = $('#dlzsQueryType').combobox('getValue');// 获取日期插件的类型
	
	if(dlzsQueryType == 'M'){									// 选择月电量
		dlzsEDate = $('#dlzsEDateM').val() + '-01';				// 拼接数据
		date = $('#dlzsEDateM').val();							// 第一时间
		dateLast = new Date(date);
		dateLast = DateUtil.dateToStr('yyyy-MM',DateUtil.dateAdd('m',-1,dateLast));
		if((date.substr(0,7)) == (DateUtil.dateToStr('yyyy-MM',endDate))){
			dldate = DateUtil.dateToStr('dd',DateUtil.dateAdd('d',-1,currentdate));
			dldate1 = DateUtil.dateToStr('dd',DateUtil.dateAdd('d',-1,currentdate));
		}else{
			dldate = '0';
		}
		thisLegendType = date + " 月电量";						// 拼接chart中legend属性
	}else if(dlzsQueryType == 'Y'){								// 选择年电量
		dlzsEDate = $('#dlzsEDateY').val() + '-01-01';			// 拼接数据
		date = $('#dlzsEDateY').val();							// 第一时间
		dateLast = new Date(date);
		dateLast = DateUtil.dateToStr('yyyy',DateUtil.dateAdd('y',-1,dateLast));
		
		if((date.substr(0,4)) == (DateUtil.dateToStr('yyyy',endDate))){
			dldate = DateUtil.dateToStr('MM',currentdate);
		}else{
			dldate = '0';
		}
		thisLegendType = date + " 年电量";						// 拼接chart中legend属性
	}
	
	regionChart.showLoading({
		text:'正在努力的读取数据中...',
		effect:'spin'
	});
	
	$.post(webContextRoot +'powerRanking/queryRelationlGraph.action',{
        'consPowerInfoModel.startDate': dlzsEDate,
        'consPowerInfoModel.queryType': dlzsQueryType
     },
     function(data){
    	 //加载echart数据
    	 // 电量图表z
    	 queryHyChart(data.consMap,thisLegendType);
    	 regionChart.hideLoading();
     },'json');
}

/**
 * 行业用电 图表
 */
function queryHyChart(dataMap,thisLegendType){
	var legend = [];
	legend.push(thisLegendType);
	
	option = {
			title: {
			        text: '客户用电排名', 
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
						// 防止出现undefined
						// 排名
						var rank = '第';
						// 用户名称
						var consName = '';
						// 总电量
						var powerValue = '';
						// 峰电量
						var powerFValue = '';
						// 平电量
						var powerPValue = '';
						// 谷电量
						var powerGValue = '';
						if(typeof dataMap.rankList[params[i].dataIndex] == 'undefined'){
							rank = '-';
						}else{
							rank += dataMap.rankList[params[i].dataIndex];
						}
						
						if(typeof dataMap.consNameList[params[i].dataIndex] == 'undefined'){
							consName = '-';
						}else{
							consName = dataMap.consNameList[params[i].dataIndex];
						}
						
						if(typeof dataMap.powerValue[params[i].dataIndex] == 'undefined'){
							powerValue = '-';
						}else{
							powerValue = dataMap.powerValue[params[i].dataIndex];
						}
						
						if(typeof dataMap.powerFValue[params[i].dataIndex] == 'undefined'){
							powerFValue = '-';
						}else{
							powerFValue = dataMap.powerFValue[params[i].dataIndex];
						}
						
						if(typeof dataMap.powerPValue[params[i].dataIndex] == 'undefined'){
							powerPValue = '-';
						}else{
							powerPValue = dataMap.powerPValue[params[i].dataIndex];
						}
						
						if(typeof dataMap.powerGValue[params[i].dataIndex] == 'undefined'){
							powerGValue = '-';
						}else{
							powerGValue = dataMap.powerGValue[params[i].dataIndex];
						}
						res += '用电排名：' + rank + '<br/>';
						res += consName + '<br/>';
						res += '总电量：'+ powerValue +'kWh' + '<br/>';
		            	res += '峰电量：'+ powerFValue +'kWh' + '<br/>';
		            	res += '平电量：'+ powerPValue +'kWh' + '<br/>';
		            	res += '谷电量：'+ powerGValue +'kWh' + '<br/>';
					}
					return res;
				}
		    },
		    legend: {
		        data:legend,
		        x:'center',
		        y:'35'
		    },
		    toolbox: {
		        show : true,
		        feature : {
		            mark : {show: true},
		            dataView : {show: true, readOnly: false},
		            restore : {show: true},
		            saveAsImage : {show: true}
		        }
		    },
		    //设置grid位置
		    grid : {
				 x : 75, //左边距离  
				 y : 75,//上边距离
				 x2 : 35,//右边距离
				 y2 : 35//下边距离
			 },
			 dataZoom: [
				        {
				            show: true,
				            realtime: true,
				            // 可选，dataZoom 组件的 index，多个 dataZoom 组件时有用，默认为 0
//				            dataZoomIndex: number,
				            // 开始位置的百分比，0 - 100
//				            start: number,
				            // 结束位置的百分比，0 - 100
//				            end: number,
				            // 开始位置的数值
				            startValue: 0,
				            // 结束位置的数值
				            endValue: 10
				        }
				    ],
		    yAxis : [
		             {
		            	 name : '单位(kWh)',
		                 type : 'value'
		             }
		         ],
		    xAxis : [
		        {
		            type : 'category',
		            axisLine: {onZero: true},
		            data : dataMap.categes.map(function (str) {
		                return str.replace(' ', '\n')
		            })
		        }
		    ],
		    
		    series : [
		       {
		    	   name:thisLegendType,
		           type: 'bar',
		           barWidth : 20,
		           lineStyle: {
		                normal: {
		                    width: 2
		                }
		           },
		           symbolSize: function (value){
		               return Math.round(value[2]/10) + 2;
		           },
		           data:dataMap.powerValue
		       }
		   ]
		};
	
		regionChart.setOption(option,true);
		regionChart.resize();
}

/**
 * 电量表格 
 */
function loadDatagrid(){
	// 查询的客户名称
	var consName = '';
	// 客户搜索文本框  回车事件
	$("#findName").textbox('textbox').keydown(function(e){
		if(e.keyCode == 13){
			consName = $('#findName').textbox('getText');
		}
	});
	
	// 获取查询框的内容
	consName = $('#findName').textbox('getText');
	
	var dlzsQueryType = $('#dlzsQueryType').combobox('getValue');// 获取日期插件的类型
	
	var colums = [];
	// 月数据表格
	if(dlzsQueryType == 'M'){		
		dlzsEDate = $('#dlzsEDateM').val() + '-01';				// 拼接数据
		colums = [[
			    {field:'rank',title:'用电排名',width: $(this).width()*0.10,align:'center'},   
		        {field:'consName',title:'客户名称',width: $(this).width()*0.15,align:'center'},   
		        {field:'consNo',title:'客户编号',width: $(this).width()*0.15,align:'center'},   
		   		{field:'powerValue',title:'总电量(kWh)',width: $(this).width()*0.15,align:'center'},
		   		{field:'tongbiValue',title:'去年同期(kWh)',width: $(this).width()*0.15,align:'center'},
		   		{field:'tongbi',title:'同比(%)',width: $(this).width()*0.10,align:'center'},
		   		{field:'huanbiValue',title:'上月同期(kWh)',width: $(this).width()*0.15,align:'center'},
		   		{field:'huanbi',title:'环比(%)',width: $(this).width()*0.10,align:'center'},
		   		{field:'powerFValue',title:'峰电量(kWh)',width: $(this).width()*0.10,align:'center'},
		   		{field:'powerPValue',title:'平电量(kWh)',width: $(this).width()*0.10,align:'center'},
		   		{field:'powerGValue',title:'谷电量(kWh)',width: $(this).width()*0.10,align:'center'}
		   	]];
	}else if(dlzsQueryType == 'Y'){
		dlzsEDate = $('#dlzsEDateY').val() + '-01-01';			// 拼接数据
		colums = [[
		           	{field:'rank',title:'用电排名',width: $(this).width()*0.15,align:'center'}, 
			        {field:'consName',title:'客户名称',width: $(this).width()*0.15,align:'center'},   
			        {field:'consNo',title:'客户编号',width: $(this).width()*0.15,align:'center'},   
			   		{field:'powerValue',title:'总电量(kWh)',width: $(this).width()*0.15,align:'center'},
			   		{field:'powerFValue',title:'峰电量(kWh)',width: $(this).width()*0.15,align:'center'},
			   		{field:'powerPValue',title:'平电量(kWh)',width: $(this).width()*0.15,align:'center'},
			   		{field:'powerGValue',title:'谷电量(kWh)',width: $(this).width()*0.15,align:'center'}
			   	]];
	}
	$('#dataGrid').datagrid({	
//		title:'用电详情',
		nowrap : false,// 设置为true，当数据长度超出列宽时将会自动截取。
		striped : true,// 设置为true将交替显示行背景。
		fit: true,
		border:false,
		pageSize:20,
		pagination : true,// 设置true将在数据表格底部显示分页工具栏。
		fitColumns : true,// 自动适应宽度
		singleSelect : true,// 设置为true将只允许选择一行。
		rownumbers : true,// 设置为true将显示行数。
		loadMsg : "正在努力的读取数据中...",// 提示信息
		columns : colums
	});
	
	$.post(webContextRoot +'powerRanking/queryRankingByTable.action',
	{
		'consPowerInfoModel.consName': consName,
		'consPowerInfoModel.startDate': dlzsEDate,
		'consPowerInfoModel.queryType': dlzsQueryType
	},
	function(data){//回调
		
		$('#dataGrid').datagrid("loaded");// loading画面关闭
		$('#dataGrid').datagrid('loadData', data);// 加载数据
		if (data.length > 0) {
			$('#dataGrid').datagrid('loadData', data.slice(0, 20));// 加载数据
			$('#dataGrid').datagrid("selectRow",0);
		}
		// 前台分页
		var pager = $('#dataGrid').datagrid("getPager");
		pager.pagination({
			total : data.length,
			pageSize : 20,// 每页记录数
			pageList : [ 20, 30, 50 ],// 可以设置每页记录条数的列表
			beforePageText : '第',
			afterPageText : '页 共 {pages} 页',
			displayMsg : '当前显示 {from} - {to} 条记录,共 {total} 条记录',
			onSelectPage : function(pageNo, pageSize) {
				var start = (pageNo - 1) * pageSize;// 计算分页数据开始
				var end = start + pageSize;// 计算分页数据结束
				$('#dataGrid')
						.datagrid('loadData', data.slice(start, end));// 分页加载每页条目
				pager.pagination('refresh', {
					total : data.length,// 总记录条数
					pageNumber : pageNo
				});
			}
		});
	},"json");
	
}

/**
 * 初始化时间控件 
 */
function initialize(){
	$('#dlzsQueryType').combobox({					// 电量走势下拉框选择天、月、年
		onSelect: function(param){
			if(param.value == 'M'){					// 选择月数据
				$('#dlzsEDateM').val(DateUtil.dateToStr('yyyy-MM',DateUtil.dateAdd('m',-1,endDate)));
				$('#dlzsEDateM').show();			// 显示月时间插件
				$('#dlzsEDateY').hide();			// 隐藏年时间插件
				date = $('#dlzsEDateM').val();		// 获取选中的时间
				dateLast = new Date(date);			
				dateLast = DateUtil.dateToStr('yyyy-MM',DateUtil.dateAdd('m',-1,dateLast));
				
			}else if(param.value == 'Y'){			// 选择年数据
				$('#dlzsEDateY').val(DateUtil.dateToStr('yyyy',endDate));
				$('#dlzsEDateM').hide();			// 隐藏月时间插件
				$('#dlzsEDateY').show();			// 显示年时间
				date = $('#dlzsEDateY').val();		// 获取选中的时间
				dateLast = new Date(date);
				dateLast = DateUtil.dateToStr('yyyy',DateUtil.dateAdd('y',-1,dateLast));
				
			}
		}
	});
	 
	$('#leftdlzs').click(function(){				// 左减日期电量走势
		var dlzsQueryType = $('#dlzsQueryType').combobox('getValue');
		if(dlzsQueryType == 'M'){
			var startDate =  $('#dlzsEDateM').val();// 开始日期
			var nowDate = DateUtil.dateToStr('yyyy-MM',DateUtil.dateAdd('m',-1,DateUtil.strToDate(startDate)));
			$('#dlzsEDateM').val(nowDate.substr(0,7));
		}else if(dlzsQueryType == 'Y'){
			var startDate =  $('#dlzsEDateY').val();// 开始日期
			startDate1 = new Date(startDate);
			var nowDate = DateUtil.dateToStr('yyyy',DateUtil.dateAdd('y',-1,startDate1));
			$('#dlzsEDateY').val(nowDate.substr(0,4));
		}
		getData();
	});
	
	$('#rightdlzs').click(function(){				// 右加日期电量走势
		var dlzsQueryType = $('#dlzsQueryType').combobox('getValue');
		if(dlzsQueryType == 'M'){
			var startDate =  $('#dlzsEDateM').val();// 开始日期
			var nowDate = DateUtil.dateToStr('yyyy-MM',DateUtil.dateAdd('m',1,DateUtil.strToDate(startDate)));
			$('#dlzsEDateM').val(nowDate);
		}else if(dlzsQueryType == 'Y'){
			var startDate =  $('#dlzsEDateY').val();// 开始日期
			startDate1 = new Date(startDate);
			var nowDate = DateUtil.dateToStr('yyyy',DateUtil.dateAdd('y',1,startDate1));
			$('#dlzsEDateY').val(nowDate);
		}
		getData();
	});
	
}