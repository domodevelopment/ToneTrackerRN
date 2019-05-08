// import React, { Component } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableHighlight,
//   Switch,
//   Image,
//   Alert,
//   Button
// } from "react-native";
// import styles from "../styles/addStyles";
// import LinearGradient from "react-native-linear-gradient";
// import InstrumentType from "./InstrumentType";
// import InstrumentUse from "./InstrumentUse";
// import { connect } from "react-redux";
// import { addGuitar } from "../actions/actions";
// import uuidv1 from "uuid";
// import DatePicker from "react-native-datepicker";
// import colors from "../colors";
// import { HeaderBackButton } from "react-navigation";
// import Dialog from "react-native-dialog";
// import Toast, { DURATION } from "react-native-easy-toast";

// class Add extends Component {
//   static navigationOptions = ({ navigation }) => {
//     const { params = {} } = navigation.state;
//     return {
//       headerStyle: {
//         backgroundColor: colors.primary
//       },
//       headerLeft: <HeaderBackButton onPress={() => params.handleBack()} />
//     };
//   };

//   constructor(props) {
//     super(props);
//     this.state = {
//       newGuitar: {
//         key: uuidv1(),
//         name: "",
//         type: null,
//         use: null,
//         timestamp: null,
//         coated: false,
//         photo: null
//       },
//       nameValidated: true,
//       typeValidated: true,
//       useValidated: true,
//       stampValidated: true,
//       warningPopup: false
//     };
//   }

//   handleNameChange = event => {
//     this.setState({
//       ...this.state,
//       newGuitar: { ...this.state.newGuitar, name: event }
//     });
//   };

//   handleTypeChange = newType => {
//     this.setState({
//       ...this.state,
//       newGuitar: { ...this.state.newGuitar, type: newType }
//     });
//   };

//   handleUseChange = newUse => {
//     this.setState({
//       ...this.state,
//       newGuitar: { ...this.state.newGuitar, use: newUse }
//     });
//   };

//   handleSubmit = () => {
//     const regex = "[a-z|0-9]";
//     const { name, type, use, timestamp } = this.state.newGuitar;
//     //check that no details are missing
//     if (
//       name.match(regex) &&
//       type !== null &&
//       use !== null &&
//       timestamp !== null
//     ) {
//       this.props.addGuitar(this.state.newGuitar);
//       this.props.navigation.navigate("Home");
//     } else {
//       this.refs.toast.show("Fill in all details");
//       if (!name.match(regex)) {
//         this.setState({ ...this.state, nameValidated: false });
//         Alert.alert("", JSON.stringify(this.state));
//       } else {
//         this.setState({ ...this.state, nameValidated: true });
//       }
//       if (type === null) {
//         this.setState({ ...this.state, typeValidated: false });
//       } else {
//         this.setState({ ...this.state, typeValidated: true });
//       }
//       if (use === null) {
//         this.setState({ ...this.state, useValidated: false });
//       } else {
//         this.setState({ ...this.state, useValidated: true });
//       }
//       if (timestamp === null) {
//         this.setState({ ...this.state, stampValidated: false });
//       } else {
//         this.setState({ ...this.state, stampValidated: true });
//       }
//     }
//   };

//   onSwitchChanged = () => {
//     this.setState({
//       ...this.state,
//       newGuitar: {
//         ...this.state.newGuitar,
//         coated: !this.state.newGuitar.coated
//       }
//     });
//   };

//   getFormattedDate = () => {
//     const { timestamp } = this.state.newGuitar;
//     if (timestamp !== null) {
//       const date = new Date(timestamp);
//       const day = date.getDate();
//       let month = date.getMonth();
//       let year = date.getYear();
//       return day + "/" + ++month + "/" + (year - 100);
//     } else {
//       return null;
//     }
//   };

//   getCurrentDate = () => {
//     let today = new Date();
//     const day = String(today.getDate()).padStart(2, "0");
//     const month = String(today.getMonth() + 1).padStart(2, "0");
//     const year = today.getFullYear() - 2000;
//     today = day + "-" + month + "-" + year;
//     return today;
//   };

//   componentDidMount() {
//     const regex = "[a-z|0-9]";
//     this.props.navigation.setParams({
//       handleBack: () => {
//         if (
//           this.state.newGuitar.name.match(regex) ||
//           this.state.newGuitar.type !== null ||
//           this.state.newGuitar.use !== null ||
//           this.state.newGuitar.timestamp !== null ||
//           this.state.newGuitar.coated
//         ) {
//           this.setState({ ...this.state, warningPopup: true });
//         } else {
//           this.props.navigation.navigate("Home");
//         }
//       }
//     });
//   }

//   render() {
//     const {
//       newGuitar,
//       nameValidated,
//       stampValidated,
//       typeValidated,
//       useValidated,
//       warningPopup
//     } = this.state;

//     nameStyle = this.state.nameValidated
//       ? styles.nameInput
//       : styles.nameUnvalidatedInput;

//     stampStyle = stampValidated
//       ? styles.datePickerBtn
//       : styles.unvalidatedDatePickerBtn;

//     return (
//       <View style={styles.parent}>
//         <View style={styles.nameInputWrapper}>
//           <TextInput
//             placeholder="Name (eg. Stratocaster)"
//             style={nameStyle}
//             value={newGuitar.name}
//             onChangeText={this.handleNameChange}
//             maxLength={15}
//             autoFocus={true}
//           />
//         </View>
//         <View style={styles.questionRow}>
//           <Text style={styles.text}>What type of guitar is this?</Text>
//         </View>
//         <InstrumentType
//           type={newGuitar.type}
//           handleTypeChange={this.handleTypeChange}
//           validated={typeValidated}
//         />
//         <View style={styles.questionRow}>
//           <Text style={styles.text}>How often do you play this guitar?</Text>
//         </View>
//         <InstrumentUse
//           use={newGuitar.use}
//           handleUseChange={this.handleUseChange}
//           validated={useValidated}
//         />
//         <View style={styles.lastChanged}>
//           <Text style={styles.text}>Strings last changed</Text>
//           <DatePicker
//             style={stampStyle}
//             date={this.getFormattedDate()}
//             mode="date"
//             placeholder="DD-MM-YY"
//             format="DD-MM-YYYY"
//             minDate="01-01-14"
//             maxDate={this.getCurrentDate()}
//             confirmBtnText="Confirm"
//             cancelBtnText="Cancel"
//             onDateChange={date => {
//               date = date.split("-");
//               let timestamp = date[1] + "/" + date[0] + "/" + date[2];
//               timestamp = new Date(timestamp).getTime();
//               this.setState({
//                 ...this.state,
//                 newGuitar: { ...newGuitar, timestamp }
//               });
//             }}
//           />
//         </View>
//         <View style={styles.coated}>
//           <Text style={styles.text}>This guitar has coated strings</Text>
//           <Switch
//             value={newGuitar.coated}
//             onValueChange={() => this.onSwitchChanged()}
//           />
//         </View>
//         <TouchableHighlight
//           style={styles.submit}
//           onPress={() => {
//             this.handleSubmit();
//           }}
//         >
//           <LinearGradient
//             colors={[colors.light, colors.primary, colors.dark]}
//             style={styles.gradient}
//           >
//             <Text style={styles.btnText}>Submit</Text>
//           </LinearGradient>
//         </TouchableHighlight>
//         <View>
//           <Dialog.Container visible={warningPopup}>
//             <Dialog.Title>Warning</Dialog.Title>
//             <Dialog.Description>
//               You have unsaved changes. Are you sure you want to leave?
//             </Dialog.Description>
//             <Dialog.Button
//               label="Leave"
//               onPress={() => {
//                 this.setState({ ...this.state, warningPopup: false });
//                 this.props.navigation.navigate("Home");
//               }}
//             />
//             <Dialog.Button
//               label="Stay Here"
//               onPress={() => {
//                 this.setState({ ...this.state, warningPopup: false });
//               }}
//             />
//           </Dialog.Container>
//         </View>
//         <Toast ref="toast" />
//       </View>
//     );
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     addGuitar: guitar => {
//       dispatch(addGuitar(guitar));
//     }
//   };
// };

// export default connect(
//   null,
//   mapDispatchToProps
// )(Add);

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
import Toast, { DURATION } from "react-native-easy-toast";

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
      newGuitar: {
        key: uuidv1(),
        name: "",
        type: null,
        use: null,
        timestamp: null,
        coated: false,
        photo: null
      },
      nameValidated: true,
      typeValidated: true,
      useValidated: true,
      stampValidated: true,
      warningPopup: false
    };
  }

  handleNameChange = event => {
    this.setState({ newGuitar: { ...this.state.newGuitar, name: event } });
  };

  handleTypeChange = newType => {
    this.setState({ newGuitar: { ...this.state.newGuitar, type: newType } });
  };

  handleUseChange = newUse => {
    this.setState({ newGuitar: { ...this.state.newGuitar, use: newUse } });
  };

  handleSubmit = () => {
    const regex = "[a-z|0-9]";
    const { name, type, use, timestamp } = this.state.newGuitar;
    //check that no details are missing
    if (
      name.match(regex) &&
      type !== null &&
      use !== null &&
      timestamp !== null
    ) {
      this.props.addGuitar(this.state.newGuitar);
      this.props.navigation.navigate("Home");
    } else {
      this.refs.toast.show("Fill in all details");
      if (!name.match(regex)) {
        this.setState({ nameValidated: false });
      } else {
        this.setState({ nameValidated: true });
      }
      if (type === null) {
        this.setState({ typeValidated: false });
      } else {
        this.setState({ typeValidated: true });
      }
      if (use === null) {
        this.setState({ useValidated: false });
      } else {
        this.setState({ useValidated: true });
      }
      if (timestamp === null) {
        this.setState({ stampValidated: false });
      } else {
        this.setState({ stampValidated: true });
      }
    }
  };

  onSwitchChanged = () => {
    this.setState({
      newGuitar: {
        ...this.state.newGuitar,
        coated: !this.state.newGuitar.coated
      }
    });
  };

  getFormattedDate = () => {
    const { timestamp } = this.state.newGuitar;
    if (timestamp !== null) {
      const date = new Date(timestamp);
      const day = date.getDate();
      let month = date.getMonth();
      let year = date.getYear();
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

  componentDidMount() {
    const regex = "[a-z|0-9]";
    this.props.navigation.setParams({
      handleBack: () => {
        if (
          this.state.newGuitar.name.match(regex) !== null ||
          this.state.newGuitar.type !== null ||
          this.state.newGuitar.use !== null ||
          this.state.newGuitar.timestamp !== null ||
          this.state.newGuitar.coated
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

    stampStyle = this.state.stampValidated
      ? styles.datePickerBtn
      : styles.unvalidatedDatePickerBtn;

    return (
      <View style={styles.parent}>
        <View style={styles.nameInputWrapper}>
          <TextInput
            placeholder="Name (eg. Stratocaster)"
            style={nameStyle}
            value={this.state.newGuitar.name}
            onChangeText={this.handleNameChange}
            maxLength={15}
            autoFocus={true}
          />
        </View>
        <View style={styles.questionRow}>
          <Text style={styles.text}>What type of guitar is this?</Text>
        </View>
        <InstrumentType
          type={this.state.newGuitar.type}
          handleTypeChange={this.handleTypeChange}
          validated={this.state.typeValidated}
        />
        <View style={styles.questionRow}>
          <Text style={styles.text}>How often do you play this guitar?</Text>
        </View>
        <InstrumentUse
          use={this.state.newGuitar.use}
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
              this.setState({
                newGuitar: { ...this.state.newGuitar, timestamp }
              });
            }}
          />
        </View>
        <View style={styles.coated}>
          <Text style={styles.text}>This guitar has coated strings</Text>
          <Switch
            value={this.state.newGuitar.coated}
            onValueChange={() => this.onSwitchChanged()}
          />
        </View>
        <View style={styles.submitWrapper}>
          <TouchableHighlight
            style={styles.submit}
            onPress={() => {
              this.handleSubmit();
            }}
            underlayColor={colors.light}
          >
            <LinearGradient
              colors={[colors.light, colors.primary, colors.dark]}
              style={styles.gradient}
            >
              <Text style={styles.btnText}>Submit</Text>
            </LinearGradient>
          </TouchableHighlight>
        </View>
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
