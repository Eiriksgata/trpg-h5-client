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

    let toIndexPage = function () {
        $(location).attr('href', 'BackstagPage/iframe.html');
    };


    let toRegisterPage = function () {
        $(location).attr('href', 'register.html');
    };


    $(document).ready(function () {
        loginSubmit(JSON.stringify({
            "user": "",
            "password": ""
        }));

        layui.use('form', function () {
            let form = layui.form;

            //监听提交
            form.on('submit(login)', function (data) {
                layer.msg("正在登录中，请稍等.");
                loginSubmit(JSON.stringify(data.field));
                return false;
            })
        });

        $("#getVerifyCode").on("click",function(){
            alert();
        });


    });


    w.toRegisterPage = toRegisterPage;
    w.toIndexPage = toIndexPage;


})(window);


