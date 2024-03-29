import React, { Component, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native';
import { Header, SearchBar } from 'react-native-elements';
import { Left, Right, Icon } from 'native-base';
import { withNavigation } from 'react-navigation'
import AsyncStorage from '@react-native-community/async-storage';

export class HeaderComponent extends Component {


    constructor(props) {
        super(props);
        this.state = {
            search: '',
            searchView: false,
            usuario: ''
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
            <View style={styles.container}>
                <ImageBackground source={require('../../../resources/img/bg_header.png')} style={{width: '100%', height: 'auto'}}>
                    <Header
                        containerStyle={{
                            backgroundColor: 'transparent',
                            justifyContent: 'space-evenly',
                            height: 'auto',
                            paddingBottom: 30
                        }}
                        rightComponent={<Icon name="search" onPress={() => {
                            this.setState({searchView: !this.state.searchView});
                        }} />}
                        centerComponent={{ text: 'O Me Works conecta você aos melhores prestadores de serviço da sua região', style: { color: '#fff', fontSize: 20 } }}
                        leftComponent={<Icon name="menu" onPress={() => {                            
                            (this.props.navigation.state.routeName == "ListaPorCategoria") ?
                                this.props.navigation.navigate('Home'):
                                this.props.navigation.openDrawer()
                        }} />}
                    />
                </ImageBackground>
                {this.state.searchView ? searchContainer : false}

            </View>
        );
    }
}

export default withNavigation(HeaderComponent);

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});


