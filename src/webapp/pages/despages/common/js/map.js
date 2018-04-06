/**
 * 百度地图相关操作 Created by 张凡 on 2017/3/16
 * 
 */
var map = function() {
	// 信息窗口样式
	var infoWindowOpts = {
		// 信息窗口宽度
		width : 280,
		// 信息窗口高度
		height : 280
	};

	// 区域中心信息窗口样式
	var centerInfoWindowOpts = {
		// 信息窗口宽度
		width : 400,
		// 信息窗口高度
		height : 300
	};
	// 视野预留边距
	// var viewportOpts = {
	// margins : [ 0, 50, 0, 0 ]
	// };
	// 企业标注点数组
	var qyMarkers = [];
	// 变电站标注点数组
	var bdzMarkers = [];
	// 企业点击事件
	var qyClicks = [];
	// 企业鼠标移到标注点上事件
	var qyMouseovers = [];
	// 企业鼠标离开标注点上事件
	var qyMouseouts = [];
	// 变电站点击事件
	var bdzClicks = [];
	// 变电站鼠标移到标注点上事件
	var bdzMouseovers = [];
	// 变电站鼠标离开标注点上事件
	var bdzMouseouts = [];
	// 客户弹窗内容
	var khContents = [];
	// // 变电站标识checkbox
	// var bdzFlag = true;
	// 客户正常标识checkbox
	var khNormalFlag = true;
	// 客户告警标识checkbox
	var khWarningFlag = true;
	// 变电站正常标识checkbox
	var bdzNormalFlag = true;
	// 变电站告警标识checkbox
	var bdzWarningFlag = true;
	// 点聚合用添加标注点数组
	var caMarkers = [];
	// 点聚合用删除标注点数组
	var cdMarkers = [];
	// 百度点聚合类
	var markerClusterer;

	// json解析
	function analyzeJSON(data) {
		return jQuery.parseJSON(data);
	}

	// 企业正常标注点添加事件
	function addqyClickHandlerNormal(mp, clickContent, mouseOverContent,
			marker, i) {
		// 添加点击事件
		qyClicks[i] = function(e) {
			openInfo(mp, clickContent, infoWindowOpts, e);
		};
		marker.addEventListener("click", qyClicks[i]);

		// 添加鼠标在标注点上事件
		qyMouseovers[i] = function(e) {
			var label = new BMap.Label(mouseOverContent, {
				offset : new BMap.Size(20, -10)
			});
			label.setStyle({
				fontSize : "8px",
				border : "0",
				fontWeight : "bold"
			});
			marker.setLabel(label);
		};
		marker.addEventListener("mouseover", qyMouseovers[i]);

		// 添加离开标注时事件
		qyMouseouts[i] = function(e) {
			mp.removeOverlay(marker.getLabel());
		};
		marker.addEventListener("mouseout", qyMouseouts[i]);
	}

	// 企业告警标注点添加事件
	function addqyClickHandlerWarning(mp, clickContent, mouseOverContent,
			marker, i) {
		// 添加鼠标在标注点上事件
		qyMouseovers[i] = function(e) {
			openInfo(mp, clickContent, infoWindowOpts, e);
		};
		marker.addEventListener("mouseover", qyMouseovers[i]);
	}

	// 变电站正常标注点添加事件
	function addbdzClickHandlerNormal(mp, clickContent, mouseOverContent,
			marker, i) {
		// 添加点击事件
		bdzClicks[i] = function(e) {
			openInfo(mp, clickContent, infoWindowOpts, e);
		};
		marker.addEventListener("click", bdzClicks[i]);

		// 添加鼠标在标注点上事件
		bdzMouseovers[i] = function(e) {
			var label = new BMap.Label(mouseOverContent, {
				offset : new BMap.Size(20, -10)
			});
			label.setStyle({
				fontSize : "8px",
				border : "0",
				fontWeight : "bold"
			});
			marker.setLabel(label);
		};
		marker.addEventListener("mouseover", bdzMouseovers[i]);

		// 添加离开标注时事件
		bdzMouseouts[i] = function(e) {
			mp.removeOverlay(marker.getLabel());
		};
		marker.addEventListener("mouseout", bdzMouseouts[i]);
	}

	// 变电站告警标注点添加事件
	function addbdzClickHandlerWarning(mp, clickContent, mouseOverContent,
			marker, i) {
		// 添加鼠标在标注点上事件
		bdzMouseovers[i] = function(e) {
			openInfo(mp, clickContent, infoWindowOpts, e);
		};
		marker.addEventListener("mouseover", bdzMouseovers[i]);
	}

	// 信息窗口打开
	function openInfo(mp, content, windowOpts, e) {
		var p = e.target;
		var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
		// 创建信息窗口对象
		var infoWindow = new BMap.InfoWindow(content, windowOpts);
		// 开启信息窗口
		mp.openInfoWindow(infoWindow, point);
	}
	
	// 大屏标注点添加事件
	function bigScreenAddClickHandler(mp, consId, consName, mouseOverContent,
			marker) {
		// 添加点击事件
			marker.addEventListener("click", function() {
				forJumpKhjk(consId, consName);
			});	

		// 添加鼠标在标注点上事件
		marker.addEventListener("mouseover", function() {
			var label = new BMap.Label(mouseOverContent, {
				offset : new BMap.Size(20, -10)
			});
			label.setStyle({
				fontSize : "18px",
				border : "0",
				fontWeight : "bold"
			});
			marker.setLabel(label);
		});

		// 添加离开标注时事件
		marker.addEventListener("mouseout",  function() {
			mp.removeOverlay(marker.getLabel());
		});
	}

	// 标注点加载
	function addPoint(mp, mapObj) {

		// 循环加载标注点
		// 标注点数组
		var points = [];

		// 企业正常图片
		var qyNormalIcon = new BMap.Icon(webContextRoot
				+ "pages/despages/common/images/gis-qy-normal.png",
				new BMap.Size(28, 48));
		// 企业警告图片
		var qyWarningIcon = new BMap.Icon(webContextRoot
				+ "pages/despages/common/images/gis-qy-warning.png",
				new BMap.Size(28, 48));
		// 变电站正常图片
		var bdzNormalIcon = new BMap.Icon(webContextRoot
				+ "pages/despages/common/images/gis-bdz-normal.png",
				new BMap.Size(28, 28));
		// 变电站警告图片
		var bdzWarningIcon = new BMap.Icon(webContextRoot
				+ "pages/despages/common/images/gis-bdz-warning.png",
				new BMap.Size(28, 28));
		// 标注点对象
		var marker;
		// 点对象
		var point;
		// 弹窗内容
		var clickContent;
		// 浮动窗内容
		var mouseOverContent;

		// 企业标注点添加
		for (var i = 0; i < mapObj.cons_info.length; i++) {
			clickContent = '<div><div class="td-map-title">'
					+ mapObj.cons_info[i].cons_name
					+ '</div><div><table style="border-top: 1px dashed #ddddc4;"><tbody>';
			mouseOverContent = '<div><span class="td-map-value">'
					+ mapObj.cons_info[i].cons_name + '</span></div>';
			// 根据是否有告警，添加不同内容
			if (mapObj.cons_info[i].warning_num > 0) {
				// clickContent = clickContent
				// + '<tr><td class="td-map-label">告警数：</td><td
				// class="td-map-value">'
				// + mapObj.cons_info[i].warning_num + '</td></tr>';
				// mouseOverContent = mouseOverContent + "告警数：" +
				// mapObj.cons_info[i].warning_num;
				// 引用图片
				// 创建标注
				point = new BMap.Point(mapObj.cons_info[i].x,
						mapObj.cons_info[i].y);
				marker = new BMap.Marker(point, {
					icon : qyWarningIcon
				});
				points[i] = point;
			} else {
				// 创建标注
				point = new BMap.Point(mapObj.cons_info[i].x,
						mapObj.cons_info[i].y);
				marker = new BMap.Marker(point, {
					icon : qyNormalIcon
				});
				points[i] = point;
			}
			// 标注点企业id
			marker.cons_id = mapObj.cons_info[i].cons_id;
			// 标注点企业编号
			marker.cons_no = mapObj.cons_info[i].cons_no;
			// 标注点经度
			marker.x = mapObj.cons_info[i].x;
			// 标注点纬度
			marker.y = mapObj.cons_info[i].y;
			// 标注点警告数
			marker.warning_num = mapObj.cons_info[i].warning_num;
			// 标注点名称
			marker.cons_name = mapObj.cons_info[i].cons_name;
			// 标注点地址
			marker.elec_addr = mapObj.cons_info[i].elec_addr;
			// 标注点合同容量
			marker.contract_cap = mapObj.cons_info[i].contract_cap;
			// 标注点电压等级
			marker.volt_value = mapObj.cons_info[i].volt_value;
			// 标注点联系人
			marker.contact_name = mapObj.cons_info[i].contact_name;
			// 标注点联系电话
			marker.telephone = mapObj.cons_info[i].telephone;

			clickContent = clickContent
					+ '<tr><td class="td-map-label">客户编号：</td><td class="td-map-value">'
					+ mapObj.cons_info[i].cons_no
					+ '</td></tr>'
					+ '<tr><td class="td-map-label">地址：</td><td class="td-map-value">'
					+ mapObj.cons_info[i].elec_addr
					+ '</td></tr>'
					+ '<tr><td class="td-map-label">合同容量：</td><td class="td-map-value">'
					+ mapObj.cons_info[i].contract_cap
					+ 'kVA</td></tr>'
					+ '<tr><td class="td-map-label">电压等级：</td><td class="td-map-value">'
					+ mapObj.cons_info[i].volt_value
					+ '</td></tr>'
					+ '<tr><td class="td-map-label">联系人：</td><td class="td-map-value">'
					+ mapObj.cons_info[i].contact_name
					+ '</td></tr>'
					+ '<tr><td class="td-map-label">联系电话：</td><td class="td-map-value">'
					+ mapObj.cons_info[i].telephone
					+ '<tr><td class="td-map-label">&nbsp;</td><td class="td-map-value-button">'
					+ '<a class="c9 shadow l-btn l-btn-small" style="width: 60px; height: 20px;" href="#" onclick="forJumpyhbByqy('
					+ mapObj.cons_info[i].cons_id
					+ ');">'
					+ '<span class="l-btn-left" style="margin-top: -2px;"><span class="l-btn-text">一次图</span></span></a>&nbsp;'
					+ '<a class="c9 shadow l-btn l-btn-small" style="width: 60px; height: 20px;"  href="#" onclick="forJumpKhjk('
					+ mapObj.cons_info[i].cons_id
					+ ',\''
					+ mapObj.cons_info[i].cons_name
					+ '\');">'
					+ '<span class="l-btn-left" style="margin-top: -2px;"><span class="l-btn-text">客户视图</span></span></a>'
					+ '</td></tr>'
					+ '</tbody></table></div>'
					+ '<div><table style="border-top: 1px dashed #ddddc4;"><tbody>'
					+ '<tr><td class="td-label-realtime"><a onclick="khRealTimeFh('
					+ mapObj.cons_info[i].cons_id
					+ ', 1);" href="#">实时负荷(kW)</a></td>'
					+ '<td class="td-label-realtime"><a onclick="xsData('
					+ mapObj.cons_info[i].cons_id
					+ ', 1);" href="#">实时电量(kWh)</a></td>'
					+ '<td class="td-label-realtime">告警数</td></tr>'
					+ '<tr><td class="td-label-realtime-num">'
					+ mapObj.cons_info[i].realtime_fh + '</td>'
					+ '<td class="td-label-realtime-num">'
					+ mapObj.cons_info[i].realtime_dl + '</td>'
					+ '<td class="td-label-realtime-num">'
					+ mapObj.cons_info[i].warning_num
					+ '</td></tr></tbody></table></div>' + '</div>';

			mouseOverContent = mouseOverContent + "</div>";
			// 记录弹窗内容
			khContents[i] = clickContent;

			// 将标注添加到地图中
			if (mapObj.cons_info[i].x > 0 && mapObj.cons_info[i].y > 0) {
				// 添加到地图
				// mp.addOverlay(marker);
				// 添加到点聚合数组
				caMarkers.push(marker);
				if (mapObj.cons_info[i].warning_num > 0) {
					addqyClickHandlerWarning(mp, clickContent,
							mouseOverContent, marker, i);
					//告警点跳动
					marker.setAnimation(BMAP_ANIMATION_BOUNCE);
				} else {
					addqyClickHandlerNormal(mp, clickContent, mouseOverContent,
							marker, i);
					//标注点取消跳动
					marker.setAnimation(null);
				}
			}
			 
			// 标注点标题
			// marker.setTitle(mapObj.cons_info[i].title);

			// 给标注添加事件
			// var dblclickContent = "<a
			// href='#'>跳转到"+mapObj.cons_info[i].title+"监控页面</a>";

			// 记录标注点对象
			qyMarkers[i] = marker;
		}

		// 用户变标注点添加
		for (var i = 0; i < mapObj.subs_info.length; i++) {
			clickContent = '<div><div class="td-map-title">'
					+ mapObj.subs_info[i].subs_name
					+ '</div><div><table><tbody>';
			mouseOverContent = '<div><span class="td-map-value">'
					+ mapObj.subs_info[i].subs_name + '</span></div>';
			// 根据是否有告警，添加不同内容
			if (mapObj.subs_info[i].warning_num > 0) {
				// clickContent = clickContent
				// + '<tr><td class="td-map-label">告警数：</td><td
				// class="td-map-value">'
				// + mapObj.subs_info[i].warning_num + '</td></tr>';
				// 引用图片
				// 创建标注
				point = new BMap.Point(mapObj.subs_info[i].x,
						mapObj.subs_info[i].y);
				marker = new BMap.Marker(point, {
					icon : bdzWarningIcon
				});
				points[i] = point;
			} else {
				// 创建标注
				point = new BMap.Point(mapObj.subs_info[i].x,
						mapObj.subs_info[i].y);
				marker = new BMap.Marker(point, {
					icon : bdzNormalIcon
				});
				points[i] = point;
			}
			// 标注点企业id
			marker.cons_id = mapObj.subs_info[i].cons_id;
			// 标注点变电站id
			marker.subs_id = mapObj.subs_info[i].subs_id;
			// 标注点经度
			marker.x = mapObj.subs_info[i].x;
			// 标注点纬度
			marker.y = mapObj.subs_info[i].y;
			// 标注点警告数
			marker.warning_num = mapObj.subs_info[i].warning_num;
			// 标注点变电站名称
			marker.subs_name = mapObj.subs_info[i].subs_name;
			// 标注点企业名称
			marker.cons_name = mapObj.subs_info[i].cons_name;
			// 标注点主变总数
			marker.trans_count = mapObj.subs_info[i].trans_count;
			// 标注点主变总容量
			marker.plate_cap_all = mapObj.subs_info[i].plate_cap_all;
			// 标注点降压层级
			marker.subs_level = mapObj.subs_info[i].subs_level;
			// 标注点电压等级
			marker.volt_value = mapObj.subs_info[i].volt_value;

			clickContent = clickContent
					+ '<tr><td class="td-map-label">所属客户：</td><td class="td-map-value">'
					+ mapObj.subs_info[i].cons_name
					+ '</td></tr>'
					+ '<tr><td class="td-map-label">主变总数：</td><td class="td-map-value">'
					+ mapObj.subs_info[i].trans_count
					+ '</td></tr>'
					+ '<tr><td class="td-map-label">主变总容量：</td><td class="td-map-value">'
					+ mapObj.subs_info[i].plate_cap_all
					+ 'kVA</td></tr>'
					+ '<tr><td class="td-map-label">降压层级：</td><td class="td-map-value">'
					+ mapObj.subs_info[i].subs_level
					+ '级</td></tr>'
					+ '<tr><td class="td-map-label">电压等级：</td><td class="td-map-value">'
					+ mapObj.subs_info[i].volt_value
					+ '</td></tr>'
					+ '<tr><td class="td-map-label">&nbsp;</td><td class="td-map-value-button">'
					+ '<a class="c9 shadow l-btn l-btn-small" style="width: 63px; height: 20px;" href="#" onclick="forJumpyhbBybdz('
					+ mapObj.subs_info[i].cons_id
					+ ','
					+ mapObj.subs_info[i].subs_id
					+ ');"><span class="l-btn-left" style="margin-top: -2px;"><span class="l-btn-text">一次图</span></span></a>'
					+ '</td></tr></tbody></table></div>'
					+ '<div><table style="border-top: 1px dashed #ddddc4;"><tbody>'
					+ '<tr><td class="td-label-realtime"><a onclick="khRealTimeFh('
					+ mapObj.subs_info[i].subs_id
					+ ', 2);" href="#">实时负荷(kW)</a></td>'
					+ '<td class="td-label-realtime"><a onclick="xsData('
					+ mapObj.subs_info[i].subs_id
					+ ', 2);" href="#">实时电量(kWh)</a></td>'
					+ '<td class="td-label-realtime">告警数</td></tr>'
					+ '<tr><td class="td-label-realtime-num">'
					+ mapObj.subs_info[i].realtime_fh + '</td>'
					+ '<td class="td-label-realtime-num">'
					+ mapObj.subs_info[i].realtime_dl + '</td>'
					+ '<td class="td-label-realtime-num">'
					+ mapObj.subs_info[i].warning_num
					+ '</td></tr></tbody></table></div>' + '</div>';

			mouseOverContent = mouseOverContent + "</div>";

			// 将标注添加到地图中
			if (mapObj.subs_info[i].x > 0 && mapObj.subs_info[i].y > 0) {
				// 添加到地图
				//mp.addOverlay(marker);
				// 添加到点聚合数组
				caMarkers.push(marker);
				if (mapObj.subs_info[i].warning_num > 0) {
					addbdzClickHandlerWarning(mp, clickContent,
							mouseOverContent, marker, i);
					//告警点跳动
					marker.setAnimation(BMAP_ANIMATION_BOUNCE);
				} else {
					addbdzClickHandlerNormal(mp, clickContent,
							mouseOverContent, marker, i);
					//标注点取消跳动
					marker.setAnimation(null);
				}
			}

			// 记录标注点对象
			bdzMarkers[i] = marker;
		}

		// 初始化点聚合
		markerClusterer = new BMapLib.MarkerClusterer(mp, {markers: caMarkers,minClusterSize: 3});
		
		// 根据标注点显示地图
		// mp.setViewport(points, viewportOpts);
	}

	// 标注点刷新
	function refreshPoint(mp, mapObj) {
		// 企业正常图片
		var qyNormalIcon = new BMap.Icon(webContextRoot
				+ "pages/despages/common/images/gis-qy-normal.png",
				new BMap.Size(28, 48));
		// 企业警告图片
		var qyWarningIcon = new BMap.Icon(webContextRoot
				+ "pages/despages/common/images/gis-qy-warning.png",
				new BMap.Size(28, 48));
		// 变电站正常图片
		var bdzNormalIcon = new BMap.Icon(webContextRoot
				+ "pages/despages/common/images/gis-bdz-normal.png",
				new BMap.Size(28, 28));
		// 变电站警告图片
		var bdzWarningIcon = new BMap.Icon(webContextRoot
				+ "pages/despages/common/images/gis-bdz-warning.png",
				new BMap.Size(28, 28));

		// 初始化点聚合标注点数组
		caMarkers = [];
		cdMarkers = [];
		
		// 循环更新企业标注点
		for (var i = 0; i < qyMarkers.length; i++) {
			if (qyMarkers[i].x > 0 && qyMarkers[i].y > 0) {
				for (var j = 0; j < mapObj.cons_info.length; j++) {
					if (qyMarkers[i].cons_id == mapObj.cons_info[j].cons_id) {
						// 移除旧事件
						qyMarkers[i].removeEventListener("click", qyClicks[i]);
						// 移除旧事件
						qyMarkers[i].removeEventListener("mouseover",
								qyMouseovers[i]);
						// 移除旧事件
						qyMarkers[i].removeEventListener("mouseout",
								qyMouseouts[i]);

						// 弹窗内容
						var clickContent;
						// 浮动窗内容
						var mouseOverContent;

						clickContent = '<div><div class="td-map-title">'
								+ qyMarkers[i].cons_name
								+ '</div><div><table><tbody>';
						mouseOverContent = '<div><span class="td-map-value">'
								+ qyMarkers[i].cons_name + '</span></div>';

						// 根据是否有告警，添加不同内容
						if (mapObj.cons_info[j].warning_num > 0) {
							// clickContent = clickContent
							// + '<tr><td class="td-map-label">告警数：</td><td
							// class="td-map-value">'
							// + mapObj.cons_info[j].warning_num
							// + '</td></tr>';
							// 更改图标
							qyMarkers[i].setIcon(qyWarningIcon);
						} else {
							// 更改图标
							qyMarkers[i].setIcon(qyNormalIcon);
						}

						clickContent = clickContent
								+ '<tr><td class="td-map-label">客户编号：</td><td class="td-map-value">'
								+ qyMarkers[i].cons_no
								+ '</td></tr>'
								+ '<tr><td class="td-map-label">地址：</td><td class="td-map-value">'
								+ qyMarkers[i].elec_addr
								+ '</td></tr>'
								+ '<tr><td class="td-map-label">合同容量：</td><td class="td-map-value">'
								+ qyMarkers[i].contract_cap
								+ 'kVA</td></tr>'
								+ '<tr><td class="td-map-label">电压等级：</td><td class="td-map-value">'
								+ qyMarkers[i].volt_value
								+ '</td></tr>'
								+ '<tr><td class="td-map-label">联系人：</td><td class="td-map-value">'
								+ qyMarkers[i].contact_name
								+ '</td></tr>'
								+ '<tr><td class="td-map-label">联系电话：</td><td class="td-map-value">'
								+ qyMarkers[i].telephone
								+ '<tr><td class="td-map-label">&nbsp;</td><td class="td-map-value-button">'
								+ '<a class="c9 shadow l-btn l-btn-small" style="width: 60px; height: 20px;" href="#" onclick="forJumpyhbByqy('
								+ qyMarkers[i].cons_id
								+ ');">'
								+ '<span class="l-btn-left" style="margin-top: -2px;"><span class="l-btn-text">一次图</span></span></a>&nbsp;'
								+ '<a class="c9 shadow l-btn l-btn-small" style="width: 60px; height: 20px;"  href="#" onclick="forJumpKhjk('
								+ qyMarkers[i].cons_id
								+ ',\''
								+ qyMarkers[i].cons_name
								+ '\');">'
								+ '<span class="l-btn-left" style="margin-top: -2px;"><span class="l-btn-text">客户视图</span></span></a>'
								+ '</td></tr>'
								+ '</tbody></table></div>'
								+ '<div><table style="border-top: 1px dashed #ddddc4;"><tbody>'
								+ '<tr><td class="td-label-realtime"><a onclick="khRealTimeFh('
								+ qyMarkers[i].cons_id
								+ ', 1);" href="#">实时负荷(kW)</a></td>'
								+ '<td class="td-label-realtime"><a onclick="xsData('
								+ qyMarkers[i].cons_id
								+ ', 1);" href="#">实时电量(kWh)</a></td>'
								+ '<td class="td-label-realtime">告警数</td></tr>'
								+ '<tr><td class="td-label-realtime-num">'
								+ mapObj.cons_info[i].realtime_fh + '</td>'
								+ '<td class="td-label-realtime-num">'
								+ mapObj.cons_info[i].realtime_dl + '</td>'
								+ '<td class="td-label-realtime-num">'
								+ mapObj.cons_info[i].warning_num
								+ '</td></tr></tbody></table></div>' + '</div>';

						mouseOverContent = mouseOverContent + "</div>";
						// 记录弹窗内容
						khContents[i] = clickContent;

						// 给标注添加事件
						if (mapObj.cons_info[j].warning_num > 0) {
							addqyClickHandlerWarning(mp, clickContent,
									mouseOverContent, qyMarkers[i], i);
							//告警点跳动
							qyMarkers[i].setAnimation(BMAP_ANIMATION_BOUNCE);
						} else {
							addqyClickHandlerNormal(mp, clickContent,
									mouseOverContent, qyMarkers[i], i);
							//标注点取消跳动
							qyMarkers[i].setAnimation(null);
						}

						if (qyMarkers[i].warning_num != mapObj.cons_info[j].warning_num) {
							// 根据标注checkbox是否勾选 处理标注点
							if (khNormalFlag == true && khWarningFlag == false) {
								if (mapObj.cons_info[j].warning_num > 0) {
									// 从地图上移除标注点
									//mp.removeOverlay(qyMarkers[i]);
									// 添加进点聚合移除数组
									cdMarkers.push(qyMarkers[i]);
								} else {
									// 往地图上添加标注点
									//mp.addOverlay(qyMarkers[i]);
									// 添加进点聚合添加数组
									caMarkers.push(qyMarkers[i]);
								}
							} else if (khNormalFlag == false && khWarningFlag == true) {
								if (mapObj.cons_info[j].warning_num <= 0) {
									// 从地图上移除标注点
									//mp.removeOverlay(qyMarkers[i]);
									// 添加进点聚合移除数组
									cdMarkers.push(qyMarkers[i]);
								} else {
									// 往地图上添加标注点
									//mp.addOverlay(qyMarkers[i]);
									// 添加进点聚合添加数组
									caMarkers.push(qyMarkers[i]);
								}
							}
						}

						// 标注点标识警告数
						qyMarkers[i].warning_num = mapObj.cons_info[j].warning_num;
					}
				}
			}
		}

		// 循环更新变电站标注点
		for (var i = 0; i < bdzMarkers.length; i++) {
			if (bdzMarkers[i].x > 0 && bdzMarkers[i].y > 0) {
				for (var j = 0; j < mapObj.subs_info.length; j++) {
					if (bdzMarkers[i].subs_id == mapObj.subs_info[j].subs_id) {

						// 移除旧事件
						bdzMarkers[i]
								.removeEventListener("click", bdzClicks[i]);
						// 移除旧事件
						bdzMarkers[i].removeEventListener("mouseover",
								bdzMouseovers[i]);
						// 移除旧事件
						bdzMarkers[i].removeEventListener("mouseout",
								bdzMouseouts[i]);

						// 弹窗内容
						var clickContent;
						// 浮动窗内容
						var mouseOverContent;

						clickContent = '<div><div class="td-map-title">'
								+ bdzMarkers[i].subs_name
								+ '</div><div><table><tbody>';
						mouseOverContent = '<div><span class="td-map-value">'
								+ bdzMarkers[i].subs_name + '</span></div>';

						// 根据是否有告警，添加不同内容
						if (mapObj.subs_info[j].warning_num > 0) {
							clickContent = clickContent
									+ '<tr><td class="td-map-label">告警数：</td><td class="td-map-value">'
									+ mapObj.subs_info[j].warning_num
									+ '</td></tr>';
							// 更改图标
							bdzMarkers[i].setIcon(bdzWarningIcon);
						} else {
							// 更改图标
							bdzMarkers[i].setIcon(bdzNormalIcon);
						}

						// 标注点标识警告数
						bdzMarkers[i].warning_num = mapObj.subs_info[j].warning_num;

						clickContent = clickContent
								+ '<tr><td class="td-map-label">所属客户：</td><td class="td-map-value">'
								+ bdzMarkers[i].cons_name
								+ '</td></tr>'
								+ '<tr><td class="td-map-label">主变总数：</td><td class="td-map-value">'
								+ bdzMarkers[i].trans_count
								+ '</td></tr>'
								+ '<tr><td class="td-map-label">主变总容量：</td><td class="td-map-value">'
								+ bdzMarkers[i].plate_cap_all
								+ 'kVA</td></tr>'
								+ '<tr><td class="td-map-label">降压层级：</td><td class="td-map-value">'
								+ bdzMarkers[i].subs_level
								+ '级</td></tr>'
								+ '<tr><td class="td-map-label">电压等级：</td><td class="td-map-value">'
								+ bdzMarkers[i].volt_value
								+ '</td></tr>'
								+ '<tr><td class="td-map-label">&nbsp;</td><td class="td-map-value-button">'
								+ '<a class="c9 shadow l-btn l-btn-small" style="width: 63px; height: 20px;" href="#" onclick="forJumpyhbBybdz('
								+ bdzMarkers[i].cons_id
								+ ','
								+ bdzMarkers[i].subs_id
								+ ');"><span class="l-btn-left" style="margin-top: -2px;"><span class="l-btn-text">一次图</span></span></a>'
								+ '</td></tr></tbody></table></div>'
								+ '<div><table style="border-top: 1px dashed #ddddc4;"><tbody>'
								+ '<tr><td class="td-label-realtime"><a onclick="khRealTimeFh('
								+ bdzMarkers[i].subs_id
								+ ', 2);" href="#">实时负荷(kW)</a></td>'
								+ '<td class="td-label-realtime"><a onclick="xsData('
								+ bdzMarkers[i].subs_id
								+ ', 2);" href="#">实时电量(kWh)</a></td>'
								+ '<td class="td-label-realtime">告警数</td></tr>'
								+ '<tr><td class="td-label-realtime-num">'
								+ mapObj.subs_info[i].realtime_fh + '</td>'
								+ '<td class="td-label-realtime-num">'
								+ mapObj.subs_info[i].realtime_dl + '</td>'
								+ '<td class="td-label-realtime-num">'
								+ mapObj.subs_info[i].warning_num
								+ '</td></tr></tbody></table></div>' + '</div>';

						mouseOverContent = mouseOverContent + "</div>";

						// 给标注添加事件
						if (mapObj.subs_info[j].warning_num > 0) {
							addbdzClickHandlerWarning(mp, clickContent,
									mouseOverContent, bdzMarkers[i], i);
							//告警点跳动
							bdzMarkers[i].setAnimation(BMAP_ANIMATION_BOUNCE);
						} else {
							addbdzClickHandlerNormal(mp, clickContent,
									mouseOverContent, bdzMarkers[i], i);
							//标注点取消跳动
							bdzMarkers[i].setAnimation(null);
						}

						// 根据标注checkbox是否勾选 处理标注点
						if (bdzMarkers[i].warning_num != mapObj.subs_info[j].warning_num) {
							if (bdzNormalFlag == true
									&& bdzWarningFlag == false) {
								if (mapObj.subs_info[j].warning_num > 0) {
									// 从地图上移除标注点
									//mp.removeOverlay(bdzMarkers[i]);
									// 添加进点聚合移除数组
									cdMarkers.push(bdzMarkers[i]);
								} else {
									// 往地图上添加标注点
									//mp.addOverlay(bdzMarkers[i]);
									// 添加进点聚合添加数组
									caMarkers.push(bdzMarkers[i]);
								}
							} else if (bdzNormalFlag == false
									&& bdzWarningFlag == true) {
								if (mapObj.subs_info[j].warning_num <= 0) {
									// 从地图上移除标注点
									//mp.removeOverlay(bdzMarkers[i]);
									// 添加进点聚合移除数组
									cdMarkers.push(bdzMarkers[i]);
								} else {
									// 往地图上添加标注点
									//mp.addOverlay(bdzMarkers[i]);
									// 添加进点聚合添加数组
									caMarkers.push(bdzMarkers[i]);
								}
							}
						}

					}
				}
			}
		}
		
		// 从点聚合中移除标注点
		markerClusterer.removeMarkers(cdMarkers);
		// 往点聚合中添加标注点
		markerClusterer.addMarkers(caMarkers);
	}

	// 大屏标注点加载
	function bigScreenAddPoint(mp, mapObj) {
		// 企业正常图片
		var qyNormalIcon = new BMap.Icon(basePath
				+ "pages/despages/common/images/gis-qy-normal.png",
				new BMap.Size(28, 48));
		// 变电站正常图片
		var bdzNormalIcon = new BMap.Icon(basePath
				+ "pages/despages/common/images/gis-bdz-normal.png",
				new BMap.Size(28, 28));

		// 标注点对象
		var marker;
		// 点对象
		var point;
		// 浮动窗内容
		var mouseOverContent;
		caMarkers = [];

		// 企业标注点添加
		for (var i = 0; i < mapObj.cons_info.length; i++) {
			mouseOverContent = '<div><span class="td-map-value">'
					+ mapObj.cons_info[i].cons_name + '</span></div>';

			// 创建标注
			point = new BMap.Point(mapObj.cons_info[i].x,
					mapObj.cons_info[i].y);
			marker = new BMap.Marker(point, {
				icon : qyNormalIcon
			});

			mouseOverContent = mouseOverContent + "</div>";

			// 将标注添加到地图中
			if (mapObj.cons_info[i].x > 0 && mapObj.cons_info[i].y > 0) {
				//mp.addOverlay(marker);
				caMarkers.push(marker);
				bigScreenAddClickHandler(mp, mapObj.cons_info[i].cons_id, mapObj.cons_info[i].cons_name, mouseOverContent,
						marker);
			}
		}

		// 用户变标注点添加
		for (var i = 0; i < mapObj.subs_info.length; i++) {
			mouseOverContent = '<div><span class="td-map-value">'
					+ mapObj.subs_info[i].subs_name + '</span></div>';
			
			// 创建标注
			point = new BMap.Point(mapObj.subs_info[i].x,
					mapObj.subs_info[i].y);
			marker = new BMap.Marker(point, {
				icon : bdzNormalIcon
			});

			mouseOverContent = mouseOverContent + "</div>";

			// 将标注添加到地图中
			if (mapObj.subs_info[i].x > 0 && mapObj.subs_info[i].y > 0) {
				//mp.addOverlay(marker);
				caMarkers.push(marker);
				bigScreenAddClickHandler(mp, mapObj.subs_info[i].cons_id, mapObj.subs_info[i].cons_name,
						mouseOverContent, marker);
			}
		}
		
		// 初始化点聚合
		markerClusterer = new BMapLib.MarkerClusterer(mp, {markers: caMarkers,minClusterSize: 3});
	}
	
	// 中心点click事件添加
	function centerClick(mp, marker, data) {
		// 弹窗内容
		var clickContent;

		// div内容拼接
		clickContent = '<div id="center-enterprise-panel" class="enterprise-panel">'
				+ '<div class="td-title">'
				+ data.areaName
				+ '</div>'
				+ '<div class="content">'
				+ '<div class="row row1 clearfix">'
				+ '<div class="col col1">';
		// 区域图片
		if (data.areaPhoto != "") {
			clickContent = clickContent + '<img src="' + webContextRoot
					+ $.trim(data.areaPhoto) + '">';
		}
		clickContent = clickContent + '</div>';
		clickContent = clickContent + '<div class="col col2">';
		// 区域地址
		clickContent = clickContent + '<p><img src="' + webContextRoot
				+ 'pages/despages/common/images/icon_address.png"><span>'
				+ data.address + '</span></p>';
		// 区域电话
		clickContent = clickContent + '<p><img src="' + webContextRoot
				+ 'pages/despages/common/images/icon_phone.png"><span>'
				+ data.telephone + '</span></p>';
		// 区域传真
		if (data.fax == "") {
			clickContent = clickContent
					+ '<p><img src="'
					+ webContextRoot
					+ 'pages/despages/common/images/icon_phone.png"><span></span></p>';
		} else {
			clickContent = clickContent + '<p><img src="' + webContextRoot
					+ 'pages/despages/common/images/icon_phone.png"><span>'
					+ data.fax + '（传真）</span></p>';
		}
		clickContent = clickContent + '</div></div>';
		// 区域简介
		clickContent = clickContent
				+ '<div class="row row2"><table><tr type="font-size: 13px;"><td>简介：</td><td>'
				+ data.areaMemo + '</td></tr></table></div></div></div>';

		// 添加点击事件
		marker.addEventListener("click", function(e) {
			openInfo(mp, clickContent, centerInfoWindowOpts, e);
		});
	}

	return {

		/**
		 * 
		 * gis监控相关地图操作
		 * 
		 */
		// 初始化加载GIS监控地图
		gisInit : function(mp, data) {
			// json解析
			// var mapObj = analyzeJSON(data);
			// var mapObj = data;
			// 地图范围级别
			var map_level;
			// 中心点
			var heart_point;
			// 金坛中心点
			var heart_point_jt;

			if (data.mapLevel == '') {
				// 级别未设置时，默认12
				map_level = 12;
			} else {
				map_level = data.mapLevel;
			}

			if(top.areaNo == '101'){
				map_level = 13;
				// 中心点初始化
				heart_point_jt = new BMap.Point(119.512913,31.72949);
				heart_point = new BMap.Point(data.heartLongitude,
						data.heartLatitude);
				// 地图初始化
				mp.centerAndZoom(heart_point_jt, map_level);
			}else {
				// 中心点初始化
				heart_point = new BMap.Point(data.heartLongitude,
						data.heartLatitude);
				// 地图初始化
				mp.centerAndZoom(heart_point, map_level);
			}
			
			
			// // 金坛中心点
			// mp.centerAndZoom(new BMap.Point(119.624066, 31.755797), 13);
			// // 宜兴中心点
			// mp.centerAndZoom(new BMap.Point(119.818354, 31.398271), 13);

			// 添加中心标注点
			// 标注点图片
			var centerIcon = new BMap.Icon(webContextRoot
					+ "pages/despages/common/images/gis-floor-middle.png",
					new BMap.Size(36, 36));
			// 标注点
			var centerMarker = new BMap.Marker(heart_point, {
				icon : centerIcon
			});

			// 中心点label
			var centerLabel = new BMap.Label(data.areaName, {
				offset : new BMap.Size(20, -10)
			});

			centerLabel.setStyle({
				fontSize : "10px",
				border : "0",
				fontWeight : "bold",
				color : "#046c6d",
				backgroundColor : "transparent"
			});
			centerMarker.setLabel(centerLabel);
			mp.addOverlay(centerMarker);

			// 添加中心点click事件
			centerClick(mp, centerMarker, data);

			// 控件加载
			// 滚轮放大缩小（默认关闭）
			mp.enableScrollWheelZoom();
			// //双击地图放大关闭
			// mp.disableDoubleClickZoom();
			// 地图平移缩放控件
			// mp.addControl(new BMap.NavigationControl({
			// offset : new BMap.Size(20, 80)
			// }));
			mp.addControl(new BMap.NavigationControl());
			// 比例尺控件
			mp.addControl(new BMap.ScaleControl());
			// 缩略地图控件
			mp.addControl(new BMap.OverviewMapControl());
			// 地图类型控件
			// mp.addControl(new BMap.MapTypeControl({
			// mapTypes : [ BMAP_NORMAL_MAP, BMAP_SATELLITE_MAP, BMAP_HYBRID_MAP
			// ],
			// anchor : BMAP_ANCHOR_TOP_LEFT
			// }));
			mp.addControl(new BMap.MapTypeControl({
				mapTypes : [ BMAP_NORMAL_MAP, BMAP_SATELLITE_MAP,
						BMAP_HYBRID_MAP ]
			}));
			// // 添加定位控件
			// var geolocationControl = new BMap.GeolocationControl();
			// geolocationControl.setOffset(new BMap.Size(20, 70));
			// geolocationControl.addEventListener("locationError", function(e)
			// {
			// // 定位失败事件
			// alert(e.message);
			// });
			// mp.addControl(geolocationControl);
			// 路况信息
			var trafficControl = new BMapLib.TrafficControl({
				showPanel : false
			});
			mp.addControl(trafficControl);
			// trafficControl.setAnchor(BMAP_ANCHOR_TOP_LEFT);
			// trafficControl.setOffset(new BMap.Size(20, 300));
			trafficControl.setAnchor(BMAP_ANCHOR_BOTTOM_RIGHT);
			trafficControl.setOffset(new BMap.Size(20, 250));
			// 覆盖区域图层测试
			// mp.addTileLayer(new BMap.PanoramaCoverageLayer());
			// var stCtrl = new BMap.PanoramaControl();
			// stCtrl.setOffset(new BMap.Size(20, 450));
			// stCtrl.setAnchor(BMAP_ANCHOR_BOTTOM_LEFT);
			// mp.addControl(stCtrl);//添加全景控件

			// 添加区域范围折线
			var bdary = new BMap.Boundary();
			if (data.serviceRange != '') {
				bdary.get(data.serviceRange, function(rs) {
					// 行政区域的点有多少个
					var count = rs.boundaries.length;
					if (count === 0) {
						alert('未能获取当前行政区域');
					} else {
						var ply = new BMap.Polygon(rs.boundaries[0], {
							strokeWeight : 2,
							strokeColor : "red",
							fillOpacity : 0.1,
							fillColor : "#45a1ed"
						}); // 建立多边形覆盖物
						mp.addOverlay(ply); // 添加覆盖物
					}
				});
			}
			// //金坛行政区域
			// bdary.get("常州市金坛区", function(rs){
			// //行政区域的点有多少个
			// var count = rs.boundaries.length;
			// if (count === 0) {
			// alert('未能获取当前行政区域');
			// }else{
			// var ply = new BMap.Polygon(rs.boundaries[0], {strokeWeight: 2,
			// strokeColor: "red", fillOpacity: 0.1, fillColor: "#45a1ed"});
			// //建立多边形覆盖物
			// mp.addOverlay(ply); //添加覆盖物
			// }
			// });
			// //宜兴行政区域
			// bdary.get("无锡市宜兴市", function(rs){
			// //行政区域的点有多少个
			// var count = rs.boundaries.length;
			// if (count === 0) {
			// alert('未能获取当前行政区域');
			// }else{
			// var ply = new BMap.Polygon(rs.boundaries[0], {strokeWeight: 2,
			// strokeColor: "red", fillOpacity: 0.1, fillColor: "#45a1ed"});
			// //建立多边形覆盖物
			// mp.addOverlay(ply); //添加覆盖物
			// }
			// });

			// 地图背景色
			var styleJson = '[{"featureType": "land","elementType": "all","stylers": {"color": "#eeeeee"}}]';
			mp.setMapStyle({
				styleJson : styleJson
			});

			// 标注点加载
			addPoint(mp, data);
		},

		// 刷新GIS监控地图
		gisRefresh : function(mp, data) {
			// json解析
			// var mapObj = analyzeJSON(data);
			// var mapObj = data;
	
			// 标注点信息刷新
			refreshPoint(mp, data);
		},
	
			// // 客户标识checkbox change
			// khChange : function(mp, checkedValue) {
			// // 选中
			// if(checkedValue){
			// // 添加客户标注点
			// for (var i = 0; i < qyMarkers.length; i++) {
			// mp.addOverlay(qyMarkers[i]);
			// }
			// // 没选中
			// }else{
			// // 去除客户标注点
			// for (var i = 0; i < qyMarkers.length; i++) {
			// mp.removeOverlay(qyMarkers[i]);
			// }
			// }
			// },
	
			// // 变电站标识checkbox change
			// bdzChange : function (mp, checkedValue) {
			// bdzFlag = checkedValue;
			//			
			// // 选中
			// if(checkedValue){
			// // 添加变电站标注点
			// for (var i = 0; i < bdzMarkers.length; i++) {
			// // 有告警的变电站
			// if(bdzMarkers[i].warning_num > 0){
			// // 告警是否选中
			// if(warningFlag){
			// mp.addOverlay(bdzMarkers[i]);
			// }
			// // 正常的变电站
			// } else {
			// // 正常是否选中
			// if(normalFlag){
			// mp.addOverlay(bdzMarkers[i]);
			// }
			// }
			// }
			// // 没选中
			// }else{
			// // 去除变电站标注点
			// for (var i = 0; i < bdzMarkers.length; i++) {
			// mp.removeOverlay(bdzMarkers[i]);
			// }
			// }
			//			
			// },
	
		// 客户正常标识checkbox change
		khNormalChange : function(mp, checkedValue) {
			khNormalFlag = checkedValue;
			
			// 选中
			if (checkedValue) {
				// 初始化点聚合标注点数组
				caMarkers = [];
				
				for (var i = 0; i < qyMarkers.length; i++) {
					if (qyMarkers[i].warning_num <= 0) {
						//mp.addOverlay(qyMarkers[i]);
						caMarkers.push(qyMarkers[i]);
					}
				}
				// 往点聚合中添加标注点
				markerClusterer.addMarkers(caMarkers);
				
				// 没选中
			} else {
				// 初始化点聚合标注点数组
				cdMarkers = [];
				
				for (var i = 0; i < qyMarkers.length; i++) {
					if (qyMarkers[i].warning_num <= 0) {
						//mp.removeOverlay(qyMarkers[i]);
						cdMarkers.push(qyMarkers[i]);
					}
				}
				// 从点聚合中移除标注点
				markerClusterer.removeMarkers(cdMarkers);
			}
		},

		// 客户告警标识checkbox change
		khWarningChange : function(mp, checkedValue) {
			khWarningFlag = checkedValue;
	
			// 选中
			if (checkedValue) {
				// 初始化点聚合标注点数组
				caMarkers = [];
				
				for (var i = 0; i < qyMarkers.length; i++) {
					if (qyMarkers[i].warning_num > 0) {
						//mp.addOverlay(qyMarkers[i]);
						caMarkers.push(qyMarkers[i]);
					}
				}
				// 往点聚合中添加标注点
				markerClusterer.addMarkers(caMarkers);
				
				// 没选中
			} else {
				// 初始化点聚合标注点数组
				cdMarkers = [];
				
				for (var i = 0; i < qyMarkers.length; i++) {
					if (qyMarkers[i].warning_num > 0) {
						//mp.removeOverlay(qyMarkers[i]);
						cdMarkers.push(qyMarkers[i]);
					}
				}
				// 从点聚合中移除标注点
				markerClusterer.removeMarkers(cdMarkers);
			}
		},
	
		// 变电站正常标识checkbox change
		bdzNormalChange : function(mp, checkedValue) {
			bdzNormalFlag = checkedValue;
	
			// 选中
			if (checkedValue) {
				// 初始化点聚合标注点数组
				caMarkers = [];
				
				for (var i = 0; i < bdzMarkers.length; i++) {
					if (bdzMarkers[i].warning_num <= 0) {
						//mp.addOverlay(bdzMarkers[i]);
						caMarkers.push(bdzMarkers[i]);
					}
				}
				// 往点聚合中添加标注点
				markerClusterer.addMarkers(caMarkers);
				
				// 没选中
			} else {
				// 初始化点聚合标注点数组
				cdMarkers = [];
				
				for (var i = 0; i < bdzMarkers.length; i++) {
					if (bdzMarkers[i].warning_num <= 0) {
						//mp.removeOverlay(bdzMarkers[i]);
						cdMarkers.push(bdzMarkers[i]);
					}
				}
				// 从点聚合中移除标注点
				markerClusterer.removeMarkers(cdMarkers);
			}
		},
	
		// 变电站告警标识checkbox change
		bdzWarningChange : function(mp, checkedValue) {
			bdzWarningFlag = checkedValue;
	
			// 选中
			if (checkedValue) {
				// 初始化点聚合标注点数组
				caMarkers = [];
				
				for (var i = 0; i < bdzMarkers.length; i++) {
					if (bdzMarkers[i].warning_num > 0) {
						//mp.addOverlay(bdzMarkers[i]);
						caMarkers.push(bdzMarkers[i]);
					}
				}
				// 往点聚合中添加标注点
				markerClusterer.addMarkers(caMarkers);
				
				// 没选中
			} else {
				// 初始化点聚合标注点数组
				cdMarkers = [];
				
				for (var i = 0; i < bdzMarkers.length; i++) {
					if (bdzMarkers[i].warning_num > 0) {
						//mp.removeOverlay(bdzMarkers[i]);
						cdMarkers.push(bdzMarkers[i]);
					}
				}
				// 从点聚合中移除标注点
				markerClusterer.removeMarkers(cdMarkers);
			}
		},
	
		// 地图移动到选定客户
		panToKh : function(mp, consId) {
			for (var i = 0; i < qyMarkers.length; i++) {
				if (qyMarkers[i].cons_id == consId) {
					if (qyMarkers[i].x > 0 && qyMarkers[i].y > 0) {
						// 创建标注点
						var panToPoint = new BMap.Point(qyMarkers[i].x,
								qyMarkers[i].y);
						// 地图平移至标注点
						mp.panTo(panToPoint);
						// 创建信息窗口对象
						var infoWindow = new BMap.InfoWindow(khContents[i],
								infoWindowOpts);
						// 开启信息窗口
						mp.openInfoWindow(infoWindow, panToPoint);
					}
					break;
				}
			}
		},

		/**
		 * 
		 * 工单相关地图操作
		 * 
		 */
		// 初始化加载工单地图
		labourInit : function(mp, data) {
			// 中心点
			var heart_point;
			// 中心点初始化
			heart_point = new BMap.Point(data.heartLongitude,
					data.heartLatitude);
			// 地图初始化
			mp.centerAndZoom(heart_point, 13);
			// 标注点图片
			var centerIcon = new BMap.Icon(webContextRoot
					+ "pages/despages/common/images/gis-floor-small.png",
					new BMap.Size(24, 24));
	
			// 标注点
			var centerMarker = new BMap.Marker(heart_point, {
				icon : centerIcon
			});
	
			// 中心点label
			var centerLabel = new BMap.Label(data.areaName, {
				offset : new BMap.Size(20, -10)
			});
	
			centerLabel.setStyle({
				fontSize : "10px",
				border : "0",
				fontWeight : "bold",
				color : "#046c6d",
				backgroundColor : "transparent"
			});
			centerMarker.setLabel(centerLabel);
			mp.addOverlay(centerMarker);
		},

		/**
		 * 
		 * 区域中心维护相关地图操作
		 * 
		 */
		// 初始化区域中心维护地图
		areaCenterInit : function(mp, data) {
			// 地图范围级别
			var map_level;
			// 中心点
			var heart_point;
	
			//双击地图放大关闭
			mp.disableDoubleClickZoom();
			
			if (data.length > 0 && data[0].heartLongitude >= 0
					&& data[0].heartLatitude >= 0) {
				// 地图范围级别设置
				if (data[0].mapLevel == '' || data[0].mapLevel == 0) {
					// 级别未设置时，默认12
					map_level = 12;
				} else {
					map_level = data[0].mapLevel;
				}
	
				// 中心点初始化
				heart_point = new BMap.Point(data[0].heartLongitude,
						data[0].heartLatitude);
				// 地图初始化
				mp.centerAndZoom(heart_point, map_level);
	
				// 添加中心标注点
				// 标注点图片
				var centerIcon = new BMap.Icon(webContextRoot
						+ "pages/despages/common/images/gis-floor-middle.png",
						new BMap.Size(36, 36));
				// 标注点
				var centerMarker = new BMap.Marker(heart_point, {
					icon : centerIcon
				});
	
				// 中心点label
				var centerLabel = new BMap.Label(data[0].areaName, {
					offset : new BMap.Size(20, -10)
				});
	
				centerLabel.setStyle({
					fontSize : "10px",
					border : "0",
					fontWeight : "bold",
					color : "#046c6d",
					backgroundColor : "transparent"
				});
				centerMarker.setLabel(centerLabel);
				mp.addOverlay(centerMarker);
	
				// 添加行政区域覆盖
				if (data[0].serviceRange != '') {
					// 添加区域范围折线
					var bdary = new BMap.Boundary();
					bdary.get(data[0].serviceRange, function(rs) {
						// 行政区域的点有多少个
						var count = rs.boundaries.length;
						if (count === 0) {
							alert('未能获取当前行政区域');
						} else {
							var ply = new BMap.Polygon(rs.boundaries[0], {
								strokeWeight : 2,
								strokeColor : "red",
								fillOpacity : 0.1,
								fillColor : "#45a1ed"
							}); // 建立多边形覆盖物
							mp.addOverlay(ply); // 添加覆盖物
						}
					});
				}
	
				// 添加中心点click事件
				//centerClick(mp, centerMarker, data[0]);
			} else {
				mp.centerAndZoom("南京");
			}
		},
	
	
		/**
		 * 
		 * 大屏gis初始化
		 * 
		 */
		// 初始化加载GIS监控地图
		bigScreenGisInit : function(mp, data) {
	
			// 地图范围级别
			var map_level = 11;
			// 中心点
			var heart_point;
			// 金坛中心点
			var heart_point_jt;
	
//			if (data.mapLevel == '') {
//				// 级别未设置时，默认12
//				map_level = 12;
//			} else {
//				map_level = data.mapLevel;
//			}
	
			if(top.areaNo == '101'){
				map_level = 12;
				// 中心点初始化
				heart_point_jt = new BMap.Point(119.512913,31.72949);
				heart_point = new BMap.Point(data.heartLongitude,
						data.heartLatitude);
				// 地图初始化
				mp.centerAndZoom(heart_point_jt, map_level);
			}else if(top.areaNo == '106'){
				map_level = 12;
				// 中心点初始化
				heart_point = new BMap.Point(data.heartLongitude,
						data.heartLatitude);
				// 地图初始化
				mp.centerAndZoom(heart_point, map_level);
			}else{
				// 中心点初始化
				heart_point = new BMap.Point(data.heartLongitude,
						data.heartLatitude);
				// 地图初始化
				mp.centerAndZoom(heart_point, map_level);
			}

			
	
			// 添加中心标注点
			// 标注点图片
			var centerIcon = new BMap.Icon(basePath
					+ "pages/despages/common/images/gis-floor-middle.png",
					new BMap.Size(36, 36));
			// 标注点
			var centerMarker = new BMap.Marker(heart_point, {
				icon : centerIcon
			});
	
			// 中心点label
			var centerLabel = new BMap.Label(data.areaName, {
				offset : new BMap.Size(20, -10)
			});
	
			centerLabel.setStyle({
				fontSize : "20px",
				border : "0",
				fontWeight : "bold",
				color : "#046c6d",
				backgroundColor : "transparent"
			});
			centerMarker.setLabel(centerLabel);
			mp.addOverlay(centerMarker);
	
			// 控件加载
			// 滚轮放大缩小（默认关闭）
			mp.enableScrollWheelZoom();
	
			// 添加区域范围折线
			var bdary = new BMap.Boundary();
			if (data.serviceRange != '') {
				bdary.get(data.serviceRange, function(rs) {
					// 行政区域的点有多少个
					var count = rs.boundaries.length;
					if (count === 0) {
						alert('未能获取当前行政区域');
					} else {
						var ply = new BMap.Polygon(rs.boundaries[0], {
							strokeWeight : 2,
							strokeColor : "red",
							fillOpacity : 0.1,
							fillColor : "#45a1ed"
						}); // 建立多边形覆盖物
						mp.addOverlay(ply); // 添加覆盖物
					}
				});
			}
	
			// 地图背景色
			var styleJson = '[{"featureType": "land","elementType": "all","stylers": {"color": "#eeeeee"}}]';
			mp.setMapStyle({
				styleJson : styleJson
			});
	
			// 标注点加载
			bigScreenAddPoint(mp, data);
		}
		
	};

}();