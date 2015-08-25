VoteTableRow = React.createClass({displayName: "VoteTableRow",
	render: function() {
		var ballotOption = this.props.ballotOption
			, totalVotes = this.props.votesCounted
			, percentOfVote
			;

		percentOfVote = totalVotes > 0 ? 
			(Number(ballotOption.count / totalVotes).toFixed(2) * 100).toFixed(0) + " %" :
			"-";

		return (
			React.createElement("tr", null, 
				React.createElement("td", {className: "number"}, ballotOption.ID), 
				React.createElement("td", null, ballotOption.description), 
				React.createElement("td", {className: "number"}, ballotOption.count), 
				React.createElement("td", {className: "number"}, percentOfVote)
			)
		);
	}
});

VoteTable = React.createClass({displayName: "VoteTable",
	render: function() {
		var votesCounted = this.props.votesCounted
			, voteTableRows = 
				this.props.ballotOptions.map(function(ballotOption) {
					return (
						React.createElement(VoteTableRow, {
							ballotOption: ballotOption, 
							key: ballotOption.ID, 
							votesCounted: votesCounted}
						)
					);
				});

		return (
			React.createElement("table", null, 
				React.createElement("thead", null, 
					React.createElement("tr", null, 
						React.createElement("td", {className: "number", width: "5%"}, "#"), 
						React.createElement("td", {width: "75%"}, "Description"), 
						React.createElement("td", {className: "number", width: "10%"}, "Votes Received"), 
						React.createElement("td", {className: "number", width: "10%"}, "% of Votes Received")
					)
				), 
				React.createElement("tbody", null, 
					voteTableRows
				)
			)
		);
	}
});

VoteAdder = React.createClass({displayName: "VoteAdder",
	handleVote: function() {
		var ballotBox = this.refs.ballotBox.getDOMNode();
		this.props.onVote(ballotBox.value);
		ballotBox.value = '';
		ballotBox.focus();
	}
	, handleKeyPress: function(e) {
		if (e.keyCode == 13) { // user hit 'Enter'
			this.handleVote();
		}
	}
	, render: function() {
		return (
			React.createElement("div", null, 
				React.createElement("input", {onKeyUp: this.handleKeyPress, ref: "ballotBox"}), 
				React.createElement("button", {onClick: this.handleVote}, "Vote")
			)
		);
	}
});

VoteTabulator = React.createClass({displayName: "VoteTabulator",
	getInitialState: function() {
		return {
			ballotOptions: this.choicesToBallotOptions(this.props.choices)
			, votesCounted: 0
		};
	}
	, choicesToBallotOptions: (function () {
		var nextKey = 1;
		return function(choices) {
			return choices.map(function(choice) {
				return {
					ID : nextKey++
					, description : choice
					, count : 0
				};
			});
		}
	})()
	, countVote: function(voteID) {
		var index
			, newIndex
			, chosenOption
			, options = this.state.ballotOptions;

		index = options.findIndex(function(option) {
			return option.ID == voteID;
		});

		chosenOption = options[index];
		++chosenOption.count;
		for (newIndex = index; newIndex > 0; --newIndex) {
			if (options[newIndex-1].count > options[newIndex].count) {
				break;
			}
		}
		if (newIndex < index) {
			options.splice(index, 1);
			options.splice(newIndex, 0, chosenOption);
		}

		this.setState({
			ballotOptions: options
			, votesCounted: this.state.votesCounted + 1
		});
	}
	, onNewOptions: function(newOptions) {
		var newBallotOptions = this.choicesToBallotOptions(newOptions);
		this.setState({
			ballotOptions: this.state.ballotOptions.concat(newBallotOptions)
			, votesCounted: this.state.votesCounted
		});
	}
	, render: function() {
		return (
			React.createElement("div", null, 
				React.createElement(VoteAdder, {onVote: this.countVote}), 
				React.createElement(VoteTable, {ballotOptions: this.state.ballotOptions, votesCounted: this.state.votesCounted})
			)
		);
	}
});

voteTabulator = React.render(
	React.createElement(VoteTabulator, {choices: CHOICES}),
	document.getElementById('voteContent')
);

choiceUI.addListener(voteTabulator);