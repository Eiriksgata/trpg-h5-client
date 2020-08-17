(function () {

    let myBubble = {};
    myBubble.color = "";
    myBubble.fontColor = "";
    myBubble.fontSize = 15;
    myBubble.font = "";

    myBubble.saveBubbleConfig = function () {
        let data = {
            color: myBubble.color,
            fontColor: myBubble.fontColor,
            fontSize: myBubble.fontSize
        };
        layui.data("appData", {
            key: "bubble",
            value: data
        });
    };

    myBubble.openChatBubbleMenu = function (control) {
        let html = chatBubbleMenuHtml.innerHTML;
        layer.tips(html, control, {
            tips: [1]
        });
    };

    myBubble.openChatBubbleSetPage = function () {
        layer.open({
            type: 1,
            skin: "unSelect",
            area: ['350px', '400px'],
            shade: 0,
            title: "BubbleSet",
            moveOut: true,
            maxmin: true,
            fixed: false,
            content: chatBubblePageHtml.innerHTML
        });

        layui.use('colorpicker', function () {
            let colorpicker = layui.colorpicker;
            //渲染
            colorpicker.render({
                elem: '#bubbleColorSelect',
                done: function (color) {
                    myBubble.color = color;
                    myBubble.saveBubbleConfig();
                }
            });
        });

        layui.use('colorpicker', function () {
            let colorpicker = layui.colorpicker;
            //渲染
            colorpicker.render({
                elem: '#bubbleFontColorSelect',
                done: function (color) {
                    myBubble.fontColor = color;
                    myBubble.saveBubbleConfig();
                }
            });
        });
    };

    myBubble.changeBubbleFontSize = function (control) {
        myBubble.fontSize = $(control).val();
        myBubble.saveBubbleConfig();
    };


    let loadBubbleConfig = function () {
        if (layui.data("appData").bubble == null || layui.data("appData").bubble === undefined) {
            return;
        }
        let loadData = layui.data("appData").bubble;
        myBubble.color = loadData.color;
        myBubble.fontColor = loadData.fontColor;
        myBubble.fontSize = loadData.fontSize;
    };

    loadBubbleConfig();
    window.myBubble = myBubble;
})();