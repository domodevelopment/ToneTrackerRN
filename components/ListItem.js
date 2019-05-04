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
import coatedImg from "../images/coated_icon.png";
import constants from "../constants";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/AntDesign";
import colors from "../colors";

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

  getProgress = () => {
    let age = this.getDaysElapsed();
    return Math.floor(this.getAge(age));
  };

  isCoated = () => {
    return this.props.item.coated ? (
      <Image source={coatedImg} style={styles.coatedImg} resizeMode="contain" />
    ) : null;
  };

  getDaysElapsed = () => {
    let diffStamp = new Date().getTime() - this.props.item.timestamp;
    diffStamp /= 86400000;
    return Math.floor(diffStamp);
  };

  getCondition = () => {
    const { item } = this.props;
    //setting string quality to good as default
    let stringCondition = "#0f0";
    let age = this.getDaysElapsed();
    if (item.type === constants.bass) {
      age /= 2;
    }
    //conditions for strings being dull
    if (
      (15 < age && age < 30 && !item.coated && item.use === constants.daily) ||
      (37 < age &&
        age < 75 &&
        !item.coated &&
        item.use === constants.somedays) ||
      (60 < age &&
        age < 120 &&
        !item.coated &&
        item.use === constants.weekly) ||
      (37 < age && age < 75 && item.coated && item.use === constants.daily) ||
      (94 < age &&
        age < 187 &&
        item.coated &&
        item.use === constants.somedays) ||
      (150 < age && age < 300 && item.coated && item.use === constants.weekly)
    ) {
      stringCondition = "#ff0";
    }
    //conditions for strings being rusty
    if (
      (age >= 30 && !item.coated && item.use === constants.daily) ||
      (age >= 75 && !item.coated && item.use === constants.somedays) ||
      (age >= 120 && !item.coated && item.use === constants.weekly) ||
      (age >= 75 && item.coated && item.use === constants.daily) ||
      (age >= 187 && item.coated && item.use === constants.somedays) ||
      (age >= 300 && item.coated && item.use === constants.weekly)
    ) {
      stringCondition = "#f00";
    }
    return stringCondition;
  };

  getAge = age => {
    const { item } = this.props;
    if (item.type === constants.bass) {
      age /= 2;
    }
    if (!item.coated && item.use === constants.daily) {
      return (age *= 3.3);
    } else if (!item.coated && item.use === constants.somedays) {
      return (age *= 1.3333);
    } else if (!item.coated && item.use === constants.weekly) {
      return (age *= 0.833);
    } else if (item.coated && item.use === constants.daily) {
      return (age *= 1.3333);
    } else if (item.coated && item.use === constants.somedays) {
      return (age *= 0.535);
    } else if (item.coated && item.use === constants.weekly) {
      return (age *= 0.3333);
    }
  };

  render() {
    return (
      <View style={styles.parent}>
        <View style={styles.imageWrapper}>
          <Image
            source={this.instrumentImage()}
            style={styles.image}
            resizeMode="contain"
          />
          <AnimatedCircularProgress
            style={styles.progressCircle}
            size={80} //TODO create a dynamic value instead of this hard coded one
            width={5}
            backgroundWidth={3}
            fill={this.getProgress()}
            tintColor={this.getCondition()}
            onAnimationComplete={() => console.log("onAnimationComplete")}
            backgroundColor="#3d5875"
          />
        </View>
        {this.isCoated()}
        <View style={styles.detailsWrapper}>
          <View style={styles.detailsRowOne}>
            <Text style={styles.nameText}>{this.props.item.name}</Text>
            <TouchableHighlight
              onPress={() => {
                this.props.selectedGuitar(this.props.item.key);
                this.props.navigation.navigate("Edit");
              }}
            >
              <LinearGradient
                colors={[colors.light, colors.primary, colors.dark]}
                style={styles.editButton}
              >
                {/* <Text style={styles.btnText}>Edit</Text> */}
                <Icon name="edit" color={"#fff"} size={20} />
              </LinearGradient>
            </TouchableHighlight>
          </View>
          <View style={styles.detailsRowTwo}>
            <Text style={styles.text}>{this.getDaysElapsed()} days ago</Text>
            <TouchableHighlight>
              <LinearGradient
                colors={["#4c669f", "#3b5998", "#192f6a"]}
                style={styles.restringButton}
              >
                <Text style={styles.btnText}>Restring</Text>
              </LinearGradient>
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
