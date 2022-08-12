import React from "react";
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import firebase from "firebase";

import { StackParamList } from "../types/navigation";
import { User } from "../models/user";

type Props = NativeStackScreenProps<StackParamList, "Landing">;

/** Create a number of emails and randomly pick from them and pick from them */
const randomEmails = [
  "joe@gmail.com",
  "alex@yahoo.com",
  "stacy@aol.com",
  "rebecca@outlook.com",
];
const pickRandom = () => {
  return randomEmails[Math.floor(Math.random() * randomEmails.length)];
};

/** Mockup landing page. Only the create button works. */
const LandingScreen: React.FC<Props> = ({ navigation }) => {
  /** Creates a new firebase entry for a randomized user. Navigates to the user page. */
  const onCreateHandler = () => {
    firebase
      .database()
      .ref("users")
      .push(
        new User(
          pickRandom(),
          Math.floor(100000 + Math.random() * 900000).toString()
        )
      )
      .then((res) => {
        console.log("User created successfully!");
        navigation.navigate("Users");
      })
      .catch((error) => console.log(error));
  };

  return (
    <View style={style.screen}>
      <ImageBackground /** Would like this to be more dim, but don't want to implement a third party filter */
        blurRadius={1}
        source={require("../../assets/background.jpg")}
        resizeMode="stretch"
        style={style.image}>
        <Text style={style.logo}>Legato</Text>
        <View style={style.buttons}>
          <Pressable onPress={onCreateHandler}>
            <Text style={style.navText}>Create</Text>
          </Pressable>
          <Pressable onPress={() => console.log("Not implemented")}>
            <Text style={style.navText}>Connect</Text>
          </Pressable>
          <Pressable onPress={() => console.log("Not implemented")}>
            <Text style={style.navText}>Collaborate</Text>
          </Pressable>
        </View>
        <View style={style.signup}>
          <Pressable
            style={style.signup}
            onPress={() => console.log("Not implemented")}>
            <Text style={style.signupText}>Sign in / Join</Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
};

const style = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
  },
  buttons: {
    alignItems: "flex-start",
    marginLeft: 35,
  },
  navText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 35,
    marginBottom: 30,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  logo: {
    alignSelf: "center",
    color: "white",
    fontFamily: "SnellRoundhand-Bold", // Sorry android users (for now)
    fontSize: 60,
    marginTop: 220,
    marginBottom: 90,
  },
  signup: {
    flex: 1,
    alignItems: "center",
    marginTop: 35,
  },
  signupText: {
    backgroundColor: "black",
    borderColor: "black",
    borderWidth: 20,
    color: "white",
    fontSize: 15,
    paddingLeft: 85,
    paddingRight: 85,
  },
});

export default LandingScreen;
