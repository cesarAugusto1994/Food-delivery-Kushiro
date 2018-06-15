import React from "react";
import {
  View,
  Text,
  Picker,
  TouchableOpacity,
  Button,
  StyleSheet,
  Alert
} from "react-native";
import { Constants } from "expo";
import Icon from "react-native-vector-icons/FontAwesome";
import RemoveIcon from "../components/RemoveIcon";

// make an action creators, listen for user confirmation, add user order obj with { menu: [], total: }

const QUANTITY_LIST = [1, 2, 3, 4];

class OrderDetailScreen extends React.Component {
  static navigationOptions = {
    title: "Order"
  };

  constructor(props) {
    super(props);

    this.state = {
      selectedItem: this.props.navigation.state.params.menu[0].name,
      qty: 1,
      listItem: [],
      totalCost: 0
    };
  }

  _calcTotal = () => {
    // 2 arrays of objects
    // the first array contains only obj with properties: name, price
    // the other array contains only obj with properties: name, qty
    // => merge 2 arrays into one that contains objs with properties: name, price, qty

    const menu = this.props.navigation.state.params.menu;

    if (this.state.listItem.length === 0) {
      return 0;
    }

    const newList = this.state.listItem.map(item => {
      let result;

      menu.forEach(el => {
        if (el.name === item.name) {
          result = Object.assign(el, item);
        }
      });

      return result;
    });

    return newList.reduce((acc, item) => {
      return acc + item.price * item.qty;
    }, 0);
  };

  _updateList = () => {
    if (this.state.listItem.length > 3) {
      return Alert.alert(
        "Not available",
        "You can not order more than 3 items."
      );
    }
    // generate random ID between 1-1000 (both inclusive) for each item in the order list
    const randomID = Math.floor(Math.random() * (1000 - 1 + 1)) + 1;

    const { selectedItem: name, qty } = this.state;

    this.setState({
      listItem: [...this.state.listItem, { name, qty, id: randomID }]
    });
  };

  _removeItem = item => {
    this.setState({
      listItem: this.state.listItem.filter(i => i.id !== item.id)
    });
  };

  _renderList = () => {
    return this.state.listItem.map((item, index) => {
      return (
        <Text style={styles.items} key={index}>
          {`${item.name} * ${item.qty}`}
          {/* this seems unnecessary but mostly to practice using reusable component */}
          <RemoveIcon size={24} onPress={() => this._removeItem(item)} />
        </Text>
      );
    });
  };

  _navigateToPayment = () => {
    if (this.state.listItem.length === 0) {
      return Alert.alert(
        "Not available",
        "U sure don't want to order anything??"
      );
    } else {
      return Alert.alert("Confirm", "Are you sure?", [
        {
          text: "Yes",
          onPress: () =>
            this.props.navigation.navigate("Checkout", {
              orderList: { ...this.state.listItem },
              totalCost: this._calcTotal(),
              restaurant: this.props.navigation.state.params
            })
        },
        { text: "No", onPress: () => false }
      ]);
    }

    return false;
  };

  render() {
    const { params } = this.props.navigation.state;

    if (params) {
      const { name, location: { formattedAddress }, menu } = params;

      const listItem = menu.map((item, index) => {
        return <Picker.Item key={index} value={item.name} label={item.name} />;
      });

      const listQuantity = QUANTITY_LIST.map((num, index) => {
        return <Picker.Item key={index} value={num} label={num.toString()} />;
      });

      return (
        <View style={styles.container}>
          <Text style={styles.paragraph}>{`Restaurant: ${name}`}</Text>
          <View style={styles.pickers}>
            <Picker
              style={{ width: 100 }}
              selectedValue={this.state.selectedItem}
              onValueChange={selectedItem => this.setState({ selectedItem })}
            >
              {listItem}
            </Picker>
            <Picker
              style={{ width: 80 }}
              selectedValue={this.state.qty}
              onValueChange={qty => this.setState({ qty })}
            >
              {listQuantity}
            </Picker>
          </View>
          <TouchableOpacity style={styles.button} onPress={this._updateList}>
            <Text>Add item</Text>
          </TouchableOpacity>
          {this._renderList()}
          <Text
            style={styles.paragraph}
          >{`Total cost: ${this._calcTotal()}￥`}</Text>
          <TouchableOpacity
            style={styles.buttonToPayment}
            onPress={() => this._navigateToPayment()}
          >
            <Text>Proceed to Payment</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View>
          <Text>Something wrong!!</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1"
  },
  paragraph: {
    margin: 12,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#34495e"
  },
  pickers: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  items: {
    margin: 12,
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    color: "#34495e"
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
  buttonToPayment: {
    position: "absolute",
    bottom: 10,
    backgroundColor: "#DDDDDD",
    padding: 10
  }
});

export default OrderDetailScreen;
