import React, { Component, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native';
import { Header, SearchBar } from 'react-native-elements';
import { Left, Right, Icon } from 'native-base';

export default class HeaderComponent extends Component {


    /*static navigationOptions = {
        drawerIcon: ({ tintColor }) => (
            <Icon name="settings" style={{ fontSize: 24, color: tintColor }} />
        )
    }*/

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
                <ImageBackground source={require('../../../resources/img/bg_header.png')} style={{width: '100%', height: 'auto'}}>
                    <Header
                        containerStyle={{
                            backgroundColor: 'transparent',
                            justifyContent: 'space-evenly',
                            height: 'auto',
                            paddingBottom: 30
                        }}
                        rightComponent={<Icon name="search" onPress={() => {
                            console.log(this.state.searchView);
                            this.setState({searchView: !this.state.searchView});
                        }} />}
                        centerComponent={{ text: 'O Me Works conecta você aos melhores prestadores de serviço da sua região', style: { color: '#fff', fontSize: 20 } }}
                        leftComponent={<Icon name="menu" onPress={() => {
                            //console.log(this.props.navigation.navigate)
                            this.props.navigation.openDrawer()
                        }} />}
                    />
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
        textAlign: 'center',
        color: 'white'
    }
});

