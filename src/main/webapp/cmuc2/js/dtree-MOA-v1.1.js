
/*--------------------------------------------------|
| dTree 2.05 | www.destroydrop.com/javascript/tree/ |
|---------------------------------------------------|
| Copyright (c) 2002-2003 Geir Landr�               |
|                                                   |
| This script can be used freely as long as all     |
| copyright messages are intact.                    |
|                                                   |
| Updated: 17.04.2003                               |
|--------------------------------------------------*/

/**
 * 节点初始化函数
 * @param {Object} id 对象ID
 * @param {Object} name 对象名称
 * @param {Object} type 对象类型
 * @param {Object} pid 对象父类型
 * @param {Object} tag 为0时，点击节点的+号，异步加载子节点
 * @param {Object} url 为dbjs时，单击执行dbjs函数；dbdoJs：双击名称会执行dbdoJs函数；#：无任何动作
 * @param {Object} objData 目前存放的为namevalue
 * @param {Object} hc 是否有子节点
 * @param {Object} open 是否展开节点
 * @param {Object} icon 节点显示图片
 * @param {Object} iconOpen 节点展开时图片
 * @memberOf {TypeName} 
 */
function Node(id, name, type, pid,tag,url,objData,hc,open,icon, iconOpen){
	this.id = id;
	this.pid = pid;
	this.name = name;
	this.objData=objData;
	this.url = url;
	this.tag = tag;
	this.type = type;
	this.icon = typeof(icon)=='undefined'?'img/'+type+'_close.gif':icon;
	this.iconOpen = typeof(iconOpen)=='undefined'?'img/'+type+'_open.gif':iconOpen;
	this._io = open || false;  //是否展开
	this._is = false;   //是否选中
	this._ls = false;
	if(hc==null){
	  	this._hc =true;
	}else{
		this._hc = hc   //是否有子节点
	}
	this._ai = 0;
	this._p;
}

// Tree object
function dTree(objName) {
	this.config = {target:null, folderLinks:true, useSelection:true, useCookies:true, useLines:true, useIcons:true, useStatusText:false, closeSameLevel:false, inOrder:false};
	this.icon = {root:"img/base.gif", folder:"img/folder.gif", folderOpen:"img/folderopen.gif", node:"img/page.gif", empty:"img/empty.gif", line:"img/line.gif", join:"img/join.gif", joinBottom:"img/joinbottom.gif", plus:"img/plus.gif", plusBottom:"img/plusbottom.gif", minus:"img/minus.gif", minusBottom:"img/minusbottom.gif", nlPlus:"img/nolines_plus.gif", nlMinus:"img/nolines_minus.gif"};
	this.obj = objName;
	this.aNodes = [];
	this.aIndent = [];
	this.root = new Node(-1);
	this.selectedNode = null;
	this.selectedFound = false;
	this.completed = false;
}

// Adds a new node to the node array
dTree.prototype.add = function (id, name, type, pid,tag,url,objData,hc,open,icon, iconOpen) {
	this.aNodes[this.aNodes.length] = new Node(id, name, type, pid,tag,url,objData,hc,open,icon, iconOpen);
};

// Open/close all nodes
dTree.prototype.openAll = function () {
	this.oAll(true);
};
dTree.prototype.closeAll = function () {
	this.oAll(false);
};

// Outputs the tree to the page
dTree.prototype.toString = function () {
	var str = "<ul>";
	if (document.getElementById) {
		var i=0
		for (i; i < this.aNodes.length; i++) {
			if (this.aNodes[i].pid ==0) {
				str+="<li id='li_node_"+i+"'><i class='space-i0'></i><i class='layui-icon layui-icon-down'><span>"+this.aNodes[i].name+"</span></i>";
				str += this.addNode(this.aNodes[i],1);
				str+="</li>";
				break;
			}
		}
	} else {
		str += "Browser not supported.";
	}
	str += "</ul>";
	return str;
};

// Creates the tree structure
dTree.prototype.addNode = function (pNode,level) {
	var i=0
	for (i; i < this.aNodes.length; i++) {
		if (this.aNodes[i].id == pNode.id) {
			break;
		}
	}
	
	var n = 0;
	var innerHtml='';
	for (n; n < this.aNodes.length; n++) {
		if (this.aNodes[n].pid == pNode.id) {
			var cn = this.aNodes[n];
			innerHtml += this.node(cn, n,level);
		}
	}
	var str="<ul id='ul_node_"+i+"'>"+innerHtml+"</ul>";
	return str;
};

// Creates the node icon, url and text
dTree.prototype.node = function (node,nodeId,level) {
	var str='';
	str +="<li id='li_node_"+nodeId+"'";	
	if('dbjs'==node.url){
		str +=" class='selli'>";
	}else{
		str+=" >"
	}
	var l=parseInt(level)+1;
	while(level>0){
		str +="<i class='space-i'></i>";
		level--;
	}

	if('person'!=node.type){
		str +="<i id='icon-"+node.id+"' class='layui-icon layui-icon-right' onclick=\"javascript:getChild('" + node.id + "','" + node.type + "','" + nodeId + "','"+l+"','icon-"+node.id+"');\" ></i><a";
		if ('dbjs'==node.url) {
			str+=" onclick=\"javascript:dbdoJs('" + node.id + "','" + node.objData+ "','" + node.pid + "')\""; 
		}else{
			str+=" onclick=\"javascript:getChild('" + node.id + "','" + node.type + "','" + nodeId + "','"+l+"','icon-"+node.id+"');\"";
		}
		str+=" style='position:absolute;right:40px;left:"+(l*20)+"px'>"+node.name+"</a>";	
	}else{
		str +="<a onclick=\"javascript:dbdoJs('" + node.id + "','" + node.objData+ "','" + node.pid + "')\" style='position:absolute;right:40px;left:"+((l-1)*20)+"px'>"+node.name+"</a>";
	}

	if ('dbjs'==node.url) 
	{	
		str +="<i class='layui-icon layui-icon-radio radio-i' id='i-"+node.id.replace('.','_')+"' onclick=\"javascript:dbdoJs('" + node.id + "','" + node.objData+ "','" + node.pid + "')\"></i>";
	} 
	
	str +="</li>";
	
	return str;
};
