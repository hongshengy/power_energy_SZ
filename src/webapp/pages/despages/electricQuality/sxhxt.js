/**
 * 水循环系统
 * @author 吴翔
 * @since 2017-05-17
 */
var llChart = '';//流量
var lsChart = '';//流速
var ycChart = '';//扬程
var startDate = new Date(); // 当前开始时间 为当前时间往前推一年
var endDate = new Date();//当前结束时间  为当前时间

//第一次页面是否加载查询标识
var isFristwd = false;//未点击流速
var isFristyl = false;//未点击扬程
var isTabsType = 0;//默认流量 
var tranId =null;//设备编码
var tranName = '';//设备名称

//js入口
$(function(){

	llChart = echarts.init(document.getElementById('llChart'));//流量chart
	$('#tabs').tabs({
	       fit: true,//填充大小
	       plain: true,
	       onSelect: function(title,index){
	    	      if(isFristwd==false  && index == 1){
		    		   lsChart = echarts.init(document.getElementById('lsChart'));//流速chart
//		    		   lsCountData(null,null);
		    	  }else if(isFristyl==false  && index == 2){
		    		   ycChart = echarts.init(document.getElementById('ycChart'));//扬程chart
//		    		   ycCountData(null,null);
		    	   }
	    	      
	    	        isTabsType = index;//0 :流量  1:流速  2:扬程
	    	  	
		    	  	if(isFristwd==false  && isTabsType == 1){//当前首次点击的流速
		    	  		isFristwd=true;
		    	  		getData(consName);
		    	  	}else if(isFristyl==false  && isTabsType == 2){//当前首次点击的扬程
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
				getData(tranName);//获取数据
				//getbyqData();
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
  	    getData(tranName);//查询变压器
	}
	 //查询事件
	$('#search').click(function(){
		getData(tranName);//获取数据
	});
	
	//左减日期
	$('#left').click(function(){
		var startDate =  $('#startDate').val();//获取当前开始日期
		var nowDate = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('d',-1,DateUtil.strToDate(startDate)));//月份减1
		$('#startDate').val(nowDate);//重新赋值
		getData(tranName);//获取数据
	});
	
	 //右加日期
	$('#right').click(function(){
		var startDate =  $('#startDate').val();//开始日期
		var nowDate = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('d',1,DateUtil.strToDate(startDate)));//月份加1
		$('#startDate').val(nowDate);//重新赋值
		getData(tranName);//获取数据
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
	       	    consId = chiNode[i].id;//用户id
	       	    consName = chiNode[i].text;//用户名
	       	    queryUserFiles();//查询用户档案信息
	       	    getData(tranName);//获取数据
	       	    //getbyqData();
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
	}else if(isTabsType==1){//流速tab
		lsChart.showLoading({
			text:'正在努力的读取数据中...',
			effect:'spin'
		});
	}else if(isTabsType==2){//扬程tab
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
			}else if(isTabsType==1){//流速tab
			   lsCountData(json,title);
			   lsChart.hideLoading();
			}else if(isTabsType==2){//扬程tab
			   ycCountData(json,title);
			   ycChart.hideLoading();
			}
		}
	);
}


/**
 * 根据设备id查询设备信息
 */
function queryDev(devId){
	$.post(webContextRoot +'sfgSub/queryPowerList.action',
	   {'sfGTranModel.tranId':tranId},
	   function(data){
		 if(data.length>0){
			   $("#eddy").text(data[0].tranKindName==""?'-':data[0].tranKindName);
			   $("#eddl").text(data[0].factoryNameS==""?'-':data[0].factoryNameS);
			   $("#edrl").text(data[0].plateCap==""?'-':(data[0].plateCap+'kVA'));
			   $("#ggxh").text(data[0].madeNo==""?'-':data[0].madeNo);//
			   $("#sbmc").text('-');//
			   $("#sbbh").text(data[0].tranVoltName==""?'-':(data[0].tranVoltName));
			   $("#ztrq").text(data[0].createDate==""?'-':data[0].createDate.slice(0,data[0].createDate.indexOf(' ')));
			   $("#yxzt").text(data[0].runStatusName==""?'-':data[0].runStatusName);

			   $('#jnjyA').text('');
//			   $('#jnjyA').text('1.该变压器型号为'+data[0].tranKindName+',属于国家明令禁止的S9系列以下变压器，直接采用同容量的高效节能变压器进行替换');
			   $('#jnjyB').text('1.通过该变压器近一个月的最大负载率、最小负载率、平均负载率运行情况，可知该变压器运行在经济状态下');
			   $('#jnjyC').text('2.如果P空变大于P，则变压器运行在不经济状态下，有改造的潜力；如果P空变小于P，则变压器运行在经济状态下。');
			   
			   $("#eddyBS").text(data[0].tranKindName==""?'-':data[0].tranKindName);
			   $("#eddlBS").text(data[0].factoryNameS==""?'-':data[0].factoryNameS);
			   $("#edrlBS").text(data[0].plateCap==""?'-':(data[0].plateCap+'kVA'));
			   $("#ggxhBS").text(data[0].madeNo==""?'-':data[0].madeNo);//
			   $("#sbmcBS").text('-');//
			   $("#sbbhBS").text(data[0].tranVoltName==""?'-':(data[0].tranVoltName));
			   $("#ztrqBS").text(data[0].createDate==""?'-':data[0].createDate.slice(0,data[0].createDate.indexOf(' ')));
			   $("#yxztBS").text(data[0].runStatusName==""?'-':data[0].runStatusName);
			   $('#jnjyABS').text('');
//			   $('#jnjyABS').text('1.该变压器型号为'+data[0].tranKindName+',属于国家明令禁止的S9系列以下变压器，直接采用同容量的高效节能变压器进行替换');
			   $('#jnjyBBS').text('1.通过该变压器近一个月的最大负载率、最小负载率、平均负载率运行情况，可知该变压器运行在经济状态下。');
			   $('#jnjyCBS').text('2.如果P空变大于P，则变压器运行在不经济状态下，有改造的潜力；如果P空变小于P，则变压器运行在经济状态下。');
		   }
//		   if(treeNodeType != '1'){
//			   $('#jnjy').text('&nbsp;');
//			   $('#jnjy1').text('&nbsp;');
//			   $('#jnjy2').text('&nbsp;');
//			}
	   },"json");
}
//查询下拉框的水循环设备
function getbyqData(){
	
	$.getJSON(webContextRoot +'sfgSub/queryPowerList.action', //查询用户变下面的水循环设备
		{ 
	      'sfGTranModel.consId':consId//用户变id
		},
		function(json){//返回值
			$('#byq').combobox({
				panelWidth: null,
				data:json,
				valueField: 'tranId',
				textField: 'tranName',
				onLoadSuccess:function(){//加载返回
					var byqData = $(this).combobox("getData");
					if(byqData.length>0){
						$('#byq').combobox('select',byqData[0].tranId);
					}else{
						$('#byq').combobox('select','');
						tranId = '';//设备id赋值为空
						tranName = '';//设备name赋值为空
						queryDev(tranId);//根据设备id查询设备信息
						getData(tranName);//获取数据
					}
				},
				onSelect:function(data){//选择返回
					tranId = data.tranId;//设备id赋值
					tranName = data.tranName;//设备name赋值
					queryDev(tranId);//根据设备id查询设备信息
					getData(tranName);//获取数据
					
				}
			});
		}
 );
	 
}


//流量图
function llCountData(dataMap,title){

	
	var option = {
			title :{x:'center',y:'top',text:consName+'流量'+ (title==''?'':'('+title+')')},
			tooltip:{show:true},
			//legend : {y:40,data : ['最大流量','最小流量','平均流量']},
			grid: {x: 42,y: 72,x2: 20,y2: 30},
			color: ['#37A09D'],
			xAxis: [{	type: 'category',
			        	splitLine: {show: false,lineStyle: {color: '#dfdfdf',width: 1,type: 'dashed'}},
			        	data: ['1:00','2:00','3:00','4:00','5:00','6:00','7:00','8:00','9:00','10:00','11:00','12:00'],//dataMap.length.length!=0?dataMap.length:['']
			        }],
	        yAxis: [{
	        	name: '单位(m³)',type: 'value',splitNumber: 5,
	        	axisLabel: {formatter: '{value}'}
	        }],
	        series: [
                 {	 name: '流量',type: 'bar',
                	 data: [320, 332, 301, 334, 390, 330, 320,165,198,210,333,654],//dataMap.value.length!=0?dataMap.value:[0],
                	 tooltip: {trigger: 'item', formatter: "{b}<br/>{a}: {c}m³"},
                	 itemStyle: { normal: {barBorderRadius: 0}}
                 }
           ]
	};
	 
llChart.setOption(option,true);
}

//流速图
function lsCountData(dataMap,title){
var option = {
		title: {
	    	 text: consName+'流速'+ (title==''?'':'('+title+')'),
	        y: '10px',
	        left: 'center'
	    },
/*    legend: {
        x: 'center',
        y: '35',
        data: ['最大流速','最小流速','平均流速']
    }, */
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
            data:['12:00','12:01','12:02','12:03','12:04','12:05','12:06','12:07','12:08','12:09','12:10','12:11','12:12','12:13','12:14'
                 ,'12:15','12:16','12:17','12:18','12:19','12:20','12:21','12:22','12:23','12:24','12:25','12:26'] //dataMap.sMap.categes
        }
    ],
    yAxis: [{
        name: '单位(m)',
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
				paramResult +=   params[0].name + '<br/>';//dataMap.sMap.maxData[params[0].dataIndex] + '<br/>';
				paramResult +=  '流速: ' ;
				paramResult +=   params[0].value + 'm'+'<br/>';//dataMap.sMap.maxData[params[0].dataIndex] + '<br/>';
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
            name: '最大流速',
            type: 'line',
            data:[100,400,500,200,500,900,800,700,300,100,600,300,400,600,200
                  ,500,600,400,700,600,900,800,600,200,400,600,700] //dataMap.sMap.maxData//数据,
        }
    ]
};
	 
lsChart.setOption(option,true);
}

//扬程图
function ycCountData(dataMap,title){
var option = {
		title: {
	    	 text: consName+'扬程'+ (title==''?'':'('+title+')'),
	        y: '10px',
	        left: 'center'
	    },
  /*  legend: {
        x: 'center',
        y: '35',
        data: ['最大扬程','最小扬程','平均扬程']
    }, */
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
            data:['12:00','12:01','12:02','12:03','12:04','12:05','12:06','12:07','12:08','12:09','12:10','12:11','12:12','12:13','12:14'
                  ,'12:15','12:16','12:17','12:18','12:19','12:20','12:21','12:22','12:23','12:24','12:25','12:26']//dataMap.sMap.categes
        }
    ],
    yAxis: [{
        name: '单位(m)',
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
				paramResult +=   params[0].name + '<br/>';//dataMap.sMap.maxData[params[0].dataIndex] + '<br/>';
				paramResult +=  '扬程: ' ;
				paramResult +=   params[0].value + 'm'+'<br/>';//dataMap.sMap.maxData[params[0].dataIndex] + '<br/>';
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
            name: '最大扬程',
            type: 'line',
            data:[500,600,700,800,500,700,300,400,600,200,400,300,100,900,700
                  ,500,200,600,400,900,100,200,400,200,600,600,500]//dataMap.sMap.maxData//数据,
        }
    ]
};
	 
ycChart.setOption(option,true);
}

function changedate(){
	getData(tranName);
}
