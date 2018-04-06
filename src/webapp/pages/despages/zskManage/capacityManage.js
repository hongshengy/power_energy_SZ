/**
 * 容量管理
 * @author wang_xutao
 * @since 2017-05-10
 */
myChart = '';
var currentdate = new Date(); 
var startDate = new Date(); // 当前开始时间 为当前时间往前推一年
var endDate = new Date();//当前结束时间  为当前时间
var data;
var currentMonth = DateUtil.dateToStr('yyyy-MM',currentdate);

$(function(){
	
	myChart = echarts.init(document.getElementById('userChart'));//初始化chart
	var AddrObj = document.getElementById('startYearDate');
	AddrObj.value = currentMonth;
	  
	if(consId==null || consId==''|| consId=="null"){//未获取到企业编码，加载左侧树
		
		consSelectMethod = "consSelectMethodLoad()";//定义选中后执行的方法
		consSelectHasRoot = false;//是否有区域能源根节点
		consSelectSearch("",true);
		
	}else{
		//加载用户基本信息
		  queryUserFiles();
		    getData();
	}
	 //查询事件
	$('#search').click(function(){
		getData();//查询数据
	});
	//左减日期
	$('#left').click(function(){
		var startDate =  $('#startYearDate').val();//开始日期
		var nowDate = DateUtil.dateToStr('yyyy-MM',DateUtil.dateAdd('m',-1,DateUtil.strToDate(startDate)));
		$('#startYearDate').val(nowDate.substr(0,7));
		getData();
	});
	//右加日期
	$('#right').click(function(){
		var startDate =  $('#startYearDate').val();//开始日期
		var nowDate = DateUtil.dateToStr('yyyy-MM',DateUtil.dateAdd('m',1,DateUtil.strToDate(startDate)));
		$('#startYearDate').val(nowDate);
		getData();
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

//加载用户基本信息的方法
function queryUserFiles(){
	  $.getJSON(webContextRoot + 'pCode/queryuserFiles.action', {
		  'sfdConsModel.consId':consId
	  },
	  function(json){
		  var consNoObj = document.getElementById('consNo');
		  var consNOName = "客户编号: ";
		  consNoObj.innerHTML = consNOName+json[0].consNo;
		  $('#consNo').attr("title",json[0].consNo);
		  
		  var consNameObj = document.getElementById('consName');
		  var consNameName = "客户名称: ";
		  var consNameStr = json[0].consName;
		  if(consNameStr.length>10){
			  consNameObj.innerHTML = consNameName+consNameStr.substring(0,10)+'...';
		  }else{
			  consNameObj.innerHTML = consNameName+consNameStr;
		  }
		  $('#consName').attr("title",consNameStr);
		  
		  var contractCapObj = document.getElementById('htrl');
		  var contractCapName = "合同容量(kVA): ";
		  contractCapObj.innerHTML = contractCapName+json[0].contractCap;
		  $('#htrl').attr("title",json[0].contractCap);
		  
		  var elecAddrObj = document.getElementById('address');
		  var elecAddrName = "用电地址: ";
		  var elecAddrNameStr = json[0].elecAddr;
		  if(elecAddrNameStr.length>10){
			  elecAddrObj.innerHTML = elecAddrName+elecAddrNameStr.substring(0,10)+'...';
		  }else{
			  elecAddrObj.innerHTML = elecAddrName+elecAddrNameStr;
		  }
		  $('#address').attr("title",elecAddrNameStr);
		  
		  var checkFlagObj = document.getElementById('khzt');
		  var checkFlagName = "客户状态: ";
		  if(json[0].statusCode=="1"){
			  checkFlagObj.innerHTML = checkFlagName+'正常用户';
			  $('#khzt').attr("title",'正常用户');
		  }else if(json[0].statusCode=="2"){
			  checkFlagObj.innerHTML = checkFlagName+'已注销';
			  $('#khzt').attr("title",'已注销');
		  }
	  }
		);
}

//根据日期查询容量管理数据
function getData(){
		var startDate =  $('#startYearDate').val();//开始日期	
	myChart.showLoading({
		text:'正在努力的读取数据中...',
		effect:'spin'
	});
	$.post(webContextRoot + 'capacityAnalyze/queryRlfxInfo.action', 
		{ 
		   //请求参数
			'capacityAnalyzeModel.dataDate': startDate,//开始时间
			'capacityAnalyzeModel.consId': consId,//统计类型
		},
		function(data){
			getpowerCountData(data.sMap);
		    myChart.hideLoading();
		
	},'json');
	
}

//echarts曲线图
function getpowerCountData(dataMap){
	var series = [];//图标曲线集
	var legend = [];
		 var startDate =  $('#startYearDate').val()+'年';//获取当前开始日期
	series.push({
        name: '负荷利用率（负荷利用率=平均负荷/合同容量）',
        type: 'line',
        data:dataMap.rateData//数据,
    });
	/*series.push({
        name:'基准值',
        type:'line',
        data:[75],
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
			        type: 'average',
			        label:{normal:{formatter:'{c}%'}}
			   }
            ]
        }
    });*/
	

//	legend.push(lastNewDate+'功率因数');
//	legend.push('基准值');
	var option = {
	    title: {
	    	text: consName+'容量管理',
	        y: '0px',
	        left: 'center'
	    },
	    tooltip: {
	    	trigger: 'axis', // tip 类型
			formatter : function(params, ticket, callback) {
				if(params == null ||params[0] == null){
					return;
				}
				var res = params[0].name+
        		'<br/>负荷利用率：'+ params[0].value+'%';
        		return res;
			}
	    	
	    },
	    legend: {
	    	data: ['负荷利用率（负荷利用率=平均负荷/合同容量）'],
	        x:'center',
	        y:'35'
	    },
	    grid : {
 			 x : 50, //左边距离
 			 y : 55,//上边距离
 			 x2 : 55,//右边距离
 			 y2 : 25//下边距离
 		},
	    xAxis: {
	    	  type: 'category',
	          boundaryGap: false,
	          data:dataMap.categes
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
	                formatter: '{value} %'
	            }
	    },
	    series: series
	};
    myChart.setOption(option,true);
	
}

