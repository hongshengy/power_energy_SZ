
/**
 * 资产管理 
 */

var currentdate = new Date();
// 开始时间
var startTime = DateUtil.dateToStr('yyyy-MM-dd', currentdate);
// 结束时间
var endTime = DateUtil.dateToStr('yyyy-MM-dd', currentdate);
// 开始时间往前推一个月
var beginTime = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('m',-1,currentdate));
var propType = '';		// 资产类别
var devIdArr = null;	// 用于设备树选中
var consID = null;
var propTypeId = '';	// 资产树
var propSource = '';	// 来源 0=非录入 1=录入
var value = 1;			// 按钮的显示与隐藏
var isValue = false;	// 是否能关联出资产类别
var propLevel = '';		// 资产类别
var consComboboxSelectd = '';
var consComboboxSelectd1 = '';

/**
 * 初始化执行的方法 
 * 包含了时间的赋值 资产树 客户树 资产所属的加载
 */
function initialize(){
	/**
	 * 入库初始化 
	 */
	$('#beginDate').datebox('setValue', beginTime);// 开始日期
	$('#endDate').datebox('setValue', startTime);// 结束日期
	
	// 加载资产树
	$('#propType').combotree({
		url:webContextRoot+'assetsManagement/queryAssetTree.action',
		onLoadSuccess : function(node,data){
		    $(this).tree('collapseAll');
		},onClick:function(node,data){
			propType = node.id;
		}
	});
	
	// 资产所属
	$('#propOwner').combobox({
		panelWidth:155,				// 设置下拉的宽度 和下拉框保持一致
		url:webContextRoot +'assetsManagement/queryAssetByBelong.action',
		valueField:'CODE_VALUE',
		textField:'CODE_NAME'
	});
	
	/**
	 * 出库初始化 
	 */
	$('#beginDateOut').datebox('setValue', beginTime);// 开始日期
	$('#endDateOut').datebox('setValue', startTime);// 结束日期
	
	// 加载资产树
	$('#propTypeOut').combotree({
		url:webContextRoot+'assetsManagement/queryAssetTree.action',
		onLoadSuccess : function(node,data){
		    $(this).tree('collapseAll');
		}
	});
	
	// 加载客户树
	$('#consIdOut').combobox({    
		url:webContextRoot +'destree/queryConsList.action',
		valueField: 'id',
		textField: 'text',
		mode : 'remote',
		onHidePanel : function(){$('#consId').combobox('reload');}
	});
	
	// 资产所属
	$('#propOwnerOut').combobox({
		panelWidth:155,				// 设置下拉的宽度 和下拉框保持一致
		url:webContextRoot +'assetsManagement/queryAssetByBelong.action',
		valueField:'CODE_VALUE',
		textField:'CODE_NAME'
	});
}

/**
 * 资产入库加载表格
 */
function queryAssetInTable(){
	
	//表格数据
	  var  gridCommon = [[
	     	 		{field:'propNoName',title:'资产类别',width: 100,align:'center'},
	     	 		{field:'propNo',title:'资产编号',width: 100,align:'center'},
	     	 		{field:'propName',title:'资产名称',width: 100,align:'center',
	     	 			formatter : function(value, row, index) {
	    	 				return HTMLEncode(value);
	    	 			}	
	     	 		},
	     	 		{field:'codeName',title:'资产所属',width: 100,align:'center'},
	     	 		{field:'propSpec',title:'规格',width: 100,align:'center',
	    	 			formatter : function(value, row, index) {
	    	 				return HTMLEncode(value);
	    	 			}	
	     	 		},
	     	 		{field:'buyDate',title:'购置日期',width: 100,align:'center'},
	     	 		{field:'inDate',title:'入库日期',width: 100,align:'center'},
	     	 		{field:'propNum',title:'数量',width: 100,align:'center'},
	     	 		{field:'propPrice',title:'单价',width: 100,align:'center'},
	     	 		{field:'sumPropPrice',title:'金额',width: 100,align:'center'},
	     	 		{field:'cnt',title:'详情',width: 100,align:'center',formatter: function(v,row,index){ //超链接
	     	 			 return '<a href="#" style="color:blue;margin-left:5px" onclick="queryAssetInfo('
	     			        +"'"+row.id+"'," + "'"+row.inDate+"'"
	     					+ ')'
	     	 				 +'">'
	     	 				+ '详情</a>';
	     		    }}
	      		]];
	// 资产类别
	var propType = $("#propType").textbox('getValue');
	// 判断输入框是否为空 如果为空清除资产类别
	var propText = $("#propType").textbox('getText');
	if(propText.replace(/(^s$)/g,"").length == 0){
		propType = '';
	}
	// 资产编号
	var propId = $('#propId').val().replace(/^\s+|\s+$/g, "");  
	// 资产所属
	var propOwner = $("#propOwner").textbox('getValue');
	// 选择全部置空
	if(propOwner == '0'){
		propOwner = '';
	}
	// 开始时间  
	var startDate = $('#beginDate').val();
	// 结束时间
	var endDate = $('#endDate').val();
	// 时间校验
	if(startDate > endDate){
		$.messager.alert('提示', "开始时间不能大于结束时间！", 'info');
		return false;
	}
	// 空字符串赋值为空
	var regu = "^[ ]+$";
	var re = new RegExp(regu);
	if(re.test(propId)){
		propId = null;
	}
	
	$('#data_gridIn').datagrid({ 
		loadMsg:'正在加载，请稍等……',//加载时显示提示
		rownumbers:true,
		fit:true,
		fitColumns:true,
		striped: true,
		border : false,
		singleSelect: true,
		tools:"#tool_button",
		pagination:true,
		pageSize: 20,
		pageList : [20,50,100],
		url: webContextRoot + "assetsManagement/queryAssetInByTable.action",
		queryParams:{
			'assetsManagementModel.propType' : propType,
			'assetsManagementModel.propOwner' : propOwner,
			'assetsManagementModel.propNo' : propId,
			'assetsManagementModel.startDate' : startDate,
			'assetsManagementModel.endDate':endDate
		},
		
		onLoadSuccess : function() {// 加载数据之后
			$('#data_gridIn').datagrid('selectRow', 0); // 选择第一行
		},
		columns : gridCommon,
		loadFilter: function(data){//分页数据
			if (data.consMap){
				return data.consMap;
			} else {
				return data;
			}
		}
		
	});  
}

/**
 * 新增  弹出窗口并初始化
 */
function bt_insert(){
	
	// 赋值为资产录入
	$("input:radio[name='inLoggingData']").eq(0).attr("checked",true);
//	$("input[name='inLoggingData'][value=1]").attr("checked",true);
	$('#a_deviceName').combotree({
		onLoadSuccess:function(){
			var node = $('#a_deviceName').combotree('tree').tree('find',devIdArr);
			if(node!=null){
				$('#a_deviceName').combotree('setValue',node.text);
				$('#a_deviceName').combotree('tree').tree('select',node.target);
				//选中的设备节点
				var selected = $('#a_deviceName').combotree('tree').tree('getSelected');
			}
			devIdArr=null;//清空选中节点状态
			consID = null;
		}
	 });
	
	consComboboxSelectd = '';
	$('#a_consId').combobox({    
		url:webContextRoot +'destree/queryConsList.action',
		valueField: 'id',
		textField: 'text' ,
		mode : 'remote',
		onHidePanel : function(){$('#a_consId').combobox('reload');},
		onSelect : function(record){
			// 选择客户没变时，不需要再次加载联动控件
			if(consComboboxSelectd != record.id){
				consComboboxSelectd = record.id;
	    		if(!isNaN(record.id)){
				    	$('#a_deviceName').combotree({
						    method:'get',
						    multiple:false,//是否支持多选
						    onBeforeLoad:function(node){//请求之前
					    		if(node){//点击节点
									treeNodeType = node.type;//获取节点类型
									$('#a_deviceName').combotree('tree').tree('options').url=webContextRoot//点击触发
									+'destree/queryYhbTree.action?treeState=closed&treeNodeType='+treeNodeType;//带参数地址个
								}else{
									$('#a_deviceName').combotree('tree').tree('options').url=webContextRoot //根据企业节点下一级
									+'destree/queryYhbTree.action?treeState=closed&treeNodeType=1&id='+record.id;//带参数地址
								}
							},onClick:function(data){
								// 获取当前节点的父节点
								var father = $(this).tree("getParent",data.target);
								// 点击根节点不查询
								if(father == null){
									return;
								}
								// 资产名称赋值
								$('#a_propName').textbox('setValue',data.rootName);
								// 动态获取
								 $.getJSON(webContextRoot +'assetsManagement/queryCascadingType.action', 
									 {
									   'assetsManagementModel.propType' : father.text //检查明细 ID
									 },
									 function(json){
										 if(json.length > 0){
											 $('#a_propType').combotree('setValue',json[0].text);
											 isValue = true;
											 propLevel = json[0].id;
											 var t = $("#a_propType").combotree('tree');
										     var node = t.tree('getSelected');
										     if (node){
										    	 t.tree('expand', node.target);
										     }
	//										 $('#a_propType').tree('toggle',node.target);//滚动到节点
	//										 $('#a_propType').tree('expand',node.target);
	//										 $('#a_propType').tree('scrollTo',node.target);//滚动到节点
										 }else{
											 isValue = false;
											 $('#a_propType').textbox('setValue','');
										 }
									 }
								);
			                      
					       }
				    	});
	    		}	
			}
		}
	});
	
	// 资产所属
	$('#a_propOwner').combobox({
		panelWidth:155,				// 设置下拉的宽度 和下拉框保持一致
		url:webContextRoot +'assetsManagement/queryAssetInByBelong.action',
		valueField:'CODE_VALUE',
		textField:'CODE_NAME',
		onLoadSuccess: function () {// 下拉框数据加载成功调用
        	var propOwnerData = $(this).combobox("getData");// 得到查询的list集合
        	if(propOwnerData.length>0){
        		$('#a_propOwner').combobox('select',propOwnerData[0].CODE_VALUE);// 默认加载第一个生产线
        	}else{
        		$('#a_propOwner').combobox('select','');// 没有生产线时
        	}
        }
	});
	
	// 计量单位
	$('#a_prickle').combobox({
		panelWidth:155,				// 设置下拉的宽度 和下拉框保持一致
		url:webContextRoot +'assetsManagement/queryAssetInByUnits.action',
		valueField:'CODE_VALUE',
		textField:'CODE_NAME',
		onLoadSuccess: function () {// 下拉框数据加载成功调用
        	var prickleData = $(this).combobox("getData");
        	if(prickleData.length>0){
        		$('#a_prickle').combobox('select',prickleData[0].CODE_VALUE);
        	}else{
        		$('#a_prickle').combobox('select','');// 没有生产线时
        	}
        }
	});
	
	// 日期赋值
	$('#a_inDate').datebox('setValue', startTime);// 结束日期
	$('#a_buyDate').datebox('setValue', startTime);
	
	// 加载资产树
	$('#a_propType').combotree({
		url:webContextRoot+'assetsManagement/queryAssetTree.action',
		onLoadSuccess : function(node,data){
		    $(this).tree('collapseAll');
		},onClick:function(node,data){
			propType = node.id;
		}
	});
	
	// 数量默认1
	$("#a_propNum").textbox('setValue','1');
	$('#xzsbxx').window('setTitle',"新增");
	$('#xzsbxx').window('open');
	
}

/**
 * 属性校验 
 */
function verify(){
	// 判断资产来源
	var propSource = $("input[name=inLoggingData]:checked").val();
	// 非录入
	if(propSource == '0'){
		// 获取客户ID并验证
		var consId = $("#a_consId").val();
		if(consId == null || consId == ''){
			$.messager.alert('提示','客户名称不能为空!','info');    
			return false;
		}
		// 选中的设备节点
		var selected = $('#a_deviceName').combotree('tree').tree('getSelected');
		if(selected==null){
			$.messager.alert('提示','设备名称不能为空!','info');    
			return false;
		}
		//判断是否是节点
		if(selected!=null){
			var isLeaf = $('#a_deviceName').tree('isLeaf',selected.target);
			if(!isLeaf){
				$.messager.alert('提示','请选择正确的设备！','info');    
				return false;
			}
			var deviceId = selected.rootId;
			if(deviceId.length>12){
				$.messager.alert('提示','请选择正确的设备！','info');    
				return false;
			}
			var subsId = selected.parentId.substring(0,12);
		}
	}
	// 资产类别
	var propType = $("#a_propType").textbox('getValue');
	if(propType.length == 0){
		$.messager.alert('提示','资产类别不能为空!','info'); 
		return false;
	}
	// 资产编号
	var propNo = $('#a_propId').textbox('getValue');
	// 资产编号只能为正整数
	var isNumber = /^\+?[1-9][0-9]*$/;
	var isNum1 = '/^[0-9]+([.]{1}[0-9]+){0,1}$/';
	var isEle = /^[a-zA-Z0-9_]*$/;
	if(propNo.length > 0){
//		if(!isEle.test(propNo)){
//			$.messager.alert('提示','请输入正确的资产编号!','info'); 
//			return false;
//		}
		if(propNo.length > 16){
			$.messager.alert('提示','资产编号需小于16位!','info'); 
			return false;
		}
	}else{
		$.messager.alert('提示','资产编号不能为空!','info'); 
		return false;
	}
	
	// 资产名称
	var propName = $('#a_propName').textbox('getValue');
	if(propName.length > 32){
		$.messager.alert('提示','资产名称长度需小于32个字!','info');    
		return false;
	}else if(propName.length == 0){
		$.messager.alert('提示','资产名称不能为空!','info');    
		return false;
	}
	// 规格
	var propSpec = $('#a_propSpec').textbox('getValue');
	if(propSpec.length > 32){
		$.messager.alert('提示','规格长度需小于32位!','info');    
		return false;
	}
	// 购置日期
	var buyDate = $("#a_buyDate").val();
	if(!checkDate(buyDate)){
		$.messager.alert('提示','购置日期不是正确的时间格式!','info'); 
		return false;
	}
	// 保修期(月)
	var guarTime = $("#a_guarTime").textbox('getValue');
	if(guarTime != null && guarTime != ""){
		if(!isNumber.test(guarTime)){
			$.messager.alert('提示','保修期只能为1-16之间的正整数!','info'); 
			return false;
		}
		if(guarTime.length > 16){
			$.messager.alert('提示','保修期需小于16位!','info');    
			return false;
		}
	}
	// 使用年限
	var useYearNum = $("#a_useYearNum").textbox('getValue');
	// 使用年限可以为小数 最多出现一位小数
	// 两位小数{2}
	var reg = /^[+]?\d+(\.\d)?$/;
	if(useYearNum != "" && useYearNum != null){
		if(!isNumber.test(useYearNum)){
			$.messager.alert('提示','使用年限只能为1-16之间的正整数!','info');    
			return false;
		}
		if(useYearNum.length > 16){
			$.messager.alert('提示','使用年限需小于16位!','info');    
			return false;
		}
	}
	// 计量单位
	var prickle = $("#a_prickle").val();
	if(prickle.length > 8){
		$.messager.alert('提示','计量单位长度需小于8个字!','info');    
		return false;
	}else if(prickle.length == 0){
		$.messager.alert('提示','计量单位不能为空!','info');    
		return false;
	}
	// 保修期校验
	var guarTime = $("#a_guarTime").textbox('getValue');
	if(guarTime.length > 16){
		$.messager.alert('提示','保修期需小于16位的数字!','info');    
		return false;
	}
	// 数量
	var propNum = $("#a_propNum").textbox('getValue');
	if(propNum != null && propNum != ""){
		if(!isNumber.test(propNum)){
			$.messager.alert('提示','数量只能为1-16之间的正整数!','info'); 
			return false;
		}
		if(propNum.length > 16){
			$.messager.alert('提示','数量需小于16位!','info'); 
			return false;
		}
	}else if(propNum.length == 0){
		$.messager.alert('提示','数量不能为空!','info');    
		return false;
	}
	
	// 单价
	var propPrice = $("#a_propPrice").textbox('getValue');
	// 正数 最多保留三位小数
	var isPrice = /^[+]?\d{1,14}(\.\d{0,2})?$/;
	if(propPrice != null && propPrice != ""){
		if(!isPrice.test(propPrice)){
			$.messager.alert('提示','单价只能为正数且整数位最大14位,小数位最大2位!','info'); 
			return false;
		}
		// 长度校验
//		if(propPrice.length > 14){
//			$.messager.alert('提示','单价需小于14个数字!','info');    
//			return false;
//		}
	}
	// 资源所属
	var propOwner = $("#a_propOwner").textbox('getValue');
	if(propOwner.length > 8){
		$.messager.alert('提示','资产所属长度需小于8个字!','info');    
		return false;
	}else if(propOwner.length == 0){
		$.messager.alert('提示','资产所属不能为空!','info');    
		return false;
	}
	// 入库日期
	var inDate = $("#a_inDate").val();
	if(!checkDate(inDate)){
		$.messager.alert('提示','入库日期不是正确的时间格式!','info'); 
		return false;
	}
	// 备注
	var memo = $('#a_memo').textbox('getValue');
	if(memo.length > 256){
		$.messager.alert('提示','备注长度需小于256个字!','info');    
		return false;
	}
	
	return true;
}

/**
 * 验证日期格式
 * @param date
 * @return {boolean}
 */
function checkDate(date) {
    var result = date.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);

    if (result == null)
        return false;
    var d = new Date(result[1], result[3] - 1, result[4]);
    return (d.getFullYear() == result[1] && (d.getMonth() + 1) == result[3] && d.getDate() == result[4]);
}

/**
 * 新增删除输入框中的内容 
 */
function clearTable(){
	// 资产编号
	$('#a_propId').textbox('setValue','');
	// 资产名称
	$('#a_propName').textbox('setValue','');
	// 规格
	$('#a_propSpec').textbox('setValue','');
	// 购置日期
	$('#a_buyDate').datebox('setValue','');
	// 保修期(月)
	$("#a_guarTime").textbox('setValue','');
	// 使用年限
	$("#a_useYearNum").textbox('setValue','');
	// 计量单位
	$("#a_prickle").textbox('setValue','');
	// 数量
	$("#a_propNum").textbox('setValue','');
	// 单价
	$("#a_propPrice").textbox('setValue','');
	// 资源所属
	$("#a_propOwner").textbox('setValue','');
	// 入库日期
	$("#a_inDate").datebox('setValue','');
	// 备注
	$('#a_memo').textbox('setValue','');
}

/**
 * 新增 
 */
function bt_add_commit(){
	// 默认加载第一个
	$("input[name='inLoggingData'][value=0]").attr("checked",true);
	// 验证属性
	if(verify() == false){
		return;
	}
	// 资产类别
	var propType = '';
//	if(isValue){
//		propType = propLevel;
//	}else{
//		propType = $("#a_propType").textbox('getValue');
//	}
	propType = $("#a_propType").textbox('getValue');
	// 资产编号
	var propNo = $('#a_propId').textbox('getValue').replace(/^\s+|\s+$/g, "");
	// 资产名称
	var propName = $('#a_propName').textbox('getValue').replace(/^\s+|\s+$/g, "");
	// 规格
	var propSpec = $('#a_propSpec').textbox('getValue').replace(/^\s+|\s+$/g, "");
	// 购置日期
	var buyDate = $("#a_buyDate").val();
	// 保修期(月)
	var guarTime = $("#a_guarTime").textbox('getValue');
	// 使用年限
	var useYearNum = $("#a_useYearNum").textbox('getValue');
	// 计量单位
	var prickle = $("#a_prickle").textbox('getText');
	// 数量
	var propNum = $("#a_propNum").textbox('getValue');
	// 单价
	var propPrice = $("#a_propPrice").textbox('getValue');
	// 资源所属
	var propOwner = $("#a_propOwner").textbox('getValue');
	// 入库日期
	var inDate = $("#a_inDate").val();
	// 备注
	var memo = $('#a_memo').textbox('getValue');
	// 资产来源0=非录入，1=录入
	var propSource = $("input[name=inLoggingData]:checked").val();
	var consId = '';
	var deviceId = '';
	var subsId = '';
	var selected = '';
	var deviceName = '';
	if(propSource == '0'){
		// 获取客户ID并验证
		consId = $("#a_consId").val();
		// 选中的设备节点
		selected = $('#a_deviceName').combotree('tree').tree('getSelected');
		// 设备ID
		deviceId = selected.rootId;
		// 设备名称
		deviceName = selected.rootName;
		// 建筑ID
		subsId = selected.parentId.substring(0,12);
	}
	$.post(webContextRoot +'assetsManagement/insertAssetManage.action',{
        'assetsManagementModel.propType': propType,'assetsManagementModel.propNo': propNo,			// 查询时间
        'assetsManagementModel.propName': propName,'assetsManagementModel.propSpec': propSpec,		// 时间类型
        'assetsManagementModel.buyDate':buyDate,'assetsManagementModel.guarTime': guarTime,
        'assetsManagementModel.useYearNum': useYearNum,'assetsManagementModel.prickle': prickle,
        'assetsManagementModel.propNum': propNum,'assetsManagementModel.propPrice': propPrice,
        'assetsManagementModel.propOwner': propOwner,'assetsManagementModel.inDate': inDate,
        'assetsManagementModel.consId': consId,'assetsManagementModel.subsId': subsId,
        'assetsManagementModel.deviceId': deviceId,'assetsManagementModel.deviceName': deviceName,
        'assetsManagementModel.memo': memo,'assetsManagementModel.propSource':propSource
     },
     function(data){
    	 if(data.saveSUCCESS == "true"){
 	    	$.messager.alert('确认', "保存成功！", 'info');
 	    	// 清空
 	    	clearTable();
 	    	// 关闭弹窗
 	    	bt_add_cancel();
 	    	// 重新加载数据
 	    	queryAssetInTable();
 		 }else{
 			 $.messager.alert('确认', "保存失败！", 'warning');
 		 }
     },'json');
	
}

//删除安全检查记录
function bt_delete(){
	 var selectRow = $('#data_gridIn').datagrid('getSelected'); // 获取选中的一行记录
	 if(selectRow==null){
		 $.messager.alert('提示', "请选择一条记录！", 'info');
		 return;
	 }
	 $.messager.confirm('提示','您确认想要删除记录吗？',function(r){    
		//判断是否删除
	    if (r){  
	    	 $.getJSON(webContextRoot +'assetsManagement/deleteAssetManage.action', 
			 {
			   'assetsManagementModel.id' : selectRow.id //检查明细 ID
			 },
			 function(data){//回调
				if(data.saveSUCCESS=="true"){
			    	$.messager.alert('确认', "删除成功！", 'info');
		    		// 重新加载数据
		 	    	queryAssetInTable();
				 }else{
					 $.messager.alert('确认', "删除失败！", 'warning');//移除失败
				 }
			  },"json");//返回格式
	      }
	 });  
}

/**
 * 更新 取消 
 */
function bt_update_cancel(){
	$('#updateDialog').window('close');
}

/**
 * 查询详情 
 */
function queryAssetInfo(propId,startDate){

	$.ajax({
		type: "post",
		url:webContextRoot + 'assetsManagement/queryAssetInById.action',//请求地址
		data: "assetsManagementModel.id=" + propId,
		dataType:"json",		// 返回类型
		cache : false,
		async : false,			// 同步异步请求
		success: function(data){
			// 录入资产 隐藏客户名称和设备名称
			$("#consIdByIn").hide();

			if(data[0].PROP_NAME.length > 10){
				$('#info_propName').text(data[0].PROP_NAME.substr(0,8)+"...");
				$('#info_propName').attr('title',data[0].PROP_NAME);
			}else{
				$('#info_propName').text(data[0].PROP_NAME);
			}
			$('#info_propOwner').text(data[0].CODE_NAME);
			$('#info_propType').text(data[0].PROP_NO_NAME);
			$('#info_propId').text(data[0].PROP_NO);
			$('#info_propSpec').text(data[0].PROP_SPEC);
			$('#info_guarTime').text(data[0].GUAR_TIME);
			$('#info_buyDate').text(data[0].BUY_DATE);
			$('#info_useYearNum').text(data[0].USE_YEAR_NUM);
			$('#info_prickle').text(data[0].PRICKLE);
			$('#info_propNum').text(data[0].PROP_NUM);
			$('#info_propPrice').text(data[0].PROP_PRICE);
			$('#info_inDate').text(data[0].IN_DATE);
			$('#info_memo').text(data[0].MEMO);
		}
	});
	
	value = 1;
	// 修改标题
	$('#xmxq').window('setTitle',"详情");
	$('#xmxq').window('open');
}

/**
 * 资产入库修改 
 */
function bt_update(value){
	consComboboxSelectd = '';
	// 清空文本
	clearTableInUp();
	$("input:radio[name='inExistingData'][value=0]").attr("checked","checked");
	if(value == 0){
		$("#inButton").show();
	}else if(value == 1){
		$("#inButton").hide();
	}
	var selectRow = $('#data_gridIn').datagrid('getSelected'); // 获取选中的一行记录
	if(selectRow==null){
		$.messager.alert('提示', "请选择一条记录！", 'info');
		return;
	}
	//  计量单位
	var prickle = '';
	$.getJSON(webContextRoot +'assetsManagement/queryAssetInById.action', 
	{
		'assetsManagementModel.id' : selectRow.id
	},
	function(data){//回调
		// 录入资产 隐藏客户名称和设备名称
		if(data[0].PROP_SOURCE == "1"){
			$("#upConsId").hide();
			$('#inUpBuqi').show();
//			$('#oneRadio').attr("checked",true);
			
			$("input:radio[name='inExistingData'][value=1]").prop("checked","checked");
//			$("input:radio[name='inExistingData']").eq(1).attr("checked",true);
		}else if(data[0].PROP_SOURCE == "0"){
			$("#upConsId").show();
			$('#inUpBuqi').hide();
//			$('#zeroRadio').attr("checked",true);
			$("input:radio[name='inExistingData'][value=0]").prop("checked","checked");
//			$("input:radio[name='inExistingData']").eq(0).attr("checked",true);
		}
		$('#u_propType').combotree('setValue',data[0].PROP_NO_NAME);
		$('#u_propId').textbox('setValue',data[0].PROP_NO);
		$('#u_propSpec').textbox('setValue',data[0].PROP_SPEC);
		$('#u_propName').textbox('setValue',data[0].PROP_NAME);
		$('#u_guarTime').textbox('setValue',data[0].GUAR_TIME);
		$('#u_buyDate').datebox('setValue',data[0].BUY_DATE);
		$('#u_useYearNum').textbox('setValue',data[0].USE_YEAR_NUM);
		$('#u_prickle').textbox('setValue',data[0].PRICKLE);
		$('#u_propNum').textbox('setValue',data[0].PROP_NUM);
		$('#u_propPrice').textbox('setValue',data[0].PROP_PRICE);
		$('#u_inDate').datebox('setValue',data[0].IN_DATE);
		$('#u_memo').textbox('setValue',data[0].MEMO);
		prickle = data[0].PRICKLE;
		
		// 资产所属
		$('#u_propOwner').combobox({
			panelWidth:155,				// 设置下拉的宽度 和下拉框保持一致
			url:webContextRoot +'assetsManagement/queryAssetInByBelong.action',
			valueField:'CODE_VALUE',
			textField:'CODE_NAME',
			onLoadSuccess: function () {// 下拉框数据加载成功调用
	        	var propOwnerData = $(this).combobox("getData");// 得到查询的list集合
	        	if(propOwnerData.length>0){
	        		$('#u_propOwner').combobox('select',data[0].PROP_OWNER);
	        	}else{
	        		$('#u_propOwner').combobox('select','');
	        	}
	        }
		});
		
		// 计量单位
		$('#u_prickle').combobox({
			panelWidth:155,				// 设置下拉的宽度 和下拉框保持一致
			url:webContextRoot +'assetsManagement/queryAssetInByUnits.action',
			valueField:'CODE_VALUE',
			textField:'CODE_NAME',
			onLoadSuccess: function () {// 下拉框数据加载成功调用
	        	var prickleData = $(this).combobox("getData");
	        	if(prickleData.length>0){
	        		$('#u_prickle').combobox('select',prickle);
	        	}else{
	        		$('#u_prickle').combobox('select','');// 没有生产线时
	        	}
	        }
		});
		
	},"json");//返回格式
	
	$('#u_consId').combobox({    
		url:webContextRoot +'destree/queryConsList.action',
		valueField: 'id',
		textField: 'text' ,
//		onChange: function(newValue, oldValue){
//		ziMu
//		},
		mode : 'remote',
		onHidePanel : function(){$('#u_consId').combobox('reload');},
		onSelect : function(record){
			// 选择客户没变时，不需要再次加载联动控件
			if(consComboboxSelectd != record.id){
				consComboboxSelectd = record.id;
				consID = record.id;//获取企业编号
				if(!isNaN(consID)){
		    	//根据企业节点下一级
				 $.getJSON(webContextRoot +'destree/queryYhbTree.action?treeState=open'
						 +'&isAllTreeNode=true&treeNodeType=1&checkNodeList='+devIdArr+'&id='+consID,{},
						function(json){
							 $('#u_deviceName').combotree({
								data:json,
								onLoadSuccess:function(){
									var node = $('#u_deviceName').combotree('tree').tree('find',devIdArr);
									if(node!=null){
										$('#u_deviceName').combotree('setValue',node.text);
										$('#u_deviceName').combotree('tree').tree('select',node.target);
										//选中的设备节点
										var selected = $('#u_deviceName').combotree('tree').tree('getSelected');
									}
									devIdArr=null;//清空选中节点状态
									consID = null;
								},onClick:function(data){
									// 获取当前节点的父节点
									var father = $(this).tree("getParent",data.target);
									// 点击根节点不查询
									if(father == null){
										return;
									}
									// 资产名称赋值
									$('#u_propName').textbox('setValue',data.rootName);
									// 动态获取资产类别
									$.getJSON(webContextRoot +'assetsManagement/queryCascadingType.action', 
										 {
										   'assetsManagementModel.propType' : father.text //检查明细 ID
										 },
										 function(json){
											 if(json.length > 0){
												 $('#u_propType').textbox('setValue',json[0].text);
												 isValue = true;
												 propLevel = json[0].id;
											 }else{
												 isValue = false;
												 $('#u_propType').textbox('setValue','');
											 }
										 }
									);
				                      
								}
							 });
						}
				 	);	
				}
			}
		}
	});
	
	// 加载资产树
	$('#u_propType').combotree({
		url:webContextRoot+'assetsManagement/queryAssetTree.action',
		onLoadSuccess : function(node,data){
			propTypeId = data[0].id;
		    $(this).tree('collapseAll');
		},onClick:function(node,data){
			propType = node.id;
		}
	});
	
	//获取选中行的对象
	var selections = $('#data_gridIn').datagrid('getSelections');
	if(selections.length!=1){
		$.messager.alert('提示','请选择一条记录进行修改!','info');   
		return;
	}
	var selected = selections[0];
	devIdArr = selected.deviceId;
	consID = selected.consId;
	
	$('#u_consId').combobox('select',consID); //选中客户
	
	setTimeout('updateInDialog();',800);
//	 $.easyui.loading({ msg: "正在加载..." });
     //window.setTimeout(function () { $.easyui.loaded(); }, 1000);
	
	// 正在加载。。。
	load();
}
/**
 * 修改弹窗 
 */
function updateInDialog(){
	$('#updateDialog').window('setTitle',"修改");
	$('#updateDialog').window('open');
	disLoad();
}

/**
 * 弹出加载层 
 */
function load() {  
    $("<div class=\"datagrid-mask\"></div>").css({ display: "block", width: "100%", height: $(window).height() }).appendTo("body");  
    $("<div class=\"datagrid-mask-msg\"></div>").html("正在加载，请稍候。。。").appendTo("body").css({ display: "block", left: ($(document.body).outerWidth(true) - 190) / 2, top: ($(window).height() - 45) / 2 });  
} 

/**
 * 取消加载层 
 */  
function disLoad() {  
    $(".datagrid-mask").remove();  
    $(".datagrid-mask-msg").remove();  
}

/**
 * 修改关闭窗口 
 */
function bt_update_cancel(){
	// 清空文本
	clearTableInUp();
	$('#updateDialog').window('close');
}

/**
 * 属性校验 
 */
function verifyInUp(){
	// 判断资产来源
	var propSource = $('input[name="inExistingData"]:checked').val();
	// 非录入
	if(propSource == '0'){
		// 获取客户ID并验证
		var consId = $("#u_consId").val();
		if(consId == null || consId == ''){
			$.messager.alert('提示','客户名称不能为空!','info');    
			return false;
		}
		// 选中的设备节点
		var selected = $('#u_deviceName').combotree('tree').tree('getSelected');
		if(selected==null){
			$.messager.alert('提示','设备名称不能为空!','info');    
			return false;
		}
		//判断是否是节点
		if(selected!=null){
			var isLeaf = $('#u_deviceName').tree('isLeaf',selected.target);
			if(!isLeaf){
				$.messager.alert('提示','请选择正确的设备！','info');    
				return false;
			}
			var deviceId = selected.rootId;
			if(deviceId.length>12){
				$.messager.alert('提示','请选择正确的设备！','info');    
				return false;
			}
			var subsId = selected.parentId.substring(0,12);
		}
	}
	// 资产类别
	var propType = $("#u_propType").textbox('getValue');
	if(propType.length == 0){
		$.messager.alert('提示','资产类别不能为空!','info'); 
		return false;
	}
	// 资产编号
	var propNo = $('#u_propId').textbox('getValue');
	// 资产编号只能为正整数
	var isNumber = /^\+?[1-9][0-9]*$/;
	var isNum1 = '/^[0-9]+([.]{1}[0-9]+){0,1}$/';
	var isEle = /^[a-zA-Z0-9_]*$/;
	if(propNo.length > 0){
//		if(!isEle.test(propNo)){
//			$.messager.alert('提示','请输入正确的资产编号!','info'); 
//			return false;
//		}
		if(propNo.length > 16){
			$.messager.alert('提示','资产编号需小于16位!','info'); 
			return false;
		}
	}else{
		$.messager.alert('提示','资产编号不能为空!','info'); 
		return false;
	}
	
	// 资产名称
	var propName = $('#u_propName').textbox('getValue');
	if(propName.length > 32){
		$.messager.alert('提示','资产名称长度需小于32个字!','info');    
		return false;
	}else if(propName.length == 0){
		$.messager.alert('提示','资产名称不能为空!','info');    
		return false;
	}
	// 规格
	var propSpec = $('#u_propSpec').textbox('getValue');
	if(propSpec.length > 32){
		$.messager.alert('提示','规格长度需小于32位!','info');    
		return false;
	}
	// 购置日期
	var buyDate = $("#u_buyDate").val();
	if(!checkDate(buyDate)){
		$.messager.alert('提示','购置日期不是正确的时间格式!','info'); 
		return false;
	}
	// 保修期(月)
	var guarTime = $("#u_guarTime").textbox('getValue');
	if(guarTime != null && guarTime != ""){
		if(!isNumber.test(guarTime)){
			$.messager.alert('提示','保修期只能为1-16之间的正整数!','info'); 
			return false;
		}
		if(guarTime.length > 16){
			$.messager.alert('提示','保修期需小于16位!','info');    
			return false;
		}
	}
	// 使用年限
	var useYearNum = $("#u_useYearNum").textbox('getValue');
	// 使用年限可以为小数 最多出现一位小数
	// 两位小数{2}
	var reg = /^[+]?\d+(\.\d)?$/;
	if(useYearNum != "" && useYearNum != null){
		if(!isNumber.test(useYearNum)){
			$.messager.alert('提示','使用年限只能为1-16之间的正整数!','info');    
			return false;
		}
		if(useYearNum.length > 16){
			$.messager.alert('提示','使用年限需小于16位!','info');    
			return false;
		}
	}
	// 计量单位
	var prickle = $("#u_prickle").val();
	if(prickle.length > 8){
		$.messager.alert('提示','计量单位长度需小于8个字!','info');    
		return false;
	}else if(prickle.length == 0){
		$.messager.alert('提示','计量单位不能为空!','info');    
		return false;
	}
	// 保修期校验
	var guarTime = $("#u_guarTime").textbox('getValue');
	if(guarTime.length > 16){
		$.messager.alert('提示','保修期需小于16位的数字!','info');    
		return false;
	}
	// 数量
	var propNum = $("#u_propNum").textbox('getValue');
	if(propNum != null && propNum != ""){
		if(!isNumber.test(propNum)){
			$.messager.alert('提示','数量只能为1-16之间的正整数!','info'); 
			return false;
		}
		if(propNum.length > 16){
			$.messager.alert('提示','数量需小于16位!','info'); 
			return false;
		}
	}else if(propNum.length == 0){
		$.messager.alert('提示','数量不能为空!','info');    
		return false;
	}
	
	// 单价
	var propPrice = $("#u_propPrice").textbox('getValue');
	// 正数 最多保留三位小数
	var isPrice = /^[+]?\d{1,14}(\.\d{0,2})?$/;
	if(propPrice != null && propPrice != ""){
		if(!isPrice.test(propPrice)){
			$.messager.alert('提示','单价只能为正数且整数位最大14位,小数位最大2位!','info'); 
			return false;
		}
		// 长度校验
//		if(propPrice.length > 14){
//			$.messager.alert('提示','单价需小于14个数字!','info');    
//			return false;
//		}
	}
	// 资源所属
	var propOwner = $("#u_propOwner").textbox('getValue');
	if(propOwner.length > 8){
		$.messager.alert('提示','资产所属长度需小于8个字!','info');    
		return false;
	}else if(propOwner.length == 0){
		$.messager.alert('提示','资产所属不能为空!','info');    
		return false;
	}
	// 入库日期
	var inDate = $("#u_inDate").val();
	if(!checkDate(inDate)){
		$.messager.alert('提示','入库日期不是正确的时间格式!','info'); 
		return false;
	}
	// 备注
	var memo = $('#u_memo').textbox('getValue');
	if(memo.length > 256){
		$.messager.alert('提示','备注长度需小于256个字!','info');    
		return false;
	}
	
	return true;
}

/**
 * 入库更新清空文本框
 */
function clearTableInUp(){
	// 客户名称
	$('#u_consId').textbox('setValue','');
	// 设备名称
	$('#u_deviceName').textbox('setValue','');
	// 资产编号
	$('#u_propId').textbox('setValue','');
	// 资产名称
	$('#u_propName').textbox('setValue','');
	// 规格
	$('#u_propSpec').textbox('setValue','');
	// 购置日期
	$('#u_buyDate').datebox('setValue','');
	// 保修期(月)
	$("#u_guarTime").textbox('setValue','');
	// 使用年限
	$("#u_useYearNum").textbox('setValue','');
	// 计量单位
	$("#u_prickle").textbox('setValue','');
	// 数量
	$("#u_propNum").textbox('setValue','');
	// 单价
	$("#u_propPrice").textbox('setValue','');
	// 资源所属
	$("#u_propOwner").textbox('setValue','');
	// 入库日期
	$("#u_inDate").datebox('setValue','');
	// 备注
	$('#u_memo').textbox('setValue','');
}


/**
 * 修改 保存的方法
 */
function bt_update_commit(){
	// 资产类别
	// 属性验证
	if(verifyInUp() == false){
		return;
	}
	// 资产类别
	var propType = '';
	propType = $("#u_propType").textbox('getValue');
	// 资产编号
	var propNo = $('#u_propId').textbox('getValue').replace(/^\s+|\s+$/g, "");
	// 资产名称
	var propName = $('#u_propName').textbox('getValue').replace(/^\s+|\s+$/g, "");
	// 规格
	var propSpec = $('#u_propSpec').textbox('getValue').replace(/^\s+|\s+$/g, "");
	// 购置日期
	var buyDate = $("#u_buyDate").val();
	// 保修期(月)
	var guarTime = $("#u_guarTime").textbox('getValue');
	// 使用年限
	var useYearNum = $("#u_useYearNum").textbox('getValue');
	// 计量单位
	var prickle = $("#u_prickle").textbox('getText');
	// 数量
	var propNum = $("#u_propNum").textbox('getValue');
	// 单价
	var propPrice = $("#u_propPrice").textbox('getValue');
	// 资源所属
	var propOwner = $("#u_propOwner").textbox('getValue');
	// 入库日期
	var inDate = $("#u_inDate").val();
	// 备注
	var memo = $('#u_memo').textbox('getValue');
	
	// 判断资产来源
	var propSource = $("input[name=inExistingData]:checked").val();
	// 录入的资产
	if(propSource == '0'){
		// 获取客户ID并验证
		var consId = $("#u_consId").val();
		if(consId == null  || consId == ''){
			$.messager.alert('提示','客户名称不能为空!','info');    
			return false;
		}
		// 选中的设备节点
		var selected = $('#u_deviceName').combotree('tree').tree('getSelected');
		if(selected != null){
			// 设备ID
			var deviceId = selected.rootId;
			// 设备名称
			var deviceName = selected.rootName;
			// 建筑ID
			var subsId = selected.parentId.substring(0,12);
		}
	}
	
	var selectRow = $('#data_gridIn').datagrid('getSelected'); // 获取选中的一行记录
	$.post(webContextRoot +'assetsManagement/updateAssetInInfo.action',{
        'assetsManagementModel.propType': propType,'assetsManagementModel.propNo': propNo,			// 查询时间
        'assetsManagementModel.propName': propName,'assetsManagementModel.propSpec': propSpec,		// 时间类型
        'assetsManagementModel.buyDate':buyDate,'assetsManagementModel.guarTime': guarTime,
        'assetsManagementModel.useYearNum': useYearNum,'assetsManagementModel.prickle': prickle,
        'assetsManagementModel.propNum': propNum,'assetsManagementModel.propPrice': propPrice,
        'assetsManagementModel.propOwner': propOwner,'assetsManagementModel.inDate': inDate,
        'assetsManagementModel.consId': consId,'assetsManagementModel.subsId': subsId,
        'assetsManagementModel.deviceId': deviceId,'assetsManagementModel.deviceName': deviceName,
        'assetsManagementModel.memo': memo,'assetsManagementModel.propSource': propSource,
        'assetsManagementModel.id': selectRow.id
     },
     function(data){
    	 if(data.flag=='success'){
 	    	$.messager.alert('确认', "保存成功！", 'info');
 	    	// 关闭弹窗
 	    	bt_update_cancel();
 	    	// 重新加载数据
 	    	queryAssetInTable();
 		 }else{
 			 $.messager.alert('确认', "保存失败！", 'warning');
 		 }
     },'json');
}

/**
 * 查询方法 
 */
function bt_search(v){
	// 0查询的是入库
	if(v == '0'){
		
		// 资产类别
		var propType = $("#propType").combobox('getValue');
		// 判断输入框是否为空 如果为空清除资产类别
		var propText = $("#propType").textbox('getText');
		if(propText.replace(/^\s+|\s+$/g, "").length == 0){
			propType = '';
		}
		// 资产编号
		var propId = $('#propId').val().replace(/^\s+|\s+$/g, "");  
		// 资产所属
		var propOwner = $("#propOwner").textbox('getValue');
		// 选择全部置空
		if(propOwner == '0'){
			propOwner = '';
		}
		// 开始时间  
		var startDate = $('#beginDate').val();
		// 结束时间
		var endDate = $('#endDate').val();
		// 时间校验
		if(startDate > endDate){
			$.messager.alert('提示', "开始时间不能大于结束时间！", 'info');
			return false;
		}
		// 空字符串赋值为空
		var regu = "^[ ]+$";
		var re = new RegExp(regu);
		if(re.test(propId)){
			propId = null;
		}
		// 重新加载表格
		$('#data_gridIn').datagrid('load',{
			'assetsManagementModel.propType' : propType,
			'assetsManagementModel.propOwner' : propOwner,
			'assetsManagementModel.propNo' : propId,
			'assetsManagementModel.startDate' : startDate,
			'assetsManagementModel.endDate':endDate
		});
		
	// 1查询出库
	}else if(v == '1'){
		// 资产类别
		var propType = $("#propTypeOut").textbox('getValue');
		// 判断输入框是否为空 如果为空清除资产类别
		var propText = $("#propTypeOut").textbox('getText');
		if(propText.replace(/^\s+|\s+$/g, "").length == 0){
			propType = '';
		}
		// 资产编号
		var propId = $('#propIdOut').val().replace(/^\s+|\s+$/g, "");  
		// 资产所属
		var propOwner = $("#propOwnerOut").textbox('getValue');
		// 选择全部置空
		if(propOwner == '0'){
			propOwner = '';
		}
		// 开始时间  
		var startDate = $('#beginDateOut').val();
		// 结束时间
		var endDate = $('#endDateOut').val();
		// 时间校验
		if(startDate > endDate){
			$.messager.alert('提示', "开始时间不能大于结束时间！", 'info');
			return false;
		}
		// 空字符串赋值为空
		var regu = "^[ ]+$";
		var re = new RegExp(regu);
		if(re.test(propId)){
			propId = null;
		}
		// 重新加载表格
		$('#data_gridOut').datagrid('load',{ 
			'assetsManagementModel.propType' : propType,
			'assetsManagementModel.propOwner' : propOwner,
			'assetsManagementModel.propNo' : propId,
			'assetsManagementModel.startDate' : startDate,
			'assetsManagementModel.endDate':endDate
		});
	}
}

/**
 * 添加 取消
 */
function bt_add_cancel(){
	// 清空
 	clearTable();
	$('#xzsbxx').window('close');
}

/**
 * 资产出库加载表格
 */
function queryAssetOutTable(){
	//表格数据
	  var  gridCommon = [[
	     	 		{field:'propNoName',title:'资产类别',width: 100,align:'center'},
	     	 		{field:'propNo',title:'资产编号',width: 100,align:'center'},
	     	 		{field:'propName',title:'资产名称',width: 100,align:'center',
	     	 			formatter : function(value, row, index) {
	    	 				return HTMLEncode(value);
	    	 			}
	     	 		},
	     	 		{field:'codeName',title:'资产所属',width: 100,align:'center'},
	     	 		{field:'propSpec',title:'规格',width: 100,align:'center',
	     	 			formatter : function(value, row, index) {
	    	 				return HTMLEncode(value);
	    	 			}
	     	 		},
	     	 		{field:'useDate',title:'出库日期',width: 100,align:'center'},
	     	 		{field:'usePeople',title:'领用人',width: 100,align:'center'},
	     	 		{field:'propNum',title:'数量',width: 100,align:'center'},
	     	 		{field:'propPrice',title:'单价',width: 100,align:'center'},
	     	 		{field:'sumPropPrice',title:'金额',width: 100,align:'center'},
	     	 		{field:'cnt',title:'详情',width: 100,align:'center',formatter: function(v,row,index){ //超链接
	     	 			 return '<a href="#" style="color:blue;margin-left:5px" onclick="queryAssetInfoByOut('
	     			        +"'"+row.id+"'," + "'"+row.useDate+"'"
	     					+ ')'
	     	 				 +'">'
	     	 				+ '详情</a>';
	     		    }}
	      		]];
	// 资产类别
	var propType = $("#propTypeOut").textbox('getValue');
	// 判断输入框是否为空 如果为空清除资产类别
	var propText = $("#propTypeOut").textbox('getText');
	if(propText.replace(/(^s$)/g,"").length == 0){
		propType = '';
	}
	// 资产编号
	var propId = $('#propIdOut').val().replace(/^\s+|\s+$/g, ""); 
	// 资产所属
	var propOwner = $("#propOwnerOut").textbox('getValue');
	// 选择全部置空
	if(propOwner == '0'){
		propOwner = '';
	}
	// 开始时间  
	var startDate = $('#beginDateOut').val();
	// 结束时间
	var endDate = $('#endDateOut').val();
	// 时间校验
	if(startDate > endDate){
		$.messager.alert('提示', "开始时间不能大于结束时间！", 'info');
		return false;
	}
	// 空字符串赋值为空
	var regu = "^[ ]+$";
	var re = new RegExp(regu);
	if(re.test(propId)){
		propId = null;
	}
	
	$('#data_gridOut').datagrid({ 
		loadMsg:'正在加载，请稍等……',//加载时显示提示
		rownumbers:true,
		fit:true,
		fitColumns:true,
		striped: true,
		border : false,
		singleSelect: true,
		tools:"#tool_buttonOut",
		pagination:true,
		pageSize: 20,
		pageList : [20,50,100],
		url: webContextRoot + "assetsManagement/queryAssetOutByTable.action",
		queryParams:{
			'assetsManagementModel.propType' : propType,
			'assetsManagementModel.propOwner' : propOwner,
			'assetsManagementModel.propNo' : propId,
			'assetsManagementModel.startDate' : startDate,
			'assetsManagementModel.endDate':endDate
		},
		onLoadSuccess : function() {// 加载数据之后
			$('#data_gridOut').datagrid('selectRow', 0); // 选择第一行
		},
		loadMsg : "正在努力的读取数据中...",// 提示信息
		columns : gridCommon,
		loadFilter: function(data){//分页数据
			if (data.consMap){
				return data.consMap;
			} else {
				return data;
			}
		}
		
	});  
}

/**
 * 出库打开新增窗口
 */
function out_insert(){
	consComboboxSelectd1 = '';
	$('#out_a_deviceName').combotree({
		onLoadSuccess:function(){
			var node = $('#out_a_deviceName').combotree('tree').tree('find',devIdArr);
			if(node!=null){
				$('#out_a_deviceName').combotree('setValue',node.text);
				$('#out_a_deviceName').combotree('tree').tree('select',node.target);
				//选中的设备节点
				var selected = $('#out_a_deviceName').combotree('tree').tree('getSelected');
			}
			devIdArr=null;//清空选中节点状态
			consID = null;
		}
	 });
	
	$('#out_a_consId').combobox({    
		url:webContextRoot +'destree/queryConsList.action',
		valueField: 'id',
		textField: 'text' ,
//	    onChange: function(newValue, oldValue){
//	    	if(isNaN(newValue)){
////					 newValue = $('#out_a_consId').combobox('getText');
////						$.getJSON(webContextRoot + 'destree/queryTree.action?isQyCode=false&ziMu='+newValue,{ 
////								},
////								function(json){
////									$('#out_a_consId').combobox('loadData',json);	
////								}
////										);
//	    	}else{
////	    		 newValue = $('#out_a_consId').combobox('getText');
////					$.getJSON(webContextRoot + 'destree/queryTree.action?isQyCode=false&ziMu=',{ 
////							},
////							function(json){
////								$('#out_a_consId').combobox('loadData',json);	
////							}
////					);
//
//	    	}		
//		},
		mode : 'remote',
		onHidePanel : function(){$('#out_a_consId').combobox('reload');},
		onSelect : function(record){
			// 选择客户没变时，不需要再次加载联动控件
			if(consComboboxSelectd1 != record.id){
				consComboboxSelectd1 = record.id;
	    		if(!isNaN(record.id)){
				    	$('#out_a_deviceName').combotree({
						    method:'get',
						    multiple:false,//是否支持多选
						    onBeforeLoad:function(node){//请求之前
					    		if(node){//点击节点
									treeNodeType = node.type;//获取节点类型
									$('#out_a_deviceName').combotree('tree').tree('options').url=webContextRoot//点击触发
									+'destree/queryYhbTree.action?treeState=closed&treeNodeType='+treeNodeType;//带参数地址个
								}else{
									$('#out_a_deviceName').combotree('tree').tree('options').url=webContextRoot //根据企业节点下一级
									+'destree/queryYhbTree.action?treeState=closed&treeNodeType=1&id='+record.id;//带参数地址
								}
							},onClick:function(data){
								// 获取当前节点的父节点
								var father = $(this).tree("getParent",data.target);
								// 点击根节点不查询
								if(father == null){
									return;
								}
								// 资产名称赋值
								$('#out_a_propName').textbox('setValue',data.rootName);
								// 动态获取资产类别
								$.getJSON(webContextRoot +'assetsManagement/queryCascadingType.action', 
									 {
									   'assetsManagementModel.propType' : father.text //检查明细 ID
									 },
									 function(json){
										 if(json.length > 0){
											 $('#out_a_propType').textbox('setValue',json[0].text);
											 isValue = true;
											 propLevel = json[0].id;
										 }else{
											 isValue = false;
											 $('#out_a_propType').textbox('setValue','');
										 }
									 }
								);
			                      
							 }
				    	});
	    		}	
			}
		}
	});
	
	// 资产所属
	$('#out_a_propOwner').combobox({
		panelWidth:155,				// 设置下拉的宽度 和下拉框保持一致
		url:webContextRoot +'assetsManagement/queryAssetInByBelong.action',
		valueField:'CODE_VALUE',
		textField:'CODE_NAME',
		onLoadSuccess: function () {// 下拉框数据加载成功调用
        	var propOwnerData = $(this).combobox("getData");// 得到查询的list集合
        	if(propOwnerData.length>0){
        		$('#out_a_propOwner').combobox('select',propOwnerData[0].CODE_VALUE);// 默认加载第一个生产线
        	}else{
        		$('#out_a_propOwner').combobox('select','');// 没有生产线时
        	}
        }
	});
	
	// 计量单位
	$('#out_a_prickle').combobox({
		panelWidth:155,				// 设置下拉的宽度 和下拉框保持一致
		url:webContextRoot +'assetsManagement/queryAssetInByUnits.action',
		valueField:'CODE_VALUE',
		textField:'CODE_NAME',
		onLoadSuccess: function () {// 下拉框数据加载成功调用
        	var prickleData = $(this).combobox("getData");
        	if(prickleData.length>0){
        		$('#out_a_prickle').combobox('select',prickleData[0].CODE_VALUE);
        	}else{
        		$('#out_a_prickle').combobox('select','');// 没有生产线时
        	}
        }
	});
	
	// 日期赋值
	$('#out_a_useDate').datebox('setValue', startTime);// 结束日期
	$('#out_a_buyDate').datebox('setValue', startTime);
	
	// 加载资产树
	$('#out_a_propType').combotree({
		url:webContextRoot+'assetsManagement/queryAssetTree.action',
		onLoadSuccess : function(node,data){
		    $(this).tree('collapseAll');
		},onClick:function(node,data){
//			propNo = node.id;
			propType = node.id;
		}
	});
	// 数量默认1
	$("#out_a_propNum").textbox('setValue','1');
	$('#outInsert').window('setTitle',"新增");
	$('#outInsert').window('open');
	
}

/**
 * 出库新增 
 */
function out_add_commit(){
	// 属性校验
	if(outVerify() == false){
		return;
	}
	// 资产类别
	var propType = '';
	if(isValue){
		propType = propLevel;
	}else{
		propType = $("#out_a_propType").textbox('getValue');
	}
	// 资产编号
	var propNo = $('#out_a_propId').textbox('getValue').replace(/^\s+|\s+$/g, "");
	// 资产名称
	var propName = $('#out_a_propName').textbox('getValue').replace(/^\s+|\s+$/g, "");
	// 规格
	var propSpec = $('#out_a_propSpec').textbox('getValue').replace(/^\s+|\s+$/g, "");
	// 购置日期
	var buyDate = $("#out_a_buyDate").val();
	// 保修期(月)
	var guarTime = $("#out_a_guarTime").textbox('getValue');
	// 使用年限
	var useYearNum = $("#out_a_useYearNum").textbox('getValue');
	// 计量单位
	var prickle = $("#out_a_prickle").textbox('getText');
	// 数量
	var propNum = $("#out_a_propNum").textbox('getValue');
	// 单价
	var propPrice = $("#out_a_propPrice").textbox('getValue');
	// 资源所属
	var propOwner = $("#out_a_propOwner").textbox('getValue');
	// 出库日期
	var useDate = $("#out_a_useDate").val();
	// 领用部门
	var useDep = $('#out_a_useDep').val();
	// 领用人
	var usePeople = $('#out_a_usePeople').val();
	// 备注
	var memo = $('#out_a_memo').textbox('getValue');
	// 资产来源0=非录入，1=录入
	var propSource = '0';
	// 获取客户ID并验证
	var consId = $("#out_a_consId").val();
	// 选中的设备节点
	var selected = $('#out_a_deviceName').combotree('tree').tree('getSelected');
	// 设备ID
	var deviceId = selected.rootId;
	// 设备名称
	var deviceName = selected.rootName;
	// 建筑ID
	var subsId = selected.parentId.substring(0,12);
	
	$.post(webContextRoot +'assetsManagement/insertAssetManageByOut.action',{
        'assetsManagementModel.propType': propType,'assetsManagementModel.propNo': propNo,			// 查询时间
        'assetsManagementModel.propName': propName,'assetsManagementModel.propSpec': propSpec,		// 时间类型
        'assetsManagementModel.buyDate':buyDate,'assetsManagementModel.guarTime': guarTime,
        'assetsManagementModel.useYearNum': useYearNum,'assetsManagementModel.prickle': prickle,
        'assetsManagementModel.propNum': propNum,'assetsManagementModel.propPrice': propPrice,
        'assetsManagementModel.propOwner': propOwner,'assetsManagementModel.useDate': useDate,
        'assetsManagementModel.useDep': useDep,'assetsManagementModel.usePeople': usePeople,
        'assetsManagementModel.consId': consId,'assetsManagementModel.subsId': subsId,
        'assetsManagementModel.deviceId': deviceId,'assetsManagementModel.deviceName': deviceName,
        'assetsManagementModel.memo': memo
     },
     function(data){
    	 if(data.saveSUCCESS == "true"){
 	    	$.messager.alert('确认', "保存成功！", 'info');
 	    	// 清空文本框
 	    	clearTableByOut();
 	    	// 关闭弹窗
 	    	out_add_cancel();
 	    	// 重新加载数据
 	    	queryAssetOutTable();
 		 }else{
 			 $.messager.alert('确认', "保存失败！", 'warning');
 		 }
     },'json');
}

/**
 * 出库关闭新增窗口 
 */
function out_add_cancel(){
	// 清空文本框
	clearTableByOut();
	$('#outInsert').window('close');
}

/**
 * 出库修改关闭窗口 
 */
function out_up_cancel(){
	$('#out_updateDialog').window('close');
}

/**
 * 出库新增验证 
 */
function outVerify(){
	
	// 获取客户ID并验证
	var consId = $("#out_a_consId").val();
	if(consId == null  || consId == ''){
		$.messager.alert('提示','客户名称不能为空!','info');    
		return false;
	}
	// 选中的设备节点
	var selected = $('#out_a_deviceName').combotree('tree').tree('getSelected');
	if(selected==null){
		$.messager.alert('提示','设备名称不能为空!','info');    
		return false;
	}
	//判断是否是节点
	var isLeaf = $('#out_a_deviceName').tree('isLeaf',selected.target);
	if(!isLeaf){
		$.messager.alert('提示','请选择正确的设备！','info');    
		return false;
	}
	var deviceId = selected.rootId;
	if(deviceId.length>12){
		$.messager.alert('提示','请选择正确的设备！','info');    
		return false;
	}
	var subsId = selected.parentId.substring(0,12);
	// 资产类别
	var propType = $("#out_a_propType").textbox('getValue');
	if(propType.length == 0){
		$.messager.alert('提示','资产类别不能为空!','info'); 
		return false;
	}
	// 资产编号
	var propNo = $('#out_a_propId').textbox('getValue');
	// 资产编号只能为正整数
	var isNumber = /^\+?[1-9][0-9]*$/;
	var isNum1 = '/^[0-9]+([.]{1}[0-9]+){0,1}$/';
	var isEle = /^[a-zA-Z0-9_]*$/;
	if(propNo.length > 0){
//		if(!isEle.test(propNo)){
//			$.messager.alert('提示','请输入正确的资产编号!','info'); 
//			return false;
//		}
		if(propNo.length > 16){
			$.messager.alert('提示','资产编号需小于16位!','info'); 
			return false;
		}
	}else{
		$.messager.alert('提示','资产编号不能为空!','info'); 
		return false;
	}
	
	// 资产名称
	var propName = $('#out_a_propName').textbox('getValue');
	if(propName.length > 32){
		$.messager.alert('提示','资产名称长度需小于32个字!','info');    
		return false;
	}else if(propName.length == 0){
		$.messager.alert('提示','资产名称不能为空!','info');    
		return false;
	}
	// 规格
	var propSpec = $('#out_a_propSpec').textbox('getValue');
	if(propSpec.length > 32){
		$.messager.alert('提示','规格长度需小于32个字!','info');    
		return false;
	}
	// 购置日期
	var buyDate = $("#out_a_buyDate").val();
	if(!checkDate(buyDate)){
		$.messager.alert('提示','购置日期不是正确的时间格式!','info'); 
		return false;
	}
	// 保修期(月)
	var guarTime = $("#out_a_guarTime").textbox('getValue');
	if(guarTime != null && guarTime != ""){
		if(!isNumber.test(guarTime)){
			$.messager.alert('提示','保修期只能为1-16之间的正整数!','info'); 
			return false;
		}
		if(guarTime.length > 16){
			$.messager.alert('提示','保修期需小于16位!','info');    
			return false;
		}
	}
	// 使用年限
	var useYearNum = $("#out_a_useYearNum").textbox('getValue');
	// 使用年限可以为小数 最多出现一位小数
	// 两位小数{2}
	var reg = /^[+]?\d+(\.\d)?$/;
	if(useYearNum != "" && useYearNum != null){
		if(!isNumber.test(useYearNum)){
			$.messager.alert('提示','使用年限只能为1-16之间的正整数!','info');    
			return false;
		}
		if(useYearNum.length > 16){
			$.messager.alert('提示','使用年限需小于16位!','info');    
			return false;
		}
	}
	// 计量单位
	var prickle = $("#out_a_prickle").val();
	if(prickle.length > 8){
		$.messager.alert('提示','计量单位长度需小于8个字!','info');    
		return false;
	}else if(prickle.length == 0){
		$.messager.alert('提示','计量单位不能为空!','info');    
		return false;
	}
	// 保修期校验
	var guarTime = $("#out_a_guarTime").textbox('getValue');
	if(guarTime.length > 16){
		$.messager.alert('提示','保修期需小于16位的数字!','info');    
		return false;
	}
	// 数量
	var propNum = $("#out_a_propNum").textbox('getValue');
	if(propNum != null && propNum != ""){
		if(!isNumber.test(propNum)){
			$.messager.alert('提示','数量只能为1-16之间的正整数!','info'); 
			return false;
		}
		if(propNum.length > 16){
			$.messager.alert('提示','数量需小于16位!','info'); 
			return false;
		}
	}else if(propNum.length == 0){
		$.messager.alert('提示','数量不能为空!','info');    
		return false;
	}
	
	// 单价
	var propPrice = $("#out_a_propPrice").textbox('getValue');
	// 正数 最多保留三位小数
	var isPrice = /^[+]?\d{1,14}(\.\d{0,2})?$/;
	if(propPrice != null && propPrice != ""){
		if(!isPrice.test(propPrice)){
			$.messager.alert('提示','单价只能为正数且整数位最大14位,小数位最大2位!','info'); 
			return false;
		}
		// 长度校验
//		if(propPrice.length > 14){
//			$.messager.alert('提示','单价需小于14个数字!','info');    
//			return false;
//		}
	}
	// 资源所属
	var propOwner = $("#out_a_propOwner").textbox('getValue');
	if(propOwner.length > 8){
		$.messager.alert('提示','资产所属长度需小于8个字!','info');    
		return false;
	}else if(propOwner.length == 0){
		$.messager.alert('提示','资产所属不能为空!','info');    
		return false;
	}
	// 入库日期
	var inDate = $("#out_a_useDate").val();
	if(!checkDate(inDate)){
		$.messager.alert('提示','领用日期不是正确的时间格式!','info'); 
		return false;
	}
	// 只能输入汉字或字母
	var isStr = /^[A-Z|a-z\u4e00-\u9fa5]*$/;
	// 领用部门
	var useDep = $("#out_a_useDep").val();
//	if(!isStr.test(useDep)){
//		$.messager.alert('提示','领用部门只能为汉字或字母!','info'); 
//		return false;
//	}
	if(useDep.length == 0){
		$.messager.alert('提示','领用部门不能为空!','info'); 
		return false;
	}else if(useDep.length > 32){
		$.messager.alert('提示','领用部门不能大于32位!','info'); 
		return false;
	}
	
	// 领用人
	var usePeople = $("#out_a_usePeople").val();
//	if(!isStr.test(usePeople)){
//		$.messager.alert('提示','领用人只能为汉字或字母!','info'); 
//		return false;
//	}
	if(usePeople.length == 0){
		$.messager.alert('提示','领用人不能为空!','info'); 
		return false;
	}else if(usePeople.length > 32){
		$.messager.alert('提示','领用人不能大于32位!','info'); 
		return false;
	}
	// 备注
	var memo = $('#out_a_memo').textbox('getValue');
	if(memo.length > 256){
		$.messager.alert('提示','备注长度需小于256个字!','info');    
		return false;
	}
	
	return true;
}

/**
 * 出库新增删除输入框中的内容 
 */
function clearTableByOut(){
	// 客户名称
	$('#out_a_consId').textbox('setValue','');
	// 设备名称
	$('#out_a_deviceName').textbox('setValue','');
	// 资产编号
	$('#out_a_propId').textbox('setValue','');
	// 资产名称
	$('#out_a_propName').textbox('setValue','');
	// 规格
	$('#out_a_propSpec').textbox('setValue','');
	// 购置日期
	$('#out_a_buyDate').datebox('setValue','');
	// 保修期(月)
	$("#out_a_guarTime").textbox('setValue','');
	// 使用年限
	$("#out_a_useYearNum").textbox('setValue','');
	// 计量单位
	$("#out_a_prickle").textbox('setValue','');
	// 数量
	$("#out_a_propNum").textbox('setValue','');
	// 单价
	$("#out_a_propPrice").textbox('setValue','');
	// 资源所属
	$("#out_a_propOwner").textbox('setValue','');
	// 出库日期
	$("#out_a_useDate").datebox('setValue','');
	// 领用部门
	$("#out_a_useDep").textbox('setValue','');
	// 资源所属
	$("#out_a_usePeople").textbox('setValue','');
	// 备注
	$('#out_a_memo').textbox('setValue','');
}

/**
 * 出库更新删除输入框中的内容 
 */
function clearTableByOutUp(){
	// 客户名称
	$('#out_u_consId').textbox('setValue','');
	// 设备名称
	$('#out_u_deviceName').textbox('setValue','');
	// 资产编号
	$('#out_u_propId').textbox('setValue','');
	// 资产名称
	$('#out_u_propName').textbox('setValue','');
	// 规格
	$('#out_u_propSpec').textbox('setValue','');
	// 购置日期
	$('#out_u_buyDate').datebox('setValue','');
	// 保修期(月)
	$("#out_u_guarTime").textbox('setValue','');
	// 使用年限
	$("#out_u_useYearNum").textbox('setValue','');
	// 计量单位
	$("#out_u_prickle").textbox('setValue','');
	// 数量
	$("#out_u_propNum").textbox('setValue','');
	// 单价
	$("#out_u_propPrice").textbox('setValue','');
	// 资源所属
	$("#out_u_propOwner").textbox('setValue','');
	// 出库日期
	$("#out_u_useDate").datebox('setValue','');
	// 领用部门
	$("#out_u_useDep").textbox('setValue','');
	// 资源所属
	$("#out_u_usePeople").textbox('setValue','');
	// 备注
	$('#out_u_memo').textbox('setValue','');
}


/**
 * 出库新增验证 
 */
function outVerifyByUp(){
	// 获取客户ID并验证
	var consId = $("#out_u_consId").val();
	if(consId == null  || consId == ''){
		$.messager.alert('提示','客户名称不能为空!','info');    
		return false;
	}
	// 选中的设备节点
	var selected = $('#out_u_deviceName').combotree('tree').tree('getSelected');
	if(selected==null){
		$.messager.alert('提示','设备名称不能为空!','info');    
		return false;
	}
	//判断是否是节点
	var isLeaf = $('#out_u_deviceName').tree('isLeaf',selected.target);
	if(!isLeaf){
		$.messager.alert('提示','请选择正确的设备！','info');    
		return false;
	}
	var deviceId = selected.rootId;
	if(deviceId.length>12){
		$.messager.alert('提示','请选择正确的设备！','info');    
		return false;
	}
	var subsId = selected.parentId.substring(0,12);
	// 资产类别
	var propType = $("#out_u_propType").textbox('getValue');
	if(propType.length == 0){
		$.messager.alert('提示','资产类别不能为空!','info'); 
		return false;
	}
	// 资产编号
	var propNo = $('#out_u_propId').textbox('getValue');
	// 资产编号只能为正整数
//	var isNumber = /^[0-9]+$/;
	var isNumber = /^\+?[1-9][0-9]*$/;
	
	var isNum1 = '/^[0-9]+([.]{1}[0-9]+){0,1}$/';
	var isEle = /^[a-zA-Z0-9_]*$/;
	if(propNo.length > 0){
//		if(!isEle.test(propNo)){
//			$.messager.alert('提示','请输入正确的资产编号!','info'); 
//			return false;
//		}
		if(propNo.length > 16){
			$.messager.alert('提示','资产编号需小于16位!','info'); 
			return false;
		}
	}else{
		$.messager.alert('提示','资产编号不能为空!','info'); 
		return false;
	}
	
	// 资产名称
	var propName = $('#out_u_propName').textbox('getValue');
	if(propName.length > 32){
		$.messager.alert('提示','资产名称长度需小于32个字!','info');    
		return false;
	}else if(propName.length == 0){
		$.messager.alert('提示','资产名称不能为空!','info');    
		return false;
	}
	// 规格
	var propSpec = $('#out_u_propSpec').textbox('getValue');
	if(propSpec.length > 32){
		$.messager.alert('提示','规格长度需小于32个字!','info');    
		return false;
	}
	// 购置日期
	var buyDate = $("#out_u_buyDate").val();
	if(!checkDate(buyDate)){
		$.messager.alert('提示','购置日期不是正确的时间格式!','info'); 
		return false;
	}
	// 保修期(月)
	var guarTime = $("#out_u_guarTime").textbox('getValue');
	if(guarTime != null && guarTime != ""){
		if(!isNumber.test(guarTime)){
			$.messager.alert('提示','保修期只能为1-16之间的正整数!','info'); 
			return false;
		}
		if(guarTime.length > 16){
			$.messager.alert('提示','保修期需小于16位!','info');    
			return false;
		}
	}
	// 使用年限
	var useYearNum = $("#out_u_useYearNum").textbox('getValue');
	// 使用年限可以为小数 最多出现一位小数
	// 两位小数{2}
	var reg = /^[+]?\d+(\.\d)?$/;
	if(useYearNum != "" && useYearNum != null){
		if(!isNumber.test(useYearNum)){
			$.messager.alert('提示','使用年限只能为1-16之间的正整数!','info');    
			return false;
		}
		if(useYearNum.length > 16){
			$.messager.alert('提示','使用年限需小于16位!','info');    
			return false;
		}
	}
	// 计量单位
	var prickle = $("#out_u_prickle").val();
	if(prickle.length > 8){
		$.messager.alert('提示','计量单位长度需小于8个字!','info');    
		return false;
	}else if(prickle.length == 0){
		$.messager.alert('提示','计量单位不能为空!','info');    
		return false;
	}
	// 保修期校验
	var guarTime = $("#out_u_guarTime").textbox('getValue');
	if(guarTime.length > 16){
		$.messager.alert('提示','保修期需小于16位的数字!','info');    
		return false;
	}
	// 数量
	var propNum = $("#out_u_propNum").textbox('getValue');
	if(propNum != null && propNum != ""){
		if(!isNumber.test(propNum)){
			$.messager.alert('提示','数量只能为1-16之间的正整数!','info'); 
			return false;
		}
		if(propNum.length > 16){
			$.messager.alert('提示','数量需小于16位!','info'); 
			return false;
		}
	}else if(propNum.length == 0){
		$.messager.alert('提示','数量不能为空!','info');    
		return false;
	}
	
	// 单价
	var propPrice = $("#out_u_propPrice").textbox('getValue');
	// 正数 最多保留三位小数
	var isPrice = /^[+]?\d{1,14}(\.\d{0,2})?$/;
	if(propPrice != null && propPrice != ""){
		if(!isPrice.test(propPrice)){
			$.messager.alert('提示','单价只能为正数且整数位最大14位,小数位最大2位!','info'); 
			return false;
		}
		// 长度校验
//		if(propPrice.length > 17){
//			$.messager.alert('提示','单价需小于17个数字!','info');    
//			return false;
//		}
	}
	// 资源所属
	var propOwner = $("#out_u_propOwner").textbox('getValue');
	if(propOwner.length > 8){
		$.messager.alert('提示','资产所属长度需小于8个字!','info');    
		return false;
	}else if(propOwner.length == 0){
		$.messager.alert('提示','资产所属不能为空!','info');    
		return false;
	}
	// 入库日期
	var inDate = $("#out_u_useDate").val();
	if(!checkDate(inDate)){
		$.messager.alert('提示','领用日期不是正确的时间格式!','info'); 
		return false;
	}
	// 只能输入汉字或字母
	var isStr = /^[A-Z|a-z\u4e00-\u9fa5]*$/;
	// 领用部门
	var useDep = $("#out_u_useDep").val();
//	if(!isStr.test(useDep)){
//		$.messager.alert('提示','领用部门只能为汉字或字母!','info'); 
//		return false;
//	}
	if(useDep.length == 0){
		$.messager.alert('提示','领用部门不能为空!','info'); 
		return false;
	}else if(useDep.length > 32){
		$.messager.alert('提示','领用部门不能大于32位!','info'); 
		return false;
	}
	
	// 领用人
	var usePeople = $("#out_u_usePeople").val();
//	if(!isStr.test(usePeople)){
//		$.messager.alert('提示','领用人只能为汉字或字母!','info'); 
//		return false;
//	}
	if(usePeople.length == 0){
		$.messager.alert('提示','领用人不能为空!','info'); 
		return false;
	}else if(usePeople.length > 32){
		$.messager.alert('提示','领用人不能大于32位!','info'); 
		return false;
	}
	// 备注
	var memo = $('#out_u_memo').textbox('getValue');
	if(memo.length > 256){
		$.messager.alert('提示','备注长度需小于256个字!','info');    
		return false;
	}
	
	return true;
}

/**
 * 出库修改 
 */
function out_up_commit(){
	/**
	 * 属性校验 
	 */
	if(outVerifyByUp() == false){
		return;
	}
	// 资产类别
	var propType = '';
//	if(isValue){
//		propType = propLevel;
//	}else{
//		propType = $("#out_u_propType").textbox('getValue');
//	}
//	
	propType = $("#out_u_propType").textbox('getValue');
	// 资产编号
	var propNo = $('#out_u_propId').textbox('getValue').replace(/^\s+|\s+$/g, "");
	// 资产名称
	var propName = $('#out_u_propName').textbox('getValue').replace(/^\s+|\s+$/g, "");
	// 规格
	var propSpec = $('#out_u_propSpec').textbox('getValue').replace(/^\s+|\s+$/g, "");
	// 购置日期
	var buyDate = $("#out_u_buyDate").val();
	// 保修期(月)
	var guarTime = $("#out_u_guarTime").textbox('getValue');
	// 使用年限
	var useYearNum = $("#out_u_useYearNum").textbox('getValue');
	// 计量单位
	var prickle = $("#out_u_prickle").textbox('getText');
	// 数量
	var propNum = $("#out_u_propNum").textbox('getValue');
	// 单价
	var propPrice = $("#out_u_propPrice").textbox('getValue');
	// 资源所属
	var propOwner = $("#out_u_propOwner").textbox('getValue');
	// 出库日期
	var useDate = $("#out_u_useDate").val();
	// 备注
	var memo = $('#out_u_memo').textbox('getValue');
	// 领用部门
	var useDep = $('#out_u_useDep').textbox('getValue');
	// 领用人
	var usePeople = $('#out_u_usePeople').textbox('getValue');
	
	// 获取客户ID并验证
	var consId = $("#out_u_consId").val();
	// 选中的设备节点
	var selected = $('#out_u_deviceName').combotree('tree').tree('getSelected');
	// 设备ID
	var deviceId = selected.rootId;
	// 设备名称
	var deviceName = selected.rootName;
	// 建筑ID
	var subsId = selected.parentId.substring(0,12);
	var selectRow = $('#data_gridOut').datagrid('getSelected'); // 获取选中的一行记录
	$.post(webContextRoot +'assetsManagement/updateAssetOutInfo.action',{
        'assetsManagementModel.propType': propType,'assetsManagementModel.propNo': propNo,			// 查询时间
        'assetsManagementModel.propName': propName,'assetsManagementModel.propSpec': propSpec,		// 时间类型
        'assetsManagementModel.buyDate':buyDate,'assetsManagementModel.guarTime': guarTime,
        'assetsManagementModel.useYearNum': useYearNum,'assetsManagementModel.prickle': prickle,
        'assetsManagementModel.propNum': propNum,'assetsManagementModel.propPrice': propPrice,
        'assetsManagementModel.propOwner': propOwner,'assetsManagementModel.useDate': useDate,
        'assetsManagementModel.consId': consId,'assetsManagementModel.subsId': subsId,
        'assetsManagementModel.deviceId': deviceId,'assetsManagementModel.deviceName': deviceName,
        'assetsManagementModel.memo': memo,'assetsManagementModel.useDep': useDep,
        'assetsManagementModel.usePeople': usePeople,'assetsManagementModel.id': selectRow.id
     },
     function(data){
    	 if(data.flag=='success'){
  	    	$.messager.alert('确认', "保存成功！", 'info');
 	    	// 关闭弹窗
 	    	out_up_cancel();
 	    	// 重新加载数据
 	    	queryAssetOutTable();
 		 }else{
 			 $.messager.alert('确认', "保存失败！", 'warning');
 		 }
     },'json');
}

/**
 * 出库删除记录 
 */
function out_delete(){
	 var selectRow = $('#data_gridOut').datagrid('getSelected'); // 获取选中的一行记录
	 if(selectRow==null){
		 $.messager.alert('提示', "请选择一条记录！", 'info');
		 return;
	 }
	 $.messager.confirm('提示','您确认想要删除记录吗？',function(r){    
		//判断是否删除
	    if (r){  
	    	 $.getJSON(webContextRoot +'assetsManagement/deleteAssetManageByOut.action', 
			 {
			   'assetsManagementModel.id' : selectRow.id //检查明细 ID
			 },
			 function(data){//回调
				if(data.saveSUCCESS=="true"){
			    	$.messager.alert('确认', "删除成功！", 'info');
		    		// 重新加载数据
			    	queryAssetOutTable();
				 }else{
					 $.messager.alert('确认', "删除失败！", 'warning');//移除失败
				 }
			  },"json");//返回格式
	      }
	 });  
}

/**
 * 查询详情 
 */
function queryAssetInfoByOut(propId,startDate){
	
	$.ajax({
		type: "post",
		url:webContextRoot + 'assetsManagement/queryAssetOutById.action',//请求地址
		data: "assetsManagementModel.id=" + propId,
		dataType:"json",		// 返回类型
		cache : false,
		async : false,			// 同步异步请求
		success: function(data){
			$("#outInfoConsId").hide();
			
			if(data[0].PROP_NAME.length > 10){
				$('#info_out_propName').text(data[0].PROP_NAME.substr(0,8)+"...");
				$('#info_out_propName').attr('title',data[0].PROP_NAME);
			}else{
				$('#info_out_propName').text(data[0].PROP_NAME);
			}
			$('#info_out_propOwner').text(data[0].CODE_NAME);
			$('#info_out_propType').text(data[0].PROP_NO_NAME);
			$('#info_out_propId').text(data[0].PROP_NO);
			$('#info_out_propSpec').text(data[0].PROP_SPEC);
			$('#info_out_guarTime').text(data[0].GUAR_TIME);
			$('#info_out_buyDate').text(data[0].BUY_DATE);
			$('#info_out_useYearNum').text(data[0].USE_YEAR_NUM);
			$('#info_out_prickle').text(data[0].PRICKLE);
			$('#info_out_propNum').text(data[0].PROP_NUM);
			$('#info_out_propPrice').text(data[0].PROP_PRICE);
			$('#info_out_useDate').text(data[0].USE_DATE);
			$('#info_out_useDep').text(data[0].USE_DEP);
			$('#info_out_usePeople').text(data[0].USE_PEOPLE);
			$('#info_out_memo').text(data[0].MEMO);	
		}
	});
	
	value = 1;
	// 修改标题
	$('#xmxqOut').window('setTitle',"详情");
	$('#xmxqOut').window('open');
	
}

/**
 * 资产出库修改 
 */
function out_update(){
	consComboboxSelectd1 = '';
	// 出库更新
	clearTableByOutUp();
	var selectRow = $('#data_gridOut').datagrid('getSelected'); // 获取选中的一行记录
	if(selectRow==null){
		$.messager.alert('提示', "请选择一条记录！", 'info');
		return;
	}
	$.getJSON(webContextRoot +'assetsManagement/queryAssetOutById.action', 
	{
		'assetsManagementModel.id' : selectRow.id
	},
	function(data){//回调
		if(data.length > 0){
			$('#out_u_propType').combotree('setValue',data[0].PROP_NO_NAME);
			$('#out_u_propId').textbox('setValue',data[0].PROP_NO);
			$('#out_u_propSpec').textbox('setValue',data[0].PROP_SPEC);
			$('#out_u_propName').textbox('setValue',data[0].PROP_NAME);
			$('#out_u_guarTime').textbox('setValue',data[0].GUAR_TIME);
			$('#out_u_buyDate').datebox('setValue',data[0].BUY_DATE);
			$('#out_u_useYearNum').textbox('setValue',data[0].USE_YEAR_NUM);
			$('#out_u_prickle').textbox('setValue',data[0].PRICKLE);
			$('#out_u_propNum').textbox('setValue',data[0].PROP_NUM);
			$('#out_u_propPrice').textbox('setValue',data[0].PROP_PRICE);
			$('#out_u_useDate').datebox('setValue',data[0].USE_DATE);
			$('#out_u_useDep').textbox('setValue',data[0].USE_DEP);
			$('#out_u_usePeople').textbox('setValue',data[0].USE_PEOPLE);
			$('#out_u_memo').textbox('setValue',data[0].MEMO);
			
			// 资产所属
			$('#out_u_propOwner').combobox({
				panelWidth:155,				// 设置下拉的宽度 和下拉框保持一致
				url:webContextRoot +'assetsManagement/queryAssetInByBelong.action',
				valueField:'CODE_VALUE',
				textField:'CODE_NAME',
				onLoadSuccess: function () {// 下拉框数据加载成功调用
		        	var propOwnerData = $(this).combobox("getData");// 得到查询的list集合
		        	if(propOwnerData.length>0){
		        		$('#out_u_propOwner').combobox('select',data[0].PROP_OWNER);
		        	}else{
		        		$('#out_u_propOwner').combobox('select','');
		        	}
		        }
			});
			
			// 计量单位
			$('#out_u_prickle').combobox({
				panelWidth:155,				// 设置下拉的宽度 和下拉框保持一致
				url:webContextRoot +'assetsManagement/queryAssetInByUnits.action',
				valueField:'CODE_VALUE',
				textField:'CODE_NAME',
				onLoadSuccess: function () {// 下拉框数据加载成功调用
		        	var prickleData = $(this).combobox("getData");
		        	if(prickleData.length>0){
		        		$('#out_u_prickle').combobox('select',data[0].PRICKLE);
		        	}else{
		        		$('#out_u_prickle').combobox('select','');// 没有生产线时
		        	}
		        }
			});
			
		}
	},"json");//返回格式
	
	$('#out_u_consId').combobox({    
		url:webContextRoot +'destree/queryConsList.action',
		valueField: 'id',
		textField: 'text' ,
//		onChange: function(newValue, oldValue){
//		ziMu
//		},
		mode : 'remote',
		onHidePanel : function(){$('#out_u_consId').combobox('reload');},
		onSelect : function(record){
			// 选择客户没变时，不需要再次加载联动控件
			if(consComboboxSelectd1 != record.id){
				consComboboxSelectd1 = record.id;
				consID = record.id;//获取企业编号
				if(!isNaN(consID)){
		    	//根据企业节点下一级
				 $.getJSON(webContextRoot +'destree/queryYhbTree.action?treeState=open'
						 +'&isAllTreeNode=true&treeNodeType=1&checkNodeList='+devIdArr+'&id='+consID,{},
						function(json){
							 $('#out_u_deviceName').combotree({
								data:json,
								onLoadSuccess:function(){
									var node = $('#out_u_deviceName').combotree('tree').tree('find',devIdArr);
									if(node!=null){
										$('#out_u_deviceName').combotree('setValue',node.text);
										$('#out_u_deviceName').combotree('tree').tree('select',node.target);
										//选中的设备节点
										var selected = $('#out_u_deviceName').combotree('tree').tree('getSelected');
									}
									devIdArr=null;//清空选中节点状态
									consID = null;
								},onClick:function(data){
									// 获取当前节点的父节点
									var father = $(this).tree("getParent",data.target);
									// 点击根节点不查询
									if(father == null){
										return;
									}
									// 资产名称赋值
									$('#out_u_propName').textbox('setValue',data.rootName);
									// 动态获取资产类别
									$.getJSON(webContextRoot +'assetsManagement/queryCascadingType.action', 
										 {
										   'assetsManagementModel.propType' : father.text //检查明细 ID
										 },
										 function(json){
											 if(json.length > 0){
												 $('#out_u_propType').textbox('setValue',json[0].text);
												 isValue = true;
												 propLevel = json[0].id;
											 }else{
												 isValue = false;
												 $('#out_u_propType').textbox('setValue','');
											 }
										 }
									);
				                      
								 }
							 });
						}
					  );
				}
			}
		}
	});
	
	// 加载资产树
	$('#out_u_propType').combotree({
		url:webContextRoot+'assetsManagement/queryAssetTree.action',
		onLoadSuccess : function(node,data){
			propTypeId = data[0].id;
		    $(this).tree('collapseAll');
		},onClick:function(node,data){
//			propNo = node.id;
			propType = node.id;
		}
	});
	
	//获取选中行的对象
	var selections = $('#data_gridOut').datagrid('getSelections');
	var selected = selections[0];
	devIdArr = selected.deviceId;
	consID = selected.consId;
	
	$('#out_u_consId').combobox('select',consID); //选中客户
	
	setTimeout('outUpdateDialog();',800);
//	 $.easyui.loading({ msg: "正在加载..." });
     //window.setTimeout(function () { $.easyui.loaded(); }, 1000);
	
	// 正在加载。。。
	load();
}

/**
 * 修改弹窗 
 */
function outUpdateDialog(){
	$('#out_updateDialog').window('setTitle',"修改");
	$('#out_updateDialog').window('open');
	disLoad();
}

/**
 * 切换tab 
 */
function checkValue(value){
	/**
	 * 切换入库出库
	 */
	if(value == '0'){
		$('#assetIn').show();
		$('#divSearchIn').show();
		$('#assetOut').hide();
		$('#divSearchOut').hide();
		$('#tool_buttonOut').hide();
		queryAssetInTable();
	}else{
		$('#assetIn').hide();
		$('#divSearchIn').hide();
		$('#assetOut').show();
		$('#divSearchOut').show();
		$('#tool_buttonOut').show();
		queryAssetOutTable();
	}
}

/***
 * 入库选择录入or现有资产 
 */
function inLogging(value){
	// 0 显示用户名称和设备名称
	if(value == '0'){
		$("#inConsId").show();
		$("#inBuqi").hide();
	}else if(value == '1'){
		$("#inConsId").hide();
		$("#inBuqi").show();
	}
}

/**
 * 入库更新选择 
 */
function inExisting(value){
	// 0 显示用户名称和设备名称
	if(value == '0'){
		$("#upConsId").show();
		$("#inUpBuqi").hide();
	}else if(value == '1'){
		$("#upConsId").hide();
		$("#inUpBuqi").show();
	}
}

/**
 * 初始化加载 
 */
$(function(){
	$('#assetIn').show();
	$('#assetOut').hide();
	$('#divSearchOut').hide();
	$('#tool_buttonOut').hide();
	// 初始化执行
	initialize();
	
	// 资产入库查询
	queryAssetInTable();
	
	// 入库详情清空
	$('#infoDialog').dialog({
		onClose:function(){
			$('#info_consId').textbox('setValue','');
			$('#info_deviceName').textbox('setValue','');
			$('#info_propOwner').textbox('setValue','');
			$('#info_propType').textbox('setValue','');
			$('#info_propId').textbox('setValue','');
			$('#info_propSpec').textbox('setValue','');
			$('#info_propName').textbox('setValue','');
			$('#info_guarTime').textbox('setValue','');
			$('#info_buyDate').textbox('setValue','');
			$('#info_useYearNum').textbox('setValue','');
			$('#info_prickle').textbox('setValue','');
			$('#info_propNum').textbox('setValue','');
			$('#info_propPrice').textbox('setValue','');
			$('#info_inDate').textbox('setValue','');
			$('#info_memo').textbox('setValue','');
		}
	});
	
	// 出库清除详情
	$("#outInfoDialog").dialog({// 电量弹窗	
		onClose:function(){
			$('#info_out_consId').textbox('setValue','');
			$('#info_out_deviceName').textbox('setValue','');
			$('#info_out_propOwner').textbox('setValue','');
			$('#info_out_propType').textbox('setValue','');
			$('#info_out_propId').textbox('setValue','');
			$('#info_out_propSpec').textbox('setValue','');
			$('#info_out_propName').textbox('setValue','');
			$('#info_out_guarTime').textbox('setValue','');
			$('#info_out_buyDate').textbox('setValue','');
			$('#info_out_useYearNum').textbox('setValue','');
			$('#info_out_prickle').textbox('setValue','');
			$('#info_out_propNum').textbox('setValue','');
			$('#info_out_propPrice').textbox('setValue','');
			$('#info_out_useDate').textbox('setValue','');
			$('#info_out_useDep').textbox('setValue','');
			$('#info_out_usePeople').textbox('setValue','');
			$('#info_out_memo').textbox('setValue','');
		}
	});
	
});
