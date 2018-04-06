
/**
 *  功能: 显示正在执行的提示LOADING图标
 *  preDiv  漂浮在preDiv上， DivIndex  一个页面有多个提示进度时候，给个编号，防止冲突  
 *  memo  提示语句，有默认 正在加载数据...  可以不传
 *  返回: 无
 */
function showWaitDisplayForQuery(preDiv,DivIndex, memo){
	
	var l_Height = preDiv.clientHeight;
    var l_width = preDiv.clientWidth;
    var l_Top = preDiv.offsetTop;
    var l_Left = preDiv.offsetLeft;
    
    var DivId  = "_maskForQuery"+DivIndex;
	
    var objMask = document.getElementById(DivId);
    if (!objMask){
         objMask = document.body.appendChild(document.createElement("DIV"));
          with(objMask){
            id = DivId;
            className = "msgbox_mask";
            style.zIndex=99992;
            style.display="none";
             style.opacity = "0.01";
            style.filter="alpha(opacity=20)";
        }
	 }
		
	  var img = webContextRoot + 'pages/despages/common/images/blue-loading.gif';
	  //判断浏览器的类型begin
	  var browser=navigator.appName; 
	  var b_version=navigator.appVersion; 
	  var version=b_version.split(";"); 
	  //判断浏览器的类型end
	  var htmlStr   = "";
	  //背景元素不可操作
      if(memo == "" || memo == null){
        memo = "正在努力读取数据中...";
      }
//	  document.getElementById(DivId).style.display = "";
//	  document.getElementById(DivId).style.width = l_width + "px";
//	  document.getElementById(DivId).style.height = l_Height + "px";
//	  document.getElementById(DivId).style.top = l_Top + "px";
//	  document.getElementById(DivId).style.left = l_Left + "px";
	  
	  var memotop = l_Top+l_Height/2;
	  var memoleft = l_Left+l_width/2;
	 
	  //构造等候提示图
	  var _displayId = "waitdisplayForQuery"+DivIndex;
	  var objDisp = document.getElementById(_displayId);
	  if (!objDisp){
	       objDisp = document.body.appendChild(document.createElement("DIV"));
	       with(objDisp){
	          id = _displayId;
	          nowrap = true;
	          style.zIndex=99993;
	        
	          style.position = "absolute";
	          style.height = "auto";
	          style.top = memotop + "px";
	          style.left = memoleft + "px";
	          style.width=300;
	          style.textAlign="center";//color:black;
	          innerHTML = "<span id = 'printTest' style='padding-top:15px;align:center; text-align:center; font-size:14px;'><img SRC='"+img+"' ALIGN='absmiddle'> " + memo + "</span>";
	          if(htmlStr!="") innerHTML = htmlStr;
	          style.marginTop = (-document.getElementById(_displayId).offsetHeight/2 + document.body.scrollTop) + "px";
	          style.marginLeft = (-document.getElementById(_displayId).offsetWidth/2 + document.body.scrollLeft) + "px";
	      }
	
	     objDisp = document.body.appendChild(document.createElement("DIV"));
	  } else {
	      objDisp.style.display="inline";
	  }
	  //隐藏滚动条
//	  document.body.style.overflow = "hidden";
}

/**
 *  功能: 不显示正在执行的提示LOADING图标
 *  参数:
 *          无
 *  返回: 无
 */
function disWaitDisplayForQuery(DivIndex){
	
	var DivId  = "_maskForQuery"+DivIndex;
    //去除提示
    var _displayId = "waitdisplayForQuery"+DivIndex;
    var objDisp = document.getElementById(_displayId);
    if(objDisp){
        document.body.removeChild(objDisp);
    }
    //去除屏障
    var _maskId = DivId;
	var objMask = document.getElementById(_maskId);
	if(objMask){
		document.body.removeChild(objMask);
	}
    //恢复滚动条
//    document.body.style.overflow = "";
}

/**
 *  功能: 显示正在执行的提示LOADING图标
 *  参数: img 指定图片名称，如果不填为默认图片(指定的图片放在syscom/images/下)
 *          
 *  返回: 无
 */
function showWaitDisplayForSave(path, memo){
      var objMask = document.getElementById("_maskForSave");
        if (!objMask){
             objMask = document.body.appendChild(document.createElement("DIV"));
              with(objMask){
                id = "_maskForSave";
                className = "msgbox_mask";
                style.zIndex=99992;
                style.dispaly="none";
                style.filter="alpha(opacity=20)";
            }
        }
      if(memo == "" || memo == null){
        memo = "正在保存数据...";
      }
      var img = arguments[0]+ "resources/ext-2.2.1/resources/images/default/shared/blue-loading.gif";
      //判断浏览器的类型begin
      var browser=navigator.appName; 
      var b_version=navigator.appVersion; 
      var version=b_version.split(";"); 
      var trim_Version=version[1].replace(/[ ]/g,"");  
      //判断浏览器的类型end
      var htmlStr   = "";
      //背景元素不可操作
      document.getElementById("_maskForSave").style.display = "";
      document.getElementById("_maskForSave").style.width = "100%";
      document.getElementById("_maskForSave").style.height = GetBrowserDocument().scrollHeight + "px";
     
      //构造等候提示图
      var _displayId = "waitdisplayForSave";
      var objDisp = document.getElementById(_displayId);
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
              innerHTML = "<span style='padding-top:15px;align:center; text-align:center; color:blue;font-size:14px;'><img SRC='"+img+"' ALIGN='absmiddle'> " + memo +"</span>";
              if(htmlStr!="") innerHTML = htmlStr;
              style.marginTop = (-document.getElementById(_displayId).offsetHeight/2 + document.body.scrollTop) + "px";
              style.marginLeft = (-document.getElementById(_displayId).offsetWidth/2 + document.body.scrollLeft) + "px";
          }
    
         objDisp = document.body.appendChild(document.createElement("DIV"));
      } else {
          objDisp.style.display="inline";
      }
      //隐藏滚动条
      document.body.style.overflow = "hidden";
}

/**
 *  功能: 不显示正在执行的提示LOADING图标
 *  参数:
 *          无
 *  返回: 无
 */
function disWaitDisplayForSave(){
    //去除提示
    var _displayId = "waitdisplayForSave";
    var objDisp = document.getElementById(_displayId);
    if(objDisp){
        document.body.removeChild(objDisp);
    }
    //去除屏障
    var _maskId = "_maskForSave";
    var objMask = document.getElementById(_maskId);
    if(objMask){
        document.body.removeChild(objMask);
    }
    //恢复滚动条
    document.body.style.overflow = "";
}

