/**
 * JSON 解析类 Copyright (c) 2010 YaoYiLang
 * 
 * @email redrainyi@gmail.com
 * @datetime 2008-04-18
 * @version 1.0
 * 
 * 方法： 将JSON字符串解码为页面可识别的object对象
 * @param {String}
 *            json The JSON string
 * @return {Object} The resulting object Object o = JSONUtil.decode(json);
 * 
 * 将JS对象序列化为JSON字符串
 * @param {Mixed}
 *            o The variable to decode
 * @return {String} The JSON string String json = JSONUtil.encode(o);
 */
// "undefined" = "\u0075\u006e\u0064\u0065\u0066\u0069\u006e\u0065\u0064"
var JSONUtil;
if (!JSONUtil) {
	JSONUtil = {};
}
JSONUtil.decode = function(json) {
	try {
		return eval('(' + json + ')'); // '(' + json + ')'
	} catch (exception) {
		return eval("undefined");
	}
};
JSONUtil.encode = (function() {
	var $ = !!{}.hasOwnProperty, _ = function($) {
		return $ < 10 ? "0" + $ : $
	}, A = {
		"\b" : "\\b",
		"\t" : "\\t",
		"\n" : "\\n",
		"\f" : "\\f",
		"\r" : "\\r",
		"\"" : "\\\"",
		"\\" : "\\\\"
	};
	return (function(C) {
		if (typeof C == "undefined" || C === null)
			return "null";
		else if (Object.prototype.toString.call(C) === "[object Array]"/*
																		 * "[object
																		 * Array]"
																		 */) {
			var B = ["["], G, E, D = C.length, F; // [
			for (E = 0; E < D; E += 1) {
				F = C[E];
				switch (typeof F) {
					case "undefined" :
					case "function" : // "function "
					case "unknown" : // "unknown "
						break;
					default :
						if (G)
							B.push(","); // ,
						B.push(F === null ? "null" : this.encode(F));
						G = true
				}
			}
			B.push("]"); // ]
			return B.join("")
		} else if ((Object.prototype.toString.call(C) === "[object Date]"/*
																			 * "[object
																			 * Date] "
																			 */))
			return "\"" + C.getFullYear() + "-" + _(C.getMonth() + 1) + "-"
					+ _(C.getDate()) + "T" + _(C.getHours()) + ":"
					+ _(C.getMinutes()) + ":" + _(C.getSeconds()) + "\"";
		else if (typeof C == "string"/* string */) {
			if (/["\\\x00-\x1f]/.test(C))
				return "\"" + C.replace(/([\x00-\x1f\\"])/g, function(B, _) {
							var $ = A[_];
							if ($)
								return $;
							$ = _.charCodeAt();
							return "\\u00" + Math.floor($ / 16).toString(16)
									+ ($ % 16).toString(16)
						}) + "\"";
			return "\"" + C + "\""
		} else if (typeof C == "number"/* number */)
			return isFinite(C) ? String(C) : "null";
		else if (typeof C == "boolean"/* boolean */)
			return String(C);
		else {
			B = ["{"], G, E, F; // {
			for (E in C)
				if (!$ || C.hasOwnProperty(E)) {
					F = C[E];
					if (F === null)
						continue;
					switch (typeof F) {
						case "undefined" :
						case "function" : // "function"
						case "unknown" : // "unknown"
							break;
						default :
							if (G)
								B.push(","); // ,
							B.push(this.encode(E), ":", this.encode(F)); // :
							G = true
					}
				}
			B.push("}"); // }
			return B.join("")
		}
	})
})();
// window.JSONUtil = JSONUtil;
