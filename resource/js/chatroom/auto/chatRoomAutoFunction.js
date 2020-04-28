(function (w) {

    $("#importCode").load("chatRoomImportCode.html");

    if (/Android [4-6]/.test(navigator.appVersion)) {
        window.addEventListener('resize', function () {
            if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
                window.setTimeout(function () {
                    document.activeElement.scrollIntoViewIfNeeded()
                }, 50)
            }
        })
    }

    //这个不是写在首页，写在子页面（子页面才能返回，写在首页点击返回就是退出）
    //不用引入mui.js，都是h5方法
    document.addEventListener('plusready', function () {
        var webview = plus.webview.currentWebview();
        plus.key.addEventListener('backbutton', function () {
            webview.canBack(function (e) {
                if (e.canBack) {
                    webview.back();
                } else {
                    webview.close(); //hide,quit
                    //plus.runtime.quit();
                }
            })
        });
    });


})(window);

