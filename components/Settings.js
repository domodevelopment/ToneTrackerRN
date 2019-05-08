import React, { Component } from "react";
import { View, Text, Switch } from "react-native";
import { connect } from "react-redux";
import { showNotifications } from "../actions/actions";
import styles from "../styles/settingsStyles";
import colors from "../colors";

class Settings extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: {
        backgroundColor: colors.primary
      }
    };
  };
  onSwitchChanged = () => {
    this.props.showNotifications(!this.props.notifications);
  };
  render() {
    return (
      <View style={styles.parent}>
        <View style={styles.textWrapper}>
          <Text style={styles.text}>
            Remind me when my guitar needs new strings
          </Text>
        </View>
        <View style={styles.switchWrapper}>
          <Switch
            style={styles.switch}
            value={this.props.notifications}
            onValueChange={() => this.onSwitchChanged()}
          />
        </View>
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
