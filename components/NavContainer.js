import { createAppContainer, createStackNavigator } from "react-navigation";
import React from "react";
import { Text, Alert, Platform } from "react-native";
import Home from "./Home";
import Add from "./Add";
import Edit from "./Edit";
import Settings from "./Settings";
import PrivacyPolicy from "./PrivacyPolicy"
import colors from "../colors";

const ios = Platform.OS === "ios" ? true : false;

getNavigationOptions = () => {
  return ios ? {
      headerStyle: {
        backgroundColor: colors.white
      },
      headerTintColor: colors.dark,
      // header: showHeader
    } : {
        headerStyle: {
          backgroundColor: colors.white
        },
        headerTintColor: colors.dark,
        header: null
      }
}

const Navigator = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      headerBackTitle: 'Back'
    }
  },
  Add: {
    screen: Add,
    // navigationOptions: {
    //   // header: showHeader
    // }
    navigationOptions: this.getNavigationOptions()
  },
  Edit: {
    screen: Edit,
    // navigationOptions: {
    //   // header: showHeader
    // }
    navigationOptions: this.getNavigationOptions()
  },
  Settings: {
    screen: Settings,
    // navigationOptions: {
    //   headerStyle: {
    //     backgroundColor: colors.white
    //   },
    //   headerTintColor: colors.dark,
    //   // header: showHeader
    // }
    navigationOptions: this.getNavigationOptions()
  },
  PrivacyPolicy: {
    screen: PrivacyPolicy,
    // navigationOptions: {
    //   headerStyle: {
    //     backgroundColor: colors.white
    //   },
    //   headerTintColor: colors.dark,
    //   // header: showHeader
    // }
    navigationOptions: this.getNavigationOptions()
  }
});

export default (NavContainer = createAppContainer(Navigator));
