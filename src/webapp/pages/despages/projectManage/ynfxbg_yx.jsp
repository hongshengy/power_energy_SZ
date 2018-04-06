<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String baseUrl = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ baseUrl + "/";
	String pagePath = baseUrl + "/pages/despages/common";
	String treePagePath = baseUrl + "/pages/areaEnergy/common";

	/* session.setAttribute("itemCode","despower");
	 session.setAttribute("itemName","变压器监测"); */

	String consId = request.getParameter("consId");//获取调用父页面传过来的参数
	String consName = request.getParameter("consName");//获取调用父页面传过来的参数
	String shownTree = "";//左侧树布局
	String shownRightStyle = "";//左侧树布局
	//未获取到企业编码，证明不是客户监控页面调用的，需要加载左侧树进行查询
	if(consId==null || consId.equals("")){//左侧树布局
		shownTree =  "<div id=\"westTree\" data-options=\"region:'west',disabled:true,split:true,title:'导航',border:false\" style=\"width:220px;\">"
					+"  <div style=\"padding: 3px; border-bottom: 1px solid #e7e7e7; background-color: #f2f2f2\">"
					+"    <input id=\"CobConsSelect\" class=\"easyui-textbox\" style=\"width: 98%;\" data-options=\"iconCls:'icon-search'\">"
					+"    <div style=\"position: absolute;top:38px;width:218px;\">"
					+"      <input id=\"consSelect\" class=\"easyui-textbox\" style=\"width: 98%;\" data-options=\"iconCls:'icon-search',prompt:'请输入客户名称'\">"
					+"    </div>"
					+"  </div>"
			 		+"  <div style=\"overflow: auto;top:70px;width:218px;bottom:0px;position: absolute;\">"
					+"    <ul  id=\"tree-leftQyTree\" class=\"easyui-tree\" style=\"width:100%;\"  >"
					+"    </ul>"
					+"  </div> "
					+"</div> ";
	}
	
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN""http://www.w3c.org/TR/HTML4/loose.dtd">

<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="Cache-Control" content="no-cache" />
<meta http-equiv="Expires" content="0" />
<title>用能分析报告</title>
<link rel="stylesheet" href="<%=pagePath%>/jquery-easyui-1.5.1/themes/fangtian/easyui.css">
<link rel="stylesheet" href="<%=pagePath%>/jquery-easyui-1.5.1/themes/icon.css">
<link rel="stylesheet" href="<%=pagePath%>/jquery-easyui-1.5.1/themes/color.css">
<link rel="stylesheet" href="<%=pagePath%>/css/common.css">
<link rel="stylesheet" type="text/css" href="<%=pagePath %>/css/templet_common.css">
<link rel="stylesheet" href="<%=treePagePath%>/css/tree.css">
<script src="<%=pagePath%>/js/maskJs.js"></script>
<style type="text/css">
.title1{
font-size:24px;
font-weight:bold;
margin:10px 0px;
}
.title2{
font-size:20px;
margin:10px 0px;
}
.content1{
font-size:18px;
line-height: 24px;
margin:5px 0px 5px 0px;
}
.content1 ol{
margin:0px 0px 0px 0px;
}
.content2{
font-size:12px;
line-height: 24px;
}
.table{
/* border:1px solid #000; */
text-align:center;
width:100%;
border-collapse:collapse;
}
.table td{
border:1px solid #000;
}
.table th{
border:1px solid #000;
}
p{
text-indent: 36px;
}
.p{
text-indent: 36px;
}
.img1{
width:100%;
height:300px;
}
.img{
width:550px;
height:200px;
}
.xbRed{
width:100%;
height:25px;
border:1px solid #f00;
border-radius:15px;
color:#f00;
}
</style>
</head>

<body class="easyui-layout">
	<script>
	    var maskobj = new maskPanelManager();
	    maskobj.register();
	</script>
	<%=shownTree%>	
	<div class="main-panel noOverflow"  data-options="region:'center',border:false">
		<div class="easyui-panel" style="width:100%;position: relative;"  data-options="cls:'fangtian-panel-style',onResize:autoResize">
			<ul class="s-ul-one" >
				<li>
					<span class="tools-labelgroup" style="vertical-align:middle;border-style:none;">
           				<a onclick="" id="left" href="javascript:qytQueryOveride('-1');" style="border-style:none;"> 
           				 	<img alt="前一天" src="<%=request.getContextPath()%>/images/tools-moveleft.gif" height="14px" width="14px" style="border-style:none;vertical-align: middle;">
			 			</a>
              		</span> 
                    <span class="tools-labelgroup" style="vertical-align:middle;">
                        <input type="text" class="Wdate" style="text-align: left;" data-options="width:155,editable:false" id="dataDateMonth" onClick="WdatePicker({dateFmt:'yyyy-MM',isShowClear:false,readOnly:true})"/>
					</span>
					<span class="tools-labelgroup" style="vertical-align:middle;border-style:none;">
						<a onclick="" id="right" href="javascript:qytQueryOveride('1');" style="border-style:none;"> 
							<img alt="后一天" src="<%=request.getContextPath()%>/images/tools-moveright.gif" height="14px" width="14px" style="border-style:none;vertical-align: middle;">
						</a>
					</span>
				</li>
				<li style="display:none;line-height:26px;">
                    <span class="tools-labelgroup" style="vertical-align:middle;">
                         <input type="text" class="Wdate" style="text-align: left;" data-options="width:155,editable:false" id="dataDate" onClick="WdatePicker({dateFmt:'yyyy-MM-dd',isShowClear:false,readOnly:true})"/>
					</span>
					~
                    <span class="tools-labelgroup" style="vertical-align:middle;">
                         <input type="text" class="Wdate" style="text-align: left;" data-options="width:155,editable:false" id="endDate" onClick="WdatePicker({dateFmt:'yyyy-MM-dd',isShowClear:false,readOnly:true})"/>
					</span>
				</li>
				<li>
					<span class="tools-labelgroup" style="vertical-align:middle;">
						<input id="dataDateType" type="checkbox"/>自定义时间
					</span>
				</li>
				<li class="s-right-one">
					<span style="vertical-align: bottom;">
				    	<a id="search" href="#" class="easyui-linkbutton c100 shadow" onclick="loadData();">查询</a>
				    	<a id="export" href="#" class="easyui-linkbutton c100 shadow">导出</a>
				    	<a id="edit" href="#" class="easyui-linkbutton c100 shadow">编辑</a>
				    	<a id="save" href="#" class="easyui-linkbutton c100 shadow">保存</a>
				    </span>
				</li>
			</ul>
			<div style="display:none" >
				<div id="gridDiv" style="display:none" class="easyui-datagrid" data-options="striped:true,border:false,singleSelect:true,url:'',method:'get'"></div>
			</div>
		</div>
		
		<div id="content-panel" class="auto-resize easyui-panel main-panel" style="width: 100%;overflow-x:hidden;" data-options="cls:'fangtian-panel-style bottom-padding'">
			<div class="easyui-panel" style="width: 100%;position: relative;padding:20px 100px;" data-options="border:false">
				<div align="center" style="font-size:36px;">
					<font id="baseInfo_consName" style="font-weight:bold;"></font><br/>
					<font style="font-size:28px;"><font id="sDate"></font>用能分析报告</font>
				</div>
				<div class="title1">一、基本信息</div>
				<div class="content1">
					<p id="baseInfo"><!-- 山进特殊钢(江苏)有限公司，户号：3603520169，用电地址： 常州市金坛区华城中路北侧（金坛经济开发区国际工业城16号楼，本期共4台变压器，总容量235,457kVA，电费执行：-，功率因数考核标准0.85。 --></p>
					<p>本期共<font id="mpCount"></font>个监测点。</p>
				</div>
				
				<div class="title1">二、用电概览</div>
				<div class="title2">1．用电概况</div>
				<div class="content2">
					表：企业总体用电情况
					<table class="table">
						<colgroup>
							<col width="25%"/>
							<col width="25%"/>
							<col width="25%"/>
							<col width="25%"/>
						</colgroup>
						<tr><th>最大负荷(kW)</th><th>平均负荷(kW)</th><th>负荷率(%)</th><th>功率因数</th></tr>
						<tr><td id="ydgk_maxValue"></td><td id="ydgk_avgValue"></td><td id="fhl"></td><td id="glys"></td></tr>
					</table>
					表：变压器用电情况
					<table class="table" id="tranInfoList">
						<colgroup>
							<col width="20%"/>
							<col width="20%"/>
							<col width="20%"/>
							<col width="20%"/>
							<col width="20%"/>
						</colgroup>
						<tr><th>变压器</th><th>容量(kVA)</th><th>最大负载率(%)</th><th>平均负载率（%）</th><th>功率因数</th></tr>
						<tr><td>1#10kV变压器</td><td>600</td><td>0.89</td><td>0.89</td><td>0.89</td></tr>
						<tr><td>2#10kV变压器</td><td>600</td><td>0.89</td><td>0.89</td><td>0.89</td></tr>
					</table>
				</div>
				<div class="title2">2．负荷</div>
				<!-- <img class="img" src=""> -->
				<div id="fhqs_show" class="img1"></div>
				<div style="display:none;"><div id="fhqs" class="img"></div></div>
				<div class="content2" style="text-align:center">图：负荷趋势</div>
				<div class="content1">
					<p>本期，最大负荷<font id="fhgk_maxValue"></font>kW，发生时间<font id="fhgk_maxDate"></font>，最小负荷<font id="fhgk_minValue"></font>kW，
						发生时间<font id="fhgk_minDate"></font>，平均负荷<font id="fhgk_avgValue"></font>kW。</p>
					<div id="fhText" class="p"></div>
				</div>
				<div class="title2">3．电量</div>
				<div class="title2">1、月电量</div>
				<div id="dltj_show" class="img1"></div>
				<div style="display:none;"><div id="dltj" class="img"></div></div>
				<div class="content2" style="text-align:center">图：月电量统计</div>
				<div class="title2">2、典型日负荷曲线</div>
				<div id="dxrfhqx"></div>
				<div class="content1">
					<p>本期，企业电能总消费量为<font id="energyInfo_sumEnergyP"></font>千瓦时，环比<font id="energyInfo_hb"></font>、同比<font id="energyInfo_tb"></font>。
						其中峰时用电<font id="energyInfo_sumPapR2"></font>千瓦时，占比<font id="energyInfo_zbR2"></font>，
						平时用电<font id="energyInfo_sumPapR3"></font>千瓦时，占比<font id="energyInfo_zbR3"></font>，
						谷时用电<font id="energyInfo_sumPapR4"></font>千瓦时，占比<font id="energyInfo_zbR4"></font>。</p>
					<div id="dlText" class="p"></div>
				</div>
				<div class="title2">4．功率因数</div>
				<div id="glyszs_show" class="img1"></div>
				<div style="display:none;"><div id="glyszs" class="img"></div></div>
				<!-- <img class="img" src=""> -->
				<div class="content2" style="text-align:center">图：功率因数走势</div>
				<div class="content1">
					<p>功率因数考核标准值<font id="glyskhbz">0.9</font>。</p>
					<div id="glysText" class="p"></div>
				</div>
				
				<div class="title1">三、电费分析</div>
				<!-- <div id="dftj" class="img"></div>
				<div class="content2" style="text-align:center">图：近12个月电费统计</div> -->
				<div class="content2">
					<table class="table">
						<colgroup>
							<col width="20%"/>
							<col width="20%"/>
							<col width="20%"/>
							<col width="20%"/>
							<col width="20%"/>
						</colgroup>
						<tr><th>项目</th><th>电量（千瓦时）</th><th>电价（元/千瓦时）</th><th>电费（元）</th><th>力调（元）</th></tr>
						<tr><td style="font-weight:bold;">基本电费</td><td></td><td></td><td></td><td></td></tr>
						<tr><td style="font-weight:bold;">尖电</td><td id="pap_r1"></td><td></td><td></td><td></td></tr>
						<tr><td style="font-weight:bold;">峰电</td><td id="pap_r2"></td><td></td><td></td><td></td></tr>
						<tr><td style="font-weight:bold;">平电</td><td id="pap_r3"></td><td></td><td></td><td></td></tr>
						<tr><td style="font-weight:bold;">谷电</td><td id="pap_r4"></td><td></td><td></td><td></td></tr>
						<tr><td style="font-weight:bold;">定比（4%）</td><td id="pap_db"></td><td></td><td></td><td></td></tr>
					</table>
					<table class="table">
						<colgroup>
							<col width="16.66%"/>
							<col width="16.66%"/>
							<col width="16.66%"/>
							<col width="16.66%"/>
							<col width="16.66%"/>
							<col width="16.66%"/>
						</colgroup>
						<tr><td style="font-weight:bold;border-top:none;">总电费（元）</td><td id="fee_total" style="border-top:none;"></td>
							<td style="font-weight:bold;border-top:none;">总电量（千瓦时）</td><td id="pap_r" style="border-top:none;"></td>
							<td style="font-weight:bold;border-top:none;">平均电价（元/千瓦时）</td><td id="avg_price" style="border-top:none;"></td>
						</tr>
					</table>
					<div class="content2" style="text-align:center;">表 3-1 <font id="dftj_time"></font>电费统计（单位：元）</div>
				</div>
				<div class="content1">
					结论：
					<div class="p">本月用电需量申报合理，峰电用能高（123338千瓦时），谷电用能偏少，。（35975千瓦时），造成用能成本高。</div>
				</div>
				<div class="title1">四、电能质量</div>
				<div class="title2">1．电压合格率</div>
				<div class="content2">
					<table id="czhglTable" class="table">
						<!-- <colgroup><col width="50%"/><col width="50%"/></colgroup> -->
					</table>
				</div>
				<div class="content1">
					<div style="font-weight:bold;">结论： </div>
					<div id="dyhglText" class="p"></div>
					<div style="color:red;">
					<div style="font-weight:bold;">不合格危害：</div>
					<p>1)实际电压偏高将造成设备过电压，威胁绝缘和降低使用寿命；</p>
					<p>2)实际电压偏低，可能会使用户设备和电器不能正常运行或停止运行；</p>
					</div>
				</div>
				<div class="title2">2．谐波</div>
				<div id="xb">
				<!-- 
				<div class="title2">3.1)客户谐波（1#10kV变压器）：</div>
				<div class="content2">
					<table class="table">
						<colgroup>
							<col width="8.33%"/>
							<col width="8.33%"/>
							<col width="8.33%"/>
							<col width="8.33%"/>
							<col width="8.33%"/>
							<col width="8.33%"/>
							<col width="8.33%"/>
							<col width="8.33%"/>
							<col width="8.33%"/>
							<col width="8.33%"/>
							<col width="8.33%"/>
							<col width="8.33%"/>
						</colgroup>
						<tr><td>内容</td><td>3次(%)</td><td>5次(%)</td><td>7次(%)</td><td>11次(%)</td><td>13次(%)</td><td>U畸变率</td><td>3次(A)</td><td>5次(A)</td><td>7次(A)</td><td>11次(A)</td><td>13次(A)</td></tr>
						<tr><td>最大值</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
						<tr><td>平均值</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
						<tr><td>标准限值</td><td>4.0%</td><td>4.0%</td><td>4.0%</td><td>4.0%</td><td>4.0%</td><td>5.0%</td><td>62</td><td>62</td><td>44</td><td>28</td><td>24</td></tr>
					</table>
				</div>-->
				</div>
				<div class="content1">
					<div style="font-weight:bold;">结论： </div>
					<div id="xbText" class="p"><!-- 1）本月T1变电流谐波正常，电压谐波超出正常标准，影响电容器和设备的正常运行。2）T2变（车间变）电流谐波和电压谐波均超标，电流谐波畸变严重，畸变率达21%，5次、7次电流谐波均超标。 --></div>
					<div style="color:red;">
					<div style="font-weight:bold;">谐波危害：</div>
					<p>1)设备效能降低、寿命缩短、过热、烧毁；</p>
					<p>2)电容器击穿、损坏；</p>
					<p>3)影响计量数据准确性；</p>
					<p>4)干扰通讯系统。</p>
					</div>
				</div>
				<div class="title2">3．三相电流不平衡</div>
				<div class="content2">
					<table id="sxdlbphTable" class="table">
						<!-- <colgroup><col width="25%"/><col width="25%"/><col width="25%"/><col width="25%"/></colgroup> -->
					</table>
				</div>
				<div class="content1">
					<div style="font-weight:bold;">结论： </div>
					<div id="sxdlbphText" class="p">通过该月的次总电流数据来看，贵公司T2变三相电流不平衡率较轻，达6.6符合标准（小于20%）；T1变的三相电流不平衡率较严重，达10%，最严重已达20%，由监测平台看出，三相电流不平衡是由402开关引起，从具体分析看出，由于A相单相空调较多造成三相严重不平衡。</div>
					<div style="color:red;">
					<div style="font-weight:bold;">三相电流不平衡危害：</div>
					<p>1)降低设备使用效率及寿命；</p>
					<p>2)增加设备维护费用；</p>
					<p>3)中性线电流增大，发热、增加线损。</p>
					</div>
				</div>
				
				<div class="title1">五、运行托管服务</div>
				<div class="title2">1．远程监控记录</div>
				<div class="content2">
					<table id="ycjk" class="table">
						<!-- <colgroup>
							<col width="25%"/>
							<col width="25%"/>
							<col width="25%"/>
							<col width="25%"/>
						</colgroup>
						<tr><td>配电设备</td><td>告警时间</td><td>报警内容</td><td>处理结果</td></tr>
						<tr><td></td><td></td><td></td><td>/</td></tr>
						<tr><td></td><td></td><td></td><td>/</td></tr>
						<tr><td></td><td></td><td></td><td>/</td></tr> -->
					</table>
				</div>
				<div class="title2">2．现场巡检记录</div>
				<div class="content2">
					<table id="xcxj" class="table">
						<!-- <colgroup>
							<col width="33.33%"/>
							<col width="33.33%"/>
							<col width="33.33%"/>
						</colgroup>
						<tr><td>巡检时间</td><td>缺陷记录</td><td>合理建议</td></tr>
						<tr><td></td><td></td><td>/</td></tr>
						<tr><td></td><td></td><td>/</td></tr>
						<tr><td></td><td></td><td>/</td></tr> -->
					</table>
				</div>
				<div class="title2">3．设备预防性试验服务</div>
				<div id="sbyfxsy">
				<!-- <div id="sbyfxsy_startDate" class="title2" style="float:left;">试验日期：XXXX年XX月XX日</div>
				<div id="sbyfxsy_endDate" class="title2" style="float:right;">到期试验日期：XXXX年XX月XX日</div>
				<div class="content2">
					<table class="table">
						<colgroup>
							<col width="33.33%"/>
							<col width="33.33%"/>
							<col width="33.33%"/>
						</colgroup>
						<tr><td>试验内容</td><td>试验结果</td><td>处理结果</td></tr>
						<tr><td></td><td></td><td>/</td></tr>
						<tr><td></td><td></td><td>/</td></tr>
						<tr><td></td><td></td><td>/</td></tr> 
					</table>
				</div>-->
				</div>
				<div class="title2">4．电力设备抢修服务</div>
				<div class="content2">
					<table id="dlsbqx" class="table">
						<!-- <colgroup>
							<col width="33.33%"/>
							<col width="33.33%"/>
							<col width="33.33%"/>
						</colgroup>
						<tr><td>抢修时间</td><td>故障描述</td><td>处理结果</td></tr>
						<tr><td></td><td></td><td>/</td></tr>
						<tr><td></td><td></td><td>/</td></tr>
						<tr><td></td><td></td><td>/</td></tr> -->
					</table>
				</div>
				<div class="title2">5．用电业务委托服务</div>
				<div class="content2">
					<table id="ydywwt" class="table">
						<!-- <colgroup>
							<col width="33.33%"/>
							<col width="33.33%"/>
							<col width="33.33%"/>
						</colgroup>
						<tr><td>委托时间</td><td>委托内容</td><td>办理结果</td></tr>
						<tr><td></td><td></td><td>/</td></tr>
						<tr><td></td><td></td><td>/</td></tr>
						<tr><td></td><td></td><td>/</td></tr> -->
					</table>
				</div>
				<div class="title2">6．服务质量回访</div>
				<div class="content2">
					<table class="table">
						<colgroup>
							<col width="16.66%"/>
							<col width="16.66%"/>
							<col width="16.66%"/>
							<col width="16.66%"/>
							<col width="16.66%"/>
							<col width="16.66%"/>
						</colgroup>
						<tr><td>回访时间</td><td>回访对象</td><td>职务</td><td>电话</td><td>反映问题</td><td>处理结果</td></tr>
						<tr><td></td><td></td><td>/</td><td></td><td></td><td>/</td></tr>
						<tr><td></td><td></td><td>/</td><td></td><td></td><td>/</td></tr>
						<tr><td></td><td></td><td>/</td><td></td><td></td><td>/</td></tr>
					</table>
				</div>
				
				<div class="title1">六、用能建议</div>
				<div id="ynjyText" class="content1">
				</div>
				
		    </div>
		</div>
	</div>

<script type="text/javascript">
	webContextRoot="<%=basePath%>";
	consId = "<%=consId%>";
	consName = "<%=consName%>";
</script>

<script src="<%=pagePath%>/jquery-easyui-1.5.1/jquery.min.js"></script>
<script src="<%=pagePath%>/jquery-easyui-1.5.1/jquery.easyui.min.js"></script>
<script src="<%=pagePath%>/jquery-easyui-1.5.1/easyui-lang-zh_CN.js"></script>
<script src="<%=pagePath%>/js/common.js"></script>
<script type="text/javascript" src="<%=pagePath%>/js/dateUtil.js"></script>
<script type="text/javascript" src="<%=pagePath%>/js/jQuery.resizeEnd.min.js"></script>
<script type="text/javascript" src="<%=pagePath%>/echarts/echarts.min.js"></script>
<script type="text/javascript" src="<%=pagePath%>/echarts/echartsGlobal.js"></script>
<script type="text/javascript" src="<%=pagePath%>/js/treeSelect.js"></script>
<script language="javascript" type="text/javascript" src="<%=pagePath%>/My97DatePicker/WdatePicker.js"></script>
<script src="<%=pagePath%>/js/templet_common.js"></script>
<script type="text/javascript" src="ynfxbg_yx.js"></script>
</body>
</html>
