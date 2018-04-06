/**
 * 电量电费分析
 */
var treeNodeType = '0';//树节点类型
var index = 0;//判断树首次加载
var currentdate = new Date();
var startDate = new Date(); // 当前开始时间 为当前时间往前推一年
var endDate = new Date();//当前结束时间  为当前时间
var dlzsChart = '';//电量走势chart
var fgdlChart = '';//峰谷电量chart
var fhqxChart = '';//负荷曲线chart
var sjfhfbChart = '';//时间负荷分布chart
var userChart = '';// 超容分析

var dlzsEDate = null;//电量走势结束时间
var newDlzsEData = null; // 第二时间查询
var fgdlEDate = null;//峰谷电量结束时间
var date = null;//今日、本月、今年时间
var dateLast = null;//昨天、上月、去年时间
var dldate = '';//电量走势当天时间竖线分隔x轴日期
var minValue = 0;//电量走势当天时间竖线分隔y轴最小值
var maxValue = 0;//电量走势当天时间竖线分隔y轴最大值
var dateList = new Array();      // 时间集合 第二时间使用
var powerList = new Array();      // 第二时间选择的数据
var newDlArrayLast = new Array();
var newDlzsEData = null;  // 电量第二时间
var fhArrayLast = new Array();    // 负荷曲线第二时间数据

//初始化chart
var chartType = 'fhqx';

  $(function(){
    dlzsChart = echarts.init(document.getElementById('dlzsChart'));
    fgdlChart = echarts.init(document.getElementById('fgdlChart'));
    fhqxChart = echarts.init(document.getElementById('fhqxChart'));
    sjfhfbChart = echarts.init(document.getElementById('sjfhfbChart'));
    userChart = echarts.init(document.getElementById('userChart'));    // 超容分析
   
    initDate();    // 初始化时间
    initTree();    // 初始化树

    // 电量走势tab
	$("#dlzsTab").click(function(){
		$('#dlSearchDiv1').css('display','block');
		$('#dlSearchDiv2').css('display','none');
		$('#fhSearchDiv1').css('display','none');
		$('#fhSearchDiv2').css('display','none');
		$('#fhSearchDiv3').css('display','none');
		
		var position = $(this).position();
		$('#dlTab').tabs('select',0);
		$('#fgdlTab').removeClass();
		$('#dlzsTab').removeClass().addClass("active");
		chartType = 'dlzs';
		queryDlzs();
	});
	
	// 峰谷电量tab
	$("#fgdlTab").click(function(){
		$('#dlSearchDiv1').css('display','none');
		$('#dlSearchDiv2').css('display','block');
		$('#fhSearchDiv1').css('display','none');
		$('#fhSearchDiv2').css('display','none');
		$('#fhSearchDiv3').css('display','none');
		
		var position = $(this).position();
		$('#dlTab').tabs('select',1);
		$('#dlzsTab').removeClass();
		$('#fgdlTab').removeClass().addClass("active");
		chartType = 'fgdl';
		queryFgdl();
	});
	
	// 负荷曲线tab
	$("#fhqxTab").click(function(){
		$('#dlSearchDiv1').css('display','none');
		$('#dlSearchDiv2').css('display','none');
		$('#fhSearchDiv1').css('display','block');
		$('#fhSearchDiv2').css('display','none');
		$('#fhSearchDiv3').css('display','none');
		
		var position = $(this).position();
		$('#fxTab').tabs('select',0);
		$('#sjfhfbTab').removeClass();
		$('#superfbTab').removeClass();
		$('#fhqxTab').removeClass().addClass("active");
		chartType = 'fhqx';
		queryFhqx();
		
	});
	
	// 时间负荷tab
	$("#sjfhfbTab").click(function(){
		$('#dlSearchDiv1').css('display','none');
		$('#dlSearchDiv2').css('display','none');
		$('#fhSearchDiv1').css('display','none');
		$('#fhSearchDiv2').css('display','block');
		$('#fhSearchDiv3').css('display','none');
		
		var position = $(this).position();
		$('#fxTab').tabs('select',1);
		$('#fhqxTab').removeClass();
		$('#superfbTab').removeClass();
		$('#sjfhfbTab').removeClass().addClass("active");
		chartType = 'sjfh';
		querySjfhfb();
	});
	
	// 超容分析tab
	$("#superfbTab").click(function(){
		$('#dlSearchDiv1').css('display','none');
		$('#dlSearchDiv2').css('display','none');
		$('#fhSearchDiv1').css('display','none');
		$('#fhSearchDiv2').css('display','none');
		$('#fhSearchDiv3').css('display','block');
		
		var position = $(this).position();
		$('#fxTab').tabs('select',2);
		$('#fhqxTab').removeClass();
		$('#sjfhfbTab').removeClass();
		$('#superfbTab').removeClass().addClass("active");
		chartType = 'super';
		querySuper();
	});
	
	// 电量负荷tab
	$("#bigTab").tabs({				// 电量概览 电费概览选项卡
		onSelect:function(title,index){// title:标签名，index:下标
			if(index == 1){			// 电量概览
				$('#dlSearchDiv1').css('display','block');
				$('#dlSearchDiv2').css('display','none');
				$('#fhSearchDiv1').css('display','none');
				$('#fhSearchDiv2').css('display','none');
				$('#fhSearchDiv3').css('display','none');
				$('#fgdlTab').removeClass();
				$('#dlzsTab').removeClass().addClass("active");
				chartType = 'dlzs';
				var position = $(this).position();
				$('#dlTab').tabs('select',0);
				queryDlzs();		// 点击电量默认加载电量走势
			}else if(index == 0){	// 电费概览
				$('#dlSearchDiv1').css('display','none');
				$('#dlSearchDiv2').css('display','none');
				$('#fhSearchDiv1').css('display','block');
				$('#fhSearchDiv2').css('display','none');
				$('#fhSearchDiv3').css('display','none');
				$('#sjfhfbTab').removeClass();
				$('#superfbTab').removeClass();
				$('#fhqxTab').removeClass().addClass("active");
				chartType = 'fhqx';
				var position = $(this).position();
				$('#fxTab').tabs('select',0);
				queryFhqx();		// 点击负荷默认加载负荷曲线
			}
		}
	});
	
	/**
	 * 超容分析弹出 
	 */
	userChart.on('click', function (params) {//echarts的点击事件
		if(params.seriesIndex != 0){//判断如果不是‘基准线’可点击
			return ;
		}
		// 销毁iframe
		$('#msgwindow').dialog("destroy");
		//点击事件后:弹出窗体
		var content = "<iframe src='"+webContextRoot+"/pages/despages/monitor/chargePop.jsp?beginData="+params.name+"&endData="+params.name+"&consId="+consId+"&consName="+consName+"' width='100%' height='99%' frameborder='0' scrolling='no'/>";
		var boarddiv = "<div id='msgwindow' title='详情'/>";
		$(document.body).append(boarddiv);
		var win = $("#msgwindow").dialog({
			content : content,
			width : document.body.clientWidth-160,
			height : document.body.clientHeight-160,
			maximizable:true,
			closable:true,
			modal : 'shadow',
			title : consName.replace("有限公司","")+'负荷走势(96点)',
		});
		win.dialog('open');
	    
	}); 
	
    
  });
  
  
  // 初始化树
  function initTree(){
    if(consId==null || consId==''|| consId=="null"){//未获取到企业编码，加载左侧树
    	
		consSelectMethod = "consSelectMethodLoad()";//定义选中后执行的方法
		consSelectHasRoot = false;//是否有区域能源根节点
		consSelectSearch("",true);
    	
    }else{
      //查询企业
          queryCorporation();
    }
  }
  

  /**
   * 快搜选中节点  
   */
  function consSelectMethodLoad(){
  	consId = consSelectCon.id;		// 把树节点id赋给企业id
  	consName = consSelectCon.text;   // 把树节点的值赋给企业名称
  	queryCorporation();
  }
  
   /**
    * 树查询
    * @param nodeId
    */
   function selectTree(nodeId){
     $('#tt li:eq(0)').find('div').addClass("tree-node-selected");//添加选中样式
     var n = $('#tt').tree('getSelected');//获取被选中的节点
     if(n!=null)//判断节点是否存在
     {
       $('#tt').tree('select',n.target);
     }
     
     var chiNode = $('#tt').tree('getChildren',n.target);//子节点
     for(var i=0 ; i < chiNode.length ; i++)//循环节点
       {
        if(nodeId!=null?chiNode[i].id==nodeId:chiNode[i].type==1)//查找定位
         {
           var n = $('#tt').tree("find",chiNode[i].id);//根据id获取节点
                   $('#tt').tree('select',n.target);//选中节点
                   $('#tt').tree('scrollTo',n.target);//滚动到节点
                  consId = chiNode[i].id;
                  consName = chiNode[i].text;
                  //查询企业
                  queryCorporation();
                  break;//跳出循环
        }
       }
   }
  
  
 //查询电量走势
   function changedlzs(){
   	queryDlzs();
   }
   //查询峰谷电量
   function changefgdl(){
   	queryFgdl();
   }
   //查询负荷曲线
   function changefhqx(){
   	queryFhqx();
   }
   //查询时间负荷
   function changesjfh(){
   	querySjfhfb();
   }
   //查询超容分析
   function changeSuper(){
   	querySuper();
   }
   /**
    * 第二时间点击事件 
    */
   function changefhqxUp(){
   	queryFhqx();
   }
   
  /**
   * 选择第二时间 电量
   */
  function changedlzsUp(){
    queryDlzs();
  }
  
  /**
   * 电量走势
   */
  function queryDlzs(){
    // 获取企业节点
    var node = $('#tt').tree('getSelected');            
    // tab选项卡赋值
    // 时间选择 年月日类型
    var dlzsQueryType = $('#dlzsQueryType').combobox('getValue');  
    // 时间值
    var sumUp = 0;  // 第二时间总数
    var temp = null;
    var temp1 = null;
    if(dlzsQueryType == 'D'){
      dlzsEDate = $('#dlzsEDateD').val();
      date = $('#dlzsEDateD').val();
      dateLast = new Date(date);
      dateLast = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('d',-1,dateLast));
      if(date == (DateUtil.dateToStr('yyyy-MM-dd',endDate))){
        dldate = DateUtil.dateToStr('hh',DateUtil.dateAdd('h',-1,currentdate)) + ':00';
        dldate1 = DateUtil.dateToStr('hh',DateUtil.dateAdd('h',-1,currentdate));
      }else{
        dldate = '0';
      }
      temp = date;
      temp1 = '日用电量较 ' + $('#dlzsEDateDUp').val() + '日 增长率为：';
      newDlzsEData = $('#dlzsEDateDUp').val();      // 第二时间天数
    }else if(dlzsQueryType == 'M'){
      dlzsEDate = $('#dlzsEDateM').val() + '-01';
      date = $('#dlzsEDateM').val();
      dateLast = new Date(date);
      dateLast = DateUtil.dateToStr('yyyy-MM',DateUtil.dateAdd('m',-1,dateLast));
      
      if((date.substr(0,7)) == (DateUtil.dateToStr('yyyy-MM',endDate))){
        dldate = DateUtil.dateToStr('dd',DateUtil.dateAdd('d',-1,currentdate));
        dldate1 = DateUtil.dateToStr('dd',DateUtil.dateAdd('d',-1,currentdate));
      }else{
        dldate = '0';
      }
      temp = date;
      temp1 = '月用电量较 ' + $('#dlzsEDateMUp').val() + '月 增长率为： ';
      newDlzsEData = $('#dlzsEDateMUp').val() + '-01';  // 第二时间月份
    }else if(dlzsQueryType == 'Y'){
      dlzsEDate = $('#dlzsEDateY').val() + '-01-01';
      date = $('#dlzsEDateY').val();
      dateLast = new Date(date);
      dateLast = DateUtil.dateToStr('yyyy',DateUtil.dateAdd('y',-1,dateLast));
      
      if((date.substr(0,4)) == (DateUtil.dateToStr('yyyy',endDate))){
        dldate = DateUtil.dateToStr('MM',currentdate);
      }else{
        dldate = '0';
      }
      temp = date;
      temp1 = '年用电量较 ' + $('#dlzsEDateYUp').val() + '年 增长率为：';
      newDlzsEData = $('#dlzsEDateYUp').val() + '-01-01';  // 第二时间年份  
    }
    // 第二时间选择
    
    //********************************************************第二时间BEGIN***************************************************
    $.ajax({
      type: "post",
      url:webContextRoot + 'powerLoadAnalyze/queryConsDLPowerInfo.action',//请求地址
      data: "consPowerInfoModel.consId=" + consId + "&consPowerInfoModel.startDate=" + newDlzsEData+"&consPowerInfoModel.endDate="+newDlzsEData+"&consPowerInfoModel.queryType="+dlzsQueryType,//得到时间+用户ID
      dataType:"json",    // 返回类型
      cache : false,
      async : false,      // 同步异步请求
      success: function(result){
        
        newDlArrayLast = result.consMap.powerValue;
        var dataDateArray = result.consMap.dataDate;
        
        for(i=0; i<newDlArrayLast.length; i++){
               if(newDlArrayLast[i] != null && newDlArrayLast[i] != '-'){
                 date = $('#dlzsEDateDUp').val();
                 if(dlzsQueryType == 'D'){//天
                   if(date == (DateUtil.dateToStr('yyyy-MM-dd',endDate))){
                     if(parseFloat(dataDateArray[i].substr(0,2)) <  parseFloat(dldate1)){
                       if(newDlArrayLast[i] != null && newDlArrayLast[i] != '-'){
                         sumUp = parseFloat(sumUp) + parseFloat(newDlArrayLast[i]);
                       }
                     }else{
                       if(newDlArrayLast[i] != null && newDlArrayLast[i] != '-'){
                         sumUp = parseFloat(sumUp);
                       }
                     }
                   }else{
                     if(newDlArrayLast[i] != null && newDlArrayLast[i] != '-'){
                     sumUp = parseFloat(sumUp) + parseFloat(newDlArrayLast[i]);
                   }
                   }
                 }else if(dlzsQueryType == 'M'){//月
                   if(date == (DateUtil.dateToStr('yyyy-MM',endDate))){
                     if(parseFloat(dataDateArray[i].substr(0,2)) <  parseFloat(dldate1)){
                       if(newDlArrayLast[i] != null && newDlArrayLast[i] != '-'){
                         sumUp = parseFloat(sumUp) + parseFloat(newDlArrayLast[i]);
                       }
                     }else{
                       if(newDlArrayLast[i] != null && newDlArrayLast[i] != '-'){
                         sumUp = parseFloat(sumUp);
                       }
                     }
                   }else{
                     if(newDlArrayLast[i] != null && newDlArrayLast[i] != '-'){
                       sumUp = parseFloat(sumUp) + parseFloat(newDlArrayLast[i]);
                   }
                   }
                 }else{
                   if(newDlArrayLast[i] != null && newDlArrayLast[i] != '-'){
                     sumUp = parseFloat(sumUp) + parseFloat(newDlArrayLast[i]);
               }
                 }
                }
                if(newDlArrayLast[i] != null && maxValue < parseFloat(newDlArrayLast[i])){
                    maxValue = parseFloat(newDlArrayLast[i]);
                }
                if(newDlArrayLast[i] != null && minValue > parseFloat(newDlArrayLast[i])){
                	minValue = parseFloat(newDlArrayLast[i]);
                }
             }
      }
    });
    //*********************************************************END**********************************************************
    
    
    dlzsChart.showLoading({
      text:'正在努力的读取数据中...',
      effect:'spin'
    });

       $.post(webContextRoot +'powerLoadAnalyze/queryConsDLPowerInfo.action',{
        'consPowerInfoModel.consId': consId,
          'consPowerInfoModel.startDate': dlzsEDate,//昨天
          'consPowerInfoModel.endDate': dlzsEDate,//今天
          'consPowerInfoModel.queryType': dlzsQueryType
       },
       function(data){
           var dlArray = data.consMap.powerValue;//今天、本月、今年
           var dlArrayLast = data.consMap.powerValueLast;//昨天、上月、去年
           var sum = 0;//今天、本月、今年总数
           var sumLast = 0;///昨天、上月、去年总数
           minValue = 0;
           maxValue = 0;
           var dataDateArray = data.consMap.dataDate;
           for(i=0; i<dlArray.length; i++){
             if(dlArray[i] != null && dlArray[i] != '-'){
               date = $('#dlzsEDateD').val();
               if(dlzsQueryType == 'D'){//天
                 if(date == (DateUtil.dateToStr('yyyy-MM-dd',endDate))){
                   if(parseFloat(dataDateArray[i].substr(0,2)) <  parseFloat(dldate1)){
                     if(dlArray[i] != null && dlArray[i] != '-'){
                       sum = parseFloat(sum) + parseFloat(dlArray[i]);
                     }
                   }else{
                     if(dlArray[i] != null && dlArray[i] != '-'){
                       sum = parseFloat(sum);
                     }
                   }
                 }else{
                   if(dlArray[i] != null && dlArray[i] != '-'){
                   sum = parseFloat(sum) + parseFloat(dlArray[i]);
                 }
                 }
               }else if(dlzsQueryType == 'M'){//月
                 if(date == (DateUtil.dateToStr('yyyy-MM',endDate))){
                   if(parseFloat(dataDateArray[i].substr(0,2)) <  parseFloat(dldate1)){
                     if(dlArray[i] != null && dlArray[i] != '-'){
                       sum = parseFloat(sum) + parseFloat(dlArray[i]);
                     }
                   }else{
                     if(dlArray[i] != null && dlArray[i] != '-'){
                       sum = parseFloat(sum);
                     }
                   }
                 }else{
                   if(dlArray[i] != null && dlArray[i] != '-'){
                     sum = parseFloat(sum) + parseFloat(dlArray[i]);
                 }
                 }
               }else{
                 if(dlArray[i] != null && dlArray[i] != '-'){
                   sum = parseFloat(sum) + parseFloat(dlArray[i]);
             }
               }
              }
              if(dlArray[i] != null && maxValue < parseFloat(dlArray[i])){
                  maxValue = parseFloat(dlArray[i]);
              }
              if(dlArray[i] != null && minValue > parseFloat(dlArray[i])){
                  minValue = parseFloat(dlArray[i]);
              }
           }
           for(i=0; i<dlArrayLast.length; i++){
           if(dlzsQueryType == 'D'){//天
             if(date == (DateUtil.dateToStr('yyyy-MM-dd',endDate))){
               if(parseFloat(dataDateArray[i].substr(0,2)) <  parseFloat(dldate1)){
                 if(dlArrayLast[i] != null && dlArrayLast[i] != '-'){
                   sumLast = parseFloat(sumLast) + parseFloat(dlArrayLast[i]);
                 }
               }else{
                 if(dlArrayLast[i] != null && dlArrayLast[i] != '-'){
                   sumLast = parseFloat(sumLast);
                 }
               }
             }else{
               if(dlArrayLast[i] != null && dlArrayLast[i] != '-'){
               sumLast = parseFloat(sumLast) + parseFloat(dlArrayLast[i]);
             }
             }
           }else if(dlzsQueryType == 'M'){//月
             if(date == (DateUtil.dateToStr('yyyy-MM',endDate))){
               if(parseFloat(dataDateArray[i].substr(0,2)) <  parseFloat(dldate1)){
                 if(dlArrayLast[i] != null && dlArrayLast[i] != '-'){
                   sumLast = parseFloat(sumLast) + parseFloat(dlArrayLast[i]);
                 }
               }else{
                 if(dlArrayLast[i] != null && dlArrayLast[i] != '-'){
                   sumLast = parseFloat(sumLast);
                 }
               }
             }else{
               if(dlArrayLast[i] != null && dlArrayLast[i] != '-'){
               sumLast = parseFloat(sumLast) + parseFloat(dlArrayLast[i]);
             }
             }
           }else{
             if(dlArrayLast[i] != null && dlArrayLast[i] != '-'){
             sumLast = parseFloat(sumLast) + parseFloat(dlArrayLast[i]);
           }
           }
           	   if(dlArrayLast[i] != null && maxValue < parseFloat(dlArrayLast[i])){
                   maxValue = parseFloat(dlArrayLast[i]);
               }
	           	if(dlArrayLast[i] != null && minValue > parseFloat(dlArrayLast[i])){
	                minValue = parseFloat(dlArrayLast[i]);
	            }
           	   
           }
           var temp2 = '-';
           if(sumUp != 0 && sumUp != null && sum != 0){
             temp2 = parseFloat(((sum-sumUp)/sumUp*100).toFixed(2)) + '%';
           }
           
           var consNoObj = document.getElementById('zdlhb');
       consNoObj.innerHTML = temp+temp1+temp2 + "。";
       
      //判断是否为当天、当月、当年
       if(dlzsQueryType == 'D'){
         dateList = data.consMap.dataDate;
         powerList = data.consMap.powerValue;
         date = $('#dlzsEDateD').val();
         newDlzsEData = $('#dlzsEDateDUp').val();
         if(date == (DateUtil.dateToStr('yyyy-MM-dd',endDate))){
           queryDlzsEchart(dataDateArray,dlArray,newDlArrayLast,(consName + "电量走势"),newDlzsEData,true);
         }else{
           queryDlzsEchart(dataDateArray,dlArray,newDlArrayLast,(consName + "电量走势"),newDlzsEData,false);
         }
       }else if(dlzsQueryType == 'M'){
         dateList = data.consMap.dataDate;
         powerList = data.consMap.powerValue;
         date = $('#dlzsEDateM').val();
         newDlzsEData = $('#dlzsEDateMUp').val();
         if((date.substr(0,7)) == (DateUtil.dateToStr('yyyy-MM',endDate))){
           queryDlzsEchart(dataDateArray,dlArray,newDlArrayLast,(consName + "电量走势"),newDlzsEData,true);
         }else{
           queryDlzsEchart(dataDateArray,dlArray,newDlArrayLast,(consName + "电量走势"),newDlzsEData,false);
         }
       }else if(dlzsQueryType == 'Y'){
         dateList = data.consMap.dataDate;
         powerList = data.consMap.powerValue;
         date = $('#dlzsEDateY').val();
         newDlzsEData = $('#dlzsEDateYUp').val();
         if((date.substr(0,4)) == (DateUtil.dateToStr('yyyy',endDate))){
           queryDlzsEchart(dataDateArray,dlArray,newDlArrayLast,(consName + "电量走势"),newDlzsEData,true);
         }else{
           queryDlzsEchart(dataDateArray,dlArray,newDlArrayLast,(consName + "电量走势"),newDlzsEData,false);
         }
       }
       
           dlzsChart.hideLoading();
       
       },'json');
       
  }
  
  /**
   * 电量走势 图表
   */
  function queryDlzsEchart(dateList,powerList,newDlArrayLast,title,newDlzsEData,flag){
    
    var series = [];
    if(flag == true){
      series = [
                {
                    name: date + ' 有功电量',
                    type:'bar',
                    data : powerList,
                    markLine:{
                    symbol:'circle',
                    itemStyle: {
                      normal: {
                        lineStyle: {type:'dashed',color:'red',width: 1}
                            }
                        },
                         data:[
                                  [
                                     {xAxis:dldate, yAxis:minValue}, 
                                     {xAxis:dldate, yAxis:maxValue}
                                  ]
                         ]
                     }
                },
                {
                    name: newDlzsEData + ' 有功电量',
                    type:'bar',
                    data : newDlArrayLast
                }
            ]
    }else{
      series = [
                {
                    name: date + ' 有功电量',
                    type:'bar',
                    data :powerList
                    
                },
                {
                    name: newDlzsEData + ' 有功电量',
                    type:'bar',
                    data :newDlArrayLast
                }
            ]
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
	            	  // 本期时间
	            	  var date = '';
	            	  // 上期时间
	            	  var dateUp = '';
	            	  // 时间选择 年月日类型
	            	  var dlzsQueryType = $('#dlzsQueryType').combobox('getValue'); 
	            	  if(dlzsQueryType == 'D'){
	            		  date = params[i].seriesName.split(' ')[0]+' ' + params[i].name;
	            	  }else if(dlzsQueryType == 'M'){
	            		  date = params[i].seriesName.split(' ')[0]+ '-' + params[i].name;
	            	  }else if(dlzsQueryType == 'Y'){
	            		  date = params[i].seriesName.split(' ')[0]+ '-' + params[i].name;
	            	  }
	            	  if(params[i].seriesIndex == 0){
	                	  res += date + ' 电量：'+ powerList[params[0].dataIndex]+'kWh' + '<br/>';
	            	  } else if(params[i].seriesIndex == 1){
	                	  res += date + ' 电量：'+ newDlArrayLast[params[0].dataIndex] +'kWh' + '<br/>';
	            	  }
	              }
	              return res;
	          }
          },
          legend: {
              data: [date + ' 有功电量' , newDlzsEData + ' 有功电量'],
              x:'center',
              y:'35'
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
          //设置grid位置
          grid : {
           x : 75, //左边距离
           y : 75,//上边距离
           x2 : 35,//右边距离
           y2 : 35//下边距离
         },
          xAxis: {
              type: 'category',
//              boundaryGap: false,
              data : dateList
          },
          yAxis: [{
                name: '单位(kWh)',
                type: 'value'
//                max : maxValue
            }],
            series : series
      };
      
//      option.series = series;
      dlzsChart.setOption(option,true);
      dlzsChart.resize();
  }
  
  /**
   * 峰谷电量
   */
  function queryFgdl(){
    var node = $('#tt').tree('getSelected');//获取企业节点    
    
    var fgdlQueryType = $('#fgdlQueryType').combobox('getValue');
    if(fgdlQueryType == 'D'){
      //var elecAddrObj = document.getElementById('fgdlEDateD');
      fgdlEDate = $('#fgdlEDateD').val();
      
    }else if(fgdlQueryType == 'M'){
      //var elecAddrObj = document.getElementById('fgdlEDateM');
      fgdlEDate = $('#fgdlEDateM').val() + '-01';
      
    }else if(fgdlQueryType == 'Y'){
      //var elecAddrObj = document.getElementById('fgdlEDateY');
      fgdlEDate = $('#fgdlEDateY').val() + '-01-01';
      
    }
    
    fgdlChart.showLoading({
      text:'正在努力的读取数据中...',
      effect:'spin'
    });
    
    $.post(webContextRoot +'powerLoadAnalyze/queryConsDLPowerInfo.action',{
        'consPowerInfoModel.consId': consId,
          'consPowerInfoModel.startDate':fgdlEDate,
          'consPowerInfoModel.endDate':fgdlEDate,
          'consPowerInfoModel.queryType': $('#fgdlQueryType').combobox('getValue')
       },
       function(data){
         queryFgdlEchart(data.consMap,consName + "峰谷电量");
           fgdlChart.hideLoading();
           
           //峰谷表格
           queryData(data.consMap,fgdlQueryType);
       },'json');
    
  }

  /**
   * 峰谷电量 图表
   */
  function queryFgdlEchart(dataMap,title){
	  
	  
	var fgdlQueryType = $('#fgdlQueryType').combobox('getValue');
	if(fgdlQueryType == 'D'){
	  //var elecAddrObj = document.getElementById('fgdlEDateD');
	  fgdlEDate = $('#fgdlEDateD').val();
	  
	}else if(fgdlQueryType == 'M'){
	  //var elecAddrObj = document.getElementById('fgdlEDateM');
	  fgdlEDate = $('#fgdlEDateM').val();
	  
	}else if(fgdlQueryType == 'Y'){
	  //var elecAddrObj = document.getElementById('fgdlEDateY');
	  fgdlEDate = $('#fgdlEDateY').val();
	  
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
					res += params[i].seriesName + ' : ';
					if (params[i].seriesName.indexOf('峰电量') >= 0) {
						res += params[i].value + 'kWh<br/>'
					} else if (params[i].seriesName.indexOf('平电量') >= 0) {
						res += params[i].value + 'kWh</br>'
					} else if (params[i].seriesName.indexOf('谷电量') >= 0) {
						res += params[i].value + 'kWh</br>'
					} else if (params[i].seriesName.indexOf('峰谷比') >= 0) {
						res += params[i].value + '%</br>'
					}
					
//					if(i==0){
//						var data = null;
//						if(typeof dataMap.powerFValue[params[i].dataIndex] == 'undefined'){
//							data = "-";
//						}else{
//							data = dataMap.powerFValue[params[i].dataIndex];
//						}
//						var date = null;
//						if(params[i].name == null || params[i].name == ''){
//							date = "";
//						}else{
//							date = "-" + params[i].name;
//						}
//		            	res += fgdlEDate + date + ' 峰电量：'+ data +'kWh' + '<br/>';
//					}
//					if(i==1){
//						var data = null;
//						if(typeof dataMap.powerPValue[params[i].dataIndex] == 'undefined'){
//							data = "-";
//						}else{
//							data = dataMap.powerPValue[params[i].dataIndex];
//						}
//						var date = null;
//						if(params[i].name == null || params[i].name == ''){
//							date = "";
//						}else{
//							date = "-" + params[i].name;
//						}
//		            	res += fgdlEDate + date + ' 平电量：'+ data +'kWh' + '<br/>';
//					}
//					if(i==2){
//						var data = null;
//						if(typeof dataMap.powerGValue[params[i].dataIndex] == 'undefined'){
//							data = "-";
//						}else{
//							data = dataMap.powerGValue[params[i].dataIndex];
//						}
//						var date = null;
//						if(params[i].name == null || params[i].name == ''){
//							date = "";
//						}else{
//							date = "-" + params[i].name;
//						}
//		            	res += fgdlEDate + date + ' 谷电量：'+ data +'kWh' + '<br/>';
//					}
//					if(i==3){
//						var data = null;
//						if(typeof dataMap.fgbList[params[i].dataIndex] == 'undefined'){
//							data = "-";
//						}else{
//							data = dataMap.fgbList[params[i].dataIndex];
//						}
//		            	res += fgdlEDate + date + ' ' + params[i].seriesName.split(' ')[0]+ "：" + data +'%' + '<br/>';
//					}
				}
				return res;
			}
	    },
          
          
          legend: {
              data: ['峰电量', '平电量','谷电量','峰谷比'],
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
              data : dataMap.dataDate
              
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
                  name: '峰电量',
                  type: 'bar',
                  stack: '总量',
                  data : dataMap.powerFValue,
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
                  data : dataMap.powerPValue,
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
                  data : dataMap.powerGValue,
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
                  //data:[120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230, 210,120, 132, 101]
                  data : dataMap.fgbList
              }
              
          ]
      };

      fgdlChart.setOption(option,true);
      fgdlChart.resize();
  }

  /**
   * 峰谷电量 数据列表
   * 
   */
  function queryData(dataMap,dataType){
  	var gridCommon = [];
  	if(dataType == 'M'){
  		gridCommon = [[
  		   	 		{field:'shiduan',title:'时段',width: 100,align:'center'},
  		   	 		{field:'benyue',title:'本月(kWh)',width: 100,align:'center'},
  		   	 		{field:'shangyue',title:'上月(kWh)',width: 100,align:'center'},
  		   	 		{field:'qntq',title:'去年同期(kWh)',width: 100,align:'center'},
  		   	 		{field:'tongbi',title:'同比(%)',width: 100,align:'center'},
  		   	 		{field:'huanbi',title:'环比(%)',width: 100,align:'center'}
  		    		]];
  	}else if(dataType == 'Y'){
  		gridCommon = [[
  	         	 		{field:'shiduan',title:'时段',width: 100,align:'center'},
  	         	 		{field:'benyue',title:'本年(kWh)',width: 100,align:'center'},
  	         	 		{field:'shangyue',title:'去年(kWh)',width: 100,align:'center'},
  	         	 		{field:'qntq',title:'--',width: 100,align:'center'},
  	         	 		{field:'tongbi',title:'--',width: 100,align:'center'},
  	         	 		{field:'huanbi',title:'环比(%)',width: 100,align:'center'}
  	          		]];
  	}
  	  
  	$('#fgdlData').datagrid({// 表格
  		title:'峰谷电量',
  		nowrap : false,// 设置为true，当数据长度超出列宽时将会自动截取。
  		striped : true,// 设置为true将交替显示行背景。
  		border:false,
  		width:'100%',
  	    height:'100%',
  		fitColumns : true,// 自动适应宽度
  		singleSelect : true,// 设置为true将只允许选择一行。
  		rownumbers : false,// 设置为true将显示行数。
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
	 * 负荷曲线数据表格 
	 */
	function queryTable(){
		
		var newDate = '';
		var date = '';
		var fgdlQueryType = $('#dlzsQueryTypeByFh').combobox('getValue');
		// 选择日数据
		if(fgdlQueryType == 'D'){
			date = $('#fhqxEDate').val();
			newDate = $('#fhqxEDateUp').val();
		}else if(fgdlQueryType == 'M'){
			date = $('#fhqxEDateM').val() + '-01';
		}
		$.ajax({
			type: "post",
			url:webContextRoot + 'powerLoadAnalyze/queryConsFHQXPowerByTable.action',//请求地址
			data: "consPowerInfoModel.consId=" + consId + "&consPowerInfoModel.startDate=" + date + "&consPowerInfoModel.endDate=" + newDate+"&consPowerInfoModel.queryType="+fgdlQueryType,//得到时间+用户ID
			dataType:"json",		// 返回类型
			cache : false,
			async : false,			// 同步异步请求
			success: function(result){
				createFhqxData(result.consMap.dataList); // 加载表格
			}
		});
		
	}
  
	/**
	 * 负荷曲线表格 
	 */
	function createFhqxData(dataList){
		var	gridCommon = [];
		
		gridCommon = [[
		   	     		{field:'dataDate',title:'日期',width: $(this).width()*0.25,align:'center'},
		   	     		{field:'maxValue',title:'最大负荷(kW)',width: $(this).width()*0.25,align:'center'},
		   	     		{field:'minValue',title:'最小负荷(kW)',width: $(this).width()*0.25,align:'center'},
		   	     		{field:'avgValue',title:'平均负荷(kW)',width: $(this).width()*0.25,align:'center'}
		   	     		]
		   	    	];
		
		$('#fhqxDatagrid').datagrid({ 			// 加载数据
			width : '100%',						// 宽度
			height : '100%',
			singleSelect : true,				// 设置为true将只允许选择一行。
			nowrap : false,						// 设置为true，当数据长度超出列宽时将会自动截取。
			striped : true,						// 设置为true将交替显示行背景。
			border:false,						// 边框
			pagination : false,					// 设置true将在数据表格底部显示分页工具栏。
		  	fitColumns : true,					// 自动适应宽度
			rownumbers : true,					// 设置为true将显示行数。
			onLoadSuccess : function() {		// 加载数据之后
				$('#fhqxDatagrid').datagrid('selectRow', 0); // 选择第一行
			},
			loadMsg : "正在努力的读取数据中...",	// 提示信息
			columns : gridCommon,
			data : dataList						
		}); 
	}
	
  /**
   * 负荷曲线
   */
  function queryFhqx(){
	// 数据表格
	queryTable();
  	var node = $('#tt').tree('getSelected');//获取企业节点
  	fhqxChart.showLoading({
  		text:'正在努力的读取数据中...',
  		effect:'spin'
  	});
  	isFG=false;
  	var newDate = "";
  	var fgdlQueryType = $('#dlzsQueryTypeByFh').combobox('getValue');
  	if(fgdlQueryType == 'D'){
  		date = $('#fhqxEDate').val();
  		newDate = $('#fhqxEDateUp').val();
  		// 第二时间数据
  		$.ajax({
  			type: "post",
  			url:webContextRoot + 'powerLoadAnalyze/queryConsFHQXPowerInfo.action',//请求地址
  			data: "consPowerInfoModel.consId=" + consId + "&consPowerInfoModel.startDate=" + newDate+"&consPowerInfoModel.endDate="+newDate+"&consPowerInfoModel.queryType="+fgdlQueryType+"&consPowerInfoModel.dataDate=" + newDate,//得到时间+用户ID
  			dataType:"json",		// 返回类型
  			cache : false,
  			async : false,			// 同步异步请求
  			success: function(data){
  				powerValueLastFh = data.consMap.powerValue;
  				var fhArray = data.consMap.powerValue;
  		         var maxValue = data.consMap.maxValue;//最大值
  		         var minValue = data.consMap.minValue;//最小值
  		         var maxDate = data.consMap.maxDate;//最大发生时间
  		         var minDate = data.consMap.minDate;//最小发生时间
  		         var count = 0;//条数
  		         var sum = 0;//总数
  		         
  		         for(var i=0; i<powerValueLastFh.length; i++){
  		         	if(powerValueLastFh[i] != null){
  		         		sum = parseFloat(sum) + parseFloat(powerValueLastFh[i]=='-'?0:powerValueLastFh[i]);
  		         		count ++;
  		         	}
  		         }
  		         var avgValue = (sum/count).toFixed(0);
//  		         $("#tableData").show();
//  		         $('#butTable').datagrid('updateRow',{
//  	        		index: 1,	// 索引从0开始
//  	        		row: {
//  	        			dataDate : newDate,
//  	        			maxfhValue: maxValue==0?'-':(maxValue.toFixed(0)) + ' kW',
//  	        			minfhValue: minValue==0?'-':(minValue.toFixed(0)) + ' kW',
//  	        			avgfhValue: avgValue=='0.00'?'-':avgValue + ' kW'
//  	        		}
//  	        	});
  		         
  			}
  		});
  	}else if(fgdlQueryType == 'M'){
  		
  		date = $('#fhqxEDateM').val() + '-01';
  		
  	}
  	
  	var powerValueLast = new Array();
  	
  	// 原有时间
  	$.post(webContextRoot +'powerLoadAnalyze/queryConsFHQXPowerInfo.action',{
      	'consPowerInfoModel.consId': consId,
          'consPowerInfoModel.startDate':date,
          'consPowerInfoModel.endDate':date,
          'consPowerInfoModel.dataDate':newDate,
          'consPowerInfoModel.queryType': $('#dlzsQueryTypeByFh').combobox('getValue')
          
       },
       function(data){
      	 if(fgdlQueryType == 'D'){
      		 queryFhqxEchart(data.consMap,newDate,powerValueLastFh,consName + "负荷曲线");
          	 fhqxChart.hideLoading();
          	 //今天
          	 var fhArray = data.consMap.powerValue;
               var maxValue = data.consMap.maxValue;//最大值
               var minValue = data.consMap.minValue;//最小值
               var maxDate = data.consMap.maxDate;//最大发生时间
               var minDate = data.consMap.minDate;//最小发生时间
               var count = 0;//条数
               var sum = 0;//总数
               
               for(var i=0; i<fhArray.length; i++){
               	if(fhArray[i] != null){
               		sum = parseFloat(sum) + parseFloat(fhArray[i]=='-'?0:fhArray[i]);
               		count ++;
               	}
               }
               // 平均值 = 总数/96点
               var avgValue = (sum/count).toFixed(0);
               
               //昨天
               var fhArrayLast = data.consMap.powerValueLast;
               var maxValueLast = data.consMap.maxValueLast;//最大值
               var minValueLast = data.consMap.minValueLast;//最小值
               var maxDateLast = data.consMap.maxDateLast;//最大发生时间
               var minDateLast = data.consMap.minDateLast;//最小发生时间
               var countLast = 0;//条数
               var sumLast = 0;//总数
               for(var i=0; i<fhArrayLast.length; i++){
                	
                	if(fhArrayLast[i] != null){
                		sumLast = parseFloat(sumLast) + parseFloat(fhArrayLast[i]=='-'?0:fhArrayLast[i]);
                		countLast ++;
                	}
                }
               var avgValueLast = (sumLast/countLast).toFixed(0);
//               $("#tableData").show();
//               $('#butTable').datagrid('updateRow',{
//              		index: 0,	// 索引从0开始
//              		row: {
//              			dataDate : date,
//              			maxfhValue: maxValue==0?'-':(maxValue.toFixed(0)) + ' kW',
//              			minfhValue: minValue==0?'-':(minValue.toFixed(0)) + ' kW',
//              			avgfhValue : avgValue=='0.00'?'-':avgValue + ' kW'
//              		}
//              	});
      	 }else{
      		 
      		 queryFhChart(data.consMap,consName + "负荷曲线");		// 月数据
      		 fhqxChart.hideLoading();
      		 var list = data.consMap.consListInfo;
      		 
//      		 $("#tableData").hide();
      		 
//      		 $('#butTable').datagrid('deleteRow',1);
//      		 if(list.length > 0){
//      			 $('#butTable').datagrid('updateRow',{
//      	        		index: 0,	// 索引从0开始
//      	        		row: {
//      	        			dataDate : $('#fhqxEDateM').val(),
//      	        			maxfhValue: list[0].maxValue + ' kW',
//      	        			minfhValue: list[0].minValue + ' kW',
//      	        			avgfhValue: list[0].avgValue + ' kW'
//      	        		}
//      	        	});
//      			 $('#butTable').datagrid('updateRow',{
//   	        		index: 1,	// 索引从0开始
//   	        		row: {
//   	        			dataDate : $('#fhqxEDateM').val(),
//   	        			maxfhValue:' -kW',
//   	        			minfhValue:' -kW',
//   	        			avgfhValue:' -kW'
//   	        		}
//   	        	});
//      			
//      		 }else{
//      			 $('#butTable').datagrid('updateRow',{
//   	        		index: 0,	// 索引从0开始
//   	        		row: {
//   	        			dataDate : $('#fhqxEDateM').val(),
//   	        			maxfhValue:  ' -kW',
//   	        			minfhValue: ' -kW',
//   	        			avgfhValue: ' -kW'
//   	        		}
//   	        	});
//      		 }
      		 
      	 }
           
       },'json');
  	
  }

  /**
   * 按月份查询负荷 
   */
  function queryFhChart(dataMap,title){
  	option = {
  		    title: {
  		        text: title, 
  		        x:'center'
  		    },
  		    tooltip : {
  		        trigger: 'axis',
  		        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
  		            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
  		        }
  		    },
//  		    tooltip: {
//  		        trigger: 'axis',
//  	        	formatter : function(params, ticket, callback) {
//  	        		var res = '';
//  	        		if(params == null ||params[0] == null){
//  						return;
//  					}
//  					for(var i =0;i<params.length;i++){
//  						if(i==0){
//  			            	res += params[i].seriesName.split(' ')[0]+' ' + params[i].name + ' 负荷：'+ dataMap.powerValue[params[i].dataIndex]+'kW' + '<br/>';
//  						}
//  						if(i==1){
//  			            	res += params[i].seriesName.split(' ')[0]+' '+ params[i].name + ' 负荷：'+ powerValueLastFh[params[i].dataIndex] +'kW' + '<br/>';
//  						}
//  					}
//  					return res;
//  				}
//  		    },
  		    legend: {
  		        data: ['最大负荷', '最小负荷', '平均负荷'],
  		        x:'center',
  		        y:'35'
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
  		    //设置grid位置
  		    grid : {
  				 x : 80, //左边距离
  				 y : 75,//上边距离
  				 x2 : 35,//右边距离
  				 y2 : 25//下边距离
  			 },
  		    xAxis: {
  		        type: 'category',
  		        boundaryGap: false,
  		        data : dataMap.currentDate
  		    },
  		    yAxis: [{
  	            name: '单位(kW)',
  	            type: 'value',
  	           
  	        }], 
  		    series: [
  		        {
  		            name : '最大负荷',
  		            type : 'line',
  		            data : dataMap.maxValueList
  		        },
  		        {
  		            name : '最小负荷',
  		            type : 'line',
  		            data : dataMap.minValueList
  		        },
  		        {
  		            name : '平均负荷',
  		            type : 'line',
  		            data : dataMap.avgValueList
  		        }
  		    ]
  		};

  		fhqxChart.setOption(option,true);
  		fhqxChart.resize();
  }


  /**
   * 负荷曲线 图表
   */
  function queryFhqxEchart(dataMap,newDate,powerValueLastFh,title){//function(dataMap, aChartTop)
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
  						if(i==0){
  			            	res += params[i].seriesName.split(' ')[0]+' ' + params[i].name + ' 负荷：'+ dataMap.powerValue[params[i].dataIndex]+'kW' + '<br/>';
  						}
  						if(i==1){
  			            	res += params[i].seriesName.split(' ')[0]+' '+ params[i].name + ' 负荷：'+ powerValueLastFh[params[i].dataIndex] +'kW' + '<br/>';
  						}
  					}
  					return res;
  				}
  		    },
  		    legend: {
  		        data: [date + ' 实际负荷', newDate + ' 实际负荷'],
  		        x:'center',
  		        y:'35'
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
  		    //设置grid位置
  		    grid : {
  				 x : 80, //左边距离
  				 y : 75,//上边距离
  				 x2 : 35,//右边距离
  				 y2 : 35//下边距离
  			 },
  		    xAxis: {
  		        type: 'category',
  		        boundaryGap: false,
  		        data : dataMap.dataDate
  		    },
  		    yAxis: [{
  	            name: '单位(kW)',
  	            type: 'value',
  	           
  	        }], 
  		    series: [
  		        {
  		            name: date + ' 实际负荷',
  		            type:'line',
  		            data : dataMap.powerValue
  		        },
  		        {
  		            name: newDate + ' 实际负荷',
  		            type:'line',
  		            data : powerValueLastFh
  		        }
  		    ]
  		};

  		fhqxChart.setOption(option,true);
  		fhqxChart.resize();
  }

  /**
   * 时间负荷分布
   */
  function querySjfhfb(){
  	var node = $('#tt').tree('getSelected');//获取企业节点
  	sjfhfbChart.showLoading({
  		text:'正在努力的读取数据中...',
  		effect:'spin'
  	});
  	isFG = false;
  	$.post(webContextRoot +'powerLoadAnalyze/queryConsSJFHFBPowerInfo.action',{
  		'consPowerInfoModel.consId': consId,
  	    'consPowerInfoModel.startDate':$('#sjfhEDate').val(),
  	    'consPowerInfoModel.endDate':$('#sjfhEDate').val()
  	    
  	 },
  	 function(data){
  		 querySjfhfbEchart(data.consMap,consName + "时间负荷分布");
  		 sjfhfbChart.hideLoading();
  		 
  		 sjfhfxLoad(data.consMap);
  		 
  		 var maxArray = data.consMap.maxValue;
  		 var minArray = data.consMap.minValue;
  		 var dataDateArray = data.consMap.dataDate;
  		 var maxDateArray = data.consMap.maxDate;
      	 var minDateArray = data.consMap.minDate;
           var maxValue = 0;//最大值
           var minValue = 0;//最小值
           var maxDate = 0;//最大发生时间
           var minDate = 0;//最小发生时间
           var maxdataDate = 0;//日期
           var mindataDate = 0;//日期
           
           var count = 0;//条数
           var sum = 0;//总数
           var flag = false;
           
           for(var i=0; i<maxArray.length; i++){
           	if(maxArray[i] != null && flag == false){
           		maxValue = parseFloat(maxArray[i]);
           		minValue = parseFloat(minArray[i]);
           		maxDate = maxDateArray[i];
           		minDate = minDateArray[i];
           		maxdataDate = dataDateArray[i];
           		mindataDate = dataDateArray[i];
           		flag = true;
           	}
           	if(maxArray[i] != null && maxValue < parseFloat(maxArray[i])){
           		maxValue = parseFloat(maxArray[i]);
           		maxDate = maxDateArray[i];
           		maxdataDate = dataDateArray[i];
           	}
           	if(minArray[i] != null && minValue > parseFloat(minArray[i])){
           		minValue = parseFloat(minArray[i]);
           		minDate = minDateArray[i];
           		mindataDate = dataDateArray[i];
           	}
           	if(maxArray[i] != null){
           		sum = parseFloat(sum) + parseFloat(maxArray[i]);
           		count ++;
           	}
           }
           var avgValue = (sum/count).toFixed(0);
           
           var temp1 = ' 最大负荷 ';
  		 var temp2 = ' 最小负荷 ';
  		 var temp3 = ' 平均负荷 ';
  		 
  		 if(maxDate != null & maxdataDate != null && maxDate != 0 & maxdataDate != 0){
          	 maxDate = maxdataDate + " " + getDataInt(maxDate)
           }
           if(minDate != null & mindataDate != null && minDate != 0 & mindataDate != 0){
          	 minDate = mindataDate + " " + getDataInt(minDate)
           }
  		 
           $('#maxfhValue').text((maxDate=='0'?'-':maxDate) + temp1 + maxValue + ' kW');
           $('#minfhValue').text((minDate=='0'?'-':minDate) + temp2 + minValue + ' kW');
           $('#avgfhValue').text(temp3 + (avgValue=='NaN'?'0':avgValue) + ' kW');
           $('#maxfhValueLast').text((maxDate=='0'?'-':maxDate) + temp1 + maxValue + ' kW');
           $('#minfhValueLast').text((minDate=='0'?'-':minDate) + temp2 + minValue + ' kW');
           $('#avgfhValueLast').text(temp3 + (avgValue=='NaN'?'0':avgValue) + ' kW');
           
  	 },'json');
  	
  }

  /**
   * 时间负荷分布 图表
   */
  function querySjfhfbEchart(dataMap,title){//function(dataMap, aChartTop) 
  	var option = {
  			title : {
  				text : title, //图表标题
  				x:'center'
  			},
  			tooltip : {
  				trigger: 'axis', // tip 类型
  				formatter : function(params, ticket, callback) {
  					
  					var res = '';
  	        		if(params == null ||params[0] == null){
  						return;
  					}
  					for(var i =0;i<params.length;i++){
  						if(i==0 && params[i].name != ''){
  							res += params[i].seriesName + 
  			            		'<br/>时间：'+ params[i].name+' ' +getDataInt(params[i].value) +
  			            		'<br/>负荷：'+ dataMap.maxValue[params[0].dataIndex]+'kW';
  						}
  						if(i==1 && params[i].name != ''){
  							res += '<br/>'+ params[i].seriesName + 
  			            		'<br/>时间：'+ params[i].name+' ' +getDataInt(params[i].value) +
  			            		'<br/>负荷：'+ dataMap.minValue[params[i].dataIndex] +'kW';
  						}
  					}
  					return res;
  				}
  			},
  			
  			legend : {
  				/**数据*/data : ['最高负荷','最低负荷'],
  				x:'center',
  		        y:'35'
  			},
  			//设置grid位置
  		    grid : {
  				 x : 55, //左边距离
  				 y : 75,//上边距离
  				 x2 : 35,//右边距离
  				 y2 : 35//下边距离
  			 },
  			xAxis: [{
  	                 type: 'category',
  	                 splitLine :{  //分隔线，默认显示
  					     show:false
  					 },
  	                 /**数据*/
  					 data : dataMap.dataDate
  	            }],
  	        yAxis: [{
  	            name: '单位(小时)',
  	            type: 'value',
  	            min:0,
  	       		max:2400,
  	            splitNumber: 5, // 分割段数
  	            axisLabel : {
  	            	formatter: function(value){
  	            		return getDataInt1(value);
  	            	}
  	            }
  	        }],
  			series : [{
  						name : '最高负荷',
  						type : 'scatter',
  						symbol : 'circle',
  						symbolSize: function (value){
  							return 18;
  			            },
  			            data : dataMap.maxDate,
  			            itemStyle:{
  			            	normal:{
  			            	color:'#FADB94'
  			            	}
  			            }

  					},{
  						name : '最低负荷',
  						type : 'scatter',
  						symbol : 'circle',
  						symbolSize: function (value){
  							return 12;
  			            },
  			            /**数据*/
  			            data :  dataMap.minDate,
  			            itemStyle:{
  			            	normal:{
  			            	color:'#9ACFCD'
  			            	}
  			            }

  					}]
  		};
  	sjfhfbChart.setOption(option,true);
  	sjfhfbChart.resize();
  }
   
  
  /**
   * 超容分析 
   */
  function querySuper(){
  	getNineSixData();//查询echarts图
  	getCr();//查询超容内容
  }
  
//未选择大用户    根据日期查询所有
  function getNineSixData(){
  	isFG=false;
  	var startDate =  $('#startDate').val();//开始日期
  	var startDateWzx = startDate+"-01";// 开始时间
  	var getMonth = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('m',1,DateUtil.strToDate(startDate+"-01")));
  	var endDateWzx = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('d',-1,DateUtil.strToDate(getMonth)));// 结束时间
  	if(startDate> endDate){
  		$.messager.alert('提示', "开始日期不能大于结束日期！", 'warning');
  		return;
  	}
  	userChart.showLoading({
  		text:'正在努力的读取数据中...',
  		effect:'spin'
  	});
   	
   	//查询echarts图
   	  $.get(webContextRoot + 'powerLoadAnalyze/queryNineSix.action', {
   		//请求参数
   			'chargeAnlysisModel.beginData': startDateWzx,	// 开始时间
   			'chargeAnlysisModel.endData': endDateWzx,	 	// 结束时间
   			'chargeAnlysisModel.dateType': 2,			 	// 查询类型  2为查询日期格式  
   			'chargeAnlysisModel.consId': consId				// 当前选择的客户
   		  },
   		  function(json){
   			    getGdtjfxData(json);
   			    userChart.hideLoading();
   		  }
   	  );
   	
   } 
  //超容次数、 超容时长等等
   function getCr(){
  	var startDate = $('#sjfhEDate').val();//开始日期
   	var startDateWzx = startDate+"-01";// 开始时间
   	var getMonth = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('m',1,DateUtil.strToDate(startDate+"-01")));
   	var endDateWzx = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('d',-1,DateUtil.strToDate(getMonth)));// 结束时间
   	if(startDate> endDate){
   		$.messager.alert('提示', "开始日期不能大于结束日期！", 'warning');
   		return;
   	}
   	//查询设置时间
   	  $.getJSON(webContextRoot + 'powerLoadAnalyze/queryPowerPlan.action', {
   		//请求参数
   			'chargeAnlysisModel.beginData': startDateWzx,//开始时间
   			'chargeAnlysisModel.endData': endDateWzx,//结束时间
   			'chargeAnlysisModel.consId': consId//当前选择的客户
   		  },
   		  function(json){
   			  var consNoObj = document.getElementById('avgCr');
   			  consNoObj.innerHTML = json.sMap.outPawer;//超容次数
   			  var consNameObj = document.getElementById('maxFZL');
   			  consNameObj.innerHTML = json.sMap.outPawerTime;//超容总时长
   			  var contractCapObj = document.getElementById('minFZL');
   			  contractCapObj.innerHTML = json.sMap.outPawerAvgTime;//平均总时长
   			  var elecAddrObj = document.getElementById('avgFZL');
   			  elecAddrObj.innerHTML = json.sMap.outPawerMaxTime;//超容最大时长
   			  var elecAddrObj = document.getElementById('mindate');
   			  elecAddrObj.innerHTML = json.sMap.outPawerMaxBeginTime.substr(5,16);//超容最大时长发生时间
   		  }
   	  );
   }
  
   /**
    * 查询企业
    */
   function queryCorporation(){
     var node = $('#tt').tree('getSelected');
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
         var consNameName = "客户名称: "
         var consNameStr = json[0].consName;
         consNameObj.innerHTML = consNameName+consNameStr;
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
     
     	// 加载哪个chart
	    if(chartType == 'dlzs'){
	 		//查询电量走势
	 		queryDlzs();
	 	}else if(chartType == 'fgdl'){
	 		//查询峰谷电量
	 		queryFgdl();
	 	}else if(chartType == 'fhqx'){
	 		//查询负荷曲线
	 		queryFhqx();
	 	}else if(chartType == 'sjfh'){
	 		//查询时间负荷分布
	 		querySjfhfb();
	 	}else if(chartType == 'super'){
	 		getNineSixData();//查询echarts图
	   	    getCr();//查询超容内容
	 	}
     
   }
  
  // 初始化时间 以及左右箭头修改时间
  function initDate(){
     //电量走势下拉框选择天、月、年
     $('#dlzsQueryType').combobox({
        onSelect: function(param){
          if(param.value == 'D'){
            $('#dlzsEDateD').val(DateUtil.dateToStr('yyyy-MM-dd',endDate));
            $('#dlzsEDateD').show();
            $('#dlzsEDateM').hide();
            $('#dlzsEDateY').hide();
            date = $('#dlzsEDateD').val();
            dateLast = new Date(date);
            dateLast = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('d',-1,dateLast));
            
            // 选择天数据 隐藏月数据 年数据
            $('#dlzsEDateDUp').val(dateLast);
            $('#dlzsEDateDUp').show();
            $('#dlzsEDateMUp').hide();
            $('#dlzsEDateYUp').hide();
          }else if(param.value == 'M'){
            $('#dlzsEDateM').val(DateUtil.dateToStr('yyyy-MM',endDate));
            $('#dlzsEDateD').hide();
            $('#dlzsEDateM').show();
            $('#dlzsEDateY').hide();
            date = $('#dlzsEDateM').val();
            dateLast = new Date(date);
            dateLast = DateUtil.dateToStr('yyyy-MM',DateUtil.dateAdd('m',-1,dateLast));
            
            // 选择月数据 隐藏天数据 年数据
            $('#dlzsEDateMUp').val(dateLast);
            $('#dlzsEDateMUp').show();
            $('#dlzsEDateYUp').hide();
            $('#dlzsEDateDUp').hide();
          }else if(param.value == 'Y'){
            $('#dlzsEDateY').val(DateUtil.dateToStr('yyyy',endDate));
            $('#dlzsEDateD').hide();
            $('#dlzsEDateM').hide();
            $('#dlzsEDateY').show();
            date = $('#dlzsEDateY').val();
            dateLast = new Date(date);
            dateLast = DateUtil.dateToStr('yyyy',DateUtil.dateAdd('y',-1,dateLast));
            
            // 选择年数据 隐藏天数据 月数据
            $('#dlzsEDateYUp').val(dateLast);
            $('#dlzsEDateYUp').show();
            $('#dlzsEDateMUp').hide();
            $('#dlzsEDateDUp').hide();
          }
        }
      });
     
     //峰谷电量下拉框选择天、月、年
     $('#fgdlQueryType').combobox({
        onSelect: function(param){
          if(param.value == 'D'){
            $('#fgdlEDateD').val(DateUtil.dateToStr('yyyy-MM-dd',endDate));
            $('#fgdlEDateD').show();
            $('#fgdlEDateM').hide();
            $('#fgdlEDateY').hide();
            
          }else if(param.value == 'M'){
            $('#fgdlEDateM').val(DateUtil.dateToStr('yyyy-MM',endDate));
            $('#fgdlEDateD').hide();
            $('#fgdlEDateM').show();
            $('#fgdlEDateY').hide();
            
          }else if(param.value == 'Y'){
            $('#fgdlEDateY').val(DateUtil.dateToStr('yyyy',endDate));
            $('#fgdlEDateD').hide();
            $('#fgdlEDateM').hide();
            $('#fgdlEDateY').show();
            
          }
        }
      });
     
     //峰谷电量下拉框选择天、月、年
     $('#dlzsQueryTypeByFh').combobox({
        onSelect: function(param){
          if(param.value == 'D'){
            $("#oneTime").show();
            $("#twoTime").show();
            $("#twoUpDate").show();
            $("#twoMonth").show();
            $("#twoDownDate").show();
            
            $('#fhqxEDate').val(DateUtil.dateToStr('yyyy-MM-dd',endDate));
            $('#fhqxEDate').show();
            $('#fhqxEDateUp').show();
            $('#fhqxEDateM').hide();
            date = $('#fhqxEDate').val();
            dateLast = new Date(date);
            dateLast = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('d',-1,dateLast));
            var yesterDay = addDate(date,-1);
            $('#fhqxEDateUp').val(yesterDay);
            
          }else if(param.value == 'M'){
            
            $("#oneTime").hide();
            $("#twoTime").hide();
            $("#twoUpDate").hide();
            $("#twoMonth").hide();
            $("#twoDownDate").hide();
            $('#fhqxEDateM').show();
            $('#fhqxEDateM').val(DateUtil.dateToStr('yyyy-MM',endDate));
            $('#fhqxEDate').hide();
            $('#fhqxEDateUp').hide();
            date = $('#fhqxEDateM').val();
            dateLast = new Date(date);
            dateLast = DateUtil.dateToStr('yyyy-MM',DateUtil.dateAdd('m',-1,dateLast));
          }
        }
      });
     
     //时间负荷日期
     $('#sjfhEDate').val(DateUtil.dateToStr('yyyy-MM',endDate));
     //超容分析日期
     $('#startDate').val(DateUtil.dateToStr('yyyy-MM',endDate));
     
    //左减日期电量走势
    $('#leftdlzs').click(function(){
      var dlzsQueryType = $('#dlzsQueryType').combobox('getValue');
      if(dlzsQueryType == 'D'){
        var startDate =  $('#dlzsEDateD').val();//开始日期
        var nowDate = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('d',-1,DateUtil.strToDate(startDate)));
        $('#dlzsEDateD').val(nowDate);
      }else if(dlzsQueryType == 'M'){
        var startDate =  $('#dlzsEDateM').val();//开始日期
        var nowDate = DateUtil.dateToStr('yyyy-MM',DateUtil.dateAdd('m',-1,DateUtil.strToDate(startDate)));
        $('#dlzsEDateM').val(nowDate.substr(0,7));
      }else if(dlzsQueryType == 'Y'){
        var startDate =  $('#dlzsEDateY').val();//开始日期
        startDate1 = new Date(startDate);
        var nowDate = DateUtil.dateToStr('yyyy',DateUtil.dateAdd('y',-1,startDate1));
        $('#dlzsEDateY').val(nowDate.substr(0,4));
      }
      queryDlzs();
    });
    
    //右加日期电量走势
    $('#rightdlzs').click(function(){
      var dlzsQueryType = $('#dlzsQueryType').combobox('getValue');
      if(dlzsQueryType == 'D'){
        var startDate =  $('#dlzsEDateD').val();//开始日期
        var nowDate = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('d',1,DateUtil.strToDate(startDate)));
        $('#dlzsEDateD').val(nowDate);
      }else if(dlzsQueryType == 'M'){
        var startDate =  $('#dlzsEDateM').val();//开始日期
        var nowDate = DateUtil.dateToStr('yyyy-MM',DateUtil.dateAdd('m',1,DateUtil.strToDate(startDate)));
        $('#dlzsEDateM').val(nowDate);
      }else if(dlzsQueryType == 'Y'){
        var startDate =  $('#dlzsEDateY').val();//开始日期
        startDate1 = new Date(startDate);
        var nowDate = DateUtil.dateToStr('yyyy',DateUtil.dateAdd('y',1,startDate1));
        $('#dlzsEDateY').val(nowDate);
      }
      queryDlzs();
    });
    
    
    // 第二时间左减电量走势
    $('#leftdlzsUp').click(function(){
      var dlzsQueryType = $('#dlzsQueryType').combobox('getValue');
      if(dlzsQueryType == 'D'){
        var startDate =  $('#dlzsEDateDUp').val();//开始日期
        var nowDate = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('d',-1,DateUtil.strToDate(startDate)));
        $('#dlzsEDateDUp').val(nowDate);
      }else if(dlzsQueryType == 'M'){
        var startDate =  $('#dlzsEDateMUp').val();//开始日期
        var nowDate = DateUtil.dateToStr('yyyy-MM',DateUtil.dateAdd('m',-1,DateUtil.strToDate(startDate)));
        $('#dlzsEDateMUp').val(nowDate.substr(0,7));
      }else if(dlzsQueryType == 'Y'){
        var startDate =  $('#dlzsEDateYUp').val();//开始日期
        startDate1 = new Date(startDate);
        var nowDate = DateUtil.dateToStr('yyyy',DateUtil.dateAdd('y',-1,startDate1));
        $('#dlzsEDateYUp').val(nowDate.substr(0,4));
      }
      queryDlzs();
    });
    
    // 第二时间右加电量走势
    $('#rightdlzsUp').click(function(){
      var dlzsQueryType = $('#dlzsQueryType').combobox('getValue');
      if(dlzsQueryType == 'D'){
        var startDate =  $('#dlzsEDateDUp').val();//开始日期
        var nowDate = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('d',1,DateUtil.strToDate(startDate)));
        $('#dlzsEDateDUp').val(nowDate);
      }else if(dlzsQueryType == 'M'){
        var startDate =  $('#dlzsEDateMUp').val();//开始日期
        var nowDate = DateUtil.dateToStr('yyyy-MM',DateUtil.dateAdd('m',1,DateUtil.strToDate(startDate)));
        $('#dlzsEDateMUp').val(nowDate);
      }else if(dlzsQueryType == 'Y'){
        var startDate =  $('#dlzsEDateYUp').val();//开始日期
        startDate1 = new Date(startDate);
        var nowDate = DateUtil.dateToStr('yyyy',DateUtil.dateAdd('y',1,startDate1));
        $('#dlzsEDateYUp').val(nowDate);
      }
      queryDlzs();
    });
    
    
    //左减日期 峰谷电量
    $('#leftfgdl').click(function(){
      var fgdlQueryType = $('#fgdlQueryType').combobox('getValue');
      if(fgdlQueryType == 'D'){
        var startDate =  $('#fgdlEDateD').val();//开始日期
        var nowDate = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('d',-1,DateUtil.strToDate(startDate)));
        $('#fgdlEDateD').val(nowDate);
      }else if(fgdlQueryType == 'M'){
        var startDate =  $('#fgdlEDateM').val();//开始日期
        var nowDate = DateUtil.dateToStr('yyyy-MM',DateUtil.dateAdd('m',-1,DateUtil.strToDate(startDate)));
        $('#fgdlEDateM').val(nowDate.substr(0,7));
      }else if(fgdlQueryType == 'Y'){
        var startDate =  $('#fgdlEDateY').val();//开始日期
        startDate1 = new Date(startDate);
        var nowDate = DateUtil.dateToStr('yyyy',DateUtil.dateAdd('y',-1,startDate1));
        $('#fgdlEDateY').val(nowDate.substr(0,4));
      }
      queryFgdl();
    });
    
    //右加日期 峰谷电量
    $('#rightfgdl').click(function(){
      var fgdlQueryType = $('#fgdlQueryType').combobox('getValue');
      if(fgdlQueryType == 'D'){
        var startDate =  $('#fgdlEDateD').val();//开始日期
        var nowDate = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('d',1,DateUtil.strToDate(startDate)));
        $('#fgdlEDateD').val(nowDate);
      }else if(fgdlQueryType == 'M'){
        var startDate =  $('#fgdlEDateM').val();//开始日期
        var nowDate = DateUtil.dateToStr('yyyy-MM',DateUtil.dateAdd('m',1,DateUtil.strToDate(startDate)));
        $('#fgdlEDateM').val(nowDate.substr(0,7));
      }else if(fgdlQueryType == 'Y'){
        var startDate =  $('#fgdlEDateY').val();//开始日期
        startDate1 = new Date(startDate);
        var nowDate = DateUtil.dateToStr('yyyy',DateUtil.dateAdd('y',1,startDate1));
        $('#fgdlEDateY').val(nowDate.substr(0,4));
      }
      queryFgdl();
    });
     
//    左减日期 负荷曲线 第二时间选择
    $('#leftfhqxUp').click(function(){
      var startDate =  $('#fhqxEDateUp').val();//开始日期
      var nowDate = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('d',-1,DateUtil.strToDate(startDate)));
      $('#fhqxEDateUp').val(nowDate);
      queryFhqx();
    });
    
    //右加日期 负荷曲线 第二时间选择
    $('#rightfhqxUp').click(function(){
      var startDate =  $('#fhqxEDateUp').val();//开始日期
      var nowDate = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('d',1,DateUtil.strToDate(startDate)));
      $('#fhqxEDateUp').val(nowDate);
      queryFhqx();
    });
    
    //左减日期电量走势
    $('#leftfhqx').click(function(){
      var dlzsQueryType = $('#dlzsQueryTypeByFh').combobox('getValue');
      if(dlzsQueryType == 'D'){
        var startDate =  $('#fhqxEDate').val();//开始日期
        var nowDate = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('d',-1,DateUtil.strToDate(startDate)));
        $('#fhqxEDate').val(nowDate);
      }else if(dlzsQueryType == 'M'){
        var startDate =  $('#fhqxEDateM').val();//开始日期
        var nowDate = DateUtil.dateToStr('yyyy-MM',DateUtil.dateAdd('m',-1,DateUtil.strToDate(startDate)));
        $('#fhqxEDateM').val(nowDate.substr(0,7));
      }
      queryFhqx();
    });
    
    //右加日期电量走势
    $('#rightfhqx').click(function(){
      var dlzsQueryType = $('#dlzsQueryTypeByFh').combobox('getValue');
      if(dlzsQueryType == 'D'){
        var startDate =  $('#fhqxEDate').val();//开始日期
        var nowDate = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('d',1,DateUtil.strToDate(startDate)));
        $('#fhqxEDate').val(nowDate);
      }else if(dlzsQueryType == 'M'){
        var startDate =  $('#fhqxEDateM').val();//开始日期
        var nowDate = DateUtil.dateToStr('yyyy-MM',DateUtil.dateAdd('m',1,DateUtil.strToDate(startDate)));
        $('#fhqxEDateM').val(nowDate);
      }
      queryFhqx();
    });
    
    //左减日期 时间负荷分布
    $('#leftsjfhS2').click(function(){
      var startDate =  $('#sjfhEDate').val();//开始日期
      var nowDate = DateUtil.dateToStr('yyyy-MM',DateUtil.dateAdd('m',-1,DateUtil.strToDate(startDate)));
      $('#sjfhEDate').val(nowDate);
      querySjfhfb();
    });
    
    //右加日期 时间负荷分布
    $('#rightsjfhE2').click(function(){
      var startDate =  $('#sjfhEDate').val();//开始日期
      var nowDate = DateUtil.dateToStr('yyyy-MM',DateUtil.dateAdd('m',1,DateUtil.strToDate(startDate)));
      $('#sjfhEDate').val(nowDate);
      querySjfhfb();
    });
    
    //左减日期 超容分析
    $('#leftsjfhS3').click(function(){
      var startDate =  $('#startDate').val();//开始日期
      var nowDate = DateUtil.dateToStr('yyyy-MM',DateUtil.dateAdd('m',-1,DateUtil.strToDate(startDate)));
      $('#startDate').val(nowDate);
      querySuper();  // 超容分析
    });
    
    //右加日期 超容分析
    $('#rightsjfhE3').click(function(){
      var startDate =  $('#startDate').val();//开始日期
      var nowDate = DateUtil.dateToStr('yyyy-MM',DateUtil.dateAdd('m',1,DateUtil.strToDate(startDate)));
      $('#startDate').val(nowDate);
      querySuper();  // 超容分析
    });
     
  }
  
//echartsK线图
  function getGdtjfxData(dataMap){
  	var axis = [];//x轴
  	var yxis = [];//y轴
  	var klist = dataMap.sMap.kLineData;
  	if(klist&&klist.length>0){
  		for(var i=0;i<klist.length;i++){
  			var temp = [];
  			axis.push(klist[i][0].split(",")[0]);
  			temp.push(klist[i][0].split(",")[1]=='-'?'-':parseFloat(klist[i][0].split(",")[1]));
  			temp.push(klist[i][0].split(",")[2]=='-'?'-':parseFloat(klist[i][0].split(",")[2]));
  			temp.push(klist[i][0].split(",")[3]=='-'?'-':parseFloat(klist[i][0].split(",")[3]));
  			temp.push(klist[i][0].split(",")[4]=='-'?'-':parseFloat(klist[i][0].split(",")[4]));
  			yxis.push(temp);
  		}
  	}else{
  		axis = ['0'];
  		yxis = [['','','','']];
  	}
  	 
  	option = {
  		    title: {
  		        text: consName+'超容分析',
  		        left: 'center'
  		    },
  		    tooltip : {
  		        trigger: 'axis', // tip 类型
  		        formatter: function (params) {
  		        	if(params!=null && params[0]!=null){
  			        	var res = params[0].name;
  			            res += '<br/>最大值 : ' + params[0].value[1]+' kW';
  			            res += '<br/>最大发生时间 : ' + dataMap.sMap.maxDate[params[0].dataIndex];
  			            res += '<br/>最小值 : ' + params[0].value[2] + 'kW';
  			            res += '<br/>最小发生时间 : ' + dataMap.sMap.minDate[params[0].dataIndex];
  			            res += '<br/>点击查看日超容分析曲线' ;
  		        	}
  		            return res;
  		        }
  		    },
  		    toolbox: { // 展示右上角工具
                  color: '#0375cd',
                  show: true,  //true展示小工具
                  effectiveColor: '#000',
                  feature: {
                      mark: { show: true } //辅助小工具
//                      restore: { show: true } // 还原工具
                  }
              },
              grid: {
  		        x: 75,
  	           	x2: 70,
  	            y: 68,
  	            y2: 30
              },
  		    legend: {
  		        /**数据*/data:['负荷走势']
  		    },
  		    xAxis : [
  		        {
  		            type : 'category',
  		            splitLine :{  //分隔线，默认显示
  			         	show:false
  			        },
  		            /**数据*/data : axis
  		        }
  		    ],
  		    yAxis : [
  		        {
  		            type : 'value',
  		            axisLabel : {
  						formatter : '{value}'
  					},
  		            name : '单位(kW)',
  	                splitNumber: 3 ,
  	                splitLine: {
  	                    lineStyle: {
  	                        color: '#dfdfdf',
  	                        width: 0,
  	                        type: 'dashed'
  	                    }
  	                },
  		        }
  		    ],
  		    series : [
  		        {
  		            name:'电量曲线',
  		            type:'k',
  		            barMaxWidth: 20,
  		            
  		            itemStyle: {
  		                normal: {
  		                    color: '#37A09D',           // 阳线填充颜色
  		                    lineStyle: {
  		                        width: 2,
  		                        color: '#37A09D'    // 阳线边框颜色
  		                    },
  		                    borderColor :'#37A09D'
  		                },emphasis:{
  		                	color:'#37A09D',//阳线填充颜色
  		                	borderColor :'#37A09D'
  		                }
  		            },
  		            data:yxis //[[1,3,1,3],[12,15,12,15]]
  		        },
  		        {
  		            name:'基准值',
  		            type:'line',
  		            data:[dataMap.sMap.plate],
  		            itemStyle:{
  		                normal:{opacity:0,color:'red'}
  		            },
  		            markLine: {
  		                symbolSize:[0,0],
  		                lineStyle:{
  		                    normal:{type:'solid',opacity:0.4},
  		                    emphasis:{width:1}
  		                },
  		                data: [
  		                    {
  						        // 支持 'average', 'min', 'max'
  						        type: 'average'
//  						        label:{normal:{formatter:'{c}kVA'},emphasis:{formatter:'{c}kVA'}}
  						   }
  		                ]
  		            }
  		        }
  		    ]
  	};
  	userChart.setOption(option,true);
  	
  }
  
  /**
   * 五项分析项
   */
  function showFenXi(time,dataList){
  	for(var i=0;i<dataList.length;i++){
  		if(time==dataList[i].dataDate){
  			if(dataList[i].maxPower!=null&&dataList[i].minPower!=null){
  				$('#maxFZL').text((parseFloat(dataList[i].maxPower)*100).toFixed(2)+'%');
  				$('#maxdate').text(dataList[i].maxPowerTime.slice(0,dataList[i].maxPowerTime.indexOf('.')));
  				$('#minFZL').text((parseFloat(dataList[i].minPower)*100).toFixed(2)+'%');
  				$('#mindate').text(dataList[i].minPowerTime.slice(0,dataList[i].minPowerTime.indexOf('.')));
  				$('#avgFZL').text((parseFloat(dataList[i].avgPower)*100).toFixed(2)+'%');
  			}else{
  				$('#maxFZL').text('-');
  				$('#maxdate').text('-');
  				$('#minFZL').text('-');
  				$('#mindate').text('-');
  				$('#avgFZL').text('-');
  			}
  		}
  	}
  }

  /**
  *	数字转换小时格式
  */
  function getDataInt(value){
  	return (value+'').substring(0,2) +':'+ (value+'').substring(2,4);
  }
  /**
  *	数字转换小时格式
  */
  function getDataInt1(value){
  	if((value) >= 2400){
  		return '24:00';
  	}else if(value >=1000){
  		return (value+'').substring(0,2) +':'+ (value+'').substring(2,4);
  	}else if(value > 100){
  		return (value+'').substring(0,1) +':'+ (value+'').substring(1,3);
  	}else if(value > 10){
  		return '0:' + value;
  	}else{
  		return '0:00';
  	}
  }
  
  /**
   * 查询时间负荷
   * @param dataMap
   */
  function sjfhfxLoad(dataMap){
  	var zjCount = 0;
  	var zjdCount = 0;
  	var qj0_1 = {
  			name : '00:00-01:00',
  			count : 0
  	};
  	var qj1_2 = {
  			name : '01:00-02:00',
  			count : 0
  	};
  	var qj2_3 = {
  			name : '02:00-03:00',
  			count : 0
  	};
  	var qj3_4 = {
  			name : '03:00-04:00',
  			count : 0
  	};
  	var qj4_5 = {
  			name : '04:00-05:00',
  			count : 0
  	};
  	var qj5_6 = {
  			name : '05:00-06:00',
  			count : 0
  	};
  	var qj6_7 = {
  			name : '06:00-07:00',
  			count : 0
  	};
  	var qj7_8 = {
  			name : '07:00-08:00',
  			count : 0
  	};
  	var qj8_9 = {
  			name : '08:00-09:00',
  			count : 0
  	};
  	var qj9_10 = {
  			name : '09:00-10:00',
  			count : 0
  	};
  	var qj10_11 = {
  			name : '10:00-11:00',
  			count : 0
  	};
  	var qj11_12 = {
  			name : '11:00-12:00',
  			count : 0
  	};
  	var qj12_13 = {
  			name : '12:00-13:00',
  			count : 0
  	};
  	var qj13_14 = {
  			name : '13:00-14:00',
  			count : 0
  	};
  	var qj14_15 = {
  			name : '14:00-15:00',
  			count : 0
  	};
  	var qj15_16 = {
  			name : '15:00-16:00',
  			count : 0
  	};
  	var qj16_17 = {
  			name : '16:00-17:00',
  			count : 0
  	};
  	var qj17_18 = {
  			name : '17:00-18:00',
  			count : 0
  	};
  	var qj18_19 = {
  			name : '18:00-19:00',
  			count : 0
  	};
  	var qj19_20 = {
  			name : '19:00-20:00',
  			count : 0
  	};
  	var qj20_21 = {
  			name : '20:00-21:00',
  			count : 0
  	};
  	var qj21_22 = {
  			name : '21:00-22:00',
  			count : 0
  	};
  	var qj22_23 = {
  			name : '22:00-23:00',
  			count : 0
  	};
  	var qj23_00 = {
  			name : '23:00-00:00',
  			count : 0
  	};
  	
  	var qj_d0_1 = {
  			name : '00:00-01:00',
  			count : 0
  	};
  	var qj_d1_2 = {
  			name : '01:00-02:00',
  			count : 0
  	};
  	var qj_d2_3 = {
  			name : '02:00-03:00',
  			count : 0
  	};
  	var qj_d3_4 = {
  			name : '03:00-04:00',
  			count : 0
  	};
  	var qj_d4_5 = {
  			name : '04:00-05:00',
  			count : 0
  	};
  	var qj_d5_6 = {
  			name : '05:00-06:00',
  			count : 0
  	};
  	var qj_d6_7 = {
  			name : '06:00-07:00',
  			count : 0
  	};
  	var qj_d7_8 = {
  			name : '07:00-08:00',
  			count : 0
  	};
  	var qj_d8_9 = {
  			name : '08:00-09:00',
  			count : 0
  	};
  	var qj_d9_10 = {
  			name : '09:00-10:00',
  			count : 0
  	};
  	var qj_d10_11 = {
  			name : '10:00-11:00',
  			count : 0
  	};
  	var qj_d11_12 = {
  			name : '11:00-12:00',
  			count : 0
  	};
  	var qj_d12_13 = {
  			name : '12:00-13:00',
  			count : 0
  	};
  	var qj_d13_14 = {
  			name : '13:00-14:00',
  			count : 0
  	};
  	var qj_d14_15 = {
  			name : '14:00-15:00',
  			count : 0
  	};
  	var qj_d15_16 = {
  			name : '15:00-16:00',
  			count : 0
  	};
  	var qj_d16_17 = {
  			name : '16:00-17:00',
  			count : 0
  	};
  	var qj_d17_18 = {
  			name : '17:00-18:00',
  			count : 0
  	};
  	var qj_d18_19 = {
  			name : '18:00-19:00',
  			count : 0
  	};
  	var qj_d19_20 = {
  			name : '19:00-20:00',
  			count : 0
  	};
  	var qj_d20_21 = {
  			name : '20:00-21:00',
  			count : 0
  	};
  	var qj_d21_22 = {
  			name : '21:00-22:00',
  			count : 0
  	};
  	var qj_d22_23 = {
  			name : '22:00-23:00',
  			count : 0
  	};
  	var qj_d23_00 = {
  			name : '23:00-00:00',
  			count : 0
  	};
  	
  	for(var i=0;i<dataMap.dataMax.length;i++){
  		if(dataMap.dataMax[i][1] != null){
  			var a = dataMap.dataMax[i][1].split(' ')[1];
  			if('00:00' <= a && a < '01:00'){
  				qj0_1.count++;
  			}else if('01:00' <= a && a < '02:00'){
  				qj1_2.count++;
  			}else if('02:00' <= a && a < '03:00'){
  				qj2_3.count++;
  			}else if('03:00' <= a && a < '04:00'){
  				qj3_4.count++;
  			}else if('04:00' <= a && a < '05:00'){
  				qj4_5.count++;
  			}else if('05:00' <= a && a < '06:00'){
  				qj5_6.count++;
  			}else if('06:00' <= a && a < '07:00'){
  				qj5_6.count++;
  			}else if('07:00' <= a && a < '08:00'){
  				qj7_8.count++;
  			}else if('08:00' <= a && a < '09:00'){
  				qj8_9.count++;
  			}else if('09:00' <= a && a < '10:00'){
  				qj9_10.count++;
  			}else if('10:00' <= a && a < '11:00'){
  				qj10_11.count++;
  			}else if('11:00' <= a && a < '12:00'){
  				qj11_12.count++;
  			}else if('12:00' <= a && a < '13:00'){
  				qj12_13.count++;
  			}else if('13:00' <= a && a < '14:00'){
  				qj13_14.count++;
  			}else if('14:00' <= a && a < '15:00'){
  				qj14_15.count++;
  			}else if('15:00' <= a && a < '16:00'){
  				qj15_16.count++;
  			}else if('16:00' <= a && a < '17:00'){
  				qj16_17.count++;
  			}else if('17:00' <= a && a < '18:00'){
  				qj17_18.count++;
  			}else if('18:00' <= a && a < '19:00'){
  				qj18_19.count++;
  			}else if('19:00' <= a && a < '20:00'){
  				qj19_20.count++;
  			}else if('20:00' <= a && a < '21:00'){
  				qj20_21.count++;
  			}else if('21:00' <= a && a < '22:00'){
  				qj21_22.count++;
  			}else if('22:00' <= a && a < '23:00'){
  				qj22_23.count++;
  			}else if('23:00' <= a && a < '23:59'){
  				qj23_00.count++;
  			}
  			zjCount ++;
  		}
  	}
  	
  	for(var i=0;i<dataMap.dataMin.length;i++){
  		if(dataMap.dataMin[i][1] != null){
  			var a = dataMap.dataMin[i][1].split(' ')[1];
  			if('00:00' <= a && a < '01:00'){
  				qj_d0_1.count++;
  			}else if('01:00' <= a && a < '02:00'){
  				qj_d1_2.count++;
  			}else if('02:00' <= a && a < '03:00'){
  				qj_d2_3.count++;
  			}else if('03:00' <= a && a < '04:00'){
  				qj_d3_4.count++;
  			}else if('04:00' <= a && a < '05:00'){
  				qj_d4_5.count++;
  			}else if('05:00' <= a && a < '06:00'){
  				qj_d5_6.count++;
  			}else if('06:00' <= a && a < '07:00'){
  				qj_d5_6.count++;
  			}else if('07:00' <= a && a < '08:00'){
  				qj_d7_8.count++;
  			}else if('08:00' <= a && a < '09:00'){
  				qj_d8_9.count++;
  			}else if('09:00' <= a && a < '10:00'){
  				qj_d9_10.count++;
  			}else if('10:00' <= a && a < '11:00'){
  				qj_d10_11.count++;
  			}else if('11:00' <= a && a < '12:00'){
  				qj_d11_12.count++;
  			}else if('12:00' <= a && a < '13:00'){
  				qj_d12_13.count++;
  			}else if('13:00' <= a && a < '14:00'){
  				qj_d13_14.count++;
  			}else if('14:00' <= a && a < '15:00'){
  				qj_d14_15.count++;
  			}else if('15:00' <= a && a < '16:00'){
  				qj_d15_16.count++;
  			}else if('16:00' <= a && a < '17:00'){
  				qj_d16_17.count++;
  			}else if('17:00' <= a && a < '18:00'){
  				qj_d17_18.count++;
  			}else if('18:00' <= a && a < '19:00'){
  				qj_d18_19.count++;
  			}else if('19:00' <= a && a < '20:00'){
  				qj_d19_20.count++;
  			}else if('20:00' <= a && a < '21:00'){
  				qj_d20_21.count++;
  			}else if('21:00' <= a && a < '22:00'){
  				qj_d21_22.count++;
  			}else if('22:00' <= a && a < '23:00'){
  				qj_d22_23.count++;
  			}else if('23:00' <= a && a < '23:59'){
  				qj_d23_00.count++;
  			}
  			zjdCount ++;
  		}
  	}
  	
  	var str = $('#sjfhEDate').val() ;
  	if(zjCount == 0 && zjdCount == 0){
  		str = str + '没有负荷数据。'
  	}else{
  		var temp = new Array();
  		temp.push(qj0_1);
  		temp.push(qj1_2);
  		temp.push(qj2_3);
  		temp.push(qj3_4);
  		temp.push(qj4_5);
  		temp.push(qj5_6);
  		temp.push(qj6_7);
  		temp.push(qj7_8);
  		temp.push(qj8_9);
  		temp.push(qj9_10);
  		temp.push(qj10_11);
  		temp.push(qj11_12);
  		temp.push(qj12_13);
  		temp.push(qj13_14);
  		temp.push(qj14_15);
  		temp.push(qj15_16);
  		temp.push(qj16_17);
  		temp.push(qj17_18);
  		temp.push(qj18_19);
  		temp.push(qj19_20);
  		temp.push(qj20_21);
  		temp.push(qj21_22);
  		temp.push(qj22_23);
  		temp.push(qj23_00);
  		
  		var temp1 = new Array();
  		temp1.push(qj_d0_1);
  		temp1.push(qj_d1_2);
  		temp1.push(qj_d2_3);
  		temp1.push(qj_d3_4);
  		temp1.push(qj_d4_5);
  		temp1.push(qj_d5_6);
  		temp1.push(qj_d6_7);
  		temp1.push(qj_d7_8);
  		temp1.push(qj_d8_9);
  		temp1.push(qj_d9_10);
  		temp1.push(qj_d10_11);
  		temp1.push(qj_d11_12);
  		temp1.push(qj_d12_13);
  		temp1.push(qj_d13_14);
  		temp1.push(qj_d14_15);
  		temp1.push(qj_d15_16);
  		temp1.push(qj_d16_17);
  		temp1.push(qj_d17_18);
  		temp1.push(qj_d18_19);
  		temp1.push(qj_d19_20);
  		temp1.push(qj_d20_21);
  		temp1.push(qj_d21_22);
  		temp1.push(qj_d22_23);
  		temp1.push(qj_d23_00);
  		
  		var a = 0;
  		var b ='';
  		var c = 0;
  		var d = '';
  		for(var i =0;i<temp.length;i++){
  			if(a<temp[i].count){
  				a = temp[i].count;
  				b = temp[i].name;
  			}
  		}
  		for(var i =0;i<temp1.length;i++){
  			if(c<temp1[i].count){
  				c = temp1[i].count;
  				d = temp1[i].name;
  			}
  		}
  		
  		var numa = (a/zjCount)*100;
  		var numb = (c/zjdCount)*100;
  		//最高负荷 
  		str = str + '期间，'+ numa.toFixed(2) + '%的每日最高负荷发生在'+ b + '之间，'+numb.toFixed(2) + '%的每日最低负荷发生在 '+d+'之间。'; 
  	}
  	$('#sjfhfx').text(str);
  	
  }
  
  /**
   *  date是要进行加减的日期  格式是YYYY-MM-DD,days是要加减的天数,
   *  如果往前算就传入负数,如果往后算就传入正数
   */
  function addDate(date,days){
    var now = new Date(date);      // 格式化日期
    now.setDate(now.getDate()+days);  // 当前日期的前一天
    var month = now.getMonth()+1;
    var day = now.getDate();
    if(month < 10){
      month = "0" + month;
    }
    if(day < 10){
      day = "0"+day;
    }
    var obj = now.getFullYear()+"-"+month + "-" + day;
    return obj;
  }
























