(function () {

    let GroupMessage = {};

    GroupMessage.receiverId = [];
    GroupMessage.region = null;

    /**
     * 讨论组功能初始化
     */
    GroupMessage.init = function () {
        GroupMessage.groupListInit();
        GroupMessage.onFortEvent();

    };


    /**
     * 具有群组消息列表渲染
     */
    GroupMessage.groupListInit = function () {

    };

    /**
     * 讨论组消息读取
     */
    GroupMessage.groupChatMessageLoad = function () {


    };


    /**
     * 添加一个群组消息点击框
     */
    GroupMessage.addGroupClickBox = function (region, receiverId) {

        let data = {
            "name": region,
            "ioc": "../../resource/images/groupBase.png",
            "receiverId": receiverId.toString()
        };

        layui.use("laytpl", function () {
            let laytpl = layui.laytpl;
            let getTpl = groupMessageMemberListHtml.innerHTML;
            laytpl(getTpl).render(data, function (html) {
                $("#groupListBox").append(html);

            });
        });
    };

    /**
     * 群聊消息接受处理
     */
    GroupMessage.messageHandler = function (socketData) {

        if (socketData.receiverId.length === undefined || socketData.receiverId.length <= 0) {
            return;
        }

        //对接收到的消息是否新建群聊按键检测
        let allRegion = layui.data("appData").recordRegion;


    };

    /**
     * 打开新建群聊窗口
     */
    GroupMessage.openGroupWindow = async function () {

        let allPlayer = [];
        let roomRelation = await parent.database.findByIndexName("allRelation", "roomId", parseInt(currentRoomId));
        await $.each(roomRelation, async function (key, value) {
            if (value.userId !== layui.data("appData").myUserInfo.id) {
                let userInfo = await parent.database.findByIndexName("allMemberInfo", "id", value.userId);

                allPlayer.push({
                    "id": userInfo.id,
                    "ioc": userInfo.userIcon,
                    "name": userInfo.nickname
                });

                if (key === roomRelation.length - 1) {

                    let data = {
                        "allPlayer": await allPlayer
                    };

                    console.log(data);

                    /**
                     * 渲染打开窗口界面
                     */
                    layui.use("laytpl", function () {
                        let laytpl = layui.laytpl;
                        let getTpl = groupCreateHtml.innerHTML;
                        laytpl(getTpl).render(data, function (html) {
                            layer.open({
                                type: 1,
                                skin: "unSelect",
                                area: ['350px', '400px'],
                                shade: 0,
                                title: "Group Create",
                                moveOut: true,
                                maxmin: true,
                                fixed: false,
                                content: html
                            });
                        });

                    });
                    layui.form.render();
                }

            }
        });


    };

    /**
     * 监听群聊创建点击事件
     */
    GroupMessage.onFortEvent = function () {
        layui.use('form', function () {
            let form = layui.form;
            //监听提交
            form.on('submit(createGroup)', function (data) {
                let inputData = data.field;
                let receiverId = [];
                $.each(inputData, function (key, value) {
                    if (key.substring(0, 6) === "player") {
                        if (value === "on") {
                            receiverId.push(key.substring(6));
                        }
                    }
                });

                /**
                 * 创建消息聊天渲染列表
                 */
                GroupMessage.addGroupClickBox(inputData.groupName, receiverId);
                return false;
            });
        });
    };

    /**
     * 切换讨论组的消息框方法
     */
    GroupMessage.onSwitchGroup = function (control) {
        let region = $(control).attr("region");
        let receiverId = $(control).attr("receiverId");

        GroupMessage.region = region;
        GroupMessage.receiverId = JSON.parse("[" + receiverId + "]");

        console.log(GroupMessage.region);
        console.log(GroupMessage.receiverId);
    };


    window.GroupMessage = GroupMessage;

})();