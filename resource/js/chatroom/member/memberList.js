(function () {

    let isHomeowners = false;

    let isHomeownersCheck = function () {
        let myUserInfo = layui.data("appData").myUserInfo;
        parent.database.findByIndexName("allRoomInfo", "id", 1).then(
            function (thisRoomInfo) {
                if (myUserInfo == null) {
                    parent.InitLoad.getMyUserInfo();
                    myUserInfo = layui.data("appData").myUserInfo;
                }
                isHomeowners = (myUserInfo.id === thisRoomInfo.createUserId);
            }
        );
    };

    //开始渲染用户列表
    let memberListBoxInit = function () {
        parent.database.findByIndexName("allRelation", "roomId", parseInt(currentRoomId))
            .then(function (relationList) {
                //清空列表数据
                $("#memberList").html("");
                $.each(relationList, function (key, value) {
                    memberListBox(value);
                });

            });


    };


    //单个用户的html数据生成
    let memberListBox = function (relation) {

        parent.RequestData.getUserInfo(relation.userId).then(
            function (memberInfo) {
                let stateMap = parent.RequestData.getUserState([relation.userId]);
                let data;
                if (relation.roleCardId != null) {
                    let list, roleHp = 0,
                        roleHpMax = 0,
                        roleMp = 0,
                        roleMpMax = 0,
                        roleAp = 0,
                        roleApMax = 0,
                        roleSan = 0,
                        roleSanMax = 0;
                    parent.RequestData.getRoleCard(relation.roleCardId).then(
                        function (roleCard) {


                            //属性截取判断
                            list = roleCard.attribute.match(/hp[0-9]+/g);
                            if (list != null && list.length > 0) {
                                roleHp = list[0].substring(2);
                            }

                            list = roleCard.attribute.match(/体力[0-9]+/g);
                            if (list != null && list.length > 0) {
                                roleHpMax = list[0].substring(2);
                            }

                            list = roleCard.attribute.match(/mp[0-9]+/g);
                            if (list != null && list.length > 0) {
                                roleMp = list[0].substring(2);
                            }

                            list = roleCard.attribute.match(/魔法[0-9]+/g);
                            if (list != null && list.length > 0) {
                                roleMpMax = list[0].substring(2);
                            }

                            list = roleCard.attribute.match(/ap[0-9]+/g);
                            if (list != null && list.length > 0) {
                                roleAp = list[0].substring(2);
                            }

                            list = roleCard.attribute.match(/护甲[0-9]+/g);
                            if (list != null && list.length > 0) {
                                roleApMax = list[0].substring(2);
                            }

                            list = roleCard.attribute.match(/san[0-9]+/g);
                            if (list != null && list.length > 0) {
                                roleSan = list[0].substring(3);
                            }

                            list = roleCard.attribute.match(/san值[0-9]+/g);
                            if (list != null && list.length > 0) {
                                roleSanMax = list[0].substring(4);
                            }


                            data = {
                                "state": stateMap[relation.userId],
                                "memberId": memberInfo.id,
                                "memberImg": memberInfo.userIcon,
                                "memberName": memberInfo.nickname,
                                "roleId": roleCard.id,
                                "roleImg": roleCard.img,
                                "roleName": roleCard.name,
                                "openRoleSwitch": isHomeowners,
                                "roleHpMax": roleHpMax,
                                "roleMpMax": roleMpMax,
                                "roleApMax": roleApMax,
                                "roleSanMax": roleSanMax,
                                "roleHp": roleHp,
                                "roleMp": roleMp,
                                "roleAp": roleAp,
                                "roleSan": roleSan
                            };

                            //渲染玩家列表
                            //由于该方法是异步的，所以需要再写一次
                            layui.use("laytpl", function () {
                                let laytpl = layui.laytpl;
                                let getTpl = memberListHtml.innerHTML;
                                laytpl(getTpl).render(data, function (html) {
                                    $("#memberList").append(html);
                                });

                            });

                        }
                    );
                } else {
                    data = {
                        "state": stateMap[relation.userId],
                        "memberId": memberInfo.id,
                        "memberImg": memberInfo.userIcon,
                        "memberName": memberInfo.nickname,
                        "openRoleSwitch": isHomeowners,
                        "roleId": -1,
                        "roleImg": "",
                        "roleName": "未定",
                        "roleHpMax": 0,
                        "roleMpMax": 0,
                        "roleApMax": 0,
                        "roleSanMax": 0,
                        "roleHp": 0,
                        "roleMp": 0,
                        "roleAp": 0,
                        "roleSan": 0
                    };
                    //渲染玩家列表
                    layui.use("laytpl", function () {
                        let laytpl = layui.laytpl;
                        let getTpl = memberListHtml.innerHTML;
                        laytpl(getTpl).render(data, function (html) {
                            $("#memberList").append(html);
                        });

                    });
                }

            });


    };

    //检测自身是否是房主
    window.isHomeowners = isHomeowners;

    window.memberListBoxInit = memberListBoxInit;
    window.isHomeownersCheck = isHomeownersCheck;

})();