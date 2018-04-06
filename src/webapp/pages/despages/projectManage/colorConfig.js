/**
 * 颜色配置
 * @author 孟子杰
 * @since 2017-11-09
 */

$(function(){
	loadMXDYData();
	//加载Tab页信息
	$('#color_config_tabs').tabs({
	       fit: true,//填充大小
	       plain: true,
	       onSelect: function(title,index){
	    	   if(index == 0){//母线电压上下限颜色配置
	    		   loadMXDYData();
	    	   }else if(index == 1){//变压器监测预警线颜色配置
	    		   loadbyqjcData();
	    	   }
	       }
	});
	
	  
	
});

/**
 * 变压器监测预警线颜色配置
 */
function loadbyqjcData(){
	$("#byqjc_datagrid").datagrid({    
		url: webContextRoot + "colorConfig/selectColorConfig.action?func=byqjc",
		loadMsg:'正在加载，请稍等……',//加载时显示提示
		rownumbers:true,
		fit:true,
		fitColumns:true,
		striped: true,
		border : false,
		singleSelect: true,
		columns:[[
		    {field:'ID',title:'颜色配置id',hidden:true,width:50,align:'center'},
		    {field:'NAME',title:'颜色配置名称',width:50,align:'center'},
		    {field:'FUNC',title:'模块id',hidden:true,width:50,align:'center'},
		    {field:'FUNC_NAME',title:'模块',width:50,align:'center'},
		    {field:'COLOR',title:'颜色配置',width:50,align:'center',
			    	formatter: function(value,row,index){
		    		var a = '<input id="color_'+row.ID+'" type="color" value="'+value+'" />';
					return a;
		    	}
		    },
		    {field:'COLOR_DEFAULT',title:'操作',width:50,align:'center',
		    	formatter: function(value,row,index){
		    		var a = '<a id="color_default_'+row.ID+'" onclick="color_default('+row.ID+')" href="#">恢复默认</a>';
		    		return a;
		    	}
		    }
		]],
		onLoadSuccess:function(data){
			var rows = $('#byqjc_datagrid').datagrid("getRows");
			if(rows.length>0){
				$('#byqjc_datagrid').datagrid("selectRow",0);
			}
		}
	});
}

/**
 * 母线电压上下限颜色配置
 */
function loadMXDYData(){
	$("#mxdy_datagrid").datagrid({    
		url: webContextRoot + "colorConfig/selectColorConfig.action?func=mxdy",
		loadMsg:'正在加载，请稍等……',//加载时显示提示
		rownumbers:true,
		fit:true,
		fitColumns:true,
		striped: true,
		border : false,
		singleSelect: true,
		columns:[[
		    {field:'ID',title:'颜色配置id',hidden:true,width:50,align:'center'},
		    {field:'NAME',title:'颜色配置名称',width:50,align:'center'},
		    {field:'FUNC',title:'模块id',hidden:true,width:50,align:'center'},
		    {field:'FUNC_NAME',title:'模块',width:50,align:'center'},
		    {field:'COLOR',title:'颜色配置',width:50,align:'center',
			    	formatter: function(value,row,index){
		    		var a = '<input id="color_'+row.ID+'" type="color" value="'+value+'" />';
					return a;
		    	}
		    },
		    {field:'COLOR_DEFAULT',title:'操作',width:50,align:'center',
		    	formatter: function(value,row,index){
		    		var a = '<a id="color_default_'+row.ID+'" onclick="color_default('+row.ID+')" href="#">恢复默认</a>';
		    		return a;
		    	}
		    }
		]],
		onLoadSuccess:function(data){
			var rows = $('#mxdy_datagrid').datagrid("getRows");
			if(rows.length>0){
				$('#mxdy_datagrid').datagrid("selectRow",0);
			}
		}
	});
}

/**
 * 颜色配置  恢复默认
 */
function color_default(color_id){
	switch(color_id){
	case 1:
		$("#color_"+color_id).val("#ff8080");
		break;
	case 2:
		$("#color_"+color_id).val("#808080");
		break;
	case 3:
		$("#color_"+color_id).val("#ff8080");
		break;
	case 4:
		$("#color_"+color_id).val("#808080");
		break;
	case 5:
		$("#color_"+color_id).val("#8080ff");
		break;
	case 6:
		$("#color_"+color_id).val("#ff0000");
		break;
	case 7:
		$("#color_"+color_id).val("#ff8080");
		break;
	case 8:
		$("#color_"+color_id).val("#ffff80");
		break;
	case 9:
		$("#color_"+color_id).val("#ff00ff");
		break;
	case 10:
		$("#color_"+color_id).val("#008080");
		break;
	default:
		$("#color_"+color_id).val("#000000");	
		break;
	}
}

/**
 * 保存
 */
function colorSave(){
	var tab = $('#color_config_tabs').tabs('getSelected');
	var index = $('#color_config_tabs').tabs('getTabIndex',tab);
	if(index == 0){//母线电压
		var mxdyData = $("#mxdy_datagrid").datagrid("getRows");
//		console.log(mxdyData);
		for(var i = 0; i < mxdyData.length; i++){
			if(mxdyData[i].COLOR != $("#color_"+mxdyData[i].ID).val()){
				$.ajax({	
					url:webContextRoot+'colorConfig/updateColorConfig.action', 
					data:{
						'id': mxdyData[i].ID,
						'color' : $("#color_"+mxdyData[i].ID).val()
					},
					dataType:'json',
					type:'post',
					success:function(result){
//						if(result.flag == 'SUCCESS'){
//							$.messager.alert('成功','保存成功','info');
//						}else{
//							$.messager.alert('失败','保存失败','info');
//						}
					}
				});
			}
		}
		setTimeout(function(){
			$.messager.alert('成功','保存成功','info');
			$("#mxdy_datagrid").datagrid("load");
		},800);
	}else if(index == 1){
		var byqjcData = $("#byqjc_datagrid").datagrid("getRows");
		for(var i = 0; i < byqjcData.length; i++){
			if(byqjcData[i].COLOR != $("#color_"+byqjcData[i].ID).val()){
				$.ajax({	
					url:webContextRoot+'colorConfig/updateColorConfig.action', 
					data:{
						'id': byqjcData[i].ID,
						'color' : $("#color_"+byqjcData[i].ID).val()
					},
					dataType:'json',
					type:'post',
					success:function(result){
//						if(result.flag == 'SUCCESS'){
//							$.messager.alert('成功','保存成功','info');
//						}else{
//							$.messager.alert('失败','保存失败','info');
//						}
					}
				});
			}
		}
		setTimeout(function(){
			$.messager.alert('成功','保存成功','info');
			$("#byqjc_datagrid").datagrid("load");
		},800);
	}
	
}

/**
 * 取消
 */
function colorClose(){
	var tab = $('#color_config_tabs').tabs('getSelected');
	var index = $('#color_config_tabs').tabs('getTabIndex',tab);
	if(index == 0){//母线电压
		$("#mxdy_datagrid").datagrid("load");
	}else if(index == 1){//母线电压
		$("#byqjc_datagrid").datagrid("load");
	}
}

