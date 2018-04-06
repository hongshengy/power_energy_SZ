/**
 * 定义企业id
 */
var cons_id;
/**
 * 用户变id
 */
var userTranId;
/**
 * 一次接线图id
 */
var selectSvgId;
var min=5;
var ifSvgcontentClick = false;
//删除按钮的svgId
var DeleteMpAllSvgId;
//删除按钮的objId
var DeleteMpAllObjId;
var g_yicituguanli = {
        isShowType: 0
    };
//是否第一次点击动画开关配置按钮
var isSwitchAnimationClick = true;
//原始位置
var orgposition = "";
//上次点击的svgId
var isFirstSvgId = "";
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

/**
 * svg线图的起始点位置
 */
var x1;
var x2;
var y1;
var y2;
/**
 * 等待信息
 */
var divIswait = 0;
/**
 * 一次图配置集合
 */
var svgSet = [];
/**
 * 用户变下的配置svg图集合
 */
var svgList = [];

/**
 * 选择的对象配置
 */
var setSvgObj=null;
/**
 * 点击的对象配置
 */
var clickSetObj=null;
/**
 * 获取设备，测点树
 */
var treeData = [];
var devDatas=[];
var openNode = [];
/**
 * 新建svg代码
 */
var newSvgCode = '<svg width="1212" height="726" xmlns="http://www.w3.org/2000/svg" id="svg_Main" version="1.1" viewBox="0 0 1212 726">\n'
	+ '<!-- Created with SVG-edit - http://svg-edit.googlecode.com/ -->\n'
	+ '<g>\n'
	+  '<title>Layer 1</title>\n'
	+ '</g>\n'
	+ '</svg>';
/**
 * 
 */
var unionConsId;
var unionUserTranId;
var unionSvgId;
var unionConsName;
var unionSubsName;
var unionSvgName;
var unionSvg;

unionConsId = GetUrlParam("consId");
unionConsName = GetUrlParam("consName");
unionUserTranId = GetUrlParam("userTranId");
unionSubsName = GetUrlParam("subsName");
unionSvgId = GetUrlParam("svgId");
unionSvgName = GetUrlParam("svgName");
unionSvg = GetUrlParam("svgFile");
$(document).ready(function() {
	setTimeout(function()
	{
$('#dialog_box').hide();
//$("#dialog_box").css("display","none");
},100);
	selectSvgId=unionSvgId;
	userTranId=unionUserTranId
	//给新建一次图的弹框是指宽度
    $('#newSvgDialog .easyui-textbox-lazyLoad').textbox({
        width: 150
    });
    //修改一次图的弹框是指宽度
    $('#EditSvgDialog .easyui-textbox-lazyLoad').textbox({
        width: 150
    });
   //删除一次图的弹框是指宽度     
    $('#divDelete .easyui-textbox-lazyLoad').textbox({
        width: 150
    });
    //row6设置宽度
    $('.row6 .easyui-textbox-lazyLoad').textbox({
        width: '100%',
        disabled: true
    });
    
    /**
     * 元件
     */
    $('.resizable-panel').resizable({
        minWidth:50,
        minHeight:50,
        handles:'s',
        edge: 10
    });

    $('.accordion-panel').accordion({
        multiple:true,
        border:false
    });
    
/**
 * 停运方式初始化
 */
    $('#stopType-combobox').combobox({
        width: '100%',
        panelWidth: null,
        valueField: 'value',
        textField: 'text',
        editable: false,
        data: [{
            value: '1',
            text: '更换对象模式'
        }, {
            value: '2',
            text: '文本'
        }, {
            value: '3',
            text: '填充变色'
        }, {
            value: '4',
            text: '边框变色'
        }],
        onSelect: function (record) {
        	var stotype = record.value;
        	if(clickSetObj == null) 
    		{
        		clickSetObj={};
    		}
        	clickSetObj.stopType = stotype;        	
        	//if (clickSetObj.objId == undefined){
        		clickSetObj.objId = $('#elem_id').val();
        	//}
            if (record.value == '1') {
                $('#stopType-textbox').textbox('enable');//停运Id设置可用
                $('#stopType-textbox').textbox({
                	onChange : function(newValue, oldValue) { 
                		    
                		exit = true;
                		newValue = $('#stopType-textbox').textbox('getText');  
                		if(newValue!=""){
                			stopObjId = newValue;     
                		}
                		
                		clickSetObj.stopObjId = stopObjId;               		
                	}
                });
            } else {
                $('#stopType-textbox').textbox('disable');//停运Id设置不可用
                $('#stopType-textbox').textbox('setValue',"");//停运Id赋值为空
                clickSetObj.stopObjId = "";
            }
        }
    });
//var abc="";
/**
 * 无信号方式初始化
 */   
    $('#noSingle-combobox').combobox({
        width: '100%',
        panelWidth: null,
        valueField: 'value',
        textField: 'text',
        editable: false,
        data: [{
            value: '0',
            text: '文本'
        }, {
            value: '1',
            text: '显示控件'
        }],
        onSelect: function (record) {
        	var nosingleType = record.value;
        	if(clickSetObj == null) 
    		{
        		clickSetObj={};
    		}
        	//if (clickSetObj.objId == undefined){
        		clickSetObj.objId = $('#elem_id').val();
        	//}
        	clickSetObj.nosingleType = nosingleType;
            if (record.value == '1') {
                $('#noSingleId').textbox('enable');//无信号Id设置可用
                $('#noSingleId').textbox('setValue',"0000");
                $('#noSingleId').textbox({
                	onChange : function(newValue, oldValue) {
                		exit = true;
                		newValue = $('#noSingleId').textbox('getText');
                		
                		if(newValue!=""){
                			noSingleId = newValue;     
                		}
                		
                		clickSetObj.noSingleId = noSingleId;               		
                	}
                });
            } else {
                $('#noSingleId').textbox('disable');//无信号Id设置不可用
                $('#noSingleId').textbox('setValue',"");//无信号Id赋值为空
                clickSetObj.noSingleId = "";   
            }
        }
    });
/**
 * 告警方式初始化
 */    
    $('#alarm-combobox').combobox({
        width: '100%',
        panelWidth: null,
        valueField: 'value',
        textField: 'text',
        editable: false,
        data: [{
            value: '0',
            text: '边框变色'
        }, {
            value: '1',
            text: '填充变色'
        }, {
            value: '2',
            text: '文本'
        }, {
            value: '3',
            text: '替换对象'
        }],
        onSelect: function (record) {
        	var alarmMode = record.value;
        	if(clickSetObj == null) 
    		{
        		clickSetObj={};
    		}
        	//if (clickSetObj.objId == undefined){
        		clickSetObj.objId = $('#elem_id').val();
        	//}
        	clickSetObj.alarmMode = alarmMode;
            if (record.value == '3') {
                $('#alarmId').textbox('enable');//告警ID设置可用

                $('#alarmId').textbox({
                	onChange : function(newValue, oldValue) {
                		exit = true;
                		newValue = $('#alarmId').textbox('getText');
                		
                		if(newValue!=""){
                			alarmId = newValue;     
                		}
                		
                		clickSetObj.alarmObjId = alarmId;               		
                	}
                });
            } else {
                $('#alarmId').textbox('disable');//告警ID设置不可用
                $('#alarmId').textbox('setValue',"");//告警ID赋值为空
                clickSetObj.alarmObjId = ""; 
            }
        }
    });
/**
 * 点击事件初始化
 */    
    $('#btnClick-combobox').combobox({
        width: '100%',
        panelWidth: null,
        valueField: 'value',
        textField: 'text',
        editable: false,
        data: [{
            value: 'YX_Click',
            text: '遥信'
        }, {
            value: 'YC_Click',
            text: '遥测/遥脉'
        }, {
            value: 'DEV_Click',
            text: '设备事件'
        }],
        onSelect: function (record) {
        	var clickevent = record.value;
        	if(clickSetObj == null) 
    		{
        		clickSetObj={};
    		}
        	clickSetObj.clickEvent = clickevent;
        	//if (clickSetObj.objId == undefined){
        		clickSetObj.objId = $('#elem_id').val();
        	//}
        }
    });
/**
 * 开关方式初始化
 */
    $('#switchType-combobox').combobox({
        width: '100%',
        panelWidth: null,
        valueField: 'value',
        textField: 'text',
        editable: false,
        data: [{
            value: '1',
            text: '替换对象'
        }, {
            value: '2',
            text: '动态方式'
        }, {
            value: '3',
            text: '方框开关'
        }, {
            value: '4',
            text: '填充变色'
        }, {
            value: '5',
            text: '边框变色'
        }],
        onSelect: function (record) {
        	var openType = record.value;
        	if(clickSetObj == null) 
    		{
        		clickSetObj={};
    		}
        	clickSetObj.openType = openType;
        	//if (clickSetObj.objId == undefined){
        		clickSetObj.objId = $('#elem_id').val();
        	//}
            //$('#stopType-combobox').combobox({disabled:false});//停运方式不可用
        	if(clickSetObj.openobjId == undefined || clickSetObj.openobjId == ""){
                $('#alarm-combobox').combobox({disabled:false});//告警方式可用
                $('#stopType-combobox').combobox({disabled:false});
                $('#noSingle-combobox').combobox({disabled:false});
                $("#switchDirct-combobox").combobox('setValue', "");
        	}
            $("#isSwitch-button").attr("checked", "checked");//是否按钮选中
            if (record.value == '1') { 
            	document.getElementById("byvoltChkBox").disabled=false;
            	$("#switchDirct-combobox").textbox('disable');//方向开关不可用
            	$('#SwitchAnimation').linkbutton('disable');//动画开关不可用
                $('#switchDirct-textbox').textbox('enable');//方向开关可用
                $('#switchId').textbox('enable'); //开关ID可用       
                
                $("#switchDirct-combobox").textbox('disable');//方向开关不可用
            	$('#SwitchAnimation').linkbutton('disable');//动画开关不可用
                if(clickSetObj.openobjId == undefined || clickSetObj.openobjId == ""){
                	$('#stopType-combobox').combobox('setValue', "");
                    $('#noSingle-combobox').combobox('setValue', "");
                    $('#alarm-combobox').combobox('setValue', "");
                	$('#stopType-combobox').combobox('setValue', "");//停运方式赋值为空
                    $('#noSingle-combobox').combobox('setValue', "");//无信号方式赋值为空
                    $('#alarm-combobox').combobox('setValue', "");//告警方式赋值为空
                    $('#noSingleId').textbox('setValue',"");//无信号Id赋值为空
                    $('#noSingleId').textbox('disable');//无信号Id不可用
                }           
                $('#switchId').textbox({
                	onChange : function(newValue, oldValue) {
                		
                		exit = true;
                		newValue = $('#switchId').textbox('getText');
                		
                		if(newValue!=""){
                			switchId = newValue;     
                		}
                		
                		
                		clickSetObj.openobjId = switchId;               		
                	}
                });
            } else if(record.value == '2'){
//            	$('#stopType-combobox').combobox({disabled:false});
//                $('#noSingle-combobox').combobox({disabled:false});
//                $('#alarm-combobox').combobox({disabled:false});
            	document.getElementById("byvoltChkBox").disabled=false;
            	$("#switchDirct-combobox").textbox('enable');//方向开关可用
            	$('#SwitchAnimation').linkbutton('enable');//动画开关可用
                $('#switchId').textbox('disable'); //开挂Id不可用
                $('#stopType-combobox').combobox('setValue', "4");//方向开关赋值为4
                $('#noSingle-combobox').combobox('setValue', "1");//无信号方式赋值为1
                $('#alarm-combobox').combobox('setValue', "0");//告警方式赋值为0
                $('#switchId').textbox('setValue',"");//开关Id赋值为空
                $('#byvoltChkBox').attr("checked", "checked");//电压等级被选中
                clickSetObj.openobjId = "";
            }else if(record.value == '3'){
//                $('#noSingle-combobox').combobox({disabled:false});
            	document.getElementById("byvoltChkBox").disabled=false;
            	$("#switchDirct-combobox").combobox('setValue', "");
            	$("#switchDirct-combobox").textbox('disable');//方向开关不可用
            	$('#SwitchAnimation').linkbutton('disable');//动画开关不可用
                $('#switchId').textbox('disable');//开挂Id不可用             
                $('#stopType-combobox').combobox({disabled:true});//停运方式不可用
                $('#stopType-combobox').combobox('setValue', "4");//停运方式赋值为4
                $('#alarm-combobox').combobox({disabled:true});//告警方式不可用
                $('#noSingle-combobox').combobox('setValue', "1");//无信号方式赋值为1
                $('#alarm-combobox').combobox('setValue', "1");//告警方式赋值为1
                $('#switchId').textbox('setValue',""); //开关Id赋值为空
                $('#byvoltChkBox').attr("checked", "checked");//电压等级被选中
                $("#switchDirct-combobox").textbox('disable');//方向开关不可用
            	$('#SwitchAnimation').linkbutton('disable');//动画开关不可用
                clickSetObj.openobjId = "";
            }else if(record.value == '4'){
//            	$('#stopType-combobox').combobox({disabled:false});
//                $('#noSingle-combobox').combobox({disabled:false});
//                $('#alarm-combobox').combobox({disabled:false});
            	$("#switchDirct-combobox").combobox('setValue', "");
            	$("#switchDirct-combobox").textbox('disable');//方向开关不可用
            	$('#SwitchAnimation').linkbutton('disable');//动画开关不可用
                $('#switchId').textbox('disable');//开挂Id不可用        
                $('#stopType-combobox').combobox('setValue', "3");//无信号方式赋值为3
                $('#noSingle-combobox').combobox('setValue', "1");//无信号方式赋值为1
                $('#alarm-combobox').combobox('setValue', "1");//告警方式赋值为1
                $('#switchId').textbox('setValue',""); //开关Id赋值为空 
                $("#switchDirct-combobox").textbox('disable');//方向开关不可用
            	$('#SwitchAnimation').linkbutton('disable');//动画开关不可用
            	document.getElementById("byvoltChkBox").disabled=true;
            	$("#byvoltChkBox").removeAttr("checked");//不选择颜色根据电压等级
                clickSetObj.openobjId = "";
            }else if(record.value == '5'){
//            	$('#stopType-combobox').combobox({disabled:false});
//                $('#noSingle-combobox').combobox({disabled:false});
//                $('#alarm-combobox').combobox({disabled:false});
            	$("#switchDirct-combobox").combobox('setValue', "");
            	$("#switchDirct-combobox").textbox('disable');//方向开关不可用
            	$('#SwitchAnimation').linkbutton('disable');//动画开关不可用
                $('#switchId').textbox('disable');//开挂Id不可用   
                $('#stopType-combobox').combobox('setValue', "4");//无信号方式赋值为4
                $('#noSingle-combobox').combobox('setValue', "1");//无信号方式赋值为1
                $('#alarm-combobox').combobox('setValue', "0");//告警方式赋值为0
                $('#switchId').textbox('setValue',"");//开关Id赋值为空 
                $("#switchDirct-combobox").textbox('disable');//方向开关不可用
            	$('#SwitchAnimation').linkbutton('disable');//动画开关不可用
            	document.getElementById("byvoltChkBox").disabled=true;
            	$("#byvoltChkBox").removeAttr("checked");//不选择颜色根据电压等级
                clickSetObj.openobjId = "";
            }
        }
    });
/**
 * 开关方向初始化
 */
    $('#switchDirct-combobox').combobox({
        width: '100%',
        panelWidth: null,
        valueField: 'value',
        textField: 'text',
        editable: false,
        data: [{
            value: 'x_1',
            text: 'x1'
        }, {
            value: 'x_2',
            text: 'x2'
        }, {
            value: 'y_1',
            text: 'y1'
        }, {
            value: 'y_2',
            text: 'y2'
        }],
        onSelect: function (record) {
        	var id = record.value;
        	if(clickSetObj == null) 
    		{
        		clickSetObj={};
    		}
        	clickSetObj.id = id;
        	var str =(id==null || id=="")?"": id.split("_");
        	var dirct = str==""?"":str[0];
        	var oneortwo =str==""?"": str[1];
        	clickSetObj.dirct = dirct;
        	clickSetObj.oneOrTwo = oneortwo;
        }

    });
 
/**
 * 测点初始化
 */
    $('#mpGrid').datagrid({
    	fitColumns: true,
        singleSelect: true,
        columns: [[
            {field: 'MP_ID', title: '', hidden:true},
            {field: 'MP_NAME', title: '测点名称', width: 100},
            {field: 'MP_TYPE', title: '测点类型', width: 50},
            {field: 'MP_CODE', title: '测点编码', width: 60},
            {field: 'COLL_ADDR', title: '采集地址码', width: 60}
        ]]
    });
   /**
    * 测点自适应
    */ 
    var westPanel = $('body').layout('panel', 'east');
    computedSize({height: westPanel.panel('options').height});
    westPanel.panel({
        onResize: function (width, height) {
            computedSize({height: height});
        }
    });
    function computedSize(size) {
        var height = size.height;
        height -= 550;
        height = height < 100 ? 100 : height;
        $('#mpGrid').datagrid('resize',{
            height: height
        });
    }
/**
 * 一次图新建初始化
 */
    $('#newSvgDialog').dialog({
        title: '新建',
        closed: true,
        modal: true,
        shadow:false,
        buttons: '#buttons'
    });

    /**
     * 一次图新建初始化
     */
    $('#EditSvgDialog').dialog({
        title: '修改',
        closed: true,
        modal: true,
        shadow:false,
        buttons: '#buttons2'
    });
    /**
     * 删除确认事件初始化
     */
    $('#divDelete').dialog({
        title: '删除',
        closed: true,
        modal: true,
        shadow:false,
        buttons: '#button1'
    });
    /**
     * 上传一次图弹出层
     */
    $('#divUpload').dialog({
        title: '上传',
        closed: true,
        modal: true,
        shadow:false,
        buttons: '#button3'
    });
/**
 * 电压等级初始化
 */
    $('#volSettingDialog').dialog({
        title: '电压等级配置',
        closed: true,
        modal: true,    
        width: 420,    
        height: 270, 
        shadow:false,
        buttons: '#buttons1'
    });
/**
 * 等待遮罩层
 */
    $('#divWaiting').dialog({    
    	title: '等待中',    
        width: 400,    
        height: 200,    
        closed: true,    
        cache: false,   
        closable: false,
        modal: true   
    });
/**
 * 颜色根据电压等级初始化
 */    
    $("#byvoltChkBox").click(function (){
    	byvoltChkBoxClick();
    });
/**
 *是否开关初始化 
 */   
    $("#isSwitch-button").click(function (){
    	isSwitchbuttonClick();
    });
    /**
     * 关闭元件
     */ 
    $("#closePanel").click(function (){
    	closePanelClick();
    });    
    ConsIni(unionConsName,unionConsId,unionSubsName,unionUserTranId,unionSvgId,unionSvgName,unionSvg);
	/**
	 * 给svg图添加点击事件
	 */
	$("#svgcontent").bind("click",click);
	/**
	 * 新建一次图按钮保存点击事件绑定
	 */
	$("#newSvgBtn").click(function() {
		NewSvgClick();
	});
	/**
	 * 新建一次图按钮点取消击事件绑定
	 */
	$("#quitSvgBtn").click(function() {
		QuitSvgBtnClick();
	});
	/**
	 * 新增一次图按钮点击事件
	 */
	$("#addSvgBtn").click(function() {
		$("#newSvgName").textbox('setValue',"");//一次图名称
		$("#newSvgOrder").textbox('setValue',"");//电压等级
		$('#newSvgDialog').window('open');//新建的打开弹出层  
	});
	/**
	 * 删除一次图按钮时间
	 */
	$("#deleteSvgBtn").click(function() {
		deleteSvgBtnClick();
	});
	/**
	 * 修改一次图按钮事件
	 */
	$("#updateSvgBtn").click(function() {
		updateSvgBtnClick();
	});
	/**
	 * 电压等级颜色设置点击事件
	 */
	$("#voltSettingColorBtn").click(function() {
		voltSettingColorBtnClick();
	});
	/**
	 * 动画配置按钮
	 */
	$("#SwitchAnimation").click(function() {
		if(!$('#SwitchAnimation').linkbutton("options")["disabled"])
		{
		SwitchAnimationClick();
		}
	});
	/**
	 * 保存测点事件
	 */	
	$("#InsertMpAll").click(function() {
		if(!$('#InsertMpAll').linkbutton("options")["disabled"])
		{
			insert();
		}
	});
	$('#InsertMpAll').linkbutton({disabled:true});
	/**
	 * 删除按钮点击事件
	 */
	$("#DeleteMpAll").click(function() {
		if(!$('#DeleteMpAll').linkbutton("options")["disabled"])
		{			
			DeleteMpAll();
		}
	});
	$('#DeleteMpAll').linkbutton({disabled:true});
/**
 * 电压等级颜色设置按钮点击事件绑定
 */
	$("#voltSettingBtn").click(function() {
		if(!$('#voltSettingBtn').linkbutton("options")["disabled"])
			{
			/*$('#volGrid').datagrid("clearChecked");
			var rows = $('#volGrid').datagrid("getRows");
			for (var i = 0, len = rows.length; i < len; i++) {
				var colorId = "#color_" + rows[i].volt;
				$(colorId).val("#000000");
			}*/
			if(selectSvgId == null)
			{
				$.messager.alert('警告','请选择一次图！'); 
				return;
			}
			$('#volSettingDialog').window('open');
			GetSvgColorSetting(selectSvgId);
			}
	});
//	$('#voltSettingBtn').linkbutton({disabled:true});

	/**
	 * svg文件上传
	 */
		$("#uploadSvgBtn").click(function() {
			if(!$('#uploadSvgBtn').linkbutton("options")["disabled"])
				{
				UploadSvgBtnClick();
				}
		});
//		$('#uploadSvgBtn').linkbutton({disabled:true});
	/**
	 * 初始化一次接线图控件
	 */

//		$('#svgSelectCtl').combobox({
//			url : basePath+ 'svg/QuerySubSvgList.action?userTranId='+ unionUserTranId,
//			method : 'get',
//			valueField : 'svgId',
//			textField : 'svgName',
//			multiple : false,// 是否支持多选
//			onSelect : function(record) {
//				SvgSelectCtlChange(record.svgId);
//				//deleteSvgBtnClick(userTranId,record.svgId);
//				$("#deleteSvgBtn").removeClass("hidden");//隐藏删除按钮
//				$("#updateSvgBtn").removeClass("hidden");//隐藏修改按钮
//				cleanAll();
//			}
////		,
////			onLoadSuccess : function() {
////				svgList = $('#svgSelectCtl').combobox('getData');
//	//
//////				//一次接线图获取
//////				IniSvgTools(newSvgCode);
////			}
//		});
	/**
	 * 初始化用户变控件
	 */
//	$('#subSelectCtl').combobox({
//		valueField : 'id',
//		textField : 'text'
//	});
	//初始化设备树
	$('#devSelectCtl').combotree({
		method : 'get',
		multiple : false,// 是否支持多选
	});
	$("#mpChkBox").click(function(){
		MPChk_Click();
		
	});
	/**
	 * 弹出层确定按钮事件
	 */
	/*$("#DeleteSub").click(function(){
		DeleteSubClick();
		
	});*/
	/**
	 * 弹出层取消按钮事件
	 */
	/*$("#QuitDeleteSub").click(function(){
		QuitDeleteSubClick();
		
	});*/
	/**
	 * 修改确认按钮事件
	 */
	$("#addEditSvg").click(function(){
		addEditSvgClick();		
	});
	/**
	 * 修改取消按钮事件
	 */
	$("#quitEditSvg").click(function(){
		quitEditSvgClick();		
	});
	/**
	 * 弹出层确定按钮事件
	 */
	/*$("#UploadSub").click(function(){
		UploadSubClick();
		
	});*/
	/**
	 * 弹出层取消按钮事件
	 */
	/*$("#QuitSub").click(function(){
		QuitSubClick();
		
	});*/
	/**
	 * 获取电压等级配置
	 */
	$('#volGrid').datagrid({
		width : 420,
		height : 200,
		close : true,
		checkOnSelect : false,
		columns : [ [
				{
					field : 'checkbox',
					title : '复选框',
					width : 30,
					checkbox : true
				},
				{
					field : 'volt',
					title : '电压',
					align : 'center',
					width : 70,
					hidden : true
				},
				{
					field : 'codeName',
					title : '电压等级',
					align : 'center',
					width : 100
				},
				{
					field : 'codeValue',
					title : '电压等级值',
					align : 'center',
					width : 110
				},
				{
					field : 'Id',
					title : '颜色配置',
					align : 'center',
					width : 150,
					formatter : function(value, row, index) {
						var cId = "color_" + row.volt;
						return "<input type='color' gridIndex='"
								+ index + "' name='color' id=" + cId
								+ " value='color' />";
					}
				},
	
		] ]
	});
//	setTimeout(function()
//			{
//		//一次接线图获取
//		IniSvgTools(newSvgCode);
//			},500);
	//$("#isSwitch-button")。attr("disabled","disabled");
	document.getElementById("isSwitch-button").disabled=true;
//	$("#devSelectCtl").combobox({disabled:true});
	$("#stopType-combobox").combobox({disabled:true});
	$("#noSingle-combobox").combobox({disabled:true});
	$("#alarm-combobox").combobox({disabled:true});
	$("#btnClick-combobox").combobox({disabled:true});
	
    $("#switchType-combobox").combobox({disabled:true});//开关方式不可用
    $('#switchId').textbox('disable');//开关Id不可用
	$("#switchDirct-combobox").combobox({disabled:true});//开关方向不可用
    $('#SwitchAnimation').linkbutton('disable');//动画开关不可用
    /**
     * 点击绑定选中事件
     */
  /*  $('#svgroot').click(function(e) {
		if (e.target.id == 'svgroot') {
			$("#selectorGroup0").attr("display","inline");
			var arr=$("#selectorGroup0").find("g");
			$(arr).attr("display","inline");			
		}
	});*/
    
	var width = document.documentElement.clientWidth - 200;
    var height = document.documentElement.clientHeight - 100;

	$('#dialog2').dialog({
        title: '一次图配置管理',
        width: width,
        height: height,
        closed: true,
        modal: true,
        onOpen: function () {
            if (window.frames[0].location.href === 'about:blank'){
                window.frames[0].location.href = basePath+"pages/despages/svgEdit/svgEditManage.jsp?isFirstLoad=0"; 
            	//window.location.href= basePath+"pages/despages/svgEdit/svgEditManage.jsp";
            }
        },
        onClose:function(){
        	
        },
    });

    $('#dialog2 iframe').load(function () {
    	if(window.frames[0].g_yicituguanli!=undefined){
    		if (window.frames[0].g_yicituguanli.isShowType == 0){
                window.frames[0].g_yicituguanli.isShowType = 1;
            }
    	}      
    });
    
//    $('.td-value').click(function () {
//    	
//        reBack();
//    });
    $('#search-button').click(function () {
    	
        reBack();
    });
    //添加隐藏页面
    var iObj = $("<iframe id='hideImport'  style='display:none' src='hidePanel.jsp'></iframe>");
//    iObj.attr("src","hidePanel.jsp");
    $("body").append(iObj);
    //初始化自动保存时间
    $('#minSelectCtl').combobox({
        width: '100%',
        panelWidth: null,
        valueField: 'value',
        textField: 'text',
        editable: false,
        data: [{
            value: '3',
            text: '3'
        }, {
            value: '5',
            text: '5'
        },{
            value: '10',
            text: '10'
        }],
        onSelect: function (record) {
        	min=record.value;       	
        },onLoadSuccess:function(){
          	$('#minSelectCtl').combobox('select','3');
      	}
    });
    
  //定时上传
    var svgSetIntalSave;
    $("#setIntalSave").click(function (){
    	if($("#setIntalSave")[0].checked){
    		svgSetIntalSave = setInterval(function(){					
    				setInterSave();		   
    		}, 60000  * parseInt(min)
    		);
    	 }else{
    		 clearInterval(svgSetIntalSave);
    	 }
    });	
});

/**
 * 初始化svg控件背景
 */
function IniSvgTools(svg)
{
	var ht = $(svg).attr("height");//获取高度
	var wd = $(svg).attr("width");//获取宽度
	if(ht == undefined || ht =="" || ht == "undefined"){
		wd = 1212;
		ht = 726;
	}
	$("#tool_source").click();//点击按钮代开
	$("#canvasBackground").children().attr("fill", "black");//设置背景颜色
	$("#svg_source_textarea").val(svg);//获取svg代码
	$("#tool_source_save").click();//点击保存
//	$("#svgcontent").attr({
//		onclick : "click(evt)"
//	});
	$("#canvasBackground").attr({
		width : wd + "px",
		height : ht + "px"
	});//设置画布宽，高

	/**
	 * 给svg图添加点击事件
	 */
	$("#svgcontent").bind("click",click);//绑定点击事件
}
/**
 * 重置全局变量
 */
function ResetParam()
{
	//selectSvgId赋值为空
	selectSvgId=null;

	/**
	 * 一次图配置集合
	 */
	svgSet = [];
	/**
	 * 用户变下的配置svg图集合
	 */
	svgList = [];

	/**
	 * 选择的对象配置
	 */
	setSvgObj=null;
	/**
	 * 获取设备，测点树
	 */
	treeData = [];
	devDatas=[];
	openNode = [];
	/**
	 * 清空电压配置
	 */
	$("#newSvgName").val("");
	$("#newSvgOrder").val("");
	}
/**
 * 一次图下拉框清除
 */
function ClearSvgSelect()
{
	$('#voltSettingBtn').linkbutton({disabled:true});
	$('#uploadSvgBtn').linkbutton({disabled:true});
	$('#svgSelectCtl').combobox("clear");
	$('#svgSelectCtl').combobox("loadData",[]);
	while($('#volGrid').datagrid("getRows").length>0)
	{
		$('#volGrid').datagrid("deleteRow", 0);
	
	}
	ResetParam();

	$('#devSelectCtl').combotree("clear");
	$('#devSelectCtl').combotree("loadData",[]);
	while($('#mpGrid').datagrid("getRows").length>0)
	{
		$('#mpGrid').datagrid("deleteRow", 0);
	
	}
	$("#selectMpName").html("");
	$("#selectMpId").val("");
}
/**
 * 清空用户变
 */
function ClearSubSelect()
{
	$('#subSelectCtl').combobox("clear");//清空用户变下拉框
	$('#subSelectCtl').combobox("loadData",[]);//用户变下拉框赋值为空

	$("#addSvgBtn").addClass("hidden");//隐藏新增按钮
	$("#deleteSvgBtn").addClass("hidden");//隐藏删除按钮
	$("#updateSvgBtn").addClass("hidden");//隐藏修改按钮
	
	$('#InsertMpAll').linkbutton({disabled:true});//保存测点按钮不可用
	$('#DeleteMpAll').linkbutton({disabled:true});//删除测点按钮不可用
	$('#voltSettingBtn').linkbutton({disabled:true});//电压等级颜色配置按钮不可用
	$('#uploadSvgBtn').linkbutton({disabled:true});//上传一次图按钮不可用
	}




// var unionConsId = unescape(request.getParameter("consId"));
/**
 * 企业初始化
 */
function ConsIni(unionConsName,unionConsId,unionSubsName,unionUserTranId,unionSvgId,unionSvgName,unionSvg)
{
	selectSvgId=unionSvgId;
	userTranId=unionUserTranId
	if(typeof(unionConsId)!="undefined" && unionConsId != null){
//		$('#consSelect').combobox('setValue',unionConsName);
		
//		$('#consSelect').combobox({
//			onBeforeLoad: function(){
//				$('#consSelect').combobox('setValue',unionConsName);
//				SubIni(unionConsId);
//        	}
//        });
		$('#consSelect').html(unionConsName);
		$('#consIdSelect').val(unionConsId);
		SubIni(unionConsId,unionSubsName,unionUserTranId,unionSvgId,unionSvgName,unionSvg);
	}
//	else{
//		$('#consSelect').combobox({
//			url : basePath + 'destree/queryTree.action?isQyCode=false&ziMu=',
//			valueField : 'id',
//			textField : 'text',
////			onBeforeLoad: function(){
////				if(unionConsId != undefined){
////					$('#consSelect').combobox('setValue',unionConsName);
////				}		
////			},
//			onChange : function(newValue, oldValue) {
//				ClearSubSelect();
//				//一次接线图获取
//				IniSvgTools(newSvgCode);
////				$("#svgcontent").bind("click",click);
//				if (isNaN(newValue)) {
//					newValue = $('#consSelect').combobox('getText');
//					$.getJSON(basePath+ 'destree/queryTree.action?isQyCode=false&ziMu='+ newValue, {},
//							function(json) {$('#consSelect').combobox('loadData',json);});
//				}else{
//					newValue = $('#consSelect').combobox('getText');
//					$.getJSON(basePath+ 'destree/queryTree.action?isQyCode=false&ziMu=',{}, function(json) {
//						$('#consSelect').combobox('loadData',json);});
//					consId = $('#consSelect').combobox('getValue');
//					if (!isNaN(consId)){
//						SubIni(consId);
//						cleanAll();
//					}
//				}
//			}
//		});
//	}
}
/**
 * 用户变选项初始化
 */
function SubIni(consId,unionSubsName,unionUserTranId,unionSvgId,unionSvgName,unionSvg)
{
	if(typeof(unionSubsName)!="undefined" && unionSubsName != null){
//		$('#subSelectCtl').combobox({
//			onBeforeLoad: function(){
//				$('#subSelectCtl').combobox('setValue',unionSubsName);
//				//SvgSelectCtlChange(unionUserTranId);
//        	}
//        });
		$('#subSelectCtl').text(unionSubsName);
		$('#subsIdSelect').val(unionUserTranId);
		IniColorGrid(unionUserTranId);
		SvgIni(unionUserTranId,unionSvgId,unionSvgName,unionSvg);	
		GetSvgSet(selectSvgId);
		DevIni(unionUserTranId);
	}
//	else{
//		ClearSvgSelect();
//		$('#subSelectCtl').combobox({
//			url : basePath+ 'destree/queryYhbTree.action?treeState=close&treeNodeType=1&id='+ consId,
//			valueField : 'id',
//			textField : 'text',
//			onBeforeLoad : function(node) {
//				if(unionUserTranId != undefined){
//					$('#consSelect').combobox('setValue',unionSubsName);
//				}else{
//					$.getJSON(basePath+ 'destree/queryYhbTree.action?treeState=close&treeNodeType=1&id='+ consId,{},
//							function(json) {$('#subSelectCtl').combobox('loadData',json);});
//				}		
//			},
//			onSelect : function(record) {
//				userTranId =record.id;
//				if (!isNaN(userTranId) && userTranId != ""){
//					$("#addSvgBtn").removeClass("hidden");
//					$("#deleteSvgBtn").removeClass("hidden");
//					$("#updateSvgBtn").removeClass("hidden");
//					IniColorGrid(userTranId);
//					SvgIni(userTranId);
//					DevIni(userTranId);
//				}
//			}
//		});
//	}
	
}
/**
 * 一次图下拉选项变化事件
 */
function SvgSelectCtlChange(id,isnew,unionSvg)
{
	openNode = [];
	selectSvgId = id;
	getSvg(selectSvgId,unionSvg);
	if(typeof(isnew)=="undefined" && isnew != null)
	{
		GetSvgColorSetting(selectSvgId);
		GetSvgSet(selectSvgId);
	
	}
	$('#voltSettingBtn').linkbutton({disabled:false});//电压等级颜色配置按钮不可用
	$('#uploadSvgBtn').linkbutton({disabled:false});//上传一次图按钮不可用
}
/**
 * 一次图选项初始化
 */
function SvgIni(userTranId,unionSvgId,unionSvgName,unionSvg)
{
	if (unionSvgId != undefined){
		$('#svgSelectCtl').combobox({
			url : basePath+ 'svgManage/QuerySubSvgList.action?userTranId='+ userTranId,
			method : 'get',
			valueField : 'svgId',
			textField : 'svgName',
			multiple : false,// 是否支持多选
			onBeforeLoad: function(){
				$('#svgSelectCtl').combobox('setValue',unionSvgName);
        	},
        	onSelect : function(record) {
				SvgSelectCtlChange(record.svgId);
				//deleteSvgBtnClick(userTranId,record.svgId);
				$("#deleteSvgBtn").removeClass("hidden");//隐藏删除按钮
				$("#updateSvgBtn").removeClass("hidden");//隐藏修改按钮
				cleanAll();
			}
        });
		SvgSelectCtlChange(unionSvgId,null,unionSvg);
		$('#voltSettingBtn').linkbutton({disabled:false});
		$('#uploadSvgBtn').linkbutton({disabled:false});
		//deleteSvgBtnClick(userTranId,record.svgId);
//		$("#deleteSvgBtn").removeClass("hidden");//删除按钮隐藏
//		$("#updateSvgBtn").removeClass("hidden");//修改按钮隐藏
		cleanAll();
	}else{
		$('#svgSelectCtl').combobox({
//			url : basePath+ 'svg/QuerySubSvgList.action?userTranId='+ userTranId,
//			method : 'get',
			valueField : 'svgId',
			textField : 'svgName',
			multiple : false,// 是否支持多选
			onSelect : function(record) {
				SvgSelectCtlChange(record.svgId);
				//deleteSvgBtnClick(userTranId,record.svgId);
				$("#deleteSvgBtn").removeClass("hidden");//删除按钮隐藏
				$("#updateSvgBtn").removeClass("hidden");//修改按钮隐藏
				cleanAll();
			}
//		,
//			onLoadSuccess : function() {
//				svgList = $('#svgSelectCtl').combobox('getData');
	//
////				//一次接线图获取
////				IniSvgTools(newSvgCode);
//			}
		});
		QuerySvgNameById(userTranId);
	}

}
/**
 * 设备选项变化事件
 */
function DevIni(userTranId)
{
//	var url = basePath + 'destree/queryYhbTree.action?isAllTreeNode=true&treeNodeType=1&id='+userTranId;
	$('#devSelectCtl').combotree({
		url:basePath +'destree/queryYhbTree.action?isAllTreeNode=true&treeState=open&treeNodeType=2&id=' + userTranId,
	    method:'get',
	    multiple:false,
		onLoadSuccess : function(node, data) {
			treeData = data;
		},
		onSelect : function(node) {
			MPIni(node.id);

			if(clickSetObj==null){
				clickSetObj={};
			}
			clickSetObj.svgDevId = node.id;
			clickSetObj.svgDevName = node.text;
		},
//		onChange : function(newValue, oldValue) {
//
//		},
		onBeforeSelect : function(node) {
			var treeNodeType;
			if (node) {// 点击节点
				treeNodeType = node.type;// 获取节点类型
//				if (treeNodeType == "2" || treeNodeType == "3"
//						|| treeNodeType == "4"
//						|| treeNodeType == "8") {
				if (treeNodeType == "1" || treeNodeType == "2" || treeNodeType == "3" || treeNodeType == "4" 
					|| treeNodeType == "5" || treeNodeType == "6" || treeNodeType == "7" || treeNodeType == "8" 
					|| treeNodeType == "9" || treeNodeType == "10" || treeNodeType == "11" || treeNodeType == "12"
					|| treeNodeType == "13" || treeNodeType == "14") {
					$.messager.alert('警告', '非法选择，请选择设备！');
					return false;
				}
			}
		}
	});
}
/**
 * 测点表格初始化
 */
function MPIni(devId,selectId,noClear)
{

    $('#mpGrid').datagrid({
		url : basePath
		+ 'svgManage/getMpInfo.action?tranId='
		+ devId,
		onSelect:function(rowIndex, rowData)
		{
			
			$("#selectMpName").html(rowData.MP_NAME);
			$("#selectMpId").val(rowData.MP_ID);
			if(typeof(noClear)=="undefined" || noClear == false)
			{
			switch(rowData.MP_TYPE){
			case "遥测":
			case "遥脉":
				$('#stopType-combobox').combobox({disabled:false});
				$('#noSingle-combobox').combobox({disabled:false});
				$('#alarm-combobox').combobox({disabled:false});
				$("#btnClick-combobox").combobox({disabled:false});
				
				$('#btnClick-combobox').combobox('setValue', "YC_Click");//点击事件赋值YC_Click
				$("#isSwitch-button").removeAttr("checked");//不选择是否按钮
				$('#switchType-combobox').combobox({disabled:true});//开关方式不可用
				
				$('#stopType-combobox').combobox('setValue', "2");//停运方式为2
				$("#stopType-textbox").textbox('setValue',"");//停运Id为空
				$('#stopType-textbox').textbox('disable');//停运Id不可用
				
				$('#noSingle-combobox').combobox('setValue', "0");//无信号凡是赋值为0
				$("#noSingleId").textbox('setValue',"");//无信号Id赋值为空
				$('#noSingleId').textbox('disable');//无信号Id不可用
				
				$('#alarm-combobox').combobox('setValue', "2");	//告警方式赋值为2			
				$("#alarmId").textbox('setValue',"");//告警Id赋值为空
				$('#alarmId').textbox('disable');//告警Id不可用
				
				break;
			case "遥信":
				$('#stopType-combobox').combobox({disabled:true});
				$('#noSingle-combobox').combobox({disabled:true});
				$('#alarm-combobox').combobox({disabled:true});
				$("#btnClick-combobox").combobox({disabled:false});
				
				$('#btnClick-combobox').combobox('setValue', "YX_Click");//点击事件赋值YX_Click
				$("#isSwitch-button").attr("checked", "checked");//选择是否按钮
	            //$('#switchType-row').fadeIn('fast');
				$('#switchType-combobox').combobox({disabled:false});////开关方式可用
				$('#stopType-combobox').combobox('clear');//清空停运方式
				$('#noSingle-combobox').combobox('clear');//清空无信号方式
				$('#alarm-combobox').combobox('clear');//清空告警方式
				break;
			}
			
			}
			$("#mpChkBox").attr("checked", "checked");
			clickSetObj.sfMpId = rowData.MP_ID;
			clickSetObj.sfMpName = rowData.MP_NAME;
		},
		onLoadSuccess:function(data)
		{
			if(typeof(selectId) != "undefined")
				{
				for(var i =0,len = data.rows.length;i<len;i++)
					{
					if(data.rows[i].MP_ID+"" == selectId)
						{
						$('#mpGrid').datagrid("selectRow",i);
						noClear = false;
						break;
						}
					}
				}
		},
		onChange:function (){
			$("#btnClick-combobox").combobox({disabled:false});
		}
    });
}
/**
 * 获取一次图配置
 */
function GetSvgSet(svgId) {
	if (svgId != null && parseInt(svgId) > 0) {
		$.ajax({
			type : "post",
			url : basePath + 'svgManage/querySVGset.action',
			dataType : "json",
			data : {
				'svgId' : svgId
			},
			success : function(data) {
				svgSet = data;
			}
		});

	} else {
		svgSet = [];
	}

}
/**
 * 选取电压等级颜色
 */
function GetSvgColorSetting(selectSvgId) {
	//$(colorId).val("");
	if(selectSvgId == null)
	{
		$.messager.alert('警告','请选择一次图！'); 
		return;
	}
	$('#volGrid').datagrid("clearChecked");
	var rows = $('#volGrid').datagrid("getRows");
//	if(rows.length<1){
//		$.messager.alert('警告','请选择一条电压等级'); 
//		return;
//	}
	for (var i = 0, len = rows.length; i < len; i++) {
		var colorId = "#color_" + rows[i].volt;
		$(colorId).val("#000000");
	}
	if (selectSvgId != null && selectSvgId != "" && parseInt(selectSvgId) >= 1) {
		$.ajax({
			type : "post",
			url : basePath + 'svgManage/QuerySvgVolSetList.action',
			dataType : "json",
			data : {
				'svgId' : selectSvgId,
			},
			success : function(data) {
				for (var j = 0; j < data.length; j++) {
					var voltCode = data[j].voltCode;
					var colorId = "#color_" + voltCode;
					var gridIndex = $(colorId).attr("gridIndex");
					$('#volGrid').datagrid("checkRow", parseInt(gridIndex));
					var color1 = data[j].color;
					$(colorId).val(color1);

				}
			}
		});

	}

}
/**
 * 初始化电压等级颜色表格
 * @param userTranId
 * 用户变id
 */
function IniColorGrid(userTranId) {
	$("#volGrid").datagrid({
		url : basePath + 'svgManage/QueryVolListBySub.action?userTranId=' + userTranId
	});
}

/**
 * 获取一次接线图
 */

function getSvg(id,unionSvg) {
	var svgPath=unionSvg;
	if (typeof(unionSvg) != "undefined" && unionSvg != null){
		svgPath = unionSvg;
		if (!isNaN(svgPath) || svgPath.length == 0) {

			//一次接线图获取
			IniSvgTools(newSvgCode);		
			return;
		}
		$('#divWaiting').window('open'); 
		divIswait ++;
		$.ajax({
			type : "post",
			url : basePath + 'svgManage/GetSvgCode.action',
			dataType : "json",
			data : {
				'svg' : svgPath
			},
			complete:function(XMLHttpRequest,textStatus)
			{
				divIswait=divIswait-1;
				if (divIswait == 0){
					$('#divWaiting').window('close'); 
				}	
			},
			success : function(data) {
				var svg = data.svg;
				if(svg != null && svg != ""){
					IniSvgTools(svg);
				}else{
					IniSvgTools(newSvgCode);
				}			
			}
		});	
	}else{
//		var svgId = id;
//		var svgPath = "";
//		for (var i = 0, len = svgList.length; i < len; i++) {
//			if (svgList[i].svgId == id) {
//				svgPath = svgList[i].svg;
//				break;
//			}
//
//		}
		$.ajax({
			type : "post",
			url : basePath + 'svgManage/queryYiCiSvg.action',
			dataType : "json",
			data : {
				'svgId' : id
			},
			success : function(data) {
				svgPath=data[0].svg;
				if (!isNaN(svgPath) || svgPath.length == 0) {

					//一次接线图获取
					IniSvgTools(newSvgCode);		
					return;
				}
				$('#divWaiting').window('open'); 
				divIswait ++;
				$.ajax({
					type : "post",
					url : basePath + 'svgManage/GetSvgCode.action',
					dataType : "json",
					data : {
						'svg' : svgPath
					},
					complete:function(XMLHttpRequest,textStatus)
					{
						divIswait=divIswait-1;
						if (divIswait == 0){
							$('#divWaiting').window('close'); 
						}	
					},
					success : function(data) {
						var svg = data.svg;
						if(svg != null && svg != ""){
							IniSvgTools(svg);
						}else{
							IniSvgTools(newSvgCode);
						}	
					}
				});
			}
		});
	}	

}
/**
 * 点击事件之前清空所有数据
 */
function cleanAll(){
//	$('#devSelectCtl').combotree('setValue', {
//		id : "",
//		text : ""
//	});
	$("#mpChkBox").removeAttr("checked");//选择是否绑定测点
	//MPChk_Click();	
	
	$("#byvoltChkBox").removeAttr("checked");//不选择颜色根据电压等级
	$('#stopType-combobox').combobox('setValue', "");//停运方式赋值为空
	$("#stopType-textbox").textbox('setValue',"");//停运方式Id赋值为空
	$('#stopType-textbox').textbox('disable');//停运方式Id不可用
	
	$('#noSingle-combobox').combobox('setValue', "");//无信号方式赋值为空
	$("#noSingleId").textbox('setValue',"");//无信号Id赋值为空
	$('#noSingleId').textbox('disable');//无信号Id不可用
	
	$('#btnClick-combobox').combobox('setValue', "");//点击事件赋值为空
	$('#alarm-combobox').combobox('setValue', "");//告警方式赋值为空			
	$("#alarmId").textbox('setValue',"");//告警Id赋值为空
	$('#alarmId').textbox('disable');//告警Id不可用
	
	$("#isSwitch-button").removeAttr("checked");//不选择是否可用按钮
	$("#switchId").textbox('setValue',"");//开关Id赋值为空
	$('#switchType-combobox').combobox('setValue', "");//开关方式赋值为空
	$('#switchDirct-combobox').combobox('setValue', "");//开关方向赋值为空
}
/**
 * 初始化测点
 */
function click(evt) {	
	ifSvgcontentClick = true;
	cleanAll();	
	var wenZiid = $('#elem_id').val();
	if($("#" + wenZiid).attr("baseline-shift")==null){
		$("#tool_vertical").removeClass("pictureVertical");
		$("#tool_vertical").addClass("pictureHorizontal");
	}else{
		$("#tool_vertical").removeClass("pictureHorizontal");
		$("#tool_vertical").addClass("pictureVertical");
	}	
//	$("#devSelectCtl").combobox({disabled:false});
	if (clickSetObj != "" && clickSetObj != null && clickSetObj.objId == $('#elem_id').val()){
		exit = true;
		setAllControlValue();
		if(clickSetObj.sfMpId != null || clickSetObj.sfMpId != "" ){
			$('#DeleteMpAll').linkbutton({disabled:false});
			$('#InsertMpAll').linkbutton({disabled:false});
		}
	}else{
		if(clickSetObj != null){
			clickSetObj.svgId = "";
			clickSetObj.objId = "";
			clickSetObj.sfMpId = "";
			clickSetObj.stopType = "";
			clickSetObj.stopObjId = "";
			clickSetObj.noSingleId = "";
			clickSetObj.clickEvent = "";
			clickSetObj.deviceId = "";
			clickSetObj.deviceType = "";		
			clickSetObj.byVolt = "";

			clickSetObj.alarmMode = "";
			clickSetObj.alarmObjId = "";
			
			clickSetObj.openType = "";	
			clickSetObj.openobjId = "";	
			clickSetObj.isSwitch = "";
			clickSetObj.dirct = "";
			clickSetObj.origPosition = "";
			clickSetObj.oneOrTwo = "";
			clickSetObj = null;
		}
		var svgid = $('#elem_id').val();
		$('#InsertMpAll').linkbutton({disabled:false});
		var exit = false;
		setSvgObj=null; 
		for (var i = 0, len = svgSet.length; i < len; i++) {
			if (svgSet[i].objId == svgid) {
				exit = true;
				setSvgObj=svgSet[i];
				$('#DeleteMpAll').linkbutton({disabled:false});
				DeleteMpAllSvgId = svgSet[i].svgId;
				DeleteMpAllObjId = svgSet[i].objId;

	            $('#stopType-combobox').combobox({disabled:false});//停运方式不可用
	            $('#alarm-combobox').combobox({disabled:false});//告警方式不可用
				$('#devSelectCtl').combotree('setValue', {
					id : svgSet[i].deviceId,
					text : svgSet[i].devName
				});
				if(clickSetObj==null){
					clickSetObj={};
					clickSetObj.svgDevId = svgSet[i].deviceId;
					clickSetObj.svgDevName = svgSet[i].devName;
					clickSetObj.sfMpId = svgSet[i].sfMpId;
					
					clickSetObj.stopType = svgSet[i].stopType;
					clickSetObj.stopObjId = svgSet[i].stopObjId ;
					
					clickSetObj.noSingleId = svgSet[i].noSingleId;
					if(svgSet[i].noSingleId != ""){
						clickSetObj.nosingleType = 0;
					}else{
						clickSetObj.nosingleType = 1;
					}
					

					clickSetObj.alarmMode = svgSet[i].alarmMode;
					clickSetObj.alarmObjId = svgSet[i].alarmObjId;

					clickSetObj.clickEvent = svgSet[i].clickEvent;
				
					clickSetObj.openType = svgSet[i].openType;
					clickSetObj.openobjId = svgSet[i].openobjId;
					
					clickSetObj.id = svgSet[i].dirct;	
					
					clickSetObj.sfMpName = svgSet[i].sfMpName;
					clickSetObj.byvolt = svgSet[i].byVolt;
				}else{
					clickSetObj.svgDevId = svgSet[i].deviceId;
					clickSetObj.svgDevName = svgSet[i].devName;
					clickSetObj.sfMpId = svgSet[i].sfMpId;
					
					clickSetObj.stopType = svgSet[i].stopType;
					clickSetObj.stopObjId = svgSet[i].stopObjId ;
					
					clickSetObj.noSingleId = svgSet[i].noSingleId;
					if(svgSet[i].noSingleId != ""){
						clickSetObj.nosingleType = 0;
					}else{
						clickSetObj.nosingleType = 1;
					}
					
					clickSetObj.alarmMode = svgSet[i].alarmMode;
					clickSetObj.alarmObjId = svgSet[i].alarmObjId;

					clickSetObj.clickEvent = svgSet[i].clickEvent;
				
					clickSetObj.openType = svgSet[i].openType;
					clickSetObj.openobjId = svgSet[i].openobjId;
					
					clickSetObj.id = svgSet[i].dirct;	
					
					clickSetObj.sfMpName = svgSet[i].sfMpName;
					clickSetObj.byvolt = svgSet[i].byVolt;

				}
				
				// 测点的id判断
				if (svgSet[i].sfMpId != null && svgSet[i].sfMpId != "") {
					$("#mpChkBox").attr("checked", "checked");//选择绑定测点
					$("#selectMpName").html("");//测点赋值为空
					$("#selectMpId").val("");//测点Id赋值为空
					$('#mpGrid').datagrid("unselectAll");//测点选项全部不选择
					MPIni(svgSet[i].deviceId,svgSet[i].sfMpId,true);//测点表格初始化
					
					
				} else {
					MPIni(svgSet[i].deviceId);//测点表格初始化
					$("#mpChkBox").removeAttr("checked");//不选择绑定测点
					MPChk_Click();//关联测点事件
				}
//				 是否根据电压等级
				if (svgSet[i].byVolt != null && svgSet[i].byVolt == "1") {
					$("#byvoltChkBox").attr("checked", "checked");//选择颜色根据电压等级

				} else {
					$("#byvoltChkBox").removeAttr("checked");//选择颜色根据电压等级
				}

				// 是否开关
				if (svgSet[i].isSwitch == "1") {
					$("#isSwitch-button").attr("checked", "checked");//选择是否开关
						$('#switchType-combobox').combobox({disabled:false});//开关方式不可用
			            var value = svgSet[i].openType;//		            
			            if (value == "1"){
			                $('#switchDirct-textbox').textbox('disable');//开关方向不可用
			                $('#SwitchAnimation').linkbutton('disable');//动画开关不可用
			            	$("#switchId").val(svgSet[i].openobjId);//开关Id赋值
			            	$('#switchType-combobox').combobox('setValue', svgSet[i].openType);	//开关方式赋值		            	
			                $('#switchId').textbox('enable');//开关Id可用
			                $('#switchId').textbox('setValue', svgSet[i].openobjId);
				        }else if(value == "2"){
			                $('#switchDirct-textbox').textbox('enable');//
			                $('#SwitchAnimation').linkbutton('enable');//东湖开关可用
			                $('#switchId').textbox('disable');//开关Id不可用			                
				        	$('#switchType-combobox').combobox('setValue', svgSet[i].openType);//开关方式赋值
				        	var dirct = svgSet[i].dirct;
							var oneortwo = svgSet[i].oneOrTwo;
							var switchDirct = dirct+"_"+oneortwo;
							var orgId = "#line_"+dirct+oneortwo;
							var orgposition = $(orgId).val();
							$("#position").val(orgposition);//原位置赋值
							$('#switchDirct-combobox').combobox('setValue', switchDirct);//	开关方向赋值					
				        }else{
				        	$('#switchDirct-textbox').textbox('disable');//
			                $('#SwitchAnimation').linkbutton('disable');//动画开关不可用
			                $('#switchId').textbox('disable'); //开关Id不可用
				        	$('#switchType-combobox').combobox('setValue', svgSet[i].openType);//开关方向赋值
				        }

				}else{
					$("#isSwitch-button").removeAttr("checked");//选择是否开关
					$("#switchType-combobox").combobox({disabled:true});//开关方向不可用
				    $('#switchId').textbox('disable');//开关Id不可用
					$("#switchDirct-combobox").combobox({disabled:true});//开关方向不可用
				    $('#SwitchAnimation').linkbutton('disable');//动画开关按钮不可用
				}
				if(svgSet[i].origPosition != ""){
					$("#position").val(svgSet[i].origPosition);//原位置赋值
				}		
				// 停用方式
				if (svgSet[i].stopType != "") {
					$('#stopType-combobox').combobox('setValue', svgSet[i].stopType);//停运方式赋值
				}
				// 停用对象Id
				if (svgSet[i].stopObjId != "") {
					$("#stopType-textbox").textbox('setValue',svgSet[i].stopObjId);//停用对象Id赋值
				}else{
					$("#stopType-textbox").val("");//停用对象Id赋值为空
				}
				// 有无信号判断
				if (svgSet[i].noSingleId != "") {
					$("#noSingleId").textbox('setValue',svgSet[i].noSingleId);//有无信号Id赋值
					$("#noSingle-combobox").combobox('setValue', '1');
					
				} else {
					$('#noSingle-combobox').combobox('setValue', '0');//有无信号Id赋值为空
				}
				// 点击事件
				if (svgSet[i].clickEvent != "") {
					$('#btnClick-combobox').combobox({disabled:false});
					$('#btnClick-combobox').combobox('setValue', svgSet[i].clickEvent);//					
				}
				// 告警方式
				if (svgSet[i].alarmMode != null) {
					$('#alarm-combobox').combobox('setValue', svgSet[i].alarmMode);//告警方式赋值	
					$("#alarmId").textbox('setValue',svgSet[i].alarmObjId);//告警方式Id赋值
				}
				break;
			}else{
				$('#DeleteMpAll').linkbutton({disabled:true});
			}
		}
	}
	
	if(!exit)
	{
		// 置空操作
		$("#mpChkBox").removeAttr("checked");
		MPChk_Click();
	}
}

function setAllControlValue(){
	$('#stopType-combobox').combobox('setValue', clickSetObj.stopType);//clickSetObj.stopType);
	$('#stopType-textbox').textbox('setValue', clickSetObj.stopObjId);
	
	$('#noSingle-combobox').combobox('setValue', clickSetObj.nosingleType);
	$('#noSingleId').textbox('setValue', clickSetObj.noSingleId);
	

	$('#alarm-combobox').combobox('setValue', clickSetObj.alarmMode);
	$('#alarmId').textbox('setValue', clickSetObj.alarmObjId);

	$('#btnClick-combobox').combobox('setValue', clickSetObj.clickEvent);
	if(clickSetObj.clickEvent == "YC_Click" || clickSetObj.clickEvent == "YX_Click"){
		$("#mpChkBox").attr("checked", "checked");
	}
	
	$('#switchType-combobox').combobox('setValue', clickSetObj.openType);
	$('#switchId').textbox('setValue', clickSetObj.openobjId);
	
	$('#switchDirct-combobox').combobox('setValue', clickSetObj.id);	
	
	$("#selectMpName").html(clickSetObj.sfMpName);
	$("#selectMpId").val(clickSetObj.sfMpId);
	
	if(clickSetObj.byvolt == "1"){
		$("#byvoltChkBox").attr("checked","checked");
		clickSetObj.svgDevId = $("#devSelectCtl").combobox('getValue');;
		clickSetObj.svgDevName = $("#devSelectCtl").combobox('getText');;
	}else{
		$("#byvoltChkBox").removeAttr("checked","checked");
	}
	
	
	$('#devSelectCtl').combotree('setValue', {
		id : clickSetObj.svgDevId,
		text : clickSetObj.svgDevName
	});
	
	if(clickSetObj.sfMpId != null && clickSetObj.sfMpId != ""){
		$("#mpChkBox").attr("checked", "checked");//选择绑定测点
		$("#selectMpName").html("");//测点赋值为空
		$("#selectMpId").val("");//测点Id赋值为空
		$('#mpGrid').datagrid("unselectAll");//测点选项全部不选择
		MPIni(clickSetObj.svgDevId,clickSetObj.sfMpId,true);//测点表格初始化
	}else{
		MPIni(svgSet[i].deviceId);//测点表格初始化
		$("#mpChkBox").removeAttr("checked");//不选择绑定测点
		MPChk_Click();//关联测点事件
	}
	//MPIni(svgSet[i].deviceId,svgSet[i].sfMpId,true);//测点表格初始化
//	$('#devSelectCtl').combotree('setValue', clickSetObj.svgDevName);
//	$('#devSelectCtl').combotree('setValue', clickSetObj.svgDevId);
//	clickSetObj.svgDevName = $('#devSelectCtl').combotree("getText");
//	clickSetObj.svgDevId = $('#devSelectCtl').combotree("getValue");
}

/**
 * 是否关联测点点击事件
 */
function MPChk_Click() {
	if (!$("#mpChkBox").attr("checked")) {
		$("#selectMpName").html("");
		$("#selectMpId").val("");
		$('#mpGrid').datagrid("unselectAll");
					
		$('#stopType-textbox').textbox('disable');//停运方式Id不可用
		$('#stopType-combobox').combobox('setValue', "");//停运方式赋值为空
		$("#stopType-textbox").textbox('setValue',"");//停运方式Id赋值为空
	
		$('#noSingleId').textbox('disable');//无信号Id不可用
		$('#noSingle-combobox').combobox('setValue', "");//无信号方式赋值为空
		$("#noSingleId").textbox('setValue',"");//无信号Id赋值为空
		
		
		$('#alarmId').textbox('disable');//告警Id不可用

		$('#btnClick-combobox').combobox('setValue', "");//点击事件赋值为空
		$('#alarm-combobox').combobox('setValue', "");//告警方式赋值为空			
		$("#alarmId").textbox('setValue',"");//告警Id赋值为空
		
		$("#isSwitch-button").removeAttr("checked");//不选择是否可用按钮
		$("#switchId").val("");//开关Id赋值为空
		$('#switchType-combobox').combobox('setValue', "");//开关方式赋值为空
		$('#switchDirct-combobox').combobox('setValue', "");//开关方向赋值为空
	}
}

/**
 * 初始化测点选择
 */
/*function IniMpData(mpObj) {
	var devId = $("#devSelectCtl").combobox('getValue');
	if (devId != null)
		$('#cedian').combogrid({
			url : basePath
					+ 'areaEnergyTmnl/getMpInfo.action?areaNo=101&deviceRela=LINESELF&tranId='
					+ devId,
			onLoadSuccess : function(node, data) {
				if (mpObj != null)
					$('#cedian').combogrid('setValue', {
						MP_ID : mpObj.sfMpId,
						MP_NAME : mpObj.mpName
					});
			}
		});
}*/
/**
 * 动画开关事件
 */
function SwitchAnimationClick(){
	var position = $('#position').val();
	var swichDrict = $("#switchDirct-combobox").combobox('getText');
	
	if(swichDrict != ""){
		if(position != ""){
			var svgId = $('#elem_id').val();
			var positionId = $("#switchDirct-combobox").combobox('getValue');
			var str = positionId.split("_");
			var xy = str[0];
			var oneortwo = str[1];
			IniFunc(svgId, position, xy, oneortwo);
		}else{
			var svgId = $('#elem_id').val();
			var id = $("#switchDirct-combobox").combobox('getValue');
			var str = id.split("_");
			var dirct = str[0];
			var oneortwo = str[1];		
			var switchDirct = dirct+"_"+oneortwo;
//			var orgId = "#line_"+dirct+oneortwo;
//			var orgposition = $(orgId).val();
//			var orgposition;
//			if($("#svg_source_editor").css("display") == "none"){
//				$("#tool_source").click();
//				orgposition = $("#"+svgId).attr(dirct+oneortwo);
//				$("#tool_source_save").click();
//			}else{
//				orgposition = $("#"+svgId).attr(dirct+oneortwo);
//			}			
			if(isSwitchAnimationClick == true){
				orgposition = $("#"+svgId).attr(dirct+oneortwo);
				isFirstSvgId = svgId;
				isSwitchAnimationClick = false;
			}else if(isFirstSvgId != svgId){
				orgposition = $("#"+svgId).attr(dirct+oneortwo);
				isFirstSvgId = svgId;
				isSwitchAnimationClick = false;
			}			
			var xy = str[0];
//			$("#position").val(orgposition);
			if(orgposition != ""){
				IniFunc(svgId, orgposition, dirct, oneortwo);
			}		
		}
	}else{
		$.messager.alert('确认', "请选择开关方向！", 'warning');// 移除失败
	}		
}

/*******************************************************************************
 * 开关动画切换
 * 
 * @param svgId
 * @param dataValue
 * @param xy
 * @param oneOrTwo
 */
function IniFunc(svgId, dataValue, xy, oneOrTwo) {
	Open_Close($("#" + svgId), xy, oneOrTwo, parseInt(dataValue));
}
/*******************************************************************************
 * 开关动画
 * 
 * @param obj
 * @param isY
 * @param num
 * @param oldValue
 */
function Open_Close(obj, isY, num, oldValue) {
	if (typeof ($(obj).attr("close")) == "undefined"
			|| $(obj).attr("close") == "false") {
		$(obj).attr("close", "true");
		if (num == 1) {
			$(obj).attr(isY + "1", $(obj).attr(isY + "2"));
		} else {
			$(obj).attr(isY + "2", $(obj).attr(isY + "1"));
		}
	} else {
		$(obj).attr("close", "false");
		$(obj).attr(isY + num, oldValue);
	}
}
/*******************************************************************************
 * 
 */
/**
 * 上传svg文件
 */
function UploadSvgBtnClick()
{
//	/*$('#divUpload').window('open');
//	$('#divUpload').window('close');*/	
//	$.messager.confirm('提示', "确定上传一次图?", function(r){
//		if(r){
//			$('#divWaiting').window('open'); 
//			divIswait ++;
//			$.ajax({
//				type : "post",
//				url : basePath + 'svg/GetIfExistSvg.action',
//				dataType : "json",
//				data : {
//					'svgId' : selectSvgId,
//					'userTranId' : userTranId
//				},
//				complete:function(XMLHttpRequest,textStatus)
//				{
//					divIswait --;
//					if (divIswait == 0){
//						$('#divWaiting').window('close'); 
//					}	
//				},
//				success : function(data) {
//					 var svg = data.svg;
//					if (svg !== "") {
//						$("#tool_source").click();
//						var svgChart = $("#svg_source_textarea").val();
//						var wd = $(svgChart).attr("width");
//						var ht = $(svgChart).attr("height");
//						if(svgChart.indexOf("<defs>") != -1){
//							var strDefs = "";
//							strDefs+= svgChart.substring(svgChart.indexOf("<defs>"),svgChart.lastIndexOf("</defs>")+7) 
//						}else{
//							strDefs = "";
//						}
//						svgChart= "<svg width='"+wd+"' height='"+ht+"' id='svg_Main' xmlns='http://www.w3.org/2000/svg' ><!-- Created with SVG-edit - http://svg-edit.googlecode.com/ -->" + strDefs+svgChart.substring(svgChart.indexOf("</title>")+8,svgChart.lastIndexOf("</g>"))+ "</svg>";
//						$("#tool_source_save").click();
//						$.getJSON(basePath + 'svg/uploadNewSvg.action', {
//							'subSvgModel.svgId' : selectSvgId,
//							'subSvgModel.userTranId' : userTranId,
//							'subSvgModel.svg' : svg,
//							'subSvgModel.svgChart' : svgChart,
//						}, function(json) {
//							if (json.saveSUCCESS == "true") {
//								//$('#divWaiting').window('close'); 
//								$.messager.alert('确认', "保存成功！", 'info', function(r) {
//								});
//								$('#newAddSvg').window('close');//关闭新增弹出层
//								//$('#divUpload').window('close');
//								/**
//								 * 给svg图添加点击事件
//								 */
//								/*$("#svgcontent").attr({
//									onclick : "click(evt)"
//								});*/
////								$("#svgcontent").bind("click",click);//绑定点击事件
////								IniSvgTools(svgChart);
//							} else {
//								$.messager.alert('确认', "保存失败！", 'warning');// 移除失败
//								$('#newAddSvg').window('close');
//								//$('#divWaiting').window('close'); 
//								//$('#divUpload').window('close');
//							}
//						});
//					} else {
//						$("#tool_source").click();
//						var svgChart = $("#svg_source_textarea").val();		
//						var wd = $(svgChart).attr("width");
//						var ht = $(svgChart).attr("height");
//						if(svgChart.indexOf("<defs>") != -1 && svgChart.lastIndexOf("</g>") != 339){
//							var strDefs = "";
//							strDefs+= svgChart.substring(svgChart.indexOf("<defs>"),svgChart.lastIndexOf("</defs>")+7) 
//						}else{
//							strDefs = "";
//						}
//						svgChart= "<svg width='"+wd+"' height='"+ht+"' id='svg_Main' xmlns='http://www.w3.org/2000/svg' ><!-- Created with SVG-edit - http://svg-edit.googlecode.com/ -->" + strDefs +svgChart.substring(svgChart.indexOf("</title>")+8,svgChart.lastIndexOf("</g>"))+ "</svg>";
//						$("#svg_source_textarea").val(svgChart);	
//						$("#tool_source_save").click();
//						$.getJSON(basePath + 'svg/uploadSvg.action', {
//							'subSvgModel.svgId' : selectSvgId,
//							'subSvgModel.userTranId' : userTranId,
//							'subSvgModel.svgChart' : svgChart,
//						}, function(json) {
//							if (json.saveSUCCESS == "true") {
//								$.messager.alert('确认', "保存成功！", 'info', function(r) {
//								});
////								$("#svgcontent").bind("click",click);//绑定点击事件
//								$('#newAddSvg').window('close');//关闭新增弹出层
//								/*divIswait --;
//								if (divIswait == 0){
//									$('#divWaiting').window('close'); 
//								}	*///关闭等待层
//								//$('#divUpload').window('close');//关闭上传弹出层
//							} else {
//								$.messager.alert('确认', "保存失败！", 'warning');// 移除失败
//								$('#newAddSvg').window('close');//关闭新增弹出层
//								/*divIswait --;
//								if (divIswait == 0){
//									$('#divWaiting').window('close'); 
//								}*/	//关闭等待层
//								//$('#divUpload').window('close');//关闭上传弹出层
//							}
//						});
//					}
//				}
//			});
//		}else{
//			divIswait --;
//			if (divIswait == 0){
//				$('#divWaiting').window('close'); 
//			}	//关闭等待层
//		}
//	});

$.messager.confirm('提示', "确定上传一次图?", function(r){
		if(r){
			$('#divWaiting').window('open'); 
			var svgChart= "";
			try
			{
				$("#tool_source").click();
				svgChart = $("#svg_source_textarea").val();
				var wd = $(svgChart).attr("width");
				var ht = $(svgChart).attr("height");
				var strDefs = "";
				if(svgChart.indexOf("<defs>") != -1 && svgChart.indexOf("</defs>") != 339){
					strDefs+= svgChart.substring(svgChart.indexOf("<defs>"),svgChart.lastIndexOf("</defs>")+7) 
				}
				svgChart= "<svg width='"+wd+"' height='"+ht+"' id='svg_Main' xmlns='http://www.w3.org/2000/svg' ><!-- Created with SVG-edit - http://svg-edit.googlecode.com/ -->" + strDefs+svgChart.substring(svgChart.indexOf("<g"),svgChart.lastIndexOf("</g>")+4)+ "</svg>";
				$("#tool_source_save").click();
				
			}
			catch(ex)
			{
				$('#divWaiting').window('close');
				$.messager.alert('确认', "错误！" + ex.message, 'error');
				return;
			}

			$.getJSON(basePath + 'svgManage/uploadSvg.action', {
				'subSvgModel.svgId' : selectSvgId,
				'subSvgModel.userTranId' : userTranId,
				'subSvgModel.svgChart' : svgChart,
			}, function(json) {
				$('#divWaiting').window('close');
				if (json.saveSUCCESS == "true") {
					$.messager.alert('确认', "保存成功！", 'info', function(r) {
					});
					$("#svgcontent").bind("click",click);
				} else {
					$.messager.alert('确认', "保存失败！" + json.errorMsg, 'warning');// 移除失败
				}
			}).error(function (jqXhr,textStatus,error)
					{
				$('#divWaiting').window('close');
				$.messager.alert('确认', "接口调用失败！" + jqXhr.responseText, 'warning');// 移除失败
					});
		}
	});	
				
}
/**
 * 点击保存测点按钮
 */
function insert() {
	var dirct;
	var byvoltChkBox;
	var isSwitch;
	var svg_id = selectSvgId;
	
	
	var obj_id = $('#elem_id').val();
	    	var device_id = $("#devSelectCtl").combobox('getValue');
	    	if(obj_id == ""){
	    		$.messager.alert('警告','请选择配置的对象！',"warning"); 
	    		return;
	    	}
	    	
	    	if(device_id == ""){
	    		$.messager.alert('警告','请选择设备！',"warning"); 
	    		return;
	    	}
	    	var devDatas = $('#devSelectCtl').combotree("tree");
	    	var node = devDatas.tree('find', device_id);
	    	var devType ="";
	    	switch(node.rootType)
	    	{
	    		case "17":
	    			devType = 1;
	    		break;
	    		case "16":
	    			devType= 2;
	    		break;
	    		case "15":
	    			devType = 3;
	    		break;
	    		case "18":
	    		case "20":
	    		case "21":
	    		case "22":
	    		case "23":
	    			devType = 4;
	    		break;
	    		case "19":
	    			devType = 5;
		    	break;
	    	}
	    	
	    	var sfmpid = $("#selectMpId").val();	
	    	var stoptype = $("#stopType-combobox").combobox('getValue');
	    	
	    	var stopobjid = $("#stopType-textbox").val();
	    	if(stopobjid.length > 100){
	    		$.messager.alert('警告','停运ID长度不能超过100！',"warning"); 
	    		return;
	    	}

	    	var noSingleType = $("#noSingle-combobox").combobox('getValue');
	    	var noSingleId = $("#noSingleId").val();
	    	if(noSingleId.length > 100){
	    		$.messager.alert('警告','无信号ID长度不能超过100！',"warning"); 
	    		return;
	    	}
	    	
	    	var alarmmode = $("#alarm-combobox").combobox('getValue');
	    	var alarmId = $("#alarmId").val();
	    	if(alarmId.length > 100){
	    		$.messager.alert('警告','告警ID长度不能超过100！',"warning"); 
	    		return;
	    	}
	    	
	    	var clickevent = $("#btnClick-combobox").combobox('getValue');
	    	
	    	if ($("#isSwitch-button").attr("checked") == "checked") {
	    		isSwitch = "1";
	    	} else {
	    		isSwitch = "0";
	    	}
	    	
	    	
	    	var id = $("#switchDirct-combobox").combobox('getValue');
	    	var str =(id==null || id=="")?"": id.split("_");
	    	dirct = str==""?"":str[0];
	    	var oneortwo =str==""?"": str[1];
	    		
	    	var openType =$("#switchType-combobox").combobox('getValue');
	    	
	    	//var position = $('#position').val();
	    	var orgId = "#line_"+dirct+oneortwo;
	    	var orgposition = $(orgId).val();
	    	var position =typeof(orgposition)=="undefined"?"":orgposition;
	    	
	    	var openobjId = $("#switchId").val();
	    	if(openobjId.length > 100){
	    		$.messager.alert('警告','开关ID长度不能超过100！',"warning"); 
	    		return;
	    	}
	    	var mpChk="0";
	    	if($("#mpChkBox").attr("checked") == "checked"){
	    		mpChk="1";	    	
	    	}
	    	
	    	if ($("#byvoltChkBox").attr("checked") == "checked" ) {
	    		byvoltChkBox = "1";
	    		
	    	} else {
	    		byvoltChkBox = "0";
	    	}
	    	
	    	
	    	if(mpChk=="0" &&  byvoltChkBox=="0"){
	    		$.messager.alert('警告','请选择是否绑定测点 或者 选择颜色根据电压等级！',"warning"); 
	    		return;
	    	}
	    	if(mpChk=="1" && sfmpid=="")
    		{
	    		$.messager.alert('警告','请选择需要绑定的测点！',"warning"); 
	    		return;
    		}
//	    	if(stoptype=="")
//    		{
//	    		$.messager.alert('警告','请选择停运方式！',"warning"); 
//	    		return;
//    		}
	    	if(stoptype=="1" && stopobjid=="")
    		{

	    		$.messager.alert('警告','请输入停运对象Id！',"warning",function()
	    				{

					 $("#stopType-textbox").textbox("textbox").focus();
	    				}); 
	    		return;
    		}
	    	if(clickevent=="")
    		{

	    		$.messager.alert('警告','请选择点击事件！',"warning"); 
	    		return;
    		}
	    	if(sfmpid!="")
    		{
	    		/*if(noSingleType=="")
    			{
		    		$.messager.alert('警告','请选择无信号方式！',"warning"); 
		    		return;
	    			
    			}*/
	    		/*if(alarmmode=="")
    			{
		    		$.messager.alert('警告','请选择告警方式！',"warning"); 
		    		return;
	    			
    			}*/
	    		if(noSingleType=="1" && noSingleId =="")
	    			{

	    			
		    		$.messager.alert('警告','请输入无信号对象Id！',"warning",function()
		    				{

						 $("#noSingleId").textbox("textbox").focus();
		    				}); 
		    		return;
	    			}
	    		if(alarmmode=="3" && alarmId=="")
    			{

		    		$.messager.alert('警告','请输入告警对象Id！',"warning",function()
		    				{

						 $("#alarmId").textbox("textbox").focus();
		    				}); 
		    		return;
	    			
    			}
    		}

	    	$.messager.confirm('确认',"您确认配置"+obj_id+"吗？",function(r){    
	    	    if (r){
	    	
	    	if(setSvgObj == null) 
	    		{
	    		setSvgObj={};
	    		svgSet[svgSet.length] = setSvgObj;
	    		setSvgObj.objId=obj_id;
	    		}
	    	setSvgObj.svgId = selectSvgId;
	    	setSvgObj.objId = obj_id;
	    	setSvgObj.sfMpId = sfmpid;
	    	setSvgObj.stopType = stoptype;
	    	setSvgObj.stopObjId = stopobjid;
	    	setSvgObj.noSingleId = noSingleId;
	    	setSvgObj.clickEvent = clickevent;
	    	setSvgObj.deviceId = device_id;
	    	setSvgObj.deviceType = devType;		
	    	setSvgObj.byVolt = byvoltChkBox;

	    	setSvgObj.alarmMode = alarmmode;
	    	setSvgObj.alarmObjId = alarmId;
	    	
	    	setSvgObj.openType = openType;	
	    	setSvgObj.openobjId = openobjId;	
	    	setSvgObj.isSwitch = isSwitch;
	    	setSvgObj.dirct = dirct;
	    	setSvgObj.origPosition = position;
	    	setSvgObj.oneOrTwo = oneortwo;							
	    	$.getJSON(basePath + 'svgManage/AddSvgMpSeting.action', {
	    		'susSVGModel.svgId' : svg_id,
	    		'susSVGModel.objId' : obj_id,
	    		'susSVGModel.sfMpId' : sfmpid,
	    		'susSVGModel.alarmMode' : alarmmode,
	    		'susSVGModel.tipsMode' : 0,
	    		'susSVGModel.openwinMode' : 0,
	    		'susSVGModel.openobjId' : openobjId,
	    		'susSVGModel.isSwitch' : isSwitch,
	    		'susSVGModel.dirct' : dirct,
	    		'susSVGModel.origPosition' : position,
	    		'susSVGModel.oneOrTwo' : oneortwo,
	    		'susSVGModel.stopType' : stoptype,
	    		'susSVGModel.stopObjId' : stopobjid,
	    		'susSVGModel.noSingleId' : noSingleId,
	    		'susSVGModel.alarmObjId' : alarmId,
	    		'susSVGModel.clickEvent' : clickevent,
	    		'susSVGModel.deviceId' : device_id,
	    		'susSVGModel.deviceType' : devType,
	    		'susSVGModel.byVolt' : byvoltChkBox,
	    		'susSVGModel.openType' : openType

	    	}, function(json) {
	    		if (json.saveSUCCESS == "true") {
	    			$.messager.alert('确认', "保存成功！", 'info', function(r) {
	    			});
	    			$('#DeleteMpAll').linkbutton({disabled:false});
	    			$('#peizhi').window('close');
	    		} else {
	    			$.messager.alert('确认', "保存失败！", 'warning');// 移除失败
	    			$('#peizhi').window('close');
	    		}
	    	});
	    }    
	});  
}

/**
 * 新建一次图
 */
function NewSvgClick() {
	var id = selectSvgId;
	var svgName = $("#newSvgName").val();
	var svgOrder = $("#newSvgOrder").val();
	var aa = ""+svgOrder;
	if (svgName == "" || svgOrder==""){
		$.messager.alert('确认', "名称和排序不能为空！", 'warning');// 移除失败
		return;
		}else if(parseInt(svgOrder)!= svgOrder){
			$.messager.alert('确认', "排序必须为整型！", 'warning',function()
					{

				 $("#newSvgOrder").textbox("textbox").focus();
					});// 移除失败
			return;
		}else if(svgName.length>400){
			$.messager.alert('确认', "一次图名称过长！", 'warning',function()
					{

				 $("#newSvgName").textbox("textbox").focus();
					});// 移除失败
			return;
		}else if(aa.length>16){
			$.messager.alert('确认', "排序过长！", 'warning',function()
					{

				 $("#newSvgOrder").textbox("textbox").focus();
					});// 移除失败
			return;
		}
		else
		{
			var datas= $('#svgSelectCtl').combobox("getData");
			for(var i = 0,len = datas.length;i<len;i++)
			{
				if(datas[i].svgName == svgName)
				{

					$.messager.alert('确认', "该一次图名称已存在！请重新修改名称!", 'warning',function()
							{

						 $("#newSvgName").textbox("textbox").focus();
							});
					return;
//					$.messager.confirm('确认','该一次图名称已存在，是否？',function(r){    
//					    if (r){    
//					        alert('确认删除');    
//					    }    
//					}); 
				}
			}
			
		}

	$('#divWaiting').window('open'); 
	divIswait ++;
	$.getJSON(basePath + 'svgManage/AddSubSvg.action', {
		'subSvgModel.svgId' : id,
		'subSvgModel.userTranId' : userTranId,
		'subSvgModel.svgName' : $("#newSvgName").val(),
		'subSvgModel.svgOrder' : $("#newSvgOrder").val()

	}, function(json) {
		divIswait --;
		if (divIswait == 0){
			$('#divWaiting').window('close'); 
		}	
		if (json.saveSUCCESS == "true") {
			$('#newSvgDialog').window('close');
			QuerySvgNameById(userTranId);
			$.messager.alert('确认', "保存成功！", 'info', function(r) {
			});

			$('#voltSettingBtn').linkbutton({disabled:false});
			$('#uploadSvgBtn').linkbutton({disabled:false});
			$('#InsertMpAll').linkbutton({disabled:false});
//			$('#DeleteMpAll').linkbutton({disabled:false});
		} else {
			$.messager.alert('确认', "保存失败！", 'warning');// 移除失败
		}
	});
}
/**
 * 电压等级颜色设置点击事件
 */
function voltSettingColorBtnClick()
{	
	if(selectSvgId == null)
	{
		$.messager.alert('警告','请选择一次图！'); 
		return;
	}
	$('#divWaiting').window('open'); 
	divIswait ++;
	var chkRows = $('#volGrid').datagrid("getChecked");
	if(chkRows.length<1){
		$.messager.alert('警告','请至少选择一条电压等级'); 
		divIswait --;
		if (divIswait == 0){
			$('#divWaiting').window('close'); 
		}	
		return;
	}
	$('#volSettingDialog').window('close');
	var volList =[];
	for (var i = 0, len = chkRows.length; i < len; i++) {
		var colorId = "#color_" + chkRows[i].volt;
		var col = {};
		col["svgId"] =selectSvgId;
		col["color"] = $(colorId).val();
		col["voltCode"] = chkRows[i].volt;
		volList[volList.length] = col;
	}
	$.getJSON(basePath + 'svgManage/insertVoltColor.action', {
		'svgId' : selectSvgId,
		'volSetList' : JSONUtil.encode(volList)
	}, function(json) {
		divIswait --;
		if (divIswait == 0){
			$('#divWaiting').window('close'); 
		}	
		if (json.saveSUCCESS == "true") {
			$.messager.alert('确认', "保存成功！", 'info', function(r) {
			});
		} else {
			$.messager.alert('确认', "保存失败！", 'warning');// 移除失败
		}
	});
	}

/**
 * 新增的svg放在下拉列表的首位
 * @param userTranId
 */
function QuerySvgNameById(userTranId) {
	$('#divWaiting').window('open');	
	divIswait ++;
	$.ajax({
		type : "post",
		url : basePath + 'svgManage/QuerySubSvgList.action',
		dataType : "json",
		data : {
			'userTranId' : userTranId
		},
		complete:function(XMLHttpRequest,textStatus)
		{
			divIswait --;
			if (divIswait == 0){
				$('#divWaiting').window('close'); 
			}			
		},
		success : function(data) {
			var maxIndex = 0;
			for(var i =0,len =data.length;i<len;i++ )
				{
				   if(data[i].svgId > data[maxIndex].svgId)
					   {
					   maxIndex = i;
					   }
				}
			if(data.length>0)
			data[maxIndex]["selected"]=true;
			svgList = data;
			if(data.length==0)
				{
				$('#svgSelectCtl').combobox("loadData",[]);
				$('#svgSelectCtl').combobox("clear");
				$('#deleteSvgBtn').addClass('hidden');
				$('#updateSvgBtn').addClass('hidden');
				$('#uploadSvgBtn').linkbutton('disable');
				$('#voltSettingBtn').linkbutton('disable');	
				$('#InsertMpAll').linkbutton('disable');
				$('#DeleteMpAll').linkbutton('disable');				
				IniSvgTools(newSvgCode);
//				$("#svgcontent").bind("click",click);
				}
			else
				{
				$('#svgSelectCtl').combobox("loadData", data);
				}
		//	SvgSelectCtlChange(data[0].svgId,true);
		}
	});
}

/**
 * 颜色根据电压等级点击事件
 */
function byvoltChkBoxClick(){
	if($("#byvoltChkBox").attr("checked") == "checked" && $("#mpChkBox").attr("checked") !="checked"){

		/*$('#noSingle-combobox').combobox({disabled:false});
		$('#alarm-combobox').combobox({disabled:false});*/		
		if(clickSetObj==null){
			clickSetObj={};
		}
		clickSetObj.byvolt = "1";
		$('#btnClick-combobox').combobox({disabled:false});
		$('#stopType-combobox').combobox({disabled:false});
		
		$('#btnClick-combobox').combobox('setValue','DEV_Click' );
		$('#stopType-combobox').combobox('setValue', 4);				
	}else if($("#byvoltChkBox").attr("checked") != "checked"){
		$('#btnClick-combobox').combobox({disabled:true});
		$('#stopType-combobox').combobox({disabled:true});
		
		$('#btnClick-combobox').combobox('setValue','' );
		$('#stopType-combobox').combobox('setValue', '');

		/*$('#noSingle-combobox').combobox({disabled:true});
		$('#alarm-combobox').combobox({disabled:true});*/
	}else if($("#byvoltChkBox").attr("checked") == "checked" && $("#mpChkBox").attr("checked") =="checked"){
		if(clickSetObj==null){
			clickSetObj={};
		}
		clickSetObj.byvolt = "1";
	}
}

/**
 * 是否开关点击事件
 */
function isSwitchbuttonClick(){
	if ($("#isSwitch-button").attr("checked") != "checked"){
		$("#switchDirct-combobox").combobox({disabled:true});
    	$('#SwitchAnimation').linkbutton('disable');
    	$("#switchType-combobox").combobox({disabled:true});
    	$('#switchId').textbox('disable');
		$('#switchType-combobox').combobox('setValue', "");	
		$("#switchId").val("");		
		$('#switchDirct-combobox').combobox('setValue', "");	
		$("#position").val("");
	}else{
    	$("#switchType-combobox").combobox({disabled:false});
	}
}
/**
 * 删除按钮事件
 */
function deleteSvgBtnClick(){
	//$('#divDelete').window('open'); 
	$.messager.confirm('提示', "确定删除吗?", function(r){
		if(r){
			$('#divWaiting').window('open');
			divIswait ++;
			$.ajax({
				type : "post",
				url : basePath + 'svgManage/deleteSvgBtnClick.action',
				dataType : "json",
				data : {
					'userTranId' : userTranId,
					'svgId' : selectSvgId
				},
				complete:function(XMLHttpRequest,textStatus)
				{
					divIswait --;
					if (divIswait == 0){
						$('#divWaiting').window('close'); 
					}	
				},
				success : function(data) {		
					if (data.saveSUCCESS == "true") {
						//$("#divDelete").window('close');
						$.messager.alert('确认', "删除成功！", 'info', function(r) {
						});
						QuerySvgNameById(userTranId);
					} else {
						//$("#divDelete").window('close');
						$.messager.alert('确认', "删除失败！", 'warning');// 移除失败	
					}
				}
			});
		}else{
			divIswait --;
			if (divIswait == 0){
				$('#divWaiting').window('close'); 
			}	
		}
	});
}
/**
 * 点击度额定按钮事件
 */
/*function DeleteSubClick(){
	$('#divDelete').window('close');
	$('#divWaiting').window('open');
	$.ajax({
		type : "post",
		url : basePath + 'svg/deleteSvgBtnClick.action',
		dataType : "json",
		data : {
			'userTranId' : userTranId,
			'svgId' : selectSvgId
		},
		complete:function(XMLHttpRequest,textStatus)
		{
			$('#divWaiting').window('close'); 
		},
		success : function(data) {		
			if (data.saveSUCCESS == "true") {
				//$("#divDelete").window('close');
				$.messager.alert('确认', "删除成功！", 'info', function(r) {
				});
				QuerySvgNameById(userTranId);
			} else {
				//$("#divDelete").window('close');
				$.messager.alert('确认', "删除失败！", 'warning');// 移除失败	
			}
		}
	});
}
*/



/**
 * 点击取消按钮事件
 */
/*function QuitDeleteSubClick(){
	$("#divDelete").window('close');
}*/
/**
 * 点击确定按钮事件
 */
/*function UploadSubClick(){
	$('#divUpload').window('close');
	$('#divWaiting').window('open'); 
	$.ajax({
		type : "post",
		url : basePath + 'svg/GetIfExistSvg.action',
		dataType : "json",
		data : {
			'svgId' : selectSvgId,
			'userTranId' : userTranId
		},
		complete:function(XMLHttpRequest,textStatus)
		{
			$('#divWaiting').window('close'); 
		},
		success : function(data) {
			 var svg = data.svg;
			if (svg !== "") {
				$("#tool_source").click();
				var svgChart = $("#svg_source_textarea").val();
				var wd = $(svgChart).attr("width");
				var ht = $(svgChart).attr("height");
				svgChart= "<svg width='"+wd+"' height='"+ht+"' id='svg_Main' xmlns='http://www.w3.org/2000/svg' ><!-- Created with SVG-edit - http://svg-edit.googlecode.com/ -->" + svgChart.substring(svgChart.indexOf("</title>")+8,svgChart.lastIndexOf("</g>"))+ "</svg>";
				$("#tool_source_save").click();
				$.getJSON(basePath + 'svg/uploadNewSvg.action', {
					'subSvgModel.svgId' : selectSvgId,
					'subSvgModel.userTranId' : userTranId,
					'subSvgModel.svg' : svg,
					'subSvgModel.svgChart' : svgChart,
				}, function(json) {
					if (json.saveSUCCESS == "true") {
						//$('#divWaiting').window('close'); 
						$.messager.alert('确认', "保存成功！", 'info', function(r) {
						});
						$('#newAddSvg').window('close');//关闭新增弹出层
						//$('#divUpload').window('close');
						*//**
						 * 给svg图添加点击事件
						 *//*
						$("#svgcontent").attr({
							onclick : "click(evt)"
						});
						$("#svgcontent").bind("click",click);//绑定点击事件
//						IniSvgTools(svgChart);
					} else {
						$.messager.alert('确认', "保存失败！", 'warning');// 移除失败
						$('#newAddSvg').window('close');
						//$('#divWaiting').window('close'); 
						//$('#divUpload').window('close');
					}
				});
			} else {
				$("#tool_source").click();
				var svgChart = $("#svg_source_textarea").val();		
				var wd = $(svgChart).attr("width");
				var ht = $(svgChart).attr("height");	
				svgChart= "<svg width='"+wd+"' height='"+ht+"' id='svg_Main' xmlns='http://www.w3.org/2000/svg' ><!-- Created with SVG-edit - http://svg-edit.googlecode.com/ -->" + svgChart.substring(svgChart.indexOf("</title>")+8,svgChart.lastIndexOf("</g>"))+ "</svg>";
				$("#tool_source_save").click();
				$.getJSON(basePath + 'svg/uploadSvg.action', {
					'subSvgModel.svgId' : selectSvgId,
					'subSvgModel.userTranId' : userTranId,
					'subSvgModel.svgChart' : svgChart,
				}, function(json) {
					if (json.saveSUCCESS == "true") {
						$.messager.alert('确认', "保存成功！", 'info', function(r) {
						});
						$("#svgcontent").bind("click",click);//绑定点击事件
						$('#newAddSvg').window('close');//关闭新增弹出层
						$('#divWaiting').window('close');//关闭等待层
						$('#divUpload').window('close');//关闭上传弹出层
					} else {
						$.messager.alert('确认', "保存失败！", 'warning');// 移除失败
						$('#newAddSvg').window('close');//关闭新增弹出层
						$('#divWaiting').window('close');//关闭等待层
						$('#divUpload').window('close');//关闭上传弹出层
					}
				});
			}
		}
	});	
}*/
/**
 * 点击取消按钮事件
 */
/*function QuitSubClick(){
	$('#divWaiting').window('close');//关闭等待层
	$('#divUpload').window('close');//关闭上传一次图弹出层
}*/

function addEditSvgClick(){	
	var svgName = $("#editSvgName").val();
	var svgOrder = $("#editSvgOrder").val();
	var bb = ""+svgOrder;
	if (svgName == "" || svgOrder==""){
		$.messager.alert('确认', "名称和排序不能为空！", 'warning');// 移除失败
		return;
		}else if(parseInt(svgOrder)!= svgOrder){
			$.messager.alert('确认', "排序必须为整型！！", 'warning',function()
					{

				 $("#editSvgOrder").textbox("textbox").focus();
					});// 移除失败
			return;
		}else if(svgName.length>200){
			$.messager.alert('确认', "一次图名称过长！", 'warning',function()
					{

				 $("#editSvgName").textbox("textbox").focus();
					});// 移除失败
			return;
		}else if(bb.length>16){
			$.messager.alert('确认', "排序过长！", 'warning',function()
					{

				 $("#editSvgOrder").textbox("textbox").focus();
					});// 移除失败
			return;
		}
		else
		{
			var datas= $('#svgSelectCtl').combobox("getData");
			for(var i = 0,len = datas.length;i<len;i++)
			{
				if(datas[i].svgName == svgName && datas[i].svgId != selectSvgId)
				{

					$.messager.alert('确认', "该一次图名称已存在！请重新修改名称!", 'warning',function()
							{

						 $("#editSvgName").textbox("textbox").focus();
							});
					return;
//					$.messager.confirm('确认','该一次图名称已存在，是否？',function(r){    
//					    if (r){    
//					        alert('确认删除');    
//					    }    
//					}); 
				}
			}
			
		}
	$('#divWaiting').window('open');
	divIswait ++;
	//var svgName = $("#editSvgName").val();
	//var svgOrder = $("#editSvgOrder").val();
	$.ajax({
		type : "post",
		url : basePath + 'svgManage/updateSvgBtnClick.action',
		dataType : "json",
		data : {
			'svgId' : selectSvgId,
			'svgName' : svgName	,
			'svgOrder' : svgOrder
		},
		complete:function(XMLHttpRequest,textStatus)
		{
			divIswait --;
			if (divIswait == 0){
				$('#divWaiting').window('close'); 
			}	
		},
		success : function(data) {		
			if (data.saveSUCCESS == "true") {
				$('#EditSvgDialog').window('close');
				$.messager.alert('确认', "修改成功！", 'info', function(r) {
				});
				QuerySvgNameById(userTranId);
			} else {
				$.messager.alert('确认', "修改失败！", 'warning');// 移除失败	
			}
		}
	});
}
function quitEditSvgClick(){
	 $('#EditSvgDialog').window('close');//关闭修改弹出层
	 divIswait --;
		if (divIswait == 0){
			$('#divWaiting').window('close'); 
		}	//关闭等待层
}	
/**
 * 修改按钮事件
 */
function updateSvgBtnClick(){
	$("#editSvgName").val("");//清空一次图名称
	$("#editSvgOrder").val("");	//清空排序
	 $('#EditSvgDialog').window('open');//打开修改弹出页面
	 var svgId = $('#svgSelectCtl').combobox('getValue');
	 for(var i=0,len = svgList.length;i<len;i++)
	 	{
	 	if(svgList[i].svgId==svgId)
	 		{
	 		//$("#editSvgName").textbox(svgList[i].svgName);
	 		$("#editSvgName").textbox('setValue',svgList[i].svgName);//一次图名称赋值
	 		$("#editSvgOrder").textbox('setValue',svgList[i].svgOrder);//排序赋值
	 		//$("#editSvgOrder").val(svgList[i].svgOrder);	 			 		
	 		}
	 	}
}
/**
 * 停运方式
 */
//function stopTypeCombobox(){
//	alert("1");
//	var stoptype = $("#stopType-combobox").combobox("getValue");
//	alert("stoptype:      "+stoptype);
//	clickSetObj.stopType = stotype;
//}
///**
// * 停运方式Id
// */
//function stopTypeTextbox(){
//	var stopobjid = $("#stopType-textbox").combobox("getText");
//	clickSetObj.stopObjId = stopobjid;
//}
///**
// * 无信号方式
// */
//function noSingleCombobox(){
//	
//}
///**
// * 无信号Id
// * 
// */
//function hideNosingleId(){
//	var singleId = $("#noSingleId").textbox('getText');
//	clickSetObj.noSingleId = singleId;
//	$("#" + singleId).attr("display","none");
//}
//
///**
// * 告警方式
// * 
// */
//function alarmCombobox(){
//	var alarmmode = $("#alarm-combobox").combobox('getValue');
//	clickSetObj.alarmMode = alarmmode;
//}
//
///**
// * 告警Id
// */
//function alarmId(){
//	var alarmId = $("#alarmId").textbox('getText');
//	clickSetObj.alarmObjId = alarmId;
//}
//
///**
// * 点击事件
// */
//function btnClickCombobox(){
//	var clickevent = $("#btnClick-combobox").combobox('getValue');
//	clickSetObj.clickEvent = clickevent;
//}
///**
// * 开关方式
// */
//function switchTypeCombobox(){
//	/*var switchType = $("#switchType-combobox").val();
//	clickSetObj.clickEvent = clickevent;*/
//}
//
///**
// * 开关Id
// */
//function switchId(){
//	var openobjId = $("#switchId").textbox('getText');
//	clickSetObj.openobjId = openobjId;
//}
//
///**
// * 开关方向
// */
//function switchDirctCombobox(){
//	var id = $("#switchDirct-combobox").combobox('getValue');
//	var str =(id==null || id=="")?"": id.split("_");
//	var dirct = str==""?"":str[0];
//	var oneortwo =str==""?"": str[1];
//	clickSetObj.dirct = dirct;
//	clickSetObj.oneOrTwo = oneortwo;
//}
/**
 * 新增界面的取消按钮点击事件
 */
function QuitSvgBtnClick(){
	$('#newSvgDialog').window('close');//关闭修改弹出层
	 divIswait --;
		if (divIswait == 0){
			$('#divWaiting').window('close'); 
		}	//关闭等待层
}
//关闭元件
function closePanelClick(){
	$("#tools_tubiao_detail").css("display","none");
}

/*$("#consnumber").click(function() {
	$.ajax({
		type : "post",
		url : basePath + 'svg/getConsNumber.action',
		dataType : "json",
		success : function (count){
			alert("count[0].cout:   "+count[0].cout);
			alert("count[1].cout:   "+count[1].cout);
			alert("count[2].cout:   "+count[2].cout);
			alert("count[3].cout:   "+count[3].cout);
			}
	});
});*/
//弹出页面
function reBack(){
	if (window.frames[0].location.href != 'about:blank' && window.frames[0].location.href != ""){
		window.frames[0].IniSvgView("","");
		//window.frames[0].IniTextBoxSearch();
		window.frames[0].$('#input1').textbox('clear');
	}
    $('#dialog2').window('center').panel('open');
//    $('#input1').textbox("setValue","无语");
}
//清除缓存
function cleanDeleteMpAll(){
	if(setSvgObj != null){
		setSvgObj.svgId = "";
		setSvgObj.objId = "";
		setSvgObj.sfMpId = "";
		setSvgObj.stopType = "";
		setSvgObj.stopObjId = "";
		setSvgObj.noSingleId = "";
		setSvgObj.clickEvent = "";
		setSvgObj.deviceId = "";
		setSvgObj.deviceType = "";		
		setSvgObj.byVolt = "";

		setSvgObj.alarmMode = "";
		setSvgObj.alarmObjId = "";
		
		setSvgObj.openType = "";	
		setSvgObj.openobjId = "";	
		setSvgObj.isSwitch = "";
		setSvgObj.dirct = "";
		setSvgObj.origPosition = "";
		setSvgObj.oneOrTwo = "";
		setSvgObj = null;
	}

	if(clickSetObj != null){
		clickSetObj.svgId = "";
		clickSetObj.objId = "";
		clickSetObj.sfMpId = "";
		clickSetObj.stopType = "";
		clickSetObj.stopObjId = "";
		clickSetObj.noSingleId = "";
		clickSetObj.clickEvent = "";
		clickSetObj.deviceId = "";
		clickSetObj.deviceType = "";		
		clickSetObj.byVolt = "";

		clickSetObj.alarmMode = "";
		clickSetObj.alarmObjId = "";
		
		clickSetObj.openType = "";	
		clickSetObj.openobjId = "";	
		clickSetObj.isSwitch = "";
		clickSetObj.dirct = "";
		clickSetObj.origPosition = "";
		clickSetObj.oneOrTwo = "";
		clickSetObj = null;
	}
	
}
//让所有输入下拉框不可用
function addDisable(){
	$("#stopType-combobox").combobox({disabled:true});
	$("#stopType-textbox").textbox('disable');
	$("#noSingle-combobox").combobox({disabled:true});
	$("#noSingleId").textbox('disable');
	$("#alarm-combobox").combobox({disabled:true});
	$("#alarmId").textbox('disable');
	$("#btnClick-combobox").combobox({disabled:true});
//	$("#isSwitch-button").
	document.getElementById("isSwitch-button").disabled=true;
	$("#switchType-combobox").combobox({disabled:true});
	$("#switchId").textbox('disable');
	$("#switchDirct-combobox").textbox('disable');
	$("#SwitchAnimation").linkbutton({disabled:true});
	$("#InsertMpAll").linkbutton({disabled:false});
	$("#DeleteMpAll").linkbutton({disabled:true});
}
//删除测点事件
function DeleteMpAll(){
	var dSvgId = DeleteMpAllSvgId;
	var dObjId = DeleteMpAllObjId;
	if(dSvgId != "" || dSvgId != null || dSvgId != undefined || dSvgId != "undefined"){
		$.messager.confirm('提示', "确定删除测点配置吗?", function(r){
			if(r){
				$.ajax({
					type : "post",
					url : basePath + 'svgManage/deleteMpAll.action',
					dataType : "json",
					data : {
						'objId' : dObjId,
						'svgId' : dSvgId
					},
					success : function(data) {		
						if (data.saveSUCCESS == "true") {
							cleanDeleteMpAll();					
							GetSvgSet(dSvgId);
							cleanAll();
							$("#selectMpName").html("");
							$('#mpGrid').datagrid("loadData",{total:0,rows:[]});	
							$('#DeleteMpAll').linkbutton({disabled:false});
							$('#devSelectCtl').combotree('setValue', {
								id : "",
								text : ""
							});
							addDisable();
							$.messager.alert('提示', "删除成功！", 'info', function(r) {
							});
						} else {
							$.messager.alert('提示', "删除失败！", 'warning');// 移除失败	
						}
					}
				});
			}
		});
	}else{
		$.messager.alert('提示', "请选择要删除配置的测点！", 'warning');
	}
}
//画布点击功能
$("#svgcanvas").click(function(evt){	
	if(ifSvgcontentClick==false){
		$('#stopType-combobox').combobox('setValue',"");//clickSetObj.stopType);
		$('#stopType-textbox').textbox('setValue',"");
		
		$('#noSingle-combobox').combobox('setValue', "");
		$('#noSingleId').textbox('setValue', "");
		

		$('#alarm-combobox').combobox('setValue', "");
		$('#alarmId').textbox('setValue', "");

		$('#btnClick-combobox').combobox('setValue', "");
		
		$("#mpChkBox").removeAttr("checked","checked");
		
		
		$('#switchType-combobox').combobox('setValue', "");
		$('#switchId').textbox('setValue', "");
		
		$('#switchDirct-combobox').combobox('setValue', "");	
		
		$("#selectMpName").html("");
		$("#selectMpId").val("");
		
		
		$("#byvoltChkBox").removeAttr("checked","checked");
		
		
		
		$('#devSelectCtl').combotree('setValue', {
			id : "",
			text : ""
		});
		
		$('#mpGrid').datagrid("loadData",{total:0,rows:[]});
		$("#mpChkBox").removeAttr("checked","checked");//不选择绑定测点
		MPChk_Click();//关联测点事件
		$('#InsertMpAll').linkbutton({disabled:true});
		$('#DeleteMpAll').linkbutton({disabled:true});
	}else{
		ifSvgcontentClick=false;		
	}
});

//定时上传
function setInterSave()
{
	$('#uploadSvgBtn').linkbutton({disabled:true});
	try
	{
		if($("#svg_source_editor").css("display") == "none"){
			$("#tool_source").click();
			svgChart = $("#svg_source_textarea").val();
			var wd = $(svgChart).attr("width");
			var ht = $(svgChart).attr("height");
			var strDefs = "";
			if(svgChart.indexOf("<defs>") != -1 && svgChart.indexOf("</defs>") != 339){
				strDefs+= svgChart.substring(svgChart.indexOf("<defs>"),svgChart.lastIndexOf("</defs>")+7) 
			}
			svgChart= "<svg width='"+wd+"' height='"+ht+"' id='svg_Main' xmlns='http://www.w3.org/2000/svg' ><!-- Created with SVG-edit - http://svg-edit.googlecode.com/ -->" + strDefs+svgChart.substring(svgChart.indexOf("<g"),svgChart.lastIndexOf("</g>")+4)+ "</svg>";
			$("#tool_source_save").click();
		}else{
			svgChart = $("#svg_source_textarea").val();
			var wd = $(svgChart).attr("width");
			var ht = $(svgChart).attr("height");
			var strDefs = "";
			if(svgChart.indexOf("<defs>") != -1 && svgChart.indexOf("</defs>") != 339){
				strDefs+= svgChart.substring(svgChart.indexOf("<defs>"),svgChart.lastIndexOf("</defs>")+7) 
			}
			svgChart= "<svg width='"+wd+"' height='"+ht+"' id='svg_Main' xmlns='http://www.w3.org/2000/svg' ><!-- Created with SVG-edit - http://svg-edit.googlecode.com/ -->" + strDefs+svgChart.substring(svgChart.indexOf("<g"),svgChart.lastIndexOf("</g>")+4)+ "</svg>";
		}		
	}
	catch(ex)
	{
		$('#divWaiting').window('close');
		$.messager.alert('确认', "错误！" + ex.message, 'error');
		$('#uploadSvgBtn').linkbutton({disabled:false});
		return;
	}
//	if(svgChart.replace(/\n/g,"").trim() == ("<svg width='1212' height='726' id='svg_Main' xmlns='http://www.w3.org/2000/svg' ><!-- Created with SVG-edit - http://svg-edit.googlecode.com/ -->"+'<g class="layer">  <title>Layer 1</title> </g></svg>')){
//	if(svgChart.substring(svgChart.indexOf("<g"),svgChart.lastIndexOf("</g>")+4).replace(/\n/g,"").trim() == '<g class="layer">  <title>Layer 1</title> </g>'){
	if(svgChart.substring(svgChart.lastIndexOf("</title>")+8,svgChart.lastIndexOf("</g>")).replace(/\n\s*/g,"").trim() == null || svgChart.substring(svgChart.lastIndexOf("</title>")+8,svgChart.lastIndexOf("</g>")).replace(/\n\s*/g,"").trim() == ""){	
		$('#uploadSvgBtn').linkbutton({disabled:false});		
		return;			
	}
	$.getJSON(basePath + 'svgManage/uploadSvg.action', {
		'subSvgModel.svgId' : selectSvgId,
		'subSvgModel.userTranId' : userTranId,
		'subSvgModel.svgChart' : svgChart,
	}, function(json) {
		$('#divWaiting').window('close');
		if (json.saveSUCCESS == "true") {
			$("#svgcontent").bind("click",click);
			$('#uploadSvgBtn').linkbutton({disabled:false});
		} else {
			$.messager.alert('确认', "保存失败！" + json.errorMsg, 'warning');// 移除失败
		}
	}).error(function (jqXhr,textStatus,error)
			{
		$('#divWaiting').window('close');
		$.messager.alert('确认', "接口调用失败！" + jqXhr.responseText, 'warning');// 移除失败
			});		
}

//改变文字竖排
$("#tool_vertical").click(function(){
	var id=$('#elem_id').val();
	if($("#" + id).attr("baseline-shift")==null){
		$("#" + id).attr("baseline-shift", "baseline");
		$("#" + id).attr("writing-mode", "tb");	
		$("#tool_vertical").removeClass("pictureHorizontal");
		$("#tool_vertical").addClass("pictureVertical");
	}else{		
		$("#" + id).removeAttr("baseline-shift");
		$("#" + id).removeAttr("writing-mode");	
		$("#tool_vertical").removeClass("pictureVertical");
		$("#tool_vertical").addClass("pictureHorizontal");
	}	
});
/**
 * 左对齐
 */
$("#tool_flushLeft").click(function(){
	var id=$('#elem_id').val();
	if($("#tool_flushLeft").attr("text-anchor") != "left"){
		$("#" + id).attr("text-anchor", "left");
	}
});
/**
 * 右对齐
 */
$("#tool_flushRight").click(function(){
	var id=$('#elem_id').val();
	if($("#tool_flushRight").attr("text-anchor") != "right"){
		$("#" + id).attr("text-anchor", "right");
	}
});
/**
 * 居中
 */
$("#tool_flushMiddle").click(function(){
	var id=$('#elem_id').val();
	if($("#tool_flushMiddle").attr("text-anchor") != "middle"){
		$("#" + id).attr("text-anchor", "Middle");
	}
});