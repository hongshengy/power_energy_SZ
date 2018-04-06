/**
 * 定义企业id
 */
var cons_id;
/**
 * 用户变id
 */
var userTranId;
/**
 * 一次接线图id
 */
var yid;
/**
 * svg线图的起始点位置
 */
var x1;
var x2;
var y1;
var y2;

/**
 * 一次图配置集合
 */
var svgSet = [];
/**
 * 用户变下的配置svg图集合
 */
var svgList = [];

/**
 * 选择的对象配置
 */
var setSvgObj=null;
/**
 * 获取设备，测点树
 */
var treeData = [];
var devDatas=[];
var openNode = [];
/**
 * 新建svg代码
 */
var newSvgCode = '<svg width="1212" height="726" xmlns="http://www.w3.org/2000/svg" id="svg_Main" version="1.1" viewBox="0 0 1212 726">'
	+ '<!-- Created with SVG-edit - http://svg-edit.googlecode.com/ -->'
	+ '<g>'
	+  '<title>Layer 1</title>'
	+ '</g>'
	+ '</svg>';
/**
 * 
 */
$(function() {
	$('#peizhi').window('close');
	$('#newAddSvg').window('close');
	$('#newTable').window('close');
});
$(function() {
	/**
	 * 给svg图添加点击事件
	 */
	$("#svgcontent").attr({
		onclick : "click(evt)"
	});
	/**
	 * 给无信号添加change事件
	 */
	$("#nosingle").change(function() {
		NoSingleChange();
	});
	/**
	 * 给开关方式添加change事件
	 */
	$("#switchtype").change(function() {
		Switchchange();
	});
	// 关联测点点击事件
	$("#guanlian").click(function() {
		MPChk_Click();
	});
	// 是否开关
	$("#switchId").click(function() {
		SwChk_Click();
	});
	// 加载tabs
	$('#tt').tabs({
		border : false,
		onSelect : function(title) {
		}
	});
	// 添加电压等级保存事件
	$("#insertVolt").click(function() {
		addVoltClick();
	});
	//
	$("#updateVolt").click(function() {
		updateVoltClick();
	});
	// 删除电压等级事件
	$("#deleteVoltColor").click(function() {
		deleteVoltColor();
	});
	// 保存一次接线图
	$("#insertSvg").click(function() {
		insertSvgClick();
	});
	// 点击电压等级按钮
	$("#voltButton").click(function() {
		volt();
	});
	//初始化一次接线图
	$('#treeycjxtTree').combobox({
		method : 'get',
		valueField : 'svgId',
		textField : 'svgName',
		multiple : false// 是否支持多选
	});
	//初始化用户变
	$('#treeyonghubianTree').combotree({
		valueField : 'id',
		textField : 'text'
	});
	//初始化设备树
	$('#shebei').combotree({
		method : 'get',
		multiple : false,// 是否支持多选
	});
	//
	$('#cedian').combogrid({
		delay : 500,
		mode : 'remote',
		panelWidth : 450,
		idField : 'MP_ID',
		textField : 'MP_NAME',
		columns : [ [ {
			field : 'MP_ID',
			title : '',
			hidden : true
		}, {
			field : 'MP_NAME',
			title : '测点名称',
			width : 200
		}, {
			field : 'MP_TYPE',
			title : '测点类型',
			width : 60
		}, {
			field : 'MP_CODE',
			title : '测点编码',
			width : 80
		}, {
			field : 'COLL_ADDR',
			title : '采集地址码',
			width : 100
		} ] ]
	});
	/**
	 * 获取电压等级配置
	 */
	$('#table1').datagrid({
		width : 380,
		height : 160,
		close : false,
		checkOnSelect : false,
		columns : [ [
				{
					field : 'checkbox',
					title : '复选框',
					width : 60,
					checkbox : true
				},
				{
					field : 'volt',
					title : '电压',
					align : 'center',
					width : 60,
					hidden : true
				},
				{
					field : 'codeName',
					title : '电压等级',
					align : 'center',
					width : 100,
				},
				{
					field : 'codeValue',
					title : '颜色',
					align : 'center',
					width : 60,
				},
				{
					field : 'Id',
					title : '颜色配置',
					width : 160,
					formatter : function(value, row, index) {
						var cId = "color_" + row.volt;
						return "<input type='color' gridIndex='"
								+ index + "' name='color' id=" + cId
								+ " value='color' />";
					}
				},
	
		] ]
	});
	setTimeout(function()
			{
		//一次接线图获取
		IniSvgTools(newSvgCode);
			},500)
});

/**
 * 重置全局变量
 */
function ResetParam()
{


	/**
	 * 一次图配置集合
	 */
	svgSet = [];
	/**
	 * 用户变下的配置svg图集合
	 */
	svgList = [];

	/**
	 * 选择的对象配置
	 */
	setSvgObj=null;
	/**
	 * 获取设备，测点树
	 */
	treeData = [];
	devDatas=[];
	openNode = [];
	/**
	 * 清空电压配置
	 */
	$("#newName").val("");
	$("#order").val("");
	
	
	/*$("#shebei").combobox('clear');
	$('#shebei').combobox("loadData",[]);
	$("#cedian").combobox('clear');
	$('#cedian').combobox("loadData",[]);*/
	}
/**
 * 一次图下拉框清除
 */
function ClearSvgSelect()
{
	$('#treeycjxtTree').combobox("clear");
	$('#treeycjxtTree').combobox("loadData",[]);
	setTimeout(function()
			{
		//一次接线图获取
		IniSvgTools(newSvgCode);
			},500)
	while($('#table1').datagrid("getRows").length>0)
	{
		$('#table1').datagrid("deleteRow", 0);
	
	}

	$('#peizhi').window('close');
	$('#newAddSvg').window('close');
	$('#newTable').window('close');
	ResetParam();
	
	}
/**
 * 清空用户变
 */
function ClearSubSelect()
{
	$('#treeyonghubianTree').combotree("clear");
	$('#treeyonghubianTree').combotree("loadData",[]);
	//ClearSvgSelect();
	}
/*
 * 获取联动的下拉列表
 */
$(function() {
	$('#treeqiyeTree').combobox({
		url : basePath
				+ 'destree/queryTree.action?isQyCode=false&ziMu=',
		valueField : 'id',
		textField : 'text',
		onChange : function(newValue, oldValue) {
			ClearSubSelect();
			if (isNaN(newValue)) {
//				newValue = $('#treeqiyeTree').combobox('getText');
//				$.getJSON(basePath+ 'destree/queryTree.action?isQyCode=false&ziMu='+ newValue, {},
//						function(json) {$('#treeqiyeTree').combobox('loadData',json);});
			} else {
//				newValue = $('#treeqiyeTree').combobox('getText');
//				$.getJSON(basePath+ 'destree/queryTree.action?isQyCode=false&ziMu=',{}, function(json) {
//					$('#treeqiyeTree').combobox('loadData',json);});
				qiteid = $('#treeqiyeTree').combobox('getValue');
				if (!isNaN(qiteid)) {
					$('#treeyonghubianTree').combotree({
						url : basePath+ 'destree/queryYhbTree.action?treeState=close&treeNodeType=1&id='+ qiteid,
						// multiple:false,//是否支持多选
						valueField : 'id',
						textField : 'text',
						onBeforeLoad : function(node) {
							$.getJSON(basePath+ 'destree/queryYhbTree.action?treeState=close&treeNodeType=1&id='+ qiteid,{},
								function(json) {$('#treeyonghubianTree').combobox('loadData',json);});
						},
						onChange : function(newValue,oldValue) {
							ClearSvgSelect();
							//$('#treeycjxtTree').combobox('');
							//$('#treeyonghubianTree').val("");
							//$('#treeycjxtTree').combobox('select', '');
							//var st = $('#treeycjxtTree').combobox("getData");
							/*var st = {
								"svgId" : "",
								"svgName" : "",
								"selected" : true
							};*/
							//$('#treeycjxtTree').combobox("loadData", st);
							userTranId = $('#treeyonghubianTree').combobox('getValue');
							IniColorGrid(userTranId);
							if (!isNaN(userTranId))
								$('#treeycjxtTree').combobox({
									url : basePath+ 'svg/getSutSVG.action?userTranId='+ userTranId,
									method : 'get',
									valueField : 'svgId',
									textField : 'svgName',
									multiple : false,// 是否支持多选
									onChange : function() {
										openNode = [];
										yid = $('#treeycjxtTree').combobox('getValue');
										GetSvgColorSetting(yid);
										if (yid != "0") {
											getSvg(yid);
											GetSvgSet(yid);
											//getExistSvg(userTranId,yid);
										} else if(yid=="0"){
											alert("yid:"+yid)
											IniSvgTools(newSvgCode);
											$('#newAddSvg').window('open');
										}
									},
									onLoadSuccess : function() {
										svgList = $('#treeycjxtTree').combobox('getData');
									}
								});
						}
					});
				}
			}
		}
	});
});
function IniSvgTools(svg)
{
	var ht = $(svg).attr("height");
	var wd = $(svg).attr("width");
	$("#tool_source").click();
	// $("#canvasBackground").attr({width:wd+"px",height:ht+"px"});
	// $("#svgcontent").attr({width:wd+"px",height:ht+"px",viewBox:"0
	// 0 "+wd +ht});
	$("#canvasBackground").children().attr("fill", "black");
	// var newsvg =
	// svg.substring(svg.indexOf(">")+1,svg.length-6);
	$("#svg_source_textarea").val(svg);
	$("#tool_source_save").click();
	$("#svgcontent").attr({
		onclick : "click(evt)"
	});
	$("#canvasBackground").attr({
		width : wd + "px",
		height : ht + "px"
	});
	}
/**
 * 获取一次图配置
 */
function GetSvgSet(svgId) {
	if (svgId != null && parseInt(svgId) > 0) {
		$.ajax({
			type : "post",
			url : basePath + 'svg/querySVGset.action',
			dataType : "json",
			data : {
				'svgId' : svgId
			},
			success : function(data) {
				// alert(data.length)
				svgSet = data;
			}
		});

	} else {
		svgSet = [];
	}

}
/**
 * 选取电压等级颜色
 */
function GetSvgColorSetting(yid) {
	$('#table1').datagrid("clearChecked");
	var rows = $('#table1').datagrid("getRows");
	for (var i = 0, len = rows.length; i < len; i++) {
		var colorId = "#color_" + rows[i].volt;
		$(colorId).val("#000000");
	}
	if (yid != null && yid != "" && parseInt(yid) >= 1) {
		$.ajax({
			type : "post",
			url : basePath + 'svg/queryDianyaId.action',
			dataType : "json",
			data : {
				'svgId' : yid,
			},
			success : function(data) {
				// alert(data[0].color);
				for (var j = 0; j < data.length; j++) {
					var voltCode = data[j].voltCode;
					var colorId = "#color_" + voltCode;
					var gridIndex = $(colorId).attr("gridIndex");
					$('#table1').datagrid("checkRow", parseInt(gridIndex));
					var color1 = data[j].color;
					$(colorId).val(color1);

				}
			}
		});

	}

}

/*function getExistSvg(userTranId, yid) {
	$.ajax({
		type : "post",
		url : basePath + 'svg/getExistSvg.action',
		dataType : "json",
		data : {
			'svgId' : yid,
			'userTranId' : userTranId
		},
		success : function(data) {
			svg = data[0].svg;
			alert("svg:   " + svg);
		}
	});
}*/
function IniColorGrid(userTranId) {
	$("#table1").datagrid({
		url : basePath + 'svg/queryDianYa.action?userTranId=' + userTranId
	});
}

/**
 * 获取一次接线图
 */

function getSvg(id) {
	// var userTranId = id;
	var svgId = id;
	var svgPath = "";
	for (var i = 0, len = svgList.length; i < len; i++) {
		if (svgList[i].svgId == id) {
			svgPath = svgList[i].svg;
			break;
		}

	}
	if (svgPath.length == 0) {
		IniSvgTools(newSvgCode);
		return;
	}
	// alert("userTranId: "+userTranId);
	// alert("yid: "+yid);
	$.ajax({
		type : "post",
		url : basePath + 'svg/GetSvgCode.action',
		dataType : "json",
		data : {
			'svg' : svgPath
		},
		success : function(data) {

			var svg = data.svg;
			IniSvgTools(svg);
		}
	});
}


function click(evt) {	
	/**
	 * 	清空测点配置
	 */
	$("#svg_id").val("");
	$("#stoptype").val("");
	$("#stoptypeId").val("");
	$("#viewid").val("");
	$("#alarmmode").val("");
	$("#clickevent").val("");
	$("#switchId").removeAttr("checked");
	$("#Switchopen").addClass("hidden");
	$("#newSwitchId").addClass("hidden");
	$("#switchTypeId").addClass("hidden");
	$("#switchradio").addClass("hidden");
	$("#stoptype").val("");
	$("#xtype1").removeAttr("checked");
	$("#ytype1").removeAttr("checked");
	$("#xtype2").removeAttr("checked");
	$("#ytype2").removeAttr("checked")
	$("#stopobjid").addClass("hidden");
	$("#stopobjtypeid").addClass("hidden");
	$("#kongjian").addClass("hidden");
	$("#viewId").addClass("hidden");	
	/*$("#oneId").addClass("hidden");
	$("#twoId").addClass("hidden");*/
	$("#oneortwo").val("");
	$("#position").val("");
	$("#idswitch").val("");
	$("#byvolt").removeAttr("checked");
	$("#guanlian").removeAttr("checked");
	$("#allcedian").addClass("hidden");
	//$("#shebei").combobox('setValue', '');
	//$("#cedian").combobox('clear');	
	//$('#cedian').combobox("loadData",[]);
	x1 = $('#line_x1').val();
	y1 = $('#line_y1').val();
	x2 = $('#line_x2').val();
	y2 = $('#line_y2').val();
	//$("#allcedian").val("");
	var id = userTranId;
	var svgid = $('#elem_id').val();
	// $('#cedian').combogrid('clear');
	$('#peizhi').window('open');
//	document.getElementById("svg_id").innerText = svgid;
	document.getElementById("svg_id").innerHTML = svgid;
	var url = basePath + 'destree/queryYhbTree.action';
	$('#shebei').combotree({
		// url:basePath+'destree/queryYhbTree.action?treeState=open&treeNodeType=2&id='+id,
		method : 'get',
		multiple : false,// 是否支持多选
		onSelect : function(node) {
	
		},
		onBeforeLoad : function(node) {// 请求之前
			var treeNodeType;
			if (node) {// 点击节点
//				alert(node.root_id);
				treeNodeType = node.type;// 获取节点类型
				if (typeof (openNode[parseInt(treeNodeType)]) != "undefined"
						&& openNode[parseInt(treeNodeType)]
								.indexOf("|" + node.id) >= 0) {
					$('#shebei').tree({
						data : treeData
					});
					IniDevTree(svgid);
				} else {
					$('#shebei').combotree('tree').tree(
							'options').url = url
							+ '?treeState=open&treeNodeType='
							+ treeNodeType;
					openNode[parseInt(treeNodeType)] += "|"
							+ node.id;
				}
			} else {
				if (openNode.length == 0) {
					$('#shebei').combotree('tree').tree(
							'options').url = url
							+ '?treeState=open&treeNodeType=2&id='
							+ id;// 带参数地址
					openNode[0] = 0;
				} else {
					$('#shebei').tree({
						data : treeData
					});
					IniDevTree(svgid);
	
				}
	
			}
		},
		onLoadSuccess : function(node, data) {
			treeData = data;
			IniDevTree(svgid);
			
		},
		onBeforeSelect : function(node) {
			var treeNodeType;
			if (node) {// 点击节点
				treeNodeType = node.type;// 获取节点类型
				if (treeNodeType == "2" || treeNodeType == "3"
						|| treeNodeType == "4"
						|| treeNodeType == "8") {
					$.messager.alert('警告', '非法选择，请选择设备！');
					return false;
				}
			}
		}
	});
}
/**
 * 初始化设备树
 * 
 * @param svgid
 */
function IniDevTree(svgid) {
	for (var i = 0, len = svgSet.length; i < len; i++) {
		if (svgSet[i].objId == svgid) {
			setSvgObj=svgSet[i];
			$('#shebei').combotree('setValue', {
				id : svgSet[i].deviceId,
				text : svgSet[i].devName
			});
			// 测点的id判断
			if (svgSet[i].sfMpId != null && svgSet[i].sfMpId != "") {
				$("#guanlian").attr("checked", "checked");
				$("#allcedian").removeClass("hidden");
				IniMpData(svgSet[i]);
			} else {
				$("#guanlian").removeAttr("checked");
				$("#allcedian").addClass("hidden");
				$('#cedian').combogrid('clear');
			}
			// 是否根据电压等级
			if (svgSet[i].byVolt != null && svgSet[i].byVolt == "1") {
				$("#byvolt").attr("checked", "checked");

			} else {
				$("#byvolt").removeAttr("checked");
			}
			// 停用方式
			if (svgSet[i].stopType != "") {
				$("#stoptype").val(svgSet[i].stopType);
			}
			// 停用对象Id
			if (svgSet[i].stopObjId != "") {
				$("#stopobjid").removeClass("hidden");
				$("#stopobjtypeid").removeClass("hidden");
				$("#stoptypeId").val(svgSet[i].stopObjId);
			}
			// 有无信号判断
			if (svgSet[i].noSingleId != "") {
				$("#nosingleType").removeClass("hidden");
				$("#nosingle").removeClass("hidden");
				$("#nosingleId").attr("value", "1");
				$("#kongjian").removeClass("hidden");
				$("#viewId").removeClass("hidden");
				// $("#viewId").val(svgSet[i].noSingleId);
				document.getElementById("viewid").value = svgSet[i].noSingleId;
			} else {
				$("#nosingleType").addClass("hidden");
				$("#nosingle").addClass("hidden");
				$("#kongjian").addClass("hidden");
				$("#viewId").addClass("hidden");
			}
			// 点击事件
			if (svgSet[i].clickEvent != "") {
				$("#clickevent").val(svgSet[i].clickEvent);
			}
			// 告警方式
			if (svgSet[i].alarmMode != null) {
				$("#alarmmode").val(svgSet[i].alarmMode);
			}
			// 是否开关
			if (svgSet[i].isSwitch == "1") {
				$("#switchId").attr("checked", "checked");
				$("#Switchopen").removeClass("hidden");
				// var text = $("#switchtype").val();
				if (svgSet[i].openType == "1" || svgSet[i].openType == "") {
					$("#newSwitchId").removeClass("hidden");
					$("#switchtype").val("1");
					$("#idswitch").val(svgSet[i].openobjId);
					$("#switchTypeId").addClass("hidden");
					$("#switchradio").addClass("hidden");
					$("#oneId").addClass("hidden");
					$("#twoId").addClass("hidden");
				} else if(svgSet[i].openType == "2"){
					$("#switchtype").val("2");
					$("#newSwitchId").addClass("hidden");
					$("#switchTypeId").removeClass("hidden");
					$("#switchradio").removeClass("hidden");
					$("#oneId").removeClass("hidden");
					$("#twoId").removeClass("hidden");
					$("#oneortwo").val(svgSet[i].oneOrTwo);
					if (svgSet[i].dirct != "" && svgSet[i].oneOrTwo != "") {
						if (svgSet[i].dirct == "x" && svgSet[i].oneOrTwo == "1") {
							$("#xtype1").attr("checked", "checked");
						} else if (svgSet[i].dirct == "y" && svgSet[i].oneOrTwo == "1") {
							$("#ytype1").attr("checked", "checked");
						}else if (svgSet[i].dirct == "y" && svgSet[i].oneOrTwo == "2") {
							$("#ytype2").attr("checked", "checked");
						}else if (svgSet[i].dirct == "x" && svgSet[i].oneOrTwo == "2") {
							$("#xtype2").attr("checked", "checked");
						}
					}
					$("#position").val(svgSet[i].origPosition);
				}else if(svgSet[i].openType == "3"){
					$("#newSwitchId").addClass("hidden");
					$("#switchtype").val("3");
					$("#switchTypeId").addClass("hidden");
					$("#switchradio").addClass("hidden");
					$("#oneId").addClass("hidden");
					$("#twoId").addClass("hidden");
				}else if(svgSet[i].openType == "4"){
					$("#newSwitchId").addClass("hidden");
					$("#switchtype").val("4");
					$("#switchTypeId").addClass("hidden");
					$("#switchradio").addClass("hidden");
					$("#oneId").addClass("hidden");
					$("#twoId").addClass("hidden");
				}else if(svgSet[i].openType == "5"){
					$("#newSwitchId").addClass("hidden");
					$("#switchtype").val("5");
					$("#switchTypeId").addClass("hidden");
					$("#switchradio").addClass("hidden");
					$("#oneId").addClass("hidden");
					$("#twoId").addClass("hidden");
				}
			} else {
				$("#switchId").removeAttr("checked");
				$("#Switchopen").addClass("hidden");
				$("#newSwitchId").addClass("hidden");
				$("#switchTypeId").addClass("hidden");
				$("#switchradio").addClass("hidden");
				$("#oneId").addClass("hidden");
				$("#twoId").addClass("hidden");
			}

			// IniCeDianTree(id,ids);
			break;
		}
	}
}
/**
 * 是否关联测点点击事件
 */
function MPChk_Click() {
	if ($("#guanlian").attr("checked")) {
		$("#allcedian").removeClass("hidden");
		IniMpData();
	} else {
		$("#allcedian").addClass("hidden");

	}

}
/**
 * 是否开关点击事件
 */
function SwChk_Click() {
	if ($("#switchId").attr("checked")) {
		$("#Switchopen").removeClass("hidden");
		var text = $("#switchtype").val();
		if (text == "1") {
			$("#newSwitchId").removeClass("hidden");
			// $("#positionId").addClass("hidden");
			$("#switchTypeId").addClass("hidden");
			$("#switchradio").addClass("hidden");
			$("#oneId").addClass("hidden");
			$("#twoId").addClass("hidden");
		} else if(text == "2"){
			$("#newSwitchId").addClass("hidden");
			// $("#positionId").removeClass("hidden");
			$("#switchTypeId").removeClass("hidden");
			$("#switchradio").removeClass("hidden");
			$("#oneId").removeClass("hidden");
			$("#twoId").removeClass("hidden");
		}else{
			$("#newSwitchId").addClass("hidden");
			// $("#positionId").removeClass("hidden");
			$("#switchTypeId").addClass("hidden");
			$("#switchradio").addClass("hidden");
			$("#oneId").addClass("hidden");
			$("#twoId").addClass("hidden");
		}
	} else {
		$("#switchId").removeAttr("checked");
		$("#Switchopen").addClass("hidden");
		$("#newSwitchId").addClass("hidden");
		// $("#positionId").addClass("hidden");
		$("#switchTypeId").addClass("hidden");
		$("#switchradio").addClass("hidden");
		$("#oneId").addClass("hidden");
		$("#twoId").addClass("hidden");
	}
}
/**
 * 初始化测点选择
 */
function IniMpData(mpObj) {
	var devId = $("#shebei").combobox('getValue');
	if (devId != null)
		$('#cedian').combogrid({
			url : basePath
					+ 'areaEnergyTmnl/getMpInfo.action?areaNo=101&deviceRela=LINESELF&tranId='
					+ devId,
			onLoadSuccess : function(node, data) {
				if (mpObj != null)
					$('#cedian').combogrid('setValue', {
						MP_ID : mpObj.sfMpId,
						MP_NAME : mpObj.mpName
					});
			}
		});
}

/**
 * 是否有信号
 */
function NoSingleChange() {
	var nosingleValue = $("#nosingle").val();
	if (nosingleValue == "0") {
		$("#viewId").addClass("hidden");
		$("#kongjian").addClass("hidden");
	} else {
		$("#viewId").removeClass("hidden");
		$("#kongjian").removeClass("hidden");
	}
}
/**
 * 开关方式是否选中
 */
function Switchchange() {
	var switchtype = $("#switchtype").val();
	if (switchtype == "1") {
		$("#switchTypeId").addClass("hidden");
		$("#switchradio").addClass("hidden");
		$("#newSwitchId").removeClass("hidden");
	} else if(switchtype == "2"){
		$("#xtype1").removeAttr("checked");
		$("#xtype2").removeAttr("checked");
		$("#ytype1").removeAttr("checked");
		$("#ytype2").removeAttr("checked");
		$("#switchTypeId").removeClass("hidden");
		$("#switchradio").removeClass("hidden");
		$("#newSwitchId").addClass("hidden");
	}else if(switchtype == "3"){
		$("#switchTypeId").addClass("hidden");
		$("#switchradio").addClass("hidden");
		$("#newSwitchId").addClass("hidden");
	}else if(switchtype == "4"){
		$("#switchTypeId").addClass("hidden");
		$("#switchradio").addClass("hidden");
		$("#newSwitchId").addClass("hidden");
	}else if(switchtype == "5"){
		$("#switchTypeId").addClass("hidden");
		$("#switchradio").addClass("hidden");
		$("#newSwitchId").addClass("hidden");
	}
}

/**
 * 开关按钮
 */
$("#openclose").click(function() {
	var id;
	var svgId = $("#svg_id").text();
	// var position = $("#position").val();
	if ($("#xtype1").attr("checked") == "checked") {
		id = document.getElementById("xtype1").value;
	} else if ($("#ytype1").attr("checked") == "checked") {
		id = document.getElementById("ytype1").value;
	}else if ($("#xtype2").attr("checked") == "checked") {
		id = document.getElementById("xtype2").value;
	}else if ($("#ytype2").attr("checked") == "checked") {
		id = document.getElementById("ytype2").value;
	}
	//var oneortwo = $("#oneortwo").val();
	var str = id.split("_");
	var xy = str[0];
	var oneortwo = str[1];
	var positionId = xy+oneortwo;
	//var positionId = xy + oneortwo;
	if (positionId == "x1") {
		position = x1;
	} else if (positionId == "y1") {
		position = y1;
	} else if (positionId == "x2") {
		position = x2;
	} else if (positionId == "y2") {
		position = y2;
	}
	IniFunc(svgId, position, xy, oneortwo);
	// IniFunc("#svg_16","1095.5000",'x',2);
});

/*******************************************************************************
 * 开关动画切换
 * 
 * @param svgId
 * @param dataValue
 * @param xy
 * @param oneOrTwo
 */
function IniFunc(svgId, dataValue, xy, oneOrTwo) {
	Open_Close($("#" + svgId), xy, oneOrTwo, parseInt(dataValue));
}
/*******************************************************************************
 * 开关动画
 * 
 * @param obj
 * @param isY
 * @param num
 * @param oldValue
 */
function Open_Close(obj, isY, num, oldValue) {
	if (typeof ($(obj).attr("close")) == "undefined"
			|| $(obj).attr("close") == "false") {
		$(obj).attr("close", "true");
		if (num == 1) {
			$(obj).attr(isY + "1", $(obj).attr(isY + "2"));
		} else {
			$(obj).attr(isY + "2", $(obj).attr(isY + "1"));
		}
	} else {
		$(obj).attr("close", "false");
		$(obj).attr(isY + num, oldValue);
	}
}
/*******************************************************************************
 * 
 */
/**
 * 上传svg文件
 */
$("#upload").click(function() {
	//getExistSvg(userTranId,yid);
	//var svgExist = svg;
	$.ajax({
		type : "post",
		url : basePath + 'svg/GetIfExistSvg.action',
		dataType : "json",
		data : {
			'svgId' : yid,
			'userTranId' : userTranId
		},
		success : function(data) {
			 var svg = data[0].svg;
			if (svg !== "") {
				$("#tool_source").click();
				var svgChart = $("#svg_source_textarea").val();
				var wd = $(svgChart).attr("width");
				var ht = $(svgChart).attr("height");				
				//svgChart=svgChart.replace(svgChart.substring(svgChart.indexOf("<title>"),svgChart.indexOf("</title>")+8),'');
				svgChart= "<svg width='"+wd+"' height='"+ht+"' id='svg_Main' xmlns='http://www.w3.org/2000/svg' ><!-- Created with SVG-edit - http://svg-edit.googlecode.com/ -->" + svgChart.substring(svgChart.indexOf("</title>")+8,svgChart.lastIndexOf("</g>"))+ "</svg>";
				$("#tool_source_save").click();
				$.getJSON(basePath + 'svg/uploadNewSvg.action', {
					'susSVGModel.svgId' : yid,
					'susSVGModel.userTranId' : userTranId,
					'susSVGModel.svg' : svg,
					'susSVGModel.svgChart' : svgChart,
				}, function(json) {
					if (json.saveSUCCESS == "true") {
						// clearTable();
						$.messager.alert('确认', "保存成功！", 'info', function(r) {
						});
						$('#newAddSvg').window('close');
					} else {
						$.messager.alert('确认', "保存失败！", 'warning');// 移除失败
						$('#newAddSvg').window('close');
					}
				});
			} else {
				$("#tool_source").click();
				var svgChart = $("#svg_source_textarea").val();
				$("#tool_source_save").click();
				$.getJSON(basePath + 'svg/uploadSvg.action', {
					'susSVGModel.svgId' : yid,
					'susSVGModel.userTranId' : userTranId,
					// 'susSVGModel.svg' : svg,
					'susSVGModel.svgChart' : svgChart,
				}, function(json) {
					if (json.saveSUCCESS == "true") {
						// clearTable();
						$.messager.alert('确认', "保存成功！", 'info', function(r) {
						});
						$('#newAddSvg').window('close');
					} else {
						$.messager.alert('确认', "保存失败！", 'warning');// 移除失败
						$('#newAddSvg').window('close');
					}
				});
			}
		}
	});	
});
/**
 * 点击保存按钮
 */
$("#insert").click(function() {
	var dirct;
	var byvolt;
	var isSwitch;
	var svg_id = yid;
	var obj_id = $("#svg_id").text();
	var device_id = $("#shebei").combobox('getValue');
	
	devDatas = $('#shebei').combotree("tree");
	var node = devDatas.tree('find', device_id);
	//var alarmObjId = node.alarmObjId;
	///alert("alarmObjId:   "+alarmObjId);
	var devType ="";
	switch(node.rootType)
	{
		case "7":
			devType = 1;
		break;
		case "6":
			devType= 2;
		break;
		case "5":
			devType = 3;
		break;
		case "8":
		case "9":
			devType = 4;
		break;
	}
//	alert(devDatas.length)
	var sfmpid = $("#cedian").combobox('getValue');
	var stoptype = $("#stoptype").val();
	var stopobjid = $("#stoptypeId").val();
	var noSingleId = $("#viewid").val();
	var alarmmode = $("#alarmmode").val();
	var clickevent = $("#clickevent").val();
	if ($("#switchId").attr("checked") == "checked") {
		isSwitch = "1";
	} else {
		isSwitch = "0";
	}
	if ($("#xtype1").attr("checked") == "checked") {
		id = document.getElementById("xtype1").value;
		var str = id.split("_");
		var dirct = str[0];
		var oneortwo = str[1];
	} else if ($("#ytype1").attr("checked") == "checked") {
		id = document.getElementById("ytype1").value;
		var str = id.split("_");
		var dirct = str[0];
		var oneortwo = str[1];
	}else if ($("#xtype2").attr("checked") == "checked") {
		id = document.getElementById("xtype2").value;
		var str = id.split("_");
		var dirct = str[0];
		var oneortwo = str[1];
	}else if ($("#ytype2").attr("checked") == "checked") {
		id = document.getElementById("ytype2").value;
		var str = id.split("_");
		var dirct = str[0];
		var oneortwo = str[1];
	}
	var openType =$("#switchtype").val()
	var position = $("#position").val();
	var openobjId = $("#idswitch").val();
	if ($("#byvolt").attr("checked") == "checked") {
		byvolt = "1";
	} else {
		byvolt = "0";
	}
	//alert("setSvgObj.sfMpId:    "+setSvgObj.sfMpId);
	if(setSvgObj == null) 
		{
		setSvgObj={};
		svgSet[svgSet.length] = setSvgObj;
		setSvgObj.objId=obj_id;
		}
	setSvgObj.sfMpId = sfmpid;
	setSvgObj.byVolt = byvolt;
	setSvgObj.stopType = stoptype;
	setSvgObj.stopObjId = stopobjid;
	setSvgObj.noSingleId = noSingleId;
	setSvgObj.clickEvent = clickevent;
	setSvgObj.alarmMode = alarmmode;
	setSvgObj.openobjId = openobjId;
	setSvgObj.oneOrTwo = oneortwo;
	setSvgObj.dirct = dirct;
	setSvgObj.origPosition = position;
	setSvgObj.deviceId = device_id;
	setSvgObj.deviceType = devType;
	$.getJSON(basePath + 'svg/addCeDian.action', {
		'susSVGModel.svgId' : svg_id,
		'susSVGModel.objId' : obj_id,
		'susSVGModel.sfMpId' : sfmpid,
		'susSVGModel.alarmMode' : alarmmode,
		'susSVGModel.tipsMode' : 0,
		'susSVGModel.openwinMode' : 0,
		'susSVGModel.openobjId' : openobjId,
		'susSVGModel.isSwitch' : isSwitch,
		'susSVGModel.dirct' : dirct,
		'susSVGModel.origPosition' : position,
		'susSVGModel.oneOrTwo' : oneortwo,
		'susSVGModel.stopType' : stoptype,
		'susSVGModel.stopObjId' : stopobjid,
		'susSVGModel.noSingleId' : noSingleId,
		'susSVGModel.alarmObjId' : '',
		'susSVGModel.clickEvent' : clickevent,
		'susSVGModel.deviceId' : device_id,
		'susSVGModel.deviceType' : devType,
		'susSVGModel.byVolt' : byvolt,
		'susSVGModel.openType' : openType

	}, function(json) {
		if (json.saveSUCCESS == "true") {
			$.messager.alert('确认', "保存成功！", 'info', function(r) {
			});
			$('#peizhi').window('close');
		} else {
			$.messager.alert('确认', "保存失败！", 'warning');// 移除失败
			$('#peizhi').window('close');
		}
	});

});


function addVoltClick() {
	var id = yid;
	$.getJSON(basePath + 'svg/addVolt.action', {
		'susSVGModel.svgId' : id,
		'susSVGModel.userTranId' : userTranId,
		// 'susSVGModel.voltCode' : volt,
		// 'susSVGModel.color' : color,
		'susSVGModel.svgName' : $("#newName").val(),
		'susSVGModel.svgOrder' : $("#order").val()

	}, function(json) {
		if (json.saveSUCCESS == "true") {
			getIdName(userTranId);
			$.messager.alert('确认', "保存成功！", 'info', function(r) {
			});
			$('#newAddSvg').window('close');
		} else {
			$.messager.alert('确认', "保存失败！", 'warning');// 移除失败
			$('#newAddSvg').window('close');
		}
	});
}

function volt() {
	$('#newTable').window('open');
}

$("#insertVoltColor").click(function() {
	var chkRows = $('#table1').datagrid("getChecked");
	for (var i = 0, len = chkRows.length; i < len; i++) {
		var colorId = "#color_" + chkRows[i].volt;
		var color = $(colorId).val();
		var volt = chkRows[i].volt;
	}
	$.getJSON(basePath + 'svg/insertVoltColor.action', {
		'susSVGModel.svgId' : yid,
		// 'susSVGModel.userTranId' : userTranId,
		'susSVGModel.voltCode' : volt,
		'susSVGModel.color' : color,
	// 'susSVGModel.svgName' : $("#newName").val(),
	// 'susSVGModel.svgOrder' : $("#order").val()

	}, function(json) {
		if (json.saveSUCCESS == "true") {
			$.messager.alert('确认', "保存成功！", 'info', function(r) {
			});
			$('#newTable').window('close');
		} else {
			$.messager.alert('确认', "保存失败！", 'warning');// 移除失败
			$('#newTable').window('close');
		}
	});
});
/**
 * 新增的svg放在下拉列表的首位
 * @param userTranId
 */
function getIdName(userTranId) {
	$.ajax({
		type : "post",
		url : basePath + 'svg/getIdName.action',
		dataType : "json",
		data : {
			'susSVGModel.userTranId' : userTranId
		},
		success : function(data) {
			var dt = $('#treeycjxtTree').combobox("getData");
			dt[dt.length] = {
				"svgId" : data[0].svgId,
				"svgName" : data[0].svgName,
				"selected" : true
			};
			$('#treeycjxtTree').combobox("loadData", dt);
		}
	});
}
