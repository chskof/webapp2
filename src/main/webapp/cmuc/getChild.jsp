<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="com.nuchina.webapp1.exam.cmuc.GetOrgForSelectOrg"%>
<%@ page import="java.util.List"%>
<%@ page import="com.eos.workflow.omservice.WFParticipant"%>
<%@ page import="com.nuchina.mycontrol.model.*"%>
<%@ page import="java.util.ArrayList"%>
<%
	String code = request.getParameter("code");//id
	System.out.println(code);
	String type = request.getParameter("type");//类型
	String selectType = request.getParameter("selectType");//选择的类型
	String condifs = request.getParameter("condifs");//内部限制条件
	String searchcondifs=request.getParameter("searchcondifs");//查询条件
	String showGroup=request.getParameter("showGroup");
	String searchevent=request.getParameter("searchevent");
	String searchperson = request.getParameter("searchperson");
	GetOrgForSelectOrg manage = new GetOrgForSelectOrg();
	if(searchevent!=null){
		if("0".equals(searchevent)){
			//第一加载控件
			out.print(manage.getOrgData(code,type,selectType,showGroup,condifs,searchperson));
		}else{
			//搜索事件
			out.print(manage.searchData(code,type,selectType,condifs,searchcondifs,searchperson));
		}
		return;		
	}
	

	String res = "{\"id\":[$id],\"name\":[$name],\"type\":[$type],\"objdata\":[$objdata],\"searchperson\":[$searchperson]}";
	String idlist = "";
	String namelist = "";
	String objdatalist = "";
	String typelist = "";
	String searchpersons = "";


	List<WFParticipant> data = new ArrayList<WFParticipant>();
	String[] ctypeList = manage.getShowtypeNew(type,code,selectType).split(",");
	for (String ctype : ctypeList) {
		List<WFParticipant> tempList = manage.getUnitbyPid(code, type,ctype,condifs,searchperson);
		if (tempList != null && !tempList.isEmpty()) {
		    if("00370000000000000000".equals(code)){
		    	//省公司不加载分公司
		    	for(WFParticipant p :tempList){
		    		WFPObject pi=(WFPObject)p;
		    		if(!pi.equals("company")){
		    			data.add(p);
		    		}
		    	}
		    }else{
		    	data.addAll(tempList);
		    }
		}
	}
	


	if (data != null) {
		WFPObject w = null;
		for (WFParticipant m : data) {
			w = (WFPObject) m;
			idlist += "\"" + w.getId() + "\",";
			namelist += "\"" + w.getName() + "\",";
			typelist += "\"" + w.getTypeCode() + "\",";		
			objdatalist += "\"" + w.getNamevale() + "\",";
			searchpersons += "\"" + searchperson + "\",";
			 
		}
	}
	if (!idlist.equalsIgnoreCase("")) {
		idlist = idlist.substring(0, idlist.length() - 1);
		namelist = namelist.substring(0, namelist.length() - 1);
		objdatalist = objdatalist.substring(0,objdatalist.length() - 1);
		typelist = typelist.substring(0, typelist.length() - 1);
		searchpersons = searchpersons.substring(0, searchpersons.length() - 1);
	}
	res = res.replace("$id", idlist);
	res = res.replace("$name", namelist);
	res = res.replace("$type", typelist);
	res = res.replace("$objdata", objdatalist);
	res = res.replace("$searchperson", searchpersons);
	
	out.print(res);
%>


