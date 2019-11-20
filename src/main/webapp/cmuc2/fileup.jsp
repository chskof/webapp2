<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="java.util.*,java.io.*"%>
<%@ page import="java.text.SimpleDateFormat"%>
<%@ page import="java.io.File"%>
<%@ page import="com.nuchina.mytldser.service.FileUploadSerbyWEB"%>
<%@ page import="com.nuchina.paas.base.model.SerAttach"%>
<%@ page
	import="org.apache.struts2.dispatcher.multipart.MultiPartRequestWrapper"%>

<%
	String dotype = request.getParameter("dotype");
	String modcode = request.getParameter("modcode");
	String applyId = request.getParameter("applyId");
	String username = request.getParameter("userName");
	String userid = request.getParameter("userID");
	String applyNodeName = request.getParameter("status");
	String attid = request.getParameter("attid");
	String fileclass = request.getParameter("fileclass");

	try {
		response.setContentType("text/html;charset=utf-8");
		if ("uploadfile".equals(dotype)) {
			//上传文件,并插入文件表
			MultiPartRequestWrapper wrapper = (MultiPartRequestWrapper) request;
			String fileName = wrapper.getFileNames("upFile")[0];
			File upFile = wrapper.getFiles("upFile")[0];
			// 传入前台值
			String json = "";
			if (!FileUploadSerbyWEB.checkUpFileName(modcode, fileName.replace(" ", ""), applyId)) {
				json = "{\"suss\":\"0\",\"info\":\"上传文件重名！\"}";
			} else {
				SerAttach seratt = FileUploadSerbyWEB.upLoadFile(modcode, fileName.replace(" ", ""), applyId,
						upFile, username, userid, applyNodeName, fileclass, "");
				if (seratt != null) {
					SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm");
					json = "{\"suss\":\"1\",\"attid\":\"" + seratt.getAttId() + "\",\"attname\":\""
							+ seratt.getAttName() + "\",\"status\":\"" + seratt.getApplyNodeName()
							+ "\",\"upusername\":\"" + seratt.getPersonName() + "\",\"uptime\":\""
							+ df.format(seratt.getUploadDate()) + "\",\"atttype\":\"" + seratt.getAttType()
							+ "\",\"attPath\":\"" + seratt.getAttPath() + "\"}";
				} else {
					json = "{\"suss\":\"0\",\"info\":\"上传错误！\"}";
				}
			}
			out.print(json);

		} else if ("updatefile".equals(dotype)) {
			//根据文件路径及主表外键或文件主键更新文件
			MultiPartRequestWrapper wrapper = (MultiPartRequestWrapper) request;
			String fileName = wrapper.getFileNames("upFile")[0];
			File upFile = wrapper.getFiles("upFile")[0];
			String filepath = request.getParameter("filepath");
			Long id = null;
			if (attid == null || "".equals(attid)) {
			} else {
				id = Long.parseLong(attid);
			}
			SerAttach seratt = FileUploadSerbyWEB.updateFile(modcode, fileName.replace(" ", ""),upFile, username, userid, id, filepath);
			// 传入前台值
			String json = "";
			if (seratt != null) {
				SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm");
				json = "{\"suss\":\"1\",\"attid\":\"" + seratt.getAttId() + "\",\"attname\":\""
						+ seratt.getAttName() + "\",\"status\":\"" + seratt.getApplyNodeName()
						+ "\",\"upusername\":\"" + seratt.getPersonName() + "\",\"uptime\":\""
						+ df.format(seratt.getUploadDate()) + "\",\"atttype\":\"" + seratt.getAttType()
						+ "\",\"attPath\":\"" + seratt.getAttPath() + "\"}";
			} else {
				json = "{\"suss\":\"0\"}";
			}
			out.print(json);
		} else if ("delete".equals(dotype)) {
			//根据文件主键删除文件
			FileUploadSerbyWEB.delFile(Long.parseLong(attid), modcode);
		} else if ("download".equals(dotype)) {
			//根据文件主键下载文件
			FileUploadSerbyWEB.downLoadFile(Long.parseLong(attid), modcode, response);
			out.clear();
			out = pageContext.pushBody();
			request.getSession().setAttribute("downstatus", attid);
		} else if ("pldownload".equals(dotype)) {
			//批量下载文件
			String attids = request.getParameter("attids");
			FileUploadSerbyWEB.pldownLoadFile(attids, modcode, response);
			out.clear();
			out = pageContext.pushBody();
			request.getSession().setAttribute("downstatus", attids);
		} else if ("downloadbypath".equals(dotype)) {
			//根据文件路径
			String filepath = request.getParameter("filepath");
			String filename = request.getParameter("filename");
			FileUploadSerbyWEB.downFileSimple(filepath, filename, response);
			out.clear();
			out = pageContext.pushBody();
			request.getSession().setAttribute("downstatus", filepath);
		} else if ("getstatus".equals(dotype)) {
			String s = request.getSession(true).getAttribute("downstatus") + "";
			if (s.equals(applyId)) {
				out.print("{\"status\":\"end\"}");
				request.getSession(true).setAttribute("downstatus", "");
			} else {
				out.print("{\"status\":\"0\"}");
			}

		} else if ("upsimple".equals(dotype)) {
			//上传文件不关联文件表
			String filepath = request.getParameter("filepath");
			MultiPartRequestWrapper wrapper = (MultiPartRequestWrapper) request;
			String fileName = wrapper.getFileNames("upFile")[0];
			File upFile = wrapper.getFiles("upFile")[0];
			filepath = FileUploadSerbyWEB.upFileSimple(modcode, upFile, fileName.replace(" ", ""),filepath, "");
			out.print("{\"filepath\":\""+filepath+"\"}");
		}
	} catch (Exception ex) {
		System.out.print(ex);
	}
%>


