(function() {
	var TABS = {
			'addChoicesContent' : {
				ID: 'addChoicesContent'
				, label: 'Add Choices'
				, containerRef: 'choiceUI'
			}
			, 'voteContent' : {
				ID: 'voteContent'
				, label: 'Vote'
				, containerRef: 'voteTabulator'
			}
		}
		, App;

	App = React.createClass({
		getContainers: function() {
			return this.refs;
		}
		, onNewChoice: function(choiceText) {
			this.refs.voteTabulator.onNewOptions([choiceText]);
		}
		, render: function() {
			return (
				<div>
					<Menu tabs={TABS} selectedTabID='addChoicesContent' getContainers={this.getContainers} />
					<h1>Hi, I&apos;m Chad!</h1>
	    			<h2>I will not rest until every last vote is COUNTED!!</h2>
					<ChoiceUI ref='choiceUI' onNewChoice={this.onNewChoice} />
					<VoteTabulator ref='voteTabulator' />
				</div>
			);
		}
	});

	React.render(
		<App />,
		document.getElementById('main')
	);

})();

