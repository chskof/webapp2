<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<html>
<head>
<base href="<%=basePath%>">
<title>正在跳转</title>

</head>
<script type="text/javascript">
	top.location.href = "http://emis.jx.chinamobile.com/";
</script>
<body>
	<br>
</body>
</html>
