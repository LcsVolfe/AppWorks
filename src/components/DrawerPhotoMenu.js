import React from 'react'
import { Platform, StyleSheet, Text, View, SafeAreaView, ScrollView, Dimensions, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { DrawerNavigatorItems} from 'react-navigation-drawer';

export default class DrawerPhotoMenu extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            foto: '../../resources/img/no-image.png'
        }
    }
    componentDidMount() {
        AsyncStorage.getItem('foto').then(value =>{
            (value) ?
                this.setState({foto: value}):
                null
        });
    }

    render() {
        let foto = `data:image/png;base64,${this.state.foto}`;
        return (
                // <Image source={{uri: foto}} style={styles.image}></Image>
            // <View style={styles.image}>
            //     {/* <Image source={{uri: `data:image/png;base64,${foto}`}} style={styles.image}></Image> */}
            <Image source={require('../../resources/img/no-image.png')} style={styles.image}></Image>

            // </View>
           
        )
    }

}


const styles = StyleSheet.create({    
    imgMenu: { 
        height: 150, 
        width: 150, 
        borderRadius: 100 
    },
})
