import React, { Component } from 'react';
import {  
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,  
  TouchableOpacity
} from 'react-native';
import InputComentario from './InputComentario';
import Likes from './Likes';

const width = Dimensions.get('screen').width;
export default class ItemListagem extends React.Component {

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
        const { foto, likeCallback, comentarioCallback, verPerfilCallback } = this.props;
        
        return (        
            <View>                
                <TouchableOpacity style={styles.cabecalho} onPress={verPerfilCallback}>
                    <Image source={{uri: foto.urlPerfil}} style={styles.fotoDePerfil} />
                    <Text>{foto.loginUsuario}</Text>
                </TouchableOpacity>
                <Image source={{uri: foto.urlFoto}} style={styles.foto} />
                <View style={styles.rodape}>
                    <Likes foto={foto} likeCallback={likeCallback} />
                    {this.exibeLegenda(foto)}      

                    {foto.comentarios.map(comentario => 
                        <View style={styles.comentario} key={comentario.id}>
                            <Text style={styles.tituloComentario}>{comentario.login}</Text>
                            <Text>{comentario.texto}</Text>
                        </View>
                    )}   
                    <InputComentario 
                        comentarioCallback={comentarioCallback} 
                        idFoto={foto.id}
                    />
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
    rodape: {
        margin: 10
    },
    comentario: {
        flexDirection: 'row'
    },
    tituloComentario: {
        fontWeight: 'bold',
        marginRight: 5
    }
})