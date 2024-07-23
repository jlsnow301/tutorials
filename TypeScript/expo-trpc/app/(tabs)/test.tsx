import { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { ThemedText as Text } from "@/components/ThemedText";
import { ThemedView as View } from "@/components/ThemedView";
import EditScreenInfo from "@/components/EditScreenText";

// This is what we expect to receive from the server
type Post = {
  id: number;
  title: string;
  content: string;
};

export default function TestPage() {
  const [postData, setPostData] = useState<Post>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // This renders on first render
  useEffect(() => {
    // This builds on the first render
    async function fetchPostData() {
      setIsLoading(true);
      setError("");

      try {
        const response = await fetch("/api/posts/1");
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();

        setPostData(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    // Fetch the data
    fetchPostData();
  }, []);

  return (
    <View>
      {isLoading && <Text>Loading...</Text>}
      {error && <Text>Error: {error}</Text>}
      {postData && (
        <View>
          <Text>Title: {postData.title}</Text>
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
