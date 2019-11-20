

var OFFICE_CONTROL_OBJ; //控件对象
var IsFileOpened = false; //控件是否打开文档
var g_openUrl=""; //打开的文档路径
var openFileSuss = true; //是否有效打开文件
var g_wordpass="";// word保护密码全局变量
/**
 *  初始化加载文档
 * @param {Object} fileUrl 打开的文件url（格式为：doc/2017/12/12/XXXXX.doc；为空时打开common/template/2003doc.doc模板文档 ）
 * @param {Object} userName  
 * @param {Object} httpPath  文件的http地址前缀（格式为：http://webapp/），与fileUrl组合成完整的文档http地址（为空时默认为网站http根目录）
 * @param {Object} isyb  是否异步模式打开
 * @param {Object} isreadonly 是否自读模式打开，自读模式打开不会保存至服务器
 */
function intializeDoc(fileUrl, userName, httpPath,isyb,isreadonly) {
	try {
		OFFICE_CONTROL_OBJ = document.getElementById('TANGER_OCX');
		OFFICE_CONTROL_OBJ.WebUserName = userName;
	} catch (err) {
		try {
			OFFICE_CONTROL_OBJ = document.getElementById('TANGER_OCX');
			OFFICE_CONTROL_OBJ.WebUserName = userName;
		} catch (err) {
			
		}
	}
	OFFICE_CONTROL_OBJ.Titlebar = false; //关闭软行title
	g_openUrl = fileUrl;
	NTKO_OCX_OpenDoc(fileUrl,httpPath,isreadonly,isyb);
	setMenubar(false);
}
/**
 * 通过文件的http地址打开文档
 * @param {Object} fileUrl 打开的文件url（格式为：doc/2017/12/12/XXXXX.doc；为空时默认打开网站根目录的common/template/2003doc.doc模板文档 ）
 * @param {Object} httpPath 文件的http地址前缀（格式为：http://webapp/），与httpPath+fileUrl组合成完整的文档http地址（为空时默认为网站http根目录）
 * @param {Object} isreadonly 是否只读模式打开，自读模式打开不能进行文档保存，为空时默认为非只读
 * @param {Object} isyb  是否异步模式打开，为空时默认为同步
 */
function NTKO_OCX_OpenDoc(fileUrl,httpPath,isreadonly,isyb) {
	if(typeof(isreadonly)=='undefined')isreadonly=false;
	if(typeof(isyb)=='undefined')isyb=false;
	httpPath=httpPath||g_webUrl;
	if (fileUrl == "") {
		//从网站根目录获取空模板
		OFFICE_CONTROL_OBJ.OpenFromURL(g_webUrl + 'common/template/2003doc.doc', 'word.document');
	} else {
		try {
			//打开的文档为http路径
			if(!isyb){
				OFFICE_CONTROL_OBJ.OpenFromURL(httpPath+fileUrl,isreadonly,'word.document');
			}else{
				//异步打开，不显示加载进度
				//OFFICE_CONTROL_OBJ.OpenFromURL(httpPath+fileUrl,isreadonly,'word.document');
				OFFICE_CONTROL_OBJ.BeginOpenFromURL(httpPath+fileUrl,false,isreadonly,'word.document');
			}
		} catch (err) {
			openFileSuss = false;
		}
	}
	IsFileOpened = true;
}


function checkContent(){
	if (OFFICE_CONTROL_OBJ && OFFICE_CONTROL_OBJ.ActiveDocument && $.trim(OFFICE_CONTROL_OBJ.ActiveDocument.Content.Text) == "") {
		return false;
	}
	return true;
}

/**
 *  保存文档
 * @param {Object} acUrl 提交的url
 * @param {Object} showtig 保存成功后，页面是否弹出提示
 * @return {TypeName} 
 */
function saveFileToUrl(acUrl, showtig) {
	try {
		if (!OFFICE_CONTROL_OBJ || !OFFICE_CONTROL_OBJ.activeDocument) {
			return "";
		}
		if (OFFICE_CONTROL_OBJ.activeDocument.saved && $.trim(g_openUrl) != "") {
			return "";
		}
		var result;
		if (IsFileOpened) {
			result = OFFICE_CONTROL_OBJ.saveToURL(acUrl, //提交到的url地址
				"ntkoFile", //文件域的id，类似<input type=file name=upLoadFile 中的name
				'fileUrl=' + g_openUrl, //与控件一起提交的参数如："p1=a&p2=b&p3=c"
				0 //与控件一起提交的表单id，也可以是form的序列号，这里应该是0.
			);
			if (result != '') {
				var ss = result.split('|');
				document.all("statusBar").innerHTML = ss[0];
				if (showtig) alert(ss[0]); //页面提醒
				if (ss.length == 2)return ss[1]; //返回保存后的文件
			}
		}
	} catch (err) {}
	return "";
}




/**
 * 保存最终文本
 * @param {Object} acUrl 保存action
 * @param {Object} filepath 文件路径
 * @param {Object} save 是否强制保存
 * @return {TypeName} 
 */
function saveZZFileToUrl(acUrl, filepath, exptag) {
	try {
		if (IsFileOpened) {
			if (OFFICE_CONTROL_OBJ.ActiveDocument.ProtectionType == -1) {
				acceptallchange();
				//删除可编辑区域
				OFFICE_CONTROL_OBJ.ActiveDocument.DeleteAllEditableRanges(-1);
				OFFICE_CONTROL_OBJ.ActiveDocument.Protect(3, true, g_wordpass); //文档保护
			} else {
				OFFICE_CONTROL_OBJ.ActiveDocument.Unprotect(g_wordpass); //去除保护
				acceptallchange();
				//删除可编辑区域
				OFFICE_CONTROL_OBJ.ActiveDocument.DeleteAllEditableRanges(-1);
				OFFICE_CONTROL_OBJ.ActiveDocument.Protect(3, true, g_wordpass); //文档保护
			}
			
			result = OFFICE_CONTROL_OBJ.saveToURL(acUrl, //提交到的url地址
					"ntkoFile", //文件域的id，类似<input type=file name=upLoadFile 中的name
					'fileurl=' + filepath + '&savetag=' + exptag, //与控件一起提交的参数如："p1=a&p2=b&p3=c"
					'dff', //上传文件的名称，类似<input type=file 的value
					0 //与控件一起提交的表单id，也可以是form的序列号，这里应该是0.
				);
		}
	} catch (err) {}

	return "";
}


/*
 * 隐藏显示word修改痕迹
 * @param {Object} btnobj
 */
function showorhidehj(btnobj) {
	if (btnobj.value == '显示痕迹') {
		dis();
		btnobj.value = '隐藏痕迹'
	} else {
		hidd();
		btnobj.value = '显示痕迹'
	}
}



/**
 * 工具栏是否显示打印按钮
 * @param {Object} boolvalue
 * @return {TypeName} 
 */
function setFilePrint(boolvalue) {
	if (!OFFICE_CONTROL_OBJ)
		OFFICE_CONTROL_OBJ = document.all.TANGER_OCX;
	if (!OFFICE_CONTROL_OBJ.ActiveDocument) {
		return;
	}
	OFFICE_CONTROL_OBJ.fileprint = boolvalue; //是否允许打印
}
/**
 * 工具栏是否显示新建文档按钮
 * @param {Object} boolvalue
 * @return {TypeName} 
 */
function setFileNew(boolvalue) {
	if (!OFFICE_CONTROL_OBJ)
		OFFICE_CONTROL_OBJ = document.all.TANGER_OCX;
	if (!OFFICE_CONTROL_OBJ.ActiveDocument) {
		return;
	}
	OFFICE_CONTROL_OBJ.FileNew = boolvalue; //是否允许新建
}
/**
 * 工具栏是否显示保存按钮
 * @param {Object} boolvalue
 */
function setFileSaveAs(boolvalue) {
	var OFFICE_CONTROL_OBJ = document.all.TANGER_OCX;
	OFFICE_CONTROL_OBJ.FileSaveAs = boolvalue; //是否允许另存为
}
/**
 * 文件是否允许粘贴内容
 * @param {Object} boolvalue
 */
function setIsNoCopy(boolvalue) {
	var OFFICE_CONTROL_OBJ = document.all.TANGER_OCX;
	OFFICE_CONTROL_OBJ.IsNoCopy = boolvalue; //是否禁止粘贴
}

//显示痕迹
function dis() {
	if (!OFFICE_CONTROL_OBJ)
		OFFICE_CONTROL_OBJ = document.all.TANGER_OCX;

	if (OFFICE_CONTROL_OBJ.ActiveDocument) {
		var tb = OFFICE_CONTROL_OBJ.activeDocument.saved; //保存文档是否保存标准
		var proType = OFFICE_CONTROL_OBJ.ActiveDocument.ProtectionType;
		if (proType == -1) { //文档处于非保护状态
			OFFICE_CONTROL_OBJ.ActiveDocument.ShowRevisions = true;
		} else { //文档处于保护状态
			OFFICE_CONTROL_OBJ.ActiveDocument.Unprotect(g_wordpass) //取消文档保护
			OFFICE_CONTROL_OBJ.ActiveDocument.ShowRevisions = true;
			if (proType == 1) {
				OFFICE_CONTROL_OBJ.ActiveDocument.Protect(1, true, g_wordpass) //文档保护
			} else {
				OFFICE_CONTROL_OBJ.ActiveDocument.Protect(0, false, g_wordpass) //文档保护
			}

		}
		OFFICE_CONTROL_OBJ.activeDocument.saved = tb;
		return true;
	}
}

//隐藏痕迹
function hidd() {
	if (!OFFICE_CONTROL_OBJ)
		OFFICE_CONTROL_OBJ = document.all.TANGER_OCX;

	if (OFFICE_CONTROL_OBJ && OFFICE_CONTROL_OBJ.ActiveDocument) {
		var tb = OFFICE_CONTROL_OBJ.activeDocument.saved; //保存文档是否保存标准
		var proType = OFFICE_CONTROL_OBJ.ActiveDocument.ProtectionType;
		if (proType == -1) { //文档处于非保护状态
			OFFICE_CONTROL_OBJ.ActiveDocument.ShowRevisions = false;
		} else { //文档处于保护状态
			OFFICE_CONTROL_OBJ.ActiveDocument.Unprotect(g_wordpass) //取消文档保护
			OFFICE_CONTROL_OBJ.ActiveDocument.ShowRevisions = false;
			if (proType == 1) {
				OFFICE_CONTROL_OBJ.ActiveDocument.Protect(1, true, g_wordpass) //文档保护
			} else {
				OFFICE_CONTROL_OBJ.ActiveDocument.Protect(0, false, g_wordpass) //文档保护
				OFFICE_CONTROL_OBJ.ActiveDocument.ShowRevisions = false; //默认隐藏痕迹
			}
		}
		OFFICE_CONTROL_OBJ.activeDocument.saved = tb;
		return true;
	}
}

/**
 * a：是否显示文档修改痕迹，默认false
 * b:是否完全保护模式，默认true
 */
function setProtect(a,b) {
	try {
		
		var showhj =(a == undefined )  ?  false:a;//文档修改痕迹
		var all =(b == undefined)  ?  true:b;//保护模式
		
		if (OFFICE_CONTROL_OBJ && OFFICE_CONTROL_OBJ.activeDocument)
			var tb = OFFICE_CONTROL_OBJ.activeDocument.saved; //保存文档是否保存标准
		if (OFFICE_CONTROL_OBJ.ActiveDocument.ProtectionType != -1) {
			OFFICE_CONTROL_OBJ.ActiveDocument.Unprotect(g_wordpass); //去除保护	
		}
		OFFICE_CONTROL_OBJ.ActiveDocument.ShowRevisions = showhj; //是否显示修改痕迹
		if(all){
			OFFICE_CONTROL_OBJ.ActiveDocument.Protect(1, true, g_wordpass); //完全文档保护模式，不可编辑
		}else{
			OFFICE_CONTROL_OBJ.ActiveDocument.Protect(2, true, g_wordpass); //文档保护，2:可以编辑文本域窗体
		}
		
		OFFICE_CONTROL_OBJ.BorderStyle = "1";
		OFFICE_CONTROL_OBJ.activeDocument.saved = tb;
	} catch (err) {}

}

/**
 * a:是否打开修订模式，默认true
 * b：是否显示文档修改痕迹，默认true
 * c:是否关闭痕迹接收功能，默认false
 */
function setUnprotect(a,b,c) {
	try {
		
		 var openXd = (a == undefined) ? true:a;//打开修订模式
		 var showhj = (b == undefined) ? true :b;//显示文档修改痕迹
		 var closeRechj=(c == undefined)? false:c;//关闭痕迹接收功能
		if (OFFICE_CONTROL_OBJ && OFFICE_CONTROL_OBJ.ActiveDocument) {
			var tb = OFFICE_CONTROL_OBJ.activeDocument.saved; //保存文档是否保存标准
			if (OFFICE_CONTROL_OBJ.ActiveDocument.ProtectionType != -1) {
				OFFICE_CONTROL_OBJ.ActiveDocument.Unprotect(g_wordpass); //去除保护
			}

			OFFICE_CONTROL_OBJ.BorderStyle = "1";
			if (closeRechj) {
				OFFICE_CONTROL_OBJ.ActiveDocument.Protect(0, false, g_wordpass); 
			}
			OFFICE_CONTROL_OBJ.ActiveDocument.ShowRevisions = showhj;//是否显示文档修改痕迹
			OFFICE_CONTROL_OBJ.ActiveDocument.TrackRevisions = openXd;//是否打开修订
			OFFICE_CONTROL_OBJ.activeDocument.saved = tb;
		}
	} catch (err) {}

}


function printWord() {
	if (OFFICE_CONTROL_OBJ && OFFICE_CONTROL_OBJ.ActiveDocument) {
		OFFICE_CONTROL_OBJ.PrintOut()
	}
}



/**
 * 设置软行工具（是否可用打开本地文件）
 */
function setMenubar(bl) {
	try {
		OFFICE_CONTROL_OBJ.Menubar = true;
		OFFICE_CONTROL_OBJ.IsShowInsertMenu = false;
		OFFICE_CONTROL_OBJ.IsShowToolMenu = false;
		OFFICE_CONTROL_OBJ.IsShowHelpMenu = false;
		OFFICE_CONTROL_OBJ.IsShowEditMenu = false;
		OFFICE_CONTROL_OBJ.FileSave = false;
		//OFFICE_CONTROL_OBJ.FileSaveAs=false;
		//OFFICE_CONTROL_OBJ.FileOpen =bl; //设置打开菜单
		OFFICE_CONTROL_OBJ.FileOpen = false; //设置打开菜单
		OFFICE_CONTROL_OBJ.FileNew = false; //设置新建菜单
		OFFICE_CONTROL_OBJ.FileProperties = false; //设置属性菜单	
		OFFICE_CONTROL_OBJ.FileClose = false; //设置关闭菜单
	} catch (err) {}
}
/**
 *  打开或者关闭修订模式
 * @param {Object} boolvalue
 */
function TANGER_OCX_SetReviewMode(boolvalue) {
	try {
		if (!OFFICE_CONTROL_OBJ)
			OFFICE_CONTROL_OBJ = document.all.TANGER_OCX;

		if (OFFICE_CONTROL_OBJ.ActiveDocument.ProtectionType != -1 && !boolvalue) {
			OFFICE_CONTROL_OBJ.ActiveDocument.Unprotect(g_wordpass); //去除保护
		} else if (boolvalue) {
			OFFICE_CONTROL_OBJ.ActiveDocument.Protect(0, false, g_wordpass); //文档保护为修订模式,记录痕迹，不允许用户界面关闭痕迹功能
		} else {
			var tb = OFFICE_CONTROL_OBJ.activeDocument.saved; //保存文档是否保存标准
			OFFICE_CONTROL_OBJ.ActiveDocument.TrackRevisions = boolvalue;
			OFFICE_CONTROL_OBJ.activeDocument.saved = tb;
		}
	} catch (error) {}
}


//放大浏览区
function amplification() {
	var height = parseInt(document.all.TANGER_OCX.style.height + 0);
	if (height < 500) {
		document.all.TANGER_OCX.style.height = 500;
	}
	document.all.TANGER_OCX.style.height = parseInt(document.all.TANGER_OCX.style.height + 0) + 100;
}
//缩小浏览区
function narrow() {
	var height = parseInt(document.all.TANGER_OCX.style.height) - 100;
	if (height >= 500) {
		document.all.TANGER_OCX.style.height = height;
	} else {
		document.all.TANGER_OCX.style.height = 500;
	}
}
// 接受所有的修订（前提也是在修订模式开启的状态下使用）
function acceptallchange() {
	var tb = OFFICE_CONTROL_OBJ.activeDocument.saved; //保存文档是否保存标准
	OFFICE_CONTROL_OBJ.ActiveDocument.TrackRevisions = true; //打开修订模式
	OFFICE_CONTROL_OBJ.ActiveDocument.AcceptAllRevisions();
	OFFICE_CONTROL_OBJ.activeDocument.saved = tb;
}

/**
 * 进入或退出强制痕迹保留状态，调用该函数下面定义的两个函数。一般可直接调用本函数
 * @param {Object} boolvalue
 */
function TANGER_OCX_SetMarkModify(boolvalue) {
	try {
		//先设置是否留痕，再设置是否显示审阅工具栏
		var tb = OFFICE_CONTROL_OBJ.activeDocument.saved; //保存文档是否保存标准
		TANGER_OCX_SetReviewMode(boolvalue);
		TANGER_OCX_EnableReviewBar(!boolvalue);
		OFFICE_CONTROL_OBJ.activeDocument.saved = tb;
	} catch (error) {}
}
/**
 * 允许或和工禁止显示修订工具栏具菜单
 * @param {Object} boolvalue
 */
function TANGER_OCX_EnableReviewBar(boolvalue) {
	try {

		OFFICE_CONTROL_OBJ.ActiveDocument.CommandBars("Reviewing").Enabled = boolvalue;
		OFFICE_CONTROL_OBJ.ActiveDocument.CommandBars("Track Changes").Enabled = boolvalue;
		OFFICE_CONTROL_OBJ.IsShowToolMenu = boolvalue; //关闭或打开工具菜单

	} catch (error) {}
}



/**
 * 设置书签的值
 * @param {Object} markName 书签名称
 * @param {Object} markValue 值
 */
function setBookMarkValue(BookMarkName, inputValue) {
	//do copy
	//DEBUG
	try {
		var bookMarks = OFFICE_CONTROL_OBJ.ActiveDocument.Bookmarks;
		if (bookMarks.count <= 0) return;
		var bkmkObj = bookMarks(BookMarkName);
		if (!bkmkObj) {
			//alert("Word 模板中不存在名称为：\""+BookMarkName+"\"的书签！");
		} else {
			var saverange = bkmkObj.Range
			saverange.Text = inputValue;
			bookMarks.Add(BookMarkName, saverange);
		}
	} catch (e) {}
}


//增加图片水印,参数url为绝对url,tag:不为空时，为手动添加水印
function addWaterMarkPicNew(URL, tag) {
	if (tag && !confirm('请确定合同正文中不存在水印!!')) {
		return false
	}
	try {
		//OFFICE_CONTROL_OBJ为控件对象
		if (!OFFICE_CONTROL_OBJ || !OFFICE_CONTROL_OBJ.activeDocument)
			return "";
		setUnprotect2();
		var ActiveDocument = OFFICE_CONTROL_OBJ.ActiveDocument;
		for (i = 1; i <= ActiveDocument.Sections.Count; i++) {
			ActiveDocument.Sections(i).Range.Select();
			ActiveDocument.ActiveWindow.ActivePane.View.SeekView = 9; //wdSeekCurrentPageHeader
			var Selection = ActiveDocument.Application.Selection;
			//url只能为绝对url
			Selection.HeaderFooter.Shapes.AddPicture(URL, false, true).Select();
			Selection.ShapeRange.Name = "WordPictureWatermark1";
			Selection.ShapeRange.PictureFormat.Brightness = 0.9;
			Selection.ShapeRange.PictureFormat.Contrast = 0.3;
			Selection.ShapeRange.LockAspectRatio = true;
			Selection.ShapeRange.Height = ActiveDocument.Application.CentimetersToPoints(4.13);
			Selection.ShapeRange.Width = ActiveDocument.Application.CentimetersToPoints(16.52);
			Selection.ShapeRange.WrapFormat.AllowOverlap = true;
			Selection.ShapeRange.WrapFormat.Side = 3;
			Selection.ShapeRange.WrapFormat.Type = 3;
			Selection.ShapeRange.RelativeHorizontalPosition = 0;
			Selection.ShapeRange.RelativeVerticalPosition = 0;
			Selection.ShapeRange.Left = -999995; //wdShapeCenter
			Selection.ShapeRange.Top = -999995; //wdShapeCenter
			ActiveDocument.ActiveWindow.ActivePane.View.SeekView = 0; //wdSeekMainDocument
			break;
		}
	} catch (err) {
		//alert("addWaterMarkPicNew errir:" + err.number + ":" + err.description);
	}
}


/*
 * 创建表格(在word中创建表格)
 * @param {Object} cols 列数
 * @param {Object} rows 行数
 */
function createTable(cols, rows) {
	//生成基础表格
	var docobj = OFFICE_CONTROL_OBJ.ActiveDocument;
	var sel = docobj.Application.Selection;
	docobj.Tables.Add(sel.Range, rows, cols, 1, 0);

}
/*
 * 创建表格(在word指定书签处创建表格)
 * @param {Object} cols
 * @param {Object} rows
 * @param {Object} markName 书签名称
 */
function createTableInertMark(cols, rows, markName) {
	var docobj = OFFICE_CONTROL_OBJ.ActiveDocument;
	//生成基础表格 
	var bkmkObj = OFFICE_CONTROL_OBJ.ActiveDocument.BookMarks(markName);
	docobj.Tables.Add(bkmkObj.Range, rows, cols, 1, 0);
}
/*
 * 设置表格单元text
 * @param {Object} tabObj 表格对象（OFFICE_CONTROL_OBJ.ActiveDocument.Tables(1)获取word中第一个表格对象）
 * @param {Object} col 列号
 * @param {Object} row 行号
 */
function setTableCellText(tabObj, col, row, text) {
	tabObj.cell(col, row).Range.Text = text;
}

/*
 * 合同单元格
 * @param {Object} docobj word对象
 * @param {Object} tabSen word中第几个表格（从1开始）
 * @param {Object} col1 起始单元格列（从1开始）
 * @param {Object} row1 起始单元格行（从1开始）
 * @param {Object} col2 结束单元格列 （从1开始）
 * @param {Object} row2 结束单元格列 （从1开始）
 */
function MergeCell(docobj, tabSen, col1, row1, col2, row2) {
	docobj.range(docobj.Tables(tabSen).cell(col1, row1).range.Start, docobj.Tables(tabSen).cell(col2, row2).range.End).select();
	docobj.Application.Selection.Cells.Merge();
}

/*
 * 插入行
 * @param {Object} n 行数
 */
function addRow(n,row,col){
 OFFICE_CONTROL_OBJ.ActiveDocument.tables(1).cell(row,col).select();
 OFFICE_CONTROL_OBJ.ActiveDocument.application.selection.insertrowsbelow(n);//在这个表格所在行之后插入一行，如果想在前插入一行可用insertrowsabove(1)这个方法
}