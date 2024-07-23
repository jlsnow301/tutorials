import { StyleSheet } from "react-native";
import { ThemedText as Text } from "@/components/ThemedText";
import { ThemedView as View } from "@/components/ThemedView";

import { api } from "@/utils/api";
import EditScreenInfo from "@/components/EditScreenText";

export default function HomeScreen() {
  const { status, data, isLoading, error, isError } = api.posts.byUser.useQuery(
    {
      user: 1,
    }
  );

  return (
    <View style={styles.container}>
      {isLoading && <Text style={styles.title}>Loading ...</Text>}
      {isError && <Text style={styles.title}>Error: {error.message}</Text>}
      {status === "success" && (
        <Text style={styles.title}>{data.postsQuery[0].content}</Text>
      )}

      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
