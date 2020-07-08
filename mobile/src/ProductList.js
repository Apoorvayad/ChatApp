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
  FlatList,
  Alert,
} from 'react-native';
import io from 'socket.io-client';
import Icons from 'react-native-vector-icons/AntDesign';
import {RNToasty} from 'react-native-toasty';
import database from '@react-native-firebase/database';
import Header from '../src/componts/Header';
import ProgressDialog from '../src/componts/ProgressDialog';
import {SearchBar} from 'react-native-elements';

export default class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: [],
      loading: false,
      data: [],
      filteredData: [],
      searchText: '',
    };
  }

  componentDidMount() {
    this.getFirebaseData();
  }

//   search = searchText => {
//     this.setState({searchText: searchText});

//     let filteredData = this.state.data.filter(function(item) {
//       return item.product.includes(searchText);
//     });

//     this.setState({listData: filteredData});
//   };

  getFirebaseData() {
    this.setState({loading: true});
    database()
      .ref('users')
      .once('value')
      .then(snapshot => {
        this.setState({loading: false});
        var items = [];
        snapshot.forEach(child => {
          items.push({
            id: child.key,
            product: child.val().prouct,
            amount: child.val().amount,
            Image: child.val().profilePic,
           
          });
        });
        console.log('items', items);
        this.setState({listData: items}, () =>
          console.log('updated state', items),
        );
      });
  }
  _remderItem = ({item}) => {
    
    return (
      <TouchableOpacity
       onPress ={()=> alert(item.Image.uri)}
        style={{
          backgroundColor: '#F8F8F8',
          //justifyContent: 'center',
          // alignItems: 'center',
          borderRadius: 7,
          height: 80,
          padding: 8,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.6,
          marginBottom: 10,
          elevation: 8,
          position: 'relative',
        }}>
        <View style={{flexDirection: 'row'}}>
          <Image
            style={{
              width: 70,
              height: 70,
              borderRadius: 70 / 2,
              borderWidth: 1,
              borderColor: 'white',
            }}
            source={item.Image}
          />
          <View style={{marginStart: 10, flex: 1}}>
            <View
              style={{justifyContent: 'space-between', flexDirection: 'row'}}>
              <Text style={{padding: 4, fontSize: 16}}>
                Product Name: {item.product}
              </Text>
              <Icons
                onPress={() => this.handleRemove(item)}
                name="delete"
                size={20}
                style={{marginRight: 10}}
              />
            </View>

            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                marginTop: 10,
              }}>
              <Text style={{padding: 3, fontSize: 16}}>
                Amount: {item.amount}
              </Text>
              <Icons
                onPress={() => this.props.navigation.navigate('Test')}
                name="adduser"
                size={25}
                style={{marginRight: 10}}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  deleteItem(data) {
    let allItems = [...this.state.listData];
    let filteredItems = allItems.filter(item => item.id != data.id);
    this.setState({listData: filteredItems});
    database()
      .ref('users')
      .child(data.id)
      .set(null);
  }

  handleRemove(data) {
   // console.log('id', id);

    Alert.alert(
      'Do You want to delete this item',
      '',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => this.deleteItem(data)},
      ],
      {cancelable: false},
    );

    // return database().ref('users').child(id) .set(null);
  }

  render() {
    console.log(this.state.listData);

    return (
      <SafeAreaView style={{flex: 1}}>
        <Header
          onPress={() => this.props.navigation.goBack(null)}
          username="Product List"
          txt={true}
        />

        <View
          style={{
           
           
            marginTop: 10,
            marginHorizontal: 16,
          }}>
          {/* <SearchBar
          
            round={false}
            lightTheme={true}
            placeholder="Search..."
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={this.search}
            value={this.state.searchText}
          /> */}
        </View>

        <View style={{marginHorizontal: 20, marginVertical: 20, flex: 1}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            //data={this.state.listData}
            data={this.state.listData && this.state.listData.length > 0 ? this.state.listData : this.state.data}

            renderItem={this._remderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        {/* {this.state.listData.map((item, index) => {
          return <Text key={index}>{item.product}</Text>;
        })} */}

        <ProgressDialog loading={this.state.loading} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({});
