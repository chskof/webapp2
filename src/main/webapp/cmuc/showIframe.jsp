<%@ page language="java" pageEncoding="utf-8"%>
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
    <style type="text/css">
      .prottb{
        border-collapse: collapse;width: 100%;height: 100%;font-size: 12px;
      }
       .prottb td{
         border: none;
       }
    </style>

  </head>
  <%
		String processInstID = request.getParameter("processInstID");		
  %>
  <body style="font-size: 12px;margin: 0; padding: 0;">
  <form name="frm" action="cmuc/showWFGraph.jsp" target="graph">
	   <table class="prottb" cellpadding="0" cellspacing="0" border="0" >
	      <tr>
	          <td style="text-align: right;" >
	             缩放比例：<select onChange="handleZoom(this)" size="1" name="zoomQuotiety">
		          <option value="1.0">自动</option>
		          <option value="0.4">40%</option>
		          <option value="0.55">55%</option>
		          <option value="0.7">70%</option>
		          <option value="0.85">85%</option>
		          <option value="1.0">100%</option>
		          <option value="1.5">150%</option>
		          <option value="2.0">200%</option> 
	            </select> 	             
	          </td>
	      </tr>
	      <tr>
	         <td style="height: 100%">
			      <iframe id="graph" name="graph" src='cmuc/showWFGraph.jsp?processInstID=<%=processInstID %>&zoom=1' scrolling="auto" style="height:100%; width: 100%;"  frameborder="0" >
			       </iframe>
	         </td>
	      </tr>
	   </table>
       <input type="hidden" name="processInstID" value=<%=processInstID%>>
       <input type="hidden" name="zoomvalue">
    </form>
  </body>
 <script type="text/javascript" >
  function handleZoom(selectObj) {
	 frm.zoomvalue.value=selectObj.value;
	 frm.submit();	 
  }
</script> 
</html>
