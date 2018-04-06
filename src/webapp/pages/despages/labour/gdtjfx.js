/**
 * 工单统计分析
 * @author 王梓璇
 * @since 2017-02-26
 */
myChart = '';
var currentdate = new Date();  //当前时间
var process = null;
var wnGrade = null;
//var consId = null;
groupDateType = 'yyyy-MM';
//var consName = '';
var currentMonth = DateUtil.dateToStr('yyyy-MM',currentdate);

function userResize(widths,heights){
	$("#userChart").width($("#userChart").parent().width());
	$("#userChart").height($("#userChart").parent().height());
	
	if(!!myChart){
		myChart.resize({
		    width: $("#userChart").parent().width(),
		    height: $("#userChart").parent().height()
		});
	}
}

$(function(){
	//初始化echart对象
	myChart = echarts.init(document.getElementById('userChart'));
	//设置时间
	$("#endDateMonth").val(DateUtil.dateToStr('yyyy-MM',currentdate));
	$("#startDateMonth").val(DateUtil.dateToStr('yyyy-MM',DateUtil.dateAdd('m',1,DateUtil.dateAdd('y',-1,currentdate))));
	
	$("#endDateYear").val(DateUtil.dateToStr('yyyy',currentdate));
	$("#startDateYear").val(DateUtil.dateToStr('yyyy',DateUtil.dateAdd('y',-1,currentdate)));
	
	$("#sendOfYear").hide();
	//统计分析工单类型
//	$("#gdtjMenuIcon").click(function(){
//		$('#gdtjMenu').menu('show',{
//			left:$("#gdtjMenuIcon").offset().left,
//			top:$("#gdtjMenuIcon").offset().top + 50,
//		});
//	});
	
    //紧急程度选择事件
	$('#jinjicd').combobox({//紧急程度
		url:webContextRoot +'pCode/queryCode.action?codeSortId=70001',
		valueField: 'codeValue',
		textField: 'codeName' ,
		onChange: function(newValue, oldValue){
			wnGrade = newValue;
		},onLoadSuccess: function(){
			$('#jinjicd').combobox('setValue', '');
		}
	}); 
	
	//已派工单
	$('#ypgd').linkbutton({
		onClick: function(){
			process = "1"; 
		}
	});
	//已接工单
	$('#yjgd').linkbutton({
		onClick: function(){
			process = "2";  
		}
	});
	//已到达工单
	$('#yddxc').linkbutton({
		onClick: function(){
			process = "3"; 
		}
	});
	//已回工单
	$('#yhgd').linkbutton({
		onClick: function(){
			process = "6";  
		}
	});
	//所有工单
	$('#sygd').linkbutton({
		onClick: function(){
			process = null;  
		}
	});
	//工单状态选择事件
//	$('#gongDanState').combobox({//工单状态
//		url:webContextRoot +'pCode/queryCode.action?codeSortId=70001',
//		valueField: 'codeValue',
//		textField: 'codeName',
//		onChange: function(newValue, oldValue){
//			process = newValue;
//		},onLoadSuccess: function(){
//			$('#gongDanState').combobox('setValue', '');
//		}
//	});
//	//选择大用户树事件
//	$('#tree-leftQyTree').tree({    
//		url:webContextRoot +'destree/queryTree.action',
//	    method:'get',
//	    multiple:false//是否支持多选
//	});
	
    //选择大用户树
	$('#userTree').combotree({    
		url:webContextRoot +'destree/queryTree.action',
	    method:'get',
	    panelWidth: 200,
	    multiple:true,//是否支持多选
	    onLoadSuccess:function(node,data){
	    	if(consId!=null && consId!=''&& consId!="null"){
	    		$('#userTree').combotree('setText',consName);
	    		$('#userTree').combotree('setValues',consId);
	    	}
	    },
	    onChange: function(newValue, oldValue){
	    	if(newValue.length>0){
//	    	  var tempConsId = newValue.toString();
	    		var tempConsId = newValue.join();
	    	  consId = tempConsId.replace(/-/g,'');
	    		if(consId != null){
//	    			$("input[name='g1']").prop("disabled", true);

	    		}
	    	}else{
	    		consId=null;
//	    		$("#chooseDateYear").prop("disabled", false);
//    			$("#chooseDateYue").prop("disabled", false);
	    	}
	    	consName = $('#userTree').combotree('getText');
		}
	});
	
    //查询事件
	$('#search').click(function(){
     //判断是否选择大用户
		if(consId==null || consId==''|| consId=="null"){
			getData();
		}else{
			getChooseUserData();
		}
	});
	
	//导出事件
	$('#export').click(function(){
		excelData();
	});
	//如果是客户视图，查询用户
	if(consId==null || consId==''|| consId=="null"){
		getData();
	}else{
		getChooseUserData();
	}
});

//选择年月统计
function chooseDateType(groupType){ 
	if(groupType == 'year'){
		//选择按年统计
		groupDateType = 'yyyy';
		$("#sendOfMonth").hide();
		$("#sendOfYear").show();
	}else{
		//选择按月统计
		groupDateType = 'yyyy-MM';
		$("#sendOfMonth").show();
		$("#sendOfYear").hide();
	}
}

/**
 * 选择日期事件
 */
function changeDate(){}

//未选择大用户    根据日期查询所有
function getData(){
	
	var startDate = '';
	var endDate = '';
	if(groupDateType == 'yyyy-MM'){
		startDate =  $('#startDateMonth').val();//开始日期
		endDate =  $('#endDateMonth').val();//结束日期
	}else if(groupDateType == 'yyyy'){
		startDate =  $('#startDateYear').val();//开始日期
		endDate =  $('#endDateYear').val();//结束日期
	}
	if(startDate> endDate){
		$.messager.alert('提示', "开始日期不能大于结束日期！", 'warning');
		return;
	}
	myChart.showLoading({
		text:'正在努力的读取数据中...',
		effect:'spin'
	});
	$.getJSON(webContextRoot + 'worknoteStatistics/queryAll.action', 
		{ 
		   //请求参数
			'gdtjfxModel.startDate': startDate,//开始时间
			'gdtjfxModel.endDate': endDate,//结束时间
			'gdtjfxModel.process': process,//当前进度
			'gdtjfxModel.wnGrade': wnGrade,//紧急程度
			'gdtjfxModel.groupDateType': groupDateType//统计类型
		},
		function(json){
//			console.log(json);
		    getGdtjfxData(json);
		    myChart.hideLoading();
		}
	);
}




//选择大用户  查询
function getChooseUserData(){
	
	var startDate = '';
	var endDate = '';
	if(groupDateType == 'yyyy-MM'){
		startDate =  $('#startDateMonth').val();//开始日期
		endDate =  $('#endDateMonth').val();//结束日期
	}else if(groupDateType == 'yyyy'){
		startDate =  $('#startDateYear').val();//开始日期
		endDate =  $('#endDateYear').val();//结束日期
	}
	if(startDate> endDate){
		$.messager.alert('提示', "开始日期不能大于结束日期！", 'warning');
		return;
	}
	myChart.showLoading({
		text:'正在努力的读取数据中...',
		effect:'spin'
	});
	$.getJSON(webContextRoot +'worknoteStatistics/queryBigUser.action',//请求地址
        { 
			'gdtjfxModel.startDate': startDate,//开始时间
			'gdtjfxModel.endDate': endDate,//结束时间
			'gdtjfxModel.process': process,//当前进度
			'gdtjfxModel.wnGrade': wnGrade,//紧急程度
			'gdtjfxModel.consId': consId,//企业ID
			'gdtjfxModel.consName': consName,//企业名称类型
			'gdtjfxModel.groupDateType': groupDateType//统计类型
		},
		function(json){
			getGdtjfxData(json);
			myChart.hideLoading();
		}
	);
}

//echarts柱状图
function getGdtjfxData(dataMap){
	 //初始化
//	myChart = echarts.init(document.getElementById('userChart'));
//	myChart.showLoading({
//		text:'正在努力的读取数据中...',
//		effect:'spin'
//	});
    var option = {
        legend: {
            x: 'center',
            y: '0px',
            data: ['工单数量']
        }, 
      //设置grid位置
 	   grid : {
 			 x : 45, //左边距离
 			 y : 65,//上边距离
 			 x2 : 20,//右边距离
 			 y2 : 65//下边距离
 		},
        xAxis: [
            {
            	
                type: 'category',
                boundaryGap : [0, 0.01],
                symbolSize : 1,//点直径
                splitLine: {
                    show: false,
                    lineStyle: {
                        color: '#dfdfdf',
                        width: 1,
                        type: 'dashed'
                    }
                },
                data:dataMap.sMap.categes
            }
        ],
        yAxis: [{
            name: '单位(数量)',
            type: 'value',
            splitNumber: 5,
            splitLine: {
                lineStyle: {
                    color: '#dfdfdf',
                    width: 1,
                    type: 'dashed'
                }
            },
             
            axisLabel: {
                formatter: '{value}'
            },
            min:'0',
            max:'auto'
        }],
        tooltip : {
            trigger: 'item',
            formatter: "{b}<br/>{a}: {c}"
        },
        dataZoom: [
			        {
			            show: true,
			            realtime: true,
			            // 可选，dataZoom 组件的 index，多个 dataZoom 组件时有用，默认为 0
//			            dataZoomIndex: number,
			            // 开始位置的百分比，0 - 100
//			            start: number,
			            // 结束位置的百分比，0 - 100
//			            end: number,
			            // 开始位置的数值
			            startValue: 0,
			            // 结束位置的数值
			            endValue: 11
			        }
			    ],
        series: [
            {
                name: '工单数量',
                type: 'bar',
                barWidth:50,
                markPoint : {
	                data : [
	                    {type : 'max', name: '最高值',tooltip :{
					    	trigger: 'item',
					    	formatter: "{a}<br/>{b}: {c}"
					    }},
	                    {type : 'min', name: '最低值',tooltip :{
					    	trigger: 'item',
					    	formatter: "{a}<br/>{b}: {c}"
					    }}
	                ]
	            },
                symbolSize: 2,
                showAllSymbol: true,
                smooth: false,
                yAxisIndex: 0,
                symbol: 'circle',
                data:dataMap.sMap.dataGdtjfx,//数据,
                itemStyle: {
                    normal: {
                        barBorderRadius: 0,
                        color:'rgba(60,140,147,0.9)'
                    }
                }
            }
        ]
    };
	
    
    myChart.on('legendselectchanged', function (params) {
    	GetMinAndMaxValue(myChart,0,params);
    });
	 
	myChart.setOption(option,true);
	
}


/**
*	导出
*/
function excelData(){
	
//	var startDate = '';
//	var endDate = '';
//	if(groupDateType == 'yyyy-MM'){
//		startDate =  $('#startDateMonth').val();//开始日期
//		endDate =  $('#endDateMonth').val();//结束日期
//	}else if(groupDateType == 'yyyy'){
//		startDate =  $('#startDateYear').val();//开始日期
//		endDate =  $('#endDateYear').val();//结束日期
//	}
//	if(startDate> endDate){
//		$.messager.alert('提示', "开始日期不能大于结束日期！", 'warning');
//		return;
//	}

	//当期时间作为标志
// 	var flag = new Date().format('Y-m-d H:i:s.u');
 	var flag = DateUtil.dateToStr('yyyy-MM-dd HH:mm:ss',new Date());
 	//导出地址及参数
 	var url = '';
 	//判断是否选择大用户 导出不同数据
 	if(!consName){
 		url = webContextRoot+'worknoteStatistics/exporGdtjfxtExcel.action?flag=' + flag; // 进度条标识
//		+'&gdtjfxModel.startDate='+ startDate//开始时间
//		+'&gdtjfxModel.endDate='+ endDate//结束时间
//		+'&gdtjfxModel.process='+ process//当前进度
//		+'&gdtjfxModel.wnGrade='+ wnGrade//紧急程度
//		+'&gdtjfxModel.groupDateType='+ groupDateType;//统计类型
		
	
 	}else{
 		url = webContextRoot+'worknoteStatistics/exporGdtjfxtExcel.action?flag=' + flag; // 进度条标识
//		+'&gdtjfxModel.startDate='+ startDate//开始时间
//		+'&gdtjfxModel.endDate='+ endDate//结束时间
//		+'&gdtjfxModel.process='+ process//当前进度
//		+'&gdtjfxModel.wnGrade='+ wnGrade//紧急程度
//		+'&gdtjfxModel.groupDateType='+ groupDateType//统计类型
//		+'&gdtjfxModel.consId='+ consId//企业ID
//		+'&gdtjfxModel.consName='+ consName;//企业名称类型
 	}
 	
 	//编码
	url = encodeURI(url);
	
	//导出目标
	new Ext.form.FormPanel({ 
  		html:'<iframe src="'+url+'" width="100%" height="400" frameborder="0" scrolling="auto"></iframe>',
  		labelAlign: 'right', //位置
  		renderTo:'topic-excel',//目标id
  		labelWidth: 100,//宽度
  		frame:true
	});	
	//进度条
	Ext.MessageBox.show({
		title: '数据下载',//标题
		msg: '数据下载中，请耐心等待！',
		progressText: '数据下载中...',//内容
		width: 300,//宽度
		progress: true//进程
	});
	var pert = 0.0;//百分比
	var timer = null;//计时器
	//导出进度条的方法
	function getProgress() {
		if(pert < 0.99){//导出进度
			pert = pert + 0.01;
		}
		
		Ext.Ajax.request({//进度条请求
			url: webContextRoot + 'worknoteStatistics/exportProgress.action?flag=' + flag,
			success: function(response) {
				var percents = Ext.util.JSON.decode(response.responseText).percents;//返回结果
				if(percents && percents.indexOf("OK") >= 0){//导出成功
					pert = 1;
					Ext.MessageBox.updateProgress(pert, '已完成&nbsp;' + Math.round(pert * 100) + '%');
					clearInterval(timer);//关闭计时器
					function closer() {//关闭进度条
						Ext.MessageBox.hide();
					}
					setTimeout(closer, 1000);//延时请求
				}else{
					//进度
					Ext.MessageBox.updateProgress(pert, '已完成&nbsp;' + Math.round(pert * 100) + '%');
				}
			},
			failure : function() {
	        	Ext.MessageBox.hide();//关闭进度条
		    }
		});
	}
	timer = setInterval(getProgress, 500);//计时器
}
