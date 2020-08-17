(function () {
    $("body").on("click", "message>img", function () {
        let layerWidth = ($(window).width() * 0.95);
        let imgWidth = parseInt($(this).css("width"));
        let multiple = layerWidth / imgWidth;
        let imgHeight = parseInt($(this).css("height"));
        let imgSrc = $(this).attr("src");
        //计算页面框显示的倍数
        let layerHeight = multiple * imgHeight;
        if (layerHeight > $(window).height() - 100) {
            layerHeight = $(window).height() - 100;
        }
        layer.open({
            type: 1,
            title: false,
            closeBtn: 1, //不显示关闭按钮
            shadeClose: true, //开启遮罩关闭
            area: [layerWidth + 'px', layerHeight + "px"],
            content: '<img style="width: 100%;" src="' + imgSrc + '">'
        });
    });
})();