<%@ page language="java" pageEncoding="UTF-8"%>
<%@taglib prefix="s" uri="/struts-tags"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<html>
<head>
<base href="<%=basePath%>">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
<link rel="stylesheet" href="common/layui/css/layui.css" media="all">
<script src="common/js/jquery-1.8.3.min.js" type="text/javascript"></script>
<title>提交成功</title>
<style type="text/css">

.title{
    padding: 0 80px 0 20px;
    height: 42px;
    line-height: 42px;
    border-bottom: 1px solid #eee;
    font-size:15px;
    color: #333;
    overflow: hidden;
    background-color: #F8F8F8;
    border-radius: 2px 2px 0 0;
}

</style>
</head>

<body style="margin: 0px;padding: 0px;background-color: white;">
  <div  id ="bdiv"style="background-color:#E3E7EC;width: 100%;height: 100%;z-index: 1;position:fixed;top: 0px;left: 0px;"></div>	
	<div id="pdiv" style="background-color: white;border-radius:2px;box-shadow:1px 1px 50px rgba(0,0,0,.3);width:280px;position:fixed;z-index:10;display: none;">
	  <div class="title">信息</div>
	  <div id="cdiv" style="font-size:14px;line-height: 20px;padding: 20px;word-break: break-all"></div>
	  <div style="text-align: right;padding: 0 15px 12px">
	     <input type="btn" onclick="closew();" id="cbtn" class="layui-btn layui-btn-normal layui-btn-sm" style="width: 78px" value="关闭(3s)" />
	  </div>
	</div>
</body>

</html>

<script type="text/javascript">
	var msg = "<s:property value='tipMessage'  escape='false'/>";
	if (typeof (msg) == "undefined" || ''==$.trim(msg)) {
		msg='成功操作！';
	}
	msg=msg=='hasfinish'?'工单已完成！':msg=='nopermision'?'无权限处理！':msg=='nodata'?'无数据！':msg=='error'?'处理错误！':msg;
	var i=3;
	$('#cdiv').html(msg);
	$('#pdiv').offset({left:($('#bdiv').width()-$('#pdiv').width())/2,top:($('#bdiv').height()-$('#pdiv').height())/2});
	$('#pdiv').show();
	window.setTimeout(autocolse,1000); 
	
	function autocolse(){
		i--;
		if(i<=0){
			closew();
		}else{
			window.setTimeout(autocolse,1000); 
			$('#cbtn').val("关闭("+i+"s)");
		}
	}
	
	function closew(){
		try{
			nativeFunction.closeCurrentVC();	
		}catch(ex){
			window.opener = null;
			window.open("", "_self");
			window.close();
		}
		
	}
</script>
