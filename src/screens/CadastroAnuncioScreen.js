import React from 'react'
import {View, SafeAreaView, ScrollView, StyleSheet} from 'react-native'
import { withNavigation } from 'react-navigation'
import CheckBox from 'react-native-check-box';
import { Text } from 'react-native-elements';
import { Icon } from 'native-base';

export default class CadastroAnuncioScreen extends React.Component {

    static navigationOptions = {
        drawerIcon: ({ tintColor }) => (
            <Icon name="bookmarks" style={{ fontSize: 24, color: tintColor }} />
        )
    }

    constructor() {
        super();
        this.state = {
        }
    }

    render(){
        return(
            <SafeAreaView style={{flex: 1, backgroundColor: '#bacbe4'}}>
                <ScrollView style={styles.container} >              
                    <Text h4 style={{marginLeft: '5%'}}>Cadastro</Text>
                    <View style={styles.separator} />
                    <View style={{flexDirection: 'row', marginLeft: '5%'}}>
                        
                    </View>
                    
                    
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
        width: '90%',
        marginLeft: '5%'
    }
})