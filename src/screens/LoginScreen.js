import React from 'react'
import {View, TextInput, TouchableHighlight, StyleSheet, Text, Image} from 'react-native'
import { withNavigation } from 'react-navigation'
import AsyncStorage from '@react-native-community/async-storage';
import HomePage from './../components/Page/HomePage'
import { NavigationActions } from 'react-navigation';

export class LoginScreen extends React.Component {

    constructor(){
        super();
        this.state = {
            usuario: '',
            senha: '',
            mensagem: ''
        }


    }

    efetuarLogin(){
        console.log(this.props);
        //this.props.navigation.navigate({ screen: 'MainSceen' })

        /*const uri = "https://instalura-api.herokuapp.com/api/public/login";
        const requestInfo = {
            method: 'POST',
            body: JSON.stringify({
                login: this.state.usuario,
                senha: this.state.senha
            }),
            headers: new Headers({
                'Content-type': 'application/json'
            })
        }
        
        fetch(uri, requestInfo)
            .then(response => {
                if(response.ok)
                    return response.text();
                throw new Error("Não foi possível efetuar login.")
            })
            .then(token => {
                AsyncStorage.setItem('token', token)
                AsyncStorage.setItem('usuario', this.state.usuario)                
              */
                //this.props.navigation.replace('MainScreen')
                //return AsyncStorage.getItem('token');
            /*})
            .catch(e => this.setState({mensagem: e.message}))*/
    }

    render() {
        return (
        <View style={styles.container}>

            <Image
                source={require('./../../resources/img/logo.png')}
                style={styles.image}
            />

            <TextInput
                editable = {true}
                placeholder = "Usuário"
                autoCapitalize = 'none'
                style={styles.textInput}
                onChangeText={texto => this.setState({usuario: texto})}
            >
            </TextInput>

            <TextInput
                secureTextEntry= {true}
                editable = {true}
                placeholder = "Senha"
                autoCapitalize = 'none'
                style={styles.textInput}
                onChangeText={texto => this.setState({senha: texto})}
            >
            </TextInput>

            <TouchableHighlight onPress={() => { this.efetuarLogin() }} 
                style={styles.submit}>
                <Text style={styles.submitText}>Entrar</Text>
            </TouchableHighlight> 
        
            <TouchableHighlight onPress={() => { 
                console.log(this.props.navigation);
                //this.props.navigation.replace('HomePage') 
            }} >
                <Text > Cadastre-se </Text>
            </TouchableHighlight>
            
            <Text style={styles.error}> {this.state.mensagem} </Text>
        </View>)
    }
}

export default withNavigation(LoginScreen);

const styles = StyleSheet.create({
    container: {
        alignItems: "center"
    },
    image: {
        margin: 40
    },
    textInput: {
        borderBottomColor: 'blue', 
        borderBottomWidth: 1,
        width: '80%', 
        height: 50
    },
    submit: {
        margin: 40,
        padding: 20,
        width: '80%',
        backgroundColor: 'blue',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    submitText: {
        color: 'white',
        textAlign: 'center'
    },
    error: {
        color: 'red'
    }
})