/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  Dimensions,
  FlatList
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const width = Dimensions.get('screen').width;
const fotos = [
  {id: 1, usuario: 'rafael'},
  {id: 2, usuario: 'alberto'},
  {id: 3, usuario: 'vitor'}
];
const App: () => React$Node = () => {
  return (
    <FlatList style={{marginTop: 20}}
      data={fotos}
      keyExtractor={item => String(item.id)}
      renderItem={ ({item}) => 
        <View>
          <Text>{item.usuario}</Text>
          <Image source={require('./resources/img/logo.png')} style={{width:width, height:width}} />
        </View>
      }
    />
  );
};


export default App;
