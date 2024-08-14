import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Feather';
import TouchID from 'react-native-touch-id';
import * as Keychain from 'react-native-keychain';
import { useSelector } from 'react-redux';


const optionalConfigObject = {
  title: 'Authentication Required', 
  color: '#e00606', 
  fallbackLabel: 'Show Passcode', 
  unifiedErrors: false, 
  passcodeFallback: false, }

export default function PinScreen() {
  console.log(Keychain.setGenericPassword('bob', '000'))
  const [pin, setPin] = useState('');
  const [pinConfirmation, setPinConfirmation] = useState('');
  const [pinEntryPhase, setPinEntryPhase] = useState('create');
  const navigation = useNavigation();
  let isValidPin = false;
  let isReapet = false;
  const user = useSelector((state)=>state.user)

  const handlePinPress = (value: string) => {
    if (pin.length < 5) {
      setPin(pin + value);
    }
  };

  const handleDelete = () => {
    setPin(pin.slice(0, -1));
  };

  const renderPinCircles = () => {
    const circles = [];
    for (let i = 0; i < 5; i++) {
      circles.push(
        <View key={i} style={[styles.circle, i < pin.length && styles.filledCircle]} />
      );
    }
    return circles;
  };

  const handleContinue = () => {
    const token = user.user.token
    if (pinEntryPhase === 'create') {
      setPinConfirmation(pin);
      setPin('');
      setPinEntryPhase('repeat');
    } else if (pinEntryPhase === 'repeat') {
      if (pin === pinConfirmation) {
        savePin(pin, token);
        // handleBiometricAuth()
        navigation.navigate('HomeTabs');
      } else {
        alert('PINs do not match. Please try again.');
        setPin('');
        setPinConfirmation('');
        setPinEntryPhase('create');
      }
    }
  };
  const savePin = async(pin, token) =>{
    console.log(pin, token)
    await Keychain.setGenericPassword(pin, token).then(() => {
      console.log('Credentials saved successfully!');
    });;

    try {
      // Retrieve the credentials
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        console.log(
          'Credentials successfully loaded for user ' + credentials.username
        );
      } else {
        console.log('No credentials stored');
      }
    } catch (error) {
      console.log("Keychain couldn't be accessed!", error);
    }
    
  }

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconHeader}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.btnBack}>
            <Icon1 name='left' style={styles.backIcon} />
          </TouchableOpacity>
          <View style={styles.iconContainer}>
            <Icon2 name='smartphone' style={styles.iconText} />
          </View>
        </View>
        <Text style={styles.title}>{pinEntryPhase === 'create' ? 'Create a Pin code' : 'Repeat a Pin Code'}</Text>
        <Text style={styles.subtitle}>Enter 5 digit code:</Text>
        <View style={styles.pinContainer}>
          {renderPinCircles()}
        </View>
      </View>
      <View style={styles.keyboardContainer}>
        <View style={styles.row}>
          {[1, 2, 3].map(num => (
            <TouchableOpacity key={num} style={styles.key} onPress={() => handlePinPress(num.toString())}>
              <Text style={styles.keyText}>{num}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.row}>
          {[4, 5, 6].map(num => (
            <TouchableOpacity key={num} style={styles.key} onPress={() => handlePinPress(num.toString())}>
              <Text style={styles.keyText}>{num}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.row}>
          {[7, 8, 9].map(num => (
            <TouchableOpacity key={num} style={styles.key} onPress={() => handlePinPress(num.toString())}>
              <Text style={styles.keyText}>{num}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.row}>
          <View style={styles.emptyKey} />
          <TouchableOpacity style={styles.key} onPress={() => handlePinPress('0')}>
            <Text style={styles.keyText}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.key} onPress={handleDelete}>
            <Text style={styles.keyText}>⌫</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={handleContinue} style={styles.continueButton} disabled={pin.length < 5}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    width: '100%',
  },
  iconHeader: {
    alignItems: 'center',
    width: '100%',
  },
  backButton: {
    fontSize: 24,
    color: 'black',
  },
  iconContainer: {
    width: 60,
    height: 60,
    backgroundColor: '#F2FAF7',
    borderWidth: 1,
    borderColor: '#E9F7F2',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  iconText: {
    position: 'absolute',
    fontSize: 24,
    color: '#00A385',
  },
  backIcon: {
    position: 'absolute',
    fontSize: 24,
    color: '#06070A',
  },
  btnBack: {
    position: 'absolute',
    marginTop: 13,
    marginLeft: 10,
    padding: 20,
    left: 0,
  },
  title: {
    fontSize: 24,
    marginVertical: 10,
    marginBottom: 38,
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
  pinContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginBottom: '30%',
    backgroundColor: '#C1C4CB',
    marginHorizontal: 5,
  },
  filledCircle: {
    backgroundColor: '#FA8A34',
  },
  keyboardContainer: {
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EBEFF5',
    marginBottom: 20
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    margin: 15,
  },
  key: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  emptyKey: {
    width: 60,
    height: 60,
  },
  continueButton: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: '#FA8A34',
    padding: 15,
    alignItems: 'center',
    borderRadius: 16,
    margin: 20,
    width: '90%',
    alignSelf: 'center',
  },
  continueButtonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
  },
});
