import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Left, Right, Icon } from 'native-base';

import HeaderComponent from './HeaderComponent';


class UserRegistration extends Component {
    static navigationOptions = {
        drawerIcon: ({ tintColor }) => (
            <Icon name="notifications" style={{ fontSize: 24, color: tintColor }} />
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <HeaderComponent navigation={this.props.navigation} />
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Notification Page</Text>
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

export default UserRegistration;
