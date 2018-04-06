/**
 * 签约管理
 * @author 王梓璇
 * @since 2017-05-08
 */

var consName = '';//模糊查询客户名称
var editType = '';//修改类型  A代表增加，U代表修改，D代表删除
var consId = '';//客户 id
var updateObjects = '';//修改之前的内容
var startDate = new Date(); // 当前开始时间 为当前时间往前推一年
var endDate = new Date();//当前结束时间  为当前时间

var issfxy = '';//是否响应
var sqydxynl = '';//申请约定响应能力
var joinYear = '';//参与年份
var ifRealResp = '';//是否响应
var memo = '';//备注
var respNum = '';
var aiFileName = '';
var aiUrl = '';
var editType = '';//类型  A代表新增，U代表修改，D代表添加
var aiFileName = '';
var manageId = '';

var filePicker = '#butA'; //添加文件的按键ID
var thumbnailNumber = 1;  //上传数量
var $btn = $("#btn_save"); // 开始上传保存的按钮ID
var $list = $("#htwj"); //文件显示的ID位置
var isEdit = new Array();  //判断哪些报告修改了
var consComboboxSelectd = '';

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
	
	/*//故障图片一键上传
	$('#butA').upload({
		name:'uploadImage',
		action:webContextRoot +'gdgl/uploadFile.action',
		onSelect:function(data){
			 this.autoSubmit = false;
			 if(!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(this.filename())){
				 $.messager.alert('提示', "文件格式错误！", 'warning');
				 return;
             }else if($("#imageA_logo").attr("src")==null||$("#imageB_logo").attr("src")==null||$("#imageC_logo").attr("src")==null){
            	 this.submit();  //手动提交
             }else{
            	 //alert("超过最大上传数量");
            	 $.messager.alert('提示', "超过最大上传数量！", 'warning');
             }
		},
		onComplete:function(data){//回显已经上传的图片
			var obj = eval("(" + data + ")");
			if(obj.message == "true"){
				var noUpload = '<img class="del noUp" src="'+webContextRoot+'pages/despages/common/jquery-easyui-1.5.1/themes/icons/cancel.png"></img>';
				aiUrl = obj.urlImage;//附件地址
				var html = aiUrl.replace('upLoads/','');
				if(html.length>30){
					//文件名长度超过30，后面部分省略
					html='<a id="aiUrl" href="'+webContextRoot+aiUrl+'" target="_blank"   style="width: 120px; height: 30px;" title="'+html+'" download="'+html+'" >'+html.substr(0,28)+'...</a>';
				}else{
					//文件名长度不超过30，原样显示
					html='<a id="aiUrl" href="'+webContextRoot+aiUrl+'" target="_blank"   style="width: 120px; height: 30px;" title="'+html+'" download="'+html+'" >'+html+'</a>';
				}
				html += noUpload;
				$('#htwj').html(html);
				//取消上传
				if(html ==''){
					$("#sc").css('display','block');
				}else{
					$("#sc").css('display','none');
				}
				$(".del").click(function(){
					$('#htwj').html("");
					aiUrl = null;
					$("#sc").css('display','block');
				});
			}else{
				$.messager.alert('提示', "上传失败！", 'warning');
				return;
			}
		}
	});*/
	
	//是否能够实时响应下拉框
	   $('#sfxy').combobox({
		 panelWidth: null,
		 valueField:'id',
	     textField:'text',
		 editable: false,
     onSelect: function(rec){
    	 ifRealResp = rec.id;//是否能够实时响应
		},
		data: [{
			id: '0',
			text: '否',
			selected:true   
		},{
			id: '1',
			text: '是'
		}]
  }); 
	
	
	$('#startDate').val(DateUtil.dateToStr('yyyy',startDate));
	$('#AddjoinYear').val(DateUtil.dateToStr('yyyy',startDate));
	
	
    //查询表格数据
	queryGjxxpzData();
	
	
   //书写客户名称，模糊查询
	$('#consName').textbox({ 
	    iconAlign:'left',
	    onChange:function(newValue, oldValue){
	    	consName = newValue;
		} ,
	});
	 //申请约定响应能力
	$('#sqydxynl').textbox({    
	    iconAlign:'left',
	    onChange:function(newValue, oldValue){
	    	respNum = newValue;
		} 
	});
	 //生产线备注
	$('#bzName').textbox({    
	    iconAlign:'left',
	    onChange:function(newValue, oldValue){
	    	memo = newValue;
		} 
	});
	
	//选择大用户树
	$('#userTree').combobox({    
		url:webContextRoot +'destree/queryConsList.action',
		valueField: 'id',
		textField: 'text' ,
		mode : 'remote',
		onHidePanel : function(){$('#userTree').combobox('reload');},
		onSelect : function(record){
			// 选择客户没变时，不需要再次加载联动控件
			if(consComboboxSelectd != record.id){
				consComboboxSelectd = record.id;
		    	consId =  record.id;
		    	if(consId==null||consId==''){
		   	    	return;
		   	    } 
			   	$.getJSON(webContextRoot + 'qygl/queryConsDes.action', 
			   			{ 
			   			   //请求参数
			   				'signManageModel.consId': consId//开始时间
			   			},
			   			function(json){
			   				var consNoObj = document.getElementById('consNo');
			   				if(json.sMap.consNo==null){
			   					consNoObj.innerHTML = '';
			   				}else{
			   					consNoObj.innerHTML = json.sMap.consNo;
			   				}
			   				var htrlObj = document.getElementById('htrl');
			   				if(json.sMap.conCap==null){
			   					htrlObj.innerHTML = '';
			   				}else{
			   					htrlObj.innerHTML = json.sMap.conCap;
			   				}
			   			}
			   	);
			}
		}
	});
});

//左减日期
$('#left').click(function(){
	 var startDate =  $('#startDate').val();//获取当前开始日期
	 var nowDate = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('y',-1,DateUtil.strToDate(startDate+'-01-01')));//年份减1
	 $('#startDate').val(nowDate.substr(0,4));//重新赋值
	 queryGjxxpzData();
});

 //右加日期
$('#right').click(function(){
	 var startDate =  $('#startDate').val();//获取当前开始日期
	 var nowDate = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('y',1,DateUtil.strToDate(startDate+'-01-01')));//年份减1
	 $('#startDate').val(nowDate.substr(0,4));//重新赋值
	 queryGjxxpzData();
});

//根据客户名称模糊查询
function selectConsName(){
//	queryGjxxpzData();
	var startDate =  $('#startDate').val();
	$('#gjxxpz-datagrid').datagrid('load',{
		'signManageModel.consName' : consName,//trim()掉多余空格
		'signManageModel.joinYear':startDate
	});
}

/**
 * 列表数据
 * @param {} corporationId
 */
  function queryGjxxpzData(){
	  var startDate =  $('#startDate').val();//开始日期
	  var gridCommon = [[
			{field:'manageId',title:'ID',align:'left',hidden:'true'},
	 		{field:'consName',title:'客户名称',width: 200,align:'left'},
	 		{field:'consNo',title:'客户编号',width: 100,align:'left'},
	 		{field:'joinYear',title:'参与年份',width: 100,align:'left'},//是否能够实时响应 0=否 1=是
	 		{field:'respNum',title:'申请约定响应能力(kW)',width: 100,align:'left',
	 			formatter : function(value, row, index) {
	 				return HTMLEncode(value);
	 		}
            },
	 		{field:'contractCap',title:'合同容量(kVA)',width: 100,align:'left'},
	 		{field:'ifRealResp',title:'是否能够实时响应',width: 100,align:'left', formatter: function (index, row) {
	        	  if(row.ifRealResp ==0){
	        		  return '否';
	        	  }else if(row.ifRealResp ==1){
	        		  return '是';
	 			  }
              }},
	 		{field:'memo',title:'备注',width: 200,align:'left',formatter : function(value, row, index) {
				return HTMLEncode(value);
	 		}
           },
	 		{field:'aiUrl',title:'附件下载',width: 200,align:'left',formatter: function(v,rows,index){ //超链接
	 			var file = "";
				$.ajax({
					async : false,
					url : webContextRoot + 'pCode/judgeFileExist.action',
					data : {downloadFilePath : rows.aiUrl},
					dataType : "json",
					success : function(data) {
						if(data.FLAG == "1"){
							file = '<a id="'+webContextRoot+rows.aiUrl+'" href="'+webContextRoot+rows.aiUrl+'" target="_blank"   style="width: 120px; height: 30px;" download="'+rows.aiFileName+'" >'+rows.aiFileName+'</a>';
						}else if(data.FLAG == "2"){
							file = "<a id=\""+webContextRoot+rows.aiUrl+"\" href=\"#\" onclick=\"$.messager.alert('提示', '下载的文件不存在！', 'warning');\" style=\"width: 120px; height: 30px;\">"+rows.aiFileName+"</a>";
						}
					}
				});
				return file;
 		    }}
 		]];
	$('#gjxxpz-datagrid').datagrid({// 表格
		nowrap : false,// 设置为true，当数据长度超出列宽时将会自动截取。
		striped : true,// 设置为true将交替显示行背景。
		border:false,
		fit:true,
	    tools:"#btThrees",
		pagination : true,// 设置true将在数据表格底部显示分页工具栏。
		fitColumns : true,// 自动适应宽度
		singleSelect : true,// 设置为true将只允许选择一行。
		rownumbers : true,// 设置为true将显示行数。
		pageNumber:1,//在设置分页属性的时候初始化页码。
		pageSize:20,//在设置分页属性的时候初始化页面大小。
		url:webContextRoot +'qygl/querySignManage.action',
		queryParams:{
			'signManageModel.consName' : $.trim(consName),//trim()掉多余空格
			'signManageModel.joinYear':startDate
		},
		onLoadSuccess : function() {// 加载数据之后
			$('#gjxxpz-datagrid').datagrid('selectRow', 0); // 选择第一行
		},
		loadMsg : "正在努力的读取数据中...",// 提示信息
		columns : gridCommon,
		loadFilter: function(data){
			if (data.sMap){
				return data.sMap;
			} else {
				return data;
			}
		}
	});
}

//点击新闻标题查看新闻具体信息
function queryNewsDes(lineId,lineName,consName){
	var content = "<iframe src='"+webContextRoot+"pages/despages/warn/productLinePop.jsp?lineId="+lineId+"&lineName="+
	              lineName+"&consName="+ consName+"' width='100%' height='99%' frameborder='0' scrolling='no'/>";
	var boarddiv = "<div id='msgwindow' title='详情'/>";
	$(document.body).append(boarddiv);
	var win = $("#msgwindow").dialog({
		content : content,
		width : document.body.clientWidth-260,
		height : document.body.clientHeight-160,
		maximizable:true,
		closable:true,
		modal : 'shadow',
		title : lineName,
	});
	win.dialog('open');
} 
  
//增加按钮点击事件
function add(){
	document.getElementById('consNo').innerHTML = '';
	document.getElementById('htrl').innerHTML = '';

	qingkong();
	$('#userTree').combobox('enable');
	$('#AddjoinYear').val(DateUtil.dateToStr('yyyy',startDate));
	editType = 'A';//A代表增加
	$('#gjxxpz-cl-panel').dialog('open');
	$('#gjxxpz-cl-panel').dialog('setTitle','新增');
	
	//上传按键事件
	$("#butA").show();
	
	webUploader();
	clearUploader();
	
}
//保存按钮事件
function cxSave(){
	if($('#userTree').combobox('getValue') ==''){
		$.messager.alert('提示', "客户不能为空！", 'info', function(){
			$('#userTree').combobox('textbox').focus();
			$('#userTree').combobox('showPanel');
	    });
		return;
	}
	//公告类型
	  //判断是否有值
	if($('#sqydxynl').textbox('getValue') ==''){
			 $.messager.alert('提示', "申请约定响应能力不能为空！", 'info', function(){
				$('#sqydxynl').textbox('textbox').focus();
//				$('#sqydxynl').textbox('showPanel');
		     });
			 return;
		}
//	if(respNum%1 != 0){
//		 $.messager.alert('确认', "请输入整数", '温馨提示！');//移除失败
//		 return;
//	}
	if(respNum>999999999999.9999){
		 $.messager.alert('提示', "申请约定响应能力最大不能此范围！", 'info', function(){
				$('#sqydxynl').combobox('textbox').focus();
				$('#sqydxynl').combobox('showPanel');
	    	});
		 return;
	}
 //新闻内容
	if($('#bzName').textbox('getValue')!= null && $('#bzName').textbox('getValue').length>60){
		$.messager.alert('提示', "备注最多不能超过60字！", 'info', function(){
			$('#clsm').combobox('textbox').focus();
			$('#clsm').combobox('showPanel');
    	});
		return;
	} 
	
	if(editType == "A"){//新增情况
		//保存操作
		$.getJSON(webContextRoot + 'qygl/queryisCansaveConut.action',
				{ 
					'signManageModel.joinYear' : $('#AddjoinYear').val(),
					'signManageModel.consId' : $('#userTree').combobox('getValue'),
					'signManageModel.operateType' : 'A' 
				},
				function(json){
					 if(json.saveSUCCESS=="false")
					 {
						 $.messager.alert('确认', "当前客户在"+$('#AddjoinYear').val()+"年已经存在签约,请重新选择!", 'info', function(){
							$('#userTree').combobox('textbox').focus();
							$('#userTree').combobox('showPanel');
				    	 });
					 }else{//新增保存
						 saveGjpzDate('新增');	
					 }
				}
			);	
	} else if(editType == "U"){//修改情况 var editType = '';//类型  A代表新增，U代表修改，D代表添加
		var currentRow = $('#gjxxpz-datagrid').datagrid("getSelected");
		//保存操作
		$.getJSON(webContextRoot + 'qygl/queryisCansaveConut.action',
				{ 
			        'signManageModel.joinYear' : $('#AddjoinYear').val(),
			        'signManageModel.consId' : $('#userTree').combobox('getValue'),
					'signManageModel.manageId' : currentRow.manageId,//ID
					'signManageModel.operateType' : 'U'
				},
				function(json){
					if(json.saveSUCCESS=="false")
				    {
					 $.messager.alert('确认', "当前客户在"+$('#AddjoinYear').val()+"年已经存在签约,请重新选择!", 'info', function(){
							/*$('#userTree').combobox('textbox').focus();
							$('#userTree').combobox('showPanel');*/
				    	});
				    }else{
				    	saveGjpzDate('修改',updateObjects);	
				    }
				}
			);	
	}
}

//保存数据
function saveGjpzDate(editTypeName,rows){
	var startDate =  $('#AddjoinYear').val();//开始日期
	var manageId = null;//签约管理
	var urlName = $('#htwj').text();
	if(rows != null){//修改的时候传入被修改的记录
		manageId = rows.manageId;//签约管理ID
	}
	
	/**
	 * 获取文件的ID
	 */
	if(uploadArray.length == 0){
		aiUrl = '';
		aiFileName = '';
	}else{
		for(var i in uploadArray){
			var id = uploadArray[i].id;
			var type = $("#"+id).parent().attr("id");
			aiUrl = uploadArray[i].url;
			aiFileName = uploadArray[i].oldName;
		}
	}
	//保存操作
	$.getJSON(webContextRoot + 'qygl/saveSignManage.action',
			{ 
				'signManageModel.consId' : consId,
				'signManageModel.joinYear' : startDate,
				'signManageModel.ifRealResp' : ifRealResp,//生产线名称
				'signManageModel.memo': memo,//备注名称
				'signManageModel.createUser': loginUserId,
				'signManageModel.respNum':respNum,
				'signManageModel.upUserId': loginUserId,
				'signManageModel.manageId': manageId,
				'signManageModel.isEdit': isEdit.join(","),
				'signManageAttach.aiFileName' : aiFileName,//aiFileName
				'signManageAttach.aiUrl' : aiUrl,//aiUrl,
				'signManageAttach.editType' : editType//editType
			},
			function(json){
				if(json.saveSUCCESS=="true"){
					$.messager.alert('确认', editTypeName+"成功！", 'info', function(r){
						queryGjxxpzData();
						$('#gjxxpz-cl-panel').dialog('close');
					});
				}else{
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
		$('#gjxxpz-cl-panel').dialog('open');
		$('#gjxxpz-cl-panel').dialog('setTitle','修改');
		$('#sqydxynl').textbox('setValue',rows.respNum);//申请响应能力
		$('#bzName').textbox('setValue',rows.memo);//备注
		$('#userTree').combobox('select',rows.consId);
		$('#AddjoinYear').val(rows.joinYear);//重新赋值
		$('#userTree').combobox('disable');
		
		if(rows.listSignManageAttach[0]!=null){
			isEdit = new Array();
			$("#butA").hide();
			var noUpload = '<img class="noUpload" src="'+webContextRoot+'pages/despages/common/jquery-easyui-1.5.1/themes/icons/cancel.png"></img>';
			
			var aiUrl = rows.listSignManageAttach[0].aiUrl;
			var html = rows.listSignManageAttach[0].aiFileName;
			
			var file = "";
			$.ajax({
				async : false,
				url : webContextRoot + 'pCode/judgeFileExist.action',
				data : {downloadFilePath : aiUrl},
				dataType : "json",
				success : function(data) {
					if(data.FLAG == "1"){
						if(html.length>30){
							file='<a id="aiUrl" href="'+webContextRoot+aiUrl+'" target="_blank"  style="width: 120px; height: 30px;" title="'+html+'" download="'+html+'" >'+html.substr(0,28)+'...</a>';
						}else{
							file='<a id="aiUrl" href="'+webContextRoot+aiUrl+'" target="_blank"  style="width: 120px; height: 30px;" title="'+html+'" download="'+html+'" >'+html+'</a>';
						}
					}else if(data.FLAG == "2"){
						if(html.length>30){
							file="<a id=\"aiUrl\" href=\"#\" onclick=\"$.messager.alert('提示', '下载的文件不存在！', 'warning');\" style=\"width: 120px; height: 30px;\">"+html.substr(0,28)+"...</a>";
						}else{
							file="<a id=\"aiUrl\" href=\"#\" onclick=\"$.messager.alert('提示', '下载的文件不存在！', 'warning');\" style=\"width: 120px; height: 30px;\">"+html+"</a>";
						}
					}
				}
			});
			file += noUpload;
			$('#htwj').html(file);
			
			$(".noUpload").click(function(){
				$('#htwj').html("");
				$("#butA").removeClass('webuploader-element-invisible');
				$("#butA").show();
				uploadArray = [];
				/*webUploader();
				clearUploader();*/
				isEdit.push(1);
			});
		}else{
			$('#htwj').text('');//合同文件url
			$("#butA").show();
			/*webUploader();
			clearUploader();*/
		}
		
		$('#startDate').val(rows.joinYear);//重新赋值
		if(rows.ifRealResp=='0'){
			$('#sfxy').combobox('setValue','否');	
		}else {
			$('#sfxy').combobox('setValue','是');	
		}
		
		
		updateObjects = rows;
	}
	webUploader();
	clearUploader();
}

function deleteGjpz(){
	editType = 'D';//D代表删除
	var rows = $('#gjxxpz-datagrid').datagrid("getSelected");
	if(rows==null){
		$.messager.alert('提示', "请选择一条信息！", 'warning');
	}else{
		$.messager.confirm('提示', "是否要删除数据?", function(r){
			if(r){
				$.getJSON(webContextRoot + 'qygl/saveSignManage.action',
						{ 
					        'signManageModel.manageId': rows.manageId,
							'signManageAttach.editType': editType
						},
						function(json){
							if(json.saveSUCCESS=="true"){
								$.messager.alert('确认', "删除成功！", 'info', function(r){
//						    		qingkong();
						    		cxClose();
						    		queryGjxxpzData();
						    	   
						    	});	 
						    }else{
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
//	$('#scxName').textbox('setValue','');//生产线名称
	$('#bzName').textbox('setValue','');//生产线备注
	$('#userTree').combobox('setValue','');//客户树
	$('#sqydxynl').textbox('setValue','');//申请响应能力
	$('#bzName').textbox('setValue','');//备注
	$('#userTree').combobox('select','');
	$('#sfxy').combobox('setValue','否');
	$('#htwj').text('');//合同文件url
	$('#AddjoinYear').val('');//重新赋值
	
}
//改变日期框里的值
function changeDate(){
	queryGjxxpzData();//查询数据
}
//joinYear 
function changeDateJoinYear(){
	
}

/**
 * 加载上传组件
 */
function webUploader() {
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
		/*chunked : true, // 允许分片
		chunkSize : 2 * 1024 * 1024, // 每片大小2M
		chunkRetry : 4, // 分片上传失败之后的重试次数
*/		threads : 3, // 上传并发数。允许同时最大3个上传进程
		// 去重
		duplicate : true,

		// 上传文件个数限制
		fileNumLimit : thumbnailNumber,
		// 单个文件大小限制 20M
		fileSingleSizeLimit : 20 * 1024 * 1024,

		// 选择文件类型。
		accept : {
			title : 'Images',
			extensions : 'gif,jpg,jpeg,bmp,png,doc,docx,xls,xlsx,txt,pdf,wps',
			mimeTypes : '.gif,.jpg,.jpeg,.bmp,.png,.doc,.docx,.xls,.xlsx,.txt,.pdf,.wps'
		},
		method : 'POST'

	});
	// 当有文件添加进来的时候
	uploader.on('fileQueued', function(file) { // webuploader事件.当选择文件后，文件被加载到文件队列中，触发该事件。等效于
		var $li = $('<span id="' + file.id + '" class="file-item thumbnail">'
				+ '<img>' // + '<div class="info">' + file.name + '</div>'
				+ '</span>'
		), $img = $li.find('img');

		// $list为容器jQuery实例
		$list.append($li);
		
		$("#butA").hide();
		
		// 创建缩略图
		// 如果为非图片文件，可以不用调用此方法。
		// thumbnailWidth x thumbnailHeight 为 100 x 100
		uploader.makeThumb(file, function(error, src) { // webuploader方法
				if(file.name.length>30){
					//文件名长度超过10，后面部分省略
					$img.replaceWith('<a id="file'+file.id+'" title="'+file.name+'" >'+file.name.substr(0,28)+'...</a>');
				}else{
					//文件名长度不超过10，原样显示
					$img.replaceWith('<a id="file'+file.id+'" title="'+file.name+'" >'+file.name+'</a>');
				}
				$("#"+file.id).append('<img id="delete'+file.id+'" class="noUpload" src="'+webContextRoot+'pages/despages/common/jquery-easyui-1.5.1/themes/icons/cancel.png"></img>');
				
				//删除事件
				$(".noUpload").click(function(){
					var file_id = $(this).attr("id").substr(6);
					//删除上传队列
					uploader.removeFile(file_id);
					//删除页面显示
					$("#"+file_id).remove();
					var id = $(this).attr("class");
					var index = id.indexOf("Delete");
//					$("#"+id.substr(0,index)).show();
					$("#butA").show();
				});
				return;
		},1,1);
	});
	
	//当validate不通过时，调用的方法
	uploader.on('error', function(type) {
//		console.log(type);
		if(type=='Q_TYPE_DENIED'){
			$.messager.alert('提示','请选择正确的文件类型!','info');  
		}else if(type=='F_EXCEED_SIZE'){
			$.messager.alert('提示','请选择0-20M的文件!','info');  
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
		//业务上的新增修改功能方法
		//前台数据提交
		cxSave();
		//清空上传列表
//		clearUploader();
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
	// 完成上传完了，成功或者失败，先删除进度条。
//	uploader.on('uploadComplete', function(file) {
//		$('#' + file.id).find('.progress').remove();
//	});
	$btn.on('click', function() {
		//前台数据验证  判断当前打开的是新增窗口还是修改窗口
		
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
//		uploader.removeFile(file_id);
		$("#"+file_id).remove();
	}
	uploader.reset();
	uploadArray = new Array();
	$("#butA").removeClass('webuploader-element-invisible');
}
