/**
 * 用能分析报告
 * @author meng_zijie
 * @since 2017-06-13
 */
var dataDate = new Date();//当前时间
var myChart;

$(function(){
	//初始化echart
	myChart = echarts.init(document.getElementById('myChart'));
	
//	alert(window.devicePixelRatio);
	/**
	 * 自定义导出方法
	 */
	$.fn.datagrid.methods.exportExcel = function(target,param){
		return target.each(function() {
			var opts = $.data(this, "datagrid").options;
			var data = $.extend({}, opts.queryParams, param.data);
			if (opts.pagination) {
				$.extend(data, {
							page : opts.pageNumber,
							rows : opts.pageSize
						});
			}
			if (opts.sortName) {
				$.extend(data, {
							sort : opts.sortName,
							order : opts.sortOrder
						});
			}
			if (opts.onBeforeLoad.call(this, data) == false) {
				return;
			}
			var str = "";
			str = encodeURI(param.url + str);
			var exportObj = $("#rimp_export");
			if(exportObj && exportObj.length > 0){
				exportObj.attr("src", str);
			}else{
				$("<iframe id='rimp_export' style='display:none' />").appendTo($("body"));
				$("#rimp_export").attr("src", str);
			}
		});
	};
	
	//设置时间
	$("#dataDate").val(DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd("d", -1, dataDate)));
//	$("#dataDate").val("2017-07-12");
	
	if(consId==null || consId==''|| consId=="null"){//未获取到企业编码，加载左侧树
//		$('#tree-leftQyTree').tree({ //默认没参数，获取区域  企业  都是打开状态
//			url:webContextRoot +'destree/queryTree.action?modeType=14',
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
//					loadData();
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
		 consSelectMethod = "consSelectMethodLoad()";
		 consSelectHasRoot = false;
		 consSelectSearch("",true);
	}else{
		loadData();
	}
	
	//导出 
	$("#export").click(function(){
		excelData();
//		$.messager.alert('提示','请先保存！');    
//		return;
//		
//		$.messager.progress({
//			title : '提示',
//			msg : '正在导出中，请稍候……'
//		});     
//		
//		//发送数据url 
//		$('#gridDiv').datagrid("exportExcel", {
//			  url : webContextRoot+'export/exportynbg.action?consId='+consId+'&time='+$("#dataDate").val()
//	   	});
//		$.messager.progress('close');
	});
	
});

function consSelectMethodLoad(){
	consId = consSelectCon.id;				
	consName = consSelectCon.text;	
	loadData();
}

/**
 * 加载文档
 */
function loadData(){
	$.messager.progress({
		title : '提示',
		msg : '正在加载中，请稍候……'
	}); 
	var time = $("#dataDate").val();
	$("#baseInfo_consName").text(consName);
	$.ajax({	
		url:webContextRoot+'export/selectLineEnergyOfDay.action',
		data:{
			'consId': consId,
			'time' : time
		},
		dataType:'json',
		type:'post',
		success:function(result){
			var lineNum = 0;
			var html = '';
			var option = {
				    title: {
						text : '用电走势',
						x:'center'
					},
				    tooltip: {
				        trigger: 'axis',
				        formatter: function(params) {
				    		if(params!=null && params[0]!=null){
				    			var paramResult = "";
				    			for(var i = 0; i < params.length; i++){
				    				paramResult += params[i].seriesName+"："+(params[i].value==null?'':params[i].value) + "kWh<br/>";
				    			}
			    				return paramResult;
				    		}
				    	}
				    },
				    toolbox:{
				    	right: '30',
				    	show:true,
				    	feature:{
				    		dataZoom:{},
				    		magicType:{type:['line','bar']},
				    		restore:{},
				    		saveAsImage:{}
				    	}
				    },
				    grid : {
						left: '3%',
				        right: '4%',
						bottom : '3%',
						containLabel : true
					},
				    legend: {
				        data:[],
				        y:28
				    },
				    xAxis:  {
				        type: 'category',
//				        boundaryGap:false,
				        data: []
				    },
				    yAxis:[{
				            name: '单位(kWh)',
				            type: 'value',
				        }],
				    series: [
//				        {
//				            name:'负荷',
//				            type:'line',
//				            data: y1
//				        }
				    ]
				};
//			var legend = {
//			        data:[],
//			        y:28
//			    };
			if(result.length > 0){
				$("#export").show();//导出按键
				lineNum = result[0].lineNum;
				var colgroup = '';
				for(var i = -1; i < lineNum; i++){
					colgroup += '<col width="'+(100/(parseInt(lineNum)+1))+'%"/>';
				}
				html = '<table class="table"><colgroup>'+colgroup+'</colgroup>';
				for(var i = 0; i < result.length; i++){
					html += '<tr>';
					for(var j = 1; j <= parseInt(lineNum)+1; j++){
						html += '<td>';
						html += eval("result[i].cell" + j);
						html += '</td>';
						
						//echart
						if(i==0&&j!=1){
							option.legend.data.push(eval("result[i].cell" + j));//图例
							option.series.push({
					            name: eval("result[i].cell" + j),
					            type:'bar',
					            data: []
					        });
						}
						if(i > 0 && i < 25){
							if(j==1) option.xAxis.data.push(eval("result[i].cell" + j));//时间
							if(j!=1) option.series[j-2].data.push(eval("result[i].cell" + j));
						}
						
					}
					html += '</tr>';
					
				}
				html += '</table>';
				
				
			}else{
				$("#export").hide();//导出按键
			}
			
			myChart.setOption(option,true);
			
//			$("#baseInfo_consName").text(consName);
			$("#lineTable").html(html);
			$.messager.progress('close');
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
	$('#dataDate').val(resultDay.substr(0,10));
	loadData();
}
/**
 * 时间处理的工具类
 * @param dateTime
 * @param startDay
 * @returns {String}
 */
function timeUtil(dateTime,startDay){
	var resultDay = DateUtil.dateAdd("d", parseInt(dateTime), DateUtil.strToDate(startDay));
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
		       	loadData();
	       	   	break;//跳出循环
		 }
    }
}

/**
 * 时间查询框 选中事件
 */
function changeDate(){
	loadData();
}


/**
*	导出
*/
function excelData(){
 	var flag = DateUtil.dateToStr('yyyy-MM-dd HH:mm:ss',new Date());
 	var date = $('#dataDate').val();
 	//导出地址及参数
 	var url = '';
 	var myChartImg = encodeURIComponent(myChart.getDataURL({
 		type :"png",
 		pixelRatio:4,
 		excludeComponents : ['toolbox']
	}));
	url = webContextRoot+'export/exportLineEnergyOfDay.action?consId='+consId+'&time='+date+'&myChartImg='+myChartImg+'&flag=' + flag; // 进度条标识
	
 	//编码
	url = encodeURI(url);
	
	//导出目标
	new Ext.form.FormPanel({ 
  		html:'<iframe src="'+url+'" width="100%" height="400" frameborder="0" scrolling="auto"></iframe>',
  		labelAlign: 'right', //位置
  		renderTo:'topic-excel',//目标id
  		labelWidth: 100,//宽度
  		frame:true
	});	
	//进度条
	Ext.MessageBox.show({
		title: '数据下载',//标题
		msg: '数据下载中，请耐心等待！',
		progressText: '数据下载中...',//内容
		width: 300,//宽度
		progress: true//进程
	});
	var pert = 0.0;//百分比
	var timer = null;//计时器
	//导出进度条的方法
	function getProgress() {
		if(pert < 0.99){//导出进度
			pert = pert + 0.01;
		}
		
		Ext.Ajax.request({//进度条请求
			url: webContextRoot + 'export/exportProgress.action?flag=' + flag,
			success: function(response) {
				var percents = Ext.util.JSON.decode(response.responseText).percents;//返回结果
				if(percents && percents.indexOf("OK") >= 0){//导出成功
					pert = 1;
					Ext.MessageBox.updateProgress(pert, '已完成&nbsp;' + Math.round(pert * 100) + '%');
					clearInterval(timer);//关闭计时器
					function closer() {//关闭进度条
						Ext.MessageBox.hide();
					}
					setTimeout(closer, 1000);//延时请求
				}else{
					//进度
					Ext.MessageBox.updateProgress(pert, '已完成&nbsp;' + Math.round(pert * 100) + '%');
				}
			},
			failure : function() {
	        	Ext.MessageBox.hide();//关闭进度条
		    }
		});
	}
	timer = setInterval(getProgress, 500);//计时器
}
