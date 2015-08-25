var ChoiceItem = React.createClass({
	render: function() {
		return (
			<li>{this.props.choiceText}</li>
		);
	}
});

var ChoiceList = React.createClass({
	render: function() {
		var choicesHTML = this.props.choices.map(function(choice) {
			return <ChoiceItem choiceText={choice} />;
		});
		return (
			<ol>{choicesHTML}</ol>
		);
	}
});

var ChoiceUI = React.createClass({
	render: function() {
		return (
			<div className="choiceUI">
				<ChoiceList choices={this.props.choices} />
				<input type="text" />
				<button>Add</button>
			</div>
		);
	}
});
React.render(
	<ChoiceUI choices={CHOICES} />,
	document.getElementById('addChoicesContent')
);