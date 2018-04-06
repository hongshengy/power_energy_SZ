/**
 * 照明系统
 * @author wuxiang
 * @since 2017-05-17
 */
var fzlChart = '';//负载率(最大，最小，平均)
var bsChart = '';//变损(变损和变损值两条线)
var startDate = new Date(); // 当前开始时间 
var endDate = new Date();//当前结束时间 
isfistAdd=true;//初始状态设置
var tranId =null;//变压器编码
var tranName = '';//变压器名称
var zmynfx2 = '';
var gridData = [];
var tranName = '';//照明设备
var deviceId = '';//照明设备Id
myfheChart = '';//照明负荷曲线
var glysId = '';
var	glysName = '';
var	glystranName = '';
var userCheckCos = [];			// 功率因数值
var consSelectAllCons = null;//所有的客户
var consSelectHistoryCons = null;//历史记录里的客户
var consSelectCon = null;//选中的客户
//js入口
$(function(){
	
	// 判断是不是客户角色  true是客户角色 flase不是客户角色
	// 不是客户角色不显示用能报告按钮
	if(top.isCustomer == true){
		$("#bt_exportynbg").hide();
	}else{
		$("#bt_exportynbg").show();
	}
	
	myfheChart = echarts.init(document.getElementById('fheChart'));	
	$('#startDate').val(DateUtil.dateToStr('yyyy-MM',startDate));//获取当前时间
	$('#startdayDate').val(DateUtil.dateToStr('yyyy-MM-dd',startDate));//照明日日期
	$('#startMonthDate').val(DateUtil.dateToStr('yyyy-MM',startDate));//照明月日期
	$('#startglMonthDate').val(DateUtil.dateToStr('yyyy-MM',startDate));//功率因数月日期
	$('#byqQueryType').combobox({
		onSelect: function(param){
			if(param.value == 'D'){
				$('#startdayDate').val(DateUtil.dateToStr('yyyy-MM-dd',startDate));
				$('#startdayDate').show();
				$('#startMonthDate').hide();
				date = $('#startdayDate').val();
				dateLast = new Date(date);
				dateLast = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('d',-1,dateLast));
				
				// 选择天数据 隐藏月数据 
				$('#startdayDate').val(dateLast);
				$('#startdayDate').show();
				$('#startMonthDate').hide();
			}else if(param.value == 'M'){
				$('#startMonthDate').val(DateUtil.dateToStr('yyyy-MM',startDate));
				$('#startdayDate').hide();
				$('#startMonthDate').show();
				date = $('#startMonthDate').val();
				dateLast = new Date(date);
				dateLast = DateUtil.dateToStr('yyyy-MM',DateUtil.dateAdd('m',-1,dateLast));
				
				// 选择月数据 隐藏天数据 
				$('#startMonthDate').val(dateLast);
				$('#startMonthDate').show();
				$('#startdayDate').hide();
			}
		}
	});
	//左减日期
	$('#fhleft').click(function(){
		var dlzsQueryType = $('#byqQueryType').combobox('getValue');
		if(dlzsQueryType == 'M'){
			var startDate =  $('#startMonthDate').val();//开始日期
			var nowDate = DateUtil.dateToStr('yyyy-MM',DateUtil.dateAdd('m',-1,DateUtil.strToDate(startDate)));
			$('#startMonthDate').val(nowDate.substr(0,7));
			getFhData(deviceId,tranName);	
		}else if(dlzsQueryType == 'D'){
			var startDayDate =  $('#startdayDate').val();//开始日期
			var nowDate = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('d',-1,DateUtil.strToDate(startDayDate)));
			$('#startdayDate').val(nowDate);
			getFhData(deviceId,tranName);	
		}
	});
	
	 //右加日期
	$('#fhright').click(function(){
		var dlzsQueryType = $('#byqQueryType').combobox('getValue');
		if(dlzsQueryType == 'M'){
			var startDate =  $('#startMonthDate').val();//开始日期
			var nowDate = DateUtil.dateToStr('yyyy-MM',DateUtil.dateAdd('m',1,DateUtil.strToDate(startDate)));
			$('#startMonthDate').val(nowDate.substr(0,7));
			getFhData(deviceId,tranName);	
		}else if(dlzsQueryType == 'D'){
			var startDayDate =  $('#startdayDate').val();//开始日期
			var nowDate = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('d',1,DateUtil.strToDate(startDayDate)));
			$('#startdayDate').val(nowDate);
			getFhData(deviceId,tranName);	
		}
	});
	//左减日期
	$('#glysleft').click(function(){
		var startDate =  $('#startglMonthDate').val();//开始日期
		var nowDate = DateUtil.dateToStr('yyyy-MM',DateUtil.dateAdd('m',-1,DateUtil.strToDate(startDate)));
		$('#startglMonthDate').val(nowDate.substr(0,7));
		getglysData(glysId,glystranName);	
	});
	
	 //右加日期
	$('#glysright').click(function(){
		var startDayDate =  $('#startglMonthDate').val();//开始日期
		var nowDate = DateUtil.dateToStr('yyyy-MM',DateUtil.dateAdd('m',1,DateUtil.strToDate(startDayDate)));
		$('#startglMonthDate').val(nowDate);
		getglysData(glysId,glystranName);
	});
	
	if(consId==null || consId==''|| consId=="null"){//未获取到企业编码，加载左侧树
//	$('#tree-leftQyTree').tree({ //默认没参数，获取区域  企业  都是打开状态
//		// modeType=4，过滤含有照明系统的客户
//		url:webContextRoot +'destree/queryTree.action?modeType=4',
//	    method:'get',
//	    multiple:false,//是否支持多选
//	    editable:'true',
//	    onClick: function(node){
//	    	// 获取根节点
//	    	var rootNode = $('#tree-leftQyTree').tree('getRoot',node.target);
//	    	// 不是根节点时，刷新页面
//	    	if(rootNode.id != node.id){
//		    	isfistAdd=true;
//				consId = node.id;//把树节点id赋给企业id
//				consName = node.text;//把树节点的值赋给企业名称
//				queryUserFiles();//查询用户档案
//				queryGjxxpzData();//查询灯组月电量信息
//				getData();//获取数据
//				getjnjyData ();//节能建议
//				yndyNameCombobox();
//				glysNameCombobox();
//	    	}else{
//	    		$.messager.alert('提示', '请选择客户', 'warning');
//	    	}
//		},
//		
//		onLoadSuccess:function(node, data){
//			selectTree();//设置树默认选中节点
//		}
//	});
//	searchTreeNode();
		consSelectMethod = "consSelectMethodLoad()";//定义选中后执行的方法
		consSelectHasRoot = false;//是否有区域能源根节点
		consSelectSearch("",true);
	}else{
		queryUserFiles();//查询用户档案
		getjnjyData();//节能建议
		queryGjxxpzData();//查询灯组月电量信息
		getData();//获取数据
		yndyNameCombobox();
		glysNameCombobox();
	}
	
	 //查询事件
	$('#search').click(function(){
		getData();//获取数据
	});
	//照明负荷查询事件
	$('#searchfhe').click(function(){
		getFhData(deviceId,tranName);	
	});
	//照明功率因数查询事件
	$('#searchglys').click(function(){
		getglysData(glysId,glystranName);	
	});
	 //左减日期
	$('#left').click(function(){
		var startDate =  $('#startDate').val();//获取当前开始日期
		var nowDate = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('m',-1,DateUtil.strToDate(startDate)));//月份减1
		$('#startDate').val(nowDate.substr(0,7));//重新赋值
		getData();//左减日期进行查询
	});
	
	 //右加日期
	$('#right').click(function(){
		var startDate =  $('#startDate').val();//开始日期
		var nowDate = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('m',1,DateUtil.strToDate(startDate)));//月份加1
		$('#startDate').val(nowDate.substr(0,7));//重新赋值
		getData();//右加日期进行查询
	});
	
	
});

function consSelectMethodLoad(){
	if(consSelectCon.id.length < 4){	// 区域能源节点
		isfistAdd==true
		$("#clickTree").hide();
		$("#contentId").show();
		content='<iframe id="funcId" src="'+webContextRoot+'pages/despages/projectManage/tranOverview.jsp?orgNo='+consSelectCon.id+'" scrolling="no" frameborder="0" width="100%" height="100%"></iframe>'; 
		$("#contentId").empty();
		$('#contentId').append(content);
		consId = "";//把树节点id赋给企业id
		consName = "";//把树节点的值赋给企业名称
		queryUserFiles();//查询用户档案
		queryGjxxpzData();//查询灯组月电量信息
		getData();//获取数据
		getjnjyData ();//节能建议
		yndyNameCombobox();
		glysNameCombobox();
	}else{		// 企业节点
		isfistAdd=true;
		$("#contentId").hide();
		$("#clickTree").show();
		consId = consSelectCon.id;//把树节点id赋给企业id
		consName = consSelectCon.text;//把树节点的值赋给企业名称
		queryUserFiles();//查询用户档案
		queryGjxxpzData();//查询灯组月电量信息
		getData();//获取数据
		getjnjyData ();//节能建议
		yndyNameCombobox();
		glysNameCombobox();
	}
}
function selectTree(nodeId){
	$('#tree-leftQyTree li:eq(0)').find('div').addClass("tree-node-selected");//添加选中样式
	var n = $('#tree-leftQyTree').tree('getSelected');//获取被选中的节点
	if(n!=null)//判断节点是否存在
	{
		$('#tree-leftQyTree').tree('select',n.target);
	}
	
	var chiNode = $('#tree-leftQyTree').tree('getChildren',n.target);//子节点
	if(chiNode.length == 0){
		$.messager.alert('提示', '请先给客户添加照明设备', 'warning');
	} else {
		for(var i=0 ; i < chiNode.length ; i++)//循环节点
	    {
			 if(nodeId!=null?chiNode[i].id==nodeId:chiNode[i].type==1)//查找定位
			  {
					var n = $('#tree-leftQyTree').tree("find",chiNode[i].id);//根据id获取节点
		       	   	$('#tree-leftQyTree').tree('select',n.target);//选中节点
		       	   	$('#tree-leftQyTree').tree('scrollTo',n.target);//滚动到节点
		       	    consId = chiNode[i].id;
		       	    consName = chiNode[i].text;
		       	    queryUserFiles();//查询档案
		       	    queryGjxxpzData();//查询灯组月电量信息
		       	    getjnjyData();//节能建议
		       	    getData();//获取数据
		       	    yndyNameCombobox();
		       	    glysNameCombobox();
		       	   	break;//跳出循环
			 }
	    }
	}
}

function queryUserFiles(){
	//查询客户档案
	$.getJSON(webContextRoot + 'pCode/queryuserFiles.action', {
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
function getData(){

	var startDate =  $('#startDate').val();//开始日期
	var getMonth = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('m',1,DateUtil.strToDate(startDate+"-01")));
	var endDate = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('d',-1,DateUtil.strToDate(getMonth)));// 结束时间

	if(startDate> endDate){//开始时间大于结束时间警告
		$.messager.alert('提示', "开始日期不能大于结束日期！", 'warning');
		return;
	}
	$.getJSON(webContextRoot + 'zmsb/queryTmnlZMInfo.action', 
			{ 
			   //请求参数
				'consId': consId//显示点数
			},
			function(json){
				if(isfistAdd==true){
					getpowerCountData(json.pie,json.legend,json.count);//灯组档案饼图查询
//					zmynfx1.hideLoading();
					getpowerBsData();//企业区域用电柱状图
//					zmynfx2.hideLoading();
					isfistAdd=false;
				}else{
//					queryGjxxpzData();//查询灯组月电量信息
					getpowerBsData();//企业区域用电柱状图
					zmynfx2.hideLoading();					
				}	
    });
}

//节能建议
function getjnjyData (){
	 $.getJSON(webContextRoot + 'zmsb/queryTmnlZMInfo.action',  {
		 'consId': consId//企业id
	  },
	  function(json){
		  var totalSum = 0;
		  var soloSum = "";
		  if(json.pie.length>0){
			  for(var i=0;i<json.pie.length;i++){
				  totalSum += (parseInt(json.pie[i].value));
				  soloSum += json.pie[i].value+"只" +json.legend[i]+"。"
			  }
		  }else{
			  totalSum=0;
			  soloSum="0只灯。";
		  }	  
//	var value="1.该企业共有照明灯具"+(parseInt(json.pie[0].value)
//		+parseInt(json.pie[1].value)+parseInt(json.pie[2].value)
//		+parseInt(json.pie[3].value)+parseInt(json.pie[4].value)
//		+parseInt(json.pie[5].value))+"只。"; 
		  var value="1.该企业共有照明灯具"+totalSum+"只。"; 
	//"1.该企业共有照明灯具"+dataMap.counts+"只,其中";
/*	var data = dataMap.data;
	for(var i=0;i<data.length;i++){
		if(i ==data.length-1 )
		{
			value+=data[i].name+data[i].value+"只。";
		}
		else{
			value+=data[i].name+data[i].value+"只、";
		}
	}*/
	$('#pId1').html(value);
//	var value2="2.根据设备类别可以判断该企业有"+
//	+parseInt(json.pie[0].value)+"只LED灯、"+
//	+parseInt(json.pie[1].value)+"只传统节能灯、"+	
//	+parseInt(json.pie[2].value)+"只射灯、"+
//	+parseInt(json.pie[3].value)+"只高压钠灯、"+
//	+parseInt(json.pie[4].value)+"只白炽灯、"+
//	+parseInt(json.pie[5].value)+"只荧光灯。"; 
	var value2="2.根据设备类别可以判断该企业有"+soloSum
	$('#pId2').html(value2);
	var value3=	"3.一般LED灯具替代白炽灯、传统节能灯的节电率为60%左右。";
	$('#pId3').html(value3);	
	  });
}

//灯组档案echarts饼状图
function getpowerCountData(dataMap,legend,title){
	
	zmynfx1 = echarts.init(document.getElementById('zmynfx-pie'));//初始化饼状chart
	
	var option = { 
			title: {
				x: 'center',y: 15,
				text: '非LED灯'+title+'组,具有节能潜力',
				textStyle: {
						decoration: 'none',
						fontFamily: '微软雅黑, Arial, Verdana, sans-serif',
						fontFamily2: '微软雅黑',    // IE8- 字体模糊并且不支持不同字体混排，额外指定一份
						fontSize: 16,
						fontStyle: 'normal',
						fontWeight: 'normal',
						color: '#0375cd'
				}
			},
			tooltip: {
				trigger: 'item',
				showDelay: 0,
				hideDelay: 0,
				backgroundColor : 'rgba(11,93,156,0.7)',
				borderColor: '#0a5087',
				borderRadius : 8,
				borderWidth: 1,
				padding: 10,
				textStyle : {
						color: '#fff',
						decoration: 'none',
						fontFamily: '微软雅黑, Verdana, sans-serif',
						fontSize: 14,
						fontWeight: 'normal'
				},
				formatter : "{a} <br/>{b} : {c}个 ({d}%)"
			},
			legend: {
			 	orient : 'vertical',
		        x : 'left',
				data: legend
			},
			calculable : false,
			series : [
					{
							name:'照明灯具总数',
							type:'pie',
							radius : '60%',
							center: ['50%', '65%'],
							data:dataMap//数据
					}
			]
	};
	zmynfx1.setOption(option,true);
}

/**
 * //查询灯组月电量信息
 * @param {} corporationId
 */
  function queryGjxxpzData(){
	  var startDate =  $('#startDate').val();//开始日期
	  var gridCommon = [[
	 		{field:'devName',title:'设备名称',width: '13%',align:'center'},
	 		{field:'dlAddress',title:'使用地点',width: '12%',align:'center',

	 			formatter : function(value, row, index) {
	 				return HTMLEncode(value);
	 			}
	 		},
	 		//列表字段列出
	 		{field:'dlType',title:'灯具类型',width: '12%',align:'center'},
	 		{field:'dlNum',title:'设备数量',width: '12%',align:'center',sortable:true,
	 			formatter : function(value, row, index) {
	 				if(value==0){
	 					return "-";
	 				}else{
	 					return value;
	 				}
	 			}
	 		},
	 		{field:'dlAdddate',title:'投运日期',width: '13%', align:'center'},
	 		{field:'dlPower',title:'单灯功率(W)',width: '12%', align:'center',
	 			formatter : function(value, row, index) {
	 				if(value==0){
	 					return "-";
	 				}else{
	 					return value;
	 				}
	 			}
	 		},
	 		{field:'subsId',title:'建筑名称',width: '13%', align:'center'},
	 		{field:'energyP',title:'总功率(W)',width: '13%', align:'center',
	 			formatter : function(value, row, index) {
	 				if(value==0){
	 					return "-";
	 				}else{
	 					return value;
	 				}
	 			}
	 		},
 		]];
	  
	$('#gjxxpz-datagrid').datagrid({// 表格
		nowrap : false,// 设置为true，当数据长度超出列宽时将会自动截取。
		striped : true,// 设置为true将交替显示行背景。
		fit: true,
		border:false,
		pageSize:20,
		pagination : false,// 设置true将在数据表格底部显示分页工具栏。
		fitColumns : false,// 自动适应宽度
		singleSelect : true,// 设置为true将只允许选择一行。
		rownumbers : true,// 设置为true将显示行数。
		url:webContextRoot +'zmsb/queryZmDlDetail.action',
		queryParams:{'zMModel.consId':consId,//企业id
			         'zMModel.dataDate':startDate},
		onLoadSuccess : function(data) {// 加载数据之后
			gridData = data;
			$('#gjxxpz-datagrid').datagrid('selectRow', 0); // 选择第一行
		},
		loadMsg : "正在努力的读取数据中...",// 提示信息
		columns : gridCommon
	});
}
//企业用电echarts柱状图
function getpowerBsData(){
	zmynfx2 = echarts.init(document.getElementById('zmynfx-chart1'));//初始化柱chart
	var startDate =  $('#startDate').val();//开始日期
	$.getJSON(webContextRoot + 'zmsb/queryZmDl.action', {
		  'zMModel.consId':consId,//企业id
		  'zMModel.dataDate':startDate//开始时间
	  },
	  function(json){ 
		
	var seriesData=[];
	var legendData=[];
	var echartData = gridData.rows;
//	var colorArr=["#ff00ff","#ffff00","#00ffff","#cccccc","#333333"]
	for(var i=0;i<echartData.length;i++){
		var deviceName = echartData[i].devName;
		seriesData[seriesData.length]={name: deviceName,type: 'bar',data: json.listArray[i], stack: '总量',
//				itemStyle: { normal: {color: function(value){
//			return colorArr[i];
//			//"#"+("00000"+((Math.random()*16777215+0.5)>>0).toString(16)).slice(-6);
//			}
//		}
//		}
		};
//		legendData[legendData.length]={deviceName};
		legendData[legendData.length]=deviceName;
	}
	

	        
	
	
//	var namesData=[];
//	var energyPData=[];
//	
//	var strDevName="";
//	
//	var categesCount=0;
//	
//	
//	
//	for(var i=0,len=json.ListenergyP.length;i<len;i++){
//		if(strDevName.indexOf(json.ListenergyP[i].deviceName)==-1){
//			strDevName=json.ListenergyP[i].deviceName;
//			namesData[namesData.length]=json.ListenergyP[i].deviceName;
//			categesCount++;
//		}
//	}
//	
//	
//	for(var j=0,length=json.categes.length;j<length;j++){
//		for(var i=0,len=json.ListenergyP.length;i<len;i++){
//			if(json.categes[j]==json.ListenergyP[i].dataDate.substr(0,10)){
//				energyPData[energyPData.length]=json.ListenergyP[i].energyP;
//				break;
//			}else if(i==len-1){
//				energyPData[energyPData.length]='-';
//			}
//		}
//	}
//	for(int i=1;i<json.length;i++){
//		seriesData[seriesData.length]={name: '用电',type: 'bar',data: json,itemStyle: { normal: {barBorderRadius: 0}}};
//	}
//	seriesData[seriesData.length]={name: '用电',type: 'bar',data: energyPData,itemStyle: { normal: {barBorderRadius: 0}}};
	
	var option=barEcharts(seriesData,json.categes,legendData);
	zmynfx2.setOption(option,true);
	  });
}

function barEcharts(seriesData,xAxisData,legendData){
	var option = {
			title :{x:'center',y:'top',text:'企业照明区域用电柱状图'},//标题
//			tooltip:{show:true},
//			legend : {y:40,data : ['用电']},//数据项设置
			legend : {
				data : [legendData]
			},
			grid: {x: 50,y: 72,x2: 40,y2: 30},//chart图的位置
//			grid : {
//				left: '1%',
//		        right: '1%',
//				bottom : '3%',
//				containLabel : true
//			},
			//color: ['orange'],//柱状颜色
			xAxis: [{	type: 'category',
			        	splitLine: {show: false,lineStyle: {color: '#dfdfdf',width: 1,type: 'dashed'}},
			        	data: xAxisData,//['周一','周二','周三','周四','周五','周六','周日'],//dataMap.length.length!=0?dataMap.length:['']
			        }],
	        yAxis: [{
	        	name: '单位(kWh)',type: 'value',splitNumber: 5,
	        	axisLabel: {formatter: '{value}'}
	        }],
	        tooltip: {
	            trigger: 'axis',
	            formatter: function(params) {
	            	if(params!=null && params[0]!=null){
	    	        	var paramResult = '时间: '+ params[0].name + '<br/>';
	    	        	for ( var i = 0; i < params.length; i++) {
	    					paramResult += params[i].seriesName + ' : ' 
	    					+params[i].value+'kWh'+'<br/>';
	    				}
	                   return paramResult;
	    	        	}
	        	}
	        },
	        series:seriesData
//	        	[
//                 {	 name: '用电',type: 'bar',
//                	 data: [320, 332, 301, 334, 390, 330, 320],//dataMap.value.length!=0?dataMap.value:[0],
////                	 tooltip: {trigger: 'item', formatter: "{b}<br/>{a}: {c}kWh"},
//                	 itemStyle: { normal: {barBorderRadius: 0}}
//                 }
//           ]
	};
	return option;
}


  function changeDate(){
	  
  }
  
//  function userResize(widths,heights){
//		$("#zmynfx-chart1").width($("#zmynfx-chart1").parent().width());
//		$("#zmynfx-chart1").height($("#zmynfx-chart1").parent().height());
//		
//		if(!!zmynfx2){
//			zmynfx2.resize({
//			    width: $("#zmynfx-chart1").parent().width(),
//			    height: $("#zmynfx-chart1").parent().height()
//			});
//		}
//  }
  /**
   * 照明设备下拉框
   * @param consId
   */
  function yndyNameCombobox(){
  	$("#zmName").combobox({
  		url:webContextRoot +'zmsb/getZmDev.action',
		queryParams:{'zMModel.consId':consId//企业id
			         },
  	    valueField:'deviceId',    
  	    textField:'deviceName' ,
  	    onLoadSuccess:function(){
  			var byqData = $(this).combobox("getData");
  			if(byqData.length>0){
  				$('#zmName').combobox('select',byqData[0].deviceId);
  			}else{
  				$('#zmName').combobox('select','');
  				deviceId = '';
  				deviceName = '';
  				getFhData(deviceId,deviceName);
  			}
  		},
  		onSelect:function(record){
  			deviceId = record.deviceId;
  			deviceName = record.deviceName;
  			tranName = deviceName;
  			getFhData(deviceId,deviceName);	
  			}
  	});
  } 
  
  /**
   * 功率因数
   * @param deviceId
   * @param deviceName
   */
  function glysNameCombobox(){
	  	$("#glysName").combobox({
	  		url:webContextRoot +'zmsb/getZmDev.action',
			queryParams:{'zMModel.consId':consId//企业id
				         },
	  	    valueField:'deviceId',    
	  	    textField:'deviceName' ,
	  	    onLoadSuccess:function(){
	  			var zmsbData = $(this).combobox("getData");
	  			if(zmsbData.length>0){
	  				$('#glysName').combobox('select',zmsbData[0].deviceId);
	  			}else{
	  				$('#glysName').combobox('select','');
	  				glysId = '';
	  				glysName = '';
	  				getglysData(glysId,glysName);
	  			}
	  		},
	  		onSelect:function(record){
	  			glysId = record.deviceId;
	  			glysName = record.deviceName;
	  			glystranName = glysName;
	  			getglysData(glysId,glysName);	
	  			}
	  	});
	  }
  /**
   * 获取照明设备的日曲线，月曲线
   * @param deviceId
   * @param deviceName
   */
function getFhData(deviceId,deviceName){
	var dataDate;
	var dlzsQueryType = $('#byqQueryType').combobox('getValue');
	if(dlzsQueryType == 'D'){
		dataDate =  $('#startdayDate').val();
	}else if(dlzsQueryType == 'M'){
		dataDate =  $('#startMonthDate').val();
	}
	if(deviceId=="101000038458"){
		var ids="101000015925";
		$.getJSON(webContextRoot + 'zmsb/selectZmFhe.action', 
				{ 
				   //请求参数
					'powerLoadModel.dataDate': dataDate,//开始时间
					'powerLoadModel.tranId': ids,//照明id
					'powerLoadModel.dataType': 6//设备类型
					
				},
				function(json){
//					getpowerCountData(json,title);
					myfheChart = echarts.init(document.getElementById('fheChart'));
				    var option = getZmData(json,deviceName);
				    myfheChart.setOption(option);
				    myfheChart.hideLoading();
				    checkLoadRate(json.fzlList,json.sumList);
//				    setFJianYi();
//					checkLoadRate(json.sMap.fzlList);
				}
			);
	}else{
		$.ajax({
			type : "post",
			url : webContextRoot + 'zmsb/selectCz.action',
			dataType : "json",
			data : {
				'zhSfLineModel.lineId' : deviceId
			},
			success : function(data) {
				var id;
				if(data.length>0){
					id=data[0].lineId;				
				}else{
					id=deviceId;
				}
				$.getJSON(webContextRoot + 'zmsb/selectZmFhe.action', 
						{ 
						   //请求参数
							'powerLoadModel.dataDate': dataDate,//开始时间
							'powerLoadModel.tranId': id,//照明id
							'powerLoadModel.dataType': 6//设备类型
							
						},
						function(json){
//							getpowerCountData(json,title);
							myfheChart = echarts.init(document.getElementById('fheChart'));
						    var option = getZmData(json,deviceName);
						    myfheChart.setOption(option);
						    myfheChart.hideLoading();
						    checkLoadRate(json.fzlList,json.sumList);
//						    setFJianYi();
//							checkLoadRate(json.sMap.fzlList);
						}
					);
			}
		});
	}	
} 
/**
 * 
 * @param dataMap
 * @param title
 * @returns
 */
function getglysData(deviceId,deviceName){
	var dataDate =  $('#startglMonthDate').val();
	var nowDate = DateUtil.dateToStr('yyyy-MM',DateUtil.dateAdd('m',1,DateUtil.strToDate(dataDate)));	
	if(deviceId=="101000038458"){
		var ids="101000015925";
		$.getJSON(webContextRoot + 'zmsb/selectZmGlys.action', 
				{ 
				   //请求参数
					'sfEnergyLineDayModel.dataDate': dataDate,//开始时间
					'sfEnergyLineDayModel.engDate': nowDate,//结束时间
					'sfEnergyLineDayModel.lineId': ids,//照明id
					'sfEnergyLineDayModel.dataType': 1//设备类型
					
				},
				function(json){				
				    userCheckCos = [];
					if(json.powerFactors.length > 0){
						userCheckCos.push(json.powerFactors[0]);
					}else{
						userCheckCos.push("0.9");
					}
					myglysChart = echarts.init(document.getElementById('glysChart'));
				    var option = getGlys(json,deviceName);
				    myglysChart.setOption(option);
				    myglysChart.hideLoading();
				    glysDataFx(json);
				    
				}
			);
	}else{
		$.ajax({
			type : "post",
			url : webContextRoot + 'zmsb/selectCz.action',
			dataType : "json",
			data : {
				'zhSfLineModel.lineId' : deviceId
			},
			success : function(data) {
				var id;
				if(data.length>0){
					id=data[0].lineId;	
				}else{
					id=deviceId
				}
				$.getJSON(webContextRoot + 'zmsb/selectZmGlys.action', 
						{ 
						   //请求参数
							'sfEnergyLineDayModel.dataDate': dataDate,//开始时间
							'sfEnergyLineDayModel.engDate': nowDate,//结束时间
							'sfEnergyLineDayModel.lineId': id,//照明id
							'sfEnergyLineDayModel.dataType': 1//设备类型
							
						},
						function(json){				
						    userCheckCos = [];
							if(json.powerFactors.length > 0 && json.powerFactors[0] != ""){
								userCheckCos.push(json.powerFactors[0]);
							}else{
								userCheckCos.push("0.9");
							}
							myglysChart = echarts.init(document.getElementById('glysChart'));
						    var option = getGlys(json,deviceName);
						    myglysChart.setOption(option);
						    myglysChart.hideLoading();
						    glysDataFx(json);
						    
						}
					);
			}
		});
	}
}
/**
 * 照明设备echarts图
 * @param dataMap
 * @param title
 * @returns
 */
function getZmData(dataMap,title){
	var option = {};
	var type = $('#byqQueryType').combobox('getValue');
	if(type == 'D'){
		option = {
				title: {
			    	 text: consName+'负荷'+ (title==''?'':'('+title+')'),
			        y: '10px',
			        left: 'center'
			    },
		    legend: {
		        x: 'center',
		        y: '35',
		        data: ['负荷']
		    }, 
		    toolbox:{
		    	show:true,
		    	feature:{
		    		dataZoom:{},
//		    		dataView:{readOnly:false},
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
//		            boundaryGap : [0, 0.01],
		            boundaryGap:false,
		            symbolSize : 1,//点直径
		            splitLine: {
		                show: false,
		                lineStyle: {
		                    color: '#dfdfdf',
		                    width: 1,
		                    type: 'dashed'
		                }
		            },
		            data:dataMap.categes
		        }
		    ],
		    yAxis: [{
		        name: '单位(kW)',
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
		        min:'0' 
		    }],
		    tooltip: {
		    	trigger: 'axis',
		    	formatter: function(params) {
		    		if(params!=null && params[0]!=null){
//			    		var paramResult = params[0].seriesName +'时间: '+ dataMap.sMap.currentDate[params[0].dataIndex].substr(0,dataType=='1'?10:7) + '<br/>';
//						paramResult += params[0].seriesName + '值 : ' + params[0].value + '<br/>';
//						paramResult += params[1].seriesName+ '时间: '+ dataMap.sMap.preDate[params[0].dataIndex].substr(0,dataType=='1'?10:7) + '<br/>';
//						paramResult += params[1].seriesName + '值 : ' + params[1].value + '<br/>';
						
						var paramResult = '';
						paramResult += '负荷 : ' ;
						paramResult +=  dataMap.rateData[params[0].dataIndex] + 'kW'+'<br/>';
						paramResult += '日期 : ' ;
						paramResult +=  dataMap.categes[params[0].dataIndex]+'';
						return paramResult;
		    		}
		    	}
		    },
		    series: [
		        {
		            name: '负荷',
		            type: 'line',
		            data:dataMap.rateData//数据,
		        }
		    ]
		};
	}else if(type == 'M'){
		option = {
				title: {
			    	 text: consName+'负荷'+ (title==''?'':'('+title+')'),
			        y: '10px',
			        left: 'center'
			    },
		    legend: {
		        x: 'center',
		        y: '35',
		        data: ['最大负荷','最小负荷','平均负荷']
		    }, 
		    toolbox:{
		    	show:true,
		    	feature:{
		    		dataZoom:{},
//		    		dataView:{readOnly:false},
		    		magicType:{type:['line','bar']},
		    		restore:{},
		    		saveAsImage:{}
		    	}
		    },
		  //设置grid位置
			   grid : {
					 x : 55, //左边距离
					 y : 75,//上边距离
					 x2 : 35,//右边距离
					 y2 : 35//下边距离
				},
		    xAxis: [
		        {
		        	
		            type: 'category',
//		            boundaryGap : [0, 0.01],
		            boundaryGap:false,
		            symbolSize : 1,//点直径
		            splitLine: {
		                show: false,
		                lineStyle: {
		                    color: '#dfdfdf',
		                    width: 1,
		                    type: 'dashed'
		                }
		            },
		            data:dataMap.categes
		        }
		    ],
		    yAxis: [{
		        name: '单位(kW)',
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
		        min:'0' 
		    }],
		    tooltip: {
		    	trigger: 'axis',
		    	formatter: function(params) {
		    		if(params!=null && params[0]!=null){
//			    		var paramResult = params[0].seriesName +'时间: '+ dataMap.sMap.currentDate[params[0].dataIndex].substr(0,dataType=='1'?10:7) + '<br/>';
//						paramResult += params[0].seriesName + '值 : ' + params[0].value + '<br/>';
//						paramResult += params[1].seriesName+ '时间: '+ dataMap.sMap.preDate[params[0].dataIndex].substr(0,dataType=='1'?10:7) + '<br/>';
//						paramResult += params[1].seriesName + '值 : ' + params[1].value + '<br/>';
						
						var paramResult = '';
						paramResult +=  '最大负荷 : ' ;
						paramResult +=  dataMap.maxData[params[0].dataIndex] + 'kW'+'<br/>';
						paramResult += '最小负荷 : ' ;
						paramResult +=  dataMap.minData[params[0].dataIndex] + 'kW'+'<br/>';
						paramResult += '平均负荷 : ' ;
						paramResult +=  dataMap.avgData[params[0].dataIndex] + 'kW'+'<br/>';
						paramResult += '日期 : ' ;
						paramResult +=  dataMap.categes[params[0].dataIndex]+'';
						return paramResult;
		    		}
		    	}
		    },
		    series: [
		        {
		            name: '最大负荷',
		            type: 'line',
		            data:dataMap.maxData//数据,
		        }, {
		            name: '最小负荷',
		            type: 'line',
		            data:dataMap.minData//数据,
		        },{
		            name: '平均负荷',
		            type: 'line',
		            data:dataMap.avgData//数据,
		        }
		    ]
		};
	}
	return option;
//	myfheChart.setOption(option,true);
}
function setTime(num){
	var time = '';
	var h = '';
	h = fillTime(parseInt(num));
	time = h+":00";
	return time;
}

function fillTime(time){
	if(time<10){
		time = '0'+time;
	}
	return time;
}

function getGlys(dataMap,title){
	var x = [];
	var y = [];
	for(var i = 1;i<32;i++){
		x.push(setTime(i));
		y.push(Math.floor(Math.random()*100));
	}
//var option = {
//		title: {
//	    	 text: consName+'功率因数'+ (title==''?'':'('+title+')'),
//	        y: '10px',
//	        left: 'center'
//	    },
//    legend: {
//        x: 'center',
//        y: '35',
//        data: ['功率因数']
//    }, 
//  //设置grid位置
//	   grid : {
//			 x : 55, //左边距离
//			 y : 75,//上边距离
//			 x2 : 35,//右边距离
//			 y2 : 35//下边距离
//		},
//    xAxis: [
//        {
//        	
//            type: 'category',
////	            boundaryGap : [0, 0.01],
//            boundaryGap:false,
//            symbolSize : 1,//点直径
//            splitLine: {
//                show: false,
//                lineStyle: {
//                    color: '#dfdfdf',
//                    width: 1,
//                    type: 'dashed'
//                }
//            },
//            data:dataMap.categes
//        }
//    ],
//    yAxis: [{
////        name: '单位()',
//        type: 'value',
//        splitNumber: 5,
//        splitLine: {
//            lineStyle: {
//                color: '#dfdfdf',
//                width: 1,
//                type: 'dashed'
//            }
//        },
//         
//        axisLabel: {
//            formatter: '{value}'
//        },
//        min:'0.6',
//        max:'auto'
//    }],
//    tooltip: {
//        trigger: 'axis',
//        formatter: function(params) {
//        	if(params!=null && params[0]!=null){
//	        	var paramResult = '时间: '+ params[0].name + '<br/>';
//	        	for ( var i = 0; i < params.length; i++) {
//					paramResult += params[i].seriesName + ' : ' 
////									 + params[i].value + ' <br/>';
//					+params[i].value+'<br/>';
//				}
//               return paramResult;
//	        	}
//    	}
//    },
//    series: [
//        {
//            name: '功率因数',
//            type: 'line',
//            data:dataMap.ListenergyP//数据,
//        },
//        {
//            name:'标准值',
//            type:'line',
//            data:[dataMap.powerFactors[0]],
//            itemStyle:{
//                normal:{opacity:0,color:'red'}
//            }
//        }
//       /* {
//            name: '最小用电量',
//            type: 'line',
//            data:dataMap.sMap.minData//数据,
//        },{
//            name: '平均用电量',
//            type: 'line',
//            data:dataMap.sMap.avgData//数据,
//        }*/
//    ]
//};
	var series = [];//图标曲线集
	var legend = [];
	series.push( {
        name: '功率因数',
        type: 'line',
        data:dataMap.ListenergyP//数据,
    } );
	series.push({
        name:'标准值',
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
	legend.push('功率因数');
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
		        	var paramResult = '时间: '+ params[0].name + '<br/>';
//		        	for ( var i = 0; i < params.length; i++) {
						paramResult += params[0].seriesName + ' : ' 
	//									 + params[i].value + ' <br/>';
						+params[0].value+'<br/>';
//					}
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
	                formatter: '{value}'
	            },
	            min:'0.6',
	            max:'1'
	    },
	    series: series
	        
	};	
return option;	 
//ydzsChart.setOption(option,true);
}


function checkLoadRate(data,sumdata){
	var maxFZL = document.getElementById('maxFZL');
	var maxFZLdate = document.getElementById('maxdate');
	var minFZL = document.getElementById('minFZL');
	var minFZLdate = document.getElementById('mindate');
	var avgFZL = document.getElementById('avgFZL');
	var type = $('#byqQueryType').combobox('getValue');
	var flag = true;
	var maxValue='';
	var minValue='';
	var avgValue;
	var maxTime='-';
	var minTime='-';
	var sumValue = 0;
	var count = 0;
	if(data.length != 0){
		if(type == 'D'){
//			if(sumdata.length>0){
//				maxFZL.innerHTML = sumdata[0].maxValue;//最大负载率
//				maxFZLdate.innerHTML = sumdata[0].maxDate;
//				minFZL.innerHTML = sumdata[0].minValue;//最小负载率
//				minFZLdate.innerHTML = sumdata[0].minDate;
//				avgFZL.innerHTML = sumdata[0].avgValue;
//			}else{
//				maxFZL.innerHTML = "-";//最大负载率
//				maxFZLdate.innerHTML = "-";
//				minFZL.innerHTML = "-";//最小负载率
//				minFZLdate.innerHTML = "-";
//				avgFZL.innerHTML = "-";
//			}
			for(var i=0;i<data.length ;i++){
				if(data[i].loadRate != null){
					if(data[i].loadRate != ""){
						if(maxValue==""){
							maxValue = parseFloat(data[i].loadRate);
							maxTime = data[i].dataDate;
						}else if(maxValue!=""&&maxValue<parseFloat(data[i].loadRate)){
							maxValue = parseFloat(data[i].loadRate);
							maxTime = data[i].dataDate;
						}
					}
					if(data[i].loadRate != ""){
//						minValue = "";
//						minTime = data[i].minTime;
						if(minValue=="" && minValue.length==0){
							minValue = parseFloat(data[i].loadRate);
							minTime = data[i].dataDate;
						}else if(minValue!=""&& minValue.length!=0&&minValue>parseFloat(data[i].loadRate)){
							minValue = parseFloat(data[i].loadRate);
							minTime = data[i].dataDate;
						}						
					}
					if(data[i].loadRate != ""){
//						
						sumValue += parseFloat(data[i].loadRate);
						count++;
						
					}	
				}
			}
			if(maxValue != null&&maxValue!=''){
				maxFZL.innerHTML = maxValue;//最大负载率
				maxFZLdate.innerHTML = maxTime;
			}else if(maxValue == 0){
				maxFZL.innerHTML = maxValue;//最大负载率
				maxFZLdate.innerHTML = maxTime;
			}else{
				maxFZL.innerHTML = '-';//最大负载率
				maxFZLdate.innerHTML =  '-';
			}
			if(minValue != null&&minValue!=''){
				minFZL.innerHTML = minValue;//最小负载率
				minFZLdate.innerHTML = minTime;
			}else if(minValue == 0){
				minFZL.innerHTML = minValue;//最小负载率
				minFZLdate.innerHTML = minTime;
			}else{
				minFZL.innerHTML = '-';//最小负载率
				minFZLdate.innerHTML =  '-';
			}
			if(sumValue != 0){
				avgFZL.innerHTML = (sumValue/count).toFixed(2);
			}else{
				avgFZL.innerHTML = '0';
			}
			
		}else if(type == 'M'){
			for(var i=0;i<data.length ;i++){
				if(data[i].maxLoadrate != null || data[i].minLoadRate != null || data[i].avgLoadrateower != null){
//					if(flag){
//						if(data[i].maxLoadrate != ""){
//							maxValue = parseFloat(data[i].maxLoadrate);
//							maxTime = data[i].maxTime;
//							minValue = parseFloat(data[i].minLoadRate);
//							minTime = data[i].minTime;
//							sumValue += parseFloat(data[i].avgLoadrateower);
//							count++;
//						}else{
//							maxValue = 0;
//							maxTime = data[i].maxTime;
//							sumValue += 0;
//						}
						if(data[i].maxLoadrate != ""){
							if(maxValue==""){
								maxValue = parseFloat(data[i].maxLoadrate);
								maxTime = data[i].maxTime;
							}else if(maxValue!=""&&maxValue<parseFloat(data[i].maxLoadrate)){
								maxValue = parseFloat(data[i].maxLoadrate);
								maxTime = data[i].maxTime;
							}
						}
						if(data[i].minLoadRate != ""){
//							minValue = "";
//							minTime = data[i].minTime;
							if(minValue=="" && minValue.length==0){
								minValue = parseFloat(data[i].minLoadRate);
								minTime = data[i].minTime;
							}else if(minValue!=""&& minValue.length!=0 && minValue>parseFloat(data[i].minLoadRate)){
								minValue = parseFloat(data[i].minLoadRate);
								minTime = data[i].minTime;
							}
							
						}
						if(data[i].avgLoadrateower != ""){
//							
							sumValue += parseFloat(data[i].avgLoadrateower);
							count++;
							
						}						
//						flag = false;
//					}
//					if(data[i].maxLoadrate != "" && maxValue < parseFloat(data[i].maxLoadrate)){
//						maxValue = parseFloat(data[i].maxLoadrate);
//						maxTime = data[i].maxTime;
//					}
//					if((data[i].minLoadRate != "" && minValue > parseFloat(data[i].minLoadRate)) || (minValue == "" &&  parseFloat(data[i].minLoadRate) != "NaN")){
//						minValue = parseFloat(data[i].minLoadRate);
//						minTime = data[i].minTime;
//					}
//					if(data[i].avgLoadrateower != null && data[i].avgLoadrateower !=""){
//						sumValue += parseFloat(data[i].avgLoadrateower);
//						count++;
//					}
				}
			}
			if(maxValue != null&&maxValue!=''){
				maxFZL.innerHTML = maxValue;//最大负载率
				maxFZLdate.innerHTML = maxTime;
			}else{
				maxFZL.innerHTML = '-';//最大负载率
				maxFZLdate.innerHTML =  '-';
			}
			if(minValue != null&&minValue!=''){
				minFZL.innerHTML = minValue;//最小负载率
				minFZLdate.innerHTML = minTime;
			}else if(minValue == 0){
				minFZL.innerHTML = minValue;//最小负载率
				minFZLdate.innerHTML = minTime;
			}else{
				minFZL.innerHTML = '-';//最小负载率
				minFZLdate.innerHTML =  '-';
			}
			if(sumValue != 0){
				avgFZL.innerHTML = (sumValue/count).toFixed(2);
			}else{
				avgFZL.innerHTML = '-';
			}
		}
	}	
}
/**
 * 功率因数分析
 * @param json
 */
function glysDataFx(json){
	var j=0;
	var a=0;
	var ListenergyP = json.ListenergyP;
	var powerFactors = json.powerFactors[0];
	if(powerFactors == "" || powerFactors == null){
		for(var i=0;i<ListenergyP.length;i++){		
			if(ListenergyP[i] != "" && ListenergyP[i]<0.9){
				j++
			}else if(ListenergyP[i] != "" && ListenergyP[i]>=0.9){
				a++;
			}
		}
		if(j>0){
			var text1 = "一个月内有"+j+"天低于标准值，"+"建议贵公司增加无功补偿装置，使功率因数达到标准。";
			$("#jnjyABS").text(text1);
		}else if(a>0){
			var text2 = "高于标准值，建议继续保持。";
			$("#jnjyABS").text(text2);
		}else{
			$("#jnjyABS").text('无功率因数数据。');
		}
		
		
//		var text0 = "标准值不存在，请添加标准值!"
//		$("#jnjyABS").text(text0);
		return;
	}
	for(var i=0;i<ListenergyP.length;i++){		
		if(ListenergyP[i] != "" && ListenergyP[i]<powerFactors){
			j++
		}else if(ListenergyP[i] != "" && ListenergyP[i]>=powerFactors){
			a++;
		}
	}
	if(j>0){
		var text1 = "一个月内有"+j+"天低于标准值，"+"建议贵公司增加无功补偿装置，使功率因数达到标准。";
		$("#jnjyABS").text(text1);
	}else if(a>0){
		var text2 = "高于标准值，建议继续保持。";
		$("#jnjyABS").text(text2);
	}else{
		$("#jnjyABS").text('无功率因数数据。');
	}
}
