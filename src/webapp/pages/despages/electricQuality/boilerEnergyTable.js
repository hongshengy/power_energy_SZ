/**
 * 日电量报表
 * @author meng_zijie
 * @since 2018-01-04
 */
var dataDate = new Date();//当前时间

$(function(){
	/**
	 * 下拉框 
	 */
	$('#selectDev').combobox({
		panelWidth:120,	
		panelHeight:300,// 设置下拉的宽度 和下拉框保持一致
		url:webContextRoot +'boilerEnergy/selectEnergyCell.action?consId=' + consId,
		valueField:'ID',
		textField:'ENERGY_CELL_NAME',
		onLoadSuccess: function () {// 下拉框数据加载成功调用
        	var propOwnerData = $(this).combobox("getData");// 得到查询的list集合
        	if(propOwnerData.length>0){
        		if(energyCellId!=null&&energyCellId.length>0){
        			$('#selectDev').combobox('select',energyCellId);
        		}else{
        			$('#selectDev').combobox('select',propOwnerData[0].ID);// 默认加载第一个生产线
        		}
        	}else{
        		$('#selectDev').combobox('select','');// 没有生产线时
        	}
        },
        onChange: function(newValue, oldValue){
        	energyCellId = newValue;
        	loadData();
		}
	});
	//设置时间
	if(dlzsEDateD!=null&&dlzsEDateD!=''){
		$("#dataDate").val(dlzsEDateD);
	}else{
		$("#dataDate").val(DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd("d", -1, dataDate)));
	}
	
	$('#selectType').combobox({
		data:[{
			'id':24,'text':'1小时'
		},{
			'id':288,'text':'5分钟'
		},{
			'id':30,'text':'一个月'
		}],
	    valueField:'id',    
	    textField:'text',
	    onLoadSuccess:function(){
	    	$('#selectType').combobox('select',24);
	    },onSelect:function(data){
	    	if(data.id == 30){
	    		$("#dayDateDiv").hide();
	    		$("#monthDateDiv").show();
	    		$("#monthDate").val($("#dataDate").val().substr(0,7));
	    	}else{
	    		$("#dayDateDiv").show();
	    		$("#monthDateDiv").hide();
	    	}
	    }
	});  
//	$("#dataDate").val("2017-12-12");
	
	if(consId==null || consId==''|| consId=="null"){//未获取到企业编码，加载左侧树
		//设置选择客户后执行的方法
		 consSelectMethod = "consSelectMethodLoad()";
		 consSelectHasRoot = false;
		 consSelectSearch("",true);
	}else{
//		loadData();
	}
	
	//导出 
	$("#export").click(function(){
		excelData();
	});
	
});

function consSelectMethodLoad(){
	consId = consSelectCon.id;				
	consName = consSelectCon.text;	
//	loadData();
}

/**
 * 加载文档
 */
function loadData(){
//	return;
	$.messager.progress({
		title : '提示',
		msg : '正在加载中，请稍候……'
	}); 
	var time = null;
	var selectType = $('#selectType').combobox('getValue');
	if(selectType == 30){
		time = $("#monthDate").val();
		$("#baseInfo_ps").text("PS:水、电、气等相关费用仅供参考");
	}else{
		time = $("#dataDate").val();
		$("#baseInfo_ps").text("");
	}
	energyCellId = $('#selectDev').combobox('getValue');
	
	var energyCellName = $('#selectDev').combobox('getText');
	$("#baseInfo_consName").text(energyCellName+time+"用能分析");
	
	$.ajax({	
		url:webContextRoot+'boilerEnergy/selectTable.action',
		data:{
			'energyCellId': energyCellId,
			'energyCellName' : energyCellName,
			'time' : time,
			'selectType' : selectType
		},
		dataType:'json',
		type:'post',
		success:function(result){
			
			var html = '<table class="table">';
			for(var i = 0; i < result.length; i++){
				html += '<tr>';
				for(var j = 0; j < result[i].length; j++){
					if(i == result.length - 1 && j == 0 && result[i][j] == '总费用'){
						html += '<th>'+result[i][j]+'</th>';
						html += '<td colspan="'+(result[i].length-1)+'">'+result[i][j+1]+'</td>';
						break;
					}else if(i==0||j==0) html += '<th>'+result[i][j].replace("\r\n","<br/>")+'</th>';
					else html += '<td>'+result[i][j]+'</td>';
				}
				html += '</tr>';
			}
			html += '</table>';
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
	var date = null;
	if($('#selectType').combobox("getValue") != 30) {
		date = $('#dataDate').val();
		var resultDay = timeUtil(dateTime,date,"d");//DateUtil.dateAdd("d", parseInt(dateTime), DateUtil.strToDate(startDay2));//getDateByOffsetDays(startDay2,dateTime);
		$('#dataDate').val(resultDay.substr(0,10));
	}else{
		date = $('#monthDate').val();
		var resultDay = timeUtil(dateTime,date,"m");//DateUtil.dateAdd("d", parseInt(dateTime), DateUtil.strToDate(startDay2));//getDateByOffsetDays(startDay2,dateTime);
		$('#monthDate').val(resultDay.substr(0,7));
	}
	loadData();
}
/**
 * 时间处理的工具类
 * @param dateTime
 * @param startDay
 * @returns {String}
 */
function timeUtil(dateTime,startDay,type){
	var resultDay = DateUtil.dateAdd(type, parseInt(dateTime), DateUtil.strToDate(startDay));
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
	
	var time = '';
	var selectType = $('#selectType').combobox('getValue');
	if(selectType == 30) time = $("#monthDate").val();
	else time = $("#dataDate").val();
	// 锅炉ID
	tradeCode = $('#selectDev').combobox('getValue');
	var energyCellName = $('#selectDev').combobox('getText');
	
	//导出地址及参数
 	var url = '';
	url = webContextRoot+'boilerEnergy/selectTable.action?energyCellId='+tradeCode+'&energyCellName='+energyCellName+'&time='+time+'&selectType='+selectType+'&flag='+flag; // 进度条标识
	
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
			url: webContextRoot + 'boilerEnergy/exportProgress.action?flag=' + flag,
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
