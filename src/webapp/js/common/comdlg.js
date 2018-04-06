/**
 * <p>Title: 购电侧系统</p>
 * <p>Description: 购电侧系统 提示窗口定义</p>
 * <p>Copyright: Copyright (c) 2009</p>
 * <p>Company: 江苏方天电力技术有限公司</p>
 */
Ext.namespace("gdc.dlg");

/**
 * 提示框
 * @type {Ext.Window}
 */
gdc.dlg.win=null;

/**
 * 错误图标
 * @return 图标panel
 */
gdc.dlg.getErrorIconPnl=function(){
	return new Ext.Panel({
		border:false,
		layout:'fit',
		html:"<img src='"+gdc.webContextRoot+"/images/Stop_Sign.png' width='50' height='50' />"
	});
}

/**
 * 警告图标
 * @return 图标panel
 */
gdc.dlg.getWarnIconPnl=function(){
	return new Ext.Panel({
		border:false,
		layout:'fit',
		html:"<img src='"+gdc.webContextRoot+"/images/Warn_Sign.jpg' width='50' height='50' />"
	});
}
/**
 * 构造错误提示框
 */
gdc.dlg.initWin=function(){
	gdc.dlg.edits=[
		new Ext.form.TextArea({value:'',readOnly:true}),
		new Ext.form.TextArea({value:'',readOnly:true})
	];	
	gdc.dlg.win=new Ext.Window({
		//add id, editor yinmang
		id : 'gdc.dlg.win',
		layout:'border',
		title:'提示',
		width:500,
		height:155,
		closable:true,
		closeAction:'hide',
		maximizable:true,
		modal:true,
		border:false,
		tbar:[{
			text: '关闭',
			handler:function(){gdc.dlg.win.hide();}
		}],
		items:[{
					layout:'border',
					autoScroll:true,
					region:'north',
					height:70,
					border:false,
					items:[{
							region:'center',
							border:false,
							layout:'fit',
							items:[gdc.dlg.edits[0]]
						},{
							layout:'fit',
							region:'west',
							width:70,
							border:false,
							bodyStyle:'padding:10px'
						}
					]
				},{
					layout:'fit',
					autoScroll:true,
					region:'center',
					collapsible: true,
			   	  	collapsed:true,
			   	  	title:"详细信息",
			   	  	border:false,
					listeners:{
						beforeexpand:function(p,animate){
							gdc.dlg.win.setHeight(400);
						},
						beforecollapse:function(p,animate){
							gdc.dlg.win.setHeight(155);
						}
					},
					items:[
						gdc.dlg.edits[1]
					]
				}],
			listeners:{
				beforehide:function(){
					gdc.showHtmlCombo();
					if (typeof gdc.dlg.dlgData.callback=="function") gdc.dlg.dlgData.callback();
				}
			}					
	});
}
/**
 * 组装错误信息
 * {
 *	infType:1  //信息类型： 1警告 2错误
 *	showDetial:"",//显示提示对话框时默认是否显示详细信息
 *	clientCode:"",//错误代码
 *	message:"",//错误信息
 *	detailMessage:"",//详细错认信息
 *	callback:, //本提示对话框关闭后的回调函数
 *}
*/

gdc.dlg.getMessage=function(){
	var errdata=gdc.dlg.dlgData;
	var errinf="";
	if (errdata.clientCode && errdata.clientCode.length>0){
		errinf="代码："+errdata.clientCode+"\n";
	}
	if (errdata.message && errdata.message.length>0){
		errinf+="信息："+errdata.message;
	}
	if (errinf.length<=0 && errdata.stackTrace && errdata.stackTrace.length>0){
		errinf+="信息："+errdata.stackTrace;
	}
	if (errinf.length<=0 && errdata.detailMessage && errdata.detailMessage.length>0){
		errinf+="信息："+errdata.detailMessage;
	}
	return errinf;
}
/**
 * 组装详细信息
 * @return 详细信息
 */
gdc.dlg.getDetailMessage=function(){
	var res="";
	if (gdc.dlg.dlgData.detailMessage && gdc.dlg.dlgData.detailMessage.length>0){
		res=gdc.dlg.dlgData.detailMessage;
	}
	if (gdc.dlg.dlgData.stackTrace && gdc.dlg.dlgData.stackTrace.length>0){
		res=gdc.dlg.dlgData.stackTrace;
	}
	return res;	
}
/**
 * 显示错误提示框
 * {
 *	infType:1  //信息类型： 1警告 2错误
 *	showDetial:"",//显示提示对话框时默认是否显示详细信息
 *	clientCode:"",//错误代码
 *	message:"",//错误信息
 *	detailMessage:"",//详细错认信息
 *	callback:, //本提示对话框关闭后的回调函数
 *}
*/
gdc.dlg.showDlg=function(dlgData){
	gdc.dlg.dlgData=dlgData;
	if (gdc.dlg.win==null){
		gdc.dlg.initWin();
	}
	var icoPaneP=gdc.dlg.win.items.get(0).items.get(1);
	if (icoPaneP.items && icoPaneP.items.getCount()>0){
		icoPaneP.remove(0,true);
	}
	if (dlgData.infType && dlgData.infType==1){
		icoPaneP.add(gdc.dlg.getWarnIconPnl());
	}else{
		icoPaneP.add(gdc.dlg.getErrorIconPnl());
	}
	if (dlgData.showDetial){
		gdc.dlg.win.items.get(1).expand(false);
	}else{
		gdc.dlg.win.restore();
		gdc.dlg.win.items.get(1).collapse(false);
	}
	icoPaneP.doLayout(false);
	gdc.dlg.edits[0].setValue(gdc.dlg.getMessage());
	gdc.dlg.edits[1].setValue(gdc.dlg.getDetailMessage());
	gdc.hideHtmlCombo();
	gdc.dlg.win.show();
}

/**
 * 提示框 打开后，稍候自动关闭
 * @param msg 错误信息
 * @param msg 回调函数
 * @type Ext.Window
 */
gdc.dlg.momentWin=null;
gdc.dlg.showMomentDlg=function(msg,backFn){
	if (gdc.dlg.momentWin == null) {
		gdc.dlg.momentWinEdit = new Ext.form.TextArea({
			region : 'center',
			value : '',
			readOnly : true
		});
		gdc.dlg.momentWin = new Ext.Window({
			layout : 'border',
			title : '提示',
			width : 260,
			height : 90,
			closable : true,
			closeAction : 'hide',
			modal : false,
			allowDomMove : false,
			border : false,
			resizable : false,
			minimizable : false,
			maximizable : false,
			items : [{
				layout : 'fit',
				region : 'west',
				width : 40,
				border : false,
				html : "<img src='" + gdc.webContextRoot
						+ "/images/img/dook.jpg' width='40' height='40' />"
			}, gdc.dlg.momentWinEdit]
		});
		gdc.dlg.hideMomentWin = function() {
			if (gdc.dlg.momentWin.isVisible()) {
				gdc.dlg.momentWin.hide();
			}
			if (typeof gdc.dlg.momentWin.backFn=="function") gdc.dlg.momentWin.backFn();
		}
	}
	gdc.dlg.momentWin.backFn=backFn;
	gdc.dlg.momentWinEdit.setValue(msg);
	gdc.dlg.momentWin.show();
	setTimeout(gdc.dlg.hideMomentWin,800);
}
