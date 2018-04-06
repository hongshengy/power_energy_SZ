/*
 * 全社会用电项目，自定义公用js
 * 
 * 
 * 
 * 
 */
var Dragging=function(validateHandler){ //参数为验证点击区域是否为可移动区域，如果是返回欲移动元素，负责返回null
    var draggingObj=null; //dragging Dialog
    var diffX=0;
    var diffY=0;
    
    function mouseHandler(e){
        switch(e.type){
            case 'mousedown':
                draggingObj=validateHandler(e);//验证是否为可点击移动区域
                if(draggingObj!=null){
                    diffX=e.clientX-draggingObj.offsetLeft;
                    diffY=e.clientY-draggingObj.offsetTop;
                }
                break;
            
            case 'mousemove':
                if(draggingObj){
                    draggingObj.style.left=(e.clientX-diffX)+'px';
                    draggingObj.style.top=(e.clientY-diffY)+'px';
                }
                break;
            
            case 'mouseup':
                draggingObj =null;
                diffX=0;
                diffY=0;
                break;
        }
    };
    
    return {
        enable:function(){
        	if(ngflag() == "NE"){
	        	document.addEventListener('mousedown',mouseHandler);
	            document.addEventListener('mousemove',mouseHandler);
	            document.addEventListener('mouseup',mouseHandler);
        	}else{
        		document.attachEvent('onmousedown',mouseHandler);
	            document.attachEvent('onmousemove',mouseHandler);
	            document.attachEvent('onmouseup',mouseHandler);
        	}
        },
        disable:function(){
        	if(ngflag() == "NE"){
        		document.removeEventListener('mousedown',mouseHandler);
	            document.removeEventListener('mousemove',mouseHandler);
	            document.removeEventListener('mouseup',mouseHandler);
        	}else{
        		document.detachEvent('onmousedown',mouseHandler);
	            document.detachEvent('onmousemove',mouseHandler);
	            document.detachEvent('onmouseup',mouseHandler);
        	}
        }
    }
}

/*
 * 全社会用电项目，自定义公用js
 * 
 * 
 * 
 * 
 */
function getDraggingDialog(e){
    var target=e.target;
    if(target && (target.className+"") == "[object SVGAnimatedString]") // 这句判断是因为highchart拖拽报错
    	return;
    while(target && target.className != null && target.className.indexOf('dialog-Movetitle')==-1){  
        target=target.offsetParent;
    }
    if(target!=null){
        return target.offsetParent;
    }else{
        return null;
    }
}

Dragging(getDraggingDialog).enable();



/**
 * 计算最大值最小值，让图像上下保留百分之十
 * myCharts  图标
 * yAxisIndex y轴坐标系
 * param 显示隐藏点击的对象
 * setMin  最小值的写死值   最小值不需要根据本方法计算时候使用
 * setMax 最大值的写死值   最大值不需要根据本方法计算时候使用
 */
GetMinAndMaxValue = function(myCharts,yAxisIndex,param,setMin,setMax) {
	  
  //数据返回集合，0为最小值，1为最大值
  var l_MinAndMax = new Array();
  //默认最小值
  var l_Min=0;
  //默认最大值
  var l_Max=1;
  
  IsChangeData =false;
  
   l_MinAndMax[0] = l_Min;
   l_MinAndMax[1] = l_Max;
  
   //legend无数据，
   //直接返回默认值
   if( myCharts._option.legend==null)
   {
   	     //设置图的最小值
		 myCharts._option.yAxis[yAxisIndex].min=l_MinAndMax[0];
    	 //设置图最大值
	     myCharts._option.yAxis[yAxisIndex].max=l_MinAndMax[1];
	      //刷新图标
	     myCharts.refresh();
   	  return  l_MinAndMax;
   }
   
   //获取图标series数量
    var l_length= myCharts._option.legend.data.length;
    
    for(var i=0;i<l_length;i++){
      
      //获取一个series名称
      var l_DataName = myCharts._option.legend.data[i];
      
      //获取series是否选中
      var isSeries =false;
      if(param!=null)
      {
            isSeries = param.selected[l_DataName];
      }
      else  //初始化方法的时候进入此内容
      {
      	
      	  if(myCharts._option.legend.selected)
      	  {
	      	   //在默认selected属性中寻找是否选中
	      	    isSeries = myCharts._option.legend.selected[l_DataName];
	      	    
	      	    //isSeries 返回为undefined 的时候，证明此Series没有设置默认，没有设置的情况下，Echarts默认为选中的
	      	    if(isSeries != true && isSeries != false )
	      	    {
	      	    	isSeries = true;
	      	    }
      	  }
      	  else //selected属性为空的情况下，没有设置默认，Echarts默认为选中的
      	  {
      	  	    isSeries = true;
      	  }
      }
      
      //所有有数据的线条个数
      var l_lineCount =myCharts._option.series.length;
      
      //当前series选中
      if(isSeries)
      {
            //循环所有线图形
            for(var j=0;j<l_lineCount;j++){
                 
                if(myCharts._option.series[j].name==l_DataName
                &&myCharts._option.series[j].yAxisIndex==yAxisIndex)
                {
                       //计算最大最小值
                      var l_tempMinAndMax = 
                          GetMinAndMaxByData
                      (myCharts._option.series[j].data);
                      
                      if(IsChangeData==false)//第一次进入if，直接把两个值给默认值
                      {
                         l_MinAndMax[0] = l_tempMinAndMax[0];
                         l_MinAndMax[1] = l_tempMinAndMax[1];
                      }
                  else
                  {
                  	
                  	var l_isNaNMin =  parseFloat(l_tempMinAndMax[0]);
                  	if(l_isNaNMin.toString()!='NaN')
                  	{
              	        //当前值小于最小值
              	        //把当前值赋值给最小值
	                     if(parseFloat(l_MinAndMax[0])>parseFloat(l_tempMinAndMax[0])
	                     ||(l_MinAndMax[0]=='0' && l_MinAndMax[1]=='1'))//假如上一次赋值为默认的0,1 作废
	                     {
	                         l_MinAndMax[0] = l_tempMinAndMax[0];//把当前值赋值给最小值
	                     }
                  	}
                  	var l_isNaNMax =  parseFloat(l_tempMinAndMax[1]);
                  	if(l_isNaNMax.toString()!='NaN')
                  	{
	                        //当前值大于最大值
              	        //把当前值赋值给最大值
	                     if(parseFloat(l_MinAndMax[1])<parseFloat(l_tempMinAndMax[1])
	                     ||(l_MinAndMax[0]=='0' && l_MinAndMax[1]=='1'))//假如上一次赋值为默认的0,1 作废
	                     {
	                         l_MinAndMax[1] = l_tempMinAndMax[1];//把当前值赋值给最大值
	                     }
                  	}
                  }
                  IsChangeData=true;//值改变了，不是默认0,1
                }
            }
      }
 
    }
  
    //最大为1，最小为0 ，直接返回
    if(l_MinAndMax[0]==0&&l_MinAndMax[1]==1)
    {
    	//设置图的最小值
		 myCharts._option.yAxis[yAxisIndex].min=l_MinAndMax[0];
    	 //设置图最大值
	     myCharts._option.yAxis[yAxisIndex].max=l_MinAndMax[1];
	     
	     myCharts._option.yAxis[yAxisIndex].axisLabel.formatter = function(v) {//格式化
						        return v.toFixed(1);//格式化
					}
	      //刷新图标
	     myCharts.refresh();
    	  return  l_MinAndMax;
    }
    
    if(IsChangeData)//值改变了，不是默认值
    {
	    //最大最小值的差值的绝对值
	   var DataCz = parseFloat(l_MinAndMax[1]) - parseFloat(l_MinAndMax[0]);
	   DataCz  = DataCz>0 ? DataCz : -DataCz;
      
       l_MinAndMax[0] =   parseFloat(l_MinAndMax[0])  - parseFloat(DataCz)* 0.1;
	      
	   l_MinAndMax[1] =   parseFloat(l_MinAndMax[1])  + parseFloat(DataCz)* 0.1;
      
	  if(DataCz<3)
      {
           l_MinAndMax[0] =    l_MinAndMax[0].toFixed(3);
	       l_MinAndMax[1] =   l_MinAndMax[1].toFixed(3);
      }
      //差值比较小，最大最小最小坐标保留两位
     else if(DataCz<10)
      {
           l_MinAndMax[0] =    l_MinAndMax[0].toFixed(2);
	       l_MinAndMax[1] =   l_MinAndMax[1].toFixed(2);
      }
      else if(DataCz<200)  //5-200之间的，不保留小数位数
      {
           l_MinAndMax[0] =    l_MinAndMax[0].toFixed(0);
	       l_MinAndMax[1] =   l_MinAndMax[1].toFixed(0);
      }
      else //200以上的，单位保留到十位数
      {
           l_MinAndMax[0] =    ((l_MinAndMax[0]/10).toFixed(0))*10;
	       l_MinAndMax[1] =    ((l_MinAndMax[1]/10).toFixed(0))*10;
      }
    }
    
    //把setMin字符串类型转化成数值类型
     var l_isNaNMin =  parseFloat(setMin);
     var l_isNaNMax =  parseFloat(setMax);//把setMax字符串类型转化成数值类型
  
    //如果setMin这个参数不为空，最小值写死为这个，不需要计算出来的值，柱状图使用，不可能为负数的时候使用等
    if(l_isNaNMin.toString()!='NaN')
    {
		 l_MinAndMax[0]=setMin;
    }
  
    
    //如果setMax这个参数不为空，最打值写死为这个，不需要计算出来的值，柱状图使用，不可能为负数的时候使用等
    if(l_isNaNMax.toString()!='NaN')
    {
		 l_MinAndMax[1]=setMax;
    }
    
    
        //最大最小值的差值的绝对值
	   var DataCz = parseFloat(l_MinAndMax[1]) - parseFloat(l_MinAndMax[0]);
	   DataCz  = DataCz>0 ? DataCz : -DataCz;
	   
	     //差值比较小，最大最小最小坐标保留两位
      if(DataCz<3)
      {
	     myCharts._option.yAxis[yAxisIndex].axisLabel.formatter = function(v) {//格式化
						        return Number( Number(v).toFixed(3));//格式化
						        //return v.toFixed(1);//格式化
					}
      }
	  //差值比较小，最大最小最小坐标保留两位
     else if(DataCz<10)
      {
	     myCharts._option.yAxis[yAxisIndex].axisLabel.formatter = function(v) {//格式化
						        return Number( Number(v).toFixed(2));//格式化
						        //return v.toFixed(1);//格式化
					}
      }
      else if(DataCz<200)  //5-200之间的，不保留小数位数
      {
            myCharts._option.yAxis[yAxisIndex].axisLabel.formatter = function(v) {//格式化
						        return Number( Number(v).toFixed(0));//格式化
						        // return v.toFixed(0);//格式化
					}
      }
      else //200以上的，单位保留到十位数
      {
           myCharts._option.yAxis[yAxisIndex].axisLabel.formatter = function(v) {//格式化
	           		  			 return Number( Number(v).toFixed(0));//格式化
	           		  			 // return v.toFixed(0);//格式化
			}
      }
    
    if(l_MinAndMax[0]==l_MinAndMax[1])//最大最小值相等
    {
    	l_MinAndMax[0] = l_MinAndMax[0]-1;
    	l_MinAndMax[1] = l_MinAndMax[1]-(-1);
    }
    
    if(l_MinAndMax[0].toString()=='NaN') {
   	 myCharts._option.yAxis[yAxisIndex].axisLabel.formatter = function(v) {//格式化
		        return Number( Number(v).toFixed(3));//格式化
	    }
   	l_MinAndMax[0]="0";
   }
   if(l_MinAndMax[1].toString()=='NaN') {
   	 myCharts._option.yAxis[yAxisIndex].axisLabel.formatter = function(v) {//格式化
		        return Number( Number(v).toFixed(3));//格式化
	    }
   	l_MinAndMax[1]="1";
   }
      
    //设置图的最小值
     myCharts._option.yAxis[yAxisIndex].min=l_MinAndMax[0];
     //设置图最大值
	 myCharts._option.yAxis[yAxisIndex].max=l_MinAndMax[1];
	 
	 myCharts.refresh();//刷新图标
     //返回应该设置的最大最小值  暂时不使用
     return  l_MinAndMax;
}

/**
 * 从一组数据中获取最大值和最小值
 */
GetMinAndMaxByData = function(data) {
  
  //数据返回集合，0为最小值，1为最大值
  var l_MinAndMax = new Array();//返回值集合
  
   if(data=='[,]')
   {
  	 l_MinAndMax[0] = 0;//赋值
     l_MinAndMax[1] = 1;//赋值
     return l_MinAndMax;
   }
  
   var l_isNaN =  parseFloat(data[0]);//用于判断当前值是否能转化成数值
   
  var l_Min='';  //默认最小值
  var l_Max='';  //默认最大值
  
   //如果data[0]非数值，
   //直接返回默认值
   if(l_isNaN.toString()!='NaN')
   {
	    l_Min=data[0];  //默认最小值
        l_Max= data[0];  //默认最大值
   }

   for(var j=0;j<data.length;j++){//循环数据集
   	
        var l_isNaNData =  parseFloat(data[j]);//用于判断当前值是否能转化成数值
        if(l_isNaNData.toString() != 'NaN')
        {
        	if(parseFloat(l_Min).toString()=='NaN' || parseFloat(l_Max).toString()=='NaN')//最大最小没有值的情况
        	{
        		l_Min =data[j];//第一个曲线值给最小
        		l_Max =data[j];//第一个曲线值给最大
        	}
        	else
        	{
                if(parseFloat(l_Min)>parseFloat(data[j]) && data[j]!=null && data[j]!='null')
                {
                  l_Min =data[j];//寻找到比当前最小值还小的，赋值给最小值
                }
     
                if(parseFloat(l_Max)<parseFloat(data[j]) && data[j]!=null && data[j]!='null')
                {
                  l_Max =data[j];//寻找到比当前最大值还大的，赋值给最大值
                }
        	}
        }
   }
   
   if(parseFloat(l_Min).toString()=='NaN' || parseFloat(l_Max).toString()=='NaN')//最大最小没有值的情况
   {
	   l_MinAndMax[0] = '';//赋值
	   l_MinAndMax[1] = '';//赋值
   }
   else
   {
	  l_MinAndMax[0] = l_Min;//赋值
	  l_MinAndMax[1] = l_Max;//赋值
   }
  
  //返回一组数据中的最大最小值
  return  l_MinAndMax;
  }
 
/**
 * 判断是否IE浏览器
 * 
 * IE则返回IE
 * 
 * 非IE返回NE
 */
function ngflag() {
	 if (navigator.appName.toLowerCase().indexOf("microsoft") != -1) {
		 return "IE";
	 } else {
		 return "NE";
	 }
}