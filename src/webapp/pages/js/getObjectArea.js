// 取得供电单位
function getArea() {
	var result = new Array();
	var value = "";
	try
	{
	if(window.parent.parent.document.frames.length>2)
	{
	   value= selectedAreaObj(window.parent.parent.document.frames("leftObject").document);
	}
	}
	catch(e){}

	if (isNullOrEmpty(value)||value=='undefined') {
		return "";
	} else {
		var tempArr = value.split("&");
        var length = tempArr.length;
        //if(length > 100){
        //    return "ERROR_LENGTH";
        //}
        for (var i = 0; i < length; i++) {
			if (trimSpace(tempArr[i].split("=")[0]) == "org_no") {
				if(trimSpace(tempArr[i].split("=")[1]).length<=7){
					result.push(trimSpace(tempArr[i].split("=")[1]));
				}
			}
		}
		return result;
	}
}
// 取得采集点编号
function getCpNo() {
	var result = new Array();
    var value = "";
    try
    {
    if(window.parent.parent.document.frames.length>2)
    {
       value= seletcedRcpObj(window.parent.parent.document.frames("leftObject").document);
    }
    }
    catch(e){}
    if (isNullOrEmpty(value)||value=='undefined') {
		return "";
	} else {
		var tempArr = value.split("&");
		var length = tempArr.length;
		if(length > 100){
		    return "ERROR_LENGTH";
		}
		for (var i = 0; i < length; i++) {
			if (trimSpace(tempArr[i].split("=")[0]) == "cp_no") {
				result.push(trimSpace(tempArr[i].split("=")[1]));
			}
		}
		return result;
	}
}
// 取得用户
function getConsNo() {
	var result = new Array();	
    var value = "";
    try
    {
   if(window.parent.parent.document.frames.length>2)
    {
       value= seletcedConsObj(window.parent.parent.document.frames("leftObject").document);
    }
    }
    catch(e){}

    if (isNullOrEmpty(value)||value=='undefined') {
		return "";
	} else {
		var tempArr = value.split("&");
        var length = tempArr.length;
        /*if(length > 100){
            return "ERROR_LENGTH";
        }*/
        for (var i = 0; i < length; i++) {
			if (trimSpace(tempArr[i].split("=")[0]) == "cons_no") {
				result.push(trimSpace(tempArr[i].split("=")[1]));
			}
		}
		return result;
	}
}
// 取得行业
function getTrade() {
	var result = new Array();
    var value = "";
    try
    {
   if(window.parent.parent.document.frames.length>2)
    {
       value= selectedTrade(window.parent.parent.document.frames("leftObject").document);
    }
    }
    catch(e){}
    if (isNullOrEmpty(value)||value=='undefined') {
		return "";
	} else {
		var tempArr = value.split("&");
        var length = tempArr.length;
        if(length > 100){
            return "ERROR_LENGTH";
        }
        for (var i = 0; i < length; i++) {
			if (trimSpace(tempArr[i].split("=")[0]) == "trade_code") {
				result.push(trimSpace(tempArr[i].split("=")[1]));
			}
		}
		if(result=='undefined')result="";
		return result;
	}
}
// 取得电网结构
function getStruct() {
	var value = selectedStruc(window.parent.parent.document.frames("leftObject").document);
	return value;
}
