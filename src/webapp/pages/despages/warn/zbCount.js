/**
 * 主变信息（GIS弹窗）
 * @author 王梓璇
 * @since 2017-03-04
 */

var voltLevel=null;//电压等级
var runStatus=null;//运行状态呀
var bdzName=null;//变电站名称
var userName=null;//所属企业
var tranNo = null;//主变编码
var tranName = null;//主变名称
var	pageCountTotal = 0;
var indexCount = 1;
var pageSizeCount = 10;
var firstFlag=true;
//function userResize(widths,heights){
//	$("#userChart").width($("#userChart").parent().width());
//	$("#userChart").height($("#userChart").parent().height());
//	if(!!myChart){
//		myChart.resize({
//		    width: $("#userChart").parent().width(),
//		    height: $("#userChart").parent().height()
//		});
//	}
//}
function updateTime(){
	queryGjxxpzData();
}

$(function(){
	//获取所属分页总数量值
	$.getJSON(webContextRoot + 'giszl/querytotalPlateCap.action', {},
		function(json){
				var totalPlateCap = json.totalSpalteCap; //获取总数量
				$('#bdzCount-datagrid').datagrid("getPanel").panel("setTitle","主变总容量（投运）:"+totalPlateCap+"kVA");
//				$('#bdzCount-datagrid').datagrid('reload',{
//					$('#bdzCount-datagrid').datagrid("getPanel").panel("setTitle","wzx");
//				});
//				alert(totalPlateCap)	;	
	}
	);
	

	queryGjxxpzData();
   //主变名称
	$('#zbName').textbox({ 
	    iconAlign:'left',
	    onChange:function(newValue, oldValue){
	    	
	    	tranName = newValue;
		} ,
	});
	//主变编码
	$('#zbNoName').textbox({    
	    iconAlign:'left',
	    onChange:function(newValue, oldValue){
	    	tranNo = newValue;
		} 
	});
	  //所属用户
	$('#userName').textbox({ 
	    iconAlign:'left',
	    onChange:function(newValue, oldValue){
	    	userName = newValue;
		} ,
	});
	//所属变电站
	$('#consName').textbox({    
	    iconAlign:'left',
	    onChange:function(newValue, oldValue){
	    	bdzName = newValue;
		} 
	});
 
    //电压等级
	$('#dydj').combobox({ 
		url:webContextRoot +'pCode/queryCode.action?codeSortId=70011',
		valueField: 'codeValue',
		textField: 'codeName' ,
		editable:'false' ,
		onChange: function(newValue, oldValue){
			voltLevel = newValue;
		},onLoadSuccess: function(){
			$('#gjpxdj').combobox('setValue', '');
		}
	});
	   //运行状态
	$('#yxzt').combobox({ 
		url:webContextRoot +'pCode/queryCode.action?codeSortId=70033',
		valueField: 'codeValue',
		textField: 'codeName' ,
		editable:'false' ,
		onChange: function(newValue, oldValue){
			runStatus = newValue;
		},onLoadSuccess: function(){
			$('#yxzt').combobox('setValue', '1');
		}
	});
	
	

	
	
	 
});

/**
 * 列表数据
 * @param {} corporationId
 */
  function queryGjxxpzData(){
	  if(firstFlag){
		  runStatus = 1;
		  firstFlag = false;
	  }
//		var pager = $('#bdzCount-datagrid').datagrid("getPager");
//		var options = pager.pagination('options');
//		alert(options);
	  var gridCommon = [[
            {field:'tranName',title:'主变名称',width: 150,align:'center',sortable:true},
            {field:'tranNo',title:'主变编号',width: 100,align:'center',sortable:true},
            {field:'runStatusName',title:'运行状态',width: 100,align:'center',sortable:true},
            {field:'plateCap',title:'铭牌容量',width: 100, align:'center'},
            {field:'voltLevelName',title:'电压等级',width: 100, align:'center'},
	 		{field:'subsName',title:'所属变电站',width: 300,align:'left'},
	 		{field:'consName',title:'所属客户',width: 200,align:'center'},
 		]];
	
	$('#bdzCount-datagrid').datagrid({// 表格
		title:'详细信息',
		nowrap : false,// 设置为true，当数据长度超出列宽时将会自动截取。
		striped : true,// 设置为true将交替显示行背景。
		border:false,
		width:'100%',
	    height:'100%',
		pagination : true,// 设置true将在数据表格底部显示分页工具栏。
		fitColumns : true,// 自动适应宽度
		singleSelect : true,// 设置为true将只允许选择一行。
		rownumbers : true,// 设置为true将显示行数。
		pageNumber:1,//在设置分页属性的时候初始化页码。
		pageSize:10,//在设置分页属性的时候初始化页面大小。
		url:webContextRoot +'giszl/queryZbDetail.action',
		queryParams:{
			'bdzCountModel.consName': userName,
			'bdzCountModel.subsName': bdzName,
			'bdzCountModel.tranNo': tranNo,
			'bdzCountModel.tranName':tranName,
			'bdzCountModel.tranVolt': voltLevel,
			'bdzCountModel.runStatus':runStatus
			
		},
		loadMsg : "正在努力的读取数据中...",// 提示信息
		columns : gridCommon,//字段
		loadFilter: function(data){
			if (data.sMap){
				return data.sMap;
			} else {
				return data;
			}
		}

	});
	
}


