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
		return { selectedTabID: this.props.selectedTabID };
	}
	, componentDidMount: function() {
		document.getElementById(this.state.selectedTabID).style.display = 'block';
	}
	, onTabSelected: function(nextSelectedTabID) {
		var currentTabID = this.state.selectedTabID
			, containerRef
			, cb;

		if (nextSelectedTabID !== currentTabID) {
			document.getElementById(currentTabID).style.display = "none";
			document.getElementById(nextSelectedTabID).style.display = "block";

			containerRef = this.props.tabs[nextSelectedTabID].containerRef;
			cb = this.props.getContainers()[containerRef].onShow;
			if (cb) cb();

			this.setState({ selectedTabID: nextSelectedTabID });
		}
	}
	, render: function() {
		var rendered = Object.keys(this.props.tabs).map(function(tabID) {
			var tab = this.props.tabs[tabID];
			return (
				<Tab id={tabID}
					 key={tabID}
					 text={tab.label}
					 isSelected={this.state.selectedTabID === tabID ? 1 : 0}
					 onClick={this.onTabSelected}>
				</Tab>
			);
		}.bind(this));
		return (
			<div id="menu" className="topMenu">{rendered}</div>
		);
	}
});
