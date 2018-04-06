/**
 * 用能单元总览
 */
// 用能单元类型
var energyCellType = '';
// 查询名称
var energyCellName = '';

/**
 * 加载客户数、用能单元数
 */
function loadCount(){
	$.post(webContextRoot +'productionLine/queryConsCount.action',{//链接地址
	},
	function(data){
		if(data.length > 0){
			// 获取object对象
			var obj = data[0];
			// 客户数
			if(obj[888].length > 0){
				$("#consNumber").html(obj[888]);
			} else {
				$("#consLabel").hide();
			}
			// 用能单元数
			if(obj[999].length > 0){
				$("#energyNumber").html(obj[999]);
			} else {
				$("#energyLabel").hide();
			}
			// 生产线
			if(obj[1].length > 0){
				$("#productNumber").html(obj[1]);
			} else {
				$("#productLabel").hide();
			}
			// 空调
			if(obj[2].length > 0){
				$("#condNumber").html(obj[2]);
			} else {
				$("#condLabel").hide();
			}
			// 电机
			if(obj[3].length > 0){
				$("#elecNumber").html(obj[3]);
			} else {
				$("#elecLabel").hide();
			}
			// 锅炉
			if(obj[4].length > 0){
				$("#boilerNumber").html(obj[4]);
			} else {
				$("#boilerLabel").hide();
			}
		} else {
			$("#consLabel").hide();
			$("#energyLabel").hide();
			$("#productLabel").hide();
			$("#condLabel").hide();
			$("#elecLabel").hide();
			$("#boilerLabel").hide();
		}
	},'json');
}

/**
 * 加载表格 
 */
function loadData(){
	// 搜索内容
	energyCellName = $("#search").val().replace(/^\s+|\s+$/g, "");
	// 表格数据
	var  gridCommon = [[
//     	 		{field:'energyCellName',title:'用能单元名称',width: 100,align:'left'},
     	 		{field:'energyCellName',title:'用能单元名称',width: 100,align:'left',formatter: function(v,row,index){ //超链接
     	 			return '<a href="#" style="color:blue;margin-left:5px" onclick="queryNewsDes('
      			        +"'"+row.enegryCellId+"','"+escape(row.energyCellName)+"','"+row.consName+"'"
      					+ ')'
      	 				 +'">'
      	 				+ HTMLEncode(v)
      	 				+ '</a>';
       		    }},
     	 		{field:'energyCellType',title:'用能单元类型',width: 100,align:'left'},
     	 		{field:'status',title:'运行状态',width: 100,align:'left'},
     	 		{field:'consNo',title:'客户编号',width: 100,align:'left'},
     	 		{field:'consName',title:'客户名称',width: 100,align:'left'},
     	 		{field:'memo',title:'描述',width: 100,align:'left'}
      		]];
  
	$('#productData').datagrid({// 表格
		nowrap : false,			// 设置为true，当数据长度超出列宽时将会自动截取。
		striped : true,			// 设置为true将交替显示行背景。
		border : false,
		fit : true,
		pagination : true,		// 设置true将在数据表格底部显示分页工具栏。
		fitColumns : true,		// 自动适应宽度
		singleSelect : true,	// 设置为true将只允许选择一行。
		rownumbers : true,		// 设置为true将显示行数。
		pageNumber : 1,			// 在设置分页属性的时候初始化页码。
		pageSize : 20,			// 在设置分页属性的时候初始化页面大小。
		url:webContextRoot +'productionLine/queryProductLinePandectByTable.action',
		queryParams:{
			'productLineModel.energyCellName': energyCellName,
			'productLineModel.energyCellType': energyCellType
		},
		onLoadSuccess : function() {// 加载数据之后
			$('#productData').datagrid('selectRow', 0); // 选择第一行
		},
		loadMsg : "正在努力的读取数据中...",// 提示信息
		columns : gridCommon,
		loadFilter: function(data){// 分页数据
			if (data.sMap){
				return data.sMap;
			} else {
				return data;
			}
		}
	});
}

/**
 * 查询框 
 */
function initSearch(){
    $('#search').textbox({
        prompt: '输入快速检索的信息',
        width: 500,
        height: 36,
        iconWidth: 22,
        icons: [{
            iconCls:'icon-search',
            handler: function(e){
            	reloadData();
            }
        }]
    });
    // 鼠标回车事件
    $('#search').textbox('textbox').keyup(function(event){
    	if(event.keyCode==13){
    		reloadData();
		}
    });
}

/**
 * 重新加载 
 */
function reloadData(energyCellType){
	// 搜索内容
	energyCellName = $("#search").val().replace(/^\s+|\s+$/g, "");
	// 重新加载表格
	$('#productData').datagrid('load',{
		'productLineModel.energyCellName': energyCellName,
		'productLineModel.energyCellType': energyCellType
	});
}

// 点击新闻标题查看新闻具体信息
function queryNewsDes(lineId,lineName,consName){
	var content = "<iframe src='"+webContextRoot+"pages/despages/warn/productLinePop.jsp?lineId="+lineId+"&lineName="+
	              unescape(lineName)+"&consName="+ consName+"' width='100%' height='99%' frameborder='0' scrolling='no'/>";
	var boarddiv = "<div id='msgwindow' title='详情'/>";
	$(document.body).append(boarddiv);
	var win = $("#msgwindow").dialog({
		content : content,
		width : document.body.clientWidth-260,
		height : document.body.clientHeight-160,
		maximizable:true,
		closable:true,
		modal : 'shadow',
		title : consName+":"+unescape(lineName)+" 设备详情",
	});
	win.dialog('open');
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

$(function(){
	// 查询框初始化
    initSearch();
	// 加载客户数
	loadCount();
	// 加载表格
	loadData();
});
