import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class Slide extends Component {
  state = {
    total: this.props.data.length,
    index: 0
  }

  renderLastSlide(index) {
    if (index === this.props.data.length - 1) {
      return (
        <Button
          title="Start now!"
          buttonStyle={styles.buttonStyle}
          onPress={this.props.onComplete}
        />
      )
    }
  }

  renderSlides() {
    return this.props.data.map((slide, index) => {
      return (
        <View key={slide.text}
          style={[styles.slideStyle, { backgroundColor: slide.color }]}>
          <Text style={styles.slideText}>{slide.text}</Text>
          {this.renderLastSlide(index)}
        </View>
      )
    })
  }

  renderPagination = () => {
    if (this.state.total <= 1) {
      return null;
    }

    const ActiveDot = <View style={[styles.dot, styles.activeDot]} />,
          Dot = <View style={styles.dot} />;
    let dots = [];

    for (let key = 0; key < this.state.total; key++) {
      dots.push(key === this.state.index ? React.cloneElement(ActiveDot, { key }) : React.cloneElement(Dot, { key }));
    }

    return (
      <View style={[styles.pagination]}>
        {dots}
      </View>
    )
  }

  handleScroll = e => {
    const pos = e.nativeEvent.contentOffset.x;
    this.setState({ index: Math.floor(pos/SCREEN_WIDTH) });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          horizontal
          style={{ flex: 1 }}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onScroll={this.handleScroll}
          scrollEventThrottle={0}
        >
          {this.renderSlides()}
        </ScrollView>
        {this.renderPagination()}
      </View>
    )
  }
}

const styles = {
  slideStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH,
  },
  slideText: {
    fontSize: 30,
    color: 'white',
  },
  buttonStyle: {
    backgroundColor: '#2888D1',
    marginTop: 15,
  },
  dot: {
    backgroundColor: "rgba(0,0,0,.25)",
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3
  },
  activeDot: {
    backgroundColor: "#FFFFFF"
  },
  pagination: {
    position: "absolute",
    bottom: 110,
    left: 0,
    right: 0,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    backgroundColor: "transparent"
  }
}
