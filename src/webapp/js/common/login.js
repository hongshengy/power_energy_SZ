/**
 * <p>Title: 购电侧系统</p>
 * <p>Description: 购电侧系统 登录相关，用与Ext的AJAX请求，登录后可以自动发起上次请求</p>
 * <p>Copyright: Copyright (c) 2009</p>
 * <p>Company: 江苏方天电力技术有限公司</p>
 */
Ext.namespace("gdc.login");
/**
 * Ext包装的登录的窗口
 * @type {Ext.Window}
 */
gdc.login.loginWin=null;
/**
 * 上次请求的参数
 * @type {Object}
 */
gdc.login.reqOption=null;
/**
 * 在Window中打开单点登录页面
 * @param {Object} option 上次请求的参数
 * @param {String} ssoUrl 单点登录地址
 */
gdc.login.showLoginPage=function(option,ssoUrl){
	gdc.login.reqOption=option;
	var surl=window.location.protocol+"//"+window.location.host+gdc.webContextRoot+"/ssoOk.action"
	surl=ssoUrl+"?TRAGEURL="+encodeURIComponent(surl);
	var loginWin=new Ext.Window({
		title:'登录',
		width:750,
		height:460,
		closable:true,
		modal:true,
		layout:'fit',
		items:[
			new Ext.ux.IFrameComponent({ url: surl })
		]
	});
	gdc.login.loginWin=loginWin;
	loginWin.show();
}
/**
 * 关闭当前登录Window，并重新发起上次请求
 */
gdc.login.closeLoginPage=function(){
	gdc.login.loginWin.close();
	if (typeof gdc.login.reqOption=="object"){
		Ext.Ajax.request(gdc.login.reqOption);
	}
}