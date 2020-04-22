(function(w) {

	var messageHandler = function(socketData) {
		//进行自定义消息创建判定,并且转换为特殊的文本格式
		if(socketData.message != null || socketData.message != undefined) {
			socketData.message = MessageAnalysis.richTextConvert(socketData.message);
		}

		switch(socketData.messageType) {
			case 0:
				dataInit();
				return;
			
			
		}

	}

	var dataInit = function() {
		InitLoad.getMyUserInfo();
		InitLoad.getMyJoinRoomInfo();
		InitLoad.getMyRelationship();
		$("#loadTipsMessageBox").remove();
		$("iframe").attr("src","index.html");
		
	}

	w.messageHandler = messageHandler;
})(window);