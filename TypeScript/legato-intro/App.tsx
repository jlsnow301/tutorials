import React from "react";
import firebase from "firebase/app";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { firebaseConfig } from "./config/firebase";
import LandingScreen from "./components/screens/landing";
import UsersScreen from "./components/screens/users";

const Stack = createNativeStackNavigator();

firebase.initializeApp(firebaseConfig);

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Landing" component={LandingScreen} />
        <Stack.Screen name="Users" component={UsersScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
