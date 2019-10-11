import React from 'react';

import ImagePicker from 'react-native-image-picker';
import {View, TouchableOpacity, Text, Image, StyleSheet, PixelRatio} from 'react-native';

export default class CamComponent extends React.Component {

    state = {
        imageSource: null
    }

    constructor(props) {
        super(props);
        this.selectPhoto = this.selectPhoto.bind(this);
    }

    selectPhoto() {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        }


        ImagePicker.showImagePicker(options, response => {
            console.log('Response = ', response)

            if (response.didCancel) {
                console.log('Usuário cancelou!')
            } else if (response.error) {
                console.log("ImagePicker erro: "+response.error)
            } else {
                let source = {uri: response.uri};

                this.setState({imageSource: source})
                console.log('ImageSource: '+this.state.imageSource)
            }
        })
    }

    render() {
        return (
            <View>
                <TouchableOpacity  onPress={this.selectPhoto.bind(this)}>
                    <View style={[styles.img, styles.imgContainer, {marginTop: 30}]}>
                        {this.state.imageSource === null ?
                        <Text>
                            Selecione uma foto!
                        </Text> : 
                        (<Image style={styles.img} source={this.state.imageSource}></Image>)
                        }
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

}


const styles= StyleSheet.create({
    imgContainer: {
        borderColor: '#000',
        borderWidth: 1 / PixelRatio.get(),
        justifyContent: 'center',
        alignItems: 'center'

    },
    img: {
        borderRadius: 75,
        width: 150,
        height: 150
    }
})