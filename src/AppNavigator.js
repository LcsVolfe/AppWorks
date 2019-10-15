import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import LoginScreen from './screens/LoginScreen'
import MainScreen from './screens/MainScreen'
import AsyncStorage from '@react-native-community/async-storage'

const stack = createStackNavigator({
    LoginScreen: {
        screen: () => <LoginScreen navigation={this.navigation} />
    },
    MainScreen: {
        screen: MainScreen,
        navigationOptions: () => ({
            title: 'Exemplo Navigation',
            headerStyle: {
                backgroundColor: '#000'
            },
            headerTintColor: '#fff'
        })
    }
})

AsyncStorage.getItem('token').
    then(token => {    
        console.warn(token)
        if(token) {
            return true;
        }
    })

const AppNavigator = createAppContainer(stack)

export default AppNavigator;