
/**
 * 【功能说明】：web分页  
 * @author vchanghuang
 * @time 2015-4-9 14:35:26
 * 
 * 在线商城 不同商标的共用链接
 * 
 * */
function pageBut(index,path,reqt){
	var url=path+"/web/"+reqt+".htm?index=" + index;
	window.location.href=url;
}


/**
 * [功能说明]：进入后端登录界面
 * 
 * @author v_wanchanghuang
 * @time 2015年4月16日 13:40:58
 * 
 * */
function loginHd(index,path){
	var url=index+"/data/login.html";
	window.open(url);
}




/**
 * [功能说明]：控制iframe自适应高度
 * 
 * @author v_wanchanghuang
 * @time 2015-4-9 16:15:40
 * 
 * */
/*$(function(){
  $('#iframeCenter', parent.document ).height( $('#ifrmHgtf').height() );

});
*/



	
	  