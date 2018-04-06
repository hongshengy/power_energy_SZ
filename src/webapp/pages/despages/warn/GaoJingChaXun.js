/**
 * 
 */

var alarmId =null;
var startDate = new Date(); // 当前开始时间 为当前时间往前推一年
var endDate = new Date();//当前结束时间  为当前时间
var alarmColor = null;//告警级别颜色
//7007 颜色的集合
var colorList='';
var pageSize = 20;
var consComboboxSelectd = '';

$(function(){
	$('#searchTime').combobox({//时间选择其他
        onSelect: function(record){
            if (record.value == "5"){
                $('#time_label').css('display','block');
                $('#time_value').css('display','block');
                
                if(startTime != null && endTime != null){
            		$("#endDate").datetimebox('setValue',endTime);
                	$("#startDate").datetimebox('setValue',startTime);
            	}else{
            		$("#endDate").datetimebox('setValue', $("#endDate").datetimebox('getValue') ==""?DateUtil.dateToStr('yyyy-MM-dd HH:mm:ss',endDate):$("#endDate").datetimebox('getValue'));
                	$("#startDate").datetimebox('setValue',$("#startDate").datetimebox('getValue')==""?DateUtil.dateToStr('yyyy-MM-dd HH:mm:ss',DateUtil.dateAdd('m',-1,endDate)):$("#startDate").datetimebox('getValue'));
            	}
            }else{
            	$('#time_label').css('display','none');
                $('#time_value').css('display','none');
    			$('#startDate').datebox('setValue', '');
    			$('#endDate').datebox('setValue', '');
            }
        }
    });
	
	$.getJSON(webContextRoot  +'pCode/queryCode.action', 
			  { 'codeSortId':70005},
			  function(json){
				  var sjList = [];
				  
				  for(var i=0;i<json.length;i++){
					  var d = new Object();
					  d.codeValue = json[i].codeValue;
					  d.codeName = json[i].codeName;
					  sjList.push(d);
				  }
				  var nxsb = new Object();
				  nxsb.codeValue = '98';
				  nxsb.codeName = '能效设备';
				  sjList.push(nxsb);
				  var zd = new Object();
				  zd.codeValue = '99';
				  zd.codeName = '终端';
				  sjList.push(zd);
				  $('#sheibeileixing').combobox({
						valueField:'codeValue',
						textField:'codeName',
						data:sjList  
					});
				  
				  if(deviceType == 'null' ){
					  $('#sheibeileixing').combobox('setValue','');
				  }else{
					  if(deviceType == '0'){
						  deviceType = '';
					  }
					  $('#sheibeileixing').combobox('setValue',deviceType);
					  deviceType = 'null'
				  }
			}
		);
	$.getJSON(webContextRoot  +'gjdj/queryGjxxpz.action', //颜色的集合
			  function(json){
		       colorList = json;
			}
		);
	
	$.getJSON(webContextRoot + 'warn/selectGaojingJibIe.action',//告警级别
			{ 
			},
			function(json){
				$('#gaojingjibie').combobox({
					data:json,
					valueField:'chargrPersid',
					textField:'chargrPers'
				});//加
			}
		);
	
	
	
	$('#chulizhuangtai').combobox({//处理状态
		url:webContextRoot +'pCode/queryCode.action?codeSortId=70004',
		valueField: 'codeValue',
		textField: 'codeName'   
	}); 	
	
	  //选择大用户树
	$('#userTree').combobox({    
		url:webContextRoot +'destree/queryConsList.action',
		valueField: 'id',
		textField: 'text' ,
		mode : 'remote',
		onHidePanel : function(){$('#userTree').combobox('reload');},
		onSelect : function(record){
			// 选择客户没变时，不需要再次加载联动控件
			if(consComboboxSelectd != record.id){
				consComboboxSelectd = record.id;
		    	if(!isNaN(record.id)){
			    	$('#usershebeiTree').combotree({
			    		url:webContextRoot +'destree/queryYhbTree.action?treeState=closed&treeNodeType=1&treeState=open&id='+record.id,//带参数地址
			    		method:'get',
			    		multiple:false,//是否支持多选
			    		onChange: function(newValue, oldValue){//请求之前
			    			var	yhb = $('#usershebeiTree').combobox('getValue');
						}
			    	});
		    	}
			}
		}
	});
	if(consId!=null&&consId!='null'){
		$('#userTree').combobox('setValue',consId);
//		$('#userTree').combobox('readonly',true);
	}
	/*if(consName!=null&&consName!='null'&&consName!=''){
		$('#userTree').combobox('readonly',true);
	}*/
	$('#export').click(function(){//点击导出
		excelData();
	});
	/*if(startTime != null && endTime != null){
    	$('#searchTime').combobox('setValue', 5);
	}*/
	
	/*if(queryType != "null"){
		if(queryType == 5){
			var monday = getFirstDayOfWeek(new Date());
	    	var sunday = DateUtil.dateAdd('d',6,monday);
	    	
	    	$('#time_label').css('display','block');
            $('#time_value').css('display','block');
			var sdate = DateUtil.dateToStr('yyyy-MM-dd',monday) + ' 00:00:00';
			var edate = DateUtil.dateToStr('yyyy-MM-dd',sunday) + ' 23:59:59';
	        $("#endDate").datetimebox('setValue',edate);
	    	$("#startDate").datetimebox('setValue',sdate);
		}
		$('#searchTime').combobox('setValue', queryType);
		
    }*/
	
	if(queryType != "null"){
		$('#searchTime').combobox('setValue', queryType);
	}

	if(alarmType != "null" ){
		if(alarmType == '1'){
			$('#ssBtn').linkbutton('select');
		}else if(alarmType == '2'){
			$('#lsBtn').linkbutton('select');
		}
		checkValue(alarmType);
	}else{
		checkValue(1);
	}
	
})

function getFirstDayOfWeek(date){
    	var day = date.getDay() || 7;
    	return new Date(date.getFullYear(),date.getMonth(),date.getDate()+1-day);
}

  var clearTimeoutFlag;//临时变量  
//根据颜色编码获取颜色名称
 function getColorText(alarmColor){
	 clearTimeout(clearTimeoutFlag);
	   for(var i=0;i<colorList.length;i++){
		  if(colorList[i].alarmLevel == alarmColor){
			  return colorList[i].alarmColorCode;
		  }
	   }
	return '';
 }
 
 function realtimeAlarm(){//实时历史数据走的张凡接口
	// $('#gjcx-datagrid').combogrid("clear");
	 
	 var startDate =  $('#startDate').val();//开始日期
 	var endDate =  $('#endDate').val();//结束日期
 	var devType;
 	if(deviceType == 'null'){
 		devType = $('#sheibeileixing').combobox('getValue');
 	}else{
 		devType = deviceType;
 	}
 	if(startDate> endDate){
 		$.messager.alert('提示', "开始日期不能大于结束日期！", 'warning');
 		return;
 	}
	 
	 var columns = '';
	 if(consName == '' || consName == null || consName.length ==0){
		columns = [[
		            {field:'consNo',title:'客户编号',width:'10%',align:'center'},
		    		{field:'consName',title:'客户名称',width:'15%',align:'center'},
		    		{field:'subsName',title:'建筑',width:'10%',align:'center',formatter:function(v,row,index){
		    			if(row.subsName == null){
		    				return '';
		    			}else{
		    				return '<a  style="color:blue;cursor:pointer;" onclick="openyctWindow('
			    			+"'"+row.consId+"','"+row.subsId+"'"
			    			+ ')">'
			    			+ ""+row.subsName+""
			    			+ '</a>';
		    			}
		    			
		    		}},
		    	    {field:'deviceName',title:'告警设备',width:'10%',align:'center'},
		    	    {field:'deviceTypeName',title:'设备类型',width:'5%',align:'center'},
		    	    {field:'alarmLever',title:'告警等级',width:'8%',align:'center', formatter: function (index, row) {
		    	    	return "<span style='vertical-align:middle;color:"+getColorText(row.alarmLevel)+";'>"+row.alarmLevelName+"</span>";
		    	    }},
		            {field:'alarmDesc',title:'告警描述',width:'15%',align:'center'},
		            {field:'confirmFlagName',title:'处理状态',width:'6%',align:'center'},
		            //data[i].alarmLevelName+"("+data[i].mpName+type+")"
		    	    {field:'alarmStartTime',title:'告警时间',width:'15%',align:'center'},
		    	    {field:'alarmValue',title:'告警发生值',width:'6%',align:'center'},
		    	    {field:'hulue',title:'操作',width:'10%',align:'center',formatter: function(v,row,index){ //超链接
		    			return '<a style="color:blue;cursor:pointer;" onclick="paifagongdan('
		    	        +"'"+row.deviceId+"','"+row.deviceType+"','"+row.mpId+"','"+row.consId+"'"
		    			+ ')">'
		    			+ ""+"派发工单"
		    			+ '</a><a style="color:blue;margin-left:20px;cursor:pointer;" onclick="chuli('
		    			+ row.mpId +','+ row.confirmFlag
		    			+ ')">'
		    			+ v
		    			+ '</a>';
		    	    }}
		    	]];
	 }else{
		 columns = [[
			            {field:'consNo',title:'客户编号',width:'10%',align:'center'},
			    		{field:'consName',title:'客户名称',width:'15%',align:'center'},
			    		{field:'subsName',title:'建筑',width:'10%',align:'center',formatter:function(v,row,index){
			    			return '<a  style="color:blue;cursor:pointer;" onclick="openyctWindow('
			    			+"'"+row.consId+"','"+row.subsId+"'"
			    			+ ')">'
			    			+ ""+row.subsName+""
			    			+ '</a>';
			    		}},
			    	    {field:'deviceName',title:'告警设备',width:'10%',align:'center'},
			    	    {field:'deviceTypeName',title:'设备类型',width:'5%',align:'center'},
			    	    {field:'alarmLever',title:'告警等级',width:'8%',align:'center', formatter: function (index, row) {
			    	    	return "<span style='vertical-align:middle;color:"+getColorText(row.alarmLevel)+";'>"+row.alarmLevelName+"</span>";
			    	    }},
			            {field:'alarmDesc',title:'告警描述',width:'15%',align:'center'},
			            {field:'confirmFlagName',title:'处理状态',width:'6%',align:'center'},
			            //data[i].alarmLevelName+"("+data[i].mpName+type+")"
			    	    {field:'alarmStartTime',title:'告警时间',width:'15%',align:'center'},
			    	    {field:'alarmValue',title:'告警发生值',width:'6%',align:'center'}
			    	]];
	 }
		
	//分页
	$('#gjcx-datagrid').datagrid({// 表格
			nowrap : false,// 设置为true，当数据长度超出列宽时将会自动截取。
			striped : true,// 设置为true将交替显示行背景。
			border:false,
			fit:true,
//		    tools:"#btThrees",
			pagination : true,// 设置true将在数据表格底部显示分页工具栏。
			fitColumns : true,// 自动适应宽度
			singleSelect : true,// 设置为true将只允许选择一行。
			rownumbers : true,// 设置为true将显示行数。
			pageNumber:1,//在设置分页属性的时候初始化页码。
			pageSize:pageSize,//在设置分页属性的时候初始化页面大小。
			url:webContextRoot +'warn/queryRealTimeAlarm.action',
			queryParams:{
				'gaoJIngChaXunSYModel.bianwei' :0,
	 			'gaoJIngChaXunSYModel.gaojing' :1,
	 		//	'gaoJIngChaXunSYModel.mpCode' :$('#shijian').combobox('getValue'),
	 			'gaoJIngChaXunSYModel.alarmStartTime' :startDate,
	 			'gaoJIngChaXunSYModel.alarmEndTime' :endDate,
	 			'gaoJIngChaXunSYModel.consId': $.trim($('#userTree').combobox('getValue')),
	 			'gaoJIngChaXunSYModel.subsId': $('#usershebeiTree').combotree('getValue'),
	 			'gaoJIngChaXunSYModel.deviceType': devType,
	 			'gaoJIngChaXunSYModel.dataDate': $('#searchTime').combotree('getValue'),
	 			'gaoJIngChaXunSYModel.confirmFlag': $('#chulizhuangtai').combobox('getValue'),
	 			'gaoJIngChaXunSYModel.mpId': '',
	 			'gaoJIngChaXunSYModel.alarmLevel': $('#gaojingjibie').combobox('getValue'),
	 			'gaoJIngChaXunSYModel.deviceName': $.trim($('#shebei').textbox('getValue'))
			},
			onLoadSuccess : function() {// 加载数据之后
				$(this).datagrid("fixRownumber");
//				var rows = $('#gjcx-datagrid').datagrid("getRows");
				/*if(rows.length != 0){
					$('#export').show();
				}else{
					$('#export').hide();
				}*/
				
//				$('#dataGrid').datagrid('selectRow', 0); // 选择第一行
			},
			loadMsg : "正在努力的读取数据中...",// 提示信息
			columns : columns,
			loadFilter: function(data){
				if (data.sMap){
					return data.sMap;
				} else {
					return data;
				}
			}
		});
		
		var pager = $('#gjcx-datagrid').datagrid("getPager");
		pager.pagination({
			onChangePageSize:function(size){
				pageSize = size;
			}
		}); 
	 
}
 
 //派发工单弹出框关闭后方法
 function paifachuli(){
	 $("#msgwin").dialog("close");
	 index = 1;
	 selectgj();
} 
 
//派发工单
function paifagongdan(deviceId1,deviceType1,mpId1,consId1){
	var content = "<iframe src='/des/pages/despages/labour/PaiFaGongDan.jsp?consId="+consId1+"&userTranId="+userId+"&devId="+deviceId1+"&deviceType="+deviceType1+"&mpId="+mpId1+"&widthFlag=1' width='100%' height='99%' frameborder='0' scrolling='no'/>";	
	var boardddiv = "<div id='msgwin' title='工单派送'/>";
	$(document.body).append(boardddiv);
	var win = $("#msgwin").dialog({
		content : content,
		width : document.body.clientWidth*0.6,
		height : document.body.clientHeight-80,
		modal : 'shadow',
		title : '工单派送',
		onClose : function() {
			
//			testOpen();
		}
	});
	
}

	/**
	 * 确定tab页工单类型  2历史告警,1实时告警 
	 */
	var index = 1;
	
	function checkValue(value){
	
		index = value;
		selectgj();
	}

	
 //点击查询事件
 function selectgj(){
	 
	if(index == 2){
		$('#dg_one').addClass('hidden');
		$('#dg_two').removeClass('hidden');
		historyAlarm();
    	

	}else if(index == 1){
		$('#dg_two').addClass('hidden');
		$('#dg_one').removeClass('hidden');
		realtimeAlarm();//实时历史
	}
	 
 }
 
 
/**
*	导出
*/
function excelData(){
	var shebeitupe =null;
	if($('#sheibeileixing').combobox('getValue') != ''){
		shebeitupe=$('#sheibeileixing').combobox('getValue');
	}
	
	var startDate =  $('#startDate').val();//开始日期
	var endDate =  $('#endDate').val();//结束日期
	if(startDate> endDate){
		$.messager.alert('提示', "开始日期不能大于结束日期！", 'warning');
		return;
	}
	// 历史告警导出
	if(index == 2){
		
		//当期时间作为标志
//	 	var flag = new Date().format('Y-m-d H:i:s.u');
	 		
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
//		Ext.MessageBox.hide();//关闭进度条
		
		$.post(webContextRoot +'warn/queryHistoryAlarm.action', //请求路径
				{
				'gaoJIngChaXunModel.alarmStartTime': startDate,
				'gaoJIngChaXunModel.alarmEndTime': endDate,
				'gaoJIngChaXunModel.consId': $.trim($('#userTree').combobox('getValue')),
				'gaoJIngChaXunModel.UserTranId': $('#usershebeiTree').combotree('getValue'),
				'gaoJIngChaXunModel.confirmFlag': $('#chulizhuangtai').combobox('getValue'),
				'gaoJIngChaXunModel.deviceType': shebeitupe,
				'gaoJIngChaXunModel.timeType': $('#searchTime').datebox('getValue'),
//				'gaoJIngChaXunModel.devId': $('#shebei').combobox('getValue'),
				'gaoJIngChaXunModel.deviceName': $.trim($('#shebei').textbox('getValue')),
				'gaoJIngChaXunModel.alarmLever': $('#gaojingjibie').combobox('getValue'),
				'gaoJIngChaXunModel.exportFlag': '1'
				},//请求参数
			   	function(data){
					var flag = DateUtil.dateToStr('yyyy-MM-dd HH:mm:ss',new Date());
				 	//导出地址及参数
				 	var urlo = webContextRoot+'warn/exporGaoJingChaXunExcel.action?flag=' + flag+'&index='+index;
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
					
					//导出进度条的方法
					function getProgress() {
						if(pert < 0.99){//导出进度
							pert = pert + 0.01;
						}
						Ext.Ajax.request({//进度条请求
							url: webContextRoot + 'warn/exportProgress.action?flag=' + flag,
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
	// 实时数据导出
	}else if(index == 1){	
		$.post(webContextRoot +'warn/queryRealTimeAlarm.action', //请求路径
	 			{
	 			'gaoJIngChaXunSYModel.bianwei' :0,
	 			'gaoJIngChaXunSYModel.gaojing' :1,
	 		//	'gaoJIngChaXunSYModel.mpCode' :$('#shijian').combobox('getValue'),
	 			'gaoJIngChaXunSYModel.alarmStartTime' :startDate,
	 			'gaoJIngChaXunSYModel.alarmEndTime' :endDate,
	 			'gaoJIngChaXunSYModel.consId': $.trim($('#userTree').combobox('getValue')),
	 			'gaoJIngChaXunSYModel.subsId': $('#usershebeiTree').combotree('getValue'),
	 			'gaoJIngChaXunSYModel.deviceType': $('#sheibeileixing').datebox('getValue'),
	 			'gaoJIngChaXunSYModel.dataDate': $('#searchTime').combotree('getValue'),
	 			'gaoJIngChaXunSYModel.confirmFlag': $('#chulizhuangtai').combobox('getValue'),
	 			'gaoJIngChaXunSYModel.mpId': '',
	 			'gaoJIngChaXunSYModel.alarmLevel': $('#gaojingjibie').combobox('getValue'),
	 			'gaoJIngChaXunSYModel.deviceName': $.trim($('#shebei').textbox('getValue')),
	 			'gaoJIngChaXunSYModel.exportFlag': '1'
	 			//************查不到数据***********
	 			//'gaoJIngChaXunSYModel.deviceId': $('#shebei').combobox('getValue')
	 			},//请求参数
	 		   	function(data){
	 				//当期时间作为标志
//	 			 	var flag = new Date().format('Y-m-d H:i:s.u');
	 			 	var flag = DateUtil.dateToStr('yyyy-MM-dd HH:mm:ss',new Date());
	 			 	//导出地址及参数
	 			 	var urlo = webContextRoot+'warn/exporGaoJingChaXunExcel.action?flag=' + flag+'&index='+index;
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
//	 				Ext.MessageBox.hide();//关闭进度条
	 				
	 				
	 				//导出进度条的方法
					function getProgress() {
						if(pert < 0.99){//导出进度
							pert = pert + 0.01;
						}
						
						Ext.Ajax.request({//进度条请求
							url: webContextRoot + 'warn/exportProgress.action?flag=' + flag,
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
}

//
///**
// * 告警历史
// */
function historyAlarm(){
	var shebeitupe =null;
	if($('#sheibeileixing').combobox('getValue') != ''){
		shebeitupe=$('#sheibeileixing').combobox('getValue');
	}
	var startDate =  $('#startDate').val();//开始日期
	var endDate =  $('#endDate').val();//结束日期
	if(startDate> endDate){
		$.messager.alert('提示', "开始日期不能大于结束日期！", 'warning');
		return;
	}
	//$('#gjcx-datagrid').combogrid("clear");
	
	var column = [[
	            {field:'consNo',title:'客户编号',width:'10%',align:'center'},
	       	    {field:'consId',title:'客户名称',width:'10%',align:'center'
//	       	    	,formatter: function(v,row,index){ //超链接
//	       	        return '<a style="color:blue" href="#" onclick="chuli('
//	       			+ row.alarmId
//	       			+ v
//	       			+ '</a>';
//	       	    }
	       	    },
	          	{field:'userTranId',title:'建筑',width:'10%',align:'center'},
	       	    {field:'deviceType',title:'设备类型',width:'6%',align:'center'},
	       	    {field:'devId',title:'告警设备',width:'10%',align:'center'},
	       	    {field:'alarmLever',title:'告警等级',width:'8%',align:'center', formatter: function (index, row) {
	       	    	return "<span style='vertical-align:middle;color:"+getColorText(row.alarmLever)+";'>"+row.alarmLevelName+"</span>";
	            }},
	       	    {field:'alarmDesc',title:'告警描述',width:'10%',align:'center'},
	       	    {field:'alarmStartTime',title:'告警开始时间',width:'12%',align:'center'},
	       	    {field:'alarmEndTime',title:'告警结束时间',width:'12%',align:'center'},
	       	    {field:'confirmFlag',title:'处理状态',width:'6%',align:'center'},
	       	    {field:'pushMode',title:'推送方式',width:'6%',align:'center'},
	       	    {field:'alarmConfirmUserNaem',title:'告警处理人',width:'6%',align:'center'},
	       	    {field:'waringUp',title:'告警阀值(上限)',width:'8%',align:'center',formatter: function (index, row) {
	       	    	return parseFloat(row.waringUp);
	       	    }},
	       	    {field:'waringDown',title:'告警阀值(下限)',width:'8%',align:'center',formatter: function (index, row) {
	       	    	return parseFloat(row.waringDown);
	       	    }},
	       	    {field:'alarmConfirmTime',title:'告警处理时间',width:'12%',align:'center'},
	       	    {field:'alarmValue',title:'发生值',width:'6%',align:'center'}
	       	]];
	
	
	$('#gjcx-datagridone').datagrid({// 表格
//		title:'详细信息',
		nowrap : false,// 设置为true，当数据长度超出列宽时将会自动截取。
		striped : true,// 设置为true将交替显示行背景。
		border:false,
		width:'100%',
	    height:'100%',
		pagination : true,// 设置true将在数据表格底部显示分页工具栏。
		fitColumns : false,// 自动适应宽度
		singleSelect : true,// 设置为true将只允许选择一行。
		rownumbers : true,// 设置为true将显示行数。
		pageNumber:1,//在设置分页属性的时候初始化页码。
		pageSize:20,//在设置分页属性的时候初始化页面大小。
		url:webContextRoot +'warn/queryHistoryAlarm.action',
		queryParams:{
			'gaoJIngChaXunModel.alarmStartTime': startDate,
			'gaoJIngChaXunModel.alarmEndTime': endDate,
			'gaoJIngChaXunModel.consId': $.trim($('#userTree').combobox('getValue')),
			'gaoJIngChaXunModel.UserTranId': $('#usershebeiTree').combotree('getValue'),
			'gaoJIngChaXunModel.confirmFlag': $('#chulizhuangtai').combobox('getValue'),
			'gaoJIngChaXunModel.deviceType': shebeitupe,
			'gaoJIngChaXunModel.timeType': $('#searchTime').datebox('getValue'),
//			'gaoJIngChaXunModel.devId': $('#shebei').combobox('getValue'),
			'gaoJIngChaXunModel.deviceName': $.trim($('#shebei').textbox('getValue')),
			'gaoJIngChaXunModel.alarmLever': $('#gaojingjibie').combobox('getValue')
		},
		onLoadSuccess : function() {// 加载数据之后
			$(this).datagrid("fixRownumber");
//			var rows = $('#gjcx-datagridone').datagrid("getRows");
			/*if(rows.length != 0){
				$('#export').show();
			}else{
				$('#export').hide();
			}*/
			
//			$('#dataGrid').datagrid('selectRow', 0); // 选择第一行
		},
		loadMsg : "正在努力的读取数据中...",// 提示信息
		columns : column,//字段
		loadFilter: function(data){
			if (data.sMap){
				return data.sMap;
			} else {
				return data;
			}
		}

	});

}


function chuli(id,confirmFlag){//之前处理按钮先不用
	if(confirmFlag != 1){
		var mpid = id;
		$.messager.confirm('确认', '是否忽略该信息？', function(r){
			if(r){	
				$.post(webContextRoot +'warn/querygaojingchaxunshouyeadd.action', //请求路径
					{
						'gaoJIngChaXunSYModel.mpId' : mpid,
						'gaoJIngChaXunSYModel.userId' :userId,
						'gaoJIngChaXunSYModel.bianwei': 1
					},//请求参数
				   	function(data){
						var ste = JSON.stringify(data)
						if(ste.indexOf("success")){
							$.messager.alert('提示', "忽略成功!", 'warning');
							
							realtimeAlarm();
						}else{
							$.messager.alert('提示', "忽略失败!", 'warning');
						}
				})
			}
		});
	}else{
		$.messager.alert('提示', "告警信息已忽略！", 'warning');
	}
	
	/*$('#clsm').textbox('setValue','');
	$('#clzt').combobox('setValue','');
	var rows = $('#gjcx-datagrid').datagrid("getSelected");
	if(rows==null && id == null){
		$.messager.alert('提示', "请选择一条信息！", 'warning');
	}else{
		$('#gjcx-cl-panel').dialog('open');
		$('#user').text(UserName);
		$('#clzt').combobox({//紧急程度
			url:webContextRoot +'pCode/queryCode.action?codeSortId=70004',
			valueField: 'codeValue',
			textField: 'codeName' ,
			panelWidth :200
		}); 
		alarmId =id;
		
		$('#clzt').combobox('select',rows.confirmFlag);
	}*/
	
//		$('#gjcx-cl-panel').dialog('close');		
}

function cxSave(){//之前保存按钮先不用
	$.getJSON(webContextRoot + 'warn/updateGaoJing.action',
		{ 
		'gaoJIngChaXunModel.confirmFlag' : $('#clzt').val(),
		'gaoJIngChaXunModel.alarmConfirmUserId' : userId,
		'gaoJIngChaXunModel.alarmConfirmOpinion' : $('#clsm').val(),
		'gaoJIngChaXunModel.alarmId' : alarmId
		
		},
		function(json){
			 if(json.saveSUCCESS=="true")
			    {
			    	$.messager.alert('确认', "保存成功！", 'info', function(r){
			    		cxClose();
			    	});
			    }
		    	else
		    	{
		    	 	$.messager.alert('确认', "保存失败！", 'warning');//移除失败
			    	 	
			    	}
			}
	);
}
function cxClose(){//之前关闭弹窗按钮
	$('#gjcx-cl-panel').dialog('close');
}

//一次图跳转
function openyctWindow(consId,subsId){
	var options = {
	        name: 'desyhbjk',               //需要打开的菜单的关键字,必须保证正确
	        text: '一次图监控',           //打开菜单的标题,可修改
	        path: '/des/pages/despages/monitor/userMonitor.jsp?consId='+consId+'&userTranId='+subsId+'&isOrgControl=true'
	    };
	    top.reloadTabPage(options);
	    
}

// datagrid行号自适应
$.extend($.fn.datagrid.methods, {
    fixRownumber : function (jq) {
        return jq.each(function () {
            var panel = $(this).datagrid("getPanel");
            //获取最后一行的number容器,并拷贝一份
            var clone = $(".datagrid-cell-rownumber", panel).last().clone();
            //由于在某些浏览器里面,是不支持获取隐藏元素的宽度,所以取巧一下
            clone.css({
                "position" : "absolute",
                left : -1000
            }).appendTo("body");
            var width = clone.width("auto").width();
            //默认宽度是25,所以只有大于25的时候才进行fix
            if (width > 25) {
                //多加5个像素,保持一点边距
                $(".datagrid-header-rownumber,.datagrid-cell-rownumber", panel).width(width + 5);
                //修改了宽度之后,需要对容器进行重新计算,所以调用resize
                $(this).datagrid("resize");
                //一些清理工作
                clone.remove();
                clone = null;
            } else {
                //还原成默认状态
                $(".datagrid-header-rownumber,.datagrid-cell-rownumber", panel).removeAttr("style");
            }
        });
    }
});