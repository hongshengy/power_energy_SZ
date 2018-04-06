/**
 * 变压器监测分析
 * @author zhou_qiang
 * @since 2017-04-23
 */
var dataDate = new Date();//当前结束时间  为当前时间
//var consId='';//客户编码
var fzjcChart = '';//负载监测
var wdjcChart = '';//温度监测
var tabo = 'fzjc';
var tabt = 'fzjc_chart';//负载监测chart
var tabth = 'wdjc';
var tabf = 'wdjc_chart';//温度监测chart
var fzFlag = false;
var wdFlag = false;
var tabFlag = 'fzjc';

var byqqzColor = '#ff8080';
var byqzzColor = '#ff8080';
var byqgzColor = '#ff8080';
var byqAColor = '#ff8080';
var byqBColor = '#ff8080';
var byqCColor = '#ff8080';

$(function(){
	$.ajax({	
		url:webContextRoot+'colorConfig/selectColorConfig.action?func=byqjc', 
		dataType:'json',
		type:'post',
		success:function(result){
			if(result.length != 0){
				for(var i = 0;i<result.length;i++){
					if(result[i].NAME == '负荷轻载线'){
						byqqzColor = result[i].COLOR.toLocaleUpperCase();
					}else if(result[i].NAME == '负荷重载线'){
						byqzzColor = result[i].COLOR.toLocaleUpperCase();
					}else if(result[i].NAME == '负荷过载线'){
						byqgzColor = result[i].COLOR.toLocaleUpperCase();
					}else if(result[i].NAME == 'C相预警线'){
						byqCColor = result[i].COLOR.toLocaleUpperCase();
					}else if(result[i].NAME == 'B相预警线'){
						byqBColor = result[i].COLOR.toLocaleUpperCase();
					}else if(result[i].NAME == 'A相预警线'){
						byqAColor = result[i].COLOR.toLocaleUpperCase();
					}
				}
			}
			/*abUpColor = result[0].COLOR.toLocaleUpperCase();
			abDownColor = result[1].COLOR.toLocaleUpperCase();
			aUpColor = result[2].COLOR.toLocaleUpperCase();
			aDownColor = result[3].COLOR.toLocaleUpperCase();*/
		}
	});
	
	//初始化负载监测echarts控件
	fzjcChart = echarts.init(document.getElementById('fzjcChart'));

	//加载Tab页信息
	$('#tabs').tabs({
	       fit: true,//填充大小
	       plain: true,
	       onSelect: function(title,index){
		    	   if(index == 0){//负载监测
		    		   //初始化负载监测
		    		   fzjcChart = echarts.init(document.getElementById('fzjcChart'));
		    		   tabFlag = 'fzjc';
		    		   //查询负载监测
		    		   queryFzjc(null,null);
		    	   }else if(index == 1){//温度监测
		    		   //初始化温度监测
		    		   wdjcChart = echarts.init(document.getElementById('wdjcChart'));
		    		   tabFlag = 'wdjc';
		    		   //查询温度监测
		    		   queryWdjc(null,null);
		    	   }
	    	  }
		 });
	
	//设置日期初始值
	$("#dataDate").datebox('setValue',DateUtil.dateToStr('yyyy-MM-dd',dataDate));
	
	if(consId==null || consId==''|| consId=="null"){//未获取到企业编码，加载左侧树
		/*$('#tree-leftQyTree').tree({ //默认没参数，获取区域  企业  都是打开状态
			// modeType=1，过滤含有变压器的客户
			url:webContextRoot +'destree/queryTree.action?modeType=1',
		    method:'get',
		    multiple:false,//是否支持多选
		    editable:'true' ,
		    onClick: function(node){
		    	// 获取根节点
		    	var rootNode = $('#tree-leftQyTree').tree('getRoot',node.target);
		    	// 不是根节点时，刷新页面
		    	if(rootNode.id != node.id){
					consId = node.id;
					consName = node.text;
					//查询客户信息
					queryUserFiles(consId);
					//查询设备
					querySb();
		    	}else{
		    		$.messager.alert('提示', '请选择客户', 'warning');
		    	}
			},
			onLoadSuccess:function(node, data){//加载成功返回
				selectTree();//设置树默认选中节点
			}
		});
		//树模糊检索   方法来自  treeSelect.js
		searchTreeNode();*/
		
		consSelectMethod = "consSelectMethodLoad()";//定义选中后执行的方法
		consSelectHasRoot = false;//是否有区域能源根节点
		consSelectSearch("",true);

	}else{
		queryUserFiles(consId);
		//查询设备
		querySb();
	}
	
	
	 //查询事件
	$('#search').click(function(){
		if(tabFlag == 'fzjc'){
			//查询负载监测
			queryFzjc(tabt,null);
		}else if(tabFlag == 'wdjc'){
			//查询温度监测
			queryWdjc(tabf,null);
		}
	});
	
	//时间点下拉选项
	$('#QueryType').combobox({
		 width: 100,
		 panelWidth: null,
		 valueField:'id',
	     textField:'text',
		 editable: false,
		 data: [{
			id: '288',
			text: '288点',
			selected:true   
		 },{
			id: '1440',
			text: '1440点'
		 }]
	});
	
//	test();
});

$('#dataDate').datebox({
    onSelect: function(date){
    	
    	if(tabFlag == 'fzjc'){
    		queryFzjc(tabt,null);
    	}else if(tabFlag == 'wdjc'){
    		queryWdjc(tabf,null);
    	}
    }
});


/**
 * 设置选择客户后执行的方法
 */
function consSelectMethodLoad(){
	if(consSelectCon.id.length < 4){	// 区域能源节点
		$.messager.alert('提示', '请选择客户', 'warning');
	}else{		// 企业节点
		consId = consSelectCon.id;				// 把树节点id赋给企业id
		consName = consSelectCon.text;			// 把树节点的值赋给企业名称
		queryUserFiles(consId);
		
		querySb();
	}
}

/**
 * 查询企业下变压器设备
 */
function querySb(){
	var node = $('#tree-leftQyTree').tree('getSelected');
	
	$.post(webContextRoot +'byqjc/queryPowerList.action',{
    	'sfGTranModel.consId': consId
     },
     function(data){
		$('#sbType').combobox({
			width: 150,
			panelWidth: null,
			data:data,
			valueField: 'tranId',
			textField: 'tranName',
			editable: false,
			onLoadSuccess:function(){
				var sbData = $(this).combobox("getData");
				if(sbData.length>0){
					$('#sbType').combobox('select',sbData[0].tranId);
				}else{
					$('#sbType').combobox('select','');
					tranId = '';
					tranName = '';
					//queryDev(tranId);
					if(tabFlag == 'fzjc'){
						//查询负载监测
						queryFzjc('fzjc_chart',data.tranId);
					}
					if(tabFlag == 'wdjc'){
						//查询温度监测
						queryWdjc('wdjc_chart',data.tranId);
					}
//					getData(tranName);//获取数据
				}
			},
			onSelect:function(data){
				if(tabFlag == 'fzjc'){
					//查询负载监测
					queryFzjc('fzjc_chart',data.tranId);
				}
				if(tabFlag == 'wdjc'){
					//查询温度监测
					queryWdjc('wdjc_chart',data.tranId);
				}
				//queryDev(data.tranId);
			}
		});
			
     },'json');
}

/**
 * 查询客户信息
 * @param consId
 */
function queryUserFiles(consId){
	  //查询客户信息
	  $.getJSON(webContextRoot + 'pCode/queryuserFiles.action', {
		  'sfdConsModel.consId':consId
	  },
	  function(json){
		  //客户编号
		  var consNoObj = document.getElementById('consNo');
		  var consNOName = "客户编号: "
		  consNoObj.innerHTML = consNOName+json[0].consNo;
		  $('#consNo').attr("title",json[0].consNo);
		  
		  //客户名称
		  var consNameObj = document.getElementById('consName');
		  var consNameName = "客户名称: ";
	      var consNameStr = json[0].consName;
		  if(consNameStr.length>10){
			  consNameObj.innerHTML = consNameName+consNameStr.substring(0,10)+'...';
		  }else{
			  consNameObj.innerHTML = consNameName+consNameStr;
		  }
		  $('#consName').attr("title",consNameStr);
		  
		  //合同容量
		  var contractCapObj = document.getElementById('htrl');
		  var contractCapName = "合同容量(kVA): "
		  contractCapObj.innerHTML = contractCapName+json[0].contractCap;
		  $('#htrl').attr("title",json[0].contractCap);
		  
		  //用电地址
		  var elecAddrObj = document.getElementById('address');
		  var elecAddrName = "用电地址: "
		  var elecAddrNameStr = json[0].elecAddr;
		  if(elecAddrNameStr.length>10){
			  elecAddrObj.innerHTML = elecAddrName+elecAddrNameStr.substring(0,10)+'...';
		  }else{
			  elecAddrObj.innerHTML = elecAddrName+elecAddrNameStr;
		  }
		  $('#address').attr("title",elecAddrNameStr);
		  
		  //客户状态
		  var checkFlagObj = document.getElementById('khzt');
		  var checkFlagName = "客户状态: "
		  if(json[0].statusCode=="1"){
			  checkFlagObj.innerHTML = checkFlagName+'正常用户';
			  $('#khzt').attr("title",'正常用户');
		  }else if(json[0].statusCode=="2"){
			  checkFlagObj.innerHTML = checkFlagName+'已注销';
			  $('#khzt').attr("title",'已注销');
		  }
	  });
}

/**
 * 负载监测
 * @param tabtwo
 * @param tranId
 */
function queryFzjc(tabtwo,tranId){
	var node = $('#tree-leftQyTree').tree('getSelected');//获取企业节点
	var id = consId;
	var b = $('#dataDate').datebox('getValue');
	var c = $('#QueryType').combobox('getValue');
	
	fzjcChart.showLoading({
		text:'正在努力的读取数据中...',
		effect:'spin'
	});
	var a = tranId;
	if(a == null){
		a = $('#sbType').combobox('getValue');
	}
	
	$.post(webContextRoot +'byqjc/queryConsDeviceFZInfo.action',{
    	'consPowerInfoModel.deviceId': a,
        'consPowerInfoModel.dataDate': $('#dataDate').datebox('getValue'),
        'consPowerInfoModel.queryType': $('#QueryType').combobox('getValue'),
        'consPowerInfoModel.consId': id
     },
     function(data){
    	//标题
    	var title = $('#sbType').combobox('getText') ==''?'':'('+$('#sbType').combobox('getText')+')';
    	//查询负载监测echart
		queryFZEchart(data.consMap,consName+''+title);
		//负载统计
		fzjcCount(consName,$('#sbType').combobox('getText'),$('#dataDate').datebox('getValue'),data.consMap); 
		fzjcChart.hideLoading();
     },'json');
	
}


/**
 * 负载统计
 * @param consName
 * @param devName
 * @param dataDate
 * @param dataMap
 * @returns
 */
function fzjcCount(consName,devName,dataDate,dataMap){
	var qz = dataMap.fzbz[0];
	var zz = dataMap.fzbz[1];
	var gz = dataMap.fzbz[2];
	var qzCount = 0;
	var zzCount = 0;
	var gzCount = 0;
	
	var dataCount = 0;
	for(var i = 0;i<dataMap.powerValue.length;i++){
		var a = dataMap.powerValue[i];
		if(a != '-'){
			if(parseFloat(a)<parseFloat(qz)){
				qzCount ++;
			}else if(parseFloat(a)>parseFloat(zz) && parseFloat(a)<parseFloat(gz)){
				zzCount ++;
			}else if(parseFloat(a)>parseFloat(gz)){
				gzCount ++;
			}
		}else{
			dataCount ++;
		}
	}
	var str = '';
	if(devName == ''){
		str = str + '该客户没有变压器设备。'
	}else{
		str = str + devName+','+dataDate+' ';
		if(dataCount == dataMap.powerValue.length){
			str = str + '数据为空。'
		}else{
			if(qzCount == 0 && zzCount == 0 && gzCount == 0){
				str = str + '该设备状态正常。'
			}else{
				if(qzCount != 0){
					str = str + '轻载次数为：' + qzCount + '次。';
				}
				if(zzCount != 0){
					str = str + '重载次数为：' + zzCount + '次。';
				}
				if(gzCount != 0){
					str = str + '过载次数为：' + gzCount + '次。';
				}
			}
		}
	}
	
	$('#fztj').text(str);
}

/**
 * 负载监测 图表
 */
function queryFZEchart(dataMap,title){//function(dataMap, aChartTop)
	var qz = 0;
	var zz = 0;
	var gz = 0;
	if(dataMap.fzbz.length != 0){
		qz = dataMap.fzbz[0];
		zz = dataMap.fzbz[1];
		gz = dataMap.fzbz[2];
		
	}else{
		qz = 30;
		zz = 70;
		gz = 100;
	}
	option = {
		    title: {
		        text: title, 
		        x:'center'
		    },
		    tooltip : {
				trigger: 'axis', // tip 类型
				formatter : function(params, ticket, callback) {
					if(params == null ||params[0] == null){
						return;
					}
					var res = params[0].seriesName + 
            	    '<br/>时间：'+ params[0].name+
            		'<br/>负荷：'+ params[0].value+'kW';
            		return res;
				}
			},
		    legend: {
		        data: ['实际负荷'],
		        show:true,
		        x:'center',
		        y:'35'
		    },
		    grid:{
		    	left: '2%',
		        containLabel: true
		    },
		    xAxis: {
		        type: 'category',
		        boundaryGap: false,
		        data : dataMap.dataDate
		    },
		    yAxis: {
		    	name : '单位(kW)',
		    	splitLine:{
		    		show:false
		    	}
	        }, 
	        toolbox:{
				left :'center',
				show:false,
				feature:{
					dataZoom:{
						yAxisIndex:'none'
					},
					restore:{},
					saveAsImage:{}
				}
			},
			dataZoom:[{
				startValue:'00:00'
			},{
				type:'inside'
			}],
	        visualMap:{
	        	top:10,
	        	right:10,
	        	/*show:false,
	        	dimension:0,*/
	        	pieces:[
	        	{
	        		gt: 0 ,
	        		lte: qz,
	        		color: '#000000'
	        	},{
	        		gt: qz,
	        		lte: zz,
	        		color: byqqzColor
	        	},{
	        		gt: zz,
	        		lte: gz,
	        		color: byqzzColor
	        	},{
	        		gt: gz,
	        		color: byqgzColor
	        	}
	        	]
	        },
		    series: [
		        {
		            name:'实际负荷',
		            type:'line',
		            data:dataMap.powerValue,
		            markLine:{
		            	silent:true,
		            	data:[{
		            		yAxis:qz,
		            		lineStyle: {
				                normal: {
				                    type : 'solid',
				                    color: byqqzColor
				                }
				            }
		            	},{
		            		yAxis:zz,
		            		lineStyle: {
				                normal: {
				                    type : 'solid',
				                    color: byqzzColor
				                }
				            }
		            	},{
		            		yAxis:gz,
		            		lineStyle: {
				                normal: {
				                    type : 'solid',
				                    color: byqgzColor
				                }
				            }
		            	}]
		            }
		        }
		    ]
		};

		fzjcChart.setOption(option,true);
		userResize()
}

/**
 * 负载监测 数据列表
 * 
 */
  function queryFZData(dataMap){
	  var gridCommon = [[
   	 		{field:'dataDate',title:'时间',width: 300,align:'left'},
   	 		{field:'powerValue',title:'负荷',width: 100,align:'center'}
    	]];
	  
   	$('#fzjcData').datagrid({// 表格
   			title:'负载信息',
   			nowrap : false,// 设置为true，当数据长度超出列宽时将会自动截取。
   			striped : true,// 设置为true将交替显示行背景。
   			border:false,
   			width : '100%',
   			height : '100%',
   			fitColumns : true,// 自动适应宽度
   			singleSelect : true,// 设置为true将只允许选择一行。
   			rownumbers : true,// 设置为true将显示行数。
   			data : dataMap.consList,
   			loadMsg : "正在努力的读取数据中...",// 提示信息
   			columns : gridCommon,//字段
   			loadFilter: function(data){
   				if (data.sMap){
   					return data.sMap;
   				} else {
   					return data;
   				}
   			}
   		});
	
}

  /**
   * 温度曲线
   */
  function queryWdjc(tabtwo,tranId){
		var node = $('#tree-leftQyTree').tree('getSelected');//获取企业节点
		var id = consId;
		var b = $('#dataDate').datebox('getValue');
		var c = $('#QueryType').combobox('getValue');
	  
		wdjcChart.showLoading({
			text:'正在努力的读取数据中...',
			effect:'spin'
		});
		var a = tranId;
		if(a == null){
			a = $('#sbType').combobox('getValue');
		}
		
		//金坛外网临时使用
		if(a == '101000015914'){//1#主变
			a = '101000001894';
		}else if(a == '101000017026'){//2#主变
			a = '101000001895';
		}else if(a == '101000017027'){//3#主变
			a = '101000001896';
		}else if(a == '101000017028'){//4#主变
			a = '101000001897';
		}else if(a == '101000017029'){//5#主变
			a = '101000001895';
		}else if(a == '101000017030'){//6#主变
			a = '101000001896';
		}else if(a == '101000017031'){//7#主变
			a = '101000001897';
		}
		
	    $.post(webContextRoot +'byqjc/queryConsDeviceWDInfo.action',{
	    	'consPowerInfoModel.deviceId': a,
	        'consPowerInfoModel.dataDate': $('#dataDate').datebox('getValue'),
	        'consPowerInfoModel.queryType': $('#QueryType').combobox('getValue')
	     },
	     function(data){
	    	 //标题
	    	 var title = $('#sbType').combobox('getText') ==''?'':'('+$('#sbType').combobox('getText')+')';
	    	 //查询温度监测echart
			 queryWDEchart(data.consMap,consName+''+title);
			 //温度统计
	  	     wdjcCount(consName,$('#sbType').combobox('getText'),$('#dataDate').datebox('getValue'),data.consMap); 
		  	 wdjcChart.hideLoading();
	     },'json');
	    
  }

  /**
   * 温度监测统计
   * @param consName
   * @param devName
   * @param dataDate
   * @param dataMap
   * @returns
   */
  function wdjcCount(consName,devName,dataDate,dataMap){
	  if(dataMap.yjx.length != 0){
		var tpawdCount = 0;
		var tpbwdCount = 0;
		var tpcwdCount = 0;
		var maxaWd = '-';
		var minaWd = '-';
		var maxbWd = '-';
		var minbWd = '-';
		var maxcWd = '-';
		var mincWd = '-';
		var tpaFlag = false;
		var tpbFlag = false;
		var tpcFlag = false;
		var tpaCount = 0;
		var tpbCount = 0;
		var tpcCount = 0;
		var tpawd = '-';
		var tpbwd = '-';
		var tpcwd = '-';
		if(dataMap.yjx[0] != null){
			tpawd = dataMap.yjx[0].wdYjPower; 
		}
		if(dataMap.yjx[1] != null){
			tpbwd = dataMap.yjx[1].wdYjPower;
		}
		if(dataMap.yjx[2] != null){
			tpcwd = dataMap.yjx[2].wdYjPower;
		}  	
		for(var i = 0;i<dataMap.tpaValue.length;i++){
			var a = dataMap.tpaValue[i];
			if(a != '-' ){
				if(tpaFlag == false){
					maxaWd = parseFloat(a);
					minaWd = parseFloat(a);
					tpaFlag = true;
				}else{
					if(maxaWd < parseFloat(a)){
						maxaWd = parseFloat(a);
					}
					if(minaWd > parseFloat(a)){
						minaWd = parseFloat(a);
					}
				}
				if(parseFloat(a) > tpawd){
					tpawdCount ++;
				}
			}else{
				tpaCount ++;
			}
		}
		for(var i = 0;i<dataMap.tpbValue.length;i++){
			var a = dataMap.tpbValue[i];
			if(a != '-' ){
				if(tpbFlag == false){
					maxbWd = parseFloat(a);
					minbWd = parseFloat(a);
					tpbFlag = true;
				}else{
					if(maxbWd < parseFloat(a)){
						maxbWd = parseFloat(a);
					}
					if(minbWd > parseFloat(a)){
						minbWd = parseFloat(a);
					}
				}
				if(parseFloat(a) > tpbwd){
					tpbwdCount ++;
				}
			}else{
				tpbCount ++;
			}
		}
		for(var i = 0;i<dataMap.tpcValue.length;i++){
			var a = dataMap.tpcValue[i];
			if(a != '-' ){
				if(tpcFlag == false){
					maxcWd = parseFloat(a);
					mincWd = parseFloat(a);
					tpcFlag = true;
				}else{
					if(maxcWd < parseFloat(a)){
						maxcWd = parseFloat(a);
					}
					if(mincWd > parseFloat(a)){
						mincWd = parseFloat(a);
					}
				}
				if(parseFloat(a) > tpcwd){
					tpcwdCount ++;
				}
			}else{
				tpcCount ++;
			}
		}
		var str = '';
		var tpa = '';
		var tpb = '';
		var tpb = '';
		if(devName == ''){
			str = str + '该客户没有变压器设备。'
		}else{
			str = str + devName+'， '+dataDate+'：';
			var x = tpaCount+tpbCount+tpcCount;
			var y = dataMap.tpaValue.length+dataMap.tpbValue.length+dataMap.tpcValue.length;
			if(x == y){
				/*tpa = 'A相最高温度：- ℃，A相最低温度：- ℃，预警温度：- ℃，预警次数：- 次。';
				tpb = 'B相最高温度：- ℃，B相最低温度：- ℃，预警温度：- ℃，预警次数：- 次。';
				tpc = 'C相最高温度：- ℃，C相最低温度：- ℃，预警温度：- ℃，预警次数：- 次。';*/
//				$('#yjfxTab').css('display','none');
				$('#tpaName').text('');
				$('#tpaMaxWd').text('');
				$('#tpaMinWd').text('');
				$('#tpaYjWd').text('');
				$('#tpaYjCount').text('');
				$('#tpbName').text('');
				$('#tpbMaxWd').text('');
				$('#tpbMinWd').text('');
				$('#tpbYjWd').text('');
				$('#tpbYjCount').text('');
				$('#tpcName').text('');
				$('#tpcMaxWd').text('');
				$('#tpcMinWd').text('');
				$('#tpcYjWd').text('');
				$('#tpcYjCount').text('');
				
			}else{
				/*tpa = 'A相最高温度：'+maxaWd+' ℃，A相最低温度：'+minaWd+' ℃，预警温度：'+tpawd+' ℃，预警次数：'+tpawdCount+' 次。';
				tpb = 'B相最高温度：'+maxbWd+' ℃，B相最低温度：'+minbWd+' ℃，预警温度：'+tpbwd+' ℃，预警次数：'+tpbwdCount+' 次。';
				tpc = 'C相最高温度：'+maxcWd+' ℃，C相最低温度：'+mincWd+' ℃，预警温度：'+tpcwd+' ℃，预警次数：'+tpcwdCount+' 次。';*/
				$('#yjfxTab').css('display','block');
				$('#tpaName').text('A相');
				$('#tpaMaxWd').text(maxaWd);
				$('#tpaMinWd').text(minaWd);
				$('#tpaYjWd').text(tpawd);
				if(maxaWd == '-' && minaWd == '-' && tpawd == '-'){
					tpawdCount = '-';
				}
				$('#tpaYjCount').text(tpawdCount);
				$('#tpbName').text('B相');
				$('#tpbMaxWd').text(maxbWd);
				$('#tpbMinWd').text(minbWd);
				$('#tpbYjWd').text(tpbwd);
				if(maxbWd == '-' && minbWd == '-' && tpbwd == '-'){
					tpbwdCount = '-';
				}
				$('#tpbYjCount').text(tpbwdCount);
				$('#tpcName').text('C相');
				$('#tpcMaxWd').text(maxcWd);
				$('#tpcMinWd').text(mincWd);
				$('#tpcYjWd').text(tpcwd);
				if(maxcWd == '-' && mincWd == '-' && tpcwd == '-'){
					tpcwdCount = '-';
				}
				$('#tpcYjCount').text(tpcwdCount);
			}
		}
		$('#yjfx').text(str);
		/*$('#tpa').text(tpa);
		$('#tpb').text(tpb);
		$('#tpc').text(tpc);*/
	}else{
	  $('#yjfx').text('-');
	  $('#yjfxTab').css('display','none');
		/*$('#tpa').text('');
		$('#tpb').text('');
		$('#tpc').text('');*/
	}
  
}

/**
 * 温度监测 图表
 */
function queryWDEchart(dataMap,title){
	var tpa_val = 0;
    var tpb_val = 0;
    var tpc_val = 0;
    var tp_data=[];
    if(dataMap.yjx.length != 0){
    	for(var i =0;i<dataMap.yjx.length;i++){
    		if(dataMap.yjx[i].mpCode == 'TP_a'){
    			tpa_val = dataMap.yjx[i].wdYjPower;
    		}else if(dataMap.yjx[i].mpCode == 'TP_b'){
    			tpb_val = dataMap.yjx[i].wdYjPower;
    		}else if(dataMap.yjx[i].mpCode == 'TP_c'){
    			tpc_val = dataMap.yjx[i].wdYjPower;
    		}
        }
    }else{
    	tpa_val = 30;
        tpb_val = 40;
        tpc_val = 50;
    }
    
	option = {
		    title: {
		        text: title, 
		        x:'center',
		        show:true
		    },
		    legend:{
		    	data:['A相温度','B相温度','C相温度'],
		    	show:true,
		    	y:'30px'
		    },
		    tooltip : {
				trigger: 'axis', // tip 类型
				formatter : function(params, ticket, callback) {
					if(params == null ||params[0] == null){
						return;
					}
					var res = params[0].name;
					var len = params.length;
					
					for(var i =0;i<len;i++){
						res = res + '<br/>'+ params[i].seriesName+':'+ params[i].value+'℃'; 
					}
					return res;
				}
			},
			toolbox:{
				left :'center',
				show:false,
				feature:{
					dataZoom:{
						yAxisIndex:'none'
					},
					restore:{},
					saveAsImage:{}
				}
			},
			dataZoom:[{
				startValue:'00:00'
			},{
				type:'inside'
			}],
			grid:{
		    	left: '2%',
		        containLabel: true
		    },
		    xAxis: {
		    	type: 'category',
			    boundaryGap: false,
		        data : dataMap.dataDate
		    },
		    yAxis: {
		    	name : '单位(℃)',
		    	splitLine:{
		    		show:false
		    	}
	        },
	        visualMap:[{
	        	top:0,
	        	right:10,
	        	seriesIndex:0,
	        	pieces:[
	        	{
	        		gt: 0,
	        		lte : Number(tpa_val),
	        		color: '#096'
	        	},
	        	{
	        		gt: Number(tpa_val),
	        		color: byqAColor
	        	}]
	        },{
	        	top:50,
	        	right:10,
	        	seriesIndex:1,
	        	pieces:[
	        	{
	        		gt: 0,
	        		lte : Number(tpb_val),
	        		color: '#096'
	        	},
	        	{
	        		gt: Number(tpb_val),
	        		color: byqBColor
	        	}]
	        },{
	        	top:100,
	        	right:10,
	        	seriesIndex:2,
	        	pieces:[
	        	{
	        		gt: 0,
	        		lte : Number(tpc_val),
	        		color: '#096'
	        	},
	        	{
	        		gt: Number(tpc_val),
	        		color: byqCColor
	        	}]
	        }],
		    series: [{
		    	name:'A相温度',
	            type:'line',
	            data : dataMap.tpaValue,
	            markLine:{
	            	silent:true,
	            	data:[{
	            		yAxis:Number(tpa_val),
	            		lineStyle: {
			                normal: {
			                    type : 'solid',
			                    color: byqAColor
			                }
			            }
	            	}]
	            }
		    }
		    ,{
		    	name:'B相温度',
	            type:'line',
	            data : dataMap.tpbValue,
	            markLine:{
	            	silent:true,
	            	data:[{
	            		yAxis: Number(tpb_val),
	            		lineStyle: {
			                normal: {
			                    type : 'solid',
			                    color: byqBColor
			                }
			            }
	            	}]
	            }
		    }
		    ,{
		    	name:'C相温度',
	            type:'line',
	            data : dataMap.tpcValue,
	            markLine:{
	            	silent:true,
	            	data:[{
	            		yAxis:Number(tpc_val),
	            		lineStyle: {
			                normal: {
			                    type : 'solid',
			                    color: byqCColor
			                }
			            }
	            	}]
	            }
		    }
		    ]
		};
	
	wdjcChart.setOption(option,true);
	userResize();
}

/**
 * 温度监测 数据列表
 * 
 */
function queryWDData(dataMap){
	var gridCommon = [[
 		{field:'dataDate',title:'时间',width: 300,align:'left'},
 		{field:'tpAValue',title:'A相温度',width: 100,align:'center'},
 		{field:'tpBValue',title:'B相温度',width: 100,align:'center'},
 		{field:'tpCValue',title:'C相温度',width: 100,align:'center'}
	]];
	$('#wdjcData').datagrid({// 表格
		title:'温度信息',
		nowrap : false,// 设置为true，当数据长度超出列宽时将会自动截取。
		striped : true,// 设置为true将交替显示行背景。
		border:false,
		width:'100%',
	    height:'100%',
		fitColumns : true,// 自动适应宽度
		singleSelect : true,// 设置为true将只允许选择一行。
		rownumbers : true,// 设置为true将显示行数。
		data : dataMap.consList,
		loadMsg : "正在努力的读取数据中...",// 提示信息
		columns : gridCommon,//字段
		loadFilter: function(data){
			if (data.sMap){
				return data.sMap;
			} else {
				return data;
			}
		}
	});
}
    
/**
 * 根据设备id查询设备信息
 */
/*function queryDev(devId){
	$.post(webContextRoot +'sfgSub/queryPowerList.action',
	   {'sfGTranModel.tranId':devId},
	   function(data){
		 if(data.length>0){
			   $("#eddy").text(data[0].tranKindName==""?'-':data[0].tranKindName);
			   $("#eddl").text(data[0].factoryNameS==""?'-':data[0].factoryNameS);
			   $("#edrl").text(data[0].plateCap==""?'-':(data[0].plateCap+'kVA'));
			   
			   $("#sbbh").text(data[0].tranVoltName==""?'-':(data[0].tranVoltName));
			   $("#ztrq").text(data[0].createDate==""?'-':data[0].createDate.slice(0,data[0].createDate.indexOf(' ')));
			   $("#yxzt").text(data[0].runStatusName==""?'-':data[0].runStatusName);
			   
		   }
	   },"json");
}    */

/**
 * 日期切换
 * 
 */
function qytQueryOveride(dateTime){
	var date = $('#dataDate').val();
	var resultDay = timeUtil(dateTime,date);//DateUtil.dateAdd("d", parseInt(dateTime), DateUtil.strToDate(startDay2));//getDateByOffsetDays(startDay2,dateTime);
	$('#dataDate').datebox('setValue',resultDay);
	
	if(tabFlag == 'fzjc'){
		queryFzjc(tabt,null);
	}else if(tabFlag == 'wdjc'){
		queryWdjc(tabf,null);
	}
}
/**
 * 日期转换
 * @param dateTime
 * @param startDay
 * @returns {String}
 */
function timeUtil(dateTime,startDay){
	var resultDay = DateUtil.dateAdd("d", parseInt(dateTime), DateUtil.strToDate(startDay));
	var resultStr = "";
	resultStr+=resultDay.getFullYear()+"-"+leftPad((resultDay.getMonth()+1))+"-"+leftPad(resultDay.getDate());
	function leftPad(str){
		if(str.toString().length==1){
			return '0'+str;
		}else{
			return str;
		}
	}
	return resultStr;
}

/**
 * 树查询
 * @param nodeId
 */
function selectTree(nodeId){
	$('#tree-leftQyTree li:eq(0)').find('div').addClass("tree-node-selected");//添加选中样式
	var n = $('#tree-leftQyTree').tree('getSelected');//获取被选中的节点
	if(n!=null)//判断节点是否存在
	{
		$('#tree-leftQyTree').tree('select',n.target);
	}
	
	var chiNode = $('#tree-leftQyTree').tree('getChildren',n.target);//子节点
	if(chiNode.length == 0){
		$.messager.alert('提示', '请先给客户添加变压器', 'warning');
	} else {
		for(var i=0 ; i < chiNode.length ; i++)//循环节点
	    	{
			 if(nodeId!=null?chiNode[i].id==nodeId:chiNode[i].type==1)//查找定位
			  {
					var n = $('#tree-leftQyTree').tree("find",chiNode[i].id);//根据id获取节点
		       	   	$('#tree-leftQyTree').tree('select',n.target);//选中节点
		       	   	$('#tree-leftQyTree').tree('scrollTo',n.target);//滚动到节点
		       	    consId = chiNode[i].id;
		       	    consName = chiNode[i].text;
		       	    queryUserFiles(consId);
		       	    //查询设备
					querySb();
		       	   	break;//跳出循环
			 }
	    }
	}

}

