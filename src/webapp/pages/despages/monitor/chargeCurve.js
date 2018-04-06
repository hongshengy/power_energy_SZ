/**
 * 电费超容负荷
 * @author 王梓璇
 * @since 2017-04-17
 */
myChart = '';
var currentdate = new Date(); //当前日期
var startDate = new Date(); // 当前开始时间 为当前时间往前推一年
var endDate = new Date();//当前结束时间  为当前时间
groupDateType = 'yyyy-MM';//日期类型
var dataType;
var currentMonth = DateUtil.dateToStr('yyyy-MM',currentdate);//当月
//var consName ='';//选择树的企业名称
//var consId = '';//选择树的企业id
var dataDiffer = 3;//日期差  默认为三天（显示为96点）
//使整个窗体进行适配
function userResize(widths,heights){
	$("#userChart").width($("#userChart").parent().width());
	$("#userChart").height($("#userChart").parent().height());
	
	if(!!myChart){
		myChart.resize({
		    width: $("#userChart").parent().width(),
		    height: $("#userChart").parent().height()
		});
	}
}
//js入口
$(function(){
	myChart = echarts.init(document.getElementById('userChart'));//echarts的初始化
	myChart.on('click', function (params) {//echarts的点击事件
		if(params.seriesIndex != 0){//判断如果不是‘基准线’可点击
			return ;
		}
		//点击事件后:弹出窗体
		var content = "<iframe src='"+webContextRoot+"/pages/despages/monitor/chargePop.jsp?beginData="+params.name+"&endData="+params.name+"&consId="+consId+"&consName="+consName+"' width='100%' height='99%' frameborder='0' scrolling='no'/>";
		var boarddiv = "<div id='msgwindow' title='详情'/>";
		$(document.body).append(boarddiv);
		var win = $("#msgwindow").dialog({
			content : content,
			width : document.body.clientWidth-160,
			height : document.body.clientHeight-160,
			maximizable:true,
			closable:true,
			modal : 'shadow',
			title : consName.replace("有限公司","")+'负荷走势(96点)',
		});
		win.dialog('open');
	    
	});
//	$("#endDate").datebox('setValue',DateUtil.dateToStr('yyyy-MM-dd',endDate));
//	$("#startDate").datebox('setValue',DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('d',-2,endDate)));
	$('#startDate').val(DateUtil.dateToStr('yyyy-MM',endDate));
	
	  if(consId==null || consId==''|| consId=="null"){//未获取到企业编码，加载左侧树
	
	$('#tree-leftQyTree').tree({ //默认没参数，获取区域  企业  都是打开状态
//		url:gdc.webContextRoot +'destree/queryTree.action?isQyCode=false&isAllTreeNode=true&ziMu=',
		url:webContextRoot +'destree/queryTree.action',
	    method:'get',
	    multiple:false,//是否支持多选
	    editable:'true',
	    onClick: function(node){
	    	// 获取根节点
	    	var rootNode = $('#tree-leftQyTree').tree('getRoot',node.target);
	    	// 不是根节点时，刷新页面
	    	if(rootNode.id != node.id){
				consId = node.id;//把树节点id赋给企业id
				consName = node.text;//把树节点的值赋给企业名称
				getNineSixData();//查询echarts图
				queryUserFiles();//查询档案内容
				getCr();//查询超容内容
	    	}else{
	    		$.messager.alert('提示', '请选择客户', 'warning');
	    	}
		},
		onLoadSuccess:function(node, data){
			selectTree(node);//选择树的方法
		}
	});
	 //树模糊检索   方法来自  treeSelect.js
	searchTreeNode();
	  }else{
		  queryUserFiles();//查询上头客户信息
		  getNineSixData();//加载班次下拉
		  getCr();//查询超容内容
	}
	  
	  
	 //查询事件
	$('#search').click(function(){
     //判断是否选择大用户
		getNineSixData();
		getCr();//查询超容内容
	});
	
	 //左减日期
	$('#left').click(function(){
		var startDate =  $('#startDate').val();//获取当前开始日期
		var nowDate = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('m',-1,DateUtil.strToDate(startDate)));//月份减1
		$('#startDate').val(nowDate.substr(0,7));//重新赋值
		getNineSixData();//左减日期进行查询
		getCr();//获取超容信息
	});
	
	 //右加日期
	$('#right').click(function(){
		var startDate =  $('#startDate').val();//开始日期
		var nowDate = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('m',1,DateUtil.strToDate(startDate)));//月份加1
		$('#startDate').val(nowDate.substr(0,7));//重新赋值
		getNineSixData();//右加日期进行查询
		getCr();//获取超容信息
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
          	    consId = chiNode[i].id;//把树节点id赋给企业id
          	    consName = chiNode[i].text;//把树节点的值赋给企业名称
          	    queryUserFiles();//查询档案内容
          	    getNineSixData();//查询echarts图
          	    getCr();//查询超容内容
          	   	break;//跳出循环
		 }
    }
}

//未选择大用户    根据日期查询所有
function getNineSixData(){
	var startDate =  $('#startDate').val();//开始日期
//	DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('d',-2,endDate)))
	var startDateWzx = startDate+"-01";// 开始时间
	var getMonth = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('m',1,DateUtil.strToDate(startDate+"-01")));
	var endDateWzx = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('d',-1,DateUtil.strToDate(getMonth)));// 结束时间
	if(startDate> endDate){
		$.messager.alert('提示', "开始日期不能大于结束日期！", 'warning');
		return;
	}
	myChart.showLoading({
		text:'正在努力的读取数据中...',
		effect:'spin'
	});
	
	//查询echarts图
	  $.get(webContextRoot + 'charge/queryNineSix.action', {
		//请求参数
			'chargeAnlysisModel.beginData': startDateWzx,//开始时间
			'chargeAnlysisModel.endData': endDateWzx,//结束时间
			'chargeAnlysisModel.dateType': 2,//查询类型  2为查询日期格式  
			'chargeAnlysisModel.consId': consId//当前选择的客户
		  },
		  function(json){
			    getGdtjfxData(json);
			    myChart.hideLoading();
		  }
	  );
	
}
//超容次数、 超容时长等等
function getCr(){
	var startDate =  $('#startDate').val();//开始日期
//	var endDate =  $('#endDate').val();//结束日期
//	DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('d',-2,endDate)))
	
	var startDateWzx = startDate+"-01";// 开始时间
	var getMonth = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('m',1,DateUtil.strToDate(startDate+"-01")));
	var endDateWzx = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('d',-1,DateUtil.strToDate(getMonth)));// 结束时间
	if(startDate> endDate){
		$.messager.alert('提示', "开始日期不能大于结束日期！", 'warning');
		return;
	}
	//查询设置时间
	  $.getJSON(webContextRoot + 'charge/queryPowerPlan.action', {
		//请求参数
			'chargeAnlysisModel.beginData': startDateWzx,//开始时间
			'chargeAnlysisModel.endData': endDateWzx,//结束时间
			'chargeAnlysisModel.consId': consId//当前选择的客户
		  },
		  function(json){
			  var consNoObj = document.getElementById('avgCr');
			  consNoObj.innerHTML = json.sMap.outPawer;//超容次数
			  var consNameObj = document.getElementById('maxFZL');
			  consNameObj.innerHTML = json.sMap.outPawerTime;//超容总时长
			  var contractCapObj = document.getElementById('minFZL');
			  contractCapObj.innerHTML = json.sMap.outPawerAvgTime;//平均总时长
			  var elecAddrObj = document.getElementById('avgFZL');
			  elecAddrObj.innerHTML = json.sMap.outPawerMaxTime;//超容最大时长
			  var elecAddrObj = document.getElementById('mindate');
			  elecAddrObj.innerHTML = json.sMap.outPawerMaxBeginTime.substr(5,16);//超容最大时长发生时间
		  }
	  );
}
//查询档案内容
function queryUserFiles(){
	//查询设置时间
	  $.getJSON(webContextRoot + 'charge/queryuserFiles.action', {
		  'sfdConsModel.consId':consId//企业id
	  },
	  function(json){
		  
		  var consNoObj = document.getElementById('consNo');
		  var consNOName = "客户编号: "
		  consNoObj.innerHTML = consNOName+json[0].consNo;
		  $('#consNo').attr("title",json[0].consNo);//区域编码
		  
		  var consNameObj = document.getElementById('consName');
		  var consNameName = "客户名称: "
		  var consNameStr = json[0].consName;
		  consNameObj.innerHTML = consNameName+consNameStr;
		  if(consNameStr.length>10){//如果客户名称长度过长，则截取一部分显示，另一部分手指一动显示
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
		  if(elecAddrNameStr.length>10){//如果用电地址长度过长，则截取一部分显示，另一部分手指一动显示
			  elecAddrObj.innerHTML = elecAddrName+elecAddrNameStr.substring(0,10)+'...';
		  }else{
			  elecAddrObj.innerHTML = elecAddrName+elecAddrNameStr;
		  }
		  $('#address').attr("title",elecAddrNameStr);
		  
		  var checkFlagObj = document.getElementById('khzt');
		  var checkFlagName = "客户状态: "
		  if(json[0].statusCode=="1"){//客户状态如果为1，则为正常用户
			  checkFlagObj.innerHTML = checkFlagName+'正常用户';
			  $('#khzt').attr("title",'正常用户');
		  }else if(json[0].statusCode=="2"){//客户状态如果为1，则为已注销用户
			  checkFlagObj.innerHTML = checkFlagName+'已注销';
			  $('#khzt').attr("title",'已注销');
		  }
		 /* if(json[0].consNo.length>10){
			  $('#consNoCopy').hide();
	    	  $('#consNo').show();
	    	  $('#consNo').text(json[0].consNo.substring(0,10)+'...');
	    	  $('#consNo').attr('title',json[0].consNo);
		  }else{
	    		$('#consNo').hide();
	    		$('#consNoCopy').show();
	    		$('#consNoCopy').text(json[0].consNo);
	    	}
		  if(json[0].consName.length>10){
			  $('#consNameCopy').hide();
	    	  $('#consName').show();
	    	  $('#consName').text(json[0].consName.substring(0,10)+'...');
	    	  $('#consName').attr('title',json[0].consName);
		  }else{
	    		$('#consName').hide();
	    		$('#consNameCopy').show();
	    		$('#consNameCopy').text(json[0].consName);
	    	}
		  if(json[0].contractCap.length>10){
			  $('#htrlCopy').hide();
	    	  $('#htrl').show();
	    	  $('#htrl').text(json[0].contractCap.substring(0,10)+'...');
	    	  $('#htrl').attr('title',json[0].contractCap);
		  }else{
	    		$('#htrl').hide();
	    		$('#htrlCopy').show();
	    		$('#htrlCopy').text(json[0].contractCap);
	    	}
		  if(json[0].elecAddr.length>10){
			  $('#addressCopy').hide();
	    	  $('#address').show();
	    	  $('#address').text(json[0].elecAddr.substring(0,10)+'...');
	    	  $('#address').attr('title',json[0].elecAddr);
		  }else{
	    		$('#address').hide();
	    		$('#addressCopy').show();
	    		$('#addressCopy').text(json[0].elecAddr);
	    	}
		  if(json[0].elecAddr.length>10){
			  $('#addressCopy').hide();
	    	  $('#address').show();
	    	  $('#address').text(json[0].elecAddr.substring(0,10)+'...');
	    	  $('#address').attr('title',json[0].elecAddr);
		  }else{
	    		$('#address').hide();
	    		$('#addressCopy').show();
	    		$('#addressCopy').text(json[0].elecAddr);
	    	}
//		  var consNoObj = document.getElementById('consNo');
//		  var consNOName = "客户编号:"
//		  consNoObj.innerHTML = consNOName+json[0].consNo;//客户编号赋值
		  
//		  var consNameObj = document.getElementById('consName');
//		  var consNameName = "客户名称:"
//		  consNameObj.innerHTML = consNameName+json[0].consName;//客户名称
		  
//		  var contractCapObj = document.getElementById('htrl');
//		  var contractCapName = "合同容量(kVA):"
//		  contractCapObj.innerHTML = contractCapName+json[0].contractCap;//合同容量
//		  
//		  var elecAddrObj = document.getElementById('address');
//		  var elecAddrName = "用电地址:"
//		  elecAddrObj.innerHTML = elecAddrName+json[0].elecAddr;//用电地址
		  
		  var checkFlagObj = document.getElementById('khzt');
			  if(json[0].statusCode=="1"){
				  checkFlagObj.innerHTML = '正常用户';
			  }else if(json[0].statusCode=="2"){
				  checkFlagObj.innerHTML = '已注销'; 
			  }
			  */
	  }
		);
}
//echartsK线图
function getGdtjfxData(dataMap){
	var axis = [];//x轴
	var yxis = [];//y轴
	var klist = dataMap.sMap.kLineData;
	if(klist&&klist.length>0){
		for(var i=0;i<klist.length;i++){
			var temp = [];
			axis.push(klist[i][0].split(",")[0]);
			temp.push(klist[i][0].split(",")[1]=='-'?'-':parseFloat(klist[i][0].split(",")[1]));
			temp.push(klist[i][0].split(",")[2]=='-'?'-':parseFloat(klist[i][0].split(",")[2]));
			temp.push(klist[i][0].split(",")[3]=='-'?'-':parseFloat(klist[i][0].split(",")[3]));
			temp.push(klist[i][0].split(",")[4]=='-'?'-':parseFloat(klist[i][0].split(",")[4]));
			yxis.push(temp);
		}
	}else{
		axis = ['0'];
		yxis = [['','','','']];
	}
	 
	option = {
		    title: {
		        text: consName+'超容分析',
		        left: 'center'
		    },
		    tooltip : {
		        trigger: 'axis', // tip 类型
		        formatter: function (params) {
		        	if(params!=null && params[0]!=null){
			        	var res = params[0].name;
			            res += '<br/>最大值 : ' + params[0].value[1]+' kW';
			            res += '<br/>最大发生时间 : ' + dataMap.sMap.maxDate[params[0].dataIndex];
			            res += '<br/>最小值 : ' + params[0].value[2] + 'kW';
			            res += '<br/>最小发生时间 : ' + dataMap.sMap.minDate[params[0].dataIndex];
			            res += '<br/>点击查看日超容分析曲线' ;
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
		        x: 75,
	           	x2: 70,
	            y: 68,
	            y2: 30
            },
		    legend: {
		        /**数据*/data:['负荷走势']
		    },
//		    toolbox:{
//		    	show:true,
//		    	feature:{
//		    		dataZoom:{},
////		    		dataView:{readOnly:false},
//		    		magicType:{type:['line','bar']},
//		    		restore:{},
//		    		saveAsImage:{}
//		    	}
//		    },
		    xAxis : [
		        {
		            type : 'category',
		            splitLine :{  //分隔线，默认显示
			         	show:false
			        },
		            /**数据*/data : axis
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value',
		            axisLabel : {
						formatter : '{value}'
					},
		            name : '单位(kW)',
	                splitNumber: 3 ,
	                splitLine: {
	                    lineStyle: {
	                        color: '#dfdfdf',
	                        width: 0,
	                        type: 'dashed'
	                    }
	                },
		        }
		    ],
		    series : [
		        {
		            name:'电量曲线',
		            type:'k',
		            barMaxWidth: 20,
		            
		            itemStyle: {
		                normal: {
		                    color: '#37A09D',           // 阳线填充颜色
		                    lineStyle: {
		                        width: 2,
		                        color: '#37A09D'    // 阳线边框颜色
		                    },
		                    borderColor :'#37A09D'
		                },emphasis:{
		                	color:'#37A09D',//阳线填充颜色
		                	borderColor :'#37A09D'
		                }
		            },
		            data:yxis //[[1,3,1,3],[12,15,12,15]]
		        },
		        {
		            name:'基准值',
		            type:'line',
		            data:[dataMap.sMap.plate],
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
						        type: 'average'
//						        label:{normal:{formatter:'{c}kVA'},emphasis:{formatter:'{c}kVA'}}
						   }
		                ]
		            }
		        }
		    ]
	};
	myChart.setOption(option,true);
	
}
//改变日期框里的值
function changeDate(){
	getNineSixData();//查询96点数据
	getCr();//获取超容信息
}
