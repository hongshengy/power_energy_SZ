
/**
 * 生产线用能监控 
 * @since 2017-05-09
 */
var fzlChart = '';					// 用能监控chart
var currentdate = new Date(); 		// 当前日期
var startDate = new Date(); 		// 当前开始时间
var endDate = new Date();			// 当前结束时间
var subsId = null;					// 生产线ID
var subsName = '';					// 生产线名称
var legend = [];					// 选择的生产线名称
var subsNameList = [];
var thisLegendType = "";			// 本期名字
var upLegendType = "";				// 上期名字
var isSuccesLoad = true;			// 下拉框首次加载

//js入口
$(function(){
	
	initTree();						// 初始化企业树
	
	initialize();					// 初始化时间
	
	fzlChart = echarts.init(document.getElementById('fzlChart'));// 初始化用能监控chart
});

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
		getbcData();						//加载班次下拉
		getbyqData();						// 查询生产线
	}
}

/**
 * 快搜选中节点  
 */
function consSelectMethodLoad(){
	consId = consSelectCon.id;		// 把树节点id赋给企业id
	consName = consSelectCon.text;   // 把树节点的值赋给企业名称
	queryUserFiles();					// 查询用户档案
	getbcData();						//加载班次下拉
	getbyqData();						// 查询生产线
}

/**
 * 选中节点 
 */
function selectTree(nodeId){
	
	$('#tree-leftQyTree li:eq(0)').find('div').addClass("tree-node-selected");// 添加选中样式
	var n = $('#tree-leftQyTree').tree('getSelected');//获取被选中的节点
	if(n!=null)								// 判断节点是否存在
	{
		$('#tree-leftQyTree').tree('select',n.target);
	}
	
	var chiNode = $('#tree-leftQyTree').tree('getChildren',n.target);// 子节点
	if(chiNode.length == 0){
		$.messager.alert('提示', '请先给客户添加生产线', 'warning');
	} else {
		for(var i=0 ; i < chiNode.length ; i++)	// 循环节点
		{
			 if(nodeId!=null?chiNode[i].id==nodeId:chiNode[i].type==1)// 查找定位
			  {
				 var n = $('#tree-leftQyTree').tree("find",chiNode[i].id);// 根据id获取节点
			  	   $('#tree-leftQyTree').tree('select',n.target);//选中节点
			  	   $('#tree-leftQyTree').tree('scrollTo',n.target);//滚动到节点
			  	   consId = chiNode[i].id;		// 把树节点id赋给企业id
			  	   consName = chiNode[i].text;	// 把树节点的值赋给企业名称
			  	   getbcData();					//获取班次数据
			  	   queryUserFiles();			// 查询用户档案
			  	   getbyqData();				// 查询生产线
			  	   break;						// 跳出循环
			  }
		}
	}
}

/**
 * 初始化时间
 */
function initialize(){
	//电量走势下拉框选择天、月、年
	$('#dlzsQueryType').combobox({
		onSelect: function(param){
			if(param.value == 'D'){
				$('#dlzsEDateD').val(DateUtil.dateToStr('yyyy-MM-dd',endDate));
				$('#dlzsEDateD').show();
				$('#dlzsEDateM').hide();
				$('#dlzsEDateY').hide();
				date = $('#dlzsEDateD').val();
				dateLast = new Date(date);
				dateLast = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('d',-1,dateLast));
				
			}else if(param.value == 'M'){
				$('#dlzsEDateM').val(DateUtil.dateToStr('yyyy-MM',endDate));
				$('#dlzsEDateD').hide();
				$('#dlzsEDateM').show();
				$('#dlzsEDateY').hide();
				date = $('#dlzsEDateM').val();
				dateLast = new Date(date);
				dateLast = DateUtil.dateToStr('yyyy-MM',DateUtil.dateAdd('m',-1,dateLast));
				
			}else if(param.value == 'Y'){
				$('#dlzsEDateY').val(DateUtil.dateToStr('yyyy',endDate));
				$('#dlzsEDateD').hide();
				$('#dlzsEDateM').hide();
				$('#dlzsEDateY').show();
				date = $('#dlzsEDateY').val();
				dateLast = new Date(date);
				dateLast = DateUtil.dateToStr('yyyy',DateUtil.dateAdd('y',-1,dateLast));
			}
		}
	});
	 
	//左减日期电量走势
	$('#leftdlzs').click(function(){
		var dlzsQueryType = $('#dlzsQueryType').combobox('getValue');
		if(dlzsQueryType == 'D'){
			var startDate =  $('#dlzsEDateD').val();	// 开始日期
			var nowDate = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('d',-1,DateUtil.strToDate(startDate)));
			$('#dlzsEDateD').val(nowDate);
		}else if(dlzsQueryType == 'M'){
			var startDate =  $('#dlzsEDateM').val();	// 开始日期
			var nowDate = DateUtil.dateToStr('yyyy-MM',DateUtil.dateAdd('m',-1,DateUtil.strToDate(startDate)));
			$('#dlzsEDateM').val(nowDate.substr(0,7));
		}else if(dlzsQueryType == 'Y'){
			var startDate =  $('#dlzsEDateY').val();	// 开始日期
			startDate1 = new Date(startDate);
			var nowDate = DateUtil.dateToStr('yyyy',DateUtil.dateAdd('y',-1,startDate1));
			$('#dlzsEDateY').val(nowDate.substr(0,4));
		}
		getData();
	});
	
	//右加日期电量走势
	$('#rightdlzs').click(function(){
		var dlzsQueryType = $('#dlzsQueryType').combobox('getValue');
		if(dlzsQueryType == 'D'){
			var startDate =  $('#dlzsEDateD').val();	// 开始日期
			var nowDate = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('d',1,DateUtil.strToDate(startDate)));
			$('#dlzsEDateD').val(nowDate);
		}else if(dlzsQueryType == 'M'){
			var startDate =  $('#dlzsEDateM').val();	// 开始日期
			var nowDate = DateUtil.dateToStr('yyyy-MM',DateUtil.dateAdd('m',1,DateUtil.strToDate(startDate)));
			$('#dlzsEDateM').val(nowDate);
		}else if(dlzsQueryType == 'Y'){
			var startDate =  $('#dlzsEDateY').val();	// 开始日期
			startDate1 = new Date(startDate);
			var nowDate = DateUtil.dateToStr('yyyy',DateUtil.dateAdd('y',1,startDate1));
			$('#dlzsEDateY').val(nowDate);
		}
		getData();
	});
}

/**
 * 查询档案内容 
 */
function queryUserFiles(){
	var node = $('#tt').tree('getSelected');
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
 * 查询用户下的生产线 
 */
function getbyqData(){
	var value = "";  
    $('#xsry').combobox({  			// 加载下拉框复选框  	
        url:webContextRoot + 'productLine/queryProductLineByConsId.action?consPowerInfoModel.consId='+consId, //后台获取下拉框数据的url  
        method:'post', 				// 请求方式
        panelWidth:130,				// 设置下拉的宽度 和下拉框保持一致
        panelHeight:200,			// 设置为固定高度，combobox出现竖直滚动条  
        valueField:'CODE',  		// 生产线ID
        textField:'NAME',   		// 生产线名称
        editable:false,   			// 定义用户是否可以直接输入文本到字段中。
        multiple:true,  			// 是否可以多选
        formatter: function (row) { // formatter方法就是实现了在每个下拉选项前面增加checkbox框的方法  
            var opts = $(this).combobox('options');  
            return '<input type="checkbox" class="combobox-checkbox">' + row.NAME;
        },  
        onLoadSuccess: function () {// 下拉框数据加载成功调用
        	subsNameList = [];
        	legend = [];
        	var byqData = $(this).combobox("getData");// 得到查询的list集合
        	if(byqData.length>0){
        		$('#xsry').combobox('select',byqData[0].CODE);// 默认加载第一个生产线
        		subsId = $('#xsry').val();
        	}else{
        		$('#xsry').combobox('select','');// 没有生产线时
        	}
        	setTimeout("getData();","100");
        },  
        onSelect: function (row) {  	// 选中一个选项时调用
        	subsNameList.push(row.NAME);// 动态添加生产线名称
        	subsId = row.CODE;			// 生产线ID
        	var opts = $(this).combobox('options');  
            $('#xsry').val($(this).combobox('getValues')); // 获取选中的值的values    
            var el = opts.finder.getEl(this, row[opts.valueField]);  // 设置选中值所对应的复选框为选中状态  
            el.find('input.combobox-checkbox')._propAttr('checked', true);  // 设置选中的值
            setTimeout("getData();","100");	
        },  
        onUnselect: function (row) {	// 不选中一个选项时调用  
        	var name = row.NAME;
        	subsNameList.splice(subsNameList.indexOf(name),1);
        	setTimeout("getData();","100");				// 加载chart图
            var opts = $(this).combobox('options');
            $('#xsry').val($(this).combobox('getValues')); //获取选中的值的values   
            var el = opts.finder.getEl(this, row[opts.valueField]);  
            el.find('input.combobox-checkbox')._propAttr('checked', false);  
        }
    }); 
}
	
/**
 * 查询echarts数据 
 */
function getData(){
	var dylegend = '';				// 生产线用能的legend 
	//获取日期插件的类型
	var dlzsQueryType = $('#dlzsQueryType').combobox('getValue');
	if(dlzsQueryType == 'D'){								// 选择日电量
		dlzsEDate = $('#dlzsEDateD').val();
		date = $('#dlzsEDateD').val();
		dateLast = new Date(date);
		dateLast = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('d',-1,dateLast));
//		if(date == (DateUtil.dateToStr('yyyy-MM-dd',endDate))){
//			dldate = DateUtil.dateToStr('hh',DateUtil.dateAdd('h',-1,currentdate)) + ':00';
//			dldate1 = DateUtil.dateToStr('hh',DateUtil.dateAdd('h',-1,currentdate));
//		}else{
//			dldate = '0';
//		}
		thisLegendType = dlzsEDate;
		upLegendType = dateLast;
	}else if(dlzsQueryType == 'M'){ 					// 选择月电量
		dlzsEDate = $('#dlzsEDateM').val() + '-01';		// 拼接数据
		date = $('#dlzsEDateM').val();					// 本期时间
		dateLast = new Date(date);						// 上一期时间
		dateLast = DateUtil.dateToStr('yyyy-MM',DateUtil.dateAdd('m',-1,dateLast));
		
		thisLegendType = $('#dlzsEDateM').val();		// 本期时间
		upLegendType = dateLast;						// 上一期时间
	}else if(dlzsQueryType == 'Y'){ 					// 选择年电量
		dlzsEDate = $('#dlzsEDateY').val() + '-01-01';	// 拼接数据
		date = $('#dlzsEDateY').val();
		dateLast = new Date(date);
		dateLast = DateUtil.dateToStr('yyyy',DateUtil.dateAdd('y',-1,dateLast));
		
		thisLegendType = $('#dlzsEDateY').val();		// 本期时间
		upLegendType = dateLast;						// 上一期时间
	}

	fzlChart.showLoading({								// 正在加载...
		text:'正在努力的读取数据中...',
		effect:'spin'
	});
	
	var subsId = $("#xsry").val();						// 获取被选中的ID
	var banciType = $('#jinjicd').combobox('getValue');	// 选中的班次
	$.post(webContextRoot +'productLine/queryProductLineInfo.action',{//链接地址
		'consPowerInfoModel.subsId': subsId,			// ID
		'consPowerInfoModel.startDate': dlzsEDate,  	// 时间
		'consPowerInfoModel.queryType': dlzsQueryType,	// 时间类型
		'consPowerInfoModel.banciType': banciType,		// 班次类型
		'consPowerInfoModel.consId': consId				// 用户ID
	},
	function(data){
	    maxValue = 0;
	    queryDlzsEchart(data,thisLegendType,upLegendType); //加载Echarts折线图 
	    fzlChart.hideLoading();						// 隐藏正在加载的...
	},'json');
}

/**
 * 电量走势 图表
 */
function queryDlzsEchart(dataMap,thisLegendType,upLegendType){
	var dlzsQueryType = $('#dlzsQueryType').combobox('getValue');
	var subsName = $('#xsry').combobox('getText');	// 获取被选中的生产线名字
	var banciName = $('#jinjicd').combobox('getText'); // 获取被选中的班次名字
	if(subsName == null || subsName === ""){		// 判断生产线名字是否存在
		subsName = '';								// 不存在写空
	}else{
		sName = subsName;							// 存在 格式化生产线名字
		subsName =  "(" + subsName + ")";
	}
	title = consName+subsName;						// 标题名
	var newSubsId = $("#xsry").val();
	var series = [];
	var arrayId = newSubsId.split(',');
	var arrayName = subsNameList.join(",").split(',');
	legend = [];
	for(var i =0;i<arrayId.length;i++){
		if(subsName == null || subsName === ""){
			legend.push("");
		}else{
			legend.push(arrayName[i] + "(" + banciName + ")");// 当期数据 + 车间名
//			legend.push(upLegendType +" "+ arrayName[i]);// 前一期数据 + 车间名
		}
		series.push( {					// 本期数据
			name: arrayName[i] + "(" + banciName + ")",
			type:'bar', 
	        data:dataMap.consMap['currentPowerValue'+arrayId[i]]// 本期数据,
	    } );
	}
	/**
	 * 如果有重复的客户名称则添加 空格
	 */
	if(legend.length > 1){
		var s = legend.join(",")+",";
		for(var i = 0,b="";i < legend.length;i++){
			// 判断该集合中是否有重复的值 true表示有重复
			if(s.replace(legend[i]+",", "").indexOf(legend[i]+",")-1) {
				// 递增，legend每次的值不能重复，不然显示不到
				// legend中的值要和series[i].name的值一毛一样
				b += " ";
				legend[i] = legend[i]+b;
				series[i].name = series[i].name+b;
			}
		}
	}
	var option = {
		    title: {
		        text: title + "电量走势", 
		        x:'center'
		    },
			tooltip: {
		        trigger: 'axis',
		    	formatter : function(params , ticket, callback) {
		    		var res = '';
		    		// 没有数据 返回
					var text = $('#xsry').combobox('getText');
					if(text.replace(/(^s$)/g,"").length == 0){
						return res;
					}
					for(var i = 0;i<params.length;i++){
						var date = '';
						var dlzsQueryType = $('#dlzsQueryType').combobox('getValue');
						if(dlzsQueryType == 'D'){								// 选择日电量
							date = params[i].name;
						}else if(dlzsQueryType == 'M'){
							date = thisLegendType.substring(0,7) + "-" + params[i].name;
						}else{
							date = thisLegendType.substring(0,4) + "-" + params[i].name;
						}
						if(i == 0){
							res += "时间：" + date + "<br/>" ;
						}
						var data = '';
						if(typeof params[i].value == 'undefined'){
							data = "-";
						}else{
							data = params[i].value;
						}
		            	res += params[i].seriesName + ' 电量：'+ data +'kWh' + '<br/>';
					}
					return res;
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
		        y:'23',					// 距离标题距离
		        width:'80%' 			// 组件宽度
		    },
		    grid : {					// 设置grid位置
	 			 x : 45, 				// 左边距离
	 			 y : 85,				// 上边距离
	 			 x2 : 35,				// 右边距离
	 			 y2 : 35				// 下边距离
	 		},
			 xAxis: {
			        type: 'category',
//			        boundaryGap: false,
			        data:dataMap.consMap.categes
			 },
		    yAxis: [{
	            name: '单位(kWh)',
	            type: 'value'
	        }],
	        series : series
		};
 
		fzlChart.setOption(option,true);
		fzlChart.resize();
}

//查询下拉框 的 班次
function getbcData(){
		//查询下拉框的班次
		$.getJSON(webContextRoot + 'productLine/queryBcData.action', {
			  'consId':consId
		},
		function(json){//返回值
				$('#jinjicd').combobox({
					data:json,
					valueField: 'WORKTYPE',
					textField: 'CODENAME',
					multiple: false, 
					editable:false,   			// 定义用户是否可以直接输入文本到字段中。
//					 formatter: function (row) { //formatter方法就是实现了在每个下拉选项前面增加checkbox框的方法  
//				            var opts = $(this).combobox('options');  
//				            return '<input type="checkbox" class="combobox-checkbox">' + row.codeName;
//				            //row[opts.textField]  
//				     },  
					onLoadSuccess:function(){
						var bcData = $(this).combobox("getData");
						$('#jinjicd').combobox('select',bcData[0].WORKTYPE);
//						 isSuccesLoad=true;//首次加载
//						 workType = [];//班次编码 
//						 codeName = [];//班次名称
//						var bcData = $(this).combobox("getData");
//						if(bcData.length>0){
////							for(var i=0;i<bcData.length;i++){
////								$('#jinjicd').combobox('select',bcData[i].workType);
////							}
//						     //班次类型默认选择第一个
//							
//						}else{
//							$('#jinjicd').combobox('select',''); //无数据选择质控
////							getData();//查询数据
//						}
					},
//					onSelect: function (row) { //选中一个选项时调用  
//						workType.push(row.workType);//选择的班次编码 放入  选中集合
//						codeName.push(row.codeName);//选择的班次名称 放入选中集合
//			        	var opts = $(this).combobox('options');  
//			            //获取选中的值的values  
//			            $('#jinjicd').val($(this).combobox('getValues'));  
//			           //设置选中值所对应的复选框为选中状态  
//			            var el = opts.finder.getEl(this, row[opts.valueField]);  
//			            el.find('input.combobox-checkbox')._propAttr('checked', true);  
//			            if(isSuccesLoad == true){//首次选中，查询数据
//			        	   getData();//查询数据
//			            }
//			            if(isSuccesLoad == false){//非首次加载，点击事件
//			            	getbcynpgData(data);//加载chart图
//			            }
//			            isSuccesLoad=false;//首次加载完之后修改变量值
//			        },  
//			        onUnselect: function (row) {//不选中一个选项时调用  
//			        	workType.splice(workType.indexOf(row.workType),1);
//			        	codeName.splice(codeName.indexOf(row.codeName),1);
//			        	getbcynpgData(data);//加载chart图
//			            var opts = $(this).combobox('options');  
//			            //获取选中的值的values  
//			            $('#xsry').val($(this).combobox('getValues'));  
//			            var el = opts.finder.getEl(this, row[opts.valueField]);  
//			            el.find('input.combobox-checkbox')._propAttr('checked', false);  
//			        } 
				});
		    }
		);
}
