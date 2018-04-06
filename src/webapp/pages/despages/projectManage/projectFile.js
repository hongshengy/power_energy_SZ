/**
 * 项目档案
 * @author 孟子杰
 * @since 2017-05-02
 */
//当前时间
var currentdate = new Date();
//填报日期
var a_addDate = DateUtil.dateToStr('yyyy-MM-dd',currentdate);
//完成日期
var a_finishDate = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('m',1,currentdate));

//用于设备树选中
var devIdArr = null;
var consID = null;

var $list = $("#zdbgFile"); //文件显示的ID位置
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
var isEdit = new Array();  //判断哪些报告修改了

var addUploaderLoaded = true;
var editUploaderLoaded = true;
var consComboboxSelectd = '';

$(function(){
	
	 //选择大用户树
	$('#consId').combobox({    
		url:webContextRoot +'destree/queryConsList.action',
		valueField: 'id',
		textField: 'text' ,
		
//	    onChange: function(newValue, oldValue){
////	    	if(newValue!=''){
////					 newValue = $('#consId').combobox('getText');
////						$.getJSON(webContextRoot + 'destree/queryTree.action?isQyCode=false&ziMu='+newValue,{ 
////								},
////								function(json){
////									$('#consId').combobox('loadData',json);	
////								}
////										);
////	    	}else{
////	    		 newValue = $('#consId').combobox('getText');
////					$.getJSON(webContextRoot + 'destree/queryTree.action?isQyCode=false&ziMu=',{ 
////							},
////							function(json){
////								$('#consId').combobox('loadData',json);	
////							}
////					);
////	    	}	
////	    	var qiteid = $('#consId').combobox('getValue');
////    		if(!isNaN(qiteid)){
////		    	$('#deviceName').combotree({
////				    method:'get',
////				    multiple:false,//是否支持多选
////				    onBeforeLoad:function(node){//请求之前
////			    		if(node){//点击节点
////							treeNodeType = node.type;//获取节点类型
////							$('#deviceName').combotree('tree').tree('options').url=webContextRoot//点击触发
////							+'destree/queryYhbTree.action?treeState=closed&treeNodeType='+treeNodeType;//带参数地址个
////						}else{
////							$('#deviceName').combotree('tree').tree('options').url=webContextRoot //根据企业节点下一级
////							+'destree/queryYhbTree.action?treeState=closed&treeNodeType=1&id='+qiteid;//带参数地址
////						}
////			    		
////					},
////					onLoadSuccess : function(){
////						var roots = $('#deviceName').combotree('tree').tree('getRoots');
////			    		if(roots!=null&&roots.length>0){
////			    			root = roots[0];
////			    			if(root.id != '21'){
////			    				$('#deviceName').combotree('tree').tree('insert', {
////				    				before: root.target,
////				    				data: {
////				    					id: 21,
////				    					text: '请选择'
////				    				}
////				    			});
////			    			}
////			    		}
////					},
////			    	onSelect:function(item){
////			    		var isLeaf = $('#deviceName').tree('isLeaf',item.target);
////			    		var tree = $('#deviceName').combotree('tree');
////			    		//获取选择节点并返回它，如果未选择则返回null。
////			    		var selected = $('#deviceName').combotree('tree').tree('getSelected');
////			    		var parent = tree.tree('getParent',item.target);
////			    	}
////		    	});
////		}		
//		}
		mode : 'remote',
		onHidePanel : function(){$('#consId').combobox('reload');}
	});
	
	$('#data_grid').datagrid({    
		url: webContextRoot + "projectFile/selectProject.action",
		loadMsg:'正在加载，请稍等……',//加载时显示提示
		rownumbers:true,
		fit:true,
		fitColumns:true,
		striped: true,
		border : false,
		singleSelect: true,
		tools : '#tool_button',
		columns:[[
		    {field:'id',title:'项目id',hidden:true,width:50,align:'center'},
		    {field:'prjName',title:'项目名称',width:50,align:'left',
		    	formatter: function(value,row,index){
		    		var a = '<a style="color:blue" href="#" onclick="onSelectXQ2('+index+','+row.id+')">'+HTMLEncode(value)+'</a>';
					return a;
		    	}
		    },
		    {field:'consNo',title:'客户编号',width:50,align:'left',
		    	formatter: function(value,row,index){
		    		return HTMLEncode(value);
		    	}
		    },
			{field:'consName',title:'客户名称',width:50,align:'left',
				formatter: function(value,row,index){
					return HTMLEncode(value);
				}
			},
			{field:'deveiceType',title:'设备类型',width:50,align:'center',hidden:'true',
				formatter: function(value,row,index){
//					电气类   31
//					      变压器 31-01
//					      母线   31-02
//					      线路档案 31-03
//					非电气   32
//					      环境检测设备  32-01
//					      门状态        32-02
//					      照明          32-03
//					      其它          32-04
					if(value=='31_01'){
						return '变压器';
					}else if(value=='31_02'){
						return '母线';
					}else if(value=='31_03'){
						return '线路档案';
					}else if(value=='32_01'){
						return '环境检测设备';
					}else if(value=='32_02'){
						return '门状态';
					}else if(value=='32_03'){
						return '照明';
					}else if(value=='32_04'){
						return '其它';
					}else{
						return value;
					}
				}
			},
			{field:'deviceName',title:'设备名称',width:50,align:'left'},
			{field:'prjType',title:'项目类型',width:50,align:'center',	//1=节能项目 2=替代项目
				formatter: function(value,row,index){
					if(value=='1'){
						return '节能项目';
					}else if(value=='2'){
						return '替代项目';
					}else{
						return value;
					}
				}
			},
			{field:'useTea',title:'采用技术',width:50,align:'center',
				formatter: function(value,row,index){
					return HTMLEncode(value);
				}
			},
			{field:'eleNum',title:'节能(替代)电量(kWh)',width:50,align:'right'},
			{field:'finishDate',title:'改造完成日期',width:50,align:'center',
				formatter: function(value,row,index){
					return value.substr(0,10);
				}
			},
			{field:'username',title:'填报人',width:50,align:'center'},
			{field:'addDate',title:'填报日期',width:50,align:'center',
				formatter: function(value,row,index){
					return value.substr(0,10);
				}
			}
		]],
		pagination:true,
		pageSize: 30,
		pageList : [30,50,100],
		onLoadSuccess:function(data){
			var rows = $('#data_grid').datagrid("getRows");
			if(rows.length>0){
				$('#data_grid').datagrid("selectRow",0);
			}
		}
	});  
	
	/**
	 * 自定义检验类型 
	 */
	$.extend($.fn.validatebox.defaults.rules, {
		floatNumber:{
			validator:function(value,param){
				return isFloat(value);
			},
			message:'请输入正数'
		},
		character:{
			validator:function(value,param){
				return isCharacter(value);
			},
			message:'请输入正确的汉字、字母或数字'
		}
	});
	
	init();
	
	//隐藏 操作人的名称
	$('#a_username').next().hide();
	$('#xg_username').next().hide();
	
	
});

/**
 * 窗口加载初始化
 */
function init(){
	//项目名称初始化
	$('#a_prjName').textbox('setValue','');
	//项目类型初始化
	$('#a_prjType').combobox({
		readonly:false,
		onChange: function(newValue, oldValue){
			if(newValue==1){
				$('#a_ele').text('节能电量(kWh)：');
			}else if(newValue==2){
				$('#a_ele').text('替代电量(kWh)：');
			}else{
				$('#a_ele').text('节能(替代)电量(kWh)：');
			}
		}
	});
	$('#a_prjType').combobox('setValue','1');
	if($('#a_prjType').combobox('getValue')==1){
		$('#a_ele').text('节能电量(kWh)：');
	}else if($('#a_prjType').combobox('getValue')==2){
		$('#a_ele').text('替代电量(kWh)：');
	}else{
		$('#a_ele').text('节能(替代)电量(kWh)：');
	}
	//采用技术初始化
	$('#a_useTea').textbox('setValue','');
	//添加操作人初始化
	$('#a_addUserId').val(userId);
	$('#a_username').textbox('setValue',userName);
	//填报时间初始化
	$('#a_addDate').datebox('setValue',a_addDate);
	//完成时间初始化
	$('#a_finishDate').datebox('setValue',a_finishDate);
	//电量初始化
	$('#a_eleNum').textbox('setValue','');
	//备注初始化
	$('#a_memo').textbox('setValue','');
	//附件初始化
	$('#zdbgFile').html("");
	$('#jsbgFile').html("");
	$('#xmbgFile').html("");
	
}

/**
 * 选中查看详情
 * @param rowIndex 下标顺序
 * @param rowData  数据
 */
function onSelectXQ(rowIndex, rowData){
	$('#xg_id').val(rowData.id);
	//项目名称初始化
	$('#xg_prjName').textbox('setValue',rowData.prjName);
	
	//项目类型初始化
	 //<!-- 1=节能项目 2=替代项目 -->
	if(rowData.prjType==1){
		$('#xg_prjType').textbox('setValue','节能项目');
		$('#xg_ele').text('节能电量(kWh)：');
	}else if(rowData.prjType==2){
		$('#xg_prjType').textbox('setValue','替代项目');
		$('#xg_ele').text('替代电量(kWh)：');
	}else{
		$('#xg_prjType').textbox('setValue',rowData.prjType);
	}
	//采用技术初始化
	$('#xg_useTea').textbox('setValue',rowData.useTea);
	//添加操作人初始化
	$('#xg_addUserId').val(rowData.addUserId);
	$('#xg_username').textbox('setValue',rowData.username);
	//填报日期初始化
	$('#xg_addDate').textbox('setValue',rowData.addDate.substr(0,10));
	//完成日期初始化
	$('#xg_finishDate').textbox('setValue',rowData.finishDate.substr(0,10));
	
//	$('#xg_username').textbox('setValue',rowData.username);
	//电量初始化
	$('#xg_eleNum').textbox('setValue',rowData.eleNum);
	
}

/**
 * 选中查询  新窗口  没有input
 */
function onSelectXQ2(rowIndex, id){
	//获取datagrid所有行对象
	var allData = $('#data_grid').datagrid('getRows');
	//获取选中行对象
	var rowData = null ;
	for(var i=0 ; i < allData.length ; i++){
		if(allData[i].id==id){
			rowData = allData[i];
			break;
		}
	}
	//客户名称初始化
	if(rowData.consName.length>10){
		$('#xq_consId').text(rowData.consName.substr(0,8)+"...");
		$('#xq_consId').attr('title',rowData.consName);
	}else{
		$('#xq_consId').text(rowData.consName);
	}
	//项目名称初始化
	if(rowData.prjName.length>10){
		$('#xq_prjName').text(rowData.prjName.substr(0,8)+"...");
		$('#xq_prjName').attr('title',rowData.prjName);
	}else{
		$('#xq_prjName').text(rowData.prjName);
	}
	//设备名称初始化
	if(rowData.deviceName.length>10){
		$('#xq_deviceName').text(rowData.deviceName.substr(0,8)+"...");
		$('#xq_deviceName').attr('title',rowData.deviceName);
	}else{
		$('#xq_deviceName').text(rowData.deviceName);
	}
	//项目类型初始化
	//<!-- 1=节能项目 2=替代项目 -->
	if(rowData.prjType==1){
		$('#xq_prjType').text('节能项目');
		$('#xq_ele').text('节能电量(kWh)：');
	}else if(rowData.prjType==2){
		$('#xq_prjType').text('替代项目');
		$('#xq_ele').text('替代电量(kWh)：');
	}else{
		$('#xq_prjType').text(rowData.prjType);
	}
	//采用技术初始化
	if(rowData.useTea.length>10){
		$('#xq_useTea').text(rowData.useTea.substr(0,8)+"...");
		$('#xq_useTea').attr('title',rowData.useTea);
	}else{
		$('#xq_useTea').text(rowData.useTea);
	}
	//修改操作人初始化
	$('#xq_username').text(rowData.username);
	//填报时间初始化
	$('#xq_addDate').text(rowData.addDate.substr(0,10));
	//完成时间初始化
	$('#xq_finishDate').text(rowData.finishDate.substr(0,10));
	//电量初始化
	$('#xq_eleNum').text(rowData.eleNum);
	//备注初始化
	$('#xq_memo').text(rowData.memo);
	//附件初始化
	$("#xq_zdbgFile").html("");
	$("#xq_jsbgFile").html("");
	$("#xq_xmbgFile").html("");
	
	//根据项目ID查询项目附件  并显示
	$.ajax({	
		url:webContextRoot+'projectFile/selectProjectAccessInfo.action', 
		data:{
			'paim.prjId': rowData.id
		},
		dataType:'json',
		type:'post',
		success:function(result){
//			aiFileName  aiUrl	accessType	//P_CODE 70046 1诊断报告    2技术报告    3项目报告
			var html1 ='';
			var html2 ='';
			var html3 ='';
			$.each(result,function(index,obj){
				// 判断文件是否存在
				$.ajax({
					async : false,
					url : webContextRoot + 'pCode/judgeFileExist.action',
					data : {downloadFilePath : obj.aiUrl},
					dataType : "json",
					success : function(data) {
						if(data.FLAG == "1"){
							//诊断报告附件显示
							if(obj.accessType==1){
								if(obj.aiFileName.length>30){
									//文件名长度超过10，后面部分省略
									html1 = '<a id="'+obj.aiUrl+'" href="'+webContextRoot+obj.aiUrl+'" target="_blank" class="xq_zdbgFile"  style="width: 120px; height: 30px;" title="'+obj.aiFileName+'" download="'+obj.aiFileName+'" >'+obj.aiFileName.substr(0,28)+'...</a>';
								}else{
									//文件名长度不超过10，原样显示
									html1 = '<a id="'+obj.aiUrl+'" href="'+webContextRoot+obj.aiUrl+'" target="_blank" class="xq_zdbgFile"  style="width: 120px; height: 30px;" title="'+obj.aiFileName+'" download="'+obj.aiFileName+'" >'+obj.aiFileName+'</a>';
								}
							}
							//技术报告附件显示
							if(obj.accessType==2){
								if(obj.aiFileName.length>30){
									//文件名长度超过10，后面部分省略
									html2 = '<a id="'+obj.aiUrl+'" href="'+webContextRoot+obj.aiUrl+'" target="_blank" class="xq_jsbgFile"  style="width: 120px; height: 30px;" title="'+obj.aiFileName+'" download="'+obj.aiFileName+'" >'+obj.aiFileName.substr(0,28)+'...</a>';
								}else{
									//文件名长度不超过10，原样显示
									html2 = '<a id="'+obj.aiUrl+'" href="'+webContextRoot+obj.aiUrl+'" target="_blank" class="xq_jsbgFile"  style="width: 120px; height: 30px;" title="'+obj.aiFileName+'" download="'+obj.aiFileName+'" >'+obj.aiFileName+'</a>';
								}
							}
							//项目报告附件显示
							if(obj.accessType==3){
								if(obj.aiFileName.length>30){
									//文件名长度超过10，后面部分省略
									html3 = '<a id="'+obj.aiUrl+'" href="'+webContextRoot+obj.aiUrl+'" target="_blank" class="xq_xmbgFile"  style="width: 120px; height: 30px;" title="'+obj.aiFileName+'" download="'+obj.aiFileName+'" >'+obj.aiFileName.substr(0,28)+'...</a>';
								}else{
									//文件名长度不超过10，原样显示
									html3 = '<a id="'+obj.aiUrl+'" href="'+webContextRoot+obj.aiUrl+'" target="_blank" class="xq_xmbgFile"  style="width: 120px; height: 30px;" title="'+obj.aiFileName+'" download="'+obj.aiFileName+'" >'+obj.aiFileName+'</a>';
								}
							}
						}else if(data.FLAG == "2"){
							//诊断报告附件显示
							if(obj.accessType==1){
								if(obj.aiFileName.length>30){
									//文件名长度超过10，后面部分省略
									html1 = "<a id=\""+obj.aiUrl+"\" href=\"#\" onclick=\"$.messager.alert('提示', '下载的文件不存在！', 'warning');\" class=\"xq_zdbgFile\" style=\"width: 120px; height: 30px;\">"+obj.aiFileName.substr(0,28)+"...</a>";
								}else{
									//文件名长度不超过10，原样显示
									html1 = "<a id=\""+obj.aiUrl+"\" href=\"#\" onclick=\"$.messager.alert('提示', '下载的文件不存在！', 'warning');\" class=\"xq_zdbgFile\" style=\"width: 120px; height: 30px;\">"+obj.aiFileName+"</a>";
								}
							}
							//技术报告附件显示
							if(obj.accessType==2){
								if(obj.aiFileName.length>30){
									//文件名长度超过10，后面部分省略
									html2 = "<a id=\""+obj.aiUrl+"\" href=\"#\" onclick=\"$.messager.alert('提示', '下载的文件不存在！', 'warning');\" class=\"xq_jsbgFile\" style=\"width: 120px; height: 30px;\">"+obj.aiFileName.substr(0,28)+"...</a>";
								}else{
									//文件名长度不超过10，原样显示
									html2 = "<a id=\""+obj.aiUrl+"\" href=\"#\" onclick=\"$.messager.alert('提示', '下载的文件不存在！', 'warning');\" class=\"xq_jsbgFile\" style=\"width: 120px; height: 30px;\">"+obj.aiFileName+"</a>";
								}
							}
							//项目报告附件显示
							if(obj.accessType==3){
								if(obj.aiFileName.length>30){
									//文件名长度超过10，后面部分省略
									html3 = "<a id=\""+obj.aiUrl+"\" href=\"#\" onclick=\"$.messager.alert('提示', '下载的文件不存在！', 'warning');\" class=\"xq_xmbgFile\" style=\"width: 120px; height: 30px;\">"+obj.aiFileName.substr(0,28)+"...</a>";
								}else{
									//文件名长度不超过10，原样显示
									html3 = "<a id=\""+obj.aiUrl+"\" href=\"#\" onclick=\"$.messager.alert('提示', '下载的文件不存在！', 'warning');\" class=\"xq_jsbgFile\" style=\"width: 120px; height: 30px;\">"+obj.aiFileName+"</a>";
								}
							}
						}
					}
				});
				
				$("#xq_zdbgFile").html(html1);
				$("#xq_jsbgFile").html(html2);
				$("#xq_xmbgFile").html(html3);
			});
		}
	});
	
	$('#xmxq').window('open');
}

/**
 * 判断是否为浮点类型
 * @param value
 * @returns
 */
function isFloat(value){
	var reg=/^((([0-9])|([1-9][0-9]+))(\.([0-9]+))?)$/;
//	return reg.test($.trim(value));
	if(reg.test($.trim(value))&&value!=0){
		return true;
	}else{
		return false;
	}
}
/**
 * 判断是否为汉字、字母或数字
 * @param value
 * @returns
 */
function isCharacter(value){
	var reg=/^([A-Za-z0-9]|[\u2E80-\u9FFF])*$/;
	return reg.test($.trim(value));
}

/**
 * 查询
 */
function bt_search(){
	//获取客户ID
	var consId = $.trim($("#consId").combobox("getValue"));
	if(consId!=null && consId.length>0 && isNaN(consId)){
		consId = '';
	};
	//获取项目名称
	var prjName = $("#prjName").textbox("getValue");
	
	//获取设备名称并判断
	var deviceName = null;
	//选中的设备节点
//	var selected = $('#deviceName').combotree('tree').tree('getSelected');
//	if(selected!=null){
//		//判断是否是节点
//		var isLeaf = $('#deviceName').tree('isLeaf',selected.target);
//		if(!isLeaf){
//			$.messager.alert('提示','请选择正确的设备！','info');    
//			return;
//		}else{
//			deviceName = selected.rootName;
//		}
//	}
	deviceName = $('#deviceName').textbox('getValue');
	
	//获取项目类型
	var prjType = $("#prjType").combobox("getValue");
	
	$('#data_grid').datagrid('load',{
		'pf.consId':consId,
		'pf.prjName':prjName,
//		'pf.deveiceType':deveiceType,
		'pf.deviceName':deviceName,
		'pf.prjType':prjType
	});
}

/**
 * 新增  弹出窗口并初始化
 */
function bt_add(){
	init();
	consComboboxSelectd = '';
	$('#a_consId').combobox({    
		url:webContextRoot +'destree/queryConsList.action',
		valueField: 'id',
		textField: 'text' ,
//	    onChange: function(newValue, oldValue){
//	    	if(isNaN(newValue)){
////					 newValue = $('#a_consId').combobox('getText');
////						$.getJSON(webContextRoot + 'destree/queryTree.action?isQyCode=false&ziMu='+newValue,{ 
////								},
////								function(json){
////									$('#a_consId').combobox('loadData',json);	
////								}
////										);
//	    	}else{
////	    		 newValue = $('#a_consId').combobox('getText');
////					$.getJSON(webContextRoot + 'destree/queryTree.action?isQyCode=false&ziMu=',{ 
////							},
////							function(json){
////								$('#a_consId').combobox('loadData',json);	
////							}
////					);
//					var qiteid = $('#a_consId').combobox('getValue');
//		    		if(!isNaN(qiteid)){
//					    	$('#a_deviceName').combotree({
//							    method:'get',
//							    multiple:false,//是否支持多选
//							    onBeforeLoad:function(node){//请求之前
//						    		if(node){//点击节点
//										treeNodeType = node.type;//获取节点类型
//										$('#a_deviceName').combotree('tree').tree('options').url=webContextRoot//点击触发
//										+'destree/queryYhbTree.action?treeState=closed&treeNodeType='+treeNodeType;//带参数地址个
//									}else{
//										$('#a_deviceName').combotree('tree').tree('options').url=webContextRoot //根据企业节点下一级
//										+'destree/queryYhbTree.action?treeState=closed&treeNodeType=1&id='+qiteid;//带参数地址
//									}
//								},
//					    	});
//		    		}	
//	    	}		
//		}
		mode : 'remote',
		onHidePanel : function(){$('#a_consId').combobox('reload');},
		onSelect : function(record){
			// 选择客户没变时，不需要再次加载联动控件
			if(consComboboxSelectd != record.id){
				consComboboxSelectd = record.id;
	    		if(!isNaN(record.id) && record.id!='' && record.id!= null){
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
							},
				    	});
	    		}
			}
		}
	});
	//客户ID初始化
	$('#a_consId').combobox('setValue','');
	//设备名称初始化
	$('#a_deviceName').combobox('setValue','');
	
	$('#xzsbxx').window('setTitle',"新增");
	$('#xzsbxx').window('open');
	//上传按键事件
	$(".bt_upload").show();
	$(".bt_upload").click(function(){
		last_bt_upload = $(this).attr("id");
		var id = $(this).attr("id").substr(0,4);
		$list = $("#"+id+"File"); //文件显示的ID位置
	});
	$btn = $("#bt_add_commit"); // 开始上传保存的按钮ID
	if(addUploaderLoaded){
		webUploader();
		addUploaderLoaded = false;
	}
	clearUploader();
}

/**
 * 修改  弹出窗口并初始化
 */
function bt_modify(){
	consComboboxSelectd = '';
	$('#xg_consId').combobox({    
		url:webContextRoot +'destree/queryConsList.action',
		valueField: 'id',
		textField: 'text' ,
//		onChange: function(newValue, oldValue){
//	    	consID =  newValue;
////	    	alert(consID);
//	    	if(consID==null || consID==''){
//	    		return;
//	    	}
////	   	     newValue = $('#userTree').combobox('getText');
//	    	//根据企业节点下一级
//			 $.getJSON(webContextRoot +'destree/queryYhbTree.action?treeState=open'
//					 +'&isAllTreeNode=true&treeNodeType=1&checkNodeList='+devIdArr+'&id='+consID,{},
//					function(json){
//						 $('#xg_deviceName').combotree({
////							multiple:true,
//							data:json,
//							onLoadSuccess:function(){
//								var node = $('#xg_deviceName').combotree('tree').tree('find',devIdArr);
//								if(node!=null){
//									$('#xg_deviceName').combotree('setValue',node.text);
//									$('#xg_deviceName').combotree('tree').tree('select',node.target);
//									//选中的设备节点
//									var selected = $('#xg_deviceName').combotree('tree').tree('getSelected');
//								}
//								devIdArr=null;//清空选中节点状态
//								consID = null;
//							}
//						 });
//					}
//				  );	
//		}
		mode : 'remote',
		onHidePanel : function(){$('#xg_consId').combobox('reload');},
		onSelect : function(record){
			// 选择客户没变时，不需要再次加载联动控件
			if(consComboboxSelectd != record.id){
				consComboboxSelectd = record.id;
				if (!isNaN(record.id) && record.id!='' && record.id!= null) {
			    	//根据企业节点下一级
					 $.getJSON(webContextRoot +'destree/queryYhbTree.action?treeState=open'
							 +'&isAllTreeNode=true&treeNodeType=1&checkNodeList='+devIdArr+'&id='+record.id,{},
							function(json){
								 $('#xg_deviceName').combotree({
	//								multiple:true,
									data:json,
									onLoadSuccess:function(){
										var node = $('#xg_deviceName').combotree('tree').tree('find',devIdArr);
										if(node!=null){
											$('#xg_deviceName').combotree('setValue',node.text);
											$('#xg_deviceName').combotree('tree').tree('select',node.target);
											//选中的设备节点
											var selected = $('#xg_deviceName').combotree('tree').tree('getSelected');
										}
										devIdArr=null;//清空选中节点状态
										consID = null;
									}
								 });
							}
						  );
				}
			}
		}
	});
	//获取选中行的对象
	var selections = $('#data_grid').datagrid('getSelections');
	if(selections.length!=1){
		$.messager.alert('提示','请选择一条记录进行修改!','info');   
	}else{
		var selected = selections[0];
		devIdArr = selected.deviceId;
		consID = selected.consId;
		
		//项目名称初始化
		$('#xg_prjName').textbox('setValue','');
		//项目类型初始化
		$('#xg_prjType').combobox({
			readonly:false,
			onChange: function(newValue, oldValue){
				if(newValue==1){
					$('#xg_ele').text('节能电量(kWh)：');
				}else if(newValue==2){
					$('#xg_ele').text('替代电量(kWh)：');
				}else{
					$('#xg_ele').text('节能(替代)电量(kWh)：');
				}
			}
		});
		$('#xg_prjType').combobox('setValue','1');
		if($('#xg_prjType').combobox('getValue')==1){
			$('#xg_ele').text('节能电量(kWh)：');
		}else if($('#xg_prjType').combobox('getValue')==2){
			$('#xg_ele').text('替代电量(kWh)：');
		}else{
			$('#xg_ele').text('节能(替代)电量(kWh)：');
		}
		//修改操作人初始化
		$('#xg_addUserId').val(userId);
		$('#xg_username').textbox('setValue',userName);
		//电量初始化
		$('#xg_eleNum').textbox('setValue','');
		//备注初始化
		$('#xg_memo').textbox('setValue','');
		
		onSelectXQ(null, selected);//查看详情 的窗口
		$('#xg_consId').combobox('select',consID); //选中客户
		
		$('#xgsbxx').window("setTitle","修改");
		$('#xgsbxx').window('open');
		isEdit = new Array();
		//上传按键事件
		$(".bt_upload").show();
		$(".bt_upload").click(function(){
			last_bt_upload = $(this).attr("id");
			var id = $(this).attr("id").substr(0,7);
			$list = $("#"+id+"File"); //文件显示的ID位置
		});
		$btn = $("#bt_update_commit"); // 开始上传保存的按钮ID
		if(editUploaderLoaded){
			webUploader();
			editUploaderLoaded = false;
		}
		clearUploader();
		$(".bt_upload").addClass('webuploader-element-invisible');

		
		//项目类型初始化
		$('#xg_prjType').combobox('setValue',selected.prjType);
		//电量初始化
		$('#xg_addDate').datebox('setValue',a_addDate);
		//备注初始化
		$('#xg_memo').textbox('setValue',selected.memo);
		//附件初始化
		$("#xg_zdbgFile").html("");
		$("#xg_jsbgFile").html("");
		$("#xg_xmbgFile").html("");
		
		
//		$("#xg_zdbgUpload").hide();
//		$("#xg_jsbgUpload").hide();
//		$("#xg_xmbgUpload").hide();
		//根据项目ID查询项目附件  并显示
		$.ajax({	
			url:webContextRoot+'projectFile/selectProjectAccessInfo.action', 
			data:{
				'paim.prjId': selected.id
			},
			dataType:'json',
			type:'post',
			success:function(result){
//				aiFileName  aiUrl	accessType	//P_CODE 70046 1诊断报告    2技术报告    3项目报告
				var html1 ='';
				var html2 ='';
				var html3 ='';
//				console.log(result);
				var noUpload = '<img class="del noUp" src="'+webContextRoot+'pages/despages/common/jquery-easyui-1.5.1/themes/icons/cancel.png"></img>';
				$.each(result,function(index,obj){

					//诊断报告附件显示
					if(obj.accessType==1){
						if(obj.aiFileName.length>30){
							//文件名长度超过10，后面部分省略
							$.ajax({
								async : false,
								url : webContextRoot + 'pCode/judgeFileExist.action',
								data : {downloadFilePath : obj.aiUrl},
								dataType : "json",
								success : function(data) {
									if(data.FLAG == "1"){
										html1 = '<a id="'+obj.aiUrl+'" href="'+webContextRoot+obj.aiUrl+'" target="_blank" class="zdbgFile"  style="width: 120px; height: 30px;" title="'+obj.aiFileName+'" download="'+obj.aiFileName+'" >'+obj.aiFileName.substr(0,28)+'...</a>';
									}else if(data.FLAG == "2"){
										html1 = "<a id=\""+obj.aiUrl+"\" href=\"#\" onclick=\"$.messager.alert('提示', '下载的文件不存在！', 'warning');\" class=\"zdbgFile\"  style=\"width: 120px; height: 30px;\">"+obj.aiFileName.substr(0,28)+"...</a>";
									}
								}
							});
						}else{
							//文件名长度不超过10，原样显示
							$.ajax({
								async : false,
								url : webContextRoot + 'pCode/judgeFileExist.action',
								data : {downloadFilePath : obj.aiUrl},
								dataType : "json",
								success : function(data) {
									if(data.FLAG == "1"){
										html1 = '<a id="'+obj.aiUrl+'" href="'+webContextRoot+obj.aiUrl+'" target="_blank" class="zdbgFile"  style="width: 120px; height: 30px;" title="'+obj.aiFileName+'" download="'+obj.aiFileName+'" >'+obj.aiFileName+'</a>';
									}else if(data.FLAG == "2"){
										html1 = "<a id=\""+obj.aiUrl+"\" href=\"#\" onclick=\"$.messager.alert('提示', '下载的文件不存在！', 'warning');\" class=\"zdbgFile\"  style=\"width: 120px; height: 30px;\">"+obj.aiFileName+"</a>";
									}
								}
							});
						}
						html1 += noUpload;
//						$("#xg_zdbgUpload").hide();
					}
					//技术报告附件显示
					else if(obj.accessType==2){
						if(obj.aiFileName.length>30){
							//文件名长度超过10，后面部分省略
							$.ajax({
								async : false,
								url : webContextRoot + 'pCode/judgeFileExist.action',
								data : {downloadFilePath : obj.aiUrl},
								dataType : "json",
								success : function(data) {
									if(data.FLAG == "1"){
										html2 = '<a id="'+obj.aiUrl+'" href="'+webContextRoot+obj.aiUrl+'" target="_blank" class="jsbgFile"  style="width: 120px; height: 30px;" title="'+obj.aiFileName+'" download="'+obj.aiFileName+'" >'+obj.aiFileName.substr(0,28)+'...</a>';
									}else if(data.FLAG == "2"){
										html2 = "<a id=\""+obj.aiUrl+"\" href=\"#\" onclick=\"$.messager.alert('提示', '下载的文件不存在！', 'warning');\" class=\"jsbgFile\"  style=\"width: 120px; height: 30px;\">"+obj.aiFileName.substr(0,28)+"...</a>";
									}
								}
							});
						}else{
							//文件名长度不超过10，原样显示
							$.ajax({
								async : false,
								url : webContextRoot + 'pCode/judgeFileExist.action',
								data : {downloadFilePath : obj.aiUrl},
								dataType : "json",
								success : function(data) {
									if(data.FLAG == "1"){
										html2 = '<a id="'+obj.aiUrl+'" href="'+webContextRoot+obj.aiUrl+'" target="_blank" class="jsbgFile"  style="width: 120px; height: 30px;" title="'+obj.aiFileName+'" download="'+obj.aiFileName+'" >'+obj.aiFileName+'</a>';
									}else if(data.FLAG == "2"){
										html2 = "<a id=\""+obj.aiUrl+"\" href=\"#\" onclick=\"$.messager.alert('提示', '下载的文件不存在！', 'warning');\" class=\"jsbgFile\"  style=\"width: 120px; height: 30px;\">"+obj.aiFileName+"</a>";
									}
								}
							});
						}
						html2 += noUpload;
//						$("#xg_jsbgUpload").hide();
					}
					//项目报告附件显示
					else if(obj.accessType==3){
						if(obj.aiFileName.length>30){
							//文件名长度超过10，后面部分省略
							$.ajax({
								async : false,
								url : webContextRoot + 'pCode/judgeFileExist.action',
								data : {downloadFilePath : obj.aiUrl},
								dataType : "json",
								success : function(data) {
									if(data.FLAG == "1"){
										html3 = '<a id="'+obj.aiUrl+'" href="'+webContextRoot+obj.aiUrl+'" target="_blank" class="xmbgFile"  style="width: 120px; height: 30px;" title="'+obj.aiFileName+'" download="'+obj.aiFileName+'" >'+obj.aiFileName.substr(0,28)+'...</a>';
									}else if(data.FLAG == "2"){
										html3 = "<a id=\""+obj.aiUrl+"\" href=\"#\" onclick=\"$.messager.alert('提示', '下载的文件不存在！', 'warning');\" class=\"xmbgFile\"  style=\"width: 120px; height: 30px;\">"+obj.aiFileName.substr(0,28)+"...</a>";
									}
								}
							});
						}else{
							//文件名长度不超过10，原样显示
							$.ajax({
								async : false,
								url : webContextRoot + 'pCode/judgeFileExist.action',
								data : {downloadFilePath : obj.aiUrl},
								dataType : "json",
								success : function(data) {
									if(data.FLAG == "1"){
										html3 = '<a id="'+obj.aiUrl+'" href="'+webContextRoot+obj.aiUrl+'" target="_blank" class="xmbgFile"  style="width: 120px; height: 30px;" title="'+obj.aiFileName+'" download="'+obj.aiFileName+'" >'+obj.aiFileName+'</a>';
									}else if(data.FLAG == "2"){
										html3 = "<a id=\""+obj.aiUrl+"\" href=\"#\" onclick=\"$.messager.alert('提示', '下载的文件不存在！', 'warning');\" class=\"xmbgFile\"  style=\"width: 120px; height: 30px;\">"+obj.aiFileName+"</a>";
									}
								}
							});
						}
						html3 += noUpload;
//						$("#xg_xmbgUpload").hide();
					}
				});
				$("#xg_zdbgFile").html(html1);
				$("#xg_jsbgFile").html(html2);
				$("#xg_xmbgFile").html(html3);
				if(html1=='') $("#xg_zdbgUpload").removeClass('webuploader-element-invisible');
				if(html2=='') $("#xg_jsbgUpload").removeClass('webuploader-element-invisible');
				if(html3=='') $("#xg_xmbgUpload").removeClass('webuploader-element-invisible');
				
				$(".del").click(function(){
					var id = $(this).parent().attr("id").substr(0,7);
					$(this).parent().html("");
					if(id=='xg_zdbg'){
						isEdit.push(1);
//						$("#xg_zdbgUpload").show();
						$("#xg_zdbgUpload").removeClass('webuploader-element-invisible');
					}else if(id=='xg_jsbg'){
						isEdit.push(2);
//						$("#xg_jsbgUpload").show();
						$("#xg_jsbgUpload").removeClass('webuploader-element-invisible');
					}else if(id=='xg_xmbg'){
						isEdit.push(3);
//						$("#xg_xmbgUpload").show();
						$("#xg_xmbgUpload").removeClass('webuploader-element-invisible');
					}
				});
			}
		});
	}
	 
}

/**
 * 删除
 */
function bt_delete(){
	//获取选中行对象
	var selections = $('#data_grid').datagrid('getSelections');
	if(selections.length!=1){
		$.messager.alert('提示','请选择一条记录进行删除!','info');    
	}else{
		$.messager.confirm('提示','您确认想要删除记录吗？',function(r){    
			//判断是否删除
		    if (r){    
		    	var selected = selections[0];
				$.ajax({	
					url:webContextRoot+'projectFile/deleteProject.action', 
					data:{
						'pf.id': selected.id
					},
					dataType:'json',
					type:'post',
					success:function(result){
						if(result.flag=='success'){
							$.messager.alert('提示','删除成功!','info');  
							//获取当前页行数
							var rows = $('#data_grid').datagrid("getRows").length;
							if(rows < 2){
								//最后一条记录则加载
								$('#data_grid').datagrid('load');
							}else{
								//不是最后一条记录则重载
								$('#data_grid').datagrid('reload');
							}
						}else{
							$.messager.alert('提示','删除失败!','info');  
						}
					}
				});   
		    }    
		});  
	}
}

/**
 * 新增 提交
 */
function bt_add_commit(){
	/**
	 * 获取文件  
	 * 
	 */
//	console.log("complete:",uploader.getFiles("complete"),"return:" ,uploadArray);
	
	var zdbgURL = "";	//诊断报告URL
	var jsbgURL = "";	//技术报告URL
	var xmbgURL = "";	//项目报告URL
	var zdbgFileName = "";	//诊断报告 名称
	var jsbgFileName = "";	//技术报告 名称
	var xmbgFileName = "";	//项目报告 名称
	for(var i in uploadArray){
		var id = uploadArray[i].id;
		var type = $("#"+id).parent().attr("id");
		if(type.indexOf("zdbg")>-1){
			zdbgURL = uploadArray[i].url;
			zdbgFileName = uploadArray[i].oldName;
			continue;
		}
		if(type.indexOf("jsbg")>-1){
			jsbgURL = uploadArray[i].url;
			jsbgFileName = uploadArray[i].oldName;
			continue;		
		}
		if(type.indexOf("xmbg")>-1){
			xmbgURL = uploadArray[i].url;
			xmbgFileName = uploadArray[i].oldName;
		}
	}
	//获取客户ID并验证
	var consId = $("#a_consId").val();
	//获取项目名称并验证
	var prjName = $("#a_prjName").textbox("getValue");
	//获取项目类型并验证
	var prjType = $("#a_prjType").val();
	//获取采用技术并验证
	var useTea = $("#a_useTea").val();
	//获取添加操作人
	var addUserId = $("#a_addUserId").val();
	//获取填报日期
	var addDate = $("#a_addDate").val();
	//获取完成日期
	var finishDate = $("#a_finishDate").val();
	//获取电量并验证
	var eleNum = $("#a_eleNum").val();
	
	//选中的设备节点
	var selected = $('#a_deviceName').combotree('tree').tree('getSelected');
	//判断是否是节点
	var isLeaf = $('#a_deviceName').tree('isLeaf',selected.target);
	//设备类型  parentId: "101000004002_31_01"
	var deveiceType = selected.type;
	//设备ID   rootId: "101000004006"
	var deviceId = selected.rootId;
	//设备名称  rootName: "T2配变！@##￥￥%……&*（‘'"
	var deviceName = selected.rootName;
	
	//获取备注并验证
	var memo = $('#a_memo').textbox('getValue');
	
	$.ajax({	
		url:webContextRoot+'projectFile/addProject.action', 
		data:{
			'pf.consId': consId,
			'pf.prjName':prjName,
			'pf.deveiceType' : deveiceType,
			'pf.deviceId' : deviceId,
			'pf.deviceName' : deviceName,
			'pf.prjType' : prjType,
			'pf.useTea' : useTea,
			'pf.addUserId' : addUserId,
			'pf.addDate' : addDate,
			'pf.finishDate' : finishDate,
			'pf.eleNum' : eleNum,
			'pf.memo' : memo,
			'pf.zdbgURL' : zdbgURL,
			'pf.jsbgURL' : jsbgURL,
			'pf.xmbgURL' : xmbgURL,
			'pf.zdbgFileName' : zdbgFileName,
			'pf.jsbgFileName' : jsbgFileName,
			'pf.xmbgFileName' : xmbgFileName
		},
		dataType:'json',
		type:'post',
		success:function(result){
			if(result.flag=='success'){
				$.messager.alert('提示','添加成功!','info');  
				clearUploader();
				$('#xzsbxx').window('close');
				$('#data_grid').datagrid('reload');
			}else{
				$.messager.alert('提示','添加失败!','info');  
			}
		}
	});
}

/**
 * 新增——取消
 */
function bt_add_cancel(){
	$('#xzsbxx').window('close');
}

/**
 * 修改更新-提交
 */
function bt_update_commit(){
	var tid = $('#xg_id').val();
	//获取项目类型并验证
	var prjType = $("#xg_prjType").val();
	//获取采用技术并验证
	var useTea = $("#xg_useTea").val();
	//获取修改操作人并验证
	var addUserId = $("#xg_addUserId").val();
	//获取填报日期
	var addDate = $("#xg_addDate").val();
	//获取完成日期
	var finishDate = $("#xg_finishDate").val();
	//获取电量并验证
	var eleNum = $("#xg_eleNum").val();
	//获取客户ID并验证
	var consId = $("#xg_consId").val();
	//获取项目名称并验证
	var prjName = $("#xg_prjName").textbox("getValue");
	
	//选中的设备节点
	var selected = $('#xg_deviceName').combotree('tree').tree('getSelected');
	//判断是否是节点
	var isLeaf = $('#xg_deviceName').tree('isLeaf',selected.target);
	//设备类型  parentId: "101000004002_31_01"
	var deveiceType = selected.type;
	//设备ID   rootId: "101000004006"
	var deviceId = selected.rootId;
	//设备名称  rootName: "T2配变！@##￥￥%……&*（‘'"
	var deviceName = selected.rootName;
	
	/**
	 * 获取文件的ID
	 */
	var zdbgURL = "";	//诊断报告URL
	var jsbgURL = "";	//技术报告URL
	var xmbgURL = "";	//项目报告URL
	var zdbgFileName = "";	//诊断报告 名称
	var jsbgFileName = "";	//技术报告 名称
	var xmbgFileName = "";	//项目报告 名称
	for(var i in uploadArray){
		var id = uploadArray[i].id;
		var type = $("#"+id).parent().attr("id");
		if(type.indexOf("zdbg")>-1){
			zdbgURL = uploadArray[i].url;
			zdbgFileName = uploadArray[i].oldName;
			continue;
		}
		if(type.indexOf("jsbg")>-1){
			jsbgURL = uploadArray[i].url;
			jsbgFileName = uploadArray[i].oldName;
			continue;		
		}
		if(type.indexOf("xmbg")>-1){
			xmbgURL = uploadArray[i].url;
			xmbgFileName = uploadArray[i].oldName;
		}
	}
	
	var memo = $('#xg_memo').textbox('getValue');
//	alert(id+prjType+useTea+addUserId+addDate+finishDate+eleNum);
	$.ajax({	
		url:webContextRoot+'projectFile/updateProject.action', 
		data:{
			'pf.id': tid,
			'pf.consId' : consId,
			'pf.prjName' : prjName,
	        'pf.deveiceType' : deveiceType,
	        'pf.deviceId' : deviceId,
	        'pf.deviceName' : deviceName,
			'pf.prjType' : prjType,
			'pf.useTea' : useTea,
			'pf.addUserId' : addUserId,
			'pf.addDate' : addDate,
			'pf.finishDate' : finishDate,
			'pf.eleNum' : eleNum,
			'pf.memo' : memo,
			'pf.zdbgURL' : zdbgURL,
			'pf.jsbgURL' : jsbgURL,
			'pf.xmbgURL' : xmbgURL,
			'pf.zdbgFileName' : zdbgFileName,
			'pf.jsbgFileName' : jsbgFileName,
			'pf.xmbgFileName' : xmbgFileName,
			'pf.isEdit' : isEdit.join(",")
		},
		dataType:'json',
		type:'post',
		success:function(result){
			if(result.flag=='success'){
				$.messager.alert('提示','修改成功!','info');  
				$('#xgsbxx').window('close');
				$('#data_grid').datagrid('reload');
			}else{
				$.messager.alert('提示','修改失败!','info');  
			}
		}
	});
}

/**
 * 修改更新——取消
 */
function bt_update_cancel(){
	$('#xgsbxx').window('close');
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
//		console.log(file);

		// $list为容器jQuery实例
		$list.append($li);
		
		$("#"+last_bt_upload).hide();
		
		
		// 创建缩略图
		// 如果为非图片文件，可以不用调用此方法。
		// thumbnailWidth x thumbnailHeight 为 100 x 100
		uploader.makeThumb(file, function(error, src) { // webuploader方法
//			if (error) {
				if(file.name.length>30){
					//文件名长度超过10，后面部分省略
					$img.replaceWith('<a id="file'+file.id+'" title="'+file.name+'" >'+file.name.substr(0,28)+'...</a>');
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
				});
//				console.log(file);
				return;
//			}

//			$("#" + file.id).append('<span id="delete' + file.id + '" class="deleteIcon">▬</span>');
//			$img.attr('src', src);
//			$img.attr('width', thumbnailWidth+"px");
//			$img.attr('height', thumbnailHeight+"px");
			
			//删除事件
//			$(".deleteIcon").click(function(){
//					var file_id = $(this).attr("id").substr(6);
//					//删除上传队列
//				    uploader.removeFile(file_id);
//				    //删除页面显示
//				    $("#"+file_id).remove();
//					$(filePicker).show();
//			});
		},1,1);
	});
	
	//当validate不通过时，调用的方法
	uploader.on('error', function(type) {
//		console.log(type);
		if(type=='Q_TYPE_DENIED'){
			$.messager.alert('提示','请选择正确的文件类型!','info');  
		}else if(type=='F_EXCEED_SIZE'){
			$.messager.alert('提示','您选择的文件大小应小于20M!','info');  
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
//		$(filePicker).show();
		//业务上的新增修改功能方法
		//前台数据提交
		if(!$("#xzsbxx").parent().is(":hidden")){
			//新增提交
//			console.log(uploadArray);
			bt_add_commit();
		}else if(!$("#xgsbxx").parent().is(":hidden")){
			//修改提交
			bt_update_commit();
		}
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
//		console.log("上传...");
		//前台数据验证  判断当前打开的是新增窗口还是修改窗口
		if(!$("#xzsbxx").parent().is(":hidden")){
			//新增验证
			if(add_validation()){
				uploader.upload();
			}
		}else if(!$("#xgsbxx").parent().is(":hidden")){
			//修改验证
			if(update_validation()){
				uploader.upload();
			}
		}
//		console.log("上传成功");
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

/**
 * 新增-验证
 * @returns {Boolean}
 */
function add_validation(){
	//获取客户ID并验证
	var consId = $("#a_consId").val();
	if(consId.length==0){
		$.messager.alert('提示','客户名称不能为空!','info');    
		return false;
	}
	//获取项目名称并验证
	var prjName = $("#a_prjName").textbox("getValue");
	if(prjName.length==0){
		$.messager.alert('提示','项目名称不能为空!','info');    
		return false;
	}
	if(prjName.length>20){
		$.messager.alert('提示','项目名称长度需小于20个字!','info');    
		return false;
	}
	//获取采用技术并验证
	var useTea = $("#a_useTea").val();
	//获取电量并验证
	var eleNum = $("#a_eleNum").val();
	
	//选中的设备节点
	var selected = $('#a_deviceName').combotree('tree').tree('getSelected');
	if(selected==null){
		$.messager.alert('提示','设备名称不能为空!','info');    
		return false;
	}
	//判断是否是节点
	var isLeaf = $('#a_deviceName').tree('isLeaf',selected.target);
	if(!isLeaf){
		$.messager.alert('提示','请选择正确的设备！','info');    
		return false;
	}
	//设备ID   rootId: "101000004006"
	var deviceId = selected.rootId;
	if(deviceId.length>12){
		$.messager.alert('提示','请选择正确的设备！','info');    
		return false;
	}
	
	if(useTea.length==0){
		$.messager.alert('提示','采用技术不能为空!','info');    
		return false;
	}
	if(eleNum.length==0){
		$.messager.alert('提示','节能(替代)电量不能为空!','info');    
		return false;
	}
	if(useTea.length>20){
		$.messager.alert('提示','采用技术长度需小于20个字!','info');    
		return false;
	}
	if(eleNum.length>10){
		$.messager.alert('提示','节能(替代)电量长度需小于10个字!','info');    
		return false;
	}
	if(!isFloat(eleNum)){
		$.messager.alert('提示','节能(替代)电量必须是正数!','info');    
		return false;
	}
	//获取备注并验证
	var memo = $('#a_memo').textbox('getValue');
	if(memo.length>200){
		$.messager.alert('提示','备注长度需小于200个字!','info');
		return false;
	}
	return true;
}

/**
 * 更新-验证
 * @returns {Boolean}
 */
function update_validation(){
	//获取电量并验证
	var eleNum = $("#xg_eleNum").val();
	//获取采用技术并验证
	var useTea = $("#xg_useTea").val();
	//获取客户ID并验证
	var consId = $("#xg_consId").val();
	if(consId.length==0){
		$.messager.alert('提示','客户名称不能为空!','info');    
		return false;
	}
	//获取项目名称并验证
	var prjName = $("#xg_prjName").textbox("getValue");
	if(prjName.length==0){
		$.messager.alert('提示','项目名称不能为空!','info');    
		return false;
	}
	
	//选中的设备节点
//	console.log($('#xg_deviceName').combotree('tree'),$('#xg_deviceName').combotree('tree').tree('getSelected'));
	var selected = $('#xg_deviceName').combotree('tree').tree('getSelected');
	if(selected==null){
		$.messager.alert('提示','设备名称不能为空!','info');    
		return false;
	}
	//判断是否是节点
	var isLeaf = $('#xg_deviceName').tree('isLeaf',selected.target);
	if(!isLeaf){
		$.messager.alert('提示','请选择正确的设备！','info');    
		return false;
	}
	//设备ID   rootId: "101000004006"
	var deviceId = selected.rootId;
	if(deviceId.length>12){
		$.messager.alert('提示','请选择正确的设备！','info');    
		return false;
	}
	
	if(useTea.length==0){
		$.messager.alert('提示','采用技术不能为空!','info');    
		return false;
	}
	if(eleNum.length==0){
		$.messager.alert('提示','节能(替代)电量不能为空!','info');    
		return false;
	}
	if(useTea.length>20){
		$.messager.alert('提示','采用技术长度需小于20个字!','info');    
		return false;
	}
	if(eleNum.length>10){
		$.messager.alert('提示','节能(替代)电量长度需小于10个字!','info');    
		return false;
	}
	if(!isFloat(eleNum)){
		$.messager.alert('提示','节能(替代)电量必须是正数!','info');    
		return false;
	}
	var memo = $('#xg_memo').textbox('getValue');
	if(memo.length>200){
		$.messager.alert('提示','备注长度需小于200个字!','info');
		return false;
	}
	return true;
}