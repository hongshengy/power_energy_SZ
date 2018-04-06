/**
 * 费率配置
 */
//Ext.namespace('com.frontier.eems.eemspages.flpz');
//Ext.Ajax.timeout = 200000;
var scrollWid = 16;//滚动条宽度
var tbarMainHt = 117;//固定条件览高度
var comData = [];//所有下拉框的值
var phaseType =[]; //费率时段类型 下拉框的值
var tFlag = false;//判断表格是否有值
var pNames = [];//费率时段名称
var pType = [];//费率时段类型
var pTypeValue = [];//费率时段类型值
var pTimeValue = [];//费率时段
var allPtime = [];//费率时段，传到后台的格式
var priceValue = [];//价格
var energyType = 50049;
var uenergyType = 50049;
var energyFlag = 1;
var operationType = 'A';//操作类型
var clearTimeoutFlag;//临时变量  
var priceTagId = "";
var dateValue = [{value:'0',text:'0',selected:true},{value:'1',text:'1'},{value:'2',text:'2'},{value:'3',text:'3'},{value:'4',text:'4'},{value:'5',text:'5'}
				,{value:'6',text:'6'},{value:'7',text:'7'},{value:'8',text:'8'},{value:'9',text:'9'},{value:'10',text:'10'},{value:'11',text:'11'},{value:'12',text:'12'}
				,{value:'13',text:'13'},{value:'14',text:'14'},{value:'15',text:'15'},{value:'16',text:'16'},{value:'17',text:'17'},{value:'18',text:'18'},{value:'19',text:'19'}
				,{value:'20',text:'20'},{value:'21',text:'21'},{value:'22',text:'22'},{value:'23',text:'23'},{value:'24',text:'24'}]//费率时段下拉框值
				
var fhfx_static={
	queryElecId:0,//电 
	queryWorterId:0 , //水
	queryNatgasId:0,//天然气
	queryReekId:0 //水蒸气
}
//var consId = null;
//var consName = '';
var userTree = 50050;
var uuserTree = 50050;
var pageSize = 20; //datagrid页面显示行数

	$(function(){
	    //com.frontier.eems.eemspages.flpz.getComData();
		getComData();
		/**
		 * 自定义检验类型 
		 */
		$.extend($.fn.validatebox.defaults.rules, {
			floatNumber:{
				validator:function(value,param){
					return isFloat(value);
				},
				message:'请输入正数'
			}
		});
		
		var buttons = $.extend([], $.fn.datebox.defaults.buttons);
		buttons.splice(1, 0, {
			text: '清空',
			handler: function(target){
				$(target).datebox("setValue","");
				$(target).datebox("hidePanel");
			}
		});
		
		$("#endTimeId").datebox({
			buttons:buttons
		});

	});
	
	/*
	 * 窗口大小改变
	 * 内部的相应改变大小
	 */
	window.onresize = function() {
		 dealDivWidHt();
	}
	
	/*
	 * 处理页面单个主要div的高宽
	 * --以1024*768为准，
	 * 能够完整显示一个图形
	 * 小于这个标准则会出现滚动条
 	*/
	function dealDivWidHt() {
		//var extViewWid = Ext.lib.Dom.getViewWidth()-35;//实际宽度 减去左边树宽度
	    //var extViewHt = Ext.lib.Dom.getViewHeight()-tbarMainHt-165;//实际高度
	    //var mainViewHt = Ext.lib.Dom.getViewHeight();//实际高度
		var extViewWid = document.body.scrollWidth - 35; //实际宽度 减去左边树宽度
		var extViewHt = document.body.scrollHeight - tbarMainHt - 190;//实际高度
		var mainViewHt = document.body.scrollHeight;//实际高度
//	    	document.getElementById('mainPanel').style.width = extViewWid+ 'px';
			document.getElementById('mainPanel').style.height = mainViewHt+ 'px';
	    
		if(self.document.getElementById('elecId') != undefined && energyFlag==1){//电
			document.getElementById('pelecId').style.width = extViewWid+ 'px';
			document.getElementById('pelecId').style.height = extViewHt+ 'px';
			$('#elecId').datagrid('resize');
		}
		if(self.document.getElementById('worterId') != undefined && energyFlag==2){//水
			document.getElementById('pworterId').style.width = extViewWid+ 'px';
			document.getElementById('pworterId').style.height = extViewHt+ 'px';
			$('#worterId').datagrid('resize');
		}
		if(self.document.getElementById('natgasId') != undefined && energyFlag==3){//天然气
			document.getElementById('pnatgasId').style.width = extViewWid+ 'px';
			document.getElementById('pnatgasId').style.height = extViewHt+ 'px';
			$('#natgasId').datagrid('resize');
		}
		if(self.document.getElementById('reekId') != undefined && energyFlag==4){//水蒸气
			document.getElementById('preekId').style.width = extViewWid+ 'px';
			document.getElementById('preekId').style.height = extViewHt+ 'px';
			$('#reekId').datagrid('resize');
		}
	}
	
	/**
		初始化加载所有的下拉框的值
	*/
	//com.frontier.eems.eemspages.flpz.getComData = function(){
	function getComData(){
		$('#phaseType').combobox({
			url:webContextRoot +'pCode/queryCode.action?codeSortId=70050',
			valueField: 'codeValue',
			textField: 'codeName'   
		});
		
		$('#energyType').combobox({
			url:webContextRoot +'pCode/queryCode.action?codeSortId=70049',
			valueField: 'codeValue',
			textField: 'codeName'   
		});
		
		$('#uenergyType').combobox({
			url:webContextRoot +'pCode/queryCode.action?codeSortId=70049',
			valueField: 'codeValue',
			textField: 'codeName'   
		});
		
		//新增的用户树
		$('#userTree').combobox({
			url:webContextRoot +'destree/queryConsList.action',
		    //method:'get',
		    panelWidth: 200,
		    //multiple:false,//是否支持多选
		    valueField: 'id',
			textField: 'text',
//			onChange: function(newValue, oldValue){
//		    	
//		    	if(newValue != ''){
//					 newValue = $('#userTree').combobox('getText');
//						$.getJSON(webContextRoot + 'destree/queryTree.action?isQyCode=false&ziMu='+newValue,{ 
//								},
//								function(json){
//									$('#userTree').combobox('loadData',json);	
//								}
//										);
//		    	}else{
//		    		newValue = $('#userTree').combobox('getText');
//					$.getJSON(webContextRoot + 'destree/queryTree.action?isQyCode=false&ziMu=',{ 
//							},
//							function(json){
//								$('#userTree').combobox('loadData',json);	
//							}
//					);
//					
//		    	}
//			},
			mode : 'remote',
			onHidePanel : function(){$('#userTree').combobox('reload');}
		});
		
		//修改的用户树
		$('#uuserTree').combobox({    
			url:webContextRoot +'destree/queryConsList.action',
		    //method:'get',
		    panelWidth: 200,
		    //multiple:false,//是否支持多选
			valueField: 'id',
			textField: 'text',
		    /*onChange: function(newValue, oldValue){
		    	if(newValue.length>0){
		    	    //var tempConsId = newValue.toString();
		    	    var tempConsId = newValue.join();
		    	    consId = tempConsId.replace(/-/g,'');
		    	}else{
		    		consId=null;
		    	}
		    	consName = $('#userTree').combobox('getValue');
			}*/
		});
		
		$('#phaseType').combobox('setValue', '1'); //费率时段类型   默认选择全天
		$('#beginDate').combobox('loadData', dateValue); //费率时段
		$('#endDate').combobox('loadData', dateValue); //费率时段
		$('#endDate').combobox('setValue', '24'); //费率时段
	}
	
	/**
	 * 初始化 
	 */
	//com.frontier.eems.eemspages.flpz.initLoad = function(){
	function initLoad(){
		  $('#feilv-tabs').tabs({  
			onSelect: function(title,index){ 
				if(index == "0"){
					refreshShow("dltr1","dltr2");
//					if(fhfx_static.queryElecId==0){
					       //com.frontier.eems.eemspages.flpz.initElecData('1','elecId');//点击的是电的
						   initElecData('1','elecId');//点击的是电的
//					       fhfx_static.queryElecId=1;
//					}
					energyFlag = 1;
				}
				else if(index == "1"){
					refreshShow("str1","str2");
//					if(fhfx_static.queryWorterId==0){
					        //com.frontier.eems.eemspages.flpz.initElecData('2','worterId');//点击的是水的
					        initElecData('2','worterId');//点击的是水的
//					        fhfx_static.queryWorterId=1;
//					}
					energyFlag = 2;
				}
				else if(index == "2"){
					refreshShow("trqtr1","trqtr2");
//					if(fhfx_static.queryNatgasId==0){
				 			//com.frontier.eems.eemspages.flpz.initElecData('3','natgasId');//点击的是天然气的
				 			initElecData('3','natgasId');//点击的是天然气的
//				 			fhfx_static.queryNatgasId=1;
//					}
				    energyFlag = 3;
				}
				else if(index == "3"){
					refreshShow("szqtr1","szqtr2");
//					if(fhfx_static.queryReekId==0){
					       //com.frontier.eems.eemspages.flpz.initElecData('4','reekId');//点击的是水蒸气的
					       initElecData('4','reekId');//点击的是水蒸气的
//					       fhfx_static.queryReekId=1;
//					}
					energyFlag = 4;
				}
				 dealDivWidHt(); 
			 }
		});
		
		//com.frontier.eems.eemspages.flpz.getComData();
		getComData();
		//com.frontier.eems.eemspages.flpz.initElecData('1','elecId');//点击的是电的
		initElecData('1','elecId');//点击的是电的
		refreshShow("dltr1","dltr2");
		//com.frontier.eems.eemspages.flpz.queryBiaoMei();
		queryBiaoMei();
		dealDivWidHt();
	} 
	
		/**
		区分内外网的增删改的显示情况
	*/
	function refreshShow(id1,id2){
		if(self.document.getElementById(id1) != undefined && self.document.getElementById(id2) != undefined){
			clearTimeout(clearTimeoutFlag);
			if(eems=='0'){//外网
	   			self.document.getElementById(id1).style.display = '';
	   			self.document.getElementById(id2).style.display = "none";
	   		}
	   		else{//内网
	   			self.document.getElementById(id1).style.display = "none";
	   			self.document.getElementById(id2).style.display = '';
	   		}
		}
		else{//刷新
				clearTimeout(clearTimeoutFlag);//清除setTimeout
				clearTimeoutFlag = setTimeout(function(){//等待300毫秒之后再次判断
				return refreshShow(id1,id2)
			},300);//等待300毫秒之后再次判断
		}
	}
	
	/**
		查询电设备的列表数据
		energyType    能源类型
		id            加载的主页面
	*/
	//com.frontier.eems.eemspages.flpz.initElecData = function(energyType,id){
	function initElecData(energyType,id){
		energyFlag = energyType;
		//com.frontier.eems.eemspages.flpz.createGrid(id);
		createGrid(id);
		$('#'+id).datagrid("loading");//loading画面
		$.post(webContextRoot +'flpz/queryPriceTag.action', //请求路径
		{
		 	'operationPriceTagModel.operationType': "Q",//操作类型 查询
		 	'operationPriceTagModel.energyType': energyType//能源类型
		},
	   	function(data){//回调
			//获取datagrid设置的pagesize
//			var newPageSize = $('#'+id).datagrid('getPager').data('pagination').options.pageSize;
//			pageSize = newPageSize==10?20:newPageSize;
			
		   	$('#'+id).datagrid("loaded");//loading画面关闭
	   		if(data.length>0){
		   		$('#'+id).datagrid('loadData', data.slice(0,20));//加载数据
			 	$('#'+id).datagrid('selectRow',0);//选择第一行
	   		}
	   		else{
		   		$('#'+id).datagrid('loadData', []);//加载数据
		   	}
	   		//前台分页
			var pager = $('#'+id).datagrid("getPager");
			pager.pagination({
				total:data.length,
				pageSize:pageSize,
				pageList: [20,30,50],//可以设置每页记录条数的列表  
				beforePageText:'第',
				afterPageText:'页 共 {pages} 页',
				displayMsg:'当前显示 {from} - {to} 条记录,共 {total} 条记录',
				onSelectPage:function(pageNo,pageSize){
					var start = (pageNo-1)*pageSize;
					var end = start+ pageSize;
					$('#'+id).datagrid('loadData',data.slice(start,end));
					pager.pagination('refresh',{
						total:data.length,
						pageNumber:pageNo
					});
				},
				onChangePageSize:function(size){
					pageSize = size;
				}
			});
	   	},
		"json");//返回格式
	}
	
	/**
		创建表格
	*/
	//com.frontier.eems.eemspages.flpz.createGrid = function(id){
	function createGrid(id){
		$('#'+id).datagrid({// 表格
			singleSelect : true,// 设置为true将只允许选择一行。
			nowrap : false,// 设置为true，当数据长度超出列宽时将会自动截取。
			striped : true,// 设置为true将交替显示行背景。
			border:false,
			pagination : true,// 设置true将在数据表格底部显示分页工具栏。
		  	fitColumns : true,// 自动适应宽度
			rownumbers : true,// 设置为true将显示行数。
			onLoadSuccess : function() {// 加载数据之后
				$('#'+id).datagrid('selectRow', 0); // 选择第一行
			},
			loadMsg : "正在努力的读取数据中...",// 提示信息
			columns : [[
				{field:'priceTagName',title:'费率名称',rowspan:2,width:'20%',align:'left',
					formatter : function(value, row, index){
						return HTMLEncode(value);
					}
				},
				{title:'费率执行时段' ,colspan:2,width:'20%'},
				{field:'energyTypeName',title:'能源类型',rowspan:2,width:'10%',align:'center'},
//				{field:'demandPrice',title:'需量电价（元）',rowspan:2,width:100,align:'center'},
//				{field:'capacityPrice',title:'容量电价（元）',rowspan:2,width:100,align:'center'},
				{field:'operationTime',title:'费率时段',rowspan:2,width:'20%',align:'left'},
				{field:'operationPrice',title:'费率时段价格（元）',rowspan:2,width:'10%',align:'left',
					formatter:function(value,row,index){
						var content = '';
						var abValue = value+'';
						if(value != undefined){
							content = '<a title="'+abValue+'" class="easyui-tooltip">'+abValue+'</a>'
						}
						return content;
					}
				},
				{field:'remark',title:'备注',rowspan:2,width:'20%',align:'center',
					formatter : function(value, row, index){
						return HTMLEncode(value);
					}
				},
				]
				,
				[
					{field:'priceStartTime',title:'开始时间',width:'10%',align:'center'},
					{field:'priceEndTime',title:'结束时间',width:'10%',align:'center'}
				]
			]//字段
		})
	}
	
	/**
		弹出费率新增页面
	*/
	//com.frontier.eems.eemspages.flpz.addFlxzPage = function(value){
	function addFlxzPage(value){
		tFlag = false;
		operationType = "A";
		$('#tableForm').form('clear');
		$("#tableId tbody").html("");
		$('#phaseType').combobox('setValue', '1');
		$('#pNameId').textbox('setValue',$('#phaseType').combobox('getText'));
		if(value != '1'){
			$('#demandPriceId').textbox('disable');
			$('#capacityPriceId').textbox('disable');
		}
		else{
			$('#demandPriceId').textbox('enable');
			$('#capacityPriceId').textbox('enable');
		}
		$('#dlg-feilv').dialog('open');
		//$('#energyType').combobox('loadData', comData[energyType]); //能源类型
		$('#energyType').combobox('setValue', value); 
		$('#dlg-feilv').dialog('setTitle',"添加费率");
		if(consId == ''){
			$('#userTree').combobox({
				disabled:false
			});
		}else{
			$('#userTree').combobox({
				disabled:true
			});
			$('#userTree').combobox('setValue',consId);
		}
		
		$('#beginDate').combobox('setValue', '0'); //费率时段
		$('#endDate').combobox('setValue', '24'); //费率时段
		
	}
	
	/**
		动态添加费率时段
	*/
	//com.frontier.eems.eemspages.flpz.addPhase = function(){
	function addPhase(){
		if($('#pFormId').form('validate')){
			var pTime1 =  $('#beginDate').combobox('getValues');//开始时间
			var pTime2 =  $('#endDate').combobox('getValues');//结束时间
			if(Number(pTime2)<=Number(pTime1)){
				$.messager.alert('确认', "结束时间不能小于开始时间，请确认！", 'warning');
				return;
			}
			var pName = $('#pNameId').val();//费率名称
			var pTypeValue = $('#phaseType').combobox('getValues');//费率类型值
			var pTypeText = $('#phaseType').combobox('getText');//费率类型
			var price = $('#priceId').val();//费率价格
			//判断表格是否有值
			if(tFlag){
				getTableValue();
				
				if(pType.indexOf("全天")>-1 || pTypeText == '全天'){
					$.messager.alert('确认', "添加正确的费率时段类型，请确认！", 'warning');
					return;
				}
				//不是全天的 不能有重复的费率时段  费率名称不能重复
				else{
					if(pNames.indexOf(pName)>-1){
						$.messager.alert('确认', "费率时段名不能重复，请确认！", 'warning');
						return;
					}
					//本次添加的时段
					for(var i=Number(pTime1);i<Number(pTime2);i++){
						var index = pTimeValue.indexOf(i);
						if(index>-1){
							$.messager.alert('确认', "费率时段不能重复，请确认！", 'warning');
							return;
						}
					}
				}
			}
			//费率类型为全天的 费率时段是0-24
			if(pTypeText == '全天'){
				if(pTime1 !=0 || pTime2 != 24){
					$.messager.alert('确认', "费率类型全天的费率时段是0-24小时，请确认！", 'warning');
					return;
				}
			}
			var column = "<tr>"+
						"<td class=\"table-value-td\" style=\"height:24px\">"+pName+"</td>"+
						"<td class=\"table-value-td\" style=\"height:24px\">"+pTypeText+"</td>"+
						"<td class=\"table-value-td\" style=\"height:24px\">"+pTime1+"-"+pTime2+"</td>"+
						"<td class=\"table-value-td\" style=\"height:24px\">"+price+"</td>"+
						"<td class=\"table-value-td\" style=\"height:24px\"><a class=\"linkStyle\" href=\"#\" onclick=\"deleteTable(this)\">删除</a></td>"+
						"<td style=\"display:none\">"+pTypeValue+"</td>"+
						"</tr>";
			$("#tb").append(column); 
			tFlag = true;
		}
	
	}
	
	/**
		获取表格的值
	*/
	function getTableValue(){
		pType = [];
		pTimeValue = [];
		pNames = [];
		allPtime = [];
		pTypeValue = [];
		priceValue = [];
		var obj = document.getElementById("tableId");
		if(obj.rows.length == 1){
			tFlag = false;//没有数据的情况下
		}
		for(var i=1;i<obj.rows.length;i++){
			pTypeValue.push(obj.rows[i].cells[5].innerHTML);
			pType.push(obj.rows[i].cells[1].innerHTML);
			pNames.push(obj.rows[i].cells[0].innerHTML);
			allPtime.push(obj.rows[i].cells[2].innerHTML);
			priceValue.push(obj.rows[i].cells[3].innerHTML);
			var times = obj.rows[i].cells[2].innerHTML.split('-');//费率时间段
			for(var m=Number(times[0]);m<Number(times[1]);m++){
				pTimeValue.push(Number(m));
			}
			if(times[1] == '24'){//24点特殊处理
				pTimeValue.push(Number(times[1]));
			}
		}
		
	}
	
	/**
		动态删除费率时段
	*/
	function deleteTable(obj){
		$(obj).closest('tr').remove();
		getTableValue();
	}
	
	/**
		提交新增费率
	*/
	//com.frontier.eems.eemspages.flpz.submitPhase = function(){
	function submitPhase(){
		var stime = $('#startTimeId').datebox('getValue');//开始时间
		var btime = $('#endTimeId').datebox('getValue');//结束时间
		//对开始时间和结束时间的判断   添加费率
		if(operationType == 'A'){
			if(btime !='' && btime !=null){
				//如果开始时间大于结束时间
				if(getDateDiff(stime,btime)<0){
					$.messager.alert('确认', "结束时间不能小于开始时间", 'warning');
					return
				}
			}
		}
		//变更费率时段
		if(operationType == "BG"){
			if(btime !='' || btime !=null){
				//var myDate = new Date().format("yyyy-mm-dd");//今天的时间
				var currentdate = new Date();
				myDate = DateUtil.dateToStr('yyyy-MM-dd',currentdate);
				//开始时间小于今天
				if(getDateDiff(myDate,stime)<0){
					$.messager.alert('确认', "开始时间不能小于今天", 'warning');
					return
				}
				//如果开始时间大于结束时间
				if(getDateDiff(stime,btime)<0){
					$.messager.alert('确认', "费率时段结束时间不能小于开始时间", 'warning');
					return
				}
			}
			
		}
		
		getTableValue();//获取表格的所有值
		//时段不是全天的
		if(pType.indexOf("全天")<0){
			//不是全天的情况下 只要有一个不包含就返回
//			if(pType.indexOf("峰")<0 || pType.indexOf("平")<0 || pType.indexOf("谷")<0){
//				$.messager.alert('确认', "请添加峰、平、谷各费率时段，请确认！", 'warning');
//				return;
//			}
			//判断时段是否全 0-24
			for(var i=0;i<25;i++){
				var index = pTimeValue.indexOf(i);
				if(index<0){
					$.messager.alert('确认', "请添加全费率时段0-24，请确认！", 'warning');
					return;
				}
				
			}
		}
		var nodes = $('#userTree').combobox('getValue');//获取勾选的节点数据
    	var consIdStr = '';
    	/*if(nodes.length ==  0){
    		$.messager.alert('提示', "至少选择一个", 'warning');
    		return;
    	}
    	for(var i = 0;i<nodes.length;i++){
    		if(i != 0){
    			consIdStr += ',' + nodes[i].id;
    		}else{
    			consIdStr += nodes[i].id;
    		}
    	}*/
    	//consId = $('#userTree').combobox('getValue');
		//Ext.Ajax.request({
    	if($('#tagNameId').val().trim() == ''){
    		$.messager.alert('提示', "费率名称不能为空！", 'warning');
    		return;
    	}
		 $.ajax({
			type : "POST",
			url : webContextRoot + 'flpz/addPriceTag.action',
			cache : false,
			async : false,// 同步异步请求
			data : {
				'operationPriceTagModel.priceTagId':priceTagId,//费率ID
			    'operationPriceTagModel.priceTagName':$('#tagNameId').val().trim(),//费率名称
			    'operationPriceTagModel.energyType':$('#energyType').combobox('getValue'),//能源类型
			    'operationPriceTagModel.priceStartTime':$('#startTimeId').datebox('getValue'),//费率执行开始时间
			    'operationPriceTagModel.demandPrice':$('#demandPriceId').val(),//需量电价
			    'operationPriceTagModel.capacityPrice':$('#capacityPriceId').val(),//容量电价
			    'operationPriceTagModel.phaseNameStr':pNames.toString(),//费率时段名称
			    'operationPriceTagModel.phaseTypeStr':pTypeValue.toString(),//费率类型
			    'operationPriceTagModel.phaseTime':allPtime.toString(),//费率时段
			    'operationPriceTagModel.priceStr':priceValue.toString(),//费率价格
				'operationPriceTagModel.operationType':operationType,//操作类型
			    'operationPriceTagModel.priceEndTime':btime,//费率结束时间
			    'operationPriceTagModel.remark':$('#remarkId').val(),//备注
			    'operationPriceTagModel.consId':$('#userTree').combobox('getValue'),//企业id
			    'operationPriceTagModel.consIdStr':$('#userTree').combobox('getValue'),
			},
			success : function(result) {
				var saveSUCCESS = result.saveSUCCESS;
				if(saveSUCCESS=="true")
			    {
			    	$.messager.alert('确认', "保存成功！", 'info', function(r){
			    	    $('#dlg-feilv').dialog('close');
			    	    if(energyFlag == 1){
			    	   		initElecData('1','elecId');//点击的是电的
			    	    }
			    	    else if(energyFlag == 2){
			    	    	initElecData('2','worterId');//点击的是水的
			    	    }
			    	    else if(energyFlag == 3){
			    	    	initElecData('3','natgasId');//点击的是天然气的
			    	    }
			    	    else{
			    	    	initElecData('4','reekId');//点击的是水蒸气的
			    	    }
			    	});
			    }
		    	else
		    	{
		    	 	$.messager.alert('确认', "保存失败！", 'warning');//移除失败
	            }
			}
		});
	}
	
	/**
		修改费率配置
	*/
	//com.frontier.eems.eemspages.flpz.updateFlxzPage = function(id,value){
	function updateFlxzPage(id,value){
		energyFlag = value;
		var selected = $('#'+id).datagrid("getSelected");//选中的表格的值
		if(selected){
			$('#utableId').datagrid("loading");//loading画面
			$.post(webContextRoot +'flpz/queryPhase.action', //请求路径
			{
			 	'operationPriceTagModel.operationType': "Q",//操作类型 查询
			 	'operationPriceTagModel.priceTagId': selected.priceTagId//费率ID
			},
		   	function(data){//回调
		   		$('#utableId').datagrid("loaded");//loading画面关闭
				$('#utableId').datagrid('loadData', data);
				if(data.length == 0){
					$('#uuserTree').combobox('setValue','');
				}else{
					$('#uuserTree').combobox('setValue', data[0].consId);
				}
		   	},"json");//返回格式
			$('#updateForm').form('load',selected);
			//$('#uenergyType').combobox('loadData', comData[energyType]); //能源类型
			$('#uenergyType').combobox('setValue', value);
			if(value != '1'){
				$('#demandPriceId').textbox('disable');
				$('#capacityPriceId').textbox('disable');
			}
			else{
				$('#demandPriceId').textbox('enable');
				$('#capacityPriceId').textbox('enable');
			}
			$('#updateFl').dialog('open');
		}else{
	 		$.messager.alert('确认', "请选择一条修改记录！", 'warning');
	 	}
	}
	
/**
	删除费率配置
*/
//com.frontier.eems.eemspages.flpz.deleteFlxzPage = function(id,value){
	function deleteFlxzPage(id,value){
		energyFlag = value;
	    var selected = $('#'+id).datagrid("getSelected");//选中的表格的值
	     if(!selected){
	    	$.messager.alert('确认', "请选择要删除的费率定义信息！", 'warning');
	    	return;
	    }
	 	$.messager.confirm('确认', '确定删除该数据？', function(r){
				if (!r){//不删除直接返回
					return;
				}
		 		//Ext.Ajax.request({
		 		$.ajax({
		 			type : "POST",
					url : webContextRoot + 'flpz/addPriceTag.action',
					cache : false,
					async : false,// 同步异步请求
					data : {
						'operationPriceTagModel.operationType': "D",//操作类型 查询
				 	    'operationPriceTagModel.priceTagId': selected.priceTagId//能源类型
					},
					success : function(result) {
						var saveSUCCESS = result.saveSUCCESS;
						if(saveSUCCESS=="true")
					    {
					    	$.messager.alert('确认', "删除成功！", 'info', function(r){
					    	    $('#updateFl').dialog('close');
					    	     if(energyFlag == 1){
					    	   		initElecData('1','elecId');//点击的是电的
					    	    }
					    	    else if(energyFlag == 2){
					    	    	initElecData('2','worterId');//点击的是水的
					    	    }
					    	    else if(energyFlag == 3){
					    	    	initElecData('3','natgasId');//点击的是天然气的
					    	    }
					    	    else{
					    	    	initElecData('4','reekId');//点击的是水蒸气的
					    	    } 
					    	});
					    }
				    	else if(saveSUCCESS=="1020")
				    	{
				    	 	$.messager.alert('确认', "该费率定义已经使用，不能删除！", 'warning');//删除失败
			            }
			            else{
			            	$.messager.alert('确认', "删除失败，请联系管理员！", 'warning');//删除失败
			            }
					}
			});
        });
}
	
	/**
		确认修改费率基本信息
	*/
	//com.frontier.eems.eemspages.flpz.updateSumbitPage = function(){
	function updateSumbitPage(){
		if($('#utagNameId').val().trim() == ''){
    		$.messager.alert('提示', "费率名称不能为空！", 'warning');
    		return;
    	}
		//Ext.Ajax.request({
		 $.ajax({
			type : "POST",
			url : webContextRoot + 'flpz/addPriceTag.action',
			cache : false,
			async : false,// 同步异步请求
			data : {
				'operationPriceTagModel.priceTagId':$('#priceTagId').val() ,//费率ID
			    'operationPriceTagModel.priceTagName':$('#utagNameId').val() ,//费率名称
			    'operationPriceTagModel.energyType':$('#energyType').combobox('getValue'),//能源类型
			    'operationPriceTagModel.priceStartTime':$('#startTimeId').datebox('getValue'),//费率执行开始时间
			    'operationPriceTagModel.demandPrice':$('#udemandPriceId').val(),//需量电价
			    'operationPriceTagModel.capacityPrice':$('#ucapacityPriceId').val(),//容量电价
			    'operationPriceTagModel.remark':$('#uremarkId').val(),//备注
				'operationPriceTagModel.operationType':'U'//操作类型
			},
			success : function(result) {
				var saveSUCCESS = result.saveSUCCESS;
				if(saveSUCCESS=="true")
			    {
			    	$.messager.alert('确认', "修改成功！", 'info', function(r){
			    	    $('#updateFl').dialog('close');
			    	     if(energyFlag == 1){
			    	   		initElecData('1','elecId');//点击的是电的
			    	    }
			    	    else if(energyFlag == 2){
			    	    	initElecData('2','worterId');//点击的是水的
			    	    }
			    	    else if(energyFlag == 3){
			    	    	initElecData('3','natgasId');//点击的是天然气的
			    	    }
			    	    else{
			    	    	initElecData('4','reekId');//点击的是水蒸气的
			    	    } 
			    	});
			    }
		    	else
		    	{
		    	 	$.messager.alert('确认', "修改失败！", 'warning');//修改失败
	            }
			}
		});
	}
	
	/**
		费率变更页面弹出
	*/
	//com.frontier.eems.eemspages.flpz.updatePhasePage = function(value,id){
	function updatePhasePage(value,id){
		var selected = $('#'+id).datagrid("getSelected");//选中的表格的值
		if(!selected){
	    	$.messager.alert('确认', "请选择一条变更记录！", 'warning');
	    	return;
	    }
		//判断词条费率是否是当前在用费率
		var today = new Date();//当前时间
		var myDate = new Date(selected.priceEndTime);
		//在用
		if(myDate>today || selected.priceEndTime==''){
			priceTagId = selected.priceTagId;
			operationType = "BG";
		   	$("#tableId tbody").html("");
		   	$('#tableForm').form('load',selected);
		   	$('#dlg-feilv').dialog('setTitle',"变更时段");  
			$('#dlg-feilv').dialog('open');
			//$('#energyType').combobox('loadData', comData[energyType]); //能源类型
			$('#energyType').combobox('setValue', value);
			$('#userTree').combobox({
				disabled:true
			});
			$.post(webContextRoot +'flpz/queryPhase.action', //请求路径
			{
			 	'operationPriceTagModel.phaseoperationType': "Q",//操作类型 查询
			 	'operationPriceTagModel.priceTagId': selected.priceTagId//费率ID
			},
		   	function(data){//回调
				if(data.length == 0){
					$('#userTree').combobox('setValue', '');
				}else{
					$('#userTree').combobox('setValue', data[0].consId);
				}
		   		for(var i=0;i<data.length;i++){
					var column = "<tr>"+
						"<td class=\"table-value-td\" style=\"height:24px\">"+data[i].phaseName+"</td>"+
						"<td class=\"table-value-td\" style=\"height:24px\">"+data[i].energyTypeName+"</td>"+
						"<td class=\"table-value-td\" style=\"height:24px\">"+data[i].operationTime+"</td>"+
						"<td class=\"table-value-td\" style=\"height:24px\">"+data[i].price+"</td>"+
						"<td class=\"table-value-td\" style=\"height:24px\"><a class=\"linkStyle\" href=\"#\" onclick=\"deleteTable(this)\">删除</a></td>"+
						"<td style=\"display:none\">"+data[i].phaseType+"</td>"+
						"</tr>";
					$("#tb").append(column); 	
					tFlag =true;				
		   		}
		   	},
			"json");//返回格式 
		}
		else{
			$.messager.alert('确认', "请选择当前在使用的费率变更！", 'warning');
			return;
		}
	}
	
	/**
		下拉框的选择事件
	*/
	function getCom (id,data){
		$('#'+id).combobox({data: data,
				panelHeight:'200',
				onSelect:function(rec){
					$('#pNameId').textbox('setValue',rec.text);
				}
			}
		);
	}
	
	/**
	* 日期差计算
	* @param date1 开始时间
	* @param date2 结束时间
	* @returns {Number}
	*/
	function getDateDiff(date1,date2){
		var beginTime = date1.split('-');//开始时间
		var endTime = date2.split('-');//结束时间
		var beginDate = new Date(beginTime[0],beginTime[1],beginTime[2]);
		var endDate = new Date(endTime[0],endTime[1],endTime[2]);
		return (endDate.getTime()-beginDate.getTime())/(1000*3600*24);
	}
	
	/**
	 * 查询标煤系数
	 */
	//com.frontier.eems.eemspages.flpz.queryBiaoMei = function(){
	function queryBiaoMei(){
		$.post(webContextRoot +'flpz/queryBiaoMei.action',
				   {'operationPriceTagModel.operationType':'Q'},
				   function(data){
					   if(data.length>0){
						   $('#bmxss').textbox('setValue',data[0].bmxss);
						   $('#bmxsd').textbox('setValue',data[0].bmxsd);
						   $('#bmxsq').textbox('setValue',data[0].bmxsq);
						   $('#bmxsr').textbox('setValue',data[0].bmxsr);
					   }
				   },"json");
	}
	
	/**
	 * 保存标煤系数
	 */
	//com.frontier.eems.eemspages.flpz.saveBiaoMei = function(){
	function saveBiaoMei(){
		if(!isFloat($('#bmxss').textbox('getValue').trim()) || !isFloat($('#bmxsd').textbox('getValue').trim()) ||
		   !isFloat($('#bmxsq').textbox('getValue').trim()) || !isFloat($('#bmxsr').textbox('getValue').trim()) ){
			$.messager.alert('确认','请输入正数!','info');    
			return;
		}
		if($('#bmxsForm').form('validate')){
			$.messager.confirm('确认', '确认修改标煤系数？', function(r){
				 if(r){
					 $.ajax({
							type : "POST",
						    url : webContextRoot + 'flpz/saveBiaoMei.action',
						    data : {
						    	'operationPriceTagModel.bmxss':$('#bmxss').textbox('getValue').trim(),
							    'operationPriceTagModel.bmxsd':$('#bmxsd').textbox('getValue').trim(),
							    'operationPriceTagModel.bmxsq':$('#bmxsq').textbox('getValue').trim(),
							    'operationPriceTagModel.bmxsr':$('#bmxsr').textbox('getValue').trim(),
								'operationPriceTagModel.operationType':'U'
						    },
						    cache : false,
							async : false,// 同步异步请求
							success : function(result) {
								 var saveSUCCESS = result.saveSUCCESS;			 
								 if(saveSUCCESS=="true"){
						    	    $.messager.alert('确认', "保存成功！", 'info');
						    	    queryBiaoMei();
						    	 }else{
						    	 	$.messager.alert('确认', "保存失败！", 'warning');
						    	 	queryBiaoMei();
					             }	
					         }
					});
		        }
			});
		}
		
	}
	
	/**
	 * 判断是否为浮点类型
	 * @param value
	 * @returns
	 */
	function isFloat(value){
		var reg=/^((([0-9])|([1-9][0-9]+))(\.([0-9]+))?)$/;
		if(reg.test($.trim(value))&&value!=0){
			return true;
		}else{
			return false;
		}
	}
	
	
	
	
	
	