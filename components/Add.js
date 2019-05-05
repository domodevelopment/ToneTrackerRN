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
import colors from "../colors";
import { HeaderBackButton } from "react-navigation";
import Dialog from "react-native-dialog";

class Add extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerStyle: {
        backgroundColor: colors.primary
      },
      headerLeft: <HeaderBackButton onPress={() => params.handleBack()} />
    };
  };

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
      stampValidated: true,
      warningPopup: false
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
      if (
        //TODO replace with regex
        this.state.name === null ||
        this.state.name === "" ||
        this.state.name === " "
      ) {
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
      // const displayDate = day + "/" + ++month + "/" + (year - 100);
      // return displayDate;
      return day + "/" + ++month + "/" + (year - 100);
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

  // showWarning() {
  //   this.setState({
  //     warningPopup: true
  //   });
  // }

  componentDidMount() {
    this.props.navigation.setParams({
      // handleBack: this.showWarning
      handleBack: () => {
        if (
          this.state.name !== null ||
          this.state.type !== null ||
          this.state.use !== null ||
          this.state.timestamp !== null ||
          this.state.coated
        ) {
          this.setState({ warningPopup: true });
        } else {
          this.props.navigation.navigate("Home");
        }
        // Alert.alert(String(this.state.warningPopup));
      }
    });
  }

  render() {
    nameStyle = this.state.nameValidated
      ? styles.nameInput
      : styles.nameUnvalidatedInput;

    stampStyle = this.state.stampValidated
      ? styles.datePickerBtn
      : styles.unvalidatedDatePickerBtn;

    return (
      <View style={styles.parent}>
        <View style={styles.nameInputWrapper}>
          <TextInput
            placeholder="Name (eg. Stratocaster)"
            style={nameStyle}
            value={this.state.name}
            onChangeText={this.handleNameChange}
            maxLength={15}
            autoFocus={true}
          />
        </View>
        <View style={styles.questionRow}>
          <Text style={styles.text}>What type of guitar is this?</Text>
        </View>
        <InstrumentType
          type={this.state.type}
          handleTypeChange={this.handleTypeChange}
          validated={this.state.typeValidated}
        />
        <View style={styles.questionRow}>
          <Text style={styles.text}>How often do you play this guitar?</Text>
        </View>
        <InstrumentUse
          use={this.state.use}
          handleUseChange={this.handleUseChange}
          validated={this.state.useValidated}
        />
        <View style={styles.lastChanged}>
          <Text style={styles.text}>Strings last changed</Text>
          <DatePicker
            style={stampStyle}
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
        <View>
          <Dialog.Container visible={this.state.warningPopup}>
            <Dialog.Title>Warning</Dialog.Title>
            <Dialog.Description>
              You have unsaved changes. Are you sure you want to leave?
            </Dialog.Description>
            <Dialog.Button
              label="Leave"
              onPress={() => {
                // this.setState({ restringPopup: false });
                // this.props.item.timestamp = new Date().getTime();
                // this.props.editGuitar(this.props.item);
                this.setState({ warningPopup: false });
                this.props.navigation.navigate("Home");
              }}
            />
            <Dialog.Button
              label="Stay Here"
              onPress={() => {
                // this.props.selectedGuitar(this.props.item.key);
                // this.props.showDatePicker(true);
                this.setState({ warningPopup: false });
              }}
            />
          </Dialog.Container>
        </View>
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
