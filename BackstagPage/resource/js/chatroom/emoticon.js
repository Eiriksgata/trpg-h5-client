function openEmoticonPage() {
	var data = {}
	layui.use('laytpl', function(laytpl) {
		var getTpl = emoticonPageHtml.innerHTML;
		laytpl(getTpl).render(data, function(html) {

			layer.open({
				id: "emoticonPage",
				type: 1,
				moveOut: true,
				area: ['350px', '500px'], //宽高
				title: '表情',
				shade: 0,
				maxmin: true,
				fixed: false,
				content: html
			});
			loadEmoticonData();
		});
	});
}

function loadEmoticonData() {
	$.ajax({
		type: "get",
		url: "http://localhost/emoticon/findMyEmoticon",
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
		success: function(result) {
			var data = result.data;
			renderingBox(data);
		}
	});
}

function renderingBox(data) {
	var countHtml;
	var data = {
		"data": data
	}
	layui.use('laytpl', function(laytpl) {
		var getTpl = emoticonBoxHtml.innerHTML;
		laytpl(getTpl).render(data, function(html) {
			$("#emoticonView").html(html);
		});
	});

}

function importEmoticon() {

}

function emoticonSubmit(jsonData) {
	$.ajax({
		type: "put",
		url: "http://localhost/emoticon/addEmoticon",
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
		dataType: "json",
		data: JSON.stringify(jsonData),
		contentType: "application/json;charset=UTF-8",
		success: function(result) {
			layer.msg(result.message);
			loadEmoticonData();
		}
	});
}

function addEmoticon() {
	var url = $("#emoticonUrlInput").val();
	var urlList = new Array();
	urlList[0] = url;
	var jsonData = {
		"urlList": urlList
	}

	emoticonSubmit(jsonData);

}

function selectSendEmoticon(control) {
	var flag = $("#deleteEmoticonCheck").prop("checked");
	if(!flag) {
		//发送表情包
		var img = $(control).children("div").children("img");
		var url = $(img).attr("src");
		sendPictureMessag(url);
		layer.close(layer.index);
	} else {
		//删除表情包
		var img = $(control).children("div").children("img");
		var emoticonId = $(img).attr("emoticonId");
		deleteEmoticon(emoticonId);
	}

}

function deleteEmoticon(emoticonId) {
	$.ajax({
		type: "delete",
		url: "http://localhost/emoticon/deleteEmoticon?emoticonId=" + emoticonId,
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
		success: function(result) {
			layer.msg(result.message);
			loadEmoticonData();
		}
	});
}

function openQuickEmoticonMenu(control) {
	var url = $(control).attr("src");
	var data = {
		"url":url
	}

	layui.use('laytpl', function(laytpl) {
		var getTpl = chatMessagePictureMenuHtml.innerHTML;
		laytpl(getTpl).render(data, function(html) {
			layer.tips(html, control, {
				tips: [1]
			});
		});
	});

}

function quickAddEmoticon(url) {
	var urlList = new Array();
	urlList[0] = url;
	var jsonData = {
		"urlList": urlList
	}
	emoticonSubmit(jsonData);
}

function copyText(text) {
	var textarea = document.createElement("input"); //创建input对象
	var currentFocus = document.activeElement; //当前获得焦点的元素
	document.body.appendChild(textarea); //添加元素
	textarea.value = text;
	textarea.focus();
	if(textarea.setSelectionRange)
		textarea.setSelectionRange(0, textarea.value.length); //获取光标起始位置到结束位置
	else
		textarea.select();
	try {
		var flag = document.execCommand("copy"); //执行复制
		layer.msg("复制成功");
	} catch(eo) {
		var flag = false;
		layer.msg("复制失败");
	}
	document.body.removeChild(textarea); //删除元素
	currentFocus.focus();
	return flag;
};