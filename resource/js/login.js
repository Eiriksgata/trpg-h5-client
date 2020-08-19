(function () {

    let loginSubmit = function (data) {
        let token = encryption.tokenCreate();
        let loginBtnTimer = setTimeout(function () {
            layer.msg("服务器响应时间过久，可以尝试重新登录.");
            $("input[lay-filter='login']")
                .val("登录")
                .removeClass("layui-bg-gray")
                .attr("disabled", false);
        }, 15000);

        $("input[lay-filter='login']")
            .val("登陆中")
            .addClass("layui-bg-gray")
            .attr("disabled", true);


        $.ajax({
            type: "put",
            url: REQUESTHEAD + "/auth/common",
            beforeSend: function (request) {
                if (token != null) {
                    request.setRequestHeader("token", token);
                }
            },
            data: data,
            dataType: "json",
            contentType: "application/json;charset=UTF-8",
            sync: false,
            success: function (result) {
                clearTimeout(loginBtnTimer);

                layer.msg(result.message);

                if (result.code === 0) {
                    encryption.tokenSave(result.data);
                    $("input[lay-filter='login']")
                        .val("登陆成功，稍后跳转")
                        .removeClass("layui-bg-gray")
                        .addClass("layui-bg-blue");

                    //倒计时跳转
                    setTimeout(function () {
                        toIndexPage();
                    }, 1000);

                } else {
                    $("input[lay-filter='login']")
                        .val("登录")
                        .removeClass("layui-bg-gray")
                        .attr("disabled", false);

                }

            },
            error: function (result) {
                layer.msg("请求出错，请向管理员反馈:" + result);
            }
        });
    };


    let emailLoginSubmit = function (data) {
        $.ajax({
            type: "put",
            url: REQUESTHEAD + "/login/quick/email",
            data: data,
            dataType: "json",
            contentType: "application/json;charset=UTF-8",
            sync: false,
            success: function (result) {
                layer.msg(result.message);
                if (result.code === 0) {
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

    let toIndexPage = function () {
        $(location).attr('href', 'BackstagPage/iframe.html');
    };


    let toRegisterPage = function () {
        $(location).attr('href', 'register.html');
    };


    let getEmailCode = function (btn) {
        $(btn).attr("disabled", true);
        $(btn).addClass("layui-btn-disabled");
        $.ajax({
            type: "get",
            url: REQUESTHEAD + "/login/quick/email/getCode?email=" + $("input[name='email']").val(),
            sync: false,
            beforeSend: function (request) {
                request.setRequestHeader("Accept-Language", "en-us")
            },
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

    let loadCheckLoginState = function () {
        $.ajax({
            type: "put",
            url: REQUESTHEAD + "/auth/common",
            data: JSON.stringify({
                "user": "",
                "password": ""
            }),
            dataType: "json",
            contentType: "application/json;charset=UTF-8",
            sync: false,
            success: function (result) {
                if (result.code === 0) {
                    layui.use('layer', function (layer) {
                        layer.msg("检测到处于登录状态，自动跳转..");
                    });
                    //倒计时跳转
                    setTimeout(function () {
                        toIndexPage();
                    }, 1000);
                }

            },
            error: function (result) {

            }
        });
    };

    $(document).ready(function () {

        let tokenCheck = encryption.tokenCreate();
        if (tokenCheck != null) {
            layui.use('layer', function (layer) {
                layer.msg("检测到存在登录状态，正在自动登录中,请稍等");
            });

            loginSubmit(JSON.stringify({
                "user": "",
                "password": ""
            }));

        } else {
            loadCheckLoginState();
        }

        layui.use('form', function () {
            let form = layui.form;

            //监听提交
            form.on('submit(login)', function (data) {
                layer.msg("正在登录中，请稍等.");
                loginSubmit(JSON.stringify(data.field));
                return false;
            });

            form.on('submit(emailLogin)', function (data) {
                layer.msg("正在登录中，请稍等.");
                emailLoginSubmit(JSON.stringify(data.field));
                return false;
            });

        });

        $("#emailRegisterBtn").on("click", function () {
            toRegisterPage();
        });

        $("#logonPageBtn").on("click", function () {
            $(location).attr('href', 'login.html');
        });

        $("#emailQuickRegisterBtn").on("click", function () {
            $(location).attr('href', 'emailLogin.html');
        });

        $("#getVerifyCode").on("click", function () {
            getEmailCode(this);
        });

    });


})();


