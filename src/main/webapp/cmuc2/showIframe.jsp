<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib uri="workflow.tld" prefix="wf"%>
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
        String zoom = request.getParameter("zoom");	
  %>
  <body style="font-size: 12px;margin: 0; padding: 0; position: relative; ">
  <form action="cmuc2/showIframe.jsp" method="post" style="margin: 0; padding: 0; position: relative; " >
     <div style=" padding-left: 10px;position: absolute; top: 0px;left: 0px ">
           缩放比例：<select onChange="handleZoom(this)" id="pzoom" name="zoom">
		          <option value="1">自动</option>
		          <option value="0.5">50%</option>
		          <option value="0.85">85%</option>
		          <option value="1">100%</option>
		          <option value="1.5">150%</option>
		          <option value="2.0">200%</option> 
	            </select>
     </div>
       <input type="hidden" name="processInstID" value="<%=processInstID%>" >
       <wf:processGraph processInstID="<%=processInstID%>" zoomQuotiety="<%=zoom%>" ></wf:processGraph>
    </form>
  </body>
</html>

 <script type="text/javascript" >
  document.getElementById('pzoom').value='<%=zoom%>';
  function handleZoom() {
	 document.forms[0].submit(); 
  }
</script> 
