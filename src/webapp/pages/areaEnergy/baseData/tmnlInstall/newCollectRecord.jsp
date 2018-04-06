<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'home.jsp' starting page</title>
    
    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expires" content="0">    
    <meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
    <meta http-equiv="description" content="This is my page">
    <!--
    <link rel="stylesheet" type="text/css" href="styles.css">
    -->
		<link rel="stylesheet" type="text/css"
			href="<%=path%>/pages/areaEnergy/common/jquery-easyui-1.5.1/themes/fangtian/easyui.css">
		<link rel="stylesheet" type="text/css"
			href="<%=path%>/pages/areaEnergy/common/jquery-easyui-1.5.1/themes/icon.css">
		<link rel="stylesheet" type="text/css"
			href="<%=path%>/pages/areaEnergy/common/jquery-easyui-1.5.1/themes/color.css">
		<link rel="stylesheet" type="text/css"
			href="<%=path%>/pages/areaEnergy/common/css/common.css">
		<link rel="stylesheet" type="text/css"
			href="<%=path%>/pages/areaEnergy/common/css/lightbox.min.css" />
		<link type="text/css" rel="stylesheet"
			href="<%=basePath%>css/aueic.css" />
		<script type="text/javascript"
			src="<%=path%>/pages/areaEnergy/common/jquery-easyui-1.5.1/jquery.min.js"></script>
		<script type="text/javascript"
			src="<%=path%>/pages/areaEnergy/common/jquery-easyui-1.5.1/jquery.easyui.min.js"></script>
		<script type="text/javascript"
			src="<%=path%>/pages/areaEnergy/common/jquery-easyui-1.5.1/easyui-lang-zh_CN.js"></script>
		<script type="text/javascript"
			src="<%=path%>/pages/areaEnergy/common/jquery-easyui-1.5.1/datagrid-detailview.js"></script>
		<script type="text/javascript" src="<%=basePath%>js/jquery.js"></script>
		<script type="text/javascript" src="<%=basePath%>js/common_client.js"></script>
		<script type="text/javascript" src="<%= basePath%>js/util/Util.js"></script>
		<script type="text/javascript">
			function onClickOpen(){
			    var url = '<%=basePath%>'+'pages/areaEnergy/baseData/tmnlInstall/creatConsSubRecord.jsp';
	            OpenWin(encodeURI(url),'新建建筑档案',screen.availWidth-300,screen.availHeight-400);
			}
			function openSubs(){
                var url = '<%=basePath%>areaEnergyTmnl/getSubsInfo.action?subsID=101000000011';
                //var url = '<%=basePath%>'+'pages/areaEnergy/baseData/tmnlInstall/creatConsSubRecord.jsp';
                OpenWin(encodeURI(url),'建筑1',screen.availWidth-300,screen.availHeight-400);
            }
            function openTranInfo(){
                //建筑ID
                var url = '<%=basePath%>'+'/pages/areaEnergy/baseData/tmnlInstall/tranListInfo.jsp';
                OpenWin(encodeURI(url),'变压器列表信息',screen.availWidth-300,screen.availHeight-400);
            }
            function openTranMpInfo(){
            //传入 areaNo 服务中心 、LINESELF、tranId
                var url = '<%=basePath%>areaEnergyTmnl/getTranAndMpInfo.action?tranId=101000000038';
                //var url = '<%=basePath%>'+'pages/areaEnergy/baseData/tmnlInstall/tranInfoAndMpInfo.jsp';
                OpenWin(encodeURI(url),'变压器测点',screen.availWidth-50,screen.availHeight-50);
            }
        </script>
	</head>

	<body>
		<div>
			<a id="btn" class="easyui-linkbutton"
				data-options="iconCls:'icon-add'"
				onclick="javascript:onClickOpen();">新建采集档案</a>
		</div>
		<div>
			<a id="btn1" class="easyui-linkbutton"
				data-options="iconCls:'icon-search'"
				onclick="javascript:openSubs();">建筑</a>
		</div>
		<div>
			<a id="btn2" class="easyui-linkbutton"
				data-options="iconCls:'icon-search'"
				onclick="javascript:openTranInfo();">变压器</a>
		</div>
		<div>
			<a id="btn3" class="easyui-linkbutton"
				data-options="iconCls:'icon-search'"
				onclick="javascript:openTranMpInfo();">变压器测点信息</a>
		</div>
	</body>
</html>
