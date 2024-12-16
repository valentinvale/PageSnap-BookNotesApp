import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AppRouter from './Router/AppRouter';
import { useEffect } from 'react';
import { getDatabase, initDatabase } from './Services/DatabaseService';

export default function App() {

  useEffect(() => {
    const initializeApp = async () => {
      try {
          const db = await getDatabase();
          await initDatabase(db);
          console.log("Database initialized successfully.");
      } catch (error) {
          console.log("Error initializing database:", error);
      }
    }
    initializeApp();
  }, []);


  return (
    <AppRouter />
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
