/**
 * 指令接收
 * @author zhou_qiang
 * @since 2017-06-03
 */
var dataDate = new Date();//当前结束时间  为当前时间
var pageSize = 20;

$(function(){
	$("#dataDate").val(DateUtil.dateToStr('yyyy',dataDate));
	//接收状态
	$('#timeAccpValue').combobox({
		 width: 100,
		 panelWidth: null,
		 valueField:'id',
	     textField:'text',
		 editable: false,
		data: [
		{
			id: '99',
			text: '请选择',
			selected:true   
		},{
			id: '1',
			text: '已接收'  
		},{
			id: '0',
			text: '未接收'
		}]
	}); 
	
	queryZljs();
	
//	$('#dataGridDetail').datagrid().datagrid('enableCellEditing');
	
});


//查询事件
$('#search').click(function(){
	queryZljs();
});

/**
 * 接收邀请
 */
function jsyq(){
	var rows = $('#dataGrid').datagrid("getSelected");
	if(rows==null){
		$.messager.alert('提示', "请选择一条信息！", 'warning');
	}else if(rows.timeAccpValue == 1){
		$.messager.alert('提示', "当前指令已接收！", 'warning');
	}else{
		$.messager.confirm('确认', '确认接收该指令？', function(r){
			if(r){
				//保存操作
				$.getJSON(webContextRoot + 'zljs/updateRespReceiveInfo.action',
						{ 
							'respReceiveModel.respId' : rows.respId,
							'respReceiveModel.timeAccpState' : rows.timeAccpState,
							'respReceiveModel.timeAccpValue' : 1
						},
						function(json){
							 if(json.success=="true"){
						    	$.messager.alert('确认', "接收成功！", 'info', function(r){
						    		queryZljs();
						    	});
							 }else{
								 $.messager.alert('确认', "接收失败！", 'warning');//移除失败
							 }
						}
					);
			}
		});
	}
}

/**
 * 响应指标
 */
function queryZljs(){
	if(consId == 'null'){
		consId = null;
	}
	var b = $('#dataDate').val();
	var jszt = $('#timeAccpValue').combobox('getValue');
	var colums = [[
	            {field:'consName',title:'客户名称',width:'15%',align:'center'},  
				{field:'resDate',title:'响应日期',width:'10%',align:'center'},
				{field:'seTime',title:'响应时段',width:'10%',align:'center'},
				{field:'respType',title:'响应类型',width:'8%',align:'center',formatter: function (index, row) {
		        	  if(row.respType =='0'){
		        		  return '约定响应';
		        	  }else if(row.respType =='1'){
		        		  return '实时响应';
		 			  }
	              }},
				{field:'respTactic',title:'响应策略',width:'8%',align:'center',formatter: function (index, row) {
		        	  if(row.respTactic =='0'){
		        		  return '调峰策略';
		        	  }else if(row.respTactic =='1'){
		        		  return '降负荷策略';
		 			  }
	              }},
				{field:'respSource',title:'需求响应来源',width:'20%',align:'center'},
				
				{field:'respSJValue',title:'实际响应量',width:'8%',align:'center'},
				{field:'respValue',title:'合同响应量',width:'8%',align:'center'},
				{field:'timeValue',title:'受邀响应量',width:'8%',align:'center'},
				{field:'timeAccpValue',title:'接收状态',width:'6%',align:'center',formatter: function (index, row) {
		        	  if(row.timeAccpValue =='0'){
		        		  return '未接收';
		        	  }else if(row.timeAccpValue =='1'){
		        		  return '已接收';
		 			  }
	              }}
				]];
	
	$('#dataGrid').datagrid({// 表格
		nowrap : false,// 设置为true，当数据长度超出列宽时将会自动截取。
		striped : true,// 设置为true将交替显示行背景。
		border:false,
		fit:true,
		pagination : true,// 设置true将在数据表格底部显示分页工具栏。
		fitColumns : true,// 自动适应宽度
		singleSelect : true,// 设置为true将只允许选择一行。
		rownumbers : true,// 设置为true将显示行数。
		pageNumber:1,//在设置分页属性的时候初始化页码。
		pageSize:pageSize,//在设置分页属性的时候初始化页面大小。
		url:webContextRoot +'zljs/queryRespReceiveInfo.action',
		queryParams:{
			'respReceiveModel.resDate' : b,
			'respReceiveModel.timeAccpValue' : jszt,
			'respReceiveModel.userId' : consId
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


function qytQueryOveride(dateTime){
	var date = $('#dataDate').val();
	var resultDay = timeUtil(dateTime,date);//DateUtil.dateAdd("d", parseInt(dateTime), DateUtil.strToDate(startDay2));//getDateByOffsetDays(startDay2,dateTime);
	$('#dataDate').val(resultDay);
	
	queryZljs();
	
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

