/**
 * 录入信息
 * @author wxt
 * @since 2017-05-02
 */

var num=0;
//当前页数
var pageNo = 1;

$(function(){
	$('#hdbd').datagrid({  
		title:'活动保电',
		url: webContextRoot +"hdbdRecord/selecthdbdInfo.action?hdbdRecordModel.delFlag=1&&hdbdRecordModel.step=1",
		loadMsg:'正在加载，请稍等……',//加载时显示提示
		rownumbers:true,//表格前是否显示序号
		fit:true,
		fitColumns:true,
		border:false,
		striped: true,
		singleSelect: true,
		columns:[[
	        {field:'consNo',title:'客户编号',width:60},
	        {field:'consName',title:'客户名称',width:60,
	        	formatter: function(value,row,index){
					if(value.length>10)
					value = value.substring(0,10)+'...';
					return HTMLEncode(value);
				}
	        },
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
});

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
	
//	var consName =$.trim($('#consName').textbox('getValue'));
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
//		   'hdbdRecordModel.consName':consName,//客户名称
	});
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
	






