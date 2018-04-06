/**
 * 区域监控
 * @author zhou_qiang
 * @since 2017.3.6
 */

//设置属性对象
var gridData;

var gaojData = [];
var alarmData = [];
var yhId = '';
var yhbId = '';
var consName ='';
var consId;
var subsId;
var devId;
var deviceId;
var mpId;
var rows;
var columns;

var yx_data = [];
var wx_data = [];
var groupData = [];
var groupId = '';
var groupName;
var isAdd = '0';
var yhbType = 'yhbz';//yhbz-用户变组，yhb-用户变

var queryType;
var flag_1 = false;
/**
 * 区域监控jsp初始化加载监控信息
 */
$(function(){
	//用户访问区域监控页面加载上次所访问数据
	$.post(webContextRoot +'yhbjk/queryFirstOrgDataGrid.action', //请求路径
	 		{'orgDataGridModel.userId': userId
	 		},
	 	   	function(data){//回调
		 			if (data==0) {
	 				 gridData = {
	 				        rows: 3,
	 				        columns: 4,
	 				       is_showThumbnail:false,
	 				        getCellCount: function () {
	 				            return this.rows * this.columns;
	 				        }
	 				 };
	 			}else{
	 				if(data.showType==1){
	 					showThumbnail=true;
	 				}else{
	 					showThumbnail=false;
	 				}
	 				gridData = {
	 				        rows: data.rowNum,
	 				        columns: data.listNum,
	 				        is_showThumbnail:showThumbnail,
	 				        getCellCount: function () {
	 				            return this.rows * this.columns;
	 				        }
	 				 };
	 				//将用户上一次登录的行列数在页面上显示
//	 				$('#cmb_rowValue').combobox('setValue', gridData.rows);
//	 				$('#cmb_listValue').combobox('setValue', gridData.columns);
	 			}
		 			init();
	 	},
	 "json");
	
	$("#showYHZ").click(function(){
		
		var position = $(this).position();
		$("#sk").animate({left:position.left},300);
		$(this).css('color','#FFFFFF');
		$('#showYHB').css('color','#000000');
	});
	$("#showYHB").click(function(){
		var position = $(this).position();
		$("#sk").animate({left:position.left},300);
		$(this).css('color','#FFFFFF');
		$('#showYHZ').css('color','#000000');
	});
	
	
	//返回
	$("#fhGroup").linkbutton({    
	    onClick: function(){
	    	alarmData = [];
	    	fhGroup();
	    }
	});
	
	//新增用户变组
	$("#addGroup").linkbutton({    
	    onClick: function(){
	    	$('#dlg').dialog('open');
	    	$('#groupName').textbox('setValue','');
	    	$('#groupId').text('');
	    	$('#search_yhb').textbox('setValue','');
	    	groupId = '';
	    	isAdd = '0'; 
	    	loadGroupReal();
	    	loadGroupNoReal();
	    }
	});
	
	//新增组窗口
	$('#dlg').dialog({    
	    title: '新增分组',    
	    closed: true,
	    modal: true,
	    buttons:"#dlg-buttons"
	});
	
	$(".selected-panel").panel({
		title: '已选择',
		cls:'panel-padding',
	});
	$(".unselected-panel").panel({
		title: '未选择',
		cls:'panel-padding',
		tools:"#filter"
	});
	/*$('#pp').pagination({ 
		total:2000, 
		pageSize:10 
	});*/
	
});

/**
 * 用户变组查询
 */
function showYHZ(){
	fhGroup();
}

/**
 * 用户变查询
 */
function showYHB(){
	$('#chk_show-thumbnail').css('display','inline-block');
    $('#slt_title').css('display','inline-block');
	
	yhbType = 'yhb';
	gjNum = 0;
	index = 0;
    groupId = '';
	$('#addGroup').hide();
	$('#fhGroup').hide();
	loadPage();
	$('#groupTitleName').text('');
}

/**
 * 置顶
 */
function moveYHZTop(){
	var move_data = [];
	for(var i=0;i<groupData.length;i++){
		if(groupData[i].groupId == groupId){
			move_data.push(groupData[i]);
		}
	}
	for(var i=0;i<groupData.length;i++){
		if(groupData[i].groupId != groupId){
			move_data.push(groupData[i]);
		}
	}
	groupData = move_data;
//	initGroupCart(move_data,true);
	disWaitDisplayForQuery("0");
	saveSort();
}
/**
 * 前移
 */
function moveYHZFront(){
	var move_data = [];
	var a ;
	var index;
	for(var i=0;i<groupData.length;i++){
		if(groupData[i].groupId == groupId){
			if(i==0){
				return;
			}
			a = groupData[i];
			index = i;
		}else{
			move_data.push(groupData[i]);
		}
	}
	
	move_data.splice(index-1,0,a);
	groupData = move_data;
//	initGroupCart(move_data,true);
	disWaitDisplayForQuery("0");
    saveSort();
}
/**
 * 后移
 */
function moveYHZAfter(){
	var move_data = [];
	var a ;
	var index;
	for(var i=0;i<groupData.length;i++){
		if(groupData[i].groupId == groupId){
			if(i==groupData.length-1){
				return;
			}
			a = groupData[i];
			index = i;
		}else{
			move_data.push(groupData[i]);
		}
	}
	
	move_data.splice(index+1,0,a);
	groupData = move_data;
//	initGroupCart(move_data,true);
	disWaitDisplayForQuery("0");
    saveSort();
}
/**
 * 置尾
 */
function moveYHZTail(){
	var move_data = [];
	for(var i=0;i<groupData.length;i++){
		if(groupData[i].groupId != groupId){
			move_data.push(groupData[i]);
		}
	}
	for(var i=0;i<groupData.length;i++){
		if(groupData[i].groupId == groupId){
			move_data.push(groupData[i]);
		}
	}
	groupData = move_data;
//	initGroupCart(move_data,true);
	disWaitDisplayForQuery("0");
    saveSort();
}

/**
 * 保存排序
 * @returns
 */
function saveSort(){
	var gData = [];
	for(var i=0;i<groupData.length;i++){
		var obj = new Object();
		obj.groupId = groupData[i].groupId;
		obj.sortNum = i+1;
		gData.push(obj);
	}
	$.getJSON(webContextRoot +'yhbjk/updSubsGroupSort.action', 
			{
				'realJsonString' : JSON.stringify(gData) //获取封装JSON后的参数
			},
		   	function(data){//回调
				fhGroup();
	   	},"json");//返回格式
	
}


//返回
function fhGroup(){
	$('#chk_show-thumbnail').css('display','none');
    $('#slt_title').css('display','none');
	$('#coreContainer_panel').css('display','none');
	$('#coreContainer_group_panel').css('display','block');
	
	$('#addGroup').show();
    $('#fhGroup').hide();
    $('#groupTitleName').text('');
    
    yhbType = 'yhbz';
	gjNum = 0;
	index = 0;
    groupId = '';
//    loadGaoj();
    loadQyjkPage();
}

/**
 * 加载用户变组下所选择的用户变信息
 */
function loadGroupReal(){
	if(groupId == ''){
		groupId = "0";
	}else{
		$('#groupName').textbox('setValue',groupName);
		$('#groupId').text(groupId);
	}
	$.post(webContextRoot +'yhbjk/querySubsGroupRealYXInfo.action', //请求路径
			{
				'subsGroupRealModel.groupId': groupId
			},
		   	function(data){//回调
			yx_data = data;
			loadYxReal(data);
			
	},"json");
	
}

var wx_n_data = [];

/**
 * 加载用户变组下未选择的用户变信息
 */
function loadGroupNoReal(){
	$.post(webContextRoot +'yhbjk/querySubsGroupRealWXInfo.action', //请求路径
			/*{
				'subsGroupRealModel.queryType': '0'
		 	},*/
		   	function(data){//回调
			wx_data = data;
			wx_n_data = data;
			var ls_data = data;
			if(yx_data.length != 0){
				for(var i = 0;i<data.length;i++){
					for(var j=0;j<yx_data.length;j++){
						if(data[i].subsId == yx_data[j].subsId){
							ls_data.splice(i,1);
							i--;
							break;
						}
					}
				}
				loadWxReal(ls_data);
			}else{
				loadWxReal(ls_data);
			}
//			loadWxReal(ls_data);
	},"json");
}

/**
 * 编辑用户变组时加载已选用户变信息
 * @param data
 */
function loadYxReal(data){
	var str='';
	for(var i=0;i<data.length;i++){
		var subsName = data[i].subsName;
		var subsId = data[i].subsId;		
		str += '<div class="s-panel" title="'+subsName+'">';
		str += '<img src='+webContextRoot+'/pages/despages/common/jquery-easyui-1.5.1/themes/icons/edit_remove.png onClick="delReal('+subsId+')"/>';
		str += '<span>'+subsName+'</span>';
		str += '</div>';
	}
	//将动态的页面元素添加到对应的panel容器中
	document.getElementById('real_yx_panel').innerHTML=str;
}

/**
 * 编辑用户变组时加载未选用户变信息
 */
function loadWxReal(data){
	var str='';
	for(var i=0;i<data.length;i++){
		var subsName = data[i].subsName;
		var subsId = data[i].subsId;
		str += '<div class="s-panel" title="'+subsName+'">';
		str += '<img src="'+webContextRoot+'/pages/despages/common/jquery-easyui-1.5.1/themes/icons/edit_add.png" onClick="addReal('+subsId+')"/>';
		str += '<span>'+subsName+'</span>';
		str += '</div>';
	}
	//将动态的页面元素添加到对应的panel容器中
	document.getElementById('real_wx_panel').innerHTML=str;
}

/**
 * 编辑用户变组删除用户变
 */
function delReal(id){
	if(yx_data.length != 0){
		for(var i =0;i<yx_data.length;i++){
			if(yx_data[i].subsId == id){
				
				wx_n_data.splice(0,0,yx_data[i]);
				yx_data.splice(i,1);
				break;
			}
		}
		loadYxReal(yx_data);
		loadWxReal(wx_n_data);
	}
	searchYHB();
}

/**
 * 编辑用户变组添加用户变
 * @param id
 */
function addReal(id){
	if(wx_n_data.length != 0){
		for(var i =0;i<wx_n_data.length;i++){
			if(wx_n_data[i].subsId == id){
				
				yx_data.splice(0,0,wx_n_data[i]);
				wx_n_data.splice(i,1);
				break;
			}
		}
		loadWxReal(wx_n_data);
		loadYxReal(yx_data);
	}
	searchYHB();
}

/**
 * 编辑用户变组界面检索用户变信息
 */
function searchYHB(){
	var yhbName = $.trim($('#search_yhb').textbox('getValue')) ;
	var ls_data = [];
	if(yhbName.length == 0){
		var s = wx_data;
		for(var i=0;i<yx_data.length;i++){
			for(var j=0;j<s.length;j++){
				if(yx_data[i].subsId == s[j].subsId){
					s.splice(j,1);
				}
			}
		}
		ls_data = s;
		wx_n_data = s;
	}else{
		for(var i =0;i<wx_n_data.length;i++){
			if(wx_n_data[i].subsName.indexOf(yhbName) != -1){
				ls_data.push(wx_n_data[i]);
			}
		}
//		wx_n_data = ls_data;
	}
	loadWxReal(ls_data);
}

/**
 * 保存用户变组信息
 */
function cxSave(){
//	closeInterval();
	gjNum = 0;
	var groupName = $('#groupName').textbox('getValue');
	var groupIds = $('#groupId').text();
	
	if(groupName == null || groupName == ''){
		$.messager.alert('确认', "分组名称不能为空！", 'warning');
	}else if(groupName.length > 32){
		$.messager.alert('确认', "输入内容过长！", 'warning');
	}else if(yx_data.length == 0){
		$.messager.alert('确认', "至少选择一个用户变！", 'warning');
	}else{
		$.getJSON(webContextRoot +'yhbjk/addSubsGroup.action', 
				{
					'subsGroupModel.groupId' : groupIds,
					'subsGroupModel.groupName' : groupName,
					'subsGroupModel.createUser' : userId,
					'subsGroupModel.upUserId' : userId,
					'realJsonString' : JSON.stringify(yx_data), //获取封装JSON后的参数
					'isAdd' : isAdd //（0-新增，1-修改）
				},
			   	function(data){//回调
					if(data==true){
				    	$.messager.alert('确认', "保存成功！", 'info', function(r){
				    		$('#dlg').dialog('close');
				    		yhbType = 'yhbz';
				    		index = 0;
				    	    groupId = '';
				    	    gjAllData = [];
				    	    
				    	    loadGroupPage();
				    	});
					 }else{
						 $.messager.alert('确认', "保存失败！", 'warning');//移除失败
					 }
		   	},"json");//返回格式
	}
	
}

/**
 * 关闭编辑用户变组界面
 */
function cxClose(){
	$('#dlg').dialog('close');
}

/**
 * 初始化右击菜单，按钮，加载信息
 */
function init(){
	$('#mm').menu({});
	$('#groupMemo').menu({});
	$('#groupWFP').menu({});
    $('#gj').menu({});
    
    $('.xinxitongji-panel').panel({
        title: '信息统计',
        border: false
    });

    $('.bianweixinxi-panel').panel({
        title: '变位信息',
        border: false,
        tools:"#t2"
    });

    $('.gaojingxinxi-panel').panel({
        title: '告警信息',
        border: false,
        tools:"#t1"
    });

    $("#dialog-1").jDialog({
        animationType: 'fade-in'
    });	   
    
    //告警
    queryGaoJing();
    queryBianWei();
    //加载用户变组信息
    loadGroupPage();
    /**
     * 获取企业用户总数
     */
    $.post(webContextRoot +'yhbjk/queryUserCount.action', //请求路径
//   			{'orgControlModel.AREA_NO': PCodeAction.shortOrgCode},//请求参数
   		   	function(data){//回调
   				$('#yhs').text(data.userCount);
   				$('#zyhbs').text(data.subsCount);
   				$('#zjgs').text(data.gjCount);
   		   	},
   		   "json");//返回格式
   
  
	//定时加载告警数量信息（5秒刷新）
	setInterval(function(){
		/*if(flag_1){
			flag_1 = false;
		}*/
		loadGaoj();
	},10000);
	
	//定时加载用户变信息（一分钟刷新）
	setInterval(loadQyjkPage,60000);
	
	setInterval(queryGaoJing,5000);
	setInterval(queryBianWei,60000);
//    beginInterval();
	
	$('#fhGroup').hide();
	
}

var refOnem = null;
var reffives = null;
var gjInterval = null;
var bwInterval = null;
/**
 * 定时器开启
 */
function beginInterval(){
	//定时加载用户变信息（一分钟刷新）
	refOnem = setInterval(loadQyjkPage,60000);
	//定时加载告警数量信息（5秒刷新）
	reffives = setInterval(function(){
		if(flag_1){
			loadGaoj();
			flag_1 = false;
		}
	},10000);
	
	gjInterval = setInterval(queryGaoJing,5000);
	bwInterval = setInterval(queryBianWei,60000);
}

/**
 * 定时器关闭
 */
function closeInterval(){
	clearInterval(refOnem);
	clearInterval(reffives);
	clearInterval(gjInterval);
	clearInterval(bwInterval);
}

/**
 * 网格刷新查询监控信息
 */
function btnRefresh(){
	var temprow = $('#cmb_rowValue').combobox('getValue');
	var templist = $('#cmb_listValue').combobox('getValue');
	gridData.rows = parseInt(temprow);
    gridData.columns = parseInt(templist);
	if(yhbType == 'yhb'){
		//获取页面中的网格信息
		 var is_showThumbnail = $('#chk_show-thumbnail').is(':checked');
		 if(is_showThumbnail){
			 is_showThumbnail=1;
		 }else{
			 is_showThumbnail=0;
		 }
		 gridData.is_showThumbnail = parseInt(is_showThumbnail);
		 /**
	      * 将页面中网格行列数以及缩略图的状态保存到数据库中
	      * 
	      */
	     saveDataGrid(gridData);
	     refresh_grid(gridData);
	 }else if(yhbType == 'yhbz'){
		 refresh_group_grid(gridData);
	 }
};

/**
 * 刷新页面的展示
 * @param gridData
 * @param isFirstIni
 */
 function refresh_grid1(gridData, isFirstIni) {
	 //重新设置页面的宽高长度
    var height = (100 / gridData.rows).toFixed(4) + "%";
    var width = (100 / gridData.columns).toFixed(4) + "%";
    
    if(gridData.rows > 4){
    	$('#chk_show-thumbnail').prop('checked',true);

		 $('.simple-panel').show();
	     $('.detail-panel').hide();
	     
	 }else{
		 var is_showThumbnail = $('#chk_show-thumbnail').is(':checked');

		    if (is_showThumbnail){
		        $('.simple-panel').show();
		        $('.detail-panel').hide();
		    
		    }else{
		        $('.simple-panel').hide();
		        $('.detail-panel').show();
		    }
	 }

    $('.cell').css({"width":width,"height":height,"display":"block"});

    if (isFirstIni){
        $("div.holder").jPages({
            containerID : "coreContainer_panel",
            perPage : gridData.getCellCount(),
            first: "首页",
            last: "尾页",
            previous: false,
            next: false
        });
    }
    else{
        $("div.holder").jPages("destroy").jPages({
            containerID : "coreContainer_panel",
            perPage : gridData.getCellCount(),
            first: "首页",
            last: "尾页",
            previous: false,
            next: false
        });
    }
    
}

 
/**
 * 初始化页面元素
 * @param flag
 */
function loadPage(){
	//解除用户变panel
	$('#coreContainer_panel').css('display','block');
	$('#coreContainer_group_panel').css('display','none');
	$('#gp_name').css('display','block');
	
	var yhb = document.getElementById('coreContainer_panel');
	$('#coreContainer_panel').html("");
	showWaitDisplayForQuery(yhb,"1");
	$('#groupTitleName').text(groupName);
	$.post(webContextRoot +'yhbjk/queryOrgControlInfo.action', //请求路径
		{
			'orgControlModel.groupId': groupId
		},
	   	function(data){//回调
		gaojData = data;
		loadGaoj();
		disWaitDisplayForQuery("1");
	},"json");
}
 
function initCart(data,flag){
	var str='';
	for(var i=0;i<data.length;i++){
		str += '<div class="cell" onDblClick="doubleClick()">';
		
		str += '<div id="card_'+data[i].subsId+'" class="card hvr-outline-in">';
		str += '<div id="err_'+data[i].subsId+'" ><span id="err_text_'+data[i].subsId+'" class="error-text" onclick="queryGaoJingXinXi(2,'+data[i].subsId+')"></span></div>';
 		
		str += '<div class="detail-panel ">';
 		str += '<div id="td_d_title'+data[i].subsId+'" class="title-panel" style="padding-left:15px;padding-right:15px;"></div>';
 		str += '<div class="info-panel">';
 		str += '<div class="table-panel">';
 		str += '<table>';
 		str += '<tbody>';
 		str += '<tr>';
 		str += '<td id="cons_id'+data[i].subsId+'" class="cons_id" style="display:none"></td>';
 		str += '<td id="subs_id'+data[i].subsId+'" class="subs_id" style="display:none"></td>';
 		str += '<td id="cons_name'+data[i].subsId+'" class="cons_name" style="display:none"></td>';
 		str += '<td class="td-label">负荷(kW)：</td>';
 		str += '<td id="fh_d_title'+data[i].subsId+'" class="td-value" name="tdname"></td>';
 		str += '</tr>';
 		str += '<tr>';
 		str += '<td class="td-label">电量(kWh)：</td>';
 		str += '<td id="dl_d_title'+data[i].subsId+'" class="td-value" name="tdname"></td>';
 		str += '</tr>';
 		str += '<tr>';
 		str += '<td class="td-label">事件：</td>';
 		str += '<td id="sj_d_title'+data[i].subsId+'" class="td-value"><span id="sj_d_bw_title'+data[i].subsId+'"></span>/<span id="sj_d_gj_title'+data[i].subsId+'"></span></td>';
 		str += '</tr>';
 		str += '</tbody>';
 		str += '</table>';
 		str += '</div>';
 		str += '</div>';
 		str += '</div>';
 		
 		str += '<div class="simple-panel yhb" style="display:none;">';
 		str += '<div id="td_s_title'+data[i].subsId+'" class="title-panel" style="padding-left:15px;padding-right:15px;"></div>';
 		str += '<div class="info-panel">';
 		str += '<div class="table-panel">';
 		str += '<table>';
 		str += '<tbody>';
 		str += '<tr>';
 		str += '<td class="td-label">负荷(kW)：</td>';
 		str += '<td id="fh_s_title'+data[i].subsId+'" class="td-value" name="tdname"></td>';
 		str += '</tr>';
 		str += '</tbody>';
 		str += '</table>';
 		str += '</div>';
 		str += '</div>';
 		str += '</div>';
 		
 		str += '</div>';
 		str += '</div>';
	}
	//将动态的页面元素添加到对应的panel容器中
	document.getElementById('coreContainer_panel').innerHTML=str;
	
	if(flag){
		refresh_grid(gridData,true);
	}else{
		refresh_grid(gridData);
	}
	
	//初始化加载双击事件获取元素
    $('.card').bind('dblclick',function(e){
        e.preventDefault();
        
        yhId = $(e.currentTarget).find('.cons_id').text(); 
        yhbId = $(e.currentTarget).find('.subs_id').text();
        consName = $(e.currentTarget).find('.cons_name').text();
    });
    
    for(var i=0;i<data.length;i++){
    	$('#card_'+data[i].subsId).bind('contextmenu',function(e){
            e.preventDefault();
            
            yhId = $(e.currentTarget).find('.cons_id').text(); 
            yhbId = $(e.currentTarget).find('.subs_id').text();
            consName = $(e.currentTarget).find('.cons_name').text();
            $('#mm').menu('show', {
                left: e.pageX,
                top: e.pageY
            });
        });
    }
}


/**
 * 初始化加载用户变组信息
 * @param flag
 */
function loadGroupPage(){
	var yhz = document.getElementById('coreContainer_group_panel');
	$('#coreContainer_group_panel').html("");
	showWaitDisplayForQuery(yhz,"0");
	
	$.post(webContextRoot +'yhbjk/querySubsGroupInfo.action', //请求路径
		/*{'orgControlModel.consId': consId
		},*/
	   	function(data){//回调
			groupData = data;
			loadQyjkPage();
			disWaitDisplayForQuery("0");
	},"json");
}

/**
 * 加载用户变组页面元素
 * @param data
 * @param flag
 */
function initGroupCart(data,flag){
	var str='';
	
	for(var i=0;i<data.length;i++){
		str += '<div class="grouppanel" onDblClick="showYHBData()">';
		
		str += '<div id="card_'+data[i].groupId+'" class="card hvr-outline-in group">';
		str += '<div id="err_'+data[i].groupId+'" ><span id="err_text_'+data[i].groupId+'" class="error-text" onclick="queryGaoJingXinXi(1,'+data[i].groupId+')"></span></div>';
		
		str += '<div class="simple-panel yhz" >';
 		str += '<div id="td_d_title'+data[i].groupId+'" class="title-panel">'+data[i].groupName+'</div>';
 		str += '<div class="info-panel">';
 		str += '<div class="table-panel">';
 		str += '<table>';
 		str += '<tbody>';
 		str += '<tr>';
 		str += '<td id="subs_id'+data[i].groupId+'" class="group_id" style="display:none">'+data[i].groupId+'</td>';
        str += '<td id="subs_name'+data[i].groupId+'" class="group_name" style="display:none">'+data[i].groupName+'</td>';
 		str += '</tr>';
 		str += '<tr>';
 		str += '<td class="td-value">用户变数:</td>';
 		str += '<td id="sj_d_gj_title'+data[i].groupId+'" class="td-value" name="tdname">'+data[i].groupCount+'</td>';
 		str += '</tr>';
 		str += '</tbody>';
 		str += '</table>';
 		str += '</div>';
 		str += '</div>';
 		str += '</div>';
        
 		str += '</div>';
 		str += '</div>';
	}
	
	/*str += '<div class="grouppanel" onDblClick="showYHBData(true)">';
	str += '<div id="card_0" class="card hvr-outline-in group">';
	str += '<div id="err_0" ><span id="err_text_0" class="error-text"></span></div>';
    
	str += '<div class="simple-panel" >';
	str += '<div class="title-panel">未分配用户变</div>';
	str += '<div class="info-panel">';
	str += '<div class="table-panel">';
	str += '<table>';
	str += '<tbody>';
	str += '<tr>';
	str += '<td id="subs_id0" class="group_id" style="display:none"></td>';
	str += '<td id="subs_name0" class="group_name" style="display:none">未分配用户变</td>';
	str += '</tr>';
	str += '<tr>';
	str += '<td class="td-value">用户变数:</td>';
	str += '<td id="sj_d_gj_title0" class="td-value" name="tdname"></td>';
	str += '</tr>';
	str += '</tbody>';
	str += '</table>';
	str += '</div>';
	str += '</div>';
	str += '</div>';
    
	str += '</div>';
	str += '</div>';*/
	//将动态的页面元素添加到对应的panel容器中
	document.getElementById('coreContainer_group_panel').innerHTML=str;
	
	if(flag){
		refresh_group_grid(gridData,true);
	}else{
		refresh_group_grid(gridData);
	}
	
    //初始化加载右击事件获取元素
	for(var i=0;i<data.length;i++){
		//初始化加载双击事件获取元素
	    $('#card_'+data[i].groupId).bind('dblclick',function(e){
	        e.preventDefault();
	        groupId = $(e.currentTarget).find('.group_id').text();
	        groupName = $(e.currentTarget).find('.group_name').text();
	    });
		
		$('#card_'+data[i].groupId).bind('contextmenu',function(e){
	        e.preventDefault();
	        groupId = $(e.currentTarget).find('.group_id').text();
	        groupName = $(e.currentTarget).find('.group_name').text();
	        
	        $('#groupMemo').menu('show', {
	            left: e.pageX,
	            top: e.pageY
	        });
	    });
	}
	
	/*$('#card_0').bind('dblclick',function(e){
        e.preventDefault();
        groupId = $(e.currentTarget).find('.group_id').text();
        groupName = $(e.currentTarget).find('.group_name').text();
    });
	
	$('#card_0').bind('contextmenu',function(e){
        e.preventDefault();
        groupId = $(e.currentTarget).find('.group_id').text();
        groupName = $(e.currentTarget).find('.group_name').text();
        
        $('#groupWFP').menu('show', {
            left: e.pageX,
            top: e.pageY
        });
    });*/
	
}


function queryGaoJingXinXi(type,gid){
	if(type == '1'){//用户变组
		var subsIds = ''
		if(gid != 0){
			$.post(webContextRoot +'yhbjk/querySubsGroupRealYXInfo.action', //请求路径
					{
						'subsGroupRealModel.groupId': gid
					},
				   	function(data){//回调
						if(data.length>0){
							for(var i = 0;i<data.length;i++){
								if(data[i].subs_id != '' ){
									if(i==0){
										subsIds += data[i].subsId;
									}else{
										subsIds += ',' + data[i].subsId ;
									}
								}
							}
							consName = '';
							testOpen(subsIds,0,1,'','告警信息');
						}
			},"json");
		}else{
			$.post(webContextRoot +'yhbjk/querySubsGroupRealWXInfo.action', //请求路径
					{
						'subsGroupRealModel.queryType': '1'
					},
					function(data){//回调
						if(data.length>0){
							for(var i = 0;i<data.length;i++){
								if(data[i].subs_id != '' ){
									if(i==0){
										subsIds += data[i].subsId;
									}else{
										subsIds += ',' + data[i].subsId ;
									}
								}
							}
							consName = '';
							testOpen(subsIds,0,1,'','告警信息');
						}
			},"json");
		}
		
	}else{//用户变
		consName = '';
		testOpen(gid,0,1,'','告警信息');
	}
}

function refresh_group_grid(gridData, isFirstIni) {
	 //重新设置页面的宽高长度
    var height = (100 / gridData.rows).toFixed(4) + "%";
    var width = (100 / gridData.columns).toFixed(4) + "%";
    //将缩略图是否选中，以及行列数显示在页面上
    	$('#cmb_rowValue').combobox('setValue', gridData.rows);
		$('#cmb_listValue').combobox('setValue', gridData.columns);
		
		$('.detail-panel').show();
        $('.detaildetail-panel').hide();

    $('.grouppanel').css({"width":width,"height":height,"display":"block"});

    if (isFirstIni){
        $("div.holder").jPages({
            containerID : "coreContainer_group_panel",
            perPage : gridData.getCellCount(),
            first: "首页",
            last: "尾页",
            previous: false,
            next: false
        });
    }
    else{
        $("div.holder").jPages("destroy").jPages({
            containerID : "coreContainer_group_panel",
            perPage : gridData.getCellCount(),
            first: "首页",
            last: "尾页",
            previous: false,
            next: false
        });
    }
}

var gjAllData = [];

 /**
  * 加载企业用户，用户变信息
  * 
  */
 function loadQyjkPage(){
	$.post(webContextRoot +'yhbjk/queryOrgControlInfo.action', //请求路径
			{
				'orgControlModel.groupId': groupId
			},
		   	function(data){//回调 queryOrgControlInfo
			gjAllData = data;
//			loadData(data);
			loadGaoj();
	},"json");//返回格式
	
//	beginInterval();
}
 
var gjNum = 0;
var index = 0;
/**
 * 加载告警数量信息 wang
 */ 
 function loadGaoj(){
 	//获取WebService告警信息
 	 $.post(webContextRoot +'warn/querygaojingchaxunshouyecont.action',{
			'gaoJIngChaXunSYModel.consId' : '',
			'gaoJIngChaXunSYModel.dataSource' : '2'
		}, function(data){
 		 	var jsonData = data.sMap.jsonData;
 			if(gjNum != jsonData.length){
 		    	if(yhbType == 'yhbz'){
		 			for(var i = 0;i<gjAllData.length;i++){
		 				var gjcount = 0;
		 				for(var j=0;j<jsonData.length;j++){
		 					if(gjAllData[i].subsId == jsonData[j].subsId){
		 						gjAllData[i].alarmType = jsonData[j].alarmType;
		 						gjcount++;
		 					}
		 				}
		 				gjAllData[i].gjCount = gjcount;	
		 			}
		 			//排序
		 			gjAllData.sort(sortNumber);
		 			initGroupCart(groupData,true);
		 			loadGroupData(gjAllData);
		 		 }else if(yhbType == 'yhb'){
		 				for(var i = 0;i<gaojData.length;i++){
			 				var gjcount = 0;
			 				for(var j=0;j<jsonData.length;j++){
			 					if(gaojData[i].subsId == jsonData[j].subsId){
			 						gaojData[i].alarmType = jsonData[j].alarmType;
			 						gjcount++;
			 					}
			 				}
			 				gaojData[i].gjCount = gjcount;	
			 			}
			 			//排序
			 			gaojData.sort(sortNumber);
			 			initCart(gaojData,true);
			 			loadData(gaojData);
		 		 }
 		    	gjNum = jsonData.length;
 		    	return;
 		    }
 			else if(jsonData.length==0&&index == 0){
 		    	if(yhbType == 'yhbz'){
 		    		initGroupCart(groupData,true);
	 				loadGroupData(gaojData);
	 			}else if(yhbType == 'yhb'){
	 				initCart(gaojData,true);
		 			loadData(gaojData);
	 			}
 		    	index++;
 		    	return;
 		    } 
 			flag_1 = true;
 		},"json");
 } 
 
 /**
  * 
  * @param data
  */
 function loadData(data){
	 for(var i=0;i<data.length;i++){
			var consId = data[i].consId;
			var consName = data[i].consName;
			var subsId = data[i].subsId;
			var subsName = data[i].subsName;
			var voltLevelName = data[i].voltLevelName;
			var jxfh = data[i].jxfhPowerValue;
			var cxfh = data[i].cxfhPowerValue;
			var dl = data[i].dlPowerValue;
			var bwcount = data[i].bwCount==null?0:data[i].bwCount;
			var gjcount = data[i].gjCount==null?0:data[i].gjCount;
			
			var alarmType = data[i].alarmType;
			var a = subsName+'('+consName+')';
//			var b = jxfh+'/'+cxfh;
			var b = cxfh;
			$('#cons_id'+subsId).text(consId);
			$('#subs_id'+subsId).text(subsId);
			$('#cons_name'+subsId).text(consName);
			$("#td_d_title"+subsId).attr("title",a);
			$("#td_s_title"+subsId).attr("title",a);
			/*if(a.length > 10){
				a = a.substring(0, 9) + "...";
			}*/
			$('#td_d_title'+subsId).text(a);
			$('#td_s_title'+subsId).text(a);
			$('#fh_d_title'+subsId).text(b);
			$('#fh_s_title'+subsId).text(b);
			$('#dl_d_title'+subsId).text(dl);
			$('#sj_d_bw_title'+subsId).text(bwcount);
			$('#sj_s_bw_title'+subsId).text(bwcount);	
			$("#fh_d_title"+subsId).attr("title","负荷");
			$("#dl_d_title"+subsId).attr("title","当日电量");
			$("#sj_d_title"+subsId).attr("title","变位数量/告警数量");
			$("#fh_s_title"+subsId).attr("title","负荷");
			if(gjcount != 0){
				$('#card_'+subsId).removeClass().addClass("card card-error hvr-outline-in");
				$('#err_'+subsId).removeClass().addClass("error-icon");
				$('#err_'+subsId).show();
				$('#err_text_'+subsId).text(gjcount);
				if(alarmType == 3){
//					$('#td_d_title'+subsId).css('background-color','#FF6633');//通讯中断
					$('#card_'+subsId).addClass("dh_zd");
				}else{
//					$('#td_d_title'+subsId).css('background-color','#EE484B');//通讯正常
					$('#card_'+subsId).addClass("dh_zc");
				}
				
			}
			$('#sj_d_gj_title'+subsId).text(gjcount);
			$('#sj_s_gj_title'+subsId).text(gjcount);
		}
 }
 
var realData; 
 /**
  * 加载用户变组信息
  * @param data
  */
 function loadGroupData(gjdata){
	 var groupIdStr ='';
	 if(groupData.length > 0 ){
		 for(var s =0;s<groupData.length;s++){
			 if(s==0){
				 groupIdStr += groupData[s].groupId;
			 }else{
				 groupIdStr += ','+groupData[s].groupId;
			 }
		 }
	 } 
		 $.post(webContextRoot +'yhbjk/querySubsGroupRealYXInfo.action', //请求路径
					{
						'subsGroupRealModel.groupIdStr': groupIdStr
					},
				   	function(data){//回调
						realData = data;
						var gids = groupIdStr.split(',');
						for(var i=0;i<gids.length;i++){
							var yhbcount = 0;
							var gjcount = 0;
							var gjType = false;
							for(var j=0;j<realData.length;j++){
								
								for(var k=0;k<gjdata.length;k++){
									
									if(gids[i] == realData[j].groupId && realData[j].subsId == gjdata[k].subsId){
										yhbcount++;
										gjcount = parseInt(gjcount) + parseInt(gjdata[k].gjCount);
										if(gjdata[k].alarmType == '3'){
											gjType = true;
										}
									}
								}
							}
							if(gjcount > 0){
								if(gjType){
									$('#card_'+gids[i]).removeClass().addClass("card card-error hvr-outline-in dh_zd");
								}else{
									$('#card_'+gids[i]).removeClass().addClass("card card-error hvr-outline-in dh_zc");
								}
								
								$('#err_'+gids[i]).removeClass().addClass("error-icon");
								$('#err_'+gids[i]).show();
								$('#err_text_'+gids[i]).text(gjcount);
								/*if(gjType){
//									$('#td_d_title'+gids[i]).css('background-color','#FF6633');//通讯中断
								}else{
//									$('#td_d_title'+gids[i]).css('background-color','#EE484B');//通讯正常
								}*/
								
							 }
						}
			},"json");
		 $.post(webContextRoot +'yhbjk/querySubsGroupRealWXInfo.action', //请求路径
				 	{
						'subsGroupRealModel.queryType': '1'
				 	},
				   	function(data){//回调
						realData = data;
						var yhbcount = 0;
						var gjcount = 0;
						var gjType = false;
						for(var j=0;j<realData.length;j++){
							for(var k=0;k<gjdata.length;k++){
								if(realData[j].subsId == gjdata[k].subsId){
									gjcount = parseInt(gjcount) + parseInt(gjdata[k].gjCount);
									if(gjdata[k].alarmType == '3'){
										gjType = true;
									}
								}
							}
						}
						if(gjcount > 0){
							if(gjType){
								$('#card_0').removeClass().addClass("card card-error hvr-outline-in dh_zd");
							}else{
								$('#card_0').removeClass().addClass("card card-error hvr-outline-in dh_zc");
							}
							
							$('#err_0').removeClass().addClass("error-icon");
							$('#err_0').show();
							$('#err_text_0').text(gjcount);
							/*if(gjType){
//								$('#td_d_title0').css('background-color','#FF6633');//通讯中断
							}else{
//								$('#td_d_title0').css('background-color','#EE484B');//通讯正常
							}*/
						 }
			},"json");
	 
 }
 
//根据用户变组ID查询用户变信息 
function showYHBData(type){
    $('#chk_show-thumbnail').css('display','inline-block');
    $('#slt_title').css('display','inline-block');
	yhbType = 'yhb';
	gjNum = 0;
	index = 0;
	loadPage();
	$('#fhGroup').show();
    $('#addGroup').hide();
	
//	loadData(alarmData);
}

//修改用户变组信息
function updYHBData(){
	
	$('#dlg').dialog({    
	    title: '编辑分组',    
	    closed: true,
	    modal: true,
	    buttons:"#dlg-buttons"
	});
	$('#dlg').dialog('open');
	$('#search_yhb').textbox('setValue','');
	loadGroupReal();
	loadGroupNoReal();
	
	isAdd = '1';
}

//删除用户变组信息
function delYHBData(){
	gjNum = 0;
	if(groupId != ''){
		$.messager.confirm('确认', '确定删除该用户变组？', function(r){
			if(r){
				$.getJSON(webContextRoot + 'yhbjk/deleteSubsGroup.action',
						{ 
							'subsGroupModel.groupId': groupId
						},
						function(data){
							 if(data == true){
						    	$.messager.alert('确认', "删除成功！", 'info', function(r){
						    		yhbType = 'yhbz';
						    		index = 0;
						    	    groupId = '';
						    	    loadGroupPage();
						    	});
							 }else{
								 $.messager.alert('确认', "删除失败！", 'warning');//移除失败
							 }
						},"json");
			}
		});
	}
}

 /**
  * 按照告警数量排序
  * @param a
  * @param b
  * @returns {Number}
  */
 function sortNumber(a,b)
 {
	 return b.gjCount - a.gjCount;
 }
 
 /**
  * 双击事件
  */
 function doubleClick(){
	 
	 var options = {
        name: 'desyhbjk',               //需要打开的菜单的关键字,必须保证正确
        text: '一次图监控',           //打开菜单的标题,可修改
        path: '/des/pages/despages/monitor/userMonitor.jsp?consId='+yhId+'&userTranId='+yhbId+'&isOrgControl=true'
    };
    top.reloadTabPage(options);
 }
 
 /**
  * 一次接线图Tab页跳转
  */
function openycjxtWindow() {
	var item = {
			path : '/des/pages/despages/warn/khjk.jsp?consId=' + yhId
					+ '&consName=' + consName + '&selectedMenu=ssjkKLeafYctjk'+ '&subsId=' + yhbId,
			name : 'ssjkLeafKfjk',
			text : '客户视图'
		};
		top.reloadTabPage(item);
	/*var options = {
        name: 'desyhbjk',               //需要打开的菜单的关键字,必须保证正确
        text: '一次图监控',           //打开菜单的标题,可修改
        path: '/des/pages/despages/monitor/userMonitor.jsp?consId='+yhId+'&userTranId='+yhbId+'&selectedMenu=ssjkKLeafYctjk'
    };
    top.reloadTabPage(options);*/
}

/**
 * 能效总览跳转
 */
function opennxzlWindow(){
	var item = {
			path : '/des/pages/despages/warn/khjk.jsp?consId=' + yhId
					+ '&consName=' + consName + '&selectedMenu=bxfxKLeafNxzl',
			name : 'ssjkLeafKfjk',
			text : '客户视图'
		};
		top.reloadTabPage(item);
	
	/*var options = {
	        name: 'ssjkLeafKfjk',               //需要打开的菜单的关键字,必须保证正确
	        text: '客户视图',           //打开菜单的标题,可修改
	        path: '/des/pages/despages/monitor/userMonitor.jsp?consId='+yhId+'&userTranId='+yhbId+'&selectedMenu=bxfxKLeafNxzl'
	    };
	    top.reloadTabPage(options);*/
}
 
/**
 * 查看数据窗口
 */
function opencksjWindow() {
//	http://10.134.101.48:7801/des/areaEnergy/treeTwoLevelYHB.action?queryPara.consId=101000000468&queryPara.name=&queryPara.type=CONSSUB&queryPara.id=101000000468
	 var url = baseUrl + '/pages/areaEnergy/consDataCentre/getConsDetailTree.jsp?consId='+yhId;
//	 var url = baseUrl + '/areaEnergy/treeTwoLevelYHB.action?queryPara.consId='+yhbId+'&queryPara.name=&queryPara.type=CONSSUB&queryPara.id='+yhbId;
	// window.open(url,'','top=0,left=0,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no'); //wang_xutao 注释掉
	 
//	 window.open(url,'','location=0,menubar=0,resizable=0,scrollbars=0,status=0,titlebar=0,toolbar=0,hotkeys=0,fullscreen=0');
	 OpenWinUnRes(url, '',screen.availWidth - 300,screen.availHeight - 260);
//	 edge:raised;resizable:yes;scroll:no;status:no;center:yes;help:no;minimize:yes;maximize:yes
//	 showModalDialog(url,null,'dialogWidth:1020px;dialogHeight:700px;resizable:yes;scroll:no;status:no;center:yes;help:no;minimize:yes;maximize:yes');
}
 
/**
 * 事件处理窗口信息
 */
function opensjclWindow(){
	/*var url = baseUrl + '/pages/despages/warn/GaoJingXinXi.jsp?subsId='+yhbId+'&gaojing=1&bianwei=0';
	showModalDialog(url,null,'dialogWidth:1020px;dialogHeight:700px;center:Yes;help:no;status:no;location=no');*/
	
//	testOpen(yhbId,0,1,'','告警信息');
	testOpen(yhbId,1,0,'','变位信息');
	
}
 

//-------------------------------------------------------------暂时不用----------------------------------------------------------------------------
/**
 * 获取系统时间
 *//*
var CurrentTime;
var isFistTimeSet=true;//首次取时间
function bindSysTimeSet(){
	 $.post(webContextRoot +'orgControl/querySysDateTime.action', //请求路径
			 function(data){//回调
		        
		         var timeArray = data.split(',');
		         CurrentTime = new Date(timeArray[0],timeArray[1]-1,timeArray[2],timeArray[3],timeArray[4],timeArray[5]);
		         document.getElementById("clock").innerHTML = DateUtil.dateToStr('yyyy-MM-dd HH:mm:ss',CurrentTime);
	         },
	 "json");//返回格式
	 if(isFistTimeSet==true){
		 setInterval(bindSysTimeSet, 300000);//每间隔5分钟从数据库中取一次系统时间
		 setInterval(addseTime, 1000);
	 }
	 isFistTimeSet=false;
}

/**
 * 告警信息
 */
function queryGaoJing(){
	var str= '';
	$.post(webContextRoot +'yhbjk/queryGaoJing.action', //请求路径
			 function(data){//回调
                 for(var i=0;i<data.length;i++){
                	if(data[i].alarmLevel=='1'){
                		 str += '<table class="gaojingxinxi-table" style="color:red;"><tbody class="hehe">';
                	}else if(data[i].alarmLevel=='2'){
                		 str += '<table class="gaojingxinxi-table" style="color:orange;"><tbody class="hehe">';
                	}else if(data[i].alarmLevel=='3'){
                		 str += '<table class="gaojingxinxi-table" style="color:#FF8500;"><tbody class="hehe">';
                	}else if(data[i].alarmLevel=='4'){
                		 str += '<table class="gaojingxinxi-table" style="color:gray;"><tbody class="hehe">';
                	}else{
                		str += '<table class="gaojingxinxi-table" style="color:gray;"><tbody class="hehe">';
                	}
                	var alrName = '';
                	if(data[i].mpCode == '02'){
                		alrName = '变位';
                	}else{
                		alrName = '越限';
                	}
                	str +='<tr><td class="consType" style="display:none;">'+data[i].consId+'</td></tr>'
                	str +='<tr><td class="subsType" style="display:none;">'+data[i].subsId+'</td></tr>'
                	str +='<tr><td class="devType" style="display:none;">'+data[i].deviceId+'</td></tr>'
                	str +='<tr><td class="deviceType" style="display:none;">'+data[i].deviceType+'</td></tr>'
                	str +='<tr><td class="mpType" style="display:none;">'+data[i].mpId+'</td></tr>'
       	            str +='<tr><td title="告警等级:'+data[i].alarmLevelName+'">'+data[i].consName+'</td>';
       	            str +='<td title="告警等级:'+data[i].alarmLevelName+'">|&nbsp;'+data[i].subsName+'</td></tr>';
       	            str +='<tr style="border-bottom: 1px solid #e9e9e9"><td title="告警等级:'+data[i].alarmLevelName+'">'+data[i].deviceName+'&nbsp;'+alrName+'</td>';
       	            str +='<td title="告警等级:'+data[i].alarmLevelName+'">|&nbsp;'+data[i].alarmStartTime+'</td></tr>';
       	            str +='</tbody></table>';
                 }
                 $('.gaojingxinxi-table').remove();
                 $('#gaojing').append(str);
                /* var topHeight=data.length*70;
                 $("#gaojing").css({position: 'relative', top: topHeight+'px'});
				 $("#gaojing").animate({top:'0px'},1000);*/
                 $('.hehe').bind('contextmenu',function(e){
     		        e.preventDefault();
     		        consId = $(e.currentTarget).find('.consType').text(); 
     		        subsId = $(e.currentTarget).find('.subsType').text(); 
     		        devId  = $(e.currentTarget).find('.devType').text(); 
     		        deviceId = $(e.currentTarget).find('.deviceType').text(); 
     		        mpId = $(e.currentTarget).find('.mpType').text(); 
     		        $('#gj').menu('show', {
     		            left: e.pageX,
     		            top: e.pageY
     		        });
     		    });
	         },
	 "json");//返回格式
}

/**
 * 变位信息
 */
function queryBianWei(){
	var str= '';
	$.post(webContextRoot +'yhbjk/queryBianwei.action', //请求路径
			 function(data){//回调
		          str = '<tbody class="bianweixinxi-tbody">';
		          for(var i=0;i<data.length;i++){
		        	  str +='<tr><td>'+data[i].consName+'</td>';
		        	  str +='<td>|&nbsp;'+data[i].subsName+'</td></tr>';
		        	  str +='<tr style="border-bottom: 1px solid #e9e9e9"><td>'+data[i].deviceName+'&nbsp;'+data[i].preValue+'>'+data[i].curValue+'</td>';
		        	  str +='<td>|&nbsp;'+data[i].dataDate+'</td></tr>';
		          }
		          str +='</tbody>';
		          $('.bianweixinxi-tbody').remove();
		          $('#bianwei').append(str);
	         },
	 "json");//返回格式
}

//查询告警信息
//function testOpen(vala,valb){
//	var content = "<iframe src='"+baseUrl+"/pages/despages/warn/GaoJingXinXi.jsp?bianwei="+vala+"&gaojing="+valb+"' width='100%' height='99%' frameborder='0' scrolling='no'/>";	
//	var boarddiv = "<div id='msgwindow' style='top:40px;' title='详情'/>";
//	$(document.body).append(boarddiv);
//	var win = $("#msgwindow").dialog({
//		content : content,
//		width : document.body.clientWidth-200,
//		height : document.body.clientHeight-80,
//		modal : 'shadow',
//		title : '详情',
//		onClose : function() {
//			$(this).window('close');
//		}
//	});
//	win.dialog('open');
//}

/**
 * 告警处理派发工单
 */
function memuclickpf(){
	var content = "<iframe src='"+baseUrl+"/pages/despages/labour/PaiFaGongDan.jsp?consId="+consId+"&userTranId="+subsId+"&devId="+devId+"&deviceType="+deviceId+"&mpId="+mpId+"' width='100%' height='99%' frameborder='0' scrolling='no'/>";	
	var boarddiv = "<div id='msgwindowa' style='top:40px;' title='工单派送'/>";
	$(document.body).append(boarddiv);
	var win = $("#msgwindowa").dialog({
		content : content,
		width : document.body.clientWidth-200,
		height : document.body.clientHeight-80,
		modal : 'shadow',
		title : '工单派送信息',
		onClose : function() {
			$(this).window('close');
			queryGaoJing();
		}
	});
	win.dialog('open');
}

/**
 * 告警处理忽略
 */
function memuclickhl(value){
	
	$.messager.confirm('确认', '确定忽略该告警吗？', function(r){
		if(r){
			$.post(webContextRoot +'warn/querygaojingchaxunshouyeadd.action',{ //请求路径
				'gaoJIngChaXunSYModel.mpId':mpId,
				'gaoJIngChaXunSYModel.userId':userId,
				'gaoJIngChaXunSYModel.bianwei':value},//请求参数
			   	function(data){
				  var str = JSON.stringify(data)
				  if(str.indexOf("success")){
					  $.messager.alert('提示','告警已忽略','info');
					  $('.gaojingxinxi-table').remove();
					  queryGaoJing();
				  }else{
					  $.messager.alert('提示','告警忽略失败','info');
				  }
		    });
		}
	});
}

//用户点击刷新时，将数据展示的行列数以及是否选中缩略图保存到数据库中
 function saveDataGrid(gridData){
   var is_showThumbnail = $('#chk_show-thumbnail').is(':checked');
	    if(is_showThumbnail){
	    	is_showThumbnail=1;
	    }else{
	    	is_showThumbnail=0;
	    }
 $.post(webContextRoot +'yhbjk/addOrgDataGrid.action', //请求路径
 		{'orgDataGridModel.userId': userId,
 	     'orgDataGridModel.rowNum':gridData.rows,
 	     'orgDataGridModel.listNum':gridData.columns,
 	     'orgDataGridModel.showType':is_showThumbnail
 		},
 "json");
 }
/**
 * 页面系统每秒钟刷新一次
 */
/*function addseTime(){
	 CurrentTime = DateUtil.dateAdd('s',1,CurrentTime);
	 document.getElementById("clock").innerHTML = DateUtil.dateToStr('yyyy-MM-dd HH:mm:ss',CurrentTime);
}*/
 /**
  * 刷新页面的展示 2017-3-29 wang
  * @param gridData
  * @param isFirstIni
  */
  function refresh_grid(gridData, isFirstIni) {
 	 //重新设置页面的宽高长度
     var height = (100 / gridData.rows).toFixed(4) + "%";
     var width = (100 / gridData.columns).toFixed(4) + "%";
     //将缩略图是否选中，以及行列数显示在页面上
     	$('#cmb_rowValue').combobox('setValue', gridData.rows);
		$('#cmb_listValue').combobox('setValue', gridData.columns);
		$('#chk_show-thumbnail').attr("checked",gridData.is_showThumbnail);
		
 		    if (gridData.is_showThumbnail){
 		        $('.yhb').show();
 		        $('.detail-panel').hide();
// 		        $('#chk_show-thumbnail').attr("checked",true);
 		    }else{
 		        $('.yhb').hide();
 		        $('.detail-panel').show();
// 		        $('#chk_show-thumbnail').attr("checked",false);
 		    }
 		   
// 		   loadQyjkPage();	

     $('.cell').css({"width":width,"height":height,"display":"block"});

     if (isFirstIni){
         $("div.holder").jPages({
             containerID : "coreContainer_panel",
             perPage : gridData.getCellCount(),
             first: "首页",
             last: "尾页",
             previous: false,
             next: false
         });
     }
     else{
         $("div.holder").jPages("destroy").jPages({
             containerID : "coreContainer_panel",
             perPage : gridData.getCellCount(),
             first: "首页",
             last: "尾页",
             previous: false,
             next: false
         });
     }
     
 }
  /*******************************************************************************
   * 打开窗口，不可拖动窗体大小 并且让窗口在屏幕上居中
   * 
   * @param url
   * @param winName
   * @param width
   * @param height
   * @param isClosed
   */
  function OpenWinUnRes(url, winName, width, height, isClosed) {
  	xposition = 0;
  	yposition = 0;

  	if ((parseInt(navigator.appVersion) >= 4)) {
  		xposition = (screen.width - width) / 2;
  		yposition = (screen.height - height) / 2;
  	}
  	theproperty = "width=" + width + "," + "height=" + height + ","
  			+ "location=0," + "menubar=0," + "resizable=0," + "scrollbars=1,"
  			+ "status=1," + "titlebar=0," + "toolbar=0," + "hotkeys=0,"
  			+ "screenx=" + xposition + "," // 仅适用于Netscape
  			+ "screeny=" + yposition + "," // 仅适用于Netscape
  			+ "left=" + xposition + "," // IE
  			+ "top=" + yposition; // IE
  	monwin = window.open(url, winName, theproperty, false);
  	if (isClosed) {
  		monwin.close();
  		monwin = window.open(url, winName, theproperty, false);
  	}
  	monwin.focus();
  }
  
  function onThumbnail(){
	//点击缩略图按钮所触发的事件
//		var thumbnail = ("#chk_show-thumbnail").is(":checked");
	  var status = document.getElementById("chk_show-thumbnail");
	    	if(status.checked){	    		
	    		 showType=1;	
	    	}	
			else {
				 showType=0;
			}
	    	$.post(webContextRoot +'yhbjk/queryClickOrgDataGrid.action', //请求路径
	    	 		{'orgDataGridModel.userId': userId,
	    		     'orgDataGridModel.showType': showType,
	    	 		},
	    	 	   	function(data){//回调
	    		 		if (data==0) {
	    	 				 gridData = {
	    	 				        rows: 3,
	    	 				        columns: 4,
	    	 				       is_showThumbnail:status.checked,
	    	 				        getCellCount: function () {
	    	 				            return this.rows * this.columns;
	    	 				        }
	    	 				 };    	 				
	    	 			}else{
	    	 				if(data.showType==1){
	    	 					showThumbnail=true;
	    	 					
	    	 				}else{
	    	 					showThumbnail=false;
	    	 				}
	    	 				gridData = {
	    	 				        rows: data.rowNum,
	    	 				        columns: data.listNum,
	    	 				       is_showThumbnail:showThumbnail,
	    	 				        getCellCount: function () {
	    	 				            return this.rows * this.columns;
	    	 				        }
	    	 				
	    	 				 };
//	    	 				$('#cmb_rowValue').combobox('setValue', gridData.rows);
//	    	 				$('#cmb_listValue').combobox('setValue', gridData.columns);	    	 				
	    	 			}
	    		 		 refresh_grid(gridData);
	    		 		saveDataGrid(gridData);//将用户所选择的行列数以及是否勾选缩略图保存到数据库
	    	 	},
	    	 "json");	
  }
  
//---------------------------------------用户组
  
  