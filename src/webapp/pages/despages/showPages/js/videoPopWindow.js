/**
 * 
 */

//$(document).ready(function(){
//	openVideo();
//});

//验证是否登录过
  var is_login = null;
  var m_streamType = 1;
  var tdNum = null;
  var g_iWndIndex = 0;
  var m_roomMap = {};	
  var isFinished = false;
  
  function openPopWindow(options, name){
		
	  	$('#popTxtSpan').text(name);
	  
	 	m_roomMap = options;
	  
		$('#fill_div').css({
			'display':'block'
		});
		$('#fill_div').animate({ opacity: '1' }, 600);
		
		$('#popWindow').css({
			'display':'block'
		});
		
		$('#popWindow').addClass('popWindow');
		setTimeout(function(){
			$('#popWindow').css({
				'opacity' : 1,
				'-webkit-transform' :  '',
				'-moz-transform' : ''
			});
			$('#popWindow').removeClass('popWindow');

			openVideo();
			isFinished = true;
			
		},1000);
	}
  
  function closePopWindow(){
	  if (!isFinished){
		  return;
	  }
	  
	  isFinished = false;
	  
	  clickLogout(m_roomMap);
	  is_login = null;
	  
		$('#fill_div').animate({ opacity: '0' }, 600);
		setTimeout(function(){
			$('#fill_div').css({
				'display':'none'
			});
		},600);
		
		$('#popWindow').css({
			'opacity' : 1,
			'-webkit-transform' :  'scale(1)',
			'-moz-transform' : 'scale(1)'
		});
		
		$('#popWindow').addClass('popWindowOut');
		setTimeout(function(){
			$('#popWindow').css({
				'opacity' : 0,
				'-webkit-transform' :  'scale(0.2)',
				'-moz-transform' : 'scale(0.2)',
				'display':'none'
			});
			$('#popWindow').removeClass('popWindowOut');
		},800);
	}
  
  function openVideo(){
		//加载视频监控
		// 检查插件是否已经安装过
		var iRet = WebVideoCtrl.I_CheckPluginInstall();
		if (-2 == iRet) {
			$.messager.alert('警告','您的Chrome浏览器版本过高，不支持NPAPI插件！');
			return;
		} else if (-1 == iRet) {
				$.messager.alert('警告','您还未安装过插件，双击开发包目录里的WebComponentsKit.exe安装！');
			return;
		   }
		
		// 初始化插件参数及插入插件
		WebVideoCtrl.I_InitPlugin("100%", "100%", {
			bWndFull: true,//是否支持单窗口双击全屏，默认支持 true:支持 false:不支持
	       	iWndowType: 1,//该变量为控制分屏数（如：1=1*1,2=2*2...）
			cbSelWnd: function (xmlDoc) {
				//当前选择的窗口号
				g_iWndIndex = $(xmlDoc).find("SelectWnd").eq(0).text();
			}
		});
		
		//加载分屏
		WebVideoCtrl.I_InsertOBJECTPlugin("divPlugin");
		// 检查插件是否最新
		if (-1 == WebVideoCtrl.I_CheckPluginVersion()) {
				$.messager.alert('警告',"检测到新的插件版本，双击开发包目录里的WebComponentsKit.exe升级！");
			return;
		}
		
		tdNum = m_roomMap.CHANNEL;
		
		//验证是否登录过
		 if(is_login == -1){
			 //直接获取设备信息
			 clickGetDeviceInfo(m_roomMap.DVR_IP);
		 }else{//没有登录过
			 //登录
			 clickLogin(m_roomMap);
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
				clickGetDeviceInfo(m_roomMap.DVR_IP);
				is_login = '-1';
			},
			error: function () {
				$.messager.alert('错误'," 视频连接失败！");
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
				$.messager.alert('错误'," 获取设备信息失败！");
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
				clickStartRealPlay();
			},
			error: function () {
				$.messager.alert('错误'," 获取数字通道失败！");
			}
		});
		
		//遍历服务器下所有视频通道
		/*for(var i = 0;i<m_iChannels.length;i++){
			clickStartRealPlay(m_roomMap,m_iChannels[i]);
		}*/
		
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