<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="com.nuchina.mycontrol.util.GetOrgForSelectOrg"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<title>中国移动人员组织机构</title>
		<base target="_self">
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
		<meta http-equiv="description" content="This is my page">
		<link rel="stylesheet" type="text/css" href="css/usercontrol.css">
		<link rel="stylesheet" type="text/css" href="css/dtree.css">
		<script type="text/javascript" src="js/jquery-1.4.2.min.js"></script>
		<script type="text/javascript" src="js/userControl-v1.0.js"></script>
		<script type="text/javascript" src="js/dtree-v1.0.js"></script>
		<script type="text/javascript">
		
 

var _pwindos=window.dialogArguments.document;
var _kjid='<%=request.getParameter("Id")%>';
var _condifs='';
var _selecttype='';
var openunit='';
var _selectnum='';
var _code=_pwindos.getElementById("code_"+_kjid).value;
var _type=_pwindos.getElementById("type_"+_kjid).value;

var _idinputid='';
var _nameinputid='';
var _typeinputid='';


var dirTree = new dTree('dirTree');
dirTree.add('0','中国移动','company','-1');


 $(document).ready(
	function(){
		init();
	}
 )	
function init(){
	 eval('var controlcodis='+$(_pwindos).find('#control_'+_kjid).val());
		_selecttype=controlcodis.selectType;
		_condifs=controlcodis.condifs;
		openunit=controlcodis.openunit;
		_selectnum=controlcodis.selectnum;
		_idinputid=controlcodis.idinputId;
		_nameinputid=controlcodis.nameinputId;
		_typeinputid=controlcodis.typeinputId;
		var showGroup=controlcodis.showGroup;

		$.ajax({
			url : 'getChild.jsp',
			type : 'POST',
			data : {
				code:_code,
				type:_type,
				selectType:_selecttype,
				showGroup:showGroup,
				condifs:_condifs,
				searchperson:$('#searchperson').val(),
				searchevent:0			
			},
			dataType:"text",
			error : function(err) {
				alert('获取节点数据失败！');
			},
			success : function(result) {
				dirTree = new dTree('dirTree');
		        dirTree.add('0','中国移动','company','-1');
				eval(result);
				//显示机构树
				document.getElementById("directoryTree").innerHTML = dirTree.toString();
				//加载控制初始值
				loadItem();
				if (openunit!=''){
					//展开默认机构
					var ddd=$('#hide_'+openunit).val();
					if(typeof(ddd)!='undefined'){
						var valist=ddd.split('**');
						getChild(valist[0],valist[1],valist[2]);
					}
			    }
			}
		});
 }
 function BindEnter(obj){
    if(obj.keyCode == 13){
         searchInfo();
         obj.returnValue = false;
    }
}
	
/**
 * 异步获取对象子节点信息
 * @param {Object} id 对象ID
 * @param {Object} type 对象类型
 * @param {Object} index 对象节点序列
 */
function getChild(id,type,index,aIndentstr,aobj){
	document.getElementById("idirTree" + index).src = "img/loading.gif";
	$.ajax({
			url : 'getChild.jsp',
			type : 'POST',
			data : {
				code: id,
				type: type,
				selectType : _selecttype,
				condifs : _condifs,
				searchcondifs:$('#searchcondifs_id').val(),
				searchperson:$('#searchperson').val()
			},
			dataType:"json",
			error : function(err) {
				alert('获取节点数据失败！');
				document.getElementById("idirTree" + index).src = dirTree.aNodes[index].icon;
			},
			success : function(result) {
				//返回子节点数据
				var defid = result.id;
				var defname = result.name;
				var defobjdata=result.objdata;
				var deftype = result.type;
				var defsearchperson = result.searchperson;
				
				dirTree.aNodes[index].tag =1;//很重要，否则节点不会展开
				if (defid.length > 0) {
                    var hc=false;//是否有子节点 
                    var tag=0;//为0时，点击节点的+号，异步加载子节点
                    
                    
					for (i = 0; i < defid.length; i++) {
						hc=deftype[i] == "person"?false:true;
						tag=deftype[i] == "person"?-1:0;
						if (_selecttype.indexOf(deftype[i]) == -1) {
							//为限制选择类型
							dirTree.add(defid[i],defname[i],deftype[i],id,tag,'#',defobjdata[i],defsearchperson[i],hc);	
						} else {
							dirTree.add(defid[i],defname[i],deftype[i],id,tag,'dbjs',defobjdata[i],defsearchperson[i],hc);
						}
					}
				}

			    dirTree.aNodes[index]._io = true;		
			    if(aobj==null){
			    	document.getElementById("directoryTree").innerHTML = dirTree.toString();
			    }else{
			    	$(aobj).removeAttr("onclick");
					$(aobj).click(function(){dirTree.o(index);});
					var imgsrc=	$('#jdirTree'+index)[0].src;
					if(imgsrc.indexOf('plus.gif')!=-1)
					   $('#jdirTree'+index)[0].src='img/minus.gif';
					else
						$('#jdirTree'+index)[0].src='img/minusbottom.gif';
					
	                dirTree.aIndent=aIndentstr.split(',');
	                document.getElementById("idirTree" + index).src = dirTree.aNodes[index].iconOpen;
	                var addHtml=dirTree.addNode(dirTree.aNodes[index]);
	                if($.trim(addHtml)==''){
	                	 //$('#ddirTree'+index).show();
	                }else{
	                	$('#ddirTree'+index).html(addHtml);
	                    $('#ddirTree'+index).show();
	                }
			    }
				
                
                	
			}
		});
}
 
 /**
  * 控件搜索事件
  * @return {TypeName} 
  */
 function searchInfo(){ 
	 if($('#searchcondifs_id').val().trim()==''){
		 alert('请输入查询条件');
		 $('#searchcondifs_id').focus();
		 return;
	 }
	 	$.ajax({
			url : 'getChild.jsp',
			type : 'POST',
			data : {
				code: _code,
				type: _type,
				selectType : _selecttype,
				condifs : _condifs,
				searchcondifs:$('#searchcondifs_id').val(),
				searchperson:$('#searchperson').val(),
				searchevent:1			
			},
			dataType:"text",
			error : function(err) {
				alert('获取节点数据失败！');
			},
			success : function(result) {
				dirTree = new dTree('dirTree');
		        dirTree.add('0','中国移动','company','-1');
				eval(result);
				//返回子节点数据
				document.getElementById("directoryTree").innerHTML = dirTree.toString();
			}
		});
	 
 }
</script>
	</head>
	<body class="ucbody"  onkeydown="BindEnter(event)" >
	<div style="width: 100%;">
		<img alt="" src="img/poplogo.gif" style="float:left;" />
		<img alt="" src="img/popright.gif" style="float:right;" />
	</div>
	<div id="backg" style="clear: both;clear: both;text-align:right; padding: 5px 0px;  " >
	<select id="searchperson" onchange="init();$('#searchcondifs_id').val('')">
		<option value="1">内部用户</option>
		<option value="2">外部用户</option>
	</select>
	<input type="text" id="searchcondifs_id" style="width: 90px;border: 1px solid #000" />
	<input type="button" onclick="searchInfo();" value="搜索" style="margin-right: 8px;border: 1px solid #000" />
	</div>
		<table border="0">
			<tr>
				<td>
					<div class="divcontent" id="directoryTree">
					</div>
				</td>
				<td width=50>
					<input class="button" type="button" onClick="removeMore();"
						value="删 除">
					<div style="height: 18px"></div>
					<input class="button" type="button" onClick="removeAll();"
						value="清 空">
				</td>
				<td>
					<div id="Selectdiv"
						style="line-height: 22px; padding: 0px; padding-top: 5px;"
						class="divcontent">
					</div>
					<script type="text/javascript">
					
					</script>
				</td>
			</tr>
		</table>
		<center>
			<div style="height:20px;margin-top:10px; width: 100%">
				<input type="button" value="确定" class="button"  onclick="btnOk();" />
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				<input type="button" value="取消" class="button" onclick="btnClose();" />
			</div>
			<div style="width: 100%; height: 5px; background-color: #ccddee;">
				<div
					style="width: 100%; height: 45px; background-color: #edebec; margin-top: 5px;">
					<span class="font"><br>2013© 中国移动江西分公司 版权所有</span>
				</div>
			</div>
		</center>
	</body>
</html>
