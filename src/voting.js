VoteTableRow = React.createClass({
	render: function() {
		var ballotOption = this.props.ballotOption
			, totalVotes = this.props.votesCounted
			, percentOfVote
			;

		percentOfVote = totalVotes > 0 ? 
			(Number(ballotOption.count / totalVotes).toFixed(2) * 100).toFixed(0) + " %" :
			"-";

		return (
			<tr>
				<td className="number">{ballotOption.ID}</td>
				<td>{ballotOption.description}</td>
				<td className="number">{ballotOption.count}</td>
				<td className="number">{percentOfVote}</td>
			</tr>
		);
	}
});

VoteTable = React.createClass({
	render: function() {
		var votesCounted = this.props.votesCounted
			, voteTableRows = 
				this.props.ballotOptions.map(function(ballotOption) {
					return (
						<VoteTableRow 
							ballotOption={ballotOption}
							key={ballotOption.ID}
							votesCounted={votesCounted}
						/>
					);
				});

		return (
			<table>
				<thead>
					<tr>
						<td className="number" width="5%">#</td>
						<td width="75%">Description</td>
						<td className="number" width="10%">Votes Received</td>
						<td className="number" width="10%">% of Votes Received</td>
					</tr>
				</thead>
				<tbody>
					{voteTableRows}
				</tbody>
			</table>
		);
	}
});

VoteAdder = React.createClass({
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
			<div>
				<input onKeyUp={this.handleKeyPress} ref="ballotBox" />
				<button onClick={this.handleVote}>Vote</button>
			</div>
		);
	}
});

VoteTabulator = React.createClass({
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
			<div>
				<VoteAdder onVote={this.countVote} />
				<VoteTable ballotOptions={this.state.ballotOptions} votesCounted={this.state.votesCounted} />
			</div>
		);
	}
});

voteTabulator = React.render(
	<VoteTabulator choices={CHOICES} />,
	document.getElementById('voteContent')
);

choiceUI.addListener(voteTabulator);