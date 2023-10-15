import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import PasswordGenerator from './app/passwordGenerator/passwordGenerator';
import AppLogo from './app/common/appLogo';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {

  const [showLogo, setShowLogo] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogo(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);


  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}>
        {showLogo ? (
          <Stack.Screen
            name="AppLogo"
            component={AppLogo}
          />
        ) : (
          <Stack.Screen
            name="PasswordGenerator"
            component={PasswordGenerator}
          />
        )
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}