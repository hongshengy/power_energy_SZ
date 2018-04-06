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
//交班人
var dealUser = "";
//接班人
var carryUser = "";
var currentdate = new Date();
//开始时间
var startTime = currentdate.getFullYear()+"-"+currentdate.getMonth()+"-"+currentdate.getDate();
//结束时间
var endTime = DateUtil.dateToStr('yyyy-MM-dd',currentdate);
$(document).ready(function () {
	//初始化交接班管理dataGrid
	$('#workGrid').datagrid({
		fitColumns: true,
	    singleSelect: true,
	    pagination:true,
		close : true,
	    columns: [[
//	        {field: 'checkbox', title: '复选框',checkbox: true}, 
	        {field: 'id', title: 'ID', width:100,hidden : true},
	        {field: 'dataDate', title: '日期', width:'10%',
	        	formatter: function(value,row,index){
				return value.substr(0,10);
	        	}},
	        {field: 'weather', title: '天气', width:'8%',
	        	formatter : function(value, row, index) {
				return HTMLEncode(value);
	        	}},
	        {field: 'dealUser', title: '交班人', width: '8%',
				formatter : function(value, row, index) {
					return HTMLEncode(value);
				}},
	        {field: 'carryUser', title: '接班人', width: '8%',
				formatter : function(value, row, index) {
					return HTMLEncode(value);
				}},
	        {field: 'xsContent', title: '巡视记录', width: '15%',
				formatter : function(value, row, index) {
					if(value.length>20){
						return HTMLEncode(value.substring(0,20)+"......");
					}else{
						return HTMLEncode(value);
					}	
				}},
			{field: 'opContent', title: '操作记录', width: '15%',
				formatter : function(value, row, index) {
					if(value.length>20){
						return HTMLEncode(value.substring(0,20)+"......");
					}else{
						return HTMLEncode(value);
					}
				}},
			{field: 'mnContent', title: '监控记录', width: '15%',
				formatter : function(value, row, index) {
					if(value.length>20){
						return HTMLEncode(value.substring(0,20)+"......");
					}else{
						return HTMLEncode(value);
					}
				}},
			{field: 'jjbMemo', title: '交接班事项', width: '15%',
				formatter : function(value, row, index) {
					if(value.length>20){
						return HTMLEncode(value.substring(0,20)+"......");
					}else{
						return HTMLEncode(value);
					}
				}},
	        {field : 'remark',title : '详情',align : 'center',width : '7%',
				formatter : function(value, row, index) {
					var conId = "id"+index
					return "<a onclick=\"WDetail('"+index+"','"+row.id+"')\" id='"+conId+"' style='color:blue;text-decoration: underline;cursor: pointer;'>详情</a>";
				}
			}
	    ]],
	    tools:"#tableToolDiv"
	});

//加载交接班管理dataGrid
//	IniDataGrid(timeType,handOverUserY,takeOverUserY,startTime,endTime);
	$('#workGrid').datagrid({
		title:'交接班管理',
		url:basePath+ 'prevent/queryJtWork.action',		
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
			var rows = $('#workGrid').datagrid("getRows");
			if(rows.length>0){
				$('#workGrid').datagrid("selectRow",0);
			}
		}
//	})
	});
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
          	$("#selectTime").show();
        	$('#startTime').datebox('setValue',startTime);//开始日期
        	$('#endTime').datebox('setValue',endTime);//结束日期
          }else{
          	$("#selectTime").hide();
          }
          autoResize.call(this); //手动调用激活
      },onLoadSuccess:function(){
      	$('#searchTime').combobox('select','1');
  	}
  });

	//初始化弹框	
	$('#divPanel').dialog({
//        title: '交接班管理',
        width: 800,
        height: 510,
        closed: true,
        modal: true
    });
	
	//新增按钮初始化
	$("#addWork").click(function(){
		addWork();
	});
	//修改按钮初始化
	$("#updatWork").click(function(){
		updatWork();
	});
	//删除按钮初始化
	$("#deleteWork").click(function(){
		deleteWork();
	});
	//监控日报按钮初始化
	$("#openMonitorDaily").click(function(){
		openMonitorDaily();
	});
	//保存按钮初始化
	$("#saveWork").click(function(){
		saveWork();
	});
	//取消按钮初始化
	$("#quitWork").click(function(){
		quitWork();
	});
	//查询按钮初始化
	$("#searchWork").click(function(){
		searchWork();
	});	
	var width = document.documentElement.clientWidth - 200;
    var height = document.documentElement.clientHeight - 100;
	$('#dialogMonitor').dialog({
        title: '监控日报',
        width: width,
        height: height,
        closed: true,
        modal: true,
        onOpen: function () {
        	if (window.frames[0].location.href === 'about:blank'){
        		window.frames[0].location.href = basePath+"pages/despages/monitor/monitorDaily.jsp"; 
        	}  
        }
    });
	/**
	 * 自定义检验类型，是否为中文 
	 */
	$.extend($.fn.validatebox.defaults.rules, {
		chinese:{
			validator:function(value,param){
				return isChinese(value);
			},
			message:'请输入正确的汉字'
		}
	});
});
//根据条件加载交接班管理datagrid
function IniDataGrid(timeType,dealUser,carryUser,startTime,endTime){
	$('#workGrid').datagrid('load',{
		timeType:timeType,
		dealUser:dealUser,
		carryUser:carryUser,
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
//验证是否有特殊字符
function isChinese(value){
	var reg = /^[\u2E80-\u9FFF]+$/;
	return reg.test($.trim(value));
}
//新增按钮点击事件
function addWork(){
	$('#divPanel').window('open');
	$("#divPanel").panel({title:"新增"});
//	$("#dataDate").datebox({disabled:false});//日期	
	$("#dataDate").removeAttr("disabled");
	$("#weather").textbox({disabled:false});//天气
	$("#dealTkUser").textbox({disabled:false});//交班人
	$("#carryTkUser").textbox({disabled:false});//接班人
	$("#xsContent").textbox({disabled:false});//巡视记录
	$("#opContent").textbox({disabled:false});//操作记录
	$("#mnContent").textbox({disabled:false});//监控记录
	$("#jjbMemo").textbox({disabled:false});//交接班事项
	$("#jjbDate").datebox({disabled:false});//交接班日期	
	$("#saveWork").css('display','');//取消保存按钮的隐藏
	$("#quitWork").css('display','');//取消取消按钮的隐藏
	cleanAll();
	var dateNow = new Date();
	var month;	
	var day;
	if((dateNow.getMonth()+1)<10){
		month = "0"+(dateNow.getMonth()+1);
	}else{
		month = (dateNow.getMonth()+1);
	}
	if(dateNow.getDate()<10){
		day = "0"+dateNow.getDate();
	}else{
		day = dateNow.getDate();
	}
	
	var week=dateNow.getDay();
	//开始时间
	var timeNow = dateNow.getFullYear()+"-"+month+"-"+day;	
	
	$("#dataDate").val(timeNow+" "+showWeek(week));
	$("#jjbDate").datebox("setValue",timeNow);
}
//点击修改按钮事件
function updatWork(){
	var chkRows = $('#workGrid').datagrid("getChecked");//获取表格选中行
	if (chkRows.length != 1) {
		$.messager.alert('提示', "请选择一条记录修改！", 'warning');
		return;
	}
	$('#divPanel').window('open');
	$("#divPanel").panel({title:"修改"});
//	$("#dataDate").datebox({disabled:false});//日期
	$("#dataDate").removeAttr("disabled");
	$("#weather").textbox({disabled:false});//天气
	$("#dealTkUser").textbox({disabled:false});//交班人
	$("#carryTkUser").textbox({disabled:false});//接班人
	$("#xsContent").textbox({disabled:false});//巡视记录
	$("#opContent").textbox({disabled:false});//操作记录
	$("#mnContent").textbox({disabled:false});//监控记录
	$("#jjbMemo").textbox({disabled:false});//交接班事项
	$("#jjbDate").datebox({disabled:false});//交接班日期
	$("#saveWork").css('display','');//取消保存按钮的隐藏
	$("#quitWork").css('display','');//取消取消按钮的隐藏
	cleanAll();
	$("#id").val(chkRows[0].id);
	//日期
//	$("#dataDate").datebox('setValue',chkRows[0].dataDate);
	var date=chkRows[0].dataDate;
	var array = date.split("-");
	var dt = new Date(array[0],parseInt(array[1])-1,parseInt(array[2].substring(0,2)))
//	var ft = dt.subStr(0,10)
	var weekDay = dt.getDay();
	$("#dataDate").val(date.substring(0,10)+" "+showWeek(weekDay));
	//班次类型
	$("#weather").textbox('setValue',chkRows[0].weather);
	//交班人
	$("#dealTkUser").textbox('setValue',chkRows[0].dealUser);
	//接班人
	$("#carryTkUser").textbox('setValue',chkRows[0].carryUser);
	//巡视记录
	$("#xsContent").textbox('setValue',chkRows[0].xsContent);
	//操作记录
	$("#opContent").textbox('setValue',chkRows[0].opContent);
	//监控记录
	$("#mnContent").textbox('setValue',chkRows[0].mnContent);
	///交接班事项
	$("#jjbMemo").textbox('setValue',chkRows[0].jjbMemo);
	//交接班日期
	$("#jjbDate").datebox('setValue',chkRows[0].jjbDate);
//	selectData = [];
}
//点击删除按钮事件
function deleteWork(){
	var chkRows = $('#workGrid').datagrid("getChecked");//获取表格选中行
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
				url : basePath + 'prevent/deleteJtWork.action',
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
						var rows = $('#workGrid').datagrid("getRows").length;
						if(rows < 2){
							$('#workGrid').datagrid('load');
						}else{
							$('#workGrid').datagrid('reload');
						}
					} else {
						$.messager.alert('提示','删除失败!','info');
					}
				}
			});
		}
	});
}
//点击保存按钮事件
function saveWork(){
	var id = $("#id").val();
	//日期
//	var dataDate = $("#dataDate").datebox('getValue');
	var dataDate = $("#dataDate").val().substring(0,10);
	//天气
	var weather = $("#weather").textbox('getValue');
	//交班人
	var dealUser = $("#dealTkUser").textbox('getValue');
	//接班人
	var carryUser = $("#carryTkUser").textbox('getValue');
	//巡视记录
	var xsContent = $("#xsContent").textbox('getValue');
	//操作记录
	var opContent = $("#opContent").textbox('getValue');
	//监控记录
	var mnContent = $("#mnContent").textbox('getValue');
	///交接班事项
	var jjbMemo = $("#jjbMemo").textbox('getValue');
	//交接班日期
	var jjbDate = $("#jjbDate").datebox('getValue');
	//验证日期
	if(dataDate == ""){
		$.messager.alert('提示', "日期不能为空！", 'warning');
		return;
	}
	//天气
//	if(weather == ""){
//		$.messager.alert('提示', "天气不能为空！", 'warning');
//		return;
//	}
	//验证天气长度
	if(weather.length>32){
		$.messager.alert('提示', "天气输入过长！", 'warning');
		return;
	}
	//验证交班人
	if(dealUser == ""){
		$.messager.alert('提示', "交班人不能为空！", 'warning');
		return;
	}
	//验证交班人长度
	if(dealUser.length>32){
		$.messager.alert('提示', "交班人输入过长！", 'warning');
		return;
	}
	//验证接班人
	if(carryUser == ""){
		$.messager.alert('提示', "接班人不能为空！", 'warning');
		return;
	}
	//验证接班人长度
	if(carryUser.length>32){
		$.messager.alert('提示', "接班人输入过长！", 'warning');
		return;
	}
	//验证巡视记录
//	if(xsContent == ""){
//		$.messager.alert('提示', "巡视记录不能为空！", 'warning');
//		return;
//	}
	//验证巡视记录长度
	if(xsContent.length>512){
		$.messager.alert('提示', "巡视记录输入过长！", 'warning');
		return;
	}
	//操作记录
//	if(opContent == ""){
//		$.messager.alert('提示', "操作记录不能为空！", 'warning');
//		return;
//	}
	//操作记录长度
	if(opContent.length>512){
		$.messager.alert('提示', "操作记录输入过长！", 'warning');
		return;
	}
	//监控记录
//	if(mnContent == ""){
//		$.messager.alert('提示', "监控记录不能为空！", 'warning');
//		return;
//	}
	//监控记录长度
	if(mnContent.length>512){
		$.messager.alert('提示', "监控记录输入过长！", 'warning');
		return;
	}
	//交接班事项
//	if(jjbMemo == ""){
//		$.messager.alert('提示', "交接班事项不能为空！", 'warning');
//		return;
//	}
	//交接班事项长度
	if(jjbMemo.length>512){
		$.messager.alert('提示', "交接班事项输入过长！", 'warning');
		return;
	}
	//交接班日期
	if(jjbDate == ""){
		$.messager.alert('提示', "交接班日期不能为空！", 'warning');
		return;
	}
	if(id == ""){
		//创建时间
		var date = new Date();
		var createDate = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
		$.getJSON(basePath + 'prevent/insertJtWork.action', {
			'zhHandOverJobModel.dataDate' : dataDate,//日期
			'zhHandOverJobModel.weather' : weather,//天气
			'zhHandOverJobModel.dealUser' : dealUser,//交班人
			'zhHandOverJobModel.carryUser' : carryUser,//接班人
			'zhHandOverJobModel.xsContent' : xsContent,//巡视记录
			'zhHandOverJobModel.opContent' : opContent,//操作记录
			'zhHandOverJobModel.mnContent' : mnContent,//监控记录
			'zhHandOverJobModel.jjbMemo' : jjbMemo,//交接班事项
			'zhHandOverJobModel.jjbDate' : jjbDate,//交接班日期
			'zhHandOverJobModel.createDate' : createDate,//创建日期
			'zhHandOverJobModel.updateDate' : "",//更新时间
			'zhHandOverJobModel.delFlag' : "1",//删除编码
		}, function(json) {
			if (json.saveSUCCESS == "true") {
				$('#divPanel').window('close');
				$.messager.alert('确认', "保存成功！", 'info', function(r) {
					$('#workGrid').datagrid('reload'); 
				});			
			} else {
				$('#divPanel').window('close');
				$.messager.alert('确认', "保存失败！", 'warning');// 移除失败			
			}
		});
	}else{
		var date = new Date();
		var updateDate = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
		$.getJSON(basePath + 'prevent/updateJtWork.action', {
			'zhHandOverJobModel.id' : id,
			'zhHandOverJobModel.dataDate' : dataDate,//日期
			'zhHandOverJobModel.weather' : weather,//天气
			'zhHandOverJobModel.dealUser' : dealUser,//交班人
			'zhHandOverJobModel.carryUser' : carryUser,//接班人
			'zhHandOverJobModel.xsContent' : xsContent,//巡视记录
			'zhHandOverJobModel.opContent' : opContent,//操作记录
			'zhHandOverJobModel.mnContent' : mnContent,//监控记录
			'zhHandOverJobModel.jjbMemo' : jjbMemo,//交接班事项
			'zhHandOverJobModel.jjbDate' : jjbDate,//交接班日期
			'zhHandOverJobModel.updateDate' : updateDate,//更新时间
//			'zhHandOverJobModel.createUser' : selectData.createUser,
			'zhHandOverJobModel.delFlag' : "1",//删除标识
		}, function(json) {
			if (json.saveSUCCESS == "true") {
				$('#divPanel').window('close');
				$.messager.alert('确认', "保存成功！", 'info', function(r) {
					$('#workGrid').datagrid('reload'); 
				});			
			} else {
				$('#divPanel').window('close');
				$.messager.alert('确认', "保存失败！", 'warning');		
			}
		});
	}

}
//点击取消按钮事件
function quitWork(){
	$('#divPanel').window('close');
}
//点击查询按钮事件
function searchWork(){
	timeType = $("#searchTime").datebox('getValue');
	dealUser = $.trim($("#dealUser").textbox('getValue'));
//	handOverUserY = HTMLEncode(handOverUserY);
	carryUser = $.trim($("#carryUser").textbox('getValue'));
	startTime =  $('#startTime').val();//开始日期
	endTime =  $('#endTime').val();//结束日期
	pageIndex = 1;
	pageSize = 10;
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
	IniDataGrid(timeType,dealUser,carryUser,startTime,endTime);
}
//清空所有值
function cleanAll(){
	$("#id").val("");
	//日期
//	$("#dataDate").datebox('setValue',"");
	$("#dataDate").val("");
	//天气
	$("#weather").textbox('setValue',"");
	//交班人
	$("#dealTkUser").textbox('setValue',"");
	//接班人
	$("#carryTkUser").textbox('setValue',"");
	//巡视记录
	$("#xsContent").textbox('setValue',"");
	//操作记录
	$("#opContent").textbox('setValue',"");
	//监控记录
	$("#mnContent").textbox('setValue',"");
	///交接班事项
	$("#jjbMemo").textbox('setValue',"");
	//交接班日期
	$("#jjbDate").datebox('setValue',"");
}
//点击详情
function WDetail(index,id){
	var chkRows = $('#workGrid').datagrid("getChecked");//获取表格选中行
	if (chkRows.length != 1) {
		$.messager.alert('提示', "请选择一条记录修改！", 'warning');
		return;
	}
	$('#divPanel').window('open');
	$("#divPanel").panel({title:"交接班管理详情"});
	cleanAll();
	$("#dataDate").attr("disabled","disabled");//日期
//	document.getElementById("dataDate").disabled=true;
	$("#weather").textbox({disabled:true});//天气
	$("#dealTkUser").textbox({disabled:true});//交班人
	$("#carryTkUser").textbox({disabled:true});//接班人
	$("#xsContent").textbox({disabled:true});//巡视记录
	$("#opContent").textbox({disabled:true});//操作记录
	$("#mnContent").textbox({disabled:true});//监控记录
	$("#jjbMemo").textbox({disabled:true});//交接班事项
	$("#jjbDate").datebox({disabled:true});//交接班日期
	$("#saveWork").css('display','none');//取消保存按钮的隐藏
	$("#quitWork").css('display','none');//取消取消按钮的隐藏
	
	var allData = $('#workGrid').datagrid('getRows');
	var rowData = null ;
	for(var i=0 ; i < allData.length ; i++){
		if(allData[i].id==id){
			rowData = allData[i];
			break;
		}
	}
	$("#id").val(rowData.id);
	//日期
//	$("#dataDate").datebox('setValue',rowData.dataDate);
//	$("#dataDate").val(rowData.dataDate);
	var date=rowData.dataDate;
	var array = date.split("-");
	var dt = new Date(array[0],parseInt(array[1])-1,parseInt(array[2].substring(0,2)))
	var weekDay = dt.getDay();
	$("#dataDate").val(date.substring(0,10)+" "+showWeek(weekDay));
	//天气
	$("#weather").textbox('setValue',rowData.weather);
	//交班人
	$("#dealTkUser").textbox('setValue',rowData.dealUser);
	//接班人
	$("#carryTkUser").textbox('setValue',rowData.carryUser);
	//巡视记录
	$("#xsContent").textbox('setValue',rowData.xsContent);
	//操作记录
	$("#opContent").textbox('setValue',rowData.opContent);
	//监控记录
	$("#mnContent").textbox('setValue',rowData.mnContent);
	//交接班事项
	$("#jjbMemo").textbox('setValue',rowData.jjbMemo);
	//交接班日期
	$("#jjbDate").datebox('setValue',rowData.jjbDate);
	
	
}

function openMonitorDaily(){
	$('#dialogMonitor').window('center').panel('open');
}

function weekDay(){
	var date=$dp.cal.getP('y')+"-"+$dp.cal.getP('M')+"-"+$dp.cal.getP('d')+" "+showWeek($dp.cal.getP('w'));
//	var date=$dp.cal.getP('y')+"-"+$dp.cal.getP('M')+"-"+$dp.cal.getP('d')+" "+$dp.cal.getP('w','ww');
	this.value=date;//this代表当前input框
	}
	function showWeek(week){
	var wk="";
	switch(parseInt(week)){
	case 0:
	wk="星期日";
	break;
	case 1:
	wk="星期一";
	break;
	case 2:
	wk="星期二";
	break;
	case 3:
	wk="星期三";
	break;
	case 4:
	wk="星期四";
	break;
	case 5:
	wk="星期五";
	break;
	case 6:
	wk="星期六";
	break;
	}
	return wk;
	}
	//页面调用
	
