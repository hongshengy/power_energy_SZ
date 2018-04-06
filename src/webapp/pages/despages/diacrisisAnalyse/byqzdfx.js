/**
 * 变压器诊断
 * @author 王梓璇
 * @since 2017-04-17
 */
var fzlChart = '';				// 负载率(最大，最小，平均)
var bsChart = '';				// 变损(变损和变损值两条线)
var currentdate = new Date(); 	// 当前日期
var startDate = new Date(); 	// 当前开始时间 为当前时间往前推一年
var endDate = new Date();		// 当前结束时间  为当前时间
groupDateType = 'yyyy-MM';		// 日期类型
var dataType;
var currentMonth = DateUtil.dateToStr('yyyy-MM',currentdate);//当月
var dataDiffer = 3;				// 日期差  默认为三天（显示为96点）
var tranId =null;				// 变压器编码
var tranName = '';				// 变压器名称 
var isFristone = false;			// 第一次页面是否加载查询标识
var isFristbs = false;
var isFzl = true;
var tabIndex = 0;
var fzlData = null;//负载率时间
var fzlMonth = null;//负载率时间
var fzlType = null;//负载率类型
var bsData = null;//变损时间
var bsType = null;//变损类型

//js入口
$(function(){

	// 判断是不是客户角色  true是客户角色 flase不是客户角色
	// 不是客户角色不显示用能报告按钮
	if(top.isCustomer == true){
		$("#bt_exportynbg").hide();
	}else{
		$("#bt_exportynbg").show();
	}
	
	$('#bs_startDate').val(DateUtil.dateToStr('yyyy-MM',endDate));
	
	 if(consId==null || consId==''|| consId=="null"){				// 未获取到企业编码，加载左侧树
//		$('#tree-leftQyTree').tree({							// 默认没参数，获取区域  企业  都是打开状态
//			// modeType=1，过滤含有变压器的客户
//			url:webContextRoot +'destree/queryTree.action?modeType=1',
//		    method:'get',
//		    multiple:false,				// 是否支持多选
//		    editable:'true',
//		    onClick: function(node){
//		    	treeNodeType = node.type;
//				if(treeNodeType=='0'){	// 区域能源节点
//					$("#clickTree").hide();
//					$("#contentId").show();
//					content='<iframe id="funcId" src="'+webContextRoot+'pages/despages/projectManage/tranOverview.jsp?orgNo='+node.subsName+'" scrolling="no" frameborder="0" width="100%" height="100%"></iframe>'; 
//					$("#contentId").empty();
//					$('#contentId').append(content);
//					
//				}else if(treeNodeType== '1'){		// 企业节点
//					$("#contentId").hide();
//					$("#clickTree").show();
//					autoResize.call($('#fzlChart'));
//					consId = node.id;				// 把树节点id赋给企业id
//					consName = node.text;			// 把树节点的值赋给企业名称
//					queryUserFiles();				// 查询用户档案
//					getbyqData();					// 查询变压器
//				}
//			},
//			onLoadSuccess:function(node, data){		// 加载成功返回
//				selectTree();						// 设置树默认选中节点
//			} 
//		});
//		searchTreeNode();							// 树模糊检索   方法来自  treeSelect.js
		 
		 //设置选择客户后执行的方法
		 consSelectMethod = "consSelectMethodLoad()";
		 //加载客户(url,是否需要区域能源根节点,没有客户时给出的提示)
//		 consSelect(webContextRoot + "destree/queryTree.action?modeType=1",true,'请先给客户添加变压器'); 
//		 consSelectURL = webContextRoot + "destree/queryTree.action";
//		 consSelectURL = webContextRoot + "destree/consSelect.action";
		 consSelectHasRoot = true;
		 consSelectSearch("",true);
	}else{
		  queryUserFiles();							// 查询上头客户信息
		  getbyqData();								// 查询变压器
	}
	 
	  
	 //负载率查询事件
	$('#search_fzl').click(function(){
		queryLoadRate(tranName);
	});
	//变损查询事件
	$('#search_bs').click(function(){
		queryLoadBS(tranName);
	});
	
	//变压器下拉框选择天、月
	 $('#byqQueryType').combobox({
			onSelect: function(param){
				if(param.value == 'D'){
					
					$('#startDayDate').val(DateUtil.dateToStr('yyyy-MM-dd',endDate));
					$('#startDayDate').show();
					$('#startMonthDate').hide();
					date = $('#startDayDate').val();
					dateLast = new Date(date);
					
					if(fzlData == null || fzlType != param.value){
						dateLast = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('d',-1,dateLast));
					}else{
						dateLast = fzlData;
					}
					// 选择天数据 隐藏月数据 
//					$('#startDayDate').val(dateLast);
					$('#startDayDate').show();
					$('#startMonthDate').hide();
					if(isFzl){//负载率
						fzlData = dateLast;
						fzlType = param.value;
					}
				}else if(param.value == 'M'){
					$('#startMonthDate').val(DateUtil.dateToStr('yyyy-MM',endDate));
					$('#startDayDate').hide();
					$('#startMonthDate').show();
					date = $('#startMonthDate').val();
					dateLast = new Date(date);
//					dateLast = DateUtil.dateToStr('yyyy-MM',DateUtil.dateAdd('m',-1,dateLast));
					
					if(tabIndex == '0'){
						//负载率
						if(fzlMonth == null){
							dateLast = DateUtil.dateToStr('yyyy-MM',DateUtil.dateAdd('m',-1,dateLast));
						}else{
							dateLast = fzlMonth;
						}
					}else{
						//变损
						if(bsData == null){
							dateLast = DateUtil.dateToStr('yyyy-MM',DateUtil.dateAdd('m',-1,dateLast));
						}else{
							dateLast = bsData;
						}
					}
					
					// 选择月数据 隐藏天数据 
//					$('#startMonthDate').val(dateLast);
					$('#startMonthDate').show();
					$('#startDayDate').hide();
					
					if(isFzl){//负载率
						fzlMonth = dateLast;
						fzlType = param.value;
					}else{
						bsData = dateLast;
						bsType = param.value;
					}
				}
			}
		});
	
	
	//左减日期电量走势
	$('#left').click(function(){
		var dlzsQueryType = $('#byqQueryType').combobox('getValue');
		var nowDate = '';
		if(dlzsQueryType == 'D'){
			var startDate =  $('#startDayDate').val();//开始日期
			nowDate = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('d',-1,DateUtil.strToDate(startDate)));
			fzlData = nowDate;
			$('#startDayDate').val(nowDate);
			queryLoadRate(tranName);
		}else if(dlzsQueryType == 'M'){
			var startDate =  $('#startMonthDate').val();//开始日期
			nowDate = DateUtil.dateToStr('yyyy-MM',DateUtil.dateAdd('m',-1,DateUtil.strToDate(startDate)));
			$('#startMonthDate').val(nowDate);
			if(tabIndex == '0'){
				fzlMonth = nowDate;
				queryLoadRate(tranName);
			}else if(tabIndex == '1'){
				bsData = nowDate;
				queryLoadBS(tranName);
			}
		}
		
	});
	
	//右加日期电量走势
	$('#right').click(function(){
		var dlzsQueryType = $('#byqQueryType').combobox('getValue');
		var nowDate = '';
		if(dlzsQueryType == 'D'){
			var startDate =  $('#startDayDate').val();//开始日期
			nowDate = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('d',1,DateUtil.strToDate(startDate)));
			fzlData = nowDate;
			$('#startDayDate').val(nowDate);
			queryLoadRate(tranName);
		}else if(dlzsQueryType == 'M'){
			var startDate =  $('#startMonthDate').val();//开始日期
			nowDate = DateUtil.dateToStr('yyyy-MM',DateUtil.dateAdd('m',1,DateUtil.strToDate(startDate)));
			$('#startMonthDate').val(nowDate);
			
			if(tabIndex == '0'){
				fzlMonth = nowDate;
				queryLoadRate(tranName);
			}else if(tabIndex == '1'){
				bsData = nowDate;
				queryLoadBS(tranName);
			}
			
		}
		
	});
	 
});

//点击时间控件查询
function queryDate(dp){
//	alert($dp.cal.newdate['y'] + '-' + $dp.cal.newdate['M'] + '-' + $dp.cal.newdate['d']);
	
	if(tabIndex == '0'){
		var dlzsQueryType = $('#byqQueryType').combobox('getValue');
		var year = $dp.cal.newdate['y'];
		var month = $dp.cal.newdate['M'];
		var day = $dp.cal.newdate['d'];
		if(day<10){
			day = '0'+day;
		}
		if(month<10){
			month = '0'+month;
		}
		if(dlzsQueryType == 'D'){
			var time = year + '-' + month + '-' + day;
			fzlData = time;
		}else{
			var time = year + '-' + month;
			fzlData = time;
		}
		queryLoadRate(tranName);
	}else if(tabIndex == '1'){
		var month = $dp.cal.newdate['M'];
		if(month<10){
			month = '0'+month;
		}
		var time = $dp.cal.newdate['y'] + '-' + month;
		bsData = time;
		queryLoadBS(tranName);
	}
}

/**
 * 设置选择客户后执行的方法
 */
function consSelectMethodLoad(){
//	console.log(consSelectAllCons,consSelectCon);
	
	if(consSelectCon.id.length < 4){	// 区域能源节点
		$("#clickTree").hide();
		$("#contentId").show();
		content='<iframe id="funcId" src="'+webContextRoot+'pages/despages/projectManage/tranOverview.jsp?orgNo='+consSelectCon.id+'" scrolling="no" frameborder="0" width="100%" height="100%"></iframe>'; 
		$("#contentId").empty();
		$('#contentId').append(content);
	}else{		// 企业节点
		$("#contentId").hide();
		$("#clickTree").show();
		autoResize.call($('#fzlChart'));
		consId = consSelectCon.id;				// 把树节点id赋给企业id
		consName = consSelectCon.text;			// 把树节点的值赋给企业名称
		queryUserFiles();				// 查询用户档案
		getbyqData();					// 查询变压器
	}
}

/**
 * 加载树节点 
 */
function selectTree(nodeId){
	$('#tree-leftQyTree li:eq(0)').find('div').addClass("tree-node-selected");//添加选中样式
	var n = $('#tree-leftQyTree').tree('getSelected');//获取被选中的节点
	if(n!=null)//判断节点是否存在
	{
		$('#tree-leftQyTree').tree('select',n.target);
	}
	
	var chiNode = $('#tree-leftQyTree').tree('getChildren',n.target);//子节点
	if(chiNode.length == 0){
		$.messager.alert('提示', '请先给客户添加变压器', 'warning');
	} else {
		for(var i=0 ; i < chiNode.length ; i++)//循环节点
	    {
			// 第一次加载区域节点
			if(typeof nodeId == 'undefined'){		
				
				$("#clickTree").hide();								// 隐藏企业电量电费
				$("#contentId").show();								// 显示区域电量电费
				content='<iframe id="funcId" src="'+webContextRoot+'pages/despages/projectManage/tranOverview.jsp?orgNo='+n.subsName+'" scrolling="no" frameborder="0" width="100%" height="100%"></iframe>'; 
				$("#contentId").empty();							// 清空
				$('#contentId').append(content);					// 填充内容
				
			}else{
				if(nodeId!=null?chiNode[i].id==nodeId:chiNode[i].type==1)//查找定位
				 {
					var n = $('#tree-leftQyTree').tree("find",chiNode[i].id);//根据id获取节点
		       	   	$('#tree-leftQyTree').tree('select',n.target);//选中节点
		       	    $('#tree-leftQyTree').tree('scrollTo',n.target);//滚动到节点
		       	    consId = chiNode[i].id;
		       	    consName = chiNode[i].text;
		       	    queryUserFiles();//查询用户档案
		       	    getbyqData();//查询变压器
		       	   	break;//跳出循环
				 }
			} 
	    }
	}
}

/**
 *分布加载tab页选项
 *title	tab页名称
 *index tab页下标 
 */
function userTabsSelect(title,index){
	 
//	isFzl = index == 0;//index == 0 的时候  isFzl 为true 否则为false 看不懂不写
	
	tabIndex = index;
	//页面选择Tab页信息所触发的事件
	if(index == 0){//tab属性页中的负载率
		isFzl = true;
		
		$('#sel_type').css('display','inline-block');
		$('#search_fzl').css('display','block');
		$('#search_bs').css('display','none');
		if(fzlType == 'D'){
			$('#byqQueryType').combobox('setValue','D');
			if(fzlData != null){
				$('#startDayDate').val(fzlData);
			}
		}else if(fzlType == 'M'){
			$('#byqQueryType').combobox('setValue','M');
			if(fzlMonth != null){
				$('#startMonthDate').val(fzlMonth);
			}
		}
		queryLoadRate(tranName);
	}//页面选择Tab页信息所触发的事件
	else if(index == 1){//tab属性页中的变损
		isFzl = false;
		$('#search_fzl').css('display','none');
		$('#search_bs').css('display','block');
		$('#startMonthDate').val(DateUtil.dateToStr('yyyy-MM',endDate));
		$('#startDayDate').hide();
		$('#startMonthDate').show();
		date = $('#startMonthDate').val();
		dateLast = new Date(date);
		dateLast = DateUtil.dateToStr('yyyy-MM',DateUtil.dateAdd('m',-1,dateLast));
		
		// 选择月数据 隐藏天数据 
		$('#startMonthDate').val(dateLast);
		$('#startMonthDate').show();
		$('#startDayDate').hide();
		$('#sel_type').css('display','none');
		$('#byqQueryType').combobox('setValue','M');
		if(bsData != null){
			$('#startMonthDate').val(bsData);
		}
		queryLoadBS(tranName);
	}
	
}


//查询档案内容
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
			  consNameObj.innerHTML = consNameName+consNameStr.substring(0,9)+'...';
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
			  elecAddrObj.innerHTML = elecAddrName+elecAddrNameStr.substring(0,9)+'...';
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

/**
 * 变压器负载率查询
 */
function queryLoadRate(title){
	fzlChart = echarts.init(document.getElementById('fzlChart'));	// 初始化负载率chart
	var dataDate;
	var dlzsQueryType = $('#byqQueryType').combobox('getValue');
	
	if(dlzsQueryType == 'D'){
		if(fzlData != null){
			dataDate =  fzlData;
		}else{
			dataDate =  $('#startDayDate').val();
		}
		
	}else if(dlzsQueryType == 'M'){
		if(fzlMonth != null){
			dataDate = fzlMonth; 
		}else{
			dataDate =  $('#startMonthDate').val();
		}
		
	}
	fzlChart.showLoading({
		text:'正在努力的读取数据中...',
		effect:'spin'
	});
	$.post(webContextRoot + 'byq/selectbyqFzlByLoadRate.action', 
			{ 
			   //请求参数
				'powerLoadModel.dataDate': dataDate,//开始时间
				'powerLoadModel.tranId': tranId,//变压器id
				'powerLoadModel.dataType': 1//设备类型
			},
			function(json){
				getpowerCountData(json,title);
				checkLoadRate(json.sMap.fzlList);
				fzlChart.hideLoading();
			}
		);
}
/**
 * 变压器变损查询
 */
function queryLoadBS(title){
	bsChart = echarts.init(document.getElementById('bsChart'));		// 初始化变损chart
	var startDate = '';
	if(bsData != null){
		startDate = bsData;
	}else{
		startDate =  $('#startMonthDate').val();//开始日期
	}
	
	var startDateWzx = startDate+"-01";// 开始时间
	var getMonth = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('m',1,DateUtil.strToDate(startDate+"-01")));
	var endDateWzx = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('d',-1,DateUtil.strToDate(getMonth)));// 结束时间
	
	bsChart.showLoading({
		text:'正在努力的读取数据中...',
		effect:'spin'
	});
	$.getJSON(webContextRoot + 'byq/queryPowerByq.action', 
			{ 
			   //请求参数
				'powerLoadModel.beginData': startDateWzx,//开始时间
				'powerLoadModel.endData': endDateWzx,//结束时间
				'powerLoadModel.tranId': tranId//变压器id
			},
			function(json){
				getpowerBsData(json,title);
				checkLoadBS(json);
				bsChart.hideLoading(); 
			}
		);
	
}

function checkLoadRate(data){
	var maxFZL = document.getElementById('maxFZL');
	var maxFZLdate = document.getElementById('maxFZLdate');
	var minFZL = document.getElementById('minFZL');
	var minFZLdate = document.getElementById('minFZLdate');
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
			if(maxValue != null){
				maxFZL.innerHTML = maxValue+'%';//最大负载率
				maxFZLdate.innerHTML = maxTime;
			}else{
				maxFZL.innerHTML = '-';//最大负载率
				maxFZLdate.innerHTML =  '-';
			}
			if(minValue != null){
				minFZL.innerHTML = minValue+'%';//最小负载率
				minFZLdate.innerHTML = minTime;
			}else{
				minFZL.innerHTML = '-';//最小负载率
				minFZLdate.innerHTML =  '-';
			}
			if(sumValue != 0){
				avgFZL.innerHTML = (sumValue/count).toFixed(2)+'%';
			}else{
				avgFZL.innerHTML = '-';
			}
			
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
			if(maxValue != null){
				maxFZL.innerHTML = maxValue+'%';//最大负载率
				maxFZLdate.innerHTML = maxTime;
			}else{
				maxFZL.innerHTML = '-';//最大负载率
				maxFZLdate.innerHTML =  '-';
			}
			if(minValue != null){
				minFZL.innerHTML = minValue+'%';//最小负载率
				minFZLdate.innerHTML = minTime;
			}else{
				minFZL.innerHTML = '-';//最小负载率
				minFZLdate.innerHTML =  '-';
			}
			if(sumValue != 0){
				avgFZL.innerHTML = (sumValue/count).toFixed(2)+'%';
			}else{
				avgFZL.innerHTML = '-';
			}
		}
		
		var content_one='';
		var content_two='';
		
		$('#error_content').text(content_one); 
		$('#jy_content').text(content_two);
		$('#error_title').text('危害：'); 
		$('#jy_title').text('建议：');
		var error_cfh = '超负荷：</br>1、超容罚款；2、绝缘提前老化降低变压器寿命；3、计量不准；4、超时间超载随时可能着火甚至爆炸（影响人身安全）。';
		var error_fzgd = '负载过低：</br>1、浪费变压器容量；2、功率因数低导致多交力调电费。';
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
function checkLoadBS(data){
	if(data.length != 0){
		var maxBS = document.getElementById('maxBS');
		var maxBSdate = document.getElementById('maxBSdate');
		var minBS = document.getElementById('minBS');
		var minBSdate = document.getElementById('minBSdate');
		var avgBS = document.getElementById('avgBS');
		
		if(data.sMap.maxBS!=""&& data.sMap.maxBS!=null){
			  maxBS.innerHTML =  data.sMap.maxBS+'%';//最大变损率
			}else{
				maxBS.innerHTML = '-';//最大变损率
			}
		  
		  if(data.sMap.maxTimeBS!=""&& data.sMap.maxTimeBS!=null){
			  maxBSdate.innerHTML =  data.sMap.maxTimeBS;//最大变损率
			}else{
				maxBSdate.innerHTML = '-';//最大变损率
			}
		  
		  if(data.sMap.minBS!=""&& data.sMap.minBS!=null){
			  minBS.innerHTML =  data.sMap.minBS+'%';//最小变损率
			}else{
				minBS.innerHTML = '-';//最小变损率
			}
		  
		  if(data.sMap.minTimeBS!=""&& data.sMap.minTimeBS!=null){
			  minBSdate.innerHTML =  data.sMap.minTimeBS;//最小变损率
			}else{
				minBSdate.innerHTML = '-';//最小变损率
			}
		  
		  if(data.sMap.avgBS!=""&& data.sMap.avgBS!=null){
			  avgBS.innerHTML =  data.sMap.avgBS+'%';//最小变损率
			}else{
				avgBS.innerHTML = '-';//最小变损率
			}
	}
}

//查询条件
function getData(title){
	var startDate =  $('#startDate').val();//开始日期
//	DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('d',-2,endDate)))
	var startDateWzx = startDate+"-01";// 开始时间
	var getMonth = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('m',1,DateUtil.strToDate(startDate+"-01")));
	var endDateWzx = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('d',-1,DateUtil.strToDate(getMonth)));// 结束时间
	
//		var startDate =  $('#startDate').val();//开始日期
//		var endDate =  $('#endDate').val();//结束日期
	if(startDate> endDate){
		$.messager.alert('提示', "开始日期不能大于结束日期！", 'warning');
		return;
	}
	if(isFzl==true){
		fzlChart.showLoading({
			text:'正在努力的读取数据中...',
			effect:'spin'
		});
	}else{
		bsChart.showLoading({
			text:'正在努力的读取数据中...',
			effect:'spin'
		});
	}
	$.getJSON(webContextRoot + 'byq/queryPowerByq.action', 
		{ 
		   //请求参数
			'powerLoadModel.beginData': startDateWzx,//开始时间
			'powerLoadModel.endData': endDateWzx,//结束时间
			'powerLoadModel.tranId': tranId//变压器id
		},
		function(json){
			if(isFzl==true){
				var maxFZL = document.getElementById('maxFZL');
				if(json.sMap.max!=""&&json.sMap.max!=null){
					maxFZL.innerHTML = json.sMap.max;//最大负载率
				}else{
					maxFZL.innerHTML = '-';//最大负载率
				}
				  var maxFZLdate = document.getElementById('maxFZLdate');
				  if(json.sMap.maxTime!=""&&json.sMap.maxTime!=null){
					  maxFZLdate.innerHTML = json.sMap.maxTime;//最大
					}else{
						maxFZLdate.innerHTML = '-';//最大\
					}
				  var minFZL = document.getElementById('minFZL');
				  if(json.sMap.min!=""&& json.sMap.min!=null){
					  minFZL.innerHTML =  json.sMap.min;////最小负载率
					}else{
						minFZL.innerHTML = '-';////最小负载率
					}
				  var minFZLdate = document.getElementById('minFZLdate');
				  if(json.sMap.minTime!=""&& json.sMap.minTime!=null){
					  minFZLdate.innerHTML =  json.sMap.minTime;////最小负载率
					}else{
						minFZLdate.innerHTML = '-';////最小负载率
					}
				  var avgFZL = document.getElementById('avgFZL');
				  if(json.sMap.avg!=""&& json.sMap.avg!=null){
					  avgFZL.innerHTML =  json.sMap.avg;//超容最大时长发生时间
					}else{
						avgFZL.innerHTML = '-';//超容最大时长发生时间
					}
				
				  
				  var maxBS = document.getElementById('maxBS');
				  if(json.sMap.maxBS!=""&& json.sMap.maxBS!=null){
					  maxBS.innerHTML =  json.sMap.maxBS;//最大变损率
					}else{
						maxBS.innerHTML = '-';//最大变损率
					}
				  var maxBSdate = document.getElementById('maxBSdate');
				  if(json.sMap.maxTimeBS!=""&& json.sMap.maxTimeBS!=null){
					  maxBSdate.innerHTML =  json.sMap.maxTimeBS;//最大变损率
					}else{
						maxBSdate.innerHTML = '-';//最大变损率
					}
				  var minBS = document.getElementById('minBS');
				  if(json.sMap.minBS!=""&& json.sMap.minBS!=null){
					  minBS.innerHTML =  json.sMap.minBS;//最小变损率
					}else{
						minBS.innerHTML = '-';//最小变损率
					}
				  var minBSdate = document.getElementById('minBSdate');
				  if(json.sMap.minTimeBS!=""&& json.sMap.minTimeBS!=null){
					  minBSdate.innerHTML =  json.sMap.minTimeBS;//最小变损率
					}else{
						minBSdate.innerHTML = '-';//最小变损率
					}
				  var avgBS = document.getElementById('avgBS');
				  if(json.sMap.avgBS!=""&& json.sMap.avgBS!=null){
					  avgBS.innerHTML =  json.sMap.avgBS;//最小变损率
					}else{
						avgBS.innerHTML = '-';//最小变损率
					}
				
				getpowerCountData(json,title);
				fzlChart.hideLoading();
			}else{
				getpowerBsData(json,title);
				bsChart.hideLoading();
			}
		}
	);
}


/**
 * 根据设备id查询设备信息
 */
function queryDev(devId){
	if(tranId != '' && tranId != null){	
		$.post(webContextRoot +'byq/queryPowerList.action',
		   {'sfGTranModel.tranId':tranId},
		   function(data){
			 if(data.length>0){
				   $("#eddy").text(data[0].tranKindName==""?'-':data[0].tranKindName);
				   $("#eddl").text(data[0].factoryNameS==""?'-':data[0].factoryNameS);
				   $("#edrl").text(data[0].plateCap==""?'-':(data[0].plateCap+'kVA'));
	//			   $("#ggxh").text('-');//额定功率
	//			   $("#sbmc").text('-');//额定电流
				   $("#sbbh").text(data[0].tranVoltName==""?'-':(data[0].tranVoltName));
				   $("#ztrq").text(data[0].createDate==""?'-':data[0].createDate.slice(0,data[0].createDate.indexOf(' ')));
				   $("#yxzt").text(data[0].runStatusName==""?'-':data[0].runStatusName);
	
				   $('#jnjyA').text('');
	//			   $('#jnjyA').text('1.该变压器型号为'+data[0].tranKindName+',属于国家明令禁止的S9系列以下变压器，直接采用同容量的高效节能变压器进行替换');
				   /*$('#jnjyB').text('1.通过该变压器近一个月的最大负载率、最小负载率、平均负载率运行情况，可知该变压器运行在经济状态下');
				   $('#jnjyC').text('2.如果P空变大于P，则变压器运行在不经济状态下，有改造的潜力；如果P空变小于P，则变压器运行在经济状态下。');*/
				   
				   $("#eddyBS").text(data[0].tranKindName==""?'-':data[0].tranKindName);
				   $("#eddlBS").text(data[0].factoryNameS==""?'-':data[0].factoryNameS);
				   $("#edrlBS").text(data[0].plateCap==""?'-':(data[0].plateCap+'kVA'));
	//			   $("#ggxhBS").text(data[0].madeNo==""?'-':data[0].madeNo);//
	//			   $("#sbmcBS").text('-');//
				   $("#sbbhBS").text(data[0].tranVoltName==""?'-':(data[0].tranVoltName));
				   $("#ztrqBS").text(data[0].createDate==""?'-':data[0].createDate.slice(0,data[0].createDate.indexOf(' ')));
				   $("#yxztBS").text(data[0].runStatusName==""?'-':data[0].runStatusName);
				   $('#jnjyABS').text('');
	//			   $('#jnjyABS').text('1.该变压器型号为'+data[0].tranKindName+',属于国家明令禁止的S9系列以下变压器，直接采用同容量的高效节能变压器进行替换');
				   $('#jnjyBBS').text('1.通过该变压器近一个月的最大负载率、最小负载率、平均负载率运行情况，可知该变压器运行在经济状态下。');
				   $('#jnjyCBS').text('2.如果P空变大于P，则变压器运行在不经济状态下，有改造的潜力；如果P空变小于P，则变压器运行在经济状态下。');
				   
				   autoResize.call($('#byqJnjy'));
			   }
	//		   if(treeNodeType != '1'){
	//			   $('#jnjy').text('&nbsp;');
	//			   $('#jnjy1').text('&nbsp;');
	//			   $('#jnjy2').text('&nbsp;');
	//			}
		   },"json");
		}else{
			$("#eddy").text('-');
			$("#eddl").text('-');
			$("#edrl").text('-');
			$("#sbbh").text('-');
			$("#ztrq").text('-');
			$("#yxzt").text('-');
		}
}
//查询下拉框 的 变压器
function getbyqData(){
	
	$.getJSON(webContextRoot +'byq/queryPowerList.action', //查询用户变下面的负载率和变损率
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
					}else{
						$('#byq').combobox('select','');
						tranId = '';
						tranName = '';
						queryDev(tranId);
						if(isFzl){
							queryLoadRate(tranName);
						}else{
							queryLoadBS(tranName);
						}
						$('#jnjyB').text('该企业下设备信息为空。'); 
						$('#jnjyC').text('');
					}
				},
				onSelect:function(data){
					tranId = data.tranId;
					tranName = data.tranName;
					queryDev(tranId);
					if(isFzl){
						queryLoadRate(tranName);
					}else{
						queryLoadBS(tranName);
					}
				}
			});
		}
 );
	 
}


//echarts柱状图
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
		            data:dataMap.sMap.categes
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
						paramResult +=  dataMap.sMap.rateData[params[0].dataIndex] + '%<br/>';
						paramResult += '日期 : ' ;
						paramResult +=  dataMap.sMap.categes[params[0].dataIndex]+'';
						return paramResult;
		    		}
		    	}
		    },
		    series: [
		        {
		            name: '负载率',
		            type: 'line',
		            data:dataMap.sMap.rateData//数据,
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
		            data:dataMap.sMap.categes
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
						paramResult +=  dataMap.sMap.maxData[params[0].dataIndex] + '%<br/>';
						paramResult += '最小负载率 : ' ;
						paramResult +=  dataMap.sMap.minData[params[0].dataIndex] + '%<br/>';
						paramResult += '平均负载率 : ' ;
						paramResult +=  dataMap.sMap.avgData[params[0].dataIndex] + '%<br/>';
						paramResult += '日期 : ' ;
						paramResult +=  dataMap.sMap.categes[params[0].dataIndex]+'';
						return paramResult;
		    		}
		    	}
		    },
		    series: [
		        {
		            name: '最大负载率',
		            type: 'line',
		            data:dataMap.sMap.maxData//数据,
		        }, {
		            name: '最小负载率',
		            type: 'line',
		            data:dataMap.sMap.minData//数据,
		        },{
		            name: '平均负载率',
		            type: 'line',
		            data:dataMap.sMap.avgData//数据,
		        }
		    ]
		};
	}
	 
	fzlChart.setOption(option,true);
}


//echarts柱状图
function getpowerBsData(dataMap,title){
var option = {
		title: {
	    	 text: consName+'变损'+ (title==''?'':'('+title+')'),
	        y: '10px',
	        left: 'center'
	    },
    legend: {
        x: 'center',
        y: '35',
        data: ['变损值','变损率']
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
//            data:[1,2,3,4,5]
            data:dataMap.sMap.categes
        }
    ],
    yAxis: [{
        name: '变损值(kWh)',
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
    },
    {
        name: '变损率(%)',
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
        min:'0' 
    },
    ],
    tooltip: {
    	trigger: 'axis',
    	formatter: function(params) {
    		if(params!=null && params[0]!=null){
//	    		var paramResult = params[0].seriesName +'时间: '+ dataMap.sMap.currentDate[params[0].dataIndex].substr(0,dataType=='1'?10:7) + '<br/>';
//				paramResult += params[0].seriesName + '值 : ' + params[0].value + '<br/>';
//				paramResult += params[1].seriesName+ '时间: '+ dataMap.sMap.preDate[params[0].dataIndex].substr(0,dataType=='1'?10:7) + '<br/>';
//				paramResult += params[1].seriesName + '值 : ' + params[1].value + '<br/>';
				
				var paramResult = '';
				paramResult +=  '变损值 : ' ;
				paramResult +=  dataMap.sMap.bsValueData[params[0].dataIndex]+'kW/h<br/>';
				paramResult += '变损率 : ' ;
				paramResult +=  dataMap.sMap.bsRateData[params[0].dataIndex]+'%<br/>';
				paramResult += '日期 : ' ;
				paramResult +=  dataMap.sMap.categes[params[0].dataIndex]+'';
				return paramResult;
    		}
    	}
    },
    series: [  
        {
            name: '变损值',
            type: 'line',
//            data:[1,2,3,4,5]
            data:dataMap.sMap.bsValueData//数据,
        }, {
            name: '变损率',
            type: 'line',
            yAxisIndex:1,
//            data:[0.1,0.5,0.8,0.5,0.3]
            data:dataMap.sMap.bsRateData//数据,
        }
    ]
};
	 
bsChart.setOption(option,true);
}