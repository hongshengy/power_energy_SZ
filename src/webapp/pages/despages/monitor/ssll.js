/**
 * 瞬时水量
 * @author meng_zijie
 * @since 2017-09-02
 */
var dataDate = new Date();//当前时间
var myChart = null; 
var type = '';
consName = GetUrlParam("consName");

$(function(){
	//设置时间
	$("#dataDate").val(DateUtil.dateToStr('yyyy-MM-dd',dataDate));
	myChart = echarts.init(document.getElementById('myChart'));
	
//	sfMpId = 101000001762;
//	mpCode = 1;
	if(mpCode=='SSSL'){
		type = '瞬时水量';
	}else{
		type = '累计水量';
	}
//	$.ajax({	
//		url:webContextRoot +'destree/queryTree.action', 
//		dataType:'json',
//		type:'post',
//		success:function(result){
//			var cons = result[0].children;
////			console.log(cons);
//			for(var i in cons){
//				if(cons[i].id == consId){
//					consName = cons[i].text;
//					break;
//				}
//			}
//			loadData();
//		}
//	});
//	alert(1);
	loadData();
	
	$("#search").click(function(){
		loadData();
	});
	
});

/**
 * 加载数据
 */
function loadData(){
	getChart();
}

/**
 * 生成echart图
 * @param consId
 * @param ynbgTime
 */
function getChart(){
	myChart.showLoading({
		text:'正在努力的读取数据中...',
		effect:'spin'
	});
	
	var time = $("#dataDate").val();
	
	$.ajax({	
		url:webContextRoot+'energySvgMonitor/queryWater.action', 
		data:{
			'zhSf1MinMpDataModel.mpId': sfMpId,
			'zhSf1MinMpDataModel.beginDate' : time
		},
		dataType:'json',
		type:'post',
		success:function(result){
//			console.log(result);
			var firstData = '0';
			if(mpCode!='SSSL' && result.waterData.length > 0) firstData = result.waterData[0]-10;
			
			var option = {
					title: {
				        text: consName + ' ' + type,
				        left: 'center'
				    },
					legend: {
						data: new Array().push(type),
						x:'center',
						y:'35'
					},
					tooltip: {
				        trigger: 'axis'
				    },
					//设置grid位置
					grid : {
						x : 55, //左边距离
						y : 75,//上边距离
						x2 : 35,//右边距离
						y2 : 35//下边距离
					},
					xAxis:  {
						type: 'category',
						boundaryGap:false,
						data : result.categes
					},
					yAxis: [
					        {
					        	name: mpCode=='SSSL'?'单位(吨/小时)':'单位(吨)',
					        	type: 'value',
					        	min: firstData,
					        	max:'auto'
					        }
					],
			        series: [
			                 {
			                	 name: type,
			                	 type: 'line',
			                	 symbol: 'circle',
			                	 data:result.waterData
			                 }
			         ]
				};
				//初始化echart
			myChart = echarts.init(document.getElementById('myChart'));
				//配置echart
			myChart.setOption(option,true);
			myChart.hideLoading();
		}
	});
}

/**
 * 设置时间的方法
 * @param dateTime
 */
function qytQueryOveride(dateTime){
	var date = $('#dataDate').val();
	var resultDay = timeUtil(dateTime,date);//DateUtil.dateAdd("d", parseInt(dateTime), DateUtil.strToDate(startDay2));//getDateByOffsetDays(startDay2,dateTime);
	$('#dataDate').val(resultDay);
	loadData();
}
/**
 * 时间处理的工具类
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
 * 时间查询框 选中事件
 */
function changeDate(){
	loadData();
}
/*-----------------------------------------------------------------------------------------*\
 * 函数:          客户端获取路径参数值的函数
 * 参数:          name -- 需要获取的路径参数的参数名
 * 返回值:        路径参数传递的具体值
 * 创建人:        郭庆春。
 * 创建日期:      2015-06-1。
 * 最后修改日期:  2015-06-1。
 \*-----------------------------------------------------------------------------------------*/
function GetUrlParam(name) {

	var strHref = document.location.href;
	var intPos = strHref.indexOf("?");
	var strRight = strHref.substr(intPos + 1);
	var arrTmp = strRight.split("&");
	for (var i = 0; i < arrTmp.length; i++) {
		var arrTemp = arrTmp[i].split("=");
		if (arrTemp[0].toUpperCase() == name.toUpperCase())
			// var area=unescape(arrTemp[1]);
			// var returnValue=$.parseJSON(area);
			return unescape(arrTemp[1]); // unescape decodeURI
	}
	return null;

}