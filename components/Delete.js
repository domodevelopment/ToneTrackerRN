import React, { Component } from "react";
import { Platform } from "react-native";
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
import NotifService from "../utilities/NotifService";

const iconColor = Platform.OS === "ios" ? colors.dark : colors.white;

/**
 * This options menu only has one option: delete
 */
class Delete extends Component {
  constructor(props) {
    super(props);
    this.notif = new NotifService();
  }

  render() {
    return (
      <Menu>
        <MenuTrigger>
          <Icon
            color={iconColor}
            name="options-vertical"
            size={20}
            style={{ margin: 10 }}
          />
        </MenuTrigger>
        <MenuOptions>
          <MenuOption
            style={{ padding: 15 }}
            onSelect={() => {
              this.props.deleteGuitar(this.props.selectedForEditing);
              this.notif.cancelNotif(this.props.selectedForEditing);
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
