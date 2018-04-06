/**
 * 告警信息配置
 * @author 王梓璇
 * @since 2017-03-04
 */
myChart = '';
var alarmLevel = null;//告警等级
var alarmColor = null;//告警级别颜色
var alarmMode = null;//告警推送方式
var alId = null;
var areaNo = null;//区域编码
var alarmName = null;//告警名称
var remark = null;//备注
var isAdd = new Boolean(false);//判断是否能添加的布尔值
var updateObjects = '';
var setTime = 3;//初始化时间为3分钟

//7007 颜色的集合
var colorList='';

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
	//查询设置时间
  $.getJSON(webContextRoot + 'gjdj/selectsetTime.action', {  },
		function(json){
	       $('#setTime').textbox('setValue',json[0].collSetTime);
	       setTime = json[0].collSetTime;
		}
	);
   $.getJSON(webContextRoot  +'pCode/queryCode.action', 
		  { 'codeSortId':70007},
		  function(json){
	       colorList = json;
	       queryGjxxpzData();
			 //告警提示颜色
			$('#gjtsys').combobox({ 
				data:colorList,
				valueField: 'codeValue',
				textField: 'codeName' ,
				editable:'false' ,
				onChange: function(newValue, oldValue){
					alarmColor = newValue;
				},onLoadSuccess: function(){
					$('#gjtsys').combobox('setValue', '');
				}
			});
		}
	);
   //设置时间textBox事件
	$('#setTime').textbox({ 
	    iconAlign:'left',
	    onChange:function(newValue, oldValue){
	    	setTime = newValue;
		} ,
	});
	 //告警等级名称
	$('#gjjbmc').textbox({    
	    iconAlign:'left',
	    onChange:function(newValue, oldValue){
	    	alarmName = newValue;
		} 
	});
	
	//备注
	$('#clsm').textbox({    
	    iconAlign:'left',
	    onChange:function(newValue, oldValue){
	    	remark = newValue;
		} 
	});
 
    //告警排序等级
	$('#gjpxdj').combobox({ 
		url:webContextRoot +'pCode/queryCode.action?codeSortId=70006',
		valueField: 'codeValue',
		textField: 'codeName' ,
		editable:'false' ,
		onChange: function(newValue, oldValue){
			alarmLevel = newValue;
		},onLoadSuccess: function(){
			$('#gjpxdj').combobox('setValue', '');
		}
	});

	  //告警推送方式
	$('#gjtsfs').combobox({ 
		url:webContextRoot +'pCode/queryCode.action?codeSortId=70008',
		valueField: 'codeValue',
		textField: 'codeName' ,
		editable:'false' ,
		onChange: function(newValue, oldValue){
			alarmMode = newValue;
		},onLoadSuccess: function(){
			$('#gjtsfs').combobox('setValue', '');
		}
	});
	
	
});

//设置时间
 function updateTime(){
	 if(setTime.indexOf(".")>0){
		 $.messager.alert('确认', "时间设置范围（请输入3~99的整数!）", '温馨提示！');//移除失败
	 }else{
		 if(setTime>=3&&setTime<=99&&setTime.length<=2){
			    $.getJSON(webContextRoot + 'gjdj/updateGjxxpzTime.action',
				{ 
					'gjpzModel.collSetTime' : setTime,
				},
				function(json){
					if(json.updateTimeSUCCESS=="true")
				    {
					 $.messager.alert('确认', "修改时间成功！", 'info', function(r){
						 $('#setTime').textbox('setValue',setTime);
						 qingkong();
				    	 cxClose();
				    	   
				    	});	 
				    }
			    	else
			    	{
			    	 	$.messager.alert('确认', "修改失败！", 'warning');//移除失败
			    	}
				}
			);
		 }else{
			 $.messager.alert('提示', "时间设置范围（3~99分钟）！", '温馨提示！');//移除失败
		 }
		
	 }
	 
 }
 
/**
 * 列表数据
 * @param {} corporationId
 */
  function queryGjxxpzData(){
	  var gridCommon = [[
	 		{field:'areaNo',title:'所属区域编码',width: 200,align:'left'},
	 		{field:'areaNoName',title:'所属区域名称',width: 200,align:'left',
	 			formatter : function(value, row, index) {
	 				return HTMLEncode(value);
	 		}
            },
	 		{field:'alarmLevelName',title:'告警等级',width: 100,align:'center'},
	 		{field:'alarmName',title:'告警等级名称',width: 200,align:'center',sortable:true},
	 		{field:'alarmColorName',title:'告警颜色',width: 100, align:'center',
	         formatter: function (index, row) {
	        		  return "<span style:'vertical-align:middle'>"+getColorText(row.alarmColor)
	        		  +"</span><span style='vertical-align:middle;display:inline-block;width:20px;height:20px;background-color:"
	        		  +getColorContent(row.alarmColor)+"'></span>";
             }},
	 		{field:'alarmModeName',title:'推送方式',width: 200, align:'center'},
	 		{field:'remark',title:'备注',width: 200, align:'center',formatter : function(value, row, index) {
				return HTMLEncode(value);
	 		}
            }
 		]];
	$('#gjxxpz-datagrid').datagrid({// 表格
		nowrap : false,// 设置为true，当数据长度超出列宽时将会自动截取。
		striped : true,// 设置为true将交替显示行背景。
		fit: true,
	    tools:"#btThrees",
		border:false,
		pageSize:20,
		pagination : false,// 设置true将在数据表格底部显示分页工具栏。
		fitColumns : true,// 自动适应宽度
		singleSelect : true,// 设置为true将只允许选择一行。
		rownumbers : true,// 设置为true将显示行数。
		url:webContextRoot +'gjdj/queryGjxxpz.action',
		queryParams:{},
		onLoadSuccess : function() {// 加载数据之后
			$('#gjxxpz-datagrid').datagrid('selectRow', 0); // 选择第一行
		},
		loadMsg : "正在努力的读取数据中...",// 提示信息
		columns : gridCommon
	});
}

  var clearTimeoutFlag;//临时变量  
  /**
   *  下拉框的选择事件
   */
  function getColorContent(alarmColor){
	  clearTimeout(clearTimeoutFlag);
  	  for(var i=0;i<colorList.length;i++){
		  if(colorList[i].codeValue == alarmColor){
			  return colorList[i].content1;
		  }
	  }
	  return '';
 }
  
 //根据颜色编码获取颜色名称
 function getColorText(alarmColor){
	 clearTimeout(clearTimeoutFlag);
	   for(var i=0;i<colorList.length;i++){
		  if(colorList[i].codeValue == alarmColor){
			  return colorList[i].codeName;
		  }
	   }
	return '';
 }

function add(){
	isAdd = true;//新增状态
	$('#gjxxpz-cl-panel').dialog('open');
	$('#gjxxpz-cl-panel').dialog('setTitle','新增');
	
}
function cxSave(){
	//添加数据
	if(isAdd==true){
		if(checkCanSave()){
			addGjpzDate();	
		}
	}else{//修改数据
		if(checkCanSave()){
			updateGjpzDate(updateObjects);
		} 
	} 
}

//新增修改状态判断是否可以保存
function checkCanSave(){
  
	//判断是否有值
	if(alarmName==null || alarmName==''){
		 $.messager.alert('确认', "告警等级名称不能为空！", 'info', function(){
			$('#gjjbmc').textbox('textbox').focus();
			$('#gjjbmc').textbox('showPanel');
	     });
		 return false;
	}
	else if(alarmName.length>15)
	 {
		 $.messager.alert('确认', "告警级别名称不能超过15位！", 'info', function(){
				$('#gjjbmc').textbox('textbox').focus();
				$('#gjjbmc').textbox('showPanel');
	    });
		 return false;
	 }
	else if(alarmLevel==null||alarmLevel==''){
		$.messager.alert('确认', "请选择告警等级！", 'info', function(){
			$('#gjpxdj').combobox('textbox').focus();
			$('#gjpxdj').combobox('showPanel');
    	});
		return false;
	}
	else if(alarmColor==null|| alarmColor ==''){
		$.messager.alert('确认', "请选择告警颜色！", 'info', function(){
			$('#gjtsys').combobox('textbox').focus();
			$('#gjtsys').combobox('showPanel');
    	});
		return false;
	}
	else  if(alarmMode==null||alarmMode==''){
		$.messager.alert('确认', "请选择推送方式！", 'info', function(){
			$('#gjtsfs').combobox('textbox').focus();
			$('#gjtsfs').combobox('showPanel');
    	});
		return false;
	} 
	else if(remark != null && remark.length>50){
		$.messager.alert('确认', "备注最多不能超过50字！", 'info', function(){
			$('#clsm').combobox('textbox').focus();
			$('#clsm').combobox('showPanel');
    	});
		return false;
	} 
	
	var rows = $('#gjxxpz-datagrid').datagrid("getData");
	if(isAdd == true){//新增情况
		for(var i=0;i<rows.total;i++){
			if(rows.rows[i].alarmLevel == alarmLevel){
				$.messager.alert('确认', "当前告警等级已存在！", 'info', function(){
					$('#gjpxdj').combobox('textbox').focus();
					$('#gjpxdj').combobox('showPanel');
		    	});
				return false;
			}
		}
	} else {//修改情况
		var currentRow = $('#gjxxpz-datagrid').datagrid("getSelected");
		for(var j=0;j<rows.total;j++){
			if(rows.rows[j].alId != currentRow.alId){
				if(rows.rows[j].alarmLevel == alarmLevel){
					$.messager.alert('确认', "当前告警等级已存在！", 'info', function(){
						$('#gjpxdj').combobox('textbox').focus();
						$('#gjpxdj').combobox('showPanel');
			    	});
					return false;
				}
			}
		}
	}
	return true;//能够保存
}
 
//添加数据
function addGjpzDate(){
	 
	//保存操作
	$.getJSON(webContextRoot + 'gjdj/addGjxxpz.action',
			{ 
				'gjpzModel.alarmLevel' : alarmLevel,
				'gjpzModel.alarmName' : alarmName,
				'gjpzModel.alarmColor': alarmColor,
				'gjpzModel.alarmMode': alarmMode,
				'gjpzModel.remark': remark
				
			},
			function(json){
				 if(json.saveSUCCESS=="true")
				    {
				    	$.messager.alert('确认', "保存成功！", 'info', function(r){
				    		qingkong();
				    		cxClose();
				    		queryGjxxpzData();
				    	});
				    }
			    	else
			    	{
			    	 	$.messager.alert('确认', "保存失败！", 'warning');//移除失败
			    	}
			}
		);
}
//修改数据
function updateGjpz(){
	isAdd = false;//修改状态
	var rows = $('#gjxxpz-datagrid').datagrid("getSelected");
//	alert(rows.alId);
	if(rows==null){
		$.messager.alert('提示', "请选择一条信息！", 'warning');
	}
	$('#gjxxpz-cl-panel').dialog('open');
	$('#gjxxpz-cl-panel').dialog('setTitle','修改');
	$('#gjjbmc').textbox('setValue',rows.alarmName);
	$('#clsm').textbox('setValue',rows.remark);
	$('#gjpxdj').combobox('setValue',rows.alarmLevel);
	$('#gjtsfs').combobox('setValue',rows.alarmMode);
	$('#gjtsys').combobox('setValue',rows.alarmColor);
	updateObjects = rows;
}

function updateGjpzDate(rows){
	$.getJSON(webContextRoot + 'gjdj/updateGjxxpz.action',
			{ 
				'gjpzModel.alId' : rows.alId,
				'gjpzModel.alarmLevel' : alarmLevel,
				'gjpzModel.alarmName' : alarmName,
				'gjpzModel.alarmColor': alarmColor,
				'gjpzModel.alarmMode': alarmMode,
				'gjpzModel.remark': remark
			 
			},
			function(json){
				if(json.updateSUCCESS=="true")
			    {
				 $.messager.alert('确认', "修改成功！", 'info', function(r){
					 queryGjxxpzData();
			    		qingkong();
			    		cxClose();
			    	});	 
			    }
		    	else
		    	{
		    	 	$.messager.alert('确认', "修改失败！", 'warning');//移除失败
		    	 	
		    	}
			}
		);
}
function deleteGjpz(){
	var rows = $('#gjxxpz-datagrid').datagrid("getSelected");
//	alert(rows.alId);
	if(rows==null){
		$.messager.alert('提示', "请选择一条信息！", 'warning');
	}
	$.messager.confirm('提示', "是否要删除数据?", function(r){
		if(r){
			$.getJSON(webContextRoot + 'gjdj/deleteGjxxpz.action',
					{ 
						'gjpzModel.alId' : rows.alId,
					 
					},
					function(json){
						if(json.deleteSUCCESS=="true")
					    {
						 $.messager.alert('确认', "删除成功！", 'info', function(r){
					    		qingkong();
					    		cxClose();
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
function cxClose(){
	qingkong();
	$('#gjxxpz-cl-panel').dialog('close');
}
//清空
function qingkong(){
	
	$('#gjjbmc').textbox('setValue','');
	$('#clsm').textbox('setValue','');
	$('#gjpxdj').combobox('setValue','');
	$('#gjtsfs').combobox('setValue','');
	$('#gjtsys').combobox('setValue','');
	
	
}