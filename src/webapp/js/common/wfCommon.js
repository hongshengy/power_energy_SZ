Ext.namespace("gdc.workflow");
/**
 * 查看附件
 */
var tWait = null;
var embIfame = null;

function viewAttachClickButton(resCode, id) {
	var url = gdc.webContextRoot + 'wfCommon/viewAttach.action?resCode=' + resCode + '&tid=' + id;
	
	if (embIfame == null) {
		embIfame = document.createElement('iframe');
		
		document.body.appendChild(embIfame);
		
		embIfame.style.display = 'none';
	}
	
	embIfame.src = url;
	
	tWait = Ext.Msg.wait('正在从服务器获取下载信息', '请稍候');
	
	setTimeout('tWait.hide()', 2000);
}

function closeDownload() {
	tWait.hide();
	
	Appframe.viewinfdlg.error.show("服务器上没有此文件！", false);
}