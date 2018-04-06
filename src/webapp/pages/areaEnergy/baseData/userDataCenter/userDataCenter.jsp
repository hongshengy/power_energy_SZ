<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="com.frontier.util.des.*"%>

<%@page import="com.frontier.pubmodule.AueicUtil"%>
<%@page import="java.util.Calendar"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Date"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Calendar"%>
<%@page import="com.frontier.framework.util.DatabaseUtil"%>
<%@page import="com.frontier.pubmodule.AueicUtil"%>




<%
	String baseUrl = request.getContextPath();
	String pagePath = baseUrl + "/pages/despages";
	String vtradeCode = request.getParameter("tradeCode");
	String vtradeName = request.getParameter("tradeName");

	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ baseUrl + "/";

	String orgName = null;
	String orgNo = null;
	String roleName = null;
	// 取得角色ID
	Long nowRoleId = new Long(0);
	if (request.getSession().getAttribute("roleId") != null) {
		// 取得角色ID
		nowRoleId = (Long) request.getSession().getAttribute("roleId");
		System.out.println(request.getSession()
				.getAttribute("roleName"));
		//	roleName = request.getSession().getAttribute("roleName").toString();

		// 取得供电单位
		orgNo = AueicUtil.getPorgNoByRole(nowRoleId).toString();
		orgName = AueicUtil.getPorgNameByRole(Long.parseLong(orgNo))
				.toString();
	} else {
		orgNo = "32101";
		orgName = "江苏省电力公司";
	}

	SimpleDateFormat sdfFrom = new SimpleDateFormat("yyyy-MM-dd");
	// 默认上月
	Calendar calDay = Calendar.getInstance();
	calDay.add(Calendar.DAY_OF_MONTH, -29);
	String preDay = sdfFrom.format(calDay.getTime());
	// 当天
	Date newDate = DatabaseUtil.getSysDate();
	String today = sdfFrom.format(newDate);
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">

<title>区域能源服务中心_首页_小区</title>

<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">



<link rel="stylesheet" type="text/css"
	href="<%=pagePath%>/jquery-easyui-1.5.1/themes/fangtian/easyui.css">
<link rel="stylesheet" type="text/css"
	href="<%=pagePath%>/jquery-easyui-1.5.1/themes/icon.css">
<link rel="stylesheet" type="text/css"
	href="<%=pagePath%>/jquery-easyui-1.5.1/themes/color.css">
<link rel="stylesheet" type="text/css"
	href="<%=pagePath%>/css/common.css">


<script type="text/javascript"
	src="<%=pagePath%>/jquery-easyui-1.5.1/jquery.min.js"></script>
<script type="text/javascript"
	src="<%=pagePath%>/jquery-easyui-1.5.1/jquery.easyui.min.js"></script>
<script type="text/javascript"
	src="<%=pagePath%>/jquery-easyui-1.5.1/easyui-lang-zh_CN.js"></script>
<script type="text/javascript"
	src="<%=pagePath%>/echarts/echarts.min.js"></script>
<script type="text/javascript"
	src="<%=baseUrl%>/pages/basicApp/photovoltaic2/echarts/js/echarts.js"></script>
<%-- 
    <script type="text/javascript" src="<%=baseUrl %>/pages/eemspages/echarts/js/echarts.js"></script>
    <script type="text/javascript" src="<%=baseUrl %>/pages/despages/echarts/echarts.min.js"></script>
	--%>

<%-- 
    <script type="text/javascript" src="<%=baseUrl %>/pages/eemspages/echarts/js/echarts-all.js"></script>
    /pages/basicApp/photovoltaic2/echarts/js/echarts.js
    <script type="text/javascript" src="<%=baseUrl%>/js/jquery.js"></script>

<script type="text/javascript" 
src="<%=baseUrl%>/pages/areaEnergy/baseData/userDataCenter/jquery.ba-resize.min.js"></script>
    
     --%>


<script type="text/javascript" src="<%=baseUrl%>/js/util/Util.js"></script>



<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
<style type="text/css">
* {
	margin: 0px 0px;
	padding: 0px 0px;
	border: none;
}

.body_div_start_one {
	height: 100%;
	width: 100%;
}

.tuBiaoInfo {
	width: 100%;
	height: 100%;
	overflow: auto;
}
/**
			easyui-panel:
				background:#fafafa;
		**/
.echartsPageStyle {
	width: 100%;
	height: 100%;
}
</style>

</head>
<body style="overflow:hidden; ">
	<div id="p" style="width:100%;height:100%;overflow: hidden;">
		<div class="easyui-panel" title="查询结果" style="padding: 2px 20px;">
			数据日期： <input id="endDay1" type="text" class="easyui-datebox"
				class="dateTime_style" style="height: 25px;width: 155px;"
				value="<%=today%>" /> <a onclick="loadQydlBar();" id="button_query"
				href="javascript:void(0);" class="easyui-linkbutton"
				style="height: 25px;width: 40px;" plain>查询</a>
		</div>
		<div class="tuBiaoInfo" id="tuBiaoInfo" style="overflow: hidden;">
			<div id="tt" class="easyui-tabs" id=""
				style="background-color: gray;height: 93%;">


				<div title="图表" style="">
					<div id="EchartPageByLine" class="echartsPageStyle"></div>
				</div>

				<div title="数据" data-options="closable:false" style="overflow:auto;">
					<table class="easyui-datagrid" style="height:100%;width: 100%;"
						data-options="fitColumns:false,singleSelect:false">
						<thead>
							<tr>
								<th width="10%" align="center" data-options="field:'code'"></th>
								<th width="45%" align="center" data-options="field:'name'">名称</th>
								<th width="45%" align="center" data-options="field:'price'">价格</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>001</td>
								<td>name1</td>
								<td>2323</td>
							</tr>
							<tr>
								<td>002</td>
								<td>name2</td>
								<td>4612</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>

</body>

<script type="text/javascript">
		
		var myChart1;
		
		var paramStartDay = "2017-03-08";
		
		
		$(document).ready(function(){
			myChart1 = echarts.init(document.getElementById('EchartPageByLine'));
			loadEchartPageByLine();
		});
		
		//$(window).resize(function(){
			/**var bodyclientHeight = $('#p')[0].clientHeight;
			var bodyclientWidth = $('#p')[0].clientWidth;
			
			var tuBiaoInfoclientHeight = $('#tuBiaoInfo')[0].clientHeight;
			var tuBiaoInfobodyclientWidth = $('#tuBiaoInfo')[0].clientWidth;
			tt
			var ttclientHeight = $('#tt')[0].clientHeight;
			var ttclientWidth = $('#tt')[0].clientWidth;
			alert("p-height:"+ttclientHeight);
			alert("p-width:"+ttclientWidth);**/
			//myChart1.dispose();
			//loadEchartPageByLine();.
			/**var res;
			if(res){clearTimeout(res);}
			res = setTimeout(function(){console.log("resize triggered");},20);
			$(document).ready(function(){
				myChart.clear();
				myChart1 = echarts.init(document.getElementById('EchartPageByLine'));
				loadEchartPageByLine();
			});**/
		//});
		function loadEchartPageByLine(){
			
			myChart1.showLoading({
			    text: '正在努力的读取数据中...'    //loading话术
			});
			var X_NAME = new Array();
			var X_NAME_DATA = new Array();
			var X_DATA = new Array();
			
			myChart1.hideLoading();
			var option = {
			    title : {
			        text: '进出线功率曲线  数据日期('+paramStartDay+')',
			        subtext: '',
			        x: 'center'
			    },
			    tooltip : {
			        trigger: 'axis',
			        formatter: function(params) {
			            return paramStartDay +' '+ params[0].name + ':00<br/>'
			                   + params[0].seriesName + ' : ' 
			                   + params[0].value + ' (°C)<br/>'
			                   + '123';
			        }
			    },
			    legend: {
			        data:['温度'],
			        x: 'center',
			      	y:'bottom',
			      	padding:54
			    },
			    grid: {x:40,x2:20,y2:100},
			    dataZoom : {
			        show : true,
			        realtime : true,
			        start : 0,
			        end : 100
			    },
			    xAxis : [
			        {
			            type : 'category',
			            data : [
			            '00:00',
'00:05',
'00:10',
'00:15',
'00:20',
'00:25',
'00:30',
'00:35',
'00:40',
'00:45',
'00:50',
'00:55',
'01:00',
'01:05',
'01:10',
'01:15',
'01:20',
'01:25',
'01:30',
'01:35',
'01:40',
'01:45',
'01:50',
'01:55',
'02:00',
'02:05',
'02:10',
'02:15',
'02:20',
'02:25',
'02:30',
'02:35',
'02:40',
'02:45',
'02:50',
'02:55',
'03:00',
'03:05',
'03:10',
'03:15',
'03:20',
'03:25',
'03:30',
'03:35',
'03:40',
'03:45',
'03:50',
'03:55',
'04:00',
'04:05',
'04:10',
'04:15',
'04:20',
'04:25',
'04:30',
'04:35',
'04:40',
'04:45',
'04:50',
'04:55',
'05:00',
'05:05',
'05:10',
'05:15',
'05:20',
'05:25',
'05:30',
'05:35',
'05:40',
'05:45',
'05:50',
'05:55',
'06:00',
'06:05',
'06:10',
'06:15',
'06:20',
'06:25',
'06:30',
'06:35',
'06:40',
'06:45',
'06:50',
'06:55',
'07:00',
'07:05',
'07:10',
'07:15',
'07:20',
'07:25',
'07:30',
'07:35',
'07:40',
'07:45',
'07:50',
'07:55',
'08:00',
'08:05',
'08:10',
'08:15',
'08:20',
'08:25',
'08:30',
'08:35',
'08:40',
'08:45',
'08:50',
'08:55',
'09:00',
'09:05',
'09:10',
'09:15',
'09:20',
'09:25',
'09:30',
'09:35',
'09:40',
'09:45',
'09:50',
'09:55',
'10:00',
'10:05',
'10:10',
'10:15',
'10:20',
'10:25',
'10:30',
'10:35',
'10:40',
'10:45',
'10:50',
'10:55',
'11:00',
'11:05',
'11:10',
'11:15',
'11:20',
'11:25',
'11:30',
'11:35',
'11:40',
'11:45',
'11:50',
'11:55',
'12:00',
'12:05',
'12:10',
'12:15',
'12:20',
'12:25',
'12:30',
'12:35',
'12:40',
'12:45',
'12:50',
'12:55',
'13:00',
'13:05',
'13:10',
'13:15',
'13:20',
'13:25',
'13:30',
'13:35',
'13:40',
'13:45',
'13:50',
'13:55',
'14:00',
'14:05',
'14:10',
'14:15',
'14:20',
'14:25',
'14:30',
'14:35',
'14:40',
'14:45',
'14:50',
'14:55',
'15:00',
'15:05',
'15:10',
'15:15',
'15:20',
'15:25',
'15:30',
'15:35',
'15:40',
'15:45',
'15:50',
'15:55',
'16:00',
'16:05',
'16:10',
'16:15',
'16:20',
'16:25',
'16:30',
'16:35',
'16:40',
'16:45',
'16:50',
'16:55',
'17:00',
'17:05',
'17:10',
'17:15',
'17:20',
'17:25',
'17:30',
'17:35',
'17:40',
'17:45',
'17:50',
'17:55',
'18:00',
'18:05',
'18:10',
'18:15',
'18:20',
'18:25',
'18:30',
'18:35',
'18:40',
'18:45',
'18:50',
'18:55',
'19:00',
'19:05',
'19:10',
'19:15',
'19:20',
'19:25',
'19:30',
'19:35',
'19:40',
'19:45',
'19:50',
'19:55',
'20:00',
'20:05',
'20:10',
'20:15',
'20:20',
'20:25',
'20:30',
'20:35',
'20:40',
'20:45',
'20:50',
'20:55',
'21:00',
'21:05',
'21:10',
'21:15',
'21:20',
'21:25',
'21:30',
'21:35',
'21:40',
'21:45',
'21:50',
'21:55',
'22:00',
'22:05',
'22:10',
'22:15',
'22:20',
'22:25',
'22:30',
'22:35',
'22:40',
'22:45',
'22:50',
'22:55',
'23:00',
'23:05',
'23:10',
'23:15',
'23:20',
'23:25',
'23:30',
'23:35',
'23:40',
'23:45',
'23:50',
'23:55'
			            ]
			        }
			    ],
			    yAxis : [
			        {
			            name : '单位(°C)',
			            type : 'value',
			            max : 150
			        }
			    ],
			    series : [
			        {
			            name:'温度',
			            type:'line',
			            data:[
			            '57',
						'57',
						'72',
						'71',
						'26',
						'27',
						'9',
						'81',
						'77',
						'88',
						'46',
						'87',
						'65',
						'65',
						'72',
						'1',
						'7',
						'22',
						'82',
						'28',
						'83',
						'45',
						'38',
						'22',
						'53',
						'63',
						'36',
						'87',
						'7',
						'11',
						'8',
						'86',
						'25',
						'13',
						'46',
						'65',
						'97',
						'96',
						'21',
						'43',
						'90',
						'5',
						'77',
						'54',
						'29',
						'40',
						'14',
						'16',
						'7',
						'28',
						'21',
						'42',
						'34',
						'83',
						'78',
						'35',
						'34',
						'72',
						'0',
						'11',
						'72',
						'94',
						'26',
						'1',
						'86',
						'14',
						'27',
						'39',
						'26',
						'32',
						'41',
						'85',
						'89',
						'99',
						'68',
						'64',
						'64',
						'11',
						'93',
						'98',
						'50',
						'45',
						'82',
						'92',
						'82',
						'94',
						'44',
						'84',
						'23',
						'60',
						'84',
						'36',
						'82',
						'99',
						'16',
						'99',
						'79',
						'27',
						'77',
						'87',
						'41',
						'23',
						'22',
						'69',
						'82',
						'55',
						'93',
						'90',
						'82',
						'6',
						'34',
						'2',
						'36',
						'8',
						'6',
						'95',
						'40',
						'18',
						'41',
						'27',
						'9',
						'84',
						'31',
						'67',
						'84',
						'33',
						'49',
						'66',
						'50',
						'9',
						'84',
						'98',
						'57',
						'58',
						'16',
						'98',
						'33',
						'51',
						'66',
						'31',
						'38',
						'9',
						'49',
						'16',
						'13',
						'33',
						'28',
						'99',
						'71',
						'43',
						'17',
						'70',
						'34',
						'43',
						'85',
						'12',
						'51',
						'50',
						'3',
						'21',
						'70',
						'23',
						'30',
						'27',
						'10',
						'59',
						'67',
						'48',
						'41',
						'70',
						'14',
						'61',
						'77',
						'52',
						'94',
						'61',
						'0',
						'17',
						'32',
						'47',
						'1',
						'37',
						'16',
						'12',
						'55',
						'78',
						'86',
						'11',
						'67',
						'8',
						'44',
						'40',
						'99',
						'10',
						'57',
						'55',
						'74',
						'59',
						'3',
						'71',
						'84',
						'-',
						'-',
						'-',
						'-',
						'-',
						'-',
						'-',
						'-',
						'-',
						'-',
						'-',
						'-',
						'-',
						'-',
						'-',
						'-',
						'-',
						'-',
						'-',
						'-',
						'-',
						'-',
						'-',
						'-',
						'-',
						'-',
						'-',
						'-',
						'-',
						'-',
						'-',
						'-',
						'-',
						'-',
						'-',
						'-',
						'-',
						'-',
						'-',
						'-',
						'-',
						'-',
						'-',
						'-',
						'-',
						'-',
						'-',
						'-',
						'-',
						'-',
						'-',
						'-',
						'-',
						'-',
						'-',
						'-',
						'-',
						'-',
						'-',
						'-',
						'-',
						'-',
						'-',
						'-',
						'-',
						'-',
						'-',
						'-',
						'-',
						'-',
						'-',
						'-',
						'-',
						'-',
						'-',
						'-',
						'-',
						'-',
						'-',
						'-',
						'-',
						'-',
						'-',
						'-',
						'-',
						'-',
						'-'
			            ]
			        }
			    ]
			};
			
			myChart1.setOption(option,true);
		}
		function loadData(){
			$.ajax({
				type: "post",
				url: "<%=basePath%>/homeFirstPageAction/queryTitleHeatcur.action",
			data : "",
			dataType : "json",
			cache : false,
			async : false,//同步异步请求
			success : function(result) {
				$("#title_ydfh").html("用电负荷: " + result.USE_LOAD + " kW");
				$("#title_cxfh").html("出线负荷: " + result.OUT_LOAD + " kW");
				$("#title_qw").html("气温: " + result.HEATCUR + " °C");

			},
			error : function(e) {

			}
		});
	}

</script>
</html>
