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

const EMAIL = "violenthoboenterprises@gmail.com";

const shareOptions = {
  title: "React Native",
  message: "Hola mundo",
  url: "http://facebook.github.io/react-native/",
  subject: "Share Link" //  for email
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
          <Icon name="options-vertical" size={20} />
        </MenuTrigger>
        <MenuOptions>
          <MenuOption
            onSelect={() => this.props.navigation.navigate(`Settings`)}
            text="Settings"
          />
          <MenuOption onSelect={() => Share.open(shareOptions)} text="Share" />
          <MenuOption onSelect={() => this.handleEmail()} text="Contact" />
        </MenuOptions>
      </Menu>
    );
  }
}

export default Options;
