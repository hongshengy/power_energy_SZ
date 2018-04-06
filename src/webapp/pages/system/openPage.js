/**
 * <p>Title: 购电侧系统</p>
 * <p>Description: </p>
 * @include "constant.js"
 * @include "constant.js"
 * <p>Copyright: Copyright (c) 2009</p>
 * <p>Company: 江苏方天电力技术有限公司</p>
 */
Ext.namespace("com.frontier.gdc.system.openPage");

//显示角色选择window
com.frontier.gdc.system.openPage.showRoleSelWindow = function(){
	//角色选择window
	if(!com.frontier.gdc.system.openPage.roleSelWindow){
		com.frontier.gdc.system.openPage.roleSelWindow = new Ext.Window( {
			title : '选择角色',
			width : 280,
			closeAction : 'hide',
			closable:false,
			buttonAlign :'center',
			border:false,
			plain : true,
			modal:true,
			tbar:[
				{
					text:'确定',
					iconCls:'ok',
					handler:function(){
						var items = Ext.getCmp('roleGroup').items;
						if(items){
							for(var i=0;i<items.length;i++){
								if(items.get(i).checked){
									gdc.currentRoleId = items.get(i).inputValue;
									com.frontier.gdc.system.openPage.roleSelWindow.hide();
									document.location.href = funcUrl+'?funcId='+funcId+'&roleId='+gdc.currentRoleId;
								}
							}
						}
					}
				}
			]
		}); 
	}else{
		com.frontier.gdc.system.openPage.roleSelWindow.remove(com.frontier.gdc.system.openPage.roleRadioGroupPanel);
	}
	
	//构造角色group
	var data = '[';
	for(var d=0;d<com.frontier.gdc.system.openPage.data.length;d++){
		if(d!=com.frontier.gdc.system.openPage.data.length-1){
			data += '{boxLabel: "'+com.frontier.gdc.system.openPage.data[d].roleName+'", name: "role", inputValue: '+com.frontier.gdc.system.openPage.data[d].id+'},'
		}else{
			data += '{boxLabel: "'+com.frontier.gdc.system.openPage.data[d].roleName+'", name: "role", inputValue: '+com.frontier.gdc.system.openPage.data[d].id+',checked:true}]'
		}
	}
	var radioGroupItems = eval(data);
	//角色group变量
	var roleRadioGroup = new Ext.form.RadioGroup({
		id:'roleGroup',
		fieldLabel: 'Auto Layout',
		columns:1,
	    items: radioGroupItems
	});
	com.frontier.gdc.system.openPage.roleRadioGroupPanel = new Ext.Panel({
		id:'proleSel',
		layout:'fit',
		bodyStyle:'padding:5 5 5 20', 
		frame : true,
		border:false,
		items:roleRadioGroup
	})
	
	//添加角色group并显示
	com.frontier.gdc.system.openPage.roleSelWindow.add(com.frontier.gdc.system.openPage.roleRadioGroupPanel);
	com.frontier.gdc.system.openPage.roleSelWindow.show(); 
}

//打开页面
Ext.onReady(function(){
	Ext.QuickTips.init();
//	if(gdc.mdlCfg.isUnite=='merger'){
//		//如果是合并角色
//		document.location.href = funcUrl;
//	}else{
//		Ext.MessageBox.show({
//	       title: '请稍后',
//	       msg: '正在加载...',
//	       progressText: '初始化中...',
//	       width:300,
//	       waitConfig:{interval:35},
//	       progress:true,
//	       closable:false,
//	       wait:true
//	    });
//		Ext.Ajax.request({
//			url : gdc.webContextRoot + 'sysObject/mergerOrSelectMultiRole.action',
//			params : {'funcId':funcId,unite:'select'},
//			success : function(result,request) {
//				Ext.MessageBox.hide();
//				var res = result.responseText;
//				com.frontier.gdc.system.openPage.data = eval(res);
//				//如果多个角色有该功能的权限，弹出角色选择框
//				if(com.frontier.gdc.system.openPage.data.length>1){
//					com.frontier.gdc.system.openPage.showRoleSelWindow();
//				}else if(com.frontier.gdc.system.openPage.data.length==1){
//					gdc.currentRoleId = com.frontier.gdc.system.openPage.data[0].id;
//					var prefix = '?';
//					if(funcUrl.indexOf('?')>-1){
//						prefix = '&';
//					}
//					document.location.href = funcUrl+prefix+'funcId='+funcId+'&roleId='+gdc.currentRoleId;
//				}
//			}
//		});
//	}	
	var prefix = '?';
	if(funcUrl.indexOf('?')>-1){
		prefix = '&';
	}
	document.location.href = funcUrl+prefix+'funcId='+funcId+'&roleId='+roleId;
})
