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
  Linking
} from 'react-native';
import io from 'socket.io-client';
import Icons from 'react-native-vector-icons/AntDesign';
import {RNToasty} from 'react-native-toasty';
import database from '@react-native-firebase/database';
import ImagePicker from 'react-native-image-picker';

import { CustomTabs } from 'react-native-custom-tabs';


export default class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prodctName: '',
      amount: '',
      loading: false,
      profilePic: '',
    };
  }

  componentDidMount() {}

  validation = () => {
    if (this.state.prodctName == '') {
      RNToasty.Show({
        title: 'Please Enter Product name',
        titleSize: 16,
        titleColor: '#FFFFFF',
        fontFamily: 'MerriweatherSans-Bold',
        withIcon: false,
        duration: 1,
        tintColor: '#FA8072',
      });
    } else if (this.state.amount == '') {
      RNToasty.Show({
        title: 'Please Enter amount',
        titleSize: 16,
        titleColor: '#FFFFFF',
        fontFamily: 'MerriweatherSans-Bold',
        withIcon: false,
        duration: 1,
        tintColor: '#FA8072',
      });
    } else if (this.state.profilePic == '') {
      RNToasty.Show({
        title: 'Please Select Product image',
        titleSize: 16,
        titleColor: '#FFFFFF',
        fontFamily: 'MerriweatherSans-Bold',
        withIcon: false,
        duration: 1,
        tintColor: '#FA8072',
      });
    } else {
      this.setState({prodctName: '', amount: '', profilePic: ''});
      database()
        .ref('/users')
        .push()
        .set({
          prouct: this.state.prodctName,
          amount: this.state.amount,
          profilePic: this.state.profilePic,
        })
        .then(() =>
          RNToasty.Show({
            title: 'Data Save Successfully',
            titleSize: 16,
            titleColor: '#FFFFFF',
            fontFamily: 'MerriweatherSans-Bold',
            withIcon: false,
            duration: 1,
            tintColor: '#228B22',
          }),
        );
    }
  };

  chooseImage() {
    const options = {
      title: 'Select Image',
      //customButtons: [{ name: 'Camera', title: 'Choose Photo from Gallary' }],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};

        console.log('source', source);
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          profilePic: source,
        });
      }
    });
  }

  // openGoogle() {
  //  // Linking.openURL('https://www.google.com')
  //  CustomTabs.openURL('https://www.google.com')
  //     .then(launched => {
  //       console.log(`Launched custom tabs: ${launched}`);
  //     })
  //     .catch(err => {
  //       console.error(err);
  //     });
  // }


  render() {
    

    return (
      <SafeAreaView>
        <ScrollView>
          <View>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => this.chooseImage()}
              style={{
                width: 90,
                height: 90,
                borderRadius: 90 / 2,
                borderWidth: 1,
                borderColor: 'white',
                alignSelf: 'center',
              }}>
              {this.state.profilePic == '' ? (
                <Icons name="pluscircle" size={90} color="#4DCB00" />
              ) : (
                <Image
                  style={{
                    alignSelf: 'center',
                    width: 90,
                    height: 90,
                    borderRadius: 90 / 2,
                    borderWidth: 1,
                    borderColor: 'white',
                  }}
                  source={this.state.profilePic}
                />
              )}
            </TouchableOpacity>

            <View style={styles.viewTxtinput}>
              <TextInput
                placeholder="Enter product Name"
                style={styles.txtinput}
                value={this.state.prodctName}
                onChangeText={prodctName => this.setState({prodctName})}
              />
              <TextInput
                placeholder="Enter Amount"
                style={[styles.txtinput, {marginTop: 15}]}
                value={this.state.amount}
                onChangeText={amount => this.setState({amount})}
              />

              <TouchableOpacity
                activeOpacity={0.7}
                //onPress={() => this.props.navigation.navigate('Chat')}
                onPress={this.validation}
                style={{
                  backgroundColor: 'green',
                  marginHorizontal: 40,
                  //width: 45,
                  // height: 45,
                  borderRadius: 6,
                  //alignSelf: 'flex-end',
                  marginTop: 40,
                }}>
                <Text
                  style={{alignSelf: 'center', color: 'white', padding: 10}}>
                  Submit
                </Text>
                {/* <Icons
                  style={{alignSelf: 'center', padding: 12}}
                  name="arrowright"
                  color="white"
                  size={20}
                /> */}
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        <Text
          onPress={() => this.props.navigation.navigate('ProductList')}
          style={{
            marginTop: 20,
            // backgroundColor:'green',
            marginHorizontal: 30,
            alignSelf: 'center',
            fontSize: 18,
          }}>
          open product list{' '}
        </Text>
      </SafeAreaView>

      

    );
  }
}



const styles = StyleSheet.create({
  txtinput: {
    width: 320,
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'gray',
    fontFamily: 'MerriweatherSans-Bold',
  },
  viewTxtinput: {marginHorizontal: 20, alignSelf: 'center', marginTop: 50},
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  link: {
    color: 'crimson',
  }
});
