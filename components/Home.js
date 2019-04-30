import React, { Component } from "react";
import { View, Text, Button } from "react-native";

class Home extends Component {
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
