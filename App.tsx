import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView } from 'react-native';
import Routes from './src/Routes';

export default function App() {
  return (
    <>
      <StatusBar style='light' backgroundColor='#171d31' translucent={false}  />
      <Routes />
    </>
  );
}