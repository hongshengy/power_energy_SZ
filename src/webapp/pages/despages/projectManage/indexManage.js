/**
 * 指标管理  
 */
var editType = '';			// 操作状态
var tradeCode = '';			// 行业ID
var tradeName = '';			// 行业名称

// 主表列表数据
function queryGjxxpzData(){
  
	// 行业名称
	var beLong = $('#queryBeLong').textbox('getValue');
	// 去除左右两边空格
	beLong = beLong.replace(/^\s+|\s+$/g, "");
	
	// 表格数据
	var  gridCommon = [[
     	 		{field:'beLong',title:'所属行业',width: 100,align:'left'},
     	 		{field:'indexName',title:'指标名称',width: 100,align:'left',
     	 			formatter : function(value, row, index) {
    	 				return HTMLEncode(value);
    	 			}	
     	 		},
     	 		{field:'indexUnit',title:'指标单位',width: 100,align:'left',
     	 			formatter : function(value, row, index) {
    	 				return HTMLEncode(value);
    	 			}	
     	 		},
     	 		{field:'memo',title:'描述',width: 100,align:'left',
     	 			formatter : function(value, row, index) {
    	 				return HTMLEncode(value);
    	 			}	
     	 		}
      		]];
  
	$('#gjxxpz-datagrid').datagrid({// 表格
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
		url:webContextRoot +'targetManagement/queryIndexByTable.action',
		queryParams:{
			'targetManagementModel.beLong': beLong
		},
		onLoadSuccess : function() {// 加载数据之后
			$('#gjxxpz-datagrid').datagrid('selectRow', 0); // 选择第一行
		},
		loadMsg : "正在努力的读取数据中...",// 提示信息
		columns : gridCommon,
		loadFilter: function(data){//分页数据
			if (data.consMap){
				return data.consMap;
			} else {
				return data;
			}
		}
	});
}

/**
 * 新增 
 */
function addData(){
	// 清空输入框
	clearTable();
	$('#indexManageDialog').window('open');
	$("#indexManageDialog").panel({title:"新增"});
	editType = "A";
	
	$('#beLong').combobox("readonly",false);
	/**
	 * 下拉框 
	 */
	$('#beLong').combobox({
		panelWidth:200,	
		panelHeight:300,// 设置下拉的宽度 和下拉框保持一致
		url:webContextRoot +'hydj/queryHyListByConsId.action',
		valueField:'CODE_VALUE',
		textField:'CODE_NAME',
		onLoadSuccess: function () {// 下拉框数据加载成功调用
        	var propOwnerData = $(this).combobox("getData");// 得到查询的list集合
        	if(propOwnerData.length>0){
//        		$('#beLong').combobox('select',propOwnerData[0].CODE_VALUE);// 默认加载第一个生产线
        	}else{
        		$('#beLong').combobox('select','');// 没有生产线时
        	}
        },
//        onChange: function(newValue, oldValue){
//        	tradeCode = newValue;
//		},
		onSelect: function (row) {
        	tradeName = row.CODE_NAME;
        	tradeCode = row.CODE_VALUE;
        }
	});
}

/**
 * 修改 
 */
function updateData(){
	var selectRow = $('#gjxxpz-datagrid').datagrid('getSelected'); // 获取选中的一行记录
	if(selectRow==null){
		$.messager.alert('提示', "请选择一条记录！", 'info');
		return;
	}
	// 不可编辑
//	$('#beLong').combobox("disable");
	
	// 只读
//	$('#beLong').combobox("readonly");
	$('#beLong').combobox({
		panelWidth:200,	
		panelHeight:300,// 设置下拉的宽度 和下拉框保持一致
		url:webContextRoot +'hydj/queryHyListByConsId.action',
		valueField:'CODE_VALUE',
		textField:'CODE_NAME',
		onLoadSuccess: function () {// 下拉框数据加载成功调用
        	var propOwnerData = $(this).combobox("getData");// 得到查询的list集合
        	if(propOwnerData.length>0){
        		$('#beLong').combobox('setValue', selectRow.beLong); //客户 不可空 
        	}else{
        		$('#beLong').combobox('select','');// 没有生产线时
        	}
        },
		onSelect: function (row) {
        	tradeName = row.CODE_NAME;
        	tradeCode = row.CODE_VALUE;
        }
	});
	
	$('#indexName').textbox('setValue', selectRow.indexName); //客户 不可空 
	$('#indexUnit').textbox('setValue', selectRow.indexUnit); //巡视人 不可空
	$('#memo').textbox('setValue',selectRow.memo);
	
	$('#indexManageDialog').window('open');
	$("#indexManageDialog").panel({title:"修改"});
	editType = "U";
	
}

/**
 * 保存 
 */
function caveBtn(){
	// 校验
	if(checkValue() == false){
		return;
	}
	var id = '';
	// 获取主键ID
	if(editType == 'U'){
		var selectRow = $('#gjxxpz-datagrid').datagrid('getSelected'); // 获取选中的一行记录
		if(selectRow == null){
			$.messager.alert('提示', "请选择一条记录！", 'info');
			return;
		}
		id = selectRow.id;
	}
	
	// 所属行业
	tradeName = $('#beLong').combobox('getText').replace(/^\s+|\s+$/g, "");
//	// 去除左右两边空格
//	tradeName = tradeName.replace(/^\s+|\s+$/g, "");
	
	// 指标名称
	var indexName = $('#indexName').val().replace(/^\s+|\s+$/g, "");
	// 指标单位
	var indexUnit = $('#indexUnit').val().replace(/^\s+|\s+$/g, "");
	// 描述
	var memo = $('#memo').val().replace(/^\s+|\s+$/g, "");
	
	$.post(webContextRoot +'targetManagement/opertionIndexManage.action',{
        'targetManagementModel.beLong': tradeName,'targetManagementModel.indexName': indexName,			// 查询时间
        'targetManagementModel.indexUnit': indexUnit,'targetManagementModel.memo': memo,
        'targetManagementModel.editType': editType,'targetManagementModel.id': id,
        'targetManagementModel.tradeCode': tradeCode
     },
     function(data){
    	 if(data.saveSUCCESS == "true"){
 	    	$.messager.alert('确认', "保存成功！", 'info');
 	    	// 清空
 	    	clearTable();
 	    	// 关闭弹窗
 	    	cancelBtn();
 	    	// 重新加载数据
 	    	queryGjxxpzData();
 		 }else{
 			 $.messager.alert('确认', "保存失败！", 'warning');
 		 }
     },'json');
	
}

/**
 * 取消保存
 */
function cancelBtn(){
	$('#indexManageDialog').window('close');
}

/**
 * 删除 
 */
function delData(){
	editType = "D";
	var selectRow = $('#gjxxpz-datagrid').datagrid('getSelected'); // 获取选中的一行记录
	 if(selectRow==null){
		 $.messager.alert('提示', "请选择一条记录！", 'info');
		 return;
	 }
	 $.messager.confirm('提示','您确认想要删除记录吗？',function(r){    
		//判断是否删除
	    if (r){  
	    	 $.getJSON(webContextRoot +'targetManagement/opertionIndexManage.action', 
			 {
			   'targetManagementModel.id' : selectRow.id, //检查明细 ID
			   'targetManagementModel.editType': editType
			 },
			 function(data){//回调
				if(data.saveSUCCESS=="true"){
			    	$.messager.alert('确认', "删除成功！", 'info');
		    		// 重新加载数据
			    	queryGjxxpzData();
				 }else{
					 $.messager.alert('确认', "删除失败！", 'warning');//移除失败
				 }
			  },"json");//返回格式
	      }
	 });  
}

/**
 * 清空输入框
 */
function clearTable(){
	$('#beLong').textbox('setValue','');
	$('#indexName').textbox('setValue','');
	$('#indexUnit').textbox('setValue','');
	$('#memo').textbox('setValue','');
}

/**
 * 查询 
 */
function searchData(){
	// 行业名称
	var beLong = $('#queryBeLong').textbox('getValue');
	// 去除左右两边空格
	beLong = beLong.replace(/^\s+|\s+$/g, "");
	
	// 重新加载表格
	$('#gjxxpz-datagrid').datagrid('load',{
		'targetManagementModel.beLong': beLong
	});
}

/**
 * 属性校验 
 */
function checkValue(){
	// 所属行业
	var beLong = $('#beLong').textbox('getValue');
	if(beLong.length > 64){
		$.messager.alert('提示','所属行业长度需小于64个字!','info');    
		return false;
	}else if(beLong.length == 0){
		$.messager.alert('提示','所属行业不能为空!','info');    
		return false;
	}
	
	// 指标名称
	var indexName = $('#indexName').textbox('getValue').replace(/^\s+|\s+$/g, "");
	if(indexName.length > 32){
		$.messager.alert('提示','指标名称长度需小于32个字!','info');    
		return false;
	}else if(indexName.length == 0){
		$.messager.alert('提示','指标名称不能为空!','info');    
		return false;
	}
	
	// 指标名称
	var indexUnit = $('#indexUnit').textbox('getValue').replace(/^\s+|\s+$/g, "");
	if(indexUnit.length > 16){
		$.messager.alert('提示','指标单位长度需小于16个字!','info');    
		return false;
	}else if(indexUnit.length == 0){
		$.messager.alert('提示','指标单位不能为空!','info');    
		return false;
	}
	
	// 描述
	var memo = $('#memo').textbox('getValue').replace(/^\s+|\s+$/g, "");
	if(memo.length > 64){
		$.messager.alert('提示','描述长度需小于64个字!','info');    
		return false;
	}
	
}

$(function(){
	
	//初始化弹框	
	$('#indexManageDialog').dialog({
        width: 400,
        height: 350,
        closed: true,
        modal: true
    });
	
    // 查询主表上表格数据
	queryGjxxpzData();
	
});