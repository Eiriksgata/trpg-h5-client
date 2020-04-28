(function(w) {
	var MessageAnalysis = {};
	
	MessageAnalysis.richTextConvert = function(text) {
		var regex = /\[name=[A-z]+,type=[A-z]+,content=.*?\]/g
		var controlTextList = text.match(regex);
		if(controlTextList == null) {
			return text;
		}
		for(var i = 0; i < controlTextList.length; i++) {
			var controlName = controlTextList[i].match(/name=[A-z]+/)[0].substring(5);
			var controlType = controlTextList[i].match(/type=[A-z]+/)[0].substring(5);
			var controlContent = controlTextList[i].match(/content=.*/)[0];
			if(controlContent == null) {
				controlContent = "";
			} else {
				controlContent = controlContent.substring(8, controlContent.length - 1);
			}
			inputText = inputText.replace(controlTextList[i], getCreateText(controlName, controlType, controlContent));
			return inputText;
		}
	}
	

	w.MessageAnalysis = MessageAnalysis;
})(window);