import React, { Component } from "react";
import { Text, Alert } from "react-native";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from "react-native-popup-menu";

class Options extends Component {
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
        </MenuOptions>
      </Menu>
    );
  }
}

export default Options;
