import React from 'react'
import { Text } from 'react-native'
import Component1 from '../components/Component1'
import Component2 from '../components/Component2'
import Component3 from '../components/Component3'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default createMaterialBottomTabNavigator({
    Component1: {
        screen: Component1,
        navigationOptions: {
            tabBarLabel: 'Componente 1',
            tabBarIcon:({tintColor}) => (
                <Icon name="bell-outline" color={tintColor} size={24}></Icon>
            )
        }
    },
    CamComponent: {
        screen: Component2,
        navigationOptions: {
            tabBarLabel: 'Cam Component',
            tabBarIcon:({tintColor}) => (
                <Icon name="calendar" color={tintColor} size={24}></Icon>
            )
        }
    },
    Component3: {
        screen: Component3,
        navigationOptions: {
            tabBarLabel: 'Componente 3',
            tabBarIcon:({tintColor}) => (
                <Icon name="pencil" color={tintColor} size={24}></Icon>
            )
        }
    }
}, {
    initialRouteName: 'Component1',
    activeColor: 'blue',
    inactiveColor: 'red',
    barStyle: {backgroundColor: '#fff'}
})