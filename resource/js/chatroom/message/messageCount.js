(function () {

    let MessageCount = {};

    MessageCount.selectRegion = "";

    MessageCount.addCount = function (region) {
        if (MessageCount.selectRegion === region) return;

        if (MessageCount[region] == null || MessageCount[region] === undefined) {
            MessageCount[region] = 0;
        }
        MessageCount[region]++;
        MessageCount.showMessageCount(region);
    };

    MessageCount.clearCount = function (region) {
        MessageCount[region] = 0;
        MessageCount.showMessageCount(region);
    };

    MessageCount.showMessageCount = function (region) {
        switch (region) {
            case "square":
                $("[name='squareAllNewMessageCount']").children("span").html(MessageCount[region]);
                return;
            case "plot":
                $("[name='plotAllNewMessageCount']").children("span").html(MessageCount[region]);
                return;
            default:
                return;
        }
    };

    //加载消息计数点击控件监听事件
    MessageCount.selectButtonEvent = function () {
        $("[name='squareAllNewMessageCount']").on("click", function () {
            MessageCount.clearCount("square");
            MessageCount.selectRegion = "square";
        });

        $("[name='plotAllNewMessageCount']").on("click", function () {
            MessageCount.clearCount("plot");
            MessageCount.selectRegion = "plot";
        });
    };

    window.MessageCount = MessageCount;

})();