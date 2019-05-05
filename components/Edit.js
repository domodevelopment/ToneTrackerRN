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
import electricGuitarImg from "../images/electric_guitar.png";
import bassImg from "../images/bass_guitar.png";
import acousticImg from "../images/acoustic_guitar.png";
import { connect } from "react-redux";
import { editGuitar, showDatePicker } from "../actions/actions";
import DatePicker from "react-native-datepicker";
import Delete from "./Delete";
import colors from "../colors";
import constants from "../constants";
import { HeaderBackButton } from "react-navigation";
import Dialog from "react-native-dialog";
import Toast, { DURATION } from "react-native-easy-toast";

function getGuitar(props) {
  return props.guitars.find(x => x.key === props.selectedForEditing);
}

class Edit extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerStyle: {
        backgroundColor: colors.primary
      },
      headerRight: <Delete navigation={navigation} />,
      headerLeft: <HeaderBackButton onPress={() => params.handleBack()} />
    };
  };

  constructor(props) {
    super(props);
    const guitarToEdit = getGuitar(this.props);
    this.state = {
      guitarToEdit,
      key: guitarToEdit.key,
      name: guitarToEdit.name,
      type: guitarToEdit.type,
      use: guitarToEdit.use,
      timestamp: guitarToEdit.timestamp,
      coated: guitarToEdit.coated,
      editingName: false,
      warningPopup: false,
      nameValidated: true
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

  instrumentImage = () => {
    let { type } = this.state;
    switch (type) {
      case constants.electric:
        return electricGuitarImg;
      case constants.bass:
        return bassImg;
      case constants.acoustic:
        return acousticImg;
    }
  };

  name = editing => {
    return editing ? (
      <TextInput
        style={nameStyle}
        value={this.state.name}
        onChangeText={this.handleNameChange}
        maxLength={15}
        autoFocus={true}
        onBlur={() => {
          const regex = "[a-z|0-9]";
          if (this.state.name.match(regex)) {
            this.setState({ editingName: false });
          } else {
            this.setState({ nameValidated: false });
            this.refs.toast.show("Name cannot be empty.");
          }
        }}
      />
    ) : (
      <Text
        style={styles.nameText}
        onPress={() => {
          this.setState({ editingName: true });
        }}
      >
        {this.state.name}
      </Text>
    );
  };

  componentDidMount() {
    if (this.props.changeAge) {
      this.datePicker.onPressDate();
      this.props.showDatePicker(false);
    }
    this.props.navigation.setParams({
      handleBack: () => {
        if (
          this.state.name !== this.state.guitarToEdit.name ||
          this.state.type !== this.state.guitarToEdit.type ||
          this.state.use !== this.state.guitarToEdit.use ||
          this.state.timestamp !== this.state.guitarToEdit.timestamp ||
          this.state.coated !== this.state.guitarToEdit.coated
        ) {
          this.setState({ warningPopup: true });
        } else {
          this.props.navigation.navigate("Home");
        }
      }
    });
  }

  render() {
    nameStyle = this.state.nameValidated
      ? styles.nameInput
      : styles.nameUnvalidatedInput;

    return (
      <View style={styles.parent}>
        <View style={styles.nameInputWrapper}>
          {this.name(this.state.editingName)}
        </View>
        <Image
          source={this.instrumentImage()}
          style={styles.profileImg}
          resizeMode="contain"
        />
        <View style={styles.questionRow}>
          <Text style={styles.text}>What type of guitar is this?</Text>
        </View>
        <InstrumentType
          type={this.state.type}
          handleTypeChange={this.handleTypeChange}
          validated={true}
        />
        <View style={styles.questionRow}>
          <Text style={styles.text}>How often do you play this guitar?</Text>
        </View>
        <InstrumentUse
          use={this.state.use}
          handleUseChange={this.handleUseChange}
          validated={true}
        />
        <View style={styles.lastChanged}>
          <Text style={styles.text}>Strings last changed</Text>
          <DatePicker
            ref={picker => {
              this.datePicker = picker;
            }}
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
            const regex = "[a-z|0-9]";
            if (this.state.name.match(regex)) {
              this.props.editGuitar(this.state);
              this.props.navigation.navigate("Home");
            } else {
              this.setState({ nameValidated: false });
              this.refs.toast.show("Name cannot be empty.");
            }
          }}
        >
          <LinearGradient
            colors={["#4c669f", "#3b5998", "#192f6a"]}
            style={styles.gradient}
          >
            <Text style={styles.text}>Update</Text>
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
                this.setState({ warningPopup: false });
                this.props.navigation.navigate("Home");
              }}
            />
            <Dialog.Button
              label="Stay Here"
              onPress={() => {
                this.setState({ warningPopup: false });
              }}
            />
          </Dialog.Container>
        </View>
        <Toast ref="toast" />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    guitars: state.guitars,
    selectedForEditing: state.selectedForEditing,
    changeAge: state.changeAge
  };
};

const mapDispatchToProps = dispatch => {
  return {
    editGuitar: guitar => {
      dispatch(editGuitar(guitar));
    },
    showDatePicker: val => {
      dispatch(showDatePicker(val));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Edit);
