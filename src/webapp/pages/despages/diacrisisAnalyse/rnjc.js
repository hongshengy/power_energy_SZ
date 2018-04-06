/**
 * 热能监测
 * @author sunchao
 * @since 2017-05-15
 */
var dataDate = new Date();//当前结束时间  为当前时间
//var consId='';//客户编码
var fzjcChart = '';
var wdjcChart = '';
var tabo = 'lijc';
var tabt = 'fzjc_chart';
//var tabth = 'wdjc';
var tabf = 'wdjc_chart';
//var fzFlag = false;
//var wdFlag = false;
var tabFlag = 'lijc';
var taby = 'yljc_chart';
var yljcChart = '';

$(function(){
	//初始化echart
	fzjcChart = echarts.init(document.getElementById('fzjcChart'));
	
	//加载Tab页信息
	$('#tabs').tabs({
       fit: true,//填充大小
       plain: true,
       onSelect: function(title,index){
	    	   if(index == 0){
	    		   //初始化流量监测echart
	    		   fzjcChart = echarts.init(document.getElementById('fzjcChart'));
	    		   tabFlag = 'lijc';
	    		   //流量监测
	    		   queryFzjc(null,null);
	    	   }else if(index == 1){
	    		   //初始化温度监测echart
	    		   wdjcChart = echarts.init(document.getElementById('wdjcChart'));
	    		   tabFlag = 'wdjc';
	    		   //温度监测
	    		   queryWdjc(null,null);
	    	   }else if(index == 2){
	    		   //查询压力监测echart
	    		   yljcChart = echarts.init(document.getElementById('yljcChart'));
	    		   tabFlag = 'yljc';
	    		   //压力监测
	    		   queryYljc(null,null);
	    	   }
    	  }
	 }); 
	
	//初始化日期
	$("#dataDate").datebox('setValue',DateUtil.dateToStr('yyyy-MM-dd',dataDate));
	
	if(consId==null || consId==''|| consId=="null"){//未获取到企业编码，加载左侧树
		$('#tree-leftQyTree').tree({ //默认没参数，获取区域  企业  都是打开状态
			url:webContextRoot +'destree/queryTree.action',
		    method:'get',
		    multiple:false,//是否支持多选
		    editable:'true' ,
		    onClick: function(node){
		    	// 获取根节点
		    	var rootNode = $('#tree-leftQyTree').tree('getRoot',node.target);
		    	// 不是根节点时，刷新页面
		    	if(rootNode.id != node.id){
					consId = node.id;
					consName = node.text;
					//查询企业信息
					queryUserFiles(consId);
					//查询设备
					querySb();
		    	}else{
		    		$.messager.alert('提示', '请选择客户', 'warning');
		    	}
			},
			onLoadSuccess:function(node, data){//加载成功返回
				selectTree();//设置树默认选中节点
			}
		});
		//树模糊检索   方法来自  treeSelect.js
		searchTreeNode();
	}else{
		//查询企业信息
		queryUserFiles(consId);
		//查询设备
		querySb();
	}
	
	 //查询事件
	$('#search').click(function(){
		if(tabFlag == 'lijc'){
			queryFzjc(tabt,null);
		}else if(tabFlag == 'wdjc'){
			queryWdjc(tabf,null);
		}else if(tabFlag == 'yljc'){
			queryYljc(taby,null);
		}
	});
	
	//时间点下拉选项
	$('#QueryType').combobox({
		 width: 100,
		 panelWidth: null,
		 valueField:'id',
	     textField:'text',
		 editable: false,
		 data: [{
			id: '288',
			text: '288点',
			selected:true   
		 },{
			id: '1440',
			text: '1440点'
		 }]
	}); 
});


/**
 * 查询企业下变压器设备
 */
function querySb(){
	var node = $('#tree-leftQyTree').tree('getSelected');
	
	$.post(webContextRoot +'sfgSub/queryPowerList.action',{
    	'sfGTranModel.consId': consId
     },
     function(data){
		$('#sbType').combobox({
			width: 150,
			panelWidth: null,
			data:data,
			valueField: 'tranId',
			textField: 'tranName',
			editable: false,
			onLoadSuccess:function(){
				var sbData = $(this).combobox("getData");
				if(sbData.length>0){
					$('#sbType').combobox('select',sbData[0].tranId);
				}else{
					$('#sbType').combobox('select','');
					tranId = '';
					tranName = '';
					queryDev(tranId);
					if(tabo == 'lijc'){
						queryFzjc('fzjc_chart',data.tranId);
					}
					if(tabo == 'wdjc'){
						queryWdjc('wdjc_chart',data.tranId);
					}
					if(tabo == 'yljc'){
						queryYljc('yljc_chart',data.tranId);
					}
				}
			},
			onSelect:function(data){
				if(tabo == 'lijc'){
					queryFzjc('fzjc_chart',data.tranId);
				}
				if(tabo == 'wdjc'){
					queryWdjc('wdjc_chart',data.tranId);
				}
				if(tabo == 'yljc'){
					queryYljc('yljc_chart',data.tranId);
				}
				queryDev(data.tranId);
			}
		});
			
     },'json');
}

/**
 * 查询客户信息
 * @param consId
 */
function queryUserFiles(consId){
	  $.getJSON(webContextRoot + 'charge/queryuserFiles.action', {
		  'sfdConsModel.consId':consId
	  },
	  function(json){
		  //客户编号
		  var consNoObj = document.getElementById('consNo');
		  var consNOName = "客户编号: "
		  consNoObj.innerHTML = consNOName+json[0].consNo;
		  $('#consNo').attr("title",json[0].consNo);
		  
		  //客户名称
		  var consNameObj = document.getElementById('consName');
		  var consNameName = "客户名称: "
		  var consNameStr = json[0].consName;
		  consNameObj.innerHTML = consNameName+consNameStr;
		  $('#consName').attr("title",consNameStr);
		  
		  //合同容量
		  var contractCapObj = document.getElementById('htrl');
		  var contractCapName = "合同容量(kVA): "
		  contractCapObj.innerHTML = contractCapName+json[0].contractCap;
		  $('#htrl').attr("title",json[0].contractCap);
		  
		  //用电地址
		  var elecAddrObj = document.getElementById('address');
		  var elecAddrName = "用电地址: "
		  var elecAddrNameStr = json[0].elecAddr;
		  if(elecAddrNameStr.length>10){
			  elecAddrObj.innerHTML = elecAddrName+elecAddrNameStr.substring(0,10)+'...';
		  }else{
			  elecAddrObj.innerHTML = elecAddrName+elecAddrNameStr;
		  }
		  $('#address').attr("title",elecAddrNameStr);
		  
		  //客户状态
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
 * 负载监测
 */
function queryFzjc(tabtwo,tranId){
	var node = $('#tree-leftQyTree').tree('getSelected');//获取企业节点
	var id = consId;
	var b = $('#dataDate').datebox('getValue');
	//var c = $('#QueryType').combobox('getValue');
	
	fzjcChart.showLoading({
		text:'正在努力的读取数据中...',
		effect:'spin'
	});
	var a = tranId;
	if(a == null){
		a = $('#sbType').combobox('getValue');
	}
	
	/*$.post(webContextRoot +'sfgSub/queryConsDeviceFZInfo.action',{
    	'consPowerInfoModel.deviceId': a,
        'consPowerInfoModel.dataDate': $('#dataDate').datebox('getValue'),
        'consPowerInfoModel.queryType': $('#QueryType').combobox('getValue')
     },
     function(data){
    	var title = $('#sbType').combobox('getText') ==''?'':'('+$('#sbType').combobox('getText')+')';
		queryFZEchart(data.consMap,consName+''+title);
		fzjcCount(consName,$('#sbType').combobox('getText'),$('#dataDate').datebox('getValue'),data.consMap); 
		fzjcChart.hideLoading();
     },'json');*/
	queryFZEchart(null,consName);
	fzjcChart.hideLoading();
}


/**
 * 流量监测 图表
 */
function queryFZEchart(dataMap,title){//function(dataMap, aChartTop)
	var x = [];
	var y = [];
	for(var i = 0;i<24;i++){
		x.push(setTime(i));
		y.push(Math.floor(Math.random()*100));
	}
	option = {
		    title: {
		        text: title, 
		        x:'center'
		    },
		    tooltip : {
				trigger: 'axis', // tip 类型
				formatter : function(params, ticket, callback) {
					if(params == null ||params[0] == null){
						return;
					}
					var res = params[0].seriesName + 
            	    '<br/>时间：'+ params[0].name+
            		'<br/>流量：'+ params[0].value+'m³';
            		return res;
				}
			},
		    legend: {
		        data: ['流量'],
		        x:'center',
		        y:'35'
		    },
		    toolbox:{
		    	show:true,
		    	feature:{
		    		dataZoom:{},
		    		//dataView:{readOnly:false},
		    		magicType:{type:['line','bar']},
		    		restore:{},
		    		saveAsImage:{}
		    	}
		    },
		    grid : {
				 x : 55, //左边距离
				 y : 75,//上边距离
				 x2 : 35,//右边距离
				 y2 : 35//下边距离
			 },
		    xAxis: {
		        type: 'category',
		        //boundaryGap: false,
		        //data : dataMap.dataDate
		        data: x,
		    },
		    yAxis: [{
	            name: '单位(m³)',
	            type: 'value',
	            //splitNumber: 5,
	            /*splitLine: {
	                lineStyle: {
	                    color: '#dfdfdf',
	                    width: 0,
	                    type: 'dashed'
	                }
	            },
	            axisLabel: {
	                formatter: '{value}'
	            }*/
	        }], 
		    series: [
		        {
		            name:'流量',
		            type:'bar',
		            /*itemStyle:{
		            	normal:{
		            	color:'#FF6E63'
		            	}
		            },*/
		            //data : dataMap.powerValue
		            data : y
		        },
		        {
  		            name:'流量预警线',
  		            type:'line',
  		            data:[100],
  		            itemStyle:{
  		                normal:{opacity:0}
  		            },
  		            markLine: {
  		                symbolSize:[0,0],
  		                lineStyle:{
  		                    normal:{type:'dashed',color:'red'},
  		                    emphasis:{width:1}
  		                },
  		                data: [{
  		                	// 支持 'average', 'min', 'max'
  		                	type: 'average'
  		                }]
  		            }
  		        }
		    ]
		};

		fzjcChart.setOption(option,true);
		userResize()
}

  /**
   * 温度曲线
   */
  function queryWdjc(tabtwo,tranId){
		var node = $('#tree-leftQyTree').tree('getSelected');//获取企业节点
		var id = consId;
		var b = $('#dataDate').datebox('getValue');
		//var c = $('#QueryType').combobox('getValue');
	  
		wdjcChart.showLoading({
			text:'正在努力的读取数据中...',
			effect:'spin'
		});
		var a = tranId;
		if(a == null){
			a = $('#sbType').combobox('getValue');
		}
	    /*$.post(webContextRoot +'sfgSub/queryConsDeviceWDInfo.action',{
	    	'consPowerInfoModel.deviceId': a,
	        'consPowerInfoModel.dataDate': $('#dataDate').datebox('getValue'),
	        'consPowerInfoModel.queryType': $('#QueryType').combobox('getValue')
	     },
	     function(data){
	    	 var title = $('#sbType').combobox('getText') ==''?'':'('+$('#sbType').combobox('getText')+')';
			 queryWDEchart(data.consMap,consName+''+title);
	  	     wdjcCount(consName,$('#sbType').combobox('getText'),$('#dataDate').datebox('getValue'),data.consMap); 
		  	 wdjcChart.hideLoading();
	     },'json');*/
		queryWDEchart(null,consName);
		wdjcChart.hideLoading();
  }

  /**
   * 温度监测统计
   * @param consName
   * @param devName
   * @param dataDate
   * @param dataMap
   * @returns
   */
  function wdjcCount(consName,devName,dataDate,dataMap){
  	var wd = 80; 
  	var wdCount = 0;
  	var maxaWd = 0;
  	var minaWd = 0;
  	var maxbWd = 0;
  	var minbWd = 0;
  	var maxcWd = 0;
  	var mincWd = 0;
  	var tpaFlag = false;
  	var tpbFlag = false;
  	var tpcFlag = false;
  	var tpaCount = 0;
  	var tpbCount = 0;
  	var tpcCount = 0;
  	for(var i = 0;i<dataMap.tpaValue.length;i++){
  		var a = dataMap.tpaValue[i];
  		if(a != '-' ){
  			if(tpaFlag == false){
  				maxaWd = parseFloat(a);
  				minaWd = parseFloat(a);
  				tpaFlag = true;
  			}else{
  				if(maxaWd < parseFloat(a)){
  					maxaWd = parseFloat(a);
  				}
  				if(minaWd > parseFloat(a)){
  					minaWd = parseFloat(a);
  				}
  			}
  			if(parseFloat(a) > wd){
  				wdCount ++;
  			}
  		}else{
  			tpaCount ++;
  		}
  	}
  	for(var i = 0;i<dataMap.tpbValue.length;i++){
  		var a = dataMap.tpbValue[i];
  		if(a != '-' ){
  			if(tpbFlag == false){
  				maxbWd = parseFloat(a);
  				minbWd = parseFloat(a);
  				tpbFlag = true;
  			}else{
  				if(maxbWd < parseFloat(a)){
  					maxbWd = parseFloat(a);
  				}
  				if(minbWd > parseFloat(a)){
  					minbWd = parseFloat(a);
  				}
  			}
  			if(parseFloat(a) > wd){
  				wdCount ++;
  			}
  		}else{
  			tpbCount ++;
  		}
  	}
  	for(var i = 0;i<dataMap.tpcValue.length;i++){
  		var a = dataMap.tpcValue[i];
  		if(a != '-' ){
  			if(tpcFlag == false){
  				maxcWd = parseFloat(a);
  				mincWd = parseFloat(a);
  				tpcFlag = true;
  			}else{
  				if(maxcWd < parseFloat(a)){
  					maxcWd = parseFloat(a);
  				}
  				if(mincWd > parseFloat(a)){
  					mincWd = parseFloat(a);
  				}
  			}
  			if(parseFloat(a) > wd){
  				wdCount ++;
  			}
  		}else{
  			tpcCount ++;
  		}
  	}
  	
  	var str = '';
  	if(devName == ''){
  		str = str + '该客户没有变压器设备。'
  	}else{
  		str = str + devName+' '+dataDate+'。';
  		var x = tpaCount+tpbCount+tpcCount;
  	  	var y = dataMap.tpaValue.length+dataMap.tpbValue.length+dataMap.tpcValue.length;
  	  	if(x == y){
  	  		str = str +'最高温度为： - ℃.最低温度为： - ℃.预警次数为： - 次.';
  	  	}else{
  	  		var maxWd = 0;
  	  	  	var minWd = 0;
  	  	  	if(maxaWd != 0){
  	  	  		maxWd = maxaWd;
  	  	  	}else if(maxbWd != 0){
  	  	  		maxWd = maxbWd;
  	  	  	}else if(maxcWd != 0){
  	  	  		maxWd = maxcWd;
  	  	  	}
  	  	  	if(minaWd != 0){
  	  	  		minWd = minaWd;
  	  	  	}else if(maxbWd != 0){
  	  	  		minWd = minbWd;
  	  	  	}else if(maxcWd != 0){
  	  	  		minWd = mincWd;
  	  	  	}
  	  	  	
  	  	  	if(maxbWd != 0 && maxbWd > maxWd){
  	  	  		maxWd = maxbWd;
  	  	  	}
  	  	  	if(maxcWd != 0 && maxcWd > maxWd){
  	  	  		maxWd = maxcWd;
  	  	  	}
  	  	  	
  	  	  	if(minbWd != 0 && minbWd < minWd){
  	  	  		minWd = minbWd;
  	  	  	}
  	  	  	if(mincWd != 0 && mincWd < minWd){
  	  	  		minWd = mincWd;
  	  	  	}
  	  		str = str +'最高温度为： '+maxWd+' ℃.最低温度为： '+minWd+' ℃.预警次数为： '+wdCount+' 次.';
  	  	}
  	}
  	$('#yjfx').text(str);
  }

/**
 * 温度监测 图表
 */
function queryWDEchart(dataMap,title){
	var x = [];
	var y = [];
	for(var i = 0;i<24;i++){
		x.push(setTime(i));
		y.push(Math.floor(Math.random()*100));
	}
  	option = {
	    title: {
	        text: title, 
	        x:'center'
	    },
	    tooltip : {
			trigger: 'axis', // tip 类型
			formatter : function(params, ticket, callback) {
				if(params == null ||params[0] == null){
					return;
				}
				var res = params[0].name;
				for(var i =0;i<params.length-1;i++){
					res = res + '<br/>'+ params[i].seriesName+':'+ params[i].value+'℃'; 
				}
				return res;
			}
		},
	    legend: {
	        data: ['温度'],
	        x:'center',
	        y:'35'
	    },
	    toolbox:{
	    	show:true,
	    	feature:{
	    		dataZoom:{},
	    		//dataView:{readOnly:false},
	    		//magicType:{type:['line','scatter']},
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
	        //data : dataMap.dataDate
	        data: x,
	    },
	    yAxis: [{
            name: '单位℃',
            type: 'value',
            //splitNumber: 5,
            /*splitLine: {
                lineStyle: {
                    color: '#dfdfdf',
                    width: 0,
                    type: 'dashed'
                }
            },
            axisLabel: {
                formatter: '{value}'
            }*/
        }],
	    series: [
	        {
	            name:'温度',
	            type:'scatter',
	            //data : dataMap.tpaValue
	            data : y,
	        },
	        {
	            name:'温度预警线',
	            type:'line',
	            data:[100],
	            itemStyle:{
	                normal:{opacity:0}
	            },
	            markLine: {
	                symbolSize:[0,0],
	                lineStyle:{
	                    normal:{type:'dashed',color:'red'},
	                    emphasis:{width:1}
	                },
	                data: [{
	                	// 支持 'average', 'min', 'max'
	                	type: 'average'
	                }]
	            }
	        }
	    ]
	};

	wdjcChart.setOption(option,true);
	userResize();
}

/**
 * 根据设备id查询设备信息
 */
function queryDev(devId){
	$.post(webContextRoot +'sfgSub/queryPowerList.action',
	   {'sfGTranModel.tranId':devId},
	   function(data){
		 if(data.length>0){
			   $("#eddy").text(data[0].tranKindName==""?'-':data[0].tranKindName);
			   $("#eddl").text(data[0].factoryNameS==""?'-':data[0].factoryNameS);
			   $("#edrl").text(data[0].plateCap==""?'-':(data[0].plateCap+'kVA'));
			   
			   $("#sbbh").text(data[0].tranVoltName==""?'-':(data[0].tranVoltName));
			   $("#ztrq").text(data[0].createDate==""?'-':data[0].createDate.slice(0,data[0].createDate.indexOf(' ')));
			   $("#yxzt").text(data[0].runStatusName==""?'-':data[0].runStatusName);
			   
		   }
	   },"json");
}    

/**
 * 压力曲线
 */
function queryYljc(tabtwo,tranId){
		var node = $('#tree-leftQyTree').tree('getSelected');//获取企业节点
		var id = consId;
		var b = $('#dataDate').datebox('getValue');
		//var c = $('#QueryType').combobox('getValue');
	  
		yljcChart.showLoading({
			text:'正在努力的读取数据中...',
			effect:'spin'
		});
		var a = tranId;
		if(a == null){
			a = $('#sbType').combobox('getValue');
		}
	    /*$.post(webContextRoot +'sfgSub/queryConsDeviceWDInfo.action',{
	    	'consPowerInfoModel.deviceId': a,
	        'consPowerInfoModel.dataDate': $('#dataDate').datebox('getValue'),
	        'consPowerInfoModel.queryType': $('#QueryType').combobox('getValue')
	     },
	     function(data){
	    	 var title = $('#sbType').combobox('getText') ==''?'':'('+$('#sbType').combobox('getText')+')';
			 queryYLEchart(data.consMap,consName+''+title);
	  	     yljcChart.hideLoading();
	     },'json');*/
		 queryYLEchart(null,consName);
  	     yljcChart.hideLoading();
	  
}

/**
 * 压力监测 图表
 */
function queryYLEchart(dataMap,title){
	var x = [];
	var y = [];
	for(var i = 0;i<24;i++){
		x.push(setTime(i));
		y.push(Math.floor(Math.random()*100));
	}
  	option = {
	    title: {
	        text: title, 
	        x:'center'
	    },
	    tooltip : {
			trigger: 'axis', // tip 类型
			formatter : function(params, ticket, callback) {
				if(params == null ||params[0] == null){
					return;
				}
				var res = params[0].name;
				for(var i =0;i<params.length-1;i++){
					res = res + '<br/>'+ params[i].seriesName+':'+ params[i].value+'N'; 
				}
				return res;
			}
		},
	    legend: {
	        data: ['压力'],
	        x:'center',
	        y:'35'
	    },
	    toolbox:{
	    	show:true,
	    	feature:{
	    		dataZoom:{},
	    		//dataView:{readOnly:false},
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
	        //data : dataMap.dataDate
	        data: x,
	    },
	    yAxis: [{
            name: '单位(Pa)',
            type: 'value',
            //splitNumber: 5,
            /*splitLine: {
                lineStyle: {
                    color: '#dfdfdf',
                    width: 0,
                    type: 'dashed'
                }
            },
            axisLabel: {
                formatter: '{value}'
            }*/
        }],
	    series: [
	        {
	            name:'压力',
	            type:'line',
	            //data : dataMap.tpaValue
	            data : y,
	        },
	        {
	            name:'压力预警线',
	            type:'line',
	            data:[100],
	            itemStyle:{
	                normal:{opacity:0}
	            },
	            markLine: {
	                symbolSize:[0,0],
	                lineStyle:{
	                    normal:{type:'dashed',color:'red'},
	                    emphasis:{width:1}
	                },
	                data: [{
	                	// 支持 'average', 'min', 'max'
	                	type: 'average'
	                }]
	            }
	        }
	    ]
	};

	yljcChart.setOption(option,true);
	userResize();
}

/**
 * 切换日期
 * @param dateTime
 */
function qytQueryOveride(dateTime){
	var date = $('#dataDate').val();
	var resultDay = timeUtil(dateTime,date);//DateUtil.dateAdd("d", parseInt(dateTime), DateUtil.strToDate(startDay2));//getDateByOffsetDays(startDay2,dateTime);
	$('#dataDate').datebox('setValue',resultDay);
	
	if(tabFlag == 'lijc'){
		queryFzjc(tabt,null);
	}else if(tabFlag == 'wdjc'){
		queryWdjc(tabf,null);
	}else if(tabFlag == 'yljc'){
		queryYljc(taby,null);
	}
}

/**
 * 日期转换
 * @param dateTime
 * @param startDay
 * @returns {String}
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
		 if(nodeId!=null?chiNode[i].id==nodeId:chiNode[i].type==1)//查找定位
		  {
				var n = $('#tree-leftQyTree').tree("find",chiNode[i].id);//根据id获取节点
	       	   	$('#tree-leftQyTree').tree('select',n.target);//选中节点
	       	   	$('#tree-leftQyTree').tree('scrollTo',n.target);//滚动到节点
	       	    consId = chiNode[i].id;
	       	    consName = chiNode[i].text;
		       	queryUserFiles(consId);
		 		querySb();
	       	   	break;//跳出循环
		 }
    }
}


/**
 * 根据时间点 和 时间类型 设置时间
 * @param num
 * @param timeType
 */
function setTime(num){
	var time = '';
	var h = '';
	h = fillTime(parseInt(num));
	time = h + ":00";
	return time;
}

/**
 * 补"0"
 * @param time
 * @returns {String}
 */
function fillTime(time){
	if(time<10){
		time = '0'+time;
	}
	return time;
}





