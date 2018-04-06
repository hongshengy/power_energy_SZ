// 自适应高度调整 
function setDataGridHeight(config) {
	var frameId = config.frameId;
	var btnMore = config.btnMoreId;
	var h = config.height || -138;
	var hideHeight = config.hideHeight || 0;
	if(!frameId){
		return ;
	}
	var scrollHeight = this.document.body.scrollHeight;
	var gridHeight;
	if (scrollHeight != 0) {
		scrollHeight = top.document.body.scrollHeight - top.$('#header').height()  - $(parent.document).find(".message:first").get(0).offsetHeight + hideHeight ;
		gridHeight = scrollHeight - 135 ;
		$(".dataGrid:first").parent().css("height", gridHeight).parent().parent().parent().parent().height(gridHeight + 30 );
		parent.document.all(frameId).height = scrollHeight - 38  ;
	} else {
		scrollHeight = top.document.body.scrollHeight - top.$('#header').height()  ;
		if (btnMore && parent.document.getElementById(btnMore).value == "\u9690\u85cf") {
			scrollHeight = scrollHeight - 30;
		}
		gridHeight = scrollHeight - 95 + h;
		$(".dataGrid:first").parent().css("height", gridHeight).parent().parent().parent().parent().height(gridHeight + 30);
		parent.document.all(frameId).height = scrollHeight + h;
	}
}

/**
* 页面自适应，没有分页栏
*/
function setDataGridHeightNoPagingbar(config) {
	var frameId = config.frameId;
	var btnMore = config.btnMoreId;
	var h = config.height || -106;
	if(!frameId){
		return ;
	}
	var scrollHeight = this.document.body.scrollHeight;
	var gridHeight;
	if (scrollHeight != 0) {
		gridHeight = parent.document.body.offsetHeight - $(parent.document).find(".message:first").get(0).offsetHeight - 73 - 6 ;
		$(".dataGrid:first").height(gridHeight).parent().css("height", gridHeight).parent().parent().parent().parent().height(gridHeight + 30);
		parent.document.all(frameId).height = this.document.body.scrollHeight;
	} else {
		scrollHeight = top.document.body.scrollHeight - top.$('#header').height();
		if (btnMore && parent.document.getElementById(btnMore).value == "\u9690\u85cf") {
			scrollHeight = scrollHeight - 30;
		}
		gridHeight = scrollHeight - 95 + h;
		$(".dataGrid:first").height(gridHeight).parent().css("height", gridHeight).parent().parent().parent().parent().height(gridHeight + 30);
		parent.document.all(frameId).height = scrollHeight + h;
	}
}

/**
* 验证是否选择的是施工单位
*/
function validWorkCompany(workCompanyId){
	var val = document.getElementById(workCompanyId).value;
	if(val){
		if(val.split('-')[0]=='ORG'){
			MessageBox('请选择施工单位！');
			return false;
		}
	}
	return true;
}

/**
* 验证选择市级以下供电单位
*/
function validOrg(orgNo,includeFlag){ 
	if((!orgNo || orgNo.length<=5) && includeFlag==1){
  	 	MessageBox('请选择市级以下供电单位！');
  		return false;
  	}
  	return true;
}

//监听页面变化
function listenerWindowSize (config){
	window.onresize = function(){
		setTimeout(function(){
			setDataGridHeightInParent(config);
		},100);
	}
}
function setDataGridHeightInParent(config) {
	var method = config.method || 'setDataGridHeight';
    var ifmWin = window.frames[config.frameId];
    if (ifmWin != undefined && typeof eval('ifmWin.'+ method) == 'function') {
        eval('ifmWin.'+ method + '(config)');
        return;
    }else{
    	 setTimeout(function(){
    	 	setDataGridHeightInParent(config);
    	 },10);
    } 
}


//获得列表中所有的的采集点编号 1：全部 0：选中的
//获得列表中所有的的采集点编号 1：全部 0：选中的
function getCpNos(flag){
	return getCpNoObjs(flag).map(function(){return $(this).val();}).get().join(',').toString();
}

function getCpNoObjs(flag){
	var idsObj = $('input[name="ids"]');
	if(flag==0){
		idsObj = idsObj.filter(':checked');
	}
	return idsObj;
}
//插入终端
function insertTmnl(data){
	showWaitDisplayForQuery("<%=basePath%>", "正在加载数据...");
	//表对象
	var tableObj = $('.dataGrid').first(); 
	var dataLength = $('input[name="ids"]').length;
	var tableDom = tableObj.get(0);
	var idsArray = $('input[name="ids"]').map(function(){return $(this).val();}).get();
	var tableRow = tableDom.rows.length;
	if(data){
		var dataObj;
		var trObj = '';
		var className ='';
		for(var i=0;i<data.length;i++){
			dataObj = data[i];
			if($.inArray(dataObj.cpNo,idsArray)!=-1){
				continue;
			}
			if(dataLength<tableRow-1){
				trObj = tableDom.rows[dataLength+1];
				trObj.children[0].innerHTML=('<input type="checkbox" name="ids" value="'+dataObj.cpNo+'">');
				trObj.children[1].innerText=(dataLength+1);
				trObj.children[2].innerText=(dataObj.tmnlAssetNo);
				trObj.children[3].innerText=(dataObj.id);
				trObj.children[4].innerText=(dataObj.orgNo);
			}else{
				className = (dataLength % 2==0) ? '' : 'grayLine' ; 
				trObj = $('<tr>').attr('class',className).insertAfter(tableDom.rows[dataLength]);
				$('<td>').html('<input type="checkbox" name="ids" value="'+dataObj.cpNo+'">').appendTo(trObj);
				$('<td>').html(dataLength+1).appendTo(trObj);
				$('<td>').text(dataObj.tmnlAssetNo).appendTo(trObj);
				$('<td>').text(dataObj.id).appendTo(trObj);
				$('<td>').text(dataObj.orgNo).appendTo(trObj);
			}
			dataLength ++;
		}
	}
	disWaitDisplayForQuery();
}

// 获取行内容 1：全部 0：选择的
function getData(flag){
	//表对象
	var dataArr = [];
	var data = {};
	var idsObjs = getCpNoObjs(flag); 
	var trObj;
	var dataObj;
	var tableObj = $('.dataGrid').first(); 
	var tableDom = tableObj.get(0);
	var tableRow = tableDom.rows.length;
	for(var rows=0;rows<idsObjs.length;rows++){
		trObj = idsObjs[rows].parentNode.parentNode;
		dataObj = trObj.children;
		data = {
			'cpNo': idsObjs[rows].value,
			'tmnlAssetNo' : dataObj[2].innerText,
			'id' : dataObj[3].innerText,
			'orgNo' : dataObj[4].innerText
			};
	    dataArr.push(data);
	    $(trObj).remove();
	}
	resetXuHao(); 
	return dataArr;
}
//重置序号
function resetXuHao(){
	var idsObj = getCpNoObjs(1);
	var trObj;
	var len = idsObj.length;
	var tableObj = $('.dataGrid').first(); 
	var tableDom = tableObj.get(0);
	var tableRow = tableDom.rows.length;
	for(var rows=0;rows<len;rows++){
		trObj = idsObj[rows].parentNode.parentNode;
		trObj.children[1].innerText = rows+1;
	}
	if(tableRow<100){
		for(var i=tableRow-1;i<100;i++){
			var className = (i % 2==0) ? '' : 'grayLine' ; 
			trObj = $('<tr>').attr('class',className).insertAfter(tableDom.rows[i]);
			$('<td>').html('').appendTo(trObj);
			$('<td>').html('').appendTo(trObj);
			$('<td>').text('').appendTo(trObj);
			$('<td>').text('').appendTo(trObj);
			$('<td>').text('').appendTo(trObj);
		}
	}
}

