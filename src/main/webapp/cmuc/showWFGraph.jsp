<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib uri="/cmuc/tlds/workflow.tld" prefix="wf"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<title>流程图</title>
  		<base href="<%=basePath%>">
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
		<meta http-equiv="description" content="This is my page">


	<script type="text/javascript" src="workflow/wfcomponent/web/js/Graphic.js"></script>
	</head>
	<%
		String processInstID = request.getParameter("processInstID");
		String zoom = request.getParameter("zoomvalue");
	 %>
	<body>
		<wf:processGraph processInstID="<%=processInstID%>" zoomQuotiety="<%=zoom%>"></wf:processGraph>
	</body>
</html>
