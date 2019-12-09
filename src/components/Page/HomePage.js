import React, { Component } from 'react';
import { View, FlatList,ScrollView, Image, Button, StyleSheet, TextInput, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import { Text } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

import HeaderComponent from './HeaderComponent';
const width = Dimensions.get('screen').width;


class HomePage extends Component {
    static navigationOptions = { header: null }

    static navigationOptions = {
        drawerIcon: ({ tintColor }) => (
            <Icon name="home" style={{ fontSize: 24, color: tintColor }} />
        )
    }
    
    constructor() {
        super();
        this.state = { }

    }   

    componentDidMount() {        
        x = this.displayData();
        // console.log(x)
        // console.log(AsyncStorage.getItem('usuario'))
    }
    displayData = async ()=>{  
        // try{  
          return await AsyncStorage.getItem('usuario');  
        //   alert(user);  
        // }  
        // catch(error){  
        // //   alert(error)  
        // }  
      }  
    
    exibirCategoria(idCategoria) {
        //const categoria = this.buscaPorId(idCategoria);
        //console.log(this.props);
        this.props.navigation.navigate('ListaPorCategoria',{idCategoria})
    }

    render() {
        const categorias = [
            {id: 1, categoria: 'Encanador', img: require('./../../../resources/img/encanador.png')},
            {id: 2, categoria: 'Eletricista', img: require('../../../resources/img/eletricista.png')},
            {id: 3, categoria: 'Jardineiro', img: require('../../../resources/img/servicos_gerais.png')},
            {id: 4, categoria: 'Faxineira', img: require('../../../resources/img/faxineira.png')},
            {id: 5, categoria: 'Pedreiro', img: require('../../../resources/img/pedreiro.png')},
            {id: 6, categoria: 'Serciços Gerais', img: require('../../../resources/img/servicos_gerais.png')},
            {id: 7, categoria: 'Montador de Móveis', img: require('../../../resources/img/motandor_de_moveis.png')},
            {id: 9, categoria: 'Reformas e Raparos', img: require('../../../resources/img/reformas_e_reparos.png')},
        ];
        return (
            <SafeAreaView style={styles.container}>            
                <ScrollView>
                    
                    <HeaderComponent navigation={this.props.navigation} />
                    <View style={styles.row}>
                        {categorias.map(categoria =>                            
                            <View key={categoria.id}>
                                <TouchableOpacity 
                                    style={styles.box}
                                    onPress={() => this.exibirCategoria(categoria.id) }
                                    >
                                        <Text style={styles.tituloCategoria} >{categoria.categoria}</Text>
                                        <Image 
                                            source={categoria.img}
                                            style={styles.image}
                                        ></Image>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>           
                </ScrollView>
            </SafeAreaView>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    row:{
        backgroundColor: '#bacbe4',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        alignSelf: 'flex-start',
    },
    tituloCategoria: {
        textAlign: 'center',
        backgroundColor: 'lightgrey',
        borderBottomWidth: 1
    },
    image: {
        width: width*0.4, 
        height: width*0.4
    },
    box: {
        borderWidth: 1,
        marginVertical: 15,
        backgroundColor: 'white'
    }
});
export default HomePage;
