var ByteBuffer = window.dcodeIO.ByteBuffer;

var websockets = [];
var reconnInterval = 10;    //重连间隔
var reconnLock = false;      //避免重复连接
var needconn = true;      //是否需要重连

var lastInteractionTime = 0;//上一次交互时间
var heartbeatTimeout = 60 * 1000;
var heartbeatSendInterval = heartbeatTimeout / 2;

var stat = {
    received: 0  //收到次数
    , sent: 0       //发送次数
    , connCount: 0  //连成功次数
    , reconnCount: 0 //重连次数
};

protobuf.load("/static/websoket/chat.proto", function (err, root) {
    if (err) {
        throw err;
    }
    loadClass(root);
});

function loadClass(root) {
    AuthReqBody = root.lookup("com.moment.quote.socket.common.pockets.AuthReqBody");
    AuthRespBody = root.lookup("com.moment.quote.socket.common.pockets.AuthRespBody");

    JoinReqBody = root.lookup("com.moment.quote.socket.common.pockets.JoinReqBody");
    JoinGroupResult = root.lookup("com.moment.quote.socket.common.pockets.JoinGroupResult");
    JoinRespBody = root.lookup("com.moment.quote.socket.common.pockets.JoinRespBody");

    ChatReqBody = root.lookup("com.moment.quote.socket.common.pockets.ChatReqBody");
    ChatRespBody = root.lookup("com.moment.quote.socket.common.pockets.ChatRespBody");

    ChatType = root.lookup("com.moment.quote.socket.common.pockets.ChatType");
    DeviceType = root.lookup("com.moment.quote.socket.common.pockets.DeviceType");
    Command = root.lookup("com.moment.quote.socket.common.pockets.Command");
}

function initWs(url,fn) {
    try {
        var ws = new WebSocket(url);
        ws.binaryType = 'arraybuffer'; // 'blob';//
        initWsEvent(ws, url,fn);
        return ws;
    } catch (e) {
        reconn(url, null, e);
    }
}

function initWsEvent(ws, url,fn) {
    ws.onopen = function (event) {
        var ws = event.srcElement;
        stat.connCount++;
        websockets.push(ws);
        lastInteractionTime = new Date().getTime();
        var command = Command.values.COMMAND_AUTH_REQ;
        var bodyData = {
            deviceId: "deviceId--888888888888"
            , seq: 1
            , deviceType: DeviceType.DEVICE_TYPE_PC
            , deviceInfo: "chrome"
            , token: "token"
        };
        sendPacket(ws, command, AuthReqBody, bodyData);
    };

    ws.onmessage = function (event) {
        var ws = event.srcElement;
        stat.received++;
        var arrayBuffer = event.data;
        var byteBuffer = ByteBuffer.wrap(arrayBuffer);
        var command = Command.valuesById[byteBuffer.readByte()];
        // console.log("收到消息", command, byteBuffer);
        arrayBuffer = byteBuffer.toArrayBuffer();
        byteBuffer = ByteBuffer.wrap(arrayBuffer);
        var uint8Array = new Uint8Array(arrayBuffer);
        handler[command].call(handler[command], uint8Array, event, ws,fn);
        lastInteractionTime = new Date().getTime();
    };
    ws.onclose = function (event) {
        // var ws = event.srcElement;
        reconn(url, event, null);
    };
    ws.onerror = function (event) {
        var ws = event.srcElement;
        console.log("error", event);
        reconn(url, event, null)
    };
}

/**
 * 重连
 *
 * @param url
 * @param event
 * @param e
 */
function reconn(url, event, e) {
    if (!needconn) {
        console.log("已经不需要重连了", event, e);
        return;
    }

    if (reconnLock) {
        console.log("没有拿到重连权限", event, e);
        return;
    }

    reconnLock = true;
    stat.reconnCount++;

    setTimeout(function () {
        console.log("开始第次" + stat.reconnCount + "重连:" + url, event, e);
        initWs(url);
        reconnLock = false;
    }, reconnInterval);
}


/**
 * 发送packet
 *
 * @param {} ws
 * @param {} command
 * @param {} BodyClass
 * @param {} bodyData
 */
function sendPacket(ws, command, BodyClass, bodyData) {
    var bodyObj = null;
    if (bodyData) {
        bodyObj = BodyClass.create(bodyData);
    }

    var bodyBuffer = null;
    if (bodyObj) {
        bodyBuffer = BodyClass.encode(bodyObj).finish();
    }

    sendBuffer(ws, command, bodyBuffer);
}

/**
 * 发送buffer
 * @param {} ws
 * @param {} command
 * @param {} bodyBuffer
 */
function sendBuffer(ws, command, bodyBuffer) {
    var bodyLength = 0;
    if (bodyBuffer) {
        bodyLength = bodyBuffer.length;
    }

    var allBuffer = ByteBuffer.allocate(1 + bodyLength);
    allBuffer.writeByte(command);

    if (bodyBuffer) {
        allBuffer.append(bodyBuffer);
    }
    ws.send(allBuffer.buffer);
    console.log("已经发送", Command.valuesById[command], allBuffer);
    lastInteractionTime = new Date().getTime();
}

/**
 * 发送心跳
 */
function ping() {
    var nowTime = new Date().getTime();
    var iv = nowTime - lastInteractionTime; // 已经多久没发消息了
    if ((heartbeatSendInterval + iv) >= heartbeatTimeout) {
        var command = Command.values.COMMAND_HEARTBEAT_REQ;
        for (var i = 0; i < websockets.length; i++) {
            var ws = websockets[i];
            sendBuffer(ws, command, null);
        }
    }
}

setInterval("ping()", heartbeatSendInterval);


/**
 * 消息处理者
 * @type
 */
var handler = {};

/**
 * 鉴权响应处理，成功后发送入组消息
 *
 * @param uint8Array
 * @param event
 * @param ws
 * @constructor
 */
var  TIMED="TIMED_10023"
handler.COMMAND_AUTH_RESP = function (uint8Array, event, ws,fn) {
    var respBody = AuthRespBody.decode(uint8Array);
    var command = Command.values.COMMAND_JOIN_GROUP_REQ;
    var bodyData = {
        group:TIMED
    };
    sendPacket(ws, command, JoinReqBody, bodyData);
};

/**
 * 入组响应处理
 *
 * @param uint8Array
 * @param event
 * @param ws
 * @constructor
 */
handler.COMMAND_JOIN_GROUP_RESP = function (uint8Array, event, ws) {
    var respBody = JoinRespBody.decode(uint8Array);
//	console.log("已经进入组:" + respBody.group);
};
/**
 * 消息响应
 *
 * @param uint8Array
 * @param event
 * @param ws
 * @constructor
 */
handler.COMMAND_CHAT_RESP = function (uint8Array, event, ws,fn) {
    var respBody = ChatRespBody.decode(uint8Array);
    fn(respBody)
};
