/**
 * 空压机
 * @author 吴翔
 * @since 2017-04-17
 */
var mdylChart = '';//末端压力
var scqlChart = '';//输出气量
var scqyChart = '';//输出气压	
var ylcChart = '';//压力差
var xyChart = '';//泄压
var ydzsChart = '';//用电走势
var fzlChart = '';//负载率
var currentdate = new Date(); //当前日期
var startDate = new Date(); // 当前开始时间 
var endDate = new Date();//当前结束时间  
groupDateType = 'yyyy-MM';//日期类型
var dataType;
var currentMonth = DateUtil.dateToStr('yyyy-MM',currentdate);//当月
//第一次页面是否加载查询标识
var isFirstydzl = false;
var isFristql = false;//未点击气量
var isFristqy = false;//未点击气压
var isFristylc = false;//未点击压力差
var isFristxy = false;//未点击泄压
var isFristylz = false;//未点击走势
var isTabsType = 0;//默认压力值 

var dataDiffer = 3;//日期差  默认为三天（显示为96点）
var tranId =null;//变压器编码
var tranName = '';//变压器名称
var lineId = "";//线路Id
var consSelectAllCons = null;//所有的客户
var consSelectHistoryCons = null;//历史记录里的客户
var consSelectCon = null;//选中的客户
//js入口
$(function(){
	$('#startDate').val(DateUtil.dateToStr('yyyy-MM',startDate));
	// 判断是不是客户角色  true是客户角色 flase不是客户角色
	// 不是客户角色不显示用能报告按钮
	if(top.isCustomer == true){
		$("#bt_exportynbg").hide();
	}else{
		$("#bt_exportynbg").show();
	}
	
	ydzsChart = echarts.init(document.getElementById('ydzsChart'));//初始化用电走势chart
	fzlChart = echarts.init(document.getElementById('fzlChart'));//初始化用电走势chart
//	fzlChart = echarts.init(document.getElementById('fzlChart'));//初始化用电走势chart
//	$('#tabs').tabs({
//	       fit: true,//填充大小
//	       plain: true,
//	       onSelect: function(title,index){
//	    	      if(isFristql==false  && index == 1){
//	    	    	  scqlChart = echarts.init(document.getElementById('scqlChart'));//输出气量chart
////		    		   lsCountData(null,null);
//		    	  }else if(isFristqy==false  && index == 2){
//		    		  scqyChart = echarts.init(document.getElementById('scqyChart'));//输出气压chart
////		    		   ycCountData(null,null);
//		    	   }else if(isFristylc==false  && index == 3){
//		    		   ylcChart = echarts.init(document.getElementById('ylcChart'));//压力差chart
////		    		   ycCountData(null,null);
//		    	   }else if(isFristxy==false  && index == 4){
//		    		   xyChart = echarts.init(document.getElementById('xyChart'));//泄压chart
////		    		   ycCountData(null,null);
//		    	   }else if(isFristylz==false  && index == 5){
//		    		   mdylChart = echarts.init(document.getElementById('mdylChart'));//末端压力chart
////		    		   ycCountData(null,null);
//		    	   }
//	    	      
//	    	        isTabsType = index;//0 :走势  1:气量  2:气压 3:压力差 4:泄压  5:压力值
//	    	  	
//		    	  	if(isFristql==false  && isTabsType == 1){//当前首次点击的气量
//		    	  		isFristql=true;
//		    	  		getData(consName);
//		    	  	}else if(isFristqy==false  && isTabsType == 2){//当前首次点击的气压
//		    	  		isFristqy=true;
//		    	  		getData(consName);
//		    	  	}else if(isFristylc==false  && isTabsType == 3){//当前首次点击的压力差
//		    	  		isFristylc=true;
//		    	  		getData(consName);
//		    	  	}else if(isFristxy==false  && isTabsType == 4){//当前首次点击的泄压
//		    	  		isFristxy=true;
//		    	  		getData(consName);
//		    	  	}else if(isFristylz==false  && isTabsType == 5){//当前首次点击的压力值
//		    	  		isFristylz=true;
//		    	  		getData(consName);
//		    	  	}
//	    	      
//	    	     }
//		 }); 
//	$('#tabs').tabs({
//    fit: true,//填充大小
//    plain: true,
//    onLoad:function(panel){
//    	$("#startDate").show();
//  		$("#search").css('display',"");
//  		$("#startDayDate").hide();
//  		$("#search_fz").css('display','none');
//    },
//    onSelect: function(title,index){ 	      
//        isTabsType = index;//0 :用电走势 1:负载率  	
//    	  	if(isTabsType == 0){
//    	  		$("#startDate").show();
//    	  		$("#search").css('display',"");
//    	  		$("#startDayDate").hide();
//    	  		$("#search_fz").css('display','none');
//    	  		getData(tranName,lineId);//获取数据
//    	  	}else if(isTabsType == 1){
//    	  		$("#startDate").hide();
//    	  		$("#search").css('display','none');
//    	  		$("#startDayDate").show();
//    	  		$("#search_fz").css('display',"");
//    	  		getfzlData(tranName);
//    	  	} 	      
// 	     }
//	 });	
	if(consId==null || consId==''|| consId=="null"){//未获取到企业编码，加载左侧树
//	$('#tree-leftQyTree').tree({ //默认没参数，获取区域  企业  都是打开状态
//		// modeType=6，过滤含有空压机的客户
//		url:webContextRoot +'destree/queryTree.action?modeType=6',
//	    method:'get',
//	    multiple:false,//是否支持多选
//	    editable:'true',
//	    onClick: function(node){
//	    	// 获取根节点
//	    	var rootNode = $('#tree-leftQyTree').tree('getRoot',node.target);
//	    	// 不是根节点时，刷新页面
//	    	if(rootNode.id != node.id){
//				consId = node.id;//把树节点id赋给企业id
//				consName = node.text;//把树节点的值赋给企业名称
//				queryUserFiles();//查询用户档案
//				if(isTabsType == 0){
//					getkyjData();//查询空压机
//				}else if(isTabsType == 1){
//					getByqsb();
//				}								
//	    	}else{
//	    		$.messager.alert('提示', '请选择客户', 'warning');
//	    	}
//		},
//		onLoadSuccess:function(node, data){//加载成功返回
//			selectTree();//设置树默认选中节点
////			getkyjData();
//		}
//	});
//	searchTreeNode();
		consSelectMethod = "consSelectMethodLoad()";//定义选中后执行的方法
		consSelectHasRoot = false;//是否有区域能源根节点
		consSelectSearch("",true);
	}else{
		queryUserFiles();//查询用户档案
  	    getkyjData();//查询空压机
  	    getByqsb();
	}
	
	 //查询事件
	$('#search').click(function(){
		getData(tranName,lineId);//获取数据
	});
	
	//负载率查询事件	
	$('#search_fz').click(function(){
		getfzlData(tranId,tranName);
	});
	//变压器下拉框选择天、月
	 $('#byqQueryType').combobox({
			onSelect: function(param){
				if(param.value == 'D'){
					$('#startDayDate').val(DateUtil.dateToStr('yyyy-MM-dd',endDate));
					$('#startDayDate').show();
					$('#startDate').hide();
					date = $('#startDayDate').val();
					dateLast = new Date(date);
					dateLast = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('d',-1,dateLast));
					
					// 选择天数据 隐藏月数据 
					$('#startDayDate').val(dateLast);
					$('#startDayDate').show();
					$('#startDate').hide();
				}else if(param.value == 'M'){
					$('#startDate').val(DateUtil.dateToStr('yyyy-MM',endDate));
					$('#startDayDate').hide();
					$('#startDate').show();
					date = $('#startDate').val();
					dateLast = new Date(date);
					dateLast = DateUtil.dateToStr('yyyy-MM',DateUtil.dateAdd('m',-1,dateLast));
					
					// 选择月数据 隐藏天数据 
					$('#startDate').val(dateLast);
					$('#startDate').show();
					$('#startDayDate').hide();
				}
			}
		});
	
	//左减日期
	$('#left').click(function(){
		var dlzsQueryType = $('#byqQueryType').combobox('getValue');
		if(isTabsType == 0 && dlzsQueryType == 'M'){
			var startDate =  $('#startDate').val();//开始日期
			var nowDate = DateUtil.dateToStr('yyyy-MM',DateUtil.dateAdd('m',-1,DateUtil.strToDate(startDate)));
			$('#startDate').val(nowDate);
			getData(tranName,lineId);//获取数据
		}else if(isTabsType == 0 && dlzsQueryType == 'D'){
			var startDayDate =  $('#startDayDate').val();//开始日期
			var nowDate = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('d',-1,DateUtil.strToDate(startDayDate)));
			$('#startDayDate').val(nowDate);
			getData(tranName,lineId);//获取数据
		}else if(isTabsType == 1 && dlzsQueryType == 'M'){
			var startDate =  $('#startDate').val();//开始日期
			var nowDate = DateUtil.dateToStr('yyyy-MM',DateUtil.dateAdd('m',-1,DateUtil.strToDate(startDate)));
			$('#startDate').val(nowDate.substr(0,7));
			getfzlData(tranId,tranName);
		}else if(isTabsType == 1 && dlzsQueryType == 'D'){
			var startDayDate =  $('#startDayDate').val();//开始日期
			var nowDate = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('d',-1,DateUtil.strToDate(startDayDate)));
			$('#startDayDate').val(nowDate);
			getfzlData(tranId,tranName);
		}		
	});
	
	 //右加日期
	$('#right').click(function(){
		var dlzsQueryType = $('#byqQueryType').combobox('getValue');
		if(isTabsType == 0 && dlzsQueryType == 'M'){
			var startDate =  $('#startDate').val();//开始日期
			var nowDate = DateUtil.dateToStr('yyyy-MM',DateUtil.dateAdd('m',1,DateUtil.strToDate(startDate)));
			$('#startDate').val(nowDate);
			getData(tranName,lineId);//获取数据
		}else if(isTabsType == 0 && dlzsQueryType == 'D'){
			var startDayDate =  $('#startDayDate').val();//开始日期
			var nowDate = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('d',1,DateUtil.strToDate(startDayDate)));
			$('#startDayDate').val(nowDate);
			getData(tranName,lineId);//获取数据
		}else if(isTabsType == 1 && dlzsQueryType == 'M'){
			var startDate =  $('#startDate').val();//开始日期
			var nowDate = DateUtil.dateToStr('yyyy-MM',DateUtil.dateAdd('m',1,DateUtil.strToDate(startDate)));
			$('#startDate').val(nowDate.substr(0,7));
			getfzlData(tranId,tranName);
		}else if(isTabsType == 1 && dlzsQueryType == 'D'){
			var startDayDate =  $('#startDayDate').val();//开始日期
			var nowDate = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('d',1,DateUtil.strToDate(startDayDate)));
			$('#startDayDate').val(nowDate);
			getfzlData(tranId,tranName);
		}
	});
	
});
//tabs选项卡选择事件
function userTabsSelect(title,index){
	isTabsType = index;//0 :用电走势 1:负载率  	
  	if(isTabsType == 0){
  		$("#firstbyq").show();
  		$("#startDate").show();
  		$("#search").css('display',"");
  		$("#startDayDate").hide();
  		$("#sel_type").show();
  		$("#search_fz").css('display','none');
  		$("#secondbyq").hide();
  		$('#byqQueryType').combobox('select',"M");
  		getkyjData();
//  		ydzsChart = echarts.init(document.getElementById('ydzsChart'));//初始化用电走势chart 
//  		if(isFirstydzl == true){
//  	  		getData(tranName,lineId);//获取数据
//  	  	}
//  		isFirstydzl = true;
  	}else if(isTabsType == 1){
  		$("#firstbyq").hide();
//  		$("#startDate").show();
  		$("#startDate").hide();
  		$("#search").css('display','none');
//  		$("#startDayDate").hide();
  		$("#startDayDate").show();
  		$("#sel_type").show();
  		$("#search_fz").css('display',"");
  		$("#secondbyq").show();
  		getByqsb();
//  		fzlChart = echarts.init(document.getElementById('fzlChart'));//初始化用电走势chart
  		$('#byqQueryType').combobox('select',"D");
//  		getfzlData(tranName);
  	}
}

function consSelectMethodLoad(){
	if(consSelectCon.id.length < 4){	// 区域能源节点
		$("#clickTree").hide();
		$("#contentId").show();
		content='<iframe id="funcId" src="'+webContextRoot+'pages/despages/projectManage/tranOverview.jsp?orgNo='+consSelectCon.id+'" scrolling="no" frameborder="0" width="100%" height="100%"></iframe>'; 
		$("#contentId").empty();
		$('#contentId').append(content);
		consId = "";//把树节点id赋给企业id
		consName = "";//把树节点的值赋给企业名称
		queryUserFiles();//查询用户档案
		if(isTabsType == 0){
			getkyjData();//查询空压机
		}else if(isTabsType == 1){
			getByqsb();
		}
	}else{		// 企业节点
		$("#contentId").hide();
		$("#clickTree").show();
		consId = consSelectCon.id;//把树节点id赋给企业id
		consName = consSelectCon.text;//把树节点的值赋给企业名称
		queryUserFiles();//查询用户档案
		if(isTabsType == 0){
			getkyjData();//查询空压机
		}else if(isTabsType == 1){
			getByqsb();
		}	
	}
}
//选择树节点
function selectTree(nodeId){
	$('#tree-leftQyTree li:eq(0)').find('div').addClass("tree-node-selected");//添加选中样式
	var n = $('#tree-leftQyTree').tree('getSelected');//获取被选中的节点
	if(n!=null)//判断节点是否存在
	{
		$('#tree-leftQyTree').tree('select',n.target);
	}
	
	var chiNode = $('#tree-leftQyTree').tree('getChildren',n.target);//子节点
	if(chiNode.length == 0){
		getEchartsNull();
		$.messager.alert('提示', '请先给客户添加空压机', 'warning');
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
		       	    queryUserFiles();//档案查询
		       	    getkyjData();//查询空压机
//		       	    getByqsb();
//		       	    getfzlData(tranId,tranName);
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
function getData(title,lineId){
	ydzsChart = echarts.init(document.getElementById('ydzsChart'));//初始化用电走势chart
//	fzlChart = echarts.init(document.getElementById('fzlChart'));//初始化用电走势chart
	if(isTabsType==0){//用电走势tab
		ydzsChart.showLoading({
			text:'正在努力的读取数据中...',
			effect:'spin'
		});
	}
	var dlzsQueryType = $('#byqQueryType').combobox('getValue');
	if(isTabsType == 0 && dlzsQueryType == 'M'){
		var startDate =  $('#startDate').val();//开始日期
		var startDateWzx = startDate+"-01";// 开始时间
		var getMonth = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('m',1,DateUtil.strToDate(startDate+"-01")));
		var endDateWzx = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('d',-1,DateUtil.strToDate(getMonth)));// 结束时间
		
		if(startDate> endDate){//开始时间大于结束时间警告
			$.messager.alert('提示', "开始日期不能大于结束日期！", 'warning');
			return;
		}
		 	$.getJSON(webContextRoot + 'kyj/queryKyjData.action', 
				{ 
				   //请求参数
					'kyjYdzsModel.beginDate': startDateWzx,//开始时间
					'kyjYdzsModel.endDate': endDateWzx,//结束时间
					'kyjYdzsModel.lineId': lineId,//设备ID
					'kyjYdzsModel.dataDate': $('#startDate').val()//设备ID
				},
				function(json){
					   ydzsCountData(json,title);
					   ydzsChart.hideLoading();
				}
			);
	}else if(isTabsType == 0 && dlzsQueryType == 'D'){
		var date =  $('#startDayDate').val();//开始日期
		$.getJSON(webContextRoot + 'kyj/getKyjSubsHour.action',  
				{ 
				   //请求参数
					'sEnergyLineHourModel.dataDate': date,//当前时间
					'sEnergyLineHourModel.lineId': lineId//设备ID
				},
				function(json){
					   ydzsCountData(json,title);
					   ydzsChart.hideLoading();				
				}
			);
	}
	
}

/**
 * 根据设备id查询设备信息
 */
function queryDev(deviceId,consId){
	   //清空设备信息
	   $("#eddyBS").text('-');
	   $("#eddlBS").text('-');
	   $("#ggxhBS").text('-');//
	   $("#ztrqBS").text('-');
	   $("#yxztBS").text('-');
//	if(devId==null || devId==''){//设备编码不存在，不获取设备信息
	if(deviceId==null || deviceId==''){
		 return;
	}

	$.post(webContextRoot +'kyj/getZhSfLine.action',
			//?zhSfLineModel.lineId='+deviceId+'&zhSfLineModel.consId='+consId,
//	   {'kyjInfoModel.devId':devId},
		{
			'zhSfLineModel.lineId':deviceId,
			'zhSfLineModel.consId':consId
		},
	   function(data){
		 if(data.length>0){			   

//			   $("#eddyBS").text(data[0].devNo==""?'-':data[0].devNo);
			   $("#eddyBS").text(data[0].productKind==""?'-':data[0].productKind);
//			   $("#eddlBS").text(data[0].facCode==""?'-':data[0].facCode);
//			   $("#ggxhBS").text(data[0].stPower==""?'-':data[0].stPower);
//			   $("#ztrqBS").text(data[0].ofacDate==""?'-':data[0].ofacDate.slice(0,data[0].ofacDate.indexOf(' ')));
//			   $("#yxztBS").text(data[0].runStatus==""?'-':data[0].runStatus);
			   $("#eddlBS").text(data[0].factoryCode==""?'-':data[0].factoryCode);
			   $("#ggxhBS").text(data[0].powerRate==""?'-':data[0].powerRate+"W");
			   $("#ztrqBS").text(data[0].createDate==""?'-':data[0].createDate.slice(0,10));
			   $("#yxztBS").text(data[0].runStatus==""?'-':data[0].runStatus);
		   }

	   },"json");
}
//查询下拉框的空压机设备
/*function getbyqData(){

function getkyjData(){

	 
	$.getJSON(webContextRoot +'lineMonitor/queryKyjInfo.action', //查询用户变下面的负载率和变损率
		{ 
	      'kyjInfoModel.consId':consId//用户变id
		},
		function(json){//返回值
			$('#byq').combobox({
				panelWidth: null,
				data:json,
				valueField: 'devId',
				textField: 'devName',
				onLoadSuccess:function(){
					var byqData = $(this).combobox("getData");
					if(byqData.length>0){
						$('#byq').combobox('select',byqData[0].devId);
					}else{
						$('#byq').combobox('select','');
						devId = '';//设备id赋值空
						devName = '';//设备name赋值空
						queryDev(devId);//根据设备id查询设备信息
						getData(devName);//获取数据
					}
				},
				onSelect:function(data){
					devId = data.devId;//设备id赋值
					devName = data.devName;//设备name赋值
					queryDev(devId);//根据设备id查询设备信息
					getData(devName);//获取数据
				}
			});
		}
 );
	
}*/ 

function getkyjData(){
//	if(consId != ""){
		$('#byq').combobox({
			url : webContextRoot +'kyj/getZhSfLine.action?zhSfLineModel.consId='+consId,
			valueField : 'lineId',
			textField : 'lineName',
			onLoadSuccess:function(){
				var byqData = $(this).combobox("getData");
				if(byqData.length>0){
					$('#byq').combobox('select',byqData[0].lineId);
				}else{
					$('#byq').combobox('select','');
					lineId = '';
					lineName = '';
					queryDev(lineId,consId);
					getData(lineName,lineId);//获取数据
				}
			},
			onSelect:function(record){
				lineId = record.lineId;
				lineName = record.lineName;
				tranName = lineName;
				queryDev(lineId,consId);
				getData(lineName,lineId);//获取数据
			}
		});
//	}
//	else{
//		queryDev('','');
//		getData('','');//获取数据
//	}
	
}
//末端压力图
function mdylCountData(dataMap,title){
	var x = [];
	var y = [];
	for(var i = 1;i<32;i++){
		x.push(setTime(i));
		y.push(Math.floor(Math.random()*100));
	}
var option = {
		title: {
	    	 text: consName+'末端压力值'+ (title==''?'':'('+title+')'),
	        y: '10px',
	        left: 'center'
	    },
    legend: {
        x: 'center',
        y: '35',
        data: ['最大末端压力值','最小末端压力值','平均末端压力值']
    }, 
  //设置chart图位置
	   grid : {
			 x : 55, //左边距离
			 y : 75,//上边距离
			 x2 : 40,//右边距离
			 y2 : 35//下边距离
		},
    xAxis: [
        {
        	
            type: 'category',
//            boundaryGap : [0, 0.01],
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
            data:x//dataMap.sMap.categes
        }
    ],
    yAxis: [{
        name: '单位(MPa)',
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
//				paramResult +=  '最大末端压力值: ' ;
//				paramResult +=  dataMap.sMap.maxData[params[0].dataIndex] + '<br/>';
//				paramResult += '最小末端压力值 : ' ;
//				paramResult +=  dataMap.sMap.minData[params[0].dataIndex] + '<br/>';
//				paramResult += '平均末端压力值 : ' ;
//				paramResult +=  dataMap.sMap.avgData[params[0].dataIndex]+'';
				return paramResult;
    		}
    	}
    },
    series: [
        {
            name: '最大末端压力值',
            type: 'line',
            data:y//dataMap.sMap.maxData//数据,
        }, {
            name: '最小末端压力值',
            type: 'line',
            data:dataMap.minData//数据,
        },{
            name: '平均末端压力值',
            type: 'line',
            data:dataMap.avgData//数据,
        }
    ]
};
	 
mdylChart.setOption(option,true);
}

//输出气量图
//function scqlCountData(dataMap,title){
//	var x = [];
//	var y = [];
//	for(var i = 1;i<32;i++){
//		x.push(setTime(i));
//		y.push(Math.floor(Math.random()*100));
//	}
//var option = {
//		title: {
//	    	 text: consName+'输出气量'+ (title==''?'':'('+title+')'),
//	        y: '10px',
//	        left: 'center'
//	    },
//    legend: {
//        x: 'center',
//        y: '35',
//        data: ['最大输出气量','最小输出气量','平均输出气量']
//    }, 
//  //设置grid位置
//	   grid : {
//			 x : 55, //左边距离
//			 y : 75,//上边距离
//			 x2 : 25,//右边距离
//			 y2 : 35//下边距离
//		},
//    xAxis: [
//        {
//        	
//            type: 'category',
//            boundaryGap : [0, 0.01],
//            symbolSize : 1,//点直径
//            splitLine: {
//                show: false,
//                lineStyle: {
//                    color: '#dfdfdf',
//                    width: 1,
//                    type: 'dashed'
//                }
//            },
//            data:x//dataMap.sMap.categes
//        }
//    ],
//    yAxis: [{
//        name: '单位(m³)',
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
//        min:'0',
//        max:'auto'
//    }],
//    tooltip: {
//    	trigger: 'axis',
//    	formatter: function(params) {
//    		if(params!=null && params[0]!=null){
////	    		var paramResult = params[0].seriesName +'时间: '+ dataMap.sMap.currentDate[params[0].dataIndex].substr(0,dataType=='1'?10:7) + '<br/>';
////				paramResult += params[0].seriesName + '值 : ' + params[0].value + '<br/>';
////				paramResult += params[1].seriesName+ '时间: '+ dataMap.sMap.preDate[params[0].dataIndex].substr(0,dataType=='1'?10:7) + '<br/>';
////				paramResult += params[1].seriesName + '值 : ' + params[1].value + '<br/>';
//				
//				var paramResult = '';
////				paramResult +=  '最大输出气量: ' ;
////				paramResult +=  dataMap.sMap.maxData[params[0].dataIndex] + '<br/>';
////				paramResult += '最小输出气量 : ' ;
////				paramResult +=  dataMap.sMap.minData[params[0].dataIndex] + '<br/>';
////				paramResult += '平均输出气量 : ' ;
////				paramResult +=  dataMap.sMap.avgData[params[0].dataIndex]+'';
//				return paramResult;
//    		}
//    	}
//    },
//    series: [
//        {
//            name: '最大输出气量',
//            type: 'line',
//            data:y//dataMap.sMap.maxData//数据,
//        }, {
//            name: '最小输出气量',
//            type: 'line',
//            data:dataMap.minData//数据,
//        },{
//            name: '平均输出气量',
//            type: 'line',
//            data:dataMap.avgData//数据,
//        }
//    ]
//};
//	 
//scqlChart.setOption(option,true);
//}

//输出气压图
function scqyCountData(dataMap,title){
	var x = [];
	var y = [];
	for(var i = 1;i<32;i++){
		x.push(setTime(i));
		y.push(Math.floor(Math.random()*100));
	}
var option = {
		title: {
	    	 text: consName+'输出气压'+ (title==''?'':'('+title+')'),
	        y: '10px',
	        left: 'center'
	    },
    legend: {
        x: 'center',
        y: '35',
        data: ['最大输出气压','最小输出气压','平均输出气压']
    }, 
  //设置grid位置
	   grid : {
			 x : 55, //左边距离
			 y : 75,//上边距离
			 x2 : 40,//右边距离
			 y2 : 35//下边距离
		},
    xAxis: [
        {
        	
            type: 'category',
//            boundaryGap : [0, 0.01],
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
            data:x//dataMap.sMap.categes
        }
    ],
    yAxis: [{
        name: '单位(MPa)',
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
//				paramResult +=  '最大输出气压: ' ;
//				paramResult +=  dataMap.sMap.maxData[params[0].dataIndex] + '<br/>';
//				paramResult += '最小输出气压 : ' ;
//				paramResult +=  dataMap.sMap.minData[params[0].dataIndex] + '<br/>';
//				paramResult += '平均输出气压 : ' ;
//				paramResult +=  dataMap.sMap.avgData[params[0].dataIndex]+'';
				return paramResult;
    		}
    	}
    },
    series: [
        {
            name: '最大输出气压',
            type: 'line',
            data:y//dataMap.sMap.maxData//数据,
        }, {
            name: '最小输出气压',
            type: 'line',
            data:dataMap.minData//数据,
        },{
            name: '平均输出气压',
            type: 'line',
            data:dataMap.avgData//数据,
        }
    ]
};
	 
scqyChart.setOption(option,true);
}

//压力差图
function ylcCountData(dataMap,title){
	var x = [];
	var y = [];
	for(var i = 1;i<32;i++){
		x.push(setTime(i));
		y.push(Math.floor(Math.random()*100));
	}
var option = {
		title: {
	    	 text: consName+'压力差'+ (title==''?'':'('+title+')'),
	        y: '10px',
	        left: 'center'
	    },
    legend: {
        x: 'center',
        y: '35',
        data: ['最大压力差','最小压力差','平均压力差']
    }, 
  //设置grid位置
	   grid : {
			 x : 55, //左边距离
			 y : 75,//上边距离
			 x2 : 40,//右边距离
			 y2 : 35//下边距离
		},
    xAxis: [
        {
        	
            type: 'category',
//            boundaryGap : [0, 0.01],
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
            data:x//dataMap.sMap.categes
        }
    ],
    yAxis: [{
        name: '单位(MPa)',
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
				paramResult +=  '最大压力差: ' ;
//				paramResult +=  dataMap.sMap.maxData[params[0].dataIndex] + '<br/>';
//				paramResult += '最小压力差 : ' ;
//				paramResult +=  dataMap.sMap.minData[params[0].dataIndex] + '<br/>';
//				paramResult += '平均压力差: ' ;
//				paramResult +=  dataMap.sMap.avgData[params[0].dataIndex]+'';
				return paramResult;
    		}
    	}
    },
    series: [
        {
            name: '最大压力差',
            type: 'line',
            data:y//dataMap.sMap.maxData//数据,
        }, {
            name: '最小压力差',
            type: 'line',
            data:dataMap.minData//数据,
        },{
            name: '平均压力差',
            type: 'line',
            data:dataMap.avgData//数据,
        }
    ]
};
	 
ylcChart.setOption(option,true);
}

//泄压图
function xyCountData(dataMap,title){
	var x = [];
	var y = [];
	for(var i = 1;i<32;i++){
		x.push(setTime(i));
		y.push(Math.floor(Math.random()*100));
	}
	
var option = {
		title: {
	    	 text: consName+'泄压'+ (title==''?'':'('+title+')'),
	        y: '10px',
	        left: 'center'
	    },
    legend: {
        x: 'center',
        y: '35',
        data: ['最大泄压','最小泄压','平均泄压']
    }, 
  //设置grid位置
	   grid : {
			 x : 55, //左边距离
			 y : 75,//上边距离
			 x2 : 40,//右边距离
			 y2 : 35//下边距离
		},
    xAxis: [
        {
        	
            type: 'category',
//            boundaryGap : [0, 0.01],
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
            data:x//dataMap.sMap.categes
        }
    ],
    yAxis: [{
        name: '单位(MPa)',
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
//				paramResult +=  '最大泄压: ' ;
//				paramResult +=  dataMap.sMap.maxData[params[0].dataIndex] + '<br/>';
//				paramResult += '最小泄压 : ' ;
//				paramResult +=  dataMap.sMap.minData[params[0].dataIndex] + '<br/>';
//				paramResult += '平均泄压: ' ;
//				paramResult +=  dataMap.sMap.avgData[params[0].dataIndex]+'';
				return paramResult;
    		}
    	}
    },
    series: [
        {
            name: '最大泄压',
            type: 'line',
            data:y//dataMap.sMap.maxData//数据,
        }, {
            name: '最小泄压',
            type: 'line',
            data:dataMap.minData//数据,
        },{
            name: '平均泄压',
            type: 'line',
            data:dataMap.avgData//数据,
        }
    ]
};
	 
xyChart.setOption(option,true);
}

//用电走势图
function ydzsCountData(dataMap,title){
	var x = [];
	var y = [];
	var type = $('#byqQueryType').combobox('getValue');
	for(var i = 1;i<32;i++){
		x.push(setTime(i));
		y.push(Math.floor(Math.random()*100));
	}
	if(type == "M"){
		var option = {
				title: {
			    	 text: consName+'用电走势'+ (title==''?'':'('+title+')'),
			        y: '10px',
			        left: 'center'
			    },
		    legend: {
		        x: 'center',
		        y: '35',
		        data: ['用电量']
		    }, 
		  //设置grid位置
			   grid : {
					 x : 55, //左边距离
					 y : 75,//上边距离
					 x2 : 40,//右边距离
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
		    }],
		    tooltip: {
		        trigger: 'axis',
		        formatter: function(params) {
		        	if(params!=null && params[0]!=null){
			        	var paramResult = '时间: '+ params[0].name + '<br/>';
			        	for ( var i = 0; i < params.length; i++) {
							paramResult += params[i].seriesName + ' : ' 
//										 + params[i].value + ' <br/>';
							+params[i].value+'kWh'+'<br/>';
						}
		               return paramResult;
			        	}
		    	}
		    },
		    series: [
		        {
		            name: '用电量',
		            type: 'line',
		            data:dataMap.ListenergyP//数据,
		        },
		       /* {
		            name: '最小用电量',
		            type: 'line',
		            data:dataMap.sMap.minData//数据,
		        },{
		            name: '平均用电量',
		            type: 'line',
		            data:dataMap.sMap.avgData//数据,
		        }*/
		    ]
		};
	}else if(type == "D"){
		var option = {
				title: {
			    	 text: consName+'用电走势'+ (title==''?'':'('+title+')'),
			        y: '10px',
			        left: 'center'
			    },
		    legend: {
		        x: 'center',
		        y: '35',
		        data: ['用电量']
		    }, 
		  //设置grid位置
			   grid : {
					 x : 45, //左边距离
					 y : 75,//上边距离
					 x2 : 55,//右边距离
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
//		        min:'0',
		        min:'auto',
		        max:'auto'
		    }],
		    tooltip: {
		        trigger: 'axis',
		        formatter: function(params) {
		        	if(params!=null && params[0]!=null){
			        	var paramResult = '时间: '+ params[0].name + '<br/>';
			        	for ( var i = 0; i < params.length; i++) {
							paramResult += params[i].seriesName + ' : ' 
//										 + params[i].value + ' <br/>';
							+params[i].value+'kWh'+'<br/>';
						}
		               return paramResult;
			        	}
		    	}
		    },
		    series: [
		        {
		            name: '用电量',
		            type: 'line',
		            data:dataMap.ListenergyP//数据,
		        },
		       /* {
		            name: '最小用电量',
		            type: 'line',
		            data:dataMap.sMap.minData//数据,
		        },{
		            name: '平均用电量',
		            type: 'line',
		            data:dataMap.sMap.avgData//数据,
		        }*/
		    ]
	}
	}
	 
ydzsChart.setOption(option,true);
}



function setTime(num){
	var time = '';
	var h = '';
	h = fillTime(parseInt(num));
	time ="05/"+ h;
	return time;
}

function fillTime(time){
	if(time<10){
		time = '0'+time;
	}
	return time;
}
//获取变压器下拉框
function getByqsb(){
	$('#byqsb').combobox({
		url : webContextRoot +'kyj/getZhSfLine.action?zhSfLineModel.consId='+consId,
		valueField : 'lineId',
		textField : 'lineName',
		onLoadSuccess:function(){
			var byqData = $(this).combobox("getData");
			if(byqData.length>0){
				$('#byqsb').combobox('select',byqData[0].lineId);
			}else{
				$('#byq').combobox('select','');
				tranId = '';
				tranName = '';
				getfzlData(tranId,tranName);
				queryDevfzl(tranId,consId);
			}
		},
		onSelect:function(data){
			tranId = data.lineId;
			tranName = data.lineName;
			getfzlData(tranId,tranName);
			queryDevfzl(tranId,consId);
		}
	});
}

/**
 * 变压器负载率查询
 */
function getfzlData(tranId,title){
	var dataDate;
	var dlzsQueryType = $('#byqQueryType').combobox('getValue');
	if(dlzsQueryType == 'D'){
		dataDate =  $('#startDayDate').val();
	}else if(dlzsQueryType == 'M'){
		dataDate =  $('#startDate').val();
	}
	fzlChart.showLoading({
		text:'正在努力的读取数据中...',
		effect:'spin'
	});
	$.getJSON(webContextRoot + 'kyj/selectbyqFzlByLoadRate.action', 
			{ 
			   //请求参数
				'powerLoadModel.dataDate': dataDate,//开始时间
				'powerLoadModel.tranId': tranId,//变压器id
				'powerLoadModel.dataType': 4//设备类型
				
			},
			function(json){
				getpowerCountData(json,title);
				checkLoadRate(json.fzlList);
				fzlChart.hideLoading();
			}
		);
}
//节能建议
function checkLoadRate(data){
	var maxFZL = document.getElementById('maxFZL');
	var maxFZLdate = document.getElementById('maxdate');
	var minFZL = document.getElementById('minFZL');
	var minFZLdate = document.getElementById('mindate');
	var avgFZL = document.getElementById('avgFZL');
	var type = $('#byqQueryType').combobox('getValue');
	var flag = true;
	var maxValue;
	var minValue;
	var avgValue;
	var maxTime;
	var minTime;
	var sumValue = 0;
	var count = 0;
	if(data.length != 0){
		if(type == 'D'){
			for(var i=0;i<data.length ;i++){
				if(data[i].loadRate != null){
					if(flag){
						maxValue = parseFloat(data[i].loadRate);
						maxTime = data[i].dataDate;
						minValue = parseFloat(data[i].loadRate);
						minTime = data[i].dataDate;
						sumValue += parseFloat(data[i].loadRate);
						count++;
						flag = false;
					}
					if(maxValue < parseFloat(data[i].loadRate)){
						maxValue = parseFloat(data[i].loadRate);
						maxTime = data[i].dataDate;
						sumValue += parseFloat(data[i].loadRate);
						count++;
					}else if(minValue > parseFloat(data[i].loadRate)){
						minValue = parseFloat(data[i].loadRate);
						minTime = data[i].dataDate;
						sumValue += parseFloat(data[i].loadRate);
						count++;
					}
				}
			}
//			if(maxValue != null){
//				maxFZL.innerHTML = maxValue;//最大负载率
//				maxFZLdate.innerHTML = maxTime;
//			}else{
//				maxFZL.innerHTML = '-';//最大负载率
//				maxFZLdate.innerHTML =  '-';
//			}
//			if(minValue != null){
//				minFZL.innerHTML = minValue;//最小负载率
//				minFZLdate.innerHTML = minTime;
//			}else{
//				minFZL.innerHTML = '-';//最小负载率
//				minFZLdate.innerHTML =  '-';
//			}
//			if(sumValue != 0){
//				avgFZL.innerHTML = (sumValue/count).toFixed(2);
//			}else{
//				avgFZL.innerHTML = '-';
//			}
			
		}else if(type == 'M'){
			for(var i=0;i<data.length ;i++){
				if(data[i].maxLoadrate != null || data[i].minLoadRate != null || data[i].avgLoadrateower != null){
					if(flag){
						maxValue = parseFloat(data[i].maxLoadrate);
						maxTime = data[i].maxTime;
						minValue = parseFloat(data[i].minLoadRate);
						minTime = data[i].minTime;
						sumValue += parseFloat(data[i].avgLoadrateower);
						count++;
						flag = false;
					}
					if(maxValue < parseFloat(data[i].maxLoadrate)){
						maxValue = parseFloat(data[i].maxLoadrate);
						maxTime = data[i].maxTime;
					}
					if(minValue > parseFloat(data[i].minLoadRate)){
						minValue = parseFloat(data[i].minLoadRate);
						minTime = data[i].minTime;
					}
					if(data[i].avgLoadrateower != null){
						sumValue += parseFloat(data[i].avgLoadrateower);
						count++;
					}
				}
			}
//			if(maxValue != null){
//				maxFZL.innerHTML = maxValue;//最大负载率
//				maxFZLdate.innerHTML = maxTime;
//			}else{
//				maxFZL.innerHTML = '-';//最大负载率
//				maxFZLdate.innerHTML =  '-';
//			}
//			if(minValue != null){
//				minFZL.innerHTML = minValue;//最小负载率
//				minFZLdate.innerHTML = minTime;
//			}else{
//				minFZL.innerHTML = '-';//最小负载率
//				minFZLdate.innerHTML =  '-';
//			}
//			if(sumValue != 0){
//				avgFZL.innerHTML = (sumValue/count).toFixed(2);
//			}else{
//				avgFZL.innerHTML = '-';
//			}
		}
//		$('#fztj').text('空压机分析：');
//		if(minValue < 60 || maxValue > 90){
//			
//			$('#fztj_one').text('超负荷：1超容罚款,2绝缘提前老化降低变压器寿命,3计量不准,4超时间超载随时可能着火甚至爆炸（影响人身安全）');
//			$('#fztj_two').text('负载过低：1浪费变压器容量,2功率因数低导致多交力调电费');
//		}else if(minValue > 60 || maxValue < 90){
//			$('#fztj_one').text('合理，不存在“大马拉小车”或“小马拉大车”现象。继续保持。'); 
//			$('#fztj_two').text('');
//		}else{
//			$('#fztj_one').text('该设备下数据为空。'); 
//			$('#fztj_two').text('');
//		}
		var content_one='';
		var content_two='';
		
		$('#error_content').text(content_one); 
		$('#jy_content').text(content_two);
		$('#error_title').text('危害：'); 
		$('#jy_title').text('建议：');
		var error_cfh = '超负荷：</br>1、超容罚款；2、绝缘提前老化降低空压机寿命；3、计量不准；4、超时间超载随时可能着火甚至爆炸（影响人身安全）。';
		var error_fzgd = '负载过低：</br>1、浪费空压机功率；2、功率因数低导致多交力调电费。';
		var jy_one = '建议合理规划用电负荷，避免“小马拉大车”或 “小马拉大车”现象。';
		var jy_two = '建议合理规划用电负荷，避免“小马拉大车”现象。';
		var jy_three = '建议合理规划用电负荷，避免“大马拉小车”现象。';
		if(minValue < 60 && maxValue > 90){
			content_one = error_cfh + '</br>' + error_fzgd;
			content_two = jy_one;
		}else if(minValue < 60 ){
			content_one = error_fzgd;
			content_two = jy_two;
		}else if(maxValue > 90){
			content_one = error_cfh;
			content_two = jy_three;
		}else if(minValue == undefined || maxValue == undefined){
			$('#error_title').text('该设备下数据为空。'); 
			$('#jy_title').text('');
		}else{
			$('#error_title').text('该设备负载率合理，继续保持。'); 
			$('#jy_title').text('');
		}
		$('#error_content').append(content_one); 
		$('#jy_content').append(content_two);
	}
	
}

//负载率echarts柱状图
function getpowerCountData(dataMap,title){
	var option = {};
	var type = $('#byqQueryType').combobox('getValue');
	if(type == 'D'){
		option = {
				title: {
			    	 text: consName+'负载率'+ (title==''?'':'('+title+')'),
			        y: '10px',
			        left: 'center'
			    },
		    legend: {
		        x: 'center',
		        y: '35',
		        data: ['负载率']
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
					 x2 : 40,//右边距离
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
		        name: '单位(%)',
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
						paramResult += '负载率 : ' ;
						paramResult +=  dataMap.rateData[params[0].dataIndex] + '<br/>';
						paramResult += '日期 : ' ;
						paramResult +=  dataMap.categes[params[0].dataIndex]+'';
						return paramResult;
		    		}
		    	}
		    },
		    series: [
		        {
		            name: '负载率',
		            type: 'line',
		            data:dataMap.rateData//数据,
		        }
		    ]
		};
	}else if(type == 'M'){
		option = {
				title: {
			    	 text: consName+'负载率'+ (title==''?'':'('+title+')'),
			        y: '10px',
			        left: 'center'
			    },
		    legend: {
		        x: 'center',
		        y: '35',
		        data: ['最大负载率','最小负载率','平均负载率']
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
					 x2 : 40,//右边距离
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
		        name: '单位(%)',
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
						paramResult +=  '最大负载率 : ' ;
						paramResult +=  dataMap.maxData[params[0].dataIndex] + '<br/>';
						paramResult += '最小负载率 : ' ;
						paramResult +=  dataMap.minData[params[0].dataIndex] + '<br/>';
						paramResult += '平均负载率 : ' ;
						paramResult +=  dataMap.avgData[params[0].dataIndex] + '<br/>';
						paramResult += '日期 : ' ;
						paramResult +=  dataMap.categes[params[0].dataIndex]+'';
						return paramResult;
		    		}
		    	}
		    },
		    series: [
		        {
		            name: '最大负载率',
		            type: 'line',
		            data:dataMap.maxData//数据,
		        }, {
		            name: '最小负载率',
		            type: 'line',
		            data:dataMap.minData//数据,
		        },{
		            name: '平均负载率',
		            type: 'line',
		            data:dataMap.avgData//数据,
		        }
		    ]
		};
	}
	 
	fzlChart.setOption(option,true);
}

/**
 * 根据设备id查询设备信息
 */
function queryDevfzl(tranId,consId){
	$.post(webContextRoot +'kyj/getZhSfLine.action',
				{
					'zhSfLineModel.lineId':tranId,
					'zhSfLineModel.consId':consId
				},
	   function(data){
		 if(data.length>0){			   
		   $("#eddyBS1").text(data[0].productKind==""?'-':data[0].productKind);
		   $("#eddlBS1").text(data[0].factoryCode==""?'-':data[0].factoryCode);
		   $("#ggxhBS1").text(data[0].powerRate==""?'-':data[0].powerRate+"W");
		   $("#ztrqBS1").text(data[0].createDate==""?'-':data[0].createDate.slice(0,10));
		   $("#yxztBS1").text(data[0].runStatus==""?'-':data[0].runStatus);
	   }
	   },"json");
}

function getEchartsNull(){
	var dateLast = new Date();
	var date = DateUtil.dateToStr('yyyy-MM',DateUtil.dateAdd('m',-1,dateLast));
	var date1 = DateUtil.dateToStr('yyyy-MM',DateUtil.dateAdd('m',0,dateLast));
	var dateList = new Array();
	var kyjList = new Array();
	var a = date+"-01";
	var a1 = date1+"-01";
	
	while(a !=  a1){
		dateList.push(a);
		kyjList.push("-");
        a =  DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('d',1,DateUtil.strToDate(a)));        
	} 

	ydzsChart = echarts.init(document.getElementById('ydzsChart'));//初始化用电走势chart
//	fzlChart = echarts.init(document.getElementById('fzlChart'));//初始化用电走势chart
	if(isTabsType==0){//用电走势tab
		ydzsChart.showLoading({
			text:'正在努力的读取数据中...',
			effect:'spin'
		});
	}	
	var x = [];
	var y = [];
	for(var i = 1;i<32;i++){
		x.push(setTime(i));
		y.push(Math.floor(Math.random()*100));
	}
var option = {
		title: {
	    	 text: consName+'用电走势',
	        y: '10px',
	        left: 'center'
	    },
    legend: {
        x: 'center',
        y: '35',
        data: ['用电量']
    }, 
  //设置grid位置
	   grid : {
			 x : 55, //左边距离
			 y : 75,//上边距离
			 x2 : 40,//右边距离
			 y2 : 35//下边距离
		},
    xAxis: [
        {
        	
            type: 'category',
//            boundaryGap : [0, 0.01],
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
            data:dateList
        }
    ],
    yAxis: [{
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
    }],
    tooltip: {
        trigger: 'axis',
        formatter: function(params) {
        	if(params!=null && params[0]!=null){
	        	var paramResult = '时间: '+ params[0].name + '<br/>';
	        	for ( var i = 0; i < params.length; i++) {
					paramResult += params[i].seriesName + ' : ' 
//								 + params[i].value + ' <br/>';
					+params[i].value+'kWh'+'<br/>';
				}
               return paramResult;
	        	}
    	}
    },
    series: [
        {
            name: '用电量',
            type: 'line',
            data:kyjList//数据,
        },
       /* {
            name: '最小用电量',
            type: 'line',
            data:dataMap.sMap.minData//数据,
        },{
            name: '平均用电量',
            type: 'line',
            data:dataMap.sMap.avgData//数据,
        }*/
    ]
};
	 
ydzsChart.setOption(option,true);
ydzsChart.hideLoading();
}