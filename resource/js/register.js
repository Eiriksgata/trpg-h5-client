(function (w) {

    let getEmailCode = function (btn) {
        $(btn).attr("disabled", true);
        $(btn).addClass("layui-btn-disabled");
        $.ajax({
            type: "get",
            url: REQUESTHEAD + "/register/email/getCode?email=" + $("input[name='email']").val(),
            sync: false,
            success: function (result) {
                if (result.code === 0) {
                    let countTime = 70;
                    let emailCodeTimer = setInterval(function () {
                        countTime--;
                        $(btn).html("请稍等(" + countTime + ")");
                        if (countTime <= 0) {
                            $(btn).attr("disabled", false);
                            $(btn).html("获取验证码");
                            $(btn).removeClass("layui-btn-disabled");
                            clearInterval(emailCodeTimer);
                        }
                    }, 1000);
                } else {
                    $(btn).attr("disabled", false);
                    $(btn).removeClass("layui-btn-disabled");
                }
                layer.msg(result.message);
            }
        });

    };

    let registerSubmit = function (data) {
        $("input[lay-filter='register']")
            .addClass("layui-bg-gray")
            .attr("disable", true);
        let registerBtnTimer = setTimeout(function () {
            layer.msg("服务器长时间无响应，请尝试重新操作。");
            $("input[lay-filter='register']")
                .removeClass("layui-bg-gray")
                .attr("disable", false);

        }, 15000);
        $.ajax({
            type: "put",
            url: REQUESTHEAD + "/register/email",
            data: data,
            dataType: "json",
            contentType: "application/json;charset=UTF-8",
            sync: false,
            success: function (result) {

                clearTimeout(registerBtnTimer);

                if (result.code === 0) {
                    layer.msg(result.message + "(稍后跳转到登录页面)");
                    $("input[lay-filter='register']").val("注册成功");
                    setTimeout(function () {
                        toLoginPage();
                    }, 1500);

                } else {
                    layer.msg(result.message);
                    $("input[lay-filter='register']")
                        .removeClass("layui-bg-gray")
                        .attr("disable", false);
                }

            }
        });

    };

    let toLoginPage = function () {
        $(location).attr('href', 'login.html');
    };

    $(document).ready(function () {
        layui.use('form', function () {
            let form = layui.form;

            //监听提交
            form.on('submit(register)', function (data) {
                if ($("input[name='password']").val() === $("#passwordAgain").val()) {
                    layer.msg("数据注册中，请稍等.");

                    registerSubmit(JSON.stringify(data.field));
                    return false;
                } else {
                    layer.msg("两次输入的密码不一致，请检查你输入的密码.")
                }

            });
        });

        $("#getVerifyCode").on("click", function () {
            getEmailCode(this);
        });

        $("#loginPageBtn").on("click", function () {
            toLoginPage();
        });

    });


})(window);


