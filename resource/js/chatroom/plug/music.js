(function () {

    let audio;
    let musicList = [];
    let RoomMusicPlay = {};

    $(document).ready(function () {
        // 控制音频文件名显示宽度
        let maxW = $('.audio-right').width();
        $('.audio-right p').css({
            "max-width": maxW
        });
        initAudioEvent();
    });

    /**
     * 播放音乐方法
     */
    let playMusic = function () {
        // 改变播放/暂停图片
        if (audio.paused) {
            // 开始播放当前点击的音频
            audio.play();
            $('#audioPlayButton').attr('src', '../../resource/images/pause.png');
            // 暂停其他正在播放的音频
//				let audios = $('audio');
//				for(let i = 0; i < audios.length; i++) {
//					if(i != index && !audios[i].paused) {
//						audios[i].pause();
//						$('#audioPlayer' + i).attr('src', '../../resource/images/play.png');
//					}
//				}
        } else {
            audio.pause();
            $('#audioPlayButton').attr('src', '../../resource/images/play.png');
        }
    };

    /**
     * 点击进度条播放 pc端
     * @param e
     */
    function pointPlay(e) {
        // 只有音乐开始播放后才可以调节，已经播放过但暂停了的也可以
        if (!audio.paused || audio.currentTime !== 0) {
            let pgsWidth = $('.progress-bar-bg').width();
            let rate = e.offsetX / pgsWidth;
            audio.currentTime = audio.duration * rate;
            updateProgress(audio);
        }
    }

    /***
     * 点击进度条播放 手机端
     */
    function pointPlayByPhone() {
        if (!audio.paused || audio.currentTime !== 0) {
            let oriLeft = dot.offsetLeft;
            let mouseX = e.originalEvent.targetTouches[0].pageX;
            let maxLeft = oriLeft; // 向左最大可拖动距离
            let maxRight = document.getElementById('progressBarBg').offsetWidth - oriLeft; // 向右最大可拖动距离
            // 禁止默认的选中事件（避免鼠标拖拽进度点的时候选中文字）
            if (e.preventDefault) {
                e.preventDefault();
            } else {
                e.returnValue = false;
            }

            // 禁止事件冒泡
            if (e && e.stopPropagation) {
                e.stopPropagation();
            } else {
                window.event.cancelBubble = true;
            }

            // 开始拖动
            $("body").on("touchmove", function (e) {
                let length = e.originalEvent.targetTouches[0].pageX - mouseX;

                if (length > maxRight) {
                    length = maxRight;
                } else if (length < -maxLeft) {
                    length = -maxLeft;
                }

                let pgsWidth = $('.progress-bar-bg').width();

                let rate = (oriLeft + length) / pgsWidth;
                console.log(rate);
                audio.currentTime = audio.duration * rate;

                updateProgress(audio);
            }).on("touchend", function () {
                document.onmousemove = null;
                document.onmouseup = null;
            });
        }
    }


    /**
     * 初始化音频控制事件
     */
    function initAudioEvent() {

        audio = document.getElementById("roomPlayer");
        // 点击播放/暂停图片时，控制音乐的播放与暂停
        $('#audioPlayButton').click(function () {
            playMusic();
        });

        // 监听音频播放时间并更新进度条
        audio.addEventListener('timeupdate', function () {
            updateProgress(audio);
        }, false);

        // 监听播放完成事件
        audio.addEventListener('ended', function () {
            audioEnded();
        }, false);

        // 点击进度条跳到指定点播放
        // PS：此处不要用click，否则下面的拖动进度点事件有可能在此处触发，此时e.offsetX的值非常小，会导致进度条弹回开始处（简直不能忍！！）
        $('#progressBarBg').on('mousedown', pointPlay).on('focus', pointPlay);

        let dot = document.getElementById('progressDot');

        $('#progressDot').on("touchstart", function (e) {
            pointPlayByPhone();
        });

        // 鼠标拖动进度点时可以调节进度
        // 只有音乐开始播放后才可以调节，已经播放过但暂停了的也可以
        // 鼠标按下时
        dot.onmousedown = function (e) {
            if (!audio.paused || audio.currentTime !== 0) {
                let oriLeft = dot.offsetLeft;
                let mouseX = e.clientX;
                let maxLeft = oriLeft; // 向左最大可拖动距离
                let maxRight = document.getElementById('progressBarBg').offsetWidth - oriLeft; // 向右最大可拖动距离

                // 禁止默认的选中事件（避免鼠标拖拽进度点的时候选中文字）
                if (e.preventDefault) {
                    e.preventDefault();
                } else {
                    e.returnValue = false;
                }

                // 禁止事件冒泡
                if (e && e.stopPropagation) {
                    e.stopPropagation();
                } else {
                    window.event.cancelBubble = true;
                }

                // 开始拖动
                document.onmousemove = function (e) {
                    let length = e.clientX - mouseX;

                    if (length > maxRight) {
                        length = maxRight;
                    } else if (length < -maxLeft) {
                        length = -maxLeft;
                    }

                    let pgsWidth = $('.progress-bar-bg').width();

                    let rate = (oriLeft + length) / pgsWidth;
                    console.log(audio.duration);
                    audio.currentTime = audio.duration * rate;

                    updateProgress(audio);
                };

                // 拖动结束
                document.onmouseup = function () {
                    document.onmousemove = null;
                    document.onmouseup = null;
                };
            }
        };
    }

    /**
     * 更新进度条与当前播放时间
     * @param {object} audio - audio对象
     */
    let updateProgress = function (audio) {
        let value = audio.currentTime / audio.duration;
        $('#progressBar').css('width', value * 100 + '%');
        $('#progressDot').css('left', value * 100 + '%');
        $('#audioCurTime').html(transTime(audio.currentTime));
        $('.audio-length-total').html(transTime(audio.duration));
    };

    /**
     * 播放完成时把进度调回开始的位置
     */
    let audioEnded = function () {
        $('#progressBar').css('width', 0);
        $('#progressDot').css('left', 0);
        $('#audioPlayButton').attr('src', '../../resource/images/play.png');

        /**
         * 播放结束后执行的行动
         */
        playNextMusic();

    };

    /**
     * 音频播放时间换算
     * @param {number} value - 音频当前播放时间，单位秒
     */
    let transTime = function (value) {
        let time = "";
        let h = parseInt(value / 3600);
        value %= 3600;
        let m = parseInt(value / 60);
        let s = parseInt(value % 60);
        if (h > 0) {
            time = formatTime(h + ":" + m + ":" + s);
        } else {
            time = formatTime(m + ":" + s);
        }

        return time;
    };

    /**
     * 格式化时间显示，补零对齐
     * eg：2:4  -->  02:04
     * @param {string} value - 形如 h:m:s 的字符串
     */
    let formatTime = function (value) {
        let time = "";
        let s = value.split(':');
        let i = 0;
        for (; i < s.length - 1; i++) {
            time += s[i].length === 1 ? ("0" + s[i]) : s[i];
            time += ":";
        }
        time += s[i].length === 1 ? ("0" + s[i]) : s[i];
        return time;
    };

    RoomMusicPlay.addMusic = function (url, musicName, senderNike) {
        let data = {
            url: url,
            musicName: musicName,
            senderNike: senderNike
        };
        if (musicList.length === 0) {
            $("#roomMusicTitle").html(musicName);
            audio.src = url;
            playMusic();
        }
        musicList.push(data);
        layer.msg("[" + senderNike + "]添加了一首房间音乐");
    };

    let playNextMusic = function () {
        let musicData = musicList[1];
        if (musicData !== null) {
            $("#roomMusicTitle").html(musicData.musicName);
            audio.src = musicData.url;
            playMusic();
        }
        musicList.shift();
    };


    let sendMusicMessageButton = function (src) {
        let regex;
        layer.msg("链接解析中请稍等...");
        let musicName = $("input[name='musicNameInput']").val();

        //网易云音乐
        regex = /163.*?song/g;
        if (regex.test(src)) {
            let idRegex = /[0-9]+/g;
            let id = src.match(idRegex)[1];
            let apiLink = REQUESTHEAD + '/music/api/getSong?type=netease&id=' + id;
            if (musicName === null || musicName === "") {
                musicName = src.match(/《.+》/g);
            }
            $.ajax({
                type: "get",
                url: apiLink,
                success: function (result) {
                    if (result.code === 0) {
                        let data = JSON.parse(result.data);
                        if (data.success) {
                            if (data.url === "" || data.url == null) {
                                layer.msg("无效的解析数据，歌曲ID输入不正确");
                                return;
                            }
                            let musicMessage = {
                                musicName: musicName,
                                url: data.url
                            };
                            let jsonData = {
                                "messageType": 9,
                                "content": JSON.stringify(musicMessage),
                                "roomId": currentRoomId,
                                "region": "plot"
                            };
                            parent.socket.send(JSON.stringify(jsonData));
                        } else {
                            layer.msg(data.message);
                        }


                    } else {
                        layer.msg(result.message);
                    }

                }
            });
            return;
        }

        //虾米音乐
        // regex = /xiami.*?song/g;
        // if (regex.test(src)) {
        //     let idRegex = /xiami.*?song\/[0-9|A-z]+/g;
        //     let id = idRegex.exec(src)[0].substring(15);
        //     let apiLink = 'https://music-api-jwzcyzizya.now.sh/api/get/song/xiami?id=' + id;
        //     $.ajax({
        //         type: "get",
        //         url: apiLink,
        //         success: function (result) {
        //             if (result.success) {
        //
        //                 console.log(result.url);
        //                 //socket.send(JSON.stringify(jsonData));
        //             } else {
        //                 layer.msg("虾米音乐:" + result.message);
        //             }
        //
        //         }
        //     });
        //     return;
        // }

        let musicMessage = {
            musicName: musicName,
            url: src
        };
        let jsonData = {
            "messageType": 9,
            "content": JSON.stringify(musicMessage),
            "roomId": currentRoomId,
            "region": "plot"
        };

        parent.socket.send(JSON.stringify(jsonData));
    };


    //事件
    $("body").on("click", ".audio-wrapper", function () {
        $("#musicMenuList").slideToggle();
    }).on("click", "#musicUploadButton", function () {
        setTextInputName("musicUrlInput");
        xadmin.open("Upload", "../upload/resourceUpload.html", "", "", false);
    }).on("click", "#musicSendButton", function () {
        let src = $("input[name='musicUrlInput']").val();
        sendMusicMessageButton(src);
    });


    window.RoomMusicPlay = RoomMusicPlay;
})();