/**
 * 自适应公共方法
 * 需配合css样式main-panel，auto-resize使用
 * 
 * 本事件监听于resize事件
 * 当触发本事件时，将进行事件触发容器同层次其他容器大小计算变更
 * 基于容器设有class为main-panel的高宽进行计算
 * 同层次需自适应剩余高宽的容器需将class中添加auto-resize
 * 手动调用激活 autoResize.call(this); 
 * 
 * @param newW
 * @param newH
 */
function autoResize(newW, newH) {
	var oldH = 0;
	var child = [];
	
	if($(this).closest(".main-panel")){
		oldH = $(this).closest(".main-panel").height();
		child = $(this).closest(".main-panel").children();
	}else{
		oldH = $(this).height();
		child = $(this).children();
	}
	
	var autoC = [];

	$.each(child, function(i, v) {
		if($(v).hasClass("auto-resize")) { //普通div
			autoC.push(v);
			return;
		} else if($(v).hasClass("panel") && $(v).children(".panel-body").hasClass("auto-resize")) { //easyui-panel
			autoC.push(v);
			return;
		}
		oldH -= $(v).outerHeight(true);
	});

	if(autoC.length == 0) {
		return;
	}

	var average = oldH / autoC.length;
	$.each(autoC, function(i, v) {
		if($(v).hasClass("panel")) {
			$(v).children(".auto-resize").panel({
				height: average
			});
		}else if($(v).hasClass("easyui-tabs")&&$(v).hasClass("auto-resize")){ //easyui-tabs
			$(v).tabs({
				height: average
			});
		} else {
			var mbpH = $(v).outerHeight(true) - $(v).height();
			average = average - mbpH;
			$(v).height(average);
		}
	});
}

/**
 * chart自适应公共方法
 * 需配合class样式chart使用
 * 
 * 事件监听于需要自适应chart图的父容器resize事件中
 * 在需要激活自适应的chart图容器上增加css样式chart
 * 
 * @param widths
 * @param heights
 */
function userResize(widths, heights) {
	var chart = $(this).find(".chart");
	$.each(chart, function(i, v) {
		var myChart = echarts.getInstanceByDom(v);
		if(!!myChart) {
			myChart.resize();
		}
	});
}