(function(w){

    let addRichtextEvent = function(){
        $(".richtextInputBox").click(function(){
            document.getElementById("plotTextarea").contentEditable = true;
            document.getElementById("plotTextarea").focus();
        });
    };


    w.addRichtextEvent = addRichtextEvent;


})(window);