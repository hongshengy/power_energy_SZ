/**
 * <p>Title: 购电侧系统</p>
 * <p>Description: 购电侧系统</p>
 * <p>Copyright: Copyright (c) 2009</p>
 * <p>Company: 江苏方天电力技术有限公司</p>
 * ============================================================ 
 * 功能描述：系统操作日志管理
 * ============================================================ 
 */
Ext.namespace("com.frontier.gdc.system.sysOperLog");

	   /**
		* 分页的每页数据量
		* @type {Number}
		*/
		var pageSize = gdc.constant.pageSize;
		com.frontier.gdc.system.sysOperLog.rootName='';
		com.frontier.gdc.system.sysOperLog.formatDate=function (datestr){
			var datearray=datestr.split('-');
			var dateStr=datearray[0]+" 年"+datearray[1]+"月"+datearray[2]+"日";
			return dateStr;
			
		}
		com.frontier.gdc.system.sysOperLog.starttime='';
		com.frontier.gdc.system.sysOperLog.endtime='';
		//var tree;
		var grid;
		var tree;
		var nodeId;
		var ds;
		var dst;
		var specialOrgId =null;
		
		//系统id
		com.frontier.gdc.system.sysOperLog.systemId = '';
		//上级节点id
		com.frontier.gdc.system.sysOperLog.funcParentId = '';
		//节点id
		com.frontier.gdc.system.sysOperLog.funcSelfId = ''
		//节点id
		com.frontier.gdc.system.sysOperLog.funcIsLeaf = ''
		// 业务组织id
		com.frontier.gdc.system.sysOperLog.specialOrgId = ''

		com.frontier.gdc.system.sysOperLog.win ;
		
		var _jsonReader = new Ext.data.JsonReader( {
			root : 'list',
			totalProperty : 'totalCount',
			id : 'id',
			successProperty : '@success'
		}, [{
			name : 'id'
		},{
			name : 'systemId'
		},{
			name : 'funcName'
		},{
			name : 'funcCountNum'
		}]);
		

		//菜单树(权限功能node的id为 （系统id，权限对象id）；权限对象node的id为（权限对象id）)
com.frontier.gdc.system.sysOperLog.tree = null;
com.frontier.gdc.system.sysOperLog.createTree = function(){
	tree = new Ext.tree.TreePanel({
		region : 'west',
		layout:'fit',
		rootVisible : false,
		autoScroll : true,
		enableDD : true,
		loader : new Ext.tree.TreeLoader({
			dataUrl : gdc.webContextRoot+'sysFunc/findSysFuncOrObjectTreeOnFunc.action'
			,listeners:{
				load : function(loader,node,response) {
					if(nodeId){
						return;
					};
					var fc = node.firstChild;
					fc.fireEvent('click',fc);
				}
			}
		})
	});
	var root = new Ext.tree.AsyncTreeNode({
		id : '-100',
		text : '电厂树'
	});
	tree.setRootNode(root);
	tree.on('click',function(node){
		nodeId = node.id;
		com.frontier.gdc.system.sysOperLog.funcIsLeaf = node.isLeaf();
		//alert(com.frontier.gdc.system.sysOperLog.funcIsLeaf);
		//alert(node.attributes.leaf);
		//ds.baseParams.isLeaf = com.frontier.gdc.system.sysOperLog.funcIsLeaf;
		if(node.attributes.type=='SysSystem'){
			ds.baseParams.systemId = com.frontier.gdc.system.sysOperLog.systemId;
			ds.baseParams.parentId = com.frontier.gdc.system.sysOperLog.funcParentId;
		}
		var nodeIds = node.id.split(',');
		//alert(nodeIds);
		if(nodeIds[1]=='0'){
			com.frontier.gdc.system.sysOperLog.funcSelfId = '';
		}
		com.frontier.gdc.system.sysOperLog.systemId = nodeIds[0];
		com.frontier.gdc.system.sysOperLog.funcParentId = nodeIds[1];
		
		ds.baseParams.systemId = com.frontier.gdc.system.sysOperLog.systemId;
		ds.baseParams.parentId = com.frontier.gdc.system.sysOperLog.funcParentId;
		ds.load({
			params : {
	           start : 0,
	           limit : pageSize,
	           isLeaf : com.frontier.gdc.system.sysOperLog.funcIsLeaf,
	           systemId : com.frontier.gdc.system.sysOperLog.systemId,
			   funcId : com.frontier.gdc.system.sysOperLog.funcSelfId,
			   parentId : com.frontier.gdc.system.sysOperLog.funcParentId,
			   startTime : com.frontier.gdc.system.sysOperLog.starttime,
			   endTime : com.frontier.gdc.system.sysOperLog.endtime,
			   specialOrgId : com.frontier.gdc.system.sysOperLog.specialOrgId
			}
		}); 
		
		if(!node.isLeaf()){
			node.expand();
		}

		//系统节点
		var ids = node.id.split(',');
		var pid = node.parentNode.id;
		if(pid==-100){
			
			//systemId、功能父节点 赋值
			com.frontier.gdc.system.sysOperLog.funcParentId = 0;
			com.frontier.gdc.system.sysOperLog.funcSelfId = 0;
			com.frontier.gdc.system.sysOperLog.systemId = ids[0];
			
			return;
		}
		//功能或对象节点
		//com.frontier.gdc.system.menuDefine.submitType = 'update';
		
		if(node.attributes.type=='SysObject'){

			//alert('SysObject');

		}else if(node.attributes.type=='SysFunc'){

			//alert('SysFunc');
			//systemId、功能父节点 赋值
			var pids = node.parentNode.id.split(',');
			com.frontier.gdc.system.sysOperLog.funcParentId = pids[1];
			//alert(com.frontier.gdc.system.sysOperLog.funcParentId);
			com.frontier.gdc.system.sysOperLog.systemId = ids[0];
			com.frontier.gdc.system.sysOperLog.funcSelfId = ids[1]
			//alert(com.frontier.gdc.system.sysOperLog.funcSelfId);
			
			//ds.baseParams.systemId = com.frontier.gdc.system.sysOperLog.systemId;
			//ds.baseParams.funcId = com.frontier.gdc.system.sysOperLog.funcSelfId;

		}
		if(node.isLeaf()){
			ds.load({
				params : {
		           start : 0,
		           limit : pageSize,
		           isLeaf : com.frontier.gdc.system.sysOperLog.funcIsLeaf,
		           systemId : com.frontier.gdc.system.sysOperLog.systemId,
				   funcId : com.frontier.gdc.system.sysOperLog.funcSelfId,
				   parentId : com.frontier.gdc.system.sysOperLog.funcParentId,
				   startTime : com.frontier.gdc.system.sysOperLog.starttime,
				   endTime : com.frontier.gdc.system.sysOperLog.endtime,
				   specialOrgId : com.frontier.gdc.system.sysOperLog.specialOrgId
				}
			});
		}

		
	});
	tree.on('beforeload',function(node,deep,anim){
		
		var pNode = node.parentNode;
		com.frontier.gdc.system.sysOperLog.funcIsLeaf = node.isLeaf();
		//alert(com.frontier.gdc.system.sysOperLog.funcIsLeaf);
		//alert(123.345());
		//ds.baseParams.isLeaf = com.frontier.gdc.system.sysOperLog.funcIsLeaf;
		if(pNode){
			if(pNode.id==-100){
				var nodeIds = node.id.split(',');
				//alert(nodeIds);
				com.frontier.gdc.system.sysOperLog.systemId = nodeIds[0];
				com.frontier.gdc.system.sysOperLog.funcParentId = nodeIds[1];
				ds.baseParams.systemId = com.frontier.gdc.system.sysOperLog.systemId;
				ds.baseParams.parentId = com.frontier.gdc.system.sysOperLog.funcParentId;
//				ds.load({
//					params : {
//			           start : 0,
//			           limit : pageSize,
//			           isLeaf : com.frontier.gdc.system.sysOperLog.funcIsLeaf,
//			           systemId : com.frontier.gdc.system.sysOperLog.systemId,
//					   funcId : com.frontier.gdc.system.sysOperLog.funcSelfId,
//					   parentId : com.frontier.gdc.system.sysOperLog.funcParentId,
//					   startTime : com.frontier.gdc.system.sysOperLog.starttime,
//					   endTime : com.frontier.gdc.system.sysOperLog.endtime,
//					   specialOrgId : com.frontier.gdc.system.sysOperLog.specialOrgId
//					}
//				}); 
				//alert("beforeload "+com.frontier.gdc.system.sysOperLog.systemId);
			}
		}
	});
//	tree.on('dragdrop', function(t,node,dd,e){
//		 alert(node.text); //源节点id 
//		 alert('父节点：'+node.parentNode.text); //目标父节点id
//		 alert('后一个节点：'+node.nextSibling ? node.nextSibling.text : ""); //下一个节点id，用于拖动插入某节点到另一节点之前/后 7: 
//		 alert('前一个节点：'+node.previousSibling ? node.previousSibling.text : ""); //前一个节点id
//	},this);
	tree.on('beforemovenode', function(tree,node,oldParent,newParent,index){
		//拖动检查
		var flag = com.frontier.gdc.system.sysOperLog.moveFuncCheck(node,oldParent,newParent);
		if(flag==false){
			return false;
		}
		
		var npid = '';
		var id = '';
		var opid = '';
		//获取新父节点id
		var npids = newParent.id.split(',');
		if(npids.length>1){
			npid = npids[1];
		}else{
			npid = newParent.id;
		}
		//获取旧父节点id
		var opids = oldParent.id.split(',');
		if(opids.length>1){
			opid = opids[1];
		}else{
			opid = oldParent.id;
		}
		//获取拖动节点id
		var ids = node.id.split(',');
		if(ids.length>1){
			id = ids[1];
		}else{
			id = node.id;
		}
		//发送请求
		var moveResult = npid+','+id+','+index;
		Ext.Ajax.request({
			url : gdc.webContextRoot + '/sysFunc/moveFunc.action',
			params : {"moveResult":moveResult},
			success : function(result,request) {
				var resl = result.responseText;
				var tem = eval('('+resl+')');
				if(tem.success==true){
					Appframe.viewinfdlg.right.show("拖动成功！", true);
				}
			}
		});
	});

	//com.frontier.gdc.system.menuDefine.root.expand();
	//com.frontier.gdc.system.sysOperLog.tree = tree;
	//return com.frontier.gdc.system.sysOperLog.tree;
}
/**
 * 检查节点是否能拖动
 * @param {} node   拖动节点
 * @param {} oldParent  旧父节点
 * @param {} newParent  新父节点
 */
com.frontier.gdc.system.sysOperLog.moveFuncCheck = function(node,oldParent,newParent){
	var flag = true;
	var oids = oldParent.id.split(',');
	var nids = newParent.id.split(',');
	if(node.attributes.type=='SysObject' || node.parentNode.id==-100){
		Ext.MessageBox.alert('提示', '非功能节点不能拖动！');
		flag = false;
	}else if(oids[0]!=nids[0]){
		Ext.MessageBox.alert('提示', '系统之间不能互相拖动功能节点！');
		flag = false;
	}else if(com.frontier.gdc.system.sysOperLog.isCreateFunc(newParent.id)==false){
		Ext.MessageBox.alert('提示', '功能节点不能拖动到已经有权限对象的功能节点下！');
		flag = false;
	}
	return flag;
}
	//检查节点下是否能创建功能
com.frontier.gdc.system.sysOperLog.isCreateFunc = function(nodeId){
	var node = com.frontier.gdc.system.sysOperLog.tree.getNodeById(nodeId);
	if(node){
		var nodeChildArray = node.childNodes;
		if(nodeChildArray.length>0){
			for(var c=0;c<nodeChildArray.length;c++){
				if(nodeChildArray[c].attributes.type=='SysObject'){
					return false;
				}
			}
		}else{
			return true;
		}
	}
}	
		
		
		function loadCallBack(store,options){
			store.baseParams = { 'systemId' : com.frontier.gdc.system.sysOperLog.systemId,
								 'funcId' : com.frontier.gdc.system.sysOperLog.funcSelfId,
							     'startTime':com.frontier.gdc.system.sysOperLog.starttime,
							     'endTime':com.frontier.gdc.system.sysOperLog.endtime,
							     'isLeaf' : com.frontier.gdc.system.sysOperLog.funcIsLeaf,
					   			 'parentId' : com.frontier.gdc.system.sysOperLog.funcParentId,
					   			 specialOrgId : com.frontier.gdc.system.sysOperLog.specialOrgId
							   };
		}	
		
com.frontier.gdc.system.sysOperLog.showDetailsForComp=function (specialOrgId,compname){
		var company;
		if(!compname){
			compname = '总公司';
		}
		com.frontier.gdc.system.sysOperLog.CompNameHidden=new Ext.form.Hidden({
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
			return com.frontier.gdc.system.sysOperLog.CompNameHidden.getValue();
		}

	//-----------------------------------------------------------------------构建list
		var smt = new Ext.grid.CheckboxSelectionModel();//创建checkbox列模型
		var cmt = new Ext.grid.ColumnModel([//建立一个列模型
				smt,//引用checkbox列模型
				{header:'日志编号', width:60,dataIndex:'id',sortable:true,hidden : true},
		        {header:'用户ID', width:150,dataIndex:'userId',sortable:true,align : 'center'},
		        {header:'用户名称', width:110,dataIndex:'userName',sortable:true,align : 'center'},
		        {header:'组织机构', width:180,dataIndex:'orgName',sortable:true,align : 'center'},
		       	{header:'登录IP', width:120,dataIndex:'loginIp',sortable:true,align : 'center'},
		        {header:'登录时间', width:180,dataIndex:'logTime',sortable:true,align : 'center'}
		    ]);	
	
		dst = new Ext.data.Store({//把任何数据格式化成grid要的形式
				//---------------获得指定单位下的指定日志期间的日志信息--------------------------------------------------------------------------
		        url : gdc.webContextRoot+'/systemLog/findLogDetailList.action',
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
		/*dst.load( {
			params : {
				start : 0,
				limit : pageSize,
				userName:user.getValue(),
			    startTime:com.frontier.gdc.system.sysOperLog.starttime,
			    endTime:com.frontier.gdc.system.sysOperLog.endtime
			}
		});	*/
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
			dst.load({
					params : {
			           start : 0,
			           limit : pageSize,
			           systemId : com.frontier.gdc.system.sysOperLog.systemId,
					   funcId : com.frontier.gdc.system.sysOperLog.funcSelfId,
					   startTime : com.frontier.gdc.system.sysOperLog.starttime,
					   endTime : com.frontier.gdc.system.sysOperLog.endtime,
					   specialOrgId : com.frontier.gdc.system.sysOperLog.specialOrgId,
					   userName:user.getValue()
					}
				});   
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
			this.baseParams = {
				startTime:com.frontier.gdc.system.sysOperLog.starttime,
				endTime:com.frontier.gdc.system.sysOperLog.endtime,
				systemId : com.frontier.gdc.system.sysOperLog.systemId,
				funcId : com.frontier.gdc.system.sysOperLog.funcSelfId,
				specialOrgId : com.frontier.gdc.system.sysOperLog.specialOrgId,
				userName:user.getValue()
			};
				
			//this.baseParams = {startTime:com.frontier.gdc.system.sysOperLog.starttime,endTime:com.frontier.gdc.system.sysOperLog.endtime,specialOrgId:specialOrgId}; 
		}); 
		//var daparam=new Ext.data.Record.create();
		//dst.load({params:{start:0,limit:pageSize}});//如果配置了分页工具条，ds.load()就必须在构造grid以后才能执行，否则分页工具条会不起作用	
		 //grid.render(document.body);//让grid登录到浏览器，并渲染显示。	
		if(com.frontier.gdc.system.sysOperLog.starttime!='' && com.frontier.gdc.system.sysOperLog.endtime!='')
		wint.setTitle(compname+" ["+com.frontier.gdc.system.sysOperLog.formatDate(com.frontier.gdc.system.sysOperLog.starttime)+"－"+com.frontier.gdc.system.sysOperLog.formatDate(com.frontier.gdc.system.sysOperLog.endtime)+"]");
		wint.show();//在body 中渲染此窗体
	return wint;
}
		
/**
* 初始化数据集合信息grid布局
*/
com.frontier.gdc.system.sysOperLog.initGrid = function(){
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
		        url : gdc.webContextRoot+'/systemLog/findLogByFunc.action',
		        reader:_jsonReader
				/*,listeners:{
				    'beforeload':function() {
				    	this.baseParams = {firstday:com.frontier.gdc.system.sysOperLog.starttime,lastday:com.frontier.gdc.system.sysOperLog.endtime,specialOrgId:specialOrgId}; 
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
				{header:'功能编号', width:80,dataIndex:'id',sortable:true,align : 'center', hidden : true},
				{header:'系统编号', width:80,dataIndex:'systemId',sortable:true,align : 'center', hidden : true},
		        {header:'功能名称', width:260,dataIndex:'funcName',sortable:true,align : 'center'},
		        {header:'访问次数', width:100,dataIndex:'funcCountNum',sortable:true,align : 'center'}
		    ]);
		var ptb = new gdc.grid.PagingToolbar(
		          {pageSize : pageSize,
		           store: ds});
		var mycheck =new Ext.Button({text:'查询',iconCls:'search'});//创建查询按钮
		//var myexportExl =new Ext.Button({text:'导出',iconCls:'export'});//创建查询按钮
		var details=new Ext.Button({text:'明细',iconCls:'view'});
		grid = new Ext.grid.GridPanel({//定一个grid面板
			    //el: 'grid1',//定义一个grid面板将放在id＝‘grid’的位置。
				title: com.frontier.gdc.system.sysOperLog.rootName,
				collapsible: true,
				autoScroll : true,
				region:'center',
				border:false,
			    height:450,
			    ds: ds,//指定panel中的数据
			    cm: cm,//指定列表结构
			    sm:sm,
			    stripeRows: true,//条纹
			    bbar :ptb,
			    tbar:[new Ext.Toolbar.TextItem("公司:"),
			    	new Ext.form.Hidden({
						id:'addsysUserSpecialOrgId',
						name:'specialOrgId'
				   }),
				    new gdc.common.comboboxTree.comboxWithTree({
						fieldLabel : '所属单位名称',
						treeType : 'ORG',
						hiddenName : 'addsysUserSpecialOrgId',
						treeId : 'org2Id',
						id : 'addsysUserSpecialOrgName'
			        }),
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
					com.frontier.gdc.system.sysOperLog.starttime=first;
				}
				if(lastday.getValue()!=""){
					//last=""+lastday.getValue().getFullYear()+"-"+(lastday.getValue().getMonth()+1)+"-"+dd;
					last = lastday.value;
					com.frontier.gdc.system.sysOperLog.endtime=last;
				}
				com.frontier.gdc.system.sysOperLog.win=com.frontier.gdc.system.sysOperLog.showDetailsForComp(logs[0].get('specialOrgId'),Ext.getCmp('addsysUserSpecialOrgName').getValue());
				//dst.baseParams.funcId = logs[0].get('id');
				com.frontier.gdc.system.sysOperLog.funcSelfId = logs[0].get('id');
				//alert(logs[0].get('id'));
				//dst.baseParams.systemId = logs[0].get('systemId');
				com.frontier.gdc.system.sysOperLog.systemId = logs[0].get('systemId');
				//alert(logs[0].get('systemId'));
				//dst.baseParams.startTime = com.frontier.gdc.system.sysOperLog.starttime;
				//dst.baseParams.endTime = com.frontier.gdc.system.sysOperLog.endTime;
				//dst.baseParams.userName = user.getValue();
				dst.load({
					params : {
			           start : 0,
			           limit : pageSize,
			           systemId : com.frontier.gdc.system.sysOperLog.systemId,
					   funcId : com.frontier.gdc.system.sysOperLog.funcSelfId,
					   startTime : com.frontier.gdc.system.sysOperLog.starttime,
					   endTime : com.frontier.gdc.system.sysOperLog.endtime,
					   specialOrgId : com.frontier.gdc.system.sysOperLog.specialOrgId
					}
				});
				if(!com.frontier.gdc.system.sysOperLog.starttime){
					//alert('null');
				}else{
					//alert('notnull');
				}
				com.frontier.gdc.system.sysOperLog.win.show();
			}else{
				//Ext.MessageBox.alert("警告","请选择要查看的登录分析记录");
				Appframe.viewinfdlg.warning.show('请选择要查看的操作日志记录！');
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
					com.frontier.gdc.system.sysOperLog.starttime=first;
				}
				if(lastday.getValue()!=""){
					//last=""+lastday.getValue().getFullYear()+"-"+(lastday.getValue().getMonth()+1)+"-"+dd;
					last = lastday.value;
					com.frontier.gdc.system.sysOperLog.endtime=last;
				}
				//panel的title
				grid.setTitle(com.frontier.gdc.system.sysOperLog.rootName+"["+com.frontier.gdc.system.sysOperLog.formatDate(first)+"－"+com.frontier.gdc.system.sysOperLog.formatDate(last)+"]");
				//alert(com.frontier.gdc.system.sysOperLog.starttime);
				//alert(com.frontier.gdc.system.sysOperLog.endtime);
				com.frontier.gdc.system.sysOperLog.specialOrgId = Ext.getCmp('addsysUserSpecialOrgId').getValue();
				//alert(com.frontier.gdc.system.sysOperLog.specialOrgId);
				ds.load({
					params : {
			           start : 0,
			           limit : pageSize,
			           isLeaf : com.frontier.gdc.system.sysOperLog.funcIsLeaf,
			           systemId : com.frontier.gdc.system.sysOperLog.systemId,
					   funcId : com.frontier.gdc.system.sysOperLog.funcSelfId,
					   parentId : com.frontier.gdc.system.sysOperLog.funcParentId,
					   specialOrgId : com.frontier.gdc.system.sysOperLog.specialOrgId
					}
				});
			}
		});
};
/**
* 厂站管理页面初始化
*/
com.frontier.gdc.system.sysOperLog.newMainPanel = function(){
	
	Ext.QuickTips.init();
	
	//com.frontier.gdc.system.sysOperLog.initTree();
	//com.frontier.gdc.system.sysOperLog.createTree();
	com.frontier.gdc.system.sysOperLog.createTree();
	com.frontier.gdc.system.sysOperLog.initGrid();
	
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
                    title:'功能菜单导航树',
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
