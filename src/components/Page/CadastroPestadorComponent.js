import React, { Component } from 'react';
import { View, ScrollView, ToastAndroid, Image, Button, StyleSheet, TextInput, SafeAreaView, PixelRatio, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import { Formik } from 'formik';
import DatePicker from 'react-native-datepicker';
import CheckBox from 'react-native-check-box';
import ImagePicker from 'react-native-image-picker';
import { TextInputMask } from 'react-native-masked-text';
import RNPickerSelect from 'react-native-picker-select';
import { Text } from 'react-native-elements';
import * as Yup from 'yup';


const validationSchema = Yup.object().shape({
    username: Yup.string()
        .label('Email')
        .email('E-mail inválido')
        .required('Campo obrigatório'),
    password: Yup.string()
        .label('Senha')
        .required('Campo obrigatório')
        .min(4, 'mínimo 4 caracteres'),  
    razao_social: Yup.string()
    .label('Razão Social')
    .required('Campo obrigatório')
    .min(4, 'mínimo 4 caracteres'),  
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

const API = 'http://192.168.0.107:8080/'

class CadastroPestadorComponent extends Component {
    static navigationOptions = {
        drawerIcon: ({ tintColor }) => (
            <Icon name="home" style={{ fontSize: 24, color: tintColor }} />
        )
    }

    imgData;
    
    constructor() {
        super();
        this.state = {
            imageSource: null,
            visible: false
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

    checkUser(text){ 
        console.log(text)
        fetch(API+'usuario?usuario='+text,
        {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }
        ).then((response) => response.json())
        .then((responseJson) => { 
            console.log(responseJson)
        }).catch((error) =>{
            console.log(error)
        })
    }


    cadastrarUsuario(values){
        values.foto = this.imgData;
        values.nome = values.nome_fantasia;
        fetch(API+'usuario',
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
            // console.log('Response = ', response)

            if (response.didCancel) {
                console.log('Usuário cancelou!')
            } else if (response.error) {
                console.log("ImagePicker erro: "+response.error)
            } else {
                let source = {uri: response.uri};
                this.setState({imageSource: source})
                this.imgData = response.data;
                console.log('ImageSource: '+this.state.imageSource)
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
                            razao_social: '', 
                            nome_fantasia: '',
                            username: '',
                            experiencias: '',
                            telefone: '',
                            password: '',
                            descricao: '',
                            data_nascimento: '10-10-1990' 
                        }}
                        onSubmit={values => this.cadastrarUsuario(values)}
                        validationSchema={validationSchema}
                    >
                        {({ handleChange, values, handleSubmit, errors, isValid, isSubmitting, touched, handleBlur, }) => (
                        <View style={styles.form}>
                            <Text style={styles.sectionTitle}>Dados Empresariais</Text>                        
                            <TextInput
                                onChangeText={handleChange('razao_social')}
                                // onBlur={props.handleBlur('razao_social')}
                                value={values.razao_social}
                                style={styles.inputs}
                                placeholder='Razão Social'
                            />
                           <Text style={{ color: 'red' }}>{errors.razao_social}</Text>

                            <TextInput
                                onChangeText={handleChange('nome_fantasia')}
                                // onBlur={props.handleBlur('nome_fantasia')}
                                value={values.nome_fantasia}
                                style={styles.inputs}
                                placeholder='Nome Fantasia'
                            />

                            <TextInputMask
                                type={'cel-phone'}
                                style={[styles.inputs, styles.inputDuplo]}
                                placeholder='Contato'
                                options={{
                                    maskType: 'BRL',
                                    withDDD: true,
                                    dddMask: '(99) '
                                }}
                                value={values.telefone}
                                // onChangeText={handleChange('telefone')}
                            />

                           

                            <Text style={styles.sectionTitle}>Experiência Profissional</Text>                       
                
                           
                            <TextInput
                                onChangeText={handleChange('experiencias')}
                                // onBlur={props.handleBlur('experiencias')}
                                value={values.experiencias}
                                style={[styles.inputs]}                                
                                placeholder='Descreva detalhadamente suas experiências profissionais'
                            />
                            <TextInput
                                onChangeText={handleChange('descricao')}
                                // onBlur={props.handleBlur('suaDescricao')}
                                value={values.descricao}
                                style={[styles.inputs]}                                
                                placeholder='Sua descrição'
                            />

                            <Text style={styles.sectionTitle}>Conta </Text>                        

                            <TextInput
                                onChangeText={handleChange('username')}
                                // onBlur={text => this.checkUser(text)}
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
                                // onBlur={handleBlur('password')}
                            />
                           <Text style={{ color: 'red' }}>{errors.password}</Text>
                        
                            

                            
                            <View style={styles.viewImage}>
                                <TouchableOpacity  onPress={this.selectPhoto.bind(this)}>
                                    <View style={[styles.img, styles.imgContainer, {marginVertical: 20}]}>
                                        {this.state.imageSource === null ?
                                        (<Image style={styles.img} source={require('../../../resources/img/no-image.png')}></Image>):                            
                                        (<Image style={styles.img} source={this.state.imageSource}></Image>)
                                        
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
export default CadastroPestadorComponent;
