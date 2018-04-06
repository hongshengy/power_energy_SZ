/**
 * <p>
 * Title: 区域能源主页面
 * Company: 江苏方天电力技术有限公司
 * </p>
 */
var shuzhi =null;//标识位
var roleId='';//全局获取用户的角色id
var rolename='';//登录用户的角色名称
var pagefirst='';//初始加载的首页链接
var firsthtml=''; //首次加载时，记录首页模块信息
var menuIds = [];//一级菜单id集合
var rindex=0; 
var isOldpwd=false;
var isAffnewpwd=false;
var oldpwd='';
var conts = 0;
var areaName = '';//区域名称
var systemTime = '';
var ret = '';
var intervalFlag = null;
var isFistTimeSet=true;//是否第一次加载时间
var gaojingnr=null;//存上次警铃告警内容

$(function(){
   

	
	$('#gaojingsl').css("display","none");
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
	
	setInterval(function(){
		$.get(webContextRoot+ 'pfgd/querygaojingchaxunshouyecont.action',{},
			function(data){ 
					rs = eval("("+data+")");
					var bt = eval("("+gaojingnr+")");
					var ee =eval("("+data+")");
					newMessage = rs.length;//新的消息数量
					var oldMessage ='';
					
					if(bt){
						 oldMessage = bt.length;//上次的消息条数
					}else{
						oldMessage =rs.length;
					}
					var oldMess = parseInt(oldMessage);//转化成int
					gaojingnr =data;
					if(newMessage>oldMess){
//						var userAgent = navigator.userAgent.toLowerCase();
//						if(userAgent!=undefined&&/msie/.test(userAgent)||/trident\/7.0/.test(userAgent)&&parseFloat((userAgent.match(/.+(?:rv|it|ra|ie)[\/:]([\d.]+)/)||[])[1])<=11){
//							$('#newMessageDIV').html('<embed src="../pages/despages/common/audio/19.wav" />');
//						}else{
//							$('#newMessageDIV').html('<audio autoplay="autoplay"><source src="../pages/despages/common/audio/19.wav" type="audio/wav"/></audio>');
//						}
//						$('#newMessageDIV').html('<embed src="../pages/despages/common/audio/19.wav" />');
//						$('#newMessageDIV').html('<audio autoplay="autoplay"><source src="../pages/despages/common/audio/19.wav" type="audio/wav"/></audio>');
						for(var k=0;k<bt.length;k++){
							for(var a=0;a<ee.length;a++){
								if(bt[k].mpId == ee[a].mpId){
									ee.splice(a,1);
									continue;
								}
							}
						}
						queryGaoJing(ee);
					}else{
						//$('#newMessageDIV').html('<embed src="../pages/despages/common/audio/19.wav"/>');
						$('#newMessageDIV').html("");
						//$('#newMessageDIV').html('<audio autoplay="autoplay"><source src="../pages/despages/common/audio/19.wav" type="audio/wav"/></audio>');
						
					}
					
					if(rs.length != conts || rs.length == 0){
						conts = rs.length;
						if(conts==0){
							//替换图片
							$("#gaojingld").attr("src",'../images/warning-gray.png');
							//document.getElementById("gaojingld").setAttribute("src", '../images/warning-gray.png');
							//隐藏标签的写法
							$("#gaojingsl").css("display","none");
							//document.getElementById("gaojingld").styly.display="none";
							//$("#gaojingsl").hide();
						}else{
							$("#gaojingld").attr("src",'../images/warning.png');
							$("#gaojingsl").css("display","block");
							if(conts>99){
								$("#gaojingsl").text("99+");
								$('#gaojingsl').removeClass('warining-num').addClass('warining-num2');
								$("#gaojingsl").css("background",'url(../images/warningNum-bg2.png)');
								floatShow(conts);
							}else{
								$("#gaojingsl").text(conts);
								floatShow(conts);
							}
						}	
					}
					
			});
 	},5000);
	
	/**
	 * 判断新密码和确认密码是否一致
	 */
	$("#newpwd").textbox("textbox").blur(function(){
		var newpwd=$('#newpwd').val();
		var affnewpwd=$('#affnewpwd').val();
		if(newpwd!=''){
			$('#newpwdimg1').css('display','none');
			$('#newpwdimg2').css('display','block');
		}else{
			$('#newpwdimg2').css('display','none');
			$('#newpwdimg1').css('display','block');
		}
		
		if(affnewpwd!='' & newpwd!=''& affnewpwd != newpwd){
			$('#affnewpwdimg2').css('display','none');
			$('#affnewpwdimg1').css('display','block');
		}
		if(affnewpwd!='' & newpwd!=''& affnewpwd == newpwd){
			$('#affnewpwdimg1').css('display','none');
			$('#affnewpwdimg2').css('display','block');
		}
	});
	$("#affnewpwd").textbox("textbox").blur(function(){
		var newpwd=$('#newpwd').val();
		var affnewpwd=$('#affnewpwd').val();
		if(affnewpwd == newpwd & affnewpwd!='' & newpwd!=''){
			$('#affnewpwdimg1').css('display','none');
			$('#affnewpwdimg2').css('display','block');
		}else{
			$('#affnewpwdimg2').css('display','none');
			$('#affnewpwdimg1').css('display','block');
		}
	});
	
	tishi();//获取升级提示信息
	newNotice();//获取新闻提示信息
});
function showGaojingTip(count){
	var str = "实时，出现"+count+"条告警信息！";
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
 function getSysDate() {
	$.ajax({
		type : "post",
		url : '/des/svg/queryCurrentTimeSVG.action',
		dataType : "json",
		success : function(data) {
			if (data.length > 0) {
//				date = DateUtil.dateAdd('s',1,DateUtil.strToDate(data[0].svgSysDate));
				ret = DateUtil.strToDate(data[0].svgSysDate);
				if(intervalFlag){
					//clearTimeout(intervalFlag);
					clearInterval(intervalFlag);
				}
				//timeChange();
				intervalFlag = setInterval(timeChange,1000);
			}
		}
	});
	if(isFistTimeSet==true){
	    setInterval(getSysDate, 300000);//每间隔5分钟从数据库中取一次系统时间
	    isFistTimeSet=false;
	}
}
 
 function timeChange(){
	 //intervalFlag = setTimeout("timeChange()", 1000);//这里用到setTimeout()方法用于在指定毫秒数后调用函数或计算表达式
     //	而setInterval()则在每隔指定的毫秒数循环调用函数
		ret = DateUtil.dateAdd('s',1,ret);
		var abc = DateUtil.dateToStr("yyyy-MM-dd 周W HH:mm:ss",ret);
		$('#systemTime').text(abc);
	}

 function tishi(){//弹出提示升级
		$.get(webContextRoot+ 'pfgd/queryshouyetishi.action', 
			{},
			function(data){
			 	if(data.confi.UPSystem !=""){//roleid 元素是否存在
			 	   	clearTimeout(clearTimeoutFlag);
//					 	   var ssi = setTimeout(function () {
					        var options = {
					            containerDom: document.getElementById('tip-panel-container'),
//						            waitTime: 10000,
					            panelContent: '<p style="margin: 20px auto;height: 40px;">'+data.confi.UPSystem+'</p>'
					        };
					        var panel = new popPanel(options);
					        panel.open();
//						    }, 1000);
			 	}else{//刷新
			 			clearTimeout(clearTimeoutFlag);//清除setTimeout
			 			clearTimeoutFlag = setTimeout(function(){//等待12000毫秒之后再次判断
			 			    tishi();
			 		    },12000);//等待12000毫秒之后再次判断
			 	}
			});
 }

/**
 * 告警信息
 */
function queryGaoJing(num){
	var str= '';
	var zhText='';
	var sti='';
	for(var o=0;o<num.length;o++){
		sti +=num[o].mpId
	}
//	alert(sti);
	$.post(webContextRoot +'pfgd/querygaojingchaxunshouyegaojing.action',
		{
		'gaoJIngChaXunSYModel.subsId' :'',
		'gaoJIngChaXunSYModel.bianwei' :0,
		'gaoJIngChaXunSYModel.gaojing' :1,
		'gaoJIngChaXunSYModel.mpCode' :'',
		'gaoJIngChaXunSYModel.alarmStartTime' :'',
		'gaoJIngChaXunSYModel.alarmEndTime' :'',
		'gaoJIngChaXunSYModel.consId': '',
		'gaoJIngChaXunSYModel.deviceType': '',
		'gaoJIngChaXunSYModel.dataDate': '',
		'gaoJIngChaXunSYModel.confirmFlag': '',
		'gaoJIngChaXunSYModel.mpId': sti,
		'gaoJIngChaXunSYModel.alarmLevel': ''		
		
		}, //请求路径
			 function(data){//回调
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
                 for(var i=0,len = data.length;i<len;i++){
                	 var type='';
                	 if(data[i].mpCode == 02){
                		 type = "变位";
                	 }else{
                		 type = "越限";
                	 }
                	// data[i].subsName+data[i].deviceTypeName+date[i].alarmLevelName+
                	// 2017-03-17 16:31:48 常州市公司1用户变2重大告警越限
                	 str = data[i].alarmLevelName +'，实时，'+data[i].consName+"，"+data[i].subsName+"，"+data[i].deviceName+" 发生 ("+data[i].mpName+type+")";
               
               //  $('#gaojing').remove();
//                 $('#gaojing').empty();
//                 $('#gaojing').append(str);
//                 
//                 zhText = $('#gaojing').text();//语音 播报内容
                // zhText = encodeURI(zhText);//转化编码
                 /**
                  * 连接外网才能使用
                  * lan=zh：语言是中文，如果改为lan=en，则语言是英文。ie=UTF-8：文字格式。spd=2：语速，可以是1-9的数字，数字越大，语速越快。text=**：这个就是你要转换的文字。
                  */
				  if(i==len-1)
                 $('#newMessageDIV').attr("src","http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=6&text='"+ str.replace(new RegExp(/(#)/g),"") +"'");

//                 var ssi = setTimeout(function () {
//         	        popWarningPanel.domId = "main-warning-tip-panel";
//         	       
//         	        popWarningPanel.open();
//         	        
//         	    }, 1000)
         	    (function(){
					var pCt ="<p>" + str + "</p>";
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
	         },
	 "json");//返回格式
}

function closegg(){

	 popWarningPanel.domId = "main-warning-tip-panel";
	popWarningPanel.close();
}


//悬浮窗事件
function floatShow(conts){
	
	$('#gaojingsl').tooltip({
		position: 'bottom',
		content: '<span style="color:#fff">'+conts+'</span>',
		onShow: function(){
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


window.onresize = function(){
	resize(2);
}

/**
 * 获取角色id
 * 执行动态菜单加载
 */
function selectRoleid() {
	var Name= null;
	if(UserName.length>6){
		Name = UserName.substring(0,6)+'...';
		
	}else{
		Name = UserName;
	}
	$("#loginName").text(Name);
	$("#loginName").attr("title",UserName);
//	$("#xialajs").text(Name);
//	$("#xialajs").attr("title",UserName);
	
	$.get(webContextRoot+ '/user/searchUserRoleList.action', 
	{ 
		'limit': '10000', 
		'userId': userId
	},
	function(data){
		rs = eval("("+data+")");
		var rdata='';
		rdata +="<ul>";
		if(rindex==0){
			for(var i=0;i<rs.list.length;i++){
				
				if(i==0){
					$("#xialajs").text(rs.list[i].roleName);
				}
				rdata +="<li data='"+rs.list[i].id+"'>"+rs.list[i].roleName+"</li>";
			    
			}
		}
		rdata +="</ul>";
		$('#roleid').append(rdata);
		rolename=rs.list[0].roleName;
		roleId=rs.list[0].id;
		 $('#combo-role .combo-list li').click(function () {
//		        alert("选择了:" + $(this).text() + ",值为:" + $(this).attr('data'));
		        $('#combo-role .combo-text').text($(this).text());
		        $('#combo-role .combo-list').slideToggle('fast');
		        roleId=$(this).attr('data');
		        rolename=$(this).text();
		        getCom(roleId);
		    });
		 getCom(roleId);
		//$('#roleid').combobox('loadData', rdata);
//		
//			$('#roleid').val(rdata[0].value)
			
//			$('#roleid').combobox('setValue', rdata[0].value);
//			roleId=rdata[0].value;
//			rolename=rdata[0].text;
//		}
	});
}

function resize(type){
	var mc = parseInt((document.body.clientWidth - 550)/145);
	var menu = document.querySelector(".main-menu-panel");
	menu.style.width = 145 * mc + 'px';
	if(type==1){//首次加载
		document.getElementById("leftButton").style.display='none';
		document.getElementById("rightButton").style.display='none';
		if(menuIds.length > mc){
			document.getElementById("rightButton").style.display='';
		}
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
	}
}

function menumove(type){
	var menu = document.querySelector(".main-menu-panel");//查出元素
	var sLeft = menu.scrollLeft;//获取横向滚动条的位置
	var sWidth = menu.scrollWidth;//滚动条靠右
	if(type==1){//左边按钮动作
		if (sLeft > 0){
			$(menu).animate({scrollLeft: (sLeft - 145) + 'px'}, "fast");
			if(sLeft - 145 <= 0){
				document.getElementById("leftButton").style.display='none';
			}
			if(parseInt(menu.style.width) + sLeft - 145 < sWidth){
				document.getElementById("rightButton").style.display='';
			}
		}
	}else if(type==2){//右边按钮动作
		if (sLeft < sWidth){
			$(menu).animate({scrollLeft: (sLeft + 145) + 'px'}, "fast");
			if(sLeft + 145 > 0){
				document.getElementById("leftButton").style.display='';
			}
			if(parseInt(menu.style.width) + sLeft + 145 >= sWidth){
				document.getElementById("rightButton").style.display='none';
			}
		}
	}
}

/**
 * 动态加载菜单栏
 */
function selectMenu(value) {

	$.get(webContextRoot+ '/rendsMenu/queryTrendsMenuModel.action?userId='+ userId+'&roleId='+value, 
	{ },
	function(data){
		var data = eval("("+data+")");
		var menulist="";
		var busiCode="";
		var index=0;
		/**
		 * 判断是否是首次加载，首次加载时获取“#menu” 中首页导航的内容
		 * 再次加载时，要清空上次加载的所有导航内容，并加载首页导航的内容
		 */
		if(rindex==0){
			firsthtml=$("#menu").html();
		}else{
			 $("#menu").empty();
			 $("#menu").append(firsthtml);
		}
		rindex++;
		/**
		 * 清空上次加载的所有内容，避免重复加载
		 */
//		$("#Trendsmenudiv").empty();
		var divs = document.getElementsByTagName("div");
		for(var i=divs.length-1;i>-1;i--){
			if(divs[i].id.indexOf('level3')==0){
				$("#"+divs[i].id).remove();
			}
		}
		menuIds = [];
		/**
		 * 循环判断加载菜单栏，以及菜单栏对应的下拉列表项
		 */
		for(var i=0;i<data.length;i++){
			if(data[i].isLeaf =='N'){  
				if(data[i].parentId!='0'){
					var relevanceMenuid=data[i].menuId;
					   menulist+='<a id="level2'+data[i].menuId+'" class="easyui-menubutton" data-options="iconCls:'+"'"+'icon-diqu'+"'"+',size:'+"'"+'large'+"'"+'"></a>';
					   menuIds.push('level2'+data[i].menuId);
					var divlist='<div id="level3'+data[i].menuId+'" class="menu-manifest" data-options="onClick:menuHandler">';
						for(var n=0;n<data.length;n++){
							if(data[n].parentId ==relevanceMenuid){
								if(data[n].funcUrl==null){																						
									divlist +='<div id="funcUrl'+n +'?funcId='+data[n].menuId+'&roleId='+roleId+'" name="'+data[n].busiCode+'" data="'+data[n].isPop+'">'+data[n].menuName+'</div>';
									}
								if(busiCode=='SYSTEM' ){
									/**
									 * 判断是否为系统菜单
									 */
									if(data[n].funcUrl.indexOf('?')>-1){
										divlist +='<div id="'+data[n].funcUrl + '&funcId='+data[n].menuId+'&roleId='+roleId+'"name="'+data[n].busiCode+'" data="'+data[n].isPop+'">'+data[n].menuName+'</div>';
									}else{
										divlist +='<div id="'+data[n].funcUrl + '?funcId='+data[n].menuId+'&roleId='+roleId+'"name="'+data[n].busiCode+'" data="'+data[n].isPop+'">'+data[n].menuName+'</div>';
									}
									if(index==0){
//										document.getElementById("menu-m1").style.display='none';
										 index++;
										 }
									}else{
										if(data[n].funcUrl.indexOf('?')>-1){
											divlist +='<div id="'+data[n].funcUrl +'&funcId='+data[n].menuId+'&roleId='+roleId+' "name="'+data[n].busiCode+'" data="'+data[n].isPop+'">'+data[n].menuName+'</div>';
										}else{
											divlist +='<div id="'+data[n].funcUrl +'?funcId='+data[n].menuId+'&roleId='+roleId+' "name="'+data[n].busiCode+'" data="'+data[n].isPop+'">'+data[n].menuName+'</div>';
										}
										  }
								}
							}
							     divlist+='</div>';
								 $("#Trendsmenudiv").append(divlist);
				 }else {
						busiCode=data[i].busiCode;
								 
						}
			 }
		}
		$("#menu").append(menulist); 
				 
					  /**						<a id="menu-m2" href="#" class="easyui-menubutton" data-options="menu:'#mm2',iconCls:'icon-diqu',size:'large'">实时监控
            </a>
					   * 动态加载菜单栏的显示样式
					   */
					 for(var n=0;n<data.length;n++){
						if(data[n].isLeaf =='N'){
							 if(data[n].parentId!=0){
								 if(data[n].funcIco == ''){
									 $('#level2'+data[n].menuId).menubutton({
										 iconCls:'icon-diqu',
										 text:data[n].menuName,
										 size:'large',
										 menu:'#level3'+data[n].menuId
									 	});	
								 }else{
									 $('#level2'+data[n].menuId).menubutton({
										 iconCls:data[n].funcIco,
										 text:data[n].menuName,
										 size:'large',
										 menu:'#level3'+data[n].menuId
									 	});	
								 }
						   }						 
						 }
					 }
					 resize(1);
	      }
	);
}

var clearTimeoutFlag;//临时变量  
/**
 *  下拉框的选择事件
 */
function getCom(id){
	if(roleId !=''){//roleid 元素是否存在
	   	clearTimeout(clearTimeoutFlag);
	   	if (shuzhi !=roleId || shuzhi == null) {
			closePage();
		//	rolename=$('#' + id).find("option:selected").text();
		//	roleId=$('#' + id).val();
			selectMenu(roleId);
			judgeFirstpagecontent();
			divcss();
			firstpage();		
		}
	}else{//刷新
			clearTimeout(clearTimeoutFlag);//清除setTimeout
			clearTimeoutFlag = setTimeout(function(){//等待50毫秒之后再次判断
			return getCom(id);
		},50);//等待300毫秒之后再次判断
	}
}
 
/**
 * 重新加载tab页
 */
function closePage(){
	if(shuzhi != roleId || shuzhi == null){
		$('#new-tab-main').empty();
		
        $('#new-tab-main').append('<div class="jinyuan-label"><span id="systemTime" class="time-text"></span></div>');
		$('#new-tab-main').append('<div id="tab-main" class="easyui-tabs" data-options="fit:true,border:true"></div>');
		$('#tab-main').tabs({
			fit:true,
			border:false
		});
		getSysDate();
		shuzhi = roleId;
	}
}


/**
 * 判断加载首页内容
 */
function judgeFirstpagecontent(){
	if(roleId==0||rolename.indexOf('管理员')>=0){
		pagefirst='/pages/system/sysSqlLog.jsp?funcId=-11&roleId=0';
	}
	else{
		pagefirst='pages/despages/showPages/zhny_screenPage.jsp';
	}
}

/**
 * 动态切换div的样式,并重新赋值退出链接
 */
function divcss(){
	
	var maintitlebackgroundimage={
			position: 'absolute',
			display: 'inline-block',
			top: '20px',
			left: '20px',
			width: '420px',
			height: '46px',
			background:'url('+webContextRoot+'/images/main-title.png) no-repeat'
	};
	var maintitlecnbackgroundimage={
			position: 'absolute',
	        display: 'inline-block',
	        top: '20px',
	        left: '0px',
	        width: '420px',
	        height: '46px',
	        background:'url('+webContextRoot+'/images/main-title-cn.png) no-repeat'
	};
	
//	if(rolename.indexOf('储能并网互动平台')==0){
//		$("#main-title-first").css(maintitlecnbackgroundimage);
//		$("#cnbwhdpt").attr("href","/des/pages/system/login_cn.jsp");
//		
//	}else{
		$("#main-title-first").css(maintitlebackgroundimage);
		$("#cnbwhdpt").attr("href","/des/pages/system/login.jsp");
//	}
};

/**
 * 弹出修改密码框
 */
function updatemmgl(){
	$('#xiugaimima').css('display','block');
	$('#mmxg').dialog('open');//弹出界面显示
	$('#mmxg').dialog('setTitle','密码修改');
	$("#oldpwd").textbox("setValue",'');
	$("#newpwd").textbox("setValue",'');
	$("#affnewpwd").textbox("setValue",'');
	var data=['newpwdimg1','newpwdimg2','oldpwdimg1','oldpwdimg2','affnewpwdimg1','affnewpwdimg2'];
	for(var i=0;i<data.length;i++){
		$('#'+data[i]).css('display','none');
	}
	var date=new Date();
	var endDate=endFromDate(date);
	$('#pwdendtime').datebox('setValue',endDate);
}


/**
 * 修改密码前，数据验证
 */
function updatePassword(){
	
	var oldpwd=$('#oldpwd').val();
	var newpwd=$('#newpwd').val();
	var affnewpwd=$('#affnewpwd').val();
//	var pwdendtime=$('#pwdendtime').datetimebox('getValue');
	if(oldpwd==''){
		$.messager.alert('提示', "旧密码为空!", 'warning');
	}else if(newpwd ==''){
		$.messager.alert('提示', "新密码为空!", 'warning');
	}else if(newpwd != affnewpwd){
		$.messager.alert('提示', "两次密码不一致!", 'warning');
	}else{
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
function updatepwd(oldpwd,newpwd,pwdendtime){
	$.ajax({	
		url:webContextRoot+ 'rendsMenu/updatePassword.action', 
		dataType:'json',
		type:'post',
		data:{
			'userId' : userId, 
			'modifyUserinfo.password' :oldpwd,
			'modifyUserinfo.newPassword' : newpwd,
			'modifyUserinfo.passwordDate' : pwdendtime,
		},
		success:function(data){
			var saveSUCCESS=data.saveSUCCESS;
			if (saveSUCCESS == "true") {
				$.messager.alert('确认', "保存成功！", 'info', function(r) {
					$('#mmxg').dialog('close');//关闭窗口
				});
			}else{
				$.messager.alert('确认', "保存失败!", 'warning');// 移除失败
			}
		},
		error:function(result){
			alert('ajax error');
		}
	});
}

/**
 * 判断原始密码是否正确
 * 
 */
function checkingOldpwd(){
//	$("#oldpwd").textbox("textbox").blur(function(){
		var oldpwd=$('#oldpwd').val();
		var newpwd=$('#newpwd').val();
		var affnewpwd=$('#affnewpwd').val();
		var pwdendtime=$('#pwdendtime').datetimebox('getValue');
		$.ajax({	
			url:webContextRoot+ 'rendsMenu/checkingPassword.action', 
			dataType:'json',
			type:'post',
			data:{
				'userId' : userId, //
				'modifyUserinfo.password' :oldpwd,
			},
			success:function(data){
				var saveSUCCESS=data.saveSUCCESS;
				if (saveSUCCESS == "true") {
					isOldpwd=true;
					$('#oldpwdimg1').css('display','none');
					$('#oldpwdimg2').css('display','block');
					if(isOldpwd && newpwd == affnewpwd && newpwd !=''){
						updatepwd(oldpwd,newpwd,pwdendtime); 
						//alert("修改密码测试成功");
					}
				}else{
					isOldpwd=false;
					$('#oldpwdimg2').css('display','none');
					$('#oldpwdimg1').css('display','block');
					$.messager.alert('提示', "旧密码不正确!", 'warning');
				}
			},
			error:function(result){
				alert('ajax error');
			}
		});
//	});
}



/**
 * 日期格式
 */
function endFromDate(date) {

	var currDate=new Date(date);
	currDate = new Date(currDate.getFullYear(), (currDate.getMonth()) + 1, currDate.getDate(), 
			currDate.getHours(), currDate.getMinutes(), currDate.getSeconds());
	var lastdate= FromDate("yyyy-MM-dd",currDate);
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
	var url =  webContextRoot + '/pages/system/help.jsp?itemCode='+itemCode+'&itemName='+itemName; 
	helpWindow = window.open(url,'_blank','resizable=no,status=no,scrollbar-x=no,width=900,height=700');
	

}	
helpWindow = null;
function FromDate(formatStr, date){
	formatStr = arguments[0] || "yyyy-MM-dd HH:mm:ss";
	date = arguments[1] || new Date();
    var str = formatStr;   
    var Week = ['日','一','二','三','四','五','六'];  
    str=str.replace(/yyyy|YYYY/,date.getFullYear());   
    str=str.replace(/yy|YY/,(date.getYear() % 100)>9?(date.getYear() % 100).toString():'0' + (date.getYear() % 100));   
    str=str.replace(/MM/,date.getMonth()>9?(date.getMonth() + 1):'0' + (date.getMonth() + 1));   
    str=str.replace(/M/g,date.getMonth());   
    str=str.replace(/w|W/g,Week[date.getDay()]);   
  
    str=str.replace(/dd|DD/,date.getDate()>9?date.getDate().toString():'0' + date.getDate());   
    str=str.replace(/d|D/g,date.getDate());   
  
    str=str.replace(/hh|HH/,date.getHours()>9?date.getHours().toString():'0' + date.getHours());   
    str=str.replace(/h|H/g,date.getHours());   
    str=str.replace(/mm/,date.getMinutes()>9?date.getMinutes().toString():'0' + date.getMinutes());   
    str=str.replace(/m/g,date.getMinutes());   
  
    str=str.replace(/ss|SS/,date.getSeconds()>9?date.getSeconds().toString():'0' + date.getSeconds());   
    str=str.replace(/s|S/g,date.getSeconds());   
  
    return str;   
}


var panelArr = [];

function newNotice(){//新闻公告提示
		$.get(webContextRoot+ 'gdtjfx/selectCeInfoNews.action', 
			{
			 'newUserModel.usrId' : loginUserId
			},
			function(data){
				rs = eval("("+data+")");//转换成object
				var newlength = rs.length;//新的消息数量
				clearTimeout(clearTimeoutFlag);
				var shownText="";
//		 	   var ssi = setTimeout(function () {
		        
//			   
		        
				for(var k=0;k<newlength;k++){
					shownText=rs[k].newsTypeName+":";
					shownText+=rs[k].newsName;
					
					var options = {
			            containerDom: document.getElementById('tip-panel-container'),
	       	            width: 400,
	       	            panelTitle: '新闻公告',
			            panelContent: '<p style="margin: 20px auto;height: 40px;"><a style="color:blue;" href="#" onclick="queryNewsDes('+rs[k].newsId+','+rs[k].usrId+','+k+')">'+shownText+'</a></p>'
			        };
			        var panel = new popPanel(options);
			        panel.open();
			        panelArr.push(panel);
				}
				
			
			});
}

//点击进入新闻
function queryNewsDes(newsId,usrId,panelKey){

	//修改新闻状态
	$.getJSON(webContextRoot + 'gdtjfx/updateCeInfoNews.action',
			{ 
				'newUserModel.newsId' : newsId,
				'newUserModel.usrId' : usrId,
				'newUserModel.ifSee' : 1
			},
			function(json){
				 if(json.saveSUCCESS=="false")
				    {
					   $.messager.alert('确认', "新闻查看状态修改失败！", 'warning');//移除失败
				    }
			    	 
			}
		);
	
	
	var content = "<iframe src='"+webContextRoot+"pages/despages/warn/newsNoticePop.jsp?newsId="+newsId+"' width='100%' height='99%' frameborder='0' scrolling='no'/>";
	var boarddiv = "<div id='msgwindow' title='详情'/>";
	$(document.body).append(boarddiv);
	var win = $("#msgwindow").dialog({
		content : content,
		width : document.body.clientWidth-160,
		height : document.body.clientHeight-160,
		maximizable:true,
		closable:true,
		modal : 'shadow',
		title : '新闻信息',
	});
	win.dialog('open');
	
	for(var i = 0;i<panelArr.length;i++){
		if(i==panelKey){
			panelArr[i].close();
			break;
		}
	}
}