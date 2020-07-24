(function () {

    let lockMore = false;//锁定
    let pageNumber = 1;
    let pageSize = 4;
    let lastRoomId = 0;

    $(window).scroll(function (event) {
        let wScrollY = window.scrollY; // 当前滚动条位置
        let wInnerH = window.innerHeight; // 设备窗口的高度（不会变）
        let bScrollH = document.body.scrollHeight; // 滚动条总高度
        if (wScrollY + wInnerH >= bScrollH) {
            if (!lockMore) {
                lockMore = true;
                loadAllRoomList();
                $("#loadMoreBtn").attr("disabled", true).addClass("layui-btn-disabled").html("加载中..");
            }
        }
    });


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


    $(window).ready(function () {
        loadAllRoomList();
    });

    $("#findJoinRoomBtn").on("click", function () {
        loadJoinRoomList();
    });

    $("#findRoomBtn").on("click", function () {
        searchRoomId();
    });

    $("#loadMoreBtn").on("click", function () {
        $("#loadMoreBtn").attr("disabled", true).addClass("layui-btn-disabled").html("加载中..");
        loadAllRoomList();
    });


    let searchRoomId = function () {
        $.ajax({
            type: "get",
            url: REQUESTHEAD + "/searchRoomId?roomId=" + $("input[name=searchRoomId]").val(),
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success: function (data) {
                if (data.code === 0) {
                    $("#roomList").html("");
                    $("#listType").html("搜索的房间");
                    $("#loadMoreBtn").attr("disabled", true).addClass("layui-btn-disabled").html("没有更多的了");
                    lockMore = true;
                    if (data.data == null || data.data[0] == null) {
                        layer.msg("找不到该房间");
                    } else {
                        addRoomList(data.data[0]);
                    }
                } else {
                    layer.msg(data.message);
                }
            }
        });
    };

    function loadJoinRoomList() {
        $.ajax({
            type: "get",
            url: REQUESTHEAD + "/findJoinRoomList",
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success: function (data) {
                if (data.code === 0) {
                    $("#roomList").html("");
                    loadTableRendering(data.data);
                    $("#loadMoreBtn").attr("disabled", true).addClass("layui-btn-disabled").html("没有更多的了");
                    lockMore = true;
                    $("#listType").html("加入的房间列表");
                } else {
                    layer.msg(data.message);
                }
            }
        });
    }

    function addRoomList(data) {
        layui.use('laytpl', function (laytpl) {
            let getTpl = roomListHtml.innerHTML,
                view = document.getElementById('roomList');
            laytpl(getTpl).render(data, function (html) {
                //view.innerHTML = view.innerHTML + html;
                $("#roomList").append(html);
            });
        });
    }

    function loadTableRendering(data) {
        for (let i = 0; i < data.length; i++) {
            addRoomList(data[i]);
        }
    }

    function loadAllRoomList() {
        $.ajax({
            type: "get",
            url: REQUESTHEAD + "/findRoomList?pageNum=" + pageNumber + "&&pageSize=" + pageSize,
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success: function (result) {
                if (result.code === 0) {
                    //检测
                    if (result.data[0].id === lastRoomId) {
                        $("#loadMoreBtn").html("没有更多了");
                        return;
                    }
                    pageNumber++;
                    loadTableRendering(result.data);
                    $("#loadMoreBtn").attr("disabled", false).removeClass("layui-btn-disabled").html("加载更多");
                    lockMore = false;
                    lastRoomId = result.data[0].id;
                } else {
                    layer.msg(result.message);
                }

            }
        });

    }


})();