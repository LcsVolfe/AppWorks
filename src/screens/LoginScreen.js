import React from 'react'
import {View, TextInput, TouchableHighlight, StyleSheet, Text, Image} from 'react-native'
import { withNavigation } from 'react-navigation'

export class LoginScreen extends React.Component {


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
            >
            </TextInput>

            <TextInput
                secureTextEntry= {true}
                editable = {true}
                placeholder = "Senha"
                autoCapitalize = 'none'
                style={styles.textInput}
            >
            </TextInput>

            <TouchableHighlight onPress={() => {
                this.props.navigation.replace('MainScreen')
                }} 
                style={styles.submit}>
                <Text style={styles.submitText}>Entrar</Text>
            </TouchableHighlight> 
        
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
    }
})