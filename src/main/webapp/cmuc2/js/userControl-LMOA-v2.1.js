//获取数组的值索引
Array.prototype.indexOf = function(val) {
	for ( var i = 0; i < this.length; i++) {
		if (this[i] == val)
			return i;
	}
	return -1;
};
//删除指定值
Array.prototype.remove = function(val) {
	var index = this.indexOf(val);
	if (index > -1) {
		this.splice(index, 1);
	}
};
//删除指定索引值
Array.prototype.removebyIndex = function(val) {
	if (val > -1) {
		this.splice(val, 1);
	}
};
//初始化数组
Array.prototype.init = function(val) {
	while (val > 0) {
		this[this.length] = "";
		val = val - 1;
	}
};

String.prototype.trim = function() { //删除左右两端的空格
	return this.replace(/(^\s*)|(\s*$)/g, "");
}






var idList=[];
var nameList=[];
var pidList=[];			           
var selectList=[];


var OldIdListStr = "";
//加载选择的项
function loadItem() {
	var IdListStr = $(_pwindos.document).find('#'+_idinputid).val();
	OldIdListStr = IdListStr;
	var NameListStr = $(_pwindos.document).find('#'+_nameinputid).val();


	if (IdListStr.trim() != "") {
		idList = IdListStr.split(",");
		nameList = NameListStr.split(",");
		pidList.init(idList.length);

		var aid = "";
		for ( var i = 0; i < idList.length; i++) {
			aid = idList[i].replace('.', '_');
			var html = "<button id='"+ aid+ "' onclick='remove(this.id)' >"+ nameList[i] + "<i class='layui-icon layui-icon-close-fill'></i></button>"
			$('#Selectdiv').html($('#Selectdiv').html() + html);
			$('#i-'+aid).addClass('radio-i-sel');
		}
	}
}

function selli(){
	for ( var i = 0; i < idList.length; i++) {
		var aid = idList[i].replace('.', '_');
		if(!$('#i-'+aid).hasClass('radio-i-sel')){
			$('#i-'+aid).addClass('radio-i-sel');
		}
	}
}

//选择项
//id：id，name：名称，pid：父id，tag：付加信息
//新人员选择控制 tag附加信息无效 
function dbdoJs(id, name, pid,obj) {
	if (idList.indexOf(id) != -1) {
		return;
	}
	if(_selectnum==1){
		if(idList.length==1)$('#i-'+idList[0].replace('.','_')).removeClass('radio-i-sel');
		//覆盖选择
		idList.length=0;
		nameList.length=0;
		pidList.length=0;
		$('#Selectdiv').html('');
	}else{
		//判断父子不能同时选定
		if (judge(id, pid)) {
			//父或子选中了
			return;
		}
		//选择个数判断
		if (_selectnum == idList.length && _selectnum != 0 ) {
			alert("最多只能选择" + _selectnum + "项");
			return;
		}
	} 

	idList[idList.length] = id;
	var aid = id.replace('.', '_');
	nameList[nameList.length] = name;
	pidList[pidList.length] = pid;
	var html = "<button id='"+ aid+ "' onclick='remove(this.id)' >"+ name + "<i class='layui-icon layui-icon-close-fill'></i></button>";
	$('#Selectdiv').html($('#Selectdiv').html() + html);
	for(var n=0;n<idList.length;n++){
		if(!$('#i-'+idList[n].replace('.','_')).hasClass('radio-i-sel')){
			$('#i-'+idList[n].replace('.','_')).addClass('radio-i-sel');
		}
	}
	
}
//判断父或子是否选择
function judge(id, pid) {
	if (idList.length == 0) {
		return false;
	}
	if (idList.indexOf(pid) == -1) {
		for ( var i = 0; i < pidList.length; i++) {
			if (id == pidList[i]) {
				//子已经被选择
				return true;
			}
		}
	} else {
		//父已经被选择
		return true;
	}
	return false;
}


//删除选指定择项
function remove(id) {
	$("button").remove("#" + id);
	id = id.replace('_', '.');
	var index = idList.indexOf(id);
	idList.removebyIndex(index);
	nameList.removebyIndex(index);
	pidList.removebyIndex(index);
	$('#i-'+id).removeClass('radio-i-sel');

}
//删除指定的多条选择项
function removeMore() {
	for ( var i = 0; i < selectList.length; i++) {
		remove(selectList[i]);
	}
	selectList.length = 0;
}
//删除所有选择项
function removeAll() {
	selectList.length = 0;
	idList.length = 0;
	nameList.length = 0;
	pidList.length = 0;
	$("#Selectdiv").html("");
}

function btnClose() {
	parent.layer.close(parent.layer.index);
}
function btnOk() {
	var idListString = idList.toString();	
	$(_pwindos.document).find('#'+_idinputid).val(idListString);
	$(_pwindos.document).find('#'+_nameinputid).val(nameList.toString());
	if (OldIdListStr != idListString) {		
		var funName='selectChange'+_kjid
		eval('if(_pwindos.'+funName+'){_pwindos.'+funName+'();}');
	}
	parent.layer.close(parent.layer.index);
}




 


 
 
 
 