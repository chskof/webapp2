//清除选择
function removeRight() {
	//首先得到第二个select对象
	var selectElement = document.getElementById("secend");
	var optionElement = selectElement.getElementsByTagName("option");
	var len = optionElement.length;
	//再次得到第一个元素
	if (!(selectElement.selectedIndex == -1)) {
		for (i = 0; i < optionElement.length; i++) {
			if (optionElement[i].selected) {
				selectElement.options.remove(i);//.remove(i);//被选中的那个元素的索引
				optionElement = selectElement.getElementsByTagName("option");
			}
		}
	} else {
		alert("请选择删除项!");
	}
}
//移动所有的到右边
function moveAll() {
	//得到第一个select对象
	var selectElement = document.getElementById("first");
	var optionElements = selectElement.getElementsByTagName("option");
	var len = optionElements.length;
	//alert(len);

	//将第一个selected中的数组翻转
	var firstOption = new Array();
	for ( var k = len - 1; k >= 0; k--) {
		firstOption.push(optionElements[k]);

	}
	var lens = firstOption.length;
	//得到第二个select对象
	var selectElement2 = document.getElementById("secend");
	for ( var j = lens - 1; j >= 0; j--) {
		var current = firstOption[j];
		selectElement2.options[j] = new Option(current.text, current.value);
	}
}

//清空往左移
function moveAllLeft() {
	var selectElement = document.getElementById("secend");
	var optionElements = document.getElementsByTagName("option");
	var len = optionElements.length;
	var optionEls = new Array();
	for ( var i = len - 1; i >= 0; i--) {
		optionEls.push(optionElements[i]);
	}
	var lens = optionEls.length;

	var firstSelectElement = document.getElementById("first");
	for ( var j = lens - 1; j >= 0; j--) {
		firstSelectElement.appendChild(optionEls[j]);
	}
}

/**右移**/
function moveRight() {

	//得到第一个select对象
	var selectElement = document.getElementById("first");
	var optionElements = selectElement.getElementsByTagName("option");
	var len = optionElements.length;

	if (!(selectElement.selectedIndex == -1)) //如果没有选择元素，那么selectedIndex就为-1
	{

		//得到第二个select对象
		var selectElement2 = document.getElementById("secend");

		// 向右移动
		for ( var i = 0; i < optionElements.length; i++) {
			// 向右移动
			if (optionElements[i].selected) {
				selectElement2.appendChild(optionElements[i]);
				i--;
			}
		}
	} else {
		//alert("您选择分发部门或人员！");
	}
}
//移动选中的元素到左边
function moveLeft() {
	//首先得到第二个select对象
	var selectElement = document.getElementById("secend");
	var optionElement = selectElement.getElementsByTagName("option");
	var len = optionElement.length;

	//再次得到第一个元素
	if (!(selectElement.selectedIndex == -1)) {
		var firstSelectElement = document.getElementById("first");
		for (i = 0; i < optionElement.length; i++) {

			// 向左移动
			if (optionElement[i].selected) {
				firstSelectElement
						.appendChild(optionElement[i]);//被选中的那个元素的索引
				i--;
			}
		}
	} else {
		//alert("您选择分发部门或人员！");
	}
}


//初始化数据
var canyuzheIDAll = "";
var canyuzheNameAll = "";
//var curControlID='333id';
//var curControlName='333name';
/**
 * 源控件已经选中的编号
 */
var selIDArr = new Array();
/**
 * 源控件已经选中的名称
 */
var selNameArr = new Array();
function loadInit() {
	var win = window.dialogArguments;

	var IdStr = win.document.getElementById("tagetControl").value;
	//得到已经选中的值
	selIDArr = win.document.getElementById(curControlID).value.split(",");
	selNameArr = win.document.getElementById(curControlName).value.split(",");
	var idArr = IdStr.split(",");
	//所有参与者的id，逗号分隔
	var controArrIds = new Array();
	//所有参与者的name，逗号分隔
	var controArrNames = new Array();
	//分割得到要取值的控件name和id数据
	for ( var i = 0; i < idArr.length; i++) {

		controArrIds[i] = idArr[i];
		controArrNames[i] = idArr[i].replace("id","name");
	}
	for ( var i = 0; i < controArrIds.length; i++) {
		if(!win.document.getElementById(controArrIds[i]).value==""){
			canyuzheIDAll += win.document.getElementById(controArrIds[i]).value
				+ ",";
		}
		if(!win.document.getElementById(controArrNames[i]).value==""){
			canyuzheNameAll += win.document.getElementById(controArrNames[i]).value
				+ ",";
		}
	}
	canyuzheIDAll = canyuzheIDAll.substring(0, canyuzheIDAll.length - 1);
	canyuzheNameAll = canyuzheNameAll.substring(0, canyuzheNameAll.length - 1);
	var selectElementLeft = document.getElementById("first");
	var selectElementRight = document.getElementById("secend");
	//参与者id数组
	var canyuzheIDAllArr = canyuzheIDAll.split(",");
	//参与者id数组
	var canyuzheNameAllArr = canyuzheNameAll.split(",");
	for ( var i = 0; i < canyuzheIDAllArr.length; i++) {
		//遍历所有目标参与者，如果在选中列表中，应该添加到右侧，否则，添加到左侧
		if (valISExistArr(selIDArr, canyuzheIDAllArr[i])
				&& !valISExist(selectElementRight.options, canyuzheIDAllArr[i])) {
			//在选中项列表中，并且尚未添加到右侧列表中
			selectElementRight.options.add(new Option(canyuzheNameAllArr[i],
						canyuzheIDAllArr[i]));
		} else {
			//不在选中项列表并且尚未添加到左侧列表中
			if (!valISExistArr(selIDArr, canyuzheIDAllArr[i])
					&& !valISExist(selectElementLeft.options, canyuzheIDAllArr[i])) {
				selectElementLeft.options.add(new Option(canyuzheNameAllArr[i],
						canyuzheIDAllArr[i]));
			}
		}

	}
}

/**
 * 根据id验证在下拉中是否已经存在
 * @param {Object} elementArr
 * @param {Object} id
 * @return {boolean} 
 */
function valISExist(elementArr, id) {
	
	if(elementArr==""){
		return false;
	}
	for ( var j = 0; j < elementArr.length; j++) {
		//alert(elementArr[j].value+"*");
		if (id == elementArr[j].value) {
			return true;
		}
	}
	return false;
}
/**
 * 根据id验证是否已经选择的数据
 * @param {Object} elementArr
 * @param {Object} id
 * @return {boolean} 
 */
function valISExistArr(elementArr, id) {
	
	if(elementArr==""){
		return false;
	}
	for ( var j = 0; j < elementArr.length; j++) {
		//alert(elementArr[j]+"￥");
		if (id == elementArr[j]) {
			return true;
		}
	}
	return false;
}
//取消
function cancel() {
	window.returnValue = 0;
	window.close();
}
//确定
function deterOk() {
	var win = window.dialogArguments;
	var selectElementRight = document.getElementById("secend").options;
	var controlId = "";
	var controlName = "";
	for(var i=0;i<selectElementRight.length;i++){
		controlId += selectElementRight[i].value+",";
		controlName += selectElementRight[i].text+",";
	}
	controlId = controlId.substring(0, controlId.length - 1);
	controlName = controlName.substring(0, controlName.length - 1);
	win.document.getElementById(curControlID).innerText=controlId;
	win.document.getElementById(curControlName).innerText=controlName;
	window.close();
}
