import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  TouchableHighlight,
  Image,
  Alert
} from "react-native";
import { selectedGuitar } from "../actions/actions";
import { connect } from "react-redux";
import styles from "../styles/listItemStyles";
import electricGuitarImg from "../images/electric_guitar.png";
import bassImg from "../images/bass_guitar.png";
import acousticImg from "../images/acoustic_guitar.png";
import constants from "../constants";

class ListItem extends Component {
  instrumentImage = () => {
    let { type } = this.props.item;
    switch (type) {
      case constants.electric:
        return electricGuitarImg;
      case constants.bass:
        return bassImg;
      case constants.acoustic:
        return acousticImg;
    }
  };
  render() {
    return (
      <View style={styles.parent}>
        <Image
          source={this.instrumentImage()}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.detailsWrapper}>
          <View style={styles.detailsRowOne}>
            <Text style={styles.nameText}>{this.props.item.name}</Text>
            <TouchableHighlight
              onPress={() => {
                this.props.selectedGuitar(this.props.item.key);
                this.props.navigation.navigate("Edit");
              }}
              style={styles.editButton}
            >
              <Text style={styles.text}>Edit</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.detailsRowTwo}>
            <Text style={styles.text}>Some days ago</Text>

            <TouchableHighlight style={styles.restringButton}>
              <Text style={styles.text}>Restring</Text>
            </TouchableHighlight>
          </View>
        </View>
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
