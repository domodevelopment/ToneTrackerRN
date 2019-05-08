import React, { Component } from "react";
import { Text, Alert } from "react-native";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from "react-native-popup-menu";
import { connect } from "react-redux";
import { deleteGuitar } from "../actions/actions";
import colors from "../colors";

class Delete extends Component {
  render() {
    return (
      <Menu>
        <MenuTrigger>
          <Icon color={colors.white} name="options-vertical" size={20} />
        </MenuTrigger>
        <MenuOptions>
          <MenuOption
            onSelect={() => {
              this.props.deleteGuitar(this.props.selectedForEditing);
              this.props.navigation.navigate(`Home`);
            }}
            text="Delete"
          />
        </MenuOptions>
      </Menu>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedForEditing: state.selectedForEditing
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteGuitar: guitar => {
      dispatch(deleteGuitar(guitar));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Delete);
