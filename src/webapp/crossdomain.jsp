<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
response.addHeader("content-type","text/xml;charset=utf-8");
response.addHeader("x-permitted-cross-domain-policies","all");
out.println("<?xml version='1.0'?><cross-domain-policy><allow-access-from domain='*' /></cross-domain-policy>");
%>