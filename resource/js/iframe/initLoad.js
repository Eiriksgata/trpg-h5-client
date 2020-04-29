(function(w) {
	let InitLoad = {};

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
				if(result.code !== 0) {
					layer.msg(result.message);
					return;
				}
				window.myUserInfo = result.data;
				allMemberInfoMap[myUserInfo.id] = myUserInfo;
				console.log(JSON.stringify(result));
			}
		});
	};

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
				if(result.code !== 0) {
					layer.msg(result.message);
					return;
				}
				let data = result.data;
				for(let i = 0; i < data.length; i++) {
					window.allRoomInfoMap[data[i].roomId] = data[i];
				}
				console.log(JSON.stringify(allRoomInfoMap));
			}
		});
	};

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
				if(result.code !== 0) {
					layer.msg(result.message);
					return;
				}
				let data = result.data;
                window.allRelaiton = relationDataHandle(data);
				console.log(JSON.stringify(allRelaiton));
			}
		});
	};



	function relationDataHandle(data){
		let result = {};
		data.map(function(room){
			room.map(function(relation){
                let value = {};
                value[relation.userId] = relation;
                result[relation.roomId]= value;
			})
		});
		return result;
	}


	w.InitLoad = InitLoad;
})(window);