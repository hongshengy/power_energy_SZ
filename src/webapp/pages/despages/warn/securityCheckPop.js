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
	
	// 宜兴登录
	if(areaNo == '102'){
		queryGjxxpzData();
		$("#showOther").hide();
		$("#showYiXing").show();
		$.getJSON(webContextRoot +'aqjc/queryItemByTourId.action', 
				 {
				   'sfTourModel.tourId' : tourId //检查明细 ID
				 },
				 function(data){//回调
					 $('#exceptContents').textbox('setValue',data[0].exceptContents);
				 },"json");//返回格式
	}else{
		$("#showYiXing").hide();
		$("#showOther").show();
		queryGjxxpzDataByOther();//查询表格数据
	}
	
	//加载图片的方法
//	scriptManager.loadScirpt("lightBox",jsPath+"/lightbox/dist/js/lightbox.min.js", true);
	
});

/**
 * 列表数据
 * @param {} corporationId
 */
  function queryGjxxpzData(){
	  var gridCommon = [[
		     			{field:'checkType',title:'检查类型',width: 100,align:'center',sortable:true},
		     			{field:'proCotent',title:'检查项',width: 100,align:'center',sortable:true},
		     			{field:'tourCotent',title:'巡视内容',width: 100,align:'center',sortable:true},
		     			{field:'tourResult',title:'巡视结果',width: 150,align:'center',sortable:true,
		     				styler:function(v,row,index){
							if(v=="有缺陷"){
								return 'color:red';
							}
						}}
		      		]];
	
	$('#gjxxpz-datagrid').datagrid({// 表格
//		title:"详情",
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
		view: detailview,//定义DataGrid的视图
		pageNumber:1,//在设置分页属性的时候初始化页码。
		pageSize:20,//在设置分页属性的时候初始化页面大小。
		url:webContextRoot +'aqjc/querysafeResult.action',  
		queryParams:{
			'sfTourResultModel.tourId': tourId,
			'sfTourResultModel.areaNo': areaNo
		},
		loadMsg : "正在努力的读取数据中...",// 提示信息
		columns : gridCommon,//字段
		loadFilter: function(data){
			if (data.sMap){
				return data.sMap;
			} else {
				return data;
			}
		},detailFormatter: function(rowIndex, rowData){
			var except = '';
			if(rowData.except != null && rowData.except != ''){
				except = rowData.except;
			}
			var imgStr = '';
			var imgUrl = [];
			if(rowData.scenePic != null && rowData.scenePic != ''){
				imgUrl = rowData.scenePic.split(",");
			}
			
			for(var i=0;i<imgUrl.length;i++){
				$.ajax({
					async : false,
					url : webContextRoot + 'pCode/judgeFileExist.action',
					data : {downloadFilePath :imgUrl[i]},
					dataType : "json",
					success : function(data) {
						if(data.FLAG == "1"){
							imgStr += '<span class="tools-labelgroup"><a id="href'+i+'" href="'+webContextRoot+imgUrl[i]
							+'" data-lightbox="example-set" class="lightImage"><img src="' + webContextRoot+imgUrl[i]+'" style="height:50px;" class="thumbnailImage" style="display:none;"></a></span>';
						}else if(data.FLAG == "2"){
							imgStr += "<span class=\"tools-labelgroup\"><a id=\"href"+i+"\" onclick=\"$.messager.alert('提示', '图片不存在！', 'warning');\" href=\"#\" class=\"lightImage\"><img src=\""
							+webContextRoot+"/pages/despages/common/images/imageNotFound.png\" onClick=\"return false;\" style=\"height:50px;\" class=\"thumbnailImage\" style=\"display:none;\"></a></span>";
						}
					}
				});
//				imgStr += '<span class="tools-labelgroup"><a id="href'+i+'" href="'+webContextRoot+imgUrl[i]
//				+'" data-lightbox="example-set" class="lightImage"><img src="' + webContextRoot+imgUrl[i]+'" style="height:50px;" class="thumbnailImage" style="display:none;"></a></span>';
			}
			return '<div class="toolsbar-panel" >' +
			'<div class="tbRow">'+
			'<span class="tools-labelgroup">'+
			'<p>现场描述:'+except+'</p>'+
			'</span>'+
			'</div>' +
			'<div class="tbRow">'+
			'<span class="tools-labelgroup">'+
			'<p>现场图片:</p>'+
			'</span>'+
			imgStr+
			'</div>' +
			'</div>';
			
        },onExpandRow:function(rowIndex, rowData){//点击+号展现
			
       }

	});
	
}

  /**
   * 其他系统 
   */
  function queryGjxxpzDataByOther(){
	  // 宜兴
	  var gridCommon = [[
		     			{field:'checkType',title:'检查类型',width: 100,align:'center',sortable:true},
		     			{field:'proCotent',title:'检查项',width: 100,align:'center',sortable:true},
		     			{field:'tourResult',title:'巡视结果',width: 150,align:'center',sortable:true,
		     				styler:function(v,row,index){
							if(v=="有缺陷"){
								return 'color:red';
							}
						}}
		      		]];
	
	$('#gjxxpz-datagridOther').datagrid({// 表格
//		title:"详情",
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
		view: detailview,//定义DataGrid的视图
		pageNumber:1,//在设置分页属性的时候初始化页码。
		pageSize:20,//在设置分页属性的时候初始化页面大小。
		url:webContextRoot +'aqjc/querysafeResult.action',
		queryParams:{
			'sfTourResultModel.tourId': tourId,
			'sfTourResultModel.areaNo': areaNo
		},
		loadMsg : "正在努力的读取数据中...",// 提示信息
		columns : gridCommon,//字段
		loadFilter: function(data){
			if (data.sMap){
				return data.sMap;
			} else {
				return data;
			}
		},detailFormatter: function(rowIndex, rowData){
			var except = '';
			if(rowData.except != null && rowData.except != ''){
				except = rowData.except;
			}
			var imgStr = '';
			var imgUrl = [];
			if(rowData.scenePic != null && rowData.scenePic != ''){
				imgUrl = rowData.scenePic.split(",");
			}
			
			for(var i=0;i<imgUrl.length;i++){
				$.ajax({
					async : false,
					url : webContextRoot + 'pCode/judgeFileExist.action',
					data : {downloadFilePath :imgUrl[i]},
					dataType : "json",
					success : function(data) {
						if(data.FLAG == "1"){
							imgStr += '<span class="tools-labelgroup"><a id="href'+i+'" href="'+webContextRoot+imgUrl[i]
							+'" data-lightbox="example-set" class="lightImage"><img src="' + webContextRoot+imgUrl[i]+'" style="height:50px;" class="thumbnailImage" style="display:none;"></a></span>';
						}else if(data.FLAG == "2"){
							imgStr += "<span class=\"tools-labelgroup\"><a id=\"href"+i+"\" onclick=\"$.messager.alert('提示', '图片不存在！', 'warning');\" href=\"#\" class=\"lightImage\"><img src=\""
							+webContextRoot+"/pages/despages/common/images/imageNotFound.png\" onClick=\"return false;\" style=\"height:50px;\" class=\"thumbnailImage\" style=\"display:none;\"></a></span>";
						}
					}
				});
//				imgStr += '<span class="tools-labelgroup"><a id="href'+i+'" href="'+webContextRoot+imgUrl[i]
//				+'" data-lightbox="example-set" class="lightImage"><img src="' + webContextRoot+imgUrl[i]+'" style="height:50px;" class="thumbnailImage" style="display:none;"></a></span>';
			}
			return '<div class="toolsbar-panel" >' +
			'<div class="tbRow">'+
			'<span class="tools-labelgroup">'+
			'<p>现场描述:'+except+'</p>'+
			'</span>'+
			'</div>' +
			'<div class="tbRow">'+
			'<span class="tools-labelgroup">'+
			'<p>现场图片:</p>'+
			'</span>'+
			imgStr+
			'</div>' +
			'</div>';
			
        },onExpandRow:function(rowIndex, rowData){//点击+号展现
			
       }

	});
	
}
  