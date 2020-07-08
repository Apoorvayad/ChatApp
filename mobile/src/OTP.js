import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Keyboard,
  Platform,
  StatusBar,
  TextInput,
  Image,
} from 'react-native';
import firebase from '@react-native-firebase/app';

export default class OTP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone:'+917289073906',
      confirmResult: null,
      verificationCode: '',
      userId: '',
    };
  }

  componentDidMount() {
   // this.handleSendCode();
  }

  validatePhoneNumber = () => {
    console.log("validatePhoneNumber called")
    var regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/;
    return regexp.test(this.state.phone);

  };

  handleSendCode = () => {
    // Request to send OTP
    if (this.validatePhoneNumber()) {
      console.log("within handleSendCode")
      firebase
        .auth()
        .signInWithPhoneNumber(this.state.phone)
        .then(confirmResult => {
          this.setState({confirmResult})
          console.log("confirmResult",confirmResult);
        })
        .catch(error => {
          alert(error.message);

          console.log(error);
        });
      }
  };

  handleVerifyCode = () => {
    // Request for OTP verification
    const {confirmResult, verificationCode} = this.state;
    if (verificationCode.length == 6) {
      confirmResult
        .confirm(verificationCode)
        .then(user => {
          this.setState({userId: user.uid});
          alert(`Verified! ${user.uid}`);
        })
        .catch(error => {
          alert(error.message);
          console.log(error);
        });
    } else {
      alert('Please enter a 6 digit OTP code.');
    }
  };

  render() {
    return (
      <SafeAreaView>
        <View style={styles.verificationView}>

        <Text onPress = {()=>this.handleSendCode() } style = {{backgroundColor:'green',padding:20,color:'white'}}>Send OTP</Text>

          <TextInput
            style={styles.textInput}
            placeholder="Verification code"
            placeholderTextColor="#eee"
            value={this.state.verificationCode}
            keyboardType="numeric"
            onChangeText={verificationCode => {
              this.setState({verificationCode});
            }}
            maxLength={6}
          />
          <TouchableOpacity
            style={[styles.themeButton, {marginTop: 20}]}
            onPress={this.handleVerifyCode}>
            <Text style={styles.themeButtonTitle}>Verify Code</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#aaa'
    },
    page: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    textInput: {
      marginTop: 20,
      width: '90%',
      height: 40,
      borderColor: '#555',
      borderWidth: 2,
      borderRadius: 5,
      paddingLeft: 10,
      color: '#fff',
      fontSize: 16
    },
    themeButton: {
      width: '90%',
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#888',
      borderColor: '#555',
      borderWidth: 2,
      borderRadius: 5
    },
    themeButtonTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#fff'
    },
    verificationView: {
      width: '100%',
      alignItems: 'center',
      marginTop: 50
    }
  })
