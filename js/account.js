$(location).ready(function() {
	loginRequest();
})

function loginRequest() {
	$.ajax({
		type: "put",
		url: requestHeah + "/auth/common",
		data: JSON.stringify({
			"user": "",
			"password": ""
		}),
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
		dataType: "json",
		contentType: "application/json;charset=UTF-8",
		success: function(result) {
			if(result.code == 0) {
				toIndexPage();
			}
		}
	})
}

function loginSubmit() {
	$.ajax({
		type: "put",
		url: requestHeah + "/auth/common",
		data: JSON.stringify({
			"user": $("#loginUser").val(),
			"password": $("#loginPassword").val()
		}),
		dataType: "json",
		contentType: "application/json;charset=UTF-8",
		success: function(result) {
			alert(result.message);
			if(result.code == 0) {
				toIndexPage();
			}
		}
	});
}

function getEmailCode(btn) {
	$(btn).attr("disabled", true);
	$.ajax({
		type: "get",
		url: requestHeah + "/register/email/getCode?email=" + $("#userName").val(),
		success: function(result) {
			if(result.code == 0) {
				var countTime = 70;
				var emailCodeTimer = setInterval(function() {
					countTime--;
					$(btn).html("冷却倒计时(" + countTime + ")");
					if(countTime <= 0) {
						$(btn).attr("disabled", false);
						$(btn).html("获取验证码");
						clearInterval(emailCodeTimer);
					}
				}, 1000);
			} else {
				$(btn).attr("disabled", false);
			}
			alert(result.message);
		}
	});
}

function registSubmit() {
	var user = $("#userName").val();
	var password = $("#password").val();
	var passwordAgain = $("#passwordAgain").val();
	var emailCode = $("#emailCode").val();
	if(password == passwordAgain) {
		$.ajax({
			type: "put",
			url: requestHeah+"/register/eamil",
			data: JSON.stringify({
				"email": user,
				"password": password,
				"mailVerificationCode":emailCode
			}),
			dataType: "json",
			contentType: "application/json;charset=UTF-8",
			success: function(result) {
				if(result.code == 0) {
					alert(result.message);
					toLoginPage();
				}
				if(result.code == 1) {
					alert(result.message);
				}
			}
		})
	} else {
		alert("两次密码输入不正确");
	}
}

function toLoginPage() {
	$(location).attr('href', 'login.html');
}

function toIndexPage() {
	$(location).attr('href', 'BackstagPage/iframe.html');
}

function toRegistPage() {
	$(location).attr('href', 'register.html');
}