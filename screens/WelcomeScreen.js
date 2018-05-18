import React, { Component } from 'react';
import { View, Text } from 'react-native';

import Slide from '../components/Slide';

const SLIDE_DATA = [
  { text: 'First slide', color: '#03A9F4' },
  { text: 'Second slide', color: '#009688' },
  { text: 'Third slide', color: '#03A9F4' }
]

export default class WelcomeScreen extends Component {
  onSlidesComplete = () => {
    this.props.navigation.navigate('Map');
  }

  render() {
    return (
      <Slide data={SLIDE_DATA} onComplete={this.onSlidesComplete} />
    );
  }
}
