import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import LoginScreen from './screens/LoginScreen'
import MainScreen from './screens/MainScreen'

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

const AppNavigator = createAppContainer(stack)

export default AppNavigator;