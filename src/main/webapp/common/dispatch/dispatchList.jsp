<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@taglib prefix="s" uri="/struts-tags"%>
<%@ taglib prefix="mc" uri="myControl.tld"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE HTML>
<html>
<head>
<base href="<%=basePath%>">
<title>流程调度</title>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport"
	content="width=device-width, initial-scale=1, maximum-scale=1">
<link rel="stylesheet" href="common/layui/css/layui.css" media="all">
<link rel="stylesheet" type="text/css" href="cmuc2/css/uc-layui.css">

</head>
<body>
	<form class="layui-form" action="sys/dispatch!getUserTasks.action"
		method="post" name="frm0">
		<div class="nu-form-div">
			<s:hidden name="modecode"></s:hidden>
			<div class="layui-form-item">
				<div class="layui-inline" style="width:500px" >
					<label class="layui-form-label">待办人</label>
					<div class="layui-input-block">
						<mc:orgsingleV1.4 id="person" idinputName="wfWorkItem.participant"
							nameinputName="wfWorkItem.partiName" selectNum="1" toolTip="双击选择对象！"
							readonly="readonly" layVerify="required"  
							value="${wfWorkItem.participant}*${wfWorkItem.partiName}" />
					</div>
				</div>
				<div class="layui-inline">
					<input type="button" value="搜索" onclick="searchInfo();"
						class="layui-btn layui-btn-normal">
				</div>
			</div>
			<table class="layui-table" lay-even>
				<colgroup>
					<col width="100px">
					<col>
					<col width="130px">
					<col width="140px">
					<col width="90px">
				</colgroup>
				<thead>
					<tr>
						<th>工作项ID</th>
						<th>标题</th>
						<th>开始时间</th>
						<th>当前状态</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody>
					<s:iterator value="tasks" var="taskList" status="status">
						<tr>
							<td><s:property value="#taskList.workItemID" /></td>
							<td><s:property value="#taskList.bizObject.apptitle" /></td>
							<td><s:property value="#taskList.startTime" /></td>
							<td><s:property value="#taskList.workItemName" /></td>
							<td><a class="layui-btn layui-btn-normal layui-btn-xs"
								href="javascript:;"
								onclick="dispatch(<s:property value="#taskList.workItemID" />)">调度</a>
							</td>
						</tr>
					</s:iterator>
				</tbody>
			</table>
			<jsp:include page="/common/page/page.jsp"></jsp:include>
		</div>
	</form>
</body>
</html>

<script src="common/layui/layui.js"></script>
<script src="common/js/jquery-1.8.3.min.js"></script>
<script src="common/js/common.js"></script>
<script src="cmuc2/js/uc-control-v1.0.js"></script>
<script type="text/javascript">

	function dispatch(workItemID) {
		layerOpenPage('sys/dispatch!allProNode.action?wfWorkItem.workItemID=' + workItemID+'&modecode=${modecode}','流程调度','700','600',true)
	}


	function searchInfo() {
		$('#page_currentPage').val(1);
		document.forms[0].action = 'sys/dispatch!getUserTasks.action';
		document.forms[0].submit();
	}
	
	layui.use(['form','layer'], function(form,layer) {

	});
</script>
