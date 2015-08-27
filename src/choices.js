var ChoiceItem = React.createClass({
	render: function() {
		return (
			<li>{this.props.text}</li>
		);
	}
});

var ChoiceList = React.createClass({
	render: function() {
		var choicesHTML = this.props.choices.map(function(choice, index) {
			return <ChoiceItem key={index} text={choice} />;
		});
		return (
			<ol>{choicesHTML}</ol>
		);
	}
});

var ChoiceUI = React.createClass({
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
			<div className="choiceUI">
				<ChoiceList choices={this.state.choices} onChoiceAdded={this.addChoice} />
				<input onKeyUp={this.handleKeyPress} type="text" ref="choiceText" />
				<button onClick={this.addChoice}>Add</button>
			</div>
		);
	}
});

choiceUI = React.render(
	<ChoiceUI choices={CHOICES} />,
	document.getElementById('addChoicesContent')
);

topMenu.addTab("addChoicesContent", "Add Choices", function() {
	choiceUI.refs.choiceText.getDOMNode().focus();
});