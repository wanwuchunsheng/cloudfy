/**
 * ccc问卷验证结果
 * v_wanchanghuang
 * 获得问卷名称和品牌，进入相应的方法判断
 * 返回1-通过   2-不通过   3-通过不满意  4-通过不满意   5-没有选中答案，直接提交
 * 
 * 
 * 400250017-CPL意向获取
 * 400250018-淘宝LEADS意向获取
 * 400250019-微博LEADS意向验证
 * 400250020-官网微信LEADS意向验证
 * 400250021-新车主MGM意向获取
 * 400250022-车主周年关怀调研
 * 400250023-俱乐部微信LEADS意向验证
 * 400250024-官网意向获取
 * 400250025-官网意向验证
 * 400250026-iBuick Leads意向验证
 * 400250027-线下活动意向获取
 * 400250028-车主周年关怀-被推荐人
 * 400250029-战败潜客抽查
 * 400250030-车展交车验证
 * 400250031-经销商跟进验证
 * 400250032-个人新车主验证
 * 400250033-机构新车主验证
 * 400250034-电商意向验证
 * 
 *  
 */

function resultButton(){
   //获取问卷名称
   var queNamet=$("#queCodet").val();
   //获取品牌
   var queBrandt=$("#queBrandt").val();

   //官方意向验证(别克、雪佛兰、卡迪拉克)
   if( (queNamet=='400250025' && queBrandt=='1') || (queNamet=='400250025' && queBrandt=='3') || (queNamet=='400250025' && queBrandt=='2')){
	   gwyxyz();
   }
   //电商意向验证(别克、雪佛兰、卡迪拉克)
   if( (queNamet=='400250034' && queBrandt=='1') || (queNamet=='400250034' && queBrandt=='3') || (queNamet=='400250034' && queBrandt=='2')){
	   gwyxyz();
   }
   //官方意向获取(别克、雪佛兰、卡迪拉克)
   if( (queNamet=='400250024' && queBrandt=='1') || (queNamet=='400250024' && queBrandt=='3') || (queNamet=='400250024' && queBrandt=='2')){
	   gwyxyz();
   }
   //淘宝leads意向获取(1-别克)
   if(queNamet=='400250018' && queBrandt=='1'){
	   gwyxyz();
   }
   //iBuick Leads意向验证(1-别克)
   if(queNamet=='400250026' && queBrandt=='1'){
	   gwyxyz();
   }
   //微博leads意向验证(1-别克,3-卡迪拉克)
   if( (queNamet=='400250019' && queBrandt=='1') || (queNamet=='400250019' && queBrandt=='3')){
	   gwyxyz();
   }
   //微信LEADS意向验证（凯迪）  (*官方微信和俱乐部微信)
   if( (queNamet=='400250020' && queBrandt=='3') || (queNamet=='400250023' && queBrandt=='3')){
	   wxyxyzt();
   }
  
   //cpl意向获取（别克、雪佛兰）
   if((queBrandt=='1' && queNamet=="400250017") || (queBrandt=='2' && queNamet=="400250017")){
	   //cplyxhq();
	   $("#questionnaireValue").val("1"); //无需验证，直接通过
   }
   //个人新车主验证（别克、凯迪拉克）
   if((queBrandt=='1' && queNamet=="400250032")){
	   grxczyz1();
   }
   if((queBrandt=='3' && queNamet=="400250032")){
	   grxczyz3();
   }
   //机构新车主验证（别克、凯迪拉克）
   if((queBrandt=='1' && queNamet=="400250033")){
	   grxczyz1();
   }
   if((queBrandt=='3' && queNamet=="400250033")){
	   grxczyz3();
   }
   //新车主MGM意向获取（凯迪拉克）
   if((queBrandt=='3' && queNamet=="400250021")){
	   xczmgmyxhq3();
   }
   
   //经销商跟进验证（别克、雪佛兰、凯迪拉克）
   if((queBrandt!='' && queBrandt!=0 && queNamet=="400250031")){
	   jxsgjyz();
   }
   //车展交车验证（别克、雪佛兰、凯迪拉克）
   if((queBrandt!='' && queBrandt!=0 && queNamet=="400250030")){
	   czjcyz();
   }
   //车主周年关怀调研（别克、雪佛兰）
   if((queBrandt=='1' && queNamet=="400250022") || (queBrandt=='2' && queNamet=="400250022")){
	   czznghdy();
   }
   //线下活动数据意向获取（雪佛兰）
   if(queBrandt=='2' && queNamet=="400250027"){
	   //xxhdsjyxhq();
	   $("#questionnaireValue").val("1"); //无需验证，直接通过
   }
   //车主周年关怀-被推荐人（别克、雪佛兰）
   if(queBrandt=='1' && queNamet=="400250028"){
	   czznghBtjr1();
   }
   if(queBrandt=='2' && queNamet=="400250028"){
	   czznghBtjr2();
   }
   
}
  
/**
 * [官网意向验证（别克、雪佛兰、卡迪拉克）]
 * 同时满足：
 *	2.2“请问您预计的购车时间是三个月之内，三个月到半年，还是半年到一年呢?”回答为“三个月内”或“三到六个月”或“六到十二个月”
 *	2.4“您感兴趣的是上海通用汽车别克/雪佛兰/凯迪拉克品牌的什么车系呢？”回答为本品牌车系
 *	2.5“请问您目前是在哪个城市呢，我们这边可以为您安排就近的经销商为您提供试乘试驾”回答为本品牌上线经销商
 
 * */
function gwyxyz(){
	var res=0; //验证结果 1-成功  2-不成功   3-成功不满意  4-成功满意
	var check1=0; //0-未选中  1-选中
	var check2=0; //0-未选中  1-选中
	var check3=0; //0-未选中  1-选中
	var len=$("div[value='queresult2.2'] input[type='radio']");
    for (var t = 0; t < len.length; t++) {
		if (len.eq(t).attr("checked") == "checked") {
		    var val=len.eq(t).val();
		    var len1=val.indexOf("三个月");
		    var len2=val.indexOf("六个月");
		    var len3=val.indexOf("十二个月");
		    if(len1!=-1 || len2!=-1 || len3!=-1){
		    	check1=1;
		    }else{
		    	check1=0;
		    }
		}
    } 
    var len=$("div[value='queresult2.4'] input[type='radio']");
    for (var t = 0; t < len.length; t++) {
		if (len.eq(t).attr("checked") == "checked") {
		    var val=len.eq(t).val();
		    var len1=val.indexOf("不"); //
		    var len2=val.indexOf("否");
		    if(len1==-1 || len2==-1 ){
		    	check2=1;
		    }else{
		    	check2=0;
		    }
		}
    } 
    var len=$("div[value='queresult2.5'] input[type='radio']");
    for (var t = 0; t < len.length; t++) {
		if (len.eq(t).attr("checked") == "checked") {
		    var val=len.eq(t).val();
		    var len1=val.indexOf("不"); //
		    var len2=val.indexOf("否");
		    if(len1==-1 || len2==-1){
		    	check3=1;
		    }else{
		    	check3=0;
		    }
		}
    } 
    //alert(check1+"/"+check2+"/"+check3);
    if(check1==1 && check2==1 && check3==1){
    	res=1;
    }else{
    	res=2;
    }
    $("#questionnaireValue").val(res);
}



/**
 * [微信LEADS意向验证（凯迪）  (*官方微信和俱乐部微信)]
	同时满足：
	2.2“请问您预计的购车时间是三个月之内，三个月到半年，还是半年到一年呢?”回答为“三个月内”或“三到六个月”或“六到十二个月”
	2.1“您感兴趣的车型是不是别克的**车？”回答为凯迪车型
	2.3“您选择试驾的经销商是否是*****？”回答为凯迪上线经销商
 
 * */
function wxyxyzt(){
	var res=0; //验证结果 1-成功  2-不成功   3-成功不满意  4-成功满意
	var check1=0; //0-未选中  1-选中
	var check2=0; //0-未选中  1-选中
	var check3=0; //0-未选中  1-选中
	var len=$("div[value='queresult2.2'] input[type='radio']");
    for (var t = 0; t < len.length; t++) {
		if (len.eq(t).attr("checked") == "checked") {
		    var val=len.eq(t).val();
		    var len1=val.indexOf("三个月");
		    var len2=val.indexOf("六个月");
		    var len3=val.indexOf("十二个月");
		    if(len1!=-1 || len2!=-1 || len3!=-1){
		    	check1=1;
		    }else{
		    	check1=0;
		    }
		}
    } 
    var len=$("div[value='queresult2.1'] input[type='radio']");
    for (var t = 0; t < len.length; t++) {
		if (len.eq(t).attr("checked") == "checked") {
		    var val=len.eq(t).val();
		    var len1=val.indexOf("不"); //不感兴趣  ， 不是
		    var len2=val.indexOf("否");
		    if(len1==-1 || len2==-1 ){
		    	check2=1;
		    }else{
		    	check2=0;
		    }
		}
    } 
    var len=$("div[value='queresult2.3'] input[type='radio']");
    for (var t = 0; t < len.length; t++) {
		if (len.eq(t).attr("checked") == "checked") {
		    var val=len.eq(t).val();
		    var len1=val.indexOf("不"); //
		    var len2=val.indexOf("否");
		    if(len1!==-1 || len2==-1){
		    	check3=1;
		    }else{
		    	check3=0;
		    }
		}
    } 
    //alert(check1+"/"+check2+"/"+check3);
    if(check1==1 && check2==1 && check3==1){
    	res=1;
    }else{
    	res=2;
    }
    $("#questionnaireValue").val(res);
}





/**
 * [cpl意向获取（别克、雪佛兰）]
 * 同时满足：
 *	2.3“请问您预计的购车时间是三个月之内，三个月到半年，还是半年到一年呢?”回答为“三个月内”或“三到六个月”或“六到十二个月”
 *	2.2“您感兴趣的是上海通用汽车别克/雪佛兰/凯迪拉克品牌的什么车系呢？”回答为本品牌车系
 *	2.4“请问您目前是在哪个城市呢，我们这边可以为您安排就近的经销商为您提供试乘试驾”回答为本品牌上线经销商
 
 * */
function cplyxhq(){
	var res=0; //验证结果 1-成功  2-不成功   3-成功不满意  4-成功满意
	var check1=0; //0-未选中  1-选中
	var check2=0; //0-未选中  1-选中
	var check3=0; //0-未选中  1-选中
	var len=$("div[value='queresult2.3'] input[type='radio']");
    for (var t = 0; t < len.length; t++) {
		if (len.eq(t).attr("checked") == "checked") {
		    var val=len.eq(t).val();
		    var len1=val.indexOf("三个月");
		    var len2=val.indexOf("六个月");
		    var len3=val.indexOf("十二个月");
		    if(len1!=-1 || len2!=-1 || len3!=-1){
		    	check1=1;
		    }else{
		    	check1=0;
		    }
		}
    } 
    var len=$("div[value='queresult2.4'] input[type='radio']");
    for (var t = 0; t < len.length; t++) {
		if (len.eq(t).attr("checked") == "checked") {
		    var val=len.eq(t).val();
		    var len1=val.indexOf("需要"); //
		    if(len1!=-1){
		    	check2=1;
		    }else{
		    	check2=0;
		    }
		}
    } 
    var len=$("div[value='queresult2.2'] input[type='radio']");
    for (var t = 0; t < len.length; t++) {
		if (len.eq(t).attr("checked") == "checked") {
		    var val=len.eq(t).val();
		    var len1=val.indexOf("是");
		    if(len1!=-1){
		    	check3=1;
		    }else{
		    	check3=0;
		    }
		}
    } 
    //alert(check1+"/"+check2+"/"+check3);
    if(check1==1 && check2==1 && check3==1){
    	res=1;
    }else{
    	res=2;
    }
    $("#questionnaireValue").val(res);
}
   

/**
 * [个人新车主验证（别克、凯迪拉克）]
	（别克）同时满足：
	1.4“是否是在**年**月**日购买了一辆**颜色的上海通用别克**”回答为“是”
	2.2.1“您的全名是”回答为“是”
	（凯迪拉克）同时满足：
	2.1.1“您购买的这台凯迪拉克是什么车型”回答为“一致”
	2.1.2“请问您是在今年几月几号购买的”回答为“一致”
	2.1.3“请问您所购买的这台凯迪拉克是什么颜色的”回答为“一致”
 * */
//别克
function grxczyz1(){
	var res=0; //验证结果 1-成功  2-不成功   3-成功不满意  4-成功满意
	var check1=0; //0-未选中  1-选中
	var check2=0; //0-未选中  1-选中
	var len=$("div[value='queresult1.4'] input[type='radio']");
    for (var t = 0; t < len.length; t++) {
		if (len.eq(t).attr("checked") == "checked") {
			var val=len.eq(t).val();
		    var len1=val.indexOf("是");
		    if(len1!=-1){
		    	check1=1;
		    }else{
		    	check1=0;
		    }
		}
    } 
    var len=$("div[value='queresult2.2.1'] input[type='radio']");
    for (var t = 0; t < len.length; t++) {
		if (len.eq(t).attr("checked") == "checked") {
		    var val=len.eq(t).val();
		    var len1=val.indexOf("是");
		    if(len1!=-1){
		    	check2=1;
		    }else{
		    	check2=0;
		    }
		}
    } 
    //alert(check1+"/"+check2+"/"+check3);
    if(check1==1 && check2==1){
    	res=1;
    }else{
    	res=2;
    }
    $("#questionnaireValue").val(res);
}
//凯迪拉克
function grxczyz3(){
	var res=0; //验证结果 1-成功  2-不成功   3-成功不满意  4-成功满意
	var check1=0; //0-未选中  1-选中
	var check2=0; //0-未选中  1-选中
	var check3=0; //0-未选中  1-选中
    var len=$("div[value='queresult2.1.1'] input[type='radio']");
    for (var t = 0; t < len.length; t++) {
		if (len.eq(t).attr("checked") == "checked") {
		    var val=len.eq(t).val();
		    var len1=val.indexOf("不一致");
		    if(len1==-1){
		    	check1=1;
		    }else{
		    	check1=0;
		    }
		}
    } 
    var len=$("div[value='queresult2.1.2'] input[type='radio']");
    for (var t = 0; t < len.length; t++) {
		if (len.eq(t).attr("checked") == "checked") {
		    var val=len.eq(t).val();
		    var len1=val.indexOf("不一致");
		    if(len1==-1){
		    	check2=1;
		    }else{
		    	check2=0;
		    }
		}
    } 
    var len=$("div[value='queresult2.1.3'] input[type='radio']");
    for (var t = 0; t < len.length; t++) {
		if (len.eq(t).attr("checked") == "checked") {
		    var val=len.eq(t).val();
		    var len1=val.indexOf("不一致");
		    if(len1==-1){
		    	check3=1;
		    }else{
		    	check3=0;
		    }
		}
    } 
    //alert(check1+"/"+check2+"/"+check3);
    if(check1==1 && check2==1 && check3==1){
    	res=1;
    }else{
    	res=2;
    }
    $("#questionnaireValue").val(res);
}


/**
 * [新车主MGM意向获取（凯迪拉克）]
	同时满足：
	2.2“请问您在多久之内有购车计划呢？”回答为“三个月内”或“三到六个月”或“六到十二个月”
	2.1“请问您对凯迪拉克哪款车型比较感兴趣呢？”回答为凯迪拉克车系
	3.3.2“这里就为您安排***省***市***路***号的***经销商您看可以吗？”回答为可以
 * */
function xczmgmyxhq3(){
	var res=0; //验证结果 1-成功  2-不成功   3-成功不满意  4-成功满意
	var check1=0; //0-未选中  1-选中
	var check2=0; //0-未选中  1-选中
	var check3=0; //0-未选中  1-选中
	var len=$("div[value='queresult2.2'] input[type='radio']");
    for (var t = 0; t < len.length; t++) {
		if (len.eq(t).attr("checked") == "checked") {
		    var val=len.eq(t).val();
		    var len1=val.indexOf("三个月");
		    var len2=val.indexOf("六个月");
		    var len3=val.indexOf("十二个月");
		    if(len1!=-1 || len2!=-1 || len3!=-1){
		    	check1=1;
		    }else{
		    	check1=0;
		    }
		}
    } 
    var len=$("div[value='queresult2.1'] input[type='radio']");
    for (var t = 0; t < len.length; t++) {
		if (len.eq(t).attr("checked") == "checked") {
		    var val=len.eq(t).val();
		    var len1=val.indexOf("不");
		    if(len1==-1){
		    	check2=1;
		    }else{
		    	check2=0;
		    }
		}
    } 
    var len=$("div[value='queresult3.3.2'] input[type='radio']"); //此答案可能是 ：凯迪拉克系列
    for (var t = 0; t < len.length; t++) {
		if (len.eq(t).attr("checked") == "checked") {
		    var val=len.eq(t).val();
		    var len1=val.indexOf("是");
		    var len2=val.indexOf("凯迪拉克");
		    if(len1!=-1 || len2!=-1){
		    	check3=1;
		    }else{
		    	check3=0;
		    }
		}
    } 
    //alert(check1+"/"+check2+"/"+check3);
    if(check1==1 && check2==1 && check3==1){
    	res=1;
    }else{
    	res=2;
    }
    $("#questionnaireValue").val(res);
}



/**
 * [车展交车验证（别克、雪佛兰、凯迪拉克）]
	同时满足：
	2.1“请问您是否参加了今年*月上/中/下旬的***（城市）车展”回答为“是”
	2.2“请问您在车展期间购买的别克/雪佛兰/凯迪拉克是否已经提车了”回答为“是”
 * */
function czjcyz(){
	var res=0; //验证结果 1-成功  2-不成功   3-成功不满意  4-成功满意
	var check1=0; //0-未选中  1-选中
	var check2=0; //0-未选中  1-选中
	var len=$("div[value='queresult2.1'] input[type='radio']");
    for (var t = 0; t < len.length; t++) {
		if (len.eq(t).attr("checked") == "checked") {
			var val=len.eq(t).val();
		    var len1=val.indexOf("是");
		    if(len1!=-1){
		    	check1=1;
		    }else{
		    	check1=0;
		    }
		}
    } 
    var len=$("div[value='queresult2.2'] input[type='radio']");
    for (var t = 0; t < len.length; t++) {
		if (len.eq(t).attr("checked") == "checked") {
		    var val=len.eq(t).val();
		    var len1=val.indexOf("是");
		    if(len1!=-1){
		    	check2=1;
		    }else{
		    	check2=0;
		    }
		}
    } 
    //alert(check1+"/"+check2);
    if(check1==1 && check2==1){
    	res=1;
    }else{
    	res=2;
    }
    $("#questionnaireValue").val(res);
}

/**
 * [车主周年关怀调研（别克、雪佛兰）]
	同时满足：
 * */
function czznghdy(){ //1-直接验证通过 
	 $("#questionnaireValue").val('1');
}

/**
 * [线下活动数据意向获取（别克、雪佛兰）]
 *	雪佛兰/同时满足：
 *	2.1“请问您对雪佛兰哪款车型比较感兴趣呢？”回答为雪佛兰车型
 *	2.2“请问您预计的购车时间是多久呢?”回答为“三个月内、三到六个月、六到十二个月”
 *	2.4.1“请问您在哪个省市？为您查询当地的经销商？”回答为雪佛兰上线经销商
 *	别克/同时满足：
 *	2.3“请问您对别克哪款车型比较感兴趣呢？”回答为别克车型
 *	2.4 "请问您预计的购车时间是多久呢?”回答为“三个月内、三到六个月、六到十二个月”
 *	2.6“请问您在哪个省市？为您查询当地的经销商？”回答为别克上线经销商
 * */
function czznghBtjr1(){
	var res=0; //验证结果 1-成功  2-不成功   3-成功不满意  4-成功满意
	var check1=0; //0-未选中  1-选中
	var check2=0; //0-未选中  1-选中
	var check3=0; //0-未选中  1-选中
	var len=$("div[value='queresult2.3'] input[type='radio']");
    for (var t = 0; t < len.length; t++) {
		if (len.eq(t).attr("checked") == "checked") {
		    var val=len.eq(t).val();
		    var len1=val.indexOf("不");
		    if(len1==-1 ){
		    	check1=1;
		    }else{
		    	check1=0;
		    }
		}
    } 
    var len=$("div[value='queresult2.4'] input[type='radio']");
    for (var t = 0; t < len.length; t++) {
		if (len.eq(t).attr("checked") == "checked") {
			var val=len.eq(t).val();
		    var len1=val.indexOf("三个月");
		    var len2=val.indexOf("六个月");
		    var len3=val.indexOf("十二个月");
		    if(len1!=-1 || len2!=-1 || len3!=-1){
		    	check2=1;
		    }else{
		    	check2=0;
		    }
		}
    } 
    var len=$("div[value='queresult2.6'] input[type='text']").val();
    if(len!=""){
    	check3=1;
    }else{
    	check3=0;
    }
	
    //alert(check1+"/"+check2+"/"+check3);
    if(check1==1 && check2==1 && check3==1){
    	res=1;
    }else{
    	res=2;
    }
    $("#questionnaireValue").val(res);
}

function czznghBtjr2(){
	var res=0; //验证结果 1-成功  2-不成功   3-成功不满意  4-成功满意
	var check1=0; //0-未选中  1-选中
	var check2=0; //0-未选中  1-选中
	var check3=0; //0-未选中  1-选中
	var len=$("div[value='queresult2.1'] input[type='radio']");
    for (var t = 0; t < len.length; t++) {
		if (len.eq(t).attr("checked") == "checked") {
		    var val=len.eq(t).val();
		    var len1=val.indexOf("不");
		    if(len1==-1 ){
		    	check1=1;
		    }else{
		    	check1=0;
		    }
		}
    } 
    var len=$("div[value='queresult2.2'] input[type='radio']");
    for (var t = 0; t < len.length; t++) {
		if (len.eq(t).attr("checked") == "checked") {
			var val=len.eq(t).val();
		    var len1=val.indexOf("三个月");
		    var len2=val.indexOf("六个月");
		    var len3=val.indexOf("十二个月");
		    if(len1!=-1 || len2!=-1 || len3!=-1){
		    	check2=1;
		    }else{
		    	check2=0;
		    }
		}
    } 
    var len=$("div[value='queresult2.4.1'] input[type='text']").val();
    if(len!=""){
    	check3=1;
    }else{
    	check3=0;
    }

    //alert(check1+"/"+check2+"/"+check3);
    if(check1==1 && check2==1 && check3==1){
    	res=1;
    }else{
    	res=2;
    }
    $("#questionnaireValue").val(res);
}


/**
 * [线下活动数据意向获取（雪佛兰）]
	同时满足：
	2.1“您在填写的问卷中表示对我們的XX车型比较感兴趣，是吗”回答为“是的”或雪佛兰其他车型
	2.2“那您是计划在购车时间是xx？”回答为“三个月内”或“三到六个月”或“六到十二个月”或“如果试乘试驾各方面都满意的话，您是否会缩短购车时间呢”回答为“是的”
	2.6“请问您目前是在哪个城市呢，我们这边可以为您安排就近的经销商为您提供试乘试驾”回答为雪佛兰活动地区上线经销商
 * */
function xxhdsjyxhq(){
	var res=0; //验证结果 1-成功  2-不成功   3-成功不满意  4-成功满意
	var check1=0; //0-未选中  1-选中
	var check2=0; //0-未选中  1-选中
	var check3=0; //0-未选中  1-选中
	var len=$("div[value='queresult2.1'] input[type='radio']");
    for (var t = 0; t < len.length; t++) {
		if (len.eq(t).attr("checked") == "checked") {
			var val=len.eq(t).val();
		    var len1=val.indexOf("是");
		    var len2=val.indexOf("雪佛兰");
		    if(len1!=-1 || len2!=-1){
		    	check1=1;
		    }else{
		    	check1=0;
		    }
		}
    } 
    var len=$("div[value='queresult2.2'] input[type='radio']");
    for (var t = 0; t < len.length; t++) {
		if (len.eq(t).attr("checked") == "checked") {
			var val=len.eq(t).val();
		    var len1=val.indexOf("三个月");
		    var len2=val.indexOf("六个月");
		    var len3=val.indexOf("十二个月");
		    if(len1!=-1 || len2!=-1 || len3!=-1){
		    	check2=1;
		    }else{
		    	check2=0;
		    }
		}
    } 
    var len=$("div[value='queresult2.6'] input[type='radio']");
    for (var t = 0; t < len.length; t++) {
		if (len.eq(t).attr("checked") == "checked") {
		    var val=len.eq(t).val();
		    var len1=val.indexOf("雪佛兰活动地区上线经销商");
		    if(len1!=-1){
		    	check3=1;
		    }else{
		    	check3=0;
		    }
		}
    } 
    //alert(check1+"/"+check2+"/"+check3);
    if(check1==1 && check2==1 && check3==1){
    	res=1;
    }else{
    	res=2;
    }
    $("#questionnaireValue").val(res);
}


/**
 * [经销商跟进验证（别克、雪佛兰、凯迪拉克）]
	同时满足：
	2.1“请问最近别克/雪佛兰/凯迪拉克经销商是否有联系过您呢？”或2.3“经销商是否电话、短信联系过” 回答为“联系过”
	2.2“您对经销商的服务态度满意么”回答为否
	同时满足：
	2.1“请问最近别克/雪佛兰/凯迪拉克经销商是否有联系过您呢？”或2.3“经销商是否电话、短信联系过” 回答为“联系过”
	2.2“您对经销商的服务态度满意么”回答为是
 * */
function jxsgjyz(){
	var res=0; //验证结果 1-成功  2-不成功   3-成功不满意  4-成功满意
	var check1=0; //0-未选中  1-选中
	var check2=0; //0-未选中  1-选中
	var check3=0; //0-未选中  1-选中
	var len=$("div[value='queresult2.1'] input[type='radio']");
    for (var t = 0; t < len.length; t++) {
		if (len.eq(t).attr("checked") == "checked") {
			var val=len.eq(t).val();
		    var len1=val.indexOf("是");
		    var len2=val.indexOf("联系过");
		    var len3=val.indexOf("有");
		    if(len1!=-1 || len2!=-1 || len3!=-1){
		    	check1=1;
		    }else{
		    	check1=0;
		    }
		}
    } 
    var len=$("div[value='queresult2.3'] input[type='radio']");
    for (var t = 0; t < len.length; t++) {
		if (len.eq(t).attr("checked") == "checked") {
		    var val=len.eq(t).val();
		    var len1=val.indexOf("是");
		    var len2=val.indexOf("联系过");
		    var len3=val.indexOf("有");
		    if(len1!=-1 || len2!=-1 || len3!=-1){
		    	check2=1;
		    }else{
		    	check2=0;
		    }
		}
    } 
    var len=$("div[value='queresult2.2'] input[type='radio']");
    for (var t = 0; t < len.length; t++) {
		if (len.eq(t).attr("checked") == "checked") {
		    var val=len.eq(t).val();
		    var len1=val.indexOf("是");
		    var len2=val.indexOf("否");
		    if(len1!=-1 || len2!=-1){
		    	check3=1;
		    }else{
		    	check3=0;
		    }
		}
    } 
    if( (check1==1 && check3==1) || (check2==1 && check3==1) ){
    	res=3;
    }else{
    	res=4;
    }
    $("#questionnaireValue").val(res);
}






















