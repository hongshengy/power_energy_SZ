/**
 * 响应效果评估
 * @author 王国际
 * @since 2017-05-10
 */
var myChart = '';
var dataType = '1';//1 用户  2 区域
var currentDate = new Date();//当前时间
var pageSize = 20;
var queryDate;

//初始化方法
$(function(){
	myChart = echarts.init(document.getElementById('userChart'));//初始化chart
	$('#startDate').val(DateUtil.dateToStr('yyyy-MM-dd',currentDate));
	
	if(consId==null || consId==''|| consId=="null"){//未获取到企业编码，加载左侧树
	  
		/*$('#tree-leftQyTree').tree({ //默认没参数，获取区域  企业  都是打开状态
			// modeType=12，过滤含有方案下发的客户
			url:webContextRoot +'destree/queryTree.action?modeType=12',
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
					dataType = node.type=="0"?"2":"1";
					getTime();
					getData();//数据查询
					getGridData();
		    	}else{
		    		$.messager.alert('提示', '请选择客户', 'warning');
		    	}
			},
			onLoadSuccess:function(node, data){//加载成功返回
				selectTree();//设置树默认选中节点
			}
		});
        //树模糊检索   方法来自  treeSelect.js
		searchTreeNode();*/
		
		//设置选择客户后执行的方法
		consSelectMethod = "consSelectMethodLoad()";//定义选中后执行的方法
		consSelectHasRoot = false;//是否有区域能源根节点
		consSelectSearch("",true);
		
	}else{
		getTime();
//		getData();//数据查询
//		getGridData();
	}
	
	/* //左减日期
	$('#left').click(function(){
		var startDate =  $('#startDate').val();//获取当前开始日期
		var nowDate = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('d',-1,DateUtil.strToDate(startDate+'-01-01')));//日减1
		$('#startDate').val(nowDate);//重新赋值
		getData();//查询数据
		getGridData();
	});
	
	 //右加日期
	$('#right').click(function(){
		var startDate =  $('#startDate').val();//开始日期
		var nowDate = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('d',1,DateUtil.strToDate(startDate+'-01-01')));//日加1
		$('#startDate').val(nowDate);//重新赋值
		getData();//查询数据
		getGridData();
	});*/
	
	 //查询事件
	$('#search').click(function(){
		getData();//查询数据
		getGridData();
	});
});
 
/**
 * 设置选择客户后执行的方法
 */
function consSelectMethodLoad(){
	if(consSelectCon.id.length < 4){	// 区域能源节点
		$.messager.alert('提示', '请选择客户', 'warning');
	}else{		// 企业节点
		consId = consSelectCon.id;				// 把树节点id赋给企业id
		consName = consSelectCon.text;			// 把树节点的值赋给企业名称
		
		getTime();
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
		$.messager.alert('提示', '尚不存在参加需求响应的客户', 'warning');
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
		       	    getTime();
//		       	    getData();//数据查询
//		       	    getGridData();
		       	   	break;//跳出循环
			 }
	    }
	}
}

/**
 * 查询时间下拉框
 */
function getTime(){
	$.post(webContextRoot +'xyxgpg/queryXyxgpgTime.action',
			{
    			'chargeAnlysisModel.consId': consId
			},
	     function(data){
			$('#sbType').combobox({
				width: 150,
				panelWidth: null,
				data:data,
				valueField: 'dataDate',
				textField: 'dataDate',
				editable: false,
				onLoadSuccess:function(){
					var sbData = $(this).combobox("getData");
					if(sbData.length>0){
						$('#sbType').combobox('select',sbData[0].dataDate);
						queryDate = sbData[0].dataDate;
						/*getData();//数据查询
			       	    getGridData();*/
					}else{
						$('#sbType').combobox('select','');
						queryDate = '';
						getData();//数据查询
						getGridData();
					}
				},
				onSelect:function(data){
					date = data.dataDate;
					queryDate = data.dataDate;
					getData();//数据查询
		       	    getGridData();
				}
			});
				
	     },'json');
}
  
//未选择大用户    根据日期查询所有
function getData(){
	
	myChart.showLoading({
		text:'正在努力的读取数据中...',
		effect:'spin'
	});
	$.getJSON(webContextRoot + 'xyxgpg/queryfhyc.action', 
		{ 
		   //请求参数
		   'chargeAnlysisModel.consId': consId,//客户或者区域编码
		   'chargeAnlysisModel.dateType': dataType,//1 用户  2 区域
		   'chargeAnlysisModel.beginData': queryDate//开始时间
		},
		function(json){
			getxyxgpgChart(json);//echarts曲线图
		    myChart.hideLoading();//隐藏提示框
		}
	);
}

//获取响应效果评估DataGrid
function getGridData(){
	//获取页面日期值
	var b = $('#dataDate').val();
	//定义页面dataGrid的Colums列字段。
	var colums = [[
		{field:'resDate',title:'响应日期',width:'15%',align:'center'},
		{field:'respSource',title:'响应来源',width:'30%',align:'center'},
		{field:'seTime',title:'响应时段',width:'25%',align:'center'},
		{field:'timeValue',title:'邀约响应量',width:'15%',align:'center'},
		{field:'respSJValue',title:'实际响应量',width:'15%',align:'center'}
	]];
	
	//初始化响应指标dataGrid表格
	$('#dataGrid').datagrid({// 表格
		nowrap : false,// 设置为true，当数据长度超出列宽时将会自动截取。
		striped : true,// 设置为true将交替显示行背景。
		border:false,
		fit:true,
	    tools:"#btThrees",
		pagination : true,// 设置true将在数据表格底部显示分页工具栏。
		fitColumns : true,// 自动适应宽度
		singleSelect : true,// 设置为true将只允许选择一行。
		rownumbers : true,// 设置为true将显示行数。
		pageNumber:1,//在设置分页属性的时候初始化页码。
		pageSize:pageSize,//在设置分页属性的时候初始化页面大小。
		url:webContextRoot +'xyxgpg/queryfhycDataGrid.action',
		queryParams:{
			'chargeAnlysisModel.consId' : consId,
			'chargeAnlysisModel.beginData': queryDate//开始时间
		},
		onLoadSuccess : function() {// 加载数据之后
			$('#dataGrid').datagrid('selectRow', 0); // 选择第一行
		},
		loadMsg : "正在努力的读取数据中...",// 提示信息
		columns : colums,
		loadFilter: function(data){
			if (data.sMap){
				return data.sMap;
			} else {
				return data;
			}
		}
	});
	
	
	var pager = $('#dataGrid').datagrid("getPager");
	pager.pagination({
		onChangePageSize:function(size){
			pageSize = size;
		}
	});
	
	/*
	$.getJSON(webContextRoot + 'xyxgpg/queryfhyc.action', 
		{ 
		   //请求参数
		   'chargeAnlysisModel.consId': consId,//客户或者区域编码
		   'chargeAnlysisModel.dateType': dataType,//1 用户  2 区域
		   'chargeAnlysisModel.beginData': $('#startDate').val()//开始时间
		},
		function(json){
			getxyxgpgChart(json);//echarts曲线图
		    myChart.hideLoading();//隐藏提示框
		}
	);*/
}


//echarts曲线图
function getxyxgpgChart(dataMap){
	var series = [];//图标曲线集
	var legend = ['预测负荷','负荷','基线负荷(近30日平均负荷)','邀约响应(基线负荷-邀约响应量)'];
	 
	series.push( {
        name: '预测负荷',
        type: 'line',
        data:dataMap.sMap.fhycData//数据,
    },{
        name: '负荷',
        type: 'line',
        data:dataMap.sMap.fhData//数据,
    },{
        name: '基线负荷(近30日平均负荷)',
        type: 'line',
        data:dataMap.sMap.fhjxData//数据,
    },
    {
        name: '邀约响应(基线负荷-邀约响应量)',
        type: 'line',
        data:dataMap.sMap.xyData//数据,
    }
    );
	 
	var option = {
	    title: {
	    	 text: consName+'响应效果评估',
	        y: '0px',
	        left: 'center'
	    },
	    tooltip: {
	    	trigger: 'axis',
	    	formatter: function(params) {
	    		var paramResult = '';
	    		if(params != null && params.length > 0){
	    			 paramResult = params[0].name + '<br/>';
	    		}
	    		
	    		for(var i=0;i<params.length;i++){
	    			paramResult += params[i].seriesName.split('(')[0]+':'+params[i].value+' kW'+ '<br/>';
	    		}
	    		return paramResult;
	    	}
	    },
	    legend: {
	        left: 'center',
	        data: legend,
	        shown:false,
	        y:'25'
	    },
	    grid : {
 			 x : 75, //左边距离
 			 y : 55,//上边距离
 			 x2 : 25,//右边距离
 			 y2 : 35//下边距离
 		},
	    xAxis: {
	    	  type: 'category',
	          boundaryGap: false,
	          data:dataMap.sMap.categes
	          },
	    yAxis: {
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
	            min:'auto',
	            max:'auto'
	    },
	    series: series
	        
	};
    myChart.setOption(option,true);
}

