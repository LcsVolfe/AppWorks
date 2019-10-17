import React, { Component, useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Header, SearchBar } from 'react-native-elements';
import Hamburger from 'react-native-hamburger';
import { Left, Right, Icon } from 'native-base';



class SettingsPage extends Component {


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
                containerStyle={{}}
            />;      
        return (
            <View style={{flex: 1}}>
                <Header
                    containerStyle={{
                        backgroundColor: '#3D6DCC',
                        justifyContent: 'space-evenly',
                    }}
                    rightComponent={<Icon name="search" onPress={() => {
                        console.log(this.state.searchView);
                        this.setState({searchView: !this.state.searchView});
                    }} />}
                    centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
                    leftComponent={<Icon name="menu" onPress={() => this.props.navigation.openDrawer()} />}
                />


                {this.state.searchView ? searchContainer : false}

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
