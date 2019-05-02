import React, { Component } from "react";
import { View, Text, Button, FlatList, TouchableHighlight } from "react-native";
import { selectedGuitar } from "../actions/actions";
import { connect } from "react-redux";

class ListItem extends Component {
  render() {
    return (
      <View>
        <Text>{this.props.item.name}</Text>
        <Text>{this.props.item.type}</Text>
        <Button
          title="Edit"
          onPress={() => {
            this.props.selectedGuitar(this.props.item.key);
            this.props.navigation.navigate("Edit");
          }}
        />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    selectedGuitar: key => {
      dispatch(selectedGuitar(key));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(ListItem);
