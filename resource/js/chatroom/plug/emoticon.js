/**
 * 表情功能
 */
(function () {
    let Emoticon = {};

    Emoticon.openEmoticonPage = function () {
        let data = {};
        layui.use('laytpl', function (laytpl) {
            let getTpl = emoticonPageHtml.innerHTML;
            laytpl(getTpl).render(data, function (html) {
                layer.open({
                    id: "emoticonPage",
                    type: 1,
                    moveOut: true,
                    area: ['350px', '500px'], //宽高
                    title: '表情',
                    shade: 0,
                    maxmin: true,
                    fixed: false,
                    content: html
                });

                let data = parent.RequestData.getMyEmoticon();
                renderingBox(data);
            });
        });
    };

    let renderingBox = function (data) {
        layui.use('laytpl', function (laytpl) {
            let getTpl = emoticonBoxHtml.innerHTML;
            laytpl(getTpl).render({
                "data": data
            }, function (html) {
                $("#emoticonView").html(html);
            });
        });

    };

    Emoticon.addEmoticon = function () {
        let url = $("#emoticonUrlInput").val();
        parent.RequestData.addEmoticon(url);
        renderingBox(parent.RequestData.getMyEmoticon());
    };

    Emoticon.selectSendEmoticon = function (control) {
        let flag = $("#deleteEmoticonCheck").prop("checked");
        if (!flag) {
            //添加表情包
            let img = $(control).children("div").children("img");
            let url = $(img).attr("src");
            //sendPictureMessag(url);
            //console.log(url);
            Rich.addImg(url);
            layer.close(layer.index);
        } else {
            //删除表情包
            let img = $(control).children("div").children("img");
            let emoticonId = $(img).attr("emoticonId");
            parent.RequestData.deleteEmoticon(emoticonId);
            renderingBox(parent.RequestData.getMyEmoticon());
        }

    };

    function openQuickEmoticonMenu(control) {
        let url = $(control).attr("src");
        let data = {
            "url": url
        };

        layui.use('laytpl', function (laytpl) {
            let getTpl = chatMessagePictureMenuHtml.innerHTML;
            laytpl(getTpl).render(data, function (html) {
                layer.tips(html, control, {
                    tips: [1]
                });
            });
        });
    }

    function quickAddEmoticon(url) {
        parent.RequestData.addEmoticon(url);
    }

    let copyText = function (text) {
        let textarea = document.createElement("input"); //创建input对象
        let currentFocus = document.activeElement; //当前获得焦点的元素
        document.body.appendChild(textarea); //添加元素
        textarea.value = text;
        textarea.focus();
        let flag;
        if (textarea.setSelectionRange)
            textarea.setSelectionRange(0, textarea.value.length); //获取光标起始位置到结束位置
        else
            textarea.select();
        try {
            flag = document.execCommand("copy"); //执行复制
            layer.msg("复制成功");
        } catch (eo) {
            flag = false;
            layer.msg("复制失败");
        }
        document.body.removeChild(textarea); //删除元素
        currentFocus.focus();
        return flag;
    };


    window.Emoticon = Emoticon;
})();