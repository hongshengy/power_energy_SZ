/**
 * 项目管理-效果验证
 * @author 孟子杰
 * @since 2017-05-08
 */
var myChart = '';
var finishDate = ''; //完成日期
//var consName ='';//选择树的企业名称
//var consId = '';//选择树的企业id
var deveiceType ='';
var deviceId = '';
var deviceName = '';
var timeType = '';	//类型  月查询  周查询
var firstTimer = null ; //第一次加载定时器
//js入口
$(function(){
	//初始化echart
	myChart = echarts.init(document.getElementById('dlChart'));
	
	if(consId==null || consId==''|| consId=="null"){//未获取到企业编码，加载左侧树
//		$('#tree-leftQyTree').tree({ //默认没参数，获取区域  企业  都是打开状态
//			// modeType=11，过滤含有项目档案的客户
//			url:webContextRoot +'destree/queryTree.action?modeType=11',
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
//					selectPrjArchiveByConsId();//查询项目档案
//		    	}else{
//		    		$.messager.alert('提示', '请选择客户', 'warning');
//		    	}
//			},
//			onLoadSuccess:function(node, data){//加载成功返回
//				selectTree();//设置树默认选中节点
//			}
//		});
//		//树模糊检索
//		searchTreeNode();
		
		//设置选择客户后执行的方法
//		consSelectMethod = "selectPrjArchiveByConsId()";
		//加载客户(url,是否需要区域能源根节点,没有客户时给出的提示)
//		consSelect(webContextRoot + "destree/queryTree.action?modeType=11",false,'请先给客户添加项目档案');
		
		//设置选择客户后执行的方法
		 consSelectMethod = "consSelectMethodLoad()";
		 consSelectHasRoot = false;
		 consSelectSearch("",true);
	}else{
		selectPrjArchiveByConsId();//查询项目档案
	}
	
	$("#timeType").combobox({
		textField: 'label',
		valueField: 'value',
		data: [{
			label: '周比较',
			value: 'week'
		},{
			label: '月比较',
			value: 'month'
		}],
		onLoadSuccess :function(data){
//	    	console.log(data);
			timeType = data[0].value;
			$(this).combobox('setValue', data[0].value);
	    },
//		onSelect : function (record){
//			timeType = record.value;
//			bt_search();//查询
//		},
		onChange:function(n,o){
			if(o!=''){
				timeType = n;
				bt_search();//查询
			}
		}
	});
	
//	firstSearch();	不需要了
});

function consSelectMethodLoad(){
	consId = consSelectCon.id;				
	consName = consSelectCon.text;	
	selectPrjArchiveByConsId();//查询项目档案
}

/**
 * 页面加载 首次查询
 * 查电量
 */
//function firstSearch(){
//	if(timeType!=''&&deveiceType!=''&&deviceId!=''&&finishDate){
//		dl_echart();
//		if(firstTimer!=null) window.clearInterval(firstTimer);
//	}else{
//		if(firstTimer==null) firstTimer = setInterval(firstSearch, 200);
//	}
//}
/**
 * 查询按键
 */
function bt_search(){
//	var pp = $('#tabs').tabs('getSelected');
//	var tab = pp.panel('options'); 
//	if(tab.title == '电量'){
		dl_echart();
//	}else if(tab.title == '负荷'){
//		fh_echart();		//未完成
//	}else if(tab.title == '电费'){
//		df_echart();		//未完成
//	}
}

//<!-- 根据consId查询项目档案 -->
function selectPrjArchiveByConsId(){
//	consId = consSelectCon.id;
//	consName = consSelectCon.text;
	
	$('#prjName').combobox({    
	    url: webContextRoot + 'projectFile/selectPrjArchiveByConsId.action?consId='+consId,    
	    valueField:'prjName',
	    textField:'prjName',
	    formatter :function(row){
//	    	console.log(rows);
//	    	row.prjName = HTMLEncode(row.prjName);
	    	return HTMLEncode(row.prjName);
		},
	    onLoadSuccess :function(data){
//	    	console.log(data);
	    	if(data!=null&&data.length>0){
		    	deveiceType = data[0].deveiceType;
		    	deviceId = data[0].deviceId;
		    	deviceName = data[0].deviceName;
		    	finishDate = data[0].finishDate;
				$(this).combobox('setValue', data[0].prjName);
	    	}else{
	    		deveiceType = '';
		    	deviceId = '';
		    	deviceName = '';
		    	finishDate = '';
		    	$(this).combobox('setValue', '');
	    	}
	    	bt_search();//查询
	    },
	    onLoadError : function(){
	    	deveiceType = '';
	    	deviceId = '';
	    	deviceName = '';
	    	finishDate = '';
	    	$(this).combobox('setValue', '');
	    },
	    onSelect : function (record) {
//	    	console.log(record);
	    	deveiceType = record.deveiceType;
	    	deviceId = record.deviceId;
	    	deviceName = record.deviceName;
	    	finishDate = record.finishDate;
	    	bt_search();//查询
	    }
	});  
}

/**
 * 电量-周 echart option
 * 前一周  和  后一周  比较
 * @returns option
 */
function dl_week_option(x1,x2,y1,y2){
//	if(x == null){
	var	x = [1,2,3,4,5,6,7];
//	}
	if(x1 == null){
//		x1 = [5,8,6,3,2,7,9];
		x1 = ['-','-','-','-','-','-','-'];
	}
	if(x2 == null){
//		x2 = [7,6,2,4,8,3,5];
		x2 = ['-','-','-','-','-','-','-'];
	}
	if(y1 == null){
//		y1 = [5,8,6,3,2,7,9];
		y1 = ['-','-','-','-','-','-','-'];
	}
	if(y2 == null){
//		y2 = [7,6,2,4,8,3,5];
		y2 = ['-','-','-','-','-','-','-'];
	}
	var option = {
			title: {
		        text: consName+' '+finishDate.substr(0,10)+' 周电量比较'+"("+deviceName+")",
		        left: 'center'
		    },
		    tooltip: {
		        trigger: 'axis',
		        formatter: function(params) {
		    		if(params!=null && params[0]!=null){
		    			var paramResult = x1[params[0].dataIndex] + " " + "电量：" +params[0].value + "kWh<br/>";
		    			paramResult += x2[params[0].dataIndex] + " " + "电量：" +params[1].value + "kWh<br/>";
	    				return paramResult;
		    		}
		    	}
		    },
		    grid: {
		        left: '3%',
		        right: '4%',
		        bottom: '3%',
		        containLabel: true
		    },
		    legend: {
		        data:['前一周','后一周'],
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
		            name: '单位(kWh)',
		            type: 'value',
		        }],
		    series: [
		        {
		            name:'前一周',
		            type:'line',
		            data:y1
		        },
		        {
		            name:'后一周',
		            type:'line',
		            data:y2
		        }
		    ]
		};
	return option;
}
/**
 * 电量-月 echart option
 * 前一月  和  后一月  比较
 * @returns option
 */
function dl_month_option(x1,x2,y1,y2){
//	if(x == null){
		x = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
//	}
	if(x1 == null){
//		x1 = [11,12,13,14,15,16,1,2,3,4,5,6,21,22,23,24,25,26,7,8,9,10,17,18,19,20,27,28,29,30];
		x1 = ['-','-','-','-','-','-','-','-','-','-','-','-','-','-','-',
		      '-','-','-','-','-','-','-','-','-','-','-','-','-','-','-'];
	}
	if(x2 == null){
//		x2 = [1,2,3,11,12,13,14,15,16,17,5,6,7,8,9,10,19,20,21,22,28,29,30,18,23,24,25,26,27,4];
		x2 = ['-','-','-','-','-','-','-','-','-','-','-','-','-','-','-',
		      '-','-','-','-','-','-','-','-','-','-','-','-','-','-','-'];
	}
	if(y1 == null){
//		y1 = [11,12,13,14,15,16,1,2,3,4,5,6,21,22,23,24,25,26,7,8,9,10,17,18,19,20,27,28,29,30];
		y1 = ['-','-','-','-','-','-','-','-','-','-','-','-','-','-','-',
		      '-','-','-','-','-','-','-','-','-','-','-','-','-','-','-'];
	}
	if(y2 == null){
//		y2 = [1,2,3,11,12,13,14,15,16,17,5,6,7,8,9,10,19,20,21,22,28,29,30,18,23,24,25,26,27,4];
		y2 = ['-','-','-','-','-','-','-','-','-','-','-','-','-','-','-',
		      '-','-','-','-','-','-','-','-','-','-','-','-','-','-','-'];
	}
	var option = {
		    title: {
		        text: consName+' '+finishDate.substr(0,10)+' 月电量比较'+"("+deviceName+")",
		        left: 'center'
		    },
		    tooltip: {
		        trigger: 'axis',
		        formatter: function(params) {
		    		if(params!=null && params[0]!=null){
		    			var paramResult = x1[params[0].dataIndex] + " " + "电量：" +params[0].value + "kWh<br/>";
		    			paramResult += x2[params[0].dataIndex] + " " + "电量：" +params[1].value + "kWh<br/>";
	    				return paramResult;
		    		}
		    	}
		    },
		    grid: {
		        left: '3%',
		        right: '4%',
		        bottom: '3%',
		        containLabel: true
		    },
		    legend: {
		        data:['前一月','后一月'],
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
		            name: '单位(kWh)',
		            type: 'value',
		        }],
		    series: [
		        {
		            name:'前一月',
		            type:'line',
		            data:y1
		        },
		        {
		            name:'后一月',
		            type:'line',
		            data:y2
		        }
		    ]
		};
	return option;
}

/**
 * 做电量echart
 * 设备类型 、设备ID、时间
 * 根据设备类型选择查询不同的表
 * 根据设备ID和时间，查取数据
 */
function dl_echart(){
	myChart.showLoading({
		text:'正在努力的读取数据中...',
		effect:'spin'
	});
	
	var option = null;
	$.ajax({	
		url:webContextRoot+'effectValidation/getDLData.action', 
		data:{
			'deveiceType' :  deveiceType ,  //设备类型
			'deviceId' : deviceId,	//设备ID
			'timeType' : timeType,	//类型  月查询  周查询
			'finishDate':finishDate		//完成时间
		},
		dataType:'json',
		type:'post',
		success:function(result){
			if(result.flag=='success'){
				if(result.timeType == 'month')
					option = dl_month_option(result.data.x1,result.data.x2,result.data.y1,result.data.y2);
				else
					option = dl_week_option(result.data.x1,result.data.x2,result.data.y1,result.data.y2);
			}else{
				if(result.timeType == 'month')
					option = dl_month_option(null,null,null,null);
				else
					option = dl_week_option(null,null,null,null);
			}
			if(timeType == 'month'){
				//配置echart
				myChart.setOption(option,true);
			}else if(timeType == 'week'){
				//配置echart
				myChart.setOption(option,true);
			}
			myChart.hideLoading();
		}
	});
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
		$.messager.alert('提示', '请先给客户添加项目档案', 'warning');
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
		       	    selectPrjArchiveByConsId();//查询项目档案
		       	   	break;//跳出循环
			 }
	    }
	}
}

