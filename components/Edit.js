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
import ImagePicker from "react-native-image-picker";

function getGuitar(props) {
  return props.guitars.find(x => x.key === props.selectedForEditing);
}

const options = {
  customButtons: [{ name: "delete", title: "Remove photo..." }],
  storageOptions: {
    skipBackup: true,
    path: "images"
  }
};

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
    const originalGuitar = getGuitar(this.props);
    this.state = {
      originalGuitar,
      editedGuitar: {
        key: originalGuitar.key,
        name: originalGuitar.name,
        type: originalGuitar.type,
        use: originalGuitar.use,
        timestamp: originalGuitar.timestamp,
        coated: originalGuitar.coated,
        photo: originalGuitar.photo
      },
      editingName: false,
      warningPopup: false,
      nameValidated: true
    };
  }

  handleNameChange = event => {
    this.setState({
      editedGuitar: { ...this.state.editedGuitar, name: event }
    });
  };

  handleTypeChange = newType => {
    this.setState({
      editedGuitar: { ...this.state.editedGuitar, type: newType }
    });
  };

  handleUseChange = newUse => {
    this.setState({
      editedGuitar: { ...this.state.editedGuitar, use: newUse }
    });
  };

  onSwitchChanged = () => {
    this.setState({
      editedGuitar: { ...this.state.editedGuitar, coated: !this.state.coated }
    });
  };

  getFormattedDate = () => {
    const { timestamp } = this.state.editedGuitar;
    if (timestamp !== null) {
      const date = new Date(timestamp);
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
    let { type, photo } = this.state.editedGuitar;
    //No photo exists. Use a  default image
    if (photo === null) {
      switch (type) {
        case constants.electric:
          return electricGuitarImg;
        case constants.bass:
          return bassImg;
        case constants.acoustic:
          return acousticImg;
      }
    }
    //Return the photo
    return { uri: photo };
  };

  name = editing => {
    return editing ? (
      <TextInput
        style={nameStyle}
        value={this.state.editedGuitar.name}
        onChangeText={this.handleNameChange}
        maxLength={15}
        autoFocus={true}
        onBlur={() => {
          const regex = "[a-z|0-9]";
          if (this.state.editedGuitar.name.match(regex)) {
            this.setState({ editingName: false });
          } else {
            this.setState({ nameValidated: false });
            this.refs.toast.show("Name cannot be empty");
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
        {this.state.editedGuitar.name}
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
          this.state.editedGuitar.name !== this.state.originalGuitar.name ||
          this.state.editedGuitar.type !== this.state.originalGuitar.type ||
          this.state.editedGuitar.use !== this.state.originalGuitar.use ||
          this.state.editedGuitar.timestamp !==
            this.state.originalGuitar.timestamp ||
          this.state.editedGuitar.coated !== this.state.originalGuitar.coated ||
          this.state.editedGuitar.photo !== this.state.originalGuitar.photo //<-TODO reduce all this. Just compare old guitar to new guitar
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
        <TouchableHighlight
          style={styles.profileImg}
          onPress={() => {
            const optionToRemove =
              this.state.editedGuitar.photo === null ? null : options;
            ImagePicker.showImagePicker(optionToRemove, response => {
              if (response.customButton) {
                this.setState({
                  editedGuitar: { ...this.state.editedGuitar, photo: null }
                });
              } else if (!response.didCancel) {
                this.setState({
                  editedGuitar: {
                    ...this.state.editedGuitar,
                    photo: response.uri
                  }
                });
              }
            });
          }}
        >
          <Image
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 50,
              transform: [
                {
                  rotate:
                    this.state.editedGuitar.photo === null ? "0deg" : "90deg"
                }
              ]
            }}
            source={this.instrumentImage()}
            resizeMode="cover"
          />
        </TouchableHighlight>
        <View style={styles.questionRow}>
          <Text style={styles.text}>What type of guitar is this?</Text>
        </View>
        <InstrumentType
          type={this.state.editedGuitar.type}
          handleTypeChange={this.handleTypeChange}
          validated={true}
        />
        <View style={styles.questionRow}>
          <Text style={styles.text}>How often do you play this guitar?</Text>
        </View>
        <InstrumentUse
          use={this.state.editedGuitar.use}
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
              this.setState({
                editedGuitar: { ...this.state.editedGuitar, timestamp }
              });
            }}
          />
        </View>
        <View style={styles.coated}>
          <Text style={styles.text}>This guitar has coated strings</Text>
          <Switch
            value={this.state.editedGuitar.coated}
            onValueChange={() => this.onSwitchChanged()}
          />
        </View>
        <TouchableHighlight
          style={styles.submit}
          onPress={() => {
            const regex = "[a-z|0-9]";
            if (this.state.editedGuitar.name.match(regex)) {
              if (
                this.state.originalGuitar.name ===
                  this.state.editedGuitar.name &&
                this.state.originalGuitar.type ===
                  this.state.editedGuitar.type &&
                this.state.originalGuitar.use === this.state.editedGuitar.use &&
                this.state.originalGuitar.timestamp ===
                  this.state.editedGuitar.timestamp &&
                this.state.originalGuitar.coated ===
                  this.state.editedGuitar.coated &&
                this.state.originalGuitar.photo ===
                  this.state.editedGuitar.photo
              ) {
                this.props.navigation.navigate("Home");
                this.refs.toast.show("No changes made");
              } else {
                this.props.editGuitar(this.state.editedGuitar);
                this.props.navigation.navigate("Home");
                this.refs.toast.show("Changes saved");
              }
              // this.props.editGuitar(this.state);//<-TODO filter out the unneeded stuff
              // this.props.navigation.navigate("Home");
              // this.refs.toast.show("Changes saved");
            } else {
              this.setState({ nameValidated: false });
              this.refs.toast.show("Name cannot be empty");
            }
          }}
        >
          <LinearGradient
            colors={[colors.light, colors.primary, colors.dark]}
            style={styles.gradient}
          >
            <Text style={styles.btnText}>Update</Text>
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
        {/* <View>
          <Dialog.Container visible={this.state.photoPopup}>
            <Dialog.Title>Edit Photo</Dialog.Title>
            <Dialog.Description>
              What do you want to do with the photo?
            </Dialog.Description>
            <Dialog.Button
              label="Change"
              onPress={() => {
                this.setState({ photoPopup: false });
                this.props.navigation.navigate("RemoveMe");
              }}
            />
            <Dialog.Button
              label="Remove"
              onPress={() => {
                this.setState({ photo: null, photoPopup: false });
              }}
            />
            <Dialog.Button
              label="Cancel"
              onPress={() => {
                this.setState({ photoPopup: false });
              }}
            />
          </Dialog.Container>
        </View> */}
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
