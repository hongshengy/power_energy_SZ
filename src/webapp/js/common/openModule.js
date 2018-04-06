/**
 * <p>Title: 购电侧系统</p>
 * <p>Description: 打开模块页面方法</p>
 * @include "constant.js"
 * @include "constant.js"
 * <p>Copyright: Copyright (c) 2009</p>
 * <p>Company: 江苏方天电力技术有限公司</p>
 */
 
 Ext.namespace("gdc.openModule");
 
 /**
  * 自定义框架 打开页面方法
  * @param {} modulePanel
  * @param {} isUnite
  */
 gdc.openModule.openModule = function(modulePanel,isUnite){
 	//获取参数
 	gdc.openModule.funcId = gdc.openModule.request('funcId');
 	gdc.openModule.roleId = gdc.openModule.request('roleId');
 	//参数检查
 	if(!modulePanel || !isUnite || !gdc.openModule.funcId || !gdc.openModule.roleId){
 		return;
 	}
 	Ext.MessageBox.show({
       title: '请稍后',
       msg: '正在加载...',
       progressText: '初始化中...',
       width:300,
       waitConfig:{interval:35},
       progress:true,
       closable:false,
       wait:true
    });
    
    gdc.currentRoleId = gdc.openModule.roleId;
 	gdc.openModule.panel = modulePanel();
 	gdc.openModule.isUnite = isUnite;
 	
 	
 	//获取功能权限对象
 	var params = {};
 	if(gdc.mdlCfg.isUnite=='merger'){
 		params.funcId = gdc.openModule.funcId;
 		params.unite = 'merger';
 	}else{
 		params.funcId = gdc.openModule.funcId;
 		params.roleId = gdc.currentRoleId;
 	}
 	Ext.Ajax.request({
		url : gdc.webContextRoot + 'sysObject/mergerOrSelectMultiRole.action',
		params : params,
		success : function(result,request) {
			var res = result.responseText;
			gdc.openModule.data = eval(res);
			gdc.openModule.showModulePanel(gdc.openModule.panel,gdc.openModule.data);
			
		}
	});
 }
 
 
  /**	
  * 显示功能PANEL
  * @param {} panel
  * @param {} objData
  */
  gdc.openModule.showModulePanel = function(panel,objData){
  		//显示
	   /* alert(window.parent);
	   alert(window.parent.Ext);*/
	   //鼠标抬起事件
  	    document.onmouseup = function(){parent.Ext.menu.MenuMgr.hideAll()};
  		var viewport=new Ext.Viewport({
	       layout:'fit',
	       items:[panel],
	       listeners:{
	       		render:function(){
	       			Ext.MessageBox.hide();
				}
	       }
		});
		
		gdc.openModule.purviewControlOfButton(panel,objData);
		gdc.openModule.purviewControlOfTabPanel(panel,objData);
 }
 
 
/**
 * 设置页面按钮权限
 * @param {} panel
 */
 gdc.openModule.purviewControlOfButton = function(panel,objData){
 	var btnIds = gdc.getAllBtns(panel);
	  	if(btnIds && btnIds.length>0){
			var btnArray = btnIds.split(',');
			for(var b=0;b<btnArray.length;b++){
				if(Ext.getCmp(btnArray[b]) && Ext.getCmp(btnArray[b]).initialConfig['bizCode']){
					var flag = false;
					if(objData){
						for(var i=0;i<objData.length;i++){
							var bizCode = '';
							if(Ext.getCmp(btnArray[b])){
								bizCode = Ext.getCmp(btnArray[b]).initialConfig['bizCode'];
							}
							if(objData[i].busiCode==bizCode){
								flag = true;
							}
						}
						if(flag==false){
							if(Ext.getCmp(btnArray[b])){
								Ext.getCmp(btnArray[b]).setDisabled(true);
							}
						}
					}else{
						if(Ext.getCmp(btnArray[b])){
							Ext.getCmp(btnArray[b]).setDisabled(true);
						}
					}
				}
			}
		}
 }

/**
 * 对tabpanel做按钮权限控制 (递归查找tabpanel 添加tabchange事件)
 * @param {} panel
 */
gdc.openModule.purviewControlOfTabPanel = function(panel,objData){
	if(panel.getXType()=='tabpanel'){
		panel.on('tabchange',function(tab,newTab,curTab){
			gdc.openModule.purviewControlOfButton(newTab,objData);
		})
	}
	var items = panel.items;
	for(var i=0;i<items.length;i++){
		var obj = items.get(i);
		if(obj.getXType()=='gdc.FormPanel' || obj.getXType()=='formpanel'){
				continue;
		}
		if(obj.getXType()=='tabpanel'){
			obj.on('tabchange',function(tab,newTab,curTab){
				gdc.openModule.purviewControlOfButton(newTab,objData);
			})
		}
		var objItems = obj.items;
		if(objItems){
			gdc.openModule.purviewControlOfTabPanel(obj,objData);
		}
	}
}

/**
 * 获取页面请求参数
 * @param {} paras
 * @return {String}
 */ 
gdc.openModule.request = function(paras){ 
	var url = location.href;   
	var paraString = url.substring(url.indexOf("?")+1,url.length).split("&");   
	var paraObj = {}   
	for (i=0; j=paraString[i]; i++){   
	paraObj[j.substring(0,j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=")+1,j.length);   
	}   
	var returnValue = paraObj[paras.toLowerCase()];   
	if(typeof(returnValue)=="undefined"){   
		return "";   
	}else{   
		return returnValue;   
	}   
} 


 





