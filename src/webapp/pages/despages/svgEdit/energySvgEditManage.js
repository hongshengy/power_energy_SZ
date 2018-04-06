/**
 * 
 */
//查询值
var value = "";
//未配置测点的svg
var svgValue = "";
var consSearchId = "";
var consSelectAllCons = null;//所有的客户
var consSelectHistoryCons = null;//历史记录里的客户
var consSelectCon = null;//选中的客户
var g_yicituguanli = {
        isShowType: 0
    };

var data;
var pageSize=10;
var pageIndex=1;
var isFirstLoad
    $(document).ready(function () {
    	isFirstLoad=GetUrlParam("isFirstLoad");
    	if(isFirstLoad != "0"){
//    		$("#divTreeLeft").removeClass('hidden');
//    		$(".layout-panel-west").removeClass('hidden');  
    		$(".layout-split-west").css("display","");
    	}else if(isFirstLoad == "0"){
//            $('#body').layout('remove','west');
//    		$("#body").layout('remove','west');
//    		$(".panel .layout-panel .layout-panel-west .layout-split-west").addClass('hidden');
//    		$(".layout-split-west").css("display","none");
    		$("#body").layout("remove","west");
//    		IniGridView(value,svgValue);
    	}   	
    	$.ajax({
    		type : "post",
    		url : basePath + 'energySvgManage/queryEnergyConsNumber.action ',
    		dataType : "json",
    		success : function (count){
    			$("#ConsNumber").html(count[0].cout);
//    			$("#SubsNumber").html(count[1].cout);
//    			$("#UnSubsNumber").html(count[2].cout);
    			$("#UnSvgNumber").html(count[1].cout);
    			}
    	});
    	
    	$('#dialog2').dialog({
            title: '能效总览图配置管理',
            width: 20,
            height: 20,
            closed: true,
            modal: true,
            onOpen: function () {
                if (window.frames[0].location.href != 'about:blank'){
                	$('#dialog2').window('center').panel('close');
                }
            }
        });
    	//input1的初始化
        $('#input1').textbox({
            prompt: '输入快速检索的信息',
            width: 500,
            height: 36,
            iconWidth: 22,
            icons: [{
                iconCls:'icon-search',
                handler: function(e){
                    //$(e.data.target).textbox('setValue', 'Something added!');
                	searchDetail();
                }
            }]
        });
//    	$(document).keyup(function(event){
//    		//var consSelectText=$('#input1').textbox('getText');
//    		if(event.keyCode==13){
//    			searchDetail();
//    		}
//    	});
        $('#input1').textbox('textbox').keyup(function(event){
        	if(event.keyCode==13){
    			searchDetail();
    		}
        });
    	//未配置一次图超链接初始化
    	$("#UnSvgNumber").click(function(){
    		UnSvgNumber();
    	})
        //新增提交按钮的初始化
        $("#insertSvg").click(function(){
    		insertSvg();    		
    	});
        //新增取消按钮的初始化
        $("#quitSvg").click(function(){
        	quitSvg();    		
    	});
        //修改提交按钮的初始化
        $("#editSvg").click(function(){
        	editSvg();    		
    	});
        //修改取消按钮的初始化
        $("#quiteditSvg").click(function(){
        	quiteditSvg();    		
    	});
        //搜索框初始化
        $('#txt_search').textbox({
            border: false,
            width: '100%',
            icons: [{
                iconCls:'icon-search',
                handler: function(e){
                }
            }]
        })
        
        if(consId==null || consId==''|| consId=="null"){
        	if(isFirstLoad == "0"){   		  
      	  }else{
      		  consSelectMethod = "consSelectMethodLoad()";//定义选中后执行的方法
          	  consSelectHasRoot = true;//是否有区域能源根节点
          	  consSelectSearch("",true);
          	  $($("#cons_quickSearch_window1_history").next()[0]).css("right","100px");
        	  $($("#cons_quickSearch_window2_history").next()[0]).css("right","100px");
        	  $($("#cons_quickSearch_window1_logo").next()[0]).css("height","36px");
        	  $($("#cons_quickSearch_window2_input").parent()).css("height","36px");
      	  } 
        } 

      /**
       * 客户树加载
       */  
//      $('#tree1').tree({
//		url : basePath + 'destree/queryTree.action',
//		method : 'get',
//		multiple : true,// 是否支持多选
//		onClick : function(node) {
//			var consName = node.text;
//			treeNodeType = node.type;
//			if (treeNodeType == '0') {// 区域能源节点
//				consName = "";
//			}
//			svgValue = "";
//			IniGridView(consName,svgValue);
//		},
//		onLoadSuccess : function(node) {
//			selectTree();
//		}
//	});
        
      //树模糊检索
        if(isFirstLoad!=0){
        	searchTreeNode();
        }
        /**
         * 初始化输入框
         */
        $('#input-name, #input-sort,#svgName,#svgOrder').textbox({
            width: '100%',
            required: true
        });
        /**
         * 自适应
         */
        var height = document.documentElement.clientHeight;
        height -= 110;
        height = height < 100 ? 100 : height;
        $('#grid-panel').panel({
            cls: 'panel-shadow',
            height: height
        });
        /**
         * datagrid初始化
         */
        $('#yctgl-girdDetailView').datagrid({
        	fitColumns: true,
            singleSelect: true,
            pagination:true,
            columns: [[             
                {field: 'consNo', title: '客户编号', width: 60},
                {field: 'consName', title: '客户名称', width:100},
//                {field: 'countunsubs', title: '未绘制用户变总数', width: 50},
                {field: 'countsvg', title: '未配置能效总览图总数', width: 60},
            ]]
        });
//        IniGridView(value,svgValue);
        /**
         * 加载datagrid
         */
      	 $('#yctgl-girdDetailView').datagrid({
         	url:basePath+ 'energySvgManage/queryEnergyDetail.action',       	        	
     		loadMsg:'正在加载，请稍等……',//加载时显示提示
     		rownumbers:true,
     		fit:true,
     		fitColumns:true,
     		striped: true,
     		singleSelect: true,
     		pagination:true,
     		pageSize: 10,
     		pageList : [10,20,50],
             view: detailview,
             detailFormatter: function (rowIndex, rowData) {
             	if(rowData.svgList.length>0){
             		var strDetail="";
             		var indexRow=0;
             		for(var i=0,len=rowData.svgList.length;i<len;i++){
             			if(i==0 || rowData.svgList[i].userTranId!=rowData.svgList[i-1].userTranId){
             				indexRow++;
             				var svgId = "svg"+rowIndex;
             				strDetail+= "<div class='detailview-panel'>" +
                             "<div class='detailitem'>" +
                             "<div class='item-title' style='height:28px'><span class='add' id='"+svgId+"' gridIndex='"+ rowIndex + "' onclick=\"openDetail('"+rowData.consName+"','"+rowData.svgList[i].userTranId+"')\" >＋</span></div>" +
                             "<div class='yct-list'>" ;
             			}
             			switch(rowData.svgList[i].typeValue){
             			case "1":
             				strDetail+= "<div class='yct-item-block undraw'>" +
                             "<div class='content'><span title='"+rowData.svgList[i].svgName+"'>"+rowData.svgList[i].svgName+"</span></div>" +
                             "<div class='float-tool-block'><span class='icon-block edit' title='编辑' onclick=\"edit('"+rowData.consName+"','"+rowData.svgList[i].svgId+"','"+rowData.svgList[i].svgName+"','"+rowData.svgList[i].svgOrder+"')\"></span><span class='icon-block config' title='配置能效总览图' onclick=\"peizhi('"+rowData.consId+"','"+rowData.consName+"','"+rowData.svgList[i].userTranId+"','"+rowData.svgList[i].subsName+"','"+rowData.svgList[i].svgId+"','"+rowData.svgList[i].svgName+"','"+rowData.svgList[i].svg+"')\"></span><span class='icon-block close' title='删除' onclick=\"deleteSvg('"+rowData.svgList[i].svgId+"')\"></span></div>" +
                             "</div>" ;
             				break;
             			case "2":
             				strDetail+="<div class='yct-item-block unconfig'>" +
                             "<div class='content'><span title='"+rowData.svgList[i].svgName+"'>"+rowData.svgList[i].svgName+"</span></div>" +
                             "<div class='float-tool-block'><span class='icon-block edit' title='编辑' onclick=\"edit('"+rowData.consName+"','"+rowData.svgList[i].svgId+"','"+rowData.svgList[i].svgName+"','"+rowData.svgList[i].svgOrder+"')\"></span><span class='icon-block config' title='配置能效总览图' onclick=\"peizhi('"+rowData.consId+"','"+rowData.consName+"','"+rowData.svgList[i].userTranId+"','"+rowData.svgList[i].subsName+"','"+rowData.svgList[i].svgId+"','"+rowData.svgList[i].svgName+"','"+rowData.svgList[i].svg+"')\">"+
                             "</span><span class='icon-block close' title='删除' onclick=\"deleteSvg('"+rowData.svgList[i].svgId+"')\"></span></div>" +
                             "</div>";
             				break;
             			case "3":
             				strDetail+= "<div class='yct-item-block config'>" +
                             "<div class='content'><span title='"+rowData.svgList[i].svgName+"'>"+rowData.svgList[i].svgName+"</span></div>" +
                             "<div class='float-tool-block'><span class='icon-block edit' title='编辑' onclick=\"edit('"+rowData.consName+"','"+rowData.svgList[i].svgId+"','"+rowData.svgList[i].svgName+"','"+rowData.svgList[i].svgOrder+"')\"></span><span class='icon-block config' " +
                             		"title='配置能效总览图' onclick=\"peizhi('"+rowData.consId+"','"+rowData.consName+"','"+rowData.svgList[i].userTranId+"','"+rowData.svgList[i].subsName+"','"+rowData.svgList[i].svgId+"','"+rowData.svgList[i].svgName+"','"+rowData.svgList[i].svg+"')\">" +
                             		//"onclick=openSendWorker('"+rowData.consId+"','"+rowData.consName+"','"+rowData.svgList[i].userTranId+"','"+rowData.svgList[i].subsName+"','"+rowData.svgList[i].svgId+"','"+rowData.svgList[i].svgName+"')>"+
                             		"</span><span class='icon-block close' title='删除' onclick=\"deleteSvg('"+rowData.svgList[i].svgId+"')\"></span></div>" +
                             "</div>";
             				break;
             			} 
             			if(i==rowData.svgList.length-1||rowData.svgList[i].subsName!=rowData.svgList[i+1].subsName){
             				strDetail+= "</div></div></div>";
             			}     
                         	
             		}
             		 return strDetail;
             	}
               
             },
             onLoadSuccess: function (data) {               
//                 $('.icon-block.edit').click(function () {
//                     openDetailItemWindow(2);
//                 });
                 //$(this).datagrid('expandRow', 0);
             	$('.icon-block.config').click(function () {
                     if (g_yicituguanli.isShowType == 0){
//                    	 window.location.href=basePath+"pages/despages/energySvgEdit/svgEdit.jsp?consId="+consId+"_"+userTranId+"_"+svgId+"_"+consName+"_"+subsName+"_"+svgName+"_"+svg;
                     }else{                    	
                         //为1时，表示当前为弹窗选择状态
//                     	window.location.href=basePath+"pages/despages/energySvgEdit/svgEdit.jsp?consId="+consId+"_"+userTranId+"_"+svgId+"_"+consName+"_"+subsName+"_"+svgName+"_"+svg;
                     }
                 });
             	$(this).datagrid('expandRow', 0);
//             	if(data.rows.length == "1"){
//                 	$('#tree1').tree('check',data.rows[0].consId);
//             	}
             },
             onDblClickRow: function (rIndex) {
                 var row = $(this).datagrid('getExpander', rIndex);
                 //收缩时展开，展开时收缩
                 if (row.prop('class').lastIndexOf('datagrid-row-expand')){
                     $(this).datagrid('expandRow', rIndex);
                     $(".yct-item-block.undraw").css("background-color","#ffffff");
                	 $(".yct-item-block.undraw").css("border-color","#ddddc5");
                	 
                	 $(".yct-item-block.unconfig").css("background-color","#eec832");
                	 $(".yct-item-block.unconfig").css("border-color","#cdac2b");
                	 
                	 $(".yct-item-block.config").css("background-color","#5ce4a7");
                	 $(".yct-item-block.config").css("border-color","#54d098");
                 }else if(row.prop('class').lastIndexOf('datagrid-row-collapse')){
                     $(this).datagrid('collapseRow', rIndex);
                 }
             },onExpandRow:function(rowIndex, rowData){//点击+号展现
            	 $(".yct-item-block.undraw").css("background-color","#ffffff");
            	 $(".yct-item-block.undraw").css("border-color","#ddddc5");
            	 
            	 $(".yct-item-block.unconfig").css("background-color","#eec832");
            	 $(".yct-item-block.unconfig").css("border-color","#cdac2b");
            	 
            	 $(".yct-item-block.config").css("background-color","#5ce4a7");
            	 $(".yct-item-block.config").css("border-color","#54d098");

             }
         });
       
       
		/**
		 * 新增弹框
		 */
        $('#dialog1').dialog({
            title: '新增能效总览图',
            width: 460,
            closed: true,
            modal: true,
            buttons: '#buttons'
        });
        /**
         * 修改弹框
         */
        $('#Editdialog').dialog({
            title: '修改能效总览图',
            width: 460,
            closed: true,
            modal: true,
            buttons: '#buttons1'
        });
        //动画方式弹出/收缩左侧面板
        var isExpend = true;
        $('.float-tree-panel').css({"left" : "-175px"});
        $('.float-tree-panel .content').css({"display" : "none"});
        var $collage = $('.float-tree-panel .collage');

        $collage.click(function () {
            if ($collage.prop('class') == 'collage layout-button-right'){
                $('.float-tree-panel').animate({
                    left: "0"
                }, 500 );
                $('.float-tree-panel .content').animate({
                    opacity: 'show'
                }, 500 );
                $(this).removeClass("layout-button-right");
                $(this).addClass("layout-button-left");
            }else{
                $('.float-tree-panel').animate({
                    left: "-175px"
                }, 500 );
                $('.float-tree-panel .content').animate({
                    opacity: 'hide'
                }, 500 );
                $(this).removeClass("layout-button-left");
                $(this).addClass("layout-button-right");
            }
        });  
        
    	/***
    	 * 导航查询
    	 */
//    	$('#txt_search').combobox({
//    		url : basePath + 'destree/queryTree.action?isQyCode=false&ziMu=',
//    		valueField : 'id',
//    		textField : 'text',
//    		onChange : function(newValue, oldValue) {
//    			if (isNaN(newValue)) {
//    				newValue = $('#txt_search').combobox('getText');
//    				$.getJSON(basePath+ 'destree/queryTree.action?isQyCode=false&treeState=false&ziMu='+ newValue, {},
//    						function(json) {$('#txt_search').combobox('loadData',json);});
//    			}else{
//    				newValue = $('#txt_search').combobox('getText');
//    				$.getJSON(basePath+ 'destree/queryTree.action?isQyCode=false&treeState=false&ziMu=',{}, function(json) {
//    					$('#txt_search').combobox('loadData',json);}); 
//    				var consId = $('#consSelect').combobox('getValue');
//    				$('#tree1').tree('check',consId);
//    			}
//    		},
//    		onLoadSuccess : function(node) {
////    			$("a").removeClass("combo-arrow");
//    			selectTree(node.id);//设置树默认选中节点
//    			alert(node.text);
//    		}
//    	});
    	/***
    	 * 导航查询，按enter键，树节点选中
    	 */
//    	$(document).keyup(function(event){
//    		var consSelectText=$('#txt_search').combobox('getText');
//    		var treeleftroot=$('#tree1').tree('getRoots');
//    		if(event.keyCode==13 && consSelectText!=""){
//    			if (treeleftroot.length > 0
//    					&& treeleftroot[0].children.length > 0) {
//    				var isExistroot=0;
//    				for(var i=0,len=treeleftroot[0].children.length;i<len;i++){
//    					if(treeleftroot[0].children[i].text==consSelectText){
//    						$("#"+treeleftroot[0].domId).removeClass("tree-node-selected");
//    						$("#"+treeleftroot[0].children[i].domId).addClass("tree-node-selected");
//    						isExistroot=1;
//    					}
//    				}
//    				if(isExistroot==1){
//    					for(var i=0,len=treeleftroot[0].children.length;i<len;i++){
//    						if(treeleftroot[0].children[i].text!=consSelectText){
//    							$("#"+treeleftroot[0].domId).removeClass("tree-node-selected");
//    							$("#"+treeleftroot[0].children[i].domId).removeClass("tree-node-selected");
//    						}
//    					}
//    				}
//    			}
//    		}
//    	});
//    	
//        
    });

	function consSelectMethodLoad(){
		if(consSelectCon.id.length < 4){	// 区域能源节点
			$("#clickTree").hide();
			$("#contentId").show();
			content='<iframe id="funcId" src="'+webContextRoot+'pages/despages/projectManage/tranOverview.jsp?orgNo='+consSelectCon.id+'" scrolling="no" frameborder="0" width="100%" height="100%"></iframe>'; 
			$("#contentId").empty();
			$('#contentId').append(content);
			value="";
			svgValue="";
			consSearchId="";
			IniGridView(value,svgValue,consSearchId)
		}else{		// 企业节点
			$("#contentId").hide();
			$("#clickTree").show();
			consId = consSelectCon.id;//把树节点id赋给企业id
			consName = "";//把树节点的值赋给企业名称    			
			IniGridView(consName,svgValue,consId);
		}
	} 
    var oldSelect="";
    var isSelectTree=false;

    function searchTreeNode(){

        /*
       	 * 导航查询
       	 */
       	$('#CobConsSelect').combobox({
       		valueField : 'id',
       		textField : 'text',
       		panelWidth:190,
       		panelMaxHeight:190,
       		onSelect:function(rec){
       			if(rec.id!=''&& rec.id != oldSelect){
       				$('#consSelect').textbox('setText',rec.rootName);
       	   		    oldSelect = rec.id;
       	   			$('#CobConsSelect').combobox('setValue','');
       			}
       		},
       		onLoadSuccess : function(node) {
//       			$("a").removeClass("combo-arrow");
       		}
       	});
        	
//    	$("a").removeClass("combo-arrow");
//    	$('#CobConsSelect').textbox('textbox').keydown(function (e) {
//    		if(e.keyCode==13)
//    		{
//    			isSelectTree=true;
//    			selectTree($('#CobConsSelect').combobox("getValue"),$('#CobConsSelect').combobox("getText"));
//    		}
//    	});
    	 
    	 //下拉点击
//    	$('#CobConsSelect').combobox("panel").click(function(){
//    		isSelectTree=true;
//    		selectTree($('#CobConsSelect').combobox("getValue"),$('#CobConsSelect').combobox("getText"));
//    	});
    	
//    	$('#consSelect').textbox('textbox').keyup(function (e) {
//           if (e.keyCode == 38||e.keyCode == 40){//上下选择键
//        	   $('#CobConsSelect').combobox('textbox').focus();
//        	   isSelectTree=false;
//        	   if($('#CobConsSelect').combobox("getValue").length<=0){
//        		    var byqData = $('#CobConsSelect').combobox("getData");
//    	   			if(byqData.length>0){
//    	   				$('#CobConsSelect').combobox('select',byqData[0].id);
//    	   			}else{
//    	   				$('#CobConsSelect').combobox('select','');
//    	   			}
//        	   }
//        	  
//    		} else {
//    			var newValue = $('#consSelect').textbox('getText');
//    			$.getJSON(basePath+ 'destree/queryTree.action?isQyCode=false&ziMu='+ newValue, {},
//    			function(json) 
//    			{
//    		       $('#CobConsSelect').combobox('loadData',json);
//    		       $('#CobConsSelect').combobox('showPanel');
//    		       $('#CobConsSelect').combobox('setValue','');
//    		       
//    		    });
//    		}
//    	});
    }
/*    	function selectTree(nodeId,nodeText){
    		if(nodeId == undefined){
    			var treeleftroot=$('#tree1').tree('getRoots');
    	    	$("#"+treeleftroot[0].domId).addClass("tree-node-selected");
    		}else{
          	   	var n = $('#tree1').tree("find",nodeId);//根据id获取节点
          	   	$('#tree1').tree('select',n.target);//选中节点
          	   	$('#tree1').tree('scrollTo',n.target);//滚动到节点
          	  svgValue = "";
          	  IniGridView(nodeText,svgValue);
    		}
    		
    	}*/
    //模糊查询
    function searchDetail(){
    	var value = $.trim($('#input1').textbox("getText"));
    	svgValue = "";
    	consSearchId = "";
    	IniGridView(value,svgValue,consSearchId);
    }

    /**
     * datagrid传参数加载
     * @param value
     * @param svgValue
     */
    function IniGridView(value,svgValue,id){
    	$('#yctgl-girdDetailView').datagrid("loadData",{total:0,rows:[]});
    	$('#yctgl-girdDetailView').datagrid('load',{
    		value:value,
    		svgValue:svgValue,
    		consId:id
    	});
   }
//点击事件    
    function openDetail(consName,userTranId){
    	openDetailItemWindow(consName,userTranId);
    }
//打开新建能效图弹框    
    function openDetailItemWindow(consName,userTranId){
    	$('#dialog1').window('center').panel('open');    
    	$("#consName").html(consName);
    	$("#energyUserId").val(userTranId);
    	$("#input-name").textbox('setValue',"");
    	$("#input-sort").textbox('setValue',"");
    	$("#input-name").textbox("textbox").focus();
    }
//点击确认按钮
    function insertSvg(){
    	var svgName = $("#input-name").textbox("getText");
    	var svgOrder = $("#input-sort").textbox("getText");
    	if (svgName == ""){
    		$.messager.alert('提示', "名称不能为空！", 'warning');// 移除失败
    		return;
    		}else if(svgOrder==""){
    			$.messager.alert('提示', "排序不能为空！", 'warning');// 移除失败
        		return;
    		}else if(parseInt(svgOrder)!= svgOrder){
    			$.messager.alert('提示', "排序必须为整型！", 'warning',function()
    					{

    				 $("#input-sort").textbox("textbox").focus();
    					});// 移除失败
    			return;
    		}else if(svgName.length>200){
    			$.messager.alert('提示', "能效总览图名称过长，不能超过200！", 'warning',function()
    					{

    				 $("#input-name").textbox("textbox").focus();
    					});// 移除失败
    			return;
    		}else if(svgOrder.length>16){
    			$.messager.alert('提示', "排序过长，不能超过16！", 'warning',function()
    					{

    				 $("#input-sort").textbox("textbox").focus();
    					});// 移除失败
    			return;
    		}
    	$.getJSON(basePath + 'energySvgManage/AddEnergySvg.action', {
    		'subSvgModel.svgId' : "",
    		'subSvgModel.userTranId' : $("#energyUserId").val(),
    		'subSvgModel.svgName' : $("#input-name").textbox("getText"),
    		'subSvgModel.svgOrder' : $("#input-sort").textbox("getText"),
    		'subSvgModel.svgType' : '1'

    	}, function(json) {
    		if (json.saveSUCCESS == "true") {
    			$('#dialog1').window('center').panel('close');
    			$.messager.alert('提示', "保存成功！", 'info', function(r) {
    				$('#yctgl-girdDetailView').datagrid('reload'); 
    				$.ajax({
    		    		type : "post",
    		    		url : basePath + 'energySvgManage/queryEnergyConsNumber.action',
    		    		dataType : "json",
    		    		success : function (count){
    		    			$("#ConsNumber").html(count[0].cout);
//    		    			$("#SubsNumber").html(count[1].cout);
//    		    			$("#UnSubsNumber").html(count[2].cout);
    		    			$("#UnSvgNumber").html(count[1].cout);
    		    			}
    		    	});
    			});
    		} else {
    			$.messager.alert('提示', "保存失败！", 'warning');// 移除失败
    		}
    	});
    }
//点击取消按钮
    function quitSvg(){
    	$("#input-name").textbox('setValue',"");
    	$("#input-sort").textbox('setValue',"");
    	$('#dialog1').window('center').panel('close');
    }
//修改按钮事件
    function edit(consName,svgId,svgName,svgOrder){
    	$('#Editdialog').window('center').panel('open');
    	$("#cName").html(consName);
//    	$("#sName").html(subsName);
    	$("#svgId").html(svgId);
    	$("#svgName").textbox('setValue',svgName);
    	$("#svgOrder").textbox('setValue',svgOrder);
    }
//修改保存按钮事件
    function editSvg(){
    	var svgId = $("#svgId").html();
    	var svgName = $("#svgName").textbox('getValue');
    	var svgOrder = $("#svgOrder").textbox('getValue');
    	if (svgName == ""){
    		$.messager.alert('提示', "名称不能为空！", 'warning');// 移除失败
    		return;
    		}else if(svgOrder==""){
    			$.messager.alert('提示', "排序不能为空！", 'warning');// 移除失败
        		return;
    		}else if(parseInt(svgOrder)!= svgOrder){
    			$.messager.alert('提示', "排序必须为整型！", 'warning',function()
    					{

    				 $("#svgOrder").textbox("textbox").focus();
    					});// 移除失败
    			return;
    		}else if(svgName.length>200){
    			$.messager.alert('提示', "能效总览图名称过长，不能超过200！", 'warning',function()
    					{

    				 $("#svgName").textbox("textbox").focus();
    					});// 移除失败
    			return;
    		}else if(svgOrder.length>16){
    			$.messager.alert('提示', "排序过长，不能超过16！", 'warning',function()
    					{

    				 $("#svgOrder").textbox("textbox").focus();
    					});// 移除失败
    			return;
    		}
    	$.ajax({
    		type : "post",
    		url : basePath + 'energySvgManage/updateEnergySvg.action',
    		dataType : "json",
    		data : {
    			'svgId' : svgId,
    			'svgName' : svgName	,
    			'svgOrder' : svgOrder
    		},
    		success : function(data) {		
    			if (data.saveSUCCESS == "true") {
    				$('#Editdialog').window('close');
    				$.messager.alert('提示', "修改成功！", 'info', function(r) {
        				$('#yctgl-girdDetailView').datagrid('reload');  
    				});

    			} else {
    				$.messager.alert('提示', "修改失败！", 'warning');// 移除失败	
    			}
    		}
    	});
    }
//点击取消按钮事件
    function quiteditSvg(){
    	$('#Editdialog').window('close');
    }
//删除能效总览图
    function deleteSvg(svgId){
    	$.messager.confirm('提示', "确定删除吗?", function(r){
    		if(r){
    			$.ajax({
    				type : "post",
    				url : basePath + 'energySvgManage/deleteEnergySvg.action',
    				dataType : "json",
    				data : {
    					'svgId' : svgId
    				},
    				success : function(data) {		
    					if (data.saveSUCCESS == "true") {
    						//$("#divDelete").window('close');
    						$.messager.alert('提示', "删除成功！", 'info', function(r) {
    		    				$('#yctgl-girdDetailView').datagrid('reload'); 
    		    				$.ajax({
    		    		    		type : "post",
    		    		    		url : basePath + 'energySvgManage/queryEnergyConsNumber.action',
    		    		    		dataType : "json",
    		    		    		success : function (count){
    		    		    			$("#ConsNumber").html(count[0].cout);
//    		    		    			$("#SubsNumber").html(count[1].cout);
//    		    		    			$("#UnSubsNumber").html(count[2].cout);
    		    		    			$("#UnSvgNumber").html(count[1].cout);
    		    		    			}
    		    		    	});
    						});
//    						QuerySvgNameById(userTranId);
    					} else {
    						//$("#divDelete").window('close');
    						$.messager.alert('提示', "删除失败！", 'warning');// 移除失败	
    					}
    				}
    			});
    		}
    	});
    }

/**
 * 配置能效图页面
 * @param consId
 * @param consName
 * @param userTranId
 * @param subsName
 * @param svgId
 * @param svgName
 * @param svg
 */   
    function peizhi(consId,consName,userTranId,subsName,svgId,svgName,svg){
    	if(g_yicituguanli.isShowType == 0){
//    		$("#divTreeLeft").addClass('hidden');
//    		$(".layout-panel-west").addClass('hidden'); 
//    		$(".layout-split-west").css("display","none")
    		window.location.href=basePath+'pages/despages/svgEdit/energySvgEdit.jsp?consId='+escape(consId)+'&consName='+escape(consName)+'&userTranId='+escape(userTranId)+'&subsName='+escape(subsName)+'&svgId='+escape(svgId)+'&svgName='+escape(svgName)+'&svgFile='+escape(svg);
//    		$(".panel .layout-panel .layout-panel-west .layout-split-west").addClass('hidden');   	    		
    	}else{
    		parent.ConsIni(consName,consId,subsName,userTranId,svgId,svgName,svg);    		
    		parent.$('#dialog2').window('close'); 
    	}    	   	
    }
    
//未配置一次图超连接点击事件
    function UnSvgNumber(){
    	value = "";
    	svgValue = "1";
    	consSearchId = "";
    	IniGridView(value,svgValue,consSearchId);
//    	var n = $('#tree1').tree('getSelected');//获取被选中的节点
//    	if(n!=null)//判断节点是否存在
//    	{
//    		var id = n.rootId;
//    		var w = $('#tree1').tree("find",id);//根据id获取节点
//    		$("#"+w.domId).removeClass("tree-node-selected");
//    		//$('#tree1').tree('uncheck',w.target);
////    		var chiNode = $('#tree1').tree('getChildren',n.target);//子节点
//    		
//    	}
//
//    	var treeleftroot=$('#tree1').tree('getRoots');
//    	$("#"+treeleftroot[0].domId).addClass("tree-node-selected");
//    	//$('#tree1').tree('check', 0);

    }   	    
    /*-----------------------------------------------------------------------------------------*\
     * 函数:          客户端获取路径参数值的函数
     * 参数:          name -- 需要获取的路径参数的参数名
     * 返回值:        路径参数传递的具体值
     * 创建人:        郭庆春。
     * 创建日期:      2015-06-1。
     * 最后修改日期:  2015-06-1。
     \*-----------------------------------------------------------------------------------------*/
    function GetUrlParam(name) {

    	var strHref = document.location.href;
    	var intPos = strHref.indexOf("?");
    	var strRight = strHref.substr(intPos + 1);
    	var arrTmp = strRight.split("&");
    	for (var i = 0; i < arrTmp.length; i++) {
    		var arrTemp = arrTmp[i].split("=");
    		if (arrTemp[0].toUpperCase() == name.toUpperCase())
    			// var area=unescape(arrTemp[1]);
    			// var returnValue=$.parseJSON(area);
    			return unescape(arrTemp[1]); // unescape decodeURI
    	}
    	return null;

    }
