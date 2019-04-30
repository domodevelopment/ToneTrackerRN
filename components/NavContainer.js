import { createAppContainer, createStackNavigator } from "react-navigation";
import React from "react";
import { Text, Alert } from "react-native";
import Home from "./Home";
import Add from "./Add";
import Edit from "./Edit";
import Settings from "./Settings";
import Options from "./Options";

const Navigator = createStackNavigator({
  Home: {
    screen: Home
    // navigationOptions: {
    //   drawerLabel: "Home",
    //   headerRight: <Options />
    // }
  },
  Add: {
    screen: Add
    // navigationOptions: {
    //   drawerLabel: "Add"
    // }
  },
  Edit: {
    screen: Edit
    // navigationOptions: {
    //   drawerLabel: "Edit"
    // }
  },
  Settings: {
    screen: Settings
  }
});

export default (NavContainer = createAppContainer(Navigator));
