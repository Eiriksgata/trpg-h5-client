(function () {

    let loadUploadButton = function () {
        layui.use('upload', function () {
            let upload = layui.upload;

            //执行实例
            let uploadInst = upload.render({
                //绑定元素
                elem: '#insertPicture',
                auto: false,
                choose: function (obj) {
                    //console.log(obj);

                    //预读本地文件，如果是多文件，则会遍历。(不支持ie8/9)
                    obj.preview(function (index, file, result) {
                        // console.log(index); //得到文件索引
                        // console.log(file); //得到文件对象
                        // console.log(result); //得到文件base64编码，比如图片
                        //obj.resetFile(index, file, '123.jpg'); //重命名文件名，layui 2.3.0 开始新增
                        //这里还可以做一些 append 文件列表 DOM 的操作
                        //obj.upload(index, file); //对上传失败的单个文件重新上传，一般在某个事件中使用
                        //delete files[index]; //删除列表中对应的文件，一般在某个事件中使用
                        if (Rich.lastClickInputControl == null) {
                            Rich.lastClickInputControl = $("#plotTextarea");
                            //layer.msg("请先点击你要插入的输入框");
                            //return;
                        }

                        layer.msg("图片正在处理，请稍等");
                        uploadFile(file, function (err, data) {
                            Rich.addImg(data.url);
                            console.log("dataResult:" + data.url);
                        });
                    });
                }
            });


        });
    };

    loadUploadButton();

    window.loadUploadButton = loadUploadButton;


})();