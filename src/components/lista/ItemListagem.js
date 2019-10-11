import React, { Component } from 'react';
import {  
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,  
  TouchableOpacity
} from 'react-native';

const width = Dimensions.get('screen').width;
export default class ItemListagem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            foto: {...this.props.foto, likers: [{}]}
            //foto: this.props.foto
        }
    }

    carregaIcone(likeada) {
        return likeada ? 
            require('./../../../resources/img/s2-checked.png') : 
            require('./../../../resources/img/s2.png')
    }

    like() {
        const fotoAtualizada = { ...this.state.foto, likeada:!this.state.foto.likeada }
        this.setState({ foto: fotoAtualizada })
    }

    exibeLikes(likers) {
        if (likers.length <= 0) 
            return;

        return (
            <Text style={styles.likes}>
                {likers.length} {likers.length > 1 ? 'curtidas' : 'curtida'}
            </Text>
        )
    }

    exibeLegenda(foto) {
        if(foto.comentario == '')
            return;
      
        return (
            <View style={styles.comentario}>
                <Text style={styles.tituloComentario}>{foto.loginUsuario}</Text>
                <Text>{foto.comentario}</Text>
            </View>
        );
     }

    render() {       
        const { foto } = this.state;
        
        return (        
            <View>
                <View style={styles.cabecalho}>
                    <Image source={{uri: foto.urlPerfil}} style={styles.fotoDePerfil} />
                    <Text>{foto.loginUsuario}</Text>
                </View>
                <Image source={{uri: foto.urlFoto}} style={styles.foto} />
                <View style={styles.rodape}>
                    <TouchableOpacity onPress={this.like.bind(this)}>
                    <Image style={styles.botaoDeLike} source={this.carregaIcone(foto.likeada)} />
                    </TouchableOpacity>                    
                    {this.exibeLikes(foto.likers)}
                    {this.exibeLegenda(foto)}                    
                </View>
            </View>            
        )
    }

}

const styles = StyleSheet.create({
    cabecalho: {
      margin:10, 
      flexDirection: 'row', 
      alignItems: 'center'
    },
    fotoDePerfil: {
      margin: 10, 
      borderRadius: 20, 
      width:40, 
      height:40
    },
    foto: {
      width:width, 
      height:width
    },
    botaoDeLike: {
        height: 40,
        width: 40,
        marginBottom: 10        
    },
    rodape: {
        margin: 10
    },
    likes: {
        fontWeight: 'bold',        
    },
    comentario: {
        flexDirection: 'row'
    },
    tituloComentario: {
        fontWeight: 'bold',
        marginRight: 5
    }
})