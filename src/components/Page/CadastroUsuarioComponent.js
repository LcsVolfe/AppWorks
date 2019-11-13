import React, { Component } from 'react';
import { View, ScrollView, Image, Button, StyleSheet, TextInput, SafeAreaView, PixelRatio, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import { Formik } from 'formik';
import DatePicker from 'react-native-datepicker';
import CheckBox from 'react-native-check-box';
import ImagePicker from 'react-native-image-picker';
import { TextInputMask } from 'react-native-masked-text';
import RNPickerSelect from 'react-native-picker-select';
import { Text } from 'react-native-elements';

import HeaderComponent from './HeaderComponent';


class CadastroUsuarioComponent extends Component {
    static navigationOptions = {
        drawerIcon: ({ tintColor }) => (
            <Icon name="home" style={{ fontSize: 24, color: tintColor }} />
        )
    }
    
    constructor() {
        super();
        this.state = {
            foto: null,
            data_nascimento: ''
        }
        this.selectPhoto = this.selectPhoto.bind(this);

    }   

    cadastrarUsuario(values){

        const uri = "http://localhost:8080/usuario";
        const requestInfo = {
            method: 'POST',
            body: JSON.stringify(values) /*JSON.stringify({
                login: 'this.state.usuario',
                senha: 'this.state.senha'
            })*/,
            headers: new Headers({
                'Accept':       'application/json',
                'Content-type': 'application/json'
            })
        }

        console.log(requestInfo)
        fetch(uri, requestInfo)
            .then(response => {
                console.log('requestInfo')
                if(response.ok)
                    return response.text();
                throw new Error("Não foi possível efetuar login.")
            })
    }

    selectPhoto() {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        }


        ImagePicker.showImagePicker(options, response => {
            console.log('Response = ', response)

            if (response.didCancel) {
                console.log('Usuário cancelou!')
            } else if (response.error) {
                console.log("ImagePicker erro: "+response.error)
            } else {
                let source = {uri: response.uri};
                this.setState({foto: source})
                console.log('foto: '+this.state.foto)
            }
        })
    }

    render() {
        return (
            <SafeAreaView style={{flex: 1, backgroundColor: '#bacbe4'}}>
                <ScrollView style={styles.container} >              
                    <View style={styles.separator} />
                    <Formik
                        initialValues={{ 
                            id: null,
                            foto: null,
                            nome: '',
                            username: '',
                            //email: '',
                            data_nascimento: '',
                            isCheckedMasculino: false,
                            isCheckedFeminino: false,
                            cpf: '',
                            telefone: '',
                            cep: '',
                            cidade: '',
                            estado: '',
                            bairro: '',
                            rua: '',
                            complemento: '',
                            password: '',
                        }}
                        onSubmit={values => this.cadastrarUsuario(values)}
                    >
                        {props => (
                        <View style={styles.form}>
                            <Text style={styles.sectionTitle}>Dados pessoais</Text>                        
                            <TextInput
                                onChangeText={props.handleChange('nome')}
                                onBlur={props.handleBlur('nome')}
                                value={props.values.nome}
                                style={styles.inputs}
                                placeholder='Nome'
                            />

                            <View style={styles.containerRowAlign}>
                                <DatePicker
                                    style={styles.datePicker}
                                    locale='pt-br'
                                    date={this.state.data_nascimento}
                                    mode="date"
                                    value={props.values.data_nascimento}
                                    placeholder="Data de nascimento"
                                    format="DD-MM-YYYY"
                                    minDate="01-01-1950"
                                    maxDate="01-01-2100"
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    customStyles={{
                                        dateIcon: styles.datePickerdateIcon,
                                        dateInput: styles.datePickerdateInput
                                    }}
                                    onDateChange={(data_nascimento) => {this.setState({data_nascimento})}}
                                />                        

                                <View style={styles.containerSexo}>
                                    <CheckBox
                                        style={styles.checkBox}
                                        leftTextStyle={{flex: 0}}
                                        onClick={()=>{
                                        this.setState({
                                            isCheckedMasculino:!this.state.isCheckedMasculino,
                                            isCheckedFeminino: this.state.isCheckedMasculino
                                        })
                                        }}
                                        isChecked={this.state.isCheckedMasculino}
                                        leftText={"Masculino"}
                                    />
                                    <CheckBox
                                        leftTextStyle={{flex: 0}}
                                        style={styles.checkBox}
                                        onClick={()=>{
                                        this.setState({
                                            isCheckedFeminino:!this.state.isCheckedFeminino,
                                            isCheckedMasculino: this.state.isCheckedFeminino
                                        })
                                        }}
                                        isChecked={this.state.isCheckedFeminino}
                                        leftText={"Feminino"}
                                    />
                                </View>
                            </View>

                            <View style={styles.containerRowAlign}>
                                <TextInputMask
                                    type={'cpf'}
                                    style={[styles.inputs, styles.inputDuplo]}
                                    value={this.state.cpf}
                                    placeholder='CPF'
                                    onChangeText={text => {
                                        this.setState({
                                        cpf: text
                                        })
                                    }}
                                    ref={(ref) => this.cpfField = ref}
                                />
                                <TextInputMask
                                    type={'cel-phone'}
                                    style={[styles.inputs, styles.inputDuplo]}
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

                            </View>

                            <Text style={styles.sectionTitle}>Endereço</Text>                        
                
                            <View style={styles.containerRowAlign}>
                                <TextInputMask
                                    type={'zip-code'}
                                    style={[styles.inputs, styles.inputDuplo]}                                
                                    value={this.state.cep}
                                    placeholder='CEP'
                                    onChangeText={cep => {this.setState({cep})}}
                                    />
                                    <View style={[styles.inputs, styles.inputDuplo, {justifyContent: 'center'}]}>
                                        <RNPickerSelect
                                            //style={[styles.inputs, styles.inputDuplo]}          
                                            onValueChange={props.handleChange('cidade')}
                                            placeholder={{
                                                label: 'Cidade',
                                                value: null,
                                            }}
                                            items={[
                                                { label: 'Chapecó', value: 'Chapecó' },
                                                { label: 'Xaxim', value: 'Xaxim' },
                                                { label: 'Guatambu', value: 'Guatambu' },
                                            ]}
                                        />
                                    </View>
                            
                            </View>
                        
                            <View style={styles.containerRowAlign}>
                                <TextInput
                                    onChangeText={props.handleChange('estado')}
                                    onBlur={props.handleBlur('estado')}
                                    value={props.values.estado}
                                    style={[styles.inputs, styles.inputDuplo]}                                
                                    placeholder='Estado'
                                />
                                <TextInput
                                    onChangeText={props.handleChange('bairro')}
                                    onBlur={props.handleBlur('bairro')}
                                    value={props.values.bairro}
                                    style={[styles.inputs, styles.inputDuplo]}                                
                                    placeholder='Bairro'
                                />
                        
                            </View >  

                            <View style={styles.containerRowAlign}>
                                <TextInput
                                    onChangeText={props.handleChange('rua')}
                                    onBlur={props.handleBlur('rua')}
                                    value={props.values.rua}
                                    style={[styles.inputs, styles.inputDuplo]}                                
                                    placeholder='Rua'
                                />
                                <TextInput
                                    onChangeText={props.handleChange('complemento')}
                                    onBlur={props.handleBlur('complemento')}
                                    value={props.values.complemento}
                                    style={[styles.inputs, styles.inputDuplo]}                                
                                    placeholder='Complemento'
                                />
                        
                            </View >  

                            <Text style={styles.sectionTitle}>Conta</Text>                        

                            <TextInput
                                onChangeText={props.handleChange('username')}
                                onBlur={props.handleBlur('username')}
                                value={props.values.username}
                                style={styles.inputs}
                                placeholder='Email'
                            />

                            {/* <TextInput
                                onChangeText={props.handleChange('username')}
                                onBlur={props.handleBlur('username')}
                                value={props.values.username}
                                style={styles.inputs}
                                placeholder='User Name'
                            /> */}

                            <TextInput
                                onChangeText={props.handleChange('password')}
                                onBlur={props.handleBlur('password')}
                                value={props.values.password}
                                style={styles.inputs}
                                placeholder='Senha'
                            />

                            <View style={styles.viewImage}>
                                <TouchableOpacity  onPress={this.selectPhoto.bind(this)}>
                                    <View style={[styles.img, styles.imgContainer, {marginVertical: 20}]}>
                                        {this.state.foto === null ?
                                        (<Image style={styles.img} source={require('../../../resources/img/no-image.png')}></Image>):                            
                                        (<Image style={styles.img} source={this.state.foto}></Image>)
                                        
                                        }
                                    </View>
                                </TouchableOpacity>
                            </View>

                            <View style={[styles.containerRowAlign, styles.viewBottons]} >
                                <Button 
                                    onPress={() => {this.props.navigation.navigate('LoginScreen')}} 
                                    title="Cancelar" 
                                    color='#ea4335'
                                />
                                <Button 
                                    onPress={props.handleSubmit} 
                                    title="Salvar" 
                                    color='#00a109'
                                />
                            </View>
                            
                            
                        </View>
                        )}
                    </Formik>

                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
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
    inputDuplo: {
        width: '48%'
    },
    form: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: 30

    },
    datePicker: {
        width: '60%',
        borderRadius: 10,
    },
    datePickerdateIcon: {
        position: 'absolute',
        left: 0,
        top: 4,
        marginLeft: 0
    },
    datePickerdateInput: {
        marginLeft: 36,
        borderColor: 'white', 
        borderRadius: 10,
        backgroundColor: 'white'
    },
    checkBox: {
        flex: 1, 
        alignItems: 'center',        
    },
    imgContainer: {
        borderColor: '#000',
        borderWidth: 1 / PixelRatio.get(),
        justifyContent: 'center',
        alignItems: 'center'

    },
    img: {
        //borderRadius: 75,
        width: 150,
        height: 150
    },
    sectionTitle: {
        alignSelf: 'flex-start',
        marginLeft: '5%',
        marginBottom: 10
    },
    containerRowAlign: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        alignContent: 'center',
        width: '80%', 
    },
    containerSexo: {
        alignItems: 'flex-end',
        marginBottom: 10
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
        width: '90%',
        marginLeft: '5%'
    },
    viewImage: {
        backgroundColor: '#a0b9df', 
        width: '100%', 
        alignItems: 'center'
    },
    viewBottons: {
        backgroundColor: '#a0b9df', 
        width: '100%', 
        padding: 20
    }


});
export default CadastroUsuarioComponent;
