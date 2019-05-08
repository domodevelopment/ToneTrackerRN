import { createAppContainer, createStackNavigator } from "react-navigation";
import React from "react";
import { Text, Alert } from "react-native";
import Home from "./Home";
import Add from "./Add";
import Edit from "./Edit";
import Settings from "./Settings";

const Navigator = createStackNavigator({
  Home: {
    screen: Home
  },
  Add: {
    screen: Add
  },
  Edit: {
    screen: Edit
  },
  Settings: {
    screen: Settings
  }
});

export default (NavContainer = createAppContainer(Navigator));
