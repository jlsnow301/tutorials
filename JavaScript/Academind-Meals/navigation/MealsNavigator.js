import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { Platform } from "react-native";

import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMeals from "../screens/CategoryMealsScreen";
import MealsDetailsScreen from "../screens/MealsDetailsScreen";
import Colors from "../constants/colors";

const MealsNavigator = createStackNavigator(
  {
    Categories: {
      screen: CategoriesScreen,
      navigationOptions: { headerTitle: "Meal Categories" },
    },
    CategoryMeals: {
      screen: CategoryMeals,
    },
    MealDetail: {
      screen: MealsDetailsScreen,
    },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backGroundColor: Platform.OS === "android" ? Colors.primaryColor : "",
      },
      headerTintColor:
        Platform.OS === "android" ? "white" : Colors.primaryColor,
    },
  }
);

export default createAppContainer(MealsNavigator);
