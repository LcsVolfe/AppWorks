import React from 'react'
import {View, TextInput, TouchableHighlight, StyleSheet, Text} from 'react-native'
import { withNavigation } from 'react-navigation'

export class LoginScreen extends React.Component {


    render() {
        return (
        <View>
            <TextInput
                editable = {true}
                placeholder = "Usuário"
                autoCapitalize = 'none'
                style={{
                    borderBottomColor: 'blue', borderBottomWidth: 1,
                    width: '100%', height: 50
                }}
            >
            </TextInput>

            <TextInput
                secureTextEntry= {true}
                editable = {true}
                placeholder = "Senha"
                autoCapitalize = 'none'
                style={{
                    borderBottomColor: 'blue', borderBottomWidth: 1,
                    width: '100%', height: 50
                }}
            >
            </TextInput>

            <TouchableHighlight onPress={() => {
                this.props.navigation.replace('MainScreen')
                }} style={styles.submit}>
                <Text style={styles.submitText}>Entrar</Text>
            </TouchableHighlight> 
        
        </View>)
    }
}

export default withNavigation(LoginScreen);

const styles = StyleSheet.create({
    submit: {
        marginRight: 40,
        marginLeft: 40,
        marginTop: 40,
        padding: 20,
        backgroundColor: 'blue',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'white'
    },
    submitText: {
        color: 'white',
        textAlign: 'center'
    }
})