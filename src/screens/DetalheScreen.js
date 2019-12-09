import React, { Component } from 'react';
import { View, TouchableHighlight,ToastAndroid, ScrollView, Image, Button, StyleSheet, TextInput, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import { Text } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
// import AnimatedLoader from "react-native-animated-loader";

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
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


class DetalheScreen extends Component {
    
    foto;

    constructor() {
        super();
        this.state = {
            anuncio: null,
            toast: false,
            loader: false,
            usuario: 'x',

        }

    }   
    handleButtonPress = () => {
        this.setState(
            {
                toast: true,
            },
            () => {
                this.hideToast();
            },
        );
    };
    
    hideToast = () => {
        this.setState({
            toast: false,
        });
    };

    getAd(idAnuncio){
        fetch(
            'http://volfesolucoestecnologicas.com.br/API_AppWorks/:8080/anuncio/'+idAnuncio,
            {
                method: 'GET',
                headers:{
                    Accept: 'application/json',
                    'Content-type': 'application/json'                    
                }/*,
                params: {
                    categoria: props.state.params.idCategoria
                }*/
            }            
        )
        .then((response) => response.json())
        .then((responseJson) => {
            this.foto = responseJson.usuario.foto;
            this.setState({anuncio: responseJson})
        })
        .catch((error) => {
            console.log(error)
        })

        

    }

    
    componentDidMount() {
        this.getAd(this.props.navigation.state.params.idAnuncio)  
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>   
                <Toast visible={this.state.toast} message="Solicitação de orçamento enviada com sucesso!" />
                {/* <AnimatedLoader
                    visible={this.state.loader}
                    overlayColor="rgba(255,255,255,0.75)"
                    source={require("./loader.json")}
                    animationStyle={styles.lottie}
                    speed={1}
                    /> */}
                <ScrollView style={styles.scrollView}>
                    <View style={styles.col}>
                            {this.foto ? 
                                <Image source={{uri: `data:image/gif;base64,${this.foto}`}} style={styles.image}></Image>:
                                <Image source={require('../../resources/img/no-image.png')}style={styles.image}></Image>                    
                            }
                        <View style={styles.row}>
                            <Text style={styles.titulo}>{(this.state.anuncio != null)?this.state.anuncio.titulo:''}</Text>  
                            <Text style={styles.sectionTitle}>Descrição:</Text>                        
                            <Text style={styles.descricao}>{(this.state.anuncio != null)?this.state.anuncio.descricao:''}</Text>  
                            {/* <Text style={styles.sectionTitle}>Prestador:</Text>                        
                            <Text style={styles.descricao}>{(this.state.anuncio != null)?this.state.anuncio.usuario.descricao:''}</Text>
                            <Text style={styles.sectionTitle}>Experiências:</Text>                         */}
                            {/* <Text style={styles.descricao}>{(this.state.anuncio != null)?this.state.anuncio.usuario.experiencias:''}</Text> */}
                        </View>
                    </View>
                </ScrollView>
                <TouchableHighlight 
                    style={styles.BtnOrcamento}
                    onPress={() => { 
                        this.handleButtonPress()
                        this.props.navigation.goBack()
                        //this.props.navigation.navigate('Cadastro') 
                }} >
                    <Text style={{color:'white'}}> Fazer Orçamento </Text>
                </TouchableHighlight>
            </SafeAreaView>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    scrollView:{
        backgroundColor: '#bacbe4',     
    },
    col: {
        flexDirection: 'column',
    },
    row:{
        backgroundColor: '#a0b9df',
        marginTop: 40,
        padding: 20,
        flexDirection: 'column',
        minHeight: height*0.3
    },
    image: {
        width: width*0.4, 
        height: width*0.4,
        marginLeft: width*0.3,
        marginTop: 20,
        marginBottom: 20,
        borderRadius: width*0.5
    },
    BtnOrcamento: { 
        width: '80%', 
        height: 30, 
        paddingTop: 5,
        backgroundColor: 'blue', 
        alignItems: 'center',
        borderRadius: 10,
        alignSelf: 'center',
        position: 'absolute',
        bottom: 20,
    },
    titulo: {
        fontWeight: 'bold',
        fontSize: 18
    },
    descricao: {
        marginTop: 5
    },
    sectionTitle: {
        alignSelf: 'flex-start',
        marginTop: 25,
        fontSize: 16
    }

});
export default DetalheScreen;
