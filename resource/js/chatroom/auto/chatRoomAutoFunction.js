(function () {

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
        let webview = plus.webview.currentWebview();
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


    let notFound = function (img) {
        img.src = "../../resource/images/null.jpg";
        img.onerror = null; //如果错误图片也不存在就会死循环一直跳，所以要设置成null，也可以不加
        layer.msg("图片信息加载错误");
    };

    window.notFound = notFound;

})();

