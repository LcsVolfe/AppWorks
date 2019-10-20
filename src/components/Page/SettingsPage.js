import React, { Component, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native';
import { Left, Right, Icon } from 'native-base';
import HeaderComponent from './HeaderComponent';



class SettingsPage extends Component {


    static navigationOptions = {
        drawerIcon: ({ tintColor }) => (
            <Icon name="settings" style={{ fontSize: 24, color: tintColor }} />
        )
    }

    constructor(props) {
        super(props);
        this.state = {}
    }

    updateSearch = search => {this.setState({ search })};

    render () {   
        return (
            <View style={styles.container} >              
                <HeaderComponent navigation={this.props.navigation} />
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Setting Page</Text>
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
