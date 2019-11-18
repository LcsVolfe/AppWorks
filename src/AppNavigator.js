import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, SafeAreaView, ScrollView, Dimensions, Image } from 'react-native';
import { createAppContainer, createSwitchNavigator, StackNavigator } from 'react-navigation';
import {createDrawerNavigator, DrawerNavigatorItems} from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack'

import LoginScreen from './screens/LoginScreen';
import HomePage from './components/Page/HomePage';
import SettingsPage from './components/Page/SettingsPage';
import UserRegistration from './components/Page/UserRegistration';
import ProviderRegistration from './components/Page/ProviderRegistration';
import CadastroUsuarioComponent from './components/Page/CadastroUsuarioComponent'
import CadastroScreen from './screens/CadastroScreen';
import DetalheScreen from './screens/DetalheScreen';
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


// drawer stack
const DrawerStack = createDrawerNavigator({
    Home: {    screen: HomePage   },
    SettingsPage: {    screen: SettingsPage, navigationOptions: { headerMode: false}  },
  },
  {
    drawerPosition: 'left',
    contentComponent: CustomDrawerNavigation,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
    drawerWidth: (width / 3) * 2,
    initialRouteName: 'Home',
})

const DrawerNavigation = createStackNavigator({
    DrawerStack: { screen: DrawerStack, navigationOptions: { header: null }  },
    ListaPorCategoria: {    screen: ListaPorCategoria, navigationOptions: { header: null }   },
    DetalheAnuncio: {    screen: DetalheScreen, navigationOptions: { header: null }   },
  })

const LoginStack = createStackNavigator({
  LoginScreen: {    screen: LoginScreen, navigationOptions: { header: null }   },
  Cadastro: {    screen: CadastroScreen, navigationOptions: { header: null }   },
  RecuperarSenha: {    screen: RecuperarSenhaScreen, navigationOptions: { header: null }   }
  });

const PrimaryNav = createSwitchNavigator({
  loginStack: { screen: LoginStack, navigationOptions: { header: null } },
  drawerStack: { screen: DrawerNavigation, navigationOptions: { header: null }  }
  }, {
    initialRouteName: 'loginStack',
  }
);



const App = createAppContainer(PrimaryNav);

export default App;


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
