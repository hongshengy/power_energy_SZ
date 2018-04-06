/**
 * 工单管理
 */
var currentdate = new Date();
//工单id
var gdId = null;
var startTime1 = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('d',1,DateUtil.dateAdd('m',-1,currentdate)));
var endTime = DateUtil.dateToStr('yyyy-MM-dd',currentdate);
var startTime = DateUtil.dateAdd('d',1,DateUtil.dateAdd('m',-1,currentdate));
//工单进度demo
var demo = null;
//数据是否更新 1.更新
var isupdate = null;
//当前页数
var pageNo = 1;
//每页显示条数
var pageSize = 20;
//7007 颜色的集合
var colorList='';
//告警级别
var alarmColor = null;
//地图对象
var mp;
//工单类型 1.抢修工单  2.缺陷工单 
var type = null;
var state = null;

//工单进度
var process = null;

var $list = $("#gzzpShow"); //文件显示的ID位置
var $btn = $("#gdgl-btnSubmit"); // 开始上传保存的按钮ID
var filePicker = '#butA'; //添加文件的按键ID
var thumbnailWidth = 60; // 缩略图高度和宽度
// （单位是像素），当宽高度是0~1的时候，是按照百分比计算，具体可以看api文档
var thumbnailHeight = 60;
var thumbnailNumber = 3;
var uploader = null; //上传组件对象
var uploadArray = new Array();//存放上传文件
var butAuploader = null;//故障照片上传组件
var butBuploader = null;//维修照片上传组件

$(function(){
	//窗口切换
	windowChange();
	//如果是弹出框
	if(subsId == 0){
		//$('#west').hide();
		//$('#historyGd').hide();
		//$('#west').width(200);
		//$('#west').remove();
		//$('#west').width('0px');
		var monday = getFirstDayOfWeek(new Date());
		var sunday = DateUtil.dateAdd('d',6,monday);
		monday = DateUtil.dateToStr('yyyy-MM-dd',monday);
		sunday = DateUtil.dateToStr('yyyy-MM-dd',sunday);
		//2.超时工单 3.当日工单 4.本周工单
		if(ywType == 2){//超时工单
			/*var state = document.getElementById("check").checked;//alert(state);
			if(state){
				document.getElementById("check").checked = false;
			}else{
				document.getElementById("check").checked = true;
			} */
			document.getElementById("csgd").checked = true;
//			document.getElementById("csgd").disabled = true;
			//$('#csgd').attr('checked',true);
			state = '1';
			index = '3' ;
		}else if(ywType == 3){//当日
			$('#searchTime').combobox('setValue','5');
			$('#historyGd').show();
			$('#datePicker_panel').show();
			$('#startTime').datebox('setValue',DateUtil.dateToStr('yyyy-MM-dd',currentdate));
			$('#endTime').datebox('setValue',DateUtil.dateToStr('yyyy-MM-dd',currentdate));
		}else if(ywType == 4){
			$('#searchTime').combobox('select','5');
			$('#datePicker_panel').show();
			$('#startTime').datebox('setValue',monday);
			$('#endTime').datebox('setValue',sunday);
			$('#historyGd').show();
		}
		
		
	}
	
	
	$("#csgd").click(function (){
		var s = document.getElementById("csgd").checked;//alert(state);
		if(s){
			state = '1';//超时30分钟
			index = '3';//进度<3
		}else{
			index =  '';//进度<7
			state = '2';
		} 
	});
	
	//紧急程度
	$('#wnGrade').combobox({
		url:webContextRoot +'pCode/queryCode.action?codeSortId=70001',
		valueField: 'codeValue',
		textField: 'codeName',
		formatter: function(row){
			var a = row.codeValue;
			return '<span style="color:'+getColorContent(row.codeValue)+'">' + row.codeName + '</span>';
		}
	});
	
	//设备类型
	$('#labourType').combobox({
		url:webContextRoot +'pCode/queryCode.action?codeSortId=70052',
		valueField: 'codeValue',
		textField: 'codeName'   
	}); 
	
	//企业
	$('#consId').combobox({
		url:webContextRoot +'destree/queryConsList.action',
		valueField: 'id',
		textField: 'text',
//		onChange: function(newValue, oldValue){
//	    	if(newValue != ''){
//				 newValue = $('#consId').combobox('getText');
//					 $.getJSON(webContextRoot + 'destree/queryTree.action?isQyCode=false&ziMu='+newValue,{ 
//							},
//							function(json){
//								$('#consId').combobox('loadData',json);	
//							}
//				 );
//		   	}else{
//		   		 newValue = $('#consId').combobox('getText');
//					 $.getJSON(webContextRoot + 'destree/queryTree.action?isQyCode=false&ziMu=',{ 
//							},
//							function(json){
//								$('#consId').combobox('loadData',json);	
//							}
//				 );
//		   	}
//		},
		mode : 'remote',
		onHidePanel : function(){$('#consId').combobox('reload');}
	});
	
	//获取颜色集合
	$.getJSON(webContextRoot  +'pCode/queryCode.action', 
			  {'codeSortId':70007},
			function(json){
		       colorList = json;
		       //加载工单信息
			   labourList();
			   //加载告警
			   loadGj();
			   //加载进行工单
			   loadJxgd();
			}
	);
	
	//延迟执行
	/*setTimeout(function(){
		 loadlabourList();
	},100);*/ 
	
	//告警信息滚动
	/*$('#tabb').vTicker({
         speed: 500,
         pause: 1500,
         showItems: 5,
         mousePause: true,
         height:250,
         direction: 'up'
     });*/
	
	//故障图片一键上传
//	$('#butA').upload({
//		name:'uploadImage',
//		action:webContextRoot +'worknoteManage/uploadImage.action',
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
	
	//维修图片一键上传
//	$('#butB').upload({
//		name:'uploadImage',
//		action:webContextRoot +'worknoteManage/uploadImage.action',
//		onSelect:function(data){
//			 this.autoSubmit = false;
//			 /*if(!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(this.filename())){
//				 $.messager.alert('提示', "文件格式错误！", 'warning');
//				 return;
//             }else */if($("#imageD_logo").attr("src")==null||$("#imageE_logo").attr("src")==null||$("#imageF_logo").attr("src")==null){
//            	 this.submit();  //手动提交
//             }else{
//            	 //alert("超过最大上传数量");
//            	 $.messager.alert('提示', "超过最大上传数量！", 'warning');
//             }
//		},
//		onComplete:function(data){//回显已经上传的图片
//			var obj = eval("(" + data + ")");
//			if(obj.message == "true"){
//				if($("#imageD_logo").attr("src")==null){
//					$('#imageD_logo').show();
//					$('#imageD_logo').attr("src",webContextRoot+obj.urlImage);//小图片D
//					$('#hrefD').attr("href",webContextRoot+obj.urlImage);//大图片D
//					$('#hrefD').attr("data-lightbox","example-set");//大图片D
//					$('#logoD').attr("value",obj.urlImage);
//					$('#logo_butD').show();
//				}else if($("#imageE_logo").attr("src")==null){
//					$('#imageE_logo').show();
//					$('#imageE_logo').attr("src",webContextRoot+obj.urlImage);//小图片E
//					$('#hrefE').attr("href",webContextRoot+obj.urlImage);//大图片E
//					$('#hrefE').attr("data-lightbox","example-set");//大图片E
//					$('#logoE').attr("value",obj.urlImage);
//					$('#logo_butE').show();
//				}else if($("#imageF_logo").attr("src")==null){
//					$('#imageF_logo').show();
//					$('#imageF_logo').attr("src",webContextRoot+obj.urlImage);//小图片F
//					$('#hrefF').attr("href",webContextRoot+obj.urlImage);//大图片F
//					$('#hrefF').attr("data-lightbox","example-set");//大图片F
//					$('#logoF').attr("value",obj.urlImage);
//					$('#logo_butF').show();
//				}
//			}else{
//				$.messager.alert('提示', "上传失败！", 'warning');
//				return;
//			}
//			
//		}
//	});
	
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
//	//图片D删除
//	$('#logo_butD').bind('click', function(event){
//		$('#imageD_logo').attr("src",null);
//		$('#hrefD').attr("href",null);
//		$('#hrefD').attr("data-lightbox","");
//		$('#logoD').attr("value",null);
//		$('#imageD_logo').hide();
//		$('#logo_butD').hide();
//        return false;
//    });
//	//图片E删除
//	$('#logo_butE').bind('click', function(event){
//		$('#imageE_logo').attr("src",null);
//		$('#hrefE').attr("href",null);
//		$('#hrefE').attr("data-lightbox","");
//		$('#logoE').attr("value",null);
//		$('#imageE_logo').hide();
//		$('#logo_butE').hide();
//        return false;
//    });
//	//图片F删除
//	$('#logo_butF').bind('click', function(event){
//		$('#imageF_logo').attr("src",null);
//		$('#hrefF').attr("href",null);
//		$('#hrefF').attr("data-lightbox","");
//		$('#logoF').attr("value",null);
//		$('#imageF_logo').hide();
//		$('#logo_butF').hide();
//        return false;
//    });
	//初始化地图  测试环境注释，生产打开
	//initMap();
	
	/*if(consId != ''){
		setTimeout(function(){//延迟加载企业
			$('#consId').combobox('setValue',consId);
			$('#consId').combobox('disable');
		},200);
	}*/
	
});

/**
 * 地图初始化
 * 
 */
function initMap(){
	// 地图对象与DIV绑定
	mp = new BMap.Map('gdMap', {
		enableMapClick : false
	});
	// 地图初始化
	$.ajax({
		type : "POST",
		url : webContextRoot + 'giszl/gisInit.action',
		dataType : "json",
		success : function(data) {
			// 初始化地图
			if(data.heart_longitude > 0 && data.heart_latitude > 0){
				map.labourInit(mp, data);
			} else {
				$("#gdMap").html('请先维护区域中心信息！');
			}
		}
	});
}

/**
 * 获取颜色
 * @param alarmColor
 * @returns
 */
function getColorContent(alarmColor){
	  for(var i=0;i<colorList.length;i++){
		  if(colorList[i].codeValue == alarmColor){
			  return colorList[i].content1;
		  }
	  }
	  return '';
}

/**
 * 告警信息查询
 */
function loadGj(){
	    var str='';
		$.post(webContextRoot +'worknoteManage/queryGaoJing.action', //请求路径
				{'labourListModel.process': 3},//请求参数  紧急程度  < 3现场确认
			   	function(data){//回调
					str = '<table><tbody>';
					for(var i=1;i<data.length+1;i++){
						str += '<tr>';
						str += '<td class="td-value">'+i+'</td>';
						str += '<td class="td-value">'+data[i-1].wnNo+'</td>';
						//str += '<td class="td-value" style="text-align:left"><font color="red">'+data[i-1].content+'</font></td>';
						if(data[i-1].wnGrade=='1'){
							str += "<td class='td-value' style='text-align:left'><font color="+getColorContent(1)+">"+data[i-1].content+"</font></td>";
						}else if(data[i-1].wnGrade=='2'){
							str += "<td class='td-value' style='text-align:left'><font color="+getColorContent(2)+">"+data[i-1].content+"</font></td>";
						}else{
							str += "<td class='td-value' style='text-align:left'><font color="+getColorContent(3)+">"+data[i-1].content+"</font></td>";
						}
						str += '</tr>';
					}
					str += '</tbody></table>';
					$('#tabb').append(str);
			   	},
			   "json");//返回格式
}

/**
 * 进行工单查询
 */
function loadJxgd(){
	var str='';
	$.post(webContextRoot +'worknoteManage/queryJxgd.action', //请求路径
			{},//请求参数  
		   	function(data){//回调
				str = '<table><tbody>';
				for(var i=1;i<data.length+1;i++){
					str += '<tr>';
					str += '<td class="td-value">'+i+'</td>';
					str += '<td class="td-value">'+data[i-1].wnNo+'</td>';
					//str += '<td class="td-value" style="text-align:center"><font color="red">'+data[i-1].wnGradeName+'</td>';
					//str += '<td class="td-value" style="text-align:center"><font color="red">'+data[i-1].processName+'</td>';
					if(data[i-1].wnGradeName=='高'||data[i-1].wnGradeName=='高等'){
						str += "<td class='td-value' style='text-align:center'><font color="+getColorContent(1)+">"+data[i-1].wnGradeName+"</font></td>";
						str += "<td class='td-value' style='text-align:center'><font color="+getColorContent(1)+">"+data[i-1].processName+"</font></td>";
					}else if(data[i-1].wnGradeName=='中'||data[i-1].wnGradeName=='中等'){
						str += "<td class='td-value' style='text-align:center'><font color="+getColorContent(2)+">"+data[i-1].wnGradeName+"</font></td>";
						str += "<td class='td-value' style='text-align:center'><font color="+getColorContent(2)+">"+data[i-1].processName+"</font></td>";
					}else{
						str += "<td class='td-value' style='text-align:center'><font color="+getColorContent(3)+">"+data[i-1].wnGradeName+"</font></td>";
						str += "<td class='td-value' style='text-align:center'><font color="+getColorContent(3)+">"+data[i-1].processName+"</font></td>";
					}
					str += '</tr>';
				}
				str += '</tbody></table>';
				$('#tabb1').append(str);
		   	},
		   "json");//返回格式
}

/**
 * 工单列表信息显示
 */
function labourList(){
	if($('#searchTime').combobox('getValue') == 5){
		startTime =  $('#startTime').val();//开始日期
		endTime =  $('#endTime').val();//结束日期
		if(startTime == '' ){
			$.messager.alert('提示', "开始日期不能为空！", 'warning');
			return;
		}else if(endTime == ''){
			$.messager.alert('提示', "结束日期不能为空！", 'warning');
			return;
		}else if(startTime > endTime){
			$.messager.alert('提示', "开始日期不能大于结束日期！", 'warning');
			return;
		}
	}
	
	var column = [[
	    {field:'wnNo',title:'工单编号',width:'8%',align:'center',formatter: function(v,row,index){ //超链接
	    	return '<a style="color:blue" href="#" onclick="labourClick('
   			+ row.wnId+','+row.process+",'"+row.labourType+"'"
			+ ')">'
			+ v
			+ '</a>';
	    }},
	    {field:'wnGradeName',title:'紧急程度',width:'6%',align:'center',
	    	styler:function(v,row,index){
		    	if(v=="高"||v=="高等"){
		    		return 'color:'+getColorContent(1);
		    	}else if(v=="中"||v=="中等"){
		    		return 'color:'+getColorContent(2);
		    	}else{
		    		return 'color:'+getColorContent(3);
		    	}
		    }
	    	/*formatter:function(v,row,index){
	    		if(v == "高"){
	    			return "<span style='color: "+getColorContent(row.alarmColor)+"'></span>";
	    		}
	    	}*/
	    },
	    {field:'processName',title:'当前状态',width:'8%',align:'center'},
	    {field:'labourType',title:'工单类型',width:'8%',align:'center'},
	    {field:'sendTime',title:'派发时间',width:'15%',align:'center'},
	    {field:'sndPersName',title:'派发人',width:'10%',align:'center'},
	    {field:'devName',title:'故障设备',width:'15%',align:'center'},
	    {field:'consNo',title:'客户编号',width:'8%',align:'center'},
	    {field:'consName',title:'客户名称',width:'20%',align:'left'}
	]];
	
	//点击+显示的表格
	$('#gdgl-girdDetailView').datagrid({
        title:'工单信息',
        width:'100%',
        height:'100%',
        border:false,
        fitColumns:false,//真正的自动展开/收缩列的大小，以适应网格的宽度，防止水平滚动
        singleSelect:true,//如果为true，则只允许选择一行
        rownumbers:true,//如果为true，则显示一个行号列
        pagination : true,// 设置true将在数据表格底部显示分页工具栏
        view: detailview,//定义DataGrid的视图
        
        pageNumber:1,//在设置分页属性的时候初始化页码。
		pageSize:pageSize,//在设置分页属性的时候初始化页面大小。
		url:webContextRoot +'worknoteManage/queryLabour.action',
		queryParams:{
			 'labourListModel.wnNo': $.trim($('#wnNo').textbox('getValue')),//工单编号
		     'labourListModel.sndPers': $.trim($('#sndPers').textbox('getValue')),//派发人
		     'labourListModel.wnGrade': $('#wnGrade').combobox('getValue'),//紧急程度
			 'labourListModel.consId': $.trim($('#consId').combobox('getValue')),//企业
			 'labourListModel.timeType': $('#searchTime').datebox('getValue'),//派发时间
		     'labourListModel.startDate': $('#startTime').datebox('getValue'),//开始时间
		     'labourListModel.endDate': $('#endTime').combobox('getValue'),//结束时间
			 'labourListModel.process': index,
			 'labourListModel.labourType': $('#labourType').combobox('getValue'),//工单类型
			 'labourListModel.state': state,//超时工单
		},
		loadMsg : "正在努力的读取数据中...",// 提示信息
		columns : column,//字段
		loadFilter: function(data){
			if (data.sMap){
				return data.sMap;
			} else {
				return data;
			}
		},
        
        detailFormatter: function(rowIndex, rowData){
        	//处理null
        	for(var i in rowData){
        		if(rowData[i] == null) rowData[i] = '';
        	}
        		
        	if(rowData.labourType == '抢修工单'){
        		type = '1';
        	}else if(rowData.labourType == '缺陷工单'){
        		type = '2';
        	}
        	//1.抢修 2.缺陷
        	changeType(type);
        	var div = '';
        	if(type == 1){//抢修工单
        		div = '<div class="detailView-panel" style="height: 250px;border:1px dashed;">' +
	            '<table style="table-layout: fixed;width: 0">' +
	                '<colgroup>' +
	                    '<col style="width: 80px">' +
	                    '<col style="width: 100px;">' +
	                    '<col style="width: 80px">' +
	                    '<col style="width: 200px;">' +
	                    '<col style="width: 80px">' +
	                    '<col style="width: 120px;">' +
	                    '<col style="width: 80px">' +
	                    '<col style="width: 130px;">' +
	                '</colgroup>' +
	                '<tbody>' +
	                    '<tr>' + 
	                        '<td class="td-label">工单编号：</td>' +
	                        '<td class="td-value">'+rowData.wnNo+'</td>' +
	                    '</tr>' +
	                    '<tr>' +
	                        '<td class="td-label">地区：</td>' +
	                        '<td class="td-value">'+rowData.areaName+'</td>' +
	                        '<td class="td-label">客户名称：</td>' +
	                        '<td class="td-value" nowrap="nowrap" style="overflow: hidden; text-overflow: ellipsis;">'+rowData.consName+'</td>' +
	                        '<td class="td-label">用户变：</td>' +
	                        '<td class="td-value" nowrap="nowrap" style="overflow: hidden; text-overflow: ellipsis;">'+rowData.uTName+'</td>' +
	                        '<td class="td-label">故障设备：</td>' +
	                        '<td class="td-value" nowrap="nowrap" style="overflow: hidden; text-overflow: ellipsis;">'+rowData.deceviceTypeName+'->'+rowData.devName+'</td>' +
	                        //'<td class="td-value">'+rowData.devSort+rowData.devName+'</td>' +
	                    '</tr>' +
	                    '<tr>' +
	                        '<td class="td-label">派发人：</td>' +
	                        '<td class="td-value">'+rowData.sndPersName+'</td>' +
	                        '<td class="td-label">派单时间：</td>' +
	                        '<td class="td-value">'+rowData.sendTime+'</td>' +//.slice(0,rowData.sendTime.indexOf('.'))
	                        '<td class="td-label">抢修负责人：</td>' +
	                        '<td class="td-value">'+rowData.chargrPersName+'</td>' +
	                    '</tr>' +
	                    '<tr>' +
	                        '<td class="td-label" style="vertical-align: top;padding-top: 5px;">详细内容：</td>' +
	                        '<td class="td-value" colspan="7">' +
	                            '<div style="height: 100px;white-space: normal; word-wrap: break-word; vertical-align: top;">'+(rowData.content==null?'':rowData.content)+'</div>' +
	                        '</td>' +
	                    '</tr>' +
	                    '<tr>' +
	                        '<td class="td-label" style="vertical-align: middle;">当前进度：</td>' +
	                        '<td class="td-value" colspan="6">' +
	                            '<div class="prjectProgress-panel">' +
	                            '<div class="item-block">' +
	                                '<p><img id="xfimg'+rowIndex+'"></p>' +
	                                '<p><span id="xf'+rowIndex+'">下发</span></p>' +
	                            '</div>' +
	                            '<img id="jindua'+rowIndex+'">' +
	                            '<div class="item-block">' +
		                            '<p><img id="jdimg'+rowIndex+'"></p>' +
		                            '<p><span id="jd'+rowIndex+'">已接单</span></p>' +
		                        '</div>' +
		                        '<img id="jindub'+rowIndex+'">' +
	                            '<div class="item-block">' +
	                                '<p><img id="ddqrimg'+rowIndex+'"></p>' +
	                                '<p><span id="ddqr'+rowIndex+'">到达现场已确认</span></p>' +
	                            '</div>' +
	                            '<img id="jinduc'+rowIndex+'">' +
	                            '<div class="item-block">' +
	                                 '<p><img id="xcgzqrimg'+rowIndex+'"></p>' +
	                                 '<p><span id="xcgzqr'+rowIndex+'">现场故障已确认</span></p>' +
	                             '</div>' +
	                             '<img id="jindud'+rowIndex+'">' +
	                             '<div class="item-block">' +
	                                  '<p><img id="qxjdqrimg'+rowIndex+'"></p>' +
	                                  '<p><span id="qxjdqr'+rowIndex+'">抢修进度已确认</span></p>' +
	                              '</div>' +
	                              '<img id="jindue'+rowIndex+'">' +
	                              '<div class="item-block">' +
	                                  '<p><img id="yihuidanimg'+rowIndex+'"></p>' +
	                                  '<p><span id="yihuidan'+rowIndex+'">已回单</span></p>' +
	                              '</div>' +
	                              '<img id="jinduf'+rowIndex+'">' +
	                              '<div class="item-block">' +
	                                  '<p><img id="yiguidanimg'+rowIndex+'"></p>' +
	                                  '<p><span id="yiguidan'+rowIndex+'">已归档</span></p>' +
	                              '</div>' +
		                          '</div>' +
	                        '</td>' +
	                        '<td style="text-align: right"><a class="moreButton-style c11 shadow" href="#" onclick="labourClick('+rowData.wnId+','+rowData.process+",'"+rowData.labourType+"'"+')">更多》</a></td>' + 
	                    '</tr>' +
	                '</tbody>' +
	            '</table>' +
	            '</div>';
        	}else if(type == 2){//缺陷工单
        		div = '<div class="detailView-panel" style="height: 250px;border:1px dashed;">' +
                '<table style="table-layout: fixed;width: 0">' +
                    '<colgroup>' +
                        '<col style="width: 80px">' +
                        '<col style="width: 100px;">' +
                        '<col style="width: 80px">' +
                        '<col style="width: 200px;">' +
                        '<col style="width: 80px">' +
                        '<col style="width: 120px;">' +
                        '<col style="width: 80px">' +
                        '<col style="width: 130px;">' +
                    '</colgroup>' +
                    '<tbody>' +
                        '<tr>' + 
                            '<td class="td-label">工单编号：</td>' +
                            '<td class="td-value">'+rowData.wnNo+'</td>' +
                            '<td class="td-label">发现来源：</td>' +
                            '<td class="td-value">'+rowData.sourceName+'</td>' +
                            '<td class="td-label">缺陷性质：</td>' +
                            '<td class="td-value">'+rowData.severityName+'</td>' +
                            '<td class="td-label">发现人：</td>' +
                            '<td class="td-value">'+rowData.founderName+'</td>' +
                        '</tr>' +
                        '<tr>' +
                            '<td class="td-label">地区：</td>' +
                            '<td class="td-value">'+rowData.areaName+'</td>' +
                            '<td class="td-label">客户名称：</td>' +
                            '<td class="td-value" nowrap="nowrap" style="overflow: hidden; text-overflow: ellipsis;">'+rowData.consName+'</td>' +
                            '<td class="td-label">用户变：</td>' +
                            '<td class="td-value" nowrap="nowrap" style="overflow: hidden; text-overflow: ellipsis;">'+rowData.uTName+'</td>' +
                            '<td class="td-label">缺陷设备：</td>' +
                            '<td class="td-value" nowrap="nowrap" style="overflow: hidden; text-overflow: ellipsis;">'+rowData.deceviceTypeName+'->'+rowData.devName+'</td>' +
                            //'<td class="td-value">'+rowData.devSort+rowData.devName+'</td>' +
                        '</tr>' +
                        '<tr>' +
                            '<td class="td-label">派发人：</td>' +
                            '<td class="td-value">'+rowData.sndPersName+'</td>' +
                            '<td class="td-label">派单时间：</td>' +
                            '<td class="td-value">'+rowData.sendTime+'</td>' +//.slice(0,rowData.sendTime.indexOf('.'))
                            '<td class="td-label">消缺人：</td>' +
                            '<td class="td-value">'+rowData.chargrPersName+'</td>' +
                        '</tr>' +
                        '<tr>' +
                            '<td class="td-label" style="vertical-align: top;padding-top: 5px;">缺陷内容：</td>' +
                            '<td class="td-value" colspan="7">' +
                                '<div style="height: 90px;white-space: normal; word-wrap: break-word; vertical-align: top;">'+(rowData.content==null?'':rowData.content)+'</div>' +
                            '</td>' +
                        '</tr>' +
                        '<tr>' +
                            '<td class="td-label" style="vertical-align: middle;">当前进度：</td>' +
                            '<td class="td-value" colspan="6">' +
                                '<div class="prjectProgress-panel">' +
                                '<div class="item-block">' +
                                    '<p><img id="xfimg'+rowIndex+'"></p>' +
                                    '<p><span id="xf'+rowIndex+'">下发</span></p>' +
                                '</div>' +
                                '<img id="jindua'+rowIndex+'">' +
                                '<div class="item-block">' +
    	                            '<p><img id="jdimg'+rowIndex+'"></p>' +
    	                            '<p><span id="jd'+rowIndex+'">已接单</span></p>' +
    	                        '</div>' +
    	                        '<img id="jindub'+rowIndex+'">' +
                                '<div class="item-block">' +
                                    '<p><img id="ddqrimg'+rowIndex+'"></p>' +
                                    '<p><span id="ddqr'+rowIndex+'">到达现场已确认</span></p>' +
                                '</div>' +
                                '<img id="jinduc'+rowIndex+'">' +
                                '<div class="item-block">' +
                                     '<p><img id="xcgzqrimg'+rowIndex+'"></p>' +
                                     '<p><span id="xcgzqr'+rowIndex+'">缺陷确认</span></p>' +
                                 '</div>' +
                                 '<img id="jindud'+rowIndex+'">' +
                                 '<div class="item-block">' +
                                      '<p><img id="qxjdqrimg'+rowIndex+'"></p>' +
                                      '<p><span id="qxjdqr'+rowIndex+'">消缺处理</span></p>' +
                                  '</div>' +
                                  '<img id="jindue'+rowIndex+'">' +
                                  '<div class="item-block">' +
                                      '<p><img id="yihuidanimg'+rowIndex+'"></p>' +
                                      '<p><span id="yihuidan'+rowIndex+'">已回单</span></p>' +
                                  '</div>' +
                                  '<img id="jinduf'+rowIndex+'">' +
                                  '<div class="item-block">' +
                                      '<p><img id="yiguidanimg'+rowIndex+'"></p>' +
                                      '<p><span id="yiguidan'+rowIndex+'">已归档</span></p>' +
                                  '</div>' +
    	                          '</div>' +
                            '</td>' +
                            '<td style="text-align: right"><a class="moreButton-style c11 shadow" href="#" onclick="labourClick('+rowData.wnId+','+rowData.process+",'"+rowData.labourType+"'"+')">更多》</a></td>' +
                        '</tr>' +
                    '</tbody>' +
                '</table>' +
                '</div>';
        	}
        	return div;
        },
        onExpandRow:function(rowIndex, rowData){//点击+号展现
        	    if(rowData.process=='1'){//状态为下发时的进度条显示
	    			$('#xfimg'+rowIndex).attr("src",webContextRoot+"pages/despages/common/images/envelope.png");
	    			$('#xf'+rowIndex).removeClass().addClass("label-progress-completed");
	    			$('#jdimg'+rowIndex).attr("src",webContextRoot+"pages/despages/common/images/file-gray.png");
	    			$('#jd'+rowIndex).removeClass().addClass("label-progress-notStart");
	    			$('#ddqrimg'+rowIndex).attr("src",webContextRoot+"pages/despages/common/images/worker-gray.png");
	    			$('#ddqr'+rowIndex).removeClass().addClass("label-progress-notStart");
	    			$('#xcgzqrimg'+rowIndex).attr("src",webContextRoot+"pages/despages/common/images/foreman-gray.png");
	    			$('#xcgzqr'+rowIndex).removeClass().addClass("label-progress-notStart");
	    			$('#qxjdqrimg'+rowIndex).attr("src",webContextRoot+"pages/despages/common/images/tool-gray.png");
	    			$('#qxjdqr'+rowIndex).removeClass().addClass("label-progress-notStart");
	    			$('#yihuidanimg'+rowIndex).attr("src",webContextRoot+"pages/despages/common/images/completed-gray.png");
	    			$('#yihuidan'+rowIndex).removeClass().addClass("label-progress-notStart");
	    			$('#yiguidanimg'+rowIndex).attr("src",webContextRoot+"pages/despages/common/images/folder-gray.png");
	    			$('#yiguidan'+rowIndex).removeClass().addClass("label-progress-notStart");
	    			
	    			$('#jindua'+rowIndex).attr("src",webContextRoot+"pages/despages/common/images/arrow-gray.png");
	    			$('#jindub'+rowIndex).attr("src",webContextRoot+"pages/despages/common/images/arrow-gray.png");
	    			$('#jinduc'+rowIndex).attr("src",webContextRoot+"pages/despages/common/images/arrow-gray.png");
	    			$('#jindud'+rowIndex).attr("src",webContextRoot+"pages/despages/common/images/arrow-gray.png");
	    			$('#jindue'+rowIndex).attr("src",webContextRoot+"pages/despages/common/images/arrow-gray.png");
	    			$('#jinduf'+rowIndex).attr("src",webContextRoot+"pages/despages/common/images/arrow-gray.png");
	    			
	    		}else if(rowData.process=='2'){//状态为已接单时的进度条显示
	    			$('#xfimg'+rowIndex).attr("src",webContextRoot+"pages/despages/common/images/envelope.png");
	    			$('#xf'+rowIndex).removeClass().addClass("label-progress-completed");
	    			$('#jdimg'+rowIndex).attr("src",webContextRoot+"pages/despages/common/images/file.png");
	    			$('#jd'+rowIndex).removeClass().addClass("label-progress-completed");
	    			$('#ddqrimg'+rowIndex).attr("src",webContextRoot+"pages/despages/common/images/worker-gray.png");
	    			$('#ddqr'+rowIndex).removeClass().addClass("label-progress-notStart");
	    			$('#xcgzqrimg'+rowIndex).attr("src",webContextRoot+"pages/despages/common/images/foreman-gray.png");
	    			$('#xcgzqr'+rowIndex).removeClass().addClass("label-progress-notStart");
	    			$('#qxjdqrimg'+rowIndex).attr("src",webContextRoot+"pages/despages/common/images/tool-gray.png");
	    			$('#qxjdqr'+rowIndex).removeClass().addClass("label-progress-notStart");
	    			$('#yihuidanimg'+rowIndex).attr("src",webContextRoot+"pages/despages/common/images/completed-gray.png");
	    			$('#yihuidan'+rowIndex).removeClass().addClass("label-progress-notStart");
	    			$('#yiguidanimg'+rowIndex).attr("src",webContextRoot+"pages/despages/common/images/folder-gray.png");
	    			$('#yiguidan'+rowIndex).removeClass().addClass("label-progress-notStart");
	    			
	    			$('#jindua'+rowIndex).attr("src",webContextRoot+"pages/despages/common/images/arrow.png");
	    			$('#jindub'+rowIndex).attr("src",webContextRoot+"pages/despages/common/images/arrow-gray.png");
	    			$('#jinduc'+rowIndex).attr("src",webContextRoot+"pages/despages/common/images/arrow-gray.png");
	    			$('#jindud'+rowIndex).attr("src",webContextRoot+"pages/despages/common/images/arrow-gray.png");
	    			$('#jindue'+rowIndex).attr("src",webContextRoot+"pages/despages/common/images/arrow-gray.png");
	    			$('#jinduf'+rowIndex).attr("src",webContextRoot+"pages/despages/common/images/arrow-gray.png");
	    			
	    		}else if(rowData.process=='3'){//状态为到达现场确认时的进度条显示
	    			$('#xfimg'+rowIndex).attr("src",webContextRoot+"pages/despages/common/images/envelope.png");
	    			$('#xf'+rowIndex).removeClass().addClass("label-progress-completed");
	    			$('#jdimg'+rowIndex).attr("src",webContextRoot+"pages/despages/common/images/file.png");
	    			$('#jd'+rowIndex).removeClass().addClass("label-progress-completed");
	    			$('#ddqrimg'+rowIndex).attr("src",webContextRoot+"pages/despages/common/images/worker.png");
	    			$('#ddqr'+rowIndex).removeClass().addClass("label-progress-completed");
	    			$('#xcgzqrimg'+rowIndex).attr("src",webContextRoot+"pages/despages/common/images/foreman-gray.png");
	    			$('#xcgzqr'+rowIndex).removeClass().addClass("label-progress-notStart");
	    			$('#qxjdqrimg'+rowIndex).attr("src",webContextRoot+"pages/despages/common/images/tool-gray.png");
	    			$('#qxjdqr'+rowIndex).removeClass().addClass("label-progress-notStart");
	    			$('#yihuidanimg'+rowIndex).attr("src",webContextRoot+"pages/despages/common/images/completed-gray.png");
	    			$('#yihuidan'+rowIndex).removeClass().addClass("label-progress-notStart");
	    			$('#yiguidanimg'+rowIndex).attr("src",webContextRoot+"pages/despages/common/images/folder-gray.png");
	    			$('#yiguidan'+rowIndex).removeClass().addClass("label-progress-notStart");
	    			
	    			$('#jindua'+rowIndex).attr("src",webContextRoot+"pages/despages/common/images/arrow.png");
	    			$('#jindub'+rowIndex).attr("src",webContextRoot+"pages/despages/common/images/arrow.png");
	    			$('#jinduc'+rowIndex).attr("src",webContextRoot+"pages/despages/common/images/arrow-gray.png");
	    			$('#jindud'+rowIndex).attr("src",webContextRoot+"pages/despages/common/images/arrow-gray.png");
	    			$('#jindue'+rowIndex).attr("src",webContextRoot+"pages/despages/common/images/arrow-gray.png");
	    			$('#jinduf'+rowIndex).attr("src",webContextRoot+"pages/despages/common/images/arrow-gray.png");
	    			
	    		}else if(rowData.process=='4'){//状态为现场故障已确认时的进度条显示
	    			$('#xfimg'+rowIndex).attr("src",webContextRoot+"pages/despages/common/images/envelope.png");
	    			$('#xf'+rowIndex).removeClass().addClass("label-progress-completed");
	    			$('#jdimg'+rowIndex).attr("src",webContextRoot+"pages/despages/common/images/file.png");
	    			$('#jd'+rowIndex).removeClass().addClass("label-progress-completed");
	    			$('#ddqrimg'+rowIndex).attr("src",webContextRoot+"pages/despages/common/images/worker.png");
	    			$('#ddqr'+rowIndex).removeClass().addClass("label-progress-completed");
	    			$('#xcgzqrimg'+rowIndex).attr("src",webContextRoot+"pages/despages/common/images/foreman.png");
	    			$('#xcgzqr'+rowIndex).removeClass().addClass("label-progress-completed");
	    			$('#qxjdqrimg'+rowIndex).attr("src",webContextRoot+"pages/despages/common/images/tool-gray.png");
	    			$('#qxjdqr'+rowIndex).removeClass().addClass("label-progress-notStart");
	    			$('#yihuidanimg'+rowIndex).attr("src",webContextRoot+"pages/despages/common/images/completed-gray.png");
	    			$('#yihuidan'+rowIndex).removeClass().addClass("label-progress-notStart");
	    			$('#yiguidanimg'+rowIndex).attr("src",webContextRoot+"pages/despages/common/images/folder-gray.png");
	    			$('#yiguidan'+rowIndex).removeClass().addClass("label-progress-notStart");
	    			
	    			$('#jindua'+rowIndex).attr("src",webContextRoot+"pages/despages/common/images/arrow.png");
	    			$('#jindub'+rowIndex).attr("src",webContextRoot+"pages/despages/common/images/arrow.png");
	    			$('#jinduc'+rowIndex).attr("src",webContextRoot+"pages/despages/common/images/arrow.png");
	    			$('#jindud'+rowIndex).attr("src",webContextRoot+"pages/despages/common/images/arrow-gray.png");
	    			$('#jindue'+rowIndex).attr("src",webContextRoot+"pages/despages/common/images/arrow-gray.png");
	    			$('#jinduf'+rowIndex).attr("src",webContextRoot+"pages/despages/common/images/arrow-gray.png");
	    			
	    		}else if(rowData.process=='5'){//状态为抢修进度已确认时的进度条显示
	    			$('#xfimg'+rowIndex).attr("src",webContextRoot+"pages/despages/common/images/envelope.png");
	    			$('#xf'+rowIndex).removeClass().addClass("label-progress-completed");
	    			$('#jdimg'+rowIndex).attr("src",webContextRoot+"pages/despages/common/images/file.png");
	    			$('#jd'+rowIndex).removeClass().addClass("label-progress-completed");
	    			$('#ddqrimg'+rowIndex).attr("src",webContextRoot+"pages/despages/common/images/worker.png");
	    			$('#ddqr'+rowIndex).removeClass().addClass("label-progress-completed");
	    			$('#xcgzqrimg'+rowIndex).attr("src",webContextRoot+"pages/despages/common/images/foreman.png");
	    			$('#xcgzqr'+rowIndex).removeClass().addClass("label-progress-completed");
	    			$('#qxjdqrimg'+rowIndex).attr("src",webContextRoot+"pages/despages/common/images/tool.png");
	    			$('#qxjdqr'+rowIndex).removeClass().addClass("label-progress-completed");
	    			$('#yihuidanimg'+rowIndex).attr("src",webContextRoot+"pages/despages/common/images/completed-gray.png");
	    			$('#yihuidan'+rowIndex).removeClass().addClass("label-progress-notStart");
	    			$('#yiguidanimg'+rowIndex).attr("src",webContextRoot+"pages/despages/common/images/folder-gray.png");
	    			$('#yiguidan'+rowIndex).removeClass().addClass("label-progress-notStart");
	    			
	    			$('#jindua'+rowIndex).attr("src",webContextRoot+"pages/despages/common/images/arrow.png");
	    			$('#jindub'+rowIndex).attr("src",webContextRoot+"pages/despages/common/images/arrow.png");
	    			$('#jinduc'+rowIndex).attr("src",webContextRoot+"pages/despages/common/images/arrow.png");
	    			$('#jindud'+rowIndex).attr("src",webContextRoot+"pages/despages/common/images/arrow.png");
	    			$('#jindue'+rowIndex).attr("src",webContextRoot+"pages/despages/common/images/arrow-gray.png");
	    			$('#jinduf'+rowIndex).attr("src",webContextRoot+"pages/despages/common/images/arrow-gray.png");
	    			
	    		}else if(rowData.process=='6'){//状态为已回单时的进度条显示
	    			$('#xfimg'+rowIndex).attr("src",webContextRoot+"pages/despages/common/images/envelope.png");
	    			$('#xf'+rowIndex).removeClass().addClass("label-progress-completed");
	    			$('#jdimg'+rowIndex).attr("src",webContextRoot+"pages/despages/common/images/file.png");
	    			$('#jd'+rowIndex).removeClass().addClass("label-progress-completed");
	    			$('#ddqrimg'+rowIndex).attr("src",webContextRoot+"pages/despages/common/images/worker.png");
	    			$('#ddqr'+rowIndex).removeClass().addClass("label-progress-completed");
	    			$('#xcgzqrimg'+rowIndex).attr("src",webContextRoot+"pages/despages/common/images/foreman.png");
	    			$('#xcgzqr'+rowIndex).removeClass().addClass("label-progress-completed");
	    			$('#qxjdqrimg'+rowIndex).attr("src",webContextRoot+"pages/despages/common/images/tool.png");
	    			$('#qxjdqr'+rowIndex).removeClass().addClass("label-progress-completed");
	    			$('#yihuidanimg'+rowIndex).attr("src",webContextRoot+"pages/despages/common/images/completed.png");
	    			$('#yihuidan'+rowIndex).removeClass().addClass("label-progress-completed");
	    			$('#yiguidanimg'+rowIndex).attr("src",webContextRoot+"pages/despages/common/images/folder-gray.png");
	    			$('#yiguidan'+rowIndex).removeClass().addClass("label-progress-notStart");
	    			
	    			$('#jindua'+rowIndex).attr("src",webContextRoot+"pages/despages/common/images/arrow.png");
	    			$('#jindub'+rowIndex).attr("src",webContextRoot+"pages/despages/common/images/arrow.png");
	    			$('#jinduc'+rowIndex).attr("src",webContextRoot+"pages/despages/common/images/arrow.png");
	    			$('#jindud'+rowIndex).attr("src",webContextRoot+"pages/despages/common/images/arrow.png");
	    			$('#jindue'+rowIndex).attr("src",webContextRoot+"pages/despages/common/images/arrow.png");
	    			$('#jinduf'+rowIndex).attr("src",webContextRoot+"pages/despages/common/images/arrow-gray.png");
	    			
	    		}else if(rowData.process=='7'){//状态为已归档时的进度条显示
	    			$('#xfimg'+rowIndex).attr("src",webContextRoot+"pages/despages/common/images/envelope.png");
	    			$('#xf'+rowIndex).removeClass().addClass("label-progress-completed");
	    			$('#jdimg'+rowIndex).attr("src",webContextRoot+"pages/despages/common/images/file.png");
	    			$('#jd'+rowIndex).removeClass().addClass("label-progress-completed");
	    			$('#ddqrimg'+rowIndex).attr("src",webContextRoot+"pages/despages/common/images/worker.png");
	    			$('#ddqr'+rowIndex).removeClass().addClass("label-progress-completed");
	    			$('#xcgzqrimg'+rowIndex).attr("src",webContextRoot+"pages/despages/common/images/foreman.png");
	    			$('#xcgzqr'+rowIndex).removeClass().addClass("label-progress-completed");
	    			$('#qxjdqrimg'+rowIndex).attr("src",webContextRoot+"pages/despages/common/images/tool.png");
	    			$('#qxjdqr'+rowIndex).removeClass().addClass("label-progress-completed");
	    			$('#yihuidanimg'+rowIndex).attr("src",webContextRoot+"pages/despages/common/images/completed.png");
	    			$('#yihuidan'+rowIndex).removeClass().addClass("label-progress-completed");
	    			$('#yiguidanimg'+rowIndex).attr("src",webContextRoot+"pages/despages/common/images/folder.png");
	    			$('#yiguidan'+rowIndex).removeClass().addClass("label-progress-completed");
	    			
	    			$('#jindua'+rowIndex).attr("src",webContextRoot+"pages/despages/common/images/arrow.png");
	    			$('#jindub'+rowIndex).attr("src",webContextRoot+"pages/despages/common/images/arrow.png");
	    			$('#jinduc'+rowIndex).attr("src",webContextRoot+"pages/despages/common/images/arrow.png");
	    			$('#jindud'+rowIndex).attr("src",webContextRoot+"pages/despages/common/images/arrow.png");
	    			$('#jindue'+rowIndex).attr("src",webContextRoot+"pages/despages/common/images/arrow.png");
	    			$('#jinduf'+rowIndex).attr("src",webContextRoot+"pages/despages/common/images/arrow.png");
	    		}
        }
    });
	
	
	var pager = $('#gdgl-girdDetailView').datagrid("getPager");
	pager.pagination({
		onChangePageSize:function(size){
			pageSize = size;
		}
	});
}

/**
 * 确定tab页工单类型  1待办工单  7历史工单
 */
var index='';
function checkValue(value){
	index = value;
	//loadlabourList();
	labourList();
	if(index == '7'){
		$('#doubleClick').show();
		$('#csgd').hide();
		$('#csgdText').hide();
	}else{
		$('#doubleClick').hide();
		$('#csgd').show();
		$('#csgdText').show();
	}
}

/**
 * 工单信息列表查询
 */
function loadlabourList(){
	if($('#searchTime').combobox('getValue') == 5){
		startTime =  $('#startTime').val();//开始日期
		endTime =  $('#endTime').val();//结束日期
		if(startTime == '' ){
			$.messager.alert('提示', "开始日期不能为空！", 'warning');
			return;
		}else if(endTime == ''){
			$.messager.alert('提示', "结束日期不能为空！", 'warning');
			return;
		}else if(startTime > endTime){
			$.messager.alert('提示', "开始日期不能大于结束日期！", 'warning');
			return;
		}
	}
	
	$('#gdgl-girdDetailView').datagrid("loading");//loading画面
	
	$.post(webContextRoot +'worknoteManage/queryLabour.action', //请求路径
			{'labourListModel.wnNo': $.trim($('#wnNo').textbox('getValue')),//工单编号
		     'labourListModel.sndPers': $.trim($('#sndPers').textbox('getValue')),//派发人
		     'labourListModel.wnGrade': $('#wnGrade').combobox('getValue'),//紧急程度
			 'labourListModel.consId': $.trim($('#consId').combobox('getValue')),//企业
			 'labourListModel.timeType': $('#searchTime').datebox('getValue'),//派发时间
		     'labourListModel.startDate': $('#startTime').datebox('getValue'),//开始时间
		     'labourListModel.endDate': $('#endTime').combobox('getValue'),//结束时间
			 'labourListModel.process': index,//确定tab页工单类型 1待办工单 
			 'labourListModel.pageNo': pageNo,//当前页数
			 'labourListModel.pageSize': pageSize},//每页显示页数
			 
		   	function(data){//回调
		   		    $('#gdgl-girdDetailView').datagrid("loaded");//loading画面关闭
			   		$('#gdgl-girdDetailView').datagrid('loadData', data);//加载数据
		   		if(data.length>0){
			   		$('#gdgl-girdDetailView').datagrid('loadData', data.slice(0,10));//加载0到10的数据
		   		}
				var pager = $('#gdgl-girdDetailView').datagrid("getPager");
				pager.pagination({
					total:data.length,
					pageSize:10,//每页记录数
					pageList: [10,20,30],//可以设置每页记录条数的列表  
					beforePageText:'第',
					afterPageText:'页 共 {pages} 页',
					displayMsg:'当前显示 {from} - {to} 条记录,共 {total} 条记录',
					onSelectPage:function(pageNo,pageSize){
						var start = (pageNo-1)*pageSize;//计算分页数据开始
						var end = start+ pageSize;//计算分页数据结束
						$('#gdgl-girdDetailView').datagrid('loadData',data.slice(start,end));//分页加载每页条目
						pager.pagination('refresh',{
							total:data.length,//总记录条数
							pageNumber:pageNo//页面
						});
					}
				});	
		   	},
		   "json");//返回格式
}

/**
 * 工单信息详情查询   (弹出框)
 */
function getText(wnId){
	$.post(webContextRoot +'worknoteManage/queryLabourOne.action',
	 		   {'labourListModel.wnId': wnId},
	 		   function(data){
	 		    	if(data.length>0){
	 		    		$('#gdgl_gridviewDetailDialog').dialog('setTitle','工单详情--'+data[0].wnNo);
	 		    		$('#gdNo').text(data[0].wnNo);//工单编号
	 		    		$('#sourceName').text(data[0].sourceName);//发现来源
	 		    		$('#severityName').text(data[0].severityName);//缺陷性质
	 		    		$('#founderName').text(data[0].founderName);//发现人
	 		    		$('#dqNo').text(data[0].areaName);//地区
	 		    		$('#qyNo').text(data[0].consName);//用户
	 		    		$('#yhbNo').text(data[0].uTName);//用户变
	 		    		$('#shebei').text(data[0].devSortName+'->'+data[0].devName);//设备
	 		    		$('#pfr').text(data[0].sndPersName);//派发人
	 		    		$('#pdsj').text(data[0].sendTime);//派发时间   .slice(0,data[0].sendTime.indexOf('.'))
	 		    		$('#qxr').text(data[0].chargrPersName);//抢修人
	 		    		$('#xxnr').text(data[0].content);//详细内容
	 		    		$('#shebei').tooltip({    
			 		   		position: 'right',    
			 		   		content: '<span style="color: white;">'+data[0].devSortName+'->'+data[0].devName+'</span>',    
			 		   		onShow: function(){
			 		   			$(this).tooltip('tip').css({
			 		   				backgroundColor: '#666',            
			 		   				borderColor: '#666'        
			 		   			});    
			 		   	}});
	 		    		$('#yhbNo').tooltip({    
			 		   		position: 'right',    
			 		   		content: '<span style="color: white;">'+data[0].uTName+'</span>',    
			 		   		onShow: function(){
			 		   			$(this).tooltip('tip').css({
			 		   				backgroundColor: '#666',            
			 		   				borderColor: '#666'        
			 		   			});    
			 		   	}});
	 		    		$('#qyNo').tooltip({    
			 		   		position: 'right',    
			 		   		content: '<span style="color: white;">'+data[0].consName+'</span>',    
			 		   		onShow: function(){
			 		   			$(this).tooltip('tip').css({
			 		   				backgroundColor: '#666',            
			 		   				borderColor: '#666'        
			 		   			});    
			 		   	}});
	 		    		
	 		    		//清空上传列表
//	 		    		if(uploader!=null) 	clearUploader();
	 		    		//进度图加载  1=派发、2=已接单、3=到达现场已确认、4=故障已确认、5=抢修已确认、6=已回单、7=已归档
	 		    		if(data[0].process=='1'){//派发
	 		    			$('#xiafaimg').attr("src",webContextRoot+"pages/despages/common/images/envelope.png");
	 		    			$('#jiedanimg').attr("src",webContextRoot+"pages/despages/common/images/file-gray.png");
	 		    			$('#xcqrimg').attr("src",webContextRoot+"pages/despages/common/images/worker-gray.png");
	 		    			$('#gzqrimg').attr("src",webContextRoot+"pages/despages/common/images/foreman-gray.png");
	 		    			$('#jdqrimg').attr("src",webContextRoot+"pages/despages/common/images/tool-gray.png");
	 		    			$('#yhdimg').attr("src",webContextRoot+"pages/despages/common/images/completed-gray.png");
	 		    			$('#ygdimg').attr("src",webContextRoot+"pages/despages/common/images/folder-gray.png");
	 		    			
	 		    			$('#xiafa').removeClass().addClass("label-progress-completed");
	 		    			$('#jiedan').removeClass().addClass("label-progress-notStart");
	 		    			$('#xcqr').removeClass().addClass("label-progress-notStart");
	 		    			$('#gzqr').removeClass().addClass("label-progress-notStart");
	 		    			$('#jdqr').removeClass().addClass("label-progress-notStart");
	 		    			$('#yhd').removeClass().addClass("label-progress-notStart");
	 		    			$('#ygd').removeClass().addClass("label-progress-notStart");
	 		    			
	 		    			$('#jindua').attr("src",webContextRoot+"pages/despages/common/images/arrow-gray.png");
	 		    			$('#jindub').attr("src",webContextRoot+"pages/despages/common/images/arrow-gray.png");
	 		    			$('#jinduc').attr("src",webContextRoot+"pages/despages/common/images/arrow-gray.png");
	 		    			$('#jindud').attr("src",webContextRoot+"pages/despages/common/images/arrow-gray.png");
	 		    			$('#jindue').attr("src",webContextRoot+"pages/despages/common/images/arrow-gray.png");
	 		    			$('#jinduf').attr("src",webContextRoot+"pages/despages/common/images/arrow-gray.png");
	 		    			
	 		    			//$('#gdgl_gridviewDetailDialog').dialog('open');
	 		    			$("#gdgl-btnConfirm").show();//现场确认按钮
	 		    			$("#gdgl-btnSubmit").hide();//故障提交按钮
	 		    	        //$("#gdgl-btnCancel").hide();//故障取消按钮
	 		    	        $("#gdgl-wxbtnSubmit").hide();//维修提交按钮
	 		    	        //$("#gdgl-wxbtnCancel").hide();//维修取消按钮
	 		    	        $('#gdgl-btnOk').hide();//确认已完成
	 		    	        $('#gdgl-btnGd').hide();//归档按钮
	 		    	        
	 		    	        $('#fristTr').hide();//故障照片
	 		    	        $('#secondTr').hide();//故障说明
	 		    	        $('#sanTr').hide();//维修照片
	 		    	        $('#siTr').hide();//维修说明
	 		    	        $('#butA').hide();//故障照片上传
	 		    	        $('#butB').hide();//维修照片上传
	 		    			
	 		    		}else if(data[0].process=='2'){//已接单
	 		    			$('#xiafaimg').attr("src",webContextRoot+"pages/despages/common/images/envelope.png");
	 		    			$('#jiedanimg').attr("src",webContextRoot+"pages/despages/common/images/file.png");
	 		    			$('#xcqrimg').attr("src",webContextRoot+"pages/despages/common/images/worker-gray.png");
	 		    			$('#gzqrimg').attr("src",webContextRoot+"pages/despages/common/images/foreman-gray.png");
	 		    			$('#jdqrimg').attr("src",webContextRoot+"pages/despages/common/images/tool-gray.png");
	 		    			$('#yhdimg').attr("src",webContextRoot+"pages/despages/common/images/completed-gray.png");
	 		    			$('#ygdimg').attr("src",webContextRoot+"pages/despages/common/images/folder-gray.png");
	 		    			
	 		    			$('#xiafa').removeClass().addClass("label-progress-completed");
	 		    			$('#jiedan').removeClass().addClass("label-progress-completed");
	 		    			$('#xcqr').removeClass().addClass("label-progress-noStart");
	 		    			$('#gzqr').removeClass().addClass("label-progress-notStart");
	 		    			$('#jdqr').removeClass().addClass("label-progress-notStart");
	 		    			$('#yhd').removeClass().addClass("label-progress-notStart");
	 		    			$('#ygd').removeClass().addClass("label-progress-notStart");
	 		    			
	 		    			$('#jindua').attr("src",webContextRoot+"pages/despages/common/images/arrow.png");
	 		    			$('#jindub').attr("src",webContextRoot+"pages/despages/common/images/arrow-gray.png");
	 		    			$('#jinduc').attr("src",webContextRoot+"pages/despages/common/images/arrow-gray.png");
	 		    			$('#jindud').attr("src",webContextRoot+"pages/despages/common/images/arrow-gray.png");
	 		    			$('#jindue').attr("src",webContextRoot+"pages/despages/common/images/arrow-gray.png");
	 		    			$('#jinduf').attr("src",webContextRoot+"pages/despages/common/images/arrow-gray.png");
	 		    			
	 		    			//$('#gdgl_gridviewDetailDialog').dialog('open');
	 		    			$("#gdgl-btnConfirm").hide();//现场确认按钮
	 		    			$("#gdgl-btnSubmit").hide();//故障提交按钮
	 		    	        //$("#gdgl-btnCancel").hide();//故障取消按钮
	 		    	        $("#gdgl-wxbtnSubmit").hide();//维修提交按钮
	 		    	        //$("#gdgl-wxbtnCancel").hide();//维修取消按钮
	 		    	        $('#gdgl-btnOk').hide();//确认已完成
	 		    	        $('#gdgl-btnGd').hide();//归档按钮
	 		    	        
	 		    	        $('#fristTr').hide();//故障照片
	 		    	        $('#secondTr').hide();//故障说明
	 		    	        $('#sanTr').hide();//维修照片
	 		    	        $('#siTr').hide();//维修说明
	 		    	        $('#butA').hide();//故障照片上传
	 		    	        $('#butB').hide();//维修照片上传
	 		    			
	 		    		}else if(data[0].process=='3'){//到达现场已确认
	 		    			$('#xiafaimg').attr("src",webContextRoot+"pages/despages/common/images/envelope.png");
	 		    			$('#jiedanimg').attr("src",webContextRoot+"pages/despages/common/images/file.png");
	 		    			$('#xcqrimg').attr("src",webContextRoot+"pages/despages/common/images/worker.png");
	 		    			$('#gzqrimg').attr("src",webContextRoot+"pages/despages/common/images/foreman-gray.png");
	 		    			$('#jdqrimg').attr("src",webContextRoot+"pages/despages/common/images/tool-gray.png");
	 		    			$('#yhdimg').attr("src",webContextRoot+"pages/despages/common/images/completed-gray.png");
	 		    			$('#ygdimg').attr("src",webContextRoot+"pages/despages/common/images/folder-gray.png");
	 		    			
	 		    			$('#xiafa').removeClass().addClass("label-progress-completed");
	 		    			$('#jiedan').removeClass().addClass("label-progress-completed");
	 		    			$('#xcqr').removeClass().addClass("label-progress-completed");
	 		    			$('#gzqr').removeClass().addClass("label-progress-notStart");
	 		    			$('#jdqr').removeClass().addClass("label-progress-notStart");
	 		    			$('#yhd').removeClass().addClass("label-progress-notStart");
	 		    			$('#ygd').removeClass().addClass("label-progress-notStart");
	 		    			
	 		    			$('#jindua').attr("src",webContextRoot+"pages/despages/common/images/arrow.png");
	 		    			$('#jindub').attr("src",webContextRoot+"pages/despages/common/images/arrow.png");
	 		    			$('#jinduc').attr("src",webContextRoot+"pages/despages/common/images/arrow-gray.png");
	 		    			$('#jindud').attr("src",webContextRoot+"pages/despages/common/images/arrow-gray.png");
	 		    			$('#jindue').attr("src",webContextRoot+"pages/despages/common/images/arrow-gray.png");
	 		    			$('#jinduf').attr("src",webContextRoot+"pages/despages/common/images/arrow-gray.png");
	 		    			
	 		    			//$('#gdgl_gridviewDetailDialog').dialog('open');
	 		    			$("#gdgl-btnConfirm").hide();//现场确认按钮
	 		    			$("#gdgl-btnSubmit").show();//故障提交按钮
	 		    	        //$("#gdgl-btnCancel").show();//故障取消按钮
	 		    	        $("#gdgl-wxbtnSubmit").hide();//维修提交按钮
	 		    	        //$("#gdgl-wxbtnCancel").hide();//维修取消按钮
	 		    	        $('#gdgl-btnOk').hide();//确认已完成
	 		    	        $('#gdgl-btnGd').hide();//归档按钮
	 		    	        
	 		    	        $('#fristTr').show();//故障照片
	 		    	        $('#secondTr').show();//故障说明
	 		    	        $('#sanTr').hide();//维修照片
	 		    	        $('#siTr').hide();//维修说明
	 		    	        $('#butA').show();//故障照片上传
	 		    	        $('#butB').hide();//维修照片上传
	 		    	        
	 		    	        $list = $("#gzzpShow"); //文件显示的ID位置
	 		    	        $btn = $("#gdgl-btnSubmit"); // 开始上传保存的按钮ID
	 		    	        filePicker = '#butA'; //添加文件的按键ID
	 		    	        //注册上传组件
	 		    	        if(butAuploader == null){
	 		    	        	webuploader();
	 		    	        	butAuploader = uploader;
	 		    	        }else{
	 		    	        	uploader = butAuploader;
	 		    	        }
	 		    	        clearUploader();
	 		    			
	 		    		}else if(data[0].process=='4'){//故障已确认
	 		    			$('#xiafaimg').attr("src",webContextRoot+"pages/despages/common/images/envelope.png");
	 		    			$('#jiedanimg').attr("src",webContextRoot+"pages/despages/common/images/file.png");
	 		    			$('#xcqrimg').attr("src",webContextRoot+"pages/despages/common/images/worker.png");
	 		    			$('#gzqrimg').attr("src",webContextRoot+"pages/despages/common/images/foreman.png");
	 		    			$('#jdqrimg').attr("src",webContextRoot+"pages/despages/common/images/tool-gray.png");
	 		    			$('#yhdimg').attr("src",webContextRoot+"pages/despages/common/images/completed-gray.png");
	 		    			$('#ygdimg').attr("src",webContextRoot+"pages/despages/common/images/folder-gray.png");
	 		    			
	 		    			$('#xiafa').removeClass().addClass("label-progress-completed");
	 		    			$('#jiedan').removeClass().addClass("label-progress-completed");
	 		    			$('#xcqr').removeClass().addClass("label-progress-completed");
	 		    			$('#gzqr').removeClass().addClass("label-progress-completed");
	 		    			$('#jdqr').removeClass().addClass("label-progress-notStart");
	 		    			$('#yhd').removeClass().addClass("label-progress-notStart");
	 		    			$('#ygd').removeClass().addClass("label-progress-notStart");
	 		    			
	 		    			$('#jindua').attr("src",webContextRoot+"pages/despages/common/images/arrow.png");
	 		    			$('#jindub').attr("src",webContextRoot+"pages/despages/common/images/arrow.png");
	 		    			$('#jinduc').attr("src",webContextRoot+"pages/despages/common/images/arrow.png");
	 		    			$('#jindud').attr("src",webContextRoot+"pages/despages/common/images/arrow-gray.png");
	 		    			$('#jindue').attr("src",webContextRoot+"pages/despages/common/images/arrow-gray.png");
	 		    			$('#jinduf').attr("src",webContextRoot+"pages/despages/common/images/arrow-gray.png");

	 		    			//$('#gdgl_gridviewDetailDialog').dialog('open');
	 		    			$("#gdgl-btnConfirm").hide();//现场确认按钮
	 		    			$("#gdgl-btnSubmit").hide();//故障提交按钮
	 		    	        //$("#gdgl-btnCancel").hide();//故障取消按钮
	 		    	        $("#gdgl-wxbtnSubmit").show();//维修提交按钮
	 		    	        //$("#gdgl-wxbtnCancel").show();//维修取消按钮
	 		    	        $('#gdgl-btnOk').hide();//确认已完成
	 		    	        $('#gdgl-btnGd').hide();//归档按钮
	 		    	        
	 		    	        $('#fristTr').show();//故障照片
	 		    	        $('#secondTr').hide();//故障说明
	 		    	        $('#sanTr').show();//维修照片
	 		    	        $('#siTr').show();//维修说明
	 		    	        $('#butA').hide();//故障照片上传
	 		    	        $('#butB').show();//维修照片上传
	 		    	        
	 		    	        $list = $("#wxzpShow"); //文件显示的ID位置
	 		    	        $btn = $("#gdgl-wxbtnSubmit"); // 开始上传保存的按钮ID
	 		    	        filePicker = '#butB'; //添加文件的按键ID
	 		    	        //注册上传组件
	 		    	       if(butBuploader == null){
	 		    	        	webuploader();
	 		    	        	butBuploader = uploader;
	 		    	        }else{
	 		    	        	uploader = butBuploader;
	 		    	        }
	 		    	        clearUploader();
	 		    			
	 		    		}else if(data[0].process=='5'){//抢修已确认
	 		    			$('#xiafaimg').attr("src",webContextRoot+"pages/despages/common/images/envelope.png");
	 		    			$('#jiedanimg').attr("src",webContextRoot+"pages/despages/common/images/file.png");
	 		    			$('#xcqrimg').attr("src",webContextRoot+"pages/despages/common/images/worker.png");
	 		    			$('#gzqrimg').attr("src",webContextRoot+"pages/despages/common/images/foreman.png");
	 		    			$('#jdqrimg').attr("src",webContextRoot+"pages/despages/common/images/tool.png");
	 		    			$('#yhdimg').attr("src",webContextRoot+"pages/despages/common/images/completed-gray.png");
	 		    			$('#ygdimg').attr("src",webContextRoot+"pages/despages/common/images/folder-gray.png");
	 		    			
	 		    			$('#xiafa').removeClass().addClass("label-progress-completed");
	 		    			$('#jiedan').removeClass().addClass("label-progress-completed");
	 		    			$('#xcqr').removeClass().addClass("label-progress-completed");
	 		    			$('#gzqr').removeClass().addClass("label-progress-completed");
	 		    			$('#jdqr').removeClass().addClass("label-progress-completed");
	 		    			$('#yhd').removeClass().addClass("label-progress-notStart");
	 		    			$('#ygd').removeClass().addClass("label-progress-notStart");
	 		    			
	 		    			$('#jindua').attr("src",webContextRoot+"pages/despages/common/images/arrow.png");
	 		    			$('#jindub').attr("src",webContextRoot+"pages/despages/common/images/arrow.png");
	 		    			$('#jinduc').attr("src",webContextRoot+"pages/despages/common/images/arrow.png");
	 		    			$('#jindud').attr("src",webContextRoot+"pages/despages/common/images/arrow.png");
	 		    			$('#jindue').attr("src",webContextRoot+"pages/despages/common/images/arrow-gray.png");
	 		    			$('#jinduf').attr("src",webContextRoot+"pages/despages/common/images/arrow-gray.png");
	 		    			
	 		    			//$('#gdgl_gridviewDetailDialog').dialog('open');
	 		    			$("#gdgl-btnConfirm").hide();//现场确认按钮
	 		    			$("#gdgl-btnSubmit").hide();//故障提交按钮
	 		    	        //$("#gdgl-btnCancel").hide();//故障取消按钮
	 		    	        $("#gdgl-wxbtnSubmit").hide();//维修提交按钮
	 		    	        //$("#gdgl-wxbtnCancel").hide();//维修取消按钮
	 		    	        $('#gdgl-btnOk').show();//确认已完成
	 		    	        $('#gdgl-btnGd').hide();//归档按钮
	 		    	        
	 		    	        $('#fristTr').show();//故障照片
	 		    	        $('#secondTr').hide();//故障说明
	 		    	        $('#sanTr').show();//维修照片
	 		    	        $('#siTr').hide();//维修说明
	 		    	        $('#butA').hide();//故障照片上传
	 		    	        $('#butB').hide();//维修照片上传
	 		    			
	 		    		}else if(data[0].process=='6'){//已回单
	 		    			$('#xiafaimg').attr("src",webContextRoot+"pages/despages/common/images/envelope.png");
	 		    			$('#jiedanimg').attr("src",webContextRoot+"pages/despages/common/images/file.png");
	 		    			$('#xcqrimg').attr("src",webContextRoot+"pages/despages/common/images/worker.png");
	 		    			$('#gzqrimg').attr("src",webContextRoot+"pages/despages/common/images/foreman.png");
	 		    			$('#jdqrimg').attr("src",webContextRoot+"pages/despages/common/images/tool.png");
	 		    			$('#yhdimg').attr("src",webContextRoot+"pages/despages/common/images/completed.png");
	 		    			$('#ygdimg').attr("src",webContextRoot+"pages/despages/common/images/folder-gray.png");
	 		    			
	 		    			$('#xiafa').removeClass().addClass("label-progress-completed");
	 		    			$('#jiedan').removeClass().addClass("label-progress-completed");
	 		    			$('#xcqr').removeClass().addClass("label-progress-completed");
	 		    			$('#gzqr').removeClass().addClass("label-progress-completed");
	 		    			$('#jdqr').removeClass().addClass("label-progress-completed");
	 		    			$('#yhd').removeClass().addClass("label-progress-completed");
	 		    			$('#ygd').removeClass().addClass("label-progress-notStart");
	 		    			
	 		    			$('#jindua').attr("src",webContextRoot+"pages/despages/common/images/arrow.png");
	 		    			$('#jindub').attr("src",webContextRoot+"pages/despages/common/images/arrow.png");
	 		    			$('#jinduc').attr("src",webContextRoot+"pages/despages/common/images/arrow.png");
	 		    			$('#jindud').attr("src",webContextRoot+"pages/despages/common/images/arrow.png");
	 		    			$('#jindue').attr("src",webContextRoot+"pages/despages/common/images/arrow.png");
	 		    			$('#jinduf').attr("src",webContextRoot+"pages/despages/common/images/arrow-gray.png");
	 		    			
	 		    			//$('#gdgl_gridviewDetailDialog').dialog('open');
	 		    			$("#gdgl-btnConfirm").hide();//现场确认按钮
	 		    			$("#gdgl-btnSubmit").hide();//故障提交按钮
	 		    	        //$("#gdgl-btnCancel").hide();//故障取消按钮
	 		    	        $("#gdgl-wxbtnSubmit").hide();//维修提交按钮
	 		    	        //$("#gdgl-wxbtnCancel").hide();//维修取消按钮
	 		    	        $('#gdgl-btnOk').hide();//确认已完成
	 		    	        $('#gdgl-btnGd').show();//归档按钮
	 		    	        
	 		    	        $('#fristTr').show();//故障照片
	 		    	        $('#secondTr').hide();//故障说明
	 		    	        $('#sanTr').show();//维修照片
	 		    	        $('#siTr').hide();//维修说明
	 		    	        $('#butA').hide();//故障照片上传
	 		    	        $('#butB').hide();//维修照片上传
	 		    			
	 		    		}else if(data[0].process=='7'){//已归档
	 		    			$('#xiafaimg').attr("src",webContextRoot+"pages/despages/common/images/envelope.png");
	 		    			$('#jiedanimg').attr("src",webContextRoot+"pages/despages/common/images/file.png");
	 		    			$('#xcqrimg').attr("src",webContextRoot+"pages/despages/common/images/worker.png");
	 		    			$('#gzqrimg').attr("src",webContextRoot+"pages/despages/common/images/foreman.png");
	 		    			$('#jdqrimg').attr("src",webContextRoot+"pages/despages/common/images/tool.png");
	 		    			$('#yhdimg').attr("src",webContextRoot+"pages/despages/common/images/completed.png");
	 		    			$('#ygdimg').attr("src",webContextRoot+"pages/despages/common/images/folder.png");
	 		    			
	 		    			$('#xiafa').removeClass().addClass("label-progress-completed");
	 		    			$('#jiedan').removeClass().addClass("label-progress-completed");
	 		    			$('#xcqr').removeClass().addClass("label-progress-completed");
	 		    			$('#gzqr').removeClass().addClass("label-progress-completed");
	 		    			$('#jdqr').removeClass().addClass("label-progress-completed");
	 		    			$('#yhd').removeClass().addClass("label-progress-completed");
	 		    			$('#ygd').removeClass().addClass("label-progress-completed");
	 		    			
	 		    			$('#jindua').attr("src",webContextRoot+"pages/despages/common/images/arrow.png");
	 		    			$('#jindub').attr("src",webContextRoot+"pages/despages/common/images/arrow.png");
	 		    			$('#jinduc').attr("src",webContextRoot+"pages/despages/common/images/arrow.png");
	 		    			$('#jindud').attr("src",webContextRoot+"pages/despages/common/images/arrow.png");
	 		    			$('#jindue').attr("src",webContextRoot+"pages/despages/common/images/arrow.png");
	 		    			$('#jinduf').attr("src",webContextRoot+"pages/despages/common/images/arrow.png");
	 		    			
	 		    			//$('#gdgl_gridviewDetailDialog').dialog('open');
	 		    			$("#gdgl-btnConfirm").hide();//现场确认按钮
	 		    			$("#gdgl-btnSubmit").hide();//故障提交按钮
	 		    	        //$("#gdgl-btnCancel").hide();//故障取消按钮
	 		    	        $("#gdgl-wxbtnSubmit").hide();//维修提交按钮
	 		    	        //$("#gdgl-wxbtnCancel").hide();//维修取消按钮
	 		    	        $('#gdgl-btnOk').hide();//确认已完成
	 		    	        $('#gdgl-btnGd').hide();//归档按钮
	 		    	        
	 		    	        $('#fristTr').show();//故障照片
	 		    	        $('#secondTr').hide();//故障说明
	 		    	        $('#sanTr').show();//维修照片
	 		    	        $('#siTr').hide();//维修说明
	 		    	        $('#butA').hide();//故障照片上传
	 		    	        $('#butB').hide();//维修照片上传
	 		    		}
	 		    		//弹出的表格
	 		    		getTableText(wnId,data[0].process);
	 		    		
	 		    	}
	 	},"json");
}

/**
 * 窗口切换
 */
function windowChange(){
	$('#gdgl_gridviewDetailDialog').dialog({//工单弹框
        onOpen:function(){
//            $.parser.parse('#gdgl_gridviewDetailDialog');
//            scriptManager.loadScirpt("lightBox",jsPath+"/lightbox/dist/js/lightbox.min.js", true);
        },
        onClose:function(){
        	if(isupdate == '1'){//更新了数据
        		//重新加载工单列表信息
        		//loadlabourList();
        		labourList();
        		//改为没更新
        		isupdate = null;
        		//故障说明附空
        		$('#gztextVal').textbox('setValue','');
        	    //维修说明附空
        		$('#wxtextVal').textbox('setValue','');
        	}
        	
        	//清空图片
    		if($('#imageA_logo').attr("src")!=null){
    	    	$('#imageA_logo').attr("src",null);
    			$('#hrefA').attr("href",null);
    			$('#hrefA').attr("data-lightbox","");
    			$('#logoA').attr("value",null);
    			$('#imageA_logo').hide();
//    			$('#hrefA').hide();
    			$('#logo_butA').hide();
    	    }
    	    if($('#imageB_logo').attr("src")!=null){
    	    	$('#imageB_logo').attr("src",null);
    			$('#hrefB').attr("href",null);
    			$('#hrefB').attr("data-lightbox","");
    			$('#logoB').attr("value",null);
    			$('#imageB_logo').hide();
//    			$('#hrefB').hide();
    			$('#logo_butB').hide();
    	    }
    	    if($('#imageC_logo').attr("src")!=null){
    	    	$('#imageC_logo').attr("src",null);
    			$('#hrefC').attr("href",null);
    			$('#hrefC').attr("data-lightbox","");
    			$('#logoC').attr("value",null);
    			$('#imageC_logo').hide();
//    			$('#hrefC').hide();
    			$('#logo_butC').hide();
    	    }
    	    if($('#imageD_logo').attr("src")!=null){
    	    	$('#imageD_logo').attr("src",null);
    			$('#hrefD').attr("href",null);
    			$('#hrefD').attr("data-lightbox","");
    			$('#logoD').attr("value",null);
    			$('#imageD_logo').hide();
//    			$('#hrefD').hide();
    			$('#logo_butD').hide();
    	    }
    	    if($('#imageE_logo').attr("src")!=null){
    	    	$('#imageE_logo').attr("src",null);
    			$('#hrefE').attr("href",null);
    			$('#hrefE').attr("data-lightbox","");
    			$('#logoE').attr("value",null);
    			$('#imageE_logo').hide();
//    			$('#hrefE').hide();
    			$('#logo_butE').hide();
    	    }
    	    if($('#imageF_logo').attr("src")!=null){
    	    	$('#imageF_logo').attr("src",null);
    			$('#hrefF').attr("href",null);
    			$('#hrefF').attr("data-lightbox","");
    			$('#logoF').attr("value",null);
    			$('#imageF_logo').hide();
//    			$('#hrefF').hide();
    			$('#logo_butF').hide();
    	    }
    	    $list.html("");
    	    
    	    //隐藏列表信息
    	    $('#itr').hide();//第一行tr派发
    	    $('#iitr').hide();//第二行tr接单
    	    $('#iiitr').hide();//第三行tr现场确认
    	    $('#ivtr').hide();//第四行tr故障确认
    	    $('#vtr').hide();//第五行tr抢修确认
    	    $('#vitr').hide();//第六行tr回单
    	    $('#viitr').hide();//第七行tr归档
            
        }
    });
	
//	var scriptManager = {
//		    isLoadlightBoxScript: false,
//		    /**
//		     * 动态加载脚本，需要依赖jquery
//		     **/
//		    loadScirpt: function (scriptName, path, loadOnlyOne) {
//		        switch (scriptName){
//		            case 'lightBox':
//		                if (this.isLoadlightBoxScript == false && loadOnlyOne){
//		                    $.getScript(path);
//		                    this.isLoadlightBoxScript = true;
//		                }
//		                break;
//		            default:
//		                console.log("该脚本名称不能被识别！");
//		                break;
//		        }
//		    }
//	}
	
	//点击现场确认按钮
	$('#gdgl-btnConfirm').bind('click', function(){
		$("#gdgl-btnConfirm").hide();//现场确认按钮
		$("#gdgl-btnSubmit").show();//故障提交按钮
        //$("#gdgl-btnCancel").show();//故障取消按钮
        $("#gdgl-wxbtnSubmit").hide();//维修提交按钮
        //$("#gdgl-wxbtnCancel").hide();//维修取消按钮
        $('#gdgl-btnOk').hide();//确认已完成
        $('#gdgl-btnGd').hide();//归挡
        
        $('#fristTr').show();//故障照片
        $('#secondTr').show();//故障说明
        $('#sanTr').hide();//维修照片
        $('#siTr').hide();//维修说明
        $('#butA').show();//故障照片上传
        $('#butB').hide();//维修照片上传
        //更新状态为现场确认
        updateGd(gdId,3);
        //延迟执行
    	setTimeout(function(){
    		//getTableText(gdId,1);
            //getTableText(gdId,2);
            getTableText(gdId,3);
    	},1000); 
        
	    isupdate = '1';//更新了数据
	    
    });
	
	//点击故障提交按钮
//	$('#gdgl-btnSubmit').bind('click', function(){
//		//故障说明
//		demo = $('#gztextVal').textbox('getValue');  //获取故障说明
//		//alert(demo.length);
//		if(demo.length > 300){
//			$.messager.alert('提示', "处理详情过长！", 'warning');
//			return;
//		}
//		$("#gdgl-btnConfirm").hide();//现场确认按钮
//		$("#gdgl-btnSubmit").hide();//故障提交按钮
//        //$("#gdgl-btnCancel").hide();//故障取消按钮
//        $("#gdgl-wxbtnSubmit").show();//维修提交按钮
//        //$("#gdgl-wxbtnCancel").show();//维修取消按钮
//        $('#gdgl-btnOk').hide();//确认已完成
//        $('#gdgl-btnGd').hide();//归挡
//        
//        $('#fristTr').show();//故障照片
//        $('#secondTr').hide();//故障说明
//        $('#sanTr').show();//维修照片
//        $('#siTr').show();//维修说明
//        $('#butA').hide();//故障照片上传
//        $('#butB').show();//维修照片上传
//        
//        $('#logo_butA').hide();//删除图片的▬
//        $('#logo_butB').hide();//删除图片的▬
//        $('#logo_butC').hide();//删除图片的▬
//        //更新状态为故障提交状态
//        updateGd(gdId,4);
//        //延迟执行
//    	setTimeout(function(){
//    		getTableText(gdId,4);
//    	},1000); 
//        
//	    isupdate = '1';//更新了数据
//    });
	
	//点击维修提交按钮
//	$('#gdgl-wxbtnSubmit').bind('click', function(){
//		//维修说明
//		demo = $('#wxtextVal').textbox('getValue');//获取维修说明
//		if(demo.length > 300){
//			$.messager.alert('提示', "处理详情过长！", 'warning');
//			return;
//		}
//		$("#gdgl-btnConfirm").hide();//现场确认按钮
//		$("#gdgl-btnSubmit").hide();//故障提交按钮
//        //$("#gdgl-btnCancel").hide();//故障取消按钮
//        $("#gdgl-wxbtnSubmit").hide();//维修提交按钮
//        //$("#gdgl-wxbtnCancel").hide();//维修取消按钮
//        $('#gdgl-btnOk').show();//确认已完成
//        $('#gdgl-btnGd').hide();//归挡
//        
//        $('#fristTr').show();//故障照片
//        $('#secondTr').hide();//故障说明
//        $('#sanTr').show();//维修照片
//        $('#siTr').hide();//维修说明
//        $('#butA').hide();//故障照片上传
//        $('#butB').hide();//维修照片上传
//        
//        $('#logo_butA').hide();//删除图片的▬
//        $('#logo_butB').hide();//删除图片的▬
//        $('#logo_butC').hide();//删除图片的▬
//     
//        $('#logo_butD').hide();//删除图片的▬
//        $('#logo_butE').hide();//删除图片的▬
//        $('#logo_butF').hide();//删除图片的▬
//        //更新状态为维修确认状态
//        updateGd(gdId,5);
//        //延迟执行
//    	setTimeout(function(){
//    		getTableText(gdId,5);
//    	},1000); 
//	    
//	    isupdate = '1';//更新了数据
//    });
	
	//点击确认已完成按钮
	$('#gdgl-btnOk').bind('click', function(){
		$("#gdgl-btnConfirm").hide();//现场确认按钮
		$("#gdgl-btnSubmit").hide();//故障提交按钮
        //$("#gdgl-btnCancel").hide();//故障取消按钮
        $("#gdgl-wxbtnSubmit").hide();//维修提交按钮
        //$("#gdgl-wxbtnCancel").hide();//维修取消按钮
        $('#gdgl-btnOk').hide();//确认已完成
        $('#gdgl-btnGd').show();//归挡
        
        $('#fristTr').show();//故障照片
        $('#secondTr').hide();//故障说明
        $('#sanTr').show();//维修照片
        $('#siTr').hide();//维修说明
        $('#butA').hide();//故障照片上传
        $('#butB').hide();//维修照片上传
        
        $('#logo_butA').hide();//删除图片的▬
        $('#logo_butB').hide();//删除图片的▬
        $('#logo_butC').hide();//删除图片的▬
     
        $('#logo_butD').hide();//删除图片的▬
        $('#logo_butE').hide();//删除图片的▬
        $('#logo_butF').hide();//删除图片的▬
        //更新状态为回单
        updateGd(gdId,6);
        //延迟执行
    	setTimeout(function(){
    		getTableText(gdId,6);
    	},1000); 
	    
	    isupdate = '1';//更新了数据
    });
	
	//点击归档按钮
	$('#gdgl-btnGd').bind('click', function(){
		$("#gdgl-btnConfirm").hide();//现场确认按钮
		$("#gdgl-btnSubmit").hide();//故障提交按钮
        //$("#gdgl-btnCancel").hide();//故障取消按钮
        $("#gdgl-wxbtnSubmit").hide();//维修提交按钮
        //$("#gdgl-wxbtnCancel").hide();//维修取消按钮
        $('#gdgl-btnOk').hide();//确认已完成
        $('#gdgl-btnGd').hide();//归挡
        
        $('#fristTr').show();//故障照片
        $('#secondTr').hide();//故障说明
        $('#sanTr').show();//维修照片
        $('#siTr').hide();//维修说明
        $('#butA').hide();//故障照片上传
        $('#butB').hide();//维修照片上传
        
        $('#logo_butA').hide();//删除图片的▬
        $('#logo_butB').hide();//删除图片的▬
        $('#logo_butC').hide();//删除图片的▬
     
        $('#logo_butD').hide();//删除图片的▬
        $('#logo_butE').hide();//删除图片的▬
        $('#logo_butF').hide();//删除图片的▬
        //更新状态为归档
        updateGd(gdId,7);
        //延迟执行
    	setTimeout(function(){
    		getTableText(gdId,7);
    	},1000); 
	    
	    isupdate = '1';//更新了数据
    });
	
	
	/*$('#gdgl-btnCancel').bind('click', function(){//故障取消按钮  ==》  派发
		$("#gdgl-btnConfirm").show();//现场确认按钮
		$("#gdgl-btnSubmit").hide();//故障提交按钮
        $("#gdgl-btnCancel").hide();//故障取消按钮
        $("#gdgl-wxbtnSubmit").hide();//维修提交按钮
        $("#gdgl-wxbtnCancel").hide();//维修取消按钮
        $('#gdgl-btnOk').hide();//确认已完成
        $('#gdgl-btnGd').hide();//归挡
        
        $('#fristTr').hide();//故障照片
        $('#secondTr').hide();//故障说明
        $('#sanTr').hide();//维修照片
        $('#siTr').hide();//维修说明
        $('#butA').hide();//故障照片上传
        $('#butB').hide();//维修照片上传
        
        //alert("工单id="+gdId);
        updateGd(gdId,1);
        //getText(gdId);
        
        getTableText(gdId,1);
        $('#itr').show();//第一行tr派发
        $('#iitr').hide();//第二行tr接单
        $('#iiitr').hide();//第三行tr现场确认
        $('#ivtr').hide();//第四行tr故障确认
        $('#vtr').hide();//第五行tr抢修确认
        $('#vitr').hide();//第六行tr回单
        $('#viitr').hide();//第七行tr归档
        
    });
	
	$('#gdgl-wxbtnCancel').bind('click', function(){//维修取消按钮 ==》 故障提交
		$("#gdgl-btnConfirm").hide();//现场确认按钮
		$("#gdgl-btnSubmit").show();//故障提交按钮
        $("#gdgl-btnCancel").show();//故障取消按钮
        $("#gdgl-wxbtnSubmit").hide();//维修提交按钮
        $("#gdgl-wxbtnCancel").hide();//维修取消按钮
        $('#gdgl-btnOk').hide();//确认已完成
        $('#gdgl-btnGd').hide();//归挡
        
        $('#fristTr').hide();//故障照片
        $('#secondTr').hide();//故障说明
        $('#sanTr').hide();//维修照片
        $('#siTr').hide();//维修说明
        $('#butA').show();//故障照片上传
        $('#butB').hide();//维修照片上传
        
        $('#hrefA').show();//故障图片显示
        $('#hrefB').show();//故障图片显示
        $('#hrefC').show();//故障图片显示
        $('#imageA_logo').show();//故障图片显示
        $('#imageB_logo').show();//故障图片显示
        $('#imageC_logo').show();//故障图片显示
        $('#logo_butA').show();//删除图片的▬
        $('#logo_butB').show();//删除图片的▬
        $('#logo_butC').show();//删除图片的▬
        
        //alert("工单id="+gdId);
        updateGd(gdId,3);
        //getText(gdId);
        
        getTableText(gdId,3);
        $('#itr').show();//第一行tr派发
        $('#iitr').show();//第二行tr接单
        $('#iiitr').show();//第三行tr现场确认
        $('#ivtr').hide();//第四行tr故障确认
        $('#vtr').hide();//第五行tr抢修确认
        $('#vitr').hide();//第六行tr回单
        $('#viitr').hide();//第七行tr归档
    });*/
	
	//选择时间为5.其他时，日期选择
	$('#searchTime').combobox({
        onSelect: function(record){
            if (record.value == "5"){
            	//开始时间
        		$('#startTime').datebox('setValue',startTime1);
        		//结束时间
        		$('#endTime').datebox('setValue',endTime);
        		
                $('#datePicker_panel').show();
            }else{
                $('#datePicker_panel').hide();
            }
        }
    });
	
	//统计按钮默认隐藏
	$('#doubleClick').hide();
}

/**
 * 工单修改
 */
function updateGd(wnId,process){
	var str = '';//照片
	if(process=='4'){//上传 故障已确认 照片
		//获取图片路径
//		if($('#logoA').val()!=""&&$('#logoA').val()!=null){
//			str += $('#logoA').val();
//		}
//		if($('#logoB').val()!=""&&$('#logoB').val()!=null){
//			str += ','+$('#logoB').val();
//		}
//		if($('#logoC').val()!=""&&$('#logoC').val()!=null){
//			str += ','+$('#logoC').val();
//		}
		for(var i in uploadArray){
			str += uploadArray[i].url + ",";
		}
		str = str.substr(0,str.length-1);
		clearUploader();
	}else if(process=='5'){//上传维修 照片
//		if($('#logoD').val()!=""&&$('#logoD').val()!=null){
//			str += $('#logoD').val();
//		}
//		if($('#logoE').val()!=""&&$('#logoE').val()!=null){
//			str += ','+$('#logoE').val();
//		}
//		if($('#logoF').val()!=""&&$('#logoF').val()!=null){
//			str += ','+$('#logoF').val();
//		}
		for(var i in uploadArray){
			str += uploadArray[i].url + ",";
		}
		str = str.substr(0,str.length-1);
		clearUploader();
	}else{
		demo = '';
		str = '';
	}
	$.post(webContextRoot + 'worknoteManage/updateGj.action', //请求路径
			{'labourListModel.wnId':wnId,//id
	         'labourListModel.process':process,//进度
	         'labourJdModel.wnId':wnId,//工单id
	         'labourJdModel.process':process,//工单进度
	         'labourJdModel.operUser':userId,//处理人
	         'labourJdModel.demo':demo,//说明
	         'labourJdModel.photo':str,//照片
	         'labourJdModel.labourType':type
	         },
		   	function(data){//回调
	        	 if(data=="1"){
	        		 getText(gdId);
	        	 }else{
	        		 //alert('修改失败！！！');
	        		 $.messager.alert('提示', "修改失败！", 'warning');
	        		 return;
	        	 }
		   	},
		   "json");//返回格式
}

/**
 * 不同状态点击弹出不同
 */
function labourClick(wnId,process,labourType){
	gdId = wnId;
	if(labourType == '抢修工单'){
		type = '1';
	}else if(labourType == '缺陷工单'){
		type = '2';
	}
	//1.抢修 2.缺陷
	changeType(type);
	//弹出内容
	$('#gdgl_gridviewDetailDialog').dialog('open');
	getText(wnId);
	
}

/**
 * 获取弹框表格数据
 */
function getTableText(wnId,process){
	$.post(webContextRoot +'worknoteManage/queryLabourJd.action',
	 		   {'labourJdModel.wnId': wnId,
		        'labourJdModel.process':process},
	 		   function(data){
	 		    	if(data.length>0){
	 		    		
	 		    		for(var i=0;i<data.length;i++){
	 		    			//$.messager.alert('提示', "成功！");
	 	 		    	   if(data[i].process=='1'){//下发
	 	 		    		   //下发
	 	 		    		   $('#gdpfr').text(data[i].operUserName);
	 	 		    		   $('#gdpfsj').text(data[i].progTime);//.slice(0,data[i].progTime.indexOf('.'))
	 	 		    		   $('#gdpfnr').text(data[i].demo);
	 	 		    		   $('#gdpfnr').tooltip({    
	 				 		   		position: 'right',    
	 				 		   		content: '<span style="color: white;">'+data[i].demo+'</span>',    
	 				 		   		onShow: function(){
	 				 		   			$(this).tooltip('tip').css({
	 				 		   				backgroundColor: '#666',            
	 				 		   				borderColor: '#666'        
	 				 		   			});    
	 				 		   }});
	 	 		    		   $('#itr').show();//第一行tr派发
	 	 		    	   }else if(data[i].process=='2'){//已接单
	 	 		    		   //接单
	 	 		    		   $('#gdjdr').text(data[i].operUserName);
	 	 		    		   $('#gdjdsj').text(data[i].progTime);
	 	 		    		   $('#gdjdnr').text(data[i].demo);
	 	 		    		   $('#gdjdnr').tooltip({    
	 				 		   		position: 'right',    
	 				 		   		content: '<span style="color: white;">'+data[i].demo+'</span>',    
	 				 		   		onShow: function(){
	 				 		   			$(this).tooltip('tip').css({
	 				 		   				backgroundColor: '#666',            
	 				 		   				borderColor: '#666'        
	 				 		   			});    
	 				 		   }});
	 	 		    		   $('#itr').show();//第一行tr派发
	 	 		    		   $('#iitr').show();//第二行tr接单
	 	 		    	   }else if(data[i].process=='3'){//到达现场已确认
	 	 		    		   //现场确认
	 	 		    		   $('#gdxcqrr').text(data[i].operUserName);
	 	 		    		   $('#gdxcqrsj').text(data[i].progTime);
	 	 		    		   $('#gdxcqrnr').text(data[i].demo);
	 	 		    		   $('#gdxcqrnr').tooltip({    
	 				 		   		position: 'right',    
	 				 		   		content: '<span style="color: white;">'+data[i].demo+'</span>',    
	 				 		   		onShow: function(){
	 				 		   			$(this).tooltip('tip').css({
	 				 		   				backgroundColor: '#666',            
	 				 		   				borderColor: '#666'        
	 				 		   			});    
	 				 		   }});
	 	 		    		   $('#itr').show();//第一行tr派发
	 	 		    		   $('#iitr').hide();//第二行tr接单
	 	 		    		   $('#iiitr').show();//第三行tr现场确认
	 	 		    	   }else if(data[i].process=='4'){//现场故障已确认
	 	 		    		   //故障确认
	 	 		    		   $('#gdgzqrr').text(data[i].operUserName);
	 	 		    		   $('#gdgzqrsj').text(data[i].progTime);
	 	 		    		   $('#gdgzqrnr').text(data[i].demo);
	 	 		    		   $('#gdgzqrnr').tooltip({    
	 				 		   		position: 'right',    
	 				 		   		content: '<span style="color: white;">'+data[i].demo+'</span>',    
	 				 		   		onShow: function(){
	 				 		   			$(this).tooltip('tip').css({
	 				 		   				backgroundColor: '#666',            
	 				 		   				borderColor: '#666'        
	 				 		   			});    
	 				 		   }});
	 	 		    		   $('#itr').show();//第一行tr派发
	 	 		    		   $('#iitr').hide();//第二行tr接单
	 	 		    		   $('#iiitr').show();//第三行tr现场确认
	 	 		    		   $('#ivtr').show();//第四行tr故障确认
	 	 		    		   //是否有图片回显
	 	 		    		   var arr = data[i].photo.split(',');
	 	 		    		   
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
	 	 		    		   
	 	 		    	   }else if(data[i].process=='5'){//抢修进度已确认
	 	 		    		   //抢修确认
	 	 		    		   $('#gdqxr').text(data[i].operUserName);
	 	 		    		   $('#gdqxsj').text(data[i].progTime);
	 	 		    		   $('#gdqxnr').text(data[i].demo);
	 	 		    		   $('#gdqxnr').tooltip({    
	 				 		   		position: 'right',    
	 				 		   		content: '<span style="color: white;">'+data[i].demo+'</span>',    
	 				 		   		onShow: function(){
	 				 		   			$(this).tooltip('tip').css({
	 				 		   				backgroundColor: '#666',            
	 				 		   				borderColor: '#666'        
	 				 		   			});    
	 				 		   }});
	 	 		    		   $('#itr').show();//第一行tr派发
	 	 		    		   $('#iitr').hide();//第二行tr接单
	 	 		    		   $('#iiitr').show();//第三行tr现场确认
	 	 		    		   $('#ivtr').show();//第四行tr故障确认
	 	 		    		   $('#vtr').show();//第五行tr抢修确认
	 	 		    		   //是否有图片回显
	 	 		    		   var arr = data[i].photo.split(',');
	 	 		    		   
	 	 		    		   //判断是否有图片
	 	 		    		   if($.trim(arr[0])!=""){
	 	 		    			   	$('#imageD_logo').show();
	 	 		    	    		$('#hrefD').show();
	 	 		    	    		$.ajax({
	 	 		    	    			async : false,
	 	 		    	    			url : webContextRoot + 'pCode/judgeFileExist.action',
	 	 		    	    			data : {downloadFilePath : $.trim(arr[0])},
	 	 		    	    			dataType : "json",
	 	 		    	    			success : function(data) {
	 	 		    	    				if(data.FLAG == "1"){
	 	 		    	    					$('#imageD_logo').attr("src",$.trim(arr[0])==""?null:webContextRoot+$.trim(arr[0]));
	 	 		    	    					$('#hrefD').attr("href",$.trim(arr[0])==""?"":webContextRoot+$.trim(arr[0]));
	 	 		    	    					$('#hrefD').attr("data-lightbox","example-set");
	 	 		    	    					$('#hrefD').removeAttr("onclick");
	 	 		    	    				}else if(data.FLAG == "2"){
	 	 		    	    					$('#imageD_logo').attr("src",webContextRoot+"/pages/despages/common/images/imageNotFound.png");
	 	 		    	    					$('#hrefD').attr("href", "#");
	 	 		    	    					$('#hrefD').attr("onclick", "$.messager.alert('提示', '图片不存在！', 'warning');");
	 	 		    	    					$('#hrefD').removeAttr("data-lightbox");
	 	 		    	    				}
	 	 		    	    			}
	 	 		    	    		});
	 	 		    		   }
	 	 		    		   
	 	 		    		   //判断是否有图片
	 	 		    		   if($.trim(arr[1])!=""){
	 	 		    			   	$('#imageE_logo').show();
	 	 		    	    		$('#hrefE').show();
	 	 		    	    		$.ajax({
	 	 		    	    			async : false,
	 	 		    	    			url : webContextRoot + 'pCode/judgeFileExist.action',
	 	 		    	    			data : {downloadFilePath : $.trim(arr[1])},
	 	 		    	    			dataType : "json",
	 	 		    	    			success : function(data) {
	 	 		    	    				if(data.FLAG == "1"){
	 	 		    	    					$('#imageE_logo').attr("src",$.trim(arr[1])==""?null:webContextRoot+$.trim(arr[1]));
	 	 		    	    					$('#hrefE').attr("href",$.trim(arr[1])==""?"":webContextRoot+$.trim(arr[1]));
	 	 		    	    					$('#hrefE').attr("data-lightbox","example-set");
	 	 		    	    					$('#hrefE').removeAttr("onclick");
	 	 		    	    				}else if(data.FLAG == "2"){
	 	 		    	    					$('#imageE_logo').attr("src",webContextRoot+"/pages/despages/common/images/imageNotFound.png");
	 	 		    	    					$('#hrefE').attr("href", "#");
	 	 		    	    					$('#hrefE').attr("onclick", "$.messager.alert('提示', '图片不存在！', 'warning');");
	 	 		    	    					$('#hrefE').removeAttr("data-lightbox");
	 	 		    	    				}
	 	 		    	    			}
	 	 		    	    		});
	 	 		    		   }
	 	 		    		   
	 	 		    		   //判断是否有图片
	 	 		    		   if($.trim(arr[2])!=""){
	 	 		    			   	$('#imageF_logo').show();
	 	 		    	    		$('#hrefF').show();
	 	 		    	    		$.ajax({
	 	 		    	    			async : false,
	 	 		    	    			url : webContextRoot + 'pCode/judgeFileExist.action',
	 	 		    	    			data : {downloadFilePath : $.trim(arr[2])},
	 	 		    	    			dataType : "json",
	 	 		    	    			success : function(data) {
	 	 		    	    				if(data.FLAG == "1"){
	 	 		    	    					$('#imageF_logo').attr("src",$.trim(arr[2])==""?null:webContextRoot+$.trim(arr[2]));
	 	 		    	    					$('#hrefF').attr("href",$.trim(arr[2])==""?"":webContextRoot+$.trim(arr[2]));
	 	 		    	    					$('#hrefF').attr("data-lightbox","example-set");
	 	 		    	    					$('#hrefF').removeAttr("onclick");
	 	 		    	    				}else if(data.FLAG == "2"){
	 	 		    	    					$('#imageF_logo').attr("src",webContextRoot+"/pages/despages/common/images/imageNotFound.png");
	 	 		    	    					$('#hrefF').attr("href", "#");
	 	 		    	    					$('#hrefF').attr("onclick", "$.messager.alert('提示', '图片不存在！', 'warning');");
	 	 		    	    					$('#hrefF').removeAttr("data-lightbox");
	 	 		    	    				}
	 	 		    	    			}
	 	 		    	    		});
	 	 		    		   }

	 	 		    	   }else if(data[i].process=='6'){//已回单
	 	 		    		   //回单
	 	 		    		   $('#gdhdr').text(data[i].operUserName);
	 	 		    		   $('#gdhdsj').text(data[i].progTime);
	 	 		    		   $('#gdhdnr').text(data[i].demo);
	 	 		    		   $('#gdhdnr').tooltip({    
	 				 		   		position: 'right',    
	 				 		   		content: '<span style="color: white;">'+data[i].demo+'</span>',    
	 				 		   		onShow: function(){
	 				 		   			$(this).tooltip('tip').css({
	 				 		   				backgroundColor: '#666',            
	 				 		   				borderColor: '#666'        
	 				 		   			});    
	 				 		   }});
	 	 		    		   $('#itr').show();//第一行tr派发
	 	 		    		   $('#iitr').hide();//第二行tr接单
	 	 		    		   $('#iiitr').show();//第三行tr现场确认
	 	 		    		   $('#ivtr').show();//第四行tr故障确认
	 	 		    		   $('#vtr').show();//第五行tr抢修确认
	 	 		    		   $('#vitr').show();//第六行tr回单
	 	 		    		   //$('#viitr').hide();//第七行tr归档
	 	 		    	   }else if(data[i].process=='7'){//已归档
	 	 		    		   //归档
	 	 		    		   $('#gdgdr').text(data[i].operUserName);
	 	 		    		   $('#gdgdsj').text(data[i].progTime);
	 	 		    		   $('#gdgdnr').text(data[i].demo);
	 	 		    		   $('#gdgdnr').tooltip({    
	 				 		   		position: 'right',    
	 				 		   		content: '<span style="color: white;">'+data[i].demo+'</span>',    
	 				 		   		onShow: function(){
	 				 		   			$(this).tooltip('tip').css({
	 				 		   				backgroundColor: '#666',            
	 				 		   				borderColor: '#666'        
	 				 		   			});    
	 				 		   }});
	 	 		    		   $('#itr').show();//第一行tr派发
	 	 		    		   $('#iitr').hide();//第二行tr接单
	 	 		    		   $('#iiitr').show();//第三行tr现场确认
	 	 		    		   $('#ivtr').show();//第四行tr故障确认
	 	 		    		   $('#vtr').show();//第五行tr抢修确认
	 	 		    		   $('#vitr').show();//第六行tr回单
	 	 		    		   $('#viitr').show();//第七行tr归档
	 	 		    	   }
	 		    		}
	 		    		
	 		    	}
	 	},"json");
}

/**
 * 点击统计按钮事件
 */
function doubleClick(){
	 
	 var options = {
       name: 'destjfx',          //需要打开的菜单的关键字,必须保证正确
       text: '工单统计',           //打开菜单的标题,可修改
       path: '/des/pages/despages/labour/gdtjfx.jsp'
   };
   top.reloadTabPage(options);
}

function changeType(type){
	if(type == '1'){//抢修
		$('#gdgl-btnSubmit').linkbutton({
    		text : "故障提交"
    	});
    	$('#gdgl-wxbtnSubmit').linkbutton({
    		text : "维修提交"
    	});
		$('#gzzp').text("故障照片：");
		$('#gzsm').text("故障说明：");
		$('#wxzp').text("维修照片：");
    	$('#wxsm').text("维修说明：");
    	$('#gzqrText').text("故障确认");
    	$('#qxqrText').text("抢修确认");
    	
    	$('#gzqr').text("故障已确认");
		$('#jdqr').text("抢修已确认");
		$('#qxfzrText').text("抢修负责人：");
		$('#fxlyText').hide();
		$('#qxxzText').hide();
		$('#sourceName').hide();
		$('#severityName').hide();
		$('#founderName').hide();
		$('#fxrName').hide();
    	
    }else if(type == '2'){//缺陷
    	$('#gdgl-btnSubmit').linkbutton({
    		text : "缺陷提交"
    	});
    	$('#gdgl-wxbtnSubmit').linkbutton({
    		text : "缺陷维修提交"
    	});
    	$('#gzzp').text("缺陷照片：");
    	$('#gzsm').text("缺陷说明：");
    	$('#wxzp').text("消缺照片：");
    	$('#wxsm').text("消缺说明：");
    	$('#gzqrText').text("消缺确认");
    	$('#qxqrText').text("消缺处理");
    	
    	$('#gzqr').text("缺陷确认");
		$('#jdqr').text("消缺处理");
		$('#qxfzrText').text("消缺人：");
		$('#fxlyText').show();
		$('#qxxzText').show();
		$('#sourceName').show();
		$('#severityName').show();
		$('#founderName').show();
		$('#fxrName').show();
    }
}

//获取本周时间
function getDate(){
	
	//alert("周一："+DateUtil.dateToStr('yyyy-MM-dd',monday)+"  周日："+DateUtil.dateToStr('yyyy-MM-dd',sunday));
}
function getFirstDayOfWeek(date){
	var day = date.getDay() || 7;
	return new Date(date.getFullYear(),date.getMonth(),date.getDate()+1-day);
}


/**
 * 初始化webuploader上传组件
 */
function webuploader(){
	
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

		// 只允许选择图片文件。
		accept : {
			title : 'Images',
			extensions : 'gif,jpg,jpeg,bmp,png',
			mimeTypes : '.gif,.jpg,.jpeg,.bmp,.png'
		},
		method : 'POST',

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
		if(!$("#gdgl-btnSubmit").is(":hidden")){
			btnSubmitCommit();
		}else if(!$('#gdgl-wxbtnSubmit').is(":hidden")){
			wxbtnSubmitCommit();
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

	$btn.on('click', function() {
		//前台数据验证  判断当前显示的div
		if(!$("#gdgl-btnSubmit").is(":hidden")){
			if(btnSubmitValidate()){
				uploader.upload();
			}
		}else if(!$('#gdgl-wxbtnSubmit').is(":hidden")){
			if(wxbtnSubmitValidate()){
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
 * 故障提交验证
 */
function btnSubmitValidate(){
	//故障说明
	demo = $('#gztextVal').textbox('getValue');  //获取故障说明
	//alert(demo.length);
	if(demo.length > 300){
		$.messager.alert('提示', "处理详情过长！", 'warning');
		return false;
	}
	return true;
}

/**
 * 故障提交确定
 */
function btnSubmitCommit(){
	$("#gdgl-btnConfirm").hide();//现场确认按钮
	$("#gdgl-btnSubmit").hide();//故障提交按钮
    //$("#gdgl-btnCancel").hide();//故障取消按钮
    $("#gdgl-wxbtnSubmit").show();//维修提交按钮
    //$("#gdgl-wxbtnCancel").show();//维修取消按钮
    $('#gdgl-btnOk').hide();//确认已完成
    $('#gdgl-btnGd').hide();//归挡
    
    $('#fristTr').show();//故障照片
    $('#secondTr').hide();//故障说明
    $('#sanTr').show();//维修照片
    $('#siTr').show();//维修说明
    $('#butA').hide();//故障照片上传
    $('#butB').show();//维修照片上传
    
    $('#logo_butA').hide();//删除图片的▬
    $('#logo_butB').hide();//删除图片的▬
    $('#logo_butC').hide();//删除图片的▬
    //更新状态为故障提交状态
    updateGd(gdId,4);
    //延迟执行
	setTimeout(function(){
		getTableText(gdId,4);
	},1000); 
    
    isupdate = '1';//更新了数据
}

/**
 * 维修提交验证
 */
function wxbtnSubmitValidate(){
	//维修说明
	demo = $('#wxtextVal').textbox('getValue');//获取维修说明
	if(demo.length > 300){
		$.messager.alert('提示', "处理详情过长！", 'warning');
		return false;
	}
	return true;
}

/**
 * 维修提交确定
 */
function wxbtnSubmitCommit(){
	$("#gdgl-btnConfirm").hide();//现场确认按钮
	$("#gdgl-btnSubmit").hide();//故障提交按钮
    //$("#gdgl-btnCancel").hide();//故障取消按钮
    $("#gdgl-wxbtnSubmit").hide();//维修提交按钮
    //$("#gdgl-wxbtnCancel").hide();//维修取消按钮
    $('#gdgl-btnOk').show();//确认已完成
    $('#gdgl-btnGd').hide();//归挡
    
    $('#fristTr').show();//故障照片
    $('#secondTr').hide();//故障说明
    $('#sanTr').show();//维修照片
    $('#siTr').hide();//维修说明
    $('#butA').hide();//故障照片上传
    $('#butB').hide();//维修照片上传
    
    $('#logo_butA').hide();//删除图片的▬
    $('#logo_butB').hide();//删除图片的▬
    $('#logo_butC').hide();//删除图片的▬
 
    $('#logo_butD').hide();//删除图片的▬
    $('#logo_butE').hide();//删除图片的▬
    $('#logo_butF').hide();//删除图片的▬
    //更新状态为维修确认状态
    updateGd(gdId,5);
    //延迟执行
	setTimeout(function(){
		getTableText(gdId,5);
	},1000); 
    
    isupdate = '1';//更新了数据
}
