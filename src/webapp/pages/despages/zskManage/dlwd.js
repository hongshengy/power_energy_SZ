/**
 * 电缆温度监测
 * @author wang_xutao
 * @since 2017-05-15
 */
var dataDate = new Date();//当前结束时间  为当前时间
//var consId='';//客户编码
var wdjcChart = '';
var tabFlag = 'wdjc';
var currentTime ='';


$(function(){
	//电缆温度监测 echart图
	wdjcChart = echarts.init(document.getElementById('wdjcChart'));
	
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
					queryUserFiles(consId);
	//				querySb();
		    	}else{
		    		$.messager.alert('提示', '请选择客户', 'warning');
		    	}
			},
			onLoadSuccess:function(node, data){//加载成功返回
				selectTree();//设置树默认选中节点
			}
		});
		 //树模糊检索
		searchTreeNode();
	}else{
		queryUserFiles(consId);
//		querySb();
		queryWdjc(wdjcChart);
	}
	
	 //查询事件
	$('#search').click(function(){
		if(tabFlag == 'wdjc'){
			queryWdjc(wdjcChart);  //查询电缆温度监测  参数用气echart对象
		}
	});
	
	//tab页按钮选项
//	$('#tabId').tabs({
//		onSelect: function(title){
//			if(title == '温度监测'){
//				tabFlag = 'wdjc';
//			}
//		}
//	});
	
	//时间点下拉选项
	$('#QueryType').combobox({
//		 width: 100,
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
	//电缆下拉选项
	$('#sbType').combobox({
//		width: 150,
		panelWidth: null,
		valueField:'id',
		textField:'text',
		editable: false,
		data: [{
			id: '01',
			text: '交联电缆YJLV-10kV',
			selected:true   
		},{
			id: '02',
			text: '控制电缆KVV'
		}]
	}); 
});

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
          	    queryUserFiles(consId);
          	   	break;//跳出循环
          }
    }
	queryWdjc(wdjcChart);
//	querySb(); //加载设备的下拉框
}


/**
 * 查询企业下变压器设备  下拉框
 *//*
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
					
//					getData(tranName);//获取数据
				}
			},
			onSelect:function(data){
				
			}
		});
     },'json');
}*/

/**
 * 页面上面部分  根据客户ID查询
 * @param consId
 */
function queryUserFiles(consId){
	//查询设置时间
	  $.getJSON(webContextRoot + 'charge/queryuserFiles.action', {
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
	  });
}

/**
 * 查询电缆温度监测数据  并生成echart图
 * @param wdjcChart
 */
function queryWdjc(wdjcChart){
	currentTime=$('#dataDate').datebox('getValue');
	timeType = $('#QueryType').combobox('getValue');
	option = wdjcOption(timeType);
	wdjcChart.setOption(option);
}

/**
 * 设置电缆温度监测echartOption
 * @param timeType
 */
var sum;//电缆温度越线总数
var min;//电缆最低温度
var max;//电缆最高温度
function wdjcOption(timeType){
	var x = [];
	var y = [];
	sum =0;
	if(timeType == '1440'){
		for(var i = 0;i<1440;i++){
			x.push(setTime(i,timeType));
			var num = Math.floor(Math.random()*42)+30;		
			y.push(num);
			if(num>70){
				sum++;
			}if(i==0){
				min=num;
				max=num;
			}if(min>num){
				min=num;	
			}if(max<num){
				max=num;
			}
		}
	}else{
		for(var i = 0;i<288;i++){
			x.push(setTime(i,timeType));
			var num = Math.floor(Math.random()*42)+30;
			y.push(num);
			if(num>70){
				sum++;
			}if(i==0){
				min=num;
				max=num;
			}if(min>num){
				min=num;	
			}if(max<num){
				max=num;
			}
		}
	}
	$('#yxcount').text(sum);
	$('#maxValue').text(max);
	$('#minValue').text(min);
	$('#currentTime').text(currentTime);
	
	
//	alert(JSON.stringify(x));
	var option = {
		    title: {
//		        text: consName+' '+deviceName+ ' '+finishDate.substr(0,10)+' 月电量比较',
		        text: '电缆温度',
		        left: 'center'
		    },
		    tooltip: {
		        trigger: 'axis'//,
//		        formatter: function(params) {
//		    		if(params!=null && params[0]!=null){
//		    			var paramResult = x1[params[0].dataIndex] + " " + "电量：" +params[0].value + "<br/>";
//		    			paramResult += x2[params[0].dataIndex] + " " + "电量：" +params[1].value + "<br/>";
//	    				return paramResult;
//		    		}
//		    	}
		    },
		    grid: {
		    	 x : 35, //左边距离
	 			 y : 55,//上边距离
	 			 x2 : 25,//右边距离
	 			 y2 : 35//下边距离
		    },
		    legend: {
		        data:['实际温度'],
		        y:28
		    },
		    toolbox:{
		    	show:true,
		    	feature:{
		    		dataZoom:{},
		    		dataView:{readOnly:false},
		    		magicType:{type:['line','bar']},
		    		restore:{},
		    		saveAsImage:{}
		    	}
		    },
		    xAxis:  {
		        type: 'category',
		        boundaryGap:false,
		        data: x
		    },
		    yAxis:[{
		            name: '单位(℃)',
		            type: 'value'
		        }],
		    series: [
		        {
		            name:'实际温度',
		            type:'line',
		            data:y
		        },
		       {
		        	 name:'基准值',
		             type:'line',
		             data:[70],
		             itemStyle:{
		                 normal:{opacity:0,color:'brown'}
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
		     			        label:{normal:{formatter:'{c}℃'}}
		     			   }
		                 ]
		             }
		       }
		    ]
		};
	return option;
}

/**
 * 根据时间点 和 时间类型 设置时间
 * @param num
 * @param timeType
 */
function setTime(num,timeType){
	var time = '';
	var h = '';
	var s = '';
	if(timeType == '1440'){ //1440
		h = fillTime(parseInt(num/60));
		s = fillTime(parseInt(num%60));
		time = h + ":" + s;
	}else{					//288
		h = fillTime(parseInt(num/12));
		s = fillTime(parseInt(num%12*5));
		time = h + ":" + s;
	}
	return time;
}

//时间填充
function fillTime(time){
	if(time<10){
		time = '0'+time;
	}
	return time;
}

/**
 * 设置时间的方法
 * @param dateTime
 */
function qytQueryOveride(dateTime){
	var date = $('#dataDate').val();
	var resultDay = timeUtil(dateTime,date);//DateUtil.dateAdd("d", parseInt(dateTime), DateUtil.strToDate(startDay2));//getDateByOffsetDays(startDay2,dateTime);
	$('#dataDate').datebox('setValue',resultDay);
	
}
/**
 * 时间处理的工具类
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
