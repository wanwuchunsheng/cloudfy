// JavaScript Document

$(function(){
	$('#addSubmit').on('click', function(){
		onOK();	
	});	
})
function onOK()
{
   var text1 = $("#name");
   var text2 = $("#daima");
   var text3 = $("#station");
   var text4 = $("#job");
   if( text1.val().length == 0 )
   {
	  $("#mes1").show();
   }else{
	   $("#mes1").hide();
   }
    if( text2.val().length == 0 )
   {
	  $("#mes2").show();
   }else{  
	   $("#mes2").hide();
   }
     if( text4.val().length == 0 )
   {
	  $("#mes4").show();
   }else{  
	   $("#mes4").hide();
   }
   if( text3.value()=="" )
   {
	  $("#mes3").show();
   }else{
	  $("#mes3").hide();
   }
}

//获取焦点，失去焦点，#inp1是input框的id，自定义命名
$(function(){
	function focu(obj,value){
	if($(obj).val()==value){
			$(obj).val('');
			onOK();	
	}
};

function blu(obj,value){
	if($(obj).val()==''){
			$(obj).val(value);
	}
}
	$('#name').focus(function(){
		focu(this,'请填写您的姓名');
		})
		$('#name').blur(function(){
		blu(this,'请填写您的姓名');
		})
	$('#daima').focus(function(){
		focu(this,'请填写您的个人代码');
		})
		$('#daima').blur(function(){
		blu(this,'请填写您的个人代码');
		})
	$('#job').focus(function(){
		focu(this,'请填写您的个人代码');
		})
		$('#job').blur(function(){
		blu(this,'请填写您的个人代码');
		})
});