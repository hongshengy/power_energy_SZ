/**
 * 蒸汽表用能走势
 * @since 2017-05-06
 */
var fzlChart = '';					// 蒸汽表用能chart
var currentdate = new Date(); 		// 当前日期
var startDate = new Date(); 		// 当前开始时间 为当前时间往前推一年
var endDate = new Date();			// 当前结束时间  为当前时间
var subsId = null;					// 蒸汽表ID
var subsName = '';					// 蒸汽表名称
var legend = [];					// 选择的蒸汽表名称
var subsNameList = [];
var thisLegendType = "";			// 本期名字
var upLegendType = "";				// 上期名字
var isSuccesLoad = true;			// 下拉框首次加载
var consId = '';
var byqData = [];					// 蒸汽表ID

$(function(){
	
	initTree();						// 初始化企业树
	
	initialize();					// 初始化时间
	
	fzlChart = echarts.init(document.getElementById('fzlChart'));// 初始化蒸汽表用能chart
});

/**
 * 初始化企业树 
 */
function initTree(){
	if(consId==null || consId==''|| consId=="null"){	// 未获取到企业编码，加载左侧树
		consSelectMethod = "consSelectMethodLoad()";//定义选中后执行的方法
		consSelectHasRoot = false;//是否有区域能源根节点
		consSelectSearch("",true);
	}else{
		  queryUserFiles();								// 查询上头客户信息
		  getSteamData();									// 查询蒸汽表
	}
}

/**
 * 快搜选中节点 
 */
function consSelectMethodLoad(){
	consId = consSelectCon.id;		// 把树节点id赋给企业id
	consName = consSelectCon.text;   // 把树节点的值赋给企业名称
	queryUserFiles();					// 查询用户档案
	getSteamData();						// 查询生产线
}

/**
 * 初始化下拉框时间
 */
function initialize(){
	$('#dlzsQueryType').combobox({						// 电量走势下拉框选择天、月、年
		onSelect: function(param){
			if(param.value == 'D'){						// 选择天数据
				$('#dlzsEDateD').val(DateUtil.dateToStr('yyyy-MM-dd',endDate));
				$('#dlzsEDateD').show();
				$('#dlzsEDateM').hide();
				$('#dlzsEDateY').hide();
				date = $('#dlzsEDateD').val();
				dateLast = new Date(date);
				dateLast = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('d',-1,dateLast));
			}else if(param.value == 'M'){				// 选择月数据
				$('#dlzsEDateM').val(DateUtil.dateToStr('yyyy-MM',endDate));
				$('#dlzsEDateD').hide();
				$('#dlzsEDateM').show();
				$('#dlzsEDateY').hide();
				date = $('#dlzsEDateM').val();
				dateLast = new Date(date);
				dateLast = DateUtil.dateToStr('yyyy-MM',DateUtil.dateAdd('m',-1,dateLast));
			}else if(param.value == 'Y'){				// 选择年数据
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
 * 查询用户下的蒸汽表 
 */
function getSteamData(){
	var value = "";  
    $('#xsry').combobox({  					// 加载下拉框复选框  
        url:webContextRoot +'steamTable/querySteamByCombox.action?consPowerInfoModel.consId='+consId, //后台获取下拉框数据的url  
        method:'post', 						// 请求方式
        panelWidth:130,						// 设置下拉的宽度 和下拉框保持一致
        panelHeight:200,					// 设置为固定高度，combobox出现竖直滚动条  
        valueField:'CODE',  				// 蒸汽表ID
        textField:'NAME',   				// 蒸汽表名称
        editable:false,   					// 定义用户是否可以直接输入文本到字段中。
        multiple:true,  					// 设置是否多选
        formatter: function (row) { 		// formatter方法就是实现了在每个下拉选项前面增加checkbox框的方法  
            var opts = $(this).combobox('options');  
            return '<input type="checkbox" class="combobox-checkbox">' + row.NAME;
        },  
        onLoadSuccess: function () {  		// 下拉框数据加载成功调用
        	subsNameList = [];
        	legend = [];
        	byqData = $(this).combobox("getData");
        	if(byqData.length>0){
        		$('#xsry').combobox('select',byqData[0].CODE);// 默认加载第一个蒸汽表
        	}else{
        		$('#xsry').combobox('select','');// 没有蒸汽表时
        	}
        	setTimeout("getData();","100");
        	isSuccesLoad = false;			// 首次加载
        },  
        onSelect: function (row) { 			// 选中一个选项时调用
        	subsNameList.push(row.NAME);	// 动态添加蒸汽表名称
        	subsId = row.CODE;				// 蒸汽表ID
        	var opts = $(this).combobox('options');  
            $('#xsry').val($(this).combobox('getValues')); // 获取选中的值的values    
            var el = opts.finder.getEl(this, row[opts.valueField]);  // 设置选中值所对应的复选框为选中状态  
            el.find('input.combobox-checkbox')._propAttr('checked', true);  // 设置选中的值
            // 首次不加载
            if(isSuccesLoad == false){
            	setTimeout("getData();","100");
            }
        },  
        onUnselect: function (row) {		// 不选中一个选项时调用  
        	var name = row.NAME;
        	subsNameList.splice(subsNameList.indexOf(name),1);
        	setTimeout("getData();","100");
            var opts = $(this).combobox('options');
            $('#xsry').val($(this).combobox('getValues')); //获取选中的值的values   
            var el = opts.finder.getEl(this, row[opts.valueField]);  
            el.find('input.combobox-checkbox')._propAttr('checked', false);  
        }
    }); 
}
	
/**
 * 加载echarts图数据 
 */
function getData(){
	var dylegend = '';								// 蒸汽表用能的legend 
	//获取日期插件的类型
	var dlzsQueryType = $('#dlzsQueryType').combobox('getValue');
	if(dlzsQueryType == 'M'){					// 选择月电量
		dlzsEDate = $('#dlzsEDateM').val() + '-01';	// 拼接数据
		date = $('#dlzsEDateM').val();
		dateLast = new Date(date);
		dateLast = DateUtil.dateToStr('yyyy-MM',DateUtil.dateAdd('m',-1,dateLast));
		
		if((date.substr(0,7)) == (DateUtil.dateToStr('yyyy-MM',endDate))){
			dldate = DateUtil.dateToStr('dd',DateUtil.dateAdd('d',-1,currentdate));
			dldate1 = DateUtil.dateToStr('dd',DateUtil.dateAdd('d',-1,currentdate));
		}else{
			dldate = '0';
		}
		thisLegendType = $('#dlzsEDateM').val();
		upLegendType = dateLast;
	}else if(dlzsQueryType == 'Y'){					// 选择年电量
		dlzsEDate = $('#dlzsEDateY').val() + '-01-01';// 拼接数据
		date = $('#dlzsEDateY').val();
		dateLast = new Date(date);
		dateLast = DateUtil.dateToStr('yyyy',DateUtil.dateAdd('y',-1,dateLast));
		
		if((date.substr(0,4)) == (DateUtil.dateToStr('yyyy',endDate))){
			dldate = DateUtil.dateToStr('MM',currentdate);
		}else{
			dldate = '0';
		}
		thisLegendType = $('#dlzsEDateY').val();
		upLegendType = dateLast;
	}
	
	fzlChart.showLoading({					// 正在加载...
		text:'正在努力的读取数据中...',
		effect:'spin'
	});
	
	var listName = '';
	var subsId = $("#xsry").val();			 // 获取被选中的ID
	// 选择总数据
	if(subsId == 10086){
		subsId = '';
		for(var i = 1;i < byqData.length;i++){
			subsId += byqData[i].CODE;
			if(i != byqData.length-1){
				subsId += ",";
			}
		}
	}
	$.post(webContextRoot +'steamTable/querySteamByChart.action',{//链接地址
	'consPowerInfoModel.consId': consId,	// 蒸汽表ID
	'consPowerInfoModel.subsId': subsId,	// 蒸汽表ID
	'consPowerInfoModel.startDate': dlzsEDate,// 当天
	'consPowerInfoModel.queryType': dlzsQueryType// 时间类型
	},
	function(data){
	    maxValue = 0;
	    queryDlzsEchart(data,thisLegendType);  
	    fzlChart.hideLoading();			// 隐藏正在加载的...
	},'json');
}

/**
 * 电量走势 图表
 */
function queryDlzsEchart(dataMap,thisLegendType){
	var dlzsQueryType = $('#dlzsQueryType').combobox('getValue');
	var subsName = $('#xsry').combobox('getText');	// 获取被选中的蒸汽表名字
	if(subsName == ""){						// 判断蒸汽表名字是否存在
		subsName = '';						// 不存在写空
	}else{
		sName = subsName;					// 存在 格式化蒸汽表名字
		subsName =  "(" + subsName + ")";
	}
	title = consName+subsName;				// 标题名
	var newSubsId = $("#xsry").val();		// 重新获取蒸汽表ID
	var series = [];						// 定义echarts数据
	var arrayId = newSubsId.split(',');
	var arrayName = subsNameList.join(",").split(',');
	legend = [];
	for(var i = 0;i<arrayId.length;i++){
		legend.push(arrayName[i]);// 当期数据 + 蒸汽表名
		series.push( {						// 本期数据
			name: arrayName[i],
			type:'bar',
	        data:dataMap.consMap[arrayId[i]]// 当天数据,
	    } );
	}
	
	// 如果选中两个或两个以上 则显示总数据
//	if(arrayId.length > 1){
//		legend.push('总数据');// 当期数据 + 蒸汽表名
//		series.push( {
//			name: '总数据',
//			type:'bar',
//	        data:dataMap.consMap.sumData
//	    } );	
//	}
	var option = {
		    title: {
		        text: title + "流量走势", 
		        x:'center'
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
		    tooltip: {
		        trigger: 'axis',
		    	formatter : function(params, ticket, callback) {
		    		var res = '';
		    		if(params == null ||params[0] == null){
						return;
					}
					for(var i =0;i<params.length;i++){
						// 没有数据 返回
						var text = $('#xsry').combobox('getText');
						if(text.replace(/(^s$)/g,"").length == 0){
							return res;
						}
						// 本期时间
						var date = '';
						var dlzsQueryType = $('#dlzsQueryType').combobox('getValue');
						if(dlzsQueryType == 'M'){
							date = thisLegendType.substring(0,7) + "-" + params[i].name;
						}else{
							date = thisLegendType.substring(0,4) + "-" + params[i].name;
						}
						res += date + " " + params[i].seriesName + ' 流量：'+ params[i].value +'t' + '<br/>';
						continue;
					}
					return res;
				}
		    },
		    legend: {
		        left: 'center',				// 居中显示
		        data: legend,
		        shown:false,
		        y:'23',						// 距离标题距离
		        width:'80%' 				// 组件宽度
		    },
			grid : {						// 设置grid位置
	 			 x : 65, 					// 左边距离
	 			 y : 85,					// 上边距离
	 			 x2 : 55,					// 右边距离
	 			 y2 : 35					// 下边距离
	 		},
			 xAxis: {
			        type: 'category',
//			        boundaryGap: false,
			        data:dataMap.consMap.currentDate
			 },
		    yAxis: [{
	            name: '单位(t)',
	            type: 'value'
	        }],
	        series : series
		};
 
		fzlChart.setOption(option,true);
		fzlChart.resize();
}