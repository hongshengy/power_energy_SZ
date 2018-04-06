/*********============================== 召测，透抄用多模式提示选择对话框 （开始） ===============================**********/
// 控制按钮常量
var MB_OK = 0;
var MB_CANCEL = 1;
var MB_OKCANCEL = 2;
var MB_YES = 3;
var MB_NO = 4;
var MB_YESNO = 5;
var MB_YESNOCANCEL = 6;

// 控制按钮文本
var MB_OK_TEXT = "确定";
var MB_CANCEL_TEXT = "取消";
var MB_YES_TEXT = " 是 ";
var MB_NO_TEXT = " 否 ";

// 提示框类型INFO、QUEST、WARN、ERROR
var MB_INFO = "INFO";
var MB_QUEST = "QUEST";
var MB_WARN = "WARN";
var MB_ERROR = "ERROR";

//提示图标
var T_ICON = "images/img/icon-info.gif";
var Q_ICON = "images/img/icon-question.gif";
var W_ICON = "images/img/icon-warning.gif";
var E_ICON = "images/img/icon-error.gif";

var NULL_ICON = "null";


//委托方法
var MB_OK_METHOD = null;
var MB_CANCEL_METHOD = null;
var MB_YES_METHOD = null;
var MB_NO_METHOD = null;
var MB_BACKCALL = null;

var MB_STR_TASK = '<style type="text/css"><!--' +
			'body{margin:0px;}' +
			'.msgbox_title{height:23px;font-weight: bold;position:relative;font-size:12px;COLOR: white;line-height:23px;padding-left:10px;border-bottom:0px solid #000;background: url('+getRequestUrl()+'images/aueic/buttonBg.jpg) repeat-x left top;}' +
			'.msgbox_control{text-align:center;clear:both;height:30px;}' +
			'.msgbox_button{background-color: #B1CDF3;border:1px solid #003366;font-size:12px;line-height:20px;height:21px;}' +
			'.msgbox_content{padding-top:40px;float:left;line-height: 20px; width:240px; text-align:left;}' +
			'.msgbox_icon{width: 60px;height: 90px;float: left;text-align: center;line-height:50px;padding-top:35px;}' +
			'.msgbox_mask_task{position:absolute;left:0px;top:0px;background-color:#333333;width:100%;height:100%;}' +
			'.msgboxTask{background-color: #EFFAFE;position: absolute;font-size:12px;width:300px; height:150px; margin-top: -100px; margin-left: -150px;top:50%;left:50%;border:1px solid #999999;}' +
			'--></style>' +
			//"<iframe id='msgBack' style=\"filter: alpha(opacity=0);position:absolute;z-index:99998;display:none;width:expression(this.nextSibling.offsetWidth);height:expression(this.nextSibling.offsetHeight);top:expression(this.nextSibling.offsetTop);left:expression(this.nextSibling.offsetLeft);\" frameborder=0 ></iframe>" +
			'<div id="msgBoxMaskTask" class="msgbox_mask_task" style="filter: alpha(opacity=0);z-index:99999;display:none;">' +
			'<html><head></head><base target="_self"><body><iframe style="position:absolute;top:0px; left:0px;z-index:-1;width:2000px;height:2000px;border:0;" frameborder=0 scrolling=no></iframe></body></html>'+
			'</div>' +
			'<div class="msgboxTask" style="display:none; z-index:100000;" id="msgBoxTask">' +
			'<div class="msgbox_title" id="msgBoxTitleTask"></div>' +
			'<div class="msgbox_icon" id="msgBoxIconTask"></div>' +
			'<div class="msgbox_content" id="msgBoxContentTask"></div>' +
			'<div class="msgbox_control" id="msgBoxControlTask"></div>' +
			'</div><input type="hidden" id="retryTimes"></input>';

var Timer = null;

document.write(MB_STR_TASK);

setTaskTime = document.createElement("div");
setTaskTime.id = 'setTaskTime';
setTaskTime.innerHTML = "超时时长<input type='text' onfocusout=checkSetTimeValue(this); onkeyup=numOnlyInput(); id='inputTaskTime' value='45' style='width:20px' maxLength='2'/>秒(20-60)";
setTaskTime.style.position = "absolute";
setTaskTime.style.top = "30";
setTaskTime.style.left = "60";
document.getElementById("msgboxTask").appendChild(setTaskTime); 

var icon = new Image();
icon.src = T_ICON;

var taskTimeUseFlg = '0';

/* 提示对话框
 * 参数 1 : 提示内容
 * 参数 2 : 提示标题
 * 参数 3 : 图标路径
 * 参数 4 : 按钮类型
*/

function TaskMessageBox(){
   var _content = arguments[0] || "这是一个对话框！";
   var _title   = arguments[1] || "系统提示";
   var _type    = arguments[2] || "INFO";
   var _button  = arguments[3] || MB_OK;
   MB_BACKCALL  = arguments[4];
   
   var _iconStr = '<img src="{0}">';
   var _btnStr  = '<input name="{0}" id="{0}" type="button" class="btn" onmouseover="this.className=\'btn1_mouseover\'" onmouseout="this.className=\'btn1_mouseout\'" value="{1}" onclick="MBMethodTask(this)" />';
   
   
   switch(_button)
   {      
	  case MB_CANCEL      : _btnStr = _btnStr.toFormatString("taskMsgBoxBtnCancel", MB_CANCEL_TEXT); break;
	 
	  case MB_YES         : _btnStr = _btnStr.toFormatString("taskMsgBoxBtnYes", MB_YES_TEXT); break;
	  
	  case MB_NO          : _btnStr = _btnStr.toFormatString("taskMsgBoxBtnNo", MB_NO_TEXT); break;
	  
	  case MB_OKCANCEL    : 
	       _btnStr = _btnStr.toFormatString("taskMsgBoxBtnOk", MB_OK_TEXT) + "&nbsp;&nbsp;" +
 		             _btnStr.toFormatString("taskMsgBoxBtnCancel", MB_CANCEL_TEXT); 
		   break;
	  case MB_OK    : 
	       _btnStr = _btnStr.toFormatString("taskMsgBoxBtnOk", MB_OK_TEXT) ; 
		   break;		   
		   
	  case MB_YESNO       :
	        _btnStr = _btnStr.toFormatString("taskMsgBoxBtnYes", MB_YES_TEXT) + "&nbsp;&nbsp;" +
		              _btnStr.toFormatString("taskMsgBoxBtnNo", MB_NO_TEXT); 
		    break;
		 
	  case MB_YESNOCANCEL :
	        _btnStr = _btnStr.toFormatString("taskMsgBoxBtnYes", MB_YES_TEXT) + "&nbsp;&nbsp;" +
		              _btnStr.toFormatString("taskMsgBoxBtnNo", MB_NO_TEXT) + "&nbsp;&nbsp;" +
					  _btnStr.toFormatString("taskMsgBoxBtnCancel", MB_CANCEL_TEXT); 
		    break;
	     
	  default :  _btnStr = _btnStr.toFormatString("taskMsgBoxBtnOk", MB_OK_TEXT);  break;  
	  
   }
   //解决　FF 下会复位
   ScrollTop = GetBrowserDocument().scrollTop; 
   ScrollLeft = GetBrowserDocument().scrollLeft; 
   GetBrowserDocument().style.overflow = "hidden";
   GetBrowserDocument().scrollTop = ScrollTop;   
   GetBrowserDocument().scrollLeft = ScrollLeft; 

   document.getElementById("msgBoxTitleTask").innerHTML = "系统提示";
   
   
   document.getElementById("msgBoxIconTask").innerHTML = (_type==NULL_ICON ? '' : _iconStr.toFormatString(getRequestUrl()+_type));
   // 根据类型显示不同的图标      
   if(_type==NULL_ICON){
   		//将图标的位置宽度设置为0
   	    document.getElementById("msgBoxIconTask").innerHTML ='';
   		document.getElementById("msgBoxIconTask").style.width = '0px';
   }else if(_type=="QUEST"){
   		document.getElementById("msgBoxIconTask").innerHTML =_iconStr.toFormatString(getRequestUrl()+Q_ICON);
   }else if(_type=="WARN"){
   	    document.getElementById("msgBoxIconTask").innerHTML =_iconStr.toFormatString(getRequestUrl()+W_ICON);
   }else if(_type=="ERROR"){
   	    document.getElementById("msgBoxIconTask").innerHTML =_iconStr.toFormatString(getRequestUrl()+E_ICON);
   }else{
   		document.getElementById("msgBoxIconTask").innerHTML =_iconStr.toFormatString(getRequestUrl()+T_ICON);
   } 
   
   document.getElementById("msgBoxContentTask").innerHTML = _content; 
   document.getElementById("msgBoxControlTask").innerHTML =  _btnStr;
   
   OpacityValue = 0;
   document.getElementById("msgboxTask").style.display = "";	   
   try{document.getElementById("msgBoxMaskTask").filters("alpha").opacity = 0;}catch(e){};
   document.getElementById("msgBoxMaskTask").style.opacity = 0;
   document.getElementById("msgBoxMaskTask").style.display = "";
   document.getElementById("msgBoxMaskTask").style.height = GetBrowserDocument().scrollHeight + "px";
   document.getElementById("msgBoxMaskTask").style.width = GetBrowserDocument().scrollWidth + "px";
   
   Timer = setInterval("DoAlpha()",1);
   //设置位置   
   document.getElementById("msgBoxMaskTask").style.width = "100%";   
   document.getElementById("msgboxTask").style.width = (document.getElementById("msgBoxIconTask").offsetWidth + document.getElementById("msgBoxContentTask").offsetWidth + 2) + "px";
   
   document.getElementById("msgboxTask").style.marginTop = (-document.getElementById("msgboxTask").offsetHeight/2 + GetBrowserDocument().scrollTop) + "px";
   document.getElementById("msgboxTask").style.marginLeft = (-document.getElementById("msgboxTask").offsetWidth/2 + GetBrowserDocument().scrollLeft) + "px";  
   
	taskTimeUseFlg = '1';
    
  try{
   	   //解决messageBox在切换tab的时候报错
   	   if(_button == MB_OK || _button == MB_OKCANCEL){
	       document.getElementById("taskMsgBoxBtnOk").focus();
	   }else if(_button == MB_YES || _button == MB_YESNO || _button == MB_YESNOCANCEL){
		   document.getElementById("taskMsgBoxBtnYes").focus();
	   }
   }catch(e){
   		document.getElementById("msgboxTask").style.width = (document.getElementById("msgBoxIconTask").scrollWidth + document.getElementById("msgBoxContentTask").scrollWidth + 2) + "px";
   
	    document.getElementById("msgboxTask").style.marginTop = (-document.getElementById("msgboxTask").scrollHeight/2 + GetBrowserDocument().scrollTop) + "px";
	    document.getElementById("msgboxTask").style.marginLeft = (-document.getElementById("msgboxTask").scrollWidth/2 + GetBrowserDocument().scrollLeft) + "px";   
  }  

}

function checkSetTimeValue(o){
	if (o.value==undefined||o.value==null||o.value=='') {
		o.value = 45;
	} else {
		var value = parseInt(o.value);
		if (value<20||value>60) {
			o.value = 45;
		}
	}
}

var OpacityValue = 0;
var ScrollTop = 0;
var ScrollLeft = 0;

function GetBrowserDocument()
{
   var _dcw = document.documentElement.clientHeight;
   var _dow = document.documentElement.offsetHeight;
   var _bcw = document.body.clientHeight;
   var _bow = document.body.offsetHeight;
   
   if(_dcw == 0) return document.body;
   if(_dcw == _dow) return document.documentElement;
   
   if(_bcw == _bow && _dcw != 0) 
     return document.documentElement;
   else
     return document.body;
}

function SetOpacity(obj,opacity){
		if(opacity >=1 ) opacity = opacity / 100;	
			
		try{obj.style.opacity = opacity; }catch(e){}
		
		try{ 
			if(obj.filters){
				obj.filters("alpha").opacity = opacity * 100;
			}
			
		}catch(e){}
}
	
function DoAlpha(){
	if (OpacityValue > 20){clearInterval(Timer);return 0;}
	OpacityValue += 5;	
	SetOpacity(document.getElementById("msgBoxMaskTask"),OpacityValue);
}

function MBMethodTask(obj)
{   
   switch(obj.id)
   {
      //case "taskMsgBoxBtnOk" : if(MB_BACKCALL) {MB_BACKCALL(MB_OK);} else {if(MB_OK_METHOD) MB_OK_METHOD();} break;
	  
	  case "taskMsgBoxBtnOk" : if(MB_BACKCALL) {MB_BACKCALL(MB_OK);} else {if(MB_OK_METHOD){var result =MB_OK_METHOD(); if(result!=undefined && !result) return;}} break;
	  case "taskMsgBoxBtnCancel" : if(MB_BACKCALL) {MB_BACKCALL(MB_CANCEL);} else {if(MB_CANCEL_METHOD) MB_CANCEL_METHOD();} break;
	  case "taskMsgBoxBtnYes" : if(MB_BACKCALL) {MB_BACKCALL(MB_YES);} else {if(MB_YES_METHOD) MB_YES_METHOD();} break;
	  case "taskMsgBoxBtnNo" : if(MB_BACKCALL) {MB_BACKCALL(MB_NO);} else {if(MB_NO_METHOD) MB_NO_METHOD();} break;
   }   
   
   MB_OK_METHOD = null;
   MB_CANCEL_METHOD = null;
   MB_YES_METHOD = null;
   MB_NO_METHOD = null;
   MB_BACKCALL = null;
   
   MB_OK_TEXT = "确定";
   MB_CANCEL_TEXT = "取消";
   MB_YES_TEXT = " 是 ";
   MB_NO_TEXT = " 否 ";
   
   document.getElementById("msgBoxTask").style.display = "none";   
   document.getElementById("msgBoxMaskTask").style.display = "none";  
   GetBrowserDocument().style.overflow = ""; 
   GetBrowserDocument().scrollTop = ScrollTop;
   GetBrowserDocument().scrollLeft = ScrollLeft; 
}

String.prototype.toFormatString = function(){  
   var _str = this;
   for(var i = 0; i < arguments.length; i++){    
      _str = eval("_str.replace(/\\{"+ i +"\\}/ig,'" + arguments[i] + "')");
   }
   return _str;
}


/*********============================== 召测，透抄用多模式提示选择对话框 （结束） ===============================**********/








//覆盖common_ajax.js中方法,取得自定义的图片
		function showWaitTaskDisplay(img,htmlStr,cancel,msg,type){
			var objMask = document.all("_mask");
		    if (!objMask){
		          objMask =document.body.appendChild(document.createElement("DIV"));
		          with(objMask){
		            id = "_mask";
		            className = "msgbox_mask";
		            style.zIndex=99992;
		            style.dispaly="none";
		            style.filter="alpha(opacity=20)";
		        }
			}
		    //判断浏览器的类型begin
		    var browser=navigator.appName 
		    var b_version=navigator.appVersion 
		    var version=b_version.split(";"); 
		    var trim_Version=version[1].replace(/[ ]/g,"");  
		    //判断浏览器的类型end
		    
		    if(img == undefined || img == null){
		        img = "/images/timeSend.gif";
		    }
		    if(htmlStr == undefined || htmlStr == null){
		        htmlStr = "";
		    }
            if(msg == undefined || msg == null){
                msg = "";
                if (type == '1' || type == undefined || type == null) {
                	msg = "第一次召测";
	            }
	            if (type == '2') {
	                msg = "第二次召测";
	            }
            }
            
            var time;
            var taskTime;
            
            if (taskTimeUseFlg == '1') {
            	taskTime = document.getElementById("inputTaskTime");
            	if (taskTime == undefined || taskTime == null){
            		time = 45;
            	} else {
                		time = taskTime.value;
            	}
            } else if ( parent.taskTimeUseFlg == '1') {
            	taskTime = parent.document.getElementById("inputTaskTime");
            	if (taskTime == undefined || taskTime == null){
            		time = 45;
            	} else {
                		time = taskTime.value;
            	}
            } else {
            		time = 45;
            }
            
            
            
		    //背景元素不可操作
		    document.getElementById("_mask").style.display = "";
		    document.getElementById("_mask").style.width = "100%";
		    document.getElementById("_mask").style.height = GetBrowserDocument().scrollHeight + "px";
		    
		   
		    //构造等候提示图
		    var _displayId = "waitdisplay";
		    var objDisp = document.all(_displayId);
		    if (!objDisp){
		         objDisp = document.body.appendChild(document.createElement("DIV"));
		         with(objDisp){
		            id = _displayId;
		            nowrap = true;
		            style.zIndex=99993;
		            
		            style.position = "absolute";
		            style.height = "auto";
		            style.top = "50%";
		            style.left = "50%";
		            style.width=300;
		            style.textAlign="center";
		           // alert(getRequestUrl()  +  "          " +img);
		           
		            if(cancel && msg==""){
		                innerHTML =  "<div id='timeBar' style='float:left;width:280px; height:13px;'></div>"+"<br/><br/><input id='cancelId'  type='button'  value='中止' class=\"btn1_mouseout\"></input> "; 
		            }else if(cancel && msg!=""){
		                innerHTML = "<span style='padding-top:15px;align:center; text-align:center; color:blue;font-size:13px;'>" + msg + "</span>"
		                          + "<br/><div id='timeBar' style='float:left;width:280px; height:13px;'></div>"
		                          + "<br/><br/><input id='cancelId'  type='button'  value='中止' class=\"btn1_mouseout\"></input> ";
		            }else{
		            	//当msg存在的时候，显示msg
		            	if(msg!=""){
			                innerHTML = "<span style='padding-top:15px;align:center; text-align:center; color:blue;font-size:13px;'>" + msg + "</span><br/>" 
			                		  + "<div id='timeBar' style='float:left;width:280px; height:13px;'></div>";
		            	}else{
			                innerHTML = "<div id='timeBar' style='float:left;width:280px; height:13px;'></div>";
		            	}
		            }

		            if(htmlStr!="") innerHTML = htmlStr;
		            style.marginTop = (-document.all(_displayId).offsetHeight/2 + document.body.scrollTop) + "px";
		            style.marginLeft = (-document.all(_displayId).offsetWidth/2 + document.body.scrollLeft) + "px";
		        }
		        
    			    document.getElementById("timeBar").style.position = "relative";
			        document.getElementById("timeBar").style.left = 9;
			        document.getElementById("cancelId").style.position = "relative";
			        document.getElementById("cancelId").style.left = 75;
		        
				document.getElementById("timeBar").style.background = "url("+getRequestUrl()+"/images/timeSendTask.jpg) no-repeat";
		        
		       if(cancel)
		       {
		       		 $("#cancelId").bind('click', function() {
							 
					 disWaitDisplay();
					 
					 if(window.cancelTask)
					 {
					 		 cancelTask();
					 }
					window.clearInterval(timerHandler);
				
					 
					});
		       ;
		       }
 
		       objDisp = document.body.appendChild(document.createElement("DIV"));
		    } else {
		        objDisp.style.display="inline";
		    }
		    //隐藏滚动条
		    document.body.style.overflow = "hidden";
		    
		    // loading
		    for(i = 0; i < TIME_SEND_BLOCK_COUNT; i ++) {
				var timeDiv = '<div id="timeBarBlcok'+i+'" style="width:7px;height:5px;float:left;position:relative;top:3;left:3;"></div>';
				$("#timeBar").append(timeDiv);	
			}
			
			for(i = 0; i < TIME_SEND_BLOCK_COUNT; i ++) {
				$("#timeBarBlcok"+i+"").css("background","url("+getRequestUrl()+"/images/timeSendTaskBlock.png) no-repeat");
				$("#timeBarBlcok"+i+"").css("display","none");
			}
			
		    timeTaskIndex = 0;
			timerHandler = window.setInterval("go()",(parseInt(time)+4)*1000/TIME_SEND_BLOCK_COUNT);
		}
		
		var TIME_SEND_BLOCK_COUNT = 39;
		
		var timeTaskIndex = 0;
		var timerHandler;
		
		function go(){
			if (timeTaskIndex < TIME_SEND_BLOCK_COUNT) {
				$("#timeBarBlcok"+timeTaskIndex+"").css("display","block");
				timeTaskIndex++;
			} 
			
			if (timeTaskIndex == TIME_SEND_BLOCK_COUNT) {
				disWaitDisplay();
				 if(window.cancelTask)
				 {
				 		 cancelTask();
				 }
				window.clearInterval(timerHandler);
			}
		};
		
		function goForCallBack(){
			if (timeTaskIndex < TIME_SEND_BLOCK_COUNT) {
				$("#timeBarBlcok"+timeTaskIndex+"").css("display","block");
				timeTaskIndex++;
				var progress = timeTaskIndex*100/TIME_SEND_BLOCK_COUNT;
				progress = progress.toFixed(0);
				$("#timerText").text(progress+"%");
			} 
			
			if (timeTaskIndex == TIME_SEND_BLOCK_COUNT) {
				//disWaitDisplay();
				 
				 if(typeof callBackFunc == "function")
				 {
				 	callBackFunc();
				 }
				window.clearInterval(timerHandler);
			}
		};
		
		function doTask(){
			if (timeTaskIndex < TIME_SEND_BLOCK_COUNT) {
				$("#timeBarBlcok"+timeTaskIndex+"").css("display","block");
				timeTaskIndex++;
			} 
			
			if (timeTaskIndex == TIME_SEND_BLOCK_COUNT) {
				disWaitDisplay();
				window.clearInterval(timerHandler);
			}
		};
		
		function disWaitTaskDisplay(){
			window.clearInterval(timerHandler);
			$("#timerText").text("100%");
			timerHandler = window.setInterval("doTask()",1000/TIME_SEND_BLOCK_COUNT);
		};
		
		/**
		 *	功能:	带回调函数的遮罩 ssz
		 *	参数:
		 *			无
		 *	返回:	无
		 */
		function showWaitTaskDisplayWithCallBack(img,htmlStr,cancel,msg,callBackFunc,type){
			var objMask = document.all("_mask");
		    if (!objMask){
		          objMask =document.body.appendChild(document.createElement("DIV"));
		          with(objMask){
		            id = "_mask";
		            className = "msgbox_mask";
		            style.zIndex=99992;
		            style.dispaly="none";
		            style.filter="alpha(opacity=20)";
		        }
			}
		    //判断浏览器的类型begin
		    var browser=navigator.appName 
		    var b_version=navigator.appVersion 
		    var version=b_version.split(";"); 
		    var trim_Version=version[1].replace(/[ ]/g,"");  
		    //判断浏览器的类型end
		    
		    if(img == undefined || img == null){
		        img = "/images/timeSend.gif";
		    }
		    if(htmlStr == undefined || htmlStr == null){
		        htmlStr = "";
		    }
            if(msg == undefined || msg == null){
                msg = "";
                if (type == '1' || type == undefined || type == null) {
                msg = "第一次召测";
	            }
	            if (type == '2') {
	                msg = "第二次召测";
	            }
            }
            
            var time;
            var taskTime;
            
            if (taskTimeUseFlg == '1') {
            	taskTime = document.getElementById("inputTaskTime");
            	if (taskTime == undefined || taskTime == null){
            		time = 45;
            	} else {
                		time = taskTime.value;
            	}
            } else if ( parent.taskTimeUseFlg == '1') {
            	taskTime = parent.document.getElementById("inputTaskTime");
            	if (taskTime == undefined || taskTime == null){
            		time = 45;
            	} else {
                		time = taskTime.value;
            	}
            } else {
            		time = 45;
            }
            
		    //背景元素不可操作
		    document.getElementById("_mask").style.display = "";
		    document.getElementById("_mask").style.width = "100%";
		    document.getElementById("_mask").style.height = GetBrowserDocument().scrollHeight + "px";
		    
		   
		    //构造等候提示图
		    var _displayId = "waitdisplay";
		    var objDisp = document.all(_displayId);
		    if (!objDisp){
		         objDisp = document.body.appendChild(document.createElement("DIV"));
		         with(objDisp){
		            id = _displayId;
		            nowrap = true;
		            style.zIndex=99993;
		            
		            style.position = "absolute";
		            style.height = "auto";
		            style.top = "50%";
		            style.left = "50%";
		            style.width=300;
		            style.textAlign="center";
		           // alert(getRequestUrl()  +  "          " +img);
		           
 					if(cancel && msg==""){
		                innerHTML =  "<div id='timeBar' style='float:left;width:280px; height:13px;'></div>"+"<br/><br/><input id='cancelId'  type='button'  value='中止' class=\"btn1_mouseout\"></input> "; 
		            }else if(cancel && msg!=""){
		                innerHTML = "<span style='padding-top:15px;align:center; text-align:center; color:blue;font-size:13px;'>" + msg + "</span>"
		                          + "<br/><span style='align:center; text-align:center; color:blue;font-size:14px;font-weight:bold;' id='timerText'></span><br/><div id='timeBar' style='float:left;width:280px; height:13px;'></div>"
		                          + "<br/><br/><input id='cancelId'  type='button'  value='中止' class=\"btn1_mouseout\"></input> ";
		            }else{
		            	//当msg存在的时候，显示msg
		            	if(msg!=""){
			                innerHTML = "<span style='padding-top:15px;align:center; text-align:center; color:blue;font-size:13px;'>" + msg + "</span><br/>" 
			                		  + "<div id='timeBar' style='float:left;width:280px; height:13px;'></div>";
		            	}else{
			                innerHTML = "<div id='timeBar' style='float:left;width:280px; height:13px;'></div>";
		            	}
		            }

		            if(htmlStr!="") innerHTML = htmlStr;
		            style.marginTop = (-document.all(_displayId).offsetHeight/2 + document.body.scrollTop) + "px";
		            style.marginLeft = (-document.all(_displayId).offsetWidth/2 + document.body.scrollLeft) + "px";
		            
			        document.getElementById("timeBar").style.position = "relative";
			        document.getElementById("timeBar").style.left = 9;
			        document.getElementById("cancelId").style.position = "relative";
			        document.getElementById("cancelId").style.left = 75;
			        
					document.getElementById("timeBar").style.background = "url("+getRequestUrl()+"/images/timeSendTask.jpg) no-repeat";
		        }
		        
		       if(cancel)
		       {
		       		 $("#cancelId").bind('click', function() {
							 
							 	
					 disWaitDisplay();
					 
					 if(typeof callBackFunc == "function")
					 {
					 	callBackFunc();
					 }
					window.clearInterval(timerHandler);
					 
					});
		       ;
		       }
 
		       objDisp = document.body.appendChild(document.createElement("DIV"));
		    } else {
		        objDisp.style.display="inline";
		    }
		    //隐藏滚动条
		    document.body.style.overflow = "hidden";
		    
		    // loading
		    for(i = 0; i < TIME_SEND_BLOCK_COUNT; i ++) {
				var timeDiv = '<div id="timeBarBlcok'+i+'" style="width:7px;height:5px;float:left;position:relative;top:3;left:3;"></div>';
				$("#timeBar").append(timeDiv);	
			}
			
			for(i = 0; i < TIME_SEND_BLOCK_COUNT; i ++) {
				$("#timeBarBlcok"+i+"").css("background","url("+getRequestUrl()+"/images/timeSendTaskBlock.png) no-repeat");
				$("#timeBarBlcok"+i+"").css("display","none");
			}
			
		    timeTaskIndex = 0;
			timerHandler = window.setInterval("goForCallBack()",(parseInt(time))*1000/TIME_SEND_BLOCK_COUNT);
		}
