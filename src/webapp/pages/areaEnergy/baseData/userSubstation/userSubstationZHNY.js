/**
 * <p>
 * Title: 江苏能源综合服务平台
 * </p>
 * <p>
 * Description:采集档案主页查询
 * </p>
 * <p>
 * Copyright: Copyright (c) 2009
 * </p>
 * <p>
 * Company: 江苏方天电力技术有限公司
 * </p>
 */
des.namespace("com.frontier.areaEnergy.userSubstation");

var optionVal = [];
function loadSelOptVal(){
	
//	roleCode = "yhcn";
	if("qyny" == roleCode){
		$("#gongdiangongsi").hide();
		$("#fuwuzhongxin").show();
	}else{
		$("#gongdiangongsi").show();
		$("#fuwuzhongxin").hide();
	}
	
	if("yhcn" == roleCode){
		optionVal = [ 
            {
				'text' : '用户侧储能',
				'value' : '1',
				'selected' : true
			}
		];
	}else if("qyny" == roleCode){
		optionVal = [
            {
				'text' : '区域能源应用',
				'value' : '2',
				'selected' : true
			}
		];
	}else if("fqls" == roleCode){
		optionVal = [ 
            {
				'text' : '非侵入式终端',
				'value' : '3',
				'selected' : true
			}
		];
	}else if("zhny" == roleCode){
		optionVal = [ 
            {
				'text' : '综合能源应用',
				'value' : '0',
				'selected' : true
			},
            {
				'text' : '用户侧储能',
				'value' : '1'
			}, 
            {
				'text' : '区域能源应用',
				'value' : '2'
			}, 
            {
				'text' : '非侵入式终端',
				'value' : '3'
			}
		];
	}
	$('#wnGrade').combobox({
		onSelect: function(param){
			
			if(param.value == "2"){
				$("#gongdiangongsi").hide();
				$("#fuwuzhongxin").show();
			}else{
				$("#gongdiangongsi").show();
				$("#fuwuzhongxin").hide();
			}
			//$('#wnGrade').combobox('loadData', []);
			//$('#wnGrade').combobox('loadData', optionVal);
		}
	});
	
	$('#wnGrade').combobox('loadData', optionVal);
	
	
}

$(function() {
	
	loadSelOptVal();
	$("body").layout();

	$('#collArchiveTable')
			.datagrid(
					{
						height : $(window).height() - $('#queryDiv').height()
								- 5,
						border : false,
						title : '查询结果',
						singleSelect : true,
						lazyLoad : true,
						striped : true,
						url : '',
						sortOrder : 'desc',
						remoteSort : false,
						showFooter : true,
						pageSize : 50,
						columns : [ [
								{
									title : '服务中心',
									field : 'AREA_NAME',
									width : 100,
									sortable : true,
									formatter : function(value, row, index) {
										return row.AREA_NAME;
									}
								},
								{
									title : '用户名称',
									field : 'CONS_NAME',
									sortable : true,
									width : 160,
									formatter : function(value, row, index) {
										var pth = des.webContextRoot;
										var subConsName = "";
										if (row.CONS_NAME.length > 11) {
											subConsName = row.CONS_NAME
													.substring(0, 11)
													+ "...";
										} else {
											subConsName = row.CONS_NAME;
										}
										var cli = '<a style="text-decoration: none;" title='
												+ row.CONS_NAME
												+ ' href="javascript:openClick(\''
												+ pth
												+ '\',\''
												+ row.CONS_ID
												+ '\',\''
												+ row.CONS_NO
												+ '\',\''
												+ row.SUB_TYPE
												+ '\')">'
												+ subConsName
												+ '</a>';
										return cli;
									}
								},
								{
									title : '用户编号',
									field : 'CONS_NO',
									sortable : true,
									formatter : function(value, row, index) {
										return row.CONS_NO;
									}
								},
								{
									title : '电压等级',
									field : 'VOLT_CODE',
									sortable : true,
									formatter : function(value, row, index) {
										return row.VOLT_CODE;
									}
								},
								{
									title : '数据时间',
									field : 'LAST_TIME',
									width : 150,
									sortable : true,
									formatter : function(value, row, index) {
										var s = row.OL_FLAGS;
										if (s == '1') {
											return '<span style=\"color:red\">'
													+ row.LAST_TIME + '</span>';
										} else {
											return row.LAST_TIME;
										}
									}
								}, {
									title : '冻结时间',
									field : 'DATA_DATE',
									width : 150,
									sortable : true,
									formatter : function(value, row, index) {
										return row.DATA_DATE;
									}
								}, {
									title : '用电总负荷(kW)',
									field : 'USE_LOAD',
									width : 100,
									sortable : true,
									formatter : function(value, row, index) {
										return row.USE_LOAD;
									}
								}
								/** 2017-04-07 chenwei 剔除所有界面的出线总负荷统计* */
								/***********************************************
								 * , { title : '出线总负荷(kW)', field : 'OUT_LOAD',
								 * width : 120, sortable : true,
								 * formatter:function(value,row,index){ return
								 * row.OUT_LOAD; } }
								 **********************************************/

								, {
									title : '在线状态',
									field : 'OL_FLAG',
									width : 100,
									sortable : true,
									formatter : function(value, row, index) {
										return row.OL_FLAG;
									}
								}, {
									title : '终端IP',
									field : 'CTRL_IP',
									sortable : true,
									formatter : function(value, row, index) {
										return row.CTRL_IP;
									}
								}, {
									title : '终端资产号',
									field : 'TMNL_ASSET_NO',
									sortable : true,
									formatter : function(value, row, index) {
										return row.TMNL_ASSET_NO;
									}
								}, {
									title : '运行状态',
									field : 'STATUS_CODE',
									sortable : true,
									formatter : function(value, row, index) {
										return row.STATUS_CODE;
									}
								}, {
									title : '终端型号',
									field : 'TERMINAL_KIND',
									sortable : true,
									formatter : function(value, row, index) {
										return row.TERMINAL_KIND;
									}
								}, {
									title : '终端厂家',
									field : 'FACTORY_CODE',
									sortable : true,
									formatter : function(value, row, index) {
										return row.FACTORY_CODE;
									}
								}, {
									title : '联系人名称',
									field : 'CONTACT_NAME',
									sortable : true,
									formatter : function(value, row, index) {
										return row.CONTACT_NAME;
									}
								}, {
									title : '联系电话',
									field : 'TELEPHONE',
									sortable : true,
									formatter : function(value, row, index) {
										return row.TELEPHONE;
									}
								} ] ],
						pagination : true,
						rownumbers : true
					});
	query = function() {
		var fwzx = $('#fwzx').val();
		var dydj = $('#dydj').val();
		var djsj = $('#djsj').val();
		var jqcx = $('#jqcx').val();
		var yhmc = $('#yhmc').val();
		var yhbmc = $('#yhbmc').val();
		
		var orgNo = $('#orgNo').combotree('tree').tree('getSelected').id;
		//alert(orgNo);
//		alert(fwzx+"、"+dydj+"、"+djsj+"、"+jqcx+"、"+yhmc+"、"+yhbmc);
		send(fwzx, dydj, djsj, jqcx, yhmc, yhbmc,orgNo);
	};

	$("#jqcx").bind('keyup', function(event) {
		if (event.keyCode == "13") {
			var fwzx = $('#fwzx').val();
			var jqcx = $('#jqcx').val();
			send(fwzx, "", "", jqcx, "", "");
		}
	});

	$("#yhmc").bind('keyup', function(event) {
		if (event.keyCode == "13") {
			var fwzx = $('#fwzx').val();
			var yhmc = $('#yhmc').val();
			send(fwzx, "", "", "", yhmc, "");
		}
	});

	$("#yhbmc").bind('keyup', function(event) {
		if (event.keyCode == "13") {
			var fwzx = $('#fwzx').val();
			var yhbmc = $('#yhbmc').val();
			send(fwzx, "", "", "", "", yhbmc);
		}
	});

	send = function(fwzx, dydj, djsj, jqcx, yhmc, yhbmc,orgNo) {
		var wnGrade = $('#wnGrade').val();
//		return;
		var opts = $('#collArchiveTable').datagrid("options");
		if (jqcx == "户号/联系电话/终端IP") {
			jqcx = "";
		}
		opts.url = des.webContextRoot
				+ 'areaEnergy/queryUserSubstationInfoNew.action';
		$('#collArchiveTable').datagrid("load", {
			"substation.fwzx" : fwzx,
			"substation.dydj" : dydj,
			"substation.djsj" : djsj,
			"substation.jqcx" : jqcx,
			"substation.yhmc" : yhmc,
			"substation.wnGrade" : wnGrade,
			"substation.yhbmc" : yhbmc,
			"substation.orgNo" : orgNo
		});
	};

	
	setTimeout("query();",1000);

	inputf = function() {
		var jqcx = $('#jqcx').val();
		if (jqcx == "户号/联系电话/终端IP") {
			$('#jqcx').val("");
			$('#jqcx').css("color", "#333");
		}
	};

	inputb = function() {
		var jqcx = $.trim($('#jqcx').val());
		if (jqcx == "") {
			$('#jqcx').val("户号/联系电话/终端IP");
			$('#jqcx').css("color", "#BCBCBC");
		}
		;
	};

	openClick = function(baseP, consId, consNo,SUB_TYPE) {
		
		if(SUB_TYPE == "6"){
			//储能
			OpenWin(
					baseP
							+ 'pages/storedEnergy/storedEnergyCons/storedEnergyConsTree.jsp?consId='
							+ consId, "明细页面", screen.availWidth - 40,
					screen.availHeight - 60);
		}else if(SUB_TYPE == "10"){
			//非侵入式
			OpenWin(encodeURI(baseP
					+ 'fqrsTmnl/fqrsDataDetail.action?consId='
					+ consId + "&consNo=" + consNo),"非侵入式负荷识别终端明细",screen.availWidth-400,screen.availHeight-450);
			//http://localhost:7001/des/fqrsTmnl/fqrsDataDetail.action?consId=991000078186&consNo=%E6%B5%8B%E8%AF%952222
		}else{
			OpenWin(
					baseP
							+ 'pages/areaEnergy/consDataCentre/getConsDetailTree.jsp?consId='
							+ consId + "&consNo=" + consNo, "明细页面",
					screen.availWidth - 40, screen.availHeight - 60);
		}
		
	}
	// add by zhulin 不可拖动窗体大小
	function OpenWinUnRes(url, winName, width, height, isClosed) {
		xposition = 0;
		yposition = 0;

		if ((parseInt(navigator.appVersion) >= 4)) {
			xposition = (screen.width - width) / 2;
			yposition = (screen.height - height) / 2;
		}
		theproperty = "width=" + width + "," + "height=" + height + ","
				+ "location=0," + "menubar=0," + "resizable=0,"
				+ "scrollbars=1," + "status=1," + "titlebar=0," + "toolbar=0,"
				+ "hotkeys=0," + "screenx=" + xposition + "," // 仅适用于Netscape
				+ "screeny=" + yposition + "," // 仅适用于Netscape
				+ "left=" + xposition + "," // IE
				+ "top=" + yposition; // IE
		monwin = window.open(url, winName, theproperty, false);
		if (isClosed) {
			monwin.close();
			monwin = window.open(url, winName, theproperty, false);
		}
		monwin.focus();
	}
	function OpenWin(url, winName, width, height, properties) {
		properties = properties || {};
		xposition = 0;
		yposition = 0;

		if ((parseInt(navigator.appVersion) >= 4)) {
			xposition = (screen.width - width) / 2;
			yposition = (screen.height - height) / 2;
		}
		if (typeof properties.resizable == 'undefined') {
			properties.resizable = 1;
		}
		if (typeof properties.scrollbars == 'undefined') {
			properties.scrollbars = 1;
		}
		theproperty = "width=" + width + "," + "height=" + height + ","
				+ "location=0," + "menubar=0," + "resizable="
				+ properties.resizable + "," + "scrollbars="
				+ properties.scrollbars + "," + "status=1," + "titlebar=0,"
				+ "toolbar=0," + "hotkeys=0," + "screenx=" + xposition + "," // 仅适用于Netscape
				+ "screeny=" + yposition + "," // 仅适用于Netscape
				+ "left=" + xposition + "," // IE
				+ "top=" + yposition; // IE
		try {
			monwin = window.open(url, winName, theproperty, false);
			monwin.focus();
		} catch (e) {

		}
	}

	excel = function() {
		$('#a').val($('#fwzx').val());
		$('#b').val($('#dydj').val());
		$('#c').val($('#djsj').val());
		if ($('#jqcx').val() == "户号/联系电话/终端IP") {
			$('#d').val("");
		} else {
			$('#d').val($('#jqcx').val());
		}
		$('#e').val($('#yhmc').val());
		$('#f').val($('#yhbmc').val());
		$('#h').val($("#wnGrade").val());
		document.thisform.action = basePath
				+ "areaEnergy/ExcelUserSubstationInfo.action",
				document.thisform.submit();

	};
	
});
/**
$('#wnGrade').combobox({
	onSelect: function(param){
		
		if(param.value == "2"){
			$("#gongdiangongsi").hide();
			$("#fuwuzhongxin").show();
		}else{
			$("#gongdiangongsi").show();
			$("#fuwuzhongxin").hide();
		}
		//$('#wnGrade').combobox('loadData', []);
		//$('#wnGrade').combobox('loadData', optionVal);
	}
});**/