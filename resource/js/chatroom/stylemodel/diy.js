(function() {

	$("#diyModelButton").click(function() {
		addHtml();
		run();
		addRichtextEvent();
		//禁用其他的模式按键
		$("#diyModelButton").attr("disabled", "disabled");
		$("#mobileModelButton").attr("disabled", "disabled");
		
	});

	var addHtml = function() {
		var viewHtml = new Array(3);
		viewHtml[0] = memberAndRoleDiv.innerHTML;
		viewHtml[1] = gameDiv.innerHTML;
		viewHtml[2] = oderDiv.innerHTML;

		$("#view").html("");
		for(var i = 0; i < viewHtml.length; i++) {
			var diyBoxHtml = "<div class=\"grid-stack-item\" data-gs-x=\"" + i * 4 + "\" data-gs-y=\"0\" data-gs-width=\"4\" data-gs-height=\"8\"><div class=\"grid-stack-item-content\">" +
				viewHtml[i] +
				"</div></div>";
			view.innerHTML = view.innerHTML + diyBoxHtml;
		}

	};

	var run = function() {
		var options = {
			float: true
		};
		$('.grid-stack').gridstack(options);
	};

})();