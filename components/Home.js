import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  TouchableHighlight,
  Alert
} from "react-native";
import Options from "./Options";
import { connect } from "react-redux";
import styles from "../styles/homeStyles";
import ListItem from "./ListItem";

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
      <View style={styles.parent}>
        <FlatList
          data={this.props.guitars}
          // renderItem={({ item }) => <Text>{item.name}</Text>}
          renderItem={({ item }) => (
            <ListItem item={item} navigation={this.props.navigation} />
          )}
        />
        <TouchableHighlight
          onPress={() => this.props.navigation.navigate("Add")}
          style={styles.fab}
        >
          <Text style={{ color: "white" }}>Add</Text>
        </TouchableHighlight>
        {/* <TouchableHighlight
          onPress={() => this.props.navigation.navigate("Edit")}
        >
          <Text>Edit</Text>
        </TouchableHighlight> */}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    guitars: state.guitars
  };
};

export default connect(
  mapStateToProps,
  null
)(Home);
