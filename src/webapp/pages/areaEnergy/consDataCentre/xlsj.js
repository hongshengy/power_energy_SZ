/**
 * <p>
 * Title: 江苏能源综合服务平台
 * </p>
 * <p>
 * Description:xian
 * </p>
 * <p>
 * Copyright: Copyright (c) 2009
 * </p>
 * <p>
 * Company: 江苏方天电力技术有限公司
 * </p>
 */
des.namespace("com.frontier.areaEnergy.xlsjTAB");

 
$(function() { 
	$("body").layout();
	fetchData();
});

function fetchData(){
	options={};
	options.url= des.webContextRoot+'areaEnergy/xlsssjTAB.action?queryPara.lineId='+lineId+"&queryPara.datadate="+riqiIn;
	options.height = hheight-30;
	options.border = false;
	options.singleSelect = false;
	options.lazyLoad = true;
	options.striped = true;
	options.title='查询结果';
	options.sortOrder = 'desc';
	options.remoteSort = false;
	options.showFooter = true;
	options.autoRowHeight = false;
	options.striped=true;
	options.pageSize = 1000;
	options.pageList = [100,200,500,1000];
	options.pagination = true;
	options.rownumbers = true;
	var columns = [];
    var deviceId1 = "";
	var lineId1 = lineId;
	var subId1 = subId;
	//是建筑。设备。还是线路
	var codeType = '03'
	//显示的是列表
	var disType = '1'
	$.ajax({
	        type: "post",
	        data:"queryPara.subId="+subId1+"&queryPara.deviceId="+deviceId1+"&queryPara.codeType="+codeType+"&queryPara.lineId="+lineId1+"&queryPara.disType="+disType+"&queryPara.tabSign="+tabSign,
	        url: des.webContextRoot+'areaEnergy/getCol.action',
	        timeout: 60000,
	        dataType: "json",
	        cache: false,
	        success: function(json){
	        	var weight = 150;
	        	for(var x = 1 ;x<=json.colCount;x++){
	        		var column1 = [];
	        		var colArray = json['colList'+x];
	        		for(var y = 0 ; y < colArray.length ;y++){
	        			var nums = weight*parseInt(colArray[y].COL_NUMS);
	        			if(colArray[y].COL_SIGN){
	        				column1.push({
	        					title : colArray[y].COL_NAME,
	        					field : colArray[y].COL_SIGN,
	        					width : nums,
	        					align : 'center',
	        					rowspan : parseInt(colArray[y].ROW_NUMS),
	        					colspan : parseInt(colArray[y].COL_NUMS),
	        					formatter:function(value,row,index){
	        					     return value;
	        					}
	        				});
	        			}else{
	        				column1.push({
	        					title :  colArray[y].COL_NAME,
	        					field : 'cx',
	        					width : nums,
	        					align : 'center',
	        					rowspan : parseInt(colArray[y].ROW_NUMS),
	        					colspan : parseInt(colArray[y].COL_NUMS)
	        				});
	        			}
	        		}
	        		columns.push(column1);
	        	}
	        	options.columns =columns;
	        	$('#xlsjTable').datagrid(options);
	        	$('#xlsjTable').datagrid("reload");
	        }
	});
	
}



