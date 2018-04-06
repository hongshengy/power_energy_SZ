<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String baseUrl=request.getContextPath();
    String absolutePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+baseUrl+"/";  
%>
<script type="text/javascript">
	var des = {};
	des.namespace = function(){
		var a=arguments, o=null, i, j, d, rt;
        for (i=0; i<a.length; ++i) {
            d=a[i].split(".");
            rt = d[0];
            eval('if (typeof ' + rt + ' == "undefined"){' + rt + ' = {};} o = ' + rt + ';');
            for (j=1; j<d.length; ++j) {
                o[d[j]]=o[d[j]] || {};
                o=o[d[j]];
            }
        }
	}
	des.absolutePath="<%=absolutePath%>";
	des.webContextRoot="<%=absolutePath%>";
</script>
<link rel="stylesheet" type="text/css" href="<%=baseUrl %>/pages/areaEnergy/common/jquery-easyui-1.5.1/themes/fangtian/easyui.css">
<link rel="stylesheet" type="text/css" href="<%=baseUrl %>/pages/areaEnergy/common/jquery-easyui-1.5.1/themes/icon.css">
<link rel="stylesheet" type="text/css" href="<%=baseUrl %>/pages/areaEnergy/common/jquery-easyui-1.5.1/themes/color.css">
<link rel="stylesheet" type="text/css" href="<%=baseUrl %>/pages/areaEnergy/common/css/common.css">
<link rel="stylesheet" type="text/css" href="<%=baseUrl %>/pages/areaEnergy/common/css/lightbox.min.css"/>
<script type="text/javascript" src="<%=baseUrl %>/pages/areaEnergy/common/jquery-easyui-1.5.1/jquery.min.js"></script>
<script type="text/javascript" src="<%=baseUrl %>/pages/areaEnergy/common/jquery-easyui-1.5.1/jquery.easyui.min.js"></script>
<script type="text/javascript" src="<%=baseUrl %>/pages/areaEnergy/common/jquery-easyui-1.5.1/easyui-lang-zh_CN.js"></script>
<script type="text/javascript" src="<%=baseUrl %>/pages/areaEnergy/common/jquery-easyui-1.5.1/datagrid-detailview.js"></script>
<script type="text/javascript" src="<%=baseUrl%>/js/common_client.js" ${param.flag }></script>
<script type="text/javascript" src="<%=baseUrl %>/js/json2.js"></script>
<noscript>你的浏览器不支持脚本运行，请检查浏览器版本或安全设置！</noscript>