/**
 * 区域中心维护
 * 
 */

// 地图对象
var mp;
// 初始化数据
var initData;
// 初始化图片路径
var imageUrl;
// 返回
var isFlag = true;

var $list = $("#thelist"); //文件显示的ID位置
var $btn = $("#doEdit"); // 开始上传保存的按钮ID
var filePicker = '#filePicker'; //添加文件的按键ID
var thumbnailWidth = 60; // 缩略图高度和宽度
// （单位是像素），当宽高度是0~1的时候，是按照百分比计算，具体可以看api文档
var thumbnailHeight = 60;
var thumbnailNumber = 1;
var uploader = null;
var uploadArray = new Array();//存放上传文件

// 页面初始化函数
$(function() {
	
	// css设置
	$("#center-enterprise-panel").hide();
	$('.easyui-textbox-one').textbox({
		width : 250
	});
	$('.easyui-textbox-two').textbox({
		width : 85
	});
	$('.easyui-textbox-three').textbox({
		width : 250,
		height : 100,
		multiline : true
	});

	// 默认不可编辑
	modifyTmnlInfo(true);
	
	// 查询区域信息
	querySfOrgCode();

	// 地图对象与div绑定
	mp = new BMap.Map('areaCenterMap', {
		enableMapClick : false
	});
});

/**
 * 默认不可编辑
 */
function modifyTmnlInfo(saveFlag) {
	// 初始化上传插件
	webUploader();
	
	$("#areaName").textbox({
		disabled : saveFlag
	});// 区域名称
	$("#serviceRange").textbox({
		disabled : saveFlag
	});// 服务范围
	$("#address").textbox({
		disabled : saveFlag
	});// 地址
	$("#telephone").textbox({
		disabled : saveFlag
	});// 电话
	$("#fax").textbox({
		disabled : saveFlag
	}); // 传真
	$("#areaMemo").textbox({
		disabled : saveFlag
	});// 区域中心简介
	$("#lng").textbox({
		disabled : saveFlag
	});// 经度
	$("#lat").textbox({
		disabled : saveFlag
	});// 纬度
	
	// 删除图片
	$(".deleteIcon").click(function(){
		// 删除照片
		$(this).parent().parent().remove();
		// 重新注册插件
		webUploader();
		// 添加照片按钮
		$('#filePicker').show();
		isFlag = false;
	});
	
	// 修改
	if (saveFlag == false) {
		// 有照片 
		if ($list.children().length > 0) {
			// 添加照片按钮
			$('#filePicker').hide();
			// 显示删除按钮
			$('#delete').show();
		}else{
			// 添加照片按钮
			$('#filePicker').show();
		}
		// 保存/取消
		$("#saveBtn").css("display", "");
		// 编辑/保存
		$("#modifyBtn").css("display", "none");
	} else {
		// 添加照片按钮
		$('#filePicker').hide();
		// 删除
		$('#delete').hide();
		// 保存/取消
		$("#saveBtn").css("display", "none");
		// 编辑/保存
		$("#modifyBtn").css("display", "");

		// 删除照片
		$(".deleteIcon").parent().remove();
		
		// 删除了照片之后点击了取消
		if(isFlag == false){
			// 是否有图片回显
			if(initData.areaPhoto.length > 0){
				
				var src = webContextRoot;
				// 判断照片是否存在
				$.ajax({
					async : false,
					url : webContextRoot + 'pCode/judgeFileExist.action',
					data : {downloadFilePath : initData.areaPhoto},
					dataType : "json",
					success : function(data) {
						if(data.FLAG == "1"){
							src += initData.areaPhoto;
						}else if(data.FLAG == "2"){
							src += "/pages/despages/common/images/imageNotFound.png";
						}
					}
				});
				var $li = $('<span class="file-item thumbnail">'
						+ '<a>'
						+ '<img id="findImg" src="'+src+'" width="60px" height="60px"><span id="delete" class="deleteIcon" style="display:none;">▬</span>'
						+ '</a>'
						+ '</span>'
				), $img = $li.find('a');
				$list.append($li);
			}
		}
		
	}
	
} 

/**
 * 查询企业用户的基本信息 并赋值到前台
 */
function querySfOrgCode() {
	$.ajax({
		type : "POST",
		url : webContextRoot + 'information/querySfOrgCodeInfo.action',// 请求路径
		dataType : "json",
		success : function(data) {
			// 初始化数据保存
			initData = data[0];
			// 各数据项赋值
			setPageValuse();
			
			// 地图初始化
			map.areaCenterInit(mp, data);
		}
	});
}

/**
 * 修改区域信息
 */
function updateOrgCode() {
	/**
	 * 修改之前先校验 
	 */
	if(!verify()){
		return;
	}
	
	var areaNo = $("#areaNo").val();// 区域码
	var areaName = $("#areaName").val();// 区域名称
	var serviceRange = $("#serviceRange").val();// 服务范围
	var address = $("#address").val();// 地址
	var telephone = $("#telephone").val();// 联系方式
	var fax = $("#fax").val();// 传真
	var areaMemo = $("#areaMemo").val();// 中心简介
	var areaPhoto = '';// 图片
	var heartLongitude = $("#lng").val();// 经度
	var heartLatitude = $("#lat").val();// 纬度

	// 没有修改照片
	if(typeof $('#findImg')[0] == 'undefined'){
		areaPhoto = '';
	}else{
		areaPhoto = $('#findImg')[0].src.replace(webContextRoot,'');
	}
	// 获取上传的图片路径
	if(uploadArray.length > 0){
		for(var i = 0;i < uploadArray.length;i++){
			areaPhoto += uploadArray[i].url;
		}
	}

	$.ajax({
		type : "post",
		url : webContextRoot + 'information/updateOrgCodeById.action', // 请求路径
		data : {
			'sfOrgCodeModel.areaName' : areaName,
			'sfOrgCodeModel.serviceRange' : serviceRange,
			'sfOrgCodeModel.address' : address,
			'sfOrgCodeModel.telephone' : telephone,
			'sfOrgCodeModel.fax' : fax,
			'sfOrgCodeModel.areaMemo' : areaMemo,
			'sfOrgCodeModel.areaNo' : areaNo,
			'sfOrgCodeModel.areaPhoto' : areaPhoto,
			'sfOrgCodeModel.heartLongitude' : heartLongitude,
			'sfOrgCodeModel.heartLatitude' : heartLatitude
		},// 传递的数据
		dataType : "json",// 返回类型
		success : function(result) {
			 if(result.flag=='success'){
				 $.messager.alert('提示','修改成功!','info',function(comfim){
					 if(comfim){
						 location.reload(true);
					 }
				 });  
				 location.reload(true); 
	 		 }else{
	 			$.messager.alert('确认', "修改失败！", 'warning');
	 		 }
		}
	});
}

/**
 * 校验手机号和座机
 */
function checkTel(telephone){
    var isPhone = /^([0-9]{3,4}-)?[0-9]{7,8}$/;
    var isMob = /^((\+?86)|(\(\+86\)))?(13[012356789][0-9]{8}|15[012356789][0-9]{8}|18[02356789][0-9]{8}|147[0-9]{8}|134[0-9]{8})$/;
    if(isMob.test(telephone) || isPhone.test(telephone)){
        return true;
    }
    else{
        return false;
    }
}

/**
 * 属性校验 
 */
function verify(){
	// 区域码
	var areaNo = $("#areaNo").val();
	// 区域名称
	var areaName = $("#areaName").val().replace(/^\s+|\s+$/g, "");
	// 区域名称不能为空
	if (areaName == null || areaName == '') {
		$.messager.alert('提示','区域名称不能为空！','info');    
		return;
	}else if (areaName.length > 128){
		$.messager.alert('提示','区域名称需小于128位！','info');    
		return false;
	}
	// 服务范围
	var serviceRange = $("#serviceRange").val().replace(/^\s+|\s+$/g, "");
	if (serviceRange.length > 16){
		$.messager.alert('提示','服务范围需小于16位！','info');    
		return false;
	}
	// 地址
	var address = $("#address").val().replace(/^\s+|\s+$/g, "");
	if (address.length > 128){
		$.messager.alert('提示','地址需小于128位！','info');    
		return false;
	}
	// 测试提出：可以只验证长度,不需要做手机号码验证
	var isNumber = /^\+?[1-9][0-9]*$/;
	// 联系方式
	var telephone = $("#telephone").val().replace(/^\s+|\s+$/g, "");
	// 校验是不是汉字
	var china = /[\u4e00-\u9fa5]+/;
	if(telephone.length > 0){
		if(china.test(telephone)){
			$.messager.alert('提示','电话不能包括汉字!','info'); 
			return false;
		}
		if(telephone.length > 13){
//			if(!isNumber.test(telephone)){
				$.messager.alert('提示','电话需小于13位！','info');    
				return false;
//			}
		}
	}
	
//	// 联系方式
//	var telephone = $("#telephone").val().replace(/^\s+|\s+$/g, "");
//	if(telephone.length > 0){
//		if(!checkTel(telephone)){
//			$.messager.alert('提示','请输入正确的电话！','info');    
//			return false;
//		}
//	}
	// 传真
	var fax = $("#fax").val().replace(/^\s+|\s+$/g, "");
	if (fax.length > 10){
		$.messager.alert('提示','传真需小于10位！','info');    
		return false;
	}
	// 中心简介
	var areaMemo = $("#areaMemo").val().replace(/^\s+|\s+$/g, "");
	if (areaMemo.length > 512){
		$.messager.alert('提示','中心简介需小于512位！','info');    
		return false;
	}
	// 测试提出：整数位最长4位,小数位最长14位 - -||
	var isLen = /^[+]?\d{1,4}(\.\d{0,14})?$/;
	
	// 经度
	var heartLongitude = $("#lng").val().replace(/^\s+|\s+$/g, "");
	if(heartLongitude.length>0){
		if(!isLen.test(heartLongitude)){
			$.messager.alert('提示','经度只能为正数且整数位最大4位,小数位最大14位!','info'); 
			return false;
		}
	}
	
	// 纬度
	var heartLatitude = $("#lat").val().replace(/^\s+|\s+$/g, "");
	if(heartLatitude.length>0){
		if(!isLen.test(heartLatitude)){
			$.messager.alert('提示','纬度只能为正数且整数位最大4位,小数位最大14位!','info'); 
			return false;
		}
	}
	
//	// 经度
//	var heartLongitude = $("#lng").val().replace(/^\s+|\s+$/g, "");
//	// 经度：要求经度整数部分为0-180小数部分为0到6位！
//	var longitudeReg= /^(((\d|[1-9]\d|1[1-7]\d|0)\.\d{0,6})|(\d|[1-9]\d|1[1-7]\d|0{1,3})|180\.0{0,4}|180)$/;
//	if(heartLongitude.length>0){
//		if(!longitudeReg.test(heartLongitude)){
//			$.messager.alert('提示','经度整数部分为0-180小数部分为0到6位！','info');    
//			return false;
//		}
//	}
//	// 纬度
//	var heartLatitude = $("#lat").val().replace(/^\s+|\s+$/g, "");
//	// 纬度：要求纬度整数部分为0-90小数部分为0到6位！
//	var latitudeReg= /^([0-8]?\d{1}\.\d{0,6}|90\.0{0,6}|[0-8]?\d{1}|90)$/;
//	if(heartLatitude.length>0){
//		if(!latitudeReg.test(heartLatitude)){
//			$.messager.alert('提示','纬度整数部分为0-90小数部分为0到6位！','info');    
//			return false;
//		}
//	}
	
	return true;
}

// 页面各数据项赋值
function setPageValuse(){
	$("#areaNo").attr("value", initData.areaNo);// 区域码
	$("#areaName").textbox("setValue", initData.areaName);// 企业名称
	$("#serviceRange").textbox("setValue", initData.serviceRange);// 服务范围
	$("#address").textbox("setValue", initData.address);// 地址
	$("#telephone").textbox("setValue", initData.telephone);// 电话
	$("#fax").textbox("setValue", initData.fax);// 传真
	$("#areaMemo").textbox("setValue", initData.areaMemo);// 区域中心简介
	$("#lng").textbox("setValue", initData.heartLongitude);// 经度
	$("#lat").textbox("setValue", initData.heartLatitude);// 纬度
	
	// 是否有图片回显
	if($list.children().length != 1){
		if(initData.areaPhoto.length > 0){
			var src = webContextRoot;
			// 判断照片是否存在
			$.ajax({
				async : false,
				url : webContextRoot + 'pCode/judgeFileExist.action',
				data : {downloadFilePath : initData.areaPhoto},
				dataType : "json",
				success : function(data) {
					if(data.FLAG == "1"){
						src += initData.areaPhoto;
					}else if(data.FLAG == "2"){
						src += "/pages/despages/common/images/imageNotFound.png";
					}
				}
			});
			var $li = $('<span class="file-item thumbnail">'
					+ '<a>'
					+ '<img id="findImg" src="'+src+'" width="60px" height="60px"><span id="delete" class="deleteIcon" style="display:none;">▬</span>'
					+ '</a>'
					+ '</span>'
			), $img = $li.find('a');
			$list.append($li);
		}
	}else{
		return;
	}
	
}

// 取消函数
function cancleModofy(){
	setPageValuse();
	isFlag = false;
	modifyTmnlInfo(true);
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
//		chunked : true, // 允许分片
//		chunkSize : 2 * 1024 * 1024, // 每片大小2M
//		chunkRetry : 4, // 分片上传失败之后的重试次数
		threads : 3, // 上传并发数。允许同时最大3个上传进程
		// 去重
		duplicate : true,

		// 上传文件个数限制
		fileNumLimit : thumbnailNumber,
		// 单个文件大小限制 20M
		fileSingleSizeLimit : 1 * 1024 * 1024,

		// 只允许选择图片文件。
		accept : {
			title : 'Images',
			extensions : 'gif,jpg,jpeg,bmp,png',
			mimeTypes : '.gif,.jpg,.jpeg,.bmp,.png'
		},
		method : 'POST',

		// 传入参数。这两个参数会跟文件一起传给后台，用于跟后台对接，确认文件的来源。
		//预设定了2个参数，根据需求自行选择
		formData : {
			"parameter1" : "aaa",
			"parameter2" : "bbb"
		}

	});
	// 当有文件添加进来的时候
	uploader.on('fileQueued', function(file) { // webuploader事件.当选择文件后，文件被加载到文件队列中，触发该事件。等效于
		// uploader.onFileueued =
		// function(file){...}
		// ，类似js的事件定义。
		var $li = $('<span id="' + file.id + '" class="file-item thumbnail">'
				+ '<a>'
				+ '<img>' // + '<div class="info">' + file.name + '</div>'
				+ '</a>'
				+ '</span>'
		), $img = $li.find('img');

		// $list为容器jQuery实例
		$list.append($li);
		  
		//所有文件个数 - 取消上传文件个数
		var fileSize = uploader.getFiles().length - uploader.getFiles("cancelled").length;
		if(fileSize==thumbnailNumber){
			$(filePicker).hide();
		}
		
		// 创建缩略图
		// 如果为非图片文件，可以不用调用此方法。
		// thumbnailWidth x thumbnailHeight 为 100 x 100
		uploader.makeThumb(file, function(error, src) { // webuploader方法
			
			$("#" + file.id).append('<span id="delete' + file.id + '" class="deleteIcon">▬</span>');
			$img.attr('src', src);
			$img.attr('width', thumbnailWidth+"px");
			$img.attr('height', thumbnailHeight+"px");
			
			//删除事件
			$(".deleteIcon").click(function(){
					var file_id = $(this).attr("id").substr(6);
					//删除上传队列
				    uploader.removeFile(file_id);
				    //删除页面显示
				    $("#"+file_id).remove();
					$(filePicker).show();
			});
		},1,1);
	});
	
	//当validate不通过时，调用的方法
	uploader.on('error', function(type) {
		if(type=='Q_TYPE_DENIED'){
			$.messager.alert('提示','请选择正确的文件类型!','info');  
		}else if(type=='F_EXCEED_SIZE'){
			$.messager.alert('提示','请选择1M以内的文件!','info');  
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
		updateOrgCode();
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
		$(filePicker).hide();
		
		if(checkCanSave()){
			uploader.upload();
		}
		 
	});
}

/**
 * 验证 
 */
function checkCanSave(){
	return true;
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
	$(".bt_upload").removeClass('webuploader-element-invisible');
}