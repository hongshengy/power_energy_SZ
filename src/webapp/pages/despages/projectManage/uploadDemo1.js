/**
 * 上传
 * 
 * @author meng_zijie
 * @since 2017-07-20
 */

var $list = $("#thelist"); //文件显示的ID位置
var $btn = $("#ctlBtn"); // 开始上传保存的按钮ID
var filePicker = '#filePicker'; //添加文件的按键ID
var thumbnailWidth = 60; // 缩略图高度和宽度
// （单位是像素），当宽高度是0~1的时候，是按照百分比计算，具体可以看api文档
var thumbnailHeight = 60;
var thumbnailNumber = 3;
var uploader = null;
$(function() {
	
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
		chunked : true, // 允许分片
		chunkSize : 2 * 1024 * 1024, // 每片大小2M
		chunkRetry : 4, // 分片上传失败之后的重试次数
		threads : 3, // 上传并发数。允许同时最大3个上传进程
		// 去重
		duplicate : true,

//		thumb:{
//		    width: 60,
//		    height: 60,
//
//		    // 图片质量，只有type为`image/jpeg`的时候才有效。
//		    quality: 100,
//
//		    // 是否允许放大，如果想要生成小图的时候不失真，此选项应该设置为false.
//		    allowMagnify: false,
//
//		    // 是否允许裁剪。
//		    crop: true,
//
//		    // 为空的话则保留原有图片格式。
//		    // 否则强制转换成指定的类型。
//		    type: 'image/jpeg'
//		},
		
//		compress:{
//			width: 60,
//		    height: 60,
//
//		    // 图片质量，只有type为`image/jpeg`的时候才有效。
//		    quality: 90,
//
//		    // 是否允许放大，如果想要生成小图的时候不失真，此选项应该设置为false.
//		    allowMagnify: false,
//
//		    // 是否允许裁剪。
//		    crop: false,
//
//		    // 是否保留头部meta信息。
//		    preserveHeaders: true,
//
//		    // 如果发现压缩后文件大小比原来还大，则使用原来图片
//		    // 此属性可能会影响图片自动纠正功能
//		    noCompressIfLarger: false,
//
//		    // 单位字节，如果图片大小小于此值，不会采用压缩。
//		    compressSize: 0
//		},
		
		// 上传文件个数限制
		fileNumLimit : thumbnailNumber,
		// 单个文件大小限制 20M
		fileSingleSizeLimit : 20 * 1024 * 1024,

		// 只允许选择图片文件。
		accept : {
			title : 'Images'
//			extensions : 'gif,jpg,jpeg,bmp,png',
//			mimeTypes : 'image/*'
//			extensions: 'doc,docx,pdf',
//			mimeTypes: 'application/pdf, application/msword'
		},
		method : 'POST',

//		// 重要参数:跟后台文件组件的对接参数，后台文件组件叫做upload。
//		fileVal : "upload",
//
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
//		console.log(file);

		// $list为容器jQuery实例
		$list.append($li);
		
		//所有文件个数 - 取消上传文件个数
		var fileSize = uploader.getFiles().length - uploader.getFiles("cancelled").length;
//		console.log(fileSize);
		if(fileSize==thumbnailNumber){
			$(filePicker).hide();
		}
		
		// 创建缩略图
		// 如果为非图片文件，可以不用调用此方法。
		// thumbnailWidth x thumbnailHeight 为 100 x 100
		uploader.makeThumb(file, function(error, src) { // webuploader方法
			if (error) {
//				$img.replaceWith('<span>不能预览</span>');
//				$img.replaceWith('<img width="'+thumbnailWidth+'" height="'+thumbnailHeight+'" title="'+file.name+'" src="'+webContextRoot+'pages/despages/common/images/completed.png"/>');
				if(file.name.length>10){
					//文件名长度超过10，后面部分省略
					$img.replaceWith('<a id="file'+file.id+'" title="'+file.name+'" >'+file.name.substr(0,8)+'...</a>');
				}else{
					//文件名长度不超过10，原样显示
					$img.replaceWith('<a id="file'+file.id+'" title="'+file.name+'" >'+file.name+'...</a>');
				}
				$("#"+file.id).append('<img id="delete'+file.id+'" class="noUpload" src="'+webContextRoot+'pages/despages/common/jquery-easyui-1.5.1/themes/icons/cancel.png"></img>');
				
				//删除事件
				$(".noUpload").click(function(){
					var file_id = $(this).attr("id").substr(6);
					//删除上传队列
					uploader.removeFile(file_id);
					//删除页面显示
					$("#"+file_id).remove();
					$(filePicker).show();
				});
//				console.log(file);
				return;
			}

			$("#" + file.id).append('<span id="delete' + file.id + '" class="deleteIcon">▬</span>');
//			$("#" + file.id).attr("class","deleteIcon");
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
//		console.log(object,ret);
	});
	
	// 所有文件上传成功
	uploader.on('uploadFinished', function() {
		$(filePicker).show();
		//业务上的新增修改功能方法
		
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

	// 完成上传完了，成功或者失败，先删除进度条。
//	uploader.on('uploadComplete', function(file) {
//		$('#' + file.id).find('.progress').remove();
//	});
	$btn.on('click', function() {
//		console.log("上传...");
		uploader.upload();
//		console.log("上传成功");
	});
	
});

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
}

