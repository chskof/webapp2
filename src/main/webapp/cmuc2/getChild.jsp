<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="com.nuchina.mytldser.service.SelectOrgService"%>
<%@ page import="java.util.List"%>
<%@ page import="com.nuchina.paas.base.model.*"%>
<%@ page import="java.util.ArrayList"%>
<%
	String code = request.getParameter("code");//id
	String type = request.getParameter("type");//类型
	String selectType = request.getParameter("selectType");//选择的类型
	String condifs = request.getParameter("condifs");//内部限制条件
	String searchcondifs=request.getParameter("searchcondifs");//查询条件
	String showGroup=request.getParameter("showGroup");
	String searchevent=request.getParameter("searchevent");
	SelectOrgService manage = new SelectOrgService();
	if(searchevent!=null){
		if("0".equals(searchevent)){
			//第一加载控件
			out.print(manage.getOrgData(code,type,selectType,showGroup,condifs));
		}else{
			//搜索事件
			out.print(manage.searchData(code,type,selectType,condifs,searchcondifs));
		}
		return;		
	}
	

	String res = "{\"id\":[$id],\"name\":[$name],\"type\":[$type],\"objdata\":[$objdata]}";
	String idlist = "";
	String namelist = "";
	String objdatalist = "";
	String typelist = "";


	List<SerWFPObject> data = new ArrayList<SerWFPObject>();
	String[] ctypeList = manage.getShowtypeNew(type,code,selectType).split(",");
	for (String ctype : ctypeList) {
		List<SerWFPObject> tempList = manage.getUnitbyPid(code, type,ctype,condifs);
		if (tempList != null && !tempList.isEmpty()) {
		    if("00370000000000000000".equals(code)){
		    	//省公司不加载分公司
		    	for(SerWFPObject p :tempList){
		    		SerWFPObject pi=(SerWFPObject)p;
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
		SerWFPObject w = null;
		for (SerWFPObject m : data) {
			w = (SerWFPObject) m;
			idlist += "\"" + w.getId() + "\",";
			namelist += "\"" + w.getName() + "\",";
			typelist += "\"" + w.getTypeCode() + "\",";		
			objdatalist += "\"" + w.getNamevale() + "\",";

		}
	}
	if (!idlist.equalsIgnoreCase("")) {
		idlist = idlist.substring(0, idlist.length() - 1);
		namelist = namelist.substring(0, namelist.length() - 1);
		objdatalist = objdatalist.substring(0,objdatalist.length() - 1);
		typelist = typelist.substring(0, typelist.length() - 1);

	}
	res = res.replace("$id", idlist);
	res = res.replace("$name", namelist);
	res = res.replace("$type", typelist);
	res = res.replace("$objdata", objdatalist);
	
	out.print(res);
%>


