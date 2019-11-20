<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@taglib prefix="s" uri="/struts-tags"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<html>
<head>
<base href="<%=basePath%>">
</head>
<body>
	<form method="post" action="sys/login!loginIn.action">
		<s:hidden name="user.userid"></s:hidden>
		<s:hidden name="user.userpwd"></s:hidden>
		<s:hidden name="logintype"></s:hidden>
	</form>
</body>
</html>
<script type="text/javascript">
  document.forms[0].submit();
</script>
