/**
 * Created by li_li on 2014/4/22.
 * 全局Js文件用来保存呼叫信息及客户信息
 * 同时提供一些电话技能功能调用
 */
;

(function(window,$){
    var _global={};
    var cookiepath={ path: "/"};
    //添加当前客户基础信息
    $.extend(_global,{
        curCust:function(){
            var curCusKey="CURRENT_CUSTOMER";
            var emptyCus={
             /*   custId:"4",custName:"李力",callNo:"13585505293",subInstId:"3",memberId:2,brand:"雪佛兰",custClass:"个人",custType:"新车主"*/
            };
            return {
                get:function(){
                   var curCusStr= $.cookie(curCusKey);
                   if(curCusStr==undefined){
                       return emptyCus;
                   }
                   return $.parseJSON(curCusStr);
                },
                set:function(curCusObj){
                    $.removeCookie(curCusKey,cookiepath);
                    if(typeof(curCusObj)=="object"){
                    //    console.log(JSON.stringify(curCusObj));
                        var curCusStr=JSON.stringify(curCusObj);
                        $.cookie(curCusKey,curCusStr,cookiepath);
                    }
                    else{
                        $.cookie(curCusKey,curCusObj,cookiepath);
                    }

                },
                remove:function(){
                    $.removeCookie(curCusKey,cookiepath);
                }
            };
        }()
    });
    //添加当前呼叫流水号
    $.extend(_global,{
        agentLoginSuccess:function(){
            var agentLoginKey="AGENT_LOGIN_SUCCESS_KEY";
            //坐席登陆状态，只有在坐席登陆成功的情况下才允许执行软电话功能
            var defaultLogin=false;
            return {
                get:function(){
                    var result= $.cookie(agentLoginKey);
                    if(result==undefined){
                        return defaultLogin;
                    }
                    return result;
                },
                set:function(result){
                    $.removeCookie(agentLoginKey,cookiepath);
                    $.cookie(agentLoginKey,result,cookiepath);
                },
                remove:function(){
                    $.removeCookie(agentLoginKey,cookiepath);
                }
            };
        }()
    });
    //添加当前操作员登陆信息
    $.extend(_global,{
        curOp:function(){
            var curOpKey="CURRENT_OPERATOR";
            var emptyOp={
              /* id:"1", loginId:"1",departmentId:"企业平台组",agentId:"61051",name:'测试',jobId:'1'*/
            };
            return {
                get:function(){
                    var curOpStr= $.cookie(curOpKey);
                    if(curOpStr==undefined){
                        return emptyOp;
                    }
                    return $.parseJSON(curOpStr);
                },
                set:function(curOpObj){
                    $.removeCookie(curOpKey,cookiepath);
                    if(typeof(curOpObj)=="object"){
                        var curCusStr=JSON.stringify(curOpObj);
                        $.cookie(curOpKey,curCusStr,cookiepath);
                    }
                    else{
                        $.cookie(curOpKey,curOpObj,cookiepath);
                    }
                },
                remove:function(){
                    $.removeCookie(curOpKey,cookiepath);
                }
            };
        }()
    });
    //添加当前呼叫流水号
    $.extend(_global,{
        curCallId:function(){
            var curCallId="CURRENT_CALLID";
            var emptyCallId="0";
            return {
                get:function(){
                    var callId= $.cookie(curCallId);
                    if(callId==undefined){
                        return emptyCallId;
                    }
                    return callId;
                },
                set:function(callId){
                        $.removeCookie(curCallId,cookiepath);
                        $.cookie(curCallId,callId,cookiepath);
                },
                remove:function(){
                    $.removeCookie(curCallId,cookiepath);
                }
            };
        }()
    });
    //设置当前验证码
    $.extend(_global,{
        curVerifyCode:function(){
            var verifyCodeKey="CURRENT_VERIFYCODE";
            var emptyVerifyCode="";
            return {
                get:function(){
                    var verifyCode= $.cookie(verifyCodeKey);
                    if(verifyCode==undefined){
                        return emptyVerifyCode;
                    }
                    return verifyCode;
                },
                set:function(verifyCode){
                        $.removeCookie(verifyCodeKey,cookiepath);
                        $.cookie(verifyCodeKey,verifyCode,cookiepath);
                },
                remove:function(){
                    $.removeCookie(verifyCodeKey,cookiepath);
                }
            };
        }()
    });
    var global={
		getCurVerifyCode:function(){
		        return _global.curVerifyCode.get();
		    },
		setCurVerifyCode:function(verifyCode){
		        return _global.curVerifyCode.set(verifyCode);
		    },
		removeCurVerifyCode:function(){
		        return _global.curVerifyCode.remove();
		    },
        getCurCust:function(){
            return _global.curCust.get();
        },
        setCurCust:function(curCusObj){
            return _global.curCust.set(curCusObj);
        },
        removeCurCust:function(){
            return _global.curCust.remove();
        },
        getCurOp:function(){
            return _global.curOp.get();
        },
        setCurOp:function(curOpObj){
            return _global.curOp.set(curOpObj);
        },
        removeCurOp:function(){
            return _global.curOp.remove();
        },
        getCurCallId:function(){
            return _global.curCallId.get();
        },
        setCurCallId:function(curCallIdObj){
            return _global.curCallId.set(curCallIdObj);
        },
        removeCurCallId:function(){
            return _global.curCallId.remove();
        },
        getCurAgentLoginSuccess:function(){
            return _global.agentLoginSuccess.get()=='true';
        },
        setCurAgentLoginSuccess:function(result){
            return _global.agentLoginSuccess.set(result);
        },
        removeCurAgentLoginSuccess:function(){
            return _global.agentLoginSuccess.remove();
        },
        serial:function(){
            return $.param($.extend(gl.getCurCust(),gl.getCurCallId(),gl.getCurOp()));
        }
    };
    window.gl=global;
    
})(window,jQuery);