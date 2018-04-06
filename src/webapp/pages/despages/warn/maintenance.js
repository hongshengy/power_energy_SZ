/**
 * 
 */
var isTabsType = 0;
var editType = '';//修改或者增加类型
var $list = $("#picture_file"); //文件显示的ID位置
var $btn = $("#ctlBtn"); // 开始上传保存的按钮ID
var filePicker = '#pictureUpload'; //添加文件的按键ID
var thumbnailWidth = 60; // 缩略图高度和宽度
//（单位是像素），当宽高度是0~1的时候，是按照百分比计算，具体可以看api文档
var thumbnailHeight = 60;
var thumbnailNumber = 3;  //上传数量
var uploader = null; 	//上传组件对象
var last_bt_upload =null; //最后一次上传按键ID
var uploadArray = new Array();//装上传文件的数组
var isEdit = "";  //判断哪些报告修改了
var editFlfgFileName;
var editflfgUrl;
var addUploaderLoaded = true;
//初始化
$(function(){
	$('#tabs').tabs({    
	    border:false,    
	    onSelect:function(title){    
	        if(title=="移动端启动图片维护"){
	        	bindGridData();
	        }else if(title=="移动端版本管理"){
	        	bindWgyhGridData();
	        }    
	    }    
	});
	
	//新增按钮点击初始化
	$("#newAdd").click(function(){
		newAdd();
	});
	//修改按钮点击初始化
	$("#newUpdate").click(function(){
		newUpdate();
	});
	//删除按钮点击初始化
	$("#newDelete").click(function(){
		newDelete();
	});
	//查询按钮点击初始化
	$("#newSearch").click(function(){
		newSearchPone();
	});
	//保存按钮点击事件
//	$("#savePone").click(function(){
//		savePone();
//	});
	//取消按钮点击初始化
	$("#quitPone").click(function(){
		quitPone();
	});
	//初始化弹框	
	$('#divPanel').dialog({
        width: 520,
        height: 260,
        closed: true,
        modal: true
    });
});


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
//tabs选项卡选择事件
function userTabsSelect(title,index){
	isTabsType = index;//0 :用电走势 1:负载率  	
  	if(isTabsType == 0){
  		bindGridData();
  	}else if(isTabsType == 1){
  		bindWgyhGridData();
  	}
}
/*
 * 加载主站启动页面维护页面
 */
function bindGridData(){
	$list = $("#picture_file"); //文件显示的ID位置
	$btn = $("#ctlBtn"); // 开始上传保存的按钮ID
	filePicker = '#pictureUpload'; //添加文件的按键ID
	$list[0].innerHTML="";
	$("#pictureUpload").show();
	$("#ctlBtn").hide();
	$.ajax({			
		url:basePath+'maintenance/queryOrgCode.action', 
		dataType:'json',
		type:'post',
		success:function(result){
			if(result[0].mobileBgImagePath != "" || result[0].mobileBgImagePath != null){
				$("#imgUpload").attr("src",basePath+result[0].mobileBgImagePath);
			}
		}
	});
	uploadArray = new Array();
	
	// init webuploader
	uploader = WebUploader.create({
		// 选完文件后，是否自动上传。
		auto : false,

		// swf文件路径
		swf : basePath
				+ '/pages/despages/common/webuploader-0.1.5/Uploader.swf',

		// 文件接收服务端。
		server : basePath + 'webUploader/webUploader.action',

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
		threads : 1, // 上传并发数。允许同时最大3个上传进程
		// 去重
		duplicate : true,

		// 上传文件个数限制
		fileNumLimit : thumbnailNumber,
		// 单个文件大小限制 20M
		fileSingleSizeLimit : 1 * 1024 * 1024,

		// 选择文件类型。
		accept : {
			title : 'Images',
			extensions : 'gif,jpg,jpeg,bmp,png',
			mimeTypes : '.gif,.jpg,.jpeg,.bmp,.png'
//			mimeTypes : 'image/*,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/plain,application/pdf,application/kswps'
		},
		method : 'POST',
	});
	// 当有文件添加进来的时候
	uploader.on('fileQueued', function(file) { // webuploader事件.当选择文件后，文件被加载到文件队列中，触发该事件。等效于
		// uploader.onFileueued =
		// function(file){...}
		// ，类似js的事件定义。
		var $li = $('<span id="' + file.id + '" class="file-item thumbnail">'
				+  '<div class="info">' + file.name + '</div>'
				+ '</span>'
		), $img = $li.find('div');
		// $list为容器jQuery实例
		$list.append($li);
		
		$("#"+last_bt_upload).hide();
		
		
		// 创建缩略图
		// 如果为非图片文件，可以不用调用此方法。
		// thumbnailWidth x thumbnailHeight 为 100 x 100
		uploader.makeThumb(file, function(error, src) { // webuploader方法
//			if (error) {
				if(file.name.length>15){
					//文件名长度超过10，后面部分省略
					$img.replaceWith('<a id="file'+file.id+'" title="'+file.name+'" >'+file.name.substr(0,15)+'...</a>');
				}else{
					//文件名长度不超过10，原样显示
					$img.replaceWith('<a id="file'+file.id+'" title="'+file.name+'" >'+file.name+'</a>');
				}	
				$("#pictureUpload").hide();
				$("#ctlBtn").show();
				$("#"+file.id).append('<img id="delete'+file.id+'" class="'+last_bt_upload+'Delete noUpload" src="'+basePath+'pages/despages/common/jquery-easyui-1.5.1/themes/icons/cancel.png"></img>');
				//删除事件
				$(".noUpload").click(function(){
					var file_id = $(this).attr("id").substr(6);
					//删除上传队列
					uploader.removeFile(file_id);
					//删除页面显示
					$("#"+file_id).remove();
					var id = $(this).attr("class");
					var index = id.indexOf("Delete");
					$("#pictureUpload").show();
					$("#ctlBtn").hide();
					clearUploader();
//					$("#imgUpload").removeAttr("src");
					$("#"+id.substr(0,index)).show();
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
			$.messager.alert('提示','请选择1M以内的文件!','info');  
		}else{
			$.messager.alert('提示','请选择正确的文件!','info');  
		}
	});	
	
	// 文件上传过程中创建进度条实时显示。
//	uploader.on('uploadProgress', function(file, percentage) {
//		var $li = $('#' + file.id), $percent = $li.find('.progress span');
//
//		// 避免重复创建
//		if (!$percent.length) {
//			$percent = $('<p class="progress"><span></span></p>').appendTo($li)
//					.find('span');
//		}
//
//		$percent.css('width', percentage * 100 + '%');
//	});

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
		bt_add_commit();
		$.messager.progress({
			title : '提示',
			msg : '正在上传中，请稍候……',
			interval:300
		}); 
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
	for(var i in files){
		var file_id = files[i].id;
		$("#"+file_id).remove();
	}
	uploader.reset();
	uploadArray = new Array();
	$(".bt_upload").removeClass('webuploader-element-invisible');;
}

/**
 * 按钮提交事件
 */
function bt_add_commit(){
	var flfgFileName = uploadArray[0].oldName;
	var flfgURL = uploadArray[0].url;
	$.ajax({			
		url:basePath+'maintenance/queryOrgCode.action', 
		dataType:'json',
		type:'post',
		success:function(result){
			var version;
			if(result[0].mobileBgImageVersion == ""){
				version = 1;
			}else{
				version = parseInt(result[0].mobileBgImageVersion)+1;
			}
			$.ajax({			
				url:basePath+'maintenance/updateOrgCode.action', 
				data:{
					'zhSfOrgCodeModel.areaNo': result[0].areaNo,
					'zhSfOrgCodeModel.mobileBgImageVersion':version,
					'zhSfOrgCodeModel.mobileBgImagePath':flfgURL
				},
				dataType:'json',
				type:'post',
				success:function(result){
					if (result.saveSUCCESS == "true") {	
						$.messager.progress('close');
						$.messager.alert('提示','上传成功!','info');  
						$("#imgUpload").attr("src",basePath+flfgURL);
						$("#pictureUpload").show();
						$("#ctlBtn").hide();
//						$("#picture_file").html("");
						clearUploader();
					} else {
						$.messager.alert('提示','上传失败!','info');
					}
				}
			});
		}
	});
}

function checkCanSave(){
	return true;
}
/**
 * 加载手机端页面管理
 */
function bindWgyhGridData(){
	//手机端
	$('#phoneDatagrid').datagrid({
		fitColumns: true,
	    singleSelect: true,
	    pagination:true,
		close : true,
	    columns: [[
	        {field: 'versionName', title: '软件名称', width:'15%',
	        	formatter : function(value, row, index) {
					return HTMLEncode(value);
		    }},
	        {field: 'versionNum', title: '软件版本', width:'15%',
	        	formatter : function(value, row, index) {
				return HTMLEncode(value);
	        	}},
	        {field: 'publishTime', title: '发布时间', width: '15%',
				formatter : function(value, row, index) {
					return HTMLEncode(value.substring(0,10));
				}},
	        {field: 'remark', title: '版本说明', width: '30%',
				formatter : function(value, row, index) {
					return HTMLEncode(value);
				}},
	        {field: 'filePath', title: '软件包路径', width: '25%',
				formatter : function(value, row, index) {
					return HTMLEncode(value);	
				}}
	    ]],
	    tools:"#tableToolDiv"
	});
	
	$('#phoneDatagrid').datagrid({
		title:'手机端',
		url:basePath+ 'maintenance/queryPhone.action',		
		loadMsg:'正在加载，请稍等……',//加载时显示提示
		rownumbers:true,
		fit:true,
		fitColumns:true,
		striped: true,
		singleSelect: true,
		pagination:true,
		pageSize: 20,
		pageList : [10,20,50],
	    onSelect:function (rowIndex, rowData){
	    	selectData = rowData;
	    },onLoadSuccess:function(data){
			var rows = $('#phoneDatagrid').datagrid("getRows");
			if(rows.length>0){
				$('#phoneDatagrid').datagrid("selectRow",0);
			}
		}
	});
}
/**
 * 查询按钮点击事件
 */
function newSearchPone(){
	//软件名称
	var versionName = $.trim($("#searchVersionName").val());
	//软件版本
	var versionNum = $.trim($("#searchVersionNum").val());
	iniPrevent(versionName,versionNum);
}

function iniPrevent(versionName,versionNum){
	$('#phoneDatagrid').datagrid('load',{
		versionName:versionName,
		versionNum:versionNum
	});	
}
/*
 * 新增
 */
function newAdd(){
	cleanPhone();
	$('#divPanel').window('open');
	$("#divPanel").panel({title:"新增"});
	editType = "A";
	isEdit = false;
	$list = $("#versionFile"); //文件显示的ID位置
	$btn = $("#savePone"); // 开始上传保存的按钮ID
	filePicker = '#versionUpload'; //添加文件的按键ID
	$("#versionUpload").show();
	if(addUploaderLoaded){
		WebUploaderPone();
		addUploaderLoaded = false;
	}	
	clearUploader();
}
/**
 * 修改
 */
function newUpdate(){
	cleanPhone();
	var idlist = $('#phoneDatagrid').datagrid('getSelected');
	if(idlist==null){
		$.messager.alert('提示','请选择一条记录进行修改!','info'); 
	}
	$('#divPanel').window('open');
	$("#divPanel").panel({title:"修改"});
	editType = "U";
	isEdit = false;
	$list = $("#versionFile"); //文件显示的ID位置
	$btn = $("#savePone"); // 开始上传保存的按钮ID
	filePicker = '#versionUpload'; //添加文件的按键ID
	if(addUploaderLoaded){
		WebUploaderPone();
		addUploaderLoaded = false;
	}
	clearUploader();
	$("#verId").val(idlist.verId);
	$("#versionName").textbox("setValue",idlist.versionName);
	$("#versionNum").textbox("setValue",idlist.versionNum);
	$("#remark").textbox("setValue",idlist.remark);
	var html;
	var noUploadPone = '<img class="del noUploadPone" src="'+basePath+'pages/despages/common/jquery-easyui-1.5.1/themes/icons/cancel.png"></img>';
	var updateName = idlist.filePath.substring(8,idlist.filePath.length);
	// 判断附件文件是否存在
	$.ajax({
		async : false,
		url : basePath + 'pCode/judgeFileExist.action',
		data : {downloadFilePath : idlist.filePath},
		dataType : "json",
		success : function(data) {
			if(data.FLAG == "1"){
				if(updateName.length>10){
					//文件名长度超过30，后面部分省略
					html1='<a id="'+idlist.filePath+'" href="'+basePath+idlist.filePath+'" target="_blank" class="zdbgFile"  style="width: 120px; height: 30px;" title="'+HTMLEncode(updateName)+'" download="'+idlist.filePath+'" >'+HTMLEncode(updateName.substr(0,10))+'...</a>';
				}else{
					//文件名长度不超过10，原样显示
					html1='<a id="'+idlist.filePath+'" href="'+basePath+idlist.filePath+'" target="_blank" class="zdbgFile"  style="width: 120px; height: 30px;" title="'+HTMLEncode(updateName)+'" download="'+idlist.filePath+'" >'+HTMLEncode(updateName)+'</a>';
				}
			}else if(data.FLAG == "2"){
				if(updateName.length>10){
					//文件名长度超过30，后面部分省略
					html1="<a id=\""+idlist.filePath+"\" href=\"#\" onclick=\"$.messager.alert('提示', '下载的文件不存在！', 'warning');\" class=\"zdbgFile\"  style=\"width: 120px; height: 30px;\">"+HTMLEncode(updateName.substr(0,10))+"...</a>";
				}else{
					//文件名长度不超过10，原样显示
					html1="<a id=\""+idlist.filePath+"\" href=\"#\" onclick=\"$.messager.alert('提示', '下载的文件不存在！', 'warning');\" class=\"zdbgFile\"  style=\"width: 120px; height: 30px;\">"+HTMLEncode(updateName)+"</a>";
				}
			}
		}
	});
	html1 += noUploadPone;
	$("#versionFile").html(html1);
	$("#versionUpload").addClass('webuploader-element-invisible');
	$(".del").click(function(){
		$(this).parent().html("");
//		$("#versionUpload").show();
		$("#versionUpload").removeClass('webuploader-element-invisible');
		isEdit = true;
	});	
}
/**
 * 删除
 */
function newDelete(){
	var idlist = $('#phoneDatagrid').datagrid('getSelected');
	if(idlist==null){
		$.messager.alert('提示','请选择一条记录进行删除!','info'); 
	}
	$.messager.confirm('提示', "确定删除吗?", function(r){
		if(r){
			$.ajax({			
				url:basePath+'maintenance/deletePhone.action', 
				data:{
					'zhSfWorknoteAppVersionModel.verId': idlist.verId
		
				},
				dataType:'json',
				type:'post',
				success:function(result){
					if (result.saveSUCCESS == "true") {
						$.messager.alert('提示','删除成功!','info');  
						var rows = $('#phoneDatagrid').datagrid("getRows").length;
						if(rows < 2){
							$('#phoneDatagrid').datagrid('load');
						}else{
							$('#phoneDatagrid').datagrid('reload');
						}
					} else {
						$.messager.alert('提示','删除失败!','info');
					}
				}
			});
		}
	});
}
/**
 * 调用上传插件
 */
function WebUploaderPone(){
	uploadArray = new Array();
	
	// init webuploader
	uploader = WebUploader.create({
		// 选完文件后，是否自动上传。
		auto : false,

		// swf文件路径
		swf : basePath
				+ '/pages/despages/common/webuploader-0.1.5/Uploader.swf',

		// 文件接收服务端。
		server : basePath + 'webUploader/webUploader.action',

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
		threads : 1, // 上传并发数。允许同时最大3个上传进程
		// 去重
		duplicate : true,

		// 上传文件个数限制
		fileNumLimit : thumbnailNumber,
		// 单个文件大小限制 20M
		fileSingleSizeLimit : 20 * 1024 * 1024,

		// 选择文件类型。
		accept : {
			title : 'Images',
			extensions : 'apk',
			mimeTypes : '.apk'
//			mimeTypes : 'image/*,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/plain,application/pdf,application/kswps'
		},
		method : 'POST',
		formData : {
			"parameter1" : "1"
		}

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
//		$("#versionUpload").hide();
		$("#versionUpload").addClass('webuploader-element-invisible');
//		$("#"+last_bt_upload).hide();
		
		
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
				$("#"+file.id).append('<img id="delete'+file.id+'" class="'+last_bt_upload+'Delete noUploadPone" src="'+basePath+'pages/despages/common/jquery-easyui-1.5.1/themes/icons/cancel.png"></img>');
				//删除事件
				$(".noUploadPone").click(function(){
					var file_id = $(this).attr("id").substr(6);
					//删除上传队列
					uploader.removeFile(file_id);
					//删除页面显示
					$("#"+file_id).remove();
					var id = $(this).attr("class");
					var index = id.indexOf("Delete");
//					$("#"+id.substr(0,index)).show();
					$("#"+id.substr(0,index)).addClass('webuploader-element-invisible');
//					$("#versionUpload").show();
					$("#versionUpload").removeClass('webuploader-element-invisible');
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
		//新增提交
		savePone();
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
		if(checkPhoneCanSave()){
			uploader.upload();
		}
	});
}

//检查
function checkPhoneCanSave(){
	if(editType == "A"){
//		var children = $("#versionFile").children();
//		if(children.length>0){
//			var flfgFileId = "file"+children[0].id;
//		}
//		var flfgFileName = $("#"+flfgFileId).attr("title");
		var versionName = $("#versionName").textbox("getValue");
		var versionNum = $("#versionNum").textbox("getValue");
		var remark = $("#remark").textbox("getValue");
		if(versionName.length == 0){
			$.messager.alert('提示','软件名称不能为空!','info');    
			return false;
		}
		if(versionName.length > 30){
			$.messager.alert('提示','软件名称长度不能大于30!','info');    
			return false;
		}
		if(versionNum.length == 0){
			$.messager.alert('提示','软件版本不能为空!','info');    
			return false;
		}
		if(versionNum.length > 15){
			$.messager.alert('提示','软件版本长度不能大于15!','info');    
			return false;
		}
		if($.trim($("#versionFile").text()).length==0){
			$.messager.alert('提示','上传文件不能为空!','info');    
			return false;
		}
		if(remark.length == 0){
			$.messager.alert('提示','版本说明不能为空!','info');    
			return false;
		}
		if(remark.length > 128){
			$.messager.alert('提示','版本说明长度不能大于128!','info');    
			return false;
		}
//		if(flfgFileId.length == 0){
//			$.messager.alert('提示','文件路径不能为空!','info');    
//			return false;
//		}
//		if(flfgFileId.length > 50){
//			$.messager.alert('提示','文件路径长度不能大于50!','info');    
//			return false;
//		}
		return true;
	}else if(editType == "U"){
//		if(isEdit == true){
//			if($("#versionFile").text().length>0){
//				var children = $("#versionFile").children();
//				if(children.length>0){
//					var flfgFileId = "file"+children[0].id;
//				}
//				var flfgFileName = $("#"+flfgFileId).attr("title");
//			}else{
//				flfgFileName = "";
//			}
//		}else if(isEdit == false){
//			flfgFileName = editFlfgFileName;
//		}
		var versionName = $("#versionName").textbox("getValue");
		var versionNum = $("#versionNum").textbox("getValue");
		var remark = $("#remark").textbox("getValue");
		if(versionName.length == 0){
			$.messager.alert('提示','软件名称不能为空!','info');    
			return false;
		}
		if(versionName.length > 30){
			$.messager.alert('提示','软件名称长度不能大于30!','info');    
			return false;
		}
		if(versionNum.length == 0){
			$.messager.alert('提示','软件版本不能为空!','info');    
			return false;
		}
		if(versionNum.length > 15){
			$.messager.alert('提示','软件版本长度不能大于15!','info');    
			return false;
		}
		if($.trim($("#versionFile").text()).length==0){
			$.messager.alert('提示','上传文件不能为空!','info');    
			return false;
		}
		if(remark.length == 0){
			$.messager.alert('提示','版本说明不能为空!','info');    
			return false;
		}
		if(remark.length > 128){
			$.messager.alert('提示','版本说明长度不能大于128!','info');    
			return false;
		}
//		if(flfgFileId.length == 0){
//			$.messager.alert('提示','文件路径不能为空!','info');    
//			return false;
//		}
//		if(flfgFileId.length > 50){
//			$.messager.alert('提示','文件路径长度不能大于50!','info');    
//			return false;
//		}
		return true;
	}
}

//保存按钮点击事件
function savePone(){
	if(editType == "A"){
		var versionName = $("#versionName").textbox("getValue");
		var versionNum = $("#versionNum").textbox("getValue");
//		var flfgFileName = uploadArray[0].oldName;
//		if(uploadArray.length==0){
//			$.messager.alert('提示','上传文件不能为空!','info');    
//			return;
//		}
		var filePath = uploadArray[0].url;
		var remark = $("#remark").textbox("getValue");
		var date = new Date();
		var publishTime = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
		$.ajax({			
			url:basePath+'maintenance/insertPhone.action', 
			data:{
				'zhSfWorknoteAppVersionModel.versionName': versionName,
				'zhSfWorknoteAppVersionModel.versionNum':versionNum,
				'zhSfWorknoteAppVersionModel.filePath':filePath,
				'zhSfWorknoteAppVersionModel.publishTime':publishTime,
				'zhSfWorknoteAppVersionModel.remark':remark
			},
			dataType:'json',
			type:'post',
			success:function(result){
				if (result.saveSUCCESS == "true") {
					$('#divPanel').window('close');
					$.messager.alert('确认', "保存成功！", 'info', function(r) {
						$('#phoneDatagrid').datagrid('reload'); 
					});			
				} else {
					$('#divPanel').window('close');
					$.messager.alert('确认', "保存失败！", 'warning');// 移除失败			
				}
			}
		});
	}else if(editType == "U"){
		var versionName = $("#versionName").textbox("getValue");
		var versionNum = $("#versionNum").textbox("getValue");
		var filePath;
		if(uploadArray.length>0){
			filePath = uploadArray[0].url;
		}else{
			if($.trim($("#versionFile").text()).length>0 && isEdit == false){
				var idlist = $('#phoneDatagrid').datagrid('getSelected');
				filePath = idlist.filePath;
			}else if(isEdit == true){
				flfgURL = "";
//				$.messager.alert('提示','上传文件不能为空!','info');    
				return;
			}				
		}
//		var flfgFileName = uploadArray[0].oldName;
//		var filePath = uploadArray[0].url;
		var remark = $("#remark").textbox("getValue");
		var verId = $("#verId").val();
		var date = new Date();
		var publishTime = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
		$.ajax({			
			url:basePath+'maintenance/updatePhone.action', 
			data:{
				'zhSfWorknoteAppVersionModel.versionName': versionName,
				'zhSfWorknoteAppVersionModel.versionNum':versionNum,
				'zhSfWorknoteAppVersionModel.filePath':filePath,
				'zhSfWorknoteAppVersionModel.publishTime':publishTime,
				'zhSfWorknoteAppVersionModel.remark':remark,
				'zhSfWorknoteAppVersionModel.verId':verId
			},
			dataType:'json',
			type:'post',
			success:function(result){
				if (result.saveSUCCESS == "true") {
					$('#divPanel').window('close');
					$.messager.alert('确认', "保存成功！", 'info', function(r) {
						$('#phoneDatagrid').datagrid('reload'); 
					});			
				} else {
					$('#divPanel').window('close');
					$.messager.alert('确认', "保存失败！", 'warning');// 移除失败			
				}
			}
		});
	}
}
/**
 * 取消按钮点击事件
 */
function quitPone(){
	$('#divPanel').window('close');
}
/**
 * 清空
 */
function cleanPhone(){
	$("#versionName").textbox("setValue","");
	$("#versionNum").textbox("setValue","");
	$("#versionFile").html("");
	$("#remark").textbox("setValue","");
}