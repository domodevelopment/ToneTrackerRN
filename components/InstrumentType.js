import React, { Component } from "react";
import { View, TouchableHighlight, Image, Alert } from "react-native";
import electricFadedImg from "../images/electric_faded.png";
import electricSelectedImg from "../images/electric_selected.png";
import bassFadedImg from "../images/bass_faded.png";
import bassSelectedImg from "../images/bass_selected.png";
import acousticFadedImg from "../images/acoustic_faded.png";
import acousticSelectedImg from "../images/acoustic_selected.png";
import styles from "../styles/typeStyles";
import constants from "../constants";
import colors from "../colors";

class InstrumentType extends Component {
  render() {
    electricImg =
      this.props.type === constants.electric
        ? electricSelectedImg
        : electricFadedImg;
    acousticImg =
      this.props.type === constants.acoustic
        ? acousticSelectedImg
        : acousticFadedImg;
    bassImg =
      this.props.type === constants.bass ? bassSelectedImg : bassFadedImg;

    imgRowStyle = this.props.validated
      ? styles.selectableImgRow
      : styles.unvalidatedSelectableImgRow;

    return (
      <View style={imgRowStyle}>
        <TouchableHighlight
          style={styles.imgWrapper}
          onPress={() => this.props.handleTypeChange(constants.electric)}
          underlayColor={colors.light}
        >
          <Image source={electricImg} style={styles.img} resizeMode="contain" />
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.imgWrapper}
          onPress={() => this.props.handleTypeChange(constants.bass)}
          underlayColor={colors.light}
        >
          <Image source={bassImg} style={styles.img} resizeMode="contain" />
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.imgWrapper}
          onPress={() => this.props.handleTypeChange(constants.acoustic)}
          underlayColor={colors.light}
        >
          <Image source={acousticImg} style={styles.img} resizeMode="contain" />
        </TouchableHighlight>
      </View>
    );
  }
}

export default InstrumentType;
