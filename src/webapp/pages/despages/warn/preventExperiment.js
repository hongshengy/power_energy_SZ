/**
 * 
 */
//选中的行数据
var selectData = [];
//条数
var pageSize=10;
//页数
var pageIndex=1;
//事件类型
var timeType = "1";
//设备
var deviceTypeY = "";
//试验类型
var testTypeY = "";
var currentdate = new Date();
//开始时间
var startTime = currentdate.getFullYear()+"-"+currentdate.getMonth()+"-"+currentdate.getDate();
//结束时间
var endTime = DateUtil.dateToStr('yyyy-MM-dd',currentdate);
$(document).ready(function () {
	//初始化预防性实验dataGrid
	$('#preventTestGrid').datagrid({
		fitColumns: true,
	    singleSelect: true,
	    pagination:true,
		close : true,
	    columns: [[
//	        {field: 'checkbox', title: '复选框',checkbox: true}, 
	        {field: 'id', title: 'ID', width:100,hidden : true},
	        {field: 'testDate', title: '试验日期', width:'15%',
	        	formatter: function(value,row,index){
				return value.substr(0,10);
			}},
	        {field: 'testType', title: '试验类型', width: '20%'},
	        {field: 'codeName', title: '设备', width: '15%'},
	        {field: 'testResult', title: '试验结论', width: '21%'},
	        {field: 'testUser', title: '试验员', width: '15%',
				formatter : function(value, row, index) {
					return HTMLEncode(value);
				}},
	        {field : 'remark',title : '详情',align : 'center',width : '15%',
				formatter : function(value, row, index) {
					var conId = "id"+index
					return "<a onclick=\"pDetail('"+index+"','"+row.id+"')\" id='"+conId+"' style='color:blue;text-decoration: underline;cursor: pointer;'>详情</a>";
				}
			}
	    ]],
	    tools:"#tableToolDiv"
	});
	//初始化试验类型
	$('#testType').combobox({
//      width: '100%',
      panelWidth: null,
      valueField: 'value',
      textField: 'text',
      editable: false,
      data: [{
          value: '',
          text: '请选择'
      },{
          value: '0',
          text: '交接试验'
      }, {
          value: '1',
          text: '预防性试验'
      }]
  });
//显示preventTestGrid
	$('#preventTestGrid').datagrid({
		title:'预防性试验',
	    url:basePath+ 'preventTest/getPreventExperiment.action',
		loadMsg:'正在加载，请稍等……',//加载时显示提示
		rownumbers:true,
		fit:true,
		fitColumns:true,
		striped: true,
		singleSelect: true,
		pagination:true,
		pageSize: 20,
		pageList : [10,20,50],
		queryParams :{
			timeType : timeType
		},
	    onSelect:function (rowIndex, rowData){
	    	selectData = rowData;
	    },onLoadSuccess:function(data){
			var rows = $('#preventTestGrid').datagrid("getRows");
			if(rows.length>0){
				$('#preventTestGrid').datagrid("selectRow",0);
			}
		}
	})
//	iniPrevent(timeType,deviceTypeY,testTypeY,startTime, endTime);
	//初始化设备
	iniDeviceType();
//	$('#deviceType').combobox({
////      width: '100%',
//      panelWidth: null,
//      valueField: 'value',
//      textField: 'text',
//      editable: false,
//      data: [{
//          value: '1',
//          text: '变压器'
//      }, {
//          value: '2',
//          text: '避雷器'
//      }, {
//          value: '3',
//          text: '断路器'
//      }, {
//          value: '4',
//          text: '继电保护装置'
//      }, {
//          value: '5',
//          text: '电容器'
//      }, {
//          value: '6',
//          text: '电抗器'
//      }, {
//          value: '7',
//          text: '电缆'
//      }, {
//          value: '8',
//          text: '负荷开关'
//      }, {
//          value: '9',
//          text: '电压互感器'
//      }]
//  });
	//初始化日期
	$('#searchTime').combobox({
//      width: '100%',
      panelWidth: null,
      valueField: 'value',
      textField: 'text',
      editable: false,
      data: [{
          value: '1',
          text: '一天内'
      }, {
          value: '2',
          text: '两天内'
      }, {
          value: '3',
          text: '三天内'
      }, {
          value: '4',
          text: '最近一周'
      }, {
          value: '5',
          text: '其他'
      }],
      onSelect: function (record) {
          if (record.value == '5') {
//          	$("#selectTime").removeClass('hidden');
        	  $("#selectTime").show();
          	$('#startTime').datebox('setValue',startTime);//开始日期
        	$('#endTime').datebox('setValue',endTime);//结束日期
          }else{
//          	$("#selectTime").addClass('hidden');
        	  $("#selectTime").hide();
          }
          autoResize.call(this); //手动调用激活
      },onLoadSuccess:function(){
      	$('#searchTime').combobox('select','1');
  	}
  });

	//初始化弹框	
	$('#divPanel').dialog({
//        title: '预防性试验',
        width: 600,
        height: 380,
        closed: true,
        modal: true
    });
	
	//新增按钮初始化
	$("#addPrevent").click(function(){
		addPrevent();
	});
	//修改按钮初始化
	$("#updatPrevent").click(function(){
		updatPrevent();
	});
	//删除按钮初始化
	$("#deletePrevent").click(function(){
		deletePrevent();
	});
	//保存按钮初始化
	$("#savePrevent").click(function(){
		savePrevent();
	});
	//取消按钮初始化
	$("#quitPrevent").click(function(){
		quitPrevent();
	});
	//查询按钮初始化
//	$("#searchPrevent").click(function(){
//		searchPrevent();
//	});	
});

//表格根据条件的分页查询
function iniPrevent(timeType,deviceTypeY,testTypeY,startTime, endTime){
//	url:basePath+ 'prevent/getPreventExperiment.action?timeType='+timeType+'&deviceTypeY='+deviceTypeY+'&testTypeY='+testTypeY+'&startTime='+startTime+'&endTime='+endTime,
	$('#preventTestGrid').datagrid('load',{
		timeType:timeType,
		deviceTypeY:deviceTypeY,
		testTypeY:testTypeY,
		startTime:startTime,
		endTime:endTime
	});
	
}

/*-----------------------------------------------------------------------------------------*\
* 函数:          把特殊字符进行转换
* 参数:          value   -- 需要转化的字符串
* 返回值:        
* 描述:          
\*-----------------------------------------------------------------------------------------*/
function HTMLEncode(value) {
    var returnValue;
    returnValue = value.replace(/&/g, '&amp;');
    returnValue = returnValue.replace(/</g, '&lt;');
    returnValue = returnValue.replace(/>/g, '&gt;');
	
    returnValue = returnValue.replace(/\n\n/g, '<br/>');
	returnValue = returnValue.replace(/\r\r/g, '<br/>');
    returnValue = returnValue.replace(/\n/g, '<br/>');
	returnValue = returnValue.replace(/\r/g, '<br/>');
	returnValue = returnValue.replace(/\t/g, '&nbsp;');
    return returnValue;
}
//获取设备下拉列表的值
function iniDeviceType(){
	$('#deviceType').combobox({
		url : basePath + 'preventTest/getPcode.action?devType=0',
		valueField : 'codeValue',
		textField : 'codeName',
	});
}
//点击新增按钮
function addPrevent(){
	$('#divPanel').window('open');
	$("#divPanel").panel({title:"新增"});
	$("#deviceTypew").combobox({disabled:false});//设备
	$("#testTypew").combobox({disabled:false});//试验类型
	$("#testDate").datebox({disabled:false});//试验日期
	$("#testContent").textbox({disabled:false});//试验内容
	$("#testResult").combobox({disabled:false});//试验结论
	$("#testGroup").textbox({disabled:false});//试验单位
	$("#testUser").textbox({disabled:false});//试验员
	$("#testAdmin").textbox({disabled:false});//主管人
	$("#testAudit").textbox({disabled:false});//审核人
	$("#userId").textbox({disabled:false});//检查人员
	$("#savePrevent").css('display','');//保存按钮取消隐藏
	$("#quitPrevent").css('display','');//取消按钮取消隐藏
	cleanData();
	$('#testTypew').combobox({
//      width: '100%',
      panelWidth: null,
      valueField: 'value',
      textField: 'text',
      editable: false,
      data: [{
          value: '0',
          text: '交接试验'
      }, {
          value: '1',
          text: '预防性试验'
      }]
  });
	
	$('#deviceTypew').combobox({
		url : basePath + 'preventTest/getPcode.action?devType=1',
		valueField : 'codeValue',
		textField : 'codeName',
	});
	
	$('#testResult').combobox({
//      width: '100%',
      panelWidth: null,
      valueField: 'value',
      textField: 'text',
      editable: false,
      data: [{
          value: '0',
          text: '不合格'
      }, {
          value: '1',
          text: '合格'
      }]
  });
}
//点击保存按钮事件
function savePrevent(){
//	var testDate = $("#testDate").textbox("getValue");
	var id = $("#id").val();
	//设备
	var deviceTypew = $("#deviceTypew").combobox("getValue");
	//试验类型
	var testTypew = $("#testTypew").combobox("getValue");
//	if(testTypew == '预防性试验'){
//		testTypew = '1';
//	}else{
//		testTypew = '0';
//	}
	//试验日期
	var testDate = $("#testDate").datebox("getValue");
	//试验内容
	var testContentS = $("#testContent").textbox('getValue');
	//试验结论
	var testResult = $("#testResult").combobox("getValue");
	//试验单位
	var testGroup = $("#testGroup").textbox('getValue');
	//试验员
	var testUser = $("#testUser").textbox('getValue');	
	//主管人
	var testAdmin = $("#testAdmin").textbox('getValue');
	//审核人
	var testAudit = $("#testAudit").textbox('getValue');
	//检查人员
	var userId = $("#userId").textbox('getValue');
	//设备
	if(deviceTypew == ""){
		$.messager.alert('提示', "设备不能为空！", 'warning');
		return;
	}
	//试验类型
	if(testTypew == ""){
		$.messager.alert('提示', "试验类型不能为空！", 'warning');
		return;	
	}
	//试验日期
	if(testDate == ""){
		$.messager.alert('提示', "试验日期不能为空！", 'warning');
		return;
	}
	//试验内容
	if(testContentS == ""){
		$.messager.alert('提示', "试验内容不能为空！", 'warning');
		return;
	}
	if(testContentS.length>10000){
		$.messager.alert('提示', "试验内容输入过长！", 'warning');
		return;
	}
	//试验结论
	if(testResult == ""){
		$.messager.alert('提示', "试验结论不能为空！", 'warning');
		return;
	}
	//试验单位
	if(testGroup == ""){
		$.messager.alert('提示', "试验单位不能为空！", 'warning');
		return;
	}
	//试验单位长度
	if(testGroup.length>16){
		$.messager.alert('提示', "试验单位输入过长！", 'warning');
		return;
	}
	//试验员
	if(testUser == ""){
		$.messager.alert('提示', "试验员不能为空！", 'warning');
		return;
	}
	//试验员长度
	if(testUser.length>10){
		$.messager.alert('提示', "试验员输入过长！", 'warning');
		return;
	}
	//主管人
	if(testAdmin == ""){
		$.messager.alert('提示', "主管人不能为空！", 'warning');
		return;
	}
	//主管人长度
	if(testAdmin.length>10){
		$.messager.alert('提示', "主管人输入过长！", 'warning');
		return;
	}
	//审核人
	if(testAudit == ""){
		$.messager.alert('提示', "审核人不能为空！", 'warning');
		return;
	}
	//审核人长度
	if(testAudit.length>10){
		$.messager.alert('提示', "审核人输入过长！", 'warning');
		return;
	}
	//检查人员
	if(userId == ""){
		$.messager.alert('提示', "检查人员不能为空！", 'warning');
		return;
	}
	//检查人员长度
	if(userId.length>10){
		$.messager.alert('提示', "检查人员输入过长！", 'warning');
		return;
	}
//	var createDate = $("#createDate").val();	
//	var updateDate = $("#updateDate").val();	
//	var upUserId = $("#upUserId").val();	
//	var delFlag = $("#delFlag").val();	
	if(id == ""){
		//创建时间
		var date = new Date();
		var createDate = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
		$.getJSON(basePath + 'preventTest/insertPrevent.action', {
			'preventTestRecordModel.testDate' : testDate,//试验日期
			'preventTestRecordModel.deviceType' : deviceTypew,//设备
			'preventTestRecordModel.testType' : testTypew,//试验类型
//			'preventTestRecordModel.testType' : testTypew,
//			'preventTestRecordModel.testContent' : testContent,
			'preventTestRecordModel.testContents' : testContentS,//试验内容
			'preventTestRecordModel.testResult' : testResult,//试验结论
			'preventTestRecordModel.testGroup' : testGroup,//试验单位
			'preventTestRecordModel.testAdmin' : testAdmin,//主管人
			'preventTestRecordModel.testAudit' : testAudit,//审核人
			'preventTestRecordModel.testUser' : testUser,//试验员
			'preventTestRecordModel.userId' : userId,//检查人员
			'preventTestRecordModel.createDate' : createDate,//创建时间
			'preventTestRecordModel.updateDate' : "",//更新时间
//			'preventTestRecode.upUserId' : upUserId,
			'preventTestRecordModel.delFlag' : "1",//删除标识
		}, function(json) {
			if (json.saveSUCCESS == "true") {
				$('#divPanel').window('close');
				$.messager.alert('确认', "保存成功！", 'info', function(r) {
					$('#preventTestGrid').datagrid('reload'); 
				});			
			} else {
				$('#divPanel').window('close');
				$.messager.alert('确认', "保存失败！", 'warning');// 移除失败			
			}
		});
	}else{
		var date = new Date();
		var updateDate = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
		$.getJSON(basePath + 'preventTest/updatePrevent.action', {
			'preventTestRecordModel.id' : id,
			'preventTestRecordModel.testDate' : testDate,//试验日期
			'preventTestRecordModel.deviceType' : deviceTypew,//设备
			'preventTestRecordModel.testType' : testTypew,//试验类型
//			'preventTestRecordModel.testContent' : testContent,
			'preventTestRecordModel.testContents' : testContentS,//试验内容
			'preventTestRecordModel.testResult' : testResult,//试验结论
			'preventTestRecordModel.testGroup' : testGroup,//试验单位
			'preventTestRecordModel.testAdmin' : testAdmin,//主管人
			'preventTestRecordModel.testAudit' : testAudit,//审核人
			'preventTestRecordModel.testUser' : testUser,//试验员
			'preventTestRecordModel.userId' : userId,//检查人员
//			'preventTestRecordModel.createDate' : selectData.createDate,
			'preventTestRecordModel.updateDate' : updateDate,//更新时间
//			'preventTestRecode.upUserId' : upUserId,
//			'preventTestRecordModel.delFlag' : selectData.delFlag
		}, function(json) {
			if (json.saveSUCCESS == "true") {
				$('#divPanel').window('close');
				$.messager.alert('确认', "保存成功！", 'info', function(r) {
					$('#preventTestGrid').datagrid('reload'); 
				});			
			} else {
				$('#divPanel').window('close');
				$.messager.alert('确认', "保存失败！", 'warning');// 移除失败			
			}
		});
	}

}
//点击取消按钮事件
function quitPrevent(){
	$('#divPanel').window('close');
}
//点击修改按钮事件
function updatPrevent(){
//	if(selectData.length == 0){
//		$.messager.alert('提示', "请选择一行！", 'warning');
//		return;
//	}
	var chkRows = $('#preventTestGrid').datagrid("getChecked");//获取表格选中行
	if (chkRows.length != 1) {
		$.messager.alert('提示', "请选择一条记录修改！", 'warning');
		return;
	}
	
	$('#divPanel').window('open');
	$("#divPanel").panel({title:"修改"});
	$('#deviceTypew').combobox({
		url : basePath + 'preventTest/getPcode.action?devType=1',
		valueField : 'codeValue',
		textField : 'codeName',
	});
	$("#deviceTypew").combobox({disabled:false});//设备
	$("#testTypew").combobox({disabled:false});//试验类型
	$("#testDate").datebox({disabled:false});//试验日期
	$("#testContent").textbox({disabled:false});//试验内容
	$("#testResult").combobox({disabled:false});//试验结论
	$("#testGroup").textbox({disabled:false});//试验单位
	$("#testUser").textbox({disabled:false});//试验员
	$("#testAdmin").textbox({disabled:false});//主管人
	$("#testAudit").textbox({disabled:false});//审核人
	$("#userId").textbox({disabled:false});//检查人员
	$("#savePrevent").css('display','');//保存按钮取消隐藏
	$("#quitPrevent").css('display','');//取消按钮取消隐藏
	cleanData();
	$('#testTypew').combobox({
//      width: '100%',
      panelWidth: null,
      valueField: 'value',
      textField: 'text',
      editable: false,
      data: [{
          value: '0',
          text: '交接试验'
      }, {
          value: '1',
          text: '预防性试验'
      }]
  });

	
	$('#testResult').combobox({
//      width: '100%',
      panelWidth: null,
      valueField: 'value',
      textField: 'text',
      editable: false,
      data: [{
          value: '0',
          text: '不合格'
      }, {
          value: '1',
          text: '合格'
      }]
  });
	$("#id").val(chkRows[0].id);
	//设备赋值
	$("#deviceTypew").combobox("setValue",chkRows[0].deviceType);
	if(chkRows[0].testType == '预防性试验'){
		testTypeValue = '1';
	}else{
		testTypeValue = '0';
	}
	//试验类型赋值
	$("#testTypew").combobox("setValue",testTypeValue);	
	//试验日期赋值
	$("#testDate").datebox("setValue",chkRows[0].testDate);
	//试验内容赋值
	$("#testContent").textbox('setValue',chkRows[0].testContents);
	if(chkRows[0].testResult == '不合格'){
		testResultValue = '0';
	}else{
		testResultValue = '1';
	}
	//试验结论赋值
	$("#testResult").combobox("setValue",testResultValue);	
	//试验单位赋值
	$("#testGroup").textbox('setValue',chkRows[0].testGroup);	
	//试验员赋值
	$("#testUser").textbox('setValue',chkRows[0].testUser);	
	//主管人赋值
	$("#testAdmin").textbox('setValue',chkRows[0].testAdmin);
	//审核人赋值
	$("#testAudit").textbox('setValue',chkRows[0].testAudit);
	//检查人员赋值
	$("#userId").textbox('setValue',chkRows[0].userId);	
//	selectData = [];
}
//点击删除按钮事件
function deletePrevent(){
//	if(selectData.length == 0){
//		$.messager.alert('提示', "请选择一行！", 'warning');
//		return;
//	}
	var chkRows = $('#preventTestGrid').datagrid("getChecked");//获取表格选中行
	if (chkRows.length != 1) {
		$.messager.alert('提示', "请选择一条记录删除！", 'warning');
		return;
	}
	var ids = "";
	for (var i = 0, len = chkRows.length; i < len; i++) {
		ids += chkRows[i].id + ',';
	}
	ids = ids.substr(0,ids.length - 1);
	$.messager.confirm('提示', "确定删除吗?", function(r){
		if(r){
			$.ajax({
				type : "post",
				url : basePath + 'preventTest/deletePrevent.action',
				dataType : "json",
				data : {
					'id' : ids,
				},
				complete:function(XMLHttpRequest,textStatus)
				{
				},
				success : function(data) {		
					if (data.saveSUCCESS == "true") {
						$.messager.alert('提示','删除成功!','info'); 
						var rows = $('#preventTestGrid').datagrid("getRows").length;
						if(rows < 2){
							$('#preventTestGrid').datagrid('load');
						}else{
							$('#preventTestGrid').datagrid('reload');
						}
					} else {
						$.messager.alert('确认', "删除失败！", 'warning');// 移除失败	
					}
				}
			});
		}
	});
}
//清空弹框的值
function cleanData(){
	$("#id").val("");
	//设备清空
	$("#deviceTypew").combobox("setValue","");
	//试验类型清空
	$("#testTypew").combobox("setValue","");
	//试验日期清空
	$("#testDate").datebox("setValue","");
	//试验内容清空
	$("#testContent").textbox('setValue',"");
	//试验结论清空
	$("#testResult").combobox("setValue","");	
	//试验单位清空
	$("#testGroup").textbox('setValue',"");	
	//试验员清空
	$("#testUser").textbox('setValue',"");	
	//主管人清空
	$("#testAdmin").textbox('setValue',"");	
	//审核人清空
	$("#testAudit").textbox('setValue',"");	
	//检查人员清空
	$("#userId").textbox('setValue',"");	
}

//点击查询按钮事件
function searchPrevent(){
	//日期
	timeType = $("#searchTime").datebox('getValue');
	//设备
	deviceTypeY = $.trim($("#deviceType").combobox('getValue'));
	//试验类型
	testTypeY = $.trim($("#testType").combobox('getValue'));
	startTime =  $('#startTime').val();//开始日期
	endTime =  $('#endTime').val();//结束日期
//	pageIndex = 1;
//	pageSize = 10;
	if(timeType == 5){
		if(startTime == '' ){
			$.messager.alert('提示', "开始日期不能为空！", 'warning');
			return;
		}else if(endTime == ''){
			$.messager.alert('提示', "结束日期不能为空！", 'warning');
			return;
		}else if(startTime > endTime){
			$.messager.alert('提示', "开始日期不能大于结束日期！", 'warning');
			return;
		}  
	}
	iniPrevent(timeType,deviceTypeY,testTypeY,startTime, endTime);
}
//点击详情
function pDetail(index,id){
//	if(selectData.length == 0){
//		$.messager.alert('提示', "请选择一行！", 'warning');
//		return;
//	}
	var chkRows = $('#preventTestGrid').datagrid("getChecked");//获取表格选中行
	if (chkRows.length != 1) {
		$.messager.alert('提示', "请选择一条记录修改！", 'warning');
		return;
	}
	$('#divPanel').window('open');
	$("#divPanel").panel({title:"预防性试验详情"});
	cleanData();
	$("#deviceTypew").combobox({disabled:true});
	$("#testTypew").combobox({disabled:true});
	$("#testDate").datebox({disabled:true});
	$("#testContent").textbox({disabled:true});
	$("#testResult").combobox({disabled:true});
	$("#testGroup").textbox({disabled:true});
	$("#testUser").textbox({disabled:true});	
	$("#testAdmin").textbox({disabled:true});
	$("#testAudit").textbox({disabled:true});
	$("#userId").textbox({disabled:true});
	$("#savePrevent").css('display','none');
	$("#quitPrevent").css('display','none');
//	$("#savePrevent").addClass("hidden");
//	$("#quitPrevent").addClass("hidden");
	
	$('#testTypew').combobox({
//      width: '100%',
      panelWidth: null,
      valueField: 'value',
      textField: 'text',
      editable: false,
      data: [{
          value: '0',
          text: '交接试验'
      }, {
          value: '1',
          text: '预防性试验'
      }]
  });
	$('#deviceTypew').combobox({
		url : basePath + 'preventTest/getPcode.action?devType=1',
		valueField : 'codeValue',
		textField : 'codeName',
	});
	
	$('#testResult').combobox({
//      width: '100%',
      panelWidth: null,
      valueField: 'value',
      textField: 'text',
      editable: false,
      data: [{
          value: '0',
          text: '不合格'
      }, {
          value: '1',
          text: '合格'
      }]
  });
	
	var allData = $('#preventTestGrid').datagrid('getRows');
	var rowData = null ;
	for(var i=0 ; i < allData.length ; i++){
		if(allData[i].id==id){
			rowData = allData[i];
			break;
		}
	}
	//设备
	$("#deviceTypew").combobox("setValue",rowData.deviceType);
	if(rowData.testType == '预防性试验'){
		testTypeValue = '1';
	}else{
		testTypeValue = '0';
	}
	//试验类型
	$("#testTypew").combobox("setValue",testTypeValue);	
	//试验日期
	$("#testDate").datebox("setValue",rowData.testDate);
	//试验类容
	$("#testContent").textbox('setValue',rowData.testContents);
	if(rowData.testResult == '不合格'){
		testResultValue = '0';
	}else{
		testResultValue = '1';
	}
	//试验结论
	$("#testResult").combobox("setValue",testResultValue);
	//试验单位
	$("#testGroup").textbox('setValue',rowData.testGroup);	
	//试验员
	$("#testUser").textbox('setValue',rowData.testUser);	
	//主管人
	$("#testAdmin").textbox('setValue',rowData.testAdmin);	
	//审核人
	$("#testAudit").textbox('setValue',rowData.testAudit);	
	//检查人员
	$("#userId").textbox('setValue',rowData.userId);
}