/**
 * 
 */
//客户Id
//var consId = "";
var consSelectAllCons = null;//所有的客户
var consSelectHistoryCons = null;//历史记录里的客户
var consSelectCon = null;//选中的客户
//时间
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
//新增、修改判定标识
var addOrupdate = "";
$(document).ready(function () {
	//初始化生产线管理dataGrid
	$('#productionDatagrid').datagrid({
		fitColumns: true,
	    singleSelect: true,
	    pagination:true,
		close : true,
	    columns: [[
	        {field: 'id', title: 'id', width:'10%',hidden : true},
	        {field: 'energyCellName', title: '生产线', width:'10%'},
	        {field: 'codeName', title: '班次', width:'10%'},
	        {field: 'startTime', title: '开始时间', width: '20%'},
	        {field: 'endTime', title: '结束时间', width: '20%'},
	        {field: 'status', title: '状态', width: '20%',
				formatter : function(value, row, index) {
					if(value=="1"){
	            		return "启用";
	            	}else{
	            		return "停用";
	            	}
			}},
	        {field : 'memo',title : '描述',align : 'center',width : '21%',
					formatter : function(value, row, index) {
						return HTMLEncode(value);
				}},
	    ]],
	    tools:"#tableToolDiv"
	});
	
	//加载生产线
	$('#productionDatagrid').datagrid({
		title:'生产时间管理',
		url:basePath+ 'productionManage/getProduction.action',		
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
			var rows = $('#productionDatagrid').datagrid("getRows");
			if(rows.length>0){
				$('#productionDatagrid').datagrid("selectRow",0);
			}
		}
	});
	if(consId==null || consId==''|| consId=="null"){//未获取到企业编码，加载左侧树
//		$('#tree-leftQyTree').tree({ //默认没参数，获取区域  企业  都是打开状态
//			url:basePath +'destree/queryTree.action',
//		    method:'get',
//		    multiple:false,//是否支持多选
//		    editable:'true' ,
//		    onClick: function(node){
//		    	// 获取根节点
//		    	var rootNode = $('#tree-leftQyTree').tree('getRoot',node.target);
//		    	// 不是根节点时，刷新页面
//		    	if(rootNode.id != node.id){
//					consId = node.id;
//					consName = node.text;
//					IniDataGrid(consId);
////					queryUserFiles();//查询档案内容
////					yndyNameCombobox();//用能单元名称下拉框
//		    	}else{
//		    		$.messager.alert('提示', '请选择客户', 'warning');
//		    	}
//			},
//			onLoadSuccess:function(node, data){//加载成功返回
//				selectTree();//设置树默认选中节点
////				IniDataGrid(consId);
//			}
//		});
		consSelectMethod = "consSelectMethodLoad()";//定义选中后执行的方法
		consSelectHasRoot = false;//是否有区域能源根节点
		consSelectSearch("",true);
		//树模糊检索   方法来自  treeSelect.js
//		searchTreeNode();
	}else{
		IniDataGrid(consId);
//		queryUserFiles();//查询档案内容
//		yndyNameCombobox();//用能单元名称下拉框
	}
	
	//初始化弹框	
	$('#newShiftDialog').dialog({
        width: 400,
        height: 380,
        closed: true,
        modal: true
    });
	//新增按钮初始化
	$('#addZhK').click(function(){
		addZhK();
	});
	//修改按钮初始化
	$('#updateZhK').click(function(){
		updateZhK();
	});
	//删除按钮初始化
	$('#deleteZhK').click(function(){
		deleteZhK();
	});	
	//保存按钮初始化
	$('#addBtn').click(function(){
		addBtn();
	});
	//取消按钮初始化
	$('#quitBtn').click(function(){
		quitBtn();
	});
	//初始化开始时间
	$('#startTime').combobox({
		valueField : 'value',
		textField : 'text',
		panelHeight:'150',
		data :selectTimeInit
	});
	//初始化结束时间
	$('#endTime').combobox({
		valueField : 'value',
		textField : 'text',
		panelHeight:'150',
		data :selectTimeInit
	});
})

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
		IniDataGrid(consId);
	}
}
//选中节点
function selectTree(nodeId){
	$('#tree-leftQyTree li:eq(0)').find('div').addClass("tree-node-selected");//添加选中样式
	var n = $('#tree-leftQyTree').tree('getSelected');//获取被选中的节点
	if(n!=null)//判断节点是否存在
	{
		$('#tree-leftQyTree').tree('select',n.target);
	}
	var chiNode = $('#tree-leftQyTree').tree('getChildren',n.target);//子节点
	for(var i=0 ; i < chiNode.length ; i++)//循环节点
    {
       if(nodeId!=null?chiNode[i].id==nodeId:chiNode[i].type==1)//查找第一个类型为1的 用户
	   {
      	   	var n = $('#tree-leftQyTree').tree("find",chiNode[i].id);//根据id获取节点
      	   	$('#tree-leftQyTree').tree('select',n.target);//选中节点
      	    consId = chiNode[i].id;//把树节点id赋给企业id
      	    consName = chiNode[i].text;//把树节点的值赋给企业名称
      	    IniDataGrid(consId);
//      	    getbyqData();
//      	    queryUserFiles();//查询档案内容
//      	    yndyNameCombobox();//用能单元名称下拉框
      	   	break;//跳出循环
       }
    }
}
//根据参数获取表格数据
function IniDataGrid(consId){
	$('#productionDatagrid').datagrid('load',{
		consId:consId
	});
}
//清空弹框
function cleanAll(){
	$('#energyName').combobox('setValue','');
	$('#workType').combobox('setValue','');
	$('#startTime').combobox('setValue','');
	$('#endTime').combobox('setValue','');
	$("#status1")[0].checked = false;
	$("#status2")[0].checked = false;
	$('#memo').textbox('setValue','');
}
//生产线下拉框
function getEnergy(){
	$('#energyName').combobox({
		url : basePath + 'productionManage/getEnergyCell.action?consId='+consId,
		valueField : 'id',
		textField : 'energyCellName'
	})
}
//获取班次信息
function getWorkType(type){
	$.ajax({
		type : "post",
		url : basePath+ 'productionManage/getWorkType.action',
		dataType : "text",
		data : {consId:consId,type:type},
		success : function(data) {
			$('#startTime').combobox('setValue',eval('('+data+')')[0].startTime);
			$('#endTime').combobox('setValue',eval('('+data+')')[0].endTime);
		},
		error : function(data) {

		}
	});
}
//获取班次
function InitWorkType(data){
	$('#workType').combobox({
		url : basePath + 'productionManage/selectWorkTimeSet.action?workTimeSetModel.consId='+consId, // 请求路径
		valueField : 'id',
		textField : 'codeName',
		onSelect: function(record){
			if(data==null){
				getWorkType(record.workType);
			}
		},
		onLoadSuccess:function(){
			if(data!=null){
				$('#workType').combobox('setValue',data.workTimeId);
				$('#startTime').combobox('setValue',data.startTime);
				$('#endTime').combobox('setValue',data.endTime);
			}
		}
	});
}
//新增按钮点击事件
function addZhK(){
	$('#newShiftDialog').window('open');
	$("#newShiftDialog").panel({title:"新增"});
	 addOrupdate = "0";
	 cleanAll();
	 getEnergy();
	 InitWorkType();
	 $("#status1")[0].checked = true;
//	 getWorkType();
}
//修改按钮点击事件
function updateZhK(){
	var chkRows = $('#productionDatagrid').datagrid("getChecked");
	if (chkRows.length != 1) {
		$.messager.alert('确认', "请选择一条记录修改！", 'warning');// 移除失败
		return;
	} 
	$('#newShiftDialog').window('open');
	$("#newShiftDialog").panel({title:"修改"});
	addOrupdate = "1";
	cleanAll();
	getEnergy();
	InitWorkType(chkRows[0]);
	$('#winId').val(chkRows[0].id);
	$('#energyName').combobox('setValue',chkRows[0].energyId);
	if(chkRows[0].status == "0"){
		$("#status2")[0].checked = true;
	}else if(chkRows[0].status == "1"){
		$("#status1")[0].checked = true;
	}
	$('#memo').textbox('setValue',chkRows[0].memo);
}
//点击保存按钮事件
function addBtn(){
	 var winId = $('#winId').val();
	 var energyName = $('#energyName').combobox("getValue");
	 if(energyName == ""){
		 $.messager.alert('提示', "生产线名称不能为空！", 'warning');
			return;
	 }
	 var workType = $('#workType').combobox("getValue");
	 if(workType == ""){
		 $.messager.alert('提示', "班次不能为空！", 'warning');
			return; 
	 }
	 var startTime = $('#startTime').combobox("getValue");
	 if(startTime == ""){
		 $.messager.alert('提示', "开始时间不能为空！", 'warning');
			return; 
	 }
	 var endTime = $('#endTime').combobox("getValue");
	 if(endTime == ""){
		 $.messager.alert('提示', "结束时间不能为空！", 'warning');
			return
	 }
	 var status = "";
	 if($("#status1")[0].checked == true){
		 status = "1";
	 }else if($("#status2")[0].checked == true){
		 status = "0";
	 }else{
		 $.messager.alert('提示', "状态不能为空，请选择！", 'warning');
			return;
	 }
	 var memo = $("#memo").textbox('getValue');
	 if(memo.length>64){
		 $.messager.alert('提示', "描述的输入值过长！", 'warning');
			return;
	 }
	 if(addOrupdate == "0"){
		 var rows = $('#productionDatagrid').datagrid("getRows");//获取所有行
		 for(var i=0;i<rows.length;i++){
			 if($('#workType').combobox("getText") == rows[i].codeName && $('#energyName').combobox("getValue") == rows[i].energyId ){
				 $.messager.alert('提示', $('#energyName').combobox("getText")+rows[i].codeName+"已存在！", 'warning');
					return;
			 }
		 }
		 $.getJSON(basePath + 'productionManage/insertZhK.action', {			    
				'zhWktimDefineModel.energyId' : energyName,//生产线
				'zhWktimDefineModel.workTimeId' : workType,//日期
				'zhWktimDefineModel.startTime' : startTime,//班次类型
				'zhWktimDefineModel.endTime' : endTime,//交班人
				'zhWktimDefineModel.status' : status,//接班人
				'zhWktimDefineModel.memo' : memo,//上班交接问题
			}, function(json) {
				if (json.saveSUCCESS == "true") {
					$('#newShiftDialog').window('close');
					$.messager.alert('确认', "保存成功！", 'info', function(r) {
						$('#productionDatagrid').datagrid('reload'); 
					});			
				} else {
					$('#newShiftDialog').window('close');
					$.messager.alert('确认', "保存失败！", 'warning');		
				}
			});
	 }else if(addOrupdate == "1"){
		 var rows = $('#productionDatagrid').datagrid("getRows");//获取所有行
		 var row=$('#productionDatagrid').datagrid("getSelected");
		 if($('#workType').combobox("getText") != row.codeName ||
				 $('#energyName').combobox("getValue") != row.energyId){
			 for(var i=0;i<rows.length;i++){
				 if($('#workType').combobox("getText") == rows[i].codeName &&
						 $('#energyName').combobox("getValue") == rows[i].energyId){
					 $.messager.alert('提示', $('#energyName').combobox("getText")+rows[i].codeName+"已存在！", 'warning');
						return;
				 }
			 }
		 }
		 $.getJSON(basePath + 'productionManage/updateZhK.action', {
			 	'zhWktimDefineModel.id' : winId,//生产线
				'zhWktimDefineModel.energyId' : energyName,//生产线
				'zhWktimDefineModel.workTimeId' : workType,//日期
				'zhWktimDefineModel.startTime' : startTime,//班次类型
				'zhWktimDefineModel.endTime' : endTime,//交班人
				'zhWktimDefineModel.status' : status,//接班人
				'zhWktimDefineModel.memo' : memo,//上班交接问题
			}, function(json) {
				if (json.saveSUCCESS == "true") {
					$('#newShiftDialog').window('close');
					$.messager.alert('确认', "保存成功！", 'info', function(r) {
						$('#productionDatagrid').datagrid('reload'); 
					});			
				} else {
					$('#newShiftDialog').window('close');
					$.messager.alert('确认', "保存失败！", 'warning');		
				}
			});
	 }
	 
}
//删除按钮点击事件
function deleteZhK(){
	var chkRows = $('#productionDatagrid').datagrid("getChecked");
	if (chkRows.length == 0) {
		$.messager.alert('确认', "请选择记录删除！", 'warning');
		return;
	}
	$.messager.confirm('提示', "确定删除吗?", function(r) {
		if (r) {
			$.ajax({
				type : "post",
				url : basePath + 'productionManage/deleteZhK.action',
				dataType : "text",
				data : {
					'zhWktimDefineModel.energyId' :chkRows[0].energyId,
					'zhWktimDefineModel.workTimeId' :chkRows[0].workTimeId
				},
				complete : function(XMLHttpRequest, textStatus) {

				},
				success : function(data) {
					if (eval('('+data+')').saveSUCCESS == "true") {
						$.messager.alert('提示','删除成功!','info');  
						$('#productionDatagrid').datagrid('load',{
							consId:consId
						});
					} else {
						$.messager.alert('提示','删除失败!','info');
					}

				},
				error : function(data) {

				}
			});
		}
	});
}
//取消按钮点击事件
function quitBtn(){
	$('#newShiftDialog').window('close');
}