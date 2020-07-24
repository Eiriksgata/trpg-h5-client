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
        //img.onerror = null; //如果错误图片也不存在就会死循环一直跳，所以要设置成null，也可以不加
        //layer.msg("图片信息加载错误");
    };

    window.onbeforeunload = function (e) {
        // var e=e||window.event;
        // e.returnValue="请确认是否退出？";
    };

    //当浏览器大小变化时
    // $(window).resize(function () {
    //     //浏览器时下窗口可视区域高度
    //     // alert($(window).height());
    //     // //浏览器时下窗口文档的高度
    //     // alert($(document).height());
    //     // //浏览器时下窗口文档body的高度
    //     // alert($(document.body).height());
    //     // //浏览器时下窗口文档body的总高度 包括border padding margin
    //     // alert($(document.body).outerHeight(true));
    //
    //
    //     //console.log($(window).height());
    //     //$("#switchRoomListBox").css("height", $(window).height() - 50);
    //
    // });

    let changeRoomModel = function () {
        if (parseInt($(document.body).width()) < 500) {
            $("#mobileModelButton").click();
        }
    };

    window.changeRoomModel = changeRoomModel;
    window.notFound = notFound;

})();

