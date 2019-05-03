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
import styles from "../styles/addStyles";
import LinearGradient from "react-native-linear-gradient";
import InstrumentType from "./InstrumentType";
import InstrumentUse from "./InstrumentUse";
import { connect } from "react-redux";
import { addGuitar } from "../actions/actions";
import uuidv1 from "uuid";
import DatePicker from "react-native-datepicker";

class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: uuidv1(),
      name: null,
      type: null,
      use: null,
      coated: false
    };
  }

  handleNameChange = event => {
    this.setState({ name: event });
  };

  handleTypeChange = newType => {
    this.setState({ type: newType });
  };

  handleUseChange = newUse => {
    this.setState({ use: newUse });
  };

  onSwitchChanged = () => {
    this.setState({ coated: !this.state.coated });
  };

  render() {
    return (
      <View style={styles.parent}>
        <View style={styles.nameInputWrapper}>
          <TextInput
            placeholder="Name (eg. Stratocaster)"
            style={styles.nameInput}
            value={this.state.name}
            onChangeText={this.handleNameChange}
          />
        </View>
        <View style={styles.questionRow}>
          <Text style={styles.text}>What type of guitar is this?</Text>
        </View>
        <InstrumentType
          type={this.state.type}
          handleTypeChange={this.handleTypeChange}
        />
        <View style={styles.questionRow}>
          <Text style={styles.text}>How often do you play this guitar?</Text>
        </View>
        <InstrumentUse
          use={this.state.use}
          handleUseChange={this.handleUseChange}
        />
        <View style={styles.lastChanged}>
          <Text style={styles.text}>Strings last changed</Text>
          {/* Change this to a date picker */}
          {/* <TouchableHighlight style={styles.datePickerBtn}>
            <Text style={styles.text}>...</Text>
          </TouchableHighlight> */}
          {/* <DatePicker
            date={this.state.date}
            onDateChange={date => this.setState({ date })}
          /> */}
          <DatePicker
            // style={{ width: 200 }}
            style={styles.datePickerBtn}
            date={this.state.date}
            mode="date"
            placeholder="select date"
            format="YYYY-MM-DD"
            minDate="2016-05-01"
            maxDate="2016-06-01"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={
              {
                // dateIcon: {
                //   position: "absolute",
                //   left: 0,
                //   top: 4,
                //   marginLeft: 0
                // },
                // dateInput: {
                //   marginLeft: 36
                // }
                // ... You can check the source to find the other keys.
              }
            }
            onDateChange={date => {
              this.setState({ date: date });
            }}
          />
        </View>
        <View style={styles.coated}>
          <Text style={styles.text}>This guitar has coated strings</Text>
          <Switch
            value={this.state.coated}
            onValueChange={() => this.onSwitchChanged()}
          />
        </View>
        <TouchableHighlight
          style={styles.submit}
          onPress={() => {
            this.props.addGuitar(this.state);
            this.props.navigation.navigate("Home");
          }}
        >
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

const mapDispatchToProps = dispatch => {
  return {
    addGuitar: guitar => {
      dispatch(addGuitar(guitar));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Add);
