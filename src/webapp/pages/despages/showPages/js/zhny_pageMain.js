
function queryZyhyydlList(){
$.ajax({
		type: "post",
		url: basePath + "/zhnyMain/queryZyhyydlList.action",
		data: "",
		dataType:"json",
		success: function(result)
			{
			option1 = {
				title : {
					      text: '主要行业用电数据总览(kw/h)',
					      x:'center'
					    },
			    tooltip : {
			        show: true,
			        trigger: 'item'
			    },
			    
			    calculable : true,
			    xAxis : [
			        {
			            type : 'category',
			            data : result.namelist
			        }
			    ],
			    yAxis : [
			        {
			            type : 'value',
			            axisLabel : {
			                formatter: '{value}万'
			            }
			        }
			    ],
			    series : [
			       
			        
			        {
			            type:'bar',
			            barWidth: 40,                   // 系列级个性化，柱形宽度
			            data:result.valuelist
			            
			        }
			    ]
			};
			myChart1.setOption(option1); 
		}
	});
	}
	function queryGfsjlList(){
	 $.ajax({
		type: "post",
		url: basePath + "/zhnyMain/queryGfsjlList.action",
		data: "queryPara.flag="+$("#flag").val()+"&queryPara.date="+$("#date2").val(),
		dataType:"json",
		success: function(result)
			{
			option2 = {
				title : {
					      text: '光伏数据总览',
					      x:'center'
					    },
			    tooltip : {
			        trigger: 'axis'
			    },
			    legend: {
			        data:['上网','并网'],
			        x:'left'
			    },
			    calculable : true,
			    xAxis : [
			        {
			            type : 'category',
			            data : result.datelist
			        }
			    ],
			    yAxis : [
			        {
			            type : 'value'
			        }
			    ],
			    series : [
			      
			        {
			            name:'上网',
			            type:'bar',
			            itemStyle: {                // 系列级个性化
			                normal: {
			                    barBorderWidth: 2
			                }
			            },
			            data:result.listSW
			        },
			        {
			            name:'并网',
			            type:'bar',
			            itemStyle: {                // 系列级个性化
			                normal: {
			                    barBorderWidth: 2
			                }
			            },
			            data:result.listBW
			        }
			    ]
			};
		     myChart2.setOption(option2); 					
		}
	});
	}
	function queryCnsjlList(){
	 $.ajax({
		type: "post",
		url: basePath + "/zhnyMain/queryCnsjlList.action",
		data: "",
		dataType:"json",
		success: function(result)
			{
			 option3 = {
			 	title : {
					      text: '储能数据总览(kw/h)',
					      x:'center'
					    },
			    tooltip : {
			        trigger: 'axis'
			    },
			    legend: {
			        data:['日充电量','日放电量'],
			         x : 'left'
			    },
			   
			    calculable : true,
			    xAxis : [
			        {
			            type : 'category',
			            boundaryGap : false,
			            data : result.datelist
			        }
			    ],
			    yAxis : [
			        {
			            type : 'value',
			            axisLabel : {
			                formatter: '{value}万'
			            }
			        }
			    ],
			    series : [
			        {
			            name:'日充电量',
			            type:'line',
			            data:result.inlist
			        },
			        {
			            name:'日放电量',
			            type:'line',
			            data:result.outlist
			        }
			    ]
			};
		      myChart3.setOption(option3); 
	      }
		});
      }
      function queryYslAndYqlList(){
      $.ajax({
		type: "post",
		url: basePath + "/zhnyMain/queryYslAndYqlList.action",
		data: "",
		dataType:"json",
		success: function(result)
			{	
			 option4 = {
			 	title : {
					      text: '水气数据总览',
					      x:'center'
					    },
			    tooltip : {
			        trigger: 'axis'
			    },
			    legend: {
			        data:['用水量','用气量'],
			        x : 'left'
			    },
			   
			    calculable : true,
			    xAxis : [
			        {
			            type : 'category',
			            boundaryGap : false,
			            data : result.dateList
			        }
			    ],
			    yAxis : [
			        {
			            type : 'value'
			        }
			    ],
			    series : [
			        {
			            name:'用水量',
			            type:'line',
			            data:result.yslList
			        },
			        {
			            name:'用气量',
			            type:'line',
			            data:result.yqlList
			        }
			    ]
			};
		      myChart4.setOption(option4); 
			}
		});
    }
    function   queryJtznhlList(){
       $.ajax({
		type: "post",
		url: basePath + "/zhnyMain/queryJtznhlList.action",
		data: "",
		dataType:"json",
		success: function(result)
			{
		     option5 = {
				    title : {
				        text: '家庭能耗总览(kw/h)',
				        x:'center'
				    },
				    tooltip : {
				        trigger: 'item',
				        formatter: "{a} <br/>{b} : {c} ({d}%)"
				    },
				    calculable : true,
				    series : [
				        {
				            name:'访问来源',
				            type:'pie',
				            radius : '55%',
				            center: ['50%', '60%'],
				            data:result.valueList
				        }
				    ]
				};
				myChart5.setOption(option5);	
			}
		});
	}
	function queryQynylList(){	
		option6 = {
		    title : {
		        text: '区域能源数据总览',
		        x:'center'
		    },
		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} ({d}%)"
		    },
		    legend: {
		        orient : 'vertical',
		        x : 'left',
		        data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
		    },
		    
		    calculable : true,
		    series : [
		        {
		            name:'访问来源',
		            type:'pie',
		            radius : '55%',
		            center: ['50%', '60%'],
		            data:[
		                {value:335, name:'直接访问'},
		                {value:310, name:'邮件营销'},
		                {value:234, name:'联盟广告'},
		                {value:135, name:'视频广告'},
		                {value:1548, name:'搜索引擎'}
		            ]
		        }
		    ]
		};
		myChart6.setOption(option6);	
		}	