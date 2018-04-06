/**
 * 班次信息 by taoping
 * 
 */

/***
 * 班次类型集合
 */
var workTypeArr=[];
/***
 * 时间集合
 */
var timeArr=[];
var consSelectAllCons = null;//所有的客户
var consSelectHistoryCons = null;//历史记录里的客户
var consSelectCon = null;//选中的客户
var selectTimeInit= [ {
	value : '00:00',
	text : '00:00'
},{
	value : '01:00',
	text : '01:00'
}, {
	value : '02:00',
	text : '02:00'
}, {
	value : '03:00',
	text : '03:00'
}, {
	value : '04:00',
	text : '04:00'
}, {
	value : '05:00',
	text : '05:00'
}, {
	value : '06:00',
	text : '06:00'
}, {
	value : '07:00',
	text : '07:00'
}, {
	value : '08:00',
	text : '08:00'
}, {
	value : '09:00',
	text : '09:00'
}, {
	value : '10:00',
	text : '10:00'
}, {
	value : '11:00',
	text : '11:00'
}, {
	value : '12:00',
	text : '12:00'
}, {
	value : '13:00',
	text : '13:00'
}, {
	value : '14:00',
	text : '14:00'
}, {
	value : '15:00',
	text : '15:00'
}, {
	value : '16:00',
	text : '16:00'
}, {
	value : '17:00',
	text : '17:00'
}, {
	value : '18:00',
	text : '18:00'
}, {
	value : '19:00',
	text : '19:00'
}, {
	value : '20:00',
	text : '20:00'
}, {
	value : '21:00',
	text : '21:00'
}, {
	value : '22:00',
	text : '22:00'
}, {
	value : '23:00',
	text : '23:00'
} ];

$(function() {
	/***
	 * 初始化开始时间
	 */
	$('#startTime').combobox({
		valueField : 'value',
		textField : 'text',
		panelHeight:'150',
		data :selectTimeInit
	});
	/***
	 * 初始化结束时间
	 */
	$('#endTime').combobox({
		valueField : 'value',
		textField : 'text',
		panelHeight:'150',
		data :selectTimeInit
	});
	/***
	 * 初始化班次类型
	 */
	$('#workType').combobox({
		url : basePath + 'workShift/selectPCode.action',
		valueField : 'codeValue',
		textField : 'codeName'
	});
	var column = [ [ {
		field : 'checkbox',
		title : '复选框',
		width : 30,
		checkbox : true,
		hidden : true
	}, {
		field : 'codeName',
		title : '班次类型',
		width : 100,
		align : 'center'
	}, {
		field : 'startTime',
		title : '开始时间',
		width : 100,
		align : 'left'
	}, {
		field : 'endTime',
		title : '结束时间',
		width : 100,
		align : 'left'
	}, {
		field : 'workType',
		title : '班次类型',
		width : 100,
		align : 'left',
		hidden : true
	}, {
		field : 'consId',
		title : '用户编号',
		width : 100,
		align : 'left',
		hidden : true
	} ] ];

	$('#gjcx-datagrid').datagrid({	
		title:'班次管理',
		nowrap : false,// 设置为true，当数据长度超出列宽时将会自动截取。
		striped : true,// 设置为true将交替显示行背景。
		fit: true,
		border:false,
		pageSize:20,
		pagination : false,// 设置true将在数据表格底部显示分页工具栏。
		fitColumns : true,// 自动适应宽度
		singleSelect : true,// 设置为true将只允许选择一行。
		rownumbers : true,// 设置为true将显示行数。
		//url:basePath + 'shift/selectWorkTimeSet.action?workTimeSetModel.consId='+consId,
		queryParams:{},
		loadMsg : "正在努力的读取数据中...",// 提示信息
		columns : column,
		 tools:"#tableToolDiv"
	});
	if(consIdPage==null || consIdPage==''|| consIdPage=="null"){//鏈幏鍙栧埌浼佷笟缂栫爜锛屽姞杞藉乏渚ф爲
//	$('#treeleftQyTree')
//			.tree(
//					{
//						url : basePath + 'destree/queryTree.action',
//						method : 'get',
//						multiple : true,// 是否支持多选
//						onBeforeLoad : function(node) {// 请求之前
//
//						},
//						onClick : function(node) {
//							if (node.type == '0') {// 区域能源节点
//								$.messager.alert('提示', '请选择客户', 'warning');
//							}
//							if (node.type == '1') {// 企业节点
//								consId = node.id;
//							}
//							$.post(basePath + 'shift/selectWorkTimeSet.action', // 请求路径
//									{
//										'workTimeSetModel.consId' : consId
//									},//请求参数
//									function(data) {//回调
//										workTypeArr=[];
//										timeArr=[];
//										for(var i=0,len=data.length;i<len;i++){
//											workTypeArr[workTypeArr.length]=data[i].workType;
//											timeArr[timeArr.length]=data[i].startTime+"~"+data[i].endTime;
//										}
//										$('#gjcx-datagrid').datagrid("loaded");//loading画面关闭
//										$('#gjcx-datagrid').datagrid('loadData', data);//加载数据
//										if(data.length>0){
//											$('#gjcx-datagrid').datagrid("selectRow",0);
//										}										
//									}, "json");
//						},
//						onLoadSuccess : function(node) {
//							if (consId == 0) {
//								if ($('#treeleftQyTree').tree('getRoots').length > 0
//										&& $('#treeleftQyTree')
//												.tree('getRoots')[0].children.length > 0) {
//									// 设置企业编号
//									consId = $('#treeleftQyTree').tree(
//											'getRoots')[0].children[0].id;
//									$("#_easyui_tree_2").addClass(
//											"tree-node-selected");
//									bindGridData();
//								}
//							}
//						}
//					});
//		searchTreeNode();	
		consSelectMethod = "consSelectMethodLoad()";//定义选中后执行的方法
		consSelectHasRoot = false;//是否有区域能源根节点
		consSelectSearch("",true);
	}else{
		consId=consIdPage;
		bindGridData();
	}
});

function consSelectMethodLoad(){
	if(consSelectCon.id.length < 4){	// 区域能源节点
		$("#clickTree").hide();
		$("#contentId").show();
		content='<iframe id="funcId" src="'+webContextRoot+'pages/despages/projectManage/tranOverview.jsp?orgNo='+consSelectCon.id+'" scrolling="no" frameborder="0" width="100%" height="100%"></iframe>'; 
		$("#contentId").empty();
		$('#contentId').append(content);
	}else{		// 企业节点
		$("#contentId").hide();
		$("#clickTree").show();
		consId = consSelectCon.id;//把树节点id赋给企业id
		consName = consSelectCon.text;//把树节点的值赋给企业名称
		bindGridData();
		$.post(basePath + 'workShift/selectWorkTimeSet.action', // 请求路径
				{
					'workTimeSetModel.consId' : consId
				},//请求参数
				function(data) {//回调
					workTypeArr=[];
					timeArr=[];
					for(var i=0,len=data.length;i<len;i++){
						workTypeArr[workTypeArr.length]=data[i].workType;
						timeArr[timeArr.length]=data[i].startTime+"~"+data[i].endTime;
						$('#gjcx-datagrid').datagrid("loaded");//loading画面关闭
						$('#gjcx-datagrid').datagrid('loadData', data);//加载数据
						if(data.length>0){
							$('#gjcx-datagrid').datagrid("selectRow",0);
						}	
					}									
				}, "json");
		
	}
}

function selectTree(nodeId){
	$('#treeleftQyTree li:eq(0)').find('div').addClass("tree-node-selected");//添加选中样式
	var n = $('#treeleftQyTree').tree('getSelected');//获取被选中的节点
	if(n!=null)//判断节点是否存在
	{
		$('#treeleftQyTree').tree('select',n.target);
	}
	
	var chiNode = $('#treeleftQyTree').tree('getChildren',n.target);//子节点
	for(var i=0 ; i < chiNode.length ; i++)//循环节点
    {
		 if(nodeId!=null?chiNode[i].id==nodeId:chiNode[i].type==1)//查找定位
		  {
				var n = $('#treeleftQyTree').tree("find",chiNode[i].id);//根据id获取节点
	       	   	$('#treeleftQyTree').tree('select',n.target);//选中节点
	       	   	$('#treeleftQyTree').tree('scrollTo',n.target);//滚动到节点
	       	    consId = chiNode[i].id;
	       	    consName = chiNode[i].text;
	       	    bindGridData();
	       	   	break;//跳出循环
		 }
    }
}


/*******************************************************************************
 * 绑定列表数据
 */
function bindGridData() {
	getGridData();
}

function getGridData() {
	$.post(basePath + 'workShift/selectWorkTimeSet.action', // 请求路径
	{
		'workTimeSetModel.consId' : consId
	},// 请求参数
	function(data) {// 回调
		$('#gjcx-datagrid').datagrid("loaded");// loading画面关闭
		$('#gjcx-datagrid').datagrid('loadData', data);// 加载数据
		
		var rows = $('#gjcx-datagrid').datagrid("getRows");//获取所有行
		if(rows.length>0){
			$('#gjcx-datagrid').datagrid("selectRow",0);//默认选中第一行
		}
		
		if (data.length > 0) {
			workTypeArr=[];
			timeArr=[];
			for(var i=0,len=data.length;i<len;i++){
				workTypeArr[workTypeArr.length]=data[i].workType;
				timeArr[timeArr.length]=data[i].startTime+"~"+data[i].endTime;
			}
			
//			$('#gjcx-datagrid').datagrid('loadData', data.slice(0, 10));// 加载数据
//			$('#gjcx-datagrid').datagrid("selectRow",0);
		}
		// 前台分页
//		var pager = $('#gjcx-datagrid').datagrid("getPager");
//		pager.pagination({
//			total : data.length,
//			pageSize : 10,// 每页记录数
//			pageList : [ 10, 20, 30, 50 ],// 可以设置每页记录条数的列表
//			beforePageText : '第',
//			afterPageText : '页 共 {pages} 页',
//			displayMsg : '当前显示 {from} - {to} 条记录,共 {total} 条记录',
//			onSelectPage : function(pageNo, pageSize) {
//				var start = (pageNo - 1) * pageSize;// 计算分页数据开始
//				var end = start + pageSize;// 计算分页数据结束
//				$('#gjcx-datagrid')
//						.datagrid('loadData', data.slice(start, end));// 分页加载每页条目
//				pager.pagination('refresh', {
//					total : data.length,// 总记录条数
//					pageNumber : pageNo
//				// 页面
//				});
//			}
//		});
	}, "json");
}
/**
 * 班次新增
 */
$('#newShiftDialog').dialog({
	//title : '新建/修改',
	closed : true,
	modal : true,
	shadow : false,
	buttons : '#buttons'
});
/**
 * 新增班次按钮点击事件
 */
$("#add").click(function() {
	$('#workType').combobox('clear');
	$('#startTime').combobox('clear');
	$('#endTime').combobox('clear');

//	$('#newShiftDialog').dialog('setTitle','新建');
	$("#newShiftDialog").panel({title:"新增"});//设置标题
	isAdd = 1;
	$('#newShiftDialog').window('open');// 新建的打开弹出层
});

/**
 * 取消按钮点击事件
 */
$("#quitBtn").click(function() {
	$('#newShiftDialog').window('close');// 关闭修改弹出层
});

var isAdd = 0;

var workTimeArr=["00:00","01:00","02:00","03:00","04:00","05:00","06:00","07:00","08:00","09:00","10:00","11:00","12:00",
                 "13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00"];
/**
 * 新增按钮点击事件
 */
$("#addBtn").click(		
		function() {				
			if($("#workType").combobox("getValue")==""){
				$.messager.alert('提示', "班次类型不能为空！", 'warning');
				return;
			}
			if($('#startTime').combobox("getValue")==""){
				$.messager.alert('提示', "开始时间不能为空！", 'warning');
				return;
			}
			if($('#endTime').combobox("getValue")==""){
				$.messager.alert('提示', "结束时间不能为空！", 'warning');
				return;
			}
			if($('#startTime').combobox("getValue")==$('#endTime').combobox("getValue")){
				$.messager.alert('提示', "开始时间和结束时间不能相等！", 'warning');
				return;
			}
			
			if (isAdd == 1) {
				for(var i=0,len=workTypeArr.length;i<len;i++){
					if($("#workType").combobox("getValue")==workTypeArr[i]){
						$.messager.alert('提示', "班次类型已存在！", 'warning');
						return;
					}
				}					
				
				$.ajax({
					type : "post",
					url : basePath + 'workShift/addWorkTimeSet.action',
					dataType : "text",
					data : {
						'workTimeSetModel.consId' : consId,
						'workTimeSetModel.workType' : $("#workType").combobox("getValue"),
						'workTimeSetModel.startTime' :$('#startTime').combobox("getValue"),
						'workTimeSetModel.endTime' : $('#endTime').combobox("getValue")
					},
					complete : function(XMLHttpRequest, textStatus) {

					},
					success : function(data) {
						$.messager.alert('确认', "保存成功！", 'info', function(r) {
							$('#newShiftDialog').window('close');// 关闭的打开弹出层
							$.post(basePath + 'workShift/selectWorkTimeSet.action', // 请求路径
							{
								'workTimeSetModel.consId' : consId
							},// 请求参数
							function(data) {// 回调
								workTypeArr=[];
								timeArr=[];
								for(var i=0,len=data.length;i<len;i++){
									workTypeArr[workTypeArr.length]=data[i].workType;
									timeArr[timeArr.length]=data[i].startTime+"~"+data[i].endTime;
								}
								$('#gjcx-datagrid').datagrid("loaded");// loading画面关闭
								$('#gjcx-datagrid').datagrid('loadData', data);// 加载数据
								
								var rows = $('#gjcx-datagrid').datagrid("getRows");//获取所有行
								if(rows.length>0){
									$('#gjcx-datagrid').datagrid("selectRow",0);//默认选中第一行
								}
								
							}, "json");
						});
					},
					error : function(data) {

					}
				});
			} else {
				for(var i=0,len=workTypeArr.length;i<len;i++){
					if($("#workType").combobox("getValue")==workTypeArr[i]
						&&$("#workType").combobox("getValue")!=workTypeUpdate){
						$.messager.alert('提示', "班次类型已存在！", 'warning');
						return;
					}
					if(timeArr[i]==workTimeUpdate){
						timeArr.splice(i,1);
					}
				}

				$.ajax({					
					type : "post",
					url : basePath + 'workShift/updateWorkTimeSet.action',
					dataType : "text",
					data : {
						'workTimeSetModel.id' : id,
						'workTimeSetModel.workType' : $("#workType").combobox("getValue"),
						'workTimeSetModel.startTime' : $('#startTime').combobox("getValue"),
						'workTimeSetModel.endTime' : $('#endTime').combobox("getValue")
					},
					complete : function(XMLHttpRequest, textStatus) {

					},
					success : function(data) {
						$.messager.alert('确认', "保存成功！", 'info', function(r) {
							$('#newShiftDialog').window('close');// 关闭的打开弹出层
							$.post(basePath + 'workShift/selectWorkTimeSet.action', // 请求路径
							{
								'workTimeSetModel.consId' : consId
							},// 请求参数
							function(data) {// 回调
								workTypeArr=[];
								timeArr=[];
								for(var i=0,len=data.length;i<len;i++){
									workTypeArr[workTypeArr.length]=data[i].workType;
									timeArr[timeArr.length]=data[i].startTime+"~"+data[i].endTime;
								}
								$('#gjcx-datagrid').datagrid("loaded");// loading画面关闭
								$('#gjcx-datagrid').datagrid('loadData', data);// 加载数据
								
								var rows = $('#gjcx-datagrid').datagrid("getRows");//获取所有行
								if(rows.length>0){
									$('#gjcx-datagrid').datagrid("selectRow",0);//默认选中第一行
								}
								
							}, "json");
						});
					},
					error : function(data) {

					}
				});
			}
		});
var consId = 0;
var id = 0;
var workTypeUpdate=0;
var workTimeUpdate="";
/**
 * 修改班次按钮点击事件
 */
$("#update").click(function() {
//	if(consIdPage==null || consIdPage==''|| consIdPage=="null"){
//		$(".panel-header")[1].childNodes[0].innerText='修改';
//	}else{
//		$(".panel-header")[0].childNodes[0].innerText='修改';
//	}
//	$('#newShiftDialog').dialog('setTitle','修改');
	$("#newShiftDialog").panel({title:"修改"});//设置标题
	var chkRows = $('#gjcx-datagrid').datagrid("getChecked");

	if (chkRows.length != 1) {
		$.messager.alert('确认', "请选择一条记录修改！", 'warning');// 移除失败
	} else {
		id = chkRows[0].id;
		workTypeUpdate=chkRows[0].workType;
		workTimeUpdate=chkRows[0].startTime+"~"+chkRows[0].endTime;
		$('#workType').combobox('clear');

		$('#workType').combobox('setValue', chkRows[0].workType);
		$('#startTime').combobox('setValue', chkRows[0].startTime);
		$('#endTime').combobox('setValue', chkRows[0].endTime);
		$('#newShiftDialog').window('open');// 新建的打开弹出层

		isAdd = 0;
	}
});

$("#delete").click(function() {
	var chkRows = $('#gjcx-datagrid').datagrid("getChecked");
	if (chkRows.length == 0) {
		$.messager.alert('确认', "请选择记录删除！", 'warning');
		return;
	}else{
		$.messager.confirm('提示', "确定删除吗?", function(r) {
			if (r) {
//				var chkRows = $('#gjcx-datagrid').datagrid("getChecked");
//				if (chkRows.length == 0) {
//					$.messager.alert('确认', "请选择记录删除！", 'warning');
//					return;
//				}
				var ids = "";
				for (var i = 0, len = chkRows.length; i < len; i++) {
					ids += chkRows[i].id + ',';
				}
				ids = ids.substr(0, ids.length - 1);

				$.ajax({
					type : "post",
					url : basePath + 'workShift/deleteWorkTimeSet.action',
					dataType : "text",
					data : {
						'id' : ids
					},
					complete : function(XMLHttpRequest, textStatus) {

					},
					success : function(data) {
						$.messager.alert('确认', "删除成功！", 'info', function(r) {
							$.post(basePath + 'workShift/selectWorkTimeSet.action', // 请求路径
							{
								'workTimeSetModel.consId' : consId
							},//请求参数
							function(data) {//回调
								workTypeArr=[];
								timeArr=[];
								for(var i=0,len=data.length;i<len;i++){
									workTypeArr[workTypeArr.length]=data[i].workType;
									timeArr[timeArr.length]=data[i].startTime+"~"+data[i].endTime;
								}
								$('#gjcx-datagrid').datagrid("loaded");//loading画面关闭
								$('#gjcx-datagrid').datagrid('loadData', data);//加载数据
								
								var rows = $('#gjcx-datagrid').datagrid("getRows");//获取所有行
								if(rows.length>0){
									$('#gjcx-datagrid').datagrid("selectRow",0);//默认选中第一行
								}
								
							}, "json");
						});

					},
					error : function(data) {

					}
				});
			}
		});
	}
});
