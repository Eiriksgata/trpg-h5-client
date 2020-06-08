(function (w) {

    $("#mobileModelButton").click(function () {
        addMobileBox();
        initSwiper();
        $("#mobileModelButton").attr("disabled", "disabled");
        $("#diyModelButton").attr("disabled", "disabled");

        //重新加载控件事件
        //MessageBox.sendMessageBtnEvent();

        $("div[name='chatBottomBox']").css("height", "30px");

        //重新设置消息计数
        MessageCount.showMessageCount("plot");
        MessageCount.showMessageCount("square");

        //重新绑定消息计数清除事件
        MessageCount.selectButtonEvent();
    });


    let addMobileBox = function () {
        let html = new Array(5);
        html[0] = $("#memberAndRoleDiv").html();
        html[1] = $("#plotDiv").html();
        html[2] = $("#groupMessageDiv").html();
        html[3] = $("#squareMessageDiv").html();
        html[4] = $("#collectiondiv").html();
        $("#view").html(mobileBoxHtml.innerHTML);
        let control = $("#mobileContent");

        for (let i = 0; i < html.length; i++) {
            control.html(html[i]);
            control = control.next();
        }

    };

    let initSwiper = function () {

        function setCurrentSlide(ele, index) {
            $(".swiper1 .swiper-slide").removeClass("selected");
            ele.addClass("selected");
            //swiper1.initialSlide=index;
        }

        let swiper1 = new Swiper('.swiper1', {
            //					设置slider容器能够同时显示的slides数量(carousel模式)。
            //					可以设置为number或者 'auto'则自动根据slides的宽度来设定数量。
            //					loop模式下如果设置为'auto'还需要设置另外一个参数loopedSlides。
            slidesPerView: 5.5,
            paginationClickable: true, //此参数设置为true时，点击分页器的指示点分页器会控制Swiper切换。
            spaceBetween: 10, //slide之间的距离（单位px）。
            freeMode: true, //默认为false，普通模式：slide滑动时只滑动一格，并自动贴合wrapper，设置为true则变为free模式，slide会根据惯性滑动且不会贴合。
            loop: false, //是否可循环
            onTab: function (swiper) {
                let n = swiper1.clickedIndex;
            }
        });
        swiper1.slides.each(function (index, val) {
            let ele = $(this);
            ele.on("click", function () {
                setCurrentSlide(ele, index);
                swiper2.slideTo(index, 500, false);
                //mySwiper.initialSlide=index;
            });
        });

        let swiper2 = new Swiper('.swiper2', {
            //freeModeSticky  设置为true 滑动会自动贴合
            direction: 'horizontal', //Slides的滑动方向，可设置水平(horizontal)或垂直(vertical)。
            loop: false,
            //					effect : 'fade',//淡入
            //effect : 'cube',//方块
            //effect : 'coverflow',//3D流
            //					effect : 'flip',//3D翻转
            //noSwiping : true,
            autoHeight: true, //自动高度。设置为true时，wrapper和container会随着当前slide的高度而发生变化。
            onSlideChangeEnd: function (swiper) { //回调函数，swiper从一个slide过渡到另一个slide结束时执行。
                let n = swiper.activeIndex;
                setCurrentSlide($(".swiper1 .swiper-slide").eq(n), n);
                swiper1.slideTo(n, 500, false);
            }
        });

    }

})(window);