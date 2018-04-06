var ynbg_logo;	var logoBoolean = false;	//logo对象   判断是否加载完成
var dltjChart;	var dltjBoolean = false;	//电量统计chart对象   判断是否加载完成
var fhqsChart;	var fhqsBoolean = false;	//负荷趋势chart对象   判断是否加载完成
var glyszsChart;	var glyszsBoolean = false;//功率因数走势chart对象   判断是否加载完成
var dftjChart;	var dftjBoolean = false;	//电费统计chart对象   判断是否加载完成
var ynbg_sbnhChart;	var ynbg_sbnhBoolean = false;//设备用电chart对象   判断是否加载完成
var ynbg_qynhChart;	var ynbg_qynhBoolean = false;//区域用电chart对象   判断是否加载完成
var ynbg_dyhglChart;	var ynbg_dyhglBoolean = false;//电压合格率chart对象   判断是否加载完成
var ynbg_sxdlbphChart;	var ynbg_sxdlbphBoolean = false;//三相电流不平衡chart对象   判断是否加载完成
//var ynbg_xbChart;	var ynbg_xbBoolean = false;//谐波chart对象   判断是否加载完成
var ops={height:500,width:900};
//var consId = 101000004001;//consId=101000001077 consId=101000004001
var ynbgTimer;  //定时器
var ynbgCurrentTime = new Date();//当前时间
var ynbgTime;//选择导出的时间
var ynbg_dialog_content = null;
var ynbgFlag = 0;
$(function(){
	$("#bt_exportynbg").click(function(){
//		console.log(top.roleId);
		openWindow();
		/*if(ynbg_dialog_content == null){
			ynbg_dialog_content = '<div id="ynbg_sbnh" style="height:500px;display:none;"></div>'+
			'<div id="ynbg_qynh" style="height:500px;display:none;"></div>'+
			'<div id="ynbg_dyhgl" style="height:500px;display:none;"></div>'+
			'<div id="ynbg_sxdlbph" style="height:500px;display:none;"></div>'+
//			'<div id="ynbg_xb" style="height:500px;"></div>'+
			'<div id="ynbg-dialog" class="easyui-dialog"  title="用能分析报告" style="padding:20px;align:center;overflow:hidden"'+
		       ' data-options="minimizable:false,maximizable:false,collapsible:false,resizable:true,modal:true,closed:true"> '+
		       '<table><tr><td width="150px;">用能分析报告年月：</td>'+
		       '<td><a id="ynbg_left" href="#" style="border-style:none;"><img style="border-style:none;" alt="前一天" src="'+webContextRoot+'/images/tools-moveleft.gif"></a></td>'+
			   '<td><input id="ynbgrq" class="Wdate" type="text" style="width: 110px;text-align: left;" readonly="readonly" onClick="WdatePicker({dateFmt:\'yyyy-MM\',onpicked:changeYNBGDate,isShowClear:false,readOnly:true})"/></td>'+
			   '<td><a id="ynbg_right" href="#" style="border-style:none;"><img style="border-style:none;" alt="后一天" src="'+webContextRoot+'/images/tools-moveright.gif"></a></td>'+
		       '<td width="80px;"><a href="#" class="easyui-linkbutton c100" onClick="ynbg_search()" >确定</a></td>'+
		       '</tr></table>'+
			' </div>';  
			//下面是用能报告logo，通用logo、金能电力logo
//			ynbg_dialog_content += '<img id="ynbg_logo" style="display:none" src="'+webContextRoot+'pages/despages/common/images/ynbg_logo_general.png" width="200px" height="200px">';
//			ynbg_dialog_content += '<img id="ynbg_logo" style="display:none" src="'+webContextRoot+'pages/despages/common/images/ynbg_logo_jndl.jpg" width="200px" height="200px">';
			$(document.body).append(ynbg_dialog_content);
		}
		//根据consId 查询区域能源服务中心的Icon路径 
		selectAreaIcon();
		
		$("#ynbg-dialog").dialog({}); 
		$("#ynbgrq").val(DateUtil.dateToStr('yyyy-MM',ynbgCurrentTime)); 
		$('#ynbg-dialog').dialog("open");  
		
		if(ynbgFlag==0){
			ynbgFlag = 1;
			$('#ynbg_left').click(function(){
				ynbgTime =  $('#ynbgrq').val();//获取当前开始日期
				var nowDate = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('m',-1,DateUtil.strToDate(ynbgTime+"-01")));//月份减1
				$('#ynbgrq').val(nowDate.substr(0,7));//重新赋值
			});
			
			 //右加日期
			$('#ynbg_right').click(function(){
				ynbgTime =  $('#ynbgrq').val();//开始日期
				var nowDate = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('m',1,DateUtil.strToDate(ynbgTime+"-01")));//月份加1
				$('#ynbgrq').val(nowDate.substr(0,7));//重新赋值
			});
		}*/
	});
	
	
//	$("#bt_exportynbg").click(function(){
//		//加载echart图
//		getChartDLTJ();
//		getChartFHQS();
//		getChartGLYSZS();
//		getChartDFTJ();
//		//判断echart 是否加载完成
//		if(dltjBoolean&&fhqsBoolean&&glyszsBoolean){
//			beforeSend();
//			dltjBoolean=false;
//			fhqsBoolean=false;
//			glyszsBoolean=false;
//		}else{
//			//显示进度条
//			$.messager.progress({
//				title:'导出进度',
//				msg:'正在导出，请稍候……'
//			});
//			//设置定时器  检查导出确认
//			ynbgTimer = setInterval(exportConfirm, 300);
//		}
//		//导出确认  确认echart是否加载完成
//		function exportConfirm(){
//			//判断echart 是否加载完成
//			if(dltjBoolean&&fhqsBoolean&&glyszsBoolean){
//				beforeSend();
//				window.clearInterval(ynbgTimer);
//				$.messager.progress('close');
//				dltjBoolean=false;
//				fhqsBoolean=false;
//				glyszsBoolean=false;
//			}
//		}
//		
//	});
	
	
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
	
	
});

/**
 * 导出确认事件
 */
function ynbg_search(){
	//显示进度条
	$.messager.progress({
		title:'导出进度',
		msg:'正在导出，请稍候……'
	});
	
	ynbgTime = $("#ynbgrq").val();
	$('#ynbg-dialog').dialog("close");  
	//加载echart图
	getChartDLTJ();
	getChartFHQS();
	getChartGLYSZS();
	getChartDFTJ();
	getChartYNPM();
	getChartDYHGL();
	getChartSXDLBPH();
//	selectAreaIcon();
//	getChartXB();
	//判断echart 是否加载完成
	if(dltjBoolean&&fhqsBoolean&&glyszsBoolean&&ynbg_sbnhBoolean&&ynbg_qynhBoolean&&ynbg_dyhglBoolean&&ynbg_sxdlbphBoolean){
		beforeSend();
		dltjBoolean=false;
		fhqsBoolean=false;
		glyszsBoolean=false;
		ynbg_sbnhBoolean=false;
		ynbg_qynhBoolean=false;
		ynbg_dyhglBoolean=false;
		ynbg_sxdlbphBoolean=false;
//		logoBoolean=false;
//		ynbg_xbBoolean=false;
	}else{
		//设置定时器  检查导出确认
		ynbgTimer = setInterval(exportConfirm, 300);
	}
	//导出确认  确认echart是否加载完成
	function exportConfirm(){
		//判断echart 是否加载完成
		if(dltjBoolean&&fhqsBoolean&&glyszsBoolean&&ynbg_sbnhBoolean&&ynbg_qynhBoolean&&ynbg_dyhglBoolean&&ynbg_sxdlbphBoolean){
			beforeSend();
			window.clearInterval(ynbgTimer);
			dltjBoolean=false;
			fhqsBoolean=false;
			glyszsBoolean=false;
			ynbg_sbnhBoolean=false;
			ynbg_qynhBoolean=false;
			ynbg_dyhglBoolean=false;
			ynbg_sxdlbphBoolean=false;
//			logoBoolean=false;
//			ynbg_xbBoolean=false;
		}
	}
}

/**
 * 发送前 检查信息
 */
function beforeSend(){
	if(dltjChart!=''){
		//获取电量统计png源代码并转码
		dltjImage = encodeURIComponent(dltjChart.getDataURL("png"));
	}else dltjImage = '';
	if(fhqsChart!=''){
		//获取负荷趋势png源代码并转码
		fhqsImage = encodeURIComponent(fhqsChart.getDataURL("png"));
	}else fhqsImage = '';
	if(glyszsChart!=''){
		//获取功率因数走势png源代码并转码
		glyszsImage = encodeURIComponent(glyszsChart.getDataURL("png"));
	}else glyszsImage = '';
	if(dftjChart!=''){
		//获取电费统计png源代码并转码
		dftjImage = encodeURIComponent(dftjChart.getDataURL("png"));
	}else dftjImage = '';
	if(ynbg_sbnhChart!=''){
		//获取设备能耗png源代码并转码
		ynbg_sbnhImage = encodeURIComponent(ynbg_sbnhChart.getDataURL("png"));
	}else ynbg_sbnhImage = '';
	if(ynbg_qynhChart!=''){
		//获取区域能耗png源代码并转码
		ynbg_qynhImage = encodeURIComponent(ynbg_qynhChart.getDataURL("png"));
	}else ynbg_qynhImage = '';
	if(ynbg_dyhglChart!=''){
		//获取电压合格率png源代码并转码
		ynbg_dyhglImage = encodeURIComponent(ynbg_dyhglChart.getDataURL("png"));
	}else ynbg_dyhglImage = '';
	if(ynbg_sxdlbphChart!=''){
		//获取三相电流不平衡png源代码并转码
		ynbg_sxdlbphImage = encodeURIComponent(ynbg_sxdlbphChart.getDataURL("png"));
	}else ynbg_sxdlbphImage = '';
	
	//发送数据url 
	$('#gridDiv').datagrid("exportExcel", {
		  url : webContextRoot+'ydjk/exportynbg.action?dltjImage='+dltjImage+'&fhqsImage='+fhqsImage+
		  	'&glyszsImage='+glyszsImage+'&dftjImage='+dftjImage+'&consId='+consId+'&time='+ynbgTime+
		  	'&sbnhImage='+ynbg_sbnhImage+'&qynhImage='+ynbg_qynhImage+'&dyhglImage='+ynbg_dyhglImage+
		  	'&sxdlbphImage='+ynbg_sxdlbphImage+'&ynbgLogo='+ynbg_logo
   	});
	$.messager.progress('close');
}
/**
 * 电量统计报表
 */
function getChartDLTJ(){
	$.ajax({	
		url:webContextRoot+'ydjk/getChart.action', 
		data:{
			'consId': consId,
			'chartName' : 'dltj',
			'time' : ynbgTime
		},
		dataType:'json',
		type:'post',
		success:function(result){
			if(result.flag=='success'){
				var x = [];
				var y1 = [];
				var y2 = [];
				var y3 = [];
//				for(var i = result.data.length-1 ; i>=0 ;i--){
				for(var i in result.data){
					x.push(result.data[i].dataDate);//时间
					y1.push(result.data[i].papR2);//峰电量
					y2.push(result.data[i].papR3);//平电量
					y3.push(result.data[i].papR4);//谷电量
				}
				var option = {
					    title: {
					        x:'center'
					    },
					    tooltip: {
					        trigger: 'axis'
					    },
					    grid : {
							left: '1%',
					        right: '1%',
							bottom : '3%',
							containLabel : true
						},
					    legend: {
					        data:['峰电量','平电量','谷电量'],
					        y:28
					    },
					    xAxis:  {
					        type: 'category',
					        data: x
					    },
					    yAxis:[{
					            name: '单位(kWh)',
					            type: 'value',
					        }],
					    series: [
					        {
					            name:'峰电量',
					            type:'bar',
					            stack:'总量',
					            data:y1
					        },
					        {
					            name:'平电量',
					            type:'bar',
					            stack:'总量',
					            data:y2
					        },
					        {
					            name:'谷电量',
					            type:'bar',
					            stack:'总量',
					            data:y3
					        }
					    ]
					};
				//初始化echart
				dltjChart = echarts.init(document.getElementById('dltj'));
				//配置echart
				dltjChart.setOption(option,true);
				//重设echart大小
				dltjChart.resize(ops);
				//加载完成变量
				dltjBoolean = true;
			}
		}
	});
}
/**
 * 负荷趋势
 */
function getChartFHQS(){
	$.ajax({	
		url:webContextRoot+'ydjk/getChart.action', 
		data:{
			'consId': consId,
			'chartName' : 'fhqs',
			'time' : ynbgTime
		},
		dataType:'json',
		type:'post',
		success:function(result){
			if(result.flag=='success'){
				var x = [];//时间
				var y1 = [];//平均负荷
				var y2 = [];//最大负荷
				var y3 = [];//最小负荷
				if(result.type=='1'){
					for(var i in result.data){
						x.push(result.data[i].dataDate);
						y1.push(result.data[i].avgValue);
					}
					var option = {
						    title: {
						        x:'center'
						    },
						    tooltip: {
						        trigger: 'axis'
						    },
						    grid : {
								left: '1%',
						        right: '1%',
								bottom : '3%',
								containLabel : true
							},
						    legend: {
						        data:['负荷'],
						        y:28
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
						            name:'负荷',
						            type:'line',
						            data: y1
						        }
						    ]
						};
					//初始化echart
					fhqsChart = echarts.init(document.getElementById('fhqs'));
					//配置echart
					fhqsChart.setOption(option,true);
					//重设echart大小
					fhqsChart.resize(ops);
					//加载完成变量
					fhqsBoolean = true;
				}else{
					for(var i in result.data){
						x.push(result.data[i].dataDate);
						y1.push(result.data[i].avgValue);
						y2.push(result.data[i].maxValue);
						y3.push(result.data[i].minValue);
					}
					var option = {
						    title: {
						        x:'center'
						    },
						    tooltip: {
						        trigger: 'axis'
						    },
						    grid : {
								left: '1%',
						        right: '1%',
								bottom : '3%',
								containLabel : true
							},
						    legend: {
						        data:['平均负荷','最大负荷','最小负荷'],
						        y:28
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
						            name:'平均负荷',
						            type:'line',
						            data: y1
						        },
						        {
						            name:'最大负荷',
						            type:'line',
						            data: y2
						        },
						        {
						            name:'最小负荷',
						            type:'line',
						            data: y3
						        }
						    ]
						};
					//初始化echart
					fhqsChart = echarts.init(document.getElementById('fhqs'));
					//配置echart
					fhqsChart.setOption(option,true);
					//重置echart大小
					fhqsChart.resize(ops);
					//加载完成变量
					fhqsBoolean = true;
				}
			}
		}
	});
}
/**
 * 功率因数走势
 */
function getChartGLYSZS(){
	$.ajax({	
		url:webContextRoot+'ydjk/getChart.action', 
		data:{
			'consId': consId,
			'chartName' : 'glyszs',
			'time' : ynbgTime
		},
		dataType:'json',
		type:'post',
		success:function(result){
			if(result.flag=='success'){
				var x = [];
				var y = [];
				for(var i = result.data.length-1 ; i>=0 ;i--){
					x.push(result.data[i].dataDate);//时间
					y.push(parseFloat(result.data[i].glysValue));//功率因数
				}
				var option = {
					    title: {
					        x:'center'
					    },
					    tooltip: {
					        trigger: 'axis'
					    },
					    grid : {
							left: '1%',
					        right: '1%',
							bottom : '3%',
							containLabel : true
						},
					    legend: {
					        data:['功率因数'],
					        y:28
					    },
					    xAxis:  {
					        type: 'category',
					        boundaryGap:false,
					        data: x
					    },
					    yAxis:[{
					            name: '单位(因数)',
					            type: 'value',
					        }],
					    series: [
					        {
					            name:'功率因数',
					            type:'line',
					            data:y
					        }
					    ]
					};
				//初始化echart
				glyszsChart = echarts.init(document.getElementById('glyszs'));
				//配置echart
				glyszsChart.setOption(option,true);
				//重设echart大小
				glyszsChart.resize(ops);
				//加载完成变量
				glyszsBoolean = true;
			}
		}
	});
}
/**
 * 电费统计
 */
function getChartDFTJ(){
//	$.ajax({	
//		url:webContextRoot+'ydjk/getChart.action', 
//		data:{
//			'consId': '101000001077',
//			'chartName' : 'fhqs',
//			'time' : ynbgTime
//		},
//		dataType:'json',
//		type:'post',
//		success:function(result){
//			if(result.flag=='success'){
//				var x = [];
//				var y = [];
//				for(var i = result.data.length-1 ; i>=0 ;i--){
//					x.push(result.data[i].dataDate);//时间
//					y.push(result.data[i].papR2);//峰电量
//				}
				var option = {
					    title: {
					        x:'center'
					    },
					    tooltip: {
					        trigger: 'axis'
					    },
					    grid : {
							left: '1%',
					        right: '1%',
							bottom : '3%',
							containLabel : true
						},
					    legend: {
					        data:['总电费','电度电费','基本电费','力调电费'],
					        y:28
					    },
					    xAxis:  {
					        type: 'category',
					        data: ['2017-01','2017-02','2017-03','2017-04','2017-05','2017-06','2017-07','2017-08',
					               '2017-09','2017-10','2017-11','2017-12']
					    },
					    yAxis:[{
					            name: '单位(万元)',
					            type: 'value',
					        }],
					    series: [
					        {
					            name:'总电费',
					            type:'bar',
					            data:[0,0,0,0,0,0,0,0,0,0,0,0]
					        },
					        {
					            name:'电度电费',
					            type:'bar',
					            data:[0,0,0,0,0,0,0,0,0,0,0,0]
					        },
					        {
					            name:'基本电费',
					            type:'bar',
					            data:[0,0,0,0,0,0,0,0,0,0,0,0]
					        },
					        {
					            name:'力调电费',
					            type:'bar',
					            data:[0,0,0,0,0,0,0,0,0,0,0,0]
					        }
					    ]
					};
				//初始化
				dftjChart = echarts.init(document.getElementById('dftj'));
				dftjChart.setOption(option,true);
				dftjChart.resize(ops);
				dftjBoolean = true;
//			}
//		},
//		error:function(result){
//			alert('ajax error');
//		}
//	});
}

/**
 * 电压合格率
 */
function getChartDYHGL(){
//	$.ajax({	
//		url:webContextRoot+'sfgSub/queryTopInfo.action', 
//		data:{
//			'consPowerInfoModel.consId': consId, 
//	        'consPowerInfoModel.dataDate': ynbgTime
//		},
//		dataType:'json',
//		type:'post',
//		success:function(data){
			//设备能耗排名
			var option = {
				    legend: {
				        data: ['电压合格率'],
				        x:'center',
				        y:'35'
				    },
				    //设置grid位置
				    grid : {
						 x : 55, //左边距离
						 y : 75,//上边距离
						 x2 : 35,//右边距离
						 y2 : 35//下边距离
					 },
				    xAxis:  {
				        type: 'category',
				        data : []
				    },
				    yAxis: [
				        {
				        	name: '%',
				            type: 'value',
				            min:'0',
				            max:'auto'
				        }
				    ],
				    series: [
				        {
					        name: '电压合格率',
			                type: 'line',
			                symbol: 'circle',
			                data:[],//数据,
			                itemStyle: {
			                    normal: {
			                        barBorderRadius: 0,
			                        color:'#FF6E63'
			                    }
			                }
				        }
				        
				    ]
				};
			//初始化echart
			ynbg_dyhglChart = echarts.init(document.getElementById('ynbg_dyhgl'));
			//配置echart
			ynbg_dyhglChart.setOption(option,true);
			//重设echart大小
			ynbg_dyhglChart.resize(ops);
			//加载完成变量
			ynbg_dyhglBoolean = true; 
//		}
//	});
}

/**
 * 三相电流不平衡
 */
function getChartSXDLBPH(){
//	$.ajax({	
//		url:webContextRoot+'sfgSub/queryTopInfo.action', 
//		data:{
//			'consPowerInfoModel.consId': consId, 
//	        'consPowerInfoModel.dataDate': ynbgTime
//		},
//		dataType:'json',
//		type:'post',
//		success:function(data){
	//设备能耗排名
	var option = {
			legend: {
				data: ['A相电流','B相电流','C相电流'],
				x:'center',
				y:'35'
			},
			//设置grid位置
			grid : {
				x : 55, //左边距离
				y : 75,//上边距离
				x2 : 35,//右边距离
				y2 : 35//下边距离
			},
			xAxis:  {
				type: 'category',
				data : []
			},
			yAxis: [
			        {
			        	name: '电流(A)',
			        	type: 'value',
			        	min:'0',
			        	max:'auto'
			        }
			        ],
			        series: [
			                 {
			                	 name: 'A相电流',
			                	 type: 'line',
			                	 symbol: 'circle',
			                	 data:[],//数据,
			                	 itemStyle: {
//			                		 normal: {
//			                			 barBorderRadius: 0,
//			                			 color:'#FF6E63'
//			                		 }
			                	 }
			                 },
			                 {
			                	 name: 'B相电流',
			                	 type: 'line',
			                	 symbol: 'circle',
			                	 data:[],//数据,
			                	 itemStyle: {
//			                		 normal: {
//			                			 barBorderRadius: 0,
//			                			 color:'#FF6E63'
//			                		 }
			                	 }
			                 },
			                 {
			                	 name: 'C相电流',
			                	 type: 'line',
			                	 symbol: 'circle',
			                	 data:[],//数据,
			                	 itemStyle: {
//			                		 normal: {
//			                			 barBorderRadius: 0,
//			                			 color:'#FF6E63'
//			                		 }
			                	 }
			                 }
			                 
			                 ]
				};
				//初始化echart
				ynbg_sxdlbphChart = echarts.init(document.getElementById('ynbg_sxdlbph'));
				//配置echart
				ynbg_sxdlbphChart.setOption(option,true);
				//重设echart大小
				ynbg_sxdlbphChart.resize(ops);
				//加载完成变量
				ynbg_sxdlbphBoolean = true; 
//		}
//	});
}
/**
 * 谐波
 */
/*function getChartXB(){
//	$.ajax({	
//		url:webContextRoot+'sfgSub/queryTopInfo.action', 
//		data:{
//			'consPowerInfoModel.consId': consId, 
//	        'consPowerInfoModel.dataDate': ynbgTime
//		},
//		dataType:'json',
//		type:'post',
//		success:function(data){
	var data = new Array();
	var legendDemo = ['电流最大值','电流平均值','电流最小值','电压最大值','电压平均值','电压最小值'];
	var obj1 = ['1#变压器',
	            '111','112','113','114','115','116','117','118','119','120','121','122','123','124','125',  //电流最大值
	            '101','102','103','104','105','106','107','108','109','110','111','112','113','114','115',  //电流平均值
	            '91','92','93','94','95','96','97','98','99','100','101','102','103','104','105',			//电流最小值
	            '51','52','53','54','55','56','57','58','59','60','61','62','63','64','65',	//电压最大值
	            '41','42','43','44','45','46','47','48','49','50','51','52','53','54','55',	//电压平均值
	            '31','32','33','34','35','36','37','38','39','40','41','42','43','44','45',	//电压最小值
	            ];
	var obj2 = ['2#变压器',
	            '116','117','118','119','120','121','122','123','124','125','126','127','128','129','130',  //电流最大值
	            '106','107','108','109','110','111','112','113','114','115','116','117','118','119','120',  //电流平均值
	            '96','97','98','99','100','101','102','103','104','105','106','107','108','109','110',			//电流最小值
	            '56','57','58','59','60','61','62','63','64','65','66','67','68','69','70',	//电压最大值
	            '46','47','48','49','50','51','52','53','54','55','56','57','58','59','60',//电压平均值
	            '36','37','38','39','40','41','42','43','44','45','46','47','48','49','50',	//电压最小值
	            ];
	var legendData = [];
	data.push(obj1);
	data.push(obj2);
	var series =[];
	for(var i in data){
		for(var j in legendDemo){
			legendData.push(data[i][0]+legendDemo[j]);
		}
	}
//	series.push({
//		name: data[i][0]+legendDemo[j],
//    	type: 'line',
//    	symbol: 'circle',
//		data:dataIntoArray(data[i],1,15,series)
//	});
//	series.push({
//		name: '电流最大值',
//    	type: 'line',
//    	symbol: 'circle',
//		data:dataIntoArray(data[i],1,15,series)
//	});
	for(var i in data){
//		legendData.push(data[i][0]+legendDemo[j]);
		series.push({
			name: legendData[(parseInt(i))*6],
	    	type: 'line',
	    	symbol: 'circle',
			data:dataIntoArray(data[i],1,15)
		});
		series.push({
			name: legendData[(parseInt(i))*6+1],
			type: 'line',
			symbol: 'circle',
			data:dataIntoArray(data[i],16,30)
		});
		series.push({
			name: legendData[(parseInt(i))*6+2],
			type: 'line',
			symbol: 'circle',
			data:dataIntoArray(data[i],31,45)
		});
		series.push({
			name: legendData[(parseInt(i))*6+3],
			type: 'line',
			symbol: 'circle',
			yAxisIndex:1,
			data:dataIntoArray(data[i],46,60)
		});
		series.push({
			name: legendData[(parseInt(i))*6+4],
			type: 'line',
			symbol: 'circle',
			yAxisIndex:1,
			data:dataIntoArray(data[i],61,75)
		});
		series.push({
			name: legendData[(parseInt(i))*6+5],
			type: 'line',
			symbol: 'circle',
			yAxisIndex:1,
			data:dataIntoArray(data[i],76,90)
		});
	}
	var option = new Object();
	option = {
			legend: {
				data: legendData,
				x:'center',
				y:'5'
			},
			//设置grid位置
			grid : {
				x : 55, //左边距离
				y : 105,//上边距离
				x2 : 35,//右边距离
				y2 : 35//下边距离
			},
			xAxis:  {
				type: 'category',
				data : ['1次','2次','3次','4次','5次','6次','7次','8次','9次','10次','11次','12次','13次','14次','15次']
			},
			yAxis: [
			        {
			        	name: '电流(A)',
			        	type: 'value',
			        	min:'0',
			        	max:'auto'
			        },{
			            name: '电压(%)',
			            type: 'value',
			            min:'0' ,
			            max:'auto'
			        }
			        ],
	        series: series
	};
//	option.legend({
//				data:legendData,
//				x:'center',
//				y:'35'
//			});
	//初始化echart
	ynbg_xbChart = echarts.init(document.getElementById('ynbg_xb'));
	//配置echart
	ynbg_xbChart.setOption(option,true);
	//重设echart大小
	ynbg_xbChart.resize(ops);
	//加载完成变量
	ynbg_xbBoolean = true; 
//		}
//	});
}*/

/**
 * 用能排名
 */
function getChartYNPM(){
	$.ajax({	
		url:webContextRoot+'sfgSub/queryTopInfo.action', 
		data:{
			'consPowerInfoModel.consId': consId,
			'consPowerInfoModel.dataDate': ynbgTime
		},
		dataType:'json',
		type:'post',
		success:function(data){
			//设备能耗排名
			var option = {
					legend: {
						data: ['能耗'],
						x:'center',
						y:'35'
					},
					//设置grid位置
					grid : {
						x : 55, //左边距离
						y : 75,//上边距离
						x2 : 35,//右边距离
						y2 : 35//下边距离
					},
					xAxis:  {
						type: 'category',
						data : data.consMap.devName
					},
					yAxis: [
					        {
					        	name: '单位(kWh)',
					        	type: 'value',
					        	min:'0',
					        	max:'auto'
					        }
					        ],
					        series: [
					                 {
					                	 name: '能耗',
					                	 type: 'bar',
					                	 symbol: 'circle',
					                	 data:data.consMap.devEnergyValue,//数据,
					                	 itemStyle: {
					                		 normal: {
					                			 barBorderRadius: 0,
					                			 color:'#FF6E63'
					                		 }
					                	 }
					                 }
					                 
					                 ]
			};
			//初始化echart
			ynbg_sbnhChart = echarts.init(document.getElementById('ynbg_sbnh'));
			//配置echart
			ynbg_sbnhChart.setOption(option,true);
			//重设echart大小
			ynbg_sbnhChart.resize(ops);
			//加载完成变量
			ynbg_sbnhBoolean = true; 
			
			option = {
					legend: {
						data: ['能耗'],
						x:'center',
						y:'35'
					},
					//设置grid位置
					grid : {
						x : 55, //左边距离
						y : 75,//上边距离
						x2 : 35,//右边距离
						y2 : 35//下边距离
					},
					xAxis:  {
						type: 'category',
						data : data.consMap.subsName
//				        data : ['单元A','单元B','单元C','单元D','单元E','单元F','单元G','单元H','单元I','单元J']
						
					},
					yAxis: [
					        {
					        	name: '单位(kWh)',
					        	type: 'value',
					        	splitNumber: 5,
					        	min:'0',
					        	max:'auto'
					        }
					        ],
					        series: [
					                 {
					                	 name: '能耗',
					                	 type: 'bar',
					                	 symbol: 'circle',
					                	 data:data.consMap.subsEnergyValue,//数据,
					                	 itemStyle: {
					                		 normal: {
					                			 barBorderRadius: 0,
					                			 color:'#FED800'
					                		 }
					                	 }
					                 }
					                 
					                 ]
			};
			
			//初始化echart
			ynbg_qynhChart = echarts.init(document.getElementById('ynbg_qynh'));
			//配置echart
			ynbg_qynhChart.setOption(option,true);
			//重设echart大小
			ynbg_qynhChart.resize(ops);
			//加载完成变量
			ynbg_qynhBoolean = true; 
		}
	});
}

/**
 *  根据consId 查询区域能源服务中心的Icon路径
 */
function selectAreaIcon(){
	$.ajax({	
		url:webContextRoot+'ydjk/selectAreaIcon.action', 
		data:{
			'consId': consId
		},
		dataType:'json',
		type:'post',
		success:function(result){
			//获取logo源代码并转码   通用ynbg_logo_general.png  金能电力ynbg_logo_jndl.jpg
			var url = webContextRoot+result.src;
			convertImgToBase64(url,function(base64Img){
//				console.log('image:',base64Img);
//				console.log('image-z:',encodeURIComponent(base64Img));
				ynbg_logo = encodeURIComponent(base64Img);
			});
			logoBoolean = true;
		}
	});
}

/**
 * 数据装入数组中
 * @param data 原数据
 * @param start	开始位置
 * @param end	结束位置
 */
function dataIntoArray(data,start,end){
	var array = [];
	for(var i = start; i <= end ; i++){
		array.push(data[i]);
	}
	return array;
}

/**
 * 选中日期的事件
 */
function changeYNBGDate(){}

/**
 * 将图片转换为base64的格式
 * @param url
 * @param callback
 * @param outputFormat
 */
function convertImgToBase64(url,callback,outputFormat){
	var canvas = document.createElement('CANVAS');
	ctx = canvas.getContext('2d');
	img = new Image;
	img.crossOrigin = 'Anonymous';
	img.onload = function(){
		canvas.height = img.height;
		canvas.width = img.width;
		ctx.drawImage(img,0,0);
		var dataURL = canvas.toDataURL(outputFormat||'image/png');
		callback.call(this,dataURL);
		canvas = null;
	};
	img.src = url;
	//使用方法示例
	/*
	convertImgToBase64(webContextRoot+'pages/despages/common/images/ynbg_logo_jndl.jpg',function(base64Img){
		console.log('image:',base64Img);
		console.log('image-z:',encodeURIComponent(base64Img));
	});
	*/
}

/**
 * 打开用能报告预览
 */
function openWindow() {
	var url = '';
//	alert(top.areaNo);
	if(top.areaNo == '102'){
		url = webContextRoot + '/pages/despages/projectManage/ynfxbg_yx.jsp?consId='+consId;
	}else{
		url = webContextRoot + '/pages/despages/projectManage/ynfxbg.jsp?consId='+consId;
	}
	 OpenWinUnRes(url, '',screen.availWidth - 300,screen.availHeight - 260);
}

/*******************************************************************************
 * 打开窗口，不可拖动窗体大小 并且让窗口在屏幕上居中
 * 
 * @param url
 * @param winName
 * @param width
 * @param height
 * @param isClosed
 */
function OpenWinUnRes(url, winName, width, height, isClosed) {
	xposition = 0;
	yposition = 0;

	if ((parseInt(navigator.appVersion) >= 4)) {
		xposition = (screen.width - width) / 2;
		yposition = (screen.height - height) / 2;
	}
	theproperty = "width=" + width + "," + "height=" + height + ","
			+ "location=0," + "menubar=0," + "resizable=0," + "scrollbars=1,"
			+ "status=1," + "titlebar=0," + "toolbar=0," + "hotkeys=0,"
			+ "screenx=" + xposition + "," // 仅适用于Netscape
			+ "screeny=" + yposition + "," // 仅适用于Netscape
			+ "left=" + xposition + "," // IE
			+ "top=" + yposition; // IE
	monwin = window.open(url, winName, theproperty, false);
	if (isClosed) {
		monwin.close();
		monwin = window.open(url, winName, theproperty, false);
	}
	monwin.focus();
}