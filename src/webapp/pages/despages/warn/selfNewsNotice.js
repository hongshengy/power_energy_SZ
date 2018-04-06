/**
 * 告警信息配置
 * @author 王梓璇
 * @since 2017-03-04
 */
myChart = '';
var isAdd = new Boolean(false);//判断是否能添加的布尔值
var updateObjects = '';

//7007 颜色的集合
var colorList='';


var  newTitle = '';//新闻标题
var newType = '';//新闻类型
var typeNews = '';//填出面板新闻类型
var newsContent = '';//弹出的新闻内容
var titleNews = '';//弹出的新闻名称
var fjNews = '';//附件框的内容
var inputTime = '';
var inputUserId = '';
var aiFileName="";//附件名称
var aiUrl="";//附件地址
var editType = '';//修改或者增加类型

var $list = $("#fjNews"); //文件显示的ID位置
var $btn = $("#bt_add_commit"); // 开始上传保存的按钮ID
var filePicker = '.bt_upload'; //添加文件的按键ID
var thumbnailWidth = 60; // 缩略图高度和宽度
// （单位是像素），当宽高度是0~1的时候，是按照百分比计算，具体可以看api文档
var thumbnailHeight = 60;
var thumbnailNumber = 3;  //上传数量
var uploader = null; 	//上传组件对象
var last_bt_upload =null; //最后一次上传按键ID
var uploadArray = new Array();//装上传文件的数组
//var parameter1 = null;//上传时的参数，区分上传文件类型
var isEdit = "";  //判断哪些报告修改了
var editFlfgFileName;
var checkMark = "";
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
	
	//故障图片一键上传
//	$('#butA').upload({
//		name:'uploadImage',
//		action:webContextRoot +'gdgl/uploadFile.action',
//		onSelect:function(data){
//			 this.autoSubmit = false;
//			 /*if(!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(this.filename())){
//				 $.messager.alert('提示', "文件格式错误！", 'warning');
//				 return;
//             }else */if($("#imageA_logo").attr("src")==null||$("#imageB_logo").attr("src")==null||$("#imageC_logo").attr("src")==null){
//            	 this.submit();  //手动提交
//             }else{
//            	 //alert("超过最大上传数量");
//            	 $.messager.alert('提示', "超过最大上传数量！", 'warning');
//             }
//		},
//		onComplete:function(data){//回显已经上传的图片
//			var obj = eval("(" + data + ")");
//			if(obj.message == "true"){
//				 
//				aiUrl = obj.urlImage;//附件地址
//				var html = aiUrl.replace('upLoads/','');
//				$("#fjNews").attr("title",html);
//				html = html.length > 16 ? html.substr(0,14)+"...":html;
//				html+='<img class="noUpload" style="height:8px;width:8px;" src="'+webContextRoot+'pages/despages/common/jquery-easyui-1.5.1/themes/icons/cancel.png"></img>';
//				$('#fjNews').html(html);
//				//取消上传
//				$(".noUpload").click(function(){
//					$(this).parent().html("");
//					aiUrl = null;
//				});
//				
//			}else{
//				$.messager.alert('提示', "上传失败！", 'warning');
//				return;
//			}
//		}
//	});
	
	queryGjxxpzData();
	//新闻标题
	$('#newTitle').textbox({ 
	    iconAlign:'left',
	    onChange:function(newValue, oldValue){
	    	newTitle = newValue;
		} ,
	});
    //新闻类型  取自pcode70045
	$('#newType').combobox({ 
		url:webContextRoot +'pCode/queryCode.action?codeSortId=70045',
		valueField: 'codeValue',
		textField: 'codeName' ,
		editable:'false' ,
		onChange: function(newValue, oldValue){
			newType = newValue;
		},onLoadSuccess: function(){
			$('#newType').combobox('setValue', '');
		}
	});
	  //弹出的新闻类型  取自pcode70045
	$('#typeNews').combobox({ 
		url:webContextRoot +'pCode/queryCode.action?codeSortId=70045',
		valueField: 'codeValue',
		textField: 'codeName' ,
		editable:'false' ,
		onChange: function(newValue, oldValue){
			typeNews = newValue;
		},onLoadSuccess: function(){
			$('#typeNews').combobox('setValue', '');
		}
	});
	
	
	 //新闻名称
	$('#titleNews').textbox({    
	    iconAlign:'left',
	    onChange:function(newValue, oldValue){
	    	titleNews = newValue;
		} 
	});
	
//	//附件名称
//	$('#fjNews').textbox({    
//	    iconAlign:'left',
//	    onChange:function(newValue, oldValue){
//	    	fjNews = newValue;
//		} 
//	});
	
	//新闻内容
	$('#contentNews').textbox({    
	    iconAlign:'left',
	    onChange:function(newValue, oldValue){
	    	newsContent = newValue;//新闻内容
		} 
	});
 
	
});
//查询事件 
 function updateTime(){
//	 queryGjxxpzData();//刷新表格
		$('#gjxxpz-datagrid').datagrid('load',{
			'ceInfoNews.newsId' : null,
			'ceInfoNews.newsName' : newTitle,//新闻名称
			'ceInfoNews.newsType' : newType,//新闻类型
			'ceInfoNews.loginUserId':loginUserId
		});
 }
 
/**
 * 列表数据
 * @param {} corporationId
 */
  function queryGjxxpzData(){
 
	  var gridCommon = [[
             {field:'newsName',title:'标题',width:'30%',align:'left',formatter: function(v,row,index){ //超链接
 		        return '<a href="#" style="color:blue;margin-left:5px" onclick="queryNewsDes('
 				+ row.newsId
 				+ ')">'
 				+ v
 				+ '</a>';
 		    }},
//	 		{field:'newsName',title:'标题',width: 200,align:'left'},
	 		{field:'newsTypeName',title:'新闻类型',width: 200,align:'left'},
	 		{field:'inputTime',title:'录入时间',width: 100,align:'center'},
	 		{field:'inputUserName',title:'录入用户',width: 200,align:'center',sortable:true}
 		]];
	$('#gjxxpz-datagrid').datagrid({// 表格
		nowrap : false,// 设置为true，当数据长度超出列宽时将会自动截取。
		striped : true,// 设置为true将交替显示行背景。
		fit: true,
		border:false,
		pageNumber:1,//在设置分页属性的时候初始化页码。
		pageSize:10,//在设置分页属性的时候初始化页面大小。
		tools:"#btThrees",
		pagination : true,// 设置true将在数据表格底部显示分页工具栏。
		fitColumns : true,// 自动适应宽度
		singleSelect : true,// 设置为true将只允许选择一行。
		rownumbers : true,// 设置为true将显示行数。
		url:webContextRoot +'gdtjfx/queryOldNews.action',//新闻列表
		queryParams:{
			'ceInfoNews.newsId' : null,
			'ceInfoNews.newsName' : newTitle,//新闻名称
			'ceInfoNews.newsType' : newType,//新闻类型
			'ceInfoNews.loginUserId':loginUserId
		},
		onLoadSuccess : function() {// 加载数据之后
			$('#gjxxpz-datagrid').datagrid('selectRow', 0); // 选择第一行
		},
		loadMsg : "正在努力的读取数据中...",// 提示信息
		columns : gridCommon,
		loadFilter: function(data){//后台分页
			if (data.sMap){
				return data.sMap;
			} else {
				return data;
			}
		}
	});
}
//浏览内容
function look(){
	
}
function add(){
	editType = 'A';//赋值为可增加状态，A代表增加
	isEdit = false;
	updateObjects = null;
	isAdd = true;//新增状态
	checkMark = 1;
	qingkong();//新增前先清空所有数据
	$('#gjxxpz-cl-panel').dialog('open');
	$('#gjxxpz-cl-panel').dialog('setTitle','新增');
	$(".bt_upload").show();
	$btn = $("#bt_add_commit"); // 开始上传保存的按钮ID
	webUploader();
	clearUploader();	
}
//function cxSave(){
//	
//	if(editType == 'A'){//添加数据
//		if(checkCanSave()){//所填内容不为空，可保存信息
//			addGjpzDate(null);	//添加信息
//		}
//	}else if(editType == 'U'){//修改数据
//		if(checkCanSave()){//所填内容不为空，可保存信息
//		upGjpzDate(updateObjects);//修改信息
//		}
//	} else{//删除数据 为D删除
//		deleteGjpz();
//	}
//}

 
//添加数据
function addGjpzDate(updateObjects){
	if(editType == 'A'){
		if(uploadArray.length== 0){
			aiUrl = "";
			aiFileName = "";
			
		}else{
			aiUrl = uploadArray[0].url;
			aiFileName = uploadArray[0].oldName;
		}
		
		//新增操作
		 $.getJSON(webContextRoot + 'gdtjfx/saveCeInfoNews.action',
					{ 
						'ceInfoNews.newsName' : titleNews,//新闻名称
						'ceInfoNews.newsType' : typeNews,//新闻类型
						'ceInfoNews.content' : newsContent.replace('\n','</br>'),//新闻内容
						'ceInfoNews.orderNum' : 0,//排序
						'ceInfoNews.inputUserId' : loginUserId,//登录人id
						'ceInfoNews.editType' : editType,//A代表新增
						'ceInfoAttach.aiFileName' : aiFileName,//aiFileName附件名称
						'ceInfoAttach.aiUrl' : aiUrl,//aiUrl附件url
						'ceInfoAttach.isEdit' : isEdit//aiUrl附件url
					},
					function(json){
						 if(json.saveSUCCESS=="true")//如果保存成功
						    {
						    	$.messager.alert('确认', "保存成功！", 'info', function(r){
						    		qingkong();//清空数据
						    		cxClose();//关闭弹出框
						    		queryGjxxpzData();//查询数据
						    	});
						    }
					    	else
					    	{
					    	 	$.messager.alert('确认', "保存失败！", 'warning');//移除失败
					    	}
					}
				);
	}else if(editType == 'U'){
		var rows = $('#gjxxpz-datagrid').datagrid("getSelected");//选中行的所有数据
		if(rows==null){//如果没有选中，则提示让用户选择
			$.messager.alert('提示', "请选择一条信息！", 'warning');
		}else{
			if(uploadArray.length>0){
				aiUrl = uploadArray[0].url;
				aiFileName = uploadArray[0].oldName;
			}else{
				if($.trim($("#fjNews").text()).length>0){
					var rows = $('#gjxxpz-datagrid').datagrid("getSelected");//选中行的所有数据
					aiUrl = rows.listCeInfoAttach[0].aiUrl;
					aiFileName = rows.listCeInfoAttach[0].aiFileName
				}else{
					aiUrl = "";
					aiFileName = ""
				}				
			}		
			$.getJSON(webContextRoot + 'gdtjfx/saveCeInfoNews.action',
					{ 
				        'ceInfoNews.newsId' : rows.newsId,//新闻名称
						'ceInfoNews.newsName' : titleNews,//新闻名称
						'ceInfoNews.newsType' : typeNews,//新闻类型
						'ceInfoNews.content' : newsContent,//新闻内容
						'ceInfoNews.orderNum' : 0,
						'ceInfoNews.inputUserId' : loginUserId,//登录id
						'ceInfoNews.editType' : editType,//A代表新增
						'ceInfoAttach.aiFileName' : aiFileName,//aiFileName附件名称
						'ceInfoAttach.aiUrl' : aiUrl,//aiUrl附件url
						'ceInfoAttach.isEdit' : isEdit//aiUrl附件url
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
					});
		}
	}
}
//修改按钮事件
function updateGjpz(){
	editType = 'U';//赋值为修改状态
	isEdit = false;
	checkMark = 1;
	var rows = $('#gjxxpz-datagrid').datagrid("getSelected");//选中行的所有数据
	var html1 = "";
	var noUpload = "";
	if(rows==null){//如果没有选中，则提示让用户选择
		$.messager.alert('提示', "请选择一条信息！", 'warning');
	}else{
		$('#gjxxpz-cl-panel').dialog('open');//打开弹出面板
		$('#gjxxpz-cl-panel').dialog('setTitle','修改');
		$('#titleNews').textbox('setValue',rows.newsName);//新闻名称
		$('#typeNews').combobox('setValue',rows.newsType);//新闻类型
		$('#contentNews').textbox('setValue',rows.content);//新闻内容
		$(".bt_upload").addClass('webuploader-element-invisible');
		webUploader();
		clearUploader();
		if(rows.listCeInfoAttach[0] != undefined){
			editFlfgFileName = rows.listCeInfoAttach[0].aiFileName;
			noUpload = '<img class="del noUp" src="'+webContextRoot+'pages/despages/common/jquery-easyui-1.5.1/themes/icons/cancel.png"></img>';
			// 判断附件文件是否存在
			$.ajax({
				async : false,
				url : webContextRoot + 'pCode/judgeFileExist.action',
				data : {downloadFilePath : rows.listCeInfoAttach[0].aiUrl},
				dataType : "json",
				success : function(data) {
					if(data.FLAG == "1"){
						if(rows.listCeInfoAttach[0].aiFileName.length>10){
							//文件名长度超过30，后面部分省略
							html1='<a id="'+rows.listCeInfoAttach[0].aiUrl+'" href="'+webContextRoot+rows.listCeInfoAttach[0].aiUrl+'" target="_blank" class="zdbgFile"  style="width: 120px; height: 30px;" title="'+rows.listCeInfoAttach[0].aiFileName+'" download="'+rows.listCeInfoAttach[0].aiFileName+'" >'+rows.listCeInfoAttach[0].aiFileName.substr(0,10)+'...</a>';
						}else{
							//文件名长度不超过10，原样显示
							html1='<a id="'+rows.listCeInfoAttach[0].aiUrl+'" href="'+webContextRoot+rows.listCeInfoAttach[0].aiUrl+'" target="_blank" class="zdbgFile"  style="width: 120px; height: 30px;" title="'+rows.listCeInfoAttach[0].aiFileName+'" download="'+rows.listCeInfoAttach[0].aiFileName+'" >'+rows.listCeInfoAttach[0].aiFileName+'</a>';
						}
					}else if(data.FLAG == "2"){
						if(rows.listCeInfoAttach[0].aiFileName.length>10){
							//文件名长度超过30，后面部分省略
							html1="<a id=\""+rows.listCeInfoAttach[0].aiUrl+"\" href=\"#\" onclick=\"$.messager.alert('提示', '下载的文件不存在！', 'warning');\" class=\"zdbgFile\"  style=\"width: 120px; height: 30px;\">"+rows.listCeInfoAttach[0].aiFileName.substr(0,10)+"...</a>";
						}else{
							//文件名长度不超过10，原样显示
							html1="<a id=\""+rows.listCeInfoAttach[0].aiUrl+"\" href=\"#\" onclick=\"$.messager.alert('提示', '下载的文件不存在！', 'warning');\" class=\"zdbgFile\"  style=\"width: 120px; height: 30px;\">"+rows.listCeInfoAttach[0].aiFileName+"</a>";
						}
					}
				}
			});
			
			html1 += noUpload;
			$("#butA").addClass('webuploader-element-invisible');
		}else{
			editFlfgFileName = "";
			html1 = "";
			$("#butA").removeClass('webuploader-element-invisible');
		}				
		$("#fjNews").html(html1);
		$(".del").click(function(){
			$(this).parent().html("");
			$("#butA").removeClass('webuploader-element-invisible');
			$("#butA").show();
			isEdit = true;
		});
//		$.ajax({	
//			url:webContextRoot+'ydjk/selectProjectAccessInfo.action', 
//			data:{
//				'paim.prjId': rows.inputUserId
//			},
//			dataType:'json',
//			type:'post',
//			success:function(result){
//				var noUpload = '<img class="del noUp" src="'+webContextRoot+'pages/despages/common/jquery-easyui-1.5.1/themes/icons/cancel.png"></img>';
//				if(obj.aiFileName.length>30){
//					//文件名长度超过30，后面部分省略
//					html1='<a id="'+obj.aiUrl+'" href="'+webContextRoot+obj.aiUrl+'" target="_blank" class="zdbgFile"  style="width: 120px; height: 30px;" title="'+obj.aiFileName+'" download="'+obj.aiFileName+'" >'+obj.aiFileName.substr(0,28)+'...</a>';
//				}else{
//					//文件名长度不超过10，原样显示
//					html1='<a id="'+obj.aiUrl+'" href="'+webContextRoot+obj.aiUrl+'" target="_blank" class="zdbgFile"  style="width: 120px; height: 30px;" title="'+obj.aiFileName+'" download="'+obj.aiFileName+'" >'+obj.aiFileName+'</a>';
//				}
//				html1 += noUpload;
//				$("#fjNews").html(html1);
//			}
//		});
	}
}

//删除新闻
function deleteGjpz(){
	editType = 'D';//标志位delete
	var rows = $('#gjxxpz-datagrid').datagrid("getSelected");
	if(rows==null){
		$.messager.alert('提示', "请选择一条信息！", 'warning');
	}else{
		$.messager.confirm('提示', "是否要删除数据?", function(r){
			if(r){
				$.getJSON(webContextRoot + 'gdtjfx/saveCeInfoNews.action',
						{ 
							'ceInfoNews.newsId' : rows.newsId,
							'ceInfoNews.editType' : editType
						},
						function(json){
							if(json.saveSUCCESS=="true")
						    {
							 $.messager.alert('确认', "删除成功！", 'info', function(r){
						    		qingkong();//清空数据
						    		cxClose();//关闭面板
						    		queryGjxxpzData();//查询数据
						    	   
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
	qingkong();
	$('#gjxxpz-cl-panel').dialog('close');
}
//清空
function qingkong(){
	$('#titleNews').textbox('setValue','');//新闻标题
	$('#contentNews').textbox('setValue','');//新闻内容
	$('#typeNews').combobox('setValue','');//新闻类型
	$('#fjNews').text('');//附件
}

//点击新闻标题查看新闻具体信息
function queryNewsDes(newsId){
	var content = "<iframe src='"+webContextRoot+"pages/despages/warn/newsNoticePop.jsp?newsId="+newsId+"' width='100%' height='99%' frameborder='0' scrolling='yes'/>";
	var boarddiv = "<div id='msgwindow' title='详情'/>";
	$(document.body).append(boarddiv);
	var win = $("#msgwindow").dialog({
		content : content,
		width : document.body.clientWidth-160,
		height : document.body.clientHeight-160,
		maximizable:true,
		closable:true,
		modal : 'shadow',
		title : '新闻信息'
	});
	win.dialog('open');
//	alert(newsId);//弹出某条新闻信息的newsId
	
}



//新增修改状态判断是否可以保存
function checkCanSave(){
	if(editType == "A" && checkMark == 1){
		checkMark =2;
		var children = $("#fjNews").children();
		if(children.length>0){
			var flfgFileId = "file"+children[0].id;
		}
		var flfgFileName = $("#"+flfgFileId).attr("title");
		//判断是否有值
		if($.trim(titleNews)==null || $.trim(titleNews)==''){
			 $.messager.alert('提示', "公告标题不能为空！", 'info', function(){
				$('#titleNews').textbox('textbox').focus();
//				$('#titleNews').textbox('showPanel');
		     });
			 return false;
		}
		if($.trim(titleNews)!= null && titleNews.length>100){
			$.messager.alert('提示', "公告标题最多不能超过100字！", 'info', function(){
				$('#clsm').combobox('textbox').focus();
//				$('#clsm').combobox('showPanel');
	    	});
			return false;
		} 
		//公告类型
		if($.trim(typeNews)==null|| $.trim(typeNews) ==''){
			$.messager.alert('提示', "请选择公告类型！", 'info', function(){
				$('#typeNews').combobox('textbox').focus();
//				$('#typeNews').combobox('showPanel');
	  	});
			return false;
		}
	   //新闻内容
		if($.trim(newsContent)==null||$.trim(newsContent)==''){
			$.messager.alert('提示', "公告内容不能为空！", 'info', function(){
				$('#newsContent').textbox('textbox').focus();
//				$('#newsContent').textbox('showPanel');
	  	});
			return false;
		}
		//附件内容
		if($.trim($("#fjNews").text()).length>0&&$.trim(flfgFileName).length>48){
			$.messager.alert('提示', "附件名称不能大于48个字！", 'info');
			return false;
		};
		return true;
	}else if(editType == "U" && checkMark == 1){
		checkMark=2;
		if(isEdit == true){
			if($("#fjNews").text().length>0){
				var children = $("#fjNews").children();
				if(children.length>0){
					var flfgFileId = "file"+children[0].id;
				}
				var flfgFileName = $("#"+flfgFileId).attr("title");
			}else{
				flfgFileName = "";
			}
		}else if(isEdit == false){
			flfgFileName = editFlfgFileName;
		}
		//判断是否有值
		if($.trim(titleNews)==null || $.trim(titleNews)==''){
			 $.messager.alert('提示', "公告标题不能为空！", 'info', function(){
				$('#titleNews').textbox('textbox').focus();
//				$('#titleNews').textbox('showPanel');
		     });
			 return false;
		}
		if($.trim(titleNews)!= null && titleNews.length>100){
			$.messager.alert('提示', "公告标题最多不能超过100字！", 'info', function(){
				$('#clsm').combobox('textbox').focus();
//				$('#clsm').combobox('showPanel');
	    	});
			return false;
		} 
		//公告类型
		if($.trim(typeNews)==null|| $.trim(typeNews) ==''){
			$.messager.alert('提示', "请选择公告类型！", 'info', function(){
				$('#typeNews').combobox('textbox').focus();
//				$('#typeNews').combobox('showPanel');
	  	});
			return false;
		}
	   //新闻内容
		if($.trim(newsContent)==null||$.trim(newsContent)==''){
			$.messager.alert('提示', "公告内容不能为空！", 'info', function(){
				$('#newsContent').textbox('textbox').focus();
//				$('#newsContent').textbox('showPanel');
	  	});
			return false;
		}
		//附件内容
		if($.trim($("#fjNews").text()).length>0&&$.trim(flfgFileName).length>48){
			$.messager.alert('提示', "附件名称不能大于48个字！", 'info');
			return false;
		};
		return true;
	}
}

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
//		chunked : true, // 允许分片
//		chunkSize : 2 * 1024 * 1024, // 每片大小2M
//		chunkRetry : 4, // 分片上传失败之后的重试次数
		threads : 3, // 上传并发数。允许同时最大3个上传进程
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
//			mimeTypes : 'image/*,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/plain,application/pdf,application/kswps'
		},
		method : 'POST'

	});
	// 当有文件添加进来的时候
	uploader.on('fileQueued', function(file) { // webuploader事件.当选择文件后，文件被加载到文件队列中，触发该事件。等效于
		// uploader.onFileueued =
		// function(file){...}
		// ，类似js的事件定义。
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
//			if (error) {
				if(file.name.length>10){
					//文件名长度超过10，后面部分省略
					$img.replaceWith('<a id="file'+file.id+'" title="'+file.name+'" >'+file.name.substr(0,10)+'...</a>');
				}else{
					//文件名长度不超过10，原样显示
					$img.replaceWith('<a id="file'+file.id+'" title="'+file.name+'" >'+file.name+'</a>');
				}
				$("#"+file.id).append('<img id="delete'+file.id+'" class="'+last_bt_upload+'Delete noUpload" src="'+webContextRoot+'pages/despages/common/jquery-easyui-1.5.1/themes/icons/cancel.png"></img>');
				
				//删除事件
				$(".noUpload").click(function(){
					var file_id = $(this).attr("id").substr(6);
					//删除上传队列
					uploader.removeFile(file_id);
					//删除页面显示
					$("#"+file_id).remove();
					var id = $(this).attr("class");
					var index = id.indexOf("Delete");
					$("#"+id.substr(0,index)).show();
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
//		console.log(ret);
		uploadArray.push(ret);
	});
	
	// 所有文件上传成功
	uploader.on('uploadFinished', function() {
//		bt_add_commit();
		addGjpzDate()
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
		//新增验证
		if(checkCanSave()){
			uploader.upload();
		}
	});
	
}

/**
 * 清空上传列表
 */
function clearUploader(){
	var files = uploader.getFiles();
//	console.log(files);
	for(var i in files){
		var file_id = files[i].id;
//		uploader.removeFile(file_id);
		$("#"+file_id).remove();
	}
	uploader.reset();
	uploadArray = new Array();
	$(".bt_upload").removeClass('webuploader-element-invisible');;
}