
var validateCodeKey="MOBILE_VALIDATE_CODE_RESULT";

/*发送手机验证码*/
function sendValidateCode(){
	 $.ajax({
         url:contextPath+'/inbound/sendCode.json',
         type:'post',
         data:$("#requestInfoForm").serialize()+"&customer.cellPhNum="+$("#modify_cell_ph_num").val(),
         dataType:"json",
         success:function(data){
        	 $.Alert(data.message);
         },
         error:function(data){
             $.Alert(JSON.stringify(data));
         }
     });
}
/*验证用户输入验证码*/
function validateCode(secCode){
	 $.ajax({
        url:contextPath+'/inbound/validateCode.json',
        type:'post',
        data:$("#requestInfoForm").serialize()+"&customer.cellPhNum="+$("#modify_cell_ph_num").val()+"&secCode="+secCode,
        dataType:"json",
        success:function(data){
        	if("1"==data.message){
        		//验证成功
        		$.cookie(validateCodeKey,"TRUE","/");
        	}else{
        		$.cookie(validateCodeKey,"FALSE","/");
        	}
        },
        error:function(data){
        	$.cookie(validateCodeKey,"FALSE","/");
        }
    });
	 return false;
}
/*得到验证结果，并重置状态*/
function getValidateResult(){
	var secCode = gl.getCurVerifyCode();
	if(secCode==undefined  || secCode==null || secCode==''){
		$.Alert("未获取到用户验证码"); 
		return false;
	}
	validateCode(secCode);
	var result= $.cookie(validateCodeKey);
	var bRes=false;
    if(result!=undefined){
    	bRes=("TRUE"==result);
    }
    if(!bRes){
    	$.Alert('验证码错误或已过期，请重新获取验证码');
    }
	return bRes;
}
/*重置验证结果为false*/
function resetValidateResult(){
	gl.removeCurVerifyCode();
	$.cookie(validateCodeKey,"FALSE","/");
}