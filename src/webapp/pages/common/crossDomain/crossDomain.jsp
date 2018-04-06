<%@ page import="com.frontier.basicApp.util.Util" language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%!
//非跨域
String cross = "0";
String crossBaseUrl = ""; 
public String getCross(){
    return cross;
}
public String getCrossBaseUrl(){
    return crossBaseUrl;
}
%>
<%
String referer = request.getHeader("Referer");
String host = request.getHeader("host");
//默认非跨域
cross = "0";
if(!Util.isNullOrEmpty(referer)&&!Util.isNullOrEmpty(host)){
    //ip+port
    String ipAddr = referer.replace("http://","").split("/")[0];
	if(!ipAddr.equals(host)){
	    crossBaseUrl = referer.split("aueic")[0]+"aueic/";
	    cross = "1";//跨域
	}
}
%>


