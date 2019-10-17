import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, SafeAreaView, ScrollView, Dimensions, Image } from 'react-native';
import { SharedElement, SharedElementRenderer } from 'react-native-motion';


export default class Main extends Component {
  render() {
    return (
      <SharedElementRenderer>
        <ListPage />
      </SharedElementRenderer>
    );
  }
}


class ListPage extends Component {
  render() {
    return (
      <SharedElement id="source">
        <View>
          <Text>xxxxxxxxxxxx</Text>
          <Text>xxxxxxxxxxxx</Text>
          <Text>xxxxxxxxxxxx</Text>
          <Text>xxxxxxxxxxxx</Text>
          <Text>xxxxxxxxxxxx</Text>
        </View>
      </SharedElement>
    );
  }
}

class DetailPage extends Component {
  render() {
    return (
      <SharedElement sourceId="source">
        <View>
          <Text>ggggggggg</Text>
        </View>
      </SharedElement>
    );
  }
}