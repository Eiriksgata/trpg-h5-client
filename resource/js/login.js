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

    let toIndexPage = function () {
        $(location).attr('href', 'BackstagPage/iframe.html');
    };


    let toRegisterPage = function () {
        $(location).attr('href', 'register.html');
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

        }

        layui.use('form', function () {
            let form = layui.form;

            //监听提交
            form.on('submit(login)', function (data) {
                layer.msg("正在登录中，请稍等.");
                loginSubmit(JSON.stringify(data.field));
                return false;
            });


        });

        $("#emailRegisterBtn").on("click", function () {
            toRegisterPage();
        });

    });


})();


