/**
 * <p>Title: 购电侧系统</p>
 * <p>Description: 界面框架</p>
 * <p>Copyright: Copyright (c) 2009</p>
 * <p>Company: 江苏方天电力技术有限公司</p>
 */
Ext.namespace("com.frontier.gdc.system.frameToolbar");
//*******************************************个性化设置****************************************************
//css store
com.frontier.gdc.system.frameToolbar.dataCssStore=new Ext.data.Store({
	proxy:new Ext.data.HttpProxy({
		timeout : 300000,
		url:gdc.webContextRoot+'/sysCss/loadCssComboBox.action'
	}),
	reader: new Ext.data.JsonReader({
		totalProperty:"totalPorperty",
		root:"result",
		fields:[{name: 'name'},{name: 'code'}]
	}),
	listeners:{
		load:function(){
			Ext.getCmp('cssId').setValue(gdc.cssId);
		}
	}
});

//个性化设置panel						
com.frontier.gdc.system.frameToolbar.individuationSettingPanel = new Ext.Panel({
	border:false,
	bodyStyle : 'padding:5px 5px 5px 5px',
	items:[
		new Ext.form.Checkbox({
            boxLabel : '登录后隐藏浏览器菜单及工具栏（必须允许弹出窗口）',
            hideLabel : true,
            id:'hideMenu',
            inputValue:'Y',
            name: 'hideMenu'
        }),
        new Ext.Panel({
         	title:'系统界面',
         	columnWidth : 1,
			layout : 'column',
			border : false,
			items:[
				{
					columnWidth : .4,
					border : false,
					items:[
						{
				            xtype: 'radiogroup',
				            //fieldLabel: '权限',
				            id:'interfaceStyleRadioGroup',
				            items: [
				                {boxLabel: '桌面', name: 'interfaceStyle', inputValue: 'D'
					                 ,listeners:{
									    'check':function(cm,checked) {
									    	if(checked==true){
									    		var img =  document.getElementById('img');
                                                
									    		img.className="setCenterImgDesktop";
									    		var popWin = Ext.getCmp('popWin');
									    		var shrinkMenu = Ext.getCmp('shrinkMenu')
									    		popWin.setValue(false);
									    		shrinkMenu.setValue(false);
									    		popWin.setDisabled(true);
									    		shrinkMenu.setDisabled(true);
									    	}
									    	
									    }
									}
				                },
				                {boxLabel: '分页', name: 'interfaceStyle', inputValue: 'T',checked:true
				                	,listeners:{
									    'check':function(cm,checked) {
									    	if(checked==true){
										    	var img = document.getElementById('img');
										    	img.className="setCenterImgTab";
										    	var popWin = Ext.getCmp('popWin');
									    		var shrinkMenu = Ext.getCmp('shrinkMenu')
									    		popWin.setDisabled(false);
									    		shrinkMenu.setDisabled(false);
									    	}
									    	
									    }
									}
				                },
				                {boxLabel: '纵向', name: 'interfaceStyle', inputValue: 'E'
				                	,listeners:{
									    'check':function(cm,checked) {
									    	if(checked==true){
										    	var img = document.getElementById('img');
										    	img.className="setCenterImgTab";
										    	var popWin = Ext.getCmp('popWin');
									    		var shrinkMenu = Ext.getCmp('shrinkMenu')
									    		popWin.setDisabled(false);
									    		shrinkMenu.setDisabled(true);
									    	}
									    	
									    }
									}
				                }
				            ]
				         }
					]
				},
				{
					columnWidth : .2,
					border : false,
					items:[
						new Ext.form.Checkbox({
				            boxLabel : '弹出窗口',
				            //itemCls:'required',
							hideLabel : true,
				            anchor:'95%',
				            id:'popWin',
				            name: 'popWin',
				            listeners:{
							    'check':function(cm,checked) {
							    	var shrinkMenu = Ext.getCmp('shrinkMenu')
							    	var img =  document.getElementById('img');
								    if(checked==true){
								    	img.className="setCenterImgDeskTabPop";
								    	shrinkMenu.setValue(false);
							    		shrinkMenu.setDisabled(true);
							    	}else{
							    		img.className="setCenterImgTab";
							    		shrinkMenu.setDisabled(false);
							    	}
							    }
							}
				        })
					]
				},
				{
					columnWidth : .3,
					layout : 'form',
					border : false,
					items:[
						new Ext.form.Checkbox({
				            boxLabel : '菜单自动收缩',
				            hideLabel : true,
				            anchor:'95%',
				            id:'shrinkMenu',
				            name: 'shrinkMenu',
                            listeners:{
                                'check':function(cm,checked) {
                                    var popWin = Ext.getCmp('popWin')
                                    var img =  document.getElementById('img');
                                    if(checked==true){
                                        img.className="setCenterImgTabCollapse";
                                        popWin.setValue(false);
                                        popWin.setDisabled(true);
                                    }else{
                                        img.className="setCenterImgTab";
                                        popWin.setDisabled(false);
                                    }
                                }
                            }
				        })
					]
				}
			]
         }),
         new Ext.form.Checkbox({
            boxLabel : '打开新功能时，自动关闭原先功能',
            hideLabel : true,
            anchor:'95%',
            id:'closeOld',
            name: 'closeOld'
        }),
        new Ext.Panel({
        	html:'<table width=\"341\" heigth=\"202\"><tr width=\"100%\" heigth=\"100%\"><td id=\"img\" ></td></tr></table>'        
        }),
         new Ext.Panel({
         	title:'个人首页',
         	border:false,
         	bodyStyle : 'padding:5px 5px 5px 5px',
         	items:[
         		new Ext.form.ComboBox({
         				id:'funcId',
         				width:340,
						fieldLabel : '个人首页',
						hiddenName : 'func',
						triggerAction:'all',
						store:new Ext.data.SimpleStore({
							fields: ['val','tex'],
							data: [
								  	[null,' ']
								  ]
						}),
						valueField:'val',
						displayField:'tex',
						mode:'local',
						forceSelection:true,
						allowBlank:false,
						resizable:true,
						editable:false,
						autoCreate:true
				})
         	]
         }),
         new Ext.Panel({
         	title:'CSS样式设置',
         	border:false,
         	bodyStyle : 'padding:5px 5px 5px 5px',
         	items:[
         		new Ext.form.ComboBox({
         				id:'cssId',
         				width:340,
						fieldLabel : 'CSS样式设置',
						hiddenName : 'css',
						triggerAction:'all',
						store:com.frontier.gdc.system.frameToolbar.dataCssStore,
						valueField:'code',
						displayField:'name',
						mode:'local',
						emptyText:'请选择',
						forceSelection:true,
						resizable:true
				})
		]
	})]
})

//个性化设置window
com.frontier.gdc.system.frameToolbar.individuationSettingWindow = null;
com.frontier.gdc.system.frameToolbar.individuationSettingWindowAndInit = function(){
	
	if(!com.frontier.gdc.system.frameToolbar.individuationSettingWindow){
		com.frontier.gdc.system.frameToolbar.individuationSettingWindow = new Ext.Window( {
			title : '个性化设置',
			width : 400,
			height : 500,
			closeAction : 'hide',
			plain : true,
			modal:true,
			layout : 'fit',
			
			items :com.frontier.gdc.system.frameToolbar.individuationSettingPanel,
			buttons:[
				{
					text:'确定',
					handler:function(){
						com.frontier.gdc.system.frameToolbar.individuationSettingSubmit();
					}
				},
				{
					text:'取消',
					handler:function(){
						com.frontier.gdc.system.frameToolbar.individuationSettingWindow.hide();
					}
				}
			],
			listeners:{
				show:function(){
					com.frontier.gdc.system.frameToolbar.dataCssStore.load();
				}
			}
		});
	}
	com.frontier.gdc.system.frameToolbar.individuationSettingWindow.show();
	
	//回写
    var img =  document.getElementById('img');
	if(gdc.hideBrowserMenu=='Y'){
		Ext.getCmp('hideMenu').setValue(true);
	}
	if(gdc.popWin=='Y'){
		Ext.getCmp('popWin').setValue(true);
        img.className='setCenterImgDeskTabPop';
	}
	if(gdc.shrinkMenu=='Y'){
		Ext.getCmp('shrinkMenu').setValue(true);
        img.className="setCenterImgTabCollapse";
	}
	if(gdc.autoCloseOldFunc=='Y'){
		Ext.getCmp('closeOld').setValue(true);
	}
	
	var data = [
		['null','请选择']
	]
	if(gdc.funcId!='null'){
		data.push([gdc.funcId,gdc.funcName])
	}
	Ext.getCmp('funcId').store.loadData(data);
	Ext.getCmp('funcId').setValue(gdc.funcId);

	if(gdc.cssId!='null'){
		Ext.getCmp('cssId').setValue(gdc.cssId);	
	}
	Ext.getCmp('cssId').value=gdc.cssId;
	var interfaceStyleItems = Ext.getCmp('interfaceStyleRadioGroup').items;
	if(interfaceStyleItems){
		for(var i=0;i<interfaceStyleItems.length;i++){
			if(interfaceStyleItems.get(i).inputValue==gdc.interfaceStyle){
				interfaceStyleItems.get(i).setValue(true);
                if(gdc.interfaceStyle=='T' && gdc.popWin=='N' && gdc.shrinkMenu=='N' ){
                       img.className="setCenterImgTab";
                }else if(gdc.interfaceStyle=='D'){
                    img.className="setCenterImgDesktop";
                }
			}else{
				interfaceStyleItems.get(i).setValue(false);
			}
			
		}
	}
	
	
}

//个性化设置提交
com.frontier.gdc.system.frameToolbar.individuationSettingSubmit= function(){
	var hideMenu = Ext.getCmp('hideMenu').getValue();
	var interfaceStyleItems = Ext.getCmp('interfaceStyleRadioGroup').items;
	var popWin = Ext.getCmp('popWin').getValue();
	var shrinkMenu = Ext.getCmp('shrinkMenu').getValue();
	var closeOld = Ext.getCmp('closeOld').getValue();
	var funcId = Ext.getCmp('funcId').getValue();
	var cssId = Ext.getCmp('cssId').getValue();
	
	var interfaceStyle = '';
	if(interfaceStyleItems){
		for(var i=0;i<interfaceStyleItems.length;i++){
			if(interfaceStyleItems.get(i).checked==true){
				interfaceStyle = interfaceStyleItems.get(i).inputValue
			}
		}
	}
	if(!hideMenu){
		hideMenu = 'N';
	}else{
		hideMenu = 'Y';
	}
	if(!popWin){
		popWin = 'N';
	}else{
		popWin = 'Y';
	}
	if(!shrinkMenu){
		shrinkMenu = 'N';
	}else{
		shrinkMenu = 'Y';
	}
	if(!closeOld){
		closeOld = 'N';
	}else{
		closeOld = 'Y';
	}
	json = '[{hideMenu:"'+hideMenu+'",'+'interfaceStyle:"'+interfaceStyle+'",'+'popWin:"'+popWin+'",'+'shrinkMenu:"'+shrinkMenu+'",'+'closeOld:"'+closeOld+'",'+'funcId:"'+funcId+'",'+'cssId:"'+cssId+'"}]';

	Ext.Ajax.request({
		url : gdc.webContextRoot + 'sysUserConfig/saveSysUserConfig.action',
		params : {"configResult" : json},
		success : function(result,request) {
			var res = result.responseText;
			var tem = eval('('+res+')');
			if(tem.success==true){
				com.frontier.gdc.system.frameToolbar.individuationSettingWindow.hide();
				window.top.location=gdc.webContextRoot+'/pages/system/appframe.jsp';
			}
		}
	});
	
}

//************************************************密码修改***********************************************
//密码修改form
com.frontier.gdc.system.frameToolbar.updateUasswodForm = new gdc.FormPanel({
	labelWidth : 100,
	frame : true,
	labelAlign : 'right',
	bodyStyle : 'padding:5px 5px 0',
	items:[
		new Ext.form.TextField({
	    	 fieldLabel : '旧密码',
			 name : 'oldPassword',
			 allowBlank:false,
			 maxLength : 30,
			 maxLengthText : "输入的字符不能超过30位",
			 //minLength : 8,
			 //minLengthText  : "输入的字符不能低于8位",
			 inputType  : 'password',
			 width:200
	    }),new Ext.form.TextField({
	    	 id:'newPassword',
	    	 fieldLabel : '新密码',
			 name : 'newPassword',
			  allowBlank:false,
			  inputType  : 'password',
			 maxLength : 30,
			 maxLengthText : "输入的字符不能超过30位",
			 //minLength : 8,
			 //minLengthText  : "输入的字符不能低于8位",		
			 //regex : /(?=^.{8,30}$)(?=(.*\d){1,})(?=(.*\W){1,})(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,}).*/,
			 //regexText : "密码必须含有数字+符号(!@#$%^&*)+小写字母+大写字母组合方式",	 		 
			 width:200
	    }),new Ext.form.TextField({
	    	 id:'sureNewPassword',
	    	 fieldLabel : '确认新密码',
			 name : 'sureNewPassword',
			 allowBlank:false,
			 maxLength : 30,
			 inputType  : 'password',
			 maxLengthText : "输入的字符不能超过30位",
			// minLength : 8,
			 //minLengthText  : "输入的字符不能低于8位",		
			 //regex : /(?=^.{8,30}$)(?=(.*\d){1,})(?=(.*\W){1,})(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,}).*/,
			 //regexText : "密码必须含有数字+符号(!@#$%^&*)+小写字母+大写字母组合方式",			 
			 width:200
	    }),new Ext.form.DateField({
				fieldLabel : '密码有效期',
				width : 200,
				format:'Y-m-d',
				name : 'passwordDate',
				id: 'passwordDate',
				allowBlank : false
			})
	]
});


//密码修改窗口
com.frontier.gdc.system.frameToolbar.updatePasswordWindow = new Ext.Window( {
	title : '密码修改',
	layout : 'fit',
    width : 350,
	height : 200,
	closeAction : 'hide',
	plain : true,
	modal:true,
	listeners : {
		"beforehide" : function() {
				com.frontier.gdc.system.frameToolbar.updateUasswodForm.form.reset();
		}
    },
	tbar: [{
		text : '保存',
		iconCls: 'add',
		handler : function() {
			if (com.frontier.gdc.system.frameToolbar.updateUasswodForm.form.isValid(com.frontier.gdc.system.frameToolbar.updateUasswodForm)) {
				//检查输入的两次新密码是否相同
				var newPassword = Ext.getCmp('newPassword').getValue();
				var sureNewPassword = Ext.getCmp('sureNewPassword').getValue();
				//密码要求8位以上的数字和字母的组合
				var regPass = "^[0-9a-zA-Z]|\W{8,30}$";
				var regPass1 = "[0-9]{1,}";
				var regPass2 = "[a-zA-Z]{1,}";
				var r = newPassword.match(regPass);
				var returnValue = false;
				if(r){
					if(newPassword.match(regPass1) && newPassword.match(regPass2)){
						returnValue = true;
					}else{
						returnValue = false;
					}
					
				}else{
					returnValue = false;
				}
				if(!returnValue){
					Ext.MessageBox.alert('提示', '请输入8位以上的数字和字母的组合(可包含特殊字符)!');
					return;
				}
	
				
				if(newPassword!=sureNewPassword){
					Ext.MessageBox.alert('提示', '新密码与确认新密码不一致!');
					return;
				}
				
				com.frontier.gdc.system.frameToolbar.updateUasswodForm.form.submit( {
		            url : gdc.webContextRoot+'systemLogin/updatePassword.action',
		            success : function(from, action) {
		            	com.frontier.gdc.system.frameToolbar.updatePasswordWindow.hide();
		               	Appframe.viewinfdlg.parent.right.show("修改密码成功！",true);
		            },failure : function(form, action) {
		               //Appframe.viewinfdlg.error.show("修改密码失败！");
		            },
		            waitMsg : '正在保存数据，稍后...'
		        });
		    }
		}
	}
	],
	items :com.frontier.gdc.system.frameToolbar.updateUasswodForm
	
});

//************************************************任务查询***********************************************
//任务查询方法
com.frontier.gdc.system.frameToolbar.taskSel = function(){
	var taskSelWindow = new Ext.Window( {
		title : '任务查询',
		width : 800,
		height : 500,
		closeAction : 'hide',
		plain : true,
		modal:true,
		layout : 'fit',
		html:'<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src="'+gdc.webContextRoot+'/pages/task/taskSel.jsp"> </iframe>'
	});
	taskSelWindow.show();
}



//************************************** 切换工具栏图片方法 ************************************************
function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}


function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}