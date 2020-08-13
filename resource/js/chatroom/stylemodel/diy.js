(function () {

    $("#diyModelButton").click(function () {
        addHtml();
        run();
        addRichtextEvent();
        //禁用其他的模式按键
        $("#diyModelButton").attr("disabled", "disabled");
        $("#mobileModelButton").attr("disabled", "disabled");

        //重新加载控件事件
        // MessageBox.sendMessageBtnEvent();


        //重新加载下方的图片上传
        loadUploadButton();

    });

    let addHtml = function () {
        let viewHtml = new Array(3);
        viewHtml[0] = memberAndRoleDiv.innerHTML;
        viewHtml[1] = plotDiv.innerHTML;
        viewHtml[2] = oderDiv.innerHTML;

        $("#view").html("");
        for (let i = 0; i < viewHtml.length; i++) {
            let diyBoxHtml = "<div class=\"grid-stack-item\" data-gs-x=\"" + i * 4 + "\" data-gs-y=\"0\" data-gs-width=\"4\" data-gs-height=\"8\"><div class=\"grid-stack-item-content\">" +
                viewHtml[i] +
                "</div></div>";
            view.innerHTML = view.innerHTML + diyBoxHtml;
        }

    };

    let run = function () {
        let options = {
            float: true
        };
        $('.grid-stack').gridstack(options);
    };

})();