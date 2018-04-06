/**
 * 电费超容负荷
 * @author 王梓璇
 * @since 2017-04-17
 */
var llChart = '';//流量
var lsChart = '';//温度
var ycChart = '';//压力
var startDate = new Date(); // 当前开始时间 
var endDate = new Date();//当前结束时间  

//第一次页面是否加载查询标识
var isFristwd = false;//未点击温度
var isFristyl = false;//未点击压力
var isTabsType = 0;//默认流量 
var tranId =null;//变压器编码
var tranName = '';//变压器名称 

//js入口
$(function(){
	llChart = echarts.init(document.getElementById('llChart'));//初始化流量chart
	$('#tabs').tabs({
	       fit: true,//填充大小
	       plain: true,
	       onSelect: function(title,index){
	    	      if(isFristwd==false  && index == 1){
		    		   lsChart = echarts.init(document.getElementById('lsChart'));//初始化温度chart
//		    		   lsCountData(null,null);
		    	  }else if(isFristyl==false  && index == 2){
		    		   ycChart = echarts.init(document.getElementById('ycChart'));//初始化压力chart
//		    		   ycCountData(null,null);
		    	   }
	    	      
	    	        isTabsType = index;//0 :流量  1:湿度  2:压力
	    	  	
		    	  	if(isFristwd==false  && isTabsType == 1){//当前首次点击的温度
		    	  		isFristwd=true;
		    	  		getData(consName);
		    	  	}else if(isFristyl==false  && isTabsType == 2){//当前首次点击的压力
		    	  		isFristyl=true;
		    	  		getData(consName);
		    	  	}
	    	      
	    	     }
		 }); 
	
	$('#startDate').val(DateUtil.dateToStr('yyyy-MM-dd',startDate));
	
	if(consId==null || consId==''|| consId=="null"){//未获取到企业编码，加载左侧树

	$('#tree-leftQyTree').tree({ //默认没参数，获取区域  企业  都是打开状态
		url:webContextRoot +'destree/queryTree.action',
	    method:'get',
	    multiple:false,//是否支持多选
	    editable:'true',
	    onClick: function(node){
	    	// 获取根节点
	    	var rootNode = $('#tree-leftQyTree').tree('getRoot',node.target);
	    	// 不是根节点时，刷新页面
	    	if(rootNode.id != node.id){
				consId = node.id;//把树节点id赋给企业id
				consName = node.text;//把树节点的值赋给企业名称
				queryUserFiles();//查询用户档案
				getData(consName);//获取数据
	    	}else{
	    		$.messager.alert('提示', '请选择客户', 'warning');
	    	}
		},
		onLoadSuccess:function(node, data){//加载成功返回
			selectTree();//设置树默认选中节点
		}
	});
	searchTreeNode(); 
	
	}else{
		queryUserFiles();//查询用户档案
		getData(consName);//获取数据
	}
	 //查询事件
	$('#search').click(function(){
		getData(consName);//获取数据
	});
	
	//左减日期
	$('#left').click(function(){
		var startDate =  $('#startDate').val();//获取当前开始日期
		var nowDate = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('d',-1,DateUtil.strToDate(startDate)));//月份减1
		$('#startDate').val(nowDate);//重新赋值
		getData(consName);//获取数据
	});
	
	 //右加日期
	$('#right').click(function(){
		var startDate =  $('#startDate').val();//开始日期
		var nowDate = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('d',1,DateUtil.strToDate(startDate)));//月份加1
		$('#startDate').val(nowDate);//重新赋值
		getData(consName);//获取数据
	});
	
});


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
	       	    consId = chiNode[i].id;//用户id赋值
	       	    consName = chiNode[i].text;//用户name赋值
	       	    queryUserFiles();//查询用户档案
				getData(consName);//获取数据
	       	   	break;//跳出循环
		 }
    }
}

function queryUserFiles(){
	//查询客户档案
	  $.getJSON(webContextRoot + 'charge/queryuserFiles.action', {
		  'sfdConsModel.consId':consId//企业id
	  },
	  function(json){
		//客户编号显示
		  var consNoObj = document.getElementById('consNo');
		  var consNOName = "客户编号: "
		  consNoObj.innerHTML = consNOName+json[0].consNo;
		  $('#consNo').attr("title",json[0].consNo);
		  
		//客户名称显示
		  var consNameObj = document.getElementById('consName');
		  var consNameName = "客户名称: "
		  var consNameStr = json[0].consName;
		  consNameObj.innerHTML = consNameName+consNameStr;
		  $('#consName').attr("title",consNameStr);
		  
		//合同容量显示
		  var contractCapObj = document.getElementById('htrl');
		  var contractCapName = "合同容量(kVA): "
		  contractCapObj.innerHTML = contractCapName+json[0].contractCap;
		  $('#htrl').attr("title",json[0].contractCap);
		  
		//用电地址显示
		  var elecAddrObj = document.getElementById('address');
		  var elecAddrName = "用电地址: "
		  var elecAddrNameStr = json[0].elecAddr;
		  if(elecAddrNameStr.length>10){
			  elecAddrObj.innerHTML = elecAddrName+elecAddrNameStr.substring(0,10)+'...';
		  }else{
			  elecAddrObj.innerHTML = elecAddrName+elecAddrNameStr;
		  }
		  $('#address').attr("title",elecAddrNameStr);
		  
		//客户状态显示
		  var checkFlagObj = document.getElementById('khzt');
		  var checkFlagName = "客户状态: "
		  if(json[0].statusCode=="1"){//1是正常用户
			  checkFlagObj.innerHTML = checkFlagName+'正常用户';
			  $('#khzt').attr("title",'正常用户');
		  }else if(json[0].statusCode=="2"){//2是已注销
			  checkFlagObj.innerHTML = checkFlagName+'已注销';
			  $('#khzt').attr("title",'已注销');
		  }
	  });
}

//查询条件
function getData(title){
	var startDate =  $('#startDate').val();//开始日期
	var startDateWzx = startDate;// 开始时间
	var getMonth = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('m',1,DateUtil.strToDate(startDate+"-01")));
	var endDateWzx = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('d',-1,DateUtil.strToDate(getMonth)));// 结束时间
	
	if(startDate> endDate){//开始时间大于结束时间警告
		$.messager.alert('提示', "开始日期不能大于结束日期！", 'warning');
		return;
	}
	 
	if(isTabsType==0){//流量tab
		llChart.showLoading({
			text:'正在努力的读取数据中...',
			effect:'spin'
		});
	}else if(isTabsType==1){//温度tab
		lsChart.showLoading({
			text:'正在努力的读取数据中...',
			effect:'spin'
		});
	}else if(isTabsType==2){//压力tab
		ycChart.showLoading({
			text:'正在努力的读取数据中...',
			effect:'spin'
		});
	}
	 
	$.getJSON(webContextRoot + 'charge/queryPowerByq.action', 
		{ 
		   //请求参数
			'powerLoadModel.beginData': startDateWzx,//开始时间
			'powerLoadModel.endData': endDateWzx,//结束时间
			'powerLoadModel.tranId': tranId//变压器id
		},
		function(json){
			if(isTabsType==0){//流量tab
			    llCountData(json,title);
				llChart.hideLoading();
			}else if(isTabsType==1){//温度tab
			   lsCountData(json,title);
			   lsChart.hideLoading();
			}else if(isTabsType==2){//压力tab
			   ycCountData(json,title);
			   ycChart.hideLoading();
			}
		}
	);
}




//查询下拉框 的 变压器
/*function getbyqData(){
	
	$.getJSON(webContextRoot +'sfgSub/queryPowerList.action', //查询用户变下面的负载率和变损率
		{ 
	      'sfGTranModel.consId':consId//用户变id
		},
		function(json){//返回值
			$('#byq').combobox({
				panelWidth: null,
				data:json,
				valueField: 'tranId',
				textField: 'tranName',
				onLoadSuccess:function(){
					var byqData = $(this).combobox("getData");
					if(byqData.length>0){
						$('#byq').combobox('select',byqData[0].tranId);
						queryDev(tranId);
						getData(tranName);//获取数据
					}else{
						$('#byq').combobox('select','');
						tranId = '';
						tranName = '';
						queryDev(tranId);
						getData(tranName);//获取数据
					}
				}
				onSelect:function(data){
					tranId = data.tranId;
					tranName = data.tranName;
					queryDev(tranId);
					getData(tranName);//获取数据
					
				}
			});
		}
 );
	 
}*/


//流量图
function llCountData(dataMap,title){

	
	var option = {
			title :{x:'center',y:'top',text:consName+'流量'},//+ (title==''?'':'('+title+')')标题信息
			tooltip:{show:true},
			//legend : {y:40,data : ['最大流量','最小流量','平均流量']},
			  toolbox:{
			    	show:true,
			    	feature:{
			    		dataZoom:{yAxisIndex:false},
			    		dataView:{readOnly:false},
			    		magicType:{type:['line','bar']},
			    		restore:{},
			    		saveAsImage:{}
			    	}
			    },
			  //设置chart图位置
			grid: { x: 42,//左边距离
					y: 72,//上边距离
					x2: 40,//右边距离
					y2: 30},//下边距离
			color: ['#4F94CD'], //颜色设置
			//x轴坐标信息
			xAxis: [{	type: 'category',
			        	splitLine: {show: false,lineStyle: {color: '#dfdfdf',width: 1,type: 'dashed'}},
			        	data: ['00:00','1:00','2:00','3:00','4:00','5:00','6:00','7:00','8:00','9:00','10:00','11:00','12:00',
			        	       '13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00'],//dataMap.length.length!=0?dataMap.length:['']
			        }],
	       //y轴坐标信息
	        yAxis: [{
	        	name: '单位(m³)',type: 'value',splitNumber: 5,
	        	axisLabel: {formatter: '{value}'}
	        }],
	        series: [
				//上限阀值markline线展示
				{
				    name: '上限阀值',
				    type: 'line',
				    data:[500],//dataMap.sMap.maxData//数据,
				          markLine: {
				            	
				            	symbolSize:[0,0],
				            	lineStyle:{
					            	normal:{type:'solid',color:'#37A09D',opacity:1},//线类型、颜色、渐变度设置
					            	emephasis:{width:1}
					            },
					            data:[{type:'average'}]//数据类型
				            }
				},
				//下限阀值markline线展示
				{
				    name: '下限阀值',
				    type: 'line',
				    data:[200],//dataMap.sMap.maxData//数据,
				          markLine: {
				            	
				            	symbolSize:[0,0],
				            	lineStyle:{
					            	normal:{type:'solid',color:'orange',opacity:1},//线类型、颜色、渐变度设置
					            	emephasis:{width:1}
					            },
					            data:[{type:'average'}]//数据类型
				            }
				},{	 name: '流量',type: 'bar',
                	 data: [520,620, 332, 301, 334, 390, 510, 320,165,198,210,333,654,
                	        432, 501, 634, 390, 510, 420,265,498,610,733,654],//dataMap.value.length!=0?dataMap.value:[0],
                	 tooltip: {trigger: 'item', formatter: "时间:{b}<br/>{a}: {c}m³"},
                	 itemStyle: { normal: {barBorderRadius: 0}}
                 }
           ]
	};
	 
llChart.setOption(option,true);
}

//温度图
function lsCountData(dataMap,title){
	var x = [];
	var y = [];
	for(var i = 0;i<24;i++){
		x.push(setTime(i));
		y.push(Math.floor(Math.random()*100));
	}
var option = {
		title: {
	    	 text: consName+'温度',
	        y: '10px',
	        left: 'center'
	    },
/*    legend: {
        x: 'center',
        y: '35',
        data: ['最大流速','最小流速','平均流速']
    }, */
	    
	    toolbox:{
	    	show:true,
	    	feature:{
	    		dataZoom:{yAxisIndex:false},
	    		//dataView:{readOnly:false},
	    		magicType:{type:['line','bar']},
	    		restore:{},
	    		saveAsImage:{}
	    	}
	    },
  //设置grid位置
	   grid : {
			 x : 55, //左边距离
			 y : 75,//上边距离
			 x2 : 25,//右边距离
			 y2 : 35//下边距离
		},
    xAxis: [
        {
        	
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
            data:x //dataMap.sMap.categes
        }
    ],
    yAxis: [{
        name: '单位(℃)',
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
    }],
    tooltip: {
    	trigger: 'axis',
    	formatter: function(params) {
    		if(params!=null && params[0]!=null){
//	    		var paramResult = params[0].seriesName +'时间: '+ dataMap.sMap.currentDate[params[0].dataIndex].substr(0,dataType=='1'?10:7) + '<br/>';
//				paramResult += params[0].seriesName + '值 : ' + params[0].value + '<br/>';
//				paramResult += params[1].seriesName+ '时间: '+ dataMap.sMap.preDate[params[0].dataIndex].substr(0,dataType=='1'?10:7) + '<br/>';
//				paramResult += params[1].seriesName + '值 : ' + params[1].value + '<br/>';
    			
				var paramResult = '';
				paramResult +=  '时间: ' ;
				paramResult +=   params[2].name + '<br/>';//dataMap.sMap.maxData[params[0].dataIndex] + '<br/>';
				paramResult +=  '温度: ' ;
				paramResult +=   params[2].value + '℃'+'<br/>';//dataMap.sMap.maxData[params[0].dataIndex] + '<br/>';
			/*	paramResult += '最小流速 : ' ;
				paramResult +=  dataMap.sMap.minData[params[0].dataIndex] + '<br/>';
				paramResult += '平均流速 : ' ;
				paramResult +=  dataMap.sMap.avgData[params[0].dataIndex]+'';*/
				
				return paramResult;
				
    		}
    	}
    },
    series: [
		{
		    name: '上限阀值',
		    type: 'line',
		    data:[60],//dataMap.sMap.maxData//数据,
		          markLine: {
		            	
		            	symbolSize:[0,0],
		            	lineStyle:{
			            	normal:{type:'solid',color:'37A09D',opacity:1},
			            	emephasis:{width:1}
			            },
			            data:[{type:'average'}]
		            }
		},{
		    name: '下限阀值',
		    type: 'line',
		    data:[20],//dataMap.sMap.maxData//数据,
		          markLine: {
		            	
		            	symbolSize:[0,0],
		            	lineStyle:{
			            	normal:{type:'solid',color:'orange',opacity:1},
			            	emephasis:{width:1}
			            },
			            data:[{type:'average'}]
		            }
		},{
            name: '温度',
            type: 'scatter',
            symbol : 'circle',
			symbolSize: function (value){
                //return Math.round(value[2] / 15);
				return 12;
            },
            data:y//dataMap.sMap.maxData//数据,
        }
    ]
};
	 
lsChart.setOption(option,true);
}

//压力图
function ycCountData(dataMap,title){
	var x = [];
	var y = [];
	for(var i = 0;i<24;i++){
		x.push(setTime(i));
		y.push(Math.floor(Math.random()*10));
	}
var option = {
		title: {
	    	 text: consName+'压力',
	        y: '10px',
	        left: 'center'
	    },
	    toolbox:{
	    	show:true,
	    	feature:{
	    		dataZoom:{yAxisIndex:false},
	    		dataView:{readOnly:false},
	    		magicType:{type:['line','bar']},
	    		restore:{},
	    		saveAsImage:{}
	    	}
	    },
	    
	  //设置grid位置
	   grid : {
			 x : 45, //左边距离
			 y : 75,//上边距离
			 x2 : 35,//右边距离
			 y2 : 35//下边距离
		},
    xAxis: [
        {
        	
            type: 'category',
            boundaryGap: false,
            data:x//dataMap.sMap.categes
        }
    ],
    yAxis: [{
        name: '单位(MPa)',
        type: 'value'
       
    }],
    tooltip: {
    	trigger: 'axis',
    	formatter: function(params) {
    		if(params!=null && params[0]!=null){
//	    		var paramResult = params[0].seriesName +'时间: '+ dataMap.sMap.currentDate[params[0].dataIndex].substr(0,dataType=='1'?10:7) + '<br/>';
//				paramResult += params[0].seriesName + '值 : ' + params[0].value + '<br/>';
//				paramResult += params[1].seriesName+ '时间: '+ dataMap.sMap.preDate[params[0].dataIndex].substr(0,dataType=='1'?10:7) + '<br/>';
//				paramResult += params[1].seriesName + '值 : ' + params[1].value + '<br/>';
				
    			
				var paramResult = '';
				paramResult +=  '时间: ' ;
				paramResult +=   params[2].name + '<br/>';//dataMap.sMap.maxData[params[0].dataIndex] + '<br/>';
				paramResult +=  '压力: ' ;
				paramResult +=   params[2].value + 'MPa'+'<br/>';//dataMap.sMap.maxData[params[0].dataIndex] + '<br/>';
			/*	var paramResult = '';
				paramResult +=  '最大扬程: ' ;
				paramResult +=  dataMap.sMap.maxData[params[0].dataIndex] + '<br/>';
				paramResult += '最小扬程 : ' ;
				paramResult +=  dataMap.sMap.minData[params[0].dataIndex] + '<br/>';
				paramResult += '平均扬程 : ' ;
				paramResult +=  dataMap.sMap.avgData[params[0].dataIndex]+'';*/
				return paramResult;
    		}
    	}
    },
    series: [
			{
			    name: '上限阀值',
			    type: 'line',
			    data:[6],//dataMap.sMap.maxData//数据,
			          markLine: {
			            	symbolSize:[0,0],
			            	lineStyle:{
				            	normal:{type:'solid',color:'37A09D',opacity:1},
				            	emephasis:{width:1}
				            },
				            data:[{type:'average'}]
			            }
			},{
			    name: '下限阀值',
			    type: 'line',
			    data:[2],//dataMap.sMap.maxData//数据,
			          markLine: {
			            	
			            	symbolSize:[0,0],
			            	lineStyle:{
				            	normal:{type:'solid',color:'orange',opacity:1},
				            	emephasis:{width:1}
				            },
				            data:[{type:'average'}]
			            }
			},{
            name: '压力',
            type: 'line',
            data:y//dataMap.sMap.maxData//数据,
        }
    ]
};
	 
ycChart.setOption(option,true);
}

function changedlzs(){
	getData(consName);
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

function fillTime(time){
	if(time<10){
		time = '0'+time;
	}
	return time;
}
