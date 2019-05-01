import React, { Component } from "react";
import { View, TouchableHighlight, Image, Alert } from "react-native";
import dailyFadedImg from "../images/calendar_daily_faded.png";
import dailySelectedImg from "../images/calendar_daily_selected.png";
import somedaysFadedImg from "../images/calendar_somedays_faded.png";
import somedaysSelectedImg from "../images/calendar_somedays_selected.png";
import weeklyFadedImg from "../images/calendar_weekly_faded.png";
import weeklySelectedImg from "../images/calendar_weekly_selected.png";
import styles from "../styles/typeStyles";
import constants from "../constants";

class InstrumentUse extends Component {
  render() {
    dailyImg =
      this.props.use === constants.daily ? dailySelectedImg : dailyFadedImg;
    somedaysImg =
      this.props.use === constants.somedays
        ? somedaysSelectedImg
        : somedaysFadedImg;
    weeklyImg =
      this.props.use === constants.weekly ? weeklySelectedImg : weeklyFadedImg;
    return (
      <View style={styles.selectableImgRow}>
        <TouchableHighlight
          style={styles.imgWrapper}
          onPress={() => this.props.handleUseChange(constants.daily)}
        >
          <Image source={dailyImg} style={styles.img} resizeMode="contain" />
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.imgWrapper}
          onPress={() => this.props.handleUseChange(constants.somedays)}
        >
          <Image source={somedaysImg} style={styles.img} resizeMode="contain" />
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.imgWrapper}
          onPress={() => this.props.handleUseChange(constants.weekly)}
        >
          <Image source={weeklyImg} style={styles.img} resizeMode="contain" />
        </TouchableHighlight>
      </View>
    );
  }
}

export default InstrumentUse;
