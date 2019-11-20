<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<style>
.layui-laypage .layui-laypage-curr .layui-laypage-em{background-color: #1E9FFF}
#pag_div [lay-ignore]{display:block;}
</style>

<div id="pag_div" style="text-align:right;float: right;"></div>
<input type="hidden" name="page.currentPage" id="page_currentPage">
<input type="hidden" name="page.pageSize" id="page_pageSize">

<script>
window.onload=function (){
	layui.use('laypage', function(laypage){
		  laypage.render({
		    elem: 'pag_div', //注意，这里的 test1 是 ID，不用加 # 号
		    count: '${page.totalRecord}', //数据总数，从服务端得到
		    curr:'${page.currentPage}',//当前页
		    limit:'${page.pageSize}',
		    limits:[10,15,20, 30, 40, 50],
		    layout:['prev', 'page', 'next','skip','count','limit','refresh'],
		    jump: function(obj, first){
		        //首次不执行
		    	if(!first){
		    	 document.getElementById("page_currentPage").value=obj.curr;
		    	 document.getElementById("page_pageSize").value=obj.limit;
		    	 document.forms[0].submit();
		    	}
		      }
		  });
	});	
};	

  var currentPage='${page.currentPage}';
  if(currentPage!=''){
	  document.getElementById("page_currentPage").value=currentPage;
  }else{
	  document.getElementById("page_currentPage").value=1;
  }
  
  var pageSize='${page.pageSize}';
  if(pageSize!=''){
	  document.getElementById("page_pageSize").value=pageSize;
  }else{
	  document.getElementById("page_pageSize").value=10;
  }
  

</script>




