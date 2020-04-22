document.addEventListener("visibilitychange", function() {
	if(document.hidden) {
		//这里写切换到后台的时候要保存的东西
		socket.send("");
		backgroundKeepLinkTimer = window.setInterval(function() {
			if(roleList != null && userId != null && memberInfoMap != null) {
				socket.send("");
			}
		}, 50000);
	} else {
		//这里写重后台返回来的时候触发的方法    
		clearInterval(backgroundKeepLinkTimer);
	}
});