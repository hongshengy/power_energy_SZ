/**
 * <p>Title: 购电侧系统</p>
 * <p>Description: 购电侧系统 系统全局提示对话框</p>
 * <p>Copyright: Copyright (c) 2009</p>
 * <p>Company: 江苏方天电力技术有限公司</p>
 */
/**************  系统全局正确提示对话框  ***************/
Ext.namespace("Appframe.viewinfdlg.right");

Appframe.viewinfdlg.right.flag=false;

Appframe.viewinfdlg.right.show=function(inidata,autoClose){
	var theCls=Appframe.viewinfdlg.right;
	if(!theCls.flag){
		var doini=function(){
			var doclose=function(){
				theCls.win.hide();
			}
			theCls.edits=[
				new Ext.form.TextArea({
					region:'center',
					value:'',
					readOnly:true
				})		
			];		
			//var htmlstr="<div style=\"width:100%; height:100%; text-align:center\">"+inidata+"</div>";
			theCls.win = new Ext.Window({
				layout: 'border',
				title:'提示',
				width:260,
				height:90,
				closable:true,
				closeAction:'hide',
				modal:false,
				allowDomMove:false,
				border:false,
				resizable:false,
				minimizable:false,
				maximizable:false,
				items:[{
						layout:'fit',
						region:'west',
						width:40,
						border:false,
					//	bodyStyle:'padding:10px',
						html:"<img src='"+gdc.webContextRoot+"images/img/dook.jpg' width='40' height='40' />"
					},theCls.edits[0]
				]/*,
				listeners:{
					afterlayout:function(){
						theCls.win.hide();
					}
				}*/
	//			html:htmlstr
			});
			theCls.hidwin=function(){
				if (theCls.win.isVisible()){
					theCls.win.hide();
				}
			}
		}
		doini();
		theCls.flag=true;
	}
	
	theCls.edits[0].setValue(inidata);
	theCls.win.show(this);
	if(autoClose){
		setTimeout(theCls.hidwin,800);	
	}
	//Ext.Msg.alert("提示",inidata);
}

Ext.namespace("Appframe.viewinfdlg.parent.right");
Appframe.viewinfdlg.parent.right.flag=false;

Appframe.viewinfdlg.parent.right.show=function(inidata,autoClose){
	var theCls=Appframe.viewinfdlg.parent.right;
	if(!theCls.flag){
		var doini=function(){
			var doclose=function(){
				theCls.win.hide();
			}
			theCls.edits=[
				new window.parent.Ext.form.TextArea({
					region:'center',
					value:'',
					readOnly:true
				})		
			];		
			//var htmlstr="<div style=\"width:100%; height:100%; text-align:center\">"+inidata+"</div>";
			theCls.win = new window.parent.Ext.Window({
				layout: 'border',
				title:'提示',
				width:260,
				height:90,
				closable:true,
				closeAction:'hide',
				modal:false,
				allowDomMove:false,
				border:false,
				resizable:false,
				minimizable:false,
				maximizable:false,
				items:[{
						layout:'fit',
						region:'west',
						width:40,
						border:false,
					//	bodyStyle:'padding:10px',
						html:"<img src='"+gdc.webContextRoot+"images/img/dook.jpg' width='40' height='40' />"
					},theCls.edits[0]
				]/*,
				listeners:{
					afterlayout:function(){
						theCls.win.hide();
					}
				}*/
	//			html:htmlstr
			});
			theCls.hidwin=function(){
				if (theCls.win.isVisible()){
					theCls.win.hide();
				}
			}
		}
		doini();
		theCls.flag=true;
	}
	
	theCls.edits[0].setValue(inidata);
	theCls.win.show(this);
	if(autoClose){
		setTimeout(theCls.hidwin,600);	
	}
}


/**************  系统全局警告提示对话框  ***************/
Ext.namespace("Appframe.viewinfdlg.warning");
Appframe.viewinfdlg.warning.flag=false;
Appframe.viewinfdlg.warning.show=function(inidata,autoClose){
	var theCls=Appframe.viewinfdlg.warning;
	if(!theCls.flag){
		var doini=function(){
			var doclose=function(){
				theCls.win.hide();
			}
			theCls.edits=[
				new Ext.form.TextArea({
					region:'center',
					value:'',
					readOnly:true
				})		
			];		
			//var htmlstr="<div style=\"width:100%; height:100%; text-align:center\">"+inidata+"</div>";
			theCls.win = new Ext.Window({
				layout: 'border',
				title:'提示',
				width:260,
				height:90,
				closable:true,
				closeAction:'hide',
				modal:true,
				plane:true,
				allowDomMove:false,
				border:false,
				resizable:false,
				minimizable:false,
				maximizable:false,
				items:[{
						layout:'fit',
						region:'west',
						width:40,
						border:false,
					//	bodyStyle:'padding:10px',
						html:"<img src='"+gdc.webContextRoot+"images/img/icon-info.jpg' width='40' height='40' />"
					},theCls.edits[0]
				]/*,
				listeners:{
					afterlayout:function(){
						theCls.win.hide();
					}
				}*/
	//			html:htmlstr
			});
			
			theCls.hidwin=function(){
				if (theCls.win.isVisible()){
					theCls.win.hide();
				}
			}
		}
		doini();
		theCls.flag=true;
	}
	
	theCls.edits[0].setValue(inidata);
	theCls.win.show(this);
	if(autoClose){
		setTimeout(theCls.hidwin,600);	
	}
}

Ext.namespace("Appframe.viewinfdlg.parent.warning");
Appframe.viewinfdlg.parent.warning.flag=false;
Appframe.viewinfdlg.parent.warning.show=function(inidata,autoClose){
	var theCls=Appframe.viewinfdlg.parent.warning;
	if(!theCls.flag){
		var doini=function(){
			var doclose=function(){
				theCls.win.hide();
			}
			theCls.edits=[
				new window.parent.Ext.form.TextArea({
					region:'center',
					value:'',
					readOnly:true
				})		
			];		
			//var htmlstr="<div style=\"width:100%; height:100%; text-align:center\">"+inidata+"</div>";
			theCls.win = new window.parent.Ext.Window({
				layout: 'border',
				title:'提示',
				width:260,
				height:90,
				closable:true,
				closeAction:'hide',
				modal:true,
				allowDomMove:false,
				border:false,
				resizable:false,
				minimizable:false,
				maximizable:false,
				items:[{
						layout:'fit',
						region:'west',
						width:40,
						border:false,
					//	bodyStyle:'padding:10px',
						html:"<img src='"+gdc.webContextRoot+"images/img/icon-info.jpg' width='40' height='40' />"
					},theCls.edits[0]
				]/*,
				listeners:{
					afterlayout:function(){
						theCls.win.hide();
					}
				}*/
	//			html:htmlstr
			});
			theCls.hidwin=function(){
				if (theCls.win.isVisible()){
					theCls.win.hide();
				}
			}
		}
		doini();
		theCls.flag=true;
	}
	theCls.edits[0].setValue(inidata);
	theCls.win.show(this);
	if(autoClose){
		setTimeout(theCls.hidwin,600);	
	}
}

/**************  系统全局错误提示对话框  ***************/
Ext.namespace("Appframe.viewinfdlg.error");
Appframe.viewinfdlg.error.flag=false;
Appframe.viewinfdlg.error.show=function(inidata,autoClose){
	var theCls=Appframe.viewinfdlg.error;
	if(!theCls.flag){
		var doini=function(){
			var doclose=function(){
				theCls.win.hide();
			}
			theCls.edits=[
				new Ext.form.TextArea({
					region:'center',
					value:'',
					readOnly:true
				})		
			];		
			//var htmlstr="<div style=\"width:100%; height:100%; text-align:center\">"+inidata+"</div>";
			theCls.win = new Ext.Window({
				layout: 'border',
				title:'提示',
				width:260,
				height:90,
				closable:true,
				closeAction:'hide',
				modal:true,
				allowDomMove:false,
				border:false,
				resizable:false,
				minimizable:false,
				maximizable:false,
				items:[{
						layout:'fit',
						region:'west',
						width:40,
						border:false,
					//	bodyStyle:'padding:10px',
						html:"<img src='"+gdc.webContextRoot+"images/img/icon_error.gif' width='40' height='40' />"
					},theCls.edits[0]
				]/*,
				listeners:{
					afterlayout:function(){
						theCls.win.hide();
					}
				}*/
	//			html:htmlstr
			});
			theCls.hidwin=function(){
				if (theCls.win.isVisible()){
					theCls.win.hide();
				}
			}
		}
		doini();
		theCls.flag=true;
	}
	
	theCls.edits[0].setValue(inidata);
	theCls.win.show(this);
	if(autoClose){
		setTimeout(theCls.hidwin,600);	
	}
}

Ext.namespace("Appframe.viewinfdlg.parent.error");
Appframe.viewinfdlg.parent.error.flag=false;
Appframe.viewinfdlg.parent.error.show=function(inidata,autoClose){
	var theCls=Appframe.viewinfdlg.parent.error;
	if(!theCls.flag){
		var doini=function(){
			var doclose=function(){
				theCls.win.hide();
			}
			theCls.edits=[
				new window.parent.Ext.form.TextArea({
					region:'center',
					value:'',
					readOnly:true
				})		
			];		
			//var htmlstr="<div style=\"width:100%; height:100%; text-align:center\">"+inidata+"</div>";
			theCls.win = new window.parent.Ext.Window({
				layout: 'border',
				title:'提示',
				width:260,
				height:90,
				closable:true,
				closeAction:'hide',
				modal:true,
				allowDomMove:false,
				border:false,
				resizable:false,
				minimizable:false,
				maximizable:false,
				items:[{
						layout:'fit',
						region:'west',
						width:40,
						border:false,
					//	bodyStyle:'padding:10px',
						html:"<img src='"+gdc.webContextRoot+"images/img/icon_error.gif' width='40' height='40' />"
					},theCls.edits[0]
				]/*,
				listeners:{
					afterlayout:function(){
						theCls.win.hide();
					}
				}*/
	//			html:htmlstr
			});
			theCls.hidwin=function(){
				if (theCls.win.isVisible()){
					theCls.win.hide();
				}
			}
		}
		doini();
		theCls.flag=true;
	}
	
	theCls.edits[0].setValue(inidata);
	theCls.win.show(this);
	if(autoClose){
		setTimeout(theCls.hidwin,600);	
	}
}