(function(w) {
	var ReuqestData = {};

	//动态的处理用户的信息数据，如果列表中没有数据，那么会请求服务器获取并且存储，如果有则直接取出
	RequestData.getUserInfo() = function(userId) {
		if(allMemberInfoMap[userId] == null || allMemberInfoMap[userId] == undefined) {
			$.ajax({
				type: "get",
				url: REQUESTHEAD + "/user/info?id=" + userId,
				xhrFields: {
					withCredentials: true
				},
				crossDomain: true,
				success: function(result) {
					if(result.code == 0){
						if(result.data != null || result.data.id != undefined){
							allMemberInfoMap[result.data.id] = result.data;
						}else{
							return null;
						}
					}
				}
			});
		}else{
			return allMemberInfoMap[userId];
		}
	}
	
	

	w.RequestData = RequestData;
})(window)