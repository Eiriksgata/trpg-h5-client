(function () {

    let loadMyRoleCardBox = function () {
        let allRelation = layui.data("appData").allRelation[currentRoomId];
        let roleId = allRelation[layui.data("appData").myUserInfo.id].roleCardId;
        let role = layui.data("appData").allRoleCardInfo[roleId];
        let skillController = $("#skill");
        skillController.empty();
        if (role == null) return;

        attributeHandle(role.attribute);

        $("#roleName").html("名字:" + role.name);
        $("#roleAge").html("年龄:" + role.age);

        if (role.sex === 0) {
            $("#roleSex").html("性别:保密");
        }
        if (role.sex === 1) {
            $("#roleSex").html("性别:男");

        }
        if (role.sex === 2) {
            $("#roleSex").html("性别:女");
        }

        //修改角色图片
        $("#myRoleImg").attr("src", role.img);
        $("#roleTimes").html("时代:" + role.times);
        $("#roleOccupation").html("职业:" + role.occupation);
        $("#roleResidence").html("现住:" + role.residence);
        $("#roleHometown").html("故乡:" + role.hometown);

        $("#takeList").html(role.takeList.replace(/\n+/g, "<br>"));
        $("#weaponList").html(role.weaponList.replace(/\n+/g, "<br>"));
        $("#assets").html(role.assets.replace(/\n+/g, "<br>"));
        $("#roleStory").html(role.roleStory.replace(/\n+/g, "<br>"));

    };


    let attributeTableHandle = function (attributeStr) {
        let regex = /([A-z]+-?[0-9]+)|([A-z]+[\u4e00-\u9fa5]+-?[0-9]+)|([\u4e00-\u9fa5]+-?[0-9]+)/g;
        let attribute = attributeStr.match(regex);
        let skillControler = $("#skill");
        if (attribute != null) {
            for (let i = 0; i < attribute.length; i++) {
                htmlText = "<input name='attributeText' onchange='changeEvent(this)' class='layui-col-xs3 layui-col-sm3 layui-col-md2' value='" + attribute[i] + "'></input>";
                skillControler.append(htmlText);
            }
        }
    };


    let attributeHandle = function (attributeStr) {
        let regex = /([A-z]+-?[0-9]+)|([A-z]+[\u4e00-\u9fa5]+-?[0-9]+)|([\u4e00-\u9fa5]+-?[0-9]+)/g;
        let attribute = attributeStr.match(regex);
        let htmlText = '';
        let skillControler = $("#skill");

        if (attribute != null) {
            for (let i = 0; i < attribute.length; i++) {
                htmlText = "<div onclick='' class='layui-col-xs3 layui-col-sm3 layui-col-md3'>" + attribute[i] + "</div>";
                skillControler.append(htmlText);
            }
        }
    };


    window.loadMyRoleCardBox = loadMyRoleCardBox;

})();