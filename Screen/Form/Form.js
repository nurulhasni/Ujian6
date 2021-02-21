import React, {Component} from 'react';
import {View} from 'react-native';
import styles from './style';
import {Text, TextInput, TouchableOpacity, Alert, Image} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Picker} from '@react-native-picker/picker';
import database from '@react-native-firebase/database';
import EditUser from '../User/User';
import * as ImagePicker from 'react-native-image-picker';
import Geolocation from '@react-native-community/geolocation';

export default class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nama: '',
      umur: '',
      gender: '',
      status: '',
      lokasi: '',
      uri: '',
      fileImage: null,
      long : '',
      lati : ''
    };
  }

  dataform = () => {
    database()
      .ref('users/')
      .push({
        nama: this.state.nama,
        gender: this.state.gender,
        umur: this.state.umur,
        status: this.state.status,
        uri: this.state.uri,
      })
      .then((data) => {
        this.props.navigation.navigate('User');
        Alert.alert('Sukses', 'Mengirim Data');
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  requestPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ]);
        // If Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else {
      return true;
    }
  };

  requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.PERMISSIONS_CAMERA,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ]);

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission given');
        this.captureCamera();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  pickImage = () => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 200,
        maxWidth: 200,
      },
      (response) => {
        console.log(response);
        this.setState({uri: response.uri});
        this.setState({fileImage: response});
      },
    );
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
        this.setState({uri: response.uri});
        this.setState({fileImage: response});
      },
    );

  
     
  getLocation=()=>{
    if(this.hasLocationPermission){
     Geolocation.getCurrentPosition(
    (info) => {
    const {coords} = info;

    
    this.setState({
      lati : info.coords.latitude,
      long : info.coords.longitude
    })
    this.setState({
      lokasi : this.state.lati + this.state.long
    })
    
    console.log(this.state.lokasi)


            
    },
   (error) => console.log(error),
     {
       enableHighAccuracy: false,
       timeout: 2000,
       maximumAge: 3600000,
      },
  );
    }
  } 

  
  
  
  
    
  

  render() {
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
            onChangeText={(nama) => this.setState({nama})}
          />
          <Picker
            selectedValue={this.state.gender}
            style={styles.input}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({gender: itemValue})
            }
            underlineColorAndroid="transparent"
            autoCapitalize="none">
            <Picker.Item label="Pilih Gender" value=" " color="#aaaaaa" />
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
          </Picker>
          <TextInput
            style={styles.input}
            placeholder="Umur"
            placeholderTextColor="#aaaaaa"
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            onChangeText={(umur) => this.setState({umur})}
          />
          <Picker
            selectedValue={this.state.status}
            style={styles.input}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({status: itemValue})
            }
            underlineColorAndroid="transparent"
            autoCapitalize="none">
            <Picker.Item label="Status" value=" " color="#aaaaaa" />
            <Picker.Item label="Single" value="single" />
            <Picker.Item label="Married" value="married" />
          </Picker>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image source={this.state.fileImage} />
          </View>
          <TouchableOpacity style={styles.button} onPress={this.captureCamera}>
            <Text style={styles.buttonTitle}>Take Picture</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.pickImage}>
            <Text style={styles.buttonTitle}>Pick Image</Text>
          </TouchableOpacity>
          <View>

          <TextInput
            style={styles.input}
            placeholder="Umur"
            placeholderTextColor="#aaaaaa"
            underlineColorAndroid="transparent"
            autoCapitalize="none">{this.state.lati}, {this.state.long}
            </TextInput> 
          <TouchableOpacity style={styles.button} onPress={this.getLocation}>
            <Text style={styles.buttonTitle}>Get Location</Text>
          </TouchableOpacity>
          </View>
          
          <TouchableOpacity onPress={this.dataform} style={styles.button}>
            <Text style={styles.buttonTitle}>Send Data</Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </View>
    );
  }

  hasLocationPermission = async () => {
    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location permission denied by user.',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location permission revoked by user.',
        ToastAndroid.LONG,
      );
    }

    return false;
  };
}
