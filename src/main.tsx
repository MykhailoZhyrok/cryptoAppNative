import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector, Provider } from 'react-redux';
import store, { RootState } from './store/store';

import HomeTabs from './HomeTabs'; 
import LoginScreen2 from './screens/Auth/LoginScreen';
import RegistrScreen from './screens/Auth/RegistrScreen';
import { WelcomeScreen } from './screens/Welcome/WelcomeScreen';
import PinScreen from './screens/Auth/PinScreen';
import LoadingScreen from './screens/LoadScreen/LoadScreen';
import PostScreen from './screens/Home/Post/PostScreen';
import LanguageScreen from './screens/Home/LanguageScreen/LanguageScreen';
import PinAuth from './screens/Auth/PinAuth';

const Stack = createNativeStackNavigator();

export default function Main() {
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen screenName="Load" />;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={user.isAuth ? "PinAuth" : 'Welcome'}
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen2} />
          <Stack.Screen name="Registr" component={RegistrScreen} />
          <Stack.Screen name="HomeTabs" component={HomeTabs} />
          <Stack.Screen name="Pin" component={PinScreen} />
          <Stack.Screen name="Post" component={PostScreen} />
          <Stack.Screen name="Language" component={LanguageScreen} />
          <Stack.Screen name="PinAuth" component={PinAuth} />

        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
