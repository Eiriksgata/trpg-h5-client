(function () {

    $(window).ready(function () {

        $("#loadTipsMessageBox").html("尝试建立数据库信息");

        database.supportCheck();

        database.dataBaseInit();


        openSocket();
        //console.log(RequestData.getUserState([1, 30, 33]));
    });

    let openSocket = function () {

        if (typeof(WebSocket) === "undefined") {
            layer.msg("您的浏览器不支持WebSocket");
        } else {
            //let token = encryption.tokenCreate();
            //实现化WebSocket对象，指定要连接的服务器地址与端口  建立连接
            let socketUrl = REQUESTHEAD + "/linkSocket";
            socketUrl = socketUrl.replace("https", "ws").replace("http", "ws");
            socket = new WebSocket(socketUrl);

            //打开事件
            socket.onopen = function () {
                $("#loadTipsMessageBox").html("建立通讯链接");
            };

            //获得消息事件
            socket.onmessage = function (msg) {
                let result = JSON.parse(msg.data);
                if (result.code === 0) {
                    messageHandler(result.data);
                }

            };

            //关闭事件
            socket.onclose = function () {
                $("#loadTipsMessageBox").html("信号中断(可能原因为：1.服务器异常 2.重复连接 3.尚未登录)<\\br>稍后跳转到登录页面");
                socket = null;
                location.href = "../login.html";

            };

            //发生了错误事件
            socket.onerror = function () {
                console.log("通讯过程中发生了错误，请重新连接");
                socket = null;
            }
        }
    }

})();