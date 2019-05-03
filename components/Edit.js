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
import styles from "../styles/editStyles";
import LinearGradient from "react-native-linear-gradient";
import InstrumentType from "./InstrumentType";
import InstrumentUse from "./InstrumentUse";
import electricImg from "../images/electric_guitar.png";
import { connect } from "react-redux";
import { editGuitar } from "../actions/actions";
import DatePicker from "react-native-datepicker";

function getGuitar(props) {
  return props.guitars.find(x => x.key === props.selectedForEditing);
}

class Edit extends Component {
  constructor(props) {
    super(props);
    const guitarToEdit = getGuitar(this.props);
    this.state = {
      key: guitarToEdit.key,
      name: guitarToEdit.name,
      type: guitarToEdit.type,
      use: guitarToEdit.use,
      timestamp: guitarToEdit.timestamp,
      coated: guitarToEdit.coated
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
    return (
      <View style={styles.parent}>
        <View style={styles.nameInputWrapper}>
          <Text style={styles.text}>{this.state.name}</Text>
        </View>
        <Image
          source={electricImg}
          style={styles.profileImg}
          resizeMode="contain"
        />
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
          <DatePicker
            style={styles.datePickerBtn}
            date={this.getFormattedDate()}
            mode="date"
            format="DD-MM-YY"
            minDate="01-01-14"
            maxDate={this.getCurrentDate()}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            onDateChange={date => {
              date = date.split("-");
              const timestamp = date[1] + "/" + date[0] + "/" + date[2];
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
            this.props.editGuitar(this.state);
            this.props.navigation.navigate("Home");
          }}
        >
          <LinearGradient
            colors={["#4c669f", "#3b5998", "#192f6a"]}
            style={styles.gradient}
          >
            <Text style={styles.text}>Update</Text>
          </LinearGradient>
        </TouchableHighlight>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    guitars: state.guitars,
    selectedForEditing: state.selectedForEditing
  };
};

const mapDispatchToProps = dispatch => {
  return {
    editGuitar: guitar => {
      dispatch(editGuitar(guitar));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Edit);
