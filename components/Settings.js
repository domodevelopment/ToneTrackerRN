import React, { Component } from "react";
import { View, Text, Switch } from "react-native";
import { connect } from "react-redux";
import { showNotifications } from "../actions/actions";

class Settings extends Component {
  onSwitchChanged = () => {
    this.props.showNotifications(!this.props.notifications);
  };
  render() {
    return (
      <View>
        <Text>Remind me when my guitar needs new strings</Text>
        <Switch
          value={this.props.notifications}
          onValueChange={() => this.onSwitchChanged()}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    notifications: state.notifications
  };
};

const mapDispatchToProps = dispatch => {
  return {
    showNotifications: show => {
      dispatch(showNotifications(show));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
