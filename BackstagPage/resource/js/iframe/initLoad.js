(function(w) {
	var InitLoad = {};

	InitLoad.getMyUserInfo = function() {
		$("#loadTipsMessageBox").html("载入用户信息");
		$.ajax({
			type: "get",
			url: REQUESTHEAD + "/my/user/info",
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			async: false,
			success: function(result) {
				if(result.code != 0) {
					layer.msg(result.message);
					return;
				}
				window.myUserInfo = result.data;
				allMemberInfoMap[myUserInfo.id] = myUserInfo;
				console.log(JSON.stringify(result));
			}
		});
	}

	InitLoad.getMyJoinRoomInfo = function() {
		$("#loadTipsMessageBox").html("载入已加入的房间信息");
		$.ajax({
			type: "get",
			url: REQUESTHEAD + "/my/join/roomInfoList",
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			async: false,
			success: function(result) {
				if(result.code != 0) {
					layer.msg(result.message);
					return;
				}
				var data = result.data;
				for(var i = 0; i < data.length; i++) {
					window.allRoomInfoMap[data[i].roomId] = data[i];
				}
				console.log(JSON.stringify(allRoomInfoMap));
			}
		});
	}

	InitLoad.getMyRelationship = function() {
		$("#loadTipsMessageBox").html("载入关联");
		$.ajax({
			type: "get",
			url: REQUESTHEAD + "/my/allRoomRelationship",
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			async: false,
			success: function(result) {
				if(result.code != 0) {
					layer.msg(result.message);
					return;
				}
				var data = result.data;
				window.allRelaiton = data;
				console.log(JSON.stringify(allRelaiton));
			}
		});
	}

	w.InitLoad = InitLoad;
})(window)