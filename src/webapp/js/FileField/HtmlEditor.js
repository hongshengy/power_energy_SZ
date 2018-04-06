/*
 * createBy　王梓璇 2017-03-13
 * 
 * */
Ext.namespace('Des.form');
Des.form.HtmlEditor = Ext.extend(Ext.form.HtmlEditor, {
	addImage : function() {
		var editor = this;
		var fileUploadField = new Ext.form.FileUploadField({
					name : 'systemHelp.imgFile',
					emptyText : '请选择一张图片',
					blankText : '该输入项为必输项',
					allowBlank : false,
					fieldLabel : '图片',
					buttonText : '浏览...',
					width : 300,
					listeners : {
						'fileselected' : function(fb, v) {
							
							// 验证大小
							var filesize = 0;
							var image = new Image();
							image = v;
							filesize = image.fileSize;
							
							var size = getFileSize(fb.fileInput.dom);
//							console.log(size);
							if (size == 0) {
								Ext.Msg.alert('提示', '文件大小不能为空！');
								fileUploadField.setValue("");
							}
							if (size > 1024 * 2 ) {
								Ext.Msg.alert('提示', '文件大小不能超过2M！');
								fileUploadField.setValue("");
							}
							var index = v.lastIndexOf('.');
							var fieldType = v.substring(index + 1); // 文件类型
							var indexVal;
							if (v.lastIndexOf('/') != -1) {
								indexVal = v.lastIndexOf('/');
							} else if (v.lastIndexOf('\\') != -1) {
								indexVal = v.lastIndexOf('\\');
							}
							var fieldName = v.substring(indexVal + 1); // 文件名称
							Ext.getCmp('imageFileName').setValue(fieldName);
							// 图片类型判断
							fieldType = fieldType.toLowerCase();
							if (fieldType != "jpg" && fieldType != "gif"
									&& fieldType != "bmp" && fieldType != "png") {
								Ext.Msg.alert('提示', '请上传jpg,gif,bmp,png格式的图片！');
								return;
							}
						}
					}
				});
		
		function getFileSize(target){  
		    var isIE = /msie/i.test(navigator.userAgent) && !window.opera;  
		    var fs = 0;  
		    if (isIE && !target.files) {  
		        var filePath = target.value;  
		        var fileSystem = new ActiveXObject("Scripting.FileSystemObject");  
		        var file = fileSystem.GetFile (filePath);  
		        fs = file.Size;   
		    }else if(target.files && target.files.length > 0){  
		        fs = target.files[0].size;  
		    }else{  
		        fs = 0;  
		    }  
		    if(fs > 0){  
		        fs = fs / 1024;  
		    }  
		    return fs;  
		}  
		
		var imgForm = new Ext.FormPanel({
			frame : true,
			bodyStyle : 'padding:15px 5px 0px 10px',
			autoScroll : true,
			border : false,
			labelWidth : 40,
			method : 'POST',
			enctype : 'multipart/form-data',
			fileUpload : true,
			tbar : [{
				text : '保存',
				type : 'submit',
				iconCls : 'save',
				handler : function() {
					var val = fileUploadField.getValue();
					if (val != null && val != '') {
						var index = val.lastIndexOf('.');
						var fieldType = val.substring(index + 1); // 文件类型
						// 图片类型判断
						fieldType = fieldType.toLowerCase();
						if (fieldType != "jpg" && fieldType != "gif"
								&& fieldType != "bmp" && fieldType != "png") {
							Ext.Msg.alert('提示', '请上传jpg,gif,bmp,png格式的图片！');
							return;
						}
					} else {
						Ext.Msg.alert('提示', '图片：图片不能为空！');
						return;
					}
					if (!imgForm.form.isValid()) {
						return;
					}
					imgForm.form.submit({
						waitMsg : '正在上传...',
						url : gdc.webContextRoot
								+ 'gdtjfx/saveImage.action?systemHelp.modeId='+itemCode,
						success : function(form, action) {
							var element = document.createElement("img");
							/*
							 * 
							 * 为兼容多机发布，地址写死Des
							 * 
							 * 
							 */
							element.src = '/des/gdtjfx/findImageById.action?systemHelp.imgId=' + action.result.systemHelp.imgId;
							if (Ext.isIE) {
								editor.insertAtCursor(element.outerHTML);
							} else {
								var selection = editor.win.getSelection();
								if (!selection.isCollapsed) {
									selection.deleteFromDocument();
								}
								selection.getRangeAt(0).insertNode(element);
							}
							win.close();
						},
						failure : function(form, action) {
							form.reset();
							if (action.failureType == Ext.form.Action.SERVER_INVALID)
								Ext.MessageBox.alert('警告', '上传失败');
						}
					});
				}
			}],
			items : [fileUploadField, new Ext.form.Hidden({
								id : 'imageFileName',
								name : 'ceInfoNews.imageFileName'
							})]
		});
		var win = new Ext.Window({
					title : "上传图片",
					width : 400,
					height : 150,
					modal : true,
					border : false,
					layout : "fit",
					items : [imgForm]
				});
		win.show();
	},
	createToolbar : function(editor) {
		Des.form.HtmlEditor.superclass.createToolbar.call(this, editor);
		this.tb.insertButton(16, {
					iconCls : "picture",
					handler : this.addImage,
					tip : '插入图片',
					scope : this
				});
	}
});
Ext.reg('StarHtmleditor', Des.form.HtmlEditor);
