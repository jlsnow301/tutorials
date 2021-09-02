import React from "react";
import { StyleSheet, Text, View } from "react-native";

const MealsDetailsScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>Meals Details Screen</Text>
      <Button
        title={"Go Back to Categories"}
        onPress={() => {
          props.navigation.popToTop();
        }}
      />
    </View>
  );
};

export default MealsDetailsScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
