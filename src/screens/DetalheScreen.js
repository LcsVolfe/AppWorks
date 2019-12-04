import React, { Component } from 'react';
import { View, TouchableHighlight, ScrollView, Image, Button, StyleSheet, TextInput, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import { Text } from 'react-native-elements';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;


class DetalheScreen extends Component {
    
    constructor() {
        super();
        this.state = {
            anuncio: null
        }

    }   

    getAd(idAnuncio){
        fetch(
            'http://192.168.0.107:8080/anuncio/'+idAnuncio,
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
            console.log(responseJson)
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
                <ScrollView style={styles.scrollView}>
                    <View style={styles.col}>
                        <Image 
                            source={require('../../resources/img/no-image.png')}
                            style={styles.image}
                        ></Image>                    
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
        marginTop: 40,
        marginBottom: 40
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
