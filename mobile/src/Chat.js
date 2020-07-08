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
import Header from '../src/componts/Header';
import Icons from 'react-native-vector-icons/Ionicons';
import {RNToasty} from 'react-native-toasty';
import Toast from 'react-native-simple-toast';

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatMessage: '',
      chatMessages: [],

      userName: props.route.params.username,
      RoomId: props.route.params.roomId,
      height: 0,
      fontSize: 16,
      customId:''
    };
  }

  componentDidMount() {
    this.socket = io('http://192.168.1.101:3000');

    this.socket.on('chat message', msg => {
      console.log("msg",msg); 

      this.setState({
        chatMessages: [...this.state.chatMessages, msg],
        totalUser: msg.users,
        customId:msg.senderid,
        key:msg.key

      });
    });
  }

  submitChatMessage() {
    if (this.state.chatMessage == '') {
      Toast.show('Please Enter Message....');
    } else {
     
      this.socket.emit('chat message', {
        msg: this.state.chatMessage,
        RoomId: this.state.RoomId,
        customId:'000CustomIdHere0000',
        key:'client'
      });
    
      
      this.setState({chatMessage: ''});
    }
  }

  onChangeText(event) {
    this.setState({
      fontSize: event.nativeEvent.text.length > 6 ? 16 : 16,
      chatMessage: event.nativeEvent.text,
    });
  }

  render() {


    return (
      <SafeAreaView style={styles.container}>
        <Header
          onPress={() => this.props.navigation.goBack(null)}
          username={this.state.userName.substring(0, 1)}
          check = {true}
        />

        <ScrollView>
          <View style={{marginTop:5,marginHorizontal:13}}>
            {this.state.chatMessages.map(chatMessage => (
              <View
                style={{
                   marginVertical: 8,
                   backgroundColor: this.state.customId == this.state.customId ? 'white' :
                   'green',
                   
                   borderRadius:10,
                   //borderWidth:1,
                  //marginHorizontal: 8,
                  alignSelf: 'flex-start',
                }}>
                <Text
                  style={{
                    backgroundColor: 'white',
                    fontFamily:'MerriweatherSans-Regular',
                    fontWeight:'400',
                    padding: 5,
                    margin: 3,
                  }}>
                  {chatMessage.msg}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>

        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 10,
            marginBottom: 20,
          }}>
          <View style={styles.styleInput}>
            <TextInput
              style={[
                styles.txtinput,
                {
                  fontSize: this.state.fontSize,
                  height: Math.max(30, this.state.height),
                },
              ]}
              multiline
              onContentSizeChange={event => {
                this.setState({height: event.nativeEvent.contentSize.height});
              }}
              placeholder="Type a message.."
              value={this.state.chatMessage}
              // onSubmitEditing={() => this.submitChatMessage()}
              onChange={event => this.onChangeText(event)}
            />
          </View>
          <Icons
            onPress={() => this.submitChatMessage()}
            style={{alignSelf: 'center', marginLeft: 20}}
            name="md-send"
            size={30}
            color={'green'}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#F5FCFF',
  },
  styleInput: {
    // flex: 1,
    width: '80%',
    alignSelf: 'flex-end',
    elevation: 3,
    padding: 5,
    borderWidth: 0.3,
    borderRadius: 30,
    borderColor: 'green',

    backgroundColor: '#ffffff',
  },
  txtinput: {
    height: 35,
    fontSize: 13,
    marginStart: 10,
    fontFamily: 'MerriweatherSans-Regular',
    padding: 6,
  },
});
