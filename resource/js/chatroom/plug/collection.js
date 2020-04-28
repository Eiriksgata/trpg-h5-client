/**
 * 收藏功能
 */
$(location).ready(function () {
    loadRoomCollection();
});

function deleteCollection(control) {
    var id = $(control).attr('value');
    $(control).parent().remove();
    deleteCollectionSubmit(id);
}

function collectionEdit(control) {
    var text = $(control).html();
    var htmlStr = "<textarea id='collectionEditArea' class='layui-textarea'>" + text + "</textarea>";

    layer.confirm(htmlStr, {
        btn: ['确定', '取消'] //按钮
    }, function () {
        var changeText = $("#collectionEditArea").val();
        var collectionId = $(control).attr('value');
        var data = {
            "id": collectionId,
            "memberId": -1,
            "roomId": findRoomId,
            "text": changeText
        };
        $(control).html(changeText);
        updateCollectionSubmit(data);
        layer.msg('修改成功', {
            icon: 1
        });
    }, function () {

    });
}

function updateCollectionSubmit(data) {
    $.ajax({
        type: "put",
        url: "http://localhost/roomMessageCollection/updateInfo",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "json",
        data: JSON.stringify(data),
        contentType: "application/json;charset=UTF-8",
        success: function (result) {
        }

    });
}

function addCollectionSubmit(data) {
    $.ajax({
        type: "put",
        url: "http://localhost/roomMessageCollection/add",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "json",
        data: JSON.stringify(data),
        contentType: "application/json;charset=UTF-8",
        success: function (result) {
            loadRoomCollection();
        }
    });
}

function deleteCollectionSubmit(id) {
    $.ajax({
        type: "delete",
        url: "http://localhost/roomMessageCollection/delete?id=" + id,
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        success: function (result) {
            layer.msg(result.message);
        }

    });
}

function chatMessageCollection(control) {
    var messageText = $(control).next('message').html();

    var data = {
        "id": -1,
        "memberId": -1,
        "roomId": findRoomId,
        "text": messageText
    }
    addCollectionSubmit(data);
    $(control).children('i').html("&#xe67a;");
}

function addBlankCollection() {
    var messageText = '点击文字进行编辑';
    var data = {
        "id": -1,
        "memberId": -1,
        "roomId": findRoomId,
        "text": messageText
    }
    addCollectionSubmit(data);
}

function addCollectionLaytpl(data) {

    layui.use('laytpl', function (laytpl) {
        var getTpl = collectionListHtml.innerHTML;
        laytpl(getTpl).render(data, function (html) {
            $("#collectionListBox").append(html);
        });

    });
}

function loadRoomCollection() {
    $.ajax({
        type: "get",
        url: "http://localhost/roomMessageCollection/findByRoom?roomId=" + findRoomId,
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        success: function (result) {
            if (result.code == 0) {
                var data;
                //清空收藏消息，重新载入
                $("#collectionListBox").html("");
                for (var i = 0; i < result.data.length; i++) {
                    data = {
                        "text": result.data[i].text,
                        "collectionId": result.data[i].id
                    }
                    addCollectionLaytpl(data);
                }
            }
            if (result.code == 1) {
                layer.msg("读取收藏信息出错:{}", result.message);
            }

        }
    });
}

//页面层
function collectionSuspensionMode() {
    var html = $("#viewCollectionHtml").html();
    $("#viewCollectionHtml").parent().css("display", "none");
    $("#viewCollectionHtml").html('');
    layer.open({
        type: 1,
        moveOut: true,
        area: ['350px', '500px'], //宽高
        title: 'Collection',
        shade: 0,
        maxmin: true,
        fixed: false,
        content: html,
        cancel: function (index, layero) {
            $("#viewCollectionHtml").parent().css("display", "");
            $("#viewCollectionHtml").html(html);
            loadRoomCollection();
            layer.close(index);
            return false;
        }
    });


}