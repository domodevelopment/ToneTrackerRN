import React, { Component } from "react";
import { View, Text, Button } from "react-native";
import Options from "./Options";

class Home extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      //Heading/title of the header
      title: navigation.getParam("Title", "Popup Menu Example"),
      //Heading style
      headerStyle: {
        backgroundColor: navigation.getParam("BackgroundColor", "red")
      },
      //Heading text color
      headerTintColor: navigation.getParam("HeaderTintColor", "#fff"),
      //Heading Menu in Right Side
      headerRight: <Options navigation={navigation} />
    };
  };
  render() {
    return (
      <View>
        <Text>Home</Text>
        <Button
          title="Add"
          onPress={() => this.props.navigation.navigate("Add")}
        />
        <Button
          title="Edit"
          onPress={() => this.props.navigation.navigate("Edit")}
        />
      </View>
    );
  }
}

export default Home;
