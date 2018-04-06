
// 查看历史数据
function queryHistory(paramObj,dDate){
	var count = 0;
	var paramObjValue;
	for(var i=0;i < paramObj.length;i++) {
		if(paramObj[i].checked == true) {
			count++;
			paramObjValue = paramObj[i].value;
		}
	}
	if(count == 0) {
		parent.MessageBox("请先选择一条记录进行查询！");
		return false;
	}
	if(count > 1) {
		parent.MessageBox("只能选择一条记录进行查询！");
		return false;
	}
	
	var params = dDate+";"+paramObjValue.split(",")[3]+";"+0;
	OpenWin('../pages/basicApp/collectDataManage/basicApp_errorDataShow_history.jsp?params='+params,"查看历史数据",800,450);
}

// 电表生成传票
var paramAssetNos = "";
var paramExcepTypeCode = "";
function buildFlowForAmmeter(paramObj,excepTypeCode) {
	var assetNos = "";
	var terminalAddrs = "";
	var count = 0;
	var paramObjValue;
	for(var i=0;i < paramObj.length;i++) {
		if(paramObj[i].checked) {
			count ++;
			paramObjValue = paramObj[i].value;
			if(paramObjValue.split(",")[3]) {
				assetNos += paramObjValue.split(",")[3] + ",";
			} else {
				assetNos += paramObjValue.split(";")[1] + ",";
			}
			if(paramObjValue.split(",")[5]) {
				terminalAddrs += paramObjValue.split(",")[5] + ",";
			} else {
				terminalAddrs += paramObjValue.split(";")[4] + ",";
			}
		}
	}
	if(count == 0) {
		parent.MessageBox("请至少选择一个电表生成传票！");
		return;
	}  else if(count > 1) {
   		
		var terminalAddrArray = new Array();
		terminalAddrArray = terminalAddrs.split(",");
		var terminalAddrArrayOne = terminalAddrArray[0];
		var flag = false;
		for(var i=1; i < terminalAddrArray.length - 1; i++) {
			if(terminalAddrArrayOne != terminalAddrArray[i]) {
				flag = true;
			}
		}
		if(flag) {
			MessageBox("请选择同一终端的电表生成传票！");
			return ;
		}
	} 
	paramAssetNos = assetNos.substring(0,assetNos.lastIndexOf(","));
	paramExcepTypeCode = excepTypeCode;
	//alert("paramAssetNos:::"+paramAssetNos);
	//alert("paramExcepTypeCode:::"+paramExcepTypeCode);
	MessageBox("确认要生成传票吗？","系统提示","images/img/icon_error.gif",MB_YESNO,confirmForAmmeter);
}

function confirmForAmmeter(result) {
	if(MB_YES != result) {
		return;
   	}
   	
	OpenWin('../pages/runManage/jcCp/newJcCp.jsp?meterAssetNoArr='+paramAssetNos+'&tmnlAssetNo='+'&excepTypeCode='+paramExcepTypeCode,"生成传票",800,450);
}

// 终端生成传票
var paramTmnlAssetNo = "";
function buildFlowForTerminal(paramObj,excepTypeCode) {

	var count = 0;
	var paramObjValue;
	for(var i=0;i < paramObj.length;i++) {
		if(paramObj[i].checked) {
			count ++;
			paramObjValue = paramObj[i].value;
			paramTmnlAssetNo = paramObjValue.split(",")[2].replace("-","").replace("-","");
		}
	}
	if(count == 0) {
		parent.MessageBox("请至少选择一个终端生成传票！");
		return;
	} 
	if(count > 1) {
		parent.MessageBox("只能选择一个终端生成传票！");
		return false;
	}
	paramExcepTypeCode = excepTypeCode;
	//alert("paramTmnlAssetNo:::"+paramTmnlAssetNo);
	//alert("paramExcepTypeCode:::"+paramExcepTypeCode);
	MessageBox("确认要生成传票吗？","系统提示","images/img/icon_error.gif",MB_YESNO,confirmForTerminal);
}

function confirmForTerminal(result) {
	if(MB_YES != result) {
		return;
   	}
   	
	OpenWin('../pages/runManage/jcCp/newJcCp.jsp?meterAssetNoArr=&tmnlAssetNo='+paramTmnlAssetNo+'&excepTypeCode='+paramExcepTypeCode,"生成传票",800,450);
}

// 人工校核
function setCheckFlag(paramObj) {
	var count = 0;
	for(var i=0;i<paramObj.length;i++) {
		if(paramObj[i].checked == true) {
			count++;
		}
	}
	if(count == 0) {
		parent.MessageBox("请先选择一条记录进行人工校核！");
		return false;
	}
	
	objWin = OpenModalDialog('../pages/basicApp/collectDataManage/basicApp_dataShow_checkFlag.jsp',"人工校核",300,150);
	
	if(objWin && objWin != "close") {
		
		var collobjId = ""; 
		var dDate = "";
		for(var i=0;i<paramObj.length;i++) {
			if(paramObj[i].checked == true) {
				collobjId += paramObj[i].value.split(",")[0] + ";";
				
				// 如果dDate是抄表日期的话
				dDate = paramObj[i].value.split(",")[4];
			}
		}
		
		var para = "dataDate="+dDate+"&collobjs="+collobjId;
		
		//可信
		if(objWin == "kexin") {
			para = para + "&checkFlag=0";
			
			//显示进度条
		    //top.showWaitDisplay(null,null,false);
		    
	   	    $.ajax({
	    	    type: "post",
				data:  para,
			    url: "../dataShow/setCheckFlag.action",
				timeout:300000, 
				dataType:"html",
				cache : false,
				success: function(msg) {
					//top.disWaitDisplay();
					MessageBox(msg);
           		}
			});	
		}else if(objWin == "bukexin" ) {
			para = para + "&checkFlag=1";
			
			//显示进度条
		    //top.showWaitDisplay(null,null,false);
		    
   	    	$.ajax({
                type: "post",
				data:  para,
				url: "../dataShow/setCheckFlag.action",
				timeout:300000, 
				dataType:"html",
				cache : false,
				success: function(msg) {
					//top.disWaitDisplay();
	                MessageBox(msg);
			    }
            });	
		}
	}
}
