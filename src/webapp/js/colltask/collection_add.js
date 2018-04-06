  
  var $ = function (eId)
  {
  	return document.getElementById(eId);
  }
  
  function clearDefaultTimeSegment()
  {
  			document.getElementById("start_time").value = "";
			document.getElementById("end_time").value = "";
  }
  
  

// 采集任务编制增加、修改页面所需要用到的所有脚本
// @author tianpeng
// @time

// 更改任务周期
function ChangeCycleType(sltvlue)
{            
    
    try{
    
      var checkObj = document.getElementById("coll_limit");
    
      var type = document.getElementById("coll_cycle_type").value;
   
      var ctype = eval(type)+"";
      
      
        switch(ctype){
            case "1":   // 年
            
                SetCycleTypeShow("coll_time_month_div", "coll_time_day_div", "coll_time_hour_div", "coll_time_minute_div", "coll_end_time_hour_div", "coll_end_time_minute_div");
                
                
                $("limit_div").style.display = "none";
                
                
                document.getElementById("trLimit").style.display ="none";
                document.getElementById("qdsj").style.display="block";

                    
                break;
            case "2":   // 月
                SetCycleTypeShow("coll_time_day_div", "coll_time_hour_div", "coll_time_minute_div", "coll_end_time_hour_div", "coll_end_time_minute_div");

                $("limit_div").style.display = "inline";
                $("limit_notes").innerHTML = "每年";
                SetLimitShow("limit_start_month_div", "limit_end_month_div");
                
                document.getElementById("trLimit").style.display ="block"; 
                document.getElementById("qdsj").style.display="block";
                
                //add by zhulin
                document.getElementById("slack_month_div").style.display ="block"; 
                document.getElementById("slack_day_div").style.display ="none"; 
                document.getElementById("slack_hour_div").style.display ="none"; 
                setValToSlack("month");//修改页面时  将时间点下 选中的值 赋值给页面
                chkSelectedAllStatus("02");
                
                    
                break;
            case "3":   // 周
                SetCycleTypeShow("coll_time_week_div", "coll_time_hour_div", "coll_time_minute_div", "coll_end_time_hour_div", "coll_end_time_minute_div");
                $("limit_div").style.display = "inline";
                $("limit_notes").innerHTML = "每年";
                SetLimitShow("limit_start_month_div", "limit_end_month_div");
                
                document.getElementById("trLimit").style.display ="block";
                document.getElementById("qdsj").style.display="block";
                
                //add by zhulin
                document.getElementById("slack_month_div").style.display ="block"; 
                document.getElementById("slack_day_div").style.display ="none"; 
                document.getElementById("slack_hour_div").style.display ="none"; 
                setValToSlack("week");//修改页面时  将时间点下 选中的值 赋值给页面    
                chkSelectedAllStatus("03");
                
                break;
            case "4":   // 日
            
               ChangeLimitChecked(checkObj); 
               SetCycleTypeShow("coll_time_hour_div", "coll_time_minute_div", "coll_end_time_hour_div", "coll_end_time_minute_div");
                
               $("limit_div").style.display = "inline";    
               $("limit_notes").innerHTML = "每月";
                
               SetLimitShow("limit_start_day_div", "limit_end_day_div");
                
               document.getElementById("trLimit").style.display ="block";
               document.getElementById("qdsj").style.display="block";
                  
               //add by zhulin
               document.getElementById("slack_month_div").style.display ="none"; 
               document.getElementById("slack_day_div").style.display ="block"; 
               document.getElementById("slack_hour_div").style.display ="none";               
               setValToSlack("day");//修改页面时  将时间点下 选中的值 赋值给页面
               chkSelectedAllStatus("04");
                  
                break;
            case "5":   // 时
                SetCycleTypeShow("coll_time_minute_div", "coll_end_time_minute_div");
                $("limit_div").style.display = "inline";
                $("limit_notes").innerHTML = "每日";
                SetLimitShow("limit_start_hour_div", "limit_end_hour_div");
                
                document.getElementById("trLimit").style.display ="block";
                document.getElementById("qdsj").style.display="block";
                 
                //add by zhulin
                document.getElementById("slack_month_div").style.display ="none"; 
                document.getElementById("slack_day_div").style.display ="none"; 
                document.getElementById("slack_hour_div").style.display ="block"; 
                setValToSlack("hour");//修改页面时  将时间点下 选中的值 赋值给页面
                chkSelectedAllStatus("0511");
                              
                break;
            case "6":   // 30分
            case "7":   // 15分
            case "8":   // 5分
            case "9":   // 1分
            case "10":  // 30秒
            case "11":  // 15秒
            
                SetCycleTypeShow();
                
                $("limit_div").style.display = "inline";
                $("limit_notes").innerHTML = "每日";
                
                SetLimitShow("limit_start_hour_div", "limit_end_hour_div");
                
                document.getElementById("trLimit").style.display ="block";
                document.getElementById("qdsj").style.display="none";
            
                //add by zhulin
                document.getElementById("slack_month_div").style.display ="none"; 
                document.getElementById("slack_day_div").style.display ="none"; 
                document.getElementById("slack_hour_div").style.display ="block"; 
                setValToSlack("minute");//修改页面时  将时间点下 选中的值 赋值给页面
                chkSelectedAllStatus("0511");
                
                break;
        }
        
        var blankL =  document.getElementById("blankLocation");
     
        //zhulin 修改该处填补空白逻辑
        if(ctype==1){
            blankL.style.display="block";	
            blankL.style.height = 130;
        }else if(ctype==2 || ctype==3){
       		blankL.style.display="block";	
            blankL.style.height = 25;
        }else if(ctype==5){
        	blankL.style.display="block";	
            blankL.style.height = 20;
        }else if(ctype>=6){
       		blankL.style.display="block";	
            blankL.style.height = 50;
        }else{//=4
        	blankL.style.display="none";	
        }
       
         //设置有效时段
        setDefaultTimeSegment();
                
        
    }catch(e){
        alert(e.toString());
    }

    function SetCycleTypeShow(){
        try{
            $("coll_time_month_div").style.display = "none";
            $("coll_time_week_div").style.display = "none";
            $("coll_time_day_div").style.display = "none";
            $("coll_time_hour_div").style.display = "none";
            $("coll_time_minute_div").style.display = "none";
            
            //add by zhulin
            $("coll_end_time_hour_div").style.display = "none";
            $("coll_end_time_minute_div").style.display = "none";

            if(arguments.length > 0){
                for(var i=0; i<arguments.length; i++){
                    $(arguments[i]).style.display = "inline";
                }
            }
        }catch(e){
            alert(e.toString());
        }
    }   // function SetCycleTypeShow()

    function SetLimitShow(){
        try{
            $("limit_start_month_div").style.display = "none";
            $("limit_start_day_div").style.display = "none";
			
            $("limit_start_hour_div").style.display = "none";
            $("limit_end_month_div").style.display = "none";
            $("limit_end_day_div").style.display = "none";
            $("limit_end_hour_div").style.display = "none";

		

            if(arguments.length > 0){
                for(var i=0; i<arguments.length; i++){
                    $(arguments[i]).style.display = "inline";
                }
                
                //当周期限制未选择时清空隐藏域
                if($("coll_limit").checked == true)
                {
                	     $("collLimitStart").value= $(arguments[0]).value;
                		 $("collLimitEnd").value= $(arguments[1]).value;
                }
				else
				{
					   $("collLimitStart").value="";
					   $("collLimitEnd").value="";
				}
                 
                 //alert("start:" +  $("collLimitStart").value+"endt:" +  $("collLimitEnd").value);
            }
        }catch(e){
            alert(e.toString());
        }
    }   // function SetLimitShow()
}   // function ChangeCycleType(obj)

// 修改月时，更改对应的日期
function ChangeMonth(monthId,dayId){

	
	//alert("monthId="+monthId+"   dayId= "+dayId);
	
	
    var monthControl = $(monthId);
    var dayControl = $(dayId);
    
   // alert("monthControl="+monthControl.value+" dayControl=" + dayControl );
    
    
    var month = monthControl.value+"";
    
    
    
    try{
        switch(month){
            case "1":
            case "3":
            case "5":
            case "7":
            case "8":
            case "10":
            case "12":
                ResetDaySelect(dayId, 31);
                break;
            case "4":
            case "6":
            case "9":
            case "11":
                ResetDaySelect(dayId, 30);
                break;
            case "2":
                ResetDaySelect(dayId, 29);
                break;
        }
    }catch(e){
        alert(e.toString());
    }

    // 重设日期选择列表
    function ResetDaySelect(selectObj, dayNum){
    
    
    		//alert("objId="+selectObj);
    		
     		 var extObj = Ext.getCmp(selectObj+'ext');
			
			//alert("ExtObj="+extObj);
			
    
       
        try{
        
				var strJson="[";
				
				for(i=1;i<=dayNum;i++)
				{
				
				   var stri = i;
				   if(i<10)
				   {
				   		stri = "0"+i;
				   }
				
				
				   if(i != dayNum)
				   {
				   		strJson = strJson+"['"+stri+"日"+"','"+i+"']"+",";
				   }
				   else
				   {
				   	 strJson = strJson+"['"+stri+"日"+"','"+i+"']";
				   }
					
				}
	
			   strJson+="]";
			   
			   	var store = extObj.store;
			   	
				store.loadData(eval(strJson));
            
        }catch(e){
            alert(e.toString());
        }
    }   // function ResetDaySelect(selectObj, dayNum)
}   // function ChangeMonth(obj, daySelectId, yearSelectId)




function disableLimitElement(domId,yn)
{
	    var extObj = Ext.getCmp(domId+'ext');
	    
	       if(extObj !=undefined)
	       {
	       		   extObj.setDisabled(yn);
	       }
     
}

function ChangeLimitChecked(obj){
    try{
    
    
    
        if(obj.checked){
        	
 			//disableLimitElement("limit_start_month",false);
            //disableLimitElement("limit_start_day",false);
            //disableLimitElement("limit_start_hour",false);
            //disableLimitElement("limit_end_month",false);
            //disableLimitElement("limit_end_day",false);
            //disableLimitElement("limit_end_hour",false);
            
            //add by zhulin  时间点控件组 设置 disabled
            //disableSlackElement("0");
            chgSelectStatus();
            
            var arry = document.getElementsByName("coll_limit_way");
			for(var i=0;i<arry.length;i++){
				arry[i].disabled = false;
			}
            
            $("coll_limit").value="1";
            
            
        }else{
        	
        	disableLimitElement("limit_start_month",true);
            disableLimitElement("limit_start_day",true);
            disableLimitElement("limit_start_hour",true);
            disableLimitElement("limit_end_month",true);
            disableLimitElement("limit_end_day",true);
            disableLimitElement("limit_end_hour",true);
            
            //add by zhulin
			disableSlackElement("1");
			
			//全选/反选置灰
			var selAll = document.getElementById("selectedAll");
			selAll.disabled = true;
            
			$("coll_limit").value="0";
			 
        }
        
    }catch(e){
        alert(e.toString());
    }
}

//add by zhulin  设置时间点控件组 是否 disabled
function disableSlackElement(vl){
	var arry = document.getElementsByName("coll_limit_way");
	for(var i=0;i<arry.length;i++){
		if("1" == vl){
			arry[i].disabled = true;
		}else{
			arry[i].disabled = false;
		}
	}
	
	var arry_mon = document.getElementsByName("slack_month");
	for(var i=0;i<arry_mon.length;i++){
		if("1" == vl){
			arry_mon[i].disabled = true;
		}else{
			arry_mon[i].disabled = false;
		}
	}
	
	var slack_day = document.getElementsByName("slack_day");
	for(var i=0;i<slack_day.length;i++){
		if("1" == vl){
			slack_day[i].disabled = true;
		}else{
			slack_day[i].disabled = false;
		}
	}
	
	var slack_hor = document.getElementsByName("slack_hour");
	for(var i=0;i<slack_hor.length;i++){
		if("1" == vl){
			slack_hor[i].disabled = true;
		}else{
			slack_hor[i].disabled = false;
		}
	}
}

//add by zhulin  将选中时间点 转化为 2进制 表示
function setSlackValToBinary(){
  	var str = new Array("0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0");	
  	var type = document.getElementById("coll_cycle_type").value;
   
    var ctype = eval(type)+"";
      
      
        switch(ctype){
            case "1":   // 年
                   
                break;
            case "2":   // 月
            case "3":   // 周
             	var arry_mon = document.getElementsByName("slack_month");
 				for(var i=0;i<arry_mon.length;i++){
 					if(arry_mon[i].checked){
 						str[arry_mon[i].value-1] = 1 ;
 					}
 				}
                break;
            case "4":   // 日
   				var arry_day = document.getElementsByName("slack_day");
 				for(var i=0;i<arry_day.length;i++){
 					if(arry_day[i].checked){
 						str[arry_day[i].value-1] = 1 ;
 					}
 				}
                break;
            case "5":   // 时
            case "6":   // 30分
            case "7":   // 15分
            case "8":   // 5分
            case "9":   // 1分
            case "10":  // 30秒
            case "11":  // 15秒
            	var arry_hour = document.getElementsByName("slack_hour");
 				for(var i=0;i<arry_hour.length;i++){
 					if(arry_hour[i].checked){
 						str[arry_hour[i].value] = 1 ;
 					}
 				}
                break;
        }
	return str.toString().replaceAll(',','');
} 
//时间点 与 时间段 之间 相互置灰显示
function chgSelectStatus(){
	var arry = document.getElementsByName("coll_limit_way");
	//选中时间段
	if(arry[0].checked){
		//全选/反选置灰
		var selAll = document.getElementById("selectedAll");
		selAll.disabled = true;
		
		var arry_mon = document.getElementsByName("slack_month");
		for(var i=0;i<arry_mon.length;i++){
				arry_mon[i].disabled = true;
		}
		
		var slack_day = document.getElementsByName("slack_day");
		for(var i=0;i<slack_day.length;i++){
				slack_day[i].disabled = true;
		}
		
		var slack_hor = document.getElementsByName("slack_hour");
		for(var i=0;i<slack_hor.length;i++){
				slack_hor[i].disabled = true;
		}	
		
		disableLimitElement("limit_start_month",false);
        disableLimitElement("limit_start_day",false);
        disableLimitElement("limit_start_hour",false);
        disableLimitElement("limit_end_month",false);
        disableLimitElement("limit_end_day",false);
        disableLimitElement("limit_end_hour",false);
        
	}else{//选中时间点
		//全选/反选 取消置灰
		var selAll = document.getElementById("selectedAll");
		selAll.disabled = false;
		
		var arry_mon = document.getElementsByName("slack_month");
		for(var i=0;i<arry_mon.length;i++){
				arry_mon[i].disabled = false;
		}
		
		var slack_day = document.getElementsByName("slack_day");
		for(var i=0;i<slack_day.length;i++){
				slack_day[i].disabled = false;
		}
		
		var slack_hor = document.getElementsByName("slack_hour");
		for(var i=0;i<slack_hor.length;i++){
				slack_hor[i].disabled = false;
		}	
		
		disableLimitElement("limit_start_month",true);
        disableLimitElement("limit_start_day",true);
        disableLimitElement("limit_start_hour",true);
        disableLimitElement("limit_end_month",true);
        disableLimitElement("limit_end_day",true);
        disableLimitElement("limit_end_hour",true);
		
	}
}

function SetDefaultCycle(){
    var cycleType = $("coll_cycle_type").value;
    ChangeCycleType(cycleType);
}


