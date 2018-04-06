/**
 * 业务代办
 * @author wxt
 * @since 2017-05-02 
 */
JfType=null;//新增/修改窗口中 变更（容量/需量）类型下所用变量
var num=0;
//当前页数
var pageNo = 1;
var consId=null;
$(function(){	
	$('#ywdb').datagrid({    
		url: webContextRoot +"businessRecord/selectYwdbInfo.action?businessRecordModel.delFlag=1&&businessRecordModel.businessStep=1",
		title:"业务代办",
		loadMsg:'正在加载，请稍等……',//加载时显示提示
		rownumbers:true,//表格前是否显示序号
		fit:true,
		border:false,
		fitColumns:true,
		striped: true,
		singleSelect: true,
		columns:[[
       		{field:'consName',title:'客户名称',width:60,
		    	formatter: function(value,row,index){
					if(value.length>10)
					value = value.substring(0,10)+'...';
					return HTMLEncode(value);
				}
		    },
       		{field:'consNo',title:'户号',width:60,
		    	formatter: function(value,row,index){
					if(value.length>10)
					value = value.substring(0,15)+'...';
					return HTMLEncode(value);
				}
       		},
	        {field:'businessName',title:'业务类型',width:60},
       		{field:'applyUserName',title:'申请人',width:60},
       		{field:'applyUserTel',title:'联系电话',width:60},
       		{field:'applyDate',title:'申请日期',width:60},
       		{field : 'remark',title : '详情',align : 'center',width:60,
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
	
	 //加载查询条件业务类型下拉框数据
	$('#businessType').combobox({//业务类型
		url:webContextRoot +'businessRecord/queryCode.action?codeSortId=70064',
		panelWidth: null,
		valueField: 'codeValue',
		textField: 'codeName' ,
		onLoadSuccess: function(){
//			$('#businessType').combobox('setValue', 1);
		}
	});
	businessType_ck();
});
/**查看详情**/
function bt_see(index,id){
	qingkong_ck();//清空查看窗口的数据
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
	
	consId=rowData.consId;//获取选中数据的consId，用于查询客户信息
	queryUserFiles_ck();//加载查看窗口下显示的客户相关信息
	$('#ywdbck').dialog('open');
}

//根据条件查询数据的查询按钮所对应的查询方法
function bt_search(){
	var consName= $('#consName').textbox("getValue");
	var businessType =$('#businessType').combobox("getValue");
	$('#ywdb').datagrid('reload',{
		'businessRecordModel.consName':consName,//关键字查询
		'businessRecordModel.businessType':businessType,//业务类型
	});
	
}

//查询客户信息
function queryUserFiles_ck(){
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
//查看窗口下对应的业务类型方法
function businessType_ck(){
	$('#businessType_ck').combobox({//业务类型
		url:webContextRoot +'businessRecord/queryCode.action?codeSortId=70064',
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
				$("#warn_ck").html("请在下月需量开始执行前5个工作日提交申请");
				$("#planStopDate_ck_label").html("当前运行状态：");
				$("#planStopDate_ck_input").html('<label id="JfType"></label>');
//				$("#planRecoverDate_ck_label").html("计费方式变更成：");
//				$("#planRecoverDate_ck_input").html('<input id="applyChangeJfType_ck" class="easyui-combobox"  style="height:24px;width:150px" data-options="editable:false,panelWidth:150" readonly="true"/>');
				//计费方式变更成 下拉框
				$('#applyChangeJfType_ck').combobox({
//					width: 150,
					panelWidth: null,
					data: [{
						label: '容量计算',
						value: '0',
						"selected":true 
					},{
						label: '需量计算',
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
//查看详情是对应的清空数据的方法
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



