<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="com.nuchina.mytldser.service.ComOptionService"%>
<%@ page import="java.util.List"%>
<%@ page import="com.nuchina.common.util.JsonUtil"%>
<%@ page import="com.nuchina.paas.system.model.SerComoption"%>
<%@ page import="java.util.ArrayList"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme() + "://"
		+ request.getServerName() + ":" + request.getServerPort()
		+ path + "/";	


    String userid = request.getParameter("userid");//用户id
	String modcode = request.getParameter("modcode");//模块编号
	String comopinion = request.getParameter("comopinion");//id
	String dotype = request.getParameter("dotype");//id

	List<SerComoption> list=new ArrayList<SerComoption>();
	ComOptionService manage = new ComOptionService();
	if("add".equals(dotype)){
		Long opid=manage.insertComOption(userid, modcode, comopinion);
		out.print(opid);
		return;
	}else if("update".equals(dotype)){
		Long id =Long.valueOf(request.getParameter("id"));//id
		Long orderid =Long.valueOf(request.getParameter("orderid"));//id
		manage.updateComOption(id, comopinion, orderid);
		return;
	}else if("del".equals(dotype)){
		Long id =Long.valueOf(request.getParameter("id"));//id
		manage.delComOption(id);
		return;
	}else{
		list= manage.selectComOptionByUserid(modcode, userid);
		if("select".equals(dotype)){
			String json= JsonUtil.listToJson(list, "yyyy-MM-dd HH:mm");
			out.print(json);
			return;
		}
	}
	
	
%>
<!DOCTYPE HTML>
<html>
	<head>
		<base href="<%=basePath%>">

		<title>流转日志查看</title>
		<link rel="stylesheet" href="common/layui/css/layui.css" media="all">
	</head>
<body>
	<table class="layui-table" >
	    <colgroup>
			<col width="65%">
			<col width="13%">
			<col>
		</colgroup>
		<thead>
			<tr>
				<th>意见</th>
				<th>排序值</th>
				<th>操作</th>
			</tr>
		</thead>
		<tbody>
		    <% for(SerComoption s: list){ %>
			<tr>
				<td><div style="width:98%" id="d1_<%=s.getId()%>" ><%=s.getComopinion()%></div>
					<textarea id="txt1_<%=s.getId()%>"  style="display:none;width:98%" rows="3" cols="" ><%=s.getComopinion()%></textarea></td>
				<td><div style="width:98%" id="d2_<%=s.getId()%>" ><%=s.getOrderid()%></div>
					<input id="txt2_<%=s.getId()%>" type="text" style="display:none;width:98%" value="<%=s.getOrderid()%>"/></td>
				<td><a href="javascript:;" class="layui-btn layui-btn-normal layui-btn-xs" onclick="doUpdata(this,'<%=s.getId()%>')" >编辑</a><a href="javascript:;" class="layui-btn layui-btn-danger layui-btn-xs" onclick="del(this,'<%=s.getId()%>')" >删除</a></td>
			</tr>
			<%} %>
		</tbody>
	</table>
</body>
</html>	
<script src="cmuc2/js/jquery-1.8.3.min.js" type="text/javascript"></script>
<script type="text/javascript">
 function doUpdata(obj,id){
	 if($("#d1_"+id).is(":hidden")){
		 $.ajax({
			url : 'cmuc2/comoption.jsp',
			type : 'POST',
			data : {comopinion:$.trim($('#txt1_'+id).val()),orderid:$('#txt2_'+id).val(),id:id,dotype:'update'},
			dataType : "text",
			error : function() {},
			success : function(rel){
				top.g_flush=true;
				$("#d1_"+id).html($("#txt1_"+id).val()).show();
				$("#d2_"+id).html($("#txt2_"+id).val()).show();
				$("#txt1_"+id).hide();
				$("#txt2_"+id).hide();
				$(obj).html('编辑');
			}
		})	 
	 }else{
		 $("#d1_"+id).hide();
		 $("#d2_"+id).hide();
		 $("#txt1_"+id).show();
		 $("#txt2_"+id).show(); 
		 $(obj).html('保存');
	 }
 }
 
 function del(obj,id){ 
	 if(confirm('确认删除？')){
		 $.ajax({
			url : 'cmuc2/comoption.jsp',
			type : 'POST',
			data : {id:id,dotype:'del'},
			dataType : "text",
			error : function() {},
			success : function(rel){
				top.g_flush=true;
				$(obj.parentNode.parentNode).remove();
			}
		})	
	 }
	 

 }
</script>

