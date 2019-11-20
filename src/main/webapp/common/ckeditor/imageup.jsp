<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*,java.io.*" %>
<%@ page import="java.text.SimpleDateFormat" %>
<%@ page import="java.io.File" %>
<%@ page import="com.nuchina.mytldser.service.FileUploadSerbyWEB" %>
<%@ page import="com.nuchina.paas.base.model.SerAttach" %>
<%@ page import="org.apache.struts2.dispatcher.multipart.MultiPartRequestWrapper" %>
<%@ page import="com.nuchina.paas.base.model.SysUserInfo" %>

<%
String modcode=request.getParameter("modcode");
String applyNodeName="--"; 
String fileclass="fck文件"; 
SysUserInfo user= (SysUserInfo)request.getSession().getAttribute("currentUser");
String username=user.getUsername();
String userid=user.getUserid(); 
List<String> fileTypes =Arrays.asList(".jpg,.jpeg,.bmp,.gif,.png".split("[,]"));

String path = request.getContextPath();
String basePath = request.getScheme() + "://"
		+ request.getServerName() + ":" + request.getServerPort()
		+ path + "/";


//判断 request 是否有文件上传,即多部分请求
try {
	// 转换成多部分request
	MultiPartRequestWrapper wrapper = (MultiPartRequestWrapper) request;	
	String fileName = wrapper.getFileNames("upload")[0];   
	File upFile = wrapper.getFiles("upload")[0]; 
	
	// 获得图片后缀名称,如果后缀不为图片格式，则不上传
	String suffix = fileName.substring(fileName.lastIndexOf(".")).toLowerCase();
	
	response.setContentType("text/html;charset=utf-8");
	String json="";
	if (!fileTypes.contains(suffix)) {
		json="{\"uploaded\": 0,\"error\": {\"message\": \"图片格式错误！\"}}";
	}else{
		String attPath= FileUploadSerbyWEB.upFileSimple(modcode,upFile,fileName.replace(" ",""),"","fckfolder");
		String fileurl=basePath+"filesfolder/"+attPath;
		if(!"".equals(attPath) ){  
	     json="{\"uploaded\": 1,\"fileName\":\""+fileName+"\",\"url\": \""+fileurl+"\"}";
		}else{
	json="{\"uploaded\": 0,\"error\": {\"message\": \"图片上传失败！\"}}";
		}
	}
	out.println(json);

} catch (Exception e) {
	System.out.println(e);
}
%>


