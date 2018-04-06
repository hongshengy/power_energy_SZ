/**
 * 非工空调
 * @author 郭庆春
 * @since 2017-06-06
 */
var currentDate = new Date();
var myChart;
var myChart1;
var myChart2;
var consSelectAllCons = null;//所有的客户
var consSelectHistoryCons = null;//历史记录里的客户
var consSelectCon = null;//选中的客户
var isFirst = true;
var isTabsType;
//js入口
$(function(){
	//初始化日日期
	$("#dataDate").val(DateUtil.dateToStr('yyyy-MM-dd',currentDate));
	//初始化月日期
	$("#monthDate").val(DateUtil.dateToStr('yyyy-MM',currentDate));
	//初始化年日期
	$("#yearDate").val(DateUtil.dateToStr('yyyy',currentDate));
	//获取当前负荷、当日用电、建档户数、建档建筑数
	getAllCount();
	$('#tabs').tabs({    
	    border:false,    
	    onSelect:function(title,index){    
	        if(index == 0){
//	        	$("#totalInput").removeClass("hidden");
	        	$("#timeInput").addClass("hidden");
	        	$("#upDownInput").addClass("hidden");
	        	$("#timeChart").combobox('select','1');
	        	$('#dataDate').show();
				$('#monthDate').hide();
				$('#yearDate').hide();
	        	isTabsType = 0;
	        	getFgktFh();
	        }else if(index == 1){	        	
//	        	$("#totalInput").addClass("hidden");
	        	$("#timeInput").removeClass("hidden");
	        	$("#upDownInput").addClass("hidden");
	        	$('#timeChart').combobox('select','1');
	        	$('#dlTab').tabs('select',0);
	        	$('#timeChart').combobox('select','1');
	        	$("#dlzsTab").addClass("active");
	        	$("#fgdlTab").removeClass("active");
	        	$('#dataDate').show();
				$('#monthDate').hide();
				$('#yearDate').hide();
	        	isTabsType = 1;
	        	getFgktDl();        		        	
	        }    
	    }    
	});
	$("#dlzsTab").click(function(){				
//		$("#totalInput").addClass("hidden");
		$("#timeInput").removeClass("hidden");
		$("#upDownInput").addClass("hidden");
		$('#dlTab').tabs('select',0);
		$("#dlzsTab").addClass("active");
		$("#fgdlTab").removeClass("active");
		$('#timeChart').combobox('select','1');
		$('#dataDate').show();
		$('#monthDate').hide();
		$('#yearDate').hide();	
		getFgktDl();
	});	
	$("#fgdlTab").click(function(){
		$('#upDownChart').combobox('select','1');
		$("#timeInput").addClass("hidden");
		$("#upDownInput").removeClass("hidden");
		$('#dlTab').tabs('select',1);
		$("#dlzsTab").removeClass("active");
		$("#fgdlTab").addClass("active");
		$('#dataDate').hide();
		$('#monthDate').show();
		$('#yearDate').hide();
		getFgktFgDl();		
	});	
//	$(window).resize(function() {
////		var ht1 = $("#fgdlChart").parent().parent().parent().parent()[0].clientHeight;
//		var ht1 = $(window).height();
//		var ht = parseInt(ht1)-200-180;
//		var wd1 = $(window).width();
//		var wd = parseInt(wd1)-244;
//		$("#fgktFgDl").parent().css({'height' :ht});
//		$("#fgdlChart").find("canvas").attr('height',ht);
//		$("#fgdlChart").find("canvas").attr('width' ,wd);
//	});
	$('#fhDatagrid').datagrid({
		fitColumns: true,
	    singleSelect: true,
//	    pagination:true,
		close : true,
	    columns: [[
	        {field: 'id', title: 'ID', width:100,hidden : true},
	        {field: 'dataDate', title: '日期', width:'25%',
	        	formatter: function(value,row,index){
					return value.substr(0,10);
			}},
	        {field: 'maxValue', title: '最大负荷(kW)', width:'25%'},
        	{field: 'minValue', title: '最小负荷(kW)', width:'25%'},
	        {field: 'avgValue', title: '平均负荷(kW)', width: '25%'}
	    ]]
	});
	$('#fhDatagrid').datagrid({
//		title:'交接班管理',
		url:webContextRoot+ 'fgkt/queryMaxFgktFh.action',		
		loadMsg:'正在加载，请稍等……',//加载时显示提示
		rownumbers:true,
		fit:true,
		fitColumns:true,
		striped: true,
		singleSelect: true,
//		pagination:true,
//		pageSize: 20,
//		pageList : [10,20,50],
		queryParams :{
			startDate : $("#dataDate").val(),
			totalPoint:"96"//$("#totalPoint").textbox("getValue")
		},
	    onSelect:function (rowIndex, rowData){
	    	selectData = rowData;
	    }
//		,onLoadSuccess:function(data){
//			var rows = $('#fhDatagrid').datagrid("getRows");
//			if(rows.length>0){
//				$('#fhDatagrid').datagrid("selectRow",0);
//			}
//		}
//	})
	});
	if(consId==null || consId==''|| consId=="null"){//未获取到企业编码，加载左侧树
			consSelectMethod = "consSelectMethodLoad()";//定义选中后执行的方法
			consSelectHasRoot = true;//是否有区域能源根节点
			consSelectSearch("",true);
		}else{
//			queryUserFiles();//查询用户档案
//	  	    getkyjData();//查询空压机
//	  	    getByqsb();
	}
	//初始化echart		
	myChart1 = echarts.init(document.getElementById("fgktDl"));
	myChart = echarts.init(document.getElementById("fgktFh"));
	myChart2 = echarts.init(document.getElementById("fgktFgDl"));
//	$("#fgktFh").width($("#fgktFh").parent().width());
//	$("#fgktFh").height($("#fgktFh").parent().height());
//	if(!!myChart){
//		myChart.resize({
//		    width: $("#fgktFh").parent().width(),
//		    height: $("#fgktFh").parent().height()
//		});
//	}
	//点数
//	$('#totalPoint').textbox('setValue','96');	
//	$('#totalPoint').combobox({ 
//		valueField: 'value',
//		textField: 'text' ,
//		editable:'false' ,
//		data: [
//		  {
//	          value: '1440',
//	          text: '1440点'
//	      }, {
//	          value: '288',
//	          text: '288点'
//	      }, {
//	          value: '144',
//	          text: '144点'
//	      }, 
//	      {
//	          value: '96',
//	          text: '96点'
//	      }],
//	      onSelect: function (record) {	          
//	          autoResize.call(this); //手动调用激活
//	      },onLoadSuccess:function(){
//	      	$('#totalPoint').combobox('select','96');
//	  	}
//	});
	//电量曲线
	$('#timeChart').combobox({ 
		valueField: 'value',
		textField: 'text' ,
		editable:'false' ,
		data: [{
	          value: '1',
	          text: '日电量'
	      }, {
	          value: '2',
	          text: '月电量'
	      }, {
	          value: '3',
	          text: '年电量'
	      }],
	      onSelect: function (record) {	          
	          autoResize.call(this); //手动调用激活
	          if(record.value == "1"){
		  			$('#dataDate').show();
					$('#monthDate').hide();
					$('#yearDate').hide();
		  		}else if(record.value == "2"){
		  			$('#dataDate').hide();
					$('#monthDate').show();
					$('#yearDate').hide();
		  		}else if(record.value == "3"){
		  			$('#dataDate').hide();
					$('#monthDate').hide();
					$('#yearDate').show();
		  		}
	      },onLoadSuccess:function(){
	      	$('#timeChart').combobox('select','1');
	  	}
	});
	//峰谷电量
	$('#upDownChart').combobox({ 
		valueField: 'value',
		textField: 'text' ,
		editable:'false' ,
		data: [{
	          value: '1',
	          text: '月峰谷电量'
	      }, {
	          value: '2',
	          text: '年峰谷电量'
	      }],
	      onSelect: function (record) {	          
	          autoResize.call(this); //手动调用激活
	          if(record.value == "1"){
		  			$('#dataDate').hide();
					$('#monthDate').show();
					$('#yearDate').hide();
		  		}else if(record.value == "2"){
		  			$('#dataDate').hide();
					$('#monthDate').hide();
					$('#yearDate').show();
		  		}
	      }
//	,onLoadSuccess:function(){
//	      	$('#upDownChart').combobox('select','1');
//	  	}
	});
	//左减日期
	$('#timeLeft').click(function(){
		if($("#timeChart").combobox("getValue") == "1" && $("#timeInput").attr("class") == "hidden" && $("#upDownInput").attr("class") == "hidden"){
			var startDate =  $('#dataDate').val();//开始日期
			var nowDate = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('d',-1,DateUtil.strToDate(startDate)));
			$('#dataDate').val(nowDate);
		}else if($("#timeChart").combobox("getValue") == "1" && $("#dlzsTab").attr("class") == "active"){
			$('#dataDate').show();
			$('#monthDate').hide();
			$('#yearDate').hide();
			var startDate =  $('#dataDate').val();//开始日期
			var nowDate = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('d',-1,DateUtil.strToDate(startDate)));
			$('#dataDate').val(nowDate);
		}else if($("#timeChart").combobox("getValue") == "2" && $("#dlzsTab").attr("class") == "active"){
			var startDate =  $('#monthDate').val();//开始日期
			var nowDate = DateUtil.dateToStr('yyyy-MM',DateUtil.dateAdd('m',-1,DateUtil.strToDate(startDate)));
			$('#monthDate').val(nowDate);
		}else if($("#timeChart").combobox("getValue") == "3" && $("#dlzsTab").attr("class") == "active"){
			var startDate =  $('#yearDate').val();//开始日期
			var startDate1 = new Date(startDate);
			var nowDate = DateUtil.dateToStr('yyyy',DateUtil.dateAdd('y',-1,startDate1));
			$('#yearDate').val(nowDate);
		}else if($("#upDownChart").combobox("getValue") == "1" && $("#fgdlTab").attr("class") == "active"){
			var startDate =  $('#monthDate').val();//开始日期
			var nowDate = DateUtil.dateToStr('yyyy-MM',DateUtil.dateAdd('m',-1,DateUtil.strToDate(startDate)));
			$('#monthDate').val(nowDate);
		}else if($("#upDownChart").combobox("getValue") == "2" && $("#fgdlTab").attr("class") == "active"){
			var startDate =  $('#yearDate').val();//开始日期
			var startDate1 = new Date(startDate);
			var nowDate = DateUtil.dateToStr('yyyy',DateUtil.dateAdd('y',-1,startDate1));
			$('#yearDate').val(nowDate);
		}
		
	});
	//右加日期
	$('#timeRight').click(function(){
		if($("#timeChart").combobox("getValue") == "1" && $("#totalInput").attr("class") != "hidden"){
			var startDate =  $('#dataDate').val();//开始日期
			var nowDate = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('d',1,DateUtil.strToDate(startDate)));
			$('#dataDate').val(nowDate);
		}else if($("#timeChart").combobox("getValue") == "1" && $("#dlzsTab").attr("class") == "active"){
			var startDate =  $('#dataDate').val();//开始日期
			var nowDate = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('d',1,DateUtil.strToDate(startDate)));
			$('#dataDate').val(nowDate);
		}else if($("#timeChart").combobox("getValue") == "2" && $("#dlzsTab").attr("class") == "active"){
			var startDate =  $('#monthDate').val();//开始日期
			var nowDate = DateUtil.dateToStr('yyyy-MM',DateUtil.dateAdd('m',1,DateUtil.strToDate(startDate)));
			$('#monthDate').val(nowDate);
		}else if($("#timeChart").combobox("getValue") == "3" && $("#dlzsTab").attr("class") == "active"){
			var startDate =  $('#yearDate').val();//开始日期
			var startDate1 = new Date(startDate);
			var nowDate = DateUtil.dateToStr('yyyy',DateUtil.dateAdd('y',1,startDate1));
			$('#yearDate').val(nowDate);
		}else if($("#upDownChart").combobox("getValue") == "1" && $("#fgdlTab").attr("class") == "active"){
			var startDate =  $('#monthDate').val();//开始日期
			var nowDate = DateUtil.dateToStr('yyyy-MM',DateUtil.dateAdd('m',1,DateUtil.strToDate(startDate)));
			$('#monthDate').val(nowDate);
		}else if($("#upDownChart").combobox("getValue") == "2" && $("#fgdlTab").attr("class") == "active"){
			var startDate =  $('#yearDate').val();//开始日期
			var startDate1 = new Date(startDate);
			var nowDate = DateUtil.dateToStr('yyyy',DateUtil.dateAdd('y',1,startDate1));
			$('#yearDate').val(nowDate);
		}
		
	});
	
	$("#searchButton").click(function(){
		searchButtonClick();
	});
//	//获取当前负荷、当日用电、建档户数、建档建筑数(
//	getAllCount();
//	//加载当日负荷
//	getFgktFh();
//	//加载当日电量
//	getFgktDl();
})
	//tabs选项卡选择事件
	function userTabsSelect(title,index){
		isTabsType = index;//0 :用电走势 1:负载率  	
	  	if(isTabsType == 0){
	  	$("#timeChart").hide();
	  	$('#dataDate').show();
	  	//初始化日期
  		$("#dataDate").val(DateUtil.dateToStr('yyyy-MM-dd',currentDate));
  		//点数
//  		$('#totalPoint').textbox('setValue','96');	
//  		$('#totalPoint').combobox({ 
//  			valueField: 'value',
//  			textField: 'text' ,
//  			editable:'false' ,
//  			data: [
  			  /*{
  		          value: '1440',
  		          text: '1440点'
  		      }, {
  		          value: '288',
  		          text: '288点'
  		      }, {
  		          value: '144',
  		          text: '144点'
  		      },*/
//  		      {
//  		          value: '96',
//  		          text: '96点'
//  		      }],
//  		      onSelect: function (record) {	          
//  		          autoResize.call(this); //手动调用激活
//  		      },onLoadSuccess:function(){
//  		      	$('#totalPoint').combobox('select','96');
//  		  	}
//  		});  		
	  	getFgktFh();	  			  		
	  	}else if(isTabsType == 1){ 		
	  		getFgktDl();
	  	}
	}
	
	function consSelectMethodLoad(){
		if(consSelectCon.id.length < 4){	// 区域能源节点			
//			//获取当前负荷、当日用电、建档户数、建档建筑数
//			getAllCount();
//			//加载当日负荷
//			getFgktFh();
//			isFirst=false;
//			//加载当日电量
//			getFgktDl();
		}else{		// 企业节点
				
		}
	}
	//获取当前负荷、当日用电、建档户数、建档建筑数
	function getAllCount(){
		$.ajax({
			type : "post",
			url : webContextRoot + 'fgkt/queryIndustryAir.action',
			dataType : "json",
			success : function(data) {
				$("#tran_exception").text(data[0].countNum);
				$("#tran_check").text(data[1].countNum);
				$("#tran_run").text(data[2].countNum);
				$("#tran_total").text(data[3].countNum);
			}
		});
	}
	//加载当日负荷
	function getFgktFh(){
		myChart = echarts.init(document.getElementById("fgktFh"));
		myChart.showLoading({
			text:'正在努力的读取数据中...',
			effect:'spin'
		});
		var startDate = $("#dataDate").val();
		var totalPoint = "96";//$("#totalPoint").textbox("getValue");
		$.ajax({
			type : "post",
			url : webContextRoot + 'fgkt/queryFgktFh.action',
			dataType : "json",
			data:{'startDate':startDate,'totalPoint':totalPoint},
			success : function(data) {
				queryFhchart(data);	
		        myChart.hideLoading();
			}
		});
	}
	//加载当日电量
	function getFgktDl(){
		//初始化echart		
		myChart1 = echarts.init(document.getElementById("fgktDl"));
		myChart1.showLoading({
			text:'正在努力的读取数据中...',
			effect:'spin'
		});
		if($("#timeChart").combobox("getValue") == "1"){  
			var startDate = $("#dataDate").val();
			var yesDate = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('d',-1,DateUtil.strToDate(startDate)));
			$.ajax({
				type : "post",
				url : webContextRoot + 'fgkt/queryFgktDl.action',
				dataType : "json",
				data:{'startDate':startDate},
				success : function(data) {
					queryDlchart(data);	
			        myChart1.hideLoading();
			        if(data.sMap.zongLast != null){
			        	$("#zdlhb").text(startDate+"比"+yesDate+"增加"+data.sMap.zongLast+"%");
			        }else{
			        	$("#zdlhb").text("-");
			        }
//			        $("#zdlhb")
				}
			});
		}else if($("#timeChart").combobox("getValue") == "2"){
			var startDate = $("#monthDate").val();
			var yesDate = DateUtil.dateToStr('yyyy-MM',DateUtil.dateAdd('m',-1,DateUtil.strToDate(startDate)));
			$.ajax({
				type : "post",
				url : webContextRoot + 'fgkt/queryFgktYDl.action',
				dataType : "json",
				data:{'startDate':startDate},
				success : function(data) {
					queryDlchart(data);	
			        myChart1.hideLoading();
			        if(data.sMap.zongLast != null){
			        	$("#zdlhb").text(startDate+"比"+yesDate+"增加"+data.sMap.zongLast+"%");
			        }else{
			        	$("#zdlhb").text("-");
			        }
				}
			});
		}else if($("#timeChart").combobox("getValue") == "3"){
			var startDate = $("#yearDate").val();
			var startDate1 = new Date(startDate);
			var yesDate = DateUtil.dateToStr('yyyy',DateUtil.dateAdd('y',-1,startDate1));
			$.ajax({
				type : "post",
				url : webContextRoot + 'fgkt/queryFgktNDl.action',
				dataType : "json",
				data:{'startDate':startDate},
				success : function(data) {
					queryDlchart(data);	
			        myChart1.hideLoading();
			        if(data.sMap.zongLast != null){
			        	$("#zdlhb").text(startDate+"比"+yesDate+"增加"+data.sMap.zongLast+"%");
			        }else{
			        	$("#zdlhb").text("-");
			        }
				}
			});
		}		
	}
	//加载峰谷电量
	function getFgktFgDl(){
		//初始化echart		
		myChart2 = echarts.init(document.getElementById("fgktFgDl"));
		myChart2.showLoading({
			text:'正在努力的读取数据中...',
			effect:'spin'
		});
		if($("#upDownChart").combobox("getValue") == "1"){
			var startDate = $("#monthDate").val();
			$.ajax({
				type : "post",
				url : webContextRoot + 'fgkt/queryFgktYFgDl.action',
				dataType : "json",
				data:{'startDate':startDate},
				success : function(data) {
					var title = "月峰谷电量";
					queryFgdlEchart(data,title);	
			        myChart2.hideLoading();
			        getFgdlData(data);
				}
			});
		}else if($("#upDownChart").combobox("getValue") == "2"){
			var startDate = $("#yearDate").val();
			$.ajax({
				type : "post",
				url : webContextRoot + 'fgkt/queryFgktNFgDl.action',
				dataType : "json",
				data:{'startDate':startDate},
				success : function(data) {
					var title = "年峰谷电量";
					queryFgdlEchart(data,title);	
			        myChart2.hideLoading();
			        getFgdlData(data);
				}
			});
		}
	}
	//负荷曲线
	function queryFhchart(data){
		var toDayName = '当天负荷';
		var yesterDayName = '前一天负荷';
		var option = {
			    title : {
			        text: '负荷曲线',
			      	x:'center'
			    },
//			    tooltip : {
//			        trigger: 'axis'
//			    },

				tooltip: {
					trigger: 'axis',
					formatter : function(params, ticket, callback) {
						
						var res = "";
						for (var i = 0; i < params.length; i++) {
							if (i == 0) {
								res = '时间：' + params[i].name + '<br/>';
							}
							res += params[i].seriesName + ' : ';
							if (params[i].seriesName.indexOf('负荷') >= 0) {
								res += params[i].value + 'kW<br/>'
							}
						}
						return res;
					}
				},
			    legend: {
			        data:[toDayName,yesterDayName],
			        selected : {toDayName:true,
			        			yesterDayName:true
			        			},
			      	padding:32
			    },
			    toolbox:{
			    	show:true,
			    	feature:{
			    		dataZoom:{},
			    		magicType:{type:['line','bar']},
			    		restore:{},
			    		saveAsImage:{}
			    	}
			    },
			    calculable : true,
			    xAxis : [
			        {
			            type : 'category',
			            boundaryGap : false,
			            data : data.categes
			        }
			    ],
			    yAxis : [
			        {
			        	name : '单位(kW)',
			            type : 'value',
			            axisLabel : {
			                formatter: '{value}'//'{value} °C'
			            }
			        }
			    ],
			    grid : {
		 			 x : 45, 		// 左边距离
		 			 y : 65,		// 上边距离
		 			 x2 : 20,		// 右边距离
		 			 y2 : 35		// 下边距离
		 		},
			    series : [
			        {
			            name:toDayName,
			            type:'line',
			            data: data.prePowerValue
			        },
			        {
			            name:yesterDayName,
			            type:'line',
			            data: data.yesPowerValue
			        }
			    ]
			};
		
		//为eacharts控件赋值 显示数据
		myChart.setOption(option,true);
		myChart.resize();
	}
	//电量柱状图
	function queryDlchart(data){
		var toDayName;
		var yesterDayName;
		if($("#timeChart").combobox("getValue") == "1"){
			toDayName = '当天电量';
			yesterDayName = '前一天电量';
		}else if($("#timeChart").combobox("getValue") == "2"){
			toDayName = '当月电量';
			yesterDayName = '前一月电量';
		}else if($("#timeChart").combobox("getValue") == "3"){
			toDayName = '当年电量';
			yesterDayName = '前一年电量';
		}		
		var option = {
			    title : {
			        text: '电量走势',
			      	x:'center'
			    },
			    tooltip: {
					trigger: 'axis',
					formatter : function(params, ticket, callback) {
						
						var res = "";
						for (var i = 0; i < params.length; i++) {
							if (i == 0) {
								res = '时间：' + params[i].name + '<br/>';
							}
							res += params[i].seriesName + ' : ';
							if (params[i].seriesName.indexOf('电量') >= 0) {
								res += params[i].value + 'kWh<br/>'
							}
						}
						return res;
					}
				},
			    legend: {
			        data:[toDayName,yesterDayName],
			        selected : {toDayName:true,
			        			yesterDayName:true
			        			},
			      	padding:32
			    },
			    toolbox:{
			    	show:true,
			    	feature:{
			    		dataZoom:{},
			    		magicType:{type:['line','bar']},
			    		restore:{},
			    		saveAsImage:{}
			    	}
			    },
			    calculable : true,
			    xAxis : [
			        {
			            type : 'category',
//			            boundaryGap : false,
			            data : data.sMap.categes
			        }
			    ],
			    yAxis : [
			        {
			        	name : '单位(kWh)',
			            type : 'value',
			            axisLabel : {
			                formatter: '{value}'
			            }
			        }
			    ],
			    grid : {
		 			 x : 45, 			// 左边距离
		 			 y : 65,			// 上边距离
		 			 x2 : 20,			// 右边距离
		 			 y2 : 35			// 下边距离
		 		},
			    series : [
			        {
			            name:toDayName,
			            type:'bar',
			            data: data.sMap.preEnergyP
			        },
			        {
			            name:yesterDayName,
			            type:'bar',
			            data: data.sMap.yesEnergyP
			        }
			    ]
			};
		myChart1.setOption(option,true);
		myChart1.resize();
	}
	
	/**
	   * 峰谷电量 图表
	   */
	  function queryFgdlEchart(dataMap,title){
		  
		  
		var fgdlQueryType = $("#upDownChart").combobox("getValue");
		if(fgdlQueryType == '1'){
		  fgdlEDate = $('#monthDate').val();
		  
		}else if(fgdlQueryType == '2'){
		  //var elecAddrObj = document.getElementById('fgdlEDateM');
		  fgdlEDate = $('#yearDate').val();
		  
		}
		    
	    option = {
	         title: {
	                text: title, 
	                x:'center'
	         },
	         tooltip: {
		        trigger: 'axis',
	        	formatter : function(params, ticket, callback) {
	        		var res = '';
	        		if(params == null ||params[0] == null){
						return;
					}
					for(var i =0;i<params.length;i++){
						
						if (i == 0) {
							res = fgdlEDate + '-' + params[i].name + '<br/>';
						}
//						res = dataMap.dataDate;
						res += params[i].seriesName + ' : ';
						if (params[i].seriesName.indexOf('尖电量') >= 0) {
							res += params[i].value + 'kWh<br/>'
						}else if (params[i].seriesName.indexOf('峰电量') >= 0) {
							res += params[i].value + 'kWh<br/>'
						} else if (params[i].seriesName.indexOf('平电量') >= 0) {
							res += params[i].value + 'kWh</br>'
						} else if (params[i].seriesName.indexOf('谷电量') >= 0) {
							res += params[i].value + 'kWh</br>'
						}else if (params[i].seriesName.indexOf('峰谷比') >= 0) {
							res += params[i].value + '</br>'
						}
					}
					return res;
				}
		    },
	          
	          
	          legend: {
	              data: ['尖电量','峰电量', '平电量','谷电量','峰谷比'],
	              x:'center',
	              y:'35'
	          },
	          //设置grid位置
	          grid : {
	           x : 75, //左边距离
	           y : 75,//上边距离
	           x2 : 35,//右边距离
	           y2 : 35//下边距离
	         },
	          xAxis:  {
	              type: 'category',
	              data : dataMap.categes
	              
	          },
	          yAxis: [
	              {
	                  name: '单位(kWh)',
	                  type: 'value',
	              },
	              {
	                  name: '峰谷比',
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
	                      formatter: '{value}'
	                  }
	             },
	          ],
	          series: [
	              {
	                  name: '尖电量',
	                  type: 'bar',
	                  stack: '总量',
	                  data : dataMap.prePapR1,
	                  itemStyle:{
	                    normal:{
	                    color:'#ab6E63'
	                    }
	                  }
	              },
	              {
	                  name: '峰电量',
	                  type: 'bar',
	                  stack: '总量',
	                  data : dataMap.prePapR2,
	                  itemStyle:{
	                    normal:{
	                    color:'#FF6E63'
	                    }
	                  }
	              },
	              {
	                  name: '平电量',
	                  type: 'bar',
	                  stack: '总量',
	                  data : dataMap.prePapR3,
	                  itemStyle:{
	                    normal:{
	                    color:'#FED800'
	                    }
	                  }
	              },
	              {
	                  name: '谷电量',
	                  type: 'bar',
	                  stack: '总量',
	                  data : dataMap.prePapR4,
	                  itemStyle:{
	                    normal:{
	                    color:'#6490FF'
	                    }
	                  }
	              },
	              {
	                  name: '峰谷比',
	                  type:'line',
	                  yAxisIndex:1,
	                  data : dataMap.fgbi
	              }
	          ]
	      };

	    myChart2.setOption(option,true);
	    myChart2.resize();
	  }
	//查询按钮点击事件
	function searchButtonClick(){		
		if(isTabsType == 0){
			//加载当日负荷
			getFgktFh();
			$('#fhDatagrid').datagrid('load',{
				startDate:$("#dataDate").val(),
				totalPoint:"96"//$("#totalPoint").textbox("getValue")			
			});
		}else{
			if($("#dlzsTab").attr("class") == "active"){
				//加载当日电量
				getFgktDl();
			}else{
				//加载峰谷电量
				getFgktFgDl();
			}		
		}	
	}
	
	function getFgdlData(dataMap){
		var gridCommon = [];
	  	if($("#upDownChart").combobox("getValue") == '1'){
	  		gridCommon = [[
	  		   	 		{field:'shiduan',title:'时段',width: 100,align:'center'},
	  		   	 		{field:'benyue',title:'本月(kWh)',width: 100,align:'center'},
	  		   	 		{field:'shangyue',title:'上月(kWh)',width: 100,align:'center'},
	  		   	 		{field:'qntq',title:'去年同期(kWh)',width: 100,align:'center'},
	  		   	 		{field:'tongbi',title:'同比(%)',width: 100,align:'center'},
	  		   	 		{field:'huanbi',title:'环比(%)',width: 100,align:'center'}
	  		    		]];
	  	}else if($("#upDownChart").combobox("getValue") == '2'){
	  		gridCommon = [[
	  	         	 		{field:'shiduan',title:'时段',width: 100,align:'center'},
	  	         	 		{field:'benyue',title:'本年(kWh)',width: 100,align:'center'},
	  	         	 		{field:'shangyue',title:'去年(kWh)',width: 100,align:'center'},
//	  	         	 		{field:'qntq',title:'--',width: 100,align:'center'},
//	  	         	 		{field:'tongbi',title:'--',width: 100,align:'center'},
	  	         	 		{field:'huanbi',title:'同比(%)',width: 100,align:'center'}
	  	          		]];
	  	}
	  	$('#fgdlData').datagrid({// 表格
	  		title:'峰谷电量',
//	  		url:webContextRoot+ 'fgkt/queryMaxFgktFh.action',	
//	  		queryParams :{
//				startDate : $("#dataDate").val(),
//				totalPoint:$("#totalPoint").combobox("getValue")
//			},
	  		nowrap : false,// 设置为true，当数据长度超出列宽时将会自动截取。
	  		striped : true,// 设置为true将交替显示行背景。
	  		border:false,
	  		width:'100%',
	  	    height:'100%',
	  	    data : dataMap.conListData,
	  		fitColumns : true,// 自动适应宽度
	  		singleSelect : true,// 设置为true将只允许选择一行。
	  		rownumbers : false,// 设置为true将显示行数。
	  		loadMsg : "正在努力的读取数据中...",// 提示信息
	  		columns : gridCommon//字段
	  	});
	}
