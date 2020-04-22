function selectionAttributeCheck(control) {
	$("textarea[name=gameTextarea]").html()
}

function autoChangeMessageInput() {
	var windowWidth = document.documentElement.clientWidth;
	var windowHeight = document.documentElement.clientHeight;
	if(windowWidth < 600) {
		$("#gameTextarea").css('min-height', '35px');
		$("button[name='gameMessageButton']").css('height', '35px');
		
		$("#makecomplaintsTextarea").css('min-height', '35px');
		$("button[name='makecomplaintsMessageButton']").css('height', '35px');
		
		$("#privateTextarea").css('min-height', '35px');
		$("button[name='privateMessageButton']").css('height', '35px');
		switchMobliePhoneModel();
	}

	if(windowWidth >= 600) {
		$("#gameTextarea").css('min-height', '75px');
		$("button[name='gameMessageButton']").css('height', '75px');
		
		$("#makecomplaintsTextarea").css('min-height', '75px');
		$("button[name='makecomplaintsMessageButton']").css('height', '75px');
		
		$("#privateTextarea").css('min-height', '75px');
		$("button[name='privateMessageButton']").css('height', '75px');
	}
	
}

window.onresize = function() {
	autoChangeMessageInput();
}

function atMember(control, messageType) {
	var atMemberStr = "@" + $(control).attr('alt');

	if(messageType == 1) {
		//var temstr = $("textarea[name='gameTextarea']:checked").val();
		$("#gameTextarea").html($("#gameTextarea").html() + atMemberStr);
	}

	if(messageType == 2) {
		$("#makecomplaintsTextarea").html($("#makecomplaintsTextarea").html() + atMemberStr);
	}
}


function switchMobliePhoneModel() {
	$("#tabCard").css('display', "");

	$("#tabCardPlayerList").html($("#viewPlayerListHtml").html());

	$("#tabCardRole").html($("#viewRoleHtml").html());
	$("#viewRoleHtml").parent().remove();

	$("#tabCardGame").html($("#viewGameHtml").html());
	$("#viewGameHtml").parent().remove();

	$("#tabCardMakecomplaints").html($("#viewMakecomplaintsHtml").html());
	$("#viewMakecomplaintsHtml").parent().remove();

	$("#tabCardCollection").html($("#viewCollectionHtml").html());
	$("#viewCollectionHtml").parent().remove();
	
	$("#tabCardPrivate").html($("#privateMessageHtml").html());
	$("#viewPrivateHtml").parent().remove();
	
	$("[class='layui-col-xs12 layui-col-sm6 layui-col-md4 layui-fluid']").remove();
	
	addListtenr();
}

if(/Android [4-6]/.test(navigator.appVersion)) {
	window.addEventListener('resize', function() {
		if(document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
			window.setTimeout(function() {
				document.activeElement.scrollIntoViewIfNeeded()
			}, 50)
		}
	})
}