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
		return { 'choices' : [] };
	}
	, onNewChoice: function() {
		var choices = this.state.choices
			, choiceText = this.refs.choiceText.getDOMNode()
			, newChoice = choiceText.value;

		choices.push(newChoice);

		choiceText.value = '';
		choiceText.focus();

		this.setState({'choices' : choices});
		this.props.onNewChoice(newChoice);
	}
	, handleKeyPress: function(e) {
		if (e.keyCode == 13) { // user hit 'Enter'
			this.onNewChoice();
		}
	}
	, onShow: function() {
		this.refs.choiceText.getDOMNode().focus();
	}
	, render: function() {
		return (
			<div className="choiceUI container" id="addChoicesContent">
				<ChoiceList choices={this.state.choices} />
				<input onKeyUp={this.handleKeyPress} type="text" ref="choiceText" />
				<button onClick={this.addChoice}>Add</button>
			</div>
		);
	}
});
