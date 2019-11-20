/*
**  <input class="item-select no-swiper" id="sel_1" data-type="company"  data-id="00370000000000000000" data-uid="00000000000000000000000000" data-selectType="person"  
**   data-more="true" value='' placeholder="点击选择" type="text" readonly="true" onclick='selora(this)' />
**
**参数:
** id                 :      'xxxxxxxx'                                     选人框input的id  
** data-id            :      '00370000000000000000'                         数据查询码
** data-type          :      company / organization / person              查询哪一类数据
** data-selectType    :      company,organization /  person               返回哪一级的数据
** data-more          :      'true' / 'false'                                 多选 / 单选
** value              :      ''                                            预选值
** data-uid           :      '00000000000000000000'                        预选id 
**
**
**
**
**
**
**
*/
//
var datapoor = {};
function checkthis(e,defmore,genid){
	if(typeof genid == 'object'){
		genid = genid.id;
	}
	var selected = e.getAttribute('data-namevalue');  //刚刚选中的
    var selid = e.parentElement.id;  //刚选中的id;  用于对比重复的选项
    var selectedbox = document.querySelector('#sel_selected_'+genid);  //选中的显示区域
    var contactid = 'i' + e.parentElement.id;
    var _a = document.createElement('a');
		_a.id = contactid;
		_a.setAttribute('data-id',e.getAttribute('data-id'));
		_a.innerText = selected;
    if(defmore == true){
    	//多选逻辑
    	e.querySelector('i').classList.toggle('active');
    	//
    	if(datapoor[genid].length == 0){
    		datapoor[genid].push(selected);
    		
    	}else{
    		var count = 0;
    		for(var s = 0; s < datapoor[genid].length; s++){
    			if(datapoor[genid][s] == selected){
    				datapoor[genid].splice(s,1);
    				count ++;
    				break;
    			}
    		}
    		if(count == 0){
    			datapoor[genid].push(selected);
    		}
    	}
    	if(selectedbox.children.length == 0){
    		selectedbox.appendChild(_a);
    	}else{
    		var count = 0;
    		for(var o = 0; o < selectedbox.children.length; o++){
    			if(selectedbox.children[o].id == 'i'+selid){
    				selectedbox.children[o].remove();
    				count ++;
    				break;
    			}
    		}
    		if(count == 0){
        		selectedbox.appendChild(_a);
    		}
    	}
    }else if(defmore == false){
    	//单选逻辑
    	var ois = e.parentElement.parentElement.querySelectorAll('i');
    	var aa = e.parentElement.id.split('_');
    	var index = aa[aa.length-1];
    	for(var s = 0; s < ois.length; s++){
    		if(s != index){
    			ois[s].classList.remove('active');
    		}
    	}
    	//debugger;
    	e.querySelector('i').classList.toggle('active');
    	//
    	datapoor[genid]=[selected];
    	//
    	if(selectedbox.children.length == 0){
    		selectedbox.appendChild(_a);
    	}else{
    		var selectednew = e.getAttribute('data-id');  //默认uid
    		if(selectedbox.children[0].getAttribute('data-id') != selectednew){
    			selectedbox.children[0].remove();
    			selectedbox.appendChild(_a);
    		}else{
    			selectedbox.children[0].remove();
    		}
    	}
    }

    //
    _a.addEventListener('click',function(e){
    	var _id = e.target.id.replace('i','');
    	e.target.remove();
    	document.querySelector('#'+_id).querySelector('i').classList.remove('active');
    })
}
function getchild(e,defmore,genid,genuid,genvalue){
	var ul = e.parentElement.querySelector('ul');
	if(typeof genid == 'object'){
		genid = genid.id;
	}
	if(ul){
		//已经存在数据  无需请求
		ul.classList.toggle('toggle_hidden');
		e.querySelector('i').classList.toggle('active');
	}else{
		//无数据 初次请求
		var id = e.parentElement.id,
			defid = e.getAttribute('data-id') || '',
			deftype = e.getAttribute('data-type')  || '',
			defselectType = e.getAttribute('data-selectType') || '';
		var _target = e.parentElement;
		if(deftype == '*'){
			checkthis(e,defmore,genid);
            //已经到了最后一层
            
		}else if(deftype == 'organization'){
			e.querySelector('i').classList.toggle('active');
			addlist(_target,defid,deftype,defselectType,defmore,genid,genuid,genvalue);
		}else if(deftype == 'company'){
			e.querySelector('i').classList.toggle('active');
			addlist(_target,defid,deftype,defselectType,defmore,genid,genuid,genvalue);
		}
	}
}
function selora(e){
    var genid          = e.id                                || '',                       //
    	defid          = e.getAttribute('data-id')           || '00370000000000000000',   //
    	deftype        = e.getAttribute('data-type')         || 'company',                //
    	defselectType  = e.getAttribute('data-selectType')   || 'person',                 //选择类型  个人person    部门或公司organization,company
    	defmore        = e.getAttribute('data-more')         || 'false',                  //可选多少个  默认false为单选
    	defidSec	   = e.getAttribute('data-id-sec')		 || '',						  //选择人员时默认部门
    	genuid         = e.getAttribute('data-uid')          || '',           //预选id    , 分隔
    	genvalue       = e.value                             || '';           //预选值    , 分隔
    //
    var selbox = e.ownerDocument.querySelector('#sel_ora_'+genid);
    if(selbox){
    	selbox.style.display = 'block';
    	document.querySelector('#home_page').style.display = 'none';
    }else{
        //请求初始的外层列表数据  不清楚数据接口 仅为示例
    	$.ajax( {
			url  : '../cmuc/getChildTwo.jsp?ver='+Math.random(),
			type : 'POST',
			data : {
				pid : defid,                    //'00370000000000000000'
				type : deftype,                 //'company'
				noSelDate : '',                 //'company'
				selectType : defselectType      //'person'
			},
			dataType : "json",
			error : function() {
				// alert('获取节点数据失败！');
				//初始选人界面
				// inithtml(genid);
				// //测试无法调用数据  用假数据模拟。。
				// var result = {
				// 	"id"       :["00370087009600000000","00370087009100000000","00370087005600000000","00370087005600000000"],
				// 	"name"     :["省公司","南昌分公司","九江分公司","测试部门"],
				// 	"type"     :["company","company","company","organization"],
				// 	"namevalue":["省公司","南昌分公司","九江分公司","测试部门"]
				// }
				// var defid        = result.id,
				// 	defname      = result.name,
				// 	defnamevalue = result.namevalue,
				// 	deftype      = result.type;
				// //
				// var len = result.id.length;
				// var list = '';
				// for(var i = 0; i < len; i++){
				// 	if((defselectType.indexOf('organization')>-1 && deftype[i] == 'organization') || (defselectType == deftype[i])){
				// 		list += '<li id="a_'+i+'">';
				// 		list += 	'<p class="sel-menu-a" style="padding-left:25px;background:#fafafa;" data-id="'+defid[i]+'" data-namevalue="'+defnamevalue[i]+'" data-type="'+deftype[i]+'" onclick="checkthis(this,'+defmore+','+genid+')"><span>'+defname[i]+'</span><i class="radio-i"></i></p>';
				// 		list += '</li>';
				// 	}else{
				// 		list += '<li id="a_'+i+'">';
				// 		list += 	'<p class="sel-menu-a" data-id="'+defid[i]+'" data-namevalue="'+defnamevalue[i]+'" data-type="'+deftype[i]+'" data-selectType="'+defselectType+'" onclick="getchild(this,'+defmore+','+genid+')"><i class="sel-menu-down"></i><span>'+defname[i]+'</span><i></i></p>';
				// 		list += '</li>';
				// 	}
				// }
				// var ul = document.createElement('ul');
				// ul.class = "sel-menu";
				// ul.style.paddingBottom = '185px';
				// ul.innerHTML = list;
				// document.querySelector('#sel_list_'+genid).querySelector('p').remove();
				// document.querySelector('#sel_list_'+genid).appendChild(ul);
				// /*初始创建数据池*/
    //             datapoor[genid] = [];

			},
			success : function(result) {
				//初始选人界面
				inithtml(genid,genuid,genvalue);
				//
				var defid = result.id;
				var defname = result.name;
				var defnamevalue=result.namevalue;
				var deftype = result.type;
				//
				/*初始创建数据池*/
                datapoor[genid] = [];
                //
				var len = result.id.length;
				var list = '';
				//预选
				var genuids   = genuid.split(','),
					genvalues = genvalue.split(',');
				genuid = "'"+genuid+"'";
				genvalue="'"+genvalue+"'";
				for(var i = 0; i < len; i++){
					if((defselectType.indexOf('organization')>-1 && deftype[i] == 'organization') || (deftype[i]=="person"&&defselectType=="person")){
						console.log("111");
						for(var k = 0; k < genuids.length; k++){
							if(defid[i] == genuids[k]){
								//请求回的数据内 包含了 预选值 数据
								list += '<li id="a_'+i+'">';
								list += 	'<p class="sel-menu-a" style="padding-left:25px;background:#fafafa;" data-id="'+defid[i]+'" data-namevalue="'+defnamevalue[i]+'" data-type="'+deftype[i]+'" onclick="checkthis(this,'+defmore+','+genid+')"><span>'+defname[i]+'</span><i class="radio-i active"></i></p>';
								list += '</li>';
								datapoor[genid].push(defnamevalue[i]);
							}else{
								list += '<li id="a_'+i+'">';
								list += 	'<p class="sel-menu-a" style="padding-left:25px;background:#fafafa;" data-id="'+defid[i]+'" data-namevalue="'+defnamevalue[i]+'" data-type="'+deftype[i]+'" onclick="checkthis(this,'+defmore+','+genid+')"><span>'+defname[i]+'</span><i class="radio-i"></i></p>';
								list += '</li>';
							}
						}
					}else{
						list += '<li id="a_'+i+'">';
						list += 	'<p class="sel-menu-a" data-id="'+defid[i]+'" data-namevalue="'+defnamevalue[i]+'" data-type="'+deftype[i]+'" data-selectType="'+defselectType+'" onclick="getchild(this,'+defmore+','+genid+','+genuid+','+genvalue+')"><i class="sel-menu-down"></i><span>'+defname[i]+'</span><i></i></p>';
						list += '</li>';
					}
				}
				var ul = document.createElement('ul');
				ul.class = "sel-menu";
				ul.style.paddingBottom = '185px';
				ul.innerHTML = list;
				document.querySelector('#sel_list_'+genid).querySelector('p').remove();
				document.querySelector('#sel_list_'+genid).appendChild(ul);
				let eleList = document.querySelectorAll('.sel-menu-a');
				for (let i = 0; i < eleList.length; i++) {
				    // 遍历操作
					var dataid = eleList[i].getAttribute('data-id');
					if(defidSec == dataid){
						var target = eleList[i];
						target.onclick();
				        target.scrollIntoView(true);
//						let targetList = target.parentNode;
//						if(targetList.length > 0){
//							for(let j = 0; j < targetList.length; j++){
//								targetList[j].onclick();
//							}
//						}
					}
				}
				
			}
		});
    }
}
function inithtml(genid,genuid,genvalue){
	//初始化选人界面
	var strs = '';
	strs +=     '<div class="apply-navbar">';
	strs +=     	'<div class="navbar-box">';
	strs += 			'<span class="navbar-back" id="sel_back_'+genid+'"></span>';
	strs += 			'<span class="navbar-title">人员组织机构选择</span>';
	strs += 		'</div>';
	strs +=			'<div class="sel-info">'
	strs +=				'<div class="sel-list" id="sel_list_'+genid+'">';
	strs +=					'<p>数据加载失败</p>'
	strs +=				'</div>';
	strs +=				'<div class="sel-todo">';
	strs +=					'<div class="sel-selected" id="sel_selected_'+genid+'"></div>';
	strs +=					'<div class="sel-btn">';
	strs +=						'<div class="nuui-flex" style="height:100%">';
	strs +=							'<div class="nuui-flex__item"><a class="btn2" id="sel_cancel_'+genid+'" style="color:#333;background:#ddd;">关闭</a></div>';
	strs +=							'<div class="nuui-flex__item"><a class="btn2" id="sel_ok_'+genid+'" style="background:#14a1ff">确认</a></div>';
	strs +=						'</div>';
	strs +=					'</div>';
	strs +=				'</div>';
	strs +=			'</div>';
	strs +=		'</div>';
	var _target = document.createElement('div');
	_target.id = "sel_ora_"+genid;
	_target.class = "sel-ora";
	_target.innerHTML = strs;
	document.querySelector('body').appendChild(_target);
	document.querySelector('#home_page').style.display = 'none';

	//
	//预选
	var selectedbox = document.querySelector('#sel_selected_' + genid);
	var genuids   = genuid.split(','),
		genvalues = genvalue.split(',');
	for(var t = 0; t < genuids.length; t++){
		if(genuids[t] != '' && genuids[t] != ' '){
			var _a = document.createElement('a');
				_a.id = 'i' + genuids[t];
				_a.setAttribute('data-id',genuids[t]);
				_a.innerText = genvalues[t];
			selectedbox.appendChild(_a);
		}
	}


	//绑定事件
    var back_btn = document.querySelector('#sel_back_'+genid);
    var cancel_btn = document.querySelector('#sel_cancel_'+genid);
    var ok_btn = document.querySelector('#sel_ok_'+genid);
    back_btn.addEventListener('click',function(){
    	_target.style.display = 'none';
    	document.querySelector('#home_page').style.display = 'block';
    });
    cancel_btn.addEventListener('click',function(){
    	_target.style.display = 'none';
    	document.querySelector('#home_page').style.display = 'block';
    });
    ok_btn.addEventListener('click',function(){
    	_target.style.display = 'none';
    	document.querySelector('#home_page').style.display = 'block';
    	var target = document.querySelector('#'+genid);
    	var selected = document.querySelector('#sel_selected_'+genid);
    	
    	var data_id = '';
    	target.value = '';
    	for(var i = 0; i < selected.children.length; i++){
    		target.value += selected.children[i].textContent + ',';
    		data_id += selected.children[i].getAttribute('data-id') + ',';
    	}
    	target.setAttribute('data-uid',data_id);
    	if(target.id == 'sel_1'){
    		target.onchange();
    	}
    });

}
function addlist(target,defid,deftype,defselectType,defmore,genid,genuid,genvalue){
	if(typeof genid == 'object'){
		genid = genid.id;
	}
	$.ajax({
		url : '../cmuc/getChildTwo.jsp',
		type : 'POST',
		data : {
			pid : defid,
			type : deftype,
			selectType: defselectType,
			noSelDate : ''              //'company'
		},
		dataType : 'json',
		error : function(){
			alert('未请求到数据');
            //假数据
   //          var _defid = result.id,
			// 	_defname = result.name,
			// 	_defnamevalue=result.namevalue,
			// 	_deftype = result.type;
			// //
			// var len = _defid.length;
			// var list = '';
			// for(var j = 0; j < len; j++){
			// 	if(_deftype[j] == '*'){
			// 		list += '<li id="'+target.id+'_c_'+j+'">';
			// 			list += '<p class="sel-menu-c" data-id="'+_defid[j]+'" data-namevalue="'+_defnamevalue[j]+'" data-type="'+_deftype[j]+'"" onclick="getchild(this,'+defmore+','+genid+')"><span>'+_defname[j]+'</span><i class="radio-i"></i></p>';
			// 		list += '</li>';
			// 	}else if(_deftype[j] == 'organization'){
			// 		if(defselectType == 'person'){
			// 			list += '<li id="'+target.id+'_b_'+j+'">';
			// 				list += '<p class="sel-menu-b" data-id="'+_defid[j]+'" data-selecttype="'+defselectType+'" data-namevalue="'+_defnamevalue[j]+'" data-type="'+_deftype[j]+'" onclick="getchild(this,'+defmore+','+genid+')"><i class="sel-menu-down"></i><span>'+_defname[j]+'</span><i></i></p>';
			// 			list += '</li>';
			// 		}else{
			// 			list += '<li id="'+target.id+'_c_'+j+'">';
			// 				list += '<p class="sel-menu-c" data-id="'+_defid[j]+'" data-namevalue="'+_defnamevalue[j]+'" data-type="'+_deftype[j]+'"" onclick="checkthis(this,'+defmore+','+genid+')"><span>'+_defname[j]+'</span><i class="radio-i"></i></p>';
			// 			list += '</li>';
			// 		}
			// 	}
			// }
			// var ul = document.createElement('ul');
			// ul.innerHTML = list;
			// target.appendChild(ul);


		},
		success : function(result){
			var _defid = result.id,
				_defname = result.name,
				_defnamevalue=result.namevalue,
				_deftype = result.type;
			//
			var len = result.id.length;
			var list = '';
			//
			var genuids = genuid.split(',');
				genvalues = genvalue.split(',');
				genuid = "'"+genuid+"'";
				genvalue="'"+genvalue+"'";
			for(var j = 0; j < len; j++){
				if(_deftype[j] == '*'){
					for(var x = 0; x < genuids.length; x++){
						if(_defid[j] == genuids[x]){
							list += '<li id="'+target.id+'_c_'+j+'">';
								list += '<p class="sel-menu-c" data-id="'+_defid[j]+'" data-namevalue="'+_defnamevalue[j]+'" data-type="'+_deftype[j]+'"" onclick="getchild(this,'+defmore+','+genid+')"><span>'+_defname[j]+'</span><i class="radio-i active"></i></p>';
							list += '</li>';
						}else{
							list += '<li id="'+target.id+'_c_'+j+'">';
								list += '<p class="sel-menu-c" data-id="'+_defid[j]+'" data-namevalue="'+_defnamevalue[j]+'" data-type="'+_deftype[j]+'"" onclick="getchild(this,'+defmore+','+genid+')"><span>'+_defname[j]+'</span><i class="radio-i"></i></p>';
							list += '</li>';
						}
					}
				}else if(_deftype[j] == 'organization'){
					if(defselectType == 'person'){
						list += '<li id="'+target.id+'_b_'+j+'">';
							list += '<p class="sel-menu-b" data-id="'+_defid[j]+'" data-selecttype="'+defselectType+'" data-namevalue="'+_defnamevalue[j]+'" data-type="'+_deftype[j]+'" onclick="getchild(this,'+defmore+','+genid+','+genuid+','+genvalue+')"><i class="sel-menu-down"></i><span>'+_defname[j]+'</span><i></i></p>';
						list += '</li>';
					}else{
						for(var y = 0; y < genuids.length; y++){
							if(_defid[j] == genuids[y]){
								list += '<li id="'+target.id+'_c_'+j+'">';
									list += '<p class="sel-menu-c" data-id="'+_defid[j]+'" data-namevalue="'+_defnamevalue[j]+'" data-type="'+_deftype[j]+'"" onclick="checkthis(this,'+defmore+','+genid+')"><span>'+_defname[j]+'</span><i class="radio-i active"></i></p>';
								list += '</li>';
							}else{
								list += '<li id="'+target.id+'_c_'+j+'">';
									list += '<p class="sel-menu-c" data-id="'+_defid[j]+'" data-namevalue="'+_defnamevalue[j]+'" data-type="'+_deftype[j]+'"" onclick="checkthis(this,'+defmore+','+genid+')"><span>'+_defname[j]+'</span><i class="radio-i"></i></p>';
								list += '</li>';
							}
						}
					}
				}else if(_deftype[j] == 'person'){
					list += '<li id="'+target.id+'_b_'+j+'">';
					list += '<p class="sel-menu-b" data-id="'+_defid[j]+'" data-selecttype="'+defselectType+'" data-namevalue="'+_defnamevalue[j]+'" data-type="'+_deftype[j]+'" onclick="checkthis(this,'+defmore+','+genid+')"><i class="radio-i"></i><span>'+_defname[j]+'</span><i></i></p>';
					list += '</li>';
				}
			}
			var ul = document.createElement('ul');
			ul.innerHTML = list;
			target.appendChild(ul);
		}
	})

}

//附件预览
function filePreview(url, cookiestr, filetype) {
	if(filetype.indexOf('.') != -1){
		filetype = filetype.split('.')[1];
	}
    var file_url = g_fileweb + url;
    var convertType = "0";
    if(filetype){
      filetype=filetype.toLowerCase();
      if(filetype=="pdf") {
        convertType = "14";
      } else if(filetype == "zip" || filetype=="rar") {
        convertType = "19";
      } else if(filetype == "png" || filetype=="gif" || filetype=="jpg") {
        convertType = "23";
      }
    }
    $.ajax({
      url: "https://moa.jx139.com:8200/dcs/onlinefile",
      data: {
        "downloadUrl": encodeURI(decodeURI(file_url)),
        "convertType": convertType,
        "cookie": cookiestr,
        "htmlTitle": "文档在线预览"
      },
      dataType: "json",
      type: "post",
      success: function(data) {
        //console.log(data);
        if (data.data != '') {
          var link = data.data[0].replace("\n","");
          if(link.indexOf("http://moa.jx139.com:8200")==0) {
            link = link.replace("http://moa.jx139.com:8200","https://moa.jx139.com:8200");
          }
          if(link.indexOf("http://117.169.36.98:8000")==0) {
            link = link.replace("http://117.169.36.98:8000","https://moa.jx139.com:8200");
          }
		
	      window.open(link);
          
        } else {
          alert("服务器暂不支持此文件的预览");
        }
      },
      error: function(data) {
        
        console.error(data.message);
        alert("服务器暂不支持此文件的预览");
      }
    });
  }