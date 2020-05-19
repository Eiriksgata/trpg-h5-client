(function () {

    let Shear = {};

    let imgReader = function (item) {
        let blob = item.getAsFile(),
            reader = new FileReader();
        reader.onload = function (e) {
            let img = new Image();
            img.src = e.target.result;
            let file = dataURLtoFile(e.target.result, "uploadImg.jpg");

            uploadFile(file, function (err, data) {
                console.log(err || data);
                $("#gameTextarea").append("<img name='richtextTemporary' class='richtextPicture' src='" + data.url + "' />");
            });

        };
        reader.readAsDataURL(blob);
    };

    Shear.addEvent = function () {

        $("body").on("paste",".richtextInputBox", function (e) {
            let clipboardData = e.clipboardData,
                i = 0,
                items, item, types;
            if (clipboardData) {
                items = clipboardData.items;

                if (!items) {
                    return;
                }

                item = items[0];
                types = clipboardData.types || [];

                for (; i < types.length; i++) {
                    if (types[i] === 'Files') {
                        item = items[i];
                        break;
                    }
                }

                if (item && item.kind === 'file' && item.type.match(/^image\//i)) {
                    imgReader(item);
                }
            }

        });
    };


    window.Shear = Shear;


})();