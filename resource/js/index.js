(function () {

    $(window).ready(function () {

        //长连接
        window.socket = parent.socket;

        //框架的请求接口
        window.RequestData = parent.RequestData;

    });

    let userQuit = function () {
        layui.data("login", null);
        layui.data("appData", null);
        $.ajax({
            type: "get",
            url: REQUESTHEAD + "/login/quit",
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success: function (result) {

            }
        });
    };

    window.userQuit = userQuit;

})();