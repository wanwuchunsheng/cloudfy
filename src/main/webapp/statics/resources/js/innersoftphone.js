/**
 * Created by li_li on 2014/5/5.
 * 为签入页面提供拨打转接功能
 */

;(function(window,$){
	 
    var _innersoftphone={};
    //添加当前客户基础信息
    $.extend(_innersoftphone,{
        ocx:function(){
            var getOutBoundNo=function(no){
                    no=no+"";
                    if(no&&no.length>5){
                        $.ajax({
                            async: false,
                            url: window.contextPath + "/mobilephone/getoutboundno.json",
                            type: "post",
                            dataType: "json",
                            data: {
                                "phoneNo" :no
                            },
                            success: function(data){
                                if (data) {
                                    no = data.message + no;
                                }
                            }
                        });
                    }
                return no;
            };
            return {
                init:function(){
                  var phoneObject=new Array();
                phoneObject.push('  <OBJECT id="isphone"  classid="clsid:B0F6919C-1DD6-4F0A-949D-16F96C7E138C" ')
                  phoneObject.push('  width=0 height=0  align=center hspace=0 vspace=0 ')
                  phoneObject.push(' type="application/x-oleobject"> ')
                  phoneObject.push('   </OBJECT>')
                  window.document.write(phoneObject.join(""));
                },
                makeCall:function(no){
                    //如果坐席登陆失败禁止外呼
                    if(!gl.getCurAgentLoginSuccess()){
                        alert("您尚未签入电话系统，请退出系统重新登陆");
                    }else{
                        no=getOutBoundNo(no);
                        window.document.getElementById("isphone").MakeCall(no,"");
                    }
                },
                transfer:function(no){
                    no=getOutBoundNo(no);
                    window.document.getElementById("isphone").TransferCall(no,"");
                },
                completeTransfer:function(){
                    window.document.getElementById("isphone").completeTransfer();
                }
            };
        }()
    });
    _innersoftphone.ocx.init();
    var isp={
        makeCall:function(no){
            return _innersoftphone.ocx.makeCall(no);
        },
        transfer:function(no){
            return _innersoftphone.ocx.transfer(no);
        },
        completeTransfer:function(){
            return _innersoftphone.ocx.completeTransfer();
        }

    };
    window.isp=isp;

})(window,jQuery);