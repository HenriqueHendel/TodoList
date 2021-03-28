import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView } from 'react-native';
import Routes from './src/Routes';

export default function App() {
  return (
    <SafeAreaView>
      <StatusBar style='light' />
      <Routes />
    </SafeAreaView>
  );
}