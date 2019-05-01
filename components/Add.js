import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  Switch,
  Image
} from "react-native";
import electricFadedImg from "../images/electric_faded.png";
import bassFadedImg from "../images/bass_faded.png";
import acousticFadedImg from "../images/acoustic_faded.png";
import calendar_daily_faded from "../images/calendar_daily_faded.png";
import calendar_somedays_faded from "../images/calendar_somedays_faded.png";
import calendar_weekly_faded from "../images/calendar_weekly_faded.png";
import styles from "../styles/addStyles";

class Add extends Component {
  render() {
    return (
      <View style={styles.parent}>
        <TextInput
          placeholder="Name (eg. Stratocaster)"
          style={styles.nameInput}
        />
        <Text style={styles.questionRow}>What type of guitar is this?</Text>
        <View style={styles.typeRow}>
          <TouchableHighlight style={styles.imgWrapper}>
            <Image
              source={electricFadedImg}
              style={styles.img}
              resizeMode="contain"
            />
          </TouchableHighlight>
          <TouchableHighlight style={styles.imgWrapper}>
            <Image
              source={bassFadedImg}
              style={styles.img}
              resizeMode="contain"
            />
          </TouchableHighlight>
          <TouchableHighlight style={styles.imgWrapper}>
            <Image
              source={acousticFadedImg}
              style={styles.img}
              resizeMode="contain"
            />
          </TouchableHighlight>
        </View>
        <Text style={styles.questionRow}>
          How often do you play this guitar?
        </Text>
        <View style={styles.typeRow}>
          <TouchableHighlight style={styles.imgWrapper}>
            <Image
              source={calendar_daily_faded}
              style={styles.img}
              resizeMode="contain"
            />
          </TouchableHighlight>
          <TouchableHighlight style={styles.imgWrapper}>
            <Image
              source={calendar_somedays_faded}
              style={styles.img}
              resizeMode="contain"
            />
          </TouchableHighlight>
          <TouchableHighlight style={styles.imgWrapper}>
            <Image
              source={calendar_weekly_faded}
              style={styles.img}
              resizeMode="contain"
            />
          </TouchableHighlight>
        </View>
        <View style={styles.lastChanged}>
          <Text>Strings last changed</Text>
          {/* Change this to a date picker */}
          <TextInput placeholder="..." />
        </View>
        <View style={styles.coated}>
          <Text>This guitar has coated strings</Text>
          <Switch />
        </View>
        <TouchableHighlight style={styles.submit}>
          <Text>Submit</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default Add;
