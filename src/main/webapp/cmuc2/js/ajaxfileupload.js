
jQuery.extend({
    createUploadIframe: function(id, uri)
	{
			//create frame
            var frameId = 'jUploadFrame' + id;
            var iframeHtml = '<iframe id="' + frameId + '" name="' + frameId + '" style="position:absolute; top:-9999px; left:-9999px"';
			if(window.ActiveXObject)
			{
                if(typeof uri== 'boolean'){
					iframeHtml += ' src="' + 'javascript:false' + '"';

                }
                else if(typeof uri== 'string'){
					iframeHtml += ' src="' + uri + '"';

                }	
			}
			iframeHtml += ' />';
			jQuery(iframeHtml).appendTo(document.body);

            return jQuery('#' + frameId).get(0);			
    },
    createUploadForm: function(id, fileElementId, data)
	{
		//create form	
		var formId = 'jUploadForm' + id;
		var fileId = 'jUploadFile' + id;
		var form = jQuery('<form  action="" method="POST" name="' + formId + '" id="' + formId + '" enctype="multipart/form-data"></form>');	
		if(data)
		{
			for(var i in data)
			{
				jQuery('<input type="hidden" name="' + i + '" value="' + data[i] + '" />').appendTo(form);
			}			
		}		
		var oldElement = jQuery('#' + fileElementId);
		var newElement = jQuery(oldElement).clone();
		jQuery(oldElement).attr('id', fileId);
		jQuery(oldElement).before(newElement);
		jQuery(oldElement).appendTo(form);


		
		//set attributes
		jQuery(form).css('position', 'absolute');
		jQuery(form).css('top', '-1200px');
		jQuery(form).css('left', '-1200px');
		jQuery(form).appendTo('body');		
		return form;
    },

    ajaxFileUpload: function(s) {
        // TODO introduce global settings, allowing the client to modify them for all requests, not only timeout		
        s = jQuery.extend({}, jQuery.ajaxSettings, s);
        var id = new Date().getTime()        
		var form = jQuery.createUploadForm(id, s.fileElementId, (typeof(s.data)=='undefined'?false:s.data));
		var io = jQuery.createUploadIframe(id, s.secureuri);
		var frameId = 'jUploadFrame' + id;
		var formId = 'jUploadForm' + id;		
        // Watch for a new set of requests
        if ( s.global && ! jQuery.active++ )
		{
			jQuery.event.trigger( "ajaxStart" );
		}            
        var requestDone = false;
        // Create the request object
        var xml = {}   
        if ( s.global )
            jQuery.event.trigger("ajaxSend", [xml, s]);
        // Wait for a response to come back
        var uploadCallback = function(isTimeout)
		{			
			var io = document.getElementById(frameId);
            try 
			{				
				if(io.contentWindow)
				{
					 xml.responseText = io.contentWindow.document.body?io.contentWindow.document.body.innerHTML:null;
                	 xml.responseXML = io.contentWindow.document.XMLDocument?io.contentWindow.document.XMLDocument:io.contentWindow.document;
					 
				}else if(io.contentDocument)
				{
					 xml.responseText = io.contentDocument.document.body?io.contentDocument.document.body.innerHTML:null;
                	xml.responseXML = io.contentDocument.document.XMLDocument?io.contentDocument.document.XMLDocument:io.contentDocument.document;
				}						
            }catch(e)
			{
				jQuery.handleError(s, xml, null, e);
			}
            if ( xml || isTimeout == "timeout") 
			{				
                requestDone = true;
                var status;
                try {
                    status = isTimeout != "timeout" ? "success" : "error";
                    // Make sure that the request was successful or notmodified
                    if ( status != "error" )
					{
                        // process the data (runs the xml through httpData regardless of callback)
                        var data = jQuery.uploadHttpData( xml, s.dataType );    
                        // If a local callback was specified, fire it and pass it the data
                        if ( s.success )
                            s.success( data, status );
    
                        // Fire the global callback
                        if( s.global )
                            jQuery.event.trigger( "ajaxSuccess", [xml, s] );
                    } else
                        jQuery.handleError(s, xml, status);
                } catch(e) 
				{
                    status = "error";
                    jQuery.handleError(s, xml, status, e);
                }

                // The request was completed
                if( s.global )
                    jQuery.event.trigger( "ajaxComplete", [xml, s] );

                // Handle the global AJAX counter
                if ( s.global && ! --jQuery.active )
                    jQuery.event.trigger( "ajaxStop" );

                // Process result
                if ( s.complete )
                    s.complete(xml, status);

                jQuery(io).unbind()

                setTimeout(function()
									{	try 
										{
											jQuery(io).remove();
											jQuery(form).remove();	
											
										} catch(e) 
										{
											jQuery.handleError(s, xml, null, e);
										}									

									}, 100)

                xml = null

            }
        }
        // Timeout checker
        if ( s.timeout > 0 ) 
		{
            setTimeout(function(){
                // Check to see if the request is still happening
                if( !requestDone ) uploadCallback( "timeout" );
            }, s.timeout);
        }
        try 
		{

			var form = jQuery('#' + formId);
			jQuery(form).attr('action', s.url);
			jQuery(form).attr('method', 'POST');
			jQuery(form).attr('target', frameId);
            if(form.encoding)
			{
				jQuery(form).attr('encoding', 'multipart/form-data');      			
            }
            else
			{	
				jQuery(form).attr('enctype', 'multipart/form-data');			
            }			
            jQuery(form).submit();

        } catch(e) 
		{			
            jQuery.handleError(s, xml, null, e);
        }
		
		jQuery('#' + frameId).load(uploadCallback	);
        return {abort: function () {}};	

    },

    uploadHttpData: function( r, type ) {
        var data = !type;
        data = type == "xml" || data ? r.responseXML : r.responseText;
        // If the type is "script", eval it in global context
        if ( type == "script" )
            jQuery.globalEval( data );
        // Get the JavaScript object, if JSON is used.
        if ( type == "json" )
            eval( "data = " + data );
        // evaluate scripts within html
        if ( type == "html" )
            jQuery("<div>").html(data).evalScripts();

        return data;
    }
})







/**
 * 通过flash插件模块实现附件上传
 * @param {Object} path 网站路径
 * @param {Object} modcode 模块编号
 * @param {Object} applyid 表单ID
 * @param {Object} userID 用户ID
 * @param {Object} userName 用户名称
 * @param {Object} status 上传环节
 * @param {Object} showclass 是否显示附件类型
 * @param {Object} showstatus 是否显示上传状态
 */
function initUpControl(path,modcode,applyid,userID,userName,status,showclass,showstatus,accept)
{
	 $('#upFile').uploadify({
	    	'debug':false,//是否进入调试模式
	    	'uploader' : path+'cmuc2/fileup.jsp',//服务器端脚本文件路径
	    	'fileObjName':'upFile',//文件对象名称。用于在服务器端获取文件
	    	//'buttonImg': path+'cmuc2/uploadify/browseBtn.png',
	    	'auto'     : true,//表示在选择文件后是否自动上传
	    	'removeTimeout' : 0,//表示上传完成后多久删除队列中的进度条，默认为3，即3秒。
	        'swf'      : 'cmuc2/uploadify/uploadify.swf',//swf文件路径
	        'formData':{'dotype':'uploadfile','modcode':modcode,'applyId':applyid,'userID':userID,'userName':userName,'status':status,'fileclass':'普通附件'},
	        'method'   : 'post',//默认是’post’,也可以设置为’get’
			'buttonText' : '上传附件',//按钮上显示的文字，默认”SELECTFILES”
	        'multi'    : true,//是否支持多文件上传，默认为true
	        'uploadLimit' : 999,//最多上传文件数量，默认999（上传成功的数量限制）
	        'queueSizeLimit' :5,//队列长度限制，缺省值999（这里是指你一次能上传多少个）
	        'fileTypeDesc' :accept,//如果配置了以下的'fileExt'属性，那么这个属性是必须的 
	        'fileTypeExts':accept,
	        'sizeLimit'      : 19871202, //设置单个文件大小限制 
	        'buttonClass' : 'upbtn',  
	        'fileSizeLimit' : '50MB',//上传文件大小限制，默认单位是KB，若需要限制大小在100KB以内， 可设置该属性为：’100KB’
	        'width':98, 
	        'height':28, 
	      	//检测FLASH失败调用
	        'onFallback':function(){//没有兼容的FLASH时触发
	            alert("您未安装FLASH控件，无法上传！请安装FLASH控件后再试。");
	        },
	        'onUploadSuccess' : function(file, text, response) {//在每一个文件上传成功后触发
				var data=$.parseJSON(text)
				if(data.suss=='0'){
					alert(data.info);
				}else{
					var html='<tr name=\"atttrname\"  id=\"'+ data.attid+ '_file_tr\" >';
					if(showclass=='true'){					
						html+='<td>'+data.atttype+ '</td>';
					}
					html+='<td><input name=\"hide_attname\" type=\"hidden\" value=\"'+ data.attname+ '\"><a href=\"javascript:downloadFile(\''+ data.attid+ '\',\''+modcode+'\')\">'+ data.attname+ '</a></td>';
					if(showstatus=='true'){
						html+='<td>'+data.status+ '</td>';
					}
					html+='<td>'+ data.upusername+'</td>';
					html+='<td>'+ data.uptime+'</td>';
					html+='<td><a class="uc-downa" href="javascript:downloadFile(\''+ data.attid+ '\',\''+modcode+'\')\"><img src="cmuc2/img/downimg.png">&nbsp;下载</a>';
					html+='<a class="uc-dela" href="javascript:deleteFile(\''+ data.attid+ '\',\''+ data.attname + '\',\''+modcode+'\')"><img src="cmuc2/img/delimg.png">&nbsp;删除</a></td></tr>';
					$('#file_table'+applyid).append(html);
				}				
	        },
	        'onUploadError' : function(file, errorCode, errorMsg, errorString) {},//上传失败时执行
	        'onQueueComplete' : function(queueData) {},//在队列中的文件上传完成后触发
	        'onDialogOpen':function(){setparm(showclass)}//打开文件选择窗体时
	    });

}

function setparm(showclass){
	if(showclass=='true' && typeof($('#file_classlist')[0])!='undefined' && $('#file_classlist').val()!='' ){
	   //动态传值
	   $("#upFile").uploadify('settings','formData', {'fileclass':$('#file_classlist').val()});
	}
}

//点击按钮操作
function upSumbit(modecode,applyid,userName,userID,status){

	//动态传值
	$("#upFile").uploadify('settings','formData', {'modecode':modecode,'status':status,'applyId':applyid,'userName':userName,'userID':userID});
	//上传
	$("#upFile").uploadify('upload','*'); 
}


/**
*
*/
function upfilebylayui(upload,modcode,appid,userName,userID,status,showclass,showstatus,accept){
	var uploadInst = upload.render({
	  elem: '#upfilebtn' //绑定元素
	  ,field:'upFile'
	  ,url: 'cmuc2/fileup.jsp' //上传接口
	  ,size:'20480' //20m
	  ,multiple:true	  
	  ,choose:function(obj){layui.layer.load(); }	//上传loading timerint=setInterval("mytimer('正在上传，请稍候')",1000);  
	  ,accept:accept//文件限制类型，可选值有：images（图片）、file（所有文件）、video（视频）、audio（音频）	  
	  ,data: {dotype:'uploadfile',applyId:appid,userName:userName,userID:userID,modcode:modcode,status:status,fileclass:function(){var t=$('#file_classlist').val(); if(t){return t;}else{return ''};}}
	  ,done: function(data){
	     //上传完毕回调
		  layui.layer.closeAll('loading'); 
		 // window.clearInterval(timerint);
		 // $('#upFile-queue').html('');
		  if(data.suss=='0'){
			  alert(data.info);
		  }else{
				var html='<tr name=\"atttrname\"  id=\"'+ data.attid+ '_file_tr\" >';
				if(showclass=='true'){					
					html+='<td>'+data.atttype+ '</td>';
				}
				
				html+='<td><input name=\"hide_attname\" type=\"hidden\" value=\"'+ data.attname+ '\"><a href=\"javascript:downloadFile(\''+ data.attid+ '\',\''+modcode+'\')\">'+ data.attname+ '</a></td>';
				if(showstatus=='true'){
					html+='<td>'+data.status+ '</td>';
				}
				html+='<td>'+ data.upusername+'</td>';
				html+='<td>'+ data.uptime+'</td>';
				html+='<td><a class="uc-downa" href="javascript:downloadFile(\''+ data.attid+ '\',\''+modcode+'\')\"><img src="cmuc2/img/downimg.png">&nbsp;下载</a>';
				html+='<a class="uc-dela" href="javascript:deleteFile(\''+ data.attid+ '\',\''+ data.attname + '\',\''+modcode+'\')"><img src="cmuc2/img/delimg.png">&nbsp;删除</a></td></tr>';
				$('#file_table'+appid).append(html);
		  }		  
	  }
	  ,error: function(){
	    //请求异常回调
		  layui.layer.closeAll('loading'); 
		  //window.clearInterval(timerint);
		  //$('#upFile-queue').html('');
		  //conlayer = conlayer==null?layui.layer:conlayer;
		  //conlayer.msg('上传失败',{time: 2000});
	  }
	});
}


function pldown(tabid,modcode){
	//从列表重新获取附件id信息
	layui.layer.confirm('确认批量下载附件？', function(index){
		layui.layer.close(index);
		var trobj=$('#'+tabid+' tbody tr');
		var attids='';
		for(var i=0,j=trobj.length;i<j;i++){
			var idstr=trobj[i].id+'';
			attids+=idstr.substring(0,idstr.indexOf('_'));
			if(i<j-1)attids+=',';
		}
		if(attids==''){return;}
		layui.layer.load(); 
		try{
			$.ajaxFileUpload({
				url : 'cmuc2/fileup.jsp', //需要链接到服务器地址
				type : "post",
				secureuri : false,
				data : {dotype:'pldownload',attids:attids,modcode:modcode},
				dataType : 'test', //服务器返回的格式，可以是json
				error:function(er){},
				success :function(data){}
			});	
		}catch(ex){
			
		}
		getdownstatu(attids);
	});
}

var i=1;
var timerint;
function mytimer(txt){
	var s=i%3==0?'...':i%3==1?'.':'..';
	$('#upFile-queue').html(txt+s);
	i++;
}

//根据主键下载附件
function downloadFile(attachid,modcode) {
	layui.layer.load(); 
	try{
		$.ajaxFileUpload( {
			url : 'cmuc2/fileup.jsp', //需要链接到服务器地址
			type : "post",
			secureuri : false,
			data : {dotype:'download',attid:attachid,modcode:modcode},
			dataType : 'test', //服务器返回的格式，可以是json
			success : function(data) {
			}
		});
	}catch(ex){
		
	}
	getdownstatu(attachid);
}


//根据路径下载附件
function downloadFilebyPath(filepath,filename,modcode) {
	layui.layer.load(); 
	try{
		$.ajaxFileUpload( {
			url : 'cmuc2/fileup.jsp', //需要链接到服务器地址
			type : "post",
			secureuri : false,
			data : {dotype:'downloadbypath',filepath:filepath,filename:filename,modcode:modcode},
			dataType : 'test', //服务器返回的格式，可以是json
			success : function(data) {
			}
		});
	}catch(ex){
		
	}
	getdownstatu(filepath);
}
/**
 * 删除附件
 * @param {Object} attachid 附件编号，主键
 * @param {Object} strName 附件名称，用于弹出提示
 * @param {Object} modcode 附件所属pojo
 */
function deleteFile(attachid,filename,modcode) {
	if (confirm("您确定要删除附件【" + filename + "】吗？删除后不可恢复！")) {
		$.ajaxFileUpload( {
			url : 'cmuc2/fileup.jsp', //需要链接到服务器地址
			type : "post",
			secureuri : false,
			data : {dotype:'delete',attid:attachid,modcode:modcode},
			dataType : 'test', //服务器返回的格式，可以是json
			success : function(data) {  
				$('#' + attachid + '_file_tr').remove();
			}
		});
	}
}
function getdownstatu(id){
	$.ajax({
		url : 'cmuc2/fileup.jsp', //需要链接到服务器地址
		type : "post",
		data : {dotype:'getstatus',applyId:id},
		dataType : 'json', //服务器返回的格式，可以是json
		error:function() {layui.layer.closeAll('loading');},
		success : function(data) {
			if('end'==data.status){
				layui.layer.closeAll('loading');
			}else{
				setTimeout(function(){
					getdownstatu(id);
				},1000);
			}
		}
	});
}


