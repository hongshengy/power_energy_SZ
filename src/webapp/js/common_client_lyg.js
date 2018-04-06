//验证数据类型
var int_type = "int";
var float_type = "float";
var string_type = "string";
var date_type = "date";
 /**
 *	功能:	获取当前显示分辨率宽度
 *	参数:	
 *			无
 *	返回:	宽度
 */
function getScreenWidth(){
	return window.screen.width;
}

/**
 *	功能:	获取当前显示分辨率高度
 *	参数:	
 *			无
 *	返回:	高度
 */
function getScreenHeight(){
	return window.screen.height;
}

/**
 *  功能描述		: 获取访问路径地址 比如：http://localhost:8080/sgpmss
 *  输入参数		: 无
 *  输出参数	    : 路径地址
 */
function getRequestUrl(){
		var requestUrl = '';
		if(requestUrl == ''){
			var pathname = document.location.pathname;
			var tmppath = pathname.substring(1);
			requestUrl = tmppath.substring(0,tmppath.indexOf('/'));		
			requestUrl = 'http://' + document.location.host + '/' + requestUrl + '/';	
		}
		return requestUrl;	
}

/**
 *  功能描述		: 获取访问路径地址 比如：http://localhost:8080/sgpmss
 *  输入参数		: 无
 *  输出参数	    : 路径地址
 */
function getRequestUrl(){
		var requestUrl = '';
		if(requestUrl == ''){
			var pathname = document.location.pathname;
			var tmppath = pathname.substring(0,1);
			if(tmppath == '/') {
				pathname = pathname.substring(1);
			}
			pathname = pathname.substring(0,pathname.indexOf('/'));
			requestUrl = 'http://' + document.location.host + '/' + pathname + '/';	
		}
		return requestUrl;	
}


/**
 *	功能:	获取当前页面或当前Frame的Url
 *	参数:	
 *			无
 *	返回:	string, 当前页面或当前Frame的Url
 */
function getReloadUrl(){
	return document.location.href;
}

/**
 *	功能:	获取指定Url中指定参数的值
 *	参数:	
 *			url				:	string, 指定Url
 *			name			:	string, 指定参数名称
 *	返回:	string, 指定Url中指定参数的值
 */
function getUrlParamValue(url, name){

	if(url == null || url == "")
	{
		msg_error_debug = "getUrlParamValue函数的第一个参数为空！";
		return null;
	}
	if(name == null || name == "")
	{
		msg_error_debug = "getUrlParamValue函数的第二个参数为空！";
		return null;
	}
	
	var s=unescape(url);
	var reg = new RegExp("&?"+name+"=([^&]*)","i");
	var arr=s.match(reg);
	if(arr==null) return null;
	else return arr[1];
}

/**
 *	功能:	设置或者添加指定Url中指定参数的值, 若指定参数在指定Url中不存在, 则在指定Url中添加该参数
 *	参数:
 *			url				:	string, 指定Url
 *			name			:	string, 指定参数名称
 *			value			:	string, 指定参数的值
 *	返回:	string, 在指定Url上设置指定参数值之后的新Url
 */
function setUrlParamValue(url, name, value){
	if(url == null || url == "")
		return null;
	if(name == null || name == "")
		return null;
	if(value == null || value == "")
		return null;
		
	var tempArr, tempArr2, tempUrl, tempUrl2;
	var nFlag = false;
	tempUrl = "", tempUrl2 = "";
	if(url.indexOf("?") != -1 && url.split("?").length>1) {
		tempUrl2 = url.split("?")[1];
		url = url.split("?")[0];

		tempArr = tempUrl2.split("&");
		for(var i = 0; i < tempArr.length; i++)
		{
			tempArr2 = tempArr[i].split("=");
			if(tempArr2.length >= 2)
			{
				if(tempArr2[0].trim().toLowerCase() == name.trim().toLowerCase())
				{
					tempUrl = tempUrl + tempArr2[0] + "=" + value;
					nFlag = true;
				}
				else
				{
					tempUrl = tempUrl + tempArr2[0] + "=" + tempArr2[1];
					if(tempArr2.length > 2)
					{
						for(var j = 2; j < tempArr2.length;j++)
						{
							tempUrl = tempUrl + "=" + tempArr2[j];
						}
					}
				}
			}
			else
			{
				if(tempArr2.length > 0)
					tempUrl = tempUrl +	tempArr2[0];
			}
			if(i < tempArr.length - 1)
				tempUrl = tempUrl + "&";
		}
		if(nFlag == false)
		{
			if (tempUrl.charAt(tempUrl.length - 1) == "&"){
				tempUrl = tempUrl + name + "=" + value;
			}else{
				tempUrl = tempUrl + "&" + name + "=" + value;
			}
		}
	} else {
		tempUrl = tempUrl + name + "=" + value;
	}
	return url+"?"+tempUrl;
}

/**
 *	功能:	从指定Url中删除指定参数
 *	参数:
 *			url				:	string, 指定Url
 *			name			:	string, 指定参数
 *	返回:	string, 在指定Url上删除指定参数之后的新Url
 */
function removeUrlParam(url, name){
	if(url == null || url == "")
		return null;
	if(name == null || name == "")
		return null;

	var tempArr, tempArr2, tempUrl, tempUrl2;
	tempUrl = "",tempUrl2 = "";
	if(url.indexOf("?") != -1 && url.split("?").length>1) {
		tempUrl2 = url.split("?")[1];
		url = url.split("?")[0];
	
		tempArr = tempUrl2.split("&");
		for(var i = 0; i < tempArr.length; i++)
		{
			tempArr2 = tempArr[i].split("=");
			if(tempArr2.length >= 2)
			{
				if(tempArr2[0].trim().toLowerCase() == name.trim().toLowerCase())
				{
					//tempUrl = tempUrl + tempArr2[0] + "=" + value;
					continue;
				}
				else
				{
					tempUrl = tempUrl + tempArr2[0] + "=" + tempArr2[1];
					if(tempArr2.length > 2)
					{
						for(var j = 2; j < tempArr2.length;j++)
						{
							tempUrl = tempUrl + "=" + tempArr2[j];
						}
					}
				}
			}
			else
			{
				if(tempArr2.length > 0)
					tempUrl = tempUrl +	tempArr2(0);
			}
			if(i < tempArr.length - 1)
				tempUrl = tempUrl + "&";
		}
	}
	if(tempUrl != "")
		url = url+"?"+tempUrl
	
	return url;
}

/**
 *	功能:	当前页面重新刷新
 *	参数:
 *			无
 *	返回:	无
 */
function pageReload(){
	document.location.href = getReloadUrl();
}

/**
 *	功能:	当前页面跳转到指定Url页面
 *	参数:
 *			url				:	string, 指定Url
 *	返回:	无
 */
function pageGoToUrl(url){
	if(typeof(url) == "undefined" || url == "" || url == null)
	{
		pageReload();
	}
	else
		document.location.href = url;
}

/**
 *	功能:	当前页面返回上个页面
 *	参数:	
 *			无
 *	返回:	
 */
function pageGoToBack(){
	return history.back();
}

/**
 *	功能:	设置按扭为不可用状态，支持普通按扭、图片按扭、链接按扭
 *	参数:	elSource 	按扭名称或对象
 *			
 *	返回:	无
 */
function buttonSetDisabled(elSource){
	var toolButton;
	//exception check
	if(elSource == null) return;

	if(typeof(elSource) == "string"){
		toolButton = document.all(elSource);
		//exception check
		if(toolButton == null)  return;
		if(typeof(toolButton.length) != "undefined")  return;

	}
	else if(typeof(elSource) == "object")
		toolButton = elSource;
		
	if(toolButton.tagName.toLowerCase() == "input"){
		toolButton.disabled = true;
	}else{
		if(toolButton.onclick && toolButton.onclick != "") {
			toolButton.setAttribute("onclick_bak", toolButton.onclick);
			toolButton.setAttribute("onclick", "");
		}
		
		if(toolButton.tagName.toLowerCase() == "img"){
			toolButton.style.filter = "progid:DXImageTransform.Microsoft.BasicImage (grayScale=1)";
		}
		else if(toolButton.tagName.toLowerCase() == "a"){
			toolButton.disabled = true;
		}
	}
}


/**
 *	功能:	设置按扭为可用状态，支持普通按扭、图片按扭、链接按扭
 *	参数:	elSource 	按扭名称或对象
 *			
 *	返回:	无
 */
function buttonSetNotDisabled(elSource){
	var toolButton;
	//exception check
	if(elSource == null) return;

	if(typeof(elSource) == "string"){
		toolButton = document.all(elSource);
		//exception check
		if(toolButton == null)  return;
		if(typeof(toolButton.length) != "undefined")  return;

	}
	else if(typeof(elSource) == "object")
		toolButton = elSource;
		
	if(toolButton.tagName.toLowerCase() == "input"){
		toolButton.disabled = false;
	}else{
		if(toolButton.getAttribute("onclick_bak"))
			toolButton.setAttribute("onclick", toolButton.getAttribute("onclick_bak"));
		
		if(toolButton.tagName.toLowerCase() == "img"){
			toolButton.style.filter = "";
		}
		else if(toolButton.tagName.toLowerCase() == "a"){
			toolButton.disabled = false;
		}
	}
}

/**
 *	功能:	设置input元素为只读
 *	参数:
 *			elSource			:	string/object
 *									
 *	返回:	无
 */
function inputSetReadOnly(elSource)
{
	var fieldElement;
	//exception check
	if(elSource == null) return;
	
	var elSourceId, tableElement, cbArray, selcArray, idx;
	if(typeof(elSource) == "string")
	{
		fieldElement = document.all(elSource);
		//exception check
		if(fieldElement == null) return;

		if(typeof(fieldElement.type) == "undefined") return;
	}
	else if(typeof(elSource) == "object")
		fieldElement = elSource;
	
	fieldElement.disabled = true;
	if(fieldElement.tagName.toLowerCase() == "select")
	{
		if(fieldElement.selectedIndex != -1)
			fieldElement.options[fieldElement.selectedIndex].className += "eftReadOnly"; 
	}
	fieldElement.className += " eftReadOnly"; 
}

/**
 *	功能:	设置input元素不为只读
 *	参数:
 *			elSource			:	string/object
 *								
 *	返回:	无
 */
function inputSetDisReadOnly(elSource)
{
	var fieldElement;
	//exception check
	if(elSource == null) return;
	
	var elSourceId, tableElement, cbArray, selcArray, idx;
	if(typeof(elSource) == "string")
	{
		fieldElement = document.all(elSource);
		//exception check
		if(fieldElement == null) return;

		if(typeof(fieldElement.type) == "undefined") return;
	}
	else if(typeof(elSource) == "object")
		fieldElement = elSource;
		
	
	if(fieldElement.className.indexOf("eftReadOnly") != -1 || fieldElement.className.indexOf("eftDisabled") != -1)
	{
		fieldElement.disabled = false;
		if(typeof(fieldElement.readOnly) != "undefined")
		{
			fieldElement.readOnly = false;
		}
		fieldElement.className = fieldElement.className.replaceAll("eftReadOnly","");
		fieldElement.className = fieldElement.className.replaceAll("eftDisabled","");
		if(fieldElement.tagName.toLowerCase() == "select")
		{
			if(fieldElement.selectedIndex != -1)
			{
				fieldElement.options[fieldElement.selectedIndex].className = fieldElement.options[fieldElement.selectedIndex].className.replaceAll("eftReadOnly",""); 
				fieldElement.options[fieldElement.selectedIndex].className = fieldElement.options[fieldElement.selectedIndex].className.replaceAll("eftDisabled",""); 
			}
		}
	} 
}

/**
 *	功能:	通过按下回车键直接触发指定的处理函数或提交表单
 *			使用在onkeydown=''事件上
 *	参数:	funName		需要执行的函数名。如：'a()'
 *			
 *	返回:	无
 */
function enterKeyPress(funName){

	 var oSrcElement = event.srcElement;
	 var oSrcForm = oSrcElement;

	 if(event.keyCode == 13){
		if(funName == undefined || funName == null || funName == ""){
			while(oSrcForm.tagName.toLowerCase() != "form")
			{
				oSrcForm = oSrcForm.parentElement;
			}
			if(oSrcForm != null){
				oSrcForm.submit();
			}
		} else {
			eval(funName);
		}
	 }
}

/**
 *	功能:	通过按下Ctrl＋回车键直接触发指定的处理函数或提交表单
 *	使用：	加在onkeydown=''事件上
 *	参数:	funName		需要执行的函数名。如：'a()'
 *			
 *	返回:	无
 */
function ctrlEnterKeyPress(funName){

	 var oSrcElement = event.srcElement;
	 var oSrcForm = oSrcElement;

	 if(event.ctrlKey && event.keyCode == 13){
		if(funName == undefined || funName == null || funName == ""){
			while(oSrcForm.tagName.toLowerCase() != "form")
			{
				oSrcForm = oSrcForm.parentElement;
			}
			if(oSrcForm != null){
				oSrcForm.submit();
			}
		} else {
			eval(funName);
		}
	 }
}

/**
 *	功能:	实现对文本框防止屏蔽一些特殊字符
 *	使用：	加在onkeyup='shieldInput()'事件上
 *	参数:
 *			无
 *	返回:	无
 */
function shieldInput(){
	var oSrcElement = event.srcElement;
	var strvalue = oSrcElement.value;
	var strValueOri = strvalue;
	strvalue = strvalue.replaceEach("'","＇","‘","’",'');
    strvalue = strvalue.replaceEach("!","！","！","！",'');
    strvalue = strvalue.replaceEach('^','＾','……','……','');
    strvalue = strvalue.replaceEach('&','＆','&','＆','');
    strvalue = strvalue.replaceEach('?','？','？','？','');
    strvalue = strvalue.replaceEach('~','～','~','～','');
    strvalue = strvalue.replaceEach('<','＜','《','《','');
    strvalue = strvalue.replaceEach('>','＞','》','》','');
    strvalue = strvalue.replaceEach('/','／','、','、','');
    strvalue = strvalue.replaceEach(' ','　',' ','　','');
    strvalue = strvalue.replaceEach("=","＝","=","＝",'');
    strvalue = strvalue.replaceEach("`","｀","·","·",'');
    strvalue = strvalue.replaceEach("#","＃","#","＃",'');
    strvalue = strvalue.replaceEach("$","＄","￥","￥",'');
    strvalue = strvalue.replaceEach("{","｛","{","｛",'');
    strvalue = strvalue.replaceEach("}","｝","}","｝",'');
    strvalue = strvalue.replaceEach("\\","＼＼","、、","＼＼",'');
    strvalue = strvalue.replaceEach("|","｜","|","｜",'');
    strvalue = strvalue.replaceEach("%","％","%","％",'');
    strvalue = strvalue.replaceEach("*","＊","*","*",'');
    strvalue = strvalue.replaceEach("+","＋","+","＋",'');
    strvalue = strvalue.replaceEach(",","，","，","，",'');
    strvalue = strvalue.replaceEach("\"","＼","、","＼",'');
    strvalue = strvalue.replaceEach("_","＿","——","——",'');
    strvalue = strvalue.replaceEach("","．","。","。",'');
    strvalue = strvalue.replaceEach(";","；","；","；",'');
    strvalue = strvalue.replaceEach(":","：","：","：",'');
    strvalue = strvalue.replaceEach("[","［","【","【",'');
    strvalue = strvalue.replaceEach("]","］","】","】",'');
    strvalue = strvalue.replaceEach("@","＠","@","＠",'');
    strvalue = strvalue.replaceEach("(","（","（","（",'');
    strvalue = strvalue.replaceEach(")","）","）","）",'');
    if(strValueOri != strvalue)
		oSrcElement.value = strvalue;
}
/**
 *	功能:	实现对文本框屏蔽一些html特殊字符
 *	使用：	加在onkeyup='shieldInput3()'事件上
 *	参数:
 *			无
 *	返回:	无
 */
function shieldHtmlInput(){
	var oSrcElement = event.srcElement;
	var strvalue = oSrcElement.value;
	var strValueOri = strvalue;
	strvalue = strvalue.replaceEach("'","<",">","\"",'\'');
    strvalue = strvalue.replaceEach("%","","","",'');
    if(strValueOri != strvalue)
		oSrcElement.value = strvalue;
}

/**
 *	功能:	实现对文本框防止屏蔽一些特殊字符(除了",")
 *	使用：	加在onkeyup='shieldInput()'事件上
 *	参数:
 *			无
 *	返回:	无
 */
function shieldInput1(){
	var oSrcElement = event.srcElement;
	var strvalue = oSrcElement.value;
	var strValueOri = strvalue;
	strvalue = strvalue.replaceEach("'","＇","‘","’",'');
    strvalue = strvalue.replaceEach("!","！","！","！",'');
    strvalue = strvalue.replaceEach('^','＾','……','……','');
    strvalue = strvalue.replaceEach('&','＆','&','＆','');
    strvalue = strvalue.replaceEach('?','？','？','？','');
    strvalue = strvalue.replaceEach('~','～','~','～','');
    strvalue = strvalue.replaceEach('<','＜','《','《','');
    strvalue = strvalue.replaceEach('>','＞','》','》','');
    strvalue = strvalue.replaceEach('/','／','、','、','');
    strvalue = strvalue.replaceEach(' ','　',' ','　','');
    strvalue = strvalue.replaceEach("=","＝","=","＝",'');
    strvalue = strvalue.replaceEach("`","｀","·","·",'');
    strvalue = strvalue.replaceEach("#","＃","#","＃",'');
    strvalue = strvalue.replaceEach("$","＄","￥","￥",'');
    strvalue = strvalue.replaceEach("{","｛","{","｛",'');
    strvalue = strvalue.replaceEach("}","｝","}","｝",'');
    strvalue = strvalue.replaceEach("\\","＼＼","、、","＼＼",'');
    strvalue = strvalue.replaceEach("|","｜","|","｜",'');
    strvalue = strvalue.replaceEach("%","％","%","％",'');
    strvalue = strvalue.replaceEach("*","＊","*","*",'');
    strvalue = strvalue.replaceEach("+","＋","+","＋",'');
    strvalue = strvalue.replaceEach("，","，","，",'');
    strvalue = strvalue.replaceEach("\"","＼","、","＼",'');
    strvalue = strvalue.replaceEach("_","＿","——","——",'');
    strvalue = strvalue.replaceEach("","．","。","。",'');
    strvalue = strvalue.replaceEach(";","；","；","；",'');
    strvalue = strvalue.replaceEach(":","：","：","：",'');
    strvalue = strvalue.replaceEach("[","［","【","【",'');
    strvalue = strvalue.replaceEach("]","］","】","】",'');
    strvalue = strvalue.replaceEach("@","＠","@","＠",'');
    strvalue = strvalue.replaceEach("(","（","（","（",'');
    strvalue = strvalue.replaceEach(")","）","）","）",'');
    if(strValueOri != strvalue)
		oSrcElement.value = strvalue;
}

//只能输入数字的js
function numOnlyInput(){ 
        var av = event.srcElement.value;
        var avlen = av.length;
        var reg = new RegExp("^[0-9]$");
        for(var i=0;i<avlen;i++){
            var aav = av.charAt(i);
            if( !aav.match(reg) ){
                var oSrcElement = event.srcElement;
                var strvalue = oSrcElement.value;
                strvalue = strvalue.replaceAll(aav,'');
                oSrcElement.value = strvalue;
            }
        }
}  

/**
 *	功能:	实现对文本框限制输入的长度
 *	使用：	加在onKeyUp='shieldTextCounter(this,10)'事件上
 *	参数:
 *			无
 *	返回:	无
 */
function shieldTextCounter(field,maxlimit){
	var str="";
	str=field.value;
	str=str.replace(/[^\x00-\xff]/g,"**"); 
	if (str.length > maxlimit) {
		// field.value = field.value.substring(0, maxlimit);
		field.value=getByteOfNum(field.value,maxlimit);
		//if(field.onchange!=null) field.onchange();
	}
	
	function getByteOfNum(val, num) {
  		var ch,bytenum=0;
  		var rs = "";
  		var pt = /[^\x00-\xff]/;
		for (var i=0; i < num; i++) {
   			ch = val.substr(i, 1);
   			if (ch.match(pt)) {
    			bytenum += 2;
    			if (bytenum > num) {
     				return rs;
    			}
  	 		}else{
    			bytenum += 1;
   			}
   			rs += ch;
   			if (bytenum == num) {
    			return rs;
   			}
  		}
  		return rs;
 	}
}

/**
 *	功能:	去除字符串空格
 *	使用：	字符串变量.trim()	如：s.trim()	
 *	参数:
 *			无
 *	返回:	无
 */
String.prototype.trim = function(){
	return this.replace(/(^\s*)|(\s*$)/g,"");
}

/**
 *	功能:	替换字符串所有指定的字符
 *	使用：	字符串变量.replaceAll()	如：s.replaceAll('a','')	
 *	参数:
 *			无
 *	返回:	无
 */
String.prototype.replaceAll = function(regex,replacement){
	var va=this;
	var temp=va.replace(regex,replacement);
	while(temp!=va){
		va=temp;
		temp=va.replace(regex,replacement);
	}
	return va;
}



String.prototype.replaceEach = function(regex1,regex2,regex3,regex4,replacement){
    var inputValue = this;
    inputValue = inputValue.replaceAll(regex1,'');
    inputValue = inputValue.replaceAll(regex2,'');
    inputValue = inputValue.replaceAll(regex3,'');
    inputValue = inputValue.replaceAll(regex4,'');
    return inputValue;
}

/**
 *	功能:	设置cookie
 *	参数:	cookieName		cookie名称
 *			cookieValue		cookie值
 *			expires			有效限期, 失效日期
 *			path			路径
 *			domain			范围, 领域
 *			secure			安全的, 可靠的
 *			
 *	返回:	无
 */
function setCookie(cookieName, cookieValue, expires, path, domain, secure) {
	document.cookie =
			escape(cookieName) + '=' + escape(cookieValue)
			+ (expires ? '; expires=' + expires.toGMTString() : '')
			+ (path ? '; path=' + path : '')
			+ (domain ? '; domain=' + domain : '')
			+ (secure ? '; secure' : '');
}

/**
 *	功能:	获取cookie
 *	参数:	cookieName	cookie名称
 *			
 *	返回:	无
 */
function getCookie(cookieName){
	var cookieValue = '';
	var posName = document.cookie.indexOf(escape(cookieName) + '=');
	if (posName != -1) {
		var posValue = posName + (escape(cookieName) + '=').length;
		var endPos = document.cookie.indexOf(';', posValue);
		if (endPos != -1) cookieValue = unescape(document.cookie.substring(posValue, endPos));
		else cookieValue = unescape(document.cookie.substring(posValue));
	}
	return (cookieValue);
}

/**
 *	功能:	打开弹出窗口
 *	参数:	url			链界地址 String that specifies the URL of the document to display
 *			winName		窗口名 This name is used as the value for the TARGET attribute on a form or an a element.
 *			width		宽值	width
 *			height		高值 height
 *			
 *	返回:	无
 */
function OpenWin(url, winName, width, height, properties) 
{
	properties = properties || {};
	xposition=0; yposition=0;
    
	if ((parseInt(navigator.appVersion) >= 4 ))
	{
		xposition = (screen.width - width) / 2;
		yposition = (screen.height - height) / 2;
	}
	if(typeof properties.resizable == 'undefined'){
		properties.resizable = 1;
	}
	if(typeof properties.scrollbars == 'undefined'){
		properties.scrollbars = 1;
	}
	theproperty = "width=" + width + "," 
		+ "height=" + height + "," 
		+ "location=0," 
		+ "menubar=0,"
		+ "resizable="+properties.resizable+","
		+ "scrollbars="+properties.scrollbars+","
		+ "status=1," 
		+ "titlebar=0,"
		+ "toolbar=0,"
		+ "hotkeys=0,"
		+ "screenx=" + xposition + "," //仅适用于Netscape
		+ "screeny=" + yposition + "," //仅适用于Netscape
		+ "left=" + xposition + "," //IE
		+ "top=" + yposition; //IE 
		try{
			monwin = window.open(url,winName,theproperty,false);
			monwin.focus();
		}catch(e){
		
		}
}

//add by zhulin 不可拖动窗体大小
function OpenWinUnRes(url, winName, width, height, isClosed) 
{
	xposition=0; yposition=0;
    
	if ((parseInt(navigator.appVersion) >= 4 ))
	{
		xposition = (screen.width - width) / 2;
		yposition = (screen.height - height) / 2;
	}
	theproperty = "width=" + width + "," 
		+ "height=" + height + "," 
		+ "location=0," 
		+ "menubar=0,"
		+ "resizable=0,"
		+ "scrollbars=1,"
		+ "status=1," 
		+ "titlebar=0,"
		+ "toolbar=0,"
		+ "hotkeys=0,"
		+ "screenx=" + xposition + "," //仅适用于Netscape
		+ "screeny=" + yposition + "," //仅适用于Netscape
		+ "left=" + xposition + "," //IE
		+ "top=" + yposition; //IE 
	monwin = window.open(url,winName,theproperty,false);
	if(isClosed) {
		monwin.close();
		monwin = window.open(url,winName,theproperty,false);	
	}
	monwin.focus();
}

/*
 * add by cjh 当模态窗口打开非模态窗口时，部分ie浏览器报错，采用此方法
 * closeFn是窗口关闭后，需要回调的方法名称，例如：'reload'；closeFn方法可以带有参数
 * 例子：可参考meterReadyDataSetDetail.jsp
 */
function OpenWinUnResForMWin(url, winName, width, height, closeFn/*string*/) 
{
	xposition=0; yposition=0;
	if ((parseInt(navigator.appVersion) >= 4 )){
		xposition = (screen.width - width) / 2;
		yposition = (screen.height - height) / 2;
	}
	theproperty = "width=" + width + "," 
		+ "height=" + height + "," 
		+ "location=0," 
		+ "menubar=0,"
		+ "resizable=0,"
		+ "scrollbars=1,"
		+ "status=1," 
		+ "titlebar=0,"
		+ "toolbar=0,"
		+ "hotkeys=0,"
		+ "screenx=" + xposition + "," //仅适用于Netscape
		+ "screeny=" + yposition + "," //仅适用于Netscape
		+ "left=" + xposition + "," //IE
		+ "top=" + yposition; //IE 
	var name = winName;
	if($.browser.msie){
		var win = window;
		if (window.dialogArguments) {
			name = winName+"dA";
			win = window.dialogArguments[0];
			if(typeof closeFn != 'undefined'){
				win[closeFn] = function(){
					window[closeFn](arguments);
				}
			}
		}
		
		monwin = win.open(url,name,theproperty,false);
	}else{
		monwin = window.open(url,name,theproperty,false);
	}
	monwin.focus();
}
//========弹出模式对话框
function OpenModalDialog(url,name,width,height) 
{	
	var windowArray = window.dialogArguments;
	if(typeof(windowArray)=='object'){
		windowArray.push(window);
	}else{
		windowArray = [];
		windowArray.push(window);
	}
	var retvalue = window.showModalDialog(url,windowArray,"dialogWidth:"+width+"px;dialogHeight:"+height+"px; target:_self;center:yes;status:no;scroll:auto;help:no","");
    return retvalue;
}

/**
 *	功能:	查找对象(框架中使用)
 *	参数:
 *			无
 *	返回:	无
 */
function findObj(theObj, theDoc)
{
  var p, i, foundObj;
  
  if(!theDoc) theDoc = document;
  if( (p = theObj.indexOf("?")) > 0 && parent.frames.length)
  {
    theDoc = parent.frames[theObj.substring(p+1)].document;
    theObj = theObj.substring(0,p);
  }
  if(!(foundObj = theDoc[theObj]) && theDoc.all) foundObj = theDoc.all[theObj];
  for (i=0; !foundObj && i < theDoc.forms.length; i++) 
    foundObj = theDoc.forms[i][theObj];
  for(i=0; !foundObj && theDoc.layers && i < theDoc.layers.length; i++) 
    foundObj = findObj(theObj,theDoc.layers[i].document);
  if(!foundObj && document.getElementById) foundObj = document.getElementById(theObj);
  
  return foundObj;
}


/**
 *	功能:	将文本框获得焦点变化样式事件(全局样式使用)
 *	参数:
 *			无
 *	返回:	无

function suckerfish(type, tag, parentId)
{
	if (window.attachEvent)
	{
		window.attachEvent("onload", function()
		{
			var sfEls = (parentId==null)?

			document.getElementsByTagName(tag):document.getElementById(parentId).getElementsByTagName(tag);
			type(sfEls);
		});
	}
}

sfFocus = function(sfEls)
{
	for (var i=0; i<sfEls.length; i++)
	{
		//排除的内容
		if(sfEls[i].type == "button" || sfEls[i].name == "jumpPage"){
			continue;
		}
		
		sfEls[i].attachEvent("onfocus",function(e)
		{
			e=e||event;(e.srcElement||e.target).className+=" sffocus";
			//if( this.value == this.defaultValue ) { this.value = ""; }
		});
		
		sfEls[i].attachEvent("onblur",function(e)
		{
			e=e||event;(e.srcElement||e.target).className
				=(e.srcElement||e.target).className.replace(new RegExp(" sffocus\\b"), "");
			//if( this.value == "" ) { this.value = this.defaultValue; }
		});
	}
}
suckerfish(sfFocus, "INPUT");
suckerfish(sfFocus, "TEXTAREA"); 
 */


/*********============================== 多模式提示选择对话框 （开始） ===============================**********/
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

var MB_STR = '<style type="text/css"><!--' +
			'body{margin:0px;}' +
			'.msgbox_title{height:23px;font-weight: bold;position:relative;font-size:12px;COLOR: white;line-height:23px;padding-left:10px;border-bottom:0px solid #000;background: url('+getRequestUrl()+'images/aueic/buttonBg.jpg) repeat-x left top;}' +
			'.msgbox_control{text-align:center;clear:both;height:30px;}' +
			'.msgbox_button{background-color: #B1CDF3;border:1px solid #003366;font-size:12px;line-height:20px;height:21px;}' +
			'.msgbox_content{padding-top:40px;float:left;line-height: 20px; width:240px; text-align:left;}' +
			'.msgbox_icon{width: 60px;height: 90px;float: left;text-align: center;line-height:50px;padding-top:35px;}' +
			'.msgbox_mask{position:absolute;left:0px;top:0px;background-color:#333333;width:100%;height:100%;}' +
			'.msgbox{background-color: #EFFAFE;position: absolute;font-size:12px;width:300px; height:150px; margin-top: -100px; margin-left: -150px;top:50%;left:50%;border:1px solid #999999;}' +
			'--></style>' +
			//"<iframe id='msgBack' style=\"filter: alpha(opacity=0);position:absolute;z-index:99998;display:none;width:expression(this.nextSibling.offsetWidth);height:expression(this.nextSibling.offsetHeight);top:expression(this.nextSibling.offsetTop);left:expression(this.nextSibling.offsetLeft);\" frameborder=0 ></iframe>" +
			'<div id="msgBoxMask" class="msgbox_mask" style="filter: alpha(opacity=0);z-index:99999;display:none;">' +
			'<html><head></head><base target="_self"><body><iframe style="position:absolute;top:0px; left:0px;z-index:-1;width:2000px;height:2000px;border:0;" frameborder=0 scrolling=no></iframe></body></html>'+
			'</div>' +
			'<div class="msgbox" style="display:none; z-index:100000;" id="msgBox">' +
			'<div class="msgbox_title" id="msgBoxTitle"></div>' +
			'<div class="msgbox_icon" id="msgBoxIcon"></div>' +
			'<div class="msgbox_content" id="msgBoxContent"></div>' +
			'<div class="msgbox_control" id="msgBoxControl"></div>' +
			'</div>';

var Timer = null;

document.write(MB_STR);
var icon = new Image();
icon.src = T_ICON;

/* 提示对话框
 * 参数 1 : 提示内容
 * 参数 2 : 提示标题
 * 参数 3 : 图标路径
 * 参数 4 : 按钮类型
*/

function MessageBox(){
   var _content = arguments[0] || "这是一个对话框！";
   var _title   = arguments[1] || "系统提示";
   var _type    = arguments[2] || "INFO";
   var _button  = arguments[3] || MB_OK;
   MB_BACKCALL  = arguments[4];
   
   var _iconStr = '<img src="{0}">';
   var _btnStr  = '<input name="{0}" id="{0}" type="button" class="btn" onmouseover="this.className=\'btn1_mouseover\'" onmouseout="this.className=\'btn1_mouseout\'" value="{1}" onclick="MBMethod(this)" />';
   
   
   switch(_button)
   {      
	  case MB_CANCEL      : _btnStr = _btnStr.toFormatString("msgBoxBtnCancel", MB_CANCEL_TEXT); break;
	 
	  case MB_YES         : _btnStr = _btnStr.toFormatString("msgBoxBtnYes", MB_YES_TEXT); break;
	  
	  case MB_NO          : _btnStr = _btnStr.toFormatString("msgBoxBtnNo", MB_NO_TEXT); break;
	  
	  case MB_OKCANCEL    : 
	       _btnStr = _btnStr.toFormatString("msgBoxBtnOk", MB_OK_TEXT) + "&nbsp;&nbsp;" +
 		             _btnStr.toFormatString("msgBoxBtnCancel", MB_CANCEL_TEXT); 
		   break;
	  case MB_OK    : 
	       _btnStr = _btnStr.toFormatString("msgBoxBtnOk", MB_OK_TEXT) ; 
		   break;		   
		   
	  case MB_YESNO       :
	        _btnStr = _btnStr.toFormatString("msgBoxBtnYes", MB_YES_TEXT) + "&nbsp;&nbsp;" +
		              _btnStr.toFormatString("msgBoxBtnNo", MB_NO_TEXT); 
		    break;
		 
	  case MB_YESNOCANCEL :
	        _btnStr = _btnStr.toFormatString("msgBoxBtnYes", MB_YES_TEXT) + "&nbsp;&nbsp;" +
		              _btnStr.toFormatString("msgBoxBtnNo", MB_NO_TEXT) + "&nbsp;&nbsp;" +
					  _btnStr.toFormatString("msgBoxBtnCancel", MB_CANCEL_TEXT); 
		    break;
	     
	  default :  _btnStr = _btnStr.toFormatString("msgBoxBtnOk", MB_OK_TEXT);  break;  
	  
   }
   //解决　FF 下会复位
   ScrollTop = GetBrowserDocument().scrollTop; 
   ScrollLeft = GetBrowserDocument().scrollLeft; 
   GetBrowserDocument().style.overflow = "hidden";
   GetBrowserDocument().scrollTop = ScrollTop;   
   GetBrowserDocument().scrollLeft = ScrollLeft; 

   document.getElementById("msgBoxTitle").innerHTML = "系统提示";
   
   
   document.getElementById("msgBoxIcon").innerHTML = (_type==NULL_ICON ? '' : _iconStr.toFormatString(getRequestUrl()+_type));
   // 根据类型显示不同的图标      
   if(_type==NULL_ICON){
   		//将图标的位置宽度设置为0
   	    document.getElementById("msgBoxIcon").innerHTML ='';
   		document.getElementById("msgBoxIcon").style.width = '0px';
   }else if(_type=="QUEST"){
   		document.getElementById("msgBoxIcon").innerHTML =_iconStr.toFormatString(getRequestUrl()+Q_ICON);
   }else if(_type=="WARN"){
   	    document.getElementById("msgBoxIcon").innerHTML =_iconStr.toFormatString(getRequestUrl()+W_ICON);
   }else if(_type=="ERROR"){
   	    document.getElementById("msgBoxIcon").innerHTML =_iconStr.toFormatString(getRequestUrl()+E_ICON);
   }else{
   		document.getElementById("msgBoxIcon").innerHTML =_iconStr.toFormatString(getRequestUrl()+T_ICON);
   } 
   
   document.getElementById("msgBoxContent").innerHTML = _content; 
   document.getElementById("msgBoxControl").innerHTML =  _btnStr;
   
   OpacityValue = 0;
   document.getElementById("msgBox").style.display = "";	   
   try{document.getElementById("msgBoxMask").filters("alpha").opacity = 0;}catch(e){};
   document.getElementById("msgBoxMask").style.opacity = 0;
   document.getElementById("msgBoxMask").style.display = "";
   document.getElementById("msgBoxMask").style.height = GetBrowserDocument().scrollHeight + "px";
   document.getElementById("msgBoxMask").style.width = GetBrowserDocument().scrollWidth + "px";
   
   Timer = setInterval("DoAlpha()",1);
   //设置位置   
   document.getElementById("msgBoxMask").style.width = "100%";   
   document.getElementById("msgBox").style.width = (document.getElementById("msgBoxIcon").offsetWidth + document.getElementById("msgBoxContent").offsetWidth + 2) + "px";
   
   document.getElementById("msgBox").style.marginTop = (-document.getElementById("msgBox").offsetHeight/2 + GetBrowserDocument().scrollTop) + "px";
   document.getElementById("msgBox").style.marginLeft = (-document.getElementById("msgBox").offsetWidth/2 + GetBrowserDocument().scrollLeft) + "px";   
   
   try{
   	   //解决messageBox在切换tab的时候报错
   	   if(_button == MB_OK || _button == MB_OKCANCEL){
	       document.getElementById("msgBoxBtnOk").focus();
	   }else if(_button == MB_YES || _button == MB_YESNO || _button == MB_YESNOCANCEL){
		   document.getElementById("msgBoxBtnYes").focus();
	   }
   }catch(e){
   		document.getElementById("msgBox").style.width = (document.getElementById("msgBoxIcon").scrollWidth + document.getElementById("msgBoxContent").scrollWidth + 2) + "px";
   
	    document.getElementById("msgBox").style.marginTop = (-document.getElementById("msgBox").scrollHeight/2 + GetBrowserDocument().scrollTop) + "px";
	    document.getElementById("msgBox").style.marginLeft = (-document.getElementById("msgBox").scrollWidth/2 + GetBrowserDocument().scrollLeft) + "px";   
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
	SetOpacity(document.getElementById("msgBoxMask"),OpacityValue);
}

function MBMethod(obj)
{   
   switch(obj.id)
   {
      //case "msgBoxBtnOk" : if(MB_BACKCALL) {MB_BACKCALL(MB_OK);} else {if(MB_OK_METHOD) MB_OK_METHOD();} break;
	  
	  case "msgBoxBtnOk" : if(MB_BACKCALL) {MB_BACKCALL(MB_OK);} else {if(MB_OK_METHOD){var result =MB_OK_METHOD(); if(result!=undefined && !result) return;}} break;
	  case "msgBoxBtnCancel" : if(MB_BACKCALL) {MB_BACKCALL(MB_CANCEL);} else {if(MB_CANCEL_METHOD) MB_CANCEL_METHOD();} break;
	  case "msgBoxBtnYes" : if(MB_BACKCALL) {MB_BACKCALL(MB_YES);} else {if(MB_YES_METHOD) MB_YES_METHOD();} break;
	  case "msgBoxBtnNo" : if(MB_BACKCALL) {MB_BACKCALL(MB_NO);} else {if(MB_NO_METHOD) MB_NO_METHOD();} break;
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
   
   document.getElementById("msgBox").style.display = "none";   
   document.getElementById("msgBoxMask").style.display = "none";  
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


/*********============================== 多模式提示选择对话框 （结束） ===============================**********/


/**
 *	功能:	验证是否整型
 *  作用:    
 *	参数:	value	待验证的值
 *			
 *	返回:	true/false
 *
 *  提供： shenjun
 */
function validateInteger(value)
  {
      if(value == null || value =="")
      {
        return false;
      }
      //
      //var exp = new RegExp("^-?\\d+$");
      var exp = new RegExp("^-?\\d+$");
	  //2147483647 , -2147483648
      if(exp.test(value))
	  {
		  //-Math.pow(2,32)/2, Math.pow(2,32)/2-1
	  	  //alert(parseInt(value));
		  return parseInt(value) <= 2147483647 && parseInt(value) >= -2147483648;
	  }
	  return false;
  }
  
/**
 *	功能:	验证是否长整型
 *  作用:    
 *	参数:	value	待验证的值
 *			
 *	返回:	true/false
 *
 *  提供： shenjun
 */
  function validateLong(value)
  {
  	
      if(value == null || value =="")
      {
        return false;
      }
      //
      //var exp = new RegExp("^-?\\d+$");
      var exp = new RegExp("^-?\\d+$");
	  //2147483647 , -2147483648
      if(exp.test(value))
	  {
		  //-Math.pow(2,32)/2, Math.pow(2,32)/2-1
		  return parseInt(value) <= 9223372036854775807 && parseInt(value) >= -9223372036854775808;
	  }
	  
	  return false;
  }
  
  /**
 *	功能:	验证是否float
 *  作用:    
 *	参数:	value	待验证的值
 *			
 *	返回:	true/false
 *
 */
  function validateFloat(value)
  {
     return validateDouble(value);
  }
  
  /**
 *	功能:	验证是否double
 *  作用:    
 *	参数:	value	待验证的值
 *			
 *	返回:	true/false
 *
 */
  function validateDouble(value)
  {
     if(value == null || value == "")
     {
        return false;
     }
     //
     //var exp = new RegExp("^-?\\d+\.\\d+$");
	 var exp = /^[-\+]?\d+(\.\d+)?$/;
	 //var exp = /^[-\+]?\d(\.\d)?$/;  //DECIMAL(14,4)
	 return exp.test(value);
 }

 /**
 *	功能:	取得字符串的字节长度
 *  作用:    
 *	参数:	value	值
 *			
 *	返回:	无
 *
 *  提供： shenjun
 */
function strByteLen(str)
{
	var len = 0;
	for (var i=0;i<str.length;i++)
	{
		if (str.charCodeAt(i)>255) 
		{
			len+=2;
		}else 
		{
			len++;
		}
	}
	//
	return len;
}  

 /**
 *	功能:	按键判断是否整数
 *  作用:    
 *	参数:
 *			
 *	返回:	true/false
 *
 *  提供： shenjun
 */ 
function isNumberEx()
{
	if(event.keyCode>=48 && event.keyCode<=57)
	{
		return true;

	}else
	{
		event.keyCode = 0;
	}
}
 
/********************************************
*  方法:isNumberOrPoint(chkValue)
*  功能:验证是否数字或者小数点
		event.keyCode=46时为小数点
		event.keyCode=48->0;
		event.keyCode=57->9;
		event.keyCode=45->- 负号
*  参数:chkValue：需验证的值
*  返回:
*  
*

********************************************/
function __getPos(obj)
{
　 //obj.focus();
　 var workRange=document.selection.createRange();
　  obj.select();
　　var allRange=document.selection.createRange();
　　workRange.setEndPoint("StartToStart",allRange);
　　var len=workRange.text.length;
　　workRange.collapse(false);
　　workRange.select(); 
　　return len;
}

function __eventChar(keyCode)
{
   if(keyCode == 46) {return ".";}
   if(keyCode == 45) {return "-";}
   if(keyCode >= 48 && keyCode <= 57) { return new String(keyCode - 48);}
}

function isNumberOrPointEx(chkValue)
{
   var keyCode = event.keyCode;
   if( (keyCode >= 48 && keyCode <= 57) || (keyCode == 46) || (keyCode == 45))
   {
       var pos = __getPos(event.srcElement);
       //负号处理
	   if(event.keyCode == 45)
	   {
	      if(chkValue.length == 0)
		  {
		     return true;

		  }else
		  {
			 if(pos == 0 && chkValue[0] != '-')
			 {
			     return true;
			 }
			 //
			 //alert("负号处理");
			 event.keyCode = 0;
			 return false;
		  }
	   }

	   //小数点处理
	   if(chkValue.length ==0 && keyCode == 46)
	   {
	      //alert("小数点处理");
	      event.keyCode = 0;
		  return false;
	   }

	   //对浮点数进行判断
	   //var exp = /^[-]?\d{0,10}(\.\d{0,4})?$/;  //DECIMAL(14,4)
	   var exp = /^[-\+]?\d+(\.\d+)?$/;
	   
	   if(pos == 0) 
	   {
	      value = __eventChar(event.keyCode)+chkValue;

	   }else if(pos > chkValue.length)
	   {
	      value = chkValue + __eventChar(event.keyCode);

	   }else
	   {
		  value = chkValue.substring(0,pos)+ __eventChar(event.keyCode) + chkValue.substring(pos);
	   }
	   //alert("value:" + value)
	   /**
	   if(! exp.test(value))
	   {
	      //alert("value:" + value);
	      event.keyCode = 0;
	      return false;
	   }
	   **/
	   //
	   return true;
   }
   //
   event.keyCode = 0;
   return false;
}


 /**
 *	功能:	是否正确年月
 *  作用:    
 *	参数:  
 *           lblname 标签名称
 *           obj   对象
 *           required 是否必填项
 *			
 *	返回:	true/false
 *
 */
function isYearMonth(lblname,obj,required){
	var error = "";
	if(obj.value.length == 0)
	{
	   if(required)
	   {
		  error += "填写内容不能为空，并且为年月(范围:199001~205512)";
	   }

	}else if(!validateInteger(obj.value))
	{
		error += "填写内容类型不是有效年月(范围:199001~205512)";

	}else if((obj.value.length!=4)&&(obj.value.length!=6)){
		//年月必须输入完整
		error += "填写内容类型不是有效年月(范围:199001~205512)";
	}else{
		var year = obj.value.substring(0,4);
		//alert(year);
		if(parseInt(year) > 2055 || parseInt(year) < 1990){
			error += "填写内容类型不是有效年(范围:1990~2055)";
		}else{
			if(obj.value.length==6){
				month = obj.value.substring(4); 
				//if(month in ())
				//alert(month + "   " + parseInt(month));
				if(month > 13 || month < 1){
					//alert(month + "  " + obj.value.substring(4));
					error += "填写内容类型不是有效月(范围:01~12)";				
				}
			}
		}
	}
	
	if(error != "")
	{
	    //___INPUT_VALID_ERRORS[obj.id] = obj.value;
		MessageBox("-"+lblname+"-<br/>"+error);	
		obj.select();
		obj.focus();

	}else
	{
		
	}
	//
	return (error == "");
}

/**
 *	功能:	根据时间得到星期
 *	参数:	value	控件值
 *			
 *	返回:	星期
 *
 */
function getDayOfWeek(value){
	function getStr(str){
	//alert(str.substring(1));
		if(str.length == 2 && str.substring(0,1) == '0'){			
			return str.substring(1);
		}else return str;

	}
	var today = new Array("星期天","星期一","星期二","星期三","星期四","星期五","星期六");
	if(typeof value == 'string'){   
		var results = value.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) *$/);   
		//alert(results + '   and   ' + results[1] + '  '  + results[2] + '   ' + results[3]);
		if(results && results.length>3){
			//alert(new Date(parseInt(results[1]),parseInt(results[2]) -1,parseInt(results[3])).getDay());
		  return today[new Date(parseInt(results[1]),parseInt( getStr(results[2]) ) -1,parseInt( getStr(results[3]) )).getDay()]; 
		  }
		else "无效日期字符";
	}else{
		return "无效日期字符";
	}
 }
 
 
 /**
  * 功能:设置下拉框为当前输入值
  * 
  * 参数:下拉框id ，选定值
  * 
  */
  function selSelect(selId,selValue) {
  	        
  	        if(!selValue) return ;
  	        
			var selectObj  = document.getElementById(selId);
			for(var i=0;i<selectObj.options.length;i=i+1) {
				if(selectObj.options[i].value==selValue) {
					selectObj.options[i].selected = true;
					break;
				}
			}
		}	
/*
 * ajax请求失败返回，弹出带错误信息的对话框
 * msg:失败提示信息
 * o:ajax的transport对象，可以通过该对象获取返回数据
 */		
function MessageBoxForAjax(msg,o){ 

	var str =  o.responseText;
	if(str && str.indexOf("{success:false,data:\"NEED_LOGIN\"}") != -1)
	{
		window.location.href = "/aueic/error/modalDialogTimeOut.jsp";
		return;
	}

	//2010-12-28修改 weijin 
	if(!isNullOrEmpty(o.responseText)){
	    //2010-12-08国网验证修改
	    MessageBox(o.responseText);
    }
     
	var html = ''
		+ '<div style="width:350px;height:200px;z-index:100000;">'
		+ '		<font size=4>' + msg + '</font><p>'
		+ '		<div style="width:300px;height:170px;z-index:100000;OVERFLOW: auto;border:1px solid #d6d3ce;">'
		+ o.responseText
		+ '		</div>'
		+ '</div>';
	//MessageBox(html,'提示',"ERROR",MB_OK);
}		
		


/**
 * 页面上更多按钮的处理
 * tr需要加入ctrlTr='true'
 */
function ctrlSearchTr() {
    
    
    var a = $("tr[ctrlTr='true']");
    if (a.length < 1) {
        return;
    }
    
   var e = window.event.srcElement;
   if (e.value=='更多') {
        e.value='隐藏';
   } else {
        e.value='更多';
   }
    
   a.toggle();
} 
/**
 * 判断字符串是否为空
 * sValue:需要判断的字符串
 */ 
function isNullOrEmpty(strSrc) {
    if ((strSrc == null) || (strSrc == "") || (strSrc == "null")) {
        return true;
    } else {
        return false;
    }
}
/**
 * 去除空格
 * sValue:需要去除空格的字符串
 */ 
function trimSpace(sValue) {
    if ((sValue == null) || (sValue == "")) {
        return "";
    }
    var len1 = 0;
    var len2 = 1;
    while (len1 != len2) {
        len1 = sValue.length;
        sValue = sValue.replace(/(^\s*)|(\s*$)/g, "");
        sValue = sValue.replace(/(^\u3000*)|(\u3000*$)/g, "");
        len2 = sValue.length;
    }
    return sValue;
}

/**
 * 去除空格 qiaoqiming
 * sValue:需要去除空格的字符串
 */ 
function trimSpaceQQM(o) {
	var sValue=o.value;
    if ((sValue == null) || (sValue == "")) {
        return "";
    }
    var len1 = 0;
    var len2 = 1;
    while (len1 != len2) {
        len1 = sValue.length;
        sValue = sValue.replace(/(^\s*)|(\s*$)/g, "");
        sValue = sValue.replace(/(^\u3000*)|(\u3000*$)/g, "");
        len2 = sValue.length;
    }
    o.value=sValue;
} 
/**
 * 为控件设值
 * sId:控件Id
 * sValue:设置的值
 */ 
function setValue(sId,sValue){
    document.getElementById(sId).value = sValue;
}
/**
 * 为控件设置是否可见属性
 * sId:控件Id
 * flag:是否可见标志
 */ 
function setDisplay(sId,flag){
    var selectObj  = document.getElementById(sId);
    if(flag){
        selectObj.style.display = "";
    } else {
        selectObj.style.display = "none";
    }
}

//取得当前时间
function getNowDateTime(){
    var now = new Date();
    var years = now.getYear();
    var months = now.getMonth() + 1;
    var days = now.getDate();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    var timeValue = "";
    timeValue += years;
    timeValue += ((months < 10) ? "-0" : "-") + months;
    timeValue += ((days < 10) ? "-0" : "-") + days;
    timeValue += ((hours < 10) ? " 0" : " ") + hours;
    timeValue += ((minutes < 10) ? ":0" : ":") + minutes;
    timeValue += ((seconds < 10) ? ":0" : ":") + seconds;
        
    return timeValue;
}

//取得当前时间-YYYY-MM-DD
function getNowDate(){
    var now = new Date();
    var years = now.getYear();
    var months = now.getMonth() + 1;
    var days = now.getDate();
    var timeValue = "";
    timeValue += years;
    timeValue += ((months < 10) ? "-0" : "-") + months; 
    timeValue += ((days < 10) ? "-0" : "-") + days;   
    return timeValue;
}

//指定精度的四舍五入方法
function round2(number,fractionDigits){ 
    with(Math){   
        return round(number*pow(10,fractionDigits))/pow(10,fractionDigits);   
    }   
} 

//设置iframe的高度
function setSize(iframeObj) {
  iframeObj.height = iframeObj.Document.body.scrollHeight;
}
		
		//覆盖common_ajax.js中方法,取得自定义的图片
		function showWaitDisplay(img,htmlStr,cancel,msg){
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
		                innerHTML =  "<img SRC='"+getRequestUrl()+img+"' ALIGN='absmiddle'/>"+"<br/><br/><input id='cancelId'  type='button'  value='终止' class=\"btn1_mouseout\"></input> "; 
		            }else if(cancel && msg!=""){
		                innerHTML = "<span style='padding-top:15px;align:center; text-align:center; color:blue;font-size:13px;'>" + msg + "</span>"
		                          + "<br/><img SRC='"+getRequestUrl()+img+"' ALIGN='absmiddle'/>"
		                          + "<br/><br/><input id='cancelId'  type='button'  value='终止' class=\"btn1_mouseout\"></input> ";
		            }else{
		            	//当msg存在的时候，显示msg
		            	if(msg!=""){
			                innerHTML = "<span style='padding-top:15px;align:center; text-align:center; color:blue;font-size:13px;'>" + msg + "</span><br/>" 
			                		  + "<img SRC='"+getRequestUrl()+img+"' ALIGN='absmiddle'/>";
		            	}else{
			                innerHTML = "<img SRC='"+getRequestUrl()+img+"' ALIGN='absmiddle'>";
		            	}
		            }

		            if(htmlStr!="") innerHTML = htmlStr;
		            style.marginTop = (-document.all(_displayId).offsetHeight/2 + document.body.scrollTop) + "px";
		            style.marginLeft = (-document.all(_displayId).offsetWidth/2 + document.body.scrollLeft) + "px";
		        }
		        
		       if(cancel)
		       {
		       		 $("#cancelId").bind('click', function() {
							 
							 	
					 disWaitDisplay();
					 
					 if(window.cancelTask)
					 {
					 		 cancelTask();
					 }
				
					 
					});
		       ;
		       }
 
		       objDisp = document.body.appendChild(document.createElement("DIV"));
		    } else {
		        objDisp.style.display="inline";
		    }
		    //隐藏滚动条
		    document.body.style.overflow = "hidden";
		}
		/**
		 *	功能:	带回调函数的遮罩 ssz
		 *	参数:
		 *			无
		 *	返回:	无
		 */
		function showWaitDisplayWithCallBack(img,htmlStr,cancel,msg,callBackFunc){
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
		                innerHTML =  "<img SRC='"+getRequestUrl()+img+"' ALIGN='absmiddle'/>"+"<br/><br/><div><input id='cancelId'  type='button'  value='中止' class=\"btn1_mouseout\"></input></div> "; 
		            }else if(cancel && msg!=""){
		                innerHTML = "<span style='padding-top:15px;align:center; text-align:center; color:blue;font-size:13px;'>" + msg + "</span>"
		                          + "<br/><img SRC='"+getRequestUrl()+img+"' ALIGN='absmiddle'/>"
		                          + "<br/><br/><div><input id='cancelId' type='button'  value='中止' class=\"btn1_mouseout\"></input></div> ";
		            }else{
		            	//当msg存在的时候，显示msg
		            	if(msg!=""){
			                innerHTML = "<span style='padding-top:15px;align:center; text-align:center; color:blue;font-size:13px;'>" + msg + "</span><br/>" 
			                		  + "<img SRC='"+getRequestUrl()+img+"' ALIGN='absmiddle'/>";
		            	}else{
			                innerHTML = "<img SRC='"+getRequestUrl()+img+"' ALIGN='absmiddle'>";
		            	}
		            }

		            if(htmlStr!="") innerHTML = htmlStr;
		            style.marginTop = (-document.all(_displayId).offsetHeight/2 + document.body.scrollTop) + "px";
		            style.marginLeft = (-document.all(_displayId).offsetWidth/2 + document.body.scrollLeft) + "px";
		        }
		        
		       if(cancel)
		       {
		       		 $("#cancelId").bind('click', function() {
							 
							 	
					 disWaitDisplay();
					 
					 if(typeof callBackFunc == "function")
					 {
					 	callBackFunc();
					 }
					 
					});
		       ;
		       }
 
		       objDisp = document.body.appendChild(document.createElement("DIV"));
		    } else {
		        objDisp.style.display="inline";
		    }
		    //隐藏滚动条
		    document.body.style.overflow = "hidden";
		}
		/**
		 *	功能:	不显示正在执行的提示LOADING图标
		 *	参数:
		 *			无
		 *	返回:	无
		 */
		function disWaitDisplay(){
			//去除提示
			var _displayId = "waitdisplay";
			var objDisp = document.all(_displayId);
			if(objDisp){
				document.body.removeChild(objDisp);
			}
			//去除屏障
			var _maskId = "_mask";
			var objMask = document.all(_maskId);
			if(objMask){
				document.body.removeChild(objMask);
			}
			//恢复滚动条
			document.body.style.overflow = "";
		}
		/**
		 * 得到pageSize
		 * iFrameId-子画面的id
		 * conStr-连接字符串，?或者&
		 */
		function getPageSize(iFrameId,conStr){
		    var pageSize = $('#'+iFrameId).contents().find("select[name='pageSize']").val(); 
            if(pageSize!=null){
                pageSize=conStr+"pageSize="+pageSize;
            }else{
                pageSize="";
            }
            return pageSize;
		}
		
		/**
		 * 将页面的回车屏蔽，gaoLi 2010-11-4
		 */		
	    document.onkeydown=function KeyDown(event){
			event = event ? event : (window.event ? window.event : null);
			if (event.keyCode == 13){
				return false;
			}
		}	
//只能输入整数的js qiaoqiming add
function intInput(str){
	var av = event.srcElement.value;
    var avlen = av.length;
    var reg = new RegExp("^[0-9]$");
    for(var i=0;i<avlen;i++){
        var aav = av.charAt(i);
        if( !aav.match(reg) ){
            var oSrcElement = event.srcElement;
            var strvalue = oSrcElement.value;
            strvalue = strvalue.replaceAll(aav,'');
            oSrcElement.value = strvalue;
        }
    }
    if(event.srcElement.value!=""&&(event.srcElement.value!=eval("'"+parseInt(event.srcElement.value,10)+"'"))){
        	event.srcElement.value=parseInt(event.srcElement.value,10);
    }
}       
//电话号码,只能输入数字和","
function telInput(str){ 
	var av = document.getElementById(str).value;
	var avlen = av.length;
	var reg = new RegExp("^[0-9,]$");
	for(var i=0;i<avlen;i++){
		var aav = av.charAt(i);
		if( !aav.match(reg) ){
			var oSrcElement = event.srcElement;
			var strvalue = oSrcElement.value;
			strvalue = strvalue.replaceAll(aav,'');
			oSrcElement.value = strvalue;
		}
	}
} 

//电话号码,只能输入数字和",""-"
function telInput1(str){ 
	var av = document.getElementById(str).value;
	var avlen = av.length;
	var reg = new RegExp("^[0-9,-]$");
	for(var i=0;i<avlen;i++){
		var aav = av.charAt(i);
		if( !aav.match(reg) ){
			var oSrcElement = event.srcElement;
			var strvalue = oSrcElement.value;
			strvalue = strvalue.replaceAll(aav,'');
			oSrcElement.value = strvalue;
		}
	}
} 

//电话号码,只能输入数字、字母和",""-"
function telInput13(str){ 
	var av = document.getElementById(str).value;
	var avlen = av.length;
	var reg = new RegExp("^[A-Za-z0-9,-]$");
	for(var i=0;i<avlen;i++){
		var aav = av.charAt(i);
		if( !aav.match(reg) ){
			var oSrcElement = event.srcElement;
			var strvalue = oSrcElement.value;
			strvalue = strvalue.replaceAll(aav,'');
			oSrcElement.value = strvalue;
		}
	}
}

//电话号码,只能输入数字、字母和","
function telInput1313(str){ 
	var av = document.getElementById(str).value;
	var avlen = av.length;
	var reg = new RegExp("^[A-Za-z0-9,]$");
	for(var i=0;i<avlen;i++){
		var aav = av.charAt(i);
		if( !aav.match(reg) ){
			var oSrcElement = event.srcElement;
			var strvalue = oSrcElement.value;
			strvalue = strvalue.replaceAll(aav,'');
			oSrcElement.value = strvalue;
		}
	}
} 

//电话号码,只能输入数字、字母
function telInput131313(str){ 
	var av = document.getElementById(str).value;
	var avlen = av.length;
	var reg = new RegExp("^[A-Za-z0-9]$");
	for(var i=0;i<avlen;i++){
		var aav = av.charAt(i);
		if( !aav.match(reg) ){
			var oSrcElement = event.srcElement;
			var strvalue = oSrcElement.value;
			strvalue = strvalue.replaceAll(aav,'');
			oSrcElement.value = strvalue;
		}
	}
} 

//输入小数 qiaoqiming ADD
function floatInput(str){ 
    var oSrcElement = event.srcElement;
    var strvalue = oSrcElement.value;
    
   	var av;
	if(str!=undefined){
		av = document.getElementById(str).value;
	}else{
		av=strvalue;
	}
    var avlen = av.length;
    var reg = new RegExp("^[0-9]$");
    var doteNum = 0;//“.”计数
    //判断。的数量  并裁减
    for(var i=0;i<avlen;i++){
        var aav = av.charAt(i); 
        if(aav == "."){
            doteNum++;
        }else if( !aav.match(reg) ){
            strvalue = strvalue.replaceAll(aav,'');
            oSrcElement.value = strvalue;
        }
    }
    if(doteNum > 1){
        strvalue = strvalue.replaceAll('.','');
        oSrcElement.value = strvalue;
    }
    //首位是。则补0
    if(strvalue.charAt(0) == "."){
        strvalue = "0"+strvalue;
        oSrcElement.value = strvalue;
    }
    //出现 01*****/0001****  则 去掉首位 0
    if(strvalue.charAt(0) == "0" && strvalue.charAt(1) != "." && strvalue.charAt(1) != ""){
        oSrcElement.value=parseInt(strvalue,[10]);
    }
}       

//输入小数 qiaoqiming ADD
function floatInputPlus(str){ 
    var oSrcElement = event.srcElement;
    var strvalue = oSrcElement.value;
    
   	var av;
	if(str!=undefined){
		av = str.value;
	}else{
		av=strvalue;
	}
    var avlen = av.length;
    var reg = new RegExp("^[0-9]$");
    var doteNum = 0;//“.”计数
    //判断。的数量  并裁减
    for(var i=0;i<avlen;i++){
        var aav = av.charAt(i); 
        if(aav == "."){
            doteNum++;
        }else if( !aav.match(reg) ){
            strvalue = strvalue.replaceAll(aav,'');
            oSrcElement.value = strvalue;
        }
    }
    if(doteNum > 1){
        strvalue = strvalue.replaceAll('.','');
        oSrcElement.value = strvalue;
    }
    //首位是。则补0
    if(strvalue.charAt(0) == "."){
        strvalue = "0"+strvalue;
        oSrcElement.value = strvalue;
    }
    //出现 01*****/0001****  则 去掉首位 0
    if(strvalue.charAt(0) == "0" && strvalue.charAt(1) != "." && strvalue.charAt(1) != ""){
        oSrcElement.value=parseInt(strvalue,[10]);
    }
} 
function floatInput2(str){ 
    var oSrcElement = event.srcElement;
    var strvalue = oSrcElement.value;
    
    var av = document.getElementById(str).value;
    var avlen = av.length;
    var reg = new RegExp("^[0-9]$");
    var doteNum = -1;
    //'-.'情况
    if(avlen>1 && strvalue.charAt(0) == "-" && strvalue.charAt(1) == "."){
        strvalue = removeCharAt(strvalue, 1);
        oSrcElement.value = strvalue;
    }
    for(var i=0;i<avlen;i++){
        var aav = av.charAt(i); 
        if(aav=='.'){
            if(doteNum == 0){
	            strvalue = removeCharAt(strvalue, i);
	            oSrcElement.value = strvalue;
            } else {
                doteNum = 0;
            }
        } else if(i==0 && aav=='-'){
            continue;
        } else if(i!=0 && av.charAt(0)=='-' && aav=='-'){
            strvalue = removeCharAt(strvalue, i);
            oSrcElement.value = strvalue;
        } else if(aav == "."){
            doteNum++;
        } else if( !aav.match(reg) ){
            strvalue = strvalue.replaceAll(aav,'');
            oSrcElement.value = strvalue;
        }
    }
    // 非小数情况
    if(strvalue.indexOf('.') == -1){
	    // '00'->'0','09'->'9'
	    if(strvalue.indexOf('-') == -1 && strvalue.length > 1 && strvalue.indexOf('0') == 0) {
	        strvalue = removeCharAt(strvalue, 0);
	        oSrcElement.value = strvalue;
	    }
	    // '-09'->'-9'
	    if(strvalue.indexOf('-') == 0 && strvalue.length > 2 && strvalue.indexOf('0') == 1) {
	        strvalue = removeCharAt(strvalue, 1);
	        oSrcElement.value = strvalue;
	    }
    } else {
	    // '00'->'0','09'->'9'
	    if(strvalue.indexOf('-') == -1 && strvalue.length > 1 && strvalue.charAt(0) == '0' && strvalue.charAt(1) == '0') {
	        strvalue = removeCharAt(strvalue, 0);
	        oSrcElement.value = strvalue;
	    }
	    // '-09'->'-9'
	    if(strvalue.indexOf('-') == 0 && strvalue.length > 2 && strvalue.charAt(1) == '0' && strvalue.charAt(2) == '0') {
	        strvalue = removeCharAt(strvalue, 1);
	        oSrcElement.value = strvalue;
	    }
    }
}
function shieldInput2(){
    var oSrcElement = event.srcElement;
    var strvalue = oSrcElement.value;
    var strValueOri = strvalue;
    // '-00'->'0'
    if(strvalue == '-0') {
        oSrcElement.value = 0;
        return;
    }
    strvalue = strvalue.replaceEach("'","＇","‘","’",'');
    strvalue = strvalue.replaceEach("!","！","！","！",'');
    strvalue = strvalue.replaceEach('^','＾','……','……','');
    strvalue = strvalue.replaceEach('&','＆','&','＆','');
    strvalue = strvalue.replaceEach('?','？','？','？','');
    strvalue = strvalue.replaceEach('~','～','~','～','');
    strvalue = strvalue.replaceEach('<','＜','《','《','');
    strvalue = strvalue.replaceEach('>','＞','》','》','');
    strvalue = strvalue.replaceEach('/','／','、','、','');
    strvalue = strvalue.replaceEach(' ','　',' ','　','');
    strvalue = strvalue.replaceEach("=","＝","=","＝",'');
    strvalue = strvalue.replaceEach("`","｀","·","·",'');
    strvalue = strvalue.replaceEach("#","＃","#","＃",'');
    strvalue = strvalue.replaceEach("$","＄","￥","￥",'');
    strvalue = strvalue.replaceEach("{","｛","{","｛",'');
    strvalue = strvalue.replaceEach("}","｝","}","｝",'');
    strvalue = strvalue.replaceEach("\\","＼＼","、、","＼＼",'');
    strvalue = strvalue.replaceEach("|","｜","|","｜",'');
    strvalue = strvalue.replaceEach("%","％","%","％",'');
    strvalue = strvalue.replaceEach("*","＊","*","*",'');
    strvalue = strvalue.replaceEach("+","＋","+","＋",'');
    strvalue = strvalue.replaceEach(",","，","，","，",'');
    strvalue = strvalue.replaceEach("\"","＼","、","＼",'');
    strvalue = strvalue.replaceEach("_","＿","——","——",'');
    strvalue = strvalue.replaceEach(".","．","。","。",'');
    strvalue = strvalue.replaceEach(";","；","；","；",'');
    strvalue = strvalue.replaceEach(":","：","：","：",'');
    strvalue = strvalue.replaceEach("[","［","【","【",'');
    strvalue = strvalue.replaceEach("]","］","】","】",'');
    strvalue = strvalue.replaceEach("@","＠","@","＠",'');
    strvalue = strvalue.replaceEach("(","（","（","（",'');
    strvalue = strvalue.replaceEach(")","）","）","）",'');
    if(strvalue.length > 0 && strvalue.lastIndexOf('-') >0) {
        if(strvalue.indexOf('-') == 0) {
            while(strvalue.lastIndexOf('-') != 0 ) {
                strvalue = removeCharAt(strvalue, strvalue.lastIndexOf('-'));
            }
        } else {
            strvalue = removeCharAt(strvalue, strvalue.lastIndexOf('-'));
        }
    }
    // '00'->'0','09'->'9'
    if(strvalue.indexOf('-') == -1 && strvalue.length > 1 && strvalue.indexOf('0') == 0) {
        strvalue = removeCharAt(strvalue, 0);
    }
    // '-09'->'-9'
    if(strvalue.indexOf('-') == 0 && strvalue.length > 2 && strvalue.indexOf('0') == 1) {
        strvalue = removeCharAt(strvalue, 1);
    }

    var regex = /[a-zA-Z]+/gi;
    strvalue = strvalue.replace(regex,'');
    
    if(!isNullOrEmpty(strvalue) && strvalue != '-' 
        && strValueOri != strvalue ) {
        oSrcElement.value = parseInt(strvalue,[10]);
    } else if(strValueOri != strvalue) {
        oSrcElement.value = strvalue;
    }
}

//ip地址输入验证
function ipInput(str){
    var av = document.getElementById(str).value;
    var avlen = av.length;
    var reg = new RegExp("^[0-9.]$");
    if(avlen >1 && av.charAt(0) == '0'){
        av = av.substr(1);
    }
    for(var i=0;i<avlen;i++){
        var aav = av.charAt(i);
        if( !aav.match(reg) ){
            av = av.replaceAll(aav,'');
        }
    }
    document.getElementById(str).value=av;
}    

function removeCharAt(str, index) {
    if(str == null || str == '') return str;
    if(index > (str.length - 1)) return str;
    
    return str.substr(0,index) + str.substr(index + 1, str.length - 1);
}
/** 判断字符串是否在数组中*/
function strExistInArr(str,strArr){
    for(var i=0;i<strArr.length;i++){
        if(str == strArr[i]){
            return true;
        }
    }
    return false;
}

/**
 *  功能: 验证超级报表key值
 *  作用:    报表页面
 *          
 *  返回: 无
 */
function validateChinaExcel(){
	ChinaExcel.SetPath("/aueic/pages/chinaExcel");
    ChinaExcel.Login("江苏方天电力技术有限公司","4f2165cb93aa6d8098722369c9054202","江苏方天电力技术有限公司");
}

/**
 *  功能: 显示正在执行的提示LOADING图标
 *  参数: img 指定图片名称，如果不填为默认图片(指定的图片放在syscom/images/下)
 *          
 *  返回: 无
 */
function showWaitDisplayForQuery(path, memo){
	  var objMask = document.all("_maskForQuery");
	    if (!objMask){
	         objMask = document.body.appendChild(document.createElement("DIV"));
	          with(objMask){
	            id = "_maskForQuery";
	            className = "msgbox_mask";
	            style.zIndex=99992;
	            style.dispaly="none";
	            style.filter="alpha(opacity=20)";
	        }
		}
			
	  var img = arguments[0]+ "resources/ext-2.2.1/resources/images/default/shared/blue-loading.gif";
	  //判断浏览器的类型begin
	  var browser=navigator.appName 
	  var b_version=navigator.appVersion 
	  var version=b_version.split(";"); 
	  var trim_Version=version[1].replace(/[ ]/g,"");  
	  //判断浏览器的类型end
	  var htmlStr   = "";
	  //背景元素不可操作
      if(memo == "" || memo == null){
        memo = "正在加载数据...";
      }
	  document.getElementById("_maskForQuery").style.display = "";
	  document.getElementById("_maskForQuery").style.width = "100%";
	  document.getElementById("_maskForQuery").style.height = GetBrowserDocument().scrollHeight + "px";
	 
	  //构造等候提示图
	  var _displayId = "waitdisplayForQuery";
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
	          innerHTML = "<span id = 'printTest' style='padding-top:15px;align:center; text-align:center; color:blue;font-size:14px;'><img SRC='"+img+"' ALIGN='absmiddle'> " + memo + "</span>";
	          if(htmlStr!="") innerHTML = htmlStr;
	          style.marginTop = (-document.all(_displayId).offsetHeight/2 + document.body.scrollTop) + "px";
	          style.marginLeft = (-document.all(_displayId).offsetWidth/2 + document.body.scrollLeft) + "px";
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
function disWaitDisplayForQuery(){
    //去除提示
    var _displayId = "waitdisplayForQuery";
    var objDisp = document.all(_displayId);
    if(objDisp){
        document.body.removeChild(objDisp);
    }
    //去除屏障
    var _maskId = "_maskForQuery";
	var objMask = document.all(_maskId);
	if(objMask){
		document.body.removeChild(objMask);
	}
    //恢复滚动条
    document.body.style.overflow = "";
}

/**
 *  功能: 显示正在执行的提示LOADING图标
 *  参数: img 指定图片名称，如果不填为默认图片(指定的图片放在syscom/images/下)
 *          
 *  返回: 无
 */
function showWaitDisplayForSave(path, memo){
      var objMask = document.all("_maskForSave");
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
      var browser=navigator.appName 
      var b_version=navigator.appVersion 
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
              innerHTML = "<span style='padding-top:15px;align:center; text-align:center; color:blue;font-size:14px;'><img SRC='"+img+"' ALIGN='absmiddle'> " + memo +"</span>";
              if(htmlStr!="") innerHTML = htmlStr;
              style.marginTop = (-document.all(_displayId).offsetHeight/2 + document.body.scrollTop) + "px";
              style.marginLeft = (-document.all(_displayId).offsetWidth/2 + document.body.scrollLeft) + "px";
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
    var objDisp = document.all(_displayId);
    if(objDisp){
        document.body.removeChild(objDisp);
    }
    //去除屏障
    var _maskId = "_maskForSave";
    var objMask = document.all(_maskId);
    if(objMask){
        document.body.removeChild(objMask);
    }
    //恢复滚动条
    document.body.style.overflow = "";
}

//验证终端资产号
function checkAsset(areaCode, terminalAddr) {
    if(areaCode != null && areaCode != "") {
      // 终端地址码
      if(areaCode != '05' || (terminalAddr != null && terminalAddr != "")) {
          if(areaCode.length < 5
             || isNaN(areaCode)
             || areaCode.indexOf(".") != -1
             || parseInt(areaCode,[10]) <= 0) {
             MessageBox("终端资产号第一个输入框，请输入[05]加上地区码组成的5位数字！","系统提示", E_ICON, MB_OK);
             return false;
          }
      }
    }
    if(terminalAddr != null && terminalAddr != "") {
        if(terminalAddr.length < 5
         || isNaN(terminalAddr)
         || terminalAddr.indexOf(".") != -1
         || parseInt(terminalAddr,[10]) <= 0) {
         MessageBox("终端资产号第二个输入框，请输入[0~9]数字组成的5位数字！","系统提示", E_ICON, MB_OK);
         return false;
        }
    }
   
    return true;
}


/*start add by tianpeng 2011-1-8*/
/**
 *  功能: 截取str字符串的numw个字
 *  参数:str 需要截显示...的字符串
 *          numw 需要截取的字数 如传入5代表要截10个字节
 *  返回: 无
 */
function subInfo(str,numw)
{
	
	if("" == str || null == str)
	{
		return "";
	}
	
	
	var len = 0;
	
	var needCut = false;
	var pos = 0;

	var numb = numw*2;

	for (var i=0;i<str.length;i++)
	{
		if (str.charCodeAt(i)>255) 
		{
			len+=2;
		}
		else 
		{
			len++;
		}

		pos++;
		
		if(len>=numb)
		{
			needCut = true;
			break;
		}
	}
		
		if(needCut)
		{
			return str.substring(0,pos)+"...";
		}

		return str;
	}
	
 /**
 *  功能: 按字节数截取字符串
 *  作用:    
 *  参数: str   字符串
 *       loc   起始位置
 *       bytes 截取得字节数
 *          
 *  返回: 无
 *
 *  提供： leiwei
 */
function subStrByBytes(str,loc,bytes)
{
    bytes = bytes * 2;
    str = str.substring(loc);
    var len = 0;
    var addByte = 0;
    for (var i=0;i<str.length;i++)
    {
        if(addByte >= bytes){
            if(addByte>bytes){
                len--;
            }
            break;
        }
        len++;
        if (str.charCodeAt(i)>255) 
        {
            addByte+=2;
        }else 
        {
            addByte++;
        }
    }
    //
    return str.substring(0,len);
}

/**
 *  功能: 当前页面表格上的鼠标离开行时触发事件处理函数
 *  参数: styClass    样式表名称
 *          
 *  返回: 无
 */
function tabOnRowMouseOut(styClass){
    try{
        var evtElement = window.event.srcElement;
        if(evtElement!=null 
            && evtElement.tagName.toLowerCase() == "td"){
            var tableElement = evtElement;
            while(evtElement.tagName.toLowerCase() != "tr")
            {
                evtElement = evtElement.parentNode;
            }
            while(tableElement.tagName.toLowerCase() != "table" && tableElement.getAttribute("elementType") != "datagrid")
            {
                tableElement = tableElement.parentElement;
            }
            if(tableElement && !evtElement.getAttribute("_selected")&&evtElement.className!="redrows_yx"){
                evtElement.setAttribute("_bakclass",evtElement.className);
                evtElement.className = styClass;
            }
        }
    }catch(e){
        alert("tabOnRowMouseOut表格脚本出错：" + e.name + ", " + e.message + " 错误号：70011");
    };
}

/**
 *  功能: 当前页面表格上的鼠标在行之上时触发事件处理函数
 *  参数: styClass    样式表名称
 *          
 *  返回: 无
 */
function tabOnRowMouseOver(styClass){
    try{
        var evtElement = window.event.srcElement;
        if(evtElement!=null 
            && evtElement.tagName.toLowerCase() == "td"){
            while(evtElement.tagName.toLowerCase() != "tr")
            {
                evtElement = evtElement.parentNode;
            }
            if (!evtElement.getAttribute("_selected")&&evtElement.className!="redrows_yx"){
                evtElement.setAttribute("_bakclass",evtElement.className);
                evtElement.className = styClass;
            }
        }
    }catch(e){
        alert("tabOnRowMouseOver表格脚本出错：" + e.name + ", " + e.message + " 错误号：70011");
    };
} 
function selectOneRow(){
    try{
        var evtElement = event.srcElement;
        if(evtElement.tagName.toLowerCase()== "input") {
            evtElement = evtElement.parentElement;
        }
        var tableElement = evtElement;
        if(evtElement!=null 
            && evtElement.tagName.toLowerCase() == "td"){
            while(tableElement.tagName.toLowerCase() != "table"){
                tableElement = tableElement.parentElement;
            }
            for(var i=0;i<tableElement.rows.length;i++){
                if(tableElement.rows[i].getAttribute("_selected")&&tableElement.rows[i].className!="redrows_yx"){
                    tableElement.rows[i].className = "rows";
                    tableElement.rows[i].setAttribute("_selected",false);
                }
            }
            while(evtElement.tagName.toLowerCase() != "tr"){
                evtElement = evtElement.parentNode;
            }
            evtElement.setAttribute("_selected",true);
            if(evtElement.className!="redrows_yx"){
	            evtElement.className = "selectrows";
            }
        }       
    }catch(e){
    };
}

/**
js四舍五入函数 收藏 
参数一：要保留小数位的数字
参数二：要保留的位数
*/
function FormatFloatNumber(srcStr, nAfterDot) {
    var srcStr, nAfterDot;
    var resultStr, nTen;
    srcStr = "" + srcStr + "";
    strLen = srcStr.length;
    dotPos = srcStr.indexOf(".", 0);
    if (dotPos == -1) {
        resultStr = srcStr + ".";
        for (i = 0; i < nAfterDot; i++) {
            resultStr = resultStr + "0";
        }
    } else {
        if ((strLen - dotPos - 1) >= nAfterDot) {
            nTen = 1;
            for (j = 0; j < nAfterDot; j++) {
                nTen = nTen * 10;
            }
            resultStr = Math.round(parseFloat(srcStr) * nTen) / nTen;
        } else {
            resultStr = srcStr;
            for (i = 0; i < (nAfterDot - strLen + dotPos + 1); i++) {
                resultStr = resultStr + "0";
            }
        }
    }
    return resultStr;
}


/**
 *	功能:	打开弹出窗口
 *	参数:	url			链界地址 String that specifies the URL of the document to display
 *			winName		窗口名 This name is used as the value for the TARGET attribute on a form or an a element.
 *			width		宽值	width
 *			height		高值 height
 *			
 *	返回:	无
 */
function OpenWindow(url, winName, width, height) 
{
	xposition=0; yposition=0;
    
	if ((parseInt(navigator.appVersion) >= 4 ))
	{
		xposition = (screen.width - width) / 2;
		yposition = (screen.height - height) / 4;
	}
	theproperty = "width=" + width + "," 
		+ "height=" + height + "," 
		+ "location=0," 
		+ "menubar=0,"
		+ "resizable=1,"
		+ "scrollbars=1,"
		+ "status=1," 
		+ "titlebar=0,"
		+ "toolbar=0,"
		+ "hotkeys=0,"
		+ "screenx=" + xposition + "," //仅适用于Netscape
		+ "screeny=" + yposition + "," //仅适用于Netscape
		+ "left=" + xposition + "," //IE
		+ "top=" + yposition; //IE 
	monwin = window.open(url,winName,theproperty,false);
	monwin.focus();
}


/**
* 共同方法,监听程序
* @author hyh 
*/
function CommonListeners(){
	var iIntervalID;
	var frameName;
	var btnObject;
}
CommonListeners.prototype={
	/**
	*导出按钮监听
	*@param frameName 导出时target所指的iframe的name属性名称
	*@param btnObject 导出按钮的jQuery对象
	*/
	listenerExportBtnState : function(frameName,btnObject){
		if(!frameName || !btnObject){
			return;
		}
		var me = this;
		/*
		//不使用这个，是避免模态窗口不能使用，因为在模态窗口中 this.frameObj.document为空,
		// 改为document.onreadystatechange事件
		this.iIntervalID = this.windowObj.setInterval(function(){
			me.changeExportState();
		},500);*/
		this.frameName = frameName;
		this.btnObject = btnObject;
		this.btnObject.attr('disabled',true);
		if(frameName.toLowerCase()=='_self'){
			this.frameObj = window;
		}else{
			this.frameObj = window.frames[this.frameName];
		}
		if(this.frameObj && this.frameObj.document){
			//document事件监听
			this.frameObj.document.onreadystatechange=function(){
				me.changeExportState();
			}
		}
	},
	/**
	* 导出监听执行的函数
	*/
	changeExportState : function(){
		//this.frameObj = window.frames[this.frameName];
		var isOver = false;
		if(!this.frameObj || !this.frameObj.document){
			isOver = true;
		}else if(this.frameObj!=undefined && this.frameObj.document!=undefined){
			if(this.frameObj.document.readyState=='interactive'){//导出完毕document的状态
				isOver = true;
			}
		}
		if(isOver){
			this.btnObject.attr('disabled',false);
			delete this.iIntervalID;
			delete this.frameName;
			delete this.btnObject;
		}
	}
}
//初始化
//var commonListeners = new CommonListeners();


/**
*
* 当初始化页面或点击查询按钮没有查询出数据时，显示“没有查询到相应记录”信息
*/
function checkEmpty(){
	/*//form表单
	var formObj = jQuery('form');
	if(formObj.length==0){
		return;
	}
	//只查询第一个form表单
	formObj.each(function(){
		//form表单target属性值
		var targetName =  jQuery(this).attr('target');
		
		// 1.指向iframe的name
		// 2.指向自己_self
		
		var frameObj = null;
		if(targetName){
			if(targetName.toLowerCase()=='_self'){
				frameObj =jQuery(window);//当前页面
			}else{
				frameObj = jQuery('iframe[name="'+targetName+'"]');
				if(frameObj.length!=1){
					frameObj == null;
				}
			}
			//是iframe 和_self
			if(frameObj){ 
				if(frameObj.get(0) && frameObj.get(0).document.readyState=='complete'){
					var trObjs = frameObj.contents().find('.dataGrid:first').contents().children('.listHead:last').nextAll('tr');
					if(trObjs.length>0){
						var firstVal = trObjs.eq(0).children().eq(0).html().trim();
						//取第一个td是否有值
						if(!firstVal || firstVal.toLowerCase()=='&nbsp;'){   
							trObjs.eq(0).before("<tr><td class='emptyText' colspan='72'>没有查询到相应记录!</td></tr>");
						}
					}else{
						trObjs.after("<tr><td class='emptyText' colspan='72'>没有查询到相应记录!</td></tr>");
					}
				}
			}
		}
	});*/
	//table的class值，可以加入其它的值
	var dataGirds = jQuery('.dataGrid,.message,.listTable');
	dataGirds.each(function(){ 
		//表头行，class值listHead唯一
		var headTrs = $(this).contents().children('.listHead');
		if(headTrs.length==0){
			return;
		}
		//var colspan = headTrs.eq(0).children().length;
		var colspan = 0;
		headTrs.eq(0).children().each(function(){
			colspan += $(this).attr('colspan');
		});
		//数据行
		var dataObjs =headTrs.eq(headTrs.length-1).nextAll('tr');
		if(dataObjs.length>0){
			var firstVal = dataObjs.eq(0).children().eq(0).html().trim();
			//取第一个td是否有值
			if(!firstVal || firstVal.trim().length==0 || firstVal.toLowerCase()=='&nbsp;'){   
				dataObjs.eq(0).html("<tr><td class='emptyText' colspan='"+colspan+"'>没有查询到相应记录!</td></tr>");
			}
		}else{
			headTrs.eq(headTrs.length-1).after("<tr><td class='emptyText' colspan='"+colspan+"'>没有查询到相应记录!</td></tr>");
		}
	});
	
}

/**
* 去除按钮查询之后的焦点
* @author hyh
*/
if(typeof jQuery == "function" && !window.isCommonUtilJS){//判断jquer文件是否存在
	//已加载common_client.js文件
	window.isCommonUtilJS = true;
	//需要在查询完提示信息的按钮名称
	var btnNameArray = ['查询','统计'];
	try{
		jQuery(function(){
			jQuery(':button').each(function(){
				jQuery(this).bind('click',function(event){//所有的button，添加click事件
					//上一次事件返回的结果，当点击按钮弹出提示框时，给window.event.returnValue=false
					//结果为false的时候，跳出循环，不在执行下面事件
					if(event.originalEvent && event.originalEvent.returnValue==false){
						return false;
					}
					jQuery(this).blur();
					var btnVal = jQuery(this).val();
					//找到按钮的form表单节点
					var formObj = jQuery(this).parents('form');
					var btnObject = jQuery(this);
					if(formObj.length>0){
						//只查询第一个form表单
						formObj.each(function(){
							//form表单target属性值
							var targetName =  jQuery(this).attr('target');
							/*
							* 1.指向iframe的name
							* 2.指向自己_self
							*/
							if(targetName){
								var frameObj = null;
								if(targetName.toLowerCase()=='_self'){
									targetName = 'window';
									frameObj =jQuery(window);//当前页面
								}else{
									frameObj = jQuery('iframe[name="'+targetName+'"]');
									if(frameObj.length!=1){
										frameObj == null;
									}
								}
								//是iframe 和_self
								if(frameObj){ 
									//frameObj.get(0).attachEvent('onload',function(){alert('onoad')});
									//查询按钮
									if(jQuery.inArray(btnVal.replace(' ',''),btnNameArray)!=-1){//查询按钮
										//当docume的readyState不为complet时，把导出报表的按钮置灰
										//因为有的页面点击查询的时候有验证条件，
										// 这里使用attachEvent方法才有效果
										if(frameObj.get(0)){
											frameObj.get(0).attachEvent('onreadystatechange',function(){ 
												if(frameObj.get(0).document.readyState=='complete'){
													jQuery(frameObj.get(0).document).ready(function(){
														try{
															eval(targetName +'.checkEmpty()');
														}catch(e){
														
														}
													});
												}
												var btnVal2;
												//把按钮名称以导出开头的按钮置灰取消
												jQuery(':button').each(function(){
													btnVal2 = jQuery(this).val();
													if(btnVal2!='导出报表' && btnVal2.indexOf('导出')!=-1){
														jQuery(this).attr('disabled',false);
													}
												});
												delete btnVal2;
												return;
											});
										}
									}
									//找到含有导出的按钮，但是不包括导出报表
									if(btnVal!='导出报表' && btnVal.indexOf('导出')==0){
										var commonListeners = new CommonListeners();
										commonListeners.listenerExportBtnState(targetName,btnObject);
										return false;
									}
								}
								return true;
							}
						});
					}
				});
			});
		});
	}catch(e){
		
	}
}

/*********============================== 八大视图（开始） ===============================**********/

var dataTitleIndexArrs = [];
function getDataIndex(titleIndex){
	 //查找对应列号
	var dataLineIndex = 0;
	for (var i = 0; i < titleIndex; i++) {
		dataLineIndex += dataTitleIndexArrs[i];
	}
	return dataLineIndex;
}

//初始化
var MB_DIVSTR = "";
var dbclick = "";
var yhclick = "";
var zdclick = "";
var simclick = "";
var cbdclick = "";
var pbclick = "";
var tqclick = "";
var xlclick = "";

//八大视图样式DIV
MB_DIVSTR =
         '<div style="z-index:9999;position:relative;">' +
         	'<span id="closeX" style="width:11px; height:11px; position:relative;top:-120px;left:262px;background: url('+getRequestUrl()+'images/aueic/icon_close.png) left top no-repeat;border:0px;cursor: hand">' +
            '</span>' +
            '<span style="width:272px; height:144px; padding:0px;">' +
               '<div style="width:272px; height:144px; background: url('+getRequestUrl()+'images/aueic/windows_bg.png) left top no-repeat;">' +
                  '<div style="width:250px; height:24px; margin-top:22px; margin-left:10px;">' +
                     '<span style="width:24px; height:24px; margin-left:20px;">' +
                         '<div id="dbtbdiv" style="width:24px; height:24px; background: url('+getRequestUrl()+'images/aueic/icon_db.png);">' + 
                         '</div>' +
                     '</span>' +
                     '<span style="width:24px; height:24px; margin-left:38px;">' +
                         '<div id="yhtbdiv" style="width:24px; height:24px; background: url('+getRequestUrl()+'images/aueic/icon_yh.png);">' + 
                         '</div>' +
                     '</span>' +
                     '<span style="width:24px; height:24px; margin-left:38px;">' +
                         '<div id="zdtbdiv" style="width:24px; height:24px; background: url('+getRequestUrl()+'images/aueic/icon_zd.png);">' + 
                         '</div>' +
                     '</span>' +
                     '<span style="width:24px; height:24px; margin-left:38px;">' +
                         '<div id="simtbdiv" style="width:24px; height:24px; background: url('+getRequestUrl()+'images/aueic/icon_SIM.png);">' + 
                         '</div>' +
                     '</span>' +
                  '</div>' +
                  '<div style="width:250px; height:12px; margin-top:4px; margin-left:10px;">' + 
                     '<span id="DBST" style="width:24px; height:12px; margin-left:20px;font-size:11px;">' +
                           '电表' +
                     '</span>' +
                     '<span id="YHST" style="width:24px; height:12px; margin-left:38px;font-size:11px;">' +
                           '用户' +
                     '</span>' +
                     '<span id="ZDST" style="width:24px; height:12px; margin-left:38px;font-size:11px;">' +
                           '终端' +   
                     '</span>' +
                     '<span id="SIMST" style="width:35px; height:12px; margin-left:38px;font-size:11px;">' +
                           'SIM卡' +
                     '</span>' +
                  '</div>' +
                  '<div style="width:250px; height:12px; margin-top:15px; margin-left:10px;">' +
                     '<span style="width:24px; height:24px; margin-left:20px;">' +
                         '<div id="cbtbdiv" style="width:24px; height:24px; background: url('+getRequestUrl()+'images/aueic/icon_cbd.png);">' + 
                         '</div>' +
                     '</span>' +
                     '<span style="width:24px; height:24px; margin-left:38px;">' +
                         '<div id="pbtbdiv" style="width:24px; height:24px; background: url('+getRequestUrl()+'images/aueic/icon_pb.png);">' + 
                         '</div>' +
                     '</span>' +
                     '<span style="width:24px; height:24px; margin-left:38px;">' +
                         '<div id="tqtbdiv" style="width:24px; height:24px; background: url('+getRequestUrl()+'images/aueic/icon_tq.png);">' + 
                         '</div>' +
                     '</span>' +
                     '<span style="width:24px; height:24px; margin-left:38px;">' +
                         '<div id="xltbdiv" style="width:24px; height:24px; background: url('+getRequestUrl()+'images/aueic/icon_xl.png);">' + 
                         '</div>' +
                     '</span>' +
                  '</div>' +
                  '<div style="width:250px; height:12px; margin-top:4px; margin-left:10px;">' + 
                     '<span id="CBST" style="width:36px; height:12px; margin-left:15px;font-size:11px;" >' +
                           '抄表段' +
                     '</span>' +
                     '<span id="PBST" style="width:24px; height:12px; margin-left:32px;font-size:11px;">'  +
                           '配变' +
                     '</span>' +
                     '<span id="TQST" style="width:24px; height:12px; margin-left:38px;font-size:11px;">' +
                           '台区' +   
                     '</span>' +
                     '<span id="XLST" style="width:35px; height:12px; margin-left:38px;font-size:11px;" >' +
                           '线路' +
                     '</span>' +
                  '</div>' +
               '</div>' +
            '</span>' +
         '</div>';
         
//八大视图样式DIV
if(typeof jQuery == "function"){
 	$(function(){
		try {
			var root;
			var flg = 1;
		       root=getContextRoot()
			if (flg == 1) {
				viewInit();
			}
		} catch (e) {
			//跨域
			viewInit();
		}
	});
	
/**
	* 八大视图共通
	* @author hmn
	*/
	function viewInit(){
		//配置文件读取
		var meterStr = '电表资产号';
		var userStr = '用户编号';
		var tmnlStr = '终端资产号,所属终端';
		var simStr = 'SIM卡号';
		var cbStr = '抄表段编号';
		var pbStr = '配变表号';
		var tgStr = '台区编号';
		var lineStr = '线路编号'; 
		try {
			if (($(".dataGrid:first") != null) && ($(".dataGrid:first").contents().find("tr:eq(0)").children().length != 0)) {
				if($(".dataGrid:first").find("tr").length <= 1 || $(".dataGrid:first").find("tr").length > 111) {
					return;
				}
				//写DIV
		   		var box = document.createElement('div');
				box.id="ty_viewDivId";
		        box.style.position = "absolute";
				box.style.zIndex=9999;
		        box.style.display = "none";
				document.body.appendChild(box);
				document.getElementById("ty_viewDivId").innerHTML = MB_DIVSTR;
				
				//绑定事件
				$("#closeX").click(function(event){
					$("#ty_viewDivId").css("display","none");
					if (obj != undefined) {
						obj.css('backgroundColor',color);
					}
				});
				
				//初始化
				var dbjwz = -1; 
				var yhwz = -1;
				var zdzcwz = -1;
				var simwz = -1;
				var cbdwz = -1;
				var pbbwz = -1;
				var tqwz = -1;
				var xlwz = -1;
				var tdlen = $(".dataGrid:first").find("tr:eq(0)").children().length;
				var myDate = new Date();
				var dataTitleIndexArrsIndex = 0;
				//判断是否有这些视图
			    $(".dataGrid:first").contents().find("tr:eq(0)").children().each(function(){
					var text = $(this).text().trim();
					dataTitleIndexArrs[dataTitleIndexArrsIndex] = $(this).attr('colspan');
					
					var meterArr = meterStr.split(',');
					for (i = 0; i < meterArr.length; i++){
						if (text == meterArr[i]) {
					    	dbjwz = dataTitleIndexArrsIndex;
					    	break;
						} 
					}
					
					var userArr = userStr.split(',');
					for (i = 0; i < userArr.length; i++){
						if (text == userArr[i]) {
					    	yhwz = dataTitleIndexArrsIndex;
					    	break;
						} 
					}
					
					var tmnlArr = tmnlStr.split(',');
					for (i = 0; i < tmnlArr.length; i++){
						if (text == tmnlArr[i]) {
					    	zdzcwz = dataTitleIndexArrsIndex;
					    	break;
						} 
					}
					
					var simArr = simStr.split(',');
					for (i = 0; i < simArr.length; i++){
						if (text == simArr[i]) {
					    	simwz = dataTitleIndexArrsIndex;
					    	break;
						} 
					}
					
					var cbArr = cbStr.split(',');
					for (i = 0; i < cbArr.length; i++){
						if (text == cbArr[i]) {
					    	cbdwz = dataTitleIndexArrsIndex;
					    	break;
						} 
					}
					
					var pbArr = pbStr.split(',');
					for (i = 0; i < pbArr.length; i++){
						if (text == pbArr[i]) {
					    	pbbwz = dataTitleIndexArrsIndex;
					    	break;
						} 
					}
					
					var tgArr = tgStr.split(',');
					for (i = 0; i < tgArr.length; i++){
						if (text == tgArr[i]) {
					    	tqwz = dataTitleIndexArrsIndex;
					    	break;
						} 
					}
					
					var lineArr = lineStr.split(',');
					for (i = 0; i < lineArr.length; i++){
						if (text == lineArr[i]) {
					    	xlwz = dataTitleIndexArrsIndex;
					    	break;
						} 
					}
					dataTitleIndexArrsIndex++;
				});
				
			    if (dbjwz != -1) {
					$("#dbtbdiv").css('background','url('+getRequestUrl()+'images/aueic/icon_db.png)');
					$("#dbtbdiv").css('cursor','hand');
					$("#DBST").css('cursor','hand');
				    //查找对应列号
					dbjwz = getDataIndex(dbjwz);
				} else {
					$("#dbtbdiv").css('background','url('+getRequestUrl()+'images/aueic/icon_db_hs.png)');
					$("#dbtbdiv").css('cursor','auto');
					$("#DBST").css('cursor','auto');
				}
				
			    if (yhwz != -1) {
					$("#yhtbdiv").css('background','url('+getRequestUrl()+'images/aueic/icon_yh.png)');
					$("#yhtbdiv").css('cursor','hand');
					$("#YHST").css('cursor','hand');
				    //查找对应列号
					yhwz = getDataIndex(yhwz);
				} else {
					$("#yhtbdiv").css('background','url('+getRequestUrl()+'images/aueic/icon_yh_hs.png)');
					$("#yhtbdiv").css('cursor','auto');
					$("#YHST").css('cursor','auto');
				}
				
			    if (zdzcwz != -1) {
					$("#zdtbdiv").css('background','url('+getRequestUrl()+'images/aueic/icon_zd_new.png)');
					$("#zdtbdiv").css('cursor','hand');
					$("#ZDST").css('cursor','hand');
				    //查找对应列号
					zdzcwz = getDataIndex(zdzcwz);
				} else {
					$("#zdtbdiv").css('background','url('+getRequestUrl()+'images/aueic/icon_zd_hs_new.png)');
					$("#zdtbdiv").css('cursor','auto');
					$("#ZDST").css('cursor','auto');
				}		
				
			    if (simwz != -1) {
					$("#simtbdiv").css('background','url('+getRequestUrl()+'images/aueic/icon_SIM.png)');
					$("#simtbdiv").css('cursor','hand');
					$("#SIMST").css('cursor','hand');
				    //查找对应列号
					simwz = getDataIndex(simwz);
				} else {
					$("#simtbdiv").css('background','url('+getRequestUrl()+'images/aueic/icon_SIM_hs.png)');
					$("#simtbdiv").css('cursor','auto');
					$("#SIMST").css('cursor','auto');
				}		
				
			    if (cbdwz != -1) {
					$("#cbtbdiv").css('background','url('+getRequestUrl()+'images/aueic/icon_cbd.png)');
					$("#cbtbdiv").css('cursor','hand');
					$("#CBST").css('cursor','hand');
				    //查找对应列号
					cbdwz = getDataIndex(cbdwz);
				} else {
					$("#cbtbdiv").css('background','url('+getRequestUrl()+'images/aueic/icon_cbd_hs.png)');
					$("#cbtbdiv").css('cursor','auto');
					$("#CBST").css('cursor','auto');
				}	
				
			    if (pbbwz != -1) {
					$("#pbtbdiv").css('background','url('+getRequestUrl()+'images/aueic/icon_pb_new.png)');
					$("#pbtbdiv").css('cursor','hand');
					$("#PBST").css('cursor','hand');
				    //查找对应列号
					pbbwz = getDataIndex(pbbwz);
				} else {
					$("#pbtbdiv").css('background','url('+getRequestUrl()+'images/aueic/icon_pb_hs_new.png)');
					$("#pbtbdiv").css('cursor','auto');
					$("#PBST").css('cursor','auto');
				}
				
			    if (tqwz != -1) {
					$("#tqtbdiv").css('background','url('+getRequestUrl()+'images/aueic/icon_tq_new.png)');
					$("#tqtbdiv").css('cursor','hand');
					$("#TQST").css('cursor','hand');
				    //查找对应列号
					tqwz = getDataIndex(tqwz);
				} else {
					$("#tqtbdiv").css('background','url('+getRequestUrl()+'images/aueic/icon_tq_hs_new.png)');
					$("#tqtbdiv").css('cursor','auto');
					$("#TQST").css('cursor','auto');
				}		
				
			    if (xlwz != -1) {
					$("#xltbdiv").css('background','url('+getRequestUrl()+'images/aueic/icon_xl.png)');
					$("#xltbdiv").css('cursor','hand');
					$("#XLST").css('cursor','hand');
				    //查找对应列号
					xlwz = getDataIndex(xlwz);
				} else {
					$("#xltbdiv").css('background','url('+getRequestUrl()+'images/aueic/icon_xl_hs.png)');
					$("#xltbdiv").css('cursor','auto');
					$("#XLST").css('cursor','auto');
				}		
						    
			    //初始化
				var dbpara = '';
				var yhpara = '';
				var zdpara = '';
				var simpara = '';
				var pbpara = '';
				var tqpara = '';
				var xlpara = '';
			    //动态绑定点击事件
			   	//电表局编号
			    if (dbjwz != -1) {
		   			$('#dbtbdiv').click(function(){
						$("#ty_viewDivId").css("display","none");
						try{
			   				if(window.opener != undefined && window.opener.top.commonView != undefined){
			   					window.opener.top.commonView('dbtyst', dbpara);
			   				}else if (parent.window.opener != undefined && commonView != undefined){
			   					commonView('dbtyst', dbpara);
			   				}else if (window.top.commonView != undefined){
			   					window.top.commonView('dbtyst', dbpara);
			   				}
		   				}catch(e){
		   					try{
			   					var url;
			   					if(parent && parent.document.getElementById("crossBaseUrl")){
				   					url = parent.$("#crossBaseUrl").val()+"pages/advManage/lineLossManage/crossDomain/eightView.jsp?flag=dbtyst&para="+dbpara;
			   					}else if(top.window.opener && top.window.opener.parent && top.window.opener.parent.document.getElementById("crossBaseUrl")){
			   						url = top.window.opener.parent.$("#crossBaseUrl").val()+"pages/advManage/lineLossManage/crossDomain/eightViewForWin.jsp?flag=dbtyst&para="+dbpara;
			   					}
			   					if(url==undefined || isNullOrEmpty(url)){
			   						return;
			   					}
								if(!document.getElementById("eightViewCrossFrame")){
									var ifm = document.createElement("iframe");
									ifm.id="eightViewCrossFrame";
									ifm.style.display = "none";
									document.body.appendChild(ifm);
								}
								$("#eightViewCrossFrame").attr("src",url);
								window.status='完成';
			   				}catch(e){}
		   				}
					});
		   			$('#DBST').click(function(){
						$("#ty_viewDivId").css("display","none");
						try{
			   				if(window.opener != undefined && window.opener.top.commonView != undefined){
			   					window.opener.top.commonView('dbtyst', dbpara);
			   				}else if (parent.window.opener != undefined && commonView != undefined){
			   					commonView('dbtyst', dbpara);
			   				}else if (window.top.commonView != undefined){
			   					window.top.commonView('dbtyst', dbpara);
			   				}
		   				}catch(e){
		   					try{
			   					var url;
			   					if(parent && parent.document.getElementById("crossBaseUrl")){
				   					url = parent.$("#crossBaseUrl").val()+"pages/advManage/lineLossManage/crossDomain/eightView.jsp?flag=dbtyst&para="+dbpara;
			   					}else if(top.window.opener && top.window.opener.parent && top.window.opener.parent.document.getElementById("crossBaseUrl")){
			   						url = top.window.opener.parent.$("#crossBaseUrl").val()+"pages/advManage/lineLossManage/crossDomain/eightViewForWin.jsp?flag=dbtyst&para="+dbpara;
			   					}
			   					if(url==undefined || isNullOrEmpty(url)){
			   						return;
			   					}
								if(!document.getElementById("eightViewCrossFrame")){
									var ifm = document.createElement("iframe");
									ifm.id="eightViewCrossFrame";
									ifm.style.display = "none";
									document.body.appendChild(ifm);
								}
								$("#eightViewCrossFrame").attr("src",url);
								window.status='完成';
			   				}catch(e){}
		   				}
					});
				}
				//用户编号
				if (yhwz != -1) {
		   			$('#yhtbdiv').click(function(){
						$("#ty_viewDivId").css("display","none");
						try{
			   				if(window.opener != undefined && window.opener.top.commonView != undefined){
			   					window.opener.top.commonView('yhydfxx', yhpara);
			   				}else if (parent.window.opener != undefined && commonView != undefined){
			   					commonView('yhydfxx', yhpara);
			   				}else if (window.top.commonView != undefined){
			   					window.top.commonView('yhydfxx', yhpara);
			   				}
		   				}catch(e){
		   					try{
			   					var url;
			   					if(parent && parent.document.getElementById("crossBaseUrl")){
				   					url = parent.$("#crossBaseUrl").val()+"pages/advManage/lineLossManage/crossDomain/eightView.jsp?flag=yhydfxx&para="+yhpara;
			   					}else if(top.window.opener && top.window.opener.parent && top.window.opener.parent.document.getElementById("crossBaseUrl")){
			   						url = top.window.opener.parent.$("#crossBaseUrl").val()+"pages/advManage/lineLossManage/crossDomain/eightViewForWin.jsp?flag=yhydfxx&para="+yhpara;
			   					}
			   					if(url==undefined || isNullOrEmpty(url)){
			   						return;
			   					}
								if(!document.getElementById("eightViewCrossFrame")){
									var ifm = document.createElement("iframe");
									ifm.id="eightViewCrossFrame";
									ifm.style.display = "none";
									document.body.appendChild(ifm);
								}
								$("#eightViewCrossFrame").attr("src",url);
								window.status='完成';
			   				}catch(e){}
		   				}
					});
		   			$('#YHST').click(function(){
						$("#ty_viewDivId").css("display","none");
						try{
			   				if(window.opener != undefined && window.opener.top.commonView != undefined){
			   					window.opener.top.commonView('yhydfxx', yhpara);
			   				}else if (parent.window.opener != undefined && commonView != undefined){
			   					commonView('yhydfxx', yhpara);
			   				}else if (window.top.commonView != undefined){
			   					window.top.commonView('yhydfxx', yhpara);
			   				}
		   				}catch(e){
		   					try{
			   					var url;
			   					if(parent && parent.document.getElementById("crossBaseUrl")){
				   					url = parent.$("#crossBaseUrl").val()+"pages/advManage/lineLossManage/crossDomain/eightView.jsp?flag=yhydfxx&para="+yhpara;
			   					}else if(top.window.opener && top.window.opener.parent && top.window.opener.parent.document.getElementById("crossBaseUrl")){
			   						url = top.window.opener.parent.$("#crossBaseUrl").val()+"pages/advManage/lineLossManage/crossDomain/eightViewForWin.jsp?flag=yhydfxx&para="+yhpara;
			   					}
			   					if(url==undefined || isNullOrEmpty(url)){
			   						return;
			   					}
								if(!document.getElementById("eightViewCrossFrame")){
									var ifm = document.createElement("iframe");
									ifm.id="eightViewCrossFrame";
									ifm.style.display = "none";
									document.body.appendChild(ifm);
								}
								$("#eightViewCrossFrame").attr("src",url);
								window.status='完成';
			   				}catch(e){}
		   				}
					});
				}
				//终端资产号
				if (zdzcwz != -1) {
		   			$('#zdtbdiv').click(function(){
						$("#ty_viewDivId").css("display","none");
						try{
			   				if(window.opener != undefined && window.opener.top.commonView != undefined){
			   					window.opener.top.commonView('zdtyst', zdpara);
			   				}else if (parent.window.opener != undefined && commonView != undefined){
			   					commonView('zdtyst', zdpara);
			   				}else if (window.top.commonView != undefined){
			   					window.top.commonView('zdtyst', zdpara);
			   				}
		   				}catch(e){
		   					try{
		   					    var url;
			   					if(parent && parent.document.getElementById("crossBaseUrl")){
				   					url = parent.$("#crossBaseUrl").val()+"pages/advManage/lineLossManage/crossDomain/eightView.jsp?flag=zdtyst&para="+zdpara;
			   					}else if(top.window.opener && top.window.opener.parent && top.window.opener.parent.document.getElementById("crossBaseUrl")){
			   						url = top.window.opener.parent.$("#crossBaseUrl").val()+"pages/advManage/lineLossManage/crossDomain/eightViewForWin.jsp?flag=zdtyst&para="+zdpara;
			   					}
			   					if(url==undefined || isNullOrEmpty(url)){
			   						return;
			   					}
								if(!document.getElementById("eightViewCrossFrame")){
									var ifm = document.createElement("iframe");
									ifm.id="eightViewCrossFrame";
									ifm.style.display = "none";
									document.body.appendChild(ifm);
								}
								$("#eightViewCrossFrame").attr("src",url);
								window.status='完成';
			   				}catch(e){}
		   				}
					});
		   			$('#ZDST').click(function(){
						$("#ty_viewDivId").css("display","none");
						try{
			   				if(window.opener != undefined && window.opener.top.commonView != undefined){
			   					window.opener.top.commonView('zdtyst', zdpara);
			   				}else if (parent.window.opener != undefined && commonView != undefined){
			   					commonView('zdtyst', zdpara);
			   				}else if (window.top.commonView != undefined){
			   					window.top.commonView('zdtyst', zdpara);
			   				}
		   				}catch(e){
		   					try{
		   					    var url;
			   					if(parent && parent.document.getElementById("crossBaseUrl")){
				   					url = parent.$("#crossBaseUrl").val()+"pages/advManage/lineLossManage/crossDomain/eightView.jsp?flag=zdtyst&para="+zdpara;
			   					}else if(top.window.opener && top.window.opener.parent && top.window.opener.parent.document.getElementById("crossBaseUrl")){
			   						url = top.window.opener.parent.$("#crossBaseUrl").val()+"pages/advManage/lineLossManage/crossDomain/eightViewForWin.jsp?flag=zdtyst&para="+zdpara;
			   					}
			   					if(url==undefined || isNullOrEmpty(url)){
			   						return;
			   					}
								if(!document.getElementById("eightViewCrossFrame")){
									var ifm = document.createElement("iframe");
									ifm.id="eightViewCrossFrame";
									ifm.style.display = "none";
									document.body.appendChild(ifm);
								}
								$("#eightViewCrossFrame").attr("src",url);
								window.status='完成';
			   				}catch(e){}
		   				}
					});
				}
				//SIM卡号
				if (simwz != -1) {
		   			$('#simtbdiv').click(function(){
						$("#ty_viewDivId").css("display","none");
						try{
			   				if(window.opener != undefined && window.opener.top.commonView != undefined){
			   					window.opener.top.commonView('SIMSHIT', simpara);
			   				}else if (parent.window.opener != undefined && commonView != undefined){
			   					commonView('SIMSHIT', simpara);
			   				}else if (window.top.commonView != undefined){
			   					window.top.commonView('SIMSHIT', simpara);
			   				}
		   				}catch(e){
		   					try{
		   					    var url;
			   					if(parent && parent.document.getElementById("crossBaseUrl")){
				   					url = parent.$("#crossBaseUrl").val()+"pages/advManage/lineLossManage/crossDomain/eightView.jsp?flag=SIMSHIT&para="+simpara;
			   					}else if(top.window.opener && top.window.opener.parent && top.window.opener.parent.document.getElementById("crossBaseUrl")){
			   						url = top.window.opener.parent.$("#crossBaseUrl").val()+"pages/advManage/lineLossManage/crossDomain/eightViewForWin.jsp?flag=SIMSHIT&para="+simpara;
			   					}
			   					if(url==undefined || isNullOrEmpty(url)){
			   						return;
			   					}
								if(!document.getElementById("eightViewCrossFrame")){
									var ifm = document.createElement("iframe");
									ifm.id="eightViewCrossFrame";
									ifm.style.display = "none";
									document.body.appendChild(ifm);
								}
								$("#eightViewCrossFrame").attr("src",url);
								window.status='完成';
			   				}catch(e){}
		   				}
					});
		   			$('#SIMST').click(function(){
						$("#ty_viewDivId").css("display","none");
						try{
			   				if(window.opener != undefined && window.opener.top.commonView != undefined){
			   					window.opener.top.commonView('SIMSHIT', simpara);
			   				}else if (parent.window.opener != undefined && commonView != undefined){
			   					commonView('SIMSHIT', simpara);
			   				}else if (window.top.commonView != undefined){
			   					window.top.commonView('SIMSHIT', simpara);
			   				}
		   				}catch(e){
		   					try{
		   					    var url;
			   					if(parent && parent.document.getElementById("crossBaseUrl")){
				   					url = parent.$("#crossBaseUrl").val()+"pages/advManage/lineLossManage/crossDomain/eightView.jsp?flag=SIMSHIT&para="+simpara;
			   					}else if(top.window.opener && top.window.opener.parent && top.window.opener.parent.document.getElementById("crossBaseUrl")){
			   						url = top.window.opener.parent.$("#crossBaseUrl").val()+"pages/advManage/lineLossManage/crossDomain/eightViewForWin.jsp?flag=SIMSHIT&para="+simpara;
			   					}
			   					if(url==undefined || isNullOrEmpty(url)){
			   						return;
			   					}
								if(!document.getElementById("eightViewCrossFrame")){
									var ifm = document.createElement("iframe");
									ifm.id="eightViewCrossFrame";
									ifm.style.display = "none";
									document.body.appendChild(ifm);
								}
								$("#eightViewCrossFrame").attr("src",url);
								window.status='完成';
			   				}catch(e){}
		   				}
					});
				}
				//配变表号
				if (pbbwz != -1) {
		   			$('#pbtbdiv').click(function(){
						$("#ty_viewDivId").css("display","none");
						try{
			   				if(window.opener != undefined && window.opener.top.commonView != undefined){
			   					window.opener.top.commonView('pbtyst', pbpara);
			   				}else if (parent.window.opener != undefined && commonView != undefined){
			   					commonView('pbtyst', pbpara);
			   				}else if (window.top.commonView != undefined){
			   					window.top.commonView('pbtyst', pbpara);
			   				}
		   				}catch(e){
		   					try{
		   					    var url;
			   					if(parent && parent.document.getElementById("crossBaseUrl")){
				   					url = parent.$("#crossBaseUrl").val()+"pages/advManage/lineLossManage/crossDomain/eightView.jsp?flag=pbtyst&para="+pbpara;
			   					}else if(top.window.opener && top.window.opener.parent && top.window.opener.parent.document.getElementById("crossBaseUrl")){
			   						url = top.window.opener.parent.$("#crossBaseUrl").val()+"pages/advManage/lineLossManage/crossDomain/eightViewForWin.jsp?flag=pbtyst&para="+pbpara;
			   					}
			   					if(url==undefined || isNullOrEmpty(url)){
			   						return;
			   					}
								if(!document.getElementById("eightViewCrossFrame")){
									var ifm = document.createElement("iframe");
									ifm.id="eightViewCrossFrame";
									ifm.style.display = "none";
									document.body.appendChild(ifm);
								}
								$("#eightViewCrossFrame").attr("src",url);
								window.status='完成';
			   				}catch(e){}
		   				}
					});
		   			$('#PBST').click(function(){
						$("#ty_viewDivId").css("display","none");
						try{
			   				if(window.opener != undefined && window.opener.top.commonView != undefined){
			   					window.opener.top.commonView('pbtyst', pbpara);
			   				}else if (parent.window.opener != undefined && commonView != undefined){
			   					commonView('pbtyst', pbpara);
			   				}else if (window.top.commonView != undefined){
			   					window.top.commonView('pbtyst', pbpara);
			   				}
		   				}catch(e){
		   					try{
		   					    var url;
			   					if(parent && parent.document.getElementById("crossBaseUrl")){
				   					url = parent.$("#crossBaseUrl").val()+"pages/advManage/lineLossManage/crossDomain/eightView.jsp?flag=pbtyst&para="+pbpara;
			   					}else if(top.window.opener && top.window.opener.parent && top.window.opener.parent.document.getElementById("crossBaseUrl")){
			   						url = top.window.opener.parent.$("#crossBaseUrl").val()+"pages/advManage/lineLossManage/crossDomain/eightViewForWin.jsp?flag=pbtyst&para="+pbpara;
			   					}
			   					if(url==undefined || isNullOrEmpty(url)){
			   						return;
			   					}
								if(!document.getElementById("eightViewCrossFrame")){
									var ifm = document.createElement("iframe");
									ifm.id="eightViewCrossFrame";
									ifm.style.display = "none";
									document.body.appendChild(ifm);
								}
								$("#eightViewCrossFrame").attr("src",url);
								window.status='完成';
			   				}catch(e){}
		   				}
		 			});
				}
				//台区编号
				if (tqwz != -1) {
		   			$('#tqtbdiv').click(function(){
						$("#ty_viewDivId").css("display","none");
						try{
			   				if(window.opener != undefined && window.opener.top.commonView != undefined){
			   					window.opener.top.commonView('tqtyst', tqpara);
			   				}else if (parent.window.opener != undefined && commonView != undefined){
			   					commonView('tqtyst', tqpara);
			   				}else if (window.top.commonView != undefined){
			   					window.top.commonView('tqtyst', tqpara);
			   				}
		   				}catch(e){
			   				try{
		   					    var url;
			   					if(parent && parent.document.getElementById("crossBaseUrl")){
				   					url = parent.$("#crossBaseUrl").val()+"pages/advManage/lineLossManage/crossDomain/eightView.jsp?flag=tqtyst&para="+tqpara;
			   					}else if(top.window.opener && top.window.opener.parent && top.window.opener.parent.document.getElementById("crossBaseUrl")){
			   						url = top.window.opener.parent.$("#crossBaseUrl").val()+"pages/advManage/lineLossManage/crossDomain/eightViewForWin.jsp?flag=tqtyst&para="+tqpara;
			   					}
			   					if(url==undefined || isNullOrEmpty(url)){
			   						return;
			   					}
								if(!document.getElementById("eightViewCrossFrame")){
									var ifm = document.createElement("iframe");
									ifm.id="eightViewCrossFrame";
									ifm.style.display = "none";
									document.body.appendChild(ifm);
								}
								$("#eightViewCrossFrame").attr("src",url);
								window.status='完成';
			   				}catch(e){}
		   				}
					});
		   			$('#TQST').click(function(){
						$("#ty_viewDivId").css("display","none");
						try{
			   				if(window.opener != undefined && window.opener.top.commonView != undefined){
			   					window.opener.top.commonView('tqtyst', tqpara);
			   				}else if (parent.window.opener != undefined && commonView != undefined){
			   					commonView('tqtyst', tqpara);
			   				}else if (window.top.commonView != undefined){
			   					window.top.commonView('tqtyst', tqpara);
			   				}
		   				}catch(e){
		   					try{
		   					    var url;
			   					if(parent && parent.document.getElementById("crossBaseUrl")){
				   					url = parent.$("#crossBaseUrl").val()+"pages/advManage/lineLossManage/crossDomain/eightView.jsp?flag=tqtyst&para="+tqpara;
			   					}else if(top.window.opener && top.window.opener.parent && top.window.opener.parent.document.getElementById("crossBaseUrl")){
			   						url = top.window.opener.parent.$("#crossBaseUrl").val()+"pages/advManage/lineLossManage/crossDomain/eightViewForWin.jsp?flag=tqtyst&para="+tqpara;
			   					}
			   					if(url==undefined || isNullOrEmpty(url)){
			   						return;
			   					}
								if(!document.getElementById("eightViewCrossFrame")){
									var ifm = document.createElement("iframe");
									ifm.id="eightViewCrossFrame";
									ifm.style.display = "none";
									document.body.appendChild(ifm);
								}
								$("#eightViewCrossFrame").attr("src",url);
								window.status='完成';
			   				}catch(e){}
		   				}
		  			});
				}
			    
	  			//线路编号
				if (xlwz != -1) {
		   			$('#xltbdiv').click(function(){
						$("#ty_viewDivId").css("display","none");
						try{
			   				if(window.opener != undefined && window.opener.top.commonView != undefined){
			   					window.opener.top.commonView('xltyst', xlpara);
			   				}else if (parent.window.opener != undefined && commonView != undefined){
			   					commonView('xltyst', xlpara);
			   				}else if (window.top.commonView != undefined){
			   					window.top.commonView('xltyst', xlpara);
			   				}
		   				}catch(e){
			   				try{
		   					    var url;
			   					if(parent && parent.document.getElementById("crossBaseUrl")){
				   					url = parent.$("#crossBaseUrl").val()+"pages/advManage/lineLossManage/crossDomain/eightView.jsp?flag=xltyst&para="+xlpara;
			   					}else if(top.window.opener && top.window.opener.parent && top.window.opener.parent.document.getElementById("crossBaseUrl")){
			   						url = top.window.opener.parent.$("#crossBaseUrl").val()+"pages/advManage/lineLossManage/crossDomain/eightViewForWin.jsp?flag=xltyst&para="+xlpara;
			   					}
			   					if(url==undefined || isNullOrEmpty(url)){
			   						return;
			   					}
								if(!document.getElementById("eightViewCrossFrame")){
									var ifm = document.createElement("iframe");
									ifm.id="eightViewCrossFrame";
									ifm.style.display = "none";
									document.body.appendChild(ifm);
								}
								$("#eightViewCrossFrame").attr("src",url);
								window.status='完成';
			   				}catch(e){}
		   				}
					});
		   			$('#XLST').click(function(){
						$("#ty_viewDivId").css("display","none");
						try{
			   				if(window.opener != undefined && window.opener.top.commonView != undefined){
			   					window.opener.top.commonView('xltyst', xlpara);
			   				}else if (parent.window.opener != undefined && commonView != undefined){
			   					commonView('xltyst', xlpara);
			   				}else if (window.top.commonView != undefined){
			   					window.top.commonView('xltyst', xlpara);
			   				}
		   				}catch(e){
		   					try{
		   					    var url;
			   					if(parent && parent.document.getElementById("crossBaseUrl")){
				   					url = parent.$("#crossBaseUrl").val()+"pages/advManage/lineLossManage/crossDomain/eightView.jsp?flag=xltyst&para="+xlpara;
			   					}else if(top.window.opener && top.window.opener.parent && top.window.opener.parent.document.getElementById("crossBaseUrl")){
			   						url = top.window.opener.parent.$("#crossBaseUrl").val()+"pages/advManage/lineLossManage/crossDomain/eightViewForWin.jsp?flag=xltyst&para="+xlpara;
			   					}
			   					if(url==undefined || isNullOrEmpty(url)){
			   						return;
			   					}
								if(!document.getElementById("eightViewCrossFrame")){
									var ifm = document.createElement("iframe");
									ifm.id="eightViewCrossFrame";
									ifm.style.display = "none";
									document.body.appendChild(ifm);
								}
								$("#eightViewCrossFrame").attr("src",url);
								window.status='完成';
			   				}catch(e){}
		   				}
		  			});
				}
					
			    var regForView = /^[0-9a-zA-Z][0-9a-zA-Z_\-]*$/;
			    
			    var obj;
			    var color;
			    //如果一个视图都没有，那就不显示div
		        if (dbjwz != -1 || yhwz != -1 || zdzcwz != -1|| simwz != -1|| cbdwz != -1|| pbbwz != -1|| tqwz != -1|| xlwz != -1) {
		        	//为了不影响性能，只在查询结果前100的情况下绑定事件
		      		if($(".dataGrid:first").find("tr").length > 1 && $(".dataGrid:first").find("tr").length < 111) {
						$(".dataGrid:first").find("tr:gt(0)").each(function(){
							//避免多次重复绑定
							$(this).unbind('mousedown');
							$(this).mousedown(function(e){
								if(e.button == 2) {
								try {
								 	//弹出窗口的弹出窗口以及再下层的窗口就不显示了
						  			if((window.opener != undefined && window.opener.top.commonView != undefined) 
						   				|| (parent.window.opener != undefined && commonView != undefined)
						   				||(window.top.commonView != undefined)){
							   				//值为空也不让他弹出视图页面
							   				var isTanChuSTFlg = false;
								 			if (dbjwz != -1) {
								 				if (regForView.test($(this).children("td:eq(" + dbjwz + ")").text().trim())) {
								 					isTanChuSTFlg = true;
								 				}
											} 
											
										    if (yhwz != -1) {
								 				if (regForView.test($(this).children("td:eq(" + yhwz + ")").text().trim())) {
								 					isTanChuSTFlg = true;
								 				}
											} 
											
										    if (zdzcwz != -1) {
								 				if (regForView.test($(this).children("td:eq(" + zdzcwz + ")").text().trim())) {
								 					isTanChuSTFlg = true;
								 				}
											} 
											
										    if (simwz != -1) {
								 				if (regForView.test($(this).children("td:eq(" + simwz + ")").text().trim())) {
								 					isTanChuSTFlg = true;
								 				}
											}
											
										    if (cbdwz != -1) {
								 				if (regForView.test($(this).children("td:eq(" + cbdwz + ")").text().trim())) {
								 					isTanChuSTFlg = true;
								 				}
											} 
											
										    if (pbbwz != -1) {
								 				if (regForView.test($(this).children("td:eq(" + pbbwz + ")").text().trim())) {
								 					isTanChuSTFlg = true;
								 				}
											} 
											
										    if (tqwz != -1) {
								 				if (regForView.test($(this).children("td:eq(" + tqwz + ")").text().trim())) {
								 					isTanChuSTFlg = true;
								 				}
											} 	
											
										    if (xlwz != -1) {
								 				if (regForView.test($(this).children("td:eq(" + xlwz + ")").text().trim())) {
								 					isTanChuSTFlg = true;
								 				}
											} 
							   				
							   				if (isTanChuSTFlg) {
												//计算显示位置
												var left = e.clientX+1;
												var top = e.clientY+1;
												if (top + 150 > $("body").height()) {
													top = top - 150;
												}
												if (left + 300 > $("body").width() ) {
													left = left - 300
												}
					   
												//显示
					    						$("#ty_viewDivId").css({"left": left, "top": top });
					    						$("#ty_viewDivId").css("display","block");
					    
											    //参数赋值
											    dbpara = '?asset_no='+$(this).children("td:eq(" + dbjwz + ")").text().trim();
											    yhpara = '?consNo='+$(this).children("td:eq(" + yhwz + ")").text().trim();
											    simpara = '?simView.simNo='+$(this).children("td:eq(" + simwz + ")").text().trim();
											    zdpara = '?assetNo='+$(this).children("td:eq(" + zdzcwz + ")").text().replaceAll('-','').trim();
											    pbpara = '?pbMviewModel.assetNo='+$(this).children("td:eq(" + pbbwz + ")").text().trim();
											    tqpara = '?tgNo='+$(this).children("td:eq(" + tqwz + ")").text().trim().trim();
												xlpara = '?lineViewModel.lineNo='+$(this).children("td:eq(" + xlwz + ")").text().trim().trim();
												
												if (obj != undefined) {
													obj.css('backgroundColor',color);
												}
												color = $(this).css('backgroundColor');
											    $(this).css('backgroundColor','#66c6c3');
												obj = $(this);
											}
										}
									} catch(ex){
										//跨域
										try{
											//值为空也不让他弹出视图页面
							   				var isTanChuSTFlg = false;
								 			if (dbjwz != -1) {
								 				if (regForView.test($(this).children("td:eq(" + dbjwz + ")").text().trim())) {
								 					isTanChuSTFlg = true;
								 				}
											} 
										    if (yhwz != -1) {
								 				if (regForView.test($(this).children("td:eq(" + yhwz + ")").text().trim())) {
								 					isTanChuSTFlg = true;
								 				}
											} 
											
										    if (zdzcwz != -1) {
								 				if (regForView.test($(this).children("td:eq(" + zdzcwz + ")").text().trim())) {
								 					isTanChuSTFlg = true;
								 				}
											} 
											
										    if (simwz != -1) {
								 				if (regForView.test($(this).children("td:eq(" + simwz + ")").text().trim())) {
								 					isTanChuSTFlg = true;
								 				}
											}
											
										    if (cbdwz != -1) {
								 				if (regForView.test($(this).children("td:eq(" + cbdwz + ")").text().trim())) {
								 					isTanChuSTFlg = true;
								 				}
											} 
											
										    if (pbbwz != -1) {
								 				if (regForView.test($(this).children("td:eq(" + pbbwz + ")").text().trim())) {
								 					isTanChuSTFlg = true;
								 				}
											} 
											
										    if (tqwz != -1) {
								 				if (regForView.test($(this).children("td:eq(" + tqwz + ")").text().trim())) {
								 					isTanChuSTFlg = true;
								 				}
											} 	
											
										    if (xlwz != -1) {
								 				if (regForView.test($(this).children("td:eq(" + xlwz + ")").text().trim())) {
								 					isTanChuSTFlg = true;
								 				}
											} 
							   				if (isTanChuSTFlg) {
												//计算显示位置
												var left = e.clientX+1;
												var top = e.clientY+1;
												if (top + 150 > $("body").height()) {
													top = top - 150;
												}
												if (left + 300 > $("body").width() ) {
													left = left - 300;
												}
					   
												//显示
					    						$("#ty_viewDivId").css({"left": left, "top": top });
					    						$("#ty_viewDivId").css("display","block");
											    //参数赋值
											    dbpara = '?asset_no='+$(this).children("td:eq(" + dbjwz + ")").text().trim();
											    yhpara = '?consNo='+$(this).children("td:eq(" + yhwz + ")").text().trim();
											    simpara = '?simView.simNo='+$(this).children("td:eq(" + simwz + ")").text().trim();
											    zdpara = '?assetNo='+$(this).children("td:eq(" + zdzcwz + ")").text().replaceAll('-','').trim();
											    pbpara = '?pbMviewModel.assetNo='+$(this).children("td:eq(" + pbbwz + ")").text().trim();
											    tqpara = '?tgNo='+$(this).children("td:eq(" + tqwz + ")").text().trim().trim();
												xlpara = '?lineViewModel.lineNo='+$(this).children("td:eq(" + xlwz + ")").text().trim().trim();
												
												if (obj != undefined) {
													obj.css('backgroundColor',color);
												}
												color = $(this).css('backgroundColor');
											    $(this).css('backgroundColor','#66c6c3');
												obj = $(this);
											}
										}catch(el){}
									}
								}
		       				})
		     			});
		     			
		     			$(".dataGrid:first").mouseout(function(event){
					     	//恢复右键菜单
					    	document.oncontextmenu=function(){
					    		window.event.returnValue = true;
					    	}
				        });
				        $(".dataGrid:first").mousedown(function(e){
							if(e.button == 2) {
						     	//取消右键菜单
						     	document.oncontextmenu=function(){
						     		window.event.returnValue = false;
						     	}
					     	}
				        });
					}
				}
			}
		} catch(e){}
	}
}

function getContextRoot(){
	return gdc.webContextRoot;
}

//八大视图调用
function commonView(busiCode, queryPara){
	Ext.Ajax.request({
	url : gdc.webContextRoot + 'sysManageLogin/findSysFuncIdNameAndUrl.action',
	params : {"busiCode" : busiCode},
	success : function(result,request) {
			var res = result.responseText;
			var funcList=jsonDecode(res);
			if (!isNullOrEmpty(funcList)) {
				var id = funcList[0].SYSTEM_ID+','+funcList[0].ID;
				var name = funcList[0].FUNC_NAME;
				var url = gdc.webContextRoot+funcList[0].FUNC_URL+queryPara;
				if (busiCode == 'SIMSHIT') {
					url = gdc.webContextRoot + 'simView/querySimBriefInfo.action'+queryPara;
				}
				if (busiCode == 'tqtyst') {
					url = gdc.webContextRoot + 'tgView/queryTgBasicInfo.action'+queryPara;
				}
				if (busiCode == 'dbtyst') {
					url = gdc.webContextRoot + '/viewPackge/findMeterInfo.action'+queryPara;
				}
				if (busiCode == 'xltyst'){
					url = gdc.webContextRoot + '/lineView/findLineBasicInfo.action'+queryPara;
				}
				var name="电表视图";
				if (busiCode == 'tqtyst') {
					url = gdc.webContextRoot + 'tgView/queryTgBasicInfo.action'+queryPara;
					name="台区视图";
				}
				if (busiCode == 'dbtyst') {
					url = gdc.webContextRoot + '/viewPackge/findMeterInfo.action'+queryPara;
				    name="电表视图";
				}
				if (busiCode == 'xltyst'){
					url = gdc.webContextRoot + '/lineView/findLineBasicInfo.action'+queryPara;
					name="线路视图";
				}
				OpenWin(url,name,"1100","650");
				 
			}
		}
	})
}

function jsonDecode(data){
    return new Function("return " + data + ";")();
}
