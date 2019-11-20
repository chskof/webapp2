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
var typeList=[];
var pidList=[];			           
var selectList=[];


var OldIdListStr = "";
//加载选择的项
function loadItem() {
	$('#Selectdiv').html("");
	var IdListStr = $(_pwindos).find('#'+_idinputid).val();
	OldIdListStr = IdListStr;
	var NameListStr = $(_pwindos).find('#'+_nameinputid).val();
	var TypeListStr = $(_pwindos).find('#'+_typeinputid).val();


	if (IdListStr.trim() != "") {
		idList = IdListStr.split(",");
		nameList = NameListStr.split(",");
		typeList = TypeListStr.split(",");
		pidList.init(idList.length);

		var aid = "";
		for ( var i = 0; i < idList.length; i++) {
			aid = idList[i].replace('.', '_');
			var html = "<a href='#' title='双击删除' id='"+ aid+ "' ondblclick='remove(this.id)' onclick='changeSelect(this.id)'>"+ nameList[i] + "</a>"
			$('#Selectdiv').html($('#Selectdiv').html() + html);
		}
	}
}

//选择项
//id：id，name：名称，pid：父id，tag：付加信息
//新人员选择控制 tag附加信息无效 
function dbdoJs(id, name, pid , searchperson) {
	if (idList.indexOf(id) != -1) {
		return;
	}
	
	if(_selectnum==1){
		//覆盖选择
		idList.length=0;
		nameList.length=0;
		typeList.length=0;
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
	typeList[typeList.length] = searchperson;
	pidList[pidList.length] = pid;
	var html = "<a href='#'  title='双击删除' id='"+ aid+ "' ondblclick='remove(this.id)'  onclick='changeSelect(this.id)'>"+ name + "</a>"
	$('#Selectdiv').html($('#Selectdiv').html() + html);
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

//选择已选择的项
function changeSelect(id) {
	if ($("#" + id).hasClass("aselect")) {
		$("#" + id).removeClass();
		selectList.remove(id);
	} else {
		$("#" + id).addClass("aselect");
		selectList[selectList.length] = id;
	}
}
//删除选指定择项
function remove(id) {
	$("a").remove("#" + id);
	id = id.replace('_', '.');
	var index = idList.indexOf(id);
	idList.removebyIndex(index);
	nameList.removebyIndex(index);
	typeList.removebyIndex(index);
	pidList.removebyIndex(index);

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
	typeList.length = 0;
	pidList.length = 0;
	$("#Selectdiv").html("");
}

function btnClose() {
	window.returnValue = 0;
	window.close();
}
function btnOk() {
	var idListString = idList.toString();	
	$(_pwindos).find('#'+_idinputid).val(idListString);
	$(_pwindos).find('#'+_nameinputid).val(nameList.toString());
	$(_pwindos).find('#'+_typeinputid).val(typeList.toString());
	if (OldIdListStr != idListString) {
		window.returnValue = 1;
	} else {
		window.returnValue = 0;
	}
	window.close();
}




 


 
 
 
 