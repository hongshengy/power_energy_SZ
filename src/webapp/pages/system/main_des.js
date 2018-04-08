/**
 * <p>
 * Title: 区域能源主页面
 * Company: 江苏方天电力技术有限公司
 * </p>
 */
var shuzhi = null;//标识位
var roleId = '';//全局获取用户的角色id
var roleCode = '';//登录用户的角色编码(按综合能源、区域能源区分)
var roleCodeAll = '';//登录用户的角色编码(完整的roleCode)
var rolename = '';//登录用户的角色名称
var pagefirst = '';//初始加载的首页链接
var firsthtml = ''; //首次加载时，记录首页模块信息
var menuIds = [];//一级菜单id集合
var rindex = 0;
var isOldpwd = false;
var isAffnewpwd = false;
var oldpwd = '';
var conts = 0;
var areaNo = '';//区域编码
var areaName = '';//区域名称
var systemTime = '';
var ret = '';
var intervalFlag = null;
var isFistTimeSet = true;//是否第一次加载时间
var gaojingnr = null;//存上次警铃告警内容
var roleList = '';//角色列表  全局变量
// 是否是客户角色
var isCustomer = false;

var consId = '';//客户编码
var consName = '';//客户名称

var alarmConfirmTime = '';//告警提示信息时间
var gjCountFlag = false;
var gjNewFlag = false;


$(function () {

    /*$.ajax({
        url:'http://tianqi.2345.com/plugin/widget/index.htm?s=2&z=3&t=1&v=2&d=2&bd=0&k=&f=&ltf=009944&htf=cc0000&q=0&e=0&a=1&c=54511&w=380&h=80&align=center',
        type:'GET',
        complete:function(response){
            if(response.status == 200){
                $('#div_w_1').css('display','block');
                $('#div_w_2').css('display','none');
                $('#div_w_3').css('display','none');
            }else{
                $('#div_w_1').css('display','none');
                $('#div_w_2').css('display','none');
                $('#div_w_3').css('display','block');
            }
        }
    })*/

    // 测试注释，到时候放开
    //loadGaojingCount();//加载警铃信息
//   loadNewGaojing();//加载告警提示信息

    //区域名称
//     $.getJSON(webContextRoot + 'pCode/selectAreaName.action', {},
//         function (json) {
//             $('#dqName').text(json[0].areaName);
//             areaName = json[0].areaName;
//             areaNo = json[0].areaNo;
// //	    	if(areaNo == '101'){
//             document.title = "综合能源服务系统";
//             $('#areaPhoto').attr('src', webContextRoot + '/pages/despages/common/images/main-title1_3.png');
// //	    	} else {
// //	    		document.title="区域能源服务系统";
// //	    		$('#areaPhoto').attr('src', webContextRoot + '/pages/despages/common/images/main-title1_2.png');
// //	    	}
//
//         }
//     );

    document.title = "综合能源服务系统";
    $('#areaPhoto').attr('src', webContextRoot2 + '/pages/despages/common/images/main-title1_3.png');

    $('#gaojingsl').css("display", "none");
    $('#btnHelp, #btnPassword, #btnQuit').linkbutton({
        width: 100,
        text: '在线帮助'
    });

    $('#btnPassword').linkbutton({
        width: 100,
        text: '修改密码'
    });

    $('#cnbwhdpt').linkbutton({
        width: 100,
        text: '退出'
    });
    /*处理combo-role的相关事件*/
    $('#combo-role .combo-textbox').click(function () {
        $(this).toggleClass('active');
        $('#combo-role .combo-list').slideToggle('fast');
    });

//		    $('#combo-role .combo-list li').click(function () {
//		        alert("选择了:" + $(this).text() + ",值为:" + $(this).attr('data'));
//		        $('#combo-role .combo-text').text($(this).text());
//		        $('#combo-role .combo-list').slideToggle('fast');
//		    });
//  

    $('#combo-role .combo-textbox').mouseleave(function (event) {
//	    	console.log(event);
//	        if ((event.toElement&&event.toElement.className == 'combo-list' )||
//	        		(event.toElement&&event.toElement.parentElement.className == 'combo-list')){
        return false;
//	        }
//	        $('#combo-role .combo-list').slideUp('fast');
    });

    $('#combo-role .combo-list').mouseleave(function () {
        $('#combo-role .combo-list').slideUp('fast');
    });
    /*end*/

    selectRoleid();

    // setInterval(function(){
    // 	if(gjCountFlag){
    // 		loadGaojingCount();
    // 	}
    // 	/*if(gjNewFlag){
    // 		loadNewGaojing();
    // 	}*/
    // },5000);
    //

//	queryWeatherData();
//	setInterval("queryWeatherData();",600000);

    /**
     * 判断新密码和确认密码是否一致
     */
    $("#newpwd").textbox("textbox").blur(function () {
        var newpwd = $('#newpwd').val();
        var affnewpwd = $('#affnewpwd').val();
        if (newpwd != '') {
            $('#newpwdimg1').css('display', 'none');
            $('#newpwdimg2').css('display', 'block');
        } else {
            $('#newpwdimg2').css('display', 'none');
            $('#newpwdimg1').css('display', 'block');
        }

        if (affnewpwd != '' & newpwd != '' & affnewpwd != newpwd) {
            $('#affnewpwdimg2').css('display', 'none');
            $('#affnewpwdimg1').css('display', 'block');
        }
        if (affnewpwd != '' & newpwd != '' & affnewpwd == newpwd) {
            $('#affnewpwdimg1').css('display', 'none');
            $('#affnewpwdimg2').css('display', 'block');
        }
    });
    $("#affnewpwd").textbox("textbox").blur(function () {
        var newpwd = $('#newpwd').val();
        var affnewpwd = $('#affnewpwd').val();
        if (affnewpwd == newpwd & affnewpwd != '' & newpwd != '') {
            $('#affnewpwdimg1').css('display', 'none');
            $('#affnewpwdimg2').css('display', 'block');
        } else {
            $('#affnewpwdimg2').css('display', 'none');
            $('#affnewpwdimg1').css('display', 'block');
        }
    });

//	tishi();//获取升级提示信息
    //newNotice();//获取新闻提示信息
});

/**
 * 加载首页告警数量信息和告警信息提示框
 */
function loadGaojingCount() {
    $.get(webContextRoot + 'warn/querygaojingchaxunshouyecont.action', {
        'gaoJIngChaXunSYModel.consId': consId,
        'gaoJIngChaXunSYModel.dataSource': '0',
        'gaoJIngChaXunSYModel.alarmConfirmTime': alarmConfirmTime
    }, function (data) {
        gjCountFlag = true;

        if (data.sMap != null) {
            if (data.sMap.resCount != conts || data.sMap.resCount != 0) {
                conts = parseInt(data.sMap.resCount);
                if (conts == 0) {
                    // 替换图片
                    // $("#gaojingld").attr("src",'../images/warning-gray.png');
                    $("#gaojingld").css("display", "block");
                    $("#gaojingld_yj").css("display", "none");
                    // document.getElementById("gaojingld").setAttribute("src",
                    // '../images/warning-gray.png');
                    // 隐藏标签的写法
                    $("#gaojingsl").css("display", "none");
                    // document.getElementById("gaojingld").styly.display="none";
                    // $("#gaojingsl").hide();
                } else {
                    // $("#gaojingld").attr("src",'../images/warning.png');
                    $("#gaojingld").css("display", "none");
                    $("#gaojingld_yj").css("display", "block");
                    $("#gaojingsl").css("display", "block");
                    if (conts > 99) {
                        $("#gaojingsl").text("99+");
                        $('#gaojingsl').removeClass('warining-num').addClass(
                            'warining-num2');
                        $("#gaojingsl").css("background",
                            'url(../images/warningNum-bg2.png)');
                        floatShow(conts);
                    } else {
                        $("#gaojingsl").text(conts);
                        floatShow(conts);
                    }
                }
            }

            if (data.sMap.maxTime != null) {
                alarmConfirmTime = data.sMap.maxTime;
            }
            if (data.sMap.resList.length != 0) {
                queryGaoJing(data.sMap.resList);
            } else {
                $('#newMessageDIV').html("");
            }
        }

    });
}

function showGaojingTip(count) {
    var str = "实时，出现" + count + "条告警信息！";
    $('#gaojing').empty();
    $('#gaojing').append(str);

    zhText = $('#gaojing').text();//语音 播报内容

    var options = {
        containerDom: document.getElementById('tip-panel-container'),
        waitTime: 20000,
        width: 400,
        panelType: 'warning',
        panelTitle: '警告窗口',
        panelContent: str
    };
    var panel = new popPanel(options);

    panel.open();

}

/*
 * wangzixuan 
 *  * 获取系统时间
 */
//  function getSysDate() {
// 	$.ajax({
// 		type : "post",
// 		url : '/des/svgMonitor/queryCurrentTimeSVG.action',
// 		dataType : "json",
// 		success : function(data) {
// 			if (data.length > 0) {
// //				date = DateUtil.dateAdd('s',1,DateUtil.strToDate(data[0].svgSysDate));
// 				ret = DateUtil.strToDate(data[0].svgSysDate);
// 				if(intervalFlag){
// 					//clearTimeout(intervalFlag);
// 					clearInterval(intervalFlag);
// 				}
// 				//timeChange();
// 				intervalFlag = setInterval(timeChange,1000);
// 			}
// 		}
// 	});
// 	if(isFistTimeSet==true){
// 	    setInterval(getSysDate, 300000);//每间隔5分钟从数据库中取一次系统时间
// 	    isFistTimeSet=false;
// 	}
// }

// function timeChange(){
//  //intervalFlag = setTimeout("timeChange()", 1000);//这里用到setTimeout()方法用于在指定毫秒数后调用函数或计算表达式
//     //	而setInterval()则在每隔指定的毫秒数循环调用函数
// 	ret = DateUtil.dateAdd('s',1,ret);
// 	var abc = DateUtil.dateToStr("yyyy-MM-dd 周W HH:mm:ss",ret);
// 	$('#systemTime').text(abc);
// }

function tishi() {//弹出提示升级
    $.get(webContextRoot + 'warn/queryshouyetishi.action',
        {},
        function (data) {
            if (data.confi.UPSystem != "") {//roleid 元素是否存在
                clearTimeout(clearTimeoutFlag);
//					 	   var ssi = setTimeout(function () {
                var options = {
                    containerDom: document.getElementById('tip-panel-container'),
//						            waitTime: 10000,
                    panelContent: '<p style="margin: 20px auto;height: 40px;">' + data.confi.UPSystem + '</p>'
                };
                var panel = new popPanel(options);
                panel.open();
//						    }, 1000);
            } else {//刷新
                clearTimeout(clearTimeoutFlag);//清除setTimeout
                clearTimeoutFlag = setTimeout(function () {//等待12000毫秒之后再次判断
                    tishi();
                }, 12000);//等待12000毫秒之后再次判断
            }
        });
}

/**
 * 告警信息
 */
function queryGaoJing(num) {
    var str = '';
    var zhText = '';
    var sti = '';
    for (var o = 0; o < num.length; o++) {
        sti += num[o].mpId
    }
    $.post(webContextRoot + 'warn/queryRealTimeAlarm.action',
        {
            'gaoJIngChaXunSYModel.subsId': '',
            'gaoJIngChaXunSYModel.bianwei': 0,
            'gaoJIngChaXunSYModel.gaojing': 1,
            'gaoJIngChaXunSYModel.mpCode': '',
            'gaoJIngChaXunSYModel.alarmStartTime': '',
            'gaoJIngChaXunSYModel.alarmEndTime': '',
            'gaoJIngChaXunSYModel.consId': consId,
            'gaoJIngChaXunSYModel.deviceType': '',
            'gaoJIngChaXunSYModel.dataDate': '',
            'gaoJIngChaXunSYModel.confirmFlag': '',
            'gaoJIngChaXunSYModel.mpId': sti,
            'gaoJIngChaXunSYModel.alarmLevel': '',
            'gaoJIngChaXunSYModel.page': '',
            'gaoJIngChaXunSYModel.rows': '',
            'gaoJIngChaXunSYModel.queryAlarmType': '1'

        }, //请求路径
        function (data) {//回调
            /*for(var i = data.length-1;i>0;i--){
                if(i > data.length - 3){
                    var type='';
                    if(data[i].mpCode == 02){
                        type = "变位";
                    }else{
                        type = "越限";
                    }
                   // data[i].subsName+data[i].deviceTypeName+date[i].alarmLevelName+
                   // 2017-03-17 16:31:48 常州市公司1用户变2重大告警越限
                    str += '<p>'+data[i].alarmStartTime+"&nbsp"+data[i].consName+"&nbsp"+data[i].subsName+"&nbsp"+data[i].deviceName+"&nbsp 发生"+data[i].alarmLevelName+"("+data[i].mpName+type+")"+'</p>'
                }
            }*/
            var gjData = [];
            if (areaNo == '103') {//江阴地区特殊处理（不展示一般告警信息）
                for (var i = 0, len = data.sMap.rows.length; i < len; i++) {
                    if (data.sMap.rows[i].alarmLevel != '4') {
                        gjData.push(data.sMap.rows[i]);
                    }
                }
            } else {
                gjData = data.sMap.rows;
            }
            if (gjData.length != 0) {
                for (var i = 0, len = gjData.length; i < len; i++) {
                    var type = '';
                    if (gjData[i].mpCode == 02) {
                        type = "变位";
                    } else {
                        type = "越限";
                    }
                    str = gjData[i].alarmLevelName + '，实时，' + gjData[i].consName + "，" + gjData[i].subsName + "，" + gjData[i].deviceName + " 发生 (" + gjData[i].mpName + type + ")";

                    /**
                     * 连接外网才能使用
                     * lan=zh：语言是中文，如果改为lan=en，则语言是英文。ie=UTF-8：文字格式。spd=2：语速，可以是1-9的数字，数字越大，语速越快。text=**：这个就是你要转换的文字。
                     */
                    if (i == len - 1)
//							  $('#newMessageDIV').attr("src","http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=6&text='"+ str.replace(new RegExp(/(#)/g),"") +"'");
                        $('#newMessageDIV').attr("src", "http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&ctp=1&cuid=11018723&tok=24.9b6f7461d8d58820385fde90b0761a01.2592000.1524913890.282335-11018796&spd=6&vol=9&per=0&spd=6&pit=5&tex='" + str.replace(new RegExp(/(#)/g), "") + "'");

                    (function () {
                        var pCt = "<p>" + str + "</p>";
                        var options = {
                            containerDom: document.getElementById('tip-panel-container'),
                            waitTime: 10000,
                            width: 400,
                            panelType: 'warning',
                            panelTitle: '警告窗口',
                            panelContent: pCt
                        };
                        var panel = new popPanel(options);
                        panel.open();
                    })();
                }
            }

        },
        "json");//返回格式
}

function closegg() {

    popWarningPanel.domId = "main-warning-tip-panel";
    popWarningPanel.close();
}


//悬浮窗事件
function floatShow(conts) {

    $('#gaojingsl').tooltip({
        position: 'bottom',
        content: '<span style="color:#fff">' + conts + '</span>',
        onShow: function () {
            $(this).tooltip('tip').css({
                backgroundColor: '#666',
                borderColor: '#666'
            });
        }
    });
}


//查询告警信息
//function testOpen(subsId,bianwei,gaojing){
//	var content = "<iframe src='"+baseUrl+"/pages/despages/warn/GaoJingXinXi.jsp?subsId="+subsId+"&bianwei="+bianwei+"&gaojing="+gaojing+"' width='100%' height='99%' frameborder='0' scrolling='no'/>";	
//	var boarddiv = "<div id='msgwindow' title='详情'/>";
//	$(document.body).append(boarddiv);
//	var win = $("#msgwindow").dialog({
//		content : content,
//		width : document.body.clientWidth-160,
//		height : document.body.clientHeight-160,
//		maximizable:true,
//		closable:true,
//		modal : 'shadow',
//		title : '告警详情',
////		onClose : function() {
////			$(this).window('close');
////		}
//	});
//	win.dialog('open');
//
//}


//window.onresize = function(){
//	resize(2);
//}

/**
 * 获取角色id
 * 执行动态菜单加载
 */
function selectRoleid() {
    // debugger;
    var Name = null;
    if (UserName.length > 6) {
        Name = UserName.substring(0, 6) + '...';

    } else {
        Name = UserName;
    }
    $("#loginName").text(Name);
    $("#loginName").attr("title", UserName);
//	$("#xialajs").text(Name);
//	$("#xialajs").attr("title",UserName);
    roleList = '';//清空全局变量，角色列表

    var data = eval("(" + '[\n' +
        '   {\n' +
        '      "busiCode" : "BASEAPP",\n' +
        '      "funcIco" : "",\n' +
        '      "funcUrl" : "",\n' +
        '      "isLeaf" : "N",\n' +
        '      "isPop" : "N",\n' +
        '      "menuId" : "-73",\n' +
        '      "menuName" : "基本应用",\n' +
        '      "parentId" : "0"\n' +
        '   },\n' +
        '   \n' +
        '   \n' +
        '   {\n' +
        '      "busiCode" : "ynpgRoot",\n' +
        '      "funcIco" : "icon_ynpg",\n' +
        '      "funcUrl" : "",\n' +
        '      "isLeaf" : "N",\n' +
        '      "isPop" : "N",\n' +
        '      "menuId" : "10099238418",\n' +
        '      "menuName" : "运行监控",\n' +
        '      "parentId" : "-73"\n' +
        '   },\n' +
        '   {\n' +
        '      "busiCode" : "ynpgLeafYnpm",\n' +
        '      "funcIco" : "",\n' +
        '      "funcUrl" : "pages/despages/diacrisisAnalyse/ynpmfx.jsp",\n' +
        '      "isLeaf" : "Y",\n' +
        '      "isPop" : "N",\n' +
        '      "menuId" : "10099240091",\n' +
        '      "menuName" : "一次系统图展示",\n' +
        '      "parentId" : "10099238418"\n' +
        '   },\n' +
        '   {\n' +
        '      "busiCode" : "ynpgLeafScxynpg",\n' +
        '      "funcIco" : "",\n' +
        '      "funcUrl" : "pages/despages/electricQuality/productionLine.jsp",\n' +
        '      "isLeaf" : "Y",\n' +
        '      "isPop" : "N",\n' +
        '      "menuId" : "10099240698",\n' +
        '      "menuName" : "动力和环境监测",\n' +
        '      "parentId" : "10099238418"\n' +
        '   },\n' +
        '   {\n' +
        '      "busiCode" : "ynpgLeafCjynpg",\n' +
        '      "funcIco" : "",\n' +
        '      "funcUrl" : "pages/despages/electricQuality/workshopEnergy.jsp",\n' +
        '      "isLeaf" : "Y",\n' +
        '      "isPop" : "N",\n' +
        '      "menuId" : "10099240296",\n' +
        '      "menuName" : "视频监测",\n' +
        '      "parentId" : "10099238418"\n' +
        '   },\n' +
        '{\n' +
        '      "busiCode" : "zdfxroot",\n' +
        '      "funcIco" : "icon_yongnengfenxi",\n' +
        '      "funcUrl" : "",\n' +
        '      "isLeaf" : "N",\n' +
        '      "isPop" : "N",\n' +
        '      "menuId" : "10099229909",\n' +
        '      "menuName" : "采集数据",\n' +
        '      "parentId" : "-73"\n' +
        '   },\n' +
        '   {\n' +
        '      "busiCode" : "byqleaf",\n' +
        '      "funcIco" : "",\n' +
        '      "funcUrl" : "pages/despages/diacrisisAnalyse/byqzdfx.jsp",\n' +
        '      "isLeaf" : "Y",\n' +
        '      "isPop" : "N",\n' +
        '      "menuId" : "10099229911",\n' +
        '      "menuName" : "用户实时数据展示",\n' +
        '      "parentId" : "10099229909"\n' +
        '   },\n' +
        '   {\n' +
        '      "busiCode" : "ynfxLeafDjxt",\n' +
        '      "funcIco" : "",\n' +
        '      "funcUrl" : "pages/despages/diacrisisAnalyse/djjcfx.jsp",\n' +
        '      "isLeaf" : "Y",\n' +
        '      "isPop" : "N",\n' +
        '      "menuId" : "10099244991",\n' +
        '      "menuName" : "测点实时数据展示维护",\n' +
        '      "parentId" : "10099229909"\n' +
        '   },\n' +
        '   {\n' +
        '      "busiCode" : "ynfxLeafZmxt",\n' +
        '      "funcIco" : "",\n' +
        '      "funcUrl" : "pages/despages/electricQuality/zmsb.jsp",\n' +
        '      "isLeaf" : "Y",\n' +
        '      "isPop" : "N",\n' +
        '      "menuId" : "10099240701",\n' +
        '      "menuName" : "事件记录数据展示维护",\n' +
        '      "parentId" : "10099229909"\n' +
        '   },\n' +
        '   {\n' +
        '      "busiCode" : "ynfxLeafKtxt",\n' +
        '      "funcIco" : "",\n' +
        '      "funcUrl" : "pages/despages/electricQuality/fgktxt.jsp",\n' +
        '      "isLeaf" : "Y",\n' +
        '      "isPop" : "N",\n' +
        '      "menuId" : "10099238249",\n' +
        '      "menuName" : "曲线数据展示维护",\n' +
        '      "parentId" : "10099229909"\n' +
        '   },\n' +
        '   {\n' +
        '      "busiCode" : "desHyfx",\n' +
        '      "funcIco" : "icon_hyfx",\n' +
        '      "funcUrl" : "",\n' +
        '      "isLeaf" : "N",\n' +
        '      "isPop" : "N",\n' +
        '      "menuId" : "10099259457",\n' +
        '      "menuName" : "能源GIS展示",\n' +
        '      "parentId" : "-73"\n' +
        '   },\n' +
        '   {\n' +
        '      "busiCode" : "desHyfx",\n' +
        '      "funcIco" : "icon_hyfx",\n' +
        '      "funcUrl" : "pages/despages/monitor/GISZongLan",\n' +
        '      "isLeaf" : "Y",\n' +
        '      "isPop" : "N",\n' +
        '      "menuId" : "1009924999",\n' +
        '      "menuName" : "能源GIS展示",\n' +
        '      "parentId" : "10099259457"\n' +
        '   },\n' +
        '   {\n' +
        '      "busiCode" : "des_gdyw",\n' +
        '      "funcIco" : "icon_gongdanyunwei",\n' +
        '      "funcUrl" : "",\n' +
        '      "isLeaf" : "N",\n' +
        '      "isPop" : "N",\n' +
        '      "menuId" : "10099212607",\n' +
        '      "menuName" : "运维管理",\n' +
        '      "parentId" : "-73"\n' +
        '   },\n' +
        '   {\n' +
        '      "busiCode" : "ywglLeafYwgk",\n' +
        '      "funcIco" : "",\n' +
        '      "funcUrl" : "pages/despages/projectManage/operationManage.jsp",\n' +
        '      "isLeaf" : "Y",\n' +
        '      "isPop" : "N",\n' +
        '      "menuId" : "10099245838",\n' +
        '      "menuName" : "交接班管理",\n' +
        '      "parentId" : "10099212607"\n' +
        '   },\n' +
        '   {\n' +
        '      "busiCode" : "ywglLeafYwgk",\n' +
        '      "funcIco" : "",\n' +
        '      "funcUrl" : "pages/despages/projectManage/operationManage.jsp",\n' +
        '      "isLeaf" : "Y",\n' +
        '      "isPop" : "N",\n' +
        '      "menuId" : "10099245839",\n' +
        '      "menuName" : "停电信息管理",\n' +
        '      "parentId" : "10099212607"\n' +
        '   },\n' +
        '   {\n' +
        '      "busiCode" : "ywglLeafYwgk",\n' +
        '      "funcIco" : "",\n' +
        '      "funcUrl" : "pages/despages/projectManage/operationManage.jsp",\n' +
        '      "isLeaf" : "Y",\n' +
        '      "isPop" : "N",\n' +
        '      "menuId" : "10099245840",\n' +
        '      "menuName" : "设备二维码管理",\n' +
        '      "parentId" : "10099212607"\n' +
        '   },\n' +
        '   {\n' +
        '      "busiCode" : "ywglLeafYwgk",\n' +
        '      "funcIco" : "",\n' +
        '      "funcUrl" : "pages/despages/projectManage/operationManage.jsp",\n' +
        '      "isLeaf" : "Y",\n' +
        '      "isPop" : "N",\n' +
        '      "menuId" : "10099245841",\n' +
        '      "menuName" : "变电所巡检",\n' +
        '      "parentId" : "10099212607"\n' +
        '   },\n' +
        '   {\n' +
        '      "busiCode" : "ywglLeafYwgk",\n' +
        '      "funcIco" : "",\n' +
        '      "funcUrl" : "pages/despages/projectManage/operationManage.jsp",\n' +
        '      "isLeaf" : "Y",\n' +
        '      "isPop" : "N",\n' +
        '      "menuId" : "10099245842",\n' +
        '      "menuName" : "设备抢修",\n' +
        '      "parentId" : "10099212607"\n' +
        '   },\n' +
        '   {\n' +
        '      "busiCode" : "ywglLeafYwgk",\n' +
        '      "funcIco" : "",\n' +
        '      "funcUrl" : "pages/despages/projectManage/operationManage.jsp",\n' +
        '      "isLeaf" : "Y",\n' +
        '      "isPop" : "N",\n' +
        '      "menuId" : "10099245843",\n' +
        '      "menuName" : "维修记录",\n' +
        '      "parentId" : "10099212607"\n' +
        '   },\n' +
        '   {\n' +
        '      "busiCode" : "ywglLeafYwgk",\n' +
        '      "funcIco" : "",\n' +
        '      "funcUrl" : "pages/despages/projectManage/operationManage.jsp",\n' +
        '      "isLeaf" : "Y",\n' +
        '      "isPop" : "N",\n' +
        '      "menuId" : "10099245844",\n' +
        '      "menuName" : "缺陷管理",\n' +
        '      "parentId" : "10099212607"\n' +
        '   },\n' +
        '   {\n' +
        '      "busiCode" : "dldfRoot",\n' +
        '      "funcIco" : "icon_dianliangdianfei",\n' +
        '      "funcUrl" : "",\n' +
        '      "isLeaf" : "N",\n' +
        '      "isPop" : "N",\n' +
        '      "menuId" : "10099232905",\n' +
        '      "menuName" : "统计分析",\n' +
        '      "parentId" : "-73"\n' +
        '   },\n' +
        '   {\n' +
        '      "busiCode" : "dldfleafYnqs",\n' +
        '      "funcIco" : "",\n' +
        '      "funcUrl" : "pages/despages/diacrisisAnalyse/khydxw.jsp",\n' +
        '      "isLeaf" : "Y",\n' +
        '      "isPop" : "N",\n' +
        '      "menuId" : "10099232907",\n' +
        '      "menuName" : "设备情况统计分析",\n' +
        '      "parentId" : "10099232905"\n' +
        '   },\n' +
        '   {\n' +
        '      "busiCode" : "dldfLeafRlgl",\n' +
        '      "funcIco" : "",\n' +
        '      "funcUrl" : "pages/despages/zskManage/capacityManage.jsp",\n' +
        '      "isLeaf" : "Y",\n' +
        '      "isPop" : "N",\n' +
        '      "menuId" : "10099241851",\n' +
        '      "menuName" : "监测点统计分析",\n' +
        '      "parentId" : "10099232905"\n' +
        '   },\n' +
        '   {\n' +
        '      "busiCode" : "dldfleafglys",\n' +
        '      "funcIco" : "",\n' +
        '      "funcUrl" : "pages/despages/monitor/powerCounts.jsp",\n' +
        '      "isLeaf" : "Y",\n' +
        '      "isPop" : "N",\n' +
        '      "menuId" : "10099233282",\n' +
        '      "menuName" : "告警统计分析",\n' +
        '      "parentId" : "10099232905"\n' +
        '   },\n' +
        '   {\n' +
        '      "busiCode" : "dldfLeafynrb",\n' +
        '      "funcIco" : "",\n' +
        '      "funcUrl" : "pages/despages/projectManage/dailyEnergyReport.jsp",\n' +
        '      "isLeaf" : "Y",\n' +
        '      "isPop" : "N",\n' +
        '      "menuId" : "10099235523",\n' +
        '      "menuName" : "运维情况分析",\n' +
        '      "parentId" : "10099232905"\n' +
        '   },\n' +
        '{\n' +
        '      "busiCode" : "desssjkroot",\n' +
        '      "funcIco" : "icon_shishijiankong",\n' +
        '      "funcUrl" : "",\n' +
        '      "isLeaf" : "N",\n' +
        '      "isPop" : "N",\n' +
        '      "menuId" : "10099213801",\n' +
        '      "menuName" : "基础档案管理",\n' +
        '      "parentId" : "-73"\n' +
        '   },\n' +
        '   {\n' +
        '      "busiCode" : "GISzl",\n' +
        '      "funcIco" : "",\n' +
        '      "funcUrl" : "pages/despages/monitor/goods_info",\n' +
        '      "isLeaf" : "Y",\n' +
        '      "isPop" : "N",\n' +
        '      "menuId" : "10099214308",\n' +
        '      "menuName" : "采集终端档案管理",\n' +
        '      "parentId" : "10099213801"\n' +
        '   },\n' +
        '   {\n' +
        '      "busiCode" : "desyhbjk",\n' +
        '      "funcIco" : "",\n' +
        '      "funcUrl" : "pages/despages/monitor/userMonitor.jsp",\n' +
        '      "isLeaf" : "Y",\n' +
        '      "isPop" : "N",\n' +
        '      "menuId" : "10099213802",\n' +
        '      "menuName" : "主变档案管理",\n' +
        '      "parentId" : "10099213801"\n' +
        '   },\n' +
        '   {\n' +
        '      "busiCode" : "ynjcleafByq",\n' +
        '      "funcIco" : "",\n' +
        '      "funcUrl" : "pages/despages/diacrisisAnalyse/byqjcfx.jsp",\n' +
        '      "isLeaf" : "Y",\n' +
        '      "isPop" : "N",\n' +
        '      "menuId" : "10099235235",\n' +
        '      "menuName" : "线路档案管理",\n' +
        '      "parentId" : "10099213801"\n' +
        '   },\n' +
        '   {\n' +
        '      "busiCode" : "ynjcleafmx",\n' +
        '      "funcIco" : "",\n' +
        '      "funcUrl" : "pages/despages/monitor/ynjcMx.jsp",\n' +
        '      "isLeaf" : "Y",\n' +
        '      "isPop" : "N",\n' +
        '      "menuId" : "10099232904",\n' +
        '      "menuName" : "电容器档案管理",\n' +
        '      "parentId" : "10099213801"\n' +
        '   },\n' +
        '   {\n' +
        '      "busiCode" : "ynjcleafDnzljc",\n' +
        '      "funcIco" : "",\n' +
        '      "funcUrl" : "pages/despages/electricQuality/bandAnalyse.jsp",\n' +
        '      "isLeaf" : "Y",\n' +
        '      "isPop" : "N",\n' +
        '      "menuId" : "10099236474",\n' +
        '      "menuName" : "母联档案管理",\n' +
        '      "parentId" : "10099213801"\n' +
        '   },\n' +
        '   {\n' +
        '      "busiCode" : "rootyhjk",\n' +
        '      "funcIco" : "",\n' +
        '      "funcUrl" : "pages/despages/monitor/comMonitor.jsp",\n' +
        '      "isLeaf" : "Y",\n' +
        '      "isPop" : "N",\n' +
        '      "menuId" : "10099232603",\n' +
        '      "menuName" : "测点档案管理",\n' +
        '      "parentId" : "10099213801"\n' +
        '   },\n' +
        '{\n' +
        '      "busiCode" : "ynjcleafmx",\n' +
        '      "funcIco" : "",\n' +
        '      "funcUrl" : "pages/despages/monitor/ynjcMx.jsp",\n' +
        '      "isLeaf" : "Y",\n' +
        '      "isPop" : "N",\n' +
        '      "menuId" : "10099232604",\n' +
        '      "menuName" : "电表管理",\n' +
        '      "parentId" : "10099213801"\n' +
        '   },\n' +
        '   {\n' +
        '      "busiCode" : "ynjcleafDnzljc",\n' +
        '      "funcIco" : "",\n' +
        '      "funcUrl" : "pages/despages/electricQuality/bandAnalyse.jsp",\n' +
        '      "isLeaf" : "Y",\n' +
        '      "isPop" : "N",\n' +
        '      "menuId" : "10099232605",\n' +
        '      "menuName" : "终端投运",\n' +
        '      "parentId" : "10099213801"\n' +
        '   },\n' +
        '   {\n' +
        '      "busiCode" : "rootyhjk",\n' +
        '      "funcIco" : "",\n' +
        '      "funcUrl" : "pages/despages/monitor/comMonitor.jsp",\n' +
        '      "isLeaf" : "Y",\n' +
        '      "isPop" : "N",\n' +
        '      "menuId" : "10099232606",\n' +
        '      "menuName" : "终端操作日志",\n' +
        '      "parentId" : "10099213801"\n' +
        '   },\n' +
        '{\n' +
        '      "busiCode" : "ynjcleafmx",\n' +
        '      "funcIco" : "",\n' +
        '      "funcUrl" : "pages/despages/monitor/ynjcMx.jsp",\n' +
        '      "isLeaf" : "Y",\n' +
        '      "isPop" : "N",\n' +
        '      "menuId" : "10099232607",\n' +
        '      "menuName" : "远动装置管理",\n' +
        '      "parentId" : "10099213801"\n' +
        '   },\n' +
        '   {\n' +
        '      "busiCode" : "ynjcleafDnzljc",\n' +
        '      "funcIco" : "",\n' +
        '      "funcUrl" : "pages/despages/electricQuality/bandAnalyse.jsp",\n' +
        '      "isLeaf" : "Y",\n' +
        '      "isPop" : "N",\n' +
        '      "menuId" : "10099232608",\n' +
        '      "menuName" : "智能仪表管理",\n' +
        '      "parentId" : "10099213801"\n' +
        '   },\n' +
        '   {\n' +
        '      "busiCode" : "rootyhjk",\n' +
        '      "funcIco" : "",\n' +
        '      "funcUrl" : "pages/despages/monitor/comMonitor.jsp",\n' +
        '      "isLeaf" : "Y",\n' +
        '      "isPop" : "N",\n' +
        '      "menuId" : "10099232609",\n' +
        '      "menuName" : "温湿度传感器等设备管理",\n' +
        '      "parentId" : "10099213801"\n' +
        '   },\n' +
        '   {\n' +
        '      "busiCode" : "xqxyRoot",\n' +
        '      "funcIco" : "icon_xqxy",\n' +
        '      "funcUrl" : "",\n' +
        '      "isLeaf" : "N",\n' +
        '      "isPop" : "N",\n' +
        '      "menuId" : "10099241303",\n' +
        '      "menuName" : "系统配置",\n' +
        '      "parentId" : "-73"\n' +
        '   },\n' +
        '   {\n' +
        '      "busiCode" : "xqxyLeafXyxgpg",\n' +
        '      "funcIco" : "",\n' +
        '      "funcUrl" : "pages/despages/electricQuality/xyxgpg.jsp",\n' +
        '      "isLeaf" : "Y",\n' +
        '      "isPop" : "N",\n' +
        '      "menuId" : "10099245310",\n' +
        '      "menuName" : "告警模板管理",\n' +
        '      "parentId" : "10099241303"\n' +
        '   },\n' +
        '   {\n' +
        '      "busiCode" : "xqxyLeafXyxgpg",\n' +
        '      "funcIco" : "",\n' +
        '      "funcUrl" : "pages/despages/electricQuality/xyxgpg.jsp",\n' +
        '      "isLeaf" : "Y",\n' +
        '      "isPop" : "N",\n' +
        '      "menuId" : "10099245310",\n' +
        '      "menuName" : "班组管理",\n' +
        '      "parentId" : "10099241303"\n' +
        '   },\n' +
        '   {\n' +
        '      "busiCode" : "xqxyLeafXyxgpg",\n' +
        '      "funcIco" : "",\n' +
        '      "funcUrl" : "pages/despages/electricQuality/xyxgpg.jsp",\n' +
        '      "isLeaf" : "Y",\n' +
        '      "isPop" : "N",\n' +
        '      "menuId" : "10099245310",\n' +
        '      "menuName" : "系统权限管理",\n' +
        '      "parentId" : "10099241303"\n' +
        '   },\n' +
        '   {\n' +
        '      "busiCode" : "xqxyLeafXyxgpg",\n' +
        '      "funcIco" : "",\n' +
        '      "funcUrl" : "pages/despages/electricQuality/xyxgpg.jsp",\n' +
        '      "isLeaf" : "Y",\n' +
        '      "isPop" : "N",\n' +
        '      "menuId" : "10099245311",\n' +
        '      "menuName" : "系统日志管理",\n' +
        '      "parentId" : "10099241303"\n' +
        '   }\n' +
        ']\n' + ")");
    var menulist = "";
    var busiCode = "";
    var index = 0;
    /**
     * 判断是否是首次加载，首次加载时获取“#menu” 中首页导航的内容
     * 再次加载时，要清空上次加载的所有导航内容，并加载首页导航的内容
     */
    if (rindex == 0) {
        firsthtml = $("#menu").html();
    } else {
        $("#menu").empty();
        $("#menu").append(firsthtml);
    }
    rindex++;
    /**
     * 清空上次加载的所有内容，避免重复加载
     */
//		$("#Trendsmenudiv").empty();
    var divs = document.getElementsByTagName("div");
    for (var i = divs.length - 1; i > -1; i--) {
        if (divs[i].id.indexOf('level3') == 0) {
            $("#" + divs[i].id).remove();
        }
    }
    menuIds = [];
    /**
     * 循环判断加载菜单栏，以及菜单栏对应的下拉列表项
     */
    for (var i = 0; i < data.length; i++) {
        if (data[i].isLeaf == 'N') {
            if (data[i].parentId != '0') {
                var relevanceMenuid = data[i].menuId;
                menulist += '<a id="level2' + data[i].menuId + '" class="easyui-menubutton" data-options="iconCls:\'icon-diqu\',size:\'large\',iconAlign:\'top\'"></a>';
                menuIds.push('level2' + data[i].menuId);
                var divlist = '<div id="level3' + data[i].menuId + '" class="menu-manifest" data-options="onClick:menuHandler">';
                for (var n = 0; n < data.length; n++) {
                    if (data[n].parentId == relevanceMenuid) {
                        if (data[n].funcUrl == null) {
                            divlist += '<div id="funcUrl' + n + '&funcId=' + data[n].menuId + '&roleId=' + roleId + '&roleCode=' + roleCode + '" name="' + data[n].busiCode + '" data="' + data[n].isPop + '">' + data[n].menuName + '</div>';
                        }
                        if (busiCode == 'SYSTEM') {
                            /**
                             * 判断是否为系统菜单
                             */
                            // if (data[n].funcUrl.indexOf('?') > -1) {
                            //     divlist += '<div id="' + data[n].funcUrl + '&funcId=' + data[n].menuId + '&roleId=' + roleId + '&roleCode=' + roleCode + '" name="' + data[n].busiCode + '" data="' + data[n].isPop + '">' + data[n].menuName + '</div>';
                            // } else {
                            //     divlist += '<div id="' + data[n].funcUrl + '?funcId=' + data[n].menuId + '&roleId=' + roleId + '&roleCode=' + roleCode + '" name="' + data[n].busiCode + '" data="' + data[n].isPop + '">' + data[n].menuName + '</div>';
                            // }
                            divlist += '<div id="' + data[n].funcUrl + '&funcId=' + data[n].menuId + '&roleId=' + roleId + '&roleCode=' + roleCode + '" name="' + data[n].busiCode + '" data="' + data[n].isPop + '">' + data[n].menuName + '</div>';
                            if (index == 0) {
//										document.getElementById("menu-m1").style.display='none';
                                index++;
                            }
                        } else {
                            // if (data[n].funcUrl.indexOf('?') > -1) {
                            //     divlist += '<div id="' + data[n].funcUrl + '&funcId=' + data[n].menuId + '&roleId=' + roleId + '&roleCode=' + roleCode + '" name="' + data[n].busiCode + '" data="' + data[n].isPop + '">' + data[n].menuName + '</div>';
                            // } else {
                            //     divlist += '<div id="' + data[n].funcUrl + '?funcId=' + data[n].menuId + '&roleId=' + roleId + '&roleCode=' + roleCode + '" name="' + data[n].busiCode + '" data="' + data[n].isPop + '">' + data[n].menuName + '</div>';
                            // }
                            divlist += '<div id="' + data[n].funcUrl + '&funcId=' + data[n].menuId + '&roleId=' + roleId + '&roleCode=' + roleCode + '" name="' + data[n].busiCode + '" data="' + data[n].isPop + '">' + data[n].menuName + '</div>';

                        }
                    }
                }
                divlist += '</div>';
                $("#Trendsmenudiv").append(divlist);
            } else {
                busiCode = data[i].busiCode;

            }
        }
    }
    $("#menu").append(menulist);

    /**                        <a id="menu-m2" href="#" class="easyui-menubutton" data-options="menu:'#mm2',iconCls:'icon-diqu',size:'large'">实时监控
     </a>
     * 动态加载菜单栏的显示样式
     */
    for (var n = 0; n < data.length; n++) {
        if (data[n].isLeaf == 'N') {
            if (data[n].parentId != 0) {
                if (data[n].funcIco == '') {
                    $('#level2' + data[n].menuId).menubutton({
                        iconCls: 'icon-diqu',
                        text: data[n].menuName,
                        size: 'large',
                        menu: '#level3' + data[n].menuId
                    });
                } else {
                    $('#level2' + data[n].menuId).menubutton({
                        iconCls: data[n].funcIco,
                        text: data[n].menuName,
                        size: 'large',
                        menu: '#level3' + data[n].menuId
                    });
                }
            }
        }
    }
    menuResize(-1);
}

function menuResize(type) {
    var menuParent = $('#menuPanel');

    var menuPwidth = menuParent.width() - 60;

    $('#menuParent').width(menuPwidth);

    var menu = document.getElementById("menu");
    var menuP = document.getElementById("menuParent");

    if (type == -1) {//首次加载
        document.getElementById("leftButton").style.display = 'none';
        document.getElementById("rightButton").style.display = 'none';
        if (menuPwidth < menu.clientWidth) {
            document.getElementById("rightButton").style.display = '';
        }
    } else {//窗口大小调整
        var sLeft = menuP.scrollLeft;
        var sWidth = menuP.scrollWidth;
        if (sLeft <= 0) {
            document.getElementById("leftButton").style.display = 'none';
        } else {
            document.getElementById("leftButton").style.display = '';
        }
        if ($('#menuParent').width() + sLeft < sWidth) {
            document.getElementById("rightButton").style.display = '';
        } else {
            document.getElementById("rightButton").style.display = 'none';
        }
    }
}

function resize(type) {
//	var menuParent = $('#menuPanel');
//	if (menuParent.width() > 800){
////		alert(menuParent.width());
//	}

//	var mc = parseInt((document.body.clientWidth - 550)/100);
//	var menu = document.querySelector(".main-menu-panel");
//	
//	if (window.screen.width === 1400){
//		menu.style.width = (document.body.clientWidth - 650) + 'px';
//	}else{
//		menu.style.width = mc * 100 + 'px';
//	}

    /*if(type==1){//首次加载
        document.getElementById("leftButton").style.display='none';
        document.getElementById("rightButton").style.display='none';
        if(menuIds.length > mc){
            document.getElementById("rightButton").style.display='';}
//		}else{
//			document.getElementById("rightButton").style.display='block$';
//		}
    }else{//窗口大小调整
        var sLeft = menu.scrollLeft;
        var sWidth = menu.scrollWidth;
        if(sLeft <= 0){
            document.getElementById("leftButton").style.display='none';
        }else{
            document.getElementById("leftButton").style.display='';
        }
        if(parseInt(menu.style.width) + sLeft  < sWidth){
            document.getElementById("rightButton").style.display='';
        }else{
            document.getElementById("rightButton").style.display='none';
        }
    }*/
}

function menumove(type) {
    var menu = document.getElementById("menu");//查出元素
    var menuP = document.getElementById("menuParent");
    var sLeft = menuP.scrollLeft;//获取横向滚动条的位置
    var sWidth = menuP.scrollWidth;//滚动条靠右
    if (type == 1) {//左边按钮动作
        if (sLeft > 0) {
            $(menuP).animate({scrollLeft: (sLeft - 80) + 'px'}, "fast");
            if (sLeft - 80 <= 0) {
                document.getElementById("leftButton").style.display = 'none';
            }
            if ($('#menuParent').width() + sLeft - 80 < sWidth) {
                document.getElementById("rightButton").style.display = '';
            }
        }
    } else if (type == 2) {//右边按钮动作
        if (sLeft < sWidth) {
            $(menuP).animate({scrollLeft: (sLeft + 80) + 'px'}, "fast");
            if (sLeft + 80 > 0) {
                document.getElementById("leftButton").style.display = '';
            }
            if ($('#menuParent').width() + sLeft + 80 >= sWidth) {
                document.getElementById("rightButton").style.display = 'none';
            }
        }
    }
}

/**
 * 动态加载菜单栏
 */
function selectMenu() {
debugger;
    var data = eval("(" + '[{"busiCode":"BASEAPP","funcIco":"","funcUrl":"","isLeaf":"N","isPop":"N","menuId":"-73","menuName":"基本应用","parentId":"0"},{"busiCode":"desssjkroot","funcIco":"icon_shishijiankong","funcUrl":"","isLeaf":"N","isPop":"N","menuId":"10099213801","menuName":"实时监测","parentId":"-73"},{"busiCode":"GISzl","funcIco":"","funcUrl":"pages\\/despages\\/monitor\\/GISZongLan.jsp","isLeaf":"Y","isPop":"N","menuId":"10099214308","menuName":"GIS总览","parentId":"10099213801"},{"busiCode":"desyhbjk","funcIco":"","funcUrl":"pages\\/despages\\/monitor\\/userMonitor.jsp","isLeaf":"Y","isPop":"N","menuId":"10099213802","menuName":"一次图监控","parentId":"10099213801"},{"busiCode":"ynjcleafByq","funcIco":"","funcUrl":"pages\\/despages\\/diacrisisAnalyse\\/byqjcfx.jsp","isLeaf":"Y","isPop":"N","menuId":"10099235235","menuName":"变压器监测","parentId":"10099213801"},{"busiCode":"ynjcleafmx","funcIco":"","funcUrl":"pages\\/despages\\/monitor\\/ynjcMx.jsp","isLeaf":"Y","isPop":"N","menuId":"10099232904","menuName":"母线电压监测","parentId":"10099213801"},{"busiCode":"ynjcleafDnzljc","funcIco":"","funcUrl":"pages\\/despages\\/electricQuality\\/bandAnalyse.jsp","isLeaf":"Y","isPop":"N","menuId":"10099236474","menuName":"电能质量监测","parentId":"10099213801"},{"busiCode":"rootyhjk","funcIco":"","funcUrl":"pages\\/despages\\/monitor\\/comMonitor.jsp","isLeaf":"Y","isPop":"N","menuId":"10099232603","menuName":"客户总览","parentId":"10099213801"},{"busiCode":"zdfxroot","funcIco":"icon_yongnengfenxi","funcUrl":"","isLeaf":"N","isPop":"N","menuId":"10099229909","menuName":"能效分析","parentId":"-73"},{"busiCode":"byqleaf","funcIco":"","funcUrl":"pages\\/despages\\/diacrisisAnalyse\\/byqzdfx.jsp","isLeaf":"Y","isPop":"N","menuId":"10099229911","menuName":"变压器","parentId":"10099229909"},{"busiCode":"ynfxLeafDjxt","funcIco":"","funcUrl":"pages\\/despages\\/diacrisisAnalyse\\/djjcfx.jsp","isLeaf":"Y","isPop":"N","menuId":"10099244991","menuName":"电机系统","parentId":"10099229909"},{"busiCode":"ynfxLeafZmxt","funcIco":"","funcUrl":"pages\\/despages\\/electricQuality\\/zmsb.jsp","isLeaf":"Y","isPop":"N","menuId":"10099240701","menuName":"照明系统","parentId":"10099229909"},{"busiCode":"ynfxLeafKtxt","funcIco":"","funcUrl":"pages\\/despages\\/electricQuality\\/fgktxt.jsp","isLeaf":"Y","isPop":"N","menuId":"10099238249","menuName":"空调系统","parentId":"10099229909"},{"busiCode":"ynpgRoot","funcIco":"icon_ynpg","funcUrl":"","isLeaf":"N","isPop":"N","menuId":"10099238418","menuName":"用能评估","parentId":"-73"},{"busiCode":"ynpgLeafYnpm","funcIco":"","funcUrl":"pages\\/despages\\/diacrisisAnalyse\\/ynpmfx.jsp","isLeaf":"Y","isPop":"N","menuId":"10099240091","menuName":"用能排名","parentId":"10099238418"},{"busiCode":"ynpgLeafScxynpg","funcIco":"","funcUrl":"pages\\/despages\\/electricQuality\\/productionLine.jsp","isLeaf":"Y","isPop":"N","menuId":"10099240698","menuName":"生产线用能评估","parentId":"10099238418"},{"busiCode":"ynpgLeafCjynpg","funcIco":"","funcUrl":"pages\\/despages\\/electricQuality\\/workshopEnergy.jsp","isLeaf":"Y","isPop":"N","menuId":"10099240296","menuName":"车间用能评估","parentId":"10099238418"},{"busiCode":"ynpgLeafBcynpg","funcIco":"","funcUrl":"pages\\/despages\\/electricQuality\\/bcynpg.jsp","isLeaf":"Y","isPop":"N","menuId":"10099239587","menuName":"班次用能评估","parentId":"10099238418"},{"busiCode":"desHyfx","funcIco":"icon_hyfx","funcUrl":"","isLeaf":"N","isPop":"N","menuId":"10099259457","menuName":"行业分析","parentId":"-73"},{"busiCode":"desHyyd","funcIco":"","funcUrl":"pages\\/despages\\/electricQuality\\/hyydzst.jsp","isLeaf":"Y","isPop":"N","menuId":"10099259458","menuName":"行业用电","parentId":"10099259457"},{"busiCode":"des_gdyw","funcIco":"icon_gongdanyunwei","funcUrl":"","isLeaf":"N","isPop":"N","menuId":"10099212607","menuName":"运维托管","parentId":"-73"},{"busiCode":"ywglLeafYwgk","funcIco":"","funcUrl":"pages\\/despages\\/projectManage\\/operationManage.jsp","isLeaf":"Y","isPop":"N","menuId":"10099245838","menuName":"运维概况","parentId":"10099212607"},{"busiCode":"dldfRoot","funcIco":"icon_dianliangdianfei","funcUrl":"","isLeaf":"N","isPop":"N","menuId":"10099232905","menuName":"用能分析","parentId":"-73"},{"busiCode":"dldfleafYnqs","funcIco":"","funcUrl":"pages\\/despages\\/diacrisisAnalyse\\/khydxw.jsp","isLeaf":"Y","isPop":"N","menuId":"10099232907","menuName":"电量负荷分析","parentId":"10099232905"},{"busiCode":"dldfLeafRlgl","funcIco":"","funcUrl":"pages\\/despages\\/zskManage\\/capacityManage.jsp","isLeaf":"Y","isPop":"N","menuId":"10099241851","menuName":"容量分析","parentId":"10099232905"},{"busiCode":"dldfleafglys","funcIco":"","funcUrl":"pages\\/despages\\/monitor\\/powerCounts.jsp","isLeaf":"Y","isPop":"N","menuId":"10099233282","menuName":"功率因数分析","parentId":"10099232905"},{"busiCode":"dldfLeafynrb","funcIco":"","funcUrl":"pages\\/despages\\/projectManage\\/dailyEnergyReport.jsp","isLeaf":"Y","isPop":"N","menuId":"10099235523","menuName":"用能报表","parentId":"10099232905"},{"busiCode":"xqxyRoot","funcIco":"icon_xqxy","funcUrl":"","isLeaf":"N","isPop":"N","menuId":"10099241303","menuName":"需求响应","parentId":"-73"},{"busiCode":"xqxyLeafXyxgpg","funcIco":"","funcUrl":"pages\\/despages\\/electricQuality\\/xyxgpg.jsp","isLeaf":"Y","isPop":"N","menuId":"10099245310","menuName":"响应效果评估","parentId":"10099241303"},{"busiCode":"des_ywh","funcIco":"icon_danganguanli","funcUrl":"","isLeaf":"N","isPop":"N","menuId":"10099212113","menuName":"档案管理","parentId":"-73"},{"busiCode":"des_yhbsjzs","funcIco":"","funcUrl":"\\/areaEnergy\\/queryUserSubstation.action","isLeaf":"Y","isPop":"N","menuId":"10099213880","menuName":"采集数据展示","parentId":"10099212113"}] ' + ")");
    var menulist = "";
    var busiCode = "";
    var index = 0;
    /**
     * 判断是否是首次加载，首次加载时获取“#menu” 中首页导航的内容
     * 再次加载时，要清空上次加载的所有导航内容，并加载首页导航的内容
     */
    if (rindex == 0) {
        firsthtml = $("#menu").html();
    } else {
        $("#menu").empty();
        $("#menu").append(firsthtml);
    }
    rindex++;
    /**
     * 清空上次加载的所有内容，避免重复加载
     */
//		$("#Trendsmenudiv").empty();
    var divs = document.getElementsByTagName("div");
    for (var i = divs.length - 1; i > -1; i--) {
        if (divs[i].id.indexOf('level3') == 0) {
            $("#" + divs[i].id).remove();
        }
    }
    menuIds = [];
    /**
     * 循环判断加载菜单栏，以及菜单栏对应的下拉列表项
     */
    for (var i = 0; i < data.length; i++) {
        if (data[i].isLeaf == 'N') {
            if (data[i].parentId != '0') {
                var relevanceMenuid = data[i].menuId;
                menulist += '<a id="level2' + data[i].menuId + '" class="easyui-menubutton" data-options="iconCls:\'icon-diqu\',size:\'large\',iconAlign:\'top\'"></a>';
                menuIds.push('level2' + data[i].menuId);
                var divlist = '<div id="level3' + data[i].menuId + '" class="menu-manifest" data-options="onClick:menuHandler">';
                for (var n = 0; n < data.length; n++) {
                    if (data[n].parentId == relevanceMenuid) {
                        if (data[n].funcUrl == null) {
                            divlist += '<div id="funcUrl' + n + '&funcId=' + data[n].menuId + '&roleId=' + roleId + '&roleCode=' + roleCode + '" name="' + data[n].busiCode + '" data="' + data[n].isPop + '">' + data[n].menuName + '</div>';
                        }
                        if (busiCode == 'SYSTEM') {
                            /**
                             * 判断是否为系统菜单
                             */
                            // if (data[n].funcUrl.indexOf('?') > -1) {
                            //     divlist += '<div id="' + data[n].funcUrl + '&funcId=' + data[n].menuId + '&roleId=' + roleId + '&roleCode=' + roleCode + '" name="' + data[n].busiCode + '" data="' + data[n].isPop + '">' + data[n].menuName + '</div>';
                            // } else {
                            //     divlist += '<div id="' + data[n].funcUrl + '?funcId=' + data[n].menuId + '&roleId=' + roleId + '&roleCode=' + roleCode + '" name="' + data[n].busiCode + '" data="' + data[n].isPop + '">' + data[n].menuName + '</div>';
                            // }
                                divlist += '<div id="' + data[n].funcUrl + '&funcId=' + data[n].menuId + '&roleId=' + roleId + '&roleCode=' + roleCode + '" name="' + data[n].busiCode + '" data="' + data[n].isPop + '">' + data[n].menuName + '</div>';
                            if (index == 0) {
//										document.getElementById("menu-m1").style.display='none';
                                index++;
                            }
                        } else {
                            // if (data[n].funcUrl.indexOf('?') > -1) {
                            //     divlist += '<div id="' + data[n].funcUrl + '&funcId=' + data[n].menuId + '&roleId=' + roleId + '&roleCode=' + roleCode + '" name="' + data[n].busiCode + '" data="' + data[n].isPop + '">' + data[n].menuName + '</div>';
                            // } else {
                            //     divlist += '<div id="' + data[n].funcUrl + '?funcId=' + data[n].menuId + '&roleId=' + roleId + '&roleCode=' + roleCode + '" name="' + data[n].busiCode + '" data="' + data[n].isPop + '">' + data[n].menuName + '</div>';
                            // }
                            divlist += '<div id="' + data[n].funcUrl + '&funcId=' + data[n].menuId + '&roleId=' + roleId + '&roleCode=' + roleCode + '" name="' + data[n].busiCode + '" data="' + data[n].isPop + '">' + data[n].menuName + '</div>';

                        }
                    }
                }
                divlist += '</div>';
                $("#Trendsmenudiv").append(divlist);
            } else {
                busiCode = data[i].busiCode;

            }
        }
    }
    $("#menu").append(menulist);

    /**                        <a id="menu-m2" href="#" class="easyui-menubutton" data-options="menu:'#mm2',iconCls:'icon-diqu',size:'large'">实时监控
     </a>
     * 动态加载菜单栏的显示样式
     */
    for (var n = 0; n < data.length; n++) {
        if (data[n].isLeaf == 'N') {
            if (data[n].parentId != 0) {
                if (data[n].funcIco == '') {
                    $('#level2' + data[n].menuId).menubutton({
                        iconCls: 'icon-diqu',
                        text: data[n].menuName,
                        size: 'large',
                        menu: '#level3' + data[n].menuId
                    });
                } else {
                    $('#level2' + data[n].menuId).menubutton({
                        iconCls: data[n].funcIco,
                        text: data[n].menuName,
                        size: 'large',
                        menu: '#level3' + data[n].menuId
                    });
                }
            }
        }
    }
    menuResize(-1);
}

var clearTimeoutFlag;//临时变量  
/**
 *  下拉框的选择事件
 */
function getCom(id) {
    debugger;
    if (roleId != '') {//roleid 元素是否存在
        clearTimeout(clearTimeoutFlag);
        if (shuzhi != roleId || shuzhi == null) {
            closePage();
            //	rolename=$('#' + id).find("option:selected").text();
            //	roleId=$('#' + id).val();
            selectMenu(roleId);
            judgeFirstpagecontent();
            divcss();
            firstpage();
        }
    } else {//刷新
        clearTimeout(clearTimeoutFlag);//清除setTimeout
        clearTimeoutFlag = setTimeout(function () {//等待50毫秒之后再次判断
            return getCom(id);
        }, 50);//等待300毫秒之后再次判断
    }
}

/**
 * 重新加载tab页
 */
function closePage() {
    if (shuzhi != roleId || shuzhi == null) {
        $('#new-tab-main').empty();

        $('#new-tab-main').append('<div class="jinyuan-label"><span id="systemTime" class="time-text"></span><span  class="line-text" ></span><span id="dqName" class="jinyuan-text"></span></div>');
        $('#new-tab-main').append('<div id="tab-main" class="easyui-tabs" data-options="fit:true,border:true"></div>');
        $('#tab-main').tabs({
            fit: true,
            border: false
        });
        $('#dqName').text(areaName);//地区名称
        getSysDate();
        shuzhi = roleId;
    }
}


/**
 * 判断加载首页内容
 */
function judgeFirstpagecontent() {
//	if(pagefirst!=''){
//		return;//上面客户登录设置过首页，不需要设置了
//	}
    if (roleId == 0 || rolename.indexOf('管理员') >= 0) {
        pagefirst = '/pages/system/sysSqlLog.jsp?funcId=-11&roleId=0';
    } else if ((roleCodeAll != "CustomerTree") && (roleCodeAll.indexOf("qyny_Customer") == 0)) {
        pagefirst = 'pages/despages/monitor/comMonitor.jsp';
    } else {
        pagefirst = 'pages/despages/showPages/screenPage.jsp';
    }
}

/**
 * 动态切换div的样式,并重新赋值退出链接
 */
function divcss() {

    var maintitlebackgroundimage = {
        position: 'absolute',
        display: 'inline-block',
        top: '20px',
        left: '20px',
        width: '420px',
        height: '46px',
        background: 'url(' + webContextRoot + '/images/main-title.png) no-repeat'
    };
    var maintitlecnbackgroundimage = {
        position: 'absolute',
        display: 'inline-block',
        top: '20px',
        left: '0px',
        width: '420px',
        height: '46px',
        background: 'url(' + webContextRoot + '/images/main-title-cn.png) no-repeat'
    };

//	if(rolename.indexOf('储能并网互动平台')==0){
//		$("#main-title-first").css(maintitlecnbackgroundimage);
//		$("#cnbwhdpt").attr("href","/des/pages/system/login_cn.jsp");
//		
//	}else{
    $("#main-title-first").css(maintitlebackgroundimage);
    $("#cnbwhdpt").attr("href", "/des/pages/system/login_old.jsp");
//	}
};

/**
 * 弹出修改密码框
 */
function updatemmgl() {
    $('#xiugaimima').css('display', 'block');
    $('#mmxg').dialog('open');//弹出界面显示
    $('#mmxg').dialog('setTitle', '密码修改');
    $("#oldpwd").textbox("setValue", '');
    $("#newpwd").textbox("setValue", '');
    $("#affnewpwd").textbox("setValue", '');
    var data = ['newpwdimg1', 'newpwdimg2', 'oldpwdimg1', 'oldpwdimg2', 'affnewpwdimg1', 'affnewpwdimg2'];
    for (var i = 0; i < data.length; i++) {
        $('#' + data[i]).css('display', 'none');
    }
    var date = new Date();
    var endDate = endFromDate(date);
    $('#pwdendtime').datebox('setValue', endDate);
}


/**
 * 修改密码前，数据验证
 */
function updatePassword() {

    var oldpwd = $('#oldpwd').val();
    var newpwd = $('#newpwd').val();
    var affnewpwd = $('#affnewpwd').val();
//	var pwdendtime=$('#pwdendtime').datetimebox('getValue');
    if (oldpwd == '') {
        $.messager.alert('提示', "旧密码为空!", 'warning');
    } else if (newpwd == '') {
        $.messager.alert('提示', "新密码为空!", 'warning');
    } else if (newpwd != affnewpwd) {
        $.messager.alert('提示', "两次密码不一致!", 'warning');
    } else {
        checkingOldpwd();
        /*if(isOldpwd && newpwd == affnewpwd && newpwd !=''){
//			updatepwd(oldpwd,newpwd,pwdendtime); //修改密码   不在这写逻辑
            alert("修改密码测试成功");
        }*/
    }
}

/**
 * 修改密码
 */
function updatepwd(oldpwd, newpwd, pwdendtime) {
    $.ajax({
        url: webContextRoot + 'rendsMenu/updatePassword.action',
        dataType: 'json',
        type: 'post',
        data: {
            'userId': userId,
            'modifyUserinfo.password': oldpwd,
            'modifyUserinfo.newPassword': newpwd,
            'modifyUserinfo.passwordDate': pwdendtime,
        },
        success: function (data) {
            var saveSUCCESS = data.saveSUCCESS;
            if (saveSUCCESS == "true") {
                $.messager.alert('确认', "保存成功！", 'info', function (r) {
                    $('#mmxg').dialog('close');//关闭窗口
                });
            } else {
                $.messager.alert('确认', "保存失败!", 'warning');// 移除失败
            }
        },
        error: function (result) {
            alert('ajax error');
        }
    });
}

/**
 * 判断原始密码是否正确
 *
 */
function checkingOldpwd() {
//	$("#oldpwd").textbox("textbox").blur(function(){
    var oldpwd = $('#oldpwd').val();
    var newpwd = $('#newpwd').val();
    var affnewpwd = $('#affnewpwd').val();
    var pwdendtime = $('#pwdendtime').datetimebox('getValue');
    $.ajax({
        url: webContextRoot + 'rendsMenu/checkingPassword.action',
        dataType: 'json',
        type: 'post',
        data: {
            'userId': userId, //
            'modifyUserinfo.password': oldpwd,
        },
        success: function (data) {
            var saveSUCCESS = data.saveSUCCESS;
            if (saveSUCCESS == "true") {
                isOldpwd = true;
                $('#oldpwdimg1').css('display', 'none');
                $('#oldpwdimg2').css('display', 'block');
                if (isOldpwd && newpwd == affnewpwd && newpwd != '') {
                    updatepwd(oldpwd, newpwd, pwdendtime);
                    //alert("修改密码测试成功");
                }
            } else {
                isOldpwd = false;
                $('#oldpwdimg2').css('display', 'none');
                $('#oldpwdimg1').css('display', 'block');
                $.messager.alert('提示', "旧密码不正确!", 'warning');
            }
        },
        error: function (result) {
            alert('ajax error');
        }
    });
//	});
}


/**
 * 日期格式
 */
function endFromDate(date) {

    var currDate = new Date(date);
    currDate = new Date(currDate.getFullYear(), (currDate.getMonth()) + 1, currDate.getDate(),
        currDate.getHours(), currDate.getMinutes(), currDate.getSeconds());
    var lastdate = FromDate("yyyy-MM-dd", currDate);
//	var lastdate=currDate.add(Date.MONTH,+1).format("Y-m-d");
    return lastdate;

}


/**
 * 帮助窗口
 */
function helpWindows(date) {

    if (helpWindow) {
        helpWindow.close();
    }
    var url = webContextRoot + '/pages/system/help.jsp?itemCode=' + itemCode + '&itemName=' + itemName + '&areaNo=' + areaNo;
    helpWindow = window.open(url, '_blank', 'resizable=no,status=no,scrollbar-x=no,width=900,height=700');


}

helpWindow = null;

function FromDate(formatStr, date) {
    formatStr = arguments[0] || "yyyy-MM-dd HH:mm:ss";
    date = arguments[1] || new Date();
    var str = formatStr;
    var Week = ['日', '一', '二', '三', '四', '五', '六'];
    str = str.replace(/yyyy|YYYY/, date.getFullYear());
    str = str.replace(/yy|YY/, (date.getYear() % 100) > 9 ? (date.getYear() % 100).toString() : '0' + (date.getYear() % 100));
    str = str.replace(/MM/, date.getMonth() > 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1));
    str = str.replace(/M/g, date.getMonth());
    str = str.replace(/w|W/g, Week[date.getDay()]);

    str = str.replace(/dd|DD/, date.getDate() > 9 ? date.getDate().toString() : '0' + date.getDate());
    str = str.replace(/d|D/g, date.getDate());

    str = str.replace(/hh|HH/, date.getHours() > 9 ? date.getHours().toString() : '0' + date.getHours());
    str = str.replace(/h|H/g, date.getHours());
    str = str.replace(/mm/, date.getMinutes() > 9 ? date.getMinutes().toString() : '0' + date.getMinutes());
    str = str.replace(/m/g, date.getMinutes());

    str = str.replace(/ss|SS/, date.getSeconds() > 9 ? date.getSeconds().toString() : '0' + date.getSeconds());
    str = str.replace(/s|S/g, date.getSeconds());

    return str;
}


var panelArr = [];

function newNotice() {//新闻公告提示
    $.get(webContextRoot + 'notice/selectCeInfoNews.action',
        {
            'newUserModel.usrId': loginUserId
        },
        function (data) {
            rs = eval("(" + data + ")");//转换成object
            var newlength = rs.length;//新的消息数量
//				clearTimeout(clearTimeoutFlag);
            var shownText = "";
//		 	   var ssi = setTimeout(function () {

//			   

            for (var k = 0; k < newlength; k++) {
                shownText = rs[k].newsTypeName + ":";
                shownText += rs[k].newsName;

                var options = {
                    containerDom: document.getElementById('tip-panel-container'),
                    width: 400,
                    panelTitle: '新闻公告',
                    panelContent: '<p style="margin: 20px auto;height: 40px;"><a style="color:blue;" href="#" onclick="queryNewsDes(' + rs[k].newsId + ',' + rs[k].usrId + ',' + k + ')">' + shownText + '</a></p>'
                    + '<div style="margin-top:-5px;float:right;margin-right:2px;cursor: pointer;" class="closeNews"">标记已读</div>'
                };
                var panel = new newsPanel(options, rs[k].newsId, rs[k].usrId, k);
                panel.open();
                panelArr.push(panel);
            }
        });
}


function newsPanel(options, newsId, usrId, k) {
    this.containerDom = options.containerDom;
    this.waitTime = options.waitTime;
    this.runTime = 0;
    this.isEnterPanel = false;
    this.state = "close";
    this.width = options.width ? options.width : 300;
    this.height = options.height ? options.height : 'auto';
    this.panelType = options.panelType ? options.panelType : "normal";
    this.panelTitle = options.panelTitle ? options.panelTitle : "提示";
    this.panelContent = options.panelContent ? options.panelContent : "";
    this.panelDom = document.createElement("div");
    this.panelDom.setAttribute('class', getPanelTypeClass(this.panelType));
    this.panelDom.style.display = 'none';
    this.panelDom.style.width = this.width + "px";
    if (this.height != 'auto') {
        this.panelDom.style.height = this.height + "px";
    }
    var self = this;
    var innerStr = '';
    innerStr += "<div class='title'><span>" + this.panelTitle + "</span><span class='close'>×</span></div>";
    innerStr += "<div class='content'>";
    innerStr += this.panelContent;
    innerStr += "</div>";
    this.panelDom.innerHTML = innerStr;
    var close_element = this.panelDom.querySelector(".close");
    var closeNewsDes = this.panelDom.querySelector(".closeNews");
    close_element.onclick = function () {
        self.close();
//        closeNewsDes(newsId,usrId,k);
    };
    closeNewsDes.onclick = function () {
        self.close();
        closeNews(newsId, usrId, k);
    };

    function getPanelTypeClass(type) {
        var rValue;
        switch (type) {
            case 'normal':
                rValue = 'tip-panel';
                break;
            case 'warning':
                rValue = 'tip-panel warning';
                break;
        }

        return rValue;
    }
}

newsPanel.prototype.open = function () {
    if (this.state != "close") return;
    var self = this;

    self.state = "open";
    if (this.panelDom.parentNode == null) {
        $(self.panelDom).mouseenter(function () {
            self.isEnterPanel = true;
            self.runTime = 0;
        });
        $(self.panelDom).mouseleave(function () {
            self.isEnterPanel = false;
        });
        self.containerDom.appendChild(self.panelDom);
    }
    $(self.panelDom).fadeIn('slow');
    var si = setInterval(function () {
        if (!self.isEnterPanel) {
            self.runTime += 1000;
            if (self.waitTime != null) {
                if (self.runTime >= self.waitTime) {
                    clearInterval(si);
                    self.close();
                }
            }
        }
    }, 1000);
};

newsPanel.prototype.close = function () {
    this.state = "close";
    $(this.panelDom).fadeOut('slow');
};

function closeNews(newsId, usrId, panelKey) {
    //修改新闻状态
    $.getJSON(webContextRoot + 'notice/updateCeInfoNews.action',
        {
            'newUserModel.newsId': newsId,
            'newUserModel.usrId': usrId,
            'newUserModel.ifSee': 1
        },
        function (json) {
            if (json.saveSUCCESS == "false") {
                $.messager.alert('确认', "新闻查看状态修改失败！", 'warning');//移除失败
            }

        }
    );
}

//点击进入新闻
function queryNewsDes(newsId, usrId, panelKey) {

    //修改新闻状态
    $.getJSON(webContextRoot + 'notice/updateCeInfoNews.action',
        {
            'newUserModel.newsId': newsId,
            'newUserModel.usrId': usrId,
            'newUserModel.ifSee': 1
        },
        function (json) {
            if (json.saveSUCCESS == "false") {
                $.messager.alert('确认', "新闻查看状态修改失败！", 'warning');//移除失败
            }

        }
    );


    var content = "<iframe src='" + webContextRoot + "pages/despages/warn/newsNoticePop.jsp?newsId=" + newsId + "' width='100%' height='99%' frameborder='0' scrolling='yes'/>";
    var boarddiv = "<div id='msgwindow' title='详情'/>";
    $(document.body).append(boarddiv);
    var win = $("#msgwindow").dialog({
        content: content,
        width: document.body.clientWidth - 160,
        height: document.body.clientHeight - 160,
        maximizable: true,
        closable: true,
        modal: 'shadow',
        title: '新闻信息',
    });
    win.dialog('open');

    for (var i = 0; i < panelArr.length; i++) {
        if (i == panelKey) {
            panelArr[i].close();
            break;
        }
    }
}

function queryWeatherData() {
    $.post(webContextRoot + 'pCode/queryWeatherData.action', {},
        function (data) {
            if (data != null && data.length > 0) {
                var weather_text = '';
                var weather_img = '';
                if (data[0].TEMPERATURE_NAME != '') {
//						if (data[0].TEMPERATURE_NAME == "雷阵雨伴有冰雹") {
//							weather_text = "雨伴冰雹";
//						} else if (data[0].TEMPERATURE_NAME == "小雨-中雨") {
//							weather_text = "中雨";
//						} else if (data[0].TEMPERATURE_NAME == "中雨-大雨") {
//							weather_text = "大雨";
//						} else if (data[0].TEMPERATURE_NAME == "大雨-暴雨") {
//							weather_text = "暴雨";
//						} else if (data[0].TEMPERATURE_NAME == "暴雨-大暴雨") {
//							weather_text = "大暴雨";
//						} else if (data[0].TEMPERATURE_NAME == "大暴雨-特大暴雨") {
//							weather_text = "特大暴雨";
//						} else if (data[0].TEMPERATURE_NAME == "小雪-中雪") {
//							weather_text = "中雪";
//						} else if (data[0].TEMPERATURE_NAME == "中雪-大雪") {
//							weather_text = "大雪";
//						} else if (data[0].TEMPERATURE_NAME == "大雪-暴雪") {
//							weather_text = "暴雪";
//						} else {
                    weather_text = data[0].TEMPERATURE_NAME;
//						}
                }

                // 天气图标
                if (data[0].NIGHT_FLAG == 1) {
                    switch (weather_text) {
                        case '晴':
                            weather_img = 'weather_n00.png';
                            break;
                        case '多云':
                            weather_img = 'weather_n01.png';
                            break;
                        case '阵雨':
                            weather_img = 'weather_n02.png';
                            break;
                        case '阵雪':
                            weather_img = 'weather_n03.png';
                            break;
                    }
                } else {
                    switch (weather_text) {
                        case '晴':
                            weather_img = 'weather_d00.png';
                            break;
                        case '多云':
                            weather_img = 'weather_d01.png';
                            break;
                        case '阴':
                            weather_img = 'weather_d02.png';
                            break;
                        case '阵雨':
                            weather_img = 'weather_d03.png';
                            break;
                        case '雷阵雨':
                            weather_img = 'weather_d04.png';
                            break;
                        case '雷阵雨伴有冰雹':
                            weather_img = 'weather_d05.png';
                            break;
                        case '雨夹雪':
                            weather_img = 'weather_d06.png';
                            break;
                        case '小雨':
                            weather_img = 'weather_d07.png';
                            break;
                        case '中雨':
                        case '小雨-中雨':
                            weather_img = 'weather_d08.png';
                            break;
                        case '大雨':
                        case '中雨-大雨':
                            weather_img = 'weather_d09.png';
                            break;
                        case '暴雨':
                        case '大雨-暴雨':
                            weather_img = 'weather_d10.png';
                            break;
                        case '大暴雨':
                        case '暴雨-大暴雨':
                            weather_img = 'weather_d11.png';
                            break;
                        case '特大暴雨':
                        case '大暴雨-特大暴雨':
                            weather_img = 'weather_d12.png';
                            break;
                        case '阵雪':
                            weather_img = 'weather_d13.png';
                            break;
                        case '小雪':
                            weather_img = 'weather_d14.png';
                            break;
                        case '中雪':
                        case '小雪-中雪':
                            weather_img = 'weather_d15.png';
                            break;
                        case '大雪':
                        case '中雪-大雪':
                            weather_img = 'weather_d16.png';
                            break;
                        case '暴雪':
                        case '大雪-暴雪':
                            weather_img = 'weather_d17.png';
                            break;
                        case '雾':
                            weather_img = 'weather_d18.png';
                            break;
                        case '冻雨':
                            weather_img = 'weather_d19.png';
                            break;
                        case '沙尘暴':
                            weather_img = 'weather_d20.png';
                            break;
                        case '浮尘':
                            weather_img = 'weather_d21.png';
                            break;
                        case '扬沙':
                            weather_img = 'weather_d22.png';
                            break;
                        case '强沙尘暴':
                            weather_img = 'weather_d23.png';
                            break;
                        case '霾':
                            weather_img = 'weather_d24.png';
                            break;
                        default:
                            weather_img = 'weather_d00.png';
                    }
                }
                $('#weather_img').attr("src", webContextRoot + '/images/' + weather_img);
                $('#weather_img_show').attr("src", webContextRoot + '/images/' + weather_img);
                // 天气描述
                $('#weather_text').text(weather_text);
                // 风速
                $('#weather_wind').text('风速：' + data[0].WIND_VELOCITY + '级');
                // 温度
                $('#weather_humidity').text(data[0].HUMIDITY);
                // 湿度
                $('#weather_temperature').text(data[0].TEMPERATURE);
                var wea = data[0].TEMPERATURE + '℃ / ' + data[0].HUMIDITY + '%';
                $('#weather').text(wea);

                $('#weather_img_1').attr("src", webContextRoot + '/images/' + weather_img);

                // 天气描述
                /*$('#weather_text_1').text(weather_text);
                // 风速
                $('#weather_wind_1').text('风速：' + data[0].WIND_VELOCITY + '级');
                // 温度
                $('#weather_humidity_1').text(data[0].HUMIDITY);
                // 湿度
                $('#weather_temperature_1').text(data[0].TEMPERATURE);*/


            }
        }, "json");
}

function showWeather() {
    $('#show_weather').css('display', 'block');
    $('#show_xj').css('display', 'block');
}

function hideWeather() {
    $('#show_weather').css('display', 'none');
    $('#show_xj').css('display', 'none');
}