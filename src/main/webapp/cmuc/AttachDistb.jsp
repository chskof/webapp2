<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="com.nuchina.mycontrol.util.GetOrgForSelectOrg"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>

		<title>中国移动人员附件分发选择</title>
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
		<meta http-equiv="description" content="This is my page">
		<link rel="stylesheet" type="text/css" href="css/usercontrol.css">
		<link rel="stylesheet" type="text/css" href="css/dtree.css">
		<script type="text/javascript" src="js/jquery-1.4.2.min.js">
</script>
		<script type="text/javascript" src="js/userControl-1.2.js">
</script>
		<script type="text/javascript" src="js/dtree-1.2.js">
</script>
	
		<script type="text/javascript">
<%//当前点击的控件id
			String curControlID = request.getParameter("Id").toString();
			String attachId = curControlID + "id";
			String attachName = curControlID + "name";%>
			
			var curControlID='<%=attachId%>';
			var curControlName='<%=attachName%>';
</script>
	<script type="text/javascript" src="js/select.js">
</script>
	</head>
	<img alt="" src="img/poplogo.gif" style="float: left;" />
	<img alt="" src="img/popright.gif" style="margin-left: 68px;" />
	<div id="backg"></div>
	<body class="ucbody">
		<table border="0">
			<tr>
				<td>
					<select class="divcontent" name="first" id="first"
						ondblclick="moveRight();" multiple="multiple">
					 

					</select>
					<script type="text/javascript">

</script>
				</td>
				<td width=50>
					<input class="button" type="button" onclick="moveRight()"
						value="添 加">
					<div style="height: 18px"></div>
					<input class="button" type="button" onClick="moveLeft();"
						value="删 除">
					<div style="height: 18px"></div>
					<input class="button" type="button" onClick="moveAllLeft();"
						value="清 空">
				</td>
				<td>

					<select class="divcontent" id="secend" name="secend"
						multiple="multiple" ondblclick="moveLeft();">

					</select>
					<script type="text/javascript">
loadInit();
</script>
				</td>
			</tr>
		</table>
		<center>
			<div style="height: 20px; margin-top: 10px; width: 100%">
				<input type="button" value="确定" class="button" onclick="deterOk();" />
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				<input type="button" value="取消" class="button" onclick="cancel();" />
			</div>
			<div style="width: 100%; height: 5px; background-color: #ccddee;">
				<div
					style="width: 100%; height: 45px; background-color: #edebec; margin-top: 5px;">
					<span class="font"><br>2013© 中国移动江西分公司 版权所有</span>
				</div>
			</div>
		</center>
	</body>
</html>
