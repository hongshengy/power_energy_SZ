/**
 * 用能排名分析
 * @author zhou_qiang
 * @since 2017-05-05
 */
var dataDate = new Date();//当前结束时间  为当前时间
var ynsbChart = '';
var yndyChart = '';
var wdjcChart = '';
var isFlag = true;		// 点击的是哪个tab
var clickTab = "one"; 	// 页面加载选择单元能耗
var isSuccess = true;	// 首次加载
$(function(){
	//初始化echart
	ynsbChart = echarts.init(document.getElementById('ynsbChart'));
	yndyChart = echarts.init(document.getElementById('yndyChart'));

	//初始日期
	$("#dataDate").val(DateUtil.dateToStr('yyyy-MM',DateUtil.dateAdd('m',-1,dataDate)));
	
	if(consId==null || consId==''|| consId=="null"){//未获取到企业编码，加载左侧树
		
		consSelectMethod = "consSelectMethodLoad()";//定义选中后执行的方法
		consSelectHasRoot = false;//是否有区域能源根节点
		consSelectSearch("",true);
		
	}else{
		queryUserFiles(consId);
		querySubsByAll();
	}
	
	//tab页切换
	$("#tabs").tabs({
		onSelect:function(title,index){//title:标签名，index:下标
			if(index == 0){
				clickTab = "one";
				isFlag = true;		// 点击用能单元tab
				isSuccess = true;	// 首次加载
    		    yndyChart = echarts.init(document.getElementById('yndyChart'));
    		    querySubsByAll();
			}else if(index == 1){
				clickTab = "two";
				isFlag = false;		// 点击设备能耗tab
				isSuccess = true;	// 首次加载
    		    ynsbChart = echarts.init(document.getElementById('ynsbChart'));
    		    queryDevCombox();
			}
		}
	});
	
	 //查询事件
	$('#search').click(function(){
		if(isFlag == true){
			isSuccess = true;		// 设置为首次加载
			clickTab = "one";
			querySubsByAll();		// 查询单元能耗
		}else if(isFlag == false){
			isSuccess = true;		// 设置为首次加载
			clickTab = "two";
			queryDevCombox();		// 查询设备能耗
		}
	});
});

/**
 * 快搜选中节点  
 */
function consSelectMethodLoad(){
	consId = consSelectCon.id;		// 把树节点id赋给企业id
	consName = consSelectCon.text;   // 把树节点的值赋给企业名称
	queryUserFiles(consId);					// 查询用户档案
	isSuccess = true;			// 设置为首次加载
	if(isFlag == true){
		querySubsByAll();		// 查询单元能耗
	}else if(isFlag == false){
		queryDevCombox();		// 查询设备能耗
	}
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
	for(var i=0 ; i < chiNode.length ; i++)	// 循环节点
  {
		 if(nodeId!=null?chiNode[i].id==nodeId:chiNode[i].type==1)// 查找定位
		  {
			 var n = $('#tree-leftQyTree').tree("find",chiNode[i].id);// 根据id获取节点
		  	   $('#tree-leftQyTree').tree('select',n.target);//选中节点
		  	   $('#tree-leftQyTree').tree('scrollTo',n.target);//滚动到节点
          	    consId = chiNode[i].id;
          	    consName = chiNode[i].text;
          	    queryUserFiles(consId);
          	    querySubsByAll();		// 查询单元能耗
          	   	break;//跳出循环
          	   	
          }
    }
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
 * 查询设备能耗 
 */
function queryDevCombox(){
	var codeValue = '';
	// 查询设备类型
	$.ajax({
		type: "post",
		url:webContextRoot + 'energyRanking/queryDevByAll.action?consPowerInfoModel.consId='+consId,//请求地址
		dataType:"json",		// 返回类型
		cache : false,
		async : false,			// 同步异步请求
		success: function(json){
			$('#selectDev').combobox({
				data:json,
				panelWidth0:150,						// 设置下拉的宽度 和下拉框保持一致
			    panelHeight:240,					// 设置为固定高度，combobox出现竖直滚动条  
				valueField: 'codeValue',
				textField: 'codeName',
				multiple:false, 
				editable:false,   			// 定义用户是否可以直接输入文本到字段中。
				onLoadSuccess:function(){
					// 默认加载全部
					var byqData = $(this).combobox("getData");// 得到查询的list集合
		        	if(byqData.length>0){
		        		$('#selectDev').combobox('select',byqData[0].codeValue); // 默认加载全部
		        	}else{
		        		$('#selectDev').combobox('select','');// 查询不到选择空
		        	}
					
					// 获取所有设备的value
					for(var i = 0;i<json.length;i++){
						if(i != 0){
							codeValue += ',' + json[i].codeValue;
		    			}else{
		    				codeValue += json[i].codeValue;
		    			}
					}
					queryDevTopinfo(codeValue);
					isSuccess = false;
				},
				onSelect: function (row) { //选中一个选项时调用  
					// 选择的类型
					var code = row.codeValue;
					var name = row.codeName;
					// 当选择全部的时候
					if(code == "999" && name == "全部"){
						// 剔除全部这个选择
//						code = codeValue.substring(4);
						code = codeValue;
					}
					if(isSuccess == false){
						queryDevTopinfo(code);
					}
		        }
			});
		}
	});
}

/**
 * 查询用能排名信息
 */
function queryDevTopinfo(codeValue){

	// 剔除全部这个选项
	codeValue = codeValue.replace('999,','');
	var node = $('#tree-leftQyTree').tree('getSelected');//获取企业节点
	var id = consId;
	var dataDate = $('#dataDate').val();
	
	if(clickTab == "one"){
		yndyChart.showLoading({
			text:'正在努力的读取数据中...',
			effect:'spin'
		});
	}else if(clickTab == "two"){
		ynsbChart.showLoading({
			text:'正在努力的读取数据中...',
			effect:'spin'
		});
	}
	
	$.post(webContextRoot +'energyRanking/queryTopInfo.action',{
    	'consPowerInfoModel.consId': id,
        'consPowerInfoModel.dataDate': dataDate,
        'consPowerInfoModel.consIdStr': codeValue,
        'consPowerInfoModel.isFlag' : clickTab
     },
     function(data){
		
		if(clickTab == "one"){
			//用能单元排名
			queryYndyEchart(data.consMap,consName+'(单元能耗TOP10)');
			yndyChart.hideLoading();
		}
		
		if(clickTab == "two"){
			//用能设备排名
			queryYnsbEchart(data.consMap,consName+'(设备能耗TOP10)');
			ynsbChart.hideLoading();
		}
		
     },'json');
	
}

/**
 * 查询单元能耗下拉 
 */
function querySubsByAll(){
	var codeValue = '';
	$.ajax({
		type: "post",
		url:webContextRoot + 'energyRanking/querySubsByAll.action?consPowerInfoModel.consId=' + consId,//请求地址
		dataType:"json",		// 返回类型
		cache : false,
		async : false,			// 同步异步请求
		success: function(json){
			$('#selectDev').combobox({
				data:json,
				panelWidth:150,						// 设置下拉的宽度 和下拉框保持一致
			    panelHeight:240,					// 设置为固定高度，combobox出现竖直滚动条  
				valueField: 'codeValue',
				textField: 'codeName',
				multiple:false, 
				editable:false,   			// 定义用户是否可以直接输入文本到字段中。
				onLoadSuccess:function(){
					// 默认加载全部
					var byqData = $(this).combobox("getData");// 得到查询的list集合
		        	if(byqData.length>0){
		        		$('#selectDev').combobox('select',byqData[0].codeValue); // 默认加载全部
		        	}else{
		        		$('#selectDev').combobox('select','');// 查询不到选择空
		        	}
					
					// 加载成功 获取全部设备
					for(var i = 0;i<json.length;i++){
						if(i != 0){
							codeValue += ',' + json[i].codeValue;
		    			}else{
		    				codeValue += json[i].codeValue;
		    			}
					}
					queryDevTopinfo(codeValue);
					isSuccess = false;
				},
				onSelect: function (row) { //选中一个选项时调用  
					// 选择的类型
					var code = row.codeValue;
					var name = row.codeName;
					// 当选择全部的时候
					if(code == "999" && name == "全部"){
						// 剔除全部这个选择
						code = codeValue;
//						code = codeValue.substring(4);
					}
					if(isSuccess == false){
						queryDevTopinfo(code);
					}
				}
			});
		}
	});
}

/**
 * 用能设备排名 图表
 */
function queryYnsbEchart(dataMap,title){//function(dataMap, aChartTop) 
	option = {
			 title: {
			        text: title, 
			        x:'center'
			},
		    tooltip : {
		    	trigger: 'item',
		    	formatter : function(params, ticket, callback) {
					if(params == null){
						return;
					}
					var res =  params.name+
            		'<br/>能耗：'+ params.value+'kWh';
            		return res;
				}
		    },
		    legend: {
		        data: ['能耗'],
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
                boundaryGap : [0, 0.01],
                symbolSize : 1,//点直径
                splitLine: {
                    show: false,
                    lineStyle: {
                        color: '#dfdfdf',
                        width: 1,
                        type: 'dashed'
                    }
                },
		        data : dataMap.devName
		        
		    },
		    yAxis: [
		        {
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
		            min:'0',
		            max:'auto'
		        }
		    ],
		    series: [
		        {
			        name: '能耗',
	                type: 'bar',
	                barWidth:50,
	                symbolSize: 2,
	                showAllSymbol: true,
	                smooth: false,
	                yAxisIndex: 0,
	                symbol: 'circle',
	                data:dataMap.devEnergyValue,//数据,
	                itemStyle: {
	                    normal: {
	                        barBorderRadius: 0,
	                        color:'#61A0A8'
	                    }
	                }
		        }
		        
		    ]
		};

		ynsbChart.setOption(option,true);
		userResize();
}




/**
 * 用能单元排名 图表
 */
function queryYndyEchart(dataMap,title){ 
	option = {
			 title: {
			        text: title, 
			        x:'center'
			},
		    tooltip : {
		    	trigger: 'item',
		    	formatter : function(params, ticket, callback) {
					if(params == null){
						return;
					}
					var res =  params.name+
            		'<br/>能耗：'+ params.value+'kWh';
            		return res;
				}
	            /*formatter: "{b}<br/>{a}: {c}"*/
		    },
		    legend: {
		        data: ['能耗'],
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
                boundaryGap : [0, 0.01],
                symbolSize : 1,//点直径
                splitLine: {
                    show: false,
                    lineStyle: {
                        color: '#dfdfdf',
                        width: 1,
                        type: 'dashed'
                    }
                },
		        data : dataMap.subsName
//		        data : ['单元A','单元B','单元C','单元D','单元E','单元F','单元G','单元H','单元I','单元J']
		        
		    },
		    yAxis: [
		        {
		            name: '单位(kWh)',
		            type: 'value',
		           /* splitNumber: 5,
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
		            min:'0',
		            max:'auto'*/
		        }
		    ],
		    series: [
		        {
			        name: '能耗',
	                type: 'bar',
	                barWidth:50,
	                symbolSize: 2,
	                showAllSymbol: true,
	                smooth: false,
	                yAxisIndex: 0,
	                symbol: 'circle',
	                data:dataMap.subsEnergyValue,//数据,
	                itemStyle: {
	                    normal: {
	                        barBorderRadius: 0,
	                        color:'#D48265'
	                    }
	                }
		        }
		        
		    ]
		};

		yndyChart.setOption(option,true);
		userResize()
}

/**
 * 日期切换
 * @param dateTime
 */
function qytQueryOveride(dateTime){
	isSuccess = true;
	var date = $('#dataDate').val();
	var resultDay = timeUtil(dateTime,date);//DateUtil.dateAdd("d", parseInt(dateTime), DateUtil.strToDate(startDay2));//getDateByOffsetDays(startDay2,dateTime);
	$('#dataDate').val(resultDay);
	// 选择用能单元tab
	if(isFlag == true){
		querySubsByAll();
	}else{
	// 选择设备能耗tab
		queryDevCombox();
	}
	
}

/**
 * 转换时间
 * @param dateTime
 * @param startDay
 * @returns {String}
 */
function timeUtil(dateTime,startDay){
	var resultDay = DateUtil.dateAdd("m", parseInt(dateTime), DateUtil.strToDate(startDay));
	var resultStr = "";
	resultStr+=resultDay.getFullYear()+"-"+leftPad(resultDay.getMonth()+1);
	function leftPad(str){
		if(str.toString().length==1){
			return '0'+str;
		}else{
			return str;
		}
	}
	return resultStr;
}
