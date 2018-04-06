/**
 * 客户用户关系
 * 
 */
var consId = '';//客户编码
var consName = '';//客户名称
var isAdd = true;//是否新增
var updateUserId='';//修改时候的用户编码

$(function() { 
	/***
	 * 初始化客户
	 */
	$('#consCombo').combobox({
		url : webContextRoot + 'rendsMenu/selectkhcheck.action',
		valueField : 'consId',
		panelHeight:250,
//		panelMaxHeight:250,
		textField : 'consName'
	});

	$('#userCombo').combobox({
		url : webContextRoot + 'rendsMenu/selectyhcheck.action',
		panelHeight:250,
		valueField : 'userId',
		textField : 'userName'
	});
	
	bindGridData(); 
});

/*******************************************************************************
 * 绑定列表数据
 */
function bindGridData() {
	var column = [ [  {
		field : 'userName',
		title : '用户名称',
		width : 100,
		align : 'left'
	}, {
		field : 'loginName',
		title : '登录名称',
		width : 100,
		align : 'left'
	}, {
		field : 'consNo',
		title : '客户编码',
		width : 100,
		align : 'left'
	}, {
		field : 'consName',
		title : '客户名称',
		width : 100,
		align : 'left'
	} ] ];

	$('#gjcx-datagrid').datagrid({	
		title:'用户客户关联关系',
//		nowrap : false,// 设置为true，当数据长度超出列宽时将会自动截取。
		striped : true,// 设置为true将交替显示行背景。
		fit: true,
		border:false,
		pageSize:20,
		pagination : true,// 设置true将在数据表格底部显示分页工具栏。
		fitColumns : true,// 自动适应宽度
		singleSelect : true,// 设置为true将只允许选择一行。
		rownumbers : true,// 设置为true将显示行数。
		//url:webContextRoot + 'shift/selectWorkTimeSet.action?workTimeSetModel.consId='+consId,
		queryParams:{},
		loadMsg : "正在努力的读取数据中...",// 提示信息
		columns : column,
		 tools:"#tableToolDiv"
	});
	getGridData();
}

/***
 * 查询用户客户关联关系
 */
function getGridData() {
	$.post(webContextRoot + 'rendsMenu/selectyhkhglgx.action', // 请求路径
	{},// 请求参数
	function(data) {// 回调
		$('#gjcx-datagrid').datagrid("loaded");// loading画面关闭
		$('#gjcx-datagrid').datagrid('loadData', data);// 加载数据
		if (data.length > 0) {
			$('#gjcx-datagrid').datagrid('loadData', data.slice(0, 20));// 加载数据
			$('#gjcx-datagrid').datagrid("selectRow",0);
		}
		// 前台分页
		var pager = $('#gjcx-datagrid').datagrid("getPager");
		pager.pagination({
			total : data.length,
			pageSize : 20,// 每页记录数
			pageList : [ 10, 20, 30, 50 ],// 可以设置每页记录条数的列表
			beforePageText : '第',
			afterPageText : '页 共 {pages} 页',
			displayMsg : '当前显示 {from} - {to} 条记录,共 {total} 条记录',
			onSelectPage : function(pageNo, pageSize) {
				var start = (pageNo - 1) * pageSize;// 计算分页数据开始
				var end = start + pageSize;// 计算分页数据结束
				$('#gjcx-datagrid')
						.datagrid('loadData', data.slice(start, end));// 分页加载每页条目
				pager.pagination('refresh', {
					total : data.length,// 总记录条数
					pageNumber : pageNo
				// 页面
				});
			}
		});
	}, "json");
}
/**
 * 用户客户关联新增
 */
$('#newShiftDialog').dialog({
	//title : '新建/修改',
	closed : true,
	modal : true,
	shadow : false,
	buttons : '#buttons'
});
/**
 * 新增用户客户关联按钮点击事件
 */
$("#add").click(function() {
	
	/***
	 * 初始化用户
	 */
	
	$('#userCombo').combobox({
		disabled:false
	});
	
	$('#userCombo').combobox('clear');
	$('#consCombo').combobox('clear');
 
	$("#newShiftDialog").panel({title:"新增"});//设置标题
	isAdd = true;//新增
	$('#newShiftDialog').window('open');// 新建的打开弹出层
});

/**
 * 取消按钮点击事件
 */
$("#quitBtn").click(function() {
	$('#newShiftDialog').window('close');// 关闭修改弹出层
});

 
/**
 * 新增按钮点击事件
 */
$("#addBtn").click(		
		function() {			
			//修改的时候不判断
			if(isAdd==true && $("#userCombo").combobox("getValue")==""){
				$.messager.alert('提示', "请选择用户！", 'info', function(){
					$('#userCombo').combobox('textbox').focus();
					$('#userCombo').combobox('showPanel');
		    	});
				return;
			}
			if($('#consCombo').combobox("getValues")==""){//判断客户
				$.messager.alert('提示', "请选择客户！", 'info', function(){
					$('#consCombo').combobox('textbox').focus();//定位
					$('#consCombo').combobox('showPanel');//显示下拉框
		    	});
				return;
			}
			
			$.ajax({
				type : "post",
				url : webContextRoot + 'rendsMenu/saveYhkhglgx.action',
				dataType : "text",
				data : {
					'consUserModel.consId' : $("#consCombo").combobox("getValues").join(","),
					'consUserModel.userId' : isAdd==true ? $("#userCombo").combobox("getValue") : updateUserId ,
					'consUserModel.editType' : isAdd==true?'A':'U'
				},
				complete : function(XMLHttpRequest, textStatus) {

				},
				success : function(data) {
					$.messager.alert('确认', "保存成功！", 'info', function(r) {
						$('#newShiftDialog').window('close');// 关闭的打开弹出层
						getGridData();
					});
				},
				error : function(data) {

				}
			});
		}
    );

/**
 * 修改用户客户关联按钮点击事件
 */
$("#update").click(function() { 
	$("#newShiftDialog").panel({title:"修改"});//设置标题
	var chkRow = $('#gjcx-datagrid').datagrid("getSelected");
	if (chkRow == null) {
		$.messager.alert('确认', "请选择一条记录！", 'warning');// 移除失败
	} else {
		$('#userCombo').combobox('clear');
		$('#consCombo').combobox('clear');
		
		/***
		 * 用户不可选择
		 */
		$('#userCombo').combobox({
			disabled:true
		});
		updateUserId =  chkRow.userId;//修改的时候的用户编码
		$('#userCombo').combobox('setValue', chkRow.userName);
		$('#consCombo').combobox('setValues', chkRow.consId.split(","));
		$('#newShiftDialog').window('open');// 新建的打开弹出层
		isAdd = false;//修改

	}
});

$("#delete").click(function() {
	var chkRow = $('#gjcx-datagrid').datagrid("getSelected");
	if (chkRow == null) {
		$.messager.alert('确认', "请选择记录删除！", 'warning');
		return;
	}else{
		$.messager.confirm('提示', "确定删除吗?", function(r) {
			if (r) { 
				$.ajax({
					type : "post",
					url : webContextRoot + 'rendsMenu/saveYhkhglgx.action',
					dataType : "text",
					data : {
						'consUserModel.consId' : chkRow.consId,
						'consUserModel.userId' : chkRow.userId,
						'consUserModel.editType' : 'D'
					}, 
					success : function(data) {
						$.messager.alert('确认', "删除成功！", 'info', function(r) {
							getGridData();
						});
					},
					error : function(data) {

					}
				});
			}
		});
	}
});
