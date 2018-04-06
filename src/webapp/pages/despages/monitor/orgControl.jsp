<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ page import="com.frontier.framework.model.UserInfo" %>
<%
String baseUrl  = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+baseUrl+"/";
String pagePath = baseUrl + "/pages/despages";	
UserInfo info = (UserInfo)session.getAttribute("userInfo");	

session.setAttribute("itemCode","desqyjk");
session.setAttribute("itemName","用户变监控");
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN""http://www.w3c.org/TR/HTML4/loose.dtd">
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>区域监控</title>
	
    <link rel="stylesheet" type="text/css" href="<%=pagePath %>/common/jquery-easyui-1.5.1/themes/fangtian/easyui.css">
	<link rel="stylesheet" type="text/css" href="<%=pagePath %>/common/jquery-easyui-1.5.1/themes/icon.css">
	<link rel="stylesheet" type="text/css" href="<%=pagePath %>/common/jquery-easyui-1.5.1/themes/color.css">
	<link rel="stylesheet" type="text/css" href="<%=pagePath %>/common/css/jPages.css">
	<link rel="stylesheet" type="text/css" href="<%=pagePath %>/common/css/animate.css">
	<link rel="stylesheet" type="text/css" href="<%=pagePath %>/common/css/jdialog.min.css"/>
	<link rel="stylesheet" type="text/css" href="<%=pagePath %>/common/css//hover-min.css">
	<link rel="stylesheet" type="text/css" href="<%=pagePath %>/common/css/common.css">
	<script type="text/javascript" src="<%=pagePath %>/common/js/maskJs.js"></script>
	
</head>
<body>
<script type="text/javascript">
	 var maskobj = new maskPanelManager();
	    maskobj.register();
</script>
<style>
    #qyjk_panel {
        width: 100%;
        height: 100%;
    }

    #qyjk_panel .card{
        position: relative;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        width: 200px;
        height: 140px;
        background-color: #ECECEC;
        -webkit-transition: 0.3s ease-in-out;
        -moz-transition: 0.3s ease-in-out;
        -ms-transition: 0.3s ease-in-out;
        -o-transition: 0.3s ease-in-out;
        transition: 0.3s ease-in-out;
        text-align: center;
        border: 1px solid #E6E6E6;
        border-radius: 6px;
        box-shadow: 0px 0px 10px #e3e3e3;
        width: 100%;
        height: 100%;
    }

    #qyjk_panel .card:hover{
        cursor: pointer;
    }

    #qyjk_panel .card table.detail-table{
        position: absolute;
        width: 150px;
        height: 120px;
        top: 50%;
        left: 50%;
        margin-top: -60px;
        margin-left: -75px;
    }

    #qyjk_panel .card table.simple-table{
        position: absolute;
        width: 150px;
        height: 40px;
        top: 50%;
        left: 50%;
        margin-top: -20px;
        margin-left: -75px;
    }

	#qyjk_panel .card table.show-table{
        position: absolute;
        width: 150px;
        height: 40px;
        top: 50%;
        left: 50%;
        margin-top: -20px;
        margin-left: -75px;
    }
	
    #qyjk_panel .card table td{
        padding: 5px;
    }

    #qyjk_panel .card table .td-title{
        font-size: 12px;
        color: #444444;
        font-weight: bold;
    }

    #qyjk_panel .card table .td-label{
    	text-align: right;
    }

    #qyjk_panel .card table .td-value{
    	text-align: left;
    	color: #028C8C;
    }
    

    #qyjk_panel .card.card-error{
        position: relative;
        /* animation: errorTwinkle 1s ease 1s infinite alternate; */
    }
	
	#qyjk_panel .dh_zc{
		animation:errorTwinkle 1s ease 1s infinite alternate;
	}
	#qyjk_panel .dh_zd{
		animation:errorTwinkle_zd 1s ease 1s infinite alternate;
	}
	
	
    #qyjk_panel .card.card-error .error-icon{
        background-color: #ee484b;
        border-radius: 50%;
        position: absolute;
        display: inline-block;
        width: 24px;
        height: 24px;
        right: -12px;
        top: -12px;
        color: #fff;
        z-index: 99;
    }

	

    #qyjk_panel .card.card-error .error-icon .error-text{
        margin-top: 5px;
        display: inline-block;
    }

    #qyjk_panel .card.card-error .error_value{
        color: #ee484b;
    }
    
    @keyframes errorTwinkle {
        from {
            box-shadow: 0px 0px 10px #E6E6E6;
            border-color: #E6E6E6;
        }
        to {
            box-shadow: 0px 0px 10px #ee160d;
            border-color: #ee1715;
        }
    }
	
	@keyframes errorTwinkle_zd {
        from {
            box-shadow: 0px 0px 10px #E6E6E6;
            border-color: #E6E6E6;
        }
        to {
            box-shadow: 0px 0px 10px #FA800A;
            border-color: #FA800A;
        }
    }
    
    #qyjk_gridContainer_panel{
        padding: 20px;
        width: 100%;
        height: 100%;
        border: 1px dashed #d8d8d8;
        -webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;
    }

    #qyjk_gridContainer_panel *{
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }

    #qyjk_panel .holder {
        float: left;
        padding-left: 20px;
    }

    #qyjk_panel .holder > a{
        padding: 5px;
        border-radius: 2px;
    }

    #qyjk_panel .holder > a:hover {
        background-color: #b2b2b2;
        -webkit-box-shadow: 1px 1px 5px #b3b3b3;
        -moz-box-shadow: 1px 1px 5px #b3b3b3;
        box-shadow: 1px 1px 5px #b3b3b3;
    }

    #qyjk_panel .holder > a.jp-disabled:hover,
    #qyjk_panel .holder > a.jp-current:hover{
        background-color: transparent;
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        box-shadow: none;
    }

    #qyjk_panel .toolbar-panel{
        float: right;
    }

    #qyjk_panel .cell,.grouppanel{
        float: left;
        padding: 10px;
        display: none;
    }

    .toolbar-panel > *{
        vertical-align: middle;
    }

    table.simple-table{
        width: 100%;
        height: 100%;
        display: none;
    }

    table.simple-table td{
        border: none;
    }

    table.simple-table .td-title{
        width: 120px;
    }
    
    table.show-table{
        width: 100%;
        height: 100%;
        display: none;
    }

    table.show-table td{
        border: none;
    }

    table.show-table .td-title{
        width: 120px;
    }

    #xinxi-panel > .panel{
        position: relative;
    }

    .xinxitongji-panel,
    .bianweixinxi-panel,
    .gaojingxinxi-panel{
    }

    .xinxitongji-table,
    .bianweixinxi-table,
    .gaojingxinxi-table
    {
        width: 100%;
        font-size:12px;
        border-collapse: collapse;
        border: none;
        background-color: #fff;
    }

    .xinxitongji-table{
        text-align: center;
    }

    .bianweixinxi-table,
    .gaojingxinxi-table{

    }

    .xinxitongji-table td{
        border: 1px solid #e9e9e9;
        padding: 10px 5px;
    }

    .bianweixinxi-table td,
    .gaojingxinxi-table td{
        padding: 10px 10px;
    }

    .bianweixinxi-table .td-value,
    .gaojingxinxi-table .td-value{
        padding: 0;
    }

    .bianweixinxi-table .td-value span,
    .gaojingxinxi-table .td-value span{
        padding-left: 10px;
    }

    .moreLink-panel{
        position: absolute;
        right: 10px;
        top: 5px;
    }

    .hvr-outline-in:before{
        border-color: #00a19e;
    }
	
    .separate-line{
        border-top: 1px solid #dfdfdf;
    }

    .left-separate-line{
        border-left: 1px solid #dfdfdf;
    }
    
    #dlg{
    	min-width: 400px;
    	min-height: 100px;
    	padding: 10px;
    	width: 500px;
    }
    
    #dlg .info-panel{
    	padding: 5px 0px;
    	text-align: center;
    }
    
    #dlg .selected-panel{
    	height: 100px;
    	overflow-y: auto;
    }
    #dlg .unselected-panel{
    	height: 100px;
    	overflow-y: auto;
    }
    
    #dlg .s-panel{
    	float: left;
    	height: 25px;
    	width:110px;
    	line-height: 25px;
    	margin: 2px;
    	overflow: hidden;
    	border:1px solid #dddddd;
    	white-space: nowrap;
    	text-overflow: ellipsis;
    	
    }
    
    #dlg .s-panel>img{
    	vertical-align: middle;
    	padding: 0px 5px;
    	cursor: pointer;
    }
    #dlg .panel-padding{
    	padding: 5px 0px;
    }
    
    #dlg .panel-tool{
    	height: 24px;
    	margin-top: -12px
    }
    
    #qyjk_panel .detail-panel,.simple-panel,.show-panel{
    	width: 100%;
    	height: 100%;
    	position: relative;
    	background-color: #F3F3F3;
    }
    #qyjk_panel .detail-panel .title-panel,.simple-panel .title-panel,.show-panel .title-panel{
    	width: 100%;
    	height: 40px;
    	line-height: 40px;
    	background-color: #028C8C;
    	font-size: 14px;
    	font-weight: bold;
    	color: #FFFFFF;
    	border-top-left-radius: 6px;
    	border-top-right-radius: 6px;
    	white-space: nowrap;
    	overflow: hidden;
    	text-overflow: ellipsis;
    }
    
  	
    
    #qyjk_panel .detail-panel .info-panel,.simple-panel .info-panel{
    	position: absolute;
    	top: 40px;
    	bottom: 0px;
    	width: 100%;
    	overflow: hidden;
	}
	#qyjk_panel .detail-panel .info-panel .table-panel{
		height: 75px;position: absolute;top: 50%;width: 100%;margin-top: -38px;
	}
	#qyjk_panel .detail-panel .info-panel table,.simple-panel .info-panel table{
		margin: auto;line-height: 15px;
	}
	
	#qyjk_panel .simple-panel .info-panel .table-panel{
		height: 30px;position: absolute;top: 50%;width: 100%;margin-top: -15px;
	}
	
	#qyjk_panel .group-title-panel{
		position: absolute;
		white-space: nowrap;
    	overflow: hidden;
    	text-overflow: ellipsis;
    	width:300px;
    	height:30px;
    	top:50%;
    	margin-top: -15px;
    	left: 40%;
    	margin-left: -150px;
    	line-height: 30px;
    	text-align: center;
    	font-size: 16px;
    	font-weight: bold;	
	}
	
	.xx{
		background-color: #028C8C;
	}
	.xx .panel-title{
		color:#ffffff;
	}
</style>

<div id="qyjk_panel" class="easyui-layout">
    <div class="easyui-layout" data-options="region:'center',border:false">
        <div data-options="region:'north',border:false" style="height: 50px;">
            <div class="holder"></div>
            
            <div id="groupTitleName" class="group-title-panel" >
            	
            </div>
            <div style="height: 20px;line-height: 20px;vertical-align: middle;padding: 5px;position: absolute;background-color: #EFEFEF ;border-radius: 8px;right:430px;top:10px;">
				<div id="sk" style="background-color: #3EB3A5;height: 20px;width: 70px;border-radius: 8px;position: absolute;z-index: 1;"></div>
				<a id="showYHZ" style="color: #FFFFFF;cursor: pointer;z-index: 2;position: relative;text-align: center;display: inline-block;width:70px;" onclick="showYHZ()">分组</a>
				<a id="showYHB" style="color: #000000;cursor: pointer;z-index: 2;position: relative;text-align: center;display: inline-block;width:70px;" onclick="showYHB()">变电站</a>
			</div>
			
			<div class="toolbar-panel" style="width:100px; margin-top: 14px;margin-right: 300px;">
				<a id="fhGroup" class="c9 shadow">返回</a>
            	<a id="addGroup" class="c9 shadow">新增分组</a>
            	<input id="chk_show-thumbnail" type="checkbox" style="display: none;" onclick="onThumbnail();">
                <span id="slt_title" style="display: none;">缩略图</span>				
			</div>
			
            <div class="toolbar-panel" style="margin-top: 14px;margin-right: -385px;">
            	
                <span>网格显示:行</span>
                <select id="cmb_rowValue" class="easyui-combobox" style="width: 50px"
                    data-options="panelWidth: 40,panelHeight:'auto'">        
                    <!-- <option value="3,4" selected="selected">3 X 4</option>
                    <option value="3,6">3 X 6</option> -->
                   	<option value="3" selected="selected">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
                <span>列</span>
                <select id="cmb_listValue" class="easyui-combobox" style="width: 50px"
                    data-options="panelWidth: 40,panelHeight:'auto'">
                    <!-- <option value="3,4" selected="selected">3 X 4</option>
                    <option value="3,6">3 X 6</option> -->
                   	<option value="4" selected="selected">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>                  
                </select>
                
                <a id="btn_refresh" href="#" class="easyui-linkbutton c9 shadow" style="width: 60px;height: 24px;margin-left: 10px" onclick="btnRefresh();">刷新</a>
            </div>
        </div>
        <div data-options="region:'center',border:false" style="overflow: hidden;">
            <div id="qyjk_gridContainer_panel" style="float: left; width: 80%; height: 100%; ">
                <div id="coreContainer_group_panel" style="width: 100%; height: 100%">
                </div>
                <div id="coreContainer_panel" style="width: 100%; height: 100%;display: none;">
                </div>
			</div>
			<!--<div style="float: left;width: 20%; height: 100%;">
                <table id="grid1" class="easyui-datagrid">
                
                </table>
            </div> -->
             <div id="xinxi-panel" style="float: left;width: 20%; height: 100%;position: relative;">
                <div class="easyui-panel" data-options="title: '统计信息',border: false,tools:'',headerCls:'xx'"  style="height: 110px;" >
                    <table class="xinxitongji-table">
                        <tbody>
                        <tr>
                            <td>总户数</td>
                            <td>总用户变数</td>
                            <td>总告警数</td>
                        </tr>
                        <tr>
                            <td id="yhs"></td>
                            <td id="zyhbs"></td>
                            <td id="zjgs"></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div style="position: absolute;top: 110px;bottom:18px;width:100%;">
	                <div class="easyui-panel" data-options="title: '告警信息',border: false,tools:'#t1',headerCls:'xx'" style="width: 100%;height: 50%;overflow: auto;" id="gaojing" >
	                </div>
	                <div class="easyui-panel" data-options="title: '变位信息',border: false,tools:'#t2',headerCls:'xx'" style="width: 100%;height: 50%;overflow: auto;">
	                    <table class="bianweixinxi-table" id="bianwei" >
	                    </table>
	                </div>
	                
	                <div id="t1">
						<a href="#" onclick="testOpen('',0,1,'','告警信息')" style="width: 26px;font-size:12px;font-weight: bold;line-height: 24px;color: white;background-color: #028C8C;">更多</a>
					</div>
					<div id="t2">
						<a href="#" onclick="testOpen('',1,0,'','变位信息')" style="width: 26px;font-size:12px;font-weight: bold;line-height: 24px;color: white;background-color: #028C8C;">更多</a>
					</div>
                </div>
            </div>
		</div>
    </div>
<div id="dlg" style="background-color: #ffffff;height:430px;" >
	<div class="info-panel">
		<p>分组名称:<input id="groupName" class="easyui-textbox" style="width:200px" data-options="validType:['length[0,32]','isBlank']" required="required">
		<span id="groupId" style="display: none;" ></span>
		</p>
	</div>
	<div class="selected-panel" id="real_yx_panel">
		
	</div>

	<div class="unselected-panel" id="real_wx_panel">
		
	</div>
	<!-- <div id="pp" style="background:#efefef;border:1px solid #ccc;"></div> -->
	
</div>
<div id="dlg-buttons" style="text-align: center; height: 40px; line-height: 40px;">
	<a href="javascript:void(0)" class="easyui-linkbutton c9 shadow" onclick="cxSave()">保存</a>
	<a href="javascript:void(0)" class="easyui-linkbutton c9 shadow" onclick="cxClose()">关闭</a>
</div>

<div id="filter">
	<p>过滤条件:<input id="search_yhb" class="easyui-textbox" style="width:200px">
		<a href="#" class="icon-filter" style="line-height: 24px;height:24px;vertical-align: middle;" onclick="searchYHB()"></a>
	</p>
</div>
</div>

<div class="jDialog" id="dialog-1">
    <div class="content">
        <h3>Modal Dialog</h3>
        <div>
            <p>This is a modal window. You can do the following things with it:</p>
            <ul>
                <li><strong>Read:</strong> modal windows will probably tell you something important so don't forget
                    to
                    read what they say.
                </li>
                <li><strong>Look:</strong> a modal window enjoys a certain kind of attention; just look at it and
                    appreciate its presence.
                </li>
                <li><strong>Close:</strong> click on the button below to close the modal.</li>
            </ul>
            <button class="button" data-dismiss="JDialog" id="test">Close me!</button>
        </div>
    </div>
</div>

<div id="mm" style="width:120px;">
    <div onclick="openycjxtWindow();">一次图</div>
    <div onclick="opennxzlWindow();">能效总览</div>
    <div onclick="opencksjWindow()">查看数据</div>
    <div onclick="opensjclWindow()">事件查看</div>
</div>

<div id="groupMemo" style="width:120px;">
    <div onclick="showYHBData()">查看</div>
    <div onclick="updYHBData()">修改</div>
    <div onclick="delYHBData()">删除</div>
    <div onclick="moveYHZTop()">置顶</div>
    <div onclick="moveYHZFront()">前移</div>
    <div onclick="moveYHZAfter()">后移</div>
    <div onclick="moveYHZTail()">置尾</div>
</div>

<div id="groupWFP" style="width:120px;">
    <div onclick="showYHBData(true)">查看</div>
</div>

<div id="gj" style="width:120px;">
    <!-- <div><span onclick="memuclickpf();">派发工单</span></div>
    <div><span onclick="memuclickhl(1);">忽略</span></div> -->
    <div onclick="memuclickpf();">派发工单</div>
    <div onclick="memuclickhl(1);">忽略</div>
</div>

<div id="win_ycjxt" >
	
</div>

<script type="text/javascript">
	webContextRoot="<%=basePath%>";
	baseUrl="<%=baseUrl%>";
	var userId = '<%=((UserInfo)session.getAttribute("userInfo")).getUserId()%>';
</script>
<script type="text/javascript" src="<%=pagePath %>/common/jquery-easyui-1.5.1/jquery.min.js"></script>
	<script type="text/javascript" src="<%=pagePath %>/common/jquery-easyui-1.5.1/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="<%=pagePath %>/common/jquery-easyui-1.5.1/easyui-lang-zh_CN.js"></script>
	<script type="text/javascript" src="<%=pagePath %>/common/js/jPages.js"></script>
	<script type="text/javascript" src="<%=pagePath %>/common/js/jdialog.min.js"></script>
	<script type="text/javascript" src="<%=pagePath%>/common/js/dateUtil.js"></script>
	<script type="text/javascript" src="<%=pagePath%>/common/js/toolwinopen.js"></script>
	<script type="text/javascript" src="<%=pagePath %>/common/js/common_client.js"></script>
    <script type="text/javascript" src="<%=pagePath %>/monitor/orgControl.js"></script> 
    <script type="text/javascript" src="<%=pagePath %>/common/js/validator.js"></script>
    
</body>
</html>