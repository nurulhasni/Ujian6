import React, { Component } from 'react'
import {View} from 'react-native'
import styles from './style'
import { Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {Picker} from '@react-native-picker/picker'
import database from '@react-native-firebase/database';


export default class EditUser extends Component {

constructor(props){
    super(props)
    this.state = ({
    
      gender: '',
     
      status:'',
      tes : {},
      userkey : []
    })
  }

  componentDidMount(){
       database()
        .ref('users')
        .once('value', (snapshot) => {
         let data = snapshot.val() ? snapshot.val() : {};
        let usertes = {...data};

        this.setState({
        tes : usertes,
        userkey : Object.keys(usertes)
        
    })
  })
  }

updateFunction(nama, gender, umur, status){
    let id = this.state.userkey
    database()
    .ref('users/')
    .update({
      nama : this.state.nama,
      gender : this.state.gender,
      umur : this.state.umur,
      status : this.state.status
    })
    .then(() => console.log('Data updated.'));
  }



    render() {
        console.log('key : ', this.state.userkey)
        return (
            <View style={styles.container}>
            <KeyboardAwareScrollView
              style={{flex: 1, width: '100%'}}
              keyboardShouldPersistTaps="always">
             
              <TextInput
                style={styles.input}
                placeholder="Nama"
                placeholderTextColor="#aaaaaa"
               
               
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                onChangeText = {(nama)=> this.setState({nama})}
              />
              <Picker
               selectedValue={this.state.gender}
                style={styles.input}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ gender: itemValue })
                }
                underlineColorAndroid="transparent"
                autoCapitalize="none">
                <Picker.Item label="Pilih Gender" value=" " color="#aaaaaa"/>
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Female" value="female" />
              </Picker>
              <TextInput
                style={styles.input}
                placeholder="Umur"
                placeholderTextColor="#aaaaaa"
               
               
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                onChangeText = {(umur)=> this.setState({umur})}
              />
              <Picker
                selectedValue={this.state.status}
                style={styles.input}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ status: itemValue })
                }
                underlineColorAndroid="transparent"
                autoCapitalize="none">
                <Picker.Item label="Status" value=" " color="#aaaaaa"/>
                <Picker.Item label="Single" value="single" />
                <Picker.Item label="Married" value="married" />
              </Picker>
              <TouchableOpacity
                 onPress = {()=>this.updateFunction()}
                style={styles.button}>
                <Text style={styles.buttonTitle}>Update</Text>
              </TouchableOpacity>
                </KeyboardAwareScrollView>
            </View>
        )
    }
}
