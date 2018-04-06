/**
 * 录入信息
 * @author wxt
 * @since 2017-05-02
 */
var num=0;
//当前页数
var pageNo = 1;
//var ajson= new Array;
$(function(){
	$('#hdbd').datagrid({  
		title:'活动保电',
		url: webContextRoot +"hdbdRecord/selecthdbdInfo.action?hdbdRecordModel.delFlag=1&&hdbdRecordModel.consId="+consId,
		loadMsg:'正在加载，请稍等……',//加载时显示提示
		rownumbers:true,//表格前是否显示序号
		fit:true,
		border:false,
		fitColumns:true,
		striped: true,
		singleSelect: true,
		columns:[[
		   /* {field:'ck',checkbox:true},*/
	        {field:'subject',title:'活动主题',width:60,
	        	formatter: function(value,row,index){
					if(value.length>10)
					value = value.substring(0,10)+'...';
					return HTMLEncode(value);
				}
	        },
       		{field:'applyMemo',title:'申请说明',width:60,
	        	formatter: function(value,row,index){
					if(value.length>10)
					value = value.substring(0,10)+'...';
					return HTMLEncode(value);
				}
       		},
       		{field:'hdStartTime',title:'活动开始时间',width:60},
       		{field:'hdEndTime',title:'活动结束时间',width:60},
       		{field:'contactWay',title:'联系方式',width:60},
       		{field:'step',title:'是否提交',width:60,align:'center',
				formatter: function(value,row,index){
					// 0未提交，1已提交
					if(value == 0){
						return '否';
					}else if(value == 1){
						return '是';
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
			var rows = $('#hdbd').datagrid("getRows");
			if(rows.length>0){
				$('#hdbd').datagrid("selectRow",0);
			}
		}
	});  	
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
		}
		
	});
//	$('#hdbd').datagrid('loadData',ajson);    
});
//增加
function bt_add(){
	qingkong();
	$('#bt_add_commit').show();//新增窗口中的新增提交按钮的显示
	$('#bt_update_commit').hide();//新增窗口中的更新按钮的隐藏
	$('#hdbdxz').dialog('setTitle','新增');
	$('#hdbdxz').dialog('open');	
}
//修改
function bt_modify(){
	qingkong();
	$('#bt_update_commit').show();//更新按钮的显示
	$('#bt_add_commit').hide();//增加按钮的隐藏
	$('#hdbdxz').dialog('setTitle','修改');
	var idlist = $('#hdbd').datagrid('getSelected');
		if(idlist==null){
		$.messager.alert('提示','请选择一条记录进行修改!','info');   
		}else if(idlist.step==1){
			$.messager.alert('提示','本条记录已被提交不能修改!','info');  
		}else{
			$("#hdStartTime").datetimebox('setValue',idlist.hdStartTime);//活动开始时间
			$("#hdEndTime").datetimebox('setValue',idlist.hdEndTime);//活动结束时间
			$("#contactWay").textbox('setValue',idlist.contactWay);//联系方式
			$("#subject").textbox('setValue',idlist.subject);//活动主题
			$("#applyMemo").textbox('setValue',idlist.applyMemo);//申请说明
			$("#id").textbox('setValue',idlist.id);//id
		
			$('#hdbdxz').dialog('open');
		}
}
//删除
function bt_delete(){
	var idlist = $('#hdbd').datagrid('getSelected');
	if(idlist==null){
		$.messager.alert('提示','请选择一条记录进行删除!','info');   
		}if(idlist.step==1){
			$.messager.alert('提示','本条记录已被提交不能删除!','info');  
		}else{
			$.messager.confirm('确认','您确认想要删除记录吗？',function(r){    
			    if (r){    
			    	$.ajax({			
			    		url:webContextRoot+'hdbdRecord/DelhdbdInfo.action', 
			    		data:{
			    			
			    			'hdbdRecordModel.delFlag':0,
			    			'hdbdRecordModel.step':0,
			    			'hdbdRecordModel.id': idlist.id
			    			
			    		},
			    		dataType:'json',
			    		type:'post',
			    		success:function(result){
			    			if(result.flag=='success'){
			    				$.messager.alert('提示','删除成功!','info');  
								$('#hdbd').datagrid('reload');
			    			}else{
			    				$.messager.alert('提示','删除失败!','info');  
			    			}
			    		}
			    	}); 
			    }
			});
		}
}

//新增的提交
function bt_add_commit(){
	
//	$('#hdbdxz').window('close');
	var delFlag=1;
	
	var hdStartTime = $("#hdStartTime").datetimebox("getValue");//活动开始时间
	var hdEndTime = $("#hdEndTime").datetimebox("getValue");//活动结束时间
	var contactWay = $("#contactWay").textbox("getValue");//联系方式
	var subject = $("#subject").textbox("getValue");//活动主题
	var applyMemo = $("#applyMemo").textbox("getValue");//申请说明
//	var id = $("#id").textbox("getValue");
	
	if(hdStartTime.length==0){
		$.messager.alert('提示','活动开始时间不能为空!','info');    
		return;
	}
	if(hdEndTime.length==0){
		$.messager.alert('提示','活动结束时间不能为空!','info');    
		return;
	}
	if(hdStartTime > hdEndTime){
		$.messager.alert('提示', "活动开始时间不能大于活动结束时间！", 'info');
		return;
	}  
	if(contactWay.length==0){
		$.messager.alert('提示','联系方式不能为空!','info');    
		return;
	}
	if(!isTelephone(contactWay)){
		$.messager.alert('确认','联系方式必须是数字并且11位!','info');    
		return;
	}
	if(subject.length==0){
		$.messager.alert('提示','活动主题不能为空!','info');    
		return;
	}
	if(applyMemo.length==0){
		$.messager.alert('提示','申请说明不能为空!','info');    
		return;
	}
	if(contactWay.length!=11){
		$.messager.alert('提示','您所输入的联系方式格式不对请重新输入！','info');    
		return;
	}
	if(subject.length>80){
		$.messager.alert('提示','请输入80字以内的活动主题!','info');    
		return;
	}
	if(applyMemo.length>160){
		$.messager.alert('提示','请输入160字以内的申请说明!','info');    
		return;
	}
	
	$.ajax({			
		url:webContextRoot+'hdbdRecord/savehdbdInfo.action', 
		data:{
			'hdbdRecordModel.hdStartTime': hdStartTime,
			'hdbdRecordModel.hdEndTime': hdEndTime,
			'hdbdRecordModel.contactWay': contactWay,
			'hdbdRecordModel.subject': subject,
			'hdbdRecordModel.applyMemo': applyMemo,
			'hdbdRecordModel.consId': consId,
			'hdbdRecordModel.delFlag': delFlag
//			'hdbdRecordModel.id': id,
		},
		dataType:'json',
		type:'post',
		success:function(result){
			if(result.flag=='success'){
				$.messager.alert('提示','添加成功!','info');  
				$('#hdbdxz').window('close');
				$('#hdbd').datagrid('reload');
			}else{
				$.messager.alert('提示','添加失败!','info');  
			}
		}
	});
}
//新增的提交
function bt_update_commit(){
	
//	$('#hdbdxz').window('close');
	var delFlag=1;
	
	var hdStartTime = $("#hdStartTime").datetimebox("getValue");//活动开始时间
	var hdEndTime = $("#hdEndTime").datetimebox("getValue");//活动结束时间
	var contactWay = $("#contactWay").textbox("getValue");//联系方式
	var subject = $("#subject").textbox("getValue");//活动主题
	var applyMemo = $("#applyMemo").textbox("getValue");//申请说明
	var id = $("#id").textbox("getValue");
	
	if(hdStartTime.length==0){
		$.messager.alert('提示','活动开始时间不能为空!','info');    
		return;
	}
	if(hdEndTime.length==0){
		$.messager.alert('提示','活动结束时间不能为空!','info');    
		return;
	}
	if(hdStartTime > hdEndTime){
		$.messager.alert('提示', "开始日期不能大于结束日期！", 'info');
		return;
	} 
	if(contactWay.length==0){
		$.messager.alert('提示','联系方式不能为空!','info');    
		return;
	}
	if(!isTelephone(contactWay)){
		$.messager.alert('确认','联系方式必须是数字并且11位!','info');    
		return;
	}
	if(subject.length==0){
		$.messager.alert('提示','活动主题不能为空!','info');    
		return;
	}
	if(applyMemo.length==0){
		$.messager.alert('提示','申请说明不能为空!','info');    
		return;
	}
	if(contactWay.length!=11){
		$.messager.alert('提示','您所输入的联系方式格式不对请重新输入！','info');    
		return;
	}
	if(subject.length>80){
		$.messager.alert('提示','请输入80字以内的活动主题!','info');    
		return;
	}
	if(applyMemo.length>160){
		$.messager.alert('提示','请输入160字以内的申请说明!','info');    
		return;
	}
	
	$.ajax({			
		url:webContextRoot+'hdbdRecord/savehdbdInfo.action', 
		data:{
			'hdbdRecordModel.hdStartTime': hdStartTime,
			'hdbdRecordModel.hdEndTime': hdEndTime,
			'hdbdRecordModel.contactWay': contactWay,
			'hdbdRecordModel.subject': subject,
			'hdbdRecordModel.applyMemo': applyMemo,
			'hdbdRecordModel.consId': consId,
			'hdbdRecordModel.delFlag': delFlag,
			'hdbdRecordModel.id': id,
		},
		dataType:'json',
		type:'post',
		success:function(result){
			if(result.flag=='success'){
				$.messager.alert('提示','修改成功!','info');  
				$('#hdbdxz').window('close');
				$('#hdbd').datagrid('reload');
			}else{
				$.messager.alert('提示','修改失败!','info');  
			}
		}
	});
}

/**
 * 取消 按钮
 */
function bt_add_cancel(){
	$('#hdbdxz').window('close');
//	init();
}

//增加/修改窗口清空数据的方法
function qingkong(){
	$("#hdStartTime").datetimebox('setValue','');
	$('#hdEndTime').datetimebox('setValue','');
	$('#contactWay').textbox('setValue','');
	$('#subject').textbox('setValue','');
	$('#applyMemo').textbox('setValue','');
}

/**
 * 查询
 */
function bt_search(){
	
	/*var pl_name =$.trim($('#pl_name').textbox('getValue'));*/
	var startDate =  $('#startDate').val();
	var endDate =  $('#endDate').val();
	/*var startDate =$('#startDate').datetimebox('getValue');
	var endDate =$('#endDate').datetimebox('getValue');*/
	if(startDate!='' && endDate!=''){
		if(startDate > endDate){
			$.messager.alert('提示', "开始日期不能大于结束日期！", 'info');
			return;
		} 
	}
	$('#hdbd').datagrid('reload',{
		   'hdbdRecordModel.startDate':startDate,//法规名称
		   'hdbdRecordModel.endDate':endDate,//法规名称
	});
}

//对选择的其中一条记录进行提交
function bt_commit(){
	var idlist = $('#hdbd').datagrid('getSelected');
	if(idlist==null){
		$.messager.alert('提示','请选择一条记录进行提交!','info');   
		}if(idlist.step==1){
			$.messager.alert('提示','该条记录已被提交!','info');   
		}else{
			$.messager.confirm('确认','您确认想要提交记录吗？',function(r){    
			   if (r){    
		    	$.ajax({			
		    		url:webContextRoot+'hdbdRecord/submithdbdInfo.action', 
		    		data:{
		    			'hdbdRecordModel.step':1,
		    			'hdbdRecordModel.id': idlist.id
		    		},
		    		dataType:'json',
		    		type:'post',
		    		success:function(result){
		    			if(result.flag=='success'){
				    	$.messager.alert('提示','提交成功!','info');  
						$('#hdbd').datagrid('reload');
		                }else{
				         $.messager.alert('提示','提交失败!','info');  
		            	}
		    		}
		    	}); 
		    }
		});
	}
}

/**查看活动保电信息**/
function bt_see(index,id){
	qingkong();
//	var nl_type=1;
	
	var allData = $('#hdbd').datagrid('getRows');
	var rowData = null ;
	for(var i=0 ; i < allData.length ; i++){
		if(allData[i].id==id){
			rowData = allData[i];
			break;
		}
	}
	$("#hdStartTime_ck").textbox('setValue',rowData.hdStartTime);//活动开始时间
	$("#hdEndTime_ck").textbox('setValue',rowData.hdEndTime);//活动结束时间
	$("#contactWay_ck").textbox('setValue',rowData.contactWay);//联系方式
	$("#subject_ck").textbox('setValue',rowData.subject);//活动主题
	$("#applyMemo_ck").textbox('setValue',rowData.applyMemo);//申请说明
	/*$("#id_ck").textbox('setValue',rowData.id);//id
*/
	$('#hdbdck').dialog('open');
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
