(function(w) {
	
	document.addEventListener("visibilitychange", function() {
		if(document.hidden) {
			//这里写切换到后台的时候要保存的东西
			if(socket != null && socket != undefined) {
				backgroundKeepLinkTimer = window.setInterval(function() {
					if(socket != null && socket != undefined) {
						socket.send("");
					} else {
						clearInterval(backgroundKeepLinkTimer);
					}
				}, 50000);
			}
			
		} else {
			//这里写重后台返回来的时候触发的方法    
			clearInterval(backgroundKeepLinkTimer);
		}
	});

})(window);