<%@ page language="java" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath ="https://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE HTML>
<html>
<head>
<title>中国移动人员组织机构</title>
<base target="_self">
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="description" content="通过layui展示人员选择界面">
<link rel="stylesheet" type="text/css" href="<%=basePath%>cmuc2/css/dtree.css">
<link rel="stylesheet" href="<%=basePath%>common/layui/css/layui.css"
	media="all">
<style type="text/css">
#directoryTree {
	overflow-y: auto;
	overflow-X: hidden;
	text-align: left;
	height:70%;
}

#Selectdiv{
	border: 1px solid #999;
	overflow-y: auto;
	text-align: left;
	border-radius:5px;
	height:26%;
	padding:0px 5px 0px 5px;
	position: relative;
	margin-top: 5px;
	box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;
}

#Selectdiv button {
    border:none;
	border-radius:3px;font-size: 14px;padding: 5px 5px 5px 8px; margin-right:2px;background-color: #1E9FFF!important;color: white;margin-top: 2px
}
#Selectdiv button i{color:#FFB800!important;font-size: 15px}

.btnwidth {
	width:85px;
	height:38px;
}


.txtwidth {width: 100%;box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;}

#directoryTree ul{ list-style: none;background-color: #E7E7E7}
#directoryTree ul li{width: 100%;box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;line-height: 38px;position: relative;border-top:solid 1px #fff;}
#directoryTree i span{font-size: 14px;font: 14px 微软雅黑, Helvetica Neue, Helvetica, Arial, PingFang SC, Tahoma, sans-serif}
.layui-icon{margin-right:5px}
.space-i{margin-right:20px}
.space-i0{margin-right:8px}

.radio-i{font-size:22px;position: absolute;top:0px;right:15px;color: #E7E7E7}
.radio-i-sel{font-size:22px;position: absolute;top:0px;right:15px;color:#1E9FFF}

#directoryTree .selli{background-color: white;border-bottom: solid 1px #E7E7E7}

</style>
</head>
<body style="padding:10px; margin:0px;text-align: center;">
	<div style="display:none; padding-right: 200px;height:38px;box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;position: relative;">
		<input type="text" id="searchcondifs_id" placeholder="请输入查询条件" class="layui-input txtwidth" />
		<div style="position: absolute;top:0px;right:12px">
			<button onclick="searchInfo();"
				class="layui-btn layui-btn-primary btnwidth">
				<i class="layui-icon">&#xe615;</i>搜索
			</button>
			<button id="btnbackinfo" onclick="rebackInfo();"
				class="layui-btn layui-btn-primary btnwidth" style="margin-left:3px">
				<i class="layui-icon">&#xe669;</i>重置
			</button>
		</div>
	</div>
	<div style="position: fixed;top:5px;bottom:50px;left:0px;right:0px">
		<div id="directoryTree">
		</div>
		<div id="Selectdiv"></div>
	</div>
	</div>
	<div style="height: 40px;line-height: 40px;position: fixed;bottom:10px;left: 0px;width: 100%">
	   <input type="button" value="取消" style="width: 48%;background-color: #E7E7E7;color:#666;" class="layui-btn" onclick="btnClose();" />
		<input type="button" value="确定" class="layui-btn layui-btn-normal" style="width: 48%"
			onclick="btnOk();" /> 
	</div>
</body>
</html>
<script type="text/javascript" src="<%=basePath%>cmuc2/js/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="<%=basePath%>cmuc2/js/userControl-LMOA-v2.1.js"></script>
<script type="text/javascript" src="<%=basePath%>cmuc2/js/dtree-MOA-v1.1.js"></script>
<script type="text/javascript">
		
 

var _pwindos=parent;
var _kjid='<%=request.getParameter("Id")%>';
var _condifs='';
var _selecttype='';
var openunit='';
var _selectnum='';
var _code=_pwindos.document.getElementById("code_"+_kjid).value;
var _type=_pwindos.document.getElementById("type_"+_kjid).value;
var _idinputid='';
var _nameinputid='';


var dirTree ='';


 $(document).ready(	 
	function(){
		dirTree = new dTree('dirTree');
		dirTree.add('0','中国移动','company','-1');
		
		eval('var controlcodis='+$(_pwindos.document).find('#control_'+_kjid).val());
		_selecttype=controlcodis.selectType;
		_condifs=controlcodis.condifs;
		openunit=controlcodis.openunit;
		_selectnum=controlcodis.selectnum;
		_idinputid=controlcodis.idinputId;
		_nameinputid=controlcodis.nameinputId;
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
				searchevent:0
			},
			dataType:"text",
			error : function(err) {
				alert('获取节点数据失败！');
			},
			success : function(result) {
				eval(result);
				//显示机构树
				document.getElementById("directoryTree").innerHTML = dirTree.toString();
				loadItem();
			}
		});
	}
 )	

	
/**
 * 异步获取对象子节点信息
 * @param {Object} id 对象ID
 * @param {Object} type 对象类型
 * @param {Object} index 对象节点序列
 */
function getChild(id,type,index,level,iid){
	 var aobj=document.getElementById(iid);
	if(document.getElementById("ul_node_"+index)){
		if($('#'+'ul_node_'+index).is(':visible')){
			$(aobj).removeClass('layui-icon-down').addClass('layui-icon-right');
			$('#'+'ul_node_'+index).hide();
		}else{
			$('#'+'ul_node_'+index).show();
			$(aobj).removeClass('layui-icon-right').addClass('layui-icon-down');
		}	
	}else{
		$(aobj).removeClass('layui-icon-right').addClass('layui-icon-down');
		$.ajax({
			url : 'getChild.jsp',
			type : 'POST',
			data : {
				code: id,
				type: type,
				selectType : _selecttype,
				condifs : _condifs,
				searchcondifs:$('#searchcondifs_id').val()
			},
			dataType:"json",
			error : function(err) {
				alert('获取节点数据失败！');
			},
			success : function(result) {
				//返回子节点数据
				var defid = result.id;
				var defname = result.name;
				var defobjdata=result.objdata;
				var deftype = result.type;
				if (defid.length > 0) {
                    var hc=false;//是否有子节点 
                    var tag=0;//为0时，点击节点的+号，异步加载子节点                 
                    
					for (i = 0; i < defid.length; i++) {
						if (_selecttype.indexOf(deftype[i]) == -1) {
							//为限制选择类型
							dirTree.add(defid[i],defname[i],deftype[i],id,tag,'#',defobjdata[i],hc);	
						} else {
							dirTree.add(defid[i],defname[i],deftype[i],id,tag,'dbjs',defobjdata[i],hc);
						}
					}
				}	
	            var addHtml=dirTree.addNode(dirTree.aNodes[index],level);
	            $('#li_node_'+index).append(addHtml);
	            selli();	
			}
		});
	}
}
 
 /**
  * 控件搜索事件
  * @return {TypeName} 
  */
 function searchInfo(){ 
	 if($('#searchcondifs_id').val().trim()==''){
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
				searchevent:1			
			},
			dataType:"text",
			error : function(err) {
				alert('获取节点数据失败！');
			},
			success : function(result) {
				if(htmlStr==''){htmlStr=$('#directoryTree').html();};
				var dirSearTree = new dTree('dirTree');
                dirSearTree.add('0','中国移动','company','-1');
				eval(result);
				//返回子节点数据
				document.getElementById("directoryTree").innerHTML = dirSearTree.toString();
			}
		});
	 
 }
  
  var htmlStr='';
  function rebackInfo(){
	  if(htmlStr!=''){
		  $('#directoryTree').html(htmlStr);
		  $('#searchcondifs_id').val('');
	  }
  }
  
</script>