<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.frontier.framework.spring.SpringContextUtil" %>
<%@ page import="com.frontier.framework.service.impl.BaseServiceIbatisImpl" %>
<%@ page import="com.frontier.framework.model.UserInfo" %>
<%@ page import="java.util.List" %>
<%@ page import="java.util.HashMap" %>
<%@ page import="com.frontier.framework.service.IBaseServiceIbatis" %>
<%
    String baseUrl=request.getContextPath();
    String absolutePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+baseUrl+"/";
%>
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=utf-8" />
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="Cache-Control" content="no-cache" />
<meta http-equiv="Expires" content="0" />
<title>江苏电力</title>

	<jsp:include page="/ext.jsp"/>
    <link rel="stylesheet" type="text/css" href="<%=baseUrl%>/resources/jsepc/desktop/ext-patch.css" />
    <link rel="stylesheet" type="text/css" href="<%=baseUrl%>/resources/jsepc/desktop/css/desktop.css" />
    <script type="text/javascript" src="<%=baseUrl%>/resources/jsepc/desktop/js/StartMenu.js"></script>
    <script type="text/javascript" src="<%=baseUrl%>/resources/jsepc/desktop/js/TaskBar.js"></script>
    <script type="text/javascript" src="<%=baseUrl%>/resources/jsepc/desktop/js/Desktop.js"></script>
    <script type="text/javascript" src="<%=baseUrl%>/resources/jsepc/desktop/js/App.js"></script>
    <script type="text/javascript" src="<%=baseUrl%>/resources/jsepc/desktop/js/Module.js"></script>
    <script type="text/javascript" src="desktop.js"></script>
    <script type="text/javascript" src="<%=baseUrl%>/pages/system/frameToolbar.js"></script>
</head>
<script>
	function changeImg(id,name){
		document.getElementById(id).src="../../images/desktopIco/"+name;
	}
</script>
<body>

<% 
	IBaseServiceIbatis ibsi = (IBaseServiceIbatis)SpringContextUtil.getService("baseService");
	UserInfo userInfo = (UserInfo)session.getAttribute("userInfo");
	Long uid = userInfo.getUserId();
	List list = ibsi.findObjects("SysUserMenu.selectUserMenuById", uid);
%>

<div id="x-desktop">
	<table id="x-shortcuts" border="0" cellpadding="0" cellspacing="25">
		<tr>
    	<% 
    		if(list!=null){
    			HashMap map = null;
    			//计算桌面图标列数
    			int col = list.size()/4;
    			int residue = list.size()%4;
    			int add = 0;
    			if(list.size()%4!=0){
    				col = list.size()/4+1;
    				residue = list.size()%4;
    				add = 4-residue;
    			}
    			
    			//遍历桌面图标
    			for(int i=0;i<list.size();i++){
    				map = (HashMap)list.get(i);
    				if(i==0){
    					out.println("<td><table height=\"500\" border=\"0\" cellpadding=\"0\">");
    				}
    				if(i!=0 && i%4==0){
    					out.println("</td></table><td><table height=\"500\" border=\"0\" cellpadding=\"0\">");
    				}
    				//获取功能图标名称
    				String img = map.get("funcIco")+"";
    				if(img.equals("null") || img.trim().equals("")){
    					img = "mpMenu_0_active.png";
    				}
    				int index = img.lastIndexOf("_");
    				String imgName = "";
    				imgName = img.substring(0,index);
    				
    	%>
    	<tr>
	    	<td  align="center" valign="top" height="80">
	            <a href="#" onClick="javascript:com.frontier.gdc.system.desktop.menuClick( {id:'<%=map.get("menuId")%>',url:'<%=(map.get("deployUrl")+""+map.get("funcUrl"))%>',text:'<%=map.get("funcName")%>'})">
	            <img id="<%=map.get("menuId") %>" src="../../images/desktopIco/<%=img%>" width="50" height="50" onMouseOut="changeImg('<%=map.get("menuId") %>','<%=img %>')" onMouseOver="changeImg('<%=map.get("menuId") %>','<%=imgName %>_hover.png')"/>
	            <div><%=map.get("funcName")%></div></a>
	        </td>
        </tr>
        <%
        			if(i==(list.size()-1)){
        				for(int y=0;y<add;y++){
        %>
        <tr>
	    	<td  align="center" valign="top" height="80">
	        </td>
        </tr>
        <%				
        				}
        			}
        		}
        		out.println("</table></td>");
			} 
        	
        %>
    </table>
    
</div>

<div id="ux-taskbar">
	<div id="ux-taskbar-start"></div>
	<div id="ux-taskbuttons-panel"></div>
	<div class="x-clear"></div>
</div>


</body>
</html>

