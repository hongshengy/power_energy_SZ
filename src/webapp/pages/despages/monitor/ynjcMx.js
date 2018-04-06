/**
 * 母线
 * @author 吴翔
 * @since 2017-04-19
 */
myChart = '';//线电压chart图
xiangChart= '';//相电压chart图
var startDate = new Date(); // 当前开始时间 为当前时间往前推一年
//startDate.setFullYear(2017,10,21);
var endDate = new Date();//当前结束时间  为当前时间
isfistAdd=true;//线电压初始化
isfistAdd1=true;//相电压初始化
var zxbmId=88;//当前选中的母线编码
var zxbmName='';//当前选中的母线name
var startSize='';//288、1440点选择

//var abUpColor = changeRGB('#EED1D0');
//var abDownColor = changeRGB('#D0D4D7');
//var aUpColor = changeRGB('#EED1D0');
//var aDownColor = changeRGB('#D0D4D7');
var abUpColor = '#ff8080';
var abDownColor = '#808080';
var aUpColor = '#ff8080';
var aDownColor = '#808080';

//function changeRGB(color){
//	var a = color.substr(1,2);
//	var b = color.substr(3,2);
//	var c = color.substr(5,2);
//	return 'rgb('+parseInt(a,16)+','+parseInt(b,16)+','+parseInt(c,16)+')';
//}


$(function(){
	$.ajax({	
		url:webContextRoot+'colorConfig/selectColorConfig.action?func=mxdy', 
		dataType:'json',
		type:'post',
		success:function(result){
			abUpColor = result[0].COLOR.toLocaleUpperCase();
			abDownColor = result[1].COLOR.toLocaleUpperCase();
			aUpColor = result[2].COLOR.toLocaleUpperCase();
			aDownColor = result[3].COLOR.toLocaleUpperCase();
		}
	});

	$('#startDate').val(DateUtil.dateToStr('yyyy-MM-dd',startDate));
	
	if(consId==null || consId==''|| consId=="null"){//未获取到企业编码，加载左侧树
		
//	$('#tree-leftQyTree').tree({ //默认没参数，获取区域  企业  都是打开状态
//		// modeType=2，过滤含有变压器的客户
//		url:webContextRoot +'destree/queryTree.action?modeType=2',
//	    method:'get',
//	    multiple:false,//是否支持多选
//	    editable:'true',
//	    onClick: function(node){//点击树触发
//	    	// 获取根节点
//	    	var rootNode = $('#tree-leftQyTree').tree('getRoot',node.target);
//	    	// 不是根节点时，刷新页面
//	    	if(rootNode.id != node.id){
//				consId = node.id;
//				consName = node.text;
//				getsearchmc();//下拉框加载和选择
//				queryUserFiles();//查询客户档案
//	    	}else{
//	    		$.messager.alert('提示', '请选择客户', 'warning');
//	    	}
//		}, 
//		onLoadSuccess:function(node, data){//加载成功返回
//	    	
//			selectTree();//设置树默认选中节点
//		}
//	});
//	searchTreeNode();
		
		//设置选择客户后执行的方法
		 consSelectMethod = "consSelectMethodLoad()";
		 consSelectHasRoot = false;
		 consSelectSearch("",true);
	}else{
		queryUserFiles();//查询客户档案
   	    getsearchmc();//下拉框加载和选择
	}

	 //查询事件
	$('#search').click(function(){
		getData(zxbmName);//获取数据
	});
	
	 //左减日期
	$('#left').click(function(){
		var startDate =  $('#startDate').val();//开始日期
		var nowDate = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('d',-1,DateUtil.strToDate(startDate)));
		$('#startDate').val(nowDate);
		getData(zxbmName);//获取数据
	});
	
	 //右加日期
	$('#right').click(function(){
		var startDate =  $('#startDate').val();//开始日期
		var nowDate = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('d',1,DateUtil.strToDate(startDate)));
		$('#startDate').val(nowDate);
		getData(zxbmName);//获取数据
	});
});

function consSelectMethodLoad(){
	consId = consSelectCon.id;
	queryUserFiles();//查询客户档案
    getsearchmc();//下拉框加载和选择
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
		$.messager.alert('提示', '请先给客户添加母线', 'warning');
	} else {
		for(var i=0 ; i < chiNode.length ; i++)//循环节点
	    {
			 if(nodeId!=null?chiNode[i].id==nodeId:chiNode[i].type==1)//查找定位
			  {
					var n = $('#tree-leftQyTree').tree("find",chiNode[i].id);//根据id获取节点
		       	   	$('#tree-leftQyTree').tree('select',n.target);//选中节点
		       	   	$('#tree-leftQyTree').tree('scrollTo',n.target);//滚动到节点
		       	    consId = chiNode[i].id;//客户id
		       	    consName = chiNode[i].text;//客户名称
		       	    queryUserFiles();//查询客户档案
		       	    getsearchmc();//下拉框加载和选择
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
		  if(json[0].statusCode=="1"){//1是正产给用户
			  checkFlagObj.innerHTML = checkFlagName+'正常用户';
			  $('#khzt').attr("title",'正常用户');
		  }else if(json[0].statusCode=="2"){//2是已注销
			  checkFlagObj.innerHTML = checkFlagName+'已注销';
			  $('#khzt').attr("title",'已注销');
		  }
	  });
}

function getsearchmc(){
	 //下拉框加载和选择
		$('#searchmc').combobox({
			url:webContextRoot +'bsVoltageMonitor/queryTmnlBSInfo.action?consId='+consId,
			valueField: 'bsId',//母线id
			textField: 'bsName',//母线名称
			onLoadSuccess: function(newValue, oldValue){//加载成功返回
				if(newValue.length>0){//下拉框有值返回
					zxbmId = newValue[0].bsId;
					zxbmName = newValue[0].bsName;
					$('#searchmc').combobox('setValue', newValue[0].bsId);//下拉框显示设备
				}else{//下拉框没有值返回
					zxbmId = '';
					zxbmName = '';
					$('#searchmc').combobox('setValue', '');//下拉框显示空
				}				
				getData(zxbmName);//获取数据
			},onSelect:function(data){//下拉框设备选择返回
				zxbmId = data.bsId;
				zxbmName = data.bsName;
				getData(zxbmName);//获取数据
			}
		}); 
}


//未选择用户和母线    根据日期查询所有
function getData(title){
	if(zxbmId=='101000015915'){
		zxbmId = '101000001898';
	}else if(zxbmId=='101000033455'){
		zxbmId = '101000001898';
	}else if(zxbmId=='101000033457'){
		zxbmId = '101000001899';
	}else if(zxbmId=='101000036176'){
		zxbmId = '101000001898';
	}
	
	startDate =  $('#startDate').val();//开始日期
	startSize = $('#station').val();//时间点选择
	
	//初始化
	if(isfistAdd==true){
		myChart = echarts.init(document.getElementById('userChart'));
		isfistAdd=false;
	}
	myChart.showLoading({
		text:'正在努力的读取数据中...',
		effect:'spin'
	});
	
	//初始化
	if(isfistAdd1==true){
		xiangChart = echarts.init(document.getElementById('userChart1'));
		isfistAdd1=false;
	}
	xiangChart.showLoading({
		text:'正在努力的读取数据中...',
		effect:'spin'
	});
	
	$.getJSON(webContextRoot + 'bsVoltageMonitor/queryTmnlBSdyInfo.action', 
		{ 
		   //请求参数
			'bSdyModel.date': startDate,//查询时间
			'bSdyModel.startSize': startSize,//显示点数
			'bSdyModel.lineId': zxbmId//母线编码
		},
		function(json){
			//查询线电压上下线越限次数
			$('#avgCrABsx').text(parseInt(json.absxcs));
			$('#avgCrABxx').text(parseInt(json.abxxcs));
			$('#avgCrBCsx').text(parseInt(json.bcsxcs));
			$('#avgCrBCxx').text(parseInt(json.bcxxcs));
			$('#avgCrCAsx').text(parseInt(json.casxcs));
			$('#avgCrCAxx').text(parseInt(json.caxxcs));
			
			//查询相电压上下线越限次数
			$('#avgCrAsx').text(parseInt(json.asxcs));
			$('#avgCrAxx').text(parseInt(json.axxcs));
			$('#avgCrBsx').text(parseInt(json.bsxcs));
			$('#avgCrBxx').text(parseInt(json.bxxcs));
			$('#avgCrCsx').text(parseInt(json.csxcs));
			$('#avgCrCxx').text(parseInt(json.cxxcs));
			
			//上线越限告警信息展示
			if(json.absxcs==0 && json.bcsxcs==0 && json.casxcs==0 && json.asxcs==0 && json.bsxcs==0 && json.csxcs==0){
				$('#sxstr').hide();
			}
			//下线越限告警信息展示
			if(json.abxxcs==0 && json.bcxxcs==0 && json.caxxcs==0 && json.axxcs==0 && json.bxxcs==0 && json.cxxcs==0){
				$('#xxstr').hide();
			}
			
	       //查询线电压echarts图
			getLineData(json,title);
		   //查询相电压echarts图
		    getXiangData(json);
		    
		});
}


//线电压展示图
function getLineData(dataMap,title){
	
	var gy_val = 0;
    var dy_val = 0;
    if(dataMap.content5.length != 0){
    	gy_val = dataMap.content5*1.07;
    	dy_val = dataMap.content5*0.93;
    }else{
    	gy_val = 30;
    	dy_val = 40;
    }
    
	option = {
		    title: {
		    	text: consName+'母线电压曲线 '+title,//标题展示
		        subtext: '',
		        x: 'center'//标题位置
		    },
		    legend:{
		    	data:['AB线电压','BC线电压','CA线电压'],
		    	show:true,
		    	y:'30px'
		    },
		    tooltip : {
		    	trigger: 'axis', // tip 类型
				formatter : function(params, ticket, callback) {
					if(params == null ||params[0] == null){
						return;
					}
					var res = params[0].name;
					var len = params.length;
					
					for(var i =0;i<len;i++){
						res = res + '<br/>'+ params[i].seriesName+':'+ params[i].value+'V'; 
					}
					return res;
				}
			},
			toolbox:{
				left :'center',
				show:false,
				feature:{
					dataZoom:{
						yAxisIndex:'none'
					},
					restore:{},
					saveAsImage:{}
				}
			},
			dataZoom:[{
				startValue:'00:00'
			},{
				type:'inside'
			}],
			grid:{
		    	left: '3%',
		        containLabel: true
		    },
		    xAxis: {
		    	type: 'category',
			    boundaryGap: false,
		        data : dataMap.categes
		    },
		    yAxis: {
		    	name : '单位(V)',
		    	splitLine:{
		    		show:false
		    	}
	        },
	        visualMap:{
	        	top:10,
	        	right:10,
	        	/*show:false,
	        	dimension:0,*/
	        	pieces:[
	        	{
	        		gt: 0,
	        		lte: dy_val,
	        		color: abDownColor
	        	},{
	        		gt: dy_val,
	        		lte: gy_val,
	        		color: '#6BEB6E'
	        	},{
	        		gt: gy_val,
	        		color: abUpColor
	        	}
	        	]
	        },
		    series: [{
		    	name:'AB线电压',
	            type:'line',
	            data : dataMap.tabData,
	            markLine:{
	            	silent:true,
	            	data:[{
	            		yAxis:Number(dy_val),
	            		lineStyle: {
			                normal: {
			                    type : 'solid',
			                    color: abDownColor
			                }
			            }
	            	},{
	            		yAxis:Number(gy_val),
	            		lineStyle: {
			                normal: {
			                    type : 'solid',
			                    color: abUpColor
			                }
			            }
	            	}]
	            }
	          
		    }
		    ,{
		    	name:'BC线电压',
	            type:'line',
	            data : dataMap.tbcData,
	            markLine:{
	            	silent:true,
	            	data:[{
	            		yAxis:Number(dy_val),
	            		lineStyle: {
			                normal: {
			                    type : 'solid',
			                    color: abDownColor
			                }
			            }
	            	},{
	            		yAxis:Number(gy_val),
	            		lineStyle: {
			                normal: {
			                    type : 'solid',
			                    color: abUpColor
			                }
			            }
	            	}]
	            }
		    }
		    ,{
		    	name:'CA线电压',
	            type:'line',
	            data : dataMap.tcaData,
	            markLine:{
	            	silent:true,
	            	data:[{
	            		yAxis:Number(dy_val),
	            		lineStyle: {
			                normal: {
			                    type : 'solid',
			                    color: abDownColor
			                }
			            }
	            	},{
	            		yAxis:Number(gy_val),
	            		lineStyle: {
			                normal: {
			                    type : 'solid',
			                    color: abUpColor
			                }
			            }
	            	}]
	            }
		    }
		    ]
		};
	
	myChart.setOption(option,true);
	myChart.hideLoading();
//	userResize();
	
	/*
	
	var option = {
		    title : {
		        text: consName+'母线电压曲线 '+title,//标题展示
		        subtext: '',
		        x: 'center'//标题位置
		    },
		    tooltip : {//鼠标悬停展示信息
		        trigger: 'axis',
		        formatter: function(params)
		        {
		        	if(params.length==undefined)
		        		{
		        		if (params.seriesIndex>1)
		        			{
		        				return params[0].seriesName +':'+params[0].value;
		        			}
		        		}
		        	else
		        		{
		        			if(params.length > 2){
		        				var retHtml = '时间:'+params[2].name+'<br/>';
		        				for(var i = 2; i < params.length; i++){
		        					retHtml += params[i].seriesName +':'+(params[i].value==null?'':params[i].value)+'<br/>';
		        				}
		        				return retHtml;
		        			}else{
		        				return ' : ';
		        			}
//		        		return '时间:'+params[2].name+'<br/>'				  //显示时间
//		        		    +params[2].seriesName +':'+(params[2].value==null?'':params[2].value)+'<br/>'//显示AB线电压
//		        			+params[3].seriesName +':'+(params[3].value==null?'':params[3].value)+'<br/>'//显示BC线电压
//		        			+params[4].seriesName +':'+(params[4].value==null?'':params[4].value);		  //显示CA线电压
		        		}
		        }
		    },
		    legend: {//信息项展示
		        data:['AB线电压','BC线电压','CA线电压'],
		        x: 'center',
		      	y:30
		    },
		    
		    //设置grid位置
		 	   grid : {
		 			 x : 55, //左边距离
		 			 y : 55,//上边距离
		 			 x2 : 50,//右边距离
		 			 y2 : 25//下边距离
		 		},
		    dataZoom : {
		        show : false,
		        realtime : true,
		        start : 0,
		        height : 30,
		        y2: 18,
		        end : 100
		    },
		    //x轴坐标信息
		    xAxis : [
		        {
		            type : 'category',
		            data:dataMap.categes
		        }
		    ],
		   //y轴坐标信息
		    yAxis : [
		        {   
		            name : '单位(V)',
		            type : 'value',
		            	scale:'true',
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
		              //高电压阀值markline线展示
		              {
		            	  name:'高电压阀值',
				          type:'line',
				            data:[dataMap.content5*1.07],//高电压阀值markline线值设置
				            itemStyle:{
				            	normal:{opacity:0}
				            },
				            markLine: {
				            	
				            	symbolSize:[0,0],
				            	lineStyle:{
					            	normal:{color:abUpColor,type:'solid',opacity:0.4},//线类型和渐变度设置
					            	emephasis:{width:1}
					            },
					            data:[{type:'average'}]//数据类型
				            }
				 },
				    //低电压阀值markline线展示
				 {
	            	  name:'低电压阀值',
			          type:'line',
			            data:[dataMap.content5*0.93],//低电压阀值markline线值设置
			            itemStyle:{
			            	normal:{opacity:0}
			            },
			            markLine: {
			            	symbolSize:[0,0],
			            	lineStyle:{
				            	normal:{color:abDownColor,type:'solid',opacity:0.4},//线类型和渐变度设置
				            	emephasis:{width:1}
				            },
				            data:[{type:'average'}]//数据类型
			            }
			 },
			  //AB线电压数据展示
				 {
			            name:'AB线电压',
			            type:'line',
			            data:dataMap.tabData,		        
			        },
			  //BC线电压数据展示
		        {
		            name:'BC线电压',
		            type:'line',
		            data:dataMap.tbcData,		        
		        },
		      //CA线电压数据展示
			        {
			            name:'CA线电压',
			            type:'line',
			            data:dataMap.tbcData,		        
			        }
		    ]
		};
		myChart.setOption(option,true);
		myChart.hideLoading();*/
	}

//相电压展示图
function getXiangData(dataMap){
	var gy_val = 0;
    var dy_val = 0;
    if(dataMap.content5.length != 0){
    	gy_val = dataMap.content5*0.62;
    	dy_val = dataMap.content5*0.54;
    }else{
    	gy_val = 30;
    	dy_val = 40;
    }
    
	option = {
		    legend:{
		    	data:['A相电压','B相电压','C相电压'],
		    	show:true,
		    	y:'30px'
		    },
		    tooltip : {
		    	trigger: 'axis', // tip 类型
				formatter : function(params, ticket, callback) {
					if(params == null ||params[0] == null){
						return;
					}
					var res = params[0].name;
					var len = params.length;
					
					for(var i =0;i<len;i++){
						res = res + '<br/>'+ params[i].seriesName+':'+ params[i].value+'V'; 
					}
					return res;
				}
			},
			toolbox:{
				left :'center',
				show:false,
				feature:{
					dataZoom:{
						yAxisIndex:'none'
					},
					restore:{},
					saveAsImage:{}
				}
			},
			dataZoom:[{
				startValue:'00:00'
			},{
				type:'inside'
			}],
			grid:{
		    	left: '3%',
		        containLabel: true
		    },
		    xAxis: {
		    	type: 'category',
			    boundaryGap: false,
		        data : dataMap.categes
		    },
		    yAxis: {
		    	name : '单位(V)',
		    	splitLine:{
		    		show:false
		    	}
	        },
	        visualMap:{
	        	top:10,
	        	right:10,
	        	/*show:false,
	        	dimension:0,*/
	        	pieces:[
	        	{
	        		gt: 0,
	        		lte: dy_val,
	        		color: aDownColor
	        	},{
	        		gt: dy_val,
	        		lte: gy_val,
	        		color: '#6BEB6E'
	        	},{
	        		gt: gy_val,
	        		color: aUpColor
	        	}
	        	]
	        },
		    series: [{
		    	name:'A相电压',
	            type:'line',
	            data : dataMap.taData,
	            markLine:{
	            	silent:true,
	            	data:[{
	            		yAxis:Number(dy_val),
	            		lineStyle: {
			                normal: {
			                    type : 'solid',
			                    color: aDownColor
			                }
			            }
	            	},{
	            		yAxis:Number(gy_val),
	            		lineStyle: {
			                normal: {
			                    type : 'solid',
			                    color: aUpColor
			                }
			            }
	            	}]
	            }
	          
		    }
		    ,{
		    	name:'B相电压',
	            type:'line',
	            data : dataMap.tbData,
	            markLine:{
	            	silent:true,
	            	data:[{
	            		yAxis:Number(dy_val),
	            		lineStyle: {
			                normal: {
			                    type : 'solid',
			                    color: aDownColor
			                }
			            }
	            	},{
	            		yAxis:Number(gy_val),
	            		lineStyle: {
			                normal: {
			                    type : 'solid',
			                    color: aUpColor
			                }
			            }
	            	}]
	            }
		    }
		    ,{
		    	name:'C相电压',
	            type:'line',
	            data : dataMap.tcData,
	            markLine:{
	            	silent:true,
	            	data:[{
	            		yAxis:Number(dy_val),
	            		lineStyle: {
			                normal: {
			                    type : 'solid',
			                    color: aDownColor
			                }
			            }
	            	},{
	            		yAxis:Number(gy_val),
	            		lineStyle: {
			                normal: {
			                    type : 'solid',
			                    color: aUpColor
			                }
			            }
	            	}]
	            }
		    }
		    ]
		};
	
	xiangChart.setOption(option,true);
	xiangChart.hideLoading();
	
	
	/*
	var option = {
			 tooltip : {//鼠标悬停信息展示
			        trigger: 'axis',
			        formatter: function(params1)
			        {
			        	if(params1.length==undefined)
			        		{
			        		if (params1.seriesIndex>1)
			        			{
			        				return params1[0].seriesName +':'+params1[0].value;
			        			}
			        		}
			        	else
			        		{
			        		if(params1.length > 2){
		        				var retHtml = '时间:'+params1[2].name+'<br/>';
		        				for(var i = 2; i < params1.length; i++){
		        					retHtml += params1[i].seriesName +':'+(params1[i].value==null?'':params1[i].value)+'<br/>';
		        				}
		        				return retHtml;
		        			}else{
		        				return ' : ';
		        			}
//			        		return '时间:'+params1[2].name+'<br/>'					//显示时间
//				        		+params1[2].seriesName +':'+(params1[2].value==null?'':params1[2].value)+'<br/>'//显示AB线电压
//			        			+params1[3].seriesName +':'+(params1[3].value==null?'':params1[3].value)+'<br/>'//显示BC线电压
//			        			+params1[4].seriesName +':'+(params1[4].value==null?'':params1[4].value);		  //显示CA线电压
			        		}
			        }
			    },
		    legend: {//数据项信息展示
		        data:['A相电压','B相电压','C相电压'],
		        x: 'center',
		      	y:20
		    },
		    grid: { 
		    	 x : 55, //左边距离
	 			 y : 55,//上边距离
	 			 x2 : 50,//右边距离
	 			 y2 : 25//下边距离
	 			 },
		    dataZoom : {
		        show : false,
		        realtime : true,
		        start : 0,
		        height : 30,
		        y2: 18,
		        end : 100
		    },
		    //x轴坐标信息
		    xAxis : [
		        {
		            type : 'category',
		            data:dataMap.categes
		        }
		    ],
		    //y轴坐标信息
		    yAxis : [
		        {
		            name : '单位(V)',
		            type : 'value',
				        	 scale:'true',
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
		              {//高电压阀值线
		            	  name:'高电压阀值',
				          type:'line',
				            data:[dataMap.content5*0.62],//阀值线计算
				            itemStyle:{
				            	normal:{opacity:0}
				            },
				            markLine: {
				            	symbolSize:[0,0],
				            	lineStyle:{
					            	normal:{color:aUpColor,type:'solid',opacity:0.4},//线类型和渐变度设置
					            	emephasis:{width:1}//线宽
					            },
					            data:[{type:'average'}]//数据类型
				            }
				 },
				 {//低电压阀值线
	            	  name:'低电压阀值',
			          type:'line',
			            data:[dataMap.content5*0.54],//阀值线计算
			            itemStyle:{
			            	normal:{opacity:0}
			            },
			            markLine: {
			            	symbolSize:[0,0],
			            	lineStyle:{
				            	normal:{color:aDownColor,type:'solid',opacity:0.4},//线类型和渐变度设置
				            	emephasis:{width:1}//线宽
				            },
				            data:[{type:'average'}]//数据类型
			            }
			 },
			//A相电压数据展示
			 {
		            name:'A相电压',
		            type:'line',
		            data:dataMap.taData,		        
		      },
		    //B相电压数据展示
		      {
	            name:'B相电压',
	            type:'line',
	            data:dataMap.tbData,		        
	        },
	        //C相电压数据展示
	        {
	            name:'C相电压',
	            type:'line',
	            data:dataMap.tcData,		        
	         }
		    ]
		};
		xiangChart.setOption(option,true);
		xiangChart.hideLoading();*/
}

//选择日期自动查询
function changedate(){
	getData(zxbmName);
}

