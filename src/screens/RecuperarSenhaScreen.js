import React from 'react'
import {View, TextInput, TouchableHighlight, StyleSheet, Button} from 'react-native'
import { withNavigation } from 'react-navigation'
import CheckBox from 'react-native-check-box';
import { NavigationActions } from 'react-navigation';
import { Text } from 'react-native-elements';
import { Formik } from 'formik';
import { TextInputMask } from 'react-native-masked-text';

export class RecuperarSenhaScreen extends React.Component {

    constructor(){
        super();
        this.state = {
            email: '',
            telefone: ''
        }


    }
    render() {
        return (
        <View style={styles.container}>   
            <Text style={styles.textH1} h1>ME WORKS</Text>     
            <Text style={styles.textH4} h4>COMO RECUPERAR SUA SENHA</Text>
            <Text style={styles.text}>Insira seu e-mail ou telefone e irá ser enviado um link de redefinição de senha</Text>
            <Formik
                initialValues={{ telefone: '', email: '' }}
                onSubmit={values => console.log(values)}
            >
                {props => (
                    <View style={styles.viewForm}>
                        <TextInput
                            onChangeText={props.handleChange('email')}
                            onBlur={props.handleBlur('email')}
                            value={props.values.email}
                            style={[styles.inputs, styles.inputEmail]}
                            placeholder='Email'
                        />
                        <Text style={{textAlign:'center'}}>OU</Text>
                        <TextInputMask
                            type={'cel-phone'}
                            style={[styles.inputs, styles.inputTelefone]}
                            placeholder='Telefone'
                            options={{
                                maskType: 'BRL',
                                withDDD: true,
                                dddMask: '(99) '
                            }}
                            value={this.state.telefone}
                            onChangeText={text => {
                                this.setState({
                                telefone: text
                                })
                            }}
                        />
                        <View style={styles.btn}>
                            <Button 
                                onPress={props.handleSubmit} 
                                title="Enviar"
                                color='blue'
                            />
                            <TouchableHighlight 
                                onPress={() => {this.props.navigation.navigate('LoginScreen') }}
                                style={{marginVertical: 40}}
                            >
                                <Text>Voltar ao login</Text>
                            </TouchableHighlight>
                        </View>

                    </View>
                )}

            </Formik>
            <View style={styles.viewBgBottom}></View>
        </View>)
    }
}

export default withNavigation(RecuperarSenhaScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: '#bacbe4'
    },
    viewForm: {
        width: '80%', 
        alignItems: 'center'    
    },
    inputs: {
        height: 40, 
        borderColor: 'white',
        backgroundColor: 'white', 
        borderWidth: 1, 
        borderRadius: 10,
        marginBottom: 10,
        paddingLeft: 10
    },
    inputEmail: {
        width: '80%',
        marginTop: 30
    },
    inputTelefone: {
        width: '50%', 
        marginVertical: 15
    },
    text: {
        width: '70%',
        textAlign: 'center',
        lineHeight: 30
    },
    btn: {
        width: '60%', 
        alignItems: 'center'
    },
    textH1: {
        marginVertical: 30
    },
    textH4: {
        marginVertical: 30
    },
    viewBgBottom: {
        backgroundColor: '#a0b9df',
        flex: 1,
        width: '100%',
        alignSelf: 'flex-end'
        
    }

})