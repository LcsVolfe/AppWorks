import React, { Component } from 'react';
import {  
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,  
  TouchableOpacity,
  SafeAreaView,
  ScrollView
} from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';

import HeaderComponent from './HeaderComponent';

const width = Dimensions.get('screen').width;
export default class ListaPorCategoria extends React.Component {

    constructor() {
        super();
        this.state= {
            anuncios: []
        }

    }
    
    getAds(idCategoria){
        fetch(
            'http://192.168.0.107:8080/anuncio?categoria='+idCategoria,
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
            // console.log(responseJson)
            this.setState({anuncios: responseJson})
        })
        .catch((error) => {
            console.log(error)
        })
    }

    componentDidMount() {
        this.getAds(this.props.navigation.state.params.idCategoria)
    }

    render() {  
        const props = this.props.navigation; 
        return (        
            <SafeAreaView style={styles.container}>  
                <ScrollView >
                    <HeaderComponent navigation={props}  />
                    <ScrollView >
                        {this.state.anuncios.map(perfil =>
                            <View key={perfil.id}>
                                <TouchableOpacity 
                                    style={styles.box}
                                    onPress={ () => console.log(props.navigate('DetalheAnuncio', {idAnuncio: perfil.id})) }
                                    >
                                        <Image 
                                            source={require('../../../resources/img/no-image.png')}
                                            style={styles.image}
                                        ></Image>
                                        <View style={{width: '60%'}}>
                                            <Text style={styles.tituloCategoria}>{perfil.titulo}</Text>
                                            <Text style={styles.descricao} >{perfil.descricao}</Text>
                                        </View>
                                </TouchableOpacity>
                            </View>
                        )}
                    </ScrollView>          
                </ScrollView>      
            </SafeAreaView>            
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#bacbe4',

    },  
    tituloCategoria: {
        backgroundColor: 'lightgrey',
        padding: 5
    },
    image: {
        width: width*0.2, 
        height: width*0.2
    },
    box: {
        marginVertical: 15,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    descricao: {
        backgroundColor: 'white',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        padding: 5,
        height: 60
    }
})