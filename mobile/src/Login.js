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
import io from 'socket.io-client';
import Icons from 'react-native-vector-icons/AntDesign';
import {RNToasty} from 'react-native-toasty';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      room_id: '',
      username: '',
    };
  }

  componentDidMount() {}

  validation = () => {
    if (this.state.room_id == '') {
      RNToasty.Show({
        title: 'Please Enter Room Id',
        titleSize: 16,
        titleColor: '#FFFFFF',
        fontFamily: 'MerriweatherSans-Bold',
        withIcon: false,
        duration: 1,
        tintColor: '#FA8072',
      });
    } else if (this.state.username == '') {
      RNToasty.Show({
        title: 'Please Enter UserName',
        titleSize: 16,
        titleColor: '#FFFFFF',
        fontFamily: 'MerriweatherSans-Bold',
        withIcon: false,
        duration: 1,
        tintColor: '#FA8072',
      });
    } else {
      this.props.navigation.navigate('Chat', {
        username: this.state.username,
        roomId: this.state.room_id,
      });
    }
  };

  render() {
    return (
      <SafeAreaView>
        <ScrollView>
          <View>
            <Image
              style={{
                width: 130,
                height: 130,
                alignSelf: 'center',
                marginTop: 50,
              }}
              source={require('../src/assets/chat.gif')}
            />

            <View style={styles.viewTxtinput}>
              <TextInput
                placeholder="Enter Room ID"
                style={styles.txtinput}
                value={this.state.room_id}
                onChangeText={room_id => this.setState({room_id})}
              />
              <TextInput
                placeholder="Enter Username"
                style={[styles.txtinput, {marginTop: 15}]}
                value={this.state.username}
                onChangeText={username => this.setState({username})}
              />

              <TouchableOpacity
                activeOpacity={0.7}
                //onPress={() => this.props.navigation.navigate('Chat')}
                onPress={this.validation}
                style={{
                  backgroundColor: 'green',
                  width: 45,
                  height: 45,
                  borderRadius: 50 / 2,
                  alignSelf: 'flex-end',
                  marginTop: 40,
                }}>
                <Icons
                  style={{alignSelf: 'center', padding: 12}}
                  name="arrowright"
                  color="white"
                  size={20}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
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
});
