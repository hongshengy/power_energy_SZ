/**
 * form内组件的常用方法，如果disabled或者hidden，使用方法见tmnlSubModelDetail.jsp（终端子型号明细）
 * 需要Util.js和jquery的支持
 */
//命名空间
var FormUtil = {};
/**
 * disable指定id的所有组件
 */
FormUtil.$ = window.jQuery;
FormUtil.disable = function(){
	if(!arguments || arguments.length==0){
		return;
	}
	for(var i=0;i<arguments.length;i++){
		//认为是extjs控件
		if(arguments[i].endsWith("ext")){
			Ext.getCmp(arguments[i]).setWidth(140).disable();
		}else{
			FormUtil.$("#"+arguments[i]).attr("readonly",true).removeClass("input_class").addClass("input_readOnly");	
		}
	}
}
FormUtil.show = function(){
	if(!arguments || arguments.length==0){
		return;
	}
	for(var i=0;i<arguments.length;i++){
		//认为是extjs控件
		if(arguments[i].endsWith("ext")){
			Ext.getCmp(arguments[i]).show();
		}else{
			FormUtil.$("#"+arguments[i]).show();	
		}
	}
}
FormUtil.hide = function(){
	if(!arguments || arguments.length==0){
		return;
	}
	for(var i=0;i<arguments.length;i++){
		//认为是extjs控件
		if(arguments[i].endsWith("ext")){
			Ext.getCmp(arguments[i]).hide();
		}else{
			FormUtil.$("#"+arguments[i]).hide();	
		}
	}
}
FormUtil.valid = function(){
	if(!arguments || arguments.length==0){
		return true;
	}
	for(var i=0;i<arguments.length;i++){
		var v_val;
		var v_s_val;
		var v_e_val;
		if(arguments[i].hasOwnProperty("startId")&&arguments[i].hasOwnProperty("endId")){
			v_s_val = FormUtil.getVal(arguments[i]["startId"]);
			v_e_val = FormUtil.getVal(arguments[i]["endId"]);
			if(arguments[i].hasOwnProperty("date") && arguments[i]["date"]==true){
				if( arguments[i]["greater"]==true ){
					if(Date.daysDiff(v_s_val,v_e_val,false)<0){
						MessageBox("结束日期不能小于开始日期！");
						return false;
					}
				}
				if(arguments[i].hasOwnProperty("dValue") && isNumber(arguments[i]["dValue"])){
					if(Date.daysDiff(v_s_val,v_e_val,false)>arguments[i]["dValue"]){
						MessageBox("日期间隔最大为"+arguments[i]["dValue"]+"天！");
						return false;
					}
				}
			}
		}
		if(arguments[i].hasOwnProperty("id")){
			v_val = FormUtil.getVal(arguments[i]["id"]);
		}
		//不允许为空的验证
		if(arguments[i].hasOwnProperty("allowNull") && !arguments[i]["allowNull"]){
			if(isNullOrEmpty(v_val)){
				MessageBox(arguments[i]["msg"]||(arguments[i]["fieldName"]+'不能为空！'));
				return false;
			}
		}
		//取值范围的验证
		if(arguments[i].hasOwnProperty("range") &&!isNullOrEmpty(v_val)&& FormUtil.$.isArray(arguments[i]["range"])
			&& arguments[i]["range"].length==2 && arguments[i]["range"][1]>arguments[i]["range"][0]){
			if(isNaN(Number(v_val))){
				MessageBox(arguments[i]["fieldName"]+"不是数值类型！");
				return false;
			}else{
				if(!(v_val>=arguments[i]["range"][0] && v_val <= arguments[i]["range"][1])){
					MessageBox(arguments[i]["msg"] || (arguments[i]["fieldName"]+"取值必须介于"+arguments[i]["range"][0]+"～"+arguments[i]["range"][1]+"!"));
					return false;
				}
			}	
		}
	}
	return true;
}
/**
 *根据ID获取ext对象或者jquery对象
 */
FormUtil.getObj = function(id){
	//未定义
	if(!isDefined(id)){
		return '';
	}
	if(id.endsWith("ext")){
		return Ext.getCmp(id);
	}else{
		return FormUtil.$("#"+id)
	}
}
/**
 * 根据id获取ext对象或者jquery对象的值
 */
FormUtil.getVal = function(id){
 	//未定义
	if(!isDefined(id)){
		return '';
	}
	if(id.endsWith("ext")){
		return Ext.getCmp(id).getValue();
	}else{
		return FormUtil.$("#"+id).val();
	}
 }