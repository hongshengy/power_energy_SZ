/**
 * <p>Title: 购电侧系统</p>
 * <p>Description: 界面框架</p>
 * <p>Copyright: Copyright (c) 2009</p>
 * <p>Company: 江苏方天电力技术有限公司</p>
 */
Ext.namespace("com.frontier.gdc.system.erectStyleMain");

/**
 * 创建系统menu button
 */
com.frontier.gdc.system.erectStyleMain.startMenu = function(){
	//系统按钮
	var systemsButton = new Ext.Button({id:'systemButton',text:'',iconCls:'sys',menu:[]});
	//功能面板
	com.frontier.gdc.system.erectStyleMain.funcPanel = new Ext.Panel({
		region : 'center',
		//autoScroll:true,
		border:false,
		layout:'fit',
		tbar:[],
		items:[],
		listeners:{
			render:function(obj){
				com.frontier.gdc.system.erectStyleMain.defalutSystem.fireEvent('click',com.frontier.gdc.system.erectStyleMain.defalutSystem);
			} 
		} 
	});
	
	//菜单panel
	com.frontier.gdc.system.erectStyleMain.menuPanel = new Ext.Panel({
		layout:'border',
        //autoScroll:true,
		region : 'north',
        border:false,
        height:25,
		items:[
			new Ext.Panel({
				region:'west',
				width:35,
				border:false,
				layout:'fit',
				//items:[systemsButton]
				tbar:[
					systemsButton
				]
			}),
			com.frontier.gdc.system.erectStyleMain.funcPanel
		]
	});
	Ext.Ajax.request({
		url : gdc.webContextRoot + 'sysSystem/findSystemByRole.action',
		success : function(result,request) {
			var res = result.responseText;
			var systemList = eval(res);
			if(systemList){
				//添加系统菜单
				for(var i=0;i<systemList.length;i++){
					var m = com.frontier.gdc.system.erectStyleMain.systemMenu(systemList[i].id,systemList[i].systemName,'');
					if(i==0){
						com.frontier.gdc.system.erectStyleMain.defalutSystem = m;
					}
					systemsButton.menu.add(m);
				}
			}
			//常用菜单
			var m = com.frontier.gdc.system.erectStyleMain.systemMenu('userMenu','常用菜单','');
			systemsButton.menu.add(m);
		}
	})
	return com.frontier.gdc.system.erectStyleMain.menuPanel;
}


/**
 * 创建系统menu
 * @param {} id
 * @param {} text
 * @param {} src
 * @return {}
 */
com.frontier.gdc.system.erectStyleMain.systemMenu = function(id,text){
	return new Ext.menu.Item({
		id:'p#'+id,
		text:text,
		listeners:{
    		click:com.frontier.gdc.system.erectStyleMain.getFirstFunc
    	}
	});
}


/**
 * 获取系统一级功能菜单
 * @param {} systemId
 * @param {} nodeId
 */
com.frontier.gdc.system.erectStyleMain.getFirstFunc = function(menu){
	//清空tbar
	if(com.frontier.gdc.system.erectStyleMain.funcPanel.tbar){
		document.getElementById(com.frontier.gdc.system.erectStyleMain.funcPanel.tbar.id).innerHTML='';
	}
	var array = [];
	var moreArray = [];
	var systemId = '';
	var node = '';
	var mid = menu.id+'';
	
	//获取节点id
	var ids = mid.split(',');
	if(ids.length==2){
		systemId = ids[0];
		node = ids[1];
	}else{
		ids = mid.split('#');
		systemId = ids[1];
		node = 0;
	}
	var url = 'sysFunc/findSysFuncTree.action';
	if(menu.id=='p#userMenu'){
		url = 'sysUserMenu/findUserMenuById.action';
	}
	//工具栏button个数（不同分辨率）
	var tbarMenuCount = window.screen.width/128;
	
	//获取下级功能菜单
	Ext.Ajax.request({
		url : gdc.webContextRoot + url,
		params : {"systemId" : systemId,"node":node},
		success : function(result,request) {
			//添加下级功能菜单
			var res = result.responseText;
			var funcList = eval(res);
			if(funcList){
				for(var i=0;i<funcList.length;i++){
					var leaf = funcList[i].leaf;
					//如果按钮个数大于9；前8个直接放在tbar里，剩下的放入更多按钮
					if((i+1)<(tbarMenuCount+1)){
						//直接放入tbar中
						if(leaf){
							//添加末级功能菜单
							var fm = new Ext.Button({
								id:funcList[i].id,
			                    text: funcList[i].text,
			                    iconCls:'VOLT_LEVEL_35kV',
			                    url:funcList[i].funcUrl,
			                    isPop:funcList[i].isPop
			                })
			                fm.on('click',function(){
			                	com.frontier.gdc.system.erectStyleMain.menuClick(this.id+'',this.text,this.url,this.isPop);
			                })
			                array.push(fm);
						}else{
							//添加非末级功能菜单	
							var vm = new Ext.Button({
								id:'p'+funcList[i].id,
			                    text: funcList[i].text,
			                    iconCls:'VOLT_LEVEL_35kV',
			                    url:funcList[i].funcUrl,
			                    scope: this,
			                    menu:{
					            	id:funcList[i].id,
					            	listeners:{
					            		beforeshow:com.frontier.gdc.system.erectStyleMain.getLowerLevelFunc
					            		//,mouseover:com.frontier.gdc.system.erectStyleMain.getLowerLevelFunc
					            	},	
					            	items:[
					            		{
						                    text: '正在加载......'
						                }
					            	]
					            }
			                })
							array.push(vm);
						}
					}else{
						//放入【更多】按钮中
						var vm = null;
						if(leaf){
							vm = new Ext.menu.Item({
								id:funcList[i].id,
			                    text: funcList[i].text,
			                    url:funcList[i].funcUrl,
			                    iconCls:'node_leaf',
			                    scope: this
					        });
					        vm.on('click',function(){
			                	com.frontier.gdc.system.erectStyleMain.menuClick(this.id+'',this.text,this.url,this.isPop);
			                })
						}else{
							vm = new Ext.menu.Item({
								id:funcList[i].id,
			                    text: funcList[i].text,
			                    iconCls:'bogus',
			                    url:funcList[i].funcUrl,
			                    iconCls:'VOLT_LEVEL_35kV',
			                    scope: this,
			                    menu:{
			                    	id:funcList[i].id,
					            	listeners:{
					            		beforeshow:com.frontier.gdc.system.erectStyleMain.getLowerLevelFunc
					            	},	
			                    	items:[
					            		{
						                    text: '正在加载......'
						                }
					            	]
			                    }
					        });
						}
				        moreArray.push(vm);
				        //将【更多】按钮放入tbar
				        if(i==(funcList.length-1)){
				        	var vm = new Ext.Button({
								id:'more',
			                    text: "更多",
			                    //iconCls:'more',
			                    iconCls:'tools_infooverrule',
			                    scope: this,
			                    menu:moreArray
			                });
							array.push(vm);
				        }
					}
				}
			}
//			if(array.length>8){
//				//添加多个工具栏
//				var temArray = [];
//				for(var t=0;t<array.length;t++){
//					temArray.push(array[t]);
//					if(t!=0 && (t+1)%8==0){
//						var temTbar = new Ext.Toolbar({renderTo:com.frontier.gdc.system.erectStyleMain.funcPanel.tbar,items:temArray});
//						temTbar.render(com.frontier.gdc.system.erectStyleMain.funcPanel.tbar);
//						temArray = [];
//						temTbar = null;
//					}
//				}
//			}else{
				var toolBar = new Ext.Toolbar({items:array});
				if(com.frontier.gdc.system.erectStyleMain.funcPanel.tbar){
					toolBar.render(com.frontier.gdc.system.erectStyleMain.funcPanel.tbar);
				}
//			}
		}
	})
}

/**
 * 获取并添加下级功能菜单
 * @param {} systemId
 * @param {} nodeId
 */
com.frontier.gdc.system.erectStyleMain.getLowerLevelFunc = function(menu){
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
						var fm = new Ext.menu.Item({
							id:funcList[i].id,
		                    text: funcList[i].text,
		                    iconCls:'node_leaf',
		                    url:funcList[i].funcUrl,
		                    scope: this
		                })
		                fm.on('click',function(){
		                	com.frontier.gdc.system.erectStyleMain.menuClick(this.id+'',this.text,this.url,this.isPop);
		                })
						menu.add(fm)
						
					}else{
					//添加非末级功能菜单	
						var vm = {
							id:'p'+funcList[i].id,
		                    text: funcList[i].text,
		                    iconCls:'VOLT_LEVEL_35kV',
		                    url:funcList[i].funcUrl,
		                    scope: this,
		                     menu:{
				            	id:funcList[i].id,
				            	listeners:{
				            		beforeshow:com.frontier.gdc.system.erectStyleMain.getLowerLevelFunc
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
 * MENU click事件  方法
 */
var index = 0;
com.frontier.gdc.system.erectStyleMain.menuClick = function(id,text,funcUrl,isPop){
	Ext.Ajax.request({
		url : gdc.webContextRoot + 'systemLogin/sessionCheck.action',
		success : function(result,request) {
			var res = result.responseText;
			//检查session是否超时
			if(res.indexOf('true')>-1){
				
				//获取功能id
				var ids = id.split(',');
				var funcId = '';
				if(ids.length>1){
					funcId = ids[1];
				}else{
					funcId = id
				}
				
				//通过弹出窗口方式打开页面
				if(gdc.popWin=='Y'){
					//打开新功能，是否自动关闭旧功能
					if(gdc.autoCloseOldFunc=='Y'){
						var win = Ext.getCmp(funcId);
						alert(win);
						if(win){
							return;
						}else{
							if(com.frontier.gdc.system.erectStyleMain.window){
								com.frontier.gdc.system.erectStyleMain.window.close();
							}
						}
					}
					com.frontier.gdc.system.erectStyleMain.popWindow(funcId,text,funcUrl,isPop);
				}else{
				//通过tab打开页面
					//是否自动收缩菜单
					var westp = Ext.getCmp('westp');
					if(gdc.shrinkMenu=='Y'){
						westp.collapse();
					}
								
					//判断功能是否已经打开
					var ftab = com.frontier.gdc.system.erectStyleMain.tabs.getItem(funcId);
					if(ftab){
						com.frontier.gdc.system.erectStyleMain.tabs.setActiveTab(ftab);
						return;		
					}
					
					//打开新功能，是否自动关闭旧功能
					if(gdc.autoCloseOldFunc=='Y'){
						if(index>0){
							com.frontier.gdc.system.erectStyleMain.tabs.remove(newTab);
						}
					}
					if(isPop=='Y' ||　isPop=='O'){
						//弹出形式打开(单功能弹出)
						com.frontier.gdc.system.erectStyleMain.popWindow(funcId,text,funcUrl,isPop);
					}else{
						//tab形式打开  创建功能tab
						var sign = '?';
						if(funcUrl.indexOf('?')>-1){
							sign = '&';
						}
						newTab = new Ext.Panel({
							title:text,
					        id:funcId,
					        html:'<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src="'+funcUrl+sign+'funcId='+funcId+'"> </iframe>',
					        closable:true
						})
						com.frontier.gdc.system.erectStyleMain.tabs.add(newTab);
					    com.frontier.gdc.system.erectStyleMain.tabs.setActiveTab(funcId);
					    index++;
					}
				}
				
			}
		}
	})
	
}

/**
 * 弹出窗口方法
 */
com.frontier.gdc.system.erectStyleMain.popWindow = function(funcId,text,url,popClass){
	var sign = '?';
	if(url.indexOf('?')>-1){
		sign = '&';
	}
	if(popClass=='O'){
		//弹出浏览器形式打开
		if(window){
			window.close();
		}
		window.open(url+sign+'funcId='+funcId+'&windowOpen=true','_blank','resizable=yes,status=yes,scrollbars=yes,width=800,height=500');		
	}else{
		//弹出window形式打开
		com.frontier.gdc.system.erectStyleMain.window = Ext.getCmp('w'+funcId);
		if(!com.frontier.gdc.system.erectStyleMain.window){
	      com.frontier.gdc.system.erectStyleMain.window = new Ext.Window({
	            id: 'w'+funcId,
	            title:text,
	            width:740,
	            height:500,
	            html : '<iframe src="'+url+sign+'funcId='+funcId+'" width="100%" height="100%" frameborder="0" scrolling="auto"></iframe>',
	            iconCls: 'bogus',
	            shim:false,
	            animCollapse:false,
	            maximizable:true, 
	            constrainHeader:true
	        });
	    }
	    com.frontier.gdc.system.erectStyleMain.window.show();
	}
}

com.frontier.gdc.system.erectStyleMain.centerPanel = function(){
	var centerPanel = new Ext.Panel({
		region : 'center',
		layout : 'border',
		items:[
			com.frontier.gdc.system.erectStyleMain.startMenu(),
			com.frontier.gdc.system.erectStyleMain.createTabs()
		]
	})
	return centerPanel;
}

/**
 * //中间tab
 * @type 
 */
com.frontier.gdc.system.erectStyleMain.tabs = null;
com.frontier.gdc.system.erectStyleMain.createTabs = function(){
	com.frontier.gdc.system.erectStyleMain.tabs = new Ext.TabPanel({
		region : 'center',
		activeTab: 0,
	    frame:true,
	    enableTabScroll :true,
	    //defaults:{autoHeight: true},
	    items:[
	        com.frontier.gdc.system.erectStyleMain.oftenMenuOfTab(),
	        com.frontier.gdc.system.erectStyleMain.portalOfTab(),
	        //事宜部分
	        com.frontier.gdc.workflow.mattersConcerned.mattersConcernedGrid('notTransact'),
			com.frontier.gdc.workflow.mattersConcerned.mattersConcernedGrid('aleadyTransact'),
			com.frontier.gdc.workflow.mattersConcerned.mattersConcernedGrid('historyTransact')
	    ]
	});
	//首页
	com.frontier.gdc.system.erectStyleMain.myWelcomePage();
	return com.frontier.gdc.system.erectStyleMain.tabs;
}

/**
 * 创建portal
 */
com.frontier.gdc.system.erectStyleMain.portalOfTab = function(){
	var panel = new Ext.Panel({
        id:'portal-panel',
        title:'portal功能',
        layout:'fit',
        autoScroll:true,
        border:false,
        items:new Ext.ux.IFrameComponent({url: gdc.webContextRoot +'pages/portal/portal.jsp'})
    });
 return panel;
}
/**
 * 创建tab常用菜单
 */
com.frontier.gdc.system.erectStyleMain.oftenMenuOfTab = function(){
	var panel = new Ext.Panel({
        id:'main-panel',
        title:'常用工作台',
        //baseCls:'x-plain',
        //bodyStyle : "background-color:inactivecaptiontext;",  
        autoScroll:true,
        layout:'table',
        //layout:'anchor',
        layoutConfig: {columns:10},
        border:false
        //defaults: {frame:true, width:110, height: 120}
    });
    Ext.Ajax.request({
		url : gdc.webContextRoot + 'sysUserMenu/findUserMenuById.action',
		success : function(result,request) {
			var res = result.responseText;
			var menuList = eval(res);
			if(menuList){
				for(var i=0;i<menuList.length;i++){
					var pop = menuList[i].isPop;
					if(pop==''){
						pop = 'N';
					}
					var img = menuList[i].type;
					//如果图标为空，使用默认图标
					if(img.length==0){
						img = 'mpMenu_0_active.png';
					}
					var index = img.lastIndexOf('_');
					var name = img.substring(0,index);
					var temMenu = new Ext.Panel({
						layout:'fit',
						border:false,
						//html:'dddd'
			            html:'<b><center style=\"width:120;padding-bottom:10;padding-top:10;\" ><img id="'+menuList[i].id+'img" src="././images/desktopIco/'+img+'" width="60" height="60" onClick=com.frontier.gdc.system.erectStyleMain.menuClick("'+menuList[i].id+'","'+menuList[i].text+'","'+menuList[i].funcUrl+'","'+pop+'") onMouseOut=com.frontier.gdc.system.erectStyleMain.mouseEvent("'+menuList[i].id+'img","'+img+'") onMouseOver=com.frontier.gdc.system.erectStyleMain.mouseEvent("'+menuList[i].id+'img","'+name+'_hover.png")><br/><font size="2" color="#339999" >'+menuList[i].text+'</font></center></a></b>'
			        });
			        panel.add(temMenu);
				}
			}
			panel.doLayout();
		}
	})
    return panel;
}
/**
 * 图片鼠标事件
 * @param {} id
 * @param {} name
 */
com.frontier.gdc.system.erectStyleMain.mouseEvent = function(id,name){
	document.getElementById(id).src="././images/desktopIco/"+name;
}
/**
 * 打开个人首页
 */
com.frontier.gdc.system.erectStyleMain.myWelcomePage = function(){
	if(gdc.funcUrl.length>0 && gdc.funcUrl!='null'){
		if(gdc.popWin=='Y'){
			com.frontier.gdc.system.erectStyleMain.popWindow(gdc.funcId,gdc.funcName,gdc.funcUrl);
		}else{
		//创建功能tab
			var tab = com.frontier.gdc.system.erectStyleMain.tabs.getItem(gdc.funcId);
			if(!tab){
				tab = new Ext.Panel({
					title:gdc.funcName,
			        id:gdc.funcId,
			        html:'<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src="'+gdc.funcUrl+'?funcId='+gdc.funcId+'"> </iframe>',
			        closable:true
				})
				com.frontier.gdc.system.erectStyleMain.tabs.add(tab);
			}
		    com.frontier.gdc.system.erectStyleMain.tabs.setActiveTab(gdc.funcId);
		}
	}
}

//header隐藏，显示方法
com.frontier.gdc.system.erectStyleMain.collapse = function(){
	if(Ext.getCmp('logo').isVisible()==true){
//        if(gdc.cssId != null && gdc.cssId != '' && gdc.cssId == '2'){
//            document.getElementById('colImg').src = "././images/ds-collapse.gif";
//        }else{
		    document.getElementById('colImg').src = "././images/img/mini-bottom.gif";
//        }
		Ext.getCmp('logo').setVisible(false);
		Ext.getCmp('header').setHeight(27);
		try{
		Ext.getCmp('appPanel').doLayout();
		}catch(e){}
		
		//Ext.getCmp('logo').collapse();
	}else{
//        if(gdc.cssId != null && gdc.cssId != '' && gdc.cssId == '2'){
//            document.getElementById('colImg').src = "././images/ns-collapse.gif";
//        }else{
            document.getElementById('colImg').src = "././images/img/mini-top.gif";
//        }
		Ext.getCmp('logo').setVisible(true);
		Ext.getCmp('header').setHeight(95);
		try{
		Ext.getCmp('appPanel').doLayout();
		}catch(e){}
		
		//Ext.getCmp('logo').expand();
	}
}


com.frontier.gdc.system.erectStyleMain.topHtml="<div class='maintopT'><table width=\"100%\" height=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\"><tr><td align=left class='maintopLeft'></td>"
                        + "<td><table width='100%' border='0' align='left' cellpadding='0' cellspacing='0'>"
                        + "      <tr>"
                        + "       <td width=\"17%\">&nbsp;</td>"
                        + "        <td  title=\"我的首页\" ><a href=\"javascript:com.frontier.gdc.system.erectStyleMain.myWelcomePage();\"  class=\"maintopOne\"  >"
                        + "</a></td>"
                        + "        <td  title=\"个性化设置\"><a href=\"javascript:com.frontier.gdc.system.frameToolbar.individuationSettingWindowAndInit();\" class=\"maintopTwo\"  >"
                        + "</a></td>"
                        + "        <td  title=\"修改密码\"><a href=\"javascript:com.frontier.gdc.system.frameToolbar.updatePasswordWindow.show()\" class=\"maintopThree\"  >"
                        + "</a></td>"
                        + "        <td  title=\"退出\"><a href=\"javascript:window.top.location=gdc.webContextRoot+'systemLogin/loginOut.action'\"  class=\"maintopFour\"  >"
                        + "</a></td>"
                        + "       <td width=\"28%\">&nbsp;</td>"
                        + "      </tr>"
                        + "    </table>"
                        + "</td>"
                        + "<td align=\"right\" class='maintopRight'></td></tr></table></div>";
                        
com.frontier.gdc.system.erectStyleMain.topBottemHtml="<div class=\"layout-toolbar-t\"><div class=\"layout-toolbar-content-t\">"
                        + "<table width=\"100%\" height=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"table-layout:fixed;\">"
                        + "<tr>"
                        + "<td align=right style=\"overflow:hidden;\" nowrap><div id=\"versioninformMarqueeInfo\" style=\"position:relative;left:0;top:0\"></div><img id=\"colImg\" src=\"././images/img/mini-top.gif\" onClick=\"com.frontier.gdc.system.erectStyleMain.collapse()\"></td>"
                        + "<td align=right >"
                        + '<font size=2>'+specialOrgName+'&nbsp;&nbsp;'+userName+'&nbsp;&nbsp;</font>'
                        + "</td>"
                        + "</tr>" + "</table>" + "</div></div>" + "</div>";                         
 
 



com.frontier.gdc.system.erectStyleMain.newMainPanel = function(){
	var panel = new Ext.Panel({
		id:'appPanel',
		layout : 'border',
		border : false,
		items : [{
			region : 'center',
			layout : 'border',
			border : false,
			items : [new Ext.Panel({// 主界面上面部分，系统大图标和当前登录人
				region : 'north',
				split : true,
				collapsible : true,
				id:'header',
				items:[
					new Ext.Panel({
						id:'logo',
						html:com.frontier.gdc.system.erectStyleMain.topHtml
					}),new Ext.Panel({
						html:com.frontier.gdc.system.erectStyleMain.topBottemHtml
					})
				],		
				height : 95,
				border : true
            }),com.frontier.gdc.system.erectStyleMain.centerPanel()]
		}]
	})
	return panel;
}