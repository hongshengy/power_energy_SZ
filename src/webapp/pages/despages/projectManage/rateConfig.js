/**
 * 费率配置 by mengzijie
 * 
 */
var currentDate = new Date(); //当前时间
var priceTagId = null; //费率ID
var operation = null; //操作
var datagridLoad = false; //datagrid是否加载了

$(function() {

	/**
	 * 自定义检验类型 
	 */
	$.extend($.fn.validatebox.defaults.rules, {
		floatNumber:{
			validator:function(value,param){
				return isFloat(value);
			},
			message:'最多输入4位整数和4位小数'
		},
		character:{
			validator:function(value,param){
				return isCharacter(value);
			},
			message:'请输入正确的汉字、字母或数字'
		}
	});
	
	if(consId==null || consId==''|| consId=="null"){
		consSelectMethod = "consSelectMethodLoad()";//定义选中后执行的方法
		consSelectHasRoot = false;//是否有区域能源根节点
		consSelectSearch("",true);
	}else{
		selectRateAll();
	}
	
	//能源类型
	$("#energyType").combobox({
		url:webContextRoot +'pCode/queryCode.action?codeSortId=70049',
		valueField: 'codeValue',
		textField: 'codeName' ,
		prompt:'请选择',
		editable:false,
		required:true,
		panelWidth:155,
		onLoadSuccess:function(data){
			if(data.length>0){
				if(data[0].codeName=='请选择'){
					data.splice(0,1);
					$('#energyType').combobox('loadData',data);
				}
			}
		}
	});
	//费率执行开始时间
	$("#startTime").val(DateUtil.dateToStr('yyyy-MM-dd',currentDate));
	//费率类型
	$("#phaseType").combobox({
		url:webContextRoot +'pCode/queryCode.action?codeSortId=70050',
		valueField: 'codeValue',
		textField: 'codeName' ,
		prompt:'请选择',
		editable:false,
		required:true,
		panelWidth:170,
		onLoadSuccess:function(data){
			if(data.length>0){
				if(data[0].codeName=='请选择'){
					data.splice(0,1);
					$('#phaseType').combobox('loadData',data);
				}
			}
		}
	});
	
	
	//新增按键
	$("#add").click(function(){
		operation = 'add';
		$("#dialog").dialog("setTitle",'新增费率');
		initDialog();
		$("#addPhase").show();
		$("#dialog").dialog("open");
	});
	//修改按键
	$("#update").click(function(){
		var data = $("#rateConfig_datagrid").datagrid("getSelected");
		if(data == null) {
			$.messager.alert('确认','请选择一条记录！','info');
			return;
		}
		priceTagId = data.PRICE_TAG_ID;
		
		operation = 'update';
		$("#dialog").dialog("setTitle",'修改费率');
		initDialog();
		$("#addPhase").show();
		$("#dialog").dialog("open");
		
		//费率名称
		$("#priceTagName").textbox("setValue",data.PRICE_TAG_NAME);
		//能源类型
		$("#energyType").combobox("setValue",data.ENERGY_TYPE);
		//开始时间
		$("#startTime").val(data.PRICE_START_TIME);
		//结束时间
		$("#endTime").val(data.PRICE_END_TIME);
		//备注
		$("#remark").textbox("setValue",data.REMARK);
		
		var PHASE_TYPE_NAME = data.PHASE_TYPE_NAME.split(",");
		var PRICE = data.PRICE.split(",");
		
		var tableHtml = '';
		for(var i = 0; i < PHASE_TYPE_NAME.length; i++){
			tableHtml += '<tr><td>'+PHASE_TYPE_NAME[i]+'</td>';
			tableHtml += '<td>'+PRICE[i]+'</td>';
			tableHtml += '<td><a href="#" onclick="deletePhase(this)">删除</a></td></tr>';
		}
		$("#phaseTable").append(tableHtml);
	});
	//删除按键
	$("#delete").click(function(){
		var data = $("#rateConfig_datagrid").datagrid("getSelected");
		if(data == null) {
			$.messager.alert('确认','请选择一条记录！','info');
			return;
		}
		priceTagId = data.PRICE_TAG_ID;
		
		operation = 'delete';
		
		$.messager.confirm('确认', '确定删除该数据？', function(r){
			if(r){
				$.ajax({	
					url:webContextRoot+'flpz/addPriceTag.action', 
					data:{
						'operationPriceTagModel.operationType': "D",//操作类型 删除
				 	    'operationPriceTagModel.priceTagId': priceTagId//费率ID
					},
					dataType:'json',
					type:'post',
					success:function(result){
						$.messager.alert('确认','删除成功！','info');
						//重新查询
						$('#rateConfig_datagrid').datagrid("load",{'consId':consId});
					}
				});
			}
		});
	});
	
	//窗口里的添加事件
	$("#addPhaseBtn").click(function(){
		if($("#phaseType").combobox("getValue")==''){
			$.messager.alert('确认','费率类型不能为空！','info');
			return;
		}
		if(!$("#price").combobox("isValid")){
			$.messager.alert('确认','价格最多输入4位整数和4位小数！','info');
			return;
		}
		//费率时段
		var phase = $("#phaseTable").find("tr");
		for(var i = 1; i < phase.length; i++){
			var phaseTd = $(phase[i]).find("td");
			if($(phaseTd[0]).text() == $("#phaseType").combobox("getText")){
				$.messager.alert('确认','费率类型“'+$(phaseTd[0]).text()+'”已配置！','info');
				return;
			}
			if($(phaseTd[0]).text() == '全天'){
				$.messager.alert('确认','费率类型“全天”配置后不能再配置其他类型！','info');
				return;
			}
			if($("#phaseType").combobox("getText") == '全天'){
				$.messager.alert('确认','其他的类型配置后不能再配置“全天”费率类型！','info');
				return;
			}
		}
		
		var tableHtml = "<tr><td>"+
		$("#phaseType").combobox("getText")+"</td><td>"+
		$("#price").textbox("getValue")+"</td><td>"+
		'<a href="#" onclick="deletePhase(this)">删除</a>'+"</td></tr>";
		
		$("#phaseTable").append(tableHtml);
		//清空
		$("#phaseType").combobox("setValue","");
		$("#price").textbox("setValue","");
	});
	//窗口里的保存事件
	$("#addBtn").click(function(){
		//费率名称
		var PRICE_TAG_NAME = $.trim($("#priceTagName").textbox("getValue"));
		if(PRICE_TAG_NAME == '' || PRICE_TAG_NAME.length == 0){
			$.messager.alert('确认','费率名称不能为空！','info');
			return;
		}
		if(PRICE_TAG_NAME.length > 30){
			$.messager.alert('确认','费率名称不能超过30个字！','info');
			return;
		}
		//能源类型
		var ENERGY_TYPE = $("#energyType").combobox("getValue");
		if(ENERGY_TYPE == '' || ENERGY_TYPE.length == 0){
			$.messager.alert('确认','能源类型不能为空！','info');
			return;
		}
		//开始时间
		var PRICE_START_TIME = $("#startTime").val();
		//结束时间
		var PRICE_END_TIME = $("#endTime").val();
		if(PRICE_END_TIME!=null&&PRICE_END_TIME!=''&&DateUtil.strToDate(PRICE_END_TIME).getTime() - DateUtil.strToDate(PRICE_START_TIME).getTime() <= 0){
			$.messager.alert('确认','结束时间应大于开始时间！','info');
			return;
		}
		//备注
		var REMARK = $.trim($("#remark").textbox("getValue"));
		if(REMARK.length > 60){
			$.messager.alert('确认','备注不能超过60个字！','info');
			return;
		}
		//费率时段
		var phase = $("#phaseTable").find("tr");
		if(phase.length < 2){
			$.messager.alert('确认','请添加费率类型！','info');
			return;
		}
//		var phaseName = [];
		var phaseType = [];
		var price = [];
		//能源类型 pcode对应关系
		var phaseTypeData = $("#phaseType").combobox("getData");
		for(var i = 1; i < phase.length; i++){
			var phaseTd = $(phase[i]).find("td");
//			phaseName.push($(phaseTd[0]).text());
			for(var j = 0; j < phaseTypeData.length; j ++){
				if(phaseTypeData[j].codeName == $(phaseTd[0]).text()){
					phaseType.push(phaseTypeData[j].codeValue);
					break;
				} 
			}
			price.push($(phaseTd[1]).text());
		}
		
		if(operation == 'add'){//新增操作
			$.ajax({	
				url:webContextRoot+'flpz/addRateConfig.action', 
				data:{
					'operationPriceTagModel.consId':consId,
					'operationPriceTagModel.priceTagName':PRICE_TAG_NAME,
					'operationPriceTagModel.energyType':ENERGY_TYPE,
					'operationPriceTagModel.priceStartTime':PRICE_START_TIME,
					'operationPriceTagModel.priceEndTime':PRICE_END_TIME,
					'operationPriceTagModel.remark':REMARK,
//					'operationPriceTagModel.phaseNameStr':phaseName.join(","),
					'operationPriceTagModel.phaseTypeStr':phaseType.join(","),
					'operationPriceTagModel.priceStr':price.join(",")
				},
				dataType:'json',
				type:'post',
				success:function(result){
					if(result.flag == "SUCCESS") $.messager.alert('确认','新增成功！','info');
					else $.messager.alert('确认','新增失败！','info');
					//窗口关闭
					$("#dialog").dialog("close");
					//重新查询
					$('#rateConfig_datagrid').datagrid("load",{'consId':consId});
				}
			});
		}else if(operation == 'update'){//修改操作
			$.ajax({	
				url:webContextRoot+'flpz/updateRateConfig.action', 
				data:{
					'operationPriceTagModel.consId':consId,
					'operationPriceTagModel.priceTagId':priceTagId,
					'operationPriceTagModel.priceTagName':PRICE_TAG_NAME,
					'operationPriceTagModel.energyType':ENERGY_TYPE,
					'operationPriceTagModel.priceStartTime':PRICE_START_TIME,
					'operationPriceTagModel.priceEndTime':PRICE_END_TIME,
					'operationPriceTagModel.remark':REMARK,
//					'operationPriceTagModel.phaseNameStr':phaseName.join(","),
					'operationPriceTagModel.phaseTypeStr':phaseType.join(","),
					'operationPriceTagModel.priceStr':price.join(",")
				},
				dataType:'json',
				type:'post',
				success:function(result){
					if(result.flag == "SUCCESS") $.messager.alert('确认','修改成功！','info');
					else $.messager.alert('确认','修改失败！','info');
					//窗口关闭
					$("#dialog").dialog("close");
					//重新查询
					$('#rateConfig_datagrid').datagrid("load",{'consId':consId});
				}
			});
		}
	});
	//窗口里的取消事件
	$("#quitBtn").click(function(){
		$("#dialog").dialog("close");
	});
});

function consSelectMethodLoad(){
	consId = consSelectCon.id;//把树节点id赋给企业id
	consName = consSelectCon.text;//把树节点的值赋给企业名称
	selectRateAll();
}

/**
 * 查询客户下所有费率
 */
function selectRateAll() {
	if(!datagridLoad){
		$('#rateConfig_datagrid').datagrid({	
			url:webContextRoot+'flpz/selectRate.action', 
			queryParams: {
				'consId':consId
			},
			loadMsg:'正在加载，请稍等……',//加载时显示提示
			nowrap : false,// 设置为true，当数据长度超出列宽时将会自动截取。
//			striped : true,// 设置为true将交替显示行背景。
			fit: true,
			border:false,
			pagination:true,
			pageSize: 20,
			pageList : [20,50,100],
			fitColumns : true,// 自动适应宽度
			singleSelect : true,// 设置为true将只允许选择一行。
			rownumbers : true,// 设置为true将显示行数。
			loadMsg : "正在努力的读取数据中...",// 提示信息
			tools:"#tableToolDiv",
			title:'费率配置',
			onLoadSuccess:function(data){
				if(data.total > 0){
					//选中第一行
					$('#rateConfig_datagrid').datagrid('selectRow', 0);
					//样式
					//费率名称省略
					var PRICE_TAG_NAME_LIST = $("td[field=PRICE_TAG_NAME] div");
					for(var i = 0; i < PRICE_TAG_NAME_LIST.length; i++){
						$(PRICE_TAG_NAME_LIST[i]).addClass("table-label");
						$(PRICE_TAG_NAME_LIST[i]).attr("title",$(PRICE_TAG_NAME_LIST[i]).text());
					}
					//备注省略
					var REMARK_LIST = $("td[field=REMARK] div");
					for(var i = 0; i < REMARK_LIST.length; i++){
						$(REMARK_LIST[i]).addClass("table-label");
						$(REMARK_LIST[i]).attr("title",$(REMARK_LIST[i]).text());
					}
				}
			},
			columns : [[
			            {field:'PRICE_TAG_ID',title:'费率id',rowspan:2,hidden:true,width:50,align:'center'},
			            {field:'PRICE_TAG_NAME',title:'费率名称',rowspan:2,width:50,align:'left',
			            	formatter: function(value,row,index){
			            		var a = HTMLEncode(value);
			            		return '<label class="table-label">'+a+'</label>';
			            	}
			            },
			            {title:'费率执行时段',colspan:2},
			            {field:'ENERGY_TYPE_NAME',title:'能源类型',rowspan:2,width:50,align:'center'},
//					    {field:'PHASE_NAME',title:'费率名称',rowspan:2,width:50,align:'left'},
//					    {field:'PRICE',title:'费率时段价格(元)',rowspan:2,width:50,align:'left'},
			            {field:'REMARK',title:'备注',rowspan:2,width:50,align:'left',
			            	formatter: function(value,row,index){
			            		var a = HTMLEncode(value);
			            		return '<label class="table-label">'+a+'</label>';
			            	}
			            }],
			            [{field:'PRICE_START_TIME',title:'开始时间',width:50,align:'center'},
			             {field:'PRICE_END_TIME',title:'结束时间',width:50,align:'center'}]],
            view: detailview,
     		detailFormatter: function(rowIndex, rowData){
     			var PHASE_TYPE_NAME = rowData.PHASE_TYPE_NAME.split(",");
    			var PRICE = rowData.PRICE.split(",");
    			var tableHtml = '<tr>';
    			for(var i = 0; i < 4; i++){
    				if(i < PHASE_TYPE_NAME.length){
    					tableHtml += '<td style="width:12.5%;border-style:none;text-align:right;color:#232323;" title="'+PHASE_TYPE_NAME[i]+'">'+PHASE_TYPE_NAME[i]+'：</td>';
    					tableHtml += '<td style="width:12.5%;border-style:none;text-align:left;color:gray" title="'+PRICE[i]+'">'+PRICE[i]+'</td>';
    				}else{
    					tableHtml += '<td style="width:12.5%;border-style:none;text-align:right;"></td>';
    					tableHtml += '<td style="width:12.5%;border-style:none;text-align:left;"></td>';
    				}
    			}
    			tableHtml += '</tr>';
     			return '<div style="width:100%;height:50px;overflow: hidden;border: 1px dashed;background: rgb(242,242,242);">'
     			+'<div style="width:80%;height:100%;overflow: hidden;">'
     			+'<table style="position: relative;top:15px;width:100%;">'+tableHtml+'</table>'
     			+'</div>'
     			+'</div>';
     		}
		});
		datagridLoad = true;
	}else{
		$('#rateConfig_datagrid').datagrid("load",{'consId':consId});
	}
}

/**
 * 查询某一个费率
 */
//function selectRateOne(index,price_tag_id){
//	$("#dialog").dialog("setTitle",'费率详情');
//	initDialog();
//	$("#addPhase").hide();
//	$("#buttons").hide();
//	$("#dialog").dialog("open");
//	
//	$.ajax({	
//		url:webContextRoot+'flpz/selectRate.action', 
//		data:{
//			'consId': consId,
//			'priceTagId':price_tag_id
//		},
//		dataType:'json',
//		type:'post',
//		success:function(result){
//			//费率名称
//			$("#priceTagName").textbox("setValue",result[0].PRICE_TAG_NAME);
//			//能源类型
//			$("#energyType").combobox("setValue",result[0].ENERGY_TYPE);
//			//开始时间
//			$("#startTime").val(result[0].PRICE_START_TIME);
//			//结束时间
//			$("#endTime").val(result[0].PRICE_END_TIME);
//			//备注
//			$("#remark").textbox("setValue",result[0].REMARK);
//			
//			var PHASE_NAME = result[0].PHASE_NAME.split(",");
//			var PHASE_TYPE_NAME = result[0].PHASE_TYPE_NAME.split(",");
//			var PRICE = result[0].PRICE.split(",");
//			
//			var tableHtml = '';
//			for(var i = 0; i < PHASE_NAME.length; i++){
//				tableHtml += '<tr><td>'+PHASE_NAME[i]+'</td>';
//				tableHtml += '<td>'+PHASE_TYPE_NAME[i]+'</td>';
//				tableHtml += '<td>'+PRICE[i]+'</td>';
//				tableHtml += '<td></td></tr>';
//			}
//			$("#phaseTable").append(tableHtml);
//		}
//	});
//}

/**
 * 初始化dialog
 */
function initDialog(){
	//费率名称
	$("#priceTagName").textbox("setValue","");
	//能源类型
	$("#energyType").combobox("setValue","");
	//开始时间
	$("#startTime").val(DateUtil.dateToStr('yyyy-MM-dd',currentDate));
	//结束时间
	$("#endTime").val("");
	//备注
	$("#remark").textbox("setValue","");
	
	//费率时段
	$("#phaseTable").html('<tr><th style="width:40%">费率类型</th><th style="width:30%">价格</th><th style="width:30%">操作</th></tr>');
	$("#phaseType").combobox("setValue","");
	$("#price").textbox("setValue","");
	//保存取消 按键
	$("#buttons").show();
}

/**
 * 窗口删除费率时段
 */
function deletePhase(obj){
	$(obj).closest('tr').remove();
}

/**
 * 判断是否为浮点类型
 * @param value
 * @returns
 */
function isFloat(value){
//	var reg=/^((([0-9])|([1-9][0-9]+))(\.([0-9]+))?)$/;
	var reg=/^([1-9]\d{0,3}|0)(\.\d{1,4})?$/;
//	return reg.test($.trim(value));
	if(reg.test($.trim(value))&&value!=0){
		return true;
	}else{
		return false;
	}
}
/**
 * 判断是否为汉字、字母或数字
 * @param value
 * @returns
 */
function isCharacter(value){
	var reg=/^([A-Za-z0-9]|[\u2E80-\u9FFF])*$/;
	return reg.test($.trim(value));
}