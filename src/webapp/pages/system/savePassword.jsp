<%@ page language="java" import="java.util.*" pageEncoding="ISO-8859-1"%>
<%@ page import="com.frontier.util.encryptanddecryptutil.DesEncrypt" %>
<%
String password = request.getParameter("password");
session.setAttribute("realPassword",DesEncrypt.getEncString(password));
%>
