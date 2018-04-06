/**
 * 功率因数
 * @author 王梓璇
 * @since 2017-02-26
 */
myChart = '';
var currentdate = new Date(); 
var startDate = new Date(); // 当前开始时间 为当前时间往前推一年
var endDate = new Date();//当前结束时间  为当前时间
var dataType='1';//数据查询类型
var dataTypePop = '';
var groupDateType='yyyy-MM-dd';
var currentMonth = DateUtil.dateToStr('yyyy-MM',currentdate);
var data;			// 第一时间数据
var queryMap;		// 第二时间数据
var userCheckCos = [];	// 功率因数值

//自适应大小
function userResize(widths,heights){
	$("#userChart").width($("#userChart").parent().width());
	$("#userChart").height($("#userChart").parent().height());
	
	if(!!myChart){
		myChart.resize({
		    width: $("#userChart").parent().width(),
		    height: $("#userChart").parent().height()
		});
	}
}

$(function(){
	myChart = echarts.init(document.getElementById('userChart'));//初始化chart
	var beginDate;
	myChart.on('click', function (params) {//echarts的点击事件
		if(params.seriesIndex == 0){
			beginDate = data.sMap.currentDate[params.dataIndex].substr(0,dataType=='1'?10:7);
		}else if(params.seriesIndex == 1){//判断如果不是‘基准线’可点击
			 beginDate = queryMap.sMap.currentDate[params.dataIndex].substr(0,dataType=='1'?10:7);
		} else{
			return;
		}
		// 销毁iframe
		$('#msgwindow').dialog("destroy");
		//点击事件后:弹出窗体
		var content = "<iframe src='"+webContextRoot+"/pages/despages/monitor/powerCountsPop.jsp?beginData="+beginDate+"&consId="+consId+"&consName="+consName+"&groupDateType="+dataTypePop+"' width='100%' height='99%' frameborder='0' scrolling='no'/>";
		var boarddiv = "<div id='msgwindow' title='详情'/>";
		$(document.body).append(boarddiv);
		var win = $("#msgwindow").dialog({
			content : content,
			width : document.body.clientWidth-160,
			height : document.body.clientHeight-160,
			maximizable:true,
			closable:true,
			modal : 'shadow',
			title : consName.replace("有限公司","")+'功率因数分析',
		});
		
		win.dialog('open');
	    
	});
	
	  var elecAddrObj = document.getElementById('startMonthDate');
	  elecAddrObj.value = DateUtil.dateToStr('yyyy-MM',DateUtil.dateAdd('m',0,endDate));
	  var AddrObj = document.getElementById('startYearDate');
	  AddrObj.value = DateUtil.dateToStr('yyyy',DateUtil.dateAdd('y',0,endDate));
	  
	  var elecAddrObjUp = document.getElementById('startMonthDateUp');
	  elecAddrObjUp.value = DateUtil.dateToStr('yyyy-MM',DateUtil.dateAdd('m',-1,endDate));
	  var AddrObjUp = document.getElementById('startYearDateUp');
	  AddrObjUp.value = DateUtil.dateToStr('yyyy',DateUtil.dateAdd('y',-1,endDate));
	  if(consId==null || consId==''|| consId=="null"){//未获取到企业编码，加载左侧树
		  
			consSelectMethod = "consSelectMethodLoad()";//定义选中后执行的方法
			consSelectHasRoot = false;//是否有区域能源根节点
			consSelectSearch("",true);  
		  
	 }else{
		  queryUserFiles();//查询上头客户信息
		  getData();//加载班次下拉
	}
	 //查询事件
	$('#search').click(function(){
		getData();//查询数据
	});
	//电量计算方法下拉
	   $('#jinjicd').combobox({
		 width: 100,
		 panelWidth: null,
		 valueField:'id',
	     textField:'text',
		 editable: false,
      onSelect: function(rec){
     	 dataType = rec.id;//数据查询类型
     	 if(dataType =='1'){
     		groupDateType = 'yyyy-MM-dd';//月功率因数，统计到  yyyy-MM-dd 的，一个月的多少天
     		dataTypePop = 'h';
     		$('#startMonthDate').css('display','inline-block');
     		$('#startYearDate').css('display','none');
     		// 第二时间显示月份
     		$('#startMonthDateUp').css('display','inline-block');
     		$('#startYearDateUp').css('display','none');
     	 }else if(dataType =='2'){//年功率因数、统计到  yyyy-MM 的，一年12个月
     		groupDateType = 'yyyy-MM';
     		dataTypePop = 'm';
     		$('#startMonthDate').css('display','none');
     		$('#startYearDate').css('display','inline-block');
     		
     		// 第二时间显示年份
     		$('#startMonthDateUp').css('display','none');
     		$('#startYearDateUp').css('display','inline-block');
     	 }
		},
		data: [{
			id: '1',
			text: '月功率因数',
			selected:true   
		},{
			id: '2',
			text: '年功率因数'
		}]
     }); 
	 
	 //左减日期
		$('#left').click(function(){
			 if(dataType =='1'){//如果是月的话
				 var startDate =  $('#startMonthDate').val();//获取当前开始日期
				 var nowDate = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('m',-1,DateUtil.strToDate(startDate)));//月份减1
				 $('#startMonthDate').val(nowDate.substr(0,7));//重新赋值
				 getData();
			 }else{
				 var startDate =  $('#startYearDate').val();//获取当前开始日期
				 var nowDate = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('y',-1,DateUtil.strToDate(startDate+'-01-01')));//年份减1
				 $('#startYearDate').val(nowDate.substr(0,4));//重新赋值
				 getData();
			 }
		});
		
		 //右加日期
		$('#right').click(function(){
			 if(dataType =='1'){//如果是月的话
				 var startDate =  $('#startMonthDate').val();//开始日期
				 var nowDate = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('m',1,DateUtil.strToDate(startDate)));//月份加1
				 $('#startMonthDate').val(nowDate.substr(0,7));//重新赋值
				 getData();
			 }else{
				 var startDate =  $('#startYearDate').val();//获取当前开始日期
				 var nowDate = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('y',1,DateUtil.strToDate(startDate+'-01-01')));//年份减1
				 $('#startYearDate').val(nowDate.substr(0,4));//重新赋值
				 getData();
			 }
		});
		
		
		//左减日期
		$('#leftUp').click(function(){
			 if(dataType =='1'){//如果是月的话
				 var startDate =  $('#startMonthDateUp').val();//获取当前开始日期
				 var nowDate = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('m',-1,DateUtil.strToDate(startDate)));//月份减1
				 $('#startMonthDateUp').val(nowDate.substr(0,7));//重新赋值
				 getData();
			 }else{
				 var startDate =  $('#startYearDateUp').val();//获取当前开始日期
				 var nowDate = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('y',-1,DateUtil.strToDate(startDate+'-01-01')));//年份减1
				 $('#startYearDateUp').val(nowDate.substr(0,4));//重新赋值
				 getData();
			 }
		});
		
		 //右加日期
		$('#rightUp').click(function(){
			 if(dataType =='1'){//如果是月的话
				 var startDate =  $('#startMonthDateUp').val();//开始日期
				 var nowDate = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('m',1,DateUtil.strToDate(startDate)));//月份加1
				 $('#startMonthDateUp').val(nowDate.substr(0,7));//重新赋值
				 getData();
			 }else{
				 var startDate =  $('#startYearDateUp').val();//获取当前开始日期
				 var nowDate = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('y',1,DateUtil.strToDate(startDate+'-01-01')));//年份减1
				 $('#startYearDateUp').val(nowDate.substr(0,4));//重新赋值
				 getData();
			 }
		});
});

/**
 * 快搜选中节点  
 */
function consSelectMethodLoad(){
	consId = consSelectCon.id;		// 把树节点id赋给企业id
	consName = consSelectCon.text;   // 把树节点的值赋给企业名称
	queryUserFiles();					// 查询用户档案
	getData();						//加载班次下拉
}

//选中节点
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
		 if(nodeId!=null?chiNode[i].id==nodeId:chiNode[i].type==1)//查找定位
		  {
			  	var n = $('#tree-leftQyTree').tree("find",chiNode[i].id);//根据id获取节点
          	   	$('#tree-leftQyTree').tree('select',n.target);//选中节点
          	   	$('#tree-leftQyTree').tree('scrollTo',n.target);//滚动到节点
          	    consId = chiNode[i].id;
          	    consName = chiNode[i].text;
          	    queryUserFiles();
          	    getData();
          	   	break;//跳出循环
		 }
    }
}

function queryUserFiles(){
	//查询设置时间
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
	if(dataType=='1'){
		var startDate =  $('#startMonthDate').val();//按月查询
		var startDateUp =  $('#startMonthDateUp').val();//按月查询
	}else{
		var startDate =  $('#startYearDate').val();//开始日期
		var startDateUp =  $('#startYearDateUp').val();//开始日期
	}
	
	var endDate =  $('#endDate').val();//结束日期
	if(startDate> endDate){
		$.messager.alert('提示', "开始日期不能大于结束日期！", 'warning');
		return;
	}
	
	myChart.showLoading({
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
	
	// 第二时间查询数据
	$.ajax({
		type: "post",
		url:webContextRoot + 'powerFactorAnalyze/queryglysValue.action',//请求地址
		data: "classesEnergyModel.beginData=" + startDateUp + "&classesEnergyModel.consId=" + consId + "&classesEnergyModel.groupDateType="+groupDateType,//得到时间+用户ID
		dataType:"json",		// 返回类型
		cache : false,
		async : false,			// 同步异步请求
		success: function(result){
			queryMap = result;
		}
	});
	
	// 第一时间查询数据
	$.getJSON(webContextRoot + 'powerFactorAnalyze/queryglysValue.action',  
		{ 
		   //请求参数
			'classesEnergyModel.beginData': startDate,//开始时间
			'classesEnergyModel.consId': consId,//统计类型
			'classesEnergyModel.groupDateType': groupDateType//统计类型  按年，月，日统计分析
		},
		function(json){
			var temp = '';
			var date = '';
			var by = '';
			var startDate =  $('#startMonthDate').val();
			// 第二时间
			var startDateUp =  $('#startMonthDateUp').val();
			if(dataType=='1'){//选择月份的时候
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
		    }else{//选择年的时候
		    	var startDate =  $('#startYearDate').val();//开始日期
		    	if(json.sMap.crL==0){
		    		temp = startDate+'年无功率因数数据。';
		    	}
		    	if(json.sMap.preCrCount>0){//当年超容
		    		 temp = startDate+'年有'+json.sMap.preCrCount+'个月低于预警值,可能面临罚款，';
		    	}
		    	if(json.sMap.preCrCount==0&&json.sMap.crL>0){
		    		temp = startDate+'年，全年功率因数均正常。';
		    	}
		    }
			var desc = '';//上期本期增长情况
			var consNoObj = document.getElementById('avgCr');
			if(json.sMap.avgPlateHH != "" && json.sMap.avgPlateHH>0){
				if(dataType =='1'){//如果是月的话
					if(json.sMap.avglastCrplate>0){
						desc = '较上月平均功率因数有所上升。';
					}
				}else{
					if(json.sMap.avglastCrplate>0){
					desc = '较去年平均功率因数有所上升。';
					}
				}
			}else if(json.sMap.avgPlateHH != "" && json.sMap.avgPlateHH<0){
				if(dataType =='1'){//如果是月的话
					if(json.sMap.avglastCrplate>0){
						desc = '较上月平均功率因数有所下降。';
					}
				}else{
					if(json.sMap.avglastCrplate>0){
					desc = '较去年平均功率因数有所下降。';
					}
				}
				
			}else if(json.sMap.avgPlateHH != "" && json.sMap.avgPlateHH==0){
				if(dataType =='1'){//如果是月的话
					if(json.sMap.avglastCrplate>0){
						desc = '两月平均功率因数持平。';
					}
				}else{
					if(json.sMap.avglastCrplate>0){
						desc = '两年平均功率因数持平。';					
		             }
				}
			}
			consNoObj.innerHTML =temp+ desc+by;
			getpowerCountData(json,queryMap,userCheckCos);
			data = json;
		    myChart.hideLoading();
		}
	);
}

//echarts曲线图
function getpowerCountData(dataMap,queryMap,userCheckCos){
	var series = [];//图标曲线集
	var legend = [];
	// tooltip 中显示的时间
	var tooltipDate = '';
	var tooltipDateUp = '';
	 if(dataType =='1'){//如果是月的话
		 var startDate =  $('#startMonthDate').val()+'月';//开始日期
		 var lastDate = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('m',-1,DateUtil.strToDate(startDate)));//月份加1
	     var lastNewDate = lastDate.substr(0,7)+'月';//重新赋值
	     
	     var startDateUp =  $('#startMonthDateUp').val()+'月';//开始日期
	     
	     tooltipDate = $('#startMonthDate').val();
	     tooltipDateUp = $('#startMonthDateUp').val();
	 }else{
		 var startDate =  $('#startYearDate').val()+'年';//获取当前开始日期
		 var lastDate = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('y',-1,DateUtil.strToDate(startDate+'-01-01')));//年份减1
		 var lastNewDate = lastDate.substr(0,4)+'年';//重新赋值
		 
		 var startDateUp =  $('#startYearDateUp').val()+'年';//获取当前开始日期
		 tooltipDate = $('#startYearDate').val();
	     tooltipDateUp = $('#startYearDateUp').val();
	 }
	series.push( {
        name: startDate+'功率因数',
        type: 'line',
        data:dataMap.sMap.glysData//数据,
    } );
	series.push( {
        name:startDateUp+'功率因数',
        type: 'line',
        data:queryMap.sMap.glysData//上期数据,
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
			        // 支持 'average', 'min', 'max'
			        type: 'average',
			        label:{normal:{formatter:'{c}'}}
			   }
            ]
        }
    });
	legend.push(startDate+'功率因数');
	legend.push(startDateUp+'功率因数');
	var option = {
	    title: {
	    	 text: consName+'功率因数',
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
	    					// 正向有功
	    					var data1 = null;
	    					// 正向无功
	    					var data2 = null;
	    					if(typeof params[i].value == 'undefined'){
								data = '-';
							}else{
								data = params[i].value;
							}		
							if(typeof dataMap.sMap.PapData[params[i].dataIndex] == 'undefined'){
								data1 = '-';
							}else{
								data1 = dataMap.sMap.PapData[params[i].dataIndex];
							}			
							if(typeof dataMap.sMap.PrpsData[params[i].dataIndex] == 'undefined'){
								data2 = '-';
							}else{
								data2 = dataMap.sMap.PrpsData[params[i].dataIndex];
							}
		    				paramResult = tooltipDate + '-' + params[0].name +'<br/>';
							paramResult +=  '功率因数 : ' + data + '<br/>';
							paramResult +=  '正向有功 : ' + data1 + 'kWh<br/>';
							paramResult +=  '正向无功 : ' + data2 + 'kWh<br/>';
		    			}else if(params[i].seriesIndex == 1){
		    				
		    				// 功率因数
	    					var data3 = null;
	    					// 正向有功
	    					var data4 = null;
	    					// 正向无功
	    					var data5 = null;
	    					if(typeof params[i].value == 'undefined'){
								data3 = '-';
							}else{
								data3 = params[i].value;
							}
							if(typeof queryMap.sMap.PapData[params[i].dataIndex] == 'undefined'){
								data4 = '-';
							}else{
								data4 = queryMap.sMap.PapData[params[i].dataIndex];
							}
							
							if(typeof queryMap.sMap.PrpsData[params[i].dataIndex] == 'undefined'){
								data5 = '-';
							}else{
								data5 = queryMap.sMap.PrpsData[params[i].dataIndex]; 
							}
		    				paramResult +=  tooltipDateUp + '-' + params[i].name +'<br/>';
							paramResult += '功率因数 : '  + data3 + '<br/>';
							paramResult +=  '正向有功 : ' + data4 + 'kWh<br/>';
							paramResult +=  '正向无功 : ' + data5 + 'kWh<br/>';
		    			}
	    			}
					return paramResult;
	    		}
	    	}
	    },
	    legend: {
	        left: 'center',
	        data: legend,
	        shown:false,
	        y:'30'
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
	    grid : {
 			 x : 40, //左边距离
 			 y : 55,//上边距离
 			 x2 : 55,//右边距离
 			 y2 : 25//下边距离
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
    myChart.setOption(option,true);
	
}

