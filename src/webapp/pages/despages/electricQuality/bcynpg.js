/**
 * 班次用能评估
 * @author 王国际
 * @since 2017-05-10
 */
myChart = '';
var dataType;//数据查询类型
var workType = [];//班次编码 
var codeName = [];//班次名称
var isSuccesLoad=false;//下拉框首次加载
var currentDate = new Date();//当前时间
var ischecktreeSearch =true;//是否执行树查询事件
 
var data;//当前查询过的数据
 
//初始化方法
$(function(){
	myChart = echarts.init(document.getElementById('userChart'));//初始化chart
//	$('#startDate').val(DateUtil.dateToStr('yyyy',currentDate));//默认当前时间
	
	$('#dlzsQueryType').combobox({
		onSelect: function(param){
			if(param.value == 'M'){
				$('#dlzsEDateM').val(DateUtil.dateToStr('yyyy-MM',currentDate));
				$('#dlzsEDateM').show();
				$('#dlzsEDateY').hide();
				date = $('#dlzsEDateM').val();
				dateLast = new Date(date);
				dateLast = DateUtil.dateToStr('yyyy-MM',DateUtil.dateAdd('m',-1,dateLast));
				
			}else if(param.value == 'Y'){
				$('#dlzsEDateY').val(DateUtil.dateToStr('yyyy',currentDate));
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
	$('#left').click(function(){
		var dlzsQueryType = $('#dlzsQueryType').combobox('getValue');
		if(dlzsQueryType == 'M'){
			var startDate =  $('#dlzsEDateM').val();	// 开始日期
			var nowDate = DateUtil.dateToStr('yyyy-MM',DateUtil.dateAdd('m',-1,DateUtil.strToDate(startDate+"-01")));
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
	$('#right').click(function(){
		var dlzsQueryType = $('#dlzsQueryType').combobox('getValue');
		if(dlzsQueryType == 'M'){
			var startDate =  $('#dlzsEDateM').val();	// 开始日期
			var nowDate = DateUtil.dateToStr('yyyy-MM',DateUtil.dateAdd('m',1,DateUtil.strToDate(startDate+"-01")));
			$('#dlzsEDateM').val(nowDate);
		}else if(dlzsQueryType == 'Y'){
			var startDate =  $('#dlzsEDateY').val();	// 开始日期
			startDate1 = new Date(startDate);
			var nowDate = DateUtil.dateToStr('yyyy',DateUtil.dateAdd('y',1,startDate1));
			$('#dlzsEDateY').val(nowDate);
		}
		getData();
	});
	
	if(consId==null || consId==''|| consId=="null"){//未获取到企业编码，加载左侧树
	  
		consSelectMethod = "consSelectMethodLoad()";//定义选中后执行的方法
		consSelectHasRoot = false;//是否有区域能源根节点
		consSelectSearch("",true);
		
	}else{
		  queryUserFiles();//查询上头客户信息
    	  getbcData();//加载班次下拉
	}
	
	 //查询事件
	$('#search').click(function(){
		getData();//查询数据
	});
});
 
/**
 * 快搜选中节点  
 */
function consSelectMethodLoad(){
	consId = consSelectCon.id;		// 把树节点id赋给企业id
	consName = consSelectCon.text;   // 把树节点的值赋给企业名称
	queryUserFiles();//查询上头客户信息
	getbcData();//加载班次下拉
}

//选中节点
function selectTree(nodeId){
	$('#tree-leftQyTree li:eq(0)').find('div').addClass("tree-node-selected");//添加选中样式
	var n = $('#tree-leftQyTree').tree('getSelected');//获取被选中的节点
	if(n!=null)//判断节点是否存在
	{
		$('#tree-leftQyTree').tree('select',n.target);//选中本节点
	}
	
	var chiNode = $('#tree-leftQyTree').tree('getChildren',n.target);//子节点
	if(chiNode.length == 0){
		$.messager.alert('提示', '请先给客户添加班次', 'warning');
	} else {
		for(var i=0 ; i < chiNode.length ; i++)//循环节点
	    {
			 if(nodeId!=null?chiNode[i].id==nodeId:chiNode[i].type==1)//查找定位
			  {
					var n = $('#tree-leftQyTree').tree("find",chiNode[i].id);//根据id获取节点
		       	   	$('#tree-leftQyTree').tree('select',n.target);//选中节点
		       	   	$('#tree-leftQyTree').tree('scrollTo',n.target);//滚动到节点
		       	    consId = chiNode[i].id;//客户编码
		       	    consName = chiNode[i].text;//客户名称
		       	    queryUserFiles();//查询企业档案
		       	    getbcData();//获取班次数据
		       	   	break;//找到第一个匹配的客户之后，跳出循环
			 }
	    }
	}
}


//查询下拉框 的 班次
function getbcData(){
	
		//查询下拉框的班次
		$.getJSON(webContextRoot + 'classesEnergy/selectWorkTimeSet.action', {
			  'classesEnergyModel.consId':consId
		},
		function(json){//返回值
				$('#jinjicd').combobox({
					data:json,
					valueField: 'workType',
					textField: 'codeName',
					multiple:true, 
					 formatter: function (row) { //formatter方法就是实现了在每个下拉选项前面增加checkbox框的方法  
				            var opts = $(this).combobox('options');  
				            return '<input type="checkbox" class="combobox-checkbox">' + row.codeName;
				            //row[opts.textField]  
				     },  
					onLoadSuccess:function(){
						 isSuccesLoad=true;//首次加载
						 workType = [];//班次编码 
						 codeName = [];//班次名称
						var bcData = $(this).combobox("getData");
						if(bcData.length>0){
//							for(var i=0;i<bcData.length;i++){
//								$('#jinjicd').combobox('select',bcData[i].workType);
//							}
						     //班次类型默认选择第一个
							$('#jinjicd').combobox('select',bcData[0].workType);
						}else{
							$('#jinjicd').combobox('select',''); //无数据选择质控
							getData();//查询数据
						}
					},
					onSelect: function (row) { //选中一个选项时调用  
						workType.push(row.workType);//选择的班次编码 放入  选中集合
						codeName.push(row.codeName);//选择的班次名称 放入选中集合
			        	var opts = $(this).combobox('options');  
			            //获取选中的值的values  
			            $('#jinjicd').val($(this).combobox('getValues'));  
			           //设置选中值所对应的复选框为选中状态  
			            var el = opts.finder.getEl(this, row[opts.valueField]);  
			            el.find('input.combobox-checkbox')._propAttr('checked', true);  
			            if(isSuccesLoad == true){//首次选中，查询数据
			        	   getData();//查询数据
			            }
			            if(isSuccesLoad == false){//非首次加载，点击事件
			            	getbcynpgData(data);//加载chart图
			            }
			            isSuccesLoad=false;//首次加载完之后修改变量值
			        },  
			        onUnselect: function (row) {//不选中一个选项时调用  
			        	workType.splice(workType.indexOf(row.workType),1);
			        	codeName.splice(codeName.indexOf(row.codeName),1);
			        	getbcynpgData(data);//加载chart图
			            var opts = $(this).combobox('options');  
			            //获取选中的值的values  
			            $('#xsry').val($(this).combobox('getValues'));  
			            var el = opts.finder.getEl(this, row[opts.valueField]);  
			            el.find('input.combobox-checkbox')._propAttr('checked', false);  
			        } 
				});
		    }
		);
}

//查询客户档案信息
function queryUserFiles(){
	//查询客户档案信息
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

//未选择大用户    根据日期查询所有
function getData(){
	//获取日期插件的类型
	var dlzsQueryType = $('#dlzsQueryType').combobox('getValue');
	if(dlzsQueryType == 'M'){ 					// 选择月电量
		dlzsEDate = $('#dlzsEDateM').val() + '-01';		// 拼接数据
		date = $('#dlzsEDateM').val();					// 本期时间
		dateLast = new Date(date);						// 上一期时间
		dateLast = DateUtil.dateToStr('yyyy-MM',DateUtil.dateAdd('m',1,dateLast))+'-01';
		
		thisLegendType = $('#dlzsEDateM').val();		// 本期时间
		upLegendType = dateLast;						// 上一期时间
	}else if(dlzsQueryType == 'Y'){ 					// 选择年电量
		dlzsEDate = $('#dlzsEDateY').val() + '-01-01';	// 拼接数据
		date = $('#dlzsEDateY').val();
		dateLast = new Date(date);
		dateLast = DateUtil.dateToStr('yyyy',DateUtil.dateAdd('y',1,dateLast))+'-01-01';
		
		thisLegendType = $('#dlzsEDateY').val();		// 本期时间
		upLegendType = dateLast;						// 上一期时间
	}
	
	myChart.showLoading({
		text:'正在努力的读取数据中...',
		effect:'spin'
	});
	
	$.getJSON(webContextRoot + 'classesEnergy/queryBcpgMonth.action', 
		{ 
		   //请求参数
		   'classesEnergyModel.consId': consId,			// 统计类型
		   'classesEnergyModel.beginData': dlzsEDate,	// 开始时间
		   'classesEnergyModel.endData': dateLast,		// 结束时间
		   'classesEnergyModel.GroupDateType': dlzsQueryType// 时间类型
		},
		function(json){
			getbcynpgData(json);//echarts曲线图
			data = json;//查出来的数据放入全局变量
		    myChart.hideLoading();//隐藏提示框
		}
	);
}

//echarts曲线图
function getbcynpgData(dataMap){
	var series = [];//图标曲线集
	var legend = [];
	 
	for(var i=0 ; i < codeName.length ; i++){//循环选中的班次编码
		if(codeName[i]=="早班"){
			series.push( {
		        name: codeName[i],
		        type: 'bar',
		        data:dataMap.sMap.morningValue//数据,
		    });
			legend.push('早班');
		}else if(codeName[i]=="中班"){
			series.push( {
		        name: codeName[i],
		        type: 'bar',
		        data:dataMap.sMap.afternoonValue//数据,
		    });
			legend.push('中班');
		}else if(codeName[i]=="晚班"){
			series.push( {
		        name: codeName[i],
		        type: 'bar',
		        data:dataMap.sMap.nightValue//数据,
		    });
			legend.push('晚班');
		}else if(codeName[i]=="其他班次"){
			series.push( {
		        name: codeName[i],
		        type: 'bar',
		        data:dataMap.sMap.otherValue//数据,
		    });
			legend.push('其他班次');
		}
	}
	 
	var option = {
	    title: {
	    	 text: consName+'班次用能评估',
	        y: '0px',
	        left: 'center'
	    },
	    tooltip: {
	    	trigger: 'axis',
	    	formatter: function(params) {
	    		var paramResult = '';
	    		if(params != null && params.length > 0){
	    			 paramResult = params[0].name + '<br/>';
	    		}
	    		
	    		for(var i=0;i<params.length;i++){
	    			paramResult += params[i].seriesName+':'+params[i].value+' kWh'+ '<br/>';
	    		}
	    		return paramResult;
	    	}
	    },
	    legend: {
	        left: 'center',
	        data: legend,
	        shown:false,
	        y:'25'
	    },
	    grid : {
 			 x : 65, //左边距离
 			 y : 55,//上边距离
 			 x2 : 55,//右边距离
 			 y2 : 35//下边距离
 		},
	    xAxis: {
	    	  type: 'category',
//	          boundaryGap: false,
	          data:dataMap.sMap.categes
	          },
	    yAxis: {
	    	name: '单位(kWh)',
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
	            boundaryGap: [0, 0.1]
//	            min:'auto',
//	            max:'auto'
	    },
	    series: series
	        
	};
    myChart.setOption(option,true);
}

