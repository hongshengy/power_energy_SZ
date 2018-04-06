/**
 * 电量电费分析
 */
var currentdate = new Date();//当前日期
var startDate = new Date(); // 当前开始时间 为当前时间往前推一年
var endDate = new Date();//当前结束时间  为当前时间
var fgdlChart = '';//峰谷电量chart
var fgdlEDate;

$(function(){
	//初始化echart
	fgdlChart = echarts.init(document.getElementById('fgdlChart'));
	//日期初始化
	$('#fgdlEDateY').val(DateUtil.dateToStr('yyyy',endDate));
	
	if(consId==null || consId==''|| consId=="null"){//未获取到企业编码，加载左侧树
		//设置选择客户后执行的方法
		consSelectMethod = "queryFgdl()";
		consSelectHasRoot = false;
		consSelectMultiselect = true;
		consSelectSearch("",true);
	}else{
		//查询峰谷电量
  		queryFgdl();
	}
	
	//echarts的点击事件
	fgdlChart.on('click', function(params){
		//点击事件后,弹出窗体
		$('#dldffxDialog').dialog({    
		    title: params.name + '月电量电费分析',    
		    width: '80%',    
		    height: 300,    
		    modal:true, 
		    closed: true,
		    cache: false,
		    maximizable:true
		});
		$('#dldffxDialog').dialog('open');
		var	gridCommon = [[
		   	    {field:'consNo',title:'客户编号',width: '10%',rowspan:2,align:'center'},
		   	    {field:'consName',title:'客户名称',width: '10%',rowspan:2,align:'center'},
				{field:'sumzdl',title:'总电量(kWh)',width: '9%',rowspan:2,align:'center'},
				{field:'df',title:'电费',width: '38%',colspan:4,align:'center'},
				{field:'sumfdl',title:'峰电量(kWh)',width: '9%',rowspan:2,align:'center'},
				{field:'sumpdl',title:'平电量(kWh)',width: '9%',rowspan:2,align:'center'},
				{field:'sumgdl',title:'谷电量(kWh)',width: '9%',rowspan:2,align:'center'},
				{field:'sumjdl',title:'尖电量(kWh)',width: '9%',rowspan:2,align:'center'},
				],
			[
			 	{field:'sumzdf',title:'总电费(元)',width:'9%',align:'center'},
				{field:'baseAmt',title:'基本电费(元)',width:'9%',align:'center'},
				{field:'kwhAmt',title:'电度电费(元)',width:'9%',align:'center'},
				{field:'ltAmt',title:'力调电费(元)',width:'9%',align:'center'},
			]
    	];
    	  
    	$('#dlfsData').datagrid({// 表格
    		title:'',
//    		closed: true,    
    	    cache: false,
    		nowrap : true,// 设置为true，当数据长度超出列宽时将会自动截取。
    		striped : true,// 设置为true将交替显示行背景。
    		border:false,
    		width:'100%',
    	    height:'100%',
    		fitColumns : true,// 自动适应宽度
    		singleSelect : true,// 设置为true将只允许选择一行。
    		rownumbers : true,// 设置为true将显示行数
            pagination : false,// 设置true将在数据表格底部显示分页工具栏
    		loadMsg : "正在努力的读取数据中...",// 提示信息
    		columns : gridCommon
    		
    	});
    	//日期 $('#fgdlEDateY').val() + '-' +
    	fgdlEDate = params.name;
    	//客户
    	var consIdStr = '';
    	if(consSelectCons.length > 0){
    		for(var i = 0;i<consSelectCons.length;i++){
    			if(i != 0){
    				consIdStr += ',' + consSelectCons[i].id;
    			}else{
    				consIdStr += consSelectCons[i].id;
    			}
    		}
    	}else{
    		consIdStr = consId;
    	}
    	if(consIdStr == '') return;
    	
    	$.post(webContextRoot +'powerChargeAnalyze/querydlddffxbg.action',{
        	'consPowerInfoModel.consIdStr': consIdStr,
            'consPowerInfoModel.startDate':fgdlEDate,
            'consPowerInfoModel.endDate':fgdlEDate,
            'consPowerInfoModel.queryType': 'M'
         },
         function(data){
        	$('#dlfsData').datagrid("loaded");//loading画面关闭
		   	$('#dlfsData').datagrid('loadData', data);//加载数据
	   		if(data.length>0){
		   		$('#dlfsData').datagrid('loadData', data.slice(0,10));//加载0到10的数据
	   		}
			var pager = $('#dlfsData').datagrid("getPager");
			pager.pagination({
				total:data.length,
				pageSize:10,//每页记录数
				pageList: [10,20,30],//可以设置每页记录条数的列表  
				beforePageText:'第',
				afterPageText:'页 共 {pages} 页',
				displayMsg:'当前显示 {from} - {to} 条记录,共 {total} 条记录',
				onSelectPage:function(pageNo,pageSize){
					var start = (pageNo-1)*pageSize;//计算分页数据开始
					var end = start+ pageSize;//计算分页数据结束
					$('#dlfsData').datagrid('loadData',data.slice(start,end));//分页加载每页条目
					pager.pagination('refresh',{
						total:data.length,//总记录条数
						pageNumber:pageNo//页面
					});
				}
			});	
         },'json');
	});
	
	//左减日期 
	$('#leftfgdl').click(function(){
		var startDate =  $('#fgdlEDateY').val();//开始日期
		startDate1 = new Date(startDate);
		var nowDate = DateUtil.dateToStr('yyyy',DateUtil.dateAdd('y',-1,startDate1));
		$('#fgdlEDateY').val(nowDate);
		queryFgdl();
	});
	
	//右加日期
	$('#rightfgdl').click(function(){
		var startDate =  $('#fgdlEDateY').val();//开始日期
		startDate1 = new Date(startDate);
		var nowDate = DateUtil.dateToStr('yyyy',DateUtil.dateAdd('y',1,startDate1));
		$('#fgdlEDateY').val(nowDate);
		queryFgdl();
	});
	
})



/**
 * 峰谷电量
 */
function queryFgdl(){
	var consIdStr = '';
//	if($('#tt').length > 0){
//		var nodes = $('#tt').tree('getChecked');//获取勾选的节点数据
//		if(nodes.length ==  0){
//			$.messager.alert('提示', "至少选择一个", 'warning');
//			return;
//		}else if(nodes.length > 6){
//			$.messager.alert('提示', "不能大于6个企业", 'warning');
//			return;
//		}
//		
//		for(var i = 0;i<nodes.length;i++){
//			if(i != 0){
//				consIdStr += ',' + nodes[i].id;
//			}else{
//				consIdStr += nodes[i].id;
//			}
//		}
	
	if(consSelectCons.length > 0){
		for(var i = 0;i<consSelectCons.length;i++){
			if(i != 0){
				consIdStr += ',' + consSelectCons[i].id;
			}else{
				consIdStr += consSelectCons[i].id;
			}
		}
	}else{
		consIdStr = consId;
	}
	if(consIdStr == '') return;
	
	fgdlChart.showLoading({
		text:'正在努力的读取数据中...',
		effect:'spin'
	});
	fgdlEDate = $('#fgdlEDateY').val();
	$.post(webContextRoot +'powerChargeAnalyze/querydlddffx.action',{
    	'consPowerInfoModel.consIdStr': consIdStr,
        'consPowerInfoModel.startDate':fgdlEDate,
        'consPowerInfoModel.endDate':fgdlEDate,
        'consPowerInfoModel.queryType': 'Y'
     },
     function(data){
    	 queryFgdlEchart(data.consMap,fgdlEDate);
         fgdlChart.hideLoading();
         //峰谷表格
         queryData();
     },'json');
	
}

/**
 * 峰谷电量 图表
 */
function queryFgdlEchart(dataMap,fgdlEDate){
	var series = [];
	var legend = [];

	for(var i =0;i<dataMap.ids;i++){
		series.push({
			name:dataMap.nameList[i],
			type:'bar',
			yAxisIndex : 0,//左右轴
			data : dataMap.powerList[i]
		});
		
		legend.push(dataMap.nameList[i][0]);
		
	}
	
	/**
	 * 如果有重复的客户名称则添加 空格
	 */
	if(legend.length > 1){
		var s = legend.join(",")+",";
		for(var i = 0,b="";i < legend.length;i++){
			// 判断该集合中是否有重复的值 true表示有重复
			if(s.replace(legend[i]+",", "").indexOf(legend[i]+",")-1) {
				// 递增，legend每次的值不能重复，不然显示不到
				// legend中的值要和series[i].name的值一毛一样
				b += " ";
				legend[i] = legend[i]+b;
				series[i].name = series[i].name+b;
			}
		}
	}
	
	option = {
			 title: {
			        text: '电量电费分析', 
			        x:'center'
			},
			tooltip: {
		        trigger: 'axis',
	        	formatter : function(params, ticket, callback) {
	        		var res = '';
	        		if(params == null ||params[0] == null){
						return;
					}
					for(var i =0;i<params.length;i++){
						
						if (i == 0) {
							res = "时间：" + params[i].name + '<br/>';
						}
						res += params[i].seriesName + ' : ' + params[i].value + 'kWh<br/>';
					}
					return res;
				}
		    },
		    legend: {
		        data: legend,
		        x:'center',
		        y:'30'
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
				 x : 80, //左边距离
				 y : 110,//上边距离
				 x2 : 35,//右边距离
				 y2 : 35//下边距离
			 },
		    xAxis:  {
		        type: 'category',
		        data : dataMap.dataDate
		        
		    },
		    yAxis: [
		        {
		            name: '总电量(kWh)',
		            type: 'value',
		        },
		    ],
		    series: series
		};
	
		fgdlChart.setOption(option,true);
		fgdlChart.resize();
}

/**
 * 窗口大小改变 内部的相应改变大小
 */
function userResize(){
	if(fgdlChart!=''){
		fgdlChart.resize();
	}
}

/**
 * 峰谷电量 数据列表
 * 
 */
function queryData(){
	var	gridCommon = [[
	   	{field:'consNo',title:'客户编号',width: '9%',rowspan:2,align:'center'},
 		{field:'consName',title:'客户名称',width: '9%',rowspan:2,align:'center'},
 		{field:'sumzdl',title:'总电量(kWh)',width: '9%',rowspan:2,align:'center'},
 		{field:'df',title:'电费',width: '38%',colspan:4,align:'center'},
 		{field:'sumfdl',title:'峰电量(kWh)',width: '9%',rowspan:2,align:'center'},
 		{field:'sumpdl',title:'平电量(kWh)',width: '9%',rowspan:2,align:'center'},
 		{field:'sumgdl',title:'谷电量(kWh)',width: '9%',rowspan:2,align:'center'},
 		{field:'sumjdl',title:'尖电量(kWh)',width: '9%',rowspan:2,align:'center'},
 		],
 		[
 		 	{field:'sumzdf',title:'总电费(元)',width:'9%',align:'center'},
			{field:'baseAmt',title:'基本电费(元)',width:'9%',align:'center'},
			{field:'kwhAmt',title:'电度电费(元)',width:'9%',align:'center'},
			{field:'ltAmt',title:'力调电费(元)',width:'9%',align:'center'},
		]
	];
	  
	$('#fgdlData').datagrid({// 表格
		title:'',
		nowrap : true,// 设置为true，当数据长度超出列宽时将会自动截取。
		striped : true,// 设置为true将交替显示行背景。
		border:false,
		width:'100%',
	    height:'100%',
		fitColumns : true,// 自动适应宽度
		singleSelect : true,// 设置为true将只允许选择一行。
		rownumbers : true,// 设置为true将显示行数
        pagination : false,// 设置true将在数据表格底部显示分页工具栏
		loadMsg : "正在努力的读取数据中...",// 提示信息
		columns : gridCommon
	});
	//获取日期
	fgdlEDate = $('#fgdlEDateY').val();
	
	var consIdStr = '';
	
//	if($('#tt').length > 0){
//		var nodes = $('#tt').tree('getChecked');//获取勾选的节点数据
//		if(nodes.length ==  0){
//			$.messager.alert('提示', "至少选择一个", 'warning');
//			return;
//		}else if(nodes.length > 6){
//			$.messager.alert('提示', "不能大于6个企业", 'warning');
//			return;
//		}
//		
//		for(var i = 0;i<nodes.length;i++){
//			if(i != 0){
//				consIdStr += ',' + nodes[i].id;
//			}else{
//				consIdStr += nodes[i].id;
//			}
//		}
	if(consSelectCons.length > 0){
		for(var i = 0;i<consSelectCons.length;i++){
			if(i != 0){
				consIdStr += ',' + consSelectCons[i].id;
			}else{
				consIdStr += consSelectCons[i].id;
			}
		}
	}else{
		consIdStr = consId;
	}
	if(consIdStr == '') return;
	
	$.post(webContextRoot +'powerChargeAnalyze/querydlddffxbg.action',{
    	'consPowerInfoModel.consIdStr': consIdStr,
        'consPowerInfoModel.startDate':fgdlEDate,
        'consPowerInfoModel.endDate':fgdlEDate,
        'consPowerInfoModel.queryType': 'Y'
     },
     function(data){
    	$('#fgdlData').datagrid("loaded");//loading画面关闭
	   	$('#fgdlData').datagrid('loadData', data);//加载数据
   		if(data.length>0){
	   		$('#fgdlData').datagrid('loadData', data.slice(0,10));//加载0到10的数据
   		}
		var pager = $('#fgdlData').datagrid("getPager");
		pager.pagination({
			total:data.length,
			pageSize:10,//每页记录数
			pageList: [10,20,30],//可以设置每页记录条数的列表  
			beforePageText:'第',
			afterPageText:'页 共 {pages} 页',
			displayMsg:'当前显示 {from} - {to} 条记录,共 {total} 条记录',
			onSelectPage:function(pageNo,pageSize){
				var start = (pageNo-1)*pageSize;//计算分页数据开始
				var end = start+ pageSize;//计算分页数据结束
				$('#fgdlData').datagrid('loadData',data.slice(start,end));//分页加载每页条目
				pager.pagination('refresh',{
					total:data.length,//总记录条数
					pageNumber:pageNo//页面
				});
			}
		});	
     },'json');
	
}

/**
 * 树查询
 * @param nodeId
 */
function selectTree(nodeId){
	var n = $('#tt').tree('getChecked');//获取勾选的节点数据
	if(n!=null)//判断节点是否存在
	{
		$('#tt').tree('select',n.target);
	}
	var chiNode = $('#tt').tree('getChildren',n.target);//子节点
	for(var i=0 ; i < chiNode.length ; i++)//循环节点
    {
		if(nodeId!=null?chiNode[i].id==nodeId:chiNode[i].type==1)//查找定位
		 {
			var n = $('#tt').tree("find",chiNode[i].id);//根据id获取节点
       	   	$('#tt').tree('check',n.target);//选中节点
       	    $('#tt').tree('scrollTo',n.target);//滚动到节点
       	    consId = chiNode[i].id;
       	    consName = chiNode[i].text;
       	    //查询电量分析
       	    queryFgdl();
       	   	break;//跳出循环
		 }
    }
}

/**
 * 查询
 */
function changefgdl(){
	queryFgdl();
}



