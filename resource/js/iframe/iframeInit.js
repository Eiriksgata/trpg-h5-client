(function() {

	$(window).ready(function() {
		openSocket();
	});

	var openSocket = function() {
		if(typeof(WebSocket) == "undefined") {
			layer.msg("您的浏览器不支持WebSocket");
		} else {
			//实现化WebSocket对象，指定要连接的服务器地址与端口  建立连接
			var socketUrl = REQUESTHEAD + "/linkSocket";
			socketUrl = socketUrl.replace("https", "ws").replace("http", "ws");
			socket = new WebSocket(socketUrl);
			//打开事件
			socket.onopen = function() {
				$("#loadTipsMessageBox").html("建立通讯链接");

			};

			//获得消息事件
			socket.onmessage = function(msg) {
				var result = JSON.parse(msg.data);
				if(result.code == 0) {
					messageHandler(result.data);
				}

			};

			//关闭事件
			socket.onclose = function() {
				$("#loadTipsMessageBox").html("信号中断(可能原因为：1.服务器异常 2.重复连接 3.尚未登录)");
				socket = null;
			};

			//发生了错误事件
			socket.onerror = function() {
				console.log("通讯过程中发生了错误，请重新连接");
				socket = null;
			}
		}
	}

})();