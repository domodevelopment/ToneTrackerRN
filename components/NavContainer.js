import { createAppContainer, createStackNavigator } from "react-navigation";
import React from "react";
import { Text, Alert } from "react-native";
import Home from "./Home";
import Add from "./Add";
import Edit from "./Edit";
import Settings from "./Settings";
import Options from "./Options";
import RemoveMe from "./RemoveMe";

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
  },
  RemoveMe: {
    screen: RemoveMe
  }
});

export default (NavContainer = createAppContainer(Navigator));
