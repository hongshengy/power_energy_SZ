/**
 *===============================================================================================================
 *============判断数据类型的方法集合==========================================================================================
 *===============================================================================================================
 */
//判断是否数组
function isArray(x){
	return (typeof x=='object' && x.constructor == Array);
}
//判断是否数组，jquery方法
/*function isArray(x){
	return Object.prototype.toString.call(x) === "[object Array]";
}*/
//判断是否函数
function isFunction(x){
	return (typeof x=='function' && x.constructor == Function);
}
//判断是否函数，jquery方法
/*function isFunction(x){
	return Object.prototype.toString.call(x) === "[object Function]";
}*/
//判断是否字符串，需要考虑是基本类型还是String对象
function isString(x){
	return typeof x=='string' || (typeof x == 'object' && x.constructor == String );
}
//判断是否number类型，需要考虑基本类型和封装对象
function isNumber(x){
	return typeof x=='number' || (typeof x == 'object' && x.constructor == Number);
}
//判断是否已defined
function isDefined(x){
	return typeof(x) != 'undefined';
}
/**
 *===============================================================================================================
 *============String扩展==========================================================================================
 *===============================================================================================================
 */
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
//判断字符串是否以suffix结尾
String.prototype.endsWith = function(/*string or String or number or Number*/suffix){
	if(suffix==undefined){
		return false;
	}
	//基本类型number 或者是 封装对象Number
	if(isNumber(suffix)){
		suffix = suffix.toString();
	}
	//不是string类型
	if(!isString(suffix)){
		return false;
	}
	if(suffix.length>this.length){
		return false;
	}
	if(suffix.length==1){
		return suffix == this.charAt(this.length-1);
	}
	return suffix==this.substr(this.length-suffix.length);
}
//判断字符串是否以prefix开头ͷ
String.prototype.startsWith = function(/*string or String or number or Number*/prefix,/*number or Number*/toffset){
	if(prefix==undefined){
		return false;
	}
	if(isNumber(prefix)){
		prefix = prefix.toString();
	}
	if(!isString(prefix)){
		return false;
	}
	if(!isNumber(toffset)){
		toffset = 0;
	}
	if((prefix.length+toffset)>this.length){
		return false;
	}
	return prefix == this.substr(toffset,prefix.length);
}
//判断字符串是否在指定的集合中
String.prototype.inSet = function(/*Array*/set){
	if(set==undefined){
		return false;
	}
	//如果第一个参数是数组，其他参数无效
	if(typeof set == 'object' && set.constructor==Array){
		for(var i in set){
			if(set[i]!=undefined && set[i]!=null){
				if(this==set[i].toString()){
					return true;
				}
			}
		}
		return false;
	}else{
		for(var i=0;i<arguments.length;i++){
			if(arguments[i]!=undefined && arguments[i]!=null){
				if(this==arguments[i].toString()){
					return true;
				}
			}
		}
		return false;
	}
}
//字符串左填充
/**
 * 参数：str需要被填充的字符串
 *      paddedLen填充到达的长度
 *      padStr填充字符串
 */
String.leftPad = function(/*string*/str,/*number*/paddedLen,/*string*/padStr){
	if(typeof str=='undefined' || typeof paddedLen=='undefined' || typeof padStr=='undefined'){
		return '';
	}
	if(paddedLen <= str.toString().length){
		return str;
	}
	var tmpStr='';
	for(var i=0;i<paddedLen-str.toString().length;i++){
		tmpStr += padStr;
	}
	return tmpStr+str;
}
//字符串右填充
String.rightPad = function(/*string*/str,/*number*/paddedLen,/*string*/padStr){
	if(typeof str=='undefined' || typeof paddedLen=='undefined' || typeof padStr=='undefined'){
		return '';
	}
	if(paddedLen <= str.toString().length){
		return str;
	}
	var tmpStr='';
	for(var i=0;i<paddedLen-str.toString().length;i++){
		tmpStr += padStr;
	}
	return str+tmpStr;
}

/**
 *===============================================================================================================
 *============Date扩展==========================================================================================
 *===============================================================================================================
 */
//计算天数差的函数，通用 
Date.daysDiff = function(/*string|String*/sDate1,/*string|String*/sDate2,abs){     //sDate1和sDate2是2004-10-18格式 
	if(!isDefined(abs)){
		abs=true;
	}
	var aDate,oDate1,oDate2,iDays;
	aDate = sDate1.split( "-");
	oDate1 = new Date(aDate[1]+'-'+(aDate[2]||'01')+'-'+aDate[0]);    //转换为10-18-2004格式
	aDate = sDate2.split( "-");
	oDate2 = new Date(aDate[1]+'-'+(aDate[2]||'01')+'-'+aDate[0]);
	if(abs){
		iDays = parseInt(Math.abs(oDate2-oDate1)/1000/60/60/24);     //把相差的毫秒数转换为天数
	} else {
		iDays = parseInt((oDate2-oDate1)/1000/60/60/24);     //把相差的毫秒数转换为天数
	}
	return iDays;
} 
//计算月数差的函数，返回整数，通用 
Date.monthsDiff = function(/*string|String*/sDate1,/*string|String*/sDate2,abs){     //sDate1和sDate2是2004-10-18格式 
	if(!isDefined(abs)){
		abs=true;
	}
	var aDate,oMonths1,oMonths2,iMonths;
	aDate = sDate1.split("-");
	oMonths1 = parseInt(Number(aDate[0]))*12 + parseInt(Number(aDate[1]));
	aDate = sDate2.split("-");
	oMonths2 = parseInt(Number(aDate[0]))*12 + parseInt(Number(aDate[1]));
	if(abs){
		iMonths = Math.abs(oMonths1-oMonths2);
	} else {
		iMonths = oMonths2-oMonths1;     
	}
	return iMonths;
} 
//计算指定日期之前或之后多少天的日期
Date.getDateByOffsetDays = function(/*string|String*/sDate,/*number|Number*/days){
	var aDate,oDate,nDate;
	aDate = sDate.split("-");
	oDate = new Date(aDate[1]+'-'+aDate[2]+'-'+aDate[0]);
	nDate = oDate.getTime()+days*24*60*60*1000;
	var gDate = new Date();
	gDate.setTime(nDate);
	return gDate.getYear()+"-"+leftPad((gDate.getMonth()+1))+"-"+leftPad(gDate.getDate());//结果是string类型，如：2004-02-18
	//填充，用'0'把个位数填充为2位数
	function leftPad(str){
		if(str.toString().length==1){
			return '0'+str;
		}else{
			return str;
		}
	}
}
//计算指定日期增加或者减少某段时间后的新日期
/**
 * 功能：实现js的dateAdd功能
 * 参数：interval，字符串表达式，表示要添加的时间间隔
 * 参数：number，数值表达式，表示要添加的时间间隔的个数
 * 参数：date，时间对象
 * 返回：新的时间对象
 * 例子：var now = new Date();
 *       var newDate = Date.add("d",5,now);
 */
Date.add = function(/*date*/date,/*number*/number,/*string*/interval){
	switch(interval){
		case "Y":{
			date.setFullYear(date.getFullYear()+number);
			return date;
			break;
		}
		case "Q":{
			date.setMonth(date.getMonth()+number*3);
			return date;
			break;
		}
		case "M":{
			date.setMonth(date.getMonth()+number);
			return date;
			break;
		}
		case "W":{
			date.setDate(date.getDate()+number*7);
			return date;
			break;
		}
		case "D":{
			date.setDate(date.getDate()+number);
			return date;
			break;
		}
		case "H":{
			date.setHours(date.getHours()+number);
			return date;
			break;
		}
		case "m":{
			date.setMinutes(date.getMinutes()+number);
			return date;
			break;
		}
		case "S":{
			date.setSeconds(date.getSeconds()+number);
			return date;
			break;
		}
		default:{
			date.setDate(date.getDate()+number);
			return date;
			break;
		}
	}
}
/**
 *字符串转化为数组
 */
Date.stringToDate = function(str,mark){
	if(typeof str == 'undefined'){
		return new Date();
	}
	mark = mark ||'-';
	var arr = str.split(mark);
	return new Date(arr[0],Number(arr[1])-1,arr[2]);
}
/**
 * Date对象转化为字符串
 */
Date.prototype.toFmtString = function(mark){
	mark = mark ||'-';
	return this.getFullYear()+mark+String.leftPad((this.getMonth()+1),2,'0')+mark+this.getDate();
}