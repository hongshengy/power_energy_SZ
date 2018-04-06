/**
 * 负荷相关
 * @author zhou_qiang
 * @since 2017-08-18
 */
var fhChart = '';
var gjIndex = 0;
var gjData;
//判断是否首次进入
var idFirst = true;
//定时刷新
var t;
//客户Id
var consId = '';
//初始svg的高度
var viewHt;
//初始svg的宽度
var viewWd;
var translate;
var pageWidth;
var startX;
var startY;
var startT;
var isMove;
var deltaX;
var deltaY;
//初始化方法
$(function(){
    login();   
    $("#divNewbrand").click(function() {
		if ($('#ulbrand').attr("class") == "ct visible"){
			$("#ulbrand").removeClass("visible");
		}else{
			$("#ulbrand").addClass("visible");
		}
	});
    $("#divNewimg").click(function(){
    	if ($('#ulimg').attr("class") == "ct visible"){
			$("#ulimg").removeClass("visible");
		}else{
			$("#ulimg").addClass("visible");
		}
    });    
});

//是否为空校验
function isEmpty(s) {
	var lll=trim(s);
	if( lll == null || lll.length == 0 )
		return true;
	else
		return false;
}

//删除字符串左边的空格
function ltrim(str) { 
	if(str.length==0)
		return(str);
	else {
		var idx=0;
		while(str.charAt(idx).search(/\s/)==0)
			idx++;
		return(str.substr(idx));
	}
}

//删除字符串右边的空格
function rtrim(str) { 
	if(str.length==0)
		return(str);
	else {
		var idx=str.length-1;
		while(str.charAt(idx).search(/\s/)==0)
			idx--;
		return(str.substring(0,idx+1));
	}
}

//删除字符串左右两边的空格
function trim(str) { 
	return(rtrim(ltrim(str)));
}

function login(){
	
	var name = loginName;
	var pw = password;
//    	var code = document.getElementById('validateCode').value;
    if(isEmpty(name) || trim(name)=="" || isEmpty(pw) || trim(pw)== ""){
      $.messager.alert('提示', '用户名/密码为空!', 'warning');
      return;  
    }else{
    	$.getJSON(webContextRoot+"monitorCanvas/systemLogin.action", //请求路径
				{ 
		    		'loginName' : name,
		 			'password' : pw
				},
				function(json){
					 if(json.success=="true"){//处理返回结果
						 getConsId();
					 }else{
						 $.messager.alert('提示', '用户名/密码不存在!', 'warning');
						 return;
					 }
				}
			);
	}
}

function getConsId(){
	$.ajax({
		type : "post",
		url : webContextRoot + 'monitorCanvas/getConsnoConsId.action',
		dataType : "json",
		data : {
			'consNo' : consNo
		},
		success : function(data) {
			if(data.length != 0){
				consId  = data[0].consId;
				
				fhChart = echarts.init(document.getElementById('fhChart'));//初始化chart
				
				findNowTime();
				//查询负荷曲线信息
				queryPowerValueData();
				//查询首页负荷相关信息
				queryShouYePowerValue();
				//查询首页告警信息
				queryGaojing();
				
				setInterval("queryPowerValueData()",120000);
				setInterval("queryGaojing()",120000);
				setInterval("queryShouYePowerValue()",120000);
				
				setInterval(function (){
					if(gjData != null){
						for(var i = gjIndex;i<gjData.length ;i++){
							$('#gjSeq').text(i+1);
							$('#gjDev').text(gjData[i].alarmDesc==null?'':gjData[i].alarmDesc);
							$('#gjStatus').text(gjData[i].confirmFlagName==null?'':gjData[i].confirmFlagName);
							$('#gjSel').val(i); 
							gjIndex ++;
							if(gjIndex == gjData.length){
								gjIndex = 0;
							}
							return;
						}
					}
				},5000);
				var browser=navigator.appName;
				var bversion=navigator.appVersion;
				var version=bversion.split(";");
				var trimVersion=version[1];//.replace(/[]/g,"");
				if(browser=="Microsoft Internet Explorer"&&trimVersion==" MSIE 8.0"){
					$.messager.alert('提示', '不支持IE8浏览器', 'warning');
					return ;
				}
				
				
				svgType=1;
				$('#divWaiting').window('open'); 
				
				//点击divCircle1圆圈初始化
				$("#divCircle1").click(function(){
					divCircle1Show();
				});
				//点击divCircle2圆圈初始化
				$("#divCircle2").click(function(){
					divCircle2Show();
					userResize.call($('#fuPanel'));
				});
				
				
			    /*手指放在屏幕上*/
			    document.addEventListener("touchstart",function(e){
//			     e.preventDefault();
			     var touch = e.touches[0];
			     startX = touch.pageX;
			     startY = touch.pageY;
			     initialPos = 0; //本次滑动前的初始位置
			     btmPanel.style.webkitTransition = ""; //取消动画效果
			     startT = new Date().getTime(); //记录手指按下的开始时间
			     isMove = false; //是否产生滑动
			    }.bind(this),false);
			    
			    /*手指在屏幕上滑动，页面跟随手指移动*/
			    document.addEventListener("touchmove",function(e){
//			     e.preventDefault();
			     var touch = e.touches[0];
			     deltaX = touch.pageX - startX;
			     deltaY = touch.pageY - startY;
			     //如果X方向上的位移大于Y方向，则认为是左右滑动
			     if (Math.abs(deltaX) > Math.abs(deltaY)){
			      moveLength = deltaX;
//			      var translate = initialPos + deltaX; //当前需要移动到的位置
			      isMove = true;
			      //如果translate>0 或 < maxWidth,则表示页面超出边界
//			      if (translate <=0 && translate >= maxWidth){
//			       //移动页面
//			       this.transform.call(btmPanel,translate);
//			       isMove = true;
//			      }
			      direction = deltaX>0?"right":"left"; //判断手指滑动的方向
			     }
			    }.bind(this),false);
			    
			    /*手指离开屏幕时，计算最终需要停留在哪一页*/
			    document.addEventListener("touchend",function(e){
//			     e.preventDefault();
			     var translate = 0;
			     //计算手指在屏幕上停留的时间
			     var deltaT = new Date().getTime() - startT;
			     if (isMove){ //发生了左右滑动
			    	 if(deltaX>0){
			    		 divCircle1Show();
			    	 }else if(deltaX<0){
			    		 divCircle2Show();
						 userResize.call($('#fuPanel'));
			    	 }
//			      //使用动画过渡让页面滑动到最终的位置
//			      btmPanel.style.webkitTransition = "0.3s ease -webkit-transform";
//			      if(deltaT < 300){ //如果停留时间小于300ms,则认为是快速滑动，无论滑动距离是多少，都停留到下一页
//			       translate = direction == 'left'?
//			       currentPosition-(pageWidth+moveLength):currentPosition+pageWidth-moveLength;
//			       //如果最终位置超过边界位置，则停留在边界位置
//			       translate = translate > 0 ? 0 : translate; //左边界
//			       translate = translate < maxWidth ? maxWidth : translate; //右边界
//			      }else {
//			       //如果滑动距离小于屏幕的50%，则退回到上一页
//			       if (Math.abs(moveLength)/pageWidth < 0.5){
//			        translate = currentPosition-moveLength;
//			       }else{
//			        //如果滑动距离大于屏幕的50%，则滑动到下一页
//			        translate = direction == 'left'?
//			        currentPosition-(pageWidth+moveLength):currentPosition+pageWidth-moveLength;
//			        translate = translate > 0 ? 0 : translate;
//			        translate = translate < maxWidth ? maxWidth : translate;
//			       }
//			      }
			      //执行滑动，让页面完整的显示到屏幕上
//			      this.transform.call(btmPanel,translate);
			     }
			    }.bind(this),false);
//			    /*手指在屏幕上滑动，页面跟随手指移动*/
//			    document.addEventListener("touchmove",function(e){
////			     e.preventDefault();
//			     var touch = e.touches[0];
//			     var deltaX = touch.pageX - startX;
//			     var deltaY = touch.pageY - startY;
//			     //如果X方向上的位移大于Y方向，则认为是左右滑动
//			     if (Math.abs(deltaX) > Math.abs(deltaY)){
//			      moveLength = deltaX;
//			      var translate = initialPos + deltaX; //当前需要移动到的位置
//			      //如果translate>0 或 < maxWidth,则表示页面超出边界
//			      if (translate <=0 && translate >= maxWidth){
//			       //移动页面
//			       this.transform.call(btmPanel,translate);
//			       isMove = true;
//			      }
//			      direction = deltaX>0?"right":"left"; //判断手指滑动的方向
//			     }
//			    }.bind(this),false);
//			    
//			    /*手指离开屏幕时，计算最终需要停留在哪一页*/
//			    document.addEventListener("touchend",function(e){
//			     e.preventDefault();
//			     var translate = 0;
//			     //计算手指在屏幕上停留的时间
//			     var deltaT = new Date().getTime() - startT;
//			     if (isMove){ //发生了左右滑动
//			      //使用动画过渡让页面滑动到最终的位置
//			      btmPanel.style.webkitTransition = "0.3s ease -webkit-transform";
//			      if(deltaT < 300){ //如果停留时间小于300ms,则认为是快速滑动，无论滑动距离是多少，都停留到下一页
//			       translate = direction == 'left'?
//			       currentPosition-(pageWidth+moveLength):currentPosition+pageWidth-moveLength;
//			       //如果最终位置超过边界位置，则停留在边界位置
//			       translate = translate > 0 ? 0 : translate; //左边界
//			       translate = translate < maxWidth ? maxWidth : translate; //右边界
//			      }else {
//			       //如果滑动距离小于屏幕的50%，则退回到上一页
//			       if (Math.abs(moveLength)/pageWidth < 0.5){
//			        translate = currentPosition-moveLength;
//			       }else{
//			        //如果滑动距离大于屏幕的50%，则滑动到下一页
//			        translate = direction == 'left'?
//			        currentPosition-(pageWidth+moveLength):currentPosition+pageWidth-moveLength;
//			        translate = translate > 0 ? 0 : translate;
//			        translate = translate < maxWidth ? maxWidth : translate;
//			       }
//			      }
//			      //执行滑动，让页面完整的显示到屏幕上
//			      this.transform.call(btmPanel,translate);
//			     }
//			    }.bind(this),false);
			    
//			  //计算当前的页码
//			    pageNow = Math.round(Math.abs(translate) / pageWidth) + 1;
//			     
//			    setTimeout(function(){
//			     //设置页码，DOM操作需要放到子线程中，否则会出现卡顿
//			     this.setPageNow();
//			    }.bind(this),100);
			    
			    
				//定时刷新页面切换
				setInterval(function(){selectCircle();},120000);
				//实时数据刷新
				setInterval(bindSvgSet, 5000);
				//全局变量清空
				svgList = [];
				mpRef = [];
				mpidByOracle="";
				devIdByOracle="";
				svgId = "";
				getSvg();
			}else{
				$.messager.alert('提示', '户号不存在！', 'warning');
				return;
			}			
		}
	});
}

function tempResize(){
	SetSVGViewBox();
	userResize.call($("#btmPanel"));
}

//点击divCircle1圆圈事件
function divCircle1Show(){
	$("#liSVG").removeClass("hidden");
	$("#fuPanel").addClass("hidden");
	$("#divCircle1").addClass("circleSelect");
	$("#divCircle2").removeClass("circleSelect");
	$("#divUserTran").removeClass("hidden");
	$("#divUserSvg").removeClass("hidden");
	$("#divNoEnergyMessage").removeClass("hidden");
	SetSVGViewBox();
}
//点击divCircle2圆圈事件
function divCircle2Show(){
	$("#liSVG").addClass("hidden");
	$("#fuPanel").removeClass("hidden");
	$("#divCircle1").removeClass("circleSelect");
	$("#divCircle2").addClass("circleSelect");
	$("#divUserTran").addClass("hidden");
	$("#divUserSvg").addClass("hidden");
	$("#divNoEnergyMessage").addClass("hidden");
	userResize.call($('#fuPanel'));
}
//定时刷新页面切换
function selectCircle(){
	if(idFirst == true){
		$("#liSVG").addClass("hidden");		
		$("#divCircle1").removeClass("circleSelect");
		$("#divCircle2").addClass("circleSelect");
		$("#fuPanel").removeClass("hidden");
		$("#divUserTran").addClass("hidden");
		$("#divUserSvg").addClass("hidden");
		$("#divNoEnergyMessage").addClass("hidden");
		userResize.call($('#fuPanel'));
		idFirst = false;
	}else{
		if($("#liSVG").attr('class') == "hidden"){
			$("#liSVG").removeClass("hidden");
			$("#divCircle1").addClass("circleSelect");
			$("#fuPanel").addClass("hidden");
			$("#divCircle2").removeClass("circleSelect");
			$("#divUserTran").removeClass("hidden");
			$("#divUserSvg").removeClass("hidden");
			$("#divNoEnergyMessage").removeClass("hidden");
			SetSVGViewBox();
		}else{
			$("#liSVG").addClass("hidden");
			$("#divCircle1").removeClass("circleSelect");
			$("#fuPanel").removeClass("hidden");
			$("#divCircle2").addClass("circleSelect");
			$("#divUserTran").addClass("hidden");
			$("#divUserSvg").addClass("hidden");
			$("#divNoEnergyMessage").addClass("hidden");
			userResize.call($('#fuPanel'));
		}
	}
}

var nowHH = '';
function findNowTime(){
	setInterval(function (){
		var dt = new Date();
		var hh = dt.getHours()<10?'0'+dt.getHours():dt.getHours();
		var mm = dt.getMinutes()<10?'0'+dt.getMinutes():dt.getMinutes();
		nowHH = hh;
		$("#nowTime").text(hh+':'+mm);
	},1000);
	
}

/**
 * 查看详细信息
 */
function showGaojing(){
	$('#show-panel').dialog('open');
	if(gjData != null){
		var gjId = $('#gjSel').val();
		 
		for(var i=0;i<gjData.length;i++){
			if(i==gjId){
				$('#consNo').text(gjData[i].consNo==null?'':gjData[i].consNo);
				$('#consName').text(gjData[i].consName==null?'':gjData[i].consName);
				$('#subsName').text(gjData[i].subsName==null?'':gjData[i].subsName);
				$('#devName').text(gjData[i].deviceName==null?'':gjData[i].deviceName);
				$('#devType').text(gjData[i].deviceTypeName==null?'':gjData[i].deviceTypeName);
				$('#devLevel').text(gjData[i].alarmLevelName==null?'':gjData[i].alarmLevelName);
				$('#devMemo').text(gjData[i].alarmDesc==null?'':gjData[i].alarmDesc);
				$('#devStatus').text(gjData[i].confirmFlagName==null?'':gjData[i].confirmFlagName);
				$('#devTime').text(gjData[i].alarmStartTime==null?'':gjData[i].alarmStartTime);
				$('#devValue').text(gjData[i].alarmValue==null?'':gjData[i].alarmValue);
			}
		}
		
	}
}

/**
 * 告警信息
 */
function queryGaojing(){
	$.post(webContextRoot +'warn/queryRealTimeAlarm.action', //请求路径
			{
	 			'gaoJIngChaXunSYModel.bianwei' :0,
	 			'gaoJIngChaXunSYModel.gaojing' :1,
	 			'gaoJIngChaXunSYModel.alarmStartTime' : '',
	 			'gaoJIngChaXunSYModel.alarmEndTime' : '',
	 			'gaoJIngChaXunSYModel.consId': consId,
	 			'gaoJIngChaXunSYModel.subsId': '',
	 			'gaoJIngChaXunSYModel.deviceType': '',
	 			'gaoJIngChaXunSYModel.dataDate': '',
	 			'gaoJIngChaXunSYModel.confirmFlag': '',
	 			'gaoJIngChaXunSYModel.mpId': '',
	 			'gaoJIngChaXunSYModel.alarmLevel': '',
	 			'gaoJIngChaXunSYModel.deviceName': ''
			},//请求参数
		   	function(data){//回调
				if(data != null){
					if(data.sMap != null){
						if(data.sMap.rows.length != 0){
							gjData = data.sMap.rows;
							$('#ckBtn').css('display','block');
						}
					}
				}
				
		   	},"json");
	/*
	setInterval(function (){
		for(var i = gjIndex;i<gjData.length ;i++){
			$('#gjSeq').text(i+1);
			$('#gjDev').text(gjData[i].alarmDesc);
			$('#gjStatus').text(gjData[i].confirmFlagName);
			$('#gjSel').val(i); 
			gjIndex ++;
			if(gjIndex == gjData.length){
				gjIndex = 0;
			}
			return;
		}
	},5000);*/
}

/**
 * 首页负荷信息
 */
function queryShouYePowerValue(){
	$.post(webContextRoot + 'monitorCanvas/queryShouYeInfo.action', 
			{ 
			   //请求参数
			   'consId': consId//客户或者区域编码
			},
			function(data){
				if(data.length > 0){
					$('#powerValue').text(data[0].powerValue);
					if(Number(data[0].powerValue) > Number(data[0].brMaxPowerValue)){
						$('#brMaxPowerValue').text(data[0].powerValue);
					}else{
						$('#brMaxPowerValue').text(data[0].brMaxPowerValue);
					}
					if(Number(data[0].powerValue) > Number(data[0].zrMaxPowerValue)){
						$('#byMaxPowerValue').text(data[0].powerValue);
					}else{
						$('#byMaxPowerValue').text(data[0].byMaxPowerValue);
					}
					$('#zrMaxPowerValue').text(data[0].zrMaxPowerValue);
					$('#brYxCount').text(data[0].brYxCount);
					$('#zrYxCount').text(data[0].zrYxCount);
					$('#byYxCount').text(data[0].byYxCount);
					
					$('#qwms').text(data[0].temperatureName);
					if(data[0].temperature != '-'){
						$('#qw').text(data[0].temperature+'℃');
					}else{
						$('#qw').text('-');
					}
					var src = '';
					if(data[0].temperatureName == '晴'){
						src = webContextRoot+'/images/weather_d00.png';
					}else if(data[0].temperatureName == '多云'){
						src = webContextRoot+'/images/weather_d01.png';
					}else if(data[0].temperatureName == '阴'){
						src = webContextRoot+'/images/weather_d02.png';
					}else if(data[0].temperatureName == '阵雨'){
						src = webContextRoot+'/images/weather_d03.png';
					}else if(data[0].temperatureName == '雷阵雨'){
						src = webContextRoot+'/images/weather_d04.png';
					}else if(data[0].temperatureName == '雷阵雨伴有冰雹'){
						src = webContextRoot+'/images/weather_d05.png';
					}else if(data[0].temperatureName == '雨夹雪'){
						src = webContextRoot+'/images/weather_d06.png';
					}else if(data[0].temperatureName == '小雨'){
						src = webContextRoot+'/images/weather_d07.png';
					}else if(data[0].temperatureName == '中雨' || data[0].temperatureName == '小雨-中雨' ){
						src = webContextRoot+'/images/weather_d08.png';
					}else if(data[0].temperatureName == '大雨' || data[0].temperatureName == '中雨-大雨' ){
						src = webContextRoot+'/images/weather_d09.png';
					}else if(data[0].temperatureName == '暴雨' || data[0].temperatureName == '大雨-暴雨'){
						src = webContextRoot+'/images/weather_d10.png';
					}else if(data[0].temperatureName == '大暴雨' || data[0].temperatureName == '暴雨-大暴雨'){
						src = webContextRoot+'/images/weather_d11.png';
					}else if(data[0].temperatureName == '特大暴雨' || data[0].temperatureName == '大暴雨-特大暴雨'){
						src = webContextRoot+'/images/weather_d12.png';
					}else if(data[0].temperatureName == '阵雪'){
						src = webContextRoot+'/images/weather_d13.png';
					}else if(data[0].temperatureName == '小雪'){
						src = webContextRoot+'/images/weather_d14.png';
					}else if(data[0].temperatureName == '中雪' || data[0].temperatureName == '小雪-中雪'){
						src = webContextRoot+'/images/weather_d15.png';
					}else if(data[0].temperatureName == '大雪' || data[0].temperatureName == '中雪-大雪'){
						src = webContextRoot+'/images/weather_d16.png';
					}else if(data[0].temperatureName == '暴雪' || data[0].temperatureName == '大雪-暴雪'){
						src = webContextRoot+'/images/weather_d17.png';
					}else if(data[0].temperatureName == '雾'){
						src = webContextRoot+'/images/weather_d18.png';
					}else if(data[0].temperatureName == '冻雨'){
						src = webContextRoot+'/images/weather_d19.png';
					}else if(data[0].temperatureName == '沙尘暴'){
						src = webContextRoot+'/images/weather_d20.png';
					}else if(data[0].temperatureName == '浮尘'){
						src = webContextRoot+'/images/weather_d21.png';
					}else if(data[0].temperatureName == '扬沙'){
						src = webContextRoot+'/images/weather_d22.png';
					}else if(data[0].temperatureName == '强沙尘暴'){
						src = webContextRoot+'/images/weather_d23.png';
					}else if(data[0].temperatureName == '霾'){
						src = webContextRoot+'/images/weather_d24.png';
					}else if(data[0].temperatureName == '晴' && nowHH > 18){
						src = webContextRoot+'/images/weather_n00.png';
					}else if(data[0].temperatureName == '多云' && nowHH > 18){
						src = webContextRoot+'/images/weather_n01.png';
					}else if(data[0].temperatureName == '阵雨' && nowHH > 18){
						src = webContextRoot+'/images/weather_n02.png';
					}else if(data[0].temperatureName == '阵雪' && nowHH > 18){
						src = webContextRoot+'/images/weather_n03.png';
					}else{
						src = webContextRoot+'/images/weather_d00.png';
					}
					$('#img').attr('src',src);
					
//					data = "[{"brMaxPowerValue":"75.0453","brPowerValue":"","brYxCount":"0","byMaxPowerValue":"","byYxCount":"0","powerValue":"0.00","queryDate":"","zrMaxPowerValue":"76.4673","zrPowerValue":"","zrYxCount":"0"}]
					
				}
			},"json");
	
}
  
/**
 * 查询负荷曲线
 */
function queryPowerValueData(){
	
	fhChart.showLoading({
		text:'正在努力的读取数据中...',
		effect:'spin'
	});
	$.getJSON(webContextRoot + 'monitorCanvas/queryPowerValueInfo.action', 
		{ 
		   //请求参数
		   'consId': consId//客户或者区域编码
		},
		function(json){
			powerValueChart(json);//echarts曲线图
			fhChart.hideLoading();//隐藏提示框
		}
	);
}

//echarts曲线图
function powerValueChart(dataMap){
	var series = [];//图标曲线集
	var legend = ['昨日负荷曲线','今日负荷曲线'];
	 
	series.push( {
        name: '昨日负荷曲线',
        type: 'line',
        data:dataMap.sMap.zrData,//数据,
        itemStyle: { normal: {color:'white'}},
        nameTextStyle:{
        	color:'white'
        }
    },{
        name: '今日负荷曲线',
        type: 'line',
        data:dataMap.sMap.brData,//数据,
        itemStyle: { normal: {color:'red'}},
        nameTextStyle:{
        	color:'red'
        }
    });
	 
	var option = {
	    title: {
	    	text: '实时负荷曲线',
	    	textStyle:{color:'white'},
	        y: '0px',
	        left: 'center'
	    },
	    tooltip: {
	    	trigger: 'axis',
	    	formatter: function(params) {
	    		var paramResult = '';
	    		if(params != null && params.length > 0){
	    			 paramResult = params[0].name + '<br/>';
	    		}
	    		
	    		for(var i=0;i<params.length;i++){
	    			paramResult += params[i].seriesName.split('(')[0]+':'+params[i].value+' kW'+ '<br/>';
	    		}
	    		return paramResult;
	    	}
	    },
	    legend: {
	        left: 'center',
	        data: legend,
	        shown:false,
	        y:'25',
	        textStyle:{color:'white'}
	    },
	    grid : {
 			 x : 75, //左边距离
 			 y : 55,//上边距离
 			 x2 : 25,//右边距离
 			 y2 : 50//下边距离
 		},
	    xAxis: {
	    	  type: 'category',
	          boundaryGap: false,
	          data:dataMap.sMap.queryDate,
	          axisLabel:{
	        	  show:true,
		          textStyle:{color:'#02A7A8'}
	          },
	          axisLine:{
	            	lineStyle:{
	            		color:'#02A7A8',
	            		width:1
	            	}
	            }	          
	          },
	    yAxis: {
	    	name: '单位(kW)',
	    	  type: 'value',
	            splitNumber: 5,
	            splitLine: {
	                lineStyle: {
	                    color: '#dfdfdf',
	                    width: 0,
	                    type: 'dashed'
	                }
	            },
	            axisLabel: {
	                formatter: '{value}',
	                show:true,
			        textStyle:{color:'#02A7A8'}
	            },
	            axisLine:{
	            	lineStyle:{
	            		color:'#02A7A8',
	            		width:1
	            	}
	            },
	            nameTextStyle:{
	            	color:'#02A7A8'
	            },
	            min:'auto',
	            max:'auto'
	    },
	    series: series
	        
	};
    fhChart.setOption(option,true);
    userResize();
}

/*******************************************************************************
 * 开关动画切换
 * 
 * @param svgId
 * @param dataValue
 * @param xy
 * @param oneOrTwo
 */
function IniFunc(svgId, dataValue, xy, oneOrTwo) {
	for (var i = 0, len = svgId.length; i < len; i++) {
		(function() {
			var myData = parseInt(dataValue[i]);
			var myId = svgId[i];
			$("#rec_" + myId).bind("click", function() {
				Open_Close($('#' + myId), xy, oneOrTwo, myData);
			});
		})();
	}
}
/*******************************************************************************
 * 开关动画
 * 
 * @param obj
 * @param isY
 * @param num
 * @param oldValue
 */
function Open_Close(obj, isY, num, oldValue) {
	/*
	 * if (typeof ($(obj).attr("close")) == "undefined" || $(obj).attr("close") ==
	 * "false") { $(obj).attr("close", "true"); if (num == 1) { $(obj).attr(isY +
	 * "1", $(obj).attr(isY + "2")); } else { $(obj).attr(isY + "2",
	 * $(obj).attr(isY + "1")); } } else { $(obj).attr("close", "false");
	 * $(obj).attr(isY + num, oldValue); }
	 */
}
/*******************************************************************************
 * 当前显示开关状态
 * 
 * @param obj
 * @param isY
 * @param num
 * @param oldValue
 * @param isClose,1:true,0:flase
 */
function Open_Close_current(obj, isY, num, oldValue, isClose) {
	if (!isClose) {
		$(obj).attr("close", "false");
		$(obj).attr(isY + num, oldValue);
	} else {
		$(obj).attr("close", "true");
		if (num == 1) {
			$(obj).attr(isY + "1", $(obj).attr(isY + "2"));
		} else {
			$(obj).attr(isY + "2", $(obj).attr(isY + "1"));
		}
	}
}

/***
 * 选中SVG编号
 */
var selectSvgId="";
var userTranId="";
/*******************************************************************************
 * 获取一次接线图配置
 */
function getSvg() {
//	$('#divNewbrandSpan').combobox({
//		url : webContextRoot+ 'monitorCanvas/querySutEnergy.action?consId='+ consId,
//		method : 'get',
//		valueField : 'subsId',
//		textField : 'subsName',
//		multiple : false,// 是否支持多选
//		onLoadSuccess: function(){
//			var userTranData = $(this).combobox("getData");
//			$('#divNewbrandSpan').combobox('select',userTranData[0].subsId);
//    	},
//    	onSelect : function(record) {
//    		getSvgIni(record.subsId);
//		}
//    });
	$.ajax({
		type : "post",
		url : webContextRoot + 'monitorCanvas/querySutEnergy.action',
		dataType : "json",
		data : {
			'consId' : consId
		},
		success : function(data) {
			$("#ulbrand").children('li').remove();
			$('#divNewbrandSpan').text('');
			$("#ulimg").children('li').remove();
			$('#divNewimgSpan').text('');
			$('#imgComboBoxDiv').css({
				'opacity' : '0.3'
			});
			$('#divNewimg').css({
				'cursor' : 'default'
			});
			hasNoSvgTag = true;
			if (data.length > 0) {
				$('#divNewbrandSpan').text(data[0].subsName);
				clickSubs(data[0].subsId);
				var strBrand = "";
				var charWidth=100;
				var subsIdArr=[];
				for (var i = 0, len = data.length; i < len; i++) {
					if (i == 0) {
						lastLiBtn = data[i].subsId;
						strBrand = "<li id="
								+ data[i].subsId
								+ " class='brand' style='font-size:16px;text-align: justify;cursor: pointer;color:write;" +
										"padding: 2px 5px 5px 10px;background:#707070;' onclick=clickSubs("			
							+ "\""+data[i].subsId+"\",\""+data[i].subsName+"\")><span id='a"+data[i].subsId+"'>"
								+ data[i].subsName + "</span></li>";
					} else if (i % 2 == 1) {
						strBrand += "<li id="
								+ data[i].subsId
								+ " class='brand' style='font-size:16px;text-align: justify;cursor: pointer;color:write;" +
										"padding: 2px 5px 5px 10px;' onclick=clickSubs("			
							+ "\""+data[i].subsId+"\",\""+data[i].subsName+"\")><span id='a"+data[i].subsId+"'>"
								+ data[i].subsName + "</span></li>";
					} else if (i % 2 == 0) {
						strBrand += "<li id="
								+ data[i].subsId
								+ " class='brand' style='font-size:16px;text-align: justify;cursor: pointer;color:write;" +
										"padding: 2px 5px 5px 10px;' onclick=clickSubs("			
							+ "\""+data[i].subsId+"\",\""+data[i].subsName+"\")><span id='a"+data[i].subsId+"'>"
								+ data[i].subsName + "</span></li>";
					}
					subsIdArr[subsIdArr.length]=data[i].subsId;
				}
				$("#ulbrand").append(strBrand);
			}else{
				$("#divOrgSmallText").removeClass("hand");
				$("#divOrgText").removeClass("hand");
				$("#divOrgBigText").removeClass("hand");
				$("#divOrgSmallText").addClass("normal");
				$("#divOrgText").addClass("normal");
				$("#divOrgBigText").addClass("normal");
				$("#divOrgText").css("color","#333333");				
				$("#divbrandText").html(consName);
			}
		}
	});
//	$.ajax({
//		type : "post",
//		url : webContextRoot + 'monitorCanvas/querySutEnergy.action',
//		dataType : "json",
//		data : {
//			'consId' : consId
//		},
//		success : function(data) {
//			/***
//			 * 第一次加载SVG列表显示
//			 */
//			if(svgId==""&&data.length>1){
//
//				for (var i = 0, len = data.length; i < len; i++) {	
//					/***
//					 * 初始化加载默认显示第一个SVG
//					 */
//					if(i==0){
//						selectSvgId=data[i].svgId;
//						userTranId = data[i].userTranId
//					}
//				}				
//			}
//			
//			if (data.length > 0) {
//				/***
//				 * 初始化时，默认显示第一个SVG图
//				 */
//				if(selectSvgId==""){
//					selectSvgId=data[0].svgId;
//					userTranId = data[0].userTranId
//				}
//				/***
//				 * 初始化加载第一个SVG内容
//				 */
//				if (data[0].svg.trim() == ""&&svgId=="") {
//					/***
//					 * SVG编号赋空值
//					 */
//					selectSvgId="";
//					/***
//					 * 等待框关闭
//					 */
//					$('#divWaiting').window('close'); 
//				} else {
//					if (svgId == "") {
//						/***
//						 * 初始化显示第一个SVG
//						 */
//						document.getElementById('liSVG').innerHTML = data[0].svg;					    	
//				    	viewHt = $("#svg_Main").attr("height");
//				    	viewWd = $("#svg_Main").attr("width");
//					} else {
//						/***
//						 * 切换显示对应选中的SVG图
//						 */
//						for (var i = 0, len = data.length; i < len; i++) {
//							if (data[i].svgId == svgId) {
//								document.getElementById('liSVG').innerHTML = data[i].svg;
//							}
//						}				
//					}
//					if(document.getElementById('liSVG').innerHTML==""){
//						/***
//						 * 没有SVG图，显示尚未配置监控信息
//						 */
//						setNoSvg();
//						/***
//						 * 关闭等待框
//						 */
//						$('#divWaiting').window('close'); 
//					}else{
//
//						SetSVGViewBox();
//						/***
//						 * 绑定SVG数据库配置信息
//						 */
//						bindOracleSusSVG();													
//					}						
//				}
//			} else {
//				/***
//				 * 没有SVG图，显示尚未配置监控信息
//				 */
//				setNoSvg();
//				/***
//				 * 关闭等待框
//				 */
//				$('#divWaiting').window('close'); 
//			}
//		}
//	});
}

/*******************************************************************************
 * 提示信息
 * 
 * @param svgId
 * @param conts
 */
function showTip(svgId,conts) {	
	//判断是否是谷歌浏览器
	var isChrome=navigator.userAgent.toLowerCase().match(/chrome/)!=null;
	if(isChrome){
		$("#" + svgId).webuiPopover('destroy').webuiPopover({
			cache : false,
			content : "<div style='font-size: 12px;white-space:nowrap;'>"+conts+"</div>",
			placement:'top-left',
			trigger:'hover',
			animation : "pop"
		});
	}else{
		$('#' + svgId).tooltip({
			position : 'top',
			content : "<div class='lt' style='font-size: 12px;'>"+conts+"</div>"//,
		});
	}
}

//function showCircleTip(svgId,conts){
//	$("#" + svgId).webuiPopover('destroy').webuiPopover({
//		cache : false,
//		trigger : "hover",
//		content : conts,
//		width:200,
//		placement : "auto-top",
//		animation : "pop"
//	});
//}

/*******************************************************************************
 * 读取数据库SVG配置信息
 */
var mpidByOracle = "";
var devIdByOracle = "";
var svgList = [];
var mpRef = [];
var svgId = "";
var svgNameItem = "";
var errorTime = 3;
function bindOracleSusSVG() {
	svgList = [];
	mpRef = [];
	mpidByOracle="";
	devIdByOracle="";	
	$.ajax({
				type : "post",
				url : webContextRoot + 'monitorCanvas/querySvgPeiZhi.action',
				dataType : "json",
				data : {
					'svgId':selectSvgId
				},
				complete:function(XMLHttpRequest,textStatus){
					$('#divWaiting').window('close'); 
				},
				success : function(data) {
					selectSvgId="";
					svgList = data;
					var divIds = "";
					// if(data.length>0){
					// mpidByOracle=data[0].sfMpId;
					// devIdByOracle=data[0].deviceId;
					// }
					// svg编号
					var svgArr = [];
					// 数值
					var dataValueArr = [];
					// 横向或纵向显示开关
					var xyArr = [];
					// 显示开关位置
					var oneOrTwoArr = [];
					// 点击事件弹出详细：devClick显示状态值，yx_click和yc_click显示dataValue
					var runStatusOrValue = "";
					// 提示显示状态，或者显示值
					var runStatusOrValueType = "";
					// 判断是否无信号，当前时间与采集时间，相差3分钟以上为无信号
					// var date = new Date();
					// var currentdate = date.getFullYear() + "-"+
					// (date.getMonth() + 1) + "-" + date.getDate()
					// + " " + date.getHours() + ":" + date.getMinutes()+ ":" +
					// date.getSeconds();
					var millDiff = 0;
					tips = "";
					collTime = "";
					workStatus = "";					

					var svgSetObj = [];// data[i].susSVGList;

					for (var i = 0, len = data.length; i < len; i++) {
						if(i==len-1){
							if(data[i].errorTime!=null&&data[i].errorTime!=""){
								errorTime=data[i].errorTime;
							}
						}
						if (svgId == "") {
							svgSetObj = data[0].susSVGList;
						} else {
							if (svgId == data[i].svgId) {
								svgSetObj = data[i].susSVGList;
							}
						}
						for (var j = 0, length = svgSetObj.length; j < length; j++) {
							if (svgSetObj[j].sfMpId != null&& svgSetObj[j].sfMpId.length > 0) {
								mpidByOracle += (mpidByOracle.length > 0 ? ",": "")+ svgSetObj[j].sfMpId;
								
								if (typeof (mpRef[svgSetObj[j].sfMpId]) == "undefined") {
									mpRef[svgSetObj[j].sfMpId] = [];
									mpRef[svgSetObj[j].sfMpId][0] = svgSetObj[j];
								} else {
									mpRef[svgSetObj[j].sfMpId][mpRef[svgSetObj[j].sfMpId].length] = svgSetObj[j];
								}
							}
							if (svgSetObj[j].deviceId != null&& svgSetObj[j].deviceId.length > 0) {
								devIdByOracle += (devIdByOracle.length > 0 ? ",": "")+ svgSetObj[j].deviceId;
							}
							if(svgSetObj[j].isSwitch == "1")
							{
								if (svgSetObj[j].openobjId != "") {
									$("#" + svgSetObj[j].openobjId).attr("display","none");
								}
								if (svgSetObj[j].stopObjId != "") {
									$("#" + svgSetObj[j].stopObjId).attr("display",
											"none");
								}
								if (svgSetObj[j].noSingleId != "") {
									$("#" + svgSetObj[j].noSingleId).attr(
											"display", "none");
								}
	
								if (svgSetObj[j].origPosition!= ""&&svgSetObj[j].openType.trim()=="2") {
									svgArr[svgArr.length] = svgSetObj[j].objId;
									dataValueArr[dataValueArr.length] = svgSetObj[j].origPosition;
									xyArr[xyArr.length] = svgSetObj[j].dirct;
									oneOrTwoArr[oneOrTwoArr.length] = svgSetObj[j].oneOrTwo;
								}
							}
								// 投运
								if (svgSetObj[j].runStatus == "1") {
									if (svgSetObj[j].stopObjId != "") {
										$("#" + svgSetObj[j].stopObjId).attr("display", "none");
									}
								}
	
								if (svgSetObj[j].runStatus == "2") {
									if (svgSetObj[j].stopObjId != "") {
										$("#" + svgSetObj[j].stopObjId).attr("display", "block");
										$("#" + svgSetObj[j].objId).attr("display","none");
									}
								}
							

							// 设置颜色
							if (svgSetObj[j].selfVoltColor != null
									&& svgSetObj[j].selfVoltColor != "") {
								devColor = svgSetObj[j].selfVoltColor;
							} else {
								devColor = svgSetObj[j].voltColor;
							}

							// 依靠电压等级
							if (svgSetObj[j].byVolt == "1") {
								// 运行状态
								if (svgSetObj[j].runStatus == '1') {
									setStrokeOrFillColor(svgSetObj[j].objId,svgSetObj[j].stopType, devColor);
								} else {
									setStrokeOrFillColor(svgSetObj[j].objId,
											svgSetObj[j].stopType, devColor);
									if (svgSetObj[j].stopType == "1") {
										$("#" + svgSetObj[j].objId).attr("display", "none");
										$("#" + svgSetObj[j].stopObjId).attr("display", "block");
									}

									setControlColor(svgSetObj[j].objId, "stroke", "white",svgSetObj[j].stopType);
								}
							} else {
								if (svgSetObj[j].runStatus == '1') {
									if (svgSetObj[j].sfMpId != null
											&& svgSetObj[j].sfMpId.length > 0)
										// 数值
										if (svgSetObj[j].isSwitch != "1") {
											if (millDiff > 3) {
												if (svgSetObj[j].stopType == "2") {
//													$("#" + svgSetObj[j].objId).text("NS");
													setControlColor(svgSetObj[j].objId, "fill", "#ff0000",svgSetObj[j].stopType);
												}

											} else {
												switch (svgSetObj[j].stopType) {
												case "2":
													setControlColor(svgSetObj[j].objId, "fill", "white",svgSetObj[j].stopType);
													break;
												case "3":
													setControlColor(svgSetObj[j].objId, "fill", devColor,svgSetObj[j].stopType);
													break;
												case "4":
													setControlColor(svgSetObj[j].objId, "stroke", devColor,svgSetObj[j].stopType);
													break;
												}
											}
										} else {
											if (svgSetObj[j].stopType.trim() == "4") {
												setControlColor(svgSetObj[j].objId, "stroke", devColor,svgSetObj[j].stopType);
											}											
										}

								} else {// 根据停运
									setStrokeOrFillColor(svgSetObj[j].objId,svgSetObj[j].stopType, devColor);
									if (svgSetObj[j].stopType == "1") {
										$("#" + svgSetObj[j].objId).attr("display", "none");
										$("#" + svgSetObj[j].stopObjId).attr("display", "block");
									} else {
										setControlColor(svgSetObj[j].objId, "stroke", "white",svgSetObj[j].stopType);
									}
								}
							}
							
							switch(svgSetObj[j].openType.trim()){
								case "1":
									if (svgSetObj[j].openobjId != "") {
										$("#" + svgSetObj[j].objId).attr("display", "none");
										$("#" + svgSetObj[j].openobjId).attr("display", "block");
									}
									break;
								case "2"://x、y
									
									break;
								case "3":
									if(svgSetObj[j].runStatus == '1'){
										setStrokeOrFillColor(svgSetObj[j].objId,svgSetObj[j].stopType, devColor);
									}else{
										setControlColor(svgSetObj[j].objId, "fill", "none",svgSetObj[j].stopType);
										setControlColor(svgSetObj[j].objId, "stroke", "white",svgSetObj[j].stopType);
									}
									
									break;
								case "4"://更改填充色
									break;
								case "5"://更改边框
									break;
							}
							// 提示
							collTime = svgSetObj[j].collTime;
							// 当点击事件是dev_click，显示运行状态，其他状况显示值
							if (svgSetObj[j].clickEvent != "YC_Click") {
								runStatusOrValue = svgSetObj[j].runStatus == "1" ? "运行"
										: "停运";
								runStatusOrValueType = "投运状态";
							} else {
								runStatusOrValue = svgSetObj[j].dataValue;
								runStatusOrValueType = "<div class='flt mgl36'>值</div>";
							}
							if (svgSetObj[j].isSwitch == "1") {
								workStatus = "";//parseInt(svgSetObj[j].dataValue) == 1 ? "合": "分";
							}
							tips = "";
							if (svgSetObj[j].sfMpId != "") {
								tips = "测点名称：" + svgSetObj[j].mpName + "<br/>";
							}
							if (svgSetObj[j].devName != "") {
								tips += "<div class='flt mgl12'>设备名：</div>" + svgSetObj[j].devName + "<br/>";
							}
							if (svgSetObj[j].clickEvent == "DEV_Click") {
								tips += runStatusOrValueType + "："+ runStatusOrValue;

							} else {
								tips += "采集时间：" + collTime + "<br/>"+ runStatusOrValueType + "："+ runStatusOrValue;
							}
							if (svgSetObj[j].isSwitch == "1") {
								tips += "<br/>工作状态：" + workStatus;
							}
							(function() {
								var _objid = svgSetObj[j].objId;
								var ct = tips;
								showTip(_objid, ct);

							})();
							
							$("#" + svgSetObj[j].objId).attr("cursor","pointer");
							if (svgSetObj[j].stopObjId != "") {
								(function() {
									var _objid = svgSetObj[j].stopObjId;
									var ct = tips;
									showTip(_objid, ct);
								})();								
								$("#" + svgSetObj[j].stopObjId).attr("cursor","pointer");
							}
							if (svgSetObj[j].noSingleId != "") {
								(function() {
									var _objid = svgSetObj[j].noSingleId;
									var ct = tips;
									showTip(_objid, ct);
								})();

								$("#" + svgSetObj[j].noSingleId).attr("cursor","pointer");
							}
							if (svgSetObj[j].openobjId != "") {

								(function() {
									var _objid = svgSetObj[j].openobjId;
									var ct = tips;
									showTip(_objid, ct);

								})();
								$("#" + svgSetObj[j].openobjId).attr("cursor","pointer");
							}
							// 点击事件
							if (svgSetObj[j].clickEvent != null
									&& svgSetObj[j].clickEvent != "") {								
								//clickEvent(svgSetObj[j].deviceType,svgSetObj[j].deviceId,svgSetObj[j].objId);
								if (svgSetObj[j].openobjId != "") {
									//clickEvent(svgSetObj[j].deviceType,svgSetObj[j].deviceId,svgSetObj[j].openobjId);
								}
								if (svgSetObj[j].stopObjId != "") {
									//clickEvent(svgSetObj[j].deviceType,svgSetObj[j].deviceId,svgSetObj[j].stopObjId);
								}
								if (svgSetObj[j].noSingleId != "") {
									//clickEvent(svgSetObj[j].deviceType,svgSetObj[j].deviceId,svgSetObj[j].noSingleId);
								}
							}
							
							// console.log(svgSetObj.objId + "---byVolt:"+
							// svgSetObj.byVolt + "---runStatus:"+
							// svgSetObj.runStatus + "----isSwitch:"+
							// svgSetObj.isSwitch + "-----"+
							// svgSetObj.dataValue+"------stopType"+svgSetObj.stopType+"--------collTime:"+svgSetObj.collTime);
						}
					}

					IniFunc(svgArr, dataValueArr, xyArr, oneOrTwoArr);
					bindSvgSet();

					deviceSum = 0;
					for (var i = 0, len = svgSetObj.length; i < len; i++) {
						if (svgSetObj[i].sfMpId != ""
								&& divIds.indexOf(svgSetObj[i].deviceId) < 0) {
							divIds += svgSetObj[i].deviceId + "";
							deviceSum++;
						}
					}
				}
			});
}

//设备总数
var deviceSum = 0;

/**
 * 实时监控绑定数据
 */
function bindSvgSet() {
	/***************************************************************************
	 * 刷新时间
	 */
	// getSysDate();
	// var devColor = "";
	$.ajax({
		type : "post",
		url : webContextRoot + 'monitorCanvas/querySusMonitor.action',
		dataType : "json",
		data : {
			'sfMpId' : mpidByOracle,
			'deviceId' : devIdByOracle,
			'userTranId' : userTranId
		},
		success : function(data) {
			bindDataSveObject(data);
		}
	});
}

var tips = "";
var workStatus = "";
var collTime = "";
/*******************************************************************************
 * 绑定实时数据
 * 
 * @param data
 */
function bindDataSveObject(data) {
	// svg编号
	var svgArr = [];
	// 数值
	var dataValueArr = [];
	// 横向或纵向显示开关
	var xyArr = [];
	// 显示开关位置
	var oneOrTwoArr = [];
	// 点击事件弹出详细：devClick显示状态值，yx_click和yc_click显示dataValue
	var runStatusOrValue = "";
	// 提示显示状态，或者显示值
	var runStatusOrValueType = "";
	// 判断是否无信号，当前时间与采集时间，相差3分钟以上为无信号
	var date = new Date();
	var currentdate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-"
			+ date.getDate() + " " + date.getHours() + ":" + date.getMinutes()
			+ ":" + date.getSeconds();
	var millDiff = 0;
	tips = "";//提示
	collTime = "";//采集时间
	workStatus = "";//工作状态

	for (var i = 0, len = data.length; i < len; i++) {
		if (typeof (mpRef[data[i].sfMpId]) == "undefined") {
			break;
		} else {
			var svgObjs = mpRef[data[i].sfMpId];
			for (var svgIndex = 0, svgLen = svgObjs.length; svgIndex < svgLen; svgIndex++) {
				var svgObj = mpRef[data[i].sfMpId][svgIndex];
				
				
				//millDiff = MillDiff(currentdate, data[i].collTime);//间隔时间，大于3分钟显示无信号
				millDiff = MillDiff(data[i].sysTime, data[i].collTime);
				if(svgObj.isSwitch == "1")//判断是否为开关
				{
					if (svgObj.origPosition!= ""&&svgObj.openType.trim()=="2") {//开关类型为2，并且原始位置不为空
						svgArr[svgArr.length] = svgObj.objId;//赋值控件编号数组
						dataValueArr[dataValueArr.length] = svgObj.origPosition;//赋值，原始位置
						xyArr[xyArr.length] = svgObj.dirct;//开关方向x或y数组赋值
						oneOrTwoArr[oneOrTwoArr.length] = svgObj.oneOrTwo;//数组左右上下
					}
					/** ********************开关begin********************** */
					// 0：开1：关
					if (parseInt(data[i].dataValue) == 0) {
						// 投运
						if (data[i].runStatus == "1") {
							if (svgObj.openobjId != "") {//开关id
								$("#" + svgObj.openobjId).attr("display", "block");//运行状态，开关编号不为空，显示开关控件
								$("#" + svgObj.objId).attr("display", "none");//运行状态，开关编号不为空，隐藏对象控件
							}
							if (svgObj.stopObjId != "") {//停运id
								$("#" + svgObj.stopObjId).attr("display", "none");//运行状态，停运编号不为空，隐藏停运控件
								$("#" + svgObj.objId).attr("display", "none");//运行状态，停运编号不为空，隐藏对象控件
							}
						} else {
							if (svgObj.openobjId != "") {
								$("#" + svgObj.openobjId).attr("display", "none");//停运状态，开关编号不为空，隐藏开关控件
								$("#" + svgObj.objId).attr("display", "none");//停运状态，开关编号不为空，隐藏对象控件
							}
							if (svgObj.stopObjId != "") {
								$("#" + svgObj.stopObjId).attr("display", "block");//停运状态，停运编号不为空，显示停运控件
								$("#" + svgObj.objId).attr("display", "none");//停运状态，停运编号不为空，隐藏对象控件
							}
						}

						if (svgObj.origPosition!= ""&&svgObj.openType.trim()=="2") {
							Open_Close_current("#" + svgObj.objId, svgObj.dirct,
									svgObj.oneOrTwo, svgObj.origPosition, false);//初始化开关位置
						}
					} else if (parseInt(data[i].dataValue) == 1) {
						if (svgObj.openobjId != "") {
							$("#" + svgObj.objId).attr("display", "block");//显示对象控件
							$("#" + svgObj.openobjId).attr("display", "none");//隐藏开关控件
						}
						if (svgObj.origPosition!= ""&&svgObj.openType.trim()=="2") {
							Open_Close_current("#" + svgObj.objId, svgObj.dirct,
									svgObj.oneOrTwo, svgObj.origPosition, true);//初始化开关位置
						}
					}
					/** ********************开关end********************** */
				}
				// 设置颜色
				if (svgObj.selfVoltColor != null && svgObj.selfVoltColor != "") {
					devColor = svgObj.selfVoltColor;
				} else {
					devColor = svgObj.voltColor;
				}
				// 依靠电压等级
				if (svgObj.byVolt == "1") {
					// 运行状态
					if (data[i].runStatus == '1') {
						//运行
						setStrokeOrFillColor(svgObj.objId, svgObj.stopType,devColor);
					} else {//停运
						//停运
						setStrokeOrFillColor(svgObj.objId, svgObj.stopType,devColor);
						if (svgObj.stopType == "1") {//更换对象模式
							$("#" + svgObj.objId).attr("display", "none");//隐藏对象控件
							$("#" + svgObj.stopObjId).attr("display", "block");//显示停运控件
						}
						setControlColor(svgObj.objId,"stroke","white");
					}
				} else {
					if (data[i].runStatus == '1') {
						// 数值
						if (svgObj.isSwitch != "1") {//不是开关
							if (millDiff > errorTime) {//无信号
								if (svgObj.stopType == "2") {//停运状态为2，是文本
//									$("#" + svgObj.objId).text("NS");//文本显示为NS
									setControlColor(svgObj.objId,"fill","#ff0000");//设置颜色为红色
								}

							} else {
								$("#" + svgObj.objId).text((Math.round(data[i].dataValue * 100) / 100)+ '');//文本赋值
								switch (svgObj.stopType) {
								case "2":
									//文本
									setControlColor(svgObj.objId,"fill","white");
									break;
								case "3":
									//变更填充色fill
									setControlColor(svgObj.objId,"fill",devColor);
									break;
								case "4":
									//变更填充色stroke
									setControlColor(svgObj.objId,"stroke",devColor);
									break;
								}
							}
						} else {
							setControlColor(svgObj.objId,"stroke","none");
							if (svgObj.stopType.trim() == "4") {
								setControlColor(svgObj.objId,"stroke",devColor);//设置边框颜色
							}
							if (millDiff > errorTime && svgObj.noSingleId!="") {
									$("#" + svgObj.noSingleId).attr("display", "block");//大于3分钟显示无信号控件
							}else if(svgObj.noSingleId!=""){
								$("#" + svgObj.noSingleId).attr("display", "none");//小于3分钟，隐藏无信号控件
							}
						}

					} else {// 根据停运
						setStrokeOrFillColor(svgObj.objId, svgObj.stopType,devColor);//设置对象颜色
						if (svgObj.stopType == "1") {//更换对象
							$("#" + svgObj.objId).attr("display", "none");//隐藏对象编号
							$("#" + svgObj.stopObjId).attr("display", "block");//显示停运控件
						}
						if (svgObj.isSwitch == "1"){//开关
							setControlColor(svgObj.objId,"stroke","white");//设置边框为白色
							setControlColor(svgObj.objId,"fill","none");//不设置填充色
						}						
					}
				}
				if (errorTime > millDiff) {
					switch(svgObj.openType.trim()){
						case "1"://1：更换对象模式
							if (parseInt(data[i].dataValue)==0) {//0：开1：关
								$("#" + svgObj.objId).attr("display", "none");//隐藏对象控件
								$("#" + svgObj.openobjId).attr("display", "block");//显示开关控件
							}else{
								$("#" + svgObj.objId).attr("display", "block");//显示对象控件
								$("#" + svgObj.openobjId).attr("display", "none");//隐藏开关控件
							}
							break;
						case "2"://x、y	2、动态模式
							
							break;
						case "3"://3、方框开关
							if(parseInt(data[i].dataValue)==0){//0：开1：关
								setControlColor(svgObj.objId,"fill","none");
							}else{
								setControlColor(svgObj.objId,"fill",devColor);
							}
							if(data[i].runStatus == '1'){//运行
								setStrokeOrFillColor(svgObj.objId,svgObj.stopType, devColor);//设置控件颜色
							}else{//停运
								setControlColor(svgObj.objId,"fill","none");//不设置填充色
								setControlColor(svgObj.objId,"stroke","white");//边框设置白色
							}
							
							break;
						case "4"://更改填充色
							if(parseInt(data[i].dataValue)==0){//0：开1：关
								setControlColor(svgObj.objId,"fill","#00FF00");//设置填充色绿色
							}else{
								setControlColor(svgObj.objId,"fill","red");//设置填充色红色
							}
							break;
						case "5"://更改边框
							if(parseInt(data[i].dataValue)==0){
								setControlColor(svgObj.objId,"stroke","#00FF00");//设置边框绿色
							}else{
								setControlColor(svgObj.objId,"stroke","red");//设置边框红色
							}
							break;
					}
				}
				
				
				// 1红色 2橙色 3黄色 4灰色
				switch (data[i].alarmLevel) {
					case "1"://红色
						if(svgObj.alarmMode=="0"){//边框变色
							setControlColor(svgObj.objId,"stroke","red");//边框设置红色
						}else if(svgObj.alarmMode=="3"){//替换对象
							$("#" + svgObj.objId).attr("display","none");//对象控件隐藏
							$("#" + svgObj.alarmObjId).attr("display", "block");//告警控件显示
						}else{//填充色、文本
							setControlColor(svgObj.objId,"fill","red");//填充色设置红色
						}
						break;
					case "2"://2橙色 
						if(svgObj.alarmMode=="0"){//边框变色
							setControlColor(svgObj.objId,"stroke","#DB533F");//边框设置橙色 
						}else if(svgObj.alarmMode=="3"){//替换对象
							$("#" + svgObj.objId).attr("display","none");//对象控件隐藏
							$("#" + svgObj.alarmObjId).attr("display", "block");//告警控件显示
						}else{//填充色、文本
							setControlColor(svgObj.objId,"fill","#DB533F");//填充色设置橙色 
						}
						break;
					case "3"://3黄色 
						if(svgObj.alarmMode=="0"){//边框变色
							setControlColor(svgObj.objId,"stroke","yellow");//边框设置黄色 
						}else if(svgObj.alarmMode=="3"){//替换对象
							$("#" + svgObj.objId).attr("display","none");//对象控件隐藏
							$("#" + svgObj.alarmObjId).attr("display", "block");//告警控件显示
						}else{//填充色、文本
							setControlColor(svgObj.objId,"fill","yellow");//填充色设置黄色 
						}
						break;
					case "4"://4灰色
						if(svgObj.alarmMode=="0"){//边框变色
							setControlColor(svgObj.objId,"stroke","#D1D1D1");//边框设置灰色
						}else if(svgObj.alarmMode=="3"){//替换对象
							$("#" + svgObj.objId).attr("display","none");//对象控件隐藏
							$("#" + svgObj.alarmObjId).attr("display", "block");//告警控件显示
						}else{//填充色、文本
							setControlColor(svgObj.objId,"fill","#D1D1D1");//填充色设置灰色
						}
						break;
				}

				// 提示
				collTime = data[i].collTime;
				// 当点击事件是dev_click，显示运行状态，其他状况显示值
				if (svgObj.clickEvent != "YC_Click") {
					runStatusOrValue = data[i].runStatus == "1" ? "运行" : "停运";
					runStatusOrValueType = "投运状态";
				} else {
					runStatusOrValue = data[i].dataValue;
					runStatusOrValueType = "<div class='flt mgl36'>值</div>";
				}
				if (svgObj.isSwitch == "1") {
					workStatus = parseInt(data[i].dataValue) == 1 ?  "合（1）": "分（0）";//"关" : "开";
				}

				tips = "";
				if (svgObj.sfMpId != "") {
					tips = "测点名称：" + svgObj.mpName + "<br/>";
				}

				if (svgObj.devName != "") {
					tips += "<div class='flt mgl12'>设备名：</div>" + svgObj.devName + "<br/>";
				}
				if (svgObj.clickEvent == "DEV_Click") {
					tips += runStatusOrValueType + "：" + runStatusOrValue;

				} else {
					tips += "采集时间：" + collTime + "<br/>" + runStatusOrValueType
							+ "：" + runStatusOrValue;
				}
				if (svgObj.isSwitch == "1") {
					tips += "<br/>工作状态：" + workStatus;
				}

				showTip(svgObj.objId, tips);

				$("#" + svgObj.objId).attr("cursor", "pointer");
				if (svgObj.stopObjId != "") {
					showTip(svgObj.stopObjId, tips);
				}
				if (svgObj.noSingleId != "") {
					showTip(svgObj.noSingleId, tips);
				}
				if (svgObj.openobjId != "") {
					showTip(svgObj.openobjId, tips);
				}
				// 点击事件
				if (svgObj.clickEvent != null && svgObj.clickEvent != "") {
					//clickEvent(svgObj.deviceType, svgObj.deviceId,svgObj.objId);
					if (svgObj.openobjId != "") {
						//clickEvent(svgObj.deviceType, data[i].deviceId,svgObj.openobjId);
					}
					if (svgObj.stopObjId != "") {
						//clickEvent(svgObj.deviceType, data[i].deviceId,svgObj.stopObjId);
					}
					if (svgObj.noSingleId != "") {
						//clickEvent(svgObj.deviceType, data[i].deviceId,svgObj.noSingleId);
					}
				}

			}
		}
		// console.log(data[i].objId + "---byVolt:"+
		// data[i].byVolt + "---runStatus:"+
		// data[i].runStatus + "----isSwitch:"+
		// data[i].isSwitch + "-----"+
		// data[i].dataValue+"------stopType"+data[i].stopType+"--------collTime:"+data[i].collTime);
	}
	IniFunc(svgArr, dataValueArr, xyArr, oneOrTwoArr);
}

/*******************************************************************************
 * 点击调用事件
 * 
 * @param devType
 * @param devId
 * @param objId
 */
//var userTranId=0;
//function clickEvent(devType, devId, objId) {
//	(function() {
////		$("#" + objId).bind("click",
////			function() {
////			if(clickType=="DEV_Click"){
////				OpenWinUnRes(webContextRoot +"pages/areaEnergy/baseData/index.jsp?consId="
////						+ consId, "明细页面",screen.availWidth - 300,screen.availHeight - 260);
////			}else{
////				OpenWinUnRes(webContextRoot +"pages/areaEnergy/consDataCentre/getConsDetailTree.jsp?consId="
////				+ consId, "明细页面",screen.availWidth - 300,screen.availHeight - 260);
////			}
////			});
//		$("#" + objId).bind("click",
//				function() {
//					switch (devType) {
//					case "1":
//						OpenWinUnRes(webContextRoot+"areaEnergy/queryLineAtion.action?queryPara.lineId="+ devId+ "&queryPara.type=LINESELF&queryPara.subId="
//										+ userTranId, "明细页面",screen.availWidth - 300,screen.availHeight - 260);
//						break;
//					case "2":
//						OpenWinUnRes(webContextRoot+"areaEnergy/queryBsLineAtion.action?queryPara.bsId="+ devId+ "&queryPara.type=BSSELF&queryPara.subId="
//										+ userTranId, "明细页面",screen.availWidth - 300,screen.availHeight - 260);
//						break;
//					case "3":
//						OpenWinUnRes(webContextRoot+"areaEnergy/queryMasterSubstation.action?queryPara.tranId="+ devId+ "&queryPara.other=0&queryPara.subId="
//										+ userTranId, "明细页面",screen.availWidth - 300,screen.availHeight - 260);
//						break;
//					case "0":
//						OpenWinUnRes(webContextRoot+"areaEnergy/queryOtherEquipment.action?queryPara.id="+ devId+ "&queryPara.other=0&queryPara.isdevice=1&queryPara.subId="
//						+ userTranId, "明细页面",screen.availWidth - 300,screen.availHeight - 260);	
////						//其他设备节点  0
////						document.getElementById("rightFrame").src = webContextRoot+"areaEnergy/queryOtherEquipment.action?queryPara.subId="+pId+"&queryPara.id="+id
////						+"&queryPara.other=0&queryPara.isdevice=1";
//						break;
//					case "5":
//						OpenWinUnRes(webContextRoot+"areaEnergy/queryEnviromentalnuit.action?queryPara.id="+ devId+ "&queryPara.other=0&queryPara.isdevice=0&queryPara.subId="
//						+ userTranId, "明细页面",screen.availWidth - 300,screen.availHeight - 260);
////						//环境监测设备节点  5
////						document.getElementById("rightFrame").src = webContextRoot+"areaEnergy/queryEnviromentalnuit.action?queryPara.subId="+pId+
////						"&queryPara.id="+id+"&queryPara.other=0&queryPara.isdevice=0";
//						break;
//					case "6":
//						OpenWinUnRes(webContextRoot+"areaEnergy/queryEntranceGuard.action?queryPara.id="+ devId+ "&queryPara.other=0&queryPara.isdevice=0&queryPara.subId="
//						+ userTranId, "明细页面",screen.availWidth - 300,screen.availHeight - 260);	
////						//门禁节点  6
////						document.getElementById("rightFrame").src = webContextRoot+"areaEnergy/queryEntranceGuard.action?queryPara.subId="+pId+"&queryPara.id="+id
////						+"&queryPara.other=0&queryPara.isdevice=0";
//						break;
//					case "7":
//						OpenWinUnRes(webContextRoot+"areaEnergy/queryIllumNation.action?queryPara.id="+ devId+ "&queryPara.other=0&queryPara.isdevice=0&queryPara.subId="
//						+ userTranId, "明细页面",screen.availWidth - 300,screen.availHeight - 260);
////						//照明节点 7
////						document.getElementById("rightFrame").src = webContextRoot+"areaEnergy/queryIllumNation.action?queryPara.subId="+pId+"&queryPara.id="
////						+id+"&queryPara.other=0&queryPara.isdevice=0";
//						break;
//					case "8":
//						OpenWinUnRes(webContextRoot+"areaEnergy/queryOtherEquipment.action?queryPara.id="+ devId+ "&queryPara.other=0&queryPara.isdevice=0&queryPara.subId="
//						+ userTranId, "明细页面",screen.availWidth - 300,screen.availHeight - 260);
////						//非电器设备其他设备节点 8
////						document.getElementById("rightFrame").src = webContextRoot+"areaEnergy/queryOtherEquipment.action?queryPara.subId="+pId+"&queryPara.id="
////						+id+"&queryPara.other=0&queryPara.isdevice=0";
//						break;
//					}
//				});
//	})();
//}

/*******************************************************************************
 * 根据停运方式修改颜色
 * 
 * @param objId
 * @param stopType
 * @param devColor
 */
function setStrokeOrFillColor(objId, stopType, devColor) { 
	/**
	 * 获取该元素下所有的组
	 */
	var arr=$("#" + objId).find("g");
	for(var i=0,len=arr.length;i<len;i++){
		/***
		 * 获取每个组元素下子元素
		 */
		var arrObjs=arr.children();
		/**
		 * 遍历所有子元素，按停运方式更改颜色
		 */
		$.each(arrObjs, function(index, domEle) {
			switch (stopType) {
			case "2":
				$("#" + domEle.id).attr("stroke", "white");
				break;// 2、修改值为--
			case "3":
				$("#" + domEle.id).attr("fill", devColor);
				break;// 3、变更填充色fill
			case "4":
				$("#" + domEle.id).attr("stroke", devColor);
				break;// 4、变更边框色stroke
			}
		});
	}
	

	
	switch (stopType) {
	case "2":
		$("#" + objId).text("--");
		$("#" + objId).children().attr("stroke", "white");
		$("#" + objId).attr("stroke", "white");
		break;// 2、修改值为--
	case "3":
		$("#" + objId).children().attr("fill", devColor);
		$("#" + objId).attr("fill", devColor);
		break;// 3、变更填充色fill
	case "4":
		$("#" + objId).children().attr("stroke", devColor);
		$("#" + objId).attr("stroke", devColor);
		break;// 4、变更边框色stroke
	}
}

/*******************************************************************************
 * 判断是否有信息，当前时间与采集时间相差大于3分钟，为无信号
 * 
 * @param currentTime
 * @param collTime
 * @returns {Number}
 */
function MillDiff(currentTime, collTime) {
	var current = eval('new Date('
			+ currentTime.replace(/\d+(?=-[^-]+$)/, function(a) {
				return parseInt(a, 10) - 1;
			}).match(/\d+/g) + ')');
	var coll = eval('new Date('
			+ collTime.replace(/\d+(?=-[^-]+$)/, function(a) {
				return parseInt(a, 10) - 1;
			}).match(/\d+/g) + ')');
	var timeDiff = current.getTime() - coll.getTime();
	return timeDiff / 1000 / 60;
}

/*******************************************************************************
 * 打开窗口，不可拖动窗体大小
 * 
 * @param url
 * @param winName
 * @param width
 * @param height
 * @param isClosed
 */
function OpenWinUnRes(url, winName, width, height, isClosed) {
	xposition = 0;
	yposition = 0;

	if ((parseInt(navigator.appVersion) >= 4)) {
		xposition = (screen.width - width) / 2;
		yposition = (screen.height - height) / 2;
	}
	theproperty = "width=" + width + "," + "height=" + height + ","
			+ "location=0," + "menubar=0," + "resizable=0," + "scrollbars=1,"
			+ "status=1," + "titlebar=0," + "toolbar=0," + "hotkeys=0,"
			+ "screenx=" + xposition + "," // 仅适用于Netscape
			+ "screeny=" + yposition + "," // 仅适用于Netscape
			+ "left=" + xposition + "," // IE
			+ "top=" + yposition; // IE
	monwin = window.open(url, winName, theproperty, false);
	if (isClosed) {
		monwin.close();
		monwin = window.open(url, winName, theproperty, false);
	}
	monwin.focus();
}

/***
 * @param objId 控件编号
 * @param type stroke或者fill
 * @param devColor 颜色
 */
function setControlColor(objId, type, devColor,stopType) { 
	$("#" + objId).children().attr(type, devColor);
	$("#" + objId).attr(type, devColor);
	if(stopType=="2"&&devColor=="white"&&type=="fill"){
		$("#" + objId).text("--");
	}
	/**
	 * 获取该元素下所有的组
	 */
	var arr=$("#" + objId).find("g");
	for(var i=0,len=arr.length;i<len;i++){
		/***
		 * 获取每个组元素下子元素
		 */
		var arrObjs=arr.children();
		/**
		 * 遍历所有子元素，按停运方式更改颜色
		 */
		$.each(arrObjs, function(index, domEle) {			
			$("#" + domEle.id).attr(type, devColor);
			if(stopType=="2"&&devColor=="white"&&type=="fill"){
				$("#" + domEle.id).text("--");
			}
		});
	}
}

/***
 * 没有SVG图
 */
function setNoSvg(){
	document.getElementById('liSVG').innerHTML = "";
	document.getElementById('divNoEnergyMessage').innerHTML = "<font style='color:write;font-size:24px;font-family: Verdana, 宋体, serif;'>尚未配置！</font>";
}

/**
 * 等待遮罩层
 */
    $('#divWaiting').dialog({
    	title: '等待中',width: 250,height: 120,closed: true,cache: false,closable: false,modal: true   
    });
    
    function SetSVGViewBox() {
    	/***
    	 * 获取高度、宽度
    	 */
    	var ht1 = $("#liSVG").parent().height();
    	var wd2 = $("#liSVG").parent().width();
    	/***
    	 * 修改高度、宽度自适应
    	 */
    	$("#svg_Main").attr("height",ht1);
    	$("#svg_Main").attr("width", wd2);
//    	if((parseInt(wd2))<1025){
//    		$("#svg_Main").attr("height",600);
//        	$("#svg_Main").attr("width", 1000);
//    	}else{
//    		$("#svg_Main").attr("height",600);
//        	$("#svg_Main").attr("width", 1000);
//    	}
    	   	
    	if(document.getElementById("svg_Main")!=null){
    		document.getElementById("svg_Main").setAttribute("viewBox","0 0 "+viewWd+"  " + parseInt(viewHt));
//    		if(parseInt(ht1)>700 && parseInt(wd2)<1025){
//    			document.getElementById("svg_Main").setAttribute("viewBox","0 0 2000  " + parseInt(ht1+500));
//    		}else if(parseInt(ht1)<700 && parseInt(ht1)>600){
//    			document.getElementById("svg_Main").setAttribute("viewBox","0 0 1200 " + parseInt(ht1+60));
//    		}else if(parseInt(wd2)>1025){
//    			document.getElementById("svg_Main").setAttribute("viewBox","0 0 2000 " + parseInt(ht1+500));
//    		}   		
    	}
    	

    }

    //一次图
//    function getSvgIni(subsId){  
    function clickSubs(subsId,subsName){
//    	$('#divNewimgSpan').combobox({
//    		url : webContextRoot+ 'monitorCanvas/querySugIni.action?userTranId='+ subsId,
//    		method : 'get',
//    		valueField : 'svg',
//    		textField : 'svgName',
//    		multiple : false,// 是否支持多选
//    		onLoadSuccess: function(){
//    			var svgData = $(this).combobox("getData");
//    			$('#divNewimgSpan').combobox('select',svgData[0].svg);
//        	},
//        	onSelect : function(record) {
//        		getViewIni(record.svg,record.svgId,record.userTranId);
//    		}
//        });
    	$("#divNewbrandSpan").text(subsName);
    	$("#ulbrand").addClass("visible");
    	$.ajax({
    		type : "post",
    		url : webContextRoot + 'monitorCanvas/querySugIni.action',
    		dataType : "json",
    		data : {
    			'userTranId' : subsId
    		},
    		success : function(data) {
    			$("#ulimg").children('li').remove();
				$('#divNewimgSpan').text('');
				if(data.length == 0){
					$('#ulimg').append("");
					setNoSvg();
				}
    			if (data.length>1){
					$('#imgComboBoxDiv').css({
						'opacity' : '1'
					});
					$('#divNewimg').css({
						'cursor' : 'pointer'
					});
					hasNoSvgTag = false;
					svgNameItem = "";
					for (var i = 0, len = data.length; i < len; i++) {	
						/***
						 * 初始化加载默认显示第一个SVG
						 */
						var backColor = "";
						if(i==0){
							selectSvgId=data[i].svgId;
//							$('#divNewimgSpan').text(data[i].svgName);							
							lastNewLiBtn = selectSvgId;
							backColor = "background:#707070;";
							getViewIni(data[0].svg,data[0].svgId,data[0].userTranId,data[0].svgName);
						}
						/***
						 * 显示SVG列表名称
						 */
						svgNameItem += "<li id=\'svg" + data[i].svgId + "\' onClick='getViewIni("			
							+ "\""+data[i].svg+"\",\""+data[i].svgId+"\",\""+data[i].userTranId+"\",\""+data[i].svgName+"\")' class='brand' style='font-size:16px;text-align: justify;cursor: pointer;" +
									"padding: 2px 5px 5px 10px;" + backColor + "'><span id='i"+data[i].svgId+"'>"
							+ data[i].svgName + "</span></li>";
						
						
					}
					//SVG一次图列表	
					$('#ulimg').append(svgNameItem);
				}else{
					$('#imgComboBoxDiv').css({
						'opacity' : '0.3'
					});
					$('#divNewimg').css({
						'cursor' : 'default'
					});
					hasNoSvgTag = true;
				}
    		}
    	});
    }
    
    //展示一次图
    function getViewIni(svg,svgId,userTranId,svgName){
//    	if ($('#ulimg').attr("class") != "ct visible"){
    		$("#ulimg").addClass("visible");
//		}
    	$("#divNewimgSpan").text("");
    	$("#divNewimgSpan").text(svgName);
    	$.ajax({
    		type : "post",
    		url : webContextRoot + 'monitorCanvas/getSvgXml.action',
    		dataType : "json",
    		data : {
    			'svg' : svg
    		},
    		success : function(data) {
    			if(data.svg != ""){
    				document.getElementById('liSVG').innerHTML = data.svg;	
    				document.getElementById('divNoEnergyMessage').innerHTML = "";
			    	viewHt = $("#svg_Main").attr("height");
			    	viewWd = $("#svg_Main").attr("width");
			    	selectSvgId=svgId;
					userTranId = userTranId
			    	SetSVGViewBox();
					/***
					 * 绑定SVG数据库配置信息
					 */
					bindOracleSusSVG();
    			}else{
    				setNoSvg();
    			}
    		}
    	});
    }
    
