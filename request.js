// import React from 'react'
// import {FlatList, Text, View, TextInput, TouchableHighlight} from 'react-native'
// import { TouchableOpacity } from 'react-native-gesture-handler';

// export default class Heroes extends React.Component{

//     state = {
//         heroes:[],
//         hero: {id: null, nome: ''}
//     }

//     constructor(props){
//         super(props)

//         this.getHeroes();
//     }
    
//     getHeroes(){
//         fetch(
//             'http://crs.unochapeco.edu.br/crs-api/public/heroes',
//             {
//                 method: 'GET',
//                 headers:{
//                     Accept: 'application/json'
//                 }
//             }            
//         )
//         .then((response) => response.json())
//         .then((responseJson) => {
//             console.log(responseJson)
//             this.setState({heroes: responseJson})
//         })
//         .catch((error) => {
//             console.log(error)
//         })
//     }

//     createHero(){
//         fetch(
//             'http://crs.unochapeco.edu.br/crs-api/public/heroes',
//             {
//                 method: 'POST',
//                 headers: {
//                     Accept: 'application/json',
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(this.state.hero)
//             }
//         ).then((response) => response.json())
//         .then((responseJson) => {
//             console.log(responseJson)
//         }).catch((error) =>{
//             console.log(error)
//         })
//     }


//     updateHero(){
//         fetch(
//             'http://crs.unochapeco.edu.br/crs-api/public/heroes',
//             {
//                 method: 'PUT',
//                 headers: {
//                     Accept: 'application/json',
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(this.state.hero)
//             }
//         ).then((response) => response.json())
//         .then((responseJson) => {
//             this.getHeroes();
//         }).catch((error) =>{
//             console.log(error)
//         })
//     }    

//     deleteHero(id){
//         fetch(
//             'http://crs.unochapeco.edu.br/crs-api/public/heroes/'+id,
//             {
//                 method: 'DELETE',
//                 headers: {
//                     Accept: 'application/json',                    
//                 },                
//             }            
//         ).then((response) => {
//             this.getHeroes();
//             console.log
//         })
//     }

//     render(){
//         return(
//             <View>
//                 <Text>Heroes</Text>
//                 <TextInput 
//                     placeholder="Nome do Heroi"
//                     onChangeText={(text) => {
//                         let hero = {id: null, nome: text}                                               
//                         this.setState({hero: hero})
//                     }}
//                 />
//                 <TouchableHighlight onPress={() =>{ 
//                     if (this.state.hero.id === null){
//                         this.createHero()
//                     }else{
//                         this.updateHero(this.state.hero.id)
//                     }
//                     }} 
//                 >
                    
//                     <Text>Salvar</Text>
//                 </TouchableHighlight>
//                 {/* <FlatList 
//                     data={this.state.heroes}
//                     renderItem={(i) => {
//                         console.log(i);
//                         return(
//                             <TouchableOpacity onPress={()=>{
//                                 this.setState
//                             }}
//                     keyExtractor={(item, index) => index.toString()}                      
                    
//                 />                     */}
//             </View>
//         )
//     }
// }