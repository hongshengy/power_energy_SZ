/**
 * 
 */

var g_yicituguanli = {
        isShowType: 0
    };

var value = "";
var unValue = "";
var svgValue = "";
var consSearchId = "";
var consSelectAllCons = null;//所有的客户
var consSelectHistoryCons = null;//历史记录里的客户
var consSelectCon = null;//选中的客户
//获取客户总数，用户变总数，未绘制用户变总数，未配置一次图总数
//$(function (){
//	$.ajax({
//		type : "post",
//		url : basePath + 'svg/getConsNumber.action',
//		dataType : "json",
//		success : function (count){
//			$("#ConsNumber").html(count[0].cout);
//			$("#SubsNumber").html(count[1].cout);
//			$("#UnSubsNumber").html(count[2].cout);
//			$("#UnSvgNumber").html(count[3].cout);
//			}
//	});
//});

var data;

var pageSize=10;
var pageIndex=1;
    $(document).ready(function () {
    	var isFirstLoad=GetUrlParam("isFirstLoad");
    	if(isFirstLoad != "0"){
    		$("#divTreeLeft").removeClass('hidden');
    	
    	}else if(isFirstLoad == "0"){
    		$("#body").layout("remove","west");
    	}
    	
    	$.ajax({
    		type : "post",
    		url : basePath + 'svgManage/getConsNumber.action',
    		dataType : "json",
    		success : function (count){
    			$("#ConsNumber").html(count[0].cout);
    			$("#SubsNumber").html(count[1].cout);
    			$("#UnSubsNumber").html(count[2].cout);
    			$("#UnSvgNumber").html(count[3].cout);
    			}
    	});
    	
    	$('#dialog2').dialog({
            title: '一次图配置管理',
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
//			unValue = "";
//			svgValue = "";
//			IniSvgView(consName,unValue,svgValue);
//		},
//		onLoadSuccess : function(node) {
//			selectTree();
//		}
//	});
        
      //树模糊检索
        if(isFirstLoad!=0){
        	searchTreeNode();
        }
        
        $('#input-name, #input-sort,#svgName,#svgOrder').textbox({
            width: '100%',
            required: true
        });

        var height = document.documentElement.clientHeight;
        height -= 110;
        height = height < 100 ? 100 : height;
        $('#grid-panel').panel({
            cls: 'panel-shadow',
            height: height
        });

        $('#yctgl-girdDetailView').datagrid({
        	fitColumns: true,
            singleSelect: true,
            pagination:true,
            columns: [[
                {field: 'consNo', title: '客户编号', width:100},
                {field: 'consName', title: '客户名称', width:100},
                {field: 'countsubs', title: '用户变总数', width: 100},
                {field: 'countunsubs', title: '未绘制用户变总数', width: 50},
                {field: 'countsvg', title: '未配置一次图总数', width: 60},
            ]]
        });
        
        /*var p = $('#yctgl-girdDetailView').datagrid('getPager');
        $(p).pagination({
        	pageSize:10,//每页显示的记录条数
        	pageList:[5,10,15],//可以设置每页记录条数的列表
        	beforePagetext:'第',//页数文本框前显示的汉字
        	afterPageTest:'页 共{pages}页',
        	displayMsg:'当前显示{from}-{to}条记录 共{total}条记录',
        })*/
        

       /* $('#yctgl-girdDetailView').datagrid({
    		url : basePath + 'svg/getAllNumber.action',
        });*/
        $('#yctgl-girdDetailView').datagrid({        	
        	url:basePath+ 'svgManage/getSingleConsNumber.action',       	        	
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
            			
            			if(i==0|| rowData.svgList[i].subsName!=rowData.svgList[i-1].subsName){
            				indexRow++;
            				var svgId = "svg"+rowIndex;
            				strDetail+= "<div class='detailview-panel'>" +
                            "<div class='detailitem'>" +
//                            "<div class='item-title'>"+rowData.svgList[i].subsName+"<span class='add' id='"+svgId+"' gridIndex='"+ rowIndex + "' onclick='open("+rowData.consName+","+rowData.svgList[i].subsName+","+rowData.svgList[i].userTranId+")'>＋</span></div>" +
                            "<div class='item-title'>"+(indexRow+"、"+rowData.svgList[i].subsName)+"<span class='add' id='"+svgId+"' gridIndex='"+ rowIndex + "' onclick=\"openDetail('"+rowData.consName+"','"+rowData.svgList[i].subsName+"','"+rowData.svgList[i].userTranId+"')\" >＋</span></div>" +
                            "<div class='yct-list'>" ;
            			}
            			switch(rowData.svgList[i].typeValue){
            			case "1":
            				strDetail+= "<div class='yct-item-block undraw'>" +
                            "<div class='content'><span title='"+rowData.svgList[i].svgName+"'>"+rowData.svgList[i].svgName+"</span></div>" +
                            "<div class='float-tool-block'><span class='icon-block edit' title='编辑' onclick=\"edit('"+rowData.consName+"','"+rowData.svgList[i].subsName+"','"+rowData.svgList[i].svgId+"','"+rowData.svgList[i].svgName+"','"+rowData.svgList[i].svgOrder+"')\"></span><span class='icon-block config' title='配置一次图' onclick=\"peizhi('"+rowData.consId+"','"+rowData.consName+"','"+rowData.svgList[i].userTranId+"','"+rowData.svgList[i].subsName+"','"+rowData.svgList[i].svgId+"','"+rowData.svgList[i].svgName+"','"+rowData.svgList[i].svg+"')\"></span><span class='icon-block close' title='删除' onclick=\"deleteSvg('"+rowData.svgList[i].userTranId+"','"+rowData.svgList[i].svgId+"')\"></span></div>" +
                            "</div>" ;
            				break;
            			case "2":
            				strDetail+="<div class='yct-item-block unconfig'>" +
                            "<div class='content'><span title='"+rowData.svgList[i].svgName+"'>"+rowData.svgList[i].svgName+"</span></div>" +
                            "<div class='float-tool-block'><span class='icon-block edit' title='编辑' onclick=\"edit('"+rowData.consName+"','"+rowData.svgList[i].subsName+"','"+rowData.svgList[i].svgId+"','"+rowData.svgList[i].svgName+"','"+rowData.svgList[i].svgOrder+"')\"></span><span class='icon-block config' title='配置一次图' onclick=\"peizhi('"+rowData.consId+"','"+rowData.consName+"','"+rowData.svgList[i].userTranId+"','"+rowData.svgList[i].subsName+"','"+rowData.svgList[i].svgId+"','"+rowData.svgList[i].svgName+"','"+rowData.svgList[i].svg+"')\">"+
                            "</span><span class='icon-block close' title='删除' onclick=\"deleteSvg('"+rowData.svgList[i].userTranId+"','"+rowData.svgList[i].svgId+"')\"></span></div>" +
                            "</div>";
            				break;
            			case "3":
            				strDetail+= "<div class='yct-item-block config'>" +
                            "<div class='content'><span title='"+rowData.svgList[i].svgName+"'>"+rowData.svgList[i].svgName+"</span></div>" +
                            "<div class='float-tool-block'><span class='icon-block edit' title='编辑' onclick=\"edit('"+rowData.consName+"','"+rowData.svgList[i].subsName+"','"+rowData.svgList[i].svgId+"','"+rowData.svgList[i].svgName+"','"+rowData.svgList[i].svgOrder+"')\"></span><span class='icon-block config' " +
                            		"title='配置一次图' onclick=\"peizhi('"+rowData.consId+"','"+rowData.consName+"','"+rowData.svgList[i].userTranId+"','"+rowData.svgList[i].subsName+"','"+rowData.svgList[i].svgId+"','"+rowData.svgList[i].svgName+"','"+rowData.svgList[i].svg+"')\">" +
                            		//"onclick=openSendWorker('"+rowData.consId+"','"+rowData.consName+"','"+rowData.svgList[i].userTranId+"','"+rowData.svgList[i].subsName+"','"+rowData.svgList[i].svgId+"','"+rowData.svgList[i].svgName+"')>"+
                            		"</span><span class='icon-block close' title='删除' onclick=\"deleteSvg('"+rowData.svgList[i].userTranId+"','"+rowData.svgList[i].svgId+"')\"></span></div>" +
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
//                $('.icon-block.edit').click(function () {
//                    openDetailItemWindow(2);
//                });
                //$(this).datagrid('expandRow', 0);
            	$('.icon-block.config').click(function () {
                    if (g_yicituguanli.isShowType == 0){
                    	
                    }else{                    	
                        //为1时，表示当前为弹窗选择状态
                    	//window.location.href=basePath+"pages/despages/svgEdit/svgEdit.jsp?consId="+consId+"_"+userTranId+"_"+svgId+"_"+consName+"_"+subsName+"_"+svgName+"_"+svg;
                    }
                });
            	$(this).datagrid('expandRow', 0);
            },
            onDblClickRow: function (rIndex) {
                var row = $(this).datagrid('getExpander', rIndex);
                //收缩时展开，展开时收缩
                if (row.prop('class').lastIndexOf('datagrid-row-expand')){
                    $(this).datagrid('expandRow', rIndex);
                }else if(row.prop('class').lastIndexOf('datagrid-row-collapse')){
                    $(this).datagrid('collapseRow', rIndex);
                }
            }
        });
		
        $('#dialog1').dialog({
            title: '新增一次图',
            width: 400,
            closed: true,
            modal: true,
            buttons: '#buttons'
        });

        $('#Editdialog').dialog({
            title: '修改一次图',
            width: 400,
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
//    				$.getJSON(basePath+ 'destree/queryTree.action?isQyCode=false&ziMu='+ newValue, {},
//    						function(json) {$('#txt_search').combobox('loadData',json);});
//    			}else{
//    				newValue = $('#txt_search').combobox('getText');
//    				$.getJSON(basePath+ 'destree/queryTree.action?isQyCode=false&ziMu=',{}, function(json) {
//    					$('#txt_search').combobox('loadData',json);});
//    			}
//    		},
//    		onLoadSuccess : function(node) {
//    			$("a").removeClass("combo-arrow");
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
//    						$("#"+treeleftroot[0].children[i].domId).addClass("tree-node-selected");
//    						isExistroot=1;
//    					}
//    				}
//    				if(isExistroot==1){
//    					for(var i=0,len=treeleftroot[0].children.length;i<len;i++){
//    						if(treeleftroot[0].children[i].text!=consSelectText){
//    							$("#"+treeleftroot[0].children[i].domId).removeClass("tree-node-selected");
//    						}
//    					}
//    				}
//    			}
//    		}
//    	});
    	
        
    });
    
    function consSelectMethodLoad(){
    	if(consSelectCon.id.length < 4){	// 区域能源节点
    		$("#clickTree").hide();
    		$("#contentId").show();
    		content='<iframe id="funcId" src="'+webContextRoot+'pages/despages/projectManage/tranOverview.jsp?orgNo='+consSelectCon.id+'" scrolling="no" frameborder="0" width="100%" height="100%"></iframe>'; 
    		$("#contentId").empty();
    		$('#contentId').append(content);
    		value="";
    		unValue="";
    		svgValue="";
    		consSearchId="";
    		IniSvgView(value,unValue,svgValue,consSearchId);
    	}else{		// 企业节点
    		$("#contentId").hide();
    		$("#clickTree").show();
    		consId = consSelectCon.id;//把树节点id赋给企业id
    		consName = "";//把树节点的值赋给企业名称   
    		unValue="";
    		svgValue="";
    		IniSvgView(consName,unValue,svgValue,consId);
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

//    function selectTree(nodeId,nodeText){
//		if(nodeId == undefined){
//			var treeleftroot=$('#tree1').tree('getRoots');
//	    	$("#"+treeleftroot[0].domId).addClass("tree-node-selected");
//		}else{
//      	   	var n = $('#tree1').tree("find",nodeId);//根据id获取节点
//      	   	$('#tree1').tree('select',n.target);//选中节点
//      	   	$('#tree1').tree('scrollTo',n.target);//滚动到节点
//      	  svgValue = "";
//      	  IniGridView(nodeText,svgValue);
//		}
//		
//	}
    /*
    * 根据操作方式，打开一次图配置窗体
    * @param {number} oType 1新建，2修改
    * @param {object} options 可选参数，当类型是修改时，传递的数据参数
    * */
    /*function openDetailItemWindow(oType, options) {
        if(oType == 1){
        	$('#dialog1').window('center').panel('open');
        }else{

        }
        $('#dialog1').window('center').panel('open');
    }*/
    

    //模糊查询
    function searchDetail(){
    	var value = $('#input1').textbox("getText");
    	svgValue = "";
    	unValue = "";
    	consSearchId = "";
    	IniSvgView(value,unValue,svgValue,consSearchId);
    }
    
    function IniSvgView(value,unValue,svgValue,id){
    	$('#yctgl-girdDetailView').datagrid("loadData",{total:0,rows:[]});
    	$('#yctgl-girdDetailView').datagrid('load',{
    		value:value,
    		unValue:unValue,
    		svgValue:svgValue,
    		consId:id
    	});
   }

//点击事件    
    function openDetail(consName,subsName,userTranId){
    	openDetailItemWindow(consName,subsName,userTranId);
    }
//打开新建一次图弹框    
    function openDetailItemWindow(consName,subsName,userTranId){
    	$('#dialog1').window('center').panel('open');   
    	$("#consName").html(consName);
    	$("#subsName").html(subsName);
    	$("#userTranId").html(userTranId);
    	$("#input-name").textbox('setValue',"");
    	$("#input-sort").textbox('setValue',"");
    	$("#input-name").textbox("textbox").focus();
//    	$("#input-name").textbox('setValue',"");
//		$("#input-sort").textbox('setValue',"")
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
    			$.messager.alert('提示', "一次图名称过长，不能超过200！", 'warning',function()
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
    	
//    	var svgName = $("#input-name").textbox("getText");
//    	if(svgName == ""){
//    		$.messager.alert('警告','一次图名称不能为空！',"warning"); 
//    		return;
//    	}
//    	var svgOrder = $("#input-sort").textbox("getText");
//    	if(svgName == ""){
//    		$.messager.alert('警告','排序不能为空！',"warning"); 
//    		return;
//    	}
    	$.getJSON(basePath + 'svgManage/AddSubSvg.action', {
    		'subSvgModel.svgId' : "",
    		'subSvgModel.userTranId' : $("#userTranId").html(),
    		'subSvgModel.svgName' : $("#input-name").textbox("getText"),
    		'subSvgModel.svgOrder' : $("#input-sort").textbox("getText")	

    	}, function(json) {
    		if (json.saveSUCCESS == "true") {
    			$('#dialog1').window('center').panel('close');
    			$.messager.alert('提示', "保存成功！", 'info', function(r) {
    				$('#yctgl-girdDetailView').datagrid('reload'); 
    				$.ajax({
    		    		type : "post",
    		    		url : basePath + 'svgManage/getConsNumber.action',
    		    		dataType : "json",
    		    		success : function (count){
    		    			$("#ConsNumber").html(count[0].cout);
    		    			$("#SubsNumber").html(count[1].cout);
    		    			$("#UnSubsNumber").html(count[2].cout);
    		    			$("#UnSvgNumber").html(count[3].cout);
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
    function edit(consName,subsName,svgId,svgName,svgOrder){
    	$('#Editdialog').window('center').panel('open');
    	$("#cName").html(consName);
    	$("#sName").html(subsName);
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
    			$.messager.alert('提示', "一次图名称过长，不能超过200！", 'warning',function()
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
    		url : basePath + 'svgManage/updateSvgBtnClick.action',
    		dataType : "json",
    		data : {
    			'svgId' : svgId,
    			'svgName' : svgName	,
    			'svgOrder' : svgOrder
    		},
//    		complete:function(XMLHttpRequest,textStatus)
//    		{
//    			divIswait --;
//    			if (divIswait == 0){
//    				$('#divWaiting').window('close'); 
//    			}	
//    		},
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
//
    function quiteditSvg(){
    	$('#Editdialog').window('close');
    }
//删除一次图
    function deleteSvg(userTranId,svgId){
    	$.messager.confirm('提示', "确定删除吗?", function(r){
    		if(r){
    			$.ajax({
    				type : "post",
    				url : basePath + 'svgManage/deleteSvgBtnClick.action',
    				dataType : "json",
    				data : {
    					'userTranId' : userTranId,
    					'svgId' : svgId
    				},
//    				complete:function(XMLHttpRequest,textStatus)
//    				{
//    					divIswait --;
//    					if (divIswait == 0){
//    						$('#divWaiting').window('close'); 
//    					}	
//    				},
    				success : function(data) {		
    					if (data.saveSUCCESS == "true") {
    						//$("#divDelete").window('close');
    						$.messager.alert('提示', "删除成功！", 'info', function(r) {
    		    				$('#yctgl-girdDetailView').datagrid('reload'); 
    		    				$.ajax({
    		    		    		type : "post",
    		    		    		url : basePath + 'svgManage/getConsNumber.action',
    		    		    		dataType : "json",
    		    		    		success : function (count){
    		    		    			$("#ConsNumber").html(count[0].cout);
    		    		    			$("#SubsNumber").html(count[1].cout);
    		    		    			$("#UnSubsNumber").html(count[2].cout);
    		    		    			$("#UnSvgNumber").html(count[3].cout);
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
    /*******************************************************************************
     * 打开窗口，不可拖动窗体大小
     * 
     * @param url
     * @param winName
     * @param width
     * @param height
     * @param isClosed
     */
//    function OpenWinUnRes(url, winName, width, height, isClosed) {    	
//    	xposition = 0;
//    	yposition = 0;
//
//    	if ((parseInt(navigator.appVersion) >= 4)) {
//    		xposition = (screen.width - width) / 2;
//    		yposition = (screen.height - height) / 2;
//    	}
//    	theproperty = "width=" + width + "," + "height=" + height + ","
//    			+ "location=0," + "menubar=0," + "resizable=0," + "scrollbars=1,"
//    			+ "status=1," + "titlebar=0," + "toolbar=0," + "hotkeys=0,"
//    			+ "screenx=" + xposition + "," // 仅适用于Netscape
//    			+ "screeny=" + yposition + "," // 仅适用于Netscape
//    			+ "left=" + xposition + "," // IE
//    			+ "top=" + yposition; // IE
//    	monwin = window.open(url, winName, theproperty, false);
//    	if (isClosed) {
//    		monwin.close();
//    		monwin = window.open(url, winName, theproperty, false);
//    	}
//    	
//    	//monwin.focus();
//    }
    
	
//打开配置页面事件
//    function peizhi(consId,consName,subsId,subsName,svgId,svgName){
//    	OpenWinUnRes(basePath+'pages/despages/svgEdit/svgEdit.jsp',"一次图配置页面",screen.availWidth - 300,screen.availHeight - 260);
//    	//window.open(basePath+'pages/despages/svgEdit/svgEdit.jsp');
//    	//widow.open(basePath+'pages/despages/svgEdit/svgEdit.jsp');
//    }
    
//    function openSendWorker(consId,consName,userTranId,subsName,svgId,svgName) {
//    	$('#workerOrder').window('close');
//    	var url=basePath+'pages/despages/svgEdit/svgEdit.jsp?consId='+consId+'&consName='+consName+'&userTranId='+userTranId+'&subsName='+subsName+'&svgId='+svgId+'&svgName='+svgName;
//    	var content = "<iframe src=encodeURL('"+url+"') width='100%' height='99%' frameborder='0' scrolling='no'/>";
//    	var boarddiv = "<div id='msgwindow' title='工单派送'/>";
//    	$(document.body).append(boarddiv);
//    	var win = $("#msgwindow").dialog({
//    		content : content,
//    		width : '1400px',
//    		height : '900px',
//    		modal : 'shadow',
//    		title : '一次图配置',
//    		onClose : function() {
//    			$(this).window('close');
//    		}
//    	});
//    	win.dialog('open');
//    }
    
    function peizhi(consId,consName,userTranId,subsName,svgId,svgName,svg){
    	if(g_yicituguanli.isShowType == 0){
    		$("#divTreeLeft").addClass('hidden');
    		window.location.href=basePath+'pages/despages/svgEdit/svgEdit.jsp?consId='+escape(consId)+'&consName='+escape(consName)+'&userTranId='+escape(userTranId)+'&subsName='+escape(subsName)+'&svgId='+escape(svgId)+'&svgName='+escape(svgName)+'&svgFile='+escape(svg);
    	}else{
    		parent.ConsIni(consName,consId,subsName,userTranId,svgId,svgName,svg);    		
    		parent.$('#dialog2').window('close'); 
    	}    	   	
    }
    $("#UnSubsNumber").bind("click", function() {
    	unValue = "1";
    	value = "";
    	svgValue = "";
    	consSearchId = "";
    	IniSvgView(value,unValue,svgValue,consSearchId);
//    	var n = $('#tree1').tree('getSelected');//获取被选中的节点
//    	if(n!=null)//判断节点是否存在
//    	{
//    		var id = n.rootId;
//    		var w = $('#tree1').tree("find",id);//根据id获取节点
//    		$("#"+w.domId).removeClass("tree-node-selected");
//    	}
//    	var treeleftroot=$('#tree1').tree('getRoots');
//    	$("#"+treeleftroot[0].domId).addClass("tree-node-selected");
	});	
    $("#UnSvgNumber").bind("click", function() {
    	svgValue = "1";
    	value = "";
    	unValue = "";
    	consSearchId = "";
    	IniSvgView(value,unValue,svgValue,consSearchId);
//    	var n = $('#tree1').tree('getSelected');//获取被选中的节点
//    	if(n!=null)//判断节点是否存在
//    	{
//    		var id = n.rootId;
//    		var w = $('#tree1').tree("find",id);//根据id获取节点
//    		$("#"+w.domId).removeClass("tree-node-selected");
//    	}
//    	var treeleftroot=$('#tree1').tree('getRoots');
//    	$("#"+treeleftroot[0].domId).addClass("tree-node-selected");
	});	
    
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
