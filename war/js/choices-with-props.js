var ChoiceItem = React.createClass({displayName: "ChoiceItem",
	render: function() {
		return (
			React.createElement("li", null, this.props.choiceText)
		);
	}
});

var ChoiceList = React.createClass({displayName: "ChoiceList",
	render: function() {
		var choicesHTML = this.props.choices.map(function(choice) {
			return React.createElement(ChoiceItem, {choiceText: choice});
		});
		return (
			React.createElement("ol", null, choicesHTML)
		);
	}
});

var ChoiceUI = React.createClass({displayName: "ChoiceUI",
	render: function() {
		return (
			React.createElement("div", {className: "choiceUI"}, 
				React.createElement(ChoiceList, {choices: this.props.choices}), 
				React.createElement("input", {type: "text"}), 
				React.createElement("button", null, "Add")
			)
		);
	}
});
React.render(
	React.createElement(ChoiceUI, {choices: CHOICES}),
	document.getElementById('addChoicesContent')
);