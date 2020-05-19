/**
 * 用于给聊天框架添加数据
 */

(function () {

    let MessageBox = {};

    MessageBox.addChatMessage = function () {

        let scrollOpen = true;
        let div = document.getElementById('gameChatBox');
        let value = div.scrollTop + div.clientHeight;

    };


    MessageBox.getDiceMessageBoxHtml = function (messageData) {

        let data = {};
        let currentRoomRelation = layui.data("appData").allRelation[currentRoomId];
        let roleCard = parent.RequestData.getRoleCard(currentRoomRelation[messageData.senderId].roleCardId);
        data.name = "骰子";
        let scrollOpen = true;

        let regionBox = $("div[region='" + messageData.region + "']")[0];

        if (regionBox.scrollHeight - (regionBox.scrollTop + regionBox.clientHeight) > 10) {
            scrollOpen = false;
        }

        if (roleCard == null) {
            //let memberInfo = layui.data("appData").allMemberInfo[messageData.senderId];
            data.message = "[" + messageData.senderNike + "]" + messageData.content;
        } else {
            data.message = "[" + roleCard.name + "]" + messageData.content;
        }


        layui.use("laytpl", function (laytpl) {
            laytpl(diceMessageBoxHtml.innerHTML).render(data, function (html) {
                $("div[region='" + messageData.region + "']").append(html);
            });
        });

        if (scrollOpen) {
            regionBox.scrollTop = regionBox.scrollHeight;
        } else {
            //小tips
            let inputBox = $("button[region='" + messageData.region + "']").prev();
            inputBox.attr("id", "tempTips");
            layer.tips(data.name + ':' + data.message, "#tempTips", {
                tips: [1, '#3595CC'],
                time: 4000
            });
            inputBox.attr("id", "");
        }


    };

    MessageBox.getChatMessageBoxHtml = function (messageData) {

        let data = {};
        let style = messageData.style;
        let backgroundColor;
        let boxFloat = "left";
        let subsidiaryType = messageData.subsidiaryType;
        let scrollOpen = true;

        let regionBox = $("div[region='" + messageData.region + "']")[0];
        //$("div[region='" + messageData.region + "']");


        if (regionBox.scrollHeight - (regionBox.scrollTop + regionBox.clientHeight) > 10) {
            scrollOpen = false;
        }

        messageData.content = messageData.content.replace(/\n+/g, "<br>");


        //对于气泡的风格进行修改
        if (style == null || style === "") {
            style = {
                "type": 0,
                "code": null,
                "fontSize": 15
            }
        }

        if (style.type === 0) {
            if (style.code == null || style.code === "") {
                if (messageData.senderId === layui.data("appData").myUserInfo.id) {
                    backgroundColor = "#01AAED";
                    boxFloat = "right";
                } else {
                    backgroundColor = "#dddddd";
                }
            } else {
                backgroundColor = style.code;
            }
        }


        function setMemberInfo() {
            //读取用户的信息数据
            let senderInfo = parent.RequestData.getUserInfo(messageData.senderId);
            console.log(senderInfo);
            //data.name = senderInfo.nickname;
            data.img = senderInfo.userIcon;
        }

        if (messageData.region === "广场") {
            setMemberInfo();
        } else {
            //尝试获取用户的扮演角色数据
            let relation = layui.data("appData").allRelation[currentRoomId];
            let roleCard = parent.RequestData.getRoleCard(relation[messageData.senderId].roleCardId);
            if (relation == null || roleCard == null) {
                setMemberInfo();
            } else {
                //data.name = roleCard.name;
                data.img = roleCard.img;
            }
        }

        data.name = messageData.senderNike;
        data.backgroundColor = backgroundColor;
        data.message = messageData.content;
        data.region = messageData.region;
        data.float = boxFloat;
        data.fontSize = style.fontSize;
        data.fontColor = style.fontColor;
        data.recordId = messageData.recordId;
        data.sendTime = messageData.sendTime;


        layui.use('laytpl', function (laytpl) {
            laytpl(memberChatMessageBoxHtml.innerHTML).render(data, function (html) {
                $("div[region='" + messageData.region + "']").append(html);
                //alert(html);
            });
        });

        if (scrollOpen || messageData.senderId === layui.data("appData").myUserInfo.id) {
            regionBox.scrollTop = regionBox.scrollHeight;
        } else {
            //小tips
            let inputBox = $("button[region='" + messageData.region + "']").prev();
            inputBox.attr("id", "tempTips");
            layer.tips(data.name + ':' + data.message, "#tempTips", {
                tips: [1, '#3595CC'],
                time: 4000
            });
            inputBox.attr("id", "");
        }


    };


    /**
     * 监听所有的发送按键被点击
     * 监听所有的文本输入框的回车键发送消息
     */
    MessageBox.sendMessageBtnEvent = function () {
        $("body").on("click", "button[name='sendMessageBtn']", function () {
            //获取输入框的文本信息
            let content = $(this).prev().html();
            if (content == null || content.length === 0 || content === undefined || content === "") return;

            //获取按键所属于的区域
            let btnRegion = $(this).attr("region");

            let messageVo = new ChatMessageVo();
            messageVo.messageType = ChatMessageCode.FORWARD;
            messageVo.content = Rich.analysis(content);
            messageVo.region = btnRegion;
            messageVo.roomId = currentRoomId;

            parent.socket.send(JSON.stringify(messageVo));
            //清空文本框消息
            $(this).prev().html("");

        }).on("keydown", ".richtextInputBox", function (e) {
            if (e.keyCode === 13) {
                event.preventDefault();
                $(this).next().click();
            }
        });


    };


    (function () {


    })();


    (function () {
        let Rich = {};

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
            $("#inputBox").append("<img name='richtextTemporary' class='richtextPicture' src=" + link + " />");
        };

        Rich.addLink = function (link) {
            $("#inputBox").append("<a name='richtextTemporary' href='" + link + ">" + link + "</a>");
        };

        window.Rich = Rich;

    })();


    window.MessageBox = MessageBox;

})();



