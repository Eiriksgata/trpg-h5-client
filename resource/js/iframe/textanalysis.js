(function (w) {
    let MessageAnalysis = {};

    MessageAnalysis.richTextConvert = function (text) {
        let regex = /\[name=[A-z]+,type=[A-z]+,content=.*?\]/g;
        let controlTextList = text.match(regex);
        if (controlTextList == null) {
            return text;
        }
        for (let i = 0; i < controlTextList.length; i++) {
            let controlName = controlTextList[i].match(/name=[A-z]+/)[0].substring(5);
            let controlType = controlTextList[i].match(/type=[A-z]+/)[0].substring(5);
            let controlContent = controlTextList[i].match(/content=.*/)[0];
            if (controlContent == null) {
                controlContent = "";
            } else {
                controlContent = controlContent.substring(8, controlContent.length - 1);
            }
            text = text.replace(controlTextList[i], getCreateText(controlName, controlType, controlContent));
        }
        return text;
    };


    w.MessageAnalysis = MessageAnalysis;
})(window);