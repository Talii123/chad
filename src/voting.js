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
							votesCounted={votesCounted}/>
					);
				});

		return (
			<table>
				<thead>
					<tr>
						<td className="number" width="5%">#</td>
						<td width="69%">Description</td>
						<td className="number" width="13%">Votes Received</td>
						<td className="number" width="13%">% of Votes Received</td>
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
			<div className="voteControls">
				<input onKeyUp={this.handleKeyPress} ref="ballotBox" type="text" />
				<button onClick={this.handleVote}>Vote</button>
			</div>
		);
	}
});

VoteErrorDisplay = React.createClass({
	render: function() {
		return (
			<div className="errorMsg">{this.props.errorMsg}</div>
		);
	}
})

VoteTabulator = React.createClass({
	getInitialState: function() {
		return {
			ballotOptions: []
			, votesCounted: 0
			, errorMsg: ''
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
	, setError: function(msg) {
		var nextState = this.state;
		nextState.errorMsg = msg;
		this.setState(nextState);
	}
	, isValidVote: function(voteID, options) {
		// since 0 is not a valid vote number, !voteID covers 0 and null
		// remember we are 1-indexed
		if (!isFinite(voteID) || !voteID || voteID > options.length || options.length < 2) {
			if (options.length < 2) {
				this.setError('You cannot vote without first adding at least two choices');	
			}
			else {
				this.setError('You need to enter a number from 1 to '+options.length);
			}
			return false;
		}
		return true;
	}
	, countVote: function(voteID) {
		var index
			, newIndex
			, newCount
			, chosenOption
			, options = this.state.ballotOptions;

		if (!this.isValidVote(voteID, options)) return;

		index = options.findIndex(function(option) {
			return option.ID == voteID;
		});

		chosenOption = options[index];
		newCount = ++chosenOption.count;
		for (newIndex = index; newIndex > 0; --newIndex) {
			if (options[newIndex-1].count > newCount) {
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
			, errorMsg: ''
		});
	}
	, onNewOptions: function(newOptions) {
		var newBallotOptions = this.choicesToBallotOptions(newOptions);
		this.setState({
			ballotOptions: this.state.ballotOptions.concat(newBallotOptions)
			, votesCounted: this.state.votesCounted
			, errorMsg: ''
		});
	}
	, onShow: function() {
		this.refs.adder.refs.ballotBox.getDOMNode().focus();
	} 
	, render: function() {
		return (
			<div id="voteContent" className="container">
				<VoteErrorDisplay errorMsg={this.state.errorMsg} />
				<VoteAdder ref="adder" onVote={this.countVote} />
				<VoteTable ballotOptions={this.state.ballotOptions} votesCounted={this.state.votesCounted} />
			</div>
		);
	}
});
