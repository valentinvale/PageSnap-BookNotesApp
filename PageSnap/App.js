import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AppRouter from './Router/AppRouter';
import { DatabaseProvider } from './Context/DatabaseContext';
import { useEffect } from 'react';
import { getDatabase, initDatabase } from './Services/DatabaseService';

export default function App() {

  return (
    <DatabaseProvider>
      <AppRouter />
    </DatabaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
