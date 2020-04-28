(function(w){


    var addRichtextEvent = function(){
        $(".richtextInputBox").click(function(){
            document.getElementById("gameTextarea").contentEditable = true;
            document.getElementById("gameTextarea").focus();
        });
    };


    w.addRichtextEvent = addRichtextEvent;


})(window);