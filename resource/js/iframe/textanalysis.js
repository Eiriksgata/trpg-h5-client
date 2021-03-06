(function () {

    let Rich = {};

    Rich.lastClickInputControl = null;

    Rich.controlCompile = function (content) {
        let imgHtmlList = content.match(/<img.+?>/g);
        $.each(imgHtmlList, function (key, value) {
            let text = "[name=richtext,type=picture,content=" + $(value).attr("src") + "]";

            content = content.replace(value, text);
        });
        return content;
        // $(".richtextInputBox>img[name='richtextTemporary']").each(function (index) {
        //     let text = "[name=richtext,type=picture,content=" + $(this).attr("src") + "]";
        //     this.replaceWith(text);
        //     console.log($(this));
        // });
        //
        // $(".richtextInputBox.a[name='richtextTemporary']").each(function (index) {
        //     let text = "[name=richtext,type=link,content=" + $(this).attr("href") + "]";
        //     $(this).replaceWith(text);
        // });
    };


    Rich.analysis = function (content) {
        let regex = /\[name=[A-z]+,type=[A-z]+,content=.*?\]/g;
        //let inputText = $(inputControl).html();
        let controlTextList = content.match(regex);
        if (controlTextList == null) return content;
        for (let i = 0; i < controlTextList.length; i++) {
            let controlName = controlTextList[i].match(/name=[A-z]+/)[0].substring(5);
            let controlType = controlTextList[i].match(/type=[A-z]+/)[0].substring(5);
            let controlContent = controlTextList[i].match(/content=.*/)[0];
            if (controlContent == null) {
                controlContent = "";
            } else {
                controlContent = controlContent.substring(8, controlContent.length - 1);
            }
            content = content.replace(controlTextList[i], Rich.getCreateText(controlName, controlType, controlContent));
            //$(inputControl).html(inputText);
        }

        return content;
    };


    Rich.getCreateText = function (name, type, content) {
        if (name === "richtext") {
            switch (type) {
                case "picture":
                    return "<img style='max-width: 70%' class='richtextPicture' src='" + content + "'>";
                case "link":
                    return "<a href='javascript:;' onclick=\"xadmin.open('New windows','" + content + "','','')\">" + content + "</a>";
            }
        }
    };

    Rich.getRichDate = function (name, type, content) {
        return "[name=" + name + ",type=" + type + ",content=" + content + "]";

    };

    Rich.addImg = function (link) {
        if (Rich.lastClickInputControl == null) {
            Rich.lastClickInputControl = $("#plotTextarea");
        }
        let htmlText = $(Rich.lastClickInputControl).html();
        $(Rich.lastClickInputControl).html(htmlText + "<img width='100px' name='richtextTemporary' class='richtextPicture' src=" + link + " />");
    };

    Rich.addLink = function (link) {
        let htmlText = $(Rich.lastClickInputControl).html();
        $(Rich.lastClickInputControl).html(htmlText + "<a name='richtextTemporary' href='" + link + ">" + link + "</a>");
    };

    $("body").on("click", ".richtextInputBox", function () {
        Rich.lastClickInputControl = $(this);
    });

    window.Rich = Rich;

})();