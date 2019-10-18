import React, { Component, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native';
import { Header, SearchBar } from 'react-native-elements';
import Hamburger from 'react-native-hamburger';
import { Left, Right, Icon } from 'native-base';

export default class HeaderComponent extends Component {


    static navigationOptions = {
        drawerIcon: ({ tintColor }) => (
            <Icon name="settings" style={{ fontSize: 24, color: tintColor }} />
        )
    }

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
        const searchContainer =
            <SearchBar
                placeholder="Type Here..."
                onChangeText={this.updateSearch}
                value={search}
                containerStyle={{backgroundColor: '#00a109'}}
                inputContainerStyle={{backgroundColor: '#b9e5bb'}}
                //showLoading
                //platform
            />;      
        return (
            <View style={{flex: 1}}>
                <ImageBackground source={require('../../resources/img/bg_header.png')} style={styles.bg_img}>
                    <View style={styles.container}>
                        <Icon name="menu" onPress={() => this.props.navigation.openDrawer()} />
                        <Text style={styles.text}>O Me Works conecta você aos melhores prestadores de serviço da sua região</Text>
                        <Icon name="search" onPress={() => {
                            this.setState({searchView: !this.state.searchView});
                        }} />
                    </View>
                </ImageBackground>
                {this.state.searchView ? searchContainer : false}

            </View>
        );
    }
}

const styles = StyleSheet.create({
    bg_img: {
        width: '100%', 
        height: 'auto'
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10
    },
    text: {
        width: '50%',
        textAlign: 'center'
    }
});


