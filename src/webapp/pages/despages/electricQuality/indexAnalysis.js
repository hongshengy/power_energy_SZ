var myChart = '';
var dataType;//数据查询类型
var workType = [];//班次编码 
var codeName = [];//班次名称
var isSuccesLoad=false;//下拉框首次加载
var currentDate = new Date();//当前时间
var ischecktreeSearch =true;//是否执行树查询事件
 
var data;//当前查询过的数据
var indexName = '';			// 指标名称
var consId = '';			// 用户ID
var result = '';			// 导入成功标识
 
//初始化方法
$(function(){
	myChart = echarts.init(document.getElementById('userChart'));//初始化chart
	if(consId==null || consId==''|| consId=="null"){//未获取到企业编码，加载左侧树
		
		consSelectMethod = "consSelectMethodLoad()";//定义选中后执行的方法
		consSelectHasRoot = false;//是否有区域能源根节点
		consSelectSearch("",true);
		
	}
	
});

/**
 * 初始化方法 
 */
function consSelectMethodLoad(){
	consId = consSelectCon.id;		// 把树节点id赋给企业id
	consName = consSelectCon.text;   // 把树节点的值赋给企业名称
	isSuccesLoad = false;
	indexName = '';
	queryUserFiles();
	queryCombobox();
}

/**
 * 导出excel 
 */
function expExcel(){
	var url = webContextRoot + 'pages/despages/electricQuality/analysExptExcel.jsp';
	OpenWinUnRes(url,'能效对标分析数据导入',screen.availWidth - 300,screen.availHeight - 260);
}

/**
 * 加载下拉框数据
 */
function queryCombobox(){
	$('#indexName').combobox({
		panelWidth:155,	
		panelHeight:300,// 设置下拉的宽度 和下拉框保持一致
		url:webContextRoot +'indexAnalysis/queryIndexByCombox.action?assetsManagementModel.consId='+consId,
		valueField:'CODE_VALUE',
		textField:'CODE_NAME',
		onLoadSuccess: function () {// 下拉框数据加载成功调用
        	var propOwnerData = $(this).combobox("getData");// 得到查询的list集合
        	if(propOwnerData.length>0){
        		$('#indexName').combobox('select',propOwnerData[0].CODE_VALUE);// 默认加载第一个生产线
        		indexName = propOwnerData[0].CODE_NAME;
        	}else{
        		$('#indexName').combobox('select','');// 没有生产线时
        	}
//        	setTimeout("getData();","100");
        	getData();
        },
		onSelect: function (row) {
			indexName = row.CODE_NAME;
			if(isSuccesLoad){
//				setTimeout("getData();","100");
				getData();
			}
			isSuccesLoad = true;
        }
	});
}

/**
 * 加载Echrts数据 
 */
function getData(){
	$.post(webContextRoot +'indexAnalysis/queryAnalyzeByChart.action',{
        'assetsManagementModel.indexName': indexName,
        'assetsManagementModel.consId' : consId,
     },
     function(data){
    	//加载echart数据
    	 findChart(data.consMap);
    	 myChart.hideLoading();
		
     },'json');
}

/**
 * echarts数据 
 */
function findChart(dataMap){
	
	option = {
			title: {
		        text: "能效潜力指数", 
		        x:'center'
		    },
		    tooltip: {
		        trigger: 'axis'
		    },
		    toolbox: {
		        feature: {
		            dataView: {show: true, readOnly: false},
		            magicType: {show: true, type: ['line', 'bar']},
		            restore: {show: true},
		            saveAsImage: {show: true}
		        }
		    },
		    legend: {
		        left: 'center',
		        data:['潜力值'],
//		        shown:false,
		        y:'25'
		    },
		    grid : {					// 设置grid位置
	 			 x : 45, 				// 左边距离
	 			 y : 85,				// 上边距离
	 			 x2 : 35,				// 右边距离
	 			 y2 : 35				// 下边距离
	 		},
		    xAxis: [
		        {
		            type: 'category',
		            data: ["部门能效潜力指数(P1)","国内同行业的能效潜力指数(P2)","国内不同行业能效潜力指数(P3)","国外同行业的能效潜力指数(P4)","国外不同行业能效潜力指数(P5)"]//dataMap. PName
		        }
		    ],
		    yAxis: [
		        {
		            type: 'value',
		            name: '潜力值',
		            axisLabel: {
		                formatter: '{value}'
		            }
		        }
		    ],
		    series: [
				        {
				        	name : "潜力值",
				        	type : 'bar',
				        	barWidth : 30,
				            data : dataMap.PValue
				        }
				    ]
		};
	
	myChart.setOption(option,true);
	myChart.resize();
}

//选中节点
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
          	    queryUserFiles();
          	    queryCombobox();		// 加载下拉框
          	   	break;//跳出循环
          	   	
          }
    }
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

