/**
 * 行业用电
 * @author meng_zijie
 * @since 2017-07-17
 */
//var type = ''; //1上游 2下游
var dataDate = new Date();//当前时间
var myChart = ''; //echart

$(function(){
	//初始化echart
	myChart = echarts.init(document.getElementById('mychart'));
	//设置时间
	$("#dataDate").val(DateUtil.dateToStr('yyyy-MM',DateUtil.dateAdd('m',-1,dataDate)));
	
	$('#up_datagrid').datagrid({    
		loadMsg:'正在加载，请稍等……',//加载时显示提示
		rownumbers:true,
		fit:true,
		fitColumns:true,
		striped: true,
		border : false,
//		singleSelect: true,
//		tools : '#up_buttons',
		columns:[[
            {field:'codeName',title:'行业名称',width:200,align:'center'},
		    {field:'codeValue',title:'行业编码',width:50,align:'center',hidden:true},
		    {field:'energyP',title:'本月用电(kWh)',width:50,align:'center'},
		    {field:'lastMonthEnergyP',title:'上月用电(kWh)',width:50,align:'center'},
		    {field:'lastYearEnergyP',title:'去年同期(kWh)',width:50,align:'center'},
		    {field:'hb',title:'环比',width:50,align:'center'},
		    {field:'tb',title:'同比',width:50,align:'center'}
		]]
	});  
	
	$('#down_datagrid').datagrid({    
		loadMsg:'正在加载，请稍等……',//加载时显示提示
		rownumbers:true,
		fit:true,
		fitColumns:true,
		striped: true,
		border : false,
//		singleSelect: true,
//		tools : '#down_buttons',
		columns:[[
		    {field:'codeName',title:'行业名称',width:200,align:'center'},
		    {field:'codeValue',title:'行业编码',width:50,align:'center',hidden:true},
		    {field:'energyP',title:'本月用电(kWh)',width:50,align:'center'},
		    {field:'lastMonthEnergyP',title:'上月用电(kWh)',width:50,align:'center'},
		    {field:'lastYearEnergyP',title:'去年同期(kWh)',width:50,align:'center'},
		    {field:'hb',title:'环比',width:50,align:'center'},
		    {field:'tb',title:'同比',width:50,align:'center'}
		]]
	});  
	
	
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
//					queryConsInfo();
//					$('#up_datagrid').datagrid('load',{
//						'consId':consId,
//						'type':1
//					});
//					$('#down_datagrid').datagrid('load',{
//						'consId':consId,
//						'type':2
//					});
					loadData();
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
//		queryConsInfo();
//		upAndDownDatagrid();
		loadData();
	}
	
	
	
});	

/**
 * 查询树
 */
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
//	       	    queryConsInfo();
//	       	    upAndDownDatagrid();
	       	    loadData();
	       	   	break;//跳出循环
		 }
    }
}

/**
 * 加载数据
 */
function loadData(){
	queryConsInfo();
	queryConsHYEnergyInfo();
}

/**
 * 查询客户用电信息
 */
function queryConsInfo(){
	myChart.showLoading({
		text:'正在努力的读取数据中...',
		effect:'spin'
	});
	
	$.ajax({	
		url:webContextRoot+'tradeUpAndDown/queryConsEnergyInfo.action',
		data:{
			'consId': consId,
			'time': $("#dataDate").val()
		},
		dataType:'json',
		type:'post',
		success:function(result){
//			console.log(result);
			
			$("#consName").text(result.consName);
			$("#codeName").text(result.codeName);
			$("#energyP").text(result.energyP);
			$("#lastMonthEnergyP").text(result.lastMonthEnergyP);
			$("#lastYearEnergyP").text(result.lastYearEnergyP);
			$("#hb").text(result.hb);
			$("#tb").text(result.tb);
			
			var energyP = result.energyP;
			var otherEnergyP = result.otherEnergyP;
			var pm = '';
			if(result.codeName==null||result.codeName==""){
				pm = "该客户\n未配置\n行业";
				otherEnergyP = 0;
			}else if(result.pm!=null&&result.pm!=""&&result.pm.length>0){
				pm = '用电超过行业内 \n'+result.pm+'%\n企业客户';
				if(consId == '101000012582') pm = '用电超过行业内 \n85%\n企业客户';
			}
			
			option = {
					title : {
				        text: pm,
				        textStyle:{
				        	fontSize:16,
				        	fontWeight:'bolder'
				        },
				        x:'center',
				        y:'center'
				    },
				    tooltip: {
				        trigger: 'item',
				        formatter: "{a} <br/>{b}: {c}(kWh) ({d}%)"
				    },
				    legend: {
				        orient: 'vertical',
				        x: 'left',
				        data:['本企业','其他企业']
				    },
				    series: [
				        {
				            name:'企业用电',
				            type:'pie',
				            radius: ['60%', '80%'],
				            avoidLabelOverlap: false,
				            label: {
				                normal: {
				                    show: false,
				                    position: 'center'
				                },
				                emphasis: {
				                    show: false,
				                    textStyle: {
				                        fontSize: '20',
				                        fontWeight: 'bold'
				                    }
//				                    formatter:'aaa'
				                }
				            },
				            labelLine: {
				                normal: {
				                    show: false
				                }
				            },
				            data:[
				                {value:energyP, name:'本企业'},
				                {value:otherEnergyP, name:'其他企业'}
				            ]
				        }
				    ]
				};
			
			myChart.setOption(option,true);
			myChart.hideLoading();
		}
	});
}

/**
 * 查询客户行业用电信息
 */
function queryConsHYEnergyInfo(){
	$('#up_datagrid').datagrid('loading');  
	$('#down_datagrid').datagrid('loading');  
	
	$.ajax({	
		url:webContextRoot+'tradeUpAndDown/queryConsHYEnergyInfo.action',
		data:{
			'consId': consId,
			'time': $("#dataDate").val()
		},
		dataType:'json',
		type:'post',
		success:function(result){
//			console.log(result);
			$('#up_datagrid').datagrid('loadData',result.up);  
			$('#down_datagrid').datagrid('loadData',result.down);  
			
			$('#up_datagrid').datagrid('loaded');  
			$('#down_datagrid').datagrid('loaded');  
		}
	});
}


/**
 * 设置时间的方法
 * @param dateTime
 */
function qytQueryOveride(dateTime){
	var date = $('#dataDate').val();
	var resultDay = timeUtil(dateTime,date);//DateUtil.dateAdd("d", parseInt(dateTime), DateUtil.strToDate(startDay2));//getDateByOffsetDays(startDay2,dateTime);
	$('#dataDate').val(resultDay.substr(0,7));
	loadData();
}
/**
 * 时间处理的工具类
 * @param dateTime
 * @param startDay
 * @returns {String}
 */
function timeUtil(dateTime,startDay){
	var resultDay = DateUtil.dateAdd("m", parseInt(dateTime), DateUtil.strToDate(startDay));
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


/**
 * 时间查询框 选中事件
 */
function changeDate(){
	loadData();
}