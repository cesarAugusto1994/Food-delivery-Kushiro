import React from 'react';
import {
  View,
  Text,
  Picker,
  TouchableOpacity,
  Button,
  StyleSheet
} from 'react-native';
import { Constants } from 'expo';

const QUANTITY_LIST = [1,2,3,4];

export default class OrderDetailScreen extends React.Component {
  static navigationOptions = {
    title: 'Order'
  }

  constructor(props) {
    super(props);

    this.state = {
      selectedItem: this.props.navigation.state.params.menu[0].name,
      qty: QUANTITY_LIST[0],
      listItem: []
    }
  }

  _updateList = () => {
    const { selectedItem: name, qty } = this.state;

    this.setState({
      listItem: [...this.state.listItem, { name, qty }]
    });
  }

  _renderList = () => {
    return this.state.listItem.map((item, index) => {
      return <Text style={styles.items} key={index}>{`${item.name} * ${item.qty}`}</Text>
    });
  }

  render() {
    const { params } = this.props.navigation.state;

    if (params) {
      const { name, location: { formattedAddress }, menu } = params;

      const listItem = menu.map(item => {
        return <Picker.Item key={item.name} value={item.name} label={item.name} />
      });

      const listQuantity = QUANTITY_LIST.map((num, index) => {
        return <Picker.Item key={index} value={num} label={num.toString()} />
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
              onValueChange={(qty) => this.setState({ qty })}
            >
              {listQuantity}
            </Picker>
          </View>
          <TouchableOpacity
           style={styles.button}
           onPress={this._updateList}
          >
             <Text>Add item</Text>
          </TouchableOpacity>
          {this._renderList()}
        </View>
      );
    } else {
      return (
        <View>
          <Text>Something wrong!!</Text>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 12,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
  pickers: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  items: {
    margin: 12,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10
  }
});
