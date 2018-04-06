/**
 * 用能分析报告
 * @author meng_zijie
 * @since 2017-06-13
 */
var type = ''; //1上游 2下游
var codeIds = '';	// 行业ID
var hyIds = [];
$(function(){
	
	if(consId==null || consId==''|| consId=="null"){//未获取到企业编码，加载左侧树
		$('#tree-leftQyTree').tree({ //默认没参数，获取区域  企业  都是打开状态
			url:webContextRoot +'destree/queryTree.action',
		    method:'get',
		    multiple:false,//是否支持多选
		    editable:'true' ,
		    onClick: function(node){
		    	// 获取根节点
		    	var rootNode = $('#tree-leftQyTree').tree('getRoot',node.target);
		    	// 不是根节点时，刷新页面
		    	if(rootNode.id != node.id){
					consId = node.id;
					consName = node.text;
					queryConsInfo();
					$('#up_datagrid').datagrid('load',{
						'consId':consId,
						'type':1
					});
					$('#down_datagrid').datagrid('load',{
						'consId':consId,
						'type':2
					});
		    	}else{
		    		$.messager.alert('提示', '请选择客户', 'warning');
		    	}
			},
			onLoadSuccess:function(node, data){//加载成功返回
				selectTree();//设置树默认选中节点
			}
		});
		//树模糊检索
		searchTreeNode();
	}else{
		queryConsInfo();
		upAndDownDatagrid();
	}
	
//	hycontent();
	hyTree();
	
	$("#hy_dialog").dialog({// 电费弹窗
		onClose:function(){
			// 关闭窗口 重置变量
			codeIds = '';
			hyIds = [];
			$("#hy_dialog label").removeClass("active");
		}
	});
	
});	

/**
 * 查询树
 */
function selectTree(nodeId){
	$('#tree-leftQyTree li:eq(0)').find('div').addClass("tree-node-selected");//添加选中样式
	var n = $('#tree-leftQyTree').tree('getSelected');//获取被选中的节点
	if(n!=null)//判断节点是否存在
	{
		$('#tree-leftQyTree').tree('select',n.target);
	}
	
	var chiNode = $('#tree-leftQyTree').tree('getChildren',n.target);//子节点
	for(var i=0 ; i < chiNode.length ; i++)//循环节点
    {
		 if(nodeId!=null?chiNode[i].id==nodeId:chiNode[i].type==1)//查找定位
		  {
				var n = $('#tree-leftQyTree').tree("find",chiNode[i].id);//根据id获取节点
	       	   	$('#tree-leftQyTree').tree('select',n.target);//选中节点
	       	   	$('#tree-leftQyTree').tree('scrollTo',n.target);//滚动到节点
	       	    consId = chiNode[i].id;
	       	    consName = chiNode[i].text;
	       	    queryConsInfo();
	       	    upAndDownDatagrid();
	       	   	break;//跳出循环
		 }
    }
}

/**
 * 查询客户档案信息
 */
function queryConsInfo(){
	$.ajax({	
		url:webContextRoot+'tradeUpAndDown/queryConsInfo.action',
		data:{
			'consId': consId
		},
		dataType:'json',
		type:'post',
		success:function(result){
//			console.log(result);
			$("#da_areaName").html(result.areaName);
			$("#da_consName").html(result.consName);
			$("#da_consNo").html(result.consNo);
			$("#da_contractCap").html(result.contractCap);
//			$("#da_contractName").html(result.contractName);
//			$("#da_endDate").html(result.endDate.substr(0,10));
//			$("#da_startDate").html(result.startDate.substr(0,10));
			$("#da_status").html(result.status);
//			$("#da_stopDate").html(result.stopDate.substr(0,10));
//			$("#da_telephone").html(result.telephone);
			$("#da_testDate").html(result.testDate.substr(0,10));
			$("#da_trade").html(result.trade);
			$("#da_userCheckCos").html(result.userCheckCos);
			$("#da_userType").html(result.userType);
			$("#da_volt").html(result.volt);
//			$("#da_x").html(result.x);
//			$("#da_y").html(result.y);
			$("#da_elecAddr").html(result.elecAddr);
			$("#da_createDate").html(result.createDate.substr(0,10));
		}
	});
}

/**
 * 上下游表格
 */
function upAndDownDatagrid(){
	$('#up_datagrid').datagrid({    
		url: webContextRoot + "tradeUpAndDown/selectConsTradeRecord.action",
		queryParams: {
			consId: consId,
			type: '1'
		},
		loadMsg:'正在加载，请稍等……',//加载时显示提示
		rownumbers:true,
		fit:true,
		fitColumns:true,
		striped: true,
		border : false,
//		singleSelect: true,
		tools : '#up_buttons',
		columns:[[
            {field:'checkbox',title:'复选框',width:30,checkbox:true},
		    {field:'trade',title:'行业名称',width:50,align:'center'},
		    {field:'tradeValue',title:'行业编码',width:50,align:'center'}
		]],
//		pagination:true,
//		pageSize: 30,
//		pageList : [30,50,100],
		onLoadSuccess:function(data){
			var rows = $('#up_datagrid').datagrid("getRows");
//			if(rows.length>0){
//				$('#data_grid').datagrid("selectRow",0);
//			}
		}
	});  
	
	$('#down_datagrid').datagrid({    
		url: webContextRoot + "tradeUpAndDown/selectConsTradeRecord.action",
		queryParams: {
			consId: consId,
			type: '2'
		},
		loadMsg:'正在加载，请稍等……',//加载时显示提示
		rownumbers:true,
		fit:true,
		fitColumns:true,
		striped: true,
		border : false,
//		singleSelect: true,
		tools : '#down_buttons',
		columns:[[
		    {field:'checkbox',title:'复选框',width:30,checkbox:true},
		    {field:'trade',title:'行业名称',width:50,align:'center'},
		    {field:'tradeValue',title:'行业编码',width:50,align:'center'}
		]],
//		pagination:true,
//		pageSize: 30,
//		pageList : [30,50,100],
		onLoadSuccess:function(data){
			var rows = $('#down_datagrid').datagrid("getRows");
//			if(rows.length>0){
//				$('#data_grid').datagrid("selectRow",0);
//			}
		}
	});  
}

/**
 * 上游行业-删除
 */
function up_delete(){
	var rows = $('#up_datagrid').datagrid("getSelections");
	if(rows.length==0){
		$.messager.alert('提示', '请选择上游行业', 'info');
		return;
	}
	$.messager.confirm('提示', '您确定要删除行业吗？', function(r){
		if (r){
			//行业代码
			codeIds = '';
			for(var i in rows){
				codeIds += rows[i].codeId + ',';
			}
			codeIds = codeIds.substr(0,codeIds.length-1);
			
			$.ajax({	
				url:webContextRoot+'tradeUpAndDown/deleteConsTradeRecord.action',
				data:{
					'consId': consId,
					'type': '1',
					'codeIds': codeIds
				},
				dataType:'json',
				type:'post',
				success:function(result){
					if(result.flag=='success'){
						$.messager.alert('提示', '删除成功', 'info');
						$('#up_datagrid').datagrid('load',{
							'consId':consId,
							'type':1
						});
					}else{
						$.messager.alert('提示', '删除失败', 'info');
					}
				}
			});
		}
	});
	
}

/**
 * 下游行业-删除
 */
function down_delete(){
	var rows = $('#down_datagrid').datagrid("getSelections");
	if(rows.length==0){
		$.messager.alert('提示', '请选择下游行业', 'info');
		return;
	}
	$.messager.confirm('提示', '您确定要删除行业吗？', function(r){
		if (r){
			//行业代码
			var codeIds = '';
			for(var i in rows){
				codeIds += rows[i].codeId + ',';
			}
			codeIds = codeIds.substr(0,codeIds.length-1);
			
			$.ajax({	
				url:webContextRoot+'tradeUpAndDown/deleteConsTradeRecord.action',
				data:{
					'consId': consId,
					'type': '2',
					'codeIds': codeIds
				},
				dataType:'json',
				type:'post',
				success:function(result){
					if(result.flag=='success'){
						$.messager.alert('提示', '删除成功', 'info');
						$('#down_datagrid').datagrid('load',{
							'consId':consId,
							'type':2
						});
					}else{
						$.messager.alert('提示', '删除失败', 'info');
					}
				}
			});
		}
	});
	
}

/**
 * 上游行业-新增
 */
function up_add(){
	type = 1;
	$("#hy_dialog").dialog("open");
}

/**
 * 下游行业-新增
 */
function down_add(){
	type = 2;
	$("#hy_dialog").dialog("open");
}

/**
 * 行业树
 */
function hyTree(){
	
//	$("#hy_dialog").dialog({
//		width : document.body.clientWidth-200,
//		height : document.body.clientHeight-100,
//		top:50,
//		left:50
//	}); 
	$.ajax({
		type: "post",
		url:webContextRoot + 'hyyd/queryTreeByHy.action',//请求地址
		data:"",
		dataType:"json",		// 返回类型
		cache : false,
		async : false,			// 同步异步请求
		success: function(json){
			var list = json.consMap.list;
			var attr = '';
			var left = '';
			var array = [];
			
			for(var i = 0 ; i < 20;i++){

				var Sowntext = list[i].text.length>8?(list[i].text.substring(0,8)+'...'):list[i].text;
				
				
				// 子节点
				if(list[i].parentId == 0 && list[i].iconCls == 1){
					
					left += "<div class=\"row\" style=\"padding-left:20px;\">" + 
								"<div class=\"col-md-2 org_col \" style=\"width:155px;\">" +
									"<div class=\"SlowFast \" style=\"width:155px;float:left;\"> " +
										"<label type=\"button\" onclick=\"queryChartByCode(\'"+list[i].id+"\',\'"+list[i].text+"\')\" class=\"btn row-regionbutton\" style=\"width:125px;text-align:left;\">" +
											""+Sowntext+"" +
										"</label>" + 
									"</div>	" + 
								"</div>	" + 
							"</div>";  
					
				}else{
					attr += "<div class=\"row\" style=\"float:left;left:120px;\">" + 
								"<div class=\"col-md-2 org_col \" style=\"width:155px;\">" +
									"<div class=\"SlowFast \" style=\"width:155px;float:left;\"> " +
										"<label type=\"button\" onclick=\"queryChartByCode(\'"+list[i].id+"\',\'"+list[i].text+"\')\" class=\"btn row-regionbutton\" style=\"width:125px;text-align:left;\">" +
											""+Sowntext+"" +
										"</label>" + 
									"</div>	" + 
								"</div>	" + 
							"</div>";  
				}  
				
			}
			
			var attr1 = '';
			var left1 = '';
			
			
			for(var i = 20 ; i < 41;i++){

				var Sowntext = list[i].text.length>8?(list[i].text.substring(0,8)+'...'):list[i].text;
				
				
				// 子节点
				if(list[i].parentId == 0 && list[i].iconCls == 1){
					
					left1 += "<div class=\"row\" style=\"padding-left:20px;\">" + 
								"<div class=\"col-md-2 org_col \" style=\"width:155px;\">" +
									"<div class=\"SlowFast \" style=\"width:155px;float:left;\"> " +
										"<label type=\"button\" onclick=\"queryChartByCode(\'"+list[i].id+"\',\'"+list[i].text+"\')\" class=\"btn row-regionbutton\" style=\"width:125px;text-align:left;\">" +
											""+Sowntext+"" +
										"</label>" + 
									"</div>	" + 
								"</div>	" + 
							"</div>";  
					
				}else{
					attr1 += "<div class=\"row\" style=\"float:left;left:120px;\">" + 
								"<div class=\"col-md-2 org_col \" style=\"width:155px;\">" +
									"<div class=\"SlowFast \" style=\"width:155px;float:left;\"> " +
										"<label type=\"button\" onclick=\"queryChartByCode(\'"+list[i].id+"\',\'"+list[i].text+"\')\" class=\"btn row-regionbutton\" style=\"width:125px;text-align:left;\">" +
											""+Sowntext+"" +
										"</label>" + 
									"</div>	" + 
								"</div>	" + 
							"</div>";  
				}
				
			}
			
			var attr2 = '';
			var left2 = '';
			for(var i = 41 ; i < 275;i++){

				var Sowntext = list[i].text.length>8?(list[i].text.substring(0,8)+'...'):list[i].text;
				
				
				// 子节点
				if(list[i].parentId == 0 && list[i].iconCls == 1){
					
					left2 += "<div class=\"row\" style=\"padding-left:20px;\">" + 
								"<div class=\"col-md-2 org_col \" style=\"width:155px;\">" +
									"<div class=\"SlowFast \" style=\"width:155px;float:left;\"> " +
										"<label type=\"button\" onclick=\"queryChartByCode(\'"+list[i].id+"\',\'"+list[i].text+"\')\" class=\"btn row-regionbutton\" style=\"width:125px;text-align:left;\">" +
											""+Sowntext+"" +
										"</label>" + 
									"</div>	" + 
								"</div>	" + 
							"</div>";  
					
				}else{
					attr2 += "<div class=\"row\" style=\"float:left;left:120px;\">" + 
								"<div class=\"col-md-2 org_col \" style=\"width:155px;\">" +
									"<div class=\"SlowFast \" style=\"width:155px;float:left;\"> " +
										"<label type=\"button\" onclick=\"queryChartByCode(\'"+list[i].id+"\',\'"+list[i].text+"\')\" class=\"btn row-regionbutton\" style=\"width:125px;text-align:left;\">" +
											""+Sowntext+"" +
										"</label>" + 
									"</div>	" + 
								"</div>	" + 
							"</div>";  
				}
				
			}
			
			var attr3 = '';
			var left3 = '';
			for(var i = 275 ; i < 286;i++){

				var Sowntext = list[i].text.length>8?(list[i].text.substring(0,8)+'...'):list[i].text;
				
				
				// 子节点
				if(list[i].parentId == 0 && list[i].iconCls == 1){
					
					left3 += "<div class=\"row\" style=\"padding-left:20px;\">" + 
								"<div class=\"col-md-2 org_col \" style=\"width:155px;\">" +
									"<div class=\"SlowFast \" style=\"width:155px;float:left;\"> " +
										"<label type=\"button\" onclick=\"queryChartByCode(\'"+list[i].id+"\',\'"+list[i].text+"\')\" class=\"btn row-regionbutton\" style=\"width:125px;text-align:left;\">" +
											""+Sowntext+"" +
										"</label>" + 
									"</div>	" + 
								"</div>	" + 
							"</div>";  
					
				}else{
					attr3 += "<div class=\"row\" style=\"float:left;left:120px;\">" + 
								"<div class=\"col-md-2 org_col \" style=\"width:155px;\">" +
									"<div class=\"SlowFast \" style=\"width:155px;float:left;\"> " +
										"<label type=\"button\" onclick=\"queryChartByCode(\'"+list[i].id+"\',\'"+list[i].text+"\')\" class=\"btn row-regionbutton\" style=\"width:125px;text-align:left;\">" +
											""+Sowntext+"" +
										"</label>" + 
									"</div>	" + 
								"</div>	" + 
							"</div>";  
				}
				
			}
			
			var attr4 = '';
			var left4 = '';
			for(var i = 286 ; i < 293;i++){

				var Sowntext = list[i].text.length>8?(list[i].text.substring(0,8)+'...'):list[i].text;
				
				
				// 子节点
				if(list[i].parentId == 0 && list[i].iconCls == 1){
					
					left4 += "<div class=\"row\" style=\"padding-left:20px;\">" + 
								"<div class=\"col-md-2 org_col \" style=\"width:155px;\">" +
									"<div class=\"SlowFast \" style=\"width:155px;float:left;\"> " +
										"<label type=\"button\" onclick=\"queryChartByCode(\'"+list[i].id+"\',\'"+list[i].text+"\')\" class=\"btn row-regionbutton\" style=\"width:125px;text-align:left;\">" +
											""+Sowntext+"" +
										"</label>" + 
									"</div>	" + 
								"</div>	" + 
							"</div>";  
					
				}else{
					attr4 += "<div class=\"row\" style=\"float:left;left:120px;\">" + 
								"<div class=\"col-md-2 org_col \" style=\"width:155px;\">" +
									"<div class=\"SlowFast \" style=\"width:155px;float:left;\"> " +
										"<label type=\"button\" onclick=\"queryChartByCode(\'"+list[i].id+"\',\'"+list[i].text+"\')\" class=\"btn row-regionbutton\" style=\"width:125px;text-align:left;\">" +
											""+Sowntext+"" +
										"</label>" + 
									"</div>	" + 
								"</div>	" + 
							"</div>";  
				}
				
			}
			
			var attr5 = '';
			var left5 = '';
			for(var i = 293 ; i < 308;i++){

				var Sowntext = list[i].text.length>8?(list[i].text.substring(0,8)+'...'):list[i].text;
				
				
				// 子节点
				if(list[i].parentId == 0 && list[i].iconCls == 1){
					
					left5 += "<div class=\"row\" style=\"padding-left:20px;\">" + 
								"<div class=\"col-md-2 org_col \" style=\"width:155px;\">" +
									"<div class=\"SlowFast \" style=\"width:155px;float:left;\"> " +
										"<label type=\"button\" onclick=\"queryChartByCode(\'"+list[i].id+"\',\'"+list[i].text+"\')\" class=\"btn row-regionbutton\" style=\"width:125px;text-align:left;\">" +
											""+Sowntext+"" +
										"</label>" + 
									"</div>	" + 
								"</div>	" + 
							"</div>";  
					
				}else{
					attr5 += "<div class=\"row\" style=\"float:left;left:120px;\">" + 
								"<div class=\"col-md-2 org_col \" style=\"width:155px;\">" +
									"<div class=\"SlowFast \" style=\"width:155px;float:left;\"> " +
										"<label type=\"button\" onclick=\"queryChartByCode(\'"+list[i].id+"\',\'"+list[i].text+"\')\" class=\"btn row-regionbutton\" style=\"width:125px;text-align:left;\">" +
											""+Sowntext+"" +
										"</label>" + 
									"</div>	" + 
								"</div>	" + 
							"</div>";  
				}
				
			}
			
			var attr6 = '';
			var left6 = '';
			for(var i = 308 ; i < 321;i++){

				var Sowntext = list[i].text.length>8?(list[i].text.substring(0,8)+'...'):list[i].text;
				
				
				// 子节点
				if(list[i].parentId == 0 && list[i].iconCls == 1){
					
					left6 += "<div class=\"row\" style=\"padding-left:20px;\">" + 
								"<div class=\"col-md-2 org_col \" style=\"width:155px;\">" +
									"<div class=\"SlowFast \" style=\"width:155px;float:left;\"> " +
										"<label type=\"button\" onclick=\"queryChartByCode(\'"+list[i].id+"\',\'"+list[i].text+"\')\" class=\"btn row-regionbutton\" style=\"width:125px;text-align:left;\">" +
											""+Sowntext+"" +
										"</label>" + 
									"</div>	" + 
								"</div>	" + 
							"</div>";  
					
				}else{
					attr6 += "<div class=\"row\" style=\"float:left;left:120px;\">" + 
								"<div class=\"col-md-2 org_col \" style=\"width:155px;\">" +
									"<div class=\"SlowFast \" style=\"width:155px;float:left;\"> " +
										"<label type=\"button\" onclick=\"queryChartByCode(\'"+list[i].id+"\',\'"+list[i].text+"\')\" class=\"btn row-regionbutton\" style=\"width:125px;text-align:left;\">" +
											""+Sowntext+"" +
										"</label>" + 
									"</div>	" + 
								"</div>	" + 
							"</div>";  
				}
				
			}
			
			var attr7 = '';
			var left7 = '';
			for(var i = 321 ; i < 342;i++){

				var Sowntext = list[i].text.length>8?(list[i].text.substring(0,8)+'...'):list[i].text;
				
				
				// 子节点
				if(list[i].parentId == 0 && list[i].iconCls == 1){
					
					left7 += "<div class=\"row\" style=\"padding-left:20px;\">" + 
								"<div class=\"col-md-2 org_col \" style=\"width:155px;\">" +
									"<div class=\"SlowFast \" style=\"width:155px;float:left;\"> " +
										"<label type=\"button\" onclick=\"queryChartByCode(\'"+list[i].id+"\',\'"+list[i].text+"\')\" class=\"btn row-regionbutton\" style=\"width:125px;text-align:left;\">" +
											""+Sowntext+"" +
										"</label>" + 
									"</div>	" + 
								"</div>	" + 
							"</div>";  
					
				}else{
					attr7 += "<div class=\"row\" style=\"float:left;left:120px;\">" + 
								"<div class=\"col-md-2 org_col \" style=\"width:155px;\">" +
									"<div class=\"SlowFast \" style=\"width:155px;float:left;\"> " +
										"<label type=\"button\" onclick=\"queryChartByCode(\'"+list[i].id+"\',\'"+list[i].text+"\')\" class=\"btn row-regionbutton\" style=\"width:125px;text-align:left;\">" +
											""+Sowntext+"" +
										"</label>" + 
									"</div>	" + 
								"</div>	" + 
							"</div>";  
				}
				
			}
			
			var attr8 = '';
			var left8 = '';
			for(var i = 342 ; i < 352;i++){

				var Sowntext = list[i].text.length>8?(list[i].text.substring(0,8)+'...'):list[i].text;
				
				
				// 子节点
				if(list[i].parentId == 0 && list[i].iconCls == 1){
					
					left8 += "<div class=\"row\" style=\"padding-left:20px;\">" + 
								"<div class=\"col-md-2 org_col \" style=\"width:155px;\">" +
									"<div class=\"SlowFast \" style=\"width:155px;float:left;\"> " +
										"<label type=\"button\" onclick=\"queryChartByCode(\'"+list[i].id+"\',\'"+list[i].text+"\')\" class=\"btn row-regionbutton\" style=\"width:125px;text-align:left;\">" +
											""+Sowntext+"" +
										"</label>" + 
									"</div>	" + 
								"</div>	" + 
							"</div>";  
					
				}else{
					attr8 += "<div class=\"row\" style=\"float:left;left:120px;\">" + 
								"<div class=\"col-md-2 org_col \" style=\"width:155px;\">" +
									"<div class=\"SlowFast \" style=\"width:155px;float:left;\"> " +
										"<label type=\"button\" onclick=\"queryChartByCode(\'"+list[i].id+"\',\'"+list[i].text+"\')\" class=\"btn row-regionbutton\" style=\"width:125px;text-align:left;\">" +
											""+Sowntext+"" +
										"</label>" + 
									"</div>	" + 
								"</div>	" + 
							"</div>";  
				}
				
			}
			
			var attr9 = '';
			var left9 = '';
			for(var i = 352 ; i < 364;i++){

				var Sowntext = list[i].text.length>8?(list[i].text.substring(0,8)+'...'):list[i].text;
				
				
				// 子节点
				if(list[i].parentId == 0 && list[i].iconCls == 1){
					
					left9 += "<div class=\"row\" style=\"padding-left:20px;\">" + 
								"<div class=\"col-md-2 org_col \" style=\"width:155px;\">" +
									"<div class=\"SlowFast \" style=\"width:155px;float:left;\"> " +
										"<label type=\"button\" onclick=\"queryChartByCode(\'"+list[i].id+"\',\'"+list[i].text+"\')\" class=\"btn row-regionbutton\" style=\"width:125px;text-align:left;\">" +
											""+Sowntext+"" +
										"</label>" + 
									"</div>	" + 
								"</div>	" + 
							"</div>";  
					
				}else{
					attr9 += "<div class=\"row\" style=\"float:left;left:120px;\">" + 
								"<div class=\"col-md-2 org_col \" style=\"width:155px;\">" +
									"<div class=\"SlowFast \" style=\"width:155px;float:left;\"> " +
										"<label type=\"button\" onclick=\"queryChartByCode(\'"+list[i].id+"\',\'"+list[i].text+"\')\" class=\"btn row-regionbutton\" style=\"width:125px;text-align:left;\">" +
											""+Sowntext+"" +
										"</label>" + 
									"</div>	" + 
								"</div>	" + 
							"</div>";  
				}
				
			}
			
			var attr10 = '';
			var left10 = '';
			for(var i = 364 ; i < 370;i++){

				var Sowntext = list[i].text.length>8?(list[i].text.substring(0,8)+'...'):list[i].text;
				
				
				// 子节点
				if(list[i].parentId == 0 && list[i].iconCls == 1){
					
					left10 += "<div class=\"row\" style=\"padding-left:20px;\">" + 
								"<div class=\"col-md-2 org_col \" style=\"width:155px;\">" +
									"<div class=\"SlowFast \" style=\"width:155px;float:left;\"> " +
										"<label type=\"button\" onclick=\"queryChartByCode(\'"+list[i].id+"\',\'"+list[i].text+"\')\" class=\"btn row-regionbutton\" style=\"width:125px;text-align:left;\">" +
											""+Sowntext+"" +
										"</label>" + 
									"</div>	" + 
								"</div>	" + 
							"</div>";  
					
				}else{
					attr10 += "<div class=\"row\" style=\"float:left;left:120px;\">" + 
								"<div class=\"col-md-2 org_col \" style=\"width:155px;\">" +
									"<div class=\"SlowFast \" style=\"width:155px;float:left;\"> " +
										"<label type=\"button\" onclick=\"queryChartByCode(\'"+list[i].id+"\',\'"+list[i].text+"\')\" class=\"btn row-regionbutton\" style=\"width:125px;text-align:left;\">" +
											""+Sowntext+"" +
										"</label>" + 
									"</div>	" + 
								"</div>	" + 
							"</div>";  
				}
				
			}
			
			var attr11 = '';
			var left11 = '';
			for(var i = 370 ; i < 384;i++){

				var Sowntext = list[i].text.length>8?(list[i].text.substring(0,8)+'...'):list[i].text;
				
				
				// 子节点
				if(list[i].parentId == 0 && list[i].iconCls == 1){
					
					left11 += "<div class=\"row\" style=\"padding-left:20px;\">" + 
								"<div class=\"col-md-2 org_col \" style=\"width:155px;\">" +
									"<div class=\"SlowFast \" style=\"width:155px;float:left;\"> " +
										"<label type=\"button\" onclick=\"queryChartByCode(\'"+list[i].id+"\',\'"+list[i].text+"\')\" class=\"btn row-regionbutton\" style=\"width:125px;text-align:left;\">" +
											""+Sowntext+"" +
										"</label>" + 
									"</div>	" + 
								"</div>	" + 
							"</div>";  
					
				}else{
					attr11 += "<div class=\"row\" style=\"float:left;left:120px;\">" + 
								"<div class=\"col-md-2 org_col \" style=\"width:155px;\">" +
									"<div class=\"SlowFast \" style=\"width:155px;float:left;\"> " +
										"<label type=\"button\" onclick=\"queryChartByCode(\'"+list[i].id+"\',\'"+list[i].text+"\')\" class=\"btn row-regionbutton\" style=\"width:125px;text-align:left;\">" +
											""+Sowntext+"" +
										"</label>" + 
									"</div>	" + 
								"</div>	" + 
							"</div>";  
				}
				
			}
			
			var attr12 = '';
			var left12 = '';
			for(var i = 384 ; i < 402;i++){

				var Sowntext = list[i].text.length>8?(list[i].text.substring(0,8)+'...'):list[i].text;
				
				
				// 子节点
				if(list[i].parentId == 0 && list[i].iconCls == 1){
					
					left12 += "<div class=\"row\" style=\"padding-left:20px;\">" + 
								"<div class=\"col-md-2 org_col \" style=\"width:155px;\">" +
									"<div class=\"SlowFast \" style=\"width:155px;float:left;\"> " +
										"<label type=\"button\" onclick=\"queryChartByCode(\'"+list[i].id+"\',\'"+list[i].text+"\')\" class=\"btn row-regionbutton\" style=\"width:125px;text-align:left;\">" +
											""+Sowntext+"" +
										"</label>" + 
									"</div>	" + 
								"</div>	" + 
							"</div>";  
					
				}else{
					attr12 += "<div class=\"row\" style=\"float:left;left:120px;\">" + 
								"<div class=\"col-md-2 org_col \" style=\"width:155px;\">" +
									"<div class=\"SlowFast \" style=\"width:155px;float:left;\"> " +
										"<label type=\"button\" onclick=\"queryChartByCode(\'"+list[i].id+"\',\'"+list[i].text+"\')\" class=\"btn row-regionbutton\" style=\"width:125px;text-align:left;\">" +
											""+Sowntext+"" +
										"</label>" + 
									"</div>	" + 
								"</div>	" + 
							"</div>";  
				}
				
			}
			
			var attr13 = '';
			var left13 = '';
			for(var i = 402 ; i < 415;i++){

				var Sowntext = list[i].text.length>8?(list[i].text.substring(0,8)+'...'):list[i].text;
				
				
				// 子节点
				if(list[i].parentId == 0 && list[i].iconCls == 1){
					
					left13 += "<div class=\"row\" style=\"padding-left:20px;\">" + 
								"<div class=\"col-md-2 org_col \" style=\"width:155px;\">" +
									"<div class=\"SlowFast \" style=\"width:155px;float:left;\"> " +
										"<label type=\"button\" onclick=\"queryChartByCode(\'"+list[i].id+"\',\'"+list[i].text+"\')\" class=\"btn row-regionbutton\" style=\"width:125px;text-align:left;\">" +
											""+Sowntext+"" +
										"</label>" + 
									"</div>	" + 
								"</div>	" + 
							"</div>";  
					
				}else{
					attr13 += "<div class=\"row\" style=\"float:left;left:120px;\">" + 
								"<div class=\"col-md-2 org_col \" style=\"width:155px;\">" +
									"<div class=\"SlowFast \" style=\"width:155px;float:left;\"> " +
										"<label type=\"button\" onclick=\"queryChartByCode(\'"+list[i].id+"\',\'"+list[i].text+"\')\" class=\"btn row-regionbutton\" style=\"width:125px;text-align:left;\">" +
											""+Sowntext+"" +
										"</label>" + 
									"</div>	" + 
								"</div>	" + 
							"</div>";  
				}
				
			}
			
			var attr14 = '';
			var left14 = '';
			for(var i = 415 ; i < 430;i++){

				var Sowntext = list[i].text.length>8?(list[i].text.substring(0,8)+'...'):list[i].text;
				
				
				// 子节点
				if(list[i].parentId == 0 && list[i].iconCls == 1){
					
					left14 += "<div class=\"row\" style=\"padding-left:20px;\">" + 
								"<div class=\"col-md-2 org_col \" style=\"width:155px;\">" +
									"<div class=\"SlowFast \" style=\"width:155px;float:left;\"> " +
										"<label type=\"button\" onclick=\"queryChartByCode(\'"+list[i].id+"\',\'"+list[i].text+"\')\" class=\"btn row-regionbutton\" style=\"width:125px;text-align:left;\">" +
											""+Sowntext+"" +
										"</label>" + 
									"</div>	" + 
								"</div>	" + 
							"</div>";  
					
				}else{
					attr14 += "<div class=\"row\" style=\"float:left;left:120px;\">" + 
								"<div class=\"col-md-2 org_col \" style=\"width:155px;\">" +
									"<div class=\"SlowFast \" style=\"width:155px;float:left;\"> " +
										"<label type=\"button\" onclick=\"queryChartByCode(\'"+list[i].id+"\',\'"+list[i].text+"\')\" class=\"btn row-regionbutton\" style=\"width:125px;text-align:left;\">" +
											""+Sowntext+"" +
										"</label>" + 
									"</div>	" + 
								"</div>	" + 
							"</div>";  
				}
				
			}
			
			var attr15 = '';
			var left15 = '';
			for(var i = 430 ; i < 448;i++){

				var Sowntext = list[i].text.length>8?(list[i].text.substring(0,8)+'...'):list[i].text;
				
				
				// 子节点
				if(list[i].parentId == 0 && list[i].iconCls == 1){
					
					left15 += "<div class=\"row\" style=\"padding-left:20px;\">" + 
								"<div class=\"col-md-2 org_col \" style=\"width:155px;\">" +
									"<div class=\"SlowFast \" style=\"width:155px;float:left;\"> " +
										"<label type=\"button\" onclick=\"queryChartByCode(\'"+list[i].id+"\',\'"+list[i].text+"\')\" class=\"btn row-regionbutton\" style=\"width:125px;text-align:left;\">" +
											""+Sowntext+"" +
										"</label>" + 
									"</div>	" + 
								"</div>	" + 
							"</div>";  
					
				}else{
					attr15 += "<div class=\"row\" style=\"float:left;left:120px;\">" + 
								"<div class=\"col-md-2 org_col \" style=\"width:155px;\">" +
									"<div class=\"SlowFast \" style=\"width:155px;float:left;\"> " +
										"<label type=\"button\" onclick=\"queryChartByCode(\'"+list[i].id+"\',\'"+list[i].text+"\')\" class=\"btn row-regionbutton\" style=\"width:125px;text-align:left;\">" +
											""+Sowntext+"" +
										"</label>" + 
									"</div>	" + 
								"</div>	" + 
							"</div>";  
				}
				
			}
			
			var attr16 = '';
			var left16 = '';
			for(var i = 448 ; i < 463;i++){

				var Sowntext = list[i].text.length>8?(list[i].text.substring(0,8)+'...'):list[i].text;
				
				// 子节点
				if(list[i].parentId == 0 && list[i].iconCls == 1){
					
					left16 += "<div class=\"row\" style=\"padding-left:20px;\">" + 
								"<div class=\"col-md-2 org_col \" style=\"width:155px;\">" +
									"<div class=\"SlowFast \" style=\"width:155px;float:left;\"> " +
										"<label type=\"button\" onclick=\"queryChartByCode(\'"+list[i].id+"\',\'"+list[i].text+"\')\" class=\"btn row-regionbutton\" style=\"width:125px;text-align:left;\">" +
											""+Sowntext+"" +
										"</label>" + 
									"</div>	" + 
								"</div>	" + 
							"</div>";  
					
				}else{
					attr16 += "<div class=\"row\" style=\"float:left;left:120px;\">" + 
								"<div class=\"col-md-2 org_col \" style=\"width:155px;\">" +
									"<div class=\"SlowFast \" style=\"width:155px;float:left;\"> " +
										"<label type=\"button\" onclick=\"queryChartByCode(\'"+list[i].id+"\',\'"+list[i].text+"\')\" class=\"btn row-regionbutton\" style=\"width:125px;text-align:left;\">" +
											""+Sowntext+"" +
										"</label>" + 
									"</div>	" + 
								"</div>	" + 
							"</div>";  
				}
				
			}
			
			var attr17 = '';
			var left17 = '';
			for(var i = 463 ; i < 496;i++){

				var Sowntext = list[i].text.length>8?(list[i].text.substring(0,8)+'...'):list[i].text;
				
				// 子节点
				if(list[i].parentId == 0 && list[i].iconCls == 1){
					
					left17 += "<div class=\"row\" style=\"padding-left:20px;\">" + 
								"<div class=\"col-md-2 org_col \" style=\"width:155px;\">" +
									"<div class=\"SlowFast \" style=\"width:155px;float:left;\"> " +
										"<label type=\"button\" onclick=\"queryChartByCode(\'"+list[i].id+"\',\'"+list[i].text+"\')\" class=\"btn row-regionbutton\" style=\"width:125px;text-align:left;\">" +
											""+Sowntext+"" +
										"</label>" + 
									"</div>	" + 
								"</div>	" + 
							"</div>";  
					
				}else{
					attr17 += "<div class=\"row\" style=\"float:left;left:120px;\">" + 
								"<div class=\"col-md-2 org_col \" style=\"width:155px;\">" +
									"<div class=\"SlowFast \" style=\"width:155px;float:left;\"> " +
										"<label type=\"button\" onclick=\"queryChartByCode(\'"+list[i].id+"\',\'"+list[i].text+"\')\" class=\"btn row-regionbutton\" style=\"width:125px;text-align:left;\">" +
											""+Sowntext+"" +
										"</label>" + 
									"</div>	" + 
								"</div>	" + 
							"</div>";  
				}
				
			}
			
			var attr18 = '';
			var left18 = '';
			for(var i = 496 ; i < 509;i++){

				var Sowntext = list[i].text.length>8?(list[i].text.substring(0,8)+'...'):list[i].text;
				
				// 子节点
				if(list[i].parentId == 0 && list[i].iconCls == 1){
					
					left18 += "<div class=\"row\" style=\"padding-left:20px;\">" + 
								"<div class=\"col-md-2 org_col \" style=\"width:155px;\">" +
									"<div class=\"SlowFast \" style=\"width:155px;float:left;\"> " +
										"<label type=\"button\" onclick=\"queryChartByCode(\'"+list[i].id+"\',\'"+list[i].text+"\')\" class=\"btn row-regionbutton\" style=\"width:125px;text-align:left;\">" +
											""+Sowntext+"" +
										"</label>" + 
									"</div>	" + 
								"</div>	" + 
							"</div>";  
					
				}else{
					attr18 += "<div class=\"row\" style=\"float:left;left:120px;\">" + 
								"<div class=\"col-md-2 org_col \" style=\"width:155px;\">" +
									"<div class=\"SlowFast \" style=\"width:155px;float:left;\"> " +
										"<label type=\"button\" onclick=\"queryChartByCode(\'"+list[i].id+"\',\'"+list[i].text+"\')\" class=\"btn row-regionbutton\" style=\"width:125px;text-align:left;\">" +
											""+Sowntext+"" +
										"</label>" + 
									"</div>	" + 
								"</div>	" + 
							"</div>";  
				}
				
			}
			
			
			var attr19 = '';
			var left19 = '';
			for(var i = 509 ; i < 511;i++){

				var Sowntext = list[i].text.length>8?(list[i].text.substring(0,8)+'...'):list[i].text;
				
				// 子节点
				if(list[i].parentId == 0 && list[i].iconCls == 1){
					
					left19 += "<div class=\"row\" style=\"padding-left:20px;\">" + 
								"<div class=\"col-md-2 org_col \" style=\"width:155px;\">" +
									"<div class=\"SlowFast \" style=\"width:155px;float:left;\"> " +
										"<label type=\"button\" onclick=\"queryChartByCode(\'"+list[i].id+"\',\'"+list[i].text+"\')\" class=\"btn row-regionbutton\" style=\"width:125px;text-align:left;\">" +
											""+Sowntext+"" +
										"</label>" + 
									"</div>	" + 
								"</div>	" + 
							"</div>";  
					
				}else{
					attr19 += "<div class=\"row\" style=\"float:left;left:120px;\">" + 
								"<div class=\"col-md-2 org_col \" style=\"width:155px;\">" +
									"<div class=\"SlowFast \" style=\"width:155px;float:left;\"> " +
										"<label type=\"button\" onclick=\"queryChartByCode(\'"+list[i].id+"\',\'"+list[i].text+"\')\" class=\"btn row-regionbutton\" style=\"width:125px;text-align:left;\">" +
											""+Sowntext+"" +
										"</label>" + 
									"</div>	" + 
								"</div>	" + 
							"</div>";  
				}
				
			}
			
			var attr20 = '';
			var left20 = '';
			for(var i = 511 ; i < 515;i++){

				var Sowntext = list[i].text.length>8?(list[i].text.substring(0,8)+'...'):list[i].text;
				
				// 子节点
				if(list[i].parentId == 0 && list[i].iconCls == 1){
					
					left20 += "<div class=\"row\" style=\"padding-left:20px;\">" + 
								"<div class=\"col-md-2 org_col \" style=\"width:155px;\">" +
									"<div class=\"SlowFast \" style=\"width:155px;float:left;\"> " +
										"<label type=\"button\" onclick=\"queryChartByCode(\'"+list[i].id+"\',\'"+list[i].text+"\')\" class=\"btn row-regionbutton\" style=\"width:125px;text-align:left;\">" +
											""+Sowntext+"" +
										"</label>" + 
									"</div>	" + 
								"</div>	" + 
							"</div>";  
					
				}else{
					attr20 += "<div class=\"row\" style=\"float:left;left:120px;\">" + 
								"<div class=\"col-md-2 org_col \" style=\"width:155px;\">" +
									"<div class=\"SlowFast \" style=\"width:155px;float:left;\"> " +
										"<label type=\"button\" id=\"ahb\" onclick=\"queryChartByCode(\'"+list[i].id+"\',\'"+list[i].text+"\')\" class=\"btn row-regionbutton\" style=\"width:125px;text-align:left;\">" +
											""+Sowntext+"" +
										"</label>" + 
									"</div>	" + 
								"</div>	" + 
							"</div>";  
				}
				
			}
			
			
			
			$('#fatherHy').html(left);		
			$('#getHyList').html(attr);		
			
			$('#fatherHy1').html(left1);		
			$('#getHyList1').html(attr1);
			
			$('#fatherHy2').html(left2);		
			$('#getHyList2').html(attr2);
			
			$('#fatherHy3').html(left3);		
			$('#getHyList3').html(attr3);
			
			$('#fatherHy4').html(left4);		
			$('#getHyList4').html(attr4);
			
			$('#fatherHy5').html(left5);		
			$('#getHyList5').html(attr5);
			
			$('#fatherHy6').html(left6);		
			$('#getHyList6').html(attr6);
			
			$('#fatherHy7').html(left7);		
			$('#getHyList7').html(attr7);
			
			$('#fatherHy8').html(left8);		
			$('#getHyList8').html(attr8);
			
			$('#fatherHy9').html(left9);		
			$('#getHyList9').html(attr9);
			
			$('#fatherHy10').html(left10);		
			$('#getHyList10').html(attr10);
			
			$('#fatherHy11').html(left11);		
			$('#getHyList11').html(attr11);
			
			$('#fatherHy12').html(left12);		
			$('#getHyList12').html(attr12);
			
			$('#fatherHy13').html(left13);		
			$('#getHyList13').html(attr13);
			
			$('#fatherHy14').html(left14);		
			$('#getHyList14').html(attr14);
			
			$('#fatherHy15').html(left15);		
			$('#getHyList15').html(attr15);
			
			$('#fatherHy16').html(left16);		
			$('#getHyList16').html(attr16);
			
			$('#fatherHy17').html(left17);		
			$('#getHyList17').html(attr17);
			
			$('#fatherHy18').html(left18);		
			$('#getHyList18').html(attr18);
			
			$('#fatherHy19').html(left19);		
			$('#getHyList19').html(attr19);
			
			$('#fatherHy20').html(left20);		
			$('#getHyList20').html(attr20);
			hyIds = new Array();
			// 添加和删除样式
			$("#hy_dialog label").click(function(){
				// 获取选中的元素的class属性
				var className = $(this).attr("class");
				// 获取选中的onclick事件
				var hyId =  $(this).attr("onclick");
				// 截取取出ID
				hyId = hyId.substr(hyId.indexOf("('"));
				hyId = hyId.substr(2,hyId.indexOf("','")-2);
				if(className.indexOf("active")>0){
					$(this).removeClass("active");
					// 遍历删除取消的id
					for(var i = 0; i < hyIds.length;i++){
						if(hyIds[i] == hyId){
							hyIds.splice(i, 1);
							break;
						}
					}
				}else{
					$(this).addClass("active");
					hyIds.push(hyId);
				}
			});
		}
	});
	
}

/**
 * 点击时候添加样式 获取ID 
 */
function queryChartByCode(code,name){
	// 获取选中的ID
	codeIds += code + ",";
}

/**
 * 新增行业窗口保存确定
 */
function bt_add_commit(){
	// 数组转换成字符串
	codeIds = hyIds.join(",");
	if(codeIds.length == 0){
		$.messager.alert('提示', '请选择一个行业', 'info');
		return;
	}
	$.ajax({	
		url:webContextRoot+'tradeUpAndDown/insertConsTradeRecord.action',
		data:{
			'consId': consId,
			'type': type,
			'codeIds': codeIds
		},
		dataType:'json',
		type:'post',
		success:function(result){
			if(result.flag=='success'){
				$.messager.alert('提示', '新增成功', 'info');
				if(type==1){
					$('#up_datagrid').datagrid('load',{
						'consId':consId,
						'type':type
					});
				}else{
					$('#down_datagrid').datagrid('load',{
						'consId':consId,
						'type':type
					});
				}
				$("#hy_dialog").dialog("close");
			}else if(result.flag=='repeat'){
				$.messager.alert('提示', '同一个客户不能关联同一行业多次', 'info');
			}else if(result.flag=='more'){
				$.messager.alert('提示', '同一个客户最多关联5个行业', 'info');
			}else{
				$.messager.alert('提示', '新增失败', 'info');
				$("#hy_dialog").dialog("close");
			}
		}
	});
}

/**
 * 新增行业窗口取消
 */
function bt_add_cancel(){
	$("#hy_dialog").dialog("close");
}

/**
 * 行业窗口关闭  行业树表格折叠 清除选中
 */
function closedialog(){
	$("#hyTree").treegrid("clearChecked");
	$("#hyTree").treegrid("collapseAll");
}