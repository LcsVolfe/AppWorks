import React from 'react'
import {View, TextInput, TouchableHighlight, StyleSheet,  Image} from 'react-native'
import {Text} from 'react-native-elements'
import { withNavigation } from 'react-navigation'
import AsyncStorage from '@react-native-community/async-storage';
import CheckBox from 'react-native-check-box';
import { NavigationActions } from 'react-navigation';

import HomePage from './../components/Page/HomePage';
import CadastroUsuarioComponent from '../components/Page/CadastroUsuarioComponent';

export class LoginScreen extends React.Component {

    constructor(){
        super();
        this.state = {
            usuario: '',
            senha: '',
            mensagem: '',
            lembrarMe: false
        }


    }

    efetuarLogin(){

        this.props.navigation.navigate('Home')

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
                //this.props.navigation.replace('HomePage')
                //return AsyncStorage.getItem('token');
            /*})
            .catch(e => this.setState({mensagem: e.message}))*/
    }

    render() {
        return (
        <View style={styles.container}>        
            <Text h1 style={{marginVertical: 100}}>APPWORKS</Text>

            <TextInput
                editable = {true}
                placeholder = "Usuário"
                autoCapitalize = 'none'
                style={styles.inputs}
                onChangeText={texto => this.setState({usuario: texto})}
            >
            </TextInput>

            <TextInput
                secureTextEntry= {true}
                editable = {true}
                placeholder = "Senha"
                autoCapitalize = 'none'
                style={styles.inputs}
                onChangeText={texto => this.setState({senha: texto})}
            >
            </TextInput>
            <View style={styles.viewCheckBox}>
                    <CheckBox                  
                         
                        leftTextStyle={{flex: 0}}
                        onClick={()=>{
                            this.setState({lembrarMe:!this.state.lembrarMe})
                        }}
                        isChecked={this.state.lembrarMe}
                        leftText={"Lembrar-me"}
                    />
                    <TouchableHighlight onPress={() => { 
                        this.props.navigation.navigate('RecuperarSenha') 
                    }} ><Text>Esqueçeu a senha?</Text></TouchableHighlight>
                    

                </View>

            <View style={styles.viewBtnLogin}>
                <TouchableHighlight onPress={() => { this.efetuarLogin() }} 
                    style={styles.submit}>
                    <Text style={styles.submitText}>Entrar</Text>
                </TouchableHighlight> 
            
                <TouchableHighlight onPress={() => { 
                    console.log(this.props.navigation);
                    this.props.navigation.navigate('Cadastro') 
                }} >
                    <Text > Cadastre-se </Text>
                </TouchableHighlight>
                
                <Text style={styles.error}> {this.state.mensagem} </Text>
            </View>
        </View>)
    }
}

export default withNavigation(LoginScreen);

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: '#bacbe4'
    },
    image: {
        margin: 60
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
        width: '50%',
        backgroundColor: 'blue',
        borderRadius: 10,
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
    },
    inputs: {
        height: 40, 
        borderColor: 'white',
        backgroundColor: 'white', 
        borderWidth: 1, 
        width: '80%',
        borderRadius: 10,
        marginBottom: 10,
        paddingLeft: 10
    },
    viewCheckBox: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        marginBottom: 30,
        width: '80%', 
    },
    viewBtnLogin: { 
        width: '100%', 
        height:'100%', 
        backgroundColor: '#a0b9df', 
        alignItems: 'center'
    }
})