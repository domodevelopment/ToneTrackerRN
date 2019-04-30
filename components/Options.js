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

const EMAIL = "violenthoboenterprises@gmail.com";

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
          <MenuOption onSelect={() => alert(`Save`)} text="Save" />
          <MenuOption onSelect={() => alert(`Delete`)}>
            <Text style={{ color: "red" }}>Delete</Text>
          </MenuOption>
          <MenuOption
            onSelect={() => alert(`Not called`)}
            disabled={true}
            text="Disabled"
          />
          <MenuOption
            onSelect={() => this.props.navigation.navigate(`Settings`)}
            text="Settings"
          />
          <MenuOption
            onSelect={() => Alert.alert("Share clicked")}
            text="Share"
          />

          <MenuOption onSelect={() => this.handleEmail()} text="Contact" />
        </MenuOptions>
      </Menu>
    );
  }
}

export default Options;
