/**
 * 告警测点配置
 * @author zhou_qiang
 * @since 2017-03-07
 */

//告警级别下拉信息
var queryCodeCurret = '';
//请求服务端的数据集
var alarmArr = new Array(); 

//第一次页面是否加载查询标识
var isFristone = false;
var isFristtwo = false;
var isFristthree = false;
var isFristym = false;

//遥信数据集
var yxData;
//遥测数据集
var ycData;
//遥脉数据集
var ymData;


//遥信Id后缀标识集合
var yxKey = [];
//遥测Id后缀标识集合
var ycKey = [];
//遥脉Id后缀标识集合
var ymKey = [];

//用于存放访问Tab信息 （具体体现在在操作某个测点类型）
var tabArr = 't';

//用于查询关键字YX（遥信）  -----模糊查询
var cxYxKey = null;
//用于查询关键字Yc(遥测)  -----模糊查询
var cxYcKey = null;
//用于查询关键字Ym （遥脉） -----模糊查询
var cxYmKey = null;

//总数量
var totalCount;
//当前页数
var indexCount = 1;
//当前界面一次查询总数
var pageSizeCount=10;


var tabIndex = 0;

$(function(){
	//获取所属区域能源编码值，注：因前端不清楚获取该属性值，故传入0代替不为空使用，并在service层赋值
	$.getJSON(webContextRoot + 'gjdj/queryGjxxpz.action', {},
		function(json){
		  queryCodeCurret = json; //第一次加载获取告警级别下拉信息，并设置全局变量，供后续使用。
		  userTabsSelect("",0);
		}
	);
	//遥信关键字输入框
	$('#yxCxInput').textbox({    
		onChange: function(newValue, oldValue )  {
			var tempYxKey = newValue;
			cxYxKey = $.trim(tempYxKey.toLowerCase());//输入值赋值给遥信关键字
		}    
	});
	
	//遥信分页栏
	$('#ppYx').pagination({
		total: 0,
		pageSize: 10,
		onSelectPage:function(pageNumber, pageSize){
//			console.log("触发onSelectPage");
//			//当前页数
//		    indexCount =pageNumber;
//			//当前界面一次查询总数
//			pageSizeCount = pageSize;
			//重新加载遥信表格
			loadDateYx();
			
		},onRefresh:function(pageNumber, pageSize){
			//当前页数
//		    indexCount =pageNumber;
//		    //当前界面一次查询总数
//			pageSizeCount = pageSize;
			
		} 
	});
	
	//遥测关键字输入框
	 $('#ycCxInput').textbox({    
			onChange: function(newValue, oldValue )  {
				var tempYcKey = newValue;
				cxYcKey = $.trim(tempYcKey.toLowerCase());
			}    
		});
	 
	 //遥测
	 $('#ppYc').pagination({
			total: 0,
			pageSize: 10,
			onSelectPage:function(pageNumber, pageSize){
//			   indexCount =pageNumber;
//
//				//当前界面一次查询总数
//				pageSizeCount = pageSize;
				loadDateYc();

			},onRefresh:function(pageNumber, pageSize){
//				console.log("触发onRefresh");
//				//当前页数
//			    indexCount =pageNumber;
//
//					//当前界面一次查询总数
//				pageSizeCount = pageSize;
			
			} 
		});
	 
	 //遥脉输入框
	 $('#ymCxInput').textbox({    
			onChange: function(newValue, oldValue )  {
				var tempYmkey = newValue;
				cxYmKey = $.trim(tempYmkey.toLowerCase());
			}    
		});
	 
	 //遥脉分页栏
		$('#ppYm').pagination({
			total: 0,
			pageSize: 10,
			onSelectPage:function(pageNumber, pageSize){
				//当前页数
//			   indexCount =pageNumber;
//				//当前界面一次查询总数
//				pageSizeCount = pageSize;
				//重新加载遥脉表格
				loadDateYm();

			},onRefresh:function(pageNumber, pageSize){
				//当前页数
//			    indexCount =pageNumber;
//				//当前界面一次查询总数
//				pageSizeCount = pageSize;
			} 
		});
	
});


/**
 *分布加载tab页选项
 *title	tab页名称
 *index tab页下标 
 */
function userTabsSelect(title,index){
	if(!!!queryCodeCurret)return;
	tabIndex = index;
	//页面选择Tab页信息所触发的事件
	if(index == 3 && isFristym == false){//tab属性页中的遥测页面
		loadDateYm();
		isFristym = true;
		tabArr = tabArr + ',3';
	}//页面选择Tab页信息所触发的事件
	else if(index == 2 && isFristthree == false){//tab属性页中的遥测页面
		loadDateYc();
		isFristthree = true;
		
		tabArr = tabArr + ',2';
	}else if(index == 1 && isFristtwo == false){//tab属性页中的遥信页面
		loadDateYx();
		isFristtwo = true;
		
		tabArr = tabArr + ',1';
	}else if(index == 0 && isFristone == false){//tab属性页中的首页页面
		//加载告警等级下拉框信息
		loadComboboxValue('sel_cjzd',function(){
			loadComboboxValue('sel_zdgz',loadSaveData);
		});
		isFristone = true;
		
		tabArr = tabArr + ',0';
	}
}

/**
 * 加载告警测点配置的参数封装
 */
function loadAlarmData(){
	//获取首页采集中断数据
	var cjzd = new Object();
	cjzd.adId = $('#td_cjzd').val();
	cjzd.alarmType = '2';
	cjzd.alId = $('#sel_cjzd').combobox('getValue');
	alarmArr.push(cjzd);
	
	//获取首页终端故障数据
	var zdgz = new Object();
	zdgz.adId = $('#td_zdgz').val();
	zdgz.alarmType = '3';
	zdgz.alId = $('#sel_zdgz').combobox('getValue');
	alarmArr.push(zdgz);
	
	//获取遥信页面数据
	for(var i=0;i<yxKey.length;i++){
		var key = yxKey[i];
		if($('#yxCheck'+key).is(':checked')){
			var yx = new Object();
			yx.adId = $('#yxadId'+key).html();
			yx.signalState = $('#yx_sel_gjzt'+key).combobox('getValue');
			yx.alId = $('#yx_sel_gjjb'+key).combobox('getValue');
			yx.mpId = $('#yxmpId'+key).html();
			yx.mpType = $('#yxmpType'+key).html();
			yx.mpName = $('#yxName'+key).html();
			yx.mpCode = $('#yxmpCode'+key).html();
			alarmArr.push(yx);
		}
	}
	
	
	//获取遥测页面数据
	for(var i = 0;i<ycKey.length; i++){
		var key = ycKey[i];
		var yc = new Object();
		yc.adId = $('#ycadId'+key).html();
		yc.alId = $('#yc_sel_gjjb'+key).combobox('getValue');
		yc.mpId = $('#ycmpId'+key).html();
		yc.mpType = $('#ycmpType'+key).html();
		yc.mpName = $('#ycName'+key).html();
		yc.mpCode = $('#ycmpCode'+key).html();
		yc.percUpper = $('#ycpercUpper'+key).numberbox('getValue');
		yc.percLower = $('#ycpercLower'+key).numberbox('getValue');
		alarmArr.push(yc);
		
	}
	
	//获取遥脉页面数据
	for(var i = 0;i<ymKey.length; i++){
		var key = ymKey[i];
		var ym = new Object();
		ym.adId = $('#ymadId'+key).html();
		ym.alId = $('#ym_sel_gjjb'+key).combobox('getValue');
		ym.mpId = $('#ymmpId'+key).html();
		ym.mpType = $('#ymmpType'+key).html();
		ym.mpName = $('#ymName'+key).html();
		ym.mpCode = $('#ymmpCode'+key).html();
		ym.percUpper = $('#ympercUpper'+key).numberbox('getValue');
		ym.percLower = $('#ympercLower'+key).numberbox('getValue');
		alarmArr.push(ym);
	}
}

/**
 * 查询告警等级信息，并加载
 * @param name combobox的ID
 * @param success
 */
function loadComboboxValue(name,success){
	//给指定ID设置下拉选项值
	$('#'+name).combobox({
		data:queryCodeCurret,
		valueField: 'alId',
		textField: 'alarmName'
	});
	if(!!success){
		success();
	}
}

/**
 * 加载采集中断等级配置Tab页信息
 */
function loadSaveData(){
	$.post(webContextRoot +'gjcd/queryAlarmInfo.action', //查询告警测点配置信息路径
//		{'alarmModel.mpType':'99'},//测点类型参数；99-在数据中99不存在，只是前端
	   	function(data){//回调
			for(var i=0;i<data.length;i++){
		 		if(data[i].alarmType == '2'){//判断告警类型为2--采集中断
		 			$('#sel_cjzd').combobox('setValue',data[i].alId);
		 			$('#td_cjzd').val(data[i].adId);
		 		}else if(data[i].alarmType == '3'){//判断告警类型为3--终端故障
		 			$('#sel_zdgz').combobox('setValue',data[i].alId);
		 			$('#td_zdgz').val(data[i].adId);
		 		}
			}
   	},"json");//返回格式
}

var yxflag = '';

/**
 * 查询遥信告警测点配置信息并加载
 */
function loadDateYx(){
	//获取所属分页总数量值
	$.getJSON(webContextRoot + 'gjcd/queryAlarmCount.action', {
			'alarmModel.mpType':'02',
			'alarmModel.mpKey':cxYxKey
			},
		function(json){
				var	pageCountYx = json.count; //获取总数量
					$('#ppYx').pagination('refresh');	// 刷新分页栏信息
					$('#ppYx').pagination('refresh',{	// 改变选项并刷新分页栏信息
					total: pageCountYx,
				});
		});
	var splineChart = document.getElementById('yxsj-panel');
	showWaitDisplayForQuery(splineChart,"0");
	
	//动态加载遥信表格
	 var str = '';//初始化遥信表格添加样式
	 str += '<table cellpadding="2">';
	 str += '<tbody>';
	 var options = $('#ppYx').pagination('options');
	 if(yxFlag == true){
		 options.pageNumber = 1;
		 options.pageSize = 10;
		 yxFlag = false;
	 }
	 $.post(webContextRoot +'gjcd/queryAlarmAndConfigInfo.action', //查询告警测点配置信息路径
		{
		 'alarmModel.mpType':'02',//02-遥信类型
		 'alarmModel.index':options.pageNumber==0?1:options.pageNumber,//当前页数
		 'alarmModel.pageCount':options.pageSize,//当前每页查询数量
		 'alarmModel.mpKey':cxYxKey//遥信关键字  不输入为null
		},//测点类型参数；02-遥信类型
	   	function(data){//回调
			
			disWaitDisplayForQuery("0");//关闭loading框
			yxKey = [];
			yxflag = '';
			yxData = data;
			//遍历遥信类型数据集合
			for(var i =0;i<data.length;i++){
				var d = data[i];
				if(i == (data.length - 1)){
					yxflag = yxflag + '\'' + d[0].mpCode + '\'';
				}else{
					yxflag = yxflag + '\'' + d[0].mpCode + '\',';
				}
				for(var j = 0;j<d.length;j++){
					//定义遥信动态ID后缀标识
					var k = i+"I"+j;
					//放入遥信动态集合中，方便之后取值和赋值操作
					yxKey.push(k);
					
					str += '<tr>';
			 		str += '<td id="yxadId'+k+'" style="display:none">'+d[j].adId+'</td>';
			 		if(d[j].adId != null && d[j].adId != ''){ //验证获取数据是否存在，并设置选中状态
			 			str += '<td width="200px"><input id="yxCheck'+k+'" type="checkbox" checked="checked">'+d[j].mpName+'('+d[j].mpCode+')</input></td>';
			 		}else{
			 			str += '<td width="200px"><input id="yxCheck'+k+'" type="checkbox">'+d[j].mpName+'('+d[j].mpCode+')</input></td>';
			 		}
			 		str += '<td id="yxmpType'+k+'" style="display:none">02</td>';
			 		str += '<td id="yxmpId'+k+'" style="display:none">'+d[j].mpId+'</td>';
			 		str += '<td id="yxmpCode'+k+'" style="display:none">'+d[j].mpCode+'</td>';
			 		str += '<td id="yxName'+k+'" style="display:none">'+d[j].mpName+'</td>';
			 		str += '<td width="100px">告警状态:</td>';
			 		str += '<td width="100px">';
			 		str += '<select id="yx_sel_gjzt'+k+'" class="easyui-combobox" data-options="width:72,panelWidth:72,editable:false" >';
			 		str += '</select>';
			 		str += '</td>';
			 		str += '<td width="100px">告警级别:</td>';
			 		str += '<td width="100px">';
			 		str += '<select id="yx_sel_gjjb'+k+'" class="easyui-combobox" data-options="width:80,panelWidth:80,editable:false" ></select>';
			 		str += '</td>';
			 		str += '</tr>';
				}		
			}
			
			str += '</tbody>';
			str += '</table>';
			$("#yxTable").empty();
			$("#yxTable").append(str);//把动态拼接好的页面元素放入对应panel容器中
			$.parser.parse('#yxTable'); //渲染组件
			
			//循环给遥信页面中的下拉信息添加元素
			for(var i=0;i<yxKey.length;i++){
				var key = yxKey[i];
				//告警状态下拉元素
				$('#yx_sel_gjzt'+key).combobox({
					data: [  
								{
								"value" : "0",
								"text" : "分",
								"selected":"true"
								},
								{
								"value" : "1",
								"text" : "合"
								}
							 ],
					onSelect:function(rec){
					},
					onChange : function(rec){
					}
				});
				//告警级别下拉元素
				loadComboboxValue('yx_sel_gjjb'+key);
				
				//获取后台遥信数据并为告警状态，告警级别下拉赋值
				var pIndex = key.split("I");
		 		$('#yx_sel_gjzt'+key).combobox('setValue',yxData[pIndex[0]][pIndex[1]].signalState);
		 		$('#yx_sel_gjjb'+key).combobox('setValue',yxData[pIndex[0]][pIndex[1]].alId);
			}
			
   	},"json");//返回格式
}
 
var ycIndex = 0;
var ycflag = '';
/**
 * 查询遥测告警测点配置信息并加载
 */
function loadDateYc(){
	var splineChart = document.getElementById('ycsj-panel');
	showWaitDisplayForQuery(splineChart,"1");	
	

	//获取所属分页总数量值
	$.getJSON(webContextRoot + 'gjcd/queryAlarmCount.action', {
		'alarmModel.mpType':'03',
		'alarmModel.mpKey':cxYcKey
	
			},
		function(json){
		var	pageCountYc = json.count; //获取总数量
//			alert(pageCount);
			$('#ppYc').pagination('refresh');	// 刷新分页栏信息
			$('#ppYc').pagination('refresh',{	// 改变选项并刷新分页栏信息
				total: pageCountYc,
			});
		}
	);
	 var options = $('#ppYc').pagination('options');
	 if(ycFlag == true){
		 options.pageNumber = 1;
		 options.pageSize = 10;
		 ycFlag = false;
	 }
	 $.post(webContextRoot +'gjcd/queryAlarmAndConfigInfo.action', //查询告警测点配置信息路径
		{
			 'alarmModel.mpType':'03',
			 'alarmModel.index':options.pageNumber==0?1:options.pageNumber,//页码
			 'alarmModel.pageCount':options.pageSize,//每页多少条
			 'alarmModel.mpKey':cxYcKey//模糊查询
			
		},//测点类型参数；03-为遥测类型
	   	function(data){//回调
			
			disWaitDisplayForQuery("1");//关闭loading框
			//把后台数据赋给遥测全局变量
			ycData = data;
			//每次请求把之前的Key值清空
			ycKey = [];
			ycflag = '';
			var str='';
			//页面元素展示与遥信一致
			for(var i =0;i<data.length;i++){
				var d = data[i];
				
				var ycIn = indexCount+'yc'+i;
				var strycIn = "'"+ycIn+"'";
				var id = "'#pb"+ycIn+"'";
				var addId = "'p"+ycIn+"'"; 
				
				if(i == (data.length - 1)){
					ycflag = ycflag + '\'' + d[0].mpCode + '\'';
				}else{
					ycflag = ycflag + '\'' + d[0].mpCode + '\',';
				}
				str += '<div style="width: 470px;position: relative;box-sizing: border-box;padding-right: 2px;">';
				str += '<div id="pb'+ycIn+'">';
				str += '<a href="#" class="icon-add" style="height:16px;" onclick="addTr('+addId+','+strycIn+')"></a>';
				str += '</div>';
				str += '<div id="p'+ycIn+'" class="easyui-panel" style="width:100%" title="'+d[0].mpName+'('+d[0].mpCode + ')" data-options="collapsible:true,collapsed:true,tools:'+id+'">';
				str += '<table cellpadding="2">';
				str += '<colgroup>';
				
				str += '<col width="80px"/>';
				str += '<col width="50px"/>';
				str += '<col width="80px"/>';
				str += '<col width="50px"/>';
				str += '<col width="65px"/>';
				str += '<col width="100px"/>';
				str += '<col width="35px"/>';
				str += '<col />';
				str += '</colgroup>';
			
				str += '<tbody>';
				for(var j = 0;j<d.length;j++){
					if(d[j].alId != ''){
						var k = ycIn+"I"+j;
						var del = "'"+k+"'";
						//放入遥测动态集合中，方便之后取值和赋值操作
						ycKey.push(k);
						
						var one = "ycpercUpper"+k;
				 		var two = "ycpercLower"+k;
						
						str += '<tr id="tr'+k+'">';
						
				 		str += '<td >上限百分比:</td>';
				 		str += '<td ><input id="'+one+'" class="easyui-numberbox" style="width:50px" value="'+d[j].percUpper+'" data-options="min:-9999.9999,max:9999.9999,precision:4,onChange:function(){ycChecked()}" ></input></td>';
				 		str += '<td >下限百分比:</td>';
				 		str += '<td ><input id="'+two+'" class="easyui-numberbox" style="width:50px" value="'+d[j].percLower+'" data-options="min:-9999.9999,max:9999.9999,precision:4,onChange:function(){ycChecked()}"></input></td>';
				 		str += '<td >告警级别:</td>';
				 		str += '<td ><select id="yc_sel_gjjb'+k+'" class="easyui-combobox" data-options="width:100,panelWidth:100,editable:false,onSelect:function(){ycChecked()}" ></select></td>';
				 		str += '<td ><div class="icon-remove addOrDelBtn del" onclick="delTr(event,'+del+')" /></td>';
				 		
				 		str += '<td style="display:none">'
							+ '<lable id="ycadId'+k+'" style="display:none">'+d[j].adId+'</lable>'
							+ '<lable id="ycName'+k+'" style="display:none">'+d[j].mpName+'</lable>'
							+ '<lable id="ycmpType'+k+'" style="display:none">03</lable>'
							+ '<lable id="ycmpId'+k+'" style="display:none">'+d[j].mpId+'</lable>'
							+ '<lable id="ycmpCode'+k+'" style="display:none">'+d[j].mpCode+'</lable></td>';
				 		str += '</tr>';
					}
					
				}
				str += '</tbody>';
				str += '</table>';
				str += '</div>';
				
				str += '</div>';
			}
			$("#ycTable").empty();
			$("#ycTable").append(str);//把动态拼接好的页面元素放入对应panel容器中
			
			$.parser.parse('#ycTable'); //渲染组件
			
			//循环给遥测页面中的下拉信息添加元素
			for (var sI = 0; sI < ycKey.length; sI ++){
				if(ycKey[sI].split("yc")[0] == indexCount){
					
					loadComboboxValue("yc_sel_gjjb" + ycKey[sI]);//遥测下拉元素
					//遥测上限百分比输入值校验
					$('#ycpercUpper'+ycKey[sI]).numberbox({    
					    required: true,
					    validType:"gts['"+ycKey[sI]+"','yc']",
					});
					//遥测下限百分比输入值校验
					$('#ycpercLower'+ycKey[sI]).numberbox({    
					    required: true,    
					    validType:"lts['"+ycKey[sI]+"','yc']",
					});
					//遥测告警级别下拉选择输入值校验
					$('#yc_sel_gjjb'+ycKey[sI]).combobox({	
						required: true,
					    validType:"checked['"+ycKey[sI]+"','yc']",
					});
					var pIndex = ycKey[sI].split("yc")[1].split("I");
					//获取后台遥信数据并为告警状态，告警级别下拉赋值 
					$('#yc_sel_gjjb'+ycKey[sI]).combobox('setValue',ycData[pIndex[0]][pIndex[1]].alId);
				}
				
			}
   	},"json");//返回格式
	 
}

var ymIndex = 0;
var ymflag = '';
/**
 * 王梓璇
 * 查询遥脉告警测点配置信息并加载
 */
function loadDateYm(){
	var splineChart = document.getElementById('ymsj-panel');
	showWaitDisplayForQuery(splineChart,"2");	
	
	//获取所属分页总数量值
	$.getJSON(webContextRoot + 'gjcd/queryAlarmCount.action', {
		'alarmModel.mpType':'04',
		'alarmModel.mpKey':cxYmKey
		},
		function(json){
		var	pageCountYm = json.count; //获取总数量
			$('#ppYm').pagination('refresh');	// 刷新分页栏信息
			$('#ppYm').pagination('refresh',{	// 改变选项并刷新分页栏信息
				total: pageCountYm,
			});
		}
	);
	var options = $('#ppYm').pagination('options');
	if(ymFlag == true){
		options.pageNumber = 1;
		options.pageSize = 10;
		ymFlag = false;
	}
	 $.post(webContextRoot +'gjcd/queryAlarmAndConfigInfo.action', //查询告警测点配置信息路径
		{
			 'alarmModel.mpType':'04',
			 'alarmModel.index':options.pageNumber==0?1:options.pageNumber,
			 'alarmModel.pageCount':options.pageSize,
			 'alarmModel.mpKey':cxYmKey
		
		},//测点类型参数；03-为遥测类型
	   	function(data){//回调
			disWaitDisplayForQuery("2");//关闭loading框
			//把后台数据赋给遥测全局变量
			ymData = data;
			//每次请求把之前的Key值清空
			ymKey = [];
			ymflag = '';
			var str='';
			
			//页面元素展示与遥信一致
			for(var i =0;i<data.length;i++){
				var d = data[i];
				var ymIn = indexCount+'ym'+i;
				var strymIn = "'"+ymIn+"'";
				var id = "'#ympb"+ymIn+"'";
				var addId = "'ymp"+ymIn+"'"; 
				
				if(i == (data.length - 1)){
					ymflag = ymflag + '\'' + d[0].mpCode + '\'';
				}else{
					ymflag = ymflag + '\'' + d[0].mpCode + '\',';
				}
				
				str += '<div style="width: 470px;position: relative;box-sizing: border-box;padding-right: 2px;">';
				str += '<div id="ympb'+ymIn+'">';
				str += '<a href="#" class="icon-add" style="height:16px;" onclick="addTrYm('+addId+','+strymIn+')"></a>';
				str += '</div>';
				str += '<div id="ymp'+ymIn+'" class="easyui-panel" style="width:100%" title="'+d[0].mpName+'('+d[0].mpCode + ')" data-options="collapsible:true,collapsed:true,tools:'+id+'">';
				str += '<table cellpadding="2">';
				str += '<colgroup>';
				str += '<col width="80px"/>';
				str += '<col width="50px"/>';
				str += '<col width="80px"/>';
				str += '<col width="50px"/>';
				str += '<col width="65px"/>';
				str += '<col width="100px"/>';
				str += '<col width="35px"/>';
				str += '<col />';
				str += '</colgroup>';
				
				str += '<tbody>';
							
				for(var j = 0;j<d.length;j++){
					if(d[j].alId != ''){
						var k = ymIn+"I"+j;
						var del = "'"+k+"'";
						//放入遥脉动态集合中，方便之后取值和赋值操作
						ymKey.push(k);
						
						var one = "ympercUpper"+k;
				 		var two = "ympercLower"+k;
						
						str += '<tr id="tr'+k+'">';
				 		
				 		str += '<td >上限百分比:</td>';
				 		str += '<td ><input id="'+one+'" class="easyui-numberbox" style="width:50px" value="'+d[j].percUpper+'" data-options="min:-9999.9999,max:9999.9999,precision:4,onChange:function(){ymChecked()}"></input></td>';
				 		str += '<td >下限百分比:</td>';
				 		str += '<td ><input id="'+two+'" class="easyui-numberbox" style="width:50px" value="'+d[j].percLower+'" data-options="min:-9999.9999,max:9999.9999,precision:4,onChange:function(){ymChecked()}"></input></td>';
				 		str += '<td >告警级别:</td>';
				 		str += '<td ><select id="ym_sel_gjjb'+k+'" class="easyui-combobox" data-options="width:100,panelWidth:100,editable:false,onSelect:function(){ymChecked()}" ></select></td>';
				 		str += '<td ><div class="icon-remove addOrDelBtn del" onclick="delTrYm(event,'+del+')" /></td>';
				 		
				 		str +='<td style="display:none">'
							+'<lable id="ymadId'+k+'" style="display:none">'+d[j].adId+'</lable>'
							+'<lable id="ymName'+k+'" style="display:none">'+d[j].mpName+'</lable>'
							+'<lable id="ymmpType'+k+'" style="display:none">04</lable>'
							+'<lable id="ymmpId'+k+'" style="display:none">'+d[j].mpId+'</lable>'
							+'<lable id="ymmpCode'+k+'" style="display:none">'+d[j].mpCode+'</lable></td>';
				 		str += '</tr>';
					}
				}
				
				str += '</tbody>';
				str += '</table>';
				str += '</div>';
				
				str += '</div>';
			}
			$("#ymTable").empty();
			$("#ymTable").append(str);//把动态拼接好的页面元素放入对应panel容器中
			
			$.parser.parse('#ymTable'); //渲染组件
			
			//循环给遥脉页面中的下拉信息添加元素
			for (var sI = 0; sI < ymKey.length; sI ++){
				if(ymKey[sI].split("ym")[0] == indexCount){
					loadComboboxValue("ym_sel_gjjb" + ymKey[sI]);//遥测下拉元素
					//遥脉上限百分比输入值校验
					$('#ympercUpper'+ymKey[sI]).numberbox({    
					    required: true,
					    validType:"gts['"+ymKey[sI]+"','ym']",
					});
					//遥脉下限百分比输入值校验
					$('#ympercLower'+ymKey[sI]).numberbox({    
					    required: true,    
					    validType:"lts['"+ymKey[sI]+"','ym']",
					});
					//遥脉告警级别下拉选择输入值校验
					$('#ym_sel_gjjb'+ymKey[sI]).combobox({	
						required: true,
					    validType:"checked['"+ymKey[sI]+"','ym']",
					});
					var pIndex = ymKey[sI].split("ym")[1].split("I");
					//获取后台遥脉数据并为告警状态，告警级别下拉赋值
					$('#ym_sel_gjjb'+ymKey[sI]).combobox('setValue',ymData[pIndex[0]][pIndex[1]].alId);
				}
			}
   	},"json");//返回格式
}

//校验状态
var isCheck = true;
//页面上下限输入框部分校验
$.extend($.fn.validatebox.defaults.rules, {    
    lts: {//校验内容：下限值必须小于上限制
        validator: function(value, param){
        	var f = value;
        	var t = $("#"+param[1]+"percUpper"+param[0]).numberbox("getValue");
        	var temp = parseFloat(f) < parseFloat(t);
        	
        	if(isCheck == false&&temp){
        		isCheck = true;
        		setTimeout(function(){
	            	$("#"+param[1]+"percUpper"+param[0]).numberbox("validate");	
            	},200);
			}else{
				isCheck = false;
				
			}
        	//设置2s之后加载校验
        	setTimeout(function(){
            	$("#"+param[1]+"_sel_gjjb"+param[0]).combobox("validate");
            }, 200);
            return temp;    
        },    
        message: '下限值必须小于上限制'   
    },
    gts:{//校验状态：上限值必须大于下限值
    	validator: function(value, param){
    		var f = value;
        	var t = $("#"+param[1]+"percLower"+param[0]).numberbox("getValue");
            var temp = parseFloat(f) > parseFloat(t);    
            
            if(isCheck == false&&temp){
            	isCheck = true;
            	setTimeout(function(){
	            	$("#"+param[1]+"percLower"+param[0]).numberbox("validate");	
            	},200);
			}else{
				isCheck = false;
				
			}
            //设置2s之后加载校验
            setTimeout(function(){
            	$("#"+param[1]+"_sel_gjjb"+param[0]).combobox("validate");
            }, 200);
            return temp;
        },    
        message: '上限值必须大于下限值'   
    },
    checked:{//校验状态：告警级别的下拉选择和上限，下线百分比的输入值验证
    	validator: function(value, param){
    		var keys = param[0].split("I");
    		var idArr = [];
    		$.each($("#p"+keys[0]+" tr"),function(i,n){  //查找遥测行元素
    			var ids = $(n).attr("id").substr(2);  //获取行元素ID,并截取出子组件KEY
				var cbVal = $("#"+param[1]+"_sel_gjjb"+ids).combobox('getText');  //获取下拉组件id
				if(ids == param[0]){  //如果是当前组件，则使用value赋值，
					cbVal = value;
				}
				$.each(queryCodeCurret,function(j,t){  //遍历下拉列表数据
					if(t.alarmName == cbVal){ //判断下拉组件id对应的列表数据
						var temp = {};
						temp.ids = ids;
						temp.alId = t.alId;
						temp.alarmLevel = t.alarmLevel;
						temp.alarmName = t.alarmName;
						idArr.push(temp);
						return false;
					}
				});
    		});
    		
    		$.each($("#ymp"+keys[0]+" tr"),function(i,n){  //查找遥脉行元素
    			var ids = $(n).attr("id").substr(2);  //获取行元素ID,并截取出子组件KEY
				var cbVal = $("#"+param[1]+"_sel_gjjb"+ids).combobox('getText');  //获取下拉组件id
				if(ids == param[0]){  //如果是当前组件，则使用value赋值，
					cbVal = value;
				}
				$.each(queryCodeCurret,function(j,t){  //遍历下拉列表数据
					if(t.alarmName == cbVal){ //判断下拉组件id对应的列表数据
						var temp = {};
						temp.ids = ids;
						temp.alId = t.alId;
						temp.alarmLevel = t.alarmLevel;
						temp.alarmName = t.alarmName;
						idArr.push(temp);
						return false;
					}
				});
    		});
    		
    		if(idArr.length < 2){
    			return true;
    		}
    		var selected = null;
    		var isDouble = false;  //用于判断是否重复告警
    		$.each(idArr,function(l,o){
    			if(o.alarmName == value){ //获取当前验证的下拉列表对应的数据
    				if(selected != null){
    					isDouble = true;
    				}
    				selected = o;
    			}
    		});
    		if(isDouble){
    			return false;
    		}
    		if(selected == null){
    			return false;
    		}
    		//需要验证的页面Tr元素数组
    		var checkItemArr = [];
    		var minCheckItem = null;
    		var maxCheckItem = null;
    		//查找临近的小告警
    		$.each(idArr,function(z,x){
    			if(x.alId == selected.alId){
    			}else if(minCheckItem == null&&parseFloat(x.alarmLevel) < parseFloat(selected.alarmLevel)){
    				minCheckItem = x;
    			}else if(minCheckItem&&parseFloat(x.alarmLevel) > parseFloat(minCheckItem.alarmLevel)&&parseFloat(x.alarmLevel) < parseFloat(selected.alarmLevel)){
    				minCheckItem = x;
    			}
    		});
    		if(minCheckItem!=null){
    			checkItemArr.push(minCheckItem);
    		}
    		
    		//查找临近的大告警
    		$.each(idArr,function(ff,g){
    			if(g.alId == selected.alId){
    				
    			}else if(maxCheckItem == null&&parseFloat(g.alarmLevel) > parseFloat(selected.alarmLevel)){
    				maxCheckItem = g;
    			}else if(maxCheckItem&&parseFloat(g.alarmLevel) < parseFloat(maxCheckItem.alarmLevel)&&parseFloat(g.alarmLevel) > parseFloat(selected.alarmLevel)){
    				maxCheckItem = g;
    			}
    		});
    		if(maxCheckItem!=null){
    			checkItemArr.push(maxCheckItem);
    		}
    		
    		if(checkItemArr.length < 1){
    			return false;
    		}
    		var isMax = false;
    		var isMin = false;
    		//遍历tr元素数组
    		for(var s = 0; s < checkItemArr.length; s++){
    			var tempCheck = checkItemArr[s];
    			//选择下拉告警级别的对应上限值
    			var one_upper = parseFloat($("#"+param[1]+"percUpper"+selected.ids).numberbox('getValue'));
    			//选择下拉告警级别的对应下限值
        		var one_lower = parseFloat($("#"+param[1]+"percLower"+selected.ids).numberbox('getValue'));
        		//需要比对的上限值
        		var two_upper = parseFloat($("#"+param[1]+"percUpper"+tempCheck.ids).numberbox('getValue'));
        		//需要比对的下限值
        		var two_lower = parseFloat($("#"+param[1]+"percLower"+tempCheck.ids).numberbox('getValue'));
        		
        		if(one_upper>two_upper && one_lower>two_lower && selected.alarmLevel < tempCheck.alarmLevel){//此段是验证所选择的级别要高于临近记录级别信息
        			isMax = true;
        		}else if(one_upper<two_upper && one_lower<two_lower && selected.alarmLevel > tempCheck.alarmLevel){//此段是验证所选择的级别要低于临近记录级别信息
        			isMin = true;
        		}
    		}
    		
    		//综合校验
    		if(minCheckItem!=null&&maxCheckItem!=null){
    			return isMax&&isMin;
    		}else if(minCheckItem!=null){
    			return isMin;
    		}else if(maxCheckItem!=null){
    			return isMax;
    		}
            return false;
            
        },    
        message: '当前告警级别的数值设置有误！'   
    }
});



function ycChecked(){
	$('#ycForm').form('validate');
}
function ymChecked(){
	$('#ymForm').form('validate');
}

function fmVal(v){
	if(typeof(v) != undefined ){
		var str = v;
		var val = '';
		var vv = str.split(".");
		if(vv[1] > 0){
			val = vv[0]+vv[1];
		}else{
			val = vv[0];
		}
		return Number(val);
	}else{
		return 0;
	}
}


/**
 * 保存按钮
 */
function cxSave(){
	var ycfg = $('#ycForm').form('validate');
	var ymfg = $('#ymForm').form('validate');
	if(ycfg && ymfg){
		//加载告警测点配置的参数封装
		loadAlarmData();
		
		//提交后台服务端，请求新增操作
		$.getJSON(webContextRoot +'gjcd/insertAlarmDifDeploy.action', //处理告警测点配置信息路径
			{'jsonStr' : JSON.stringify(alarmArr), //获取封装JSON后的参数
			'tabArr' : tabArr,
			'yxflag' : yxflag,
			'ycflag' : ycflag,
			'ymflag' : ymflag
			},
		   	function(data){//回调
				$.messager.alert('确认', "保存成功！", 'info');
	   	},"json");//返回格式
		
		//改变三层tab页的状态，使其点击tab页可以重新加载
		isFristone = false;
		isFristtwo = false;
		isFristthree = false;
		alarmArr= [];
	}else{
		$.messager.alert('提示', "参数设置有误！", 'info');
		return;
	}
	
}

/**
 * 取消按钮
 */
function cxClose(){
	if(tabIndex==0){
		loadComboboxValue('sel_cjzd',function(){
			loadComboboxValue('sel_zdgz',loadSaveData);
		});
	}else if(tabIndex==1){
		loadDateYx();
	}else if(tabIndex==2){
		loadDateYc();
	}else if(tabIndex==3){
		loadDateYm();
	}
	
//	$('#gjxxpz-cl-panel').dialog('close');
}

/**
 * 新增一条遥测数据记录
 * @param id 该记录追加在某个容器中
 * @param i 追加在哪个元素下
 */
function addTr(id,i){
	$('#'+id).panel('expand');
	
	// p 2yc1I0 addTr('p1yc0',1yc0)
	var alarmCount = 0;
	for(var j=0;j<ycKey.length;j++){
		if(ycKey[j].split("yc")[0] == i.split("yc")[0] && ycKey[j].split("yc")[1].split("I")[0] == i.split("yc")[1]){
			alarmCount++;
		}
	}
	if(queryCodeCurret.length <= alarmCount){
		$.messager.alert('提示', "告警级别配置超出上限！", 'info', function(r){
    	});
		return;
	}
	var index = i.split("yc");
	//初始化遥测信息，并设置初始值
	var alarm = ycData[index[1]][0];
	var newAlarm = {};
	newAlarm.mpName = alarm.mpName;
	newAlarm.mpId = alarm.mpId;
	newAlarm.mpCode = alarm.mpCode;
	//2yc1I0
	var k = i+"I"+ycData[index[1]].length;
	var del = "'"+k+"'";
	ycData[index[1]].push(newAlarm);
	ycKey.push(k);
	
	//页面元素内容
	$("#ycsj-panel #"+id+" tbody").append(
			'<tr id="tr'+k+'">'+
				'<td id="ycadId'+k+'" style="display:none"></td>'+
				'<td id="ycName'+k+'" style="display:none">'+newAlarm.mpName+'</td>'+
				'<td id="ycmpType'+k+'" style="display:none">03</td>'+
				'<td id="ycmpId'+k+'" style="display:none">'+newAlarm.mpId+'</td>'+
				'<td id="ycmpCode'+k+'" style="display:none">'+newAlarm.mpCode+'</td>'+
				'<td width="75px">'+
					'上限百分比:'+
				'</td>'+
				'<td width="50px">'+
					'<input id="ycpercUpper'+k+'" class="easyui-numberbox" style="width:50px" data-options="min:-9999.9999,max:9999.9999,precision:4,onChange:function(){ycChecked()}"></input>'+
				'</td>'+
				'<td width="75px">'+
					'下限百分比:'+
				'</td>'+
				'<td width="50px">'+
					'<input id="ycpercLower'+k+'" class="easyui-numberbox" style="width:50px" data-options="min:-9999.9999,max:9999.9999,precision:4,onChange:function(){ycChecked()}"></input>'+
				'</td>'+
				'<td width="60px">'+
					'告警级别:'+
				'</td>'+
				'<td width="100px">'+
					'<select id="yc_sel_gjjb'+k+'" class="easyui-combobox" data-options="width:100,panelWidth:100,editable:false,onSelect:function(){ycChecked()}">'+
                    '</select>'+
				'</td>'+
				'<td width="35px">'+
				'<div class="icon-remove addOrDelBtn del" onclick="delTr(event,'+del+')" />'+
			'</td>'+
			'</tr>'
    	);
	//遥测下拉元素
	loadComboboxValue('yc_sel_gjjb'+k);
	$.parser.parse("#tr"+k);//渲染组件
	
	//遥测上限百分比输入值校验
	$('#ycpercUpper'+k).numberbox({    
	    required: true,
	    validType:"gts['"+k+"','yc']",
	});
	//遥测下限百分比输入值校验
	$('#ycpercLower'+k).numberbox({    
	    required: true,    
	    validType:"lts['"+k+"','yc']",
	});
	
	$('#yc_sel_gjjb'+k).combobox({	
		required: true,
	    validType:"checked['"+k+"','yc']",
	});
}


/**
 * 王梓璇
 * 新增一条遥脉数据记录
 * @param id 该记录追加在某个容器中
 * @param i 追加在哪个元素下
 */
function addTrYm(id,i){
	$('#'+id).panel('expand');
	var alarmCount = 0;
	for(var j=0;j<ymKey.length;j++){
//		var key = ymKey[j].split('I');
		if(ymKey[j].split("ym")[0] == i.split("ym")[0] && ymKey[j].split("ym")[1].split("I")[0] == i.split("ym")[1]){
//		if(key[0] == i){
			alarmCount++;
		}
	}
	
	if(queryCodeCurret.length <= alarmCount){
		$.messager.alert('提示', "告警级别配置超出上限！", 'info', function(r){
	    	   
    	});
		return;
	}
	
	var index = i.split("ym");
	//初始化遥测信息，并设置初始值
	var alarm = ymData[index[1]][0];
	var newAlarm = {};
	newAlarm.mpName = alarm.mpName;
	newAlarm.mpId = alarm.mpId;
	newAlarm.mpCode = alarm.mpCode;
	
	var k = i+"I"+ymData[index[1]].length;
	var del = "'"+k+"'";
	ymData[index[1]].push(newAlarm);
//	ymData[i].push(newAlarm);
	ymKey.push(k);
	
	//页面元素内容
	$("#ymsj-panel #"+id+" tbody").append(
			'<tr id="tr'+k+'">'+
				'<td id="ymadId'+k+'" style="display:none"></td>'+
				'<td id="ymName'+k+'" style="display:none">'+newAlarm.mpName+'</td>'+
				'<td id="ymmpType'+k+'" style="display:none">04</td>'+
				'<td id="ymmpId'+k+'" style="display:none">'+newAlarm.mpId+'</td>'+
				'<td id="ymmpCode'+k+'" style="display:none">'+newAlarm.mpCode+'</td>'+
				'<td width="75px">'+
					'上限百分比:'+
				'</td>'+
				'<td width="50px">'+
					'<input id="ympercUpper'+k+'" class="easyui-numberbox" style="width:50px" data-options="min:-9999.9999,max:9999.9999,precision:4,onChange:function(){ymChecked()}"></input>'+
				'</td>'+
				'<td width="75px">'+
					'下限百分比:'+
				'</td>'+
				'<td width="50px">'+
					'<input id="ympercLower'+k+'" class="easyui-numberbox" style="width:50px" data-options="min:-9999.9999,max:9999.9999,precision:4,onChange:function(){ymChecked()}"></input>'+
				'</td>'+
				'<td width="60px">'+
					'告警级别:'+
				'</td>'+
				'<td width="100px">'+
					'<select id="ym_sel_gjjb'+k+'" class="easyui-combobox" data-options="width:100,panelWidth:100,editable:false,onSelect:function(){ymChecked()}">'+
                    '</select>'+
				'</td>'+
				'<td width="35px">'+
				'<div class="icon-remove addOrDelBtn del" onclick="delTrYm(event,'+del+')" />'+
			'</td>'+
			'</tr>'
    	);
	//遥测下拉元素
	loadComboboxValue('ym_sel_gjjb'+k);
	$.parser.parse("#tr"+k);//渲染组件
	
	//遥测上限百分比输入值校验
	$('#ympercUpper'+k).numberbox({    
	    required: true,
	    validType:"gts['"+k+"','ym']",
	});
	//遥测下限百分比输入值校验
	$('#ympercLower'+k).numberbox({    
	    required: true,    
	    validType:"lts['"+k+"','ym']",
	});
	
	$('#ym_sel_gjjb'+k).combobox({	
		required: true,
	    validType:"checked['"+k+"','ym']",
	});
}

/**
 * 删除一条测点记录
 * @param event 指定容器
 * @param key 删除元素后，需要在遥测Key数组中删除
 */
function delTr(event,key){
	if(event.target){
		$(event.target).parents('tr').remove();
	}else{
		$(event.srcElement).parents('tr').remove();
	}
	
	//循环遥测Key数组中元素，获取制定元素
	for(var i=0;i<ycKey.length;i++){
		if(key == ycKey[i]){
			ycKey.splice(i,1);//删除元素
		}
	}
}

/**
 * 王梓璇
 * 删除一条遥脉记录
 * @param event 指定容器
 * @param key 删除元素后，需要在遥测Key数组中删除
 */
function delTrYm(event,key){
	if(event.target){
		$(event.target).parents('tr').remove();
	}else{
		$(event.srcElement).parents('tr').remove();
	}
	
	//循环遥测Key数组中元素，获取制定元素
	for(var i=0;i<ymKey.length;i++){
		if(key == ymKey[i]){
			ymKey.splice(i,1);//删除元素
		}
	}
}

var yxFlag = false;
/**
 * 王梓璇
 * 遥信 关键字，点击查询按钮事件
 */
function cxYx() {
	$("#yxTable").empty();
	yxFlag = true;
	loadDateYx();
}

var ycFlag = false;
/**
 * 王梓璇
 * 遥测 关键字，点击查询按钮事件
 */
function cxYc() {
	$("#ycTable").empty();
	ycFlag = true;
	loadDateYc();
}

var ymFlag = false;
/**
 * 王梓璇
 * 遥脉 关键字，点击查询按钮事件
 */
function cxYm() {
	$("#ymTable").empty();
	ymFlag = true;
	loadDateYm();
	
}
