/**
 * 告警信息配置
 * @author 王梓璇
 * @since 2017-03-04
 */
var dateType = null;
var nodeCode = '';//选中的所有的节点的编码
var NodeName = '';//选中的所有的节点的名称
var dataType = '1';//计算方式
myChart = '';
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
 myChart = echarts.init(document.getElementById('userChart'));
 
 if(dateTime==null||dateTime=="null"||dateTime==""){
	 $("#startDate").datebox('setValue',DateUtil.dateToStr('yyyy-MM-dd',new Date()));
	 dateTime = DateUtil.dateToStr('yyyy-MM-dd',new Date());
 }else{
	 $("#startDate").datebox('setValue',dateTime);
 }

  $('#tree-multipleTree').combotree({   //只有企业 ，打开状态 
		url:webContextRoot +'destree/selectqyYhbXlTree.action?id='+rootId+'&treeNodeType='+treeNodeType,
	    method:'get',
	    multiple:true,//是否支持多选
	    cascadeCheck:false,//定义是否层叠选中状态。
	    onLoadSuccess:function(node, data){//加载成功返回
	    	$('#tree-multipleTree').combotree('setValue',{id:data[0].id,text:data[0].text}); 
	    	queryData();
		}
	}); 
  
   //电量计算方法下拉
//	   $('#dljsff').combobox({
//		 width: 100,
//		 panelWidth: null,
//		 valueField:'id',
//	     textField:'text',
//		 editable: false,
//         onSelect: function(rec){
//        	 dataType = rec.id;
//		},
//		data: [{
//			id: '1',
//			text: '负荷积分法',
//			selected:true   
//		},{
//			id: '2',
//			text: '遥脉相减法'
//		}]
//    }); 
	 $('#jcxTab').tabs({    
	    border:false,    
	    onSelect:function(title){
	    	if(title == '数据'){
	    		queryGjxxpzData()
	    		queryType = 1;
	    	}else{
	    		queryType = 0;
	    	}
	    }    
	});

});

//echarts柱状图
function getGdtjfxData(dataMap){
	
	var series = [];//图标曲线集
	var legend = [];
	var arrayCode = nodeCode.split(",");//选中的所有的节点的编码
	var arrayName = NodeName.split(",");//选中的所有的节点的名称
	
	for(var a=0;a<arrayName.length;a++){
		legend.push(arrayName[a].replace('有限公司',''));
//		legend.push(arrayName[a].replace('有限公司','')+'反向有功');
//		legend.push(arrayName[a].replace('有限公司','')+'正向无功');
//		legend.push(arrayName[a].replace('有限公司','')+'反向无功');
	}
	
	for(var a=0;a<arrayCode.length;a++){//循环所有选中的节点
		
		//series数据
		series.push( {
            name:arrayName[a].replace('有限公司',''),
            type:'bar',
            data : dataMap.sMap["lineEnergyPap"+a] 
//	        }, {
//	            name:arrayName[a].replace('有限公司','')+'反向有功',
//	            type:'line',
//	            data : dataMap.sMap["lineEnergyPrp"+a]
//	        }, {
//	            name:arrayName[a].replace('有限公司','')+'正向无功',
//	            type:'line',
//	            data : dataMap.sMap["lineEnergyRap"+a]
//	        }, {
//	            name:arrayName[a].replace('有限公司','')+'反向无功',
//	            type:'line',
//	            data : dataMap.sMap["lineEnergyRrp"+a]
	        }
		);
	}
	
	 //初始化
//	var myChart = echarts.init(document.getElementById('userChart'));
//	myChart.showLoading({
//	    text: '正在努力的读取数据中...'    //loading话术
//	});

//	myChart.hideLoading();
	var echartsTitle;
	if(treeNodeType == 1){
		echartsTitle = '客户电量';
	}else if(treeNodeType == 2){
		echartsTitle = '变电站电量';
	}
	var option = {
	    title : {
	        text: echartsTitle+'  数据日期('+dateTime+')',
	        subtext: '',
	        x: 'center'
	    },
	    tooltip : {
	        trigger: 'axis',
	        formatter: function(params) {
	        	var paramResult = '时间: '+ params[0].name + '<br/>';
	        	for ( var i = 0; i < params.length; i++) {
					paramResult += params[i].seriesName + ' : ' 
								 + params[i].value + ' (kWh)<br/>';
				}
               return paramResult;
	        }
	    },
	    legend: {//xNameLineTime4
	    	data : legend,//数据
	    	x: 'center',
	        y: '35'
	    },
		grid : {
			x : 70,
			y : 70,
			y2 : 30,
			x2 : 30
		},
//	    dataZoom : {
//	        show : false,
//	        realtime : true,
//	        start : 0,
//	        height : 30,
//	        y2: 18,
//	        end : 100
//	    },
	    xAxis : [
	        {
	            type : 'category',
	            data : dataMap.sMap.categes
	        }
	    ],
	    yAxis : [
	        {
	            name : '单位(kWh)',
	            type : 'value'
	        }
	    ],
	    series : series//设置series  
	};
	myChart.setOption(option,true);
	myChart.hideLoading();
	
}
//未选择大用户    根据日期查询所有
function queryData(){
	nodeCode='';
	NodeName='';
	var t = $('#tree-multipleTree').combotree('tree');	// 获取树对象
	var n = t.tree("getChildren");		// 获取选择的节点
	if(treeNodeType == 1){
		for(var i=0;i<n.length;i++){//循环所有节点
			if(n[i].checkState == "checked"){
				nodeCode+=n[i].id+'&'+(parseInt(n[i].type))+',';
				NodeName+=n[i].text+',';
			}
		}
	}else {
		for(var i=0;i<n.length;i++){//循环所有节点
			if(n[i].checkState == "checked"){
				nodeCode+=n[i].id+'&'+(parseInt(n[i].type)+1)+',';
				NodeName+=n[i].text+',';
			}
		}
	}
	
	if(nodeCode.length>1){//去掉最后一个逗号
		nodeCode = nodeCode.substring(0, nodeCode.length-1);
		NodeName = NodeName.substring(0, NodeName.length-1);
	}
	
//	myChart = echarts.init(document.getElementById('userChart'));
	myChart.showLoading({
		text:'正在努力的读取数据中...',
		effect:'spin'
	});
	var startDate =  $('#startDate').val();//开始日期
	dateTime = startDate;

	$.getJSON(webContextRoot + 'giszl/queryYhfbLineHour.action', 
		{ 
		   //请求参数
			'energyLineHourModel.dataDate': startDate,//开始时间
			'energyLineHourModel.lineId': nodeCode,//选择的节点编码
			'energyLineHourModel.dataType': dataType//线路计算方法
		},
		function(json){
		    getGdtjfxData(json);
	        myChart.hideLoading();
		 }
	);
	}

function echartResize(){
	setTimeout(
			"myChart.resize();",
			500);
}


