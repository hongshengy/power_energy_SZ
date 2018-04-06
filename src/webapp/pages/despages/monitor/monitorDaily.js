/**
 * 监控日报
 */
var currentdate = new Date();
var endTime = DateUtil.dateToStr('yyyy-MM-dd',currentdate);
var startTime = DateUtil.dateToStr('yyyy-MM-dd', DateUtil.dateAdd('d',1,DateUtil.dateAdd('m',-1,currentdate))); 

//当前页数
var pageNo = 1;
//每页显示条数
var pageSize = 10;

$(function(){
	$('#gdgl-girdDetailView').datagrid({    
		title:'监控日报',
		url: webContextRoot +'changeShift/queryMonitorDailyList.action',
		loadMsg:'正在加载，请稍等……',//加载时显示提示
		rownumbers:true,
		fit:true,
		border:false,
		fitColumns:true,
		striped: true,
		singleSelect: true,
		columns:[[
		        {field:'reportDate',title:'日期',width:'12%',align:'center'},
		  	    {field:'consCount',title:'客户总数',width:'6%',align:'center'},
		  	    {field:'subsCount',title:'用户变总数',width:'6%',align:'center'},
		  	    {field:'trunCount',title:'主变总数',width:'6%',align:'center'},
		  	    {field:'trunSumCap',title:'主变总容量(kVA)',width:'15%',align:'center'},
		  	    {field:'sumEnergy',title:'当日总用电量(kWh)',width:'15%',align:'center'},
		  	    {field:'maxPower',title:'当日最大负荷(kW)',width:'15%',align:'center'},
		  	    {field:'maxPowerHappenTime',title:'最大负荷发生时间',width:'12%',align:'left'},
		  	    {field:'expCount',title:'异常总数',width:'6%',align:'left'},
		  	    {field:'ignoreCount',title:'消缺总数',width:'6%',align:'left'}
		]],
		tools:"#linkbuttons",
		pagination:true,
		pageSize: 20,
		pageList : [10,20,30,50],
		onLoadSuccess:function(data){
			var rows = $('#gdgl-girdDetailView').datagrid("getRows");
			if(rows.length>0){
				$('#gdgl-girdDetailView').datagrid("selectRow",0);
			}
		}
	});
	
	//初始化日期
	$('#searchTime').combobox({
      panelWidth: null,
      valueField: 'value',
      textField: 'text',
      editable: false,
      data: [{
          value: '1',
          text: '当天',
          "selected":true  
      }, {
          value: '2',
          text: '两天内'
      }, {
          value: '3',
          text: '三天内'
      }, {
          value: '4',
          text: '最近一周'
      }, {
          value: '5',
          text: '其他'
      }],
     /* onSelect: function (record) {
          if (record.value == '5') {
          	$("#selectTime").show();
        	$('#startTime').datebox('setValue',startTime);//开始日期
        	$('#endTime').datebox('setValue',endTime);//结束日期
        	
        	$('#gdgl-girdDetailView').datagrid('reload',{
     		   'monitorDailyModel.timeType':5,
     		   'monitorDailyModel.startDate':startTime,
     		   'monitorDailyModel.endDate':endTime
        	});
          }else{
          	$("#selectTime").hide();
          }
      }*//*,onLoadSuccess:function(){
      	$('#searchTime').combobox('select','1');
  	},*/
	onChange: function(newValue, oldValue){
	  if (newValue== "5"){
			$("#selectTime").show();
	  	//开始时间
		$('#startTime').datebox('setValue',startTime);
		//结束时间
		$('#endTime').datebox('setValue',endTime);
	    $('#datePicker_panel').show();
	    //当选择“其他”时重新加载页面查询此刻向前推一个月的监控日报数据
	  	$('#gdgl-girdDetailView').datagrid('reload',{
  		   'monitorDailyModel.timeType':5,
  		   'monitorDailyModel.startDate':startTime,
  		   'monitorDailyModel.endDate':endTime
     	});
	  }else{
		 	$("#selectTime").hide();
//	      labourList();
		 	$('#gdgl-girdDetailView').datagrid('reload',{
		  		   'monitorDailyModel.timeType':newValue
		    });
	  }
	}
  });
});

/**
 * 监控日报列表信息显示
 */
function labourList(){
	var timeType = $('#searchTime').datebox('getValue');
	if($('#searchTime').combobox('getValue') == 5){
//		startTime =  $('#startTime').datebox('getValue');//开始日期
//		endTime =  $('#endTime').datebox('getValue');//结束日期
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
	$('#gdgl-girdDetailView').datagrid('reload',{
		   'monitorDailyModel.timeType':timeType,
		   'monitorDailyModel.startDate':$('#startTime').datebox('getValue'),
		   'monitorDailyModel.endDate':$('#endTime').datebox('getValue')
	});
};
	
	
