 
/**
 * 客户列表
 * @author 王国际
 * @since 2017-05-25
 */
$(function(){
	//加载客户列表
	querykhData();
});

//根据客户名称模糊查询
function selectConsName(){
//	querykhData();
	$('#khjk-datagrid').datagrid('load',{
		'sfdConsModel.consName' : $('#consName').textbox('getText')
	});
}

//确定
function okConsName(){
	 //确定之后，返回主页面，把选择的一行客户信息传入主页面
	if($('#khjk-datagrid').datagrid("getSelected")){
		parent.window.refkhData(0, $('#khjk-datagrid').datagrid("getSelected"));
	}else {
		$.messager.alert('提示', "请选择一个客户！", 'warning');
	}
	 
}

/**
 * 客户列表数据
 * @param {} corporationId
 */
  function querykhData(){
	  var gridCommon = [[
            {field:'consNo',title:'客户编号',width: 150,align:'left',sortable:true},
            {field:'consName',title:'客户名称',width: 100,align:'left',sortable:true},
            {field:'elecAddr',title:'客户地址',width: 100,align:'left',sortable:true},
            {field:'contractCap',title:'合同容量',width: 100,align:'left',sortable:true}
 		]];
	
	$('#khjk-datagrid').datagrid({// 表格
//		title:"客户列表",
		halign:'center',
		nowrap : true,// 设置为true，当数据长度超出列宽时将会自动截取。
		striped : true,// 设置为true将交替显示行背景。
		border:false,
		fit:true,
		pagination : true,// 设置true将在数据表格底部显示分页工具栏。
		fitColumns : true,// 自动适应宽度
		singleSelect : true,// 设置为true将只允许选择一行。
		rownumbers : true,// 设置为true将显示行数。
		pageNumber:1,//在设置分页属性的时候初始化页码。
		pageSize:20,//在设置分页属性的时候初始化页面大小。
		url:webContextRoot + 'rendsMenu/queryAllUserFiles.action',
		queryParams:{
			'sfdConsModel.consName' : $('#consName').textbox('getText')//查询条件，客户名称
		},
		loadMsg : "正在努力的读取数据中...",// 提示信息
		columns : gridCommon,//字段
		onLoadSuccess : function() {// 加载数据之后
			$('#khjk-datagrid').datagrid('selectRow', 0); // 选择第一行
		},
		onDblClickRow: function(rowIndex, rowData){
			 parent.window.refkhData(rowIndex, rowData);
		},
		loadFilter: function(data){
			if (data.sMap){
				return data.sMap;
			} else {
				return data;
			}
		}

	});
  }
 
