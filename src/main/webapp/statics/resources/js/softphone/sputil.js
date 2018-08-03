var OutNum = "9990";
// 出局号
var IsAutomatic = "0";
// 是否自动外呼
var ServiceAgent = "undefined";
var HuntGroup = ""
function getOutbound(no) {
    if (no && no.length > 5) {
        $.ajax({
            async : false,
            url : contextPath + "/mobilephone/getoutboundno.json",
            type : "post",
            dataType : "json",
            data : {
                "phoneNo" : no
            },
            success : function(data) {
                if (data) {
                        no = data.message + no;
                }
            }
        });
    }
    return no;

}

//外呼
function btnMCall() {
    var CallTel = getOutbound($("#txtDestination").val());
    //console.log(CallTel);
    /* if(CallTel.length>5)
     CallTel = OutNum + CallTel;*/
    MakeCall(CallTel);
}

//上班

var AgentId = '';
var password = '';
function btnLogin(AId, pwd) {
	
    if (ConnectCti()) {
        AgentId = AId.replace(/^(\s|\xA0)+|(\s|\xA0)+$/g, '');
        password = pwd;
        $("#ddlstuats").removeAttr("disabled");
        $("#txtDestination").removeAttr("disabled");
        var result= Login(AgentId, password);
        if(result){
            callRecordUtil.agentLogin();
        }
        return result;
        //setTimeout(GetLogin,6000);
    } else {
        alert("签入服务器失败!");
        return false;
    }
}

function GetLogin() {
    Login(AgentId, password);
}

function IndexOut() {
    if (confirm("是否注销当前登录账号!")) {
        Logout();
        //	alert("登出成功");
    }
}

function Tanpintest(destination) {
    var AgentID = GetAgentID();
    var Extension = GetExtension();
    if (AgentID == "" || AgentID == undefined)
        AgentID = "0000";
    if (Extension == "" || Extension == undefined)
        Extension = "8001";
    document.getElementById("cti").AnswerCall();
   // console.log(AgentID,Extension)
    parent.mainTab.showTab(contextPath+'/inbound/customerInfo.htm','呼入查询',true );
  //  window.open(contextPath+'/inbound/customerInfo.htm','newwindow', 'height=800,width=1350,top=0,left=0,toolbar=no,menubar=no,scrollbars=yes, resizable=no,location=no, status=no')
}


window.Error = function() {
    return true;
};

function getphoneval(phone, name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = phone.match(reg);
    if (r != null)
        return unescape(r[2]);
    return null;
}
jQuery(document).ready(function() {
    //页面加载默认登陆
     if(document.getElementById("cti").Connect!=undefined){
         btnLogin(gl.getCurOp().agentId, '2');
         /* $("#btLogin").click(function(){
          btnLogin('undefined    ','2');
          })
          $("#btLogout").click(function(){
          Logout();
          })*/
         $("#btMakeCall").click(function() {
             btnMCall();
         })
         $("#btAnswerCall").click(function() {
             AnswerCall();
         })
         $("#btHangupCall").click(function() {
             HangUpCall();
         })
         $("#btHoldCall").click(function() {
             HoldCall();
         })
         $("#btRetrieveCall").click(function() {
             RetrieveCall();
         })
         $("#btTransferCall").click(function() {
             TransferCall(getOutbound($("#txtDestination").val()), 'fxh test');
         })
         $("#btCompleteTransfer").click(function() {
             CompleteTransfer();
         })
         $("#btConferenceCall").click(function() {
             ConferenceCall(getOutbound($("#txtDestination").val()), 'fxh test');
         })
         $("#btReconnectCall").click(function() {
        	 ReconnectCall();
         })
           $("#btCompleteConference").click(function() {
             CompleteConference();
         })
         $("#btGrade").click(function(){
        	 
        	 callRecordUtil.transManyidu();
         })
          $("#btVerify").click(function() {
        	  callRecordUtil.transVerify();
         })
         $("#btXiaojie").click(function() {
        	 window.open(contextPath+'/record/xiaojieidx.htm', "xiaojie", 'height=300,width=400,top=0,left=0,toolbar=no,menubar=no,scrollbars=yes, resizable=no,location=no, status=no')
         })
     }

});