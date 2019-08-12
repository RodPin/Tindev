import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, Image, StyleSheet, View } from 'react-native';
import logo from '../assets/logo.png';
import { TouchableOpacity } from 'react-native-gesture-handler';
import like from '../assets/like.png';
import dislike from '../assets/dislike.png';
import api from '../services/api';
export default function Main({navigation}) {
  const id = navigation.getParam('userid')
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await api.get('/devs', {headers: {user:id}});
        setUsers(response.data);
      } catch (e) {
        console.log(e);
      }
    }
    loadUsers();
  }, [id]);

  async function handleDislike(id) {
    await api.post('/devs/' + id + '/dislikes', null, {headers: {user:id}});
    setUsers(users.filter(user => user._id !== id));
  }
  async function handleLike(id) {
    await api.post('/devs/' + id + '/likes', null, {headers: {user:id}});
    setUsers(users.filter(user => user._id !== id));
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <Image source={logo} />
      <View style={styles.cardContainer}>
      {users.length==0 ?<Text style={styles.empty}>Acabou :(</Text>:
    users.map((user,i)=>(
      <View style={[styles.card,{zIndex:users.length-i}]} key={user._id}>
        <Image
          style={styles.avatar}
          source={{
            uri: user.avatar
          }}
        />
        <View style={styles.footer}>
          <Text style={styles.name}>{user.name}</Text>
          <Text numberOfLine s={3} style={styles.bio}>
            {user.bio}
          </Text>
        </View>
      </View>
    ))}
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button}>
          <Image source={dislike} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Image source={like} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  cardContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    maxHeight: 500,
  },
  card: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    margin: 30,
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  avatar: {
    flex: 1,
    height: 300,
  },
  logo: { marginTop: 30 },
  footer: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333'
  },
  bio: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
    lineHeight: 18,
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    //android
    elevation: 2,
    //ios
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 2,
    }
  },empty:{
    alignSelf:'center',color:'#999',fontSize:24,fontWeight:'bold'
  }
});
