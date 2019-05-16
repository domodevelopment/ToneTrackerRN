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
import { selectedGuitar, editGuitar, showDatePicker } from "../actions/actions";
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
import Dialog from "react-native-dialog";
import { Dimensions } from "react-native";
import NotifService from '../utilities/NotifService';

const width = Dimensions.get("window").width

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restringPopup: false
    };
    this.notif = new NotifService();
  }

  instrumentImage = () => {
    let { type, photo } = this.props.item;
    //No photo exists. Use a  default image
    if (photo === null) {
      switch (type) {
        case constants.electric:
          return electricGuitarImg;
        case constants.bass:
          return bassImg;
        case constants.acoustic:
          return acousticImg;
      }
    }
    //Return the photo
    return { uri: photo };
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

  getDisplayAge = () => {
    const age = this.getDaysElapsed();
    if (age === 0) {
      return "Restrung today";
    } else if (age === 1) {
      return `${age} day ago`;
    } else {
      return `${age} days ago`;
    }
  };

  getCondition = () => {
    const { item } = this.props;
    //setting string quality to good as default
    let stringCondition = colors.good;
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
      stringCondition = colors.dull;
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
      stringCondition = colors.rusty;
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
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 50,
              transform: [
                { rotate: this.props.item.photo === null ? "0deg" : "90deg" }
              ]
            }}
            resizeMode="cover"
          />
          <AnimatedCircularProgress
            style={styles.progressCircle}
            size={width * 0.27}
            width={5}
            backgroundWidth={3}
            fill={this.getProgress()}
            tintColor={this.getCondition()}
            backgroundColor={colors.notQuiteBlack}
          />
        </View>
        {this.isCoated()}
        <View style={styles.detailsWrapper}>
          <View style={styles.detailsRowOne}>
            <Text style={styles.nameText}>{this.props.item.name}</Text>
            <TouchableHighlight
              onPress={() => {
                this.props.selectedGuitar(this.props.item.key);
                this.props.navigation.navigate("Edit", { photo: null });
              }}
              style={styles.editBtnWrapper}
            >
              <LinearGradient
                colors={[colors.white, colors.lessWhite, colors.evenLessWhite]}
                style={styles.editButton}
              >
                <Icon name="edit" color={colors.notQuiteBlack} size={20} />
              </LinearGradient>
            </TouchableHighlight>
          </View>
          <View style={styles.detailsRowTwo}>
            <View style={styles.ageTextWrapper}>
              <Text style={styles.ageText}>{this.getDisplayAge()}</Text>
            </View>
            <TouchableHighlight
              onPress={() => {
                this.setState({ restringPopup: true });
              }}
              style={styles.restringBtnWrapper}
            >
              <LinearGradient
                colors={[colors.light, colors.primary, colors.dark]}
                style={styles.restringButton}
              >
                <Text style={styles.btnText}>Restring</Text>
              </LinearGradient>
            </TouchableHighlight>
          </View>
        </View>
        <View>
          <Dialog.Container visible={this.state.restringPopup}>
            <Dialog.Title>Restring Guitar</Dialog.Title>
            <Dialog.Description>
              When did you restring this guitar?
            </Dialog.Description>
            <Dialog.Button
              label="Today"
              onPress={() => {
                this.setState({ restringPopup: false });
                this.props.item.timestamp = new Date().getTime();
                this.props.editGuitar(this.props.item);
                this.notif.cancelNotif(this.props.item.key)
                if(this.props.notifications){
                  this.notif.scheduleNotif(this.props.item)
                }
              }}
              color={colors.dark}
            />
            <Dialog.Button
              label="Some other day"
              onPress={() => {
                this.setState({ restringPopup: false });
                this.props.selectedGuitar(this.props.item.key);
                this.props.showDatePicker(true);
                this.props.navigation.navigate("Edit", { photo: null });
              }}
              color={colors.dark}
            />
            <Dialog.Button
              label="Cancel"
              onPress={() => {
                this.setState({ restringPopup: false });
              }}
              color={colors.dark}
            />
          </Dialog.Container>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    notifications: state.notifications
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectedGuitar: key => {
      dispatch(selectedGuitar(key));
    },
    showDatePicker: val => {
      dispatch(showDatePicker(val));
    },
    editGuitar: guitar => {
      dispatch(editGuitar(guitar));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListItem);
