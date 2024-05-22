import React, { useState } from 'react';
import { View, Button, Image, StyleSheet, ActivityIndicator, Alert } from 'react-native';

const ApiPersonal = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchCatImage = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1");
      const data = await response.json();
      if (data && data.length > 0) {
        setImageUrl(data[0].url);
      }
    } catch (error) {
      console.error('Error al obtener la imagen del gato:', error);
      Alert.alert('Error', 'No se pudo obtener la imagen del gato.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Mostrar Imagen de Gato" onPress={fetchCatImage} />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        imageUrl ? <Image source={{ uri: imageUrl }} style={styles.image} /> : null
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 340,
    marginTop: 20,
  },
});

export default ApiPersonal;
