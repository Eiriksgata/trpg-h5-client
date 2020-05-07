(function (w) {

    let loginSubmit = function (data) {
        let token = encryption.tokenCreate();
        $.ajax({
            type: "put",
            url: REQUESTHEAD + "/auth/common",
            beforeSend: function (request) {
                request.setRequestHeader("token", token);
            },
            data: data,
            dataType: "json",
            contentType: "application/json;charset=UTF-8",
            sync: false,
            success: function (result) {
                layer.msg(result.message);
                if (result.code === 0) {

                    //处理返还的token
                    // layui.data("login", {
                    //     key: "token",
                    //     value: result.data
                    // });
                    encryption.tokenSave(result.data);

                    //倒计时跳转
                    setTimeout(function () {
                        toIndexPage();
                    }, 1000);

                }
            },
            error: function (result) {
                layer.msg("请求出错，请向管理员反馈:" + result);
            }
        });
    };

    let getEmailCode = function (btn) {
        $(btn).attr("disabled", true);
        $.ajax({
            type: "get",
            url: REQUESTHEAD + "/register/email/getCode?email=" + $("#userName").val(),
            success: function (result) {
                if (result.code === 0) {
                    let countTime = 70;
                    let emailCodeTimer = setInterval(function () {
                        countTime--;
                        $(btn).html("冷却倒计时(" + countTime + ")");
                        if (countTime <= 0) {
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
    };

    let registerSubmit = function (data) {
        $.ajax({
            type: "put",
            url: REQUESTHEAD + "/register/eamil",
            data: data,
            dataType: "json",
            contentType: "application/json;charset=UTF-8",
            success: function (result) {
                if (result.code === 0) {
                    alert(result.message);
                    toLoginPage();
                }
                if (result.code === 1) {
                    alert(result.message);
                }
            }
        });

    };

    let toLoginPage = function () {
        $(location).attr('href', 'login.html');
    };

    let toIndexPage = function () {
        $(location).attr('href', 'BackstagPage/iframe.html');
    };


    let toRegisterPage = function () {
        $(location).attr('href', 'register.html');
    };


    $(document).ready(function () {

        layui.use('form', function () {
            let form = layui.form;

            //监听提交
            form.on('submit(register)', function (data) {
                if ($("input[name='password']").val() === $("#passwordAgain").val()) {
                    layer.msg("数据注册中，请稍等.");
                    console.log(JSON.stringify(data.field));
                    // registerSubmit(JSON.stringify(
                    //     data.field
                    // ));
                    return false;
                } else {
                    layer.msg("两次输入的密码不一致，请检查你输入的密码.")
                }

            });
        });

        $("#getVerifyCode").on("click", function () {

        });


    });


    w.toRegisterPage = toRegisterPage;
    w.toLoginPage = toLoginPage;


})(window);


