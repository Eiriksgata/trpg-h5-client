$(window).ready(function () {

    //长连接
    window.socket = parent.socket;

    //框架的请求接口
    window.RequestData = parent.RequestData;

});

function quitLogin() {
    $.ajax({
        type: "get",
        url: REQUESTHEAD + "/login/quit",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success: function (result) {
            layer.msg(result.message + "[2s后自动跳转到登录界面]");
            layui.data("login", "token", null);
            layui.data("appData", "myUserInfo", null);
            setTimeout(function () {
                window.location = "../../login.html";
            }, 2000);
        }
    });
}