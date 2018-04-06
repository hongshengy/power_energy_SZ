/**
 * 派发工单
 * by 吴哲
 * 
 */
var endDate = new Date();//当前结束时间  为当前时间
var devName=null;
var yhbName = null;//用户变名称
var defectId;//缺陷id
var sbId;//设备id
var yhbId;//用户变id
var devSort;//设备种类
var deceviceType;//非电器设备

var $list = $("#zztb_img"); //文件显示的ID位置
var $btn = $("#sendWorknote"); // 开始上传保存的按钮ID
var filePicker = '#butA'; //添加文件的按键ID
var thumbnailWidth = 60; // 缩略图高度和宽度
// （单位是像素），当宽高度是0~1的时候，是按照百分比计算，具体可以看api文档
var thumbnailHeight = 60;
var thumbnailNumber = 4;
var uploader = null; //上传组件对象
var uploadArray = new Array();//存放上传文件
var consComboboxSelectd = '';
var consComboboxSelectd1 = '';

$(function(){
//	$('#butA').hide();
	//选择大用户树
	
	$('#userTree').combobox({
		url:webContextRoot +'destree/queryConsList.action',
		valueField: 'id',
		textField: 'text' ,
		onLoadSuccess : function(){
			if(consId != ''){
//				setTimeout(function(){//延迟加载企业
					$('#userTree').combobox('setValue',consId);
					$('#userTree').combobox('disable');
//				},200);
			}
		},
		mode : 'remote',
		onHidePanel : function(){$('#userTree').combobox('reload');},
		onSelect : function(record){
			// 选择客户没变时，不需要再次加载联动控件
			if(consComboboxSelectd != record.id){
				consComboboxSelectd = record.id;
			    $('#usershebeiTree').combotree({
				    method:'get',
				    multiple:false,//是否支持多选
					    onBeforeLoad:function(node){//请求之前
					    	var treeNodeType;

					    	if((consId != 'null' && consId != '') && (devId != 'null' && devId != '')){
					    		$.getJSON(webContextRoot + 'worknoteSend/selectshebei.action',{   
					    			'labourListModel.devSort' : deviceType,
					    			'labourListModel.devId' : devId,
					    			'labourListModel.userTranId' : userTranId
					    		},
					    		function(json){
					    			if(json.length != 0){
					    				$('#usershebeiTree').combotree('loadData', [{
						    				id: json[0].devId,
						    				text: json[0].devName
						    			}]);
						    			devName = json[0].devName;
						    			yhbName = json[0].uTName;
						    		//	$('#usershebeiTree').combotree('setValue', devId);
						    			$('#usershebeiTree').combobox('disable');
					    			}
					    		}
					    		);
					    	}else{
					    		if(node){//点击节点
									treeNodeType = node.type;//获取节点类型
									if(node.rootId.split('_').length >= 3){
										deceviceType = node.rootId.split('_')[2];//获取非电气设备
									}
									$('#usershebeiTree').combotree('tree').tree('options').url=webContextRoot//点击触发
									+'destree/queryYhbTree.action?treeState=closed&treeNodeType='+treeNodeType;//带参数地址个
								}else{
									$('#usershebeiTree').combotree('tree').tree('options').url=webContextRoot //根据企业节点下一级
									+'destree/queryYhbTree.action?treeState=closed&treeNodeType=1&id='+record.id;//带参数地址
								}
					    	}	
						},
						onBeforeSelect:function(node){
							if(node.id.length>12){
								return false;
							}
						}
			    	});
			}   
		}
	});
	
	//当前登录用户名
	$('#yhuser').text(UserName); 
	$('#qxyhuser').text(UserName); 
	$('#zztb_yhuser').text(UserName); 
	//发生时间
	$("#date").datetimebox('setValue',DateUtil.dateToStr('yyyy-MM-dd HH:mm:ss',endDate));
	//派发紧急处理人
	$.getJSON(webContextRoot + 'worknoteSend/selectQiangXiu.action',{ 'labourListModel.wnId':'1'  
			},
			function(json){
				qiangxiuxiala(json);
			}
		);
	$('#jinjichengdu').combobox({//紧急程度
		url:webContextRoot +'pCode/queryCode.action?codeSortId=70001',
		valueField: 'codeValue',
		textField: 'codeName'   ,
		onLoadSuccess:function(data){
//			console.log(data);
			if(data.length>0){
				if(data[0].codeName=='请选择'){
					data.splice(0,1);
					$('#jinjichengdu').combobox('loadData',data);
				}
			}
		}
	});
	
	$('#defectSource').combobox({//缺陷来源
		valueField:'value',    
	    textField:'label',   
		data: [{
			label: '移动作业上报',
			value: '1'
		},{
			label: '服务中心上报',
			value: '2'
		}],
		onSelect: function(newValue){
			if(newValue.value==1){
				$('#sjsb_defectDiv').show();
				$('#zztb_defectDiv').hide();
			}else if(newValue.value==2){
				$('#sjsb_defectDiv').hide();
				$('#zztb_defectDiv').show();
				//加载上传组件
				webuploader();
			}
		}
	});
	
	
//	$('#consId').combobox({//缺陷的企业
//		url:webContextRoot +'destree/queryTree.action?isQyCode=false&ziMu=',
//		valueField: 'id',
//		textField: 'text'
//	});
//	
//	$('#source').combobox({//缺陷发现来源
//		url:webContextRoot +'pCode/queryCode.action?codeSortId=70053',
//		valueField: 'codeValue',
//		textField: 'codeName'   
//	});
//	
//	$('#severity').combobox({//缺陷性质
//		url:webContextRoot +'pCode/queryCode.action?codeSortId=70055',
//		valueField: 'codeValue',
//		textField: 'codeName'   
//	});
//	
//	$('#founder').combobox({//发现人
//		url:webContextRoot +'worknoteSend/selectQiangXiu.action',
//		valueField:'chargrPersid',
//		textField:'chargrPers'
//	});
	
	$('#defectJj').combobox({//缺陷紧急程度
		url:webContextRoot +'pCode/queryCode.action?codeSortId=70001',
		valueField: 'codeValue',
		textField: 'codeName'  ,
		onLoadSuccess:function(data){
//			console.log(data);
			if(data.length>0){
				if(data[0].codeName=='请选择'){
					data.splice(0,1);
					$('#defectJj').combobox('loadData',data);
				}
			}
		}
	});
	
	$('#defectMan').combobox({//缺陷负责人
		url:webContextRoot +'worknoteSend/selectQiangXiu.action?labourListModel.wnId=1',
		iconCls:'icon-help',
		valueField:'chargrPersid',
		textField:'chargrPers'
	});
	$($('#defectMan').next().find(".icon-help")).tooltip({
		position: 'right',    
		content: '<span style="color:#fff">抢修负责人来源于部门编码为qxz的用户</span>',    
		onShow: function(){        
			$(this).tooltip('tip').css({            
				backgroundColor: '#666',
				borderColor: '#666'        
			});    
		}
	});
	
	$('#defect').combobox({//缺陷
		url:webContextRoot + 'worknoteSend/queryDefect.action',
		valueField: 'defectId',
		textField: 'defect',
		onSelect: function(data){
//			console.log(data);
//			console.log(getDevType(data));
			
			//赋值
			$('#consId').text(data.consName);
			$('#defectSb').text(data.devName);
			$('#foundTime').text(data.foundTime);
			$('#source').text(data.source);
			$('#founder').text(data.founder);
			$('#severity').text(data.severity);
			$('#defectContent').text(data.defectContent);
			
			defectId = data.defectId;
//			sbId = data.devId;
//			devName = data.devName;
//			devSort = data.devSort;
//			yhbId = data.userTranId;
//			yhbName = data.uTName;
//			
//			$('#consId').combobox('setValue',data.consId);//企业
//			$('#foundTime').datetimebox('setValue',data.foundTime);//发现时间
//			$('#founder').combobox('setValue',data.founder);//发现人
//			$('#source').combobox('setValue',data.source);//发现来源
//			$('#severity').combobox('setValue',data.severity);//缺陷性质
//			$('#defectContent').textbox('setValue',data.defectContent);//缺陷内容
			//缺陷设备
//			$.getJSON(webContextRoot + 'worknoteSend/selectshebei.action',{   
//    			'labourListModel.devSort' : data.devSort,
//    			'labourListModel.devId' : data.devId,
//    			'labourListModel.userTranId' : data.userTranId
//    		},
//    		function(json){
//    			$('#defectSb').combotree('loadData', [{
//    				id: json[0].devId,
//    				text: json[0].devName
//    			}]);
//    		}
//    		);
			//照片清空
			$('#imageA_logo').attr("src",null);
			$('#hrefA').attr("href",null);
			$('#hrefA').attr("data-lightbox","");
			$('#logoA').attr("value",null);
			$('#imageA_logo').hide();
			$('#logo_butA').hide();
			
			$('#imageB_logo').attr("src",null);
			$('#hrefB').attr("href",null);
			$('#hrefB').attr("data-lightbox","");
			$('#logoB').attr("value",null);
			$('#imageB_logo').hide();
			$('#logo_butB').hide();
			
			$('#imageC_logo').attr("src",null);
			$('#hrefC').attr("href",null);
			$('#hrefC').attr("data-lightbox","");
			$('#logoC').attr("value",null);
			$('#imageC_logo').hide();
			$('#logo_butC').hide();
			
    	   //是否有图片回显
  		   var arr = data.photo.split(',');
  		   
  		//判断是否有图片
  		   if($.trim(arr[0])!=""){
  			   	$('#imageA_logo').show();
  	    		$('#hrefA').show();
  	    		$.ajax({
  	    			async : false,
  	    			url : webContextRoot + 'pCode/judgeFileExist.action',
  	    			data : {downloadFilePath : $.trim(arr[0])},
  	    			dataType : "json",
  	    			success : function(data) {
  	    				if(data.FLAG == "1"){
  	    					$('#imageA_logo').attr("src",$.trim(arr[0])==""?null:webContextRoot+$.trim(arr[0]));
  	    					$('#hrefA').attr("href",$.trim(arr[0])==""?"":webContextRoot+$.trim(arr[0]));
  	    					$('#hrefA').attr("data-lightbox","example-set");
  	    					$('#hrefA').removeAttr("onclick");
  	    				}else if(data.FLAG == "2"){
  	    					$('#imageA_logo').attr("src",webContextRoot+"/pages/despages/common/images/imageNotFound.png");
  	    					$('#hrefA').attr("href", "#");
  	    					$('#hrefA').attr("onclick", "$.messager.alert('提示', '图片不存在！', 'warning');");
  	    					$('#hrefA').removeAttr("data-lightbox");
  	    				}
  	    			}
  	    		});
  		   }
  		   
  		 //判断是否有图片
  		   if($.trim(arr[1])!=""){
  			   	$('#imageB_logo').show();
  	    		$('#hrefB').show();
  	    		$.ajax({
  	    			async : false,
  	    			url : webContextRoot + 'pCode/judgeFileExist.action',
  	    			data : {downloadFilePath : $.trim(arr[1])},
  	    			dataType : "json",
  	    			success : function(data) {
  	    				if(data.FLAG == "1"){
  	    					$('#imageB_logo').attr("src",$.trim(arr[1])==""?null:webContextRoot+$.trim(arr[1]));
  	    					$('#hrefB').attr("href",$.trim(arr[1])==""?"":webContextRoot+$.trim(arr[1]));
  	    					$('#hrefB').attr("data-lightbox","example-set");
  	    					$('#hrefB').removeAttr("onclick");
  	    				}else if(data.FLAG == "2"){
  	    					$('#imageB_logo').attr("src",webContextRoot+"/pages/despages/common/images/imageNotFound.png");
  	    					$('#hrefB').attr("href", "#");
  	    					$('#hrefB').attr("onclick", "$.messager.alert('提示', '图片不存在！', 'warning');");
  	    					$('#hrefB').removeAttr("data-lightbox");
  	    				}
  	    			}
  	    		});
  		   }
  		   
  		//判断是否有图片
  		   if($.trim(arr[2])!=""){
  			   	$('#imageC_logo').show();
  	    		$('#hrefC').show();
  	    		$.ajax({
  	    			async : false,
  	    			url : webContextRoot + 'pCode/judgeFileExist.action',
  	    			data : {downloadFilePath : $.trim(arr[2])},
  	    			dataType : "json",
  	    			success : function(data) {
  	    				if(data.FLAG == "1"){
  	    					$('#imageC_logo').attr("src",$.trim(arr[2])==""?null:webContextRoot+$.trim(arr[2]));
  	    					$('#hrefC').attr("href",$.trim(arr[2])==""?"":webContextRoot+$.trim(arr[2]));
  	    					$('#hrefC').attr("data-lightbox","example-set");
  	    					$('#hrefC').removeAttr("onclick");
  	    				}else if(data.FLAG == "2"){
  	    					$('#imageC_logo').attr("src",webContextRoot+"/pages/despages/common/images/imageNotFound.png");
  	    					$('#hrefC').attr("href", "#");
  	    					$('#hrefC').attr("onclick", "$.messager.alert('提示', '图片不存在！', 'warning');");
  	    					$('#hrefC').removeAttr("data-lightbox");
  	    				}
  	    			}
  	    		});
  		   }
		},
//		onChange: function(newValue, oldValue){
//	    	if(newValue != ''){
//	    		newValue = $('#defect').combobox('getText');
//				$.getJSON(webContextRoot + 'worknoteSend/queryDefect.action',{
//					'labourListModel.defect' : newValue,
//				},
//					function(json){
//						$('#defect').combobox('loadData',json);	
//					}
//				);
//	    	}else{
//				$.getJSON(webContextRoot + 'worknoteSend/queryDefect.action',{
//					'labourListModel.defect' : newValue,
//				},
//					function(json){
//						$('#defect').combobox('loadData',json);	
//					}
//				);
//	    	}
//		}
	});
	
//	if(consId != ''){
//		setTimeout(function(){//延迟加载企业
//			$('#userTree').combobox('setValue',consId);
//			$('#userTree').combobox('disable');
//		},200);
//	}
	
//*************************************缺陷工单**主站填报**初始化**开始****************************************************
	//选择大用户树
	$('#zztb_consId').combobox({
		url:webContextRoot +'destree/queryConsList.action',
		valueField: 'id',
		textField: 'text' ,
    	mode : 'remote',
    	onHidePanel : function(){$('#zztb_consId').combobox('reload');},
    	onSelect : function(record){
    		// 选择客户没变时，不需要再次加载联动控件
			if(consComboboxSelectd1 != record.id){
				consComboboxSelectd1 = record.id;
        		if(!isNaN(record.id)){
        			$('#zztb_defectSb').combotree({
    				    method:'get',
    				    multiple:false,//是否支持多选
    				    onBeforeLoad:function(node){//请求之前
    			    		if(node){//点击节点
    							treeNodeType = node.type;//获取节点类型
    							$('#zztb_defectSb').combotree('tree').tree('options').url=webContextRoot//点击触发
    							+'destree/queryYhbTree.action?treeState=closed&treeNodeType='+treeNodeType;//带参数地址个
    						}else{
    							$('#zztb_defectSb').combotree('tree').tree('options').url=webContextRoot //根据企业节点下一级
    							+'destree/queryYhbTree.action?treeState=closed&treeNodeType=1&id='+record.id;//带参数地址
    						}
    					}
    		    	});
        		}
			}
    	}
	});
	
	$("#zztb_foundTime").datetimebox("setValue",DateUtil.dateToStr('yyyy-MM-dd HH:mm:ss',endDate));
	
	$("#zztb_source").combobox({//缺陷发现来源
		url:webContextRoot +'pCode/queryCode.action?codeSortId=70053',
		valueField: 'codeValue',
		textField: 'codeName'  ,
		onLoadSuccess:function(data){
//			console.log(data);
			if(data.length>0){
				if(data[0].codeName=='请选择'){
					data.splice(0,1);
					$(this).combobox('loadData',data);
				}
			}
		}  
	});
	
	$('#zztb_severity').combobox({//缺陷性质
		url:webContextRoot +'pCode/queryCode.action?codeSortId=70055',
		valueField: 'codeValue',
		textField: 'codeName'  ,
		onLoadSuccess:function(data){
//			console.log(data);
			if(data.length>0){
				if(data[0].codeName=='请选择'){
					data.splice(0,1);
					$(this).combobox('loadData',data);
				}
			}
		}  
	});
	
	$('#zztb_founder').combobox({//发现人
		url:webContextRoot +'worknoteSend/selectQiangXiu.action',
		valueField:'chargrPersid',
		textField:'chargrPers'
	});
	
	$('#zztb_defectJj').combobox({//缺陷紧急程度
		url:webContextRoot +'pCode/queryCode.action?codeSortId=70001',
		valueField: 'codeValue',
		textField: 'codeName'  ,
		onLoadSuccess:function(data){
//			console.log(data);
			if(data.length>0){
				if(data[0].codeName=='请选择'){
					data.splice(0,1);
					$(this).combobox('loadData',data);
				}
			}
		}
	});
	
	$('#zztb_defectMan').combobox({//缺陷负责人
		url:webContextRoot +'worknoteSend/selectQiangXiu.action?labourListModel.wnId=1',
		iconCls:'icon-help',
		valueField:'chargrPersid',
		textField:'chargrPers'
	});
	$($('#zztb_defectMan').next().find(".icon-help")).tooltip({
		position: 'right',    
		content: '<span style="color:#fff">缺陷负责人来源于部门编码为qxz的用户</span>',    
		onShow: function(){        
			$(this).tooltip('tip').css({            
				backgroundColor: '#666',
				borderColor: '#666'        
			});    
		}
	});
//*************************************缺陷工单**主站填报**初始化**结束****************************************************
	
	//切换工单类型
	checkValue('1');
	$('#defectSource').combobox("setValue","1");
//	
//	if(widthFlag == 'null'){
////		$('#qxDiv').removeClass("width_two").addClass("width_one");
//		$('#qxDiv').css('width','100%');
//		
//	}else if(widthFlag == '1'){
//		$('#qxDiv').removeClass("width_one").addClass("width_two");
//	}
//	$('#qxDiv').width(100);
//	
//	//图片一键上传
//	$('#butA').upload({
//		name:'uploadImage',
//		action:webContextRoot +'gdgl/uploadImage.action',
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
//				if($("#imageA_logo").attr("src")==null){
//					$('#imageA_logo').show();
//					$('#imageA_logo').attr("src",webContextRoot+obj.urlImage);//小图片A
//					$('#hrefA').attr("href",webContextRoot+obj.urlImage);//大图片A
//					$('#hrefA').attr("data-lightbox","example-set");//大图片A
//					$('#logoA').attr("value",obj.urlImage);
//					$('#logo_butA').show();
//				}else if($("#imageB_logo").attr("src")==null){
//					$('#imageB_logo').show();
//					$('#imageB_logo').attr("src",webContextRoot+obj.urlImage);//小图片B
//					$('#hrefB').attr("href",webContextRoot+obj.urlImage);//大图片B
//					$('#hrefB').attr("data-lightbox","example-set");//大图片B
//					$('#logoB').attr("value",obj.urlImage);
//					$('#logo_butB').show();
//				}else if($("#imageC_logo").attr("src")==null){
//					$('#imageC_logo').show();
//					$('#imageC_logo').attr("src",webContextRoot+obj.urlImage);//小图片C
//					$('#hrefC').attr("href",webContextRoot+obj.urlImage);//大图片C
//					$('#hrefC').attr("data-lightbox","example-set");//大图片C
//					$('#logoC').attr("value",obj.urlImage);
//					$('#logo_butC').show();
//				}
//			}else{
//				$.messager.alert('提示', "上传失败！", 'warning');
//				return;
//			}
//			
//		}
//	});
//	
//	//图片A删除
//	$('#logo_butA').bind('click', function(event){
//		$('#imageA_logo').attr("src",null);
//		$('#hrefA').attr("href",null);
//		$('#hrefA').attr("data-lightbox","");
//		$('#logoA').attr("value",null);
//		$('#imageA_logo').hide();
//		$('#logo_butA').hide();
//        return false;
//    });
//	//图片B删除
//	$('#logo_butB').bind('click', function(event){
//		$('#imageB_logo').attr("src",null);
//		$('#hrefB').attr("href",null);
//		$('#hrefB').attr("data-lightbox","");
//		$('#logoB').attr("value",null);
//		$('#imageB_logo').hide();
//		$('#logo_butB').hide();
//        return false;
//    });
//	//图片C删除
//	$('#logo_butC').bind('click', function(event){
//		$('#imageC_logo').attr("src",null);
//		$('#hrefC').attr("href",null);
//		$('#hrefC').attr("data-lightbox","");
//		$('#logoC').attr("value",null);
//		$('#imageC_logo').hide();
//		$('#logo_butC').hide();
//        return false;
//    });
	
});

//标题展示状态 可能会用到
/*function biaoti(){
	if(taitou == 'null' || taitou ==''){//为空默认
		$('#qiangxiugd').linkbutton('select');
	}else if(taitou ==1){
		$("#gzp").linkbutton('select');
		$('#xunjiangd').linkbutton('disable');
		$('#quexianxgd').linkbutton('disable');
		$('#tingdiangd').linkbutton('disable');
		$('#qiangxiugd').linkbutton('disable');
	}else if(taitou ==2){
		$("#gzp").linkbutton('disable');
		$('#xunjiangd').linkbutton('select');
		$('#quexianxgd').linkbutton('disable');
		$('#tingdiangd').linkbutton('disable');
		$('#qiangxiugd').linkbutton('disable');
	}else if(taitou ==3){
		$("#gzp").linkbutton('disable');
		$('#xunjiangd').linkbutton('disable');
		$('#quexianxgd').linkbutton('select');
		$('#tingdiangd').linkbutton('disable');
		$('#qiangxiugd').linkbutton('disable');
	}else if(taitou ==4){
		$("#gzp").linkbutton('disable');
		$('#xunjiangd').linkbutton('disable');
		$('#quexianxgd').linkbutton('disable');
		$('#tingdiangd').linkbutton('select');
		$('#qiangxiugd').linkbutton('disable');
	}else if(taitou ==5){
		$("#gzp").linkbutton('disable');
		$('#xunjiangd').linkbutton('disable');
		$('#quexianxgd').linkbutton('disable');
		$('#tingdiangd').linkbutton('select');
		$('#qiangxiugd').linkbutton('select');
	}
}*/

//抢修下拉框
 function qiangxiuxiala(data){
	$('#qiangxiufzr').combobox({
		data:data,
		iconCls:'icon-help',
		valueField:'chargrPersid',
		textField:'chargrPers'
	});
	$($('#qiangxiufzr').next().find(".icon-help")).tooltip({
		position: 'right',    
		content: '<span style="color:#fff">抢修负责人来源于部门编码为qxz的用户</span>',    
		onShow: function(){        
			$(this).tooltip('tip').css({            
				backgroundColor: '#666',
				borderColor: '#666'        
			});    
		}
	});
}
 
//派发
 function paifa(){
//	var pd = /[5679]/g;//根据树节点判断5,6，7，8为设备
	var wTree = $('#usershebeiTree').combotree('tree');
	var wNode = wTree.tree('getSelected');
//	console.log(wNode);
//	return;
//	15：变压器（叶子节点） 16：母线（叶子节点） 17：线路（叶子节点） 18：其他设备（电气）（叶子节点）19：用能设备（叶子节点）
//	20：环境监测设备（叶子节点） 21：门禁（叶子节点） 22：照明（叶子节点） 23：其他设备（非电气）（叶子节点）
	//判断是否有值
	if(index == '1'){//抢修工单
		if($('#userTree').combobox('getValue') ==''){
			$.messager.alert('确认', "客户不能为空！", 'info', function(){
				$('#userTree').combobox('textbox').focus();
				$('#userTree').combobox('showPanel');
	    	});
			return;
		}
		if(wNode == null){
			$.messager.alert('确认', "故障设备为空！", 'info', function(){
				$('#usershebeiTree').combobox('textbox').focus();
				$('#usershebeiTree').combobox('showPanel');
	    	});
			return;
		}
		if(wNode != null){
			if(wNode.type<15||wNode.id.length>12){
				$.messager.alert('确认', "请选择故障设备！", 'info', function(){
					$('#usershebeiTree').combobox('textbox').focus();
					$('#usershebeiTree').combobox('showPanel');
		    	});
				return;
			}
			
//		}else if($('#usershebeiTree').combotree('getValue')=='' &&deviceType == 'null'){
//			$.messager.alert('确认', "请选择故障设备！", 'info', function(){
//				$('#usershebeiTree').combobox('textbox').focus();
//				$('#usershebeiTree').combobox('showPanel');
//	    	});
//			return;
//		}else if(!pd.test(wNode.rootType) &&deviceType == 'null'){
//			$.messager.alert('确认', "请选择到故障设备！", 'info', function(){
//				$('#usershebeiTree').combobox('textbox').focus();
//				$('#usershebeiTree').combobox('showPanel');
//	    	});
//			return;
		}
		if($('#date').val() ==''){
			$.messager.alert('确认', "发生时间不能为空！", 'info', function(){
				$('#date').combobox('textbox').focus();
				$('#date').combobox('showPanel');
	    	});
			return;
		}
		if($('#jinjichengdu').combobox('getValue') ==''){
			$.messager.alert('确认', "紧急程度不能为空！", 'info', function(){
				$('#jinjichengdu').combobox('textbox').focus();
				$('#jinjichengdu').combobox('showPanel');
	    	});
			return;
		}
		if($('#qiangxiufzr').combobox('getValue') ==''){
			$.messager.alert('确认', "抢修负责人不能为空！", 'info', function(){
				$('#qiangxiufzr').combobox('textbox').focus();
				$('#qiangxiufzr').combobox('showPanel');
	    	});
			return;
		}
		if($('#gzms').textbox('getValue').length > 400){
			$.messager.alert('确认', "故障描述不能超过400个字！", 'info', function(){
				$('#gzms').textbox('textbox').focus();
//				$('#gzms').textbox('showPanel');
	    	});
			return;
		}
		
	}else if(index == '2'){//缺陷工单
		if($('#defect').combobox('getValue') ==''){
			$.messager.alert('确认', "缺陷信息不能为空！", 'info', function(){
				$('#defect').combobox('textbox').focus();
				$('#defect').combobox('showPanel');
	    	});
			return;
		}
		if($('#defectJj').combobox('getValue') ==''){
			$.messager.alert('确认', "紧急程度不能为空！", 'info', function(){
				$('#defectJj').combobox('textbox').focus();
				$('#defectJj').combobox('showPanel');
	    	});
			return;
		}
		if($('#defectMan').combobox('getValue') ==''){
			$.messager.alert('确认', "缺陷负责人不能为空！", 'info', function(){
				$('#defectMan').combobox('textbox').focus();
				$('#defectMan').combobox('showPanel');
	    	});
			return;
		}
	}
	
	if(mpId != "null"){
		$.post(webContextRoot +'warn/querygaojingchaxunshouyeadd.action', //请求路径
				{
				'gaoJIngChaXunSYModel.mpId' :mpId,
				'gaoJIngChaXunSYModel.userId' :userId,
				'gaoJIngChaXunSYModel.bianwei' :0
				},//请求参数
			 	function(data){
					var ste = JSON.stringify(data);
					if(ste.indexOf("success")){
					}else{
						alert("失败");
						return;
					}
				});
	}			
	
	if(deviceType != 'null' && devId != 'null'){
		/*gddevId  = devId;
		gddevName = devName;
		gdyhbName =yhbName;
		gdyhbId = userTranId;
		var type = null;*/
		/*if(deviceType==1){
			gdyhLeixing =6;
		}else if(deviceType==2){
			gdyhLeixing =7;
		}else if(deviceType==3){
			gdyhLeixing =5;
		}else if(deviceType==4){
			gdyhLeixing =9;
		}*/
		
		if(index == '1'){//抢修工单
			/*$.getJSON(webContextRoot + 'worknoteSend/queryIsElectricByDevId.action',{   
    			'labourListModel.devId' : devId
    		},
    		function(json){
    			gdyhLeixing = getDevType(json[0]);
    		});
			gddevId = devId;*/
			$.ajax({
				url:webContextRoot + 'worknoteSend/queryIsElectricByDevId.action',
				data:{
					'labourListModel.devId' : devId
				},
				dataType:'json',
				async:false,
				success:function(data){
					gdyhLeixing = getDevType(data[0]);
				}
			});
			gddevId = devId;
		}else if(index == '2'){//缺陷工单
			//选中行的缺陷id
			var rowId = $('#defect').combobox("getValue");
			var rows = $('#defect').combobox("getData");
			var row = null;
			//循环查找选中行，获取所有数据
			for(var i in rows){
				if(rows[i].defectId == rowId){
					row = rows[i];
					break;
				}
			}
			gddevId = row.devId;
			gdyhLeixing = getDevType(row);
		}
		
	}else{
		if(index == '1'){//抢修工单
			gddevId  = wNode.rootId;
//			gddevName = wNode.rootName;
//			gdyhbName =wNode.subsName;
//			gdyhbId = wNode.parentId.substring(0,wNode.parentId.indexOf("_"));
			gdyhLeixing = wNode.type;
		}else if(index == '2'){//缺陷工单
			//选中行的缺陷id
			var rowId = $('#defect').combobox("getValue");
			var rows = $('#defect').combobox("getData");
			var row = null;
			//循环查找选中行，获取所有数据
			for(var i in rows){
				if(rows[i].defectId == rowId){
					row = rows[i];
					break;
				}
			}
			gddevId = row.devId;
			gdyhLeixing = getDevType(row);
//			gddevId  = sbId;
//			gddevName = devName;
//			gdyhbId = yhbId;
//			gdyhbName = yhbName;
//			gdyhLeixing = devSort;
		}
		
	}
	
	var happenTime = null;//发生时间
	var wnGrade = null;//紧急程度
	var content = null;//内容
	var consId = null;//企业id
	var ChargrPers = null;//负责人
	//var str = '';//照片
	
	if(index == '1'){//抢修工单
		happenTime = $('#date').val();
		wnGrade = $('#jinjichengdu').combobox('getValue');
		content = $.trim($('#gzms').textbox('getValue'));
		consId = $('#userTree').combobox('getValue');
		ChargrPers = $('#qiangxiufzr').combobox('getValue');
	}else if(index == '2'){//缺陷工单
//		happenTime = $('#foundTime').val();
		happenTime = $('#foundTime').text();
		wnGrade = $('#defectJj').combobox('getValue');
//		content = $.trim($('#defectContent').textbox('getValue'));
		content = $('#defectContent').text();
//		consId = $('#consId').combobox('getValue');
		ChargrPers = $('#defectMan').combobox('getValue');
		/*//获取图片路径
		if($('#logoA').val()!="" && $('#logoA').val()!=null){
			str += $('#logoA').val();
		}
		if($('#logoB').val()!="" && $('#logoB').val()!=null){
			str += ','+$('#logoB').val();
		}
		if($('#logoC').val()!="" && $('#logoC').val()!=null){
			str += ','+$('#logoC').val();
		}*/
	}
	
	//保存操作
	$.getJSON(webContextRoot + 'worknoteSend/addGongDanpPaiFa.action',
			{ 
				'labourListModel.happenTime' :  happenTime,
				'labourListModel.wnGrade' : wnGrade,
				'labourListModel.content' : content,
//				'labourListModel.consId' : consId,
				'labourListModel.chargrPers' :  ChargrPers,
				'labourListModel.devId' :  gddevId,
//				'labourListModel.userTranId' : gdyhbId,
//				'labourListModel.devName' : gddevName,
//				'labourListModel.devSort' : wNode.type,
				'labourListModel.devSort' : gdyhLeixing,
//				'labourListModel.timeType' :gdyhbName,
				'labourListModel.sndPers' :userId,
				'labourListModel.index' :index,
				'labourListModel.defectId' :defectId  //缺陷工单ID
//				'labourListModel.deceviceType' :deceviceType,
				//'labourListModel.photo':str,//照片
			},
			function(json){
				 if(json.saveSUCCESS=="true")
				    {
				    	$.messager.alert('确认', "保存成功！", 'info', function(r){
				    		qingkong();
				    		if(mpId != "null"){
				    		//	$("#msgwin").dialog("close");
				    			window.parent.paifachuli();
				    			
				    		}
				    	});
				    }
			    	else
			    	{
			    	 	$.messager.alert('确认', "保存失败！", 'warning');//移除失败
			    	}
			}
		);
}
 
//清空
 function qingkong(){
	if(index == '1'){//抢修工单
		if(isFlag != '1'){
			$('#userTree').combobox("clear");
		}
		$('#gzms').textbox('setValue','');
		$('#jinjichengdu').combobox('setValue','');
		$('#qiangxiufzr').combobox('setValue','');
		//$('#date').datebox('setValue', '');
		$('#usershebeiTree').combotree("clear");
	}else if(index == '2'){//缺陷工单
		if(!$("#zztb_defectDiv").is(":hidden")){
			$('#zztb_consId').combobox("setValue","");
			$('#zztb_defectSb').combotree("setValue","");
			$('#zztb_foundTime').datetimebox("setValue",DateUtil.dateToStr('yyyy-MM-dd HH:mm:ss',new Date()));
			$('#zztb_source').combobox("setValue","");
			$('#zztb_founder').combobox("setValue","");
			$('#zztb_severity').combobox("setValue","");
			$('#zztb_defectContent').textbox('setValue','');
			$('#zztb_defectJj').combobox("setValue","");
			$('#zztb_defectMan').combobox("setValue","");
			
			clearUploader();
		}else{
			$('#defect').combobox("clear");
			$('#defectJj').combobox("clear");
//			$('#consId').combobox("clear");
			$('#consId').text("");
//			$('#defectSb').combotree("clear");
//			$('#defectSb').combotree("setValue","");
//			$('#defectSb').combotree("setText","");
			$('#defectSb').text("");
//			$('#foundTime').datetimebox("setValue","");
			$('#foundTime').text("");
//			$('#source').combobox("clear");
			$('#source').text("");
//			$('#founder').combobox("clear");
			$('#founder').text("");
//			$('#severity').combobox("clear");
			$('#severity').text("");
//			$('#defectContent').textbox('setValue','');
			$('#defectContent').text("");
			$('#defectMan').combobox("clear");
			
			$('#defect').combobox('reload');
			
			//照片清空
			$('#imageA_logo').attr("src",null);
			$('#hrefA').attr("href",null);
			$('#hrefA').attr("data-lightbox","");
			$('#logoA').attr("value",null);
			$('#imageA_logo').hide();
			$('#logo_butA').hide();
			
			$('#imageB_logo').attr("src",null);
			$('#hrefB').attr("href",null);
			$('#hrefB').attr("data-lightbox","");
			$('#logoB').attr("value",null);
			$('#imageB_logo').hide();
			$('#logo_butB').hide();
			
			$('#imageC_logo').attr("src",null);
			$('#hrefC').attr("href",null);
			$('#hrefC').attr("data-lightbox","");
			$('#logoC').attr("value",null);
			$('#imageC_logo').hide();
			$('#logo_butC').hide();
		}
		
	}
}
 
/**
 * 确定tab页工单类型  1抢修工单  2缺陷工单
 */
var index='';
function checkValue(value){
	index = value;
	if(index == '1'){
		$('#qxDiv').show();
		$('#defectDiv').hide();
	}else if(index == '2'){
		$('#qxDiv').hide();
		$('#defectDiv').show();
		
		/*var scriptManager = {
			    isLoadlightBoxScript: false,
			    *//**
			     * 动态加载脚本，需要依赖jquery
			     **//*
			    loadScirpt: function (scriptName, path, loadOnlyOne) {
			        switch (scriptName){
			            case 'lightBox':
			                if (this.isLoadlightBoxScript == false && loadOnlyOne){
			                    $.getScript(path);
			                    this.isLoadlightBoxScript = true;
			                }
			                break;
			            default:
			                console.log("该脚本名称不能被识别！");
			                break;
			        }
			    }
		};
		scriptManager.loadScirpt("lightBox",jsPath+"/lightbox/dist/js/lightbox.min.js", true);*/
		
		
	}
}

/**
 * 初始化webuploader上传组件
 */
function webuploader(){
	
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

		// 只允许选择图片文件。
		accept : {
			title : 'Images',
			extensions : 'gif,jpg,jpeg,bmp,png',
			mimeTypes : '.gif,.jpg,.jpeg,.bmp,.png'
		},
		method : 'POST',

//		// 重要参数:跟后台文件组件的对接参数，后台文件组件叫做upload。
//		fileVal : "upload",
//
		// 传入参数。这两个参数会跟文件一起传给后台，用于跟后台对接，确认文件的来源。
		//预设定了2个参数，根据需求自行选择
//		formData : {
//			"parameter1" : "aaa",
//			"parameter2" : "bbb"
//		}

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
		), $img = $li.find('img'),$a = $li.find('a');
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
			$a.attr('href', src);
			$a.attr("data-lightbox","example-set");
			
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
		//业务上的新增修改功能方法
		if(!$("#zztb_defectDiv").is(":hidden")){
			zztb_defectDiv_commit();
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
		//前台数据验证  判断当前显示的div
		if(!$("#zztb_defectDiv").is(":hidden")){
			if(zztb_defectDiv_validation()){
				uploader.upload();
			}
		}
//		uploader.upload();
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
	uploadArray = new Array();
	uploader.reset();
	$(filePicker).show();
}

/**
 * 主站填报 缺陷工单 验证
 * @returns {Boolean}
 */
function zztb_defectDiv_validation(){
	//客户名称
	var zztb_consId = $("#zztb_consId").combobox("getValue");
	if(zztb_consId==null||zztb_consId.length==0){
		$.messager.alert('提示','客户名称不能为空!','info');    
		return false;
	}
	
	//缺陷设备
	var selected = $("#zztb_defectSb").combotree("tree").tree('getSelected');
	if(selected==null){
		$.messager.alert('提示','缺陷设备不能为空!','info');    
		return false;
	}
	//判断是否是节点
	var isLeaf = $('#zztb_defectSb').tree('isLeaf',selected.target);
	if(!isLeaf){
		$.messager.alert('提示','请选择正确的设备！','info');    
		return false;
	}
	//设备ID   rootId: "101000004006"
	var zztb_defectSb = selected.rootId;
	if(zztb_defectSb.length>12){
		$.messager.alert('提示','请选择正确的设备！','info');    
		return false;
	}
	
	//发现时间
	var zztb_foundTime = $("#zztb_foundTime").datetimebox("getValue");
	//发现来源
	var zztb_source = $("#zztb_source").combobox("getValue");
	if(zztb_source==null||zztb_source.length==0){
		$.messager.alert('提示','发现来源不能为空！','info');    
		return false;
	}
	//发现人
	var zztb_founder = $("#zztb_founder").combobox("getValue");
	if(zztb_founder==null||zztb_founder.length==0){
		$.messager.alert('提示','发现人不能为空！','info');    
		return false;
	}
	//缺陷性质
	var zztb_severity = $("#zztb_severity").combobox("getValue");
	if(zztb_severity==null||zztb_severity.length==0){
		$.messager.alert('提示','缺陷性质不能为空！','info');    
		return false;
	}
	//缺陷描述
	var zztb_severity = $("#zztb_defectContent").textbox("getValue");
	if(zztb_severity!=null&&zztb_severity.length > 400){
		$.messager.alert('提示','缺陷性质不能超过400个字！','info');    
		return false;
	}
	
	//紧急程度
	var zztb_defectJj = $("#zztb_defectJj").combobox("getValue");
	if(zztb_defectJj==null||zztb_defectJj.length==0){
		$.messager.alert('提示','紧急程度不能为空！','info');    
		return false;
	}
	
	//缺陷负责人
	var zztb_defectMan = $("#zztb_defectMan").combobox("getValue");
	if(zztb_defectMan==null||zztb_defectMan.length==0){
		$.messager.alert('提示','缺陷负责人不能为空！','info');    
		return false;
	}
	
	return true;
}


/**
 * 主站填报 缺陷工单 提交
 */
function zztb_defectDiv_commit(){
	//客户ID
	var zztb_consId = $("#zztb_consId").combobox("getValue");
	//缺陷设备
	var selected = $("#zztb_defectSb").combotree("tree").tree('getSelected');
	//设备ID   rootId: "101000004006"
	var zztb_defectSb = selected.rootId;
	//设备类型  
	var zztb_defectSbType = selected.type;
	//发现时间
	var zztb_foundTime = $("#zztb_foundTime").datetimebox("getValue");
	//发现来源
	var zztb_source = $("#zztb_source").combobox("getValue");
	//发现人
	var zztb_founder = $("#zztb_founder").combobox("getValue");
	//缺陷性质
	var zztb_severity = $("#zztb_severity").combobox("getValue");
	//紧急程度
	var zztb_defectJj = $("#zztb_defectJj").combobox("getValue");
	//缺陷负责人
	var zztb_defectMan = $("#zztb_defectMan").combobox("getValue");
	//缺陷描述
	var zztb_defectContent = $("#zztb_defectContent").textbox("getValue");
	//缺陷照片
	var zztb_img = '';
	for(var i in uploadArray){
		zztb_img += uploadArray[i].url + ",";
	}
	if(zztb_img.length>0) zztb_img = zztb_img.substr(0,zztb_img.length-1);
	
	$.ajax({	
		url:webContextRoot+'worknoteSend/addZZTBWorknote.action', 
		data:{
			'labourListModel.index' :index,
			'labourListModel.consId' : zztb_consId,
			'labourListModel.devId' :  zztb_defectSb,
			'labourListModel.devSort' : zztb_defectSbType,
			'labourListModel.foundTime' :  zztb_foundTime,
			'labourListModel.source' : zztb_source,
			'labourListModel.founder' : zztb_founder,
			'labourListModel.severity' : zztb_severity,
			'labourListModel.wnGrade' :  zztb_defectJj,
			'labourListModel.chargrPers' :  zztb_defectMan,
			'labourListModel.defectContent' :  zztb_defectContent,
			'labourListModel.photo' :  zztb_img,
			'labourListModel.sndPers' :  userId
		},
		dataType:'json',
		type:'post',
		success:function(result){
			if(result.flag=='success'){
				$.messager.alert('提示','保存成功!','info');  
//				clearUploader();
				qingkong();
			}else{
				$.messager.alert('提示','保存失败!','info');  
			}
		}
	});
	
}

/**
 * 根据数据库里的字段 确定 设备的类型 对应设备树的类型
 * 15：变压器（根节点） 16：母线（根节点） 17：线路（根节点） 18：其他设备（电气）（根节点）
 * 19：用能设备（根节点） 20：环境监测设备（根节点） 21：门禁（根节点） 22：照明（根节点） 23：其他设备（非电气）（根节点）
 * @param data
 */
function getDevType(data){
	//电气设备
	if(data.isDecevice.length>0&&data.isDecevice==1){
		if(data.devSort==1){//线路
			return 17;
		}
		if(data.devSort==2){//母线
			return 16;	
		}
		if(data.devSort==3){//变压器
			return 15;
		}
		if(data.devSort==4){//其他
			return 18;
		}
	}
	//非电气设备
	else if(data.isDecevice.length>0&&data.isDecevice==0){
		if(data.deceviceType==1){//环境监测设备
			return 20;
		}
		if(data.deceviceType==2){//门状态
			return 21;
		}
		if(data.deceviceType==3){//照明
			return 22;
		}
		if(data.deceviceType==4){//其他
			return 23;
		}
	}
	//能效设备
	else if(data.eeMtDevType.length>0&&data.eeMtDevType==1){
		return 19;
	}
	else{
		return '';
	}
}



