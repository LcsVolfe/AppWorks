import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, SafeAreaView, ScrollView, Dimensions, Image } from 'react-native';
import { createAppContainer } from 'react-navigation';
import {createDrawerNavigator, DrawerNavigatorItems} from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack'

import LoginScreen from './screens/LoginScreen';
import HomePage from './components/Page/HomePage';
import SettingsPage from './components/Page/SettingsPage';
import UserRegistration from './components/Page/UserRegistration';
import ProviderRegistration from './components/Page/ProviderRegistration';
import CadastroUsuarioComponent from './components/Page/CadastroUsuarioComponent'
import CadastroScreen from './screens/CadastroScreen';
import { RecuperarSenhaScreen } from './screens/RecuperarSenhaScreen';
import ListaPorCategoria from './components/Page/ListaPorCategoria';
const { width } = Dimensions.get("window");


const CustomDrawerNavigation = (props) => {
  return (
    <SafeAreaView style={{ flex: 1 }} >
      <View style={styles.containerFoto}>
        <View style={styles.alignFoto}>
          <Image source={require('../resources/img/no-image.png')} style={styles.imgMenu} />
        </View>
        <View style={styles.nomeUsuario}>
          <Text>John Doe</Text>
        </View>
      </View>
      <ScrollView>
        <DrawerNavigatorItems {...props}  activeTintColor='#2196f3' activeBackgroundColor='rgba(0, 0, 0, .04)' inactiveTintColor='rgba(0, 0, 0, .87)' inactiveBackgroundColor='transparent' style={{backgroundColor: '#000000'}} labelStyle={{color: 'black'}}/>
      </ScrollView>
      <View style={styles.rodapeList}>
        <View style={{ flexDirection: 'row' }}>
          <Text>Lucas Volfe</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}


const Drawer = createDrawerNavigator({
    LoginScreen: {
      screen: LoginScreen,
    },
    Cadastro: {
      screen: CadastroScreen
    },
    RecuperarSenha: {
      screen: RecuperarSenhaScreen
    },
    ListaPorCategoria: {
      screen: ListaPorCategoria,
    },
    Home: {
      screen: HomePage,
      navigationOptions: {
        title: 'Homepage'
      }
    },
    SettingsPage: {
      screen: SettingsPage,
      navigationOptions: {
        title: 'SettingsPage'
      }
    },
    UserRegistration: {
      screen: UserRegistration,
      navigationOptions: {
        title: 'UserRegistration'
      }
    },
    ProviderRegistration: {
      screen: ProviderRegistration,
      navigationOptions: {
        title: 'ProviderRegistration'
      }
    }
  },
  {
    drawerPosition: 'left',
    contentComponent: CustomDrawerNavigation,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
    drawerWidth: (width / 3) * 2,
    initialRouteName: 'LoginScreen',
});

const stack = createStackNavigator(
  {
    Login: { screen: () => <LoginScreen navigation={this.navigation} /> },
    Cadastro: {
      screen: CadastroScreen
    },
    RecuperarSenha: {
      screen: RecuperarSenhaScreen
    },
    ListaPorCategoria: {
      screen: ListaPorCategoria,
    },
  },
  {
    initialRouteName: 'Login',
    //contentComponent: CustomDrawerNavigation,
  }
);

const styles = StyleSheet.create({    
    containerFoto: {
        height: 250, 
        backgroundColor: '#d2d2d2', 
        opacity: 0.9
    },
    alignFoto: { 
        height: 200, 
        alignItems: 'center', 
        justifyContent: 'center' 
    },
    imgMenu: { 
        height: 150, 
        width: 150, 
        borderRadius: 60 
    },
    nomeUsuario: { 
        height: 50, 
        alignItems: 'center', 
        justifyContent: 'center' 
    },
    rodapeList: { 
        alignItems: "center", 
        bottom: 20 
    }
})

const App = createAppContainer(Drawer);

export default App;