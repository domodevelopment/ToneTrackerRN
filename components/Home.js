import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  TouchableHighlight,
  Alert
} from "react-native";
import Options from "./Options";
import { connect } from "react-redux";
import styles from "../styles/homeStyles";
import ListItem from "./ListItem";
import AsyncStorage from "@react-native-community/async-storage";
import constants from "../constants";
import { showNotifications, initializeGuitars } from "../actions/actions";
import colors from "../colors";
import Icon from "react-native-vector-icons/MaterialIcons";

class Home extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      //Heading/title of the header
      // title: navigation.getParam("Title", "Popup Menu Example"),
      //Heading style
      headerStyle: {
        // backgroundColor: navigation.getParam("BackgroundColor", "red")
        backgroundColor: colors.primary
      },
      // //Heading text color
      // headerTintColor: navigation.getParam("HeaderTintColor", "#000"),
      //Heading Menu in Right Side
      headerRight: <Options navigation={navigation} />
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      initialized: false,
      hideFab: false
    };
  }

  componentWillMount() {
    if (!this.state.initialized) {
      this.getPersistedData();
      this.setState({ initialized: true });
    }
  }

  getPersistedData = async () => {
    /**
     * getting notification state from async storage
     */
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
    /**
     * getting guitars from async storage
     */
    let guitars = await AsyncStorage.getItem(constants.persistedGuitars);
    this.props.initializeGuitars(JSON.parse(guitars));
  };

  fab = scrolling => {
    return scrolling ? null : (
      <TouchableHighlight
        onPress={() => this.props.navigation.navigate("Add")}
        style={styles.fab}
      >
        <Icon name="add" color={"#fff"} size={45} />
      </TouchableHighlight>
    );
  };

  render() {
    return (
      <View style={styles.parent}>
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
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    guitars: state.guitars,
    notifications: state.notifications
  };
};

const mapDispatchToProps = dispatch => {
  return {
    showNotifications: show => {
      dispatch(showNotifications(show));
    },
    initializeGuitars: guitars => {
      dispatch(initializeGuitars(guitars));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
