import React, { Component } from 'react';
import { View, FlatList,ScrollView, Image, Button, StyleSheet, TextInput, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import { Formik } from 'formik';
import DatePicker from 'react-native-datepicker';
import CheckBox from 'react-native-check-box';
import ImagePicker from 'react-native-image-picker';
import { TextInputMask } from 'react-native-masked-text';
import RNPickerSelect from 'react-native-picker-select';
import { Text } from 'react-native-elements';

import HeaderComponent from './HeaderComponent';
const width = Dimensions.get('screen').width;


class HomePage extends Component {
    static navigationOptions = {
        drawerIcon: ({ tintColor }) => (
            <Icon name="home" style={{ fontSize: 24, color: tintColor }} />
        )
    }
    
    constructor() {
        super();
        this.state = { }

    }   

    exibirCategoria(props) {
        //this.props.navigation.navigate('ListaPorCategoria')
    }

    render() {
        const categorias = [
            {id: 1, categoria: 'Encanador'},
            {id: 2, categoria: 'Eletricista'},
            {id: 3, categoria: 'Jardineiro'},
            {id: 4, categoria: 'Faxineira'},
            {id: 5, categoria: 'Pedreiro'},
            {id: 6, categoria: 'Serciços Gerais'},
            {id: 7, categoria: 'Montador de Móveis'},
            {id: 9, categoria: 'Reformas e Raparos'},
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
                                    onPress={ this.exibirCategoria() }
                                    >
                                        <Text style={styles.tituloCategoria} >{categoria.categoria}</Text>
                                        <Image 
                                            source={require('../../../resources/img/no-image.png')}
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
