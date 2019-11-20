<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="com.nuchina.webapp1.exam.cmuc.GetHgpOrgForSelectOrg"%>
<%@ page import="java.util.List"%>
<%@ page import="com.eos.workflow.omservice.WFParticipant"%>
<%@ page import="com.nuchina.mycontrol.model.*"%>
<%@ page import="java.util.ArrayList"%>
<%@ page import="com.nuchina.lawPlatform.action.LawAskQuestionAction"%>
<%@page import="com.nuchina.webapp1.common.base.SysConfigUtil"%>
<%
	String pid = request.getParameter("pid");//父id
	String type = request.getParameter("type");//父类型
	String selectType = request.getParameter("selectType");//选择的类型
	String noSelDate = request.getParameter("noSelDate");//不加载的数据（用于选择组织机构）

	String res = "{\"id\":[$id],\"name\":[$name],\"type\":[$type],\"icon\":[$icon],\"iopen\":[$iopen],\"namevalue\":[$nvalue]}";
	String idlist = "";
	String namelist = "";
	String namevaluelist = "";
	String typelist = "";
	String iconlist = "";
	String iopenlist = "";

	List<WFParticipant> data = new ArrayList<WFParticipant>();

	GetHgpOrgForSelectOrg manage = new GetHgpOrgForSelectOrg();
	String[] ctypeList = manage.getShowtype(selectType).split(",");
	for (String ctype : ctypeList) {
		List<WFParticipant> tempList = manage.getUnitbyPid(pid, type,
				ctype);
		if (tempList != null && !tempList.isEmpty()) {
			if (!noSelDate.equalsIgnoreCase("")) {
				for (WFParticipant obj : tempList) {
					if (noSelDate.indexOf(obj.getId() + ",") != -1) {
						continue;
					}
					data.add(obj);
				}
			} else {
				data.addAll(tempList);
			}
		}
	}

	if (data != null) {
		WFPObject w = null;
		for (WFParticipant m : data) {
			w = (WFPObject) m;
			LawAskQuestionAction action = (LawAskQuestionAction)SysConfigUtil.getBean("lawAskQuestionAction");
			if (w.getTypeCode().equalsIgnoreCase("person")) {
				//查询帮帮团成员
				
				String ty = action.selectMembers(w.getId());
				if(!"ok".equals(ty)){
					continue;
				}
				idlist += "\"" + w.getId() + "\",";
				namelist += "\"" + w.getName() + "\",";
				namevaluelist += "\"" + w.getNamevale() + "\",";
				WFPPerson p = (WFPPerson) w;
				if (p.getTel() != null) {
					typelist += "\"" + p.getTel() + "*";
				} else {
					typelist += "\"*";
				}
				if (p.getEmail() != null) {
					typelist += p.getEmail() + "\",";
				} else {
					typelist += "\",";
				}
				if (p.getIsleader()) {
					iconlist += "\"img/leader.gif\",";
				} else {
					iconlist += "\"img/person.gif\",";
				}
				iopenlist += "\"\",";
				
			}else{
				String part = action.selectPart(w.getId());
				if(!part.equals("ok")){
						continue;
				}
				idlist += "\"" + w.getId() + "\",";
				namelist += "\"" + w.getName() + "\",";
				namevaluelist += "\"" + w.getNamevale() + "\",";
		
				typelist += "\"" + w.getTypeCode() + "\",";
				iconlist += "\"img/" + w.getTypeCode()
						+ "_close.gif\",";
				iopenlist += "\"img/" + w.getTypeCode()
						+ "_open.gif\",";
				
			}

		}
	}
	if (!idlist.equalsIgnoreCase("")) {
		idlist = idlist.substring(0, idlist.length() - 1);
		namelist = namelist.substring(0, namelist.length() - 1);
		namevaluelist = namevaluelist.substring(0,
				namevaluelist.length() - 1);
		typelist = typelist.substring(0, typelist.length() - 1);
		iconlist = iconlist.substring(0, iconlist.length() - 1);
		iopenlist = iopenlist.substring(0, iopenlist.length() - 1);
	}
	res = res.replace("$id", idlist);
	res = res.replace("$name", namelist);
	res = res.replace("$nvalue", namevaluelist);
	res = res.replace("$type", typelist);
	res = res.replace("$icon", iconlist);
	res = res.replace("$iopen", iopenlist);
	out.print(res);
%>


