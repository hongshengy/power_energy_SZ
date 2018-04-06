/**
 * <p>
 * Title: 江苏能源综合服务平台
 * </p>
 * <p>
 * Description:线路实时数据
 * </p>
 * <p>
 * Copyright: Copyright (c) 2009
 * </p>
 * <p>
 * Company: 江苏方天电力技术有限公司
 * </p>
 */
des.namespace("com.frontier.areaEnergy.qtsssjTAB");

 
$(function() { 
		//其他实时数据
		$("body").layout();
		fetchData();
});

function fetchData(){
	options={};
	options.url= des.webContextRoot+'areaEnergy/qtsssjTAB.action?queryPara.subId='+codeId+"&queryPara.terminalId="+terminalId,
	options.height = hei*2-20;
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
	var lineId1 = "";
	var subId1 = subId;
	//是建筑。设备。还是线路
	var codeType = '01'
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
	        	$('#topDiv').datagrid(options);
	        	$('#topDiv').datagrid("reload");
	        	titleFun();
	        }
	});
	
}


function titleFun(){
	var COUNTNUMNEW = parent.$("#COUNTNUMNEW").val();
		if(COUNTNUMNEW != 1){
			return;
		}
	  	$.ajax({
             type: "post",
             data:"queryPara.subId="+codeId+"&queryPara.terminalId="+terminalId,
             url: des.webContextRoot+'areaEnergy/xlsssjTABTitle.action',
             timeout: 60000,
             dataType: "json",
             cache: false,
             success: function(json){
             	 var str1 = '总有功功率合计值  按进线负荷：';
             	 var data1 = '';
             	 var data2 = '';
             	 if(json.length > 0){
             	 	 data1 = json[0].USE_LOAD;
             	 	 data2 = json[0].OUT_LOAD;
             	 }
             	 if(data1){
             	 	data1 = '<u>'+data1+'kW</u>'
             	 }
             	 if(data2){
             	 	data2 = '<u>'+data2+'kW</u>'
             	 }
             	 /**2017-04-07 chenwei 剔除所有界面的出线总负荷统计**/
             	 str1 = str1+data1;//+'   按出线负荷：'+data2;
             	 str1 = '查询结果       <font style="color: red;">'+str1+'</font>';
         		$(".panel-title").first().html(str1);
             }
    });
	
}
