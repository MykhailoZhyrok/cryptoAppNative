import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Feather';
import * as Keychain from 'react-native-keychain';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../../authSlice/authSlice'; // Adjust the path as needed

const PinAuth: React.FC = () => {
  const [pin, setPin] = useState<string>('');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userToken = useSelector((state: any) => state.user.user.token);

  useEffect(() => {
    loadSavedCredentials();
  }, []);

  const loadSavedCredentials = async () => {
    try {
      const savedCredentials = await Keychain.getGenericPassword();
      if (savedCredentials && savedCredentials.password) {
        const savedPin = savedCredentials.password;
        setPin(savedPin);
      } else {
        Alert.alert('Error', 'No PIN saved. Please set a PIN first.');
      }

      const savedToken = await Keychain.getGenericPassword({ service: 'token' });
      if (savedToken && savedToken.password) {
        dispatch(getUser(savedToken.password)); 
        
      } else {
        console.error('Token not found in Keychain');
      }
    } catch (error) {
      console.error('Error retrieving credentials from Keychain:', error);
      Alert.alert('Error', 'Failed to retrieve credentials. Please try again.');
    }
  };

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

  const handleContinue = async () => {
    try {
      const savedCredentials = await Keychain.getGenericPassword();
      if (savedCredentials && savedCredentials.password) {
        const savedPin = savedCredentials.password;

        if (pin === savedPin) {
          navigation.navigate('HomeTabs'); 
        } else {
          Alert.alert('Error', 'Invalid PIN entered. Please try again.');
          setPin('');
        }
      } else {
        Alert.alert('Error', 'No PIN saved. Please set a PIN first.');
      }
    } catch (error) {
      console.error('Error retrieving PIN:', error);
      Alert.alert('Error', 'Failed to retrieve PIN. Please try again.');
    }
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconHeader}>
          <View style={styles.iconContainer}>
            <Icon2 name='smartphone' style={styles.iconText} />
          </View>
        </View>
        <Text style={styles.title}></Text>
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
};

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

export default PinAuth;
