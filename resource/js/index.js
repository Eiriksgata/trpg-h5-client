$(window).ready(function () {
    //存储用户需要用到的 用户数据
//    window.allMemberInfoMap = parent.allMemberInfoMap;

    //长连接
    window.socket = parent.socket;

    //框架的请求接口
    window.RequestData = parent.RequestData;

    //当前用户的信息
//    window.myUserInfo = parent.myUserInfo;

    //房间信息
//    window.allRoomInfoMap = parent.allRoomInfoMap;

    //用户加入的房间信息
//    window.allJoinRoomInfoMap = parent.allJoinRoomInfoMap;

    //角色卡信息 ,以Id进行唯一识别对应
//    window.allRoleInfoMap = parent.allRoleInfoMap;

    //从链接后接收到的信息
//    window.allChatMessageRecord = parent.allChatMessageRecord;

    //房间与用户和角色卡关系
//    window.allRelaiton = parent.allRelaiton
});

function quitLogin() {
    $.ajax({
        type: "get",
        url: "http://localhost/quitLogin",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success: function (result) {
            layer.msg(result.message + "[2s后自动跳转到登录界面]");
            setTimeout(function () {
                window.location = "../../login.html";
            }, 2000);
        }
    });
}