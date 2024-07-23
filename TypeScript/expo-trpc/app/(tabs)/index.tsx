import { StyleSheet } from "react-native";
import { ThemedText as Text } from "@/components/ThemedText";
import { ThemedView as View } from "@/components/ThemedView";

import { api } from "@/utils/api";
import EditScreenInfo from "@/components/EditScreenText";

export default function HomeScreen() {
  const { data: postData, isLoading, error } = api.posts.byPostId.useQuery(1);

  return (
    <View>
      {isLoading && <Text>Loading ...</Text>}
      {!!error && <Text>Error: {error.message}</Text>}
      {postData && (
        <View>
          <Text>Author: {postData.authorId}</Text>
          <Text>Content: {postData.content}</Text>
        </View>
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
