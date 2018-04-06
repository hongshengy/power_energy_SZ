<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
  <title>权限分配</title>
       <meta http-equiv="content-type" content="text/html; charset=utf-8">
	<jsp:include page="/ext.jsp"/>
  <script> 
	Ext.onReady(function(){
		var theId = <%=request.getParameter("id")%>;
		var theName = <%=request.getParameter("name")%>;
		var northPanel = new Ext.FormPanel({
			collapsible: true,
			labelWidth : 90,
			frame : true,
			title:"数据集合定义",		
			region:"north",		
			bodyStyle : 'padding:5px 5px 0',
			width : 280,
			height: 101,
			waitMsgTarget : true,
			defaults : {
				width : 230
			},
			defaultType : 'textfield',
			items : [ {
				fieldLabel : '数据集合名称',
				id:'dataSetName',
				name : 'dataSet.dataSetName',
				value: theName,
				allowBlank : false
			}],

			buttons : [ {
				text : '保存',
				disabled : false,
				handler : function() {
					if (northPanel.form.isValid()) {
						var cns = checkedNodes(); 
						var ens = excludeNodes();
						var title = Ext.getDom("dataSetName").value;
						Ext.Msg.confirm("确认","<br/>保存数据集合<b> "+title+"</b> ？<br/>",function(id){
							if(id==="yes"){
								northPanel.form.submit( {
									url : gdc.webContextRoot+'/dataSetPurview/editDataSetPurviewForArea.action?checkedNodes='+cns+"&excludeNodes="+ens+"&dataSet.dataSetId="+theId,
									success : function(form, action) {
										Appframe.viewinfdlg.right.show("保存数据集合成功！");
									},
									failure : function(form, action) {
										Appframe.viewinfdlg.error.show("保存数据集合失败！");
									},
									waitMsg : '正在保存数据，稍后...'
								});
						}
					});
					
				} else {
						Appframe.viewinfdlg.warning.show("请填写数据集合名称后再提交!");
				}
					
				}
			}, {
				text : '取消',
				handler : function() {
					alert("取消")
				}
			}]		   
		});
		  var v = 2;
          var Tree = Ext.tree;  
                
          var  tree = new Tree.TreePanel({  
                	id:'menu-tree',
                    el:'tree-div',  
                    autoScroll:true,  
                    animate:true,  
                    enableDD:false,  
                    containerScroll: true,   
                    rootVisible: false
                });  
  
               
                tree.on('checkchange', function(node, checked) {
                	var checked = node.ui.isChecked();
                	if(node.isExpanded()){
	                    node.eachChild(function(child) {  
	                        child.ui.toggleCheck(checked);
	                    });
                    }
                    checkedNodes();
					excludeNodes();
                     /**
                    var pn = node.parentNode;
                     if(checked){
                     	var flag = true;
                    	pn.eachChild(function(child) {
                    		if(!child.ui.isChecked()){
                    			flag = false;
                    		}
                    	});
                    	if(flag){
                    		pn.ui.toggleCheck(true);
                    	}
                   
                     }
                    
                     else{
                    	var flag = false;
                    	pn.eachChild(function(child) {
                    		if(child.ui.isChecked()){
                    			flag = true;
                    		}
                    	
                    	});
                    	
                    	if(!flag){
                    		pn.ui.toggleCheck(false);
                    	}
                     }
                     **/
                });  
                
                 var loader = new Tree.TreeLoader({  
                        dataUrl:gdc.webContextRoot+'/dataSetPurview/findResourcesForEdit.action'  
                    });
                    
                    loader.on("beforeload",function(th,node){
                    	var checked = node.getUI().isChecked();
                    	var rw = 2;
                    	var t = node.text;
                    	jQuery.noConflict();
                		jQuery(t+"[type='radio']").each(function(){
               				if(jQuery(this).attr("checked")){
               					rw = jQuery(this).val();
               				}
               			});
                    	loader.baseParams = {'type' : node.attributes.type,'dataSet.dataSetId':theId,'rw':rw,'checked':checked};
                    });
                // set the root node  
                var root = new Tree.AsyncTreeNode({  
                	type:'area',
                    text: 'root',  
                    draggable:true,  
                    allowDrag : false,
                    id:'0',
                    loader: loader
                    
                });  
  
                tree.setRootNode(root);  
                tree.render();  
               	root.expand();  
               	
               	
               	
   	/**
   tree.on('load', function(node) {
   		node.expand();  
   		 node.eachChild(function(child) { 
                   var old = child.text;
                   var id = child.id;
                   var rw = " [ 读<input class='rw' checked='true' type='radio' name='"+id+"' value='2'/> 写<input class='rw' type='radio' name='"+id+"' value='3'/> ]";
                  child.setText(old+rw);
         });
          
   });
   **/
    var ccnflag = false;
  	var checkChildrenNode = function(node) {
	    	node.eachChild(function(child) { 
	        	if(child.ui.isChecked()){
	        		ccnflag = true;
	        		return false;
	        	}else{
	        		checkChildrenNode(child);
	        	}
	         });
	}; 
   
    
    tree.on('expandnode', function(node) {
    	if(node.isExpanded()){
    	ccnflag = false;
    		checkChildrenNode(node);
	         if(!ccnflag){
	    		node.fireEvent("checkchange",node) ;
	    		node.fireEvent("textchange",node) ;
	    	}
    	}
    
    });
  
  	 tree.on('click', function(node) {
  	 	var id = node.id;
  	 	var text = node.text;
  	 	var i = text.indexOf("[");
  	 	var text = text.substring(0,i);
  	 	var rw = "";
  	 	if(v==2){
  	 		rw = " [ 读<input class='rw' checked='true' type='radio' name='"+id+"' value='2'/> 写<input class='rw' type='radio' name='"+id+"' value='3'/> ]";
  	 	}else if(v==3){
  	 		rw = " [ 读<input class='rw' type='radio' name='"+id+"' value='2'/> 写<input class='rw' checked='true' type='radio' name='"+id+"' value='3'/> ]";
  	 	}
   		node.setText(text+rw);
   		if(node.isExpanded()){
	   		node.eachChild(function(child) {  
	        	var id2 = child.id;
		  	 	var text2 = child.text;
		  	 	var i2 = text2.indexOf("[");
		  	 	var text2 = text2.substring(0,i2);
		  	 	var rw2 = "";
		  	 	if(v==2){
		  	 		rw2 = " [ 读<input class='rw' checked='true' type='radio' name='"+id2+"' value='2'/> 写<input class='rw' type='radio' name='"+id2+"' value='3'/> ]";
		  	 	}else if(v==3){
		  	 		rw2 = " [ 读<input class='rw' type='radio' name='"+id2+"' value='2'/> 写<input class='rw' checked='true' type='radio' name='"+id2+"' value='3'/> ]";
		  	 	}
		   		child.setText(text2+rw2);
		   		
	        });
   		}
   		
   		jQuery.noConflict();
       	jQuery("input.rw").click(function(){
			v =jQuery(this).val();
		});
		
		
		
	});
	
	tree.on("textchange",function(node,text,oldText){
	if(node.isExpanded()){
   		node.eachChild(function(child) {  
        	var id2 = child.id;
	  	 	var text2 = child.text;
	  	 	var i2 = text2.indexOf("[");
	  	 	var text2 = text2.substring(0,i2);
	  	 	var rw2 = "";
	  	 	if(v==2){
	  	 		rw2 = " [ 读<input class='rw' checked='true' type='radio' name='"+id2+"' value='2'/> 写<input class='rw' type='radio' name='"+id2+"' value='3'/> ]";
	  	 	}else if(v==3){
	  	 		rw2 = " [ 读<input class='rw' type='radio' name='"+id2+"' value='2'/> 写<input class='rw' checked='true' type='radio' name='"+id2+"' value='3'/> ]";
	  	 	}
	   		child.setText(text2+rw2);
	   		
        });
        
       } 
        checkedNodes();
		excludeNodes();
	});
	/************************** 数据权限信息 *********************************/
	var cAreaData = [[]];
		
		var cArea = Ext.data.Record.create([
			{name:'areaName',mapping:0},
			{name:'purview',mapping:1}
		]);
	var cAreaDs = new Ext.data.Store({
				reader:new Ext.data.ArrayReader({id:0},cArea),
				data:cAreaData
			});
	var cAreaGp =	new Ext.grid.GridPanel({
			width:460,
			height:150,
			frame:true,
			store:cAreaDs,
			columns:[
				{header:"名称",width:300,dataIndex:"areaName",sortable:true},
				{header:"权限",width:160,dataIndex:"purview",sortable:true}
			]
		});
		
		var eAreaData = [[]];
		
		var eArea = Ext.data.Record.create([
			{name:'areaName',mapping:0}
		]);
	var eAreaDs = new Ext.data.Store({
				reader:new Ext.data.ArrayReader({id:0},eArea),
				data:eAreaData
			});
	var eAreaGp =	new Ext.grid.GridPanel({
			width:460,
			height:150,
			frame:true,
			store:eAreaDs,
			columns:[
				{header:"名称",width:300,dataIndex:"areaName",sortable:true}
			]
		});
		
		
		var cPlantData = [[]];
		
		var cPlant = Ext.data.Record.create([
			{name:'plantName',mapping:0},
			{name:'purview',mapping:1}
		]);
	var cPlantDs = new Ext.data.Store({
				reader:new Ext.data.ArrayReader({id:0},cPlant),
				data:cPlantData
			});
	var cPlantGp =	new Ext.grid.GridPanel({
			width:460,
			height:150,
			frame:true,
			store:cPlantDs,
			columns:[
				{header:"名称",width:300,dataIndex:"plantName",sortable:true},
				{header:"权限",width:160,dataIndex:"purview",sortable:true}
			]
		});
		
		var ePlantData = [[]];
		
		var ePlant = Ext.data.Record.create([
			{name:'plantName',mapping:0}
		]);
	var ePlantDs = new Ext.data.Store({
				reader:new Ext.data.ArrayReader({id:0},ePlant),
				data:ePlantData
			});
	var ePlantGp =	new Ext.grid.GridPanel({
			width:460,
			height:150,
			frame:true,
			store:ePlantDs,
			columns:[
				{header:"名称",width:300,dataIndex:"plantName",sortable:true}
			]
		});
		
			
		var cMpData = [[]];
		
		var cMp = Ext.data.Record.create([
			{name:'mpName',mapping:0},
			{name:'purview',mapping:1}
		]);
	var cMpDs = new Ext.data.Store({
				reader:new Ext.data.ArrayReader({id:0},cMp),
				data:cMpData
			});
	var cMpGp =	new Ext.grid.GridPanel({
			width:460,
			height:150,
			frame:true,
			store:cMpDs,
			columns:[
				{header:"名称",width:300,dataIndex:"mpName",sortable:true},
				{header:"权限",width:160,dataIndex:"purview",sortable:true}
			]
		});
		
		
		var eMpData = [[]];
		
		var eMp = Ext.data.Record.create([
			{name:'mpName',mapping:0}
		]);
	var eMpDs = new Ext.data.Store({
				reader:new Ext.data.ArrayReader({id:0},eMp),
				data:eMpData
			});
	var eMpGp =	new Ext.grid.GridPanel({
			width:460,
			height:150,
			frame:true,
			store:eMpDs,
			columns:[
				{header:"名称",width:300,dataIndex:"mpName",sortable:true}
			]
		});
			
		var cDeviceData = [[]];
		
		var cDevice = Ext.data.Record.create([
			{name:'deviceName',mapping:0},
			{name:'purview',mapping:1}
		]);
	var cDeviceDs = new Ext.data.Store({
				reader:new Ext.data.ArrayReader({id:0},cDevice),
				data:cDeviceData
			});
	var cDeviceGp =	new Ext.grid.GridPanel({
			width:460,
			height:150,
			frame:true,
			store:cDeviceDs,
			columns:[
				{header:"名称",width:300,dataIndex:"deviceName",sortable:true},
				{header:"权限",width:160,dataIndex:"purview",sortable:true}
			]
		});
		
		
		
		var eDeviceData = [[]];
		
		var eDevice = Ext.data.Record.create([
			{name:'deviceName',mapping:0}
		]);
	var eDeviceDs = new Ext.data.Store({
				reader:new Ext.data.ArrayReader({id:0},eDevice),
				data:eDeviceData
			});
	var eDeviceGp =	new Ext.grid.GridPanel({
			width:460,
			height:150,
			frame:true,
			store:eDeviceDs,
			columns:[
				{header:"名称",width:300,dataIndex:"deviceName",sortable:true}
			]
		});
		
  	/***********************************************************/
  	var centerPanel = new Ext.Panel( {
  		title:"数据集合信息",		
		region:"center",
		collapsible: true,
		layout:'table',
		autoScroll:true,
		layoutConfig:{
			columns:2
		},
		items:[
			{	
				title:'地区（选中）',
				height:150,
				width:460,
				//html:"<div id='checkedAreas'></div>"
				items: [{
		             border:false,
		             iconCls: 'tabs_sysinfor',
		             items:cAreaGp
         		}]
			},
			{
				title:'地区（排除）',
				height:150,
				width:350,
				//html:"<div id='excludeAreas'></div>"
				items: [{
		             border:false,
		             iconCls: 'tabs_sysinfor',
		             items:eAreaGp
         		}]
			},	{
				title:'厂站（选中）',
				height:150,
				width:460,
				//html:"<div id='checkedPlants'></div>"
				items: [{
		             border:false,
		             iconCls: 'tabs_sysinfor',
		             items:cPlantGp
         		}]
			},
			{
				title:'厂站（排除）',
				height:150,
				width:350,
				//html:"<div id='excludePlants'></div>"
				items: [{
		             border:false,
		             iconCls: 'tabs_sysinfor',
		             items:ePlantGp
         		}]
			},	{
				title:'计量点（选中）',
				height:150,
				width:460,
				//html:"<div id='checkedMps'></div>"
				items: [{
		             border:false,
		             iconCls: 'tabs_sysinfor',
		             items:cMpGp
         		}]
			},
			{
				title:'计量点（排除）',
				height:150,
				width:350,
				//html:"<div id='excludeMps'></div>"
				items: [{
		             border:false,
		             iconCls: 'tabs_sysinfor',
		             items:eMpGp
         		}]
			},	{
				title:'设备（选中）',
				height:150,
				width:460,
				//html:"<div id='checkedDevices'></div>"
				items: [{
		             border:false,
		             iconCls: 'tabs_sysinfor',
		             items:cDeviceGp
         		}]
			},
			{
				title:'设备（排除）',
				height:150,
				width:350,
				//html:"<div id='excludeDevices'></div>"
				items: [{
		             border:false,
		             iconCls: 'tabs_sysinfor',
		             items:eDeviceGp
         		}]
			}
			
			
		]
	});
	
   new Ext.Viewport({
   
   layout:"border",		
   items:[
   northPanel,
   {	
         region:'west',
         id:'west-panel',
         title:'导航树菜单',
         split:true,
         autoScroll:true,  
         width : 200,
         maxSize: 400,
         collapsible: true,
         margins:'0 0 0 5',
         layout:'accordion',
         layoutConfig:{
             animate:true
         },
         items: [{
             title:'业务组织',   
             autoScroll:true,                       
             border:false,
             iconCls: 'tabs_sysinfor',
             items:tree
         }]
   },
   centerPanel
  	]				
   });
   
   
   
   
   
   /*************************************************/
   
   
  var excludeNodes = function() {  
  				eAreaData=[[]];ePlantData=[[]];eMpData=[[]];eDeviceData=[[]];
  				var areacount = 0;
            	var plantcount = 0;
            	var mpcount = 0;
            	var devicecount = 0;
            	var excludeNodes = "";
                var nodes = tree.getChecked() ;
               	for(var i=0;i<nodes.length;i++){
               		if(!nodes[i].leaf){
               			nodes[i].eachChild(function(node){
               					if(!node.getUI().isChecked()){
               						excludeNodes += node.id+":"+node.attributes.type+";";
               						 var index = node.text.indexOf("[");
               						 text = node.text.substring(0,index);
               						var type = node.attributes.type;
               						if(type=="area"){
               							eAreaData[0,areacount++]=[text];
               						}else if(type=="plant"){
               							ePlantData[0,plantcount++]=[text];
               						}else if(type=="mp"){
               							eMpData[0,mpcount++]=[text];
               						}else if(type=="device"){
               							eDeviceData[0,devicecount++]=[text];
               						}
               						
               					}
               			});
               		}
              	}
              	eAreaDs.removeAll();
               	eAreaDs.loadData(eAreaData);
               	ePlantDs.removeAll();
               	ePlantDs.loadData(ePlantData);
               	eMpDs.removeAll();
               	eMpDs.loadData(eMpData);
               	eDeviceDs.removeAll();
               	eDeviceDs.loadData(eDeviceData);
              	excludeNodes = excludeNodes.substring(0,excludeNodes.length-1);
              	return excludeNodes;
            };  
            
            var checkedNodes = function(){
            	cAreaData=[[]];cPlantData=[[]];cMpData=[[]];cDeviceData=[[]];
            	var count = 0;
            	var areacount = 0;
            	var plantcount = 0;
            	var mpcount = 0;
            	var devicecount = 0;
            	var arr = new Array();
            	var checkedNodesForDisplay = "";
            	var checkedNodes = "";
            	var nodes = tree.getChecked() ;
            	for(var i=0;i<nodes.length;i++){
               		if(nodes[i].leaf||!nodes[i].isExpanded()){
               			var flag = true;
               			var n = getCheckedNodes(nodes[i]);
               			var ns = n.split(";");
               			for(var j=0;j<ns.length;j++){
               					n = ns[j];
               					var index = n.indexOf("&");
              					var pn = n.substring(0,index);
              					var nn = n.substring(index+1,n.length);
               					for(var k=0;k<arr.length;k++){
		              				if(pn==arr[k]){
			              				flag = false;
			              				break;	
		              				}
              					}
              					if(flag){
              						arr[count++] = pn;
              						var type = pn.split(":")[1];
              						var start = nn.indexOf("(");
              						var end = nn.indexOf(")");
              						var text = nn.substring(0,start);
              						var rw = nn.substring(start+1,end);
              						if(type=="area"){
               							cAreaData[0,areacount++]=[text,rw];
               						}else if(type=="plant"){
               							cPlantData[0,plantcount++]=[text,rw];
               						}else if(type=="mp"){
               							cMpData[0,mpcount++]=[text,rw];
               						}else if(type=="device"){
               							cDeviceData[0,devicecount++]=[text,rw];
               						}
              					}	
               			}
               		}	
               	}
               	cAreaDs.removeAll();
               	cAreaDs.loadData(cAreaData);
               	cPlantDs.removeAll();
               	cPlantDs.loadData(cPlantData);
               	cMpDs.removeAll();
               	cMpDs.loadData(cMpData);
               	cDeviceDs.removeAll();
               	cDeviceDs.loadData(cDeviceData);
               	return arr.join(";");
            };
            
            var getCheckedNodes = function(node){
           
            	var rw = 2;
             	var t = node.text;
                jQuery.noConflict();
                jQuery(t+"[type='radio']").each(function(){
               		if(jQuery(this).attr("checked")){
               			rw = jQuery(this).val();
               		}
               });
                
               var isEqual = false;
               var parentNode = node.parentNode;
               var pt = parentNode.text;
            	jQuery.noConflict();
                jQuery(pt+"[type='radio']").each(function(){
               		if(jQuery(this).attr("checked")){
               			if(rw == jQuery(this).val()){
               				isEqual = true;
               			}
               		}
               });
               var index = node.text.indexOf("[");
               text = node.text.substring(0,index-1);
            	var display = "";
            	if(rw==2){
            		
            		display = text+"(读) ";
            	}else if(rw==3){
            		display = text+"(写) ";
            	}
            	if(parentNode.getUI().isChecked()){
            		if(isEqual){
            			return	getCheckedNodes(parentNode);
            		}else{
            			return node.id+":"+node.attributes.type+":"+rw+"&"+display+";"+getCheckedNodes(parentNode);
            		}
               	}else{
               		return node.id+":"+node.attributes.type+":"+rw+"&"+display;
               	}
               	
            }   
   
   jQuery.noConflict();
    jQuery.getJSON(gdc.webContextRoot+"/dataSetPurview/findDataSetPurviews.action",{"dataSet.dataSetId":theId}, function(map){
       			
       			cAreaData=[[]];cPlantData=[[]];cMpData=[[]];cDeviceData=[[]];
       			eAreaData=[[]];ePlantData=[[]];eMpData=[[]];eDeviceData=[[]];
       			
       			
       			var cAreaArr = map["carea"].split("  ");
              	for(var i=0;i<cAreaArr.length-1;i++){
              		var start = cAreaArr[i].indexOf("[");
              		var end = cAreaArr[i].indexOf("]");
              		var text = cAreaArr[i].substring(0,start);
              		var rw = cAreaArr[i].substring(start+1,end);
              		cAreaData[0,i]=[text,rw];
              	}
       			
       			var cPlantArr = map["cplant"].split("  ");
              	for(var i=0;i<cPlantArr.length-1;i++){
              		var start = cPlantArr[i].indexOf("[");
              		var end = cPlantArr[i].indexOf("]");
              		var text = cPlantArr[i].substring(0,start);
              		var rw = cPlantArr[i].substring(start+1,end);
              		cPlantData[0,i]=[text,rw];
              	}
              	
              	var cMpArr = map["cmp"].split("  ");
              	for(var i=0;i<cMpArr.length-1;i++){
              		var start = cMpArr[i].indexOf("[");
              		var end = cMpArr[i].indexOf("]");
              		var text = cMpArr[i].substring(0,start);
              		var rw = cMpArr[i].substring(start+1,end);
              		cMpData[0,i]=[text,rw];
              	}
              	
              	var cDeviceArr = map["cdevice"].split("  ");
              	for(var i=0;i<cDeviceArr.length-1;i++){
              		var start = cDeviceArr[i].indexOf("[");
              		var end = cDeviceArr[i].indexOf("]");
              		var text = cDeviceArr[i].substring(0,start);
              		var rw = cDeviceArr[i].substring(start+1,end);
              		cDeviceData[0,i]=[text,rw];
              	}
              	
              	
              	
              	var eAreaArr = map["earea"].split("  ");
              	for(var i=0;i<eAreaArr.length-1;i++){
              		eAreaData[0,i]=[eAreaArr[i]];
              	}
              	
              	var ePlantArr = map["eplant"].split("  ");
              	for(var i=0;i<ePlantArr.length-1;i++){
              		ePlantData[0,i]=[ePlantArr[i]];
              	}
              	var eMpArr = map["emp"].split("  ");
              	for(var i=0;i<eMpArr.length-1;i++){
              		eMpData[0,i]=[eMpArr[i]];
              	}
              	var eDeviceArr = map["edevice"].split("  ");
              	for(var i=0;i<eDeviceArr.length-1;i++){
              		eDeviceData[0,i]=[eDeviceArr[i]];
              	}
              	
              	
              	cAreaDs.removeAll();
               	cAreaDs.loadData(cAreaData);
               	cPlantDs.removeAll();
               	cPlantDs.loadData(cPlantData);
               	cMpDs.removeAll();
               	cMpDs.loadData(cMpData);
               	cDeviceDs.removeAll();
               	cDeviceDs.loadData(cDeviceData);
               	
               	eAreaDs.removeAll();
               	eAreaDs.loadData(eAreaData);
               	ePlantDs.removeAll();
               	ePlantDs.loadData(ePlantData);
               	eMpDs.removeAll();
               	eMpDs.loadData(eMpData);
               	eDeviceDs.removeAll();
               	eDeviceDs.loadData(eDeviceData);
	});
   
});

  </script>  
</head>
<body>

<div id="tree-div"  style="height:380px;border:1px solid #c3daf9;">
</div>
</body>
</html>
