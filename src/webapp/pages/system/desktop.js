/**
 * <p>Title: 购电侧系统</p>
 * <p>Description: 桌面框架</p>
 * <p>Copyright: Copyright (c) 2009</p>
 * <p>Company: 江苏方天电力技术有限公司</p>
 */
Ext.namespace("com.frontier.gdc.system.desktop");
/**
 * 桌面
 */
com.frontier.gdc.system.desktop.appframeDesktop = new Ext.app.App({
	init :function(){
		Ext.QuickTips.init();
		//首页
		if(gdc.funcUrl.length>0 && gdc.funcUrl!='null'){
			var menu = {
				id:gdc.funcId,
				text:gdc.funcName,
				url:gdc.funcUrl
			}
			com.frontier.gdc.system.desktop.menuClick(menu);
		}
	},

	getModules : function(){
		return com.frontier.gdc.system.desktop.appframeDesktop.startMenu();
	},

    // config for the start menu
    getStartConfig : function(){
        return {
            title: 'Jack Slocum',
            iconCls: 'user',
            toolItems: [{
                text:'个性化设置',
                iconCls:'userConfig',
                scope:this,
                handler:function() {
                	com.frontier.gdc.system.frameToolbar.individuationSettingWindowAndInit();
                }
            },'-',{
                text:'修改密码',
                iconCls:'changepwd',
                scope:this,
                handler:function() {
                	com.frontier.gdc.system.frameToolbar.updatePasswordWindow.show();
                	//Appframe.delegate();
                }
            },'-',{
                text:'我的首页',
                iconCls:'userConfig',
                scope:this,
                handler:function() {
                	//打开个人首页
					if(gdc.funcUrl.length>0 && gdc.funcUrl!='null'){
						var menu = {
							id:gdc.funcId,
							text:gdc.funcName,
							url:gdc.funcUrl
						}
						com.frontier.gdc.system.desktop.menuClick(menu);
					}
                }
            },'-',{
                text:'系统退出',
                iconCls:'export',
                scope:this,
                handler:function() {
                	window.top.location=gdc.webContextRoot+'systemLogin/loginOut.action';
                	//Appframe.delegate();
                }
            }]
        };
    }
});



/**
 * 创建开始菜单
 */
com.frontier.gdc.system.desktop.appframeDesktop.startMenu = function(){
	var menuArray = [];
	Ext.Ajax.request({
		url : gdc.webContextRoot + 'sysSystem/findSystemByRole.action',
		success : function(result,request) {
			var res = result.responseText;
			var systemList = eval(res);
			if(systemList){
				//添加系统菜单
				for(var i=0;i<systemList.length;i++){
					var m = com.frontier.gdc.system.desktop.appframeDesktop.systemMenu(systemList[i].id,systemList[i].systemName,'');
					menuArray.push(m)
				}
			}
			//常用菜单
			var m = com.frontier.gdc.system.desktop.appframeDesktop.systemMenu('userMenu','常用菜单','');
			menuArray.push(m)
			com.frontier.gdc.system.desktop.appframeDesktop.initModules(menuArray);
		}
	})

}


/**
 * 创建系统菜单
 * @param {} id
 * @param {} text
 * @param {} src
 * @return {}
 */
com.frontier.gdc.system.desktop.appframeDesktop.systemMenu = function(id,text){
	var temMenu = Ext.extend(Ext.app.Module, {
	    id:'p'+id,
	    init : function(){
	        this.launcher = {
	            text: text,
	            iconCls:'icon-grid',
	            handler : this.createWindow,
	            scope: this,
	            menu:{
	            	id:id,
	            	listeners:{
	            		beforeshow:com.frontier.gdc.system.desktop.appframeDesktop.getLowerLevelFunc
	            	},	
	            	items:[
	            		{
		                    text: '正在加载......'
		                }
	            	]
	            }
	        }
	    },
		createWindow : function(src){}
	});
	return new temMenu({text:text});
}


/**
 * 获取并添加下级功能菜单
 * @param {} systemId
 * @param {} nodeId
 */
com.frontier.gdc.system.desktop.appframeDesktop.getLowerLevelFunc = function(menu){
	var submenu=menu.items;
	var item = submenu.items[0];
	//如果已经加载 返回
	if(item && item.text.indexOf('正在加载')==-1){
		return;
	}
	
	var systemId = '';
	var node = '';
	var mid = menu.id+'';
	
	//获取节点id
	var ids = mid.split(',');
	if(ids.length==2){
		systemId = ids[0];
		node = ids[1];
	}else{
		systemId = menu.id;
		node = 0;
	}
	var url = 'sysFunc/findSysFuncTree.action';
	if(menu.id=='userMenu'){
		url = 'sysUserMenu/findUserMenuById.action';
	}
	//获取下级功能菜单
	Ext.Ajax.request({
		url : gdc.webContextRoot + url,
		params : {"systemId" : systemId,"node":node},
		success : function(result,request) {
			//移除临时菜单
			menu.remove(item);
			//添加下级功能菜单
			var res = result.responseText;
			var funcList = eval(res);
			if(funcList){
				for(var i=0;i<funcList.length;i++){
					var leaf = funcList[i].leaf;
					//添加末级功能菜单
					if(leaf){
						var fm = {
							id:funcList[i].id,
		                    text: funcList[i].text,
		                    iconCls:'bogus',
		                    handler : com.frontier.gdc.system.desktop.menuClick,
		                    url:funcList[i].funcUrl,
		                    scope: this
		                }
						menu.add(fm)
						
					}else{
					//添加非末级功能菜单	
						var vm = {
							id:'p'+funcList[i].id,
		                    text: funcList[i].text,
		                    iconCls:'bogus',
		                    url:funcList[i].funcUrl,
		                    scope: this,
		                     menu:{
				            	id:funcList[i].id,
				            	listeners:{
				            		beforeshow:com.frontier.gdc.system.desktop.appframeDesktop.getLowerLevelFunc
				            	},	
				            	items:[
				            		{
					                    text: '正在加载......'
					                }
				            	]
				            }
		                }
						menu.add(vm);
					}
					
				}
			}
		}
	})

}


/**
 * 菜单点击事件 调用的方法
 * @param {} menu
 */
com.frontier.gdc.system.desktop.win = '';
com.frontier.gdc.system.desktop.menuClick = function(menu){
	Ext.Ajax.request({
		url : gdc.webContextRoot + 'systemLogin/sessionCheck.action',
		success : function(result,request) {
			var res = result.responseText;
			//检查session是否超时
			if(res.indexOf('true')>-1){
				
				//获取功能id
				var funcId = 0;
				var ids = (menu.id).split(',');
				if(ids.length==2){
					funcId = ids[1];
				}else{
					funcId = menu.id;
				}
				
				var url = menu.url;
				var desktop = com.frontier.gdc.system.desktop.appframeDesktop.getDesktop();
			    var win = desktop.getWindow('win'+funcId);;
			    
			    if(!win){
			      //检查是否关闭旧功能
			      if(gdc.autoCloseOldFunc=='Y'){
			      	if(com.frontier.gdc.system.desktop.win){
						com.frontier.gdc.system.desktop.win.close();
			      	}
				  }
			      com.frontier.gdc.system.desktop.win = desktop.createWindow({
			            id: 'win'+funcId,
			            title:menu.text,
			            width:740,
			            height:500,
			            html : '<iframe src="'+url+'?funcId='+funcId+'" width="100%" height="100%" frameborder="0" scrolling="auto"></iframe>',
			            iconCls: 'bogus',
			            shim:false,
			            animCollapse:false,
			            constrainHeader:true
			        });
			    }
			    com.frontier.gdc.system.desktop.win.show();
				
			}
		}
	})
	
}







