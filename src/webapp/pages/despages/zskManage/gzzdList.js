/**
 * 规章制度
 * @author wxt
 * @since 2017-05-02
 */
var num=0;
//当前页数
var pageNo = 1;
var nl_type=2; //规章制度在附件表中所对应的类型
var zcfg_type=2;//文件类型

var editType = '';//修改或者增加类型
var $list = $("#xz_gzzdFile"); //文件显示的ID位置
var $btn = $("#bt_add_commit"); // 开始上传保存的按钮ID
var filePicker = '.bt_upload'; //添加文件的按键ID
var thumbnailWidth = 60; // 缩略图高度和宽度
// （单位是像素），当宽高度是0~1的时候，是按照百分比计算，具体可以看api文档
var thumbnailHeight = 60;
var thumbnailNumber = 3;  //上传数量
var uploader = null; 	//上传组件对象
var last_bt_upload =null; //最后一次上传按键ID
var uploadArray = new Array();//装上传文件的数组
var isEdit = "";  //判断哪些报告修改了
var editFlfgFileName;
var editflfgUrl;

var addUploaderLoaded = true;
var editUploaderLoaded = true;
$(function(){	
	$('#gzzd').datagrid({    
		title:'规章制度',
		url: webContextRoot +"knowledgeBase/selectFlfgInfo.action?policyLaw.zcfg_type=2",
		loadMsg:'正在加载，请稍等……',//加载时显示提示
		rownumbers:true,
		fit:true,
		border:false,
		fitColumns:true,
		striped: true,
		singleSelect: true,
		columns:[[
		        {field:'pl_name',title:'制度名称',width:100,
		        	formatter: function(value,row,index){
						return HTMLEncode(value);
					}
		        },
	       		{field:'type_name',title:'制度来源',width:60},
	       		{field:'edit_date',title:'发布时间',width:60,
	       			formatter: function(value,row,index){
						return value.substr(0,10);
					}
	       		},
		        {field : 'remark',title : '详情',align : 'center',width : 60,
					formatter : function(value, row, index) {
						var conId = "id"+index
						return "<a onclick=\"bt_see('"+index+"','"+row.id+"')\" id='"+conId+"' style='color:blue;text-decoration: underline;cursor: pointer;'>详情</a>";
					}
				}
		]],
		tools:"#linkbuttons",
		pagination:true,
		pageSize: 20,
		pageList : [10,20,30,50],
		onLoadSuccess:function(data){
			var rows = $('#gzzd').datagrid("getRows");
			if(rows.length>0){
				$('#gzzd').datagrid("selectRow",0);
			}
		}
	});  
//	init_xg();
	//初始化 查询条件的下拉列表
	$('#zcfg_xxly').combobox({
		url:webContextRoot +'knowledgeBase/qryPolicyLawSourceList2.action',
		panelHeight:"auto",
		editable:false,
		valueField:'p_book',
		textField:'type_name',
		onChange:function(v){
        	var url = '';
        	if(v==1){
        		url = webContextRoot +'knowledgeBase/qryPolicyLawSourceList1.action?bookModel.type_value=zfbm_jtly';
        	}else if(v==2){
        		url = webContextRoot +'knowledgeBase/qryPolicyLawSourceList1.action?bookModel.type_value=gwgs_jtly';
        	}
        	if(v==1||v==2){
        		$('#xxly_lynr').combobox('reload',url);
        	}else{
        		$('#xxly_lynr').combobox('loadData','');
        		$('#xxly_lynr').combobox('setValue','');
        	}
//        	 $('#zcfg_xxly').combobox('setValue',v); 
//        	 $('#xxly_lynr').combobox('setValue',1); 
        },
        onLoadSuccess : function(){
			var data = $('#zcfg_xxly').combobox('getData');
			var newData = new Array();
			if(data.length>0&&data[0].book_id!='0'){
				newData.push({
					book_id: "0",
					p_book: "",
					type_name: "请选择",
				});
				for(var i in data){
					newData.push(data[i]);
				}
				$('#zcfg_xxly').combobox('loadData',newData);
//				console.log(newData);
			}
		}

	});
	$('#xxly_lynr').combobox({
		panelHeight:"auto",
		editable:false,
		valueField:'book_value',
		textField:'book_name',
		onLoadSuccess : function(){
			var data = $('#xxly_lynr').combobox('getData');
//			console.log(data);
			var newData = new Array();
			if(data.length>0&&data[0].book_id!='0'){
				newData.push({
					book_id: "0",
					book_value: "",
					book_name: "请选择",
				});
				for(var i in data){
					newData.push(data[i]);
				}
				$('#xxly_lynr').combobox('loadData',newData);
//				console.log(newData);
			}
		}
	});	
	
	
});

/**
 * 取消上传方法
 */
function noUploadMethod(){
	//取消上传
	$(".cancelUpload").click(function(){
		$(this).parent().prev().children().html("");
//		$(this).parent().html("");
	});
}
/**
 * 新增 窗口加载初始化
 */
function init_xz(){
	editType = "A";
	isEdit = false;
	$('#zcfg_xxly1').combobox('clear');
	$('#xxly_lynr1').combobox("clear");
	$('#xxly_lynr1').combobox("loadData",[]);//清空下拉列表的数据
	//下拉菜单
	$('#zcfg_xxly1').combobox({
		url:webContextRoot +'knowledgeBase/qryPolicyLawSourceList2.action',//法律制度来源
		panelHeight:"auto",
		panelWidth:120,
		editable:false,
		valueField:'p_book',
		textField:'type_name',
		onSelect:function(record){
        	var url;
        	if(record.p_book==1){
        		url = webContextRoot +'knowledgeBase/qryPolicyLawSourceList1.action?bookModel.type_value=zfbm_jtly';
        	}else{
        		url = webContextRoot +'knowledgeBase/qryPolicyLawSourceList1.action?bookModel.type_value=gwgs_jtly';
        	}
        	 $('#xxly_lynr1').combobox({
        		url:url,
    			panelHeight:"auto",
    			panelWidth:150,
    			editable:false,
    			valueField:'book_value',
    			textField:'book_name'
        	});	
//        	 $('#xxly_lynr1').combobox('reload',url);
//        	 $('#zcfg_xxly1').combobox('setValue',newValue); 
//        	 $('#xxly_lynr1').combobox('setValue',1); 
        }
	});		
//	$('#xxly_lynr1').combobox({
//		panelHeight:"auto",
//		editable:false,
//		valueField:'book_value',
//		textField:'book_name'
//	});	
	
	$('#xz_name').textbox('setValue','');
	$('#pl_content1').textbox('setValue','');	
	$('#xz_gzzdFile').html("");	
	$(".bt_upload").removeClass('webuploader-element-invisible');
	$(".bt_upload").click(function(){
		last_bt_upload = $(this).attr("id");
		var id = $(this).attr("id").substr(0,3);;
		$list = $("#"+id+"gzzdFile"); //文件显示的ID位置
	});
	$btn = $("#bt_add_commit"); // 开始上传保存的按钮ID
	if(addUploaderLoaded) {
		webUploader();
		addUploaderLoaded = false;
	}
	clearUploader();
}
/**
 * 修改 窗口加载初始化
 */
function init_xg(){
	editType = "U";
	isEdit = false;
	//下拉菜单  法律制度来源下拉菜单
	$('#zcfg_xxly3').combobox({
		url:webContextRoot +'knowledgeBase/qryPolicyLawSourceList2.action',//法律制度来源
		panelHeight:"auto",
		panelWidth:120,
		editable:false,
		valueField:'p_book',
		textField:'type_name',
		onChange:function(newValue, oldValue){
			var url;
			if(newValue==1){
				url = webContextRoot +'knowledgeBase/qryPolicyLawSourceList1.action?bookModel.type_value=zfbm_jtly';
			}else{
				url = webContextRoot +'knowledgeBase/qryPolicyLawSourceList1.action?bookModel.type_value=gwgs_jtly';
			}
			$('#xxly_lynr3').combobox('reload',url);
			$('#zcfg_xxly3').combobox('setValue',newValue); 
//			$('#xxly_lynr3').combobox('setValue',1); 
		}
	});	
	//法律法规具体来源下拉菜单
	$('#xxly_lynr3').combobox({
		panelHeight:"auto",
		panelWidth:150,
		editable:false,
		valueField:'book_value',
		textField:'book_name'
	});	
	
	$('#xz_name').textbox('setValue','');
	$('#pl_content3').textbox('setValue','');	
	$('#xg_gzzdFile').html("");	
	$(".bt_upload").removeClass('webuploader-element-invisible');
	$(".bt_upload").click(function(){
		last_bt_upload = $(this).attr("id");
		var id = $(this).attr("id").substr(0,3);;
		$list = $("#"+id+"gzzdFile"); //文件显示的ID位置
	});
	$btn = $("#bt_update_commit"); // 开始上传保存的按钮ID
	if(editUploaderLoaded) {
		webUploader();
		editUploaderLoaded = false;
	}
	clearUploader();
}

/**
 * 查询
 */
function bt_search(){
	var zcfg_xxly =  $('#zcfg_xxly').combobox('getValue');
	var xxly_lynr = $('#xxly_lynr').combobox('getValue');
	var pl_name =$.trim($('#pl_name').textbox('getValue'));
	$('#gzzd').datagrid('reload',{
			'policyLaw.zcfg_xxly':zcfg_xxly,//政府来源zcfg_xxly1
	        'policyLaw.xxly_lynr': xxly_lynr,//具体来源xxly_lynr1
		    'policyLaw.pl_name':pl_name,//制度名称
	});
}

/**
 * 规章制度的增加功能
 */
function bt_add(){
	$('#zcfgxz').dialog('setTitle','规章制度-新增');
	$('#zcfgxz').dialog('open');	
	init_xz();
//	$('#bt_add_commit').show();
//	$('#bt_update_commit').hide();
	
}
/**
 * 新增 提交
 */
function bt_add_commit(){
	/**
	 * 获取文件的ID
	 */
//	var flfgURL = $("#xz_gzzdFile .gzzdFile").attr("id");	//上传文件URL
//	var flfgFileName = $("#xz_gzzdFile .gzzdFile").attr("title");	//上传文件 名称 var zdbgFileName = $("#xg_zdbgFile .zdbgFile").text();
	var flfgFileName = null;
	var flfgURL = null;
	if(uploadArray.length>0){
		flfgFileName = uploadArray[0].oldName;
		flfgURL = uploadArray[0].url;
	}
	var pl_name = $("#xz_name").val();//制度名称
	var zcfg_xxly = $("#zcfg_xxly1").combobox("getValue");//制度来源
	var xxly_lynr = $("#xxly_lynr1").combobox("getValue");//具体来源
	var pl_content = $("#pl_content1").val();//制度内容
//	if(pl_name.length==0){
//		$.messager.alert('提示','制度名称不能为空!','info');    
//		return;
//	}
//	if(zcfg_xxly.length==0){
//		$.messager.alert('提示','制度来源不能为空!','info');    
//		return;
//	}
//	if(pl_content.length==0){
//		$.messager.alert('提示','制度内容不能为空!','info');    
//		return;
//	}
//	if(pl_name.length>60){
//		$.messager.alert('提示','制度名称应小于60个字!','info');    
//		return;
//	}
	$.ajax({			
		url:webContextRoot+'knowledgeBase/saveFlfg.action', 
		data:{
			'policyLaw.pl_name': pl_name,
			'policyLaw.zcfg_xxly':zcfg_xxly,	
			'policyLaw.xxly_lynr':xxly_lynr,	
			'policyLaw.pl_content':pl_content,
			'policyLaw.flfgURL' : flfgURL,
			'policyLaw.flfgFileName' : flfgFileName,	
			'policyLaw.nl_type' : nl_type,//附件中的文件类型
			'policyLaw.zcfg_type':zcfg_type //政策类型
		},
		dataType:'json',
		type:'post',
		success:function(result){
			if(result.flag=='success'){
				$.messager.alert('提示','添加成功!','info');  
				$('#zcfgxz').window('close');
				$('#gzzd').datagrid('reload');
				bt_search();
			}else{
				$.messager.alert('提示','添加失败!','info');  
			}
		}
	});
}

/**
 * 取消 按钮
 */
function bt_add_cancel(){
	$('#zcfgxz').window('close');
//	init();
}
/**
 * 取消 按钮
 */
function bt_xg_cancel(){
	$('#zcfgxg').window('close');
//	init();
}


/**查看知识库信息**/
function bt_see(index,id){
	qingkong();
	
	var allData = $('#gzzd').datagrid('getRows');
	var rowData = null ;
	for(var i=0 ; i < allData.length ; i++){
		if(allData[i].id==id){
			rowData = allData[i];
			break;
		}
	}
//	var idlist = $('#gzzd').datagrid('getSelected');
	$('#ck_name').textbox('setValue',rowData.pl_name);
	$('#zcfg_xxly2').textbox('setValue',rowData.type_name);
	$('#xxly_lynr2').textbox('setValue',rowData.book_name);
	$('#pl_content2').textbox('setValue',rowData.pl_content);
	//根据项目ID查询项目附件
	$.ajax({	
		url:webContextRoot+'knowledgeBase/selectAccessInfo.action', 
		data:{
			'acc.nl_id': rowData.id,
			'acc.nl_type':nl_type
		},
		dataType:'json',
		type:'post',
		success:function(result){
			$.each(result,function(index,obj){
				var html = "";
				$.ajax({
					async : false,
					url : webContextRoot + 'pCode/judgeFileExist.action',
					data : {downloadFilePath : obj.ai_url},
					dataType : "json",
					success : function(data) {
						if(data.FLAG == "1"){
							if(obj.ai_file_name.length>25){
								//文件名长度超过25，后面部分省略
								html='<a id="'+obj.ai_url+'" href="'+webContextRoot+obj.ai_url+'" target="_blank" class="ck_gzzdFile"  style="width: 120px; height: 30px;" title="'+obj.ai_file_name+'" download="'+obj.ai_file_name+'" >'+obj.ai_file_name.substr(0,24)+'...</a>';
							}else{
								//文件名长度不超过25，原样显示
								html='<a id="'+obj.ai_url+'" href="'+webContextRoot+obj.ai_url+'" target="_blank" class="ck_gzzdFile"  style="width: 120px; height: 30px;" title="'+obj.ai_file_name+'" download="'+obj.ai_file_name+'" >'+obj.ai_file_name+'</a>';
							}
						}else if(data.FLAG == "2"){
							if(obj.ai_file_name.length>25){
								//文件名长度超过25，后面部分省略
								html="<a id=\""+obj.ai_url+"\" href=\"#\" onclick=\"$.messager.alert('提示', '下载的文件不存在！', 'warning');\" class=\"ck_gzzdFile\"  style=\"width: 120px; height: 30px;\">"+obj.ai_file_name.substr(0,24)+"...</a>";
							}else{
								//文件名长度不超过25，原样显示
								html="<a id=\""+obj.ai_url+"\" href=\"#\" onclick=\"$.messager.alert('提示', '下载的文件不存在！', 'warning');\" class=\"ck_gzzdFile\"  style=\"width: 120px; height: 30px;\">"+obj.ai_file_name+"</a>";
							}
						}
					}
				});
				
//					var html='<a id="'+obj.ai_url+'" href="'+webContextRoot+obj.ai_url+'" target="_blank" class="gzzdFile"  style="width: 120px; height: 30px;" download="'+obj.ai_file_name+'" >'+obj.ai_file_name+'</a>';
					$("#ck_gzzdFile").html(html);			
			});
		}
	});	
	$('#zcfgck').dialog('open');		
}
function qingkong(){
	
	$('#ck_name').textbox('setValue','');
	$('#zcfg_xxly2').textbox('setValue','');
	$('#xxly_lynr2').textbox('setValue','');
	$('#pl_content2').textbox('setValue','');
	$('#ck_gzzdFile').text('');
	
}

/**
 * 删除
 */
function bt_delete(){
	var idlist = $('#gzzd').datagrid('getSelected');
	if(idlist==null){
	$.messager.alert('提示','请选择一条记录进行删除!','info');   
	}else{
		$.ajax({	
			url:webContextRoot+'knowledgeBase/delPolicyLaw.action', 
			data:{
				'policyLaw.id': idlist.id,
				'policyLaw.nl_type' : nl_type//附件中的文件类型
			},
			dataType:'json',
			type:'post',
			success:function(result){
				if(result.flag=='success'){
					$.messager.confirm('确认','您确认想要删除记录吗？',function(r){    
					    if (r){    
					    	$.messager.alert('提示','删除成功!','info');  
							$('#gzzd').datagrid('reload');
					    }    
					});  
				}else{
					$.messager.alert('提示','删除失败!','info');  
				}
			}
		});
	}
}

//修改
function bt_modify(){
	var idlist = $('#gzzd').datagrid('getSelected');
	if(idlist==null){
		$.messager.alert('提示','请选择一条记录进行修改!','info');   
		}else{
			init_xg();
		$('#zcfgxg').dialog('setTitle','规章制度-修改');
		$("#xg_name").textbox('setValue',idlist.pl_name);
		$('#zcfg_xxly3').combobox('setValue',idlist.zcfg_xxly);
		$('#xxly_lynr3').combobox('setValue',idlist.xxly_lynr);
		$("#pl_content3").textbox('setValue',idlist.pl_content);
		
		//根据项目ID查询项目附件
		$.ajax({	
			url:webContextRoot+'knowledgeBase/selectAccessInfo.action', 
			data:{
				'acc.nl_id': idlist.id,
				'acc.nl_type':nl_type
			},
			dataType:'json',
			type:'post',
			success:function(result){
				$.each(result,function(index,obj){
					var html;
					var noUpload = '<img class="del noUp" src="'+webContextRoot+'pages/despages/common/jquery-easyui-1.5.1/themes/icons/cancel.png"></img>';
					$.ajax({
						async : false,
						url : webContextRoot + 'pCode/judgeFileExist.action',
						data : {downloadFilePath : obj.ai_url},
						dataType : "json",
						success : function(data) {
							if(data.FLAG == "1"){
								if(obj.ai_file_name.length>10){
									//文件名长度超过30，后面部分省略
									html1='<a id="'+obj.ai_url+'" href="'+webContextRoot+obj.ai_url+'" target="_blank" class="zdbgFile"  style="width: 120px; height: 30px;" title="'+obj.ai_file_name+'" download="'+obj.ai_file_name+'" >'+obj.ai_file_name.substr(0,10)+'...</a>';
								}else{
									//文件名长度不超过10，原样显示
									html1='<a id="'+obj.ai_url+'" href="'+webContextRoot+obj.ai_url+'" target="_blank" class="zdbgFile"  style="width: 120px; height: 30px;" title="'+obj.ai_file_name+'" download="'+obj.ai_file_name+'" >'+obj.ai_file_name+'</a>';
								}
							}else if(data.FLAG == "2"){
								if(obj.ai_file_name.length>10){
									//文件名长度超过30，后面部分省略
									html1="<a id=\""+obj.ai_url+"\" href=\"#\" onclick=\"$.messager.alert('提示', '下载的文件不存在！', 'warning');\" class=\"zdbgFile\"  style=\"width: 120px; height: 30px;\">"+obj.ai_file_name.substr(0,10)+"...</a>";
								}else{
									//文件名长度不超过10，原样显示
									html1="<a id=\""+obj.ai_url+"\" href=\"#\" onclick=\"$.messager.alert('提示', '下载的文件不存在！', 'warning');\" class=\"zdbgFile\"  style=\"width: 120px; height: 30px;\">"+obj.ai_file_name+"</a>";
								}
							}
						}
					});
					
					html1 += noUpload;
					$("#xg_gzzdFile").html(html1);
					editFlfgFileName = obj.ai_file_name;
					editflfgUrl = obj.ai_url;
					$("#xg_gzzdUpload").addClass('webuploader-element-invisible');
					$(".del").click(function(){
						$(this).parent().html("");
						$("#xg_gzzdUpload").removeClass('webuploader-element-invisible');
						isEdit = true;
					});	
				})
			}
		});
		$('#zcfgxg').dialog('open');
	}
}
function bt_update_commit(){
	/**
	 * 获取文件的ID
	 */
	var implEdit;
	var idlist = $('#gzzd').datagrid('getSelected');
	var id = idlist.id;
	if(uploadArray.length>0){
		flfgURL = uploadArray[0].url;
		flfgFileName = uploadArray[0].oldName;
		implEdit = true;
	}else{
		if($.trim($("#xg_gzzdFile").text()).length>0 && isEdit == false){
			var flfgFileName = editFlfgFileName;
			var flfgURL = editflfgUrl;
			implEdit = "";
		}else if(isEdit == true){
			flfgURL = "";
			flfgFileName = ""
			implEdit = true;
		}				
	}
//	var flfgURL = $("#xg_gzzdFile .gzzdFile").attr("id");
//	var flfgFileName = $("#xg_gzzdFile .gzzdFile").attr("title");	//上传文件 名称
	var pl_name = $("#xg_name").val();//制度名称
	var zcfg_xxly = $("#zcfg_xxly3").combobox("getValue");//制度来源
	var xxly_lynr = $("#xxly_lynr3").combobox("getValue");//具体来源
	var pl_content = $("#pl_content3").val();//制度内容
	if(pl_name.length==0){
		$.messager.alert('提示','制度名称不能为空!','info');    
		return;
	}
	if(zcfg_xxly.length==0){
		$.messager.alert('提示','制度来源不能为空!','info');    
		return;
	}
	if(pl_name.length>60){
		$.messager.alert('提示','制度名称应小于60个字!','info');    
		return;
	}
	if(pl_content.length==0){
		$.messager.alert('提示','制度内容不能为空!','info');    
		return;
	}
	$.ajax({	
		url:webContextRoot+'knowledgeBase/saveFlfg.action', 
		data:{
			'policyLaw.id': id,
			'policyLaw.pl_name': pl_name,
			'policyLaw.zcfg_xxly':zcfg_xxly,	
			'policyLaw.xxly_lynr':xxly_lynr,	
			'policyLaw.pl_content':pl_content,
			'policyLaw.flfgURL' : flfgURL,
			'policyLaw.flfgFileName' : flfgFileName	,
			'policyLaw.nl_type' : nl_type,//附件中的文件类型
			'policyLaw.zcfg_type':zcfg_type, //政策类型
			'policyLaw.isEdit':implEdit
		},
		dataType:'json',
		type:'post',
		success:function(result){
			if(result.flag=='success'){
				$.messager.alert('提示','修改成功!','info');  
				$('#zcfgxg').window('close');
				$('#gzzd').datagrid('reload');
			}else{
				$.messager.alert('提示','修改失败!','info');  
			}
		}
	});
}


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
		
		$("#"+last_bt_upload).addClass('webuploader-element-invisible');
		
		
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
					//显示上传按钮
					$("#"+last_bt_upload).removeClass('webuploader-element-invisible');
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
		if(editType == "A"){
			//新增提交
			bt_add_commit();
		}else if(editType == "U"){
			//修改提交
			bt_update_commit();
		}
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

function checkCanSave(){
//	var flfgFileName = $("#xz_flfgFile").attr("title");
	if(editType == "A"){
		var children = $("#xz_gzzdFile").children();
		if(children.length>0){
			var flfgFileId = "file"+children[0].id;
		}
		var flfgFileName = $("#"+flfgFileId).attr("title");
		var pl_name = $("#xz_name").val();//制度名称
		var zcfg_xxly = $("#zcfg_xxly1").combobox("getValue");//制度来源
		var xxly_lynr = $("#xxly_lynr1").combobox("getValue");//具体来源
		var pl_content = $("#pl_content1").val();//制度内容
		if(pl_name.length==0){
			$.messager.alert('提示','制度名称不能为空!','info');    
			return false;
		}
		if(pl_name.length>60){
			$.messager.alert('提示','制度名称应小于60个字!','info');    
			return false;
		}
		if(pl_content.length==0){
			$.messager.alert('提示','制度内容不能为空!','info');    
			return false;
		}
		if(pl_content.length > 500){
			$.messager.alert('提示','制度内容不能大于500个字!','info');    
			return false;
		}
		if(zcfg_xxly.length == 0){
			$.messager.alert('提示','制度来源不能为空!','info');    
			return false;
		}
		if(xxly_lynr == 0){
			$.messager.alert('提示','具体来源不能为空!','info');    
			return false;
		}
		if(flfgFileName!=null&&flfgFileName.length >120){
			$.messager.alert('提示','附件不能大于120个字!','info');    
			return false;
		}
		return true;
	}else if(editType == "U"){
		if(isEdit == true){
			if($("#xg_gzzdFile").text().length>0){
				var children = $("#xg_gzzdFile").children();
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
		var pl_name = $("#xg_name").val();//制度名称
		var zcfg_xxly = $("#zcfg_xxly3").combobox("getValue");//制度来源
		var xxly_lynr = $("#xxly_lynr3").combobox("getValue");//具体来源
		var pl_content = $("#pl_content3").val();//制度内容
		if(pl_name.length==0){
			$.messager.alert('提示','制度名称不能为空!','info');    
			return false;
		}
		if(pl_name.length>60){
			$.messager.alert('提示','制度名称应小于60个字!','info');    
			return false;
		}
		if(pl_content.length==0){
			$.messager.alert('提示','制度内容不能为空!','info');    
			return false;
		}
		if(pl_content.length > 500){
			$.messager.alert('提示','制度内容不能大于500个字!','info');    
			return false;
		}
		if(zcfg_xxly.length == 0){
			$.messager.alert('提示','制度来源不能为空!','info');    
			return false;
		}
		if(xxly_lynr == 0){
			$.messager.alert('提示','具体来源不能为空!','info');    
			return false;
		}
		if(flfgFileName!=null&&flfgFileName.length >120){
			$.messager.alert('提示','附件不能大于120个字!','info');    
			return false;
		}
		return true;
	}		
	
}

