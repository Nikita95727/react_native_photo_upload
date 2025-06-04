import axios from 'axios';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Button, FlatList, Image, StyleSheet, Text, View } from "react-native";

type Photo = {
  url: string;
  'created.at': string;
}

export default function Gallery() {
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    // Get photos
    axios.get('http://192.168.50.239:3000/photos').then(res => {
      setPhotos(res.data);
    }).catch(err => console.log(err))
  }, []);

  return (
    <View style={styles.container}>
      <Button title="Take Photo" onPress={() => router.push('/take-photo')} />
      <FlatList
        data={photos}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 10 }}>
            <Image source={{ uri: item.url }} style={{ width: 300, height: 300 }} />
            <Text>{new Date(item['created.at']).toLocaleDateString()}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  }
})