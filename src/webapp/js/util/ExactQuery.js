/**
 * 精确查询页面控制查询条件，使用方法见powerCutQueryMain.jsp（停电查询）
 */
//命名空间
var ExactQuery = {};
/**
 * 精确查询，过滤掉不需要的字段
 */
ExactQuery.filter = function(formId/*string*/,obj/*dom object*/,namePrefix /*string*/){
	var filterArr = $("#"+formId).contents().find("[name^='"+namePrefix+"']").not($(obj));
	//动态判断参数的个数，多的参数，是避免排除的字段
	if(arguments.length>3){
		for(var i=3;i<arguments.length;i++){
			filterArr = filterArr.not($('#'+arguments[i]));
		}
	}
	$('#'+formId).data('filterArr',filterArr);
	filterArr.each(function(){
		$(this).data('name',$(this).attr('name')).removeAttr('name');
	});
}

/**
 * 精确查询，过滤掉不需要的字段，
 * @param：filterArr-需要过滤掉的元素（主要是指input）
 */
ExactQuery.filterArr = function(formId/*string*/,obj/*dom object*/,filterArr /*array*/){
	filterArr = filterArr.not($(obj));
	//动态判断参数的个数，多的参数，是避免排除的字段
	if(arguments.length>3){
		for(var i=3;i<arguments.length;i++){
			filterArr = filterArr.not($('#'+arguments[i]));
		}
	}
	$('#'+formId).data('filterArr',filterArr);
	filterArr.each(function(){
		$(this).data('name',$(this).attr('name')).removeAttr('name');
	});
}

/**
 * 精确查询，在查询之前调用，重设name值。
 */
ExactQuery.reSetName = function(formId/*string*/){
	//重新设置name
   	var filterArr = $('#'+formId).data('filterArr');
   	if(filterArr){
   		filterArr.each(function(){
   			$(this).attr('name',$(this).data('name'));
   		});
   		$('#thisform').removeData('filterArr');
   	}
}