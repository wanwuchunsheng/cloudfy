;
var contextCallRecord={
        id:"",
        type:"",
        call_no:"",
        task_id:"",
        connid:"",
        extension:"",
        is_connected:""
};
var callRecordUtil={

    emptyContextCallRecord:  function(){
        contextCallRecord={
            id:"",
            type:"",
            call_no:"",
            task_id:"",
            connid:"",
            extension:"",
            is_connected:""
        }
    }  ,
   
    //删除上次呼叫信息
    emptyPreCallInfo:function (){
       // console.log("开始清除当前话务信息")
        gl.removeCurCust();
        gl.removeCurCallId();
        this.emptyContextCallRecord();
    },
    //插入话务记录
    insertCallRecord:function () {
        var url = contextPath + "/record/addRecord.json";
        var curOp = gl.getCurOp();
        var callRecord=contextCallRecord;
        var data = {
            type:callRecord.type,
            connid:callRecord.connid,
            extension:callRecord.extension,
            callNo:callRecord.callNo,
            isConnected:callRecord.is_connected,
            createUserName: curOp.name,
            userId: curOp.userId,
            agentId: curOp.agentId,
            createUserId: curOp.userId
        };
        $.ajax({
			url:url,
			type:'POST',
			async:true,
			data:JSON.stringify(data),
			dataType:"json",
    		contentType:'application/json;charset=UTF-8',
			success:function(data){
				  contextCallRecord.id=data.id;
		          gl.setCurCallId(data.id);
			}
          }
         );
        
    },
    //更新话务记录
    updateCallRecord: function (data){
        var url = contextPath + "/record/updateRecord.json";
        data.id=contextCallRecord.id;
        $.ajax({
			url:url,
			type:'POST',
			async:true,
			data:JSON.stringify(data),
			dataType:"json",
    		contentType:'application/json;charset=UTF-8'

          }
         );
       
    },
    //挂机后更新话务记录
    hangup:function  (){
        var url = contextPath + "/record/hangup.json";
        var curUser=gl.getCurOp();
        var curCust=gl.getCurCust();
        var data={
            id:gl.getCurCallId(),
            custId:curCust.userId,
            subinstId:curCust.subInstId,
            memberId:curCust.memberId,
            custMobileNum:curCust.callNo,
            custName:curCust.custName,
            updateUserId:curUser.userId,
            updateUserName:curUser.name
        };
       
        $.ajax({
			url:url,
			type:'POST',
			async:true,
			data:JSON.stringify(data),
			dataType:"json",
    		contentType:'application/json;charset=UTF-8'

          }
         );

       
    },
    //添加话务小结
    recordContent:function (content){
         this.updateCallRecord({content:content});
    },
    //根据状态修改话务记录
    changeCallRecord:function (preState,curState){
        //console.log(preState,curState);
        /*var STATE_LOGINED = 2; // 已经登陆
         var STATE_INBOUND = 3; // 有呼入电话
         var STATE_ANSWERED = 4; // 点了接听按钮
         var STATE_CONNECTED = 5; // 电话已经接通
         var STATE_TRANSFERING = 6; // 点击发起转移按钮
         var STATE_CONFERENCING = 7; // 点击发起三方按钮
         var STATE_OUTBOUNDING = 8; // 点击外呼按钮
         var STATE_HELD = 9; // 保持
         var STATE_TRANSFER_CONSULTING = 10; // 转移磋商时，变成保持状态
         var STATE_TRANSFER_CONSULTED = 11; // 转移磋商时, 对端回铃
         var STATE_CONFERENCE_CONSULTING = 12; // 三方磋商时，变成保持状态
         var STATE_CONFERENCE_CONSULTED = 13; // 三方磋商时, 对端回铃
         var STATE_TRANSFER_ANSWERED = 14; // 转移时第三方接通
         var STATE_CONFERENCE_ANSWERED = 15; // 三方时第三方接通
         var STATE_CONFERENCED = 16; // 三方都开始通话
         var STATE_OUTBOUND_RINGBACK = 17; // 外呼回铃**/
        var callRecord=contextCallRecord;
        //console.log(preState,curState);
        if(preState==STATE_INBOUND&&curState==STATE_CONNECTED){
            //呼入
           this.insertCallRecord();
        }
        else if(preState==STATE_CONNECTED&&curState==STATE_LOGINED){
            //挂机
            this.hangup()
         //   挂机取消弹屏
          //  window.open(contextPath+'/record/xiaojieidx.htm', "xiaojie", 'height=300,width=400,top=0,left=0,toolbar=no,menubar=no,scrollbars=yes, resizable=no,location=no, status=no')

        }
        else if(preState==STATE_HELD&&curState==STATE_LOGINED){
            //挂机
            this.hangup()
        }
        else if(preState==STATE_TRANSFER_ANSWERED&&curState==STATE_LOGINED){
            //如果是第三方转接成功结束
            this.hangup()
        }
        else if(curState==STATE_OUTBOUND_RINGBACK){
            //外呼对方振铃
            this.insertCallRecord();
        }
        else if(preState==STATE_OUTBOUND_RINGBACK&&curState==STATE_CONNECTED){
            //外呼接听
            this.updateCallRecord({
               connid:Getconnid(),
               isConnected:1
            });
        }
    },
	    transManyidu:function(){
    	var connid=Getconnid();
    	document.getElementById("cti").AttachData2("connid", connid);
    	var no="";
    	$.ajax({
            async: false,
            url: window.contextPath + "/mobilephone/getManyiduVDN.json",
            type: "post",
            dataType: "json",
            
            success: function(data){
                if (data) {
                    no = data.message ;
                }
            }
        });
		document.getElementById("cti").SingleStepTransfer(no);
		//记录点击转满意度IVR，更新通话记录中满意度为-1，代表已转满意度
        var data={};
        data.id=gl.getCurCallId();
        data.manyidu=0;
        var url = contextPath + "/record/dispatchManyidu.json";
        $.ajax({
                url:url,
                type:'POST',
                async:true,
                data:JSON.stringify(data),
                dataType:"json",
                contentType:'application/json;charset=UTF-8'
            }
        );
    },
     transVerify:function(){
    	 var connid=Getconnid();
     	document.getElementById("cti").AttachData2("connid", connid);
    	var no="";
    	$.ajax({
            async: false,
            url: window.contextPath + "/mobilephone/getVerifyVDN.json",
            type: "post",
            dataType: "json",
            
            success: function(data){
                if (data) {
                    no = data.message ;
                }
            }
        });
		document.getElementById("cti").SingleStepConference(no);
    },
    agentLogin:function(){
        $.ajax({
            async: true,
            url: window.contextPath + "/agentLogin.json?extension="+GetExtension(),
            type: "post",
            dataType: "json"

        });
    },
    agentLogout:function(){
        $.ajax({
            async: true,
            url: window.contextPath + "/agentLogout.json?extension="+GetExtension(),
            type: "post",
            dataType: "json"
        });
    }
    
};





