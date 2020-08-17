(function () {

    // 对更多字符编码的 url encode 格式
    let camSafeUrlEncode = function (str) {
        return encodeURIComponent(str)
            .replace(/!/g, '%21')
            .replace(/'/g, '%27')
            .replace(/\(/g, '%28')
            .replace(/\)/g, '%29')
            .replace(/\*/g, '%2A');
    };

    // 计算签名
    let getAuthorization = function (options, callback) {
        let url = REQUESTHEAD + '/upload/singer/short?key=' + encodeURIComponent(options.Pathname);
        $.ajax({
            type: "get",
            url: url,
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success: function (result) {
                if (result.code === 0) {
                    credentials = result.data;
                    callback(null, {
                        Authorization: credentials
                    });
                }
                if (result.code === 1) {
                    alert(result.message);
                }
            }
        });
    };

    // 上传文件
    let uploadFile = function (file, callback) {
        let Key = file.name; // 这里指定上传目录和文件名
        getAuthorization({
            Method: 'PUT',
            Pathname: Key
        }, function (err, info) {

            if (err) {
                alert(err);
                return;
            }

            let auth = info.Authorization;
            let xhr = new XMLHttpRequest();
            xhr.open('PUT', auth.singer, true);
            xhr.upload.onprogress = function (e) {
                let progress = (Math.round(e.loaded / e.total * 10000) / 100) + '%';
                layui.use('element', function () {
                    let element = layui.element;
                    element.progress('uploadProgress', progress);

                });
                // console.log('上传进度 ' + (Math.round(e.loaded / e.total * 10000) / 100) + '%');
            };
            xhr.onload = function () {
                if (/^2\d\d$/.test('' + xhr.status)) {
                    let ETag = xhr.getResponseHeader('etag');
                    let resultUrl = auth.singer.match(/.*\?sign=/g)[0];
                    resultUrl = resultUrl.substring(0, resultUrl.length - 6);
                    //console.log(resultUrl);
                    callback(null, {
                        url: resultUrl,
                        ETag: ETag
                    });
                } else {
                    callback('文件 ' + Key + ' 上传失败，状态码：' + xhr.status);
                }
            };
            xhr.onerror = function () {
                callback('文件 ' + Key + ' 上传失败，请检查是否没配置 CORS 跨域规则');
            };
            xhr.send(file);
        });
    };

    window.uploadFile = uploadFile;


})();