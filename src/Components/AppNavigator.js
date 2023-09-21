
// import { createAppContainer } from 'react-navigation';
// import { createStackNavigator } from 'react-navigation-stack';
// import LoginForm from './LoginForm';
// import RegisterForm from './RegisterForm';
// import Welcome from './Welcome';



// const AppNavigator = createStackNavigator({
//     Login : LoginForm,
//     Register: RegisterForm,
//     Home: Welcome
//   });

//   export default createAppContainer(AppNavigator)



import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import Welcome from './Welcome';
import { Header } from 'react-navigation-stack';



const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown:false}}>
        <Stack.Screen name="Login" component={LoginForm} />
        <Stack.Screen name="Register" component={RegisterForm} />
        <Stack.Screen name="Home" component={Welcome} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
