/**
 * 空调系统
 * @author 王国际
 * @since 2017-05-03
 */
myydzsChart = '';
myfheChart = '';
myktzlChart = '';//单位空调制冷量
myktnxbChart = '';//空调系统能效比
mylynxxsChart = '';//冷源系统能效系数 
myzjChart = '';//主机
mysbChart = '';//水泵
myspChart = '';//输配系统
mylqtChart = '';//冷却塔系统 
var isFirstydzl = false;
var consName = '';
var tranName = '';
var currentDate = new Date();//当前结束时间  为当前时间
var startDate = new Date(); // 当前开始时间 
var endDate = new Date();//当前结束时间 
var isTabsType = 0;
var id = "";
var yhbName = "";
var tranId =null;//空调编码
var consSelectAllCons = null;//所有的客户
var consSelectHistoryCons = null;//历史记录里的客户
var consSelectCon = null;//选中的客户
//自适应大小
function userResize(widths,heights){
	$("#ydzsChart").width($("#ydzsChart").parent().width());
	$("#ydzsChart").height($("#ydzsChart").parent().height());
	
	if(!!myydzsChart){
		myydzsChart.resize({
		    width: $("#ydzsChart").parent().width(),
		    height: $("#ydzsChart").parent().height()
		});
	}
	
	
	$("#fheChart").width($("#fheChart").parent().width());
	$("#fheChart").height($("#fheChart").parent().height());
	
	if(!!myfheChart){
		myfheChart.resize({
		    width: $("#fheChart").parent().width(),
		    height: $("#fheChart").parent().height()
		});
	}
	
//	$("#ktzlChart").width($("#ktzlChart").parent().width());
//	$("#ktzlChart").height($("#ktzlChart").parent().height());
//	
//	if(!!myktzlChart){
//		myktzlChart.resize({
//		    width: $("#ktzlChart").parent().width(),
//		    height: $("#ktzlChart").parent().height()
//		});
//	}
//	
//	$("#nxbChart").width($("#nxbChart").parent().width());
//	$("#nxbChart").height($("#nxbChart").parent().height());
//	
//	if(!!myktnxbChart){
//		myktnxbChart.resize({
//		    width: $("#nxbChart").parent().width(),
//		    height: $("#nxbChart").parent().height()
//		});
//	}
//	
//	$("#nxxsChart").width($("#nxxsChart").parent().width());
//	$("#nxxsChart").height($("#nxxsChart").parent().height());
//	
//	if(!!mylynxxsChart){
//		mylynxxsChart.resize({
//		    width: $("#nxxsChart").parent().width(),
//		    height: $("#nxxsChart").parent().height()
//		});
//	}
//	
//	$("#zjChart").width($("#zjChart").parent().width());
//	$("#zjChart").height($("#zjChart").parent().height());
//	
//	if(!!myzjChart){
//		myzjChart.resize({
//		    width: $("#zjChart").parent().width(),
//		    height: $("#zjChart").parent().height()
//		});
//	}
}
//js入口
$(function(){
	
	// 判断是不是客户角色  true是客户角色 flase不是客户角色
	// 不是客户角色不显示用能报告按钮
	if(top.isCustomer == true){
		$("#bt_exportynbg").hide();
	}else{
		$("#bt_exportynbg").show();
	}
	
	myydzsChart = echarts.init(document.getElementById('ydzsChart'));
	myfheChart = echarts.init(document.getElementById('fheChart'));	
//	myktzlChart = echarts.init(document.getElementById('ktzlChart'));
//	myktnxbChart = echarts.init(document.getElementById('nxbChart'));
//	mylynxxsChart = echarts.init(document.getElementById('nxxsChart'));
//	myzjChart = echarts.init(document.getElementById('zjChart'));
//	mysbChart = echarts.init(document.getElementById('sbChart'));
//	
//	 $('#tabskt').tabs({
//       fit: true,//填充大小
//       plain: true,
//       onSelect: function(title,index){
//	    	 if(title=="单位空调制冷量"){
//	    		 $("#ktzlDate").show();
//    			 $("#ktnxbDate").hide();
//    			 $("#lynxxsDate").hide();
//    			 $("#ydzsDate").hide();
//    	      	 otherCombobox();
//	    	 }else if(title=="空调系统能效比"){
//	    		 $("#ktzlDate").hide();
//    			 $("#ktnxbDate").show();
//    			 $("#lynxxsDate").hide();
//    			 $("#ydzsDate").hide();
//    	      	 otherCombobox1();
//	    	 }else if(title=="冷源系统能效系数"){
//	    		 $("#ktzlDate").hide();
//    			 $("#ktnxbDate").hide();
//    			 $("#lynxxsDate").show();
//    			 $("#ydzsDate").hide();
//    	      	 otherCombobox2();
//	    	 }else{
//	    		 $("#ktzlDate").hide();
//    			 $("#ktnxbDate").hide();
//    			 $("#lynxxsDate").hide();
//    			 $("#ydzsDate").show();
//	    	 }
//	   }
//     }); 
	
	$('#startydzsDate').val(DateUtil.dateToStr('yyyy-MM-dd',currentDate));//空调用电走势	
	$('#startDayDate').val(DateUtil.dateToStr('yyyy-MM',endDate));//空调用电走势
	$('#startktzlDate').val(DateUtil.dateToStr('yyyy-MM-dd',currentDate));//单位空调制冷量
	$('#startktnxbDate').val(DateUtil.dateToStr('yyyy-MM-dd',currentDate));//空调系统能效比
	$('#startlynxxsDate').val(DateUtil.dateToStr('yyyy-MM-dd',currentDate));//冷源系统能效系数
	$('#startzjDate').val(DateUtil.dateToStr('yyyy-MM-dd',currentDate));//主机
	$('#startsbDate').val(DateUtil.dateToStr('yyyy-MM-dd',currentDate));//水泵
	$('#startspDate').val(DateUtil.dateToStr('yyyy-MM-dd',currentDate));//输配系统
	$('#startlqtDate').val(DateUtil.dateToStr('yyyy-MM-dd',currentDate));//冷却塔系统
//	if(consId==null || consId==''|| consId=="null"){//未获取到企业编码，加载左侧树
//		$('#tree-leftQyTree').tree({ //默认没参数，获取区域  企业  都是打开状态
//			url:webContextRoot +'destree/queryTree.action',
//		    method:'get',
//		    multiple:false,//是否支持多选
//		    editable:'true',
//		    onClick: function(node){
//				consId = node.id;//把树节点id赋给企业id
//				consName = node.text;//把树节点的值赋给企业名称
////				getbyqData();
//				queryUserFiles();//查询档案内容
//				yndyNameCombobox();//用能单元名称下拉框
//			},
//			onLoadSuccess:function(node, data){//加载成功返回
//				selectTree();
//			}
//		});
//		
//		//树模糊检索
//		searchTreeNode();
//	}else{
//		queryUserFiles();//查询档案内容
//		yndyNameCombobox();//用能单元名称下拉框
//	}
	
	if(consId==null || consId==''|| consId=="null"){//未获取到企业编码，加载左侧树
//		$('#tree-leftQyTree').tree({ //默认没参数，获取区域  企业  都是打开状态
//			// modeType=5，过滤含有空调的客户
//			url:webContextRoot +'destree/queryTree.action?modeType=5',
//		    method:'get',
//		    multiple:false,//是否支持多选
//		    editable:'true' ,
//		    onClick: function(node){
//		    	// 获取根节点
//		    	var rootNode = $('#tree-leftQyTree').tree('getRoot',node.target);
//		    	// 不是根节点时，刷新页面
//		    	if(rootNode.id != node.id){
//					consId = node.id;
//					consName = node.text;
//					queryUserFiles();//查询档案内容
////					if(isTabsType == 1){
////						yndyNameCombobox();//用能单元名称下拉框
////					}else if(isTabsType== 0){
//						byqsbCombobox();
////					}										
//		    	}else{
//		    		$.messager.alert('提示', '请选择客户', 'warning');
//		    	}
//			},
//			onLoadSuccess:function(node, data){//加载成功返回
//				selectTree();//设置树默认选中节点
////				yndyNameCombobox();
//			}
		consSelectMethod = "consSelectMethodLoad()";//定义选中后执行的方法
		consSelectHasRoot = false;//是否有区域能源根节点
		consSelectSearch("",true);
//		});
		//树模糊检索   方法来自  treeSelect.js
//		searchTreeNode();
	}else{
		queryUserFiles();//查询档案内容
//		if(isTabsType == 1){
//			yndyNameCombobox();//用能单元名称下拉框
//		}else if(isTabsType== 0){
			byqsbCombobox();
//		}
	}
//	 //查询事件
//	$('#search').click(function(){
//		getkbfxData();//查询谐波分析数据
//	});
	
	addEvent();//时间的加减事件
	
//	queryKtChart(1);
//	queryKtChart(2);
//	queryKtChart(3);
//	queryKtChart(4);
	 
	//时间查询条件——显示  ktzlDate ktnxbDate lynxxsDate ydzsDate
//	$("#ydzsDate").show();
//	$("#ktzlDate").hide();
//	$("#ktnxbDate").hide();
//	$("#lynxxsDate").hide();
	
	//变压器下拉框选择天、月
	 $('#byqQueryType').combobox({
			onSelect: function(param){
				if(param.value == 'D'){
					$('#startydzsDate').val(DateUtil.dateToStr('yyyy-MM-dd',endDate));
					$('#startydzsDate').show();
					$('#startMonthDate').hide();
					date = $('#startydzsDate').val();
					dateLast = new Date(date);
					dateLast = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('d',-1,dateLast));
					
					// 选择天数据 隐藏月数据 
					$('#startydzsDate').val(dateLast);
					$('#startydzsDate').show();
					$('#startMonthDate').hide();
				}else if(param.value == 'M'){
					$('#startMonthDate').val(DateUtil.dateToStr('yyyy-MM',startDate));
					$('#startydzsDate').hide();
					$('#startMonthDate').show();
					date = $('#startMonthDate').val();
					dateLast = new Date(date);
					dateLast = DateUtil.dateToStr('yyyy-MM',DateUtil.dateAdd('m',-1,dateLast));
					
					// 选择月数据 隐藏天数据 
					$('#startMonthDate').val(dateLast);
					$('#startMonthDate').show();
					$('#startydzsDate').hide();
				}
			}
		});
	 
	//左减日期
	$('#ydzsleft').click(function(){
		var dlzsQueryType = $('#byqQueryType').combobox('getValue');
//		var startDate =  $('#startydzsDate').val();//获取当前开始日期
//		var nowDate = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('d',-1,DateUtil.strToDate(startDate)));//日减1
//		$('#startydzsDate').val(nowDate.substr(0,10));//重新赋值
//		getData(id,tranName);//获取数据		
		if(isTabsType == 1 && dlzsQueryType == 'D'){
			var startDate =  $('#startydzsDate').val();//开始日期
			var nowDate = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('d',-1,DateUtil.strToDate(startDate)));
			$('#startydzsDate').val(nowDate);
			getData(id,yhbName);//获取数据
		}else if(isTabsType == 1 && dlzsQueryType == 'M'){
			var startDate =  $('#startMonthDate').val();//开始日期
			var nowDate = DateUtil.dateToStr('yyyy-MM',DateUtil.dateAdd('m',-1,DateUtil.strToDate(startDate)));
			$('#startMonthDate').val(nowDate.substr(0,7));
			getData(id,yhbName);//获取数据
		}else if(isTabsType == 0 && dlzsQueryType == 'M'){
			var startDate =  $('#startMonthDate').val();//开始日期
			var nowDate = DateUtil.dateToStr('yyyy-MM',DateUtil.dateAdd('m',-1,DateUtil.strToDate(startDate)));
			$('#startMonthDate').val(nowDate.substr(0,7));
			getfzlData(yhbName);	
		}else if(isTabsType == 0 && dlzsQueryType == 'D'){
			var startDayDate =  $('#startydzsDate').val();//开始日期
			var nowDate = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('d',-1,DateUtil.strToDate(startDayDate)));
			$('#startydzsDate').val(nowDate);
			getfzlData(yhbName);	
		}
	});
	
	 //右加日期
	$('#ydzsright').click(function(){
		var dlzsQueryType = $('#byqQueryType').combobox('getValue');
//		var startDate =  $('#startydzsDate').val();//开始日期
//		var nowDate = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('d',1,DateUtil.strToDate(startDate)));//日加1
//		$('#startydzsDate').val(nowDate.substr(0,10));//重新赋值
//		getData(id,tranName);//获取数据
		if(isTabsType == 1 && dlzsQueryType == 'D'){
			var startDate =  $('#startydzsDate').val();//开始日期
			var nowDate = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('d',1,DateUtil.strToDate(startDate)));
			$('#startydzsDate').val(nowDate);
			getData(id,yhbName);//获取数据
		}else if(isTabsType == 1 && dlzsQueryType == 'M'){
			var startDate =  $('#startMonthDate').val();//开始日期
			var nowDate = DateUtil.dateToStr('yyyy-MM',DateUtil.dateAdd('m',1,DateUtil.strToDate(startDate)));
			$('#startMonthDate').val(nowDate.substr(0,7));
			getData(id,yhbName);//获取数据
		}else if(isTabsType == 0 && dlzsQueryType == 'M'){
			var startDate =  $('#startMonthDate').val();//开始日期
			var nowDate = DateUtil.dateToStr('yyyy-MM',DateUtil.dateAdd('m',1,DateUtil.strToDate(startDate)));
			$('#startMonthDate').val(nowDate.substr(0,7));
			getfzlData(yhbName);	
		}else if(isTabsType == 0 && dlzsQueryType == 'D'){
			var startDayDate =  $('#startydzsDate').val();//开始日期
			var nowDate = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('d',1,DateUtil.strToDate(startDayDate)));
			$('#startydzsDate').val(nowDate);
			getfzlData(yhbName);	
		}
	});
});

function consSelectMethodLoad(){
	if(consSelectCon.id.length < 4){	// 区域能源节点
		$("#clickTree").hide();
		$("#contentId").show();
		content='<iframe id="funcId" src="'+webContextRoot+'pages/despages/projectManage/tranOverview.jsp?orgNo='+consSelectCon.id+'" scrolling="no" frameborder="0" width="100%" height="100%"></iframe>'; 
		$("#contentId").empty();
		$('#contentId').append(content);
	}else{		// 企业节点
		$("#contentId").hide();
		$("#clickTree").show();
		consId = consSelectCon.id;//把树节点id赋给企业id
		consName = consSelectCon.text;//把树节点的值赋给企业名称
		queryUserFiles();//查询档案内容
		byqsbCombobox();	
	}
}
//tabs选项卡选择事件
function userTabsSelect(title,index){
	isTabsType = index;//0 :用电走势 1:负载率  	
  	if(isTabsType == 1){
//  		$("#firstbyq").show();
//  		$("#startydzsDate").show();
  		$("#searchydzs").css('display',"");
  		$("#startMonthDate").hide();
  		$("#sel_type").show();
  		$("#searchfhe").css('display','none');
//  		$("#secondbyq").hide();
  		$("#secondbyq").show();
  		$('#byqQueryType').combobox('select',$("#byqQueryType").combobox("getValue"));
  		if($("#byqQueryType").combobox("getValue")=="D"){
  			$("#startMonthDate").hide();
  			$("#startydzsDate").show();
  		}else if($("#byqQueryType").combobox("getValue")=="M"){
  			$("#startMonthDate").show();
  			$("#startydzsDate").hide();
  		}
  		getData(id,yhbName);//获取数据
//  		yndyNameCombobox();
//  		ydzsChart = echarts.init(document.getElementById('ydzsChart'));//初始化用电走势chart 
//  		yndyNameCombobox();
//  		if(isFirstydzl == true){
//  			getData(id,tranName);//获取数据
//  		}
//  		isFirstydzl = true;
  	}else if(isTabsType == 0){
  		$("#firstbyq").hide();		
  		$("#searchydzs").css('display','none'); 		
  		$("#sel_type").show();
  		$("#searchfhe").css('display',"");
  		$("#secondbyq").show();  		
//  		getByqsb();
//  		fheChart = echarts.init(document.getElementById('fheChart'));//初始化用电走势chart
//  		$('#byqQueryType').combobox('select',"D");
//  		getfzlData(yhbName);
  		if(isFirstydzl == true){
  			$("#startMonthDate").hide();
  			$("#startydzsDate").show();
  			$('#byqQueryType').combobox('select',"D");
  			byqsbCombobox();
  			isFirstydzl = false; 			 			
  		}else{
  			if($("#byqQueryType").combobox("getValue")=="D"){
  	  			$("#startMonthDate").hide();
  	  			$("#startydzsDate").show();
  	  		}else if($("#byqQueryType").combobox("getValue")=="M"){
  	  			$("#startMonthDate").show();
  	  			$("#startydzsDate").hide();
  	  		}
  			$('#byqQueryType').combobox('select',$("#byqQueryType").combobox("getValue"));
  			getfzlData(yhbName);  			
  		}
  		
  	}
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
	if(chiNode.length == 0){
		getKtydzsEcharts();
		$.messager.alert('提示', '请先给客户添加空调设备', 'warning');
	} else {
		for(var i=0 ; i < chiNode.length ; i++)//循环节点
	    {
	       if(nodeId!=null?chiNode[i].id==nodeId:chiNode[i].type==1)//查找第一个类型为1的 用户
		   {
	      	   	var n = $('#tree-leftQyTree').tree("find",chiNode[i].id);//根据id获取节点
	      	   	$('#tree-leftQyTree').tree('select',n.target);//选中节点
	      	    consId = chiNode[i].id;//把树节点id赋给企业id
	      	    consName = chiNode[i].text;//把树节点的值赋给企业名称
	//      	    getbyqData();
	      	    queryUserFiles();//查询档案内容
//	      	    if(isTabsType == 1){
//					yndyNameCombobox();//用能单元名称下拉框
//				}else if(isTabsType== 0){
					byqsbCombobox();
//				}
	      	   	break;//跳出循环
	       }
	    }
	}
}

//加载各种事件
function addEvent(){
	
	 //单位空调制冷量查询事件
	$('#searchktzl').click(function(){
		queryKtChart(1);//查询空调系统
	});
	
	 //空调系统能效比查询事件
	$('#searchktnxb').click(function(){
		queryKtChart(2);//查询空调系统
	});
	
	//冷源系统能效系数查询事件
	$('#searchlynxxs').click(function(){
		queryKtChart(3);//查询空调系统
	});
	
	//主机查询事件
	$('#searchzj').click(function(){
		queryKtChart(4);//查询空调系统
	});
	 
	//水泵查询事件
	$('#searchsb').click(function(){
		queryKtChart(5);//查询空调系统
	});
	
	//输配系统查询事件
	$('#searchsp').click(function(){
//		alert("输配系统查询事件");
	});
	
	//冷却塔系统查询事件
	$('#searchlqt').click(function(){
//		alert("冷却塔系统查询事件");
	});
	
	//用电走势
	$('#searchydzs').click(function(){
//		queryKtChart(6);
		getData(id,tranName);//获取数据
	});
	//负荷走势
	$('#searchfhe').click(function(){
//		queryKtChart(6);
//		getData(id,tranName);//获取数据
		getfzlData(yhbName);	
	});
	
	
//	dateLeftOrRight('#ydzsleft','#startydzsDate',-1);//单位空调制冷量
//	dateLeftOrRight('#ydzsright','#startydzsDate',1);//单位空调制冷量
	
	dateLeftOrRight('#ktzlleft','#startktzlDate',-1);//单位空调制冷量
	dateLeftOrRight('#ktzlright','#startktzlDate',1);//单位空调制冷量
	
	dateLeftOrRight('#ktnxbleft','#startktnxbDate',-1);//空调系统能效比
	dateLeftOrRight('#ktnxbright','#startktnxbDate',1);//空调系统能效比
	
	dateLeftOrRight('#lynxxsleft','#startlynxxsDate',-1);//冷源系统能效系数
	dateLeftOrRight('#lynxxsright','#startlynxxsDate',1);//冷源系统能效系数
	
	dateLeftOrRight('#zjleft','#startzjDate',-1);//主机
	dateLeftOrRight('#zjright','#startzjDate',1);//主机
	
	dateLeftOrRight('#sbleft','#startsbDate',-1);//水泵
	dateLeftOrRight('#sbright','#startsbDate',1);//水泵
	
	dateLeftOrRight('#spleft','#startspDate',-1);//输配
	dateLeftOrRight('#spright','#startspDate',1);//输配
	
	dateLeftOrRight('#lqtleft','#startlqtDate',-1);//冷却塔
	dateLeftOrRight('#lqtright','#startlqtDate',1);//冷却塔
	
	$('#ldsfx').linkbutton({
		toggle: true,
		group: 'g2',
		plain: true,
		selected: true,
		onClick: function() {
//           alert("冷冻水分析");
		}
	});

	$('#lqsfx').linkbutton({
		toggle: true,
		group: 'g2',
		plain: true,
		onClick: function() {
//			alert("冷却水分析");
		}
	});
	
	$('#ptfx').linkbutton({
		toggle: true,
		group: 'g2',
		plain: true,
		onClick: function() {
//			alert("旁通分析");
		}
	});
}

//查询空调信息
function queryKtChart(typeIndex){
	 
//	if(typeIndex==1){
//		myktzlChart.showLoading({
//			text:'正在努力的读取数据中...',
//			effect:'spin'
//		});
//	}else if(typeIndex==2){
//		myktnxbChart.showLoading({
//			text:'正在努力的读取数据中...',
//			effect:'spin'
//		});
//	}else if(typeIndex==3){
//		mylynxxsChart.showLoading({
//			text:'正在努力的读取数据中...',
//			effect:'spin'
//		});
//	}else if(typeIndex==4){
//		myzjChart.showLoading({
//			text:'正在努力的读取数据中...',
//			effect:'spin'
//		});
//	}else if(typeIndex==5){
//		mysbChart.showLoading({
//			text:'正在努力的读取数据中...',
//			effect:'spin'
//		});
//	} 
//	else if(typeIndex==6){
//		myydzsChart.showLoading({
//			text:'正在努力的读取数据中...',
//			effect:'spin'
//		});
//	} 
	
	//查询echarts图
//	  $.get(webContextRoot + 'charge/queryktData.action', {
//		  },
//		  function(json){
//			  ktChartShown(json,typeIndex);
//			  if(typeIndex==1){
//					myktzlChart.hideLoading();
//				}else if(typeIndex==2){
//					myktnxbChart.hideLoading();
//				}else if(typeIndex==3){
//					mylynxxsChart.hideLoading();
//				}else if(typeIndex==4){
//					myzjChart.hideLoading();
//				}else if(typeIndex==5){
//					mysbChart.hideLoading();
//				}  
//			  ynfx();
//		  }
//	  );
}

//echarts图展示  空调
function ktChartShown(dataMap,typeIndex){
	
	var forMater = '';
	var danwei = '';
	var series = [];//图表内容
	var legend = [];//legend
	 if(typeIndex==1){//单位空调制冷量
		    forMater = "制冷量";
		    legend = ['制冷量'];
		    danwei="kW·h/㎡";
		    series.push({
    			name:'',
    			type:'line',
    			yAxisIndex : 0,//左右轴 
    			data :[25.5,20.1,30,31,30,34,33,32.8,34.5,31,27.8,32,33,34,36,33.4,33,34,36,33.4
				       ,25.5,20.1,30,31,30,34,33,32.8,34.5,31,27.8,32,33,34,36,33.4,33,34,36,33.4
				       ,25.5,20.1,30,31,30,34,33,32.8,34.5,31,27.8,32,33,34,36,33.4,33,34,36,33.4
				       ,25.5,20.1,30,31,30,34,33,32.8,34.5,31,27.8,32,33,34,36,33.4,33,34,36,33.4
				       ,25.5,20.1,30,31,30,34,33,32.8,34.5,31,27.8,32,33,34,36,33.4]
    		})
		}else if(typeIndex==2){//空调系统能效比
			forMater = "能效比";
			legend = ['能效比'];
			danwei=" %";
			series.push({
    			name:'',
    			type:'line',
    			yAxisIndex : 0,//左右轴 
    			data :[35.5,22.1,34,31,20,22,22.3,42.8,24.5,21,37.8,22,43,34,26,43.4,43,34,26,43.4
				       ,35.5,22.1,34,31,20,22,22.3,42.8,24.5,21,37.8,22,43,34,26,43.4,43,34,26,43.4
				       ,35.5,22.1,34,31,20,22,22.3,42.8,24.5,21,37.8,22,43,34,26,43.4,43,34,26,43.4
				       ,35.5,22.1,34,31,20,22,22.3,42.8,24.5,21,37.8,22,43,34,26,43.4,43,34,26,43.4
				       ,35.5,22.1,34,31,20,22,22.3,42.8,24.5,21,37.8,22,43,34,26,43.4]
    		})
		}else if(typeIndex==3){//冷源系统能效系数
			forMater = "能效系数";
			legend = ['能效系数'];
			danwei="系数";
			series.push({
    			name:'',
    			type:'line',
    			yAxisIndex : 0,//左右轴 
    			data :[27.5,25.1,34,33,32,33,31,31.8,33.5,34,25.8,34,36,34,35,33.7,36,34,35,33.7
				       ,27.5,25.1,34,33,32,33,31,31.8,33.5,34,25.8,34,36,34,35,33.7,36,34,35,33.7
				       ,27.5,25.1,34,33,32,33,31,31.8,33.5,34,25.8,34,36,34,35,33.7,36,34,35,33.7
				       ,27.5,25.1,34,33,32,33,31,31.8,33.5,34,25.8,34,36,34,35,33.7,36,34,35,33.7
				       ,27.5,25.1,34,33,32,33,31,31.8,33.5,34,25.8,34,36,34,35,33.7]
    		})
		}else if(typeIndex==4){//主机
			legend = ['出水温度','回水温度','供回水温差','室内温度'];
			forMater = "";
			danwei ='℃';
			series.push({
				name:'出水温度',
				type:'line',
				yAxisIndex : 0,//左右轴 
				data :[25.5,20.1,30,31,30,34,33,32.8,34.5,31,27.8,32,33,34,36,33.4,33,34,36,33.4
				       ,25.5,20.1,30,31,30,34,33,32.8,34.5,31,27.8,32,33,34,36,33.4,33,34,36,33.4
				       ,25.5,20.1,30,31,30,34,33,32.8,34.5,31,27.8,32,33,34,36,33.4,33,34,36,33.4
				       ,25.5,20.1,30,31,30,34,33,32.8,34.5,31,27.8,32,33,34,36,33.4,33,34,36,33.4
				       ,25.5,20.1,30,31,30,34,33,32.8,34.5,31,27.8,32,33,34,36,33.4]
			},{
				name:'回水温度',
				type:'line',
				yAxisIndex : 0,//左右轴 
				data :[35.5,22.1,34,31,20,22,22.3,42.8,24.5,21,37.8,22,43,34,26,43.4,43,34,26,43.4
				       ,35.5,22.1,34,31,20,22,22.3,42.8,24.5,21,37.8,22,43,34,26,43.4,43,34,26,43.4
				       ,35.5,22.1,34,31,20,22,22.3,42.8,24.5,21,37.8,22,43,34,26,43.4,43,34,26,43.4
				       ,35.5,22.1,34,31,20,22,22.3,42.8,24.5,21,37.8,22,43,34,26,43.4,43,34,26,43.4
				       ,35.5,22.1,34,31,20,22,22.3,42.8,24.5,21,37.8,22,43,34,26,43.4
				       ]
			},{
				name:'供回水温差',
				type:'line',
				yAxisIndex : 0,//左右轴 
				data :[28.5,24.1,32,31.9,25.5,20.1,30,31,30,34,33,32.8,34.5,31,27.8,32,34.5,31,27.8,32
				       ,28.5,24.1,32,31.9,25.5,20.1,30,31,30,34,33,32.8,34.5,31,27.8,32,34.5,31,27.8,32
				       ,28.5,24.1,32,31.9,25.5,20.1,30,31,30,34,33,32.8,34.5,31,27.8,32,34.5,31,27.8,32
				       ,28.5,24.1,32,31.9,25.5,20.1,30,31,30,34,33,32.8,34.5,31,27.8,32,34.5,31,27.8,32
				       ,28.5,24.1,32,31.9,25.5,20.1,30,31,30,34,33,32.8,34.5,31,27.8,32]
			},{
				name:'室内温度',
				type:'line',
				yAxisIndex : 0,//左右轴
				data :[27.5,25.1,34,33,32,33,31,31.8,33.5,34,25.8,34,36,34,35,33.7,36,34,35,33.7
				       ,27.5,25.1,34,33,32,33,31,31.8,33.5,34,25.8,34,36,34,35,33.7,36,34,35,33.7
				       ,27.5,25.1,34,33,32,33,31,31.8,33.5,34,25.8,34,36,34,35,33.7,36,34,35,33.7
				       ,27.5,25.1,34,33,32,33,31,31.8,33.5,34,25.8,34,36,34,35,33.7,36,34,35,33.7
				       ,27.5,25.1,34,33,32,33,31,31.8,33.5,34,25.8,34,36,34,35,33.7]
			});
		} 
	
	option = {
			tooltip: {
		        trigger: 'axis',
		        formatter : function(params, ticket, callback) {
					var res = params[0].name;
	            	for (var i = 0; i < params.length; i++) {
	            		res += '<br/>' + params[i].seriesName + ':' + params[i].value+danwei;
	            	}
					return res;
				}
		    },
		    toolbox: { // 展示右上角工具
                color: '#0375cd',
                show: true,  //true展示小工具
                effectiveColor: '#000',
                feature: {
                    mark: { show: true } //辅助小工具
//                    restore: { show: true } // 还原工具
                }
            },
            grid: {
            	x : 45, //左边距离
				 y : 45,//上边距离
				 x2 : 30,//右边距离
				 y2 : 35//下边距离
            },
		    legend: {
		        data:legend/**数据*/
		    },
		    xAxis : [
		        {
				 type : 'category',
				 boundaryGap : false,
				 data :['00:00','00:15','00:30','00:45','01:00','01:15','01:30','01:45','02:00','02:15','02:30',
				        '02:45','03:00','03:15'
				 ,'03:30','03:45','04:00','04:15','04:30','04:45','05:00','05:15','05:30','05:45','06:00','06:15',
				 '06:30','06:45','07:00','07:15','07:30','07:45','08:00',
				 '08:15','08:30','08:45','09:00','09:15','09:30','09:45','10:00','10:15','10:30','10:45',
				 '11:00','11:15','11:30','11:45','12:00','12:15','12:30','12:45','13:00','13:15','13:30',
				 '13:45','14:00','14:15','14:30','14:45','15:00','15:15','15:30','15:45','16:00','16:15',
				 '16:30','16:45','17:00','17:15','17:30','17:45','18:00','18:15','18:30','18:45','19:00',
				 '19:15','19:30','19:45','20:00','20:15','20:30','20:45','21:00','21:15','21:30','21:45','22:00',
				 '22:15','22:30','22:45','23:00','23:15','23:30','23:45']

			}
		    ],
		    yAxis : [
		        {
					type : 'value',//值
					splitNumber : 5,//分割段数，默认为5，为0时为线性渐变，calculable为true是默认均分100份
					name : '单位('+danwei+')',//y轴名字
					axisLabel : {//格式化
						formatter : '{value}'
					} 
				}
		    ],
		    series : series
	};
//	 if(typeIndex==1){//单位空调制冷量
//		myktzlChart.setOption(option,true);
//	}else if(typeIndex==2){//空调系统能效比
//		myktnxbChart.setOption(option,true);
//	}else if(typeIndex==3){//冷源系统能效系数
//		mylynxxsChart.setOption(option,true);
//	}else if(typeIndex==4){//主机
//		myzjChart.setOption(option,true);
//	}else if(typeIndex==5){
//		mysbChart.setOption(option,true);
//	} 
	
}

//时间加载事件
function ynfx(dataMap){
	zllzbfx(30,2,50);
	nxbzbfx(1,1165,500);
	nxxszbfx(2,500,80);
	ynfxzj();
}


//用能建议 主机部分
function ynfxzj(){
	
	$("#zjynjy").html("回水温度："+20+"℃，供回水温差："+10+"℃，室内温度："+28+"℃");
	
//	var snwd = null;//室内温度
//	var hswd = null;//回水温度
//	var cswd = null;//出水温度
//	var ghswc = null;//供回水温差
//	snwd = dataMap.indoorTemp;
//	if(type==1){//冷冻水
//		cswd = dataMap.freezeBwaterAvg;
//		hswd = dataMap.freezeYwaterAvg;
//	}else if(type==2){//冷却水
//		cswd = dataMap.coolBwaterAvg;
//		hswd = dataMap.coolYwaterAvg;
//	}else if(type==3){//旁通
//		
//	}
//	if(snwd == null){
//		snwd = 25;//默认
//	}
//	if(snwd==null||hswd==null||cswd==null){
//		if(snwd==null){
//			snwd = '--';
//		}else{
//			snwd = snwd+"℃";
//		}
//		if(hswd==null){
//			hswd = '--';
//		}else{
//			hswd = hswd+"℃";
//		}
//		if(hswd==null||cswd==null){
//			ghswc = '--';
//		}else{
//			ghswc = Math.abs(cswd-hswd).toFixed(2)+"℃";
//		}
//		$("#zjynjy").html("回水温度："+hswd+"，供回水温差："+ghswc+"，室内温度："+snwd);
//		advice2 ="1. 回水温度："+hswd+"；2. 供回水温差："+ghswc+"；3. 室内温度："+snwd;
//		return;
//	}
//	ghswc = Math.abs(cswd-hswd).toFixed(2);
//	Ext.Ajax.request({//查询数据
//		url : gdc.webContextRoot + 'fgkt/queryZJJY.action',
//		params:{
//			'airTempPowerModel.freezeYwaterTemp':hswd,
//			'airTempPowerModel.freezeWdcTemp':ghswc,
//			'airTempPowerModel.indoorTemp':snwd,
//			'airTempPowerModel.type':'2'
//		},
//		success : function(result, request){
//			var data = Ext.util.JSON.decode(result.responseText);
//			$("#zjynjy").html("回水温度："+hswd+"℃，供回水温差："+ghswc+"℃，室内温度："+snwd+"℃，"+data.saveSUCCESS);
//		},
//		failure : function(response, options) {
//			$.messager.alert('确认', "查询失败！请联系管理员", 'error');
//		}
//	});
	
}

function nxxszbfx(type,zll,value){
	var zb = "指标值：--";
	var rs = "冷源系统能效系数EER_sys："+value+"，数据合理";
	if(value==null||value==''){
		rs = "冷源系统能效系数EER_sys：--";
	}
	if(value!=null&&value!=''&&type!=null&&type!=''&&zll!=null&&zll!=''){
		var nxxs;//能效系数
		if(type==1){//水冷式
			if(zll<528){
				nxxs = 2.3;
			}else if(zll>528&&zll<=1163){
				nxxs = 2.6;
			}else if(zll>1163){
				nxxs = 3.1;
			}
		}else if(type==2||type==3){//风冷式或蒸发式冷却
			if(zll<=1163){
				nxxs = 1.8;
			}else if(zll>1163&&zll<=3516){
				nxxs = 2;
			}
		}
		zb = "指标值："+nxxs;
		if(value<nxxs){
			rs = "冷源系统能效系数EER_sys："+value+"，存在节能空间，或者部分设备效率低";
		}else{
			rs = "冷源系统能效系数EER_sys："+value+"，数据合理";
		}
	}
	$("#ktynjy13").html(rs);
	$("#ktzb13").html(zb);
	$("#ktynjy23").html(rs);
	$("#ktzb23").html(zb);
	$("#ktynjy33").html(rs);
	$("#ktzb33").html(zb);
	$("#ktynjy43").html(rs);
	$("#ktzb43").html(zb);
}

//能效比  --冷水机组类型type --制冷系统总制冷量 zll --判断值value
function nxbzbfx(type,zll,value){
	var zb = "指标值：--";
	var rs = "空调系统能效比EERs："+value+"，数据合理";
	if(value==null||value==''){
		rs = "空调系统能效比EERs：--";
	}
	if(value!=null&&value!=''&&type!=null&&type!=''&&zll!=null&&zll!=''){
		var nxb;//能效比
		if(type==2||type==3){//风冷式或蒸发式冷却
			if(zll<=100){
				nxb = 2;
			}else if(zll>100){
				nxb = 2.1;
			}
		}else if(type==1){//水冷式
			if(zll<=1163){
				nxb = 2.7;
			}else if(zll>1163&&zll<=3516){
				nxb = 2.8;
			}else if(zll>3516){
				nxb = 2.9;
			}
		}
		zb = "指标值："+nxb;
		if(value<nxb){
			rs = "空调系统能效比EERs："+value+"，存在节能空间，或者部分设备效率低";
		}else{
			rs = "空调系统能效比EERs："+value+"，数据合理";
		}
	}
	$("#ktynjy12").html(rs);
	$("#ktzb12").html(zb);
	$("#ktynjy22").html(rs);
	$("#ktzb22").html(zb);
	$("#ktynjy32").html(rs);
	$("#ktzb32").html(zb);
	$("#ktynjy42").html(rs);
	$("#ktzb42").html(zb);
}

/**
 * 指标判断部分
 */
//制冷量 --判断值value
function zllzbfx(value,type,name){
	var zb = "指标值：--";
	var rs = "单位空调制冷量CCA："+value+"kW·h/㎡，数据合理";
	if(value==null||value==''){
		rs = "单位空调制冷量CCA：--";
	}
	if(value!=null&&value!=''&&type!=null&&type!=''){
		var zllmin = 80;//默认下限
		var zllmax = 120;//默认上限
		if(type==9){//住宅
			zllmin = 80;
			zllmax = 90;
		}else if(type==3){//宾馆
			zllmin = 80;
			zllmax = 110;
		}else if(type==1){//办公
			zllmin = 90;
			zllmax = 120;
		}
		rs = "单位空调制冷量CCA："+value+"kW·h/㎡，";
		zb = "指标值："+name+"，"+zllmin+"~"+zllmax+"kW·h/㎡";
		//空调制冷量不足
		//存在节能空间
		if(value>zllmax){
			rs += "CCA大于指标值，存在节能空间";
		}else if(value<zllmin){
			rs += "CCA小于指标值，空调制冷量不足";
		}else{
			rs += "CCA在指标范围内，数据合理";
		}
	}
	
	$("#ktynjy11").html(rs);
	$("#ktzb11").html(zb);
	$("#ktynjy21").html(rs);
	$("#ktzb21").html(zb);
	$("#ktynjy31").html(rs);
	$("#ktzb31").html(zb);
	$("#ktynjy41").html(rs);
	$("#ktzb41").html(zb);
}
  

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

//时间加载事件
function dateLeftOrRight(addplusButton,dateId,days){
	//左减日期
	$(addplusButton).click(function(){
		var startDate =  $(dateId).val();//获取当前开始日期
		var nowDate = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('d',days,DateUtil.strToDate(startDate)));//减一天
		$(dateId).val(nowDate);//重新赋值
	});
}

/**
 * 用能单元名称下拉框
 * @param consId
 */
//function yndyNameCombobox(){
//	if(consId != ""){
//		$("#yndyName").combobox({
//			url: webContextRoot + 'charge/queryEnergyCellName.action',    
//			queryParams : {
//				'airConditionUseEleModel.consId' : consId
//			},
//		    valueField:'id',    
//		    textField:'energyCellName' ,
//		    onLoadSuccess:function(){
//				var byqData = $(this).combobox("getData");
//				if(byqData.length>0){
//					$('#yndyName').combobox('select',byqData[0].id);
//				}else{
//					$('#yndyName').combobox('select','');
//					id = '';
//					energyCellName = '';
//					getData(id,energyCellName);
//				}
//			},
//			onSelect:function(record){
//				id = record.id;
//				energyCellName = record.energyCellName;
//				tranName = energyCellName;
//				getData(id,energyCellName);	
//				}
//		});
//	}else{
//		getData('','');	
//	}
//}
/**
 * 用能单元名称下拉框2
 * @param consId
 */
function byqsbCombobox(){
	$("#byqsb").combobox({
		url: webContextRoot + 'ktxt/queryEnergyCellName.action',    
		queryParams : {
			'airConditionUseEleModel.consId' : consId
		},
	    valueField:'id',    
	    textField:'energyCellName' ,
	    onLoadSuccess:function(){
			var byqData = $(this).combobox("getData");
			if(byqData.length>0){
				$('#byqsb').combobox('select',byqData[0].id);
			}else{
				$('#byqsb').combobox('select','');
				tranId = '';
				energyCellName = '';
				yhbName = energyCellName;
				if(isTabsType== 0){
					getfzlData(yhbName);
				}else if(isTabsType== 1){
					getData(id,energyCellName);
				}						
			}
		},
		onSelect:function(record){
			tranId = record.id;
			energyCellName = record.energyCellName;
			yhbName = energyCellName;
			if(isTabsType== 0){
				getfzlData(yhbName);
			}else if(isTabsType== 1){
				getData(id,yhbName);
			}		
		}
	});
}

function otherCombobox(){
	$("#otherName").combobox({
		url: webContextRoot + 'ktxt/queryEnergyCellName.action',    
		queryParams : {
			'airConditionUseEleModel.consId' : consId
		},
	    valueField:'id',    
	    textField:'energyCellName',
	    onLoadSuccess:function(){
			var byqData = $(this).combobox("getData");
			if(byqData.length>0){
				$('#otherName').combobox('select',byqData[0].id);
			}else{
				$('#otherName').combobox('select','');
			}
		}
	});
}

function otherCombobox1(){
	$("#otherName1").combobox({
		url: webContextRoot + 'ktxt/queryEnergyCellName.action',    
		queryParams : {
			'airConditionUseEleModel.consId' : consId
		},
	    valueField:'id',    
	    textField:'energyCellName',
	    onLoadSuccess:function(){
			var byqData = $(this).combobox("getData");
			if(byqData.length>0){
				$('#otherName1').combobox('select',byqData[0].id);
			}else{
				$('#otherName1').combobox('select','');
			}
		}
	});
}

function otherCombobox2(){
	$("#otherName2").combobox({
		url: webContextRoot + 'ktxt/queryEnergyCellName.action',    
		queryParams : {
			'airConditionUseEleModel.consId' : consId
		},
	    valueField:'id',    
	    textField:'energyCellName',
	    onLoadSuccess:function(){
			var byqData = $(this).combobox("getData");
			if(byqData.length>0){
				$('#otherName2').combobox('select',byqData[0].id);
			}else{
				$('#otherName2').combobox('select','');
			}
		}
	});
}
/**
 * 空调系统用电走势
 * @param id
 * @param energyCellName
 */
function getData(id,energyCellName){
	myydzsChart = echarts.init(document.getElementById('ydzsChart'));
	myydzsChart.showLoading({
		text:'正在努力的读取数据中...',
		effect:'spin'
	});
	var dlzsQueryType = $('#byqQueryType').combobox('getValue');
	if(isTabsType == 1 && dlzsQueryType == 'D'){
		var startDate =  $('#startydzsDate').val();//开始日期		
		$.getJSON(webContextRoot + 'ktxt/getSEnergySubsHour.action', 
				{ 
				   //请求参数
					'sEnergySubsHourModel.beginDate': startDate,//当前时间
					'sEnergySubsHourModel.subsId': id//设备ID
				},
				function(json){
					   
					myydzsChart = echarts.init(document.getElementById('ydzsChart'));
					    var option = ydzsCountData(json,energyCellName);
					    myydzsChart.setOption(option,true);
					    myydzsChart.hideLoading();
					    setJianYi();
				}
			);
	}else if(isTabsType == 1 && dlzsQueryType == 'M'){
		var startDate =  $('#startMonthDate').val();//开始日期
		var startDateWzx = startDate+"-01";// 开始时间
		var getMonth = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('m',1,DateUtil.strToDate(startDate+"-01")));
		var endDateWzx = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('d',-1,DateUtil.strToDate(getMonth)));// 结束时间
		
		if(startDate> endDate){//开始时间大于结束时间警告
			$.messager.alert('提示', "开始日期不能大于结束日期！", 'warning');
			return;
		}
		 	$.getJSON(webContextRoot + 'ktxt/queryKtsbData.action', 
				{ 
				   //请求参数
					'sfEnergySubsDayModel.beginDate': startDateWzx,//开始时间
					'sfEnergySubsDayModel.endDate': endDateWzx,//结束时间
					'sfEnergySubsDayModel.subsId': id,//设备ID
					'sfEnergySubsDayModel.dataDate': $('#startMonthDate').val()//设备ID
				},
				function(json){
				   var option = ydzsCountData(json,energyCellName);
				    myydzsChart.setOption(option,true);
				    myydzsChart.hideLoading();
				    setJianYi();
				}
			);
	}
	
}
/**
 * 空调系统负荷
 * @param yhbName
 */
function getfzlData(yhbName){
	myfheChart = echarts.init(document.getElementById('fheChart'));
	myfheChart.showLoading({
		text:'正在努力的读取数据中...',
		effect:'spin'
	});
	var dataDate;
	var dlzsQueryType = $('#byqQueryType').combobox('getValue');
	if(dlzsQueryType == 'D'){
		dataDate =  $('#startydzsDate').val();
	}else if(dlzsQueryType == 'M'){
		dataDate =  $('#startMonthDate').val();
	}
		
	$.getJSON(webContextRoot + 'ktxt/selectKqFhe.action', 
			{ 
			   //请求参数
				'powerLoadModel.dataDate': dataDate,//开始时间
				'powerLoadModel.tranId': tranId,//变压器id
				'powerLoadModel.dataType': 3//设备类型
				
			},
			function(json){
//				getpowerCountData(json,title);
//				myfheChart = echarts.init(document.getElementById('fheChart'));
			    var option = getpowerCountData(json,yhbName);
			    myfheChart.setOption(option,true);
			    myfheChart.hideLoading();
			    setFJianYi();
//				checkLoadRate(json.sMap.fzlList);
			}
		);
} 
function ydzsCountData(dataMap,title){
	var x = [];
	var y = [];
	for(var i = 1;i<32;i++){
		x.push(setTime(i));
		y.push(Math.floor(Math.random()*100));
	}
	var dlzsQueryType = $('#byqQueryType').combobox('getValue');
	if(isTabsType == 1 && dlzsQueryType == 'D'){
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
//		            boundaryGap:false,
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
		            type: 'bar',
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
	}else if(isTabsType == 1 && dlzsQueryType == 'M'){
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
					 x2 : 80,//右边距离
					 y2 : 35//下边距离
				},
		    xAxis: [
		        {
		        	
		            type: 'category',
//		            boundaryGap : [0, 0.01],
//		            boundaryGap:false,
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
		            type: 'bar',
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
	}
return option;	 
//ydzsChart.setOption(option,true);
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

//负载率echarts图
function getpowerCountData(dataMap,title){
	var option = {};
	var fhtype = $('#byqQueryType').combobox('getValue');
	if(isTabsType == 0 && fhtype == 'D'){
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
	}else if(isTabsType == 0 && fhtype == 'M'){
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
//给节能建议赋值
function setJianYi(){
	var text1 = "1、建议对空调负荷进行详细的调查分析，寻找最佳启停控制模式；";
	var text2 = "2、建议合理选择主机功率，根据空调实际负荷调节主机台数或选择主机功率；";
	var text3 = "3、建议合理设定室内温湿度，避免夏季温度过低，冬季温度过高；";
	$("#jnjyABS").text(text1);
	$("#jnjyBBS").text(text2);
	$("#jnjyCBS").text(text3);
}
//给节能建议赋值
function setFJianYi(){
	var textf1 = "1、建议对空调负荷进行详细的调查分析，寻找最佳启停控制模式；";
	var textf2 = "2、建议合理选择主机功率，根据空调实际负荷调节主机台数或选择主机功率；";
	var textf3 = "3、建议合理设定室内温湿度，避免夏季温度过低，冬季温度过高；";
	$("#jnjyABS1").text(textf1);
	$("#jnjyBBS1").text(textf2);
	$("#jnjyCBS1").text(textf3);
}

function getKtydzsEcharts(){
	var dateList = new Array();
	var ktydzsList = new Array();
	var a;
	for(var i=0;i<24;i++){
		if(i<10){
			a = "0"+i+":00";
			dateList.push(a);
			ktydzsList.push("-");
		}else{
			a = i+":00";
			dateList.push(a);
			ktydzsList.push("-");
		}		
	}
	
	myydzsChart = echarts.init(document.getElementById('ydzsChart'));
	myydzsChart.showLoading({
		text:'正在努力的读取数据中...',
		effect:'spin'
	});
	
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
			 x : 45, //左边距离
			 y : 75,//上边距离
			 x2 : 55,//右边距离
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
//        min:'0',
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
            data:ktydzsList//数据,
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
myydzsChart.setOption(option,true);
myydzsChart.hideLoading();
}