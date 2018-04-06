/**
 * 日电量报表
 * @author meng_zijie
 * @since 2018-01-04
 */
var dataDate = new Date();//当前时间
var dateType_load = false;//是否加载
$(function(){
	
	/**
	 * 自定义导出方法
	 */
	$.fn.datagrid.methods.exportExcel = function(target,param){
		return target.each(function() {
			var opts = $.data(this, "datagrid").options;
			var data = $.extend({}, opts.queryParams, param.data);
			if (opts.pagination) {
				$.extend(data, {
							page : opts.pageNumber,
							rows : opts.pageSize
						});
			}
			if (opts.sortName) {
				$.extend(data, {
							sort : opts.sortName,
							order : opts.sortOrder
						});
			}
			if (opts.onBeforeLoad.call(this, data) == false) {
				return;
			}
			var str = "";
			str = encodeURI(param.url + str);
			var exportObj = $("#rimp_export");
			if(exportObj && exportObj.length > 0){
				exportObj.attr("src", str);
			}else{
				$("<iframe id='rimp_export' style='display:none' />").appendTo($("body"));
				$("#rimp_export").attr("src", str);
			}
		});
	};
	
	//设置时间
	$("#dataDate").val(DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd("d", -1, dataDate)));
	$("#dataDate_month").val(DateUtil.dateToStr('yyyy-MM',DateUtil.dateAdd("d", -1, dataDate)));
//	$("#dataDate").val("2017-12-12");
	
	if(consId==null || consId==''|| consId=="null"){//未获取到企业编码，加载左侧树
		//设置选择客户后执行的方法
		 consSelectMethod = "consSelectMethodLoad()";
		 consSelectHasRoot = false;
		 consSelectSearch("",true);
	}else{
		loadData();
	}
	
	//导出 
	$("#export").click(function(){
		excelData();
	});
	
});

function consSelectMethodLoad(){
	consId = consSelectCon.id;				
	consName = consSelectCon.text;	
	
	if(!dateType_load){
		dateType_load = true; 
		$("#dateType").combobox({
			valueField:'id',    
			textField:'text',
			data:[{'id':'dd','text':'日电量','selected':true},
			      {'id':'mm','text':'月电量'}],
			onChange: function(newValue, oldValue){
				if(newValue == 'dd'){
		    		$("#dateType_dd").show();
		    		$("#dateType_mm").hide();
		    	}else{
		    		$("#dateType_dd").hide();
		    		$("#dateType_mm").show();
		    	}
		    	loadData();
			}
		});
	}else{
		loadData();
	}
}

/**
 * 加载文档
 */
function loadData(){
	if(!dateType_load){
		dateType_load = true; 
		$("#dateType").combobox({
			valueField:'id',    
			textField:'text',
			data:[{'id':'dd','text':'日电量','selected':true},
			      {'id':'mm','text':'月电量'}],
			onChange: function(newValue, oldValue){
				if(newValue == 'dd'){
		    		$("#dateType_dd").show();
		    		$("#dateType_mm").hide();
		    	}else{
		    		$("#dateType_dd").hide();
		    		$("#dateType_mm").show();
		    	}
		    	loadData();
			}
		});
	}
	
	$.messager.progress({
		title : '提示',
		msg : '正在加载中，请稍候……'
	}); 
	var time = null;
	if($("#dateType").combobox("getValue") == 'dd'){
		time = $("#dataDate").val();
		$("#baseInfo_consName").text(consName);
		$("#baseInfo_date").text(time.replace('-','年').replace('-','月')+'日电量报表');
	}else{
		time = $("#dataDate_month").val();
		$("#baseInfo_consName").text(consName);
		$("#baseInfo_date").text(time.replace('-','年')+'月电量报表');
	}
	$.ajax({	
		url:webContextRoot+'dailyEnergyReport/getData.action',
		data:{
			'consId': consId,
			'time' : time,
			'dateType':$("#dateType").combobox("getValue")
		},
		dataType:'json',
		type:'post',
		success:function(result){
//			console.log(result);
			var html = '';
			if(result.length > 0){
				$("#export").show();//导出按键 table_div
				html +='<table class="table">';
				if(result[0].hasPrice == 'true'){
					if($("#dateType").combobox("getValue") == 'dd'){
						$("#baseInfo_date").text(time.replace('-','年').replace('-','月')+'日电量报表(电费仅供参考)');
					}else{
						$("#baseInfo_date").text(time.replace('-','年')+'月电量报表(电费仅供参考)');
					}
					
					html +='<tr>'
						+'<th>序号</th><th>监测点名称</th><th>起始抄表值</th><th>截止抄表值</th><th>总电量(kWh)</th><th>总电费(元)</th>'
						+'<th>峰电量(kWh)</th><th>峰占总电量比</th><th>峰电费(元)</th><th>平电量(kWh)</th><th>平占总电量比</th><th>平电费(元)</th><th>谷电量(kWh)</th><th>谷占总电量比</th><th>谷电费(元)</th>'
						+'</tr>';
					for(var i = 0; i < result.length; i++){
						html += '<tr><td>'+result[i].SHOW_INDEX+'</td><td>'+result[i].LINE_NAME+'</td><td>'+result[i].START_MARK+
						'</td><td>'+result[i].END_MARK+'</td><td>'+result[i].ENERGY_P+'</td><td>'+result[i].PRICE_P+'</td><td>'+result[i].PAP_R2+
						'</td><td>'+result[i].ZB2+'</td><td>'+result[i].PRICE_R2+'</td><td>'+result[i].PAP_R3+'</td><td>'+result[i].ZB3+
						'</td><td>'+result[i].PRICE_R3+'</td><td>'+result[i].PAP_R4+'</td><td>'+result[i].ZB4+'</td><td>'+result[i].PRICE_R4+'</td></tr>';
					}
				}else{
					html +='<tr>'
						+'<th>序号</th><th>监测点名称</th><th>起始抄表值</th><th>截止抄表值</th><th>总电量(kWh)</th>'
						+'<th>峰电量(kWh)</th><th>峰占总电量比</th><th>平电量(kWh)</th><th>平占总电量比</th><th>谷电量(kWh)</th><th>谷占总电量比</th>'
						+'</tr>';
					for(var i = 0; i < result.length; i++){
						html += '<tr><td>'+result[i].SHOW_INDEX+'</td><td>'+result[i].LINE_NAME+'</td><td>'+result[i].START_MARK+
						'</td><td>'+result[i].END_MARK+'</td><td>'+result[i].ENERGY_P+'</td><td>'+result[i].PAP_R2+
						'</td><td>'+result[i].ZB2+'</td><td>'+result[i].PAP_R3+'</td><td>'+result[i].ZB3+
						'</td><td>'+result[i].PAP_R4+'</td><td>'+result[i].ZB4+'</td></tr>';
					}
				}
				html += '</table>';
			}else{
				$("#export").hide();//导出按键
			}
			
			$("#table_div").html(html);
			$.messager.progress('close');
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
	$('#dataDate').val(resultDay.substr(0,10));
	loadData();
}
function qytQueryOverideM(dateTime){
	var date = $('#dataDate_month').val();
	var resultDay = timeUtilM(dateTime,date);//DateUtil.dateAdd("d", parseInt(dateTime), DateUtil.strToDate(startDay2));//getDateByOffsetDays(startDay2,dateTime);
	$('#dataDate_month').val(resultDay.substr(0,7));
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
function timeUtilM(dateTime,startDay){
	var resultDay = DateUtil.dateAdd("m", parseInt(dateTime), DateUtil.strToDate(startDay));
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

/**
*	导出
*/
function excelData(){
 	var flag = DateUtil.dateToStr('yyyy-MM-dd HH:mm:ss',new Date());
 	var date = null;
 	if($("#dateType").combobox("getValue") == 'dd'){
 		date = $("#dataDate").val();
	}else{
		date = $("#dataDate_month").val();
	}
 	//导出地址及参数
 	var url = '';
	url = webContextRoot+'dailyEnergyReport/export.action?consId='+consId+'&time='+date
		+'&dateType='+$("#dateType").combobox("getValue")+'&flag='+flag; // 进度条标识
	
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
			url: webContextRoot + 'dailyEnergyReport/exportProgress.action?flag=' + flag,
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
