import React, { Component, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native';
import { Header, SearchBar } from 'react-native-elements';
import Hamburger from 'react-native-hamburger';
import { Left, Right, Icon } from 'native-base';
import Component3 from '../Component3';
import HeaderComponent from '../HeaderComponent';

class SettingsPage extends Component {


    constructor(props) {
        super(props);
        this.state = {
            search: '',
            searchView: false
        }
    }

    updateSearch = search => {this.setState({ search })};

    render () {
        const { search } = this.state;
            
        return (
            <View style={{flex: 1}}>     
                
                <HeaderComponent/>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Settings Page</Text>
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

export default SettingsPage;
