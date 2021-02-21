import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Alert,
  Image,
  FlatList,
  TouchableOpacity
} from 'react-native';
import styles from './style'
import database from '@react-native-firebase/database';
import EditUser from '../EditUser/EditUser';
import * as ImagePicker from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';


class User extends Component {

constructor(props) {
    super(props);
    this.state = {
      tes : {},
      userkey : [],
      
    };
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


 goToEdit = () =>{
    console.log("Test Button")
   this.props.navigation.navigate('Edit User')
  }




   render() {

  const {tes, userkey} = this.state
     
     
    return (
            
            <View >
            {userkey.length > 0 ? (
             userkey.map((key) => (
            
            <View style={styles.box}>
                
             <Image style={styles.image} source={{uri: tes[key].uri}} />
              <View style={styles.boxContent}>
                <Text key={key} style={styles.title}>{tes[key].nama}</Text>
                <Text style={styles.description}>{tes[key].gender} / {tes[key].umur} Tahun</Text>
               
              </View>
               <TouchableOpacity style={[styles.button, styles.view]} onPress={this.goToEdit}>
                  <Image style={styles.icon} source={require('../../assets/edit.png')}/>
                </TouchableOpacity>
                 </View>
                    ))
                ) :(<Text>Kosong</Text>)}
            </View>  
           

            
          
        
    );
  }
}

// var starCountRef = database().ref(this.state.nama);
// starCountRef.on('value', (snapshot) => {
//   const data = snapshot.val();
//   updateStarCount(postElement, data);
// });

export default User
