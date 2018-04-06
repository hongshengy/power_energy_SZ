
//截取url中的 "&ids=*****"  修改删除时  选中的 bug
function cutIDS(obj_url){
	var str_url = obj_url;
	var pos = -1;//"&ids=" 位置
	pos = str_url.search("&ids=");
	str_url = str_url.replaceAll('&ids=','');
	var len = 0;//设置剩余需要删除长度
	var tmp_pos = pos;
	while('&' != str_url.charAt(tmp_pos) && tmp_pos != -1){
		len = len + 1;
		tmp_pos = tmp_pos + 1;
	}
	var tmp_h_str = str_url.substring(0,pos);
	var tmp_e_str = str_url.substring(pos+len,str_url.length);
	str_url = tmp_h_str+tmp_e_str;
	return str_url;
}

//截取url中的 "&arrcons=*****"  添加时  选中的 bug
function cutArrCons(obj_url){
	var str_url = obj_url;
	var pos = -1;//"&ids=" 位置
	pos = str_url.search("&arrCons=");
	str_url = str_url.replaceAll('&arrCons=','');
	var len = 0;//设置剩余需要删除长度
	var tmp_pos = pos;
	while('&' != str_url.charAt(tmp_pos) && tmp_pos != -1){
		len = len + 1;
		tmp_pos = tmp_pos + 1;
	}
	var tmp_h_str = str_url.substring(0,pos);
	var tmp_e_str = str_url.substring(pos+len,str_url.length);
	str_url = tmp_h_str+tmp_e_str;
	return str_url;
}


//只能输入数字的js
function numInput(str){ 
		var av = document.getElementById(str).value;
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
//只能输入整数的js qiaoqiming add
function intInput(str){
		if(!isNullOrEmpty(event.srcElement.value)){
			event.srcElement.value = parseInt(event.srcElement.value,[10]);
		if(isNaN(event.srcElement.value) || event.srcElement.value == 0) event.srcElement.value = '';
	}
}  


//输入小数
function floatInput(str){ 
		var oSrcElement = event.srcElement;
		var strvalue = oSrcElement.value;
	
		var av = document.getElementById(str).value;
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

//输入小数2
function floatInput2(obj,rate){ 
		var oSrcElement = event.srcElement;
		var strvalue = oSrcElement.value;
	
		var av = obj.value;
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
		
		var strvalueArray = strvalue.split('.');
		
		if(rate) {
			if(strvalueArray[1] && '' != strvalueArray[1] && strvalueArray[1].length > 2) {
				strvalueArray[1] = strvalueArray[1].substring(0,2);
				event.srcElement.value = strvalueArray[0] + '.' + strvalueArray[1];
			}
		} else {
			if(strvalueArray[1] && '' != strvalueArray[1] && strvalueArray[1].length > 4) {
				strvalueArray[1] = strvalueArray[1].substring(0,4);
				event.srcElement.value = strvalueArray[0] + '.' + strvalueArray[1];
			}		
		}
}  

//针对datagrid非汉字换行修改
 function resetString(len,rowNum,objName,objValue){
 	var objLen = strByteLen(""+objValue);//换行的字符串字节长度
	var tmpLen = 0;
	var num = objLen/len;
	var i = 1;
	var j = 0;
	while(i < num){
		tmpLen = 0;//重置默认
		while (j < objValue.length)
		{
			if (objValue.charCodeAt(j)>255) 
			{
				tmpLen = tmpLen + 2;
				
			}else 
			{
				tmpLen++;
			}
			if(len*i+(i-1)*4 <= tmpLen )//达到换行的长度 
			{
				var tmp1 = objValue.substring(0,j+1);
				var tmp2 = objValue.substring(j+1,objValue.length);
				objValue = tmp1+"<br>"+tmp2;
				break;
			}
			j++;
		}
		j = 0;
		i++;
	}
	document.getElementById(""+objName+rowNum).innerHTML = objValue;  	
}
function upDataGrid(tdName,len,formName){
	 var tdValue = "";
	 if(document.getElementById(""+formName).ids!=null){
	    if(document.getElementById(""+formName).ids.length==null){
               tdValue = document.getElementById(tdName+"1").innerHTML;
               resetString(len,1,tdName,tdValue);
        }else{
        	for(var i=0;i<document.getElementById(""+formName).ids.length;i++){
        		var j = i+1;
				tdValue = document.getElementById(""+tdName+j).innerHTML;
				resetString(len,j,tdName,tdValue);
			}
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
    
    strvalue = strvalue.replaceAll("'",'');
    strvalue = strvalue.replaceAll("!",'');
    strvalue = strvalue.replaceAll('^','');
    strvalue = strvalue.replaceAll('&','');
    strvalue = strvalue.replaceAll('?','');
    strvalue = strvalue.replaceAll('~','');
    strvalue = strvalue.replaceAll('<','');
    strvalue = strvalue.replaceAll('>','');
    strvalue = strvalue.replaceAll('/','');
    strvalue = strvalue.replaceAll(' ','');
    strvalue = strvalue.replaceAll("=",'');
    strvalue = strvalue.replaceAll("`",'');
    strvalue = strvalue.replaceAll("#",'');
    strvalue = strvalue.replaceAll("$",'');
    strvalue = strvalue.replaceAll("{",'');
    strvalue = strvalue.replaceAll("}",'');
    strvalue = strvalue.replaceAll("\\",'');
    strvalue = strvalue.replaceAll("|",'');
    strvalue = strvalue.replaceAll("%",'');
    strvalue = strvalue.replaceAll("*",'');
    strvalue = strvalue.replaceAll("+",'');
    strvalue = strvalue.replaceAll(",",'');
    strvalue = strvalue.replaceAll("\"",'');
    strvalue = strvalue.replaceAll("_",'');
    strvalue = strvalue.replaceAll(".",'');
    strvalue = strvalue.replaceAll(";",'');
    strvalue = strvalue.replaceAll(":",'');
    strvalue = strvalue.replaceAll("[",'');
    strvalue = strvalue.replaceAll("]",'');
    strvalue = strvalue.replaceAll("@",'');
    strvalue = strvalue.replaceAll("(",'');
    strvalue = strvalue.replaceAll(")",'');
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

/**
 *	功能:	实现对文本框防止屏蔽一些特殊字符(不包括':')
 *	使用：	加在onkeyup='shieldInput()'事件上
 *	参数:
 *			无
 *	返回:	无
 */
function shieldInput3(){
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
    strvalue = strvalue.replaceEach("：","：","：",'');
    strvalue = strvalue.replaceEach("[","［","【","【",'');
    strvalue = strvalue.replaceEach("]","］","】","】",'');
    strvalue = strvalue.replaceEach("@","＠","@","＠",'');
    strvalue = strvalue.replaceEach("(","（","（","（",'');
    strvalue = strvalue.replaceEach(")","）","）","）",'');
    if(strValueOri != strvalue)
		oSrcElement.value = strvalue;
}

function removeCharAt(str, index) {
    if(str == null || str == '') return str;
    if(index > (str.length - 1)) return str;
    
    return str.substr(0,index) + str.substr(index + 1, str.length - 1);
}