/*
 * T-Server Web客户端库
 *
 */
var AGENT_READY_TEXT = '闲';
var AGENT_NOTREADY_TEXT = '忙';
var allState = [];
var ACW = false;

// 软电话状态
var STATE_NONE = 0; // 未连接前
var STATE_INITIAL = 1; // 已连接，未登陆
var STATE_LOGINED = 2; // 已经登陆
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
var STATE_OUTBOUND_RINGBACK = 17; // 外呼回铃

// 软电话用户界面功能按钮的id名称
var BUTTON_MAKECALL = "btMakeCall"; // 外呼
var BUTTON_ANWSERCALL = "btAnswerCall"; // 接听
var BUTTON_TRANSERCALL = "btTransferCall"; // 发起转移
var BUTTON_COMPLETETRANSFER = "btCompleteTransfer"; // 完成转移
var BUTTON_CONFERENCECALL = "btConferenceCall"; // 发起三方
var BUTTON_COMPLETECONFERENCE = "btCompleteConference"; // 完成三方
var BUTTON_RECONNECTCALL = "btReconnectCall"; // 恢复通话
var BUTTON_HANGUPCALL = "btHangupCall"; // 挂断
var BUTTON_HOLDCALL = "btHoldCall"; // 保持
var BUTTON_RETRIEVECALL = "btRetrieveCall"; // 恢复
var BUTTON_VERIFY = "btVerify"; // 验证
var BUTTON_GRADE = "btGrade"; // 评分

// 其他功能按钮的id名称
var BUTTON_LOGIN = "btLogin"; // 登录
var BUTTON_LOGOUT = "btLogout"; // 登出
var BUTTON_CONNECT = "btConnect";
var BUTTON_DISCONNECT = "btDisconnect";
var BUTTON_READY = "btReady"; // 准备接听
var BUTTON_NOTREADY_KAIHUI = "btNotReadyKaiHui"; // 开会
var BUTTON_NOTREADY_PEIXUN = "btNotReadyPeiXun"; // 培训

/*
 * 软电话的状态控制功能
 * 
 */

var callState_ = STATE_NONE;
var _preCallState = STATE_NONE;

function GetCallState() {
	return callState_;
}

function SetCallState(state) {
    //放到前面，如果发生电话中重新登陆系统的情况下，仍可更新电话状态
    callRecordUtil.changeCallRecord(callState_, state);
    //如果坐席签入失败，则禁止使用软电话功能
    if(!gl.getCurAgentLoginSuccess()){
       state= STATE_NONE;
    }
	callState_ = state;
	// M1 M2 '' '' M6 M3 M4 M5 M5 M7 M8 M9 M10 M12 M1 M12
	switch (state) {
	case STATE_NONE:
		/*
		 * ui_SetActionButton(BUTTON_CONNECT, true);
		 * ui_SetActionButton(BUTTON_DISCONNECT, false);
		 * ui_SetActionButton(BUTTON_LOGIN, false);
		 */
		ui_SetActionButton(BUTTON_LOGOUT, 'M1_D');
		ui_SetActionButton(BUTTON_READY, 'M2_D'); // false
		ui_SetActionButton(BUTTON_NOTREADY_KAIHUI, 'M1_D');
		ui_SetActionButton(BUTTON_NOTREADY_PEIXUN, 'M1_D');
		ui_SetActionButton(BUTTON_MAKECALL, 'M6_D');
		ui_SetActionButton(BUTTON_ANWSERCALL, 'M3_D');
		ui_SetActionButton(BUTTON_HANGUPCALL, 'M4_D');
		ui_SetActionButton(BUTTON_HOLDCALL, 'M5_D');
		ui_SetActionButton(BUTTON_RETRIEVECALL, 'M13_D');
		ui_SetActionButton(BUTTON_TRANSERCALL, 'M7_D');
		ui_SetActionButton(BUTTON_COMPLETETRANSFER, 'M8_D');
		ui_SetActionButton(BUTTON_CONFERENCECALL, 'M9_D');
		ui_SetActionButton(BUTTON_COMPLETECONFERENCE, 'M10_D');
		ui_SetActionButton(BUTTON_RECONNECTCALL, 'M14_D');
		ui_SetActionButton(BUTTON_VERIFY, 'M1_D');
		ui_SetActionButton(BUTTON_GRADE, 'M12_D');
		break;
	case STATE_INITIAL:
		/*
		 * ui_SetActionButton(BUTTON_CONNECT, false);
		 * ui_SetActionButton(BUTTON_DISCONNECT, true);
		 * ui_SetActionButton(BUTTON_LOGIN, true);
		 */
		ui_SetActionButton(BUTTON_LOGOUT, 'M1_D');
		ui_SetActionButton(BUTTON_READY, 'M2_D'); // false
		ui_SetActionButton(BUTTON_NOTREADY_KAIHUI, 'M1_D');
		ui_SetActionButton(BUTTON_NOTREADY_PEIXUN, 'M1_D');
		ui_SetActionButton(BUTTON_MAKECALL, 'M6_D');
		ui_SetActionButton(BUTTON_ANWSERCALL, 'M3_D');
		ui_SetActionButton(BUTTON_HANGUPCALL, 'M4_D');
		ui_SetActionButton(BUTTON_HOLDCALL, 'M5_D');
		ui_SetActionButton(BUTTON_RETRIEVECALL, 'M13_D');
		ui_SetActionButton(BUTTON_TRANSERCALL, 'M7_D');
		ui_SetActionButton(BUTTON_COMPLETETRANSFER, 'M8_D');
		ui_SetActionButton(BUTTON_CONFERENCECALL, 'M9_D');
		ui_SetActionButton(BUTTON_COMPLETECONFERENCE, 'M10_D');
		ui_SetActionButton(BUTTON_RECONNECTCALL, 'M14_D');
		ui_SetActionButton(BUTTON_VERIFY, 'M1_D');
		ui_SetActionButton(BUTTON_GRADE, 'M12_D');
		break;
	case STATE_LOGINED:
		/*
		 * ui_SetActionButton(BUTTON_CONNECT, false);
		 * ui_SetActionButton(BUTTON_DISCONNECT, true);
		 * ui_SetActionButton(BUTTON_LOGIN, false);
		 */
		ui_SetActionButton(BUTTON_LOGOUT, 'M1');
		ui_SetActionButton(BUTTON_READY, 'M2');
		ui_SetActionButton(BUTTON_NOTREADY_KAIHUI, 'M1');
		ui_SetActionButton(BUTTON_NOTREADY_PEIXUN, 'M1');
		ui_SetActionButton(BUTTON_MAKECALL, 'M6');
		ui_SetActionButton(BUTTON_ANWSERCALL, 'M3_D');
		ui_SetActionButton(BUTTON_HANGUPCALL, 'M4_D');
		ui_SetActionButton(BUTTON_HOLDCALL, 'M5_D');
		ui_SetActionButton(BUTTON_RETRIEVECALL, 'M13_D');
		ui_SetActionButton(BUTTON_TRANSERCALL, 'M7_D');
		ui_SetActionButton(BUTTON_COMPLETETRANSFER, 'M8_D');
		ui_SetActionButton(BUTTON_CONFERENCECALL, 'M9_D');
		ui_SetActionButton(BUTTON_COMPLETECONFERENCE, 'M10_D');
		ui_SetActionButton(BUTTON_RECONNECTCALL, 'M14_D');
		ui_SetActionButton(BUTTON_VERIFY, 'M1_D');
		ui_SetActionButton(BUTTON_GRADE, 'M12_D');
		break;
	case STATE_INBOUND:
		/*
		 * ui_SetActionButton(BUTTON_CONNECT, false);
		 * ui_SetActionButton(BUTTON_DISCONNECT, true);
		 * ui_SetActionButton(BUTTON_LOGIN, false);
		 */
		ui_SetActionButton(BUTTON_LOGOUT, 'M1');
		ui_SetActionButton(BUTTON_READY, 'M2_D'); // false
		ui_SetActionButton(BUTTON_NOTREADY_KAIHUI, 'M1_D');
		ui_SetActionButton(BUTTON_NOTREADY_PEIXUN, 'M1_D');
		ui_SetActionButton(BUTTON_MAKECALL, 'M6_D');
		ui_SetActionButton(BUTTON_ANWSERCALL, 'M3');
		ui_SetActionButton(BUTTON_HANGUPCALL, 'M4_D');
		ui_SetActionButton(BUTTON_HOLDCALL, 'M5_D');
		ui_SetActionButton(BUTTON_RETRIEVECALL, 'M13_D');
		ui_SetActionButton(BUTTON_TRANSERCALL, 'M7_D');
		ui_SetActionButton(BUTTON_COMPLETETRANSFER, 'M8_D');
		ui_SetActionButton(BUTTON_CONFERENCECALL, 'M9_D');
		ui_SetActionButton(BUTTON_COMPLETECONFERENCE, 'M10_D');
		ui_SetActionButton(BUTTON_RECONNECTCALL, 'M14_D');
		ui_SetActionButton(BUTTON_VERIFY, 'M1_D');
		ui_SetActionButton(BUTTON_GRADE, 'M12_D');
		break;
	case STATE_OUTBOUND_RINGBACK:
		/*
		 * ui_SetActionButton(BUTTON_CONNECT, false);
		 * ui_SetActionButton(BUTTON_DISCONNECT, true);
		 * ui_SetActionButton(BUTTON_LOGIN, false);
		 */
		ui_SetActionButton(BUTTON_LOGOUT, 'M1');
		ui_SetActionButton(BUTTON_READY, 'M2_D'); // false
		ui_SetActionButton(BUTTON_NOTREADY_KAIHUI, 'M1_D');
		ui_SetActionButton(BUTTON_NOTREADY_PEIXUN, 'M1_D');
		ui_SetActionButton(BUTTON_MAKECALL, 'M6');
		ui_SetActionButton(BUTTON_ANWSERCALL, 'M3_D');
		ui_SetActionButton(BUTTON_HANGUPCALL, 'M4');
		ui_SetActionButton(BUTTON_HOLDCALL, 'M5_D');
		ui_SetActionButton(BUTTON_RETRIEVECALL, 'M13_D');
		ui_SetActionButton(BUTTON_TRANSERCALL, 'M7_D');
		ui_SetActionButton(BUTTON_COMPLETETRANSFER, 'M8_D');
		ui_SetActionButton(BUTTON_CONFERENCECALL, 'M9_D');
		ui_SetActionButton(BUTTON_COMPLETECONFERENCE, 'M10_D');
		ui_SetActionButton(BUTTON_RECONNECTCALL, 'M14_D');
		ui_SetActionButton(BUTTON_VERIFY, 'M1_D');
		ui_SetActionButton(BUTTON_GRADE, 'M12_D');
		break;
	case STATE_OUTBOUNDING:
		/*
		 * ui_SetActionButton(BUTTON_CONNECT, false);
		 * ui_SetActionButton(BUTTON_DISCONNECT, true);
		 * ui_SetActionButton(BUTTON_LOGIN, false);
		 */
		ui_SetActionButton(BUTTON_LOGOUT, 'M1');
		ui_SetActionButton(BUTTON_READY, 'M2_D'); // false
		ui_SetActionButton(BUTTON_NOTREADY_KAIHUI, 'M1_D');
		ui_SetActionButton(BUTTON_NOTREADY_PEIXUN, 'M1_D');
		ui_SetActionButton(BUTTON_MAKECALL, 'M6');
		ui_SetActionButton(BUTTON_ANWSERCALL, 'M3_D');
		ui_SetActionButton(BUTTON_HANGUPCALL, 'M4_D');
		ui_SetActionButton(BUTTON_HOLDCALL, 'M5_D');
		ui_SetActionButton(BUTTON_RETRIEVECALL, 'M13_D');
		ui_SetActionButton(BUTTON_TRANSERCALL, 'M7_D');
		ui_SetActionButton(BUTTON_COMPLETETRANSFER, 'M8_D');
		ui_SetActionButton(BUTTON_CONFERENCECALL, 'M9_D');
		ui_SetActionButton(BUTTON_COMPLETECONFERENCE, 'M10_D');
		ui_SetActionButton(BUTTON_RECONNECTCALL, 'M14_D');
		ui_SetActionButton(BUTTON_VERIFY, 'M1_D');
		ui_SetActionButton(BUTTON_GRADE, 'M12_D');
		break;
	case STATE_ANSWERED:
		/*
		 * ui_SetActionButton(BUTTON_CONNECT, false);
		 * ui_SetActionButton(BUTTON_DISCONNECT, true);
		 * ui_SetActionButton(BUTTON_LOGIN, false);
		 */
		ui_SetActionButton(BUTTON_LOGOUT, 'M1');
		ui_SetActionButton(BUTTON_MAKECALL, 'M6_D');
		ui_SetActionButton(BUTTON_ANWSERCALL, 'M3_D');
		ui_SetActionButton(BUTTON_HANGUPCALL, 'M4');
		ui_SetActionButton(BUTTON_HOLDCALL, 'M5_D');
		ui_SetActionButton(BUTTON_RETRIEVECALL, 'M13_D');
		ui_SetActionButton(BUTTON_TRANSERCALL, 'M7_D');
		ui_SetActionButton(BUTTON_COMPLETETRANSFER, 'M8_D');
		ui_SetActionButton(BUTTON_CONFERENCECALL, 'M9_D');
		ui_SetActionButton(BUTTON_COMPLETECONFERENCE, 'M10_D');
		ui_SetActionButton(BUTTON_RECONNECTCALL, 'M14_D');
		ui_SetActionButton(BUTTON_VERIFY, 'M1_D');
		ui_SetActionButton(BUTTON_GRADE, 'M12_D');
		break;
	case STATE_CONNECTED:
		/*
		 * ui_SetActionButton(BUTTON_CONNECT, false);
		 * ui_SetActionButton(BUTTON_DISCONNECT, true);
		 * ui_SetActionButton(BUTTON_LOGIN, false);
		 */
		ui_SetActionButton(BUTTON_LOGOUT, 'M1');
		ui_SetActionButton(BUTTON_MAKECALL, 'M6_D');
		ui_SetActionButton(BUTTON_ANWSERCALL, 'M3_D');
		ui_SetActionButton(BUTTON_HANGUPCALL, 'M4');
		ui_SetActionButton(BUTTON_HOLDCALL, 'M5');
		ui_SetActionButton(BUTTON_RETRIEVECALL, 'M13_D');
		ui_SetActionButton(BUTTON_TRANSERCALL, 'M7');
		ui_SetActionButton(BUTTON_COMPLETETRANSFER, 'M8_D');
		ui_SetActionButton(BUTTON_CONFERENCECALL, 'M9');
		ui_SetActionButton(BUTTON_COMPLETECONFERENCE, 'M10_D');
		ui_SetActionButton(BUTTON_RECONNECTCALL, 'M14_D');
		ui_SetActionButton(BUTTON_VERIFY, 'M1');
		ui_SetActionButton(BUTTON_GRADE, 'M12');
		break;
	case STATE_HELD:
		/*
		 * ui_SetActionButton(BUTTON_CONNECT, false);
		 * ui_SetActionButton(BUTTON_DISCONNECT, true);
		 * ui_SetActionButton(BUTTON_LOGIN, false);
		 */
		ui_SetActionButton(BUTTON_LOGOUT, 'M1');
		ui_SetActionButton(BUTTON_MAKECALL, 'M6_D');
		ui_SetActionButton(BUTTON_ANWSERCALL, 'M3_D');
		ui_SetActionButton(BUTTON_HANGUPCALL, 'M4');
		ui_SetActionButton(BUTTON_HOLDCALL, 'M5_D');
		ui_SetActionButton(BUTTON_RETRIEVECALL, 'M13');
		ui_SetActionButton(BUTTON_TRANSERCALL, 'M7_D');
		ui_SetActionButton(BUTTON_COMPLETETRANSFER, 'M8_D');
		ui_SetActionButton(BUTTON_CONFERENCECALL, 'M9_D');
		ui_SetActionButton(BUTTON_COMPLETECONFERENCE, 'M10_D');
		ui_SetActionButton(BUTTON_RECONNECTCALL, 'M14_D');
		ui_SetActionButton(BUTTON_VERIFY, 'M1_D');
		ui_SetActionButton(BUTTON_GRADE, 'M12_D');
		break;
	case STATE_TRANSFERING:
	case STATE_CONFERENCING:
		break;
	case STATE_TRANSFER_CONSULTING:
	case STATE_CONFERENCE_CONSULTING:
		/*
		 * ui_SetActionButton(BUTTON_CONNECT, false);
		 * ui_SetActionButton(BUTTON_DISCONNECT, true);
		 * ui_SetActionButton(BUTTON_LOGIN, false);
		 */
		ui_SetActionButton(BUTTON_LOGOUT, 'M1');
		ui_SetActionButton(BUTTON_MAKECALL, 'M6_D');
		ui_SetActionButton(BUTTON_ANWSERCALL, 'M3_D');
		ui_SetActionButton(BUTTON_HANGUPCALL, 'M4');
		ui_SetActionButton(BUTTON_HOLDCALL, 'M5_D');
		ui_SetActionButton(BUTTON_RETRIEVECALL, 'M13');
		ui_SetActionButton(BUTTON_TRANSERCALL, 'M7_D');
		ui_SetActionButton(BUTTON_COMPLETETRANSFER, 'M8_D');
		ui_SetActionButton(BUTTON_CONFERENCECALL, 'M9_D');
		ui_SetActionButton(BUTTON_COMPLETECONFERENCE, 'M10_D');
		ui_SetActionButton(BUTTON_RECONNECTCALL, 'M14_D');
		ui_SetActionButton(BUTTON_VERIFY, 'M1_D');
		ui_SetActionButton(BUTTON_GRADE, 'M12_D');
		break;
	case STATE_TRANSFER_CONSULTED:
		/*
		 * ui_SetActionButton(BUTTON_CONNECT, false);
		 * ui_SetActionButton(BUTTON_DISCONNECT, true);
		 * ui_SetActionButton(BUTTON_LOGIN, false);
		 */
		ui_SetActionButton(BUTTON_LOGOUT, 'M1');
		ui_SetActionButton(BUTTON_MAKECALL, 'M6_D');
		ui_SetActionButton(BUTTON_ANWSERCALL, 'M3_D');
		ui_SetActionButton(BUTTON_HANGUPCALL, 'M4');
		ui_SetActionButton(BUTTON_HOLDCALL, 'M5_D');
		ui_SetActionButton(BUTTON_RETRIEVECALL, 'M13_D');
		ui_SetActionButton(BUTTON_TRANSERCALL, 'M7_D');
		ui_SetActionButton(BUTTON_COMPLETETRANSFER, 'M8_D');
		ui_SetActionButton(BUTTON_CONFERENCECALL, 'M9_D');
		ui_SetActionButton(BUTTON_COMPLETECONFERENCE, 'M10_D');
		ui_SetActionButton(BUTTON_RECONNECTCALL, 'M14');
		ui_SetActionButton(BUTTON_VERIFY, 'M1_D');
		ui_SetActionButton(BUTTON_GRADE, 'M12_D');
		break;
	case STATE_CONFERENCE_CONSULTED:
		/*
		 * ui_SetActionButton(BUTTON_CONNECT, false);
		 * ui_SetActionButton(BUTTON_DISCONNECT, true);
		 * ui_SetActionButton(BUTTON_LOGIN, false);
		 */
		ui_SetActionButton(BUTTON_LOGOUT, 'M1');
		ui_SetActionButton(BUTTON_MAKECALL, 'M6_D');
		ui_SetActionButton(BUTTON_ANWSERCALL, 'M3_D');
		ui_SetActionButton(BUTTON_HANGUPCALL, 'M4');
		ui_SetActionButton(BUTTON_HOLDCALL, 'M5_D');
		ui_SetActionButton(BUTTON_RETRIEVECALL, 'M13_D');
		ui_SetActionButton(BUTTON_TRANSERCALL, 'M7_D');
		ui_SetActionButton(BUTTON_COMPLETETRANSFER, 'M8_D');
		ui_SetActionButton(BUTTON_CONFERENCECALL, 'M9_D');
		ui_SetActionButton(BUTTON_COMPLETECONFERENCE, 'M10_D');
		ui_SetActionButton(BUTTON_RECONNECTCALL, 'M14');
		ui_SetActionButton(BUTTON_VERIFY, 'M1_D');
		ui_SetActionButton(BUTTON_GRADE, 'M12_D');
		break;
	case STATE_TRANSFER_ANSWERED:
		/*
		 * ui_SetActionButton(BUTTON_CONNECT, false);
		 * ui_SetActionButton(BUTTON_DISCONNECT, true);
		 * ui_SetActionButton(BUTTON_LOGIN, false);
		 */
		ui_SetActionButton(BUTTON_LOGOUT, 'M1');
		ui_SetActionButton(BUTTON_MAKECALL, 'M6_D');
		ui_SetActionButton(BUTTON_ANWSERCALL, 'M3_D');
		ui_SetActionButton(BUTTON_HANGUPCALL, 'M4');
		ui_SetActionButton(BUTTON_HOLDCALL, 'M5_D');
		ui_SetActionButton(BUTTON_RETRIEVECALL, 'M13_D');
		ui_SetActionButton(BUTTON_TRANSERCALL, 'M7_D');
		ui_SetActionButton(BUTTON_COMPLETETRANSFER, 'M8');
		ui_SetActionButton(BUTTON_CONFERENCECALL, 'M9_D');
		ui_SetActionButton(BUTTON_COMPLETECONFERENCE, 'M10_D');
		ui_SetActionButton(BUTTON_RECONNECTCALL, 'M14');
		ui_SetActionButton(BUTTON_VERIFY, 'M1_D');
		ui_SetActionButton(BUTTON_GRADE, 'M12_D');
		break;
	case STATE_CONFERENCE_ANSWERED:
		/*
		 * ui_SetActionButton(BUTTON_CONNECT, false);
		 * ui_SetActionButton(BUTTON_DISCONNECT, true);
		 * ui_SetActionButton(BUTTON_LOGIN, false);
		 */
		ui_SetActionButton(BUTTON_LOGOUT, 'M1');
		ui_SetActionButton(BUTTON_MAKECALL, 'M6_D');
		ui_SetActionButton(BUTTON_ANWSERCALL, 'M3_D');
		ui_SetActionButton(BUTTON_HANGUPCALL, 'M4');
		ui_SetActionButton(BUTTON_HOLDCALL, 'M5_D');
		ui_SetActionButton(BUTTON_RETRIEVECALL, 'M13_D');
		ui_SetActionButton(BUTTON_TRANSERCALL, 'M7_D');
		ui_SetActionButton(BUTTON_COMPLETETRANSFER, 'M8_D');
		ui_SetActionButton(BUTTON_CONFERENCECALL, 'M9_D');
		ui_SetActionButton(BUTTON_COMPLETECONFERENCE, 'M10');
		ui_SetActionButton(BUTTON_RECONNECTCALL, 'M14');
		ui_SetActionButton(BUTTON_VERIFY, 'M1_D');
		ui_SetActionButton(BUTTON_GRADE, 'M12_D');
		break;
	case STATE_CONFERENCED:
		/*
		 * ui_SetActionButton(BUTTON_CONNECT, false);
		 * ui_SetActionButton(BUTTON_DISCONNECT, true);
		 * ui_SetActionButton(BUTTON_LOGIN, false);
		 */
		ui_SetActionButton(BUTTON_LOGOUT, 'M1');
		ui_SetActionButton(BUTTON_MAKECALL, 'M6_D');
		ui_SetActionButton(BUTTON_ANWSERCALL, 'M3_D');
		ui_SetActionButton(BUTTON_HANGUPCALL, 'M4');
		ui_SetActionButton(BUTTON_HOLDCALL, 'M5_D');
		ui_SetActionButton(BUTTON_RETRIEVECALL, 'M13_D');
		ui_SetActionButton(BUTTON_TRANSERCALL, 'M7_D');
		ui_SetActionButton(BUTTON_COMPLETETRANSFER, 'M8_D');
		ui_SetActionButton(BUTTON_CONFERENCECALL, 'M9_D');
		ui_SetActionButton(BUTTON_COMPLETECONFERENCE, 'M10_D');
		ui_SetActionButton(BUTTON_RECONNECTCALL, 'M14');
		ui_SetActionButton(BUTTON_VERIFY, 'M1_D');
		ui_SetActionButton(BUTTON_GRADE, 'M12_D');
		break;
	default:
		break;
	}
}

/*
 * 与CTI服务器连接、断开
 * 
 */

// 在调用任何其他功能前，必须先连接CTI服务器
// server为服务器ip地址，port为端口号，device为设备号码
// 这些参数也可以在配置文件中设置
function Connect(server, port, device) {
	var ctiCtrl = document.getElementById('cti');
	// ctiCtrl.Server = server;
	// ctiCtrl.Port = port;
	// ctiCtrl.Server2 = "172.16.1.74";
	// ctiCtrl.Port2 = 3000;
	// ctiCtrl.DeviceNumber = device;

	if (!ctiCtrl.Connect()) {
		return false;
	} else {
		SetCallState(STATE_INITIAL);
	}
	return true;
}

function ConnectCti() {
	/*
	 * var ctiCtrl = document.getElementById('cti'); if (!ctiCtrl.Connect()) {
	 * return false; } else { StartUdpServer(); SetCallState(STATE_INITIAL); }
	 */
	StartUdpServer();
	return true;
}

// 退出座席前，请与CTI断连
function Disconnect() {
	var ctiCtrl = document.getElementById('cti');
	SetCallState(STATE_NONE);
	if (!ctiCtrl.Disconnect()) {
		return false;
	} else {
		return true;
	}
	return true;
}

// 启动UDP服务器
function StartUdpServer() {
	var ctiCtrl = document.getElementById('cti');
	ctiCtrl.StartUdpServer(0);
}

/*
 * 座席类功能函数
 * 
 */
// 座席登录，参数分别为座席工号、密码
function Login(agentID, password) {
	var ctiCtrl = document.getElementById('cti');
	if (ctiCtrl.Login(agentID, '', "", false)) {
		alert("坐席登录成功!");
		// GetAjazAE();
        gl.setCurAgentLoginSuccess(true);
		SetCallState(STATE_LOGINED);
		return true;
	} else {
        //坐席登陆失败禁止软电话功能
        gl.setCurAgentLoginSuccess(false);
        SetCallState(STATE_NONE);
		alert("坐席登录失败!");
		return false;
	}
}

// 座席登出

function Logout() {
	var ctiCtrl = document.getElementById('cti');
	SetCallState(STATE_INITIAL);
	/*
	 * if (ctiCtrl.Logout()) { return true; } else { return false; }
	 */
	try {
		ctiCtrl.Logout();
        callRecordUtil.agentLogout();
	} catch (exception) {
	} finally {
		parent.window.location.href = contextPath + "/logout.htm";
	}

}

// 获取登录座席工号

function GetAgentID() {
	var ctiCtrl = document.getElementById('cti');
	return ctiCtrl.AgentID;
}

// 获取登录座席分机号码

function GetExtension() {
	var ctiCtrl = document.getElementById('cti');
	return ctiCtrl.DeviceNumber;
}

// 获取随路数据的值

function GetAppData(key) {
	var ctiCtrl = document.getElementById('cti');
	return ctiCtrl.GetAppData(key);
}

function SetStuts(reasonCode) {
	if (ACW) // 有话后处理切换菜单移除
	{
		var length = document.getElementById("ddlstuats").options.length;
		document.getElementById("ddlstuats").options.remove(length - 1);
		ACW = false;
	}
	if (reasonCode != "-1") {
		SetAgentNotReady(reasonCode);
	} else {
		SetAgentReady();
	}
}

// 设置座席就绪状态
function SetAgentReady() {
	var ctiCtrl = document.getElementById('cti');
	ctiCtrl.SetAgentReady();
}
// 设置坐席非就绪状态
function SetAgentNotReady(reasonCode) {
	var ctiCtrl = document.getElementById('cti');
	ctiCtrl.SetAgentNotReady(reasonCode);
}

// /话后处理
function AgentACW() {
	var ddlstuats = document.getElementById("ddlstuats");
	var length = ddlstuats.options.length;
	var ddllastext = ddlstuats.options[length - 1];
	if (ddllastext.innerText != "话后处理") {
		ddlstuats.options.add(new Option("话后处理", length + 1));
		ddlstuats.options[length].selected = true;
		ACW = true;
	}

}

/*
 * 呼叫控制类功能函数
 * 
 */
// 座席呼出，destination为目标号码
function MakeCall(destination) {
    //如果坐席登陆失败禁止外呼
    if(!gl.getCurAgentLoginSuccess()){
        alert("您尚未签入电话系统，请退出系统重新登陆");
        return false;
    }
	var ctiCtrl = document.getElementById('cti');
	if (ctiCtrl.MakeCall(destination, '')) {
		SetCallState(STATE_OUTBOUNDING);
		return true;
	} else {
		return false;
	}
}

// 接听呼入电话
function AnswerCall() {
	var ctiCtrl = document.getElementById('cti');
	if (ctiCtrl.AnswerCall()) {
		SetCallState(STATE_ANSWERED);
		return true;
	} else {
		return false;
	}
}

function HoldCall() {
	var ctiCtrl = document.getElementById('cti');
	if (ctiCtrl.HoldCall()) {
		return true;
	} else {
		return false;
	}
}

function RetrieveCall() {
	var ctiCtrl = document.getElementById('cti');
	if (ctiCtrl.RetrieveCall()) {
		return true;
	} else {
		return false;
	}
}

// 电话转移，destination为目标号码，applicationData为随路业务数据
function TransferCall(destination, applicationData) {
	var ctiCtrl = document.getElementById('cti');
	if (ctiCtrl.TransferCall(destination, applicationData)) {
		SetCallState(STATE_TRANSFERING);
		return true;
	} else {
		return false;
	}
}

function CompleteTransfer() {
	var ctiCtrl = document.getElementById('cti');
	if (ctiCtrl.CompleteTransfer()) {
		return true;
	} else {
		return false;
	}
}

// 发起三方会话，destination为目标号码，applicationData为随路业务数据
function ConferenceCall(destination, applicationData) {
	var ctiCtrl = document.getElementById('cti');
	if (ctiCtrl.ConferenceCall(destination, applicationData)) {
		SetCallState(STATE_CONFERENCING);
		return true;
	} else {
		return false;
	}
}

function CompleteConference() {
	var ctiCtrl = document.getElementById('cti');
	if (ctiCtrl.CompleteConference()) {
		return true;
	} else {
		return false;
	}
}

function ReconnectCall() {
	var ctiCtrl = document.getElementById('cti');
	if (ctiCtrl.ReconnectCall()) {
		return true;
	} else {
		return false;
	}
}

// 挂断电话
function HangUpCall() {
	var ctiCtrl = document.getElementById('cti');
	if (ctiCtrl.HangUp()) {
		return true;
	} else {
		return false;
	}
}

// 成功登出消息
function OnLinkDisconnected() {
	alert("与服务器已断开，请联系管理员");
	SetCallState(STATE_NONE);
}
// 座席状态设置成功，status 0表示 TBD.....
function OnAgentReady() {
	// 坐席设置准备接听状态
	document.getElementById("ddlstuats").options[0].selected = true;

}

function OnAgentNotReady(reasonCode) {

	// ui_error('座席设置成置忙状态,reasonCode:' + reasonCode);
}

// 座席有电话呼入
function OnInboundCall(currentCallingParty, // 当前主叫
currentCalledParty, // 当前被叫
originalCallingParty, // 原始主叫，一般为呼入客户的主叫号码
originalCalledParty, // 原始被叫
applicationData // 呼叫间传递的业务数据
) {
	// connid = Getconnid();
	// agentid = GetAgentID();
	// extension = GetExtension();
	// 如果是呼入清空cookie信息
	callRecordUtil.emptyPreCallInfo();
	contextCallRecord.type = 1;
	contextCallRecord.is_connected = 0;
	contextCallRecord.extension = GetExtension();
	var originalCallNo = originalNo(originalCallingParty);
	contextCallRecord.callNo = originalCallNo;
	gl.setCurCust({
		custMobileNum:originalCallNo,
		callNo : originalCallNo
	});
    $("#txtDestination").val(originalCallNo);
	SetCallState(STATE_INBOUND);
    parent.mainTab.showTab(contextPath+'/inbound/customerInfo.htm','呼入查询' ,true);
	/*parent.window.document.getElementById("iframepage").src = contextPath
			+ '/inbound/customerInfo.htm';*/
	// window.open(contextPath+'/inbound/customerInfo.htm','newwindow',
	// 'height=800,width=1350,top=0,left=0,toolbar=no,menubar=no,scrollbars=yes,
	// resizable=no,location=no, status=no')

}

// 呼入电话已经被接听

function OnAnswered(currentCallingParty, // 当前主叫
currentCalledParty, // 当前被叫
originalCallingParty, // 原始主叫，一般为呼入客户的主叫号码
originalCalledParty // 原始被叫
) {
	contextCallRecord.connid = Getconnid();
	contextCallRecord.extension = GetExtension();
	if (contextCallRecord.type != 1) {
		// 如果不为呼入，就是呼出
		contextCallRecord.type = 2;
	}
	contextCallRecord.is_connected = 1;
	var ctiCtrl = document.getElementById('cti');
	SetCallState(STATE_CONNECTED);
}

// 电话被成功转移
function OnTransfered() {
	SetCallState(STATE_LOGINED);
}

// 电话已经建立起三方会话
function OnConferenced() {
	SetCallState(STATE_CONFERENCED);
}

// 电话被挂断
function OnCallIdle() {
	/* callRecordUtil.hangup(); */
	SetCallState(STATE_LOGINED);
}

function OnAbandoned(thisParty, otherParty) {
	SetCallState(STATE_LOGINED);
}

// 电话外呼对方正在振铃

function OnRingBack(currentCallingParty, // 主叫号码
currentCalledParty // 被叫号码
) {
	if (GetCallState() == STATE_TRANSFER_CONSULTING) {
		SetCallState(STATE_TRANSFER_CONSULTED);
	} else if (GetCallState() == STATE_CONFERENCE_CONSULTING) {
		SetCallState(STATE_CONFERENCE_CONSULTED);
	} else {
		// 如果是外呼振铃清空cookie信息
		callRecordUtil.emptyPreCallInfo();
		contextCallRecord.type = 2;
		contextCallRecord.is_connected = 0;
		contextCallRecord.extension = GetExtension();
		var originalCallNo = originalNo(currentCalledParty);
		contextCallRecord.callNo = originalCallNo;
		gl.setCurCust({
			custMobileNum:originalCallNo,
			callNo : originalCallNo
		});
		SetCallState(STATE_OUTBOUND_RINGBACK);
	}
}

// 电话外呼对方忙
function OnDestBusy() {
	// SetCallState(STATE_LOGINED);
}

// 获取随路数据的值
function Getconnid() {
	var ctiCtrl = document.getElementById('cti');
	return ctiCtrl.GetConnID();
}

// 发送命令

function SendCommand(command) {
	var ctiCtrl = document.getElementById('cti');
	ctiCtrl.SendCommand(command);
}

// Grade
function SingleStepTransfer(dest) {
	var ctiCtrl = document.getElementById('cti');
	ctiCtrl.SingleStepTransfer(dest);
}

function OnHeld() {
	if (GetCallState() == STATE_TRANSFERING) {
		SetCallState(STATE_TRANSFER_CONSULTING);
	} else if (GetCallState() == STATE_CONFERENCING) {
		SetCallState(STATE_CONFERENCE_CONSULTING);
	} else {
		SetCallState(STATE_HELD);
	}
}

function ui_SetActionButton(action, isEnabled) {
	if (document.getElementById(action) != null) {
		if (isEnabled.search('D') > 0) {
			document.getElementById(action).disabled = true;
			$("#" + action).children("span").removeClass("phone-tool");

		} else {
			document.getElementById(action).disabled = false;
			$("#" + action).children("span").addClass("phone-tool");

		}
		// document.getElementById(action).className = isEnabled;
	}
}

function ui_error(message) {
	var msg;
	// if (document.getElementById('log') != null) {
	// msg = document.getElementById('log').value;
	// msg = FormatDateTime() + message + '\n' + msg;
	// document.getElementById('log').value = msg;
	// console.log(msg);
	// }
}

function ui_trace(message) {
	// ui_error(message);
}

function FormatDateTime() {
	var d = new Date();
	return TwoDigits(d.getHours()) + ":" + TwoDigits(d.getMinutes()) + ":"
			+ TwoDigits(d.getSeconds()) + " ";
}

function TwoDigits(digit) {
	return digit < 10 ? '0' + digit : '' + digit;
}
// 获取原始话机的号码
function originalNo(no) {
	no = no + "";
	if (no && no.length > 5) {
		if (no && no.length > 5) {
	        $.ajax({
	            async : false,
	            url : contextPath + "/mobilephone/getorigoutboundno.json",
	            type : "post",
	            dataType : "json",
	            data : {
	                "phoneNo" : no
	            },
	            success : function(data) {
	                if (data) {
	                        no = data.message;
	                }
	            }
	        });
	    }
	}
	return no;
}