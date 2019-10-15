import React from 'react'
import { Text, View, FlatList, StyleSheet, Platform, ToastAndroid, Button } from 'react-native'
import ItemListagem from './lista/ItemListagem'
import AsyncStorage from '@react-native-community/async-storage';
import InstaluraFetchService from '../services/InstaluraFetchService'


const Toast = (props) => {
    if (props.visible) {
      ToastAndroid.showWithGravityAndOffset(
        props.message,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        25,
        150,
      );
      return null;
    }
    return null;
};

export default class Component1 extends React.Component {

    constructor() {
        super();
        this.state = {
            fotos: [],
            visible: false,
        }
    }    

    handleButtonPress = () => {
        this.setState(
            {
                visible: true,
            },
            () => {
                this.hideToast();
            },
        );
      };
    
    hideToast = () => {
        this.setState({
            visible: false,
        });
    };
    
    componentDidMount() {
        InstaluraFetchService.get('fotos')
            .then(json => this.setState({fotos: json}))
    }

    like(idFoto){
        const listaOriginal = this.state.fotos;
        const foto = this.state.fotos.find(foto => foto.id === idFoto);
        
        AsyncStorage.getItem('usuario')
            .then(usuarioLogado => {
                let novaLista = [];              
                if(!foto.likeada){
                    novaLista = [
                        ...foto.likers,
                        {login: usuarioLogado}
                    ];
                } else{
                    novaLista = foto.likers.filter(liker => {
                        return liker.login !== usuarioLogado;
                    })
                }

                return novaLista;
            })
            .then(novaLista => {
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
            })
            this.handleButtonPress()

        InstaluraFetchService.post(`fotos/${idFoto}/like`)
            .catch(e => {
                this.setState({fotos: listaOriginal})
                this.handleButtonPress()
            });        
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

    verPerfilCallback() {
        this.props.navigation.navigate('Component3')
    }

    render() {
        return (
            <View>
                <View style={styles.container}>
                    <Toast visible={this.state.visible} message="Example" />
                </View>

                <FlatList style={styles.container}
                    //data={fotos}
                    data={this.state.fotos}
                    keyExtractor={item => String(item.id)}
                    renderItem={ ({item}) => 
                        <ItemListagem 
                            foto={item} 
                            likeCallback={this.like.bind(this)} 
                            comentarioCallback={this.adicionaComentario.bind(this)}
                            verPerfilCallback={this.verPerfilCallback.bind(this)}
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
  