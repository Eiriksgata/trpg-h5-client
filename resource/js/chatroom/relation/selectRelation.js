(function () {

    let roleImgClick = function (control) {
        let img = $(control).attr("src");
        window.selectMemberId = $(control).attr('alt');
        xadmin.open('选择绑定人物卡', 'selectRoleRelationshipList.html', '', '');
    };

    window.roleImgClick = roleImgClick;

})();