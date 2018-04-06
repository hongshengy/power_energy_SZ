/**
 * 安全检查记录
 * @author 王梓璇
 * @since 2017-05-08
 */
var startDate = new Date();//当前开始时间 
var checkName = '';//检查人名称
var subsName = '';//建筑名称
var consId = '';//客户id
var consName = '';//客户名称
var timeType = '1';//数据查询类型
var tourId = '';//检查明细ID 修改的时候使用
var isUpdateSetSubs = false;//修改的时候设置建筑
var tourManY = "";//检查人
var subsNameY = "";//建筑名称
var startTime = null;//开始时间
var endTime = null;//结束时间
var editType = '';//操作状态
var currentdate = new Date();//系统时间
var startTimeY = currentdate.getFullYear()+"-"+currentdate.getMonth()+"-"+currentdate.getDate();//开始时间
var endTimeY = DateUtil.dateToStr('yyyy-MM-dd',currentdate);//结束时间
//var dataType = '';
var detailFormatter=true;//是否触发 detailFormatter 默认触发
//var aiUrl = '';
var tourProId = '100';
var isSystem = false;		// 是哪个系统使用的 true是宜兴 false其它
var areaNo = '';			// 区域编码 辨别哪个地区

var $list = $("#zztb_img"); //文件显示的ID位置
var $btn = $("#cxSave"); // 开始上传保存的按钮ID
var filePicker = '.filePicker'; //添加文件的按键ID
var thumbnailWidth = 60; // 缩略图高度和宽度
//（单位是像素），当宽高度是0~1的时候，是按照百分比计算，具体可以看api文档
var thumbnailHeight = 60;
var thumbnailNumber = 99;
var uploader = null; //上传组件对象
var uploadArray = new Array();//存放上传文件
var detailArr = new Array(); 
var maintourResult = '0';//巡视结果，默认良好
var imgLength = 0;		// 图片的个数
var deleteSize = 0;		// 删除的图片
var editIndex = undefined;
var fileArray = new Array();	// 队列中的图片
var firstUpdateConsId = 0;

$(function(){
	queryAreaNo();
	//自定义验证类型
	$.extend($.fn.validatebox.defaults.rules, {    
	    maxLength: {    
	        validator: function(value, param){    
	            return value.length <= param[0];    
	        },    
	        message: '请输入小于或等于{0}个字。'   
	    }    
	});  
	
	//开始日期设置格式
	$('#startDate').val(DateUtil.dateToStr('yyyy-MM-dd HH:mm:ss',startDate));
	
	//选择大用户树
	$('#userTree').combobox({    
		url:webContextRoot +'destree/queryConsList.action',
		valueField: 'id',
		textField: 'text' ,
//	    onChange: function(newValue, oldValue){
//	    	consId =  newValue;//客户id
//	   	    newValue = $('#userTree').combobox('getText');//客户名称ziMu
//	   	    if(isNaN(consId)||consId == null||consId == ''){//判空
//	   	    	return;
//	   	    }else{
//	   	    	$.getJSON(webContextRoot + 'aqjc/queryyhbName.action',{  
//	   					'pCodeModel.consId' : consId,//客户id
//				},
//				function(json){
//					yhbxiala(json);//建筑下拉框
//				}
//			   );
//	   	    } 
//		}
		mode : 'remote',
		onHidePanel : function(){$('#userTree').combobox('reload');},
		onSelect : function(record){
				consId = record.id;//获取企业编号
				if(firstUpdateConsId != 0){
					consId = firstUpdateConsId;
					firstUpdateConsId = 0;
				}
				if (!isNaN(consId)) {
		   	    	$.getJSON(webContextRoot + 'aqjc/queryyhbName.action',{  
						'pCodeModel.consId' : consId,//客户id
		   	    		},
		   	    		function(json){
		   	    			yhbxiala(json);//建筑下拉框
		   	    		}
		   	    	);
				}
		}
		
	});
	
    //巡视人下拉方法
	$.getJSON(webContextRoot + 'worknoteSend/selectQiangXiu.action',{   
			},
			function(json){
				qiangxiuxiala(json);//巡视人下拉框
			}
		);
	
	//日期选择框下拉
	$('#selectTime').combobox({
		 width: 155,
		 panelWidth: null,
		 height: 24,
		 valueField:'id',
	     textField:'text',
		 editable: false,
     onSelect: function(rec){
    	 if (rec.id == '5') {//其他的时候显示日期选择框
    		$("#sTime").show();
         	$('#startTime').datebox('setValue',startTimeY);//开始日期
        	$('#endTime').datebox('setValue',endTimeY);//结束日期
         }else{//否则不显示
        	 $("#sTime").hide();
         }
    	 timeType = rec.id;//数据查询类型
    	 autoResize.call(this);//手动调用激活
		},
		onLoadSuccess:function(){
        	$('#searchTime').combobox('select','1');
    	},
    	data: [{
			id: '0',
			text: '请选择',
			selected:true   
		},{
			id: '1',
			text: '一天内'   
		},{
			id: '2',
			text: '两天内'
		},{
			id: '3',
			text: '三天内'
		},{
			id: '4',
			text: '一周内'
		},{
			id: '5',
			text: '其他'
		}]
    }); 
	
    //查询主表上表格数据
	queryGjxxpzData();
	   
    //检查人名称
	$('#checkName').textbox({ 
	    iconAlign:'left',
	    onChange:function(newValue, oldValue){
	    	checkName = newValue;
		}
	});
	
	//建筑名称
	$('#subsName').textbox({    
	    iconAlign:'left',
	    onChange:function(newValue, oldValue){
	    	subsName = newValue;
		} 
	});
	
	//允许表格进行编辑
	$('#add-datagrid').datagrid().datagrid('enableCellEditing');
	
	//加载图片的方法
//	scriptManager.loadScirpt("lightBox",jsPath+"/lightbox/dist/js/lightbox.min.js", true);
	 
});

//根据客户名称，建筑名称模糊查询
function selectConsName(){
     //queryGjxxpzData();
	  var startTime =  $('#startTime').val();//开始日期
	  var endTime =  $('#endTime').val();//结束日期
	  //日期条件为其他的时候需要判断日期
	  if(timeType==5&&startTime> endTime){
			$.messager.alert('提示', "开始日期不能大于结束日期！", 'warning');
			return;
		}
	  //这样写：  重新请求的时候分页的选择数不变
	 $('#gjxxpz-datagrid').datagrid('load',{
		'sfTourModel.tourMan' :$.trim(checkName),//trim()掉多余空格
		'sfTourModel.subsName':$.trim(subsName),//trim()掉多余空格
		'sfTourModel.timeType':timeType,
		'sfTourModel.startTime':startTime,
		'sfTourModel.endTime':endTime
	  });
}

//主表列表数据
function queryGjxxpzData(){
	  var startTime =  $('#startTime').val();//开始日期
	  var endTime =  $('#endTime').val();//结束日期
	  //日期条件为其他的时候需要判断日期
	  if(timeType==5&&startTime> endTime){
			$.messager.alert('提示', "开始日期不能大于结束日期！", 'warning');
			return;
	  }
	  //表格数据
	  var  gridCommon = [[
	     	 		{field:'consName',title:'客户名称',width: 100,align:'left'},
	     	 		{field:'subsName',title:'建筑名称',width: 100,align:'left'},
	     	 		{field:'userName',title:'巡视人',width: 100,align:'left'},//是否能够实时响应 0=否 1=是
	     	 		{field:'tourDate',title:'巡视时间',width: 100,align:'left',sortable:true,
	     	 			sorter:function(a,b){  
//		    				a = a.split('/');  
//		    				b = b.split('/');  
//		    				if (a[2] == b[2]){  
//		    					if (a[0] == b[0]){  
//		    						return (a[1]>b[1]?1:-1);  
//		    					} else {  
//		    						return (a[0]>b[0]?1:-1);  
//		    					}  
//		    				} else {  
//		    					return (a[2]>b[2]?1:-1);  
//		    				}  
	     	 				return (a > b ? 1 : -1);
		    			}  
	     	 		},
	     	 		{field:'tourResult',title:'巡视结果',width: 100,align:'left',
	     	 			styler:function(v,row,index){
	     			    	if(v=="有缺陷"){
	     			    		return 'color:red';
	     			    	}
	     			    }},
	     	 		{field:'cnt',title:'详情',width: 100,align:'center',formatter: function(v,row,index){ //超链接
	     	 			 return '<a href="#" style="color:blue;margin-left:5px" onclick="queryNewsDes('
	     			        +"'"+row.tourId+"'"
	     					+ ')'
	     	 				 +'">'
	     	 				+ '详情</a>';
	     		    }}
	      		]];
	  
	  $('#gjxxpz-datagrid').datagrid({// 表格
			nowrap : false,// 设置为true，当数据长度超出列宽时将会自动截取。
			striped : true,// 设置为true将交替显示行背景。
			border:false,
			fit:true,
			tools:"#btThrees",
	//		width:'100%',
	/*	    height:400,*/
			pagination : true,// 设置true将在数据表格底部显示分页工具栏。
			fitColumns : true,// 自动适应宽度
			singleSelect : true,// 设置为true将只允许选择一行。
			rownumbers : true,// 设置为true将显示行数。
			pageNumber:1,//在设置分页属性的时候初始化页码。
			pageSize:20,//在设置分页属性的时候初始化页面大小。
			url:webContextRoot +'aqjc/querysafeManage.action',
			queryParams:{
				'sfTourModel.tourMan' : checkName,//巡视人名称
				'sfTourModel.subsName':subsName,//建筑名称
				'sfTourModel.timeType':timeType,//时间数据类型
				'sfTourModel.startTime':startTime,//开始时间
				'sfTourModel.endTime':endTime//结束时间
			},
			onLoadSuccess : function() {// 加载数据之后
				$('#gjxxpz-datagrid').datagrid('selectRow', 0); // 选择第一行
			},
			loadMsg : "正在努力的读取数据中...",// 提示信息
			remoteSort:false,
			columns : gridCommon,
			loadFilter: function(data){//分页数据
				if (data.sMap){
					return data.sMap;
				} else {
					return data;
				}
			}
	  });
}

//点击新闻标题查看新闻具体信息
function queryNewsDes(tourId){
	 var content = "<iframe src='"+webContextRoot+"pages/despages/warn/securityCheckPop.jsp?tourId="+tourId+"&areaNo="+areaNo+"'  width='100%' height='99%' frameborder='0' scrolling='no'/>";
	 var boarddiv = "<div id='msgwindow' title='详情'/>";
	 $(document.body).append(boarddiv);
	 var win = $("#msgwindow").dialog({
		content : content,//内容
		width : document.body.clientWidth-260,//弹出窗体宽
		height : document.body.clientHeight-160,//弹出窗体高
        maximizable:false,
		closable:true,
		modal : 'shadow',
		title : '安全管理详情',
	 });
	 win.dialog('open');
} 

//新增安全检查记录
function addData(){
	 clearTour();//清空 新增和修改 界面 的 巡视信息
	 $('#yhbTree').combobox('getValue'); //建筑 不可空
	 editType="A";//新增
	 detailFormatter=true;//是否触发 detailFormatter 默认触发
//	 webuploader();
	 querydataGrid();//查询表格数据
	 $('#gjxxpz-cl-panel').dialog('open');
	 $('#gjxxpz-cl-panel').dialog('setTitle','新增');
}

//修改安全检查记录
function updateData(){
	 clearTour();//清空 新增和修改 界面 的 巡视信息
	 editType="U";//修改
	 detailFormatter=true;//是否触发 detailFormatter 默认触发
	 querydataGrid();//查询表格数据
	 var selectRow = $('#gjxxpz-datagrid').datagrid('getSelected'); // 获取选中的一行记录
	 if(selectRow==null){
		 $.messager.alert('提示', "请选择一条记录！", 'info');
		 return;
	 }
	 isUpdateSetSubs=true;//设置建筑
	 
	 $.getJSON(webContextRoot +'aqjc/queryItemByTourId.action', 
		 {
		   'sfTourModel.tourId' : selectRow.tourId //检查明细 ID
		 },
		 function(data){//回调
			 $('#exceptContents').textbox('setValue',data[0].exceptContents);
		 },"json");//返回格式
	 
	 $('#userTree').combobox('clear');
	 firstUpdateConsId = selectRow.consId;
	 $('#userTree').combobox('setValue', selectRow.consId); //客户 不可空 
	 $('#yhbTree').combobox('clear');
	 $('#yhbTree').combobox('setValue', selectRow.subsId); //客户 不可空 
	 $('#qiangxiufzr').combobox('setValue', selectRow.tourMan); //巡视人 不可空
	 $('#startDate').val(selectRow.tourDate);
	 $('#gjxxpz-cl-panel').dialog('open');
	 $('#gjxxpz-cl-panel').dialog('setTitle','修改');
}

//删除安全检查记录
function deleteData(){
	 editType="D";//删除
	 var selectRow = $('#gjxxpz-datagrid').datagrid('getSelected'); // 获取选中的一行记录
	 if(selectRow==null){
		 $.messager.alert('提示', "请选择一条记录！", 'info');
		 return;
	 }
	 $.messager.confirm('确认','您确认想要删除记录吗？',function(r){    
	     if (r){    
//	         alert('确认删除');    
	    	 $.getJSON(webContextRoot +'aqjc/saveTour.action', 
			 {
			 'sfTourModel.tourId' : selectRow.tourId, //检查明细 ID
			 'sfTourModel.editType' : editType //操作状态 A 新增  U 修改  D 删除
			 },
			 function(data){//回调
				 if(data.saveSUCCESS=="true"){
					 $.messager.alert('确认', "删除成功！", 'info', function(r){
						 cxClose();
						 //查询表格数据
						 queryGjxxpzData();
					 });
				 }else{
					 $.messager.alert('确认', "删除失败！", 'warning');//移除失败
				 }
			 },"json");//返回格式
	     }    
	 });  
}

//setTimeout(cxSave,1000);

//function cxSave(){
////	setTimeout("newCxSave();",600);
//	newCxSave();
//}

//数据保存  新增修改  保存
function newCxSave(){
	
	 //判断 客户，建筑，巡视人 不可以为空  
	 //巡视时间 不得超过当前时间
	 //判断detailArr是否有数据，没有提示，不让 保存
	 //根据子项目判断  巡视主表的 巡视结果
	 if(checkCanSave()==false){
		//不符合保存条件，返回
		 return;
	 }
	 
//	 webuploader();
	 
	 $(".checkClass").textbox({
		 validType:'maxLength[200]'
	 });
	 var startDate =  $('#startDate').val();
	 
	if(editType == 'U'){
		var selectRow = $('#gjxxpz-datagrid').datagrid('getSelected'); // 获取选中的一行记录
		if(selectRow == null){
			$.messager.alert('提示', "请选择一条记录！", 'info');
			return;
		}
		tourId = selectRow.tourId;
	}
	var exceptContents = $.trim($('#exceptContents').textbox('getValue'));
	
	$.getJSON(webContextRoot +'aqjc/saveTour.action', 
	{
	   'sfTourModel.tourId' : tourId, //Id
	   'sfTourModel.consId' : consId, //客户编码  不可空
	   'sfTourModel.creator' : loginUserId, //创建人，为当前登录人
	   'sfTourModel.editor' :  loginUserId, //修改人，为当前登录人
	   'sfTourModel.subsId' : $('#yhbTree').combobox('getValue'), //建筑 不可空
	   'sfTourModel.tourMan' : $('#qiangxiufzr').combobox('getValue'), //巡视人 不可空
	   'sfTourModel.tourDate' : startDate, //巡视时间  不得大于当前时间 
	   'sfTourModel.tourResult' : maintourResult, // 巡视结果   所有已经巡视的为 良好  才是良好，否则就是有缺陷 根据子项目进行判断
	   'sfTourModel.editType' : editType, //操作状态 A 新增  U 修改  D 删除
	   'sfTourModel.detailJsonStr' : JSON.stringify(detailArr), //获取封装JSON后的参数
	   'sfTourModel.exceptContents' : exceptContents
	},
	function(data){//回调
		if(data.saveSUCCESS=="true"){
	    	$.messager.alert('确认', "保存成功！", 'info', function(r){
	    	 cxClose();
	    	 clearUploader();
	    	 
//	    	 window.location.reload();
	    	//查询表格数据
	    	queryGjxxpzData();
	    	});
		 }else{
			 $.messager.alert('确认', "保存失败！", 'warning');//移除失败
		 }
	 },"json");//返回格式

}


//新增修改状态判断是否可以保存
function checkCanSave(){
	
	//判断 客户，建筑，巡视人 不可以为空  
	//巡视时间 不得超过当前时间
	//判断detailArr是否有数据，没有提示，不让 保存
	//根据子项目判断  巡视主表的 巡视结果
	//判断是否有值
	if(consId==null || consId ==''){
		 $.messager.alert('提示', "客户不能为空！", 'info', function(){
			$('#userTree').combobox('textbox').focus();
			$('#userTree').combobox('showPanel');
	     });
		 return false;
	}
	else if($('#yhbTree').textbox('getValue') == null || $('#yhbTree').textbox('getValue') == ''){
		$.messager.alert('提示', "建筑不能为空", 'info', function(){
			$('#yhbTree').combobox('textbox').focus();
			$('#yhbTree').combobox('showPanel');
  	    });
		return false;
	}  
	else if($('#qiangxiufzr').textbox('getValue') == null || $('#qiangxiufzr').textbox('getValue') == ''){
		$.messager.alert('提示', "巡视人不能为空", 'info', function(){
			$('#qiangxiufzr').combobox('textbox').focus();
			$('#qiangxiufzr').combobox('showPanel');
  	    });
		return false;
	} 
	else if($('#qiangxiufzr').textbox('getValue') == null || $('#qiangxiufzr').textbox('getValue') == ''){
		$.messager.alert('提示', "巡视时间不能为空", 'info', function(){
  	    });
		return false;
	} //日期条件为其他的时候需要判断日期
	else if( $('#startDate').val() > DateUtil.dateToStr('yyyy-MM-dd HH:mm:ss',new Date())){
		$.messager.alert('提示', "巡视时间不能大于当前时间", 'info', function(){
			$('#startDate').textbox('textbox').focus();
  	    });
		return false;
	} 
	
	if(areaNo == '102'){
		if($('#exceptContents').textbox('getValue')!= null && $.trim($('#exceptContents').textbox('getValue')).length>300){
			$.messager.alert('提示', "缺陷巡视记录最多不能超过300字！", 'info', function(){
				$('#exceptContents').combobox('textbox').focus();
				$('#exceptContents').combobox('showPanel');
	    	});
			return false;
		}
	}
	
	return true;//能够保存
}

//新增修改窗口关闭
function cxClose(){
	$('#gjxxpz-cl-panel').dialog('close');	
}

//巡视人下拉框
function qiangxiuxiala(data){
	$('#qiangxiufzr').combobox({
		data:data,
		valueField:'chargrPersid',
		textField:'chargrPers'
	});
}

//建筑下拉框
function yhbxiala(data){
	$('#yhbTree').combobox({
		data:data,
		valueField:'codeValue',
		textField:'codeName'
	});
	if(isUpdateSetSubs == true){//修改的时候，加载完建筑，选中一个建筑
		var selectRow = $('#gjxxpz-datagrid').datagrid('getSelected'); // 获取选中的一行记录
		$('#yhbTree').combobox('setValue', selectRow.subsId); //建筑 不可空
		isUpdateSetSubs=false;
	}
}


 // 新增表格列表数据
function querydataGrid(){
	// 获取区域编码  判断应该加载哪些内容
	queryAreaNo();
	var selectRow;
	var tourId;
	if(editType=="U"){//修改状态
		selectRow = $('#gjxxpz-datagrid').datagrid('getSelected'); // 获取选中的一行记录
		if(selectRow==null){
			return;
		}
		tourId = selectRow.tourId;
	}
	var gridCommon = [];
	// 宜兴登录
	if(isSystem == true){
		gridCommon = [[
		               {field:'checkType',title:'检查类型',width: 100,align:'center',sortable:true},
		               {field:'proCotent',title:'检查项',width: 100,align:'center',sortable:true},
		               {field:'tourCotent',title:'巡视内容',width: 100,align:'center',sortable:true},
		               {field:'tourResult',title:'巡视结果',width: 150,align:'center',sortable:true,
		                 	styler:function(v,row,index){
		     			    	if(v=="1"){
		     			    		return 'color:red';
		     			    	}
		     			    },
		     			    formatter:function(value,row){
		     			    	if(row.tourResult=='1'){
		     			    		return '有缺陷';
		     			        }else if(row.tourResult=='0'){
		     			    		return '良好';
		     			    	}
		     				},
		     				editor:{
		     					type:'combobox',
		     					options:{
		     						 width: 155,
		     						 panelWidth: null,
		     						 height: 24,
		     						 valueField:'id',
		     					     textField:'text',
		     						 editable: false,
		     						data: [{
		     							id: '0',
		     							text: '良好',
		     						},{
		     							id: '1',
		     							text: '有缺陷'   
		     						} ]
		     					}
		     				}}
		      		]]; 
	// 其它地市
	}else{
		gridCommon = [[
		               {field:'checkType',title:'检查类型',width: 100,align:'center',sortable:true},
		               {field:'proCotent',title:'检查项',width: 100,align:'center',sortable:true},
		               {field:'tourProId',title:'检查项',width: 100,align:'center',sortable:true,hidden:true},
		               {field:'tourResult',title:'巡视结果',width: 150,align:'center',sortable:true,
		                 	styler:function(v,row,index){
		     			    	if(v=="1"){
		     			    		return 'color:red';
		     			    	}
		     			    },
		     			    formatter:function(value,row,index){
		     			    	if(row.tourResult=='1'){
		     			    		return '有缺陷';
		     			        }else if(row.tourResult=='0'){
		     			    		return '良好';
		     			    	}
		     				},
		     				editor:{
		     					type:'combobox',
		     					options:{
		     						 width: 155,
		     						 panelWidth: null,
		     						 height: 24,
		     						 valueField:'id',
		     					     textField:'text',
		     						 editable: true,
		     						data: [{
		     							id: '0',
		     							text: '良好',
		     						},{
		     							id: '1',
		     							text: '有缺陷'   
		     						} ]
		     					}
		     				}}
		      		]]; 
	}
	
	$('#add-datagrid').datagrid({// 表格
//		title:"详情",
//		halign:'center',
		nowrap : true,// 设置为true，当数据长度超出列宽时将会自动截取。
		striped : true,// 设置为true将交替显示行背景。
		border:false,
		width:'100%',
	    height:'100%',
		pagination : false,// 设置true将在数据表格底部显示分页工具栏。
		fitColumns : true,// 自动适应宽度
		singleSelect : true,// 设置为true将只允许选择一行。
		rownumbers : true,// 设置为true将显示行数。
		view: detailview,//定义DataGrid的视图
		pageNumber:1,//在设置分页属性的时候初始化页码。
		pageSize:20,//在设置分页属性的时候初始化页面大小。
		
		url:webContextRoot +'aqjc/querySfTourItem.action',
		queryParams:{
			'sfTourModel.tourId' : tourId, //建筑 不可空
			'sfTourModel.editType' : editType, //操作状态 A 新增  U 修改  D 删除
			'sfTourModel.areaNo' : areaNo
		},
		loadMsg : "正在努力的读取数据中...",// 提示信息
		columns : gridCommon,//字段
		onLoadSuccess:function(data){
//			$('#add-datagrid').datagrid('selectRow', 0); // 选择第一行
//			$('#add-datagrid').expandAll();
        	detailFormatter=false;
        	for(var i = 0 ; i < data.rows.length ; i++ ){
				$('#add-datagrid').datagrid('expandRow',i);
				$("#butA"+i).linkbutton({});
			}
        	webuploader();
        	setTimeout(function(){
        		for(var i = 0 ; i < data.rows.length ; i++ ){
        			$('#add-datagrid').datagrid('collapseRow',i);
        		}
        	},100);
            if(editType=="U"){//修改状态
             	$(".checkClass").textbox({
             		validType:'maxLength[200]'
             	});
             	
             	for(var i = 0 ; i < data.rows.length ; i++){
                	           
             		$('#except'+i).textbox('setText',data.rows[i].except);
             		var imgStr = '';
        			var imgUrl = [];
        			if(data.rows[i].scenePic != null && data.rows[i].scenePic != ''){
        				imgUrl = data.rows[i].scenePic.split(",");
        				// 获取图片个数 隐藏选择按钮使用
        				imgLength = imgUrl.length;
        				if(imgUrl.length == 1){
        					// 第一张图片
        					var src = webContextRoot;
        					// 判断照片是否存在
        					$.ajax({
        						async : false,
        						url : webContextRoot + 'pCode/judgeFileExist.action',
        						data : {downloadFilePath : imgUrl[0]},
        						dataType : "json",
        						success : function(data) {
        							if(data.FLAG == "1"){
        								src += imgUrl[0];
        							}else if(data.FLAG == "2"){
        								src += "/pages/despages/common/images/imageNotFound.png";
        							}
        						}
        					});

        					var $li = $('<span class="file-item thumbnail">'
        							+ '<a id="showHref'+'-'+i+'-'+0+'">'
        							+ '<img id="showPic'+'-'+i+'-'+0+'" src="'+src+'" width="60px" height="60px"><span id="delete" class="deleteIcon">▬</span>' // + '<div class="info">' + file.name + '</div>'
        							+ '</a>'
        							+ '</span>'
        					), $img = $li.find('a');
//        					$img.attr("href",webContextRoot+imgUrl[i]);
        					$("#theList"+i).append($li);
        				}
        				
        				if(imgUrl.length == 2){
        					var src = webContextRoot;
        					// 判断照片是否存在
        					$.ajax({
        						async : false,
        						url : webContextRoot + 'pCode/judgeFileExist.action',
        						data : {downloadFilePath : imgUrl[0]},
        						dataType : "json",
        						success : function(data) {
        							if(data.FLAG == "1"){
        								src += imgUrl[0];
        							}else if(data.FLAG == "2"){
        								src += "/pages/despages/common/images/imageNotFound.png";
        							}
        						}
        					});
        					var $li = $('<span class="file-item thumbnail">'
        							+ '<a id="showHref'+'-'+i+'-'+0+'">'
        							+ '<img id="showPic'+'-'+i+'-'+0+'" src="'+src+'" width="60px" height="60px"><span id="delete" class="deleteIcon">▬</span>' // + '<div class="info">' + file.name + '</div>'
        							+ '</a>'
        							+ '</span>'
        					), $img = $li.find('a');
        					$("#theList"+i).append($li);
        					
        					// 第二张图片
        					var src1 = webContextRoot;
        					// 判断照片是否存在
        					$.ajax({
        						async : false,
        						url : webContextRoot + 'pCode/judgeFileExist.action',
        						data : {downloadFilePath : imgUrl[1]},
        						dataType : "json",
        						success : function(data) {
        							if(data.FLAG == "1"){
        								src1 += imgUrl[1];
        							}else if(data.FLAG == "2"){
        								src1 += "/pages/despages/common/images/imageNotFound.png";
        							}
        						}
        					});
        					var $li1 = $('<span class="file-item thumbnail">'
        							+ '<a id="showHref'+'-'+i+'-'+1+'">'
        							+ '<img id="showPic'+'-'+i+'-'+1+'" src="'+src1+'" width="60px" height="60px"><span id="delete" class="deleteIcon">▬</span>' // + '<div class="info">' + file.name + '</div>'
        							+ '</a>'
        							+ '</span>'
        					), $img1 = $li1.find('a');
        					$("#theList"+i).append($li1);
        				}
        				
        				if(imgUrl.length == 3){
        					var src = webContextRoot;
        					// 判断照片是否存在
        					$.ajax({
        						async : false,
        						url : webContextRoot + 'pCode/judgeFileExist.action',
        						data : {downloadFilePath : imgUrl[0]},
        						dataType : "json",
        						success : function(data) {
        							if(data.FLAG == "1"){
        								src += imgUrl[0];
        							}else if(data.FLAG == "2"){
        								src += "/pages/despages/common/images/imageNotFound.png";
        							}
        						}
        					});
        					var $li = $('<span class="file-item thumbnail">'
        							+ '<a id="showHref'+'-'+i+'-'+0+'">'
        							+ '<img id="showPic'+'-'+i+'-'+0+'" src="'+src+'" width="60px" height="60px"><span id="delete" class="deleteIcon">▬</span>' // + '<div class="info">' + file.name + '</div>'
        							+ '</a>'
        							+ '</span>'
        					), $img = $li.find('a');
        					$("#theList"+i).append($li);
        					
        					// 第二张图片
        					var src1 = webContextRoot;
        					// 判断照片是否存在
        					$.ajax({
        						async : false,
        						url : webContextRoot + 'pCode/judgeFileExist.action',
        						data : {downloadFilePath : imgUrl[1]},
        						dataType : "json",
        						success : function(data) {
        							if(data.FLAG == "1"){
        								src1 += imgUrl[1];
        							}else if(data.FLAG == "2"){
        								src1 += "/pages/despages/common/images/imageNotFound.png";
        							}
        						}
        					});
        					var $li1 = $('<span class="file-item thumbnail">'
        							+ '<a id="showHref'+'-'+i+'-'+1+'">'
        							+ '<img id="showPic'+'-'+i+'-'+1+'" src="'+src1+'" width="60px" height="60px"><span id="delete" class="deleteIcon">▬</span>' // + '<div class="info">' + file.name + '</div>'
        							+ '</a>'
        							+ '</span>'
        					), $img1 = $li1.find('a');
        					$("#theList"+i).append($li1);
        					// 第三张图片
        					var src2 = webContextRoot;
        					// 判断照片是否存在
        					$.ajax({
        						async : false,
        						url : webContextRoot + 'pCode/judgeFileExist.action',
        						data : {downloadFilePath : imgUrl[2]},
        						dataType : "json",
        						success : function(data) {
        							if(data.FLAG == "1"){
        								src2 += imgUrl[2];
        							}else if(data.FLAG == "2"){
        								src2 += "/pages/despages/common/images/imageNotFound.png";
        							}
        						}
        					});
        					var $li2 = $('<span class="file-item thumbnail">'
        							+ '<a id="showHref'+'-'+i+'-'+2+'">'
        							+ '<img id="showPic'+'-'+i+'-'+2+'" src="'+src2+'" width="60px" height="60px"><span id="delete" class="deleteIcon">▬</span>' // + '<div class="info">' + file.name + '</div>'
        							+ '</a>'
        							+ '</span>'
        					), $img2 = $li2.find('a');
        					$("#theList"+i).append($li2);
        					// btnPic是添加照片按钮 数字指的是下标
        					$('.btnPic' + i).hide();
        				}
    					
        				
    					// 删除图片
    					$(".deleteIcon").click(function(){
	    					var file_id = $(this).attr("id").substr(6);
	    					// 删除图片
	    					$(this).parent().parent().remove();
	    					// 超过三张图片 隐藏按钮
	    					var dataLength = $('#add-datagrid').datagrid('getRows');
	    					for(var x = 0;x<dataLength.length;x++){
	    						// 遍历span下的照片个数
	    						$("span#theList" + x).each(function(i,dom){
	    							// 获取每个子元素 length
	    							if($(this).children('span').length < 3){
	    								$('.btnPic' + x).show();
	    							}
	    						});
	    					}
	    					
	    					
		    			});
    					
    					// $list为容器jQuery实例
//    					$list.append($li);
        				
        			}
             		
             	}
       	  
           }
        	
    	},
		detailFormatter: function(rowIndex, rowData){
			
			if(detailFormatter==false){
				return;
			}
//			$("#butA"+rowIndex).linkbutton({
//        		iconCls: 'icon-large-picture',
//        	    size:'large',
//        	    iconAlign:'top',
//        	    plain:true
//        	});
			var str = null; 
			str = '<div style="width: 700px; height: 75px; word-wrap: break-word; vertical-align: top; padding: 8px 0 5px 0;"><span id="theList'+rowIndex+'" class="theList'+rowIndex+'"></span>' + 
				  '    <span id="filePicker" class="filePicker"><span class="btnPic'+rowIndex+'">' + 
				  '        <a href="#" class="easyui-linkbutton shadow" data-options="iconCls:\'icon-large-picture\',size:\'large\',iconAlign:\'top\',plain:true"'+
				  '            id="butA'+rowIndex+'" style="width: 62px; height: 62px; vertical-align: 0;">添加照片</a>'+
				  '    </span></span></div>';
			
			return '<div class="toolsbar-panel" >' +
			'<div class="tbRow">'+
			'<span class="tools-labelgroup">'+
			'<p>现场描述:</p>'+
			'<input class="easyui-textbox checkClass" style="width:355px;height:24px;margin-left:10px;" id="except'+rowIndex+'" >'+
			'</span>'+
			'</div>' +
			'<div class="tbRow">'+
			'<span class="tools-labelgroup">'+
			'<p>现场图片:</p>'+
			'</span>'+
			'</div>' +
			'</div>'+
			str
			;
        },onExpandRow:function(rowIndex, rowData){// 点击+号展现
//        	uploader.reset();
//        	$("#butA"+rowIndex).linkbutton({
//        		iconCls: 'icon-large-picture',
//        	    size:'large',
//        	    iconAlign:'top',
//        	    plain:true
//        	});
        	
        	$(".checkClass").textbox({
        		validType:'maxLength[200]'
        	});
        	
        	$(".filePicker").click(function(){
        		var id = $(this).prev().attr("id");
        		$list = $("#"+id); //文件显示的ID位置
        	});
        	
        	// 加载上传组件
//        	webuploader();
        	
       },onClickRow:function(rowIndex,rowData){
    	   $(this).datagrid('scrollTo',1);
       }

	});  
}

/**
 * 关闭表格修改 
 */
function endEditing(){
  	if (editIndex == undefined){return true}
  	if ($('#add-datagrid').datagrid('validateRow', editIndex)){
  		$('#add-datagrid').datagrid('endEdit', editIndex);
  		editIndex = undefined;
  		return true;
  	} else {
  		return false;
  	}
}
  
//关闭表格修改
function accept(){
  	if (endEditing()){
  		$('#add-datagrid').datagrid('acceptChanges');
  	}
}

//表格可编辑扩展
$.extend($.fn.datagrid.methods, {
		editCell: function(jq,param){
			return jq.each(function(){
				var opts = $(this).datagrid('options');
				var fields = $(this).datagrid('getColumnFields',true).concat($(this).datagrid('getColumnFields'));
				for(var i=0; i<fields.length; i++){
					var col = $(this).datagrid('getColumnOption', fields[i]);
					col.editor1 = col.editor;
					if (fields[i] != param.field){
						col.editor = null;
					}
				}
				$(this).datagrid('beginEdit', param.index);
	            var ed = $(this).datagrid('getEditor', param);
	            if (ed){
	                if ($(ed.target).hasClass('textbox-f')){
	                    $(ed.target).textbox('textbox').focus();
	                } else {
	                    $(ed.target).focus();
	                }
	            }
				for(var i=0; i<fields.length; i++){
					var col = $(this).datagrid('getColumnOption', fields[i]);
					col.editor = col.editor1;
				}
			});
		},
	    enableCellEditing: function(jq){
	        return jq.each(function(){
	            var dg = $(this);
	            var opts = dg.datagrid('options');
	            opts.oldOnClickCell = opts.onClickCell;
	            opts.onClickCell = function(index, field){
	                if (opts.editIndex != undefined){
	                    if (dg.datagrid('validateRow', opts.editIndex)){
	                        dg.datagrid('endEdit', opts.editIndex);
	                        opts.editIndex = undefined;
	                    } else {
	                        return;
	                    }
	                }
	                dg.datagrid('selectRow', index).datagrid('editCell', {
	                    index: index,
	                    field: field
	                });
	                opts.editIndex = index;
	                opts.oldOnClickCell.call(this, index, field);
	            }
	            
	            
	        });
	    }
});

//清空 新增和修改 界面 的 巡视信息
function clearTour(){
	$('#userTree').combobox('setValue', ''); //客户 不可空
	$('#yhbTree').combobox('setValue', ''); //建筑 不可空
	$('#qiangxiufzr').combobox('setValue', ''); //巡视人 不可空
	$('#exceptContents').textbox('setValue','');
	$('#startDate').val(DateUtil.dateToStr('yyyy-MM-dd HH:mm:ss',startDate));
}

// 查询区域编码 判断是哪个地市使用的系统
function queryAreaNo(){
	areaNo = top.areaNo;
	// 102是宜兴登录
//	areaNo = '102';
	if(areaNo == '102'){
		isSystem = true;
		$("#gjxxpz-cl-panel").dialog({
			height : '540px',
			top:50,
		});
		$("#findBeizhu").show();
		tourProId = '0';
	}
//	$.ajax({
//		type: "post",
//		url:webContextRoot + 'information/querySfOrgCodeInfo.action',// 请求地址
//		data: null,
//		dataType:"json",		// 返回类型
//		cache : false,
//		async : false,			// 同步异步请求
//		success: function(data){
//			areaNo = data[0].areaNo;
//			// 102是宜兴登录
////			areaNo = '102';
//			if(areaNo == '102'){
//				isSystem = true;
//				$("#gjxxpz-cl-panel").dialog({
//					height : '540px',
//					top:50,
//				});
//				$("#findBeizhu").show();
//				tourProId = '0';
//			}
//		}
//	});
}


/**
 * 初始化webuploader上传组件
 */
function webuploader(){
	fileArray = new Array();
	
	uploadArray = new Array();
	// init webuploader
	uploader = WebUploader.create({
		// 选完文件后，是否自动上传。
		auto : false,

		// swf文件路径
		swf : webContextRoot
				+ '/pages/despages/common/webuploader-0.1.5/Uploader.swf',

		// 文件接收服务端。
		server : webContextRoot + 'webUploader/webUploader.action',

		// 选择文件的按钮。可选。
		// 内部根据当前运行是创建，可能是input元素，也可能是flash.
		pick : {
			"id" : filePicker,
			"multiple" : false
		// 禁止多选。
		},

		// 分片上传设置
//		chunked : true, // 允许分片
//		chunkSize : 5 * 1024 * 1024, // 每片大小2M
//		chunkRetry : 4, // 分片上传失败之后的重试次数
		threads : 3, // 上传并发数。允许同时最大3个上传进程
		// 去重
		duplicate : true,

		// 上传文件个数限制
		fileNumLimit : thumbnailNumber,
		// 单个文件大小限制 20M
		fileSingleSizeLimit : 20 * 1024 * 1024,

		// 只允许选择图片文件。
		accept : {
			title : 'Images',
			extensions : 'gif,jpg,jpeg,bmp,png',
			mimeTypes : '.gif,.jpg,.jpeg,.bmp,.png'
		},
		method : 'POST',

		// 传入参数。这两个参数会跟文件一起传给后台，用于跟后台对接，确认文件的来源。
		//预设定了2个参数，根据需求自行选择
//		formData : {
//			"parameter1" : "aaa",
//			"parameter2" : "bbb"
//		}

	});
	
	// 当有文件添加进来的时候
	uploader.on('fileQueued', function(file) { // webuploader事件.当选择文件后，文件被加载到文件队列中，触发该事件。等效于
		var $li = $('<span id="' + file.id + '" class="file-item thumbnail">'
				+ '<a>'
				+ '<img>' // + '<div class="info">' + file.name + '</div>'
				+ '</a>'
				+ '</span>'
		), $img = $li.find('img'),$a = $li.find('a');

		// $list为容器jQuery实例
		$list.append($li);
		
		
		//所有文件个数 - 取消上传文件个数
		var fileSize = uploader.getFiles().length - uploader.getFiles("cancelled").length;
		if(fileSize==thumbnailNumber){
			$(filePicker).hide();
		}
		
		// thumbnailWidth x thumbnailHeight 为 100 x 100
		uploader.makeThumb(file, function(error, src) { // webuploader方法
			
			$("#" + file.id).append('<span id="delete' + file.id + '" class="deleteIcon">▬</span>');
			$img.attr('src', src);
			$img.attr('width', thumbnailWidth+"px");
			$img.attr('height', thumbnailHeight+"px");
			$a.attr('href', src);
			$a.attr("data-lightbox","example-set");
			
			//删除事件
			$(".deleteIcon").click(function(){
					var file_id = $(this).attr("id").substr(6);
					//删除上传队列
				    uploader.removeFile(file_id);
				    
				    // 获取选中的文件id
				    var $parent = $('#'+file_id).parent()[0].id;
				    
				    var dataLength = $('#add-datagrid').datagrid('getRows');
					for(var x = 0;x<dataLength.length;x++){
						// 根据文件id获取父元素的id 然后查询该父元素下面有几个span子元素
					    // 如果有3个子元素 显示上传按钮
						if($("#" + $parent).children('span').length == 3){
							// 显示上传按钮
							$('.btnPic' + x + '').parent().parent().show();
						}
					}
				    
				    //删除页面显示
				    $("#"+file_id).remove();
				    
				    // 超过三张图片 隐藏按钮
					var dataLength = $('#add-datagrid').datagrid('getRows');
					for(var x = 0;x<dataLength.length;x++){
						// 遍历span下的照片个数
						$("span#theList" + x).each(function(i,dom){

							if($(this)[0].childElementCount >= 3){
								$('.btnPic' + x + '').parent().parent().hide();
							}
						});
					}
					try{
						for(var x = 0;x<dataLength.length;x++){
							if($("#" + file.id).parent()[0].id == "theList"+x){
								fileArray.push(x+"-"+file.id);
							}
						}
					}catch(err){
						
					}
					
			});
			
			// 超过三张图片 隐藏按钮
			var dataLength = $('#add-datagrid').datagrid('getRows');
			var scenePicUrl = '';
			var picSize = '';
			for(var x = 0;x<dataLength.length;x++){
				// 遍历span下的照片个数
				$("span#theList" + x).each(function(i,dom){

					if($(this)[0].childElementCount >= 3){
						$('.btnPic' + x + '').parent().parent().hide();
					}
					
				});
			}
			
			for(var x = 0;x<dataLength.length;x++){
				if($("#" + file.id).parent()[0].id == "theList"+x){
					fileArray.push(x+"-"+file.id);
				}
			}
			
			
		},1,1);
	});
	
	//当validate不通过时，调用的方法
	uploader.on('error', function(type) {
		if(type=='Q_TYPE_DENIED'){
			$.messager.alert('提示','请选择正确的文件类型!','info');  
		}else if(type=='F_EXCEED_SIZE'){
			$.messager.alert('提示','您选择的文件大小应小于20M!','info');  
		}else{
			$.messager.alert('提示','请选择正确的文件!','info');  
		}
	});

	// 文件上传成功，给item添加成功class, 用样式标记上传成功。
	uploader.on('uploadSuccess', function(file) {
		$('#' + file.id).addClass('upload-state-done');
	});
	
	// 文件上传成功接收服务器的返回值。
	uploader.on('uploadAccept', function(object,ret) {
		//获取上传文件的信息
		uploadArray.push(ret);
		
	});
	
	// 所有文件上传成功
	uploader.on('uploadFinished', function() {
		$(filePicker).show();
		//业务上的新增修改功能方法
		
//		 $('#add-datagrid').datagrid('selectRow',0); // 选择第一行
		// 获取数据的方法
		saveUpdateData();
		// 真正保存的方法
		newCxSave();
		
		//清空上传列表
		clearUploader();
	});

	// 文件上传失败，显示上传出错。
	uploader.on('uploadError', function(file) {
		var $li = $('#' + file.id), $error = $li.find('div.error');

		// 避免重复创建
		if (!$error.length) {
			$error = $('<div class="error"></div>').appendTo($li);
		}

		$error.text('上传失败');
	});

	$btn.on('click', function() {
		
//		setTimeout("saveUpdateData();",100);
		uploader.upload();
	});
}

/**
 * 清空上传列表
 */
function clearUploader(){
	var files = uploader.getFiles();
	for(var i in files){
		var file_id = files[i].id;
		$("#"+file_id).remove();
	}
	uploader.reset();
}

/**/
function saveUpdateData(){
	//关闭表格修改
	accept();
	var dg = $('#add-datagrid').datagrid('getRows');
	 detailArr = new Array(); 
	 maintourResult='0';//巡视结果，默认良好
	 var fileUrl = '';
	 for(var i =0;i<dg.length;i++){
		
		var detail = new Object();
		
		// 如果是有缺陷的 赋值
		if(dg[i].tourResult == 1){
			maintourResult = '1';
		}
		detail.tourResult = dg[i].tourResult;// 巡视结果
		detail.tourProId  = dg[i].tourProId;//项目ID
		detail.except = $('#except'+i).textbox('getText');//获取表格detail的输入内容
		//现场描述长度验证
		if(detail.except.length>200){
			$.messager.alert('提示', "现场描述需小于或等于200个字!", 'info', function(){});
			return;
		}
		fileUrl = '';
		var loadFile = '';
		if(uploadArray.length > 0){
			for(var x = 0;x<uploadArray.length;x++){
				var children = uploadArray[x].id;
				
				if(fileArray[x].substring(0,fileArray[x].indexOf("-")) == i){
					fileUrl += uploadArray[x].url+",";
//					continue;
				}
				
//				if(fileArray.length > 0){
//					for(var y = 0;y<fileArray.length;y++){
//						if(fileArray[y].substring(0,fileArray[y].indexOf("-")) == i){
//							fileUrl += uploadArray[x].url+",";
////							continue;
//						}
//					}
//					
//				}
				
				
			}
			
		}
		detail.scenePic = fileUrl;
		// 不修改的情况下 第一张图片
		if(typeof $('#showPic-'+i+'-0')[0] == 'undefined'){
			detail.scenePic += '';
		}else{
			// 是否包含style 如果包含 则说明该被隐藏
			if($('#showHref-'+i+'-0').attr("style")){
				// 隐藏掉的元素 追加空
				detail.scenePic += '';
			}else{
				// 没有隐藏的元素
				detail.scenePic += $('#showPic-'+i+'-0')[0].src.replace(webContextRoot,'') +',';
			}
			
		}
		// 第二张图片
		if(typeof $('#showPic-'+i+'-1')[0] == 'undefined'){
			detail.scenePic += '';
		}else{
			// 是否包含style 如果包含 则说明该被隐藏
			if($('#showHref-'+i+'-1').attr("style")){
				// 隐藏掉的元素 追加空
				detail.scenePic += '';
			}else{
				// 没有隐藏的元素
				detail.scenePic += $('#showPic-'+i+'-1')[0].src.replace(webContextRoot,'') +',';
			}
		}
		// 第三张图片
		if(typeof $('#showPic-'+i+'-2')[0] == 'undefined'){
			detail.scenePic += '';
		}else{
			// 是否包含style 如果包含 则说明该被隐藏
			if($('#showHref-'+i+'-2').attr("style")){
				// 隐藏掉的元素 追加空
				detail.scenePic += '';
			}else{
				// 没有隐藏的元素
				detail.scenePic += $('#showPic-'+i+'-2')[0].src.replace(webContextRoot,'') +',';
			}
		}

		// 第几行的照片
		if(detail.scenePic != null && detail.scenePic.length>0){//截取最后一位的逗号
			detail.scenePic = detail.scenePic.substring(0,detail.scenePic.length-1);
		}
		
		detailArr.push(detail);
	}
}

 