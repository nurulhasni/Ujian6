
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';

import storage from '@react-native-firebase/storage';

import React, { Component } from 'react'



export default class Picture extends Component {
constructor(props){
  super(props);
  this.state = {
    downloadUrl :"",
    uri:"",
    fileImage : null
  }
}








  
     requestCameraPermission = async () => {
        try {
          const granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.PERMISSIONS_CAMERA,
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,

          ])
           
        
          if (granted === PermissionsAndroid.RESULTS.GRANTED ) {
            console.log("Camera permission given");
            this.captureCamera();
            
          } else {
            console.log("Camera permission denied");
          }
        } catch (err) {
          console.warn(err);
        }
      };

    captureCamera = () =>

    
      ImagePicker.launchCamera(
          {
              mediaType: 'photo',
              includeBase64: false,
              maxHeight: 200,
              maxWidth: 200,
             
          },
          (response) => {
              console.log(response);
              this.setState({uri: response.uri})
              this.setState({fileImage:response})
              
              
          },
      )


    pickImage = () =>{
      ImagePicker.launchImageLibrary(
          {
              mediaType: 'photo',
              includeBase64: false,
              maxHeight: 200,
              maxWidth: 200,
             
          },
          (response) => {
              console.log(response);
              this.setState({uri: response.uri})
              this.setState({fileImage:response})
              
              
          },
      )
    }


  render() {
    return (
      <View style={styles.screen}>
      <Text style={styles.title}>Firebase Storage</Text>
      <View>
        <TouchableOpacity style={styles.button} onPress={this.captureCamera}>
          <Text style={styles.buttonText}>Take Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Record Video</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={this.pickImage}>
          <Text style={styles.buttonText}>Pick a Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Pick a Video</Text>
        </TouchableOpacity>
      </View>
      <Image source={this.state.fileImage}/>
    </View>
    )
  }
}



const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 35,
    marginVertical: 40,
  },
  button: {
    backgroundColor: '#47477b',
    color: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 50,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
  },
});
