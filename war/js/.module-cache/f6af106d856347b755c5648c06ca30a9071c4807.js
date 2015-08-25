var Tab = React.createClass({displayName: "Tab",
	clickHandler: function() {
		this.props.onClick(this.props.id);
	}
	, render: function() {
		return (
			React.createElement("span", {className: (this.props.selectedTab == this.props.id) ? 'tab selected' : 'tab', 
				  onClick: this.clickHandler}, 
				this.props.text
			)
		);
	}
});
var Menu = React.createClass({displayName: "Menu",
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
			React.createElement("div", null, 
				React.createElement(Tab, {id: "addChoices", 
					 text: "Add Choices", 
					 selectedTab: this.state.selectedTab, 
					 onClick: this.onTabSelected}
				), 
				React.createElement(Tab, {id: "vote", 
					 text: "Vote", 
					 selectedTab: this.state.selectedTab, 
					 onClick: this.onTabSelected}
				)
			)
		);
	}
});
React.render(
	React.createElement(Menu, null),
	document.getElementById("menu")
);