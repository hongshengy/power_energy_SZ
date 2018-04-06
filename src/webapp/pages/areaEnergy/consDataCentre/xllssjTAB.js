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
des.namespace("com.frontier.areaEnergy.xllssjTAB");

 
$(function() { 
	$("body").layout();
	titleFun();
});


function fetchData(){
	count = count+1;
	options={};
	var mpId = $('#allMp').combobox("getValue");
	var dateTime = $('#riqiIn').val();
	options.url= des.webContextRoot+'areaEnergy/queryCDData.action?queryPara.mpId='+mpId+"&queryPara.DATE_TIME="+dateTime,
	options.height = hei*2-60;
	options.border = false;
	options.singleSelect = false;
	options.lazyLoad = true;
	options.striped = true;
	options.sortOrder = 'desc';
	options.remoteSort = false;
	options.showFooter = true;
	options.autoRowHeight = false;
	options.striped=true;
	options.pageSize = 2000;
	options.pageList = [100,200,500,1000,2000];
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
	        data:"queryPara.subId="+subId1+"&queryPara.deviceId="+deviceId1+"&queryPara.codeType="+codeType+"&queryPara.lineId="+lineId1+"&queryPara.disType="+disType+"&queryPara.tabSign="+tabSign+"&queryPara.mpId="+mpId,
	        url: des.webContextRoot+'areaEnergy/getColForCD.action',
	        timeout: 60000,
	        dataType: "json",
	        cache: false,
	        success: function(json){
	        	var weight = 300;
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
	        }
	});
}

function titleFun(){
	    if(COUNTNUMNEW == 1){
      	 	  str1 = '查询结果'+
        	     '&nbsp;&nbsp;&nbsp;&nbsp;设备名称：<input id="allDevice" name="allDevice" value="">'+
        	     '&nbsp;&nbsp;&nbsp;&nbsp;线路名称：<input id="allLine" name="allLine" value="">'+
        	     '&nbsp;&nbsp;&nbsp;&nbsp;测点名称：<input id="allMp" name="allMp" value="">'+
        	     '&nbsp;&nbsp;&nbsp;&nbsp;数据日期：'+
        	     '<img  src="'+des.webContextRoot+'/images/tools-moveleft.gif" onclick="querys(1)" onmousemove="this.style.cursor=\'hand\'" onmouseout="this.style.cursor=\'default\'"/>'+
        	     '<input id="riqiIn" type="text" style="width:120px;height:25px;"/>'+
				 '<img  src="'+des.webContextRoot+'/images/tools-moveright.gif" onclick="querys(2)" onmousemove="this.style.cursor=\'hand\'" onmouseout="this.style.cursor=\'default\'"/>'+
				 '<a onclick="querys(0);" id="button_query" class="easyui-linkbutton c1" href="javascript:void(0);" style="width:40px;height:25px;">查询</a>';
			 $(".panel-title").css('height','40');
			 $(".panel-title").first().html(str1);
			 $(".panel-title").parent().attr('class','');
			 $('#riqiIn').datebox({    
			    required:false
			 });
			 $('#button_query').linkbutton({    
			 	text: '查询'   
			 });
			 $('#riqiIn').datebox('setValue',strCurrDate);
			 //设备名称下拉
        	 $('#allDevice').combobox({
		            valueField:'id',
		            textField:'text',
		            width:100,
		            onSelect: function(record){
			            	 //线路下拉菜单
				        	 $('#allLine').combobox({
						            url :des.webContextRoot+'areaEnergy/queryAllLineBySUB.action?queryPara.subId='+subId+'&queryPara.deviceType='+record.id,
						            valueField:'id',
						            textField:'text',
						            width:100,
						            onSelect: function(record){
						            	  //测点下拉菜单
								        	 $('#allMp').combobox({
										            url :des.webContextRoot+'areaEnergy/queryAllMpBySUB.action?queryPara.lineId='+record.id,
										            valueField:'id',
										            textField:'text',
										            width:100, 
										            onLoadSuccess: function(){
										            	if(count == 0){
										            		fetchData();
										            	}
										            }
										     }); 
									}
						     });
					},
					onLoadSuccess:function(){
					},
					data: [{
						id: 'A',
						text: '线路',
						selected:true   
					},{
						id: 'B',
						text: '母线'
					},{
						id: 'C',
						text: '变压器'
					}]
		     }); 
		     
		    
      	 }else{
      	 	 str1 = '查询结果'+
        	     //'&nbsp;&nbsp;&nbsp;&nbsp;设备名称：<input id="allDevice" name="allDevice" value="">'+
        	     '&nbsp;&nbsp;&nbsp;&nbsp;线路名称：<input id="allLine" name="allLine" value="">'+
        	     '&nbsp;&nbsp;&nbsp;&nbsp;测点名称：<input id="allMp" name="allMp" value="">'+
        	     '&nbsp;&nbsp;&nbsp;&nbsp;数据日期：'+
        	     '<img  src="'+des.webContextRoot+'/images/tools-moveleft.gif" onclick="querys(1)" onmousemove="this.style.cursor=\'hand\'" onmouseout="this.style.cursor=\'default\'"/>'+
        	     '<input id="riqiIn" type="text" style="width:120px;height:25px;"/>'+
				 '<img  src="'+des.webContextRoot+'/images/tools-moveright.gif" onclick="querys(2)" onmousemove="this.style.cursor=\'hand\'" onmouseout="this.style.cursor=\'default\'"/>'+
				 '<a onclick="querys(0);" id="button_query" class="easyui-linkbutton c1" href="javascript:void(0);" style="width:40px;height:25px;">查询</a>';
			 $(".panel-title").css('height','40');
			 $(".panel-title").first().html(str1);
			 $(".panel-title").parent().attr('class','');
			 $('#riqiIn').datebox({    
			    required:false
			 });
			 $('#button_query').linkbutton({    
			 	text: '查询'   
			 });
			 $('#riqiIn').datebox('setValue',strCurrDate); 
			 //线路下拉菜单
        	 $('#allLine').combobox({
		            url :des.webContextRoot+'areaEnergy/queryAllLineBySUB.action?queryPara.subId='+subId+'&queryPara.deviceType=A',
		            valueField:'id',
		            textField:'text',
		            width:100,
		            onSelect: function(record){
		            	 //测点下拉菜单
				        	 $('#allMp').combobox({
						            url :des.webContextRoot+'areaEnergy/queryAllMpBySUB.action?queryPara.lineId='+record.id,
						            valueField:'id',
						            textField:'text',
						            width:100,
						            onLoadSuccess: function(){
						            	if(count == 0){
						            		fetchData();
						            	}
						            }
						     }); 
					}
		     }); 
      	 }
}


//点击查询按钮
 function querys(tab){
	dataswitch("riqiIn",$("#riqiIn").val(),tab);
 }
 function query(){
 	 var dateTime = $('#riqiIn').val();
 	 var deviceId =""
 	 if(COUNTNUMNEW == 1){
 	 	deviceId = $('#allDevice').combobox("getValue");
 	 }
 	 var lineId = $('#allLine').combobox("getValue");
 	 var mpId = $('#allMp').combobox("getValue");
 	 if(!mpId){
 	 	$.messager.alert('系统提示！','请选择测点！'); 
 	 	return;
 	 }
 	 fetchData();
 }