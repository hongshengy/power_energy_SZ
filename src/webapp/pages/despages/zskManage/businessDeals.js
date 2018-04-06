/**
 * 录入信息
 * @author wxt
 * @since 2017-05-02 var consId=101000004001;
 */
var num=0;
JfType=null;//业务代办修改/添加的弹出框中的所用变量
//当前页数
var pageNo = 1;
$(function(){	
	$('#ywdb').datagrid({    
		url: webContextRoot +"businessRecord/selectYwdbInfo.action?businessRecordModel.delFlag=1&&businessRecordModel.consId="+consId,
		title:"业务代办",
		loadMsg:'正在加载，请稍等……',//加载时显示提示
		rownumbers:true,//表格前是否显示序号
		fit:true,
		border:false,
		fitColumns:true,
		striped: true,
		singleSelect: true,
		columns:[[
		 /*   {field:'ck',checkbox:true},*/
	        {field:'businessName',title:'业务类型',width:60
		    	/*formatter: function(value,row,index){
					// 0未提交，1已提交
					if(value == 1){
						return '新装';
					}else if(value == 2){
						return '增容';
					}else if(value == 3){
						return '销户';
					}else if(value == 4){
						return '移表';
					}else if(value == 5){
						return '减容(暂停/恢复)';
					}else if(value == 6){
						return '变更(容量/需量)';
					}
					else{
						return HTMLEncode(value);
					}
				}*/
			},
       		{field:'applyUserName',title:'申请人',width:60},
       		{field:'applyUserTel',title:'联系电话',width:60},
       		{field:'applyMemo',title:'申请备注',width:60,
       			formatter: function(value,row,index){
					if(value.length>10)
					value = value.substring(0,10)+'...';
					return HTMLEncode(value);
				}
       		},
       		{field:'applyDate',title:'申请日期',width:60},
       		{field:'businessStep',title:'办理进度',width:60,
       			formatter: function(value,row,index){
					// 0未提交，1已提交
					if(value == 0){
						return '待提交';
					}else if(value == 1){
						return '已提交';
					}else{
						return HTMLEncode(value);
					}
				}},
       		{field : 'remark',title : '详情',align : 'center',width : 60,
				formatter : function(value, row, index) {
					var conId = "id"+index;
					return "<a onclick=\"bt_see('"+index+"','"+row.id+"')\" id='"+conId+"' style='color:blue;text-decoration: underline;cursor: pointer;'>详情</a>";
				}
			}
		]],
		tools:"#linkbuttons",
		pagination:true,
		pageSize: 20,
		pageList : [10,20,30,50],
		onLoadSuccess:function(data){
			var rows = $('#ywdb').datagrid("getRows");
			if(rows.length>0){
				$('#ywdb').datagrid("selectRow",0);
			}
		}
	});  	
	
	 //查询条件中业务类型的下拉框数据
	$('#businessType').combobox({//业务类型
		url:webContextRoot +'businessRecord/queryCode.action?codeSortId=70064',
		valueField: 'codeValue',
		textField: 'codeName' ,
		panelWidth: null,
		onChange: function(newValue, oldValue){
			wnGrade = newValue;
		},onLoadSuccess: function(){
//			$('#businessType').combobox('setValue', 1);
		}
	});
	//查询条件中的办理进度下拉框
	$('#businessStep').combobox({
//		width: 150,
		panelWidth: null,
		data: [{
			label: '请选择',
			value: '',
//			"selected":true 
		},{
			label: '待提交',
			value: '0',
		},{
			label: '已提交',
			value: '1'
		}],
		valueField: 'value',
		textField: 'label',
		editable: false
	});
	businessType_xz();//新增/修改弹出框中的业务类型下拉框的加载
	businessType_ck();//查看弹出框中的业务类型下拉框的加载
	
	/**
	 * 对输入框的自定义检验类型 
	 */
	$.extend($.fn.validatebox.defaults.rules, {
		telephone:{
			validator:function(value,param){
				return isTelephone(value);
			},
			message:'请输入11位的手机号码'
		},
		character:{
			validator:function(value,param){
				return isCharacter(value);
			},
			message:'请输入汉字或字母'
		},
		float:{
			validator:function(value,param){
				return isFloat(value);
			},
			message:'请输入正确的数字'
		},
		floatNumber:{
			validator:function(value,param){
				return isNumber(value);
			},
			message:'请输入数字且最多保留4位小数'
		},
		maxLength: {    
	        validator: function(value, param){    
	            return value.length <= param[0];    
	        },    
	        message: '请输入小于或等于{0}个数字.'   
	    },   
		maxCharacter: {    
			validator: function(value, param){    
				return value.length <= param[0];    
			},    
			message: '申请人姓名的长度限于10个字.'   
		}    

		
	});
});

//根据条件查询点击查询按钮的查询方法
function bt_search(){
	var businessType= $('#businessType').combobox("getValue");
	var businessStep =$('#businessStep').combobox("getValue");
	var startDate =  $('#startDate').val();
	var endDate =  $('#endDate').val();
/*	var startDate=$('#startDate').datetimebox("getValue");
	var endDate=$('#endDate').datetimebox("getValue");*/
	$('#ywdb').datagrid('reload',{
		   'businessRecordModel.businessType':businessType,//业务类型
		   'businessRecordModel.businessStep':businessStep,//办理进度
		   'businessRecordModel.startDate':startDate,//申请开始时间
		   'businessRecordModel.endDate':endDate,//申请结束时
		   
	});
	
}
//点击增加按钮的方法
function bt_add(){
	qingkong();//清空增加弹出框中的数据
	queryUserFiles();//加载用户基本信息的方法
	applyInfo();//加载申请人信息的方法
	$('#bt_add_commit').show();//新增窗口中的新增提交按钮的显示
	$('#bt_update_commit').hide();//新增窗口中的更新按钮的隐藏
	
//	businessType_xz();
	$('#ywdbxz').dialog('setTitle','新增');
	$('#ywdbxz').dialog('open');	
	$('#businessType_xz').combobox('setValue', 1);//新增弹出窗口中的业务类型默认为“新装”类型
}
//修改
function bt_modify(){
	qingkong();//清空数据
	queryUserFiles();//加载客户信息
	$('#bt_update_commit').show();//更新按钮的显示
	$('#bt_add_commit').hide();//增加按钮的隐藏
	
	$('#ywdbxz').dialog('setTitle','修改');
	var idlist = $('#ywdb').datagrid('getSelected');
	if(idlist==null){
		$.messager.alert('提示','请选择一条记录进行修改!','info');   
		}else if(idlist.businessStep==1){
			$.messager.alert('提示','本条记录已被提交不能修改!','info');  
		}else{
			
			if(idlist.applyChangeJfType==1){
				JfType="按容量计费";
			}else{
				JfType="按需量计费";
			}
	$("#id").textbox("setValue",idlist.id);//id
	$("#userName").textbox("setValue",idlist.applyUserName);//申请人姓名
	$("#mobile").textbox("setValue",idlist.applyUserTel);//申请人联系方式
	$("#businessType_xz").combobox("setValue",idlist.businessType);//业务类型
	$("#applyMemo_xz").textbox("setValue",idlist.applyMemo);//申请备注
	$("#planStopDate").datetimebox("setValue",idlist.planStopDate);//计划停用日期
	$("#planRecoverDate").datetimebox("setValue",idlist.planRecoverDate);//计划恢复日期
	$("#applySuspendCap").textbox("setValue",idlist.applySuspendCap);//申请暂停容量
	$("#applyChangeJfType").combobox("setValue",idlist.applyChangeJfType);//计费方式变更方式applyChangeJfType
	$("#JfType_xz").html(JfType);//计费方式JfType
	$("#applyNum").textbox("setValue",idlist.applyNum);//需量值/容量值（kW）
	$('#ywdbxz').dialog('open');
 }
}
//删除功能的方法
function bt_delete(){
	var idlist = $('#ywdb').datagrid('getSelected');
	if(idlist==null){
		$.messager.alert('提示','请选择一条记录进行删除!','info');   
		}if(idlist.businessStep==1){
			$.messager.alert('提示','本条记录已被提交不能删除!','info');  
		}else{
			$.messager.confirm('确认','您确认想要删除记录吗？',function(r){    
			    if (r){    
			    	$.ajax({			
			    		url:webContextRoot+'businessRecord/DelYwdbInfo.action', 
			    		data:{
			    			'businessRecordModel.delFlag':0,
			    			'businessRecordModel.businessStep':0,
			    			'businessRecordModel.id': idlist.id
			    		},
			    		dataType:'json',
			    		type:'post',
			    		success:function(result){
			    			if(result.flag=='success'){
			    				$.messager.alert('提示','删除成功!','info');  
								$('#ywdb').datagrid('reload');
			    			}else{
			    				$.messager.alert('提示','删除失败!','info');  
			    			}
			    		}
			    	}); 
			    }
			});
		}
}

//“进行提交”功能对应的方法
function bt_commit(){
	var idlist = $('#ywdb').datagrid('getSelected');
	if(idlist==null){
		$.messager.alert('提示','请选择一条记录进行提交!','info');   
		}if(idlist.businessStep==1){
			$.messager.alert('提示','该条记录已被提交!','info');   
		}else{
			$.messager.confirm('确认','您确认想要提交记录吗？',function(r){    
			   if (r){    
		    	$.ajax({			
		    		url:webContextRoot+'businessRecord/submitYwdbInfo.action', 
		    		data:{
		    			'businessRecordModel.businessStep':1,
		    			'businessRecordModel.id': idlist.id
		    		},
		    		dataType:'json',
		    		type:'post',
		    		success:function(result){
		    			if(result.flag=='success'){
				    	$.messager.alert('提示','提交成功!','info');  
						$('#ywdb').datagrid('reload');
		                }else{
				         $.messager.alert('提示','提交失败!','info');  
		            	}
		    		}
		    	}); 
		    }
		});
	}
}
//新增功能的提交按钮对应的方法
function bt_add_commit(){
	var delFlag= 1;
	var businessStep=0;
	var userName = $.trim($("#userName").textbox("getValue"));//申请人姓名
	var applyUserTel = $("#mobile").textbox("getValue");//申请人联系方式
	var businessType = $("#businessType_xz").combobox("getValue");//业务类型
	var planStopDate = null;
	var planRecoverDate = null;
	var applySuspendCap = null;
	var applyChangeJfType = null;
	var applyNum = null;
	if(userName.length==0){
		$.messager.alert('提示','申请人姓名不能为空!','info');    
		return;
	}
	if(userName.length>10){
		$.messager.alert('提示','申请人姓名过长请重新输入!','info');    
		return;
	}
	if(applyUserTel.length==0){
		$.messager.alert('提示','申请人联系方式不能为空!','info');    
		return;
	}
	if(!isTelephone(applyUserTel)){
		$.messager.alert('确认','申请人联系方式必须是数字并且11位!','info');    
		return;
	}
	/*if(!isCharacter(userName)){
		$.messager.alert('提示','申请人姓请重新输入汉字或字母!','info');    
		return;
	}*/
	if(businessType==5){
		planStopDate = $("#planStopDate").datetimebox("getValue");//计划停用日期
		planRecoverDate = $("#planRecoverDate").datetimebox("getValue");//计划恢复日期
		applySuspendCap = $("#applySuspendCap").textbox("getValue");//申请暂停容量
		if(planStopDate.length==0){
			$.messager.alert('提示','计划停用日期不能为空!','info');    
			return;
		}
		if(planRecoverDate.length==0){
			$.messager.alert('提示','计划恢复日期不能为空!','info');    
			return;
		}
		if(applySuspendCap.length==0){
			$.messager.alert('提示','申请暂停容量不能为空!','info');    
			return;
		}
		if(!isNumber(applySuspendCap)){
			$.messager.alert('提示','申请暂停容量输入有误请重新输入!','info');    
			return;
		}
		if(applySuspendCap.length>10){
			$.messager.alert('提示','申请暂停容量输入数字过大，请重新输入!','info');    
			return;
		}
	}
	if(businessType==6){
		applyChangeJfType = $("#applyChangeJfType").combobox("getValue");//计费方式变更方式applyChangeJfType
		applyNum = $("#applyNum").textbox("getValue");//需量值/容量值（kW）
		if(applyNum.length==0){
			$.messager.alert('提示','需量值/容量值,不能为空!','info');    
			return;
		}
		if(!isNumber(applyNum)){
			$.messager.alert('提示','需量值/容量值,输入有误请重新输入!','info');    
			return;
		}
		if(applyNum.length>12){
			$.messager.alert('提示','需量值/容量值输入数字过大，请重新输入!','info');    
			return;
		}
	}
	var applyMemo = $("#applyMemo_xz").textbox("getValue");//申请备注
	if(applyMemo.length==0){
		$.messager.alert('提示','申请备注不能为空!','info');    
		return;
	}
	if(applyMemo.length>150){
		$.messager.alert('提示','申请备注过长,请重新输入!','info');    
		return;
	}
	
	$.ajax({			
		url:webContextRoot+'businessRecord/saveYwdbInfo.action', 
		data:{
			'businessRecordModel.delFlag': delFlag,
			'businessRecordModel.businessStep': businessStep,
			'businessRecordModel.applyUserName': userName,
			'businessRecordModel.applyUserTel': applyUserTel,
			'businessRecordModel.businessType': businessType,
			'businessRecordModel.applyMemo': applyMemo,
			'businessRecordModel.planStopDate': planStopDate,
			'businessRecordModel.planRecoverDate': planRecoverDate,
			'businessRecordModel.applySuspendCap': applySuspendCap,
			'businessRecordModel.applyChangeJfType': applyChangeJfType,
			'businessRecordModel.applyNum': applyNum,
			'businessRecordModel.consId': consId,
		},
		dataType:'json',
		type:'post',
		success:function(result){
			if(result.flag=='success'){
				$.messager.alert('提示','添加成功!','info');  
				$('#ywdbxz').window('close');
				$('#ywdb').datagrid('reload');
			}else{
				$.messager.alert('提示','添加失败!','info');  
			}
		}
	});
}
//修改的提交按钮对应的方法
function bt_update_commit(){
	var id = $("#id").textbox("getValue");//业务代办id
	var userName = $.trim($("#userName").textbox("getValue"));//申请人姓名
	var applyUserTel = $("#mobile").textbox("getValue");//申请人联系方式
	var businessType = $("#businessType_xz").combobox("getValue");//业务类型
	var planStopDate = null;
	var planRecoverDate = null;
	var applySuspendCap = null;
	var applyChangeJfType = null;
	var applyNum = null;
	if(userName.length==0){
		$.messager.alert('提示','申请人姓名,不能为空!','info');    
		return;
	}
	if(userName.length>10){
		$.messager.alert('提示','申请人姓名过长,请重新输入!','info');    
		return;
	}
	if(applyUserTel.length==0){
		$.messager.alert('提示','申请人联系方式,不能为空!','info');    
		return;
	}
	if(!isTelephone(applyUserTel)){
		$.messager.alert('确认','申请人联系方式,必须是数字并且11位!','info');    
		return;
	}
	/*if(!isCharacter(userName)){
		$.messager.alert('提示','申请人姓名,请重新输入汉字或字母!','info');    
		return;
	}*/
	if(businessType==5){
		planStopDate = $("#planStopDate").datetimebox("getValue");//计划停用日期
		planRecoverDate = $("#planRecoverDate").datetimebox("getValue");//计划恢复日期
		applySuspendCap = $("#applySuspendCap").textbox("getValue");//申请暂停容量
		if(planStopDate.length==0){
			$.messager.alert('提示','计划停用日期不能为空!','info');    
			return;
		}
		if(planRecoverDate.length==0){
			$.messager.alert('提示','计划恢复日期不能为空!','info');    
			return;
		}
		if(applySuspendCap.length==0){
			$.messager.alert('提示','申请暂停容量不能为空!','info');    
			return;
		}
		if(!isNumber(applySuspendCap)){
			$.messager.alert('提示','申请暂停容量输入有误请重新输入!','info');    
			return;
		}
		if(applySuspendCap.length>10){
			$.messager.alert('提示','申请暂停容量输入数字过大，请重新输入!','info');    
			return;
		}
	}
	if(businessType==6){
		applyChangeJfType = $("#applyChangeJfType").combobox("getValue");//计费方式变更方式applyChangeJfType
		applyNum = $("#applyNum").textbox("getValue");//需量值/容量值（kW）
		if(applyNum.length==0){
			$.messager.alert('提示','需量值/容量值不能为空!','info');    
			return;
		}
		if(!isNumber(applyNum)){
			$.messager.alert('提示','需量值/容量值必须是数字!','info');    
			return;
		}
		if(applyNum.length>12){
			$.messager.alert('提示','需量值/容量值,输入数字过大，请重新输入!','info');    
			return;
		}
	}
	var applyMemo = $("#applyMemo_xz").textbox("getValue");//申请备注
	if(applyMemo.length==0){
		$.messager.alert('提示','申请备注不能为空!','info');    
		return;
	}
	if(applyMemo.length>150){
		$.messager.alert('提示','申请备注过长,请重新输入!','info');    
		return;
	}
	$.ajax({			
		url:webContextRoot+'businessRecord/saveYwdbInfo.action', 
		data:{
			'businessRecordModel.applyUserName': userName,
			'businessRecordModel.applyUserTel': applyUserTel,
			'businessRecordModel.businessType': businessType,
			'businessRecordModel.applyMemo': applyMemo,
			'businessRecordModel.planStopDate': planStopDate,
			'businessRecordModel.planRecoverDate': planRecoverDate,
			'businessRecordModel.applySuspendCap': applySuspendCap,
			'businessRecordModel.applyChangeJfType': applyChangeJfType,
			'businessRecordModel.applyNum': applyNum,
			'businessRecordModel.consId': consId,
			'businessRecordModel.id': id,
		},
		dataType:'json',
		type:'post',
		success:function(result){
			if(result.flag=='success'){
				$.messager.alert('提示','修改成功!','info');  
				$('#ywdbxz').window('close');
				$('#ywdb').datagrid('reload');
			}else{
				$.messager.alert('提示','修改失败!','info');  
			}
		}
	});
}
//新增/修改弹出框的清空方法
function qingkong(){
	$("#userName").textbox('setValue','');
	$('#mobile').textbox('setValue','');
	$('#businessType_xz').combobox('setValue','');
	$("#planStopDate").datetimebox('setValue','');
	$("#planRecoverDate").datetimebox('setValue','');
	$('#applySuspendCap').textbox('setValue','');
    $("#applyChangeJfType").combobox('setValue','');
    $('#applyMemo_xz').textbox('setValue','');
    $('#applyNum').textbox('setValue','');
}
/**
 * 取消 按钮
 */
function bt_add_cancel(){
	$('#ywdbxz').window('close');
//	init();
}
//查询客户信息
function queryUserFiles(){
	//查询设置时间
	  $.getJSON(webContextRoot + 'pCode/queryuserFiles.action', {
		  'sfdConsModel.consId':consId
	  },
	  function(json){
		  var consNoObj = document.getElementById('consNo');
		  var consNOName = "客户编号: ";
		  consNoObj.innerHTML = consNOName+json[0].consNo;
		  $('#consNo').attr("title",json[0].consNo);
		  
		  var consNameObj = document.getElementById('consName');
		  var consNameName = "客户名称: ";
		  var consNameStr = json[0].consName;
		  if(consNameStr.length>10){
			  consNameObj.innerHTML = consNameName+consNameStr.substring(0,10)+'...';
		  }else{
			  consNameObj.innerHTML = consNameName+consNameStr;
		  }
		  $('#consName').attr("title",consNameStr);
	
		  var elecAddrObj = document.getElementById('address');
		  var elecAddrName = "用电地址: ";
		  var elecAddrNameStr = json[0].elecAddr;
		  if(elecAddrNameStr.length>10){
			  elecAddrObj.innerHTML = elecAddrName+elecAddrNameStr.substring(0,10)+'...';
		  }else{
			  elecAddrObj.innerHTML = elecAddrName+elecAddrNameStr;
		  }
		  $('#address').attr("title",elecAddrNameStr);
	  });
}
//新增/修改弹出窗口中的申请人信息对应的方法
function applyInfo(){
	 $.getJSON(webContextRoot + 'businessRecord/selectapplyInfo.action', 
	  function(json){
		 $('#userName').textbox('setValue',json[0].userName);
		 $('#mobile').textbox('setValue',json[0].mobile);
	  });
}
//新增中业务类型所对应的下拉框信息
function businessType_xz(){
	$('#businessType_xz').combobox({//业务类型
		url:webContextRoot +'pCode/queryCode.action?codeSortId=70064',
		valueField: 'codeValue',
		textField: 'codeName' ,
		onChange: function(newValue, oldValue){
			wnGrade = newValue;
			if(wnGrade==5){
				$("#warn").html("");
				$("#planStopDate_label").html("计划停用日期：");
				$("#planStopDate_input").html('<input id="planStopDate" class="easyui-datetimebox"  style="height:24px;width:150px" data-options="editable:false,panelWidth:150" required="true"/>');
				$("#planStopDate").datetimebox({});
				$("#planRecoverDate_label").html("计划恢复日期：");
				$("#planRecoverDate_input").html('<input id="planRecoverDate" class="easyui-datetimebox"  style="height:24px;width:150px" data-options="editable:false,panelWidth:150" required="true"/>');
				$("#planRecoverDate").datetimebox({});
				$("#applySuspendCap_label").html("申请暂停容量：");
				$("#applySuspendCap_input").html('<input id="applySuspendCap" class="easyui-textbox"  style="height:24px;width:150px" data-options="editable:true,panelWidth:150"/>');
//				$("#applySuspendCap").textbox({});
				
				$('#applySuspendCap').textbox({    
					required: true  ,
					validType: ['floatNumber','maxLength[10]' ]
				}); 
			}else if(wnGrade==6){
				
//				$("#warn").html("请在下月需量开始执行前5个工作日提交申请");
				$("#warn").html('<label id="warn_xz"style="background-color:yellow">请在下月需量开始执行前5个工作日提交申请</label>');
				$("#planStopDate_label").html("当前运行状态：");
				$("#planStopDate_input").html('<label id="JfType_xz"></label>');
				$("#planRecoverDate_label").html("计费方式变更成：");
				$("#planRecoverDate_input").html('<input id="applyChangeJfType" class="easyui-combobox"  style="height:24px;width:150px" data-options="editable:false,panelWidth:150" required="true"/>');
				//计费方式变更成 下拉框
				$('#applyChangeJfType').combobox({
//					width: 150,
					panelWidth: null,
					data: [{
						label: '需量计算',
						value: '0',
						"selected":true 
					},{
						label: '容量计算',
						value: '1'
					}],
					valueField: 'value',
					textField: 'label',
					editable: false
				});
				$("#applySuspendCap_label").html("需量值/容量值（kW）：");
				$("#applySuspendCap_input").html('<input id="applyNum" class="easyui-textbox"  style="height:24px;width:150px" data-options="editable:true,panelWidth:150"/>');
				$("#applyNum").textbox({
					required: true,    
				    validType: ['floatNumber','maxLength[12]']
				});
				
			}else{
				$("#warn").html("");
				$("#planStopDate_label").html("");
				$("#planStopDate_input").html('');
				$("#planRecoverDate_label").html("");
				$("#planRecoverDate_input").html('');
				$("#applySuspendCap_label").html("");
				$("#applySuspendCap_input").html('');
			}
		}
//	,onLoadSuccess: function(){
////			$('#businessType_xz').combobox('setValue', 1);
//		}
	});
	
 

}
/**查看详情**/
function bt_see(index,id){
	qingkong_ck();
	queryUserFiles_ck();
	
	var allData = $('#ywdb').datagrid('getRows');
	var rowData = null ;
	for(var i=0 ; i < allData.length ; i++){
		if(allData[i].id==id){
			rowData = allData[i];
			break;
		}
	}
	if(rowData.applyChangeJfType==1){
		JfType="按容量计费";
	}else{
		JfType="按需量计费";
	}
	$('#ywdbck').dialog('setTitle','业务代办-详情');
	$("#userName_ck").textbox("setValue",rowData.applyUserName);//申请人姓名
	$("#mobile_ck").textbox("setValue",rowData.applyUserTel);//申请人联系方式
	$("#businessType_ck").combobox("setValue",rowData.businessType);//业务类型
	$("#applyMemo_ck").textbox("setValue",rowData.applyMemo);//申请备注
	$("#planStopDate_ck").datetimebox("setValue",rowData.planStopDate);//计划停用日期
	$("#planRecoverDate_ck").datetimebox("setValue",rowData.planRecoverDate);//计划恢复日期
	$("#applySuspendCap_ck").textbox("setValue",rowData.applySuspendCap);//申请暂停容量
	$("#applyChangeJfType_ck").combobox("setValue",rowData.applyChangeJfType);//计费方式变更方式applyChangeJfType
	$("#JfType").html(JfType);//计费方式
	$("#applyNum_ck").textbox("setValue",rowData.applyNum);//需量值/容量值（kW）
	$('#ywdbck').dialog('open');
}

//查询客户信息
function queryUserFiles_ck(){
	//查询设置时间
	  $.getJSON(webContextRoot + 'pCode/queryuserFiles.action', {
		  'sfdConsModel.consId':consId
	  },
	  function(json){
		  var consNoObj = document.getElementById('consNo_ck');
		  var consNOName = "客户编号: ";
		  consNoObj.innerHTML = consNOName+json[0].consNo;
		  $('#consNo_ck').attr("title",json[0].consNo);
		  
		  var consNameObj = document.getElementById('consName_ck');
		  var consNameName = "客户名称: ";
		  var consNameStr = json[0].consName;
		  if(consNameStr.length>10){
			  //当客户名称超国10个字时，进行省略显示
			  consNameObj.innerHTML = consNameName+consNameStr.substring(0,10)+'...';
		  }else{
			  consNameObj.innerHTML = consNameName+consNameStr;
		  }
		  $('#consName_ck').attr("title",consNameStr);
	
		  var elecAddrObj = document.getElementById('address_ck');
		  var elecAddrName = "用电地址: ";
		  var elecAddrNameStr = json[0].elecAddr;
		  if(elecAddrNameStr.length>10){
			  elecAddrObj.innerHTML = elecAddrName+elecAddrNameStr.substring(0,10)+'...';
		  }else{
			  elecAddrObj.innerHTML = elecAddrName+elecAddrNameStr;
		  }
		  $('#address_ck').attr("title",elecAddrNameStr);
	  }
		);
}
//查看窗口的业务类型对应的下拉框数据
function businessType_ck(){
	$('#businessType_ck').combobox({//业务类型
		url:webContextRoot +'pCode/queryCode.action?codeSortId=70064',
		valueField: 'codeValue',
		textField: 'codeName' ,
		onChange: function(newValue, oldValue){
			wnGrade = newValue;
			if(wnGrade==5){
				$("#warn_ck").html("");
				$("#planStopDate_ck_label").html("计划停用日期：");
				$("#planStopDate_ck_input").html('<input id="planStopDate_ck" class="easyui-datetimebox"  style="height:24px;width:150px" data-options="editable:false,panelWidth:150" readonly="true"/>');
				$("#planStopDate_ck").datetimebox({});
				$("#planRecoverDate_ck_label").html("计划恢复日期：");
				$("#planRecoverDate_ck_input").html('<input id="planRecoverDate_ck" class="easyui-datetimebox"  style="height:24px;width:150px" data-options="editable:false,panelWidth:150" readonly="true"/>');
				$("#planRecoverDate_ck").datetimebox({});
				$("#applySuspendCap_ck_label").html("申请暂停容量：");
				$("#applySuspendCap_ck_input").html('<input id="applySuspendCap_ck" class="easyui-textbox"  style="height:24px;width:150px" data-options="editable:true,panelWidth:150" readonly="true"/>');
				$("#applySuspendCap_ck").textbox({});
			}else if(wnGrade==6){
//				$("#warn_ck").html("请在下月需量开始执行前5个工作日提交申请");
				$("#warn_ck").html('<label id="warn_xz"style="background-color:yellow">请在下月需量开始执行前5个工作日提交申请</label>');
				$("#planStopDate_ck_label").html("当前运行状态：");
				$("#planStopDate_ck_input").html('<label id="JfType"></label>');
//				$("#planRecoverDate_ck_label").html("计费方式变更成：");
//				$("#planRecoverDate_ck_input").html('<input id="applyChangeJfType_ck" class="easyui-combobox"  style="height:24px;width:150px" data-options="editable:false,panelWidth:150" readonly="true"/>');
				//计费方式变更成 下拉框
				$('#applyChangeJfType_ck').combobox({
//					width: 150,
					panelWidth: null,
					data: [{
						label: '需量计算',
						value: '0',
						"selected":true 
					},{
						label: '容量计算',
						value: '1'
					}],
					valueField: 'value',
					textField: 'label',
					editable: false
				});
				$("#applySuspendCap_ck_label").html("需量值/容量值（kW）：");
				$("#applySuspendCap_ck_input").html('<input id="applyNum_ck" class="easyui-textbox"  style="height:24px;width:150px" data-options="editable:true,panelWidth:150" readonly="true"/>');
				$("#applyNum_ck").textbox({});
			}else{
				$("#warn_ck").html("");
				$("#planStopDate_ck_label").html("");
				$("#planStopDate_ck_input").html('');
				$("#planRecoverDate_ck_label").html("");
				$("#planRecoverDate_ck_input").html('');
				$("#applySuspendCap_ck_label").html("");
				$("#applySuspendCap_ck_input").html('');
			}
		}
//	,onLoadSuccess: function(){
////			$('#businessType_xz').combobox('setValue', 1);
//		}
	});
}

//查看窗口的清空数据的方法
function qingkong_ck(){
	$("#userName_ck").textbox('setValue','');
	$('#mobile_ck').textbox('setValue','');
	$('#businessType_ck').combobox('setValue','');
	$("#planStopDate_ck").datetimebox('setValue','');
	$("#planRecoverDate_ck").datetimebox('setValue','');
	$('#applySuspendCap_ck').textbox('setValue','');
	$("#applyChangeJfType_ck").combobox('setValue','');
	$('#applyMemo_ck').textbox('setValue','');
	$('#applyNum_ck').textbox('setValue','');
	
}

/**
 * 判断是否为电话号码的方法
 * @param value
 * @returns
 */
function isTelephone(value){
//	var reg=/^((([0-9])|([1-9][0-9]+))(\.([0-9]+))?)$/;
	var reg=/^1[0-9]{10}$/;//验证电话号码
	return reg.test($.trim(value));
}
/**
 * 判断是否为浮点类型
 * @param value
 * @returns
 */
function isFloat(value){
	var reg=/^((([0-9])|([1-9][0-9]+))(\.([0-9]+))?)$/;
	return reg.test($.trim(value));
}
/**
 * 判断是否为浮点数数字且最多保留4位小数
 * @param value
 * @returns
 */
function isNumber(value){
//	var reg=/^([A-Za-z0-9]|[\u2E80-\u9FFF])*$/;//判断是否为汉字、字母或数字
	
//	var reg=/^(([1-9]{0,16}\d*)|\d)(\.\d{1,4})?$/;
	var reg=/^((([0-9])|([1-9][0-9]+))(\.([0-9]{0,4}))?)$/;
	
	return reg.test($.trim(value));
}
/**
 * 判断是否为数字或汉字
 * @param value
 * @returns
 */
function isCharacter(value){
//	var reg=/^([A-Za-z0-9]|[\u2E80-\u9FFF])*$/;//判断是否为汉字、字母或数字
	var reg=/^([A-Za-z]|[\u2E80-\u9FFF])*$/;//判断是否为汉字、字母
	return reg.test($.trim(value));
}


