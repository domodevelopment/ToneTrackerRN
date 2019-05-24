import React, { Component } from "react";
import { View, TouchableHighlight, Image } from "react-native";
import dailyFadedImg from "../../images/calendar_daily_faded.png";
import dailySelectedImg from "../../images/calendar_daily_selected.png";
import somedaysFadedImg from "../../images/calendar_somedays_faded.png";
import somedaysSelectedImg from "../../images/calendar_somedays_selected.png";
import weeklyFadedImg from "../../images/calendar_weekly_faded.png";
import weeklySelectedImg from "../../images/calendar_weekly_selected.png";
import styles from "../InstrumentType/styles";
import constants from "../../constants";
import colors from "../../colors";

class InstrumentUse extends Component {
  render() {
    //show grayscale image if not selected, show colored image if selected
    dailyImg =
      this.props.use === constants.daily ? dailySelectedImg : dailyFadedImg;
    somedaysImg =
      this.props.use === constants.somedays
        ? somedaysSelectedImg
        : somedaysFadedImg;
    weeklyImg =
      this.props.use === constants.weekly ? weeklySelectedImg : weeklyFadedImg;

    //invalid row should have a red border
    imgRowStyle = this.props.validated
      ? styles.selectableImgRow
      : styles.invalidSelectableImgRow;

    return (
      <View style={imgRowStyle}>
        <TouchableHighlight
          style={styles.imgWrapper}
          onPress={() => this.props.handleUseChange(constants.daily)}
          underlayColor={colors.light}
        >
          <Image source={dailyImg} style={styles.img} resizeMode="contain" />
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.imgWrapper}
          onPress={() => this.props.handleUseChange(constants.somedays)}
          underlayColor={colors.light}
        >
          <Image source={somedaysImg} style={styles.img} resizeMode="contain" />
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.imgWrapper}
          onPress={() => this.props.handleUseChange(constants.weekly)}
          underlayColor={colors.light}
        >
          <Image source={weeklyImg} style={styles.img} resizeMode="contain" />
        </TouchableHighlight>
      </View>
    );
  }
}

export default InstrumentUse;
