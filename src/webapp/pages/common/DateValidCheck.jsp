<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib uri="/fpus-tags" prefix="fpus"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Calendar"%>
<%
	SimpleDateFormat f = new SimpleDateFormat("yyyy-MM-01");
	Calendar c = Calendar.getInstance();
	String strCurrDate = f.format(c.getTime());
%>
<script type="text/javascript">
	//第一个参数为日期控件对象，必填
	//该参数可不填, limitMonth默认5个月，单位为月
	function CheckDate(obj,limitMonth){
		var currDate='<%=strCurrDate%>';//当前时间，取服务器时间
		if(limitMonth==null||limitMonth=='undefined'){limitMonth=5;}
		//判断日期
		if(GetDateDiff(obj.value,currDate)>limitMonth){
			//提示
			MessageBox(""+limitMonth+"个月以上历史数据请到统一视图中查询！","系统提示", "images/img/icon_error.gif", MB_OK);
			return 'fail';
		}
		return 'succ';
	}
	function GetDateDiff(startDate,endDate)
	{
		var sDate=new Date(Date.parse(startDate.replace(/-/g,"/")));
		var eDate=new Date(Date.parse(endDate.replace(/-/g,"/")));
		var span=eDate.getYear()*12+eDate.getMonth()-(sDate.getYear()*12+sDate.getMonth());
		return span;
	}
</script>