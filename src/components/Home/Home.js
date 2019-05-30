import React, { Component } from "react";
import {
  View,
  FlatList,
  TouchableHighlight,
  Alert,
  SafeAreaView
} from "react-native";
import Options from "../Options";
import { connect } from "react-redux";
import styles from "./styles";
import ListItem from "../ListItem";
import AsyncStorage from "@react-native-community/async-storage";
import constants from "../../constants";
import {
  showNotifications,
  initializeGuitars,
  initializeTheme
} from "../../actions";
import colors from "../../colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import appConfig from "../../../app.json";
import NotifService from "../../NotifService";

class Home extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("Title", "Tone Tracker"),
      headerTitleStyle: {
        color: colors.primary
      },
      headerStyle: {
        backgroundColor: colors.darkDark
      },
      headerRight: <Options navigation={navigation} />
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      initialized: false,
      hideFab: false,
      senderId: appConfig.senderID
    };
    this.notif = new NotifService();
  }
  handlePerm(perms) {
    Alert.alert("Permissions", JSON.stringify(perms));
  }
  componentWillMount() {
    if (!this.state.initialized) {
      this.getPersistedData();
      this.setState({ initialized: true });
    }
  }
  getPersistedData = async () => {
    //getting theme from async storage
    // let theme = await AsyncStorage.getItem(constants.persistedTheme);
    // if (theme === null) {
    //   theme = "normal";
    // } else {
    //   theme = theme === "normal" ? "normal" : "nightShade";
    // }
    // this.props.initializeTheme(theme);
    //getting notification state from async storage
    let notifications = await AsyncStorage.getItem(
      constants.persistedNotifications
    );
    if (notifications === null) {
      notifications = true;
    } else {
      notifications = notifications === "true" ? true : false;
    }
    if (this.props.notifications !== notifications) {
      this.props.showNotifications(notifications);
    }
    //getting guitars from async storage
    let guitars = await AsyncStorage.getItem(constants.persistedGuitars);
    this.props.initializeGuitars(JSON.parse(guitars));
  };
  //the floating action button
  fab = scrolling => {
    //momentarily hide the fab on scroll. this gives the user a chance to click on elements which may be hidden beneath it
    return scrolling ? null : (
      <TouchableHighlight
        onPress={() => this.props.navigation.navigate("Add")}
        style={styles.fab}
        underlayColor={colors.light}
      >
        <Icon name="add" color={colors.white} size={45} />
      </TouchableHighlight>
    );
  };
  render() {
    return (
      <View style={styles.parent}>
        <SafeAreaView>
          <FlatList
            data={this.props.guitars}
            renderItem={({ item }) => (
              <ListItem item={item} navigation={this.props.navigation} />
            )}
            onScrollBeginDrag={() => {
              this.setState({ hideFab: true });
            }}
            onScrollEndDrag={() => {
              setTimeout(() => {
                this.setState({ hideFab: false });
              }, 1000);
            }}
          />
          {this.fab(this.state.hideFab)}
        </SafeAreaView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    guitars: state.guitars,
    notifications: state.notifications,
    theme: state.theme
  };
};

const mapDispatchToProps = dispatch => {
  return {
    showNotifications: show => {
      dispatch(showNotifications(show));
    },
    initializeGuitars: guitars => {
      dispatch(initializeGuitars(guitars));
    },
    initializeTheme: theme => {
      dispatch(initializeTheme(theme));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
