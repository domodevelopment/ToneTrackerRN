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
      timestamp: null,
      coated: false,
      nameValidated: true,
      typeValidated: true,
      useValidated: true,
      stampValidated: true
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

  handleSubmit = () => {
    //check that no details are missing
    if (
      this.state.name !== null &&
      this.state.type !== null &&
      this.state.use !== null &&
      this.state.timestamp !== null
    ) {
      this.props.addGuitar(this.state);
      this.props.navigation.navigate("Home");
    } else {
      if (this.state.name === null) {
        this.setState({ nameValidated: false });
      } else {
        this.setState({ nameValidated: true });
      }
      if (this.state.type === null) {
        this.setState({ typeValidated: false });
      } else {
        this.setState({ typeValidated: true });
      }
      if (this.state.use === null) {
        this.setState({ useValidated: false });
      } else {
        this.setState({ useValidated: true });
      }
      if (this.state.timestamp === null) {
        this.setState({ stampValidated: false });
      } else {
        this.setState({ stampValidated: true });
      }
    }
  };

  onSwitchChanged = () => {
    this.setState({ coated: !this.state.coated });
  };

  getFormattedDate = () => {
    const { timestamp } = this.state;
    if (timestamp !== null) {
      const date = new Date(this.state.timestamp);
      const day = date.getDate();
      let month = date.getMonth();
      let year = date.getYear();
      const displayDate = day + "/" + ++month + "/" + (year - 100);
      return displayDate;
    } else {
      return null;
    }
  };

  getCurrentDate = () => {
    let today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear() - 2000;
    today = day + "-" + month + "-" + year;
    return today;
  };

  render() {
    // this.getCurrentDate(); //<-find out why this is here
    nameStyle = this.state.nameValidated
      ? styles.nameInputWrapper
      : styles.nameUnvalidatedWrapper;

    typeStyle = this.state.typeValidated
      ? styles.typeQuestionRow
      : styles.unvalidatedTypeQuestionRow;

    useStyle = this.state.useValidated
      ? styles.useQuestionRow
      : styles.unvalidatedUseQuestionRow;

    stampStyle = this.state.stampValidated
      ? styles.lastChanged
      : styles.unvalidatedLastChanged;

    return (
      <View style={styles.parent}>
        {/* <View style={styles.nameInputWrapper}> */}
        <View style={nameStyle}>
          <TextInput
            placeholder="Name (eg. Stratocaster)"
            style={styles.nameInput}
            value={this.state.name}
            onChangeText={this.handleNameChange}
          />
        </View>
        <View style={typeStyle}>
          <Text style={styles.text}>What type of guitar is this?</Text>
        </View>
        <InstrumentType
          type={this.state.type}
          handleTypeChange={this.handleTypeChange}
        />
        <View style={useStyle}>
          <Text style={styles.text}>How often do you play this guitar?</Text>
        </View>
        <InstrumentUse
          use={this.state.use}
          handleUseChange={this.handleUseChange}
        />
        <View style={stampStyle}>
          <Text style={styles.text}>Strings last changed</Text>
          <DatePicker
            style={styles.datePickerBtn}
            date={this.getFormattedDate()}
            mode="date"
            placeholder="DD-MM-YY"
            format="DD-MM-YYYY"
            minDate="01-01-14"
            maxDate={this.getCurrentDate()}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            onDateChange={date => {
              date = date.split("-");
              let timestamp = date[1] + "/" + date[0] + "/" + date[2];
              timestamp = new Date(timestamp).getTime();
              this.setState({ timestamp });
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
            this.handleSubmit();
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
