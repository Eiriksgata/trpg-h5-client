$(window).ready(function () {

    //长连接
    window.socket = parent.socket;

    //框架的请求接口
    window.RequestData = parent.RequestData;

});

function quitLogin() {
    $.ajax({
        type: "get",
        url: "http://localhost/quitLogin",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success: function (result) {
            layer.msg(result.message + "[2s后自动跳转到登录界面]");
            setTimeout(function () {
                window.location = "../../login.html";
            }, 2000);
        }
    });
}