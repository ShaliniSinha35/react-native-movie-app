import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Avatar, Card } from "react-native-paper";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Stack, IconButton, Button } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { AntDesign } from "@expo/vector-icons";
import { HStack } from "@react-native-material/core";
// e5f6e8c0765bee730fe2007b6b0e5b5d

const MovieCard = () => {
  const [movies, setMovie] = useState([]);
  const [currPage, setCurrPage] = useState(1);

  const getMovies = async () => {
    const result = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=e5f6e8c0765bee730fe2007b6b0e5b5d&language=en-US&page=${currPage}`
    );
    console.log(result.data.results);
    setMovie(result.data.results);
  };

  useEffect(() => {
    getMovies();
  }, [currPage,movies]);


  const handlePrevious=(page)=>{
      if(page !== 1){
        setCurrPage( page - 1 );
        console.log(currPage)
      }
      else{
        setCurrPage(1)
      }

  }

  const handleNext=(page)=>{
     setCurrPage(page + 1);
     console.log(currPage)
  }

  return (
    <ScrollView>
      <View style={styles.moviesCont}>
        {movies.length !== 0 ? (
          movies.map((movie) => (
            // console.log(item.title)
            <Card key={movie.id} style={styles.movieCard}>
              <Card.Cover
                source={{
                  uri: `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`,
                }}
              />
              <Card.Title title={movie.title} style={styles.movieTitle} />
              <Card.Content>
                {/* <Text variant="titleLarge">Card title</Text>
              <Text variant="bodyMedium">Card content</Text> */}
              </Card.Content>

              <Card.Actions>
                <IconButton
                  icon={(props) => (
                    <Icon name="eye" {...props} color={"gray"} />
                  )}
                />
                <IconButton
                  icon={(props) => (
                    <AntDesign
                      name="hearto"
                      {...props}
                      size={24}
                      color="gray"
                    />
                  )}
                />
              </Card.Actions>
            </Card>
          ))
        ) : (
          <ActivityIndicator></ActivityIndicator>
        )}

        <View style={styles.paginationCont}>
          <HStack m={4} spacing={6}>
          <Button variant="text" title="Prev" onPress={()=>handlePrevious(currPage)} />
          <View style={{width:50, height:40, backgroundColor:"#3c40c6", justifyContent:"center", alignItems:"center"}}><Text style={{textAlign:"center"}}>{currPage}</Text></View>
          <Button variant="text" title="Next" onPress={()=>handleNext(currPage)} />
         </HStack>
        </View>
      </View>
      
 
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "red",
    flex: 1,
    width: "auto",
    height: "auto"
  },
  moviesCont: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    gap: 8,
    height: "auto",
    width: "100%",
    justifyContent: "center",
    marginVertical: 5,
  },
  movieCard: {
    width: "48%",
  },
  movieTitle: {
    fontSize: 2,
  },
  paginationCont:{
    flex:1,
    alignItems:"center",
    justifyContent:"center"
  }
});
export default MovieCard;
