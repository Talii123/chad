var ChoiceItem = React.createClass({displayName: "ChoiceItem",
	render: function() {
		return (
			React.createElement("li", null, this.props.text)
		);
	}
});

var ChoiceList = React.createClass({displayName: "ChoiceList",
	render: function() {
		var choicesHTML = this.props.choices.map(function(choice, index) {
			return React.createElement(ChoiceItem, {key: index, text: choice});
		});
		return (
			React.createElement("ol", null, choicesHTML)
		);
	}
});

var ChoiceUI = React.createClass({displayName: "ChoiceUI",
	getInitialState: function() {
		this.listeners = [];
		return {"choices": this.props.choices};
	}
	, addChoice: function() {
		var choices = this.state.choices
			, choiceText = this.refs.choiceText.getDOMNode()
			, newChoice = choiceText.value;

		choices.push(newChoice);
		this.setState({"choices" : choices});

		choiceText.value = '';
		choiceText.focus();

		this.onNewOptions([newChoice]);
	}
	, handleKeyPress: function(e) {
		if (e.keyCode == 13) { // user hit 'Enter'
			this.addChoice();
		}
	}
	, addListener: function(aListener) {
		this.listeners.push(aListener);
	}
	, onNewOptions: function(newOptions) {
		this.listeners.forEach(function(listener) {
			listener.onNewOptions(newOptions);
		});
	}
	, render: function() {
		return (
			React.createElement("div", {className: "choiceUI"}, 
				React.createElement(ChoiceList, {choices: this.state.choices, onChoiceAdded: this.addChoice}), 
				React.createElement("input", {onKeyUp: this.handleKeyPress, type: "text", ref: "choiceText"}), 
				React.createElement("button", {onClick: this.addChoice}, "Add")
			)
		);
	}
});

choiceUI = React.render(
	React.createElement(ChoiceUI, {choices: CHOICES}),
	document.getElementById('addChoicesContent')
);