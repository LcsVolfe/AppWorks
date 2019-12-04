import React from 'react'
import {View, SafeAreaView, ScrollView, StyleSheet, TextInput, Button, ToastAndroid} from 'react-native'
import { withNavigation } from 'react-navigation'
import CheckBox from 'react-native-check-box';
import { Text } from 'react-native-elements';
import { Icon } from 'native-base';
import { Formik } from 'formik';
import RNPickerSelect from 'react-native-picker-select';

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

export default class CadastroAnuncioScreen extends React.Component {
    
    categorias= [
        {value: 1, label: 'Encanador'},
        {value: 2, label: 'Eletricista'},
        {value: 3, label: 'Jardineiro'},
        {value: 4, label: 'Faxineira'},
        {value: 5, label: 'Pedreiro'},
        {value: 6, label: 'Serciços Gerais'},
        {value: 7, label: 'Montador de Móveis'},
        {value: 9, label: 'Reformas e Raparos'}
    ];

    static navigationOptions = {
        drawerIcon: ({ tintColor }) => (
            <Icon name="bookmarks" style={{ fontSize: 24, color: tintColor }} />
        )
    }

    constructor() {
        super();
        this.state = {
        }
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

    cadastrarAnuncio(values){

        fetch(
            'http://192.168.0.107:8080/anuncio',
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
            console.log('sucesso')
            this.props.navigation.navigate('Home')
        }).catch((error) =>{
            console.log(error)
        })
    }

    render(){
        return(
            <SafeAreaView style={{flex: 1, backgroundColor: '#bacbe4'}}>
                <Toast visible={this.state.visible} message="Anúncio criado com sucesso!" />

                <ScrollView style={styles.container} >              
                    <Text h4 style={{marginLeft: '5%'}}>Cadastro de Anúncio</Text>
                    <View style={styles.separator} />                   
                    
                    <Formik
                        initialValues={{ 
                            id: null,
                            usuario: '', 
                            descricao: '',
                            categoria: '',
                            titulo: ''
                        }}
                        onSubmit={values => this.cadastrarAnuncio(values)}
                    >
                        {props => (
                            <View style={{height: '100%'}}>
                                <TextInput
                                    onChangeText={props.handleChange('titulo')}
                                    value={props.values.titulo}
                                    style={styles.inputs}
                                    placeholder='Titulo'
                                />
                                <TextInput
                                    onChangeText={props.handleChange('descricao')}
                                    value={props.values.descricao}
                                    style={styles.inputs}
                                    placeholder='Descricao'
                                />

                                <View style={[styles.inputs, styles.inputDuplo, {justifyContent: 'center'}]}>
                                    <RNPickerSelect
                                        //style={[styles.inputs, styles.inputDuplo]}          
                                        onValueChange={props.handleChange('categoria')}
                                        value={props.values.categoria}
                                        placeholder={{
                                            label: 'Categoria',
                                            value: null,
                                        }}
                                        items={this.categorias}
                                    />
                                </View>

                                <View style={[styles.containerRowAlign, styles.viewBottons]} >
                                    <Button 
                                        onPress={() => {this.props.navigation.navigate('Home')}} 
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
    viewBottons: {
        backgroundColor: '#a0b9df', 
        width: '100%', 
        padding: 20,
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
        width: '90%',
        marginLeft: '5%'
    },
    containerRowAlign: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        alignContent: 'center',
        width: '80%', 
        alignSelf: 'flex-end'
    },
    inputs: {
        height: 40, 
        borderColor: 'white',
        backgroundColor: 'white', 
        borderWidth: 1, 
        width: '96%',
        marginLeft: '2%',
        borderRadius: 10,
        marginBottom: 10,
        paddingLeft: 10
    },
})