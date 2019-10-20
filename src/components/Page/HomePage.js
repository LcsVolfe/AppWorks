import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Button, TextInput, TouchableHighlight, PixelRatio, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import { Formik } from 'formik';
import DatePicker from 'react-native-datepicker';
import CheckBox from 'react-native-check-box';
import ImagePicker from 'react-native-image-picker';
import { TextInputMask } from 'react-native-masked-text';
import RNPickerSelect from 'react-native-picker-select';
import HeaderComponent from './HeaderComponent';


class HomePage extends Component {
    static navigationOptions = {
        drawerIcon: ({ tintColor }) => (
            <Icon name="home" style={{ fontSize: 24, color: tintColor }} />
        )
    }

    stateImg = {
        imageSource: null
    }

    constructor() {
        super();
        this.state = {
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
            <View style={styles.container} >              
                <HeaderComponent navigation={this.props.navigation} />
                
                <Formik
                    initialValues={{ nome: '', email: '' }}
                    onSubmit={values => console.log(values)}
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

                        <TextInput
                            onChangeText={props.handleChange('email')}
                            onBlur={props.handleBlur('email')}
                            value={props.values.email}
                            style={styles.inputs}
                            placeholder='Email'
                        />

                        <View style={styles.containerRowAlign}>
                            <DatePicker
                                style={styles.datePicker}
                                locale='pt-br'
                                date={this.state.dataNascimento}
                                mode="date"
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
                                onDateChange={(dataNascimento) => {this.setState({dataNascimento})}}
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
                                        style={[styles.inputs, styles.inputDuplo]}          
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
                    
                        </View>                    
                    
                        <View>
                            <TouchableOpacity  onPress={this.selectPhoto.bind(this)}>
                                <View style={[styles.img, styles.imgContainer, {marginTop: 30}]}>
                                    {this.state.imageSource === null ?
                                    <Text>
                                        Selecione uma foto!
                                    </Text> : 
                                    (<Image style={styles.img} source={this.state.imageSource}></Image>)
                                    }
                                </View>
                            </TouchableOpacity>
                        </View>

                        
                        <Button onPress={props.handleSubmit} title="Submit" />
                        
                    </View>
                    )}
                </Formik>
                <TouchableHighlight onPress={() => { 
                    const cpfIsValid = this.cpfField.isValid()
                    console.log(cpfIsValid) // boolean
                    
                }} ><Text > Cadastre-se </Text></TouchableHighlight>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    inputs: {
        height: 40, 
        borderColor: 'gray', 
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
        borderColor: 'gray', 
        borderRadius: 10
    },
    checkBox: {
        flex: 1, 
        padding: 10,
        alignItems: 'center'
    },
    imgContainer: {
        borderColor: '#000',
        borderWidth: 1 / PixelRatio.get(),
        justifyContent: 'center',
        alignItems: 'center'

    },
    img: {
        borderRadius: 75,
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
        marginBottom: 10
    },
    containerSexo: {
        alignItems: 'flex-end'
    }
    

});

const pickerStyle = {
	inputIOS: {
		color: 'white',
		paddingTop: 13,
		paddingHorizontal: 10,
		paddingBottom: 12,
	},
	inputAndroid: {
		color: 'white',
	},
	placeholderColor: 'white',
	underline: { borderTopWidth: 0 },
	icon: {
		position: 'absolute',
		backgroundColor: 'transparent',
		borderTopWidth: 5,
		borderTopColor: '#00000099',
		borderRightWidth: 5,
		borderRightColor: 'transparent',
		borderLeftWidth: 5,
		borderLeftColor: 'transparent',
		width: 0,
		height: 0,
		top: 20,
		right: 15,
	},
};

export default HomePage;
