import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  Switch,
  Image,
  Alert,
  Button
} from "react-native";
import electricFadedImg from "../images/electric_faded.png";
import bassFadedImg from "../images/bass_faded.png";
import acousticFadedImg from "../images/acoustic_faded.png";
import calendar_daily_faded from "../images/calendar_daily_faded.png";
import calendar_somedays_faded from "../images/calendar_somedays_faded.png";
import calendar_weekly_faded from "../images/calendar_weekly_faded.png";
import styles from "../styles/addStyles";
import LinearGradient from "react-native-linear-gradient";

class Add extends Component {
  render() {
    return (
      <View style={styles.parent}>
        <View style={styles.nameInputWrapper}>
          <TextInput
            placeholder="Name (eg. Stratocaster)"
            style={styles.nameInput}
          />
        </View>
        <View style={styles.questionRow}>
          <Text style={styles.text}>What type of guitar is this?</Text>
        </View>
        <View style={styles.selectableImgRow}>
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
        <View style={styles.questionRow}>
          <Text style={styles.text}>How often do you play this guitar?</Text>
        </View>
        <View style={styles.selectableImgRow}>
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
          <Text style={styles.text}>Strings last changed</Text>
          {/* Change this to a date picker */}
          <TouchableHighlight style={styles.datePickerBtn}>
            <Text style={styles.text}>...</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.coated}>
          <Text style={styles.text}>This guitar has coated strings</Text>
          <Switch />
        </View>
        <TouchableHighlight style={styles.submit}>
          <LinearGradient
            colors={["#4c669f", "#3b5998", "#192f6a"]}
            style={styles.gradient}
          >
            <Text style={styles.text}>Submit</Text>
          </LinearGradient>
        </TouchableHighlight>
      </View>
    );
  }
}

export default Add;
