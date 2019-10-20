import React from 'react'
import {View, SafeAreaView, ScrollView, StyleSheet} from 'react-native'
import { withNavigation } from 'react-navigation'
import CheckBox from 'react-native-check-box';
import CadastroUsuarioComponent from '../components/Page/CadastroUsuarioComponent';
import CadastroPestadorComponent from '../components/Page/CadastroPestadorComponent';
import { Text } from 'react-native-elements';

export default class CadastroScreen extends React.Component {

    constructor() {
        super();
        this.state = {
            formUsuario: true,
            formPrestador: false,
        }
    }

    render(){
        return(
            <SafeAreaView style={{flex: 1, backgroundColor: '#bacbe4'}}>
                <ScrollView style={styles.container} >              
                    <Text h4 style={{marginLeft: '5%'}}>Cadastro</Text>
                    <View style={styles.separator} />
                    <View style={{flexDirection: 'row', marginLeft: '5%'}}>
                        <CheckBox
                            style={styles.checkBox}
                            leftTextStyle={{flex: 0}}
                            onClick={()=>{
                            this.setState({
                                formUsuario:!this.state.formUsuario,
                                formPrestador: this.state.formUsuario
                            })
                            }}
                            isChecked={this.state.formUsuario}
                            leftText={"Pessoa Física"}
                        />
                        <CheckBox
                            leftTextStyle={{flex: 0}}
                            style={styles.checkBox}
                            onClick={()=>{
                            this.setState({
                                formPrestador:!this.state.formPrestador,
                                formUsuario: this.state.formPrestador
                            })
                            }}
                            isChecked={this.state.formPrestador}
                            leftText={"Pessoa Jurídica"}
                        />
                    </View>
                    
                    {this.state.formUsuario === true ?
                        <CadastroUsuarioComponent navigation={this.props.navigation} />:
                        <CadastroPestadorComponent navigation={this.props.navigation} />
                    }
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