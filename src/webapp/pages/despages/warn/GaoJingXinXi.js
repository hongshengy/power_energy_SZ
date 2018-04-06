/**wz
 * 
 */
var alarmColor = null;//告警级别颜色
//7007 颜色的集合
var colorList='';
var dataDate = new Date();
var flag = true;
var flagIndex = 1;
var pageSize = 20;

var resFlag = false;
var st = null;

$(function(){
	
	$.getJSON(webContextRoot  +'gjdj/queryGjxxpz.action', //颜色的集合
			  function(json){
		       colorList = json;
			}
		);
	
	if(gaojing ==1){//告警
		$.getJSON(webContextRoot  +'pCode/queryCode.action', 
			  { 'codeSortId':70026},
			  function(json){
				  var sjList = [];
				  for(var i=0;i<json.length;i++){
					  var d = new Object();
					  d.codeValue = json[i].codeValue;
					  d.codeName = json[i].codeName;
					  sjList.push(d);
				  }
				  var zdzd = new Object();
				  zdzd.codeValue = '99';
				  zdzd.codeName = '终端中断';
				  sjList.push(zdzd);
				  
				  var cjzd = new Object();
				  cjzd.codeValue = '98';
				  cjzd.codeName = '采集中断';
				  sjList.push(cjzd);
				  $('#shijian').combobox({
					valueField:'codeValue',
					textField:'codeName',
					data:sjList  
				});
			}
		);
	}else if(bianwei == 1){//变位
		$("#startDate").val(DateUtil.dateToStr('yyyy-MM-dd HH:mm:ss',DateUtil.dateAdd('d',-1,dataDate)));
		$("#endDate").val(DateUtil.dateToStr('yyyy-MM-dd HH:mm:ss',dataDate));
		$('#shijian').combobox({
			valueField:'id',
			textField:'text',
			data:[{    
			    "id":'',    
			    "text":"请选择"   
			},{    
			    "id":'1',    
			    "text":"合->分"   
			},{    
			    "id":'0',    
			    "text":"分->合"   
			}]  
		});
	}
	
	$("#dssx").click(function (){
		var s = document.getElementById("dssx").checked;
		if(s){
			flag = true;
		}else{
			flag = false;
		} 
	});
	gaojingList();
	
	st = setInterval(function(){
		if(flag){
			if(resFlag){
				gaojingList();
				resFlag = false;
			}
		}
	},5000);
	
})

//关闭窗口
function closeGJSetInterval(){
	flag = false;
}

function paifagongdan(deviceId1,deviceType1,mpId1,consId1){//派发工单弹出页
	var content = "<iframe src='pages/despages/labour/PaiFaGongDan.jsp?consId="+consId1+"&userTranId="+userId+"&devId="+deviceId1+"&deviceType="+deviceType1+"&mpId="+mpId1+"&isFlag="+1+"&widthFlag=1' width='100%' height='99%' frameborder='0' scrolling='no'/>";	
	var boardddiv = "<div id='msgwin' title='工单派送'/>";
	$(document.body).append(boardddiv);
	var win = $("#msgwin").dialog({
		content : content,
		width : document.body.clientWidth*0.6,
		height : document.body.clientHeight-80,
		modal : 'shadow',
		title : '工单派送',
		onClose : function() {
			if(pfFlag){
				loadData();
			}
//			loadData();
		}
	});
}

var clearTimeoutFlag;//临时变量  
//根据颜色编码获取颜色名称
function getColorText(alarmColor){
	 clearTimeout(clearTimeoutFlag);
	   for(var i=0;i<colorList.length;i++){
		  if(colorList[i].alarmLevel == alarmColor){
			  return colorList[i].alarmColorCode;
		  }
	   }
	return '';
}

var pfFlag = false; 
 
function paifachuli(){
	pfFlag = true;
	 $("#msgwin").dialog("close");
	gaojingList();
}

//忽略
function chuli(mpid){
	$.messager.confirm('确认', '是否忽略该信息？', function(r){
		if(r){	
			$.post(webContextRoot +'warn/querygaojingchaxunshouyeadd.action', //请求路径
				{
					'gaoJIngChaXunSYModel.mpId' :mpid,
					'gaoJIngChaXunSYModel.userId' :userId,
					'gaoJIngChaXunSYModel.bianwei': 1
				},//请求参数
			   	function(data){
					var ste = JSON.stringify(data)
					if(ste.indexOf("success")){
						$.messager.alert('提示', "忽略成功!", 'warning');
						
						gaojingList();
					}else{
						$.messager.alert('提示', "忽略失败!", 'warning');
					}
			})
		}
	}); 
}	

//查询告警信息
function loadData(){
	var columns = [];
	if(consName == '' || consName == null || consName.length ==0){
		columns = [[
			{field:'consName',title:'客户',width:'15%',align:'center'},
			{field:'subsName',title:'用户变',width:'10%',align:'center',formatter:function(v,row,index){
				if(row.subsName == null){
					return '';
				}else{
					return '<a  style="color:blue;" onclick="openyctWindow('
			        +"'"+row.consId+"','"+row.subsId+"'"
					+ ')">'
					+ ""+row.subsName+""
					+ '</a>';
				}
			}},
		    {field:'deviceName',title:'设备名称',width:'8%',align:'center'},
		    {field:'deviceTypeName',title:'设备类型',width:'5%',align:'center'},
		    {field:'alarmLevel',title:'告警等级',width:'10%',align:'center', formatter: function (index, row) {
		    	return "<span style='vertical-align:middle;color:"+getColorText(row.alarmLevel)+";'>"+row.alarmLevelName+"</span>";
		    }},
		    {field:'alarmDesc',title:'告警描述',width:'15%',align:'center'},
		    {field:'alarmStartTime',title:'告警时间',width:'15%',align:'center'},
		    {field:'alarmValue',title:'告警发生值',width:'6%',align:'center'},
		    {field:'mpCode',title:'事件类型',width:'6%',align:'center', formatter: function (index, row) {
	        	  if(row.mpCode =='01'){
	        		  return '遥控';
	        	  }else if(row.mpCode =='02'){
	        		  return '遥信';
	 			  }else if(row.mpCode =='03'){
		              return '遥测';
	 			  }else if(row.mpCode =='04'){
		        	  return '遥脉';
	 			  }else if(row.mpCode =='99'){
	 				 return '终端中断';
	 			  }else if(row.mpCode =='98'){
	 				 return '采集中断';
	 			  }
              }},
		    {field:'hulue',title:'操作',width:'10%',align:'center',formatter: function(v,row,index){ //超链接
		        return '<a  style="color:blue;" onclick="paifagongdan('
		        +"'"+row.deviceId+"','"+row.deviceType+"','"+row.mpId+"','"+row.consId+"'"
				+ ')">'
				+ ""+"派发工单"
				+ '</a><a style="color:blue;margin-left:20px" onclick="chuli('
				+ row.mpId
				+ ')">'
				+ v
				+ '</a>';
		    }}
		]];
	}else{
		columns = [[
			{field:'consName',title:'客户',width:'25%',align:'center'},
			{field:'subsName',title:'用户变',width:'10%',align:'center',formatter:function(v,row,index){
				if(row.subsName == null){
					return '';
				}else{
					return '<a  style="color:blue;" onclick="openyctWindow('
			        +"'"+row.consId+"','"+row.subsId+"'"
					+ ')">'
					+ ""+row.subsName+""
					+ '</a>';
				}
			}},
		    {field:'deviceName',title:'设备名称',width:'8%',align:'center'},
		    {field:'deviceTypeName',title:'设备类型',width:'5%',align:'center'},
		    {field:'alarmLevel',title:'告警等级',width:'10%',align:'center', formatter: function (index, row) {
		    	return "<span style='vertical-align:middle;color:"+getColorText(row.alarmLevel)+";'>"+row.alarmLevelName+"</span>";
		    }},
		    {field:'alarmDesc',title:'告警描述',width:'15%',align:'center'},
		    {field:'alarmStartTime',title:'告警时间',width:'15%',align:'center'},
		    {field:'alarmValue',title:'告警发生值',width:'6%',align:'center'},
		    {field:'mpCode',title:'事件类型',width:'6%',align:'center', formatter: function (index, row) {
	        	  if(row.mpCode =='01'){
	        		  return '遥控';
	        	  }else if(row.mpCode =='02'){
	        		  return '遥信';
	 			  }else if(row.mpCode =='03'){
		              return '遥测';
	 			  }else if(row.mpCode =='04'){
		        	  return '遥脉';
	 			  }else if(row.mpCode =='99'){
	 				 return '终端中断';
	 			  }else if(row.mpCode =='98'){
	 				 return '采集中断';
	 			  }
              }}
		]];
	}
	
	var startDate =  $('#startDate').val();//开始日期
	var endDate =  $('#endDate').val();//结束日期

	if(startDate != '' && endDate != ''){
		if(startDate > endDate){
			$("#dssx").eq(0).attr("checked",false);
			
			flag = false;
			$.messager.alert('提示', "开始日期不能大于结束日期！", 'warning');
			$('#gjcx-datagrid').datagrid("loaded");
			return;
		}
	}
	
	
	$('#gjcx-datagrid').datagrid({// 表格
		nowrap : false,// 设置为true，当数据长度超出列宽时将会自动截取。
		striped : true,// 设置为true将交替显示行背景。
		border:false,
		fit:true,
//	    tools:"#btThrees",
		pagination : true,// 设置true将在数据表格底部显示分页工具栏。
		fitColumns : true,// 自动适应宽度
		singleSelect : true,// 设置为true将只允许选择一行。
		rownumbers : true,// 设置为true将显示行数。
		pageNumber:1,//在设置分页属性的时候初始化页码。
		pageSize:pageSize,//在设置分页属性的时候初始化页面大小。
		url:webContextRoot +'warn/queryRealTimeAlarm.action',
		queryParams:{
			'gaoJIngChaXunSYModel.subsId' :subsId,
			'gaoJIngChaXunSYModel.bianwei' :0,
			'gaoJIngChaXunSYModel.gaojing' :1,
			'gaoJIngChaXunSYModel.mpCode' :$('#shijian').combobox('getValue'),
			'gaoJIngChaXunSYModel.alarmStartTime' :startDate,
			'gaoJIngChaXunSYModel.alarmEndTime' :endDate,
			'gaoJIngChaXunSYModel.consId': consId == 'null'?'':consId,
			'gaoJIngChaXunSYModel.deviceType': '',
			'gaoJIngChaXunSYModel.dataDate': '5',
			'gaoJIngChaXunSYModel.confirmFlag': '',
			'gaoJIngChaXunSYModel.mpId': '',
			'gaoJIngChaXunSYModel.alarmLevel': '',
			'gaoJIngChaXunSYModel.queryAlarmType' : '1'
		},
		onLoadSuccess : function() {// 加载数据之后
//			$('#dataGrid').datagrid('selectRow', 0); // 选择第一行
		},
		loadMsg : "正在努力的读取数据中...",// 提示信息
		columns : columns,
		loadFilter: function(data){
			resFlag = true;
			if (data.sMap){
				return data.sMap;
			} else {
				return data;
			}
		}
	});
	
	var pager = $('#gjcx-datagrid').datagrid("getPager");
	pager.pagination({
		onChangePageSize:function(size){
			pageSize = size;
		}
	});

}


// 查询变位信息
function gaojingList(){
	if(gaojing ==1){
		loadData();
	}else if(bianwei == 1){
		var startDate =  $('#startDate').val();//开始日期
		var endDate =  $('#endDate').val();//结束日期
		if(startDate> endDate){
			$.messager.alert('提示', "开始日期不能大于结束日期！", 'warning');
			return;
		}
		var columns = [[
		            {field:'consName',title:'客户',width:'15%',align:'center'},
		            {field:'subsName',title:'用户变',width:'15%',align:'center'},
		   		    {field:'deviceName',title:'设备名称',width:'15%',align:'center'},
		   		    {field:'deviceTypeName',title:'设备类型',width:'15%',align:'center'},
		   		    {field:'alarmStartTime',title:'发生时间',width:'15%',align:'center'},
		   		    {field:'preValue',title:'变位事件',width:'15%',align:'center',formatter: function(v,row,index){ //超链接
		   		    	if(row.preValue == null || row.preValue == "" || row.curValue == null || row.curValue == ""){
		   		    		return "";
		   		    	}else{
		   		    		return  row.preValue+'->'+row.curValue;
		   		    	}			    		
				    }},
//		   		    {field:'hulue',title:'忽略',width:'15%',align:'left',formatter: function(v,row,index){ //超链接
//		   		        return '<a style="color:blue" onclick="chuli('
//		   				+ row.mpId
//		   				+ ')">'
//		   				+ v
//		   				+ '</a>';
//		   		    }},
		   		]];
		$('#gjcx-datagrid').datagrid({// 表格
			nowrap : false,// 设置为true，当数据长度超出列宽时将会自动截取。
			striped : true,// 设置为true将交替显示行背景。
			border:false,
			 width:'100%',
		      height:'100%',
			pagination : true,// 设置true将在数据表格底部显示分页工具栏。
			fitColumns : false,// 自动适应宽度
			singleSelect : true,// 设置为true将只允许选择一行。
			rownumbers : true,// 设置为true将显示行数。
			pageNumber:1,//在设置分页属性的时候初始化页码。
			pageSize:20,//在设置分页属性的时候初始化页面大小。
			url:webContextRoot +'warn/querygaojingchaxunshouyebianwei.action',
			queryParams:{
				'gaoJIngChaXunSYModel.subsId' :subsId,
				'gaoJIngChaXunSYModel.bianwei' :bianwei,
				'gaoJIngChaXunSYModel.gaojing' :gaojing,
				'gaoJIngChaXunSYModel.eventId' :eventId,
				'gaoJIngChaXunSYModel.orgNo' :$('#shijian').combobox('getValue'),
				'gaoJIngChaXunSYModel.alarmStartTime' :startDate,
				'gaoJIngChaXunSYModel.alarmEndTime' :endDate,
				'gaoJIngChaXunSYModel.consId' : consId == 'null'?'':consId
			},
			loadMsg : "正在努力的读取数据中...",// 提示信息
			columns : columns,//字段
			loadFilter: function(data){
				resFlag = true;
				if (data.sMap){
					return data.sMap;
				} else {
					return data;
				}
			}
		});
	}
}

//一次图跳转
function openyctWindow(consId,subsId){
	var options = {
	        name: 'desyhbjk',               //需要打开的菜单的关键字,必须保证正确
	        text: '一次图监控',           //打开菜单的标题,可修改
	        path: '/des/pages/despages/monitor/userMonitor.jsp?consId='+consId+'&userTranId='+subsId
	    };
	    top.reloadTabPage(options);
	    //关闭当前窗口
	    parent.window.testClose();
}
