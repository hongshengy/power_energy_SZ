/**
 * <p>
 * Title: js验证
 * </p>
 * <p>
 * Description:js验证
 * </p>
 * <p>
 * Copyright: Copyright (c) 2009
 * </p>
 * <p>
 * Company: 江苏方天电力技术有限公司
 * </p>
 */
Ext.namespace("com.frontier.fpus.validator");

var flag = true;
/*
 * 验证IP地址是否合法
 */
com.frontier.fpus.validator.checkIP = function(str) {
	var reg_ip = /^([1-9]|[1-9][0-9]|[1][0-9][0-9]|[2][0-4][0-9]|[2][5][0-5])\.([0-9]|[1-9][0-9]|[1][0-9][0-9]|[2][0-4][0-9]|[2][5][0-5])\.([0-9]|[1-9][0-9]|[1][0-9][0-9]|[2][0-4][0-9]|[2][5][0-5])\.([1-9]|[1-9][0-9]|[1][0-9][0-9]|[2][0-4][0-9]|[2][5][0-4])$/;

	if (reg_ip.test(str))
		return true;
	else
		return '输入IP地址不合法或者是广播地址,例如: 172.17.38.44';
}

/**
 * 判断一个输入框的数值是否可以转换为一个HTTP协议的网址，是返回true否则返回false，
 * 
 * @param text
 *            输入控件
 * @return 可以转换为一个HTTP协议的网址返回true否则返回false
 */
com.frontier.fpus.validator.checkHttp = function(text) {
	var reg_http = /^(http|HTTP)[sS]{0,1}:\/\/[A-Za-z0-9]+[\.|\:][A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^\,<>\"])*$/;
	if (reg_http.test(text))
		return true;
	else
		return "HTTP协议的网址格式无效,\n例如：http://www.baidu.com";
}

/**
 * 只能输入字母
 * 
 * @param {}
 *            str
 */
com.frontier.fpus.validator.checkLetter = function(str) {
	var reg_letter = /^[a-zA-Z]+$/;

	if (str.length > 0) {
		if (reg_letter.test(str)) {
			return true;
		} else {
			return '只能输入英文字母(大小不限)';
		}
	} else {
		return true;
	}
}

/**
 * 验证字符
 */
com.frontier.fpus.validator.checkChar = function(str) {
	var reg_snmp = /^\w*$/;

	if (!reg_snmp.test(str))
		return "非法字符";
	else
		return true;
}

/**
 * 验证文本只能是下划线，数字，英文
 */
com.frontier.fpus.validator.checkUnderlineNumLetter = function(str) {
	var reg = /^[0-9a-zA-Z][0-9_a-zA-Z]*$/;

	if (!reg.test(str))
		return "内容只能是英文,数字或下划线字符,且下划线不能在起始位置";
	else
		return true;
}
/**
 * 验证只能是下划线，数字，英文，中文，-线
 */
com.frontier.fpus.validator.checkUnderlineNumLetterChina = function(str) {
	var reg_textFieldName = /^[0-9a-zA-Z\u4E00-\u9FA5][0-9_a-zA-Z\u4E00-\u9FA5\-]*$/;

	if (!reg_textFieldName.test(str))
		return "内容只能是英文,数字,下划线或汉字字符,且下划线不能在起始位置";
	else
		return true;
}

/**
 * 验证只能是下划线，中文，数字，英文，-号，.号
 */
com.frontier.fpus.validator.checkLineNumLetterChinaNoNull = function(str) {
	if (str.length == 0)
		return true;
	else {
		var reg_textFieldName = /^[0-9_a-zA-Z\u4E00-\u9FA5\-\.]*$/;

		if (!reg_textFieldName.test(str))
			return "输入内容只能是英文，数字，下划线或汉字字符";
		else
			return true;
	}
}

/**
 * 验证只能是下划线，中文，数字，英文，-号，.号
 */
com.frontier.fpus.validator.checkLineNumLetterChina = function(str) {
	var reg_textFieldName = /^[0-9_a-zA-Z\u4E00-\u9FA5\-\.]*$/;

	if (!reg_textFieldName.test(str))
		return "输入内容只能是英文，数字，下划线或汉字字符";
	else
		return true;
}

/**
 * 验证只能是下划线，数字，英文，点号，中文，-号
 */
com.frontier.fpus.validator.checkLineNumLetterPoint = function(str) {
	var reg_textFieldName = /^[0-9a-zA-Z\u4E00-\u9FA5][0-9_a-zA-Z\u4E00-\u9FA5\.\-]*$/;

	if (!reg_textFieldName.test(str))
		return "输入内容只能是下划线，数字，英文，点号，中文，-号";
	else
		return true;
}

/**
 * 验证文件夹名是否合法
 * 
 * @param {}
 *            str
 */
com.frontier.fpus.validator.checkFolderName = function(str) {
	var reg_folderName = /^[^\\\/\:\*\?\"\<\>\|]+$/;
	var reg_folderName1 = /^([^\.]([^\\\/\:\*\?\"\<\>\|])*)*[^\.]$/;
	if (reg_folderName.test(str)) {
		if (!reg_folderName1.test(str)) {
			return '文件名开头或结尾不能是"."号';
		} else {
			return true;
		}
	} else {
		return '文件名不能包含下列任何字符之一：<br> \\  /  :  *  ?  "  <  >  |';
	}
}
/**
 * 验证文件夹名是否合法 可为空
 * 
 * @param {}
 *            str
 * @return {Boolean}
 */
com.frontier.fpus.validator.checkFolderName1 = function(str) {
	if (str.length > 0) {
		var reg_folderName = /^[^\\\/\:\*\?\"\<\>\|]+$/;
		var reg_folderName1 = /^([^\.]([^\\\/\:\*\?\"\<\>\|])*)*[^\.]$/;
		if (reg_folderName.test(str)) {
			if (!reg_folderName1.test(str)) {
				return '文件名开头或结尾不能是"."号';
			} else {
				return true;
			}
		} else {
			return '文件名不能包含下列任何字符之一：<br> \\  /  :  *  ?  "  <  >  |';
		}
	} else {
		return true;
	}
}

/**
 * 验证盘符是否合法
 */
com.frontier.fpus.validator.checkDiskPath = function(str, flagHostos) {
	var reg_winPath1 = /^[a-zA-Z]:[\\]?$/;
	var reg_winPath2 = /^[a-zA-Z]:(\\[^\:\*\?\"\<\>\|\\\/]+[\\]?)+$/;

	var reg_linuxPath = /^\/([^\:\*\?\"\<\>\|\\\/]+\/{0,1})*$/; // 判断UNIX系统的盘符路径是否合法

	if (flagHostos == 'WINDOWS') {
		if (!reg_winPath1.test(str))
			if (!reg_winPath2.test(str)) {
				return "windows操作系统输入的路径不合法,\n例如：c: 或者 c:\\xxx";
			} else
				return true;
		else
			return true;
	} else {
		if (!reg_linuxPath.test(str))
			return "UNIX操作系统输入的路径不合法,\n例如：根目录/ 或者 子目录/xxx/xxx";
		else
			return true;
	}
}

/**
 * 验证 Jndiroot
 */
com.frontier.fpus.validator.checkJndiroot = function(str) {
	var reg_Jndiroot = /^[a-zA-Z_0-9]+:\/[a-z\.\-A-Z_0-9\/]*$/;

	if (reg_Jndiroot.test(str))
		return true;
	else
		return "输入的路径不合法,\n例如：java:/xxx/";
}

/**
 * 校验电话号码
 * 
 * @param {}
 *            str
 */
com.frontier.fpus.validator.isRightPhone = function(str) {
	var patrn = /^(\d){3,4}[-](\d){6,9}$/;
	if (!patrn.exec(str)) {
		return '请输入正确的电话或传真号码,可以“+”开头，可含有“-”';
	} else {
		return true;
	}
}
/**
 * 校验手机号码：必须以数字开头，除数字外，可含有“-”
 */
com.frontier.fpus.validator.isMobil = function(s) {
	var patrn = /^(\d){3,4}[-](\d){6,9}$/;
	if (!patrn.exec(s)) {
		return '请输入正确的电话或传真号码,可以“+”开头，可含有“-”';
	} else {
		return true;
	}
}

/**
 * 校验邮政编码
 * 
 * @param {}
 *            s
 * @return {String}
 */
com.frontier.fpus.validator.isPostalCode = function(s) {
	var patrn = /^[a-zA-Z0-9]{6}$/;
	if (!patrn.exec(s)) {
		return '请输入正确的邮政编码,6位数字';
	} else {
		return true;
	}
}
/**
 * 校验电子邮件
 * 
 * @param {}
 *            s
 * @return {String}
 */
com.frontier.fpus.validator.checkEmail = function(s) {
	var patrn = /^\w+@\w+\.\w{1,3}$/;
	if (!patrn.exec(s)) {
		return '请输入正确的电子邮件地址';
	} else {
		return true;
	}
}