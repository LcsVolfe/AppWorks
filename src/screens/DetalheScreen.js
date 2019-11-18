import React, { Component } from 'react';
import { View, TouchableHighlight, ScrollView, Image, Button, StyleSheet, TextInput, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import { Text } from 'react-native-elements';

const width = Dimensions.get('screen').width;


class DetalheScreen extends Component {
    
    constructor() {
        super();
        this.state = { }

    }   

    exibirCategoria(idCategoria) {
        //const categoria = this.buscaPorId(idCategoria);
        //console.log(this.props);
        this.props.navigation.navigate('ListaPorCategoria',{idCategoria})
    }

    render() {
        
        return (
            <SafeAreaView style={styles.container}>            
                <ScrollView style={styles.scrollView}>
                    <Image 
                        source={require('../../resources/img/no-image.png')}
                        style={styles.image}
                    ></Image>                    
                    <View style={styles.row}>
                        <Text>NOME DO PRESTADOR</Text>  
                        <Text>Descicao do anuncio do prestador</Text>  
                        <Text>Descricao do prestador</Text>
                        <Text>Experiencia do prestador</Text>
                    </View>
                    <TouchableHighlight 
                        style={styles.BtnOrcamento}
                        onPress={() => { 
                            console.log(this.props.navigation);
                            //this.props.navigation.navigate('Cadastro') 
                    }} >
                        <Text style={{color:'white'}}> Fazer Orçamento </Text>
                    </TouchableHighlight>
                </ScrollView>
            </SafeAreaView>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView:{
        backgroundColor: '#bacbe4',        
    },
    row:{
        backgroundColor: '#bacbe4',
        // alignItems: 'center',
        padding: 20,
        flexDirection: 'column',
        // justifyContent: 'space-evenly',
        // alignSelf: 'flex-start',
    },
    image: {
        width: width*0.4, 
        height: width*0.4,
        marginLeft: width*0.3,
        marginTop: 40
    },
    BtnOrcamento: { 
        width: '100%', 
        height:'100%', 
        backgroundColor: 'blue', 
        alignItems: 'center',
        borderRadius: 10,
        alignSelf: 'flex-end'
    }
});
export default DetalheScreen;
