import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import AppLoading from 'expo-app-loading';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins';

import theme from './src/global/styles/theme';

import { Dashboard } from './src/screens/Dashboard/';
import { Register } from './src/screens/Register/';
import { CategorySelect } from './src/screens/CategorySelect/';

export default function App() {
  const [fontsloaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });

  if (!fontsloaded) {
    return <AppLoading autoHideSplash />
  } else {
    return (
      <ThemeProvider theme={theme}>
        {/* <Dashboard /> */}
        <Register />
        {/* <CategorySelect /> */}
      </ThemeProvider>
    );
  }
}