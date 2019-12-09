import React, { Component } from 'react';
import { View, ScrollView, Image, Button, StyleSheet, TextInput, SafeAreaView, PixelRatio, TouchableOpacity, ToastAndroid } from 'react-native';
import { Icon } from 'native-base';
import { Formik, Form, Field } from 'formik';
import DatePicker from 'react-native-datepicker';
import CheckBox from 'react-native-check-box';
import ImagePicker from 'react-native-image-picker';
import { TextInputMask } from 'react-native-masked-text';
import RNPickerSelect from 'react-native-picker-select';
import { Text } from 'react-native-elements';
import * as Yup from 'yup';

import HeaderComponent from './HeaderComponent';

const validationSchema = Yup.object().shape({
    username: Yup.string()
        .label('Email')
        .email('Enter a valid email')
        .required('Please enter a registered email'),
    password: Yup.string()
        .label('Password')
        .required()
        .min(4, 'Password must have at least 4 characters '),  
    nome: Yup.string()
    .label('Nome')
    .required()
    .min(4, 'Nome é obrigatório'),  
});

const Toast = (props) => {
    if (props.visible) {
        ToastAndroid.showWithGravityAndOffset(
            props.message,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
        );
      return null;
    }
    return null;
};

class CadastroUsuarioComponent extends Component {
    
    static navigationOptions = {
        drawerIcon: ({ tintColor }) => (
            <Icon name="home" style={{ fontSize: 24, color: tintColor }} />
        )
    }
    
    constructor(props) {
        super(props);
        this.state = {
            foto: null,
            data_nascimento: '',
            visible: false,
        }
        this.selectPhoto = this.selectPhoto.bind(this);

    }   

    handleButtonPress = () => {
        this.setState(
            {
                visible: true,
            },
            () => {
                this.hideToast();
            },
        );
    };
    
    hideToast = () => {
        this.setState({
            visible: false,
        });
    };


    cadastrarUsuario(values){

        fetch(
            'http://volfesolucoestecnologicas.com.br/API_AppWorks/:8080/usuario',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            }
        ).then((response) => response.json())
        .then((responseJson) => {
            this.handleButtonPress()
            this.props.navigation.navigate('LoginScreen')
        }).catch((error) =>{
            console.log(error)
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


                <Toast visible={this.state.visible} message="Usuário criado com sucesso!" />
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
                        validationSchema={validationSchema}
                    >
                        {/* {props => ( */}
                        {({ handleChange, values, handleSubmit, errors, isValid, isSubmitting, touched, handleBlur, }) => (
                        <View style={styles.form}>
                             <Text style={styles.sectionTitle}>Dados pessoais</Text>                        
                            <TextInput
                                onChangeText={handleChange('nome')}
                                value={values.nome}
                                style={styles.inputs}
                                placeholder='Nome'
                            />
                           <Text style={{ color: 'red' }}>{errors.nome}</Text>

                           <View style={styles.containerRowAlign}>
                                <DatePicker
                                    style={styles.datePicker}
                                    locale='pt-br'
                                    date={this.state.data_nascimento}
                                    mode="date"
                                    value={values.data_nascimento}
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
                                    value={values.cpf}
                                    placeholder='CPF'
                                    onChangeText={handleChange('cpf')}
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
                                    value={values.telefone}
                                    onChangeText={handleChange('telefone')}
                                    />

                            </View>

                            <Text style={styles.sectionTitle}>Endereço</Text>                        
                
                            <View style={styles.containerRowAlign}>
                                <TextInputMask
                                    type={'zip-code'}
                                    style={[styles.inputs, styles.inputDuplo]}                                
                                    value={values.cep}
                                    placeholder='CEP'
                                    onChangeText={handleChange('cep')}
                                    />
                                    <View style={[styles.inputs, styles.inputDuplo, {justifyContent: 'center'}]}>
                                        <RNPickerSelect
                                            //style={[styles.inputs, styles.inputDuplo]}          
                                            onValueChange={handleChange('cidade')}
                                            value={values.cidade}
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
                                    onChangeText={handleChange('bairro')}
                                    value={values.bairro}
                                    style={[styles.inputs, styles.inputDuplo]}                                
                                    placeholder='Bairro'
                                />
                        
                            </View >  

                           <View style={styles.containerRowAlign}>
                                <TextInput
                                    onChangeText={handleChange('rua')}
                                    value={values.rua}
                                    style={[styles.inputs, styles.inputDuplo]}                                
                                    placeholder='Rua'
                                />
                                <TextInput
                                    onChangeText={handleChange('complemento')}
                                    value={values.complemento}
                                    style={[styles.inputs, styles.inputDuplo]}                                
                                    placeholder='Complemento'
                                />
                        
                            </View >  

                            <Text style={styles.sectionTitle}>Conta </Text>                        

                            <TextInput
                                onChangeText={handleChange('username')}
                                // onBlur={handleBlur('username')}
                                value={values.username}
                                style={styles.inputs}
                                placeholder='Email'
                                name='email'
                            />
                            <Text style={{ color: 'red' }}>{errors.username}</Text>

                           
                            <TextInput
                                onChangeText={handleChange('password')}
                                value={values.password}
                                style={styles.inputs}
                                placeholder='Senha'
                                secureTextEntry
                                onBlur={handleBlur('password')}
                            />
                            <Text style={{ color: 'red' }}>{errors.password}</Text>
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
                                    onPress={handleSubmit} 
                                    title="Salvar" 
                                    color='#00a109'
                                    disabled={!isValid}
                                    loading = { isSubmitting }
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
