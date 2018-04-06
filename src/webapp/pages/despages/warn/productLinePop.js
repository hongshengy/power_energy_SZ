/**
 * 生产线管理弹出
 * @author 王梓璇
 * @since 2017-05-09
 */

var  newTitle = '';//新闻标题
var newType = '';//新闻类型
var	pageCountTotal = 0;
var indexCount = 1;
var pageSizeCount = 10;
function userResize(widths,heights){
	$("#userChart").width($("#userChart").parent().width());
	$("#userChart").height($("#userChart").parent().height());
	if(!!myChart){
		myChart.resize({
		    width: $("#userChart").parent().width(),
		    height: $("#userChart").parent().height()
		});
	}
}

$(function(){
	queryGjxxpzData();//查询表格数据
});

/**
 * 列表数据
 * @param {} corporationId
 */
  function queryGjxxpzData(){
	  var gridCommon = [[
            {field:'devTypeName',title:'设备类型',width: 150,align:'center',sortable:true},
            {field:'subsName',title:'建筑名称',width: 100,align:'center',sortable:true},
            {field:'devName',title:'设备名称',width: 100,align:'center',sortable:true}
 		]];
	
	$('#gjxxpz-datagrid').datagrid({// 表格
//		title:consName+":"+lineName+" 设备详情",
//		halign:'center',
		nowrap : true,// 设置为true，当数据长度超出列宽时将会自动截取。
		striped : true,// 设置为true将交替显示行背景。
		border:false,
		width:'100%',
	    height:'100%',
		pagination : true,// 设置true将在数据表格底部显示分页工具栏。
		fitColumns : true,// 自动适应宽度
		singleSelect : true,// 设置为true将只允许选择一行。
		rownumbers : true,// 设置为true将显示行数。
		pageNumber:1,//在设置分页属性的时候初始化页码。
		pageSize:20,//在设置分页属性的时候初始化页面大小。
		url:webContextRoot +'productionLine/queryShebei.action',
		queryParams:{
			'productLineDevModel.enegryCellId': lineId,
			
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
