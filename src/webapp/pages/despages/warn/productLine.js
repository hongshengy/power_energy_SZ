/**
 * 用能单元管理
 * @author 王梓璇
 * @since 2017-05-08
 */

//var consName = '';//模糊查询客户名称
var scxName = '';//用能单元名称
var khName = '';//客户名称
var bzName = '';//设备名称
var editType = '';//修改类型  A代表增加，U代表修改，D代表删除
var shebeiCode='';//设备id
var shebeiType='';//设备Type
var updateObjects = '';//修改之前的内容
var lineId = '';//设备id，用于修改
var devIdArr = new Array() ;//设备id数组 
var nodeTypea = '1';//选择区域的时候，不能新增，默认选择的客户
var typeYndy = '';//用能单元的选择类型 取自pcode70062
var status = '';//运行状态
var gjxxpzDatagrid = null;
var consSelectAllCons = null;//所有的客户
var consSelectHistoryCons = null;//历史记录里的客户
var consSelectCon = null;//选中的客户
//var consId = '';
//自适应
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
	var gridCommon = [[
	       	        {field:'consNo',title:'客户编号',width: 100,align:'left'},
	       	        {field:'consName',title:'客户名称',width: 100,align:'left'},
	       	 		{field:'energyCellName',title:'用能单元名称',width: 100,align:'left',formatter: function(v,row,index){ //超链接
	       	 			 return '<a href="#" style="color:blue;margin-left:5px" onclick="queryNewsDes('
	       			        +"'"+row.enegryCellId+"','"+escape(row.energyCellName)+"','"+row.consName+"'"
	       					+ ')'
	       	 				 +'">'
	       	 				+ HTMLEncode(v)
	       	 				+ '</a>';
	        		    }},	 		
	       	 		{field:'energyCellTypeName',title:'用能单元类型',width: 100,align:'left'},
	       	 		{field:'status',title:'运行状态',width: 100,align:'left',formatter: function(v,row,index){
	       	 			if(row.status == 0){
	       	 				return '停用';
	       	 			}else if(row.status == 1){
	       	 				return '启用';
	       	 			}
	       	 			}},
	       	 		{field:'memo',title:'备注',width: 200,align:'left'}
	        		]];
	$('#gjxxpz-datagrid').datagrid({// 表格
		nowrap : false,// 设置为true，当数据长度超出列宽时将会自动截取。
		striped : true,// 设置为true将交替显示行背景。
		fit: true,
		border:false,
		pageNumber:1,//在设置分页属性的时候初始化页码。
		pageSize:20,//在设置分页属性的时候初始化页面大小。
		tools:"#btThrees",
		pagination : true,// 设置true将在数据表格底部显示分页工具栏。
		fitColumns : true,// 自动适应宽度
		singleSelect : true,// 设置为true将只允许选择一行。
		rownumbers : true,// 设置为true将显示行数。
		queryParams:{
		},
		columns : gridCommon,
	});
//	 if(consId==null || consId==''|| consId=="null"){//未获取到企业编码，加载左侧树
//	$('#tree-leftQyTree').tree({ //默认没参数，获取区域  企业  都是打开状态
//		url:webContextRoot +'destree/queryTree.action',
//	    method:'get',
//	    multiple:false,//是否支持多选
//	    editable:'true',
//	    onClick: function(node){
//	    	nodeTypea = node.type;
//	    	consId = node.id;//把树节点id赋给企业id
//			consName = node.text;//把树节点的值赋给企业名称
//			queryGjxxpzData();
//		},
//		onLoadSuccess:function(node, data){//加载成功返回
//	    	$('#tree-leftQyTree li:eq(0)').find('div').addClass("tree-node-selected");//添加选中样式
//			var n = $('#tree-leftQyTree').tree('getSelected');//获取被选中的节点
//			if(n!=null)//判断节点是否存在
//			{
//				$('#tree-leftQyTree').tree('select',n.target);
//			}
//			var chiNode = $('#tree-leftQyTree').tree('getChildren',n.target);//子节点
//			for(var i=0 ; i < chiNode.length ; i++)//循环节点
//		    {
//				nodeTypea = chiNode[i].type;
//		       if(chiNode[i].type==1)//查找第一个类型为1的 用户
//			   {
//	          	   	var n = $('#tree-leftQyTree').tree("find",chiNode[i].id);//根据id获取节点
//	          	   	$('#tree-leftQyTree').tree('select',n.target);//选中节点
//	          	    consId = chiNode[i].id;//把树节点id赋给企业id
//	          	    consName = chiNode[i].text;//把树节点的值赋给企业名称
//	          	    queryGjxxpzData();
//	          	   	break;//跳出循环
//		       }
//		    }
//		}
//	});
//	searchTreeNode();
//	 }else{
//		 queryGjxxpzData();
//	}

	if(consId==null || consId==''|| consId=="null"){//未获取到企业编码，加载左侧树
//		$('#tree-leftQyTree').tree({ //默认没参数，获取区域  企业  都是打开状态
//			url:webContextRoot +'destree/queryTree.action',
//		    method:'get',
//		    multiple:false,//是否支持多选
//		    editable:'true' ,
//		    onClick: function(node){
//		    	// 获取根节点
//		    	var rootNode = $('#tree-leftQyTree').tree('getRoot',node.target);
//		    	// 不是根节点时，刷新页面
//		    	if(rootNode.id != node.id){
//	//				consId = node.id;
//	//				consName = node.text;
//	//				queryUserFiles(consId);
//			    	nodeTypea = node.type;
//			    	consId = node.id;//把树节点id赋给企业id
//					consName = node.text;//把树节点的值赋给企业名称
//					queryGjxxpzData();
//		    	}else{
//		    		$('#gjxxpz-datagrid').datagrid("loadData",{total:0,rows:[]});
//		    		consId = "";//把树节点id赋给企业id
//					consName = "";//把树节点的值赋给企业名称
//		    		$.messager.alert('提示', '请选择客户', 'warning');		    	
//		    	}
//			},
//			onLoadSuccess:function(node, data){//加载成功返回
//				selectTree();//设置树默认选中节点
//			}
//		});
		consSelectMethod = "consSelectMethodLoad()";//定义选中后执行的方法
		consSelectHasRoot = true;//是否有区域能源根节点
		consSelectSearch("",true);
		 //树模糊检索
//		searchTreeNode();
		
		//设置选择客户后执行的方法
//		consSelectMethod = "queryGjxxpzData()";
		//加载客户(url,是否需要区域能源根节点,没有客户时给出的提示)
//		consSelect(webContextRoot + "destree/queryTree.action",false,'请先创建客户');
	}else{
		queryGjxxpzData();
	}
   //书写客户名称，模糊查询
	$('#consName').textbox({ 
	    iconAlign:'left',
	    onChange:function(newValue, oldValue){
	    	consName = newValue;
		} ,
	});
	 //用能单元名称
	$('#scxName').textbox({    
	    iconAlign:'left',
	    onChange:function(newValue, oldValue){
	    	scxName = newValue;
		} 
	});
	 //用能单元备注
	$('#bzName').textbox({    
	    iconAlign:'left',
	    onChange:function(newValue, oldValue){
	    	bzName = newValue;
		} 
	});
	
	 //弹出的新闻类型  取自pcode70045
	$('#typeyndy').combobox({ 
		panelWidth: null,
		height: 24,
		editable: false,
		url:webContextRoot +'pCode/queryCode.action?codeSortId=70062',
		valueField: 'codeValue',
		textField: 'codeName' ,
		onChange: function(newValue, oldValue){
			typeYndy = newValue;
		}
	});
	
	
	
	//日期选择框下拉
	   $('#statusyndy').combobox({
		 panelWidth: null,
		 height: 24,
		 valueField:'id',
	     textField:'text',
		 editable: false,
    onSelect: function(rec){
	  status = rec.id;//数据查询类型
		},
	onLoadSuccess:function(){
     	$('#statusyndy').combobox('select','1');
 	},
 	data: [{
			id: '0',
			text: '停用',
			selected:true   
		},{
			id: '1',
			text: '启用'   
		}]
    }); 
}); 

function consSelectMethodLoad(){
	if(consSelectCon.id.length < 4){	// 区域能源节点
		$("#clickTree").hide();
		$("#contentId").show();
		content='<iframe id="funcId" src="'+webContextRoot+'pages/despages/warn/productLinePandect.jsp?orgNo='+consSelectCon.id+'" scrolling="no" frameborder="0" width="100%" height="100%"></iframe>'; 
		$("#contentId").empty();
		$('#contentId').append(content);
	}else{		// 企业节点
		$("#contentId").hide();
		$("#clickTree").show();
		consId = consSelectCon.id;//把树节点id赋给企业id
		consName = consSelectCon.text;//把树节点的值赋给企业名称
		queryGjxxpzData();
	}
}
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
          	    queryGjxxpzData();
          	   	break;//跳出循环
          }
    }
}
/**
 * 列表数据
 * @param {} corporationId
 */
  function queryGjxxpzData(){
	  
//  	  consId = consSelectCon.id;//把树节点id赋给企业id
//	  consName = consSelectCon.text;//把树节点的值赋给企业名称
	  
	  
	  if(gjxxpzDatagrid == null){
		  gjxxpzDatagrid = $('#gjxxpz-datagrid').datagrid({// 表格
				nowrap : false,// 设置为true，当数据长度超出列宽时将会自动截取。
				striped : true,// 设置为true将交替显示行背景。
				fit: true,
				border:false,
				pageNumber:1,//在设置分页属性的时候初始化页码。
				pageSize:20,//在设置分页属性的时候初始化页面大小。
				tools:"#btThrees",
				pagination : true,// 设置true将在数据表格底部显示分页工具栏。
				fitColumns : true,// 自动适应宽度
				singleSelect : true,// 设置为true将只允许选择一行。
				rownumbers : true,// 设置为true将显示行数。
				url:webContextRoot +'productionLine/queryPls.action',
				queryParams:{
					'productLineModel.consId' : consId,//trim()掉多余空格
				},
				onLoadSuccess : function() {// 加载数据之后
					$('#gjxxpz-datagrid').datagrid('selectRow', 0); // 选择第一行
				},
				loadMsg : "正在努力的读取数据中...",// 提示信息
				loadFilter: function(data){
					if (data.sMap){
						return data.sMap;
					} else {
						return data;
					}
				}
			});
	  }else{
		  $("#gjxxpz-datagrid").datagrid("load",{
			  'productLineModel.consId' : consId,//trim()掉多余空格
			});
	  }
	
}

//点击新闻标题查看新闻具体信息
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

//加载设备树
function loadSbTree(){
	 
	 $('#usershebeiTree').combotree({ //默认没参数，获取区域  企业  都是打开状态
			url:webContextRoot +'destree/queryYhbTree.action?treeState=open'
			 +'&isAllTreeNode=true&treeNodeType=1&checkNodeList='+devIdArr+'&id='+consId,
		    method:'get',
		    multiple:true,//是否支持多选
		    editable:false,
//		    onBeforeSelect : function(node) {
//				var treeNodeType;
//				if (node) {// 点击节点
//					treeNodeType = node.type;// 获取节点类型
//					if (treeNodeType == "2" || treeNodeType == "3"
//							|| treeNodeType == "4"
//							|| treeNodeType == "8") {
//						$.messager.alert('警告', '非法选择，请选择设备！');
//						return false;
//						$('#usershebeiTree').combobox("clear");
//					}
//				}
//			}
		});
	
//	//根据企业节点下一级
//	 $.getJSON(webContextRoot +'destree/queryYhbTree.action?treeState=open'
//			 +'&isAllTreeNode=true&treeNodeType=1&checkNodeList='+devIdArr+'&id='+consId,{},
//		function(json){
//			 devIdArr=null;//清空选中节点状态
//			 $('#usershebeiTree').combotree({
//			    multiple:true,//是否支持多选
//				data:json
//			 });
//		}
//	);
}

//增加按钮点击事件
function add(){
	if(nodeTypea==0){
		return;
	}else{
		qingkong();
		loadSbTree();//加载设备树
		editType = 'A';//A代表增加
		if(consId != ""){
			$('#gjxxpz-cl-panel').dialog('open');
			$('#gjxxpz-cl-panel').dialog('setTitle','新增');	
		}else{
			$.messager.alert('提示', '请选择客户', 'warning');
		}		
	}
	
}
//保存按钮事件
function cxSave(){
	shebeiCode='';//设备id
	shebeiType='';//设备类型
	//5,6,7,9 类型的为设备
	var rows  = $('#usershebeiTree').combotree('tree').tree('getRoots'); 
	if(rows != null && rows.length>0){
	   findAllshebei(rows);
	}
	//添加数据
	if(editType == 'A'){//A代表增加
		if(checkCanSave()){//校验是否为空
			saveGjpzDate('保存');	
		}
	}else{//修改数据
		if(checkCanSave()){
			saveGjpzDate('修改',updateObjects);
		} 
	} 
}
 
//所有选中的设备
function findAllshebei(rows){
	
	for(var i=0;i<rows.length;i++){
		if(rows[i].checked==true){
//			if(rows[i].type=='5'||rows[i].type=='6'||rows[i].type=='7'||rows[i].type=='9'){//5,6,7,9 类型的为设备
			if(parseInt(rows[i].type)>2 && parseInt(rows[i].id.length)==12){
				shebeiCode+=rows[i].id+',';
				shebeiType += rows[i].type+',';
			}
		}
		
		if(rows[i].children!=null && rows[i].children!='' && rows[i].children.length>0){
			findAllshebei(rows[i].children);
		}
	}
}

//新增修改状态判断是否可以保存
function checkCanSave(){
	//判断是否有值
	if($.trim($('#scxName').textbox('getValue')) =='' || $.trim($('#scxName').textbox('getValue')) == null || $.trim($('#scxName').textbox('getValue')) == 'null'){
		 $.messager.alert('提示', "用能单元名称不能为空！", 'info', function(){
			$('#scxName').textbox('textbox').focus();
//			$('#scxName').textbox('showPanel');
	     });
		 return false;
	}
	else if($('#scxName').textbox('getValue')!= null && $('#scxName').textbox('getValue').length>16){
		$.messager.alert('提示', "用能单元名称最多不能超过16字！", 'info', function(){
//			$('#clsm').combobox('textbox').focus();
//			$('#clsm').combobox('showPanel');
    	});
		return false;
	}  
 //新闻内容
	else if($('#usershebeiTree').combotree('getValue')=='' ||$('#usershebeiTree').combotree('getValue')==null){
		$.messager.alert('提示', "请选择设备！", 'info', function(){
			$('#usershebeiTree').combobox('textbox').focus();
//			$('#usershebeiTree').combobox('showPanel');
    	});
		return false;
	}
	else if($('#typeyndy').combobox('getValue') == '' || $('#typeyndy').combobox('getValue') == null){
		$.messager.alert('提示', "用能单元类型不能为空！", 'info', function(){
			$('#typeyndy').combobox('textbox').focus();
//			$('#typeyndy').combobox('showPanel');
    	});
		return false;
	} 
	
	else if($('#statusyndy').combobox('getValue') == '' || $('#statusyndy').combobox('getValue') == null){
		$.messager.alert('提示', "运行状态不能为空！", 'info', function(){
			$('#statusyndy').combobox('textbox').focus();
//			$('#statusyndy').combobox('showPanel');
    	});
		return false;
	} 
	else if($('#bzName').textbox('getValue')!= null && $('#bzName').textbox('getValue').length>60){
		$.messager.alert('提示', "备注最多不能超过60字！", 'info', function(){
			$('#bzName').combobox('textbox').focus();
//			$('#bzName').combobox('showPanel');
    	});
		return false;
	}else if(shebeiCode == "" && shebeiType==""){
		$.messager.alert('提示', "请选择设备！", 'info', function(){
    	});
		return false;
	} 
	
	return true;//能够保存
}
  
//保存数据
function saveGjpzDate(editTypeName,rows){
	 
	var lineId = null;//线路ID
	if(rows != null){//修改的时候传入被修改的记录
		lineId = rows.enegryCellId;//线路ID
	}
	//保存操作
	$.getJSON(webContextRoot + 'productionLine/saveProductLine.action',
			{ 
				'productLineModel.enegryCellId' : lineId,
				'productLineModel.consId' : consId,
				'productLineModel.energyCellName' : $.trim(scxName),//用能单元名称
				'productLineModel.memo': $.trim(bzName),//备注名称
				'productLineModel.energyCellType' : typeYndy,//用能单元名称
				'productLineModel.status': status,//备注名称
				'productLineModel.devId': shebeiCode,
				'productLineModel.devType':shebeiType,
				'productLineModel.editType': editType
			},
			function(json){
				 if(json.saveSUCCESS=="true")
				    {
				    	$.messager.alert('确认', editTypeName+"成功！", 'info', function(r){
				    		queryGjxxpzData();
				    		$('#gjxxpz-cl-panel').dialog('close');
				    	});
				    }
			    	else
			    	{
			    	 	$.messager.alert('确认', editTypeName+"失败！", 'warning');//移除失败
			    	}
			}
		);
}
//修改数据
function updateGjpz(){
	editType = 'U';//U代表修改状态
	var rows = $('#gjxxpz-datagrid').datagrid("getSelected");
	if(rows==null){
		$.messager.alert('提示', "请选择一条信息！", 'warning');
	}else{
		qingkong();
		var listD = rows.listDev;//这是设备的所有集合
		devIdArr ='';//设备id数组 
		for(var i=0;i<listD.length;i++){//循环集合、、
//			devIdArr.push(Number(listD[i].devId));
			devIdArr += listD[i].devId;
			if(i!=listD.length-1){
				devIdArr += ',';
			}
		}
		$('#gjxxpz-cl-panel').dialog('open');
		$('#gjxxpz-cl-panel').dialog('setTitle','修改');
		$('#scxName').textbox('setValue',rows.energyCellName);//用能单元名称
		$('#bzName').textbox('setValue',rows.memo);//用能单元备注
		$('#typeyndy').combobox('setValue',rows.energyCellType);//用能单元备注
		$('#statusyndy').combobox('setValue',rows.status);//用能单元备注
		loadSbTree();//加载设备树
		updateObjects = rows;
	}
} 

//删除记录
function deleteGjpz(){
	editType = 'D';//D代表删除
	var rows = $('#gjxxpz-datagrid').datagrid("getSelected");
	if(rows==null){
		$.messager.alert('提示', "请选择一条信息！", 'warning');
	}else{
		$.messager.confirm('提示', "是否要删除数据?", function(r){
			if(r){
				$.getJSON(webContextRoot + 'productionLine/saveProductLine.action',
						{ 
							'productLineModel.enegryCellId' : rows.enegryCellId,
							'productLineModel.editType': editType
						},
						function(json){
							if(json.saveSUCCESS=="true")
						    {
							    $.messager.alert('确认', "删除成功！", 'info', function(r){
						    		queryGjxxpzData();
						    	});	 
						    }
					    	else
					    	{
					    	 	$.messager.alert('确认', "删除失败！", 'warning');//移除失败
					    	 	
					    	}
						}
					);
			}
			
		});	 
	}
} 
function cxClose(){
	$('#gjxxpz-cl-panel').dialog('close');	
}

//清空
function qingkong(){
	devIdArr ='';//设备id数组 
	$('#scxName').textbox('setValue','');//用能单元名称
	$('#bzName').textbox('setValue','');//用能单元备注
	$('#typeyndy').combobox('setValue','');//用能单元备注
	$('#statusyndy').combobox('setValue','');//用能单元备注
	$('#usershebeiTree').combotree('setValue','');//设备树
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