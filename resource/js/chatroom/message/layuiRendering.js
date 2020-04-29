(function(w){

    let layuiRender = function(innerHtml,data){
        layui.use('laytpl', function(laytpl) {
            laytpl(innerHtml).render(data, function(html) {
                return html;
            });
        });
    };

    w.layuiRender = layuiRender;
})(window);