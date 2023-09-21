// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, SafeAreaView, StatusBar } from 'react-native';
import AppNavigator from './src/Components/AppNavigator';




export default function App() {
  return (
    <>
  
    <SafeAreaView style={styles.container}>
    <StatusBar barStyle="light-content" />
    <AppNavigator style={styles.header} ></AppNavigator>
      <StatusBar style="auto" />
    </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
 
 
    
  },
  formView:{
     flex:1, 
  },
  header:{
    marginTop:5
  }
});
