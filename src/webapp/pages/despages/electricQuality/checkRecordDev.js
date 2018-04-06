/**
 * 设备信息弹出
 * @author taoping
 * @since 2017-05-17
 */

var  newTitle = '';//新闻标题
var newType = '';//新闻类型
var	pageCountTotal = 0;
var indexCount = 1;
var pageSizeCount = 10;


$(function(){
	queryGjxxpzData();//查询表格数据
	queryGjxxpzPicture()
});

/**
 * 列表数据
 * @param {} corporationId
 */
  function queryGjxxpzData(){
	  var gridCommon = [[
            {field:'devName',title:'设备名称',width: 100,align:'center',sortable:true},
            {field:'devType',title:'设备类型',width: 100,align:'center',sortable:true,formatter: function(v,row,index){ //超链接
            	if(v=="1"){
            		return "线路";
            	}else if(v=="2"){
            		return "母线";
            	}else if(v=="3"){
            		return "变压器";
            	}else if(v=="4"){
            		return "其他";
            	}else if(v=="5"){
            		return "用能设备";
            	}
	    }},
            {field:'subsName',title:'检测厂站',width: 100,align:'center',sortable:true}
 		]];	
	
	$('#gjxxpz-datagrid').datagrid({
		fitColumns: true,
	    singleSelect: true,
	    pagination:true,
		close : true,
		url:webContextRoot + 'shiftManage/selectCheckRecordDev.action',
		queryParams:{
			'checkRecordDevModel.id' : lineId	,
			'checkRecordDevModel.checkType' :'0'
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
			var rows = $('#gjxxpz-datagrid').datagrid("getRows");
			if(rows.length>0){
				$('#gjxxpz-datagrid').datagrid("selectRow",0);
			}
		},
	    columns:gridCommon
	});
	
}
  /**
   * 加载图片
   */  
  function queryGjxxpzPicture(){
//  	var width = document.body.clientWidth;
//  	width = (parseInt(width)-40)/3;
//  	var height = document.body.clientHeight;
//  	height = (parseInt(height)-20)*0.4;
  	$.ajax({
  		type : "post",
  		url : webContextRoot + 'shiftManage/selectIdDesCheckRecord.action',
  		dataType : "text",
  		data : {
  			'desCheckRecordModel.id' : lineId
  		},
  		success : function(data) {
  			if(eval('('+data+')')[0].checkImage != null && eval('('+data+')')[0].checkImage != ""){
  				for(var i=0;i<eval('('+data+')')[0].checkImage.split(",").length;i++){
  					var src = "";
  					$.ajax({
  						async : false,
  						url : webContextRoot + 'pCode/judgeFileExist.action',
  						data : {downloadFilePath : eval('('+data+')')[0].checkImage.split(",")[i]},
  						dataType : "json",
  						success : function(result) {
  							if(result.FLAG == "1"){
  								src = eval('('+data+')')[0].checkImage.split(",")[i];
  							}else if(result.FLAG == "2"){
  								src = "/pages/despages/common/images/imageNotFound.png";
  							}
  							var $li = $('<span id="' + "WU_FILE_" + i + '" class="file-item thumbnail" style="margin-left:10px;">'
  									+ '<a>'
  									+ '<img src="'+webContextRoot+src+'" width="66px" height="66px">' 
  									+ '</a>'
  									+ '</span>'
  							), $img = $li.find('a'),$a = $li.find('a');
  							$a.attr('href', webContextRoot+src);
  							$a.attr("data-lightbox","example-set");
  							$("#gjxxpz-picture").append($li);
  						}
  					});					
  				}
  			}
  		}
  	});
  }