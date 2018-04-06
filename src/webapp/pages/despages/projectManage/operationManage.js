/**
 * 运维管理
 * @author 孟子杰
 * @since 2017-05-18
 */
var currentDate = new Date();
var searchType = null; //查询类型
var myChart = null;
var firstTimer = null ; //第一次加载定时器
var gdwin =null;//工单窗口
var byq_datagrid = null;//变压器datagrid对象
var mx_datagrid = null;//母线datagrid对象
var line_datagrid = null;//线路datagrid对象
var other_datagrid = null;//其他设备datagrid对象
var nxsb_datagrid = null;//能效设备datagrid对象
var run_status_tran_flag = 0;//变压器运行状态首次加载变量
var run_status_bs_flag = 0;//母线运行状态首次加载变量
var run_status_line_flag = 0;//线路运行状态首次加载变量
var run_status_other_flag = 0;//其他设备运行状态首次加载变量
//js入口
$(function(){
	myChart = echarts.init(document.getElementById('chart-panel'));
	
	$('#startDate').val(DateUtil.dateToStr('yyyy-MM',currentDate));
	 //左减日期
	$('#left').click(function(){
		var startDate =  $('#startDate').val();//获取当前开始日期
		var nowDate = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('m',-1,DateUtil.strToDate(startDate)));//月份减1
		$('#startDate').val(nowDate.substr(0,7));//重新赋值
		selectOperationChartData();
	});
	 //右加日期
	$('#right').click(function(){
		var startDate =  $('#startDate').val();//开始日期
		var nowDate = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('m',1,DateUtil.strToDate(startDate)));//月份加1
		$('#startDate').val(nowDate.substr(0,7));//重新赋值
		selectOperationChartData();
	});
	
	firstSearch();
	
	 //业务类型
	$('#run_status').combobox({//业务类型
		url:webContextRoot +'pCode/queryCode.action?codeSortId=70033',
		valueField: 'codeValue',
		textField: 'codeName' ,
		onLoadSuccess: function(){
//			if(run_status_tran_flag==0){
//				var data = 	$(this).combobox('getData');
//				data.splice(0,0,{'id':'0','codeName':'请选择','codeValue':''});
//				run_status_tran_flag++;
//				$(this).combobox('loadData',data);
//			}
		}
		/*onChange: function(newValue, oldValue){
			wnGrade = newValue;
		},onLoadSuccess: function(){
			$('#run_status').combobox('setValue', 1);
		}*/
	});
	//业务类型
	$('#run_status_mx').combobox({//业务类型
		url:webContextRoot +'pCode/queryCode.action?codeSortId=70033',
		valueField: 'codeValue',
		textField: 'codeName' ,
		onLoadSuccess: function(){
//			if(run_status_bs_flag==0){
//				var data = 	$(this).combobox('getData');
//				data.splice(0,0,{'id':'0','codeName':'请选择','codeValue':''});
//				run_status_bs_flag++;
//				$(this).combobox('loadData',data);
//			}
		}
		/*onChange: function(newValue, oldValue){
			wnGrade = newValue;
		},onLoadSuccess: function(){
			$('#run_status_mx').combobox('setValue', 1);
		}*/
	});
	//业务类型
	$('#run_status_xl').combobox({//业务类型
		url:webContextRoot +'pCode/queryCode.action?codeSortId=70033',
		valueField: 'codeValue',
		textField: 'codeName' ,
		onLoadSuccess: function(){
//			if(run_status_line_flag==0){
//				var data = 	$(this).combobox('getData');
//				data.splice(0,0,{'id':'0','codeName':'请选择','codeValue':''});
//				run_status_line_flag++;
//				$(this).combobox('loadData',data);
//			}
		}
		/*onChange: function(newValue, oldValue){
			wnGrade = newValue;
		},onLoadSuccess: function(){
			$('#run_status_xl').combobox('setValue', 1);
		}*/
	});
	//业务类型
	$('#run_status_nxsb').combobox({//业务类型
		url:webContextRoot +'pCode/queryCode.action?codeSortId=70033',
		valueField: 'codeValue',
		textField: 'codeName' ,
		onLoadSuccess: function(){
//			if(run_status_line_flag==0){
//				var data = 	$(this).combobox('getData');
//				data.splice(0,0,{'id':'0','codeName':'请选择','codeValue':''});
//				run_status_line_flag++;
//				$(this).combobox('loadData',data);
//			}
		}
	/*onChange: function(newValue, oldValue){
			wnGrade = newValue;
		},onLoadSuccess: function(){
			$('#run_status_xl').combobox('setValue', 1);
		}*/
	});
	//业务类型
	$('#run_status_qt').combobox({//业务类型
		url:webContextRoot +'pCode/queryCode.action?codeSortId=70033',
		valueField: 'codeValue',
		textField: 'codeName' ,
		onLoadSuccess: function(){
//			if(run_status_other_flag==0){
//				var data = 	$(this).combobox('getData');
//				data.splice(0,0,{'id':'0','codeName':'请选择','codeValue':''});
//				run_status_other_flag++;
//				$(this).combobox('loadData',data);
//			}
		}
		/*onChange: function(newValue, oldValue){
			wnGrade = newValue;
		},onLoadSuccess: function(){
			$('#run_status_qt').combobox('setValue', 1);
		}*/
	});
});

/**
 * 页面加载 首次查询
 * 查运维数据  和  echart图
 */
function firstSearch(){
	if($('#startDate').val()!=null&&$('#startDate').val()!=''){
		selectOperationData();
		selectOperationChartData();
		//取消定时器
		if(firstTimer!=null) window.clearInterval(firstTimer);
	}else{
		//设置定时器
		if(firstTimer==null) firstTimer = setInterval(firstSearch, 200);
	}
}

/**
 * 查询运维数据
 */
function selectOperationData(){
	$.ajax({	
		url:webContextRoot+'operationManage/selectOperationData.action', 
		dataType:'json',
		type:'post',
		data:{
			'data':top.areaNo
		},
		success:function(result){
//			console.log(result);
			if(result.flag=='success'){
				//当日告警
				$('#drgj').html("<a onClick=\"openGj(1);\" style=\"color: #FFFFFF;cursor: pointer;\">"+result.data.drgj+"</a>");
				//本周告警
				$('#bzgj').html("<a onClick=\"openGj(2);\" style=\"color: #FFFFFF;cursor: pointer;\">"+result.data.bzgj+"</a>");
				//进行工单
				$('#jxgd').html("<a onClick=\"openGd(1);\" style=\"color: #FFFFFF;cursor: pointer;\">"+result.data.jxgd+"</a>");
				//超时工单
				$('#csgd').html("<a onClick=\"openGd(2);\" style=\"color: #FFFFFF;cursor: pointer;\">"+result.data.csgd+"</a>");
				//当日工单
				$('#drgd').html("<a onClick=\"openGd(3);\" style=\"color: #FFFFFF;cursor: pointer;\">"+result.data.drgd+"</a>");
				//本周工单
				$('#bzgd').html("<a onClick=\"openGd(4);\" style=\"color: #FFFFFF;cursor: pointer;\">"+result.data.bzgd+"</a>");
//				console.log(top.areaNo);
				if(top.areaNo=='101'){
					//终端在线率
					$('#zdzxl').html("<a onClick=\"openTerminal();\" style=\"color: #FFFFFF;cursor: pointer;\">98%</a>"); //openTerminal()
					//测点在线率
					$('#cdzxl').html("100%");
				}else{
					//终端在线率
					$('#zdzxl').html("<a onClick=\"openTerminal();\" style=\"color: #FFFFFF;cursor: pointer;\">"+result.data.zdzxl+"</a>"); //openTerminal()
					//测点在线率
					$('#cdzxl').html(result.data.cdzxl);
				}
				//超时检修设备
				$('#csjxsb').html("<a onClick=\"openOutTimeCheckDev();\" style=\"color: #FFFFFF;cursor: pointer;\">"+result.data.csjxsb+"</a>");//openOutTimeCheckDev()
				//异常运行设备
				$('#ycyxsb').html("<a onClick=\"openYcyxsb();\" style=\"color: #FFFFFF;cursor: pointer;\">"+result.data.ycyxsb+"</a>");
				
				//变压器  运行、异常、停运、待检、总数
				$('#tran_run').html("<a onClick=\"openTran(1);\" class='fc1' style=\"cursor: pointer;\">"+result.data.tran_run+"</a>");
				$('#tran_exception').html("<a onClick=\"openTran(2);\" class='gj' style=\"cursor: pointer;\">"+result.data.tran_exception+"</a>");
				$('#tran_stop').html("<a onClick=\"openTran(3);\" class='fc2' style=\"cursor: pointer;\">"+result.data.tran_stop+"</a>");
				$('#tran_check').html("<a onClick=\"openTran(4);\" class='fc3' style=\"cursor: pointer;\">"+result.data.tran_check+"</a>");
				$('#tran_total').html("<a onClick=\"openTran();\" class='fc4' style=\"cursor: pointer;\">"+result.data.tran_total+"</a>");
				//母线  运行、异常、停运、待检、总数
				$('#bs_run').html("<a onClick=\"openBS(1);\" class='fc1' style=\"cursor: pointer;\">"+result.data.bs_run+"</a>");
				$('#bs_exception').html("<a onClick=\"openBS(2);\" class='gj' style=\"cursor: pointer;\">"+result.data.bs_exception+"</a>");
				$('#bs_stop').html("<a onClick=\"openBS(3);\" class='fc2' style=\"cursor: pointer;\">"+result.data.bs_stop+"</a>");
				$('#bs_check').html("<a onClick=\"openBS(4);\" class='fc3' style=\"cursor: pointer;\">"+result.data.bs_check+"</a>");
				$('#bs_total').html("<a onClick=\"openBS();\" class='fc4' style=\"cursor: pointer;\">"+result.data.bs_total+"</a>");
				//线路  运行、异常、停运、待检、总数
				$('#line_run').html("<a onClick=\"openLine(1);\" class='fc1' style=\"cursor: pointer;\">"+result.data.line_run+"</a>");
				$('#line_exception').html("<a onClick=\"openLine(2);\" class='gj' style=\"cursor: pointer;\">"+result.data.line_exception+"</a>");
				$('#line_stop').html("<a onClick=\"openLine(3);\" class='fc2' style=\"cursor: pointer;\">"+result.data.line_stop+"</a>");
				$('#line_check').html("<a onClick=\"openLine(4);\" class='fc3' style=\"cursor: pointer;\" >"+result.data.line_check+"</a>");
				$('#line_total').html("<a onClick=\"openLine();\" class='fc4' style=\"cursor: pointer;\">"+result.data.line_total+"</a>");
				//其他设备  运行、异常、停运、待检、总数
				$('#other_run').html("<a onClick=\"openOther(1);\" class='fc1' style=\"cursor: pointer;\">"+result.data.other_run+"</a>");
				$('#other_exception').html("<a onClick=\"openOther(2);\" class='gj' style=\"cursor: pointer;\">"+result.data.other_exception+"</a>");
				$('#other_stop').html("<a onClick=\"openOther(3);\" class='fc2' style=\"cursor: pointer;\">"+result.data.other_stop+"</a>");
				$('#other_check').html("<a onClick=\"openOther(4);\" class='fc3' style=\"cursor: pointer;\" >"+result.data.other_check+"</a>");
				$('#other_total').html("<a onClick=\"openOther();\" class='fc4' style=\"cursor: pointer;\">"+result.data.other_total+"</a>");
				//能效设备  运行、异常、停运、待检、总数
				$('#nxsb_run').html("<a onClick=\"openNxsb(1);\" class='fc1' style=\"cursor: pointer;\">"+result.data.nxsb_run+"</a>");
				$('#nxsb_exception').html("<a onClick=\"openNxsb(2);\" class='gj' style=\"cursor: pointer;\">"+result.data.nxsb_exception+"</a>");
				$('#nxsb_stop').html("<a onClick=\"openNxsb(3);\" class='fc2' style=\"cursor: pointer;\">"+result.data.nxsb_stop+"</a>");
				$('#nxsb_check').html("<a onClick=\"openNxsb(4);\" class='fc3' style=\"cursor: pointer;\" >"+result.data.nxsb_check+"</a>");
				$('#nxsb_total').html("<a onClick=\"openNxsb();\" class='fc4' style=\"cursor: pointer;\">"+result.data.nxsb_total+"</a>");
			}
		}
	});
}

/**
 * 查询运维echart图数据
 */
function selectOperationChartData(){
	myChart.showLoading({
		text:'正在努力的读取数据中...',
		effect:'spin'
	});
	$.ajax({	
		url:webContextRoot+'operationManage/selectOperationChartData.action', 
		data:{
			'date' :  $('#startDate').val() ,  //设备类型
		},
		dataType:'json',
		type:'post',
		success:function(result){
			if(result.flag=='success'){
				echartOption(result.data);
			}
			myChart.hideLoading();
		}
	});
}

/**
 * 设置echart图的option
 */
function echartOption(result){
	//检修记录、巡视记录、缺陷处理记录、抢修记录
	option = {
			tooltip : {
				trigger : 'axis',
				axisPointer : { // 坐标轴指示器，坐标轴触发有效
					type : 'shadow' // 默认为直线，可选为：'line' | 'shadow'
				}
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
			legend : {
				data : [ '检修记录', '巡视记录', '缺陷处理记录' , '抢修记录']
			},
			grid : {
				left: '1%',
		        right: '1%',
				bottom : '3%',
				containLabel : true
			},
			xAxis : [ {
				type : 'category',
				data : result.time
			} ],
			yAxis : [ {
				type : 'value'
			} ],
			series : [ {
				name : '检修记录',
				type : 'bar',
				stack : '分组1',
				data : result.check
			}, {
				name : '巡视记录',
				type : 'bar',
				stack : '分组1',
				data : result.tour
			}, {
				name : '缺陷处理记录',
				type : 'bar',
				stack : '分组1',
				data : result.defect
			} , {
				name : '抢修记录',
				type : 'bar',
				stack : '分组1',
				data : result.repair
			}]
		};

		myChart.setOption(option);
}

/**
 * 选中查询时间的触发事件
 */
function changeDate(){
	selectOperationChartData();
}
/**
 * 弹出告警
 */
function openGj(type){
//	var queryType = '';
//	queryType //告警时间类型（0-请选择、1-当天、2-两天内、3-三天内、4-最近一周、5-其他）
//	deviceType //设备类型
//	alarmType //告警类型（1-实时、2-历史）
//	consId //获取调用父页面传过来的参数
//	startTime //开始时间
//	endTime //结束时间
	startTime = null;
	endTime = null;
	if(type==1){
		//当日
		startTime = DateUtil.dateToStr('yyyy-MM-dd',currentDate) + "%2000:00:00";
		endTime = DateUtil.dateToStr('yyyy-MM-dd',currentDate) + "%2023:59:59";
	}else if(type==2){
		//本周
		startTime = getFirstDayOfWeek(currentDate);
		endTime = DateUtil.dateAdd('d',6,startTime);
		startTime = DateUtil.dateToStr('yyyy-MM-dd',startTime) + "%2000:00:00";
		endTime = DateUtil.dateToStr('yyyy-MM-dd',endTime) + "%2023:59:59";
	}
	var options = {
	        name: 'desgjcx',               //需要打开的菜单的关键字,必须保证正确
	        text: '告警查询',           //打开菜单的标题,可修改  startTime  endTime  yyyy-mm-dd hh24:mi:ss
	        path: '/des/pages/despages/warn/GaoJingChaXun.jsp?queryType=5&alarmType=1&startTime='+startTime+'&endTime='+endTime+''//告警类型 alarmType 1:实时告警 ,2:历史告警
	    };
	top.reloadTabPage(options);
}
/**
 * 弹出工单 
 */
function openGd(type){
	//超时工单type=2，当日工单type=3，本周工单type=4
	var options = {
        name: 'des_gdgl',               //需要打开的菜单的关键字,必须保证正确
        text: '工单管理',           //打开菜单的标题,可修改
        path: '/des/pages/despages/labour/labour.jsp?subsId=0&ywType='+type
    };
    top.reloadTabPage(options);
}
/**
 * 弹出终端
 */
function openTerminal(){
	$("#zd_tmnlAssetNo").textbox("setValue","");
	$("#zd_terminalTypeCode").combobox({
		url:webContextRoot +'pCode/queryCode.action?codeSortId=70067',
		valueField: 'codeValue',
		textField: 'codeName' 
	});
	$("#zd-dialog").dialog({
		width : document.body.clientWidth-100,
		height : document.body.clientHeight-100,
		top:50,
		left:50
	}); 
	$("#zd-dialog").dialog("open");  
	$("#zd-datagrid").datagrid({    
		url: webContextRoot + "operationManage/selectTerminal.action",
		loadMsg:'正在加载，请稍等……',//加载时显示提示
		rownumbers:true,
		fit:true,
		fitColumns:true,
		striped: true,
		singleSelect: true,
		queryParams:{
			'oom.searchType' :searchType  //传参为了清空上次传参记录
		},
		columns:[[
			{field:'tmnlAssetNo',title:'终端资产号',width:50,align:'left',
				formatter: function(value,row,index){
					return HTMLEncode(value);
				}
			},
			{field:'terminalTypeName',title:'终端类型',width:50,align:'center',
				formatter: function(value,row,index){
					// 1：实时终端 2：能效终端 3：智能网关 4：小区能源通讯机
//					if(value == 1){
//						return '实时终端';
//					}else if(value == 2){
//						return '能效终端';
//					}else if(value == 3){
//						return '智能网关';
//					}else if(value == 4){
//						return '小区能源通讯机';
//					}else if(value == 5){
//						return '非侵入式负荷终端';
//					}else{
//						return HTMLEncode(value);
//					}
					return HTMLEncode(value);
				}
			},
			{field:'terminalKind',title:'终端型号',width:50,align:'left',
				formatter: function(value,row,index){
					return HTMLEncode(value);
				}
			},
			{field:'state',title:'运行状态',width:50,align:'center',
				formatter: function(value,row,index){
					return HTMLEncode(value);
				}
			},
			{field:'isOnline',title:'在线状态',width:50,align:'center',
				formatter: function(value,row,index){
					return HTMLEncode(value);
				}
			}
		]],
		pagination:true,
		pageSize: 20,
		pageList : [20,50,100],
		onLoadSuccess:function(data){
			var rows = $('#zd-datagrid').datagrid("getRows");
			if(rows.length>0){
				$('#zd-datagrid').datagrid("selectRow",0);
			}
		}
	});  
}
/**
 * 终端弹出框  查询按钮
 */
function bt_zd_search(){
	var tmnlAssetNo = $.trim($('#zd_tmnlAssetNo').textbox("getValue"));
	var terminalTypeCode = $('#zd_terminalTypeCode').combobox("getValue");
	$("#zd-datagrid").datagrid('load',{
		'oom.tmnlAssetNo':tmnlAssetNo,
		'oom.terminalTypeCode':terminalTypeCode
	});
}

/**
 * 弹出超时检修设备
 */
function openOutTimeCheckDev(){
	$("#csjxsb_dev_name").textbox("setValue","");
//	$("#csjxsb_cons_name").textbox("setValue","");
	$('#csjxsb_cons_name').combobox({    
		url:webContextRoot +'destree/queryConsList.action',
		valueField: 'id',
		textField: 'text' ,
//	    onChange: function(newValue, oldValue){
////	    	if(newValue!=''){
////					 newValue = $('#csjxsb_cons_name').combobox('getText');
////						$.getJSON(webContextRoot + 'destree/queryTree.action?isQyCode=false&ziMu='+newValue,{ 
////								},
////								function(json){
////									$('#csjxsb_cons_name').combobox('loadData',json);	
////								}
////										);
////	    	}else{
////	    		 newValue = $('#csjxsb_cons_name').combobox('getText');
////					$.getJSON(webContextRoot + 'destree/queryTree.action?isQyCode=false&ziMu=',{ 
////							},
////							function(json){
////								$('#csjxsb_cons_name').combobox('loadData',json);	
////							}
////					);
////					
////	    	}	
////		},
////    	onSelect:function(){
////			$.getJSON(webContextRoot + 'destree/queryTree.action?isQyCode=false&ziMu=',{ 
////					},
////					function(json){
////						$('#csjxsb_cons_name').combobox('loadData',json);	
////					}
////			);
//		}
		mode : 'remote',
		onHidePanel : function(){$('#csjxsb_cons_name').combobox('reload');}
	});
	$("#csjxsb-dialog").dialog({
		width : document.body.clientWidth-100,
		height : document.body.clientHeight-100,
		top:50,
		left:50
	}); 
	$("#csjxsb-dialog").dialog("open");  
	$("#csjxsb-datagrid").datagrid({    
		url: webContextRoot + "operationManage/selectOutTimeCheckDev.action",
		loadMsg:'正在加载，请稍等……',//加载时显示提示
		rownumbers:true,
		fit:true,
		fitColumns:true,
		striped: true,
		singleSelect: true,
		queryParams:{
			'oom.searchType' :searchType  //传参为了清空上次传参记录
		},
		columns:[[
	          {field:'devName',title:'设备名称',width:50,align:'left',
	        	  formatter: function(value,row,index){
	        		  return HTMLEncode(value);
	        	  }
	          },
	          {field:'devType',title:'设备类型',width:50,align:'center',
	        	  formatter: function(value,row,index){
	        		  if(value == null || value == '') return '能效设备';
	        		  return HTMLEncode(value);
	        	  }
	          },
	          {field:'subsName',title:'建筑名称',width:50,align:'left',
	        	  formatter: function(value,row,index){
	        		  return HTMLEncode(value);
	        	  }
	          },
	          {field:'consNo',title:'客户编号',width:50,align:'left',
	        	  formatter: function(value,row,index){
	        		  return HTMLEncode(value);
	        	  }
	          },
	          {field:'consName',title:'客户名称',width:50,align:'left',
	        	  formatter: function(value,row,index){
	        		  return HTMLEncode(value);
	        	  }
	          },
	          {field:'nextCheckDate',title:'下次检修时间',width:50,align:'center',
	        	  formatter: function(value,row,index){
	        		  return HTMLEncode(value.substr(0,10));
	        	  }
	          },
	          {field:'outTime',title:'超时时间(天)',width:50,align:'right',
	        	  formatter: function(value,row,index){
	        		  if(value!=null&&value!=""){
	        			  return parseFloat(value);
	        		  }
	        		  return HTMLEncode(value);
	        	  }
	          }
	          ]],
	          pagination:true,
			  pageSize: 20,
			  pageList : [20,50,100],
	          onLoadSuccess:function(data){
	        	  var rows = $('#csjxsb-datagrid').datagrid("getRows");
	        	  if(rows.length>0){
	        		  $('#csjxsb-datagrid').datagrid("selectRow",0);
	        	  }
	          }
	});  
}
/**
 * 超时检修设备  查询按键
 */
function bt_csjxsb_search(){
	var devName = $.trim($("#csjxsb_dev_name").textbox("getValue"));
	var consName = $.trim($("#csjxsb_cons_name").combobox("getText"));
	$("#csjxsb-datagrid").datagrid('load',{
		'oom.devName': devName,
		'oom.consName': consName
	});
}

/**
 * 弹出异常运行设备
 */
function openYcyxsb(){
	var options = {
	        name: 'desgjcx',               //需要打开的菜单的关键字,必须保证正确
	        text: '告警查询',           //打开菜单的标题,可修改
	        path: '/des/pages/despages/warn/GaoJingChaXun.jsp?queryType=0&alarmType=1'//告警类型 alarmType 1:实时告警 ,2:历史告警  queryType=0查询时间
	    };
	top.reloadTabPage(options);
}


/**
 * 弹出变压器
 */
function openTran(type){
	//弹出告警页面
	if(type==2){
		var options = {
		        name: 'desgjcx',               //需要打开的菜单的关键字,必须保证正确
		        text: '告警查询',           //打开菜单的标题,可修改
		        path: '/des/pages/despages/warn/GaoJingChaXun.jsp?queryType=0&alarmType=1&deviceType=3'//告警类型 alarmType 1:实时告警 ,2:历史告警  queryType=0查询时间
		    };
		top.reloadTabPage(options);
		return;
	}
	
	//弹出正常、停运、待检、总数  窗口
	searchType = type;
	qingkong();
	$("#byq-dialog").dialog({
		width : document.body.clientWidth-100,
		height : document.body.clientHeight-100,
		top:50,
		left:50
	}); 
	$("#byq-dialog").dialog("open");  
	//判断datagrid是否有对象，是则加载，否则初始化对象
	if(byq_datagrid==null){
		byq_datagrid = $("#byq-datagrid").datagrid({    
			url: webContextRoot + "operationManage/selectTranList.action",
			loadMsg:'正在加载，请稍等……',//加载时显示提示
			rownumbers:true,
			fit:true,
			fitColumns:true,
			striped: true,
			singleSelect: true,
			queryParams:{
				'dif.state' :type,
				'dif.deceviceType' :3
			},
			columns:[[
	          {field:'tran_no',title:'变压器编号',width:50,align:'left',
	        	  formatter: function(value,row,index){
	        		  return HTMLEncode(value);
	        	  }
	          },
				{field:'tran_name',title:'变压器名称',width:40,align:'left',
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
			'dif.deceviceType' :3
		});
	}
	
}
/**
 * 弹出母线
 */
function openBS(type){
	//弹出告警页面
	if(type==2){
		var options = {
		        name: 'desgjcx',               //需要打开的菜单的关键字,必须保证正确
		        text: '告警查询',           //打开菜单的标题,可修改
		        path: '/des/pages/despages/warn/GaoJingChaXun.jsp?queryType=0&alarmType=1&deviceType=2'//告警类型 alarmType 1:实时告警 ,2:历史告警  queryType=0查询时间
		    };
		top.reloadTabPage(options);
		return;
	}
	//弹出正常、停运、待检、总数  窗口
	searchType = type;
	qingkong();
	$("#mx-dialog").dialog({
		width : document.body.clientWidth-100,
		height : document.body.clientHeight-100,
		top:50,
		left:50
	}); 
	$("#mx-dialog").dialog("open");  
	//判断datagrid是否有对象，是则加载，否则初始化对象
	if(mx_datagrid==null){
		mx_datagrid = $("#mx-datagrid").datagrid({    
			url: webContextRoot + "operationManage/selectTranList.action",
			loadMsg:'正在加载，请稍等……',//加载时显示提示
			rownumbers:true,
			fit:true,
			fitColumns:true,
			striped: true,
			singleSelect: true,
			queryParams:{
				'dif.state' :type,
				'dif.deceviceType' :2
			},
			columns:[[
			          {field:'bs_id',title:'母线编号',hidden:true,width:50,align:'left',
			        	  formatter: function(value,row,index){
			        		  return HTMLEncode(value);
			        	  }
			          },
			          {field:'bs_name',title:'母线名称',width:40,align:'left',
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
			          {field:'volt_code',title:'电压等级',width:20,align:'right',
			        	  formatter: function(value,row,index){
			        		  return HTMLEncode(value);
			        	  }
			          },
			          {field:'volt_level',title:'降压等级',width:30,align:'right',
			        	  formatter: function(value,row,index){
			        		  return HTMLEncode(value+"级");
			        	  }
			          },
			          {field:'pt_ratio',title:'电压变比',width:30,hidden:true,align:'center',
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
	        	  var rows = $('#mx-datagrid').datagrid("getRows");
	        	  if(rows.length>0){
	        		  $('#mx-datagrid').datagrid("selectRow",0);
	        	  }
	          }
		}); 
	}else{
		$("#mx-datagrid").datagrid("load",{
			'dif.state' :type,
			'dif.deceviceType' :2
		});
	}
}
/**
 * 弹出线路
 */
function openLine(type){
	//弹出告警页面
	if(type==2){
		var options = {
		        name: 'desgjcx',               //需要打开的菜单的关键字,必须保证正确
		        text: '告警查询',           //打开菜单的标题,可修改
		        path: '/des/pages/despages/warn/GaoJingChaXun.jsp?queryType=0&alarmType=1&deviceType=1'//告警类型 alarmType 1:实时告警 ,2:历史告警  queryType=0查询时间
		    };
		top.reloadTabPage(options);
		return;
	}
	//弹出正常、停运、待检、总数  窗口
	searchType = type;
	qingkong();
	$("#line-dialog").dialog({
		width : document.body.clientWidth-100,
		height : document.body.clientHeight-100,
		top:50,
		left:50
	}); 
	$("#line-dialog").dialog("open");  
	//判断datagrid是否有对象，是则加载，否则初始化对象
	if(line_datagrid==null){
		line_datagrid = $("#line-datagrid").datagrid({    
			url: webContextRoot + "operationManage/selectTranList.action",
			loadMsg:'正在加载，请稍等……',//加载时显示提示
			rownumbers:true,
			fit:true,
			fitColumns:true,
			striped: true,
			singleSelect: true,
			queryParams:{
				'dif.state' :type,
				'dif.deceviceType' :1
			},
			columns:[[
			          {field:'line_id',title:'线路编号',hidden:true,width:50,align:'left',
			        	  formatter: function(value,row,index){
			        		  return HTMLEncode(value);
			        	  }
			          },
			          {field:'line_name',title:'线路名称',width:40,align:'left',
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
			          {field:'volt_code',title:'电压等级',width:20,align:'right',
			        	  formatter: function(value,row,index){
			        		  return HTMLEncode(value);
			        	  }
			          },
			          {field:'pt_ratio',title:'电压变比',width:30,hidden:true,align:'center',
			        	  formatter: function(value,row,index){
			        		  return HTMLEncode(value);
			        	  }
			          },
			          {field:'ct_ratio',title:'电流变比',width:30,hidden:true,align:'center',
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
	        	  var rows = $('#line-datagrid').datagrid("getRows");
	        	  if(rows.length>0){
	        		  $('#line-datagrid').datagrid("selectRow",0);
	        	  }
	          }
		});  
	}else{
		$("#line-datagrid").datagrid("load",{
			'dif.state' :type,
			'dif.deceviceType' :1
		});
	}
}
/**
 * 弹出其他设备
 */
function openOther(type){
	//弹出告警页面
	if(type==2){
		var options = {
		        name: 'desgjcx',               //需要打开的菜单的关键字,必须保证正确
		        text: '告警查询',           //打开菜单的标题,可修改
		        path: '/des/pages/despages/warn/GaoJingChaXun.jsp?queryType=0&alarmType=1&deviceType=4'//告警类型 alarmType 1:实时告警 ,2:历史告警  queryType=0查询时间
		    };
		top.reloadTabPage(options);
		return;
	}
	//弹出正常、停运、待检、总数  窗口
	searchType = type;
	qingkong();
	$("#other-dialog").dialog({
		width : document.body.clientWidth-100,
		height : document.body.clientHeight-100,
		top:50,
		left:50
	}); 
	$("#other-dialog").dialog("open");  
	//判断datagrid是否有对象，是则加载，否则初始化对象
	if(other_datagrid==null){
		other_datagrid = $("#other-datagrid").datagrid({    
			url: webContextRoot + "operationManage/selectTranList.action",
			loadMsg:'正在加载，请稍等……',//加载时显示提示
			rownumbers:true,
			fit:true,
			fitColumns:true,
			striped: true,
			singleSelect: true,
			queryParams:{
				'dif.state' :type,
				'dif.deceviceType' :4
			},
			columns:[[
			          {field:'device_id',title:'编号',hidden:true,width:50,align:'left',
			        	  formatter: function(value,row,index){
			        		  return HTMLEncode(value);
			        	  }
			          },
			          {field:'device_name',title:'设备名称',width:40,align:'left',
			        	  formatter: function(value,row,index){
			        		  return HTMLEncode(value);
			        	  }
			          },
			          {field:'device_type',title:'设备类型',width:40,align:'left',
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
			          {field:'factory_code',title:'生产厂家',width:20,hidden:true,align:'center',
			        	  formatter: function(value,row,index){
			        		  return HTMLEncode(value);
			        	  }
			          },
			          {field:'is_decevice',title:'是否电气设备',width:30,align:'center',
			        	  formatter: function(value,row,index){
			        		  if(value == 1){
			        			  return "是";
			        		  }
			        		  if(value == 0){
			        			  return "否";
			        		  }
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
	        	  var rows = $('#other-datagrid').datagrid("getRows");
	        	  if(rows.length>0){
	        		  $('#other-datagrid').datagrid("selectRow",0);
	        	  }
	          }
		});  
	}else{
		$("#other-datagrid").datagrid("load",{
			'dif.state' :type,
			'dif.deceviceType' :4
		});
	}
}
/**
 * 弹出能效设备
 */
function openNxsb(type){
	//弹出告警页面
	if(type==2){
		var options = {
				name: 'desgjcx',               //需要打开的菜单的关键字,必须保证正确
				text: '告警查询',           //打开菜单的标题,可修改
				path: '/des/pages/despages/warn/GaoJingChaXun.jsp?queryType=0&alarmType=1&deviceType=98'//告警类型 alarmType 1:实时告警 ,2:历史告警  queryType=0查询时间
		};
		top.reloadTabPage(options);
		return;
	}
	//弹出正常、停运、待检、总数  窗口
	searchType = type;
	qingkong();
	$("#nxsb-dialog").dialog({
		width : document.body.clientWidth-100,
		height : document.body.clientHeight-100,
		top:50,
		left:50
	}); 
	$("#nxsb-dialog").dialog("open");  
	//判断datagrid是否有对象，是则加载，否则初始化对象
	if(nxsb_datagrid==null){
		nxsb_datagrid = $("#nxsb-datagrid").datagrid({    
			url: webContextRoot + "operationManage/selectTranList.action",
			loadMsg:'正在加载，请稍等……',//加载时显示提示
			rownumbers:true,
			fit:true,
			fitColumns:true,
			striped: true,
			singleSelect: true,
			queryParams:{
				'dif.state' :type,
				'dif.deceviceType' :5
			},
			columns:[[
			          {field:'line_id',title:'设备编号',hidden:true,width:50,align:'left',
			        	  formatter: function(value,row,index){
			        		  return HTMLEncode(value);
			        	  }
			          },
			          {field:'line_name',title:'设备名称',width:40,align:'left',
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
			          {field:'volt_code',title:'电压等级',width:20,align:'right',
			        	  formatter: function(value,row,index){
			        		  return HTMLEncode(value);
			        	  }
			          },
			          {field:'pt_ratio',title:'电压变比',width:30,hidden:true,align:'center',
			        	  formatter: function(value,row,index){
			        		  return HTMLEncode(value);
			        	  }
			          },
			          {field:'ct_ratio',title:'电流变比',width:30,hidden:true,align:'center',
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
			        	  var rows = $('#nxsb-datagrid').datagrid("getRows");
			        	  if(rows.length>0){
			        		  $('#nxsb-datagrid').datagrid("selectRow",0);
			        	  }
			          }
		});  
	}else{
		$("#nxsb-datagrid").datagrid("load",{
			'dif.state' :type,
			'dif.deceviceType' :5
		});
	}
}
/**
 * 变压器条件查询
 */
function byq_search(){
//	var tran_id =$.trim($('#tran_id').textbox('getValue'));
	var tran_name =$.trim($('#tran_name').textbox('getValue'));
	var cons_name =$.trim($('#cons_name').combobox('getText'));
	var run_status =$('#run_status').combobox('getText');
	run_status =run_status=='请选择'?'':run_status;
	$('#byq-datagrid').datagrid('load',{
//		   'dif.tran_id':tran_id,//变压器编号
		   'dif.tran_name':tran_name,//变压器名称
		   'dif.cons_name':cons_name,//客户名称
		   'dif.state' :searchType,
		   'dif.deceviceType' :3,
		   'dif.run_status' :run_status
	});
}
/**
 * 母线条件查询
 */
function mx_search(){
//	var bs_id =$.trim($('#bs_id').textbox('getValue'));
	var bs_name =$.trim($('#bs_name').textbox('getValue'));
	var cons_name =$.trim($('#cons_name1').combobox('getText'));
	var run_status_mx =$('#run_status_mx').combobox('getText');
	run_status_mx =run_status_mx=='请选择'?'':run_status_mx;
	$('#mx-datagrid').datagrid('load',{
//		'dif.bs_id':bs_id,//母线编号
		'dif.bs_name':bs_name,//母线名称
		'dif.cons_name':cons_name,//客户名称
		'dif.state' :searchType,
		'dif.deceviceType' :2,
		'dif.run_status' :run_status_mx
	});
}
/**
 * 线路条件查询
 */
function line_search(){
//	var line_id =$.trim($('#line_id').textbox('getValue'));
	var line_name =$.trim($('#line_name').textbox('getValue'));
	var cons_name =$.trim($('#cons_name2').combobox('getText'));
	var run_status_xl =$('#run_status_xl').combobox('getText');
	run_status_xl =run_status_xl=='请选择'?'':run_status_xl;
	$('#line-datagrid').datagrid('load',{
//		'dif.line_id':line_id,//线路编号
		'dif.line_name':line_name,//线路名称
		'dif.cons_name':cons_name,//客户名称
		'dif.state' :searchType,
		'dif.deceviceType' :1,
		'dif.run_status' :run_status_xl
	});
}
/**
 * 能效设备条件查询
 */
function nxsb_search(){
//	var line_id =$.trim($('#line_id').textbox('getValue'));
	var line_name =$.trim($('#nxsb_name').textbox('getValue'));
	var cons_name =$.trim($('#cons_name4').combobox('getText'));
	var run_status_xl =$('#run_status_nxsb').combobox('getText');
	run_status_xl =run_status_xl=='请选择'?'':run_status_xl;
	$('#nxsb-datagrid').datagrid('load',{
//		'dif.line_id':line_id,//线路编号
		'dif.line_name':line_name,//线路名称
		'dif.cons_name':cons_name,//客户名称
		'dif.state' :searchType,
		'dif.deceviceType' :5,
		'dif.run_status' :run_status_xl
	});
}
/**
 * 其他设备条件查询
 */
function other_search(){
//	var device_id =$.trim($('#device_id').textbox('getValue'));
	var device_name =$.trim($('#device_name').textbox('getValue'));
	var cons_name =$.trim($('#cons_name3').combobox('getText'));
	var run_status_qt =$('#run_status_qt').combobox('getText');
	run_status_qt =run_status_qt=='请选择'?'':run_status_qt;
	$('#other-datagrid').datagrid('load',{
//		'dif.device_id':device_id,//其他设备编号
		'dif.device_name':device_name,//其他设备名称
		'dif.cons_name':cons_name,//客户名称
		'dif.state' :searchType,
		'dif.deceviceType' :4,
		'dif.run_status' :run_status_qt
	});
}

//清空弹出框的查询条件
function qingkong(){
	$('#tran_id').textbox('setValue','');
	$('#tran_name').textbox('setValue','');
//	$('#cons_name').textbox('setValue','');
	$('#cons_name').combobox({    
		url:webContextRoot +'destree/queryConsList.action',
		valueField: 'id',
		textField: 'text' ,
//	    onChange: function(newValue, oldValue){
////	    	if(newValue!=''){
////					 newValue = $('#cons_name').combobox('getText');
////						$.getJSON(webContextRoot + 'destree/queryTree.action?isQyCode=false&ziMu='+newValue,{ 
////								},
////								function(json){
////									$('#cons_name').combobox('loadData',json);	
////								}
////										);
////	    	}else{
////	    		 newValue = $('#cons_name').combobox('getText');
////					$.getJSON(webContextRoot + 'destree/queryTree.action?isQyCode=false&ziMu=',{ 
////							},
////							function(json){
////								$('#cons_name').combobox('loadData',json);	
////							}
////					);
////	    	}	
////		},
////    	onSelect:function(){
////			$.getJSON(webContextRoot + 'destree/queryTree.action?isQyCode=false&ziMu=',{ 
////					},
////					function(json){
////						$('#cons_name').combobox('loadData',json);	
////					}
////			);
//		}
		mode : 'remote',
		onHidePanel : function(){$('#cons_name').combobox('reload');}
	});
	$('#run_status').combobox('setValue','');
	
	$('#bs_id').textbox('setValue','');
	$('#bs_name').textbox('setValue','');
//	$('#cons_name1').textbox('setValue','');
	$('#cons_name1').combobox({    
		url:webContextRoot +'destree/queryConsList.action',
		valueField: 'id',
		textField: 'text' ,
//	    onChange: function(newValue, oldValue){
//	    	if(newValue!=''){
//					 newValue = $('#cons_name1').combobox('getText');
//						$.getJSON(webContextRoot + 'destree/queryTree.action?isQyCode=false&ziMu='+newValue,{ 
//								},
//								function(json){
//									$('#cons_name1').combobox('loadData',json);	
//								}
//										);
//	    	}else{
//	    		 newValue = $('#cons_name1').combobox('getText');
//					$.getJSON(webContextRoot + 'destree/queryTree.action?isQyCode=false&ziMu=',{ 
//							},
//							function(json){
//								$('#cons_name1').combobox('loadData',json);	
//							}
//					);
//	    	}	
//		},
//    	onSelect:function(){
//			$.getJSON(webContextRoot + 'destree/queryTree.action?isQyCode=false&ziMu=',{ 
//					},
//					function(json){
//						$('#cons_name1').combobox('loadData',json);	
//					}
//			);
//		}
		mode : 'remote',
		onHidePanel : function(){$('#cons_name1').combobox('reload');}
	});
	$('#run_status_mx').combobox('setValue','');
	
	$('#line_id').textbox('setValue','');
	$('#line_name').textbox('setValue','');
//	$('#cons_name2').textbox('setValue','');
	$('#cons_name2').combobox({    
		url:webContextRoot +'destree/queryConsList.action',
		valueField: 'id',
		textField: 'text' ,
//	    onChange: function(newValue, oldValue){
//	    	if(newValue!=''){
//					 newValue = $('#cons_name2').combobox('getText');
//						$.getJSON(webContextRoot + 'destree/queryTree.action?isQyCode=false&ziMu='+newValue,{ 
//								},
//								function(json){
//									$('#cons_name2').combobox('loadData',json);	
//								}
//										);
//	    	}else{
//	    		 newValue = $('#cons_name2').combobox('getText');
//					$.getJSON(webContextRoot + 'destree/queryTree.action?isQyCode=false&ziMu=',{ 
//							},
//							function(json){
//								$('#cons_name2').combobox('loadData',json);	
//							}
//					);
//	    	}	
//		},
//    	onSelect:function(){
//			$.getJSON(webContextRoot + 'destree/queryTree.action?isQyCode=false&ziMu=',{ 
//					},
//					function(json){
//						$('#cons_name2').combobox('loadData',json);	
//					}
//			);
//		}
		mode : 'remote',
		onHidePanel : function(){$('#cons_name2').combobox('reload');}
	});
	$('#run_status_xl').combobox('setValue','');
	
	$('#nxsb_id').textbox('setValue','');
	$('#nxsb_name').textbox('setValue','');
	$('#cons_name4').combobox({    
		url:webContextRoot +'destree/queryConsList.action',
		valueField: 'id',
		textField: 'text' ,
//	    onChange: function(newValue, oldValue){
//	    	if(newValue!=''){
//					 newValue = $('#cons_name4').combobox('getText');
//						$.getJSON(webContextRoot + 'destree/queryTree.action?isQyCode=false&ziMu='+newValue,{ 
//								},
//								function(json){
//									$('#cons_name4').combobox('loadData',json);	
//								}
//										);
//	    	}else{
//					$.getJSON(webContextRoot + 'destree/queryTree.action?isQyCode=false&ziMu=',{ 
//							},
//							function(json){
//								$('#cons_name4').combobox('loadData',json);	
//							}
//					);
//	    	}	
//		},
//		onSelect:function(){
//			$.getJSON(webContextRoot + 'destree/queryTree.action?isQyCode=false&ziMu=',{ 
//					},
//					function(json){
//						$('#cons_name4').combobox('loadData',json);	
//					}
//			);
//		}
		mode : 'remote',
		onHidePanel : function(){$('#cons_name4').combobox('reload');}
	});
	$('#run_status_nxsb').combobox('setValue','');
	
	$('#device_id').textbox('setValue','');
	$('#device_name').textbox('setValue','');
//	$('#cons_name3').textbox('setValue','');
	$('#cons_name3').combobox({    
		url:webContextRoot +'destree/queryConsList.action',
		valueField: 'id',
		textField: 'text' ,
//	    onChange: function(newValue, oldValue){
//	    	if(newValue!=''){
//					 newValue = $('#cons_name3').combobox('getText');
//						$.getJSON(webContextRoot + 'destree/queryTree.action?isQyCode=false&ziMu='+newValue,{ 
//								},
//								function(json){
//									$('#cons_name3').combobox('loadData',json);	
//								}
//										);
//	    	}else{
//					$.getJSON(webContextRoot + 'destree/queryTree.action?isQyCode=false&ziMu=',{ 
//							},
//							function(json){
//								$('#cons_name3').combobox('loadData',json);	
//							}
//					);
//	    	}
//		},
//    	onSelect:function(){
//			$.getJSON(webContextRoot + 'destree/queryTree.action?isQyCode=false&ziMu=',{ 
//					},
//					function(json){
//						$('#cons_name3').combobox('loadData',json);	
//					}
//			);
//		}
		mode : 'remote',
		onHidePanel : function(){$('#cons_name3').combobox('reload');}
	});
	$('#run_status_qt').combobox('setValue','');
}

/**
 * 获取周一日期
 * @param date
 * @returns {Date}
 */
function getFirstDayOfWeek(date){
	var day = date.getDay() || 7;
	return new Date(date.getFullYear(),date.getMonth(),date.getDate()+1-day);
}
