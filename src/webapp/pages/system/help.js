/**
 * 
 * 系统在线帮助
 * @author 王梓璇 2017-03-13
 * 
 */
var isCanEdit;
var edituser;
Ext.namespace('com.frontier.des.help');
com.frontier.des.help.TEMPLATE = '<img src="/des/pages/despages/common/images/discuz_icon.gif"><b>相关功能介绍</b><br>详细信息<br><br><br>';
var loginUserId;
$(function(){
	
	document.getElementById('tabName').innerHTML = itemName;//"itemCode=" + itemCode +'   itemName=' + itemName;
//	if(areaNo == '101'){
		document.title="在线帮助--综合能源服务中心运管系统";
		$('#areaName').html("综合能源服务中心运管系统");
		$('#qyny').text('综合能源用户手册 ');
//	}else {
//		document.title="在线帮助--区域能源服务中心运管系统";
//		$('#areaName').html("区域能源服务中心运管系统");
//		$('#qyny').text('区域能源用户手册 ');
//	}
	
});

function loadContent(callback) {

	Ext.Ajax.request({
		url : gdc.webContextRoot + 'systemHelp/findHelpContent.action',
		params : {
			'systemHelp.modeId' : itemCode
		},
		success : function(result,request) {
			var res = result.responseText;
			var obj = eval('(' + res + ')');
			edituser = obj.systemHelp.editUser;
			if(edituser != loginUserId){
				$("#canOnlineHelp").removeAttr('herf');//去掉a标签中的herf属性
				$("#canOnlineHelp").removeAttr('onclick');//去掉a标签的onclick事件
//				document.getElementById('canOnlineHelp').setAttibute('style':'color:"gray"');
				$("#canOnlineHelp").css({'opacity':'0.2'});//设置超链接颜色为灰绿色   不可点击的颜色
			}
		
			if (callback) {
				callback(obj);
				return;
			}
			if (obj.systemHelp) {
				document.getElementById('contentArea').innerHTML =  obj.systemHelp.content;
				
			}
		}
	});
}

function gdgl_openDetailDialog(){
	var callback = function(result) {
			if (!result.systemHelp) { 
				result.systemHelp = {};
			}
		
		new Ext.Window({
			id : 'editWin',
			title : '在线帮助编辑',
			width : 600,
			height : 450,
			modal : true,
			maximizable : true,
			layout : 'fit',
			tbar : [{
				text : '保存',
				iconCls : 'save',
				handler : com.frontier.des.help.saveClick
			}],
			items : [new Des.form.HtmlEditor({
						id : 'editArea',
						fieldLabel: '内容',
						blankText: '内容不能为空',
						anchor: '100%',
						enableLinks :false,
						autoScroll: false,
						value :result.systemHelp.content ||com.frontier.des.help.TEMPLATE
					})]
		}).show();
	};
	loadContent(callback);
}

com.frontier.des.help.saveClick = function() {
	var edit = Ext.getCmp('editArea');
	if (edit.value == null || edit.value === '') {
		Ext.MessageBox.alert('提示', '内容不能为空！');
		return;
	}
	if (edit.value.length > 3999) {
		Ext.MessageBox.alert('提示', '内容不能超过4000个字符！');
		return;
	}
	Ext.Ajax.request({
		url : gdc.webContextRoot + 'systemHelp/editHelpContent.action',
		method : 'POST',
		params : {
			'systemHelp.modeId' : itemCode,
			'systemHelp.content' : Ext.getCmp('editArea').getValue()
		},
		success : function(result,request) {
			Appframe.viewinfdlg.right.show("内容保存成功！",true);
			var res = result.responseText;
			var obj = eval('(' + res + ')');
			document.getElementById('contentArea').innerHTML = obj.systemHelp.content;
			if (Ext.getCmp('editWin')) {
				Ext.getCmp('editWin').close();
			}
		}
	});
}

