var Tab = React.createClass({
	clickHandler: function() {
		this.props.onClick(this.props.id);
	}
	, render: function() {
		return (
			<span className={(this.props.selectedTab == this.props.id) ? 'tab selected' : 'tab'}
				  onClick={this.clickHandler}>
				{this.props.text}
			</span>
		);
	}
});
var Menu = React.createClass({
	getInitialState: function() {
		var selectedTab = "addChoices"; //"vote"
		document.getElementById(selectedTab + "Content").style.display = "block";
		return {selectedTab: selectedTab};
	}
	, onTabSelected: function(tabID) {
		var selectedTab = this.state.selectedTab;
		if (tabID !== selectedTab) {
			document.getElementById(selectedTab + "Content").style.display = "none";
			document.getElementById(tabID + "Content").style.display = "block";
			this.setState({selectedTab: tabID});	
		}
	}
	, render: function() {
		return (
			<div>
				<Tab id="addChoices"
					 text="Add Choices"
					 selectedTab={this.state.selectedTab}
					 onClick={this.onTabSelected}>
				</Tab>
				<Tab id="vote"
					 text="Vote"
					 selectedTab={this.state.selectedTab}
					 onClick={this.onTabSelected}>
				</Tab>
			</div>
		);
	}
});
React.render(
	<Menu />,
	document.getElementById("menu")
);