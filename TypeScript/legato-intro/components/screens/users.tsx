import React, { useState, useEffect } from "react";
import firebase from "firebase";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { StackParamList } from "../types/navigation";
import { User } from "../models/user";

type Props = NativeStackScreenProps<StackParamList, "Users">;

/** A simple screen that displays a flatlist of users. */
const UsersScreen: React.FC<Props> = ({ navigation }) => {
  const [users, setUsers] = useState<User[]>([]);

  /** On load: Grab all users on the db */
  useEffect(() => {
    let fetchedUsers: User[] = [];
    const fetchUsers = async () => {
      await firebase
        .database()
        .ref("users")
        .once("value")
        .then((snapshot) => {
          snapshot.forEach((user: any) => {
            fetchedUsers.push(new User(user.val().email, user.val().password));
          });
        });
      setUsers(fetchedUsers);
    };

    fetchUsers();
  }, []);

  /** Loads up a simple line of text per user: user (index): email: (email) */
  const renderItem = (user: any) => {
    return (
      <>
        <Text style={style.userData}>
          User {user.index + 1}: Email: {user.item.email}
        </Text>
      </>
    );
  };

  return (
    <View style={style.screen}>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={(user) =>
          user.password
        } /** Testing purposes please never do this*/
      />
    </View>
  );
};

export default UsersScreen;

const style = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  userData: {
    marginTop: 10,
  },
});
