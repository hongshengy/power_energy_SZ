/**
 * 检修管理 by taoping
 * 
 */
var currentdate = new Date();
// 开始时间
var startTime = currentdate.getFullYear() + "-" + currentdate.getMonth() + "-"
		+ currentdate.getDate() + " 00:00:00";
// 结束时间
var endTime = DateUtil.dateToStr('yyyy-MM-dd HH:mm:ss', currentdate);
/***
 * 客户编号
 */
var consId = 0;
/***
 * 选中数据编号
 */
var id = 0;
/***
 * 设备id数组 
 */
var devIdArr = new Array() ;
/***
 * isAdd:0修改，1新增
 */
var isAdd = 0;

// 无功优化修改初始化加载用户变
var wgyhIntSubsID = 0;

var $list = $("#theList"); //文件显示的ID位置
var $btn = $("#addBtn"); // 开始上传保存的按钮ID
var filePicker = '.filePicker'; //添加文件的按键ID
var thumbnailWidth = 60; // 缩略图高度和宽度
//（单位是像素），当宽高度是0~1的时候，是按照百分比计算，具体可以看api文档
var thumbnailHeight = 60;
var thumbnailNumber = 99;
var uploader = null; //上传组件对象
var uploadArray = new Array();//存放上传文件
var detailArr = new Array(); 
var maintourResult = '0';//巡视结果，默认良好
var imgLength = 0;		// 图片的个数
var deleteSize = 0;		// 删除的图片
var editIndex = undefined;
var fileArray = new Array();	// 队列中的图片
var firstUpdateConsId = 0;
var addUploaderLoaded = true;

$(function() {	
	
	$('#tabs').tabs({    
	    border:false,    
	    onSelect:function(title){    
	        if(title=="检修管理"){
	        	bindGridData();
	        }else if(title=="无功优化"){
	        	bindWgyhGridData();
//	        	window.frames[0].location.href=basePath+'pages/despages/electricQuality/desWgyhRecord.jsp'
	        }    
	    }    
	}); 
	/***
	 * 初始化检修管理开始时间下拉框
	 */
	$('#searchStartTime').combobox({
		panelWidth : null,
		valueField : 'value',
		textField : 'text',
		editable : false,
		data : [{value : '',text : '请选择'}, {value : '1',text : '一天内'}, {value : '2',text : '两天内'}, {value : '3',text : '三天内'}, 
		        {value : '4',text : '最近一周'}, {value : '5',text : '其他'} ],
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
	/***
	 * 初始化检修管理竣工时间下拉框
	 */
	$('#searchFinishTime').combobox({
		panelWidth : null,
		valueField : 'value',
		textField : 'text',
		editable : false,
		data : [{value : '',text : '请选择'}, {value : '1',text : '一天内'}, {value : '2',text : '两天内'}, {value : '3',text : '三天内'}, 
		        {value : '4',text : '最近一周'}, {value : '5',text : '其他'} ],
		onSelect : function(record) {
			if (record.value == '5') {
				$("#selectTimeTwo").show();//显示竣工时间
				$('#RNTime').datebox('setValue', startTime);// 开始日期
				$('#RDTime').datebox('setValue', endTime);// 结束日期
			} else {
				$("#selectTimeTwo").hide();//竣工时间隐藏
			}
			 autoResize.call(this); //手动调用激活
		},
		onLoadSuccess : function() {
			$('#searchFinishTime').combobox('select', '');//竣工时间默认为空
		}
	});
	/**
	 * 初始化无功优化开始时间下拉框
	 */
	$('#searchStartTime1').combobox({
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
				$("#selectTime1").show();//显示时间控件
				$('#BNTime1').datebox('setValue', startTime);// 开始日期
				$('#EdTime1').datebox('setValue', endTime);// 结束日期

			} else {
				$("#selectTime1").hide();//隐藏时间控件
			}
			 autoResize.call(this); //手动调用激活
		},
		onLoadSuccess : function() {
			$('#searchStartTime1').combobox('select', '');//开始时间查询默认为空
		}
	});
	/**
	 * 初始化无功优化恢复时间下拉框
	 */
	$('#searchRecoverTime1').combobox({
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
				$("#selectTimeTwo1").show();//显示恢复时间
				$('#RNTime1').datebox('setValue', startTime);// 开始日期
				$('#RDTime1').datebox('setValue', endTime);// 结束日期

			} else {
				$("#selectTimeTwo1").hide();//隐藏时间控件
			}
			 autoResize.call(this); //手动调用激活
		},
		onLoadSuccess : function() {
			$('#searchRecoverTime1').combobox('select', '');//恢复时间查询默认为空
		}
	});
	/**
	 * 客户下拉框
	 */
	$('#searchSubsName').combobox({
		url : basePath+ 'destree/queryConsList.action',
		valueField : 'id',
		textField : 'text',
		panelHeight:'150',
		mode : 'remote',
		onHidePanel : function(){$('#searchSubsName').combobox('reload');}
		});
	/**
	 * 加载检修管理
	 */
	$('#gjcx-datagrid').datagrid({
		title:'检修管理',
		height:900,
		fitColumns: true,
		fit:true,
	    singleSelect: true,
	    pagination:true,
		close : true,
		url:basePath + 'shiftManage/selectDesCheckRecord.action',
		queryParams:{
			'desCheckRecordModel.content' : $('#searchContent').val(),//检修内容
			'desCheckRecordModel.consName' : $('#searchSubsName').combobox("getText"),//检修客户
			'desCheckRecordModel.startTimeType' : $("#searchStartTime").combobox("getValue"),//开始时间
			'desCheckRecordModel.finishTimeType' : $("#searchFinishTime").combobox("getValue"),//竣工时间
			'desCheckRecordModel.startTimeBegin' : $('#BNTime').val(),//开始时间开始
			'desCheckRecordModel.startTimeEnd' : $('#EdTime').val(),//开始时间结束
			'desCheckRecordModel.finishTimeBegin' : $('#RNTime').val(),//竣工时间开始
			'desCheckRecordModel.finishTimeEnd' : $('#RDTime').val(),//竣工时间结束	
			'desCheckRecordModel.ids' : ""
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
		onBeforeLoad:function(param){
			 autoResize.call(this); //手动调用激活
		},
	    onSelect:function (rowIndex, rowData){
	    	selectData = rowData;
	    },onLoadSuccess:function(data){
			var rows = $('#gjcx-datagrid').datagrid("getRows");//获取所有行
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
			field : 'consNo',
			title : '客户编号',
			width : '10%',
			align : 'left'
		},{
			field : 'consName',
			title : '客户名称',
			width : '15%',
			align : 'left',
			formatter: function(v,row,index){ //超链接 设备详细信息
				 return '<a href="#" style="color:blue;margin-left:5px" onclick="queryNewsDes('
			        +"'"+row.id+"','"+row.consName+"'"
					+ ')'
					 +'">'
					+ HTMLEncode(v)
					+ '</a>';
		    }
//			formatter : function(value, row, index) {
//				return HTMLEncode(value);
//			}
		}, {
			field : 'checkNo',
			title : '编号',
			width : '10%',
			align : 'left',
			formatter : function(value, row, index) {
				return HTMLEncode(value);
			}
		}, {
			field : 'checkUser',
			title : '检修人员',
			width : '10%',
			align : 'left',
			formatter : function(value, row, index) {
				return HTMLEncode(value);
			}
		}, {
			field : 'startTime',
			title : '开始时间',
			width : '10%',
			align : 'left'
		},  {
			field : 'content',
			title : '检修内容',
			width : '20%',
			align : 'left',
			formatter : function(value, row, index) {
				return HTMLEncode(value);
			}
		}, {
			field : 'checkResult',
			title : '检修结果',
			width : '5%',
			align : 'center',
			formatter : function(value, row, index) {
				if(value=="0"){
					return "未完成";
				}else{
					return "完成";
				}
				
			}
		}, {
			field : 'finishTime',
			title : '竣工时间',
			width : '10%',
			align : 'left'
		},  
		{
			field : 'nextCheckDate',
			title : '下次检修时间',
			width : '10%',
			align : 'left',
			formatter : function(value, row, index) {
				return value.substr(0,10);
			}
		}, 
		{
			field : 'consId',
			title : '内容',
			width : '1%',
			align : 'left',
			hidden : true
		} ] ]
	});
	/**
	 * 加载无功优化
	 */
	;
	$('#wgyh-datagrid').datagrid({
		title:'无功优化',
		fitColumns: true,
	    singleSelect: true,
	    pagination:true,
		close : true,
		url:basePath + 'shiftManage/selectdesWgyhRecord.action',
		queryParams:{
			'desWgyhRecordModel.recordUser' : $('#searchRecordUser1').val(),//记录人
			'desWgyhRecordModel.subsName' : $('#searchSubsName1').val(),//用户变名称
			'desWgyhRecordModel.startTimeType' : $("#searchStartTime1").combobox("getValue"),//开始时间
			'desWgyhRecordModel.recoverTimeType' : $("#searchRecoverTime1").combobox("getValue"),//恢复时间
			'desWgyhRecordModel.startTimeBegin' : $('#BNTime1').val(),//开始时间开始
			'desWgyhRecordModel.startTimeEnd' : $('#EdTime1').val(),//开始时间结束
			'desWgyhRecordModel.recoverTimeBegin' : $('#RNTime1').val(),//恢复时间开始
			'desWgyhRecordModel.recoverTimeEnd' : $('#RDTime1').val()//恢复时间结束
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
			var rows = $('#wgyh-datagrid').datagrid("getRows");//获取表格数据行
			if(rows.length>0){
				$('#wgyh-datagrid').datagrid("selectRow",0);//默认选中第一行
			}
		},
		 tools:"#tableToolDiv1",		
	    columns: [ [ {
			field : 'checkbox',
			title : '复选框',
			width : 30,
			checkbox : true,
			hidden : true
		},{
			field : 'consNo',
			title : '客户编号',
			width : '10%',
			align : 'left'
		}, {
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
});

//加载设备树
function loadSbTree(){
	 $('#usershebeiTree').combotree({
			data:[]
		 });
	//根据企业节点下一级
	 $.getJSON(basePath +'destree/queryYhbTree.action?treeState=open'
			 +'&isAllTreeNode=true&treeNodeType=1&checkNodeList='+devIdArr+'&id='+consId,{},
		function(json){
			 devIdArr=null;//清空选中节点状态
			 $('#usershebeiTree').combotree({
			    multiple:true,//是否支持多选
				data:json
			 });
		}
	);
}
/*******************************************************************************
 * 绑定检修管理列表数据
 */
function bindGridData() {
	/***
	 * 刷新表格下拉框
	 */
	$('#gjcx-datagrid').datagrid('load',{
		'desCheckRecordModel.content' : $('#searchContent').val(),//检修内容
		'desCheckRecordModel.consName' : $('#searchSubsName').combobox("getText"),//检修客户
		'desCheckRecordModel.startTimeType' : $("#searchStartTime").combobox("getValue"),//开始时间
		'desCheckRecordModel.finishTimeType' : $("#searchFinishTime").combobox("getValue"),//竣工时间
		'desCheckRecordModel.startTimeBegin' : $('#BNTime').val(),//开始时间开始
		'desCheckRecordModel.startTimeEnd' : $('#EdTime').val(),//开始时间结束
		'desCheckRecordModel.finishTimeBegin' : $('#RNTime').val(),//竣工时间开始
		'desCheckRecordModel.finishTimeEnd' : $('#RDTime').val()//竣工时间结束
	});
}
/**
 * 绑定无功优化列表数据
 */
function bindWgyhGridData() {
	$('#wgyh-datagrid').datagrid('load',{
		'desWgyhRecordModel.recordUser' : $('#searchRecordUser1').val(),//记录人
		'desWgyhRecordModel.subsName' : $('#searchSubsName1').val(),//用户变名称
		'desWgyhRecordModel.startTimeType' : $("#searchStartTime1").combobox("getValue"),//开始时间
		'desWgyhRecordModel.recoverTimeType' : $("#searchRecoverTime1").combobox("getValue"),//恢复时间
		'desWgyhRecordModel.startTimeBegin' : $('#BNTime1').val(),//开始时间开始
		'desWgyhRecordModel.startTimeEnd' : $('#EdTime1').val(),//开始时间结束
		'desWgyhRecordModel.recoverTimeBegin' : $('#RNTime1').val(),//恢复时间开始
		'desWgyhRecordModel.recoverTimeEnd' : $('#RDTime1').val()//恢复时间结束
	});
}
/**
 * 检修管理弹框
 */
$('#newShiftDialog').dialog({
	closed : true,
	modal : true,
	shadow : false,
	buttons : '#buttons'
});
/**
 * 无功优化弹框
 */
$('#newShiftDialog1').dialog({
	closed : true,
	modal : true,
	shadow : false,
	buttons : '#buttons2'
});
/**
 * 新增班次按钮点击事件
 */
$("#add").click(function() {	
	bindConsAndSubs();	
	$('#checkNo').textbox('setValue', '');//编号清空
	$('#checkUser').textbox('setValue', '');//检修人清空
	$('#consId').combobox('clear');//客户编号清空
	$('#consId').combobox('setValue', '');
//	SubIni(0);	
//	$('#startTime').val('');
//	$('#finishTime').val('');
//	$('#nextCheckDate').val('');
	$('#startTime').datetimebox('setValue', '');//开始时间清空
	$('#finishTime').datetimebox('setValue', '');//结束时间清空
	$('#nextCheckDate').datebox('setValue', '');//下次检修时间清空
	//$('#content').val('');
	 $('#content').textbox('setValue',"");//检修内空清空
	$("#checkResult").combobox('setValue','');//检修结果清空
//	$('#memo').val('');
	$('#memo').textbox('setValue',"");//备注清空
	//$(".panel-title").html('新建');	
	$("#newShiftDialog").panel({title:"新增"});//设置标题
	isAdd = 1;
	$('#usershebeiTree').combotree('setValue','');//设备树
	$('#newShiftDialog').window('open');// 新建的打开弹出层
	shebeiCode='';//设备id
	shebeiType='';//设备Type
	shebeiName='';//设备名称
	shebeiSubsId='';//用户变
	$("#theList").html("");
	$('.btnPic').parent().show();
	addUpload();
});

var shebeiCode='';//设备id
var shebeiType='';//设备Type
var shebeiName='';
var shebeiSubsId='';
//所有选中的设备
function findAllshebei(rows){
	for(var i=0;i<rows.length;i++){
		if(rows[i].checked==true){
//			if(rows[i].type=='5'||rows[i].type=='6'||rows[i].type=='7'||rows[i].type=='9'){//5,6,7,9 类型的为设备
			if(parseInt(rows[i].type)>2 && parseInt(rows[i].id.length)==12){
				shebeiCode+=rows[i].id+',';				
				shebeiName+= rows[i].text+',';
				if(rows[i].type=='17'){//线路
					shebeiType += '1,';
				}else if(rows[i].type=='16'){//母线
					shebeiType += '2,';
				}else if(rows[i].type=='15'){//变压器
					shebeiType += '3,';
				}else if(rows[i].type=='18' || rows[i].type=='20' || rows[i].type=='21' || rows[i].type=='22' || rows[i].type=='23'){
					shebeiType += '4,';//非电气类设备子项设备类型
				}else if(rows[i].type=='19'){
					shebeiType += '5,';//用能设备
				}
				if(rows[i].parentId.split('_').length>0){
					shebeiSubsId+=rows[i].parentId.split('_')[0]+',';
				}
			}
		}
		
		if(rows[i].children!=null && rows[i].children!='' && rows[i].children.length>0){
			findAllshebei(rows[i].children);
		}
	}
}

var consId = 0;

//function SubIni(consId) {
//	$('#subsId').combobox({
//		url : basePath+ 'destree/queryYhbTree.action?treeState=close&treeNodeType=1&id='+ consId,
//		valueField : 'id',
//		textField : 'text',
//		onSelect : function(record) {
//			userTranId = record.id;
//		}
//	});
//}

/**
 * 取消按钮点击事件
 */
$("#quitBtn").click(function() {
	$('#newShiftDialog').window('close');// 关闭修改弹出层
});

/**
 * 新增按钮点击事件
 */
//$("#addBtn").click(function() {
function newCxSave(){
	if(checkData()){
		var rows  = $('#usershebeiTree').combotree('tree').tree('getRoots'); 
		if(rows != null && rows.length>0){
		   findAllshebei(rows);
		}
		if(shebeiCode == "" && shebeiType==""){
			$.messager.alert('提示', "请选择设备！", 'info', function(){
				$('#usershebeiTree').combobox('textbox').focus();
				$('#usershebeiTree').combobox('showPanel');
	    	});
			return false;
		}
		if (isAdd == 1) {
			var aiUrl = "";
			if(uploadArray.length== 0){
				aiUrl = "";				
			}else{
				for(var i=0;i<uploadArray.length;i++){
					aiUrl += uploadArray[i].url+",";
				}	
				aiUrl = aiUrl.substring(0, aiUrl.lastIndexOf(","))
			}
			$.ajax({
				type : "post",
				url : basePath
						+ 'shiftManage/addDesCheckRecord.action',
				dataType : "text",
				data : {
					'desCheckRecordModel.checkNo' : $('#checkNo').val(),//编号
					'desCheckRecordModel.checkUser' : $('#checkUser').val(),//检修人
					'desCheckRecordModel.consId' : $("#consId").combobox("getValue"),//客户编号
					'desCheckRecordModel.startTime' : $('#startTime').datetimebox('getValue'),//开始时间
					'desCheckRecordModel.finishTime' : $('#finishTime').datetimebox('getValue'),//竣工时间
					'desCheckRecordModel.nextCheckDate' : $('#nextCheckDate').datebox('getValue'),//下次检修时间
					'desCheckRecordModel.content' : $('#content').val(),//检修内容
					'desCheckRecordModel.checkResult' : $("#checkResult").combobox("getValue"),//检修结果
					'desCheckRecordModel.memo' : $('#memo').val(),//备注
					'desCheckRecordModel.devId' : shebeiCode,//设备编号
					'desCheckRecordModel.devName' : shebeiName,//设备名称
					'desCheckRecordModel.devType' : shebeiType,//设备类型
					'desCheckRecordModel.subsId' : shebeiSubsId,//用户变编号
					'desCheckRecordModel.checkImage' : aiUrl//图片路径
				},
				complete : function(XMLHttpRequest,
						textStatus) {
				},
				success : function(data) {
					$.messager.alert('提示',"保存成功！",'info',
					function(r) {
						$('#newShiftDialog').window('close');// 关闭的打开弹出层
						bindGridData();//刷新数据

					});
				},
				error : function(data) {

				}
			});
		} else {
			var aiUrl = "";
			if(uploadArray.length>0){
				for(var i=0;i<uploadArray.length;i++){
					aiUrl += uploadArray[i].url+",";
				}	
				aiUrl = aiUrl.substring(0, aiUrl.lastIndexOf(","));				
				for(var j=0;j<$("#theList").find("span").filter(".file-item").length;j++){
					if($("#theList").find("span").filter(".file-item")[j].id.indexOf(".gif")!=-1 ||
					   $("#theList").find("span").filter(".file-item")[j].id.indexOf(".jpg")!=-1 ||
					   $("#theList").find("span").filter(".file-item")[j].id.indexOf(".jpeg")!=-1 ||
					   $("#theList").find("span").filter(".file-item")[j].id.indexOf(".bmp")!=-1 ||
					   $("#theList").find("span").filter(".file-item")[j].id.indexOf(".png")!=-1){
						aiUrl += ","+$("#theList").find("span").filter(".file-item")[j].id;
					}					
				}
			}else{
				if($("#theList").find("span").filter(".file-item").length>0){
					for(var i=0;i<$("#theList").find("span").filter(".file-item").length;i++){
						aiUrl += $("#theList").find("span").filter(".file-item")[i].id+",";
					}	
					aiUrl = aiUrl.substring(0, aiUrl.lastIndexOf(","))
				}else{
					aiUrl = "";
				}				
			}
			$.ajax({
				type : "post",
				url : basePath+ 'shiftManage/updateDesCheckRecord.action',
				dataType : "text",
				data : {
					'desCheckRecordModel.id' : id,
					'desCheckRecordModel.checkNo' : $('#checkNo').val(),//编号
					'desCheckRecordModel.checkUser' : $('#checkUser').val(),//检修人
					'desCheckRecordModel.consId' : $("#consId").combobox("getValue"),//检修客户
//					'desCheckRecordModel.subsId' : $("#subsId").combobox("getValue"),
					'desCheckRecordModel.startTime' : $('#startTime').datetimebox('getValue'),//开始时间
					'desCheckRecordModel.finishTime' : $('#finishTime').datetimebox('getValue'),//竣工时间
					'desCheckRecordModel.nextCheckDate' :$('#nextCheckDate').datebox('getValue'),//下次检修时间
					'desCheckRecordModel.content' : $('#content').val(),//检修内容
					'desCheckRecordModel.checkResult' : $("#checkResult").combobox("getValue"),//检修结果
					'desCheckRecordModel.memo' : $('#memo').val(),//备注
					'desCheckRecordModel.devId' : shebeiCode,//设备编号
					'desCheckRecordModel.devName' : shebeiName,//设备名称
					'desCheckRecordModel.devType' : shebeiType,//设备类型
					'desCheckRecordModel.subsId' : shebeiSubsId,//用户变编号
					'desCheckRecordModel.checkImage' : aiUrl//图片路径
				},
				complete : function(XMLHttpRequest,textStatus) {
				},
				success : function(data) {
					$.messager.alert('提示',"保存成功！",'info',
					function(r) {
						$('#newShiftDialog').window('close');// 关闭的打开弹出层
						bindGridData();//刷新数据
					});
				},
				error : function(data) {

				}
			});
		}
	}
}
//);

$("#update").click(function() {
	$("#newShiftDialog").panel({title:"修改"});//修改标题
	var chkRows = $('#gjcx-datagrid').datagrid("getChecked");//选中行

	if (chkRows.length != 1) {
		$.messager.alert('提示', "请选择一条记录修改！", 'warning');// 移除失败
	} else {
		$('#usershebeiTree').combotree('setValue','');//设备树		
		id = chkRows[0].id;//选中数据编号
		
		$('#checkNo').textbox('setValue', chkRows[0].checkNo);//编号
		$('#checkUser').textbox('setValue', chkRows[0].checkUser);//检修人		
//		$('#subsId').combobox('clear');
//		$('#subsId').combobox('setValue', chkRows[0].subsId);
//		$('#startTime').val(chkRows[0].startTime);
//		$('#finishTime').val(chkRows[0].finishTime);
//		$('#nextCheckDate').val(chkRows[0].nextCheckDate.substr(0,10));
		$('#startTime').datetimebox('setValue', chkRows[0].startTime);//开始时间
		$('#finishTime').datetimebox('setValue', chkRows[0].finishTime);//竣工时间
		$('#nextCheckDate').datebox('setValue', chkRows[0].nextCheckDate.substr(0,10));//下次检修时间
		
//		$('#content').val(chkRows[0].content);
		$('#content').textbox('setValue',chkRows[0].content);//检修内容
		$("#checkResult").combobox('setValue',chkRows[0].checkResult);//检修结果
		//$('#memo').val(chkRows[0].memo);
		$('#memo').textbox('setValue',chkRows[0].memo);//备注
		$('#newShiftDialog').window('open');// 新建的打开弹出层
		$("#theList").html("");
		$('.btnPic').parent().show();
		addUpload();
		var imageUrl=chkRows[0].checkImage.split(",");
		if(imageUrl.length>0 && imageUrl[0] != ""){
//			for(var i=0;i<imageUrl.length;i++){
//				var $li = $('<span id="' + "WU_FILE_" + i + '" class="file-item thumbnail">'
//						+ '<a>'
//						+ '<img id="showPic'+'-'+i+'-'+0+'" src="'+basePath+imageUrl[i]+'" width="60px" height="60px"><span id="'+"delete"+i+'" class="deleteIcon">▬</span>' 
//						+ '</a>'
//						+ '</span>'
//				), $img = $li.find('a');
//				$("#theList").append($li);
//			}
			if(imageUrl.length == 1){
				var src = basePath;
				$.ajax({
					async : false,
					url : basePath + 'pCode/judgeFileExist.action',
					data : {downloadFilePath : imageUrl[0]},
					dataType : "json",
					success : function(data) {
						if(data.FLAG == "1"){
							src += imageUrl[0];
						}else if(data.FLAG == "2"){
							src += "/pages/despages/common/images/imageNotFound.png";
						}
					}
				});

				var $li = $('<span class="file-item thumbnail" id="'+imageUrl[0]+'">'
						+ '<a>'
						+ '<img src="'+src+'" width="60px" height="60px">' // + '<div class="info">' + file.name + '</div>'
						+ '</a>'
						+'<span id="deleteWU_FILE'+'_'+0+'" class="deleteIcon">▬</span>'
						+ '</span>'
				), $img = $li.find('a'),$a = $li.find('a');
				$a.attr('href', src);
				$a.attr("data-lightbox","example-set");
//				$img.attr("href",webContextRoot+imgUrl[i]);
				$("#theList").append($li);
			}
			
			if(imageUrl.length == 2){
				var src = basePath;
				// 判断照片是否存在
				$.ajax({
					async : false,
					url : basePath + 'pCode/judgeFileExist.action',
					data : {downloadFilePath : imageUrl[0]},
					dataType : "json",
					success : function(data) {
						if(data.FLAG == "1"){
							src += imageUrl[0];
						}else if(data.FLAG == "2"){
							src += "/pages/despages/common/images/imageNotFound.png";
						}
					}
				});
				var $li = $('<span class="file-item thumbnail" id="'+imageUrl[0]+'">'
						+ '<a>'
						+ '<img src="'+src+'" width="60px" height="60px">' // + '<div class="info">' + file.name + '</div>'
						+ '</a>'
						+'<span id="deleteWU_FILE'+'_'+0+'" class="deleteIcon">▬</span>'
						+ '</span>'
				), $img = $li.find('a'),$a = $li.find('a');
				$a.attr("data-lightbox","example-set");
				$a.attr('href', src);
				$("#theList").append($li);
				
				// 第二张图片
				var src1 = basePath;
				// 判断照片是否存在
				$.ajax({
					async : false,
					url : basePath + 'pCode/judgeFileExist.action',
					data : {downloadFilePath : imageUrl[1]},
					dataType : "json",
					success : function(data) {
						if(data.FLAG == "1"){
							src1 += imageUrl[1];
						}else if(data.FLAG == "2"){
							src1 += "/pages/despages/common/images/imageNotFound.png";
						}
					}
				});
				var $li1 = $('<span class="file-item thumbnail" id="'+imageUrl[1]+'">'
						+ '<a>'
						+ '<img src="'+src1+'" width="60px" height="60px">' // + '<div class="info">' + file.name + '</div>'
						+ '</a>'
						+'<span id="deleteWU_FILE'+'_'+1+'" class="deleteIcon">▬</span>'
						+ '</span>'
				), $img1 = $li1.find('a'),$a1 = $li1.find('a');
				$a1.attr('href', src1);
				$a1.attr("data-lightbox","example-set");
				$("#theList").append($li1);
			}
			
			if(imageUrl.length == 3){
				var src = basePath;
				// 判断照片是否存在
				$.ajax({
					async : false,
					url : basePath + 'pCode/judgeFileExist.action',
					data : {downloadFilePath : imageUrl[0]},
					dataType : "json",
					success : function(data) {
						if(data.FLAG == "1"){
							src += imageUrl[0];
						}else if(data.FLAG == "2"){
							src += "/pages/despages/common/images/imageNotFound.png";
						}
					}
				});
				var $li = $('<span class="file-item thumbnail" id="'+imageUrl[0]+'">'
						+ '<a>'
						+ '<img src="'+src+'" width="60px" height="60px">' // + '<div class="info">' + file.name + '</div>'
						+ '</a>'
						+'<span id="deleteWU_FILE'+'_'+0+'" class="deleteIcon">▬</span>'
						+ '</span>'
				), $img = $li.find('a'),$a = $li.find('a');
				$a.attr('href', src);
				$a.attr("data-lightbox","example-set");
				$("#theList").append($li);
				
				// 第二张图片
				var src1 = basePath;
				// 判断照片是否存在
				$.ajax({
					async : false,
					url : basePath + 'pCode/judgeFileExist.action',
					data : {downloadFilePath : imageUrl[1]},
					dataType : "json",
					success : function(data) {
						if(data.FLAG == "1"){
							src1 += imageUrl[1];
						}else if(data.FLAG == "2"){
							src1 += "/pages/despages/common/images/imageNotFound.png";
						}
					}
				});
				var $li1 = $('<span class="file-item thumbnail" id="'+imageUrl[1]+'">'
						+ '<a>'
						+ '<img src="'+src1+'" width="60px" height="60px">' // + '<div class="info">' + file.name + '</div>'
						+ '</a>'
						+'<span id="deleteWU_FILE'+'_'+1+'" class="deleteIcon">▬</span>'
						+ '</span>'
				), $img1 = $li1.find('a'),$a1 = $li1.find('a');
				$a1.attr('href', src1);
				$a1.attr("data-lightbox","example-set");
				$("#theList").append($li1);
				// 第三张图片
				var src2 = basePath;
				// 判断照片是否存在
				$.ajax({
					async : false,
					url : basePath + 'pCode/judgeFileExist.action',
					data : {downloadFilePath : imageUrl[2]},
					dataType : "json",
					success : function(data) {
						if(data.FLAG == "1"){
							src2 += imageUrl[2];
						}else if(data.FLAG == "2"){
							src2 += "/pages/despages/common/images/imageNotFound.png";
						}
					}
				});
				var $li2 = $('<span class="file-item thumbnail" id="'+imageUrl[2]+'">'
						+ '<a>'
						+ '<img src="'+src2+'" width="60px" height="60px">' // + '<div class="info">' + file.name + '</div>'
						+ '</a>'
						+'<span id="deleteWU_FILE'+'_'+2+'" class="deleteIcon">▬</span>'
						+ '</span>'
				), $img2 = $li2.find('a'),$a2 = $li2.find('a');
				$a2.attr('href', src2);
				$a2.attr("data-lightbox","example-set");
				$("#theList").append($li2);				
			}
			
			if(imageUrl.length == 4){
				var src = basePath;
				$.ajax({
					async : false,
					url : basePath + 'pCode/judgeFileExist.action',
					data : {downloadFilePath : imageUrl[0]},
					dataType : "json",
					success : function(data) {
						if(data.FLAG == "1"){
							src += imageUrl[0];
						}else if(data.FLAG == "2"){
							src += "/pages/despages/common/images/imageNotFound.png";
						}
					}
				});

				var $li = $('<span class="file-item thumbnail" id="'+imageUrl[0]+'">'
						+ '<a>'
						+ '<img src="'+src+'" width="60px" height="60px">' // + '<div class="info">' + file.name + '</div>'
						+ '</a>'
						+'<span id="deleteWU_FILE'+'_'+0+'" class="deleteIcon">▬</span>'
						+ '</span>'
				), $img = $li.find('a'),$a = $li.find('a');
				$a.attr('href', src);
				$a.attr("data-lightbox","example-set");
//				$img.attr("href",webContextRoot+imgUrl[i]);
				$("#theList").append($li);
				//第二张图片
				var src1 = basePath;
				$.ajax({
					async : false,
					url : basePath + 'pCode/judgeFileExist.action',
					data : {downloadFilePath : imageUrl[1]},
					dataType : "json",
					success : function(data) {
						if(data.FLAG == "1"){
							src1 += imageUrl[1];
						}else if(data.FLAG == "2"){
							src1 += "/pages/despages/common/images/imageNotFound.png";
						}
					}
				});

				var $li1 = $('<span class="file-item thumbnail" id="'+imageUrl[1]+'">'
						+ '<a>'
						+ '<img src="'+src1+'" width="60px" height="60px">' // + '<div class="info">' + file.name + '</div>'
						+ '</a>'
						+'<span id="deleteWU_FILE'+'_'+1+'" class="deleteIcon">▬</span>'
						+ '</span>'
				), $img1 = $li1.find('a'),$a1 = $li1.find('a');
				$a1.attr('href', src1);
				$a1.attr("data-lightbox","example-set");
//				$img.attr("href",webContextRoot+imgUrl[i]);
				$("#theList").append($li1);
				//第三张图片
				var src2 = basePath;
				$.ajax({
					async : false,
					url : basePath + 'pCode/judgeFileExist.action',
					data : {downloadFilePath : imageUrl[2]},
					dataType : "json",
					success : function(data) {
						if(data.FLAG == "1"){
							src2 += imageUrl[2];
						}else if(data.FLAG == "2"){
							src2 += "/pages/despages/common/images/imageNotFound.png";
						}
					}
				});

				var $li2 = $('<span class="file-item thumbnail" id="'+imageUrl[2]+'">'
						+ '<a>'
						+ '<img src="'+src2+'" width="60px" height="60px">' // + '<div class="info">' + file.name + '</div>'
						+ '</a>'
						+'<span id="deleteWU_FILE'+'_'+2+'" class="deleteIcon">▬</span>'
						+ '</span>'
				), $img2 = $li2.find('a'),$a2 = $li2.find('a');
				$a2.attr('href', src);
				$a2.attr("data-lightbox","example-set");
//				$img.attr("href",webContextRoot+imgUrl[i]);
				$("#theList").append($li2);
				//第四张图片
				var src3 = basePath;
				$.ajax({
					async : false,
					url : basePath + 'pCode/judgeFileExist.action',
					data : {downloadFilePath : imageUrl[3]},
					dataType : "json",
					success : function(data) {
						if(data.FLAG == "1"){
							src3 += imageUrl[3];
						}else if(data.FLAG == "2"){
							src3 += "/pages/despages/common/images/imageNotFound.png";
						}
					}
				});

				var $li3 = $('<span class="file-item thumbnail" id="'+imageUrl[3]+'">'
						+ '<a>'
						+ '<img src="'+src3+'" width="60px" height="60px">' // + '<div class="info">' + file.name + '</div>'
						+ '</a>'
						+'<span id="deleteWU_FILE'+'_'+3+'" class="deleteIcon">▬</span>'
						+ '</span>'
				), $img3 = $li3.find('a'),$a3 = $li3.find('a');
				$a3.attr('href', src3);
				$a3.attr("data-lightbox","example-set");
//				$img.attr("href",webContextRoot+imgUrl[i]);
				$("#theList").append($li3);
			}
			
			if(imageUrl.length == 5){
				var src = basePath;
				$.ajax({
					async : false,
					url : basePath + 'pCode/judgeFileExist.action',
					data : {downloadFilePath : imageUrl[0]},
					dataType : "json",
					success : function(data) {
						if(data.FLAG == "1"){
							src += imageUrl[0];
						}else if(data.FLAG == "2"){
							src += "/pages/despages/common/images/imageNotFound.png";
						}
					}
				});

				var $li = $('<span class="file-item thumbnail" id="'+imageUrl[0]+'">'
						+ '<a>'
						+ '<img src="'+src+'" width="60px" height="60px">' // + '<div class="info">' + file.name + '</div>'
						+ '</a>'
						+'<span id="deleteWU_FILE'+'_'+0+'" class="deleteIcon">▬</span>'
						+ '</span>'
				), $img = $li.find('a'),$a = $li.find('a');
				$a.attr('href', src);
				$a.attr("data-lightbox","example-set");
//				$img.attr("href",webContextRoot+imgUrl[i]);
				$("#theList").append($li);
				//第二张图片
				var src1 = basePath;
				$.ajax({
					async : false,
					url : basePath + 'pCode/judgeFileExist.action',
					data : {downloadFilePath : imageUrl[1]},
					dataType : "json",
					success : function(data) {
						if(data.FLAG == "1"){
							src1 += imageUrl[1];
						}else if(data.FLAG == "2"){
							src1 += "/pages/despages/common/images/imageNotFound.png";
						}
					}
				});

				var $li1 = $('<span class="file-item thumbnail" id="'+imageUrl[1]+'">'
						+ '<a>'
						+ '<img src="'+src1+'" width="60px" height="60px">' // + '<div class="info">' + file.name + '</div>'
						+ '</a>'
						+'<span id="deleteWU_FILE'+'_'+1+'" class="deleteIcon">▬</span>'
						+ '</span>'
				), $img1 = $li1.find('a'),$a1 = $li1.find('a');
				$a1.attr('href', src1);
				$a1.attr("data-lightbox","example-set");
//				$img.attr("href",webContextRoot+imgUrl[i]);
				$("#theList").append($li1);
				//第三张图片
				var src2 = basePath;
				$.ajax({
					async : false,
					url : basePath + 'pCode/judgeFileExist.action',
					data : {downloadFilePath : imageUrl[2]},
					dataType : "json",
					success : function(data) {
						if(data.FLAG == "1"){
							src2 += imageUrl[2];
						}else if(data.FLAG == "2"){
							src2 += "/pages/despages/common/images/imageNotFound.png";
						}
					}
				});

				var $li2 = $('<span class="file-item thumbnail" id="'+imageUrl[2]+'">'
						+ '<a>'
						+ '<img src="'+src2+'" width="60px" height="60px">' // + '<div class="info">' + file.name + '</div>'
						+ '</a>'
						+'<span id="deleteWU_FILE'+'_'+2+'" class="deleteIcon">▬</span>'
						+ '</span>'
				), $img2 = $li2.find('a'),$a2 = $li2.find('a');
				$a2.attr('href', src2);
				$a2.attr("data-lightbox","example-set");
//				$img.attr("href",webContextRoot+imgUrl[i]);
				$("#theList").append($li2);
				//第四张图片
				var src3 = basePath;
				$.ajax({
					async : false,
					url : basePath + 'pCode/judgeFileExist.action',
					data : {downloadFilePath : imageUrl[3]},
					dataType : "json",
					success : function(data) {
						if(data.FLAG == "1"){
							src3 += imageUrl[3];
						}else if(data.FLAG == "2"){
							src3 += "/pages/despages/common/images/imageNotFound.png";
						}
					}
				});

				var $li3 = $('<span class="file-item thumbnail" id="'+imageUrl[3]+'">'
						+ '<a>'
						+ '<img src="'+src3+'" width="60px" height="60px">' // + '<div class="info">' + file.name + '</div>'
						+ '</a>'
						+'<span id="deleteWU_FILE'+'_'+3+'" class="deleteIcon">▬</span>'
						+ '</span>'
				), $img3 = $li3.find('a'),$a3 = $li3.find('a');
				$a3.attr('href', src3);
				$a3.attr("data-lightbox","example-set");
//				$img.attr("href",webContextRoot+imgUrl[i]);
				$("#theList").append($li3);
				//第五张图片
				var src4 = basePath;
				$.ajax({
					async : false,
					url : basePath + 'pCode/judgeFileExist.action',
					data : {downloadFilePath : imageUrl[4]},
					dataType : "json",
					success : function(data) {
						if(data.FLAG == "1"){
							src4 += imageUrl[4];
						}else if(data.FLAG == "2"){
							src4 += "/pages/despages/common/images/imageNotFound.png";
						}
					}
				});

				var $li4 = $('<span class="file-item thumbnail" id="'+imageUrl[4]+'">'
						+ '<a>'
						+ '<img src="'+src4+'" width="60px" height="60px">' // + '<div class="info">' + file.name + '</div>'
						+ '</a>'
						+'<span id="deleteWU_FILE'+'_'+4+'" class="deleteIcon">▬</span>'
						+ '</span>'
				), $img4 = $li4.find('a'),$a4 = $li4.find('a');
				$a4.attr('href', src4);
				$a4.attr("data-lightbox","example-set");
//				$img.attr("href",webContextRoot+imgUrl[i]);
				$("#theList").append($li4);
				// btnPic是添加照片按钮 数字指的是下标
				$('.btnPic').parent().hide();
			}
		}
		
		
		$(".deleteIcon").click(function(){
			var file_id = $(this).attr("id");
			// 删除图片
			$(this).parent().remove();
			// 超过三张图片 隐藏按钮
//			var dataLength = $('#add-datagrid').datagrid('getRows');
			for(var x = 0;x<$("#theList").find("span").filter(".file-item").length;x++){
				// 遍历span下的照片个数
//				 $.each($("#theList").find("span").filter(".file-item"),function(i,val){
					   if($("#theList").find("span").filter(".file-item").length < 5){
						   $('.btnPic').parent().show();
						   var ids = $("#filePicker").find("div")[1].id;
						   $("#"+ids).css({'top':'-50px'});
						   $("#"+ids).css({'left':'0px'});
					   }
//				   });
			}						
		});	
		if(document.getElementsByName("file").length != 0){
			var ids = $("#filePicker").find("div")[1].id;
			$("#"+ids).css({'top':'-50px'});
			$("#"+ids).css({'left':'0px'});
		}
		shebeiCode='';//设备id
		shebeiType='';//设备Type
		shebeiName='';//设备名称
		shebeiSubsId='';//用户变编号
		$.ajax({
			type : "post",
			url : basePath
					+ 'shiftManage/selectCheckRecordDev.action',
			dataType : "text",
			data : {
				'checkRecordDevModel.id' : id,//编号
				'checkRecordDevModel.checkType' :'1'
			},
			complete : function(XMLHttpRequest,textStatus) {
			},
			success : function(data) {
				var listD = $.parseJSON(data);//这是设备的所有集合
				devIdArr ='';//设备id数组 
				for(var i=0;i<listD.length;i++){//循环集合、、
//					devIdArr.push(Number(listD[i].devId));
					devIdArr += listD[i].devId;
					if(i!=listD.length-1){
						devIdArr += ',';
					}
				}
				
				bindConsAndSubs();
				$('#consId').combobox('clear');//检修客户清空
				$('#consId').combobox('setValue', chkRows[0].consId);//检修客户赋值
				
				$('#newShiftDialog').window('open');// 新建的打开弹出层
				
				isAdd = 0;
			},
			error : function(data) {

			}
		});		
	}
});
//var updateObjects = '';//修改之前的内容

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
								+ 'shiftManage/deleteDesCheckRecord.action',
						dataType : "text",
						data : {
							'id' : ids
						},
						complete : function(XMLHttpRequest,textStatus) {
						},
						success : function(data) {
							$.messager.alert('提示',"删除成功！",'info',function(r) {
									bindGridData();//刷新表格数据
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
			consId = record.id;//获取企业编号
			if (!isNaN(consId)) {
				loadSbTree();//加载设备树
			}
		}
	});
}

/***
 * 判断数据是否为空
 */
function checkData(){
	//编号
	if($.trim($('#checkNo').val())==""){
		$.messager.alert('提示', "编号不能为空！", 'warning');
		return false;
	}
	if($('#checkNo').val().length>10){
		$.messager.alert('提示', "编号不能超过10位！", 'warning');
		return false;
	}
	//检修结果
	if($.trim($("#checkResult").combobox("getValue"))==""){
		$.messager.alert('提示', "检修结果不能为空！", 'warning');
		return false;
	}
	//客户编号
	if($.trim($("#consId").combobox("getValue"))==""){
		$.messager.alert('提示', "客户名称不能为空！", 'warning');
		return false;
	}
	//用户变编号
//	if($("#subsId").combobox("getValue")==""){
//		$.messager.alert('提示', "检修厂站不能为空！", 'warning');
//		return false;
//	}
	if($('#usershebeiTree').combotree('getValue')=='' ||$('#usershebeiTree').combotree('getValue')==null){
//	if(shebeiCode == "" && shebeiType==""){
		$.messager.alert('提示', "请选择设备！", 'info', function(){
			$('#usershebeiTree').combobox('textbox').focus();
			$('#usershebeiTree').combobox('showPanel');
    	});
		return false;
	}
	//开始时间
	if($.trim($('#startTime').datetimebox('getValue'))==""){
		$.messager.alert('提示', "开始时间不能为空！", 'warning');
		return false;
	}
	//竣工时间
	if($.trim($('#finishTime').datetimebox('getValue'))==""){
		$.messager.alert('提示', "竣工时间不能为空！", 'warning');
		return false;
	}	
	if($('#startTime').datetimebox('getValue')>$('#finishTime').datetimebox('getValue')){
		$.messager.alert('提示', "竣工时间不能小于开始时间！", 'warning');
		return false;
	}
	//检修人
	if($.trim($('#checkUser').val())==""){
		$.messager.alert('提示', "检修人不能为空！", 'warning');
		return false;
	}
	if($.trim($('#nextCheckDate').datebox('getValue'))==""){
		$.messager.alert('提示', "下次检修时间不能为空！", 'warning');
		return false;
	}
	if($('#finishTime').datetimebox('getValue')>$('#nextCheckDate').datebox('getValue')+" 23:59:59"){
		$.messager.alert('提示', "下次检修时间不能小于竣工时间！", 'warning');
		return false;
	}
	if($('#checkUser').val().length>16){
		$.messager.alert('提示', "检修人不能超过16位！", 'warning');
		return false;
	}	
	//检修内容		
	if($.trim($('#content').val())==""){
		$.messager.alert('提示', "检修内容不能为空！", 'warning');
		return false;
	}
	if($('#content').val().length>64){
		$.messager.alert('提示', "检修内容不能超过64位！", 'warning');
		return false;
	}
	//备注
//	if($.trim($('#memo').val())==""){
//		$.messager.alert('提示', "备注不能为空！", 'warning');
//		return false;
//	}	
	if($('#memo').val().length>128){
		$.messager.alert('提示', "备注不能超过128位！", 'warning');
		return false;
	}	
	return true;	
}

//点击检修客户查看设备具体信息
function queryNewsDes(lineId,consName){
	var content = "<iframe src='checkRecordDev.jsp?lineId="+lineId+
		"&consName="+ consName+"' width='100%' height='99%' frameborder='0' scrolling='no'/>";
	var boarddiv = "<div id='msgwindow' title='详情'/>";
	$(document.body).append(boarddiv);
	var win = $("#msgwindow").dialog({
		content : content,
		width : document.body.clientWidth-260,
		height : document.body.clientHeight-100,
		maximizable:true,
		maximized:false,
		closable:true,
		modal : 'shadow',
		title : '检修设备信息',
	});
	win.dialog('open');
}





/**
 * 新增班次按钮点击事件
 */
$("#add1").click(function() {		
//	$('#startTime').val('');
//	$('#recoverTime').val('');
	$('#startTime1').datetimebox('setValue', '');//开始时间清空
	$('#recoverTime1').datetimebox('setValue', '');//恢复时间清空
//	$('#content').val('');
	$('#content1').textbox('setValue','');//内容清空
	$('#recordUser1').textbox('setValue', '');//记录人清空
	bindConsAndSubs1();//初始化企业、用户变

	$('#consId1').combobox('clear');//客户清空
	$('#consId1').combobox('setValue', '');
	SubIni1(0);

	
//	$(".panel-header")[0].childNodes[0].innerText = '新建';
	//$(".panel-title").html('新建');
	$("#newShiftDialog1").panel({title:"新增"});//设置标题为新建
	isAdd1 = 1;
	$('#newShiftDialog1').window('open');// 新建的打开弹出层
});

var consId1 = 0;

function SubIni1(consId) {
//	$('#subsId1').combobox({
//		url : basePath+ 'destree/queryYhbTree.action?treeState=close&treeNodeType=1&id='+ consId,
//		valueField : 'id',
//		textField : 'text',
//		onSelect : function(record) {
//			userTranId = record.id;
//		}
//	});
	$('#subsId1').combobox({
		url : basePath+ 'destree/getYhbTree.action?treeState=close&id='+ consId+'&subType=1',
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
$("#quitBtn1").click(function() {
	$('#newShiftDialog1').window('close');// 关闭修改弹出层
});
/***
 * isAdd：0修改，1：新增
 */
var isAdd1 = 0;

/**
 * 新增按钮点击事件
 */
$("#addBtn1").click(function() {
	if(checkData1()){
		if (isAdd1 == 1) {
			$.ajax({
						type : "post",
						url : basePath
								+ 'shiftManage/addDesWgyhRecord.action',
						dataType : "text",
						data : {
							'desWgyhRecordModel.startTime' : $('#startTime1').datetimebox('getValue'),//开始时间
							'desWgyhRecordModel.recoverTime' : $('#recoverTime1').datetimebox('getValue'),//恢复时间
							'desWgyhRecordModel.recordUser' : $('#recordUser1').val(),//记录人
							'desWgyhRecordModel.consId' : $("#consId1").combobox("getValue"),//客户编号
							'desWgyhRecordModel.subsId' : $("#subsId1").combobox("getValue"),//用户变编号
							'desWgyhRecordModel.content' : $('#content1').val()//内容
						},
						complete : function(XMLHttpRequest,
								textStatus) {
						},
						success : function(data) {
							$.messager.alert('提示',"保存成功！",'info',
							function(r) {
								$('#newShiftDialog1').window('close');// 关闭的打开弹出层
								bindWgyhGridData();//刷新绑定表格

							});
						},
						error : function(data) {

						}
					});
		} else {
			$.ajax({
				type : "post",
				url : basePath+ 'shiftManage/updateDesWgyhRecord.action',
				dataType : "text",
				data : {
					'desWgyhRecordModel.id' : id,//编号
					'desWgyhRecordModel.startTime' : $('#startTime1').datetimebox('getValue'),//开始时间
					'desWgyhRecordModel.recoverTime' : $('#recoverTime1').datetimebox('getValue'),//恢复时间
					'desWgyhRecordModel.recordUser' : $('#recordUser1').val(),//记录人
					'desWgyhRecordModel.consId' : $("#consId1").combobox("getValue"),//客户编号
					'desWgyhRecordModel.subsId' : $("#subsId1").combobox("getValue"),//用户变编号
					'desWgyhRecordModel.content' : $('#content1').val()//内容
				},
				complete : function(XMLHttpRequest,textStatus) {
				},
				success : function(data) {
					$.messager.alert('提示',"保存成功！",'info',
					function(r) {
						$('#newShiftDialog1').window('close');// 关闭的打开弹出层
						bindWgyhGridData();//刷新表格数据
					});
				},
				error : function(data) {

				}
			});
		}
	}
});
var consId1 = 0;
var id1 = 0;

/**
 * 修改班次按钮点击事件
 */
$("#update1").click(function() {
	//$(".panel-header")[0].childNodes[0].innerText = '修改';
	//$(".panel-title").html('修改');
	$("#newShiftDialog1").panel({title:"修改"});
	var chkRows = $('#wgyh-datagrid').datagrid("getChecked");//获取表格选中行

	if (chkRows.length != 1) {
		$.messager.alert('提示', "请选择一条记录修改！", 'warning');// 移除失败
	} else {
		bindConsAndSubs1();//初始化加载客户、用户变

		id = chkRows[0].id;//编号
		$('#consId1').combobox('clear');
		$('#consId1').combobox('setValue', chkRows[0].consId);//客户赋值

		wgyhIntSubsID = chkRows[0].subsId;
		$('#subsId1').combobox('clear');
//		$('#subsId1').combobox('setValue', chkRows[0].subsId);//用户变赋值
		
		

//		$('#startTime').val(chkRows[0].startTime);
//		$('#recoverTime').val(chkRows[0].recoverTime);
		$('#startTime1').datetimebox('setValue', chkRows[0].startTime);//开始时间
		$('#recoverTime1').datetimebox('setValue', chkRows[0].recoverTime);//恢复时间
		//$('#content')$('#content').val('');.textbox('setValue', chkRows[0].content);
//		$('#content').val(chkRows[0].content);
		$('#content1').textbox('setValue',chkRows[0].content);//内容
		$('#recordUser1').textbox('setValue', chkRows[0].recordUser);//记录人
		$('#newShiftDialog1').window('open');// 新建的打开弹出层

		isAdd1 = 0;
	}
});

$("#delete1").click(
	function() {
		var chkRows = $('#wgyh-datagrid').datagrid("getChecked");
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
								+ 'shiftManage/deleteDesWgyhRecord.action',
						dataType : "text",
						data : {
							'id' : ids
						},
						complete : function(XMLHttpRequest,textStatus) {
						},
						success : function(data) {
							$.messager.alert('提示',"删除成功！",'info',function(r) {
									bindWgyhGridData();//刷新加载表格数据
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
function bindConsAndSubs1() {
	$('#consId1').combobox({
		url : basePath+ 'destree/queryConsList.action',
		valueField : 'id',
		textField : 'text',
		panelHeight:'150',
		mode : 'remote',
		onHidePanel : function(){$('#consId1').combobox('reload');},
		onSelect : function(record){
			consId = record.id
			if (!isNaN(consId)) {
				SubIni1(consId);
				if(wgyhIntSubsID != 0){
					$('#subsId1').combobox('clear');
					$('#subsId1').combobox('setValue', wgyhIntSubsID);//用户变赋值
					wgyhIntSubsID = 0;
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
		bindWgyhGridData();
});

/***
 * 判断数据是否为空
 */
function checkData1(){
	//记录人
	if($('#recordUser1').val()==""){
		$.messager.alert('提示', "记录人不能为空！", 'warning');
		return false;
	}
	if($('#recordUser1').val().length>16){
		$.messager.alert('提示', "记录人信息不能超过16位！", 'warning');
		return false;
	}
	//客户编号
	if($("#consId1").combobox("getValue")==""){
		$.messager.alert('提示', "客户名称不能为空！", 'warning');
		return false;
	}
	//用户变编号
	if($("#subsId1").combobox("getValue")==""){
		$.messager.alert('提示', "用户变不能为空！", 'warning');
		return false;
	}
	//开始时间
	if($('#startTime1').datetimebox('getValue')==""){
		$.messager.alert('提示', "开始时间不能为空！", 'warning');
		return false;
	}
	//恢复时间
	if($('#recoverTime1').datetimebox('getValue')==""){
		$.messager.alert('提示', "恢复时间不能为空！", 'warning');
		return false;
	}
	if($('#startTime1').datetimebox('getValue')>$('#recoverTime1').datetimebox('getValue')){
		$.messager.alert('提示', "恢复时间不能小于开始时间！", 'warning');
		return false;
	}
	//内容
	if($('#content1').val()==""){
		$.messager.alert('提示', "内容不能为空！", 'warning');
		return false;
	}	
	if($('#content1').val().length>64){
		$.messager.alert('提示', "内容不能超过64位！", 'warning');
		return false;
	}	
	return true;	
}

/**
 * 初始化webuploader上传组件
 */
function uploadFile(){
	fileArray = new Array();
	
	uploadArray = new Array();
	// init webuploader
	uploader = WebUploader.create({
		// 选完文件后，是否自动上传。
		auto : false,

		// swf文件路径
		swf : basePath
				+ '/pages/despages/common/webuploader-0.1.5/Uploader.swf',

		// 文件接收服务端。
		server : basePath + 'webUploader/webUploader.action',

		// 选择文件的按钮。可选。
		// 内部根据当前运行是创建，可能是input元素，也可能是flash.
		pick : {
			"id" : filePicker,
			"multiple" : false
		// 禁止多选。
		},

		// 分片上传设置
//		chunked : true, // 允许分片
//		chunkSize : 5 * 1024 * 1024, // 每片大小2M
//		chunkRetry : 4, // 分片上传失败之后的重试次数
		threads : 5, // 上传并发数。允许同时最大3个上传进程
		// 去重
		duplicate : true,

		// 上传文件个数限制
		fileNumLimit : thumbnailNumber,
		// 单个文件大小限制 20M
		fileSingleSizeLimit : 20 * 1024 * 1024,

		// 只允许选择图片文件。
		accept : {
			title : 'Images',
			extensions : 'gif,jpg,jpeg,bmp,png',
			mimeTypes : '.gif,.jpg,.jpeg,.bmp,.png'
		},
		method : 'POST',

		// 传入参数。这两个参数会跟文件一起传给后台，用于跟后台对接，确认文件的来源。
		//预设定了2个参数，根据需求自行选择
//		formData : {
//			"parameter1" : "aaa",
//			"parameter2" : "bbb"
//		}

	});
	
	// 当有文件添加进来的时候
	uploader.on('fileQueued', function(file) { // webuploader事件.当选择文件后，文件被加载到文件队列中，触发该事件。等效于
		var $li = $('<span id="' + file.id + '" class="file-item thumbnail">'
				+ '<a>'
				+ '<img>' // + '<div class="info">' + file.name + '</div>'
				+ '</a>'
				+ '</span>'
		), $img = $li.find('img'),$a = $li.find('a');

		// $list为容器jQuery实例
		$list.append($li);
		
		
		//所有文件个数 - 取消上传文件个数
//		var fileSize = uploader.getFiles().length - uploader.getFiles("cancelled").length;
//		if(fileSize==thumbnailNumber){
//			$(filePicker).hide();
//		}
		
		// thumbnailWidth x thumbnailHeight 为 100 x 100
		uploader.makeThumb(file, function(error, src) { // webuploader方法
			
			$("#" + file.id).append('<span id="delete' + file.id + '" class="deleteIcon">▬</span>');
			$img.attr('src', src);
			$img.attr('width', thumbnailWidth+"px");
			$img.attr('height', thumbnailHeight+"px");
			$img.attr('title',file.name);
			$a.attr('href', src);
			$a.attr("data-lightbox","example-set");
			
			//删除事件
			$(".deleteIcon").click(function(){
					var file_id = $(this).attr("id").substr(6);
					//删除上传队列
				    uploader.removeFile(file_id);
				    
				    // 获取选中的文件id
				    var $parent = $('#'+file_id).parent()[0].id;
				    
//				    var dataLength = $('#add-datagrid').datagrid('getRows');
					for(var x = 0;x<$("#"+$parent).children().length;x++){
						// 根据文件id获取父元素的id 然后查询该父元素下面有几个span子元素
					    // 如果有3个子元素 显示上传按钮
						if($("#" + $parent).children('span').length == 5){
							// 显示上传按钮
//							$('.btnPic' + x + '').parent().parent().show();
							$('deleteWU_FILE_' + x).parent().parent().show();
						}
					}
				    
				    //删除页面显示
				    $("#"+file_id).remove();
				    
				    // 超过三张图片 隐藏按钮
				    $.each($("#theList").find("span").filter(".file-item"),function(i,val){
						   if($("#theList").find("span").filter(".file-item").length < 5){
							   $('.btnPic').parent().parent().show();
						   }
					   });			  					
//					for(var x = 0;x<$("#"+$parent).children().length;x++){
//						if($("#" + file.id).parent()[0].id == "theList"){
//							fileArray.push(x+"-"+file.id);
//						}
//					}
			});
			
			// 超过三张图片 隐藏按钮
//			var dataLength = $('#add-datagrid').datagrid('getRows');
			var scenePicUrl = '';
			var picSize = '';

			 $.each($("#theList").find("span").filter(".file-item"),function(i,val){
				   if($("#theList").find("span").filter(".file-item").length >= 5){
					   $('.btnPic').parent().parent().hide();
				   }
			   });
//			for(var x = 0;x<$("#theList").children().length;x++){
//				if($("#" + file.id).parent()[0].id == "theList"){
//					fileArray.push(x+"-"+file.id);
//				}
//			}					
		},1,1);
	});
	
	//当validate不通过时，调用的方法
	uploader.on('error', function(type) {
		if(type=='Q_TYPE_DENIED'){
			$.messager.alert('提示','请选择正确的文件类型!','info');  
		}else if(type=='F_EXCEED_SIZE'){
			$.messager.alert('提示','您选择的文件大小应小于20M!','info');  
		}else{
			$.messager.alert('提示','请选择正确的文件!','info');  
		}
	});

	// 文件上传成功，给item添加成功class, 用样式标记上传成功。
	uploader.on('uploadSuccess', function(file) {
		$('#' + file.id).addClass('upload-state-done');
	});
	
	// 文件上传成功接收服务器的返回值。
	uploader.on('uploadAccept', function(object,ret) {
		//获取上传文件的信息
		uploadArray.push(ret);
		
	});
	
	// 所有文件上传成功
	uploader.on('uploadFinished', function() {
		$(filePicker).show();
		//业务上的新增修改功能方法
		
//		 $('#add-datagrid').datagrid('selectRow',0); // 选择第一行
		// 获取数据的方法
//		saveUpdateData();
		// 真正保存的方法
		newCxSave();
		
		//清空上传列表
//		clearUploader();
	});

	// 文件上传失败，显示上传出错。
	uploader.on('uploadError', function(file) {
		var $li = $('#' + file.id), $error = $li.find('div.error');

		// 避免重复创建
		if (!$error.length) {
			$error = $('<div class="error"></div>').appendTo($li);
		}

		$error.text('上传失败');
	});

	$btn.on('click', function() {
		
//		setTimeout("saveUpdateData();",100);
		if(checkData()){
			uploader.upload();
		}		
	});
}
/**
 * 清空上传列表
 */
function clearUploader(){
	var files = uploader.getFiles();
	for(var i in files){
		var file_id = files[i].id;
		$("#"+file_id).remove();
	}
	uploader.reset();
	uploadArray = new Array();//存放上传文件
}
/**
 * 添加上传组件
 */
function addUpload(){
	if(addUploaderLoaded){
		uploadFile();
		addUploaderLoaded = false;
	}
	clearUploader();
}