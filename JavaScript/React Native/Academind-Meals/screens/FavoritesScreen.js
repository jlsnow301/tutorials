import React from "react";
import { StyleSheet, Text, View } from "react-native";

const FavoritesScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>Favorites Screen</Text>
    </View>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
