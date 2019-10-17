import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import AsyncStorage from '@react-native-community/async-storage'
import LoginScreen from './screens/LoginScreen'
import MainScreen from './screens/MainScreen'
import CadastroScreen from './screens/CadastroScreen'

const stack = createStackNavigator({
    LoginScreen: {
        screen: () => <LoginScreen navigation={this.navigation} />
    },
    MainScreen: {
        screen: MainScreen,
        navigationOptions: () => ({
            title: 'AppWorks',
            headerStyle: {
                backgroundColor: '#000'
            },
            headerTintColor: '#fff'
        })
    },
    CadastroScreen: {
        screen: CadastroScreen,
        navigationOptions: () => ({
            title: 'CadastroScreen',
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