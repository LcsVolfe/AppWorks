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


class CadastroPestadorComponent extends Component {
    static navigationOptions = {
        drawerIcon: ({ tintColor }) => (
            <Icon name="home" style={{ fontSize: 24, color: tintColor }} />
        )
    }
    
    constructor() {
        super();
        this.state = {
            imageSource: null,
            nome: '',
            email: '',
            dataNascimento: '',
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
            senha: '',

        }
        this.selectPhoto = this.selectPhoto.bind(this);

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
                this.setState({imageSource: source})
                console.log('ImageSource: '+this.state.imageSource)
            }
        })
    }

    render() {
        return (
            <SafeAreaView style={{flex: 1, backgroundColor: '#bacbe4'}}>
                <ScrollView style={styles.container} >      
                    <View style={styles.separator} />
                    <Formik
                        initialValues={{ nome: '', email: '' }}
                        onSubmit={values => console.log(values)}
                    >
                        {props => (
                        <View style={styles.form}>
                            <Text style={styles.sectionTitle}>Dados Empresariais</Text>                        
                            <TextInput
                                onChangeText={props.handleChange('razaoSocial')}
                                onBlur={props.handleBlur('razaoSocial')}
                                value={props.values.razaoSocial}
                                style={styles.inputs}
                                placeholder='Razão Social'
                            />

                            <TextInput
                                onChangeText={props.handleChange('nomeFantasia')}
                                onBlur={props.handleBlur('nomeFantasia')}
                                value={props.values.nomeFantasia}
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
                                value={this.state.contato}
                                onChangeText={contato => {this.setState({contato})}}
                            />

                           

                            <Text style={styles.sectionTitle}>Experiência Profissional</Text>                       
                
                           
                            <TextInput
                                onChangeText={props.handleChange('detalhesExperiencia')}
                                onBlur={props.handleBlur('detalhesExperiencia')}
                                value={props.values.detalhesExperiencia}
                                style={[styles.inputs, styles.inputDuplo]}                                
                                placeholder='Descreva detalhadamente suas experiências profissionais'
                            />
                            <TextInput
                                onChangeText={props.handleChange('suaDescricao')}
                                onBlur={props.handleBlur('suaDescricao')}
                                value={props.values.suaDescricao}
                                style={[styles.inputs, styles.inputDuplo]}                                
                                placeholder='Sua descrição'
                            />
                        
                            

                            
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
export default CadastroPestadorComponent;
