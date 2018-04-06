/**
 * 变压器能效总览
 * @author 孟子杰
 * @since 2017-06-06
 */
var currentDate = new Date();
var byq_datagrid;
var myChart;
var myChart1;
var myChart2;
var run_status_tran_flag = 0;//变压器运行状态首次加载变量
var byqSj_datagrid = null;
//js入口
$(function(){
	//查询变压器信息
	selectOperationData();
	//初始化日期
	$("#dataDate").val(DateUtil.dateToStr('yyyy-MM',currentDate));
	//初始化echart
	myChart = echarts.init(document.getElementById("byqNxtj"));
	myChart1 = echarts.init(document.getElementById("byqLx"));
	myChart2 = echarts.init(document.getElementById("byqRl"));
	//查询echart
	selByq();
	selByqType();
	selByqNxtj();
	
	 //业务类型
	$('#run_status').combobox({//业务类型
		url:webContextRoot +'pCode/queryCode.action?codeSortId=70033',
		valueField: 'codeValue',
		textField: 'codeName' ,
		onLoadSuccess: function(){
			if(run_status_tran_flag==0){
				var data = 	$(this).combobox('getData');
//				data.splice(0,0,{'id':'0','codeName':'请选择','codeValue':''});
				run_status_tran_flag++;
				$(this).combobox('loadData',data);
			}
		}
		/*onChange: function(newValue, oldValue){
			wnGrade = newValue;
		},onLoadSuccess: function(){
			$('#run_status').combobox('setValue', 1);
		}*/
	});
	
	//客户
	$('#consId').combobox({
		url:webContextRoot +'destree/queryConsList.action',
		valueField: 'id',
		textField: 'text',
//		onChange: function(newValue, oldValue){
////	    	if(newValue != ''){
////				 newValue = $('#consId').combobox('getText');
////					 $.getJSON(webContextRoot + 'destree/queryTree.action?isQyCode=false&ziMu='+newValue,{ 
////							},
////							function(json){
////								$('#consId').combobox('loadData',json);	
////							}
////				 );
////		   	}else{
////		   		 newValue = $('#consId').combobox('getText');
////					 $.getJSON(webContextRoot + 'destree/queryTree.action?isQyCode=false&ziMu=',{ 
////							},
////							function(json){
////								$('#consId').combobox('loadData',json);	
////							}
////				 );
////		   	}
//		}
		mode : 'remote',
		onHidePanel : function(){$('#consId').combobox('reload');}
	});
	//客户
	$('#yxzk_consId').combobox({
		url:webContextRoot +'destree/queryConsList.action',
		valueField: 'id',
		textField: 'text',
//		onChange: function(newValue, oldValue){
////	    	if(newValue != ''){
////				 newValue = $('#yxzk_consId').combobox('getText');
////					 $.getJSON(webContextRoot + 'destree/queryTree.action?isQyCode=false&ziMu='+newValue,{ 
////							},
////							function(json){
////								$('#yxzk_consId').combobox('loadData',json);	
////							}
////				 );
////		   	}else{
////		   		 newValue = $('#yxzk_consId').combobox('getText');
////					 $.getJSON(webContextRoot + 'destree/queryTree.action?isQyCode=false&ziMu=',{ 
////							},
////							function(json){
////								$('#yxzk_consId').combobox('loadData',json);	
////							}
////				 );
////		   	}
//		}
		mode : 'remote',
		onHidePanel : function(){$('#yxzk_consId').combobox('reload');}
	});
});

/**
 * 点击显示
 */
function clickShow() {
	var s = '<li class="time"><span id="consName"  class="tb-group-label">客户名称:<input class="easyui-textbox" style="width: 150px;"><input class="easyui-textbox" style="width: 150px;"><input class="easyui-textbox" style="width: 150px;"></span></li>';
	$(".s-ul-one").append(s);
	autoResize.call(this);
}

/**
 * 点击隐藏
 */
function clickHide() {
	$(".s-ul-one").remove(".time");
}

/**
 * 时间左右按键事件
 * @param dateTime
 */
function qytQueryOveride(dateTime){
	var date = $('#dataDate').val();
	var resultDay = timeUtil(dateTime,date);//DateUtil.dateAdd("d", parseInt(dateTime), DateUtil.strToDate(startDay2));//getDateByOffsetDays(startDay2,dateTime);
	$('#dataDate').val(resultDay);
	selByqNxtj();
}

/**
 * 事假转换
 * @param dateTime
 * @param startDay
 * @returns {String}
 */
function timeUtil(dateTime,startDay){
	var resultDay = DateUtil.dateAdd("m", parseInt(dateTime), DateUtil.strToDate(startDay));
	var resultStr = "";
	resultStr+=resultDay.getFullYear()+"-"+leftPad(resultDay.getMonth()+1);
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
 * 查询运维数据
 */
function selectOperationData(){
	$.ajax({	
		url:webContextRoot+'byq/selectOperationData.action', 
		data:{
			'data': orgNo
		},
		dataType:'json',
		type:'post',
		success:function(result){
			if(result.flag=='success'){
				
				$('#tran_exception').html("<a onClick=\"openTran(2);\" class='fc1' style=\"cursor: pointer;\">"+result.data.tran_exception+"</a>");
				$('#tran_check').html("<a onClick=\"openTran(4);\" class='fc2' style=\"cursor: pointer;\">"+result.data.tran_check+"</a>");
				$('#tran_run').html("<a onClick=\"openTran(1);\" class='fc3' style=\"cursor: pointer;\">"+result.data.tran_run+"</a>");
				$('#tran_total').html("<a onClick=\"openTran();\" class='fc4' style=\"cursor: pointer;\">"+result.data.tran_total+"</a>");
				//$('#tran_stop').html("<a onClick=\"openTran(3);\" class='fc2' style=\"cursor: pointer;\">"+result.data.tran_stop+"</a>");
			}
		}
	});
}

/**
 * 弹出变压器
 */
function openTran(type){
	if(type==2){
//		testOpen('',0,1,'','异常运行设备');
		var options = {
		        name: 'desgjcx',               //需要打开的菜单的关键字,必须保证正确
		        text: '告警查询',           //打开菜单的标题,可修改
		        path: '/des/pages/despages/warn/GaoJingChaXun.jsp?queryType=0&alarmType=1&deviceType=3'//告警类型 alarmType 1:实时告警 ,2:历史告警  queryType=0查询时间
		    };
		top.reloadTabPage(options);
		return;
	}
	searchType = type;
	//设置id=byq-datagrid-div 的高度
//	var height = $("byq-datagrid-div").css("height") - $("byq-search").css("height");
//	$("byq-datagrid-div").css("height",height);
	qingkong();
	$("#byq-dialog").dialog({
		width : document.body.clientWidth-100,
		height : document.body.clientHeight-100,
		top:50,
		left:50
	}); 
	$("#byq-dialog").dialog("open");  
//	$("#gj-dialog").dialog("move",{top:$(document).scrollTop()+($(window).height()-(document.body.clientWidth-100))*0.5});  
//	$("#gj-dialog").dialog("move",{top:50});  
	if(byq_datagrid==null){
		byq_datagrid = $("#byq-datagrid").datagrid({    
			url: webContextRoot + "byq/selectTranList.action",
			loadMsg:'正在加载，请稍等……',//加载时显示提示
			rownumbers:true,
			fit:true,
			fitColumns:true,
			striped: true,
			singleSelect: true,
			queryParams:{
				'dif.state' :type,
				'dif.deceviceType' :3,
				'dif.areaNo' : orgNo
			},
			columns:[[
				{field:'tran_name',title:'变压器',width:40,align:'left',
					formatter: function(value,row,index){
						return HTMLEncode(value);
					}
				},
				{field:'cons_no',title:'客户编号',width:50,align:'left',
					formatter: function(value,row,index){
						return HTMLEncode(value);
					}
				},
				{field:'cons_name',title:'客户名称',width:50,align:'left',
					formatter: function(value,row,index){
						return HTMLEncode(value);
					}
				},
				
				{field:'subs_name',title:'建筑名称',width:40,align:'left',
					formatter: function(value,row,index){
						return HTMLEncode(value);
					}
				},
				{field:'run_status',title:'运行状态',width:20,align:'center',
					formatter: function(value,row,index){
						return HTMLEncode(value);
					}
				},
				{field:'plate_cap',title:'铭牌容量',width:20,align:'right',
					formatter: function(value,row,index){
						if(value!=null) value = value + 'kVA';
						return HTMLEncode(value);
					}
				},
				{field:'tran_volt',title:'电压等级',width:30,align:'right',
					formatter: function(value,row,index){
						return HTMLEncode(value);
					}
				},
				{field:'repair_day',title:'检修剩余时间(天)',width:30,align:'right',
					formatter: function(value,row,index){
						if(value!=null&&value!=''){
							var v = parseFloat(value);
							if(v < 0){
								v = v+"";
								v = "超时"+v.substr(1);
							}
							return v;
						}
						return HTMLEncode(value);
					}
				},
				{field:'next_check_date',title:'下次检修日期',width:50,align:'center',
					formatter: function(value,row,index){
						return HTMLEncode(value.substr(0,10));
					}
				}
			]],
			pagination:true,
			pageSize: 20,
			pageList : [20,50,100],
			onLoadSuccess:function(data){
				var rows = $('#byq-datagrid').datagrid("getRows");
				if(rows.length>0){
					$('#byq-datagrid').datagrid("selectRow",0);
				}
			}
		});
	}else{
		$("#byq-datagrid").datagrid('load',{
			'dif.state' :type,
			'dif.deceviceType' :3,
			'dif.areaNo' : orgNo
		});
	}
	
}

/**
 * 变压器条件查询
 */
function byq_search(){
	//var tran_id =$.trim($('#tran_id').textbox('getValue'));
	var tran_name =$.trim($('#tran_name').textbox('getValue'));
	var cons_name =$.trim($('#cons_name').textbox('getValue'));
	var run_status =$('#run_status').combobox('getText');
	run_status =run_status=='请选择'?'':run_status;
	$('#byq-datagrid').datagrid('load',{
		   //'dif.tran_id':tran_id,//变压器编号
		   'dif.tran_name':tran_name,//变压器名称
		   'dif.cons_name':cons_name,//客户名称
		   'dif.state' :searchType,
		   'dif.deceviceType' :3,
		   'dif.areaNo' : orgNo,
		   'dif.run_status' :run_status
	});
}

//清空弹出框的查询条件
function qingkong(){
	//$('#tran_id').textbox('setValue','');
	$('#tran_name').textbox('setValue','');
	$('#cons_name').textbox('setValue','');
	$('#run_status').combobox('setValue','');
}

//查询变压器容量
function selByq(){
	
	myChart2.showLoading({
		text:'正在努力的读取数据中...',
		effect:'spin'
	});
	
	$.post(webContextRoot +'byq/selByq.action',{
    	/*'consPowerInfoModel.consId': consId,
        'consPowerInfoModel.dataDate': b,
        'consPowerInfoModel.mon': mon*/
		'consPowerInfoModel.subsName': orgNo
     },
     function(data){
    	selByqEchart(data.consMap);
    	myChart2.hideLoading();
		
     },'json');
}

/**
 * 查询变压器容量
 * @param consMap
 */
function selByqEchart(consMap){
	
	option = {
		    title: {
		        x: 'center',
		        text: '变压器容量统计',
		        subtext: '',
		        textStyle: {
					decoration: 'none',
					fontFamily: '微软雅黑, Arial, Verdana, sans-serif',
					fontFamily2: '微软雅黑',    // IE8- 字体模糊并且不支持不同字体混排，额外指定一份
					fontSize: 16,
					fontStyle: 'normal',
					fontWeight: 'normal',
					color: '#0375cd'
		        }
//		        link: 'http://echarts.baidu.com/doc/example.html'
		    },
		    tooltip: {
		        trigger: 'item',
		        formatter : "{b} : {c} 台 "
		    },
		    calculable: true,
		    grid : {
				 x : 20, //左边距离
				 y : 100,//上边距离
				 x2 : 0,//右边距离
				 y2 : 20//下边距离
			},
		    xAxis: [
		        {
		            type: 'category',
		            show: false,
		            data: consMap.plateCapList
		            /*data: ['Line', 'Bar', 'Scatter', 'K', 'Pie', 'Radar', 'Chord', 'Force', 'Map', 'Gauge', 'Funnel']*/
		        }
		    ],
		    yAxis: [
		        {
		            type: 'value',
		            show: false
		        }
		    ],
		    series: [
		        {
		            name: '变压器容量',
		            type: 'bar',
		            itemStyle: {
		                normal: {
		                    color: function(params) {
		                        // build a color map as your need.
		                        var colorList = [
		                          '#61A0A8','#61A0A8','#61A0A8','#61A0A8','#61A0A8',
		                           '#61A0A8','#61A0A8','#61A0A8','#61A0A8','#61A0A8',
		                           '#61A0A8'
		                        ];
		                        return colorList[params.dataIndex]
		                    },
		                    label: {
		                        show: true,
		                        position: 'top',
		                        formatter: '{b}\n{c}台'
		                    }
		                }
		            },
		            data: consMap.plateCapCountList
		            /*data: [12,21,10,4,12,5,6,5,25,23,7]*/
		            
		        }
		    ]
		};
	myChart2.setOption(option,true);            
	
}

/**
 * 查询变压器类型
 */
function selByqType(){
	
	myChart1.showLoading({
		text:'正在努力的读取数据中...',
		effect:'spin'
	});
	
	$.post(webContextRoot +'byq/selByqType.action',{
    	/*'consPowerInfoModel.consId': consId,
        'consPowerInfoModel.dataDate': b,
        'consPowerInfoModel.mon': mon*/
		'consPowerInfoModel.subsName': orgNo
     },
     function(data){
    	selByqTypeEchart(data.consMap);
    	myChart1.hideLoading();
		
     },'json');
}

/**
 * 查询变压器类型echart
 * @param dataMap
 */
function selByqTypeEchart(dataMap){
	 option = { 
			title: {
				x: 'center',
				//y: 15,
				text: '变压器类型统计',
				textStyle: {
						decoration: 'none',
						fontFamily: '微软雅黑, Arial, Verdana, sans-serif',
						fontFamily2: '微软雅黑',    // IE8- 字体模糊并且不支持不同字体混排，额外指定一份
						fontSize: 16,
						fontStyle: 'normal',
						fontWeight: 'normal',
						color: '#0375cd'
				}
			},
			tooltip: {
				trigger: 'item',
				showDelay: 0,
				hideDelay: 0,
				backgroundColor : 'rgba(11,93,156,0.7)',
				borderColor: '#0a5087',
				borderRadius : 8,
				borderWidth: 1,
				padding: 10,
				textStyle : {
						color: '#fff',
						decoration: 'none',
						fontFamily: '微软雅黑, Verdana, sans-serif',
						fontSize: 14,
						fontWeight: 'normal'
				},
				formatter : "{a} <br/>{b} : {c} 台 ({d}%)"
			},
			legend: {
			 	orient : 'vertical',
		        x : 'right',
				data: dataMap.legend				
			},
			calculable : false,
			series : [
					{
							name:'变压器类型',
							type:'pie',
							radius : '60%',
							center: ['45%', '60%'],
							data:dataMap.pie
					}
			]
	};
	 myChart1.setOption(option,true);
}

/**
 * 查询变压器能效统计
 */
function selByqNxtj(){
	var b = $('#dataDate').val();
	myChart.showLoading({
		text:'正在努力的读取数据中...',
		effect:'spin'
	});
	$.post(webContextRoot +'byq/selByqNxtj.action',{
    	/*'consPowerInfoModel.consId': consId,*/
        'consPowerInfoModel.dataDate': b,
        'consPowerInfoModel.subsName': orgNo
     },
     function(data){
    	 selByqNxtjEchart(data.consMap);
    	 myChart.hideLoading();
		
     },'json');
}


var dataType;
var dataTime;
/**
 * 查询变压器能效统计echart
 * @param consMap
 */
function selByqNxtjEchart(consMap){
	option = {
			title: {
		        text: '变压器运行状况统计', 
		        x:'center'
		    },
			tooltip: {
				trigger: 'axis',
				axisPointer: { // 坐标轴指示器，坐标轴触发有效
					type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
				},
				formatter : function(params, ticket, callback) {
					var res = '';
	        		if(params == null ||params[0] == null){
						return;
					}
					for(var i =0;i<params.length;i++){
						if(i==0){
			            	res += params[i].name + '<br/>' + params[i].seriesName + '：' + (params[i].value == null ? '-' : params[i].value) +'次';
						}
						if(i==1){
							res += '<br/>' + params[i].seriesName + '：' + (params[i].value == null ? '-' : params[i].value) +'次';
						}
						if(i==2){
							res += '<br/>' + params[i].seriesName + '：' + (params[i].value == null ? '-' : params[i].value) +'次';
						}
					}
					return res;
				}
			},
			legend: {
				data: ['重载', '过载', '油温越限'],
				x:'center',
		        y:'35'
			},
			grid: {
				left: '10px',
				right: '10px',
				bottom: '10px',
				containLabel: true
			},
			xAxis: [{
				type: 'category',
				//data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
				data: consMap.dataDateList
			}],
			yAxis: [{
				name: '次',
				type: 'value'
			}],
			series: [{
					name: '重载',
					type: 'bar',
					//stack: '分组1',
					//data: [120, 132, 101, 134, 290, 230, 220]
					data: consMap.s1List
				},
				{
					name: '过载',
					type: 'bar',
					//stack: '分组1',
					//data: [60, 72, 71, 74, 190, 130, 110]
					data: consMap.s2List
				},
				{
					name: '油温越限',
					type: 'bar',
					//stack: '分组1',
					//data: [62, 82, 91, 84, 109, 110, 120]
					data: consMap.s3List
				}
			]
		};
	myChart.setOption(option,true);
	
	/**
	 * 点击柱状图查询区域下的运行状况信息 
	 */
	myChart.on("click",function(param){
		if(typeof param.seriesIndex == 'undefined'){
			return;
		}
		
		if(param.seriesIndex == 0){				
			dataType = 1;
		}else if(param.seriesIndex == 1){
			dataType = 2;
		}else if(param.seriesIndex == 2){
			dataType = 3;
		}
		dataTime = param.name;
		$('#yxzk_consId').combobox('setValue','');
		$('#yxzk_plateCap').numberbox('setValue','');
		loadYXZKData(dataType,param.name,null,null);
	});
}

/**
 * 打开运行状况统计查询界面
 */
function openByqSj(){
	$('#consId').combobox('setValue','');
//	$('#tranName').textbox('setValue','');
	$('#plateCap').numberbox('setValue','');
	selByqSj();
}

/**
 * 查询数据列表
 */
function selByqSj(){
	$("#byqSj-dialog").dialog({
		width : document.body.clientWidth-100,
		height : document.body.clientHeight-100,
		top:50,
		left:50
	}); 
	$("#byqSj-dialog").dialog("open");  
	if(byqSj_datagrid==null){
		byqSj_datagrid = $("#byqSj-datagrid").datagrid({    
			url: webContextRoot + "byq/selByqNxtjBg.action",
			loadMsg:'正在加载，请稍等……',//加载时显示提示
			rownumbers:true,
			fit:true,
			fitColumns:true,
			striped: true,
			singleSelect: true,
			queryParams:{
				'consPowerInfoModel.plateCap': $('#plateCap').numberbox('getValue'),
				'consPowerInfoModel.index': '1',
//				'consPowerInfoModel.tranName': $('#tranName').textbox('getValue'),
				'consPowerInfoModel.consId': $.trim($('#consId').combobox('getValue')),
				'consPowerInfoModel.dataDate': $('#dataDate').val(),
				'consPowerInfoModel.subsName': orgNo
			},
			columns:[[
				{field:'consNo',title:'客户编号',width:'10%',align:'left',
					formatter: function(value,row,index){
						return value;
					}
				},
				{field:'consName',title:'客户名称',width:'20%',align:'left',
					formatter: function(value,row,index){
						return HTMLEncode(value);
					}
				},
				{field:'subsName',title:'用户变',width:'20%',align:'left',
					formatter: function(value,row,index){
						return HTMLEncode(value);
					}
				},
				{field:'tranName',title:'变压器',width:'15%',align:'left',
					formatter: function(value,row,index){
						return HTMLEncode(value);
					}
				},
				{field:'plateCap',title:'变压器容量(KVA)',width:'13%',align:'left',
					formatter: function(value,row,index){
						return HTMLEncode(value);
					}
				},
				{field:'runStatus',title:'运行状态',width:'8%',align:'center',
					formatter: function(value,row,index){
						return HTMLEncode(value);
					}
				},
				{field:'s1',title:'过载(次)',width:'8%',align:'center',
					formatter: function(value,row,index){
						return HTMLEncode(value);
					}
				},
				{field:'s2',title:'重载(次)',width:'8%',align:'center',
					formatter: function(value,row,index){
						return HTMLEncode(value);
					}
				},
				{field:'s3',title:'油温越限(次)',width:'8%',align:'center',
					formatter: function(value,row,index){
						return HTMLEncode(value);
					}
				}
			]],
			pagination:true,
			pageSize: 20,
			pageList : [20,50,100],
			onLoadSuccess:function(data){
				var rows = $('#byqSj-datagrid').datagrid("getRows");
				if(rows.length>0){
					$('#byqSj-datagrid').datagrid("selectRow",0);
				}
			}
		});
	}else{
		var plateCap = $('#plateCap').numberbox('getValue');
		$("#byqSj-datagrid").datagrid('load',{
			'consPowerInfoModel.plateCap': $('#plateCap').numberbox('getValue'),
			'consPowerInfoModel.index': '1',
//			'consPowerInfoModel.tranName': $('#tranName').textbox('getValue').trim(),
			'consPowerInfoModel.consId': $.trim($('#consId').combobox('getValue')),
			'consPowerInfoModel.dataDate': $('#dataDate').val().trim()
		});
	}
	
}

/**
*	导出
*/
function excelData(){
	
	$.post(webContextRoot +'byq/selByqNxtjBg.action', //请求路径
		{
			'consPowerInfoModel.plateCap': $('#plateCap').numberbox('getValue'),
//			'consPowerInfoModel.tranName': $('#tranName').textbox('getValue'),
			'consPowerInfoModel.consId': $.trim($('#consId').combobox('getValue')),
			 'consPowerInfoModel.dataDate': $('#dataDate').val()
		},//请求参数
	   	function(data){
			//当期时间作为标志
//			var flag = new Date().format('Y-m-d H:i:s.u');
		 	var flag = DateUtil.dateToStr('yyyy-MM-dd HH:mm:ss',new Date());
		 	var dataDate = $('#dataDate').val();
		 	//导出地址及参数
		 	var urlo = webContextRoot+'byq/exportByq.action?flag=' + flag + '&dataDate=' + dataDate;
		 	//编码
			url = encodeURI(urlo);
			//导出目标
			var exportExcelForm1 = new Ext.form.FormPanel({ 
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
//			Ext.MessageBox.hide();//关闭进度条
			
			//导出进度条的方法
			function getProgress() {
				if(pert < 0.99){//导出进度
					pert = pert + 0.01;
				}
				Ext.Ajax.request({//进度条请求
					url: webContextRoot + 'byq/exportProgress.action?flag=' + flag,
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
		},"json");//返回格式

}

/**
 * 运行状况信息查询按钮
 */
function selYxzk(){
	
	var consId = $.trim($('#yxzk_consId').combobox('getValue'));
	var plateCap = $('#yxzk_plateCap').numberbox('getValue');
	loadYXZKData(dataType,dataTime,consId,plateCap);
}

/**
 * 运行状况信息
 */
function loadYXZKData(dataType,dataDate,consId,plateCap){
	$("#byqYxzk-dialog").dialog({
		width : document.body.clientWidth-100,
		height : document.body.clientHeight-100,
		top:50,
		left:50
	}); 
	$("#byqYxzk-dialog").dialog("open");
	if(dataType == 1){
		$('#byqYxzk-dialog').dialog('setTitle',dataDate+'重载信息');
	}else if(dataType == 2){
		$('#byqYxzk-dialog').dialog('setTitle',dataDate+'过载信息');
	}else if(dataType == 3){
		$('#byqYxzk-dialog').dialog('setTitle',dataDate+'油温越限信息');
	}
	//定义页面dataGrid的Colums列字段。(重载，过载)
	var zgz_colums = [[
				{field:'consNo',title:'客户编号',width:'10%',align:'left',
					formatter: function(value,row,index){
						return value;
					}
				},
	   			{field:'consName',title:'客户名称',width:'20%',align:'left',
					formatter: function(value,row,index){
						return HTMLEncode(value);
					}
				},
				{field:'subsName',title:'用户变',width:'15%',align:'left',
					formatter: function(value,row,index){
						return HTMLEncode(value);
					}
				},
				{field:'tranName',title:'变压器',width:'10%',align:'left',
					formatter: function(value,row,index){
						return HTMLEncode(value);
					}
				},
				{field:'plateCap',title:'变压器容量(KVA)',width:'9%',align:'center',
					formatter: function(value,row,index){
						return value;
					}
				},
				{field:'startTime',title:'开始时间',width:'15%',align:'center',
					formatter: function(value,row,index){
						return HTMLEncode(value);
					}
				},
				{field:'endTime',title:'结束时间',width:'15%',align:'center',
					formatter: function(value,row,index){
						return HTMLEncode(value);
					}
				},
				{field:'intervalTime',title:'持续时长(分钟)',width:'8%',align:'center',
					formatter: function(value,row,index){
						return HTMLEncode(value);
					}
				},
				{field:'avgValue',title:'平均负荷',width:'8%',align:'center',
					formatter: function(value,row,index){
						return HTMLEncode(value);
					}
				}
			]];
	//定义页面dataGrid的Colums列字段。(油温越限)
	var yx_colums = [[
				{field:'consNo',title:'客户编号',width:'10%',align:'left',
					formatter: function(value,row,index){
						return value;
					}
				},      
	   			{field:'consName',title:'客户名称',width:'20%',align:'left',
					formatter: function(value,row,index){
						return HTMLEncode(value);
					}
				},
				{field:'subsName',title:'用户变',width:'15%',align:'left',
					formatter: function(value,row,index){
						return HTMLEncode(value);
					}
				},
				{field:'tranName',title:'变压器',width:'10%',align:'left',
					formatter: function(value,row,index){
						return HTMLEncode(value);
					}
				},
				{field:'plateCap',title:'变压器容量(KVA)',width:'9%',align:'center',
					formatter: function(value,row,index){
						return value;
					}
				},
				{field:'startTime',title:'开始时间',width:'12%',align:'center',
					formatter: function(value,row,index){
						return HTMLEncode(value);
					}
				},
				{field:'endTime',title:'结束时间',width:'12%',align:'center',
					formatter: function(value,row,index){
						return HTMLEncode(value);
					}
				},
				{field:'intervalTime',title:'持续时长(分钟)',width:'8%',align:'center',
					formatter: function(value,row,index){
						return HTMLEncode(value);
					}
				},
				{field:'mpName',title:'测点名称',width:'8%',align:'center',
					formatter: function(value,row,index){
						return HTMLEncode(value);
					}
				},
				{field:'avgValue',title:'平均温度',width:'8%',align:'center',
					formatter: function(value,row,index){
						return HTMLEncode(value);
					}
				}
			]];
	
	if(dataType == 1 || dataType == 2){
		//初始化响应指标dataGrid表格
		$('#byqYxzk-datagrid').datagrid({// 表格
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
			pageSize:20,//在设置分页属性的时候初始化页面大小。
			url:webContextRoot +'byq/querySfTranRunStatusList.action',
			queryParams:{
				'runStatusModel.dataTypeName': dataType,
				'runStatusModel.dataDate': dataDate,
				'runStatusModel.consId': consId,
				'runStatusModel.plateCap': plateCap
			},
			onLoadSuccess : function() {// 加载数据之后
				$('#byqYxzk-datagrid').datagrid('selectRow', 0); // 选择第一行
			},
			loadMsg : "正在努力的读取数据中...",// 提示信息
			columns : zgz_colums,
			loadFilter: function(data){
				if (data.consMap){
					return data.consMap;
				} else {
					return data;
				}
			}
		});
	}else if(dataType == 3){
		//初始化响应指标dataGrid表格
		$('#byqYxzk-datagrid').datagrid({// 表格
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
			pageSize:20,//在设置分页属性的时候初始化页面大小。
			url:webContextRoot +'byq/querySfTranRunStatusList.action',
			queryParams:{
				'runStatusModel.dataTypeName': dataType,
				'runStatusModel.dataDate': dataDate,
				'runStatusModel.consId': consId,
				'runStatusModel.plateCap': plateCap
			},
			onLoadSuccess : function() {// 加载数据之后
				$('#byqYxzk-datagrid').datagrid('selectRow', 0); // 选择第一行
			},
			loadMsg : "正在努力的读取数据中...",// 提示信息
			columns : yx_colums,
			loadFilter: function(data){
				if (data.consMap){
					return data.consMap;
				} else {
					return data;
				}
			}
		});
	}
	
	
}




