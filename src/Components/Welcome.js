import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { AppBar, Flex, IconButton, HStack } from "@react-native-material/core";
// import { Appbar } from 'react-native-paper';
import { Button } from "@react-native-material/core";
import { MaterialIcons } from "@expo/vector-icons";
import { auth } from "../../firebase";
import { database } from "../../firebase";
import { firestore } from "../../firebase";
import { Image, Dimensions } from "react-native";
import Carousel, { PaginationLight } from "react-native-x-carousel";
import MovieCard from "./MovieCard";
const { width } = Dimensions.get("window");



const DATA = [
  {
    coverImageUri:
      "https://user-images.githubusercontent.com/6414178/73920321-2357b680-4900-11ea-89d5-2e8cbecec9f6.jpg",
    cornerLabelColor: "#FFD300",
    cornerLabelText: "GOTY",
  },
  {
    coverImageUri:
      "https://user-images.githubusercontent.com/6414178/73920358-336f9600-4900-11ea-8eec-cc919b991e90.jpg",
    cornerLabelColor: "#0080ff",
    cornerLabelText: "NEW",
  },
  {
    coverImageUri:
      "https://user-images.githubusercontent.com/6414178/73927874-25744200-490d-11ea-940f-db3e5dbd8b2b.jpg",
    cornerLabelColor: "#2ECC40",
    cornerLabelText: "-75%",
  },
  {
    coverImageUri:
      "https://user-images.githubusercontent.com/6414178/73920399-45e9cf80-4900-11ea-9d5b-743fe5e8b9a4.jpg",
    cornerLabelColor: "#2ECC40",
    cornerLabelText: "-20%",
  },
];

const Welcome = ({ navigation, route }) => {
  const [user, setUser] = useState("");

  //  console.log(route.params.user.email)
  //  console.log(route.params.user.uid)

  // const userId = route.params.user.uid;

  const handleLogout = () => {
    auth.signOut();
    navigation.navigate("Login");
  };

  const getUserData = async () => {
    const unsub = firestore
      .collection("users")
      .doc(userId)
      .onSnapshot((snapshot) => {
        console.log(snapshot.data());
        setUser(snapshot.data());
      });
    return () => {
      unsub();
    };
  };

  useEffect(() => {
    // getUserData();
  }, []);

  const renderItem = (data) => (
    <View key={data.coverImageUri} style={styles.cardContainer}>
      <View style={styles.cardWrapper}>
        <Image style={styles.card} source={{ uri: data.coverImageUri }} />
        <View
          style={[
            styles.cornerLabel,
            { backgroundColor: data.cornerLabelColor },
          ]}
        >
          <Text style={styles.cornerLabelText}>{data.cornerLabelText}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView >
      {user.uid !== null ? 
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
           <AppBar
            title="Movie App"
            leading={(props) => (
              <MaterialIcons name="movie-filter" size={24} color="white" />
            )}
            trailing={props => (
              <HStack>
              <MaterialIcons name="logout" size={24} color="white" onPress={handleLogout} />
              </HStack>
            )}

            // 
          />
          {/* <Text style={{ textAlign: "center" }}>Welcome , {user.name}</Text> */}

          <View style={styles.container}>
            <Carousel
              pagination={PaginationLight}
              renderItem={renderItem}
              data={DATA}
              loop
              autoplay
              
            />
          </View>
          <MovieCard></MovieCard>

        {/* <View style={{flex:1}}>
            <MovieCard></MovieCard>
        </View> */}
         

          {/* <View style={styles.logoutCont}>
            <Button title="Logout" onPress={handleLogout} />
          </View> */}

        </View>
       : 
        <>{navigation.navigate("Login")}</>
      }
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // justifyContent: "center",
    alignItems: "center",
    marginTop:4
  },

  font: {
    fontSize: 25,
    fontWeight: "400",
    color: "green",
  },
  logoutCont: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 2,
  },
  cardContainer: {
    alignItems: "center",
    justifyContent: "center",
   
  },
  cardWrapper: {
    borderRadius: 8,
    overflow: "hidden",
  },
  card: {
    width: width * 0.9,
    height: width * 0.5,
  },
  cornerLabel: {
    position: "absolute",
    bottom: 0,
    right: 0,
    borderTopLeftRadius: 8,
  },
  cornerLabelText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "600",
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 2,
    paddingBottom: 2,
  },
});

export default Welcome;


