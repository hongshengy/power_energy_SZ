/**
 * GIS总览 by 张凡
 * 
 */

// 定时刷新
var pageRefresh;
// 地图对象
var mp;
// 刷新数据
var refreshdata;
// 网络是否正常
var internetFlag = true;
// 当前时间
var currentTime;

$(function() {

	$('#gis_panel').panel({
		style : 'position: relative;',
		border : false,
		fit : true, /* 自适应窗体 */
		onResize : resize
	});
	
    $('#right_panel').css({
        'position':'absolute',
        'top':'40px',
        'right':'20px'});
    
    $('#ssxx_panel').panel({
        title: '客户(0)',
        cls: 'panel-shadow',
        collapsible: true,
        width: 210
    });

    $('#xxhz_panel').panel({
        title: '变电站(0)',
        cls: 'panel-shadow',
        width: 210,
        collapsible: true,
        style: {
            marginTop: 5
        }
    });

    $('#searchResult').css({
    	'display' : 'none',
    	'opacity': '0'
    });
    
	// 测试网络
//	testBaiDuMap();
	// 初始化
//	setTimeout("initHtml();", 2000);

	// 测试先注释
	initHtml();
    // 地图对象与DIV绑定
    // mp = new BMap.Map('gisMap', {
    //     enableMapClick : false
    // });
    // // 初始化地图
    // map.gisInit(mp, data);
});

/**
 * 监测百度地图是否可用
 * 
 */
//function testBaiDuMap() {
//	// 是否能加载百度地图
//	$.ajax({
//		type : "get",
//		url : "https://map.baidu.com",
//		cache : false,
//		dataType : "jsonp",
//		processData : false,
//		timeout : 2000,
//		complete : function(response) {
//			if (response.status == 200) {
//				internetFlag = true;
//			} else {
//				internetFlag = false;
//			}
//		}
//	});
//}

/**
 * 初始化页面
 * 
 */
function initHtml() {
	
		// 页面初始化

// 		$.ajax({
// 			type : "POST",
// 			url : webContextRoot + 'giszl/gisInit.action',
// 			dataType : "json",
// 			success : function(data) {
// 				// 汇总刷新
// 				refreshHuiZongData(data, true);
// 				// 获取刷新客户和用户变信息
// 				getRefreshData(data);
// 				// 设置定时刷新
// 				pageRefresh = setInterval("refreshMap();", "5000");
//
// 				// 初始化地图
// 				if(data.heartLongitude > 0 && data.heartLatitude > 0){
// 					// 地图对象与DIV绑定
// 					 mp = new BMap.Map('gisMap', {
// 						 enableMapClick : false
// 					});
// 					// 初始化地图
// 					map.gisInit(mp, data);
// //					$("#gisMap").html(JSON.stringify(data));
//
// 				} else {
// 					$("#gisMap").css("font-size", 40);
// 					$("#gisMap").html("请先维护区域中心信息！");
// 				}
// 			}
// 		});
// 		$.ajax({
// 			type : "POST",
// 			url : webContextRoot + 'giszl/gisInit.action',
// 			dataType : "json",
// 			success : function(data) {
	var data = JSON.parse('{"address":"常州市金坛区金湖路19号","areaMemo":"本公司运营的综合能源服务中心，立足于客户能源大数据的深度开发，以客户设备代维、用电智能化服务、能效提升服务、新能源服务为方向，为工业园区或工业用户集中场所提供“电管”、“4S店”式的综合能源服务，提高用户用电效率，降低用户用电成本，提升用电服务的层次和品质，同时推动用电大客户实施电能替代。","areaName":"金坛","areaNo":"101","areaPhoto":"upLoads\\/ddb6d55e-b933-4cc6-87ec-ab6c93d371a6.jpg","bdzNormalNum":"160","bdzWarningNum":"8","cons_all":"168","cons_info":[{"cons_id":"101000007469","cons_name":"江苏高新技术创业服务中心","cons_no":"3603514088","contact_name":"吴玲艳","contract_cap":"315","elec_addr":"开发区国际工业城15#楼","realtime_dl":"0","realtime_fh":"0","telephone":"18101170034","volt_value":"10kV","warning_num":"0","wn_all":"1","x":"119.6609685288","y":"31.75321828"},{"cons_id":"101000014657","cons_name":"路灯管理所25号路灯变","cons_no":"3603398581","contact_name":"李东成","contract_cap":"80","elec_addr":"茅山管委会对面 十字路口 路北","realtime_dl":"0","realtime_fh":"0","telephone":"15190535220","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.316","y":"31.764922"},{"cons_id":"101000020863","cons_name":"江苏晨风服装有限公司 (一) ","cons_no":"3602693107","contact_name":"吴顺良","contract_cap":"2430","elec_addr":"开发区金湖路99号","realtime_dl":"778","realtime_fh":"880","telephone":"13511662255","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.6277458159","y":"31.7196619915"},{"cons_id":"101000020898","cons_name":"常州裕能石英科技有限公司","cons_no":"3603471264","contact_name":"赵小平","contract_cap":"3250","elec_addr":"开发区纬五路北金陵路西","realtime_dl":"0","realtime_fh":"0","telephone":"13961266988","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.6277154822","y":"31.7549545238"},{"cons_id":"101000014486","cons_name":"路灯管理所23号路灯变","cons_no":"3603398563","contact_name":"李东成","contract_cap":"80","elec_addr":"高德山庄对面 茅山服务区指示牌旁 路北","realtime_dl":"0","realtime_fh":"0","telephone":"15190535220","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.3363222633","y":"31.7347289864"},{"cons_id":"101000035864","cons_name":"金坛区东城实验小学公交首末站充电站","cons_no":"3603702144","contact_name":"陆骞","contract_cap":"630","elec_addr":"金坛区丰田路东城实验小学公交首末站(经九路与丰田路交叉口)转供母户 ","realtime_dl":"11","realtime_fh":"170","telephone":"13915810671","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.6458432096","y":"31.7458093362"},{"cons_id":"101000003483","cons_name":"江苏艾龙森汽车部件有限公司","cons_no":"3603694385","contact_name":"李和平","contract_cap":"630","elec_addr":"开发区标准厂房B区9号楼","realtime_dl":"1","realtime_fh":"2","telephone":"13775613737","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.6492684472","y":"31.7644884187"},{"cons_id":"101000043925","cons_name":"常州市金坛综合能源服务中心","cons_no":"101000043924","contact_name":"袁俊球","contract_cap":"0","elec_addr":"金坛金湖路19号","realtime_dl":"0","realtime_fh":"0","telephone":"15895002896","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.6176","y":"31.749651"},{"cons_id":"101000044122","cons_name":"常州天马光伏电子有限公司","cons_no":"3603458991","contact_name":"王文钊","contract_cap":"315","elec_addr":"金城镇工业集中区标准厂房5#","realtime_dl":"3","realtime_fh":"2","telephone":"13806142299","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.5747843746","y":"31.7803936381"},{"cons_id":"101000044126","cons_name":"江苏德道汽车科技有限公司","cons_no":"3603458994","contact_name":"赵奇琪","contract_cap":"315","elec_addr":"金城镇工业集中区标准厂房7#","realtime_dl":"123","realtime_fh":"133","telephone":"13613271025","volt_value":"10kV","warning_num":"5","wn_all":"0","x":"119.5754710201","y":"31.7801838583"},{"cons_id":"101000041139","cons_name":"常州中景房地产开发有限公司","cons_no":"3603725803","contact_name":"王金保","contract_cap":"5000","elec_addr":"金坛区金桂路南侧金山路东侧","realtime_dl":"158","realtime_fh":"184","telephone":"13815001881","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.597533037","y":"31.7289398639"},{"cons_id":"101000001077","cons_name":"山进特殊钢(江苏)有限公司","cons_no":"3603520169","contact_name":"崔振兴","contract_cap":"815","elec_addr":"开发区国际工业城16#楼","realtime_dl":"2","realtime_fh":"1","telephone":"13564470842","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.6616610038","y":"31.7530713794"},{"cons_id":"101000007921","cons_name":"常州亿海汽车内饰材料有限公司","cons_no":"3603714125","contact_name":"谢莉燕","contract_cap":"815","elec_addr":"开发区标准厂房B区14-1号楼","realtime_dl":"2","realtime_fh":"0","telephone":"18921040997","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.6488929379","y":"31.763202139"},{"cons_id":"101000019974","cons_name":"江苏亿禾新材料有限公司","cons_no":"3602091309","contact_name":"徐建华","contract_cap":"7600","elec_addr":"尧塘镇亿晶路99号","realtime_dl":"-3279","realtime_fh":"-825","telephone":"13961202680","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.67031","y":"31.728624"},{"cons_id":"101000022174","cons_name":"金坛区滨湖新城金广场D楼","cons_no":"3603400922d","contact_name":"周胜","contract_cap":"16200","elec_addr":"金坛区金坛大道北侧东一环东侧东二环西侧","realtime_dl":"45","realtime_fh":"45","telephone":"13921003990","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.5932522314","y":"31.7295239216"},{"cons_id":"101000007434","cons_name":"江苏高新技术创业服务中心","cons_no":"3603446699","contact_name":"苏蔚","contract_cap":"250","elec_addr":"开发区国际工业城13#北楼","realtime_dl":"30","realtime_fh":"13","telephone":"15312588522","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.6578732596","y":"31.7535102344"},{"cons_id":"101000015250","cons_name":"路灯管理所34号路灯变","cons_no":"3603388767","contact_name":"李东成","contract_cap":"80","elec_addr":"十字河桥西 路北","realtime_dl":"0","realtime_fh":"0","telephone":"15190535220","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.5238264567","y":"31.7805410227"},{"cons_id":"101000015298","cons_name":"路灯管理所36号路灯变","cons_no":"3603398525","contact_name":"李东成","contract_cap":"80","elec_addr":"金坛-溧阳分界处东侧300米 路南","realtime_dl":"0","realtime_fh":"0","telephone":"15190535220","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.6169895093","y":"31.5786524746"},{"cons_id":"101000015885","cons_name":"路灯管理所46号路灯变","cons_no":"3303059431","contact_name":"李东成","contract_cap":"160","elec_addr":"汇贤南路三洋印花厂门口 路西","realtime_dl":"0","realtime_fh":"0","telephone":"15190535220","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.6175002915","y":"31.7544269432"},{"cons_id":"101000020025","cons_name":"路灯管理所56号路灯变","cons_no":"3603212755","contact_name":"李东成","contract_cap":"160","elec_addr":"常州润雨服饰门口 翔发丝绸对面 路东","realtime_dl":"1","realtime_fh":"1","telephone":"15190535220","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.5736355849","y":"31.7627424938"},{"cons_id":"101000021483","cons_name":"金广场总用水水表","cons_no":"3603400922e","contact_name":"周胜","contract_cap":"16200","elec_addr":"金坛区金坛大道北侧东一环东侧东二环西侧","realtime_dl":"0","realtime_fh":"0","telephone":"13921003990","volt_value":"10kV","warning_num":"0","wn_all":"2","x":"119.596031","y":"31.7289444269"},{"cons_id":"101000012648","cons_name":"路灯管理所5号路灯变","cons_no":"3602294958","contact_name":"李东成","contract_cap":"200","elec_addr":"汇贤南路与金武路交叉路路口西北","realtime_dl":"2","realtime_fh":"2","telephone":"15190535220","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.626161226","y":"31.7283879726"},{"cons_id":"101000014293","cons_name":"路灯管理所21号路灯变","cons_no":"3603264935","contact_name":"李东成","contract_cap":"80","elec_addr":"铜板桥东 路南","realtime_dl":"0","realtime_fh":"0","telephone":"15190535220","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.4988104754","y":"31.7464412648"},{"cons_id":"101000015864","cons_name":"路灯管理所45号路灯变","cons_no":"3303071025","contact_name":"李东成","contract_cap":"160","elec_addr":"峨嵋路与一中路交汇路口西北角","realtime_dl":"0","realtime_fh":"0","telephone":"15190535220","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.60799","y":"31.744784"},{"cons_id":"101000015906","cons_name":"路灯管理所47号路灯变","cons_no":"3303070600","contact_name":"李东成","contract_cap":"160","elec_addr":"常溧路西段中石化加油站门口 路南","realtime_dl":"0","realtime_fh":"0","telephone":"15190535220","volt_value":"10kV","warning_num":"0","wn_all":"2","x":"119.5791745191","y":"31.7656254634"},{"cons_id":"101000020625","cons_name":"正信光电科技股份有限公司","cons_no":"3303065894","contact_name":"吴丽芹","contract_cap":"11650","elec_addr":"直溪工业园(BD)(ZX)","realtime_dl":"802","realtime_fh":"701","telephone":"18961101293","volt_value":"35kV","warning_num":"0","wn_all":"0","x":"119.4618163026","y":"31.7945170231"},{"cons_id":"101000012709","cons_name":"路灯管理所9号路灯变","cons_no":"3603232252","contact_name":"李东成","contract_cap":"160","elec_addr":"盐港路与S240交叉路口 路南","realtime_dl":"0","realtime_fh":"0","telephone":"15190535220","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.6169219292","y":"31.7788822312"},{"cons_id":"101000035888","cons_name":"薛埠客运站充电站","cons_no":"3603702148","contact_name":"陆骞","contract_cap":"630","elec_addr":"薛埠客运站","realtime_dl":"0","realtime_fh":"0","telephone":"13915810671","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.3858764212","y":"31.7287129543"},{"cons_id":"101000038869","cons_name":"江苏金坛国发国际投资发展有限公司","cons_no":"3603812191","contact_name":"王俊伟","contract_cap":"250","elec_addr":"开发区标准厂房c区23号楼","realtime_dl":"8","realtime_fh":"1","telephone":"15151927798","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.6508026707","y":"31.7671886356"},{"cons_id":"101000043984","cons_name":"江苏一号农场科技有限公司","cons_no":"3602460304","contact_name":"陈小清","contract_cap":"3430","elec_addr":"金坛区埠镇仙姑村三组","realtime_dl":"111","realtime_fh":"232","telephone":"18001490828","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.342498","y":"31.817918"},{"cons_id":"101000044134","cons_name":"常州欧仑催化科技有限公司","cons_no":"3603459004","contact_name":"董尧堂","contract_cap":"250","elec_addr":"金城镇工业集中区标准厂房12-2#","realtime_dl":"1","realtime_fh":"0","telephone":"13957987598","volt_value":"10kV","warning_num":"4","wn_all":"0","x":"119.5756319527","y":"31.7785557684"},{"cons_id":"101000048127","cons_name":"金坛金能电力建设有限公司","cons_no":"101000048126","contact_name":"袁俊球","contract_cap":"0","elec_addr":"金湖路19号","realtime_dl":"0","realtime_fh":"0","telephone":"15895002896","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.6178","y":"31.750531"},{"cons_id":"101000048311","cons_name":"常州市金坛同城建设投资发展有限公司","cons_no":"3603572896","contact_name":"祁国生","contract_cap":"1600","elec_addr":"金城镇盐港路北侧西环二路东侧","realtime_dl":"12","realtime_fh":"9","telephone":"13775153858","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.5741138224","y":"31.7778944912"},{"cons_id":"101000009476","cons_name":"瑞声新材料科技（常州）有限公司","cons_no":"3603557313","contact_name":"吴国林","contract_cap":"3250","elec_addr":"开发区国际工业城1#北楼","realtime_dl":"328","realtime_fh":"244","telephone":"18961485880","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.65800737","y":"31.7513159921"},{"cons_id":"101000015280","cons_name":"路灯管理所35号路灯变","cons_no":"3603398520","contact_name":"李东成","contract_cap":"80","elec_addr":"新华村车站西150米 路南","realtime_dl":"0","realtime_fh":"0","telephone":"15190535220","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.618736205","y":"31.5815867117"},{"cons_id":"101000015420","cons_name":"路灯管理所40号路灯变","cons_no":"3602185623","contact_name":"李东成","contract_cap":"160","elec_addr":"东环二路南延段与金坛大道交汇路口西南角","realtime_dl":"5","realtime_fh":"4","telephone":"15190535220","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.5962891752","y":"31.7247730518"},{"cons_id":"101000015818","cons_name":"路灯管理所43号路灯变","cons_no":"3303071030","contact_name":"李东成","contract_cap":"160","elec_addr":"金宜路与晨风路交汇路口东北角 锦上大酒店门前","realtime_dl":"0","realtime_fh":"0","telephone":"15190535220","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.623778","y":"31.75989"},{"cons_id":"101000015843","cons_name":"路灯管理所44号路灯变","cons_no":"3303070562","contact_name":"李东成","contract_cap":"160","elec_addr":"S340东段与经八路交汇路口往东80米树林中 路南","realtime_dl":"0","realtime_fh":"0","telephone":"15190535220","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.634221","y":"31.76752"},{"cons_id":"101000019953","cons_name":"常州盘石水泥有限公司","cons_no":"3303049043","contact_name":"张锁林","contract_cap":"37100","elec_addr":"薛埠镇夏桥村(XB) ","realtime_dl":"26404","realtime_fh":"8272","telephone":"13511669999","volt_value":"110kV","warning_num":"0","wn_all":"0","x":"119.4090739925","y":"31.7320587021"},{"cons_id":"101000020082","cons_name":"路灯管理所60号路灯变","cons_no":"3303071035","contact_name":"李东成","contract_cap":"160","elec_addr":"西环二路（北）城西金溪加油站北150（悦欣物资门口）","realtime_dl":"0","realtime_fh":"0","telephone":"15190535220","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.5593502779","y":"31.7587961365"},{"cons_id":"101000020840","cons_name":"晨风(江苏)服装有限公司 （三）","cons_no":"3303064805","contact_name":"陶文华","contract_cap":"2860","elec_addr":"良常路1#(CD)","realtime_dl":"1454","realtime_fh":"1540","telephone":"18961115595","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.6069534107","y":"31.765972557"},{"cons_id":"101000020890","cons_name":"常州斯威克光伏新材料有限公司（二）","cons_no":"3303058859","contact_name":"徐丹","contract_cap":"2400","elec_addr":"金坛市丹凤路53#","realtime_dl":"1267","realtime_fh":"1165","telephone":"13775122590","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.5773","y":"31.763586"},{"cons_id":"101000007292","cons_name":"金坛高新技术创业服务中心","cons_no":"3603670667","contact_name":"卢建新","contract_cap":"500","elec_addr":"开发区国际工业城3#楼","realtime_dl":"11","realtime_fh":"10","telephone":"15061902716","volt_value":"10kV","warning_num":"2","wn_all":"0","x":"119.6611558486","y":"31.7511453897"},{"cons_id":"101000007306","cons_name":"江苏华科园投资发展有限公司","cons_no":"3603378854","contact_name":"苏蔚","contract_cap":"630","elec_addr":"开发区国际工业城4#楼","realtime_dl":"21","realtime_fh":"13","telephone":"15312588522","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.6625085818","y":"31.751201025"},{"cons_id":"101000014452","cons_name":"路灯管理所22号路灯变","cons_no":"3603388745","contact_name":"李东成","contract_cap":"80","elec_addr":"坞家公交车站东 路北","realtime_dl":"0","realtime_fh":"0","telephone":"15190535220","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.4971129036","y":"31.783822854"},{"cons_id":"101000014640","cons_name":"路灯管理所24号路灯变","cons_no":"3603398566","contact_name":"李东成","contract_cap":"80","elec_addr":"金沙湾 路北","realtime_dl":"0","realtime_fh":"0","telephone":"15190535220","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.317209","y":"31.76377"},{"cons_id":"101000015369","cons_name":"瑞声新材料科技（常州）有限公司","cons_no":"3603557313a","contact_name":"吴国林","contract_cap":"1250","elec_addr":"开发区国际工业城1#东楼","realtime_dl":"407","realtime_fh":"326","telephone":"18961485880","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.6582429696","y":"31.7510723994"},{"cons_id":"101000020478","cons_name":"路灯管理所66号路灯变","cons_no":"3602693111","contact_name":"李东成","contract_cap":"80","elec_addr":"通闸路与建材路交叉路口往东（江东化工公司东边）","realtime_dl":"0","realtime_fh":"0","telephone":"15190535220","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.59246","y":"31.78112"},{"cons_id":"101000020642","cons_name":"常州市科宇重工科技有限公司","cons_no":"3303040176","contact_name":"孙木清","contract_cap":"37630","elec_addr":"金坛市指前镇社头(BD)(ZQ)","realtime_dl":"311","realtime_fh":"168","telephone":"18921166666","volt_value":"35kV","warning_num":"0","wn_all":"0","x":"119.4717804087","y":"31.6474490077"},{"cons_id":"101000020894","cons_name":"奥托立夫(江苏)汽车安全零部件有限公司 ","cons_no":"3602865721","contact_name":"张岚","contract_cap":"13700","elec_addr":"金坛市薛埠镇西南部","realtime_dl":"63","realtime_fh":"63","telephone":"18625207899","volt_value":"35kV","warning_num":"0","wn_all":"0","x":"119.3588919881","y":"31.7025377951"},{"cons_id":"101000007418","cons_name":"思拓达仓储泊车技术（常州）有限公司","cons_no":"3603563028","contact_name":"王俊伟","contract_cap":"250","elec_addr":"开发区国际工业城9#楼","realtime_dl":"1","realtime_fh":"1","telephone":"15251988960","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.66174147","y":"31.7518123158"},{"cons_id":"101000007449","cons_name":"金坛高新技术创业服务中心","cons_no":"3603724331","contact_name":"华静","contract_cap":"315","elec_addr":"开发区国际工业城13#南楼","realtime_dl":"0","realtime_fh":"0","telephone":"18915829656","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.6579108105","y":"31.752721043"},{"cons_id":"101000007496","cons_name":"常州市福欧车辆配件有限公司","cons_no":"3603724322","contact_name":"刘轶隽","contract_cap":"1000","elec_addr":"开发区标准厂房B区11号楼","realtime_dl":"331","realtime_fh":"285","telephone":"13951225953","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.6493006337","y":"31.7636856363"},{"cons_id":"101000004448","cons_name":"百瑞医疗科技（常州）有限公司","cons_no":"3603446683","contact_name":"倪爱清","contract_cap":"900","elec_addr":"开发区国际工业城5#南楼","realtime_dl":"0","realtime_fh":"0","telephone":"18168817508","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.6634683017","y":"31.7507434676"},{"cons_id":"101000013578","cons_name":"路灯管理所12号路灯变","cons_no":"3603240833","contact_name":"李东成","contract_cap":"160","elec_addr":"金龙桥北段（烈士陵园）桥下东30米","realtime_dl":"1","realtime_fh":"1","telephone":"15090535220","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.5533614309","y":"31.735557754"},{"cons_id":"101000019982","cons_name":"江苏金煌纸业有限公司","cons_no":"3602290608","contact_name":"张建芝","contract_cap":"32180","elec_addr":"金坛市开发区,金湖路以西、东村支河以东、东村路以北 ","realtime_dl":"974","realtime_fh":"704","telephone":"13382828997","volt_value":"110kV","warning_num":"0","wn_all":"0","x":"119.6180216349","y":"31.771735618"},{"cons_id":"101000007490","cons_name":"江苏金坛国发国际投资发展有限公司","cons_no":"3603779153","contact_name":"王俊伟","contract_cap":"2065","elec_addr":"开发区标准厂房A区5号楼","realtime_dl":"9","realtime_fh":"45","telephone":"15151927798","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.65457161","y":"31.7633657139"},{"cons_id":"101000037320","cons_name":"常州市金坛区东城街道社区卫生服务中心","cons_no":"3602999008","contact_name":"陈颖","contract_cap":"4600","elec_addr":"南环一路1106号","realtime_dl":"194","realtime_fh":"177","telephone":"15195056530","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.6184184176","y":"31.7410905361"},{"cons_id":"101000044118","cons_name":"常州得力刀具有限公司","cons_no":"3603510617","contact_name":"叶会计","contract_cap":"315","elec_addr":"金城镇工业集中区标准厂房3#","realtime_dl":"0","realtime_fh":"0","telephone":"13616137966","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.5748631402","y":"31.7811984249"},{"cons_id":"101000044128","cons_name":"金坛区华昊机械厂","cons_no":"3603458997","contact_name":"司马珍","contract_cap":"315","elec_addr":"金城镇工业集中区标准厂房8#","realtime_dl":"0","realtime_fh":"0","telephone":"13813519688","volt_value":"10kV","warning_num":"1","wn_all":"0","x":"119.5757499699","y":"31.7798600668"},{"cons_id":"101000002313","cons_name":"瑞声新材料科技（常州）有限公司","cons_no":"3603557307","contact_name":"吴国林","contract_cap":"4000","elec_addr":"开发区国际工业城1#南楼","realtime_dl":"300","realtime_fh":"271","telephone":"15961239836","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.6580444861","y":"31.7505523413"},{"cons_id":"101000007256","cons_name":"瑞声光电科技（常州）有限公司","cons_no":"3603557310","contact_name":"吴国林","contract_cap":"630","elec_addr":"开发区国际工业城2#楼","realtime_dl":"6","realtime_fh":"6","telephone":"18961485880","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.6596430827","y":"31.7506344559"},{"cons_id":"101000020105","cons_name":"路灯管理所61号路灯变","cons_no":"3303071034","contact_name":"李东成","contract_cap":"160","elec_addr":"西环二路金海明都南60米","realtime_dl":"0","realtime_fh":"0","telephone":"15190535220","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.55458","y":"31.74221"},{"cons_id":"101000020579","cons_name":"江苏中东化肥股份有限公司","cons_no":"3603375774","contact_name":"刘敖根","contract_cap":"3260","elec_addr":"金坛经济开发区S240北侧丹金溧漕河东岸","realtime_dl":"0","realtime_fh":"0","telephone":"13806122566","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.600815773","y":"31.7988805471"},{"cons_id":"101000044176","cons_name":"常州威龙医药设备有限公司","cons_no":"3603768737","contact_name":"蒋玉清","contract_cap":"250","elec_addr":"金城镇工业集中区标准厂房12-1#","realtime_dl":"3","realtime_fh":"1","telephone":"13706149172","volt_value":"10kV","warning_num":"5","wn_all":"0","x":"119.5746073488","y":"31.778587692"},{"cons_id":"101000044196","cons_name":"常州市金坛元巷综合市场有限公司","cons_no":"3603652917","contact_name":"吕连庆","contract_cap":"800","elec_addr":"金城镇文曲路1号","realtime_dl":"11","realtime_fh":"15","telephone":"13921013576","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.5625071162","y":"31.7663638348"},{"cons_id":"101000007992","cons_name":"江苏金坛国发国际投资发展有限公司","cons_no":"3603693425","contact_name":"王俊伟","contract_cap":"250","elec_addr":"开发区标准厂房C区17号楼","realtime_dl":"28","realtime_fh":"0","telephone":"15151927798","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.6503842461","y":"31.7658522205"},{"cons_id":"101000015213","cons_name":"路灯管理所32号路灯变","cons_no":"3603398541","contact_name":"李东成","contract_cap":"80","elec_addr":"“薛埠中心卫生院”指示牌东80米 路北","realtime_dl":"0","realtime_fh":"0","telephone":"15190535220","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.391692","y":"31.736051"},{"cons_id":"101000019961","cons_name":"江苏君诚新材料有限公司","cons_no":"3303064980","contact_name":"陆平","contract_cap":"3200","elec_addr":"F儒林楼下工业集中区","realtime_dl":"0","realtime_fh":"0","telephone":"13921015888","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.6692118124","y":"31.6275513188"},{"cons_id":"101000007337","cons_name":"金坛高新技术创业服务中心","cons_no":"3603393562","contact_name":"苏蔚","contract_cap":"630","elec_addr":"开发区国际工业城5#北楼","realtime_dl":"19","realtime_fh":"23","telephone":"15312588522","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.6636780249","y":"31.7514473666"},{"cons_id":"101000014257","cons_name":"路灯管理所19号路灯变","cons_no":"3603232268","contact_name":"李东成","contract_cap":"80","elec_addr":"盐港路与丹阳门北路交叉路口西北","realtime_dl":"0","realtime_fh":"0","telephone":"15190535220","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.5805243019","y":"31.7776117368"},{"cons_id":"101000019978","cons_name":"常州市金坛华鑫机械装备科技有限公司","cons_no":"3602286316","contact_name":"杨思耕","contract_cap":"92050","elec_addr":"薛埠镇工业集中区","realtime_dl":"1390","realtime_fh":"864","telephone":"13860600266","volt_value":"110kV","warning_num":"0","wn_all":"0","x":"119.402307","y":"31.72191"},{"cons_id":"101000014720","cons_name":"路灯管理所27号路灯变","cons_no":"3603433707","contact_name":"李东成","contract_cap":"80","elec_addr":"联丰村北300m 路西","realtime_dl":"0","realtime_fh":"0","telephone":"15190535220","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.5991760795","y":"31.8421067355"},{"cons_id":"101000020379","cons_name":"路灯管理所65号路灯变","cons_no":"3303070599","contact_name":"李东成","contract_cap":"160","elec_addr":"常溧路海林稀土门口 路北","realtime_dl":"0","realtime_fh":"0","telephone":"15190535220","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.60527","y":"31.76031"},{"cons_id":"101000020694","cons_name":"常州市金坛区铠建合金材料科技有限公司","cons_no":"3602333917","contact_name":"陈以官","contract_cap":"41050","elec_addr":"薛埠镇花山村委原柳庄砖瓦厂","realtime_dl":"0","realtime_fh":"0","telephone":"18014301999","volt_value":"110kV","warning_num":"0","wn_all":"0","x":"119.4185861293","y":"31.7358255195"},{"cons_id":"101000035875","cons_name":"扬溧高速长荡湖服务区溧阳方向充电站","cons_no":"3603583462","contact_name":"秦燕军","contract_cap":"630","elec_addr":"金坛区扬溧高速长荡湖服务区(溧阳方向)","realtime_dl":"0","realtime_fh":"0","telephone":"13306140868","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.4221312823","y":"31.6199601939"},{"cons_id":"101000012582","cons_name":"江苏省健尔康医用敷料有限公司","cons_no":"3303069679","contact_name":"陈国平","contract_cap":"5520","elec_addr":"金坛区直溪镇工业集中区健尔康路1号","realtime_dl":"1540","realtime_fh":"1701","telephone":"13901490889","volt_value":"10kV","warning_num":"0","wn_all":"1","x":"119.459998","y":"31.787174"},{"cons_id":"101000044194","cons_name":"常州泽城投资发展有限公司","cons_no":"3603652921","contact_name":"蔡建梅","contract_cap":"315","elec_addr":"金城镇文曲路西侧(中心幼儿园)","realtime_dl":"3","realtime_fh":"3","telephone":"13806142299","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.5625071162","y":"31.7663638348"},{"cons_id":"101000044653","cons_name":"常州金坛半边山旅游管理有限公司","cons_no":"3603896508","contact_name":"邓亮","contract_cap":"315","elec_addr":"金坛区薛埠镇茅东林场","realtime_dl":"16","realtime_fh":"79","telephone":"13914307000","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.3174276929","y":"31.765298887"},{"cons_id":"101000044835","cons_name":"江苏常宝普莱森钢管有限公司","cons_no":"3303063435","contact_name":"印国琴","contract_cap":"300050","elec_addr":"开发区华城路168","realtime_dl":"109","realtime_fh":"101","telephone":"13861107032","volt_value":"35kV","warning_num":"0","wn_all":"0","x":"119.6433479597","y":"31.7296272966"},{"cons_id":"101000007938","cons_name":"江苏亨泰汽车零部件有限公司","cons_no":"3603659112","contact_name":"韩子林","contract_cap":"500","elec_addr":"开发区标准厂房C区15号楼","realtime_dl":"26","realtime_fh":"27","telephone":"18900655999","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.6503306019","y":"31.7654097854"},{"cons_id":"101000015784","cons_name":"路灯管理所42号路灯变","cons_no":"3303074387","contact_name":"李东成","contract_cap":"100","elec_addr":"愚池公园“一品和兴”南","realtime_dl":"0","realtime_fh":"0","telephone":"15190535220","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.5715748309","y":"31.7387238787"},{"cons_id":"101000019886","cons_name":"路灯管理所48号路灯变","cons_no":"3602294959","contact_name":"李东成","contract_cap":"160","elec_addr":"汇福路与南二环交叉路口 西南角","realtime_dl":"0","realtime_fh":"0","telephone":"15190535220","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.657374","y":"31.740481"},{"cons_id":"101000007484","cons_name":"迈科锂电（江苏）有限公司","cons_no":"3603789249","contact_name":"王俊伟","contract_cap":"1000","elec_addr":"开发区标准厂房A区2号楼","realtime_dl":"0","realtime_fh":"0","telephone":"15151927798","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.6543892198","y":"31.7645333979"},{"cons_id":"101000019957","cons_name":"江苏兴荣美乐铜业有限公司","cons_no":"3303050117","contact_name":"杨俊","contract_cap":"15050","elec_addr":"F金坛市经济开发区华阳北路99号(CX)","realtime_dl":"5900","realtime_fh":"6069","telephone":"13775160635","volt_value":"35kV","warning_num":"0","wn_all":"0","x":"119.602293147","y":"31.7661383643"},{"cons_id":"101000020008","cons_name":"路灯管理所55号路灯变","cons_no":"3603212697","contact_name":"李东成","contract_cap":"160","elec_addr":"邮堂庙路与丹凤路交叉路口东南","realtime_dl":"0","realtime_fh":"0","telephone":"15190535220","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.5640359754","y":"31.7633032716"},{"cons_id":"101000020867","cons_name":"晨风(江苏)服装有限公司 （二）","cons_no":"3603438879","contact_name":"杨金松","contract_cap":"1260","elec_addr":"金城镇金城路99号","realtime_dl":"637","realtime_fh":"686","telephone":"13511662255","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.5503751102","y":"31.7544153107"},{"cons_id":"101000012671","cons_name":"路灯管理所6号路灯变","cons_no":"3603265037","contact_name":"李东成","contract_cap":"160","elec_addr":"后阳加油站东200M路北","realtime_dl":"0","realtime_fh":"0","telephone":"15190535220","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.5359152629","y":"31.7590949832"},{"cons_id":"101000013586","cons_name":"路灯管理所13号路灯变","cons_no":"3603240835","contact_name":"李东成","contract_cap":"160","elec_addr":"S241与北环西路交叉路口 路西","realtime_dl":"0","realtime_fh":"0","telephone":"15190535220","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.5520188577","y":"31.7544782219"},{"cons_id":"101000015110","cons_name":"路灯管理所29号路灯变","cons_no":"3603265026","contact_name":"李东成","contract_cap":"80","elec_addr":"金塔大桥东北 制冰厂门口","realtime_dl":"0","realtime_fh":"0","telephone":"15190535220","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.603583","y":"31.80621"},{"cons_id":"101000020736","cons_name":"常州宝佳新材料科技有限公司","cons_no":"3602115205","contact_name":"高建民","contract_cap":"70200","elec_addr":"儒林镇工业集中区园区南路3号 ","realtime_dl":"0","realtime_fh":"0","telephone":"18602576335","volt_value":"110kV","warning_num":"0","wn_all":"1","x":"119.619496","y":"31.588332"},{"cons_id":"101000020836","cons_name":"常州市金坛经编装饰品厂","cons_no":"3303049031","contact_name":"任庆友","contract_cap":"1945","elec_addr":"丹阳门北路西侧、沈丹路北侧","realtime_dl":"1788","realtime_fh":"1640","telephone":"18915815081","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.580165","y":"31.763553"},{"cons_id":"101000001891","cons_name":"金坛区滨湖新城金广场A楼","cons_no":"3603400922","contact_name":"周胜","contract_cap":"16200","elec_addr":"金坛区金坛大道北侧东一环东侧东二环西侧","realtime_dl":"669","realtime_fh":"737","telephone":"13921003990","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.5941641825","y":"31.7281002745"},{"cons_id":"101000012588","cons_name":"路灯管理所2号路灯变","cons_no":"3603265227","contact_name":"李东成","contract_cap":"250","elec_addr":"S241与S340交叉路口路北","realtime_dl":"0","realtime_fh":"0","telephone":"15190535220","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.5538976922","y":"31.7653195572"},{"cons_id":"101000014215","cons_name":"路灯管理所17号路灯变","cons_no":"3603388734","contact_name":"李东成","contract_cap":"100","elec_addr":"久诺集团西 路北","realtime_dl":"0","realtime_fh":"0","telephone":"15190535220","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.4725467044","y":"31.7847369082"},{"cons_id":"101000039274","cons_name":"路灯管理所50号路灯变","cons_no":"3303012345","contact_name":"李东成","contract_cap":"80","elec_addr":"华城路东延伸段1#美亚塑料门口","realtime_dl":"0","realtime_fh":"0","telephone":"15190535220","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.636413512","y":"31.7493532067"},{"cons_id":"101000040964","cons_name":"常州金冬毛纺有限公司","cons_no":"3303025027","contact_name":"范中平","contract_cap":"815","elec_addr":"常州市金坛区直溪镇坞家村","realtime_dl":"0","realtime_fh":"0","telephone":"13861125116","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.483094","y":"31.78487"},{"cons_id":"101000044120","cons_name":"常州云隆工程设备有限公司","cons_no":"3603524326","contact_name":"吴新宇","contract_cap":"250","elec_addr":"金城镇工业集中区标准厂房4#","realtime_dl":"56","realtime_fh":"65","telephone":"13706149088","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.5741513733","y":"31.7795362742"},{"cons_id":"101000044124","cons_name":" 江苏尚唯汽车饰件有限公司","cons_no":"3603687181","contact_name":"刘帅","contract_cap":"800","elec_addr":"金城镇工业集中区标准厂房6#","realtime_dl":"48","realtime_fh":"7","telephone":"18900538931","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.5752279206","y":"31.7809977677"},{"cons_id":"101000020557","cons_name":"常州嘉华新型合金材料科技有限公司","cons_no":"3603406401","contact_name":"吴海域","contract_cap":"63450","elec_addr":"直溪镇工业集中区横二路58号","realtime_dl":"0","realtime_fh":"0","telephone":"13806142770","volt_value":"110kV","warning_num":"0","wn_all":"0","x":"119.4767382378","y":"31.7954925934"},{"cons_id":"101000038860","cons_name":"江苏金坛国发国际投资发展有限公司","cons_no":"3603812189","contact_name":"王俊伟","contract_cap":"250","elec_addr":"开发区标准厂房c区21号楼","realtime_dl":"2","realtime_fh":"0","telephone":"15151927798","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.650652467","y":"31.7667325234"},{"cons_id":"101000044132","cons_name":"常州鼎盛泰克热交换器有限公司","cons_no":"3603644723","contact_name":"郭成军","contract_cap":"500","elec_addr":"金城镇工业集中区标准厂房11#","realtime_dl":"1","realtime_fh":"8","telephone":"13920083773","volt_value":"10kV","warning_num":"4","wn_all":"0","x":"119.5757446055","y":"31.7790528633"},{"cons_id":"101000015195","cons_name":"路灯管理所31号路灯变","cons_no":"3603398554","contact_name":"李东成","contract_cap":"80","elec_addr":"新浮桥旁 路北","realtime_dl":"0","realtime_fh":"0","telephone":"15190535220","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.37797","y":"31.734719"},{"cons_id":"101000019986","cons_name":"路灯管理所53号路灯变","cons_no":"3303071024","contact_name":"李东成","contract_cap":"160","elec_addr":"金花河桥旁 路东","realtime_dl":"0","realtime_fh":"0","telephone":"15190535220","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.61758","y":"31.74155"},{"cons_id":"101000022148","cons_name":"金坛区滨湖新城金广场C楼","cons_no":"3603400922c","contact_name":"周胜","contract_cap":"16200","elec_addr":"金坛区金坛大道北侧东一环东侧东二环西侧","realtime_dl":"85","realtime_fh":"96","telephone":"13921003990","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.5951405066","y":"31.7295649881"},{"cons_id":"101000007431","cons_name":"常州工程塑料实业有限公司","cons_no":"3603393571","contact_name":"摩志国","contract_cap":"1280","elec_addr":"开发区国际工业城10#楼","realtime_dl":"1","realtime_fh":"0","telephone":"13906122160","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.6632059562","y":"31.7517347642"},{"cons_id":"101000007487","cons_name":"江苏常丰精密科技有限公司","cons_no":"3603760678","contact_name":"郭志星","contract_cap":"1065","elec_addr":"开发区标准厂房A区4号楼","realtime_dl":"1","realtime_fh":"0","telephone":"15301498118","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.6527155214","y":"31.7644330506"},{"cons_id":"101000015368","cons_name":"路灯管理所39号路灯变","cons_no":"3602185611","contact_name":"李东成","contract_cap":"160","elec_addr":"钱家路与金武路交汇路口西北角","realtime_dl":"0","realtime_fh":"0","telephone":"15190535220","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.579927","y":"31.725305"},{"cons_id":"101000019913","cons_name":"路灯管理所51号路灯变","cons_no":"3602304218","contact_name":"李东成","contract_cap":"80","elec_addr":"思模桥东","realtime_dl":"0","realtime_fh":"0","telephone":"15190535220","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.61227","y":"31.74815"},{"cons_id":"101000019933","cons_name":"路灯管理所52号路灯变","cons_no":"3303071039","contact_name":"李东成","contract_cap":"160","elec_addr":"华阳北路与宏远路交叉路口宏远路往西20米","realtime_dl":"0","realtime_fh":"0","telephone":"15190535220","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.60344","y":"31.761832"},{"cons_id":"101000020157","cons_name":"路灯管理所63号路灯变","cons_no":"3303071042","contact_name":"李东成","contract_cap":"160","elec_addr":"沿河东路与南一环交叉路口","realtime_dl":"1","realtime_fh":"1","telephone":"15190535220","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.5766193679","y":"31.7438727068"},{"cons_id":"101000020902","cons_name":"常州市金坛建明机械制造厂","cons_no":"3602100007","contact_name":"陈胜","contract_cap":"4430","elec_addr":"金坛区金西工业园区23号","realtime_dl":"3119","realtime_fh":"2960","telephone":"13814780333","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.451764","y":"31.742956"},{"cons_id":"101000007390","cons_name":"康甫机械科技（常州）有限公司","cons_no":"3603480662","contact_name":"俞强","contract_cap":"315","elec_addr":"开发区国际工业城7#楼","realtime_dl":"1","realtime_fh":"1","telephone":"18505124323","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.6593270169","y":"31.7516216381"},{"cons_id":"101000012649","cons_name":"路灯管理所4号路灯变","cons_no":"3602294955","contact_name":"李东成","contract_cap":"200","elec_addr":"汇贤南路与南二环交叉路口西南","realtime_dl":"5","realtime_fh":"4","telephone":"15190535220","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.6185574699","y":"31.7376433177"},{"cons_id":"101000013614","cons_name":"路灯管理所14号路灯变","cons_no":"3602185626","contact_name":"李东成","contract_cap":"160","elec_addr":"南环二路与东环一路交叉路口东南","realtime_dl":"2","realtime_fh":"2","telephone":"15190535220","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.5917132817","y":"31.7355111732"},{"cons_id":"101000014190","cons_name":"路灯管理所16号路灯变","cons_no":"3603391280","contact_name":"李东成","contract_cap":"160","elec_addr":"舍田桥西 路北","realtime_dl":"0","realtime_fh":"0","telephone":"15190535220","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.5029482352","y":"31.7804030235"},{"cons_id":"101000020879","cons_name":"常州久日化学有限公司","cons_no":"3303058639","contact_name":"沈洪胜","contract_cap":"3830","elec_addr":"开发区东康路99号(CD)","realtime_dl":"1777","realtime_fh":"1736","telephone":"13921010582","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.6148834504","y":"31.7792516327"},{"cons_id":"101000035871","cons_name":"金坛区盐港公交首末站充电站","cons_no":"3603702147","contact_name":" 陆骞","contract_cap":"630","elec_addr":" 金坛区盐港公交首末站 ","realtime_dl":"0","realtime_fh":"0","telephone":"13915810671","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.5805618528","y":"31.778966214"},{"cons_id":"101000035879","cons_name":"扬溧高速长荡湖服务区扬州方向充电站","cons_no":"3603583478","contact_name":"秦燕军","contract_cap":"630","elec_addr":"金坛区扬溧高速长荡湖服务区(扬州方向)","realtime_dl":"0","realtime_fh":"0","telephone":"13306140868","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.4242341341","y":"31.6190830671"},{"cons_id":"101000035884","cons_name":"常合高速茅山服务区充电站","cons_no":"3603583459","contact_name":"陆骞","contract_cap":"630","elec_addr":"金坛区常合高速茅山服务区","realtime_dl":"0","realtime_fh":"0","telephone":"13915810671","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.3393629999","y":"31.7408525813"},{"cons_id":"101000012672","cons_name":"路灯管理所7号路灯变","cons_no":"3303067052","contact_name":"李东成","contract_cap":"160","elec_addr":"新党校北面","realtime_dl":"3","realtime_fh":"0","telephone":"15190535220","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.6034088238","y":"31.7322665921"},{"cons_id":"101000044114","cons_name":"高树（常州）饰品有限公司","cons_no":"3603458984","contact_name":"胡晶","contract_cap":"400","elec_addr":"金城镇工业集中区标准厂房1#","realtime_dl":"3","realtime_fh":"4","telephone":"13382837033","volt_value":"10kV","warning_num":"3","wn_all":"0","x":"119.5738295082","y":"31.7801610562"},{"cons_id":"101000044116","cons_name":"常州天马光伏电子有限公司","cons_no":"3603458987","contact_name":"章丽萍","contract_cap":"630","elec_addr":"金城镇工业集中区标准厂房2#","realtime_dl":"6","realtime_fh":"3","telephone":"18079000790","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.5743552212","y":"31.78063078"},{"cons_id":"101000044130","cons_name":"常州亿都电子有限公司","cons_no":"3603459002","contact_name":"蔡建梅","contract_cap":"800","elec_addr":"金城镇工业集中区标准厂房10#","realtime_dl":"1","realtime_fh":"0","telephone":"13806142299","volt_value":"10kV","warning_num":"2","wn_all":"0","x":"119.5746824507","y":"31.7789890164"},{"cons_id":"101000044174","cons_name":"江苏德林汽车零部件有限公司","cons_no":"3603459005","contact_name":"宋丽萍","contract_cap":"800","elec_addr":"金城镇工业集中区标准厂房15-1#","realtime_dl":"51","realtime_fh":"35","telephone":"13942573335","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.5764634375","y":"31.7785375264"},{"cons_id":"101000044854","cons_name":"常州市金坛区民防建设投资公司","cons_no":"3603865763","contact_name":"杨静","contract_cap":"3015","elec_addr":"东环一路东侧金坛大道北侧","realtime_dl":"0","realtime_fh":"0","telephone":"18961116981","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.592951824","y":"31.726384568"},{"cons_id":"101000015231","cons_name":"路灯管理所33号路灯变","cons_no":"3603398558","contact_name":"李东成","contract_cap":"80","elec_addr":"段岗桥往西100米 路南","realtime_dl":"0","realtime_fh":"0","telephone":"15190535220","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.356379","y":"31.729313"},{"cons_id":"101000020048","cons_name":"路灯管理所58号路灯变","cons_no":"3303071041","contact_name":"李东成","contract_cap":"160","elec_addr":"丹荆路冯庄村口往冯庄人家东北","realtime_dl":"0","realtime_fh":"0","telephone":"15190535220","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.5703154506","y":"31.7595157925"},{"cons_id":"101000020759","cons_name":"中航锂电(江苏)有限公司","cons_no":"3603641603","contact_name":"杨晓伟","contract_cap":"41080","elec_addr":"金坛区华罗庚产业园","realtime_dl":"6417","realtime_fh":"6270","telephone":"13552024340","volt_value":"110kV","warning_num":"0","wn_all":"0","x":"119.6289859378","y":"31.6869047355"},{"cons_id":"101000020885","cons_name":"常州斯威克光伏新材料有限公司 （三)","cons_no":"3603545170","contact_name":"吕松","contract_cap":"4000","elec_addr":"金坛市直溪工业集中区1、3# ","realtime_dl":"1586","realtime_fh":"2024","telephone":"51982690082","volt_value":"35kV","warning_num":"0","wn_all":"0","x":"119.468564016","y":"31.787518578"},{"cons_id":"101000007493","cons_name":"江苏常丰精密科技有限公司","cons_no":"3603760682","contact_name":"郭志星","contract_cap":"1065","elec_addr":"开发区标准厂房A区7号楼","realtime_dl":"0","realtime_fh":"0","telephone":"15301498118","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.6527477079","y":"31.7631467715"},{"cons_id":"101000014274","cons_name":"路灯管理所20号路灯变","cons_no":"3603240828","contact_name":"李东成","contract_cap":"80","elec_addr":"金阳路常竹埂大桥西100米王洋塑料南","realtime_dl":"0","realtime_fh":"0","telephone":"15190535220","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.5384553149","y":"31.755105862"},{"cons_id":"101000014674","cons_name":"路灯管理所26号路灯变","cons_no":"3603433693","contact_name":"李东成","contract_cap":"80","elec_addr":"潘庄桥南 路东","realtime_dl":"0","realtime_fh":"0","telephone":"15190535220","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.5920743428","y":"31.8213947576"},{"cons_id":"101000019893","cons_name":"路灯管理所49号路灯变","cons_no":"3602294953","contact_name":"李东成","contract_cap":"160","elec_addr":"华阳北路与东康路交叉路口","realtime_dl":"0","realtime_fh":"0","telephone":"15190535220","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.605205","y":"31.77948"},{"cons_id":"101000020832","cons_name":"江苏南方光纤科技有限公司","cons_no":"3603302178","contact_name":"李强","contract_cap":"4315","elec_addr":"开发区南环二路北、经九路西","realtime_dl":"2166","realtime_fh":"2260","telephone":"18118355199","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.640612","y":"31.739495"},{"cons_id":"101000007405","cons_name":"江苏戴兹乐机械科技有限公司","cons_no":"3603575815","contact_name":"苏万康","contract_cap":"250","elec_addr":"开发区国际工业城8#楼","realtime_dl":"5","realtime_fh":"5","telephone":"15850062789","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.6609148846","y":"31.7519227212"},{"cons_id":"101000007452","cons_name":"卓朗智能机械有限公司","cons_no":"3603398590","contact_name":"王翠","contract_cap":"400","elec_addr":"开发区国际工业城14#楼","realtime_dl":"1","realtime_fh":"1","telephone":"13961266216","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.6591714487","y":"31.7527438521"},{"cons_id":"101000013639","cons_name":"路灯管理所15号路灯变","cons_no":"3603398585","contact_name":"李东成","contract_cap":"160","elec_addr":"S241与S240交叉路口北侧 路东","realtime_dl":"0","realtime_fh":"0","telephone":"15190535220","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.5877840575","y":"31.815573427"},{"cons_id":"101000014738","cons_name":"路灯管理所28号路灯变","cons_no":"3603398503","contact_name":"李东成","contract_cap":"80","elec_addr":"北干河桥旁 路北","realtime_dl":"0","realtime_fh":"0","telephone":"15190535220","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.6526711411","y":"31.6201960496"},{"cons_id":"101000020782","cons_name":"埃马克(中国)机械有限公司 ","cons_no":"3603161768","contact_name":"徐卫","contract_cap":"6480","elec_addr":"江苏省金坛经济开发区南二环东路2888号","realtime_dl":"325","realtime_fh":"360","telephone":"15190527186","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.659845","y":"31.741534"},{"cons_id":"101000022122","cons_name":"金坛区滨湖新城金广场B楼","cons_no":"3603400922b","contact_name":"周胜","contract_cap":"16200","elec_addr":"金坛区金坛大道北侧东一环东侧东二环西侧","realtime_dl":"25","realtime_fh":"26","telephone":"13921003990","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.5939710635","y":"31.7287117153"},{"cons_id":"101000012508","cons_name":"路灯管理所1号路灯变","cons_no":"3601941092","contact_name":"李东成","contract_cap":"250","elec_addr":"340省道常溧路 S340与经十路交叉路口 韩氏医院旁","realtime_dl":"3","realtime_fh":"3","telephone":"15190535220","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.6552053628","y":"31.7716978388"},{"cons_id":"101000007352","cons_name":"新鸿电子有限公司","cons_no":"3603520171","contact_name":"高道庐","contract_cap":"565","elec_addr":"开发区国际工业城6#南楼","realtime_dl":"4","realtime_fh":"4","telephone":"18761032897","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.6579698191","y":"31.7516170762"},{"cons_id":"101000007377","cons_name":"江苏帝姆斯制冷设备有限公司","cons_no":"3603656276","contact_name":"丁文杰","contract_cap":"250","elec_addr":"开发区国际工业城6#北楼","realtime_dl":"1","realtime_fh":"1","telephone":"18001498888","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.6579698191","y":"31.7523925914"},{"cons_id":"101000020282","cons_name":"路灯管理所64号路灯变","cons_no":"3600844655","contact_name":"李东成","contract_cap":"80","elec_addr":"沿江高速金坛西道口至镇广路收费站2#","realtime_dl":"0","realtime_fh":"0","telephone":"15190535220","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.5540529076","y":"31.7109796443"},{"cons_id":"101000048123","cons_name":"江苏天奇隆节能科技有限公司","cons_no":"3602272045","contact_name":"高祝庆","contract_cap":"250","elec_addr":"F金城镇培丰化工园18#","realtime_dl":"0","realtime_fh":"0","telephone":"18036469696","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.5082","y":"31.73544"},{"cons_id":"101000048120","cons_name":"金坛市丰登环境技术服务有限公司","cons_no":"3359015758","contact_name":"蒋建春","contract_cap":"0","elec_addr":"直溪镇登冠","realtime_dl":"0","realtime_fh":"0","telephone":"13016852793","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.458706","y":"31.841647"},{"cons_id":"101000007908","cons_name":"常州瑞安普新材料有限公司","cons_no":"3603714127","contact_name":"戴惠彬","contract_cap":"500","elec_addr":"开发区标准厂房B区13号楼","realtime_dl":"2","realtime_fh":"1","telephone":"13382822400","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.6504164326","y":"31.763202139"},{"cons_id":"101000007924","cons_name":"江苏金坛国发国际投资发展有限公司","cons_no":"3603660885","contact_name":"王俊伟","contract_cap":"400","elec_addr":"开发区标准厂房B区14-2号楼","realtime_dl":"12","realtime_fh":"10","telephone":"13961140414","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.6494883883","y":"31.7626091672"},{"cons_id":"101000015130","cons_name":"路灯管理所30号路灯变","cons_no":"3603398535","contact_name":"李东成","contract_cap":"80","elec_addr":"中能石化西 路南","realtime_dl":"0","realtime_fh":"0","telephone":"15190535220","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.416085","y":"31.736423"},{"cons_id":"101000015316","cons_name":"路灯管理所37号路灯变","cons_no":"3303067051","contact_name":"李东成","contract_cap":"160","elec_addr":"金水湾外侧东南角 月荷路023#灯杆与024#灯杆间","realtime_dl":"0","realtime_fh":"0","telephone":"15190535220","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.608812","y":"31.75165"},{"cons_id":"101000015446","cons_name":"路灯管理所41号路灯变","cons_no":"3303074537","contact_name":"李东成","contract_cap":"160","elec_addr":"南洲里公园北部 “渭河桥”旁","realtime_dl":"1","realtime_fh":"1","telephone":"15190535220","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.5649497747","y":"31.7366159873"},{"cons_id":"101000019970","cons_name":"索拉特特种玻璃(江苏)股份有限公司","cons_no":"3602064387","contact_name":"陆宝根","contract_cap":"10000","elec_addr":"尧塘镇亿晶路8号","realtime_dl":"4780","realtime_fh":"5700","telephone":"15051108752","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.6789449547","y":"31.7294685684"},{"cons_id":"101000019988","cons_name":"路灯管理所54号路灯变","cons_no":"3602396713","contact_name":"李东成","contract_cap":"80","elec_addr":"红山路与西城路交叉路口西侧 易成电力对面 路南","realtime_dl":"0","realtime_fh":"0","telephone":"15190535220","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.5732608799","y":"31.7725311305"},{"cons_id":"101000020125","cons_name":"路灯管理所62号路灯变","cons_no":"3303070742","contact_name":"李东成","contract_cap":"160","elec_addr":"华阳南路139号路灯杆 东村站站牌南边 路西","realtime_dl":"0","realtime_fh":"0","telephone":"15190535220","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.6047166363","y":"31.7733857681"},{"cons_id":"101000020809","cons_name":"同方威视科技江苏有限公司","cons_no":"3603557523","contact_name":"岳永辉","contract_cap":"2900","elec_addr":"开发区科教路以北","realtime_dl":"97","realtime_fh":"102","telephone":"18018205310","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.642514","y":"31.724919"},{"cons_id":"101000020805","cons_name":"江苏蓝色星球环保科技股份有限公司","cons_no":"3303023890","contact_name":"尹和平","contract_cap":"7350","elec_addr":"220KV变电所(BD)(CX) ","realtime_dl":"2599","realtime_fh":"2597","telephone":"13706116596","volt_value":"35kV","warning_num":"0","wn_all":"0","x":"119.5779064659","y":"31.7785512079"},{"cons_id":"101000012704","cons_name":"路灯管理所8号路灯变","cons_no":"3603265226","contact_name":"李东成","contract_cap":"160","elec_addr":"S340 6P金珠商业广场对面 路北","realtime_dl":"0","realtime_fh":"0","telephone":"15190535220","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.4659153942","y":"31.7484678478"},{"cons_id":"101000012759","cons_name":"路灯管理所11号路灯变","cons_no":"3603240834","contact_name":"李东成","contract_cap":"160","elec_addr":"金坛大道与S241交叉路口西北","realtime_dl":"1","realtime_fh":"1","telephone":"15190535220","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.5550510216","y":"31.7270735604"},{"cons_id":"101000020028","cons_name":"路灯管理所57号路灯变","cons_no":"3303071033","contact_name":"李东成","contract_cap":"160","elec_addr":"西环二路南龙山大桥南80米","realtime_dl":"4","realtime_fh":"0","telephone":"15190535220","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.5677607297","y":"31.7392485628"},{"cons_id":"101000007535","cons_name":"江苏金坛国发国际投资发展有限公司","cons_no":"3603697434","contact_name":"王俊伟","contract_cap":"250","elec_addr":"开发区标准厂房B区12号楼","realtime_dl":"134","realtime_fh":"139","telephone":"15151927798","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.6511674511","y":"31.7632295069"},{"cons_id":"101000012613","cons_name":"路灯管理所3号路灯变","cons_no":"3601941100","contact_name":"李东成","contract_cap":"200","elec_addr":"S340 8P扬溧高速金坛西道口","realtime_dl":"0","realtime_fh":"0","telephone":"15190535220","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.436249547","y":"31.7434614628"},{"cons_id":"101000012755","cons_name":"路灯管理所10号路灯变","cons_no":"3603265028","contact_name":"李东成","contract_cap":"160","elec_addr":"东方三村村委会东北 路东","realtime_dl":"0","realtime_fh":"0","telephone":"15190535220","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.6122044955","y":"31.7945600882"},{"cons_id":"101000014240","cons_name":"路灯管理所18号路灯变","cons_no":"3602987928","contact_name":"李东成","contract_cap":"80","elec_addr":"盐港路与白塔路交叉路口西北","realtime_dl":"0","realtime_fh":"0","telephone":"15190535220","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.5704487982","y":"31.777706324"},{"cons_id":"101000019966","cons_name":"隆英(常州)机械制造有限公司 ","cons_no":"3601862056","contact_name":"孙琴芳","contract_cap":"13800","elec_addr":"金坛市开发区金武路","realtime_dl":"0","realtime_fh":"0","telephone":"13861105518","volt_value":"35kV","warning_num":"0","wn_all":"0","x":"119.6392096034","y":"31.7296078261"},{"cons_id":"101000044178","cons_name":"常州哈步机电科技有限公司","cons_no":"3603798609","contact_name":"凌龙云","contract_cap":"250","elec_addr":"金城镇工业集中区标准厂房16#","realtime_dl":"5","realtime_fh":"1","telephone":"17361871806","volt_value":"10kV","warning_num":"2","wn_all":"0","x":"119.5755836729","y":"31.7781179578"},{"cons_id":"101000015342","cons_name":"路灯管理所38号路灯变","cons_no":"3303074534","contact_name":"李东成","contract_cap":"160","elec_addr":"南洲里公园南部 游乐场西南“风雨桥”旁","realtime_dl":"0","realtime_fh":"0","telephone":"15190535220","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.559634","y":"31.734999"},{"cons_id":"101000020062","cons_name":"路灯管理所59号路灯变","cons_no":"3352016545","contact_name":"李东成","contract_cap":"80","elec_addr":"春风菜场北门","realtime_dl":"0","realtime_fh":"0","telephone":"15190535220","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.5828313764","y":"31.7605282091"}],"currentTime":"2018,04,06,17,34,11","dl_all":"1736303","fax":"","fh_all":"51222","heartLatitude":"31.755797","heartLongitude":"119.624066","khNormalNum":"159","khWarningNum":"9","mapLevel":"13","plate_cap_all":"443720","serviceRange":"常州市金坛区","subs_all":"168","subs_info":[{"cons_id":"101000007292","cons_name":"金坛高新技术创业服务中心","dataDate":"","dtPowerValue":"","plate_cap_all":"815","realtime_dl":"0","realtime_fh":"10","subs_id":"101000007294","subs_level":"0","subs_name":"国际工业城3#楼","trans_count":"2","volt_value":"10kV","warning_num":"2","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000007306","cons_name":"江苏华科园投资发展有限公司","dataDate":"","dtPowerValue":"","plate_cap_all":"630","realtime_dl":"0","realtime_fh":"13","subs_id":"101000007308","subs_level":"0","subs_name":"国际工业城4#楼","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000007337","cons_name":"金坛高新技术创业服务中心","dataDate":"","dtPowerValue":"","plate_cap_all":"630","realtime_dl":"0","realtime_fh":"23","subs_id":"101000007339","subs_level":"0","subs_name":"国际工业城5#北楼","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000007431","cons_name":"常州工程塑料实业有限公司","dataDate":"","dtPowerValue":"","plate_cap_all":"1280","realtime_dl":"0","realtime_fh":"0","subs_id":"101000007433","subs_level":"0","subs_name":"国际工业城10#楼","trans_count":"3","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000007434","cons_name":"江苏高新技术创业服务中心","dataDate":"","dtPowerValue":"","plate_cap_all":"250","realtime_dl":"0","realtime_fh":"13","subs_id":"101000007436","subs_level":"0","subs_name":"国际工业城13#北楼","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000007469","cons_name":"江苏高新技术创业服务中心","dataDate":"","dtPowerValue":"","plate_cap_all":"315","realtime_dl":"0","realtime_fh":"0","subs_id":"101000007471","subs_level":"0","subs_name":"国际工业城15#楼","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000007484","cons_name":"迈科锂电（江苏）有限公司","dataDate":"","dtPowerValue":"","plate_cap_all":"1000","realtime_dl":"0","realtime_fh":"0","subs_id":"101000007486","subs_level":"0","subs_name":"标准厂房A区2号楼","trans_count":"2","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000007487","cons_name":"江苏常丰精密科技有限公司","dataDate":"","dtPowerValue":"","plate_cap_all":"1065","realtime_dl":"0","realtime_fh":"0","subs_id":"101000007489","subs_level":"0","subs_name":"标准厂房A区4号楼","trans_count":"3","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000007490","cons_name":"江苏金坛国发国际投资发展有限公司","dataDate":"","dtPowerValue":"","plate_cap_all":"2065","realtime_dl":"0","realtime_fh":"45","subs_id":"101000007492","subs_level":"0","subs_name":"标准厂房A区5号楼","trans_count":"4","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000007493","cons_name":"江苏常丰精密科技有限公司","dataDate":"","dtPowerValue":"","plate_cap_all":"1065","realtime_dl":"0","realtime_fh":"0","subs_id":"101000007495","subs_level":"0","subs_name":"标准厂房A区7号楼","trans_count":"3","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000014293","cons_name":"路灯管理所21号路灯变","dataDate":"","dtPowerValue":"","plate_cap_all":"80","realtime_dl":"0","realtime_fh":"0","subs_id":"101000014436","subs_level":"0","subs_name":"路灯管理所21号路灯变","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000015231","cons_name":"路灯管理所33号路灯变","dataDate":"","dtPowerValue":"","plate_cap_all":"80","realtime_dl":"0","realtime_fh":"0","subs_id":"101000015232","subs_level":"0","subs_name":"路灯管理所33号路灯变","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000015280","cons_name":"路灯管理所35号路灯变","dataDate":"","dtPowerValue":"","plate_cap_all":"80","realtime_dl":"0","realtime_fh":"0","subs_id":"101000015282","subs_level":"0","subs_name":"路灯管理所35号路灯变","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000015342","cons_name":"路灯管理所38号路灯变","dataDate":"","dtPowerValue":"","plate_cap_all":"160","realtime_dl":"0","realtime_fh":"0","subs_id":"101000015343","subs_level":"0","subs_name":"路灯管理所38号路灯变","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000015369","cons_name":"瑞声新材料科技（常州）有限公司","dataDate":"","dtPowerValue":"","plate_cap_all":"1250","realtime_dl":"0","realtime_fh":"326","subs_id":"101000015370","subs_level":"0","subs_name":"开发区国际工业城1号东楼","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000015368","cons_name":"路灯管理所39号路灯变","dataDate":"","dtPowerValue":"","plate_cap_all":"160","realtime_dl":"0","realtime_fh":"0","subs_id":"101000015386","subs_level":"0","subs_name":"路灯管理所39号路灯变","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000015420","cons_name":"路灯管理所40号路灯变","dataDate":"","dtPowerValue":"","plate_cap_all":"160","realtime_dl":"0","realtime_fh":"4","subs_id":"101000015421","subs_level":"0","subs_name":"路灯管理所40号路灯变","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000015446","cons_name":"路灯管理所41号路灯变","dataDate":"","dtPowerValue":"","plate_cap_all":"160","realtime_dl":"0","realtime_fh":"1","subs_id":"101000015447","subs_level":"0","subs_name":"路灯管理所41号路灯变","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000015818","cons_name":"路灯管理所43号路灯变","dataDate":"","dtPowerValue":"","plate_cap_all":"160","realtime_dl":"0","realtime_fh":"0","subs_id":"101000015819","subs_level":"0","subs_name":"路灯管理所43号路灯变","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000015885","cons_name":"路灯管理所46号路灯变","dataDate":"","dtPowerValue":"","plate_cap_all":"160","realtime_dl":"0","realtime_fh":"0","subs_id":"101000015886","subs_level":"0","subs_name":"路灯管理所46号路灯变","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000019886","cons_name":"路灯管理所48号路灯变","dataDate":"","dtPowerValue":"","plate_cap_all":"160","realtime_dl":"0","realtime_fh":"0","subs_id":"101000019890","subs_level":"0","subs_name":"路灯管理所48号路灯变","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000019957","cons_name":"江苏兴荣美乐铜业有限公司","dataDate":"","dtPowerValue":"","plate_cap_all":"10000","realtime_dl":"0","realtime_fh":"6069","subs_id":"101000019958","subs_level":"0","subs_name":"江苏兴荣美乐铜业有限公司","trans_count":"1","volt_value":"35kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000019966","cons_name":"隆英(常州)机械制造有限公司 ","dataDate":"","dtPowerValue":"","plate_cap_all":"5000","realtime_dl":"0","realtime_fh":"0","subs_id":"101000019967","subs_level":"0","subs_name":"隆英(常州)机械制造有限公司 ","trans_count":"2","volt_value":"35kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000019970","cons_name":"索拉特特种玻璃(江苏)股份有限公司","dataDate":"","dtPowerValue":"","plate_cap_all":"10000","realtime_dl":"0","realtime_fh":"5700","subs_id":"101000019971","subs_level":"0","subs_name":"索拉特特种玻璃(江苏)股份有限公司","trans_count":"4","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000019978","cons_name":"常州市金坛华鑫机械装备科技有限公司","dataDate":"","dtPowerValue":"","plate_cap_all":"91500","realtime_dl":"0","realtime_fh":"864","subs_id":"101000019979","subs_level":"0","subs_name":"常州市金坛华鑫机械装备科技有限公司","trans_count":"4","volt_value":"110V","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000019982","cons_name":"江苏金煌纸业有限公司","dataDate":"","dtPowerValue":"","plate_cap_all":"31500","realtime_dl":"0","realtime_fh":"704","subs_id":"101000019983","subs_level":"0","subs_name":"江苏金煌纸业有限公司","trans_count":"1","volt_value":"110V","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000019988","cons_name":"路灯管理所54号路灯变","dataDate":"","dtPowerValue":"","plate_cap_all":"46","realtime_dl":"0","realtime_fh":"0","subs_id":"101000019989","subs_level":"0","subs_name":"路灯管理所54号路灯变","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000020282","cons_name":"路灯管理所64号路灯变","dataDate":"","dtPowerValue":"","plate_cap_all":"80","realtime_dl":"0","realtime_fh":"0","subs_id":"101000020291","subs_level":"0","subs_name":"路灯管理所64号路灯变","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000020625","cons_name":"正信光电科技股份有限公司","dataDate":"","dtPowerValue":"","plate_cap_all":"2800","realtime_dl":"0","realtime_fh":"701","subs_id":"101000020626","subs_level":"0","subs_name":"正信光电科技股份有限公司","trans_count":"3","volt_value":"35kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000020694","cons_name":"常州市金坛区铠建合金材料科技有限公司","dataDate":"","dtPowerValue":"","plate_cap_all":"40000","realtime_dl":"0","realtime_fh":"0","subs_id":"101000020714","subs_level":"0","subs_name":"常州市金坛区铠建合金材料科技有限公司","trans_count":"1","volt_value":"110V","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000020736","cons_name":"常州宝佳新材料科技有限公司","dataDate":"","dtPowerValue":"","plate_cap_all":"200","realtime_dl":"0","realtime_fh":"0","subs_id":"101000020737","subs_level":"0","subs_name":"常州宝佳新材料科技有限公司","trans_count":"1","volt_value":"110V","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000020832","cons_name":"江苏南方光纤科技有限公司","dataDate":"","dtPowerValue":"","plate_cap_all":"4315","realtime_dl":"0","realtime_fh":"2260","subs_id":"101000020833","subs_level":"0","subs_name":"江苏南方光纤科技有限公司","trans_count":"3","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000020885","cons_name":"常州斯威克光伏新材料有限公司 （三)","dataDate":"","dtPowerValue":"","plate_cap_all":"4000","realtime_dl":"0","realtime_fh":"2024","subs_id":"101000020886","subs_level":"0","subs_name":"常州斯威克光伏新材料有限公司 （三)","trans_count":"4","volt_value":"35kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000020894","cons_name":"奥托立夫(江苏)汽车安全零部件有限公司 ","dataDate":"","dtPowerValue":"","plate_cap_all":"13700","realtime_dl":"0","realtime_fh":"63","subs_id":"101000020895","subs_level":"0","subs_name":"奥托立夫(江苏)汽车安全零部件有限公司 ","trans_count":"5","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000020898","cons_name":"常州裕能石英科技有限公司","dataDate":"","dtPowerValue":"","plate_cap_all":"3250","realtime_dl":"0","realtime_fh":"0","subs_id":"101000020899","subs_level":"0","subs_name":"常州裕能石英科技有限公司","trans_count":"3","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000020902","cons_name":"常州市金坛建明机械制造厂","dataDate":"","dtPowerValue":"","plate_cap_all":"4430","realtime_dl":"0","realtime_fh":"2960","subs_id":"101000020903","subs_level":"0","subs_name":"常州市金坛建明机械制造厂","trans_count":"4","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000038860","cons_name":"江苏金坛国发国际投资发展有限公司","dataDate":"","dtPowerValue":"","plate_cap_all":"250","realtime_dl":"0","realtime_fh":"0","subs_id":"101000038861","subs_level":"0","subs_name":"开发区标准厂房c区21号楼","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000022148","cons_name":"金坛区滨湖新城金广场C楼","dataDate":"","dtPowerValue":"","plate_cap_all":"2500","realtime_dl":"0","realtime_fh":"96","subs_id":"101000022149","subs_level":"0","subs_name":"金坛区滨湖新城金广场C楼","trans_count":"2","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000044116","cons_name":"常州天马光伏电子有限公司","dataDate":"","dtPowerValue":"","plate_cap_all":"630","realtime_dl":"0","realtime_fh":"3","subs_id":"101000044117","subs_level":"0","subs_name":"金城镇工业集中区2号楼","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000044128","cons_name":"金坛区华昊机械厂","dataDate":"","dtPowerValue":"","plate_cap_all":"315","realtime_dl":"0","realtime_fh":"0","subs_id":"101000044129","subs_level":"0","subs_name":"金城镇工业集中区8号楼","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000044176","cons_name":"常州威龙医药设备有限公司","dataDate":"","dtPowerValue":"","plate_cap_all":"250","realtime_dl":"0","realtime_fh":"1","subs_id":"101000044177","subs_level":"0","subs_name":"金城镇工业集中区12-1号楼","trans_count":"1","volt_value":"10kV","warning_num":"5","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000048311","cons_name":"常州市金坛同城建设投资发展有限公司","dataDate":"","dtPowerValue":"","plate_cap_all":"1600","realtime_dl":"0","realtime_fh":"9","subs_id":"101000048312","subs_level":"0","subs_name":"金城镇工业集中区生活区","trans_count":"2","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000007390","cons_name":"康甫机械科技（常州）有限公司","dataDate":"","dtPowerValue":"","plate_cap_all":"315","realtime_dl":"0","realtime_fh":"1","subs_id":"101000007392","subs_level":"0","subs_name":"国际工业城7#楼","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000007405","cons_name":"江苏戴兹乐机械科技有限公司","dataDate":"","dtPowerValue":"","plate_cap_all":"250","realtime_dl":"0","realtime_fh":"5","subs_id":"101000007407","subs_level":"0","subs_name":"国际工业城8#楼","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000007418","cons_name":"思拓达仓储泊车技术（常州）有限公司","dataDate":"","dtPowerValue":"","plate_cap_all":"250","realtime_dl":"0","realtime_fh":"1","subs_id":"101000007420","subs_level":"0","subs_name":"国际工业城9#楼","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000007449","cons_name":"金坛高新技术创业服务中心","dataDate":"","dtPowerValue":"","plate_cap_all":"250","realtime_dl":"0","realtime_fh":"0","subs_id":"101000007451","subs_level":"0","subs_name":"国际工业城13#南楼","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000007452","cons_name":"卓朗智能机械有限公司","dataDate":"","dtPowerValue":"","plate_cap_all":"400","realtime_dl":"0","realtime_fh":"1","subs_id":"101000007454","subs_level":"0","subs_name":"国际工业城14#楼","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000013586","cons_name":"路灯管理所13号路灯变","dataDate":"","dtPowerValue":"","plate_cap_all":"160","realtime_dl":"0","realtime_fh":"0","subs_id":"101000013588","subs_level":"0","subs_name":"路灯管理所13号路灯变","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000013614","cons_name":"路灯管理所14号路灯变","dataDate":"","dtPowerValue":"","plate_cap_all":"160","realtime_dl":"0","realtime_fh":"2","subs_id":"101000013616","subs_level":"0","subs_name":"路灯管理所14号路灯变","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000012648","cons_name":"路灯管理所5号路灯变","dataDate":"","dtPowerValue":"","plate_cap_all":"200","realtime_dl":"0","realtime_fh":"2","subs_id":"101000012652","subs_level":"0","subs_name":"路灯管理所5号路灯变","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000012649","cons_name":"路灯管理所4号路灯变","dataDate":"","dtPowerValue":"","plate_cap_all":"200","realtime_dl":"0","realtime_fh":"4","subs_id":"101000012653","subs_level":"0","subs_name":"路灯管理所4号路灯变","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000012671","cons_name":"路灯管理所6号路灯变","dataDate":"","dtPowerValue":"","plate_cap_all":"160","realtime_dl":"0","realtime_fh":"0","subs_id":"101000012677","subs_level":"0","subs_name":"路灯管理所6号路灯变","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000012709","cons_name":"路灯管理所9号路灯变","dataDate":"","dtPowerValue":"","plate_cap_all":"160","realtime_dl":"0","realtime_fh":"0","subs_id":"101000012713","subs_level":"0","subs_name":"路灯管理所9号路灯变","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000013578","cons_name":"路灯管理所12号路灯变","dataDate":"","dtPowerValue":"","plate_cap_all":"160","realtime_dl":"0","realtime_fh":"1","subs_id":"101000013580","subs_level":"0","subs_name":"路灯管理所12号路灯变","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000013639","cons_name":"路灯管理所15号路灯变","dataDate":"","dtPowerValue":"","plate_cap_all":"160","realtime_dl":"0","realtime_fh":"0","subs_id":"101000013641","subs_level":"0","subs_name":"路灯管理所15号路灯变","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000014190","cons_name":"路灯管理所16号路灯变","dataDate":"","dtPowerValue":"","plate_cap_all":"160","realtime_dl":"0","realtime_fh":"0","subs_id":"101000014192","subs_level":"0","subs_name":"路灯管理所16号路灯变","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000014215","cons_name":"路灯管理所17号路灯变","dataDate":"","dtPowerValue":"","plate_cap_all":"100","realtime_dl":"0","realtime_fh":"0","subs_id":"101000014217","subs_level":"0","subs_name":"路灯管理所17号路灯变","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000014257","cons_name":"路灯管理所19号路灯变","dataDate":"","dtPowerValue":"","plate_cap_all":"80","realtime_dl":"0","realtime_fh":"0","subs_id":"101000014259","subs_level":"0","subs_name":"路灯管理所19号路灯变","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000014274","cons_name":"路灯管理所20号路灯变","dataDate":"","dtPowerValue":"","plate_cap_all":"80","realtime_dl":"0","realtime_fh":"0","subs_id":"101000014276","subs_level":"0","subs_name":"路灯管理所20号路灯变","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000014640","cons_name":"路灯管理所24号路灯变","dataDate":"","dtPowerValue":"","plate_cap_all":"80","realtime_dl":"0","realtime_fh":"0","subs_id":"101000014641","subs_level":"0","subs_name":"路灯管理所24号路灯变","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000014657","cons_name":"路灯管理所25号路灯变","dataDate":"","dtPowerValue":"","plate_cap_all":"80","realtime_dl":"0","realtime_fh":"0","subs_id":"101000014658","subs_level":"0","subs_name":"路灯管理所25号路灯变","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000014674","cons_name":"路灯管理所26号路灯变","dataDate":"","dtPowerValue":"","plate_cap_all":"80","realtime_dl":"0","realtime_fh":"0","subs_id":"101000014675","subs_level":"0","subs_name":"路灯管理所26号路灯变","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000014720","cons_name":"路灯管理所27号路灯变","dataDate":"","dtPowerValue":"","plate_cap_all":"80","realtime_dl":"0","realtime_fh":"0","subs_id":"101000014721","subs_level":"0","subs_name":"路灯管理所27号路灯变","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000014738","cons_name":"路灯管理所28号路灯变","dataDate":"","dtPowerValue":"","plate_cap_all":"80","realtime_dl":"0","realtime_fh":"0","subs_id":"101000014739","subs_level":"0","subs_name":"路灯管理所28号路灯变","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000015110","cons_name":"路灯管理所29号路灯变","dataDate":"","dtPowerValue":"","plate_cap_all":"80","realtime_dl":"0","realtime_fh":"0","subs_id":"101000015111","subs_level":"0","subs_name":"路灯管理所29号路灯变","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000012582","cons_name":"江苏省健尔康医用敷料有限公司","dataDate":"","dtPowerValue":"","plate_cap_all":"4260","realtime_dl":"0","realtime_fh":"1701","subs_id":"101000012584","subs_level":"0","subs_name":"健尔康配电房","trans_count":"7","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000020062","cons_name":"路灯管理所59号路灯变","dataDate":"","dtPowerValue":"","plate_cap_all":"36","realtime_dl":"0","realtime_fh":"0","subs_id":"101000020063","subs_level":"0","subs_name":"路灯管理所59号路灯变","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000015195","cons_name":"路灯管理所31号路灯变","dataDate":"","dtPowerValue":"","plate_cap_all":"80","realtime_dl":"0","realtime_fh":"0","subs_id":"101000015196","subs_level":"0","subs_name":"路灯管理所31号路灯变","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000015864","cons_name":"路灯管理所45号路灯变","dataDate":"","dtPowerValue":"","plate_cap_all":"160","realtime_dl":"0","realtime_fh":"0","subs_id":"101000015865","subs_level":"0","subs_name":"路灯管理所45号路灯变","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000015906","cons_name":"路灯管理所47号路灯变","dataDate":"","dtPowerValue":"","plate_cap_all":"160","realtime_dl":"0","realtime_fh":"0","subs_id":"101000015907","subs_level":"0","subs_name":"路灯管理所47号路灯变","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000012588","cons_name":"路灯管理所2号路灯变","dataDate":"","dtPowerValue":"","plate_cap_all":"250","realtime_dl":"0","realtime_fh":"0","subs_id":"101000012590","subs_level":"0","subs_name":"路灯管理所2号路灯变","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000020125","cons_name":"路灯管理所62号路灯变","dataDate":"","dtPowerValue":"","plate_cap_all":"160","realtime_dl":"0","realtime_fh":"0","subs_id":"101000020126","subs_level":"0","subs_name":"路灯管理所62号路灯变","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000020157","cons_name":"路灯管理所63号路灯变","dataDate":"","dtPowerValue":"","plate_cap_all":"160","realtime_dl":"0","realtime_fh":"1","subs_id":"101000020158","subs_level":"0","subs_name":"路灯管理所63号路灯变","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000020379","cons_name":"路灯管理所65号路灯变","dataDate":"","dtPowerValue":"","plate_cap_all":"160","realtime_dl":"0","realtime_fh":"0","subs_id":"101000020380","subs_level":"0","subs_name":"路灯管理所65号路灯变","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000020557","cons_name":"常州嘉华新型合金材料科技有限公司","dataDate":"","dtPowerValue":"","plate_cap_all":"31500","realtime_dl":"0","realtime_fh":"0","subs_id":"101000020561","subs_level":"0","subs_name":"常州嘉华新型合金材料科技有限公司","trans_count":"1","volt_value":"110kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000020579","cons_name":"江苏中东化肥股份有限公司","dataDate":"","dtPowerValue":"","plate_cap_all":"2630","realtime_dl":"0","realtime_fh":"0","subs_id":"101000020619","subs_level":"0","subs_name":"江苏中东化肥股份有限公司","trans_count":"3","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000020642","cons_name":"常州市科宇重工科技有限公司","dataDate":"","dtPowerValue":"","plate_cap_all":"1000","realtime_dl":"0","realtime_fh":"168","subs_id":"101000020644","subs_level":"0","subs_name":"常州市科宇重工科技有限公司","trans_count":"1","volt_value":"35kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000020759","cons_name":"中航锂电(江苏)有限公司","dataDate":"","dtPowerValue":"","plate_cap_all":"40000","realtime_dl":"0","realtime_fh":"6270","subs_id":"101000020760","subs_level":"0","subs_name":"中航锂电(江苏)有限公司","trans_count":"1","volt_value":"110V","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000020805","cons_name":"江苏蓝色星球环保科技股份有限公司","dataDate":"","dtPowerValue":"","plate_cap_all":"6300","realtime_dl":"0","realtime_fh":"2597","subs_id":"101000020806","subs_level":"0","subs_name":"江苏蓝色星球环保科技股份有限公司","trans_count":"2","volt_value":"35kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000020836","cons_name":"常州市金坛经编装饰品厂","dataDate":"","dtPowerValue":"","plate_cap_all":"1945","realtime_dl":"0","realtime_fh":"1640","subs_id":"101000020837","subs_level":"0","subs_name":"常州市金坛经编装饰品厂","trans_count":"4","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000020863","cons_name":"江苏晨风服装有限公司 (一) ","dataDate":"","dtPowerValue":"","plate_cap_all":"2430","realtime_dl":"0","realtime_fh":"880","subs_id":"101000020864","subs_level":"0","subs_name":"江苏西文晨风服装有限公司 (一) ","trans_count":"4","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000020879","cons_name":"常州久日化学有限公司","dataDate":"","dtPowerValue":"","plate_cap_all":"1250","realtime_dl":"0","realtime_fh":"1736","subs_id":"101000020880","subs_level":"0","subs_name":"常州久日化学有限公司","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000021483","cons_name":"金广场总用水水表","dataDate":"","dtPowerValue":"","plate_cap_all":"0","realtime_dl":"0","realtime_fh":"0","subs_id":"101000021495","subs_level":"0","subs_name":"金广场水表","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000022122","cons_name":"金坛区滨湖新城金广场B楼","dataDate":"","dtPowerValue":"","plate_cap_all":"2500","realtime_dl":"0","realtime_fh":"26","subs_id":"101000022123","subs_level":"0","subs_name":"金坛区滨湖新城金广场B楼","trans_count":"2","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000022174","cons_name":"金坛区滨湖新城金广场D楼","dataDate":"","dtPowerValue":"","plate_cap_all":"1600","realtime_dl":"0","realtime_fh":"45","subs_id":"101000022175","subs_level":"0","subs_name":"金坛区滨湖新城金广场D楼","trans_count":"2","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000035864","cons_name":"金坛区东城实验小学公交首末站充电站","dataDate":"","dtPowerValue":"","plate_cap_all":"630","realtime_dl":"0","realtime_fh":"170","subs_id":"101000035865","subs_level":"0","subs_name":"二号充电站","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000035871","cons_name":"金坛区盐港公交首末站充电站","dataDate":"","dtPowerValue":"","plate_cap_all":"630","realtime_dl":"0","realtime_fh":"0","subs_id":"101000035872","subs_level":"0","subs_name":" 金坛区盐港公交首末站","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000035875","cons_name":"扬溧高速长荡湖服务区溧阳方向充电站","dataDate":"","dtPowerValue":"","plate_cap_all":"630","realtime_dl":"0","realtime_fh":"0","subs_id":"101000035877","subs_level":"0","subs_name":"金坛区扬溧高速长荡湖服务区(溧阳方向)","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000035879","cons_name":"扬溧高速长荡湖服务区扬州方向充电站","dataDate":"","dtPowerValue":"","plate_cap_all":"630","realtime_dl":"0","realtime_fh":"0","subs_id":"101000035880","subs_level":"0","subs_name":"金坛区扬溧高速长荡湖服务区(扬州方向)","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000035884","cons_name":"常合高速茅山服务区充电站","dataDate":"","dtPowerValue":"","plate_cap_all":"630","realtime_dl":"0","realtime_fh":"0","subs_id":"101000035885","subs_level":"0","subs_name":" 金坛区常合高速茅山服务区","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000035888","cons_name":"薛埠客运站充电站","dataDate":"","dtPowerValue":"","plate_cap_all":"630","realtime_dl":"0","realtime_fh":"0","subs_id":"101000035889","subs_level":"0","subs_name":"薛埠客运站","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000039274","cons_name":"路灯管理所50号路灯变","dataDate":"","dtPowerValue":"","plate_cap_all":"80","realtime_dl":"0","realtime_fh":"0","subs_id":"101000039297","subs_level":"0","subs_name":"50号路灯变","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000048123","cons_name":"江苏天奇隆节能科技有限公司","dataDate":"","dtPowerValue":"","plate_cap_all":"0","realtime_dl":"0","realtime_fh":"0","subs_id":"101000048124","subs_level":"0","subs_name":"用户变电站#1","trans_count":"0","volt_value":"220kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000048127","cons_name":"金坛金能电力建设有限公司","dataDate":"","dtPowerValue":"","plate_cap_all":"0","realtime_dl":"0","realtime_fh":"0","subs_id":"101000048128","subs_level":"0","subs_name":"用户变电站#1","trans_count":"0","volt_value":"220kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000003483","cons_name":"江苏艾龙森汽车部件有限公司","dataDate":"","dtPowerValue":"","plate_cap_all":"630","realtime_dl":"0","realtime_fh":"2","subs_id":"101000003491","subs_level":"0","subs_name":"标准厂房B区9号楼","trans_count":"2","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000004448","cons_name":"百瑞医疗科技（常州）有限公司","dataDate":"","dtPowerValue":"","plate_cap_all":"900","realtime_dl":"0","realtime_fh":"0","subs_id":"101000004450","subs_level":"0","subs_name":"国际工业城5号南楼","trans_count":"2","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000007496","cons_name":"常州市福欧车辆配件有限公司","dataDate":"","dtPowerValue":"","plate_cap_all":"1000","realtime_dl":"0","realtime_fh":"285","subs_id":"101000007498","subs_level":"0","subs_name":"标准厂房B区11号楼","trans_count":"2","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000007992","cons_name":"江苏金坛国发国际投资发展有限公司","dataDate":"","dtPowerValue":"","plate_cap_all":"250","realtime_dl":"0","realtime_fh":"0","subs_id":"101000007997","subs_level":"0","subs_name":"标准厂房C区17号楼","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000012508","cons_name":"路灯管理所1号路灯变","dataDate":"","dtPowerValue":"","plate_cap_all":"250","realtime_dl":"0","realtime_fh":"3","subs_id":"101000012514","subs_level":"0","subs_name":"路灯管理所1号路灯变","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000012672","cons_name":"路灯管理所7号路灯变","dataDate":"","dtPowerValue":"","plate_cap_all":"160","realtime_dl":"0","realtime_fh":"0","subs_id":"101000012675","subs_level":"0","subs_name":"路灯管理所7号路灯变","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000019933","cons_name":"路灯管理所52号路灯变","dataDate":"","dtPowerValue":"","plate_cap_all":"160","realtime_dl":"0","realtime_fh":"0","subs_id":"101000019934","subs_level":"0","subs_name":"路灯管理所52号路灯变","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000012704","cons_name":"路灯管理所8号路灯变","dataDate":"","dtPowerValue":"","plate_cap_all":"160","realtime_dl":"0","realtime_fh":"0","subs_id":"101000012706","subs_level":"0","subs_name":"路灯管理所8号路灯变","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000012755","cons_name":"路灯管理所10号路灯变","dataDate":"","dtPowerValue":"","plate_cap_all":"160","realtime_dl":"0","realtime_fh":"0","subs_id":"101000012757","subs_level":"0","subs_name":"路灯管理所10号路灯变","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000014240","cons_name":"路灯管理所18号路灯变","dataDate":"","dtPowerValue":"","plate_cap_all":"80","realtime_dl":"0","realtime_fh":"0","subs_id":"101000014242","subs_level":"0","subs_name":"路灯管理所18号路灯变","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000019893","cons_name":"路灯管理所49号路灯变","dataDate":"","dtPowerValue":"","plate_cap_all":"160","realtime_dl":"0","realtime_fh":"0","subs_id":"101000019894","subs_level":"0","subs_name":"路灯管理所49号路灯变","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000019961","cons_name":"江苏君诚新材料有限公司","dataDate":"","dtPowerValue":"","plate_cap_all":"3200","realtime_dl":"0","realtime_fh":"0","subs_id":"101000019962","subs_level":"0","subs_name":"江苏君诚新材料有限公司","trans_count":"2","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000037320","cons_name":"常州市金坛区东城街道社区卫生服务中心","dataDate":"","dtPowerValue":"","plate_cap_all":"3600","realtime_dl":"0","realtime_fh":"177","subs_id":"101000037322","subs_level":"0","subs_name":"金坛区第二人民医院","trans_count":"2","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000043925","cons_name":"常州市金坛综合能源服务中心","dataDate":"","dtPowerValue":"","plate_cap_all":"0","realtime_dl":"0","realtime_fh":"0","subs_id":"101000043926","subs_level":"0","subs_name":"博源监控中心","trans_count":"0","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000043984","cons_name":"江苏一号农场科技有限公司","dataDate":"","dtPowerValue":"","plate_cap_all":"1400","realtime_dl":"0","realtime_fh":"232","subs_id":"101000043985","subs_level":"0","subs_name":"江苏海之客农业发展有限公司配电房","trans_count":"2","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000044114","cons_name":"高树（常州）饰品有限公司","dataDate":"","dtPowerValue":"","plate_cap_all":"400","realtime_dl":"0","realtime_fh":"4","subs_id":"101000044115","subs_level":"0","subs_name":"金城镇工业集中区1号楼","trans_count":"1","volt_value":"10kV","warning_num":"3","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000044118","cons_name":"常州得力刀具有限公司","dataDate":"","dtPowerValue":"","plate_cap_all":"0","realtime_dl":"0","realtime_fh":"0","subs_id":"101000044119","subs_level":"0","subs_name":"金城镇工业集中区3号楼","trans_count":"0","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000044120","cons_name":"常州云隆工程设备有限公司","dataDate":"","dtPowerValue":"","plate_cap_all":"250","realtime_dl":"0","realtime_fh":"65","subs_id":"101000044121","subs_level":"0","subs_name":"金城镇工业集中区4号楼","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000044122","cons_name":"常州天马光伏电子有限公司","dataDate":"","dtPowerValue":"","plate_cap_all":"315","realtime_dl":"0","realtime_fh":"2","subs_id":"101000044123","subs_level":"0","subs_name":"金城镇工业集中区5号楼","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000044124","cons_name":" 江苏尚唯汽车饰件有限公司","dataDate":"","dtPowerValue":"","plate_cap_all":"800","realtime_dl":"0","realtime_fh":"7","subs_id":"101000044125","subs_level":"0","subs_name":"金城镇工业集中区6号楼","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000044132","cons_name":"常州鼎盛泰克热交换器有限公司","dataDate":"","dtPowerValue":"","plate_cap_all":"500","realtime_dl":"0","realtime_fh":"8","subs_id":"101000044133","subs_level":"0","subs_name":"金城镇工业集中区11号楼","trans_count":"1","volt_value":"10kV","warning_num":"4","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000044174","cons_name":"江苏德林汽车零部件有限公司","dataDate":"","dtPowerValue":"","plate_cap_all":"800","realtime_dl":"0","realtime_fh":"35","subs_id":"101000044175","subs_level":"0","subs_name":"金城镇工业集中区15-1号楼","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000044854","cons_name":"常州市金坛区民防建设投资公司","dataDate":"","dtPowerValue":"","plate_cap_all":"3015","realtime_dl":"0","realtime_fh":"0","subs_id":"101000044855","subs_level":"0","subs_name":"常州市金坛区民防建设投资公司","trans_count":"4","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000001891","cons_name":"金坛区滨湖新城金广场A楼","dataDate":"","dtPowerValue":"","plate_cap_all":"8000","realtime_dl":"0","realtime_fh":"737","subs_id":"101000001892","subs_level":"0","subs_name":"金坛区滨湖新城金广场A楼","trans_count":"5","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"119.5941641825","y":"31.7281002745","ztPowerValue":""},{"cons_id":"101000002313","cons_name":"瑞声新材料科技（常州）有限公司","dataDate":"","dtPowerValue":"","plate_cap_all":"4000","realtime_dl":"0","realtime_fh":"271","subs_id":"101000002315","subs_level":"0","subs_name":"国际工业城1#南楼","trans_count":"2","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000007256","cons_name":"瑞声光电科技（常州）有限公司","dataDate":"","dtPowerValue":"","plate_cap_all":"630","realtime_dl":"0","realtime_fh":"6","subs_id":"101000007258","subs_level":"0","subs_name":"国际工业城2#楼","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000007352","cons_name":"新鸿电子有限公司","dataDate":"","dtPowerValue":"","plate_cap_all":"565","realtime_dl":"0","realtime_fh":"4","subs_id":"101000007354","subs_level":"0","subs_name":"国际工业城6#南楼","trans_count":"2","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000007377","cons_name":"江苏帝姆斯制冷设备有限公司","dataDate":"","dtPowerValue":"","plate_cap_all":"250","realtime_dl":"0","realtime_fh":"1","subs_id":"101000007379","subs_level":"0","subs_name":"国际工业城6#北楼","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000014452","cons_name":"路灯管理所22号路灯变","dataDate":"","dtPowerValue":"","plate_cap_all":"80","realtime_dl":"0","realtime_fh":"0","subs_id":"101000014454","subs_level":"0","subs_name":"路灯管理所22号路灯变","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000014486","cons_name":"路灯管理所23号路灯变","dataDate":"","dtPowerValue":"","plate_cap_all":"80","realtime_dl":"0","realtime_fh":"0","subs_id":"101000014488","subs_level":"0","subs_name":"路灯管理所23号路灯变","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000020105","cons_name":"路灯管理所61号路灯变","dataDate":"","dtPowerValue":"","plate_cap_all":"160","realtime_dl":"0","realtime_fh":"0","subs_id":"101000020106","subs_level":"0","subs_name":"路灯管理所61号路灯变","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000044126","cons_name":"江苏德道汽车科技有限公司","dataDate":"","dtPowerValue":"","plate_cap_all":"315","realtime_dl":"0","realtime_fh":"133","subs_id":"101000044127","subs_level":"0","subs_name":"金城镇工业集中区7号楼","trans_count":"1","volt_value":"10kV","warning_num":"5","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000041139","cons_name":"常州中景房地产开发有限公司","dataDate":"","dtPowerValue":"","plate_cap_all":"5000","realtime_dl":"0","realtime_fh":"184","subs_id":"101000041140","subs_level":"0","subs_name":"常州中景房地产开发有限公司配电房","trans_count":"3","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000044130","cons_name":"常州亿都电子有限公司","dataDate":"","dtPowerValue":"","plate_cap_all":"800","realtime_dl":"0","realtime_fh":"0","subs_id":"101000044131","subs_level":"0","subs_name":"金城镇工业集中区10号楼","trans_count":"1","volt_value":"10kV","warning_num":"2","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000044134","cons_name":"常州欧仑催化科技有限公司","dataDate":"","dtPowerValue":"","plate_cap_all":"250","realtime_dl":"0","realtime_fh":"0","subs_id":"101000044135","subs_level":"0","subs_name":"金城镇工业集中区12-2号楼","trans_count":"1","volt_value":"10kV","warning_num":"4","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000044178","cons_name":"常州哈步机电科技有限公司","dataDate":"","dtPowerValue":"","plate_cap_all":"250","realtime_dl":"0","realtime_fh":"1","subs_id":"101000044179","subs_level":"0","subs_name":"金城镇工业集中区16号楼","trans_count":"1","volt_value":"10kV","warning_num":"2","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000044194","cons_name":"常州泽城投资发展有限公司","dataDate":"","dtPowerValue":"","plate_cap_all":"315","realtime_dl":"0","realtime_fh":"3","subs_id":"101000044195","subs_level":"0","subs_name":"中心幼儿园","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000044196","cons_name":"常州市金坛元巷综合市场有限公司","dataDate":"","dtPowerValue":"","plate_cap_all":"800","realtime_dl":"0","realtime_fh":"15","subs_id":"101000044197","subs_level":"0","subs_name":"金城镇元巷综合市场","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000001077","cons_name":"山进特殊钢(江苏)有限公司","dataDate":"","dtPowerValue":"","plate_cap_all":"815","realtime_dl":"0","realtime_fh":"1","subs_id":"101000001078","subs_level":"0","subs_name":"国际工业城16#楼","trans_count":"2","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000007535","cons_name":"江苏金坛国发国际投资发展有限公司","dataDate":"","dtPowerValue":"","plate_cap_all":"250","realtime_dl":"0","realtime_fh":"139","subs_id":"101000007537","subs_level":"0","subs_name":"标准厂房B区12号楼","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000007908","cons_name":"常州瑞安普新材料有限公司","dataDate":"","dtPowerValue":"","plate_cap_all":"500","realtime_dl":"0","realtime_fh":"1","subs_id":"101000007910","subs_level":"0","subs_name":"标准厂房B区13号楼","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000007921","cons_name":"常州亿海汽车内饰材料有限公司","dataDate":"","dtPowerValue":"","plate_cap_all":"815","realtime_dl":"0","realtime_fh":"0","subs_id":"101000007923","subs_level":"0","subs_name":"标准厂房B区14-1号楼","trans_count":"2","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000007924","cons_name":"江苏金坛国发国际投资发展有限公司","dataDate":"","dtPowerValue":"","plate_cap_all":"400","realtime_dl":"0","realtime_fh":"10","subs_id":"101000007926","subs_level":"0","subs_name":"标准厂房B区14-2号楼","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000007938","cons_name":"江苏亨泰汽车零部件有限公司","dataDate":"","dtPowerValue":"","plate_cap_all":"500","realtime_dl":"0","realtime_fh":"27","subs_id":"101000007940","subs_level":"0","subs_name":"标准厂房C区15号楼","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000009476","cons_name":"瑞声新材料科技（常州）有限公司","dataDate":"","dtPowerValue":"","plate_cap_all":"2000","realtime_dl":"0","realtime_fh":"244","subs_id":"101000009478","subs_level":"0","subs_name":"国际工业城1#北楼","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000012613","cons_name":"路灯管理所3号路灯变","dataDate":"","dtPowerValue":"","plate_cap_all":"200","realtime_dl":"0","realtime_fh":"0","subs_id":"101000012615","subs_level":"0","subs_name":"路灯管理所3号路灯变","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000012759","cons_name":"路灯管理所11号路灯变","dataDate":"","dtPowerValue":"","plate_cap_all":"160","realtime_dl":"0","realtime_fh":"1","subs_id":"101000012761","subs_level":"0","subs_name":"路灯管理所11号路灯变","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000015130","cons_name":"路灯管理所30号路灯变","dataDate":"","dtPowerValue":"","plate_cap_all":"80","realtime_dl":"0","realtime_fh":"0","subs_id":"101000015131","subs_level":"0","subs_name":"路灯管理所30号路灯变","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000015213","cons_name":"路灯管理所32号路灯变","dataDate":"","dtPowerValue":"","plate_cap_all":"80","realtime_dl":"0","realtime_fh":"0","subs_id":"101000015214","subs_level":"0","subs_name":"路灯管理所32号路灯变","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000015250","cons_name":"路灯管理所34号路灯变","dataDate":"","dtPowerValue":"","plate_cap_all":"80","realtime_dl":"0","realtime_fh":"0","subs_id":"101000015252","subs_level":"0","subs_name":"路灯管理所34号路灯变","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000015298","cons_name":"路灯管理所36号路灯变","dataDate":"","dtPowerValue":"","plate_cap_all":"80","realtime_dl":"0","realtime_fh":"0","subs_id":"101000015299","subs_level":"0","subs_name":"路灯管理所36号路灯变","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000015316","cons_name":"路灯管理所37号路灯变","dataDate":"","dtPowerValue":"","plate_cap_all":"160","realtime_dl":"0","realtime_fh":"0","subs_id":"101000015317","subs_level":"0","subs_name":"路灯管理所37号路灯变","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000015784","cons_name":"路灯管理所42号路灯变","dataDate":"","dtPowerValue":"","plate_cap_all":"100","realtime_dl":"0","realtime_fh":"0","subs_id":"101000015785","subs_level":"0","subs_name":"路灯管理所42号路灯变","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000015843","cons_name":"路灯管理所44号路灯变","dataDate":"","dtPowerValue":"","plate_cap_all":"160","realtime_dl":"0","realtime_fh":"0","subs_id":"101000015844","subs_level":"0","subs_name":"路灯管理所44号路灯变","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000019913","cons_name":"路灯管理所51号路灯变","dataDate":"","dtPowerValue":"","plate_cap_all":"98","realtime_dl":"0","realtime_fh":"0","subs_id":"101000019914","subs_level":"0","subs_name":"路灯管理所51号路灯变","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000019953","cons_name":"常州盘石水泥有限公司","dataDate":"","dtPowerValue":"","plate_cap_all":"31500","realtime_dl":"0","realtime_fh":"8272","subs_id":"101000019955","subs_level":"0","subs_name":"常州盘固水泥有限公司","trans_count":"1","volt_value":"110V","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000019974","cons_name":"江苏亿禾新材料有限公司","dataDate":"","dtPowerValue":"","plate_cap_all":"7600","realtime_dl":"0","realtime_fh":"-825","subs_id":"101000019975","subs_level":"0","subs_name":"江苏亿禾新材料有限公司","trans_count":"4","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000019986","cons_name":"路灯管理所53号路灯变","dataDate":"","dtPowerValue":"","plate_cap_all":"0","realtime_dl":"0","realtime_fh":"0","subs_id":"101000019987","subs_level":"0","subs_name":"路灯管理所53号路灯变","trans_count":"0","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000020008","cons_name":"路灯管理所55号路灯变","dataDate":"","dtPowerValue":"","plate_cap_all":"160","realtime_dl":"0","realtime_fh":"0","subs_id":"101000020009","subs_level":"0","subs_name":"路灯管理所55号路灯变","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000020025","cons_name":"路灯管理所56号路灯变","dataDate":"","dtPowerValue":"","plate_cap_all":"80","realtime_dl":"0","realtime_fh":"1","subs_id":"101000020026","subs_level":"0","subs_name":"路灯管理所56号路灯变","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000020028","cons_name":"路灯管理所57号路灯变","dataDate":"","dtPowerValue":"","plate_cap_all":"160","realtime_dl":"0","realtime_fh":"0","subs_id":"101000020029","subs_level":"0","subs_name":"路灯管理所57号路灯变","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000020048","cons_name":"路灯管理所58号路灯变","dataDate":"","dtPowerValue":"","plate_cap_all":"160","realtime_dl":"0","realtime_fh":"0","subs_id":"101000020049","subs_level":"0","subs_name":"路灯管理所58号路灯变","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000020082","cons_name":"路灯管理所60号路灯变","dataDate":"","dtPowerValue":"","plate_cap_all":"160","realtime_dl":"0","realtime_fh":"0","subs_id":"101000020083","subs_level":"0","subs_name":"路灯管理所60号路灯变","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000020478","cons_name":"路灯管理所66号路灯变","dataDate":"","dtPowerValue":"","plate_cap_all":"80","realtime_dl":"0","realtime_fh":"0","subs_id":"101000020479","subs_level":"0","subs_name":"路灯管理所66号路灯变","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000020782","cons_name":"埃马克(中国)机械有限公司 ","dataDate":"","dtPowerValue":"","plate_cap_all":"4600","realtime_dl":"0","realtime_fh":"360","subs_id":"101000020783","subs_level":"0","subs_name":"埃马克(中国)机械有限公司 ","trans_count":"4","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000020809","cons_name":"同方威视科技江苏有限公司","dataDate":"","dtPowerValue":"","plate_cap_all":"2900","realtime_dl":"0","realtime_fh":"102","subs_id":"101000020810","subs_level":"0","subs_name":"同方威视科技江苏有限公司","trans_count":"4","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000020840","cons_name":"晨风(江苏)服装有限公司 （三）","dataDate":"","dtPowerValue":"","plate_cap_all":"2860","realtime_dl":"0","realtime_fh":"1540","subs_id":"101000020841","subs_level":"0","subs_name":"晨风(江苏)服装有限公司 （三）","trans_count":"4","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000020867","cons_name":"晨风(江苏)服装有限公司 （二）","dataDate":"","dtPowerValue":"","plate_cap_all":"1260","realtime_dl":"0","realtime_fh":"686","subs_id":"101000020876","subs_level":"0","subs_name":"晨风(江苏)服装有限公司 （二）","trans_count":"2","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000020890","cons_name":"常州斯威克光伏新材料有限公司（二）","dataDate":"","dtPowerValue":"","plate_cap_all":"2400","realtime_dl":"0","realtime_fh":"1165","subs_id":"101000020891","subs_level":"0","subs_name":"常州斯威克光伏新材料有限公司（二）","trans_count":"3","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000038869","cons_name":"江苏金坛国发国际投资发展有限公司","dataDate":"","dtPowerValue":"","plate_cap_all":"250","realtime_dl":"0","realtime_fh":"1","subs_id":"101000038870","subs_level":"0","subs_name":"开发区标准厂房c区23号楼","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000040964","cons_name":"常州金冬毛纺有限公司","dataDate":"","dtPowerValue":"","plate_cap_all":"815","realtime_dl":"0","realtime_fh":"0","subs_id":"101000040965","subs_level":"0","subs_name":"常州金冬毛纺有限公司","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000044653","cons_name":"常州金坛半边山旅游管理有限公司","dataDate":"","dtPowerValue":"","plate_cap_all":"315","realtime_dl":"0","realtime_fh":"79","subs_id":"101000044654","subs_level":"0","subs_name":"金坛区薛埠镇茅东林场","trans_count":"1","volt_value":"10kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000044835","cons_name":"江苏常宝普莱森钢管有限公司","dataDate":"","dtPowerValue":"","plate_cap_all":"0","realtime_dl":"0","realtime_fh":"101","subs_id":"101000044836","subs_level":"0","subs_name":"江苏常宝普莱森钢管有限公司","trans_count":"1","volt_value":"35kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""},{"cons_id":"101000048120","cons_name":"金坛市丰登环境技术服务有限公司","dataDate":"","dtPowerValue":"","plate_cap_all":"0","realtime_dl":"0","realtime_fh":"0","subs_id":"101000048121","subs_level":"0","subs_name":"用户变电站#1","trans_count":"0","volt_value":"220kV","warning_num":"0","wn_all":"0","x":"0.0","y":"0.0","ztPowerValue":""}],"telephone":"","trans_all":"249","warning_all":"28","wn_all":"7"} ');
				// 汇总刷新
				refreshHuiZongData(data, true);
				// 获取刷新客户和用户变信息
				getRefreshData(data);
				// 设置定时刷新
				pageRefresh = setInterval("refreshMap();", "5000");

				// 初始化地图
				if(data.heartLongitude > 0 && data.heartLatitude > 0){
					// 地图对象与DIV绑定
					 mp = new BMap.Map('gisMap', {
						 enableMapClick : false
					});
					// 初始化地图
					map.gisInit(mp, data);
//					$("#gisMap").html(JSON.stringify(data));

				} else {
					$("#gisMap").css("font-size", 40);
					$("#gisMap").html("请先维护区域中心信息！");
				}
		// 	}
		// });
}

/**
 * 刷新页面
 * 
 */
function refreshMap() {
	
	// 未获取到信息，只刷新区域数据
	if(refreshdata == null || refreshdata == "" || refreshdata == "{}"){
		refreshdata = "";
	}
		$.ajax({
			type : "POST",
			url : webContextRoot + 'giszl/gisRefresh.action',
			data : refreshdata==""?"":jQuery.parseJSON(refreshdata),
			dataType : "json",
			success : function(data) {
				// 汇总刷新
//				 $("#gisMap").html(JSON.stringify(data));
				refreshHuiZongData(data, false);
				// 地图刷新
				if(mp != null){
					map.gisRefresh(mp, data);
				}
			}
		});
}

/**
 * 刷新汇总信息 初始化时更新实时信息和汇总信息 刷新时只更新实时信息
 * 
 */
function refreshHuiZongData(data, flag) {
	// 初始化
	if (flag) {
		
//		if(top.areaNo == '101'){
//			// 企业总数
//			$('#gisqy').text(156);
//			// 用户变总数
//			$('#gisbdz').text(156);
//			// 企业标识总数
//			$('#ssxx_panel').panel({
//		        title: '客户（156）'
//		    });
//			// 用户变标识总数
//			$('#xxhz_panel').panel({
//		        title: '变电站（156）'
//		    });
//		}else{
			// 企业总数
			$('#gisqy').text(data.cons_all);
			// 用户变总数
			$('#gisbdz').text(data.subs_all);
			// 企业标识总数
			$('#ssxx_panel').panel({
		        title: '客户（' + data.cons_all + '）'
		    });
			// 用户变标识总数
			$('#xxhz_panel').panel({
		        title: '变电站（' + data.subs_all + '）'
		    });
//		}

		// 主变总数
		$('#giszb').text(data.trans_all);
		// 主变容量
		$('#giszbrl').text(data.plate_cap_all + "kVA");
		// 电量
		$('#gisdl').text(data.dl_all + "kWh");
	}
	// 负荷
	$('#gisfh').text(data.fh_all + "kW");
	// 未完成工单总数
	$('#gisgd').text(data.wn_all);
	// 告警总数
	$('#gisgj').text(data.warning_all);

//	if(top.areaNo == '101'){
//		// 客户正常标识
//		$('#khExplainNormal').text(156 - data.khWarningNum);
//		// 变电站正常标识
//		$('#bdzExplainNormal').text(156 - data.bdzWarningNum);
//	}else{
		// 客户正常标识
		$('#khExplainNormal').text(data.khNormalNum);
		// 变电站正常标识
		$('#bdzExplainNormal').text(data.bdzNormalNum);
//	}
	
	// 客户告警标识
	$('#khExplainWarning').text(data.khWarningNum);
	// 变电站告警标识
	$('#bdzExplainWarning').text(data.bdzWarningNum);
}

/**
 * 企业跳转用户变监控
 * 
 */
function forJumpyhbByqy(consId) {
	var item = {
		path : '/des/pages/despages/monitor/userMonitor.jsp?consId=' + consId,
		name : 'desyhbjk',
		text : '一次图监控'
	};
	top.reloadTabPage(item);
}

/**
 * 变电站跳转用户变监控
 * 
 */
function forJumpyhbBybdz(consId, subsId) {
	var item = {
		path : '/des/pages/despages/monitor/userMonitor.jsp?consId=' + consId
				+ '&userTranId=' + subsId,
		name : 'desyhbjk',
		text : '一次图监控'
	};
	top.reloadTabPage(item);
}

/**
 * 客户跳转客户监控
 * 
 */
function forJumpKhjk(consId, consName) {
	var item = {
		path : '/des/pages/despages/warn/khjk.jsp?consId=' + consId
				+ '&consName=' + consName,
		name : 'ssjkLeafKfjk',
		text : '客户视图'
	};
	top.reloadTabPage(item);
}

/**
 * 根据屏幕大小设置字体大小
 */
function resize() {
	var pheight = $("#gis_panel").height();
	var maxH = pheight / 6 - 4;
	var fS = parseInt(maxH / 110 * 16);
	$("#gis_panel #left-bottom-panel .img-panel").css({
		"width" : maxH,
		"height" : maxH
	});
	$("#gis_panel #left-bottom-panel .img-panel .label").css({
		"font-size" : fS
	});
	$("#gis_panel #left-bottom-panel .img-panel .labelnum").css({
		"font-size" : fS - 2
	});
	$("#gis_panel #left-bottom-panel .img-panel .labeltitle").css({
		"font-size" : fS
	});
}

/**
 * 客户总数弹窗
 */
function userTotal(){
	var content = "<iframe src='"+webContextRoot+"pages/areaEnergy/baseData/collArchiveInfo.jsp?isEdit=false&roleId="+top.roleId+"&roleCode="+top.roleCode+"&statusCode=1&userType=1' width='100%' height='99%' frameborder='0' scrolling='no'/>";	
	var boarddiv = "<div id='GISkhzsMsgwindow' />";
	$(document.body).append(boarddiv);
	var win = $("#GISkhzsMsgwindow").window({
		content : content,
		width : document.body.clientWidth-100,
		height : document.body.clientHeight-100,
		collapsible : false,
		minimizable : false,
		modal : 'shadow',
		title : '客户信息',
	});
	win.window('open');
	win.window('center');
}

/**
 * 变电站总数弹窗
 */
function bdzTotal(){
	var content = "<iframe src='"+webContextRoot+"/pages/despages/warn/bdzCount.jsp' width='100%' height='99%' frameborder='0' scrolling='no'/>";	
	var boarddiv = "<div id='GISbdzzsMsgwindow' />";
	$(document.body).append(boarddiv);
	var win = $("#GISbdzzsMsgwindow").window({
		content : content,
		width : document.body.clientWidth-100,
		height : document.body.clientHeight-100,
		collapsible : false,
		minimizable : false,
		modal : 'shadow',
		title : '变电站信息',
	});
	win.window('open');
	win.window('center');
}

/**
 * 主变总数弹窗
 */
function zbCount(){
	var content = "<iframe src='"+webContextRoot+"/pages/despages/warn/zbCount.jsp' width='100%' height='99%' frameborder='0' scrolling='no'/>";	
	var boarddiv = "<div id='GISzbzsMsgwindow' />";
	$(document.body).append(boarddiv);
	var win = $("#GISzbzsMsgwindow").window({
		content : content,
		width : document.body.clientWidth-100,
		height : document.body.clientHeight-100,
		collapsible : false,
		minimizable : false,
		modal : 'shadow',
		title : '主变信息',
	});
	win.window('open');
	win.window('center');
}

/**
 * 主变总容量弹窗
 */
function zbTotal(){
	var content = "<iframe src='"+webContextRoot+"/pages/despages/warn/zbCount.jsp' width='100%' height='99%' frameborder='0' scrolling='no'/>";	
	var boarddiv = "<div id='GISzbzrlMsgwindow' />";
	$(document.body).append(boarddiv);
	var win = $("#GISzbzrlMsgwindow").window({
		content : content,
		width : document.body.clientWidth-100,
		height : document.body.clientHeight-100,
		collapsible : false,
		minimizable : false,
		modal : 'shadow',
		title : '主变信息',
	});
	win.window('open');
	win.window('center');
}

/**
 * 工单总数弹窗
 */
function openGd(){
 	var content = "<iframe src='"+webContextRoot+"/pages/despages/labour/labour.jsp?subsId=0' width='100%' height='99%' frameborder='0' scrolling='no'/>";	
 	var boarddiv = "<div id='GISgdzsMsgwindow' />";
 	$(document.body).append(boarddiv);
 	var win = $("#GISgdzsMsgwindow").window({
 		content : content,
 		width : document.body.clientWidth-100,
 		height : document.body.clientHeight-100,
 		collapsible : false,
		minimizable : false,
 		modal : 'shadow',
 		title : '待办工单信息',
 	});
 	win.window('open');
 	win.window('center');
 }

/**
 * 昨日总电量弹窗
 */
function opendl(){
 	var content = "<iframe id='GISDl' src='"+webContextRoot+"/pages/despages/monitor/gisDlInfo.jsp?' width='100%' height='99%' frameborder='0' scrolling='no'/>";	
 	var boarddiv = "<div id='GISzrzdlMsgwindow'/>";
 	$(document.body).append(boarddiv);
 	var win = $("#GISzrzdlMsgwindow").window({
 		content : content,
 		width : document.body.clientWidth-100,
 		height : document.body.clientHeight-100,
 		collapsible : false,
		minimizable : false,
 		modal : 'shadow',
 		title : '区域用电',
 		onMaximize : function() {
			document.getElementById("GISDl").contentWindow.echartResize();
		},
		onRestore : function() {
			document.getElementById("GISDl").contentWindow.echartResize();
		}
 	});
 	win.window('open');
 	win.window('center');
 }

/**
 * 实时负荷弹窗
 */
function openfh(){
 	var content = "<iframe id='GISFh' src='"+webContextRoot+"/pages/despages/monitor/gisLineInfo.jsp?' width='100%' height='99%' frameborder='0' scrolling='no'/>";	
 	var boarddiv = "<div id='GISFhMsgwindow'/>";
 	$(document.body).append(boarddiv);
 	var win = $("#GISFhMsgwindow").window({
 		content : content,
 		width : document.body.clientWidth-100,
 		height : document.body.clientHeight-100,
 		collapsible : false,
		minimizable : false,
 		modal : 'shadow',
 		title : '区域负荷',
 		onMaximize : function() {
			document.getElementById("GISFh").contentWindow.echartResize();
		},
		onRestore : function() {
			document.getElementById("GISFh").contentWindow.echartResize();
		}
 	});
 	win.window('open');
 	win.window('center');
 }

/**
 * 客户实时负荷
 */
function khRealTimeFh(id, dataType){
	var content = "<iframe id='GISKhFh' src='"+webContextRoot+"pages/despages/monitor/gisKhRealTimeFh.jsp?id="+id+"&dataType="+dataType+"' width='100%' height='99%' frameborder='0' scrolling='no'/>";	
	var boarddiv = "<div id='GISkhssfhMsgwindow'/>";
	$(document.body).append(boarddiv);
	var windowTitle = "";
	if(dataType == 1){
		windowTitle = '客户负荷曲线';
	}else if (dataType == 2){
		windowTitle = '变电站负荷曲线';
	}
	var win = $("#GISkhssfhMsgwindow").window({
		content : content,
		width : document.body.clientWidth-100,
		height : document.body.clientHeight-100,
		collapsible : false,
		minimizable : false,
		modal : 'shadow',
		title : windowTitle,
		onMaximize : function() {
			document.getElementById("GISKhFh").contentWindow.document.getElementById("gisKhRealTimeFhLineFrame").contentWindow.echartResize();
		},
		onRestore : function() {
			document.getElementById("GISKhFh").contentWindow.document.getElementById("gisKhRealTimeFhLineFrame").contentWindow.echartResize();
		}
	});
	win.window('open');
	win.window('center');
}

/**
 * 客户实时电量
 */
function xsData(rootId, treeNodeType){
//	var consId = 101000001077;//你要传的企业id
//	var dateTime = "2017-03-31";//查询时间，不需要传空
	var content = "<iframe id='GISDl' src='"+webContextRoot+"/pages/despages/warn/xsdlData.jsp?rootId="+rootId+"&treeNodeType="+treeNodeType+"' width='100%' height='99%' frameborder='0' scrolling='no'/>";
	var boarddiv = "<div id='GISkhssdlMsgwindow' />";
	$(document.body).append(boarddiv);
	var windowTitle = "";
	if(treeNodeType == 1){
		windowTitle = '客户电量';
	}else if (treeNodeType == 2){
		windowTitle = '变电站电量';
	}
	var win = $("#GISkhssdlMsgwindow").window({
		content : content,
		width : document.body.clientWidth-100,
		height : document.body.clientHeight-100,
		collapsible : false,
		minimizable : false,
		modal : 'shadow',
		title : windowTitle,
		onMaximize : function() {
			document.getElementById("GISDl").contentWindow.echartResize();
		},
		onRestore : function() {
			document.getElementById("GISDl").contentWindow.echartResize();
		}
	});
	win.window('open');
	win.window('center');
}

/**
 * 刷新用数据组装
 */
function getRefreshData(data) {
	var idDataFlag = false;
	refreshdata = '{';
	for (var i = 0; i < data.cons_info.length; i++) {
		if (i == 0) {
			idDataFlag = true;
			refreshdata = refreshdata + '"gisZongLanModel.cons_info[' + i
					+ '].cons_id" : ' + data.cons_info[i].cons_id;
		} else {
			refreshdata = refreshdata + ', "gisZongLanModel.cons_info[' + i
					+ '].cons_id" : ' + data.cons_info[i].cons_id;
		}
	}

	for (var i = 0; i < data.subs_info.length; i++) {
		if (idDataFlag) {
			refreshdata = refreshdata + ', "gisZongLanModel.subs_info[' + i
					+ '].subs_id" : ' + data.subs_info[i].subs_id;
		} else {
			refreshdata = refreshdata + '"gisZongLanModel.subs_info[' + i
					+ '].subs_id" : ' + data.subs_info[i].subs_id;
		}
	}
	refreshdata = refreshdata + '}';
}

////搜索按钮点击
//function searchEvent(e){
//	if (e == 'click' || e.keyCode == 13) {
//		var key = $('#searchInput').val();
//		$.ajax({
//			type: "post",
//			url: webContextRoot + "/giszl/bigScreenQueryConsName.action?key=" + key,
//			data: "",
//			dataType:"json",
//			cache : false,
//			async : true,//同步异步请求
//			success: function(result)
//			{	
//				if (result.userNameList.length > 0){
//					alert(result.userNameList[0].CONSID);
//				}else{
//					alert('不存在此用户！');
//				}
//			},
//			error:function(e)
//			{
////				alert(e);
//			}
//		});
//	}
//}

function getResult(){
	var key = $('#searchInput').val();
	if (key.length > 0){
		$.ajax({
			type: "post",
			url: webContextRoot + "/bigScreen/bigScreenQueryConsName.action?key=" + key,
			data: "",
			dataType:"json",
			cache : false,
			async : true,//同步异步请求
			success: function(result)
			{
				$('#searchResultUl').html('');
				if (result.userNameList.length > 0){
					$.each(result.userNameList, function(i, n){
						$('<li style="white-space: nowrap;height: 25px;line-height: 25px;cursor: pointer;">' + n.CONSNAME + '</li>').click(function(){
							$('#searchResult').animate({ opacity: '0' }, 400);
							setTimeout(function(){
								$('#searchResult').css({
									'display' : 'none'
								});
							}, 400);
							$('#searchInput').val(n.CONSNAME);
							map.panToKh(mp, n.CONSID);
//							alert(n.CONSID);
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
//				alert(e);
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