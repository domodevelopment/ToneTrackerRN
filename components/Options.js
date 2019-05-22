import React, { Component } from "react";
import { Text, Alert } from "react-native";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import email from "react-native-email";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from "react-native-popup-menu";
import Share, { ShareSheet, Button } from "react-native-share";
import colors from "../colors";

const EMAIL = "violenthoboenterprises@gmail.com";

// const shareOptions = {
//   title: "React Native",
//   message: "Hola mundo",
//   url:
//     "https://itunes.apple.com/WebObjects/MZStore.woa/wa/viewSoftware?id=1464663060&mt=8",
//   subject: "Share Link"
// };

const shareOptions = {
  url:
    "https://itunes.apple.com/WebObjects/MZStore.woa/wa/viewSoftware?id=1464663060&mt=8"
};

class Options extends Component {
  handleEmail = () => {
    // inform user of error
    email(EMAIL, { subject: "RE: Tone Tracker" }).catch(err =>
      console.error("An error occured", err)
    );
  };
  render() {
    return (
      <Menu>
        <MenuTrigger>
          <Icon
            name="options-vertical"
            color={colors.dark}
            size={20}
            style={{ margin: 10 }}
          />
        </MenuTrigger>
        <MenuOptions>
          <MenuOption
            style={{ padding: 12 }}
            onSelect={() => Share.open(shareOptions)}
            text="Share"
          />
          <MenuOption
            style={{ padding: 12 }}
            onSelect={() => this.handleEmail()}
            text="Contact"
          />
          <MenuOption
            style={{ padding: 12 }}
            onSelect={() => this.props.navigation.navigate(`Settings`)}
            text="Settings"
          />
          <MenuOption
            style={{ padding: 12 }}
            onSelect={() => this.props.navigation.navigate(`PrivacyPolicy`)}
            text="Privacy Policy"
          />
        </MenuOptions>
      </Menu>
    );
  }
}

export default Options;
