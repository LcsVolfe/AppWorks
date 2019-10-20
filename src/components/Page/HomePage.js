import React, { Component } from 'react';
import { View, ScrollView, Image, Button, StyleSheet, TextInput, SafeAreaView, PixelRatio, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import { Formik } from 'formik';
import DatePicker from 'react-native-datepicker';
import CheckBox from 'react-native-check-box';
import ImagePicker from 'react-native-image-picker';
import { TextInputMask } from 'react-native-masked-text';
import RNPickerSelect from 'react-native-picker-select';
import { Text } from 'react-native-elements';

import HeaderComponent from './HeaderComponent';


class HomePage extends Component {
    static navigationOptions = {
        drawerIcon: ({ tintColor }) => (
            <Icon name="home" style={{ fontSize: 24, color: tintColor }} />
        )
    }
    
    constructor() {
        super();
        //this.state = {}

    }   

    render() {
        return (
            <View style={styles.container}>
                <HeaderComponent navigation={this.props.navigation} />

                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>News Page</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
export default HomePage;
