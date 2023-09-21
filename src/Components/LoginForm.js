import { View, Text, StyleSheet, Alert, KeyboardAvoidingView } from "react-native";
import React, {useState, useEffect} from "react";
import { Stack, TextInput} from "@react-native-material/core";
import { Button } from "@react-native-material/core";
import { Ionicons } from '@expo/vector-icons';
import { Zocial } from '@expo/vector-icons';
import { auth } from "../../firebase";
import { AppBar } from "@react-native-material/core";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const LoginForm = ({navigation}) => {

    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [error,setErr]=useState("")
    const [isFormValid, setIsFormValid] = useState(false);
    const [user,setUser]=useState("")



 

    useEffect(() => {
  
     
        validateForm();
    }, [email, password]);



    const validateForm = () => {
        let errors = {};
  
       
  
        // Validate email field
        if (!email) {
            errors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Email is invalid.';
        }
  
        // Validate password field
        if (!password) {
            errors.password = 'Password is required.';
        } else if (password.length < 6) {
            errors.password = 'Password must be at least 6 characters.';
        }
  
        // Set the errors and update form validity
        setErr(errors);
        setIsFormValid(Object.keys(errors).length === 0);
    };


    const handleSubmit = () => {
        if (isFormValid) {

          
          auth.signInWithEmailAndPassword(email, password)
          .then((userCredential) => {
            // Login successful, handle user here
            const user = userCredential.user;
            setUser(user)
            // console.log(user)
            if(user!==null){
              alert('Login successfully 🎉!');
              navigation.navigate("Home", {user});
               setEmail("");
               setPassword("");
            }
          })
          .catch((error) => {
            // Handle login errors here
            const errorMessage = error.message;
            setErr(errorMessage)
          });
  
     
          
        } else {
              
            // Form is invalid, display error messages
            alert('Form has errors. Please correct them.');
        }
    };


  

  return (
    <View style={{flex:1}} >


       <AppBar title="Login Page" />
       <View style={styles.container}>
       <KeyboardAvoidingView behavior="padding" >
     
               <Stack spacing={2} style={{ margin: 16 }}>
        <TextInput
          label="Email"
       onChangeText={setEmail}
          value={email}
          leading={(props) => (
            <Zocial name="email" size={24} color="gray" />
          )}
        />
               </Stack>
               <Stack spacing={2} style={{ margin: 16 }}>
        <TextInput
          label="Password"
         onChangeText={setPassword}
          value={password}
          leading={(props) => (
            <Ionicons name="ios-lock-closed" size={24} color="gray" />
          )}
        />
    
               </Stack>
       </KeyboardAvoidingView>
 
        <View style={styles.buttonView}><Button title="Login"  style={[ { opacity: isFormValid ? 1 : 0.5 }]}
                disabled={!isFormValid}
                onPress={handleSubmit}/>

     <View >
          <Text style={{color:"gray"}}>Don't have an account?</Text> 
          <Button
          variant="text"
          title="Register here"
          onPress={() => navigation.navigate("Register")}
        /></View>
     
        </View>
   

    </View>
    </View>
   
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
   justifyContent:"center",
    width:"100%"
  },
  buttonView:{
    width:"100%",
    alignItems:"center",
    gap:4
  }
});

export default LoginForm;
