<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="cmuc.com.bll.GetProLogsData"%>

<%
	String pLogsId=request.getParameter("pLogsId");
	String tableName=request.getParameter("tableName");
	GetProLogsData gpdate = new GetProLogsData();
	String html=gpdate.GetpartHtml(pLogsId,tableName);
	out.print(html);
%>
