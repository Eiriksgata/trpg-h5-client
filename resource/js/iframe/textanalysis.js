(function () {

    let Rich = {};

    Rich.lastClickInputControl = null;

    Rich.controlCompile = function () {
        $("img[name='richtextTemporary']").each(function (index) {
            let text = "[name=richtext,type=picture,content=" + $(this).attr("src") + "]";
            $(this).replaceWith(text);
            //pictureList.push(text);
        });

        $("a[name='richtextTemporary']").each(function (index) {
            let text = "[name=richtext,type=link,content=" + $(this).attr("href") + "]";
            $(this).replaceWith(text);
            //pictureList.push(text);
        });
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
            content = content.replace(controlTextList[i], getCreateText(controlName, controlType, controlContent));
            //$(inputControl).html(inputText);
        }

        return content;
    };


    function getCreateText(name, type, content) {
        console.log(name + type + content);
        if (name === "richtext") {
            switch (type) {
                case "picture":
                    return "<img class='richtextPicture' src='" + content + "'>";
                case "link":
                    return "<a href='" + content + "'>" + content + "</a>";
            }

        }

    }

    Rich.addImg = function (link) {
        let htmlText = $(Rich.lastClickInputControl).html();
        $(Rich.lastClickInputControl).html(htmlText + "<img name='richtextTemporary' class='richtextPicture' src=" + link + " />");
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