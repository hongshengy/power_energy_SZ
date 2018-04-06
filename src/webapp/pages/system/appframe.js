/**
 * <p>Title: 购电侧系统</p>
 * <p>Description: 界面框架</p>
 * <p>Copyright: Copyright (c) 2009</p>
 * <p>Company: 江苏方天电力技术有限公司</p>
 */
Ext.namespace("com.frontier.gdc.system.appframe");

/**
 * 创建系统列表
 */
com.frontier.gdc.system.appframe.systemsFunc = function(){
	var westPanel = new Ext.Panel({
		id:'westp',
		region : 'west',
		title: '功能菜单',
		width : 200,
		split : true,
		collapsible : true,
		layout:'accordion',
		layoutConfig : {
			animate : true
		}
	})
	Ext.Ajax.request({
		url : gdc.webContextRoot + 'sysSystem/findSystemByRole.action',
		//params : {"sysSystem" : jsonData},
		success : function(result,request) {
			var res = result.responseText;
			var systemList = eval(res);
			com.frontier.gdc.system.appframe.systemItems(westPanel,systemList);
			westPanel.doLayout();
		}
	})
	return westPanel;
}
/**
 * 添加系统功能树
 * @param {} systemList
 */
com.frontier.gdc.system.appframe.systemItems = function(westPanel,systemList){
	if(systemList){
		for(var i=0;i<systemList.length;i++){
			var tree = com.frontier.gdc.system.appframe.tree(systemList[i].systemName,systemList[i].id);
			westPanel.add(tree);
		}
		var tree = com.frontier.gdc.system.appframe.tree('常用菜单','userMenu');
		westPanel.add(tree);
	}
}

/**
 * 创建系统功能树
 * @type String
 */
com.frontier.gdc.system.appframe.rightClickNode = '';
com.frontier.gdc.system.appframe.tree = function(title,systemId){
	var url = '';
	var id = '';
	//常用菜单
	if(systemId=='userMenu'){
		url = 'sysUserMenu/findUserMenuById.action';
		id = systemId;
	}else{
	//系统功能
		url = 'sysFunc/findSysFuncTree.action';
	}
	var tree = new Ext.tree.TreePanel({
		id:id,
		title:title,
		//region : 'west',
		layout:'fit',
		rootVisible : false,
		autoScroll : true,
		loader : new Ext.tree.TreeLoader({
			dataUrl : gdc.webContextRoot+url,
			listeners:{'beforeload':function(loader,node) {
			    	this.baseParams.systemId = systemId;
			    	if(node.id!=0){
				    	var fid = node.id.split(',');
				    	node.id = fid[1];
			    	}
			    }
			}
		})
		,tools:[{
            id:'refresh',
            handler: function(event, toolEl, panel){
            	panel.getRootNode().reload();
	    	}
        }]
	});
	var root = new Ext.tree.AsyncTreeNode({
		id : '0',
		text : '菜单功能树'
	});
	tree.setRootNode(root);
	
	var newTab = null;
	tree.on('click',function(node){
		if(!node.leaf){
			return;
		}
		com.frontier.gdc.system.appframe.menuClick(node.id,node.text,node.attributes.funcUrl,node.attributes.isPop)
	});
	
	
	// 定义右键菜单   
	var rightClick = new Ext.menu.Menu({   
		id : 'rightClickCont',   
		items : [{   
				id : 'delNode',   
				text : '设置为个人首页',   
	       		handler : function() {
	       			//获取功能id
					var ids =  com.frontier.gdc.system.appframe.rightClickNode.id.split(',');
					var funcId = '';
					if(ids.length>1){
						funcId = ids[1];
					}else{
						funcId = selectedNode.id
					}
	       			       			
	  				Ext.Ajax.request({
						url : gdc.webContextRoot + 'sysUserConfig/configUserFunc.action',
						params : {"funcId" : funcId},
						success : function(result,request) {
							var res = result.responseText;
							var tem = eval('('+res+')');
							if(tem.success==true){
								gdc.funcId = funcId;
								gdc.funcUrl = com.frontier.gdc.system.appframe.rightClickNode.attributes.funcUrl
								gdc.funcName = com.frontier.gdc.system.appframe.rightClickNode.text;
								//window.top.location=gdc.webContextRoot+'/pages/system/appframe.jsp';
								Appframe.viewinfdlg.right.show("设置成功！",true);
							}
						}
					})
				}   
			},{   
				id : 'addUserMenu',   
				text : '加入常用菜单',   
	       		handler : function() {
	       			//获取功能id
					var ids =  com.frontier.gdc.system.appframe.rightClickNode.id.split(',');
					var funcId = '';
					if(ids.length>1){
						funcId = ids[1];
					}else{
						funcId = selectedNode.id
					}
	       			Ext.Ajax.request({
						url : gdc.webContextRoot + 'sysUserMenu/validateRepeat.action',
						params : {"funcId" : funcId},
						success : function(result,request) {
							var res = result.responseText;
							var tem = eval('('+res+')');
							if(tem.success==true){
								if(tem.repeat=='N'){
									Ext.Ajax.request({
										url : gdc.webContextRoot + 'sysUserMenu/insertUserMenu.action',
										params : {"funcId" : funcId},
										success : function(result,request) {
											var res = result.responseText;
											var tem = eval('('+res+')');
											if(tem.success==true){
												var userMenuTree = Ext.getCmp('userMenu');
												var root = userMenuTree.getRootNode();
												root.reload();
												//window.top.location=gdc.webContextRoot+'/pages/system/appframe.jsp';
												Appframe.viewinfdlg.parent.right.show("加入常用菜单成功！",true);
											}
										}
									})
								}else{
									Ext.MessageBox.alert('提示', '已经加入常用菜单!');
								}
							}
						}
					})
					
				}   
			}
		]   
	});  
	
	// 定义右键菜单   
	var userMenuRightClick = new Ext.menu.Menu({   
		id : 'rightClickCont',   
		items : [{   
				id : 'delNode',   
				text : '设置为个人首页',   
	       		handler : function() {
	       			//获取功能id
	       			var funcId =  com.frontier.gdc.system.appframe.rightClickNode.id;
					   			
	  				Ext.Ajax.request({
						url : gdc.webContextRoot + 'sysUserConfig/configUserFunc.action',
						params : {"funcId" : funcId},
						success : function(result,request) {
							var res = result.responseText;
							var tem = eval('('+res+')');
							if(tem.success==true){
								//window.top.location=gdc.webContextRoot+'/pages/system/appframe.jsp';
								Appframe.viewinfdlg.right.show("设置成功！",true);
							}
						}
					})
				}   
			},{   
				id : 'deleteMenu',   
				text : '删除',   
	       		handler : function() {
	       			//获取功能id
	       			
					var funcId =  com.frontier.gdc.system.appframe.rightClickNode.id;
								
	  				Ext.Ajax.request({
						url : gdc.webContextRoot + 'sysUserMenu/deleteUserMenu.action',
						params : {"funcId" : funcId},
						success : function(result,request) {
							var res = result.responseText;	
							var tem = eval('('+res+')');
							if(tem.success==true){
								var userMenuTree = Ext.getCmp('userMenu');
								var root = userMenuTree.getRootNode();
								root.reload();
								//window.top.location=gdc.webContextRoot+'/pages/system/appframe.jsp';
								Appframe.viewinfdlg.parent.right.show("删除常用菜单成功！",true);
							}
						}
					})
				}   
			}
		]   
	});  
	
	 // 增加右键弹出事件   
	tree.on('contextmenu', function(node, event) {// 声明菜单类型   
		if(!node.leaf){
			return;
		}
		com.frontier.gdc.system.appframe.rightClickNode = node;
    	event.preventDefault();// 这行是必须的，使用preventDefault方法可防止浏览器的默认事件操作发生。   
	    node.select();   
	    // 取得鼠标点击坐标，展示菜单   
    	if(tree.id=='userMenu'){
    		userMenuRightClick.showAt(event.getXY());
    	}else{
    		rightClick.showAt(event.getXY());
    	}
    	
   });   
	
	return tree;
}

/**
 * 树节点click事件  方法
 */
var index = 0;
com.frontier.gdc.system.appframe.menuClick = function(id,text,funcUrl,isPop){
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
						if(win){
							return;
						}else{
							if(com.frontier.gdc.system.appframe.window){
								com.frontier.gdc.system.appframe.window.close();
							}
						}
					}
					com.frontier.gdc.system.appframe.popWindow(funcId,text,funcUrl,isPop);
				}else{
				//通过tab打开页面
					//是否自动收缩菜单
					var westp = Ext.getCmp('westp');
					if(gdc.shrinkMenu=='Y'){
						westp.collapse();
					}
								
					//判断功能是否已经打开
					var ftab = com.frontier.gdc.system.appframe.tabs.getItem(funcId);
					if(ftab){
						com.frontier.gdc.system.appframe.tabs.setActiveTab(ftab);
						return;		
					}
					
					//打开新功能，是否自动关闭旧功能
					if(gdc.autoCloseOldFunc=='Y'){
						if(index>0){
							com.frontier.gdc.system.appframe.tabs.remove(newTab);
						}
					}
					if(isPop=='Y' ||　isPop=='O'){
						//弹出形式打开(单功能弹出)
						com.frontier.gdc.system.appframe.popWindow(funcId,text,funcUrl,isPop);
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
						com.frontier.gdc.system.appframe.tabs.add(newTab);
					    com.frontier.gdc.system.appframe.tabs.setActiveTab(funcId);
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
com.frontier.gdc.system.appframe.window = null;
com.frontier.gdc.system.appframe.popWindow = function(funcId,text,url,popClass){
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
		com.frontier.gdc.system.appframe.window = Ext.getCmp(funcId);
	    if(!com.frontier.gdc.system.appframe.window){
	      com.frontier.gdc.system.appframe.window = new Ext.Window({
	            id: funcId,
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
	    com.frontier.gdc.system.appframe.window.show();
	}
}


/**
 * //中间tab
 * @type 
 */
com.frontier.gdc.system.appframe.tabs = null;
com.frontier.gdc.system.appframe.createTabs = function(){
	com.frontier.gdc.system.appframe.tabs = new Ext.TabPanel({
		region : 'center',
		activeTab: 0,
	    frame:true,
	    enableTabScroll :true,
	    //defaults:{autoHeight: true},
	    items:[
	        com.frontier.gdc.system.appframe.oftenMenuOfTab(),
	        com.frontier.gdc.system.appframe.portalOfTab(),
	        //事宜部分
	        com.frontier.gdc.workflow.mattersConcerned.mattersConcernedGrid('notTransact'),
			com.frontier.gdc.workflow.mattersConcerned.mattersConcernedGrid('aleadyTransact'),
			com.frontier.gdc.workflow.mattersConcerned.mattersConcernedGrid('historyTransact')
	    ]
	});
	//首页
	com.frontier.gdc.system.appframe.myWelcomePage();
	return com.frontier.gdc.system.appframe.tabs;
}

/**
 * 创建portal
 */
com.frontier.gdc.system.appframe.portalOfTab = function(){
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
com.frontier.gdc.system.appframe.oftenMenuOfTab = function(){
	var panel = new Ext.Panel({
        id:'main-panel',
        title:'常用工作台',
        //baseCls:'x-plain',
        //bodyStyle : "background-color:inactivecaptiontext;",  
        autoScroll:true,
        layout:'table',
        //layout:'anchor',
        layoutConfig: {columns:8},
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
			            html:'<b><center style=\"width:120;padding-bottom:10;padding-top:10;\" ><img id="'+menuList[i].id+'img" src="././images/desktopIco/'+img+'" width="60" height="60" onClick=com.frontier.gdc.system.appframe.menuClick("'+menuList[i].id+'","'+menuList[i].text+'","'+menuList[i].funcUrl+'","'+pop+'") onMouseOut=com.frontier.gdc.system.appframe.mouseEvent("'+menuList[i].id+'img","'+img+'") onMouseOver=com.frontier.gdc.system.appframe.mouseEvent("'+menuList[i].id+'img","'+name+'_hover.png")><br/><font style="font-size:14px;font-weight:bold" color="#339999" >'+menuList[i].text+'</font></center></a></b>'
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
com.frontier.gdc.system.appframe.mouseEvent = function(id,name){
	document.getElementById(id).src="././images/desktopIco/"+name;
}
/**
 * 打开个人首页
 */
com.frontier.gdc.system.appframe.myWelcomePage = function(){
	if(gdc.funcUrl.length>0 && gdc.funcUrl!='null'){
		if(gdc.popWin=='Y'){
			com.frontier.gdc.system.appframe.popWindow(gdc.funcId,gdc.funcName,gdc.funcUrl);
		}else{
		//创建功能tab
			var tab = com.frontier.gdc.system.appframe.tabs.getItem(gdc.funcId);
			if(!tab){
				tab = new Ext.Panel({
					title:gdc.funcName,
			        id:gdc.funcId,
			        html:'<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src="'+gdc.funcUrl+'?funcId='+gdc.funcId+'"> </iframe>',
			        closable:true
				})
				com.frontier.gdc.system.appframe.tabs.add(tab);
			}
		    com.frontier.gdc.system.appframe.tabs.setActiveTab(gdc.funcId);
		}
	}
}

//Ext.onReady(function() {
//	Ext.QuickTips.init();	
//	// 界面构造
//	var viewport = new Ext.Viewport({
//		layout : 'border',
//		items : [{
//			region : 'center',
//			layout : 'border',
//			border : false,
//			items : [{// 主界面上面部分，系统大图标和当前登录人
//				region : 'north',
//				html : // "<div
//				// class=\"userinfo\">当前登录人："+Appframe_currentUserName+"</div>"
//				"<div><div class='maintop'><table width=\"100%\" height=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\"><tr><td align=left><img src=\"images/img/self-logo.jpg\" width=\"329\" height=\"65\"></td>"
//						+ "<td width='25%'><table width='100%' border='0' align='right' cellpadding='0' cellspacing='0'>"
//						+ "      <tr>"
//						+ "		  <td width=\"9%\">&nbsp;</td>"
//						+ "        <td width=\"13%\" title=\"我的首页\"><img src=\""
//						+ gdc.webContextRoot
//						+ "images/img/menu_08.gif\" name=\"Image11\" width=\"42\" height=\"65\" border=\"0\"></td>"
//						+ "        <td width=\"13%\" title=\"个性化设置\"><img src=\""
//						+ gdc.webContextRoot
//						+ "images/img/menu_07.gif\" name=\"Image0\" width=\"42\" height=\"65\" border=\"0\" onclick=\"com.frontier.gdc.system.frameToolbar.individuationSettingWindowAndInit()\"></td>"
//						+ "        <td width=\"13%\" title=\"委托\" ><img src=\""
//						+ gdc.webContextRoot
//						+ "images/img/menu_03.gif\" name=\"Image1\" width=\"42\" height=\"65\" border=\"0\"></td>"
//						+ "        <td width=\"13%\" title=\"修改密码\"><img src=\""
//						+ gdc.webContextRoot
//						+ "images/img/menu_06.gif\" name=\"Image9\" width=\"42\" height=\"65\" border=\"0\" onclick=\"com.frontier.gdc.system.frameToolbar.updatePasswordWindow.show()\"></td>"
//						+ "        <td width=\"13%\" title=\"帮助\"><img src=\""
//						+ gdc.webContextRoot
//						+ "images/img/menu_05.gif\" name=\"Image8\" width=\"42\" height=\"65\" border=\"0\"></td>"
//						+ "        <td width=\"13%\" title=\"退出\"><img src=\""
//						+ gdc.webContextRoot
//						+ "images/img/menu_04.gif\" name=\"Image7\" width=\"41\" height=\"65\" border=\"0\"></img></td>"
//						+ "        <td width=\"13%\" title=\"查询任务\"><img src=\""
//						+ gdc.webContextRoot
//						+ "images/img/menu_rw.gif\" name=\"Image10\" width=\"42\" height=\"65\" border=\"0\"></td>"
//						+ "      </tr>"
//						+ "    </table>"
//						+ "</td>"
//						+ "<td align=\"right\"><img src=\"images/img/global-logo.gif\" width=\"336\" height=\"65\"></td></tr></table></div>"
//						+ "<div id=\"layout-toolbar\"><div id=\"layout-toolbar-content\">"
//						+ "<table width=\"100%\" height=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"table-layout:fixed;\">"
//						+ "<tr>"
//						+ "<td align=left style=\"overflow:hidden;\" nowrap><div id=\"versioninformMarqueeInfo\" style=\"position:relative;left:0;top:0\"></div></td>"
//						+ "<td align=right width=\"300\">"
//						+ '<font size=2>'+loginName+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</font>'
//						+ "</td>"
//						+ "</tr>" + "</table>" + "</div></div>" + "</div>",
//				height : 95,
//				border : true
//			},com.frontier.gdc.system.appframe.systemsFunc(),com.frontier.gdc.system.appframe.tabs]
//		}]
//	});
//	
//});

//header隐藏，显示方法
com.frontier.gdc.system.appframe.collapse = function(){
	if(Ext.getCmp('logo').isVisible()==true){
//        if(gdc.cssId != null && gdc.cssId != '' && gdc.cssId == '2'){
//            document.getElementById('colImg').src = "././images/ds-collapse.gif";
//        }else{
		    document.getElementById('colImg').src = "././images/img/mini-bottom.gif";
//        }
		Ext.getCmp('header').setHeight(27);
		Ext.getCmp('appPanel').doLayout();
		Ext.getCmp('logo').setVisible(false);
		//Ext.getCmp('logo').collapse();
	}else{
//        if(gdc.cssId != null && gdc.cssId != '' && gdc.cssId == '2'){
//            document.getElementById('colImg').src = "././images/ns-collapse.gif";
//        }else{
            document.getElementById('colImg').src = "././images/img/mini-top.gif";
//        }
		
		Ext.getCmp('header').setHeight(95);
		Ext.getCmp('appPanel').doLayout();
		Ext.getCmp('logo').setVisible(true);
		//Ext.getCmp('logo').expand();
	}
}


com.frontier.gdc.system.appframe.topHtml="<div class='maintopT'><table width=\"100%\" height=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\"><tr><td align=left class='maintopLeft'></td>"
                        + "<td><table width='100%' border='0' align='left' cellpadding='0' cellspacing='0'>"
                        + "<tr>"
                        + "<td width=\"17%\">&nbsp;</td>"
                        + "<td  title=\"我的首页\" ><a href=\"javascript:com.frontier.gdc.system.appframe.myWelcomePage();\"  class=\"maintopOne\"  >"
                        + "</a></td>"
                        + "<td  title=\"个性化设置\"><a href=\"javascript:com.frontier.gdc.system.frameToolbar.individuationSettingWindowAndInit();\" class=\"maintopTwo\"  >"
                        + "</a></td>"
                        + "<td  title=\"修改密码\"><a href=\"javascript:com.frontier.gdc.system.frameToolbar.updatePasswordWindow.show()\" class=\"maintopThree\"  >"
                        + "</a></td>"
                        + "<td  title=\"退出\"><a href=\"javascript:window.top.location=gdc.webContextRoot+'systemLogin/loginOut.action'\"  class=\"maintopFour\"  >"
                        + "</a></td>"
                        //+ "<td  title=\"查询任务\"><a href=\"javascript:com.frontier.gdc.system.frameToolbar.taskSel()\" class=\"maintopFour\"   >" 
                        //+"</a></td>"
                        + "<td width=\"28%\">&nbsp;</td>"
                        + "</tr>"
                        + "</table>"
                        + "</td>"
                        + "<td align=\"right\" class='maintopRight'></td></tr></table></div>";
                        
com.frontier.gdc.system.appframe.topBottemHtml="<div class=\"layout-toolbar-t\"><div class=\"layout-toolbar-content-t\">"
                        + "<table width=\"100%\" height=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"table-layout:fixed;\">"
                        + "<tr>"
                        + "<td align=right style=\"overflow:hidden;\" nowrap><div id=\"versioninformMarqueeInfo\" style=\"position:relative;left:0;top:0\"></div><img id=\"colImg\" src=\"././images/img/mini-top.gif\" onClick=\"com.frontier.gdc.system.appframe.collapse()\"></td>"
                        + "<td align=right >"
                        + '<font style="font-size:12px">'+specialOrgName+'&nbsp;&nbsp;'+userName+'&nbsp;&nbsp;</font>'
                        + "</td>"
                        + "</tr>" + "</table>" + "</div></div>" + "</div>";                         
 
 



com.frontier.gdc.system.appframe.newMainPanel = function(){
	var panel = new Ext.Viewport({
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
						html:com.frontier.gdc.system.appframe.topHtml
					}),new Ext.Panel({
						html:com.frontier.gdc.system.appframe.topBottemHtml
					})
				],		
				height : 95,
				border : true
            }),com.frontier.gdc.system.appframe.systemsFunc(),com.frontier.gdc.system.appframe.createTabs()]
		}]
	})
	return panel;
}