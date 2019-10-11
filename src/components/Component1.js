import React from 'react'
import { Text, View, FlatList, StyleSheet } from 'react-native'
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


    render() {
        return (
            <View>
                <Text>xxxxxxxxx</Text>
                <FlatList style={styles.container}
                    //data={fotos}
                    data={this.state.fotos}
                    keyExtractor={item => String(item.id)}
                    renderItem={ ({item}) => 
                        <ItemListagem foto={item} />  
                    }
                />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
      marginTop: 20
    }
  })
  