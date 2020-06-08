let colorSelectValue = "black";
let signList = new Array();
let uploadUrl = "";
let signIcoCode = {
    "0": "&#xe617;",
    "1": "&#xe643",
    "2": "&#xe688;",
    "3": "&#xe607",
    "4": "&#xe857;",
    "5": "&#xe756;",
    "6": "&#xe65f;",
    "7": "&#xe671;",
    "8": "&#xe702;"
};

function openMaps() {
    layer.open({
        type: 1,
        skin: "unSelect",
        area: ['350px', '400px'],
        shade: 0,
        title: "Maps",
        moveOut: true,
        maxmin: true,
        fixed: false,
        content: mapsHtml.innerHTML
    });
    layui.use('colorpicker', function () {
        let colorpicker = layui.colorpicker;
        //渲染
        colorpicker.render({
            elem: '#colorSelect',
            done: function (color) {
                colorSelectValue = color;
                $("i[name='addSignButton']").css("color", color);
            }
        });
    });
}

function clientPushMapsData() {
    let signListData = new Array();
    let signData = {};
    let data = {};
    let backgroundMaps = $("#viewArea").css("background-image");
    for (let i = 0; i < signList.length; i++) {
        if (signList[i] != null) {
            let sign = {};
            sign.left = signList[i].css("left");
            sign.top = signList[i].css("top");
            sign.title = signList[i].attr("title");
            sign.color = signList[i].css("color");
            sign.size = signList[i].css("font-size");
            sign.code = $(signList[i]).attr("code");
            sign.content = $(signList[i]).children('img').attr("src");

            signListData.push(sign);
        }
    }
    signData.backgroundMaps = backgroundMaps;
    signData.signListData = signListData;
    let base64 = new Base64();
    let message = base64.encode(JSON.stringify(signData));
    data = {
        "messageType": 12,
        "message": message,
        "roleId": userId
    }

    socket.send(JSON.stringify(data));
}

function acceptHandleServiceData(data) {

    if (data.roleId == userId) {
        return;
    }
    let base64 = new Base64();
    let message = base64.decode(data.message);
    let messageData = eval("(" + message + ")");
    let signListData = messageData.signListData;
    let html;

    $("i[name='signPush" + data.roleId + "']").remove();
    //修改背景地图
    $("#viewArea").css("background-image", messageData.backgroundMaps);

    for (let i = 0; i < signListData.length; i++) {
        if (signListData[i].code == 9) {
            let imgHtml = "<img width='" + signListData[i].size + "' height='" + signListData[i].size + "' src='" + signListData[i].content + "'/>";
            html = "<i  name='signPush" + data.roleId + "' title='" + signListData[i].title + "'style=\" color:" + signListData[i].color + ";position:absolute; top:" + signListData[i].top + ";left:" + signListData[i].left + ";font-size: " + signListData[i].size + "; width: 30px;height: 30px; \" class='layui-icon'>" + imgHtml + "</i>";

        } else {
            html = "<i  name='signPush" + data.roleId + "' title='" + signListData[i].title + "'style=\" color:" + signListData[i].color + ";position:absolute; top:" + signListData[i].top + ";left:" + signListData[i].left + ";font-size: " + signListData[i].size + "; width: 30px;height: 30px; \" class='layui-icon'>" + signIcoCode[signListData[i].code] + "</i>";

        }
        $("#viewArea").append(html);
    }

    //let html = "<i title='" + title + "' id='sign" + timestamp + "'style=\" color:" + color + ";position:absolute; top:0;left:0;font-size: 25px; width: 30px;height: 30px; \" class='layui-icon'>&#xe617;</i>";

    //selectControl($("#sign" + timestamp));

}

function addControl(control) {
    let timestamp = (new Date()).getTime();
    let color = colorSelectValue;
    let title = $("input[name='signInput']").val();
    let size = $("input[name='signSizeInput']").val();
    let code = $(control).attr("code");
    let html;
    let content = $("input[name='mapsPictrueInput']").val();


    if (code == 9) {
        let imgHtml = "<img draggable=\"false\" width='" + size + "' height='" + size + "' src='" + content + "'/>";
        html = "<i code='" + code + "' ontouchend='clickSign(this);' ondblclick='clickSign(this);' title='" + title + "' id='sign" + timestamp + "'style=\" color:" + color + ";position:absolute; top:0;left:0; width:" + size + "px;height: " + size + "px; \" class='layui-icon'>" + imgHtml + "</i>";
    } else {
        html = "<i code='" + code + "' ontouchend='clickSign(this);' ondblclick='clickSign(this);' title='" + title + "' id='sign" + timestamp + "'style=\" color:" + color + ";position:absolute; top:0;left:0;font-size: " + size + "px; width: " + size + "px;height: " + size + "px; \" class='layui-icon'>" + signIcoCode[code] + "</i>";

    }
    $("#viewArea").append(html);
    selectControl($("#sign" + timestamp));
    signList.push($("#sign" + timestamp));
    clientPushMapsData();

}


function clickSign(control) {
    layer.tips("<button  onclick=\"deleteSign('" + $(control).attr("id") + "')\" class='layui-btn'>Delete</button>", control);
}

function deleteSign(str) {
    for (let i = 0; i < signList.length; i++) {
        if ($(signList[i]).attr("id") == str) {
            signList.splice(i, 1);
            $("#" + str).remove();
            clientPushMapsData();
            return;
        }
    }

}

function updateMapsPicture() {
    let mapsPicture = $("input[name='mapsPictrueInput']").val();
    $("#viewArea").css("background-image", "url(" + mapsPicture + ")");
}

function signMoveMobliPhoneEvent(e, box) {
    let touchTemp = e.originalEvent.targetTouches[0];
    let positionDiv = $(this).offset();
    let view = $("#viewArea");
    let viewTop = view.offset().top;
    let viewLeft = view.offset().left;
    let viewWidth = parseInt(view.css("width"));
    let viewHeigth = parseInt(view.css("height"));
    let distenceX = touchTemp.pageX - box.offset().left;
    let distenceY = touchTemp.pageY - box.offset().top;

    $(document).on('touchmove', function (e) {
        let touch = e.originalEvent.targetTouches[0];
        let x = touch.pageX - viewLeft - distenceX;
        let y = touch.pageY - viewTop - distenceY;

        if (x < 0) {
            x = 0;
        }
        if (y < 0) {
            y = 0;
        }
        if (x > viewWidth - parseInt(box.css("width"))) {
            x = viewWidth - parseInt(box.css("width"));
        }

        if (y > viewHeigth - parseInt(box.css("height"))) {
            y = viewHeigth - parseInt(box.css("height"));
        }

        box.css({
            'left': x + 'px',
            'top': y + 'px'
        });
        clientPushMapsData();
    });

    $(document).on('touchend', function () {
        $(document).off('touchmove');
    });

}

function signMovePCEvent(e, box) {
    let positionDiv = $(this).offset();
    let view = $("#viewArea");
    let viewTop = view.offset().top;
    let viewLeft = view.offset().left;
    let viewWidth = parseInt(view.css("width"));
    let viewHeigth = parseInt(view.css("height"));
    let distenceX = e.pageX - box.offset().left;
    let distenceY = e.pageY - box.offset().top;
    $(document).mousemove(function (e) {
        let x = e.pageX - viewLeft - distenceX;
        let y = e.pageY - viewTop - distenceY;
        if (x < 0) {
            x = 0;
        }
        if (y < 0) {
            y = 0;
        }
        if (x > viewWidth - parseInt(box.css("width"))) {
            x = viewWidth - parseInt(box.css("width"));
        }

        if (y > viewHeigth - parseInt(box.css("height"))) {
            y = viewHeigth - parseInt(box.css("height"));
        }

        box.css({
            'left': x + 'px',
            'top': y + 'px'
        });
        clientPushMapsData();
    });

    $(document).mouseup(function () {
        $(document).off('mousemove');
    });

}

function selectControl(control) {
    let box = $(control);
    box.mousedown(function (e) {
        signMovePCEvent(e, box);
    });
    box.on('touchstart', function (e) {
        signMoveMobliPhoneEvent(e, box);
    });
}