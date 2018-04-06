/**
 * 视频监控
 */

//初始化插件
//var m_iNowChanNo = -1;		//当前通道号
var m_iChannels = [];		//模拟通道列表
//var m_iAudioChannels = [];		//对讲通道列表
//var m_maxWndType = 8;		//分屏数
var m_streamType = 1;		//码流类型 1.主码流  2.子码流  3.第三码流  4.转码码流
var m_roomMap = {};		//ip port admin  password
//var m_channelsCount=2;	//该变量为控制分屏数（如：1=1*1,2=2*2...）
//通道序号
var tdNum = null;
//验证是否登录过
var is_login = null;
// 全局保存当前选中窗口
var g_iWndIndex = 0; //可以不用设置这个变量，有窗口参数的接口中，不用传值，开发包会默认使用当前选择窗口
//默认时间
var currentdate = new Date();
//alert(date.toLocaleDateString());
var datetime = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('d',-1,currentdate));
//var datetime = DateUtil.dateAdd('d',-1,currentdate);
//alert(datetime);

//视频服务器类型  1.大华 2.海康
var videoType = null;
//大华视频服务器
var g_ocx;
//大华视频插件名称
var PLUGINS_NAME = 'WebActiveEXE.Plugin.1';
//大华视频是否在ie上有插件
var hasPlugin = null;

var redioFlag = false;

$(function(){
	$('#starttime').datebox('setValue',datetime);
	//加载视频监控
	
		//视频树
		$('#shipingshu').tree({
			 url:webContextRoot +'destree/querySpTree.action?id='+consId,
		     method:'get',
		     multiple:false,//是否支持多选
		     editable:'true' ,
		     onBeforeLoad:function(node){//请求之前
		    	 var treeNodeType = null;
				 if(node){//点击节点
					 //alert("onBeforeLoad=="+JSON.stringify(node));
					 treeNodeType = node.type;//获取节点类型
					 $('#shipingshu').tree('options').url=webContextRoot +'destree/querySpTree.action?treeNodeType='+treeNodeType;//带参数地址
					 if(treeNodeType == '3' && is_login != -1){
						 //视频服务器类型
						 videoType = node.company;
						 //videoType = '1';
						 m_roomMap = {
								 DVR_IP : node.ip,
								 DVR_PORT : node.port,
								 DVR_USERNAME : node.loginName,
								 DVR_PASSWORD : node.loginPass
						    }
						 if(videoType == '1'){//大华视频
							//大华视频是否在ie上有插件
							hasPlugin = checkPlugins();
							//是否有插件
							if (!hasPlugin){
								alert("请先下载大华视频插件，安装过后重启浏览器！");
								//没有插件显示提示下载信息
								//$('#login_btn_install_dh').attr("src",null);
								//$('#login_btn_install_dh').attr("src",webContextRoot+'pages/despages/common/video/webplugin.exe');
								showInstallDialog();
								//大华下载
								$('#login_btn_install_dh').show();
								//海康下载
								$('#login_btn_install_hk').hide();
							}else{
								//隐藏提示信息
								hideInstallDialog();
								//加载视频插件
								loadPageOcx();
								//海康视频插件隐藏
								$('#divPlugin').hide();
								//大华视频插件显示
								$('#f_ocx').show();
								//大华登录
								LoginDevice(m_roomMap);
							}
							
							/*//延迟执行分屏
							setTimeout(function(){
								g_ocx.SetWinBindedChannel(4, 0, 63,64);
							},100);*/
							
						 }else if(videoType == '2'){//海康视频
							//校验海康视频是否在filefox上有插件
							hkcheckPlugin();
							//海康登录
							clickLogin(m_roomMap);
							
						 }
						 
					 }
					 
				 }
			 },
			 onClick:function(node){
				 //alert("node.ip=="+node.ip);
				 //获取当前节点
				 treeNodeType = node.type;
				 //alert("onClick=="+treeNodeType);
				 if(treeNodeType == '1'){
					 //$.messager.alert('提示','请选择用户变或服务器','warning');
					 //return;
				 }else if(treeNodeType == '2'){//用户变
					 //$.messager.alert('提示','请选择服务器','warning');
					 //return;
				 }else if(treeNodeType == '3'){//视频服务器
					 //alert("m_roomMap=="+m_roomMap.DVR_IP);
					 //视频服务器类型
					 videoType = node.company;
					 if(videoType == '1'){//大华视频
						//海康视频插件隐藏
						$('#divPlugin').hide();
						//大华视频插件显示
						$('#f_ocx').show();
						//大华登录
						LoginDevice(m_roomMap);
					 }else if(videoType == '2'){//海康视频
						//大华视频插件显示
						$('#f_ocx').hide();
						//海康视频插件隐藏
						$('#divPlugin').show();
						 //验证是否登录过
						 if(is_login == -1){
							 //验证当前IP和之前所选择的IP是否一致
							 if(m_roomMap.DVR_IP != '' && m_roomMap.DVR_IP != node.ip){
								 //退出
								//alert("退出");
								clickLogout(m_roomMap);
								//重新获取服务器IP
								 m_roomMap = {
									DVR_IP : node.ip,
									DVR_PORT : node.port,
									DVR_USERNAME : node.loginName,
									DVR_PASSWORD : node.loginPass
								 };
								 //重新登录
								 clickLogin(m_roomMap);
							 }else{
								 //直接获取设备信息
								 clickGetDeviceInfo(m_roomMap.DVR_IP);
							 }
						 }else{//没有登录过
							 //获取服务器IP
							 m_roomMap = {
								DVR_IP : node.ip,
								DVR_PORT : node.port,
								DVR_USERNAME : node.loginName,
								DVR_PASSWORD : node.loginPass
							 };
							 //登录
							 clickLogin(m_roomMap);
						 }
					 }
						 
				 }else if(treeNodeType == '4'){//摄像头
					 tdNum = node.channel;//当前通道
					 if(videoType == '1'){//大华视频
						 RealPlay();
					 }else if(videoType == '2'){//海康视频
						 if (-1 == is_login) {//已登陆
							 //直接预览
							 clickStartRealPlay();
						 }else{
							 //重新登录
							 is_login = WebVideoCtrl.I_Login(m_roomMap.DVR_IP, 1, m_roomMap.DVR_PORT, m_roomMap.DVR_USERNAME, m_roomMap.DVR_PASSWORD, {
								 success: function (xmlDoc) {
									 is_login = -1;
									 //登录过后预览
									 clickStartRealPlay();
								 },
								 error: function () {
									 alert(" 视频连接失败！");
								 }
							 });
						  }
					 }
					 
				  }
			  }
		 });
	
	
	
	
	//双滑块功能初始化
    $('.range-slider').jRange({
        from: 0,//开始于
        to: 24,//结束于
        step: 1 / 60,//一次滑动多少
        scale: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,24],//滑动条下方的标签组（24小时）
        format: '%s',//格式化格式 字符串
        width: 600,//宽度
        showLabels: true,//是否显示滑动条下方的尺寸标签
        showScale: true,//是否显示滑块上方的数值标签
        isRange: true//是否显示区间
    });

    //   $('.range-slider').jRange('setValue', '10.2,15.8');//给双滑块赋值

    //给已经选中过的地方加颜色
    /*$(".slider-container .back-bar").append('<div class="selected-default-l"></div>');//增加默认选中地方
    $('.selected-default-l').css("left", "10px");

    $(".slider-container .back-bar").append('<div class="selected-default-l s2" ></div>');
    $('.s2').css("left", "600px").css("width", "80px");

    $(".slider-container .back-bar").append('<div class="selected-default-l s3" ></div>');
    $('.s3').css("left", timeToLength("17:20") + "px").css("width", "50px");*/

    //点击获取值的操作
    $("#g2").click(function () {
        var aa = $(".range-slider").val();
        //alert(aa.split(","));
        //alert(aa);
        //starttime = aa.substring(0,5)+":00";
        //endtime = aa.substring(6,11)+":00";
        //alert(aa.substring(0,5)+":00");
        //alert(aa.substring(6,11)+":00");
    });
    
    /**
     * 大华视频初始化
     */
    
	
});

//保留两位
function decimal(num, v) {
    var vv = Math.pow(10, v);
    return Math.round(num * vv) / vv;
}

//分钟保留两位
function PrefixInteger(num, length) {
    return (Array(length).join('0') + num).slice(-length);
}

//时间转换成标签
function timeToSpan(values) {
    var v1 = values.split(":");
    var v2 = v1[0] + "." + decimal(v1[1] / 60, 2) * 100;
    return v2;
}
//时间转换成控件长度
function timeToLength(values) {
    var v1 = values.split(":");
    //alert(v1[0]+v1[1]);
    var v2 = v1[0] + "." + decimal(v1[1] / 60, 2) * 100;
    var v3 = (720 / 24) * v2;
    return v3;

}

//修改值后操作
function updateLableP(value){
     var startVal=timeToSpan($("#pointer_lable_left").val());
     var endVal=timeToSpan($("#pointer_lable_right").val());
     if(endVal-startVal>=0){
         $('.range-slider').jRange('setValue',startVal+","+endVal);
     }else{
         alert("输入的开始时间不能大于结束时间 or 时间格式错误！！！");
         var oldValueArrs = $(".range-slider").val().split(",");
         $('.range-slider').jRange('setValue',timeToSpan(oldValueArrs[0])+","+timeToSpan(oldValueArrs[1]));
     }
 }

//校验海康插件
function hkcheckPlugin(){
	// 检查插件是否已经安装过
    var iRet = WebVideoCtrl.I_CheckPluginInstall();
	if (-2 == iRet) {
		alert("您的Chrome浏览器版本过高，不支持NPAPI插件！");
		return;
	} else if (-1 == iRet) {
        alert("请先下载海康视频插件,安装过后请重启浏览器！");
        //$('#login_btn_install_hk').attr("src",null);
		//$('#login_btn_install_hk').attr("src",webContextRoot+"pages/despages/common/video/WebComponentsKit.exe");
		showInstallDialog();
		//大华下载
		$('#login_btn_install_dh').hide();
		//海康下载
		$('#login_btn_install_hk').show();
		return;
    }

	// 初始化插件参数及插入插件
	WebVideoCtrl.I_InitPlugin("100%", "100%", {
		bWndFull: true,//是否支持单窗口双击全屏，默认支持 true:支持 false:不支持
        iWndowType: 2,//该变量为控制分屏数（如：1=1*1,2=2*2...）
		cbSelWnd: function (xmlDoc) {
			//当前选择的窗口号
			g_iWndIndex = $(xmlDoc).find("SelectWnd").eq(0).text();
		}
	});
	//大华插件隐藏
	$('#f_ocx').hide();
	//海康插件显示
	$('#divPlugin').show();
	//加载分屏
	WebVideoCtrl.I_InsertOBJECTPlugin("divPlugin");
	// 检查插件是否最新
	if (-1 == WebVideoCtrl.I_CheckPluginVersion()) {
		alert("检测到新的插件版本，双击开发包目录里的WebComponentsKit.exe升级！");
		return;
	}
}

//视频轮循
function lxLoadVideo(){
	var arrIndex =0;//要调用的数组下标
	redioFlag = true;
//	changeWndNum(1);
	var spData = [];
	var nodeData;
	var node = $('#shipingshu').tree('getSelected');
	if(node == null){
		alert("请选择用户服务器！");
		return;
	}else if(node.rootType == null){
		alert("请选择用户服务器！");
		return;
	}else if(node.rootType == '3'){//服务器
		nodeData = node;
	}else if(node.rootType == '4'){//视频端
		nodeData = $('#shipingshu').tree('getParent',node.target);
	}else{
		alert("请选择用户服务器！");
		return 
	}
	if(nodeData.children.length > 0){//校验视频个数不能为空
		for(var i =0;i<nodeData.children.length;i++){
			var sp = new Object();
			sp.ip = nodeData.ip;
			sp.loginName = nodeData.loginName;
			sp.loginPass = nodeData.loginPass;
			sp.port = nodeData.children[i].channel;
			spData.push(sp);
		}
		
		setInterval(function(){
			if(redioFlag == true){
				var newspData = spData[arrIndex];
//				alert(newspData.port+":下标="+arrIndex)
				if(arrIndex == spData.length-1){
					arrIndex =0;
				}
				else{
					arrIndex++;
				}
				if(videoType == '1'){//大华视频
					g_ocx.SetModuleMode(1); //监视模式
					g_ocx.ConnectRealVideo(newspData.port ,1);
					g_ocx.SetWinBindedChannel(1, 0, 63,64);
				}else if(videoType == '2'){//海康视频
					realPlay(newspData.ip, 1, newspData.port, false);
				}
				
			}
		}, 5000);//每间隔5秒
	}else{
		alert("该用户服务器没有视频设备！");
	}
	
}

/*function  getSysDate(spData) {
	var newspData = spData[arrIndex];
    if(arrIndex == spData.length-1){
    	arrIndex =0;
    }
    else{
    	arrIndex++;
    }
    alert(newspData.port+":下标="+arrIndex)
//    realPlay(newspData.ip, 1, newspData.port, false);
//    return newspData;
}*/

//关闭视频轮循
function lxColseVideo(){
	redioFlag = false;
}



//窗口分割数
function changeWndNum(iType) {
	if(videoType == '1'){//大华视频
		iType = parseInt(iType, 10);
		//设置窗口对应的通道号  窗口分割数、窗口ID号、通道最小值、窗口最大值
		g_ocx.SetWinBindedChannel(iType*iType, 0, 63,64);
	}else if(videoType == '2'){//海康视频
		iType = parseInt(iType, 10);
		WebVideoCtrl.I_ChangeWndNum(iType);
	}
	
}

//点击按钮全屏
function clickFullScreen() {
	if(videoType == '1'){
		//大华
		FullScreen();
	}else if(videoType == '2'){
		//海康
		WebVideoCtrl.I_FullScreen(true);
	}

}

//登录
function clickLogin(options) {

	var szIP = options.DVR_IP,
		szPort = options.DVR_PORT,
		szUsername = options.DVR_USERNAME,
		szPassword = options.DVR_PASSWORD;

	if ("" == szIP||szIP==null||szIP==undefined
		|| "" == szPort||szPort==null||szPort==undefined) {
		return;
	}

	is_login = WebVideoCtrl.I_Login(szIP, 1, szPort, szUsername, szPassword, {
		success: function (xmlDoc) {
			m_roomMap = options;
			clickGetDeviceInfo(szIP);
			is_login = '-1';
		},
		error: function () {
			alert(" 视频连接失败！");
		}
	});
	
}

//获取设备信息
function clickGetDeviceInfo(szIP) {
	if ("" == szIP) {
		return;
	}
	WebVideoCtrl.I_GetDeviceInfo(szIP, {
		success: function (xmlDoc) {
			setTimeout('getChannelInfo()', 10);
		},
		error: function () {
			alert(" 获取设备信息失败！");
		}
	});
}

//获取通道
function getChannelInfo() {
	var szIP = m_roomMap.DVR_IP;

	if ("" == szIP||szIP==null||szIP==undefined) {
		return;
	}

	// 模拟通道
	/*WebVideoCtrl.I_GetAnalogChannelInfo(szIP, {
		async: false,
		success: function (xmlDoc) {
			
		},
		error: function () {
			alert(szIP + " 获取模拟通道失败！");
		}
	});*/
	
	// 数字通道
	WebVideoCtrl.I_GetDigitalChannelInfo(szIP, {
		async: false,
		success: function (xmlDoc) {
			var oChannels = $(xmlDoc).find("InputProxyChannelStatus");

			$.each(oChannels, function (i) {
				var id = parseInt($(this).find("id").eq(0).text(), 10),
					name = $(this).find("name").eq(0).text(),
					online = $(this).find("online").eq(0).text();
				if ("false" == online) {// 过滤禁用的数字通道
					return true;
				}
				if ("" == name) {
					name = "IPCamera " + ((id - nAnalogChannel) < 9 ? "0" + (id - nAnalogChannel) : (id - nAnalogChannel));
				}
				//var channel={channelId:id,channelName:name,wndIndex:m_iChannels.length,bZero:false,streamType:m_streamType};
				//m_iChannels.push(channel);
					
			});
				
		},
		error: function () {
			alert(" 获取数字通道失败！");
		}
	});
	
	//遍历服务器下所有视频通道
	/*for(var i = 0;i<m_iChannels.length;i++){
		clickStartRealPlay(m_roomMap,m_iChannels[i]);
	}*/
	
}
// 获取预览参数
function clickStartRealPlay() {
	//iWndIndex = channel.wndIndex,
	var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex),
		szIP = m_roomMap.DVR_IP,
		iStreamType = m_streamType,
		iChannelID = tdNum,
		bZeroChannel = false,
		szInfo = "";

	if ("" == szIP||szIP==null||szIP==undefined) {
		return;
	}

	if (oWndInfo != null) {// 已经在播放了，先停止
		WebVideoCtrl.I_Stop();
	}

	var iRet = realPlay(szIP, iStreamType, iChannelID, bZeroChannel);

}

//预览
function realPlay(szIP, iStreamType, iChannelID, bZeroChannel) {
	return WebVideoCtrl.I_StartRealPlay(szIP, {
		iStreamType: iStreamType,
		iChannelID: iChannelID,
		bZeroChannel: bZeroChannel
	});
}

//退出
function clickLogout(options) {
	var szIP = options.DVR_IP,
		szInfo = "";

	if (szIP == ""||szIP==null||szIP==undefined) {
		return;
	}

	var iRet = WebVideoCtrl.I_Logout(szIP);
	
}

//搜索录像
var iSearchTimes = 0;
function clickRecordSearch(iType) {
	var szIP = m_roomMap.DVR_IP,
		iChannelID = tdNum,
		bZeroChannel = false,
		szStartTime = $("#starttime").val() + " " + starttime,
		szEndTime = $("#endtime").val() + " " + endtime;

	if ("" == szIP) {
		return;
	}

	if (bZeroChannel) {// 零通道不支持录像搜索
		return;
	}

	if (0 == iType) {// 首次搜索
		$("#searchlist").empty();
		iSearchTimes = 0;
	}

	WebVideoCtrl.I_RecordSearch(szIP, iChannelID, szStartTime, szEndTime, {
		iSearchPos: iSearchTimes * 40,
		success: function (xmlDoc) {
			if("MORE" === $(xmlDoc).find("responseStatusStrg").eq(0).text()) {
				
				for(var i = 0, nLen = $(xmlDoc).find("searchMatchItem").length; i < nLen; i++) {
					var szPlaybackURI = $(xmlDoc).find("playbackURI").eq(i).text();
					if(szPlaybackURI.indexOf("name=") < 0) {
						break;
					}
					var szStartTime = $(xmlDoc).find("startTime").eq(i).text();
					var szEndTime = $(xmlDoc).find("endTime").eq(i).text();
					var szFileName = szPlaybackURI.substring(szPlaybackURI.indexOf("name=") + 5, szPlaybackURI.indexOf("&size="));

					/*var objTr = $("#searchlist").get(0).insertRow(-1);
					var objTd = objTr.insertCell(0);
					objTd.id = "downloadTd" + i;
					objTd.innerHTML = iSearchTimes * 40 + (i + 1);
					objTd = objTr.insertCell(1);
					objTd.width = "30%";
					objTd.innerHTML = szFileName;
					objTd = objTr.insertCell(2);
					objTd.width = "30%";
					objTd.innerHTML = (szStartTime.replace("T", " ")).replace("Z", "");
					objTd = objTr.insertCell(3);
					objTd.width = "30%";
					objTd.innerHTML = (szEndTime.replace("T", " ")).replace("Z", "");
					objTd = objTr.insertCell(4);
					objTd.width = "10%";
					objTd.innerHTML = "<a href='javascript:;' onclick='clickStartDownloadRecord(" + i + ");'>下载</a>";
					$("#downloadTd" + i).data("playbackURI", szPlaybackURI);*/
				}

				iSearchTimes++;
				clickRecordSearch(1);// 继续搜索
			} else if ("OK" === $(xmlDoc).find("responseStatusStrg").eq(0).text()) {
				var iLength = $(xmlDoc).find("searchMatchItem").length;
				for(var i = 0; i < iLength; i++) {
					var szPlaybackURI = $(xmlDoc).find("playbackURI").eq(i).text();
					if(szPlaybackURI.indexOf("name=") < 0) {
						break;
					}
					var szStartTime = $(xmlDoc).find("startTime").eq(i).text();
					var szEndTime = $(xmlDoc).find("endTime").eq(i).text();
					var szFileName = szPlaybackURI.substring(szPlaybackURI.indexOf("name=") + 5, szPlaybackURI.indexOf("&size="));

					/*var objTr = $("#searchlist").get(0).insertRow(-1);
					var objTd = objTr.insertCell(0);
					objTd.id = "downloadTd" + i;
					objTd.innerHTML = iSearchTimes * 40 + (i + 1);
					objTd = objTr.insertCell(1);
					objTd.width = "30%";
					objTd.innerHTML = szFileName;
					objTd = objTr.insertCell(2);
					objTd.width = "30%";
					objTd.innerHTML = (szStartTime.replace("T", " ")).replace("Z", "");
					objTd = objTr.insertCell(3);
					objTd.width = "30%";
					objTd.innerHTML = (szEndTime.replace("T", " ")).replace("Z", "");
					objTd = objTr.insertCell(4);
					objTd.width = "10%";
					objTd.innerHTML = "<a href='javascript:;' onclick='clickStartDownloadRecord(" + i + ");'>下载</a>";
					$("#downloadTd" + i).data("playbackURI", szPlaybackURI);*/
				}
				//showOPInfo(szIP + " 搜索录像文件成功！");
			} else if("NO MATCHES" === $(xmlDoc).find("responseStatusStrg").eq(0).text()) {
				setTimeout(function() {
					//showOPInfo(szIP + " 没有录像文件！");
					alert(" 没有录像文件！");
				}, 50);
			}
		},
		error: function () {
			//showOPInfo(szIP + " 搜索录像文件失败！");
			alert(" 搜索录像文件失败！");
		}
	});
}

// 开始回放
function clickStartPlayback() {
	//clickRecordSearch(0);
	var aa = $(".range-slider").val();
	var dateArr = aa.split(",");
	/*if(dateArr[0] > dateArr[1]){
		alert("开始时间不能大于结束时间！");
		return;
	}*/
	var s = dateArr[0].split(":");//开始时间
	var e = dateArr[1].split(":");//结束时间
	var starttime = s[0] < 10 ? "0"+s[0]:s[0];
	var a = starttime +":" +s[1]+":00";//开始时间
	//var endtime = e[0] < 10 ? "0"+e[0]:e[0];
	var b = starttime +":" +e[1]+":00";//结束时间
	var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex),
		szIP = m_roomMap.DVR_IP,
		bZeroChannel = false,
		iChannelID = tdNum,
		szStartTime = $("#starttime").val() + " " + a,
		szEndTime = $("#starttime").val() + " " + b;
		szInfo = "",
		bChecked = $("#transstream").prop("checked"),
		iRet = -1;

	if ("" == szIP) {
		return;
	}

	if (bZeroChannel) {// 零通道不支持回放
		return;
	}

	if (oWndInfo != null) {// 已经在播放了，先停止
		WebVideoCtrl.I_Stop();
	}

	if (bChecked) {// 启用转码回放
		var oTransCodeParam = {
			TransFrameRate: "14",// 0：全帧率，5：1，6：2，7：4，8：6，9：8，10：10，11：12，12：16，14：15，15：18，13：20，16：22
			TransResolution: "1",// 255：Auto，3：4CIF，2：QCIF，1：CIF
			TransBitrate: "19"// 2：32K，3：48K，4：64K，5：80K，6：96K，7：128K，8：160K，9：192K，10：224K，11：256K，12：320K，13：384K，14：448K，15：512K，16：640K，17：768K，18：896K，19：1024K，20：1280K，21：1536K，22：1792K，23：2048K，24：3072K，25：4096K，26：8192K
		};
		iRet = WebVideoCtrl.I_StartPlayback(szIP, {
			iChannelID: iChannelID,
			szStartTime: szStartTime,
			szEndTime: szEndTime,
			oTransCodeParam: oTransCodeParam
		});
	} else {
		iRet = WebVideoCtrl.I_StartPlayback(szIP, {
			iChannelID: iChannelID,
			szStartTime: szStartTime,
			szEndTime: szEndTime
		});
	}

	if (0 == iRet) {
		szInfo = "开始回放成功！";
	} else {
		szInfo = "开始回放失败！";
		alert(szInfo);
	}
	//showOPInfo(szIP + " " + szInfo);
}

// 停止回放
function clickStopPlayback() {
	var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex),
		szInfo = "";

	if (oWndInfo != null) {
		var iRet = WebVideoCtrl.I_Stop();
		if (0 == iRet) {
			szInfo = "停止回放成功！";
		} else {
			szInfo = "停止回放失败！";
		}
		//showOPInfo(oWndInfo.szIP + " " + szInfo);
	}
}

/*// 开始倒放
function clickReversePlayback() {
	var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex),
		szIP = m_roomMap.DVR_IP,
		bZeroChannel = false,
		iChannelID = tdNum,
		szStartTime = $("#starttime").val(),
		szEndTime = $("#endtime").val(),
		szInfo = "";

	if ("" == szIP) {
		return;
	}

	if (bZeroChannel) {// 零通道不支持回放
		return;
	}

	if (oWndInfo != null) {// 已经在播放了，先停止
		WebVideoCtrl.I_Stop();
	}

	var iRet = WebVideoCtrl.I_ReversePlayback(szIP, {
		iChannelID: iChannelID,
		szStartTime: szStartTime,
		szEndTime: szEndTime
	});

	if (0 == iRet) {
		szInfo = "开始倒放成功！";
	} else {
		szInfo = "开始倒放失败！";
	}
	//showOPInfo(szIP + " " + szInfo);
}

//单帧
function clickFrame() {
	var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex),
		szInfo = "";

	if (oWndInfo != null) {
		var iRet = WebVideoCtrl.I_Frame();
		if (0 == iRet) {
			szInfo = "单帧播放成功！";
		} else {
			szInfo = "单帧播放失败！";
		}
		//showOPInfo(oWndInfo.szIP + " " + szInfo);
	}
}*/

// 暂停
function clickPause() {
	if(videoType == '1'){
		//大华
		PauseRec();
	}else if(videoType == '2'){
		//海康
		szInfo = "";
		if (oWndInfo != null) {
			var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex),
				iRet = WebVideoCtrl.I_Pause();
			if (0 == iRet) {
				szInfo = "暂停成功！";
			} else {
				szInfo = "暂停失败！";
			}
			//showOPInfo(oWndInfo.szIP + " " + szInfo);
		}
	}
	
}

// 恢复
function clickResume() {
	var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex),
		szInfo = "";

	if (oWndInfo != null) {
		var iRet = WebVideoCtrl.I_Resume();
		if (0 == iRet) {
			szInfo = "恢复成功！";
		} else {
			szInfo = "恢复失败！";
		}
		//showOPInfo(oWndInfo.szIP + " " + szInfo);
	}
}

/*// 慢放
function clickPlaySlow() {
	var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex),
		szInfo = "";

	if (oWndInfo != null) {
		var iRet = WebVideoCtrl.I_PlaySlow();
		if (0 == iRet) {
			szInfo = "慢放成功！";
		} else {
			szInfo = "慢放失败！";
		}
		//showOPInfo(oWndInfo.szIP + " " + szInfo);
	}
}

// 快放
function clickPlayFast() {
	var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex),
		szInfo = "";

	if (oWndInfo != null) {
		var iRet = WebVideoCtrl.I_PlayFast();
		if (0 == iRet) {
			szInfo = "快放成功！";
		} else {
			szInfo = "快放失败！";
		}
		//showOPInfo(oWndInfo.szIP + " " + szInfo);
	}
}

// OSD时间
function clickGetOSDTime() {
	var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex);
	
	if (oWndInfo != null) {
		var szTime = WebVideoCtrl.I_GetOSDTime();
		if (szTime != -1) {
			$("#osdtime").val(szTime);
			//showOPInfo(oWndInfo.szIP + " 获取OSD时间成功！");
		} else {
			//showOPInfo(oWndInfo.szIP + " 获取OSD时间失败！");
		}
	}
}*/

//抓图
function clickCapturePic() {
	var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex),
		szInfo = "";

	if (oWndInfo != null) {
		var szChannelID = tdNum,
			szPicName = oWndInfo.szIP + "_" + szChannelID + "_" + new Date().getTime(),
			iRet = WebVideoCtrl.I_CapturePic(szPicName);
		if (0 == iRet) {
			szInfo = "抓图成功！";
		} else {
			szInfo = "抓图失败！";
		}
		//showOPInfo(oWndInfo.szIP + " " + szInfo);
		//alert(oWndInfo.szIP + " " + szInfo);
		//alert("图片保存路径："+JSON.stringify(WebVideoCtrl.I_GetLocalCfg()));
	}
}

//打开选择框 0：文件夹  1：文件
function clickOpenFileDlg(id, iType) {
	var szDirPath = WebVideoCtrl.I_OpenFileDlg(iType);
	
	if (szDirPath != -1 && szDirPath != "" && szDirPath != null) {
		$("#" + id).val(szDirPath);
	}
	var arrXml = [],
	szInfo = "";
	arrXml.push("<LocalConfigInfo>");
	arrXml.push("<CapturePath>" + $("#previewPicPath").val() + "</CapturePath>");
	arrXml.push("<PlaybackPicPath>" + $("#previewPicPath").val() + "</PlaybackPicPath>");
	arrXml.push("</LocalConfigInfo>");
	
	var iRet = WebVideoCtrl.I_SetLocalCfg(arrXml.join(""));

	if (0 == iRet) {
		szInfo = "本地配置设置成功！";
	} else {
		szInfo = "本地配置设置失败！";
	}
	//showOPInfo(szInfo);
}

// 设置本地参数
function clickSetLocalCfg() {
	var arrXml = [],
		szInfo = "";
	
	arrXml.push("<LocalConfigInfo>");
	arrXml.push("<PackgeSize>" + $("#packSize").val() + "</PackgeSize>");
	arrXml.push("<PlayWndType>" + $("#wndSize").val() + "</PlayWndType>");
	arrXml.push("<BuffNumberType>" + $("#netsPreach").val() + "</BuffNumberType>");
	arrXml.push("<RecordPath>" + $("#recordPath").val() + "</RecordPath>");
	arrXml.push("<CapturePath>" + $("#previewPicPath").val() + "</CapturePath>");
	arrXml.push("<PlaybackFilePath>" + $("#playbackFilePath").val() + "</PlaybackFilePath>");
	arrXml.push("<PlaybackPicPath>" + $("#playbackPicPath").val() + "</PlaybackPicPath>");
	arrXml.push("<DownloadPath>" + $("#downloadPath").val() + "</DownloadPath>");
	arrXml.push("<IVSMode>" + $("#rulesInfo").val() + "</IVSMode>");
	arrXml.push("<CaptureFileFormat>" + $("#captureFileFormat").val() + "</CaptureFileFormat>");
    arrXml.push("<ProtocolType>" + $("#protocolType").val() + "</ProtocolType>");
	arrXml.push("</LocalConfigInfo>");

	var iRet = WebVideoCtrl.I_SetLocalCfg(arrXml.join(""));

	if (0 == iRet) {
		szInfo = "本地配置设置成功！";
	} else {
		szInfo = "本地配置设置失败！";
	}
	showOPInfo(szInfo);
}


/** 大华视频
 * 检测浏览器是否存在视频插件
 * @return {Boolean}
 */

//回放时间
var g_PlayTime;
//默认的正常速度
var g_curSpeed = 4;
var htmlStChn1 = '';

//校验ie
function checkPlugins(){
    var result;
    if (Sys.ie) {
        try { 
            result = new ActiveXObject(PLUGINS_NAME);
            delete result;
        } catch (e) {
            return false;
        }
        return true;
    } else {
        navigator.plugins.refresh(false);
        result = navigator.mimeTypes["application/media-plugin-version-3.1.0.2"];
        return !!(result && result.enabledPlugin);
    }
}

//显示提示信息下载、退出
function showInstallDialog()
{
	document.getElementById('login_install_dialog').style.display = '';
}
//隐藏提示信息下载、退出
function hideInstallDialog()
{
	document.getElementById('login_install_dialog').style.display = 'none';
	/*if(document.getElementById('username') && !g_isRemoteLogin)
	{
		if(document.getElementById('username').value != '')
		{
			document.getElementById('password').focus();
		}
		else
		{
			document.getElementById('username').focus();
		}
	}*/
}

//点击下载安装插件
function instal(){
	hideInstallDialog();
	setTimeout('loadPlugins()',1000);
}
//校验加载视频插件
function loadPlugins()
{
	if(checkPlugins())
	{	
		hasPlugin = true;
		//延时加载视频插件
		setTimeout('loadPageOcx()',2000);
	}
	else
	{
		//继续校验
		setTimeout('loadPlugins()',1000);
	}	
}

//加载视频插件
function loadPageOcx (){
		document.getElementById('f_ocx').innerHTML = mainOcxHtml;
		//document.getElementById('Login').style.display = '';
		initPageOcx();
}
//监听事件？
function initPageOcx() {
	g_ocx = document.getElementById('ocx');
	//g_ocx.AddEventListener('SetNetPlayRecordStatus', ShowRecInfo);
	//g_ocx.AddEventListener('SetNetPlayFileInfo', ShowRecInfo);
	//g_ocx.AddEventListener('NetPlayTimeInform', ShowPlayTime);
	//g_ocx.AddEventListener('TransEvent', handlerOcxEvents.fireOcxEvent);
}

//登录
function LoginDevice(options){
	var szIP = options.DVR_IP,
		szPort = options.DVR_PORT,
		szUsername = options.DVR_USERNAME,
		szPassword = options.DVR_PASSWORD;
	//var bRet = g_ocx.LoginDeviceEx("172.30.7.215",3480,"admin","admin", 0);
	var bRet = g_ocx.LoginDeviceEx(szIP,parseInt(szPort),szUsername,szPassword, 0);
	if(bRet == 0){
		
		/*document.getElementById('LocalPlay').style.display = '';
		document.getElementById('Stop').style.display = '';
		document.getElementById('FullScreen').style.display = '';	
		document.getElementById('Logout').style.display = '';	
		document.getElementById('idQuery').style.display = '';			
		document.getElementById('Ptzctrl').style.display = '';	
		document.getElementById('Play').style.display = '';*/	
	}
	
}

//预览
function RealPlay(){
	g_ocx.SetModuleMode(1); //监视模式
	//连接实时监控   连接通道号  码流类型 1.主码流  2.辅码流
	g_ocx.ConnectRealVideo(0 ,1);
	//g_ocx.ConnectRealVideo(1 ,1);
	//alert(g_ocx.SetPicQuality(0));
	g_ocx.SetWinBindedChannel(4, 0, 63,64);
}

/*//云台
function ControlPtz(){
	g_ocx.ControlPtzEx(0, 1, 1, 8, 1, 0);
}*/

//退出登录
function LogoutDevice(){
	g_ocx.LogoutDevice();
	/*document.getElementById('Login').style.display = '';
	document.getElementById('PlayBack').style.display = 'none';
	document.getElementById('LocalPlay').style.display = 'none';
	document.getElementById('Stop').style.display = 'none';
	document.getElementById('FullScreen').style.display = 'none';
	document.getElementById('Play').style.display = 'none';
	document.getElementById('Logout').style.display = 'none';
	document.getElementById('PlayRec').style.display = 'none';
	document.getElementById('PauseRec').style.display = 'none';
	document.getElementById('FastPlay').style.display = 'none';
	document.getElementById('SlowPlay').style.display = 'none';
	document.getElementById('ShowPlayTime').style.display = 'none';
	document.getElementById('DwonLoadPos').style.display = 'none';
	document.getElementById('RecInfo').style.display = 'none';*/
}

/*//打开本地录像
function LocalPlay()
{
	g_ocx.QuickOperation(0);
}*/

//停止预览
function StopPlay()
{
	g_ocx.DisConnectRealVideo(0);
}

//全屏
function FullScreen(){
	g_ocx.OnFullScreenClk(); 
}

//回放
function QueryRecord(){
	/*1,预览监视
    2, 摄像头属性
	3, IVS监视
	4,网络回放
	5,本地回放
	6, ITC播放视频时订阅告警图片信息模式
	7,仅播放告警图片模式
	8,下载
    9,视频属性
	10,公网实时监视*/
	g_ocx.SetModuleMode(4);	//回放模式
	//设置窗口对应的通道号  窗口分割数、窗口ID号、通道最小值、窗口最大值
	g_ocx.SetWinBindedChannel(4, 0, 63,64);
	//返回某月录像状态
	g_ocx.SwitchMonth(2014,11,17);
	//切换日期
	g_ocx.SwitchDay(2014,11,17);
	htmlStChn1 = '';
}
/*//回放
function PlayRec()
{
	g_ocx.PlayBack();
}*/
//开始回放
function PlayBack(){
	//ocx.SetSearchBeginTime('2014-10-13 00:00:00',true);
	
	//开始网络回放
	//g_ocx.PlayBack();
	//停止网络回放
	//g_ocx.StopPlayBack();
	//通过网络回放
	//g_ocx.PlayBackByTime(0, '01:00:00');
	//按文件回放录像
	var szFileInfo = {
			Channel : 0,
			StartTime : "2017-04-17 11:00:00",
			EndTime : "2017-04-17 12:00:00"
	};
	g_ocx.PlayBackByRecordFile(szFileInfo);
}
//暂停回放
function PauseRec()
{
	g_ocx.PausePlayBack();
}

/*//快放
function FastPlay(){
	if(g_curSpeed >= 8){//达到最大速度以后再快放就回到正常速度,客户可以按照自己的意愿来处理此时是否灰显快放按钮
		g_curSpeed = 4;
	}
	else{
		g_curSpeed++;
	}
	ocx.SpeedPlayBack(g_curSpeed);
}

//慢放
function SlowPlay(){
	if(g_curSpeed <= 0){//达到最小速度以后再慢放就回到正常速度,客户可以按照自己的意愿来处理此时是否灰显快放按钮
		g_curSpeed = 4;
	}
	else{
		g_curSpeed--;
	}
	ocx.SpeedPlayBack(g_curSpeed);
}*/

/*//下载
function Download(){
	g_ocx.DownloadRecordByTime(0, '2014-11-04 01:05:00','2014-11-04 01:18:00', 'C:\\RecordDownload', 'dav');
}*/

//显示时间
function ShowPlayTime(time)
{
	//时间的格式00020018|  |是通道分隔符
	g_PlayTime = time;
	//document.getElementById('playtime').value = g_PlayTime;
}
//???
function ShowRecInfo(nCh, strRecodInfo)
{
	/*document.getElementById('PlayBack').style.display = '';
	document.getElementById('PlayRec').style.display = '';
	document.getElementById('PauseRec').style.display = '';
	document.getElementById('FastPlay').style.display = '';
	document.getElementById('SlowPlay').style.display = '';	
	document.getElementById('download').style.display = '';
	document.getElementById('RecInfo').style.display = '';
	document.getElementById('ShowPlayTime').style.display = '';
	document.getElementById('DwonLoadPos').style.display = '';*/
	g_PlayTime = "";
	var readtime = strRecodInfo.split(':');
	var num = readtime.length;
	for(var i=0; i<num ; i++){
		if(readtime[i]=='')
			continue;
		htmlStChn1 += '<li><a id="StChn'+(i)+'">' +'channel: '+nCh+' info: '+ readtime[i]+'</a></li>';
	}
	document.getElementById('RecInfoList').innerHTML = htmlStChn1;
}


