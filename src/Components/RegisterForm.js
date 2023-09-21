import { View, Text, StyleSheet, KeyboardAvoidingView } from "react-native";
import React, { useState, useEffect } from "react";
import { Stack, TextInput } from "@react-native-material/core";
import { Button } from "@react-native-material/core";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Zocial } from "@expo/vector-icons";
import { auth } from "../../firebase";
import { firestore } from "../../firebase";
import { AppBar } from "@react-native-material/core";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';



const RegisterForm = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setErr] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [user, setUser] = useState("");


  useEffect(() => {
    validateForm();
  }, [email, password]);

  const validateForm = () => {
    let errors = {};

    // Validate name field
    if (!name) {
      errors.name = "Name is required.";
    }

    // Validate email field
    if (!email) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid.";
    }

    // Validate password field
    if (!password) {
      errors.password = "Password is required.";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }

    // Set the errors and update form validity
    setErr(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  const handleSubmit = () => {
    if (isFormValid) {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then(async (userCredential) => {
          const user = userCredential.user;
          setUser(user);
          const ref = await firestore.collection("users").doc(user.uid).set({
            name: name,
            email: email,
            password: password,
          });
          console.log(user);
          if (user !== null) {
            alert("Register successfully 🎉!");
            setEmail("");
            setPassword("");
            navigation.navigate("Home", {user});
          }
        })
        .catch((error) => {
          // Handle login errors here
          const errorMessage = error.message;
          console.error(errorMessage);
          setErr(errorMessage);
        });
    } else {
      alert("Form has errors. Please correct them.");
    }
  };
  return (
    <View style={{flex:1}}>
    <AppBar title="Registration Page" />
    <View style={styles.container}>
<KeyboardAvoidingView behavior="padding" >

<Stack spacing={2} style={{ margin: 10 }}>
        <TextInput
          label="Username"
          value={name}
          onChangeText={setName}
          leading={(props) => (
            <FontAwesome name="user" size={24} color="gray" />
          )}
        />
      </Stack>
      <Stack spacing={2} style={{ margin: 10 }}>
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          leading={(props) => <Zocial name="email" size={24} color="gray" />}
        />
      </Stack>
      <Stack spacing={2} style={{ margin: 10 }}>
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          leading={(props) => (
            <Ionicons name="ios-lock-closed" size={24} color="gray" />
          )}
        />
      </Stack>
</KeyboardAvoidingView>
    

      <View style={styles.buttonView}>
        <Button
          title="Register"
          style={[{ opacity: isFormValid ? 1 : 0.5 }]}
          disabled={!isFormValid}
          onPress={handleSubmit}
        />
        <View >
          <Text style={{color:"gray"}}>ALREADY HAVE AN ACCOUNT?</Text> 
        <Button
          variant="text"
          title="Login here"
          onPress={() => navigation.navigate("Login")}
        /></View>
       
      </View>
    </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
  },
  buttonView: {
    width: "100%",
    alignItems: "center",
  },

});

export default RegisterForm;
