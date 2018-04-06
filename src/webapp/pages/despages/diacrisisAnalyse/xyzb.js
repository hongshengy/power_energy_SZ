/**
 * 响应指标
 * @author zhou_qiang
 * @since 2017-04-23
 */
var dataDate = new Date();//当前结束时间  为当前时间
var respType = 0;// 响应类型 0=约定响应 1=实时响应
var respTactic = 0; //响应策略 0=调峰策略 1=降负荷策略

var isAdd = true;//true：添加，false：修改
var updRows = null;
var respDate = '';
var respId = '';
var respOneNum = '';
var respTwoNum = '';
var respThreeNum = '';
var timeOneNum = '';
var timeTwoNum = '';
var timeThreeNum = '';
var rowData;
var sysDate='';
var pageSize = 20;
var detailArr;
var saveFlag = true;

$(function(){
	//初始化日期格式
	$("#dataDate").val(DateUtil.dateToStr('yyyy',dataDate));
	//响应指标信息查询，并分页展示
	queryXyzb();
	
	//给dataGrid表格添加数据校验
	$('#dataGridDetail').datagrid().datagrid('enableCellEditing');
	
	//校验时间不可选择当天以前的日期
	/*$('#resDate').datebox({
		onSelect:function (date){
			var d = DateUtil.dateToStr('yyyy-MM-dd',date);
			var today = DateUtil.dateToStr('yyyy-MM-dd',dataDate);
			if(d<today){
				$('#resDate').datebox('setValue','');
			}
		}
	});*/
});


//响应指标查询事件
$('#search').click(function(){
	queryXyzb();//查询响应指标信息
});
//响应指标明细查询事件
$('#queryDetail').click(function(){
	queryDetail(false);//获取指标和响应明细信息（并校验数据）
});

//响应指标明细静态数据查询事件
$('#queryDetailShow').click(function(){
	showDetail(respId,respDate,respOneNum,respTwoNum,respThreeNum,false);
});

/**
 * 查询响应指标
 */
function queryXyzb(){
	//获取页面日期值
	var b = $('#dataDate').val();
	//定义页面dataGrid的Colums列字段。
	var colums = [[
		{field:'resDate',title:'响应日期',width:'15%',align:'center'},
		{field:'respType',title:'响应类型',width:'15%',align:'center',formatter: function (index, row) {
        	  if(row.respType =='0'){
        		  return '约定响应';
        	  }else if(row.respType =='1'){
        		  return '实时响应';
 			  }
          }},
		{field:'respTactic',title:'响应策略',width:'15%',align:'center',formatter: function (index, row) {
        	  if(row.respTactic =='0'){
        		  return '调峰策略';
        	  }else if(row.respTactic =='1'){
        		  return '降负荷策略';
 			  }
          }},
		{field:'respSource',title:'需求响应来源',width:'30%',align:'center'},
		{field:'statusName',title:'当前状态',width:'15%',align:'center'},
		{field:'memo',title:'详情',width:'10%',align:'center',formatter: function (index, row) {
			return '<a href="#" style="color:blue;" onclick="showXQ('+row.respId+')">详情</a>';
		}}
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
		url:webContextRoot +'zbxf/queryRespRecordInfo.action',
		queryParams:{
			'respRecordModel.resDate' : b
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
}

/**
 * 保存指标
 * @returns
 */
function cxSave(){
	if(checkResp()){//校验添加响应指标数据完整性和判断
		var resDate = $('#resDate').datebox('getValue');
		var respOneNum = $('#respOneNum').numberbox('getValue');
		var respTwoNum = $('#respTwoNum').numberbox('getValue');
		var respThreeNum = $('#respThreeNum').numberbox('getValue');
		//校验需求响应量不能大于实际响应量
		$.post(webContextRoot +'zbxf/queryRespsjValue.action', 
				{
					'respReceiveModel.resDate' : resDate
				},
			   	function(data){//回调
					if(isAdd == true){//添加响应指标信息
								//调用后台新增响应指标方法
								$.getJSON(webContextRoot + 'zbxf/addRespRecordInfo.action',
										{ 
											'respRecordModel.respSource' : $.trim($('#respSource').textbox('getValue')),
											'respRecordModel.resDate' : $('#resDate').datebox('getValue'),
											'respRecordModel.startOne' : $('#startOne').val(),
											'respRecordModel.endOne' :  $('#endOne').val(),
											'respRecordModel.respOneNum' : $('#respOneNum').numberbox('getValue'),
											'respRecordModel.startTwo' : $('#startTwo').val(),
											'respRecordModel.endTwo' : $('#endTwo').val(),
											'respRecordModel.respTwoNum' : $('#respTwoNum').numberbox('getValue'),
											'respRecordModel.startThree' : $('#startThree').val(),
											'respRecordModel.endThree' : $('#endThree').val(),
											'respRecordModel.respThreeNum' : $('#respThreeNum').numberbox('getValue'),
											'respRecordModel.respType': $("input:radio[name='respType']:checked").val(),
											'respRecordModel.respTactic': $("input:radio[name='respTactic']:checked").val(),
											'respRecordModel.memo': $('#memo').textbox('getValue'),
											'respRecordModel.createUser': userId
										},
										function(json){
											 if(json.success=="true"){//处理返回结果
										    	$.messager.alert('确认', "保存成功！", 'info', function(r){
										    		cxClose();//关闭添加响应指标面板
										    		queryXyzb();//查询响应指标信息
										    	});
											 }else{
												 $.messager.alert('确认', "保存失败！", 'warning');
											 }
										}
									);
							}else if(isAdd == false){//修改响应指标信息
								//调用后台修改响应指标方法
								$.getJSON(webContextRoot + 'zbxf/updateRespRecordInfo.action',
										{ 
											'respRecordModel.respSource' : $.trim($('#respSource').textbox('getValue')),
											'respRecordModel.resDate' : $('#resDate').datebox('getValue'),
											'respRecordModel.startOne' : $('#startOne').val(),
											'respRecordModel.endOne' : $('#endOne').val(),
											'respRecordModel.respOneNum' : $('#respOneNum').numberbox('getValue'),
											'respRecordModel.startTwo' : $('#startTwo').val(),
											'respRecordModel.endTwo' : $('#endTwo').val(),
											'respRecordModel.respTwoNum' : $('#respTwoNum').numberbox('getValue'),
											'respRecordModel.startThree' : $('#startThree').val(),
											'respRecordModel.endThree' : $('#endThree').val(),
											'respRecordModel.respThreeNum' : $('#respThreeNum').numberbox('getValue'),
											'respRecordModel.respType': $("input:radio[name='respType']:checked").val(),
											'respRecordModel.respTactic': $("input:radio[name='respTactic']:checked").val(),
											'respRecordModel.memo': $('#memo').textbox('getValue'),
											'respRecordModel.respId': updRows.respId,
											'respRecordModel.upUserId': userId
										},
										function(json){
											 if(json.success=="true"){//处理返回结果
										    	$.messager.alert('确认', "修改成功！", 'info', function(r){
										    		cxClose();//关闭数据面板
										    		queryXyzb();//查询响应指标信息
										    	});
											 }else{
												 $.messager.alert('确认', "修改失败！", 'warning');//移除失败
											 }
										}
									);
							}
						
					
			},"json");//返回格式
		
		
	}
}

/**
 * 获取服务器当前时间
 */
function findSysDate(){
	$.ajax({
		type : "post",
		url : '/des/svgMonitor/queryCurrentTimeSVG.action',
		dataType : "json",
		success : function(data) {
			if (data.length > 0) {
				sysDate = DateUtil.strToDate(data[0].svgSysDate);//获取后台返回当前服务器时间
			}
		}
	});
}

/**
 * 校验数据完整性
 */
function checkResp(){
	findSysDate();//调用方法获取当前服务器时间
	//获取面板的数据值
	var respSource = $.trim($('#respSource').textbox('getValue'));
	var resDate = $('#resDate').datebox('getValue');
	var startOne = $('#startOne').val();
	var endOne = $('#endOne').val();
	var respOneNum = $('#respOneNum').numberbox('getValue');
	var startTwo = $('#startTwo').val();
	var endTwo = $('#endTwo').val();
	var respTwoNum = $('#respTwoNum').numberbox('getValue');
	var startThree = $('#startThree').val();
	var endThree = $('#endThree').val();
	var respThreeNum = $('#respThreeNum').numberbox('getValue');
	var respType = $("input:radio[name='respType']:checked").val();
	var respTactic = $("input:radio[name='respTactic']:checked").val();
	var memo = $('#memo').textbox('getValue');
	var ymd = DateUtil.dateToStr("yyyy-MM-dd",sysDate);
	var hm = DateUtil.dateToStr("HH:mm",sysDate);
	//校验面板中所输入的字段值
	if(respSource.length == 0){
		$.messager.alert('提示', "响应来源不能为空！", 'info', function(){
			$('#respSource').textbox('textbox').focus();
			$('#respSource').textbox('showPanel');
	     });
		return false;
	}
	if(respSource.length > 32){
		$.messager.alert('提示', "响应来源输入内容过长！", 'info', function(){
			$('#respSource').textbox('textbox').focus();
			$('#respSource').textbox('showPanel');
	     });
		return false;
	}
	if(resDate.length == 0){
		$.messager.alert('提示', "响应日期不能为空！", 'info', function(){
//			$('#resDate').datebox('datebox').focus();
			$('#resDate').datebox('showPanel');
	     });
		return false;
	}
	if(resDate < ymd){
		$.messager.alert('提示', "响应日期不能小于当前时间！", 'info', function(){
//			$('#resDate').datebox('datebox').focus();
			$('#resDate').datebox('showPanel');
	     });
		return false;
	}
	
	
	
	if(startOne.length != 0){
		if(endOne.length == 0){
			$.messager.alert('提示', "应邀时段1结束时间不能为空！", 'info');
			return false;
		}else if(respOneNum == 0){
			$.messager.alert('提示', "应邀时段1需求响应量不能为空！", 'info', function(){
				$('#respOneNum').textbox('textbox').focus();
//				$('#respOneNum').textbox('showPanel');
		     });
			return false;
		}else if(startOne > endOne){
			$.messager.alert('提示', "应邀时段1开始时间不能大于结束时间！", 'info');
			return false;
		/*}else if(startOne == startTwo || startOne == startThree){
			$.messager.alert('提示', "应邀时段1开始时间不能重复！", 'info');
			return false;*/
		}
		if(resDate <= ymd){
			if(startOne < hm){
				$.messager.alert('提示', "应邀时段1开始时间不能小于当前时间！", 'info');
//				$('#startOne').textbox('showPanel');
				return false;
			}
		}
		
	}
	if(endOne.length != 0){
		if(startOne.length == 0){
			$.messager.alert('提示', "应邀时段1开始时间不能为空！", 'info');
			return false;
		}else if(respOneNum == 0){
			$.messager.alert('提示', "应邀时段1需求响应量不能为空！", 'info', function(){
				$('#respOneNum').textbox('textbox').focus();
				$('#respOneNum').textbox('showPanel');
		     });
			return false;
		}else if(startOne > endOne){
			$.messager.alert('提示', "应邀时段1开始时间不能大于结束时间！", 'info');
			return false;
		/*}else if(endOne == endTwo || endOne == endThree){
			$.messager.alert('提示', "应邀时段1结束时间不能重复！", 'info');
			return false;*/
		}
		if(resDate <= ymd){
			if(endOne < hm){
				$.messager.alert('提示', "应邀时段1结束时间不能小于当前时间！", 'info');
				return false;
			}
		}
		
	}
	if(respOneNum != 0){
		if(startOne.length == 0){
			$.messager.alert('提示', "应邀时段1开始时间不能为空！", 'info');
			return false;
		}else if(endOne.length == 0){
			$.messager.alert('提示', "应邀时段1结束时间不能为空！", 'info');
			return false;
		}else if(startOne > endOne){
			$.messager.alert('提示', "应邀时段1开始时间不能大于结束时间！", 'info');
			return false;
		}
	}
	if(startTwo.length != 0){
		if(endTwo.length == 0){
			$.messager.alert('提示', "应邀时段2结束时间不能为空！", 'info');
			return false;
		}else if(respTwoNum == 0){
			$.messager.alert('提示', "应邀时段2需求响应量不能为空！", 'info', function(){
				$('#respTwoNum').textbox('textbox').focus();
//				$('#respTwoNum').textbox('showPanel');
		     });
			return false;
		}else if(startTwo > endTwo){
			$.messager.alert('提示', "应邀时段2开始时间不能大于结束时间！", 'info');
			return false;
		/*}else if(startTwo == startOne || startTwo == startThree){
			$.messager.alert('提示', "应邀时段2开始时间不能重复！", 'info');
			return false;*/
		}
		if(resDate <= ymd){
			if(startTwo < hm){
				$.messager.alert('提示', "应邀时段2开始时间不能小于当前时间！", 'info');
				return false;
			}
		}
		
	}
	if(endTwo.length != 0){
		if(startTwo.length == 0){
			$.messager.alert('提示', "应邀时段2开始时间不能为空！", 'info');
			return false;
		}else if(respTwoNum == 0){
			$.messager.alert('提示', "应邀时段2需求响应量不能为空！", 'info', function(){
				$('#respTwoNum').textbox('textbox').focus();
				$('#respTwoNum').textbox('showPanel');
		     });
			return false;
		}else if(startTwo > endTwo){
			$.messager.alert('提示', "应邀时段2开始时间不能大于结束时间！", 'info');
			return false;
		/*}else if(endTwo == endOne || endTwo == endThree){
			$.messager.alert('提示', "应邀时段2结束时间不能重复！", 'info');
			return false;*/
		}
		if(resDate <= ymd){
			if(endTwo < hm){
				$.messager.alert('提示', "应邀时段2结束时间不能小于当前时间！", 'info');
				return false;
			}
		}
		
	}
	if(respTwoNum != 0){
		if(startTwo.length == 0){
			$.messager.alert('提示', "应邀时段2开始时间不能为空！", 'info');
			return false;
		}else if(endTwo.length == 0){
			$.messager.alert('提示', "应邀时段2结束时间不能为空！", 'info');
			return false;
		}else if(startTwo > endTwo){
			$.messager.alert('提示', "应邀时段2开始时间不能大于结束时间！", 'info');
			return false;
		}
	}
	if(startThree.length != 0){
		if(endThree.length == 0){
			$.messager.alert('提示', "应邀时段3结束时间不能为空！", 'info');
			return false;
		}else if(respThreeNum == 0){
			$.messager.alert('提示', "应邀时段3需求响应量不能为空！", 'info', function(){
				$('#respThreeNum').textbox('textbox').focus();
//				$('#respThreeNum').textbox('showPanel');
		     });
			return false;
		}else if(startThree > endThree){
			$.messager.alert('提示', "应邀时段3开始时间不能大于结束时间！", 'info');
			return false;
		/*}else if(startThree == startOne || startThree == startTwo){
			$.messager.alert('提示', "应邀时段3开始时间不能重复！", 'info');
			return false;*/
		}
		if(resDate <= ymd){
			if(startThree < hm){
				$.messager.alert('提示', "应邀时段3开始时间不能小于当前时间！", 'info');
				return false;
			}
		}
		
	}
	if(endThree.length != 0){
		if(startThree.length == 0){
			$.messager.alert('提示', "应邀时段3开始时间不能为空！", 'info');
			return false;
		}else if(respThreeNum == 0){
			$.messager.alert('提示', "应邀时段3需求响应量不能为空！", 'info', function(){
				$('#respThreeNum').textbox('textbox').focus();
				$('#respThreeNum').textbox('showPanel');
		     });
			return false;
		}else if(startThree > endThree){
			$.messager.alert('提示', "应邀时段3开始时间不能大于结束时间！", 'info');
			return false;
		/*}else if(endThree == endOne || endThree == endTwo){
			$.messager.alert('提示', "应邀时段3结束时间不能重复！", 'info');
			return false;*/
		}
		if(resDate <= ymd){
			if(endThree < hm){
				$.messager.alert('提示', "应邀时段3结束时间不能小于当前时间！", 'info');
				return false;
			}
		}
		
	}
	if(respThreeNum != 0){
		if(startThree.length == 0){
			$.messager.alert('提示', "应邀时段3开始时间不能为空！", 'info');
			return false;
		}else if(endThree.length == 0){
			$.messager.alert('提示', "应邀时段3结束时间不能为空！", 'info');
			return false;
		}else if(startThree > endThree){
			$.messager.alert('提示', "应邀时段3开始时间不能大于结束时间！", 'info');
			return false;
		}
	}
	if(startOne.length == 0 && endOne.length == 0 && respOneNum == 0 && startTwo.length == 0 && endTwo.length == 0 && respTwoNum == 0 && startThree.length == 0 && endThree.length == 0 && respThreeNum == 0){
		$.messager.alert('提示', "至少填写一个应邀时段信息！", 'info');
		
		return false;
	}
	if(memo.length > 64){
		$.messager.alert('提示', "备注内容输入过长！", 'info', function(){
			$('#memo').textbox('textbox').focus();
			$('#memo').textbox('showPanel');
	     });
		return false;
	}
	return true;
}

//关闭窗口
function cxClose(){
	qingkong();//调用清空方法
	$('#gjxxpz-cl-panel').dialog('close');//关闭面板操作
}
/**
 * 清空面板所有数据值
 * @returns
 */
function qingkong(){
	$('#respSource').textbox('setValue','');
	$('#resDate').datebox('setValue','');
	$('#startOne').val('');
	$('#endOne').val('');
	$('#respOneNum').numberbox('setValue','');
	$('#startTwo').val('');
	$('#endTwo').val('');
	$('#respTwoNum').numberbox('setValue','');
	$('#startThree').val('');
	$('#endThree').val('');
	$('#respThreeNum').numberbox('setValue','');
	$('#memo').textbox('setValue','');
	
	$("input:radio[name='respType']").eq(0).attr("checked",true);
	$("input:radio[name='respTactic']").eq(0).attr("checked",true);
}

/**
 * 添加指标
 * @returns
 */
function addData(){
	isAdd = true;//添加状态
	$('#gjxxpz-cl-panel').dialog('open');//打开面板操作
	$('#gjxxpz-cl-panel').dialog('setTitle','添加指标');//面板title的内容
}

/**
 * 修改指标
 * @returns
 */
function updData(){
	isAdd = false;//修改状态
	//获取页面dataGrid中选中的记录对象
	var rows = $('#dataGrid').datagrid("getSelected");
	//获取对象之后判断操作
	if(rows==null){
		$.messager.alert('提示', "请选择一条信息！", 'warning');
	}else if(rows.status != 1){
		$.messager.alert('提示', "当前记录不可修改！", 'warning');
	}else{
		//打开响应指标面板
		$('#gjxxpz-cl-panel').dialog('open');
		$('#gjxxpz-cl-panel').dialog('setTitle','修改指标');
		
		//把获取的对象中的字段值添加到面板内容汇总
		$('#respSource').textbox('setValue',rows.respSource);
		$('#resDate').datebox('setValue',rows.resDate);
		$('#startOne').val(rows.startOne);
		$('#endOne').val(rows.endOne);
		$('#respOneNum').numberbox('setValue',rows.respOneNum);
		$('#startTwo').val(rows.startTwo);
		$('#endTwo').val(rows.endTwo);
		$('#respTwoNum').numberbox('setValue',rows.respTwoNum);
		$('#startThree').val(rows.startThree);
		$('#endThree').val(rows.endThree);
		$('#respThreeNum').numberbox('setValue',rows.respThreeNum);
		$('#memo').textbox('setValue',rows.memo);
		//响应类型单选
		if(rows.respType == 0){
			$("input:radio[name='respType']").eq(0).attr("checked",true);
		}else{
			$("input:radio[name='respType']").eq(1).attr("checked",true);
		}
		//响应策略单选
		if(rows.respTactic == 0){
			$("input:radio[name='respTactic']").eq(0).attr("checked",true);
		}else{
			$("input:radio[name='respTactic']").eq(1).attr("checked",true);
		}
	}
	updRows = rows;
}

/**
 * 删除指标
 * @returns
 */
function delData(){
	//获取dataGrid中选中记录对象
	var rows = $('#dataGrid').datagrid("getSelected");
	//验证dataGrid所选中记录信息
	if(rows==null){
		$.messager.alert('提示', "请选择一条信息！", 'info');
	}else if(rows.status == 3){
		$.messager.alert('提示', "当前记录不可删除！", 'info');
	}else{
		$.messager.confirm('确认', '确定删除该指标？', function(r){
			if(r){
				//调用后台删除响应指标方法
				$.getJSON(webContextRoot + 'zbxf/deleteRespRecordInfo.action',
						{ 
							'respRecordModel.respId': rows.respId
						},
						function(json){
							 if(json.success=="true"){//处理返回结果
						    	$.messager.alert('确认', "删除成功！", 'info', function(r){
						    		cxClose();//调用关闭按钮
						    		queryXyzb();//重新查询响应指标信息
						    	});
							 }else{
								 $.messager.alert('确认', "删除失败！", 'warning');//移除失败
							 }
						},"json");
			}
		});
	}
}

/**
 * 分解指标信息展示
 * @returns
 */
function zbfjPanel(){
	//获取dataGrid中选中记录对象
	var rows = $('#dataGrid').datagrid("getSelected");
	//校验所选中记录
	if(rows==null){
		$.messager.alert('提示', "请选择一条信息！", 'warning');
	}else{
		if(rows.status != '3'){//判断状态不为已下发时可以进行分解
			$('#zbfj-panel').dialog('open');//打开面板内容
			$('#zbfj-panel').dialog('setTitle','指标分解');
			//获取选中dataGrid的数据信息
			var startOne = rows.startOne==null?'-':rows.startOne;
			var endOne = rows.endOne==null?'-':rows.endOne;
			respOneNum = rows.respOneNum==null?'-':rows.respOneNum;
			var startTwo = rows.startTwo==null?'-':rows.startTwo;
			var endTwo = rows.endTwo==null?'-':rows.endTwo;
			respTwoNum = rows.respTwoNum==null?'-':rows.respTwoNum;
			var startThree = rows.startThree==null?'-':rows.startThree;
			var endThree = rows.endThree==null?'-':rows.endThree;
			respThreeNum = rows.respThreeNum==null?'-':rows.respThreeNum;
			respDate = rows.resDate;
			respId = rows.respId;
			var memo = rows.memo == null ?'':rows.memo;
			var bzCount = memo.replace(/(\n|\r\n)+/g, ' ').split(' ');
			var beizhu = bzCount[0]; 
			if(bzCount.length > 1){
				beizhu +=  '...';
			}else{
				if(beizhu.length > 50){
					beizhu = beizhu.substring(0,53)+'...';
				}
			}
			//获取数据，并为其添加面板内容中
			$('#lab_xyly').text(rows.respSource);
			$('#lab_xyrq').text(rows.resDate);
			$('#lab_yysd_one').text(startOne+'~'+endOne);
			$('#lab_xyl_one').text(respOneNum);
			$('#lab_yysd_two').text(startTwo+'~'+endTwo);
			$('#lab_xyl_two').text(respTwoNum);
			$('#lab_yysd_three').text(startThree+'~'+endThree);
			$('#lab_xyl_three').text(respThreeNum);
			$('#lab_bz').text(beizhu);
			$("#lab_bz").attr("title",memo);
			rowData = rows;//记录所选中对象
			$('#consName').textbox('setValue','');//初始化客户名称查询input输入框
			//调用查询响应指标明细记录信息
			queryDetail(true,rows.status);
		}else{
			$.messager.alert('提示', "指标已下发无法进行分解！", 'warning');
		}
	}
}

/**
 * 下发指标信息展示
 * @returns
 */
function zbxd(){
	//获取dataGrid中选中记录对象
	var rows = $('#dataGrid').datagrid("getSelected");
	//校验所选中记录
	if(rows==null){
		$.messager.alert('提示', "请选择一条信息！", 'info');
	}else{
		if(rows.status == 2){//当状态为已分解时，表示可以下发该指标
			$.messager.confirm('确认', '确定下发该指标？', function(r){
				if(r){
					//调用后台方法下发指标
					$.post(webContextRoot +'zbxf/updateRespRecordInfo.action', 
							{
								'respRecordModel.respId' : rows.respId,
								'respRecordModel.upUserId': userId,
								'respRecordModel.status': 3
							},
						   	function(data){//回调
								if(data.success=="true"){//处理返回结果
							    	$.messager.alert('确认', "下发成功！", 'info', function(r){
							    		queryXyzb();//重新查询响应指标信息
							    	});
								 }else{
									 $.messager.alert('确认', "下发失败！", 'warning');//移除失败
								 }
					},"json");
				}
			});
		}else if(rows.status == 1){
			$.messager.alert('提示', "请为该指标进行分解后下发!", 'warning');
		}else{
			$.messager.alert('提示', "选择的记录已经成功下发!", 'warning');
		}
	}
}

var oldChangeFiled='';
var detailData;

/**
 * 获取指标和响应明细信息（并校验数据）
 * @param flag
 * @returns
 */
function queryDetail(flag,status){
	var lastIndex;
	//获取客户名称输入框内容
	var consName = $.trim($('#consName').textbox('getValue')); 
	//定义分解指标的dataGrid列信息
	var detailColums = [[
				{field:'detailId',title:'ID',hidden:true},
				{field:'consName',title:'客户名称',width:'29%',align:'center'},
				{field:'contractCap',title:'合同容量',width:'15%',align:'center',formatter:function(v,row,index){
					if(v){
						return new Number(v);
					}
				}},
				{field:'respNum',title:'约定响应能力',width:'14%',align:'center',sortable:true,sorter:numberSort},
				{field:'timeOneNum',title:'时段1邀约响应量',width:'14%',align:'center',sortable:true,sorter:numberSort,editor:{type:'numberbox',options:{min:0,precision:2}},formatter:function(v,row,index){
					if(v){
						return new Number(v);
					}
				}},
				{field:'timeTwoNum',title:'时段2邀约响应量',width:'14%',align:'center',sortable:true,sorter:numberSort,editor:{type:'numberbox',options:{min:0,precision:2}},formatter:function(v,row,index){
					if(v){
						return new Number(v);
					}
				}},
				{field:'timeThreeNum',title:'时段3邀约响应量',width:'14%',align:'center',sortable:true,sorter:numberSort,editor:{type:'numberbox',options:{min:0,precision:2}},formatter:function(v,row,index){
					if(v){
						return new Number(v);
					}
				}}
				]];
	//判断响应指标明细数据是否从后台重新获取（true-后台重新获取，false-不重新获取，取前端保存的数据）
	if(flag){
		$.post(webContextRoot +'zbxf/queryRespDetailInfo.action', 
			{
				'respDetailModel.respId' : respId,
				'respDetailModel.respDate' : respDate,
				'respDetailModel.consName' : consName
			},
		   	function(data){//回调
				for(var i=0;i<data.length;i++){
					if(status == '1'){
						if(data[i].respOneNum != ''){
							var a = data[i].respNum/data[i].detailCount*data[i].respOneNum;
							data[i].timeOneNum = a.toFixed(2);
						}else{
							data[i].timeOneNum = '';
						}
						if(data[i].respTwoNum != ''){
							var b = data[i].respNum/data[i].detailCount*data[i].respTwoNum;
							data[i].timeTwoNum = b.toFixed(2);
						}else{
							data[i].timeTwoNum = '';
						}
						if(data[i].respThreeNum != ''){
							var c = data[i].respNum/data[i].detailCount*data[i].respThreeNum;
							data[i].timeThreeNum = c.toFixed(2);
						}else{
							data[i].timeThreeNum = '';
						}
					}else{
						if(data[i].timeOneNum == ''){
							data[i].timeOneNum = '';
						}
						if(data[i].timeTwoNum == ''){
							data[i].timeTwoNum = '';
						}
						if(data[i].timeThreeNum == ''){
							data[i].timeThreeNum = '';	
						}
					}
					
				}
				detailData = data;//保存后台所查询的响应指标明细数据
				loadDetail(detailColums,data);//加载响应指标明细数据，并校验和分页
		},"json");//返回格式
	}else{
		//定义空的数据用于保存通过前端查询的数据
		var ls_data = [];
		if(consName.length != 0){
			for(var i=0;i<detailData.length;i++){
				if(detailData[i].consName.indexOf(consName) != -1){//校验客户名称输入框的内容和后台所查询的数据集对象中是否有相同
					ls_data.push(detailData[i]);//把相同的记录添加到新的空数组中
				}
			}
		}else{
			//客户输入框内容为空，就重新使用原有的数据集
			ls_data = detailData;
		}
		//加载响应指标明细数据，并校验和分页
		loadDetail(detailColums,ls_data);
	}
}

function numberSort(a,b){
	var a1 = parseFloat(a==''?0:a);
	var a2 = parseFloat(b==''?0:b);
	return (a1 > a2 ? 1 : -1);
}

var errorFlag = true;
var staticDfplOne;
var staticDfplTwo;
var staticDfplThree;
var pgNo = 1;

/**
 * 加载响应指标明细数据，并校验和分页
 * @param colums
 * @param data
 * @returns
 */
function loadDetail(colums,data){
	$('#dataGridDetail').datagrid({// 表格
		nowrap : false,// 设置为true，当数据长度超出列宽时将会自动截取。
		striped : true,// 设置为true将交替显示行背景。
		border:false,
		width:'100%',
	    height:'100%',
		pagination : true,// 设置true将在数据表格底部显示分页工具栏。
		sortName : 'respNum',
		sortOrder : 'desc',
		remoteSort:false,
		fitColumns : false,// 自动适应宽度
		singleSelect : true,// 设置为true将只允许选择一行。
		rownumbers : true,// 设置为true将显示行数。
		pageNumber:1,//在设置分页属性的时候初始化页码。
		pageSize:10,//在设置分页属性的时候初始化页面大小。
		loadMsg : "正在努力的读取数据中...",// 提示信息
		columns : colums,//字段
		
		data:data,
		onSortColumn : function (sort,order){
			setPage(pgNo);
		},
		onEndEdit:function(rowIndex, rowData, changes){
			errorFlag = true;
			var fieldStr = oldChangeFiled;//编辑字段
			for(var filed in changes){//获取编辑字段名称 
				fieldStr = filed;
				oldChangeFiled = filed;
			}
			var sumNum=0;
			var warnMesg='';//超限制提示信息
			if(fieldStr=="timeOneNum"){
				sumNum = $('#lab_xyl_one').text();
				warnMesg = "时段1邀约响应量合计值不能大于应邀时段1的需求响应量！";
				errorFlag = false;
			}else if(fieldStr=="timeTwoNum"){
				sumNum = $('#lab_xyl_two').text();
				warnMesg = "时段2邀约响应量合计值不能大于应邀时段2的需求响应量！";
				errorFlag = false;
			}if(fieldStr=="timeThreeNum"){
				sumNum = $('#lab_xyl_three').text();
				warnMesg = "时段3邀约响应量合计值不能大于应邀时段3的需求响应量！";
				errorFlag = false;
			}
			
			checkData(fieldStr,sumNum);
			
			/*if(checkData(fieldStr,sumNum)==false){
				$.messager.alert('提示', warnMesg, 'warning');
//				$('#dataGridDetail').datagrid('rejectChanges');//回滚修改
				var param = {index:rowIndex,field:fieldStr};//编辑单元格参数（对象）  index 行号   field 编辑字段
				//获取所有编辑字段
				var fields = $(this).datagrid('getColumnFields',true).concat($(this).datagrid('getColumnFields'));
				for(var i=0; i<fields.length; i++){//循环字段
					var col = $(this).datagrid('getColumnOption', fields[i]);//获取单元格对象
					col.editor1 = col.editor;//保存单元格编辑对象
					if (fields[i] != param.field){//不是当前的编辑的单元格  去除编辑状态
						col.editor = null;
					}
				}
//				if(errorFlag){
					$(this).datagrid('beginEdit', param.index);//激活行的编辑状态
	                var ed = $(this).datagrid('getEditor', param);//获取编辑单元格
	                if (ed){//设置单元格的编辑焦点
	                    if ($(ed.target).hasClass('numberbox-f')){
	                    	
//	                        $(ed.target).numberbox('numberbox').focus();
//	                        $(ed.target).textbox('textbox').focus();
	                    } else {
	                        $(ed.target).focus();
	                    }
	                	
//	                    $(ed.target).focus();
	                }
					for(var i=0; i<fields.length; i++){//还原单元格的编辑对象
						var col = $(this).datagrid('getColumnOption', fields[i]);
						col.editor = col.editor1;
					}
//				}
					
			}*/
			/*else{
				fieldStr = 'timeTwoNum';
				var param = {index:rowIndex,field:fieldStr};//编辑单元格参数（对象）  index 行号   field 编辑字段
				//获取所有编辑字段
				var fields = $(this).datagrid('getColumnFields',true).concat($(this).datagrid('getColumnFields'));
				$(this).datagrid('beginEdit', param.index);//激活行的编辑状态
				for(var i=0; i<fields.length; i++){//循环字段
					var col = $(this).datagrid('getColumnOption', fields[i]);//获取单元格对象
					col.editor1 = col.editor;//保存单元格编辑对象
					if (fields[i] == param.field){//不是当前的编辑的单元格  去除编辑状态
						col.editor = editor;
					}
				}
			}*/
		}
	});
	
		var hs_one = 0;
		var hs_two = 0;
		var hs_three = 0;
		var fpl_one = 0;
		var fpl_two = 0;
		var fpl_three = 0;
		for(var i =0;i<detailData.length;i++){
			if(detailData[i].timeOneNum != '0.00' && detailData[i].timeOneNum != ''){
				fpl_one = fpl_one + parseFloat(detailData[i].timeOneNum);
				hs_one += 1;
			}
			if(detailData[i].timeTwoNum != '0.00' && detailData[i].timeTwoNum != ''){
				fpl_two += parseFloat(detailData[i].timeTwoNum);
				hs_two += 1;
			}
			if(detailData[i].timeThreeNum != '0.00' && detailData[i].timeThreeNum != ''){
				fpl_three += parseFloat(detailData[i].timeThreeNum);
				hs_three += 1;
			}
		}
		
		$('#lab_yyhs_one').text(hs_one);
		$('#lab_yyhs_two').text(hs_two);
		$('#lab_yyhs_three').text(hs_three);
		var valOne = '-';
		var valTwo = '-';
		var valThree = '-';
		if(rowData.respOneNum != null){
			valOne = (rowData.respOneNum-fpl_one.toFixed(2)).toFixed(2);
		}
		if(rowData.respTwoNum != null){
			valTwo = (rowData.respTwoNum-fpl_two.toFixed(2)).toFixed(2);
		}
		if(rowData.respThreeNum != null){
			valThree = (rowData.respThreeNum-fpl_three.toFixed(2)).toFixed(2);
		}
		staticDfplOne = valOne;
		staticDfplTwo = valTwo;
		staticDfplThree = valThree;
		$('#lab_dbfpl_one').text(valOne);
		$('#lab_dbfpl_two').text(valTwo);
		$('#lab_dbfpl_three').text(valThree);
	
		$('#dataGridDetail').datagrid('getPanel').keyup(function (e) {
				if (e.keyCode == 13){//左右选择键
				accept();
			}
		});
	
		$('#dataGridDetail').datagrid("loaded");//loading画面关闭
		$('#dataGridDetail').datagrid('loadData', data);//加载数据
		if(data.length>0){
			$('#dataGridDetail').datagrid('loadData', data.slice(0,10));//加载0到10的数据
		}
		var pager = $('#dataGridDetail').datagrid("getPager");
		pager.pagination({
			total:data.length,
			pageSize:10,//每页记录数
			pageList: [10,50,100],//可以设置每页记录条数的列表  
			beforePageText:'第',
			afterPageText:'页 共 {pages} 页',
			displayMsg:'当前显示 {from} - {to} 条记录,共 {total} 条记录',
			onSelectPage:setPage
		});
}

function setPage(pageNo){
	pgNo = pageNo;
	var pager = $('#dataGridDetail').datagrid("getPager");
	var pageSize = $('#dataGridDetail').datagrid("options").pageSize;
	
	var labOne = $('#lab_dbfpl_one').text();
	var labTwo = $('#lab_dbfpl_two').text();
	var labThree = $('#lab_dbfpl_three').text();
	if(staticDfplOne != labOne || staticDfplTwo != labTwo || staticDfplThree != labThree){
		$.messager.confirm('确认', '是否保存数据？', function(r){
			if(r){
				saveFlag = false;
				cxDetailSave();
				staticDfplOne = labOne;
				staticDfplTwo = labTwo;
				staticDfplThree = labThree;
				
				var start = (pageNo-1)*pageSize;//计算分页数据开始
				var end = start+ pageSize;//计算分页数据结束
				$('#dataGridDetail').datagrid('loadData',detailData.slice(start,end));//分页加载每页条目
				pager.pagination('refresh',{
					total:detailData.length,//总记录条数
					pageNumber:pageNo//页面
				});
			}
			
		});
	}else{
		var start = (pageNo-1)*pageSize;//计算分页数据开始
		var end = start+ pageSize;//计算分页数据结束
		$('#dataGridDetail').datagrid('loadData',detailData.slice(start,end));//分页加载每页条目
		pager.pagination('refresh',{
			total:detailData.length,//总记录条数
			pageNumber:pageNo//页面
		});
	}
	
	
	saveFlag = true;
}

function showXQ(rid){
	$('#consNameShow').textbox('setValue','');
	var dg = $('#dataGrid').datagrid('getRows');
	for(var i=0;i<dg.length;i++){
		if(rid==dg[i].respId){
			var startOne = dg[i].startOne==null?'-':dg[i].startOne;
			var endOne = dg[i].endOne==null?'-':dg[i].endOne;
			respOneNum = dg[i].respOneNum==null?'-':dg[i].respOneNum;
			var startTwo = dg[i].startTwo==null?'-':dg[i].startTwo;
			var endTwo = dg[i].endTwo==null?'-':dg[i].endTwo;
			respTwoNum = dg[i].respTwoNum==null?'-':dg[i].respTwoNum;
			var startThree = dg[i].startThree==null?'-':dg[i].startThree;
			var endThree = dg[i].endThree==null?'-':dg[i].endThree;
			respThreeNum = dg[i].respThreeNum==null?'-':dg[i].respThreeNum;
			respDate = dg[i].resDate;
			respId = dg[i].respId;
			var memo = dg[i].memo;
			if(memo == null){
				memo = '';
			}
			var bzCount = memo.replace(/(\n|\r\n)+/g, ' ').split(' ');
			var beizhu = bzCount[0]; 
			if(bzCount.length > 1){
				beizhu +=  '...';
			}else{
				if(beizhu.length > 50){
					beizhu = beizhu.substring(0,53)+'...';
				}
			}
			
			if(dg[i].status!='1'){
				$('#show-panel').dialog('open');
				$('#show-panel').dialog('setTitle','指标详情');
				$('#lab_s_xyly').text(dg[i].respSource);
				$('#lab_s_xyrq').text(dg[i].resDate);
				$('#lab_s_yysd_one').text(startOne+'~'+endOne);
				$('#lab_s_xyl_one').text(respOneNum);
				$('#lab_s_yysd_two').text(startTwo+'~'+endTwo);
				$('#lab_s_xyl_two').text(respTwoNum);
				$('#lab_s_yysd_three').text(startThree+'~'+endThree);
				$('#lab_s_xyl_three').text(respThreeNum);
				$('#lab_s_bz').text(beizhu);
				$("#lab_s_bz").attr("title",memo);
				showDetail(dg[i].respId,dg[i].resDate,respOneNum,respTwoNum,respThreeNum,true);
			}else{
				$('#show-o-panel').dialog('open');
				$('#show-o-panel').dialog('setTitle','指标详情');
				$('#lab_o_xyly').text(dg[i].respSource);
				$('#lab_o_xyrq').text(dg[i].resDate);
				$('#lab_o_yysd_one').text(startOne+'~'+endOne);
				$('#lab_o_xyl_one').text(respOneNum);
				$('#lab_o_yysd_two').text(startTwo+'~'+endTwo);
				$('#lab_o_xyl_two').text(respTwoNum);
				$('#lab_o_yysd_three').text(startThree+'~'+endThree);
				$('#lab_o_xyl_three').text(respThreeNum);
				$('#lab_o_bz').text(beizhu);
				$("#lab_o_bz").attr("title",memo);
			}
			rowData = dg[i];
		}
	}
}

var showDetailData;

//响应明细信息
function showDetail(rId,rDate,respOneNum,respTwoNum,respThreeNum,flag){
	var lastIndex;
	var consName = $.trim($('#consNameShow').textbox('getValue'));
	var detailColums = [[
				{field:'consName',title:'客户名称',width:'29%',align:'center'},
				{field:'contractCap',title:'合同容量',width:'15%',align:'center',formatter:function(v,row,index){
					if(v){
						return new Number(v);
					}
				}},
				{field:'respNum',title:'约定响应能力',width:'14%',align:'center',sortable:true,sorter:numberSort},
				{field:'timeOneNum',title:'时段1邀约响应量',width:'14%',align:'center',sortable:true,sorter:numberSort,editor:{type:'numberbox',options:{min:0,precision:2}},formatter:function(v,row,index){
					if(v){
						return new Number(v);
					}
					/*var a = row.respNum/row.detailCount*row.respOneNum;
					if(a != 0){
						return new Number(a.toFixed(2));
					}*/
				}},
				{field:'timeTwoNum',title:'时段2邀约响应量',width:'14%',align:'center',sortable:true,sorter:numberSort,editor:{type:'numberbox',options:{min:0,precision:2}},formatter:function(v,row,index){
					if(v){
						return new Number(v);
					}
					/*var a = row.respNum/row.detailCount*row.respTwoNum;
					if(a != 0){
						return new Number(a.toFixed(2));
					}*/
				}},
				{field:'timeThreeNum',title:'时段3邀约响应量',width:'14%',align:'center',sortable:true,sorter:numberSort,editor:{type:'numberbox',options:{min:0,precision:2}},formatter:function(v,row,index){
					if(v){
						return new Number(v);
					}
					/*var a = row.respNum/row.detailCount*row.respThreeNum;
					if(a != 0){
						return new Number(a.toFixed(2));
					}*/
				}}
				]];
	if(flag){
		$.post(webContextRoot +'zbxf/queryRespDetailInfo.action', 
				{
					'respDetailModel.respId' : rId,
					'respDetailModel.respDate' : rDate,
					'respDetailModel.consName' : consName
				},
			   	function(data){//回调
					for(var i=0;i<data.length;i++){
						if(status == '1'){
							if(data[i].respOneNum != ''){
								var a = data[i].respNum/data[i].detailCount*data[i].respOneNum;
								data[i].timeOneNum = a.toFixed(2);
							}else{
								data[i].timeOneNum = '';
							}
							if(data[i].respTwoNum != ''){
								var b = data[i].respNum/data[i].detailCount*data[i].respTwoNum;
								data[i].timeTwoNum = b.toFixed(2);
							}else{
								data[i].timeTwoNum = '';
							}
							if(data[i].respThreeNum != ''){
								var c = data[i].respNum/data[i].detailCount*data[i].respThreeNum;
								data[i].timeThreeNum = c.toFixed(2);
							}else{
								data[i].timeThreeNum = '';
							}
						}else{
							if(data[i].timeOneNum == ''){
								data[i].timeOneNum = '';
							}
							if(data[i].timeTwoNum == ''){
								data[i].timeTwoNum = '';
							}
							if(data[i].timeThreeNum == ''){
								data[i].timeThreeNum = '';	
							}
						}
						
					}
					
					showDetailData = data;
					loadShowDetail(detailColums,data);
		   	},"json");//返回格式
	}else{
		var ls_data = [];
		if(consName.length != 0){
			for(var i=0;i<showDetailData.length;i++){
				if(showDetailData[i].consName.indexOf(consName) != -1){
					ls_data.push(showDetailData[i]);
				}
			}
		}else{
			ls_data = showDetailData;
		}
		
		loadShowDetail(detailColums,ls_data);
	}
}

function loadShowDetail(detailColums,data){
	$('#dataGridDetailShow').datagrid({// 表格
		nowrap : false,// 设置为true，当数据长度超出列宽时将会自动截取。
		striped : true,// 设置为true将交替显示行背景。
		border:false,
		width:'100%',
	    height:'100%',
	    sortName : 'respNum',
		sortOrder : 'desc',
		remoteSort:false,
		pagination : true,// 设置true将在数据表格底部显示分页工具栏。
		fitColumns : false,// 自动适应宽度
		singleSelect : true,// 设置为true将只允许选择一行。
		rownumbers : true,// 设置为true将显示行数。
		pageNumber:1,//在设置分页属性的时候初始化页码。
		pageSize:50,//在设置分页属性的时候初始化页面大小。
		loadMsg : "正在努力的读取数据中...",// 提示信息
		columns : detailColums,//字段
		data:data,onEndEdit:function(rowIndex, rowData, changes){
			errorFlag = true;
			var fieldStr = oldChangeFiled;//编辑字段
			for(var filed in changes){//获取编辑字段名称 
				fieldStr = filed;
				oldChangeFiled = filed;
			}
			var sumNum=0;
			var warnMesg='';//超限制提示信息
			if(fieldStr=="timeOneNum"){
				sumNum = $('#lab_xyl_one').text();
				warnMesg = "时段1邀约响应量合计值不能大于应邀时段1的需求响应量！";
				errorFlag = false;
			}else if(fieldStr=="timeTwoNum"){
				sumNum = $('#lab_xyl_two').text();
				warnMesg = "时段2邀约响应量合计值不能大于应邀时段2的需求响应量！";
				errorFlag = false;
			}if(fieldStr=="timeThreeNum"){
				sumNum = $('#lab_xyl_three').text();
				warnMesg = "时段3邀约响应量合计值不能大于应邀时段3的需求响应量！";
				errorFlag = false;
			}
			
			checkData(fieldStr,sumNum);
			
		}
	});
	
		var hs_one = 0;
		var hs_two = 0;
		var hs_three = 0;
		var fpl_one = 0;
		var fpl_two = 0;
		var fpl_three = 0;
		for(var i =0;i<showDetailData.length;i++){
			if(showDetailData[i].timeOneNum != '0.00' && showDetailData[i].timeOneNum != ''){
				fpl_one = fpl_one + parseFloat(showDetailData[i].timeOneNum);
				hs_one += 1;
			}
			if(showDetailData[i].timeTwoNum != '0.00' && showDetailData[i].timeTwoNum != ''){
				fpl_two += parseFloat(showDetailData[i].timeTwoNum);
				hs_two += 1;
			}
			if(showDetailData[i].timeThreeNum != '0.00' && showDetailData[i].timeThreeNum != ''){
				fpl_three += parseFloat(showDetailData[i].timeThreeNum);
				hs_three += 1;
			}
		}
		
		
		$('#lab_s_yyhs_one').text(hs_one);
		$('#lab_s_yyhs_two').text(hs_two);
		$('#lab_s_yyhs_three').text(hs_three);
		var valOne = '-';
		var valTwo = '-';
		var valThree = '-';
		if(rowData.respOneNum != null){
			valOne = (rowData.respOneNum-fpl_one.toFixed(2)).toFixed(2);
		}
		if(rowData.respTwoNum != null){
			valTwo = (rowData.respTwoNum-fpl_two.toFixed(2)).toFixed(2);
		}
		if(rowData.respThreeNum != null){
			valThree = (rowData.respThreeNum-fpl_three.toFixed(2)).toFixed(2);
		}
		staticDfplOne = valOne;
		staticDfplTwo = valTwo;
		staticDfplThree = valThree;
		$('#lab_s_dbfpl_one').text(valOne);
		$('#lab_s_dbfpl_two').text(valTwo);
		$('#lab_s_dbfpl_three').text(valThree);
	
		$('#dataGridDetail').datagrid('getPanel').keyup(function (e) {
				if (e.keyCode == 13){//左右选择键
				accept();
			}
		});
	
		$('#dataGridDetailShow').datagrid("loaded");//loading画面关闭
		$('#dataGridDetailShow').datagrid('loadData', data);//加载数据
		if(data.length>0){
			$('#dataGridDetailShow').datagrid('loadData', data.slice(0,50));//加载0到10的数据
		}
		var pager = $('#dataGridDetailShow').datagrid("getPager");
		pager.pagination({
			total:data.length,
			pageSize:50,//每页记录数
			pageList: [30,50,100],//可以设置每页记录条数的列表  
			beforePageText:'第',
			afterPageText:'页 共 {pages} 页',
			displayMsg:'当前显示 {from} - {to} 条记录,共 {total} 条记录',
			onSelectPage:function(pageNo,pageSize){
				var start = (pageNo-1)*pageSize;//计算分页数据开始
				var end = start+ pageSize;//计算分页数据结束
				$('#dataGridDetailShow').datagrid('loadData',data.slice(start,end));//分页加载每页条目
				pager.pagination('refresh',{
					total:data.length,//总记录条数
					pageNumber:pageNo//页面
				});
			}
		});
	
}


//数据校验
//fieldStr 字段名
//sumNum 合计值
function checkData(fieldStr,sumNum){
	var rows = $('#dataGridDetail').datagrid('getData');//获取表格数据
	for(var i=0;i<detailData.length;i++){
		for(var j=0;j<rows.rows.length;j++){//循环行找当前字段的合计值
			if(detailData[i].userId == rows.rows[j].userId){
				detailData[i].timeOneNum = rows.rows[j].timeOneNum;
				detailData[i].timeTwoNum = rows.rows[j].timeTwoNum;
				detailData[i].timeThreeNum = rows.rows[j].timeThreeNum;
			}
		}
	}
	
	var fieldNum = 0;//所有行的某个字段的合计值
	var yyhs = 0;//邀约户数
	for(var i=0;i<detailData.length;i++){//循环行找当前字段的合计值
		if(parseFloat(detailData[i][fieldStr])>0){
			fieldNum += parseFloat(detailData[i][fieldStr]);
			yyhs=yyhs+1;
		}
	}
	if(sumNum == '-'){
		sumNum = 0;
	}
	if(fieldStr=="timeOneNum"){
		/*if(sumNum=='-'){
			$('#lab_dbfpl_one').text(0.00);//剩余量
			$('#lab_yyhs_one').text(0);//分配户数
		}else{
			$('#lab_dbfpl_one').text((sumNum-fieldNum).toFixed(2));//剩余量
			$('#lab_yyhs_one').text(yyhs);//分配户数
		}*/
		$('#lab_dbfpl_one').text((sumNum-fieldNum).toFixed(2));//剩余量
		$('#lab_s_dbfpl_one').text((sumNum-fieldNum).toFixed(2));//剩余量
		$('#lab_yyhs_one').text(yyhs);//分配户数
		$('#lab_s_yyhs_one').text(yyhs);//分配户数
	}else if(fieldStr=="timeTwoNum"){
		/*if(sumNum=='-'){
			$('#lab_dbfpl_two').text(0.00);//剩余量
			$('#lab_yyhs_two').text(0);//分配户数
		}else{
			$('#lab_dbfpl_two').text((sumNum-fieldNum).toFixed(2));//剩余量
			$('#lab_yyhs_two').text(yyhs);//分配户数
		}*/
		$('#lab_dbfpl_two').text((sumNum-fieldNum).toFixed(2));//剩余量
		$('#lab_s_dbfpl_two').text((sumNum-fieldNum).toFixed(2));//剩余量
		$('#lab_yyhs_two').text(yyhs);//分配户数
		$('#lab_s_yyhs_two').text(yyhs);//分配户数
	}if(fieldStr=="timeThreeNum"){
		/*if(sumNum=='-'){
			$('#lab_dbfpl_three').text(0.00);//剩余量
			$('#lab_yyhs_three').text(0);//分配户数
		}else{
			$('#lab_dbfpl_three').text((sumNum-fieldNum).toFixed(2));//剩余量
			$('#lab_yyhs_three').text(yyhs);//分配户数
		}*/
		$('#lab_dbfpl_three').text((sumNum-fieldNum).toFixed(2));//剩余量
		$('#lab_s_dbfpl_three').text((sumNum-fieldNum).toFixed(2));//剩余量
		$('#lab_yyhs_three').text(yyhs);//分配户数
		$('#lab_s_yyhs_three').text(yyhs);//分配户数
	}
	if(sumNum=='-' && fieldNum>0){//无应邀响应量，并且合计数量大于0的时候   直接返回不可分配
		return false;
	}
	if(sumNum!='-' && fieldNum>sumNum){//分配的大于了待分配的
		
		return false;
	}

	return true;
}

var editIndex = undefined;
function endEditing(){
	if (editIndex == undefined){return true}
	if ($('#dataGridDetail').datagrid('validateRow', editIndex)){
		$('#dataGridDetail').datagrid('endEdit', editIndex);
		editIndex = undefined;
		return true;
	} else {
		return false;
	}
}

function accept(){
	if (endEditing()){
		$('#dataGridDetail').datagrid('acceptChanges');
	}
}


function cxDetailSave(){
	detailArr = new Array();
	var dg = $('#dataGridDetail').datagrid('getRows');
	
	var valOne = 0;
	var valTwo = 0;
	var valThree = 0;
	if(dg.length == 0){
		$.messager.alert('提示', "尚未创建签约用户，不能进行指标分解！", 'info');
		return;
	}else{
		for(var i =0;i<dg.length;i++){
		var detail = new Object();
		detail.detailId = dg[i].detailId;
		detail.respId = respId;
		detail.userId = dg[i].userId;
		/*if(dg[i].timeOneNum == '' && dg[i].timeTwoNum == '' && dg[i].timeThreeNum == '' ){
			continue;
		}*/
		if(dg[i].timeOneNum != ''){
			valOne += parseFloat(dg[i].timeOneNum);
		}
		if(dg[i].timeTwoNum != ''){
			valTwo += parseFloat(dg[i].timeTwoNum);
		}
		if(dg[i].timeThreeNum != ''){
			valThree += parseFloat(dg[i].timeThreeNum);
		}
		
		detail.timeOneNum = dg[i].timeOneNum;
		detail.timeTwoNum = dg[i].timeTwoNum;
		detail.timeThreeNum = dg[i].timeThreeNum;
		detailArr.push(detail);
	}
	/*var sumOne = $('#lab_xyl_one').text()=='-'?0:$('#lab_xyl_one').text();
	var sumTwo = $('#lab_xyl_two').text()=='-'?0:$('#lab_xyl_two').text();
	var sumThree = $('#lab_xyl_three').text()=='-'?0:$('#lab_xyl_three').text();
	
	var hsOne = $('#lab_yyhs_one').text();
	var hsTwo = $('#lab_yyhs_two').text();
	var hsThree = $('#lab_yyhs_three').text();
	if(hsOne != 0){
		if(sumOne == 0 || valOne>sumOne){
			$.messager.alert('提示', "时段1邀约响应量合计值不能大于应邀时段1的需求响应量！", 'info');
			return;
		}
	}
	
	if(hsTwo != 0){
		if(sumTwo == 0 || valTwo>sumTwo){
			$.messager.alert('提示', "时段2邀约响应量合计值不能大于应邀时段2的需求响应量！", 'info');
			return;
		}
	}
	
	if(hsThree != 0){
		if(sumThree == 0 || valThree>sumThree){
			$.messager.alert('提示', "时段3邀约响应量合计值不能大于应邀时段3的需求响应量！", 'info');
			return;
		}
	}*/
	var dfplOne = $('#lab_dbfpl_one').text();
	var dfplTwo = $('#lab_dbfpl_two').text();
	var dfplThree = $('#lab_dbfpl_three').text();
	if(dfplOne < 0){
		$.messager.alert('提示', "时段1邀约响应量合计值不能大于应邀时段1的需求响应量！", 'info');
		return;
	}
	if(dfplTwo < 0){
		$.messager.alert('提示', "时段2邀约响应量合计值不能大于应邀时段2的需求响应量！", 'info');
		return;
	}
	if(dfplThree < 0){
		$.messager.alert('提示', "时段3邀约响应量合计值不能大于应邀时段3的需求响应量！", 'info');
		return;
	}
	$.getJSON(webContextRoot +'zbxf/insertRespDetailInfo.action', 
			{'jsonStr' : JSON.stringify(detailArr), //获取封装JSON后的参数
			
			},
		   	function(data){//回调
				if(data.success=="true"){
			    	$.messager.alert('确认', "保存成功！", 'info', function(r){
			    		if(saveFlag){
			    			cxDetailClose();
			    			queryXyzb();
			    		}
			    	});
				 }else{
					 $.messager.alert('确认', "保存失败！", 'warning');//移除失败
				 }
	   	},"json");//返回格式
	}
	
	
}

function cxDetailClose(){
	$('#zbfj-panel').dialog('close');
}

$.extend($.fn.datagrid.methods, {
	editCell: function(jq,param){
		return jq.each(function(){
			var opts = $(this).datagrid('options');
			var fields = $(this).datagrid('getColumnFields',true).concat($(this).datagrid('getColumnFields'));
			for(var i=0; i<fields.length; i++){
				var col = $(this).datagrid('getColumnOption', fields[i]);
				col.editor1 = col.editor;
				if (fields[i] != param.field){
					col.editor = null;
				}
			}
			$(this).datagrid('beginEdit', param.index);
            var ed = $(this).datagrid('getEditor', param);
            if (ed){
                if ($(ed.target).hasClass('textbox-f')){
                    $(ed.target).textbox('textbox').focus();
                } else {
                    $(ed.target).focus();
                }
            }
			for(var i=0; i<fields.length; i++){
				var col = $(this).datagrid('getColumnOption', fields[i]);
				col.editor = col.editor1;
			}
		});
	},
    enableCellEditing: function(jq){
        return jq.each(function(){
            var dg = $(this);
            var opts = dg.datagrid('options');
            opts.oldOnClickCell = opts.onClickCell;
            opts.onClickCell = function(index, field){
                if (opts.editIndex != undefined){
                    if (dg.datagrid('validateRow', opts.editIndex)){
                        dg.datagrid('endEdit', opts.editIndex);
                        opts.editIndex = undefined;
                    } else {
                        return;
                    }
                }
                dg.datagrid('selectRow', index).datagrid('editCell', {
                    index: index,
                    field: field
                });
                opts.editIndex = index;
                opts.oldOnClickCell.call(this, index, field);
            }
        });
    }
});


function qytQueryOveride(dateTime){
	var date = $('#dataDate').val();
	var resultDay = timeUtil(dateTime,date);//DateUtil.dateAdd("d", parseInt(dateTime), DateUtil.strToDate(startDay2));//getDateByOffsetDays(startDay2,dateTime);
	$('#dataDate').val(resultDay);
	queryXyzb();
}
function timeUtil(dateTime,startDay){
	var resultStr = "";
	if(dateTime == '1'){
		resultStr = parseInt(startDay) + 1;
	}else if(dateTime == '-1'){
		resultStr = parseInt(startDay) - 1;
	}
	return resultStr;
}

