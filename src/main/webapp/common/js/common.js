
var g_webUrl=getRootPath_web()+"/";//网站根目录
var g_fileweb=g_webUrl+"filesfolder/";//文件根目录
var g_fileweb1="http://10.180.214.113:9081/bpm-web-app1/filesfolder/";

//获取网站根目录
function getRootPath_web() {
    //获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
    var curWwwPath = window.document.location.href;
    //获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
    var pathName = window.document.location.pathname;
    var pos = curWwwPath.indexOf(pathName);
    //获取主机地址，如： http://localhost:8083
    var localhostPaht = curWwwPath.substring(0, pos);
    //获取带"/"的项目名，如：/uimcardprj
    var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
    return (localhostPaht + projectName);
}

//函数说明：合并指定表格（表格id为_w_table_id）指定列（列数为_w_table_colnum）的相同文本的相邻单元格
//参数说明：_w_table_id 为需要进行合并单元格的表格的id。如在HTMl中指定表格 id="data" ，此参数应为 #data 
//参数说明：_w_table_colnum 为需要合并单元格的所在列。为数字，从最左边第一列为1开始算起。
function _w_table_rowspan(_w_table_id,_w_table_colnum){
_w_table_firsttd = "";
_w_table_currenttd = "";
_w_table_SpanNum = 0;
_w_table_Obj = $(_w_table_id + " tr td:nth-child(" + _w_table_colnum + ")");
_w_table_Obj.each(function(i){
    if(i==0){
        _w_table_firsttd = $(this);
        _w_table_SpanNum = 1;
    }else{
        _w_table_currenttd = $(this);
        if(_w_table_firsttd.text()==_w_table_currenttd.text()){
            _w_table_SpanNum++;
            _w_table_currenttd.hide(); //remove();
            _w_table_firsttd.attr("rowSpan",_w_table_SpanNum);
        }else{
            _w_table_firsttd = $(this);
            _w_table_SpanNum = 1;
        }
    }
}); 
}

/************金额验证***********/
function convertToNum(obj) {
	obj.value = obj.value.replace(/,/g, '');
	obj.select();
}
function moneyFormat(obj, len) {
	var money = "";
	if (!isNaN(parseFloat(obj.value))) {
		money = parseFloat(obj.value).toString();
	} else {
		obj.value = "";
		return;
	}
	var r = ".";
	if (money.indexOf(".") >= 0) {
		r += money.split(".")[1];
	}
	while(r.length < len+1) {
		r += "0";
	}
	var l = money.split(".")[0].split("").reverse();
	t = "";
    for(i = 0; i < l.length; i ++ )
    {   
    	t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    obj.value =  t.split("").reverse().join("") + r;
}
function moneyChange(obj, len) {
	var arr = obj.value.split(".");
	if (Number(len) > 0 && arr.length == 2 && arr[1].length == 0) {
		return;
	}
	if (!isNaN(parseFloat(obj.value))) {
		money = parseFloat(obj.value).toString();
	} else {
		obj.value = "";
		return;
	}
	arr = money.split(".");
	if (arr.length > 1) {
		if (arr[1].length > Number(len)) {
			money = arr[0]+"."+arr[1].substring(0,Number(len));
		}
	}
	obj.value = money;
}


function newGuid() {
	var guid = "";
	for (var i = 1; i <= 32; i++) {
		var n = Math.floor(Math.random() * 16).toString(16);
		guid += n;
		if ((i == 8) || (i == 12) || (i == 16) || (i == 20)) {
			guid += "-";
		}
	}
	return guid;
}
function getElementsByName(tag) {
	var elts = document.getElementsByName(tag);
	var count = 0;
	var elements = [];
	for (var i = 0; i < elts.length; i++) {
		if (elts[i].getAttribute("name") == tag) {
			elements[count++] = elts[i];
		}
	}
	return elements;
}
String.prototype.trim = function() {
	// 用正则表达式将前后空格
	// 用空字符串替代。  
	return this.replace(/(^\s*)|(\s*$)/g, "");
};

//结束
String.prototype.endWith = function(str) {
	if (str == null || str == "" || this.length == 0 || str.length > this.length)
		return false;
	if (this.substring(this.length - str.length) == str)
		return true;
	else
		return false;
	return true;
}
//起始
String.prototype.startWith = function(str) {
	if (str == null || str == "" || this.length == 0 || str.length > this.length)
		return false;
	if (this.substr(0, str.length) == str)
		return true;
	else
		return false;
	return true;
}


//复选框全选操作,obj为全选框对象，selname为复选框name
function SelectAllCheck(obj, selname) {
	var el = document.getElementsByName(selname);
	var len = el.length;
	if (obj.checked == true) {
		for (var i = 0; i < len; i++) {
			el[i].checked = true;
		}
	} else {
		for (var i = 0; i < len; i++) {
			el[i].checked = false;
		}
	}
}
//选中列表中的复选框对象后，更改全选框状态
//chkObj复选框对象，selname复选框名称
function doSelect(chkObj, selname) {
	var chkAll = document.getElementsByName("CheckAll")[0];
	if (chkAll.checked) {
		chkAll.checked = false;
		chkObj.checked = false;
	} else {
		if (chkObj.checked) {
			chkObj.checked = true;
		} else {
			chkObj.checked = false;
		}
		var el = document.getElementsByName(selname);
		var len = el.length;
		var temp = 0;
		for (var i = 0; i < len; i++) {
			if (el[i].checked == true) {
				temp = temp + 1;
			}
		}
		if (temp == len) {
			chkAll.checked = true;
		}
	}
}
//判断列表中是否有选中的复选框
function isCheck(checkName) {
	var el = document.getElementsByName(checkName);
	var len = el.length;
	var temp = 0;
	for (var i = 0; i < len; i++) {
		if (el[i].checked == true) {
			temp = temp + 1;
			break;
		}
	}
	if (temp == 0) {
		return false;
	}
	return true;
}
//清空页面值	
function ClearAllText() {
	$(":text").each(function() {
		$(this).val("");
	});

	$("select").each(function() {
		$(this).get(0).selectedIndex = 0; //index为索引值
	});


}
//复选框全选操作
function CheckAll(obj, chkname) {
	var el = document.getElementsByName(chkname);
	for (var i = 0; i < el.length; i++) {
		el[i].checked = obj.checked;
	}
}
//检查是否选择了项
function checkID(chkname) {
	var el = document.getElementsByName(chkname);
	for (var i = 0; i < el.length; i++) {
		if (el[i].checked) {
			return true;
		}
	}
	return false;
}
//组合复选框的选择的值用$分割
function getChkValue(chkname) {
	var el = document.getElementsByName(chkname);
	var cvalue = "";
	for (var i = 0; i < el.length; i++) {
		if (el[i].checked) {
			cvalue = cvalue + el[i].value + "$";
		}
	}
	if (cvalue != "") {
		cvalue = cvalue.substring(0, cvalue.length - 1)
	}
	return cvalue;
}



/**
 * 添加cookid
 */
function addCookie(objName, objValue, objHours) { //添加cookie
	if (typeof(objValue) == "undefined") {
		return;
	}
	var str = objName + "=" + escape(objValue);
	if (objHours !=0) { //为0时不设定过期时间，浏览器关闭时cookie自动消失
		var date = new Date();
		var ms = objHours * 3600 * 1000;
		date.setTime(date.getTime() + ms);
		str += "; expires=" + date.toGMTString()+"; path=/";
	}else{
		str+="; path=/";	
	}
	document.cookie = str;

}

//读取cookies 
//function getCookie(name) 
//{ 
//  var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
//  if(arr=document.cookie.match(reg))
//      return unescape(arr[2]); 
//  else 
//      return ''; 
//} 
//读取cookies 
function getCookie(cookieName) 
{ 
	var cookieValue = "";
	var posName = document.cookie.indexOf(escape(cookieName) + "=");
	if (posName != -1) {
		var posValue = posName + (escape(cookieName) + "=").length;
		var endPos = document.cookie.indexOf(";", posValue);
		if (endPos != -1) {
			cookieValue = unescape(document.cookie.substring(posValue, endPos));
		} else {
			cookieValue = unescape(document.cookie.substring(posValue));
		}
	}
	return (cookieValue);
} 

function delCookie(name) { //为了删除指定名称的cookie，可以将其过期时间设定为一个过去的时间
	addCookie(name,'',-1);
}







function popOpen(url) {
	//window.showdialog(url,'','resizable:yes;scroll:yes;status:no;dialogWidth=650px;dialogHeight=480px;center=yes;help=no');
	window.open(url, 'newwindow', 'height=600,width=800,top=0,left=0,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no')
// window.o(url,'','resizable:yes;scroll:yes;status:no;dialogWidth=650px;dialogHeight=480px;center=yes;help=no');
}
//关闭页面
function closeWindow() {
	window.opener = null;
	window.open("", "_self");
	window.close();
}

//打开窗口
function openWindowA(url) {
	var width = 520;
	var height = 440;
	var xposition = (screen.width - width) / 2;
	var yposition = (screen.height - height) / 2;
	window.open(url, "", "width=" + width + ",height=" + height + ",left="
		+ xposition + ",top=" + yposition);
}


function openwin(url) {
	var a = document.createElement("a");
	a.setAttribute("href", url);
	a.setAttribute("target", "_blank");
	a.setAttribute("id", "openwin");
	document.body.appendChild(a);
	a.click();
}

/**
 * 弹出iframe新窗体
 */
var g_flush=false;
function layerOpenPage(url,title,width,heght){
	var layer=top.layer?top.layer:layui.layer;
	if(typeof(g_flush)!="undefined")g_flush=false;
	if(typeof(top.top_g_flush)!="undefined")top.top_g_flush=false;  
	layer.open({
		type:2,
		title:title,
		content:url,
		area:[width+'px',heght+'px'],
		end: function(){ 
		   if(top.top_g_flush || g_flush){
			   document.forms[0].submit();//关闭后刷新
		   }
		}
	});
}

/**
 * 关闭弹出窗体（iframe模式）
 * info:提示信息
 * bl：关闭时是否刷新父页面
 * lay：制定lay层，默认为top层的layer
 */
function closeLayerpage(info,bl,lay){
  var layer=lay?lay:top.layer;
  var index=layer.getFrameIndex(window.name); //先得到当前iframe层的索引
  if(bl){
	 if(typeof(g_flush)!="undefined")g_flush=bl;
	 if(typeof(top.top_g_flush)!="undefined")top.top_g_flush=bl;  
  }
  layer.close(index); 
  if(info){
	  layer.msg(info);
  }
}



//显示或隐藏审批div(此方法不建议使用，请通过showspdiv和hidespdiv进行替换)
function showOrhidespdiv(){
	if($("#mysp").is(":hidden")){
		showspdiv();
	}else{
		hidespdiv();
	}
}


//显示审批div
var trparm = new Array();
function showspdiv(parm){
	if($("#mysp").is(":hidden")){
		trparm = new Array();
		var t=$("#mysp").height();
		var h = document.documentElement.clientHeight || document.body.clientHeight;
		$("#mysp").animate({top:((h-t)/2)+"px"},300).show();		
		$(document.body).css({"overflow-y":"hidden"});
		$('#mybIframe').css("height","100%");
		$("#mybIframe").css("opacity","0.5");
		$("#mybIframe").css("z-index",140);
		
		$(".exptd").each(function(){
			trparm.push(this.id.replace('-exp',''));
			$(this).html($('#'+trparm[trparm.length-1]).html());
			$('#'+trparm[trparm.length-1]).html('');
		});
	}
}

/**
*隐藏审批div，并进行提醒
*msg:关闭审批div时，提醒信息(可为空)
*id:关闭审批div时，在制定控件旁提醒信息(msg不为空前提有效)
*alter：使用window.alert提醒信息(msg不为空前提有效)
**/
function hidespdiv(msg,id,alter){
	if(id && id.trim()!="" ){
		for(var i=0;i<trparm.length;i++){
			if(id.indexOf(trparm[i].replace('td-',''))>-1){
				layerTips(msg,id);
				return;
			}
		}
	}
	
	if(!$("#mysp").is(":hidden")){
		$("#mysp").animate({top:"-1000px"},500,function(){$("#mysp").hide()});
		$(document.body).css({"overflow-y":"auto"});
		$('#mybIframe').css("height","90px");
		$("#mybIframe").css("opacity","0");
		$("#mybIframe").css("z-index",110);
		for(var i=0;i<trparm.length;i++){
			$('#'+trparm[i]).html($('#'+trparm[i]+'-exp').html());
			$('#'+trparm[i]+'-exp').html('');
		}
	}
	if(alter){
		if (msg && msg.trim()!="" ){
			alert(msg);
			if(id && id.trim()!="" ){
				$('#'+id).focus();
			}
		}
	}else{
		layerTips(msg,id);
	}

}

//获取滚动条宽度
function getScrollWidth() {  
	  var noScroll, scroll, oDiv = document.createElement("DIV");  
	  oDiv.style.cssText = "position:absolute; top:-1000px; width:100px; height:100px; overflow:hidden;";  
	  noScroll = document.body.appendChild(oDiv).clientWidth;  
	  oDiv.style.overflowY = "scroll";  
	  scroll = oDiv.clientWidth;  
	  document.body.removeChild(oDiv);  
	  return noScroll-scroll;  
}

//禁止页面滚动条
function unScroll() {
    var top = $(document).scrollTop();
    $(document).on('scroll.unable',function (e) {
        $(document).scrollTop(top);
    })
}
//允许页面滚动条
function removeUnScroll() {
    $(document).unbind("scroll.unable");
}

/**
 * 弹出div新窗体
 */
var layindex;
function showLayerdiv(id,t,w,h){
	w=w?w:'850';
	h=h?h:'500';
	var layer=top.layer?top.layer:layui.layer;
	layindex=layer.open({
		type:1,
		title:t,
		content:$('#'+id),
		area:[w+'px',h+'px'],
		anim: 2
	});
}
/*
 * 关闭弹出div层
 */
function closeLayerdiv(info){
  var layer=top.layer;
  layer.close(layindex);
  if(info){
	  layer.msg(info);
  }
}


/**
 *tip提醒 
 *
 *@msg 提醒内容
 *@id  控件id
 */
function layerTips(msg,id){
	if (typeof (msg) != "undefined" && msg.trim()!="" ){
		var layer=top.layer?top.layer:layui.layer;
		if(typeof (id) != "undefined" && id.trim()!="" ){
			layer.tips(msg,'#'+id,{time:2000,tips:4});	
			$('#'+id).focus();
			$('#'+id).addClass('layui-form-danger');
		}else{
			layer.msg(msg,{time: 2000});
		}
	}
}

function layerTips2(layer,msg,id){
	if (typeof (msg) != "undefined" && msg.trim()!="" ){
		layer.tips(msg,'#'+id,{time:2000,tips:4});	
		$('#'+id).focus();
		$('#'+id).addClass('layui-form-danger');
	}
}
/**
 *信息提醒（不需要用户点击关闭） 
 *
 *@msg 提醒内容
 */
function layerMsg(msg){
	if (typeof (msg) != "undefined" && msg.trim()!="" ){
		var layer=top.layer?top.layer:layui.layer;
		layer.msg(msg,{time: 2000});	
	}
}

/**
 * alert
 */
function layerAlert(msg){
	if (typeof (msg) != "undefined" && msg.trim()!="" ){
		var layer=top.layer?top.layer:layui.layer;
		layer.alert(msg);	
	}
}

/**
 * 创建信息导航div
 */
var g_infObjList
function createinfoadiv(bl){
	if(!bl){
		$(document).ready(function(){
			$(window).resize(function () {//当浏览器大小变化时
				createinfoadiv(true);//重汇
			});
			
			$(document).scroll(function() {
				changeInfo($(document).scrollTop());
			});
			
		});
	}
	
	var bodyh=$("body,html");
	var toptool=$("body,html").find(".nu-top").children(".nu-base-div");
	var leftb=(bodyh.width()-toptool.width())/2;
	if(leftb<140){
		return;
	}
	g_infObjList= $("body,html").find(".ltitle");
	var infoadiv=document.getElementById('infoadiv');
	if(!infoadiv){
		infoadiv=document.createElement("div");
		infoadiv.id= "infoadiv";
		infoadiv.className  = "nu-adiv";
		var html='<div class="v1"></div>';
		for(var i=0;i<g_infObjList.length;i++){
			if(i==0){
				html+='<div class="sdiv">';
				html+='<div id="ladiv_'+i+'" onclick="changeadivbyIndex(this,'+i+')" ><a href="javascript:;" >'+$(g_infObjList[i]).html()+'</a></div>';
				html+='</div>';
			}else{
				html+='<div class="cdiv">';
				html+='<div id="ladiv_'+i+'" onclick="changeadivbyIndex(this,'+i+')" ><a href="javascript:;" >'+$(g_infObjList[i]).html()+'</a></div>';
				html+='</div>';
			}
			
			if(g_infObjList.length-1>i){
				html+='<div class="v2"></div>';
			}
		}
		html+='<div class="v1"></div>';
		infoadiv.innerHTML   = html;
		
	}

	//动态计算
	//infoadiv.style.left=(toptool.offset().left+toptool.width()+60)+'px';
	//infoadiv.style.top='120px';
	
	
	var l=bodyh.width()-110;
	if((leftb-60)<110)l=bodyh.width()-(leftb-60);
	infoadiv.style.left=l+'px';
	infoadiv.style.top='180px';
	document.body.appendChild(infoadiv);


}


function changeInfo(toppx){
	var n=g_infObjList.length-1;
	while(n>=0){
		if($(g_infObjList[n]).offset().top<=(toppx+180)){
			 $("#infoadiv").children(".sdiv").removeClass("sdiv").addClass("cdiv");
			 $('#ladiv_'+n).parent().removeClass("cdiv").addClass("sdiv");
			 break;
		}
		n--;
	}
}



//点击右侧导航
function changeadivbyIndex(obj,i){
	 $(document).off("scroll");//
	 $("#infoadiv").children(".sdiv").removeClass("sdiv").addClass("cdiv");
	 $(obj).parent().removeClass("cdiv").addClass("sdiv");
	 scrollToLocation($(g_infObjList[i]));
}

//滚动到制定元素位置
function scrollToLocation(obj) {
  var mainContainer= $("body,html");
  var scrollToContainer =obj;//滚动到指定div
  //动画效果
  mainContainer.animate({scrollTop:mainContainer.scrollTop()+scrollToContainer.offset().top-mainContainer.scrollTop()-100}, 500,function(){
	$(document).scroll(function() {
		changeInfo($(document).scrollTop());
	});
  });//滑动到指定位置

}


//显示审批div
function spheaddiv(bl){
	if(bl){
		if($("#mybIframe").is(":hidden")){
			//$("#sppagehead").show();
			$("#mybIframe").show();
			$("#sppagehead").animate({top:"0px"},100);
			$("#mybIframe").animate({top:"0px"},100);
		}
	}else{
		if(!$("#mybIframe").is(":hidden")){
			//$("#sppagehead").hide();
			$("#mybIframe").hide();
			$("#mybIframe").animate({top:"-100px"},100);
			$("#sppagehead").animate({top:"-100px"},100);
		}
	}
}

/**
 * 判断页面元素是否存在且未隐藏
 * objid：元素id
 * cheval：是否判断元素值为空，默认为不判断
 * 返回false：元素不存在或隐藏或元素值不为空
 */
function checkelem(objid,cheval){
	if($('#'+objid).length>0 && $('#'+objid).is(':visible')){
		if(cheval){
			if(''!=$.trim($('#'+objid).val()))return false;
			else return true;
		}
		return true;
	}
	return false;
}


/**
 * 验证控件输入
 * @param {Object} objid 控件id（验证类型为radio时，输入控件name）
 * @param {Object} objtype 控件类型(text,select,radio)
 * @param {Object} warnInfo
 * @return {TypeName} 
 */
function formcheck(objid,objtype,warnInfo){
	var temp="";
	if(objtype=='text'){
		if(typeof($("#"+objid).val())!='undefined' && $("#"+objid).val().trim() ==''){	
		   bindDanger("#"+objid);
		   temp="#"+objid;
	    }
	}else if(objtype=='select'){
		if (typeof($("#"+objid).val())!='undefined' && $("#"+objid)[0].selectedIndex <=0 ){
			bindDanger("#"+objid);
			temp="#"+objid;
		}
	}else if(objtype=='radio'){
		var sel = $(":radio[name="+objid+"][checked]").val();
		if (sel == undefined) {
			bindDanger(":radio[name="+objid+"]");
			temp=":radio[name="+objid+"]";
		}
	}else if(objtype=='checkbox'){
		var sel = $(":checkbox[name="+objid+"][checked]").val();
		if (sel == undefined) {
			bindDanger(":checkbox[name="+objid+"]");
			temp=":checkbox[name="+objid+"]";
		}
	}else if(objtype=='wordnum'){
		var sel = $("#"+objid).val().length;
		if(sel>=2000){
			temp="#"+objid;
		}
	}
	if(temp != ""){
		//$(temp).focus();
		return warnInfo;
	}
	return "";
}	  
	  
function bindDanger(obj) {
	$(obj).css("border-color","red");
	//$(obj).bind({change:function(e){alert(1);$(this).css("border-color","black"); $(this).unbind(e);},input:function(e){alert(2);$(this).css("border-color","black"); $(this).unbind(e);}});
}

/**
 * 上传文件或更新文件,同时关联文件表
 * @id 控件id
 * @modcode 模块code
 * @appid 表单外键（根据文件时可为空）
 * @userName 上传人
 * @userID 上传人id
 * @callfun 回调函数
 * @filepath 文件路径（文件路径不为空时，为更新文件操作。为空时上传新文件）
 * @status 上传环节（可以为空）
 * @fileclass 文件类型（可以为空）
 */
function uploadfilebylayui(id,modcode,appid,userName,userID,callfun,filepath,status,fileclass){
	var upload = layui.upload;
	status=status||'--';
	fileclass=fileclass||'普通文件';
	if(filepath){
		//更新文件
		var uploadInst = upload.render({
			  elem: '#'+id //绑定元素
			  ,field:'upFile'
			  ,url: 'cmuc2/fileup.jsp' //上传接口
			  ,accept:'file'//文件限制类型，可选值有：images（图片）、file（所有文件）、video（视频）、audio（音频）	  
			  ,data: {dotype:'updatefile',userName:userName,userID:userID,filepath:filepath,modcode:modcode}
			  ,done: function(res){
			    //上传完毕回调
				  callfun(res)
			  }
			  ,error: function(){
			    //请求异常回调
			  }
		});
	}else{
		//上传文件
		var uploadInst = upload.render({
			  elem: '#'+id //绑定元素
			  ,field:'upFile'
			  ,url: 'cmuc2/fileup.jsp' //上传接口
			  ,accept:'file'//文件限制类型，可选值有：images（图片）、file（所有文件）、video（视频）、audio（音频）		  
			  ,data: {dotype:'uploadfile',applyId:appid,userName:userName,userID:userID,status:status,fileclass:fileclass,modcode:modcode}
			  ,done: function(res){
			    //上传完毕回调
				  callfun(res)
			  }
			  ,error: function(){
			    //请求异常回调
			  }
		});	
	}
}
/**
 * 上传文件或更新文件，返回文件路径（不关联文件表）
 * @id 控件id
 * @modcode 模块code
 * @filepath 文件路径（文件路径不为空时，为更新文件操作。为空时上传新文件）
 * @callfun 回调函数，为空时直接返回文件路径
 */
function uploadbylayuiSimple(id,modcode,filepath,callfun){
	var upload = layui.upload;
	filepath=filepath||'';
	//更新文件
	var uploadInst = upload.render({
		  elem: '#'+id //绑定元素
		  ,field:'upFile'
		  ,url: 'cmuc2/fileup.jsp' //上传接口
		  ,accept:'file'//文件限制类型，可选值有：images（图片）、file（所有文件）、video（视频）、audio（音频）	  
		  ,data: {dotype:'upsimple',filepath:filepath,modcode:modcode}
		  ,done: function(data){
		    //上传完毕回调
			  if(callfun){
				  callfun(data.filepath);
			  }else{
				  return data.filepath;
			  }
		  }
		  ,error: function(){
		    //请求异常回调
			  return '';
		  }
	});
}


function checkVal(objid,objtype,warnInfo){
	var temp="";
	if(objtype=='text'){
		if(typeof($("#"+objid).val())!='undefined' && $("#"+objid).val().trim() ==''){	
		   temp="#"+objid;
	    }
	}else if(objtype=='select'){
		if (typeof($("#"+objid).val())!='undefined' && $("#"+objid)[0].selectedIndex <=0 ){
			temp="#"+objid;
		}
	}else if(objtype=='radio'){
		var sel = $("input[name='"+objid+"']:checked").val();
		if (sel == undefined) {
			temp="input[name='"+objid+"']";
		}
	}else if(objtype=='checkbox'){
		var sel = $(":checkbox[name="+objid+"][checked]").val();
		if (sel == undefined) {
			temp=":checkbox[name="+objid+"]";
		}
	}else if(objtype=='wordnum'){
		var sel = $("#"+objid).val().length;
		if(sel>=2000){
			temp="#"+objid;
		}
	}
	if(temp != ""){
		//$(temp).focus();
		return warnInfo;
	}
	return "";
}	




(function($){
//限制文本框只能输入数字，并屏蔽输入法和粘贴  
$.fn.numeral = function() {     
     $(this).css("ime-mode", "disabled");     
     this.bind("keypress",function(e) {     
     var code = (e.keyCode ? e.keyCode : e.which);  //兼容火狐 IE      
     if (code >= 48 && code <= 57) {
	     	return true;
	 	}
     return false; 
     });     
     this.bind("blur", function() {     
         if (this.value.lastIndexOf(".") == (this.value.length - 1)) {     
             this.value = this.value.substr(0, this.value.length - 1);     
         } else if (isNaN(this.value)) {     
             this.value = "";     
         }     
     });     
     this.bind("paste", function() {     
         var s = clipboardData.getData('text');     
         if (!/\D/.test(s));     
         value = s.replace(/^0*/, '');     
         return false;     
     });     
     this.bind("dragenter", function() {     
         return false;     
     });     
     this.bind("keyup", function() {     
     if (/(^0+)/.test(this.value)) {     
         this.value = this.value.replace(/^0*/, '');     
         }     
     });     
 };
//输入小数(包括整数)，保留两位小数
$.fn.decimalinput = function(num) {
  $(this).css("ime-mode", "disabled");
  this.bind("keypress", function(e) {
      if (e.charCode === 0) return true;  //非字符键 for firefox
      var code = (e.keyCode ? e.keyCode : e.which);  //兼容火狐 IE
      if (code >= 48 && code <= 57) {
          var pos = getCurPosition(this);
          var selText = getSelectedText(this);
          var dotPos = this.value.indexOf(".");
          if (dotPos > 0 && pos > dotPos) {
              if (pos > dotPos + 2) return false;
              if (selText.length > 0 || this.value.substr(dotPos + 1).length < 2)
                  return true;
              else
                  return false;
          }
          return true;
      }
      //输入"."
      if (code == 46) {
          var selText = getSelectedText(this);
          if (selText.indexOf(".") > 0) return true; //选中文本包含"."
          else if (/^[0-9]+\.$/.test(this.value + String.fromCharCode(code)))
              return true;
      }
      return false;
  });
  this.bind("blur", function() {
      if (this.value.lastIndexOf(".") == (this.value.length - 1)) {
          this.value = this.value.substr(0, this.value.length - 1);
      } else if (isNaN(this.value)) {
          this.value = "";
      }
      if (this.value && num){
    	  this.value = parseFloat(this.value).toFixed(num);
      }else if(this.value){
    	  this.value = parseFloat(this.value).toFixed(2);
      }
      $(this).trigger("input");
  });
  this.bind("paste", function() {
      if (window.clipboardData) {
          var s = clipboardData.getData('text');
          if (!isNaN(s)) {
              value = parseFloat(s);
              return true;
          }
      }
      return false;
  });
  this.bind("dragenter", function() {
      return false;
  });
  this.bind("keyup", function() {
  });
  this.bind("propertychange", function(e) {
      if (isNaN(this.value))
          this.value = this.value.replace(/[^0-9\.]/g, "");
  });
  this.bind("input", function(e) {
      if (isNaN(this.value))
          this.value = this.value.replace(/[^0-9\.]/g, "");
  });
};
})(jQuery);


//获取当前光标在文本框的位置  
function getCurPosition(domObj) {  
  var position = 0;  
  if (domObj.selectionStart || domObj.selectionStart == '0') {  
      position = domObj.selectionStart;  
  }  
  else if (document.selection) { //for IE  
      domObj.focus();  
      var currentRange = document.selection.createRange();  
      var workRange = currentRange.duplicate();  
      domObj.select();  
      var allRange = document.selection.createRange();  
      while (workRange.compareEndPoints("StartToStart", allRange) > 0) {  
          workRange.moveStart("character", -1);  
          position++;  
      }  
      currentRange.select();  
  }  

  return position;  
}  
//获取当前文本框选中的文本  
function getSelectedText(domObj) {  
  if (domObj.selectionStart || domObj.selectionStart == '0') {  
      return domObj.value.substring(domObj.selectionStart, domObj.selectionEnd);  
  }  
  else if (document.selection) { //for IE  
      domObj.focus();  
      var sel = document.selection.createRange();  
      return sel.text;  
  }  
  else return '';  
}  