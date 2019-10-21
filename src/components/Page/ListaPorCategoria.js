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
    }
    

    render() {  
        const props = this.props.navigation;
        
        const perfis = [
            {id: 1, usuario: 'INNOVA ENCANAMENTOS', descricao: 'Innova encanamentos pensa em todo os detalhes para a execução de um bom serviço, enviaremos um orçamento detalhado do seu pedido'},
            {id: 2, usuario: 'PALMAS ENCANAMENTOS', descricao: 'Especialista em encanamentos prediais e residenciais. Redes de esgoto e Pluvial, água quente e fria e redes de PPCI.'},
            {id: 3, usuario: 'TIGRE', descricao: 'Na hora de construir ou reformar, conte sempre com um profissional. São mais de 75 anos de história e inovação.'},
            {id: 4, usuario: 'CLODOALDO SLOVAK CONSTRUÇÕES-ME', descricao: 'Trabalhamos com água quente, fria, tubulações de cobre, pvc, galvanizado, reparos em geral, troca de colunas em prédios, residências...'},
            {id: 5, usuario: 'SLOVAK CONSTRUÇÕES-ME', descricao: 'Trabalhamos com água quente, fria, tubulações de cobre, pvc, galvanizado, reparos em geral, troca de colunas em prédios, residências...'},
            {id: 6, usuario: 'CLODOALDO', descricao: 'Trabalhamos com água quente, fria, tubulações de cobre, pvc, galvanizado, reparos em geral, troca de colunas em prédios, residências...'},
        ];
        
        return (        
            <SafeAreaView style={styles.container}>        
                <ScrollView>
                    <HeaderComponent navigation={props} />
                    <ScrollView >
                        {perfis.map(perfil =>
                            <View key={perfil.id}>
                                <TouchableOpacity 
                                    style={styles.box}
                                    //onPress={ () => console.log(props.navigate('Home')) }
                                    onPress={ () => console.log( this.props.navigation.goBack()) }
                                    >
                                        <Image 
                                            source={require('../../../resources/img/no-image.png')}
                                            style={styles.image}
                                        ></Image>
                                        <View style={{width: '60%'}}>
                                            <Text style={styles.tituloCategoria}>{perfil.usuario}</Text>
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
        padding: 5
    }
})