/**
 * <p>Title: 购电侧系统</p>
 * <p>Description: 购电侧系统</p>
 * <p>Copyright: Copyright (c) 2009</p>
 * <p>Company: 江苏方天电力技术有限公司</p>
 * ============================================================ 
 * 功能描述：系统登录日志管理
 * ============================================================ 
 */
Ext.namespace("com.frontier.gdc.system.sysLoginLog");

	   /**
		* 分页的每页数据量
		* @type {Number}
		*/
		var pageSize = gdc.constant.pageSize;
		com.frontier.gdc.system.sysLoginLog.rootName='';
		com.frontier.gdc.system.sysLoginLog.formatDate=function (datestr){
			var datearray=datestr.split('-');
			var dateStr=datearray[0]+" 年"+datearray[1]+"月"+datearray[2]+"日";
			return dateStr;
			
		}
		com.frontier.gdc.system.sysLoginLog.starttime='';
		com.frontier.gdc.system.sysLoginLog.endtime='';
		var tree;
		var grid;
		var nodeId;
		var ds;
		var specialOrgId =null;

		com.frontier.gdc.system.sysLoginLog.win ;
		
		var _jsonReader = new Ext.data.JsonReader( {
			root : 'list',
			totalProperty : 'totalCount',
			id : 'id',
			successProperty : '@success'
		}, [ {
			name : 'specialOrgId'
		}, {
			name : 'specialOrgName'
		},{
			name : 'cUserNum'
		},{
			name : 'cLoginUserNum'
		},{
			name : 'cLoginNum'
		}]);
		
	   /**
		*初始化业务组织树
		*/
		com.frontier.gdc.system.sysLoginLog.initTree = function(){
			
			  var Tree = Ext.tree;
		      tree = new Tree.TreePanel( {
		      		id : 'menu-tree',
					autoScroll : true,
					animate : true,
					border : false,
					rootVisible : false,	
			        listeners:{
						"click": function(node,e) {
					    	if(node.id>0){
								nodeId = node.id;
								//alert('nodeId '+nodeId);
								ds.reload({
									   params : {
							           start : 0,
							           limit : pageSize,
							           'specialOrgId' : nodeId
										}
								});    	
					    	}
						}
					}	
		           
		      });
		      var root = new Tree.AsyncTreeNode( {
		            text : '业务组织树',
		            expanded : true,
		            draggable : false,
		            id : '0',//默认的node值：?node=0
		            loader : new Tree.TreeLoader( {
		                  dataUrl : gdc.webContextRoot+'/specialOrg/searchSpecialOrgTree.action' // 这就是要动态载入数据的请求地址，这里请求时会提交一个参数为node的值，值为root即new Tree.AsyncTreeNode()对象的id值
		            	  ,listeners:{
		            	  	'beforeload' : function(loader, node) {
									this.baseParams.spOrgId = currUser['spOrgId'];// 统一框架角色组织ID,by:guojinhui2009/10/19
									if (!gdc.isPagePurview) {
										this.baseParams.curRoleID = '';
									} else {
										this.baseParams.curRoleID = gdc.currentRoleId;// 增加传递当前用户所选的角色ID，by：guojinhui//
									}
								},
							load : function(loader,node,response) {
								if(nodeId){
									return;
								};
								var fc = node.firstChild;
								fc.fireEvent('click',fc);
								ds.baseParams.spOrgId = currUser['spOrgId'];
								if (!gdc.isPagePurview) {
									ds.baseParams.curRoleID = '';
								} else {
									ds.baseParams.curRoleID = gdc.currentRoleId;// 增加传递当前用户所选的角色ID，by：guojinhui//
																					// 2009/10/16
								}
								/*if(node.item(0)) {
									node.item(0).select();
									nodeOnClick(node.item(0));
								}*/
							}
						}
		            })
		      });
		      tree.setRootNode(root);
		      //tree.render();
		      //root.expand();
		};
		function loadCallBack(store,options){
			store.baseParams = { 'specialOrgId' : nodeId,
							           'startTime':com.frontier.gdc.system.sysLoginLog.starttime,
							           'endTime':com.frontier.gdc.system.sysLoginLog.endtime};
		}	
		
com.frontier.gdc.system.sysLoginLog.showDetailsForComp=function (specialOrgId,compname){
		var company;
		com.frontier.gdc.system.sysLoginLog.CompNameHidden=new Ext.form.Hidden({
			value:compname
		});
		var user = new Ext.form.TextField({
		                xtype:'textfield',
		                fieldLabel: '用户名称',
		                name: 'user',
		                emptyText :'用户名',
						maxLength : 30,
						maxLengthText : "输入的字符不能超过30位",		                
		                //vtype:'url',
		                anchor:'90%'
		});
		
		function renderCompName(value){
			return com.frontier.gdc.system.sysLoginLog.CompNameHidden.getValue();
		}

	//-----------------------------------------------------------------------构建list
		var smt = new Ext.grid.CheckboxSelectionModel();//创建checkbox列模型
		var cmt = new Ext.grid.ColumnModel([//建立一个列模型
				smt,//引用checkbox列模型
				{header:'日志编号', width:60,dataIndex:'id',sortable:true,hidden : true},
		        {header:'用户ID', width:150,dataIndex:'userId',sortable:true,align : 'center'},
		        {header:'用户名称', width:110,dataIndex:'userName',sortable:true,align : 'center'},
		        {header:'组织机构', width:180,dataIndex:'orgName',sortable:true,renderer:renderCompName,align : 'center'},
		       	{header:'登录IP', width:120,dataIndex:'loginIp',sortable:true,align : 'center'},
		        {header:'登录时间', width:180,dataIndex:'logTime',sortable:true,align : 'center'}
		    ]);	
	
		var dst = new Ext.data.Store({//把任何数据格式化成grid要的形式
				//---------------获得指定单位下的指定日志期间的日志信息--------------------------------------------------------------------------
		        url : gdc.webContextRoot+'/systemLog/findLogBySpecialId.action?specialOrgId='+specialOrgId,
		        reader: new Ext.data.JsonReader({
				    root : 'list',
					totalProperty : 'totalCount',
					id : 'id',
					successProperty : '@success'
				}, [
				    {name: 'id'},
				    {name: 'userId'},
				    {name: 'userName'},
				    {name: 'orgName'},
				    {name: 'loginIp'},
				    {name: 'logTime'}
				])
		});
		dst.load( {
			params : {
				start : 0,
				limit : pageSize,
				userName:user.getValue(),
			    startTime:com.frontier.gdc.system.sysLoginLog.starttime,
			    endTime:com.frontier.gdc.system.sysLoginLog.endtime
			}
		});	
		//SysLogin.winds=ds;
		//－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
		//以上是定义了一个表格以及如何表格要装如的数据
		//下面将讨论如何将表格和它的数据在浏览器中显示出来
		var ptbt = new gdc.grid.PagingToolbar(
		          {pageSize : pageSize,
		           store: dst});
		var gridt = new Ext.grid.GridPanel({//定一个grid面板
			    //el: 'grid1',//定义一个grid面板将放在id＝‘grid’的位置。
				region:'center',
			    height:260,
			    autoScroll:true,
			    ds: dst,// 指定panel中的数据
			    cm: cmt,//指定列表结构
			    sm:smt,//指定
			    stripeRows: true,//条纹
			    bbar: ptbt
		});

		
		//SysLogin.winUser=user;
		company = new Ext.form.TextField({
		                xtype:'textfield',
		                fieldLabel: '公司名称',
		                name: 'company',
		                value:compname,
		                maxLength : 25, 
		                maxLengthText:'输入的字符长度不能超过25个',
		                disabled:true,
		                anchor:'90%'
		}); 
	  	//SysLogin.winCop=company;	
		var mycheckt =new Ext.Button({text:'查询',iconCls:'search'});//创建查询按钮
		var simpleForm = new Ext.form.FormPanel({ 
			region:'north',
			height:40,
		    labelAlign: 'left',   	    	  
		    buttonAlign:'right',   	  
		    bodyStyle:'padding:5px',   	  	  
		    frame:true,   	  
		    labelWidth:80, 
			items:[
				{layout:'column',border:false,labelSeparator:'：',items:[
			        	{columnWidth:.5,layout: 'form',border:false,items:[user]},
			        	{columnWidth:.5,layout: 'form',border:false,items:[company]}
					]
			    }
		     ]	  
		}); 

		mycheckt.on('click',function(){
			dst.load({params:{start:0,limit:pageSize,userName:user.getValue(),
							  startTime:com.frontier.gdc.system.sysLoginLog.starttime,
							  endTime:com.frontier.gdc.system.sysLoginLog.endtime
			}});      
		});
	//-----------------------------------------------------------------------构建框架 
		var panel=new Ext.Panel({
			layout: 'border',
			closable:true,
			//tbar:[mycheckt],
			//items:[gridt,simpleForm]			
			tbar:[user,mycheckt],
			items:[gridt]
		});
		//==============================================================================================================================================
		var wint = new Ext.Window({
			title: compname,
			layout:'fit',//布局
			width:800,
			height:450,
			closeAction:'hide',//设置是否可以关闭
			maximizable:true,
			modal:true,
			items:[panel]
		});	
		//SysLogin.win=win;

		
		company.setValue(compname);
		user.setValue('');
		dst.on('beforeload', function(){ 
			this.baseParams = {startTime:com.frontier.gdc.system.sysLoginLog.starttime,endTime:com.frontier.gdc.system.sysLoginLog.endtime,userName:user.getValue()};
			//this.baseParams = {startTime:com.frontier.gdc.system.sysLoginLog.starttime,endTime:com.frontier.gdc.system.sysLoginLog.endtime,specialOrgId:specialOrgId}; 
		}); 
		//var daparam=new Ext.data.Record.create();
		//dst.load({params:{start:0,limit:pageSize}});//如果配置了分页工具条，ds.load()就必须在构造grid以后才能执行，否则分页工具条会不起作用	
		 //grid.render(document.body);//让grid登录到浏览器，并渲染显示。	
		if(com.frontier.gdc.system.sysLoginLog.starttime!='' && com.frontier.gdc.system.sysLoginLog.endtime!='')
		wint.setTitle(compname+" ["+com.frontier.gdc.system.sysLoginLog.formatDate(com.frontier.gdc.system.sysLoginLog.starttime)+"－"+com.frontier.gdc.system.sysLoginLog.formatDate(com.frontier.gdc.system.sysLoginLog.endtime)+"]");
		wint.show();//在body 中渲染此窗体
	return wint;
}
		
/**
* 初始化数据集合信息grid布局
*/
com.frontier.gdc.system.sysLoginLog.initGrid = function(){
		var firstday = new gdc.component.DateField({
	          fieldLabel: '开始时间',
	          name: 'start',//元素名称
	          allowBlank:false,//不允许为空
	          readOnly:true,
	          format:'Y-m-d'
         })
         var lastday = new gdc.component.DateField({
	          fieldLabel: '结束时间',
	          name: 'end',//元素名称
	          allowBlank:false,//不允许为空
	          readOnly:true,
	          format:'Y-m-d'
         })
		ds = new Ext.data.Store({
		        url : gdc.webContextRoot+'/systemLog/findOrgLoginCount.action',
		        reader:_jsonReader
				/*,listeners:{
				    'beforeload':function() {
				    	this.baseParams = {firstday:com.frontier.gdc.system.sysLoginLog.starttime,lastday:com.frontier.gdc.system.sysLoginLog.endtime,specialOrgId:specialOrgId}; 
				    }
				}*/
				,listeners:{
					"beforeload": loadCallBack
				}		
		});
		
		var sm = new Ext.grid.CheckboxSelectionModel({
				singleSelect:true
		});//创建checkbox列模型
		var cm = new Ext.grid.ColumnModel([//建立一个列模型
				sm,
				{header:'业务组织ID', width:80,dataIndex:'specialOrgId',sortable:true,hidden : true},
		        {header:'业务组织名称', width:260,dataIndex:'specialOrgName',sortable:true,align : 'center'},
		        {header:'总用户数', width:100,dataIndex:'cUserNum',sortable:true,align : 'center'},
		        {header:'总登录用户数', width:100,dataIndex:'cLoginUserNum',sortable:true,align : 'center'},
		       	{header:'总登录次数', width:100,dataIndex:'cLoginNum',sortable:true,align : 'center'}
		    ]);
		var ptb = new gdc.grid.PagingToolbar(
		          {pageSize : pageSize,
		           store: ds});
		var mycheck =new Ext.Button({text:'查询',iconCls:'search'});//创建查询按钮
		//var myexportExl =new Ext.Button({text:'导出',iconCls:'export'});//创建查询按钮
		var details=new Ext.Button({text:'明细',iconCls:'view'});
		grid = new Ext.grid.GridPanel({//定一个grid面板
			    //el: 'grid1',//定义一个grid面板将放在id＝‘grid’的位置。
				title: com.frontier.gdc.system.sysLoginLog.rootName,
				collapsible: true,
				autoScroll : true,
				region:'center',
				border:false,
			    height:450,
			    ds: ds,//指定panel中的数据
			    cm: cm,//指定列表结构
			    sm:sm,
			    stripeRows: true,//条纹
			  //  bbar :ptb,
			    tbar:[
				new Ext.Toolbar.TextItem("日志期间:"),
				firstday,
				new Ext.Toolbar.TextItem("－－"),
				lastday,
				{xtype:"tbseparator"},
				mycheck,
				{xtype:"tbseparator"},
				//myexportExl,
				//{xtype:"tbseparator"},
				details
			]
		});
		/*myexportExl.on('click',function(){ 
			var loca= Appframe.rootUrl+'common/SysLoginAnalyse.do?method=loginAnalyzeToExcel&compid='+
			SysLogin.rootId+"&starttime="+SysLogin.starttime+"&endtime="+SysLogin.endtime;
			//alert(location);
			location=loca;
		});*/
		details.on('click',function(){
			if(sm.getCount()!=0){
				var logs =sm.getSelections();
				var first="";
				var last="";
				if(firstday.getValue()!="" ){
					//first=""+firstday.getValue().getFullYear()+"-"+(firstday.getValue().getMonth()+1)+"-"+dd;
					first = firstday.value;
					com.frontier.gdc.system.sysLoginLog.starttime=first;
				}
				if(lastday.getValue()!=""){
					//last=""+lastday.getValue().getFullYear()+"-"+(lastday.getValue().getMonth()+1)+"-"+dd;
					last = lastday.value;
					com.frontier.gdc.system.sysLoginLog.endtime=last;
				}

				com.frontier.gdc.system.sysLoginLog.win=com.frontier.gdc.system.sysLoginLog.showDetailsForComp(logs[0].get('specialOrgId'),logs[0].get("specialOrgName"));
				if(!com.frontier.gdc.system.sysLoginLog.starttime){
					//alert('null');
				}else{
					//alert('notnull');
				}
				com.frontier.gdc.system.sysLoginLog.win.show();
			}else{
				//Ext.MessageBox.alert("警告","请选择要查看的登录分析记录");
				Appframe.viewinfdlg.warning.show('请选择要查看的登录分析记录！');
			}
		});
		mycheck.on('click',function(){
			if(firstday.getValue()=='' || lastday.getValue()==''){
				//Ext.MessageBox.alert("警告","请完整填写日志期间!");
				Appframe.viewinfdlg.warning.show('请完整填写日志期间！');
				return false;
			}
			else{
				if(firstday.getValue()!=null&&lastday.getValue()!=null){
					if (firstday.getValue() > lastday.getValue()) {
						Appframe.viewinfdlg.error.show('开始时间不能大于结束时间！');
						return false;
					} 				
				}
				
				//查询日期传给公共变量
				var first="";
				var last="";
				if(firstday.getValue()!="" ){
					//first=""+firstday.getValue().getFullYear()+"-"+(firstday.getValue().getMonth()+1)+"-"+dd;
					first = firstday.value;
					com.frontier.gdc.system.sysLoginLog.starttime=first;
				}
				if(lastday.getValue()!=""){
					//last=""+lastday.getValue().getFullYear()+"-"+(lastday.getValue().getMonth()+1)+"-"+dd;
					last = lastday.value;
					com.frontier.gdc.system.sysLoginLog.endtime=last;
				}
				//panel的title
				grid.setTitle(com.frontier.gdc.system.sysLoginLog.rootName+"["+com.frontier.gdc.system.sysLoginLog.formatDate(first)+"－"+com.frontier.gdc.system.sysLoginLog.formatDate(last)+"]");
				//alert(com.frontier.gdc.system.sysLoginLog.starttime);
				//alert(com.frontier.gdc.system.sysLoginLog.endtime);
				if(true){
					
					ds.load();      
				}
			}
		});
};
/**
* 厂站管理页面初始化
*/
com.frontier.gdc.system.sysLoginLog.newMainPanel = function(){
	
	Ext.QuickTips.init();
	
	com.frontier.gdc.system.sysLoginLog.initTree();
	com.frontier.gdc.system.sysLoginLog.initGrid();
	
	var mainPanelInit = new Ext.Panel({
		//frame:true,
     	//bodyStyle:'padding:5px 5px 0',
		width:Ext.lib.Dom.getViewWidth(),
		height:Ext.lib.Dom.getViewHeight(),
		layout : 'fit',
		items:[{
			border : false,
		    layout : 'border',
			items : [{
                    region:'west',
                    id:'west-panel',
                    title:'业务组织导航树菜单',
                    split:true,
                    width: 200,
                    layout: 'fit',
                    maxSize: 400,
                    collapsible: true,
                    items:tree
                }, {
		        region: 'center',
		        layout: 'fit',
		        items:grid
		        
		        }]
			}]
		
    });
    return mainPanelInit;
}
