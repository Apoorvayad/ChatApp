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
import Icons from 'react-native-vector-icons/AntDesign';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';

export default class Header extends Component {
  render() {
    return (
      <SafeAreaView>
        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            height: 45,
            justifyContent: 'space-between',
            backgroundColor: 'green',
            flexDirection: 'row',
          }}>
          <Icons
            onPress ={this.props.onPress}
            style={{alignSelf: 'center', padding: 12}}
            name="arrowleft"
            color = "white"
            size={20}
          />
         
       {this.props.check == true ? <View style = {{width:40,height:40,backgroundColor:'white',borderRadius:20,marginTop:2}}>
          <Text style ={{textAlign:'center',textAlignVertical:'center',fontSize:18,fontFamily:'MerriweatherSans-Bold',padding:8}}>{this.props.username}</Text>
          </View>:null } 
          
         {this.props.txt == true ?  <Text style ={{textAlign:'center',textAlignVertical:'center',fontSize:18,fontFamily:'MerriweatherSans-Bold',padding:8,color:"white"}}>Product List</Text> :null }



          <Material
            style={{alignSelf: 'center', padding: 12}}
            name="dots-vertical"
            color = "white"
            size={25}
          />
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}
