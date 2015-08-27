var Tab = React.createClass({
	clickHandler: function() {
		this.props.onClick(this.props.id);
	}
	, render: function() {
		return (
			<span className={(this.props.isSelected) ? 'tab selected' : 'tab'}
				  onClick={this.clickHandler}>
				{this.props.text}
			</span>
		);
	}
});
var Menu = React.createClass({
	getInitialState: function() {
		return {
			tabs: {}
			, selectedTabID: null
		};
	}
	, onTabSelected: function(nextSelectedTabID) {
		var currentTabID = this.state.selectedTabID
			, cb;

		if (nextSelectedTabID !== currentTabID) {
			document.getElementById(currentTabID).style.display = "none";
			document.getElementById(nextSelectedTabID).style.display = "block";

			cb = this.state.tabs[nextSelectedTabID].cb;
			if (cb) cb();

			this.setState({
				tabs: this.state.tabs
				, selectedTabID: nextSelectedTabID
			});	
		}
	}
	, addTab: function(anID, aLabel, aCallback) {
		var tabs = this.state.tabs;

		tabs[anID] = {
			text: aLabel
			, cb: aCallback
		};

		if (!this.state.selectedTabID) {
			this.state.selectedTabID = anID;
			document.getElementById(anID).style.display = "block";
			if (aCallback) aCallback();
		}

		this.setState({
			tabs: tabs
			, selectedTabID: this.state.selectedTabID
		});
	}
	, render: function() {
		var tabs = this.state.tabs,
			rendered;

		rendered = Object.keys(tabs).map(function(tabID) {
			return (
				<Tab id={tabID}
					 key={tabID}
					 text={tabs[tabID].text}
					 isSelected={this.state.selectedTabID === tabID ? 1 : 0}
					 onClick={this.onTabSelected}>
				</Tab>
			);
		}.bind(this));
		return (
			<div>{rendered}</div>
		);
	}
});
var topMenu = React.render(
	<Menu />,
	document.getElementById("menu")
);