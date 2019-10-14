import React from 'react'
import { Text, View, FlatList, StyleSheet, Platform } from 'react-native'
import ItemListagem from './lista/ItemListagem'

export default class Component1 extends React.Component {

    constructor() {
        super();
        this.state = {
            fotos: []
        }
    }    

    componentDidMount() {
        fetch('https://instalura-api.herokuapp.com/api/public/fotos/rafael')
            .then(resposta => resposta.json())
            .then(json => this.setState({fotos: json}))
    }

    like(idFoto){
        const foto = this.state.fotos.find(foto => foto.id === idFoto);
        
        let novaLista = [];              
        if(!foto.likeada){
            novaLista = [
                ...foto.likers,
                {login: 'meuUsuario'}
            ];
        } else{
            novaLista = foto.likers.filter(liker => {
                return liker.login !== 'meuUsuario';
            })
        }
        const fotoAtualizada = {
            ...foto,
            likeada: !foto.likeada,
            likers: novaLista
        } 
        
        const fotos = this.state.fotos.map(
            foto => foto.id === fotoAtualizada.id ?
               fotoAtualizada : foto
        )
      
        this.setState({fotos});
    } 

    adicionaComentario(valorComentario, inputComentario, idFoto) {
        if(valorComentario === '')
          return;
    
        const foto = this.state.fotos.find(foto => foto.id === idFoto)

        const novaLista = [...foto.comentarios, {
            id: valorComentario,
            login: 'meuUsuario',
            texto: valorComentario
        }];
    
        const fotoAtualizada = {
            ...foto,
            comentarios: novaLista
        }

        const fotos = this.state.fotos
            .map( foto => foto.id === fotoAtualizada.id ? fotoAtualizada : foto)
    
        this.setState({fotos});
        inputComentario.clear();
    
    }

    render() {
        return (
            <View>
                <FlatList style={styles.container}
                    //data={fotos}
                    data={this.state.fotos}
                    keyExtractor={item => String(item.id)}
                    renderItem={ ({item}) => 
                        <ItemListagem 
                            foto={item} 
                            likeCallback={this.like.bind(this)} 
                            comentarioCallback={this.adicionaComentario.bind(this)}
                        />  
                    }
                />
            </View>
        );
    }
}

const margem = Platform.OS == 'ios' ? 20 : 0;

const styles = StyleSheet.create({
    container: {
      marginTop: margem
    }
  })
  