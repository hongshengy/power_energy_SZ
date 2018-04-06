var parentFrame = this.parent;

var consId = null;

var menuList = [
 //   '平台介绍',
 //   '系统架构',
//    '运行概览',
//    '客户地图',
//    '数据总览'
];

function initMenu(type){
	$('#menuTop').html('');
//	var homeDiv = $('<div></div>').addClass('meunTop_home').appendTo($('#menuTop'));
//	$('<img />').attr('src', 'pages/despages/showPages/images/home.png').appendTo(homeDiv);
	
	$.each(menuList, function(i,n){
		
		var menuDiv = $('<div></div>').appendTo($('#menuTop'));
		
//		if (i != 2){
			
		menuDiv.addClass('menuTop_menuItem');
		
		var imgDiv = $('<div></div>').css({
			'width' : '40px',
			'height' : '40px',
			'margin' : '0 auto'
		}).click( function () {
			if (!canClick){
				return;
			}
			
			if (i == 2){
				$('#searchBtn').animate({ opacity: '1' }, 1000);
			}else{
				$('#searchBtn').animate({ opacity: '0' }, 1000);
			}
			
			canClick = false;
            nextPage(61, i);
            initMenu('menu');
        }).appendTo(menuDiv);
		
		var menuImg = $('<img />').css({
			'width' : '40px',
			'height' : '40px'
		}).appendTo(imgDiv);
		
		switch(i){
		case 0:
			if (i == current){
				menuImg.attr('src', imagePath + '/01_hover.png');
			}else{
				menuImg.attr('src', imagePath + '/01_normal.png');
			}
			break;
		case 1:
			if (i == current){
				menuImg.attr('src', imagePath + '/02_hover.png');
			}else{
				menuImg.attr('src', imagePath + '/02_normal.png');
			}
			break;
		case 2:
			if (i == current){
				menuImg.attr('src', imagePath + '/03_hover.png');
			}else{
				menuImg.attr('src', imagePath + '/03_normal.png');
			}
			break;
		case 3:
			if (i == current){
				menuImg.attr('src', imagePath + '/04_hover.png');
			}else{
				menuImg.attr('src', imagePath + '/04_normal.png');
			}
			break;
		};
		
		if (i == current){
			menuDiv.css({
				'color' : '#007d82'
			});
		}else{
			menuDiv.css({
				'color' : '#999999'
			});
		}
		
		$('<div><span>' + n + '</span></div>').addClass('txt_div').click( function () {
			if (!canClick){
				return;
			}
			
			if (i == 2){
				$('#searchBtn').animate({ opacity: '1' }, 1000);
			}else{
				$('#searchBtn').animate({ opacity: '0' }, 1000);
			}
			
			canClick = false;
            nextPage(61, i);
            initMenu('menu');
        }).appendTo(menuDiv);
		
//		$('<div></div>').addClass('line_div').css({
//			'display' : (i != current ? 'none' : 'block')
//		}).appendTo(menuDiv);
//		}
//	else{
//			
//			menuDiv.css({
//				'position': 'absolute',
//				'right': '60px',
//				'top': '30px',
//				'cursor': 'pointer'
//			});
//			
//			var menuImg = $('<img />').css({
//				'width' : '30px',
//				'height' : '30px',
//				'float': 'left',
//				'margin-top': '2px'
//			}).appendTo(menuDiv);
//			menuImg.attr('src', imagePath + '/pageFive/img_10.png');
//			
//			menuDiv.click( function () {
//				parentFrame.nextPage(61, i);
//	        }).appendTo($('#menuTop'));
//		}
	});
	
	$('#menuTop').animate({ opacity: '1' }, 1000);
	
}

initMenu();

//搜索按钮点击
function searchEvent(e){
	if (e == 'click' || e.keyCode == 13) {
		var key = $('#searchInput').val();
		$.ajax({
			type: "post",
			url: basePath + "/bigScreen/bigScreenQueryConsName.action?key=" + key,
			data: "",
			dataType:"json",
			cache : false,
			async : true,//同步异步请求
			success: function(result)
			{	
				if (result.userNameList.length > 0){
//					alert(result.userNameList[0].CONSID);
					var options = {
						name : 'desyhbjk',
						text : '一次图',          //打开菜单的标题,可修改
				        path: basePath + 'pages/despages/monitor/userMonitor.jsp?consId=' + result.userNameList[0].CONSID
				    };
					parentFrame.reloadTabPage(options);
				}else{
					$.messager.alert('错误','不存在此用户！');
				}
			},
			error:function(e)
			{
				$.messager.alert('错误','bigScreenQueryConsName.action请求错误码：' + e.readyState);
			}
		});
	}
}

function getResult(){
	var key = $('#searchInput').val();
	if (key.length > 0){
		$.ajax({
			type: "post",
			url: basePath + "/bigScreen/bigScreenQueryConsName.action?key=" + key,
			data: "",
			dataType:"json",
			cache : false,
			async : true,//同步异步请求
			success: function(result)
			{	
				$('#searchResultUl').html('');
				if (result.userNameList.length > 0){
					$.each(result.userNameList, function(i, n){
						$('<li style="height: 30px;padding-left: 20px;padding-top: 4px;cursor: pointer;"><span>' + n.CONSNAME + '</span></li>').click(function(){
							$('#searchResult').animate({ opacity: '0' }, 400);
							setTimeout(function(){
								$('#searchResult').css({
									'display' : 'none'
								});
							}, 400);
							$('#searchInput').val(n.CONSNAME);
							consId = n.CONSID;
						}).appendTo($('#searchResultUl'));
					});
					$('#searchResult').css({
						'display' : 'block'
					});
					$('#searchResult').animate({ opacity: '1' }, 400);
				}else{
					$('#searchResult').animate({ opacity: '0' }, 400);
					setTimeout(function(){
						$('#searchResult').css({
							'display' : 'none'
						});
					}, 400);
				}
			},
			error:function(e)
			{
				$.messager.alert('错误','bigScreenQueryConsName.action请求错误码：' + e.readyState);
			}
		});
	}else {
		$('#searchResult').animate({ opacity: '0' }, 400);
		setTimeout(function(){
			$('#searchResult').css({
				'display' : 'none'
			});
		}, 400);
	}
}

function resultSelect(e){
	$('#searchInput').val($(e.target).text());
}

$('#searchBtn').hover(
	function (){
		
	},
	function (){
		$('#searchResult').animate({ opacity: '0' }, 400);
		setTimeout(function(){
			$('#searchResult').css({
				'display' : 'none'
			});
		}, 400);
	}
);