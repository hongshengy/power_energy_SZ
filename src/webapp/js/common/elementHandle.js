/**
 * <p>Title: 购电侧系统</p>
 * <p>Description: 购电侧系统</p>
 * <p>Copyright: Copyright (c) 2009</p>
 * <p>Company: 江苏方天电力技术有限公司</p>
 */
Ext.namespace("gdc.elementHandle.operation");

/************ 设置元素值 ***************/

/**
 * 根据id设置元素值
 * @param {Ext.String} id  id
 * @param {Ext.String} v  要设置的值
 */	
gdc.elementHandle.operation.setValueById = function(id,v){
	$("#"+id).val(v);
}; 

/**
 * 根据类设置元素值
 * @param {Ext.String} class  类属性名称
 * @param {Ext.String} v  要设置的值
 */	
gdc.elementHandle.operation.setValueByClass = function(class,v){
	$("."+class).val(v);
}; 

/**
 * 根据Tag设置元素值
 * @param {Ext.String} tag  标签名称
 * @param {Ext.String} v  要设置的值
 */	
gdc.elementHandle.operation.setValueByTag = function(tag,v){
	$(tag).val(v);
}; 

/**
 * 根据属性设置元素值
 * @param {Ext.String} attrName   属性名称
 * @param {Ext.String} attrValue  属性值
 * @param {Ext.String} v  要设置的值
 */	
gdc.elementHandle.operation.setValueByAttr = function(attrName,attrValue,v){
	$("["+attrName+"='"+attrValue+"']").val(v);
}; 



/************ 设置元素HTML ***************/

/**
 * 根据id设置元素HTML
 * @param {Ext.String} id  id
 * @param {Ext.String} v  要设置的值
 */	
gdc.elementHandle.operation.setHTMLById = function(id,v){
	$("#"+id).html(v);
}; 

/**
 * 根据类设置元素HTML
 * @param {Ext.String} class  类属性名称
 * @param {Ext.String} v  要设置的值
 */	
gdc.elementHandle.operation.setHTMLByClass = function(class,v){
	$("."+class).html(v);
}; 

/**
 * 根据Tag设置元素HTML
 * @param {Ext.String} tag  标签名称
 * @param {Ext.String} v  要设置的值
 */	
gdc.elementHandle.operation.setHTMLByTag = function(tag,v){
	$(tag).html(v);
}; 

/**
 * 根据属性设置元素HTML
 * @param {Ext.String} attrName   属性名称
 * @param {Ext.String} attrValue  属性值
 * @param {Ext.String} v  要设置的值
 */	
gdc.elementHandle.operation.setHTMLByAttr = function(attrName,attrValue,v){
	$("["+attrName+"='"+attrValue+"']").html(v);
}; 





Ext.namespace("gdc.elementHandle.display");


/************ 普通显示效果 ***************/
	
/**
 * 显示页面元素
 * @param {Ext.String} id  元素id
 * @param {Ext.String} speed  速度（slow，normal，fast，或是毫秒数）
 */	
gdc.elementHandle.display.show = function(id,speed){
	$("#"+id).show(speed);
}; 
/**
 * 隐藏页面元素
 * @param {Ext.String} id  元素id
 * @param {Ext.String} speed  速度（slow，normal，fast，或是毫秒数）
 */	
gdc.elementHandle.display.hide = function(id,speed){
	$("#"+id).hide(speed);
}; 
/**
 * 显示/隐藏页面元素
 * @param {Ext.String} id  元素id
 * @param {Ext.String} speed  速度（slow，normal，fast，或是毫秒数）
 */	
gdc.elementHandle.display.toggle = function(id,speed){
	$("#"+id).toggle(speed);
}; 




/************ 滑动显示效果 ***************/

/**
 * 滑动显示页面元素
 * @param {Ext.String} id  元素id
 * @param {Ext.String} speed  速度（slow，normal，fast，或是毫秒数）
 */	
gdc.elementHandle.display.slideDown = function(id,speed){
	$("#"+id).slideDown(speed);
}; 
/**
 * 滑动隐藏页面元素
 * @param {Ext.String} id  元素id
 * @param {Ext.String} speed  速度（slow，normal，fast，或是毫秒数）
 */	
gdc.elementHandle.display.slideUp = function(id,speed){
	$("#"+id).slideUp(speed);
}; 
/**
 * 滑动显示/隐藏页面元素
 * @param {Ext.String} id  元素id
 * @param {Ext.String} speed  速度（slow，normal，fast，或是毫秒数）
 */	
gdc.elementHandle.display.slideToggle = function(id,speed){
	$("#"+id).slideToggle(speed);
}; 




/************ 淡入淡出显示效果 ***************/

/**
 * 淡入淡出显示页面元素
 * @param {Ext.String} id  元素id
 * @param {Ext.String} speed  速度（slow，normal，fast，或是毫秒数）
 */	
gdc.elementHandle.display.fadeIn = function(id,speed){
	$("#"+id).fadeIn(speed);
}; 
/**
 * 淡入淡出隐藏页面元素
 * @param {Ext.String} id  元素id
 * @param {Ext.String} speed  速度（slow，normal，fast，或是毫秒数）
 */	
gdc.elementHandle.display.fadeOut = function(id,speed){
	$("#"+id).fadeOut(speed);
}; 
/**
 * 淡入淡出的调整元素可见度
 * @param {Ext.String} id  元素id
 * @param {Ext.String} speed  速度（slow，normal，fast，或是毫秒数）
 * @param {Ext.Number} visibility  可见度（如：0.25 即四分之一可见度）
 */	
gdc.elementHandle.display.fadeTo = function(id,speed,visibility){
	$("#"+id).fadeTo(speed, visibility); 
	
}; 	
