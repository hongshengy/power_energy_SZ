/**
 * 无功优化 by taoping
 * 
 */
var currentdate = new Date();
// 开始时间
var startTime = currentdate.getFullYear() + "-" + currentdate.getMonth() + "-"
		+ currentdate.getDate() + " 00:00:00";
// 结束时间
var endTime = DateUtil.dateToStr('yyyy-MM-dd HH:mm:ss', currentdate);
var consComboboxSelectd = '';

$(function() {
	$('#searchStartTime').combobox({
		panelWidth : null,
		valueField : 'value',
		textField : 'text',
		editable : false,
		data : [{
			value : '',
			text : '请选择'
		}, {
			value : '1',
			text : '一天内'
		}, {
			value : '2',
			text : '两天内'
		}, {
			value : '3',
			text : '三天内'
		}, {
			value : '4',
			text : '最近一周'
		}, {
			value : '5',
			text : '其他'
		} ],
		onSelect : function(record) {
			if (record.value == '5') {
				$("#selectTime").show();//显示时间控件
				$('#BNTime').datebox('setValue', startTime);// 开始日期
				$('#EdTime').datebox('setValue', endTime);// 结束日期

			} else {
				$("#selectTime").hide();//隐藏时间控件
			}
			 autoResize.call(this); //手动调用激活
		},
		onLoadSuccess : function() {
			$('#searchStartTime').combobox('select', '');//开始时间查询默认为空
		}
	});

	$('#searchRecoverTime').combobox({
		panelWidth : null,
		valueField : 'value',
		textField : 'text',
		editable : false,
		data : [ {
			value : '',
			text : '请选择'
		},{
			value : '1',
			text : '一天内'
		}, {
			value : '2',
			text : '两天内'
		}, {
			value : '3',
			text : '三天内'
		}, {
			value : '4',
			text : '最近一周'
		}, {
			value : '5',
			text : '其他'
		} ],
		onSelect : function(record) {
			if (record.value == '5') {
				$("#selectTimeTwo").show();//显示恢复时间
				$('#RNTime').datebox('setValue', startTime);// 开始日期
				$('#RDTime').datebox('setValue', endTime);// 结束日期

			} else {
				$("#selectTimeTwo").hide();//隐藏时间控件
			}
			 autoResize.call(this); //手动调用激活
		},
		onLoadSuccess : function() {
			$('#searchRecoverTime').combobox('select', '');//恢复时间查询默认为空
		}
	});
	$('#gjcx-datagrid').datagrid({
		title:'无功优化',
		fitColumns: true,
	    singleSelect: true,
	    pagination:true,
		close : true,
		url:basePath + 'shift/selectdesWgyhRecord.action',
		queryParams:{
			'desWgyhRecordModel.recordUser' : $('#searchRecordUser').val(),//记录人
			'desWgyhRecordModel.subsName' : $('#searchSubsName').val(),//用户变名称
			'desWgyhRecordModel.startTimeType' : $("#searchStartTime").combobox("getValue"),//开始时间
			'desWgyhRecordModel.recoverTimeType' : $("#searchRecoverTime").combobox("getValue"),//恢复时间
			'desWgyhRecordModel.startTimeBegin' : $('#BNTime').val(),//开始时间开始
			'desWgyhRecordModel.startTimeEnd' : $('#EdTime').val(),//开始时间结束
			'desWgyhRecordModel.recoverTimeBegin' : $('#RNTime').val(),//恢复时间开始
			'desWgyhRecordModel.recoverTimeEnd' : $('#RDTime').val()//恢复时间结束
		},
		loadMsg:'正在加载，请稍等……',//加载时显示提示
		rownumbers:true,
		fit:true,
		fitColumns:true,
		striped: true,
		singleSelect: true,
		pagination:true,
		pageSize: 20,
		pageList : [10,20,50],
	    onSelect:function (rowIndex, rowData){
	    	selectData = rowData;
	    },onLoadSuccess:function(data){
			var rows = $('#gjcx-datagrid').datagrid("getRows");//获取表格数据行
			if(rows.length>0){
				$('#gjcx-datagrid').datagrid("selectRow",0);//默认选中第一行
			}
		},
		 tools:"#tableToolDiv",		
	    columns: [ [ {
			field : 'checkbox',
			title : '复选框',
			width : 30,
			checkbox : true,
			hidden : true
		},{
			field : 'startTime',
			title : '开始时间',
			width : '10%',
			align : 'left'
		}, {
			field : 'recoverTime',
			title : '恢复时间',
			width : '10%',
			align : 'left'
		}, {
			field : 'recordUser',
			title : '记录人',
			width : '10%',
			align : 'left',
			formatter : function(value, row, index) {
				return HTMLEncode(value);
			}
		},{
			field : 'consNo',
			title : '客户编号',
			width : '9%',
			align : 'left'
		}, {
			field : 'consName',
			title : '客户名称',
			width : '15%',
			align : 'left',
			formatter : function(value, row, index) {
				return HTMLEncode(value);
			}
		}, {
			field : 'subsName',
			title : '用户变名称',
			width : '15%',
			align : 'left',
			formatter : function(value, row, index) {
				return HTMLEncode(value);
			}
		}, {
			field : 'content',
			title : '内容',
			width : '30%',
			align : 'left',
			formatter : function(value, row, index) {
				return HTMLEncode(value);
			}
		}, {
			field : 'subsId',
			title : '内容',
			width : '1%',
			align : 'left',
			hidden : true
		}, {
			field : 'consId',
			title : '内容',
			width : '1%',
			align : 'left',
			hidden : true
		} ] ]
	});
//	bindGridData();
});

/*******************************************************************************
 * 绑定列表数据
 */
function bindGridData() {
	$('#gjcx-datagrid').datagrid('load',{
		'desWgyhRecordModel.recordUser' : $('#searchRecordUser').val(),//记录人
		'desWgyhRecordModel.subsName' : $('#searchSubsName').val(),//用户变名称
		'desWgyhRecordModel.startTimeType' : $("#searchStartTime").combobox("getValue"),//开始时间
		'desWgyhRecordModel.recoverTimeType' : $("#searchRecoverTime").combobox("getValue"),//恢复时间
		'desWgyhRecordModel.startTimeBegin' : $('#BNTime').val(),//开始时间开始
		'desWgyhRecordModel.startTimeEnd' : $('#EdTime').val(),//开始时间结束
		'desWgyhRecordModel.recoverTimeBegin' : $('#RNTime').val(),//恢复时间开始
		'desWgyhRecordModel.recoverTimeEnd' : $('#RDTime').val()//恢复时间结束
	});
}

/**
 * 班次新增
 */
$('#newShiftDialog').dialog({
	closed : true,
	modal : true,
	shadow : false,
	buttons : '#buttons'
});
/**
 * 新增班次按钮点击事件
 */
$("#add").click(function() {		
	consComboboxSelectd = '';
//	$('#startTime').val('');
//	$('#recoverTime').val('');
	$('#startTime').datetimebox('setValue', '');//开始时间清空
	$('#recoverTime').datetimebox('setValue', '');//恢复时间清空
//	$('#content').val('');
	$('#content').textbox('setValue','');//内容清空
	$('#recordUser').textbox('setValue', '');//记录人清空
	bindConsAndSubs();//初始化企业、用户变

	$('#consId').combobox('clear');//客户清空
	$('#consId').combobox('setValue', '');
	SubIni(0);

	
//	$(".panel-header")[0].childNodes[0].innerText = '新建';
	//$(".panel-title").html('新建');
	$("#newShiftDialog").panel({title:"新增"});//设置标题为新建
	isAdd = 1;
	$('#newShiftDialog').window('open');// 新建的打开弹出层
});

var consId = 0;

function SubIni(consId) {
	$('#subsId').combobox({
		url : basePath+ 'destree/queryYhbTree.action?treeState=close&treeNodeType=1&id='+ consId,
		valueField : 'id',
		textField : 'text',
		onSelect : function(record) {
			userTranId = record.id;
		}
	});
}

/**
 * 取消按钮点击事件
 */
$("#quitBtn").click(function() {
	$('#newShiftDialog').window('close');// 关闭修改弹出层
});
/***
 * isAdd：0修改，1：新增
 */
var isAdd = 0;

/**
 * 新增按钮点击事件
 */
$("#addBtn").click(function() {
	if(checkData()){
		if (isAdd == 1) {
			$.ajax({
						type : "post",
						url : basePath
								+ 'shift/addDesWgyhRecord.action',
						dataType : "text",
						data : {
							'desWgyhRecordModel.startTime' : $('#startTime').datetimebox('getValue'),//开始时间
							'desWgyhRecordModel.recoverTime' : $('#recoverTime').datetimebox('getValue'),//恢复时间
							'desWgyhRecordModel.recordUser' : $('#recordUser').val(),//记录人
							'desWgyhRecordModel.consId' : $("#consId").combobox("getValue"),//客户编号
							'desWgyhRecordModel.subsId' : $("#subsId").combobox("getValue"),//用户变编号
							'desWgyhRecordModel.content' : $('#content').val()//内容
						},
						complete : function(XMLHttpRequest,
								textStatus) {
						},
						success : function(data) {
							$.messager.alert('提示',"保存成功！",'info',
							function(r) {
								$('#newShiftDialog').window('close');// 关闭的打开弹出层
								bindGridData();//刷新绑定表格

							});
						},
						error : function(data) {

						}
					});
		} else {
			$.ajax({
				type : "post",
				url : basePath+ 'shift/updateDesWgyhRecord.action',
				dataType : "text",
				data : {
					'desWgyhRecordModel.id' : id,//编号
					'desWgyhRecordModel.startTime' : $('#startTime').datetimebox('getValue'),//开始时间
					'desWgyhRecordModel.recoverTime' : $('#recoverTime').datetimebox('getValue'),//恢复时间
					'desWgyhRecordModel.recordUser' : $('#recordUser').val(),//记录人
					'desWgyhRecordModel.consId' : $("#consId").combobox("getValue"),//客户编号
					'desWgyhRecordModel.subsId' : $("#subsId").combobox("getValue"),//用户变编号
					'desWgyhRecordModel.content' : $('#content').val()//内容
				},
				complete : function(XMLHttpRequest,textStatus) {
				},
				success : function(data) {
					$.messager.alert('提示',"保存成功！",'info',
					function(r) {
						$('#newShiftDialog').window('close');// 关闭的打开弹出层
						bindGridData();//刷新表格数据
					});
				},
				error : function(data) {

				}
			});
		}
	}
});
var consId = 0;
var id = 0;

/**
 * 修改班次按钮点击事件
 */
$("#update").click(function() {
	consComboboxSelectd = '';
	//$(".panel-header")[0].childNodes[0].innerText = '修改';
	//$(".panel-title").html('修改');
	$("#newShiftDialog").panel({title:"修改"});
	var chkRows = $('#gjcx-datagrid').datagrid("getChecked");//获取表格选中行

	if (chkRows.length != 1) {
		$.messager.alert('提示', "请选择一条记录修改！", 'warning');// 移除失败
	} else {
		bindConsAndSubs();//初始化加载客户、用户变

		id = chkRows[0].id;//编号
		$('#consId').combobox('clear');
		$('#consId').combobox('setValue', chkRows[0].consId);//客户赋值
		$('#subsId').combobox('clear');
		$('#subsId').combobox('setValue', chkRows[0].subsId);//用户变赋值
//		$('#startTime').val(chkRows[0].startTime);
//		$('#recoverTime').val(chkRows[0].recoverTime);
		$('#startTime').datetimebox('setValue', chkRows[0].startTime);//开始时间
		$('#recoverTime').datetimebox('setValue', chkRows[0].recoverTime);//恢复时间
		//$('#content')$('#content').val('');.textbox('setValue', chkRows[0].content);
//		$('#content').val(chkRows[0].content);
		$('#content').textbox('setValue',chkRows[0].content);//内容
		$('#recordUser').textbox('setValue', chkRows[0].recordUser);//记录人
		$('#newShiftDialog').window('open');// 新建的打开弹出层

		isAdd = 0;
	}
});

$("#delete").click(
	function() {
		var chkRows = $('#gjcx-datagrid').datagrid("getChecked");
		if (chkRows.length == 0) {
			$.messager.alert('提示', "请选择记录删除！", 'warning');
			return;
		} else {
			$.messager.confirm('提示',"确定删除吗?",
			function(r) {
				if (r) {
					var ids = "";
					for (var i = 0, len = chkRows.length; i < len; i++) {
						ids += chkRows[i].id + ',';
					}
					ids = ids.substr(0,ids.length - 1);

					$.ajax({
						type : "post",
						url : basePath
								+ 'shift/deleteDesWgyhRecord.action',
						dataType : "text",
						data : {
							'id' : ids
						},
						complete : function(XMLHttpRequest,textStatus) {
						},
						success : function(data) {
							$.messager.alert('提示',"删除成功！",'info',function(r) {
									bindGridData();//刷新加载表格数据
							});
						},
						error : function(data) {

						}
					});
				}
			});
		}
	});

/***
 * 初始化客户、用户变数据
 */
function bindConsAndSubs() {
	$('#consId').combobox({
		url : basePath+ 'destree/queryConsList.action',
		valueField : 'id',
		textField : 'text',
		panelHeight:'150',
		mode : 'remote',
		onHidePanel : function(){$('#consId').combobox('reload');},
		onSelect : function(record){
			// 选择客户没变时，不需要再次加载联动控件
			if(consComboboxSelectd != record.id){
				consComboboxSelectd = record.id;
				consId = record.id;
				if (!isNaN(consId)) {
					SubIni(consId);
				}
			}
		}
	});
}

/***
 * 查询功能
 */
$('#search').click(
	function(param) {
		bindGridData();
});

/***
 * 判断数据是否为空
 */
function checkData(){
	//记录人
	if($('#recordUser').val()==""){
		$.messager.alert('提示', "记录人不能为空！", 'warning');
		return false;
	}
	if($('#recordUser').val().length>16){
		$.messager.alert('提示', "记录人信息不能超过16位！", 'warning');
		return false;
	}
	//客户编号
	if($("#consId").combobox("getValue")==""){
		$.messager.alert('提示', "客户名称不能为空！", 'warning');
		return false;
	}
	//用户变编号
	if($("#subsId").combobox("getValue")==""){
		$.messager.alert('提示', "用户变不能为空！", 'warning');
		return false;
	}
	//开始时间
	if($('#startTime').datetimebox('getValue')==""){
		$.messager.alert('提示', "开始时间不能为空！", 'warning');
		return false;
	}
	//恢复时间
	if($('#recoverTime').datetimebox('getValue')==""){
		$.messager.alert('提示', "恢复时间不能为空！", 'warning');
		return false;
	}
	if($('#startTime').datetimebox('getValue')>$('#recoverTime').datetimebox('getValue')){
		$.messager.alert('提示', "恢复时间不能小于开始时间！", 'warning');
		return false;
	}
	//内容
	if($('#content').val()==""){
		$.messager.alert('提示', "内容不能为空！", 'warning');
		return false;
	}	
	if($('#content').val().length>64){
		$.messager.alert('提示', "内容不能超过64位！", 'warning');
		return false;
	}	
	return true;	
}
