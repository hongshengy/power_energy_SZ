Ext.namespace("gdc.errordlg");

gdc.errordlg.inied=false;

/*
 * errdata 格式:
{
	inftype:1  //信息类型： 1警告 2错误
	showdetial:"",//显示提示对话框时默认是否显示详细信息
	clientCode:"",//错误代码
	message:"",//错误信息
	detailmessage:"",//详细错认信息
	callback:, //本提示对话框关闭后的回调函数
}
*/


gdc.errordlg.show=function(errdata){
	gdc.errordlg.errdt=errdata;
	if (gdc.errordlg.win==null){
		var doclose=function(){
			gdc.errordlg.win.hide();
		}
		
		gdc.errordlg.getErrSampleStr=function(){
			var errdata=gdc.errordlg.errdt;
			var errinf="";
			if (errdata.clientCode!=null && errdata.clientCode.length>0){
				errinf="代码："+errdata.clientCode+"\n";
			}
			if (errdata.message!=null && errdata.message.length>0){
				errinf+="信息："+errdata.message;
			}
			if (errinf.length<=0 && errdata.stackTrace!=null && errdata.stackTrace.length>0){
				errinf+="信息："+errdata.stackTrace;
			}
			if (errinf.length<=0 && errdata.detailmessage!=null && errdata.detailmessage.length>0){
				errinf+="信息："+errdata.detailmessage;
			}
			
//			var res="<table width=\"100%\" height=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">";
//			res=res+"<tr>";
//			res=res+"<td width=\"80\" align=\"center\" valign=\"middle\"><img src='img/Stop_Sign.png' width='50' height='50' /></td>";
//			res=res+"<td valign=\"top\">"+errinf+"</td>";
//			res=res+"</tr>";
//			res=res+"</table>";
			return errinf;
		}
		gdc.errordlg.getErrDetailstr=function(){
			var res="";
			if (gdc.errordlg.errdt.detailmessage!=null 
				&& gdc.errordlg.errdt.detailmessage.length>0){
				res=gdc.errordlg.errdt.detailmessage;
			}
			if (gdc.errordlg.errdt.stackTrace!=null 
				&& gdc.errordlg.errdt.stackTrace.length>0){
				res=gdc.errordlg.errdt.stackTrace;
			}
			return res;
		}
		
		gdc.errordlg.edits=[
			new Ext.form.TextArea({
				value:'',
				readOnly:true
			}),
			new Ext.form.TextArea({
				value:'',
				readOnly:true
			})			
		];
		gdc.errordlg.icoPanelErr=function(){
			return new Ext.Panel({
					border:false,
					layout:'fit',
					html:"<img src='"+gdc.webContextRoot+"images/img/Stop_Sign.png' width='50' height='50' />"
				}); 
		};
		
		gdc.errordlg.icoPanelWarn=function(){
			return new Ext.Panel({
				border:false,
				layout:'fit',
				html:"<img src='"+gdc.webContextRoot+"images/img/icon-info.jpg' width='50' height='50' />"
			});
		};		
		gdc.errordlg.win = new Ext.Window({
			layout:'border',
			title:'提示',
			width:600,
			height:155,
			closable:true,
			closeAction:'hide',
			maximizable:true,
			modal:true,
			border:false,
			tbar:[{
				text: '关闭',
				handler:doclose
				//iconCls:'new-tab'
			}],
			items:[{
						layout:'border',
						autoScroll:true,
						region:'north',
						height:70,
						items:[{
								region:'center',
								border:false,
								layout:'fit',
								items:[gdc.errordlg.edits[0]]
							},{
								layout:'fit',
								region:'west',
								width:80,
								border:false,
								bodyStyle:'padding:10px',
								items:[gdc.errordlg.icoPanelErr()]
							}
						],
						border:false
					},{
						layout:'fit',
						autoScroll:true,
						region:'center',
						collapsible: true,
				   	  	collapsed:true,
						listeners:{
							beforeexpand:function(p,animate){
								gdc.errordlg.win.setHeight(400);
							},
							beforecollapse:function(p,animate){
								gdc.errordlg.win.setHeight(155);
							}
						},
						title:"详细信息",
						items:[
							gdc.errordlg.edits[1]
						],
						border:false
					}],
				listeners:{
					beforehide:function(){
						if (gdc.errordlg.errdt.callback!=null) 
						      eval(gdc.errordlg.errdt.callback);
					}
				}					
		});
		gdc.errordlg.win.render(document.body);
	}
	
	var icoPaneP=gdc.errordlg.win.items.get(0).items.get(1);
	icoPaneP.remove(0,true);
	if (gdc.errordlg.errdt.inftype!=null && gdc.errordlg.errdt.inftype==1){
		icoPaneP.add(gdc.errordlg.icoPanelWarn());
	}else{
		icoPaneP.add(gdc.errordlg.icoPanelErr());
	}
	if (gdc.errordlg.errdt.showdetial!=null && gdc.errordlg.errdt.showdetial){
		gdc.errordlg.win.items.get(1).expand(false);
	}else{
		gdc.errordlg.win.restore();
		gdc.errordlg.win.items.get(1).collapse(false);
	}
	icoPaneP.doLayout(false);
	gdc.errordlg.edits[0].setValue(gdc.errordlg.getErrSampleStr());
	gdc.errordlg.edits[1].setValue(gdc.errordlg.getErrDetailstr());
	gdc.errordlg.win.show(this);
}