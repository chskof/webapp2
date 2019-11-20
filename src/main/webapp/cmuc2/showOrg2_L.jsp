<%@ page language="java" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
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
		<link rel="stylesheet" type="text/css" href="css/dtree.css">
		<link rel="stylesheet" href="<%=basePath%>common/layui/css/layui.css" media="all">
		<style type="text/css">
		 .divcontent
		 {
		  	border: 1px solid #999;
		  	box-sizing:border-box;
		  	-moz-box-sizing:border-box;
		  	-webkit-box-sizing:border-box;
			width:255px;
			height: 355px;
			overflow-y: auto;
			overflow-X: hidden;
			margin-top: 15px;
			text-align: left;
		 }
		#directoryTree a{font-size: 14px}
		
		#Selectdiv a {
			color: #000;
			text-decoration: none;
			width: 254px;
			float: left;
			padding-left:5px;
			line-height:18px;
			-moz-box-sizing:border-box;
		  	-webkit-box-sizing:border-box;
		  	font-size: 14px;
		}
		.aselect {
			background-color: #D4D0C8;
		}
		
		#Selectdiv a:hover {
			background-color: #E4EEF6
		}
		
		.btnwidth{width: 88px}
        .sbtnwidth{width:55px}
        .txtwidth{width:380px;float: left;margin-right: 5px}
		
		</style>
	</head>
	<body onkeydown="BindEnter(event)" style="padding:0px; margin:0px;text-align: center;" >
		<table border="0"  style="border-collapse: collapse;margin: 5px auto 0px auto" >
		   <tr>
			<td colspan="3">
				<input type="text" id="searchcondifs_id" placeholder="请输入查询条件"  class="layui-input txtwidth" />
				<div style="float: left;">
				<button onclick="searchInfo();" class="layui-btn layui-btn-primary btnwidth">
					<i class="layui-icon">&#xe615;</i>搜索
				</button>
				<button id="btnbackinfo" onclick="rebackInfo();"
					class="layui-btn layui-btn-primary btnwidth" style="margin-left:3px">
					<i class="layui-icon">&#xe669;</i>重置
				</button>
				</div>
			</td>
		</tr>
		   <tr>
		      <td>
		          <div class="divcontent" id="directoryTree">
				  </div>
		      </td>
		      <td style="text-align: center;width:65px" >
		       <div>
		          <input class="layui-btn layui-btn-normal layui-btn-xs sbtnwidth" style="background-color: #E7E7E7;color:#666;" type="button" onClick="removeMore();" value="删 除">
		       </div>
		       <div  style="margin-top:8px;">  
				  <input class="layui-btn layui-btn-normal layui-btn-xs sbtnwidth" style="background-color: #E7E7E7;color:#666;" type="button"  onClick="removeAll();" value="清 空">
				</div>   
		      </td>
		      <td>
		         <div id="Selectdiv" style="padding-top: 5px" class="divcontent">
				 </div>
		      </td>
		   </tr>
		   <tr>
		     <td colspan="3" style="text-align:center; padding-top:15px" >
		          <input type="button" value="确定" class="layui-btn  layui-btn-normal" style="width:90px" onclick="btnOk();" />
				 <input type="button" value="取消" class="layui-btn" style="background-color: #E7E7E7;color:#444;width:90px" onclick="btnClose();" />
		     </td>
		   </tr>
		</table>
	</body>
</html>

		<script type="text/javascript" src="js/jquery-1.8.3.min.js"></script>
		<script type="text/javascript" src="js/userControl-L-v2.0.js"></script>
		<script type="text/javascript" src="js/dtree-v1.0.js"></script>
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


var dirTree = new dTree('dirTree');
dirTree.add('0','中国移动','company','-1');

 $(document).ready(
	function(){
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
 )	

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
				searchcondifs:$('#searchcondifs_id').val()
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
				
				dirTree.aNodes[index].tag =1;//很重要，否则节点不会展开
				if (defid.length > 0) {
                    var hc=false;//是否有子节点 
                    var tag=0;//为0时，点击节点的+号，异步加载子节点                 
                    
					for (i = 0; i < defid.length; i++) {
						hc=deftype[i] == "person"?false:true;
						tag=deftype[i] == "person"?-1:0;
						if (_selecttype.indexOf(deftype[i]) == -1) {
							//为限制选择类型
							dirTree.add(defid[i],defname[i],deftype[i],id,tag,'#',defobjdata[i],hc);	
						} else {
							dirTree.add(defid[i],defname[i],deftype[i],id,tag,'dbjs',defobjdata[i],hc);
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