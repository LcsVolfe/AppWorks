import React from 'react'
import { Platform, StyleSheet, Text, View, SafeAreaView, ScrollView, Dimensions, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { DrawerNavigatorItems} from 'react-navigation-drawer';

export default class DrawerNameMenu extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            user: ''
        }
    }
    componentDidMount() {

        AsyncStorage.getItem('usuario').then(value =>{
            this.setState({user: value})
        });
    }

    render() {
        

        return (<Text>{this.state.user}</Text>)
    }

}

