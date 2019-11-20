<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ taglib prefix="uc" uri="myControl.tld"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE HTML>
<html>
<head>
<title>流程图</title>
<base href="<%=basePath%>">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport"
	content="width=device-width, initial-scale=1, maximum-scale=1">
<link rel="stylesheet" href="common/layui/css/layui.css" media="all">
<link rel="stylesheet" type="text/css" href="cmuc2/css/uc-layui.css">
<script src="common/layui/layui.js"></script>
<script src="common/js/jquery-1.8.3.min.js"></script>
<script src="common/js/common.js"></script>
<script src="cmuc2/js/uc-control-v1.0.js"></script>

</head>

<body style="margin: 0px; padding: 0px;">
	<iframe frameborder="0" style="border:none;margin: 0px;padding: 0px;width: 100%;height:68%;position: fixed;
	top: 0px;left: 0px;right: 0px;overflow:scroll;" 
	src="cmuc2/showIframe.jsp?processInstID=${wfWorkItem.processInstID}&zoom=1" ></iframe>
	
	<form class="layui-form"
		style="margin: 0; padding:0;height:28%;position: fixed;bottom:5px;left:0px;right: 0px;width: 100%"
		name="myForm" action="sys/dispatch!flowDispatch.action"
		method="post">

		<s:hidden name="wfWorkItem.workItemID"></s:hidden>
        <s:hidden name="modecode"></s:hidden>
        <s:hidden name="ywparm"></s:hidden>
        <s:hidden name="ywparmval"></s:hidden>
        
		<table class="nu-table">
			<colgroup>
				<col width="14%">
				<col width="36%">
				<col width="14%">
				<col>
			</colgroup>
			<tr>
				<td class="ltd"><span>*</span>调度节点</td>
				<td><s:select list="atvList" name="wfWorkItem.activityDefID"
						listKey="id" listValue="name" headerKey="" headerValue="请选择"></s:select>
				</td>
				<td class="ltd">执行人</td>
				<td><uc:orgsingleV1.4 id="person"
						idinputName="wfWorkItem.participant"
						nameinputName="wfWorkItem.partiName"
						value="${wfWorkItem.participant}*${wfWorkItem.partiName}"
						selectNum="1" readonly="true" /></td>
			</tr>
			<tr>
				<td class="ltd">调度说明:</td>
				<td colspan="3"><textarea name="wfWorkItem.catalogName"
						class="layui-textarea" style="height: 60px;font-size: 13px;min-height: 60px;line-height:14px" rows="3" ></textarea></td>
			</tr>
			<tr>
				<td colspan="4" style="text-align:center; "><input
					class="layui-btn layui-btn-normal" style="margin: 0px" type="button" value="确 定"
					onclick="dispatch();" /></td>
			</tr>
		</table>
	</form>
</body>
</html>
<script type="text/javascript">

$(document).ready(function() {
layui.use(['form','layer'], function(form,layer) {

});
});
	<s:if test="tipMessage=='close'">
	  closeLayerpage('调度完成！',true);	
	</s:if>


	function dispatch() {
		
		top.layer.confirm('确认执行调度?', function(index){
			if ($("#wfWorkItem_activityDefID").val() == "") {
				layerTips('请选择调度节点！','wfWorkItem_activityDefID');
				return;
			} else if ($("#wfWorkItem_participant").val() == "") {
				layerTips('请选择调度人！','wfWorkItem_participant');
				return;
			}
			document.forms["myForm"].submit();
			top.layer.close(index);
		}); 

	}

	
</script>