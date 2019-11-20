
/**
 * 弹出新窗体
 */
var conlayer
function ucshowbylayer(url){
	conlayer = conlayer?conlayer:layui.layer;;
	var layerinf = conlayer.open({
		type:2,
		title:'人员及机构选择',
		content:url,
		area:['600px','530px']
	});
}


function ucshowlogs(obj,id)
{
    if(obj.value=='隐藏流程信息'){
    	$('#logstable_'+id).slideUp(300);
    	obj.value='展开流程信息';		
    }else{
    	$('#logstable_'+id).slideDown(300);
    	obj.value='隐藏流程信息';
    }
    
	//alert($("#logstable_pall").height());
	//$("html,body").animate({"scrollTop":$("#logstable_pall").offset().top},300);  
}

function scrollToEnd(){//滚动到底部
    var h = $(document).height()-$(window).height();
    $(document).scrollTop(h); 
}

function ucshowPro(url,proId)
{
	conlayer = conlayer?conlayer:layui.layer;
	if(proId==0){
		layerAlert('流程未启动！');
	}else{
		var layerinf = conlayer.open({
			type:2,
			title:'流程图',
			content:url+'/cmuc2/showIframe.jsp?zoom=1&processInstID='+proId,
			area:['850px','600px']
		});
	}
	
}


/**常用意见处理方法**/
function addcomoption(optxtid){
	var modcode=$('#hidn_modecode').val();
	var userid=$('#hidn_userid').val();
	var comopinion=$.trim($('#'+optxtid).val());
	if(comopinion==''){
		layerAlert('意见为空！');
	}else{
		$.ajax({
			url : 'cmuc2/comoption.jsp',
			type : 'POST',
			data : {dotype:'add',comopinion:comopinion,modcode:modcode,userid:userid},
			dataType : "text",
			error : function() {},
			success : function(rel) {
				if(rel!=0){
					var str=comopinion.length>13?comopinion.substring(0,13)+'...':comopinion;
					var html="<li title='"+comopinion+"' onclick='setoption(this,\""+optxtid+"\")' id='li_"+rel+"' >"+str+"</li>";
					$('#comop_ul').html(html+ $('#comop_ul').html());
				}	 
			}
		})
	}
}


function showcomoptinon(optxtid,modcode,userid){
	conlayer = conlayer?conlayer:layui.layer;;
	if(typeof(g_flush)!="undefined")g_flush=false;
	var layerinf = conlayer.open({
		type:2,
		title:'常用意见',
		content:'cmuc2/comoption.jsp?modcode='+modcode+'&userid='+userid,
		area:['600px','530px'],
		end: function(){ 
		   if(g_flush){
			   loadcomoption(optxtid);
		   }
		}
	});
}

function loadcomoption(optxtid){
	var modcode=$('#hidn_modecode').val();
	var userid=$('#hidn_userid').val();
	$.ajax({
		url : 'cmuc2/comoption.jsp',
		type : 'POST',
		data : {dotype:'select',modcode:modcode,userid:userid},
		dataType : "json",
		error : function() {},
		success : function(rel) {	
			var html='';
			for(var i=0,j=rel.length;i<j;i++){
				var str=rel[i].comopinion.length>13?rel[i].comopinion.substring(0,13)+'...':rel[i].comopinion;
				html+='<li title="'+rel[i].comopinion+'" onclick="setoption(this,\''+optxtid+'\')" id="li_'+rel[i].id+'" >'+str+'</li>';
			}
			$('#comop_ul').html(html);
		}
	})
}

function setoption(obj,optxtid,cookname){
	$('#'+optxtid).val(obj.title);
	$(obj).parent('ul').children('li').removeClass('selli');
	$(obj).attr('class', 'selli');
	if(cookname){
		saveOption($('#'+optxtid)[0],cookname);
	}
}

function saveOption(obj,cookname){
	try{
		if($.trim(obj.value)!=''){
			addCookie(cookname,$.trim(obj.value),1);
		}else{
			addCookie(cookname,'',0);
		}
	}catch(err){
		
	}	
}
function initOption(cookname,txtid){
	try{
		$("#"+txtid).val(getCookie(cookname));
	}catch(err){
		
	}
}
