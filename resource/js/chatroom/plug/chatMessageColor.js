(function () {

    let myBubble = {};
    myBubble.color = "";
    myBubble.fontColor = "";
    myBubble.fontSize = 15;
    myBubble.font = "";

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
                }
            });
        });
    };

    myBubble.changeBubbleFontSize = function (control) {
        myBubble.fontSize = $(control).val();
    };


    window.myBubble = myBubble;


})();