import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Feather';
import Icon1 from 'react-native-vector-icons/AntDesign';
import { fetchUser } from '../../authSlice/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@reduxjs/toolkit/query';

const LoginScreen: React.FC = () => {
  const [loginStr, setLoginStr] = useState('emilys');
  const [passwordStr, setPasswordStr] = useState('emilyspass');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [errorchik, setErrorchik]=useState('')
  const navigation = useNavigation();
  const dispatch = useDispatch();

 

  const clickLogin = async () => {
    try {
      const response = await axios.post('https://dummyjson.com/auth/login', { username: loginStr, password: passwordStr });
      
      if (response.data) {
        dispatch(fetchUser({ username: loginStr, password: passwordStr }));
        navigation.navigate('Pin');
      } else {
        setErrorchik('User not found or invalid credentials');
      }
    } catch (error) {
      setErrorchik('Failed to log in. Please try again later.');
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.btnBack}>
        <Icon1 name='left' style={styles.backIcon} />
      </TouchableOpacity>

      <View style={styles.header}>
        <View style={styles.loginHat}>
          <View style={styles.userBack}>
            <Icon1 name='user' style={styles.userIcon} />
          </View>
          <View style={styles.boxText}>
            <Text style={styles.title}>Login</Text>
            <Text style={styles.mainText}>Personal Account</Text>
          </View>
        </View>

        <View style={styles.messageConteiner}>
       
          <View style={styles.inputContainer}>
            <View style={{alignItems: 'center'}}>
          <Text style={styles.errMsg}>{errorchik}</Text>
          </View>
            <Text style={[styles.mainText, { paddingLeft: 16 }]}>Email</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.input, styles.passwordInput]}
                onChangeText={setLoginStr}
                placeholder="email"
                value={loginStr}
              />
            </View>
          </View>
          <View style={styles.inputContainer}>
            
            <Text style={[styles.mainText, { paddingLeft: 16 }]}>Passwords</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.input, styles.passwordInput]}
                onChangeText={setPasswordStr}
                placeholder="password"
                value={passwordStr}
                secureTextEntry={secureTextEntry}
              />
              <TouchableOpacity onPress={() => setSecureTextEntry(!secureTextEntry)} style={styles.eyeIcon}>
                <Icon name={secureTextEntry ? "eye" : "eye-off"} size={20} color={secureTextEntry ? "#FA8A34" : '#7C8594'} />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style={styles.btn} onPress={clickLogin}>
            <Text style={styles.btnText}>Continue</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnLine} onPress={() => navigation.navigate('Registr')}>
            <Text style={styles.createAccount}>Create Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D9D9D9'
  },
  btnBack: {
    marginTop: 80,
    marginLeft: 10,
    padding: 20,
  },
  backIcon: {
    position: 'absolute',
    fontSize: 24,
    color: '#06070A',
  },
  messageConteiner: {
    backgroundColor: '#fff',
    width: '100%',
    paddingHorizontal: 16,
    paddingBottom: '50%',
    borderWidth: 1,
    borderColor: '#EBEFF5',
  },
  header: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 40,
    elevation: 5,
    borderTopLeftRadius: 29,
    borderTopRightRadius: 29,
    flex: 1,
    backgroundColor: '#fff',
    marginTop: '5%',
  },
  loginHat: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    padding: 8,
  },
  boxText: {
    padding: 16,
  },
  userBack: {
    width: 60,
    height: 60,
    backgroundColor: '#F2FAF7',
    borderWidth: 1,
    borderColor: '#E9F7F2',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 16,
    marginBottom: 2,
    color: '#06070A'
  },
  mainText: {
    color: '#606773',
    fontSize: 16,
    marginBottom: 8,
    marginTop: 2,
  },
  inputContainer: {
    marginTop: 20,
  },
  input: {
    height: 56,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    borderRadius: 16,
    fontSize: 16,
    flex: 1,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
  },
  passwordInput: {
    flex: 1,
    height: '100%',
  },
  eyeIcon: {
    padding: 10,
    position: 'absolute',
    right: 10
  },
  userIcon: {
    position: 'absolute',
    fontSize: 24,
    color: '#00A385',
  },
  btn: {
    backgroundColor: '#FA8A34',
    padding: 15,
    alignItems: 'center',
    borderRadius: 16,
    marginTop: 36,
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
  },
  btnLine: {
    margin: 10,
    alignItems: 'center',
  },
  createAccount: {
    color: '#FA8A34',
  },
  errMsg:{
    color: 'red',
  }
});

export default LoginScreen;
